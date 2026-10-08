"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useId, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { fieldErrorsFor } from "../form-state";
import { useActionFormState } from "../ActionForm";
import type { Choice, LoadTopicsAction, ObjectiveChoice, SyllabusTopicsPayload, TaggedTopicChoice } from "./types";

/**
 * Topic tagging for lessons and flashcards (§3, §26 content reuse across boards and syllabus versions): any number of
 * topic tags from any syllabus version, exactly one PRIMARY (the home topic that places the item in the topic tree /
 * deck), and — for lessons — the learning objectives covered, chosen among the objectives of the tagged topics.
 * Submits `topicIds` (repeated), `primaryTopicId` and `objectiveIds` (repeated) with the enclosing `ActionForm`.
 */

function within(path: string, tagged: readonly string[]): boolean {
  return tagged.some((p) => path === p || path.startsWith(`${p}/`));
}

export function TopicTagPicker({
  syllabusOptions,
  defaultSyllabusId,
  initialTopics,
  loadTopicsAction,
  withObjectives = false,
  initialObjectives = [],
  initialObjectiveIds = [],
  legend = "Topics",
  hint,
}: {
  syllabusOptions: readonly Choice[];
  defaultSyllabusId?: string | null;
  initialTopics: readonly TaggedTopicChoice[];
  loadTopicsAction: LoadTopicsAction;
  withObjectives?: boolean;
  initialObjectives?: readonly ObjectiveChoice[];
  initialObjectiveIds?: readonly string[];
  legend?: string;
  hint?: string;
}) {
  const { state } = useActionFormState();
  const [tags, setTags] = useState<TaggedTopicChoice[]>(() => {
    const list = [...initialTopics];
    if (list.length > 0 && !list.some((t) => t.isPrimary)) list[0] = { ...list[0], isPrimary: true } as TaggedTopicChoice;
    return list;
  });
  const [objectiveIds, setObjectiveIds] = useState<Set<string>>(() => new Set(initialObjectiveIds));
  const [syllabusId, setSyllabusId] = useState<string>(defaultSyllabusId ?? "");
  const [loaded, setLoaded] = useState<Record<string, SyllabusTopicsPayload>>({});
  const [topicId, setTopicId] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const primaryName = useId();

  useEffect(() => {
    if (!syllabusId || loaded[syllabusId]) return;
    startTransition(async () => {
      const result = await loadTopicsAction(syllabusId);
      if (result?.ok) {
        setLoaded((current) => ({ ...current, [syllabusId]: result.data }));
        setLoadError(null);
      } else {
        setLoadError(result?.error.message ?? "Topics could not be loaded.");
      }
    });
  }, [syllabusId, loaded, loadTopicsAction]);

  const syllabusLabel = (id: string) => syllabusOptions.find((option) => option.value === id)?.label ?? "";
  const current = syllabusId ? loaded[syllabusId] : undefined;
  const taggedIds = new Set(tags.map((t) => t.id));

  const add = () => {
    const topic = current?.topics.find((t) => t.id === topicId);
    if (!topic || taggedIds.has(topic.id)) return;
    setTags((list) => [...list, { id: topic.id, label: topic.label, syllabusId, syllabusLabel: syllabusLabel(syllabusId), path: topic.path, isPrimary: list.length === 0 }]);
    setTopicId("");
  };

  const remove = (id: string) =>
    setTags((list) => {
      const next = list.filter((t) => t.id !== id);
      if (next.length > 0 && !next.some((t) => t.isPrimary)) next[0] = { ...next[0], isPrimary: true } as TaggedTopicChoice;
      return next;
    });

  const objectives = useMemo(() => {
    const known = new Map<string, ObjectiveChoice>();
    for (const objective of initialObjectives) known.set(objective.id, objective);
    for (const payload of Object.values(loaded)) for (const objective of payload.objectives) known.set(objective.id, objective);
    const paths = tags.map((t) => t.path);
    return [...known.values()].filter((o) => within(o.topicPath, paths) || objectiveIds.has(o.id));
  }, [initialObjectives, loaded, tags, objectiveIds]);

  const primary = tags.find((t) => t.isPrimary);
  const topicErrors = [...(fieldErrorsFor(state, "topicIds") ?? []), ...(fieldErrorsFor(state, "primaryTopicId") ?? [])];
  const objectiveErrors = fieldErrorsFor(state, "objectiveIds");

  return (
    <div className="space-y-4">
      <fieldset className="space-y-3" aria-describedby={topicErrors.length ? `${primaryName}-errors` : undefined}>
        <legend className="text-sm font-medium text-text">{legend}</legend>
        {hint && <p className="text-sm text-muted">{hint}</p>}
        {tags.map((tag) => (
          <input key={tag.id} type="hidden" name="topicIds" value={tag.id} />
        ))}
        <input type="hidden" name="primaryTopicId" value={primary?.id ?? ""} />
        {tags.length === 0 ? (
          <p className="rounded-control border border-dashed border-border p-3 text-sm text-muted">No topics tagged yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-control border border-border">
            {tags.map((tag) => (
              <li key={tag.id} className="flex flex-wrap items-center gap-3 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text">{tag.label}</p>
                  <p className="truncate text-xs text-muted">{tag.syllabusLabel}</p>
                </div>
                <label className="flex min-h-9 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={primaryName}
                    checked={tag.isPrimary}
                    onChange={() => setTags((list) => list.map((t) => ({ ...t, isPrimary: t.id === tag.id })))}
                    className="size-4 accent-primary"
                  />
                  Primary
                </label>
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(tag.id)} iconStart={<X aria-hidden="true" />} aria-label={`Remove ${tag.label}`}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="grid gap-3 rounded-control bg-subtle p-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <Field label="Syllabus version">
            <Select
              value={syllabusId}
              onChange={(event) => {
                setSyllabusId(event.target.value);
                setTopicId("");
              }}
              options={syllabusOptions}
              placeholder="Choose a syllabus version"
            />
          </Field>
          <Field label="Topic" hint={pending ? "Loading topics…" : loadError ?? undefined}>
            <Select value={topicId} onChange={(event) => setTopicId(event.target.value)} disabled={!current} placeholder={current ? "Choose a topic" : "Choose a syllabus first"}>
              {current?.topics.map((topic) => (
                <option key={topic.id} value={topic.id} disabled={taggedIds.has(topic.id)}>
                  {`${"  ".repeat(topic.depth)}${topic.label}`}
                </option>
              ))}
            </Select>
          </Field>
          <Button type="button" variant="secondary" onClick={add} disabled={!topicId} iconStart={<Plus aria-hidden="true" />}>
            Add tag
          </Button>
        </div>
        {topicErrors.length > 0 && (
          <p id={`${primaryName}-errors`} className="text-sm text-danger-text" role="alert">
            {topicErrors.join(" ")}
          </p>
        )}
      </fieldset>

      {withObjectives && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-text">Learning objectives</legend>
          <p className="text-sm text-muted">Objectives of the tagged topics that this lesson covers.</p>
          {[...objectiveIds].map((id) => (
            <input key={id} type="hidden" name="objectiveIds" value={id} />
          ))}
          {objectives.length === 0 ? (
            <p className="text-sm text-muted">
              {tags.length === 0 ? "Tag a topic to choose its objectives." : "The tagged topics have no learning objectives (or their syllabus is not loaded: choose it above)."}
            </p>
          ) : (
            <div className="max-h-72 space-y-1 overflow-auto rounded-control border border-border p-3">
              {objectives.map((objective) => (
                <Checkbox
                  key={objective.id}
                  label={objective.label}
                  checked={objectiveIds.has(objective.id)}
                  onChange={(event) =>
                    setObjectiveIds((set) => {
                      const next = new Set(set);
                      if (event.target.checked) next.add(objective.id);
                      else next.delete(objective.id);
                      return next;
                    })
                  }
                />
              ))}
            </div>
          )}
          {objectiveErrors && (
            <p className="text-sm text-danger-text" role="alert">
              {objectiveErrors.join(" ")}
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}
