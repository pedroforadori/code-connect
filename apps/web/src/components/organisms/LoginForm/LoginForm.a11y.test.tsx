import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from '@/test/a11y'
import { LoginForm } from '.'

describe('LoginForm a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm onSubmit={vi.fn()} />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
