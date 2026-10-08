export const meta = {
  name: 'student-experience',
  description: 'Phases 3-8 UI: student shell+dashboard, question renderers+practice, lessons, exam mode, onboarding+diagnostic, study plan; then verify',
  phases: [
    { title: 'Build', detail: 'dependency-ordered UI builders (2 concurrent)' },
    { title: 'Verify', detail: 'typecheck/lint/tests + HTTP journey smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior product engineer + UI designer building the STUDENT EXPERIENCE of a production ed-tech platform for ZIMSEC and Cambridge O/A-Level students in Zimbabwe (CLAUDE.md is in your context — follow it strictly). Spec: docs/PRODUCT_SPEC.md (cite §N). Architecture: docs/ARCHITECTURE.md (§3 route map/rendering, §4 data). Schema: prisma/schema.prisma (do not edit).',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-05. Dependencies installed (do not npm install).',
  'SERVICES ALREADY BUILT — read their code/exports before writing UI and use them instead of querying Prisma from routes: auth guards/actor (src/server/auth/*: requireUser, requireOnboardedStudent, getActor, ...), entitlements (src/server/billing/entitlements.ts, usage.ts), curriculum (src/server/curriculum/*), content rendering (src/server/content/service.ts getRenderedLesson, render.ts renderContent/renderInline, src/components/content/RichContent.tsx), question contracts (src/lib/questions/* incl. toStudentView and response schemas), marking (src/server/marking/*), attempts engine (src/server/attempts/*: startAttempt, getAttemptForStudent, saveResponse, answerAndMark, submitAttempt, ...), enrollment (src/server/enrollment/*), progress read-models (src/server/progress/service.ts), gamification service, pure algorithms (src/server/studyplan/generator.ts, src/server/adaptive/core.ts, src/server/exams/timer.ts + scoring.ts), dates (src/lib/dates.ts daysUntil), formatters (src/lib/format.ts), analytics/search/AI cores exist but are not your concern. If a service you need is missing or insufficient, add the smallest missing service function in the domain folder named in YOUR AREA (or report it) — never put business logic in components.',
  'UI RULES: use src/components/ui/* primitives and src/components/layout/* shells (see src/app/dev/ui and src/app/dev/shell for usage; tokens in src/app/globals.css). Mobile-first at 360px; touch targets >= 44px; no horizontal scroll; calm premium tone (no confetti/mascots/exclamation spam); honest empty states (never invent numbers, §50); dark mode via tokens only; prefers-reduced-motion respected. Server Components by default; "use client" only for interactive leaves (question inputs, timer, navigator); mutations via Server Actions (useActionState/useTransition) returning ActionResult; no client data-fetching libraries. Each route segment gets loading.tsx (Skeleton) and error.tsx where useful. Accessibility (§43): semantic landmarks, headings in order, fieldset/legend for choice questions, labelled inputs, aria-live="polite" for marking feedback and timer milestones (not every second), visible focus, keyboard operation. Math: stems/explanations/options arrive as sanitized HTML rendered SERVER-SIDE (renderInline/renderContent) and are passed to client components as html strings rendered via RichContent-style sanitized container — never render raw markdown on the client and never ship answer keys to the client before submission (use toStudentView).',
  'Copy: UI labels/buttons/instructions are fine in code; educational content, subjects, topics, prices, limits and exam dates come ONLY from the DB. APP_NAME from src/lib/config.ts for the brand.',
  'Tests: unit tests for pure helpers; component tests (*.test.tsx, first line /** @vitest-environment jsdom */, Testing Library installed) for interactive question inputs/timer/navigator; integration tests for any server action/service you add. Before finishing: npx tsc --noEmit -p tsconfig.json (zero errors in your files), npx eslint <your paths>, npx vitest run <your tests>. Do not run next dev/build (the verifier does), prisma migrate, or npm install. Only touch YOUR AREA; other agents work concurrently.',
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
    deps.length ? 'UPSTREAM UI AGENTS FINISHED BEFORE YOU — reuse their components/routes (read the code): ' + JSON.stringify(deps) : '',
    '', 'YOUR AREA (only touch these paths): ' + s.area, '', s.task, '',
    'Final output: files, routes, exported components/APIs, test counts, remaining work, shared changes needed.',
  ].join('\n'), { label: 'build:' + s.key, phase: 'Build', schema: RESULT })
}

