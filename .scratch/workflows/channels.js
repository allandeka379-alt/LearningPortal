export const meta = {
  name: 'channels',
  description: 'Phase 16 / §30: versioned REST API v1 (token auth, OpenAPI) and WhatsApp Cloud API channel (webhook, identity linking, command router, outbound queue); then verify',
  phases: [
    { title: 'Build', detail: 'REST API + WhatsApp channel' },
    { title: 'Verify', detail: 'tests + security review + smoke' },
  ],
}

const ROOT = 'C:/Users/Lenovo/Downloads/Learning Platform'
const COMMON = [
  'You are a senior backend engineer building external CHANNELS for a production ed-tech platform (CLAUDE.md is in your context — follow it strictly). Spec §30 (WhatsApp: "Give me today\'s study question" -> question -> answer -> marked; "Explain photosynthesis" -> concise AI explanation; backend APIs reusable so WhatsApp needs no rebuild). Architecture: docs/ARCHITECTURE.md §3.5, §3.6, §8 (WhatsApp), §5 (security). Schema: ChannelIdentity, ChannelMessage, ChannelConversationState, Session (kind API/WHATSAPP), VerificationCode (purpose CHANNEL_LINK).',
  'Repo root: ' + ROOT + ' (Windows). Today 2026-10-06. Do not npm install / prisma migrate.',
  'REUSE (read first): src/server/lib/api.ts apiRoute (session or bearer auth, CSRF same-origin for cookies, zod input, pagination), auth (sessions incl. API kind, flows for login, OTP), rate limits (rateLimits.publicApi, whatsappInbound, otp*), attempts engine (DAILY_QUESTION / PRACTICE start + answerAndMark), curriculum, progress read models, flashcards service, tutor service + AI gateway (whatsapp route: FAST tier, response cache for generic "explain X" at a level, quota from entitlements), messaging adapters (src/server/messaging: add a WhatsApp Cloud API driver here if not present), jobs (enqueue outbound sends), audit, crypto (hmac, timingSafeEqual).',
  'SHARED-FILE RULE: do NOT edit src/worker/handlers.ts, src/server/lib/{rate-limit,audit,env,settings}.ts, prisma/** — report needed changes (env keys: WHATSAPP_VERIFY_TOKEN, WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_APP_SECRET already exist in .env.example; add WHATSAPP_GRAPH_VERSION as a report).',
  'Tests: unit + integration (app_rw test DB, tests/factories); mock fetch for Graph API (no network). Before finishing: npm run typecheck, npx eslint <your paths>, npx vitest run <your tests>. Only touch YOUR AREA.',
].join('\n')

const RESULT = {
  type: 'object',
  properties: {
    files: { type: 'array', items: { type: 'string' } },
    routes: { type: 'array', items: { type: 'string' } },
    jobHandlersToRegister: { type: 'array', items: { type: 'string' } },
    testsPassed: { type: 'number' },
    testsFailed: { type: 'number' },
    typecheckClean: { type: 'boolean' },
    remaining: { type: 'array', items: { type: 'string' } },
    sharedChangesNeeded: { type: 'array', items: { type: 'string' } },
  },
  required: ['files', 'routes', 'typecheckClean', 'remaining'],
}

const API = [
  'YOUR AREA: src/app/api/v1/** (except existing tutor/search/uploads routes — reuse, do not rewrite), src/server/api/** (+tests), docs/API.md.',
  'Build the versioned REST API v1 for mobile apps and integrations (§30, §38 pagination):',
  '1. Auth: POST /api/v1/auth/token (identifier + password, or OTP code flow: /api/v1/auth/otp/request + /verify) -> bearer token (Session kind API; 90-day sliding; returns token once), DELETE /api/v1/auth/token (revoke current), GET /api/v1/me. Rate limits on every auth route; generic errors.',
  '2. Resources (all via apiRoute with bearer auth, zod-validated, cursor pagination { data, nextCursor }, consistent error shape from toHttpResponse): GET /catalogue/boards, /catalogue/qualifications?boardId, /catalogue/subjects?qualificationId; GET/POST /enrollments; GET /dashboard (student dashboard read model, JSON-safe); GET /subjects/{id}/topics (pinned tree + mastery); GET /lessons/{id} (entitlement-checked, rendered HTML + plain text); POST /practice/sessions (start), GET /practice/sessions/{id}, POST /practice/sessions/{id}/answers (answerAndMark; student-safe views only — never answer keys before marking), GET /practice/sessions/{id}/summary; GET /daily-question, POST /daily-question/answer; GET /flashcards/due, POST /flashcards/{id}/review; GET /notifications, POST /notifications/read. Reuse the tutor streaming route as-is (document it).',
  '3. OpenAPI 3.1 document at GET /api/v1/openapi.json generated from the same zod schemas (zod 4 z.toJSONSchema) + docs/API.md (auth, pagination, errors, rate limits, versioning policy: additive changes only within v1).',
  '4. Tests: auth token lifecycle, every route\'s auth requirement (401 without token, 403 cross-user access), pagination stability, OpenAPI document validity (parse + required paths present), no answer keys in practice responses.',
].join('\n')

