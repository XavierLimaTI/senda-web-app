import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Lista de locales suportados
export const locales = ['pt', 'en', 'es', 'zh'] as const;
export type Locale = (typeof locales)[number];

// Locale padrão
export const defaultLocale: Locale = 'pt';

export default getRequestConfig(async ({ locale }) => {
  // Validar que o locale é suportado
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
