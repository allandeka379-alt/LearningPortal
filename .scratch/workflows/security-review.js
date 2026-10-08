export const meta = {
  name: 'security-review',
  description: 'Phase 17 (§39): multi-lens adversarial security review — find, adversarially verify, fix confirmed issues with regression tests',
  phases: [
    { title: 'Find', detail: '6 lenses hunt for vulnerabilities with file:line evidence' },
    { title: 'Verify', detail: 'adversarial verifiers try to refute each lens\'s findings' },
    { title: 'Fix', detail: 'fixers patch confirmed issues with regression tests' },
    { title: 'Recheck', detail: 'full test suite + fix verification' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior application-security engineer reviewing a production ed-tech platform for Zimbabwean secondary students (CLAUDE.md is in your context; spec docs/PRODUCT_SPEC.md §39 security, §21 privacy, §40 AI; architecture docs/ARCHITECTURE.md §5 security, §4.9 AI privacy, §7 payments). The users are largely MINORS: student data is sensitive. Repo root: ' + ROOT + ' (Windows). Stack: Next.js 16 App Router (server actions + route handlers under src/app), services in src/server/<domain>, Postgres with ~290 CHECKs / 83 triggers / RLS on AI tables (init migration), app role app_rw.',
  'Be concrete and evidence-driven: every finding cites file:line, the exact vulnerable code, an attack scenario (who, what input, what they gain), and severity (critical: account takeover / cross-tenant data access / payment bypass / RCE; high: privilege escalation within a tenant, stored XSS, PII leak; medium: missing rate limit on sensitive endpoint, info disclosure; low: hardening). Do not report theoretical issues already prevented by a DB constraint/RLS/guard you can point to — read the guard first. No style nits.',
].join('\n')

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          title: { type: 'string' },
          file: { type: 'string' },
          line: { type: 'number' },
          evidence: { type: 'string' },
          attack: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['id', 'severity', 'title', 'file', 'evidence', 'attack', 'fix'],
      },
    },
    coverage: { type: 'string' },
  },
  required: ['findings', 'coverage'],
}

