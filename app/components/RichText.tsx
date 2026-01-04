import React from 'react'

import type { ReactNode } from 'react'

type Components = Record<string, (chunks: ReactNode) => ReactNode>

type Props = {
  components: Components
  children: string
}

/**
 * タグ付きテキストを解析し、対応するコンポーネントを適用したReactNode配列を生成する
 *
 * - 対応しているタグは、`components`引数で指定されたもののみ
 * - 対応外のタグや不正なタグ構造は、無視してテキストとして扱う
 *
 * @param {string} text タグを含む入力文字列
 * @param {Components} components タグに対応するコンポーネントのマッピング
 * @return {ReactNode[] | string} ReactNode配列または文字列
 */
const parseRichText = (text: string, components: Components) => {
  const result: ReactNode[] = []
  const openTagPattern = /<\/?([a-zA-Z]+)(\s[^>]*)?>/
  let remaingText = text

  while (remaingText.length > 0) {
    // 次タグの開始位置を探す
    const openTagMatch = openTagPattern.exec(remaingText)
    if (!openTagMatch || openTagMatch.index === undefined) {
      // タグが見つからなかった場合、残りのテキストをそのまま追加して終了
      result.push(remaingText)
      break
    }

    const tag = openTagMatch[1]
    const openTagIndex = openTagMatch.index

    // 開始タグの前のテキストを追加
    if (openTagIndex > 0) {
      result.push(remaingText.slice(0, openTagIndex))
    }

    if (!components[tag]) {
      result.push(openTagMatch[0])
      remaingText = remaingText.slice(openTagIndex + openTagMatch[0].length)
      continue
    }

    const afterOpen = remaingText.slice(openTagIndex + openTagMatch[0].length)
    const closeTag = `</${tag}>`
    const closeTagIndex = afterOpen.indexOf(closeTag)

    if (closeTagIndex === -1) {
      // 対応する閉じタグが見つからなかった場合、開始タグを無視してテキストとして追加
      result.push(remaingText)
      break
    }

    const innerText = afterOpen.slice(0, closeTagIndex)
    const afterClose = afterOpen.slice(closeTagIndex + closeTag.length)

    const component = components[tag]
    result.push(component(innerText))

    // 残りのテキストを更新
    remaingText = afterClose
  }

  return result
}

/**
 * タグ付きテキストを解析し、対応するコンポーネントを適用して描画するコンポーネント。
 *
 * `text`に含まれるタグ構造を`parseRichText`で解析し、
 * `components`で指定されたマッピングにに従って一部をReact要素として描画する。
 * マッピングが指定されていないタグは、プレーンテキストとして扱われる。
 *
 * @params {Components} components タグに対応するコンポーネントのマッピング
 * @params {string} children タグを含む入力文字列
 * @returns {ReactNode} 描画されるReact要素
 */
const RichText = ({ components, children }: Props) => {
  const nodes = parseRichText(children, components)

  return (
    <>
      {nodes.map((node, index) => (
        <React.Fragment key={index}>{node}</React.Fragment>
      ))}
    </>
  )
}

export default RichText
