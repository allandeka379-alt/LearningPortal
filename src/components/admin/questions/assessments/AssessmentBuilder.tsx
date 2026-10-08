"use client";

import { ClipboardCheck, Layers, ListPlus, Plus, Save, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";
import { QUESTION_TYPES } from "@/lib/questions/constants";
import { CognitiveSkill } from "@/generated/prisma/enums";
import type { ActionResult } from "@/server/lib/errors";
import { computeTotals, type Feasibility, type Totals } from "@/server/cms/assessments/core";
import type { BlueprintRuleInput, SectionInput } from "@/server/cms/assessments/schemas";
import type { AssessmentQuestionInfo, BlueprintReport } from "@/server/cms/assessments/service";
import type { Option, ObjectiveOption, TopicOption } from "@/server/cms/questions/lookups";
import type { PickerQuestion } from "@/server/cms/questions/service";
import { DIFFICULTY_LABELS, QUESTION_TYPE_LABELS, SKILL_LABELS } from "../labels";
import { parseWhole } from "../model";
import { BlockErrors, CheckboxInput, EditorErrorsProvider, ListRow, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextAreaInput, TextInput, type FieldErrorMap } from "../editor/fields";

/**
 * The structure builder of an assessment (§12, §13): sections ("Paper 1", "Section B: answer any two") with fixed
 * questions picked from the PUBLISHED bank and/or blueprint rules (topic, difficulty range, count, marks), live
 * totals, and the check "can the published bank satisfy these rules?" run on the server against the real bank.
 */

interface ItemDraft {
  questionId: string;
  label: string;
  marks: number | undefined;
}

interface RuleDraft {
  topicId: string;
  objectiveId: string;
  includeSubtopics: boolean;
  questionType: string;
  cognitiveSkill: string;
  difficultyMin: number;
  difficultyMax: number;
  questionCount: number;
  marksPerQuestion: number | undefined;
  examStyleOnly: boolean;
}

interface SectionDraft {
  key: number;
  title: string;
  instructions: string;
  componentId: string;
  timeLimitMinutes: number | undefined;
  answerCount: number | undefined;
  marks: number | undefined;
  items: ItemDraft[];
  rules: RuleDraft[];
}

export interface ComponentOption extends Option {
  durationMinutes: number | null;
  maxMarks: number | null;
}

export interface AssessmentBuilderProps {
  assessmentId: string;
  version: string;
  editable: boolean;
  /** Rules are only used by blueprint / adaptive assemblies. */
  usesRules: boolean;
  subjectId: string;
  syllabusId: string | null;
  initialSections: readonly SectionInput[];
  questionInfo: Readonly<Record<string, AssessmentQuestionInfo>>;
  components: readonly ComponentOption[];
  topics: readonly TopicOption[];
  objectives: readonly ObjectiveOption[];
  savedBlueprint: BlueprintReport | null;
  saveAction: AdminFormAction<{ id: string; version: string; totals: Totals }>;
  checkAction: (input: { id: string; sections: SectionInput[] }) => Promise<ActionResult<{ totals: Totals; blueprint: BlueprintReport | null }>>;
  searchAction: (input: Record<string, unknown>) => Promise<ActionResult<PickerQuestion[]>>;
}

const num = (value: unknown): number | undefined => (typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value)) ? Number(value) : undefined);
const str = (value: unknown): string => (typeof value === "string" ? value : "");

function toDraft(section: SectionInput, key: number): SectionDraft {
  return {
    key,
    title: section.title,
    instructions: str(section.instructions),
    componentId: str(section.componentId),
    timeLimitMinutes: num(section.timeLimitMinutes),
    answerCount: num(section.answerCount),
    marks: num(section.marks),
    items: (section.items ?? []).map((item) => ({ questionId: item.questionId, label: str(item.label), marks: num(item.marks) })),
    rules: (section.rules ?? []).map((rule) => ({
      topicId: str(rule.topicId),
      objectiveId: str(rule.objectiveId),
      includeSubtopics: rule.includeSubtopics !== false,
      questionType: str(rule.questionType),
      cognitiveSkill: str(rule.cognitiveSkill),
      difficultyMin: num(rule.difficultyMin) ?? 1,
      difficultyMax: num(rule.difficultyMax) ?? 5,
      questionCount: num(rule.questionCount) ?? 1,
      marksPerQuestion: num(rule.marksPerQuestion),
      examStyleOnly: rule.examStyleOnly === true,
    })),
  };
}

