"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { enqueueAnalyticsBackfill } from "@/server/cms/users/dashboard";
import { auditRequestFrom } from "@/server/cms/users/service";

/** Enqueues `analytics.backfillMetrics` for the missing rollup days shown in the coverage notice (§35). */
export async function enqueueBackfillAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.analytics.backfill", formData, async () => {
    const actor = await requireAdminAction("analytics.platform");
    const result = await enqueueAnalyticsBackfill(
      actor,
      { from: formText(formData, "from"), to: formText(formData, "to") },
      auditRequestFrom(await adminRequestMeta()),
    );
    return {
      data: result,
      message: result.created
        ? `Computing ${result.from} to ${result.to}. Figures appear here once the worker finishes.`
        : "That range is already queued. Figures appear here once the worker finishes.",
      revalidate: ["/admin", "/admin/analytics"],
    };
  });
}
