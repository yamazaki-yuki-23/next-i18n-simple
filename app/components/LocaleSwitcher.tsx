'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { locales } from '@/constants/i18n'

import type { Locale } from '@/constants/i18n'

const LocaleSwitcher = () => {
  const pathname = usePathname()
  const currentLocale = pathname?.split('/')[1]

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return `/${locale}`
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-slate-500">Locale switcher</p>
      <div className="flex flex-wrap gap-2">
        {locales.map((locale) => {
          const isActive = locale === currentLocale
          return (
            <Link
              key={locale}
              href={redirectedPathname(locale)}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-md border px-3 py-1 text-sm font-medium transition ${
                isActive
                  ? 'border-slate-400 bg-slate-100 text-slate-900'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {locale}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LocaleSwitcher
