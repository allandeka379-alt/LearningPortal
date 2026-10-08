"use client";

import { Plus } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { nextOptionKey } from "@/server/cms/questions/option-keys";
import type { QuestionOptionInput } from "@/server/cms/questions/schemas";
import { asRecord, compact } from "../model";
import { BlockErrors, CheckboxInput, ListRow, moveItem, removeItem, RowControls, SelectInput, TextAreaInput, updateItem, useErrors } from "./fields";
import { MarkdownField } from "./MarkdownField";
import type { AnswerEditorProps } from "./types";

/** MULTIPLE_CHOICE (single answer or multi-select): options with correct flags and per-option feedback (§10). */
export function MultipleChoiceEditor({ draft, onChange, path, disabled, media, reservedKeys = [] }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const options = draft.options ?? [];
  const multiple = payload.selectMode === "multiple";
  const groupName = useId();

  const setOptions = (next: QuestionOptionInput[]) => onChange({ options: next });
  const setPayload = (patch: Record<string, unknown>) => onChange({ payload: compact({ ...payload, ...patch }) });
  const setSpec = (patch: Record<string, unknown>) => onChange({ answerSpec: compact({ ...spec, ...patch }) });
  const imageOptions = media.map((m) => ({ value: m.value, label: m.label }));

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        <SelectInput
          label="Answer style"
          value={multiple ? "multiple" : "single"}
          disabled={disabled}
          options={[
            { value: "single", label: "One correct answer" },
            { value: "multiple", label: "Select all that apply" },
          ]}
          onChange={(value) => {
            if (value !== "single") {
              setPayload({ selectMode: value });
              return;
            }
            // One change per event: switching to single answer keeps only the first correct option.
            const first = Math.max(0, options.findIndex((o) => o.isCorrect));
            onChange({
              payload: compact({ ...payload, selectMode: value }),
              answerSpec: compact({ ...spec, scoring: "all_or_nothing" }),
              options: options.map((o, i) => ({ ...o, isCorrect: i === first })),
            });
          }}
          path={`${path}payload.selectMode`}
        />
        {multiple && (
          <SelectInput
            label="Scoring"
            value={spec.scoring === "partial" ? "partial" : "all_or_nothing"}
            disabled={disabled}
            options={[
              { value: "all_or_nothing", label: "All correct options or nothing" },
              { value: "partial", label: "Partial credit per option" },
            ]}
            onChange={(value) => setSpec({ scoring: value })}
            path={`${path}answerSpec.scoring`}
          />
        )}
        <CheckboxInput
          label="Shuffle options"
          description="Each student sees the options in their own order."
          checked={payload.shuffleOptions === true}
          disabled={disabled}
          onChange={(checked) => setPayload({ shuffleOptions: checked })}
        />
      </div>
      <BlockErrors path={`${path}options`} />
      <ol className="space-y-3">
        {options.map((option, index) => (
          <ListRow
            key={option.key}
            title={<span>Option {option.key}</span>}
            controls={
              <RowControls
                index={index}
                count={options.length}
                itemLabel={`option ${option.key}`}
                disabled={disabled}
                minCount={2}
                onMove={(from, to) => setOptions(moveItem(options, from, to))}
                onRemove={(i) => setOptions(removeItem(options, i))}
              />
            }
            className={cn(option.isCorrect && "border-success/50 bg-success-soft/40")}
          >
            <OptionCorrectness
              option={option}
              multiple={multiple}
              groupName={groupName}
              disabled={disabled}
              path={`${path}options.${index}`}
              onToggle={(checked) =>
                setOptions(multiple ? updateItem(options, index, { isCorrect: checked }) : options.map((o, i) => ({ ...o, isCorrect: i === index })))
              }
            />
            <MarkdownField
              label={`Option ${option.key} text`}
              inline
              rows={2}
              value={option.content}
              disabled={disabled}
              path={`${path}options.${index}.content`}
              onChange={(content) => setOptions(updateItem(options, index, { content }))}
            />
            <TextAreaInput
              label={option.isCorrect ? "Why it is correct" : "Feedback: the misconception it reveals"}
              optional
              rows={2}
              value={option.rationale ?? ""}
              disabled={disabled}
              path={`${path}options.${index}.rationale`}
              onChange={(rationale) => setOptions(updateItem(options, index, { rationale }))}
            />
            {imageOptions.length > 0 && (
              <SelectInput
                label="Picture"
                optional
                value={option.mediaAssetId ?? ""}
                placeholder="No picture"
                options={imageOptions}
                disabled={disabled}
                onChange={(value) => setOptions(updateItem(options, index, { mediaAssetId: value === "" ? null : value }))}
              />
            )}
          </ListRow>
        ))}
      </ol>
      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          iconStart={<Plus aria-hidden="true" />}
          disabled={disabled || options.length >= 26}
          onClick={() => setOptions([...options, { key: nextOptionKey([...reservedKeys, ...options.map((o) => o.key)]), content: "", isCorrect: false }])}
        >
          Add option
        </Button>
      </div>
    </div>
  );
}