const SHELL = spec('student-shell-dashboard',
  'src/app/app/layout.tsx, src/app/app/page.tsx, src/app/app/(loading|error|not-found).tsx, src/app/app/subjects/** (except topic/lesson pages owned by the lessons agent: src/app/app/subjects/[subjectId]/topics/**), src/app/app/settings/**, src/app/app/progress/**, src/components/student/** (incl. src/components/student/nav.ts), src/components/dashboard/**, src/components/subjects/**',
  [
    'Build the authenticated student area shell and dashboards (§6, §7, §17, §19 display, §20 privacy settings, §43 preferences).',
    '1. src/app/app/layout.tsx: requireOnboardedStudent() (non-onboarded -> /onboarding), AppShell with nav from src/components/student/nav.ts — a SINGLE exported array other agents will extend (Home /app, Subjects /app/subjects, Practice /app/practice, Exams /app/exams, Tutor /app/tutor, Flashcards /app/flashcards, Study plan /app/plan, Progress /app/progress, Settings /app/settings): include an `available` flag so nav only shows routes that exist; set Practice/Exams/Plan available=true (built in this workflow), Tutor/Flashcards available=false for now (later workflow flips them). Header right: streak flame + count, exam countdown pill (days from the target ExamSession, "provisional" marker when the date is provisional), avatar menu (Settings, Sign out).',
    '2. Dashboard /app (§6) via progress/service getStudentDashboard: time-of-day greeting in the student timezone with first name; exam countdown ("N days until your examination", §17); today\'s target minutes and today\'s plan items (if a StudyPlan exists; else a calm CTA to create one at /app/plan); recommended study session cards (subject, topic, activity, size e.g. "20 questions" or "Lesson 3") deep-linking to /app/practice?subjectId=&topicId=&count=&difficulty= or /app/lessons/[lessonId]; overall progress; per-subject progress bars; weak and strong topics with mastery badges; streak; questions attempted, accuracy, average score; recent mock scores. All honest empty states for new students (first visit after diagnostic should still look purposeful: show the diagnostic result summary if present).',
    '3. Subjects: /app/subjects (enrolled subjects with progress, link to manage enrolment = add/remove subjects via enrollment service, pinned syllabus version label), /app/subjects/[subjectId] subject dashboard (§7): syllabus progress, topic tree with per-topic mastery bars (bands shown as text too), average score, questions completed, weakest + strongest topics with the sentence "Your weakest area is X." only when evidence exists, recent tests, recommended topics; links to topic pages (/app/subjects/[subjectId]/topics/[topicId], built by the lessons agent) and to practice/exams for the subject.',
    '4. /app/progress: cross-subject progress overview (mastery distribution per subject, activity last 30 days from DailyActivity, XP + level, achievements earned) — read-models from progress/gamification services.',
    '5. /app/settings: profile (display name), preferences (theme, text size — reuse the PreferenceSwitchers/cookies from src/components/layout/preferences*), timezone, daily goal minutes, leaderboard visibility + display mode (REAL_NAME / FIRST_NAME / USERNAME / ANONYMOUS, opt-in default off, §20), subjects/targets link, sign out of other devices (auth service). Server actions with validation.',
    'Component tests for nav availability filtering and any client widgets; integration test for settings actions.',
  ].join('\n'))

