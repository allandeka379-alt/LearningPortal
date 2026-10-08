export const meta = {
  name: 'admin-cms',
  description: 'Phase 14/15: admin shell+dashboard, curriculum management, lesson/flashcard editors + review workflow, question/assessment builders, bulk import + AI drafts, commerce/AI/settings admin; then verify',
  phases: [
    { title: 'Build', detail: 'admin builders (2 concurrent)' },
    { title: 'Verify', detail: 'typecheck/lint/tests + authorization + HTTP smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior engineer + product designer building the ADMIN CMS and operations console of a production ed-tech platform (CLAUDE.md is in your context — follow it strictly, ESPECIALLY "Database rules enforced by Postgres": content workflow DRAFT -> IN_REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED, published content immutable (edit via draft copy + publish merge), four-eyes approval when enabled, AI drafts need a human approver, syllabus versions immutable once published, append-only AuditLog/ContentRevision). Spec: docs/PRODUCT_SPEC.md (§3, §25, §26, §27, §35, §36, §41, §42, §31). Architecture: docs/ARCHITECTURE.md (§3.3 routes, §4 data, §5.2 RBAC matrix, §6.6 content generation). Schema: prisma/schema.prisma (do not edit). Authoring guide: docs/CONTENT_AUTHORING.md.',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-05. Do not npm install / prisma migrate / next dev|build (the verifier runs the dev server).',
  'BUILT SERVICES TO REUSE (read their code first): auth guards + RBAC (src/server/auth/*: requirePermission, PERMISSIONS, getActor), audit (src/server/lib/audit.ts), rate-limit, jobs (src/server/lib/jobs.ts), settings (src/server/lib/settings.ts), storage + uploads (src/server/lib/{storage,uploads}.ts createMediaAsset with magic-byte sniffing), content publish helper (src/server/content/publish.ts — THE ONLY way to approve/publish/archive/edit-published), content renderer (src/server/content/render.ts for live preview + warnings; src/lib/content/blocks for the directive toolbar), question contracts (src/lib/questions/*) + marking engine (src/server/marking/* for "try this question" previews), curriculum read services (src/server/curriculum/*), search indexer (src/server/search/indexer.ts — enqueue/reindex on publish/archive), analytics (src/server/analytics/admin.ts getAdminAnalytics), billing (src/server/billing/*: plans, subscriptions, checkout, webhooks applyLocalPaymentAction, providers refund), AI gateway (src/server/ai/index.ts — via the gateway only; lint forbids SDK imports), notifications (src/server/notifications/*).',
  'ADMIN UI RULES: AdminShell from src/components/layout (grouped sidebar per §36: Dashboard, Users, Schools, Students, Teachers, Boards, Qualifications, Subjects, Syllabuses, Topics, Lessons, Questions, Exams, Study Packs, Flashcards, Review queue, Flags, Imports, AI, Subscriptions, Payments, Plans & prices, Analytics, Notifications, Settings, Audit log). Dense but readable desktop-first layouts that still work on a tablet; DataTable with server-side cursor pagination, filters and search in the URL (searchParams); forms with Field + zod validation errors; destructive or irreversible actions behind confirm dialogs; every mutation is a Server Action that (1) re-checks permission with the *ForAction guard, (2) validates with zod, (3) calls a service in src/server/cms/<area>/ (business logic NOT in components), (4) audits, (5) returns ActionResult. Show status badges for the content workflow and who/when for approvals. Never expose secrets (API keys) in the UI. All lists honest: empty states, no invented numbers.',
  'RBAC: CONTENT_EDITOR creates/edits drafts and submits for review; reviewers/ADMIN approve and publish per the ARCHITECTURE §5.2 matrix and the four-eyes setting; ADMIN manages users/schools/commerce/settings; SUPER_ADMIN only for admin role grants, AI kill switch/budget and break-glass. The admin area layout (src/app/admin/layout.tsx) requires a staff role; every page and action re-checks its specific permission.',
  'Tests: integration tests for every service in src/server/cms/** (as app_rw on the test DB; unique fixtures via tests/factories; never truncate) covering permissions (editor cannot publish when four-eyes requires another approver; non-staff forbidden), validation, workflow transitions via the publish helper, audit rows written. Component tests only for complex client editors. Before finishing: npx tsc --noEmit -p tsconfig.json (zero errors in your files), npx eslint <your paths>, npx vitest run <your tests>. Only touch YOUR AREA.',
  'SHARED-FILE RULE: do NOT edit src/worker/handlers.ts, src/server/lib/rate-limit.ts, src/server/lib/audit.ts, src/server/lib/env.ts, prisma/schema.prisma or prisma/seed/data/* — another workflow runs concurrently. Export register<Domain>Jobs() from your module and REPORT it (sharedChangesNeeded); for a new rate-limit preset or audit action, use the closest existing one and report the addition. Demo accounts for every role: docs/DEV_SEED.md.',
].join('\n')

const RESULT = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    routes: { type: 'array', items: { type: 'string' } },
    exportedApis: { type: 'array', items: { type: 'string' } },
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
    deps.length ? 'UPSTREAM ADMIN AGENTS FINISHED BEFORE YOU — reuse their shell/components/services: ' + JSON.stringify(deps) : '',
    '', 'YOUR AREA (only touch these paths): ' + s.area, '', s.task, '',
    'Final output: files, routes, exported APIs, test counts, remaining work, shared changes needed.',
  ].join('\n'), { label: 'build:' + s.key, phase: 'Build', schema: RESULT })
}

