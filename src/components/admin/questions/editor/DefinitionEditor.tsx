"use client";

import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { QUESTION_TYPES, type MarkingMode, type QuestionType } from "@/lib/questions/constants";
import { MARKING_MODE_LABELS, QUESTION_TYPE_LABELS, optionsOf } from "../labels";
import { asRecord, compact, newPart, newSubPart, nextPartLabel, partsTotal, withType, type DefinitionDraft, type PartDraft } from "../model";
import { MultipleChoiceEditor, TrueFalseEditor } from "./ChoiceEditors";
import { DiagramEditor } from "./DiagramEditor";
import { BlockErrors, ListRow, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextAreaInput, TextInput } from "./fields";
import { MarkdownField } from "./MarkdownField";
import { NumericEditor } from "./NumericEditor";
import { BlanksEditor, MatchingEditor } from "./PairingEditors";
import { OpenResponseEditor, ShortAnswerEditor } from "./TextEditors";
import type { AnswerEditorProps } from "./types";

/**
 * The answer editor of one definition (question, part or sub-part), chosen by type, plus the marker notes every type
 * may carry. STRUCTURED definitions edit their parts instead (one nesting level: "(b)(i)").
 */
export function AnswerEditor(props: AnswerEditorProps & { level: 0 | 1 | 2 }) {
  const { draft, onChange, path, disabled, level } = props;
  const spec = asRecord(draft.answerSpec);
  let editor: ReactNode;
  switch (draft.type) {
    case "MULTIPLE_CHOICE":
      editor = <MultipleChoiceEditor {...props} />;
      break;
    case "TRUE_FALSE":
      editor = <TrueFalseEditor {...props} />;
      break;
    case "SHORT_ANSWER":
      editor = <ShortAnswerEditor {...props} />;
      break;
    case "NUMERICAL":
    case "CALCULATION":
      editor = <NumericEditor {...props} />;
      break;
    case "MATCHING":
      editor = <MatchingEditor {...props} />;
      break;
    case "FILL_IN_THE_BLANK":
      editor = <BlanksEditor {...props} />;
      break;
    case "DIAGRAM_LABELLING":
      editor = <DiagramEditor {...props} />;
      break;
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      editor = <OpenResponseEditor {...props} />;
      break;
    case "STRUCTURED":
      return <PartsEditor {...props} level={level === 0 ? 1 : 2} />;
  }
  return (
    <div className="grid gap-5">
      <BlockErrors path={`${path}payload`} />
      <BlockErrors path={`${path}answerSpec`} />
      {editor}
      <TextAreaInput
        label="Notes for markers"
        optional
        hint="Guidance for AI and human markers (not shown to students)."
        rows={2}
        value={typeof spec.markingNotes === "string" ? spec.markingNotes : ""}
        disabled={disabled}
        path={`${path}answerSpec.markingNotes`}
        onChange={(markingNotes) => onChange({ answerSpec: compact({ ...spec, markingNotes }) })}
      />
    </div>
  );
}

const TYPE_OPTIONS = QUESTION_TYPES.map((value) => ({ value, label: QUESTION_TYPE_LABELS[value] }));
const PART_TYPE_OPTIONS = TYPE_OPTIONS.filter((option) => option.value !== "STRUCTURED");
const MARKING_OPTIONS = optionsOf(MARKING_MODE_LABELS);

/** Type, marking mode and marks of a definition (the marks of a structured definition are the sum of its parts). */
export function DefinitionHeader({
  draft,
  onChange,
  path,
  disabled,
  level,
  lockType = false,
}: {
  draft: DefinitionDraft;
  onChange: (patch: Partial<DefinitionDraft>) => void;
  path: string;
  disabled?: boolean;
  level: 0 | 1 | 2;
  lockType?: boolean;
}) {
  const structured = draft.type === "STRUCTURED";
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SelectInput
        label="Question type"
        hint={lockType ? undefined : "Changing the type starts the answer again."}
        value={draft.type}
        options={level === 2 ? PART_TYPE_OPTIONS : TYPE_OPTIONS}
        disabled={disabled || lockType}
        path={`${path}type`}
        onChange={(value) => onChange(withType(draft, value as QuestionType, level))}
      />
      {!structured && (
        <SelectInput
          label="Marking"
          value={draft.markingMode}
          options={MARKING_OPTIONS}
          disabled={disabled}
          path={`${path}markingMode`}
          onChange={(value) => onChange({ markingMode: value as MarkingMode })}
        />
      )}
      {structured ? (
        <p className="self-end pb-3 text-sm text-muted">
          Worth <strong className="text-text">{partsTotal(draft.parts ?? [])}</strong> marks (the sum of its parts).
        </p>
      ) : (
        <NumberInput label="Marks" min={1} max={1000} step={1} value={draft.marks} disabled={disabled} path={`${path}marks`} onChange={(marks) => onChange({ marks: marks ?? 0 })} />
      )}
    </div>
  );
}

