import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Label } from '.'

describe('Label a11y', () => {
  it('label associated with an input has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="name">Nome</Label>
        <input id="name" type="text" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})