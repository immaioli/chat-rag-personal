import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from './auth'
import { NextResponse } from 'next/server'

const intlProxy = createIntlMiddleware(routing)

export const proxy = auth((req) => {
    const pathname = req.nextUrl.pathname;
    const isLoggedIn = !!req.auth;

    // TELEMETRY: Logs proxy decisions to the terminal
    console.log(`[Proxy Edge] Route: ${pathname} | Logged in: ${isLoggedIn}`);

    // RULE 1: Protect the system route
    if (pathname.includes('/system') && !isLoggedIn) {
        return NextResponse.redirect(new URL('/pt-BR/login', req.nextUrl));
    }

    // RULE 2: Prevent logged-in users from seeing the login page
    if (pathname.includes('/login') && isLoggedIn) {
        return NextResponse.redirect(new URL('/pt-BR/system', req.nextUrl));
    }

    // RULE 3: Forward to next-intl for locale routing
    return intlProxy(req);
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}