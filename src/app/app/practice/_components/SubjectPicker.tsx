"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";

export interface SubjectPickerProps {
  subjects: { id: string; label: string }[];
  selectedId: string;
  /** Other builder params to keep when the subject changes (mode, count, difficulty). */
  keep: Record<string, string>;
}

/**
 * Subject choice for the builder. A plain GET form (works without JavaScript via the "Show topics" button); with
 * JavaScript, changing the select reloads the topics straight away. Topic choices belong to one subject, so they are
 * not carried over.
 */
export function SubjectPicker({ subjects, selectedId, keep }: SubjectPickerProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <form method="get" action="/app/practice" className="flex flex-col gap-3 sm:flex-row sm:items-end">
      {Object.entries(keep).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <Field label="Subject" className="w-full sm:max-w-sm">
        <Select
          name="subjectId"
          defaultValue={selectedId}
          options={subjects.map((s) => ({ value: s.id, label: s.label }))}
          onChange={(event) => {
            const params = new URLSearchParams({ ...keep, subjectId: event.target.value });
            startTransition(() => router.replace(`/app/practice?${params.toString()}`, { scroll: false }));
          }}
        />
      </Field>
      <noscript>
        <Button type="submit" variant="outline">
          Show topics
        </Button>
      </noscript>
      {pending && <Spinner label="Loading topics" className="self-center text-muted sm:mb-3" />}
    </form>
  );
}
