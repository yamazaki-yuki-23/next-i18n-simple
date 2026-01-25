import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
  experimental: {
    srcPath: './app',
    messages: {
      path: './extracted-messages',
      format: 'json',
      locales: ['en', 'ja', 'nl']
    },
    extract: {
      sourceLocale: 'ja'
    }
  }
})
export default withNextIntl(nextConfig)
