"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { asArray, asRecord, compact, nextId, type Json } from "../model";
import { BlockErrors, CheckboxInput, LinesInput, ListRow, moveItem, NumberInput, removeItem, RowControls, TextAreaInput, TextInput, updateItem } from "./fields";
import { MarkdownField } from "./MarkdownField";
import type { AnswerEditorProps } from "./types";

/** Optional normalisation flags (trim, lower-case and whitespace collapsing are always applied). */
const NORMALISE_OPTIONS = [
  { flag: "remove_whitespace", label: "Ignore spaces", description: "x^2 + 3x matches x^2+3x" },
  { flag: "strip_punctuation", label: "Ignore punctuation", description: "D.N.A. matches DNA" },
  { flag: "strip_diacritics", label: "Ignore accents", description: "café matches cafe" },
  { flag: "strip_articles", label: "Ignore a / an / the", description: "the nucleus matches nucleus" },
] as const;

// ---------------------------------------------------------------------------------------------------------------------
// Mark scheme (our own points, never a board's scheme: §27)
// ---------------------------------------------------------------------------------------------------------------------

export function MarkSchemeEditor({
  value,
  onChange,
  path,
  disabled,
  questionMarks,
}: {
  value: Json;
  onChange: (value: Json) => void;
  path: string;
  disabled?: boolean;
  questionMarks: number;
}) {
  const points = asArray(value.points);
  const levels = asArray(value.levels);
  const total = points.reduce((sum, p) => sum + (typeof p.marks === "number" ? p.marks : 0), 0);
  const set = (patch: Json) => onChange(compact({ ...value, ...patch }));
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">
        Write your own mark-scheme points (never copy a board&apos;s marking scheme). AI-assisted marking awards each point and a person can override it.
        Points total <strong className="text-text">{total}</strong> of {questionMarks} marks.
      </p>
      <BlockErrors path={`${path}.points`} />
      <ol className="space-y-3">
        {points.map((point, index) => (
          <ListRow
            key={`${String(point.id)}-${index}`}
            title={`Point ${String(point.id ?? index + 1)}`}
            controls={
              <RowControls
                index={index}
                count={points.length}
                itemLabel={`point ${String(point.id)}`}
                disabled={disabled}
                minCount={1}
                onMove={(from, to) => set({ points: moveItem(points, from, to) })}
                onRemove={(i) => set({ points: removeItem(points, i) })}
              />
            }
          >
            <div className="grid gap-3 md:grid-cols-[1fr_8rem]">
              <TextAreaInput
                label="What earns the marks"
                rows={2}
                value={typeof point.description === "string" ? point.description : ""}
                disabled={disabled}
                path={`${path}.points.${index}.description`}
                onChange={(description) => set({ points: updateItem(points, index, { description }) })}
              />
              <NumberInput
                label="Marks"
                min={1}
                step={1}
                value={typeof point.marks === "number" ? point.marks : undefined}
                disabled={disabled}
                path={`${path}.points.${index}.marks`}
                onChange={(marks) => set({ points: updateItem(points, index, { marks }) })}
              />
            </div>
            <LinesInput
              label="Indicators for markers"
              optional
              hint="Phrases or ideas that show the point, one per line (guidance, not matched literally)."
              rows={2}
              value={asArray<string>(point.indicators)}
              disabled={disabled}
              path={`${path}.points.${index}.indicators`}
              onChange={(indicators) => set({ points: points.map((p, i) => (i === index ? compact({ ...p, indicators }) : p)) })}
            />
          </ListRow>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          iconStart={<Plus aria-hidden="true" />}
          disabled={disabled}
          onClick={() => set({ points: [...points, { id: nextId("P", points.map((p) => String(p.id))), description: "", marks: 1 }] })}
        >
          Add point
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          iconStart={<Plus aria-hidden="true" />}
          disabled={disabled}
          onClick={() => set({ levels: [...levels, { level: levels.length + 1, minMarks: 0, maxMarks: questionMarks, descriptor: "" }] })}
        >
          Add level descriptor
        </Button>
      </div>
      {levels.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-text">Levels of response</h4>
          <BlockErrors path={`${path}.levels`} />
          <ol className="space-y-3">
            {levels.map((level, index) => (
              <ListRow
                key={index}
                title={`Level ${String(level.level ?? index + 1)}`}
                controls={
                  <RowControls
                    index={index}
                    count={levels.length}
                    itemLabel={`level ${String(level.level)}`}
                    disabled={disabled}
                    onMove={(from, to) => set({ levels: moveItem(levels, from, to) })}
                    onRemove={(i) => set({ levels: removeItem(levels, i) })}
                  />
                }
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <NumberInput label="Level" min={0} step={1} value={level.level as number} disabled={disabled} path={`${path}.levels.${index}.level`} onChange={(v) => set({ levels: updateItem(levels, index, { level: v }) })} />
                  <NumberInput label="From marks" min={0} step={1} value={level.minMarks as number} disabled={disabled} path={`${path}.levels.${index}.minMarks`} onChange={(v) => set({ levels: updateItem(levels, index, { minMarks: v }) })} />
                  <NumberInput label="To marks" min={0} step={1} value={level.maxMarks as number} disabled={disabled} path={`${path}.levels.${index}.maxMarks`} onChange={(v) => set({ levels: updateItem(levels, index, { maxMarks: v }) })} />
                </div>
                <TextAreaInput
                  label="Descriptor"
                  rows={2}
                  value={typeof level.descriptor === "string" ? level.descriptor : ""}
                  disabled={disabled}
                  path={`${path}.levels.${index}.descriptor`}
                  onChange={(descriptor) => set({ levels: updateItem(levels, index, { descriptor }) })}
                />
              </ListRow>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// SHORT_ANSWER
// ---------------------------------------------------------------------------------------------------------------------

export function ShortAnswerEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const accepted = asArray(spec.accepted);
  const rubric = asArray(spec.rubric);
  const rejected = asArray(spec.rejected);
  const keywords = asRecord(spec.keywords);
  const flags = asArray<string>(spec.normalise).filter((f) => NORMALISE_OPTIONS.some((o) => o.flag === f));
  const base = `${path}answerSpec`;
  const set = (patch: Json) => onChange({ answerSpec: compact({ ...spec, ...patch }) });
  const setKeywords = (patch: Json) => {
    const next = compact({ ...keywords, ...patch });
    set({ keywords: Object.keys(next).length > 0 ? next : undefined });
  };

  return (
    <div className="grid gap-5">
      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-text">Accepted answers</h4>
        <BlockErrors path={base} />
        <BlockErrors path={`${base}.accepted`} />
        <ol className="space-y-3">
          {accepted.map((answer, index) => (
            <ListRow
              key={index}
              controls={
                <RowControls
                  index={index}
                  count={accepted.length}
                  itemLabel={`accepted answer ${index + 1}`}
                  disabled={disabled}
                  onMove={(from, to) => set({ accepted: moveItem(accepted, from, to) })}
                  onRemove={(i) => set({ accepted: removeItem(accepted, i) })}
                />
              }
              title={`Answer ${index + 1}`}
            >
              <div className="grid gap-3 md:grid-cols-[1fr_9rem]">
                <TextInput
                  label="Answer"
                  value={typeof answer.value === "string" ? answer.value : ""}
                  disabled={disabled}
                  path={`${base}.accepted.${index}.value`}
                  onChange={(value) => set({ accepted: updateItem(accepted, index, { value }) })}
                />
                <NumberInput
                  label="Marks"
                  optional
                  hint="Blank = full marks"
                  min={1}
                  step={1}
                  value={answer.marks as number | undefined}
                  disabled={disabled}
                  path={`${base}.accepted.${index}.marks`}
                  onChange={(marks) => set({ accepted: accepted.map((a, i) => (i === index ? compact({ ...a, marks }) : a)) })}
                />
              </div>
              <CheckboxInput
                label="Case-sensitive"
                checked={answer.caseSensitive === true}
                disabled={disabled}
                onChange={(caseSensitive) => set({ accepted: accepted.map((a, i) => (i === index ? compact({ ...a, caseSensitive: caseSensitive || undefined }) : a)) })}
              />
              <TextAreaInput
                label="Feedback for this answer"
                optional
                rows={2}
                value={typeof answer.feedback === "string" ? answer.feedback : ""}
                disabled={disabled}
                path={`${base}.accepted.${index}.feedback`}
                onChange={(feedback) => set({ accepted: accepted.map((a, i) => (i === index ? compact({ ...a, feedback }) : a)) })}
              />
            </ListRow>
          ))}
        </ol>
        <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled} onClick={() => set({ accepted: [...accepted, { value: "" }] })}>
          Add accepted answer
        </Button>
      </section>

      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold text-text">Normalisation</legend>
        <p className="text-sm text-muted">Answers are always trimmed, compared without case and with spaces collapsed. Also:</p>
        <div className="grid gap-x-6 sm:grid-cols-2">
          {NORMALISE_OPTIONS.map((option) => (
            <CheckboxInput
              key={option.flag}
              label={option.label}
              description={option.description}
              checked={flags.includes(option.flag)}
              disabled={disabled}
              onChange={(checked) => set({ normalise: checked ? [...flags, option.flag] : flags.filter((f) => f !== option.flag) })}
            />
          ))}
        </div>
      </fieldset>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-text">Keyword rubric points</h4>
        <p className="text-sm text-muted">Partial credit: each point is earned when any of its phrases appears (whole words; end a phrase with * for a prefix).</p>
        <BlockErrors path={`${base}.rubric`} />
        <ol className="space-y-3">
          {rubric.map((point, index) => (
            <ListRow
              key={`${String(point.id)}-${index}`}
              title={`Point ${String(point.id)}`}
              controls={
                <RowControls
                  index={index}
                  count={rubric.length}
                  itemLabel={`rubric point ${String(point.id)}`}
                  disabled={disabled}
                  onMove={(from, to) => set({ rubric: moveItem(rubric, from, to) })}
                  onRemove={(i) => set({ rubric: removeItem(rubric, i) })}
                />
              }
            >
              <div className="grid gap-3 md:grid-cols-[1fr_8rem]">
                <LinesInput
                  label="Any of these phrases"
                  rows={2}
                  value={asArray<string>(point.anyOf)}
                  disabled={disabled}
                  path={`${base}.rubric.${index}.anyOf`}
                  onChange={(anyOf) => set({ rubric: updateItem(rubric, index, { anyOf }) })}
                />
                <NumberInput label="Marks" min={1} step={1} value={point.marks as number} disabled={disabled} path={`${base}.rubric.${index}.marks`} onChange={(marks) => set({ rubric: updateItem(rubric, index, { marks }) })} />
              </div>
              <TextInput
                label="What the point rewards"
                optional
                value={typeof point.description === "string" ? point.description : ""}
                disabled={disabled}
                onChange={(description) => set({ rubric: rubric.map((p, i) => (i === index ? compact({ ...p, description }) : p)) })}
              />
            </ListRow>
          ))}
        </ol>
        <Button
          type="button"
          size="sm"
          variant="outline"
          iconStart={<Plus aria-hidden="true" />}
          disabled={disabled}
          onClick={() => set({ rubric: [...rubric, { id: nextId("R", rubric.map((p) => String(p.id))), anyOf: [], marks: 1 }] })}
        >
          Add rubric point
        </Button>
      </section>

      <details className="rounded-card border border-border p-3">
        <summary className="cursor-pointer text-sm font-semibold text-text">Keywords, rejected answers and patterns</summary>
        <div className="mt-3 grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <LinesInput label="Must contain all of" optional value={asArray<string>(keywords.all)} disabled={disabled} path={`${base}.keywords.all`} onChange={(all) => setKeywords({ all })} />
            <LinesInput label="And at least … of" optional value={asArray<string>(keywords.any)} disabled={disabled} path={`${base}.keywords.any`} onChange={(any) => setKeywords({ any })} />
            <NumberInput label="Minimum of those" optional min={1} step={1} value={keywords.minAny as number | undefined} disabled={disabled} path={`${base}.keywords.minAny`} onChange={(minAny) => setKeywords({ minAny })} />
          </div>
          <BlockErrors path={`${base}.keywords`} />
          <CheckboxInput
            label="Keywords, rubric and rejected answers are case-sensitive"
            checked={spec.caseSensitive === true}
            disabled={disabled}
            onChange={(caseSensitive) => set({ caseSensitive: caseSensitive || undefined })}
          />
          <LinesInput
            label="Answers never to credit"
            optional
            hint="Mark-scheme “reject” lines, one per line."
            value={rejected.map((r) => r.value)}
            disabled={disabled}
            path={`${base}.rejected`}
            onChange={(values) => set({ rejected: values.map((value) => ({ value })) })}
          />
          <LinesInput
            label="Answer patterns (advanced)"
            optional
            hint="Anchored, simple regular expressions, one per line, e.g. ^x\s*=\s*5$ . Unsafe patterns are refused."
            value={asArray<string>(spec.patterns)}
            disabled={disabled}
            path={`${base}.patterns`}
            onChange={(patterns) => set({ patterns })}
          />
          <NumberInput
            label="Answer box length limit"
            optional
            min={1}
            max={2000}
            step={1}
            value={payload.maxLength as number | undefined}
            disabled={disabled}
            path={`${path}payload.maxLength`}
            onChange={(maxLength) => {
              const next = compact({ ...payload, maxLength });
              onChange({ payload: Object.keys(next).length > 0 ? next : null });
            }}
          />
        </div>
      </details>

      <details className="rounded-card border border-border p-3" open={spec.markScheme !== undefined}>
        <summary className="cursor-pointer text-sm font-semibold text-text">Mark scheme for AI-assisted or manual marking</summary>
        <div className="mt-3">
          {spec.markScheme === undefined ? (
            <Button type="button" size="sm" variant="outline" disabled={disabled} onClick={() => set({ markScheme: { points: [{ id: "P1", description: "", marks: draft.marks }] } })}>
              Add a mark scheme
            </Button>
          ) : (
            <div className="space-y-3">
              <MarkSchemeEditor value={asRecord(spec.markScheme)} onChange={(markScheme) => set({ markScheme })} path={`${base}.markScheme`} disabled={disabled} questionMarks={draft.marks} />
              <Button type="button" size="sm" variant="ghost" disabled={disabled} onClick={() => set({ markScheme: undefined })}>
                Remove the mark scheme
              </Button>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// ESSAY / EXTENDED_RESPONSE
// ---------------------------------------------------------------------------------------------------------------------

export function OpenResponseEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const limit = asRecord(payload.wordLimit);
  const base = `${path}answerSpec`;
  const set = (patch: Json) => onChange({ answerSpec: compact({ ...spec, ...patch }) });
  const setLimit = (patch: Json) => {
    const next = compact({ ...limit, ...patch });
    onChange({ payload: Object.keys(next).length > 0 ? { wordLimit: next } : null });
  };
  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <NumberInput label="Minimum words" optional min={0} step={1} value={limit.min as number | undefined} disabled={disabled} path={`${path}payload.wordLimit.min`} onChange={(min) => setLimit({ min })} />
        <NumberInput label="Maximum words" optional min={1} step={1} value={limit.max as number | undefined} disabled={disabled} path={`${path}payload.wordLimit.max`} onChange={(max) => setLimit({ max })} />
      </div>
      <BlockErrors path={`${path}payload.wordLimit`} />
      <section className="space-y-2">
        <h4 className="text-sm font-semibold text-text">Mark scheme</h4>
        <MarkSchemeEditor value={asRecord(spec.markScheme)} onChange={(markScheme) => set({ markScheme })} path={`${base}.markScheme`} disabled={disabled} questionMarks={draft.marks} />
      </section>
      <MarkdownField
        label="Model answer"
        optional
        hint="Your own exemplar, shown to students after marking."
        rows={5}
        value={typeof spec.modelAnswer === "string" ? spec.modelAnswer : ""}
        disabled={disabled}
        path={`${base}.modelAnswer`}
        onChange={(modelAnswer) => set({ modelAnswer })}
      />
    </div>
  );
}
