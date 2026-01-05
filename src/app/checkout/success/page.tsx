import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: { bookingId?: string }
}) {
  const session = await auth()
  const bookingId = searchParams.bookingId ? parseInt(searchParams.bookingId) : null

  if (!bookingId) {
    notFound()
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: true,
      therapist: {
        include: {
          user: { select: { name: true } }
        }
      }
    }
  })

  if (!booking) {
    notFound()
  }

  const startDate = new Date(booking.startTime)

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Mensagem */}
        <h1 className="text-3xl font-serif text-gray-900 mb-2">
          Pagamento Confirmado!
        </h1>
        <p className="text-gray-600 mb-8">
          Seu agendamento foi confirmado com sucesso
        </p>

        {/* Detalhes */}
        <div className="bg-[#F0EBE3] rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-4 text-center">Detalhes do Agendamento</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Terapeuta:</span>
              <span className="font-medium">{booking.therapist.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Serviço:</span>
              <span className="font-medium">{booking.service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data:</span>
              <span className="font-medium">
                {startDate.toLocaleDateString('pt-BR', { 
                  day: '2-digit', 
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horário:</span>
              <span className="font-medium">
                {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Confirmado
              </span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Link
            href="/client/bookings"
            className="block w-full bg-[#B2B8A3] hover:bg-[#9da390] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Ver Meus Agendamentos
          </Link>
          <Link
            href="/explore/therapists"
            className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Agendar Outra Sessão
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Você receberá um email de confirmação em breve
        </p>
      </div>
    </div>
  )
}