const SHELL = spec('admin-shell-ops',
  'src/app/admin/layout.tsx, src/app/admin/page.tsx, src/app/admin/(loading|error|not-found).tsx, src/app/admin/{users,schools,students,teachers,audit,analytics,notifications}/**, src/components/admin/** (shared admin components: nav config src/components/admin/nav.ts, StatusBadge, WorkflowActions, ConfirmAction, FilterBar, etc.), src/server/cms/{users,schools,announcements}/**',
  [
    'Build the admin shell, operations dashboard and people/organisation management (§35, §36, §23 admin side, §39 audit).',
    '1. Layout + nav (single exported config other admin agents extend; items flagged by required permission so editors only see content sections).',
    '2. /admin dashboard: the §36 funnel from getAdminAnalytics (users -> active students -> paid students -> revenue (per currency) -> most popular subjects -> most attempted topics -> retention), date range picker (URL), today-so-far tiles, coverage notice when rollups are missing (with a button to enqueue analytics.backfillMetrics), simple accessible SVG charts (no chart library; follow the dataviz guidance: clear labels, no colour-only encoding). /admin/analytics: deeper view (series, difficult topics, AI usage by feature, signups by channel, paid by plan).',
    '3. Users (/admin/users, /admin/students, /admin/teachers): search by email/phone/name (cursor pagination), user detail (roles, profile, enrolments, subscription status, recent activity, sessions with revoke, audit trail), actions: suspend/unsuspend, force sign-out, reset password link, role grant/revoke (admin roles only by SUPER_ADMIN; school roles via schools), resend verification. NEVER show AI conversation content (RLS forbids it anyway); break-glass is out of scope.',
    '4. Schools (/admin/schools): list/create/edit, verify (status transitions), members (invite school admin/teacher), seats/subscription summary, link to school analytics.',
    '5. Announcements + notifications (/admin/notifications): create GLOBAL / SCHOOL / CLASS announcements with audience roles, schedule/publish/expire; fan-out via jobs + notifications service.',
    '6. Audit log viewer (/admin/audit): filters by actor/entity/action/date, read-only.',
  ].join('\n'))

