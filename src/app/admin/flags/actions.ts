"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { rejectFlag, resolveFlag, triageFlag } from "@/server/cms/flags/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Content-flag triage Server Actions (§42, thin): `content.draft` (scope all) re-checked on every call; the flags
 * service validates the transition and audits it.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function paths(flagId: string | undefined): string[] {
  return ["/admin/flags", `/admin/flags/${flagId ?? ""}`, "/admin"];
}

export async function triageFlagAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.flags.triage", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const flagId = formText(formData, "flagId");
    const result = await triageFlag(actor, { flagId }, await context());
    return { data: result, message: "Assigned to you and marked in progress.", revalidate: paths(flagId) };
  });
}

export async function resolveFlagAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.flags.resolve", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const flagId = formText(formData, "flagId");
    const result = await resolveFlag(actor, { flagId, resolution: formText(formData, "resolution") ?? "" }, await context());
    return {
      data: result,
      message: result.resolutionRevision ? `Resolved (fixed in revision ${result.resolutionRevision}).` : "Resolved.",
      revalidate: paths(flagId),
    };
  });
}

export async function rejectFlagAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.flags.reject", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const flagId = formText(formData, "flagId");
    const result = await rejectFlag(actor, { flagId, resolution: formText(formData, "resolution") ?? "" }, await context());
    return { data: result, message: "Report rejected.", revalidate: paths(flagId) };
  });
}
