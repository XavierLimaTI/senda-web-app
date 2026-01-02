/**
 * Asaas Payment Integration
 * 
 * Abstração para integração com Asaas
 * Suporta: Cartão, PIX, Boleto
 * 
 * Env vars:
 * - ASAAS_API_KEY: API key do Asaas
 * - ASAAS_API_URL: URL base (https://sandbox.asaas.com/api/v3 para teste)
 */

const API_KEY = process.env.ASAAS_API_KEY
const API_URL = process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3'

interface CreatePaymentParams {
  customer: {
    name: string
    email: string
    phone?: string
  }
  billing: {
    bookingId: number
    therapistId: number
    servicePrice: number
    sendaFee: number // Taxa Senda (ex: 10%)
  }
  dueDate: string // ISO date
  description: string
}

interface PaymentResponse {
  id: string
  customer: string
  value: number
  netValue: number
  status: string
  invoiceUrl: string
  trackingUrl: string
  paymentUrl?: string // Para PIX
}

/**
 * Criar pagamento no Asaas
 * Retorna invoice URL + tracking URL
 */
export async function createAsaasPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
  if (!API_KEY) {
    console.warn('ASAAS_API_KEY não configurado - pagamento será mockado')
    return mockPayment(params)
  }

  try {
    // Calcular valores
    const totalValue = params.billing.servicePrice
    const sendaFee = params.billing.sendaFee
    const netValue = totalValue - sendaFee

    // Criar customer no Asaas (ou usar existente)
    const customerRes = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: params.customer.name,
        email: params.customer.email,
        phone: params.customer.phone,
        mobilePhone: params.customer.phone,
        cpfCnpj: '', // TODO: capturar CPF do cliente
        notificationDisabled: false
      })
    })

    let customerId: string

    if (customerRes.ok) {
      const customerData = await customerRes.json()
      customerId = customerData.id
    } else if (customerRes.status === 422) {
      // Customer já existe, buscar por email
      const existingRes = await fetch(`${API_URL}/customers?email=${params.customer.email}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      })
      const existingData = await existingRes.json()
      customerId = existingData.data[0]?.id
    } else {
      throw new Error(`Erro ao criar customer: ${customerRes.statusText}`)
    }

    // Criar cobrança
    const paymentRes = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: customerId,
        value: totalValue,
        dueDate: params.dueDate,
        description: params.description,
        externalReference: `booking_${params.billing.bookingId}`,
        notificationDisabled: false,
        billingType: 'UNDEFINED', // Cliente escolhe no checkout
        remoteIp: '0.0.0.0'
      })
    })

    if (!paymentRes.ok) {
      const error = await paymentRes.json()
      throw new Error(`Erro ao criar pagamento: ${error.errors?.[0]?.detail || paymentRes.statusText}`)
    }

    const paymentData = await paymentRes.json()

    return {
      id: paymentData.id,
      customer: customerId,
      value: totalValue,
      netValue: netValue,
      status: paymentData.status,
      invoiceUrl: paymentData.invoiceUrl,
      trackingUrl: paymentData.trackingUrl,
      paymentUrl: paymentData.checkoutUrl // URL para checkout
    }
  } catch (error) {
    console.error('Erro Asaas:', error)
    throw error
  }
}

/**
 * Verificar status de pagamento
 */
export async function getAsaasPaymentStatus(paymentId: string): Promise<string> {
  if (!API_KEY) {
    return 'PENDING'
  }

  try {
    const res = await fetch(`${API_URL}/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    })

    if (!res.ok) throw new Error(`Erro ao buscar pagamento: ${res.statusText}`)

    const data = await res.json()
    return data.status // PENDING, CONFIRMED, RECEIVED, OVERDUE, etc
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error)
    throw error
  }
}

/**
 * Mock para desenvolvimento
 */
function mockPayment(params: CreatePaymentParams): PaymentResponse {
  const mockId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  return {
    id: mockId,
    customer: `customer_${Date.now()}`,
    value: params.billing.servicePrice,
    netValue: params.billing.servicePrice - params.billing.sendaFee,
    status: 'PENDING',
    invoiceUrl: `https://sandbox.asaas.com/i/${mockId}`,
    trackingUrl: `https://sandbox.asaas.com/t/${mockId}`,
    paymentUrl: `https://sandbox.asaas.com/checkout/${mockId}`
  }
}
