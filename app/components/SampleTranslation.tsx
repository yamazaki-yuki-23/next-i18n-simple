import { useExtracted } from 'next-intl'

const SampleTranslation = () => {
  const t = useExtracted()
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      {t('Look ma, no keys!')}
    </div>
  )
}
export default SampleTranslation
