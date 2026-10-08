"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { createContext, use, useState, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import { errorsUnder, linesToList, listToLines, parseNumber } from "../model";

/**
 * Small controlled inputs of the question / assessment editors. Every input names its dot-joined `path` in the posted
 * document, so the server's field errors (`answerSpec.accepted.0.value`) appear next to the right control.
 */

export type FieldErrorMap = Readonly<Record<string, readonly string[]>>;

const ErrorsContext = createContext<FieldErrorMap>({});

export function EditorErrorsProvider({ errors, children }: { errors: FieldErrorMap; children: ReactNode }) {
  return <ErrorsContext value={errors}>{children}</ErrorsContext>;
}

/** Errors at `path` (exact), or at and below it (`deep`). */
export function useErrors(path: string | undefined, deep = false): string[] {
  const errors = use(ErrorsContext);
  return path === undefined ? [] : errorsUnder(errors, path, !deep);
}

/** Error messages of a whole block (list-level problems such as "Mark at least one option as correct."). */
export function BlockErrors({ path, className }: { path: string; className?: string }) {
  const messages = useErrors(path);
  if (messages.length === 0) return null;
  return (
    <ul role="alert" className={cn("space-y-0.5 text-sm text-danger-text", className)}>
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

interface BaseProps {
  label: ReactNode;
  path?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
  disabled?: boolean;
}

export function TextInput({
  label,
  path,
  hint,
  optional,
  className,
  disabled,
  value,
  onChange,
  maxLength,
  placeholder,
  mono,
}: BaseProps & { value: string; onChange: (value: string) => void; maxLength?: number; placeholder?: string; mono?: boolean }) {
  const errors = useErrors(path);
  return (
    <Field label={label} hint={hint} optional={optional} error={errors} className={className}>
      <Input value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} placeholder={placeholder} disabled={disabled} className={mono ? "font-mono" : undefined} />
    </Field>
  );
}

export function TextAreaInput({
  label,
  path,
  hint,
  optional,
  className,
  disabled,
  value,
  onChange,
  rows = 3,
  maxLength,
  placeholder,
}: BaseProps & { value: string; onChange: (value: string) => void; rows?: number; maxLength?: number; placeholder?: string }) {
  const errors = useErrors(path);
  return (
    <Field label={label} hint={hint} optional={optional} error={errors} className={className}>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} maxLength={maxLength} placeholder={placeholder} disabled={disabled} />
    </Field>
  );
}

/**
 * A number box that keeps what was typed ("1.", "-") while editing and reports a number (or undefined when blank /
 * not a number). External changes of `value` are adopted.
 */
export function NumberInput({
  label,
  path,
  hint,
  optional,
  className,
  disabled,
  value,
  onChange,
  min,
  max,
  step = "any",
  placeholder,
}: BaseProps & { value: number | null | undefined; onChange: (value: number | undefined) => void; min?: number; max?: number; step?: number | "any"; placeholder?: string }) {
  const errors = useErrors(path);
  const shown = value === null || value === undefined ? "" : String(value);
  const [text, setText] = useState(shown);
  const [seen, setSeen] = useState(shown);
  // Adopt external changes of `value` (during render, not in an effect) unless the typed text already means it.
  if (seen !== shown) {
    setSeen(shown);
    if (parseNumber(text) !== (value ?? undefined)) setText(shown);
  }
  return (
    <Field label={label} hint={hint} optional={optional} error={errors} className={className}>
      <Input
        inputMode="decimal"
        value={text}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          setText(e.target.value);
          onChange(parseNumber(e.target.value));
        }}
      />
    </Field>
  );
}

/** One entry per line (accepted answers, keywords, choices). */
export function LinesInput({
  label,
  path,
  hint,
  optional,
  className,
  disabled,
  value,
  onChange,
  rows = 3,
}: BaseProps & { value: readonly unknown[] | undefined; onChange: (value: string[]) => void; rows?: number }) {
  const errors = useErrors(path, true);
  const joined = listToLines(value);
  const [text, setText] = useState(joined);
  const [seen, setSeen] = useState(joined);
  if (seen !== joined) {
    setSeen(joined);
    if (listToLines(linesToList(text)) !== joined) setText(joined);
  }
  return (
    <Field label={label} hint={hint ?? "One per line."} optional={optional} error={errors} className={className}>
      <Textarea
        value={text}
        rows={rows}
        disabled={disabled}
        onChange={(e) => {
          setText(e.target.value);
          onChange(linesToList(e.target.value));
        }}
      />
    </Field>
  );
}

export function CheckboxInput({
  label,
  description,
  checked,
  onChange,
  disabled,
  className,
  path,
}: {
  label: ReactNode;
  description?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  path?: string;
}) {
  const errors = useErrors(path);
  return (
    <div className={className}>
      <Checkbox label={label} description={description} checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} invalid={errors.length > 0} />
      {errors.length > 0 && (
        <p className="text-sm text-danger-text" role="alert">
          {errors.join(" ")}
        </p>
      )}
    </div>
  );
}

export function SelectInput({
  label,
  path,
  hint,
  optional,
  className,
  disabled,
  value,
  onChange,
  options,
  placeholder,
}: BaseProps & { value: string; onChange: (value: string) => void; options: readonly SelectOption[]; placeholder?: string }) {
  const errors = useErrors(path);
  return (
    <Field label={label} hint={hint} optional={optional} error={errors} className={className}>
      {(control) => (
        <Select
          id={control.id}
          aria-describedby={control["aria-describedby"]}
          aria-invalid={control["aria-invalid"]}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </Field>
  );
}

/** Move up / move down / remove buttons of a list row (keyboard and touch operable). */
export function RowControls({
  index,
  count,
  itemLabel,
  onMove,
  onRemove,
  disabled,
  minCount = 0,
}: {
  index: number;
  count: number;
  itemLabel: string;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
  minCount?: number;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <IconButton icon={<ArrowUp aria-hidden="true" />} aria-label={`Move ${itemLabel} up`} size="sm" disabled={disabled || index === 0} onClick={() => onMove(index, index - 1)} />
      <IconButton icon={<ArrowDown aria-hidden="true" />} aria-label={`Move ${itemLabel} down`} size="sm" disabled={disabled || index === count - 1} onClick={() => onMove(index, index + 1)} />
      <IconButton icon={<Trash2 aria-hidden="true" />} aria-label={`Remove ${itemLabel}`} size="sm" disabled={disabled || count <= minCount} onClick={() => onRemove(index)} />
    </div>
  );
}

/** `list` with the item at `from` moved to `to` (no-op when out of range). */
export function moveItem<T>(list: readonly T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || from >= list.length || to >= list.length) return [...list];
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item as T);
  return next;
}

/** `list` without the item at `index`. */
export function removeItem<T>(list: readonly T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

/** `list` with the item at `index` replaced by `patch` applied to it. */
export function updateItem<T>(list: readonly T[], index: number, patch: Partial<T>): T[] {
  return list.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

/** A bordered row container for list editors. */
export function ListRow({ children, title, controls, className }: { children: ReactNode; title?: ReactNode; controls?: ReactNode; className?: string }) {
  return (
    <li className={cn("rounded-card border border-border p-3", className)}>
      {(title || controls) && (
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="min-w-0 text-sm font-semibold text-text">{title}</div>
          {controls}
        </div>
      )}
      <div className="grid gap-3">{children}</div>
    </li>
  );
}
