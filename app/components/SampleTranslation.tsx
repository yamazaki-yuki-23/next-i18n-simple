import { useExtracted } from 'next-intl'

import { Link } from '@/i18n/navigation'

const SampleTranslation = () => {
  const t = useExtracted()
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-base font-semibold text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {t({
            id: 'greeting',
            message: 'こんにちは！',
            description: 'A greeting message'
          })}
        </p>
        <p className="rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          {t({
            id: 'greeting-with-name',
            message: 'こんにちは、{name}さん！',
            description: 'A greeting with a name',
            values: { name: 'Jane' }
          })}
        </p>
        <p className="rounded-md bg-white/70 px-3 py-2 ring-1 ring-zinc-200 dark:bg-zinc-950/70 dark:ring-zinc-800">
          {t({
            id: 'followers-count',
            message:
              '{count, plural, =0 {フォロワーはまだいません} =1 {フォロワーが1人います} other {フォロワーが#人います}}。',
            description: 'Number of followers',
            values: {
              count: 3580
            }
          })}
        </p>
        <p className="rounded-md bg-white/70 px-3 py-2 ring-1 ring-zinc-200 dark:bg-zinc-950/70 dark:ring-zinc-800">
          {t({
            id: 'birthday-ordinal',
            message:
              '{year, selectordinal, one {#回目} two {#回目} few {#回目} other {#回目}}のお誕生日です！',
            description: 'Ordinal birthday',
            values: {
              year: 22
            }
          })}
        </p>
        <p className="rounded-md bg-white/70 px-3 py-2 ring-1 ring-zinc-200 dark:bg-zinc-950/70 dark:ring-zinc-800">
          {t({
            id: 'status-online-gender',
            message:
              '{gender, select, female {彼女は} male {彼は} other {その人は}}オンラインです。',
            description: 'Gender-based online status',
            values: {
              gender: 'female'
            }
          })}
        </p>
        <p className="rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          {t.rich({
            id: 'guidelines-link',
            message: '<link>ガイドライン</link>をご確認ください。',
            description: 'Guidelines link prompt',
            values: {
              link: (chunks) => (
                <Link
                  className="font-semibold text-sky-700 underline decoration-2 underline-offset-4 transition hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                  href="https://next-intl.dev/docs/getting-started"
                >
                  {chunks}
                </Link>
              )
            }
          })}
        </p>
      </div>
    </div>
  )
}
export default SampleTranslation
