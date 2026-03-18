import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Replace our manual proxy logic with the robust next-intl routing engine
export default createMiddleware(routing)

export const config = {
    // Match all pathname except for API routes, static file and images
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}