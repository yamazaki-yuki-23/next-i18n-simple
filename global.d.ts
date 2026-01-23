import type { Locale } from './app/constants/i18n'
import type { getDictionary } from './app/lib/get-dictionary'

type Messages = Awaited<ReturnType<typeof getDictionary>>

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: Messages
  }
}

export {}