const PRACTICE = spec('questions-practice',
  'src/components/questions/** (+tests), src/app/app/practice/**, src/app/app/daily/**, src/server/practice/** (thin orchestration only if attempts service lacks something)',
  [
    'Build the question renderers and the practice engine UI (§9 types, §10 practice, §11 adaptive, §46 daily question). These renderers are SHARED: the exam agent, lesson inline quizzes and the diagnostic reuse them, so design a clean API: <QuestionView question={studentView} mode="practice" | "exam" | "review" response={...} onChange={...} feedback={...} disabled />.',
    '1. src/components/questions/: one input component per QuestionType (MCQ single as radio group; multi-select checkboxes with "select all that apply"; true/false; short answer; numerical with unit hint and inputmode="decimal"; fill-in-the-blank inline inputs; matching (accessible select-based pairing on mobile, not drag-only); diagram labelling (image from MediaAsset with numbered hotspots + label selects/inputs — keyboard accessible); structured question with parts (a)(b)(c) each rendering its own input + marks; calculation (working textarea + final answer); essay / extended response (textarea with word count, autosave-friendly)). Values serialise exactly to the response schemas in src/lib/questions. Marks allocation shown ("[3 marks]"). FeedbackPanel: correct/incorrect/partial with marks, correct answer display, explanation (sanitized HTML), why it is correct, relevant concept/topic, "Study this topic" link (§10), aria-live polite, focus moved to the panel after marking. Pending AI/manual marking state for essays ("Marking in progress" / self-assessment fallback when AI is not configured — check what the attempts/marking services return).',
    '2. Practice flow (§10): /app/practice setup page (subject from enrolments, topic(s) from the pinned syllabus topic tree, number of questions 5/10/20/30, difficulty easy/medium/hard/adaptive — default adaptive) honouring query params from dashboard deep links; entitlement + daily-limit messaging from the service errors (friendly upgrade prompt for FREE limits, never a raw error); session page /app/practice/[attemptId]: one question at a time, progress "Question 3 of 20", answer -> answerAndMark server action -> FeedbackPanel -> Next; resume an in-progress session; summary page /app/practice/[attemptId]/summary: score, per-topic results, mastery band changes, recommended next actions (lesson links, retest), XP earned.',
    '3. Daily question (§46): /app/daily (DAILY_QUESTION mode for the student\'s qualification/subject; one question, instant feedback, streak-friendly). The PUBLIC daily-question page for signed-out visitors is built later with the marketing site — not yours.',
    'Component tests for every input type (serialisation, keyboard use, disabled/review modes) and the feedback panel; integration test for a practice session through the server actions (start -> answer -> summary) using tests/factories.',
  ].join('\n'))

const LESSONS = spec('lessons',
  'src/app/app/subjects/[subjectId]/topics/**, src/app/app/lessons/**, src/components/lessons/**, src/server/lessons/** (+tests)',
  [
    'Build the topic and lesson experience (§2 hierarchy, §8 lesson system, §31 free vs paid lessons, §47).',
    '1. Topic page /app/subjects/[subjectId]/topics/[topicId]: topic + subtopics (from the pinned syllabus version, §26), learning objectives, lessons list in order with completion state and lock icons for lessons the student\'s entitlements do not cover (lessonAccess FREE_ONLY -> only free-preview lessons open; locked ones show an upgrade prompt, never the content), topic mastery + band, actions: Practice this topic (/app/practice?topicId=), Topic test (/app/exams?topicId= — exam agent builds), Flashcards (later).',
    '2. Lesson reader /app/lessons/[lessonId]: server-rendered body via getRenderedLesson + RichContent (definitions, key facts, worked solutions, common mistakes, exam tips, formulas render as styled blocks; KaTeX math); sticky in-lesson table of contents from headings (collapsible on mobile); estimated minutes; licensing/attribution footer from the content source fields (§27); "Mark as complete" + automatic time tracking via a tiny client beacon/server action (LessonProgress + StudySession + DailyActivity via gamification recordActivity — create src/server/lessons/progress.ts if no service exists); inline practice questions attached to the lesson (LessonQuestion) using the shared QuestionView from src/components/questions (built by the practice agent) with instant feedback via attempts service (a short PRACTICE attempt scoped to these questions, or the most appropriate existing mode — read the attempts service); previous/next lesson within the topic; "Practice this topic" CTA at the end. Entitlement check server-side (never render locked content). Reading layout: comfortable measure (max-w-reading), large touch targets, dark-mode friendly, print-friendly CSS optional.',
    '3. src/server/lessons/: getLessonForStudent(actor, lessonId) (published + pinned syllabus + entitlement + next/prev), markLessonProgress(actor, lessonId, { secondsSpent, completed }) idempotent and rate-limited. Integration tests including entitlement lock and pinned-version access (§26).',
  ].join('\n'))

