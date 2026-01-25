import '@testing-library/jest-dom/vitest'
import { createElement } from 'react'
import { vi } from 'vitest'

vi.mock('server-only', () => ({}))
vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
      createElement('a', { href, ...props }, children),
    redirect: vi.fn()
  })
}))
