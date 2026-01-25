import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import SampleTranslation from '@/components/SampleTranslation'

describe('SampleTranslation コンポーネント', () => {
  const locale = 'ja'

  const renderWithProvider = () =>
    render(
      <NextIntlClientProvider locale={locale}>
        <SampleTranslation />
      </NextIntlClientProvider>
    )

  it('各メッセージがフォーマットされて表示される', () => {
    renderWithProvider()

    expect(screen.getByText('こんにちは！')).toBeInTheDocument()
    expect(screen.getByText('こんにちは、Janeさん！')).toBeInTheDocument()

    const followersCount = Intl.NumberFormat(locale).format(3580)
    expect(screen.getByText(`フォロワーが${followersCount}人います。`)).toBeInTheDocument()

    const ordinal = Intl.NumberFormat(locale).format(22)
    expect(screen.getByText(`${ordinal}回目のお誕生日です！`)).toBeInTheDocument()

    expect(screen.getByText('彼女はオンラインです。')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: 'ガイドライン' })
    expect(link).toHaveAttribute('href', 'https://next-intl.dev/docs/getting-started')
  })
})
