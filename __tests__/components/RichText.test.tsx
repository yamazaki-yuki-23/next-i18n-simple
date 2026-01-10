import { render, screen } from '@testing-library/react'

import RichText from '@/components/RichText'

import type { ReactNode } from 'react'

const components = {
  b: (chunks: ReactNode) => <b>{chunks}</b>,
  i: (chunks: ReactNode) => <i>{chunks}</i>,
  a: (chunks: ReactNode, attrs: Record<string, string>) => <a {...attrs}>{chunks}</a>
}

describe('RichText コンポーネント', () => {
  it('対応タグを要素として描画する', () => {
    render(
      <RichText components={components}>
        {'Build <i>global</i> experiences with <b>Next.js</b>.'}
      </RichText>
    )

    expect(screen.getByText('global').tagName).toBe('I')
    expect(screen.getByText('Next.js').tagName).toBe('B')
  })

  it('対応タグの属性を保持する', () => {
    render(
      <RichText components={components}>
        {'Visit <a href="https://nextjs.org">Next.js</a>.'}
      </RichText>
    )

    expect(screen.getByRole('link', { name: 'Next.js' })).toHaveAttribute(
      'href',
      'https://nextjs.org'
    )
  })

  it('未対応タグはプレーンテキストとして扱う', () => {
    render(<RichText components={components}>{'Use <u>underline</u>.'}</RichText>)

    expect(screen.getByText('Use <u>underline</u>.')).toBeInTheDocument()
  })

  it('タグ構造が不正な場合は元の文字列で表示する', () => {
    render(<RichText components={components}>{'Broken <b>bold</i>.'}</RichText>)

    expect(screen.getByText('Broken <b>bold</i>.')).toBeInTheDocument()
  })
})
