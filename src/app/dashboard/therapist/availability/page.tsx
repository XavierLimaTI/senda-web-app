import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AvailabilityManager from './AvailabilityManager'

export default async function AvailabilityPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'THERAPIST') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            Disponibilidade
          </h1>
          <p className="text-gray-600">
            Configure seus horários de atendimento semanais. 
            Clientes verão apenas os horários disponíveis ao agendar.
          </p>
        </div>

        <AvailabilityManager />
      </div>
    </div>
  )
}
