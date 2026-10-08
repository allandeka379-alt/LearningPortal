import { Checkbox } from "@/components/ui/Checkbox";
import type { LinkPermissions } from "@/server/family/schemas";
import { ALWAYS_SHARED_COPY, PERMISSION_COPY } from "./labels";

export interface PermissionFieldsProps {
  /** Initial ticks (defaults: all on). */
  defaults?: LinkPermissions;
  legend?: string;
}

const KEYS = ["progress", "activity", "results"] as const;

/**
 * The three things a student may share with a parent (§21), as checkboxes named `progress` / `activity` / `results`
 * (present in the form when ticked). Server-compatible; used when accepting a request or entering a parent's code.
 */
export function PermissionFields({ defaults = { progress: true, activity: true, results: true }, legend = "What they can see" }: PermissionFieldsProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium text-text">{legend}</legend>
      <p className="mt-0.5 text-sm text-muted">{ALWAYS_SHARED_COPY} You can change these at any time.</p>
      <div className="mt-1">
        {KEYS.map((key) => (
          <Checkbox key={key} name={key} defaultChecked={defaults[key]} label={PERMISSION_COPY[key].label} description={PERMISSION_COPY[key].description} />
        ))}
      </div>
    </fieldset>
  );
}
