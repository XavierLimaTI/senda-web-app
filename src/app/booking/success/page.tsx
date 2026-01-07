'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BookingInfo {
  id: number;
  startTime: string;
  service: { name: string };
  therapist: { user: { name: string; email: string } };
}

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const { t } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
      setError(t('common.error'));
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`);
      if (!res.ok) throw new Error(t('common.error'));
      const data = await res.json();
      setBooking(data);
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="font-serif text-3xl mb-2 text-gray-900">{t('booking.success_title')}</h1>
        <p className="text-gray-600 mb-6">
          {t('booking.success_message')}
        </p>

        {bookingId && (
          <p className="text-sm text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg">
            {t('booking.booking_number')}: <span className="font-mono font-semibold text-gray-900">#{bookingId}</span>
          </p>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-[#B2B8A3] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-sm">{t('booking.loading_details')}</p>
          </div>
        ) : booking ? (
          <>
            {/* Booking Details */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left space-y-3">
              <div>
                <p className="text-xs text-gray-600 font-medium">{t('checkout.service')}</p>
                <p className="text-sm font-medium text-gray-900">{booking.service.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">{t('checkout.therapist')}</p>
                <p className="text-sm font-medium text-gray-900">{booking.therapist.user.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">{t('checkout.date_time')}</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(booking.startTime).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} às {new Date(booking.startTime).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#F0EBE3] rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#B2B8A3]" />
                <div className="text-left text-sm">
                  <p className="font-medium text-gray-900">{t('booking.confirmed_availability')}</p>
                  <p className="text-gray-600 text-xs">{t('booking.slot_reserved')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#B2B8A3]" />
                <div className="text-left text-sm">
                  <p className="font-medium text-gray-900">{t('booking.email_confirmation')}</p>
                  <p className="text-gray-600 text-xs">{t('booking.email_reminder')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#B2B8A3]" />
                <div className="text-left text-sm">
                  <p className="font-medium text-gray-900">{t('booking.secure_access')}</p>
                  <p className="text-gray-600 text-xs">{t('booking.manage_anytime')}</p>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard/client')}
            className="w-full px-6 py-3 bg-[#B2B8A3] text-white rounded-lg font-medium hover:bg-[#9CA89F] transition-colors"
          >
            {t('booking.my_bookings')}
          </button>

          <button
            onClick={() => router.push('/explore/therapists')}
            className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {t('booking.book_another')}
          </button>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-left">
          <p className="text-xs text-gray-600">
            {t('booking.cancellation_info')}
          </p>
        </div>
      </div>
    </div>
  );
}
