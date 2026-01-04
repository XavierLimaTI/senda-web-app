# Sprint 2: Motor B2C - Plano de Ação

## 🎯 Objetivo do Sprint
Construir o **marketplace funcional** onde clientes podem buscar terapeutas, ver perfis, escolher serviços, agendar horários e pagar com segurança. Ao final deste sprint, o Senda será um **produto viável** para primeiros testes com usuários reais.

**Duração estimada:** 3-5 semanas (dependendo da dedicação)

---

## 📋 Checklist de Tarefas (Ordem de Execução)

### Semana 1: Gestão de Serviços e Disponibilidade

#### ✅ Tarefa 1: CRUD de Serviços (Terapeuta)

**Arquivo a criar:** `src/app/api/therapist/services/route.ts`

```typescript
// POST - Criar novo serviço
// PUT - Editar serviço existente
// DELETE - Desativar serviço (soft delete: active = false)
// GET - Listar todos os serviços do terapeuta logado

// Validações obrigatórias:
// - name: min 3 caracteres
// - duration: múltiplo de 15 (slots de 15 min)
// - price: número positivo
// - Apenas terapeutas verificados podem criar serviços
```

**UI a criar:** `src/app/dashboard/therapist/services/page.tsx`
- Tabela listando serviços com botões editar/desativar
- Modal para criar/editar serviço (usar `react-hook-form` + `zod`)
- Design: Cards com cor Sálvia para serviços ativos

**Teste manual:**
1. Login como terapeuta
2. Criar serviço "Reiki - 60min - R$ 120"
3. Verificar no Prisma Studio se foi salvo corretamente

---

#### ✅ Tarefa 2: Gestão de Disponibilidade

**Arquivo a criar:** `src/app/api/therapist/availability/route.ts`

```typescript
// GET - Buscar disponibilidade semanal do terapeuta
// POST - Criar/atualizar blocos de disponibilidade
// DELETE - Remover bloco específico

// Estrutura de dados:
interface AvailabilityBlock {
  dayOfWeek: 0-6;  // 0=Domingo, 6=Sábado
  startTime: "HH:MM";
  endTime: "HH:MM";
}

// Exemplo: Terapeuta disponível Seg-Sex 9h-18h
[
  { dayOfWeek: 1, startTime: "09:00", endTime: "18:00" },
  { dayOfWeek: 2, startTime: "09:00", endTime: "18:00" },
  // ... repetir para dias 3, 4, 5
]
```

**UI a criar:** `src/app/dashboard/therapist/availability/page.tsx`
- Componente de calendário semanal visual (usar `react-big-calendar` ou criar simples com grid CSS)
- Ao clicar num dia, abre modal para definir horários
- Exibir blocos já cadastrados com opção de editar/remover

**Futuro (Sprint 3+):** Sincronização com Google Calendar API

---

### Semana 2: API de Slots e Perfil Público

#### ✅ Tarefa 3: API de Slots Disponíveis (CRÍTICO)

**Arquivo a criar:** `src/app/api/slots/route.ts`

```typescript
// GET /api/slots?therapistId=123&date=2025-12-30&serviceId=456

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const therapistId = parseInt(searchParams.get('therapistId')!);
  const date = new Date(searchParams.get('date')!);
  const serviceId = parseInt(searchParams.get('serviceId')!);
  
  // 1. Buscar Service para saber a duração
  const service = await prisma.service.findUnique({ 
    where: { id: serviceId } 
  });
  
  // 2. Buscar Availability do terapeuta para aquele dia da semana
  const dayOfWeek = date.getDay(); // 0-6
  const availability = await prisma.availability.findMany({
    where: { therapistId, dayOfWeek }
  });
  
  // 3. Gerar todos os slots possíveis
  const allSlots = generateTimeSlots(
    availability[0].startTime, 
    availability[0].endTime, 
    service.duration
  );
  // Ex: Se 09:00-18:00 e serviço de 60min → ["09:00", "10:00", "11:00", ...]
  
  // 4. Buscar agendamentos já existentes para aquele dia
  const bookings = await prisma.booking.findMany({
    where: {
      therapistId,
      startTime: { gte: startOfDay(date) },
      endTime: { lte: endOfDay(date) },
      status: { not: 'CANCELLED' }
    }
  });
  
  // 5. Remover slots ocupados
  const freeSlots = allSlots.filter(slot => {
    return !bookings.some(booking => 
      isSlotConflicting(slot, service.duration, booking)
    );
  });
  
  return NextResponse.json({ slots: freeSlots });
}

// Funções auxiliares a implementar:
function generateTimeSlots(start: string, end: string, durationMin: number): string[] { ... }
function isSlotConflicting(slot: string, duration: number, booking: Booking): boolean { ... }
```

