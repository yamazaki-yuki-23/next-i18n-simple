import { notFound } from 'next/navigation'

import { getDictionary, getDictionaryLocale } from './dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export const Home = async ({ params }: Props) => {
  const { lang } = await params

  const dictionaryLocale = getDictionaryLocale(lang)
  if (!dictionaryLocale) notFound()

  const dict = await getDictionary(dictionaryLocale)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Next I18n Simple
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">locale: {lang}</p>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {dict.products.cart}
        </button>
      </main>
    </div>
  )
}

export default Home