function toInput(section: SectionDraft): SectionInput {
  return {
    title: section.title,
    instructions: section.instructions || null,
    componentId: section.componentId || null,
    timeLimitMinutes: section.timeLimitMinutes ?? null,
    answerCount: section.answerCount ?? null,
    marks: section.marks ?? null,
    items: section.items.map((item) => ({ questionId: item.questionId, label: item.label || null, marks: item.marks ?? null })),
    rules: section.rules.map((rule) => ({
      topicId: rule.topicId || null,
      objectiveId: rule.objectiveId || null,
      includeSubtopics: rule.includeSubtopics,
      questionType: (rule.questionType || null) as BlueprintRuleInput["questionType"],
      cognitiveSkill: (rule.cognitiveSkill || null) as BlueprintRuleInput["cognitiveSkill"],
      difficultyMin: rule.difficultyMin,
      difficultyMax: rule.difficultyMax,
      questionCount: rule.questionCount,
      marksPerQuestion: rule.marksPerQuestion ?? null,
      examStyleOnly: rule.examStyleOnly,
    })),
  };
}

const NEW_RULE: RuleDraft = {
  topicId: "",
  objectiveId: "",
  includeSubtopics: true,
  questionType: "",
  cognitiveSkill: "",
  difficultyMin: 1,
  difficultyMax: 5,
  questionCount: 5,
  marksPerQuestion: undefined,
  examStyleOnly: false,
};

const TYPE_OPTIONS = QUESTION_TYPES.map((value) => ({ value, label: QUESTION_TYPE_LABELS[value] }));
const SKILL_OPTIONS = Object.values(CognitiveSkill).map((value) => ({ value, label: SKILL_LABELS[value] }));
const DIFFICULTY_OPTIONS = [1, 2, 3, 4, 5].map((value) => ({ value: String(value), label: DIFFICULTY_LABELS[value] ?? String(value) }));

