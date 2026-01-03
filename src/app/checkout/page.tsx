'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Toast from '@/components/Toast';

interface OrderData {
  bookingData: {
    therapistId: number;
    serviceId: number;
    date: string;
    time: string;
    therapistName: string;
    serviceName: string;
    servicePrice: number;
    clientName: string;
    clientEmail: string;
  };
  invoiceUrl?: string;
  paymentUrl?: string;
  qrCode?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');

  // Extrair dados da URL
  useEffect(() => {
    const therapistId = searchParams.get('therapistId');
    const serviceId = searchParams.get('serviceId');
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!therapistId || !serviceId || !date || !time) {
      setToast({ message: 'Dados de agendamento incompletos', type: 'error' });
      setTimeout(() => router.back(), 2000);
      return;
    }

    fetchOrderData({
      therapistId: parseInt(therapistId),
      serviceId: parseInt(serviceId),
      date,
      time
    });
  }, []);

  const fetchOrderData = async (params: any) => {
    try {
      setLoading(true);
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao criar pedido');
      }

      const data = await res.json();
      setOrderData(data);
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
      const res = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingData: orderData.bookingData,
          paymentMethod,
          invoiceUrl: orderData.invoiceUrl
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao processar pagamento');
      }

      const result = await res.json();
      setToast({ message: 'Pagamento realizado com sucesso!', type: 'success' });

      // Redirecionar para página de sucesso
      setTimeout(() => {
        router.push(`/booking/success?bookingId=${result.bookingId}`);
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
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (!orderData) {
    return <div className="text-center py-12">Erro ao carregar dados</div>;
  }

  const { bookingData } = orderData;
  const sendaFee = bookingData.servicePrice * 0.15; // 15% de taxa
  const netValue = bookingData.servicePrice - sendaFee;

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl mb-2">Confirmar Pagamento</h1>
          <p className="text-gray-600">Finalize seu agendamento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resumo do Agendamento */}
          <div className="md:col-span-2 space-y-6">
            {/* Dados do Agendamento */}
            <Card className="p-6">
              <h2 className="font-serif text-xl mb-4">Dados do Agendamento</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Terapeuta</p>
                  <p className="font-semibold text-lg">{bookingData.therapistName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Serviço</p>
                  <p className="font-semibold text-lg">{bookingData.serviceName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold">
                      {new Date(bookingData.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-mono font-semibold">{bookingData.time}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Método de Pagamento */}
            <Card className="p-6">
              <h2 className="font-serif text-xl mb-4">Método de Pagamento</h2>

              <div className="space-y-3">
                {/* Cartão */}
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition" style={{
                  borderColor: paymentMethod === 'card' ? '#B2B8A3' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'card' ? '#F0EBE3' : 'white'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">Cartão de Crédito</p>
                    <p className="text-sm text-gray-600">Pague com segurança em uma parcela</p>
                  </div>
                </label>

                {/* PIX */}
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition" style={{
                  borderColor: paymentMethod === 'pix' ? '#B2B8A3' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'pix' ? '#F0EBE3' : 'white'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">PIX</p>
                    <p className="text-sm text-gray-600">Transferência instantânea</p>
                  </div>
                </label>

                {/* Boleto */}
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition" style={{
                  borderColor: paymentMethod === 'boleto' ? '#B2B8A3' : '#E0E0E0',
                  backgroundColor: paymentMethod === 'boleto' ? '#F0EBE3' : 'white'
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="boleto"
                    checked={paymentMethod === 'boleto'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">Boleto Bancário</p>
                    <p className="text-sm text-gray-600">Pague em qualquer banco</p>
                  </div>
                </label>
              </div>
            </Card>

            {/* Política de Cancelamento */}
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <h3 className="font-semibold mb-2">Política de Cancelamento</h3>
              <p className="text-sm text-blue-900">
                • Cancelamentos com mais de 24h de antecedência são <strong>gratuitos</strong>
              </p>
              <p className="text-sm text-blue-900">
                • Cancelamentos com menos de 24h têm taxa de <strong>50%</strong>
              </p>
            </Card>
          </div>

          {/* Resumo de Valores */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="font-serif text-xl mb-4">Resumo</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Serviço</span>
                  <span className="font-semibold">
                    R$ {bookingData.servicePrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxa Senda (15%)</span>
                  <span>- R$ {sendaFee.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl text-[#C8963E]">
                    R$ {bookingData.servicePrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  *O terapeuta recebe R$ {netValue.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-[#B2B8A3] text-white hover:bg-[#9fa693] h-12 font-semibold"
              >
                {processing ? 'Processando...' : 'Confirmar Pagamento'}
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={processing}
                className="w-full mt-2"
              >
                Voltar
              </Button>
            </Card>
          </div>
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
