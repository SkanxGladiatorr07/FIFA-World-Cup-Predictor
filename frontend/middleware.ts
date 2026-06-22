import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  
  // Only handle auth pages - redirect to dashboard if already logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Let dashboard pages through - client-side will handle auth check
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'],
};
