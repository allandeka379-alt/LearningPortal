export const meta = {
  name: 'roles',
  description: 'Phase 12: parent area + linking/consent, teacher classes/assignments/marking/analytics, school admin (roster import, classes, reports), student class+family features; then verify',
  phases: [
    { title: 'Build', detail: 'role-area builders (2 concurrent)' },
    { title: 'Verify', detail: 'typecheck/lint/tests + authorization matrix + HTTP smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior product engineer building the PARENT, TEACHER and SCHOOL ADMIN experiences (B2B / B2B2C, §21, §22, §23, §53) of a production ed-tech platform for Zimbabwe (CLAUDE.md is in your context — follow it strictly). Spec: docs/PRODUCT_SPEC.md. Architecture: docs/ARCHITECTURE.md (§5.2 RBAC matrix, §5.3 resource-level authorization, §5.12 minors, §4 data). Schema: prisma/schema.prisma (do not edit) — read ParentStudentLink (consent episodes, permission flags, canViewAiConversations + consent), School, SchoolMember, SchoolSubject, Class, ClassTeacher, ClassMember, Invitation, Announcement, Assignment, AssignmentProgress, SchoolReport, User.loginUsername / provisionedBySchoolId / contact phone, QuestionAttemptMarking, plus the tenancy CHECKs/triggers in the init migration (school-owned questions/tests, ClassTeacher membership guard, SchoolMember removal cascade).',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-05. Do not npm install / prisma migrate / next dev|build (the verifier runs the server).',
  'BUILT AND AVAILABLE (read first; reuse): auth guards + rbac resource checks (src/server/auth/rbac.ts canManageClass / canViewStudent etc., guards requireRole/requirePermission, actor.schoolRoles), analytics read models (src/server/analytics/{parent,teacher,school}.ts + access.ts stand-ins — REPLACE the stand-ins by delegating to the auth rbac checks where equivalent, keeping behaviour + tests green), attempts engine (assignment mode), curriculum, content publish helper (school/tutor content follows the lighter owner workflow per the schema), billing checkout (startCheckout with beneficiaryUserId for parents paying for a child), notifications + announcements services (src/server/cms/announcements from the admin workflow — read it), messaging (SMS/email OTP + invites), uploads, jobs, audit, rate limits, UI primitives/shells (AppShell with role-specific nav; see src/components/student/nav.ts pattern), question renderers (src/components/questions) for previews and marking.',
  'PRIVACY RULES: parents see only ACTIVE linked children and only the sections their link permissions allow; AI conversations are NEVER shown to teachers or school admins, and to parents only if the platform switch privacy.parentAiAccess.enabled is ON AND the student granted explicit consent on that link (default OFF; RLS enforces the per-student consent via withAiScope("parent"); the SERVICE must also check getParentAiAccessEnabled() from src/server/cms/settings/catalogue.ts — the DB policy does not check the platform switch). Teachers see only students in classes they teach, scoped to the class subject(s) (for subject-less classes: subjects derived from the class\'s assignments — implement that rule). School admins see only their school (and only if the school is ACTIVE/PENDING_VERIFICATION). Minors: collect only what the schema allows; guardian consent states respected. Every privileged read of a student (teacher/school admin/parent view) writes an audit row where the ARCHITECTURE requires (STUDENT_VIEW).',
  'SHARED-FILE RULE: do NOT edit src/worker/handlers.ts, src/server/lib/{rate-limit,audit,env}.ts, prisma/**, src/app/layout.tsx, src/components/student/nav.ts (except where your task explicitly says) — another workflow runs concurrently. Report needed shared changes.',
  'Tests: integration tests for every service (app_rw test DB, tests/factories, unique fixtures, never truncate) INCLUDING negative authorization cases (other school, unlinked parent, revoked link, removed teacher, suspended school); component tests for complex client widgets. Before finishing: npx tsc --noEmit -p tsconfig.json (zero errors in your files), npx eslint <your paths>, npx vitest run <your tests>. Only touch YOUR AREA.',
].join('\n')

const RESULT = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    routes: { type: 'array', items: { type: 'string' } },
    exportedApis: { type: 'array', items: { type: 'string' } },
    jobHandlersToRegister: { type: 'array', items: { type: 'string' } },
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
    'Final output: files, routes, exported APIs, job handlers to register, test counts, remaining work, shared changes needed.',
  ].join('\n'), { label: 'build:' + s.key, phase: 'Build', schema: RESULT })
}

