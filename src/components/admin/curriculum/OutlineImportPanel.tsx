"use client";

import { ClipboardList } from "lucide-react";
import { useState } from "react";
import type { AdminActionState } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TOPIC_KIND_LABEL } from "./labels";
import type { OutlinePreviewView, TopicCommand } from "./topic-commands";

/**
 * Bulk entry of an official syllabus structure from a pasted, indented outline (§25 bulk import, §27 provenance):
 * preview the parsed tree first, then add it under the chosen node. Lines starting with ">" become learning
 * objectives; leading reference numbers become codes. The source document is recorded on the version.
 */

const EXAMPLE = ["1 Number", "  1.1 Integers", "    > Identify and use natural numbers", "  1.2 Fractions", "2 Algebra"].join("\n");

export function OutlineImportPanel({
  syllabusId,
  target,
  sources,
  run,
  pending,
}: {
  syllabusId: string;
  /** Insert under this node (null = top level). */
  target: { id: string; name: string } | null;
  sources: readonly SelectOption[];
  run: (command: TopicCommand) => Promise<AdminActionState>;
  pending: boolean;
}) {
  const [text, setText] = useState("");
  const [underSelected, setUnderSelected] = useState(false);
  const [topLevelKind, setTopLevelKind] = useState<"TOPIC" | "SECTION">("TOPIC");
  const [detectCodes, setDetectCodes] = useState(true);
  const [sourceId, setSourceId] = useState("");
  const [sourceNote, setSourceNote] = useState("");
  const [preview, setPreview] = useState<OutlinePreviewView | null>(null);
  const [state, setState] = useState<AdminActionState>(null);

  const parentId = underSelected && target ? target.id : null;
  const input = () => ({
    syllabusId,
    parentId,
    text,
    topLevelKind,
    detectCodes: detectCodes ? "on" : "",
    sourceId,
    sourceNote,
  });

  async function doPreview() {
    const result = await run({ type: "outline.preview", syllabusId, input: input() });
    setState(result && !result.ok ? result : null);
    setPreview(result?.ok ? (result.data as OutlinePreviewView) : null);
  }

  async function doImport() {
    const result = await run({ type: "outline.import", syllabusId, input: input() });
    setState(result);
    if (result?.ok) {
      setText("");
      setPreview(null);
    }
  }

  const errors = state && !state.ok ? state.error.fieldErrors : undefined;
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Paste the structure from the board&apos;s syllabus document, one line per topic. Indent subtopics; start learning objectives with &quot;&gt;&quot;.
        Only paste structures the board allows to be used, and record the document below.
      </p>
      <Field label="Outline" error={errors?.text} hint="Up to 1,500 lines. Blank lines and bullets are ignored.">
        <Textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setPreview(null);
          }}
          rows={10}
          placeholder={EXAMPLE}
          className="font-mono text-sm"
          spellCheck={false}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        {target && (
          <Checkbox
            label={`Insert under "${target.name}"`}
            description="Otherwise the outline is added at the top level."
            checked={underSelected}
            onChange={(event) => {
              setUnderSelected(event.target.checked);
              setPreview(null);
            }}
          />
        )}
        <Checkbox
          label="Split reference numbers into codes"
          description='"1.2 Fractions" → code 1.2, name Fractions.'
          checked={detectCodes}
          onChange={(event) => {
            setDetectCodes(event.target.checked);
            setPreview(null);
          }}
        />
        {parentId === null && (
          <RadioGroup
            legend="Top-level lines are"
            name={`outline-top-${syllabusId}`}
            orientation="horizontal"
            value={topLevelKind}
            onValueChange={(value) => {
              setTopLevelKind(value === "SECTION" ? "SECTION" : "TOPIC");
              setPreview(null);
            }}
            options={[
              { value: "TOPIC", label: "Topics" },
              { value: "SECTION", label: "Sections (papers or themes)" },
            ]}
          />
        )}
        <Field label="Copied from" optional error={errors?.sourceId}>
          <Select value={sourceId} onChange={(event) => setSourceId(event.target.value)} options={sources} placeholder="Choose the source document" />
        </Field>
        <Field label="Where in the document" optional error={errors?.sourceNote} hint='e.g. "Section 3, pages 10-14"'>
          <Input value={sourceNote} onChange={(event) => setSourceNote(event.target.value)} maxLength={500} />
        </Field>
      </div>

      {state && !state.ok && !errors?.text && (
        <Alert tone="danger" role="alert">
          {state.error.message}
        </Alert>
      )}
      {state?.ok && state.message && (
        <Alert tone="success" role="status">
          {state.message}
        </Alert>
      )}

      {preview && (
        <section aria-label="Outline preview" className="space-y-2 rounded-card border border-border p-3">
          <p className="text-sm font-medium text-text">
            {preview.topicCount} topics, {preview.objectiveCount} objectives, {preview.depth} {preview.depth === 1 ? "level" : "levels"} deep
          </p>
          {preview.errors.length > 0 && (
            <ul role="alert" className="space-y-1 text-sm text-danger-text">
              {preview.errors.map((error) => (
                <li key={`${error.line}-${error.message}`}>
                  Line {error.line}: {error.message}
                </li>
              ))}
            </ul>
          )}
          <ul className="max-h-72 space-y-0.5 overflow-y-auto text-sm">
            {preview.preview.map((row, index) => (
              <li key={index} style={{ paddingLeft: `${row.depth * 1.25}rem` }} className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-xs text-muted">{TOPIC_KIND_LABEL[row.kind] ?? row.kind}</span>
                {row.code && <span className="font-mono text-muted">{row.code}</span>}
                <span className="text-text">{row.name}</span>
                {row.objectives > 0 && <span className="text-xs text-muted">({row.objectives} objectives)</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" iconStart={<ClipboardList aria-hidden="true" />} disabled={pending || text.trim() === ""} onClick={doPreview}>
          Preview
        </Button>
        <Button disabled={pending || !preview || !preview.ok} onClick={doImport} loading={pending && preview !== null} loadingText="Adding…">
          {preview?.ok ? `Add ${preview.topicCount} topics` : "Add topics"}
        </Button>
      </div>
    </div>
  );
}
