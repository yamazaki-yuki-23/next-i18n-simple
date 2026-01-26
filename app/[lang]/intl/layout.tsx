import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'

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
  if (!hasLocale(routing.locales, lang)) notFound()

  setRequestLocale(lang)
  const extractedMessages = await import(`@/extracted-messages/${lang}.json`).then(
    (module) => module.default
  )

  return (
    <NextIntlClientProvider locale={lang} messages={extractedMessages}>
      {children}
    </NextIntlClientProvider>
  )
}
