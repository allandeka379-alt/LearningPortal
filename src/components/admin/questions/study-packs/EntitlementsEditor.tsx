"use client";

import { useId, useState } from "react";
import { useActionFormState } from "@/components/admin/ActionForm";
import { fieldErrorsFor } from "@/components/admin/form-state";
import { Checkbox } from "@/components/ui/Checkbox";
import { AI_MODEL_TIERS } from "@/lib/billing/ai-tiers";
import type { Entitlements } from "@/lib/billing/entitlements";
import { ENTITLEMENT_FLAG_LABELS, ENTITLEMENT_LIMIT_LABELS } from "../labels";

/**
 * What a study pack unlocks (§24, §31): the SAME entitlements document as plans (`entitlementsSchema`), edited as
 * switches and allowances, posted as JSON in the `entitlements` field of the enclosing `ActionForm`. Allowances are
 * "not included" (0), "unlimited" (null) or a number.
 */
export function EntitlementsEditor({ initial, disabled = false }: { initial: Entitlements; disabled?: boolean }) {
  const [value, setValue] = useState<Entitlements>(initial);
  const { state } = useActionFormState();
  const id = useId();
  const set = (patch: Partial<Entitlements>) => setValue((current) => ({ ...current, ...patch }));
  const errors = Object.entries(state && !state.ok ? (state.error.fieldErrors ?? {}) : {}).filter(([key]) => key === "entitlements" || key.startsWith("entitlements."));

  return (
    <fieldset className="min-w-0 space-y-4 md:col-span-2" disabled={disabled}>
      <legend className="text-sm font-semibold text-text">What the pack unlocks</legend>
      <input type="hidden" name="entitlements" value={JSON.stringify(value)} />
      {errors.length > 0 && (
        <ul role="alert" className="space-y-0.5 text-sm text-danger-text">
          {errors.map(([key, messages]) => (
            <li key={key}>{messages.join(" ")}</li>
          ))}
        </ul>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm" htmlFor={`${id}-lessons`}>
          <span className="block font-medium text-text">Lessons</span>
          <select
            id={`${id}-lessons`}
            className="min-h-11 w-full rounded-control border border-border bg-surface px-3 text-sm text-text"
            value={value.lessonAccess}
            onChange={(e) => set({ lessonAccess: e.target.value === "ALL" ? "ALL" : "FREE_ONLY" })}
          >
            <option value="FREE_ONLY">Free lessons only (unchanged)</option>
            <option value="ALL">Every lesson in scope</option>
          </select>
        </label>
        <label className="space-y-1 text-sm" htmlFor={`${id}-tier`}>
          <span className="block font-medium text-text">Highest AI model tier</span>
          <select
            id={`${id}-tier`}
            className="min-h-11 w-full rounded-control border border-border bg-surface px-3 text-sm text-text"
            value={value.aiMaxModelTier}
            onChange={(e) => set({ aiMaxModelTier: (AI_MODEL_TIERS as readonly string[]).includes(e.target.value) ? (e.target.value as Entitlements["aiMaxModelTier"]) : "FAST" })}
          >
            {AI_MODEL_TIERS.map((tier) => (
              <option key={tier} value={tier}>
                {tier.charAt(0) + tier.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {ENTITLEMENT_FLAG_LABELS.map(({ key, label }) => (
          <Checkbox key={key} label={label} checked={value[key] === true} onChange={(e) => set({ [key]: e.target.checked } as Partial<Entitlements>)} />
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-text">Allowances</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {ENTITLEMENT_LIMIT_LABELS.map(({ key, label, unit }) => {
            const current = value[key] as number | null;
            const mode = current === null ? "unlimited" : current === 0 ? "none" : "limit";
            const fieldErrors = fieldErrorsFor(state, `entitlements.${key}`);
            return (
              <div key={key} className="rounded-control border border-border p-3">
                <label htmlFor={`${id}-${key}`} className="block text-sm font-medium text-text">
                  {label} <span className="font-normal text-muted">({unit})</span>
                </label>
                <div className="mt-1 flex gap-2">
                  <select
                    id={`${id}-${key}`}
                    className="min-h-11 flex-1 rounded-control border border-border bg-surface px-3 text-sm text-text"
                    value={mode}
                    onChange={(e) => set({ [key]: e.target.value === "unlimited" ? null : e.target.value === "none" ? 0 : Math.max(1, current ?? 1) } as Partial<Entitlements>)}
                  >
                    <option value="none">Not included</option>
                    <option value="limit">Up to…</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                  {mode === "limit" && (
                    <input
                      aria-label={`${label}: number ${unit}`}
                      inputMode="numeric"
                      className="min-h-11 w-24 rounded-control border border-border bg-surface px-3 text-sm text-text"
                      value={current ?? ""}
                      onChange={(e) => {
                        const n = Number.parseInt(e.target.value, 10);
                        set({ [key]: Number.isFinite(n) && n >= 1 ? n : 1 } as Partial<Entitlements>);
                      }}
                    />
                  )}
                </div>
                {fieldErrors && <p className="mt-1 text-sm text-danger-text">{fieldErrors.join(" ")}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}
