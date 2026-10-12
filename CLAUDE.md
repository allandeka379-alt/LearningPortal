# BvunzoHub — ZIMSEC & Cambridge O/A-Level study platform

Scope and requirements live in `docs/PRODUCT_SPEC.md` (cite sections as §N). Architecture decisions live in
`docs/ARCHITECTURE.md`. Read the relevant spec sections before building a feature.

"BvunzoHub" is the brand (owner decision 2026-10-10), configured via `NEXT_PUBLIC_APP_NAME` — never hard-code it in UI copy;
use `APP_NAME` from `src/lib/config.ts`.

## Owner decisions in force (2026-10-07) — these SUPERSEDE any task prompt that says otherwise

- **Authentication is EMAIL-based, not SMS.** Register with email + password, verify the email with a one-time code
  sent by email, sign in with email (or username for school-provisioned accounts) + password or an emailed code,
  reset passwords by email. SMS is OFF entirely (no SMS provider required, no phone verification); a phone number is
  optional profile data only (e.g. for Paynow EcoCash/OneMoney checkout). Ignore any instruction to make auth
  "phone-first" or to verify by SMS.
- **Email sending is ON only for transactional account email** (verification codes, password resets, security
  notices, invitations). No marketing, digest or announcement emails (those stay in-app). Provider: Resend
  (`EMAIL_PROVIDER=resend`); console in dev/test.
- **Switched off for now (dormant, reversible via the `features` setting):** all AI (tutor, solver, AI marking, AI
  drafts), the WhatsApp channel, Stripe, SMS.
- **Pricing (updated 2026-10-12):** NO free tier. Full Access costs **USD 1 a month** via Paynow (EcoCash, OneMoney,
  cards via Paynow web): a ONE_OFF price with a 30-day access period, renewed by paying again (Paynow cannot auto-debit;
  never claim "nothing renews" or "pay once, keep it"). Required for every learning feature; an account alone opens
  nothing. Price is DB-configured (seed step applyMonthlyPricing). Public marketing samples (daily question page, exam countdown, SEO syllabus pages) stay public.
- **Positioning (2026-10-12):** a LEARNING platform for Form 3 to Form 6 (courses in syllabus order) that also serves
  exam candidates; never "Start free". Brief: `.scratch/website/DESIGN-BRIEF.md`.
- **No human content review (2026-10-12):** imported content is published straight to production by the deploy's
  migrate step (`content:publish` with an ADMIN approver; DB four-eyes still holds because the importer is the creator).
- **Priority:** comprehensive, real, reviewed curriculum content across all major subjects (content pipeline in
  `content/` + `docs/CONTENT_PIPELINE.md`).

## Stack (pinned — do not upgrade majors)

- Next.js 16 (App Router, Turbopack, React 19, Server Components + Server Actions), TypeScript 5.9 strict
  (`noUncheckedIndexedAccess` is on).
- PostgreSQL 18 + Prisma 7 with the `pg` driver adapter. Generated client lives in `src/generated/prisma`
  (gitignored). Import types/enums from `@/generated/prisma/client`; import the db singleton from `@/server/db`.
- Tailwind CSS 4 (CSS-first config: tokens in `src/app/globals.css` under `@theme`; there is no tailwind.config.js).
- Zod 4 for all validation. Vitest 4 for tests. ESLint 9 flat config (`npm run lint`; `next lint` no longer exists).
- KaTeX + unified/remark/rehype for content rendering (server-side). Anthropic SDK for AI.

### Next.js 16 rules that differ from older versions

- `params` and `searchParams` are Promises: `const { slug } = await params`.
- `cookies()`, `headers()`, `draftMode()` are async.
- Request interception file is `src/proxy.ts` exporting `proxy()` (formerly middleware). Keep it thin: no DB calls.
- Turbopack is the default bundler. Don't add webpack config.

### Prisma 7 rules

- Datasource URL is configured in `prisma.config.ts`, not in `schema.prisma`.
- Generator is `prisma-client` (not `prisma-client-js`) with `output = "../src/generated/prisma"`.
- `prisma migrate dev` does not run seed or generate automatically: run `npm run db:generate` / `npm run db:seed`.
- Raw SQL: use `prisma.$queryRaw` tagged templates (parameterised). NEVER `$queryRawUnsafe` with user input.

