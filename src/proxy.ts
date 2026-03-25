import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from './auth'

// 1. Initialize the next-intl routing engine
const intlProxy = createIntlMiddleware(routing)

// 2. Wrap the main proxy export with the Auth.js middleware
export default auth((req) => {
    const isSystemRoute = req.nextUrl.pathname.includes('/system')
    const isLoggedIn = !!req.auth

    // Early return: Protects the /system route and redirects to the default login page if not authenticated
    if (isSystemRoute && !isLoggedIn) {
        return Response.redirect(new URL('api/auth/signin', req.nextUrl))
    }
    // 3. If the security check passed (or it is not a protected route), forward to next-intl for locale routing
    return intlProxy(req)
})


export const config = {
    // Match all pathname except for API routes, static file and images
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
    ]
}