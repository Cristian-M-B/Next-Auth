import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'


export async function middleware(request) {
    const token = await getToken({ req: request })

    if (request.nextUrl.pathname.includes('/register')) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    if (request.nextUrl.pathname.includes('/login')) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    if (request.nextUrl.pathname.includes('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}