**Teste crítico:**
```bash
# 1. Terapeuta tem disponibilidade Seg 09:00-18:00
# 2. Criar agendamento manual no DB para 10:00-11:00
# 3. Chamar API: /api/slots?therapistId=1&date=2025-12-30&serviceId=1
# Resultado esperado: ["09:00", "11:00", "12:00", "13:00", ...] (sem "10:00")
```

---

#### ✅ Tarefa 4: Perfil Público do Terapeuta

**Arquivo a criar:** `src/app/therapist/[id]/page.tsx`

```typescript
// Server Component para SEO
export default async function TherapistProfilePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const therapistId = parseInt(params.id);
  
  // Buscar dados do terapeuta (usar include para trazer user e services)
  const therapist = await prisma.therapistProfile.findUnique({
    where: { id: therapistId },
    include: {
      user: true,
      services: { where: { active: true } },
      trails: { where: { published: true } } // Trilhas criadas por ele
    }
  });
  
  if (!therapist || !therapist.verified) {
    return <NotFound />; // Só mostrar terapeutas verificados
  }
  
  return (
    <div className="bg-areia min-h-screen">
      {/* Header com foto grande */}
      <div className="relative h-96">
        <Image 
          src={therapist.user.avatar || '/default-therapist.jpg'} 
          alt={therapist.user.name}
          fill
          className="object-cover"
        />
        {therapist.verified && (
          <Badge className="absolute top-4 right-4 bg-dourado">
            ✓ Verificado
          </Badge>
        )}
      </div>
      
      {/* Info básica */}
      <div className="max-w-4xl mx-auto px-4 -mt-20">
        <Card className="bg-white p-8">
          <h1 className="font-serif text-4xl">{therapist.user.name}</h1>
          <p className="text-salvia">{therapist.specialty}</p>
          
          {/* Abas */}
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">Sobre</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <p className="whitespace-pre-line">{therapist.bio}</p>
              {/* Galeria de fotos do espaço */}
            </TabsContent>
            
            <TabsContent value="services">
              <div className="grid gap-4">
                {therapist.services.map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service}
                    onSelect={() => router.push(`/booking/${therapist.id}/${service.id}`)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              {/* Futuro: Lista de avaliações */}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Botão sticky de ação */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <Button 
          className="w-full bg-salvia text-white text-lg h-14"
          onClick={() => router.push(`/booking/${therapist.id}`)}
        >
          Ver horários disponíveis
        </Button>
      </div>
    </div>
  );
}
```

**Design Considerations:**
- Foto hero grande (cinematográfica, luz natural)
- Tipografia: Nome em Serif (Lora), corpo em Sans (DM Sans)
- Cores: Fundo Areia, botão Sálvia, selo Dourado
- Responsivo: Garantir que funciona bem em mobile

---

### Semana 3: Fluxo de Agendamento

#### ✅ Tarefa 5: Tela de Seleção de Horário

**Arquivo a criar:** `src/app/booking/[therapistId]/page.tsx`