## Local environment

- `npm run db:start` starts a project-local Postgres 18 cluster (`.data/pg`, localhost:5433, trust auth).
  Databases: `zimstudy` (dev), `zimstudy_test` (tests). Windows host; PowerShell is the primary shell.
- Two DB roles, exactly like production: the APP connects as `app_rw` (NOSUPERUSER NOBYPASSRLS → row-level security
  and append-only privileges are enforced) via `DATABASE_URL`; the Prisma CLI runs as the owner via
  `MIGRATION_DATABASE_URL`. After creating a migration run `npm run db:grants`. Tests do this automatically.
- `npm run dev` → http://localhost:3000. `npm test` runs Vitest (integration tests use `DATABASE_URL_TEST`;
  `VITEST_SKIP_DB_SETUP=1` skips migrations for unit-only runs).
- Scripts that import server modules must run with `tsx --conditions=react-server` (the `server-only` package throws
  otherwise): `npm run db:seed`, `npm run db:seed:demo`, `npm run worker`.
- Parallel dev servers: `next.config.ts` reads `distDir` from `NEXT_DIST_DIR` (default `.next`; `.next*/` is
  gitignored). Verifiers and parallel workflows each run their own server with their own build directory and port,
  e.g. `NEXT_DIST_DIR=.next-<label> npx next dev -p <port>` (PowerShell:
  `$env:NEXT_DIST_DIR=".next-<label>"; npx next dev -p <port>`), so builds never collide. Stop only the server you
  started (by its PID); never kill another agent's dev server (no blanket `node` / `next` kills). On first start
  with a new label Next appends `.next-<label>/types/**/*.ts` entries to `tsconfig.json` `include`; they are inert
  (`.next-*` is excluded from tsc and ESLint) and must not be committed. DISK IS LIMITED: each build directory grows
  to 0.5–4 GB, so after stopping your server DELETE your own `.next-<label>` directory (never another agent's).

## Database rules enforced by Postgres (docs/ARCHITECTURE.md §4 — read it before writing data code)

The init migration (`prisma/migrations/*_init/migration.sql`) adds ~290 CHECK constraints, 83 triggers and RLS
policies that Prisma cannot express. Code that fights them will fail at runtime. Key obligations:

- **AI privacy (RLS):** every `AiConversation`/`AiMessage` query runs inside `withUserContext(actor.userId, tx => …)`
  from `src/server/lib/db-context.ts`. Workers use `withAiScope("system", null, …)`; audited admin access uses
  `"break_glass"`; consenting parents use `"parent"`. Without context the tables simply look empty.
- **Content workflow (Lesson, Question, Flashcard, Assessment, StudyPack, StudyPlanTemplate):** status moves
  DRAFT → IN_REVIEW → APPROVED → PUBLISHED → ARCHIVED (PUBLISHED → DRAFT is refused). AI-generated and imported rows
  are inserted as DRAFT; `aiGenerated` never flips back. APPROVED/PUBLISHED needs `approvedById`/`approvedAt`, a
  cleared `copyrightStatus` (not UNVERIFIED) and a source. With `app.four_eyes = 'on'` (production) the approver must
  differ from the creator.
- **Published content is immutable:** what a student saw at revision N never changes. Edit via a draft copy and a
  *publish merge* in ONE transaction: `setContentPublishContext(tx, rootId)` (unlocks child rows such as options,
  parts, sections, items), apply changes, bump `revision` by exactly 1, insert the `ContentRevision` snapshot (checked
  at COMMIT). Use the shared publish helper in `src/server/content/` — never hand-roll this.
- **Syllabus versions:** a published `Syllabus` cannot return to DRAFT or change structure (topics/objectives);
  create a new version instead. Enrolments pin a published version.
- **Append-only:** `AuditLog` (no UPDATE/DELETE for the app role; the 2-year retention purge is an ops task run as the
  `app_maintenance` role, `scripts/maintenance/purge-audit.ts`), `ContentRevision`, `PaymentEvent`.
- **Demo data:** rows with `isDemo = true` are refused when `app.environment = 'production'`; demo testimonials can
  never be published.
- **Future migrations:** Prisma ignores the raw SQL objects (no drift), but new CHECKs on populated tables use
  `NOT VALID` + `VALIDATE`, indexes use `CREATE INDEX CONCURRENTLY`, and changed index definitions must DROP first.
  Keep raw SQL in the migration file next to the Prisma DDL, with a `-- Purpose:` comment per statement.

## Directory layout

```
prisma/schema.prisma        single schema file; prisma/seed.ts + prisma/seed/* (dev catalogue + DEV-ONLY demo content)
src/app/                    routes only (thin): pages, layouts, route handlers, colocated actions.ts
  (marketing)/              public site: /, /pricing, /schools, /about, /faq, /legal/*
  (public)/[board]/...      SEO curriculum pages, e.g. /zimsec/o-level/mathematics (public, no premium content)
  (auth)/                   /login /register /verify /forgot-password /reset-password
  onboarding/               student onboarding wizard
  app/                      authenticated student area (/app, /app/subjects/..., /app/practice, /app/exams, ...)
  parent/ teacher/ school/  role areas
  admin/                    CMS + operations (ADMIN, SUPER_ADMIN, CONTENT_EDITOR)
  api/v1/                   versioned REST API (mobile, WhatsApp, integrations)
  api/webhooks/             payment + WhatsApp webhooks
src/components/ui/          design-system primitives (Button, Card, Input, Badge, ProgressBar, ...)
src/components/<area>/      feature UI (e.g. components/practice/QuestionCard.tsx)
src/server/                 server-only code ("import 'server-only'" at the top of every module that touches db/secrets)
  db.ts                     Prisma singleton
  auth/                     sessions, passwords, OTP, OAuth, RBAC, guards
  lib/                      infra: env, errors, logger, rate-limit, audit, cache, jobs, storage, api helpers
  <domain>/                 domain services (one folder each): accounts, adaptive, ai, analytics, api, attempts,
                            billing, cms, content, curriculum, enrollment, exams, family, flashcards, gamification,
                            leaderboards, lessons, marketing, marking, messaging, notifications, onboarding, ops,
                            practice, progress, questions, referrals, schools, search, seo, sharing, solver, studyplan,
                            teaching, tutor, uploads, whatsapp
  cms/<area>/               admin CMS services: ai-drafts, announcements, assessments, commerce, curriculum,
                            daily-questions, faq, flags, flashcards, imports, lessons, media, questions, review,
                            schools, settings, study-packs, testimonials, users
src/lib/                    isomorphic helpers safe for client bundles (formatting, constants, shared zod schemas)
src/worker/                 background job worker entry (`npm run worker`)
tests/                      test setup, factories, cross-cutting integration tests
```

## Architecture rules

1. **Thin routes, fat services.** Pages/actions/route handlers parse input, call a service in `src/server/<domain>`,
   render output. Business logic never lives in components. Services are plain async functions that take an explicit
   `actor` (the authenticated user context) where authorization matters, so the web app, REST API, WhatsApp channel
   and worker all reuse them.
2. **Pure core, tested.** Marking, grading, mastery, adaptive selection, spaced repetition, study-plan generation,
   streaks/XP and entitlement checks are pure functions (no DB) with unit tests. DB orchestration wraps them.
3. **Authorization at the service boundary.** Use guards from `src/server/auth/guards.ts`
   (`requireUser`, `requireRole`, `requirePermission`) in routes, AND resource checks in services (a teacher only sees
   their classes; a parent only sees linked children; AI conversations are never shown to parents/teachers).
4. **Validate every input** with Zod at the boundary. Server actions return
   `ActionResult<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string; fieldErrors?: Record<string, string[]> } }`.
   Use `AppError` (`src/server/lib/errors.ts`) for expected failures; never leak stack traces to clients.
5. **Everything content is data.** No educational content, subjects, topics, prices, plan limits, exam dates or
   marketing claims hard-coded in components. They come from the DB/CMS. UI copy (labels, buttons) is fine.
6. **No fake numbers.** Dashboards show real computed values or an honest empty state. No invented testimonials,
   user counts, pass rates. Demo data exists only in dev seed and is flagged as demo.
7. **Content workflow.** Lessons/questions/flashcards/exams have status DRAFT → IN_REVIEW → APPROVED → PUBLISHED →
   ARCHIVED. Students only ever see PUBLISHED. AI-generated content always enters as DRAFT with `aiGenerated = true`.
8. **Versioned curriculum.** Never mutate a published syllabus version in place; create a new version. Student
   enrolments pin a syllabus version.
9. **Entitlements, not plan names.** Gate features with `assertEntitlement(actor, "mock_exams")` etc. from
   `src/server/billing/entitlements.ts`; plan features/limits are DB-configured.
10. **AI cost control.** All model calls go through `src/server/ai` (routing by task tier, quota check, token metering,
    caching). Never call the Anthropic SDK directly from routes. Without `ANTHROPIC_API_KEY`, AI returns an explicit
    "AI is not configured" response — never fabricated output.
11. **Performance.** Paginate every list (cursor-based for APIs). Select only needed columns. Add indexes for every
    foreign key and every filter/sort used in queries. No N+1 loops over DB calls. Server Components by default;
    `"use client"` only for interactive leaves.
12. **Security.** Argon2id password hashing; DB-backed sessions (hashed tokens, httpOnly cookies); rate-limit auth,
    OTP, AI and public APIs; sanitize all rendered HTML; audit-log privileged actions (`audit()` from
    `src/server/lib/audit.ts`); validate uploads (type sniffing, size limits). Student data is sensitive: never log PII.

## UI / design rules (§37, §29, §43)

- Mobile-first. Design at 360px width first, then enhance. Touch targets ≥ 44px. No horizontal scroll.
- Use the tokens in `globals.css` and primitives in `src/components/ui`. Don't invent new colours.
  Primary = deep Zambezi teal-blue, accent = msasa amber, warm granite neutrals; success/danger reserved for feedback.
- Calm, premium, not childish: no confetti, mascots, or gratuitous gradients/animations. Respect
  `prefers-reduced-motion`. Dark mode via tokens.
- Accessibility: semantic HTML, labelled form controls, visible focus rings, `aria-live` for marking feedback,
  keyboard-operable exam navigation, alt text on content images, WCAG AA contrast.
- Low bandwidth: no client-side data fetching libraries for initial render; no large client bundles; images via
  `next/image`; math rendered server-side.

## Testing

- Unit tests next to the code: `foo.ts` → `foo.test.ts`. Integration tests that hit Postgres use the test DB
  automatically (see `tests/setup.ts`); create your own fixtures with unique values (helpers in `tests/factories/`)
  and never truncate or depend on global table state, because test files run in parallel.
- Component tests: `*.test.tsx` with `/** @vitest-environment jsdom */` as the first line (Testing Library installed).
- Before finishing a task: `npm run typecheck` (tsc with a 4 GB heap — plain `npx tsc` runs out of memory on this
  codebase; zero errors in files you touched), `npx vitest run <your files>`,
  and `npx eslint <your files>`.

## Background jobs, rate limits, demo data

- Jobs: a domain module exports `register<Domain>Jobs()` (handlers via `registerJobHandler`, schedules via
  `registerRecurringJob`); `src/worker/handlers.ts` calls it. Enqueue with `enqueue(type, payload, { client: tx,
  dedupeKey })` in the same transaction as the domain write. Handlers must be idempotent.
- Rate limits: use the presets in `rateLimits` (`src/server/lib/rate-limit.ts`, tunable via the `rateLimits`
  setting); add a preset rather than inlining numbers.
- Demo accounts for every role (dev only) are listed in `docs/DEV_SEED.md` (`npm run db:seed:demo`).

## Rules for parallel build agents

- Only create/edit files in the area you were assigned. If you need a change in a shared file (schema, shared
  components, nav config, package.json), do NOT make it — report it in your final output.
- Do not run `npm install`, `prisma migrate`, `next build` or `next dev` unless your task says so.
- Do not delete or rewrite files you did not create.
