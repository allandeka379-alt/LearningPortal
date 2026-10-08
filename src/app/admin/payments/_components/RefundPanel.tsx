"use client";

import { useId, useState } from "react";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import type { AdminFormAction } from "@/components/admin/form-state";
import { formatMoneyMinor } from "@/components/admin/format";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

/**
 * Refund form for one payment (§32). Refunds cannot be undone, so the inputs (how, how much, external reference) only
 * prepare the request: a confirmation dialog states the exact amount and consequences, asks for the reason and
 * handles the password confirmation (step-up). The server re-checks everything through the payment state machine.
 */

export type RefundSupportValue = "api" | "manual_only" | "provider_unavailable";

export interface RefundPanelProps {
  paymentId: string;
  currency: string;
  refundableMinor: number;
  support: RefundSupportValue;
  /**
   * Subscription / seat payments are flagged for review on a full refund; study packs and one-off plan purchases
   * ("Full access") lose their access grant.
   */
  purpose: "SUBSCRIPTION" | "STUDY_PACK" | "SEATS" | "PLAN_PURCHASE";
  action: AdminFormAction<unknown>;
}

const AMOUNT = /^(\d{1,8})(?:\.(\d{1,2}))?$/;

/** "12.5" → 1250; `null` when malformed. Blank is handled by the caller (= everything refundable). */
function toMinor(text: string): number | null {
  const match = AMOUNT.exec(text.trim().replace(/,/g, ""));
  if (!match) return null;
  return Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
}

export function RefundPanel({ paymentId, currency, refundableMinor, support, purpose, action }: RefundPanelProps) {
  const [method, setMethod] = useState<"PROVIDER" | "MANUAL">(support === "api" ? "PROVIDER" : "MANUAL");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const amountId = useId();

  const minor = amount.trim() === "" ? refundableMinor : toMinor(amount);
  const amountError =
    minor === null ? "Enter an amount like 12.50." : minor <= 0 ? "Enter more than 0." : minor > refundableMinor ? `At most ${formatMoneyMinor(refundableMinor, currency)} can be refunded.` : null;
  const full = minor === refundableMinor;
  const shown = minor === null ? "" : formatMoneyMinor(minor, currency);

  return (
    <div className="space-y-4">
      <Field label="How">
        <Select
          value={method}
          onChange={(event) => setMethod(event.target.value === "PROVIDER" ? "PROVIDER" : "MANUAL")}
          options={[
            ...(support === "api" ? [{ value: "PROVIDER", label: "Through the provider" }] : []),
            { value: "MANUAL", label: "Record a refund made outside this system" },
          ]}
        />
      </Field>
      <Field label={`Amount (${currency})`} id={amountId} optional hint="Leave empty to refund everything still refundable." error={amountError}>
        <Input inputMode="decimal" autoComplete="off" value={amount} placeholder={(refundableMinor / 100).toFixed(2)} maxLength={14} onChange={(event) => setAmount(event.target.value)} />
      </Field>
      {method === "MANUAL" && (
        <Field label="Refund reference" optional hint="Bank, mobile-money or dashboard reference.">
          <Input value={reference} maxLength={120} autoComplete="off" onChange={(event) => setReference(event.target.value)} />
        </Field>
      )}
      <ConfirmAction
        action={action}
        fields={{ paymentId, currency, method, amount: amount.trim(), ...(method === "MANUAL" && reference.trim() ? { externalReference: reference.trim() } : {}) }}
        triggerLabel="Refund…"
        triggerVariant="danger"
        triggerSize="md"
        disabled={amountError !== null}
        disabledReason={amountError ?? undefined}
        title={`Refund ${shown}?`}
        description={method === "PROVIDER" ? "The provider sends the money back to the payer." : "You confirm the payer has already been refunded outside this system."}
        confirmLabel={`Refund ${shown}`}
        pendingLabel="Refunding…"
        tone="danger"
        reason={{ label: "Reason", required: true, hint: "Recorded on the payment and in the audit log.", maxLength: 500 }}
      >
        <ul className="list-disc space-y-1 pl-5">
          <li>This cannot be undone.</li>
          <li>{full ? "The payment becomes Refunded." : "The payment stays Successful with a partial refund."}</li>
          {full && purpose === "STUDY_PACK" && <li>The study pack access bought with it ends now.</li>}
          {full && purpose === "PLAN_PURCHASE" && <li>The full access bought with it ends now (the student returns to the free preview).</li>}
          {full && (purpose === "SUBSCRIPTION" || purpose === "SEATS") && (
            <li>It is flagged for review: decide on the subscription page whether access should end.</li>
          )}
          <li>You may be asked to confirm your password.</li>
        </ul>
      </ConfirmAction>
    </div>
  );
}
