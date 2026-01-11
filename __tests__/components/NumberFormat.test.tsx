import { render } from '@testing-library/react'

import NumberFormat from '@/components/NumberFormat'

describe('NumberFormat コンポーネント', () => {
  const locale = 'en'

  it.skip('number指定の値をロケールに従って表示する', () => {
    const { container } = render(
      <NumberFormat values={{ price: 1234 }} locale={locale}>
        {'Total: {price, number}'}
      </NumberFormat>
    )

    const expected = `Total: ${Intl.NumberFormat(locale).format(1234)}`
    expect(container).toHaveTextContent(expected)
  })

  it.skip('currency指定の値を通貨形式で表示する', () => {
    const { container } = render(
      <NumberFormat values={{ price: 1234 }} currency="USD" locale={locale}>
        {'Total: {price, number, currency}'}
      </NumberFormat>
    )

    const expected = `Total: ${Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(1234)}`
    expect(container).toHaveTextContent(expected)
  })

  it.skip('skeleton指定の通貨コードを使って表示する', () => {
    const { container } = render(
      <NumberFormat values={{ price: 1234 }} locale={locale}>
        {'Total: {price, number, ::currency/JPY}'}
      </NumberFormat>
    )

    const expected = `Total: ${Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'JPY'
    }).format(1234)}`
    expect(container).toHaveTextContent(expected)
  })

  it.skip('数値以外の値が渡された場合は例外を投げる', () => {
    expect(() =>
      render(
        <NumberFormat values={{ price: Number.NaN }} locale={locale}>
          {'Total: {price, number}'}
        </NumberFormat>
      )
    ).toThrow()
  })

  it.skip('currency指定で通貨コードが無い場合は例外を投げる', () => {
    expect(() =>
      render(
        <NumberFormat values={{ price: 1234 }} locale={locale}>
          {'{price, number, currency}'}
        </NumberFormat>
      )
    ).toThrow()
  })
})
