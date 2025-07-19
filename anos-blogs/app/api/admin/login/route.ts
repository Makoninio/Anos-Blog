import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Configure these credentials - CHANGE THESE FOR PRODUCTION!
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    console.log('Login attempt:', { username, expectedUsername: ADMIN_USERNAME });

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('Login successful, setting session cookie');

      // Set simple session cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: false, // Set to false for localhost development
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });

      console.log('Session cookie set');
      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 