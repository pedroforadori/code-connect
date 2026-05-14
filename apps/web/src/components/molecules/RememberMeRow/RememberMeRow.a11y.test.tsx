import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from '@/test/a11y'
import { RememberMeRow } from '.'

describe('RememberMeRow a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <RememberMeRow rememberProps={{}} forgotHref="/esqueci-senha" />
      </MemoryRouter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
