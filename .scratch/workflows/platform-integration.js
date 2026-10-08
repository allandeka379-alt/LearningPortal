export const meta = {
  name: 'platform-integration',
  description: 'Apply admin-CMS seam fixes (jobs, audit keys, presets, settings, nav/icons/badges, streamed uploads, publish reopen, blueprint rules, media usage, student content flags) + parallel dev-server support; verify',
  phases: [
    { title: 'Integrate', detail: 'one integrator applies the seam list' },
    { title: 'Verify', detail: 'full tests + admin/student smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are the platform integration engineer for a production ed-tech platform (CLAUDE.md is in your context — follow it strictly). Repo root: ' + ROOT + ' (Windows). Today 2026-10-06. Do not prisma migrate. Builder requests are saved in .scratch/admin-shared-changes.md (read it for exact names/paths).',
  'Other workflows may run concurrently and are building: src/server/{tutor,solver,leaderboards,sharing,referrals,family,teaching,schools}/**, src/server/flashcards/{service,decks}.ts, src/server/attempts/ai-marking.ts, src/server/notifications/{preferences,digest}.ts, src/app/app/{tutor,solver,flashcards,leaderboard,achievements,invite,notifications,classes,family}/**, src/app/{parent,teacher,school,s,r,invite}/**, src/components/{tutor,solver,flashcards,gamification,leaderboard,share,notifications,parent,family,teacher,school}/**. Do NOT edit those. You own the shared files listed below for this task.',
  'Before finishing: npx tsc --noEmit -p tsconfig.json, npx eslint <touched paths>, npx vitest run <touched areas>.',
].join('\n')

const ITEMS = [
  '1. src/worker/handlers.ts registerAllJobs(): add registerAnnouncementJobs (src/server/cms/announcements/fanout), registerMediaJobs (src/server/cms/media/jobs), registerImportJobs (src/server/cms/imports/service), registerAiDraftJobs (src/server/cms/ai-drafts/jobs), registerAiUsageJobs (src/server/cms/settings/ai-usage-rollup). Run the worker ~20 s afterwards (npx tsx --conditions=react-server src/worker/index.ts; kill by PID) and confirm no registration/handler errors.',
  '2. src/server/lib/audit.ts AUDIT_ACTIONS: add every key requested in .scratch/admin-shared-changes.md (content.create/update/delete/submit/request_changes/draft_copy/discard, media.upload/update, content_flag.triage/resolve/reject, school.create/update/status_change, school.analytics.view, invitation.create/resend/revoke, announcement.* as requested, import.upload/validate/cancel/complete/fail, ai_generation.request/cancel/complete/fail, plan_price.create, promo_code.delete, subscription.extend, job.enqueue, user.password_reset_sent, user.verification_reminder_sent, curriculum.update, curriculum.retire, exam_session.publish, grade_scheme.version) with consistent naming; then replace the stand-in keys at every call site that used a "closest key" placeholder (grep TODO(shared) / the builders\' notes). Add the missing STAFF audit for viewing /admin/schools/[id]/analytics (school.analytics.view).',
  '3. src/server/lib/rate-limit.ts presets: adminContactSend (per recipient: 3 per 15 min AND 10 per day — two presets if needed) used by password-reset instructions, verification reminders and school invitations; contentFlag ({ limit: 20, windowSeconds: 3600 } per user) used by src/server/cms/flags/service.ts. Switch call sites to rateLimits.*.',
  '4. src/server/lib/settings.ts SETTING_DEFINITIONS: register privacy.parentAiAccess.enabled (z.boolean(), default false) and ai.contentGeneration (schema + default exported from src/server/cms/ai-drafts/service.ts); add both to prisma/seed/data/settings-extra.ts with descriptions; make the settings catalogue use the registered definitions instead of passing schemas ad hoc. Check ai.enabled accepts what the gateway config expects.',
  '5. Admin nav + icons: src/components/layout/nav-icons.tsx add semantic icons review (ClipboardCheck), flags (Flag), plans (Tags), media (Images); src/components/admin/nav.ts add Exam sessions, Grade schemes (curriculum.manage), Media library (content.draft, scope all), Promo codes (billing.manage), AI usage/settings links; use the new icons. src/app/admin/layout.tsx: sidebar badges via adminNavFor(actor, { badges: { review: <IN_REVIEW total from reviewQueueCounts(actor)>, flags: await countOpenFlags(actor) } }) — cheap indexed counts.',
  '6. Streamed uploads instead of raising the Server Action body limit for everyone: implement POST /api/v1/uploads (route handler via apiRoute: session auth, same-origin CSRF check, permission per purpose (content media: content.draft; imports: content.draft; solver: student entitlements), streamed body read with a hard byte cap per purpose (content images 10 MB, imports 20 MB, solver photos ai.limits.maxImageBytes), magic-byte validation via src/server/lib/uploads.ts, returns the MediaAsset/ContentImport id). Switch /admin/media and /admin/imports upload forms to it (client fetch with progress). Keep experimental.serverActions.bodySizeLimit at 6mb. Tests for size cap, wrong type, auth, CSRF.',
  '7. src/server/content/publish.ts: add reopenArchived(tx, entityType, id, actor) (ARCHIVED -> DRAFT with revision + 1 on the root and its parts, per the C1.5 trigger rules) + test; expose it in the admin review/item pages that need it (the questions builder asked for it).',
  '8. src/server/attempts/selection.ts planAssessment: honour AssessmentBlueprintRule.marksPerQuestion, cognitiveSkill and objectiveId when drawing questions (attempts must match what the admin builder validates) + tests.',
  '9. Media usage: question, assessment and study-pack draft saves call syncMediaUsage / usageFieldsFromAggregate (src/server/cms/media/usage.ts) so the media library "where used" list and delete protection are correct + tests.',
  '10. Student "Report a problem" (§42): add a small ReportProblemButton (src/components/questions/ReportProblem.tsx + a server action under src/app/app/_actions/report-problem.ts) calling createContentFlag(actor, { entityType, entityId, reason, details, revision, context }) with rateLimits.contentFlag; place it in FeedbackPanel / review mode question views and on lesson pages (lesson footer). Reasons/labels from src/server/cms/flags. Students only see a calm "Thanks — our editors will review this" confirmation.',
  '11. Parallel dev servers: next.config.ts add `distDir: process.env.NEXT_DIST_DIR || ".next"`; .gitignore `.next*/`; document in CLAUDE.md (Local environment): verifiers run `NEXT_DIST_DIR=.next-<label> npx next dev -p <port>` so parallel workflows never collide, and must never kill another agent\'s dev server.',
  '13. Fix the growing-runtime test src/server/search/search.integration.test.ts "reindexAll streams batches and sweeps stale documents": it reindexes the WHOLE shared test DB, so it slows down as other tests add rows (times out at 20 s). Give reindexAll a scoping option used by tests (e.g. entityIds / a predicate per type, or a schoolId-free tag) so the test only processes its own fixtures, keep the production behaviour identical, and assert the sweep on its own rows. Do not just raise the timeout.',
  '12. package.json devDependencies: add fflate explicitly (already present transitively for read-excel-file; used by src/server/cms/imports/testing.ts) — run `npx -y npm@11 install -D fflate` (npm 10 has an arborist bug here); confirm node_modules is intact afterwards (npx prisma --version, npx vitest --version).',
]

phase('Integrate')
const integ = await agent([COMMON, '', 'Apply ALL of these items:', ...ITEMS, '', 'Return what you changed per item, test counts, and anything not done.'].join('\n'), {
  label: 'integrate:platform-seams', phase: 'Integrate',
  schema: { type: 'object', properties: { perItem: { type: 'array', items: { type: 'object', properties: { item: { type: 'number' }, status: { type: 'string' }, notes: { type: 'string' } }, required: ['item', 'status'] } }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, typecheckClean: { type: 'boolean' } }, required: ['perItem', 'typecheckClean'] },
})

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER. Integrator report: ' + JSON.stringify(integ),
  '1. npx tsc --noEmit -p tsconfig.json ; npx eslint src tests ; npx vitest run . — fix failures in the integrated areas (report others).',
  '2. Smoke with NEXT_DIST_DIR=.next-verify-platform npx next dev -p 3104 (background, PID; stop with taskkill /PID <pid> /T /F): as demo admin and editor (sessions via the auth service in a .scratch tsx script with --conditions=react-server) GET /admin, /admin/media, /admin/imports, /admin/review, /admin/flags, /admin/exam-sessions, /admin/grade-schemes, /admin/promo-codes, /admin/ai/usage -> 200; POST a small PNG to /api/v1/uploads as the editor (with Origin header) -> 2xx and a MediaAsset; oversize and wrong-type uploads rejected; as the demo student, report a problem on a practice question -> ContentFlag row created and visible in /admin/flags. If another next dev server is running for another distDir, leave it alone.',
].join('\n'), {
  label: 'verify:platform-integration', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'smoke', 'fixes', 'remainingIssues'] },
})

return { integ, verify }
