"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { updateWeeklyGoal } from "@/server/leaderboards/achievements";

/** Weekly targets (§19 weekly goals): study minutes and an optional XP target. Blank fields clear a target. */
export async function updateWeeklyGoalAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("achievements.weeklyGoal", async () => {
    const actor = await requireOnboardedStudentForAction();
    await updateWeeklyGoal(actor, {
      weeklyGoalMinutes: formString(formData, "weeklyGoalMinutes") ?? "",
      weeklyGoalXp: formString(formData, "weeklyGoalXp") ?? "",
    });
    return { message: "Weekly goal saved.", revalidateLayout: true };
  });
}
