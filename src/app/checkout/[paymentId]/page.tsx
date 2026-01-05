import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import CheckoutClient from './CheckoutClient'

interface Props {
  params: { paymentId: string }
}

export default async function CheckoutPage({ params }: Props) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  // Buscar pagamento
  const payment = await prisma.payment.findFirst({
    where: {
      transactionId: params.paymentId
    },
    include: {
      booking: {
        include: {
          service: true,
          therapist: {
            include: {
              user: { select: { name: true } }
            }
          }
        }
      }
    }
  })

  if (!payment) {
    notFound()
  }

  // Verificar que o pagamento pertence ao usuário
  if (payment.userId !== parseInt(session.user.id)) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-12 px-4">
      <CheckoutClient payment={payment} />
    </div>
  )
}
