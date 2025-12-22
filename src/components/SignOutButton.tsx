"use client"
import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-3 py-1 border rounded text-sm"
    >
      Sair
    </button>
  )
}
