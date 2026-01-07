'use client';

import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Hook unificado de tradução que tenta usar next-intl primeiro,
 * e faz fallback para o LanguageContext antigo se necessário.
 * 
 * Uso:
 * const { t, locale } = useUnifiedTranslation('bookings');
 * 
 * // Para next-intl (novo):
 * t('my_bookings') // retorna tradução do messages/pt.json -> bookings.my_bookings
 * 
 * // Para LanguageContext (legado):
 * tLegacy('bookings.my_bookings') // usa o sistema antigo
 */
export function useUnifiedTranslation(namespace?: string) {
  const { language, t: tLegacy } = useLanguage();
  
  // Tenta usar next-intl se um namespace for fornecido
  let tNextIntl: ReturnType<typeof useNextIntlTranslations> | null = null;
  
  try {
    if (namespace) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      tNextIntl = useNextIntlTranslations(namespace);
    }
  } catch {
    // next-intl não configurado ou namespace não existe
    tNextIntl = null;
  }

  // Função de tradução unificada
  const t = (key: string, params?: Record<string, string | number>) => {
    // Primeiro tenta next-intl
    if (tNextIntl) {
      try {
        const translation = tNextIntl(key, params);
        if (translation && translation !== key) {
          return translation;
        }
      } catch {
        // Chave não encontrada no next-intl
      }
    }

    // Fallback para LanguageContext
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return tLegacy(fullKey);
  };

  return {
    t,
    tLegacy, // Acesso direto ao sistema legado se necessário
    tNextIntl, // Acesso direto ao next-intl se necessário
    locale: language,
    language // Alias para compatibilidade
  };
}

/**
 * Hook simplificado para usar apenas next-intl (para novos componentes)
 */
export function useNewTranslation(namespace: string) {
  const t = useNextIntlTranslations(namespace);
  const { language } = useLanguage();
  
  return {
    t,
    locale: language
  };
}
