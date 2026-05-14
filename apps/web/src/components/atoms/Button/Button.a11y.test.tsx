import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Button } from '.'

describe('Button a11y', () => {
  it('enabled button has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Button>Entrar</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('disabled button has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Button disabled>Entrar</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })
})