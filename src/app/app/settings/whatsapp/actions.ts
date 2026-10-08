"use server";

import { revalidatePath } from "next/cache";
import { formString, studentRequestMeta } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { requireFeature } from "@/server/features";
import { fail, normalizeError } from "@/server/lib/errors";
import { confirmWhatsAppLink, requestWhatsAppLinkCode, setWhatsAppReminders, unlinkWhatsApp } from "@/server/whatsapp";
import type { WhatsAppFormState } from "./form-state";

/**
 * Settings → WhatsApp actions (§30). Thin: guard, read the form, call the WhatsApp channel service (which validates
 * with Zod, rate-limits the code sends and audits the link), refresh the page. Every action answers NOT_FOUND while
 * the channel is switched off (`features.whatsapp`).
 */

const PAGE = "/app/settings/whatsapp";

type Success = Extract<NonNullable<WhatsAppFormState>, { ok: true }>["data"];

async function run(operation: string, fn: () => Promise<Success>, refresh = false): Promise<WhatsAppFormState> {
  try {
    await requireFeature("whatsapp");
    const data = await fn();
    if (refresh) revalidatePath(PAGE);
    return { ok: true, data };
  } catch (error) {
    const normalized = normalizeError(error, { operation });
    return fail(normalized.code, normalized.message, normalized.fieldErrors);
  }
}

/** Step 1: send a 6-digit code to the number on WhatsApp. */
export async function requestWhatsAppCodeAction(_state: WhatsAppFormState, formData: FormData): Promise<WhatsAppFormState> {
  return run("whatsapp.requestCode", async () => {
    const actor = await requireOnboardedStudentForAction();
    const sent = await requestWhatsAppLinkCode(actor, { phone: formString(formData, "phone") ?? "" }, await studentRequestMeta());
    return {
      message: `We sent a 6-digit code to ${sent.phoneMasked} on WhatsApp. It expires in 10 minutes.`,
      step: "code",
      phone: sent.phone,
      phoneMasked: sent.phoneMasked,
    };
  });
}

/** Step 2: confirm the code; links the number (and turns reminders on when ticked). */
export async function confirmWhatsAppLinkAction(_state: WhatsAppFormState, formData: FormData): Promise<WhatsAppFormState> {
  return run(
    "whatsapp.confirmLink",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      const linked = await confirmWhatsAppLink(
        actor,
        { phone: formString(formData, "phone") ?? "", code: formString(formData, "code") ?? "", reminders: formData.get("reminders") === "on" },
        await studentRequestMeta(),
      );
      return { message: `${linked.phoneMasked} is now linked. Send HELP to see what you can do on WhatsApp.`, step: "linked" };
    },
    true,
  );
}

/** Unlinks the number: WhatsApp stops acting for the account straight away. */
export async function unlinkWhatsAppAction(_state: WhatsAppFormState, _formData: FormData): Promise<WhatsAppFormState> {
  void _formData;
  return run(
    "whatsapp.unlink",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      await unlinkWhatsApp(actor, await studentRequestMeta());
      return { message: "Your WhatsApp number is no longer linked.", step: "unlinked" };
    },
    true,
  );
}

/** Reminders on / off (proactive template messages; STOP / START on WhatsApp do the same). */
export async function updateWhatsAppRemindersAction(_state: WhatsAppFormState, formData: FormData): Promise<WhatsAppFormState> {
  return run(
    "whatsapp.reminders",
    async () => {
      const actor = await requireOnboardedStudentForAction();
      const on = formData.get("reminders") === "on";
      await setWhatsAppReminders(actor, on);
      return { message: on ? "Reminders on WhatsApp are on." : "Reminders on WhatsApp are off.", step: "reminders" };
    },
    true,
  );
}
