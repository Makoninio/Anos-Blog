'use client';

import dynamic from 'next/dynamic';

const AdminBar = dynamic(() => import('./AdminBar'), {
  ssr: false,
});

export default function AdminBarWrapper() {
  return <AdminBar />;
}

