"use server";

import { redirect } from "next/navigation";
import type { FamilyFormState } from "@/components/family/action-state";
import { familyRequestMeta, formString, runFamilyAction } from "@/components/family/server-action";
import { cancelChildAccountDeletion, requestChildAccountDeletion, requestChildDataExport } from "@/server/accounts/guardian-privacy";
import { requireRoleForAction } from "@/server/auth/guards";
import { grantGuardianConsent, revokeLink, withdrawGuardianConsent } from "@/server/family";

/**
 * Child-page actions for a linked parent (§21, §5.12): stop following, guardian consent, and a minor's data rights
 * exercised by their guardian (a copy of the child's data, account deletion; PRIV-02). Audited by the services.
 */

const REVALIDATE = ["/parent", "/app/family"] as const;

/** Ends the link (the parent stops following the child), then back to the children list. */
export async function stopFollowingAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  const result = await runFamilyAction(
    "family.parent.revoke",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await revokeLink(actor, { linkId: formString(formData, "linkId"), reason: formString(formData, "reason") }, await familyRequestMeta());
      return { message: "You no longer follow this child." };
    },
    { revalidate: REVALIDATE },
  );
  if (result.ok) redirect("/parent?unlinked=1");
  return result;
}

export async function grantConsentAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.consentGrant",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await grantGuardianConsent(
        actor,
        { studentUserId: formString(formData, "studentUserId"), confirmed: formData.get("confirmed") === "on" },
        await familyRequestMeta(),
      );
      return { message: "Thank you. Your consent is recorded." };
    },
    { revalidate: REVALIDATE },
  );
}

export async function withdrawConsentAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.consentWithdraw",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await withdrawGuardianConsent(actor, { studentUserId: formString(formData, "studentUserId") }, await familyRequestMeta());
      return { message: "Your consent has been withdrawn." };
    },
    { revalidate: REVALIDATE },
  );
}

/** Queues a copy of the child's data (without AI conversations) for this guardian. */
export async function requestChildExportAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.childExport",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await requestChildDataExport(actor, formString(formData, "studentUserId"), await familyRequestMeta());
      return { message: "We're preparing the copy. We'll let you know when it's ready to download." };
    },
    { revalidate: REVALIDATE },
  );
}

/** Schedules the child's account deletion after the grace period (confirmed in the dialog). */
export async function requestChildDeletionAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.childDeletion",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      const { scheduledFor } = await requestChildAccountDeletion(
        actor,
        formString(formData, "studentUserId"),
        { confirmed: formData.get("confirmed") === "on" },
        await familyRequestMeta(),
      );
      return { message: `The account will be deleted on ${scheduledFor.toISOString().slice(0, 10)}. Your child has been told.` };
    },
    { revalidate: REVALIDATE },
  );
}

/** Cancels a deletion this guardian asked for. */
export async function cancelChildDeletionAction(_state: FamilyFormState, formData: FormData): Promise<FamilyFormState> {
  return runFamilyAction(
    "family.parent.childDeletionCancel",
    async () => {
      const actor = await requireRoleForAction("PARENT");
      await cancelChildAccountDeletion(actor, formString(formData, "studentUserId"), await familyRequestMeta());
      return { message: "The account will not be deleted. Your child has been told." };
    },
    { revalidate: REVALIDATE },
  );
}
