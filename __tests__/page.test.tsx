import { render, screen } from '@testing-library/react'

import Home from '@/app/page'

describe('Home', () => {
  it('renders the getting started message', () => {
    render(<Home />)

    expect(screen.getByText('To get started, edit the page.tsx file.')).toBeInTheDocument()
  })
})
