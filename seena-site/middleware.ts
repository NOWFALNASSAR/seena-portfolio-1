import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page and login API route through untouched.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isProtectedPage = pathname.startsWith("/admin");
  const isProtectedApi = pathname.startsWith("/api/admin");

  if (isProtectedPage || isProtectedApi) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const valid = verifySessionToken(token);

    if (!valid) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
