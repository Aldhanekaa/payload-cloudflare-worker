import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Target host for remote resources on the internet
const TARGET_HOST = process.env.PROXY_TARGET_URL || 'https://andersen.feroworks.com'

// Common static resource file extensions
const RESOURCE_EXTENSIONS =
  /\.(png|jpe?g|gif|webp|svg|ico|pdf|txt|xml|json|css|js|woff2?|ttf|eot|otf|mp4|webm|ogv|mp3|wav)$/i

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Check if request is for a proxied upload path or static resource file.
  // NOTE: /api/media/ and /media/ are intentionally excluded here so Payload's
  // own R2 storage handler can serve uploaded files directly via the staticHandler.
  const isResourcePath =
    pathname.startsWith('/api/media/') ||
    pathname.startsWith('/media/') ||
    pathname.startsWith('/uploads/') ||
    RESOURCE_EXTENSIONS.test(pathname)

  if (isResourcePath) {
    return NextResponse.next()
  }

  // Bypass next-intl for API and Admin routes
  if (pathname.startsWith('/api') || pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Handle internationalization for page routes
  return intlMiddleware(request)
}

export const config = {
  // Match all paths except Next.js internal files and Vercel system paths
  matcher: ['/((?!_next|_vercel).*)'],
}

// Specify experimental-edge runtime for Cloudflare Workers compatibility (Next.js 16+)
export const runtime = 'experimental-edge'
