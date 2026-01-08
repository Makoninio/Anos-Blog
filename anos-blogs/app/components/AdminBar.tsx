'use client'

import { useEffect, useState } from "react";

export default function AdminBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      // Check if admin-session cookie exists (same as middleware uses)
      const cookies = document.cookie.split(';');
      const adminSession = cookies.find(cookie => 
        cookie.trim().startsWith('admin-session=')
      );
      if (adminSession && adminSession.includes('authenticated')) {
        setShow(true);
      }
    } catch {
      // Ignore cookie access errors
    }
  }, []);
  if (!show) return null;
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
