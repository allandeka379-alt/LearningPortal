# REST API v1

The versioned REST API for the native app and integrations (PRODUCT_SPEC §30, §38; ARCHITECTURE §3.3, §3.5, §3.6,
§5). It is a thin layer over the same services the web app uses, so a student's practice, streak, XP and mastery are
identical whichever channel they study on. The WhatsApp channel calls the same services directly (ARCHITECTURE §8).

- Base path: `/api/v1`
- Machine-readable contract: `GET /api/v1/openapi.json` (OpenAPI 3.1, generated from the Zod schemas the handlers
  validate with — see "Where the code lives").
- Brand: the product name is configurable (`NEXT_PUBLIC_APP_NAME`); the API never depends on it.

## Versioning policy

Within v1 changes are **additive only**:

| Allowed in v1 | Requires `/api/v2` |
|---|---|
| New endpoints | Removing or renaming an endpoint, field or enum value |
| New optional request fields / query parameters | Making an optional input required, tightening validation of existing inputs |
| New response fields | Changing a field's type or meaning, changing status codes of existing outcomes |
| New enum values in responses | Changing pagination or error envelopes |
| New error codes for new situations | Changing authentication |

Clients must therefore **ignore unknown response fields and tolerate unknown enum values** (fall back to a generic
presentation). The OpenAPI document's `info.version` follows semver: the minor version grows with additive changes.
When v2 ships, v1 keeps working through a deprecation period announced with it (length TBC by the product owner);
deprecated operations will carry `Deprecation` and `Sunset` response headers before removal.

## Authentication

Every endpoint except the sign-in routes and `GET /openapi.json` needs credentials:

- **Bearer token** (apps, integrations): `Authorization: Bearer dz_…`. Tokens are opaque (no JWT), 32 random bytes
  with a `dz_` prefix so secret scanners catch leaks. Only `SHA-256(token)` is stored server-side; the token itself is
  returned **once**. Keep it in the platform keystore (Android Keystore / iOS Keychain), never in logs or URLs.
