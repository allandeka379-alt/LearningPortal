import type { ActionResult } from "@/server/lib/errors";

/**
 * State of the WhatsApp linking forms (`useActionState`): the usual `ActionResult` with a confirmation, plus the step
 * the two-step link flow is on. `phone` is the student's OWN number, echoed back to their browser for step two.
 */
export type WhatsAppFormState = ActionResult<{
  message: string;
  step?: "code" | "linked" | "unlinked" | "reminders";
  phone?: string;
  phoneMasked?: string;
}> | null;

export type WhatsAppFormAction = (state: WhatsAppFormState, formData: FormData) => Promise<WhatsAppFormState>;
