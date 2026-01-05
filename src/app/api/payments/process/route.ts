import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server';
;
;
import { prisma } from '@/lib/prisma';
import { createAsaasPayment } from '@/lib/asaas';

/**
 * POST /api/payments/process
 * 
 * Processa o pagamento e cria o booking se aprovado
 * 
 * Body:
 * {
 *   bookingData: {
 *     therapistId: number;
 *     serviceId: number;
 *     date: string (YYYY-MM-DD);
 *     time: string (HH:MM);
 *     therapistName: string;
 *     serviceName: string;
 *     servicePrice: number;
 *     clientName: string;
 *     clientEmail: string;
 *   };
 *   paymentMethod: 'card' | 'pix' | 'boleto';
 *   invoiceUrl?: string;
 * }
 */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingData, paymentMethod } = await req.json();

    // Validar dados
    if (!bookingData || !paymentMethod) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    const {
      therapistId,
      serviceId,
      date,
      time,
      therapistName,
      serviceName,
      servicePrice,
      clientName,
      clientEmail
    } = bookingData;

    // Buscar service para ter a duração
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { therapist: true }
    });

    if (!service || !service.active) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se o serviço pertence ao terapeuta
    if (service.therapistId !== therapistId) {
      return NextResponse.json(
        { error: 'Serviço não pertence a este terapeuta' },
        { status: 400 }
      );
    }

    // Validar se ainda há slot disponível
    const slotRes = await fetch(
      `http://localhost:3000/api/slots?therapistId=${therapistId}&date=${date}&serviceId=${serviceId}`,
      { cache: 'no-store' }
    );

    if (!slotRes.ok) {
      return NextResponse.json(
        { error: 'Erro ao validar disponibilidade' },
        { status: 500 }
      );
    }

    const slotData = await slotRes.json();
    if (!slotData.slots.includes(time)) {
      return NextResponse.json(
        { error: 'Horário não está mais disponível' },
        { status: 409 }
      );
    }

    // Criar horário de início e fim
    const [dateStr, timeStr] = [date, time];
    const startTime = new Date(`${dateStr}T${timeStr}:00`);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + service.duration);

    // Validar autenticação do cliente (usar ID da sessão)
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { user: true }
    });

    if (!clientProfile) {
      return NextResponse.json(
        { error: 'Perfil do cliente não encontrado' },
        { status: 404 }
      );
    }

    // Calcular taxa
    const sendaFee = servicePrice * 0.15; // 15% de taxa
    const therapistAmount = servicePrice - sendaFee;

    // Criar pagamento no Asaas
    const paymentResult = await createAsaasPayment({
      customer: {
        name: clientProfile.user.name,
        email: clientProfile.user.email
      },
      billing: {
        bookingId: 0, // Será atualizado após criar booking
        therapistId,
        servicePrice,
        sendaFee
      },
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Próximos 24h
      description: `${serviceName} com ${therapistName}`
    });

    // Criar booking (PENDING até confirmar pagamento)
    const booking = await prisma.booking.create({
      data: {
        clientId: clientProfile.id,
        therapistId,
        serviceId,
        startTime,
        endTime,
        status: 'PENDING',
        notes: `Pagamento via ${paymentMethod}. Invoice: ${paymentResult.id}`
      },
      include: {
        client: true,
        therapist: { include: { user: true } },
        service: true
      }
    });

    // Criar registro de pagamento
    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: parseInt(session.user.id),
        amount: servicePrice,
        sendaFee: sendaFee,
        professionalAmount: therapistAmount,
        status: 'PENDING',
        method: paymentMethod,
        transactionId: paymentResult.id
      }
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      paymentId: payment.id,
      invoiceUrl: paymentResult.invoiceUrl || null,
      paymentUrl: paymentResult.paymentUrl || null
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao processar pagamento'
      },
      { status: 500 }
    );
  }
}

