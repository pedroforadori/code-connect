import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { SocialButtons } from '.'

const providers = [
  { id: 'github', iconSrc: '/github.png', label: 'GitHub' },
  { id: 'gmail', iconSrc: '/gmail.png', label: 'Gmail' },
]

describe('SocialButtons a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<SocialButtons providers={providers} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
