import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply to admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip authentication for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const adminSession = request.cookies.get('admin-session')?.value;
    
    console.log('Middleware check:', {
      path: request.nextUrl.pathname,
      hasSession: !!adminSession,
      sessionValue: adminSession
    });

    if (!adminSession) {
      console.log('No session found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Simple session check
    if (adminSession === 'authenticated') {
      console.log('Session verified successfully');
      return NextResponse.next();
    } else {
      console.log('Invalid session, redirecting to login');
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set('admin-session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 