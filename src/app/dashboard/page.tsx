import { auth } from '@/lib/auth'
import { redirect } from "next/navigation"
import DashboardClient from './DashboardClient'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/auth/signin')
  return <DashboardClient session={session as any} />
}


