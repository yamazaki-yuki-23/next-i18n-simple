import { render, screen } from '@testing-library/react'

import Home from '@/app/[lang]/page'

type PageProps = {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

describe('Home', () => {
  it('renders the title and locale', async () => {
    const props: PageProps = {
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({})
    }

    const ui = await Home(props)
    render(ui)

    expect(screen.getByText('Next I18n Simple')).toBeInTheDocument()
    expect(screen.getByText('locale: en')).toBeInTheDocument()
  })
})
