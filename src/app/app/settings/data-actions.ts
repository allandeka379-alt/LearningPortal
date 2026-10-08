"use server";

import type { FormActionState } from "@/components/student/action-state";
import { runStudentAction, studentRequestMeta } from "@/components/student/server-action";
import { cancelAccountDeletion, DELETION_GRACE_DAYS, requestAccountDeletion, requestDataExport } from "@/server/accounts/privacy";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";

/**
 * "Your data" actions (privacy notice "Your rights"): a copy of your data, and account deletion with a 14-day grace
 * period. Thin: guard, call ./privacy (which validates, audits and queues the work), refresh the settings page.
 */

/** Queues a JSON export of the account's data; the settings page shows the download link once it is ready. */
export async function requestDataExportAction(): Promise<FormActionState> {
  return runStudentAction("settings.dataExport", async () => {
    const actor = await requireOnboardedStudentForAction();
    await requestDataExport(actor, await studentRequestMeta());
    return { message: "We're preparing your data. The download appears here in a few minutes.", revalidateLayout: true };
  });
}

/** Schedules the account's deletion after the grace period (needs the confirmation box). */
export async function requestAccountDeletionAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("settings.deleteAccount", async () => {
    const actor = await requireOnboardedStudentForAction();
    await requestAccountDeletion(actor, { confirmed: formData.get("confirmed") === "on" }, await studentRequestMeta());
    return {
      message: `Your account will be deleted in ${DELETION_GRACE_DAYS} days. You can cancel until then.`,
      revalidateLayout: true,
    };
  });
}

/** Cancels a scheduled deletion. */
export async function cancelAccountDeletionAction(): Promise<FormActionState> {
  return runStudentAction("settings.cancelDeleteAccount", async () => {
    const actor = await requireOnboardedStudentForAction();
    await cancelAccountDeletion(actor, await studentRequestMeta());
    return { message: "Your account will not be deleted.", revalidateLayout: true };
  });
}