const FAMILY = spec('family-linking',
  'src/server/family/** (+tests), src/app/parent/**, src/components/parent/**, src/app/app/family/** (student side), src/components/family/**',
  [
    'Build parent accounts and parent-student linking with consent (§21, ARCHITECTURE §5.12).',
    '1. Linking flows (src/server/family/): (a) student generates a short-lived link code (hashed per schema) from /app/family, parent enters it at /parent/link -> PENDING -> student confirms (or auto-ACTIVE if the code was generated by the student, per the schema\'s initiatedBy semantics — follow the schema docs); (b) parent invites by student email/phone/username -> student accepts in /app/family; revoke by either side (audited); permission toggles set by the STUDENT (progress, study activity, test results default on; AI conversations default OFF and only offered when privacy.parentAiAccess.enabled is ON, with an explicit consent confirmation screen); guardian consent for minors where the schema models it. Rate-limit code attempts.',
    '2. /parent area (AppShell with parent nav): dashboard with each linked child (name, countdown, this week\'s study time, recent results, weak areas) via analytics/parent.ts getChildOverview honoring permissions; child detail page /parent/children/[studentId] (subjects, progress, test results, weak areas, activity calendar, exam countdown); "Subscribe for this child" using billing checkout with beneficiaryUserId (provider choice EcoCash/OneMoney via Paynow or card) — if the billing UI components do not exist yet, implement a minimal accessible checkout form calling startCheckout and handling { redirect | mobile instructions } (navigate via GET/location per CSP form-action note); weekly summary preference. Empty state when no children linked, with clear instructions.',
    '3. /app/family (student): pending invitations, active parents with their permissions (toggle), generate code, revoke.',
  ].join('\n'))

const TEACHER = spec('teacher',
  'src/server/teaching/** (+tests), src/app/teacher/**, src/components/teacher/**, src/app/app/classes/** (student side: join class, my assignments, class announcements)',
  [
    'Build the teacher experience (§22) and the student-side class features.',
    '1. Classes: /teacher (dashboard: classes with class average, active students, upcoming assignment due dates, items awaiting marking), create class (subject/qualification optional, academic year; independent tutors may create classes without a school; school teachers create within their school), class page with roster, join code (show/rotate), add students by email/phone/username (invitation) or approve join requests, remove students, co-teachers (ClassTeacher ASSISTANT).',
    '2. Assignments (§22 assign lessons/quizzes/tests): create assignment of type LESSON / ASSESSMENT (published platform tests or the teacher\'s own school-scoped tests) / PRACTICE (topic + count + difficulty), due date, instructions; students see them in /app/classes and /app/classes/[classId]; progress per student (AssignmentProgress via attempts in ASSIGNMENT mode / lesson completion hooks — wire completion through exported functions the attempts/lesson flows call; report the one-line hook insertions if those modules need them); late flags.',
    '3. Create tests (§22): a simple teacher test builder for SCHOOL-scoped questions/assessments (pick from the published bank + write own questions with the per-type forms — reuse src/components/admin/questions editors if they are generic enough, else a compact version), following the school/tutor content workflow allowed by the schema.',
    '4. Marking queue: answers in NEEDS_REVIEW / teacher-marked items for students in the teacher\'s classes: show question, mark scheme, student answer, AI suggestion if any; award marks + feedback -> QuestionAttemptMarking source TEACHER -> attempt score recomputed via the attempts module.',
    '5. Analytics drill-down (§22): class average -> subject performance -> topic performance -> individual student (analytics/teacher.ts), weak topics callout with "assign practice on this topic" one-click.',
    '6. Announcements to a class (reuse the announcements service; students get notifications).',
    '7. Student side /app/classes: join by code, list classes, assignments with due dates/status, announcements. Add a "Classes" nav item by editing src/components/student/nav.ts (allowed for this task: append one item).',
  ].join('\n'))

