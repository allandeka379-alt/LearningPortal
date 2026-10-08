"use client";

import { ArrowDown, ArrowUp, Plus, Search, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";
import type { MarkdownPreviewAction } from "@/components/admin/questions/editor/MarkdownField";
import { QUESTION_TYPE_LABELS } from "@/components/admin/questions/labels";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { QuestionType } from "@/lib/questions/constants";
import type { ActionResult } from "@/server/lib/errors";
import type { ComposedQuestion } from "./QuestionComposer";

/**
 * The question composer (the CMS definition editor with Markdown preview, ~30 kB gzip) is only needed after "Write
 * one": it loads on demand instead of with the page (ARCHITECTURE §9.9 bundle budgets).
 */
const QuestionComposer = dynamic(() => import("./QuestionComposer").then((mod) => mod.QuestionComposer), {
  loading: () => (
    <p role="status" className="text-sm text-muted">
      Loading the question editor…
    </p>
  ),
});

export interface BuilderItem {
  id: string;
  type: QuestionType;
  excerpt: string;
  /** The question's own marks. */
  marks: number;
  topic: string | null;
  source: "bank" | "own";
  /** Teacher weighting; null = the question's marks. */
  itemMarks: number | null;
}

export interface TestDetails {
  title: string;
  description: string;
  instructions: string;
  kind: "QUIZ" | "TOPIC_TEST" | "CHAPTER_TEST" | "SUBJECT_TEST";
  timeLimitMinutes: string;
  feedbackTiming: "IMMEDIATE" | "AFTER_SUBMIT" | "AFTER_CLOSE";
}

export interface TestBuilderProps {
  assessmentId: string;
  owner: { kind: "school"; schoolId: string } | { kind: "tutor" };
  ownerName: string;
  subjectId: string;
  initialDetails: TestDetails;
  initialItems: readonly BuilderItem[];
  topics: readonly { id: string; name: string; depth: number }[];
  /** Drafts are editable by their author / a school admin; published tests are read-only. */
  editable: boolean;
  actions: {
    save: (input: unknown) => Promise<ActionResult<{ id: string }>>;
    search: (input: unknown) => Promise<ActionResult<Omit<BuilderItem, "itemMarks">[]>>;
    createQuestion: (input: unknown) => Promise<ActionResult<{ id: string; marks: number }>>;
    preview: MarkdownPreviewAction;
  };
}

const KIND_OPTIONS = [
  { value: "QUIZ", label: "Quiz" },
  { value: "TOPIC_TEST", label: "Topic test" },
  { value: "CHAPTER_TEST", label: "Chapter test" },
  { value: "SUBJECT_TEST", label: "Subject test" },
];

const FEEDBACK_OPTIONS = [
  { value: "AFTER_SUBMIT", label: "When the student hands it in" },
  { value: "AFTER_CLOSE", label: "When the assignment closes" },
  { value: "IMMEDIATE", label: "After each question" },
];

function move<T>(list: readonly T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return [...list];
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item as T);
  return next;
}

/** A marks box that keeps what is typed (it may be cleared while editing) and reports whole numbers from 1 to 100. */
function MarksInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));
  return (
    <Field label="Marks" className="w-24">
      <Input
        inputMode="numeric"
        value={text}
        aria-label={label}
        onChange={(event) => {
          setText(event.target.value);
          const parsed = Number(event.target.value);
          if (event.target.value.trim() !== "" && Number.isInteger(parsed) && parsed >= 1 && parsed <= 100) onChange(parsed);
        }}
        onBlur={() => setText(String(value))}
      />
    </Field>
  );
}

/**
 * The class-test builder (§22 "create tests"): test details, the ordered question list with mark weighting, a picker
 * for published platform questions (or the owner's own), and a composer for new questions. Changes are saved
 * explicitly (one Server Action with the whole draft); publishing happens on the page once the draft is saved.
 */
