'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { locales } from '@/constants/i18n'

import type { Locale } from '@/constants/i18n'

const LocaleSwitcher = () => {
  const pathname = usePathname()

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
        {locales.map((locale) => (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className="rounded-md border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {locale}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LocaleSwitcher
