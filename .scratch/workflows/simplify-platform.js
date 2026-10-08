export const meta = {
  name: 'simplify-platform',
  description: 'Owner decision: switch off AI, WhatsApp, Stripe and email via central feature flags (dormant, reversible); phone + SMS auth; single one-off USD 1 lifetime Full Access via Paynow; verify',
  phases: [
    { title: 'Build', detail: 'flags + AI off, one-off pricing, channels off (2 concurrent)' },
    { title: 'Verify', detail: 'full checks, build, smoke, docs' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = `You are a senior engineer on a production ed-tech platform for ZIMSEC and Cambridge O/A-Level students in Zimbabwe (CLAUDE.md is in your context — follow it strictly; typecheck with npm run typecheck; parallel dev servers need NEXT_DIST_DIR=.next-<label> and must be deleted afterwards). Repo root: ${ROOT} (Windows). Today 2026-10-07. Do not npm install.

OWNER DECISIONS (2026-10-07), to implement exactly:
- Switch OFF for now (dormant and reversible, NOT deleted): all AI features (tutor, solver, AI marking, AI content drafts), the WhatsApp channel, Stripe, and all email sending. Costs must be zero for these: no code path may call the Anthropic API, WhatsApp Graph API, Stripe or an email provider while they are off.
- Pricing: a single ONE-OFF payment of USD 1.00 gives FULL ACCESS to the platform (lifetime, no renewal). Keep a FREE preview tier (free-preview lessons, daily question, diagnostic, exam countdown, limited daily practice) so students can try before paying. Prices stay DB-configured (editable in admin); the seed default for Full Access is USD 1.00 in every environment.
- Payments only via Paynow (EcoCash, OneMoney, and cards through Paynow web checkout); the sandbox provider remains for dev/test only.
- UPDATED OWNER DECISION: authentication is EMAIL-based (verification codes and password resets by email via Resend; console in dev). SMS is switched OFF entirely. Email is sent only for transactional account messages (verification, reset, security notices, invitations); no marketing/digest/announcement email.
- The next big effort is real content; a concurrent workflow builds the content pipeline (scripts/content/**, content/**, docs/CONTENT_PIPELINE.md, src/app/admin/review/topics/**): do not edit those.`

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

const FLAGS_AI = `TASK: CENTRAL FEATURE FLAGS + AI OFF.
1. Feature flags: a registered Setting "features" { ai: boolean, whatsapp: boolean, email: boolean, stripe: boolean } with defaults ALL false (src/server/lib/settings.ts SETTING_DEFINITIONS + seed in prisma/seed/data/settings-extra.ts), a server helper (e.g. src/server/features.ts isFeatureEnabled(name) / getFeatures(), cached like other settings) and an isomorphic type in src/lib/features.ts; client components receive flags as props (no client fetching). Editable by SUPER_ADMIN in /admin/settings with step-up and audit. Document in docs/ARCHITECTURE.md.
2. AI OFF everywhere when features.ai is false: the AI gateway refuses every call (defense in depth, before quota/metering) with AI_UNAVAILABLE; student nav hides Tutor and Question solver; /app/tutor/**, /app/solver/**, /api/v1/tutor/** return 404; AskTutorLink and any "Ask the tutor" entry points render nothing; AI marking: never enqueue ai.mark — open/essay answers go straight to the existing self-assessment flow (student marks against the mark scheme) or teacher review queue, and the worker ai.mark handler no-ops safely if old jobs exist; admin AI drafts (/admin/ai/**) and AI settings/usage pages are hidden from the admin nav and return 404 unless the flag is on; WhatsApp "explain X" is moot (channel off) but must not call AI either. Remove AI claims from user-facing copy while off: marketing home (drop the AI Tutor section; the hero supporting line becomes "Complete ZIMSEC and Cambridge O-Level & A-Level study resources, practice questions and mock exams."), pricing feature lists, onboarding/dashboard/empty states, FAQ seed copy, OG image text if any. Plans/entitlements: AI entitlements become irrelevant while off (leave keys; do not show them). Tests: gateway refusal, routes 404, nav hidden, no ai.mark enqueued for essays (self-assessment instead), marketing copy has no "AI" claims (grep test over rendered HTML of / and /pricing).`

const PRICING = `TASK: ONE-OFF USD 1 FULL ACCESS.
1. Plans: FREE (preview: free-preview lessons, daily question, diagnostic, countdown, limited practice per day, limited topic tests per week, no mock exams/flashcards/study plan — read src/lib/billing/entitlements.ts and keep FREE generous enough to show value) and FULL_ACCESS (all non-AI features: all lessons, unlimited practice, topic tests, mock exams, flashcards, study plan, detailed progress analytics, parent reports). Deactivate/hide STUDENT, PREMIUM and SCHOOL plans from purchase and from /pricing (keep rows for history; existing dev subscriptions keep working until their end). Seed: FULL_ACCESS with a PlanPrice USD 100 minor units, interval ONE_OFF, periodDays NULL (no expiry) in EVERY environment (owner decision; still editable in /admin/plans). Read the schema CHECKs/triggers on Plan, PlanPrice, Subscription, EntitlementGrant, Payment first and pick the cleanest model for lifetime access (e.g. a lifetime EntitlementGrant created on successful payment, idempotent per payment, or a Subscription with no period end if the DB rules allow it) — document the choice.
2. Checkout: startCheckout for FULL_ACCESS via Paynow only (EcoCash / OneMoney mobile flow + Paynow web for cards), sandbox in dev; a user who already has lifetime access cannot buy again; parents can buy for a linked child (beneficiary); webhook/poll fulfilment creates the lifetime access exactly once; refunds revoke it (admin). Remove renewal/cancel-at-period-end UI for one-off access.
3. UI: /pricing (Free vs "Full access — USD 1, pay once, keep it": clear feature comparison from the entitlements mapping module, Paynow logos/text only, no Stripe), /app/billing (status: Free preview or Full access since <date> with receipt; Buy button), parent subscribe page for a child, all upgrade prompts in the app ("Unlock everything for USD 1" using the DB price, never a hard-coded amount), marketing pricing teaser, admin plans page still works. Currency: USD only for now (ZWG price rows hidden).
4. Tests: entitlement resolution for lifetime access, purchase idempotency (duplicate webhooks/polls), already-owned refusal, parent-for-child, refund revokes, pricing page shows DB price.`

const CHANNELS = `TASK: WHATSAPP, STRIPE AND SMS OFF; EMAIL-BASED AUTH; NON-TRANSACTIONAL EMAIL OFF. Use the feature flags built by the upstream agent (read its report and code first).
1. WhatsApp (features.whatsapp=false): /api/webhooks/whatsapp returns 404, /app/settings/whatsapp hidden (404) and its nav/settings links removed, whatsapp.* jobs registered but no-op (or not scheduled) when off, no Graph API calls.
2. Stripe (features.stripe=false): not offered anywhere (checkout provider choices, /pricing, parent subscribe, billing pages, docs), registry excludes it even if env keys exist, env policy no longer requires/mentions Stripe for production; keep the adapter code dormant.
3. Auth + messaging: authentication is EMAIL-based — register with email + password, verify the email with a one-time code sent by email, sign in with email (or username for school-provisioned accounts) + password or an emailed code, reset passwords by email; Google sign-in stays only if configured. SMS is OFF: no SMS sends anywhere (SMS channel becomes a logged no-op), no phone verification, phone number optional profile data only (used for Paynow mobile money). Email is sent ONLY for transactional account messages (verification, password reset, security notices, school/class/parent invitations); notification digests, announcements and receipts are in-app only. Production env policy: EMAIL_PROVIDER=resend required (console refused), SMS_PROVIDER not required. Remove phone-first UI if any was added.
4. Copy/docs: remove SMS/WhatsApp/Stripe mentions from user-facing pages and update docs (DEPLOYMENT env table, ARCHITECTURE, STATUS). Tests for each flag path (webhook 404, no SMS driver call, email registration + email verification + email reset, no digest email sends).`

function run(key, task, deps) {
  return agent([COMMON, deps.length ? 'UPSTREAM REPORTS (reuse their work): ' + JSON.stringify(deps) : '', '', task, '', 'Return summary, changes, test counts, remaining work.'].join('\n'), { label: 'build:' + key, phase: 'Build', schema: RESULT })
}

phase('Build')
const pFlags = run('flags-ai-off', FLAGS_AI, [])
const pPricing = run('one-off-pricing', PRICING, [])
const pChannels = pFlags.then(f => run('channels-off', CHANNELS, [f].filter(Boolean)))
const built = await Promise.all([pFlags, pPricing, pChannels])

phase('Verify')
const verify = await agent([COMMON, '',
  'VERIFIER. Reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npm run typecheck ; npx eslint src tests prisma ; npx vitest run . — all green (fix regressions; re-run load-flaky files in isolation before calling them failures; do not touch the content pipeline areas).',
  '2. npm run db:seed (catalogue/plans/settings; idempotent) so the dev DB has FULL_ACCESS USD 1 and features all off; then smoke with NEXT_DIST_DIR=.next-verify-simplify npx next dev -p 3113 (stop by PID; delete dir): register a NEW student by email (verification code from the dev console outbox) -> onboarding -> FREE limits visible -> buy Full Access via the sandbox provider -> lifetime access active (mock exams, flashcards, study plan unlocked) -> /app/billing shows Full access; /app/tutor, /app/solver, /api/v1/tutor/conversations, /api/webhooks/whatsapp -> 404; /, /pricing contain no AI/Stripe/WhatsApp claims and show USD 1 from the DB; parent buys for a child via sandbox.',
  '3. npm run build with NEXT_DIST_DIR=.next-simplify-build and an https APP_URL override (delete dir after) — must pass.',
  '4. Update docs/STATUS.md (new scope: AI/WhatsApp/Stripe/email dormant behind flags; pricing model), README pricing/features lines, and the memory-relevant notes in docs/ARCHITECTURE.md.',
].join('\n'), {
  label: 'verify:simplify', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, buildOk: { type: 'boolean' }, smoke: { type: 'string' }, remaining: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'buildOk', 'smoke', 'remaining'] },
})

return { built, verify }
