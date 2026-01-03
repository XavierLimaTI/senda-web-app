"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import LegalConsentModal from "@/components/LegalConsentModal"

export default function SignUpPage({ searchParams }: { searchParams?: { role?: string } }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(searchParams?.role || "CLIENT")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLegalModal, setShowLegalModal] = useState(false)
  const [formData, setFormData] = useState<{name: string, email: string, password: string, role: string} | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setLoading(false)
      setError('Email inválido')
      return
    }
    if (password.length < 8) {
      setLoading(false)
      setError('A senha deve ter ao menos 8 caracteres')
      return
    }

    // Salvar dados do formulário e mostrar modal de termos
    setFormData({ name, email, password, role })
    setShowLegalModal(true)
    setLoading(false)
  }

  async function handleLegalAccept(consents: { terms: boolean; privacy: boolean; marketing: boolean }) {
    if (!formData) return
    
    setLoading(true)
    setError(null)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...formData,
        legalConsent: {
          acceptedTerms: consents.terms,
          acceptedPrivacy: consents.privacy,
          marketingConsent: consents.marketing,
        }
      }),
    })

    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setShowLegalModal(false)
      await signIn('credentials', { redirect: false, email: formData.email, password: formData.password })
      router.push('/dashboard')
    } else {
      setError(data?.error || 'Erro no cadastro')
      setShowLegalModal(false)
    }
  }

  function handleLegalReject() {
    setShowLegalModal(false)
    setFormData(null)
    setError('É necessário aceitar os Termos de Uso e Política de Privacidade para criar uma conta.')
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow">
          <h1 className="text-2xl font-semibold mb-4">Criar conta</h1>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input className="w-full border px-3 py-2 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Perfil</label>
              <select className="w-full border px-3 py-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="CLIENT">Cliente</option>
                <option value="THERAPIST">Terapeuta</option>
                <option value="SPACE">Espaço</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button disabled={loading} className="bg-salvia text-white px-4 py-2 rounded">{loading ? "Criando..." : "Criar conta"}</button>
              <a href="/auth/signin" className="text-sm text-salvia">Já tenho conta</a>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Aceite Legal */}
      <LegalConsentModal
        isOpen={showLegalModal}
        onAccept={handleLegalAccept}
        onReject={handleLegalReject}
        userRole={role as 'CLIENT' | 'THERAPIST' | 'SPACE'}
      />
    </>
  )
}
