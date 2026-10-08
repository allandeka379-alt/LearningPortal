"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { requireRoleForAction } from "@/server/auth/guards";
import { auditRequestFrom } from "@/server/cms/users/service";
import { cancelDeadLetterJob, retryDeadLetterJob } from "@/server/ops/dead-letters";

/**
 * Dead-letter Server Actions (thin): ADMIN / SUPER_ADMIN only. The service checks the job is still DEAD or FAILED,
 * changes it and writes the `job.retry` / `job.cancel` audit entry in the same transaction.
 */

export async function retryJobAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.jobs.retry", formData, async () => {
    const actor = await requireRoleForAction("ADMIN", "SUPER_ADMIN");
    const result = await retryDeadLetterJob(actor, formText(formData, "jobId") ?? "", { request: auditRequestFrom(await adminRequestMeta()) });
    return { data: result, message: `${result.type} queued to run again with a fresh set of attempts.`, revalidate: ["/admin/jobs"] };
  });
}

export async function cancelJobAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.jobs.cancel", formData, async () => {
    const actor = await requireRoleForAction("ADMIN", "SUPER_ADMIN");
    const result = await cancelDeadLetterJob(actor, formText(formData, "jobId") ?? "", { request: auditRequestFrom(await adminRequestMeta()) });
    return { data: result, message: `${result.type} cancelled. It will not run again.`, revalidate: ["/admin/jobs"] };
  });
}
