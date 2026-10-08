export const meta = {
  name: 'public-site',
  description: 'Marketing site (§45), pricing from DB, SEO curriculum pages + sitemap/robots/JSON-LD (§44), search UI (§28), billing UI (§31/§32), public daily question (§46), legal drafts; then verify',
  phases: [
    { title: 'Build', detail: 'public + billing builders (2 concurrent)' },
    { title: 'Verify', detail: 'typecheck/lint/tests + SEO/perf/no-premium-leak smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior product engineer + designer building the PUBLIC face of a production ed-tech platform for ZIMSEC and Cambridge O/A-Level students in Zimbabwe (CLAUDE.md is in your context — follow it strictly). Spec: docs/PRODUCT_SPEC.md (§44, §45, §46, §28, §31, §32, §29, §37, §43). Architecture: docs/ARCHITECTURE.md (§3.3 routes, §3.4 rendering: public pages static/ISR, §3.9 search, §7 payments).',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-06. Do not npm install / prisma migrate.',
  'BUILT AND AVAILABLE (read first, reuse): design system + MarketingHeader/MarketingFooter + ChevronPattern/Logo (src/components/{ui,layout,brand}), curriculum read services incl. SEO slug lookups (src/server/curriculum/*), search query/suggest (src/server/search/{query,suggest}.ts — premium teasers only), billing (src/server/billing/{plans,checkout,entitlements,subscriptions}.ts; startCheckout returns redirect | mobile instructions; /billing/return route exists and redirects to /app/billing/result?paymentId=), content renderer, daily question + attempts engine (DAILY_QUESTION mode; anonymous answers need a server-side marking path that does not create attempts for signed-out users: use the marking engine directly with rateLimits.dailyQuestionAnon), FAQ/Testimonial tables (CMS-managed; render nothing when empty — never invent testimonials or statistics), referral landing /r/[code] and share pages /s/[token] (being built by another workflow — link only).',
  'DESIGN: premium, calm, Zimbabwe-relevant without stereotypes (chevron motif sparingly), mobile-first, fast on slow networks: public pages are Server Components, statically rendered or ISR (export const revalidate = 3600) with NO per-request cookies on marketing/SEO routes (the root layout is already static: display preferences are applied by a pre-paint script, so keep public routes free of cookies()/headers()/session reads — a single such call makes the route dynamic), images via next/image with sizes, no client JS except tiny islands (mobile menu, FAQ accordion via <details>, search box). Copy from the spec: hero "Master Your Exams." + supporting line verbatim from §45. Never claim numbers (students, pass rates) the DB does not prove.',
  'SHARED-FILE RULE: do NOT edit src/worker/handlers.ts, src/server/lib/{rate-limit,audit,env,settings}.ts, prisma/**, src/app/layout.tsx (report needed changes). Other workflows may run concurrently (engagement + channels areas).',
  'Tests: unit/integration/component; Before finishing: npm run typecheck, npx eslint <your paths>, npx vitest run <your tests>. Only touch YOUR AREA.',
].join('\n')

const RESULT = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    routes: { type: 'array', items: { type: 'string' } },
    testsPassed: { type: 'number' },
    testsFailed: { type: 'number' },
    typecheckClean: { type: 'boolean' },
    remaining: { type: 'array', items: { type: 'string' } },
    sharedChangesNeeded: { type: 'array', items: { type: 'string' } },
  },
  required: ['files', 'routes', 'typecheckClean', 'remaining'],
}

function spec(key, area, task) { return { key, area, task } }
function run(s, deps) {
  return agent([
    COMMON,
    deps.length ? 'UPSTREAM AGENTS FINISHED BEFORE YOU (reuse): ' + JSON.stringify(deps) : '',
    '', 'YOUR AREA (only touch these paths): ' + s.area, '', s.task, '',
    'Final output: files, routes, test counts, remaining work, shared changes needed.',
  ].join('\n'), { label: 'build:' + s.key, phase: 'Build', schema: RESULT })
}

