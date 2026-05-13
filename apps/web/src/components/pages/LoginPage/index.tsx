import { AuthTemplate } from '@/components/templates/AuthTemplate'
import { LoginForm } from '@/components/organisms/LoginForm'
import { type LoginFormValues } from '@/components/organisms/LoginForm/schema'

export function LoginPage() {
  const handleSubmit = (values: LoginFormValues) => {
    console.log('login submit', values)
  }

  return (
    <AuthTemplate bannerSrc="/banner.png" bannerAlt="Code Connect">
      <LoginForm onSubmit={handleSubmit} />
    </AuthTemplate>
  )
}