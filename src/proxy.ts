import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from './auth'
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// CONFIGURATION: Upstash Redis connection for rate limiting
const redisInstance = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
})

// CONFIGURATION: Allow 10 requests per minute
const rateLimiter = new Ratelimit({
    redis: redisInstance,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: true
})

const intlProxy = createIntlMiddleware(routing)

// SECURITY: Added async to support the Redis await call
export const proxy = auth(async (req: any) => {
    const pathname = req.nextUrl.pathname
    const isLoggedIn = !!req.auth

    // SECURITY RULE: Intercept the chat API request to prevent abuse before any other logic
    if (pathname === '/api/chat') {
        const clientIpAddress = req.headers.get('x-forwarded-for') || '127.0.0.1'
        const { success, limit, reset, remaining } = await rateLimiter.limit(clientIpAddress)

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again in a minute.' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString()
                    }
                }
            )
        }

        // Let the API route process the request normally if it passes the rate limit
        return NextResponse.next()
    }

    // RULE 1: PROTECT THE ADMIN DASHBOARD
    if (pathname === '/system' && !isLoggedIn) {
        return NextResponse.redirect(new URL('/system/login', req.nextUrl))
    }

    // RULE 2: PREVENT LOGGED-IN ADMINS FROM SEEING THE LOGIN PAGE
    if (pathname === '/system/login' && isLoggedIn) {
        return NextResponse.redirect(new URL('/system', req.nextUrl))
    }

    // RULE 3: BYPASS i18n FOR ALL ADMIN ROUTES
    // Ensures Next.js doesn't try to translate /system or /system/login
    if (pathname.startsWith('/system')) {
        return NextResponse.next()
    }

    // RULE 4: BYPASS SENTRY MONITORING TUNNEL
    // Ensures next-intl does not redirect the Sentry tunnel request to a locale path
    if (pathname === '/monitoring') {
        return NextResponse.next()
    }

    // RULE 5: Forward everything else (like the public chat) to next-intl
    return intlProxy(req)
})

export const config = {
    matcher: [
        // Matches all UI routes except static files and images
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
        // Explicitly forces the proxy to intercept the chat API for rate limiting
        '/api/chat'
    ]
}