const MARKETING = spec('marketing',
  'src/app/(marketing)/** (replace the placeholder src/app/page.tsx by moving the home page into the (marketing) group: delete src/app/page.tsx only after src/app/(marketing)/page.tsx exists), src/components/marketing/**, src/server/marketing/** (+tests), public/images/** (only original SVG illustrations you create)',
  [
    'Build the marketing website (§45) and acquisition hooks (§46).',
    '1. Home "/" with sections in this order: Hero ("Master Your Exams." + the §45 supporting line, primary CTA "Start free" -> /register, secondary "Take the free diagnostic" -> /register?next=/app/diagnostic), How it works (select board -> level -> subjects -> diagnostic -> plan -> practise; the §52 journey as 4-6 steps), ZIMSEC and Cambridge cards (boards from DB with their qualifications), O-Level and A-Level, Subjects (categories + subject names from the DB catalogue, linking to SEO subject pages; only catalogue-available subjects), AI Tutor (what it does + the teach-first principle; honest note that answers are explained, not just given), Practice, Mock Exams, Schools (B2B value + "Talk to us" -> /schools), Pricing teaser (plans from DB; if no prices configured show "Pricing coming soon" — never invent), Testimonials (render ONLY published, consented Testimonial rows; omit the section when none), FAQ (published FaqItem rows; omit when none), final CTA. Free tools strip: daily question, exam countdown, free diagnostic (§46).',
    '2. /pricing: plans + prices from DB (listPublicPlans per currency USD/ZWG toggle), feature comparison generated from the entitlements JSON with human labels (map keys -> labels in one module), monthly/termly/yearly where prices exist, CTA to /register or /app/billing for signed-in users (link only — the page itself must stay static: no session read).',
    '3. /schools (B2B/B2B2C §53 pitch: teacher dashboards, assignments, analytics, roster import; contact/request form that creates a lead — store via a small service writing a Notification to platform admins or an Announcement-free table if one exists; check the schema for a lead/contact model, else send through messaging to SUPPORT_EMAIL and report), /about, /faq (all FaqItems), /daily (public daily question for signed-out visitors: today\'s question per qualification selector; answer marked server-side via the marking engine without creating attempts; rate-limited; CTA to sign up to track streaks), /exam-countdown (free tool: pick board/qualification/session from DB -> days remaining; provisional dates labelled).',
    '4. Legal: /legal/privacy, /legal/terms, /legal/cookies as DRAFT templates clearly bannered "Draft — requires legal review before launch", aligned with Zimbabwe\'s Cyber and Data Protection Act (Chapter 12:07) principles (lawful basis, minors/guardian consent, data subject rights, retention, processors incl. AI provider and payment providers, cross-border transfer notice) — informative, not legal advice.',
    '5. Metadata: per-page title/description, OpenGraph image for home (next/og), canonical URLs from APP_URL. MarketingHeader nav: Subjects, Pricing, Schools, Daily question, Sign in, Start free.',
  ].join('\n'))

const SEO = spec('seo-curriculum',
  'src/app/(public)/[board]/** , src/app/sitemap.ts, src/app/robots.ts, src/components/seo/**, src/server/seo/** (+tests)',
  [
    'Build public SEO curriculum pages (§44) without exposing premium content.',
    '1. Routes: /[board] (e.g. /zimsec: qualifications), /[board]/[qualification] (e.g. /zimsec/o-level, /cambridge/igcse: subjects by category), /[board]/[qualification]/[subject] (e.g. /zimsec/o-level/mathematics: subject overview, syllabus version label + code, topic list with public summaries, exam sessions (provisional labelled), what you get on the platform, CTA), /[board]/[qualification]/[subject]/[topic] (topic public summary + learning objectives + 1-2 FREE-preview lesson excerpts if marked free (never premium bodies) + sample practice question if the question is free/public + CTA). Use generateStaticParams for the catalogue (published/available only) + ISR revalidate; unknown slugs -> notFound(); reserved slugs (app, admin, api, login, register, onboarding, parent, teacher, school, legal, pricing, schools, about, faq, daily, s, r, invite, billing, dev, offline...) must never be captured — check how the route group avoids conflicts and add a guard.',
    '2. SEO metadata: generateMetadata (titles like "ZIMSEC O-Level Mathematics — topics, lessons and practice | APP_NAME"), canonical, OpenGraph, JSON-LD (Course / EducationalOrganization / BreadcrumbList as appropriate; no fake ratings), breadcrumbs UI.',
    '3. src/app/sitemap.ts (catalogue pages + marketing pages; lastModified from DB; chunk if large) and src/app/robots.ts (allow public pages, disallow /app, /admin, /api, /parent, /teacher, /school, /s/, /onboarding; sitemap URL).',
    '4. Tests: route-level tests for notFound on unknown slugs, premium content never present in rendered HTML for locked lessons/questions, metadata shape, sitemap contents.',
  ].join('\n'))

