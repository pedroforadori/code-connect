import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Divider } from '.'

describe('Divider a11y', () => {
  it('hr divider has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Divider />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('labeled divider has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Divider label="ou entre com outras contas" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
