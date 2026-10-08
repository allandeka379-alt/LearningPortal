"use server";

import { redirect } from "next/navigation";
import type { CodeFormState, FamilyFormState } from "@/components/family/action-state";
import { familyRequestMeta, formString, formValue, runFamilyAction } from "@/components/family/server-action";
import { requireRoleForAction } from "@/server/auth/guards";
import { createParentLinkCode, redeemStudentCode, requestLinkByContact, revokeLink } from "@/server/family";

/**
 * /parent/link actions (§21, parent side). Thin: guard (PARENT), read the form, call `src/server/family` (validation,
 * rate limits, link-row authorization, audit), refresh the parent area.
 */

const REVALIDATE = ["/parent", "/app/family"] as const;

/** Flow (a): redeem the child's code → linked at once → the child's page. */
export async function redeemChildCodeAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  let studentUserId: string | null = null;
  const result = await runFamilyAction(
    "family.parent.redeem",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      const linked = await redeemStudentCode(
        actor,
        { code: formString(formData, "code"), relationship: formValue(formData, "relationship") },
        await familyRequestMeta(),
      );
      studentUserId = linked.studentUserId;
      return { message: "Linked." };
    },
    { revalidate: REVALIDATE },
  );
  if (result.ok && studentUserId) redirect(`/parent/children/${studentUserId}?linked=1`);
  return result;
}

/** Flow (c): ask by the child's email / phone / username. Same answer whether or not an account matched. */
export async function requestLinkAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction("family.parent.request", async () => {
    const actor = await requireRoleForAction("PARENT");
    return requestLinkByContact(actor, { identifier: formString(formData, "identifier"), relationship: formValue(formData, "relationship") });
  });
}

/** Flow (b): a code for the child to enter (shown once). */
export async function createParentCodeAction(_state: CodeFormState, formData: FormData): Promise<CodeFormState> {
  return runFamilyAction(
    "family.parent.createCode",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      const issued = await createParentLinkCode(actor, { relationship: formValue(formData, "relationship") });
      return { message: "Your code is ready. Give it to your child.", displayCode: issued.displayCode, expiresAt: issued.expiresAt.toISOString() };
    },
    { revalidate: ["/parent/link"] },
  );
}

/** Cancels the parent's unused code. */
export async function cancelParentCodeAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.cancelCode",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await revokeLink(actor, { linkId: formString(formData, "linkId") }, await familyRequestMeta());
      return { message: "Code cancelled." };
    },
    { revalidate: ["/parent/link"] },
  );
}
