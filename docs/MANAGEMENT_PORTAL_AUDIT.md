# BvunzoHub Management Portal Audit

Snapshot: 2026-10-13.

## Existing stack

- Next.js 16 App Router, React 19, TypeScript 5.9 strict, Tailwind CSS 4.
- PostgreSQL 18 with Prisma 7 and raw SQL migrations for checks, triggers, indexes, RLS and grants.
- Authentication uses DB-backed sessions, email/password and email OTP; SMS, WhatsApp, Stripe and AI are feature-flagged off by default.
- Authorization uses role/permission guards in `src/server/auth`, with service-level checks for protected operations.
- Payments use the provider registry in `src/server/billing/providers`; Paynow is the production provider and fulfillment is server-side/idempotent.
- Deployment is container-based on Railway for the current production site, with readiness exposed at `/api/ready`.

## Production inspection

- `https://bvunzohub.com/` responds successfully and is served by Railway.
- `/admin` and `/admin/analytics` redirect to `/login?next=...`, confirming the management area is protected.
- `/api/ready` reports database connectivity, migration parity and database safety checks as ready.
- Live admin workflow verification still requires valid staff credentials.

## Existing management portal coverage

The repository already contains a substantial `/admin` portal:

- Executive dashboard and analytics: `/admin`, `/admin/analytics`.
- Users, students and teachers: `/admin/users`, `/admin/students`, `/admin/teachers`.
- Schools: `/admin/schools`.
- Curriculum: boards, qualifications, subjects, syllabuses, topics, exam sessions and grade schemes.
- Content: lessons, questions, exams, flashcards, study packs, media, FAQ, testimonials and daily questions.
- Workflow: review queue, content flags, imports and background jobs.
- Commerce: subscriptions, payments, plans/prices and promo codes.
- System: notifications, settings and audit log.

## Change made in this pass

Added a top-level reporting centre:

- `/admin/reports` lists management report families with date filtering and honest data coverage notices.
- CSV exports are available for executive summary, registrations, learning engagement, assessment performance, revenue, retention, topic weakness and AI usage.
- Exports use the same analytics rollups as the dashboard through `getAdminAnalytics`, so dashboard and reports reconcile.
- Export routes are private, uncached and permission-checked with `analytics.platform` at `all` scope.

## Known constraints

- No production admin credentials were available in this environment, so live staff workflows could not be completed.
- No Railway project credentials were available, so deployment could not be executed from here.
- Reports depend on the analytics rollup worker. Missing rollup days are shown as gaps and can be queued for backfill; they are not treated as zero.
- External live-provider checks remain outstanding for Paynow, Resend, object storage, CDN/error monitoring and backups as described in `docs/STATUS.md` and `docs/DEPLOYMENT.md`.
