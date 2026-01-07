'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/context/LanguageContext'

interface SubscriptionPlan {
  id: number
  name: string
  monthlyFee: number
  perSession: number
  features: string[]
  description: string
}

interface Subscription {
  id: number
  planId: number
  plan: SubscriptionPlan
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED'
  currentPeriodStart: string
  currentPeriodEnd: string
}

export function SubscriptionDashboard() {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user) {
      fetchSubscriptionData()
    }
  }, [session])

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true)

      const [plansRes, currentRes] = await Promise.all([
        fetch('/api/subscription/plans'),
        fetch('/api/subscription/current'),
      ])

      if (!plansRes.ok || !currentRes.ok) throw new Error('Failed to fetch')

      const plansData = await plansRes.json()
      const currentData = await currentRes.json()

      setPlans(plansData.plans)
      setCurrentSubscription(currentData.subscription)
    } catch (err) {
      console.error('Error fetching subscription data:', err)
      setError('Não foi possível carregar os planos')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-salvia">{t('subscription.loading')}</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-terracota">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Current Subscription Info */}
      {currentSubscription?.status === 'ACTIVE' && (
        <div className="mb-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ✓ Plano Ativo
          </h3>
          <p className="text-green-800 mb-4">
            Você está inscrito no plano <strong>{currentSubscription.plan.name}</strong>
          </p>
          <div className="text-sm text-green-700 mb-4">
            <p>
              Válido até:{' '}
              {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString(
                'pt-BR'
              )}
            </p>
          </div>
          <button
            onClick={() => setCurrentSubscription(null)}
            className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            {t('subscription.cancel')}
          </button>
        </div>
      )}

      {/* Available Plans */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">
          Escolha seu plano
        </h2>
        <p className="text-gray-600 mb-8">
          Selecione o plano que melhor se encaixa com suas necessidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={currentSubscription?.planId === plan.id}
            onSubscribe={() => {
              // Reload subscription data after subscribing
              fetchSubscriptionData()
            }}
            t={t}
          />
        ))}
      </div>
    </div>
  )
}

interface PlanCardProps {
  plan: SubscriptionPlan
  isCurrentPlan?: boolean
  onSubscribe?: () => void
  t: (key: string, params?: Record<string, string | number>) => string
}

function SubscriptionPlanCard({
  plan,
  isCurrentPlan = false,
  onSubscribe,
  t,
}: PlanCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      // Success - reload data
      onSubscribe?.()
    } catch (err) {
      setError(t('subscription.contractError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`rounded-lg overflow-hidden flex flex-col ${
        isCurrentPlan
          ? 'bg-salvia text-white shadow-lg border-2 border-dourado'
          : 'bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`p-6 ${isCurrentPlan ? 'bg-salvia' : 'bg-gray-50'}`}>
        <h3
          className={`text-2xl font-serif mb-2 ${
            isCurrentPlan ? 'text-white' : 'text-gray-900'
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm ${
            isCurrentPlan ? 'text-white/80' : 'text-gray-600'
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Pricing */}
      <div className={`px-6 py-4 ${isCurrentPlan ? '' : 'bg-gray-50'}`}>
        {plan.monthlyFee > 0 ? (
          <div>
            <div className={`text-4xl font-bold mb-1 ${isCurrentPlan ? 'text-white' : 'text-gray-900'}`}>
              R$ {plan.monthlyFee.toFixed(2).replace('.', ',')}
            </div>
            <p
              className={`text-sm ${
                isCurrentPlan ? 'text-white/80' : 'text-gray-600'
              }`}
            >
              por mês
            </p>
          </div>
        ) : (
          <div
            className={`text-2xl font-bold ${
              isCurrentPlan ? 'text-white' : 'text-gray-900'
            }`}
          >
            Gratuito
          </div>
        )}

        {plan.perSession > 0 && (
          <p
            className={`mt-2 text-sm ${
              isCurrentPlan ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            + R$ {plan.perSession.toFixed(2).replace('.', ',')} por sessão
          </p>
        )}
      </div>

      {/* Features */}
      <div className="px-6 py-4 flex-grow">
        <ul
          className={`space-y-3 ${
            isCurrentPlan ? 'text-white' : 'text-gray-600'
          }`}
        >
          {plan.features && Array.isArray(plan.features) ? (
            plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-3">✓</span>
                <span className="text-sm">{feature}</span>
              </li>
            ))
          ) : (
            <li className="text-sm">{t('subscription.noFeatures')}</li>
          )}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 border-t border-gray-200">
        {isCurrentPlan ? (
          <div
            className={`text-center py-2 px-4 rounded font-medium ${
              isCurrentPlan
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Seu plano atual
          </div>
        ) : (
          <>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                isCurrentPlan
                  ? 'bg-white text-salvia hover:bg-gray-100'
                  : 'bg-salvia text-white hover:bg-dourado'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? t('actions.processing') : t('actions.book')}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
