;
import { redirect } from 'next/navigation';
;
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default async function ClientDashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== 'CLIENT') {
    redirect('/auth/signin');
  }

  // Buscar perfil do cliente e suas bookings
  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    include: {
      clientProfile: true,
      bookings: {
        include: {
          therapist: {
            include: { user: true }
          },
          service: true
        },
        orderBy: { startTime: 'desc' }
      }
    }
  });

  if (!user || !user.clientProfile) {
    redirect('/auth/signin');
  }

  const clientProfile = user.clientProfile;

  // Separar agendamentos futuros e passados
  const now = new Date();
  const upcomingBookings = user.bookings.filter(
    (b) => b.startTime > now && ['PENDING', 'CONFIRMED'].includes(b.status)
  );
  const pastBookings = user.bookings.filter(
    (b) => b.startTime <= now || b.status === 'COMPLETED'
  );

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl mb-2">
            Olá, {user.name?.split(' ')[0] || 'Cliente'}
          </h1>
          <p className="text-gray-600">
            {upcomingBookings.length} agendamento{upcomingBookings.length !== 1 ? 's' : ''} próximo
            {upcomingBookings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Próximos Agendamentos */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-2xl">Próximas Sessões</h2>
            <Link href="/explore/therapists">
              <Button className="bg-[#B2B8A3] text-white hover:bg-[#9fa693]">
                Agendar Nova Sessão
              </Button>
            </Link>
          </div>

          {upcomingBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Nenhum agendamento</h3>
              <p className="text-gray-600 mb-4">
                Explore nossa comunidade de terapeutas e agende sua primeira sessão
              </p>
              <Link href="/explore/therapists">
                <Button className="bg-[#B2B8A3] text-white hover:bg-[#9fa693]">
                  Explorar Terapeutas
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="p-6 hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  {/* Informações */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {booking.therapist.user.avatar && (
                        <img
                          src={booking.therapist.user.avatar}
                          alt={booking.therapist.user.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {booking.therapist.user.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {booking.therapist.specialty}
                        </p>
                        <p className="font-medium">
                          {booking.service.name} • {booking.service.duration}min
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          📅{' '}
                          {new Date(booking.startTime).toLocaleDateString('pt-BR', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short'
                          })}{' '}
                          às{' '}
                          <span className="font-mono">
                            {new Date(booking.startTime).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status e ações */}
                  <div className="flex flex-col gap-2">
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status === 'CONFIRMED' ? '✓ Confirmado' : 'Pendente'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#C8963E]">
                      R$ {booking.service.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // TODO: Implementar reschedule
                      }}
                    >
                      Remarcar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Histórico de Agendamentos */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl mb-4">Histórico</h2>
            <div className="space-y-4">
              {pastBookings.slice(0, 5).map((booking) => (
                <Card
                  key={booking.id}
                  className="p-4 opacity-75 hover:opacity-100 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {booking.therapist.user.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {booking.service.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(booking.startTime).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Avaliar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

