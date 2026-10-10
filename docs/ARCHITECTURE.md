# Architecture

> Started 2026-10-05 as the Phase 1 assessment requested in §54 and §48 of `docs/PRODUCT_SPEC.md`; **reconciled with
> the code on 2026-10-07** (phases 1–18 are built). Requirements are cited as §N. Where a design was not built, or was
> built differently, the text says so ("Not built", "As built"). Per-section delivery status, go-live blockers and open
> decisions: **[STATUS.md](STATUS.md)**. Operations: [DEPLOYMENT.md](DEPLOYMENT.md). REST contract: [API.md](API.md).
> The brand ("BvunzoHub", owner decision 2026-10-10) is configured via `NEXT_PUBLIC_APP_NAME`.
>
> Legend: **Decided** = adopted for implementation. **TBC** = needs owner confirmation (budget, accounts, legal).
> Section 4 (detailed data model) was written by the schema finalizer and matches `prisma/schema.prisma`.

---

## 0. Executive summary

**What we are building.** A database-driven exam-preparation platform for ZIMSEC and Cambridge O/A-Level students
(§1–§3): curriculum hierarchy, lessons with proper maths notation, a question bank with instant marking, adaptive
practice, timed mock exams, AI tutor and solver, study plans, flashcards, parent/teacher/school views, subscriptions
with Zimbabwean payment methods, and a CMS. Mobile-first and usable on slow connections (§29).

**Starting point.** The repository was empty when inspected on 2026-10-05: nothing to reuse, migrate or replace
(§1). The only assets are the installed toolchain (Node 24, npm, PostgreSQL 18, Python).

**Shape.** One TypeScript codebase deployed as a **modular monolith**: a stateless Next.js 16 web tier (pages, Server
Actions, a versioned REST API, webhooks) and a **worker process** built from the same code, both calling the same
domain services in `src/server/<domain>`. PostgreSQL 18 is the system of record **and** the job queue, search index
and rollup store until measured load justifies Redis or a search engine (§2.3).

| Decision | Choice | Status |
|---|---|---|
| Application shape | Modular monolith: web + worker from one image; services shared by web, REST, WhatsApp, worker | Decided |
| Framework | Next.js 16 App Router, React 19 Server Components, Server Actions, Turbopack | Decided |
| Data | PostgreSQL 18 + Prisma 7 (`pg` driver adapter); UUIDv7 keys; versioned syllabuses | Decided |
| Background work | Postgres-backed job queue (`FOR UPDATE SKIP LOCKED`) + separate worker process | Decided |
| Search | Postgres full-text search + `pg_trgm` over a denormalised `SearchDocument` table | Decided |
| Content format | Markdown + LaTeX + whitelisted directives, rendered and sanitised **at write time**; KaTeX server-side | Decided |
| Auth | In-house: Argon2id passwords, OTP by email (email-based accounts; owner decision 2026-10-07), Google OIDC, DB-backed sessions, permission-based RBAC | Decided |
| AI | Anthropic API behind `src/server/ai`: 3 routing tiers (Haiku 4.5 / Sonnet 5.5 / Opus 5.5), quotas, metering, cache, kill switch | Decided |
| Payments | Provider adapter interface; Paynow (EcoCash, OneMoney, ZimSwitch, Visa/Mastercard; USD + ZWG) first; sandbox for dev | Decided (accounts TBC) |
| Hosting | Containers in a cloud region near Zimbabwe (recommended AWS af-south-1, Cape Town) + CDN with African PoPs | TBC (budget) |

**Top risks** (full register in §12): copyright exposure from past papers / syllabus text / AI-reproduced textbooks
(§27); AI spend outrunning subscription revenue at Zimbabwean price points (§40); exam-season load spikes; mobile-money
payment confirmation delays; correctness of AI-drafted content.

**Owner decisions needed:** hosting provider and budget (§10), Paynow merchant account(s) and whether a non-Zimbabwean
entity exists for Stripe (§7; Stripe is switched off), the email provider (§5.1; accounts are email-based and SMS is off),
WhatsApp Business verification (§8; WhatsApp is switched off), legal review of minors'
data consent and cross-border hosting under Zimbabwe's Cyber and Data Protection Act (§5.12), content licensing
strategy for syllabuses and past papers (§12.2).

**Current state (2026-10-07):** all 18 phases have been implemented (§11). The application runs end to end with
development demo content; production readiness depends on the blockers in [STATUS.md](STATUS.md) (the email adapter
verified live, real curriculum content, legal review, live Paynow verification, first Docker/CI runs). AI, WhatsApp,
optional email, SMS and Stripe are switched off by the owner (§3.14).

---

## 1. Repository audit (§48)

### 1.1 Findings at inspection (2026-10-05)

| §48 item | Finding | Consequence |
|---|---|---|
| 1. Inspect the repository | Empty. No commits, no source files, no application. | Greenfield build; no migration or compatibility constraints. |
| 2. Existing stack | None in the repo. Machine toolchain: Node 24.14.0, npm 10.8.2, PostgreSQL 18.3 server binaries (`C:\Program Files\PostgreSQL\18`), Python 3.14.3. | Stack chosen on merit (§2). Python is not part of the app. |
| 3. Reusable components | None. | Design system and primitives built in Phase 5 (`src/components/ui`). |
| 4. Database architecture | None: no schema, migrations or data. | Schema designed from §2, §26 and §34 in Phase 2 (§4 of this doc). |
| 5. Authentication | None. | Built in Phase 3 (§5). |
| 6. Deployment configuration | None: no Dockerfile, CI, IaC or hosting account. | Designed in §10, built in Phase 18; owner accounts TBC. |
| 7. Design system | None: no tokens, components or brand assets. | Tokens in `src/app/globals.css` (`@theme`), primitives in `src/components/ui` (§37). |
| 8. Technical debt | None inherited. | Risks are forward-looking only (§12). |

§48 also says "improve existing apps rather than replacing". There is nothing to replace, so no architectural change
needs approval beyond this document.

### 1.2 What exists now (reconciled 2026-10-07)

The bootstrap table that used to be here (Phase 1) is obsolete: every file it listed as missing now exists. In brief:

| Area | Where |
|---|---|
| App (routes, layouts, Server Actions, route handlers) | `src/app/` (route map in §3.3); request interception `src/proxy.ts` |
| Domain services | `src/server/<module>/` (module map in §3.2); isomorphic helpers `src/lib/` |
| Worker | `src/worker/` (job registry in §3.7) |
| Schema and migrations | `prisma/schema.prisma` (119 models, 111 enums), `prisma/migrations/` (the init migration carries the raw SQL; later migrations add indexes and one column) |
| Seeds | `prisma/seed/` (catalogue + DEV-ONLY demo content, [DEV_SEED.md](DEV_SEED.md)) |
| Tests | 474 test files next to the code and in `tests/` (`tests/global-setup.ts`, `tests/setup.ts`, `tests/stubs/server-only.ts`, `tests/factories/`) |
| Deployment | `Dockerfile`, `docker-compose.prod.example.yml`, `scripts/db-deploy.ts`, `.github/workflows/ci.yml` ([DEPLOYMENT.md](DEPLOYMENT.md)) |
| Local tooling | `scripts/db-local.ps1` (Postgres 18 on `localhost:5433`), `scripts/apply-db-grants.ts`, `scripts/next-build.mjs`, `scripts/bundle-budgets.mjs`, `scripts/perf/` |
| Git | Branch `main`, no commits yet (everything is untracked) |

---

## 2. Technology stack

### 2.1 Choices and rationale

Versions are the ones installed on 2026-10-05. Majors are pinned (CLAUDE.md); minors move through reviewed PRs.

| Concern | Choice (version) | Why it fits this product |
|---|---|---|
| Runtime | Node.js 24 LTS (`engines >=22.12`) | One language (TypeScript) across web, REST API, worker and WhatsApp; mature ecosystem for payments and messaging SDKs. |
| Web framework | Next.js 16.3 App Router, React 19.3, Turbopack | **SEO (§44):** server-rendered and statically prerendered public curriculum pages. **Low bandwidth (§29):** Server Components ship zero JS for content-heavy pages; only interactive leaves hydrate. **One deployable** hosts pages, Server Actions, `/api/v1` and webhooks. Built-in image optimisation, metadata/OG images, streaming. |
| Language | TypeScript 5.9 `strict` + `noUncheckedIndexedAccess` | A large schema (~100 models) and 7 roles need compile-time safety. Generated Prisma types flow end to end. |
| Database | PostgreSQL 18 | Relational integrity for a deep hierarchy (§2, §34); JSONB for type-specific question payloads; built-in full-text search and `pg_trgm` (§28) without extra infrastructure; `SKIP LOCKED` job queue; partitioning path for hot tables (§9). |
| ORM / migrations | Prisma 7.10 with `@prisma/adapter-pg` | Typed client for the whole schema; reviewed SQL migrations; Rust-free client using the `pg` driver (smaller images, works behind a pooler). Raw SQL only via tagged `$queryRaw`. |
| Styling | Tailwind CSS 4.3 (CSS-first `@theme` tokens) | Tiny CSS output, design tokens in one file, dark mode via tokens (§37). No runtime CSS-in-JS. |
| Validation | Zod 4.6 | One schema language for forms, Server Actions, REST bodies, JSON payload columns, AI structured outputs and OpenAPI (`z.toJSONSchema`). |
| Auth | In-house on `@node-rs/argon2` 2.2 (Argon2id) + DB sessions | Needs phone + OTP (most students have phones, not email), 7 roles with resource rules (§33), minors' data kept in our own database, and no per-MAU vendor fees at 100k+ students. |
| Content rendering | unified 11, remark-parse/gfm/math/directive, remark-rehype, rehype-sanitize 6, KaTeX 0.19 (+ mhchem) through an in-house `rehype-math` plugin | Proper maths notation (§8) rendered **on the server** so no maths JS reaches phones; directives give structured lesson blocks; sanitiser stops XSS (§39). *As built:* `rehype-katex` is not used (it pins its own KaTeX 0.16); see `src/server/content/rehype-math.ts`. |
| Images | sharp 0.35 + Next's image optimiser, **without** importing `next/image` | Re-encode uploads, strip EXIF (§38). *As built:* `src/lib/images.ts` produces the same optimiser `srcset` as `next/image` without shipping its client component (§9.9). |
| Bulk import | papaparse 5.7, read-excel-file 9.3 | CSV/Excel/JSON content and roster import (§25). |
| AI | `@anthropic-ai/sdk` 0.131 | Official SDK; streaming, structured outputs, vision, prompt caching (§14, §15, §40). |
| Icons | lucide-react | Tree-shaken SVG icons; no icon font download. |
| Tests | Vitest 4.1 (unit + Postgres integration + jsdom component tests), Playwright (**planned, still not installed**) | Fast unit tests for the pure core; integration tests against a real Postgres 18 test DB. Playwright for mobile-viewport and slow-network E2E (§51) was planned for Phase 17 and is **not built**; the §52 journey is covered by a scratch smoke script (`.scratch/journey-smoke.ts`). |
| Lint | ESLint 9 flat config | Includes Next core-web-vitals; project rules ban `$queryRawUnsafe` and stray `dangerouslySetInnerHTML` (§5.7). |

**How the stack meets the non-functional drivers**

| Driver | Mechanism |
|---|---|
| SEO server rendering (§44) | Static prerender + tag-based revalidation of public curriculum pages; per-page metadata, JSON-LD, sitemap. Crawlers receive fully rendered HTML. |
| Low bandwidth (§29) | Server Components by default, server-side KaTeX, per-route JS budgets (§9.9), AVIF/WebP images, no client data-fetching libraries for initial render. |
| Mobile-first (§29, §37) | Designed at 360px; touch targets of at least 44px; installable PWA with an offline shell (§3.13). |
| 100k+ students (§38) | Stateless web nodes, DB-backed sessions, read rollups, cursor pagination, pooled connections, CDN, worker for heavy work, partitioning path (§9). |
| One language everywhere | Web, REST, worker, WhatsApp and scripts are TypeScript and import the same services. |
| Strong typing for a large schema | Prisma-generated types + Zod at boundaries + strict TS with indexed-access checks. |

### 2.2 Deliberately not adopted (yet)

"Don't prematurely over-engineer, but don't create architecture that cannot scale" (§38). Each deferral has a trigger
and an exit path that the current design keeps open.

| Not adopted | Why not now | Adopt when (trigger) | Exit path kept open by |
|---|---|---|---|
| Redis / Valkey | Postgres covers sessions, rate limits, queue and rollups at launch scale; one less service to run and pay for. | More than 1 web node needing shared Next cache tags; rate-limit writes over ~300/s; queue latency p95 over 2s. | `lib/cache`, `lib/rate-limit`, `lib/jobs` are interfaces with Postgres implementations. |
| Dedicated search engine (Meilisearch, Typesense, OpenSearch) | Postgres FTS + trigram meets §28 for a catalogue of up to a few million documents. | Search p95 over 200ms, over 5M documents, or a need for typo-tolerant ranking beyond `pg_trgm`. | All search goes through `SearchDocument` and `src/server/search`; reindex is a job. |
| Microservices | One team, one domain model; network hops would add latency and failure modes. | A domain needs independent scaling or a different runtime (e.g. a heavy AI marking fleet). | Domain modules have no cross-module DB writes except through service calls; the worker already runs separately. |
| Native mobile app | A PWA reaches every phone without app-store friction or data-heavy downloads. | Need for push on iOS beyond web push, offline practice packs, or store distribution for schools. | `/api/v1` REST with bearer tokens is designed for a native client from day one. |
| Message broker (SQS, Kafka) | Postgres queue gives transactional enqueue (outbox) for free. | Sustained over ~500 jobs/s or cross-region fan-out. | `lib/jobs` interface. |
| GraphQL | REST + Server Components are enough; GraphQL adds attack surface and N+1 risk. | Several third-party clients with very different data shapes. | Services are transport-agnostic. |
| Client data-fetching libraries (React Query, SWR) | Server Components render data; mutations use Server Actions. | A highly interactive offline-first view needs a client cache (offline flashcards use IndexedDB directly). | n/a |
| Headless CMS SaaS | Content needs a bespoke workflow, versioned syllabuses, licensing fields and AI drafts tied to our schema (§25, §26, §27, §41). | Never planned. | n/a |
| Third-party auth (Auth.js, Clerk) | Phone OTP, 7-role RBAC, minors' privacy and cost (§2.1). | Enterprise SSO for schools (SAML or Google Workspace for Education domains). | `src/server/auth` isolates identity; `OAuthAccount` supports more providers. |
| Kubernetes | Two container types do not justify cluster operations. | More than ~6 services or multi-region active-active. | Containers are 12-factor. |
| Read replicas | A single primary handles the projected write volume (§9.1). | Primary CPU over 60% sustained or reporting queries hurting OLTP latency. | Read-only analytics queries live in `src/server/analytics` behind one client. |
| Analytics warehouse (ClickHouse, BigQuery) | `DailyMetric` rollups satisfy §35. | Ad-hoc cohort analysis over the raw attempt history. | Append-only attempt tables are export-friendly. |
| Vector database / embeddings | Context is built from structured curriculum data (topic, objectives, mastery). | Semantic retrieval over thousands of lessons measurably improves tutor answers. | Postgres `pgvector` would be the first step, not a new store. |

### 2.3 Version and documentation policy

- Majors pinned. Minors and patches through a weekly dependency PR that must pass CI.
- Next.js 16 ships its own docs in `node_modules/next/dist/docs` and warns that APIs differ from older versions. Read
  them before using a Next API. Experimental flags (e.g. `experimental.useOffline`) stay behind config and are removable.

---

## 3. Application architecture

### 3.1 Layers

```
 Clients ─ mobile/desktop browsers (PWA) · future native app · WhatsApp · payment providers · staff (CMS)
    │
 CDN / edge ─ immutable /_next/static, media variants, prerendered public pages (Cache-Control: public)
    │
 ┌──────────────────────────── Next.js 16 web tier (stateless, N replicas) ────────────────────────────┐
 │ src/proxy.ts   cookie-presence redirects, request id, x-dz-request-path. NO database calls.         │
 │                                                                                                      │
 │ ROUTES (thin)  RSC pages · Server Actions (actions.ts) · Route handlers (/api/v1, /api/webhooks)     │
 │                1. parse + validate (Zod)  2. authenticate (requireUser)  3. coarse authz (permission)│
 │                4. call service with actor 5. map AppError -> ActionResult / HTTP  6. render           │
 │                                                                                                      │
 │ SERVICES       src/server/<domain>: resource-level authorization, transactions, orchestration,       │
 │                enqueue jobs (same transaction), call pure core                                       │
 │                                                                                                      │
 │ PURE CORE      marking · grading · mastery · adaptive selection · SRS · study-plan generation ·      │
 │                streaks/XP · entitlement resolution · payment state machine  (no I/O, unit-tested)    │
 │                                                                                                      │
 │ INFRA          src/server/lib: env · errors · logger · rate-limit · audit · cache · jobs · storage · │
 │                s3 · uploads · settings · api · db-context · db-safety   src/server/db.ts (Prisma)    │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────┘
    │                    ▲ same services, same image
    │      ┌──────────── worker (src/worker, 1..N replicas): job loop, cron scheduler ───────┐
    ▼      ▼
 PostgreSQL 18 (OLTP · job queue · FTS · rollups · rate limits) │ Object storage (S3-compatible)
 Anthropic API │ Email + SMS providers │ Paynow / Stripe │ WhatsApp Cloud API │ error tracking + logs
```

**Rules** (CLAUDE.md "Architecture rules" plus these specifics):

- Every service function that touches user data takes an explicit `actor`:
  `{ kind: "user", userId, roles, sessionId, channel: "web" | "api" | "whatsapp" }` or
  `{ kind: "system", job: string }` for the worker. Services never read cookies or headers.
- Services may call other services; they never write another domain's tables directly.
- Pure-core modules import nothing from `db`, `lib/*` I/O, or `next/*`.
- Error contract (`src/server/lib/errors.ts`, `ERROR_CODES`): services throw `AppError(code, message, options)` with a
  message that is safe to show. Server Actions wrap their body in `safeAction()` and return `ActionResult<T>`; route
  handlers use `toHttpResponse()` (via `apiRoute`). Next control-flow errors (`redirect()`, `notFound()`) are rethrown.

| `AppError.code` | Server Action result | HTTP (REST) |
|---|---|---|
| `VALIDATION` | `{ ok: false, error: { code, message, fieldErrors } }` | 422 |
| `BAD_REQUEST` (malformed input that is not a field error) | error result | 400 |
| `UNAUTHENTICATED` | error result (pages redirect to `/login` through their guards) | 401 |
| `FORBIDDEN` | error result | 403 |
| `ENTITLEMENT_REQUIRED` | error result + upgrade prompt | 403 (`code` distinguishes it) |
| `PAYMENT_REQUIRED` | error result | 402 |
| `NOT_FOUND` | error result (pages call `notFound()`) | 404 |
| `CONFLICT` (stale version, duplicate) | error result | 409 |
| `RATE_LIMITED` / `QUOTA_EXCEEDED` | error result with retry time | 429 + `Retry-After` |
| `AI_UNAVAILABLE` | explicit message; `details.reason` is `not_configured` (no API key: "AI is not configured"), `kill_switch`, `budget`, or a transport failure | 503 |
| `INTERNAL` / anything unexpected | generic message, logged with an error id, no stack trace | 500 |

### 3.2 Module map (`src/server/<module>`)

*As built (2026-10-07).* The Phase 1 plan had 21 domain modules; the code has 39 (plus `db.ts`). Several planned
modules were split (`growth` became `referrals`, `sharing` and `marketing`; `practice` became the `attempts` engine
plus thin `practice` / `exams` adapters; `schools` became `schools` for school admins and `teaching` for teachers;
`accounts` became `accounts`, `family`, `enrollment` and `onboarding`), the CMS got its own tree (`cms/*`), and
`imports` lives in `cms/imports`. Pure cores are unit-tested files with no I/O.

**Learning (student side)**

| Module | Responsibility | Pure core | Key models |
|---|---|---|---|
| `curriculum` | Catalogue reads, syllabus versions and pinning, topic trees, exam sessions, grade schemes, public URL resolution, reserved slugs | `core.ts` (version rules, reserved slugs) | Country, ExamBoard, Qualification, Subject, Syllabus, Topic, LearningObjective, ExamSession, GradeScheme |
| `onboarding` | The §5 wizard (country → board → level → year → subjects → exam → ability → grade → goal → finish), the diagnostic offer and the §52 performance report | `steps.ts`, `report.ts` | Student, SubjectEnrollment |
| `enrollment` | Subject enrolments that pin a published syllabus version; targets per subject; soft removal; audited move to the CURRENT version with lineage-based mastery carry-over (§26) | `version-move-core.ts` | SubjectEnrollment, EnrollmentTopicChoice, TopicMastery |
| `accounts` | Student account settings (display name, display/accessibility preferences, time zone, daily goal, leaderboard privacy); privacy requests: data export, account deletion after a 14-day grace, retention purges (landed 2026-10-07, §4.13) | — | Profile, Student, PrivacyRequest |
| `lessons` | Lesson reader read model (pinned version, free vs paid), lesson progress, lesson check | `core.ts` | Lesson, LessonProgress, LessonQuestion |
| `questions` | Question data access: attempt loading, adaptive candidate pools, revision snapshots, QuestionStats counters | — | Question, QuestionOption, QuestionTopic, QuestionStats |
| `marking` | Deterministic marking for every auto-markable type (choice, numeric/units/sig. figs, short answer, blanks, matching, labelling, calculation, structured) | everything | (writes via `attempts`) |
| `attempts` | **The attempt engine** for every channel: start/resume (entitlements, selection, server deadline), answer, hints, self-assessment, AI marking hand-off, finalize, analysis, remark | `policy.ts`, `analysis.ts` | AssessmentAttempt, AssessmentAttemptSection, QuestionAttempt, QuestionAttemptMarking |
| `practice` | Thin web adapter over `attempts` for the §10 builder, sessions and the daily question | — | — |
| `exams` | Exam-mode adapter over `attempts` (§12, §13): room state, timer view, scoring view | `scoring.ts`, `timer.ts` | Assessment (read) |
| `adaptive` | Adaptive selection and study recommendations (§10, §11) | `core.ts` | TopicMastery (read), QuestionStats (read) |
| `progress` | Mastery rollups, subject progress, dashboard and topic-tree read models, countdown in the header; "Detailed analytics" for the `advancedAnalytics` entitlement (topic trends, accuracy by difficulty, time per question) | `core.ts`, `detailed-analytics-core.ts` | TopicMastery, SubjectProgress, DailyActivity, LearnerStats, QuestionAttempt (read) |
| `study-packs` | Student study-pack catalogue and landing page (§24): packs for the student's qualifications, scope labels, purchasable prices (same rule as the checkout), ownership, counts of published content | `core.ts` | StudyPack, StudyPackScope, PlanPrice, EntitlementGrant (read) |
| `studyplan` | Weekly plan generation and nightly/after-mock adaptation (§16) | `generator.ts` | StudyPlan, StudyPlanItem |
| `flashcards` | Decks, due queues, own cards, spaced repetition (§18) | `srs.ts` | Flashcard, FlashcardState, FlashcardReview |
| `gamification` | Streaks (time-zone aware), weekly goals, XP (§19) | `streaks.ts`, `xp.ts` | LearnerStats, XpEvent, DailyActivity |
| `leaderboards` | Leaderboard snapshots, weekly close, read model with privacy modes; achievements/badges (§19, §20) | `core.ts`, `achievements-core.ts` | LeaderboardEntry, Achievement, UserAchievement |
| `search` | SearchDocument builders, indexer jobs, query understanding, ranked keyset search, suggestions (§28) | `documents.ts`, `query-understanding.ts`, `cursor.ts` | SearchDocument |
| `tutor` | AI tutor conversations for web, REST (SSE) and WhatsApp (§14) | `core.ts`, `protocol.ts` | AiConversation, AiMessage |
| `solver` | AI question solver with photo upload, Teach me / Give me the answer (§15) | `core.ts` | AiConversation, AiMessage, MediaAsset |
| `ai` | The only path to the model: gateway (no-key, kill switch, budget + once-a-day SUPER_ADMIN alert, quotas), routing config, context builder, metering, response cache, AI marking, transport | `policy.ts`, `pricing.ts`, `intent.ts`, `meter.ts` | AiUsageDaily, AiSpendDaily, AiResponseCache |

**Roles, growth and channels**

