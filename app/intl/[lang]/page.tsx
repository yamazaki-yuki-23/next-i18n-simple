'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function IntlHome() {
  const t = useTranslations('intlPage')
  const locale = useLocale()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          {t('title')}
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t('subtitle', { locale })}
        </p>
        <p className="text-base leading-7 text-zinc-800 dark:text-zinc-200">{t('description')}</p>
        <Link
          className="text-base font-semibold text-blue-600 underline decoration-2 underline-offset-4"
          href={`/${locale}`}
        >
          {t('backLink')}
        </Link>
      </main>
    </div>
  )
}
