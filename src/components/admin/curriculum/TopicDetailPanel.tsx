"use client";

import { ArrowDown, ArrowLeftToLine, ArrowRightToLine, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import type { AdminActionState } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ConfirmButton } from "./ConfirmButton";
import { TopicKindBadge } from "./CurriculumBadges";
import { COGNITIVE_SKILL_OPTIONS, TOPIC_KIND_OPTIONS } from "./labels";
import type { TopicCommand } from "./topic-commands";
import type { EditorNode, EditorObjective } from "./tree-model";

/**
 * Detail panel of the topic tree editor: structure buttons (up/down, indent/outdent, move under, add a child, delete —
 * all touch friendly), the node's edit form (or the wording-correction form on a published version) and its learning
 * objectives. Every change is a command the server validates and audits.
 */

export type RunCommand = (command: TopicCommand) => Promise<AdminActionState>;

/** Plain object of a form's fields (repeated names become arrays). */
export function formObject(form: HTMLFormElement): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value !== "string") continue;
    const previous = out[key];
    out[key] = previous === undefined ? value : Array.isArray(previous) ? [...previous, value] : [previous, value];
  }
  return out;
}

function errorsOf(state: AdminActionState): Record<string, string[]> {
  return state && !state.ok ? (state.error.fieldErrors ?? {}) : {};
}

function FormError({ state }: { state: AdminActionState }) {
  if (!state || state.ok) return null;
  const formErrors = state.error.fieldErrors?._form;
  return (
    <Alert tone="danger" role="alert">
      {formErrors?.join(" ") ?? state.error.message}
    </Alert>
  );
}

export interface TopicDetailPanelProps {
  syllabusId: string;
  node: EditorNode;
  path: string[];
  isFirst: boolean;
  isLast: boolean;
  editable: boolean;
  canCorrect: boolean;
  components: readonly { id: string; code: string; name: string }[];
  /** Valid "move under" targets (never the node's own subtree). */
  moveTargets: readonly { id: string; label: string }[];
  pending: boolean;
  run: RunCommand;
  onSelect: (id: string, parentId?: string) => void;
}

