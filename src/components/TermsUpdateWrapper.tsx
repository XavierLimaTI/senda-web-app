'use client';

import { useSession } from 'next-auth/react';
import TermsUpdateBanner from './TermsUpdateBanner';
import { useEffect, useState } from 'react';

/**
 * Wrapper que carrega dados de termos do usuário e mostra banner se necessário
 */
export default function TermsUpdateWrapper() {
  const { data: session } = useSession();
  const [userTermsVersion, setUserTermsVersion] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch dados de consentimento do usuário
      fetch('/api/user/consent')
        .then((res) => res.json())
        .then((data) => {
          setUserTermsVersion(data.acceptedTermsVersion || null);
        })
        .catch((err) => console.error('Error fetching user consent:', err));
    }
  }, [session]);

  if (!session?.user) return null;

  return (
    <TermsUpdateBanner
      currentVersion={userTermsVersion}
      userRole={session.user.role as 'CLIENT' | 'THERAPIST' | 'SPACE' | null}
    />
  );
}