const EXAMS = spec('exam-mode',
  'src/app/app/exams/**, src/components/exam/** (+tests), src/server/exams/service.ts (+tests, only if attempts service lacks listing/results helpers)',
  [
    'Build the examination engine UI (§12 mock exams, §13 examination mode) on top of the attempts service and the shared question renderers (src/components/questions).',
    '1. /app/exams: available assessments for the student\'s enrolled subjects (topic tests, chapter tests, subject tests, timed exams, mock exams — PUBLISHED Assessments; entitlement-gated with friendly upgrade prompts; topic test deep-link via ?topicId=), plus history of past attempts with scores.',
    '2. Instructions page /app/exams/[assessmentId]: title, subject, paper/sections, total marks, time limit, number of questions, rules (timer runs on the server; answers autosave; you can flag and review; auto-submit at time-up), start button -> startAttempt.',
    '3. Exam room /app/exams/attempt/[attemptId]: FOCUSED layout (no bottom tab bar; minimal header with time remaining + question n/N + Review button); timer computed from the SERVER deadline (render remaining time server-side, client counts down and re-syncs on focus/visibility change; warnings at 10, 5 and 1 minutes in a polite live region; at zero -> auto-submit); question navigator grid (answered / unanswered / flagged states with text + icon, not colour only) as a bottom sheet on mobile and a side panel on desktop; flag question; previous/next; keyboard shortcuts (documented, e.g. N/P/F) without hijacking typing in inputs; autosave each response (debounced, saveResponse server action, saved indicator, offline-tolerant retry with a small queue in memory + localStorage fallback for the current attempt only); section support if the assessment has sections; review screen listing unanswered and flagged questions; submit with confirmation dialog; graceful handling of expiry (server rejects late saves).',
    '4. Results /app/exams/attempt/[attemptId]/results (§12): "You scored 68%." headline, marks, percentage, grade estimate clearly labelled as an estimate (not official ZIMSEC/Cambridge thresholds), pending marking notice for AI/manual items, strong areas and weak areas by topic, recommended study (e.g. "Probability -> Lesson 4", "Statistics -> Practice test") with working links, then a question-by-question review (student answer, correct answer, explanation) using QuestionView mode="review". A "Share result" button is added in a later phase — leave a clearly named slot, no fake button.',
    'Component tests: timer (deadline sync, warnings, auto-submit callback with fake timers), navigator states, autosave debounce + retry; integration test: start -> save -> flag -> submit -> results analysis, late save rejected.',
  ].join('\n'))

const ONBOARDING = spec('onboarding-diagnostic',
  'src/app/onboarding/**, src/components/onboarding/**, src/app/app/diagnostic/**, src/server/onboarding/** (+tests)',
  [
    'Build onboarding and the diagnostic journey (§5, §46 free diagnostic, §52 steps 2-7).',
    '1. /onboarding wizard (requireUser; students only; resumable via Student.onboardingStep): Country (Zimbabwe preselected; list from DB) -> Examination board (ZIMSEC / Cambridge — from DB for the country) -> Level (O-Level / A-Level groups, then the specific qualification e.g. Cambridge IGCSE vs AS & A Level) -> Year/form (labels from the qualification\'s YearGroups) -> Subjects (multi-select grouped by category, searchable, only catalogue-available subjects; show syllabus code when present) -> Target examination (ExamSessions for the qualification, provisional dates marked "provisional") -> Current ability (Beginner / Intermediate / Advanced) -> Optional target grade (grades from the qualification\'s GradeScheme) -> Daily study goal (minutes; default from Setting study.defaults). Each step is its own small screen with a progress indicator, back/next, large touch targets, works without JS for basic navigation where feasible (forms + server actions). Persist via src/server/onboarding/ (Student profile fields + enrollment service enrolInSubjects pinning syllabus versions). Finish -> offer the diagnostic (recommended) or skip to dashboard.',
    '2. Diagnostic (§52): /app/diagnostic (choose subject(s); explains it takes ~10 minutes per subject, no penalty) -> startAttempt mode DIAGNOSTIC (short, spread across topics, mixed difficulty) -> run it with the shared question renderers in a no-feedback mode (reuse the exam room components from src/components/exam if they fit, otherwise a lighter one-question-at-a-time flow) -> submit -> report /app/diagnostic/[attemptId]/report: performance by topic with mastery bands seeded, strengths, gaps, recommended starting topics, and a primary CTA "Create my study plan" (-> /app/plan create flow built by the study-plan agent; pass subject ids) plus "Go to dashboard".',
    'Integration tests for onboarding actions (validation, resumability, enrolment pinning, non-student redirect) and diagnostic start/submit/report data.',
  ].join('\n'))

