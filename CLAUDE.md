# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**code-connect** is a fullstack monorepo using pnpm workspaces with two apps:
- **api**: NestJS backend (port 3000)
- **web**: React + TypeScript + Vite frontend

## Common Commands

Run from repo root:

```bash
# Development
pnpm web:dev          # Vite dev server with HMR
pnpm api:dev          # NestJS in watch mode

# Build
pnpm web:build        # tsc -b check + Vite build
pnpm api:build        # NestJS compile to dist/

# Testing (API only)
pnpm api:test                    # Unit tests
pnpm --filter api test:watch     # Watch mode
pnpm --filter api test:e2e       # E2E tests

# Lint & format
pnpm --filter api lint           # ESLint + fix
pnpm --filter web lint           # ESLint check
pnpm --filter api format         # Prettier

# Preview / run
pnpm web:preview      # Preview production build
pnpm api:start        # Run compiled API (requires api:build first)
```

## Architecture

### Monorepo
pnpm workspaces defined in `pnpm-workspace.yaml`; all apps live under `apps/`. Root `package.json` scripts use `pnpm --filter <app>` to target individual apps.

### API (`apps/api/`)
NestJS application. Entry: `src/main.ts`. Module system: `AppModule` imports controllers and providers. Tests use Jest with `ts-jest`; test files match `*.spec.ts`. Build output goes to `apps/api/dist/`.

### Web (`apps/web/`)
React app bootstrapped with Vite. Entry: `src/main.tsx`. Build runs `tsc -b` before Vite (type errors fail the build). Separate tsconfig files: `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config).

## Code Style

- **API**: ESLint flat config (`eslint.config.mjs`) with TypeScript + Prettier integration. Prettier: single quotes, trailing commas.
- **Web**: ESLint flat config with React Hooks and React Refresh plugins. No Prettier integration.
- **API TypeScript**: CommonJS modules, ES2023 target, emitDecoratorMetadata enabled (required for NestJS DI).
- **Web TypeScript**: ESNext modules, ES2023 target, DOM libs.

## Frontend Conventions (`apps/web/`)

### Atomic Design
Components follow Atomic Design and live under `src/components/`:

```
src/components/
├── atoms/        # Indivisible UI primitives: Button, Input, Badge, Icon
├── molecules/    # Compositions of atoms: SearchBar, FormField, Card
├── organisms/    # Complex sections composed of molecules/atoms: Header, Sidebar
├── templates/    # Page-level layouts (structure only, no business data)
└── pages/        # Connected to router; pass data down to templates
```

Rules:
- A component may only import from its own level or lower (pages → templates → organisms → molecules → atoms).
- No business logic or API calls inside atoms or molecules; those belong in pages or custom hooks under `src/hooks/`.
- Each component lives in its own folder with an `index.tsx` and a co-located test file (e.g., `Button/index.tsx` + `Button/Button.test.tsx`).

### Tailwind CSS
- Use Tailwind utility classes directly in JSX; avoid writing custom CSS unless strictly necessary.
- Extend the design system via `tailwind.config.ts` (colors, spacing, fonts) — never hardcode raw values like `#3b82f6` in className strings.
- Keep class lists readable: split long className strings with a `cn()` helper (e.g., `clsx` + `tailwind-merge`).

### Colors
All colors are defined in `tailwind.config.ts` and must be referenced by token — never use raw hex values in `className`.

| Token | Value | Usage |
|-------|-------|-------|
| `bg-app-bg` | `#00090E` | Page/app background (Grafite) |
| `bg-card` | `#171D1F` | Card surfaces (Cinza Escuro) |
| `bg-input-bg` | `#888888` | Input field background (Cinza Médio) |
| `text-input-text` | `#171D1F` | Text inside inputs (dark on gray bg) |
| `border-input-border` | `#666666` | Input border (subtle on gray bg) |
| `border-divider` | `#2a2f3a` | `<Divider>` component |
| `bg-brand` | `#81FE88` | Primary action (button fill, focus ring) — Verde Destaque |
| `hover:bg-brand-hover` | `#9bff8a` | Brand hover state |
| `text-brand-ink` | `#132E35` | Text on brand backgrounds (Verde Petróleo) |
| `text-content-primary` | `#E1E1E1` | Headings, strong emphasis (Offwhite) |
| `text-content-secondary` | `#B7BDC9` | Secondary body text |
| `text-content-muted` | `#888888` | Placeholders, helper text (Cinza Médio) |
| `text-content-link` | `#81FE88` | Inline links (Verde Destaque) |

Error states use Tailwind's built-in `red-500` (not a custom token).

### Sizing & Spacing
Standard sizes used across atoms — keep these consistent when building new components:

