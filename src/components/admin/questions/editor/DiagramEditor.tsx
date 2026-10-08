"use client";

import { Crosshair, Plus } from "lucide-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { asArray, asRecord, compact, nextId, type Json } from "../model";
import { BlockErrors, CheckboxInput, LinesInput, ListRow, moveItem, NumberInput, removeItem, RowControls, SelectInput, TextInput, updateItem, useErrors } from "./fields";
import type { AnswerEditorProps } from "./types";

/** Rounded to 0.1 % so positions are stable and readable in the hotspot table. */
function pct(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

/**
 * DIAGRAM_LABELLING: a diagram from the media library, numbered hotspots placed by clicking on the image (or by
 * entering X / Y percentages, for keyboard users), and per hotspot the correct word-bank label or accepted free-text
 * labels.
 */
export function DiagramEditor({ draft, onChange, path, disabled, media }: AnswerEditorProps) {
  const payload = asRecord(draft.payload);
  const spec = asRecord(draft.answerSpec);
  const hotspots = asArray(payload.hotspots);
  const answers = asArray(spec.hotspots);
  const labels = Array.isArray(payload.labels) ? asArray(payload.labels) : null;
  const assetId = typeof payload.mediaAssetId === "string" ? payload.mediaAssetId : "";
  const image = media.find((m) => m.value === assetId) ?? null;
  const assetErrors = useErrors(`${path}payload.mediaAssetId`);

  const write = (nextPayload: Json, nextAnswers: Json[]) => onChange({ payload: compact(nextPayload), answerSpec: compact({ ...spec, hotspots: nextAnswers }) });
  const answerFor = (id: string) => answers.find((a) => a.hotspotId === id) ?? { hotspotId: id };

  const addHotspot = (x: number, y: number) => {
    const id = nextId("h", hotspots.map((h) => String(h.id)));
    const answer = labels ? { hotspotId: id, ...(labels[0] ? { labelId: labels[0].id } : {}) } : { hotspotId: id, accepted: [] };
    write({ ...payload, hotspots: [...hotspots, { id, x: pct(x), y: pct(y) }] }, [...answers, answer]);
  };

  const onImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    const img = event.currentTarget.querySelector("img");
    // Keyboard activation (detail 0) has no pointer position: add in the centre, then adjust X / Y below.
    if (!img || event.detail === 0) {
      addHotspot(50, 50);
      return;
    }
    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    addHotspot(((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100);
  };

  const setWordBank = (on: boolean) => {
    if (on) {
      const nextLabels = [{ id: "L1", text: "" }];
      write({ ...payload, labels: nextLabels }, answers.map((a) => compact({ hotspotId: a.hotspotId, marks: a.marks })));
    } else {
      const text = new Map((labels ?? []).map((l) => [String(l.id), String(l.text ?? "")]));
      write(
        { ...payload, labels: undefined },
        answers.map((a) => compact({ hotspotId: a.hotspotId, marks: a.marks, accepted: typeof a.labelId === "string" && text.get(a.labelId) ? [text.get(a.labelId)] : [] })),
      );
    }
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-2">
        <SelectInput
          label="Diagram"
          hint="Upload diagrams (with a description) in the media library first."
          value={image ? assetId : ""}
          placeholder={media.length === 0 ? "No diagrams in the media library yet" : "Choose a diagram"}
          options={media.map((m) => ({ value: m.value, label: m.label }))}
          disabled={disabled}
          onChange={(value) => write({ ...payload, mediaAssetId: value }, answers)}
        />
        <TextInput label="…or paste a media asset id" optional mono value={assetId} disabled={disabled} onChange={(value) => write({ ...payload, mediaAssetId: value.trim() }, answers)} />
      </div>
      {assetErrors.length > 0 && (
        <p role="alert" className="text-sm text-danger-text">
          {assetErrors.join(" ")}
        </p>
      )}

      {image ? (
        <div className="space-y-2">
          <p className="text-sm text-muted">Click on the diagram where a label belongs. Numbers show the hotspots in the order students see them.</p>
          <button
            type="button"
            onClick={onImageClick}
            disabled={disabled}
            aria-label="Add a hotspot (keyboard: adds one in the centre; adjust its X and Y below)"
            className="relative inline-block max-w-full cursor-crosshair rounded-control border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of an uploaded asset of unknown size; coordinates come from the rendered box */}
            <img src={image.src} alt={image.altText ?? ""} className="block h-auto max-h-[32rem] max-w-full select-none" draggable={false} />
            {hotspots.map((hotspot, index) => (
              <span
                key={String(hotspot.id)}
                aria-hidden="true"
                className="absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-surface bg-primary text-xs font-bold text-on-primary shadow"
                style={{ left: `${Number(hotspot.x)}%`, top: `${Number(hotspot.y)}%` }}
              >
                {index + 1}
              </span>
            ))}
          </button>
        </div>
      ) : (
        <p className="rounded-card border border-dashed border-border p-4 text-sm text-muted">Choose a diagram to place hotspots on it.</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" variant="outline" iconStart={<Crosshair aria-hidden="true" />} disabled={disabled} onClick={() => addHotspot(50, 50)}>
          Add hotspot in the centre
        </Button>
        <CheckboxInput label="Students choose from a word bank" checked={labels !== null} disabled={disabled} onChange={setWordBank} />
        {labels !== null && <CheckboxInput label="Shuffle the word bank" checked={payload.shuffleLabels !== false} disabled={disabled} onChange={(shuffleLabels) => write({ ...payload, shuffleLabels }, answers)} />}
      </div>

      {labels !== null && (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold text-text">Word bank</h4>
          <BlockErrors path={`${path}payload.labels`} />
          <ol className="grid gap-2 md:grid-cols-2">
            {labels.map((label, index) => (
              <ListRow
                key={String(label.id)}
                title={String(label.id)}
                controls={
                  <RowControls
                    index={index}
                    count={labels.length}
                    itemLabel={`label ${String(label.id)}`}
                    disabled={disabled}
                    minCount={1}
                    onMove={(from, to) => write({ ...payload, labels: moveItem(labels, from, to) }, answers)}
                    onRemove={(i) => write({ ...payload, labels: removeItem(labels, i) }, answers.map((a) => (a.labelId === label.id ? compact({ ...a, labelId: undefined }) : a)))}
                  />
                }
              >
                <TextInput label="Label text" value={typeof label.text === "string" ? label.text : ""} disabled={disabled} path={`${path}payload.labels.${index}.text`} onChange={(text) => write({ ...payload, labels: updateItem(labels, index, { text }) }, answers)} />
              </ListRow>
            ))}
          </ol>
          <Button type="button" size="sm" variant="outline" iconStart={<Plus aria-hidden="true" />} disabled={disabled} onClick={() => write({ ...payload, labels: [...labels, { id: nextId("L", labels.map((l) => String(l.id))), text: "" }] }, answers)}>
            Add label (distractors welcome)
          </Button>
        </section>
      )}

      <section className="space-y-2">
        <h4 className="text-sm font-semibold text-text">Hotspots and answers</h4>
        <BlockErrors path={`${path}payload.hotspots`} />
        <BlockErrors path={`${path}answerSpec.hotspots`} />
        {hotspots.length === 0 && <p className="text-sm text-muted">No hotspots yet.</p>}
        <ol className="space-y-3">
          {hotspots.map((hotspot, index) => {
            const id = String(hotspot.id);
            const answer = answerFor(id);
            const answerIndex = answers.findIndex((a) => a.hotspotId === id);
            const answerPath = `${path}answerSpec.hotspots.${answerIndex}`;
            const setAnswer = (patch: Json) => write(payload, answers.map((a) => (a.hotspotId === id ? compact({ ...a, ...patch }) : a)));
            const alternatives = new Set(asArray<string>(answer.alternativeLabelIds));
            return (
              <ListRow
                key={id}
                title={
                  <span className="flex items-center gap-2">
                    <span className={cn("grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-on-primary")}>{index + 1}</span>
                    Hotspot {id}
                  </span>
                }
                controls={
                  <RowControls
                    index={index}
                    count={hotspots.length}
                    itemLabel={`hotspot ${index + 1}`}
                    disabled={disabled}
                    onMove={(from, to) => write({ ...payload, hotspots: moveItem(hotspots, from, to) }, answers)}
                    onRemove={(i) => write({ ...payload, hotspots: removeItem(hotspots, i) }, answers.filter((a) => a.hotspotId !== id))}
                  />
                }
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <NumberInput label="X (% from left)" min={0} max={100} value={hotspot.x as number} disabled={disabled} path={`${path}payload.hotspots.${index}.x`} onChange={(x) => write({ ...payload, hotspots: updateItem(hotspots, index, { x: pct(x ?? 0) }) }, answers)} />
                  <NumberInput label="Y (% from top)" min={0} max={100} value={hotspot.y as number} disabled={disabled} path={`${path}payload.hotspots.${index}.y`} onChange={(y) => write({ ...payload, hotspots: updateItem(hotspots, index, { y: pct(y ?? 0) }) }, answers)} />
                  <NumberInput label="Marks" optional hint="Blank: marks shared evenly." min={1} step={1} value={answer.marks as number | undefined} disabled={disabled} path={`${answerPath}.marks`} onChange={(marks) => setAnswer({ marks })} />
                </div>
                {labels !== null ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    <SelectInput
                      label="Correct label"
                      value={typeof answer.labelId === "string" ? answer.labelId : ""}
                      placeholder="Choose the label"
                      options={labels.map((l) => ({ value: String(l.id), label: `${String(l.id)}: ${String(l.text ?? "")}` }))}
                      disabled={disabled}
                      path={answerPath}
                      onChange={(labelId) => setAnswer({ labelId: labelId === "" ? undefined : labelId })}
                    />
                    <fieldset>
                      <legend className="text-sm font-medium text-text">Also accept</legend>
                      <div className="flex flex-wrap gap-x-4">
                        {labels
                          .filter((l) => l.id !== answer.labelId)
                          .map((l) => (
                            <CheckboxInput
                              key={String(l.id)}
                              label={String(l.text ?? l.id)}
                              checked={alternatives.has(String(l.id))}
                              disabled={disabled}
                              onChange={(checked) => {
                                const next = checked ? [...alternatives, String(l.id)] : [...alternatives].filter((x) => x !== l.id);
                                setAnswer({ alternativeLabelIds: next.length > 0 ? next : undefined });
                              }}
                            />
                          ))}
                      </div>
                    </fieldset>
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    <LinesInput label="Accepted labels" value={asArray<string>(answer.accepted)} disabled={disabled} path={`${answerPath}.accepted`} onChange={(accepted) => setAnswer({ accepted })} />
                    <CheckboxInput label="Case-sensitive" checked={answer.caseSensitive === true} disabled={disabled} onChange={(caseSensitive) => setAnswer({ caseSensitive: caseSensitive || undefined })} />
                  </div>
                )}
              </ListRow>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
