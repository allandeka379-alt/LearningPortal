"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import { updateLeaderboardPrivacy } from "@/server/accounts/student-settings";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { refreshLeaderboardsFor } from "@/server/leaderboards/service";

/**
 * Leaderboard opt-in from the leaderboard page (§20). Same service as Settings (opting out deletes the student's rows
 * at once, audited); after opting in, the student's current scores are computed straight away instead of waiting for
 * the hourly snapshot.
 */
export async function updateLeaderboardOptInAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("leaderboard.optIn", async () => {
    const actor = await requireOnboardedStudentForAction();
    const result = await updateLeaderboardPrivacy(actor, { optIn: formData.has("optIn"), display: formString(formData, "display") });
    if (result.optIn) await refreshLeaderboardsFor(actor.userId);
    return {
      message: result.optIn ? "You're on the leaderboards. Your scores appear within a few minutes." : "You're not on any leaderboard.",
      revalidateLayout: true,
    };
  });
}
