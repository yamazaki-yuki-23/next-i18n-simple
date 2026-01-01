import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const defaultLocale = 'ja'
const locales = ['en-US', 'nl-NL', 'nl', 'ja']

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return defaultLocale

  const acceptedLocales = acceptLanguage.split(',').map((part) => part.split(';')[0].trim())

  for (const locale of acceptedLocales) {
    if (locales.includes(locale)) {
      return locale
    }
    // Check for language-only match (e.g., "nl" matches "nl-NL")
    const languageOnly = locale.split('-')[0]
    const matchedLocale = locales.find((loc) => loc.startsWith(languageOnly))
    if (matchedLocale) {
      return matchedLocale
    }
  }

  return 'en-US'
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
