import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("auth-storage")?.value;
  let isAuthenticated = false;

  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie);
      isAuthenticated = Boolean(parsed?.state?.accessToken);
    } catch {
      isAuthenticated = false;
    }
  }

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")

  const noRedirectPage =
    pathname.startsWith("/privacy") ||
    pathname === '/'

  if (!isAuthenticated && !isAuthPage && !noRedirectPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