| Element | Class(es) | Px equivalent |
|---------|-----------|---------------|
| Button / Input height | `h-12` | 48 px |
| Button horizontal padding | `px-6` | 24 px |
| Input horizontal padding | `px-4` | 16 px |
| Card border-radius | `rounded-card` | 32 px |
| Field border-radius (inputs, buttons) | `rounded-field` | 12 px |
| Heading `h1` | `text-3xl font-bold` | 30 px / 700 |
| Heading `h2` | `text-xl font-bold` | 20 px / 700 |
| Card shadow | `shadow-card` | `0 30px 80px -20px rgba(0,0,0,0.6)` |
| Font family | `font-sans` | Inter → system-ui fallback |

### Component Tests
Every component **must** have a test file covering its essential usage. Use Vitest + React Testing Library.

Requirements per test file:
- Renders without crashing (smoke test).
- Exercises the primary user interaction (click, input, etc.) if the component has one.
- Asserts on visible output, not implementation details (no snapshot tests).

Run component tests with:
```bash
pnpm --filter web test          # run once
pnpm --filter web test:watch    # watch mode
```

## Backend Conventions (`apps/api/`)

### REST Principles
All HTTP endpoints must comply with the following rules:

**Resources & URLs**
- URLs identify resources, not actions: `/users`, `/users/:id`, `/users/:id/posts`.
- Use nouns, never verbs in paths (`GET /orders`, not `GET /getOrders`).
- Nest sub-resources at most one level deep; beyond that, flatten with query params.

**HTTP Methods**
| Method | Usage |
|--------|-------|
| `GET` | Read — safe and idempotent, no side effects |
| `POST` | Create a new resource |
| `PUT` | Full replacement of a resource |
| `PATCH` | Partial update of a resource |
| `DELETE` | Remove a resource |

**Status Codes**
- `200 OK` — successful GET / PATCH / PUT / DELETE with body.
- `201 Created` — successful POST; include `Location` header pointing to the new resource.
- `204 No Content` — successful DELETE or update with no response body.
- `400 Bad Request` — validation errors; return a structured error body.
- `401 Unauthorized` — missing or invalid credentials.
- `403 Forbidden` — authenticated but lacks permission.
- `404 Not Found` — resource does not exist.
- `409 Conflict` — state conflict (e.g., duplicate unique field).
- `422 Unprocessable Entity` — syntactically valid but semantically invalid payload.
- `500 Internal Server Error` — unexpected server fault; never leak stack traces to the client.

**Request / Response**
- Always consume and produce `application/json`.
- Error responses follow a consistent shape: `{ "statusCode": number, "message": string, "error": string }`.
- Use DTOs (Data Transfer Objects) with `class-validator` decorators for all incoming payloads.
- Never expose internal entity fields (passwords, internal IDs) directly; use response DTOs or serialization interceptors.

**Naming**
- Controller files: `<resource>.controller.ts` (e.g., `users.controller.ts`).
- Service files: `<resource>.service.ts`.
- DTO files: `create-<resource>.dto.ts`, `update-<resource>.dto.ts`.

## Git Conventions

All commits in this repository — across `apps/web/` and `apps/api/` — must follow **Conventional Commits** (`https://www.conventionalcommits.org`).

### Format
```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types
| Type | When to use |
|------|-------------|
| `feat` | New feature visible to users or consumers of the API |
| `fix` | Bug fix |
| `chore` | Maintenance tasks (deps, config, tooling) with no production impact |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests only |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons — no logic change |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |
| `build` | Changes to the build system or external dependencies |

### Scopes
Use the app name as scope when the change is isolated to one app:
- `feat(web): add SearchBar molecule`
- `fix(api): return 404 when user not found`
- `chore: update pnpm lockfile` (no scope when it affects the whole monorepo)

### Rules
- Description is lowercase, imperative mood, no trailing period.
- Body explains **why**, not what (the diff already shows the what).
- Breaking changes: append `!` after the type/scope (`feat(api)!: rename endpoint`) and document in the footer with `BREAKING CHANGE: <description>`.

## Non-Obvious Details

- Root-level scripts are the canonical way to run commands; running scripts directly inside `apps/api/` or `apps/web/` bypasses workspace resolution.
- `pnpm web:build` runs TypeScript type-checking before bundling — type errors will fail CI even if Vite would otherwise succeed.
- API test coverage outputs to `coverage/` at the repo root, not inside `apps/api/`.
- `nest-cli.json` sets `deleteOutDir: true`, so `apps/api/dist/` is wiped on each build.
- `@nestjs/core` and `unrs-resolver` are listed in `onlyBuiltDependencies` in the root pnpm config — they require native compilation on install.
- API port defaults to `process.env.PORT ?? 3000`; no `.env` files are committed.