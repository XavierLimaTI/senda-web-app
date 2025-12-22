import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import SignOutButton from "@/components/SignOutButton"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Painel</h1>
        <p className="mb-2">Bem-vindo, {session?.user?.name} ({session?.user?.email})</p>
        <p className="mb-4">Perfil: {session?.user?.role}</p>
        <SignOutButton />
      </div>
    </main>
  )
}
