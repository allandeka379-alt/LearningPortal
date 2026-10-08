/**
 * Display + diff helpers for the entitlements editor. Pure, dependency-free (safe in the client bundle): the field
 * descriptors come from the server (generated from `entitlementsSchema`), so nothing here knows the contract itself.
 */

export type EntitlementValue = boolean | number | string | null;

export interface EntitlementFieldView {
  key: string;
  label: string;
  description: string;
  group: string;
  kind: "boolean" | "limit" | "choice";
  min?: number;
  unit?: string | null;
  options?: readonly { value: string; label: string }[];
}

/** "On" / "Off", "Unlimited" / "None" / "40 per day", or the option label. */
export function displayEntitlementValue(field: EntitlementFieldView, value: EntitlementValue | undefined): string {
  switch (field.kind) {
    case "boolean":
      return value === true ? "On" : "Off";
    case "limit":
      if (value === null) return "Unlimited";
      if (typeof value !== "number") return "Not set";
      if (value === 0) return "None";
      return field.unit ? `${value} ${field.unit}` : String(value);
    case "choice":
      return field.options?.find((option) => option.value === value)?.label ?? String(value ?? "Not set");
  }
}

export interface EntitlementChange {
  key: string;
  label: string;
  group: string;
  before: string;
  after: string;
}

/** Changes between two documents, in field order. */
export function diffEntitlementValues(
  fields: readonly EntitlementFieldView[],
  before: Readonly<Record<string, EntitlementValue>>,
  after: Readonly<Record<string, EntitlementValue>>,
): EntitlementChange[] {
  const changes: EntitlementChange[] = [];
  for (const field of fields) {
    if (before[field.key] === after[field.key]) continue;
    changes.push({
      key: field.key,
      label: field.label,
      group: field.group,
      before: displayEntitlementValue(field, before[field.key]),
      after: displayEntitlementValue(field, after[field.key]),
    });
  }
  return changes;
}

/** Field groups in first-seen order. */
export function groupFields(fields: readonly EntitlementFieldView[]): { group: string; fields: EntitlementFieldView[] }[] {
  const groups: { group: string; fields: EntitlementFieldView[] }[] = [];
  for (const field of fields) {
    let entry = groups.find((candidate) => candidate.group === field.group);
    if (!entry) {
      entry = { group: field.group, fields: [] };
      groups.push(entry);
    }
    entry.fields.push(field);
  }
  return groups;
}
