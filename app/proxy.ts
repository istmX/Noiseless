import { auth } from "@/shared/lib/auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
  
  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  if (req.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }

});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
