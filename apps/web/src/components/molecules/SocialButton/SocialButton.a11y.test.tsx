import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { SocialButton } from '.'

describe('SocialButton a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <SocialButton iconSrc="/github.png" label="GitHub" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
