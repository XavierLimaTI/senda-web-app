'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LegalConsentModalProps {
  isOpen: boolean;
  onAccept: (consents: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  }) => void;
  onReject?: () => void;
  userRole?: 'CLIENT' | 'THERAPIST' | 'SPACE';
}

export default function LegalConsentModal({
  isOpen,
  onAccept,
  onReject,
  userRole = 'CLIENT'
}: LegalConsentModalProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);

  if (!isOpen) return null;

  const canProceed = acceptedTerms && acceptedPrivacy;

  const handleAccept = () => {
    if (canProceed) {
      onAccept({
        terms: acceptedTerms,
        privacy: acceptedPrivacy,
        marketing: acceptedMarketing
      });
    }
  };

  const roleLabel = {
    CLIENT: 'cliente',
    THERAPIST: 'terapeuta',
    SPACE: 'espaço terapêutico'
  }[userRole];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-[#F0EBE3]">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">
            Termos de Uso e Privacidade
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Antes de continuar como <span className="font-medium text-[#B2B8A3]">{roleLabel}</span>, precisamos do seu consentimento
          </p>
        </div>

        {/* Content (Scrollable) */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            {/* Termos de Uso */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-[#B2B8A3] focus:ring-[#B2B8A3] focus:ring-offset-0 transition-colors"
                />
                <span className="flex-1 text-sm leading-relaxed">
                  <span className="text-gray-900 font-medium">
                    Li e aceito os{' '}
                    <Link
                      href="/legal/terms"
                      target="_blank"
                      className="text-[#C8963E] hover:underline font-semibold"
                    >
                      Termos de Uso
                    </Link>
                  </span>
                  <span className="block mt-1 text-gray-600 text-xs">
                    Entendo que a Senda é uma plataforma de intermediação e que as sessões ocorrem diretamente entre clientes e profissionais.
                  </span>
                </span>
              </label>
            </div>

            {/* Política de Privacidade */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-[#B2B8A3] focus:ring-[#B2B8A3] focus:ring-offset-0 transition-colors"
                />
                <span className="flex-1 text-sm leading-relaxed">
                  <span className="text-gray-900 font-medium">
                    Li e aceito a{' '}
                    <Link
                      href="/legal/privacy"
                      target="_blank"
                      className="text-[#C8963E] hover:underline font-semibold"
                    >
                      Política de Privacidade
                    </Link>
                  </span>
                  <span className="block mt-1 text-gray-600 text-xs">
                    Autorizo o tratamento dos meus dados pessoais conforme a LGPD (Lei 13.709/2018). Você pode gerenciar seus dados a qualquer momento nas configurações.
                  </span>
                </span>
              </label>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Marketing (Opcional) */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedMarketing}
                  onChange={(e) => setAcceptedMarketing(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-[#D99A8B] focus:ring-[#D99A8B] focus:ring-offset-0 transition-colors"
                />
                <span className="flex-1 text-sm leading-relaxed">
                  <span className="text-gray-900 font-medium">
                    Quero receber emails sobre novidades e promoções
                    <span className="ml-2 text-xs text-gray-500 font-normal">(opcional)</span>
                  </span>
                  <span className="block mt-1 text-gray-600 text-xs">
                    Enviaremos dicas de bem-estar, novas trilhas de autocuidado e ofertas especiais. Você pode cancelar a qualquer momento.
                  </span>
                </span>
              </label>
            </div>

            {/* Documentos Adicionais */}
            <div className="bg-[#F0EBE3] rounded-lg p-4 mt-6">
              <p className="text-xs text-gray-700 mb-2 font-medium">
                📄 Documentos adicionais para consulta:
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <Link
                  href="/legal/cancellation"
                  target="_blank"
                  className="text-[#B2B8A3] hover:text-[#C8963E] transition-colors underline"
                >
                  Política de Cancelamento
                </Link>
                <Link
                  href="/legal/payment"
                  target="_blank"
                  className="text-[#B2B8A3] hover:text-[#C8963E] transition-colors underline"
                >
                  Termos de Pagamento
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          {onReject && (
            <button
              onClick={onReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
          )}
          <div className="flex-1"></div>
          <button
            onClick={handleAccept}
            disabled={!canProceed}
            className={`
              px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
              ${canProceed
                ? 'bg-[#B2B8A3] hover:bg-[#9FA593] text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {canProceed ? 'Aceitar e Continuar' : 'Marque os termos obrigatórios'}
          </button>
        </div>

        {/* Versão dos Termos (footer absoluto) */}
        <div className="px-6 py-2 bg-gray-100 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Versão dos Termos: <span className="font-mono font-medium">1.0.0</span> • Última atualização: 3 de janeiro de 2026
          </p>
        </div>
      </div>
    </div>
  );
}
