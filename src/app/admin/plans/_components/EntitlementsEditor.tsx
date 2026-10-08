"use client";

import { useId, useMemo, useState } from "react";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import type { AdminFormAction } from "@/components/admin/form-state";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import {
  diffEntitlementValues,
  groupFields,
  type EntitlementChange,
  type EntitlementFieldView,
  type EntitlementValue,
} from "../_lib/entitlements-diff";

/**
 * Structured editor for a plan's entitlements (§31 features and limits, §40 AI quotas). The fields are generated
 * server-side from `entitlementsSchema`: switches for features, a whole number with an "Unlimited" toggle for limits
 * (`null` = unlimited, 0 = none) and selects for choices. Unsaved changes are summarised live; saving opens a
 * confirmation that shows the exact diff and how many live subscriptions it affects, then submits the complete
 * document (the server validates it again and audits the changed keys).
 */

export interface EntitlementsEditorProps {
  planId: string;
  /** Optimistic-concurrency token (plan `updatedAt`, ISO). */
  expectedUpdatedAt: string;
  fields: readonly EntitlementFieldView[];
  initial: Readonly<Record<string, EntitlementValue>>;
  action: AdminFormAction<unknown>;
  liveSubscriptions: number;
  /** Students holding this plan through a live one-off purchase (they follow the plan's entitlements too). */
  livePurchases?: number;
  disabled?: boolean;
}

const WHOLE_NUMBER = /^\d{1,9}$/;

