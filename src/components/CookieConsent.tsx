'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  essential: boolean; // Sempre true (cookies necessários)
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Verificar se usuário já respondeu ao banner
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Aguardar 1 segundo antes de mostrar (melhor UX)
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyEssential);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);

    // Opcional: enviar preferences para analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Overlay (apenas se detalhes visíveis) */}
      {showDetails && (
        <div
          className="absolute inset-0 bg-black bg-opacity-30 pointer-events-auto"
          onClick={() => setShowDetails(false)}
        />
      )}

      {/* Banner */}
      <div
        className={`w-full max-w-4xl mx-4 mb-6 bg-white rounded-lg shadow-2xl border-2 border-gray-200 pointer-events-auto transition-all duration-300 ${
          showDetails ? 'scale-105' : ''
        }`}
      >
        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">🍪</div>
            <div className="flex-1">
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">
                Este site usa cookies
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Usamos cookies essenciais para o funcionamento da plataforma e cookies opcionais
                para melhorar sua experiência. Você pode escolher quais aceitar.{' '}
                <Link href="/legal/privacy" className="text-[#C8963E] hover:underline font-medium">
                  Saiba mais
                </Link>
              </p>
            </div>
          </div>

          {/* Configurações Detalhadas (Expansível) */}
          {showDetails && (
            <div className="mb-4 p-4 bg-[#F0EBE3] rounded-lg border border-gray-200 space-y-3">
              {/* Essenciais (sempre ativo) */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    🔒 Cookies Essenciais
                  </div>
                  <div className="text-xs text-gray-600">
                    Necessários para login, segurança e funcionalidades básicas. Não podem ser
                    desativados.
                  </div>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 cursor-not-allowed opacity-50"
                  />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    📊 Cookies de Análise
                  </div>
                  <div className="text-xs text-gray-600">
                    Nos ajudam a entender como você usa a plataforma para melhorias (Google
                    Analytics).
                  </div>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5 text-[#B2B8A3] focus:ring-2 focus:ring-[#B2B8A3] cursor-pointer"
                  />
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    📢 Cookies de Marketing
                  </div>
                  <div className="text-xs text-gray-600">
                    Usados para mostrar anúncios relevantes e medir efetividade de campanhas.
                  </div>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-5 h-5 text-[#B2B8A3] focus:ring-2 focus:ring-[#B2B8A3] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showDetails ? (
              <>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 px-4 py-2.5 bg-[#B2B8A3] text-white font-medium rounded-lg hover:bg-[#9FA593] transition-colors"
                >
                  Salvar Preferências
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2.5 bg-[#B2B8A3] text-white font-medium rounded-lg hover:bg-[#9FA593] transition-colors"
                >
                  Aceitar Todos
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Apenas Essenciais
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2.5 border-2 border-[#C8963E] text-[#C8963E] font-medium rounded-lg hover:bg-[#F0EBE3] transition-colors"
                >
                  Gerenciar
                </button>
              </>
            )}
          </div>

          {/* Rodapé */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            Suas preferências podem ser alteradas a qualquer momento em{' '}
            <Link href="/dashboard/settings/privacy" className="text-[#C8963E] hover:underline">
              Configurações de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
