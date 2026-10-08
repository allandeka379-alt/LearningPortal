"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { asArray, asRecord, compact, nextId, type Json } from "../model";
import { BlockErrors, CheckboxInput, LinesInput, ListRow, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextAreaInput, TextInput, updateItem } from "./fields";
import type { AnswerEditorProps } from "./types";

/**
 * NUMERICAL and CALCULATION answers: the value, tolerance (absolute or a percentage), significant figures / decimal
 * places, units (accepted spellings, conversions, penalty) and, for calculations, method marks for the working.
 */
export function NumericEditor({ draft, onChange, path, disabled }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const tolerance = asRecord(spec.tolerance);
  const sigFigs = asRecord(spec.sigFigs);
  const units = spec.units === undefined ? null : asRecord(spec.units);
  const conversions = asArray(units?.conversions);
  const methodMarks = asArray(spec.methodMarks);
  const calculation = draft.type === "CALCULATION";
  const base = `${path}answerSpec`;
  const set = (patch: Json) => onChange({ answerSpec: compact({ ...spec, ...patch }) });
  const setUnits = (patch: Json) => set({ units: compact({ ...(units ?? {}), ...patch }) });
  const setPayload = (patch: Json) => {
    const next = compact({ ...payload, ...patch });
    onChange({ payload: Object.keys(next).length > 0 ? next : null });
  };
  const toleranceKind = tolerance.kind === "absolute" || tolerance.kind === "relative" ? tolerance.kind : "none";
  const methodTotal = methodMarks.reduce((sum, m) => sum + (typeof m.marks === "number" ? m.marks : 0), 0);

  return (
    <div className="grid gap-5">
      <BlockErrors path={base} />
      <div className="grid gap-3 sm:grid-cols-3">
        <NumberInput label="Correct value" value={spec.value as number | undefined} disabled={disabled} path={`${base}.value`} onChange={(value) => set({ value })} />
        <TextInput label="Shown before the box" optional placeholder="x =" value={typeof payload.answerPrefix === "string" ? payload.answerPrefix : ""} disabled={disabled} path={`${path}payload.answerPrefix`} onChange={(answerPrefix) => setPayload({ answerPrefix })} maxLength={64} />
        <TextInput label="Unit hint after the box" optional placeholder="km/h" value={typeof payload.unitHint === "string" ? payload.unitHint : ""} disabled={disabled} path={`${path}payload.unitHint`} onChange={(unitHint) => setPayload({ unitHint })} maxLength={32} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SelectInput
          label="Tolerance"
          value={toleranceKind}
          disabled={disabled}
          options={[
            { value: "none", label: "Exact value" },
            { value: "absolute", label: "Plus or minus an amount" },
            { value: "relative", label: "Plus or minus a percentage" },
          ]}
          onChange={(kind) => set({ tolerance: kind === "none" ? undefined : { kind, amount: kind === "relative" ? 0.01 : 0 } })}
          path={`${base}.tolerance`}
        />
        {toleranceKind === "absolute" && (
          <NumberInput label="± amount" min={0} value={tolerance.amount as number | undefined} disabled={disabled} path={`${base}.tolerance.amount`} onChange={(amount) => set({ tolerance: { kind: "absolute", amount: amount ?? 0 } })} />
        )}
        {toleranceKind === "relative" && (
          <NumberInput
            label="± percent"
            min={0}
            max={100}
            value={typeof tolerance.amount === "number" ? Math.round(tolerance.amount * 1_000_000) / 10_000 : undefined}
            disabled={disabled}
            path={`${base}.tolerance.amount`}
            onChange={(percent) => set({ tolerance: { kind: "relative", amount: (percent ?? 0) / 100 } })}
          />
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <NumberInput label="Min significant figures" optional min={1} max={15} step={1} value={sigFigs.min as number | undefined} disabled={disabled} path={`${base}.sigFigs.min`} onChange={(min) => {
          const next = compact({ ...sigFigs, min });
          set({ sigFigs: Object.keys(next).length > 0 ? next : undefined });
        }} />
        <NumberInput label="Max significant figures" optional min={1} max={15} step={1} value={sigFigs.max as number | undefined} disabled={disabled} path={`${base}.sigFigs.max`} onChange={(max) => {
          const next = compact({ ...sigFigs, max });
          set({ sigFigs: Object.keys(next).length > 0 ? next : undefined });
        }} />
        <NumberInput label="Decimal places" optional min={0} max={15} step={1} value={spec.decimalPlaces as number | undefined} disabled={disabled} path={`${base}.decimalPlaces`} onChange={(decimalPlaces) => set({ decimalPlaces })} />
        <NumberInput
          label="Marks lost for precision"
          optional
          hint="Blank: no credit when the precision is wrong."
          min={0}
          step={1}
          value={spec.precisionPenaltyMarks as number | undefined}
          disabled={disabled}
          path={`${base}.precisionPenaltyMarks`}
          onChange={(precisionPenaltyMarks) => set({ precisionPenaltyMarks })}
        />
      </div>
      <BlockErrors path={`${base}.sigFigs`} />

      <section className="space-y-3 rounded-card border border-border p-3">
        <CheckboxInput
          label="Check units"
          description="Accept the unit's spellings and convert other units."
          checked={units !== null}
          disabled={disabled}
          onChange={(checked) => set({ units: checked ? { required: true, accepted: [] } : undefined })}
        />
        {units && (
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <LinesInput label="Accepted spellings of the unit" hint="The unit the value is in, one spelling per line (km/h, km h^-1)." value={asArray<string>(units.accepted)} disabled={disabled} path={`${base}.units.accepted`} onChange={(accepted) => setUnits({ accepted })} />
              <div className="grid gap-3">
                <CheckboxInput label="Unit required" checked={units.required === true} disabled={disabled} onChange={(required) => setUnits({ required })} />
                <NumberInput label="Marks lost for a missing or wrong unit" optional hint="Default 1" min={0} step={1} value={units.penaltyMarks as number | undefined} disabled={disabled} path={`${base}.units.penaltyMarks`} onChange={(penaltyMarks) => setUnits({ penaltyMarks })} />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-text">Other units (converted)</h4>
            <p className="text-sm text-muted">The value in the accepted unit = given value × factor + offset (e.g. m/s → km/h: factor 3.6).</p>
            <ol className="space-y-2">
              {conversions.map((conversion, index) => (
                <ListRow
                  key={index}
                  controls={
                    <RowControls
                      index={index}
                      count={conversions.length}
                      itemLabel={`conversion ${index + 1}`}
                      disabled={disabled}
                      onMove={(from, to) => setUnits({ conversions: moveItem(conversions, from, to) })}
                      onRemove={(i) => setUnits({ conversions: removeItem(conversions, i) })}
                    />
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextInput label="Unit" value={typeof conversion.unit === "string" ? conversion.unit : ""} disabled={disabled} path={`${base}.units.conversions.${index}.unit`} onChange={(unit) => setUnits({ conversions: updateItem(conversions, index, { unit }) })} />
                    <NumberInput label="Factor" value={conversion.factor as number | undefined} disabled={disabled} path={`${base}.units.conversions.${index}.factor`} onChange={(factor) => setUnits({ conversions: updateItem(conversions, index, { factor }) })} />
                    <NumberInput label="Offset" optional value={conversion.offset as number | undefined} disabled={disabled} onChange={(offset) => setUnits({ conversions: conversions.map((c, i) => (i === index ? compact({ ...c, offset }) : c)) })} />
                  </div>
                </ListRow>
              ))}
            </ol>
            <div>
              <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled} onClick={() => setUnits({ conversions: [...conversions, { unit: "", factor: 1 }] })}>
                Add conversion
              </Button>
            </div>
          </div>
        )}
      </section>

      {calculation && (
        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-text">Method marks</h4>
          <p className="text-sm text-muted">
            M marks for the working ({methodTotal} of {draft.marks}); the remaining {Math.max(0, draft.marks - methodTotal)} are for the final answer. Working is marked by AI or a person.
          </p>
          <BlockErrors path={`${base}.methodMarks`} />
          <ol className="space-y-2">
            {methodMarks.map((mark, index) => (
              <ListRow
                key={`${String(mark.id)}-${index}`}
                title={String(mark.id)}
                controls={
                  <RowControls
                    index={index}
                    count={methodMarks.length}
                    itemLabel={`method mark ${String(mark.id)}`}
                    disabled={disabled}
                    onMove={(from, to) => set({ methodMarks: moveItem(methodMarks, from, to) })}
                    onRemove={(i) => set({ methodMarks: removeItem(methodMarks, i) })}
                  />
                }
              >
                <div className="grid gap-3 md:grid-cols-[1fr_8rem]">
                  <TextAreaInput label="Method step" rows={2} value={typeof mark.description === "string" ? mark.description : ""} disabled={disabled} path={`${base}.methodMarks.${index}.description`} onChange={(description) => set({ methodMarks: updateItem(methodMarks, index, { description }) })} />
                  <NumberInput label="Marks" min={1} step={1} value={mark.marks as number | undefined} disabled={disabled} path={`${base}.methodMarks.${index}.marks`} onChange={(marks) => set({ methodMarks: updateItem(methodMarks, index, { marks }) })} />
                </div>
              </ListRow>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled} onClick={() => set({ methodMarks: [...methodMarks, { id: nextId("M", methodMarks.map((m) => String(m.id))), description: "", marks: 1 }] })}>
              Add method mark
            </Button>
            <CheckboxInput
              label="“Show that”: a correct final answer alone does not earn the method marks"
              checked={spec.methodRequired === true}
              disabled={disabled}
              onChange={(methodRequired) => set({ methodRequired: methodRequired || undefined })}
            />
          </div>
        </section>
      )}
    </div>
  );
}
