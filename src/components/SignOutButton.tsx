"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }
  
  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 border rounded text-sm"
    >
      Sair
    </button>
  )
}
