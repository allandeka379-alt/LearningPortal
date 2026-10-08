"use client";

import { BellOff, BellRing, MessageCircle, Unlink } from "lucide-react";
import { useActionState, useState } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import type { WhatsAppFormAction, WhatsAppFormState } from "./form-state";

function fieldError(state: WhatsAppFormState, field: string): string[] | undefined {
  return state !== null && !state.ok ? state.error.fieldErrors?.[field] : undefined;
}

export interface LinkWhatsAppFormProps {
  requestCode: WhatsAppFormAction;
  confirmLink: WhatsAppFormAction;
}

/**
 * Two-step linking (§30): the student enters their WhatsApp number, receives a 6-digit code ON WhatsApp and types it
 * here. Reminders are opt-in (unticked by default, WhatsApp policy). Errors and confirmations are announced politely.
 */
export function LinkWhatsAppForm({ requestCode, confirmLink }: LinkWhatsAppFormProps) {
  const [requestState, requestAction, requesting] = useActionState(requestCode, null);
  const [resendState, resendAction, resending] = useActionState(requestCode, null);
  const [confirmState, confirmAction, confirming] = useActionState(confirmLink, null);
  // "Use a different number" dismisses the current code step; a new request produces a new state object.
  const [dismissed, setDismissed] = useState<WhatsAppFormState>(null);
  // Controlled, so a failed attempt keeps what the student typed (React resets uncontrolled fields after an action).
  const [phone, setPhone] = useState("");
  const sent = requestState?.ok === true && requestState.data.step === "code" && requestState !== dismissed ? requestState.data : null;

  if (!sent) {
    const error = requestState !== null && !requestState.ok ? requestState : null;
    return (
      <form action={requestAction} className="space-y-4">
        <Field label="Your WhatsApp number" hint="For example 077 123 4567 or +263 77 123 4567." error={fieldError(requestState, "phone")} required>
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={32} value={phone} onChange={(event) => setPhone(event.target.value)} />
        </Field>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={requesting} loadingText="Sending…" iconStart={<MessageCircle aria-hidden="true" />}>
            Send me a code on WhatsApp
          </Button>
          <FormFeedback state={error} />
        </div>
      </form>
    );
  }

  const resent = resendState?.ok === true ? resendState.data.message : null;
  return (
    <div className="space-y-4">
      <p className="text-sm text-text" role="status" aria-live="polite">
        {resent ?? sent.message}
      </p>
      <form action={confirmAction} className="space-y-4">
        <input type="hidden" name="phone" value={sent.phone ?? ""} />
        <Field label="6-digit code" error={fieldError(confirmState, "code")} required>
          <Input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} className="max-w-40 tracking-widest" />
        </Field>
        <Checkbox
          name="reminders"
          label="Send me study reminders on WhatsApp"
          description="Daily question and streak reminders. Send STOP on WhatsApp or turn them off here at any time."
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={confirming} loadingText="Linking…">
            Link my number
          </Button>
          <Button type="button" variant="ghost" onClick={() => setDismissed(requestState)}>
            Use a different number
          </Button>
          <FormFeedback state={confirmState} />
        </div>
      </form>
      <form action={resendAction} className="flex flex-wrap items-center gap-3">
        <input type="hidden" name="phone" value={sent.phone ?? ""} />
        <Button type="submit" variant="outline" size="sm" loading={resending} loadingText="Sending…">
          Send a new code
        </Button>
        <FormFeedback state={resendState !== null && !resendState.ok ? resendState : null} />
      </form>
    </div>
  );
}

/** Reminders on / off for a linked number. */
export function WhatsAppRemindersForm({ remindersOn, action }: { remindersOn: boolean; action: WhatsAppFormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      {!remindersOn && <input type="hidden" name="reminders" value="on" />}
      <Button
        type="submit"
        variant="outline"
        loading={pending}
        loadingText="Saving…"
        iconStart={remindersOn ? <BellOff aria-hidden="true" /> : <BellRing aria-hidden="true" />}
      >
        {remindersOn ? "Turn reminders off" : "Turn reminders on"}
      </Button>
      <FormFeedback state={state} />
    </form>
  );
}

/** Unlink with a confirmation step (no accidental taps). */
export function UnlinkWhatsAppForm({ action }: { action: WhatsAppFormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="ghost" iconStart={<Unlink aria-hidden="true" />} onClick={() => setConfirming(true)}>
          Unlink this number
        </Button>
        <FormFeedback state={state} />
      </div>
    );
  }
  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm text-text">WhatsApp will stop working with your account until you link a number again.</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="danger" loading={pending} loadingText="Unlinking…">
          Unlink
        </Button>
        <Button type="button" variant="ghost" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
