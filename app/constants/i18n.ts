export const locales = ['en', 'nl', 'ja'] as const

export type Locale = (typeof locales)[number]
