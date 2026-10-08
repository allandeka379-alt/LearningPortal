# Security

Security posture of the platform (spec §39 security, §21 privacy, §40 AI; ARCHITECTURE §4.9, §5, §7), the results of
the 2026-10-06/07 security review, and what must happen before real students use it. Most users are **minors**:
their data, their safety and the integrity of their exams are the assets this document is about.

- Design: [ARCHITECTURE.md §5](ARCHITECTURE.md#5-security-architecture-39) (authentication, RBAC matrix, resource
  rules, CSRF, rate limits, XSS, uploads, audit, secrets, PII, retention), §4.9 (AI privacy in the database), §7
  (payments). This file does not repeat those tables; it says what is built, what was found, and what is left.
- Operations: [DEPLOYMENT.md §4](DEPLOYMENT.md#4-database-roles-and-section-d) (database roles, section D) and §11
  (go-live checklist). Launch blockers: [STATUS.md](STATUS.md#go-live-blockers).

Last verified: 2026-10-07 (final security recheck; see [Verification](#7-verification-of-this-review)).

---

## 1. Threat model

### 1.1 Actors

| Actor | Trust | What they can reach | Typical abuse to design against |
|---|---|---|---|
| Anonymous visitor | None | Public site, SEO curriculum pages, `/daily`, sign-up and sign-in, public search, webhooks endpoints | Credential stuffing, account enumeration, code-email abuse (mail bombing a victim's inbox, sender reputation), pre-registration takeover, scraping premium content |
| Student (most are **minors**, 12–19) | Authenticated, own data only | Own lessons, practice, exams, AI tutor and solver, flashcards, plan, settings, data export and deletion | Paywall bypass, quota races, cheating (AI during exams, answers before the window closes), referral farming |
| Shared-device user | Physically present | A school-lab or family computer where another student was signed in, its offline lesson cache and remembered-device cookie | Reading the previous student's saved lessons, using their session |
| Parent / guardian | Authenticated, linked children only | Child progress (§21 data), consent decisions, paying for a child | Seeing data of children they are not linked to; AI conversations (blocked by default) |
| Teacher / independent tutor | Authenticated, own classes only; **anyone can self-register as a teacher** | Own classes, roster, assignments, teacher-authored questions and answer patterns | Malicious content (ReDoS patterns, prompt injection into the AI tutor), unlocking paid content for students, reaching students outside their classes |
| School admin | Authenticated, own school only | School members, roster imports (XLSX/CSV), seats, reports | Re-adding students who left, enumerating hidden contact details, decompression bombs in uploads |
| Content editor / Admin / Super admin | Staff, step-up for sensitive actions | CMS, imports, billing configuration, settings, audit log, break-glass | Insider misuse (self-granted subscriptions, weakening rate limits), stolen staff session |
| Background worker (`system`) | Internal | Jobs: AI marking, retention purges, exports, deletions, payments reconciliation | Running with more privilege than a job needs |
| External services | Verified per message | Payment providers (Paynow, Stripe), Meta WhatsApp, Anthropic, SMS/email gateways, object storage | Forged or replayed webhooks; data sent to the AI provider (cross-border transfer) |

### 1.2 Assets

1. **Minors' personal data**: names, contact details, school, learning history, results, AI conversations (the most
   sensitive: §21 says parents and teachers never see them by default), solver photos.
2. **Accounts and sessions**: passwords (Argon2id), OTP codes, session and API tokens, remembered-device tokens.
3. **Exam integrity**: correct answers and explanations of tests whose answers are withheld, teacher AI-help settings.
4. **Revenue integrity**: entitlements, plan limits, prepaid periods, referral rewards, school seats.
5. **AI budget**: per-student allowances and the platform's daily spend cap (`AiSpendDaily`, kill switch).
6. **Content**: premium lessons and questions (licensed material, §27), published revisions (immutable).
7. **Availability**: one web node at launch; a single event-loop stall or memory blow-up takes the site down.
8. **Audit trail**: `AuditLog` (append-only for the app role), `ContentRevision`, `PaymentEvent`.

### 1.3 Trust boundaries

```
 Browser / PWA ──(TLS, CDN/WAF, load balancer: TRUSTED_PROXY_HOPS)──> Next.js web (Server Components, Server Actions, /api/v1)
   │  service-worker lesson cache (per viewer)                          │  services in src/server/<domain> (actor-scoped)
   │                                                                    ├──> Postgres as app_rw (NOSUPERUSER, NOBYPASSRLS):
 WhatsApp (Meta) ──signed webhook──> /api/webhooks/whatsapp             │      CHECKs, triggers, RLS on AI tables, append-only grants
 Paynow / Stripe ──signed webhook──> /api/webhooks/payments/[provider]  ├──> Anthropic (student text leaves the country: consent gate)
                                                                        ├──> SMS / email gateways (OTP; cost per message)
 Worker (src/worker) ──same services, `system` actor, withAiScope("system")──┘──> Object storage (private, random keys)
```

Content and files that cross a boundary are treated as hostile: teacher-authored question text and answer patterns
(into the regex engine and AI prompts), uploaded images and spreadsheets (into image and XLSX parsers), AI output
(into the sanitised render pipeline), webhook bodies (signature first, then Zod), and every `X-Forwarded-For` hop the
platform's own proxies did not add.

---

## 2. Controls in place

| Area | Control | Where |
|---|---|---|
| Passwords | Argon2id (OWASP baseline parameters), rehash on login, NIST-style policy with a common-password list | `src/server/auth/passwords.ts`, `password-policy.ts` |
| Codes (OTP) | Sent by EMAIL only (owner decision 2026-10-07: accounts are email-based; a phone number is never a sign-in identifier and never verified). HMAC-SHA256 stored, never plaintext; 10 min TTL; 5 attempts per code; send limits reserved all-or-nothing per target, per day and per IP (a refused request counts nowhere); delivery in the background with decoy rows for unknown identifiers so timing and errors never reveal an account. Codes and other account email (resets, security notices, invitations) are not behind the `features.email` switch | `src/server/auth/otp.ts`, `src/server/lib/rate-limit.ts` (`reserveRateLimits`), `src/server/messaging/send.ts` |
| Security notices | Password changed, password reset, one-time password set by staff, and email address changed (to the OLD address) are emailed to the account's verified address; changing the email needs the current password and a code sent to the new address | `src/server/auth/notices.ts`, `src/server/auth/email-change.ts` |
| Registration and verification | A never-verified account keeps its password only when the verifying flow is the one that chose (or proved) that password (`AuthFlow.binding`, HMAC of user id and password hash); abandoned shells are reclaimable only after 24 h without a live code | `src/server/auth/flows.ts` |
| Sign-in throttling | Same decaying lock for real and unknown identifiers (5th failure in 15 min locks for 15 min); per-IP budget counts failures only; remembered browsers (`dz_device`, sealed, HttpOnly) keep the owner able to sign in during an attack, losing the exemption after 4 wrong passwords | `src/server/auth/login-lock.ts`, `device-trust.ts`, `device-cookie.ts` |
| Current-password checks | Change-password and step-up limited per user (never per IP); 5 wrong current passwords revoke the session and are audited | `src/server/auth/flows.ts` (`assertCurrentPassword`), `rateLimits.currentPassword` |
| Sessions | 32-byte random tokens, SHA-256 in the DB; `__Host-` cookie, `Secure`, `HttpOnly`, `SameSite=Lax`; sliding expiry (staff 12 h idle / 7 days absolute); bearer tokens `dz_`-prefixed, opaque, revocable | `src/server/auth/sessions.ts`, `session-policy.ts`, `cookies.ts` |
| Google sign-in | OIDC code flow with PKCE, `state`, `nonce`; auto-link only on the same verified email | `src/server/auth/google.ts`, `google-handlers.ts` |
| Step-up | Password confirmation within 15 minutes for role grants, refunds, every platform setting, AI settings, and every billing action that gives value away (plans, prices, promo codes, subscription extensions, study-pack prices) | `src/components/admin/guards.ts` (`requireAdminStepUpAction`), `src/server/auth/guards.ts` |
| RBAC | Permission matrix with all / own / restricted / preview scopes; route guards plus resource checks in services | `src/server/auth/permissions.ts`, `rbac.ts`, `guards.ts`; `tests/authz/` |
| Tenancy | Teacher sees only own classes; school admin only own school; parent only ACTIVE links; nobody joins a school without accepting (roster re-joins become invitations); school search never matches hidden contact details by prefix | `src/server/teaching/`, `src/server/schools/` (`roster.ts`, `members.ts`, `invitations.ts`), `src/server/family/` |
| Paywall and assignments | Assigned work skips the student's own plan gates only when the class's tenant holds the `assignments` entitlement (paying school or tutor); otherwise it is gated and counted like the student's own work | `src/server/billing/entitlements.ts` (`assignmentWorkSponsored`), `src/server/attempts/start.ts`, `policy.ts`, `src/server/lessons/` |
| Allowances | Limits enforced atomically (advisory lock per user and feature, recount in the transaction) for practice, topic tests and mock exams; AI quota reserved before every model call, TUTOR and WHATSAPP share one bucket | `src/server/billing/usage.ts` (`assertWithinLimitInTx`), `src/server/ai/meter-db.ts` |
| AI privacy (database) | `FORCE ROW LEVEL SECURITY` on `AiConversation` / `AiMessage`; rows visible only with `app.user_id`, `system`, consented `parent` or audited `break_glass` scope; context snapshots PII-free | init migration; `src/server/lib/db-context.ts` |
| Database integrity | ~290 CHECKs and 83 triggers (content workflow, immutable published revisions, demo rows refused in production, four-eyes approval); app role cannot UPDATE/DELETE `AuditLog` or DELETE `ContentRevision` / `PaymentEvent`; web and worker refuse to boot in production as a superuser or BYPASSRLS role | `prisma/migrations/*_init/migration.sql`, `scripts/sql/app-role-grants.sql`, `src/server/lib/db-safety.ts` |
| CSRF | Server Actions: Next.js Origin/Host check + `SameSite=Lax`; REST with cookies: unsafe methods need a same-origin `Origin` (or `Sec-Fetch-Site: same-origin`); bearer requests ignore cookies; no state change on GET | `src/server/auth/request-auth.ts` |
| Rate limits | Postgres buckets with presets (sign-in, codes, register, AI, uploads, rosters, search, webhooks, family codes, class joins, attempt starts, answer submissions, …), tunable via the step-up-protected `rateLimits` setting; attempt writes also have a per-student in-process concurrency cap (4), checked before any lock or transaction | `src/server/lib/rate-limit.ts`, `src/server/attempts/throttle.ts` |
| Client IP | Taken from the hop our own proxies appended (`TRUSTED_PROXY_HOPS` from the right) or an edge-set header (`CLIENT_IP_HEADER`); never the client-controlled left-most entry; production refuses to boot without one of them, logs the policy in force and warns about risky values at boot, and logs once per process when traffic contradicts the setting (chain shorter than the hop count, header missing) | `src/server/lib/request.ts`, `src/server/lib/env.ts`, `src/server/lib/client-ip-safety.ts`, `src/instrumentation-node.ts` |
| SMS cost (toll fraud) | SMS is switched off (`features.sms`, default off): no code path calls an SMS provider, and nothing in sign-in depends on SMS. If it is switched on, the platform SMS budget applies on every paid send: allowed country prefixes (default `+263`) and a daily cap (default 2,000 per Africa/Harare day) with one SUPER_ADMIN alert per day; setting `messaging.smsBudget` | `src/server/messaging/send.ts`, `sms-budget.ts` |
| Input validation | Zod at every boundary; teacher answer patterns limited to a safe grammar and matched in linear time (Pike VM, no backtracking) with per-pattern, per-spec and per-question program budgets, re-checked at marking time | `src/lib/questions/safe-pattern.ts`, `src/server/marking/mark.ts` |
| XSS | React escaping; one `dangerouslySetInnerHTML` site fed by the sanitised content pipeline (rehype-sanitize before KaTeX, `trust: false`); AI output through the strict profile; CSP `default-src 'self'`, no third-party origins, `frame-ancestors 'none'`, `object-src 'none'`, `form-action 'self'` (scripts still allow `'unsafe-inline'`, see §5) | `src/components/content/RichContent.tsx`, `src/server/content/render.ts`, `next.config.ts` |
| SQL injection | Prisma; raw SQL only via tagged templates; `$queryRawUnsafe` / `$executeRawUnsafe` banned by ESLint | `eslint.config.mjs` |
| Uploads | Magic-byte sniffing, size caps, sharp decode with a pixel limit, re-encode stripping EXIF/GPS, random keys, private storage, per-user rate limit; XLSX read only through a strict ZIP reader (central directory only, declared-size budget, capped inflate, CRC check, rebuilt archive) plus an XML token bound before the parser runs | `src/server/lib/uploads.ts`, `src/server/lib/xlsx.ts` |
| Payments | Provider adapters verify signatures (Paynow hash, Stripe HMAC with timestamp tolerance, sandbox HMAC) with constant-time compare; webhook receipt limit before reading the body; idempotent `PaymentEvent` ledger; state machine refuses a different plan during a running prepaid period (`NEEDS_REVIEW`), checkout refuses it up front | `src/server/billing/providers/*`, `src/server/lib/webhook-guard.ts`, `src/server/billing/subscriptions.ts`, `checkout.ts`, `webhooks.ts` |
| Referrals | Activity-based rewards need a verified phone (unique, SMS-verified); invitees sharing the referrer's or another qualified invitee's canonical mailbox are rejected. Since phones are no longer verified (email-based accounts, 2026-10-07), only payment-based qualification can currently succeed: owner decision pending | `src/server/referrals/core.ts`, `service.ts`, `src/server/auth/identifiers.ts` |
| AI safeguards | All model calls through `src/server/ai` (routing, quota, metering, caching, kill switch, daily spend cap); AI help paused during any exam-condition or ON_SUBMIT attempt and for no-AI assignment work (tutor, solver, WhatsApp); withheld answers never enter tutor context; teacher text sent as untrusted reference data in the user turn, invisible LaTeX / Unicode stripped; safeguarding phrases answered without a model call; per-student daily AI-marking units; guardian consent gate for minors | `src/server/ai/`, `src/server/tutor/core.ts`, `context.ts`, `service.ts`, `src/server/solver/service.ts`, `src/server/whatsapp/explain.ts`, `src/server/family/consent-gate.ts` |
| Audit | `audit()` for staff role changes, staff logins, publish/archive, billing and settings changes, imports, school membership changes, re-activations, privacy requests, break-glass; PII-redacted; append-only | `src/server/lib/audit.ts` |
| Logs | Key-based redaction of secrets, contact details, names, birth year, student numbers and Postgres `DETAIL` (failing rows) at any depth | `src/server/lib/logger.ts` |
| Privacy | Account deletion (14-day grace, cancellable) and JSON export for students; solver photos purged after 30 days, AI message text after 12 months; offline saved lessons bound to the student who rendered them and purged on sign-in, sign-out, viewer change or session end | `src/server/accounts/` (`privacy.ts`, `deletion.ts`, `export.ts`, `retention.ts`, `jobs.ts`), `public/sw.js`, `public/sw-routing.mjs`, `src/server/auth/offline-viewer.ts` |

---

## 3. Findings of this review

Six lenses: authorization / IDOR, injection and rendering, authentication / sessions / CSRF, payments and
entitlements, AI-specific, privacy / uploads / operations. Every finding below was reproduced by a verifier before it
was fixed, and every fix has a regression test that failed before the fix. In the final recheck each fix was re-read
against its attack path, not only its test.

Severity: **critical** = account takeover, cross-tenant access, payment bypass, RCE; **high** = privilege escalation
inside a tenant, stored XSS, PII leak, exam-integrity or safeguarding bypass, platform-wide DoS by a self-registered
user; **medium** = missing or bypassable limit on a sensitive endpoint, information disclosure, DoS needing a
privileged role; **low** = hardening.

| ID | Sev. | Finding | Status | Fix | Regression test |
|---|---|---|---|---|---|
| AUTH-01 | Critical | Pre-verification account takeover: a password set by whoever registered an address first survived the owner's verification (also via resend) | Fixed | `auth/flows.ts`: `AuthFlow.binding`; `verifyCode` drops a pre-verification password unless the flow holds it; `isAbandonedRegistration` | `src/server/auth/flows.test.ts` "pre-verification takeover (AUTH-01)" |
| AUTHZ-1 (= PAY-1) | Critical | A free, self-registered tutor could assign PREMIUM lessons, mock exams and premium practice to any student who joined the class by code, unlocking them free and lifting daily limits | Fixed | `billing/entitlements.ts` `assignmentWorkSponsored`; `attempts/start.ts` (`planExempt`, `config.planGated`), `attempts/policy.ts` `gatesFor`, `billing/usage.ts` `countsAgainstPlan`, `lessons/core.ts`, `lessons/access.ts`, `lessons/check.ts` | `tests/authz/assignment-paywall.test.ts` |
| PAY-2 | Critical | Paying for a different plan during a prepaid period moved the whole remaining period to the new plan (yearly STUDENT, then one monthly PREMIUM, gave 13 months of PREMIUM) | Fixed | `billing/subscriptions.ts` `planChangeBlockedUntil` (payment goes to NEEDS_REVIEW), `billing/checkout.ts` (CONFLICT before payment) | `src/server/billing/subscriptions.test.ts`, `subscriptions.integration.test.ts`, `checkout.integration.test.ts` |
| AUTHZ-5 | High | Roster import silently re-activated a former student's own account matched by admission number, re-exposing their learning data to the school | Fixed | `schools/roster.ts` `analyseRows` / `rejoinInviteTarget`: invitation to the student's own verified contact; outcomes re-derived under the lock at commit; audit + notification for school-managed re-adds | `src/server/schools/roster-rejoin.integration.test.ts` |
| INJ-1 | High | Teacher answer patterns ran on V8's backtracking RegExp: one student submission against a free tutor's test blocked the event loop for hours | Fixed | `lib/questions/safe-pattern.ts` linear Pike-VM matcher and program budgets; `answer-spec.ts`, `validate.ts`; `marking/mark.ts` refuses over-budget stored questions | `src/server/teaching/answer-patterns.integration.test.ts`, `src/lib/questions/safe-pattern.test.ts`, `schemas.test.ts`, `validate.test.ts`, `src/server/marking/mark.test.ts` |
| AUTH-05 | High | Client IP read from the left-most `X-Forwarded-For` entry: any client bypassed every IP rate limit (sign-in, codes, SMS, register, search) | Fixed | `lib/request.ts` (`TRUSTED_PROXY_HOPS` from the right or `CLIENT_IP_HEADER`), `lib/env.ts` (production requires one) | `src/server/lib/request.test.ts`, `src/server/lib/env.test.ts` |
| AI-01 | High | AI tutor, solver and WhatsApp explanations available during non-mock teacher tests, ON_SUBMIT tests and no-AI assignment work | Fixed | `tutor/core.ts` (`decideAiHelpGate`, `strictestAiHelp`), `tutor/context.ts` `getAiHelpGate`; applied in `tutor/service.ts`, `solver/service.ts`, `whatsapp/explain.ts` | `src/server/tutor/ai-help-gate.integration.test.ts`, `src/server/tutor/core.test.ts` |
| AI-02 | High | Tutor context revealed the correct answer and explanation of an AFTER_CLOSE teacher test before the assignment window closed | Fixed | `tutor/context.ts` `loadQuestionContext` uses `questionAccess` / `revealAllowed` (the results page's rule) | `ai-help-gate.integration.test.ts` "AI-02", `core.test.ts` |
| AI-03 | High | Teacher-written question text went into the system prompt (prompt injection against minors, e.g. asking for contact details), including text hidden with `\phantom` / transparent colour | Fixed (residual, §4) | `ai/gateway.ts`, `ai/request.ts` `reference` block in the first user turn; `tutor/core.ts` `visibleTextForAi`; policy prompt treats it as untrusted | `ai-help-gate.integration.test.ts` "AI-03", `src/server/ai/request.test.ts`, `core.test.ts` |
| PRIV-01 | High | Offline saved lessons were served to the next student on a shared device | Fixed | `public/sw.js`, `public/sw-routing.mjs` (viewer tag per saved page, purge on viewer change / sign-in / sign-out / redirect to sign-in), `auth/offline-viewer.ts`, `app/app/layout.tsx` | `src/lib/pwa/sw.test.ts`, `sw-routing.test.ts`, `saved-lessons.test.ts` |
| PRIV-02 | High | The privacy notice promised deletion, a data copy and retention purges that did not exist | **Partially fixed** (§4) | `accounts/retention.ts`, `deletion.ts`, `export.ts`, `privacy.ts`, `jobs.ts`; "Your data" on `/app/settings`; download route `/app/settings/data/[requestId]`; guardian path for minors `accounts/guardian-privacy.ts`, "Data and privacy" on `/parent/children/[studentId]`, download route `/parent/children/[studentId]/data/[requestId]`; export-ready notifications | `src/server/accounts/privacy.integration.test.ts`, `src/server/accounts/guardian-privacy.integration.test.ts`, `src/app/app/settings/page.test.tsx`, `src/worker/handlers.test.ts` |
| MIN-01 | High | A guardian's WITHDRAWN or REFUSED consent was not enforced: the minor's text and photos still went to the AI provider | Fixed (residual, §4) | `family/consent-gate.ts` `assertGuardianConsent` in tutor (create and every turn), solver, solver uploads; setting `privacy.minorAiConsentRequired` for PENDING; AI marking: `aiProcessingRefusedFor` checked by the `ai.mark` job before any model call (`ai/marking.ts` `consentRefusedUserIds` / `markWithoutAi`, `attempts/ai-marking.ts`), answers self-assessed or sent to a teacher (`attempts/self-assess.ts` `aiMarkingAvailableFor`); public sharing (`public_sharing`): share links need GRANTED consent for a minor and stop resolving when it lapses (`sharing/service.ts`), REAL_NAME leaderboard mode refused and shown as first name + initial (`leaderboards/service.ts`, `accounts/student-settings.ts`) | `src/server/family/consent-gate.integration.test.ts`, `src/server/ai/marking.test.ts`, `src/server/attempts/ai-marking.integration.test.ts`, `src/server/sharing/sharing.integration.test.ts`, `src/server/leaderboards/leaderboards.integration.test.ts`, `src/server/accounts/student-settings.integration.test.ts` |
| LOG-01 | High | Postgres `DETAIL` (the failing row: names, Argon2 hash, username) written to logs through Prisma driver errors | Fixed | `lib/logger.ts` redacts `detail` and name / birth-year / student-number keys | `src/server/lib/logger.test.ts` |
| INJ-2 | Medium | XLSX decompression bomb in roster and content imports (memory exhaustion) | Fixed | `lib/xlsx.ts` `readFirstSheet`; budgets in `schools/core.ts`, `cms/imports/constants.ts` | `src/server/lib/xlsx.test.ts`, `src/server/cms/imports/formats.test.ts`, `src/server/schools/roster.integration.test.ts` |
| UPL-01 | Medium | A 17 KB workbook with one huge tag, comment or processing instruction cost minutes of CPU and overflowed the parser's stack | Fixed (residual, §4) | `lib/xlsx.ts` `assertBoundedXml` (token and text-run bounds, no DOCTYPE) | `src/server/lib/xlsx.test.ts` |
| AUTH-02 | Medium | Refused code requests still counted in the victim's buckets (cooldown kept closed for free), and the account lock could keep the owner out | Fixed (residual, §4) | `lib/rate-limit.ts` `reserveRateLimits`; `auth/otp.ts`; remembered devices `auth/device-trust.ts` | `flows.test.ts`, `src/server/auth/device-trust.test.ts`, `src/app/(auth)/actions.test.ts`, `src/server/auth/google-handlers.test.ts` |
| AUTH-03 | Medium | Lock behaviour differed between real and unknown identifiers (account enumeration) | Fixed | `auth/login-lock.ts` | `flows.test.ts` |
| AUTH-04 | Medium | Code delivery errors and timing revealed whether an account exists | Fixed | `auth/otp.ts` background delivery, `issueDecoyOtp` | `flows.test.ts` "code delivery never shows in the response (AUTH-04)" |
| AUTH-06 | Medium | Behind a shared school NAT, one person failing on purpose blocked classmates' correct codes and resets | Fixed | `auth/flows.ts`: `loginIp` counts failures only; correct codes verified first | `flows.test.ts` |
| AUTH-07 | Medium | `rateLimits` (including sign-in limits) and other settings writable without step-up | Fixed | `app/admin/settings/actions.ts` `requireAdminStepUpAction("settings.manage")` | `src/app/admin/settings/actions.test.ts` |
| AUTH-08 | Medium | Current-password checks limited per IP only: a hijacked session could brute-force the password by rotating IPs | Fixed | `auth/flows.ts` `assertCurrentPassword` (per user; session revoked after 5 failures) | `flows.test.ts` |
| PAY-3 | Medium | Check-then-act races let parallel requests exceed daily practice, weekly topic-test and monthly mock limits; follow-up: one student's burst exhausted the DB pool (a 1,500-request burst gave 541-599 Prisma P2028 errors in 13 s on the development machine) | Fixed | `billing/usage.ts` `assertWithinLimitInTx`; `attempts/answer.ts`, `attempts/start.ts`; follow-up: `attempts/throttle.ts` (per-student concurrency cap of 4 and presets `attemptStart` / `answerSubmit`, before any lock or transaction, in every attempt entry point used by web, REST and WhatsApp) | `src/server/attempts/allowance-race.integration.test.ts`, `src/server/attempts/throttle.integration.test.ts`, `src/server/attempts/throttle.test.ts` |
| PAY-4 | Medium | Referral rewards farmed with email-only, plus-addressed sock puppets | Fixed (residual, §4) | `referrals/core.ts` (verified phone, `duplicate_identity`), `referrals/service.ts`, `auth/identifiers.ts` `canonicalEmailMailbox` | `src/server/referrals/referrals.integration.test.ts`, `core.test.ts`, `src/server/auth/identifiers.test.ts` |
| PAY-5 / AI-07 | Medium | TUTOR and WHATSAPP were reserved in separate buckets: a cross-channel burst doubled the daily AI allowance | Fixed | `ai/meter.ts` `quotaFeatures`, `ai/meter-db.ts` `reserveShared` | `src/server/ai/meter-db.test.ts`, `src/server/ai/meter.test.ts` |
| PAY-8 | Medium | Value-giving billing actions without step-up; staff could extend their own subscription | Fixed | step-up in `app/admin/{plans,promo-codes,subscriptions,study-packs}/actions.ts`; `cms/commerce/subscriptions.ts` refuses holder or payer | `src/app/admin/plans/commerce-actions.test.ts`, `src/server/cms/commerce/subscriptions.test.ts` |
| PRIV-03 | Medium | School member search matched students' hidden emails and own usernames by prefix (enumeration, including removed students) | Fixed | `schools/members.ts` `memberSearchWhere({ identifiers: "hidden" })` | `src/server/schools/people.integration.test.ts` |
| AI-04 | Medium | AI marking had no per-student cap: one account could drain the platform's daily AI budget | Fixed (residual, §4) | `ai/marking.ts` `markingQuotaCost`, setting `ai.limits.markingUnitsPerUserPerDay`, `attempts/ai-marking.ts` (over-allowance answers go to review); rate limits on attempt start and answer submission (`attempts/throttle.ts`, presets `attemptStart` 30 per 10 min, `answerSubmit` 120 per minute) | `src/server/ai/marking.test.ts`, `src/server/attempts/ai-marking.integration.test.ts`, `src/server/attempts/throttle.integration.test.ts` |
| AI-08 | Low | WhatsApp intent classifier calls were not bounded by the daily allowance | Fixed | `whatsapp/explain.ts`, preset `whatsappIntentDaily` | `src/server/whatsapp/intent-allowance.integration.test.ts` |
| REC-1 | Low | Found in the recheck: a student's data export and account-deletion request need only a live session, no password confirmation. On a shared device, whoever is signed in as the student can download their data (including AI conversations) or schedule deletion (14-day grace, shown only on the settings page) | Open | Recommended: `requireRecentAuthForAction()` in `src/app/app/settings/data-actions.ts` for export and deletion, plus an email notice when deletion is scheduled | none yet |
| REC-2 | Low | Found in the recheck: a platform assessment's own `maxAttempts` is waived for every assignment, sponsored or not (`src/server/attempts/start.ts:471`); a free tutor can give students more retakes of a platform test than the test allows (the assignment's own `maxAttempts` still applies, and unsponsored work still counts against the student's weekly / monthly test allowances) | Open (content rule) | Recommended: waive only when `assignment.sponsored` | none yet |

---

## 4. Partially fixed findings and residual risk

The attack path named in each finding is closed unless stated otherwise. These are the parts that are not.

| Finding | What is still open | Recommended next step |
|---|---|---|
| **MIN-01** (residual) | Closed in code on 2026-10-07: AI marking skips the model for a minor whose consent is REFUSED / WITHDRAWN (PENDING per `privacy.minorAiConsentRequired`); share links and the REAL_NAME leaderboard mode need GRANTED consent for a minor (PENDING, REFUSED and WITHDRAWN all refuse; the conservative reading, since most self-registered minors start PENDING this switches public sharing off for them until a guardian consents). An answer already sent to the model when consent is withdrawn mid-batch is still recorded (the batch checks once, right before its model calls). Existing share snapshots of a minor are hidden (404), not deleted, while consent is not GRANTED. | Legal to confirm the policy for public sharing and real names (anonymous share cards could be allowed for PENDING minors if counsel agrees); product copy on `/app/achievements` for the refusal. |
| **PRIV-02** (partial) | Self-service deletion and export exist for students, and since 2026-10-07 for a minor's guardian (linked PARENT / GUARDIAN with an ACTIVE link, or the guardian of record; `src/server/accounts/guardian-privacy.ts`): the child is notified of every request and can cancel a guardian's deletion (the guardian is then notified), a guardian's copy never contains AI conversations, guardian downloads are audited, and whoever asked is notified when an export is ready. Teachers and staff still have no UI (staff act on verified requests through the service, `requestedById`). The audit-log 2-year purge exists as an ops script run as the `app_maintenance` role (`scripts/maintenance/purge-audit.ts`, 2026-10-07) but is not scheduled until each environment sets it up (docs/DEPLOYMENT.md §4). | Create `app_maintenance` and schedule the audit-log purge in every environment; legal to confirm that a minor may cancel a guardian's deletion request (current design: yes, disputes go to support). |
| **AUTH-02** (residual) | An attacker who triggers *real* sends (3 per 15 min, 10 per day per target) can still use up a target's daily code budget (emails to the victim's inbox). Remembered devices cover web browsers only; REST / mobile password sign-ins have no device token, so the account lock still applies to them. | Per-purpose daily budgets, or exempt remembered devices from target budgets; device tokens for the mobile API. |
| **AUTH-05** (residual) | A global SMS budget exists since 2026-10-07 (`messaging.smsBudget`: allowed country prefixes, default `+263`, and a daily cap, default 2,000, with a once-a-day SUPER_ADMIN alert; `src/server/messaging/sms-budget.ts`); it counts messages, not segments, and a refused OTP is silently not delivered (AUTH-04). A wrong `TRUSTED_PROXY_HOPS` (larger than the real number of appending proxies) still makes the IP spoofable: production now logs the policy at boot, warns about risky values, and logs once when a request's chain is shorter than the hop count, but only a test from outside proves it. | Verify the hop count from outside before launch (DEPLOYMENT.md §1 "Client IP: exact values"); size the SMS cap and prefixes before launch; per-purpose daily budgets are still open (AUTH-02). |
| **AUTH-07** (residual) | The `rateLimits` override has no minimum floors: an admin who passes step-up can set sign-in limits arbitrarily high. | Floors for auth presets in the override schema. |
| **UPL-01** (residual) | Linear parse cost inside the unpacked budget: about 3.5 s CPU for 16 MB of tiny tags in a 17 KB roster, on the request thread. Bounded by `MAX_ROSTER_XLSX_UNPACKED_BYTES` and `schoolRosterValidate` (30/hour per school admin). | Lower the roster budget, or parse in a worker thread with `resourceLimits`. |
| **AI-03** (residual) | Text coloured to match the background (`\color{white}`) is still sent to the model, as untrusted reference data under the policy rule. Teacher question validation does not reject `\phantom` / `\color` (they have legitimate layout uses). | Monitor flagged conversations; consider stripping colour commands from the AI view. |
| **AI-04** (residual) | Attempt start and answer submission are rate-limited per student since 2026-10-07 (`attemptStart`, `answerSubmit`); marking still has no separate platform budget bucket. | A marking share of `ai.dailyBudgetMicros`. |
| **PAY-3** (follow-up) | Closed 2026-10-07: a per-student concurrency cap (4 in flight per node) and per-student rate limits refuse a burst with RATE_LIMITED before any lock or transaction (`src/server/attempts/throttle.ts`). The cap is per node (N web nodes allow 4 x N), and many DIFFERENT students together can still saturate the pool: size `DATABASE_POOL_MAX` and the pooler for exam evenings (load test, ARCHITECTURE §9.12). | Load test before launch. |
| **PAY-4** (residual) | Each sock puppet now needs its own verified phone; SIM cards are cheap. No device-fingerprint heuristics. | Lower caps or default reward rules (product decision). |

---

## 5. Accepted risks

| Risk | Rationale | Revisit when |
|---|---|---|
| CSP allows `'unsafe-inline'` scripts (no nonces) | Nonces force every route to render dynamically, defeating static, CDN-cached public pages on poor connections (§29, §44). XSS defence rests on React escaping, the single sanitised `dangerouslySetInnerHTML` site and no third-party origins. | Before launch for the authenticated areas (§6) |
| RLS depends on GUCs the app sets (`set_config('app.user_id' / 'app.ai_scope', …, true)`) | RLS protects AI conversations from application query mistakes (a stray `include`), not from code that runs as `app_rw` or from SQL injection; those are covered by tagged-template SQL and the ESLint ban. | Never: keep the SQL rules |
| Minors with PENDING guardian consent may use AI (`privacy.minorAiConsentRequired` defaults off) | The age threshold and consent requirements under the Cyber and Data Protection Act are not confirmed; the setting switches it without a deploy. WITHDRAWN / REFUSED are always enforced for tutor and solver. | Legal review (§6) |
| Mid-period plan upgrades are refused rather than prorated | Closes PAY-2 without a pricing model; customers can renew the same plan or switch once the period ends. | Product decides on prorated upgrades |
| Insider billing actions | Admins with step-up can create promo codes or extend other users' subscriptions; every such action is audited and self-extension is refused, but there is no four-eyes rule for billing. | Staff grows beyond the founding team |
| No staff MFA | Not modelled; staff sessions are short (12 h idle, 7 days absolute) and sensitive actions need step-up. | Before onboarding staff beyond the founders |
| Premium content existence visible in search | Premium items match on body words and show as locked teasers (STATUS "Search on premium content"). | Product decision |
| Unsponsored assignments keep counting against the student's own plan | Correct by design after AUTHZ-1; a free tutor's class behaves like the student's own study. | — |

---

## 6. Pre-launch checklist

Security items only; the full go-live list is DEPLOYMENT.md §11 and STATUS.md "Go-live blockers".

**Secrets and configuration**

- [ ] `SESSION_SECRET` is a fresh random value (at least 32 bytes) per environment, held in the secret manager. It keys OTP hashes, sealed auth flows, remembered-device tokens and offline-viewer tags: rotating it signs nobody out but invalidates those.
- [ ] `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` set explicitly and shared by all web replicas.
- [ ] Payment secrets (Paynow integration key, Stripe secret and webhook signing secret), `WHATSAPP_APP_SECRET` / `WHATSAPP_VERIFY_TOKEN` / `WHATSAPP_ACCESS_TOKEN`, `ANTHROPIC_API_KEY`, SMS / email provider keys, database and object-storage credentials: per environment, in the secret manager, never in the image (`.dockerignore` excludes `.env*`; Next copies `.env*` into standalone output otherwise).
- [ ] `PAYMENTS_ENABLED_PROVIDERS` without `sandbox`; a real email adapter (`EMAIL_PROVIDER=resend`; production refuses unset and `console`). SMS stays unset (`none`) while `features.sms` is off.
- [ ] `TRUSTED_PROXY_HOPS` **or** `CLIENT_IP_HEADER` set for the real proxy chain: Cloudflare -> AWS ALB -> app is `TRUSTED_PROXY_HOPS=2` (ALB in the default `append` mode), or `CLIENT_IP_HEADER=cf-connecting-ip`; either way the ALB must accept Cloudflare's IP ranges only. The web boot log shows the expected `client IP policy` and no `client IP configuration warning`; then verified from outside: requests with forged `X-Forwarded-For` values must be rate-limited under the real client address (DEPLOYMENT.md §1 "Client IP: exact values" has the commands).
- [ ] Optional features (`/admin/settings`): AI, WhatsApp, optional email, SMS and Stripe off unless the owner decided otherwise. Before switching SMS on: SMS budget reviewed (`messaging.smsBudget`: only the countries served in `allowedCountryPrefixes`, `dailyMax` sized to the expected volume).
- [ ] `APP_URL` is https (so cookies are `__Host-` and `Secure`); HSTS sent; decide on `preload` once the domain is final.
- [ ] Review the `rateLimits`, `ai.limits.*` (including `markingUnitsPerUserPerDay`), `ai.dailyBudgetMicros` and `privacy.minorAiConsentRequired` settings in `/admin/settings`.

**Database (section D roles)**

- [ ] `app_rw` is `LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE`; the owner role is separate and used only by the migrate job (DEPLOYMENT.md §4).
- [ ] `scripts/sql/app-role-grants.sql` applied: no UPDATE/DELETE/TRUNCATE on `AuditLog`, no DELETE/TRUNCATE on `ContentRevision` and `PaymentEvent`.
- [ ] Database defaults `app.environment = 'production'` and `app.four_eyes = 'on'`.
- [ ] `scripts/db-deploy.ts --verify-only` passes, `/api/ready` reports the section D checks green, and the web and worker boot assertions (`src/server/lib/db-safety.ts`) pass as the app role.
- [ ] TLS to the database (`sslmode=verify-full`), encrypted backups with PITR, restore drill done.

**Browser hardening**

- [ ] CSP nonce hardening: per-request nonce with `'strict-dynamic'` set in `src/proxy.ts` for the dynamic areas (`/app`, `/admin`, `/parent`, `/teacher`, `/school`, auth pages), hashes or SRI for static public pages, then drop `'unsafe-inline'` from `script-src` (`next.config.ts`).
- [ ] Any new third-party origin (analytics, payment widget, Google Identity) added to the CSP explicitly and reviewed.

**Close the open items**

- [x] MIN-01: consent gate on AI marking, share links and real-name leaderboards (§4; legal to confirm the public-sharing policy).
- [ ] PRIV-02: guardian-initiated deletion and export for minors (done 2026-10-07); audit-log purge scheduled in every environment or an updated privacy notice.
- [ ] REC-1: password confirmation for data export and account deletion; notice on scheduled deletion.

**External review**

- [ ] Penetration test by an independent party against staging with production-like configuration: authentication (codes, reset, Google, remembered devices, lockout), tenant isolation (teacher / school / parent / student IDOR across every `/api/v1` route and Server Action), payments with live providers in test mode (webhook forgery and replay, plan changes, refunds), uploads (images, XLSX, CSV), AI prompt injection and safeguarding, the shared-device PWA scenario, and rate limits behind the real CDN and load balancer.
- [ ] Legal review under Zimbabwe's Cyber and Data Protection Act [Chapter 12:07]: minors' consent and age threshold (then set `privacy.minorAiConsentRequired`), cross-border transfer (hosting outside Zimbabwe, AI processing by Anthropic in the US), Anthropic data-retention settings for the account, retention periods (payments 6 years assumed, audit log 2 years), and the privacy notice and terms matching what is built.
- [ ] Dependency audit (`npm audit`, lockfile review) and error tracking configured to scrub PII before data leaves the platform.

---

## 7. Verification of this review

Final recheck on 2026-10-07, on the working tree with all fixes applied:

| Check | Result |
|---|---|
| `npm run typecheck` | exit 0, no errors |
| `npx eslint src tests` | exit 0, no warnings or errors |
| `npx vitest run .` | 474 test files, 5,099 tests passed, 0 failed (unit, Postgres integration as `app_rw`, jsdom) |

Original verifier reproductions (`.scratch/*-verifier/`) assert that each exploit works; after the fixes they fail at
the exploit step, which is the intended outcome.

**Security residuals pass (2026-10-07, later the same day):** MIN-01 (AI marking, share links, real-name
leaderboards), AI-04 / PAY-3 (attempt throttles), PRIV-02 guardian path, client-IP boot and runtime warnings, and the
platform SMS budget. `npm run typecheck` exit 0; ESLint clean on every touched file; a regression subset of 191 test
files (attempts, practice, exams, WhatsApp, sharing, leaderboards, accounts, family, messaging, notifications, auth,
lessons, onboarding, teaching, AI, lib, worker, settings, student / parent / admin pages and components, `tests/authz`,
deployment docs) passed: 1,824 tests, 0 failed; plus the new component tests run separately. The full suite was not
re-run in this pass. The burst baseline (P2028 errors before the throttle) was measured once with a temporary script,
not kept in the suite. No live provider, CDN or load balancer was available: the SMS budget was tested with fake
adapters, and the Cloudflare / ALB values are from the providers' documented behaviour, to be verified from outside
before launch (DEPLOYMENT.md §1).
