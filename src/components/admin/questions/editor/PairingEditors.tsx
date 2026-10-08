"use client";

import { Plus } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { asArray, asRecord, compact, nextId, syncBlanks, type Json } from "../model";
import { BlockErrors, CheckboxInput, LinesInput, ListRow, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextInput, updateItem, useErrors } from "./fields";
import type { AnswerEditorProps } from "./types";

// ---------------------------------------------------------------------------------------------------------------------
// MATCHING
// ---------------------------------------------------------------------------------------------------------------------

/** Two columns of items and the correct pairs (a left item may accept more than one right item). */
export function MatchingEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const left = asArray(payload.left);
  const right = asArray(payload.right);
  const pairs = asArray(spec.pairs);
  const base = `${path}answerSpec`;

  const update = (next: { left?: Json[]; right?: Json[]; pairs?: Json[]; shuffle?: boolean; marksPerPair?: number | undefined }) => {
    const nextLeft = next.left ?? left;
    const nextRight = next.right ?? right;
    const leftIds = new Set(nextLeft.map((i) => String(i.id)));
    const rightIds = new Set(nextRight.map((i) => String(i.id)));
    const nextPairs = (next.pairs ?? pairs).filter((p) => leftIds.has(String(p.leftId)) && rightIds.has(String(p.rightId)));
    onChange({
      payload: compact({ ...payload, left: nextLeft, right: nextRight, ...(next.shuffle !== undefined ? { shuffle: next.shuffle } : {}) }),
      answerSpec: compact({ ...spec, pairs: nextPairs, ...("marksPerPair" in next ? { marksPerPair: next.marksPerPair } : {}) }),
    });
  };

  const onSide = (side: "left" | "right", items: Json[]) => (side === "left" ? { left: items } : { right: items });

  const column = (side: "left" | "right", items: Json[]) => (
    <section className="space-y-2">
      <h4 className="text-sm font-semibold text-text">{side === "left" ? "Left column (prompts)" : "Right column (answers, may include extras)"}</h4>
      <BlockErrors path={`${path}payload.${side}`} />
      <ol className="space-y-2">
        {items.map((item, index) => (
          <ListRow
            key={String(item.id)}
            title={String(item.id)}
            controls={
              <RowControls
                index={index}
                count={items.length}
                itemLabel={`${side} item ${String(item.id)}`}
                disabled={disabled}
                minCount={1}
                onMove={(from, to) => update(onSide(side, moveItem(items, from, to)))}
                onRemove={(i) => update(onSide(side, removeItem(items, i)))}
              />
            }
          >
            <TextInput label="Text" value={typeof item.content === "string" ? item.content : ""} disabled={disabled} path={`${path}payload.${side}.${index}.content`} onChange={(content) => update(onSide(side, updateItem(items, index, { content })))} />
          </ListRow>
        ))}
      </ol>
      <Button
        type="button"
        size="sm"
        variant="outline"
        iconStart={<Plus aria-hidden="true" />}
        disabled={disabled}
        onClick={() => update(onSide(side, [...items, { id: nextId(side === "left" ? "l" : "r", items.map((i) => String(i.id))), content: "" }]))}
      >
        Add {side === "left" ? "prompt" : "answer"}
      </Button>
    </section>
  );

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {column("left", left)}
        {column("right", right)}
      </div>
      <section className="space-y-2">
        <h4 className="text-sm font-semibold text-text">Correct matches</h4>
        <BlockErrors path={`${base}.pairs`} />
        <ul className="space-y-3">
          {left.map((item) => {
            const chosen = new Set(pairs.filter((p) => p.leftId === item.id).map((p) => String(p.rightId)));
            return (
              <li key={String(item.id)} className="rounded-card border border-border p-3">
                <fieldset>
                  <legend className="text-sm font-medium text-text">
                    {String(item.id)}: {typeof item.content === "string" && item.content.trim() !== "" ? item.content : "(no text yet)"}
                  </legend>
                  <div className="flex flex-wrap gap-x-6">
                    {right.map((answer) => (
                      <CheckboxInput
                        key={String(answer.id)}
                        label={`${String(answer.id)}: ${typeof answer.content === "string" && answer.content.trim() !== "" ? answer.content : "(no text yet)"}`}
                        checked={chosen.has(String(answer.id))}
                        disabled={disabled}
                        onChange={(checked) =>
                          update({
                            pairs: checked ? [...pairs, { leftId: item.id, rightId: answer.id }] : pairs.filter((p) => !(p.leftId === item.id && p.rightId === answer.id)),
                          })
                        }
                      />
                    ))}
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberInput label="Marks per correct pair" optional hint="Blank: marks shared evenly." min={1} step={1} value={spec.marksPerPair as number | undefined} disabled={disabled} path={`${base}.marksPerPair`} onChange={(marksPerPair) => update({ marksPerPair })} />
        <CheckboxInput label="Shuffle the right column" checked={payload.shuffle !== false} disabled={disabled} onChange={(shuffle) => update({ shuffle })} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// FILL_IN_THE_BLANK
// ---------------------------------------------------------------------------------------------------------------------

/** A template with `{{blank:id}}` placeholders and, per blank, its input kind and accepted answers. */
export function BlanksEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const template = typeof payload.template === "string" ? payload.template : "";
  const blanks = asArray(payload.blanks);
  const answers = asArray(spec.blanks);
  const templateId = useId();
  const templateErrors = useErrors(`${path}payload.template`);

  const write = (nextTemplate: string, nextBlanks: Json[], nextAnswers: Json[]) => {
    const synced = syncBlanks(nextTemplate, nextBlanks, nextAnswers);
    onChange({ payload: { ...payload, template: nextTemplate, blanks: synced.payload }, answerSpec: compact({ ...spec, blanks: synced.spec }) });
  };

  const insertBlank = () => {
    const area = document.getElementById(templateId) as HTMLTextAreaElement | null;
    const id = nextId("b", blanks.map((b) => String(b.id)));
    const at = area?.selectionStart ?? template.length;
    write(`${template.slice(0, at)}{{blank:${id}}}${template.slice(area?.selectionEnd ?? at)}`, blanks, answers);
  };

  return (
    <div className="grid gap-5">
      <Field
        id={templateId}
        label="Text with blanks"
        hint="Write the sentence or paragraph and insert a blank where the student types. Keep blanks outside maths and bold text."
        error={templateErrors}
      >
        {(control) => (
          <div className="space-y-2">
            <Textarea {...control} value={template} rows={4} disabled={disabled} className="font-mono text-sm" onChange={(e) => write(e.target.value, blanks, answers)} />
            <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled} onClick={insertBlank}>
              Insert blank at cursor
            </Button>
          </div>
        )}
      </Field>
      <BlockErrors path={`${path}payload.blanks`} />
      <BlockErrors path={`${path}answerSpec.blanks`} />
      <ol className="space-y-3">
        {blanks.map((blank, index) => {
          const answerIndex = answers.findIndex((a) => a.id === blank.id);
          const answer = answers[answerIndex] ?? { id: blank.id, accepted: [] };
          const setBlank = (patch: Json) => write(template, blanks.map((b, i) => (i === index ? compact({ ...b, ...patch }) : b)), answers);
          const setAnswer = (patch: Json) => write(template, blanks, answers.map((a) => (a.id === blank.id ? compact({ ...a, ...patch }) : a)));
          const answerPath = `${path}answerSpec.blanks.${answerIndex}`;
          return (
            <li key={String(blank.id)} className="rounded-card border border-border p-3">
              <h4 className="mb-2 text-sm font-semibold text-text">
                Blank {index + 1} <span className="font-mono text-xs text-muted">{`{{blank:${String(blank.id)}}}`}</span>
              </h4>
              <div className="grid gap-3 md:grid-cols-3">
                <SelectInput
                  label="Answer box"
                  value={typeof blank.input === "string" ? blank.input : "text"}
                  disabled={disabled}
                  options={[
                    { value: "text", label: "Text" },
                    { value: "number", label: "Number" },
                    { value: "select", label: "Drop-down choice" },
                  ]}
                  path={`${path}payload.blanks.${index}.input`}
                  onChange={(input) => setBlank({ input, choices: input === "select" ? (blank.choices ?? asArray<string>(answer.accepted)) : undefined })}
                />
                <LinesInput label="Accepted answers" value={asArray<string>(answer.accepted)} disabled={disabled} path={`${answerPath}.accepted`} onChange={(accepted) => setAnswer({ accepted })} />
                {blank.input === "select" && (
                  <LinesInput label="Choices shown" hint="One per line, including the correct one(s)." value={asArray<string>(blank.choices)} disabled={disabled} path={`${path}payload.blanks.${index}.choices`} onChange={(choices) => setBlank({ choices })} />
                )}
              </div>
              <div className="mt-2 grid gap-3 md:grid-cols-3">
                <NumberInput label="Marks" optional hint="Blank: marks shared evenly." min={1} step={1} value={answer.marks as number | undefined} disabled={disabled} path={`${answerPath}.marks`} onChange={(marks) => setAnswer({ marks })} />
                {blank.input === "number" && (
                  <NumberInput label="± tolerance" optional min={0} value={answer.tolerance as number | undefined} disabled={disabled} path={`${answerPath}.tolerance`} onChange={(tolerance) => setAnswer({ tolerance })} />
                )}
                {blank.input !== "number" && (
                  <CheckboxInput label="Case-sensitive" checked={answer.caseSensitive === true} disabled={disabled} onChange={(caseSensitive) => setAnswer({ caseSensitive: caseSensitive || undefined })} />
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {blanks.length === 0 && <p className="text-sm text-muted">Insert at least one blank into the text.</p>}
    </div>
  );
}
