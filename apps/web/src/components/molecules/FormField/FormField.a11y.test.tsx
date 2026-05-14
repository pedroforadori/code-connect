import { render } from '@testing-library/react'
import { axe } from '@/test/a11y'
import { Input } from '@/components/atoms/Input'
import { FormField } from '.'

describe('FormField a11y', () => {
  it('field without error has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <FormField id="email" label="Email">
        <Input placeholder="seu@email.com" />
      </FormField>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('field with error message has no WCAG 2.1 AA violations', async () => {
    const { container } = render(
      <FormField id="email" label="Email" error="Email é obrigatório">
        <Input placeholder="seu@email.com" />
      </FormField>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