const LENSES = [
  { key: 'authz-idor', prompt: 'LENS: AUTHORIZATION / IDOR / TENANCY. Enumerate EVERY server action ("use server" files) and route handler (src/app/**/route.ts) and the services they call. For each, determine who may call it and whether every id taken from input (attemptId, conversationId, classId, studentId, schoolId, paymentId, lessonId, assetId, linkId, invitation token, share token, cursor) is checked against the actor (ownership, class membership, school membership + school status, parent link + permission flags, staff permission). Look for: missing guard, guard after side effects, checks on the wrong id, cross-school access, teacher seeing students outside their classes, parent seeing an unlinked child or sections their flags hide, editor performing admin-only actions, student reading another student\'s attempt/answers/analysis, mass-assignment (spreading input into Prisma data), cursor values that leak other users\' rows. Cover src/app/app, parent, teacher, school, admin, api/v1, api/webhooks, invite, s, r, billing.' },
  { key: 'injection-rendering', prompt: 'LENS: INJECTION & RENDERING. Check: every $queryRaw / $executeRaw (tagged template parameterisation, Prisma.raw / Prisma.sql composition with user input, dynamic identifiers, ORDER BY / LIMIT built from input); dangerouslySetInnerHTML sites and the content pipeline (sanitize schema, KaTeX trust, directive attributes, asset resolver, links) — try to craft markdown that yields script execution or CSS-based exfiltration; AI output rendering (is it sanitized via the same pipeline?); open redirects (next/return/redirect params everywhere, not only login); SSRF (any fetch to a URL derived from input: Paynow poll URLs from provider responses, image URLs, webhooks); regex DoS (marking engine accepted regexes, search query parsing); CSV/Excel formula injection in exports and imports; path traversal in storage keys and media route; header injection; JSON parsing of untrusted payloads without size limits; prototype pollution in merges.' },
  { key: 'auth-session-csrf', prompt: 'LENS: AUTHENTICATION, SESSIONS, CSRF, RATE LIMITS. Check: password hashing + rehash, login/OTP/reset flows (account enumeration via messages or timing, OTP brute force — attempts per code AND per target AND per IP, code expiry, single use, reset token single-use + expiry, session revocation on password change/reset), forced password change for provisioned accounts, session cookie flags/rotation/fixation, bearer tokens (hashed at rest, revocation, scope), Google OAuth (state + PKCE validation, account linking only on verified email, no takeover via unverified email), CSRF for cookie-authenticated route handlers (Origin checks) and server actions (Next built-in origin check — confirm allowedOrigins config is not wide), rate limits on every unauthenticated or expensive endpoint (register, login, OTP, search, daily question, uploads, AI, invites, referral, share creation, webhook rejection), step-up auth for sensitive admin actions, lockout abuse (can an attacker lock a victim out permanently?).' },
  { key: 'payments-entitlements', prompt: 'LENS: PAYMENTS, SUBSCRIPTIONS, ENTITLEMENTS, ABUSE. Check: client-controlled amounts/prices/currency/plan ids, webhook signature verification (raw body, constant-time, replay window, provider spoofing via the [provider] route segment), idempotency under concurrent delivery, amount mismatch handling, Paynow hash verification of BOTH responses and status updates, the /billing/return poll (can a user force a SUCCESS?), sandbox provider reachable in production, refund/extension admin actions (authz + audit + step-up), parent paying for a child (beneficiary checks), study-pack grants, promo codes (reuse, negative totals), referral rewards (self-referral, sybil loops, cap races), entitlement bypass: can FREE users reach premium lessons/mocks/AI quota/flashcards via API routes, server actions, search teasers, share pages, SEO pages, WhatsApp, or by guessing ids; daily limits enforced server-side atomically (race to exceed practice/AI quotas).' },
  { key: 'ai-specific', prompt: 'LENS: AI SECURITY & PRIVACY (§14, §15, §40, §21). Check: prompt injection — student text, uploaded images, lesson/question content and tutor history reaching the model: can a student make the tutor reveal answers to an IN-PROGRESS exam, other students\' data, system prompts, or bypass the teach-first policy? Is the model ever given tools or data it should not have? PII minimisation in every prompt builder (no names/emails/phones/school names); AI output rendered safely; quota/rate-limit bypass (parallel requests, aborted streams not metered, cache keys that let one user\'s cached answer leak another\'s private context, response cache poisoning), RLS on AiConversation/AiMessage enforced on every read path (parents only with platform switch + consent; break-glass audited), AI marking manipulation (a student answer containing "award full marks" instructions — is the marking prompt robust and is the result clamped/validated?), AI content generation by editors (generated drafts never auto-published; prompt injection from syllabus text), cost DoS (very long inputs, image sizes, many conversations), logging of prompts/responses.' },
  { key: 'privacy-uploads-ops', prompt: 'LENS: PRIVACY, MINORS, UPLOADS, OPERATIONS. Check: PII in logs (logger redaction coverage vs actual field names used across the codebase), PII in URLs/query strings, error responses leaking internals or stack traces, audit log completeness for privileged reads/writes (STUDENT_VIEW etc.), data minimisation for minors (birthYear only), guardian consent enforcement, account deletion/anonymisation path, file uploads (magic-byte sniffing, size caps incl. streaming, SVG uploads (script!) allowed?, filename handling, content-disposition, serving private/owner-only assets — media route authorization, cache headers on private assets), public pages leaking data (share pages /s, referral /r, SEO pages, sitemap including private items, search suggest), security headers/CSP gaps (unsafe-inline scope, missing frame-ancestors on API), service worker caching private data across users on shared devices, environment/secrets handling (anything secret shipped to the client: NEXT_PUBLIC_* misuse, server-only imports in client components), dependency risks (known-vulnerable packages via npm audit — report only, no installs).' },
]

phase('Find')
const finders = await parallel(LENSES.map(l => () => agent([COMMON, '', l.prompt, '', 'Read the code thoroughly (grep broadly, then read files). Do NOT edit files. Return all genuine findings and a short coverage statement (what you examined).'].join('\n'), { label: 'find:' + l.key, phase: 'Find', schema: FINDINGS })))

const VERDICT = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          real: { type: 'boolean' },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          reasoning: { type: 'string' },
          reproduction: { type: 'string' },
        },
        required: ['id', 'real', 'severity', 'reasoning'],
      },
    },
  },
  required: ['verdicts'],
}