const CURRICULUM = spec('curriculum-admin',
  'src/app/admin/{boards,qualifications,subjects,syllabuses,topics,exam-sessions,grade-schemes}/**, src/server/cms/curriculum/** (+tests), src/components/admin/curriculum/**',
  [
    'Build curriculum management (§3, §4, §26 versioning, §27 licensing metadata, §17 exam sessions).',
    '1. CRUD for countries (read-mostly), exam boards (+ country availability), qualification levels, qualifications (+ year groups), subject categories, subjects (catalogue status incl. the "verified" semantics — staff must confirm codes/names against official lists; show the seed note), with slugs validated for SEO uniqueness and a warning when renaming published slugs.',
    '2. Syllabus versions (§26): list versions per subject (DRAFT / CURRENT / ARCHIVED with effective dates); "Create new version" clones the current version\'s topic tree, objectives and components into a DRAFT with lineage (originTopicId or equivalent — read the schema); edit the DRAFT tree (add/rename/reorder/move topics & subtopics, learning objectives, components/routes e.g. IGCSE Core/Extended); publish a version (requires copyright status cleared + source, effective dates; previous CURRENT becomes ARCHIVED per the schema rules) — published versions are read-only in the UI (the DB enforces it too). Copy/re-tag content to the new version: a tool that maps lineage and adds QuestionTopic/LessonTopic/FlashcardTopic tags for the new version\'s topics (tags are editable metadata per the schema notes). Students pinned to old versions keep their content.',
    '3. Topic tree editor: accessible tree (keyboard), drag-free reordering via up/down buttons (works on touch), bulk add from pasted outline (indented text -> nested topics) for fast entry of official syllabus structures (staff paste from licensed documents; store source metadata).',
    '4. Exam sessions: create per board/qualification with series code, dates, isProvisional flag + publish status (only PUBLISHED sessions feed countdowns); grade schemes: create/edit bands as ESTIMATES (bands freeze once used — the DB creates a new scheme row; the UI explains this).',
  ].join('\n'))

const LESSONS = spec('lesson-flashcard-editors',
  'src/app/admin/{lessons,flashcards,media,review,flags}/**, src/server/cms/{lessons,flashcards,media,review,flags}/** (+tests), src/components/admin/editor/**',
  [
    'Build lesson + flashcard authoring, media library and the editorial workflow UI (§8, §18, §25, §27, §41, §42).',
    '1. Lesson editor (/admin/lessons): list with filters (subject, syllabus, topic, status, aiGenerated, author); editor with markdown source textarea + directive insert toolbar (CONTENT_BLOCK_TYPES), live server-rendered preview (debounced server action calling renderContent; show RenderedContent warnings e.g. missing alt text) side-by-side on desktop / tabs on mobile, topic tagging (primary + extra), learning objectives, estimated minutes, free-preview flag, SEO fields, licensing fields (source, author, copyright status, licence, publication date — required before review), attached practice questions (LessonQuestion). Editing a PUBLISHED lesson = createDraftCopyForEdit then publish merge.',
    '2. Flashcard editor: front/back markdown with preview, card type, topic tags, bulk create from a 2-column paste.',
    '3. Media library (/admin/media): upload images/diagrams via createMediaAsset (alt text REQUIRED, caption, licence/source), grid with search, usage list (ContentMediaUsage), copy "asset:<id>" snippet for the editor.',
    '4. Review queue (/admin/review): all content types IN_REVIEW with diff against the last published revision (ContentRevision snapshot vs current draft — readable field-level diff), approve / request changes (back to DRAFT with a note) / publish via the publish helper; four-eyes respected (approve button disabled with explanation when the actor is the last author); AI-generated items clearly badged and require explicit human approval. After publish: enqueue search reindex for the item.',
    '5. Revisions history per item (read-only snapshots) and ARCHIVE action.',
    '6. Content flags (/admin/flags, §42): queue of ContentFlag (incorrect answer, ambiguous question, incorrect marking, wrong topic, wrong difficulty, other) with context (the item, flag reason/comment, flagger role), triage to IN_PROGRESS, resolve (with resolution note; link to editing the item) or reject. Also an API for students/teachers to create flags is NOT yours (done later in the student UI) — but export the service function createContentFlag(actor, input) with rate limiting for them to use.',
  ].join('\n'))

