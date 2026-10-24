'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CommunicationsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/opd');
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-[#6b7280]">
      Redirecting to Daily OPD & Patient Dispatch Desk...
    </div>
  );
}
