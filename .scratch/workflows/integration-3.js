export const meta = {
  name: 'integration-3',
  description: 'Channels seams: WhatsApp driver resolution + jobs, per-IP auth limits, webhook limits, API session lifetime, password-settled API guard, cookie API rate limit; verify',
  phases: [
    { title: 'Integrate', detail: 'apply channels seam list' },
    { title: 'Verify', detail: 'tests + REST/WhatsApp smoke rerun' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are the platform integration engineer (CLAUDE.md is in your context — follow it; typecheck with npm run typecheck). Repo root: ' + ROOT + ' (Windows). Builder requests: .scratch/channels-shared-changes.md (read it for exact names). No other workflow is running; you own all files for this task.',
].join('\n')

const ITEMS = [
  '1. src/server/messaging/send.ts resolveMessagingChannel("whatsapp") -> whatsappDriverFromEnv(env) (REQUIRED: production WhatsApp sends must use the real driver; console only in dev/test). src/worker/handlers.ts: registerWhatsAppJobs(). Tests.',
  '2. Security (medium): credential endpoints are only limited per (IP, identifier) — one IP can rotate identifiers without limit. Add an IP-wide preset (e.g. loginIp: 30 per 15 min per IP) applied IN ADDITION to the per-(IP, identifier) limit on web login (password + OTP request/verify) and POST /api/v1/auth/token + /auth/otp/request + /auth/otp/verify; add apiOtpVerify keyed per (IP, destination). Keep messages generic (no enumeration). Tests for rotation attacks.',
  '3. Webhooks: add a webhookReceipt preset (per IP, generous, e.g. 300/min) checked BEFORE signature verification on /api/webhooks/whatsapp (GET+POST) and /api/webhooks/payments/[provider]; consume the whatsappInbound per-number limit only AFTER dedupe (retries of stored messages must not count). Tests.',
  '4. src/server/auth/session-policy.ts: API bearer sessions 90-day idle sliding (absolute cap stays 180 days unless the file documents otherwise); update docs/API.md.',
  '5. src/server/lib/api.ts apiRoute: (a) option/default that runs assertPasswordSettled for authenticated routes (school-provisioned users with passwordMustChange must change it first) — apply to the pre-existing tutor/search/uploads routes; (b) apply the publicApi per-user limit to cookie-authenticated calls too (not only bearer). Tests.',
  '6. WhatsApp hardening: button-answer ids a:<attemptId>:<position>:<choice> accepted only for DAILY_QUESTION attempts opened via the WhatsApp channel (or the documented allowed modes), not any IMMEDIATE-feedback attempt. Docs: docs/WHATSAPP.md note to keep query strings out of reverse-proxy access logs for /api/webhooks/whatsapp (hub.verify_token).',
  '7. Catalogue endpoints: keep authenticated (decision: avoid public enumeration until a CDN/edge rate limit exists); update docs/ARCHITECTURE.md §3.4 to match.',
  '8. Expose the remaining existing services over REST v1 (thin routes via the same v1Route helper + OpenAPI entries + tests): POST /practice/sessions/{id}/hints (revealPracticeHint), POST /practice/sessions/{id}/self-assessment (selfAssessPracticeAnswer), POST /practice/sessions/{id}/end (endPracticeSession), POST /flashcards/reviews (batch offline sync via syncReviews), GET /study-plan/today (getTodayPlan), GET /progress (student progress overview read model).',
  '10. Parent checkouts: src/app/billing/return/route.ts must redirect to PARENT_PAYMENT_RESULT_PATH from @/server/family/billing (/parent/billing/result?paymentId=) when Payment.payerUserId differs from beneficiaryUserId (and the caller is the payer), instead of /app/billing/result. Test.',
  '11. Indexes requested by builders (read .scratch/engagement-shared-changes.md / roles notes): e.g. a partial index on FlashcardReview/FlashcardState for NEW-card daily caps if the query needs it — verify with EXPLAIN on the dev DB first; add via a migration only when justified (npx prisma migrate dev --name <name>, npm run db:grants, npm run db:generate).',
  '9. Clean the dev DB residue the channels smoke left (demo.student IN_PROGRESS practice sessions from REST runs: end them via the service, do not delete rows).',
]

phase('Integrate')
const integ = await agent([COMMON, '', 'Apply ALL of these items:', ...ITEMS, '', 'Return what you changed per item, test counts, and anything not done.'].join('\n'), {
  label: 'integrate:channels-seams', phase: 'Integrate',
  schema: { type: 'object', properties: { perItem: { type: 'array', items: { type: 'object', properties: { item: { type: 'number' }, status: { type: 'string' }, notes: { type: 'string' } }, required: ['item', 'status'] } }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, typecheckClean: { type: 'boolean' } }, required: ['perItem', 'typecheckClean'] },
})

phase('Verify')
const verify = await agent([COMMON, '',
  'YOU ARE THE VERIFIER. Integrator report: ' + JSON.stringify(integ),
  '1. npm run typecheck ; npx eslint src tests prisma ; npx vitest run . — everything green; fix regressions (root causes).',
  '2. Rerun the channels REST smoke (.scratch/verify-channels-rest.ts) against NEXT_DIST_DIR=.next-verify-int3 npx next dev -p 3108 (stop by PID; delete the dir; remove tsconfig include lines Next adds) — add checks for the IP-wide login limit and the new v1 endpoints. Recreate .scratch/verify-channels-wa.json with test-only values and rerun the WhatsApp smoke if its script exists.',
  '3. Run the worker 30 s (kill by PID): whatsapp.* jobs registered, no failures.',
].join('\n'), {
  label: 'verify:integration-3', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'smoke', 'fixes', 'remainingIssues'] },
})

return { integ, verify }
