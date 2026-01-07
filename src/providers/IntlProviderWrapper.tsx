'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMessages, useLocale, AbstractIntlMessages } from 'next-intl';

type IntlContextType = {
  locale: string;
  messages: AbstractIntlMessages;
};

const IntlContext = createContext<IntlContextType | undefined>(undefined);

interface IntlProviderWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper para next-intl que pode coexistir com o LanguageContext atual
 * Durante a migração, os componentes podem usar tanto t() do LanguageContext
 * quanto useTranslations() do next-intl
 */
export function IntlProviderWrapper({ children }: IntlProviderWrapperProps) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <IntlContext.Provider value={{ locale, messages }}>
      {children}
    </IntlContext.Provider>
  );
}

export function useIntlContext() {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useIntlContext must be used within IntlProviderWrapper');
  }
  return context;
}
