import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'


import RevenueClient from './RevenueClient'

export const metadata = {
  title: 'Receitas | Senda',
  description: 'Dashboard de receitas e repasses'
}

export default async function RevenuePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'THERAPIST') {
    redirect('/dashboard')
  }

  return <RevenueClient />
}

