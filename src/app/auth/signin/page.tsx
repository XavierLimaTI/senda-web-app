import React from 'react'
import SignInClient from './SignInClient'

export default function SignInPage() {
  return (
    <React.Suspense fallback={<div />}>
      <SignInClient />
    </React.Suspense>
  )
}
