import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BookingForm from './BookingForm'

interface Props {
  params: { therapistId: string }
}

export default async function BookingPage({ params }: Props) {
  // Verificar autenticação - redirecionar para login se não autenticado
  const session = await auth()
  if (!session || session.user.role !== 'CLIENT') {
    redirect(`/auth/signin?callbackUrl=/booking/${params.therapistId}`)
  }

  const therapistId = parseInt(params.therapistId)
  if (isNaN(therapistId)) {
    notFound()
  }

  // Buscar terapeuta e seus serviços
  const therapist = await prisma.therapistProfile.findUnique({
    where: { id: therapistId },
    include: {
      user: {
        select: { name: true, avatar: true }
      },
      services: {
        where: { active: true },
        orderBy: { createdAt: 'desc' }
      },
      availability: {
        orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
      }
    }
  })

  if (!therapist || !therapist.verified) {
    notFound()
  }

  if (therapist.services.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-lg">
          <h1 className="text-2xl font-serif text-gray-900 mb-2">
            Nenhum serviço disponível
          </h1>
          <p className="text-gray-600 mb-4">
            Este terapeuta ainda não tem serviços cadastrados.
          </p>
          <a
            href={`/therapist/${therapistId}`}
            className="inline-block text-[#B2B8A3] hover:underline font-medium"
          >
            Voltar ao perfil
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a
            href={`/therapist/${therapistId}`}
            className="text-[#B2B8A3] hover:underline text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Voltar ao perfil
          </a>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            Agendar sessão com {therapist.user.name}
          </h1>
          <p className="text-gray-600">
            Escolha o serviço, data e horário para sua sessão
          </p>
        </div>

        {/* Formulário de Booking */}
        <BookingForm
          therapist={therapist}
          clientEmail={session.user.email || ''}
        />
      </div>
    </div>
  )
}
