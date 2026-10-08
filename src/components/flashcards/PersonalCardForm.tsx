"use client";

import { CircleAlert, CircleCheck, Eye } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useState, useTransition, type FormEvent } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { SanitizedHtml } from "@/lib/content/types";
import type { ActionResult } from "@/server/lib/errors";
import { CARD_TYPE_LABELS, FLASHCARD_TYPES, type FlashcardCardType } from "./types";

export interface CardFormSubject {
  subjectId: string;
  name: string;
  /** Topics of the student's syllabus version in tree order. */
  topics: readonly { id: string; name: string; code: string | null; depth: number }[];
}

export interface PersonalCardValues {
  subjectId: string;
  topicId: string | null;
  cardType: FlashcardCardType;
  front: string;
  back: string;
  notes: string | null;
}

export interface CardPreviewHtml {
  frontHtml: SanitizedHtml;
  backHtml: SanitizedHtml;
  notesHtml: SanitizedHtml | null;
}

export interface PersonalCardFormProps {
  mode: "create" | "edit";
  subjects: readonly CardFormSubject[];
  /** Starting values (edit: the card; create: subject / topic from the link). */
  initial?: Partial<PersonalCardValues> & { id?: string };
  /** Saves the card (a Server Action). Edit mode sends `id` too. */
  saveAction: (input: PersonalCardValues & { id?: string }) => Promise<ActionResult<{ id: string }>>;
  /** Renders the draft through the content pipeline (a Server Action). */
  previewAction: (input: { front: string; back: string; notes: string | null }) => Promise<ActionResult<CardPreviewHtml>>;
  /** Where to go after saving an edit / when cancelling. */
  doneHref: string;
}

export const MAX_SIDE_LENGTH = 2_000;

const MATHS_HINT = "Markdown works. Write maths in LaTeX: $x^2$ inline, or $$\\frac{a}{b}$$ on its own line.";

/**
 * Create or edit one of the student's own flashcards (§18): subject (their enrolments), optional topic (their syllabus
 * version), the kind of card, front, back and optional notes, with a server-rendered preview (maths via KaTeX). After
 * "Save card" in create mode the text is cleared (subject, topic and kind stay) so several cards can be added in a row.
 */
export function PersonalCardForm({ mode, subjects, initial, saveAction, previewAction, doneHref }: PersonalCardFormProps) {
  const firstSubject = subjects.find((s) => s.subjectId === initial?.subjectId) ?? subjects[0];
  const [subjectId, setSubjectId] = useState(firstSubject?.subjectId ?? "");
  const [topicId, setTopicId] = useState(
    initial?.topicId && firstSubject?.topics.some((t) => t.id === initial.topicId) ? initial.topicId : "",
  );
  const [cardType, setCardType] = useState<FlashcardCardType>(initial?.cardType ?? "DEFINITION");
  const [front, setFront] = useState(initial?.front ?? "");
  const [back, setBack] = useState(initial?.back ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [preview, setPreview] = useState<CardPreviewHtml | null>(null);
  const [saving, startSaving] = useTransition();
  const [previewing, startPreview] = useTransition();
  const frontId = useId();

  const topics = useMemo(() => subjects.find((s) => s.subjectId === subjectId)?.topics ?? [], [subjects, subjectId]);
  const values = (): PersonalCardValues => ({ subjectId, topicId: topicId || null, cardType, front, back, notes: notes.trim() === "" ? null : notes });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    startSaving(async () => {
      const response = await saveAction(mode === "edit" && initial?.id ? { id: initial.id, ...values() } : values());
      if (response.ok) {
        setErrors({});
        if (mode === "create") {
          setFront("");
          setBack("");
          setNotes("");
          setPreview(null);
          setResult({ ok: true, message: "Card saved. It will come up as a new card in your reviews." });
          document.getElementById(frontId)?.focus();
        } else {
          setResult({ ok: true, message: "Changes saved." });
        }
      } else {
        setErrors(response.error.fieldErrors ?? {});
        setResult({ ok: false, message: response.error.message });
      }
    });
  };

  const showPreview = () => {
    startPreview(async () => {
      const response = await previewAction({ front, back, notes: notes.trim() === "" ? null : notes });
      if (response.ok) {
        setPreview(response.data);
        setErrors({});
      } else {
        setPreview(null);
        setErrors(response.error.fieldErrors ?? {});
        setResult({ ok: false, message: response.error.message });
      }
    });
  };

  const fieldError = (key: string) => errors[key];

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Subject" error={fieldError("subjectId")} required>
          <Select
            name="subjectId"
            value={subjectId}
            onChange={(event) => {
              setSubjectId(event.target.value);
              setTopicId("");
            }}
            options={subjects.map((s) => ({ value: s.subjectId, label: s.name }))}
          />
        </Field>
        <Field label="Topic" optional error={fieldError("topicId")}>
          <Select
            name="topicId"
            value={topicId}
            onChange={(event) => setTopicId(event.target.value)}
            placeholder="No particular topic"
            options={topics.map((t) => ({
              value: t.id,
              label: `${" ".repeat(Math.min(3, t.depth))}${t.code ? `${t.code} ` : ""}${t.name}`,
            }))}
          />
        </Field>
      </div>
      <Field label="Kind of card" error={fieldError("cardType")} required>
        <Select
          name="cardType"
          value={cardType}
          onChange={(event) => setCardType(event.target.value as FlashcardCardType)}
          options={FLASHCARD_TYPES.map((type) => ({ value: type, label: CARD_TYPE_LABELS[type] }))}
        />
      </Field>
      <Field id={frontId} label="Front" hint="The question or term you want to recall." error={fieldError("front")} required>
        <Textarea name="front" rows={3} maxLength={MAX_SIDE_LENGTH} value={front} onChange={(event) => setFront(event.target.value)} />
      </Field>
      <Field label="Back" hint={MATHS_HINT} error={fieldError("back")} required>
        <Textarea name="back" rows={4} maxLength={MAX_SIDE_LENGTH} value={back} onChange={(event) => setBack(event.target.value)} />
      </Field>
      <Field label="Notes" optional hint="A memory aid, an example or where it comes from." error={fieldError("notes")}>
        <Textarea name="notes" rows={2} maxLength={MAX_SIDE_LENGTH} value={notes} onChange={(event) => setNotes(event.target.value)} />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={saving} loadingText="Saving…">
          {mode === "create" ? "Save card" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" iconStart={<Eye aria-hidden="true" />} onClick={showPreview} loading={previewing} loadingText="Rendering…">
          Preview
        </Button>
        <Link href={doneHref} className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          {mode === "create" ? "Done" : "Cancel"}
        </Link>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {result && (
          <span className={result.ok ? "inline-flex items-start gap-1.5 text-success-text" : "inline-flex items-start gap-1.5 text-danger-text"}>
            {result.ok ? <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" /> : <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
            <span>{result.message}</span>
          </span>
        )}
      </p>

      {preview && (
        <section aria-labelledby="card-draft-preview" className="space-y-3 rounded-card border border-border bg-surface p-4">
          <h2 id="card-draft-preview" className="text-sm font-semibold text-muted">
            Preview
          </h2>
          <RichContent html={preview.frontHtml} className="text-lg" />
          <div className="border-t border-dashed border-border pt-3">
            <RichContent html={preview.backHtml} />
          </div>
          {preview.notesHtml && (
            <div className="rounded-control bg-subtle p-3 text-sm">
              <RichContent html={preview.notesHtml} />
            </div>
          )}
        </section>
      )}
    </form>
  );
}
