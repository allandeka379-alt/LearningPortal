import { CircleAlert } from "lucide-react";
import {
  cloneElement,
  isValidElement,
  useId,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/** Props `Field` wires onto its control. */
export interface FieldControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  required?: boolean;
}

export interface FieldProps {
  label: ReactNode;
  /** Control id; generated when omitted. */
  id?: string;
  hint?: ReactNode;
  /**
   * Error message(s). Accepts `fieldErrors[name]` from an `ActionResult` directly. When present the control gets
   * `aria-invalid` and the message is linked via `aria-describedby`.
   */
  error?: string | readonly string[] | null;
  /** Adds the native `required` attribute to the control. */
  required?: boolean;
  /** Shows "(optional)" after the label. We mark optional fields rather than required ones. */
  optional?: boolean;
  labelHidden?: boolean;
  className?: string;
  /**
   * Either a single control element (`<Input name="email" />`), which receives the wiring props via
   * `cloneElement`, or a render function receiving them, for composite controls.
   */
  children: ReactElement<Partial<FieldControlProps>> | ((control: FieldControlProps) => ReactNode);
}

/**
 * Label + control + hint + error with correct ARIA wiring (§43 accessible forms). Server-compatible.
 *
 * @example
 * <Field label="Email" hint="We'll send a verification code" error={result.error.fieldErrors?.email}>
 *   <Input name="email" type="email" autoComplete="email" />
 * </Field>
 */
export function Field({ label, id, hint, error, required, optional, labelHidden, className, children }: FieldProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errors = !error ? [] : typeof error === "string" ? [error] : error.filter(Boolean);
  const errorId = errors.length > 0 ? `${controlId}-error` : undefined;

  const control: FieldControlProps = {
    id: controlId,
    ...(hintId || errorId ? { "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") } : {}),
    ...(errorId ? { "aria-invalid": true as const } : {}),
    ...(required ? { required: true } : {}),
  };

  let rendered: ReactNode;
  if (typeof children === "function") {
    rendered = children(control);
  } else if (isValidElement(children)) {
    const existing = children.props["aria-describedby"];
    rendered = cloneElement(children, {
      ...control,
      "aria-describedby": [existing, control["aria-describedby"]].filter(Boolean).join(" ") || undefined,
    });
  } else {
    rendered = children;
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={controlId} className={labelHidden ? "sr-only" : undefined}>
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </Label>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {rendered}
      {errorId && (
        <div id={errorId} className="flex gap-1.5 text-sm text-danger-text">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {errors.length === 1 ? (
            <span>{errors[0]}</span>
          ) : (
            <ul className="space-y-0.5">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/** Plain form label with the design-system type style. */
export function Label({ className, ...props }: ComponentPropsWithoutRef<"label">) {
  return <label className={cn("block text-sm font-medium text-text", className)} {...props} />;
}
