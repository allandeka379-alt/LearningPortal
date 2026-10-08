"use client";

import { UserPlus } from "lucide-react";
import { useActionState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

/** "Get my invite link" (§46): creates the student's referral code with a POST; the page then shows code and link. */
export function InviteCodeForm({ action }: { action: FormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <Button type="submit" iconStart={<UserPlus aria-hidden="true" />} loading={pending} loadingText="Creating…">
        Get my invite link
      </Button>
      <FormFeedback state={state} />
    </form>
  );
}
