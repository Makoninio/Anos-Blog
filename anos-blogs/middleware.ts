import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isAdminEmail } from "./lib/admin-access";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = token?.email as string | undefined;
  const isAllowed = isAdminEmail(email);

  if (pathname.startsWith("/admin")) {
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.startsWith("/api/admin")) {
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Session not found" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
