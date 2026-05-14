import { AuthTemplate } from '@/components/templates/AuthTemplate'
import { RegisterForm } from '@/components/organisms/RegisterForm'
import { type RegisterFormValues } from '@/components/organisms/RegisterForm/schema'

export function RegisterPage() {
  const handleSubmit = (values: RegisterFormValues) => {
    console.log('register submit', values)
  }

  return (
    <AuthTemplate bannerSrc="/banner-cadastro.png" bannerAlt="Code Connect">
      <RegisterForm onSubmit={handleSubmit} />
    </AuthTemplate>
  )
}