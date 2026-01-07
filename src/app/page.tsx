import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import HomeLandingClient from './HomeLandingClient'

export default async function Home() {
  // Se logado, redireciona para home personalizada por role
  const session = await auth()
  
  if (session?.user) {
    const role = session.user.role
    if (role === 'CLIENT') redirect('/home/client')
    if (role === 'THERAPIST') redirect('/home/therapist')
    if (role === 'SPACE') redirect('/home/space')
    if (role === 'ADMIN') redirect('/dashboard')
  }

  return <HomeLandingClient />
}