"use client";

import { useActionState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { MARKETING_FIELDS, type ExternalChannelFieldKey } from "./preference-fields";

export interface MarketingConsentFormProps {
  consent: Record<ExternalChannelFieldKey, boolean>;
  /** False for students under 18: they can only switch existing consent off. */
  allowed: boolean;
  /**
   * Channels the platform offers right now (email, SMS and WhatsApp are each switched off by default). A channel that
   * is not offered is shown only while consent is still on, so it can be withdrawn. Default: all.
   */
  offered?: Record<ExternalChannelFieldKey, boolean>;
  action: FormAction;
}

const LABELS: Record<ExternalChannelFieldKey, string> = {
  email: "News and offers by email",
  sms: "News and offers by SMS",
  whatsapp: "News and offers on WhatsApp",
};

const ALL_OFFERED: Record<ExternalChannelFieldKey, boolean> = { email: true, sms: true, whatsapp: true };

/**
 * Marketing consent per channel, kept apart from notification settings: turning on announcement emails never signs
 * anyone up for offers. Off unless switched on; every change is recorded. Students under 18 are never asked.
 */
export function MarketingConsentForm({ consent, allowed, offered = ALL_OFFERED, action }: MarketingConsentFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const keys = (Object.keys(LABELS) as ExternalChannelFieldKey[]).filter((key) => offered[key] || consent[key]);
  const anyOn = keys.some((key) => consent[key]);
  if (!allowed && !anyOn) {
    return <p className="text-sm text-muted">News and offers are not sent to students under 18.</p>;
  }
  if (keys.length === 0) {
    return <p className="text-sm text-muted">We don&apos;t send news or offers by email or text message at the moment.</p>;
  }
  return (
    <form action={formAction} className="space-y-4">
      {!allowed && <p className="text-sm text-muted">News and offers are not sent to students under 18. You can switch off anything still on.</p>}
      <div>
        {keys.map((key) => (
          <Switch
            key={key}
            name={MARKETING_FIELDS[key]}
            defaultChecked={consent[key]}
            disabled={(!allowed || !offered[key]) && !consent[key]}
            label={LABELS[key]}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="outline" loading={pending} loadingText="Saving…">
          Save choices
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
