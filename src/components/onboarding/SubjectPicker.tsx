"use client";

import { ChevronDown, Search } from "lucide-react";
import { useId, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { formatCount } from "@/lib/format";
import { matchesSubjectQuery, subjectCodeLabel } from "./copy";

export interface PickerSubject {
  id: string;
  name: string;
  code: string | null;
}

export interface PickerCategory {
  categoryId: string;
  categoryName: string;
  subjects: PickerSubject[];
}

export interface SubjectPickerProps {
  /** Selectable subjects grouped by category (§4), in catalogue order. */
  groups: readonly PickerCategory[];
  /** Listed honestly as "coming soon" (not selectable). */
  comingSoon: readonly PickerSubject[];
  defaultSelected: readonly string[];
  max: number;
  /** Form field name (default `subjectIds`). */
  name?: string;
  /** Extra `aria-describedby` target (the form's error region). */
  describedBy?: string;
}

/**
 * Subject multi-select for onboarding (§5 "Subjects (multiple)"): grouped by category, searchable by name or board
 * code, with the board code shown under each subject. Native checkboxes named `subjectIds`, so the form posts without
 * JavaScript (search then simply does nothing). Subjects hidden by a search stay selected. The selection count and the
 * number of matches are announced politely.
 */
export function SubjectPicker({ groups, comingSoon, defaultSelected, max, name = "subjectIds", describedBy }: SubjectPickerProps) {
  const statusId = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set(defaultSelected));
  const atMax = selected.size >= max;

  const toggle = (id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const visibleIds = new Set(groups.flatMap((g) => g.subjects.filter((s) => matchesSubjectQuery(s, query)).map((s) => s.id)));
  const searching = query.trim() !== "";
  const describedByIds = [statusId, describedBy].filter(Boolean).join(" ");

  return (
    <div className="space-y-5">
      <Field label="Search subjects" hint="Type a subject name or its code.">
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startIcon={<Search aria-hidden="true" />}
          autoComplete="off"
          enterKeyHint="search"
          onKeyDown={(event) => {
            // Enter in the search box filters; it must not submit the step.
            if (event.key === "Enter") event.preventDefault();
          }}
        />
      </Field>

      <p id={statusId} aria-live="polite" className="text-sm font-medium text-text">
        {selected.size === 0 ? "No subjects chosen yet." : `${formatCount(selected.size, "subject")} chosen.`}
        {searching && <span className="font-normal text-muted"> {formatCount(visibleIds.size, "subject")} match your search.</span>}
        {atMax && <span className="font-normal text-muted"> That&rsquo;s the most you can choose for now.</span>}
      </p>

      <div className="space-y-6">
        {groups.map((group) => {
          const anyVisible = group.subjects.some((s) => visibleIds.has(s.id));
          return (
            <fieldset key={group.categoryId} hidden={!anyVisible} aria-describedby={describedByIds} className="min-w-0">
              <legend className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">{group.categoryName}</legend>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {group.subjects.map((subject) => {
                  const checked = selected.has(subject.id);
                  return (
                    <li key={subject.id} hidden={!visibleIds.has(subject.id)}>
                      <Checkbox
                        name={name}
                        value={subject.id}
                        checked={checked}
                        disabled={!checked && atMax}
                        onChange={(event) => toggle(subject.id, event.target.checked)}
                        label={subject.name}
                        description={subjectCodeLabel(subject.code)}
                        className="rounded-control border border-border bg-surface px-3 transition-colors has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
                      />
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
        {searching && visibleIds.size === 0 && (
          <p className="rounded-card border border-dashed border-border bg-surface p-4 text-sm text-muted">
            No subjects match &ldquo;{query.trim()}&rdquo;. Check the spelling, or look under &ldquo;Coming soon&rdquo; below.
          </p>
        )}
      </div>

      {comingSoon.length > 0 && (
        <details className="group rounded-card border border-border bg-surface">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-text [&::-webkit-details-marker]:hidden">
            <span>Coming soon ({comingSoon.length})</span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
          </summary>
          <div className="space-y-2 border-t border-border px-4 py-3">
            <p className="text-sm text-muted">These subjects are listed but not ready yet. You can add them from Subjects once they open.</p>
            <ul className="grid grid-cols-1 gap-1 text-sm text-text sm:grid-cols-2">
              {comingSoon.map((subject) => (
                <li key={subject.id}>
                  {subject.name}
                  {subject.code && <span className="text-muted"> · {subject.code}</span>}
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}
    </div>
  );
}
