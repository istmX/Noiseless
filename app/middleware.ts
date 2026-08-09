import { auth } from "@/shared/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  
  // Define route groups
  const isPublicPage = pathname === "/" || pathname.startsWith("/privacy") || pathname.startsWith("/terms");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  
  if (!isLoggedIn && !isAuthPage && !isPublicPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
  
  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/watches", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logos|globe.svg|file.svg|vercel.svg|next.svg|window.svg).*)"],
};
