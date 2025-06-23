import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only apply middleware to /dashboard route
    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('accessToken')?.value

        if (!token) {
            // Redirect to login if no token
            const loginUrl = new URL('/', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    // Allow request if token exists or not accessing /dashboard
    return NextResponse.next()
}
