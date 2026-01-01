# Next I18n Simple 仕様書

## 概要

- Next.js App Router を用いた最小構成の国際化サンプル
- ルートに言語コードを含める方式でページを切り替える
- 翻訳データは JSON 辞書をサーバーで遅延読み込みする

## 目的

- 外部 i18n ライブラリを使わずに国際化の基本構成を示す
- App Router のルーティングとサーバーコンポーネントでの翻訳取得例を提供する

## 対象ユーザー

- Next.js の国際化手法を学びたい開発者
- 小規模なデモや検証環境での利用者

## 対象範囲

- ルートベースの言語切り替え
- 辞書の遅延読み込み
- 画面の表示文言の切り替え

## 対応言語

- `en`
- `nl`
- `ja`

## 画面仕様

### ルート

- パス: `/{lang}`
  - 例: `/en`, `/nl`, `/ja`

### 表示内容

- タイトル: `Next I18n Simple`
- 現在のロケール表示: `locale: {lang}`
- ボタン文言: 翻訳辞書の `products.cart` を表示

## 振る舞い仕様

- `/{lang}` の `lang` が対応言語に含まれない場合は 404 を返す
- 対応言語の場合は該当辞書を遅延読み込みして描画する

## 辞書仕様

- 形式: JSON
- 参照キー: `products.cart`
- 位置: `dictionaries/{locale}.json`

## 主要ファイル

- `app/[lang]/page.tsx`: 言語別ページの描画
- `app/[lang]/dictionaries.ts`: 辞書ローダーとロケール判定
- `dictionaries/*.json`: 翻訳辞書

## 非機能要件

- Node.js: 24 以上
- パッケージマネージャー: Yarn 1.x

## 開発・運用コマンド

- 開発起動: `yarn dev`
- ビルド: `yarn build`
- テスト: `yarn test`
- 型チェック: `yarn tsc --noEmit`
- 不要コード検出: `yarn knip`
