'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AlertCircle, ArrowLeft, Clock, User } from 'lucide-react';
import Toast from '@/components/Toast';

interface OrderData {
  therapistId: number;
  therapistName: string;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  datetime: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin');
      return;
    }

    const therapistId = searchParams.get('therapistId');
    const serviceId = searchParams.get('serviceId');
    const datetime = searchParams.get('datetime');
    const price = searchParams.get('price');

    if (!therapistId || !serviceId || !datetime || !price) {
      setToast({ message: 'Dados de agendamento incompletos', type: 'error' });
      setTimeout(() => router.back(), 2000);
      return;
    }

    fetchOrderData({
      therapistId: parseInt(therapistId),
      serviceId: parseInt(serviceId),
      datetime,
      price: parseFloat(price)
    });
  }, [session, searchParams, router]);

  const fetchOrderData = async (params: {
    therapistId: number;
    serviceId: number;
    datetime: string;
    price: number;
  }) => {
    try {
      setLoading(true);

      // Fetch therapist info
      const therapistRes = await fetch(`/api/therapists/${params.therapistId}`);
      if (!therapistRes.ok) throw new Error('Falha ao carregar informações do terapeuta');
      const therapist = await therapistRes.json();

      // Fetch service info
      const serviceRes = await fetch(`/api/services/${params.serviceId}`);
      if (!serviceRes.ok) throw new Error('Falha ao carregar informações do serviço');
      const service = await serviceRes.json();

      setOrderData({
        therapistId: params.therapistId,
        therapistName: therapist.user?.name || 'Terapeuta',
        serviceId: params.serviceId,
        serviceName: service.name || 'Serviço',
        servicePrice: params.price,
        datetime: params.datetime
      });
    } catch (error) {
      console.error('Error fetching order data:', error);
      setToast({
        message: error instanceof Error ? error.message : 'Erro ao carregar dados do pedido',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!orderData) return;

    setProcessing(true);
    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapistId: orderData.therapistId,
          serviceId: orderData.serviceId,
          startTime: new Date(orderData.datetime),
          amount: orderData.servicePrice,
          paymentMethod: paymentMethod === 'card' ? 'credit_card' : 'pix'
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao processar pagamento');
      }

      const result = await res.json();
      setToast({ message: 'Pagamento realizado com sucesso!', type: 'success' });

      setTimeout(() => {
        router.push(`/booking/success?bookingId=${result.id}`);
      }, 2000);
    } catch (error) {
      console.error('Error processing payment:', error);
      setToast({
        message: error instanceof Error ? error.message : 'Erro ao processar pagamento',
        type: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#B2B8A3] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Carregando detalhes do agendamento...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-serif mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-6">Não foi possível carregar os dados do agendamento.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#B2B8A3] text-white rounded-lg font-medium hover:bg-[#9CA89F] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(orderData.datetime);
  const sendaFee = orderData.servicePrice * 0.15;
  const therapistAmount = orderData.servicePrice - sendaFee;

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#B2B8A3] hover:text-[#9CA89F] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#F0EBE3] to-white p-8 border-b border-gray-200">
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Confirme seu agendamento</h1>
            <p className="text-gray-600">Revise os detalhes antes de finalizar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Error Message */}
              {toast?.type === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{toast.message}</p>
                </div>
              )}

              {/* Appointment Details */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl text-gray-900">Detalhes do Agendamento</h2>

                {/* Therapist Card */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{orderData.therapistName}</h3>
                      <p className="text-sm text-gray-600">Terapeuta</p>
                    </div>
                  </div>
                </div>

                {/* Service Card */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Serviço</p>
                  <h3 className="font-medium text-gray-900 mb-3">{orderData.serviceName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>60 minutos</span>
                  </div>
                </div>

                {/* Date & Time Card */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Data e Hora</p>
                  <h3 className="font-medium text-gray-900">
                    {appointmentDate.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {appointmentDate.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h2 className="font-serif text-xl text-gray-900">Forma de Pagamento</h2>

                <div className="space-y-3">
                  {/* Cartão */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-[#B2B8A3] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium text-gray-900">Cartão de Crédito</span>
                  </label>

                  {/* PIX */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'pix'
                      ? 'border-[#B2B8A3] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={() => setPaymentMethod('pix')}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium text-gray-900">PIX (em breve)</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <strong>Política de Cancelamento:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Cancelamentos com <strong>24h+</strong> de antecedência: reembolso <strong>100%</strong></li>
                  <li>• Cancelamentos com <strong>até 24h</strong>: taxa de <strong>50%</strong></li>
                </ul>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="font-serif text-lg text-gray-900 mb-6">Resumo</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Valor da sessão</span>
                    <span className="font-medium text-gray-900">
                      R$ {orderData.servicePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxa Senda (15%)</span>
                    <span className="text-gray-600">
                      -R$ {sendaFee.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-[#C8963E]">
                    R$ {orderData.servicePrice.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    O terapeuta receberá R$ {therapistAmount.toFixed(2).replace('.', ',')} após a sessão ser realizada
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing || paymentMethod === 'pix'}
                  className="w-full px-6 py-3 bg-[#B2B8A3] text-white rounded-lg font-medium hover:bg-[#9CA89F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                >
                  {processing ? 'Processando...' : 'Confirmar Pagamento'}
                </button>

                <button
                  onClick={() => router.back()}
                  disabled={processing}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
