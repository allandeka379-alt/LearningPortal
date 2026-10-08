"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import type { CognitiveSkill, ContentAccessTier, CopyrightStatus } from "@/generated/prisma/enums";
import type { ActionResult } from "@/server/lib/errors";
import type { MediaOption, Option, SourceOption, SubjectContentOptions } from "@/server/cms/questions/lookups";
import type { QuestionEditorInput } from "@/server/cms/questions/schemas";
import type { SaveQuestionResult } from "@/server/cms/questions/service";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { ACCESS_TIER_LABELS, COPYRIGHT_LABELS, DIFFICULTY_LABELS, QUESTION_TYPE_LABELS, SKILL_LABELS, optionsOf } from "./labels";
import type { DefinitionDraft } from "./model";
import { AnswerEditor, DefinitionHeader } from "./editor/DefinitionEditor";
import { CheckboxInput, EditorErrorsProvider, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextInput, useErrors, type FieldErrorMap } from "./editor/fields";
import { MarkdownField, MarkdownPreviewProvider, type MarkdownPreviewAction } from "./editor/MarkdownField";

/**
 * The question editor (§9 metadata, §10 feedback, §27 licensing): one controlled document posted as JSON to the save
 * action, with a per-type answer editor driven by the `@/lib/questions` shapes. Drafts save even when incomplete;
 * what still blocks review is listed by the page and highlighted next to the fields.
 */

export interface QuestionEditorProps {
  mode: "create" | "update";
  questionId?: string;
  /** Row version (`updatedAt` ISO) for optimistic concurrency. */
  version?: string;
  initial: QuestionEditorInput;
  readOnly?: boolean;
  subjects: readonly Option[];
  content: SubjectContentOptions;
  sources: readonly SourceOption[];
  media: readonly MediaOption[];
  reservedOptionKeys?: readonly string[];
  /** Labels of stored tags that may not be in `content` (other subjects' versions). */
  topicLabels?: Readonly<Record<string, { name: string; syllabus: string; syllabusId: string }>>;
  objectiveLabels?: Readonly<Record<string, string>>;
  /** Problems found by the server's checks (highlighted inline until fixed). */
  initialErrors?: FieldErrorMap;
  saveAction: AdminFormAction<SaveQuestionResult>;
  previewAction: MarkdownPreviewAction;
  loadSubjectAction: (input: { subjectId: string; extraSyllabusIds: string[] }) => Promise<ActionResult<SubjectContentOptions>>;
}

type Doc = QuestionEditorInput;

function SectionCard({ title, description, children, id }: { title: string; description?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <Card as="section" id={id} aria-label={title} className="scroll-mt-20">
      <CardHeader title={title} titleAs="h2" description={description} />
      <CardBody className="grid gap-4">{children}</CardBody>
    </Card>
  );
}

