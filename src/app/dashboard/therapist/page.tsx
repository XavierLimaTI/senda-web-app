import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { NewsSection } from './NewsSection';

export default async function TherapistDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'THERAPIST') {
    redirect('/auth/signin');
  }

  // Buscar perfil do terapeuta
  const therapistProfile = await prisma.therapistProfile.findUnique({
    where: { userId: parseInt(session.user.id) },
    include: {
      user: true,
      bookings: {
        include: {
          client: true,
          service: true
        },
        orderBy: { startTime: 'desc' }
      },
      services: true,
      availability: true
    }
  });

  if (!therapistProfile) {
    redirect('/auth/signin');
  }

  // Calcular métricas
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayBookings = therapistProfile.bookings.filter(
    (b) =>
      b.startTime >= today &&
      b.startTime < new Date(today.getTime() + 24 * 60 * 60 * 1000) &&
      ['CONFIRMED', 'COMPLETED'].includes(b.status)
  );

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  // TODO: Implementar cálculo de earnings com query de payments
  const monthlyEarnings = 0; // Será calculado depois via API

  const upcomingBookings = therapistProfile.bookings.filter(
    (b) => b.startTime > now && ['CONFIRMED', 'PENDING'].includes(b.status)
  );

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl mb-2">
            Bem-vindo, {therapistProfile.user.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600">
            {todayBookings.length} sessão{todayBookings.length !== 1 ? 's' : ''} hoje
          </p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Faturamento do Mês */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">Faturamento do Mês</h3>
              <svg
                className="w-5 h-5"
                style={{ color: '#C8963E' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              R$ {monthlyEarnings.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-gray-500 mt-1">Recebimentos confirmados</p>
          </Card>

          {/* Avaliação Média */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avaliação Média</h3>
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              {therapistProfile.rating.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">De 5.0</p>
          </Card>

          {/* Sessões Hoje */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">Sessões Hoje</h3>
              <svg
                className="w-5 h-5"
                style={{ color: '#B2B8A3' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">{todayBookings.length}</p>
            <p className="text-xs text-gray-500 mt-1">Confirmadas</p>
          </Card>
        </div>

        {/* Timeline de Hoje */}
        {todayBookings.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl mb-4">Agenda de Hoje</h2>
            <div className="space-y-3">
              {todayBookings.map((booking) => (
                <Card key={booking.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {booking.client.avatar && (
                        <img
                          src={booking.client.avatar}
                          alt={booking.client.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.client.name}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.service.name} ({booking.service.duration}min)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          📞{' '}
                          {booking.client.phone || 'Sem telefone registrado'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-lg">
                        {new Date(booking.startTime).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status === 'CONFIRMED' ? '✓ Confirmado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Próximos Agendamentos */}
        {upcomingBookings.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-2xl mb-4">Próximos Agendamentos</h2>
            <div className="space-y-3">
              {upcomingBookings.slice(0, 5).map((booking) => (
                <Card key={booking.id} className="p-4 opacity-75">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{booking.client.name}</h3>
                      <p className="text-sm text-gray-600">
                        {booking.service.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(booking.startTime).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(booking.startTime).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-[#B2B8A3]">
                      Em {Math.ceil((booking.startTime.getTime() - Date.now()) / (24 * 60 * 60 * 1000))}d
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Ações Rápidas */}
        <section>
          <h2 className="font-serif text-2xl mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/therapist/services">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8"
                    style={{ color: '#B2B8A3' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Gerenciar Serviços</h3>
                <p className="text-sm text-gray-600">
                  {therapistProfile.services.length} serviço
                  {therapistProfile.services.length !== 1 ? 's' : ''} criado
                  {therapistProfile.services.length !== 1 ? 's' : ''}
                </p>
              </Card>
            </Link>

            <Link href="/dashboard/therapist/availability">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8"
                    style={{ color: '#B2B8A3' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Definir Disponibilidade</h3>
                <p className="text-sm text-gray-600">
                  {therapistProfile.availability.length} bloco
                  {therapistProfile.availability.length !== 1 ? 's' : ''} definido
                  {therapistProfile.availability.length !== 1 ? 's' : ''}
                </p>
              </Card>
            </Link>

            <Link href="/dashboard/therapist/earnings">
              <Card className="p-6 hover:shadow-lg transition cursor-pointer">
                <div className="mb-4">
                  <svg
                    className="w-8 h-8"
                    style={{ color: '#C8963E' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Ver Ganhos</h3>
                <p className="text-sm text-gray-600">
                  R$ {monthlyEarnings.toFixed(2).replace('.', ',')} este mês
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* News Section */}
        <NewsSection />
      </div>
    </div>
  );
}
