import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { IconImage } from '.'

describe('IconImage a11y', () => {
  it('image with alt text has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<IconImage src="/github.png" alt="GitHub" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('decorative image with empty alt has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<IconImage src="/decoration.png" alt="" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