| Module | Responsibility | Pure core | Key models |
|---|---|---|---|
| `family` | Parent accounts, link codes with student approval, guardian consent, child views, paying for a child, weekly digest, consented AI-conversation access (§21). Detailed reports (progress, weak areas, results, activity calendar) and the weekly digest follow the CHILD's `parentReports` entitlement; otherwise a basic overview | `codes.ts`; section rule `childOverviewSections` in `analytics/core.ts` | Parent, ParentStudentLink |
| `teaching` | Teacher classes, invitations and membership, assignments, test builder, announcements, marking queue, class/topic/student analytics; student-side class views (§22) | `core.ts`, `validation.ts` | Class, ClassTeacher, ClassMember, Assignment, AssignmentProgress, Announcement |
| `schools` | School admin: teachers, students, roster import with provisioned username accounts, classes, subjects, join requests, reports, seats (§23, §53) | `roster-rows.ts`, `limits.ts` | School, SchoolMember, SchoolSubject, SchoolReport, Invitation |
| `analytics` | DailyMetric computation (§35) and the admin, school, teacher and parent analytics read models | `core.ts`, `metrics.ts` | DailyMetric |
| `billing` | Plans, checkout, provider adapters (Paynow, Stripe, sandbox), webhooks, payment state machine, reconciliation, subscriptions and seats, entitlements, usage allowances (§31, §32) | `transitionPayment` / `transitionSubscription` state machines, `src/lib/billing/entitlements.ts` (`mergeEntitlements`) | Plan, PlanPrice, Subscription, Payment, PaymentEvent, EntitlementGrant, PromoCode |
| `referrals` | Referral codes, sign-up attribution, qualification and rewards (§46) | `core.ts` | ReferralCode, Referral |
| `sharing` | Revocable share cards for results (§46) | `core.ts` | ShareableResult |
| `marketing` | Public-site read models: catalogue, pricing, FAQ, testimonials, public daily question (marked, never stored), countdown, school enquiries (§45, §46) | `*-core.ts` | Plan, FaqItem, Testimonial, DailyQuestion |
| `seo` | Public curriculum page loaders, metadata, JSON-LD, sitemap, robots, static params, public samples (§44) | `routing.ts`, `text.ts` | — |
| `notifications` | In-app notifications, preferences, quiet hours, reminders, weekly summary, announcement delivery (§6, §21, §22) | — | Notification |
| `messaging` | Outbound email/SMS/WhatsApp adapters and OTP templates: console (dev/test capture), Resend (email), Twilio and Africa's Talking (SMS), WhatsApp Cloud. Plain `fetch` adapters, one request per send, typed `MessagingProviderError` (retryable or permanent); **never run against the live services** (mocked-fetch tests only) | `sms.ts` (E.164 / GSM-7), `email-content.ts`, error classifiers | — |
| `whatsapp` | Webhook verification, dedupe, linking, command router, text projection, outbound queue, 24 h window, templates, retention purge (§30, §8) | `commands.ts`, `policy.ts`, `text.ts` | ChannelIdentity, ChannelMessage, ChannelConversationState |
| `auth` | Passwords (Argon2id), OTP, Google OIDC, sessions (cookie + bearer), lockout, device trust, permission map, resource checks (`rbac.ts`), guards | `permissions.ts`, `password-policy.ts`, `session-policy.ts` | User, Session, OAuthAccount, VerificationCode |
| `api` | REST v1 contract registry, `v1Route()`, OpenAPI generation, serialisers, pagination | `contract.ts` | — |
| `uploads` | Streamed upload service behind `POST /api/v1/uploads` | — | MediaAsset |
| `ops` | Readiness probe (`/api/ready`); dead-letter queue for `/admin/jobs` (`dead-letters.ts`) | — | Job |

**Content management (`cms/*`, staff only)**

| Module | Responsibility |
|---|---|
| `content` | Write-time render pipeline (Markdown + directives + KaTeX, sanitised), plain-text projection, and **the shared workflow/publish helper** (`publish.ts`) used by the seed, CMS, teacher test builder and AI-draft approval |
| `cms/curriculum` | Boards, countries, qualifications, levels, year groups, subjects, categories, syllabus versions, topic trees, retagging, exam sessions, grade schemes |
| `cms/lessons`, `cms/questions`, `cms/flashcards`, `cms/assessments`, `cms/study-packs` | Editors for each content type (draft copies of published items, previews) |
| `cms/review` | Review queue, diffs against the last revision, blocking checks, revision history, workflow transitions (four-eyes) |
| `cms/flags` | Content flags (§42) from students, teachers and the system |
| `cms/imports` | CSV / Excel / JSON import of questions, flashcards, lessons and topic outlines as DRAFT, with dry-run reports (`imports.run` job); 90-day file purge (`imports.purgeFiles`, `retention.ts`) |
| `cms/media` | Media library, usage tracking, purge of deleted files |
| `cms/ai-drafts` | AI content generation (§41): estimates, limits, prompts, conversion to DRAFT rows (`ai.generate` job) |
| `cms/announcements` | Platform broadcasts and fan-out |
| `cms/commerce` | Plans, prices, promo codes, subscriptions, payments (admin views, refunds) |
| `cms/schools`, `cms/users` | Admin school, user, student and teacher management; admin dashboard; audit-log viewer |
| `cms/settings` | Typed settings editors, AI settings, AI usage rollup |
| `cms/daily-questions` | Daily-question scheduling (§46): pure selection core (`core.ts`), the nightly `dailyQuestion.fill` job, the admin calendar (view 14 days per scope, override, auto-pick, clear; audited) |
| `cms/faq`, `cms/testimonials` | Marketing CMS (§45): FAQ entries (Markdown answers checked by the content pipeline, publish, reorder) and consented testimonials (consent record, guardian consent for minors, publish, consent withdrawal erases) |

**Infrastructure (`lib`)**: `env` (Zod-validated), `errors`, `logger`, `rate-limit` (presets in `rateLimits`), `audit`,
`cache` (in-process LRU), `jobs` (queue, scheduler), `storage` (local and S3 drivers) + `s3`, `uploads` (sniffing,
re-encoding, policies), `settings`, `api` (`apiRoute`, envelopes, cursors), `db-context` (RLS scopes), `db-safety`
(section D boot checks), `webhook-guard`, `request-id`, `request-path`, `xlsx` (bounded Excel reader), `crypto`.
Isomorphic helpers safe for client bundles live in `src/lib/` (question payload schemas, entitlement contract, dates,
formatting, mastery bands, image `srcset`, PWA constants).

### 3.3 Route map

All routes live in `src/app` and are thin (CLAUDE.md rule 1). `[param]` segments are validated with Zod. *As built
(2026-10-07):* generated from the `page.tsx` / `route.ts` files (208 pages, 52 route handlers). Routes the Phase 1
plan named that do not exist are listed under **Not built** in each group.

#### Public marketing site `(marketing)` and other public routes (§45, §46)

