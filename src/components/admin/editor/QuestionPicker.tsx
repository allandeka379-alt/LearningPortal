"use client";

import { ArrowDown, ArrowUp, Plus, Search, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { fieldErrorsFor } from "../form-state";
import { useActionFormState } from "../ActionForm";
import type { QuestionChoice, QuestionSearchAction } from "./types";

/**
 * Practice questions attached to a lesson (§8 "practice questions"; LessonQuestion), in order. Searches PUBLISHED
 * platform questions (of the lesson's subject first) by their text; reorder with the arrow buttons. Submits
 * `questionIds` (repeated, in order) with the enclosing `ActionForm`.
 */
export function QuestionPicker({
  initial,
  searchAction,
  subjectId,
}: {
  initial: readonly QuestionChoice[];
  searchAction: QuestionSearchAction;
  subjectId: string | null;
}) {
  const { state } = useActionFormState();
  const [selected, setSelected] = useState<QuestionChoice[]>([...initial]);
  const [query, setQuery] = useState("");
  const [anySubject, setAnySubject] = useState(false);
  const [results, setResults] = useState<QuestionChoice[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const ticket = useRef(0);

  useEffect(() => {
    if (query.trim().length < 2) return;
    const current = ++ticket.current;
    const timer = setTimeout(() => {
      startTransition(async () => {
        const result = await searchAction(query.trim(), anySubject ? null : subjectId);
        if (current !== ticket.current) return;
        if (result?.ok) {
          setResults(result.data);
          setError(null);
        } else {
          setError(result?.error.message ?? "Search failed.");
        }
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [query, anySubject, subjectId, searchAction]);

  const move = (index: number, delta: number) =>
    setSelected((list) => {
      const next = [...list];
      const target = index + delta;
      if (target < 0 || target >= next.length) return list;
      [next[index], next[target]] = [next[target] as QuestionChoice, next[index] as QuestionChoice];
      return next;
    });

  const chosen = new Set(selected.map((q) => q.id));
  // Results of a cleared / too-short query are hidden rather than reset from an effect.
  const visible = query.trim().length >= 2 ? results : null;
  const errors = fieldErrorsFor(state, "questionIds");

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-text">Practice questions</legend>
      <p className="text-sm text-muted">Published questions students practise after the lesson, in this order.</p>
      {selected.map((question) => (
        <input key={question.id} type="hidden" name="questionIds" value={question.id} />
      ))}
      {selected.length === 0 ? (
        <p className="rounded-control border border-dashed border-border p-3 text-sm text-muted">No practice questions attached.</p>
      ) : (
        <ol className="divide-y divide-border rounded-control border border-border">
          {selected.map((question, index) => (
            <li key={question.id} className="flex items-start gap-2 px-3 py-2">
              <span className="mt-0.5 w-6 shrink-0 text-sm font-semibold text-muted tabular-nums">{index + 1}.</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text">{question.excerpt}</p>
                <p className="text-xs text-muted">
                  {question.type.toLowerCase().replace(/_/g, " ")} · difficulty {question.difficulty} · {question.marks} mark{question.marks === 1 ? "" : "s"}
                  {question.status !== "PUBLISHED" && <span className="font-semibold text-danger-text"> · not published</span>}
                </p>
              </div>
              <IconButton size="sm" aria-label={`Move question ${index + 1} up`} icon={<ArrowUp aria-hidden="true" />} onClick={() => move(index, -1)} disabled={index === 0} />
              <IconButton size="sm" aria-label={`Move question ${index + 1} down`} icon={<ArrowDown aria-hidden="true" />} onClick={() => move(index, 1)} disabled={index === selected.length - 1} />
              <IconButton size="sm" aria-label={`Remove question ${index + 1}`} icon={<X aria-hidden="true" />} onClick={() => setSelected((list) => list.filter((q) => q.id !== question.id))} />
            </li>
          ))}
        </ol>
      )}
      <div className="space-y-2 rounded-control bg-subtle p-3">
        <Field label="Find a published question" hint={subjectId && !anySubject ? "Searching this lesson's subject." : "Searching every subject."}>
          <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} startIcon={<Search />} placeholder="Words from the question" autoComplete="off" />
        </Field>
        {subjectId && (
          <label className="flex items-center gap-2 text-sm text-text">
            <input type="checkbox" checked={anySubject} onChange={(event) => setAnySubject(event.target.checked)} className="size-4 accent-primary" />
            Include other subjects
          </label>
        )}
        <p className="sr-only" aria-live="polite">
          {pending ? "Searching…" : visible ? `${visible.length} questions found` : ""}
        </p>
        {error && <p className="text-sm text-danger-text">{error}</p>}
        {visible && visible.length === 0 && <p className="text-sm text-muted">No published questions match.</p>}
        {visible && visible.length > 0 && (
          <ul className="max-h-72 divide-y divide-border overflow-auto rounded-control border border-border bg-surface">
            {visible.map((question) => (
              <li key={question.id} className="flex items-start gap-2 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text">{question.excerpt}</p>
                  <p className="text-xs text-muted">
                    {question.subject} · {question.type.toLowerCase().replace(/_/g, " ")} · difficulty {question.difficulty}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={chosen.has(question.id)}
                  onClick={() => setSelected((list) => [...list, question])}
                  iconStart={<Plus aria-hidden="true" />}
                >
                  {chosen.has(question.id) ? "Added" : "Add"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors && (
        <p className="text-sm text-danger-text" role="alert">
          {errors.join(" ")}
        </p>
      )}
    </fieldset>
  );
}
