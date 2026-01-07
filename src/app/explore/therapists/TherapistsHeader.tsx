'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function TherapistsHeader() {
  const { t } = useLanguage()
  
  return (
    <div className="bg-white border-b-4 border-[#B2B8A3] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
          {t('explore.therapists.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {t('explore.therapists.subtitle')}
        </p>
      </div>
    </div>
  )
}
