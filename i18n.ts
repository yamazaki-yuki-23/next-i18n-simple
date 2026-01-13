import { getRequestConfig } from 'next-intl/server'

import { getDictionary, getDictionaryLocale } from '@/lib/get-dictionary'

import type { Locale } from '@/constants/i18n'

const defaultLocale: Locale = 'ja'

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = getDictionaryLocale(locale ?? '') ?? defaultLocale

  return {
    locale: resolvedLocale,
    messages: await getDictionary(resolvedLocale)
  }
})
