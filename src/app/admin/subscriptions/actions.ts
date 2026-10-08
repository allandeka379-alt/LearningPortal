"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction, requireAdminStepUpAction } from "@/components/admin/guards";
import { formatDate } from "@/components/admin/format";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import {
  cancelSubscriptionAsStaff,
  extendSubscription,
  resumeSubscriptionAsStaff,
  revokeStaffGrant,
} from "@/server/cms/commerce/subscriptions";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Subscription Server Actions (thin): `billing.manage` at scope "all" re-checked on every call; the services run the
 * billing state machine / grant rules and audit.
 */

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

function paths(subscriptionId: string | undefined): string[] {
  return subscriptionId ? ["/admin/subscriptions", `/admin/subscriptions/${subscriptionId}`] : ["/admin/subscriptions"];
}

export async function cancelSubscriptionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.subscriptions.cancel", formData, async () => {
    const actor = await requireAdminAction("billing.manage");
    const subscriptionId = formText(formData, "subscriptionId");
    const result = await cancelSubscriptionAsStaff(actor, {
      subscriptionId: subscriptionId ?? "",
      mode: (formText(formData, "mode") ?? "") as never,
      reason: formText(formData, "reason") ?? "",
    });
    const message = !result.changed
      ? "Nothing changed."
      : result.status === "CANCELLED"
        ? "Subscription cancelled. Access has ended."
        : result.status === "EXPIRED"
          ? "Subscription ended (its paid period was already over)."
          : `Renewal stopped. Access continues until ${formatDate(result.currentPeriodEnd)}.`;
    return { data: result, message, revalidate: paths(subscriptionId) };
  });
}

export async function resumeSubscriptionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.subscriptions.resume", formData, async () => {
    const actor = await requireAdminAction("billing.manage");
    const subscriptionId = formText(formData, "subscriptionId");
    const result = await resumeSubscriptionAsStaff(actor, { subscriptionId: subscriptionId ?? "", reason: formText(formData, "reason") });
    return { data: result, message: result.changed ? "Cancellation undone: the subscription will renew." : "Nothing changed.", revalidate: paths(subscriptionId) };
  });
}

export async function extendSubscriptionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.subscriptions.extend", formData, async () => {
    // Free access: step-up (ARCHITECTURE §5.1, PAY-8); the service also refuses self-grants.
    const actor = await requireAdminStepUpAction("billing.manage");
    const subscriptionId = formText(formData, "subscriptionId");
    const result = await extendSubscription(
      actor,
      {
        subscriptionId: subscriptionId ?? "",
        days: formText(formData, "days") ?? "",
        source: (formText(formData, "source") ?? "ADMIN") as never,
        reason: formText(formData, "reason") ?? "",
      },
      await auditRequest(),
    );
    return {
      data: result,
      message: `Extension granted: access from ${formatDate(result.startsAt)} to ${formatDate(result.endsAt)}.`,
      revalidate: paths(subscriptionId),
    };
  });
}

export async function revokeGrantAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.subscriptions.revokeGrant", formData, async () => {
    const actor = await requireAdminAction("billing.manage");
    const subscriptionId = formText(formData, "subscriptionId");
    const result = await revokeStaffGrant(actor, { grantId: formText(formData, "grantId") ?? "", reason: formText(formData, "reason") ?? "" }, await auditRequest());
    return { data: result, message: "Grant revoked.", revalidate: paths(subscriptionId) };
  });
}
