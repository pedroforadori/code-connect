import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { AuthTemplate } from '.'

describe('AuthTemplate a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <AuthTemplate bannerSrc="/banner.png" bannerAlt="Code Connect">
        <h1>Conteúdo principal</h1>
        <p>Texto de exemplo.</p>
      </AuthTemplate>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