export function QuestionEditor(props: QuestionEditorProps) {
  const { mode, questionId, version, initial, readOnly = false, saveAction, previewAction } = props;
  const [doc, setDoc] = useState<Doc>(initial);
  const [dirty, setDirty] = useState(false);
  const [content, setContent] = useState(props.content);
  const [state, formAction, pending] = useActionState<AdminActionState<SaveQuestionResult>, FormData>(saveAction, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<AdminActionState<SaveQuestionResult>>(null);

  const update = (patch: Partial<Doc>) => {
    setDoc((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  useEffect(() => {
    if (!state || handled.current === state) return;
    handled.current = state;
    if (!state.ok) return;
    const problems = state.data.errors.length;
    toast({
      title: mode === "create" ? "Draft created." : "Draft saved.",
      description: problems > 0 ? `${problems} ${problems === 1 ? "problem" : "problems"} to fix before review.` : "Ready to submit for review.",
      tone: "success",
    });
    // The page re-renders with the saved version and remounts the editor (clean state).
    if (state.redirectTo) router.push(state.redirectTo);
    else router.refresh();
  }, [state, mode, toast, router]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const failure = state !== null && !state.ok ? state.error : null;
  const errors: FieldErrorMap = failure?.fieldErrors ?? props.initialErrors ?? {};
  const failureMessages = failure?.fieldErrors ? Object.entries(failure.fieldErrors).slice(0, 12) : [];
  const definition = doc as unknown as DefinitionDraft;

  return (
    <MarkdownPreviewProvider action={previewAction}>
      <EditorErrorsProvider errors={errors}>
        <form action={formAction} className="space-y-6" aria-describedby={failure ? "question-editor-errors" : undefined}>
          <input type="hidden" name="document" value={JSON.stringify(doc)} />
          {questionId && <input type="hidden" name="id" value={questionId} />}
          {version && <input type="hidden" name="version" value={version} />}

          {failure && (
            <Alert id="question-editor-errors" tone="danger" role="alert" title={failure.fieldErrors ? "The draft was not saved" : undefined}>
              <p>{failure.fieldErrors?._form?.join(" ") ?? failure.message}</p>
              {failureMessages.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-sm">
                  {failureMessages
                    .filter(([key]) => key !== "_form")
                    .map(([key, messages]) => (
                      <li key={key}>
                        <span className="font-mono text-xs">{key}</span>: {messages.join(" ")}
                      </li>
                    ))}
                </ul>
              )}
            </Alert>
          )}

          <fieldset disabled={readOnly} className="min-w-0 space-y-6">
            <legend className="sr-only">Question</legend>
            <SectionCard title="Question" description={`${QUESTION_TYPE_LABELS[doc.type]}. Write original questions only (§27).`}>
              {mode === "create" && (
                <SubjectPicker
                  subjects={props.subjects}
                  value={doc.subjectId}
                  onChange={(subjectId, options) => {
                    update({ subjectId, relatedLessonId: null });
                    setContent(options);
                  }}
                  loadSubjectAction={props.loadSubjectAction}
                  extraSyllabusIds={(doc.topics ?? []).map((t) => props.topicLabels?.[t.topicId]?.syllabusId).filter((id): id is string => Boolean(id))}
                />
              )}
              <DefinitionHeader draft={definition} level={0} path="" disabled={readOnly} onChange={(patch) => update(patch as Partial<Doc>)} />
              <MarkdownField
                label={doc.type === "STRUCTURED" ? "Shared context (shown above the parts)" : "Question text"}
                rows={6}
                value={doc.stem}
                path="stem"
                disabled={readOnly}
                onChange={(stem) => update({ stem })}
              />
            </SectionCard>

            <SectionCard title={doc.type === "STRUCTURED" ? "Parts" : "Answer and marking"} description={doc.type === "STRUCTURED" ? "Each part has its own type, marks and answer." : undefined}>
              <AnswerEditor
                draft={definition}
                onChange={(patch) => update(patch as Partial<Doc>)}
                path=""
                disabled={readOnly}
                media={props.media}
                reservedKeys={props.reservedOptionKeys}
                level={0}
              />
            </SectionCard>

            <SectionCard title="Feedback" description="Shown after answering (§10): why the answer is right, the method, the concept and hints.">
              <MarkdownField label="Explanation" optional rows={4} value={doc.explanation ?? ""} path="explanation" disabled={readOnly} onChange={(explanation) => update({ explanation })} />
              <MarkdownField label="Worked solution" optional rows={5} value={doc.workedSolution ?? ""} path="workedSolution" disabled={readOnly} onChange={(workedSolution) => update({ workedSolution })} />
              <MarkdownField label="Relevant concept" optional hint="One or two sentences." rows={2} value={doc.conceptSummary ?? ""} path="conceptSummary" disabled={readOnly} onChange={(conceptSummary) => update({ conceptSummary })} />
              <HintsEditor hints={doc.hints ?? []} disabled={readOnly} onChange={(hints) => update({ hints })} />
              <SelectInput
                label="“Study this topic” lesson"
                optional
                hint="Otherwise the lesson of the primary topic is suggested."
                value={doc.relatedLessonId ?? ""}
                placeholder="Suggest automatically"
                options={content.lessons}
                path="relatedLessonId"
                disabled={readOnly}
                onChange={(value) => update({ relatedLessonId: value === "" ? null : value })}
              />
            </SectionCard>

            <MetadataSection doc={doc} update={update} disabled={readOnly} />
            <CurriculumSection doc={doc} update={update} content={content} topicLabels={props.topicLabels} objectiveLabels={props.objectiveLabels} disabled={readOnly} />
            <LicensingSection doc={doc} update={update} sources={props.sources} disabled={readOnly} />
          </fieldset>

          {!readOnly && (
            <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center gap-3 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-card sm:border">
              <Button type="submit" iconStart={<Save aria-hidden="true" />} loading={pending} loadingText="Saving…">
                {mode === "create" ? "Create draft" : "Save draft"}
              </Button>
              <span className="text-sm text-muted" aria-live="polite">
                {dirty ? "Unsaved changes" : mode === "update" ? "All changes saved" : ""}
              </span>
            </div>
          )}
        </form>
      </EditorErrorsProvider>
    </MarkdownPreviewProvider>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------------------------------------------------

function SubjectPicker({
  subjects,
  value,
  onChange,
  loadSubjectAction,
  extraSyllabusIds,
}: {
  subjects: readonly Option[];
  value: string;
  onChange: (subjectId: string, options: SubjectContentOptions) => void;
  loadSubjectAction: QuestionEditorProps["loadSubjectAction"];
  extraSyllabusIds: string[];
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <SelectInput
        label="Home subject"
        hint="Where the question is authored. Tag topics of other versions or boards to reuse it there."
        value={value}
        options={subjects}
        path="subjectId"
        onChange={(subjectId) => {
          setError(null);
          start(async () => {
            const result = await loadSubjectAction({ subjectId, extraSyllabusIds });
            if (result.ok) onChange(subjectId, result.data);
            else setError(result.error.message);
          });
        }}
      />
      {pending && <p className="text-sm text-muted">Loading the subject&apos;s topics…</p>}
      {error && <p className="text-sm text-danger-text">{error}</p>}
    </div>
  );
}

function HintsEditor({ hints, onChange, disabled }: { hints: string[]; onChange: (hints: string[]) => void; disabled?: boolean }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-text">Hints, in the order they are revealed</h3>
      <ol className="space-y-3">
        {hints.map((hint, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <MarkdownField label={`Hint ${index + 1}`} rows={2} value={hint} path={`hints.${index}`} disabled={disabled} onChange={(value) => onChange(hints.map((h, i) => (i === index ? value : h)))} />
            </div>
            <div className="pt-7">
              <RowControls index={index} count={hints.length} itemLabel={`hint ${index + 1}`} disabled={disabled} onMove={(from, to) => onChange(moveItem(hints, from, to))} onRemove={(i) => onChange(removeItem(hints, i))} />
            </div>
          </li>
        ))}
      </ol>
      <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled || hints.length >= 10} onClick={() => onChange([...hints, ""])}>
        Add hint
      </Button>
    </div>
  );
}

const SKILL_OPTIONS = optionsOf(SKILL_LABELS);
const TIER_OPTIONS = optionsOf(ACCESS_TIER_LABELS);
const DIFFICULTY_OPTIONS = [1, 2, 3, 4, 5].map((value) => ({ value: String(value), label: DIFFICULTY_LABELS[value] ?? String(value) }));

function MetadataSection({ doc, update, disabled }: { doc: Doc; update: (patch: Partial<Doc>) => void; disabled?: boolean }) {
  const minutes = typeof doc.estimatedSeconds === "number" ? Math.round((doc.estimatedSeconds / 60) * 10) / 10 : undefined;
  return (
    <SectionCard title="Metadata" description="§9: difficulty, marks, time, year, paper style and the skill tested.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectInput label="Difficulty" value={String(doc.difficulty)} options={DIFFICULTY_OPTIONS} path="difficulty" disabled={disabled} onChange={(value) => update({ difficulty: Number(value) })} />
        <NumberInput label="Estimated time (minutes)" optional min={0.1} step={0.5} value={minutes} path="estimatedSeconds" disabled={disabled} onChange={(value) => update({ estimatedSeconds: value === undefined ? null : Math.max(1, Math.round(value * 60)) })} />
        <NumberInput label="Year" optional min={1900} max={2100} step={1} value={doc.year ?? undefined} path="year" disabled={disabled} onChange={(year) => update({ year: year ?? null })} />
        <TextInput
          label="Paper style"
          optional
          hint="The paper this original question targets, e.g. “Paper 2”."
          value={doc.paperLabel ?? ""}
          maxLength={32}
          path="paperLabel"
          disabled={disabled}
          onChange={(paperLabel) => update({ paperLabel })}
        />
        <SelectInput
          label="Skill tested"
          optional
          value={doc.cognitiveSkill ?? ""}
          placeholder="Not set"
          options={SKILL_OPTIONS}
          path="cognitiveSkill"
          disabled={disabled}
          onChange={(value) => update({ cognitiveSkill: value === "" ? null : (value as CognitiveSkill) })}
        />
        <SelectInput label="Who can practise it" value={doc.accessTier} options={TIER_OPTIONS} path="accessTier" disabled={disabled} onChange={(value) => update({ accessTier: value as ContentAccessTier })} />
        <SelectInput
          label="Calculator"
          value={doc.calculatorAllowed === true ? "yes" : doc.calculatorAllowed === false ? "no" : ""}
          placeholder="Not specified"
          options={[
            { value: "yes", label: "Allowed" },
            { value: "no", label: "Not allowed" },
          ]}
          path="calculatorAllowed"
          disabled={disabled}
          onChange={(value) => update({ calculatorAllowed: value === "" ? null : value === "yes" })}
        />
        <TextInput label="Language" hint="en, sn (Shona), nd (Ndebele)…" value={doc.languageCode ?? "en"} maxLength={10} path="languageCode" disabled={disabled} onChange={(languageCode) => update({ languageCode })} />
      </div>
      <div className="grid gap-x-6 sm:grid-cols-2">
        <CheckboxInput label="Exam-style question" description="Mirrors real exam format; the adaptive engine introduces these to strong students." checked={doc.isExamStyle === true} disabled={disabled} onChange={(isExamStyle) => update({ isExamStyle })} />
        <CheckboxInput
          label="Can be a daily question"
          description="Short, auto-marked and readable on WhatsApp."
          checked={doc.isDailyEligible === true}
          disabled={disabled}
          path="isDailyEligible"
          onChange={(isDailyEligible) => update({ isDailyEligible })}
        />
      </div>
    </SectionCard>
  );
}

function CurriculumSection({
  doc,
  update,
  content,
  topicLabels = {},
  objectiveLabels = {},
  disabled,
}: {
  doc: Doc;
  update: (patch: Partial<Doc>) => void;
  content: SubjectContentOptions;
  topicLabels?: QuestionEditorProps["topicLabels"];
  objectiveLabels?: QuestionEditorProps["objectiveLabels"];
  disabled?: boolean;
}) {
  const [chosenSyllabus, setSyllabusId] = useState(content.syllabi[0]?.value ?? "");
  // After a subject switch the old choice is not in the list: fall back to the first version of the new subject.
  const syllabusId = content.syllabi.some((s) => s.value === chosenSyllabus) ? chosenSyllabus : (content.syllabi[0]?.value ?? "");
  const [topicId, setTopicId] = useState("");
  const radioName = useId();
  const tags = doc.topics ?? [];
  const topicErrors = useErrors("topics");
  const topicById = useMemo(() => new Map(content.topics.map((t) => [t.value, t])), [content.topics]);
  const syllabusLabel = useMemo(() => new Map(content.syllabi.map((s) => [s.value, s.label])), [content.syllabi]);
  const labelOf = (id: string) => {
    const option = topicById.get(id);
    if (option) return { name: option.label.replace(/^(— )+/, ""), syllabus: syllabusLabel.get(option.syllabusId) ?? "", syllabusId: option.syllabusId };
    return topicLabels?.[id] ?? { name: "Unknown topic", syllabus: "", syllabusId: "" };
  };
  const taggedPaths = tags.map((t) => topicById.get(t.topicId)?.path).filter((p): p is string => Boolean(p));
  const objectives = content.objectives.filter((o) => {
    const path = topicById.get(o.topicId)?.path;
    return path !== undefined && taggedPaths.some((tagged) => path === tagged || path.startsWith(`${tagged}/`));
  });
  const chosenObjectives = new Set(doc.objectiveIds ?? []);
  const strayObjectives = [...chosenObjectives].filter((id) => !objectives.some((o) => o.value === id));

  const addTag = () => {
    if (!topicId || tags.some((t) => t.topicId === topicId)) return;
    const sameSyllabus = tags.filter((t) => labelOf(t.topicId).syllabusId === syllabusId);
    update({ topics: [...tags, { topicId, isPrimary: sameSyllabus.length === 0 }] });
    setTopicId("");
  };

  return (
    <SectionCard title="Curriculum" description="Tag topics in every syllabus version or board that should use this question. The primary tag decides which topic's mastery it counts towards.">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <SelectInput label="Syllabus version" value={syllabusId} options={content.syllabi} placeholder={content.syllabi.length === 0 ? "No syllabus versions yet" : undefined} disabled={disabled} onChange={(value) => { setSyllabusId(value); setTopicId(""); }} />
        <SelectInput label="Topic" value={topicId} placeholder="Choose a topic" options={content.topics.filter((t) => t.syllabusId === syllabusId)} disabled={disabled || !syllabusId} onChange={setTopicId} />
        <Button type="button" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled || !topicId} onClick={addTag}>
          Add tag
        </Button>
      </div>
      {topicErrors.length > 0 && (
        <p role="alert" className="text-sm text-danger-text">
          {topicErrors.join(" ")}
        </p>
      )}
      {tags.length === 0 ? (
        <p className="text-sm text-muted">No topics yet. Students practise a question only through its topic tags.</p>
      ) : (
        <ul className="divide-y divide-border rounded-card border border-border">
          {tags.map((tag, index) => {
            const label = labelOf(tag.topicId);
            return (
              <li key={tag.topicId} className="flex flex-wrap items-center gap-3 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text">{label.name}</p>
                  <p className="text-xs text-muted">{label.syllabus}</p>
                </div>
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${radioName}-${label.syllabusId}`}
                    checked={tag.isPrimary === true}
                    disabled={disabled}
                    className="size-5 accent-primary"
                    onChange={() =>
                      update({ topics: tags.map((t) => (labelOf(t.topicId).syllabusId === label.syllabusId ? { ...t, isPrimary: t.topicId === tag.topicId } : t)) })
                    }
                  />
                  Primary
                </label>
                {tag.isPrimary && <Badge size="sm" tone="primary">Mastery topic</Badge>}
                <IconButton icon={<Trash2 aria-hidden="true" />} aria-label={`Remove tag ${label.name}`} size="sm" disabled={disabled} onClick={() => update({ topics: removeItem(tags, index) })} />
              </li>
            );
          })}
        </ul>
      )}
      <fieldset className="space-y-1">
        <legend className="text-sm font-medium text-text">Learning objectives assessed</legend>
        {objectives.length === 0 && strayObjectives.length === 0 ? (
          <p className="text-sm text-muted">Objectives of the tagged topics appear here.</p>
        ) : (
          <div className="grid gap-x-6 md:grid-cols-2">
            {[...objectives.map((o) => ({ id: o.value, label: o.label })), ...strayObjectives.map((id) => ({ id, label: objectiveLabels?.[id] ?? "Objective of another topic" }))].map((objective) => (
              <CheckboxInput
                key={objective.id}
                label={objective.label}
                checked={chosenObjectives.has(objective.id)}
                disabled={disabled}
                onChange={(checked) => update({ objectiveIds: checked ? [...chosenObjectives, objective.id] : [...chosenObjectives].filter((id) => id !== objective.id) })}
              />
            ))}
          </div>
        )}
      </fieldset>
    </SectionCard>
  );
}

const COPYRIGHT_OPTIONS = optionsOf(COPYRIGHT_LABELS);

function LicensingSection({ doc, update, sources, disabled }: { doc: Doc; update: (patch: Partial<Doc>) => void; sources: readonly SourceOption[]; disabled?: boolean }) {
  return (
    <SectionCard
      title="Licensing"
      description="§27: original or properly licensed content only. Never reproduce past papers, marking schemes or textbook text; a question “in the style of Paper 2” is written from scratch."
    >
      <div className={cn("grid gap-3 md:grid-cols-2")}>
        <SelectInput label="Copyright status" value={doc.copyrightStatus} options={COPYRIGHT_OPTIONS} path="copyrightStatus" disabled={disabled} onChange={(value) => update({ copyrightStatus: value as CopyrightStatus })} />
        <SelectInput label="Content source" optional value={doc.sourceId ?? ""} placeholder="No source" options={sources} path="sourceId" disabled={disabled} onChange={(value) => update({ sourceId: value === "" ? null : value })} />
        <TextInput label="Author" optional value={doc.author ?? ""} maxLength={200} path="author" disabled={disabled} onChange={(author) => update({ author })} />
        <TextInput label="Licence code" optional placeholder="PROPRIETARY, CC-BY-4.0…" value={doc.licenceCode ?? ""} maxLength={64} path="licenceCode" disabled={disabled} onChange={(licenceCode) => update({ licenceCode })} mono />
        <TextInput label="Attribution" optional value={doc.attribution ?? ""} maxLength={1000} path="attribution" disabled={disabled} onChange={(attribution) => update({ attribution })} />
        <TextInput label="Source web address" optional value={doc.sourceUrl ?? ""} maxLength={2000} path="sourceUrl" disabled={disabled} onChange={(sourceUrl) => update({ sourceUrl })} />
        <TextInput label="Publication date" optional placeholder="YYYY-MM-DD" value={doc.publicationDate ?? ""} maxLength={10} path="publicationDate" disabled={disabled} onChange={(publicationDate) => update({ publicationDate })} />
      </div>
    </SectionCard>
  );
}