- **Session cookie** (the website's own pages only): accepted when no `Authorization` header is sent. Unsafe methods
  (`POST`, `DELETE`, …) must be same-origin (`Origin` equal to the site, or `Sec-Fetch-Site: same-origin`), otherwise
  403 (CSRF). When a bearer header is present cookies are ignored.

### Getting a token

**Password** — `POST /auth/token`

```http
POST /api/v1/auth/token
Content-Type: application/json

{ "identifier": "tendai@example.com", "password": "…", "label": "Tendai's phone" }
```

`identifier` is an email address or a school-issued username. Phone numbers are not sign-in identifiers (accounts are
email-based; a phone number answers `422` on `identifier`).

- `201` → `{ "data": { "status": "authenticated", "token": "dz_…", "tokenType": "Bearer", "sessionId", "userId",
  "expiresAt", "absoluteExpiresAt" } }`
- `202` → the password was right but the account's email address has never been verified: a code was emailed and the body
  is a code flow (below). Finish with `POST /auth/otp/verify`.
- `401` for a wrong identifier **or** a wrong password (one generic message). After 5 wrong passwords the account is
  locked for 15 minutes (`429`).

**One-time code (passwordless)**

1. `POST /auth/otp/request` `{ "identifier": "tendai@example.com" }` → `202` `{ "data": { "status": "code_sent",
   "flowToken", "channel": "EMAIL", "destination": "te***@example.com", "expiresInSeconds": 900,
   "resendAfterSeconds": 60 } }`. The answer is identical whether or not an account exists.
2. `POST /auth/otp/verify` `{ "flowToken": "…", "code": "123456", "label": "…" }` → `201` with a token (as above).

`flowToken` is an encrypted, 15-minute token (AES-256-GCM); it contains nothing readable. A wrong code, a reused code,
an expired or tampered `flowToken` all answer `422` with a generic message. To resend, call step 1 again after
`resendAfterSeconds`.

### Lifetime, revocation, account

- API tokens slide: each authenticated request extends the idle expiry (written at most every 5 minutes). Current
  policy (`src/server/auth/session-policy.ts`): **90 days idle, 180 days absolute** for students, parents and teachers
  (a token unused for 90 days stops working; however active, every token ends 180 days after sign-in);
  **12 hours idle, 7 days absolute** for staff roles. `expiresAt` / `absoluteExpiresAt` in the token response tell the
  client when it must sign in again. A password change or reset revokes every token.
- `DELETE /auth/token` revokes the token used for the request (`204`). Each sign-in creates its own session; the user's
  device list on the website shows every token by its `label`.
- `GET /me` returns the user, their effective roles, time zone, contact verification state and the current session.
- A user signed in with a password their **school** set (`passwordMustChange: true` in `/me`) gets `403
  FORBIDDEN` (`password_change_required`) on every other endpoint — the tutor, search and upload routes included,
  by token or by cookie — until they choose their own password on the website. `GET /me` and sign-out keep working.

## Requests

- JSON bodies with `Content-Type: application/json`; per-endpoint body caps (4 KB – 256 KB) are listed in the
  OpenAPI document. Unknown body fields are rejected (`422`).
- Ids are UUIDs. Timestamps are ISO 8601 in UTC (`2026-10-06T08:30:00.000Z`); calendar dates are `YYYY-MM-DD` in the
  student's time zone (`/me` → `timeZone`).
- **Idempotency**: `POST /practice/sessions` and `POST /flashcards/{id}/review` accept an `Idempotency-Key` header
  (8–64 of `A-Z a-z 0-9 - _`, plus `.` and `:` for reviews) or the equivalent body field (`idempotencyKey`,
  `clientReviewId`). Repeating the request returns the original result (`200` / `replayed: true`). Answers are
  idempotent per question position without a key: answering an already-marked question returns its stored result.
  `POST /flashcards/reviews` is idempotent per item `clientReviewId` (send one with every queued review), and
  `POST /practice/sessions/{id}/end` returns the same results when repeated.
- Every response carries `x-request-id`; quote it when reporting a problem.

## Responses

| Shape | When |
|---|---|
| `{ "data": … }` | Single resources and actions |
| `{ "data": [ … ], "nextCursor": "…" \| null }` | Lists |
| `{ "data": [ … ], "nextCursor": null, "meta": { … } }` | The flashcard review queue (counts in `meta`) |
| `{ "data": [ … ] }` | Small fixed lists: enrolments created, search suggestions, batch review results |
| `204`, no body | `DELETE /auth/token` |
| `{ "error": { "code", "message", "fieldErrors"? } }` | Every error |

Successful responses are `Cache-Control: private, no-store`, except catalogue lists (`private, max-age=300`) and the
OpenAPI document (`public, max-age=300`). The catalogue endpoints need a signed-in user (any role): they stay off the
public internet until an edge (CDN / WAF) rate limit exists in front of the API (ARCHITECTURE §3.4). Anonymous visitors
browse the catalogue on the website's public curriculum pages.

### Pagination

Cursor-based: `?limit=` (1–100, default 20; notifications 1–50) and `?cursor=` (the opaque `nextCursor` of the
previous page). `nextCursor: null` means the last page. Cursors are opaque — never build or parse them. A cursor whose
anchor item has disappeared answers `422` (`fieldErrors.cursor`); restart from the first page.

`GET /flashcards/due` is a review **session**, not an archive: it returns up to `limit` cards (max 200), due cards
first, and `nextCursor` is always `null`. Review them, then ask again.

### Errors

| HTTP | `code` | Meaning / client action |
|---|---|---|
| 400 | `BAD_REQUEST` | Not JSON, body too large, wrong flow |
| 401 | `UNAUTHENTICATED` | Missing / invalid / expired / revoked token, or wrong sign-in details → sign in |
| 403 | `FORBIDDEN` | Wrong role, cross-site cookie request, school-set password to change |
| 403 | `ENTITLEMENT_REQUIRED` | The plan does not include this → show an upgrade prompt |
| 404 | `NOT_FOUND` | Not found — **including other users' resources** (never reported as forbidden, so ids cannot be probed) |
| 409 | `CONFLICT` | State changed (session already closed, review id reused for another card) |
| 422 | `VALIDATION` | Invalid input; `fieldErrors` maps dot-joined field paths (`subjectIds.0`) to messages, `_form` for the whole request |
| 429 | `RATE_LIMITED` | Too many requests → wait `Retry-After` seconds |
| 429 | `QUOTA_EXCEEDED` | Plan allowance used up for now (e.g. daily practice questions) → `Retry-After` / upgrade |
| 503 | `AI_UNAVAILABLE` | AI temporarily unavailable |
| 500 | `INTERNAL` | Unexpected; the message carries a reference id. Nothing internal is ever exposed |

`message` is always safe to show to the user.

## Rate limits

Postgres-backed and shared by every server instance (ARCHITECTURE §5.5); defaults are tunable without a deploy.

| What | Limit |
|---|---|
| Any signed-in request (bearer token **or** session cookie) | 600 / minute per **user**: every token and cookie session of the user shares one bucket (`publicApi`) |
| Sign-in, all endpoints together (`/auth/token`, `/auth/otp/request`, `/auth/otp/verify`, the website's sign-in, code and reset forms) | 60 / 15 min per IP, whatever identifier is used (`loginIp`), on top of the limits below. Generous enough for a school class behind one address; a client that rotates identifiers is stopped |
| `POST /auth/token` | 10 / 15 min per (IP, identifier); 5 wrong passwords lock the account for 15 min |
| `POST /auth/otp/request` | 1 per 60 s per destination; 3 / 15 min and 10 / day per destination; 20 / hour per IP |
| `POST /auth/otp/verify` | 5 tries per code; 10 / 15 min per destination; 10 / 15 min per (IP, destination) (`apiOtpVerify`) |
| Tutor messages | 10 / minute per student, plus the plan's daily AI allowance |
| Uploads | 30 / hour per user |

Every limited answer is `429 RATE_LIMITED` with `Retry-After`. The messages are generic and identical for existing and
unknown accounts, so a limit never reveals whether an account exists.

## Endpoints

Roles: **S** = STUDENT only; **any** = any signed-in user. Full schemas: `GET /api/v1/openapi.json`.

| Method and path | Who | Purpose |
|---|---|---|
| `POST /auth/token` | public | Password sign-in → token (201) or verification step (202) |
| `DELETE /auth/token` | any | Revoke the current token |
| `POST /auth/otp/request` | public | Send a one-time code |
| `POST /auth/otp/verify` | public | Code → token |
| `GET /me` | any | The user and current session |
| `GET /catalogue/boards?countryId=` | any | Examination boards (onboarding) |
| `GET /catalogue/qualifications?boardId=` | any | Qualifications with their cross-board level |
| `GET /catalogue/subjects?qualificationId=` | any | Subjects with category and `isEnrollable` |
| `GET /enrollments?includeDropped=` | S | The student's subjects with the **pinned** syllabus version |
| `POST /enrollments` | S | Enrol `{ subjectIds, targetExamSessionId?, targetGrade?, abilityLevel? }` (idempotent) |
| `GET /dashboard` | S | Progress, countdown, streak, weak / strong topics, today's target, recommendations |
| `GET /progress` | S | Progress overview: mastery distribution per subject, last 30 days of activity, XP and level, streak, achievements |
| `GET /study-plan/today` | S | Today's study-plan items and the plan summary; `plan: null` without a plan (create one on the website) |
| `GET /subjects/{id}/topics` | S | Pinned topic tree with mastery; pages over top-level topics |
| `GET /lessons/{id}?topicId=` | S | Lesson: sanitised HTML (KaTeX), headings, plain text; `locked: true` without content when outside the plan |
| `POST /practice/sessions` | S | Start adaptive practice `{ subjectId, topicIds?, count?, difficulty?, mode? }` |
| `GET /practice/sessions/{id}` | S | Every question (answer-safe), own answers, feedback of marked ones |
| `POST /practice/sessions/{id}/answers` | S | `{ position, response }` → immediate marking and feedback |
| `POST /practice/sessions/{id}/hints` | S | `{ position }` → the next hint of an unanswered question (409 when none is left) |
| `POST /practice/sessions/{id}/self-assessment` | S | `{ position, pointIds?, marks? }` → self-mark a pending open answer against its mark scheme (when AI marking is unavailable) |
| `POST /practice/sessions/{id}/end` | S | End early: answered questions scored, the rest left out → the results (idempotent) |
| `GET /practice/sessions/{id}/summary` | S | Score, topic results and mastery change, XP, review |
| `GET /daily-question?subjectId=` | S | Today's question per subject; `current` = the selected one once opened (read-only) |
| `POST /daily-question/start` | S | Open today's question for a subject (201, or 200 if already opened) |
| `POST /daily-question/answer` | S | `{ subjectId, response }` → marked immediately; counts for the streak |
| `GET /flashcards/due?subjectId=&topicId=&limit=` | S | Review queue (see Pagination) |
| `POST /flashcards/{id}/review` | S | `{ rating: AGAIN\|HARD\|GOOD\|EASY, durationMs?, clientReviewId?, reviewedAt? }` |
| `POST /flashcards/reviews` | S | Offline sync: `{ reviews: [{ flashcardId, rating, clientReviewId, reviewedAt?, durationMs? }] }` (1–200) → one result per review in press order (below) |
| `GET /notifications?unreadOnly=` | any | In-app inbox, newest first |
| `POST /notifications/read` | any | `{ ids: [...] }` or `{ all: true }` |
| `GET /tutor/conversations` | S | AI tutor conversations (private to the student) |
| `POST /tutor/conversations` | S | Start one `{ subjectId?, topicId?, questionId? }` |
| `POST /tutor/conversations/{conversationId}/messages` | S | Send a message; the reply **streams** (below) |
| `GET /search/suggest?q=` | optional | Title autocomplete |
| `POST /uploads?purpose=` | role per purpose | Multipart file upload |
| `GET /openapi.json` | public | This contract |

### Answers and questions

Questions are always **answer-safe** until marked: no correct flags, answer specs, explanations, rationales, mark
schemes or hint texts (only `hintCount`). Option order is shuffled per attempt; answers reference stable keys, never
positions. Responses are typed by question type, e.g.

```json
{ "position": 1, "response": { "type": "MULTIPLE_CHOICE", "optionKeys": ["B"] } }
{ "position": 2, "response": { "type": "NUMERICAL", "value": "12.5", "unit": "cm" } }
{ "position": 3, "response": { "type": "SHORT_ANSWER", "text": "photosynthesis" } }
```

After marking, the feedback carries `outcome` (`correct` / `partial` / `incorrect` / `pending` / `review`), marks, the
reveal (correct answer, explanation, worked solution, concept), the topic, a lesson to study and the mastery band
change. Open answers marked by AI may come back `pending`; read the session again later. HTML fields are sanitised and
already contain rendered maths: display them as-is in a web view (KaTeX CSS) — never re-render authored Markdown on the
client.

Practice-session endpoints (`/practice/sessions/{id}/…`) only serve the caller's own **practice-style** sessions
(practice, re-tests, lesson checks, daily questions). Exams, mocks, tests and diagnostics are `404` here: they are never
hinted, self-marked or submitted through this API.

### Offline flashcard sync

Queue every Again / Hard / Good / Easy press on the device with a `clientReviewId` (8–64 of `A-Z a-z 0-9 - _ . :`) and
its press time (`reviewedAt`). When online, send up to 200 at a time to `POST /flashcards/reviews`:

```json
{ "reviews": [
  { "flashcardId": "…", "rating": "GOOD", "clientReviewId": "rev-0001-abcd", "reviewedAt": "2026-10-06T07:12:03.000Z", "durationMs": 4200 },
  { "flashcardId": "…", "rating": "AGAIN", "clientReviewId": "rev-0002-abcd", "reviewedAt": "2026-10-06T07:12:09.000Z" }
] }
```

The answer is `{ "data": [ … ] }`, one slot per review **in press order**: `{ "clientReviewId", "ok": true, "outcome":
{ …same as POST /flashcards/{id}/review… } }` or `{ "clientReviewId", "ok": false, "code", "message" }`. Each review is
validated and applied on its own, so a bad item never blocks the rest. Remove `ok: true` items (including
`replayed: true`, already applied earlier) and failed items with a permanent code (`VALIDATION`, `NOT_FOUND`,
`CONFLICT`, `ENTITLEMENT_REQUIRED`, `FORBIDDEN`); keep `RATE_LIMITED` / `INTERNAL` items for the next attempt. Only the
batch's shape (an object with 1–200 items, each with `flashcardId` and `rating` strings) is checked up front (`422`).

### AI tutor stream

`POST /tutor/conversations/{conversationId}/messages` with `{ "text": "Explain photosynthesis", "mode"?: "TEACH" |
"HINT" | "CHECK_WORK" | "ANSWER", "clientMessageId"?: "8-64 chars" }`. Authentication, CSRF and body errors are normal
JSON errors. Once the turn starts the response is `text/event-stream`, one JSON object per `data:` line:

```text
data: {"type":"start","turnMode":"TEACH","hintLevel":null}

data: {"type":"delta","text":"Photosynthesis is how plants "}

data: {"type":"delta","text":"make glucose from light…"}

data: {"type":"done","messageId":"…","userMessageId":"…","html":"<p>…</p>","status":"COMPLETE","quota":{"limit":20,"remaining":19},"turnsRemaining":29,"title":"Photosynthesis","helplines":null,"replayed":false,"turnMode":"TEACH","hintLevel":null}
```

Append `delta` text while streaming; on `restart` discard it; on `done` replace it with `html`. A failure is a single
`error` event `{ "type": "error", "code", "message", "upgradeHref"?, "retryAfterSeconds"? }` — codes include
`AI_NOT_CONFIGURED` (the server has no AI key: never a made-up answer), `QUOTA_EXCEEDED`, `ENTITLEMENT_REQUIRED`,
`EXAM_IN_PROGRESS` and `RATE_LIMITED`. Closing the connection stops generation. Retrying with the same
`clientMessageId` replays the stored reply without using quota.

## Example

```bash
TOKEN=$(curl -s -X POST https://example.org/api/v1/auth/token \
  -H 'content-type: application/json' \
  -d '{"identifier":"tendai@example.com","password":"…","label":"CLI"}' | jq -r .data.token)

curl -s https://example.org/api/v1/enrollments -H "authorization: Bearer $TOKEN"

SESSION=$(curl -s -X POST https://example.org/api/v1/practice/sessions \
  -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' -H 'idempotency-key: cli-0001-abcd' \
  -d '{"subjectId":"<uuid>","count":5}' | jq -r .data.session.id)

curl -s -X POST "https://example.org/api/v1/practice/sessions/$SESSION/answers" \
  -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' \
  -d '{"position":1,"response":{"type":"MULTIPLE_CHOICE","optionKeys":["B"]}}'

curl -s -X DELETE https://example.org/api/v1/auth/token -H "authorization: Bearer $TOKEN"
```

## Where the code lives

| Piece | File |
|---|---|
| Contract registry (method, path, auth, roles, schemas, responses) | `src/server/api/contract.ts` (+ `openapi-external.ts` for tutor, search, uploads) |
| Zod schemas (inputs and documented responses) | `src/server/api/schemas.ts` |
| Route builder (`v1Route`: contract → `apiRoute`) | `src/server/api/route.ts`, on `src/server/lib/api.ts` |
| OpenAPI generator | `src/server/api/openapi.ts` |
| Token flows, `/me` | `src/server/api/account.ts` → `src/server/auth/flows.ts` |
| Practice, daily question, lesson and study-plan projections | `src/server/api/learning.ts` → `src/server/practice`, `src/server/attempts`, `src/server/lessons`, `src/server/studyplan` |
| Progress, flashcards (called directly) | `src/server/progress`, `src/server/flashcards/service.ts` |
| Route handlers | `src/app/api/v1/**/route.ts` |

Adding an endpoint: add the schemas, add the contract entry, build the route with `v1Route(operations.x, handler)`
calling a service, map it in `src/server/api/v1-access.integration.test.ts` (the test fails until you do), and add a
line to the table above.
