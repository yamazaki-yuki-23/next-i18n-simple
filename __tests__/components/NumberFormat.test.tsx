import { render } from '@testing-library/react'

import NumberFormat from '@/components/NumberFormat'

describe('NumberFormat コンポーネント', () => {
  const locale = 'en'

  it('number指定の値をロケールに従って表示する', () => {
    const { container } = render(
      <NumberFormat values={{ price: 1234 }} locale={locale}>
        {'Total: {price, number}'}
      </NumberFormat>
    )

    const expected = `Total: ${Intl.NumberFormat(locale).format(1234)}`
    expect(container).toHaveTextContent(expected)
  })

  it('currency指定の値を通貨形式で表示する', () => {
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

  it('skeleton指定の通貨コードを使って表示する', () => {
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

  it('percent指定の値をパーセント表記で表示する', () => {
    const { container } = render(
      <NumberFormat values={{ value: 0.42 }} locale={locale}>
        {'Rate: {value, number, percent}'}
      </NumberFormat>
    )

    const expected = `Rate: ${Intl.NumberFormat(locale, { style: 'percent' }).format(0.42)}`
    expect(container).toHaveTextContent(expected)
  })

  it('skeleton指定の小数点以下2桁で表示する', () => {
    const { container } = render(
      <NumberFormat values={{ value: 1234.567 }} locale={locale}>
        {'Value: {value, number, ::.##}'}
      </NumberFormat>
    )

    const expected = `Value: ${Intl.NumberFormat(locale, {
      maximumFractionDigits: 2
    }).format(1234.567)}`
    expect(container).toHaveTextContent(expected)
  })

  it('数値以外の値が渡された場合は例外を投げる', () => {
    expect(() =>
      render(
        <NumberFormat values={{ price: Number.NaN }} locale={locale}>
          {'Total: {price, number}'}
        </NumberFormat>
      )
    ).toThrow()
  })

  it('currency指定で通貨コードが無い場合は例外を投げる', () => {
    expect(() =>
      render(
        <NumberFormat values={{ price: 1234 }} locale={locale}>
          {'{price, number, currency}'}
        </NumberFormat>
      )
    ).toThrow()
  })
})