export function AssessmentBuilder(props: AssessmentBuilderProps) {
  const { assessmentId, version, editable, usesRules } = props;
  const [sections, setSections] = useState<SectionDraft[]>(() => props.initialSections.map(toDraft));
  const [nextKey, setNextKey] = useState(props.initialSections.length);
  const [info, setInfo] = useState<Record<string, AssessmentQuestionInfo>>({ ...props.questionInfo });
  const [dirty, setDirty] = useState(false);
  const [check, setCheck] = useState<{ totals: Totals; blueprint: BlueprintReport | null } | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [checking, startCheck] = useTransition();
  const [state, formAction, pending] = useActionState<AdminActionState<{ id: string; version: string; totals: Totals }>, FormData>(props.saveAction, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<typeof state>(null);

  useEffect(() => {
    if (!state || handled.current === state || !state.ok) return;
    handled.current = state;
    toast({ title: "Structure saved.", tone: "success" });
    router.refresh();
  }, [state, toast, router]);

  const change = (next: SectionDraft[]) => {
    setSections(next);
    setDirty(true);
    setCheck(null);
  };
  const updateSection = (index: number, patch: Partial<SectionDraft>) => change(sections.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  const addSection = (patch: Partial<SectionDraft> = {}) => {
    change([...sections, { key: nextKey, title: `Section ${String.fromCharCode(65 + sections.length)}`, instructions: "", componentId: "", timeLimitMinutes: undefined, answerCount: undefined, marks: undefined, items: [], rules: [], ...patch }]);
    setNextKey((k) => k + 1);
  };
  const addFromPapers = () => {
    const missing = props.components.filter((c) => !sections.some((s) => s.componentId === c.value));
    let key = nextKey;
    const added = missing.map((c) => ({
      key: key++,
      title: c.label,
      instructions: "",
      componentId: c.value,
      timeLimitMinutes: c.durationMinutes ?? undefined,
      answerCount: undefined,
      marks: undefined,
      items: [],
      rules: [],
    }));
    change([...sections, ...added]);
    setNextKey(key);
  };

  const marksById = new Map(Object.entries(info).map(([id, q]) => [id, q.marks]));
  const totals = computeTotals(
    sections.map((s) => ({
      answerCount: s.answerCount ?? null,
      marks: s.marks ?? null,
      items: s.items.map((i) => ({ questionId: i.questionId, marks: i.marks ?? null })),
      rules: s.rules.map((r) => ({ questionCount: r.questionCount, marksPerQuestion: r.marksPerQuestion ?? null })),
    })),
    marksById,
  );
  const usedIds = sections.flatMap((s) => s.items.map((i) => i.questionId));
  const failure = state !== null && !state.ok ? state.error : null;
  const errors: FieldErrorMap = failure?.fieldErrors ?? {};
  const blueprint = check ? check.blueprint : dirty ? null : props.savedBlueprint;

  const runCheck = () => {
    setCheckError(null);
    startCheck(async () => {
      const result = await props.checkAction({ id: assessmentId, sections: sections.map(toInput) });
      if (result.ok) setCheck(result.data);
      else setCheckError(result.error.message);
    });
  };

  return (
    <EditorErrorsProvider errors={errors}>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={assessmentId} />
        <input type="hidden" name="version" value={version} />
        <input type="hidden" name="structure" value={JSON.stringify(sections.map(toInput))} />
        {failure && (
          <Alert tone="danger" role="alert" title="The structure was not saved">
            <p>{failure.message}</p>
            {failure.fieldErrors && (
              <ul className="mt-2 space-y-0.5 text-sm">
                {Object.entries(failure.fieldErrors).slice(0, 12).map(([key, messages]) => (
                  <li key={key}>
                    <span className="font-mono text-xs">{key}</span>: {messages.join(" ")}
                  </li>
                ))}
              </ul>
            )}
          </Alert>
        )}
        <div className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-subtle px-4 py-3 text-sm" aria-live="polite">
          <span>
            <strong className="text-text">{totals.exact ? totals.total : `at least ${totals.total}`}</strong> marks
          </span>
          <span className="text-muted">·</span>
          <span>{sections.reduce((n, s) => n + s.items.length + s.rules.reduce((m, r) => m + r.questionCount, 0), 0)} questions</span>
          <span className="text-muted">·</span>
          <span>{sections.length} {sections.length === 1 ? "section" : "sections"}</span>
          {!totals.exact && <span className="text-muted">Rules without a marks target keep each drawn question&apos;s own marks.</span>}
        </div>

        <fieldset disabled={!editable} className="min-w-0 space-y-4">
          <legend className="sr-only">Sections</legend>
          <BlockErrors path="sections" />
          <ol className="space-y-4">
            {sections.map((section, index) => (
              <SectionEditor
                key={section.key}
                index={index}
                count={sections.length}
                section={section}
                editable={editable}
                usesRules={usesRules}
                info={info}
                sectionTotal={totals.sections[index]}
                components={props.components}
                topics={props.topics}
                objectives={props.objectives}
                usedIds={usedIds}
                subjectId={props.subjectId}
                syllabusId={props.syllabusId}
                searchAction={props.searchAction}
                blueprint={blueprint}
                onChange={(patch) => updateSection(index, patch)}
                onMove={(from, to) => change(moveItem(sections, from, to))}
                onRemove={(i) => change(removeItem(sections, i))}
                onPicked={(question) => setInfo((current) => ({ ...current, [question.id]: { excerpt: question.excerpt, type: question.type, marks: question.marks, difficulty: question.difficulty, status: "PUBLISHED", topic: question.topic } }))}
              />
            ))}
          </ol>
          {editable && (
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" iconStart={<Plus aria-hidden="true" />} onClick={() => addSection()}>
                Add section
              </Button>
              {props.components.length > 0 && (
                <Button type="button" variant="outline" iconStart={<Layers aria-hidden="true" />} onClick={addFromPapers} disabled={props.components.every((c) => sections.some((s) => s.componentId === c.value))}>
                  Add a section per syllabus paper
                </Button>
              )}
            </div>
          )}
        </fieldset>

        {usesRules && (
          <section aria-label="Blueprint check" className="space-y-3 rounded-card border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-text">Can the published bank satisfy these rules?</h3>
              <Button type="button" variant="secondary" size="sm" iconStart={<ClipboardCheck aria-hidden="true" />} onClick={runCheck} loading={checking} loadingText="Checking…">
                Check now
              </Button>
            </div>
            {checkError && <p className="text-sm text-danger-text">{checkError}</p>}
            {blueprint ? <BlueprintSummary report={blueprint} /> : <p className="text-sm text-muted">{dirty ? "Rules changed: check again." : "No rules yet."}</p>}
          </section>
        )}

        {editable && (
          <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur sm:rounded-card sm:border">
            <Button type="submit" iconStart={<Save aria-hidden="true" />} loading={pending} loadingText="Saving…">
              Save structure
            </Button>
            <span className="text-sm text-muted" aria-live="polite">
              {dirty ? "Unsaved changes" : "All changes saved"}
            </span>
          </div>
        )}
      </form>
    </EditorErrorsProvider>
  );
}

function feasibilityText(result: Feasibility): string {
  if (!result.possible) return `Not enough questions: ${result.assignable} of ${result.required} can be drawn.`;
  if (!result.guaranteed) return `Possible (${result.required} questions), but overlapping rules may leave some attempts short.`;
  return `Every attempt can be filled (${result.required} questions).`;
}

function BlueprintSummary({ report }: { report: BlueprintReport }) {
  const audience = report.forAudience;
  return (
    <div className="space-y-2 text-sm">
      <p className={audience.possible ? (audience.guaranteed ? "text-success-text" : "text-warning-text") : "text-danger-text"}>
        For {report.audience}: {feasibilityText(audience)}
      </p>
      {report.forPremium && !audience.possible && <p className="text-muted">For premium students: {feasibilityText(report.forPremium)}</p>}
      <ul className="space-y-1">
        {report.positions.map((position, index) => {
          const rule = audience.rules[index];
          if (!rule) return null;
          return (
            <li key={`${position.section}-${position.rule}`} className="flex flex-wrap items-center gap-2">
              <span className="text-text">
                Section {position.section + 1}, rule {position.rule + 1}:
              </span>
              <span className="tabular-nums">
                {rule.capped ? `${rule.available}+` : rule.available} matching, needs {rule.required}
              </span>
              {rule.available < rule.required ? (
                <Badge size="sm" tone="danger">Too few</Badge>
              ) : rule.guaranteed ? (
                <Badge size="sm" tone="success">OK</Badge>
              ) : (
                <Badge size="sm" tone="warning">Overlaps earlier rules</Badge>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface SectionEditorProps {
  index: number;
  count: number;
  section: SectionDraft;
  editable: boolean;
  usesRules: boolean;
  info: Record<string, AssessmentQuestionInfo>;
  sectionTotal: Totals["sections"][number] | undefined;
  components: readonly ComponentOption[];
  topics: readonly TopicOption[];
  objectives: readonly ObjectiveOption[];
  usedIds: string[];
  subjectId: string;
  syllabusId: string | null;
  searchAction: AssessmentBuilderProps["searchAction"];
  blueprint: BlueprintReport | null;
  onChange: (patch: Partial<SectionDraft>) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  onPicked: (question: PickerQuestion) => void;
}

function SectionEditor(props: SectionEditorProps) {
  const { index, section, editable, info, onChange } = props;
  const path = `sections.${index}`;
  const topicOptions = props.topics.map((t) => ({ value: t.value, label: t.label }));
  return (
    <ListRow
      title={<span>Section {index + 1}{props.sectionTotal ? ` · ${props.sectionTotal.exact ? props.sectionTotal.total : `≥ ${props.sectionTotal.total}`} marks` : ""}</span>}
      controls={<RowControls index={index} count={props.count} itemLabel={`section ${index + 1}`} disabled={!editable} minCount={1} onMove={props.onMove} onRemove={props.onRemove} />}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_14rem]">
        <TextInput label="Title" value={section.title} maxLength={200} path={`${path}.title`} onChange={(title) => onChange({ title })} />
        <SelectInput
          label="Paper it simulates"
          optional
          value={section.componentId}
          placeholder={props.components.length === 0 ? "No papers in this version" : "None"}
          options={props.components}
          path={`${path}.componentId`}
          onChange={(componentId) => onChange({ componentId })}
        />
      </div>
      <TextAreaInput label="Section instructions" optional rows={2} value={section.instructions} path={`${path}.instructions`} onChange={(instructions) => onChange({ instructions })} />
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberInput label="Time limit (minutes)" optional hint="Blank: shares the overall limit." min={1} step={1} value={section.timeLimitMinutes} path={`${path}.timeLimitMinutes`} onChange={(timeLimitMinutes) => onChange({ timeLimitMinutes })} />
        <NumberInput label="Answer any" optional hint="Blank: answer all questions." min={1} step={1} value={section.answerCount} path={`${path}.answerCount`} onChange={(answerCount) => onChange({ answerCount })} />
        {section.answerCount !== undefined && (
          <NumberInput label="Section marks" hint="Answer-any sections state their total." min={0} step={1} value={section.marks} path={`${path}.marks`} onChange={(marks) => onChange({ marks })} />
        )}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-text">Fixed questions</h4>
        <BlockErrors path={`${path}.items`} />
        {section.items.length === 0 ? (
          <p className="text-sm text-muted">No fixed questions in this section.</p>
        ) : (
          <ol className="space-y-2">
            {section.items.map((item, i) => {
              const q = info[item.questionId];
              return (
                <li key={item.questionId} className="rounded-control border border-border p-2">
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="mt-1 w-6 shrink-0 text-sm font-semibold tabular-nums text-muted">{i + 1}.</span>
                    <div className="min-w-0 flex-1 text-sm">
                      <Link href={`/admin/questions/${item.questionId}`} className="font-medium text-text underline-offset-4 hover:underline">
                        {q?.excerpt || item.questionId}
                      </Link>
                      <span className="block text-xs text-muted">
                        {q ? `${QUESTION_TYPE_LABELS[q.type as keyof typeof QUESTION_TYPE_LABELS] ?? q.type} · difficulty ${q.difficulty} · ${q.marks} marks${q.topic ? ` · ${q.topic}` : ""}` : "Unknown question"}
                        {q && q.status !== "PUBLISHED" && <strong className="ml-1 text-danger-text">Not published</strong>}
                      </span>
                      <BlockErrors path={`${path}.items.${i}.questionId`} />
                    </div>
                    <div className="flex items-end gap-2">
                      <label className="text-xs text-muted">
                        Label
                        <input value={item.label} maxLength={16} placeholder={String(i + 1)} onChange={(e) => onChange({ items: section.items.map((it, j) => (j === i ? { ...it, label: e.target.value } : it)) })} className="mt-0.5 block min-h-9 w-16 rounded-control border border-border bg-surface px-2 text-sm text-text" />
                      </label>
                      <label className="text-xs text-muted">
                        Marks
                        <input
                          inputMode="numeric"
                          value={item.marks ?? ""}
                          placeholder={q ? String(q.marks) : ""}
                          onChange={(e) => onChange({ items: section.items.map((it, j) => (j === i ? { ...it, marks: parseWhole(e.target.value) } : it)) })}
                          className="mt-0.5 block min-h-9 w-16 rounded-control border border-border bg-surface px-2 text-sm text-text"
                        />
                      </label>
                      <RowControls
                        index={i}
                        count={section.items.length}
                        itemLabel={`question ${i + 1}`}
                        disabled={!editable}
                        onMove={(from, to) => onChange({ items: moveItem(section.items, from, to) })}
                        onRemove={(j) => onChange({ items: removeItem(section.items, j) })}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        {editable && (
          <QuestionPicker
            subjectId={props.subjectId}
            syllabusId={props.syllabusId}
            topics={topicOptions}
            excludeIds={props.usedIds}
            searchAction={props.searchAction}
            onPick={(question) => {
              props.onPicked(question);
              onChange({ items: [...section.items, { questionId: question.id, label: "", marks: undefined }] });
            }}
          />
        )}
      </div>

      {(props.usesRules || section.rules.length > 0) && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-text">Blueprint rules</h4>
          <p className="text-sm text-muted">Each attempt draws its own questions from the published bank by these rules.</p>
          <BlockErrors path={`${path}.rules`} />
          <ol className="space-y-3">
            {section.rules.map((rule, r) => {
              const rulePath = `${path}.rules.${r}`;
              const setRule = (patch: Partial<RuleDraft>) => onChange({ rules: section.rules.map((x, j) => (j === r ? { ...x, ...patch } : x)) });
              const objectiveOptions = props.objectives.filter((o) => !rule.topicId || o.topicId === rule.topicId).map((o) => ({ value: o.value, label: o.label }));
              return (
                <ListRow
                  key={r}
                  title={`Rule ${r + 1}`}
                  controls={
                    <RowControls
                      index={r}
                      count={section.rules.length}
                      itemLabel={`rule ${r + 1}`}
                      disabled={!editable}
                      onMove={(from, to) => onChange({ rules: moveItem(section.rules, from, to) })}
                      onRemove={(j) => onChange({ rules: removeItem(section.rules, j) })}
                    />
                  }
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <SelectInput label="Topic" value={rule.topicId} placeholder="The assessment's whole scope" options={topicOptions} path={`${rulePath}.topicId`} onChange={(topicId) => setRule({ topicId, objectiveId: "" })} />
                    <SelectInput label="Learning objective" optional value={rule.objectiveId} placeholder="Any" options={objectiveOptions} path={`${rulePath}.objectiveId`} onChange={(objectiveId) => setRule({ objectiveId })} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <NumberInput label="Questions to draw" min={1} max={200} step={1} value={rule.questionCount} path={`${rulePath}.questionCount`} onChange={(questionCount) => setRule({ questionCount: questionCount ?? 0 })} />
                    <SelectInput label="Easiest" value={String(rule.difficultyMin)} options={DIFFICULTY_OPTIONS} path={`${rulePath}.difficultyMin`} onChange={(v) => setRule({ difficultyMin: Number(v) })} />
                    <SelectInput label="Hardest" value={String(rule.difficultyMax)} options={DIFFICULTY_OPTIONS} path={`${rulePath}.difficultyMax`} onChange={(v) => setRule({ difficultyMax: Number(v) })} />
                    <NumberInput label="Marks per question" optional hint="Blank: any." min={1} step={1} value={rule.marksPerQuestion} path={`${rulePath}.marksPerQuestion`} onChange={(marksPerQuestion) => setRule({ marksPerQuestion })} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <SelectInput label="Question type" optional value={rule.questionType} placeholder="Any type" options={TYPE_OPTIONS} path={`${rulePath}.questionType`} onChange={(questionType) => setRule({ questionType })} />
                    <SelectInput label="Skill tested" optional value={rule.cognitiveSkill} placeholder="Any skill" options={SKILL_OPTIONS} path={`${rulePath}.cognitiveSkill`} onChange={(cognitiveSkill) => setRule({ cognitiveSkill })} />
                  </div>
                  <div className="flex flex-wrap gap-x-6">
                    <CheckboxInput label="Include subtopics" checked={rule.includeSubtopics} onChange={(includeSubtopics) => setRule({ includeSubtopics })} />
                    <CheckboxInput label="Exam-style questions only" checked={rule.examStyleOnly} onChange={(examStyleOnly) => setRule({ examStyleOnly })} />
                  </div>
                  <RuleStatus report={props.blueprint} section={index} rule={r} />
                </ListRow>
              );
            })}
          </ol>
          {editable && props.usesRules && (
            <Button type="button" size="sm" variant="outline" iconStart={<ListPlus aria-hidden="true" />} onClick={() => onChange({ rules: [...section.rules, { ...NEW_RULE }] })} disabled={!props.syllabusId}>
              Add rule
            </Button>
          )}
        </div>
      )}
    </ListRow>
  );
}

function RuleStatus({ report, section, rule }: { report: BlueprintReport | null; section: number; rule: number }) {
  if (!report) return null;
  const index = report.positions.findIndex((p) => p.section === section && p.rule === rule);
  const result = report.forAudience.rules[index];
  if (!result) return null;
  const tone = result.available < result.required ? "text-danger-text" : result.guaranteed ? "text-success-text" : "text-warning-text";
  return (
    <p className={`text-sm ${tone}`}>
      {result.capped ? `${result.available}+` : result.available} published questions match ({result.required} needed).
    </p>
  );
}

function QuestionPicker({
  subjectId,
  syllabusId,
  topics,
  excludeIds,
  searchAction,
  onPick,
}: {
  subjectId: string;
  syllabusId: string | null;
  topics: Option[];
  excludeIds: string[];
  searchAction: AssessmentBuilderProps["searchAction"];
  onPick: (question: PickerQuestion) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ topicId: "", type: "", difficulty: "", q: "" });
  const [results, setResults] = useState<PickerQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const search = () => {
    setError(null);
    start(async () => {
      const outcome = await searchAction({ subjectId, syllabusId, ...filters, excludeIds, limit: 30 });
      if (outcome.ok) setResults(outcome.data);
      else setError(outcome.error.message);
    });
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next && results === null) search();
      }}
      size="lg"
      title="Add published questions"
      description="Only published questions of the platform bank can be set. Questions already in the assessment are hidden."
      trigger={
        <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />}>
          Add questions
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectInput label="Topic (and subtopics)" value={filters.topicId} placeholder="Any topic" options={topics} onChange={(topicId) => setFilters((f) => ({ ...f, topicId }))} />
          <SelectInput label="Type" value={filters.type} placeholder="Any type" options={TYPE_OPTIONS} onChange={(type) => setFilters((f) => ({ ...f, type }))} />
          <SelectInput label="Difficulty" value={filters.difficulty} placeholder="Any" options={DIFFICULTY_OPTIONS} onChange={(difficulty) => setFilters((f) => ({ ...f, difficulty }))} />
          <TextInput label="Text or id" value={filters.q} onChange={(q) => setFilters((f) => ({ ...f, q }))} />
        </div>
        <Button type="button" variant="secondary" iconStart={<Search aria-hidden="true" />} onClick={search} loading={pending} loadingText="Searching…">
          Search
        </Button>
        {error && <p className="text-sm text-danger-text">{error}</p>}
        <div aria-live="polite">
          {results !== null && results.length === 0 && <p className="text-sm text-muted">No published questions match. Publish questions in the bank first.</p>}
          {results !== null && results.length > 0 && (
            <ul className="max-h-[50vh] divide-y divide-border overflow-y-auto rounded-card border border-border">
              {results.map((question) => (
                <li key={question.id} className="flex items-start gap-3 p-3">
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium text-text">{question.excerpt}</p>
                    <p className="text-xs text-muted">
                      {QUESTION_TYPE_LABELS[question.type]} · difficulty {question.difficulty} · {question.marks} marks
                      {question.topic ? ` · ${question.topic}` : ""}
                      {question.isExamStyle ? " · exam style" : ""}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      onPick(question);
                      setResults((current) => current?.filter((q) => q.id !== question.id) ?? null);
                    }}
                  >
                    Add
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Dialog>
  );
}
