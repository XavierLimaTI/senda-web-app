import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import RevenueClient from './RevenueClient'

export const metadata = {
  title: 'Receitas | Senda',
  description: 'Dashboard de receitas e repasses'
}

export default async function RevenuePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'THERAPIST') {
    redirect('/dashboard')
  }

  return <RevenueClient />
}
