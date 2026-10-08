"use server";

import { requireUserForAction } from "@/server/auth/guards";
import { reportContentProblem, type ReportProblemInput } from "@/server/cms/flags/report";
import { safeAction, type ActionResult } from "@/server/lib/errors";

/**
 * "Report a problem" (§42) Server Action, shared by question feedback, answer review and lesson pages. Thin:
 * authenticate, hand the raw input to the flags service (Zod validation, `content.flag` permission, the
 * `rateLimits.contentFlag` limit, own-attempt revision lookup) and return an `ActionResult`.
 */

const report = safeAction(async (input: ReportProblemInput) => reportContentProblem(await requireUserForAction(), input), {
  operation: "content.report_problem",
});

export async function reportProblemAction(input: ReportProblemInput): Promise<ActionResult<{ received: true }>> {
  return report(input);
}
