# Dzidza

A mobile-first study and exam-preparation platform for ZIMSEC and Cambridge O-Level and A-Level students in
Zimbabwe: structured lessons, an adaptive question bank with instant marking, timed tests and mock exams, progress
tracking, personalised study plans, flashcards, and areas for parents, teachers and schools. Built to work on slow
and intermittent mobile connections.

"Dzidza" (Shona: "learn") is a placeholder brand, configured with `NEXT_PUBLIC_APP_NAME`.

**Accounts, pricing and switched-off features (owner decisions, 2026-10-07):**

- **Email accounts, no SMS.** People register with an email address and a password and confirm the address with a
  6-digit code sent by email. They sign in with their email (or a school-issued username) and a password, or with an
  emailed one-time code, and reset passwords by email. A phone number is optional profile data only: never a sign-in
  identifier, never verified, never texted.
- **Email is transactional only.** Verification and sign-in codes, password resets, security notices and invitations
  are always sent (Resend in production, `EMAIL_PROVIDER=resend`; a console driver in dev and tests, whose messages
  you can read at `/dev/outbox`). Digests, announcements, reminders and receipts stay in the app.
- **Pricing.** A free preview plus **Full access for a one-off USD 1 (lifetime)**, paid through Paynow (EcoCash,
  OneMoney, cards on the Paynow page). The price is data in the database, not code.
- **Dormant behind the `features` setting** (all off by default, switched back on by a SUPER_ADMIN on
  `/admin/settings` without a deploy; the code is kept): AI (tutor, solver, AI marking, AI drafts), the WhatsApp
  channel, Stripe, SMS, and optional email. While a flag is off its API routes and webhooks return 404, its pages show
  the not-found page, its menu entries and marketing claims are hidden, and no provider is called. Details:
  [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) §3.14.

**Stack:** Next.js 16 (App Router, React 19, Server Components and Server Actions) · TypeScript 5.9 (strict) ·
PostgreSQL 18 + Prisma 7 (`pg` driver adapter) · Tailwind CSS 4 · Zod 4 · Vitest 4 · Anthropic SDK (AI tutor and
marking, dormant while `features.ai` is off) · a Postgres-backed job worker.

## Quick start

Prerequisites: Node.js 24 (≥ 22.12), npm, and PostgreSQL 18 binaries (`scripts/db-local.ps1` expects them in
`C:\Program Files\PostgreSQL\18\bin`; set `PG_BIN` otherwise). The scripts below were written for Windows/PowerShell;
on macOS/Linux run your own PostgreSQL 18 on port 5433 with the same databases and roles.

```powershell
npm ci
Copy-Item .env.example .env        # dev defaults work as-is (console email: codes appear at /dev/outbox)
npm run db:start                   # project-local cluster in .data/pg on localhost:5433 (zimstudy + zimstudy_test)
npm run db:generate                # Prisma client -> src/generated/prisma
npx prisma migrate deploy          # apply migrations to the dev database (as the owner, MIGRATION_DATABASE_URL)
npm run db:grants                  # app_rw role + privileges on the dev and test databases
npm run db:seed:demo               # catalogue + DEV-ONLY demo users and content (docs/DEV_SEED.md)
npm run dev                        # http://localhost:3000
npm run worker                     # background jobs, in a second terminal
```

