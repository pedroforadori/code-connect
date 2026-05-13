import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Informe seu email ou usuário')
    .max(120, 'Muito longo'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  remember: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>