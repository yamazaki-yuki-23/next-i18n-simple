import 'server-only'

import { locales } from '@/constants/i18n'

import type { Locale } from '@/constants/i18n'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  nl: () => import('@/dictionaries/nl.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default)
}

const isLocale = (value: string): value is Locale => locales.includes(value as Locale)

export const getDictionaryLocale = (locale: string): Locale | null => {
  if (isLocale(locale)) return locale

  const languageOnly = locale.split('-')[0]
  if (isLocale(languageOnly)) return languageOnly

  return null
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
