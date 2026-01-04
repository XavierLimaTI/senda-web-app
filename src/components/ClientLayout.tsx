'use client'

import Navbar from './Navbar'
import CookieConsent from './CookieConsent'
import TermsUpdateWrapper from './TermsUpdateWrapper'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TermsUpdateWrapper />
      <Navbar />
      {children}
      <CookieConsent />
    </>
  )
}
