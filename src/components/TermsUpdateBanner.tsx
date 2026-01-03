'use client';

import { useEffect, useState } from 'react';
import LegalConsentModal from './LegalConsentModal';

const CURRENT_TERMS_VERSION = '1.0.0';

interface TermsUpdateBannerProps {
  currentVersion: string | null;
  userRole: 'CLIENT' | 'THERAPIST' | 'SPACE' | null;
}

/**
 * Componente que verifica se o usuário precisa re-aceitar termos
 * Se houver nova versão dos termos, mostra banner e modal de aceite
 */
export default function TermsUpdateBanner({ currentVersion, userRole }: TermsUpdateBannerProps) {
  const [showModal, setShowModal] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    // Verificar se há nova versão de termos
    if (currentVersion && currentVersion !== CURRENT_TERMS_VERSION) {
      setHasUpdate(true);
    }
  }, [currentVersion]);

  const handleAcceptNewTerms = async (consents: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  }) => {
    try {
      // Atualizar versão de termos no DB
      const res = await fetch('/api/user/accept-terms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acceptedTermsVersion: CURRENT_TERMS_VERSION,
          marketingConsent: consents.marketing,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setHasUpdate(false);
        // Recarregar página para atualizar estado
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro ao aceitar novos termos:', error);
    }
  };

  if (!hasUpdate) return null;

  return (
    <>
      {/* Banner de Notificação */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-amber-50 border-b-2 border-amber-400 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <h3 className="font-serif font-bold text-amber-900">Novos Termos de Serviço</h3>
              <p className="text-sm text-amber-800">
                Os Termos de Uso foram atualizados. Por favor, revise e aceite as novas condições
                para continuar usando a plataforma.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="whitespace-nowrap px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
          >
            Revisar Termos
          </button>
        </div>
      </div>

      {/* Modal de Aceite */}
      <LegalConsentModal
        isOpen={showModal}
        onAccept={handleAcceptNewTerms}
        userRole={userRole || 'CLIENT'}
      />

      {/* Spacer para afastar conteúdo do banner */}
      {hasUpdate && <div className="h-24" />}
    </>
  );
}
