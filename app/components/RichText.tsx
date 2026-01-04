import { Fragment } from 'react'

import type { ReactNode } from 'react'

type TagRenderer = (chunks: ReactNode) => ReactNode
type Components = Record<string, TagRenderer>

type Props = {
  components: Components
  children: string
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
  const stack: Array<{ tag: string | null; children: ReactNode[] }> = [{ tag: null, children: [] }]
  let lastIndex = 0

  for (const match of text.matchAll(tagPattern)) {
    const matchedTag = match[0]
    const tagName = match[1]
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
      stack.push({ tag: tagName, children: [] })
    } else {
      if (stack.length === 1) return [text]
      const frame = stack.pop()
      if (!frame || frame.tag !== tagName) return [text]
      const rendered = components[tagName](
        frame.children.length === 1 ? frame.children[0] : frame.children
      )
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
