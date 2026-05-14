import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Heading } from '.'

describe('Heading a11y', () => {
  it('h1 has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Heading>Login</Heading>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('h2 has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Heading as="h2">Seção</Heading>)
    expect(await axe(container)).toHaveNoViolations()
  })
})