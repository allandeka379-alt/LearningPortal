# Lead follow-ups (integration items reported by agents)

## After core-services completes
- [ ] Register job handlers in src/worker/handlers.ts:
  - analytics.dailyMetrics (cron 01:00 CAT via nightlyDailyMetricsJob), analytics.backfillMetrics — src/server/analytics/jobs.ts
  - search.reindexEntity, search.reindexAll — src/server/search/indexer.ts (doc names it search.index: align)
  - ai.mark (createMarkPendingAiResponsesHandler; attempts module implements loadItems/saveOutcome/requireSelfAssessment), ai.cache.purge (daily)
  - payments.reconcile: call registerPaymentJobs() from src/server/billing/reconcile.ts
- [ ] audit.ts AUDIT_ACTIONS: PAYMENT_STATUS_CHANGE, PAYMENT_AMOUNT_MISMATCH, PAYMENT_DISPUTED, PAYMENT_NEEDS_REVIEW (remove TODO(shared) cast in billing/webhooks.ts)
- [ ] rate-limit presets: checkout (10/600s user), billingReturnPoll (30/600s IP), paymentWebhookRejected (30/3600s)
- [ ] env.ts + .env.example: PAYNOW_CURRENCY / per-currency ZWG integration, PAYNOW_MERCHANT_EMAIL, PAYNOW_TEST_MODE, STRIPE_API_VERSION; wire in providers/registry.ts
- [ ] LogoutButton: wrap form in <ClearOfflineDataOnSubmit> (shared-device privacy); also clear offline lesson cache when a DIFFERENT user signs in (PWA verifier gap)
- [ ] Saved lessons: delete cached copy on 401/403 too (access lapse)
- [ ] Toast action option (optional) for SW update prompt
- [ ] Billing UI: /app/billing, /app/billing/result, pricing buy buttons, admin refunds, promo codes, referral qualification, school seat purchase
- [ ] Migration 2 (indexes; plain CREATE INDEX IF NOT EXISTS — tables empty at first deploy):
  - Payment_refunded_at_idx (partial), Subscription_access_end_idx (expression, partial), User_demo_idx (partial),
    AssessmentAttempt_userId_submittedAt_idx (partial). DailyMetric(metric,date) INCLUDE -> declare @@index([metric, date]) in schema instead (Prisma can't express INCLUDE).
- [ ] Publish/archive flows must enqueue search.reindexEntity in the same tx (content publish helper) + invalidateResponseCacheForSubject on corrections.
- [ ] loadAiConfig -> settings.ts getSetting; resetAiConfigCache after admin save.
- [ ] Seed: ai.marking.minConfidence 0.75, markingEssay route (DEEP), effort medium on marking, cacheable flag on whatsapp route.
- [ ] analytics/access.ts stand-ins -> replace with auth rbac resource checks (canManageClass etc.).
- [ ] Revenue USD normalisation (fx setting) — billing/analytics.
- [ ] Spend-guard alert to SUPER_ADMIN when AI budget trips (notifications).
- [ ] AI request counting mismatch: AiSpendDaily vs AiUsageDaily (document or align).

## Between waves (when no workflow is running)
- [ ] next.config.ts: `distDir: process.env.NEXT_DIST_DIR || ".next"` + .gitignore `.next*/` so parallel verifiers can each run
      `NEXT_DIST_DIR=.next-<label> npx next dev -p <port>` (Next 16 allows one dev server per distDir). Add the rule to
      future workflow prompts: never kill another agent's dev server.
- [ ] Visual pass (browser pane must be visible — ask user to press Ctrl+Shift+B if hidden): student pages @360px light/dark,
      admin pages @1280px; login with demo.student / demo.admin (docs/DEV_SEED.md).

## Product decisions to surface to owner
- Parent access to AI conversations (spec allows w/ consent; modelled, default OFF).
- School-provisioned student accounts without email/phone (User_contact_required_chk blocks) — likely needed in ZW.
- Minor consent policy / age threshold per country (legal).
- Half marks (integer marks today), mastery carry-over across syllabus versions.
- Teacher view for subject-less classes (derive subjects from assignments?).
- Search: premium items match on body words (existence oracle) — acceptable?

## Docs drift to fix
- ARCHITECTURE §6.8 AI_NOT_CONFIGURED -> AI_UNAVAILABLE(reason not_configured); §3.1 error table; §1.2 bootstrap list; §3.9 search index description; §3.7 job names; §5.2 parent AI access ("never" vs modelled consent).
- CONTENT_AUTHORING vs ARCHITECTURE §3.10 directive vocabulary (renderer whitelist = CONTENT_AUTHORING).
