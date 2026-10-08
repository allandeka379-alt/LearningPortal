# WhatsApp channel

Students use the platform from WhatsApp (PRODUCT_SPEC §30): "Give me today's study question" → question → answer →
marked; "Explain photosynthesis" → a short AI explanation; "STREAK" → streak and today's target. The channel calls the
same services as the web app (ARCHITECTURE §8), so WhatsApp answers count for streaks, mastery and XP exactly like the
app, and nothing about learning is re-implemented for WhatsApp.

> **Verify against current Meta docs before go-live.** Payload shapes, limits, error codes, the signature scheme and
> the Graph API version below follow Meta's WhatsApp Cloud API documentation as of 2026 and change over time.

## How it works

```
Meta ─ GET  /api/webhooks/whatsapp   hub.mode=subscribe, hub.verify_token (constant-time) → echo hub.challenge
Meta ─ POST /api/webhooks/whatsapp
        1 verify X-Hub-Signature-256 = "sha256=" + hex HMAC-SHA256(RAW body, WHATSAPP_APP_SECRET) → 401 on mismatch
        2 per message: inbound rate limit (30/min per number), upsert ChannelIdentity (lastInboundAt = 24 h window anchor),
          INSERT ChannelMessage … ON CONFLICT (channel, externalMessageId) DO NOTHING (dedupe), enqueue whatsapp.process
        3 statuses[]: sent / delivered / read / failed move OUTBOUND rows forward only (+ pricing category)
        4 200 { received: true }
worker  whatsapp.process  identity → WHATSAPP session check → conversation state → command → services → replies
        whatsapp.send     24 h window / opt-out / consent / per-recipient limit → Cloud API → SENT (wamid)
        whatsapp.purge    daily 03:45 CAT: 90-day retention
```

| Piece | File |
|---|---|
| Webhook route (thin) | `src/app/api/webhooks/whatsapp/route.ts` |
| Signature + handshake | `src/server/whatsapp/signature.ts` |
| Payload parsing | `src/server/whatsapp/payload.ts` |
| Webhook ingest, receipts | `src/server/whatsapp/inbound.ts` |
| Command parser (keywords) | `src/server/whatsapp/commands.ts` |
| Command router (`whatsapp.process`) | `src/server/whatsapp/router.ts` |
| AI explanations + intent fallback | `src/server/whatsapp/explain.ts` |
| Linking, opt-out, identity → actor | `src/server/whatsapp/identity.ts` |
| Outbound queue (`whatsapp.send`) | `src/server/whatsapp/outbound.ts` |
| Message texts, LaTeX → Unicode | `src/server/whatsapp/render.ts`, `text.ts`, `latex.ts` |
| Window / opt-out / consent rules (pure) | `src/server/whatsapp/policy.ts` |
| Templates registry | `src/server/whatsapp/templates.ts` |
| Cloud API driver | `src/server/messaging/whatsapp-driver.ts` |
| Student linking UI | `src/app/app/settings/whatsapp/` |

## Setup

1. **Meta app.** In [Meta for Developers](https://developers.facebook.com/) create a Business app, add the
   **WhatsApp** product and connect it to the organisation's Meta Business account (Business verification is required
   for production volumes).
2. **Phone number.** Add and verify the business phone number (a number not already used on a WhatsApp app). Note its
   **Phone number ID** (WhatsApp → API Setup).
3. **Access token.** Create a **System User** in Business Settings with the `whatsapp_business_messaging` (and
   `whatsapp_business_management`) permissions and generate a permanent token. Do not use the 24-hour test token in
   production.
4. **Environment** (`.env`, all four together; env.ts refuses a partial set):

   | Variable | Value |
   |---|---|
   | `WHATSAPP_VERIFY_TOKEN` | A long random string you choose; entered again in the webhook form |
   | `WHATSAPP_APP_SECRET` | App → Settings → Basic → App secret (signs every webhook) |
   | `WHATSAPP_ACCESS_TOKEN` | The System User token |
   | `WHATSAPP_PHONE_NUMBER_ID` | The phone number ID |
   | `WHATSAPP_GRAPH_VERSION` | Optional, e.g. `v23.0` (default in the driver). Pin it and upgrade deliberately |

5. **Webhook.** WhatsApp → Configuration → Webhook: callback URL `https://<APP_URL host>/api/webhooks/whatsapp`, verify
   token = `WHATSAPP_VERIFY_TOKEN`. Meta calls the GET handshake; then subscribe to the **messages** field (it carries
   both messages and delivery statuses). The route is excluded from `src/proxy.ts` (no cookies, no redirects).

   **Keep query strings out of access logs for this path.** Meta's GET handshake sends the verify token in the query
   string (`?hub.mode=subscribe&hub.verify_token=…&hub.challenge=…`). Configure the reverse proxy / load balancer / CDN
   in front of the app to log `/api/webhooks/whatsapp` WITHOUT its query string (e.g. nginx: a `log_format` using
   `$uri` instead of `$request_uri` for this location; most CDNs have a "strip query string from logs" option), and
   never forward full request URLs of this path to error trackers. The app itself never logs the token. If the token
   has ever been logged, rotate it: set a new `WHATSAPP_VERIFY_TOKEN`, then re-enter it in the webhook form.
   The proxy must also set `X-Forwarded-For` (the per-IP receipt limit below keys on it).
