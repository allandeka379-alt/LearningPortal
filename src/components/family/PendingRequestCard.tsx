"use client";

import { UserRoundPlus } from "lucide-react";
import { useActionState } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { FamilyFormAction } from "./action-state";
import { PermissionFields } from "./PermissionFields";

export interface PendingRequestCardProps {
  linkId: string;
  parentName: string;
  relationshipLabel: string;
  /** Masked contact of the requesting account, to help recognise them. */
  contactHint: string | null;
  /** Pre-formatted "Asked on 5 Oct 2026". */
  requestedLabel: string;
  action: FamilyFormAction;
}

/**
 * A parent's request to follow the student (§21 flow c). The student chooses what to share and accepts, or declines;
 * declining is silent (the parent is not told). The buttons share one form: the pressed button's `decision` value is
 * submitted.
 */
export function PendingRequestCard({ linkId, parentName, relationshipLabel, contactHint, requestedLabel, action }: PendingRequestCardProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4 rounded-card border border-border bg-surface p-4" aria-label={`Request from ${parentName}`}>
      <input type="hidden" name="linkId" value={linkId} />
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-5">
          <UserRoundPlus aria-hidden="true" />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="font-semibold text-text">
            {parentName} <Badge size="sm">{relationshipLabel}</Badge>
          </p>
          <p className="text-sm text-muted">
            {contactHint ? `${contactHint} · ` : ""}
            {requestedLabel}
          </p>
          <p className="text-sm text-text">wants to follow your progress. Only accept if you know this person.</p>
        </div>
      </div>
      <PermissionFields legend={`If you accept, ${parentName} can see`} />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" name="decision" value="accept" disabled={pending}>
          Accept
        </Button>
        <Button type="submit" name="decision" value="decline" variant="outline" disabled={pending}>
          Decline
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