The app connects as the restricted `app_rw` role (`DATABASE_URL`) so row-level security and append-only rules are
enforced exactly as in production; migrations run as the owner (`MIGRATION_DATABASE_URL`). After creating a migration
with `npm run db:migrate`, run `npm run db:generate` and `npm run db:grants`. Demo accounts for every role are listed in
[docs/DEV_SEED.md](docs/DEV_SEED.md).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server (Turbopack). Parallel servers: `NEXT_DIST_DIR=.next-<label> npx next dev -p <port>` |
| `npm run build` | Production build (`output: "standalone"`, 4 GB heap); run it with `node .next/standalone/server.js` after copying `.next/static` and `public/` next to it (the Dockerfile does this) |
| `npm run worker` | Job worker (`--concurrency=N`, `--queues=a,b`, `--drain`; see `src/worker/options.ts`) |
| `npm run typecheck` | `tsc --noEmit` with a 4 GB heap (plain `npx tsc` runs out of memory here) |
| `npm run lint` | ESLint 9 (flat config) |
| `npm test` / `npm run test:watch` | Vitest (unit + integration against the test database) |
| `npm run db:start` / `db:stop` | Start / stop the local PostgreSQL 18 cluster |
| `npm run db:generate` | `prisma generate` |
| `npm run db:migrate` / `db:deploy` / `db:reset` | `prisma migrate dev` / `migrate deploy` / `migrate reset --force` (dev only) |
| `npm run db:grants` | Apply `scripts/sql/app-role-grants.sql` to the dev and test databases |
| `npm run db:seed` / `db:seed:demo` | Catalogue only (every environment) / plus demo data (development only) |
| `npm run test:db:prepare` | Rebuild the test database schema from scratch |
| `node scripts/build-worker.mjs` | Bundle the worker for the container image |
| `node scripts/bundle-budgets.mjs --dist .next` | First-load JavaScript per route against the budgets (ARCHITECTURE §9.9) |
| `npx tsx scripts/db-deploy.ts` | Deploy-time database step (migrate, grants, section D checks); see docs/DEPLOYMENT.md |

## Testing

```powershell
npm test                                        # everything (needs the local cluster running)
npx vitest run src/server/marking               # one folder or file
$env:VITEST_SKIP_DB_SETUP="1"; npx vitest run src/lib   # unit-only, Postgres stopped
```

Integration tests use `DATABASE_URL_TEST` (a database whose name must end in `_test`); the global setup migrates it
and applies the grants. Tests run in parallel: create your own fixtures with `tests/factories/` and never depend on
global table state. Component tests are `*.test.tsx` with `/** @vitest-environment jsdom */`. Details:
[tests/README.md](tests/README.md). Before finishing a change: `npm run typecheck`, `npx vitest run <files>`,
`npx eslint <files>`.

## Project structure

```
src/app/            routes only: (marketing), (public) SEO pages, (auth), app/ (students), parent/, teacher/,
                    school/, admin/ (CMS), api/v1 (REST), api/webhooks, api/health + api/ready (probes)
src/server/<domain> services: curriculum, content, questions, marking, practice, exams, progress, studyplan,
                    flashcards, ai, billing, notifications, search, schools, whatsapp, ... (+ lib/ infrastructure)
src/components/     ui/ design-system primitives and feature components
src/lib/            isomorphic helpers safe for client bundles
src/worker/         background job worker entry
prisma/             schema.prisma, migrations (with raw SQL: CHECKs, triggers, RLS), seed
scripts/            local database, grants, deploy step, worker bundle, bundle budgets, perf harness
tests/              test setup, factories, cross-cutting integration tests
```

Rules for contributors (and coding agents) are in [CLAUDE.md](CLAUDE.md): thin routes and fat services, Zod at every
boundary, entitlements rather than plan names, every AI call through `src/server/ai`, published content immutable,
no fake numbers.

## Documentation

| Document | Contents |
|---|---|
| [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) | Product scope and requirements (cited as §N) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture decisions: data model, security, AI, payments, performance, deployment |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Container image, health checks, database roles, migrations, environment reference, operations, go-live checklist |
| [docs/API.md](docs/API.md) | REST API v1 for mobile, WhatsApp and integrations |
| [docs/CONTENT_AUTHORING.md](docs/CONTENT_AUTHORING.md) | Writing and publishing content in the CMS |
| [docs/DEV_SEED.md](docs/DEV_SEED.md) | Development seed and demo accounts |
| [docs/OFFLINE.md](docs/OFFLINE.md) | Service worker, offline lessons and low-bandwidth behaviour |
| [docs/WHATSAPP.md](docs/WHATSAPP.md) | WhatsApp channel setup and templates (the channel is switched off until `features.whatsapp` is on) |
| [docs/STATUS.md](docs/STATUS.md) | Status against the product spec, go-live blockers, verification runs |
| [tests/README.md](tests/README.md) | Test harness and conventions |
| [scripts/perf/README.md](scripts/perf/README.md) | Load and query performance harness |

## Deployment

Production runs one container image for web and worker, a one-shot migrate job from the companion tools image,
managed PostgreSQL 18 behind a transaction pooler, S3-compatible storage and a CDN, in a South African cloud region.
Start with [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), the [Dockerfile](Dockerfile) and
[docker-compose.prod.example.yml](docker-compose.prod.example.yml).
