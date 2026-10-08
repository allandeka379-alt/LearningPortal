"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { useActionFormState } from "@/components/admin/ActionForm";
import { fieldErrorsFor } from "@/components/admin/form-state";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

/**
 * Grade band list editor inside an `ActionForm` (§12 grade ESTIMATES): best grade first, each band with its label,
 * minimum percentage and pass flag. Rows are posted as `bands.N.label` / `bands.N.minPercent` / `bands.N.isPass`, so
 * the service's per-row errors appear next to the row. Add, remove and reorder with buttons (touch and keyboard).
 */

export interface BandRow {
  label: string;
  minPercent: string;
  isPass: boolean;
  description: string;
}

interface KeyedRow extends BandRow {
  key: number;
}

export function GradeBandsEditor({ initial, frozen }: { initial: readonly BandRow[]; frozen: boolean }) {
  const { state } = useActionFormState();
  const baseId = useId();
  const [nextKey, setNextKey] = useState(initial.length);
  const [rows, setRows] = useState<KeyedRow[]>(() => initial.map((row, index) => ({ ...row, key: index })));
  const listErrors = fieldErrorsFor(state, "bands");

  function update(index: number, patch: Partial<BandRow>) {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }
  function move(index: number, delta: -1 | 1) {
    setRows((current) => {
      const target = index + delta;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target] as KeyedRow, next[index] as KeyedRow];
      return next;
    });
  }

  return (
    <fieldset className="min-w-0 space-y-3 md:col-span-2" aria-describedby={listErrors ? `${baseId}-errors` : `${baseId}-hint`}>
      <legend className="text-sm font-medium text-text">Grade bands (best grade first)</legend>
      <p id={`${baseId}-hint`} className="text-sm text-muted">
        A score gets the first band whose minimum it reaches. The lowest band must start at 0%.
        {frozen ? " These bands have graded students' attempts: saving different bands creates a new version of the scheme." : ""}
      </p>
      {listErrors && (
        <ul id={`${baseId}-errors`} role="alert" className="text-sm text-danger-text">
          {listErrors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <ol className="space-y-2">
        {rows.map((row, index) => {
          const labelErrors = fieldErrorsFor(state, `bands.${index}.label`);
          const percentErrors = fieldErrorsFor(state, `bands.${index}.minPercent`);
          const rowId = `${baseId}-${row.key}`;
          return (
            <li key={row.key} className="rounded-card border border-border p-3">
              <div className="grid gap-3 sm:grid-cols-[6rem_8rem_auto_1fr_auto] sm:items-end">
                <div className="space-y-1">
                  <label htmlFor={`${rowId}-label`} className="block text-sm font-medium text-text">
                    Grade
                  </label>
                  <input
                    id={`${rowId}-label`}
                    name={`bands.${index}.label`}
                    value={row.label}
                    onChange={(event) => update(index, { label: event.target.value })}
                    maxLength={8}
                    aria-invalid={labelErrors ? true : undefined}
                    aria-describedby={labelErrors ? `${rowId}-label-error` : undefined}
                    className={cn("min-h-11 w-full rounded-control border bg-surface px-3 font-mono text-text", labelErrors ? "border-danger" : "border-border-strong")}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`${rowId}-min`} className="block text-sm font-medium text-text">
                    From (%)
                  </label>
                  <input
                    id={`${rowId}-min`}
                    name={`bands.${index}.minPercent`}
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    inputMode="decimal"
                    value={row.minPercent}
                    onChange={(event) => update(index, { minPercent: event.target.value })}
                    aria-invalid={percentErrors ? true : undefined}
                    aria-describedby={percentErrors ? `${rowId}-min-error` : undefined}
                    className={cn("min-h-11 w-full rounded-control border bg-surface px-3 text-text tabular-nums", percentErrors ? "border-danger" : "border-border-strong")}
                  />
                </div>
                <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" name={`bands.${index}.isPass`} checked={row.isPass} onChange={(event) => update(index, { isPass: event.target.checked })} className="size-5 accent-primary" />
                  Pass
                </label>
                <div className="space-y-1">
                  <label htmlFor={`${rowId}-description`} className="block text-sm font-medium text-text">
                    Note <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id={`${rowId}-description`}
                    name={`bands.${index}.description`}
                    value={row.description}
                    onChange={(event) => update(index, { description: event.target.value })}
                    maxLength={200}
                    className="min-h-11 w-full rounded-control border border-border-strong bg-surface px-3 text-text"
                  />
                </div>
                <div className="flex gap-1">
                  <IconButton aria-label={`Move grade ${row.label || index + 1} up`} icon={<ArrowUp aria-hidden="true" />} disabled={index === 0} onClick={() => move(index, -1)} />
                  <IconButton aria-label={`Move grade ${row.label || index + 1} down`} icon={<ArrowDown aria-hidden="true" />} disabled={index === rows.length - 1} onClick={() => move(index, 1)} />
                  <IconButton
                    aria-label={`Remove grade ${row.label || index + 1}`}
                    icon={<Trash2 aria-hidden="true" />}
                    disabled={rows.length <= 1}
                    onClick={() => setRows((current) => current.filter((_, i) => i !== index))}
                  />
                </div>
              </div>
              {labelErrors && (
                <p id={`${rowId}-label-error`} className="mt-1 text-sm text-danger-text">
                  {labelErrors.join(" ")}
                </p>
              )}
              {percentErrors && (
                <p id={`${rowId}-min-error`} className="mt-1 text-sm text-danger-text">
                  {percentErrors.join(" ")}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <Button
        variant="outline"
        iconStart={<Plus aria-hidden="true" />}
        onClick={() => {
          setRows((current) => [...current, { key: nextKey, label: "", minPercent: "0", isPass: false, description: "" }]);
          setNextKey((key) => key + 1);
        }}
        disabled={rows.length >= 20}
      >
        Add band
      </Button>
    </fieldset>
  );
}