| Route | Content | Data source |
|---|---|---|
| `/` | "Master Your Exams." hero, free tools, how it works, boards, levels, subjects, AI tutor, practice, mock exams, schools, pricing teaser, testimonials (consented only; hidden when none), FAQ, CTA | Catalogue, Plan/PlanPrice, Testimonial, FaqItem |
| `/pricing` | Plans and prices per currency, comparison table | Plan, PlanPrice (never hard-coded, §31) |
| `/schools` | B2B offer and enquiry form (§53) | Plan (SCHOOL), FaqItem |
| `/subjects` | Catalogue by qualification, linking to the SEO pages | Catalogue |
| `/exam-countdown` | Free countdown tool (§17, §46) | ExamSession |
| `/daily`, `/daily/[board]/[qualification]` | Today's question; anonymous answers are marked but not stored | DailyQuestion |
| `/about`, `/faq`, `/legal/terms`, `/legal/privacy`, `/legal/cookies` | Static pages; legal texts are **drafts** pending legal review | FaqItem; legal text in `src/components/marketing/legal/` |
| `/s/[token]` + `opengraph-image` | Share card "I scored 82% in O-Level Mathematics" (no surname, school or photo) | ShareableResult |
| `/r/[code]` | Referral landing: remembers the code, sends to `/register` | ReferralCode |
| `/invite`, `/invite/[token]` | Accept a school invitation (public preview, then sign in) | Invitation |
| `/billing/return` | Where providers send the payer's browser; never fulfils, only polls | Payment |
| `/offline` | Precached offline page (§29) | — |
| `/sitemap.xml`, `/sitemap/[file]`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg`, `/apple-icon.png` | Generated | Catalogue |
| `/dev`, `/dev/ui`, `/dev/shell/*`, `/dev/sandbox-checkout/[paymentId]` | Developer tools and the sandbox payment page; the `dev` layout returns 404 in production | — |
| `/guides/[slug]` | General guides: PUBLIC study guides / articles with no board, qualification or subject (`src/app/(marketing)/guides/[slug]/`, `getGeneralGuidePage`); ISR 1 h | Lesson |

**Not built:** public `/study-packs`, `/study-packs/[slug]` (pack pages are in the student area,
`/app/study-packs`, and search links there since 2026-10-07), `/share/[token]` (built as `/s/[token]`).

#### Public SEO curriculum pages `(public)` (§44)

| Route | Example | Shows | Never shows |
|---|---|---|---|
| `/[board]` | `/zimsec` | Qualifications offered | — |
| `/[board]/[qualification]` | `/zimsec/o-level`, `/cambridge/igcse` | Subjects | — |
| `/[board]/[qualification]/[subject]` | `/zimsec/o-level/mathematics` | Current syllabus outline, topic list, exam sessions, PUBLIC sample questions with the answer behind "Show answer", CTA | Full lessons, mock exams |
| `/[board]/[qualification]/[subject]/[topic]` | `.../mathematics/quadratic-equations` | Subtopics, paraphrased objectives, one interactive sample (PUBLIC first, then FREE, never PREMIUM; marked server-side, answer not in the HTML) | Premium content |
| `/[board]/guides/[slug]`, `/[board]/[qualification]/guides/[slug]`, `/[board]/[qualification]/[subject]/guides/[slug]` | | Lessons whose visibility is explicitly PUBLIC (study guides, articles) | Anything premium |

Board, qualification and subject slugs are data. `RESERVED_TOP_LEVEL_SLUGS` in `src/server/curriculum/core.ts` rejects
board slugs that collide with top-level routes (`app`, `admin`, `api`, `parent`, `teacher`, `school`, `schools`,
`onboarding`, the auth routes, `pricing`, `about`, `faq`, `legal`, `share`, `daily`, `study-packs`, `invite`, `dev`,
`offline`, `s`, `r`, `billing`, `exam-countdown`, `subjects`, `guides`, `search`, `sitemap`, metadata file names, …).

#### Authentication `(auth)` (§33)

| Route | Purpose |
|---|---|
| `/login` | Email or school username + password, or "email me a code" (OTP login). Phone numbers are not sign-in identifiers |
| `/register` | Student (default), parent or teacher. School admins and staff are invited, never self-registered |
| `/verify` | OTP entry for email verification and code sign-in (codes go by email) |
| `/forgot-password`, `/reset-password` | Reset with a code emailed to the account's address (school username accounts: their school, or a staff one-time password) |
| `/change-password` | Forced change for school-provisioned (roster) accounts; voluntary change for everyone else. Emails a security notice |
| `/change-email` | Signed in: change (or add) the account email. Current password + a code emailed to the NEW address; the old address gets a security notice (`src/server/auth/email-change.ts`) |
| `/api/auth/google/start`, `/api/auth/google/callback` | Google OIDC (authorization code + PKCE) |
| `POST /api/auth/logout` | Sign-out for bearer tokens and same-origin forms; web pages normally use the logout Server Action |

#### Onboarding (§5, §52)

`/onboarding` → `/onboarding/[step]`, a resumable wizard (step stored server-side): `country`, `board`, `level`,
`year`, `subjects` (enrolment pins the current published syllabus version, §26), `exam` (target session), `ability`,
`grade` (optional target), `goal` (daily goal and the diagnostic offer), `finish`, then `/app` or `/app/diagnostic`.

#### Student area `/app` (requires STUDENT)

| Route | Spec | Notes |
|---|---|---|
| `/app` | §6, §17 | Dashboard from rollups; countdown; today's target and recommended sessions; honest empty states |
| `/app/subjects`, `/app/subjects/manage`, `/app/subjects/[subjectId]` | §5, §7, §26 | Subject list, add/remove subjects and targets, subject dashboard per enrolment |
| `/app/subjects/[subjectId]/topics/[topicId]` | §2, §11 | Mastery band, lessons, practice, topic tests |
| `/app/lessons/[lessonId]` | §8 | Server-rendered HTML; lesson check; offline cacheable (last 30) |
| `/app/practice`, `/app/practice/[attemptId]`, `/app/practice/[attemptId]/summary` | §10, §11 | Builder (subject, topic, count, difficulty), one question at a time with feedback, summary |
| `/app/daily` | §46 | Daily question with streak credit |
| `/app/diagnostic`, `/app/diagnostic/[attemptId]`, `/app/diagnostic/[attemptId]/report` | §46, §52 | Free diagnostic, then the performance report |
| `/app/exams`, `/app/exams/[assessmentId]` | §12 | Tests and mocks available to the student; instructions, duration, marks |
| `/app/exams/attempt/[attemptId]`, `/app/exams/attempt/[attemptId]/results` | §12, §13 | Exam mode; results with score, %, grade estimate, strengths, weaknesses, recommendations |
| `/app/plan` | §16 | Weekly plan |
| `/app/flashcards`, `/app/flashcards/review`, `/app/flashcards/new`, `/app/flashcards/mine`, `/app/flashcards/[cardId]/edit` | §18 | Decks and due queue, review session, own cards |
| `/app/tutor`, `/app/tutor/new`, `/app/tutor/[conversationId]` | §14 | Conversations (streamed through the REST SSE route) |
| `/app/solver`, `/app/solver/[solveId]` | §15 | Type or photograph a question; "Teach me" or "Give me the answer" |
| `/app/progress` | §6, §11 | Mastery by topic, accuracy trends; "Detailed analytics" (8-week topic trends, accuracy by difficulty, time per question) only with the `advancedAnalytics` entitlement (`src/server/progress/detailed-analytics.ts`) |
| `/app/study-packs`, `/app/study-packs/[slug]` | §24 | Catalogue of PUBLISHED packs for the student's qualification(s) and a pack landing page (scope, counts of published content, what it unlocks, prices); "Buy" goes to `/app/billing/checkout?pack=` (`src/server/study-packs/`) |
| `/app/classes`, `/app/classes/[classId]`, `/app/classes/invite/[token]` | §22 | Classes, work set by teachers, class invitations (replaces the planned `/app/assignments`) |
| `/app/achievements`, `/app/leaderboard` | §19, §20 | Badges and XP; opt-in leaderboard with privacy mode |
| `/app/search`, `GET /app/search/open` | §28 | Global search; `open` redirects a result into the student's pinned syllabus |
| `/app/notifications`, `/app/notifications/[notificationId]`, `/app/notifications/settings`, `/app/notifications/feed` (JSON) | §6, §21, §22 | Inbox, preferences, header bell feed |
| `/app/settings`, `/app/settings/whatsapp`, `GET /app/settings/data/[requestId]` | §20, §30, §39, §43 | Name, display and accessibility preferences, leaderboard privacy, data export and account deletion requests (download route for the export), WhatsApp link code |
| `/app/family`, `/app/family/[linkId]/ai-consent` | §21 | Linked parents, link codes, guardian consent, separate AI-sharing consent |
| `/app/invite` | §46 | Referral code, sharing, invite status |
| `/app/billing`, `/app/billing/checkout`, `/app/billing/result` | §24, §31, §32 | Plan, owned packs, payments; checkout (`?price=` or `?pack=`); status polling page |

**Not built:** `/app/packs` (built as `/app/study-packs`), `/app/assignments` (see `/app/classes`),
`/app/settings/{privacy,parents,account}` (privacy, data export and account deletion are on `/app/settings`, parents
on `/app/family`), `/app/billing/checkout/[paymentId]` (see `/app/billing/result`).

#### Parent `/parent` (§21)

`/parent` (children), `/parent/link`, `/parent/children/[studentId]` (subjects, study time, progress, test results,
weak areas, countdown, activity), `/parent/children/[studentId]/subscribe` (parent pays for the child),
`/parent/children/[studentId]/conversations` (+ `/[conversationId]`: **only** with the platform switch
`privacy.parentAiAccess.enabled` on — default OFF — and the student's separate AI consent; RLS re-checks both),
`/parent/billing`, `/parent/billing/result`, `/parent/settings`.

#### Teacher `/teacher` (§22)

`/teacher`, `/teacher/classes`, `/teacher/classes/new`, `/teacher/classes/[classId]` (class average, then subject,
topic and student drill-down), `.../students`, `.../students/[studentId]`, `.../topics/[topicId]`, `.../assignments`
(+ `/new`, `/[assignmentId]`), `.../announcements`, `/teacher/assignments`, `/teacher/assessments` (+ `/new`,
`/[assessmentId]`: test builder over published bank questions), `/teacher/announcements`, `/teacher/review` (+
`/[attemptId]`: marking queue for written, manual and low-confidence AI-marked answers); `/teacher/marking` and
`/teacher/marking/[attemptId]` are aliases of the review queue.

#### School `/school` (§23)

`/school` (average score by subject, pass rate, topic performance, engagement, teacher outcomes, exam readiness, seat
usage), `/school/teachers`, `/school/students` (+ `/[userId]`, `/import` with provisioned username accounts,
`/import/template`), `/school/classes` (+ `/[classId]`), `/school/subjects`, `/school/reports` (CSV; download route
`/school/reports/[reportId]/download`), `/school/billing` (seats). **Not built:** `/school/settings`, PDF reports.

#### Admin CMS `/admin` (§36, §25, §41, §42)

| §36 section | Routes | Permission (see §5.2) |
|---|---|---|
| Dashboard | `/admin` | staff (content staff see a content dashboard) |
| Users, Students, Teachers | `/admin/users`, `/admin/students`, `/admin/teachers` (+ `/[id]`) | `users.manage` (student record views audited) |
| Schools | `/admin/schools` (+ `/new`, `/[id]`, `/[id]/analytics`) | `school.manage` |
| Boards | `/admin/boards` (+ `/new`, `/[id]`, `/countries`, `/countries/new`, `/countries/[id]`) | `curriculum.manage` |
| Qualifications | `/admin/qualifications` (+ `/new`, `/[id]`, `/levels`, `/year-groups`) | `curriculum.manage` |
| Subjects | `/admin/subjects` (+ `/new`, `/[id]`, `/categories`) | `curriculum.manage` |
| Syllabuses | `/admin/syllabuses` (+ `/new`, `/[id]`, `/[id]/topics` tree editor, `/[id]/retag`) | `curriculum.manage` (CONTENT_EDITOR holds a restricted scope) |
| Topics | `/admin/topics` (search across versions) | `curriculum.manage` |
| Lessons, Questions, (Flashcards) | `/admin/lessons`, `/admin/questions`, `/admin/flashcards` (+ `/new`, `/[id]`; flashcards `/bulk`) | `content.draft` |
| Exams | `/admin/exams` (+ `/new`, `/[id]`, `/[id]/preview`), `/admin/exam-sessions`, `/admin/grade-schemes` | `content.draft` / `curriculum.manage` |
| Study Packs | `/admin/study-packs` (+ `/new`, `/[id]`) | `content.draft` (prices `billing.manage`) |
| (Workflow) | `/admin/review` (+ `/[type]/[id]`, `/revisions`, `/revisions/[revision]`), `/admin/flags` (+ `/[id]`), `/admin/imports` (+ `/new`, `/[id]`, `/[id]/report`, `/templates/[entity]/[file]`), `/admin/media` (+ `/[id]`) | review `content.review`; flags, media `content.draft`; imports `imports.run` |
| AI | `/admin/ai`, `/admin/ai/generate`, `/admin/ai/jobs/[id]`, `/admin/ai/usage`, `/admin/ai/settings` | `/admin/ai`, generate, jobs: `ai.generate`; usage, settings: `ai.admin` (SUPER_ADMIN edits) |
| Subscriptions | `/admin/subscriptions` (+ `/[id]`), `/admin/plans` (+ `/[id]`), `/admin/promo-codes` (+ `/new`, `/[id]`) | `billing.manage` |
| Payments | `/admin/payments` (+ `/[id]`) | `payments.view` / `payments.refund` |
| Analytics | `/admin/analytics` | `analytics.platform` |
| Notifications | `/admin/notifications` (+ `/new`, `/[id]`) | `class.manage` (platform broadcasts) |
| Settings | `/admin/settings` (incl. `fx.rates` for USD-equivalent revenue), `/admin/audit` | `settings.manage`; audit `audit.view` |
| Operations | `/admin/jobs` (dead-letter queue: DEAD / FAILED jobs, retry with fresh attempts, cancel; audited) | ADMIN / SUPER_ADMIN role |
| (Site content) | `/admin/daily-questions` (+ `/choose`: pick a question for one day and scope), `/admin/faq` (+ `/new`, `/[id]`), `/admin/testimonials` (+ `/new`, `/[id]`) | `content.publish` |

**Not built:** `/admin/sources` (sources are chosen on each item; no source library page). The planned `/admin/site` became the three site-content sections above
(2026-10-07).

#### REST API `/api/v1` (mobile, WhatsApp-adjacent integrations, offline sync)

Conventions: bearer token (`Authorization: Bearer dz_...`) or same-origin session cookie; JSON envelopes
`{ data, nextCursor }` and `{ error: { code, message, fieldErrors? } }`; cursor pagination `?cursor=&limit=`
(default 20, max 100); idempotency via the `Idempotency-Key` header (or body field) on POSTs that create attempts or
reviews; OpenAPI document generated from Zod at `/api/v1/openapi.json`. Breaking changes go to `/api/v2`. The client
contract (auth, limits, every endpoint) is **docs/API.md**; the registry is `src/server/api/contract.ts`.

| Resource | Endpoints (implemented) |
|---|---|
| Auth | `POST /auth/token` (password → bearer token, or 202 + code flow), `POST /auth/otp/request`, `POST /auth/otp/verify`, `DELETE /auth/token` |
| Me | `GET /me` |
| Catalogue | `GET /catalogue/boards`, `/catalogue/qualifications?boardId=`, `/catalogue/subjects?qualificationId=` (signed-in, `private, max-age=300`; see §3.4) |
| Enrolments | `GET /enrollments`, `POST /enrollments` |
| Progress and plan | `GET /dashboard`, `GET /progress`, `GET /subjects/{id}/topics`, `GET /study-plan/today` |
| Lessons | `GET /lessons/{id}` |
| Practice | `POST /practice/sessions`, `GET /practice/sessions/{id}`, `POST /practice/sessions/{id}/answers`, `/hints`, `/self-assessment`, `/end`, `GET /practice/sessions/{id}/summary` |
| Daily question | `GET /daily-question`, `POST /daily-question/start`, `POST /daily-question/answer` |
| Flashcards | `GET /flashcards/due`, `POST /flashcards/{id}/review`, `POST /flashcards/reviews` (batch, for offline sync) |
| AI tutor | `GET` / `POST /tutor/conversations`, `POST /tutor/conversations/{conversationId}/messages` (SSE stream) |
| Search | `GET /search/suggest?q=` |
| Uploads | `POST /uploads?purpose=` (multipart, streamed size limits) |
| Notifications | `GET /notifications`, `POST /notifications/read` |
| Planned (not built) | `PATCH /me`; exam / test attempts (`GET /assessments`, attempt start / answer / submit); `GET /progress/subjects/{id}`; billing (`GET /plans`, `POST /checkout`, `GET /payments/{id}`); `POST /ai/solve` |

#### Webhooks and operations

| Route | Purpose |
|---|---|
| `POST /api/webhooks/payments/[provider]` | `paynow`, `stripe`, `sandbox`; signature or hash verified, idempotent (§7) |
| `GET` / `POST /api/webhooks/whatsapp` | Meta verification handshake and inbound messages (§8). Keep its query string (`hub.verify_token`) out of proxy access logs |
| `GET /api/health` | Liveness (no database) |
| `GET /api/ready` | Readiness (database round trip, shipped migrations applied, section D checks in production) |
| `GET /api/media/[...key]` | Serves stored media: PUBLIC assets immutable and CDN-cacheable; authenticated assets per signed-in user |

Both webhook routes first apply a per-(endpoint, client IP) receipt limit (`rateLimits.webhookReceipt`, 429 +
`Retry-After`) before reading the body or verifying a signature (`src/server/lib/webhook-guard.ts`).

**Not built:** `POST /api/internal/revalidate` (no worker-to-web cache invalidation; public pages use time-based
revalidation, §3.4).

### 3.4 Rendering strategy

*As built (2026-10-07):* **Cache Components are not enabled** (no `cacheComponents`, no `'use cache'`, no
`cacheTag` / `revalidateTag` anywhere). Public pages are static or ISR with segment-level `export const revalidate`
(marketing and SEO pages 1 h, `/daily` 5 min, `/about` and `/legal/*` 1 day); a few Server Actions call
`revalidatePath` for the user's own pages. Consequence: a CMS publish, price change or correction reaches public pages
only when their revalidate window expires (up to 1 h), and there is no worker-to-web invalidation. The table below is
the original plan; the "Invalidation" column is **not built** except where noted.

The original plan: Next 16 Cache Components (`cacheComponents: true`, `'use cache'` + `cacheTag` / `cacheLife`),
dynamic by default, explicit caching where data is shared.

| Area | Strategy | `Cache-Control` | Invalidation |
|---|---|---|---|
| Marketing | Static prerender; data via `'use cache'` with tags `site`, `plans` | `public`, CDN `s-maxage` | `revalidateTag` / `updateTag` when CMS content or prices change |
| SEO curriculum | `generateStaticParams` for every published board, qualification and subject; topic pages generated on first request, then cached | `public` | Tag per subject (`subject:{id}`) on publish or archive |
| `/study-packs/*` | Static + tags | `public` | Tag per pack |
| `/daily`, `/share/[token]` | Cached fragment + small dynamic island | `public`, short TTL | Daily rollover / token revoke |
| Auth, onboarding | Dynamic | `private, no-store` | — |
| `/app`, `/parent`, `/teacher`, `/school` | Dynamic RSC per request. Shared catalogue fragments (topic tree, lesson HTML) use `'use cache'`; per-user data reads rollups uncached | `private, no-store` | Catalogue tags on publish |
| Exam mode | Server-rendered shell + one client island (timer, navigation, autosave) | `private, no-store` | — |
| Admin | Dynamic, uncached | `private, no-store` | — |
| `/api/v1` | Dynamic JSON. Catalogue endpoints (`/catalogue/*`) require a signed-in user and answer `private, max-age=300` | per endpoint | — |

**Decision (catalogue endpoints):** `/api/v1/catalogue/*` stays authenticated (any role, per-user `publicApi` limit)
rather than public and CDN-cacheable. A public, anonymous endpoint would allow unbounded enumeration of the catalogue
from many IPs with only the database-backed per-IP limiter in the way. Revisit once a CDN / edge (WAF) rate limit sits
in front of `/api/v1`: then the catalogue can become public with `public, s-maxage` and a per-IP `publicCatalogue`
preset. Anonymous visitors already get the catalogue from the static SEO curriculum pages.

Planned, **not built:** worker-originated changes (scheduled publish, imports) would call `/api/internal/revalidate`
because `revalidateTag` only runs inside the Next runtime.

### 3.5 Server Actions vs REST

| Need | Mechanism | Why |
|---|---|---|
| Web reads | Server Components call services directly | No HTTP hop, no client fetching library |
| Web mutations (forms, answers, CMS edits, enrolment) | Server Actions in colocated `actions.ts` returning `ActionResult<T>` | Built-in Origin check, progressive enhancement, typed |
| AI streaming (web and mobile) | Route handler with SSE (`/api/v1/tutor/conversations/{id}/messages`) | One streaming implementation for every client; easy cancellation |
| File uploads | Route handler `POST /api/v1/uploads` | Streamed size limits; Server Action bodies default to 1 MB |
| Offline sync (flashcard reviews, queued answers) | REST batch endpoints with idempotency keys | Callable from a service worker |
| Polling (payment status, AI marking status) | Small `GET` route handlers or `router.refresh()` | Cheap, cacheable per user |
| Native app, integrations | `/api/v1` with bearer tokens | Stable, versioned contract |
| Provider callbacks | `/api/webhooks/*` | Signature-verified, no cookies |
| CSV exports (school reports, import templates, data exports) | `GET` route handlers serving private stored files | Large responses (PDF export is not built) |

### 3.6 One set of services for every channel (§30)

| Channel | Entry point | Actor | Channel-specific code |
|---|---|---|---|
| Web | Pages and Server Actions | `user` from cookie session | Components only |
| Native app / integrations | `/api/v1` | `user` from bearer session | JSON serialisation |
| WhatsApp | `/api/webhooks/whatsapp` then the `whatsapp.process` job | `user` from linked `ChannelIdentity` | Command parsing, text projection, 24h window (§8) |
| Worker | `src/worker` job handlers | `system` (or the job's user for user-scoped work) | Scheduling only |

Example: "Give me today's study question" on WhatsApp starts and answers a `DAILY_QUESTION` attempt through the attempt
engine (`src/server/attempts`: `startAttempt`, then the answer service), the same engine the web `/app/daily` page and
`POST /api/v1/daily-question/*` use. Only formatting differs.

### 3.7 Background jobs

**Mechanism (Decided, built in `src/server/lib/jobs.ts` and `src/worker/`).** A `Job` table in Postgres plus the
worker process.

- **Enqueue** inside the same transaction as the domain write (`enqueue(type, payload, { client: tx, dedupeKey })`):
  a transactional outbox for free. A `dedupeKey` is unique while the job is PENDING (partial unique index), so a
  duplicate enqueue is a no-op while a follow-up can still be queued while one runs.
- **Claim** with one tagged `$queryRaw` `UPDATE … WHERE id IN (SELECT … FOR UPDATE SKIP LOCKED) RETURNING …`.
- **Wake-up** with `LISTEN job_enqueued` (a trigger fires on PENDING inserts) on a direct, non-pooled connection;
  polling is the fallback.
- **Retries** with backoff `min(10 s · 2^attempts, 1 h)` ±10 % jitter; after `maxAttempts` (default 5) the job is DEAD;
  invalid payloads and `PermanentJobError` are FAILED at once. Operators see DEAD / FAILED jobs (last error, payload,
  attempts) at `/admin/jobs` (ADMIN / SUPER_ADMIN; `src/server/ops/dead-letters.ts`) and retry them with a fresh attempt
  budget or cancel them, each audited (`job.retry` / `job.cancel`) in the same transaction. RUNNING jobs past the
  5-minute lease are reclaimed; the worker heartbeats long jobs.
- **Scheduler**: each tick, one worker wins `pg_try_advisory_xact_lock` and enqueues due recurring jobs with the period
  dedupe key `cron:<name>:<periodStart>`, so a missed tick or a second worker never double-runs a period. Periods are
  aligned to the UTC epoch plus an offset (Africa/Harare = UTC+2).
- **Queues** isolate workloads so an AI backlog never delays payments: `payments`, `notifications`, `ai`, `rollups`,
  `search`, `imports`, `default` (`JOB_QUEUES`). Worker lanes claim round-robin across queues, payments first.
- Handlers are idempotent and payloads carry ids only. Succeeded jobs are purged after 7 days, failed ones after 30.
- Registration: each module exports `register<Domain>Jobs()`; `src/worker/handlers.ts` calls them all
  (`registerAllJobs`). The table below is generated from that registry (2026-10-07: 46 job types, 30 schedules). Times
  are CAT.

| Job type | Queue | Max attempts | Schedule / trigger | What it does |
|---|---|---|---|---|
| `exams.autoSubmit` | default | 5 | At each attempt's deadline + grace; sweep every 5 min (`exams.autoSubmitSweep`) | Close and mark timed-out attempts (server-authoritative timer) |
| `ai.mark` | ai | 5 | Enqueued by the attempt engine for AI-assisted answers | AI-mark PENDING answers; self-assessment when AI is not configured; low confidence → NEEDS_REVIEW |
| `ai.generate` | ai | 3 | Admin request (`/admin/ai/generate`) | CMS AI drafts, always DRAFT + `aiGenerated` |
| `ai.cache.purge` | default | 3 | Daily 03:00 | Remove expired / invalidated AI response-cache rows |
| `ai.budgetAlert` | notifications | 5 | First budget refusal of a platform day (gateway `onBudgetExceeded` hook; never scheduled) | One in-app notification + one email per ACTIVE SUPER_ADMIN per day (`src/server/ai/budget-alert.ts`) |
| `messaging.smsBudgetAlert` | notifications | 5 | First refusal of a Harare day by the platform SMS cap (`messaging.smsBudget`; never scheduled) | One in-app notification + one email per ACTIVE SUPER_ADMIN per day (`src/server/messaging/sms-budget.ts`) |
| `ai.modelUsageRollup` | rollups | 3 | Daily 01:30 | Per-model AI usage rollup for `/admin/ai/usage` |
| `analytics.dailyMetrics` | rollups | 3 | Daily 01:00 (previous Harare day) | DailyMetric (§35) |
| `analytics.backfillMetrics` | rollups | 2 | Admin request | Recompute DailyMetric for a date range |
| `studyplan.adapt` | default | 3 | After a diagnostic or mock; nightly 02:30 (`studyplan.adaptNightly`) | Regenerate upcoming plan items (§16) |
| `leaderboards.snapshot` | rollups | 3 | Hourly at :20 | Upsert changed LeaderboardEntry scores (§20) |
| `leaderboards.weeklyClose` | rollups | 5 | Monday 04:00 | Close the week and write ranks |
| `search.reindexEntity` | search | 5 | Publish / archive flows | Upsert or delete one SearchDocument |
| `search.reindexAll` | search | 2 | Admin request; weekly Sunday 03:00 (`search.reindexAll.weekly`) | Full rebuild (rewrites only changed documents) |
| `imports.run` | imports | 3 | Admin upload | Validate, dry-run report, commit rows as DRAFT |
| `imports.purgeFiles` | default | 3 | Daily 04:25 | Delete uploaded import files 90 days after upload (row kept, DELETED; in-flight imports skipped; `src/server/cms/imports/retention.ts`) |
| `media.purgeDeleted` | default | 3 | Daily 03:00 | Delete stored objects of soft-deleted library files |
| `announcements.fanout` | notifications | 5 | Platform broadcast publish | Fan out to recipients in chunks |
| `notifications.send` | notifications | 5 | Per message | Deliver through the messaging adapters |
| `notifications.dailyReminders` | notifications | 3 | Every 15 min (each user's local reminder time) | Study reminders, respecting quiet hours and opt-outs |
| `notifications.weeklySummary` | notifications | 3 | Sunday 17:00 | Weekly student summary |
| `notifications.announcementDelivery` | notifications | 5 | Teacher / school announcement | Deliver one announcement |
| `notifications.announcementSweep` | notifications | 3 | Every 10 min | Catch undelivered announcements |
| `family.parentDigest` | notifications | 3 | Sunday 18:00 | Weekly parent progress digest (§21) |
| `family.expireLinkInvites` | default | 3 | Hourly | Expire unused parent link invitations |
| `teaching.assignmentPublished` | notifications | 5 | Assignment publish | Notify the class |
| `teaching.closeDueAssignments` | default | 3 | Every 15 min | Close assignments past their due date |
| `schools.generateReport` | default | 3 | School admin request | Build a CSV report (private, expiring) |
| `schools.expireReports` | default | 3 | Daily 03:30 | Expire old report files |
| `referrals.qualify` | default | 5 | Referred user's qualifying event | Qualify a referral and grant rewards (§46) |
| `referrals.sweep` | default | 3 | Every 6 h | Catch missed qualifications |
| `sharing.purgeExpired` | default | 3 | Daily 03:30 | Delete expired share cards |
| `payments.reconcile` | payments | 3 | Every 10 min | Poll PENDING payments; expire stale ones (§7.4) |
| `billing.lifecycle` | payments | 3 | Hourly at :20 | Expire subscriptions past period + grace, seats |
| `whatsapp.process` | notifications | 3 | Webhook receipt | Handle one inbound WhatsApp message (§8) |
| `whatsapp.send` | notifications | 5 | Outbound message | Send through the Cloud API with retry |
| `whatsapp.purge` | default | 3 | Daily 03:45 | WhatsApp retention (bodies 90 days, idle unlinked identities) |
| `accounts.exportData` | default | 3 | Student request (`/app/settings`) | Build the JSON data export into private storage |
| `accounts.privacySweep` | default | 3 | Hourly at :37 | Carry out deletions whose 14-day grace has ended (`accounts.deleteUser` logic in `src/server/accounts/deletion.ts`); remove expired export files |
| `accounts.retentionPurge` | default | 3 | Daily 04:10 | Solver photos older than 30 days; AI message text older than 12 months |
| `dailyQuestion.fill` | default | 3 | Daily 22:30 | Tomorrow's daily question (and today's if missing) per active subject from the automatic pool (`src/server/cms/daily-questions/`); never replaces an existing day |
| `auth.purgeSessions` | default | 3 | Daily 03:30 | Delete sessions 30 days after expiry |
| `auth.purgeVerificationCodes` | default | 3 | Daily 03:35 | Delete expired OTP codes |
| `maintenance.purgeRateLimitBuckets` | default | 3 | Hourly | Delete expired rate-limit buckets |
| `maintenance.purgeJobs` | default | 3 | Daily 03:00 | Delete finished jobs (7 / 30 days) |
| `maintenance.purgeNotifications` | default | 3 | Daily 03:15 | Delete notifications past `notifications.retention` |

**Planned in Phase 1, not built:** `progress.rollupSubject` (`refreshSubjectProgress` runs synchronously in the
answer and finalize paths instead), `progress.nightlyReconcile`, `questions.statsRollup` (QuestionStats counters are
updated per answer), `gamification.streakMaintenance` (streaks are evaluated when activity is recorded and read),
`content.rerender` (stale stored HTML is detected by `contentHash` and re-rendered on read),
`practice.dailyQuestionFill` (built on 2026-10-07 as `dailyQuestion.fill`, above), a separate `accounts.deleteUser` job (deletion runs inside `accounts.privacySweep`) and a licence-expiry
archiver. The purge of old audit entries (2 years; 6 for payment entities) is deliberately NOT a worker job: the app
role cannot delete audit rows, so it is a scheduled ops task run as `app_maintenance`
(`scripts/maintenance/purge-audit.ts`, docs/DEPLOYMENT.md §4 "Scheduled operations").

### 3.8 Caching layers

| Layer | Holds | Freshness / invalidation | Notes |
|---|---|---|---|
| Browser | Hashed `/_next/static/*` (immutable, 1 year); SW caches (§3.13) | Content hash | Big win on repeat visits over slow links |
| CDN | Static assets, prerendered/ISR public pages (`s-maxage=3600, stale-while-revalidate`), public media via `/api/media` (immutable) | `s-maxage` + `stale-while-revalidate` | Private pages are never CDN-cached. *Not configured yet* (no CDN in front, `docs/DEPLOYMENT.md` §1) |
| Next server cache | ISR output of public pages (segment `revalidate`, §3.4) | Time-based only. *Not built:* `'use cache'`, `cacheTag`, tag revalidation on publish | Per instance. Before running more than one web node, add a shared `cacheHandler` (or accept per-node ISR staleness) |
| In-process LRU (`lib/cache`) | Settings (60 s), catalogue lists, plan feature config, entitlements per user, grade schemes, flashcard scheduler setting | TTL + explicit delete on the writing instance | Per process; other instances see writes after the TTL |
| Write-time rendering | Lesson, question and flashcard HTML stored next to the source with `renderVersion` / `contentHash` | Re-rendered on save; stale HTML (pipeline or KaTeX version changed) is re-rendered on read (`src/server/content/service.ts`). *No `content.rerender` job* | Reads normally never pay for Markdown/KaTeX rendering |
| Postgres rollups | TopicMastery, SubjectProgress, LearnerStats, DailyActivity, QuestionStats, LeaderboardEntry, DailyMetric | Synchronous (mastery) or jobs (§3.7) | Dashboards read only rollups, never raw attempts |
| AI response cache | Generic explanations (`AiResponseCache`) | Key includes model + prompt version; TTL 30 days | §6.3 |
| Redis (later) | Shared Next cache, rate limits, hot leaderboards | — | Trigger in §2.2 |

### 3.9 Search (§28)

- **Index:** `SearchDocument`, one denormalised row per searchable entity (lesson, question, flashcard, assessment
  incl. mock exams, study pack, topic, subject) with board, qualification, subject, topic and syllabus ids, status,
  visibility (public / free / premium), title, plain-text body, and a per-row text-search config (`english` for most
  content; `simple` for Shona, Ndebele and French, which have no Postgres stemmer).
- **Columns and indexes (raw SQL):** generated `tsvector` (title A, keywords + subtitle B, body C; each in the row's
  config, title and keywords also in `simple`), GIN index on it, GIN `gin_trgm_ops` index on title, GIN on
  `subjectIds` / `topicIds` / `syllabusIds`.
- **Query** (`src/server/search/query.ts`, *as built*): query understanding turns board / level / qualification /
  subject words and syllabus codes into removable filter chips (re-run without them when they produce nothing). Three
  matchers are OR-ed and **blended into one score** (not a fallback chain): `websearch_to_tsquery` in the `english` and
  `simple` configs (`ts_rank_cd`), a prefix match on the last word, and `pg_trgm` word similarity against the title
  (typo tolerance) — plus exact-title, enrolled-subject and editorial boosts. Keyset pagination on (score, id).
  Text searches set `enable_seqscan = off` for their own transaction (measured: the planner otherwise chose a full scan
  that ran the similarity check on every row; `scripts/perf/README.md`).
- **Visibility:** only PUBLISHED **platform** content is indexed (a CHECK backs this up). Locked results (FREE for
  signed-out viewers, PREMIUM without the entitlement) are returned as teasers (title, subtitle, type, path); their
  body is never selected. Premium bodies still contribute to *matching*, so a locked item's existence can be inferred
  from body words (open decision, [STATUS.md](STATUS.md)).
- **Freshness:** `search.reindexEntity` on publish / archive, `search.reindexAll` on demand and weekly (Sunday 03:00
  CAT); the demo seed ends with a full reindex.
- **Result URLs:** every `SearchDocument.path` pattern and every result href resolves to a route under `src/app`
  (`src/server/search/routes.test.ts` matches them against the file-system route tree like the App Router does,
  including the public `[board]` slug guards). STUDY_PACK documents point at `/app/study-packs/{slug}` and general
  guides at `/guides/{slug}` (both built 2026-10-07); documents indexed earlier carry `/study-packs/{slug}` until the
  next `search.reindexAll` (weekly, or run it once after deploying), and `resultHref` rewrites that legacy path.

### 3.10 Content pipeline (§8, §25, §39)

```
author Markdown (CMS editor with live preview)
  -> remark-parse -> remark-gfm (tables) -> remark-math ($..$, $$..$$) -> remark-directive
  -> block transformer (src/server/content/remark-content.ts: WHITELIST ONLY; an unknown block keeps its content
     without a box and produces an editor WARNING, not an error)
  -> remark-rehype (raw HTML dropped, except <br> and comments)
  -> rehype-sanitize (custom schema: allowed tags, classes)
  -> in-house rehype-math (src/server/content/rehype-math.ts: KaTeX 0.19 directly, trust: false, HTML + MathML for
     screen readers, mhchem \ce{} for chemistry); rehype-katex is NOT used (it pins KaTeX 0.16)
  -> rehype-stringify
  -> stored: body (source) + bodyHtml + renderVersion + contentHash   [at SAVE time]
  -> plain-text projection for SearchDocument and WhatsApp (LaTeX to readable Unicode where possible)
```

*As built:* the authoritative vocabulary is the renderer whitelist (`CONTENT_BLOCK_TYPES`), documented for authors in
[CONTENT_AUTHORING.md](CONTENT_AUTHORING.md) §4. The Phase 1 names (`key-fact`, `worked-example`, `common-mistake`,
`::media`, `::question`) were not adopted.

| Block | Renders as |
|---|---|
| `:::definition{term="…"}`, `:::keyfact`, `:::formula{name="…"}` | Labelled callouts (§8 key definitions, facts, formulas) |
| `:::example`, `:::worked-solution[…]` | Example; step-by-step worked solution |
| `:::mistake`, `:::exam-tip`, `:::note`, `:::summary` | Callouts (§8 common mistakes, exam tips) and recap |
| `![alt](asset:<mediaAssetId> "caption")` | Image from the media library; alt text required (§43); external image URLs are replaced by a note |
| Practice questions | Linked to the lesson through `LessonQuestion` rows and run as a lesson check (`src/server/lessons/check.ts`), not embedded inline |

- Sanitising happens **before** KaTeX so author input can never inject markup, and KaTeX runs with `trust: false`.
- Invalid LaTeX shows the error in the editor preview (see CONTENT_AUTHORING.md §7 for what blocks and what warns).
- KaTeX CSS (~23 KB) and fonts are self-hosted and loaded only on routes that contain maths.
- Only `RichContent` (`src/components/content/RichContent.tsx`) renders content HTML, and only pipeline output (§5.7).
- AI output and user-written text (tutor chat, answers, announcements) use a stricter profile of the same pipeline:
  no media, no embeds, no raw HTML.
- Diagrams and graphs are MediaAssets (SVG or raster) in the MVP; no client-side charting in lessons.

### 3.11 File uploads

| Upload | Who | Types (magic-byte sniffed) | Size cap | Storage | Retention |
|---|---|---|---|---|---|
| Content media | CONTENT_EDITOR+ | PNG, JPEG, WebP, AVIF; SVG for editors only (served via `<img>`, never inline) | 10 MB | Public-read bucket behind CDN, random keys | Content lifetime |
| Solver images (§15) | STUDENT | PNG, JPEG, WebP, HEIC (converted) | 5 MB | Private bucket, signed URLs (5 min) | 30 days |
| Imports (§25) | CONTENT_EDITOR+, SCHOOL_ADMIN (rosters) | CSV, XLSX, JSON | 20 MB | Private | 90 days |
| School logos | SCHOOL_ADMIN | PNG, JPEG, WebP | 1 MB | Public-read | School lifetime |

- Pipeline: streamed size check, magic-byte sniff (never trust extension or `Content-Type`), images re-encoded with
  sharp (strips EXIF and GPS, which matters for minors), dimension limits (max 4,000 px; solver images downscaled to
  1,280 px long edge), random object keys, rate limit per user.
- Driver interface in `lib/storage`: `local` driver (`./storage`, dev) and an S3-compatible driver
  (`src/server/lib/s3.ts`, SigV4 over `fetch`, no SDK) for staging and production. *As built:* ONE private bucket;
  every file, public or not, is served by `GET /api/media/[...key]` (public assets with immutable caching for the CDN,
  others per signed-in user) instead of a public-read bucket and signed URLs. The S3 driver has been tested against
  AWS's published signature examples and a fake endpoint, **not against a real bucket**.
- *As built:* upload policies live in `UPLOAD_POLICIES` (`src/server/lib/uploads.ts`): content images and diagrams
  10 MB, avatars and solver photos 5 MB, imports and report exports 20 MB, school logos 1 MB. Solver photos accept PNG,
  JPEG and WebP; HEIC is refused (not converted). Solver photos are purged after 30 days by `accounts.retentionPurge`;
  import files after 90 days by `imports.purgeFiles` (files of imports still validating / importing are skipped).

### 3.12 Time and locale

- Day boundaries (streaks, daily targets, daily question, metrics) use the user's time zone, default `Africa/Harare`
  (CAT, UTC+2, no DST). The time zone is stored per user for future countries (§53).
- UI copy is English at launch; content language is data per item (English, Shona, Ndebele, French). A UI translation
  layer can be added later without touching services.

### 3.13 Offline and PWA strategy (§29)

*As built (details and the never-cache rules: [OFFLINE.md](OFFLINE.md)):*

| Capability | Offline? | Mechanism |
|---|---|---|
| App shell (CSS, JS, fonts incl. KaTeX, icons, offline page) | Yes | `public/sw.js` + pure routing rules `public/sw-routing.mjs`; precache on install; hashed assets cache-first |
| Recently viewed lessons (last 30) | Yes (text and maths; lesson images need a connection) | Network first with a 4 s timeout when a saved copy exists; bound to the signed-in viewer; cleared on sign-out and when another student signs in on the same phone |
| Flashcard review | Connectivity drops only | The open review session keeps unsent ratings in an in-memory outbox with client review ids and retries with backoff; `POST /api/v1/flashcards/reviews` accepts idempotent batches. *Not built:* a due deck stored on the device (IndexedDB) for starting a review offline |
| Exam mode | Partial | Answers autosave locally first (outbox mirrored to `localStorage` for the current attempt), then sync with client versions. Timer is server-authoritative; changes made before the deadline sync within the late-sync grace window |
| Practice answers | No | *Not built:* the planned IndexedDB answer outbox; `experimental.useOffline` is not enabled |
| Offline banner | Yes | `src/components/pwa/ConnectivityBanner.tsx` |
| Web App Manifest, installability | Yes | `src/app/manifest.ts` |

**Not available offline:** practice, tests and mocks (answer keys never ship to the device), AI tutor and solver,
search, lessons not previously opened, leaderboards, payments, sign-in, parent, teacher, school and admin areas.

**Shared phones are common.** Sign-out clears saved lessons (`ClearOfflineDataOnSubmit`), and the service worker only
shows a saved lesson to the viewer who saved it (`OfflineViewerSync`).

### 3.14 Feature flags (owner decision 2026-10-07)

The owner switched five paid or external services **off** until further notice: AI (tutor, solver, AI marking, CMS AI
drafts), the WhatsApp channel, OPTIONAL email, SMS and Stripe. They are dormant, not deleted: one switch each turns them
back on without a deploy. While a flag is off, **no code path may call that provider for it** (cost must be zero).

Accounts are **email-based** (owner decision 2026-10-07, "email auth and not SMS"): ACCOUNT email — verification and
sign-in codes, password resets, security notices and invitations — is always sent and is deliberately **not** behind a
flag, because signing in depends on it. `features.email` covers only optional email (notification digests,
announcements, receipts, reminders, staff alerts).

| Piece | Where |
|---|---|
| Setting `features` = `{ ai, whatsapp, email, sms, stripe }`, every flag defaults to `false` (a key missing from a stored row reads as off) | `SETTING_DEFINITIONS` in `src/server/lib/settings.ts`; seeded all-off in every environment by `prisma/seed/data/settings-extra.ts` (the seed creates a missing row, and adds flags missing from an existing row as off, keeping stored values) |
| Isomorphic names, labels and the `FeatureFlags` type | `src/lib/features.ts` (no runtime dependencies; client components import types only) |
| Server reads | `src/server/features.ts`: `getFeatures()`, `isFeatureEnabled(name)` (shared settings cache: 60 s, invalidated at once on the saving instance), and the guards `notFoundUnlessFeature(name)` (pages), `requireFeature(name)` (Server Actions / services, AppError `NOT_FOUND`), `withFeature(name, handler)` (route handlers, 404 envelope before auth or parsing) |
| Editing | `/admin/settings` → "Optional features" (SUPER_ADMIN `settings.manage`, password step-up, `setting.update` audit entry); saving also revalidates the public pages whose copy depends on the flags |

Rules:

- **Fail closed.** A missing row, an invalid value (only a literal `true` switches a flag on) or a failed read means
  OFF.
- **Clients never fetch flags.** Layouts and pages read them on the server and pass booleans as props (`studentNavFor`,
  `adminNavFor({ features })`, `AskTutorLink enabled`, `FeedbackPanel askTutor`, `Hero aiEnabled`…).
- **A switched-off feature looks absent**: its routes return 404, its menu entries are hidden and the public site makes
  no claim about it (marketing home, pricing, about, schools, FAQ category `ai`, plan feature lists and the billing
  "what's included" lines). Entitlement keys for the feature stay in the plans and are simply not shown.
- **Defense in depth for AI.** The gateway (`createAiGateway({ featureEnabled })`, wired in `src/server/ai/index.ts`)
  refuses EVERY call with `AI_UNAVAILABLE` reason `"feature_off"` before it touches the transport, quota or meter
  (§6.3), so a forgotten entry point, an old job or the WhatsApp "explain" path still cannot reach the provider.
- **AI marking while AI is off** (§6.5): answers are routed at answer time (`routeWithoutAiMarking`,
  `src/server/attempts/policy.ts`), so no `ai.mark` job is ever queued: essays, extended and short written answers in a
  student's own work stay pending for self-assessment against the mark scheme; calculations, structured questions and
  assignment work go to the teacher / reviewer queue with their rule-based provisional mark. A leftover `ai.mark` job
  routes its answers the same way without calling the model (`isAiOff` in `src/server/ai/marking.ts`); a leftover CMS
  generation job fails permanently.
- **Messaging switches** (`src/server/messaging/send.ts`): a message marked `transactional` on the EMAIL channel (codes,
  resets, security notices, invitations: `sendOtpMessage`, `sendToContact`, `src/server/auth/notices.ts`) is always
  sent. Everything else is optional and goes only while its channel's flag is on: optional email (`features.email`),
  SMS (`features.sms`; no exception for codes) and WhatsApp (`features.whatsapp`). A switched-off send is a logged
  no-op (`switchedOff: true`) that never resolves an adapter. Notifications (`notifications.send`, digests,
  announcements, reminders) are optional: with the defaults they stay in the in-app inbox, and the notification
  settings page offers no external channel.
- **SMS off** (`features.sms`): no SMS provider is called; a phone number is optional profile data (never a sign-in
  identifier, never verified, never sent anything); invitations to a phone number are not texted and the inviter gets
  the link (and class join code) to share. Production needs no `SMS_PROVIDER` (unset = `none`).
- **WhatsApp off** (`features.whatsapp`): the webhook answers 404 before anything else, `/app/settings/whatsapp` is a
  404, its actions refuse, the WhatsApp jobs and outbound sends are no-ops, and the Graph API is never called.
- **Stripe off** (`features.stripe`): the provider registry excludes Stripe even when its keys are configured
  (`FEATURE_GATED_PROVIDERS`), so checkout, the parent checkout, polls, refunds and the Stripe webhook (404) never reach
  it; Full Access is paid through Paynow only.

---

## 4. Data & curriculum architecture

> Source of truth: `prisma/schema.prisma` (119 models, every model and non-obvious field documented with `///`) and
> the raw SQL (CHECKs, partial indexes, triggers, row-level security) that now lives **in the init migration**,
> `prisma/migrations/20261005151329_init/migration.sql` (the design draft `.scratch/design/raw-sql.sql` is gitignored
> history). Section D (roles and grants) is `scripts/sql/app-role-grants.sql` + `scripts/db-deploy.ts`. Finalised
> 2026-10-05 after three review passes (spec coverage, scale/integrity, security/versioning). Conventions: UUIDv7 keys,
> `Timestamptz(3)`, money as `Int` minor units + `Char(3)` currency, every foreign key covered by an index, no `@map`.

### 4.1 Domain overview

```
 CURRICULUM  (admin-extensible lookup tables; a new country / board / qualification is data, not schema, §53)
   Country ─< ExamBoardCountry >─ ExamBoard ─< Qualification >─ QualificationLevel            Country ─< YearGroup
                                                  ├─< Subject ─< Syllabus  (ONE ROW PER VERSION)
                                                  │                ├─< SyllabusComponent (papers), SyllabusRoute
                                                  │                └─< Topic (self-referential tree) ─< LearningObjective
                                                  ├─< GradeScheme ─< GradeBand
                                                  └─< ExamSession ─< ExamTimetableEntry

 CONTENT  (DRAFT → IN_REVIEW → APPROVED → PUBLISHED → ARCHIVED; revisions; licensing; platform/school/tutor tenancy)
   Lesson · Question (+ parts, QuestionOption) · Flashcard · Assessment (+ sections, items, blueprint rules)
   StudyPack (+ scopes) · StudyPlanTemplate (+ items)        ── tagged to Topic nodes: LessonTopic, QuestionTopic,
   ContentRevision · ContentFlag · ContentSource · MediaAsset    FlashcardTopic, AssessmentTopic
   ContentImport · SearchDocument · DailyQuestion · Testimonial · FaqItem

 LEARNING  (per student; every per-subject row hangs off an enrolment that pins one syllabus version)
   SubjectEnrollment ─< TopicMastery, SubjectProgress, FlashcardState (─< FlashcardReview), EnrollmentTopicChoice
   AssessmentAttempt ─< AssessmentAttemptSection, QuestionAttempt ─< QuestionAttemptMarking, QuestionAttemptAttachment
   StudyPlan ─< StudyPlanItem · StudySession · DailyActivity · LearnerStats · XpEvent · UserAchievement
   LeaderboardEntry · Assignment ─< AssignmentProgress · LessonProgress · QuestionStats · ShareableResult

 PLATFORM
   identity   User ── Profile, Student, Parent, Teacher (1:1) · Session · OAuthAccount · VerificationCode
              ParentStudentLink (consent episodes) · PrivacyRequest · PushSubscription
   orgs       School ─< SchoolMember, SchoolSubject, Class (─< ClassTeacher, ClassMember), Announcement, SchoolReport
              Invitation · Notification
   billing    Plan ─< PlanPrice · Subscription ─< Payment ─< PaymentEvent · EntitlementGrant · PromoCode · Referral
   AI         AiConversation ─< AiMessage (row-level security) · AiUsageDaily · AiSpendDaily · AiResponseCache
              AiGenerationJob
   channels   ChannelIdentity ─< ChannelMessage · ChannelConversationState
   infra      AuditLog · Job · RateLimitBucket · Setting · DailyMetric
```

Three rules hold everywhere: **content is never deleted** (archived; references to content are `Restrict`);
**learning history is never deleted** by the application (users are anonymised, §4.13); **derived numbers live in
rollup tables** that dashboards read instead of raw attempts (§4.7).

### 4.2 Curriculum hierarchy and extensibility

| §2 / §53 level | Model | Example | Notes |
|---|---|---|---|
| Country | `Country` | Zimbabwe (`ZW`, `Africa/Harare`, USD) | Timezone, currency, dial code. Boards are offered per country via `ExamBoardCountry`. |
| Examination board | `ExamBoard` | ZIMSEC, Cambridge International | First URL segment (`/zimsec`). |
| Level | `QualificationLevel` | O-Level, A-Level | Cross-board grouping used by onboarding: O-Level groups ZIMSEC O-Level and Cambridge IGCSE. |
| Qualification | `Qualification` | ZIMSEC O-Level, Cambridge IGCSE, Cambridge AS & A Level | Second URL segment. AS vs full A Level is a `SyllabusRoute`, not a separate subject. |
| Subject | `Subject` | ZIMSEC O-Level Mathematics (4004) | A subject *as offered under one qualification* (§3: boards differ). Third URL segment. |
| Syllabus | `Syllabus` | 4004 "2025-2027" | **One row per version** (§4.3). Papers (`SyllabusComponent`) and award routes (`SyllabusRoute`). |
| Topic / subtopic | `Topic` | Algebra → Quadratic equations | One self-referential tree per version; `kind` SECTION / TOPIC / SUBTOPIC, any depth, so ZIMSEC and Cambridge keep their own shapes. Materialised `path` for subtree queries. |
| Learning objective | `LearningObjective` | "Solve quadratics by factorisation" | Per topic node; `cognitiveSkill` is the §9 "skill tested". |
| Lesson → practice → quiz → test → mock | `Lesson`, `Question`, `Assessment` (kind QUIZ … MOCK_EXAM) | | Content is **tagged** to topic nodes (join tables), so one item serves several boards and versions. |

Supporting lookups: `YearGroup` (Form 1-4, Lower/Upper Sixth; Zambia Grade 8-12), `SubjectCategory` (§4 groups),
`GradeScheme`/`GradeBand` (grade estimates, §12), `ExamSession`/`ExamTimetableEntry` (target exam and countdown, §17).
Nothing in this hierarchy is an enum, so **adding a country, board or qualification is data entry with zero schema
change** (CLAUDE.md rule 5):

1. Insert `Country` (and `YearGroup` rows) or reuse one; insert `ExamBoard` and link it with `ExamBoardCountry`.
2. Insert `Qualification` (reusing or adding a `QualificationLevel`), `GradeScheme` + `GradeBand` rows, and
   `ExamSession` rows (provisional until confirmed against the official timetable).
3. Insert `Subject` rows, then a DRAFT `Syllabus` with components, routes, topic tree and objectives (CMS or bulk
   import, §25), clear its copyright and source, and publish it (§4.3).
4. Move `catalogueStatus` HIDDEN → COMING_SOON (listed honestly as "coming soon", §50) → AVAILABLE.

Only genuinely new behaviour needs code: a new content language needs a text-search config branch in
`search_ts_config()`, a new payment provider an adapter (§7.1), a new paper kind a `SyllabusComponentKind` value.

### 4.3 Syllabus versioning lifecycle (§26, rule 8)

```
            publish (copyright cleared + source, publishedAt)        newer version becomes CURRENT
   DRAFT ───────────────────────────────▶ UPCOMING ──▶ CURRENT ───────────────────────────────▶ SUPERSEDED ──▶ ARCHIVED
   editable; invisible to students        examinable later   default for new enrolments        still examined /     no new
   (topics, components, routes,                               exactly one per subject            pinned             enrolments
    objectives may change)                                    (partial unique)
                       ◀── never: a published version cannot return to DRAFT or be deleted (trigger) ──
```

- **Immutability after publish.** Triggers freeze topic structure (parent, kind, depth, path, order, code, slug,
  optionality, exam-year window), objectives, components, routes and their join rows once the version leaves DRAFT.
  Editorial text (names, descriptions, SEO summaries) may still be corrected. A structural edit takes a `FOR SHARE`
  lock on the version, so it cannot race a concurrent publish.
- **A change is a new version.** The new DRAFT row points at the old one (`supersedesId`) and its tree is cloned with
  `Topic.originTopicId` / `LearningObjective.originObjectiveId` lineage. Content tags (`QuestionTopic`, `LessonTopic`,
  …) are curriculum metadata, so tagging existing published content into the new version needs no content revision.
  Switching CURRENT is one transaction: old → SUPERSEDED, new → CURRENT.
- **Students pin a version.** `SubjectEnrollment.syllabusId` (composite FK keeps it inside the subject; the route FK
  keeps the route inside the version). A trigger allows pinning only published, non-ARCHIVED versions and requires
  the explicit, audited "move to the new version" flow to restamp `syllabusPinnedAt`. The flow deletes the
  enrolment's optional-topic choices (their composite FK forbids a version mismatch) and re-makes them; mastery rows
  of the old version stay as history (`TopicMastery.syllabusId`), and every read filters the pinned version.
  *As built (`src/server/enrollment/version-move.ts`, pure core `version-move-core.ts`):* the subject page offers "A
  newer syllabus is available" when the pinned version is SUPERSEDED / ARCHIVED and the CURRENT one descends from it
  (`supersedesId`) or takes effect later (a rollback is never offered), with a warning when the target exam is outside
  the new version's range. The move is one transaction under a row lock on the enrolment: choices re-made where the
  chosen topic is still optional (lineage), the award route kept by code (else the default route), every LEAF topic of
  the new version that descends from a practised topic (`originTopicId`, through intermediate versions) seeded with a
  copy of that evidence (existing rows in the new version win), SubjectProgress and ancestor rollups recomputed, the
  study plan queued for adaptation, and `enrollment.syllabus_move` audited. Teachers see each student's version on the
  class page and the student page; admins on the user record and per version on `/admin/syllabuses`.
- **Old versions stay readable.** Archived versions keep their topics and tags, so a student on the older syllabus
  keeps the right content and their history renders.
- **Content against versions.** A PUBLISHED `Assessment` or `StudyPlanTemplate` can never reference a DRAFT version
  (trigger); mocks name their version and route through composite FKs.

### 4.4 Content model, workflow, revisions, licensing and tenancy

**Content tables.** `Lesson` (markdown + LaTeX source and write-time sanitised HTML, §8), `Question` (+ parts as
child rows, `QuestionOption`), `Flashcard` (platform or personal), `Assessment` (sections, fixed items, blueprint
rules), `StudyPack` (scope rules + entitlements), `StudyPlanTemplate` (week/day slots, §25 "study plans"). Public
`ARTICLE` / `STUDY_GUIDE` lessons may be scoped to a qualification or board instead of a subject (§44).

**Workflow (§41, §42, rule 7).** Students only ever see PUBLISHED rows. The database enforces it:

| Rule | Mechanism |
|---|---|
| Platform status moves only DRAFT → IN_REVIEW → APPROVED → PUBLISHED → ARCHIVED (back to DRAFT from IN_REVIEW, APPROVED, ARCHIVED) | `content_workflow_guard` trigger |
| APPROVED/PUBLISHED platform content has an approval time; AI content also a human approver | `*_platform_approval_chk`, `*_ai_approval_chk` |
| AI output (and imported rows) are inserted as DRAFT; `aiGenerated` can never be cleared; a generation job's output is always `aiGenerated` | trigger + `*_generation_job_chk` |
| Four-eyes: approver ≠ author (database default `app.four_eyes = on` in production) | trigger |
| UNVERIFIED copyright is never PUBLISHED | `*_copyright_chk` |
| What students saw at revision N never changes | `content_published_immutable` + deferred `<T>_revision_snapshot` + `content_child_guard` |

**Draft copies and revisions.** Editing a PUBLISHED item creates a sibling row with `draftOfId = live.id`; students
keep the live row while the copy goes through review. Publishing is one transaction:

1. `set_config('app.content_publish', live.id, true)` (unlocks the live row's children for this transaction only);
2. copy fields onto the live row, `revision + 1`, `aiGenerated := live OR draft`, approver/approval time from the draft;
3. merge children (parts by their own `draftOfId`, options by `key`, sections/items/rules/scopes replaced);
4. insert the immutable `ContentRevision` snapshot of the full aggregate (checked at commit);
5. delete the draft copy; enqueue `search.reindexEntity` (done by the CMS workflow callers in `src/server/cms/review/`
   and `cms/questions/`, not by `publish.ts` itself; no cache revalidation, §3.4); write `AuditLog`.

Ids seen by students never change, so attempts, mastery, stats and flags stay attached. Attempts store
`(questionId, questionRevision)` and `(assessmentId, assessmentRevision)` and re-render history from the snapshot.
Re-opening a published or archived row for editing always starts revision + 1. Render caches (`bodyHtml`,
`renderedHtml`, `renderVersion`) stay editable for re-rendering.

**Licensing (§27).** `ContentSource` records origin and terms (type, SPDX `licenceCode`, attribution, commercial /
derivative / **PDF-export** permissions, agreement reference, validity window). Each item carries `sourceId`,
`author`, `copyrightStatus` (default UNVERIFIED), `licenceCode`, `attribution`, `sourceUrl`, `publicationDate`.
CHECKs: LICENSED needs a source, OPEN_LICENSE a source or licence code; a syllabus version leaves DRAFT only with
cleared copyright and a source (topics inherit its provenance); a PUBLIC media file is never UNVERIFIED. Imports
never assert copyright: editors clear it per item at review. A licence-expiry worker archives content from expired
sources; study-pack PDF export checks every exported item's source.

**Tenancy (§22, §39).** Questions and assessments have exactly one owner class:

| Tenant | Marker | Visible to | Workflow |
|---|---|---|---|
| Platform bank | `schoolId` and `ownerUserId` NULL | Everyone (within entitlements) | Full editorial workflow |
| School-private | `Question/Assessment.schoolId` | That school's teachers; its students through assignments | Owner may publish directly; still revisioned |
| Tutor-private | `ownerUserId` (independent tutor, classes with no school) | The tutor; their class members through assignments | Same as school |
| Personal | `Flashcard.ownerUserId` | The student only | No workflow, no revisions |

The tenant is fixed at insert (trigger) and parts share their root's tenant. Private items are never PUBLIC, never
daily questions and never in `SearchDocument` (which holds PUBLISHED **platform** content only). Cross-tenant
references are refused by `content_tenant_guard`: an assessment item uses platform questions or its own tenant's;
lessons, daily questions and plan templates use platform content only; an assignment uses a platform test, the
class's school's test, or (tutor class) the assigning teacher's own test. The student practice pool reads
`QuestionTopic` through the partial index `QuestionTopic_platform_pool_idx` (`isPlatform` is trigger-derived), so a
pool query cannot return another school's questions.

**Media.** Every user-supplied file is a `MediaAsset` (sniffed type, size, checksum, owner, status, retention); no
column holds a raw storage key. Visibility by purpose is a CHECK: solver photos OWNER_ONLY, import files, answer
attachments and school report exports PRIVATE. `ContentMediaUsage` records where content references an asset.

### 4.5 Question bank (§9, §10, §42)

§9 metadata → columns: board / qualification / level / subject / topic / subtopic via `QuestionTopic` (one primary
tag per syllabus version decides which topic's mastery the question counts towards) plus the home `subjectId`;
`type`; `difficulty` 1-5; `marks`; `estimatedSeconds`; `year`; `paperLabel`; `cognitiveSkill` ("skill tested");
`QuestionObjective` ("learning objective"). `markingMode` is AUTO (pure function), AI_ASSISTED (AI proposes against
our own mark scheme; low confidence goes to NEEDS_REVIEW, §6.5) or MANUAL. `payload` holds presentation data and
`answerSpec` the marking data ("the answer", §34); both are Zod-validated per type and shown below with the student
`response` shape stored on `QuestionAttempt` (examples are original placeholders, not past-paper items).

**Selected response: MULTIPLE_CHOICE, TRUE_FALSE.** Options are rows (`QuestionOption`: per-option rationale, images,
distractor analysis keyed by the stable `key`, which survives revisions and maps to WhatsApp "A".."D" replies).

```json
{ "type": "MULTIPLE_CHOICE", "stem": "Which value of $x$ satisfies $x^2 - 5x + 6 = 0$?",
  "payload":    { "selectMode": "single", "shuffleOptions": true },
  "options":    [ { "key": "A", "content": "$x = 2$", "isCorrect": true,  "rationale": "$(2-2)(2-3) = 0$" },
                  { "key": "B", "content": "$x = -2$", "isCorrect": false, "rationale": "Sign error when factorising." } ],
  "answerSpec": { "scoring": "all_or_nothing" },
  "response":   { "type": "MULTIPLE_CHOICE", "optionKeys": ["A"] } }
{ "type": "TRUE_FALSE", "stem": "Every square is a rectangle.",
  "payload": { "statementStyle": "true_false" }, "answerSpec": { "correct": true },
  "response": { "type": "TRUE_FALSE", "value": true } }
```

**Short constructed: SHORT_ANSWER, FILL_IN_THE_BLANK.**

```json
{ "type": "SHORT_ANSWER", "stem": "Name the gas released during photosynthesis.", "payload": null,
  "answerSpec": { "accepted": [ { "value": "oxygen" }, { "value": "O2" } ], "normalise": ["trim", "lowercase"] },
  "response": { "type": "SHORT_ANSWER", "text": "Oxygen" } }
{ "type": "FILL_IN_THE_BLANK",
  "payload":    { "template": "The capital of Zimbabwe is {{blank:b1}}.", "blanks": [ { "id": "b1", "input": "text" } ] },
  "answerSpec": { "blanks": [ { "id": "b1", "accepted": ["Harare"], "caseSensitive": false } ] },
  "response":   { "type": "FILL_IN_THE_BLANK", "blanks": [ { "blankId": "b1", "text": "harare" } ] } }
```

**Numeric: NUMERICAL, CALCULATION** (CALCULATION adds method marks, AI-assisted for the working).

```json
{ "type": "CALCULATION", "stem": "A car travels 150 km in 2.5 h. Find its average speed.", "marks": 2,
  "payload":    { "unitHint": "km/h" },
  "answerSpec": { "value": 60, "tolerance": { "kind": "absolute", "amount": 0.5 },
                  "units": { "required": true, "accepted": ["km/h", "km h^-1"], "penaltyMarks": 1 },
                  "methodMarks": [ { "id": "M1", "description": "distance ÷ time", "marks": 1 } ] },
  "response":   { "type": "CALCULATION", "value": "60", "unit": "km/h", "working": "150 / 2.5 = 60" } }
```

**Pairing: MATCHING, DIAGRAM_LABELLING.**

```json
{ "type": "MATCHING",
  "payload":    { "left": [ { "id": "l1", "content": "Mitochondrion" } ], "right": [ { "id": "r1", "content": "Respiration" } ],
                  "shuffle": true },
  "answerSpec": { "pairs": [ { "leftId": "l1", "rightId": "r1" } ], "marksPerPair": 1 },
  "response":   { "type": "MATCHING", "pairs": [ { "leftId": "l1", "rightId": "r1" } ] } }
{ "type": "DIAGRAM_LABELLING",
  "payload":    { "mediaAssetId": "0199…", "labels": [ { "id": "L1", "text": "Nucleus" } ],
                  "hotspots": [ { "id": "h1", "x": 42.5, "y": 30.0 } ] },
  "answerSpec": { "hotspots": [ { "hotspotId": "h1", "labelId": "L1" } ] },
  "response":   { "type": "DIAGRAM_LABELLING", "labels": [ { "targetId": "h1", "labelId": "L1" } ] } }
```

**Extended: STRUCTURED (parts), ESSAY, EXTENDED_RESPONSE.** A STRUCTURED root holds the shared context and has no
`answerSpec`; each part is a child `Question` row with its own type, marks and spec (parts may nest one level, "(b)(i)").
Open answers carry our own mark-scheme points and optional level descriptors; photos of working are
`QuestionAttemptAttachment` rows, never JSON.

```json
{ "type": "STRUCTURED", "stem": "A rectangle has length $(x+3)$ cm and width $x$ cm.", "answerSpec": null,
  "parts": [ { "partLabel": "(a)", "type": "SHORT_ANSWER", "marks": 1, "stem": "Write an expression for its area." },
             { "partLabel": "(b)", "type": "NUMERICAL", "marks": 2, "stem": "The area is 40 cm². Find $x$.",
               "answerSpec": { "value": 5 } } ],
  "response": { "type": "STRUCTURED", "parts": [ { "partId": "<part (a) id>", "text": "x^2 + 3x" },
                                                  { "partId": "<part (b) id>", "value": "5" } ] } }
{ "type": "ESSAY", "markingMode": "AI_ASSISTED", "marks": 10,
  "payload":    { "wordLimit": { "max": 400 } },
  "answerSpec": { "markScheme": { "points": [ { "id": "P1", "description": "Defines the term accurately", "marks": 2 } ],
                                  "levels": [ { "level": 3, "minMarks": 7, "maxMarks": 10, "descriptor": "Sustained analysis" } ] },
                  "modelAnswer": "…" },
  "response":   { "type": "ESSAY", "text": "…" } }
```

Quality control: `ContentFlag` (§42 reasons; one open flag per reporter and reason, one open SYSTEM flag per reason),
`QuestionStats` (facility, first-exposure calibration, discrimination, distractor counts, `suspectAnswerKey`) and
re-marking after a key correction through `QuestionAttemptMarking` (source AUTO).

### 4.6 Attempts, marking, mastery and adaptivity

One attempt model covers practice, re-tests, lesson checks, the daily question (also over WhatsApp), quizzes,
topic/chapter/subject tests, timed exams, mocks and the diagnostic (`AttemptMode`); assignment work is any mode with
`assignmentId`. Data flow:

```
 start ── AssessmentAttempt (mode, config, assessmentRevision, overall deadline = start + limit × (1 + extra time %))
   │      + AssessmentAttemptSection per paper (title, answerCount, maxMarks, own limit/deadline; copied, never read
   │        back from the mutable definition); exam modes create every QuestionAttempt slot now
 present ─ QuestionAttempt (attemptId, position) with questionRevision, difficulty, marksAvailable and topicId = the
   │        question's PRIMARY topic in the pinned version (copied, no FK)
 answer ── upsert on (attemptId, position); stale offline replays ignored (responseVersion); after a deadline only
   │        within the grace window (lateSync)
 mark ──── AUTO: pure marking, same transaction
   │       AI_ASSISTED: ai.mark job → QuestionAttemptMarking (model, prompt version, confidence) → AI_MARKED or
   │                    NEEDS_REVIEW (provisional; queues via AssessmentAttempt.pendingReviewCount)
   │       teacher / reviewer / self overrides → QuestionAttemptMarking
 per answer, one transaction (all HOT-eligible except the insert):
   │       QuestionAttempt · TopicMastery leaf row (score, band, currentDifficulty, streaks, nextReviewAt) ·
   │       DailyActivity counters · AssessmentAttempt.lastSavedAt
 close ─── counts; totalMarks / marksAwarded over COUNTED answers ("answer any N": only the N best per section,
   │        isCounted); percentage; gradeEstimate + gradeSchemeId + gradeIsPass; analysis (by topic, strengths,
   │        recommendations); XpEvent (idempotent); LearnerStats; StudySession
 rollup ── refreshSubjectProgress (synchronous): ancestor TopicMastery rows, SubjectProgress; QuestionStats per answer
 adapt ─── practice/RETEST selection reads TopicMastery (pinned version) + QuestionStats.calibratedFacility over the
           platform pool; studyplan.adapt regenerates future plan items
```

Adaptive rules (§11): repeated wrong answers set `remediationStartedAt`, lower `currentDifficulty` and recommend a
lesson; consistent success raises difficulty and introduces `isExamStyle` questions; `nextReviewAt` schedules
re-tests. Mastery bands are stored and CHECKed against the §11 thresholds, so weak/strong lists use an index.
Views select rows by `topicKind` (TOPIC rows for §7 bars and "weakest area"), never by depth. Scope (§6 "topics
remaining", §16): leaf topics of the pinned version ∩ the route's components ∩ (not optional OR chosen in
`EnrollmentTopicChoice`) ∩ the exam-year window of the target session.

Per-paper timing (§12, §13): a multi-paper mock may have no overall deadline when every section has its own
(deferred constraint trigger); `exams.autoSubmit` sweeps both attempt and section deadlines. Exam extra time
(`Student.examExtraTimePercent`, set by staff or the school admin, audited) is applied at start and recorded in
`config.extraTimePercent`.

### 4.7 Rollup tables and who maintains them

| Rollup | Grain | Maintained by | Read by |
|---|---|---|---|
| `TopicMastery` (leaf rows) | student × topic | Per-answer transaction (synchronous, instant adaptivity) | Adaptive engine, weak topics, planner |
| `TopicMastery` (ancestor rows) | student × topic | `refreshSubjectProgress` in the answer / finalize path (*as built*; the planned debounced job and nightly reconcile were not built) | §7 topic bars |
| `SubjectProgress` | student × subject | `refreshSubjectProgress` (synchronous, *as built*) | §6/§7 dashboards, parents, teachers, schools |
| `LearnerStats` | student | Attempt close, lesson completion, XP award (streaks are evaluated from `DailyActivity` when activity is recorded and read; no streak job) | Streaks, XP, badges (§19) |
| `DailyActivity` | student × local day | Same transaction as each activity; streak job for freezes | Daily target, streaks, parent activity, DAU/MAU |
| `QuestionStats` | question | Counters updated per answer (`src/server/questions/stats.ts`, *as built*; no hourly/weekly job) | Calibration, QC, "most difficult" |
| `AssessmentAttempt` counters/analysis | attempt | Attempt close / marking | Results, recent tests |
| `AssignmentProgress` + `Assignment` counters | student × assignment | Attempt close, lesson completion | Teacher views (§22) |
| `LeaderboardEntry` | board × period × student | `leaderboards.snapshot`: hourly upsert of **changed scores only**; ranks written at the weekly close | Leaderboards (§20) |
| `AiUsageDaily` | user × day × feature | AI pipeline reserve/settle | Quotas (§40), AI dashboards |
| `AiSpendDaily` | day × shard (16) | AI metering transaction | Global spend guard (O(16) read, cached 30 s) |
| `DailyMetric` | day × metric × dimension | `analytics.dailyMetrics` nightly | Admin and school analytics (§23, §35) |

Every rollup can be recomputed from the facts (attempts, reviews, sessions, ledgers); nullable metrics mean "not
enough evidence yet" and render as honest empty states (§50).

### 4.8 Billing and entitlements

| Model | Role |
|---|---|
| `Plan` | FREE / STUDENT / PREMIUM / SCHOOL as **data**: `entitlements` JSON `{ features, limits }` validated against the key registry (`src/lib/billing/entitlements.ts`); one default (FREE) plan |
| `PlanPrice` | Price per plan or study pack, currency, interval (TERM length as data), per-seat; immutable after insert (new row to change) |
| `Subscription` | Held by a user (B2C, payer may be a parent) XOR a school (seats); prepaid periods extended per payment; plan audience must match the holder (trigger) |
| `Payment` | Provider-agnostic attempt with the five §32 states; amounts and parties frozen; fulfilment, receipt and service period write-once; refunds only accumulate; a subscription payment must target the beneficiary's own subscription |
| `PaymentEvent` | Append-only raw log; idempotent among signature-verified events only (partial unique), so a forged unsigned callback cannot suppress the real one; 6-year retention |
| `EntitlementGrant` | Time-boxed access from study packs (copied from `StudyPack.entitlements`, scoped by `StudyPackScope`), referral rewards, promo free days, staff grants (attributed + reason), compensation and school seats; payment links must match beneficiary and pack and be SUCCESSFUL |
| `PromoCode` / `PromoRedemption`, `ReferralCode` / `Referral` | Discounts (percent 1-99; a full discount is FREE_DAYS, never a zero payment) and §46 referral rewards |

`resolveEntitlements(sources, now)` (pure) unions features and takes the maximum of limits across the own
subscription, school seat grants, other grants and the FREE default (§7.6); `assertEntitlement(actor, key)` gates
features (rule 9). Money is always `Int` minor units + ISO currency; revenue is normalised per day in `DailyMetric`.

### 4.9 AI data model and privacy

| Model | Holds |
|---|---|
| `AiConversation` / `AiMessage` | Tutor and solver turns with full metering (tokens, cost in micro-dollars, model, tier, prompt version, latency); context snapshot is PII-free; assignment help level snapshotted (`aiHelp`) |
| `AiUsageDaily` | Per-user daily quota ledger (reserve before the call, settle after) |
| `AiSpendDaily` | Global daily spend counter, 16 shards, BigInt; trips the kill switch past `ai.dailyBudgetMicros` |
| `AiResponseCache` | Generic explanations keyed by a hash; never the student's own words, never student context |
| `AiGenerationJob` | Admin content generation (§41); output always DRAFT + `aiGenerated` |

Privacy is enforced **in the database**: `AiConversation` and `AiMessage` have `FORCE ROW LEVEL SECURITY`. A row is
visible only when the transaction sets `app.user_id` to the owner, `app.ai_scope = 'parent'` with an ACTIVE link
carrying the student's separate AI consent (and the platform switch on), `'system'` for workers, or `'break_glass'`
(SUPER_ADMIN, step-up, reason, `AuditLog` entry whose reason is CHECK-enforced). Any other query, such as a careless
`include` from a subject, topic, question or user, returns nothing; no teacher-owned model has a relation to
conversations. `src/server/ai` runs every AI query inside a transaction that calls `set_config(..., true)`; the
application role must not be a superuser or `BYPASSRLS` (section D of the raw SQL). WhatsApp AI exchanges are
stored as `AiMessage` rows; the support-visible `ChannelMessage` keeps only metadata (`contentClass = AI_PRIVATE`,
body and payload NULL by CHECK), and OTP sends never store the code. Solver photos are OWNER_ONLY media.

### 4.10 §34 entity names → models

| §34 name | Model(s) | Notes |
|---|---|---|
| User, Profile, Student, Parent, Teacher | `User`, `Profile`, `Student`, `Parent`, `Teacher` | 1:1 extensions keyed by `userId` |
| School, Class | `School`, `Class` (+ `SchoolMember`, `ClassTeacher`, `ClassMember`, `SchoolSubject`) | School authority only through `SchoolMember` |
| Enrollment | `SubjectEnrollment` (+ `EnrollmentTopicChoice`) | Per-subject; pins the syllabus version |
| ExamBoard, Qualification, Subject | `ExamBoard`, `Qualification`, `Subject` | Plus `Country`, `QualificationLevel`, `YearGroup`, `SubjectCategory` |
| Syllabus | `Syllabus` (one row per version) + `SyllabusComponent`, `SyllabusRoute` | |
| Topic, Subtopic | `Topic` (`kind` TOPIC / SUBTOPIC / SECTION) | One self-referential tree |
| LearningObjective | `LearningObjective` | |
| Lesson | `Lesson` | Also revision notes, worked examples, exam tips, articles, study guides |
| Question, Answer | `Question` (`answerSpec`), `QuestionOption` | Parts are child `Question` rows |
| QuestionAttempt | `QuestionAttempt` (+ `QuestionAttemptMarking`, `QuestionAttemptAttachment`) | |
| Quiz, MockExam | `Assessment` (kind QUIZ … MOCK_EXAM, DIAGNOSTIC, TIMED_EXAM) + sections, items, rules | |
| QuizAttempt, MockExamAttempt | `AssessmentAttempt` (+ `AssessmentAttemptSection`) | Also practice, daily question, diagnostic |
| Flashcard, FlashcardReview | `Flashcard`, `FlashcardReview` (+ `FlashcardState`) | |
| StudyPlan, StudySession | `StudyPlan` (+ `StudyPlanItem`, `StudyPlanTemplate`), `StudySession` | |
| Subscription, Payment | `Subscription`, `Payment` (+ `Plan`, `PlanPrice`, `PaymentEvent`, `EntitlementGrant`) | |
| AIConversation, AIMessage | `AiConversation`, `AiMessage` | Prisma model casing |
| Achievement, Notification | `Achievement` (+ `UserAchievement`), `Notification` | |

### 4.11 Index strategy for hot paths

Every FK is covered by an index led by its column(s) (checked mechanically on the final DDL; for composite FKs a
selective leading column, e.g. `attemptId`, or the same column set in another order); composite indexes follow real
query shapes; partial indexes cover small "open" sets. On per-answer-updated rows **no index references a column that
an answer save or marking changes**, so those updates are HOT (heap-only, no index writes).

| Hot path | Index | Note |
|---|---|---|
| Load an attempt's questions; answer upsert | `QuestionAttempt` PK `(attemptId, position)` | Natural key; partition-ready; 3 B-trees + 2 BRIN in total (555/600 updates HOT, measured) |
| Adaptive window / recent mistakes | `QuestionAttempt (userId, topicId, createdAt)` | `createdAt` (presentation time) is immutable |
| Per-question history, re-marking | `QuestionAttempt (questionId, createdAt)` | |
| Stats and analytics windows | BRIN `QuestionAttempt (createdAt)`, `(markedAt)` | BRIN changes do not block HOT on PG 16+ |
| Autosave of the attempt row | none on `lastSavedAt`; idle sweep on partial `(startedAt) WHERE IN_PROGRESS AND deadlineAt IS NULL` | Measured: indexing `lastSavedAt` made 0/1,000 saves HOT; the final DDL gives 369/1,000 in a tight loop with no pruning time |
| Timer sweeps | partial `AssessmentAttempt (deadlineAt)`, `AssessmentAttemptSection (deadlineAt)` WHERE open | |
| Review queues | partial `AssessmentAttempt (submittedAt) WHERE pendingReviewCount > 0` | Not on `QuestionAttempt.markingStatus` (would kill HOT) |
| Dashboard weak/strong topics, §7 bars | `TopicMastery (userId, subjectId, syllabusId, topicKind, band)` | Excludes `score` (changes every answer) |
| Flashcard due queue | `FlashcardState (userId, subjectId, dueAt)` | One dueAt index serves per-subject and all-subject queues |
| Student practice pool | partial `QuestionTopic (syllabusId, topicId) WHERE isPlatform` | Tenant-safe by construction |
| Leaderboard top-N / "my rank" | `LeaderboardEntry (metric, periodKey, scopeType, scopeId, value DESC)` | Scores upserted only when changed |
| Job claim | partial `Job (queue, priority, runAt) WHERE PENDING` | `FOR UPDATE SKIP LOCKED` |
| Sessions, users, lesson progress | no index on touch timestamps (`lastSeenAt`, `lastActiveAt`, `lastViewedAt`) | Touches stay HOT; small per-user sets sort in memory |
| Search | GIN `searchVector`, trigram `title`, GIN `subjectIds` / `topicIds` / `syllabusIds` | Board / qualification / level arrays are rechecked, not indexed (unselective) |

Storage parameters (fillfactor 80-90, eager autovacuum) are set on the hot-update tables.

### 4.12 Raw SQL extras (summary)

The raw SQL is **required** and idempotent (safe to re-run); it is part of
`prisma/migrations/20261005151329_init/migration.sql`. Section A (top of the migration): `pg_trgm`,
`search_ts_config()`. Section B: in-place edit making `SearchDocument.searchVector` a stored generated column.
Section C (appended, 333 statements, verified on PostgreSQL 18.3 together with the Prisma DDL; a re-run is a no-op;
`prisma migrate diff` reports no drift). Later migrations add indexes only (plus `User.passwordMustChange`); see
`tests/raw-indexes.test.ts`:

| Kind | Count | Examples |
|---|---|---|
| CHECK constraints | 288 | Workflow/approval/copyright/licence; mastery band = §11 thresholds; money and refund bounds; tenancy; consent; timers; marks |
| Partial / expression / NULLS NOT DISTINCT indexes | 45 | One CURRENT syllabus per subject; one ACTIVE plan; one open attempt per assessment; job claim; platform question pool; authentic payment events |
| Functions | 40 | `content_workflow_guard`, `content_published_immutable`, `content_tenant_guard`, `assert_revision_snapshot`, `uuidv7_floor` |
| Triggers | 83 | Published-syllabus freeze; content workflow, immutability (+7 deferred constraint triggers); tenancy; Payment / PaymentEvent / AuditLog / ContentRevision append-only and write-once guards; consent and membership guards; demo-data guard on 21 tables |
| Row-level security policies | 6 | `AiConversation` (read / insert / update / delete), `AiMessage` (read / write) |

Transaction-local settings read by the database: `app.user_id`, `app.ai_scope` (AI RLS), `app.content_publish`
(publish transaction), `app.audit_retention_purge`, `app.payment_retention_purge` (purges), and database defaults
`app.environment = production` (no demo rows) and `app.four_eyes = on`. Section D is a required deploy step: a
non-superuser, non-`BYPASSRLS` application role; INSERT/SELECT only on `AuditLog`; no DELETE on `ContentRevision` and
`PaymentEvent`; the database defaults; boot assertions that refuse to start otherwise. *As built:* grants in
`scripts/sql/app-role-grants.sql` (`npm run db:grants` locally), applied and verified on deploy by
`scripts/db-deploy.ts`; boot checks in `src/server/lib/db-safety.ts`, also reported by `GET /api/ready`. Seeds must insert published
content together with its `ContentRevision` snapshot and approval time, and set `isDemo` on demo rows.

### 4.13 Data retention and deletion

| Data | Retention |
|---|---|
| Sessions | Purged 30 days after expiry (nightly scan) |
| OTP codes, rate-limit buckets | 24 h after expiry / after the window |
| Solver images (OWNER_ONLY) | 30 days |
| AI message content | 12 months, then `content = ''` (metering kept) |
| WhatsApp bodies and payloads (STANDARD rows) | 90 days; AI and OTP content never stored there |
| Unlinked WhatsApp identities | Deleted 90 days after the last inbound message |
| Share cards | At most 1 year (CHECK); deleted with the account |
| School report files | Per `SchoolReport.expiresAt` (row kept, status EXPIRED) |
| Notifications | Setting (suggested 180 days) |
| Finished jobs | 7 days |
| Learning history, mastery, progress | Life of the account; anonymised on deletion |
| Payments, payment events | 6 years (TBC with an accountant); append-only |
| Audit log | 2 years; payment-related entries 6 years (age-checked by the purge trigger) |

**Account deletion** (`accounts.deleteUser`, after the 14-day `PrivacyRequest` grace period; users are never
hard-deleted by the application):

- *Anonymise:* `User` (email, phone, username, contact phone, password → NULL; `status = DELETED`), `Profile`
  (names, username, avatar, preferences), `Student` / `Teacher` free text.
- *Delete:* sessions, OAuth links, verification codes, push subscriptions, parent links, channel identities and
  conversation state (messages keep metadata with `identityId` NULL), AI conversations and messages (after marking
  their solver photos DELETED), notifications, pending invitations, share cards.
- *Blank and retire:* personal flashcards (archived, text blanked; review history kept), testimonials (unpublished,
  quote / name / photo erased, `consentWithdrawnAt` set), answer attachments and avatar (MediaAsset DELETED; a worker
  removes the objects).
- *Keep, attached to the anonymised id:* attempts, mastery, progress, plans, XP, payments, subscriptions, grants,
  memberships (REMOVED), audit entries (the actor reference is `Restrict`).

**Data export** delivers profile, enrolments, attempts, progress, plan, flashcards and the user's AI conversations as
JSON through a short-lived signed link.

*As built (landed 2026-10-07 by the parallel privacy work, still settling):* `src/server/accounts/privacy.ts`
(`PrivacyRequest`: deletion with a 14-day grace, export with a cooldown), `deletion.ts` (`accounts.deleteUser`),
`export.ts` (JSON export downloaded by its owner from `/app/settings/data/[requestId]`, not a signed link),
`retention.ts` (solver photos 30 days, AI message text 12 months), jobs `accounts.exportData`,
`accounts.privacySweep` (hourly) and `accounts.retentionPurge` (daily). Other retention rows are handled by
`whatsapp.purge`, `maintenance.purgeNotifications`, `auth.purge*`, `sharing.purgeExpired` and `schools.expireReports`.
Import files: `imports.purgeFiles` (90 days). Audit log: the 2-year (6-year payment) purge is an ops task run as the
`app_maintenance` role, `scripts/maintenance/purge-audit.ts` (docs/DEPLOYMENT.md §4 "Scheduled operations"); it is
**not** scheduled anywhere until the operator sets it up. **Not built:** the 6-year `PaymentEvent` purge (nothing is
that old before 2032).
*Guardian path (2026-10-07):* a minor's linked parent or legal guardian (ACTIVE link as PARENT / GUARDIAN, or the
guardian of record) can request the child's export and deletion from `/parent/children/[studentId]`
(`src/server/accounts/guardian-privacy.ts`, `PrivacyRequest.requestedById` = the guardian): the child is notified and
can cancel a deletion, the guardian's copy leaves out AI conversations and is downloaded by that guardian only
(audited), and the requester of any export is notified when it is ready.

### 4.14 Partitioning plan

Nothing is partitioned at launch (≈200 GB in year 1 at the §9.1 design point). Prisma does not manage partitions, so
each change is a raw-SQL migration; the keys below are already partition-ready. This supersedes the generic
`createdAt` key in §9.10 for `QuestionAttempt`.

| Table | Trigger | Strategy | Prepared by |
|---|---|---|---|
| `QuestionAttempt` | ~200M rows or indexes beyond RAM | RANGE on `attemptId` with monthly `uuidv7_floor()` bounds: an attempt's rows share a partition, so the PK `(attemptId, position)`, the answer upsert and every FK to it (`QuestionAttemptMarking`, `QuestionAttemptAttachment`, `ChannelConversationState`) stay valid | PK is the natural key; nothing references a surrogate id; time-bounded queries add `attemptId >= uuidv7_floor(:from)` |
| `FlashcardReview` | ~200M rows | RANGE on `reviewedAt`; idempotency unique becomes `(userId, clientReviewId, reviewedAt)` | Replays carry the same client time |
| `StudySession` | ~100M rows | RANGE on `startedAt`, PK `(id, startedAt)` | Nothing references it by FK |
| `AiMessage` | Purge cost | Monthly RANGE on `createdAt`; the 12-month purge becomes per-partition | Nothing references it by FK (`ChannelMessage.aiMessageId`, `AiMessage.cacheEntryId` are plain ids) |
| `Notification`, `ChannelMessage`, `AuditLog` | Retention cost | Monthly RANGE on `createdAt`; purge = drop partition | Plain-id the FKs into them first (`ChannelMessage.notificationId`, `inReplyToId`) |
| `LeaderboardEntry` | Many periods | Prefer a retention purge (last 12 weekly periods + LIVE); else LIST on `periodKey` | |
| `XpEvent`, `AssessmentAttempt`, `DailyActivity`, `Job` | — | Not partitioned (global idempotency uniques; modest volumes; `Job` is purged) | |

### 4.15 Open data questions (owner / product)

- **Half marks:** marks are integers; if a mark scheme needs halves, store half-mark units (×2).
- **Parent access to AI conversations:** built behind three gates (platform switch `privacy.parentAiAccess.enabled`,
  default OFF; the student's separate AI consent on an ACTIVE link; RLS `parent` scope), with routes under
  `/parent/children/[studentId]/conversations`. Switching it on needs legal sign-off (§5.2, §5.3).
- **Further open decisions** (premium-only features, school tools without a SCHOOL subscription, search over premium
  bodies, bundle budgets, minors' consent threshold, syllabus version moves): see [STATUS.md](STATUS.md).
- **Mastery carry-over on a version move:** built (2026-10-07) as a lineage-based copy of leaf evidence
  (`Topic.originTopicId`); split or merged topics without lineage start fresh. Old-version rows stay as history.
- **School invoicing / VAT, family plans, dated FX rates, staff MFA:** not modelled yet (platform notes, open questions).
  Revenue reports can add a USD equivalent from ONE configured rate per currency (setting `fx.rates`,
  `src/lib/billing/fx.ts`), labelled with the rate date; no rate, no USD total.

---

## 5. Security architecture (§39)

### 5.1 Authentication flows (§33)

| Flow | Design |
|---|---|
| Identifiers | **Email-based** (owner decision 2026-10-07): self-registration needs an email address, verified with a code sent by email; sign-in is email (or a school-issued username) + password, or an emailed code. A phone number is optional profile data only (E.164, `+263` default; e.g. for mobile-money checkout): never a sign-in identifier, never verified, never sent anything. School-provisioned username accounts are vouched for by the school. |
| Password | Argon2id (`@node-rs/argon2`; memory 19 MiB, iterations 2, parallelism 1, the OWASP baseline), rehash on login when parameters change. Minimum 8 characters, checked against a common-password list, no composition rules (NIST 800-63B). |
| OTP | 6 digits, sent by EMAIL (account email: always sent, whatever `features.email` says). Stored as `HMAC-SHA256(SESSION_SECRET, purpose + target + code)`, never plaintext. 10 min TTL, 5 verify attempts per code, 60s resend cooldown. Purposes: verify email (registration, unverified sign-in, change of email), login, reset password; link WhatsApp and link parent belong to their own (dormant / in-app) flows. Code sends are the most tightly rate-limited endpoint (§5.5). |
| Security notices | Emailed to the verified address on password change, password reset, a staff-issued one-time password, and email change (to the OLD address) (`src/server/auth/notices.ts`). |
| Google login | OIDC authorization code + PKCE + `state` + `nonce`; ID token checked for `iss`, `aud`, `exp`, `email_verified`. Auto-link to an existing account only when both sides have the same verified email; otherwise log in first and link from settings. |
| Sessions | 32 random bytes in cookie `__Host-dz_session` (`Secure`, `HttpOnly`, `SameSite=Lax`, `Path=/`). The DB stores `SHA-256(token)`. Sliding idle expiry (students, parents, teachers 30 days; staff 12h idle and 7 days absolute). Rotated on login and on role change. `lastSeenAt` updated at most every 5 min. Device list and "log out everywhere". |
| Step-up | Role grants, refunds, settings, kill switches and break-glass require re-authentication within the last 15 min. |
| API / mobile | Same `Session` table, bearer kind, prefixed tokens (`dz_`) so secret scanners catch leaks. Opaque and revocable (no JWT). Sliding 90-day idle expiry, 180 days absolute (staff: 12h / 7 days); WhatsApp links 30 days idle (`session-policy.ts`). |
| `src/proxy.ts` | Redirects to `/login` when the session cookie is **absent** on protected prefixes. Real validation happens in layouts and services against the DB. It also forwards the requested page's path + query as `x-dz-request-path` (overwriting any client value), so a layout's page guard, which usually redirects before the page's own guard, keeps `?next=` through sign-in, a forced password change and onboarding (validated by `safeNextPath`; the bare `/app` is never carried into onboarding, so the wizard's diagnostic offer applies). |
| Providers | `EMAIL_PROVIDER` / `SMS_PROVIDER` adapters (`console` in dev). Production REQUIRES `EMAIL_PROVIDER=resend` (accounts are email-based); `SMS_PROVIDER` is optional (unset = `none`; SMS is switched off). *As built* (`src/server/messaging/providers.ts`): `resend` (email), `twilio` and `africastalking` (SMS, dormant), fetch-based with a 10 s timeout; `env.ts` refuses `console` and unknown names in production and requires the chosen provider's keys everywhere. SMS recipients are normalised to E.164 (`+263` default; Zimbabwean fixed lines refused) and bodies mapped to GSM-7 and capped at 6 segments. Failures are `MessagingProviderError`: retryable ones (network, timeout, 429, 5xx, auth/config) are `INTERNAL` so `notifications.send` backs off; permanent ones (bad recipient, rejected) are `BAD_REQUEST` so the job fails at once. OTP codes are never queued (secrets), so `sendOtpMessage` retries a transient failure once in-process. Logs carry masked recipients, tag, network, segments and provider ids only. **Not yet verified against the live providers, and Zimbabwe coverage is unconfirmed** (go-live blocker, STATUS.md). |
| Routes (as built) | Google: `GET /api/auth/google/start` and `/api/auth/google/callback`. Logout: the logout Server Action for web pages, plus `POST /api/auth/logout` for bearer tokens and plain forms. School-provisioned students sign in with a **username** and are sent to `/change-password` while `passwordMustChange` is set. |

### 5.2 RBAC matrix

Roles are from §33. A user may hold several roles (e.g. TEACHER + PARENT); effective permissions are the union.
Services also apply the resource rules in §5.3. "Own" means scoped by §5.3.

| Permission | STUDENT | PARENT | TEACHER | SCHOOL_ADMIN | CONTENT_EDITOR | ADMIN | SUPER_ADMIN |
|---|---|---|---|---|---|---|---|
| `learn.study` (lessons, practice, exams, flashcards, plan; entitlement-gated) | ✓ | – | preview | – | preview | preview | preview |
| `ai.use` (tutor, solver; quota) | ✓ | – | – | – | – | – | – |
| `progress.viewOwn` | ✓ | – | – | – | – | – | – |
| `child.view` | – | own linked | – | – | – | – | – |
| `class.manage` (classes, students, assignments, tests, announcements) | – | – | own classes | own school | – | ✓ | ✓ |
| `class.viewPerformance` | – | – | own classes | own school | – | ✓ (audited) | ✓ |
| `school.manage` (teachers, students, subjects, seats) | – | – | – | own school | – | ✓ | ✓ |
| `content.flag` (report a problem, §42) | ✓ | – | ✓ | – | ✓ | ✓ | ✓ |
| `content.draft` (lessons, questions, flashcards, assessments, packs) | – | – | class tests only | – | ✓ | ✓ | ✓ |
| `content.review` (approve; never own work) | – | – | – | – | ✓ | ✓ | ✓ |
| `content.publish` / `content.archive` (APPROVED only) | – | – | – | – | ✓ | ✓ | ✓ |
| `curriculum.manage` (boards, qualifications, subjects, syllabus versions, exam sessions, grade schemes) | – | – | – | – | draft | ✓ | ✓ |
| `imports.run` | – | – | – | rosters | content | ✓ | ✓ |
| `ai.generate` (§41, budgeted) | – | – | – | – | ✓ | ✓ | ✓ |
| `users.manage` | – | – | – | – | – | ✓ | ✓ |
| `roles.grant` | – | – | – | – | – | up to CONTENT_EDITOR / SCHOOL_ADMIN | all |
| `billing.manage` (plans, prices, promo codes, grants) | – | – | – | – | – | ✓ | ✓ |
| `payments.view` | own | own | – | own school | – | ✓ | ✓ |
| `payments.refund` | – | – | – | – | – | ✓ (step-up) | ✓ |
| `analytics.platform` | – | – | – | – | content stats | ✓ | ✓ |
| `ai.admin` (routing, quotas, pricing) | – | – | – | – | – | view + kill switch | ✓ |
| `settings.manage` | – | – | – | – | – | – | ✓ |
| `audit.view` | – | – | – | – | – | ✓ | ✓ |
| Read another user's AI conversations | never | own linked child, only with the student's separate consent and the platform switch on (default OFF) | never | never | never | never | break-glass only (§5.3; DB scope exists, no admin UI) |

The matrix is implemented in `src/server/auth/permissions.ts` ("all" / "own" / "restricted" / "preview" scopes) and
the resource rules in `src/server/auth/rbac.ts`; `tests/authz/roles.test.ts` covers it.

### 5.3 Resource-level authorization

Enforced in services with query scoping (lists filtered in SQL, never fetched-then-filtered) and covered by tests
(§51: teacher, parent and admin permissions).

| Actor | Rule |
|---|---|
| Student | Only their own attempts, progress, plan, flashcards, conversations, payments. |
| Parent to child | Only students with an ACTIVE `ParentStudentLink`. A link is created by a code the student approves (or a school-verified relationship); the student sees who is linked and can revoke. Parents see §21 data only: subjects, study time, progress, test results, weak areas, countdown, activity. AI conversations only through the consented path (`src/server/family/ai-conversations.ts`: platform switch default OFF, separate student consent, RLS `parent` scope, audited), never by default (§21). |
| Teacher to student | Only students who are active `ClassMember`s of a class the teacher teaches (`ClassTeacher`), and only data for that class's subject(s). No AI conversations, payments or contact details beyond the class roster. Independent tutors may run classes without a school. |
| School admin | Only their own school via `SchoolMember` (role SCHOOL_ADMIN): aggregates plus individual performance of members; no AI conversations; billing for the school subscription only. |
| Content editor | Content and curriculum. No student PII: question stats are aggregated; flag reporters are shown by role only. Four-eyes: the last author cannot approve an item. |
| Admin | Operational data across the platform; viewing an individual student's record writes an audit entry. Cannot read AI conversation content. |
| Super admin | Settings, staff roles, kill switches. Break-glass read of a specific AI conversation only for a safeguarding or abuse report, with a stated reason, step-up auth and an audit entry. |
| System (worker) | Acts with `system` actor; user-scoped jobs carry the user id and re-check ownership. |

### 5.4 CSRF

| Surface | Protection |
|---|---|
| Server Actions | POST-only; Next.js compares `Origin` with `Host` / `X-Forwarded-Host` and aborts on mismatch; `SameSite=Lax` session cookie. `serverActions.allowedOrigins` lists only our own domains when behind a proxy. |
| REST with cookie session | Unsafe methods require `Origin` (or `Sec-Fetch-Site: same-origin`) to match `APP_URL`; otherwise 403. |
| REST with bearer token | Not CSRF-prone (no ambient credentials). Cookies are ignored when a bearer header is present. |
| Webhooks | No cookies; HMAC or hash verification per provider. |
| State changes via GET | Not allowed anywhere (logout is a POST). |

### 5.5 Rate limiting

Postgres fixed-window counters (`RateLimitBucket`, upsert `... ON CONFLICT DO UPDATE SET count = count + 1 RETURNING
count`) behind `lib/rate-limit`, plus CDN/WAF limits in production. Defaults live in `Setting` so they can be tuned
without a deploy. **The authoritative list is the `rateLimits` presets in `src/server/lib/rate-limit.ts`** (tunable
through the `rateLimits` setting in `/admin/settings`); the table below is the original design and may lag behind it.

| Point | Key | Default limit |
|---|---|---|
| Login | IP + identifier | 10 / 15 min |
| Sign-in, all credential endpoints (password, code request, code verify, reset; web and API) | IP | 60 / 15 min (`loginIp`, in addition to the per-identifier limits) |
| API code verify | IP + destination | 10 / 15 min (`apiOtpVerify`) |
| OTP send | target (phone or email) | 3 / 15 min, 10 / day |
| OTP send | IP | 20 / hour |
| OTP verify | code | 5 attempts |
| Register | IP | 10 / hour |
| AI tutor messages | user | 10 / min + plan daily quota (§6) |
| Solver uploads | user | plan daily quota (e.g. 5 free) |
| Public search | IP | 60 / min |
| Anonymous daily-question answers | IP | 30 / hour |
| REST / JSON API (`apiRoute`, bearer or cookie) | user | 600 / min |
| WhatsApp inbound | phone number | 30 / min, counted after dedupe (redeliveries never count) |
| WhatsApp outbound | phone number | 20 / min |
| Webhook receipts (before signature checks) | endpoint + IP | 300 / min |
| Uploads | user | 30 / hour |
| Attempt start / resume (web, REST, WhatsApp) | user | 30 / 10 min (`attemptStart`), checked before any lock or transaction |
| Answer save / submit (web, REST, WhatsApp) | user | 120 / min (`answerSubmit`), plus at most 4 attempt writes in flight per student per node (`src/server/attempts/throttle.ts`) |
| SMS sends (every purpose, paid adapters) | platform | `messaging.smsBudget`: allowed country prefixes (default `+263`) and a daily cap (default 2,000 per Africa/Harare day) with a once-a-day SUPER_ADMIN alert (`src/server/messaging/sms-budget.ts`) |

### 5.6 Input validation

Zod on every boundary: route params, search params, form data, Server Action arguments, REST bodies, webhook payloads
(after signature check), import rows, JSON payload columns and AI structured outputs. Request body size limits per
route. Database constraints (FKs, uniques, CHECKs in raw SQL) are the last line of defence.

### 5.7 XSS

- React escapes everything by default.
- `dangerouslySetInnerHTML` for content appears only in `src/components/content/RichContent.tsx` (named
  `RenderedContent` in the plan), fed only by sanitised pipeline output (§3.10). ESLint `react/no-danger` is an error
  everywhere else; the two other sites carry a reviewed `eslint-disable` with a reason: the constant pre-paint
  preferences script in `src/app/layout.tsx` and JSON-LD in `src/components/seo/JsonLd.tsx` (script-safe escaping).
- AI responses are untrusted input and use the strict pipeline profile.
- Response headers: `Content-Security-Policy` with at least `object-src 'none'; base-uri 'self'; frame-ancestors
  'none'; form-action 'self'`; script policy (nonce on dynamic routes vs hashes on static routes) decided in Phase 17.
  Also `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS.
  *As built:* `next.config.ts` sends a CSP **without nonces** (`script-src 'self' 'unsafe-inline'`, no third-party
  origins) so public pages stay static and CDN-cacheable; nonce hardening for the authenticated areas is an open
  decision (STATUS.md). HSTS is also sent on plain-http responses (ignored by browsers).
- User-uploaded SVG is never served inline from our origin.

### 5.8 SQL injection

Prisma for all queries. Raw SQL only through `$queryRaw` / `$executeRaw` tagged templates. `$queryRawUnsafe` and
`$executeRawUnsafe` are banned by an ESLint `no-restricted-properties` rule. Dynamic sort fields are allow-listed
enums, never strings interpolated into SQL.

### 5.9 Uploads

See §3.11: magic-byte sniffing, re-encoding, size and dimension caps, private buckets with short signed URLs, random
keys, no inline SVG.

### 5.10 Audit logging

`audit(actor, action, target, diff)` from `lib/audit` writes `AuditLog` for: staff role grants and revokes, staff
logins, content publish and archive, syllabus version publish, plan and price changes, promo codes, manual
entitlement grants, refunds, settings and kill-switch changes, bulk imports, school membership changes, data exports,
account deletions, admin views of individual student records, and break-glass access. Diffs are PII-redacted. The app
database role gets `INSERT` and `SELECT` only on `AuditLog` (raw SQL grant), so entries are append-only.

### 5.11 Secrets

- `src/server/lib/env.ts` validates all environment variables with Zod at boot; the process refuses to start with
  missing or unsafe values (e.g. `PAYMENTS_ENABLED_PROVIDERS` containing `sandbox` in production).
- Only `NEXT_PUBLIC_APP_NAME` and the public app URL are exposed to the client.
- Production secrets live in the cloud secret manager, separate per environment, rotated on staff changes.
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` is set explicitly so all web replicas can decrypt each other's Server Action
  payloads.
- Every module that touches secrets or the DB starts with `import "server-only"`.

### 5.12 PII minimisation for minors

Most students are minors. Collect the minimum and keep it out of logs, prompts and public surfaces.

| Data | Collected? | Notes |
|---|---|---|
| Display name | Yes | Surname optional |
| Email and/or phone | At least one | For login and OTP only |
| Form/year, board, subjects, target exam, ability, target grade | Yes | Needed for §5 onboarding |
| School | Optional | Required only for school accounts |
| Date of birth | No | Form/year is a sufficient age proxy; an "under 18" flag drives consent flows |
| Gender, national ID, address, photo | No | Not needed |

- Leaderboard display defaults to an auto-generated username; real name is opt-in (§20).
- Shareable results contain first name (optional), subject, level and score only, behind a revocable token (§46).
- Logs carry user ids, never names, emails, phone numbers or answer text. Phone numbers are masked in admin lists.
- AI prompts carry a compact learning summary (board, subject, topic, mastery band, recent mistakes), never name,
  school or contact details (§6.3).
- Solver images are re-encoded to strip EXIF.
- **TBC (legal):** Zimbabwe's Cyber and Data Protection Act [Chapter 12:07] requirements for processing children's
  data (parental consent flow for under-18s) and for cross-border transfer (hosting outside Zimbabwe, §10; AI processing
  by Anthropic in the US). Also confirm the Anthropic API data-retention settings for the account.

### 5.13 Data retention and deletion

| Data | Retention |
|---|---|
| Expired sessions | Purged 30 days after expiry |
| OTP codes | Purged 24h after expiry |
| Rate-limit buckets | Purged after their window |
| Solver images | 30 days (conversation text kept) |
| AI messages | 12 months, then content deleted (metering rows kept) |
| WhatsApp message bodies | 90 days (metadata kept for billing and dedupe) |
| Learning history (attempts, mastery) | Life of account; anonymised on deletion |
| Payments and payment events | Statutory accounting period (assume 6 years, TBC with accountant) |
| Audit log | 2 years (payments-related entries follow payment retention) |

**Account deletion** (full, authoritative list in §4.13): request, 14-day grace (cancellable), then
`accounts.deleteUser`: delete sessions, OAuth links, channel identities, AI conversations and messages, solver images
and parent links; null out name, email and phone; set `deletedAt`. Learning history stays attached to the anonymised
id for aggregate statistics. Payments keep an anonymised reference. **Data export:** JSON of profile, enrolments,
attempts, progress, plan, flashcards and AI conversations. *As built:* see the note at the end of §4.13 (privacy
requests, deletion, export and the solver-photo / AI-text purges landed on 2026-10-07; the audit-log age purge is not
built).

---

## 6. AI architecture (§14, §15, §40, §41)

### 6.1 Principles

1. All model calls go through `src/server/ai`. Routes never import the Anthropic SDK (CLAUDE.md rule 10).
2. Without `ANTHROPIC_API_KEY` every AI feature returns an explicit "AI is not configured" result (§6.8). Never
   fabricated output.
3. Cheap by construction: route by task, cap tokens, cache prefixes and generic answers, send minimal context.
4. Pedagogy over answers: the tutor teaches by default (§14) and separates "Teach me" from "Give me the answer" (§15).
5. AI never publishes educational content (§41) and never silently decides a low-confidence mark.

### 6.2 Model routing tiers

The routing table is **admin-configurable** in `Setting` `ai.routing` (Zod-validated JSON: task type to tier, model,
effort, `max_tokens`, cacheable). Code ships defaults only to seed that setting. Prices are in `Setting` `ai.pricing`
so metering survives price changes.

| Tier | Model | Price in / out per MTok | Tasks | Effort / thinking | `max_tokens` caps |
|---|---|---|---|---|---|
| FAST | `claude-haiku-4-5` | $1 / $5 | Intent classification ("teach me" vs "give me the answer"), topic identification, short answers, WhatsApp micro-explanations, conversation summaries | No `effort` parameter (not supported on Haiku 4.5); no thinking | 150 (classify), 400 (micro-explanation) |
| STANDARD | `claude-sonnet-5-5` | $2 / $10 | Default tutor and solver conversations; AI-assisted marking of short and structured answers | `effort: "low"` for chat; `"medium"` for marking (default is `high`, so always set it) | 1,500 (tutor turn), 2,500 (solver), 1,000 (marking) |
| DEEP | `claude-opus-5-5` | $4 / $20 | Hard multi-step maths and science reasoning, essay marking, admin content-generation drafts | Thinking cannot be disabled; depth via `output_config.effort` (`low`..`max`, default `medium`), set explicitly per task | 4,000 (reasoning), 3,000 (essay marking), 16,000 (generation, streamed) |

**Escalation STANDARD to DEEP** happens when the plan has the `ai_deep` entitlement (§31 PREMIUM "advanced AI") and
either the classifier labels the problem "hard multi-step" (A-Level maths, physics, chemistry) or the student presses
"Think harder" (counts as 2 messages against quota). Caches are model-scoped, so the tier is chosen **per conversation**
and kept sticky; a per-turn switch would forfeit the cached prefix.

### 6.3 Request pipeline

```
 1 auth            requireUser; assertEntitlement(actor, "ai_tutor" | "ai_solver")
 2 kill switch     Setting ai.enabled + per-feature flag (tutor, solver, marking, generation, whatsapp)
 3 limits          per-minute rate limit; AiUsageDaily vs plan quota (messages, tokens, images) -> reserve
                   conversation limits: max turns per conversation, max input chars, 1 image per message
 4 intent          FAST tier, structured output: { intent: TEACH_ME | GIVE_ANSWER | CHECK_MY_WORK |
                   EXPLAIN_CONCEPT | OFF_TOPIC, subjectGuess, topicGuess, difficulty }
                   skipped when the UI already supplies the mode (buttons)
 5 context build   compact student summary (~200 tokens): board, qualification, subject, current topic,
                   mastery band, last 3 mistakes, target grade, days to exam. Plus topic key facts from our
                   own published lessons (capped ~800 tokens). Last 8 turns + FAST-tier rolling summary.
                   Never name, school, contact details or full history.
 6 response cache  only EXPLAIN_CONCEPT with no student-specific context:
                   key = sha256(normalised question + subjectId + qualificationId + mode + model + promptVersion)
                   hit -> return (metered as a cache hit, counts as a message, zero tokens)
 7 route           Setting ai.routing -> model, effort, max_tokens
 8 assemble        [frozen system prompt, versioned, cache_control] -> [student context block, cache_control]
                   -> [history] -> [new message / image]. Nothing volatile (timestamps, ids) before the last
                   breakpoint. Min cacheable prefix: 512 tokens on Sonnet 5.5 / Opus 5.5; 4,096 on Haiku 4.5
                   (FAST prompts are kept small instead of relying on caching).
 9 call            streaming for tutor and solver (SSE to the client); structured outputs
                   (output_config.format) for classification, marking and generation (no assistant prefill,
                   no forced tool_choice on these models); vision via base64 image blocks (solver);
                   refusal fallback on STANDARD/DEEP: fallbacks: "default" + beta server-side-fallback-2026-07-01;
                   SDK retries 2; per-route timeouts
10 meter           usage {input, output, cache_creation, cache_read} -> costMicros via ai.pricing ->
                   AiMessage row + AiUsageDaily upsert (settle the reservation) + global daily spend counter.
                   A client abort still records the tokens streamed so far.
11 safety          stop_reason "refusal": supportive safe message, category logged, no retry loop;
                   "max_tokens": mark truncated, offer "continue"; fallback block: record the serving model
12 persist         AiConversation / AiMessage (owner-only), model, tier, promptVersion, latency, tokens, cost;
                   write the response cache entry when cacheable
```

Spend guard: when the global daily spend counter passes the configured daily ceiling, requests are refused with
`AI_UNAVAILABLE` (`reason: "budget"`) until the next platform day. *As built:* the trip is all-or-nothing (no
free-plans-first tiering) and is only **logged** ("AI daily budget reached"); no notification reaches SUPER_ADMIN yet
(wire an alert on that log line, `docs/DEPLOYMENT.md` §9).

### 6.4 Pedagogical policy (§14, §15)

| Mode | Trigger | Behaviour |
|---|---|---|
| Teach me (default) | Default for tutor and solver | Hint ladder below; asks the student to attempt each step |
| Give me the answer | Explicit button or classified intent | Full worked solution **with** steps, formulas and reasoning (never a bare final answer), then 1–2 similar questions from our bank (or AI-generated ones labelled "unreviewed") |
| Check my work | Student pastes working | Identifies the first error, explains the misconception, does not rewrite the whole solution |

**Hint ladder** (one level per student turn unless they ask to skip): L0 restate the question and identify the
concept; L1 explain the concept and relevant formula; L2 break the problem into steps and give the first; L3 work the
next step together and ask the student to finish; L4 reveal the full solution and explain the mistakes made, using
the student's last 3 recorded mistakes.

**Reveal rules**

- Full answers are allowed after an explicit request, or after the student has attempted or gone through 2 hint levels.
- **Never during an active timed exam or assessment attempt** (tutor and solver are disabled while one is in progress).
- Teacher assignments carry an AI-help setting: none, hints only, or full.
- Level- and board-appropriate language: O-Level vs A-Level depth, ZIMSEC vs Cambridge command words and notation.
- Off-topic requests are redirected to study. Safeguarding disclosures get a supportive response with helpline
  information configured in `Setting` `safety.helplines` (not hard-coded).
- Every AI surface is labelled "AI tutor: can make mistakes".

### 6.5 AI marking flow

```
 answer submitted
   -> deterministic types (MCQ, true/false, numerical with tolerance/units, matching, fill-in-blank,
      diagram labelling): pure `marking` -> score now
   -> open types (short answer, structured, calculation working, essay, extended response):
        STANDARD (short/structured, effort medium) | DEEP (essay/extended, effort medium)
        input: stem, OUR OWN mark-scheme points (pointId, description, marks), max marks, board command-word
               guidance, student answer
        structured output: { points: [{ pointId, awarded, evidence /* quote from answer */ }],
                             feedback, misconceptions[], confidence /* 0..1 */ }
   -> Zod validate; total recomputed IN CODE (model's sum ignored); clamp to max; unknown pointIds rejected
   -> confidence >= Setting ai.marking.minConfidence (default 0.75) -> MARKED (labelled "AI-marked")
      confidence <  threshold, invalid output, refusal                 -> NEEDS_REVIEW (provisional score shown)
   -> NEEDS_REVIEW queue: the class teacher (assignments) or the content team; overrides are stored with the
      reviewer and reused as an evaluation set for prompt changes
```

- Practice answers are marked synchronously (20s timeout, then the `ai.mark` job). Mock exam submissions are marked
  by `ai.mark` jobs. Essay marking for mocks can use the Message Batches API (50% cheaper) when results are not needed
  within the hour; the `fallbacks` parameter is not accepted on Batches, so refusals there go to NEEDS_REVIEW.
- **Without an API key**, open types switch to self-assessment: the student sees the mark scheme and awards their own
  marks, recorded as SELF_ASSESSED and weighted lower in mastery.
- **Minors without guardian consent for AI processing** (REFUSED / WITHDRAWN; PENDING while
  `privacy.minorAiConsentRequired` is on; `src/server/family/consent-gate.ts`): the `ai.mark` job never sends their
  answers to the model; they take the same no-AI path (self-assessment for their own written work, otherwise human
  review), as if AI were not configured for that student.

### 6.6 Content generation flow (§41)

```
 /admin/ai/generate (CONTENT_EDITOR+): syllabus version + topic + learning objectives + content type
   (lesson draft, MCQs, practice questions, flashcards, hints, explanations, study-plan templates) + count + difficulty
   -> AiGenerationJob (QUEUED, cost estimate shown, per-editor daily budget checked)
   -> worker ai.generate: DEEP tier, effort medium, streamed, structured output schema per content type
   -> Zod validation; near-duplicate check against the bank (pg_trgm similarity > 0.8 is flagged)
   -> rows created as DRAFT, aiGenerated = true, ContentSource = AI (model, prompt version, job id)
   -> review queue: DRAFT -> IN_REVIEW -> APPROVED (reviewer != generator; checklist: answer independently
      verified, notation, syllabus alignment, originality) -> PUBLISHED by a human
```

- There is no code path from AI output to PUBLISHED: `content.publish()` requires APPROVED status and a human actor,
  and an integration test asserts it.
- Prompts forbid reproducing past-paper questions or textbook text and ask for original items (§27).
- Large jobs may use the Batch API (50% cheaper) when turnaround allows.

### 6.7 Cost model

Assumptions: prices above; prompt-cache reads at $0.10 (Haiku 4.5), $0.20 (Sonnet 5.5), $0.20 (Opus 5.5) per MTok;
5-minute cache writes at 1.25x input price. Token counts are estimates (tokenizers differ by model) to be replaced by
metered data in Phase 9. Image tokens are roughly width x height / 750, about 1,600 for a 1,280 x 960 photo.

**Tutor turn, warm cache** (turn 2+ of a conversation): 3,000 cached input tokens (1,500 system + 300 student context
+ 1,200 history), 500 new tokens written to cache (previous reply + new message), 500 output tokens.

| Tier | Input cost (tokens x $/MTok) | Output cost (tokens x $/MTok) | **Per turn** | Notes |
|---|---|---|---|---|
| FAST (Haiku 4.5) | 3,500 uncached x $1 = $0.0035 | 500 x $5 = $0.0025 | **$0.0060** | Prefix below Haiku's 4,096-token cache minimum, so nothing caches |
| STANDARD (Sonnet 5.5) | 3,000 x $0.20 + 500 x $2.50 = $0.00185 | 500 x $10 = $0.0050 | **$0.0069** | Default tutor |
| DEEP (Opus 5.5) | 3,000 x $0.20 + 500 x $5.00 = $0.0031 | 500 x $20 = $0.0100 | **$0.0131** | At 1,200 output tokens (medium effort, more thinking): **$0.0271** |

So moving the tutor from Sonnet to Haiku saves almost nothing at this prompt size. The levers that matter are quotas,
context size, the response cache and keeping DEEP for escalations.

| Task | Tier | Token assumption | Est. cost |
|---|---|---|---|
| Intent classification | FAST | 400 in / 50 out | $0.0007 |
| WhatsApp micro-explanation | FAST | 600 in / 250 out | $0.0019 (cache hit: $0) |
| Solver with photo | FAST classify + STANDARD solve | 1,500 cached + 1,800 in (image + text) / 1,200 out, plus 1,900 in / 100 out classification | $0.0159 + $0.0024 = **$0.018** |
| Short / structured answer marking | STANDARD | 800 cached + 700 in / 600 out | $0.0076 |
| Essay marking | DEEP | 1,000 cached + 2,000 in / 2,500 out | $0.058 (Batch API: ~$0.029) |
| 10 MCQ drafts | DEEP | 3,000 in / 6,000 out | $0.132 (~$0.013 per question) |

**Illustrative month at 100k registered students** (assumption: 25k AI-active students, each 60 tutor turns,
5 solver photos, 20 AI-marked answers): 25k x (60 x $0.0069 + 5 x $0.018 + 20 x $0.0076) = 25k x $0.656 ≈
**$16,400 / month**, about **$0.66 per AI-active student**. Implications: plan quotas (owner-set, §31) should keep
expected AI cost within a fixed share of each plan's price; the FREE plan needs a small daily cap (e.g. 3 tutor
messages); the response cache and FAST-tier WhatsApp answers carry the free funnel.

### 6.8 Without an API key

*As built:* the gateway (`src/server/ai/gateway.ts`, using `client.ts`) checks the key at call time and throws
`AppError("AI_UNAVAILABLE", AI_NOT_CONFIGURED_MESSAGE, { details: { reason: "not_configured" } })` (HTTP 503; there is
no separate `AI_NOT_CONFIGURED` code). The kill switch and the daily budget use the same code with `reason:
"kill_switch"` / `"budget"`. UI shows "AI is not configured". AI marking falls back to self-assessment (§6.5); content
generation is refused. Before all of these, the platform flag `features.ai` (§3.14, off since 2026-10-07) refuses every
call with `reason: "feature_off"` (`isAiSwitchedOff` / `isAiOff`), and the AI routes themselves return 404. No canned, cached or placeholder answers are ever shown as if they came from the model;
`src/server/ai/gateway.test.ts` asserts this. Every AI test runs against `src/server/ai/testing/fake-transport.ts`: the
pipeline has **never been run against the live API** (no key on the development machine).

### 6.9 Prompt management and evaluation

Prompts are versioned TypeScript constants next to the feature that uses them, each with a `*_PROMPT_VERSION`
stored on every `AiMessage`: `src/server/ai/policy.ts` (tutor), `src/server/ai/intent.ts`, `src/server/ai/marking.ts`,
`src/server/solver/core.ts`, `src/server/cms/ai-drafts/prompts.ts` (there is no `ai/prompts/` folder). Golden sets
(human-reviewed NEEDS_REVIEW items for marking, tutor transcripts graded against §6.4) are **not built yet**; until
they exist, prompt or model changes are checked by hand on staging. `/admin/ai/usage` shows usage and spend.

---

## 7. Payments architecture (§31, §32)

### 7.1 Provider adapter interface

```ts
interface PaymentProvider {
  readonly id: "paynow" | "stripe" | "sandbox";
  supports(currency: string, method?: PaymentMethod): boolean;
  createCheckout(input: {
    paymentId: string; amountMinor: number; currency: string; description: string;
    payer: { email?: string; phone?: string }; method?: PaymentMethod; // "ecocash" | "onemoney" | "card" | ...
    returnUrl: string; webhookUrl: string;
  }): Promise<
    | { kind: "redirect"; url: string; providerRef: string; pollUrl?: string }
    | { kind: "mobile_prompt"; instructions: string; providerRef: string; pollUrl?: string }
  >;
  verifyWebhook(req: { headers: Headers; rawBody: string }): Promise<VerifiedProviderEvent | null>; // null = reject
  poll(payment: { providerRef: string; pollUrl?: string }): Promise<ProviderStatus>;
  refund(input: { providerRef: string; amountMinor: number; reason: string }):
    Promise<{ status: "REFUNDED" | "PENDING" | "MANUAL_REQUIRED"; providerRef?: string }>;
}
```

| Provider | Use | Notes |
|---|---|---|
| Paynow | Zimbabwe: EcoCash, OneMoney (USSD push via mobile express checkout), ZimSwitch, Visa/Mastercard (web redirect). USD and ZiG (ZWG). | Status via result-URL POST (hash-verified with the integration key) **and** poll URL. Separate integration credentials per currency are likely (TBC). Refunds assumed manual (`MANUAL_REQUIRED`) until confirmed. |
| Stripe | International cards (USD, ZAR, ...) and auto-renewal | Stripe does not onboard Zimbabwe-registered businesses: needs an entity in a supported country (TBC owner). |
| Sandbox | Dev and test | `/dev/sandbox-pay/[paymentId]` with Approve / Decline / Cancel / Delay; sends signed webhooks. Boot fails if enabled in production. |

New providers (other African mobile money, §53) are added by implementing the interface; nothing outside
`src/server/billing/providers/*` changes.

### 7.2 Payment state machine (§32)

```
             verified "paid" (amount + currency match)
   PENDING ───────────────────────────────────────────▶ SUCCESSFUL ── full refund recorded ──▶ REFUNDED
     │  │                                                    ▲
     │  └── provider declined / error ──▶ FAILED ────────────┤  late verified "paid":
     │                                                       │  allowed, fulfils, alerts admin
     └── user cancel / no confirmation in 24h ──▶ CANCELLED ─┘
```

- Spec states only: PENDING, SUCCESSFUL, FAILED, REFUNDED, CANCELLED. Expiry is CANCELLED with a reason.
- A **verified** provider "paid" event always wins (money was received): FAILED or CANCELLED can move to SUCCESSFUL,
  which fulfils the order and alerts an admin. Nothing else leaves a terminal state.
- `transition(current, event)` is a pure, unit-tested function. Every transition appends a `PaymentEvent` (provider
  event id, type, signature validity, redacted raw payload, received time).
- Payer and beneficiary may differ (a parent paying for a child, a school paying for seats).

### 7.3 Idempotency

| Risk | Control |
|---|---|
| Double tap / retry on a flaky network creates two checkouts | `Idempotency-Key` from the form: unique (payer, key); a retry returns the same Payment |
| Duplicate or replayed webhooks | Unique (provider, providerEventId) on PaymentEvent **among signature-verified rows only** (partial unique), so a forged unsigned callback is stored for investigation but can never claim the key; for Paynow, which sends no event id, a synthetic id = hash(reference + status + paynow reference) |
| Concurrent webhook + poll | Process inside a transaction with `SELECT ... FOR UPDATE` on the Payment row |
| Double fulfilment | Subscription period extension and EntitlementGrant keyed uniquely by paymentId |
| Tampered amounts | Amount and currency always come from our Payment row and are compared with the provider's; mismatches go to manual review |
| Return URL abuse | The return page never fulfils; it only polls status. Fulfilment happens on a verified webhook or poll |

### 7.4 Reconciliation

- *As built:* `payments.reconcile` every **10 min** (`src/server/billing/reconcile.ts`): poll PENDING payments; mark
  those past their expiry (`PENDING_PAYMENT_TTL_HOURS`) CANCELLED (expired) unless the provider reports them paid.
- *Not built:* the daily comparison with the provider's settlement report (Paynow statement upload) and mismatch
  alerts.
- *Not built:* USD normalisation. Revenue in `DailyMetric` is stored and shown **per currency**; the planned
  admin-entered ZWG rate (`fx.ZWG_USD`) does not exist. ZWG prices are set by admins per PlanPrice, never
  auto-converted.
- Paynow and Stripe adapters are covered by unit tests with recorded/forged payloads and the sandbox provider; neither
  has been exercised against the real provider yet (STATUS.md).

### 7.5 Subscriptions and one-off purchases

**Pricing model (owner decision 2026-10-07): a free preview plus ONE paid plan, "Full access", bought with a single
one-off payment (seeded at USD 1.00 in every environment, editable in /admin/plans), lifetime, no renewal.** FREE keeps
the free-preview lessons, the daily question, the diagnostic, the exam countdown, 15 practice questions a day and 2 topic
tests a week; FULL_ACCESS adds every lesson, unlimited practice and topic tests, mock exams, flashcards, the study plan,
detailed analytics and parent reports (no AI: AI is switched off). STUDENT / PREMIUM / SCHOOL are retired (inactive, not
public; rows kept for history; running subscriptions keep their access until they end). Buyers see USD prices only for
now (`OFFERED_CURRENCIES`, `src/lib/billing/offer.ts`); other price rows stay hidden. Payment is through Paynow only
(EcoCash / OneMoney mobile prompt, cards on the Paynow page; the sandbox in development).

How lifetime access is modelled (chosen against the database rules): a ONE_OFF plan price is paid by a Payment with
purpose `PLAN_PURCHASE` (CHECK: planPriceId + beneficiaryUserId, no subscription, no study pack) and fulfilled as exactly
one `EntitlementGrant(source PURCHASE, planId, paymentId)` with `endsAt NULL` (a price with `periodDays` N gives an N-day
pass instead). A Subscription was rejected because `Subscription_live_period_chk` requires a period end for every ACTIVE
subscription, and prepaid periods renew, expire and send reminders. Guarantees: `Payment.fulfilledAt` is write-once and
the grant's `paymentId` unique (duplicate webhooks / polls fulfil once); fulfilments per (beneficiary, plan) are
serialised and a partial unique index allows one unrevoked lifetime purchase per (user, plan), so a second payment
confirmed in parallel is left NEEDS_REVIEW for a refund; checkout refuses a beneficiary who already owns lifetime access
(CONFLICT); a parent pays for an ACTIVE-linked child (beneficiary = child); a full refund (admin or provider-reported)
revokes the grant. The grant references the plan (no copied document): buyers follow the plan's current entitlements.
Code: `src/server/billing/purchases.ts` (fulfilment, ownership), `src/server/billing/offer.ts` (the offer and the "Unlock
everything for <DB price>" prompts provided by the /app layout), `src/server/billing/checkout.ts`.

- Plans are data with feature flags and limits (§31). PlanPrice holds currency, amount in minor units and billing
  interval (month, year, school term or one-off, as data).
- Mobile money has no reliable card-style recurring debit, so subscriptions are **prepaid periods**: each SUCCESSFUL
  payment extends `currentPeriodEnd`; reminders go out 7 days and 1 day before expiry; a short grace period follows.
  Stripe can auto-renew where available.
- School subscriptions (§53 B2B and B2B2C) carry a seat count; active student members of the school consume seats.

### 7.6 Entitlement resolution

`resolveEntitlements(sources, now)` is a pure function; `assertEntitlement(actor, "mock_exams")` wraps it (CLAUDE.md
rule 9). Sources, in order:

1. **Own subscription** with status ACTIVE and `now < currentPeriodEnd + grace`.
2. **School subscription** through an active SchoolMember / ClassMember of a school whose SCHOOL subscription is
   active and has a free seat.
3. **EntitlementGrants**: admin grants, promo codes, referral rewards, study-pack purchases; each optionally scoped
   (e.g. one subject + qualification for a study pack, §24) and with an expiry.
4. **FREE plan** defaults.

Feature flags are the union of all applicable sources; numeric limits take the maximum. Results are memoised per
request and cached for 60s per user, and the cache is cleared on payment, subscription and grant changes. Example
keys: `lessons.full`, `practice.unlimited`, `mock_exams`, `flashcards`, `study_plan`, `ai_tutor`, `ai_deep`,
`analytics.advanced`, `teacher_dashboard`, `school_analytics`; limits `ai.messagesPerDay`, `ai.solverImagesPerDay`,
`practice.questionsPerDay`.

**Only enforced features are advertised (§31, §50).** `src/server/marketing/plan-features.ts` is the one mapping from
entitlement keys to buyer-facing words (/pricing, /schools, plan cards, the home teaser, the billing summary and the
study-pack pages). Its `UNBUILT_FEATURES` lists keys that stay in the contract but gate nothing, so they are never
shown: `pdfExport` (PDF export is not built) and `personalisedLearning` (adaptive selection, adaptive difficulty and
plan adaptation are core for every plan, so there is no premium-only extra to gate). `advancedAnalytics` gates the
"Detailed analytics" section of `/app/progress`; `parentReports` is checked on the CHILD's entitlements for the
parent's detailed report sections and the weekly digest.

Promo codes discount a checkout or grant free days. Referral rewards (§46) are EntitlementGrants issued when the
referred user's first payment succeeds, capped per referrer and checked against the same phone or payer.

---

## 8. WhatsApp architecture (§30)

**Switched off** (owner decision 2026-10-07, `features.whatsapp`; §3.14): the webhook answers 404, the settings page
and its actions are 404 / NOT_FOUND, jobs and outbound sends are no-ops and the Graph API is never called. The code stays
for when the owner switches it back on.

Architecture and adapter are built (Phase 16; `src/server/whatsapp/`, operator guide [WHATSAPP.md](WHATSAPP.md)).
Going live needs Meta Business verification, a WhatsApp number and approved message templates (TBC owner); nothing
has been exchanged with the real Cloud API yet. Jobs: `whatsapp.process` (inbound), `whatsapp.send` (outbound),
`whatsapp.purge` (retention). The command examples below call the attempt engine and the tutor service; the exact
function names differ from the Phase 1 sketch.

```
 Meta ── GET  /api/webhooks/whatsapp ─▶ hub.verify_token matches WHATSAPP_VERIFY_TOKEN ─▶ echo hub.challenge
 Meta ── POST /api/webhooks/whatsapp
          1 verify X-Hub-Signature-256 = HMAC-SHA256(WHATSAPP_APP_SECRET, raw body), constant-time compare
          2 dedupe: insert ChannelMessage (unique channel + providerMessageId); duplicates ignored
          3 status callbacks (sent / delivered / read / failed) update outbound ChannelMessage rows
          4 enqueue whatsapp.process; respond 200 immediately
 worker   5 identity: ChannelIdentity by wa_id (E.164)
             unlinked -> only HELP, LINK and a sample question
             LINK: the user requests a link code in /app/settings/whatsapp (OTP, purpose LINK_WHATSAPP) and
                   sends "LINK 123456" from WhatsApp; or sends their registered phone/email and receives an OTP
                   by SMS/email, then replies with it
          6 state: ChannelConversationState (IDLE | AWAITING_ANSWER(attemptId) | AWAITING_LINK_CODE, expiresAt)
          7 command router: deterministic keywords first, FAST-tier intent only for free text (quota-limited)
          8 call the SAME services as the web app, as the linked user
          9 outbound: ChannelMessage (QUEUED) + whatsapp.send job -> Cloud API, retry with backoff
```

| Command (examples) | Service call | Reply |
|---|---|---|
| "Give me today's study question", "QUESTION", "DAILY" | `practice.getDailyQuestion(actor)` creates an attempt | Question text (or image) + options; state AWAITING_ANSWER |
| "A" / "B" / "C" / "D", a number, short text while AWAITING_ANSWER | `practice.submitAnswer(actor, attemptId, answer)` | Correct/incorrect + short explanation + link to the lesson |
| "Explain photosynthesis" | `ai.explain(actor, { channel: "whatsapp", tier: FAST, maxTokens: 400 })`, response cache first | Concise explanation + link |
| "HELP" | — | Menu |
| "STOP" / "START" | `whatsapp.setOptOut` | Confirmation; no proactive messages while opted out |

- **24-hour window:** free-form replies are allowed only within 24h of the user's last inbound message
  (`ChannelIdentity.lastInboundAt`). Outside it, only approved **template** messages (daily question reminder, streak
  reminder) to users who opted in. Templates are billed by Meta (rates TBC).
- Maths over WhatsApp: only questions flagged channel-safe (readable as plain text with Unicode) are sent as daily
  questions; others are excluded until server-side question images exist.
- Answer marking, mastery, streak and XP updates are identical to the web, so WhatsApp activity counts everywhere.

---

## 9. Performance and scalability plan (§38)

### 9.1 Capacity assumptions

| Quantity | Assumption | Derived |
|---|---|---|
| Registered students | 100k design point; 300k headroom | — |
| Daily active | 20% of registered | 20k DAU |
| Evening peak (18:00–22:00 CAT) | 40% of daily activity, 30 min average session | ~1,000 concurrent |
| Exam season (ZIMSEC June and November; Cambridge May/June and Oct/Nov) | 3x | ~3,000 concurrent |
| Request rate | One dynamic request per active user every ~10s | ~100 req/s peak, ~300 req/s in exam season. Target: 500 req/s dynamic, 2,000 req/s cached |
| QuestionAttempt writes | 30 answers per DAU per day | 600k rows/day, ~220M rows/year; peak ~17/s (exam season ~50/s): easy for one primary |
| QuestionAttempt storage | ~500 B per row including indexes | ~110 GB/year |
| AssessmentAttempt | 2 per DAU per day | 40k/day |
| FlashcardReview | 10% of DAU x 30 | 60k/day |
| AiMessage | 5k AI users/day x 10 | 50k/day |
| Database size, year 1 | — | ~150–200 GB |

**Service objectives:** answer submission p95 under 300 ms server time; dashboard TTFB p95 under 500 ms; public pages
from CDN under 100 ms TTFB in Harare; LCP under 2.5s on a mid-range Android over a slow 4G profile.

### 9.2 Indexing strategy

- Every FK covered by an index whose leading column is the FK (Postgres does not index FKs automatically).
- Composite indexes for real query shapes: per-user timelines `(userId, createdAt)`, per-attempt questions
  `(attemptId, position)`, selection queries `(topicId, status, difficulty)`.
- Partial indexes where most rows are irrelevant: `WHERE status = 'PUBLISHED'`, pending jobs, active sessions (raw SQL).
- BRIN on `createdAt` for large append-only tables (QuestionAttempt, AuditLog, ChannelMessage, PaymentEvent).
- GIN for FTS and trigram (§3.9).
- `pg_stat_statements` on; slow-query log above 200 ms; a PR adding a hot query includes its `EXPLAIN (ANALYZE)`.

### 9.3 Read rollups

Dashboards (§6, §7, §21–§23) read rollup rows (one per user, subject or topic), never aggregates over raw attempts at
request time. Class views aggregate SubjectProgress/TopicMastery for at most a few hundred students. School-wide
analytics and §35 metrics come from nightly jobs (§3.7).

### 9.4 Pagination

Cursor-based everywhere: `ORDER BY createdAt DESC, id DESC` with an opaque cursor (UUIDv7 ids are time-ordered).
API max page size 100, UI 50. Admin tables use cursors plus filters; offset pagination only for small bounded sets.

### 9.5 Connection pooling

- One `pg` pool per process (`DATABASE_POOL_MAX`, default 10).
- Production goes through PgBouncer in transaction mode or the managed equivalent (RDS Proxy, Supavisor), so 10 web
  replicas x 10 plus workers never exhaust `max_connections`.
- Transaction pooling breaks session features, so `LISTEN/NOTIFY`, the scheduler's advisory lock and migrations use
  a **direct** URL (`DATABASE_URL_DIRECT`).

### 9.6 Horizontal scaling of web nodes

Web nodes are stateless (sessions, rate limits and jobs in Postgres). Requirements before running more than one:

- Shared `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.
- `deploymentId` set per release (version-skew protection during rolling deploys).
- Shared cache-tag coordination (custom `cacheHandlers` with `refreshTags()`, §3.8).
- Image optimisation cache warmed per node or offloaded to the CDN.
- Graceful shutdown on `SIGTERM` with a 30s drain.

Autoscale on CPU and p95 latency, minimum 2 replicas in production.

### 9.7 Worker scaling

Separate deployment from the same image. `SKIP LOCKED` makes multiple replicas safe. Per-queue concurrency keeps
payments and notifications responsive during AI-marking bursts. Scale on queue depth and oldest-job age.

### 9.8 CDN and images

CDN for `/_next/static` (immutable), prerendered public pages, and media variants. *As built:* images go through
Next's optimiser, but markup comes from `src/lib/images.ts` (same `srcset` as `next/image`, lazy loading, async
decoding) so the `next/image` client component is never shipped; remote images are not allowed (`next.config.ts`).
No video in the MVP. No CDN is configured yet.

### 9.9 Bundle budgets (low bandwidth)

Compressed first-load JavaScript per route, measured from `next build` output and enforced in CI from Phase 17.
Baselines are measured in Phase 5 and the budgets tightened if possible.

| Route class | JS budget (as enforced by `scripts/bundle-budgets.mjs`, gzip) | Other limits |
|---|---|---|
| Public: marketing, SEO, auth pages | ≤ 110 KB (**unreachable**: framework floor ~144 KB; re-baseline pending, STATUS.md) | Total page weight ≤ 300 KB excluding images; no maths JS |
| Student, parent, teacher and school pages, lessons | ≤ 170 KB | Lesson page ≤ 250 KB total excluding images; KaTeX CSS only when the page has maths |
| Exam mode (exam room, diagnostic room) | ≤ 200 KB | Works on a 2 GB RAM Android |
| Admin CMS | ≤ 250 KB | Desktop staff; editors load lazily |
| All routes | — | CSS ≤ 30 KB; one subsetted variable font ≤ 40 KB woff2 with system fallback; no third-party trackers |

Measured on 2026-10-07 (`.next-final` build): public max 163.7 KB (all 30 public routes over), student max 177.7 KB (6
question pages over), exam max 181.6 KB, admin max 191.7 KB; 37 routes over budget in total (36 + the public /guides/[slug] added later). CI runs the script
report-only until the budgets are re-baselined.

**Measuring (2026-10-06).** Next 16 no longer prints "First Load JS" in `next build`; it writes
`<distDir>/diagnostics/route-bundle-stats.json` (uncompressed). `node scripts/bundle-budgets.mjs --dist <distDir>`
gzips each route's chunks, prints the table and exits 1 when a route is over its class budget (the CI gate). Measured
floor on this stack (Next 16.3, React 19.3, Turbopack): ~134 KB gzip of framework runtime on every App Router page plus
~10 KB for the root layout's client islands, so public pages start at ~144 KB (~124 KB brotli) and a ≤ 110–120 KB public
budget is not reachable without leaving the App Router. Rules that keep the rest small: no `next/image` (use
`src/lib/images.ts`), no Zod in Client Components (import constants from zod-free modules, e.g.
`@/lib/questions/constants`, never the `@/lib/questions` barrel), and editors that open on demand load with `next/dynamic`.

### 9.10 Partitioning path for hot tables

When QuestionAttempt passes ~200M rows or its indexes no longer fit in memory: declarative monthly range partitions
via raw SQL migrations, since Prisma does not manage partitions. QuestionAttempt partitions on `attemptId` (UUIDv7
month bounds; its primary key is already `(attemptId, position)`); FlashcardReview, StudySession, AiMessage,
ChannelMessage, Notification and AuditLog on their time column. Keys and prerequisites per table are in §4.14.
Attempts older than 3 years move to cold storage with their aggregates preserved in rollups.

### 9.11 Read replicas (later)

Add one when the primary sustains over 60% CPU or reporting harms OLTP latency. Route `analytics` and school/admin
reports to it through a second Prisma client; everything else stays on the primary.

### 9.12 Load testing

Phase 17: k6 scenarios for an exam-day evening (3,000 concurrent users, mock exam autosave every 30s, practice
answers, dashboard loads) against staging; pass at p95 answer submit under 300 ms with no errors. Repeat before each
exam season. *Not done yet.* What exists: a database-level performance pass on a synthetic launch-scale dataset
(~1.08M question attempts, 27 hot-path scenarios with `auto_explain`) in `scripts/perf/` (README there), which added
the `perf_indexes` migrations. It found `answerAndMark` at ~61 database round trips per answer (≈30–60 ms of network
latency in production against the 300 ms p95 target) — worth batching before exam season.

---

## 10. Deployment architecture

### 10.1 Recommended production topology

```
 Students (Econet, NetOne, Telecel, Liquid; mostly mobile)
        │
 CDN with African PoPs (Cloudflare lists Harare and Johannesburg PoPs; verify) ── WAF, rate limits, TLS
        │
 Load balancer ── cloud region close to users (recommended AWS af-south-1, Cape Town)
        │
 ┌──────┴───────────────┐        ┌──────────────────────────┐
 │ web containers x 2+  │        │ worker containers x 1+   │   same image, different command
 │ next start           │        │ npm run worker           │
 └──────┬───────────────┘        └──────────┬───────────────┘
        │  pooler (PgBouncer / RDS Proxy)    │ direct URL (LISTEN/NOTIFY, scheduler lock)
        ▼                                    ▼
 Managed PostgreSQL 18, Multi-AZ, PITR    Object storage (S3), public bucket behind CDN + private bucket
        │
 Outbound: Anthropic API (US) · email (e.g. SES) · SMS provider · Paynow · Stripe · WhatsApp Cloud API · error tracking
```

Harare to Cape Town round trips are typically a fraction of those to European or US regions, which matters for every
dynamic request over mobile networks.

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| A. AWS af-south-1 (ECS Fargate, RDS PostgreSQL, S3, CloudFront or Cloudflare) | Closest major region; managed Postgres with PITR; mature IaC | Opt-in region, pricier than EU/US regions | **Recommended** (TBC budget; confirm PostgreSQL 18 availability on RDS in-region) |
| B. Azure South Africa North (Johannesburg) | Also close; Postgres Flexible Server | Fewer team defaults | Acceptable alternative |
| C. VPS in South Africa + managed Postgres + Cloudflare | Cheapest | More operations work; weaker PITR and failover | Only for a very low budget pilot |
| D. Vercel (cpt1) + serverless Postgres in Europe | Easy deploys | DB round trips to Europe on every request; worker needs another host | Not recommended |

### 10.2 Decided vs TBC

| Decided | TBC by owner |
|---|---|
| Containerised Node (`output: "standalone"`), one image for web and worker | Cloud provider, account and monthly budget |
| Managed PostgreSQL 18 with PITR and Multi-AZ in production | CDN vendor |
| S3-compatible object storage; public and private buckets | Email and SMS providers |
| CDN in front of everything | Domain name |
| `prisma migrate deploy` as a one-off pre-deploy task (direct URL, migrator DB role) | Paynow merchant account(s) and currencies; Stripe entity |
| Three environments: dev, staging, prod | WhatsApp Business verification and number |
| Structured logs, error tracking, uptime checks, metrics, alerts | Error-tracking vendor (Sentry or self-hosted GlitchTip) |
| Infrastructure as code (Phase 18) | Data residency stance after legal review (§5.12) |

### 10.3 Environments

| | dev | staging | prod |
|---|---|---|---|
| Database | Local PG 18 (`npm run db:start`) | Managed, small | Managed, Multi-AZ, PITR |
| Seed | Catalogue + DEV-ONLY demo content, flagged as demo | Catalogue + curated real content; no demo statistics | Real content only |
| Payments | `sandbox` | Paynow test mode + sandbox | Live providers |
| AI | Optional key; otherwise "not configured" | Own key, low daily budget | Production key, budgets and alerts |
| Messaging | `console` adapters | Real providers to allow-listed recipients | Real |

### 10.4 CI/CD pipeline

*As built:* `.github/workflows/ci.yml` has two jobs — **verify** (`npm ci` → `prisma generate` → migrate both
databases as owner, `app_rw` grants, `prisma migrate diff` drift check, catalogue seed → typecheck → lint → tests on a
Postgres 18 service → `next build` → worker bundle → bundle budgets, report-only) and **image** (build the tools and
runtime images, run the migrate job, smoke-test `/api/health`, `/api/ready`, a public page and the worker). It has
**never run** (no Docker or GitHub runner was used during development). Not built: Playwright smoke at 360px,
dependency audit, deploy stages, IaC.

| Stage | Steps (plan) |
|---|---|
| Pull request | as built above; planned additions: Playwright smoke at 360px with network throttling, dependency audit |
| Merge to `main` | Build image (tag = git SHA = `deploymentId`) → push → deploy to staging → migrate → smoke tests → manual approval |
| Production | Migrate (backward-compatible "expand then contract" migrations only) → rolling deploy web and worker → post-deploy smoke → automatic rollback on failing health checks |

### 10.5 Backups and recovery

PITR (7–35 days), daily snapshots kept 30 days, monthly encrypted logical dump to a separate account. Quarterly
restore drill into staging. Targets: **RPO ≤ 15 min, RTO ≤ 4 h** (TBC with budget).

### 10.6 Observability

| Signal | Implementation |
|---|---|
| Logs | Structured JSON (`lib/logger`) with request id, user id (never PII), route, latency; shipped to the cloud log store |
| Errors | Error tracking with PII scrubbing; source maps uploaded privately |
| Traces | OpenTelemetry via Next `instrumentation.ts` (*not built*; `src/instrumentation.ts` only validates the environment and runs the database boot assertions; no `onRequestError` / error-tracking vendor yet) |
| Uptime | External checks on `/api/health`, `/api/ready` and a public SEO page |
| Metrics and alerts | 5xx rate; p95 latency per route group; DB CPU, connections, slow queries; job queue depth and oldest-job age; payment success rate and PENDING backlog; AI spend per hour vs budget; OTP send volume (abuse signal); webhook signature failures |

### 10.7 Implementation (Phase 18)

Operational detail lives in [DEPLOYMENT.md](DEPLOYMENT.md). Decisions taken while implementing this section:

- **Image targets.** One Dockerfile, one build: `runtime` (web `node server.js` + worker `node worker/index.mjs`, a CMD
  override) and `tools` (migrate job, section D, catalogue seed). The worker is an esbuild bundle
  (`scripts/build-worker.mjs`) rather than `npm run worker`, so SIGTERM reaches it directly and the runtime image
  carries no TypeScript toolchain.
- **Deploy-time database step** `scripts/db-deploy.ts`: migrate as the owner, `scripts/sql/app-role-grants.sql`,
  section D database defaults (`app.*` placeholders need `GRANT SET ON PARAMETER` for a non-superuser owner on
  PostgreSQL 15+), then verification. Section D is no longer only in `.scratch/` (gitignored).
- **Probes.** `/api/health` (liveness, no database) and `/api/ready` (database, shipped migrations applied, section D);
  the app role may read three columns of `_prisma_migrations` for this.
- **Storage.** The `s3` driver (SigV4 over `fetch`, no SDK) uses ONE private bucket; public media is still served by
  `/api/media` with immutable caching for the CDN, instead of the public-read bucket sketched in §3.11.
- **Build-time database.** `next build` prerenders public pages from the database, so image builds get a read-only
  database URL as a BuildKit secret; database-free builds are a follow-up.

---

## 11. Development phases (§49)

Phases overlap where dependencies allow. Every phase ends with the §54 milestone checks: tests, type check, lint,
UI check at 360px, DB integrity, authorization and "the application actually works".

| # | Phase | Concrete deliverables | Exit criteria | Status |
|---|---|---|---|---|
| 1 | Architecture audit | Repository audit, this document, CLAUDE.md conventions, toolchain bootstrap, local Postgres script, Prisma singleton draft | Owner reviews this doc and answers the TBC items; test harness files exist; `tsc` and `eslint` pass on the scaffold | Done (this document; reconciled 2026-10-07) |
| 2 | Database & curriculum architecture | `prisma/schema.prisma` for all slices, initial migration + raw SQL migration (CHECKs, partial uniques, FTS, GIN/BRIN), `src/server/db.ts`, seed (catalogue structure + flagged dev demo content), test factories | `migrate reset` from scratch works; seed idempotent; integration tests for syllabus-version immutability, content status rules and key constraints | Done (7 migrations, idempotent seed, constraint tests) |
| 3 | Authentication & onboarding | Register/login (email-based since 2026-10-07: email or school username + password, emailed codes), OTP, Google OIDC, sessions, guards and permission map, rate limits, audit; onboarding wizard; enrolments pinned to a syllabus version | Tests: authentication, authorization, onboarding, subject selection (§51) | Done; the Resend adapter is not yet verified against the live service |
| 4 | Student dashboard | Dashboard from rollups, countdown from ExamSession, recommended session, honest empty states | Test proves no hard-coded numbers; 360px review | Done |
| 5 | Subject/topic/lesson system | Design-system primitives, content pipeline, lesson pages, subject and topic pages, public SEO pages, sitemap; Cache Components spike | KaTeX renders server-side; sanitiser XSS corpus passes; lesson page within budget | Done; Cache Components spike not adopted (time-based ISR, §3.4) |
| 6 | Question bank | Per-type payload schemas, basic admin editor, deterministic marking for all auto-markable types, flags | Marking unit tests per question type | Done |
| 7 | Practice engine | Session builder, adaptive selection, instant feedback, mastery updates and bands, daily question | Tests: question generation, question marking, progress calculation | Done; daily-question scheduling not built (§3.7) |
| 8 | Mock exams | Assessment definitions, exam mode, server timer, autosave, flagging, submit and auto-submit, grade estimate, results analysis, diagnostic | Tests: exam timer, exam submission, score calculation; keyboard-only exam run | Done |
| 9 | AI tutor | `src/server/ai` pipeline, routing setting, quotas and metering, tutor with streaming, solver with vision, AI marking with structured outputs, kill switch | Tests: AI usage limits, no-key behaviour, metering with a mocked SDK; reveal rules | Built; never run against the live API |
| 10 | Study plans | Pure planner, plan UI, nightly adaptation job | Planner unit tests (exam date, time available, weak topics) | Done |
| 11 | Flashcards / gamification | SRS, offline review sync, streaks (time-zone aware), XP, achievements, leaderboards with privacy modes, share cards, referrals | SRS and streak unit tests (incl. midnight CAT boundaries) | Done; offline flashcard deck not built (§3.13) |
| 12 | Parent / teacher / school | Parent links, classes, assignments, teacher-built tests, announcements, drill-down dashboards, school analytics and reports, rosters | Tests: teacher permissions, parent permissions | Done |
| 13 | Subscriptions / payments | Plans and prices admin, Paynow + sandbox adapters, webhooks, state machine, reconciliation, entitlements, promo codes | Tests: subscription access, state machine, webhook idempotency and signature rejection | Built; Paynow/Stripe never run against real providers; FX normalisation not built |
| 14 | Admin CMS | All §36 sections, review workflow with four-eyes rule, bulk import, AI generation UI, audit viewer | Tests: admin permissions, import validation; no AI path to PUBLISHED | Done; FAQ, testimonial and daily-question calendar editors and the `/admin/jobs` dead-letter page added 2026-10-07 |
| 15 | Analytics | `DailyMetric` job, admin funnel (§35), school analytics | Metrics computed from fixtures match expected values | Done; revenue per currency only |
| 16 | WhatsApp architecture | Webhook, signature check, dedupe, identity linking, command router, outbound queue, window rules | Tests: signature, dedupe, linking, router; end-to-end against Meta's test number | Built; not run against Meta |
| 17 | Performance / security hardening | Load tests, CSP, security review, Playwright mobile and slow-network suites, bundle budgets in CI, partial-index review, restore drill | k6 targets met; zero high-severity findings; budgets green | Partial: perf pass, a11y pass, bundle budgets measured, security review in progress; k6, Playwright, restore drill not done |
| 18 | Production deployment | IaC, CI/CD, monitoring and alerts, runbooks, backups, go-live checklist | Staging sign-off; rollback rehearsed; alerts verified | Partial: Dockerfile, compose, CI, probes, S3 driver, db-deploy written; never run (no Docker); IaC not written |

**MVP slice for the §52 journey:** phases 2, 3, 4, 5, 6, 7, the diagnostic part of 8, 9 and 10 are the minimum for
"create an account, pick board, level and subjects, take a diagnostic, get a report and plan, study, practise, take a
test, see weaknesses, ask the tutor, come back tomorrow". A Playwright test of that journey is the MVP exit criterion.
*As built:* the journey is exercised by `.scratch/journey-smoke.ts` (services + HTTP against a dev server, not a
browser and not in CI); see STATUS.md for the latest run. The "Status" column above was filled in on 2026-10-07.

---

## 12. Risk register

Likelihood and impact: L (low), M (medium), H (high).

### 12.1 Technical risks

| # | Risk | L | I | Mitigation | Owner / status |
|---|---|---|---|---|---|
| T1 | Very new stack (Next 16.3, React 19.3, Prisma 7, Tailwind 4, Zod 4) differs from common knowledge; experimental flags change | H | M | Pin majors; read bundled Next docs; keep experimental flags (`useOffline`) optional; weekly dependency PRs with CI | Engineering / open |
| T2 | Prisma cannot express CHECKs, partial uniques, generated `tsvector`, GIN/BRIN, partitions | H | M | Documented raw SQL migrations; tests assert constraints exist | Schema owner / Phase 2 |
| T3 | Postgres doubles as queue, cache, search and rate limiter and becomes a hotspot | M | M | Queue isolation, monitoring, interfaces with Redis/search exits (§2.2) | Engineering / monitored |
| T4 | Next cache invalidation is per instance; stale pages once scaled out | M | M | Shared `cacheHandlers` with `refreshTags()` before a second web node | Engineering / Phase 17 |
| T5 | Server-authoritative exam timer vs intermittent connectivity frustrates students | M | H | Local-first autosave, outbox sync, grace window with "late sync" flag, clear offline UI | Engineering / Phase 8 |
| T6 | XSS via content, AI output or user text | M | H | Sanitise at write, single `RenderedContent` sink, lint rule, XSS test corpus, CSP | Engineering / Phase 5 |
| T7 | Mobile-money confirmations delayed, missing or duplicated | H | M | Poll + webhook + reconciliation; late-success handling; idempotency (§7) | Billing / Phase 13 |
| T8 | Offline replays create duplicate answers or reviews | M | M | Idempotency keys on every replayable endpoint | Engineering / Phases 8, 11 |
| T9 | Parallel build agents produce inconsistent code or schema | M | M | CLAUDE.md rules, cross-slice name contract, single integrator for shared files | Lead / ongoing |
| T10 | Email deliverability of sign-in codes (spam folders, sender reputation) now that accounts are email-based; SMS is off | M | M | Verified sending domain (SPF/DKIM/DMARC), plain transactional templates, strict OTP limits, Google sign-in as a second way in | Owner + Eng / TBC |
| T11 | Day-boundary bugs (streaks, daily question) | M | L | All day logic in `lib/time` with explicit time zone; tests around midnight CAT | Engineering / Phase 11 |
| T12 | Test harness gap (vitest config references missing files) | H | L | Create `tests/setup.ts`, `tests/global-setup.ts`, stub in Phase 1/2 | Engineering / **closed** (files exist; 474 test files run) |
| T13 | Time-dependent chunking in `read-excel-file` (sheet XML parse halves its chunk size whenever a chunk takes > 7 ms and recurses per chunk) overflows the stack on large cells when the CPU is busy | M | M | Seen once in the full suite under load (`src/server/lib/xlsx.test.ts` "long but legitimate tokens"); passes in isolation. Fix by parsing the sheet without the library's timing-based chunking, or cap cell text well below the current bound | Engineering / open |
| T14 | Concurrent agents editing the same files | M | M | Parallel workflows changed `src/lib/pwa/*`, `src/server/family/consent-gate.ts` and `src/server/accounts/*` while tests and builds ran on 2026-10-07; re-run typecheck and the full suite after every merge | Lead / ongoing |

### 12.2 Copyright and content risks (§27)

| # | Risk | L | I | Mitigation | Owner / status |
|---|---|---|---|---|---|
| C1 | **Past papers and marking schemes** are copyrighted by ZIMSEC and Cambridge (UCLES); reproducing them is infringement | H if unmanaged | H | Never scrape or reproduce. Bank built from original "exam-style" questions; the `year` / `paper` metadata (§9) only describes licensed items or "style of Paper 2". Questions with a past-paper source cannot be published unless a licence is recorded. Owner may pursue licences | Owner (licensing) + content lead / open |
| C2 | **Syllabus documents**: topic structure may be usable with care; verbatim aims, descriptions and assessment objectives are not | M | M | Store structure (topic names, order, codes) with source and syllabus code; paraphrase objectives; link to the official syllabus; legal check of each board's terms before launch | Owner (legal) / TBC |
| C3 | **AI-generated content is wrong** (wrong answer keys, explanations, notation) | H | H | Always DRAFT; four-eyes review with checklist; student flags (§42); QuestionStats flags suspect keys (e.g. very low facility); `aiGenerated` visible to editors | Content lead / Phase 14 |
| C4 | **Textbook plagiarism via AI** (model reproduces copyrighted text) | M | H | Prompts require original wording and forbid "in the style of [book]"; near-duplicate checks; editor attests originality; ContentSource on every item | Content lead / Phase 14 |
| C5 | **Image rights** (diagrams copied from the web) | M | M | MediaAsset requires source, creator and licence; original diagrams by default; review before publish | Content lead / Phase 5 |
| C6 | **Student uploads contain copyrighted papers** (solver photos of past papers) | H | M | Private storage, 30-day retention, never reused as platform content or shown to others; used only to answer that student; legal check of private-study use | Owner (legal) / TBC |
| C7 | Board trademarks ("ZIMSEC", "Cambridge") imply endorsement | M | M | Descriptive use only, no logos, "not affiliated" disclaimer in the footer | Owner / Phase 5 |
| C8 | Fabricated testimonials or statistics (§50, §6 "no fake numbers") | L | H | Testimonial requires consent and a verifiable source; demo data only in dev seed, flagged | Lead / ongoing |
| C9 | SEO pages leak premium content (§44) | M | M | Public pages render only outline, samples and explicitly public guides; review checklist | Engineering / Phase 5 |

### 12.3 AI cost risks (§40)

| # | Risk | L | I | Mitigation | Owner / status |
|---|---|---|---|---|---|
| A1 | Heavy or scripted users drive runaway spend | M | H | Per-plan daily quotas (AiUsageDaily), per-minute limits, per-conversation turn caps, `max_tokens` per route | Engineering / Phase 9 |
| A2 | Prompt bloat (full history, long context) | M | M | Context builder caps, rolling summaries, alerts on average input tokens per turn | Engineering / Phase 9 |
| A3 | Prompt-cache misses (volatile prefix) or Haiku's 4,096-token cache minimum | M | M | Frozen system prompt, deterministic serialisation, no timestamps before breakpoints, cache-read ratio dashboard; FAST prompts kept tiny | Engineering / Phase 9 |
| A4 | Over-use of DEEP tier | M | H | Routing setting; DEEP only for `ai_deep` plans or escalation; separate daily DEEP budget | Product + Eng / Phase 9 |
| A5 | Free tier consumes AI without revenue | H | M | Small free cap, response cache for generic explanations, FAST-tier WhatsApp answers | Owner (plans) / Phase 13 |
| A6 | Provider price or model changes | M | M | Model ids and prices in `Setting`; re-run eval sets before switching | Engineering / ongoing |
| A7 | Essay-marking spikes during mock season | M | M | Batch API (50%), self-assessment fallback, per-school marking quotas | Engineering / Phase 9 |
| A8 | Content-generation spend | L | M | Per-editor daily budgets; cost estimate before each job | Content lead / Phase 14 |
| A9 | Retry storms on timeouts | L | M | SDK `maxRetries` 2, idempotent persistence, circuit breaker that opens on error spikes | Engineering / Phase 9 |
| A10 | Spend exceeds budget despite controls | L | H | **Kill switch:** `Setting` `ai.enabled` + per-feature flags; automatic trip at `ai.dailyBudgetMicros`; features show "AI temporarily unavailable" (never fabricated); marking falls back to NEEDS_REVIEW or self-assessment | SUPER_ADMIN / Phase 9 |

### 12.4 Scalability risks (§38)

| # | Risk | L | I | Mitigation | Owner / status |
|---|---|---|---|---|---|
| S1 | QuestionAttempt growth (~220M rows/year at 100k students) | H | M | BRIN, lean rows, rollups, partitioning path, archival (§9.10) | Engineering / monitored |
| S2 | Exam-season spikes (3–5x) | H | H | Autoscaling, CDN for public pages, pre-season load tests, worker queue isolation | Engineering / Phase 17 |
| S3 | DB connection exhaustion when scaling out | M | H | Pooler in transaction mode; direct URL only for LISTEN, locks and migrations | Engineering / Phase 18 |
| S4 | Dashboards aggregating raw data | M | M | Rollup-only reads; code review rule | Engineering / ongoing |
| S5 | Live leaderboard computation | M | M | Snapshot job (§3.7) | Engineering / Phase 11 |
| S6 | Postgres FTS slows as content grows | L | M | Denormalised SearchDocument, GIN; move to a search engine at the §2.2 trigger | Engineering / monitored |
| S7 | Job table bloat from high churn | M | L | Purge completed jobs, partial index on pending, autovacuum tuning | Engineering / Phase 17 |
| S8 | Notification fan-out to a whole school or platform | M | M | Chunked fan-out jobs; provider rate limits respected | Engineering / Phase 12 |
| S9 | Single-region outage | L | H | Multi-AZ, PITR, documented restore (RPO 15 min, RTO 4 h) | Ops / Phase 18 |
| S10 | Bandwidth cost and slow loads from media | M | M | AVIF/WebP, pre-sized variants, CDN, no video in MVP | Engineering / Phase 5 |
| S11 | Inconsistent per-instance Next caches | M | M | Shared tag coordination before scale-out (§3.8) | Engineering / Phase 17 |

---

## 13. Spec traceability

Modules are `src/server/<module>` (actual module names in §3.2). Models follow the cross-slice name contract (detailed in §4).
Delivery status per section (Done / Partial), evidence and what remains: **[STATUS.md](STATUS.md)**.

| § | Requirement | Modules | Key models | Routes / artefacts | Phase |
|---|---|---|---|---|---|
| §1 | Product vision | all | all | `/app/*` | 3–11 |
| §2 | Board → level → subject → syllabus → topic → subtopic → lesson → practice → quiz → test → mock | curriculum, content, questions, exams | ExamBoard, Qualification, Subject, Syllabus, Topic (tree), Lesson, Question, Assessment | `/[board]/[qualification]/[subject]`, `/app/subjects/...` | 2, 5 |
| §3 | ZIMSEC + Cambridge, independently configurable | curriculum | Country, ExamBoard, Qualification, Syllabus | `/admin/boards`, `/admin/qualifications`, `/admin/syllabuses` | 2, 14 |
| §4 | Any subject; no fabricated syllabuses | curriculum | Subject | `/admin/subjects`; seed holds structure only | 2 |
| §5 | Onboarding | onboarding, enrollment, curriculum | Student, SubjectEnrollment, ExamSession | `/onboarding/[step]` | 3 |
| §6 | Student dashboard | progress, studyplan, gamification | SubjectProgress, TopicMastery, LearnerStats, DailyActivity, StudyPlan | `/app` | 4 |
| §7 | Subject dashboard | progress | SubjectProgress, TopicMastery | `/app/subjects/[subject]` | 4 |
| §8 | Lessons with notation, tables, examples, tips | content | Lesson, LessonObjective, MediaAsset | `/app/lessons/[id]`; content pipeline (§3.10) | 5 |
| §9 | Question bank metadata and types | questions | Question, QuestionOption, QuestionTopic, LearningObjective | `/admin/questions` | 6 |
| §10 | Practice engine with feedback | attempts, practice, marking | AssessmentAttempt, QuestionAttempt | `/app/practice` | 7 |
| §11 | Adaptive engine, mastery bands | adaptive, progress | TopicMastery, QuestionStats | pure `adaptive` | 7 |
| §12 | Mock exams and analysis | attempts, exams, marking | Assessment, AssessmentSection, AssessmentItem, GradeScheme, AssessmentAttempt | `/app/exams/*` | 8 |
| §13 | Examination mode | exams | AssessmentAttempt, QuestionAttempt | `/app/exams/attempt/[id]` | 8 |
| §14 | AI tutor | tutor, ai | AiConversation, AiMessage, AiUsageDaily | `/app/tutor`, `/api/v1/tutor/*` | 9 |
| §15 | AI solver (images) | solver, ai, lib/uploads | AiConversation, AiMessage, MediaAsset | `/app/solver` (REST `POST /api/v1/ai/solve` not built) | 9 |
| §16 | Personal study plan | studyplan | StudyPlan, StudyPlanItem, StudySession | `/app/plan`; `studyplan.adapt` | 10 |
| §17 | Exam countdown | progress, curriculum | ExamSession, SubjectEnrollment | `/app` | 4 |
| §18 | Flashcards with spaced repetition | flashcards | Flashcard, FlashcardState, FlashcardReview | `/app/flashcards` | 11 |
| §19 | Streaks, XP, badges | gamification | DailyActivity, LearnerStats, XpEvent, Achievement, UserAchievement | `/app/achievements` | 11 |
| §20 | Leaderboards with privacy | gamification, accounts | LeaderboardEntry, Profile | `/app/leaderboard` | 11 |
| §21 | Parent account | family, analytics | Parent, ParentStudentLink | `/parent/*`, `/app/family` | 12 |
| §22 | Teacher account | teaching | Teacher, Class, ClassTeacher, ClassMember, Assignment, AssignmentProgress, Announcement | `/teacher/*` | 12 |
| §23 | School administration | schools, analytics | School, SchoolMember | `/school/*` | 12 |
| §24 | Digital study packs | cms/study-packs, study-packs, billing | StudyPack, EntitlementGrant | `/admin/study-packs`, `/app/study-packs`, `/app/study-packs/[slug]`, `/app/billing/checkout?pack=` (public `/study-packs/*` and PDF export not built) | 13, 14 |
| §25 | CMS and bulk import | content, imports | ContentRevision | `/admin/*`, `/admin/imports` | 14 |
| §26 | Content versioning | curriculum, content | Syllabus (one row per version), SubjectEnrollment (pinned version), ContentRevision | `/admin/syllabuses/[id]` | 2 |
| §27 | Copyright / provenance | content, cms | ContentSource, MediaAsset | source fields on every editor (`/admin/sources` not built); §12.2 | 2, 14 |
| §28 | Global search | search | SearchDocument | `/app/search`, `/api/v1/search/suggest` | 5, 7 |
| §29 | Mobile-first, low bandwidth, offline | (UI), PWA | — | §3.13, §9.9 | 5, 17 |
| §30 | WhatsApp-ready backend | whatsapp, practice, ai | ChannelIdentity, ChannelMessage, ChannelConversationState | `/api/webhooks/whatsapp`; §8 | 16 |
| §31 | Subscriptions, configurable plans | billing | Plan, PlanPrice, Subscription, EntitlementGrant | `/pricing`, `/app/billing`, `/admin/subscriptions` | 13 |
| §32 | Provider-agnostic payments | billing | Payment, PaymentEvent | `/api/webhooks/payments/[provider]`; §7 | 13 |
| §33 | Auth methods and roles | auth | User, Session, OAuthAccount, VerificationCode | `(auth)` routes; §5 | 3 |
| §34 | Relational DB, FKs, indexes | all | all | §4, §9.2 | 2 |
| §35 | Analytics | analytics | DailyMetric | `/admin/analytics` | 15 |
| §36 | Admin dashboard sections | all | — | `/admin/*` (§3.3) | 14 |
| §37 | Design | (UI) | — | `globals.css` tokens, `src/components/ui` | 5 |
| §38 | Performance and scale | lib (cache, jobs), all | rollup tables, Job | §9 | 17 |
| §39 | Security | auth, lib (rate-limit, audit) | AuditLog, RateLimitBucket, Session | §5 | 3, 17 |
| §40 | AI cost control | ai | AiUsageDaily, AiResponseCache, Setting | `/admin/ai`; §6 | 9 |
| §41 | AI content generation for admins | ai, content | AiGenerationJob | `/admin/ai/generate` | 14 |
| §42 | Question quality control | content, questions | ContentStatus enum, ContentFlag, QuestionStats | `/admin/review`, `/admin/flags` | 6, 14 |
| §43 | Accessibility | (UI), content | Profile (font-size preference), MediaAsset (alt text) | KaTeX MathML output, keyboard exam navigation | 5, 8, 17 |
| §44 | SEO public pages | curriculum, content | Subject, Topic, Lesson (public visibility) | `(public)/[board]/...`, sitemap | 5 |
| §45 | Public website | content, billing | Testimonial, FaqItem, Plan | `(marketing)` | 5 |
| §46 | Free acquisition | marketing, sharing, referrals, attempts, gamification | DailyQuestion, ShareableResult, ReferralCode, Referral | `/daily`, `/s/[token]`, `/r/[code]`, `/app/invite`, `/exam-countdown`, `/app/diagnostic` | 7, 8, 11 |
| §47 | Content at scale from the CMS | content, imports, ai | Lesson, Question, Flashcard, Assessment | `/admin/*` | 14 |
| §48 | Inspect repo first | — | — | §1 of this document | 1 |
| §49 | Development phases | — | — | §11 | 1 |
| §50 | No fake prototype or numbers | all | demo flag in seed | CLAUDE.md rule 6 | all |
| §51 | Testing | all | — | Vitest unit + integration + jsdom components (474 files); Playwright not built | all |
| §52 | Seamless first-day journey | accounts, exams, studyplan, practice, ai | — | MVP slice + journey E2E (§11) | 3–10 |
| §53 | B2C, B2B, B2B2C; expansion beyond Zimbabwe | billing, curriculum, schools | Country, Plan, Subscription, School | §7.5; Country → board → qualification hierarchy | 2, 13 |
| §54 | Assessment, then build systematically | — | — | This document; §11 | 1 |
