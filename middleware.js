import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // or read from cookies

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const protectedPaths = ['/dashboard', '/admin', '/about'];

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
