'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface PrivacyDashboardProps {
  initialConsents: {
    email: string;
    acceptedTermsAt: string | null;
    acceptedTermsVersion: string | null;
    marketingConsent: boolean;
    dataProcessingConsent: boolean;
    emailVerified: boolean | null;
  };
}

export default function PrivacyDashboard({ initialConsents }: PrivacyDashboardProps) {
  const { t, language } = useLanguage();
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US';
  
  const [consents, setConsents] = useState(initialConsents);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState('');

  // Atualizar consentimentos
  const handleConsentChange = async (field: 'marketingConsent' | 'dataProcessingConsent', value: boolean) => {
    if (field === 'dataProcessingConsent' && !value) {
      setMessage({
        type: 'error',
        text: t('privacy.dataProcessingRequired'),
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/user/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });

      const data = await res.json();

      if (res.ok) {
        setConsents((prev) => ({ ...prev, [field]: value }));
        setMessage({
          type: 'success',
          text: t('privacy.preferencesUpdated'),
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || t('privacy.preferencesError'),
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t('errors.server'),
      });
    } finally {
      setLoading(false);
    }
  };

  // Exportar dados
  const handleExportData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/export-data', {
        method: 'GET',
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `senda-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setMessage({
          type: 'success',
          text: t('privacy.exportSuccess'),
        });
      } else {
        setMessage({
          type: 'error',
          text: t('privacy.exportError'),
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t('errors.server'),
      });
    } finally {
      setLoading(false);
    }
  };

  // Deletar conta
  const handleDeleteAccount = async () => {
    if (deleteConfirmEmail !== consents.email) {
      setMessage({
        type: 'error',
        text: t('privacy.emailMismatch'),
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/user/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmEmail: deleteConfirmEmail,
          reason: 'User-initiated deletion',
        }),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: t('privacy.accountDeleted'),
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        const data = await res.json();
        setMessage({
          type: 'error',
          text: data.error || t('privacy.deleteError'),
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t('errors.server'),
      });
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteConfirmEmail('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mensagens */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* 1. Status de Termos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
          📋 Status de Termos e Políticas
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">Termos de Uso</div>
              <div className="text-gray-600">Versão {consents.acceptedTermsVersion || '—'}</div>
            </div>
            <div>
              {consents.acceptedTermsAt ? (
                <div className="text-right">
                  <div className="text-green-600 font-semibold">✅ Aceito</div>
                  <div className="text-xs text-gray-500">
                    {new Date(consents.acceptedTermsAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ) : (
                <div className="text-amber-600 font-semibold">⚠️ Pendente</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">Email Verificado</div>
              <div className="text-gray-600">Necessário para usar a plataforma</div>
            </div>
            <div>
              {consents.emailVerified ? (
                <div className="text-green-600 font-semibold">✅ Verificado</div>
              ) : (
                <div className="text-amber-600 font-semibold">⚠️ Não verificado</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href="/legal/terms"
            className="text-sm text-[#C8963E] hover:underline font-medium"
          >
            Ver Termos de Uso completos →
          </Link>
        </div>
      </div>

      {/* 2. Preferências de Consentimento */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
          🔐 Preferências de Consentimento
        </h3>
        <div className="space-y-4">
          {/* Marketing Consent */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">📢 Emails de Marketing</div>
              <div className="text-sm text-gray-600">
                Receber emails sobre novidades, promoções e atualizações da plataforma.
              </div>
            </div>
            <div className="ml-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={consents.marketingConsent}
                  onChange={(e) => handleConsentChange('marketingConsent', e.target.checked)}
                  disabled={loading}
                  className="w-5 h-5 text-[#B2B8A3] focus:ring-2 focus:ring-[#B2B8A3] cursor-pointer disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {consents.marketingConsent ? 'Habilitado' : 'Desabilitado'}
                </span>
              </label>
            </div>
          </div>

          {/* Data Processing Consent */}
          <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">🔒 Processamento de Dados</div>
              <div className="text-sm text-gray-600">
                Obrigatório. Necessário para funcionar a plataforma e processar suas transações.
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-semibold text-green-600">✅ Obrigatório</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            href="/legal/privacy"
            className="text-sm text-[#C8963E] hover:underline font-medium"
          >
            Ver Política de Privacidade completa →
          </Link>
        </div>
      </div>

      {/* 3. Exportar Dados (LGPD Art. 18) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
          📦 Exportar Seus Dados
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Baixe uma cópia de todos os seus dados em formato JSON. Inclui perfil, transações, e
          consentimentos.
        </p>
        <p className="text-xs text-gray-500 mb-4">Lei Geral de Proteção de Dados (LGPD), Art. 18</p>

        <button
          onClick={handleExportData}
          disabled={loading}
          className="px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9FA593] disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? '⏳ Exportando...' : '📥 Baixar Meus Dados'}
        </button>
      </div>

      {/* 4. Deletar Conta (LGPD Art. 18) */}
      <div className="bg-white rounded-lg shadow p-6 border-2 border-red-200">
        <h3 className="text-lg font-serif font-bold text-red-700 mb-2">
          🗑️ Deletar Conta Permanentemente
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Esta ação é irreversível. Todos os seus dados serão deletados permanentemente.
        </p>
        <p className="text-xs text-gray-500 mb-4">Lei Geral de Proteção de Dados (LGPD), Art. 18</p>

        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
        >
          🗑️ Deletar Minha Conta
        </button>
      </div>

      {/* Modal de Confirmação */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Tem certeza?</h2>
            <p className="text-gray-600 mb-4">
              Ao deletar sua conta, você perderá:
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1 ml-4">
              <li>✓ Seu perfil e dados pessoais</li>
              <li>✓ Histórico de transações</li>
              <li>✓ Agendamentos futuros</li>
              <li>✓ Todos os consentimentos registrados</li>
            </ul>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Digite seu email para confirmar:
              </label>
              <input
                type="email"
                value={deleteConfirmEmail}
                onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                placeholder={consents.email}
                className="w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmEmail('');
                }}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmEmail !== consents.email}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? '⏳ Deletando...' : 'Deletar Conta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
