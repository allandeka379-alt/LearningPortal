"use client";

import { useActionState, useEffect, useId, useMemo, useRef, useState } from "react";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export interface PickableStudent {
  userId: string;
  name: string;
  studentNumber: string | null;
}

export interface StudentPickerFormProps {
  action: AdminFormAction<unknown>;
  students: readonly PickableStudent[];
  /** Hidden fields (e.g. the class id). */
  fields?: Readonly<Record<string, string>>;
  submitLabel: string;
  /** Accessible name of the checkbox group. */
  legend: string;
  emptyMessage: string;
}

/**
 * Choose students of the school (searchable checkbox list, "select all shown") and submit them to a Server Action as
 * `userIds`. Used to place students in a class. The outcome is announced (toast + polite region) and the page data
 * refreshes (the action revalidates the page).
 */
export function StudentPickerForm({ action, students, fields, submitLabel, legend, emptyMessage }: StudentPickerFormProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [state, formAction, pending] = useActionState(async (previous: AdminActionState, formData: FormData) => {
    const result = await action(previous, formData);
    if (result?.ok) setSelected(new Set());
    return result;
  }, null);
  const { toast } = useToast();
  const handled = useRef<AdminActionState>(null);
  const groupId = useId();

  useEffect(() => {
    if (!state || handled.current === state) return;
    handled.current = state;
    if (state.ok && state.message) toast({ title: state.message, tone: "success" });
  }, [state, toast]);

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term
      ? students.filter((s) => s.name.toLowerCase().includes(term) || (s.studentNumber ?? "").toLowerCase().includes(term))
      : students;
  }, [students, query]);

  if (students.length === 0) return <p className="text-sm text-muted">{emptyMessage}</p>;

  function toggle(userId: string, on: boolean) {
    setSelected((previous) => {
      const next = new Set(previous);
      if (on) next.add(userId);
      else next.delete(userId);
      return next;
    });
  }

  return (
    <form action={formAction} className="space-y-3">
      {fields && Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      {[...selected].map((userId) => (
        <input key={userId} type="hidden" name="userIds" value={userId} />
      ))}
      <Field label="Find students" hint="Type a name or student number.">
        <Input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} autoComplete="off" />
      </Field>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Button type="button" size="sm" variant="ghost" onClick={() => setSelected(new Set([...selected, ...shown.map((s) => s.userId)]))}>
          Select all shown ({shown.length})
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setSelected(new Set())} disabled={selected.size === 0}>
          Clear
        </Button>
        <span className="text-muted" aria-live="polite">
          {selected.size} selected
        </span>
      </div>
      <fieldset aria-labelledby={groupId} className="max-h-80 overflow-y-auto rounded-card border border-border bg-surface">
        <legend id={groupId} className="sr-only">
          {legend}
        </legend>
        <ul className="divide-y divide-border">
          {shown.slice(0, 300).map((student) => (
            <li key={student.userId}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 text-sm">
                <input
                  type="checkbox"
                  className="size-5 shrink-0 accent-primary"
                  checked={selected.has(student.userId)}
                  onChange={(event) => toggle(student.userId, event.currentTarget.checked)}
                />
                <span className="min-w-0 flex-1 text-text">{student.name}</span>
                {student.studentNumber && <span className="font-mono text-xs text-muted">{student.studentNumber}</span>}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      {shown.length > 300 && <p className="text-sm text-muted">Showing 300 of {shown.length}. Narrow the search to see the rest.</p>}
      <div role="status" aria-live="polite">
        {state && !state.ok && <Alert tone="danger">{state.error.fieldErrors?.userIds?.join(" ") ?? state.error.message}</Alert>}
      </div>
      <Button type="submit" loading={pending} loadingText="Saving…" disabled={selected.size === 0}>
        {submitLabel}
      </Button>
    </form>
  );
}