const PLAN = spec('study-plan',
  'src/server/studyplan/service.ts (+tests), src/app/app/plan/**, src/components/plan/**',
  [
    'Build the personal study plan (§16, §52 step 7; dashboard "Today\'s target").',
    '1. src/server/studyplan/service.ts: createPlan(actor, { subjectIds?, availability (minutes per weekday), examDate? (default from target ExamSession) }) gathering generator inputs from DB (enrolments, pinned topic trees, TopicMastery, lessons remaining via LessonProgress, target grades, recent StudySessions) -> generatePlan (pure, src/server/studyplan/generator.ts) -> persist StudyPlan (single ACTIVE plan per user — partial unique index; supersede the previous one) + StudyPlanItems; adaptPlan(actor) regenerating future items while keeping completed ones (call it after diagnostic/practice/mock submissions — expose a function the attempts flow can call or a job handler studyplan.adapt to register later); getTodayPlan(actor), getWeekPlan(actor, weekStart); markItemDone / skipItem; automatic completion matching (a practice session or lesson completion on the same subject/topic marks the matching item done — implement as a function the lesson/practice flows can call).',
    '2. /app/plan: if no plan -> creation flow (exam date prefilled from target session, subjects from enrolments, availability editor per weekday with sensible defaults from Setting study.defaults); with a plan -> week view (Mon-Sun, today highlighted, items with subject/topic/activity/minutes, done/skip), "Today" section, "Why this plan" explanations from item reasons (e.g. "Weak topic: Calculus"), adapt/regenerate button, edit availability. Each item links to the right place (lesson, practice with params, exam). Mobile: today first, then a horizontally-scrollable day selector (no page-level horizontal scroll).',
    'Integration tests: create plan respects daily minutes, single active plan, adapt keeps completed items, completion matching.',
  ].join('\n'))

phase('Build')
const pShell = run(SHELL, [])
const pPractice = run(PRACTICE, [])
const pLessons = Promise.all([pShell, pPractice]).then(d => run(LESSONS, d.filter(Boolean)))
const pExams = Promise.all([pShell, pPractice]).then(d => run(EXAMS, d.filter(Boolean)))
const pOnb = Promise.all([pShell, pPractice, pExams]).then(d => run(ONBOARDING, d.filter(Boolean)))
const pPlan = Promise.all([pShell]).then(d => run(PLAN, d.filter(Boolean)))
const built = await Promise.all([pShell, pPractice, pLessons, pExams, pOnb, pPlan])
const names = ['shell', 'practice', 'lessons', 'exams', 'onboarding', 'plan']
built.forEach((b, i) => log(names[i] + ': ' + (b ? ('tc=' + b.typecheckClean + ' tests=' + (b.testsPassed || 0)) : 'FAILED')))

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE INTEGRATION VERIFIER for the student experience. Builder reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npx tsc --noEmit -p tsconfig.json ; npx eslint src tests ; npx vitest run . — fix every failure (root causes; do not weaken tests).',
  '2. Make sure the dev DB is seeded with demo content: npx tsx --conditions=react-server prisma/seed.ts --demo (idempotent). Read docs/DEV_SEED.md for demo accounts.',
  '3. Journey smoke over HTTP against a dev server you start in the background ("npx next dev -p 3100", record the PID): write a .scratch/journey-smoke.ts (tsx --conditions=react-server) that creates a FRESH student through the real auth service functions (register + verify + session token), then performs the §52 journey by calling the same server-side service functions the pages use (onboarding steps -> enrol ZIMSEC O-Level Mathematics demo -> diagnostic start/answer/submit -> report data -> create plan -> start practice, answer 5, summary -> start the demo mock exam, save, submit -> results) and asserts sensible results; then, with that session cookie, GET every student route (/app, /app/subjects, /app/subjects/<id>, topic page, a lesson, /app/practice, /app/exams, /app/plan, /app/progress, /app/settings, /app/diagnostic, /onboarding) and assert 200 (or the expected redirect) and no error markers in the HTML; check the dev server output for runtime errors. Fix what breaks. Stop the dev server by PID (taskkill /PID <pid> /T /F) and confirm port 3100 is free.',
  '4. Review answer-key safety: grep the HTML of an in-progress practice question and exam room for answerSpec/correct flags/explanations — must be absent before marking/submission.',
  'Return precise status.',
].join('\n'), {
  label: 'verify:student-experience', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, journey: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'lintClean', 'testsPassed', 'testsFailed', 'journey', 'fixes', 'remainingIssues'] },
})

return { built, verify }
