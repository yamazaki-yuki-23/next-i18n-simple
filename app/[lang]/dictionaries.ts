import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  nl: () => import('@/dictionaries/nl.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default)
}

export type DictionaryLocale = keyof typeof dictionaries

const isDictionaryLocale = (locale: string): locale is DictionaryLocale => locale in dictionaries

export const getDictionaryLocale = (locale: string): DictionaryLocale | null => {
  if (isDictionaryLocale(locale)) return locale

  const languageOnly = locale.split('-')[0]
  if (isDictionaryLocale(languageOnly)) return languageOnly

  return null
}

export const getDictionary = async (locale: DictionaryLocale) => dictionaries[locale]()