const QUESTIONS = spec('question-assessment-builders',
  'src/app/admin/{questions,exams,study-packs}/**, src/server/cms/{questions,assessments,study-packs}/** (+tests), src/components/admin/questions/**',
  [
    'Build the question bank editor, assessment/mock-exam builder and study packs (§9, §12, §24, §42).',
    '1. Questions (/admin/questions): powerful list filters (board, qualification, subject, syllabus, topic, type, difficulty, marks, status, year, paper, skill, aiGenerated, flagged) with counts; editor with a per-type form for ALL QuestionTypes driven by src/lib/questions schemas (MCQ options with correct flags + per-option feedback; multi-select; true/false; short answer accepted variants + normalisation flags + keyword rubric points; numerical value/tolerance/sig figs/units; fill-in-blank with per-blank alternatives; matching pairs; diagram labelling with MediaAsset + hotspot coordinates (click on the image to place hotspots); structured questions with parts (a)(b)(c) each with its own type/marks; calculation; essay/extended with mark-scheme points for AI-assisted marking; markingMode), metadata (§9: difficulty, marks, estimated time, year, paper (ORIGINAL/LICENSED only — never reproduce copyrighted past papers; the paper field describes the style/paper the question targets), skill/assessment objective, learning objectives, topic tags), explanation, worked solution, hints (ordered), relevant concept, licensing fields. "Try it" preview: render the student view and mark a sample response with the real marking engine (server action) so editors verify the answer key. Editing published questions via draft copy + publish merge (revision bump keeps past attempts interpretable).',
    '2. Assessments (/admin/exams): create topic/chapter/subject tests, timed exams and mock exams: metadata (kind, subject, syllabus/route, instructions, time limit, attempt cap, grade scheme, free flag), sections (Paper 1 / Section A), fixed items (pick questions with the filtered picker; marks auto-sum; reorder) and/or blueprint rules (topic, difficulty range, count, marks) with a live "can this blueprint be satisfied by the published bank?" check; preview as a student; workflow via publish helper.',
    '3. Study packs (/admin/study-packs, §24): scope rules (qualification/subject/syllabus), which features they unlock (entitlements doc validated by entitlementsSchema), price rows (configurable, never hard-coded), description, cover image (MediaAsset), allowPdfExport only when every included item\'s licence permits (show a check), workflow.',
  ].join('\n'))

const IMPORTS_AI = spec('imports-ai-generation',
  'src/app/admin/{imports,ai}/** (except src/app/admin/ai/settings/** owned by commerce-ai-settings), src/server/cms/{imports,ai-drafts}/** (+tests)',
  [
    'Build bulk import (§25) and AI content generation for editors (§41).',
    '1. Imports (/admin/imports): upload CSV / Excel (.xlsx via read-excel-file) / JSON for questions, flashcards, topics (outline) and lessons (markdown + front-matter in JSON); downloadable templates (CSV headers + JSON schema examples generated from the zod schemas); a dry-run validation report (row number, field, error) before committing; commit creates a ContentImport record and rows as DRAFT (the DB forces imported rows to DRAFT) with source/licence metadata required at import level; idempotency (re-uploading the same file hash warns); large files processed via a background job with progress (jobs.ts) — export the job handler for registration.',
    '2. AI drafts (/admin/ai/generate): editor picks scope (syllabus/subject/topic, objectives), kind (lesson explanation, practice questions, MCQs, flashcards, explanations, hints, study plan template), count, difficulty, language level -> AiGenerationJob (QUEUED -> RUNNING -> COMPLETED/FAILED) processed by a job handler that calls the AI gateway (DEEP tier route contentGeneration, structured outputs validated by src/lib/questions schemas / flashcard / lesson schemas; reject invalid items), inserts results as DRAFT with aiGenerated = true and generationJobId, never publishes (§41). Prompts instruct ORIGINAL content aligned to the syllabus objectives, no copying of past papers/textbooks, Zimbabwean context where natural. Job list with status, cost, items created, links into the review queue. Without an API key the page explains AI is not configured (no fake output). Quota/budget handled by the gateway; restrict to CONTENT_EDITOR+ with the ai permission.',
  ].join('\n'))