function OptionCorrectness({
  option,
  multiple,
  groupName,
  disabled,
  path,
  onToggle,
}: {
  option: QuestionOptionInput;
  multiple: boolean;
  groupName: string;
  disabled?: boolean;
  path: string;
  onToggle: (checked: boolean) => void;
}) {
  const errors = useErrors(`${path}.key`);
  return (
    <div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          type={multiple ? "checkbox" : "radio"}
          name={multiple ? undefined : groupName}
          checked={option.isCorrect}
          disabled={disabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="size-5 accent-success"
        />
        <span className="text-sm font-medium text-text">{option.isCorrect ? "Correct answer" : "Mark as correct"}</span>
      </label>
      {errors.length > 0 && <p className="text-sm text-danger-text">{errors.join(" ")}</p>}
    </div>
  );
}

/** TRUE_FALSE: the correct value and optional feedback for each choice. */
export function TrueFalseEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const yesNo = payload.statementStyle === "yes_no";
  const groupName = useId();
  const setSpec = (patch: Record<string, unknown>) => onChange({ answerSpec: compact({ ...spec, ...patch }) });
  return (
    <div className="grid gap-4">
      <SelectInput
        label="Wording"
        value={yesNo ? "yes_no" : "true_false"}
        disabled={disabled}
        options={[
          { value: "true_false", label: "True / False" },
          { value: "yes_no", label: "Yes / No" },
        ]}
        onChange={(value) => onChange({ payload: { statementStyle: value } })}
      />
      <fieldset className="space-y-1">
        <legend className="text-sm font-medium text-text">Correct answer</legend>
        <div className="flex gap-6">
          {[true, false].map((value) => (
            <label key={String(value)} className="flex min-h-11 cursor-pointer items-center gap-2">
              <input type="radio" name={groupName} checked={spec.correct === value} disabled={disabled} onChange={() => setSpec({ correct: value })} className="size-5 accent-success" />
              <span className="text-sm text-text">{value ? (yesNo ? "Yes" : "True") : yesNo ? "No" : "False"}</span>
            </label>
          ))}
        </div>
        <BlockErrors path={`${path}answerSpec.correct`} />
      </fieldset>
      <div className="grid gap-3 md:grid-cols-2">
        <MarkdownField
          label={`Feedback after answering “${yesNo ? "Yes" : "True"}”`}
          optional
          rows={2}
          value={typeof spec.feedbackTrue === "string" ? spec.feedbackTrue : ""}
          disabled={disabled}
          path={`${path}answerSpec.feedbackTrue`}
          onChange={(feedbackTrue) => setSpec({ feedbackTrue })}
        />
        <MarkdownField
          label={`Feedback after answering “${yesNo ? "No" : "False"}”`}
          optional
          rows={2}
          value={typeof spec.feedbackFalse === "string" ? spec.feedbackFalse : ""}
          disabled={disabled}
          path={`${path}answerSpec.feedbackFalse`}
          onChange={(feedbackFalse) => setSpec({ feedbackFalse })}
        />
      </div>
    </div>
  );
}
