"use client";

import { useRouter } from "next/navigation";
import { createContext, use, useActionState, useEffect, useRef, type ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { fieldErrorsFor, MULTI_VALUE_SEPARATOR, needsReauth, submittedValue, type AdminActionState, type AdminFormAction } from "./form-state";
import { StepUpForm } from "./StepUpForm";

/**
 * Admin form shell for Server Actions (§43 accessible forms): `useActionState` + field errors next to their fields
 * (`AdminField`), a form-level error summary (`role="alert"`), a success confirmation (`role="status"` or a toast),
 * re-fill after a failed submit, double-submit protection and the step-up password prompt.
 *
 * Usable from Server Components: pass the Server Action and declarative `AdminField`s as children.
 *
 * @example
 * <ActionForm action={createSchoolAction} submitLabel="Create school">
 *   <AdminField name="name" label="School name" required />
 *   <AdminField name="type" label="Type" type="select" options={TYPE_OPTIONS} />
 * </ActionForm>
 */

interface ActionFormContextValue {
  state: AdminActionState;
  pending: boolean;
}

const ActionFormContext = createContext<ActionFormContextValue>({ state: null, pending: false });

/** Current form state (for custom controls inside an `ActionForm`). */
export function useActionFormState(): ActionFormContextValue {
  return use(ActionFormContext);
}

export interface ActionFormProps {
  action: AdminFormAction<unknown>;
  children: ReactNode;
  submitLabel: ReactNode;
  pendingLabel?: ReactNode;
  submitVariant?: ButtonVariant;
  /** Hidden fields sent with every submit (e.g. `{ id }`). */
  hiddenFields?: Readonly<Record<string, string>>;
  /** Extra buttons next to submit (e.g. a Cancel link). */
  secondaryActions?: ReactNode;
  /** Show the success message as a toast instead of inline (default inline). */
  successAs?: "inline" | "toast";
  /** Grid layout for the fields (default one column; "two" = two columns from `md`). */
  columns?: "one" | "two";
  className?: string;
  id?: string;
}

export function ActionForm({
  action,
  children,
  submitLabel,
  pendingLabel = "Saving…",
  submitVariant = "primary",
  hiddenFields,
  secondaryActions,
  successAs = "inline",
  columns = "one",
  className,
  id,
}: ActionFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<AdminActionState>(null);

  useEffect(() => {
    if (state === null || handled.current === state || !state.ok) return;
    handled.current = state;
    if (successAs === "toast" && state.message) toast({ title: state.message, tone: "success" });
    if (state.redirectTo) router.push(state.redirectTo);
  }, [state, successAs, toast, router]);

  const failure = state !== null && !state.ok ? state : null;
  const hasFieldErrors = failure?.error.fieldErrors !== undefined && Object.keys(failure.error.fieldErrors).length > 0;

  return (
    <ActionFormContext value={{ state, pending }}>
      <div className={cn("space-y-4", className)}>
        <form id={id} action={formAction} className="space-y-4">
          {hiddenFields && Object.entries(hiddenFields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
          {failure && !needsReauth(state) && (
            <Alert tone="danger" role="alert" title={hasFieldErrors ? "Please fix the highlighted fields" : undefined}>
              {failure.error.fieldErrors?._form?.join(" ") ?? failure.error.message}
            </Alert>
          )}
          {state?.ok && state.message && successAs === "inline" && (
            <Alert tone="success" role="status">
              {state.message}
            </Alert>
          )}
          <div className={cn("grid gap-4", columns === "two" && "md:grid-cols-2")}>{children}</div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button type="submit" variant={submitVariant} loading={pending} loadingText={pendingLabel}>
              {submitLabel}
            </Button>
            {secondaryActions}
          </div>
        </form>
        {needsReauth(state) && <StepUpForm />}
      </div>
    </ActionFormContext>
  );
}

export type AdminFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "datetime-local"
  | "password"
  | "textarea"
  | "select"
  | "checkbox";

export interface AdminFieldProps {
  name: string;
  label: string;
  type?: AdminFieldType;
  defaultValue?: string | number | null;
  defaultChecked?: boolean;
  options?: readonly SelectOption[];
  /** Empty first option for selects. */
  placeholder?: string;
  hint?: ReactNode;
  required?: boolean;
  optional?: boolean;
  rows?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  autoComplete?: string;
  disabled?: boolean;
  /** Span both columns in a two-column `ActionForm`. */
  wide?: boolean;
  /** Monospace text (codes, slugs, markdown). */
  mono?: boolean;
  /** Checkbox description line. */
  description?: ReactNode;
}

/**
 * A labelled control wired to the enclosing `ActionForm`: its field errors, `aria-invalid` / `aria-describedby`, and
 * the re-filled value after a failed submit.
 */
export function AdminField({
  name,
  label,
  type = "text",
  defaultValue,
  defaultChecked,
  options,
  placeholder,
  hint,
  required,
  optional,
  rows,
  maxLength,
  min,
  max,
  step,
  autoComplete,
  disabled,
  wide,
  mono,
  description,
}: AdminFieldProps) {
  const { state } = useActionFormState();
  const errors = fieldErrorsFor(state, name);
  const initial = defaultValue === null || defaultValue === undefined ? undefined : String(defaultValue);
  const value = type === "password" ? undefined : submittedValue(state, name, initial);
  const wrapper = wide ? "md:col-span-2" : undefined;

  if (type === "checkbox") {
    const checked = state?.values ? state.values[name] !== undefined : defaultChecked;
    return (
      <div className={wrapper}>
        <Checkbox
          name={name}
          label={label}
          description={description}
          defaultChecked={checked}
          disabled={disabled}
          invalid={errors !== undefined}
          // A changed default must re-mount the uncontrolled input.
          key={String(checked)}
        />
        {errors && (
          <p className="text-sm text-danger-text" role="alert">
            {errors.join(" ")}
          </p>
        )}
      </div>
    );
  }

  return (
    <Field label={label} hint={hint} error={errors} required={required} optional={optional} className={wrapper}>
      {(control) =>
        type === "textarea" ? (
          <Textarea
            {...control}
            key={value ?? ""}
            name={name}
            defaultValue={value}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={mono ? "font-mono text-sm" : undefined}
          />
        ) : type === "select" ? (
          <SelectControl control={control} name={name} value={value} options={options ?? []} placeholder={placeholder} disabled={disabled} />
        ) : (
          <Input
            {...control}
            key={value ?? ""}
            name={name}
            type={type}
            defaultValue={value}
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            className={mono ? "font-mono" : undefined}
          />
        )
      }
    </Field>
  );
}

function SelectControl({
  control,
  name,
  value,
  options,
  placeholder,
  disabled,
}: {
  control: { id: string; "aria-describedby"?: string; "aria-invalid"?: true; required?: boolean };
  name: string;
  value: string | undefined;
  options: readonly SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <Select
      // Re-mount when the default changes so a re-filled value shows (uncontrolled select).
      key={value ?? ""}
      id={control.id}
      aria-describedby={control["aria-describedby"]}
      aria-invalid={control["aria-invalid"]}
      required={control.required}
      name={name}
      defaultValue={value ?? ""}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

/** Group of checkboxes submitted under one name (multi-value field), e.g. audience roles. */
export function AdminCheckboxGroup({
  name,
  legend,
  options,
  defaultValues = [],
  hint,
  wide,
}: {
  name: string;
  legend: string;
  options: readonly SelectOption[];
  defaultValues?: readonly string[];
  hint?: ReactNode;
  wide?: boolean;
}) {
  const { state } = useActionFormState();
  const errors = fieldErrorsFor(state, name);
  // After a failed submit, re-check what was submitted (React resets uncontrolled inputs after a form action).
  const submitted = state?.values ? (state.values[name]?.split(MULTI_VALUE_SEPARATOR) ?? []) : null;
  const selected = new Set(submitted ?? defaultValues);
  return (
    <fieldset className={cn("space-y-1", wide && "md:col-span-2")} aria-invalid={errors ? true : undefined}>
      <legend className="text-sm font-medium text-text">{legend}</legend>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      <div className="flex flex-wrap gap-x-6" key={[...selected].sort().join("|")}>
        {options.map((option) => (
          <Checkbox key={option.value} name={name} value={option.value} label={option.label} defaultChecked={selected.has(option.value)} disabled={option.disabled} />
        ))}
      </div>
      {errors && (
        <p className="text-sm text-danger-text" role="alert">
          {errors.join(" ")}
        </p>
      )}
    </fieldset>
  );
}
