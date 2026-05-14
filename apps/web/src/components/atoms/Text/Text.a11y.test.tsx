import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Text } from '.'

describe('Text a11y', () => {
  it('default (secondary) tone has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Text>Boas-vindas! Faça seu login.</Text>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('primary tone has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Text tone="primary">Texto primário</Text>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('muted tone has no WCAG 2.1 AA violations', async () => {
    const { container } = render(<Text tone="muted">Texto discreto</Text>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
