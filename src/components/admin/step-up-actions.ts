"use server";

import { reauthenticateWithPassword } from "@/server/auth/flows";
import { requireUserForAction } from "@/server/auth/guards";
import type { AdminActionState } from "./form-state";
import { adminRequestMeta, runAdminAction } from "./server-action";

/**
 * Step-up (ARCHITECTURE §5.1): confirms the signed-in staff member's password so sensitive actions (role grants,
 * refunds, settings, kill switches) are allowed for the next 15 minutes. Used by the shared `StepUpForm`.
 */
export async function confirmPasswordAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.stepUp", null, async () => {
    const actor = await requireUserForAction();
    const password = formData.get("password");
    await reauthenticateWithPassword(actor, { password: typeof password === "string" ? password : "" }, await adminRequestMeta());
    return { data: null, message: "Password confirmed. You can continue for the next 15 minutes." };
  });
}
