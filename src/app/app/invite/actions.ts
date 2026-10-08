"use server";

import type { FormActionState } from "@/components/student/action-state";
import { runStudentAction } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { getOrCreateReferralCode } from "@/server/referrals/service";

/** Creates the student's invite code (§46). Idempotent: a second submit returns the same code. */
export async function createInviteCodeAction(_state: FormActionState, _formData: FormData): Promise<FormActionState> {
  void _formData;
  return runStudentAction("invite.createCode", async () => {
    const actor = await requireOnboardedStudentForAction();
    const code = await getOrCreateReferralCode(actor);
    return { message: `Your invite code is ${code.displayCode}.`, revalidateLayout: true };
  });
}