const COMMERCE = spec('commerce-ai-settings',
  'src/app/admin/{plans,subscriptions,payments,promo-codes,settings}/**, src/app/admin/ai/settings/**, src/app/admin/ai/usage/**, src/server/cms/{commerce,settings}/** (+tests)',
  [
    'Build commerce, AI operations and settings administration (§31 configurable prices, §32 payment records, §40 admin-configurable quotas, §36).',
    '1. Plans & prices (/admin/plans): edit plan name/description/public flag/order and the entitlements JSON via a structured form generated from entitlementsSchema (booleans as switches, limits as numbers with "unlimited" toggle, model tier select) with a diff preview before saving; prices: add a new PlanPrice row per change (never edit a used price in place — the DB enforces history), activate/deactivate, per currency (USD, ZWG) and interval.',
    '2. Subscriptions (/admin/subscriptions) and payments (/admin/payments): searchable lists, detail views (payment timeline from PaymentEvent, provider refs, amounts), actions: cancel subscription (at period end / now), extend via EntitlementGrant (audited, reason required), refund (provider.refund where supported, else record a manual refund through the payment state machine; full refunds of subscriptions flagged for review per billing policy), mark disputed. Promo codes (/admin/promo-codes): CRUD within the DB CHECKs.',
    '3. AI operations (/admin/ai/usage and /admin/ai/settings): usage by day/feature/model/tier (AiUsageDaily, AiSpendDaily), top users by cost (ids only + link to user admin), cache hit rate; settings editor for ai.enabled (kill switch, SUPER_ADMIN), ai.routing (tiers/models/effort/maxTokens per route, price overrides), ai.limits, ai.budget — validated with the zod schemas exported by src/server/ai/config.ts; call resetAiConfigCache() after saving; show whether ANTHROPIC_API_KEY is configured (boolean only).',
    '4. Settings (/admin/settings): typed editors for other Setting keys (study.defaults, gamification.xp, rate limits if present, privacy switches such as parent AI access (default OFF)), each with description and audit.',
  ].join('\n'))

phase('Build')
const pShell = run(SHELL, [])
const pCurr = run(CURRICULUM, [])
const pLessons = pShell.then(s => run(LESSONS, [s].filter(Boolean)))
const pQuestions = pShell.then(s => run(QUESTIONS, [s].filter(Boolean)))
const pImports = Promise.all([pShell, pQuestions, pLessons]).then(d => run(IMPORTS_AI, d.filter(Boolean)))
const pCommerce = pShell.then(s => run(COMMERCE, [s].filter(Boolean)))
const built = await Promise.all([pShell, pCurr, pLessons, pQuestions, pImports, pCommerce])
const names = ['shell-ops', 'curriculum', 'lessons-flashcards', 'questions-assessments', 'imports-ai', 'commerce-ai-settings']
built.forEach((b, i) => log(names[i] + ': ' + (b ? ('tc=' + b.typecheckClean + ' tests=' + (b.testsPassed || 0)) : 'FAILED')))

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER for the admin CMS. Builder reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npx tsc --noEmit -p tsconfig.json ; npx eslint src tests ; npx vitest run src/server/cms src/app/admin src/components/admin — fix failures (root causes; do not weaken tests). Another workflow (student UI under src/app/app, src/app/onboarding, src/components/{student,dashboard,subjects,questions,lessons,exam,onboarding,plan}) may be running: do not edit its files; report their errors.',
  '2. Authorization audit: for EVERY file under src/app/admin, confirm each page calls a guard and each server action re-checks its permission (grep + read). Write an integration test that calls a representative set of admin actions as STUDENT, TEACHER, CONTENT_EDITOR and ADMIN and asserts allow/deny per the RBAC matrix.',
  '3. HTTP smoke: start "npx next dev -p 3101" in the background (record PID); using a session for the seeded admin and editor accounts (docs/DEV_SEED.md; create sessions via the auth service in a .scratch tsx script with --conditions=react-server), GET every /admin route and assert 200 / no error markers; as a student assert /admin redirects or 403s. Stop the server by PID (taskkill /PID <pid> /T /F); confirm port 3101 free.',
  '4. Workflow end-to-end via services: editor creates a question draft -> submits -> (four-eyes ON in the test transaction) editor cannot approve own -> admin approves + publishes -> student-facing query sees it -> edit published via draft copy -> publish merge bumps revision -> ContentRevision has both snapshots -> search index updated.',
].join('\n'), {
  label: 'verify:admin-cms', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, authzAudit: { type: 'string' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'lintClean', 'testsPassed', 'testsFailed', 'authzAudit', 'fixes', 'remainingIssues'] },
})

return { built, verify }
