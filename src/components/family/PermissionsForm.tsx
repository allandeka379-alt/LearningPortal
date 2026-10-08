"use client";

import { useActionState } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import type { LinkPermissions } from "@/server/family/schemas";
import type { FamilyFormAction } from "./action-state";
import { PERMISSION_COPY } from "./labels";

export interface PermissionsFormProps {
  linkId: string;
  parentName: string;
  permissions: LinkPermissions;
  action: FamilyFormAction;
}

const KEYS = ["progress", "activity", "results"] as const;

/**
 * The student's switches for what ONE linked parent may see (§21). Switches submit their name only when on, so the
 * Server Action reads `formData.has("progress")` etc. The result is announced in a polite live region.
 */
export function PermissionsForm({ linkId, parentName, permissions, action }: PermissionsFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-1" aria-label={`What ${parentName} can see`}>
      <input type="hidden" name="linkId" value={linkId} />
      {KEYS.map((key) => (
        <Switch key={key} name={key} defaultChecked={permissions[key]} label={PERMISSION_COPY[key].label} description={PERMISSION_COPY[key].description} />
      ))}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" variant="secondary" loading={pending} loadingText="Saving…">
          Save what {parentName} can see
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
