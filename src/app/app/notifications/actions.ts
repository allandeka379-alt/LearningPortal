"use server";

import { revalidatePath } from "next/cache";
import type { FormActionState } from "@/components/student/action-state";
import { marketingInputFromForm, preferencesInputFromForm } from "@/components/notifications/preference-fields";
import { runStudentAction, studentRequestMeta } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { normalizeError } from "@/server/lib/errors";
import { markInboxRead } from "@/server/notifications/digest";
import { updateMarketingConsent, updateNotificationPreferences } from "@/server/notifications/preferences";

/**
 * Notification centre Server Actions (thin: guard, read the form, call `src/server/notifications`). The inbox forms
 * work without JavaScript; after a change the student area layout is revalidated so the header bell's count follows.
 */

/** "Mark as read" on one inbox item (`notificationId`). Someone else's id is a silent no-op (ownership is in the query). */
export async function markNotificationReadAction(formData: FormData): Promise<void> {
  const actor = await requireOnboardedStudentForAction();
  const id = formData.get("notificationId");
  if (typeof id !== "string") return;
  try {
    await markInboxRead(actor.userId, [id]);
  } catch (error) {
    // A malformed id is simply not marked; anything unexpected is logged by normalizeError.
    normalizeError(error, { operation: "notifications.markRead" });
    return;
  }
  revalidatePath("/app", "layout");
}

/** "Mark all as read". */
export async function markAllNotificationsReadAction(): Promise<void> {
  const actor = await requireOnboardedStudentForAction();
  await markInboxRead(actor.userId, "all");
  revalidatePath("/app", "layout");
}

/** Reminders, reminder time and channels per category (§6, §19, §21, §22). */
export async function updateNotificationPreferencesAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("notifications.preferences", async () => {
    const actor = await requireOnboardedStudentForAction();
    await updateNotificationPreferences(actor, preferencesInputFromForm(formData));
    return { message: "Notification settings saved." };
  });
}

/** Marketing consent per channel (separate from notifications; audited). */
export async function updateMarketingConsentAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("notifications.marketingConsent", async () => {
    const actor = await requireOnboardedStudentForAction();
    const result = await updateMarketingConsent(actor, marketingInputFromForm(formData), { request: await studentRequestMeta() });
    const on = [result.email && "email", result.sms && "SMS", result.whatsapp && "WhatsApp"].filter(Boolean);
    return { message: on.length === 0 ? "You won't get news or offers." : `Saved. News and offers by ${on.join(", ")}.` };
  });
}
