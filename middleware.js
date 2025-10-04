import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  // Only protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for authentication token
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify token
    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        // Token is invalid, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};