```typescript
'use client';

export default function BookingPage({ params }: { params: { therapistId: string } }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  
  // Quando serviço ou data mudar, buscar slots
  useEffect(() => {
    if (selectedService && selectedDate) {
      fetch(`/api/slots?therapistId=${params.therapistId}&date=${selectedDate.toISOString()}&serviceId=${selectedService.id}`)
        .then(res => res.json())
        .then(data => setAvailableSlots(data.slots));
    }
  }, [selectedService, selectedDate]);
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Passo 1: Escolher serviço */}
      <section>
        <h2 className="font-serif text-2xl mb-4">Qual serviço?</h2>
        {services.map(service => (
          <ServiceRadioCard 
            key={service.id}
            service={service}
            selected={selectedService?.id === service.id}
            onSelect={() => setSelectedService(service)}
          />
        ))}
      </section>
      
      {/* Passo 2: Escolher data */}
      {selectedService && (
        <section className="mt-8">
          <h2 className="font-serif text-2xl mb-4">Quando?</h2>
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()} // Não permitir datas passadas
            className="border-salvia"
          />
        </section>
      )}
      
      {/* Passo 3: Escolher horário */}
      {selectedDate && availableSlots.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-2xl mb-4">Que horas?</h2>
          <div className="grid grid-cols-4 gap-2">
            {availableSlots.map(slot => (
              <Button
                key={slot}
                variant={selectedTime === slot ? 'default' : 'outline'}
                className={selectedTime === slot ? 'bg-salvia' : ''}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </section>
      )}
      
      {/* Resumo e botão continuar */}
      {selectedTime && (
        <Card className="mt-8 p-4 bg-areia">
          <h3 className="font-serif">Resumo</h3>
          <p>{selectedService.name} - {selectedService.duration}min</p>
          <p>{format(selectedDate, "d 'de' MMMM", { locale: ptBR })}</p>
          <p>às {selectedTime}</p>
          <p className="font-bold mt-2">R$ {selectedService.price.toFixed(2)}</p>
          
          <Button 
            className="w-full mt-4 bg-salvia"
            onClick={() => router.push(`/checkout?...`)}
          >
            Continuar para pagamento
          </Button>
        </Card>
      )}
    </div>
  );
}
```

**Bibliotecas a instalar:**
```bash
npm install react-day-picker date-fns
npm install @radix-ui/react-calendar  # Se usar Shadcn UI
```

---

### Semana 4: Pagamento (CRÍTICO)

#### ⚠️ Tarefa 6: Integração com Gateway

**DECISÃO IMPORTANTE:** Escolher gateway ANTES de codificar.

**Opção A: Pagar.me (Recomendado para Brasil)**
```bash
npm install pagarme
```

**Setup:**
1. Criar conta no Pagar.me
2. Obter `API_KEY` (modo teste primeiro)
3. Configurar "Split Rules" (divisão automática)
   - Recipient 1: Conta Senda (15%)
   - Recipient 2: Conta do Terapeuta (85%)

**Arquivo:** `src/app/api/payment/create-transaction/route.ts`
```typescript
import pagarme from 'pagarme';

export async function POST(req: Request) {
  const { bookingData, cardHash } = await req.json();
  
  const client = await pagarme.client.connect({ 
    api_key: process.env.PAGARME_API_KEY 
  });
  
  const transaction = await client.transactions.create({
    amount: bookingData.amount * 100, // Valor em centavos
    card_hash: cardHash, // Gerado no frontend de forma segura
    split_rules: [
      {
        recipient_id: process.env.SENDA_RECIPIENT_ID,
        percentage: 15,
      },
      {
        recipient_id: bookingData.therapistRecipientId,
        percentage: 85,
      }
    ],
    postback_url: `${process.env.NEXTAUTH_URL}/api/webhooks/pagarme`,
  });
  
  // NÃO criar Booking ainda! Esperar webhook de confirmação
  
  return NextResponse.json({ 
    transactionId: transaction.id,
    status: transaction.status 
  });
}
```

**Arquivo de Webhook:** `src/app/api/webhooks/pagarme/route.ts`
```typescript
export async function POST(req: Request) {
  const payload = await req.json();
  
  // Validar assinatura (segurança)
  if (!isValidSignature(payload, req.headers.get('x-hub-signature'))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  if (payload.event === 'transaction_status_changed' && payload.status === 'paid') {
    // AGORA SIM criar o Booking
    await prisma.booking.create({
      data: {
        clientId: payload.metadata.clientId,
        therapistId: payload.metadata.therapistId,
        serviceId: payload.metadata.serviceId,
        startTime: payload.metadata.startTime,
        endTime: payload.metadata.endTime,
        status: 'CONFIRMED',
      }
    });
    
    // Criar Payment record
    await prisma.payment.create({
      data: {
        bookingId: createdBooking.id,
        amount: payload.amount / 100,
        transactionId: payload.id,
        status: 'APPROVED',
      }
    });
    
    // Enviar email de confirmação
    await sendConfirmationEmail(payload.metadata.clientEmail);
  }
  
  return NextResponse.json({ received: true });
}
```

