import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from '@/test/a11y'
import { RegisterPage } from '.'

describe('RegisterPage a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
