import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protect all pages behind authentication except the login page itself
// and NextAuth API routes.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow: login page, NextAuth API routes
  const publicPaths = [
    '/auth/login',
    '/api/auth',
  ];

  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));
  const isStaticAsset = /\.(svg|png|jpg|jpeg|gif|webp|pdf|ico|css|js)$/.test(pathname);
  const isNextInternal = pathname.startsWith('/_next');

  if (isPublic || isStaticAsset || isNextInternal) {
    // If user is already signed in and visits login page, redirect to home
    if (pathname === '/auth/login') {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
      if (token) {
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/';
        return NextResponse.redirect(new URL(callbackUrl, request.url));
      }
    }
    return NextResponse.next();
  }

  // Check for NextAuth session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (svgs, pdfs, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
  ],
};
