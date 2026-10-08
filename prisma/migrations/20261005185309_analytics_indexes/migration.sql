-- CreateIndex
CREATE INDEX "DailyMetric_metric_date_idx" ON "DailyMetric"("metric", "date");

-- ===== Raw SQL (Prisma ignores partial/expression indexes; no drift) =====
-- Plain CREATE INDEX: this migration runs in a transaction and the tables are small at this point. For indexes added
-- later on populated production tables use CREATE INDEX CONCURRENTLY in a separate, non-transactional migration.

-- Purpose: analytics.dailyMetrics refund rollup (rollups.ts filters Payment.refundedAt in [dayStart, dayEnd)); avoids a
-- nightly sequential scan of Payment.
CREATE INDEX IF NOT EXISTS "Payment_refunded_at_idx" ON "Payment" ("refundedAt") WHERE "refundedAt" IS NOT NULL;

-- Purpose: students.paid access-window overlap (rollups.ts subscription/seat CTEs:
-- COALESCE(endedAt, currentPeriodEnd, trialEndsAt) > dayStart AND startedAt < dayEnd).
CREATE INDEX IF NOT EXISTS "Subscription_access_end_idx" ON "Subscription" ((COALESCE("endedAt", "currentPeriodEnd", "trialEndsAt")))
  WHERE "startedAt" IS NOT NULL;

-- Purpose: demo-user exclusion in analytics (queries.ts fetchDemoUserIds: SELECT id FROM "User" WHERE "isDemo").
CREATE INDEX IF NOT EXISTS "User_demo_idx" ON "User" ("id") WHERE "isDemo";

-- Purpose: school/teacher analytics range filters on submittedAt per student (school.ts scores, latest results,
-- class outcomes); (userId, startedAt) alone has no lower bound on submittedAt.
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_userId_submittedAt_idx" ON "AssessmentAttempt" ("userId", "submittedAt")
  WHERE "submittedAt" IS NOT NULL;
