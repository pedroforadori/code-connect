import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Checkbox } from '.'

describe('Checkbox a11y', () => {
  it('checkbox with label has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Checkbox id="remember" label="Lembrar-me" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('checkbox without label prop has no WCAG 2.1 AA violations when aria-label provided', async () => {
    const { container } = render(
      <Checkbox id="remember" aria-label="Lembrar-me" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})