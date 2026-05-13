# Página de Login — Plano de Implementação

## Contexto

O app `apps/web/` está praticamente em branco (apenas o starter Vite + React 19). O objetivo é entregar a **Página de Login** seguindo Atomic Design + Tailwind, conforme o mockup fornecido. A **Página de Cadastro** compartilhará o mesmo layout base (banner diferente, campos diferentes) — não vamos implementá-la agora, mas a arquitetura precisa permitir que ela seja construída posteriormente com poucas linhas.

Resultado esperado: rota `/login` renderizando o card de duas colunas (banner à esquerda, formulário à direita), com validação via `react-hook-form` + `zod`, design tokens em `tailwind.config.ts`, e Vitest configurado (testes serão escritos numa próxima iteração).

## Decisões confirmadas com o usuário

| Decisão | Escolha |
|---|---|
| Roteamento | `react-router-dom` (rotas `/login` e `/cadastro` placeholder, redirect `/` → `/login`) |
| Formulário | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Testes | Vitest + RTL + jsdom **configurados**, sem escrever testes ainda |
| Tailwind | v4 + plugin Vite (`@tailwindcss/vite`), com `@config '../tailwind.config.ts'` no CSS para honrar a regra do CLAUDE.md de manter tokens em `tailwind.config.ts` |

## Fase 1 — Tooling

Comandos (do root):
```bash
pnpm --filter web add react-router-dom react-hook-form zod @hookform/resolvers clsx tailwind-merge
pnpm --filter web add -D tailwindcss @tailwindcss/vite vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Modificações:
- [apps/web/package.json](apps/web/package.json) — adicionar scripts `test` e `test:watch`
- [apps/web/vite.config.ts](apps/web/vite.config.ts) — plugin `tailwindcss()`, plugin `react()`, alias `@ → ./src`, bloco `test` do Vitest (`environment: 'jsdom'`, `setupFiles: ['./src/test/setup.ts']`, `globals: true`)
- [apps/web/tsconfig.app.json](apps/web/tsconfig.app.json) — `paths: { "@/*": ["src/*"] }`, `types: ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`
- Root `package.json` — script de conveniência `web:test`

Novo: `apps/web/src/test/setup.ts` com `import '@testing-library/jest-dom/vitest'`.

## Fase 2 — Fundação

### Design tokens — `apps/web/tailwind.config.ts` (NOVO)
Cores nomeadas (sem hex no JSX em momento algum):
- Superfícies: `app-bg #0a0d14`, `card #1f242e`, `input #171b23`, `input-border #2a2f3a`, `divider #2a2f3a`
- Marca: `brand #84F573`, `brand-hover #9bff8a`, `brand-ink #0a0d14`
- Texto: `text-primary #FFFFFF`, `text-secondary #B7BDC9`, `text-muted #7A8290`, `text-link #84F573`
- Raios: `rounded-card 24px`, `rounded-field 12px`
- Sombra: `shadow-card`

### Reset global — substituir [apps/web/src/index.css](apps/web/src/index.css)
```css
@import 'tailwindcss';
@config '../tailwind.config.ts';

@layer base {
  html, body, #root { height: 100%; }
  body { @apply bg-app-bg text-text-secondary font-sans antialiased; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; }
}
```

### Utilidades
- `apps/web/src/lib/cn.ts` (NOVO): `cn(...inputs) => twMerge(clsx(inputs))`

### Roteamento — substituir [apps/web/src/main.tsx](apps/web/src/main.tsx)
`createBrowserRouter` com:
- `/` → `<Navigate to="/login" />`
- `/login` → `<LoginPage />`
- `/cadastro` → placeholder ("Cadastro — em breve")

### Limpeza
Deletar: `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/src/assets/` (assets do starter Vite/React não são mais usados).

## Fase 3 — Componentes Atomic Design

Cada componente em `src/components/<level>/<Name>/index.tsx`. Cada um implementado com Tailwind + tokens (zero hex).

### Atoms (UI pura, sem regra de negócio)
| Componente | Resumo | Props principais |
|---|---|---|
| `Button` | CTA verde, full-width opcional, ícone à direita | `variant?: 'primary'`, `fullWidth?`, `rightIcon?` |
| `Input` | Input dark filled, `forwardRef` (necessário para RHF) | `invalid?`, herda `InputHTMLAttributes` |
| `Label` | Label de form | herda `LabelHTMLAttributes` |
| `Checkbox` | Checkbox nativo estilizado, `forwardRef` | `label?` |
| `Link` | Wrap `react-router-dom` Link + variante externa | `to`, `variant?: 'plain' \| 'brand' \| 'muted-underline'` |
| `Heading` | h1/h2 do card | `as?`, children |
| `Text` | Parágrafo com tons | `tone?: 'primary' \| 'secondary' \| 'muted'` |
| `Divider` | Linha hr, opcional com label centralizado | `label?` |
| `IconImage` | `<img>` semântico para `/github.png`, `/gmail.png` | `src`, `alt` |

### Molecules (compõem atoms)
- **`FormField`** — `Label` + child input clonado com `id`/`aria-invalid` + texto de erro. Props: `id`, `label`, `error?`, `children: React.ReactElement`. **Reutilizável no cadastro.**
- **`RememberMeRow`** — Linha "Lembrar-me" + "Esqueci a senha". Props: `rememberProps`, `forgotHref`. **Específico do login** (cadastro provavelmente terá checkbox de T&C).
- **`SocialButton`** — Card com ícone em cima e label embaixo. Props: `iconSrc`, `label`, `onClick?`. **Reutilizável.**
- **`SocialButtons`** — Linha com dois `SocialButton`. Props: `providers: { id, iconSrc, label, onClick? }[]`. **Reutilizável.**
- **`AuthFooterLink`** — "Ainda não tem conta? **Crie seu cadastro!** 📋". Props: `prompt`, `linkText`, `linkHref`, `trailingEmoji?`. **Reutilizável** (cadastro: "Já tem conta?" + "Faça login!" + `/login`).

