"use client";

import { useState, type ReactNode } from "react";
import { ActionForm, AdminCheckboxGroup, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import type { SelectOption } from "@/components/ui/Select";

/**
 * Create / edit form for a promo code. Shows only the value fields of the chosen discount type (percentage, fixed
 * amount + currency, or free days + plan), mirroring PromoCode_discount_chk. When the code has been used its discount
 * is frozen: `locked` hides the value fields and the server keeps the stored values. Dates are on the platform clock.
 */

export type PromoDiscountTypeValue = "PERCENT" | "FIXED_AMOUNT" | "FREE_DAYS";

export interface PromoCodeFormValues {
  code?: string;
  discountType?: PromoDiscountTypeValue;
  percentOff?: number | null;
  amountOff?: string;
  currency?: string | null;
  freeDays?: number | null;
  grantPlanId?: string | null;
  description?: string | null;
  audience?: string | null;
  appliesToStudyPacks?: boolean;
  newCustomersOnly?: boolean;
  maxRedemptions?: number | null;
  validFrom?: string;
  validTo?: string;
  isActive?: boolean;
  planIds?: readonly string[];
}

export interface PromoCodeFormProps {
  action: AdminFormAction<unknown>;
  submitLabel: string;
  hiddenFields?: Readonly<Record<string, string>>;
  initial?: PromoCodeFormValues;
  /** Plans the code can be limited to / free days can unlock. */
  plans: readonly { id: string; label: string; audience: string }[];
  currencies: readonly string[];
  /** The code has been used: its discount can no longer change. */
  locked?: ReactNode;
  secondaryActions?: ReactNode;
}

const TYPE_OPTIONS: readonly SelectOption[] = [
  { value: "PERCENT", label: "Percentage off" },
  { value: "FIXED_AMOUNT", label: "Fixed amount off" },
  { value: "FREE_DAYS", label: "Free days of a plan (no payment)" },
];

export function PromoCodeForm({ action, submitLabel, hiddenFields, initial = {}, plans, currencies, locked, secondaryActions }: PromoCodeFormProps) {
  const [type, setType] = useState<string>(initial.discountType ?? "PERCENT");
  const individualPlans = plans.filter((plan) => plan.audience === "INDIVIDUAL");

  return (
    <div
      onChange={(event) => {
        const target = event.target;
        if (target instanceof HTMLSelectElement && target.name === "discountType") setType(target.value);
      }}
    >
      <ActionForm action={action} submitLabel={submitLabel} hiddenFields={hiddenFields} columns="two" successAs="toast" secondaryActions={secondaryActions}>
        {locked ? (
          <div className="md:col-span-2">{locked}</div>
        ) : (
          <>
            <AdminField name="code" label="Code" required mono maxLength={32} defaultValue={initial.code} hint="Letters, digits, - and _ (3-32). Stored in capitals; customers can type any case." />
            <AdminField name="discountType" label="Discount" type="select" required options={TYPE_OPTIONS} defaultValue={type} />
            {type === "PERCENT" && <AdminField name="percentOff" label="Percentage off" type="number" min={1} max={99} required defaultValue={initial.percentOff} hint="1-99. A full discount is free days." />}
            {type === "FIXED_AMOUNT" && (
              <>
                <AdminField name="amountOff" label="Amount off" required defaultValue={initial.amountOff} placeholder="0.00" maxLength={14} hint="Major units, e.g. 1.50." />
                <AdminField name="currency" label="Currency" type="select" required options={currencies.map((value) => ({ value, label: value }))} defaultValue={initial.currency ?? currencies[0]} />
              </>
            )}
            {type === "FREE_DAYS" && (
              <>
                <AdminField name="freeDays" label="Free days" type="number" min={1} max={366} required defaultValue={initial.freeDays} />
                <AdminField
                  name="grantPlanId"
                  label="Plan unlocked"
                  type="select"
                  required
                  placeholder="Choose a plan"
                  options={individualPlans.map((plan) => ({ value: plan.id, label: plan.label }))}
                  defaultValue={initial.grantPlanId}
                />
              </>
            )}
          </>
        )}
        <AdminField name="description" label="Internal description" optional wide maxLength={500} defaultValue={initial.description} hint="Campaign or partner. Not shown to customers." />
        <AdminField
          name="audience"
          label="Who can use it"
          type="select"
          options={[
            { value: "INDIVIDUAL", label: "Individual purchases" },
            { value: "SCHOOL", label: "School purchases" },
          ]}
          placeholder="Anyone"
          defaultValue={initial.audience}
        />
        <AdminField name="maxRedemptions" label="Redemption cap" type="number" min={1} optional defaultValue={initial.maxRedemptions} hint="Empty = unlimited." />
        <AdminField name="validFrom" label="Valid from" type="datetime-local" optional defaultValue={initial.validFrom} hint="Platform time. Empty = now (or unchanged)." />
        <AdminField name="validTo" label="Valid until" type="datetime-local" optional defaultValue={initial.validTo} hint="Empty = no end date." />
        <AdminCheckboxGroup
          name="planIds"
          legend="Limit to plans"
          hint="None ticked = every plan of the audience."
          options={plans.map((plan) => ({ value: plan.id, label: plan.label }))}
          defaultValues={initial.planIds ?? []}
          wide
        />
        <AdminField name="appliesToStudyPacks" label="Also valid on study packs" type="checkbox" defaultChecked={initial.appliesToStudyPacks ?? false} />
        <AdminField name="newCustomersOnly" label="New customers only" type="checkbox" defaultChecked={initial.newCustomersOnly ?? false} description="Only for users without a previous successful payment." />
        <AdminField name="isActive" label="Active" type="checkbox" defaultChecked={initial.isActive ?? true} description="Inactive codes are refused at checkout." />
      </ActionForm>
    </div>
  );
}
