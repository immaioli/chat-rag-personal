import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// The proxy function replaces the legacy middleware and runs on Node.js
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Simple i18n routing: redirect root to Portuguese by default
    // Early return parttern applied here
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/pt-BR', request.url))
    }

}

// Ensure the proxy doesn't intercept static files or API routes
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}