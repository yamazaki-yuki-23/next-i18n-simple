import { NextResponse } from 'next/server'

import { locales } from '@/constants/i18n'

import type { Locale } from '@/constants/i18n'
import type { NextRequest } from 'next/server'

const defaultLocale: Locale = 'ja'

const resolveLocale = (value?: string): Locale | null => {
  if (!value) return null
  if (locales.includes(value as Locale)) return value as Locale

  const languageOnly = value.split('-')[0]
  if (locales.includes(languageOnly as Locale)) return languageOnly as Locale

  return null
}

const getLocale = (request: NextRequest): Locale => {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return defaultLocale

  const acceptedLocales = acceptLanguage.split(',').map((part) => part.split(';')[0].trim())

  for (const locale of acceptedLocales) {
    const resolved = resolveLocale(locale)
    if (resolved) return resolved
  }

  return defaultLocale
}

export const proxy = (request: NextRequest): NextResponse | void => {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/')
  const localeFromPath = resolveLocale(segments[1])

  if (localeFromPath) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-next-intl-locale', localeFromPath)

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

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
