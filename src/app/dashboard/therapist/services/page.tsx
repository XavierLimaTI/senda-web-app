import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ServicesManager from './ServicesManager'

export default async function TherapistServicesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  // Verificar se é terapeuta
  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    include: { 
      therapistProfile: {
        include: {
          services: {
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  })

  if (!user || user.role !== 'THERAPIST' || !user.therapistProfile) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-areia">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Meus Serviços</h1>
          <p className="text-gray-600">
            Gerencie os serviços que você oferece aos seus clientes
          </p>
        </div>

        {!user.therapistProfile.verified && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Seu perfil está em análise. Você pode criar serviços, mas eles ficarão visíveis apenas após a aprovação do seu cadastro.
                </p>
              </div>
            </div>
          </div>
        )}

        <ServicesManager 
          initialServices={user.therapistProfile.services}
          isVerified={user.therapistProfile.verified}
        />
      </div>
    </div>
  )
}
