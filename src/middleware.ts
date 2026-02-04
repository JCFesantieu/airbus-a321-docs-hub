import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let locales = ['en', 'fr', 'de', 'es'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirection par défaut vers 'en' si pas de locale
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|img|favicon.ico).*)',
  ],
};
