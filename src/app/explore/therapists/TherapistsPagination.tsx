'use client'

import { useLanguage } from '@/context/LanguageContext'

interface Props {
  page: number
  totalPages: number
  specialty: string
}

export default function TherapistsPagination({ page, totalPages, specialty }: Props) {
  const { t } = useLanguage()

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {page > 1 && (
        <a
          href={`/explore/therapists?specialty=${specialty}&page=${page - 1}`}
          className="px-4 py-2 border border-[#B2B8A3] text-[#B2B8A3] rounded-lg hover:bg-[#B2B8A3] hover:text-white transition-colors"
        >
          {t('explore.therapists.prev')}
        </a>
      )}

      <div className="text-gray-600">
        {t('explore.therapists.page_of', { page: String(page), total: String(totalPages) })}
      </div>

      {page < totalPages && (
        <a
          href={`/explore/therapists?specialty=${specialty}&page=${page + 1}`}
          className="px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
        >
          {t('explore.therapists.next')}
        </a>
      )}
    </div>
  )
}
