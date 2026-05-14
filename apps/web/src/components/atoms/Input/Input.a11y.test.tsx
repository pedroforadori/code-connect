import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Input } from '.'

describe('Input a11y', () => {
  it('input with label has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" placeholder="seu@email.com" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('invalid input with label has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" invalid placeholder="seu@email.com" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})