6. **Templates** (below): create and get them approved before go-live.
7. **Worker.** `registerWhatsAppJobs()` is wired into `src/worker/handlers.ts`; the jobs run on the
   `notifications` queue (`whatsapp.process`, `whatsapp.send`) and `default` (`whatsapp.purge`). Outbound messages
   (replies, link codes through `sendMessage`) use the Cloud API driver whenever the four credentials are set.
8. **AI.** Explanations use the `whatsapp` route of Setting `ai.routing` (FAST tier). Mark it `cacheable: true` so
   repeated "explain X" questions at the same level come from the response cache (no model call).

Without credentials, development and tests use the console messaging driver: nothing is sent, messages (including
link codes) land in the dev outbox. In production without credentials the settings page says WhatsApp is not available
and queued messages are marked FAILED (never silently dropped).

## Templates (register in Meta Business Manager)

Outside the **24-hour customer-service window** (24 h after the student's last message) WhatsApp only delivers
approved templates. Create these in WhatsApp Manager → Message templates with exactly this name, language and number of
variables (`src/server/whatsapp/templates.ts`). Meta bills template conversations by category.

| Key | Name | Language | Category | Variables | Suggested body |
|---|---|---|---|---|---|
| `linkCode` | `account_link_code` | `en` | AUTHENTICATION (copy-code button) | `{{1}}` code | `{{1}} is your verification code. For your security, do not share this code.` |
| `dailyQuestionReady` | `daily_question_ready` | `en` | UTILITY | `{{1}}` subject | `Your daily {{1}} question is ready. Reply QUESTION to get it, or STOP to stop reminders.` |
| `streakReminder` | `streak_reminder` | `en` | UTILITY | `{{1}}` days | `You're on a {{1}}-day study streak. Reply QUESTION to keep it going today, or STOP to stop reminders.` |

Authentication templates have a fixed Meta wording; the code is also passed as the copy-code button parameter.

## Linking a number

Unknown numbers get a short reply explaining how to link (at most once per 10 minutes unless they send HELP). Linking is
started by the signed-in student in **Settings → WhatsApp** (`/app/settings/whatsapp`):

1. The student enters their WhatsApp number (Zimbabwean national formats are accepted and normalised to E.164).
2. A 6-digit code (`VerificationCode` purpose `CHANNEL_LINK`, channel `WHATSAPP`, HMAC-stored, 10 min, 5 tries) is sent
   **to that number** on WhatsApp through the `account_link_code` template. Limits: 60 s resend cooldown, 3 / 15 min
   and 10 / day per number, 20 / h per IP.
3. Typing the code back proves control of the number. In one transaction the identity is linked and verified, the
   student's previous number (if any) is unlinked, a number previously linked to another account moves to this one
   (whoever holds the phone decides; no account enumeration), a `WHATSAPP` Session (auth method `CHANNEL_LINK`) is
   created and the link is audited. Reminders are opt-in (unticked by default).

The WHATSAPP session ties the channel to the normal session controls: **sign out everywhere**, a password change,
suspension or **Unlink** end it, and the number's next message is answered with "link it again". Each processed
message keeps the session alive (rotated at most weekly), so a number unused for about a month must be linked again.

## Commands

Keywords are matched first (case-insensitive); the FAST-tier classifier is used only for messages the keywords cannot
place, only for students whose plan includes the AI tutor, rate-limited; everything else gets the menu.

| Send | What happens | Service |
|---|---|---|
| `QUESTION`, `DAILY`, `QUIZ`, "Give me today's study question", "question biology" | Today's daily question for the first unanswered subject (or the named one) | `practice.getDailyOverview` + `startDailyQuestion` (DAILY_QUESTION attempt, channel WHATSAPP) |
| `A`–`J`, `1`–`10`, `TRUE` / `FALSE`, `YES` / `NO`, a typed answer, or a tapped button / list row | Marked straight away: correct / not quite, the right answer in the letters shown, an explanation excerpt, a lesson link | `attempts.answerAndMark` |
| `SKIP` | Leaves the pending question | — |
| `EXPLAIN photosynthesis`, "what is osmosis?", "define pH" | A short explanation (≤ 1,000 characters) at the student's level, ending with a follow-up question and a link to the tutor | AI gateway, `whatsapp` route |
| `STREAK`, `PROGRESS`, `TARGET` | Streak, best streak, today's target and minutes done | `progress.getStudentDashboard` |
| `HELP`, `MENU`, `HI` | The menu (with "Today's question" / "My streak" buttons) | — |
| `STOP` / `START` | Reminders off / on (replies to the student's own messages still work after STOP) | — |
| `LINK` | How to link / unlink | — |

Question rendering: multiple choice with up to 3 options uses reply buttons, 4–10 options a list, multi-select takes
"A C". True / false uses two buttons. Short answers, numerical answers and single-blank fill-ins are typed. Maths is
converted to Unicode where simple (`x² − 5x + 6`, `½`, `√(x+1)`, `H₂O`); questions with complex maths or pictures carry
a link to the app; matching, labelling, essays, structured and calculation questions are sent with a link to answer in
the app. Options are shown in the attempt's shuffled order; the conversation state remembers the letter → option-key
mapping, and buttons keep working after the typed-answer state expires (6 h).

Answer buttons and list rows carry `a:<attemptId>:<position>:<choice>`. The id comes back from the client, so it is
only trusted as far as the attempt engine allows: the attempt must be the student's own (`getAttemptForStudent`) AND a
**DAILY_QUESTION** attempt — the only kind of question this channel sends (`WHATSAPP_ANSWERABLE_MODES` in
`router.ts`). An id pointing at any other attempt of the student (a web practice session, a lesson check, an
assignment, an exam), even one with immediate feedback, is answered "That question isn't available any more" and
nothing is marked. Typed answers use the same check.

Explanations go through the same controls as the web tutor: entitlement `aiTutor`, `rateLimits.aiMessage`, the daily
allowance `aiMessagesPerDay` (shared with the web tutor), exam integrity (refused while a timed exam or mock is in
progress), a supportive reply with help contacts for safeguarding phrases (no model call), and "AI is not configured"
when there is no API key (never a fabricated answer).

## Privacy and retention

- Webhook payloads are minimised: the WhatsApp profile name is never read; media is never downloaded; an **unlinked**
  number's text is stored only when it is a short command (HELP, STOP, LINK...).
- AI explanations are private AI content (§21): the student's request and the answer live only in `AiMessage` (row-level
  security); the channel rows are `contentClass = AI_PRIVATE` with `body = payload = NULL` and point at the AiMessage.
  The sender reads the answer under the `system` AI scope. These conversations appear in the student's tutor history.
- Link codes are never stored anywhere (`contentClass = OTP` row for cost reporting only).
- Minors: a student marked under 18 can link only after a guardian consented (`guardianConsentStatus = GRANTED`); if
  consent is withdrawn the channel stops serving them, and proactive messages are never sent without it.
- Retention (`whatsapp.purge`, daily): STANDARD message bodies and payloads are nulled after 90 days (`bodyPurgedAt`;
  metadata kept for billing and dedupe); unlinked identities idle for 90 days are deleted. Linked identities go with the
  account.
- Logs carry ids, masked numbers and outcomes, never message text, codes or tokens.

## Limits and failure handling

| Limit | Value |
|---|---|
| Webhook receipts per IP | 300 / minute (`rateLimits.webhookReceipt`, GET and POST), checked before the signature; above it 429 with `Retry-After` (Meta retries) |
| Inbound per number | 30 / minute (`rateLimits.whatsappInbound`), counted only for NEW messages after dedupe (Meta's redeliveries of a stored message never count); extra messages are stored as IGNORED and not processed |
| Outbound per recipient | 20 / minute (`rateLimits.whatsappOutbound`), then backoff |
| Free-form replies | Only within 24 h of the student's last message; otherwise skipped (FAILED `skipped: outside_service_window`) unless the message has a template fallback and the student opted in |
| Proactive messages | Only to opted-in, not-opted-out, consented students; as a template outside the window |
| Text / interactive body | 4,096 / 1,024 characters; buttons ≤ 3 (title ≤ 20); list ≤ 10 rows (title ≤ 24, description ≤ 72) |
| `whatsapp.process` | 3 attempts; the last failure marks the inbound row FAILED |
| `whatsapp.send` | 5 attempts with exponential backoff for network errors, 429, 5xx and Meta rate-limit codes; content Meta rejects (e.g. 131047 outside the window, invalid number) fails at once |

Delivery is at-least-once: if the worker dies after Meta accepted a message but before SENT was recorded, the message
can be sent twice. Message handling is idempotent: answers are never marked twice and explanations are never charged
twice (they are found again by their `clientMessageId`).

## Testing

```
npx vitest run src/server/whatsapp src/server/messaging/whatsapp-driver.test.ts src/app/api/webhooks/whatsapp src/app/app/settings/whatsapp
```

The integration tests run the webhook → process → send pipeline against the test database with the Cloud API driver
over a mocked `fetch` (no network) and a fake AI transport. Before go-live, also test end to end against Meta's test
phone number (ARCHITECTURE §11 phase 16).
