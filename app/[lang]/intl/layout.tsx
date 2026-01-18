import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { getDictionaryLocale } from '@/lib/get-dictionary'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next I18n Simple - next-intl',
  description: 'next-intl sample page'
}

export default async function IntlLayout({
  params,
  children
}: Readonly<{
  params: Promise<{ lang: string }>
  children: React.ReactNode
}>) {
  const { lang } = await params
  const locale = getDictionaryLocale(lang)
  if (!locale) notFound()

  setRequestLocale(locale)
  const extractedMessages = await import(`../../../extracted-messages/${locale}.json`).then(
    (module) => module.default
  )

  return (
    <NextIntlClientProvider locale={locale} messages={extractedMessages}>
      {children}
    </NextIntlClientProvider>
  )
}
