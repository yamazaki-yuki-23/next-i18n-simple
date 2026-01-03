import type { ReactNode } from 'react'

type Tag = 'b' | 'i' // 簡易易な例として2つのタグのみ定義
// type Tag = 'b' | 'i' | 'u' | 'p' | 'br' | 'strong' | 'em'

type Compoents = Partial<{
  [key in Tag]: (chunks: ReactNode) => ReactNode
}>

type Props = {
  text: string
  components?: Compoents
}

const defaultComponents: Required<Compoents> = {
  b: (chunks) => <b className="font-semibold">{chunks}</b>,
  i: (chunks) => <i className="italic">{chunks}</i>
}

/**
 * タグ付きテキストを解析し、対応するコンポーネントを適用したReactNode配列を生成する
 *
 * - 対応しているタグは、`components`引数で指定されたもののみ
 * - 対応外のタグや不正なタグ構造は、無視してテキストとして扱う
 *
 * @param {string} text タグを含む入力文字列
 * @param {Required<Compoents>} components タグに対応するコンポーネントのマッピング
 * @return {ReactNode[] | string} ReactNode配列または文字列
 */
const parseRichText = (text: string, components: Required<Compoents>) => {
  // TODO: タグ解析ロジックを実装する
  // 現時点では、単純にテキスト全体を返すのみ
  return [text]
}

/**
 * タグ付きテキストを解析し、対応するコンポーネントを適用して描画するコンポーネント。
 *
 * `text`に含まれるタグ構造を`parseRichText`で解析し、
 * `components`で指定されたマッピングにに従って一部をReact要素として描画する。
 * マッピングが指定されていないタグは、プレーンテキストとして扱われる。
 *
 * @prams {string} text タグを含む入力文字列
 * @prams {Compoents} components タグに対応するコンポーネントのマッピング
 * @returns {ReactNode} 描画されるReact要素
 */
const RichText = ({ text, components }: Props) => {
  const mergedComponents = { ...defaultComponents, ...components }
  const nodes = parseRichText(text, mergedComponents)

  return <>{nodes}</>
}

export default RichText
