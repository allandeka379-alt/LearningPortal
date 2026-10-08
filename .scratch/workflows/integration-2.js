export const meta = {
  name: 'integration-2',
  description: 'Apply roles + engagement seam fixes (jobs, presets, audit keys, assignment counters, invite routing, forced password change migration, nav, rbac subject scope) and re-verify',
  phases: [
    { title: 'Integrate', detail: 'one integrator applies the seam list (incl. one migration)' },
    { title: 'Verify', detail: 'full tests + role/engagement smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are the platform integration engineer for a production ed-tech platform (CLAUDE.md is in your context — follow it strictly). Repo root: ' + ROOT + ' (Windows). Today 2026-10-06. Builder requests are saved in .scratch/roles-shared-changes.md and .scratch/engagement-shared-changes.md (read both for exact names/paths).',
  'A concurrent workflow builds the PUBLIC site: src/app/(marketing)/**, src/app/(public)/**, src/app/app/{search,billing}/**, src/app/billing/**, src/components/{marketing,seo,search,billing}/**, src/server/{marketing,seo}/**, src/app/{sitemap,robots}.ts. Do NOT edit those. You own every other shared file for this task.',
  'Typecheck with `npm run typecheck` (4 GB heap). Before finishing: npm run typecheck, npx eslint <touched paths>, npx vitest run <touched areas>.',
].join('\n')

const ITEMS = [
  '1. src/worker/handlers.ts registerAllJobs(): add registerFamilyJobs (@/server/family/jobs), registerTeachingJobs (@/server/teaching/assignments), registerSchoolJobs (@/server/schools/jobs) and every register*Jobs() listed in .scratch/engagement-shared-changes.md (ai marking, leaderboards, notifications, referrals, flashcards if any). Then run the worker ~30 s (npx tsx --conditions=react-server src/worker/index.ts; kill by PID) and confirm every job type registers and the first scheduler tick has no failures; ai.mark jobs left in the dev DB from before must now succeed or self-assess cleanly.',
  '2. Assignment counters: in src/server/attempts/finalize.ts updateAssignmentProgress() call refreshAssignmentCounters(tx, [context.assignmentId]) (@/server/teaching/assignment-progress) after the progress update; in src/server/lessons/progress.ts call it after completeLessonAssignments()/startLessonAssignments() with the affected assignment ids. Tests.',
  '3. Decouple teaching from attempts internals: export closeAttemptForAssignment(attemptId, now) (and whatever loadAttemptContext use marking needs, as a public function) from src/server/attempts/index.ts; switch src/server/teaching/{assignments,marking}.ts to the public API.',
  '4. AUDIT_ACTIONS (src/server/lib/audit.ts): add class.create, class.update, class.archive, class_member.add, class_member.remove, class_teacher.add, class_teacher.remove, assignment.publish, assignment.close, parent_link.activate, parent_link.permissions_update, parent_link.ai_consent, school.plan_request, school.report.request, school.report.download, school.password_reset, school.subjects.update + any engagement-requested keys; replace the stand-in keys at the call sites (teaching, family, schools, engagement modules).',
  '5. RATE_LIMIT_PRESETS: add presets for the ad-hoc limiters (family FAMILY_RATE_LIMITS, teaching classJoin / classInviteTarget / classInviteSender, schools SCHOOL_RATE_LIMITS, + engagement-requested ones) with rateLimits.* helpers; switch call sites (keep key shapes); labels in src/server/cms/settings/catalogue.ts RATE_LIMIT_LABELS (incl. lessonProgress and studyPlanGenerate which lack labels).',
  '6. Forced password change for school-provisioned and school-reset accounts (security): add `passwordMustChange Boolean @default(false)` to User in prisma/schema.prisma (with a /// doc comment), create the migration with `npx prisma migrate dev --name user_password_must_change` (you are explicitly permitted to run this ONE migration; the Prisma CLI runs as the owner via MIGRATION_DATABASE_URL), then `npm run db:grants` and `npm run db:generate`. Set it on roster import and on school-admin password resets (src/server/schools); after a successful password login of such a user, the auth flow redirects to /change-password (new page in src/app/(auth)/change-password: current password + new password with the policy; clears the flag; revokes other sessions; audit) and every guarded area redirects there until changed (guards check the flag cheaply via the session/actor). Tests for the full flow.',
  '7. Invitations: /invite/[token] routes CLASS_MEMBER invitation tokens to /app/classes/invite/[token]; `next` is preserved through registration, verification and onboarding (verify the auth + onboarding flows keep ?next= safely). Tests.',
  '8. rbac.canViewStudent: for a shared class with no subject, derive the visible subject ids from that class\'s assignments (the documented rule) instead of returning subjectIds: null; analytics/teacher.ts accepts the optional subjectIds scope; tests.',
  '9. Student nav (src/components/student/nav.ts): add menu entry Family (/app/family, icon users, before Settings); make sure the nav tests and StudentShell tests are consistent with ALL nav changes made by the engagement workflow (Tutor, Flashcards, Leaderboard, Achievements, Invite, Notifications as built) and roles (Classes) — fix the 4 failing tests by updating expectations to the intended final nav, not by weakening assertions. Add a "Parents and guardians" link card on /app/settings to /app/family.',
  '10. /teacher/marking: add a redirect to /teacher/review (the spec/architecture name).',
  '11. Onboarding school picker: when a student picks a directory school in onboarding, create SchoolMember(STUDENT, REQUESTED, source REQUEST) so school admins see join requests (the school UI is ready) — read src/server/schools for the approval flow; tests.',
  '12. Admin console /admin/schools/[id]: show school plan requests (from the audit entries with metadata.operation "school.plan_request" or the table the schools module uses).',
  '13. Apply every remaining item from .scratch/engagement-shared-changes.md that is a code change in non-public areas (insertion points for tutor entry links on lessons/practice feedback/exam review, share button slot on exam results, flashcards button on the topic page, notification bell in the student header, referral cookie hook in registration, AI marking consumer wiring, etc.).',
  '15. Tests that depend on global table state (forbidden by CLAUDE.md, they fail every full run): src/server/schools/billing.integration.test.ts "shows the live subscription…" and src/app/admin/plans/commerce-pages.test.tsx "plans list and plan detail" — make them create and filter by their own fixtures. Tests that time out only under full-suite load: src/server/notifications digest "stops at its batch cap" (use a small batch cap in the test instead of creating many rows) and src/components/marketing/SchoolEnquiryForm.test.tsx (narrow the queries; do not just raise timeouts; this one file is in the public-site area — edit ONLY the test file).',
  '16. Referrals (product decision by the lead): when Setting referrals.rules.enabled is false, the sweep must leave PENDING referrals untouched (no permanent REJECT "disabled"); they qualify normally once the programme is re-enabled. Update decideQualification + tests.',
  '17. Student header at 360px with the new NotificationBell: ensure the header items (logo, streak, countdown pill, bell, avatar) fit without overflow at 360px — e.g. collapse the countdown pill to an icon + number below 380px or move it into the menu; keep 44px targets. Add a component test asserting the compact variant renders at narrow widths (class/props based).',
  '14. Dev seed: extend the demo school with a provisioned roster (2-3 username students with passwordMustChange=true, documented in docs/DEV_SEED.md with their temporary passwords), an assignment and an announcement, so the teacher/school areas have realistic dev data. Run npm run db:seed:demo twice (idempotent).',
]

phase('Integrate')
const integ = await agent([COMMON, '', 'Apply ALL of these items:', ...ITEMS, '', 'Return what you changed per item, test counts, and anything not done.'].join('\n'), {
  label: 'integrate:roles-engagement-seams', phase: 'Integrate',
  schema: { type: 'object', properties: { perItem: { type: 'array', items: { type: 'object', properties: { item: { type: 'number' }, status: { type: 'string' }, notes: { type: 'string' } }, required: ['item', 'status'] } }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, typecheckClean: { type: 'boolean' } }, required: ['perItem', 'typecheckClean'] },
})

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER. Integrator report: ' + JSON.stringify(integ),
  '1. npm run typecheck ; npx eslint src tests prisma ; npx vitest run . — fix failures outside the public-site areas (report those).',
  '2. Re-run the existing smoke scripts (read them first; update only for intended behaviour changes): .scratch/journey-smoke.ts (student journey), .scratch/verify-roles/smoke.ts (parent/teacher/school), and the engagement verifier\'s smoke script if present — each against its own server `NEXT_DIST_DIR=.next-verify-int2 npx next dev -p 3107` (background; stop by PID; then delete .next-verify-int2). Add checks: a provisioned roster student logging in is forced to /change-password and can then reach /app; a CLASS_MEMBER invite link lands on the class invite page.',
  '3. Confirm the worker runs every registered job type without failures (30 s run, kill by PID).',
].join('\n'), {
  label: 'verify:integration-2', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, smoke: { type: 'string' }, worker: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'smoke', 'fixes', 'remainingIssues'] },
})

return { integ, verify }
