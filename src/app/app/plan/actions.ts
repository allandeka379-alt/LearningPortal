"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { AppError } from "@/server/lib/errors";
import { WEEKDAY_KEYS } from "@/server/studyplan/generator";
import { adaptPlan, createPlan, markItemDone, reopenItem, skipItem } from "@/server/studyplan/service";

/**
 * Study plan actions (§16). Thin: guard, read the form, call the study-plan service (which validates with Zod, checks
 * the entitlement and rate limit), refresh the student area (the dashboard shows today's plan too).
 */

/** `availability.mon` … `availability.sun` → minutes (empty = 0; anything else is validated by the service). */
function availabilityFrom(formData: FormData): Record<(typeof WEEKDAY_KEYS)[number], number> {
  return Object.fromEntries(
    WEEKDAY_KEYS.map((key) => {
      const raw = formString(formData, `availability.${key}`)?.trim() ?? "";
      return [key, raw === "" ? 0 : Number(raw)];
    }),
  ) as Record<(typeof WEEKDAY_KEYS)[number], number>;
}

/** Creates the plan, or rebuilds it with new settings (`mode=edit`). Empty exam date = no exam date. */
export async function createPlanAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("plan.create", async () => {
    const actor = await requireOnboardedStudentForAction();
    const examDate = formString(formData, "examDate")?.trim() ?? "";
    const subjectIds = formData.getAll("subjectId").filter((value): value is string => typeof value === "string");
    await createPlan(actor, { subjectIds, examDate: examDate === "" ? null : examDate, availability: availabilityFrom(formData) });
    return {
      message: formString(formData, "mode") === "edit" ? "Your plan was rebuilt with your new settings." : "Your study plan is ready.",
      revalidateLayout: true,
    };
  });
}

/** Re-plans the coming days from the latest results, keeping what is done. */
export async function adaptPlanAction(): Promise<FormActionState> {
  return runStudentAction("plan.adapt", async () => {
    const actor = await requireOnboardedStudentForAction();
    const result = await adaptPlan(actor);
    return {
      message: result.added > 0 || result.removed > 0 ? "Your plan was updated from your latest results." : "Your plan is already up to date.",
      revalidateLayout: true,
    };
  });
}

const TICK_MESSAGES = { DONE: "Marked as done.", SKIPPED: "Skipped.", PENDING: "Put back in your plan." } as const;

/** Done / Skip / Undo on one item (`itemId`, `status` = DONE | SKIPPED | PENDING). */
export async function updatePlanItemAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("plan.item", async () => {
    const actor = await requireOnboardedStudentForAction();
    const itemId = formString(formData, "itemId") ?? "";
    const status = formString(formData, "status");
    if (status === "DONE") await markItemDone(actor, itemId);
    else if (status === "SKIPPED") await skipItem(actor, itemId);
    else if (status === "PENDING") await reopenItem(actor, itemId);
    else throw AppError.validation({ status: ["Choose done, skip or undo."] });
    return { message: TICK_MESSAGES[status], revalidateLayout: true };
  });
}
