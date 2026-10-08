"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { requireFeature } from "@/server/features";
import { daysBetween, eachLocalDate, isLocalDate } from "@/lib/dates";
import { enqueueAiModelUsageBackfill, MAX_BACKFILL_DAYS } from "@/server/cms/settings/ai-usage";
import { auditRequestFrom } from "@/server/cms/users/service";
import { AppError } from "@/server/lib/errors";

/** Queues the per-model AI usage rollup for missing past days (`ai.admin`, ADMIN and SUPER_ADMIN). */
export async function enqueueAiUsageBackfillAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.ai.usageBackfill", formData, async () => {
    await requireFeature("ai"); // 404 while AI is switched off (features.ai)
    const actor = await requireAdminAction("ai.admin", "restricted");
    const from = formText(formData, "from") ?? "";
    const to = formText(formData, "to") ?? "";
    if (!isLocalDate(from) || !isLocalDate(to) || from > to) throw AppError.validation({ _form: ["Choose a valid date range."] });
    const span = Math.min(daysBetween(from, to) + 1, MAX_BACKFILL_DAYS);
    const result = await enqueueAiModelUsageBackfill(actor, { dates: eachLocalDate(from, span) }, auditRequestFrom(await adminRequestMeta()));
    return {
      data: result,
      message: result.queued === 0 ? "Those days are already queued." : `Queued ${result.queued} ${result.queued === 1 ? "day" : "days"}. Refresh in a few minutes.`,
      revalidate: ["/admin/ai/usage"],
    };
  });
}