const WA = [
  'YOUR AREA: src/server/whatsapp/** (+tests), src/app/api/webhooks/whatsapp/route.ts, src/server/messaging/whatsapp-driver.ts (+test), src/app/app/settings/whatsapp/** (student linking UI), docs/WHATSAPP.md.',
  'Build the WhatsApp channel (§30, ARCHITECTURE §8) on the WhatsApp Cloud API — implement from these facts and mark "verify against current Meta docs before go-live": webhook verification = GET with hub.mode=subscribe, hub.verify_token (compare to WHATSAPP_VERIFY_TOKEN, constant time), echo hub.challenge; inbound = POST JSON (entry[].changes[].value.messages[] with from (phone), id (wamid), timestamp, type text|interactive (button_reply/list_reply), plus statuses[] for delivery receipts); signature header X-Hub-Signature-256: "sha256=" + hex HMAC-SHA256(raw body, WHATSAPP_APP_SECRET) — verify on the RAW body, constant-time, reject on mismatch; always 200 quickly for valid payloads (process via jobs). Outbound = POST https://graph.facebook.com/{version}/{WHATSAPP_PHONE_NUMBER_ID}/messages with Authorization: Bearer WHATSAPP_ACCESS_TOKEN, JSON { messaging_product: "whatsapp", to, type: "text", text: { body } } or interactive reply buttons (max 3) / lists; free-form messages only inside the 24-hour customer-service window after the user\'s last message — outside it only approved TEMPLATE messages (model a template send + document that templates must be registered in Meta Business Manager).',
  '1. Inbound pipeline: verify signature -> parse -> dedupe by ChannelMessage externalMessageId (unique per channel) -> store INBOUND message (content class per schema CHECKs: do not store more personal text than needed) -> enqueue whatsapp.process job -> 200. Status receipts update outbound ChannelMessage status.',
  '2. Identity linking: unknown numbers get a short reply explaining how to link (sign in on the web/app, open Settings -> WhatsApp, enter the phone, receive a 6-digit code via WhatsApp (VerificationCode purpose CHANNEL_LINK), confirm) -> ChannelIdentity verified + opted in; STOP/START opt-out/in per WhatsApp policy; unlink from settings. Minors: respect guardian consent rules from the schema.',
  '3. Command router (whatsapp.process job, idempotent): intents via cheap keyword/regex first (daily question / "question" / "quiz", answer letters A-D or numbers or free text when a question is pending, "explain <topic>", "help", "streak", "stop"/"start"), falling back to the AI gateway FAST tier intent classifier only when ambiguous. "Give me today\'s study question" -> DAILY_QUESTION attempt via the attempts engine for the student\'s qualification/subject, rendered as plain text (math as readable text: convert LaTeX to Unicode where simple, else a link to view it in the app), MCQs as interactive buttons/list; pending state in ChannelConversationState with expiry; the answer -> answerAndMark -> concise feedback + explanation excerpt + link; "Explain photosynthesis" -> tutor-style concise explanation via the gateway (whatsapp route, response cache by topic+level, entitlement + quota (aiMessagesPerDay), activeExam integrity), max ~1,000 characters, ends with a follow-up question; "streak" -> streak + today\'s target. All via existing services (no duplicated business logic).',
  '4. Outbound: src/server/messaging/whatsapp-driver.ts implementing the messaging channel interface + a whatsapp.send job with retries (respect 24h window: if outside, use a template or skip with a logged reason), rate limits, ChannelMessage OUTBOUND rows with status. Export registerWhatsAppJobs() (whatsapp.process, whatsapp.send) and report it.',
  '5. docs/WHATSAPP.md: setup (Meta app, phone number, webhook URL, verify token, app secret, templates), commands, privacy, limits. Tests with mocked fetch: signature valid/invalid/missing, verification GET, dedupe, linking flow, daily question round trip (question -> button answer -> marked), explain via fake gateway, 24h window behaviour, opt-out.',
].join('\n')

phase('Build')
const built = await parallel([
  () => agent([COMMON, '', API, '', 'Final output: files, routes, job handlers, test counts, remaining, shared changes needed.'].join('\n'), { label: 'build:rest-api', phase: 'Build', schema: RESULT }),
  () => agent([COMMON, '', WA, '', 'Final output: files, routes, job handlers, test counts, remaining, shared changes needed.'].join('\n'), { label: 'build:whatsapp', phase: 'Build', schema: RESULT }),
])
const ok = built.filter(Boolean)

phase('Verify')
const verify = await agent([
  COMMON, '',
  'YOU ARE THE VERIFIER for channels. Builder reports: ' + JSON.stringify(ok),
  '1. npm run typecheck ; npx eslint src tests ; npx vitest run src/server/api src/server/whatsapp src/server/messaging src/app/api — fix failures in these areas.',
  '2. Security review: bearer tokens hashed at rest, constant-time comparisons, webhook signature over raw body, replay/dedupe, no answer keys leaked through the API or WhatsApp before marking, rate limits on every public entry point, no PII in logs, cross-user access denied on every resource route.',
  '3. Smoke with NEXT_DIST_DIR=.next-verify-channels npx next dev -p 3106 (background; stop by PID; never kill a server started by another agent; after stopping it, delete your own .next-verify-* directory to free disk space): obtain a token for the demo student via POST /api/v1/auth/token, call GET /api/v1/me, /dashboard, start a practice session and answer one question, GET /api/v1/openapi.json; POST a correctly signed fake WhatsApp inbound text "question" from a linked test identity (create the link via services in a .scratch script) and run the whatsapp.process job handler directly -> an outbound ChannelMessage with the daily question is queued (Graph API call mocked or the send job not executed).',
].join('\n'), {
  label: 'verify:channels', phase: 'Verify',
  schema: { type: 'object', properties: { typecheckClean: { type: 'boolean' }, lintClean: { type: 'boolean' }, testsPassed: { type: 'number' }, testsFailed: { type: 'number' }, smoke: { type: 'string' }, fixes: { type: 'array', items: { type: 'string' } }, remainingIssues: { type: 'array', items: { type: 'string' } } }, required: ['typecheckClean', 'testsPassed', 'testsFailed', 'smoke', 'fixes', 'remainingIssues'] },
})

return { built: ok, verify }
