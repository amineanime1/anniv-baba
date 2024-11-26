import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const isAdminCookie = request.cookies.get('isAdmin');
    const isAdmin = isAdminCookie?.value === 'true';
    console.log('isAdmin Cookie:', isAdminCookie); // Debug log

    if (!isAdminCookie || !isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}