export function EntitlementsEditor({ planId, expectedUpdatedAt, fields, initial, action, liveSubscriptions, livePurchases = 0, disabled }: EntitlementsEditorProps) {
  const [values, setValues] = useState<Record<string, EntitlementValue>>(() => ({ ...initial }));
  // Text being typed into limit inputs (kept separately so a half-typed value never becomes the stored one).
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const groups = useMemo(() => groupFields(fields), [fields]);
  const changes = useMemo(() => diffEntitlementValues(fields, initial, values), [fields, initial, values]);
  const invalidKeys = Object.entries(drafts)
    .filter(([, text]) => !WHOLE_NUMBER.test(text.trim()))
    .map(([key]) => key);

  function set(key: string, value: EntitlementValue): void {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function setLimitText(field: EntitlementFieldView, text: string): void {
    setDrafts((current) => ({ ...current, [field.key]: text }));
    const trimmed = text.trim();
    if (WHOLE_NUMBER.test(trimmed) && Number(trimmed) >= (field.min ?? 0)) set(field.key, Number(trimmed));
  }

  function setUnlimited(field: EntitlementFieldView, unlimited: boolean): void {
    setDrafts(({ [field.key]: _removed, ...rest }) => {
      void _removed;
      return rest;
    });
    const fallback = initial[field.key];
    set(field.key, unlimited ? null : typeof fallback === "number" ? fallback : 0);
  }

  function reset(): void {
    setValues({ ...initial });
    setDrafts({});
  }

  const summaryId = useId();
  const count = changes.length;
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <fieldset key={group.group} className="min-w-0 space-y-2" disabled={disabled}>
          <legend className="mb-1 text-sm font-semibold tracking-wide text-muted uppercase">{group.group}</legend>
          <div className="divide-y divide-border rounded-control border border-border px-3 sm:px-4">
            {group.fields.map((field) => (
              <FieldRow
                key={field.key}
                field={field}
                value={values[field.key]}
                draft={drafts[field.key]}
                changed={values[field.key] !== initial[field.key]}
                invalid={invalidKeys.includes(field.key)}
                onBoolean={(checked) => set(field.key, checked)}
                onChoice={(value) => set(field.key, value)}
                onLimitText={(text) => setLimitText(field, text)}
                onUnlimited={(unlimited) => setUnlimited(field, unlimited)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-col gap-3 rounded-control border border-border bg-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
        <p id={summaryId} aria-live="polite" className="text-sm text-text">
          {invalidKeys.length > 0
            ? "Fix the highlighted limits (whole numbers only) before saving."
            : count === 0
              ? "No unsaved changes."
              : `${count} unsaved ${count === 1 ? "change" : "changes"}.`}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={reset} disabled={disabled || (count === 0 && Object.keys(drafts).length === 0)}>
            Discard changes
          </Button>
          <ConfirmAction
            action={action}
            fields={{ planId, expectedUpdatedAt, entitlements: JSON.stringify(values) }}
            triggerLabel="Review and save"
            triggerVariant="primary"
            disabled={disabled || count === 0 || invalidKeys.length > 0}
            disabledReason={count === 0 ? "Change a value first." : "Fix the highlighted limits first."}
            title="Save these entitlement changes?"
            description="Review exactly what changes for everyone on this plan."
            confirmLabel="Save changes"
            pendingLabel="Saving…"
            successMessage="Entitlements saved."
          >
            <ChangeList changes={changes} />
            <p className="mt-3 text-muted">
              {liveSubscriptions === 0
                ? "No live subscriptions use this plan right now."
                : `${liveSubscriptions} live ${liveSubscriptions === 1 ? "subscription uses" : "subscriptions use"} this plan; the change applies to them within a minute.`}
              {livePurchases > 0 &&
                ` ${livePurchases} ${livePurchases === 1 ? "student has" : "students have"} bought this plan with a one-off payment; the change applies to them too.`}
            </p>
          </ConfirmAction>
        </div>
      </div>
    </div>
  );
}

function ChangeList({ changes }: { changes: readonly EntitlementChange[] }) {
  if (changes.length === 0) return <p>No changes.</p>;
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Changes to save</caption>
      <thead>
        <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
          <th scope="col" className="py-2 pr-2 font-semibold">
            Setting
          </th>
          <th scope="col" className="py-2 pr-2 font-semibold">
            Now
          </th>
          <th scope="col" className="py-2 font-semibold">
            After saving
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {changes.map((change) => (
          <tr key={change.key}>
            <th scope="row" className="py-2 pr-2 font-medium">
              {change.label}
              <span className="block text-xs font-normal text-muted">{change.group}</span>
            </th>
            <td className="py-2 pr-2 text-muted">{change.before}</td>
            <td className="py-2 font-semibold">{change.after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FieldRow({
  field,
  value,
  draft,
  changed,
  invalid,
  onBoolean,
  onChoice,
  onLimitText,
  onUnlimited,
}: {
  field: EntitlementFieldView;
  value: EntitlementValue | undefined;
  draft: string | undefined;
  changed: boolean;
  invalid: boolean;
  onBoolean: (checked: boolean) => void;
  onChoice: (value: string) => void;
  onLimitText: (text: string) => void;
  onUnlimited: (unlimited: boolean) => void;
}) {
  const id = useId();
  const changedMark = changed ? (
    <span className="ml-2 rounded-full bg-accent-soft px-2 py-px text-xs font-semibold text-on-accent-soft">Changed</span>
  ) : null;

  if (field.kind === "boolean") {
    return (
      <Switch
        label={
          <>
            {field.label}
            {changedMark}
          </>
        }
        description={field.description}
        checked={value === true}
        onCheckedChange={onBoolean}
        className="py-3"
      />
    );
  }

  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-text">
          {field.label}
          {field.kind === "limit" && field.unit ? <span className="font-normal text-muted"> ({field.unit})</span> : null}
          {changedMark}
        </label>
        <p id={descriptionId} className="mt-0.5 text-sm text-muted">
          {field.description}
        </p>
      </div>
      {field.kind === "choice" ? (
        <Select
          id={id}
          aria-describedby={descriptionId}
          className="md:w-64"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChoice(event.target.value)}
          options={field.options ?? []}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-x-4">
          <Input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-describedby={invalid ? `${descriptionId} ${errorId}` : descriptionId}
            invalid={invalid}
            disabled={value === null}
            className="w-28"
            value={draft ?? (value === null || value === undefined ? "" : String(value))}
            onChange={(event) => onLimitText(event.target.value)}
          />
          <Checkbox label="Unlimited" checked={value === null} onChange={(event) => onUnlimited(event.target.checked)} />
          {invalid && (
            <p id={errorId} className="w-full text-sm text-danger-text" role="alert">
              Enter a whole number (0 means none).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
