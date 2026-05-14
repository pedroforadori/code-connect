import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from '@/test/a11y'
import { AuthFooterLink } from '.'

describe('AuthFooterLink a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthFooterLink
          prompt="Ainda não tem conta?"
          linkText="Crie seu cadastro!"
          linkHref="/cadastro"
        />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