phase('Verify')
const verified = await parallel(LENSES.map((l, i) => () => {
  const f = finders[i]
  if (!f || !f.findings || f.findings.length === 0) return Promise.resolve({ lens: l.key, confirmed: [] })
  return agent([COMMON, '',
    'You are an ADVERSARIAL VERIFIER for the "' + l.key + '" lens. For EACH finding below, try hard to REFUTE it: read the cited code AND everything that could prevent the attack (guards in layouts/actions, service checks, DB CHECKs/triggers/RLS in the init migration, rate limits, proxy, Next built-ins). Mark real=true only if you can describe a concrete, currently-working attack path (ideally prove it with a quick test or script under .scratch/ against the TEST database — never against dev data you did not create). Adjust severity to the realistic impact. Default to real=false when uncertain. Do NOT edit source files.',
    'Findings: ' + JSON.stringify(f.findings),
  ].join('\n'), { label: 'verify:' + l.key, phase: 'Verify', schema: VERDICT }).then(v => {
    const ok = (v && v.verdicts ? v.verdicts : []).filter(x => x.real)
    const byId = new Map(f.findings.map(x => [x.id, x]))
    return { lens: l.key, confirmed: ok.map(x => Object.assign({}, byId.get(x.id) || {}, { severity: x.severity, verification: x.reasoning, reproduction: x.reproduction || '' })) }
  })
}))

const confirmed = verified.filter(Boolean).flatMap(v => v.confirmed.map(c => Object.assign({ lens: v.lens }, c)))
log('Confirmed findings: ' + confirmed.length + ' (' + ['critical', 'high', 'medium', 'low'].map(s => s + ' ' + confirmed.filter(c => c.severity === s).length).join(', ') + ')')

phase('Fix')
const groups = LENSES.map(l => ({ lens: l.key, items: confirmed.filter(c => c.lens === l.key) })).filter(g => g.items.length > 0)
const FIXRES = {
  type: 'object',
  properties: {
    fixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, change: { type: 'string' }, test: { type: 'string' } }, required: ['id', 'change'] } },
    notFixed: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, reason: { type: 'string' } }, required: ['id', 'reason'] } },
    testsPassed: { type: 'number' },
    testsFailed: { type: 'number' },
  },
  required: ['fixed', 'notFixed'],
}
const fixes = []
for (const g of groups) {
  // Sequential per lens: fixes in shared files (guards, api.ts, rate-limit.ts) must not race each other.
  const r = await agent([COMMON, '',
    'You are the FIXER for confirmed "' + g.lens + '" security findings. For each: implement the minimal correct fix at the root cause (prefer central guards/helpers over per-call patches when the same flaw repeats), add a REGRESSION TEST that fails before the fix and passes after (integration tests use the test DB as app_rw; unique fixtures), keep behaviour otherwise identical. You may edit any source file needed, schema changes only if unavoidable (then create a migration with npx prisma migrate dev --name <name>, run npm run db:grants and npm run db:generate). Typecheck with npm run typecheck; run the affected tests.',
    'Confirmed findings: ' + JSON.stringify(g.items),
  ].join('\n'), { label: 'fix:' + g.lens, phase: 'Fix', schema: FIXRES })
  fixes.push({ lens: g.lens, result: r })
}

phase('Recheck')
const recheck = await agent([COMMON, '',
  'Final security recheck. Fix reports: ' + JSON.stringify(fixes),
  '1. npm run typecheck ; npx eslint src tests ; npx vitest run . — everything green (fix regressions you find).',
  '2. For each fixed finding, re-read the fix and confirm the attack path is closed (not just the test). List any finding that is only partially fixed.',
  '3. Write docs/SECURITY.md: threat model summary (actors incl. minors, assets, trust boundaries), controls in place (auth, sessions, RBAC/resource checks, RLS, CSRF, rate limits, uploads, payments/webhooks, AI safeguards, audit, privacy), this review\'s findings table (id, severity, status, fix/test reference), accepted risks with rationale, and the pre-launch checklist (secrets, section D roles, CSP nonce hardening, pen test, legal review).',
].join('\n'), {
  label: 'recheck:security', phase: 'Recheck',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, partiallyFixed: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'partiallyFixed'] },
})

return { findingsByLens: finders.map((f, i) => ({ lens: LENSES[i].key, count: f && f.findings ? f.findings.length : 0 })), confirmed: confirmed.map(c => ({ id: c.id, lens: c.lens, severity: c.severity, title: c.title })), fixes, recheck }
