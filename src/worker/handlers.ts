import "server-only";
import { z } from "zod";
import { registerAccountsJobs } from "@/server/accounts/jobs";
import { registerAiBudgetAlertJobs } from "@/server/ai/budget-alert";
import { registerAiMarkingJobs } from "@/server/attempts/ai-marking";
import { registerAttemptJobs } from "@/server/attempts/jobs";
import { registerAuthJobs } from "@/server/auth/jobs";
import { registerPaymentJobs } from "@/server/billing/reconcile";
import { registerSubscriptionJobs } from "@/server/billing/subscriptions";
import { registerAiDraftJobs } from "@/server/cms/ai-drafts/jobs";
import { registerAnnouncementJobs } from "@/server/cms/announcements/fanout";
import { registerDailyQuestionJobs } from "@/server/cms/daily-questions/jobs";
import { registerImportRetentionJobs } from "@/server/cms/imports/retention";
import { registerImportJobs } from "@/server/cms/imports/service";
import { registerMediaJobs } from "@/server/cms/media/jobs";
import { registerAiUsageJobs } from "@/server/cms/settings/ai-usage-rollup";
import { registerFamilyJobs } from "@/server/family/jobs";
import { registerLeaderboardJobs } from "@/server/leaderboards/jobs";
import { purgeFinishedJobs, registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { purgeExpiredRateLimitBuckets } from "@/server/lib/rate-limit";
import { getKnownSetting } from "@/server/lib/settings";
import { registerSmsBudgetJobs } from "@/server/messaging/sms-budget";
import { registerNotificationJobs } from "@/server/notifications/digest";
import { purgeOldNotifications } from "@/server/notifications/service";
import { registerReferralJobs } from "@/server/referrals/jobs";
import { registerSchoolJobs } from "@/server/schools/jobs";
import { registerSharingJobs } from "@/server/sharing/jobs";
import { registerStudyPlanJobs } from "@/server/studyplan/service";
import { registerTeachingJobs } from "@/server/teaching/assignments";
import { registerWhatsAppJobs } from "@/server/whatsapp";
import { registerAiMaintenanceJobs, registerAnalyticsJobs, registerSearchJobs } from "./domain-jobs";

/**
 * Every job handler and recurring schedule the worker runs, registered in one place.
 *
 * PATTERN for domain modules (progress, gamification, notifications, search, billing, ai, imports, …):
 *
 *   // src/server/<domain>/jobs.ts
 *   import "server-only";
 *   export function register<Domain>Jobs(): void {
 *     registerJobHandler("<domain>.<action>", payloadSchema, handler, { queue: "<queue>" });
 *     registerRecurringJob("<domain>.<action>", everyMinutes, "<domain>.<action>", { offsetMinutes });
 *   }
 *
 * then add ONE line to {@link registerAllJobs} below. Rules: handlers are idempotent (a job may run twice), payloads
 * carry ids only, enqueue from services with `enqueue(type, payload, { client: tx, dedupeKey })` in the same
 * transaction as the domain write. Times: Africa/Harare is UTC+2, so "daily at 02:00 CAT" is
 * `registerRecurringJob(name, 1440, type, { offsetMinutes: 0 })` (00:00 UTC).
 */

/** Payload of scheduler-enqueued jobs: the period they cover (ISO string), plus any static payload. */
export const recurringPayloadSchema = z.looseObject({ periodStart: z.iso.datetime().optional() });

/** Infrastructure jobs owned by src/server/lib and src/server/notifications. */
export function registerInfraJobs(): void {
  registerJobHandler(
    "maintenance.purgeRateLimitBuckets",
    recurringPayloadSchema,
    async () => ({ deleted: await purgeExpiredRateLimitBuckets() }),
    { queue: "default", maxAttempts: 3 },
  );
  registerJobHandler(
    "maintenance.purgeJobs",
    recurringPayloadSchema,
    async () => ({ deleted: await purgeFinishedJobs() }),
    { queue: "default", maxAttempts: 3 },
  );
  registerJobHandler(
    "maintenance.purgeNotifications",
    recurringPayloadSchema,
    async () => {
      const { days } = await getKnownSetting("notifications.retention");
      return { deleted: await purgeOldNotifications(days), retentionDays: days };
    },
    { queue: "default", maxAttempts: 3 },
  );

  registerRecurringJob("maintenance.purgeRateLimitBuckets", 60, "maintenance.purgeRateLimitBuckets", { offsetMinutes: 7 });
  // Daily at 03:00 / 03:15 CAT (01:00 / 01:15 UTC), after the nightly rollups.
  registerRecurringJob("maintenance.purgeJobs", 1440, "maintenance.purgeJobs", { offsetMinutes: 60 });
  registerRecurringJob("maintenance.purgeNotifications", 1440, "maintenance.purgeNotifications", { offsetMinutes: 75 });
}

let registered = false;

/** Registers every handler and schedule (idempotent). Called once by the worker entry point. */
export function registerAllJobs(): void {
  if (registered) return;
  registered = true;
  registerInfraJobs();
  registerAuthJobs(); // auth.purgeSessions + auth.purgeVerificationCodes (daily)
  registerSubscriptionJobs(); // billing.lifecycle (hourly, payments queue)
  registerPaymentJobs(); // payments.reconcile (payments queue)
  registerAttemptJobs(); // exams.autoSubmit (per attempt at deadline + grace) + 5-minute sweep
  registerAnalyticsJobs(); // analytics.dailyMetrics (nightly 01:00 CAT) + analytics.backfillMetrics
  registerSearchJobs(); // search.reindexEntity + search.reindexAll (on demand + weekly safety net, Sun 03:00 CAT)
  registerAiMaintenanceJobs(); // ai.cache.purge (daily)
  registerStudyPlanJobs(); // studyplan.adapt (per student after diagnostics / mocks) + nightly sweep 02:30 CAT
  registerAnnouncementJobs(); // announcements.fanout (notifications queue)
  registerMediaJobs(); // media.purgeDeleted (daily 03:00 CAT): stored objects of soft-deleted library files
  registerImportJobs(); // imports.run (imports queue, 3 attempts)
  registerAiDraftJobs(); // ai.generate (ai queue, 3 attempts): CMS AI drafts
  registerAiUsageJobs(); // ai.modelUsageRollup (daily, rollups queue)
  registerAiMarkingJobs(); // ai.mark (ai queue, 5 attempts): AI-marks PENDING answers, self-assess when AI is off
  registerNotificationJobs(); // notifications.send, dailyReminders (15 min), weeklySummary (Sun 17:00 CAT), announcementDelivery + announcementSweep (10 min)
  registerFamilyJobs(); // family.parentDigest (weekly, Sun 18:00 CAT) + family.expireLinkInvites (hourly)
  registerTeachingJobs(); // teaching.assignmentPublished + teaching.closeDueAssignments (15 min)
  registerSchoolJobs(); // schools.generateReport (per request) + schools.expireReports (daily 03:30 CAT)
  registerLeaderboardJobs(); // leaderboards.snapshot (hourly at :20) + leaderboards.weeklyClose (Mon 04:00 CAT)
  registerReferralJobs(); // referrals.qualify (per referred user) + referrals.sweep (every 6 h)
  registerSharingJobs(); // sharing.purgeExpired (daily 03:30 CAT)
  registerWhatsAppJobs(); // whatsapp.process + whatsapp.send (notifications queue), whatsapp.purge (daily 03:45 CAT)
  registerAccountsJobs(); // accounts.exportData (per request), accounts.privacySweep (hourly: deletions after the grace period), accounts.retentionPurge (daily 04:10 CAT: solver photos 30 d, AI text 12 months)
  registerDailyQuestionJobs(); // dailyQuestion.fill (nightly 22:30 CAT): tomorrow's daily question per active subject (+ today's if missing)
  registerAiBudgetAlertJobs(); // ai.budgetAlert (notifications queue): once-a-day SUPER_ADMIN alert when the AI daily budget refuses calls
  registerImportRetentionJobs(); // imports.purgeFiles (daily 04:25 CAT): uploaded import files deleted after 90 days
  registerSmsBudgetJobs(); // messaging.smsBudgetAlert (notifications queue): once-a-day SUPER_ADMIN alert when the platform SMS budget is used up
  // Domain modules: add one line each (see the pattern above).
}
