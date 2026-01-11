import { notFound } from 'next/navigation'

import Counter from '@/components/Counter'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import RichText from '@/components/RichText'
import { getDictionary, getDictionaryLocale } from '@/lib/get-dictionary'

import type { Locale } from '@/constants/i18n'

import NumberFormat from '@/components/NumberFormat'

type Props = {
  params: Promise<{ lang: string }>
}

export const Home = async ({ params }: Props) => {
  const { lang } = await params

  const dictionaryLocale = getDictionaryLocale(lang)
  if (!dictionaryLocale) notFound()

  const dict = await getDictionary(dictionaryLocale)
  const currencyByLocale: Record<Locale, string> = {
    en: 'USD',
    nl: 'EUR',
    ja: 'JPY'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Next I18n Simple
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">locale: {lang}</p>
        <LocaleSwitcher />
        <p className="text-base leading-7 text-zinc-800 dark:text-zinc-200">
          <RichText
            components={{
              b: (chunks) => <b className="font-semibold">{chunks}</b>,
              i: (chunks) => <i className="italic">{chunks}</i>,
              a: (chunks, attrs) => (
                <a className="text-blue-600 underline" {...attrs}>
                  {chunks}
                </a>
              )
            }}
          >
            {dict.home.richMessageLink}
          </RichText>
        </p>
        <p className="text-base leading-7 text-zinc-800 dark:text-zinc-200">
          <NumberFormat
            values={{ price: 1234 }}
            locale={dictionaryLocale}
            currency={currencyByLocale[dictionaryLocale]}
          >
            {dict.home.priceMessage}
          </NumberFormat>
        </p>
        <div className="flex w-full flex-col gap-2 text-base leading-7 text-zinc-800 dark:text-zinc-200">
          <p>
            <NumberFormat values={{ value: 1234.56 }} locale={dictionaryLocale}>
              {dict.home.numberBasic}
            </NumberFormat>
          </p>
          <p>
            <NumberFormat values={{ value: 0.42 }} locale={dictionaryLocale}>
              {dict.home.numberPercentage}
            </NumberFormat>
          </p>
          <p>
            <NumberFormat values={{ value: 1234.567 }} locale={dictionaryLocale}>
              {dict.home.numberCustom}
            </NumberFormat>
          </p>
        </div>
        <Counter dict={dict.counter} />
      </main>
    </div>
  )
}

export default Home