**Frontend de Checkout:** `src/app/checkout/page.tsx`
```typescript
'use client';
import PagarMeCheckout from 'pagarme-checkout';

export default function CheckoutPage() {
  const handlePayment = async () => {
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY!,
      success: async (data) => {
        // Enviar card_hash para o backend
        const res = await fetch('/api/payment/create-transaction', {
          method: 'POST',
          body: JSON.stringify({
            cardHash: data.card_hash,
            bookingData: { ... }
          })
        });
        
        if (res.ok) {
          router.push('/booking/success');
        }
      },
      error: (err) => {
        alert('Erro no pagamento: ' + err.message);
      }
    });
    
    checkout.open({ ... });
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="font-serif text-3xl mb-6">Confirmação e Pagamento</h1>
      
      {/* Resumo do agendamento */}
      <Card className="p-6 mb-6">
        <h2 className="font-serif text-xl mb-4">Detalhes da Sessão</h2>
        {/* Exibir terapeuta, serviço, data, hora, endereço */}
      </Card>
      
      {/* Política de cancelamento */}
      <Card className="p-6 mb-6 border-terracota">
        <h3 className="font-semibold">Política de Cancelamento</h3>
        <p className="text-sm">
          Cancelamentos com mais de 24h de antecedência são gratuitos. 
          Cancelamentos com menos de 24h terão taxa de 50%.
        </p>
        <Link href="/policies/cancellation" className="text-salvia">
          Ver política completa
        </Link>
      </Card>
      
      {/* Método de pagamento */}
      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4">Método de Pagamento</h3>
        <Button 
          className="w-full bg-salvia h-14 text-lg"
          onClick={handlePayment}
        >
          Pagar R$ {amount.toFixed(2)}
        </Button>
      </Card>
    </div>
  );
}
```

---

#### ✅ Tarefa 7: Tela de Sucesso

