"use client";

import { useState, useTransition } from "react";
import { AnswerEditor } from "@/components/admin/questions/editor/DefinitionEditor";
import { CheckboxInput, EditorErrorsProvider, NumberInput, SelectInput, type FieldErrorMap } from "@/components/admin/questions/editor/fields";
import { MarkdownField, MarkdownPreviewProvider, type MarkdownPreviewAction } from "@/components/admin/questions/editor/MarkdownField";
import { DIFFICULTY_LABELS, MARKING_MODE_LABELS, QUESTION_TYPE_HINTS, QUESTION_TYPE_LABELS, optionsOf } from "@/components/admin/questions/labels";
import { partsTotal, templateFor, withType, type DefinitionDraft } from "@/components/admin/questions/model";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { MarkingMode, QuestionType } from "@/lib/questions/constants";
import type { ActionResult } from "@/server/lib/errors";
import { TEACHER_QUESTION_TYPES } from "@/server/teaching/core";

export interface ComposedQuestion {
  id: string;
  type: QuestionType;
  marks: number;
  excerpt: string;
  topic: string | null;
}

export interface QuestionComposerProps {
  owner: { kind: "school"; schoolId: string } | { kind: "tutor" };
  subjectId: string;
  topics: readonly { id: string; name: string; depth: number }[];
  createAction: (input: unknown) => Promise<ActionResult<{ id: string; marks: number }>>;
  previewAction: MarkdownPreviewAction;
  onCreated: (question: ComposedQuestion) => void;
}

interface Doc extends DefinitionDraft {
  stem: string;
  explanation: string;
  difficulty: number;
  topicId: string;
  rightsConfirmed: boolean;
}

function freshDoc(type: QuestionType, keep: Partial<Doc> = {}): Doc {
  const template = templateFor(type);
  return {
    type,
    markingMode: template.markingMode,
    marks: template.marks,
    payload: template.payload,
    answerSpec: template.answerSpec,
    options: template.options ?? [],
    parts: template.parts ?? [],
    stem: "",
    explanation: "",
    difficulty: keep.difficulty ?? 3,
    topicId: keep.topicId ?? "",
    rightsConfirmed: false,
  };
}

const TYPE_OPTIONS = TEACHER_QUESTION_TYPES.map((value) => ({ value, label: QUESTION_TYPE_LABELS[value] }));
const MARKING_OPTIONS = optionsOf(MARKING_MODE_LABELS);
const DIFFICULTY_OPTIONS = Object.entries(DIFFICULTY_LABELS).map(([value, label]) => ({ value, label }));

function plainExcerpt(markdown: string): string {
  const text = markdown.replace(/\$\$?[^$]*\$\$?/g, "[maths]").replace(/[#*_`>[\]()!]/g, "").replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}

/**
 * Write your own question for a class test (§22) with the same per-type answer editors as the question bank:
 * question text (markdown + maths, with a preview), answer / mark scheme, marks, difficulty and a topic of the
 * subject. The question is saved and published into the school's (or tutor's) private bank and added to the test.
 */
export function QuestionComposer({ owner, subjectId, topics, createAction, previewAction, onCreated }: QuestionComposerProps) {
  const [doc, setDoc] = useState<Doc>(() => freshDoc("MULTIPLE_CHOICE"));
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const [message, setMessage] = useState<{ tone: "danger" | "success"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const update = (patch: Partial<Doc>) => setDoc((current) => ({ ...current, ...patch }));
  const structured = doc.type === "STRUCTURED";
  const topicOptions = topics.map((t) => ({ value: t.id, label: `${"— ".repeat(Math.min(t.depth, 3))}${t.name}` }));

  const submit = () => {
    setMessage(null);
    startTransition(async () => {
      const marks = structured ? partsTotal(doc.parts ?? []) : doc.marks;
      const result = await createAction({
        owner,
        subjectId,
        topicId: doc.topicId,
        type: doc.type,
        markingMode: doc.markingMode,
        stem: doc.stem,
        payload: doc.payload ?? null,
        answerSpec: doc.answerSpec ?? null,
        marks,
        options: doc.options ?? [],
        parts: doc.parts ?? [],
        explanation: doc.explanation,
        hints: [],
        difficulty: doc.difficulty,
        rightsConfirmed: doc.rightsConfirmed,
      });
      if (!result.ok) {
        setErrors(result.error.fieldErrors ?? {});
        setMessage({ tone: "danger", text: result.error.message });
        return;
      }
      setErrors({});
      setMessage({ tone: "success", text: "Question saved and added to the test." });
      onCreated({
        id: result.data.id,
        type: doc.type,
        marks: result.data.marks,
        excerpt: plainExcerpt(doc.stem) || QUESTION_TYPE_LABELS[doc.type],
        topic: topics.find((t) => t.id === doc.topicId)?.name ?? null,
      });
      setDoc(freshDoc(doc.type, { difficulty: doc.difficulty, topicId: doc.topicId }));
    });
  };

  return (
    <MarkdownPreviewProvider action={previewAction}>
      <EditorErrorsProvider errors={errors}>
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectInput
              label="Question type"
              hint={QUESTION_TYPE_HINTS[doc.type]}
              value={doc.type}
              options={TYPE_OPTIONS}
              path="type"
              onChange={(value) => setDoc((current) => ({ ...withType(current, value as QuestionType, 0), stem: current.stem }))}
            />
            <SelectInput label="Topic" value={doc.topicId} options={topicOptions} placeholder="Choose a topic" path="topicId" onChange={(topicId) => update({ topicId })} />
            {!structured && (
              <SelectInput label="Marking" value={doc.markingMode} options={MARKING_OPTIONS} path="markingMode" onChange={(value) => update({ markingMode: value as MarkingMode })} />
            )}
            {structured ? (
              <p className="self-end pb-3 text-sm text-muted">
                Worth <strong className="text-text">{partsTotal(doc.parts ?? [])}</strong> marks (the sum of its parts).
              </p>
            ) : (
              <NumberInput label="Marks" min={1} max={100} step={1} value={doc.marks} path="marks" onChange={(marks) => update({ marks: marks ?? 0 })} />
            )}
            <SelectInput label="Difficulty" value={String(doc.difficulty)} options={DIFFICULTY_OPTIONS} path="difficulty" onChange={(value) => update({ difficulty: Number(value) })} />
          </div>
          <MarkdownField label={structured ? "Shared context" : "Question"} rows={4} value={doc.stem} path="stem" onChange={(stem) => update({ stem })} />
          <AnswerEditor draft={doc} onChange={(patch) => update(patch as Partial<Doc>)} path="" media={[]} level={0} />
          <MarkdownField label="Explanation shown after marking" optional rows={3} value={doc.explanation} path="explanation" onChange={(explanation) => update({ explanation })} />
          <CheckboxInput
            label="I wrote this question, or I have the right to use it"
            description="It is saved as your school's (or your own) material, never shared with other schools."
            checked={doc.rightsConfirmed}
            path="rightsConfirmed"
            onChange={(rightsConfirmed) => update({ rightsConfirmed })}
          />
          {message && (
            <Alert tone={message.tone} role={message.tone === "danger" ? "alert" : "status"}>
              {message.text}
            </Alert>
          )}
          <Button onClick={submit} loading={pending} loadingText="Saving question…">
            Save question and add it
          </Button>
        </div>
      </EditorErrorsProvider>
    </MarkdownPreviewProvider>
  );
}
