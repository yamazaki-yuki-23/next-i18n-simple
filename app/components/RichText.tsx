import { Fragment } from 'react'

import type { ReactNode } from 'react'

type TagRenderer = (chunks: ReactNode, attrs: Record<string, string>) => ReactNode
type Components = Record<string, TagRenderer>

type Props = {
  components: Components
  children: string
}

type StackFrame = {
  tag: string | null
  attrs: Record<string, string>
  children: ReactNode[]
}

/**
 * タグ内の属性文字列を「key=value」形式のオブジェクトに変換する。
 * @param {string} rawAttrs タグに含まれる属性文字列
 * @returns {Record<string, string>} パース済み属性
 */
const parseAttributes = (rawAttrs: string): Record<string, string> => {
  const attrs: Record<string, string> = {}
  const pattern = /([A-Za-z_:][\w:.-]*)="([^"]*)"/g
  for (const match of rawAttrs.matchAll(pattern)) {
    attrs[match[1]] = match[2]
  }
  return attrs
}

/**
 * 配列の子要素にキーを付与し、単一のReactNodeに正規化する。
 * @param {ReactNode[]} children 変換対象の子要素
 * @returns {ReactNode} 正規化済みの子要素
 */
const normalizeChildren = (children: ReactNode[]): ReactNode => {
  const keyedChildren = children.map((node, index) => (
    <Fragment key={index}>{node}</Fragment>
  ))
  return keyedChildren.length === 1 ? keyedChildren[0] : <Fragment>{keyedChildren}</Fragment>
}

/**
 * タグ付きテキストを解析してReactNode配列を生成する。
 * - 対応タグは components に含まれるもののみ
 * - 未対応タグや不正なタグ構造はプレーンテキストとして扱う
 * @param {string} text タグを含む入力文字列
 * @param {Components} components タグ名とレンダラーのマッピング
 * @returns {ReactNode[]} 変換結果（不正時は元の文字列を単一要素で返す）
 */
const parseRichText = (text: string, components: Components): ReactNode[] => {
  const tagPattern = /<\/?([a-zA-Z]+)(\s[^>]*)?>/g
  const stack: StackFrame[] = [{ tag: null, attrs: {}, children: [] }]
  let lastIndex = 0

  for (const match of text.matchAll(tagPattern)) {
    const matchedTag = match[0]
    const tagName = match[1]
    const rawAttrs = match[2] ?? ''
    const attrs = parseAttributes(rawAttrs)
    const isClosingTag = matchedTag.startsWith('</')

    if (match.index === undefined) return [text]

    if (match.index > lastIndex) {
      stack[stack.length - 1].children.push(text.slice(lastIndex, match.index))
    }

    if (!components[tagName]) {
      // 未対応タグはタグ自体をテキストとして扱う
      stack[stack.length - 1].children.push(matchedTag)
      lastIndex = match.index + matchedTag.length
      continue
    }

    if (!isClosingTag) {
      stack.push({ tag: tagName, attrs, children: [] })
    } else {
      if (stack.length === 1) return [text]
      const frame = stack.pop()
      if (!frame || frame.tag !== tagName) return [text]
      const rendered = components[tagName](normalizeChildren(frame.children), frame.attrs)
      stack[stack.length - 1].children.push(rendered)
    }
    lastIndex = match.index + matchedTag.length
  }

  if (lastIndex < text.length) {
    stack[stack.length - 1].children.push(text.slice(lastIndex))
  }

  if (stack.length > 1) return [text]

  return stack[0].children
}

/**
 * タグ付きテキストを解析して描画するコンポーネント。
 * @param {Components} components タグ名とレンダラーのマッピング
 * @param {string} children タグを含む入力文字列
 * @returns {ReactNode} 描画されるReact要素
 */
const RichText = ({ components, children }: Props): ReactNode => {
  const nodes = parseRichText(children, components)

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  )
}

export default RichText