### Organisms
- **`LoginForm`** — Form completo (heading, subtitle, 2× `FormField`, `RememberMeRow`, `Button` submit, `Divider` rotulado, `SocialButtons`, `AuthFooterLink`). Usa `useForm<LoginFormValues>` com `zodResolver(loginSchema)`. Recebe `onSubmit` da page. Schema co-localizado em `LoginForm/schema.ts`.

### Templates
- **`AuthTemplate`** — **Peça-chave do reuso.** Card de duas colunas no centro de uma página dark. Props: `bannerSrc`, `bannerAlt?`, `children`.
  ```tsx
  <main className="min-h-screen flex items-center justify-center p-6">
    <div className="w-full max-w-[920px] bg-card rounded-card shadow-card overflow-hidden
                    grid grid-cols-1 md:grid-cols-[340px_1fr]">
      <aside className="hidden md:block">
        <img src={bannerSrc} alt={bannerAlt ?? ''} className="w-full h-full object-cover" />
      </aside>
      <section className="p-12">{children}</section>
    </div>
  </main>
  ```

### Pages
- **`LoginPage`** — `<AuthTemplate bannerSrc="/banner.png"><LoginForm onSubmit={...} /></AuthTemplate>`. Define `handleSubmit` que faz `console.log(values)` (integração real virá depois).

### Como o cadastro vai reusar
Construir a `SignupPage` será literalmente:
```tsx
<AuthTemplate bannerSrc="/banner-signup.png">
  <SignupForm onSubmit={...} />
</AuthTemplate>
```
Criar `SignupForm` próprio (campos diferentes) reaproveitando os atoms/molecules existentes — em especial `FormField`, `Button`, `Input`, `SocialButtons`, `AuthFooterLink`.

## Fase 4 — Schema e form behavior

`apps/web/src/components/organisms/LoginForm/schema.ts`:
```ts
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Informe seu email ou usuário').max(120, 'Muito longo'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  remember: z.boolean().default(false),
})
export type LoginFormValues = z.infer<typeof loginSchema>
```
Nota: "Email ou usuário" aceita ambos — por isso `string` simples, não `z.string().email()`.

## Arquivos críticos

- [apps/web/tailwind.config.ts](apps/web/tailwind.config.ts) — design tokens
- [apps/web/vite.config.ts](apps/web/vite.config.ts) — plugin Tailwind + Vitest + alias
- [apps/web/src/index.css](apps/web/src/index.css) — `@import tailwindcss` + `@config` + base reset
- [apps/web/src/main.tsx](apps/web/src/main.tsx) — router
- [apps/web/src/components/templates/AuthTemplate/index.tsx](apps/web/src/components/templates/AuthTemplate/index.tsx) — **peça do reuso com cadastro**
- [apps/web/src/components/organisms/LoginForm/index.tsx](apps/web/src/components/organisms/LoginForm/index.tsx) — form com RHF + zod
- [apps/web/src/components/pages/LoginPage/index.tsx](apps/web/src/components/pages/LoginPage/index.tsx) — composição final

## Verificação

1. `pnpm install` no root.
2. `pnpm web:dev` e abrir `/` — deve redirecionar para `/login`.
3. Conferir visualmente contra o mockup:
   - Fundo dark, card centralizado com cantos ~24px, banner à esquerda, formulário à direita.
   - Heading "Login" branco/bold, subtítulo cinza claro.
   - Dois inputs filled com placeholders `usuario123` e `******`.
   - Linha com "Lembrar-me" (esquerda) e "Esqueci a senha" sublinhado (direita).
   - Botão verde-lima full-width com seta à direita.
   - Divider com texto "ou entre com outras contas".
   - Dois tiles (Github, Gmail) lado a lado com ícone em cima e label embaixo.
   - "Ainda não tem conta?" + "Crie seu cadastro! 📋" centralizado.
4. Comportamento:
   - Submit vazio → mensagens de erro em vermelho.
   - Senha < 6 chars → erro de mínimo.
   - Submit válido → `console.log({ identifier, password, remember })`.
   - Clicar em "Crie seu cadastro!" → navega para `/cadastro`.
5. `pnpm --filter web build` passa (typecheck estrito).
6. `pnpm --filter web lint` sem erros.
7. `pnpm --filter web test` roda Vitest (zero testes, exit 0).

## Commits sugeridos (Conventional Commits)

Sequência incremental — cada um isolado e revisável:
1. `chore(web): install tailwind, react-router, rhf, zod and testing stack`
2. `chore(web): configure tailwind v4, vitest and path alias`
3. `feat(web): add cn helper and global dark theme reset`
4. `feat(web): add atomic ui atoms (button, input, label, checkbox, link, heading, text, divider, iconimage)`
5. `feat(web): add form-field, remember-me-row, social-buttons and auth-footer-link molecules`
6. `feat(web): add auth template for shared login/signup layout`
7. `feat(web): add login form organism with rhf + zod validation`
8. `feat(web): add login page and wire router with /login and /cadastro placeholder`
