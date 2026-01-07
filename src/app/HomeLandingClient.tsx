"use client"

import Link from 'next/link'
import Image from 'next/image'
import FeaturedTherapists from '@/components/FeaturedTherapists'
import { useLanguage } from '@/context/LanguageContext'

export default function HomeLandingClient() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0EBE3] via-[#B2B8A3]/10 to-[#F0EBE3]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute top-20 left-10 w-32 h-32 text-[#B2B8A3]" fill="currentColor" viewBox="0 0 100 100">
            <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10" />
          </svg>
          <svg className="absolute bottom-20 right-10 w-40 h-40 text-[#D99A8B]" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo Centralizada (maior) */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-white shadow-2xl ring-4 ring-[#B2B8A3]/20">
                <Image
                  src="/images/senda/logo.png"
                  alt={t('home.logo_alt')}
                  fill
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-6 leading-relaxed">
              {t('home.tagline_prefix')} <span className="text-[#B2B8A3]">{t('home.tagline_highlight')}</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('home.hero_paragraph')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/explore/therapists"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                           hover:from-[#9da390] hover:to-[#8a9280] text-white font-serif text-lg font-semibold
                           rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                           transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {t('home.cta_explore_therapists')}
              </Link>

              <Link
                href="/auth/signup"
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#B2B8A3] text-[#B2B8A3] 
                           font-medium rounded-full hover:bg-[#B2B8A3] hover:text-white
                           transition-all duration-200 flex items-center justify-center gap-2"
              >
                {t('home.cta_create_account')}
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              {t('home.have_account')}{' '}
              <Link href="/auth/signin" className="text-[#B2B8A3] hover:underline font-medium">
                {t('home.sign_in')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 bg-gradient-to-r from-[#D99A8B]/10 to-[#C8963E]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">
              {t('home.highlights_title')}
            </h3>
            <p className="text-gray-600">
              {t('home.highlights_subtitle')}
            </p>
          </div>

          {/* Grid de Anúncios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Anúncio 1 - Primeira Sessão */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#C8963E]/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C8963E]/10 mb-4">
                <svg className="w-6 h-6 text-[#C8963E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.highlight1_title')}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {t('home.highlight1_desc')}
              </p>
              <Link href="/explore/therapists" className="text-[#B2B8A3] font-medium hover:underline text-sm">
                {t('home.highlight1_link')}
              </Link>
            </div>

            {/* Anúncio 2 - Pacotes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#D99A8B]/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D99A8B]/10 mb-4">
                <svg className="w-6 h-6 text-[#D99A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.highlight2_title')}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {t('home.highlight2_desc')}
              </p>
              <Link href="/explore/therapies" className="text-[#B2B8A3] font-medium hover:underline text-sm">
                {t('home.highlight2_link')}
              </Link>
            </div>

            {/* Anúncio 3 - Novidades */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#B2B8A3]/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#B2B8A3]/10 mb-4">
                <svg className="w-6 h-6 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('home.highlight3_title')}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {t('home.highlight3_desc')}
              </p>
              <Link href="/explore/therapists?filter=new" className="text-[#B2B8A3] font-medium hover:underline text-sm">
                {t('home.highlight3_link')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-serif text-center text-gray-900 mb-4">
            {t('home.how_title')}
          </h3>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            {t('home.how_subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">1</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">{t('home.feature1_title')}</h4>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature1_desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D99A8B] to-[#c88a7b] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">2</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">{t('home.feature2_title')}</h4>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature2_desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C8963E] to-[#b8862e] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">3</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">{t('home.feature3_title')}</h4>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
                {t('home.trust_title_prefix')} <span className="text-[#C8963E]">{t('home.trust_title_highlight')}</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('home.trust_paragraph')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{t('home.trust_bullet1')}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{t('home.trust_bullet2')}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{t('home.trust_bullet3')}</p>
                </li>
              </ul>
            </div>

            <div className="relative">
              <FeaturedTherapists />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#B2B8A3] to-[#9da390]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
            {t('home.cta_title')}
          </h3>
          <p className="text-lg text-white/90 mb-8">
            {t('home.cta_subtitle')}
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 bg-white text-[#B2B8A3] font-semibold text-lg
                       rounded-full hover:bg-[#F0EBE3] transition-all duration-200 
                       transform hover:scale-105 shadow-lg"
          >
            {t('home.cta_button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-serif text-xl mb-4">Senda</h5>
              <p className="text-sm text-gray-400">
                {t('home.footer_tagline')}
              </p>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">{t('home.footer_for_clients')}</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/explore/therapists" className="hover:text-white transition-colors">{t('home.cta_explore_therapists')}</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">{t('home.cta_create_account')}</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white transition-colors">{t('home.sign_in')}</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">{t('home.footer_for_professionals')}</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/signup?role=THERAPIST" className="hover:text-white transition-colors">{t('navbar.signup')}</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">{t('home.how_title')}</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">{t('home.footer_support')}</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">{t('home.footer_help_center')}</Link></li>
                <li><Link href="mailto:suporte@senda.app" className="hover:text-white transition-colors">{t('home.footer_contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © {year} Senda. {t('home.footer_tagline')}
          </div>
        </div>
      </footer>
    </div>
  )
}
