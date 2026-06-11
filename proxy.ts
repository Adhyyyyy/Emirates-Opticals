import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // --- SECURITY HEADERS & CSP ---
  const isProd = process.env.NODE_ENV === 'production';
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} https://api.cloudinary.com;
    frame-src 'self' https://maps.google.com https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${isProd ? 'upgrade-insecure-requests;' : ''}
  `.replace(/\s{2,}/g, ' ').trim();

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply Security Headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          const remember = request.cookies.get("sb-remember-me")?.value === "true";

          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions = remember 
              ? { ...options, maxAge: 60 * 60 * 24 * 365 } // Persist for 1 year if checked
              : { ...options, maxAge: undefined, expires: undefined }; // Session-only if unchecked
            response.cookies.set(name, value, cookieOptions);
          });
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname;

  // --- AUTO-REDIRECT LOGGED IN USERS AWAY FROM LOGIN ---
  if (pathname === '/login' && user) {
    const userRole = (user.app_metadata?.role as any) || 'CUSTOMER';
    if (userRole === "SUPER_ADMIN" || userRole === "BRANCH_ADMIN") {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (userRole === "STAFF") {
      return NextResponse.redirect(new URL('/admin/appointments', request.url));
    } else {
      return NextResponse.redirect(new URL('/account', request.url));
    }
  }

  // --- SCALEABLE ROUTE PROTECTION ---
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/account')) {
    if (!user) {
      console.log("🚫 [Proxy] Redirecting to /login because user is null");
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const userRole = (user.app_metadata?.role as any) || 'CUSTOMER'
    
    // Use the central RBAC utility to validate access
    const { canAccessRoute } = await import("@/lib/auth/rbac")
    
    if (!canAccessRoute(userRole, pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
