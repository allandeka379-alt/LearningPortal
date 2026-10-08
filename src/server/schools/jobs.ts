import "server-only";
import { z } from "zod";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { EXPIRE_REPORTS_JOB, expireSchoolReports, generateReportPayloadSchema, GENERATE_REPORT_JOB, runSchoolReport } from "./reports";

/**
 * School background jobs. Register with ONE line in `registerAllJobs()` (src/worker/handlers.ts):
 *   registerSchoolJobs(); // schools.generateReport (per request) + schools.expireReports (daily 03:30 CAT)
 */

const recurringPayload = z.looseObject({ periodStart: z.iso.datetime().optional() });

export function registerSchoolJobs(): void {
  registerJobHandler(GENERATE_REPORT_JOB, generateReportPayloadSchema, async (payload, ctx) => runSchoolReport(payload.reportId, ctx), {
    queue: "default",
    maxAttempts: 3,
  });
  registerJobHandler(EXPIRE_REPORTS_JOB, recurringPayload, async () => expireSchoolReports(), { queue: "default", maxAttempts: 3 });
  // Daily at 03:30 CAT (01:30 UTC), after maintenance.purge.
  registerRecurringJob(EXPIRE_REPORTS_JOB, 1440, EXPIRE_REPORTS_JOB, { offsetMinutes: 90 });
}

export { EXPIRE_REPORTS_JOB, GENERATE_REPORT_JOB };
