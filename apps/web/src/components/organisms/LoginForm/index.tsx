import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from './schema'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Divider } from '@/components/atoms/Divider'
import { FormField } from '@/components/molecules/FormField'
import { RememberMeRow } from '@/components/molecules/RememberMeRow'
import { SocialButtons } from '@/components/molecules/SocialButtons'
import { AuthFooterLink } from '@/components/molecules/AuthFooterLink'

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const socialProviders = [
  { id: 'github', iconSrc: '/github.png', label: 'Github' },
  { id: 'gmail', iconSrc: '/gmail.png', label: 'Gmail' },
]

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', remember: false },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="space-y-1">
        <Heading>Login</Heading>
        <Text className="text-2xl">Boas-vindas! Faça seu login.</Text>
      </div>

      <FormField id="identifier" label="Email ou usuário" error={errors.identifier?.message}>
        <Input
          placeholder="usuario123"
          autoComplete="username"
          {...register('identifier')}
        />
      </FormField>

      <FormField id="password" label="Senha" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="••••••"
          autoComplete="current-password"
          {...register('password')}
        />
      </FormField>

      <RememberMeRow rememberProps={register('remember')} forgotHref="#" />

      <Button type="submit" fullWidth disabled={isSubmitting} rightIcon={<ArrowRight />}>
        Login
      </Button>

      <Divider label="ou entre com outras contas" />

      <SocialButtons providers={socialProviders} />

      <AuthFooterLink
        prompt="Ainda não tem conta?"
        linkText="Crie seu cadastro!"
        linkHref="/cadastro"
        trailingEmoji="🗒️"
      />
    </form>
  )
}