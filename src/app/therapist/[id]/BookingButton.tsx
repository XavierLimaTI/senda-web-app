'use client'

import { useRouter } from 'next/navigation'

interface Props {
  therapistId: number
  therapistName: string
}

export default function BookingButton({ therapistId, therapistName }: Props) {
  const router = useRouter()

  const handleBooking = () => {
    router.push(`/booking/${therapistId}`)
  }

  return (
    <div className="fixed bottom-6 right-6 md:static md:mt-12">
      <button
        onClick={handleBooking}
        className="px-8 py-4 md:px-6 md:py-3 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                   hover:from-[#9da390] hover:to-[#8a9280] text-white font-serif text-lg md:text-base font-semibold
                   rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                   transform hover:scale-105 w-auto whitespace-nowrap
                   flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Agendar Sessão
      </button>
    </div>
  )
}
