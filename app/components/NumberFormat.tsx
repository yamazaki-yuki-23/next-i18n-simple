import { Fragment } from 'react'

import type { ReactNode } from 'react'

type Values = Record<string, number>

type Props = {
  values: Values
  locale: string
  currency?: string
  children: string
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

/**
 * Intl.NumberFormat を使って数値をロケールに従って整形する。
 * @param {number} value 対象の数値
 * @param {string} locale 使用するロケール
 * @param {Intl.NumberFormatOptions} [options] 追加のフォーマット指定
 * @returns {string} 整形後の文字列
 */
const formatNumber = (value: number, locale: string, options?: Intl.NumberFormatOptions): string =>
  new Intl.NumberFormat(locale, options).format(value)

/**
 * number の第3引数を通貨コードとして解決する。
 * @param {string} token number の第3引数
 * @param {string} [currency] props で渡された通貨コード
 * @returns {string} 解決された通貨コード
 */
const resolveCurrency = (token: string, currency?: string): string => {
  if (token === 'currency') {
    if (!currency) throw new Error('Currency is required for currency formatting.')
    return currency
  }

  if (token.startsWith('::currency/')) {
    const code = token.replace('::currency/', '').trim()
    if (!code) throw new Error('Currency code is required in currency skeleton.')
    return code
  }

  throw new Error(`Unsupported currency format: ${token}`)
}

/**
 * number の第3引数から Intl.NumberFormatOptions を組み立てる。
 * @param {string} token number の第3引数
 * @param {string} [currency] 通貨コード
 * @returns {Intl.NumberFormatOptions} フォーマットオプション
 */
const resolveNumberOptions = (token: string, currency?: string): Intl.NumberFormatOptions => {
  if (token === 'percent') {
    return { style: 'percent' }
  }

  if (token === 'currency' || token.startsWith('::currency/')) {
    const code = resolveCurrency(token, currency)
    return { style: 'currency', currency: code }
  }

  if (token === '::.##') {
    return { maximumFractionDigits: 2 }
  }

  throw new Error(`Unsupported number format: ${token}`)
}

/**
 * メッセージ内の {key, number, ...} を解析し、数値を整形して置換する。
 * @param {string} message 対象メッセージ
 * @param {Values} values 置換に使う値
 * @param {string} locale 使用するロケール
 * @param {string} [currency] 通貨コード
 * @returns {ReactNode[]} 解析結果のノード配列
 */
const parseNumberMessage = (
  message: string,
  values: Values,
  locale: string,
  currency?: string
): ReactNode[] => {
  const pattern = /\{([^}]+)\}/g
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of message.matchAll(pattern)) {
    if (match.index > lastIndex) {
      nodes.push(message.slice(lastIndex, match.index))
    }

    const token = match[1]
    const parts = token.split(',').map((part) => part.trim())
    const key = parts[0]
    const formatter = parts[1]

    if (formatter !== 'number') {
      nodes.push(match[0])
      lastIndex = match.index + match[0].length
      continue
    }

    const value = values[key]
    if (!isFiniteNumber(value)) {
      throw new Error(`Expected a finite number for "${key}".`)
    }

    let formatted: string
    if (parts.length === 2) {
      formatted = formatNumber(value, locale)
    } else if (parts.length === 3) {
      const options = resolveNumberOptions(parts[2], currency)
      formatted = formatNumber(value, locale, options)
    } else {
      throw new Error(`Unsupported number format for "${key}".`)
    }

    nodes.push(formatted)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < message.length) {
    nodes.push(message.slice(lastIndex))
  }

  return nodes
}

const NumberFormat = ({ values, locale, currency, children }: Props): ReactNode => {
  const nodes = parseNumberMessage(children, values, locale, currency)

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  )
}

export default NumberFormat
