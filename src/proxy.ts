import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from './auth'
import { NextResponse } from 'next/server'

const intlProxy = createIntlMiddleware(routing)

export const proxy = auth((req) => {
    const pathname = req.nextUrl.pathname;
    const isLoggedIn = !!req.auth;

    console.log(`[Proxy Edge] Route: ${pathname} | Logged in: ${isLoggedIn}`);

    // RULE 1: PROTECT THE ADMIN DASHBOARD
    if (pathname === '/system' && !isLoggedIn) {
        return NextResponse.redirect(new URL('/system/login', req.nextUrl));
    }

    // RULE 2: PREVENT LOGGED-IN ADMINS FROM SEEING THE LOGIN PAGE
    if (pathname === '/system/login' && isLoggedIn) {
        return NextResponse.redirect(new URL('/system', req.nextUrl));
    }

    // RULE 3: BYPASS i18n FOR ALL ADMIN ROUTES
    // Ensures Next.js doesn't try to translate /system or /system/login
    if (pathname.startsWith('/system')) {
        return NextResponse.next();
    }

    // RULE 4: Forward everything else (like the public chat) to next-intl
    return intlProxy(req);
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}