'use client'

import { useState } from 'react'

import { getDictionary } from '@/app/[lang]/dictionaries'

type Props = {
  dict: Awaited<ReturnType<typeof getDictionary>>['counter']
}

const Counter = ({ dict }: Props) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-center text-sm font-medium text-slate-500">{dict.title}</p>
      <div className="mt-2 text-center text-4xl font-semibold text-slate-900">{count}</div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setCount((prev) => prev - 1)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          {dict.decrement}
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          {dict.reset}
        </button>
        <button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {dict.increment}
        </button>
      </div>
    </div>
  )
}

export default Counter
