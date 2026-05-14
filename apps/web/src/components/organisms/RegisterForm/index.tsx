import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from './schema'
import { Button } from '@/components/atoms/Button'
import { Checkbox } from '@/components/atoms/Checkbox'
import { Input } from '@/components/atoms/Input'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Divider } from '@/components/atoms/Divider'
import { FormField } from '@/components/molecules/FormField'
import { SocialButtons } from '@/components/molecules/SocialButtons'
import { AuthFooterLink } from '@/components/molecules/AuthFooterLink'

type RegisterFormProps = {
  onSubmit: (values: RegisterFormValues) => void
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

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', remember: false },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="space-y-1">
        <Heading>Cadastro</Heading>
        <Text className="text-2xl">Olá! Preencha seus dados.</Text>
      </div>

      <FormField id="name" label="Nome" error={errors.name?.message}>
        <Input
          placeholder="Nome completo"
          autoComplete="name"
          {...register('name')}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="Digite seu email"
          autoComplete="email"
          {...register('email')}
        />
      </FormField>

      <FormField id="password" label="Senha" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="••••••"
          autoComplete="new-password"
          {...register('password')}
        />
      </FormField>

      <Checkbox id="remember" label="Lembrar-me" {...register('remember')} />

      <Button type="submit" fullWidth disabled={isSubmitting} rightIcon={<ArrowRight />}>
        Cadastrar
      </Button>

      <Divider label="ou entre com outras contas" />

      <SocialButtons providers={socialProviders} />

      <AuthFooterLink
        prompt="Já tem conta?"
        linkText="Faça seu login!"
        linkHref="/login"
        trailingEmoji="🔑"
      />
    </form>
  )
}