**Arquivo:** `src/app/booking/success/page.tsx`
```typescript
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-areia flex items-center justify-center">
      <Card className="max-w-md p-8 text-center">
        {/* Ilustração line-art de celebração */}
        <div className="mb-6">
          <SuccessIllustration /> {/* SVG orgânico */}
        </div>
        
        <h1 className="font-serif text-3xl mb-4">Tudo certo!</h1>
        <p className="text-lg mb-6">
          Sua sessão está agendada. Enviamos um e-mail de confirmação com todos os detalhes.
        </p>
        
        <div className="space-y-3">
          <Button 
            variant="outline"
            className="w-full"
            onClick={addToGoogleCalendar}
          >
            📅 Adicionar ao meu calendário
          </Button>
          
          <Button 
            className="w-full bg-salvia"
            onClick={() => router.push('/dashboard/client')}
          >
            Ver meus agendamentos
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

---

### Semana 5: Dashboards

#### ✅ Tarefa 8: Dashboard do Cliente

**Arquivo:** `src/app/dashboard/client/page.tsx`
```typescript
export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);
  const clientId = session.user.id;
  
  const upcomingBookings = await prisma.booking.findMany({
    where: {
      clientId,
      startTime: { gte: new Date() },
      status: { in: ['PENDING', 'CONFIRMED'] }
    },
    include: {
      therapist: { include: { user: true } },
      service: true
    },
    orderBy: { startTime: 'asc' }
  });
  
  const pastBookings = await prisma.booking.findMany({
    where: {
      clientId,
      startTime: { lt: new Date() },
      status: 'COMPLETED'
    },
    include: {
      therapist: { include: { user: true } },
      service: true
    },
    orderBy: { startTime: 'desc' },
    take: 10
  });
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="font-serif text-3xl mb-6">Meus Agendamentos</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Próximos</h2>
        {upcomingBookings.length === 0 ? (
          <EmptyState 
            icon={<CalendarIcon />}
            message="Você ainda não tem agendamentos"
            action={
              <Button onClick={() => router.push('/explore')}>
                Encontrar terapeutas
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <BookingCard 
                key={booking.id} 
                booking={booking}
                actions={
                  <>
                    <Button variant="outline" size="sm">Remarcar</Button>
                    <Button variant="destructive" size="sm">Cancelar</Button>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Histórico</h2>
        <div className="space-y-4">
          {pastBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking}
              actions={
                <>
                  <Button variant="outline" size="sm">Avaliar</Button>
                  <Button className="bg-salvia" size="sm">Agendar novamente</Button>
                </>
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

#### ✅ Tarefa 9: Dashboard do Terapeuta

**Arquivo:** `src/app/dashboard/therapist/page.tsx`
```typescript
export default async function TherapistDashboard() {
  const session = await getServerSession(authOptions);
  const therapist = await prisma.therapistProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true }
  });
  
  const today = new Date();
  const todayBookings = await prisma.booking.findMany({
    where: {
      therapistId: therapist!.id,
      startTime: {
        gte: startOfDay(today),
        lte: endOfDay(today)
      }
    },
    include: {
      client: { include: { user: true } },
      service: true
    },
    orderBy: { startTime: 'asc' }
  });
  
  // Financeiro do mês
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthlyEarnings = await prisma.payment.aggregate({
    where: {
      booking: { therapistId: therapist!.id },
      createdAt: { gte: startOfMonth },
      status: 'APPROVED'
    },
    _sum: { professionalAmount: true }
  });
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="font-serif text-3xl">Olá, {therapist!.user.name}</h1>
        <p className="text-gray-600">
          Você tem {todayBookings.length} sessões hoje
        </p>
      </header>
      
      {/* Cards de métricas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard 
          title="Faturamento do Mês"
          value={`R$ ${monthlyEarnings._sum.professionalAmount?.toFixed(2) || '0,00'}`}
          icon={<MoneyIcon />}
        />
        <MetricCard 
          title="Avaliação Média"
          value={therapist!.rating.toFixed(1)}
          icon={<StarIcon />}
        />
        <MetricCard 
          title="Sessões Hoje"
          value={todayBookings.length}
          icon={<CalendarIcon />}
        />
      </div>
      
      {/* Agenda do dia */}
      <section>
        <h2 className="text-2xl font-serif mb-4">Hoje</h2>
        <div className="bg-white rounded-lg shadow">
          <Timeline bookings={todayBookings} />
        </div>
      </section>
      
      {/* Quick actions */}
      <section className="mt-8">
        <h2 className="text-2xl font-serif mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-3 gap-4">
          <QuickActionCard 
            title="Gerenciar Serviços"
            icon={<ServicesIcon />}
            href="/dashboard/therapist/services"
          />
          <QuickActionCard 
            title="Definir Disponibilidade"
            icon={<ClockIcon />}
            href="/dashboard/therapist/availability"
          />
          <QuickActionCard 
            title="Ver Calendário Completo"
            icon={<CalendarIcon />}
            href="/dashboard/therapist/calendar"
          />
        </div>
      </section>
    </div>
  );
}
```

---

## 🧪 Checklist de Testes Antes de Finalizar Sprint 2

- [ ] Terapeuta consegue criar/editar/desativar serviços
- [ ] Terapeuta consegue definir disponibilidade semanal
- [ ] API de slots retorna horários corretos (testado com múltiplos cenários)
- [ ] Perfil público do terapeuta carrega corretamente (SSR funcionando)
- [ ] Cliente consegue selecionar serviço + data + horário
- [ ] Integração de pagamento funciona em modo teste
- [ ] Webhook cria Booking automaticamente após pagamento aprovado
- [ ] Email de confirmação é enviado ao cliente
- [ ] Dashboard do cliente exibe agendamentos futuros e passados
- [ ] Dashboard do terapeuta exibe sessões do dia e métricas
- [ ] Responsividade: Tudo funciona bem em mobile (375px width)

---

## 🚀 Ao Concluir Sprint 2

Você terá um **MVP funcional** do Senda! 

**Próximos passos sugeridos:**
1. Deploy em produção (Vercel + Supabase PostgreSQL)
2. Testar com 2-3 terapeutas reais e 5-10 clientes
3. Coletar feedback antes de iniciar Sprint 3 (Espaços) e Sprint 4 (Trilhas)

**Documentar em SendaDOC:**
- Problemas encontrados e soluções
- Decisões técnicas tomadas (qual gateway escolheu, por quê)
- Melhorias de UX observadas durante testes

Boa sorte! 🌿
