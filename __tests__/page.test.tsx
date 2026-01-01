import { render, screen } from '@testing-library/react'

import Home from '@/app/[lang]/page'

describe('Home', () => {
  it('renders the title and locale', async () => {
    const props: PageProps<'/[lang]'> = {
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({})
    }

    const ui = await Home(props)
    render(ui)

    expect(screen.getByText('Next I18n Simple')).toBeInTheDocument()
    expect(screen.getByText('locale: en')).toBeInTheDocument()
  })
})
