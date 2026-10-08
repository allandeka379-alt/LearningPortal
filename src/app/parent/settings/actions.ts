"use server";

import type { FamilyFormState } from "@/components/family/action-state";
import { formString, runFamilyAction } from "@/components/family/server-action";
import { requireRoleForAction } from "@/server/auth/guards";
import { setParentDigestPreference } from "@/server/family";

const MESSAGES = {
  OFF: "Summaries are off.",
  WEEKLY: "You'll get a summary every Sunday evening.",
  MONTHLY: "You'll get a summary at the start of each month.",
} as const;

/** Saves the weekly / monthly summary preference (§21). */
export async function saveDigestPreferenceAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.digest",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      const saved = await setParentDigestPreference(actor, formString(formData, "parentDigest"));
      return { message: MESSAGES[saved] };
    },
    { revalidate: ["/parent/settings"] },
  );
}
