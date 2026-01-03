type Tag = 'b' | 'i' // 簡易易な例として2つのタグのみ定義
// type Tag = 'b' | 'i' | 'u' | 'p' | 'br' | 'strong' | 'em'

type Props = {
  children(tags: Record<Tag, (chunks: React.ReactNode) => React.ReactNode>): React.ReactNode
}

const RichText = ({ children }: Props) => {
  return (
    <>
      {children({
        b: (chunks) => <b className="font-semibold">{chunks}</b>,
        i: (chunks) => <i className="italic">{chunks}</i>
      })}
    </>
  )
}

export default RichText