export function TopicDetailPanel(props: TopicDetailPanelProps) {
  const { node, editable, canCorrect } = props;
  const tagTotal = node.tags.questions + node.tags.lessons + node.tags.flashcards;
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        {props.path.length > 0 && <p className="text-sm text-muted">{props.path.join(" › ")}</p>}
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-text">
          <TopicKindBadge kind={node.kind} />
          {node.code && <span className="font-mono text-base text-muted">{node.code}</span>}
          <span>{node.name}</span>
        </h2>
        <p className="text-sm text-muted">
          Tagged content: {node.tags.questions} questions, {node.tags.lessons} lessons, {node.tags.flashcards} flashcards · {node.objectives.length} objectives
        </p>
      </div>

      {editable && <StructureToolbar {...props} tagTotal={tagTotal} />}
      {editable ? <TopicEditForm key={`edit-${node.id}`} {...props} /> : canCorrect ? <WordingForm key={`correct-${node.id}`} {...props} /> : <ReadOnlyDetails node={node} />}
      <ObjectivesSection key={`objectives-${node.id}`} {...props} />
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Structure
// ---------------------------------------------------------------------------------------------------------------------

function StructureToolbar({ syllabusId, node, isFirst, isLast, moveTargets, pending, run, onSelect, tagTotal }: TopicDetailPanelProps & { tagTotal: number }) {
  const [moveTo, setMoveTo] = useState("");
  const [childState, setChildState] = useState<AdminActionState>(null);
  const [childFormKey, setChildFormKey] = useState(0);
  const command = (type: "move" | "shift", input: { id: string; direction: "up" | "down" } | { id: string; operation: "indent" | "outdent" }) =>
    run({ type, syllabusId, input } as TopicCommand);

  async function addChild(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = formObject(event.currentTarget);
    const result = await run({
      type: "add",
      syllabusId,
      input: { syllabusId, parentId: node.id, name: String(values.name ?? ""), code: String(values.code ?? "") || null, kind: null },
    });
    setChildState(result);
    if (result?.ok) {
      setChildFormKey((key) => key + 1);
      const created = result.data as { id?: string } | undefined;
      if (created?.id) onSelect(created.id, node.id);
    }
  }

  const childErrors = errorsOf(childState);
  return (
    <section aria-label="Structure" className="space-y-3 rounded-card border border-border p-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" iconStart={<ArrowUp aria-hidden="true" />} disabled={pending || isFirst} onClick={() => command("move", { id: node.id, direction: "up" })}>
          Move up
        </Button>
        <Button variant="outline" iconStart={<ArrowDown aria-hidden="true" />} disabled={pending || isLast} onClick={() => command("move", { id: node.id, direction: "down" })}>
          Move down
        </Button>
        <Button variant="outline" iconStart={<ArrowRightToLine aria-hidden="true" />} disabled={pending || isFirst} onClick={() => command("shift", { id: node.id, operation: "indent" })}>
          Indent
        </Button>
        <Button variant="outline" iconStart={<ArrowLeftToLine aria-hidden="true" />} disabled={pending || node.parentId === null} onClick={() => command("shift", { id: node.id, operation: "outdent" })}>
          Outdent
        </Button>
        <ConfirmButton
          label="Delete"
          icon={<Trash2 aria-hidden="true" />}
          variant="ghost"
          disabled={pending}
          title={`Delete "${node.name}"?`}
          description={node.children.length > 0 ? "Its subtopics and every learning objective below it are deleted too." : "Its learning objectives are deleted too."}
          confirmLabel="Delete"
          onConfirm={() => run({ type: "delete", syllabusId, input: { id: node.id } })}
        >
          {tagTotal > 0 ? <p className="text-sm">Content is tagged to this topic, so it cannot be deleted until those tags are moved.</p> : null}
        </ConfirmButton>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <Field label="Move under" className="sm:flex-1">
          <Select value={moveTo} onChange={(event) => setMoveTo(event.target.value)}>
            <option value="">Choose a new parent…</option>
            {node.parentId !== null && <option value="__root__">Top level</option>}
            {moveTargets.map((target) => (
              <option key={target.id} value={target.id}>
                {target.label}
              </option>
            ))}
          </Select>
        </Field>
        <Button
          size="md"
          variant="secondary"
          disabled={pending || moveTo === ""}
          onClick={async () => {
            const result = await run({ type: "reparent", syllabusId, input: { id: node.id, parentId: moveTo === "__root__" ? null : moveTo } });
            if (result?.ok) setMoveTo("");
          }}
        >
          Move
        </Button>
      </div>
      <form key={childFormKey} onSubmit={addChild} className="flex flex-col gap-2 sm:flex-row sm:items-end" aria-label={`Add a child of ${node.name}`}>
        <Field label="New child name" error={childErrors.name} className="sm:flex-1">
          <Input name="name" required maxLength={200} />
        </Field>
        <Field label="Code" optional error={childErrors.code} className="sm:w-28">
          <Input name="code" maxLength={32} className="font-mono" />
        </Field>
        <Button type="submit" size="md" variant="secondary" iconStart={<Plus aria-hidden="true" />} disabled={pending}>
          Add child
        </Button>
      </form>
      {childState && !childState.ok && !childErrors.name && <FormError state={childState} />}
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Edit forms
// ---------------------------------------------------------------------------------------------------------------------

function TopicEditForm({ syllabusId, node, components, pending, run }: TopicDetailPanelProps) {
  const [state, setState] = useState<AdminActionState>(null);
  const [slug, setSlug] = useState(node.slug);
  const errors = errorsOf(state);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(await run({ type: "update", syllabusId, input: { ...formObject(event.currentTarget), id: node.id } }));
  }
  const slugChanged = node.originSlug !== null && slug.trim() !== "" && slug.trim() !== node.originSlug;
  return (
    <form onSubmit={submit} className="space-y-4" aria-label={`Edit ${node.name}`}>
      <FormError state={state} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" required error={errors.name} className="md:col-span-2">
          <Input name="name" defaultValue={node.name} maxLength={200} />
        </Field>
        <Field label="Kind" error={errors.kind}>
          <Select name="kind" defaultValue={node.kind} options={TOPIC_KIND_OPTIONS} />
        </Field>
        <Field label="Official reference" optional error={errors.code} hint='e.g. "1.2" or "E1.1"'>
          <Input name="code" defaultValue={node.code ?? ""} maxLength={32} className="font-mono" />
        </Field>
        <Field
          label="URL slug"
          optional
          error={errors.slug}
          className="md:col-span-2"
          hint={
            slugChanged
              ? `The previous version used "${node.originSlug}". The public topic URL changes when this version becomes current.`
              : "Stable across versions so public URLs keep working. Leave blank to derive it from the name."
          }
        >
          <Input name="slug" value={slug} onChange={(event) => setSlug(event.target.value)} maxLength={120} className="font-mono" />
        </Field>
        <Field label="Estimated study time (minutes)" optional error={errors.estimatedStudyMinutes}>
          <Input name="estimatedStudyMinutes" type="number" min={1} defaultValue={node.estimatedStudyMinutes ?? ""} />
        </Field>
        <Field label="Option group" optional error={errors.optionGroup} hint='Groups alternatives, e.g. "Depth study (choose one)".'>
          <Input name="optionGroup" defaultValue={node.optionGroup ?? ""} maxLength={64} />
        </Field>
        <Field label="Examined from year" optional error={errors.examYearFrom}>
          <Input name="examYearFrom" type="number" min={2000} max={2100} defaultValue={node.examYearFrom ?? ""} />
        </Field>
        <Field label="Examined until year" optional error={errors.examYearTo}>
          <Input name="examYearTo" type="number" min={2000} max={2100} defaultValue={node.examYearTo ?? ""} />
        </Field>
        <div className="md:col-span-2">
          <Checkbox name="isOptional" label="Optional topic" description="Students choose between optional topics (e.g. set texts)." defaultChecked={node.isOptional} />
          <Checkbox name="isPublic" label="Public SEO page" description="Show an original summary of this topic on the public site." defaultChecked={node.isPublic} />
        </div>
        {components.length > 0 && (
          <fieldset className="md:col-span-2" aria-describedby={errors.componentIds ? `papers-error-${node.id}` : undefined}>
            <legend className="text-sm font-medium text-text">Examined in papers</legend>
            <p className="text-sm text-muted">None ticked means every paper of the version.</p>
            <div className="flex flex-wrap gap-x-6">
              {components.map((component) => (
                <Checkbox key={component.id} name="componentIds" value={component.id} label={`${component.code} ${component.name}`} defaultChecked={node.componentIds.includes(component.id)} />
              ))}
            </div>
            {errors.componentIds && (
              <p id={`papers-error-${node.id}`} className="text-sm text-danger-text">
                {errors.componentIds.join(" ")}
              </p>
            )}
          </fieldset>
        )}
        <Field label="Scope / description (Markdown)" optional error={errors.description} className="md:col-span-2" hint="Official wording only where the board permits it.">
          <Textarea name="description" defaultValue={node.description ?? ""} rows={3} className="font-mono text-sm" />
        </Field>
        <Field label="Public summary (Markdown)" optional error={errors.publicSummary} className="md:col-span-2" hint="Original text for the public topic page; never premium lesson content.">
          <Textarea name="publicSummary" defaultValue={node.publicSummary ?? ""} rows={3} className="font-mono text-sm" />
        </Field>
        <Field label="SEO title" optional error={errors.metaTitle}>
          <Input name="metaTitle" defaultValue={node.metaTitle ?? ""} maxLength={70} />
        </Field>
        <Field label="SEO description" optional error={errors.metaDescription}>
          <Input name="metaDescription" defaultValue={node.metaDescription ?? ""} maxLength={170} />
        </Field>
      </div>
      <Button type="submit" loading={pending} loadingText="Saving…">
        Save topic
      </Button>
    </form>
  );
}

function WordingForm({ syllabusId, node, pending, run }: TopicDetailPanelProps) {
  const [state, setState] = useState<AdminActionState>(null);
  const errors = errorsOf(state);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState(await run({ type: "correct", syllabusId, input: { ...formObject(event.currentTarget), id: node.id } }));
  }
  return (
    <form onSubmit={submit} className="space-y-4" aria-label={`Correct the wording of ${node.name}`}>
      <p className="text-sm text-muted">This version is published: its structure, codes and slugs are frozen. You can still correct wording.</p>
      <FormError state={state} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" required error={errors.name} className="md:col-span-2">
          <Input name="name" defaultValue={node.name} maxLength={200} />
        </Field>
        <Field label="Scope / description (Markdown)" optional error={errors.description} className="md:col-span-2">
          <Textarea name="description" defaultValue={node.description ?? ""} rows={3} className="font-mono text-sm" />
        </Field>
        <Field label="Public summary (Markdown)" optional error={errors.publicSummary} className="md:col-span-2">
          <Textarea name="publicSummary" defaultValue={node.publicSummary ?? ""} rows={3} className="font-mono text-sm" />
        </Field>
        <Field label="SEO title" optional error={errors.metaTitle}>
          <Input name="metaTitle" defaultValue={node.metaTitle ?? ""} maxLength={70} />
        </Field>
        <Field label="SEO description" optional error={errors.metaDescription}>
          <Input name="metaDescription" defaultValue={node.metaDescription ?? ""} maxLength={170} />
        </Field>
        <Field label="Estimated study time (minutes)" optional error={errors.estimatedStudyMinutes}>
          <Input name="estimatedStudyMinutes" type="number" min={1} defaultValue={node.estimatedStudyMinutes ?? ""} />
        </Field>
        <Checkbox name="isPublic" label="Public SEO page" defaultChecked={node.isPublic} />
      </div>
      <Button type="submit" loading={pending} loadingText="Saving…">
        Save corrections
      </Button>
    </form>
  );
}

function ReadOnlyDetails({ node }: { node: EditorNode }) {
  const rows: [string, ReactNode][] = [
    ["Slug", <span key="slug" className="font-mono">{node.slug}</span>],
    ["Public page", node.isPublic ? "Yes" : "No"],
    ["Optional", node.isOptional ? `Yes${node.optionGroup ? ` (${node.optionGroup})` : ""}` : "No"],
    ["Study time", node.estimatedStudyMinutes ? `${node.estimatedStudyMinutes} min` : "—"],
    ["Description", node.description ?? "—"],
  ];
  return (
    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <dt className="text-muted">{label}</dt>
          <dd className="mt-0.5 break-words whitespace-pre-line text-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Learning objectives
// ---------------------------------------------------------------------------------------------------------------------

function ObjectivesSection({ syllabusId, node, editable, canCorrect, pending, run }: TopicDetailPanelProps) {
  const [addState, setAddState] = useState<AdminActionState>(null);
  const [addKey, setAddKey] = useState(0);
  const addErrors = errorsOf(addState);
  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = formObject(event.currentTarget);
    const result = await run({
      type: "objective.add",
      syllabusId,
      input: { topicId: node.id, statement: String(values.statement ?? ""), code: String(values.code ?? "") || null, cognitiveSkill: String(values.cognitiveSkill ?? "") || null },
    });
    setAddState(result);
    if (result?.ok) setAddKey((key) => key + 1);
  }
  return (
    <section aria-labelledby={`objectives-${node.id}`} className="space-y-3">
      <h3 id={`objectives-${node.id}`} className="text-base font-semibold text-text">
        Learning objectives
      </h3>
      {node.objectives.length === 0 ? (
        <p className="text-sm text-muted">No learning objectives on this node.</p>
      ) : (
        <ol className="divide-y divide-border rounded-card border border-border">
          {node.objectives.map((objective, index) => (
            <ObjectiveRow
              key={objective.id}
              syllabusId={syllabusId}
              objective={objective}
              isFirst={index === 0}
              isLast={index === node.objectives.length - 1}
              editable={editable}
              canCorrect={canCorrect}
              pending={pending}
              run={run}
            />
          ))}
        </ol>
      )}
      {editable && (
        <form key={addKey} onSubmit={add} className="space-y-3 rounded-card border border-dashed border-border p-3" aria-label="Add a learning objective">
          <FormError state={addState && !addState.ok && !addErrors.statement ? addState : null} />
          <Field label="New objective" error={addErrors.statement}>
            <Textarea name="statement" rows={2} maxLength={1000} required />
          </Field>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <Field label="Reference" optional error={addErrors.code} className="sm:w-32">
              <Input name="code" maxLength={32} className="font-mono" />
            </Field>
            <Field label="Skill tested" optional className="sm:flex-1">
              <Select name="cognitiveSkill" options={COGNITIVE_SKILL_OPTIONS} placeholder="Not set" />
            </Field>
            <Button type="submit" variant="secondary" iconStart={<Plus aria-hidden="true" />} disabled={pending}>
              Add objective
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

function ObjectiveRow({
  syllabusId,
  objective,
  isFirst,
  isLast,
  editable,
  canCorrect,
  pending,
  run,
}: {
  syllabusId: string;
  objective: EditorObjective;
  isFirst: boolean;
  isLast: boolean;
  editable: boolean;
  canCorrect: boolean;
  pending: boolean;
  run: RunCommand;
}) {
  const [state, setState] = useState<AdminActionState>(null);
  const errors = errorsOf(state);
  const skill = COGNITIVE_SKILL_OPTIONS.find((option) => option.value === objective.cognitiveSkill)?.label;
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = formObject(event.currentTarget);
    setState(
      await run({
        type: "objective.update",
        syllabusId,
        input: {
          id: objective.id,
          statement: String(values.statement ?? ""),
          code: editable ? String(values.code ?? "") || null : objective.code,
          cognitiveSkill: String(values.cognitiveSkill ?? "") || null,
        },
      }),
    );
  }
  return (
    <li className="space-y-2 px-3 py-2">
      <p className="text-sm text-text">
        {objective.code && <span className="mr-2 font-mono text-muted">{objective.code}</span>}
        {objective.statement}
        {skill && <span className="ml-2 text-muted">({skill})</span>}
      </p>
      {(editable || canCorrect) && (
        <details>
          <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary">{editable ? "Edit" : "Correct wording"}</summary>
          <form onSubmit={save} className="mt-2 space-y-3" aria-label="Edit learning objective">
            <FormError state={state && !state.ok && !errors.statement && !errors.code ? state : null} />
            <Field label="Objective" error={errors.statement}>
              <Textarea name="statement" defaultValue={objective.statement} rows={2} maxLength={1000} />
            </Field>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Field label="Reference" optional error={errors.code} className="sm:w-32" hint={editable ? undefined : "Frozen"}>
                <Input name="code" defaultValue={objective.code ?? ""} maxLength={32} className="font-mono" disabled={!editable} />
              </Field>
              <Field label="Skill tested" optional className="sm:flex-1">
                <Select name="cognitiveSkill" defaultValue={objective.cognitiveSkill ?? ""} options={COGNITIVE_SKILL_OPTIONS} placeholder="Not set" />
              </Field>
              <Button type="submit" variant="secondary" disabled={pending}>
                Save
              </Button>
            </div>
          </form>
        </details>
      )}
      {editable && (
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" iconStart={<ArrowUp aria-hidden="true" />} disabled={pending || isFirst} onClick={() => run({ type: "objective.move", syllabusId, input: { id: objective.id, direction: "up" } })}>
            Up
          </Button>
          <Button variant="ghost" iconStart={<ArrowDown aria-hidden="true" />} disabled={pending || isLast} onClick={() => run({ type: "objective.move", syllabusId, input: { id: objective.id, direction: "down" } })}>
            Down
          </Button>
          <ConfirmButton
            label="Delete"
            variant="ghost"
            icon={<Trash2 aria-hidden="true" />}
            disabled={pending}
            title="Delete this learning objective?"
            confirmLabel="Delete"
            onConfirm={() => run({ type: "objective.delete", syllabusId, input: { id: objective.id } })}
          >
            <p className="text-sm">{objective.statement}</p>
          </ConfirmButton>
        </div>
      )}
    </li>
  );
}
