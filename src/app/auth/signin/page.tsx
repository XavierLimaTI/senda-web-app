"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from '@/context/ToastContext'

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()
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
    if (res?.ok) {
      router.push("/")
    } else {
      setError(res?.error || "Falha no login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow">
        <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
        {verified && <div className="text-green-600 mb-2">E-mail verificado com sucesso. Você já pode entrar.</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          <div className="flex items-center justify-between">
            <button disabled={loading} className="bg-salvia text-white px-4 py-2 rounded">{loading ? "Entrando..." : "Entrar"}</button>
            <a href="/auth/signup" className="text-sm text-salvia">Criar conta</a>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-sm text-neutral-600 mb-2">Não recebeu o e-mail de verificação?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!email) return setError('Digite o email para reenviar')
                setError(null)
                try {
                  const res = await fetch('/api/auth/resend-verification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
                  const data = await res.json()
                  if (!res.ok) showToast({ message: data?.error || 'Erro ao reenviar', type: 'error' })
                  else showToast({ message: 'E-mail de verificação reenviado (verifique seu inbox)', type: 'success' })
                } catch (err) {
                  showToast({ message: 'Erro ao reenviar e-mail', type: 'error' })
                }
              }}
              className="text-sm text-salvia"
            >
              Reenviar e-mail de verificação
            </button>
          </div>
        </div>
        {toast && <Toast message={toast.msg} type={toast.type} />}
      </div>
    </div>
  )
}