const SCHOOL = spec('school-admin',
  'src/server/schools/** (+tests), src/app/school/**, src/components/school/**',
  [
    'Build the school administration area (§23; B2B/B2B2C §53).',
    '1. /school dashboard (SCHOOL_ADMIN via SchoolMember): school analytics (analytics/school.ts: average score by subject, pass rate (estimate), topic performance, engagement, class outcomes per teacher (framed as outcomes), exam readiness), seat usage vs the school subscription (if any), quick actions.',
    '2. Teachers: invite (email/phone), list, deactivate (SchoolMember removal cascades per DB rules), assign to classes.',
    '3. Students: invite; ROSTER IMPORT from CSV/Excel (columns: first name, last name, form/year, class, optional email/phone, optional parent phone) creating school-provisioned USERNAME accounts (User.loginUsername + generated strong temporary passwords + provisionedBySchoolId; shared contact phone for siblings) — dry-run validation report first, then commit; one-time printable credential slips (shown once, never stored in plain text; force password change at first login if the auth module supports it — report otherwise); school admin password reset for provisioned accounts (audited). Bulk enrol imported students into classes and subjects.',
    '4. Classes + subjects offered (SchoolSubject): create classes, assign teachers, set subjects.',
    '5. Reports (§23 generate reports): SchoolReport rows (READY/EXPIRED) generated by a background job as CSV (per-class results, engagement, readiness) stored via the storage driver with PRIVATE visibility and served only to school admins; export registerSchoolJobs() and report it.',
    '5b. Invitation acceptance: build /invite/[token] (public route; look up Invitation by sha256 tokenHash, check expiry + revocation; signed-out users sign in or register first, then return; create/activate the SchoolMember (or ClassMember / parent link per invitation kind), set acceptedAt/acceptedByUserId, audit). The admin CMS already creates invitations (src/server/cms/schools) — read it and reuse its token helpers.',
    '6. School subscription: show plan/seats/status; if no subscription, a "Request a school plan" form that notifies platform admins (no self-serve B2B checkout yet — B2B invoicing TBC; state that clearly).',
  ].join('\n'))

phase('Build')
const pFamily = run(FAMILY, [])
const pTeacher = run(TEACHER, [])
const pSchool = pFamily.then(f => run(SCHOOL, [f].filter(Boolean)))
const built = await Promise.all([pFamily, pTeacher, pSchool])
const names = ['family', 'teacher', 'school']
built.forEach((b, i) => log(names[i] + ': ' + (b ? ('tc=' + b.typecheckClean + ' tests=' + (b.testsPassed || 0)) : 'FAILED')))

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER for role areas. Builder reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npx tsc --noEmit -p tsconfig.json ; npx eslint src tests ; npx vitest run . — fix failures in this workflow\'s areas (root causes). Another workflow may be running (engagement: tutor/solver/flashcards/leaderboards/notifications): do not edit its files; report.',
  '2. Authorization matrix integration test (tests/authz/roles.test.ts): for parent/teacher/school-admin services, assert allow/deny across: own vs other school, linked vs unlinked vs revoked parent, permission flags off, teacher of class vs removed teacher vs teacher of another class, suspended school, and that AI conversation data is never reachable from these areas.',
  '3. HTTP smoke with "NEXT_DIST_DIR=.next-verify-roles npx next dev -p 3103 (if another next dev server is running for a different distDir, leave it alone; never kill a server started by another agent)" (background, PID) using demo parent/teacher/schooladmin sessions (docs/DEV_SEED.md; create sessions via the auth service in a .scratch tsx script with --conditions=react-server): GET /parent, /parent/children/<demo student>, /teacher, a class page, /teacher/marking, /school, /school/students, /school/reports, and /app/classes, /app/family as the demo student -> 200, no error markers; a teacher requesting another school\'s class -> 404/403. Stop the server by PID; confirm the port is free.',
].join('\n'), {
  label: 'verify:roles', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, authzMatrix: { type: 'string' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'lintClean', 'testsPassed', 'testsFailed', 'authzMatrix', 'smoke', 'fixes', 'remainingIssues'] },
})

return { built, verify }