const SEARCH_BILLING = spec('search-billing-ui',
  'src/app/app/search/**, src/app/app/billing/**, src/components/search/**, src/components/billing/** (+tests), src/app/api/v1/search/** (if needed for autocomplete)',
  [
    'Build the in-app search UI (§28) and billing UI (§31, §32).',
    '1. Search: header search entry in the student area (report the one-line insertion into the student header if you cannot add it via an existing slot) + /app/search?q=&type=&subjectId= results page: tabs/facets by type (lessons, questions, flashcards, mock exams, study packs, topics), applied-filter chips from query understanding (board/qualification/subject/code detected) that can be removed, locked teasers for premium items with an upgrade link, cursor pagination, empty state with suggestions; autocomplete (debounced, accessible combobox, rateLimits.publicSearch) via a small GET route handler. Results link into the app (lesson reader, practice with questionId, flashcards, exams, topic pages).',
    '2. Billing: /app/billing (current plan + source (own / school / grant / parent), renewal or expiry date, entitlements summary in human terms, plans to upgrade with prices from DB (USD/ZWG), payment history from Payment rows (receipt numbers), cancel at period end / resume (subscriptions service), study packs purchased); checkout UI: choose plan price -> choose method: EcoCash / OneMoney (Paynow mobile: phone input with Zimbabwe format validation, then a "Check your phone to approve" screen polling the payment status every few seconds (server action reading Payment status; stop after a timeout with guidance)) or card (Paynow web or Stripe redirect via GET navigation per the CSP form-action note); sandbox option visible only in development. /app/billing/result?paymentId= (pending/success/failed/cancelled states, auto-refresh while pending, success shows what is unlocked). Never pass amounts from the client; use startCheckout with planPriceId/studyPackId and an idempotency key. Parent checkouts (Payment.payerUserId differs from beneficiaryUserId): the /billing/return route (src/app/billing/return/route.ts — you may edit it for this) must redirect to PARENT_PAYMENT_RESULT_PATH from @/server/family/billing (/parent/billing/result?paymentId=) instead of /app/billing/result.',
    'Component tests for the combobox and the mobile-money pending screen; integration tests for billing actions (payer permissions, idempotency).',
  ].join('\n'))

phase('Build')
const pMarketing = run(MARKETING, [])
const pSeo = run(SEO, [])
const pSB = run(SEARCH_BILLING, [])
const built = await Promise.all([pMarketing, pSeo, pSB])
const names = ['marketing', 'seo', 'search+billing']
built.forEach((b, i) => log(names[i] + ': ' + (b ? ('tc=' + b.typecheckClean + ' tests=' + (b.testsPassed || 0)) : 'FAILED')))

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER for the public site. Builder reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npm run typecheck ; npx eslint src tests ; npx vitest run . — fix failures in this workflow\'s areas (report others).',
  '2. Production build check (critical — nobody has run it yet): NEXT_DIST_DIR=.next-build-public npx next build. Fix build errors in your areas; report others precisely (file, error). Record which public routes are static (○/●) vs dynamic (ƒ) from the build output — marketing + SEO pages must be static/ISR; list any that are not and why.',
  '3. Smoke with NEXT_DIST_DIR=.next-verify-public npx next dev -p 3105 (background; stop by PID; never kill a server started by another agent; after stopping it, delete your own .next-verify-* directory to free disk space): GET /, /pricing, /schools, /about, /faq, /daily, /exam-countdown, /legal/privacy, /zimsec, /zimsec/o-level, /zimsec/o-level/mathematics, a topic page, /cambridge/igcse/chemistry, /sitemap.xml, /robots.txt -> 200 and sensible content; an unknown board slug -> 404; grep the HTML of a topic page for any premium lesson body text from the dev DB (must be absent); as the demo student, /app/search?q=quadratic and /app/billing -> 200; start a sandbox checkout for the STUDENT plan and complete it via the sandbox page -> subscription ACTIVE and /app/billing shows it.',
].join('\n'), {
  label: 'verify:public-site', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, build: { type: 'string' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'build', 'smoke', 'fixes', 'remainingIssues'] },
})

return { built, verify }