export function TestBuilder({ assessmentId, owner, ownerName, subjectId, initialDetails, initialItems, topics, editable, actions }: TestBuilderProps) {
  const router = useRouter();
  const [details, setDetails] = useState<TestDetails>(initialDetails);
  const [items, setItems] = useState<BuilderItem[]>([...initialItems]);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [saving, startSaving] = useTransition();

  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"bank" | "own">("bank");
  const [topicId, setTopicId] = useState("");
  const [results, setResults] = useState<Omit<BuilderItem, "itemMarks">[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, startSearching] = useTransition();
  const [composerOpen, setComposerOpen] = useState(false);
  const listId = useId();

  const total = items.reduce((sum, item) => sum + (item.itemMarks ?? item.marks), 0);
  const change = (next: BuilderItem[]) => {
    setItems(next);
    setDirty(true);
  };
  const changeDetails = (patch: Partial<TestDetails>) => {
    setDetails((current) => ({ ...current, ...patch }));
    setDirty(true);
  };
  const add = (question: Omit<BuilderItem, "itemMarks">) => {
    if (items.some((item) => item.id === question.id)) return;
    change([...items, { ...question, itemMarks: null }]);
    setStatus({ tone: "success", text: `Added question ${items.length + 1}. Save to keep the change.` });
  };

  const save = () => {
    setStatus(null);
    startSaving(async () => {
      const result = await actions.save({
        assessmentId,
        title: details.title,
        description: details.description,
        instructions: details.instructions,
        kind: details.kind,
        timeLimitMinutes: details.timeLimitMinutes.trim() === "" ? null : Number(details.timeLimitMinutes),
        feedbackTiming: details.feedbackTiming,
        items: items.map((item) => ({ questionId: item.id, marks: item.itemMarks })),
      });
      if (result.ok) {
        setDirty(false);
        setFieldErrors({});
        setStatus({ tone: "success", text: "Test saved." });
        router.refresh();
      } else {
        setFieldErrors(result.error.fieldErrors ?? {});
        setStatus({ tone: "danger", text: result.error.message });
      }
    });
  };

  const runSearch = () => {
    setSearchError(null);
    startSearching(async () => {
      const result = await actions.search({ subjectId, owner, source, q: query, topicId: topicId || null, excludeIds: items.map((i) => i.id) });
      if (result.ok) setResults(result.data);
      else {
        setResults(null);
        setSearchError(result.error.message);
      }
    });
  };

  const onComposed = (question: ComposedQuestion) => {
    change([...items, { ...question, source: "own", itemMarks: null }]);
  };

  return (
    <div className="space-y-6">
      <Card as="section" aria-labelledby="details-heading">
        <CardHeader titleAs="h2" title={<span id="details-heading">Details</span>} description={`Owned by ${ownerName}.`} />
        <CardBody className="grid gap-4 md:grid-cols-2">
          <Field label="Title" required error={fieldErrors.title} className="md:col-span-2">
            <Input value={details.title} maxLength={200} disabled={!editable} onChange={(e) => changeDetails({ title: e.target.value })} />
          </Field>
          <Field label="Kind">
            <Select value={details.kind} options={KIND_OPTIONS} disabled={!editable} onChange={(e) => changeDetails({ kind: e.target.value as TestDetails["kind"] })} />
          </Field>
          <Field label="Time limit (minutes)" optional hint="Leave empty for an untimed test." error={fieldErrors.timeLimitMinutes}>
            <Input inputMode="numeric" value={details.timeLimitMinutes} disabled={!editable} onChange={(e) => changeDetails({ timeLimitMinutes: e.target.value })} />
          </Field>
          <Field label="Show answers and marks" className="md:col-span-2">
            <Select value={details.feedbackTiming} options={FEEDBACK_OPTIONS} disabled={!editable} onChange={(e) => changeDetails({ feedbackTiming: e.target.value as TestDetails["feedbackTiming"] })} />
          </Field>
          <Field label="Instructions" optional hint="Shown before the student starts." className="md:col-span-2">
            <Textarea rows={3} maxLength={5000} value={details.instructions} disabled={!editable} onChange={(e) => changeDetails({ instructions: e.target.value })} />
          </Field>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby={listId}>
        <CardHeader titleAs="h2" title={<span id={listId}>Questions ({items.length})</span>} description={`Total: ${total} ${total === 1 ? "mark" : "marks"}`} />
        <CardBody>
          {fieldErrors.items && (
            <Alert tone="danger" role="alert" className="mb-3">
              {fieldErrors.items.join(" ")}
            </Alert>
          )}
          {items.length === 0 ? (
            <p className="text-sm text-muted">No questions yet. Add some from the bank or write your own below.</p>
          ) : (
            <ol className="space-y-3">
              {items.map((item, index) => (
                <li key={item.id} className="rounded-card border border-border p-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text">
                        {index + 1}. {item.excerpt}
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                        <span>{QUESTION_TYPE_LABELS[item.type]}</span>
                        {item.topic && <span>· {item.topic}</span>}
                        <Badge size="sm" tone={item.source === "own" ? "accent" : "neutral"}>
                          {item.source === "own" ? "Your question" : "Question bank"}
                        </Badge>
                      </p>
                    </div>
                    {editable && (
                      <div className="flex shrink-0 flex-wrap items-end gap-2">
                        <MarksInput
                          label={`Marks for question ${index + 1}`}
                          value={item.itemMarks ?? item.marks}
                          onChange={(value) => change(items.map((it, i) => (i === index ? { ...it, itemMarks: value === it.marks ? null : value } : it)))}
                        />
                        <IconButton icon={<ArrowUp aria-hidden="true" />} aria-label={`Move question ${index + 1} up`} disabled={index === 0} onClick={() => change(move(items, index, index - 1))} />
                        <IconButton icon={<ArrowDown aria-hidden="true" />} aria-label={`Move question ${index + 1} down`} disabled={index === items.length - 1} onClick={() => change(move(items, index, index + 1))} />
                        <IconButton icon={<Trash2 aria-hidden="true" />} aria-label={`Remove question ${index + 1}`} onClick={() => change(items.filter((_, i) => i !== index))} />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </CardBody>
      </Card>

      {editable && (
        <>
          <Card as="section" aria-labelledby="picker-heading">
            <CardHeader titleAs="h2" title={<span id="picker-heading">Add questions</span>} description="Published questions of this subject. Answers are not shown here." />
            <CardBody className="space-y-4">
              <form
                className="grid gap-3 md:grid-cols-[1fr_12rem_14rem_auto] md:items-end"
                onSubmit={(event) => {
                  event.preventDefault();
                  runSearch();
                }}
              >
                <Field label="Search text">
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} maxLength={100} />
                </Field>
                <Field label="From">
                  <Select value={source} onChange={(e) => setSource(e.target.value as "bank" | "own")}>
                    <option value="bank">Question bank</option>
                    <option value="own">{owner.kind === "school" ? "Your school's questions" : "Your own questions"}</option>
                  </Select>
                </Field>
                <Field label="Topic">
                  <Select value={topicId} onChange={(e) => setTopicId(e.target.value)} placeholder="Any topic" options={topics.map((t) => ({ value: t.id, label: `${"— ".repeat(Math.min(t.depth, 3))}${t.name}` }))} />
                </Field>
                <Button type="submit" variant="secondary" iconStart={<Search aria-hidden="true" />} loading={searching} loadingText="Searching…">
                  Search
                </Button>
              </form>
              <div role="status" aria-live="polite">
                {searchError && <p className="text-sm text-danger-text">{searchError}</p>}
                {results && results.length === 0 && <p className="text-sm text-muted">No published questions match.</p>}
              </div>
              {results && results.length > 0 && (
                <ul className="divide-y divide-border rounded-card border border-border">
                  {results.map((question) => {
                    const added = items.some((item) => item.id === question.id);
                    return (
                      <li key={question.id} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm text-text">{question.excerpt}</p>
                          <p className="text-xs text-muted">
                            {QUESTION_TYPE_LABELS[question.type]} · {question.marks} {question.marks === 1 ? "mark" : "marks"}
                            {question.topic ? ` · ${question.topic}` : ""}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={added} onClick={() => add(question)}>
                          {added ? "Added" : "Add"}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card as="section" aria-labelledby="compose-heading">
            <CardHeader
              titleAs="h2"
              title={<span id="compose-heading">Write a question</span>}
              action={
                <Button size="sm" variant="ghost" aria-expanded={composerOpen} onClick={() => setComposerOpen((open) => !open)}>
                  {composerOpen ? "Hide" : "Write one"}
                </Button>
              }
            />
            {composerOpen && (
              <CardBody>
                <QuestionComposer owner={owner} subjectId={subjectId} topics={topics} createAction={actions.createQuestion} previewAction={actions.preview} onCreated={onComposed} />
              </CardBody>
            )}
          </Card>

          <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 flex flex-wrap items-center gap-3 rounded-card border border-border bg-surface p-3 shadow-xs lg:bottom-4">
            <Button onClick={save} loading={saving} loadingText="Saving…" disabled={!dirty && !saving}>
              Save test
            </Button>
            <p role="status" aria-live="polite" className={status?.tone === "danger" ? "text-sm text-danger-text" : "text-sm text-muted"}>
              {status?.text ?? (dirty ? "Unsaved changes." : "All changes saved.")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
