import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from '@/test/a11y'
import { Link } from '.'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('Link a11y', () => {
  it('internal link (plain) has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Link to="/home">Início</Link>, { wrapper })
    expect(await axe(container)).toHaveNoViolations()
  })

  it('internal link (brand) has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <Link to="/cadastro" variant="brand">
        Crie seu cadastro!
      </Link>,
      { wrapper },
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('external link has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <Link to="https://example.com" external>
        Documentação
      </Link>,
      { wrapper },
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})