"use server";

import { redirect } from "next/navigation";
import type { CodeFormState, FamilyFormState } from "@/components/family/action-state";
import { familyRequestMeta, formPermissions, formString, runFamilyAction } from "@/components/family/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import {
  createStudentLinkCode,
  redeemParentCode,
  respondToLinkRequest,
  revokeLink,
  setAiConversationAccess,
  updateLinkPermissions,
} from "@/server/family";

/**
 * /app/family actions (§21, student side). Thin: guard, read the form, call `src/server/family` (which validates,
 * authorises against the link rows and audits), refresh the family page and the parent area.
 */

const REVALIDATE = ["/app/family", "/parent"] as const;

/** Flow (a): a new link code for a parent (shown once). */
export async function createLinkCodeAction(): Promise<CodeFormState> {
  return runFamilyAction(
    "family.student.createCode",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      const issued = await createStudentLinkCode(actor);
      return { message: "Your code is ready. Give it to your parent or guardian.", displayCode: issued.displayCode, expiresAt: issued.expiresAt.toISOString() };
    },
    { revalidate: ["/app/family"] },
  );
}

/** Cancels the student's unused code, or removes a linked parent (either ends the episode; audited). */
export async function revokeLinkAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.student.revoke",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      const result = await revokeLink(actor, { linkId: formString(formData, "linkId"), reason: formString(formData, "reason") }, await familyRequestMeta());
      return { message: result.previousStatus === "ACTIVE" ? "Removed. They can no longer see your progress." : "Cancelled." };
    },
    { revalidate: REVALIDATE },
  );
}

/** Flow (b): the student enters a code their parent created, choosing what to share. */
export async function enterParentCodeAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.student.enterCode",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await redeemParentCode(actor, { code: formString(formData, "code"), permissions: formPermissions(formData) }, await familyRequestMeta());
      return { message: "Linked. Your parent can now follow your progress." };
    },
    { revalidate: REVALIDATE },
  );
}

/** Flow (c): accept (with the chosen permissions) or decline a parent's request. */
export async function respondToRequestAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.student.respond",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      const result = await respondToLinkRequest(
        actor,
        { linkId: formString(formData, "linkId"), decision: formString(formData, "decision"), permissions: formPermissions(formData) },
        await familyRequestMeta(),
      );
      return { message: result.status === "ACTIVE" ? "Accepted. They can now follow your progress." : "Declined. They won't be told." };
    },
    { revalidate: REVALIDATE },
  );
}

/** What one linked parent may see. */
export async function updatePermissionsAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.student.permissions",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await updateLinkPermissions(actor, { linkId: formString(formData, "linkId"), permissions: formPermissions(formData) }, await familyRequestMeta());
      return { message: "Saved." };
    },
    { revalidate: REVALIDATE },
  );
}

/** Stops sharing AI conversations with one parent (always allowed, immediate). */
export async function stopAiSharingAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.student.aiStop",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await setAiConversationAccess(actor, { linkId: formString(formData, "linkId"), allow: false }, await familyRequestMeta());
      return { message: "Your AI conversations are private again." };
    },
    { revalidate: REVALIDATE },
  );
}

/** The explicit consent screen's submit: share AI conversations with one parent, then back to Family. */
export async function allowAiSharingAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  const result = await runFamilyAction(
    "family.student.aiAllow",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await setAiConversationAccess(
        actor,
        { linkId: formString(formData, "linkId"), allow: true, confirmed: formData.get("confirmed") === "on" },
        await familyRequestMeta(),
      );
      return { message: "Shared." };
    },
    { revalidate: REVALIDATE },
  );
  if (result.ok) redirect("/app/family?shared=ai");
  return result;
}
