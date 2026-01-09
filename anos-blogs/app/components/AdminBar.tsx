'use client'

import { useSession } from "next-auth/react";

export default function AdminBar() {
  const { data: session } = useSession();
  if (!session?.user?.email) return null;
  return (
    <div className="fixed top-0 left-0 w-full bg-amber-700 text-white text-sm py-1 px-4 flex justify-between z-50 shadow">
      <span>Admin Mode</span>
      <div>
        <a href="/admin" className="underline mr-4">Admin Panel</a>
        <a href="/" className="underline">View Site</a>
      </div>
    </div>
  );
} 
