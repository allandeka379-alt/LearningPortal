"use client";

import { MonitorSmartphone } from "lucide-react";
import { useActionState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

export interface SignOutOtherDevicesFormProps {
  /** Other active sessions (devices / browsers) besides this one. */
  otherSessions: number;
  action: FormAction;
}

/** "Sign out of other devices" (§39): revokes every other session of the account and keeps this one. */
export function SignOutOtherDevicesForm({ otherSessions, action }: SignOutOtherDevicesFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const done = state?.ok === true;
  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm text-muted">
        {done
          ? "This is now the only device signed in to your account."
          : otherSessions === 0
            ? "You're not signed in on any other device."
            : `You're signed in on ${otherSessions === 1 ? "1 other device" : `${otherSessions} other devices`}. If you used a shared or lost phone, sign out there.`}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="outline"
          loading={pending}
          loadingText="Signing out…"
          disabled={done || otherSessions === 0}
          iconStart={<MonitorSmartphone aria-hidden="true" />}
        >
          Sign out of other devices
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
