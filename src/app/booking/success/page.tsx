'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-3xl mb-2 text-gray-900">Tudo certo!</h1>
        <p className="text-gray-600 mb-6">
          Sua sessão foi agendada com sucesso. Enviamos um e-mail de confirmação com todos os detalhes.
        </p>

        {bookingId && (
          <p className="text-sm text-gray-500 mb-6">
            Número do agendamento: <span className="font-mono font-semibold">#{bookingId}</span>
          </p>
        )}

        {/* Cards de próximos passos */}
        <div className="bg-[#F0EBE3] rounded-lg p-4 mb-6 space-y-2">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#B2B8A3' }} fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left text-sm">
              <p className="font-semibold">Verificamos a disponibilidade</p>
              <p className="text-gray-600">Seu horário está reservado</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#B2B8A3' }} fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left text-sm">
              <p className="font-semibold">Confirmação por e-mail</p>
              <p className="text-gray-600">Você receberá lembretes 24h antes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#B2B8A3' }} fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left text-sm">
              <p className="font-semibold">Acesso seguro</p>
              <p className="text-gray-600">Gerencie seu agendamento a qualquer hora</p>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button
            onClick={() => router.push('/dashboard/client')}
            className="w-full bg-[#B2B8A3] text-white hover:bg-[#9fa693]"
          >
            Ver Meus Agendamentos
          </Button>

          <Button
            onClick={() => router.push('/explore/therapists')}
            variant="outline"
            className="w-full"
          >
            Encontrar Mais Terapeutas
          </Button>
        </div>

        {/* Aviso sobre cancelamento */}
        <p className="text-xs text-gray-500 mt-6 px-4 py-3 bg-gray-50 rounded">
          💡 <strong>Dica:</strong> Você pode cancelar com reembolso completo até 24h antes da sessão.
        </p>
      </Card>
    </div>
  );
}