/** The parts (a), (b)… of a STRUCTURED question, or the sub-parts (i), (ii)… of a structured part. */
function PartsEditor({ draft, onChange, path, disabled, media, level }: AnswerEditorProps & { level: 1 | 2 }) {
  const parts = draft.parts ?? [];
  const [newType, setNewType] = useState<QuestionType>("SHORT_ANSWER");
  const setParts = (next: PartDraft[]) => onChange({ parts: next, marks: partsTotal(next) });
  const updatePart = (index: number, patch: Partial<PartDraft>) => setParts(parts.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  return (
    <div className="grid gap-4">
      <BlockErrors path={`${path}parts`} />
      <ol className="space-y-4">
        {parts.map((part, index) => {
          const partPath = `${path}parts.${index}.`;
          return (
            <ListRow
              key={part.id ?? `new-${index}`}
              title={<span>Part {part.partLabel || index + 1}</span>}
              controls={
                <RowControls
                  index={index}
                  count={parts.length}
                  itemLabel={`part ${part.partLabel}`}
                  disabled={disabled}
                  minCount={1}
                  onMove={(from, to) => setParts(moveItem(parts, from, to))}
                  onRemove={(i) => setParts(removeItem(parts, i))}
                />
              }
              className="border-l-4 border-l-primary/40"
            >
              <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                <TextInput label="Label" value={part.partLabel} maxLength={16} disabled={disabled} path={`${partPath}partLabel`} onChange={(partLabel) => updatePart(index, { partLabel })} />
                <DefinitionHeader draft={part as DefinitionDraft} level={level} path={partPath} disabled={disabled} onChange={(patch) => updatePart(index, patch as Partial<PartDraft>)} />
              </div>
              <MarkdownField label="Part question" rows={3} value={part.stem} disabled={disabled} path={`${partPath}stem`} onChange={(stem) => updatePart(index, { stem })} />
              <AnswerEditor
                draft={part as DefinitionDraft}
                onChange={(patch) => updatePart(index, patch as Partial<PartDraft>)}
                path={partPath}
                disabled={disabled}
                media={media}
                level={level}
              />
              <details className="rounded-card border border-border p-3">
                <summary className="cursor-pointer text-sm font-semibold text-text">Feedback for this part</summary>
                <div className="mt-3 grid gap-3">
                  <MarkdownField label="Explanation" optional rows={3} value={part.explanation ?? ""} disabled={disabled} path={`${partPath}explanation`} onChange={(explanation) => updatePart(index, { explanation })} />
                  <MarkdownField label="Worked solution" optional rows={3} value={part.workedSolution ?? ""} disabled={disabled} path={`${partPath}workedSolution`} onChange={(workedSolution) => updatePart(index, { workedSolution })} />
                </div>
              </details>
            </ListRow>
          );
        })}
      </ol>
      <div className="flex flex-wrap items-end gap-2">
        <SelectInput label="New part type" value={newType} options={PART_TYPE_OPTIONS} disabled={disabled} onChange={(value) => setNewType(value as QuestionType)} className="sm:w-64" />
        <Button
          type="button"
          variant="outline"
          iconStart={<Plus aria-hidden="true" />}
          disabled={disabled || parts.length >= 26}
          onClick={() => {
            const label = nextPartLabel(parts.map((p) => p.partLabel), level);
            setParts([...parts, level === 1 ? newPart(label, newType) : newSubPart(label, newType)]);
          }}
        >
          Add {level === 1 ? "part" : "sub-part"}
        </Button>
      </div>
    </div>
  );
}
