export const meta = {
  name: 'engagement',
  description: 'Phases 9-11: AI tutor (streaming), AI solver + ai.mark wiring, flashcards SRS, gamification/leaderboards/sharing/referrals, notifications UI; then verify',
  phases: [
    { title: 'Build', detail: 'engagement builders (2 concurrent)' },
    { title: 'Verify', detail: 'typecheck/lint/tests + privacy/cost review + HTTP smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior product engineer building ENGAGEMENT features of a production ed-tech platform for ZIMSEC and Cambridge O/A-Level students in Zimbabwe (CLAUDE.md is in your context — follow it strictly, incl. Database rules, Background jobs/rate limits, UI rules). Spec: docs/PRODUCT_SPEC.md (cite §N). Architecture: docs/ARCHITECTURE.md (§6 AI, §3 routes, §4.9 AI data/privacy). Schema: prisma/schema.prisma (do not edit).',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-05. Do not npm install / prisma migrate / next dev|build (the verifier runs the server).',
  'BUILT AND AVAILABLE (read before writing; reuse, do not duplicate): student area shell + nav (src/app/app/layout.tsx, src/components/student/nav.ts — flip `available` for routes you build), dashboards, question renderers (src/components/questions/*), practice/exams/lessons/plan pages, attempts engine (src/server/attempts/*), progress + gamification services (src/server/progress/service.ts, src/server/gamification/service.ts + pure streaks/xp), flashcards SRS (src/server/flashcards/srs.ts), AI gateway (src/server/ai/index.ts: createAiGateway/getAiGateway, policy.ts decideTurnPolicy/buildTutorSystemPrompt, context.ts buildStudentContext, intent.ts classifyIntent, marking.ts aiMarkResponse + createMarkPendingAiResponsesHandler, conversations.ts) — ALL model calls through the gateway (lint enforces), entitlements (src/server/billing/entitlements.ts: assertEntitlement, checkLimit; aiTutor, aiMessagesPerDay, aiSolverPerDay, aiImageUploads, aiMaxModelTier, flashcards, leaderboards), rate limits (rateLimits.aiMessage, uploads, ...), uploads (src/server/lib/uploads.ts createMediaAsset; OWNER_ONLY visibility for solver photos), RLS helpers (src/server/lib/db-context.ts withUserContext for EVERY AiConversation/AiMessage query), notifications service (src/server/notifications/*), content renderer (renderContent server-side for AI output and card faces), search (src/server/search/*), admin content flags service createContentFlag (src/server/cms/flags — read it), analytics, billing checkout.',
  'AI RULES: no API key in dev -> every AI surface shows a calm "AI tutor is not configured yet" state (isAiNotConfigured / AI_UNAVAILABLE), never fabricated output. Never send names/emails/phones/school names to the model (buildStudentContext minimises). Respect the activeExam integrity rule (no solving questions from an IN_PROGRESS timed/mock attempt). Default pedagogy = teach (§14), explicit "Give me the answer" mode (§15) still explains. Quotas: pass entitlements (maxTier, daily limits) into every gateway call; per-minute rateLimits.aiMessage. AI conversations are PRIVATE to the student (RLS) — parents/teachers never see them.',
  'SHARED-FILE RULE: do NOT edit src/worker/handlers.ts, src/server/lib/{rate-limit,audit,env}.ts, prisma/**, src/app/layout.tsx — another workflow runs concurrently. Export register<Domain>Jobs() and REPORT it; report needed presets/audit actions/env keys.',
  'Tests: unit + integration (app_rw test DB, tests/factories, unique fixtures, never truncate) + component tests (*.test.tsx with /** @vitest-environment jsdom */) for interactive UI. AI tests use a FAKE gateway transport (no network). Before finishing: npx tsc --noEmit -p tsconfig.json (zero errors in your files), npx eslint <your paths>, npx vitest run <your tests>. Only touch YOUR AREA.',
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

const TUTOR = spec('ai-tutor',
  'src/server/tutor/** (+tests), src/app/app/tutor/**, src/app/api/v1/tutor/** (streaming route), src/components/tutor/** (+tests)',
  [
    'Build the AI tutor (§14; §40 cost control; ARCHITECTURE §6).',
    '1. src/server/tutor/service.ts: listConversations(actor, cursor), createConversation(actor, { subjectId?, topicId?, questionId? }) (validates the subject is one of the student\'s enrolments; topic within the pinned syllabus), archiveConversation, getConversation (messages, RLS), sendTutorMessage(actor, conversationId, { text, mode: "TEACH" | "ANSWER" | "HINT" | "CHECK_WORK" }) -> async generator of stream events: entitlement aiTutor + daily quota (aiMessagesPerDay) + aiMaxModelTier; rateLimits.aiMessage; conversation turn limit (ai.limits.maxTurnsPerConversation) and input length cap; intent classification (cheap heuristics first, FAST tier only when ambiguous); activeExam lookup; policy (decideTurnPolicy + buildTutorSystemPrompt stable block + buildStudentContext from enrolment, mastery band, last 3 mistakes on the topic); history window (last N turns within a token budget — do not resend the whole history); gateway.stream on the routed tier; persist USER + ASSISTANT AiMessage rows with metering fields, hintLevel, intent; update conversation counters/title (first-turn title from the topic, not an extra model call). Refusal / AI_UNAVAILABLE / quota exhausted map to friendly typed events.',
    '2. Streaming transport: POST /api/v1/tutor/conversations/[conversationId]/messages (route handler using apiRoute from src/server/lib/api.ts: session or bearer auth, same-origin check for cookies, zod body) returning a text/event-stream (or chunked NDJSON) of { type: "delta", text } ... then { type: "done", messageId, html } where html is the FINAL assistant message rendered server-side with renderContent (KaTeX math, sanitized) so the client swaps plain streamed text for rendered HTML; errors as { type: "error", code, message }. Abort handling (client disconnect stops the upstream stream; partial message saved with a flag).',
    '3. UI: /app/tutor — conversation list + "New conversation" with subject/topic pickers (from enrolments/pinned topics) and suggested starters per topic (generic prompts like "Explain this topic from the beginning" — no hard-coded educational content); /app/tutor/[conversationId] — chat (mobile-first: sticky composer above the safe area, autosizing textarea, Enter to send / Shift+Enter newline on desktop only), mode chips Teach me / Hint / Check my working / Give me the answer (§15; the answer mode shows a short note that understanding the steps matters), streaming render (aria-live polite, announces when complete, not every token), rendered math after completion, copy button, "Was this helpful?" rating (AiMessage.userRating), quota remaining indicator ("3 of 30 messages left today"), upgrade prompt when exhausted, not-configured state. Entry points: add "Ask the tutor about this" links on lesson pages, practice feedback and exam review (create a conversation with topic/question context) — ONLY if you can do it by adding a link component that those pages import (report the one-line insertion points instead of editing their files).',
    'Tests: service with a fake gateway (quota, rate limit, turn limit, activeExam refusal, RLS: another user cannot read/send), stream route (auth, CSRF, event shape), component tests for the chat (streaming append, done swap, error states).',
  ].join('\n'))

const SOLVER = spec('ai-solver-and-marking',
  'src/server/solver/** (+tests), src/app/app/solver/**, src/components/solver/** (+tests), src/server/attempts/ai-marking.ts (+test; NEW file only — wire into attempts via exported functions, do not rewrite existing attempts files except a minimal export addition if unavoidable, and report it)',
  [
    'Build the AI question solver (§15) and wire AI-assisted marking (§9 manual/AI-assisted marking; §40).',
    '1. Solver service: solveQuestion(actor, { text?, imageAssetId?, mode: "TEACH" | "ANSWER", subjectId? }) — entitlement aiSolverPerDay / aiImageUploads / aiMaxModelTier, rateLimits; image upload via createMediaAsset (OWNER_ONLY, purpose SOLVER_UPLOAD, size/type limits from ai.limits.maxImageBytes; camera capture on mobile with <input accept="image/*" capture="environment">); structured output (zod) { topicGuess (match to the student\'s pinned topic tree when possible — return topicId), concept explanation, steps [{ title, explanation, formula? (LaTeX) }], finalAnswer (only in ANSWER mode or after TEACH steps), commonMistakes, similarQuestions: up to 3 from the PUBLISHED bank (candidatePool by topic, student view only) + up to 2 freshly generated practice prompts (clearly labelled "AI-generated practice, not from the official bank") }. Route hard maths/science to DEEP tier only when entitlements allow (solverHard route), else STANDARD. activeExam integrity rule. Persist as AiConversation mode SOLVER + messages (RLS). Render steps/formulas server-side with renderContent.',
    '2. UI /app/solver: input (textarea + photo upload/camera + subject select), mode toggle "Teach me" (default) vs "Give me the answer", result view with steps revealed progressively in TEACH mode ("Show next step"), formulas rendered, similar questions linking into practice (/app/practice?questionId=… or a mini practice for those ids), history list of past solves. Not-configured state.',
    '3. AI marking wiring (ai.mark): src/server/attempts/ai-marking.ts implementing the deps for createMarkPendingAiResponsesHandler (src/server/ai/marking.ts): loadItems (question revision stem + mark-scheme points from the revision snapshot/answerSpec, the student response as text, subject/level), saveOutcome (update QuestionAttempt PENDING -> AI_MARKED or NEEDS_REVIEW + insert QuestionAttemptMarking source AI with model/promptVersion/confidence in ONE transaction, then recompute the attempt score/analysis via the attempts module\'s existing recompute/finalise function — find it), requireSelfAssessment (when AI is not configured: mark items SELF_ASSESSED-pending so the student sees a self-assessment prompt with the mark scheme after submission — check what the attempts/exam UI supports; if missing, report). Export registerAiMarkingJobs() (queue "ai", handler "ai.mark") and REPORT it for src/worker/handlers.ts. Integration test with a fake gateway: essay attempt -> enqueue -> handler -> marks saved -> attempt score updated; low confidence -> NEEDS_REVIEW (teacher queue later).',
  ].join('\n'))

const FLASHCARDS = spec('flashcards',
  'src/server/flashcards/{service,decks}.ts (+tests), src/app/app/flashcards/**, src/components/flashcards/** (+tests)',
  [
    'Build flashcards with spaced repetition (§18; entitlement flashcards).',
    '1. Service: decks derived from PUBLISHED flashcards tagged to the student\'s pinned topics (per subject and per topic) + the student\'s personal cards (ownerUserId; private); getDueQueue(actor, { subjectId?, topicId?, limit }) (due first, then a capped number of NEW cards per day — configurable default 20), reviewCard(actor, flashcardId, rating AGAIN|HARD|GOOD|EASY, durationMs) using srs.ts schedule (FlashcardState upsert + FlashcardReview append + DailyActivity + XP via gamification service, idempotent per review id), deck stats (due today, new, learning, mature), personal card CRUD (markdown front/back, card type, topic), suspend/unsuspend a card.',
    '2. UI: /app/flashcards (decks by subject/topic with due counts, "Review all due"), /app/flashcards/review?subjectId=&topicId= (card front -> reveal back (space/enter), rating buttons Again / Hard / Good / Easy showing next intervals from previewIntervals, keyboard 1-4, swipe-friendly large buttons on mobile, progress "12 left", session summary), /app/flashcards/new (personal card). Card faces rendered server-side (math). Offline-tolerant: if a review POST fails, queue in memory and retry; never lose the student\'s place.',
    '3. Nav: set Flashcards available in src/components/student/nav.ts (that edit is allowed). Add a "Flashcards" action on the topic page ONLY by reporting the insertion point.',
    'Tests: due-queue ordering, new-card cap, review transitions persisted, personal cards private to owner, component tests for the review UI (reveal, keyboard ratings).',
  ].join('\n'))

const GAMES = spec('gamification-social',
  'src/server/leaderboards/** (+tests), src/server/sharing/** (+tests), src/server/referrals/** (+tests), src/app/app/{leaderboard,achievements,invite}/**, src/app/s/[token]/** (public share page + opengraph image), src/app/r/[code]/** (referral landing -> register), src/components/{gamification,leaderboard,share}/** (+tests)',
  [
    'Build gamification surfaces, leaderboards, shareable results and referrals (§19, §20, §46). Tone: motivating but adult — no childish visuals.',
    '1. Achievements/XP/streak UI: /app/achievements (earned + locked with criteria text from Achievement rows, earned dates), weekly goal card (minutes/XP target from LearnerStats; editable), level progress (levelForXp). Reuse gamification service; add read functions in src/server/gamification only via new files you own (e.g. src/server/leaderboards/*) if needed — do not rewrite gamification/service.ts (report needed changes).',
    '2. Leaderboards (§20): snapshot job computeLeaderboards(periodKey) writing LeaderboardEntry for metrics WEEKLY_XP, WEEKLY_QUESTIONS, STREAK, MOCK_AVERAGE (minimum 2 mocks in the period), SUBJECT_MASTERY, scopes GLOBAL / COUNTRY / SCHOOL / CLASS / SUBJECT, ONLY for students who opted in (Profile.leaderboardOptIn) — export registerLeaderboardJobs() (hourly for the current week; final run after week end) and report it. Display name resolved at read time from Profile.leaderboardDisplay (REAL_NAME / FIRST_NAME / USERNAME / ANONYMOUS -> e.g. "Student #4821" stable pseudonym), never emails/phones/school names for global boards. UI /app/leaderboard: metric + scope tabs, the student\'s own rank highlighted even if outside top N, opt-in call-to-action with a clear privacy explanation when not opted in.',
    '3. Shareable results (§46): createShareableResult(actor, { kind: MOCK_SCORE | TEST_SCORE | STREAK | MASTERY, attemptId? }) storing ONLY public-safe facts (e.g. "82% in O-Level Mathematics", chosen display name or none) + random token (store hash per schema), revoke; Share button on exam results (report the insertion point: the exam results page has a slot for it) and on achievements/streak; public page /s/[token] (noindex, no PII, CTA to sign up) with an OpenGraph image via next/og ImageResponse (brand colours, the fact, APP_NAME); WhatsApp share link (wa.me/?text=) since that is how Zimbabwean students share.',
    '4. Referrals (§46): getOrCreateReferralCode(actor) (ReferralCode), /app/invite page (code, share link /r/[code], WhatsApp share, referral count + status list without referred users\' private data), /r/[code] sets a short-lived httpOnly referral cookie and redirects to /register (the auth register flow must read it — report the one-line hook if the auth module needs a change), qualifyReferral(referredUserId) when the referred user completes onboarding + 3 active days OR makes a first successful payment (configurable via Setting referrals.rules with defaults), reward = EntitlementGrant (configurable, e.g. 7 days STUDENT features) idempotent; anti-abuse: no self-referral, one reward per referred user, rate limits. Export job/hook functions and report wiring.',
  ].join('\n'))

const NOTIFY = spec('notifications-ui',
  'src/app/app/notifications/**, src/components/notifications/** (+tests), src/server/notifications/{preferences,digest}.ts (+tests)',
  [
    'Build the in-app notification centre and preferences (§19 reminders, §21/§22 announcements reach students; §6 study reminders).',
    '1. Bell in the student header with unread count (server-rendered count; lightweight client polling every few minutes ONLY when the tab is visible, or refresh on navigation — no websockets) + dropdown/sheet with recent notifications; /app/notifications full list (cursor pagination, mark read / all read), announcement rendering (title/body), deep links from notification data.',
    '2. Preferences (Profile.notification preferences JSON per schema): study reminder time, streak-at-risk reminder, weekly summary, announcement emails/SMS opt-in (marketing consent separate); src/server/notifications/digest.ts: daily study reminder + streak-at-risk evaluation job (students who have not met today\'s goal by their chosen local time) creating in-app notifications (and optional SMS/email via messaging adapters respecting opt-in), weekly summary job — export registerNotificationJobs() and report it. Respect quiet hours (no messages 21:00-06:00 local).',
    '3. Multi-channel delivery: a notifications.send job delivering a Notification/Announcement beyond IN_APP (email / SMS / WhatsApp via src/server/messaging adapters) per the user preferences, consent and quiet hours; announcements with notify flags enqueue it (read src/server/cms/announcements/fanout.ts). Include it in registerNotificationJobs().',
    'The bell must be added to the student header: report the exact insertion in src/components/student/* if you cannot add it via an exported slot (prefer adding your component file and a one-line import in the header component, which you may edit if it is the minimal change).',
  ].join('\n'))

phase('Build')
const pTutor = run(TUTOR, [])
const pFlash = run(FLASHCARDS, [])
const pSolver = pTutor.then(t => run(SOLVER, [t].filter(Boolean)))
const pGames = run(GAMES, [])
const pNotify = run(NOTIFY, [])
const built = await Promise.all([pTutor, pFlash, pSolver, pGames, pNotify])
const names = ['tutor', 'flashcards', 'solver+marking', 'gamification-social', 'notifications']
built.forEach((b, i) => log(names[i] + ': ' + (b ? ('tc=' + b.typecheckClean + ' tests=' + (b.testsPassed || 0)) : 'FAILED')))

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER for engagement features. Builder reports: ' + JSON.stringify(built.filter(Boolean)),
  '1. npx tsc --noEmit -p tsconfig.json ; npx eslint src tests ; npx vitest run . — fix failures in this workflow\'s areas (root causes). Another workflow may be running (parent/teacher/school areas): do not edit its files; report.',
  '2. Privacy/cost review: every AiConversation/AiMessage access uses withUserContext; no PII in prompts or logs; every gateway call passes quota + maxTier; leaderboards only include opted-in students and never leak contact data; share pages contain no PII; referral rewards idempotent and abuse-resistant.',
  '3. HTTP smoke with "NEXT_DIST_DIR=.next-verify-engagement npx next dev -p 3102 (if another next dev server is running for a different distDir, leave it alone; never kill a server started by another agent)" (background, record PID) and a demo student session (create via auth service in a .scratch tsx script with --conditions=react-server): GET /app/tutor, a tutor conversation page, /app/solver, /app/flashcards, /app/flashcards/review, /app/leaderboard, /app/achievements, /app/invite, /app/notifications -> 200 and no error markers; POST to the tutor stream route without ANTHROPIC_API_KEY returns the not-configured event (no fabricated text); a share page /s/<token> renders without PII. Stop the server by PID; confirm the port is free.',
].join('\n'), {
  label: 'verify:engagement', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'lintClean', 'testsPassed', 'testsFailed', 'smoke', 'fixes', 'remainingIssues'] },
})

return { built, verify }
