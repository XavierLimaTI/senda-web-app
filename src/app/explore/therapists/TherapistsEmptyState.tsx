'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function TherapistsEmptyState() {
  const { t } = useLanguage()

  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{t('explore.therapists.no_results_title')}</h3>
      <p className="text-gray-600 mb-4">
        {t('explore.therapists.no_results_desc')}
      </p>
      <a
        href="/explore/therapists"
        className="inline-block px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
      >
        {t('explore.therapists.view_all')}
      </a>
    </div>
  )
}
