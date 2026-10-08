export const meta = {
  name: 'channels-email',
  description: 'Owner decision: EMAIL-based auth (no SMS), transactional email only, WhatsApp + Stripe off behind flags; convert the stopped phone-first attempt; then verify everything',
  phases: [
    { title: 'Build', detail: 'email auth + channels off (converts the phone-first attempt)' },
    { title: 'Verify', detail: 'typecheck, lint, full suite, seed, smoke, build, docs' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'

const COMMON = `You are a senior engineer on a production ed-tech platform for ZIMSEC and Cambridge O/A-Level students in Zimbabwe (CLAUDE.md is in your context — follow it strictly, including the "Owner decisions in force" block at its top; typecheck with npm run typecheck; parallel dev servers need NEXT_DIST_DIR=.next-<label> and must be stopped by PID and their directory deleted afterwards). Repo root: ${ROOT} (Windows, PowerShell primary). Today 2026-10-07. Do not npm install.

OWNER DECISIONS IN FORCE (2026-10-07) — implement exactly:
- AUTHENTICATION IS EMAIL-BASED, NOT SMS. The owner said explicitly: "let's have email auth and not sms". Register with email + password, verify the email with a one-time code sent BY EMAIL, sign in with email (or username for school-provisioned accounts) + password or an emailed one-time code, reset passwords by email. SMS is OFF entirely: no SMS provider required, no phone verification, no SMS sends. A phone number is optional profile data only (used to prefill Paynow EcoCash/OneMoney checkout).
- Email is ON for TRANSACTIONAL account messages only: verification codes, password resets, security notices (password changed, new sign-in if built), school/class/parent invitations. NOT sent: notification digests, announcements, marketing, reminders, receipts (in-app only). Provider: Resend (EMAIL_PROVIDER=resend) in production; console provider in dev/test.
- Switched OFF for now (dormant, reversible through the "features" setting, code NOT deleted): all AI (already done upstream), the WhatsApp channel, Stripe, SMS.
- Pricing (already done upstream): FREE preview + Full Access for a one-off USD 1 (lifetime) via Paynow.
- A concurrent content workflow writes content/** and imports it; do not edit content/**, src/server/content-pipeline/**, scripts/content/**, docs/CONTENT_PIPELINE.md.

UPSTREAM REPORTS: read .scratch/simplify-upstream-reports.json first — the finished and verified reports of the feature-flags/AI-off agent and the one-off-pricing agent (reuse their work, do not redo it).`

const RESULT = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    changes: { type: 'array', items: { type: 'string' } },
    testsPassed: { type: 'number' },
    testsFailed: { type: 'number' },
    remaining: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'changes', 'remaining'],
}

const CHANNELS = `TASK: EMAIL-BASED AUTH, SMS OFF, NON-TRANSACTIONAL EMAIL OFF, WHATSAPP + STRIPE OFF.

IMPORTANT CONTEXT — A PREVIOUS ATTEMPT WAS STOPPED MID-WAY because it was given an outdated instruction (phone-first auth with SMS codes, all email off). Its edits are ON DISK and uncommitted (the repo has no commits; there is no git diff to revert). The files it wrote or edited are listed in .scratch/channels-attempt1-files.txt (plus, via scripts: src/app/admin/users/[id]/page.tsx, src/app/admin/users/actions.ts, src/components/school/RosterImport.tsx, src/components/teacher/teacher-components.test.tsx, src/server/cms/users/audit-actions.ts, src/server/cms/users/schemas.ts, src/server/cms/users/service.ts, src/server/lib/audit.ts, src/server/schools/roster.ts, and "Email sending is switched on for this file" flag-mock blocks added to many test files via tests/support/feature-flags.ts settingsWithFeatureFlags). Read those files first and decide per change:
- KEEP what matches the decisions: WhatsApp off (webhook route 404, settings page/actions, jobs no-op, outbound guard), Stripe off (provider registry, checkout, family/billing.ts, billing methods/service), notification digests/announcements in-app only, the copyable invite link + join code shown to inviters (a useful fallback alongside the invitation email), the admin one-time temporary password (audited, step-up) as an extra recovery path if it is sound.
- CONVERT to email-based: src/server/auth/flows.ts and src/server/messaging/otp.ts (codes go by EMAIL; SMS never), src/server/messaging/contact.ts / send.ts / types.ts (transactional email always deliverable; SMS a logged no-op while off), src/server/lib/env.ts + env.test.ts (production: EMAIL_PROVIDER=resend required, console refused; SMS provider NOT required), auth UI components (email field primary and required for self-registration; phone optional or absent; no "emailEnabled" phone-first toggles), invitations (send the invitation EMAIL when an email is given; phone-only invitees get the copyable link), CMS users service (password reset instructions go by email), the AI budget alert (in-app plus email to admins is a security/ops notice: in-app only is fine).
- DELETE or rewrite src/server/auth/phone-first.integration.test.ts as an email-auth integration test.

FLAGS (src/lib/features.ts, src/server/lib/settings.ts, the seed in prisma/seed/data/*, /admin/settings forms): add "sms" (default false: no SMS sends at all, no phone verification). Re-define "email" as OPTIONAL (non-transactional) email — digests, announcements, receipts, reminders — default false. Transactional account email (verification, reset, security notices, invitations) is ALWAYS sent and is NOT behind a flag, because sign-in depends on it. Update FEATURE_LABELS copy accordingly (no "accounts use SMS" text). Keep ai/whatsapp/stripe as they are. Make sure the seeded/default value and existing dev rows include sms:false (toFeatureFlags must treat a missing key as false).

REQUIREMENTS:
1. Auth: register (email + password, Zod-validated, rate-limited) -> email verification code (console outbox in dev) -> verified; sign in with email or username + password, or an emailed one-time code; forgot/reset password by emailed code or link; change-email re-verifies by email; school-provisioned username accounts keep working (their reset path is the school admin / teacher or the admin temporary password). Phone number: optional profile field, never a login identifier, never verified, never sent anything.
2. SMS: no code path calls an SMS provider while features.sms is false (logged no-op), production env no longer requires SMS keys.
3. WhatsApp (features.whatsapp=false) and Stripe (features.stripe=false): as the previous attempt did — verify it is complete (no Graph API calls, no Stripe offered anywhere, registry excludes it even with env keys, env policy does not require it).
4. Copy/docs: remove SMS/WhatsApp/Stripe/phone-first mentions from user-facing pages (auth pages, settings, pricing, FAQ, legal drafts where they describe channels); update docs/DEPLOYMENT.md env table, docs/ARCHITECTURE.md (auth + messaging + flags sections), docs/SECURITY.md if it describes OTP channels.
5. Tests: email registration + email verification + email login code + email reset (integration), no SMS driver call with sms off, transactional email still sent while features.email is off, digest/announcement emails NOT sent while off, webhook 404 for WhatsApp, Stripe absent from provider choices. Fix every test the previous attempt changed so the suite matches the email decision.
Run npm run typecheck (zero errors), npx eslint on touched files, and npx vitest run on the affected areas (src/server/auth src/server/messaging src/server/notifications src/server/schools src/server/teaching src/server/cms/users src/server/lib src/app/(auth) src/app/admin src/app/api src/components) — all green.`

phase('Build')
const built = await agent([COMMON, '', CHANNELS, '', 'Return summary, changes, test counts, remaining work.'].join('\n'), { label: 'build:email-auth-channels', phase: 'Build', schema: RESULT })

phase('Verify')
const verify = await agent([COMMON, '',
  'VERIFIER. Builder report: ' + JSON.stringify(built),
  '1. npm run typecheck ; npx eslint src tests prisma ; npx vitest run . — all green (fix regressions; re-run load-flaky files in isolation before calling them failures; do not touch the content pipeline areas).',
  '2. npm run db:seed (idempotent) so the dev DB has FULL_ACCESS USD 1 and features { ai:false, whatsapp:false, email:false, stripe:false, sms:false }; then smoke with NEXT_DIST_DIR=.next-verify-email npx next dev -p 3114 (stop by PID; delete the dir afterwards): register a NEW student BY EMAIL (verification code from the dev console email outbox) -> verify -> onboarding -> FREE limits visible -> buy Full Access via the sandbox provider -> lifetime access active (mock exams, flashcards, study plan unlocked) -> /app/billing shows Full access; sign out; sign in with an emailed one-time code; forgot password -> emailed reset -> sign in with the new password; no page asks for a phone number to sign up or sends SMS; /app/tutor, /app/solver, /api/v1/tutor/conversations, /api/webhooks/whatsapp -> 404; /, /pricing contain no AI/Stripe/WhatsApp/SMS claims and show USD 1 from the DB; a parent buys for a linked child via sandbox. Demo accounts are in docs/DEV_SEED.md.',
  '3. npm run build with NEXT_DIST_DIR=.next-email-build and an https APP_URL override (delete the dir after) — must pass.',
  '4. Update docs/STATUS.md (scope now: AI/WhatsApp/Stripe/SMS dormant behind flags; email auth + transactional email only; one-off USD 1 pricing) and README feature/pricing/auth lines.',
].join('\n'), {
  label: 'verify:email-auth', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, buildOk: { type: 'boolean' }, smoke: { type: 'string' }, remaining: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'buildOk', 'smoke', 'remaining'] },
})

return { built, verify }
