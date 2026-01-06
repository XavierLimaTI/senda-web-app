"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from '@/context/ToastContext'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'

export default function SignInClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const verified = searchParams?.get('verified') === '1'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)
    if (!res?.error) {
      // Respeita callbackUrl se fornecido (NextAuth padrão)
      const callbackUrl = searchParams?.get('callbackUrl')

      if (callbackUrl) {
        router.push(callbackUrl)
        return
      }

      // Busca sessão para descobrir role e redirecionar
      try {
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()
        const role = sessionData?.user?.role

        const destination = (() => {
          if (role === 'THERAPIST') return '/dashboard/therapist/services'
          if (role === 'CLIENT') return '/client/bookings'
          if (role === 'SPACE') return '/dashboard'
          if (role === 'ADMIN') return '/dashboard'
          return '/dashboard'
        })()

        router.push(destination)
      } catch (err) {
        // fallback seguro
        router.push('/dashboard')
      }
    } else {
      setError(res?.error || "Falha no login")
    }
  }

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24">
        {/* Language Selector */}
        <div className="absolute top-6 right-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-sm font-medium text-neutral-700 hover:border-salvia focus:outline-none focus:ring-2 focus:ring-salvia/20 transition-all cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-salvia rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {t('auth.signin.welcome')}
            </h1>
            <p className="text-neutral-600">
              {t('auth.signin.subtitle')}
            </p>
          </div>

          {/* Alerts */}
          {verified && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                ✓ {t('auth.signin.verified')}
              </p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t('auth.signin.email')}
              </label>
              <input
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-salvia/20 focus:border-salvia transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder={t('auth.signin.email_placeholder')}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {t('auth.signin.password')}
                </label>
                <a href="#" className="text-sm text-salvia hover:text-salvia/80 transition-colors">
                  {t('auth.signin.forgot_password')}
                </a>
              </div>
              <input
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-salvia/20 focus:border-salvia transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder={t('auth.signin.password_placeholder')}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-salvia text-white px-6 py-3 rounded-lg font-medium hover:bg-salvia/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? t('auth.signin.signing_in') : t('auth.signin.signin_button')}
            </button>
          </form>

          {/* Resend Verification */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600 mb-2">
              {t('auth.signin.no_verification')}
            </p>
            <button
              onClick={async () => {
                if (!email) return setError(t('auth.signin.enter_email'))
                setError(null)
                try {
                  const res = await fetch('/api/auth/resend-verification', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  })
                  const data = await res.json()
                  if (!res.ok) showToast({ message: data?.error || t('auth.signin.resend_error'), type: 'error' })
                  else showToast({ message: t('auth.signin.resend_success'), type: 'success' })
                } catch (err) {
                  showToast({ message: t('auth.signin.resend_error'), type: 'error' })
                }
              }}
              className="text-sm text-salvia font-medium hover:text-salvia/80 transition-colors"
            >
              {t('auth.signin.resend_button')}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">
                {t('auth.signin.or')}
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              {t('auth.signin.no_account')}{' '}
              <a href="/auth/signup" className="text-salvia font-medium hover:text-salvia/80 transition-colors">
                {t('auth.signin.signup_link')}
              </a>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-salvia/10 rounded-full flex items-center justify-center">
                  <span className="text-salvia">🔒</span>
                </div>
                <span>{t('auth.signin.secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-salvia/10 rounded-full flex items-center justify-center">
                  <span className="text-salvia">⚡</span>
                </div>
                <span>{t('auth.signin.fast')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-salvia via-salvia/90 to-[#2D5A3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-4xl font-bold mb-6">
            {t('auth.signin.hero_title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {t('auth.signin.hero_subtitle')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-white/80">{t('auth.signin.stat_users')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-white/80">{t('auth.signin.stat_sessions')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">64</div>
              <div className="text-white/80">{t('auth.signin.stat_therapies')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-white/80">{t('auth.signin.stat_rating')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
