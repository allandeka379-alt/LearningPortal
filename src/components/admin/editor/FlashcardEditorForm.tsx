"use client";

import { ActionForm, AdminField, useActionFormState } from "../ActionForm";
import { fieldErrorsFor, type AdminFormAction } from "../form-state";
import { ACCESS_TIER_OPTIONS, CARD_TYPE_OPTIONS } from "./options";
import { MarkdownEditor } from "./MarkdownEditor";
import { ProvenanceFields, type ProvenanceValues } from "./ProvenanceFields";
import { TopicTagPicker } from "./TopicTagPicker";
import type { Choice, LoadTopicsAction, MediaSearchAction, PreviewAction, TaggedTopicChoice } from "./types";

/**
 * Platform flashcard editor (§18): card type, markdown front / back / notes with live preview, subject, topic tags
 * (the primary topic decides the deck), access and licensing. Used for new cards (no `id`) and drafts.
 */

export interface FlashcardEditorValues extends ProvenanceValues {
  id: string | null;
  updatedAt: string | null;
  subjectId: string | null;
  cardType: string;
  front: string;
  back: string;
  notes: string | null;
  accessTier: string;
  languageCode: string;
  topics: TaggedTopicChoice[];
}

function Side({
  name,
  label,
  defaultValue,
  previewAction,
  mediaSearchAction,
  optional,
}: {
  name: "front" | "back" | "notes";
  label: string;
  defaultValue: string;
  previewAction: PreviewAction;
  mediaSearchAction: MediaSearchAction;
  optional?: boolean;
}) {
  const { state } = useActionFormState();
  return (
    <MarkdownEditor
      name={name}
      label={label}
      optional={optional}
      defaultValue={defaultValue}
      error={fieldErrorsFor(state, name)}
      previewAction={previewAction}
      mediaSearchAction={mediaSearchAction}
      mode="card"
      rows={name === "notes" ? 3 : 5}
      blocks={false}
      maxLength={5000}
    />
  );
}

export function FlashcardEditorForm({
  action,
  card,
  subjects,
  sources,
  syllabi,
  defaultSyllabusId,
  previewAction,
  mediaSearchAction,
  loadTopicsAction,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  card: FlashcardEditorValues;
  subjects: readonly Choice[];
  sources: readonly Choice[];
  syllabi: readonly Choice[];
  defaultSyllabusId: string | null;
  previewAction: PreviewAction;
  mediaSearchAction: MediaSearchAction;
  loadTopicsAction: LoadTopicsAction;
  submitLabel: string;
}) {
  const hidden: Record<string, string> = {};
  if (card.id) hidden.id = card.id;
  if (card.updatedAt) hidden.expectedUpdatedAt = card.updatedAt;
  return (
    <ActionForm action={action} submitLabel={submitLabel} successAs="toast" columns="two" hiddenFields={hidden}>
      <AdminField name="cardType" label="Card type" type="select" options={CARD_TYPE_OPTIONS} defaultValue={card.cardType} required />
      <AdminField name="subjectId" label="Subject" type="select" options={subjects} placeholder="Choose a subject" defaultValue={card.subjectId} required />
      <div className="space-y-6 md:col-span-2">
        <Side name="front" label="Front (prompt)" defaultValue={card.front} previewAction={previewAction} mediaSearchAction={mediaSearchAction} />
        <Side name="back" label="Back (answer)" defaultValue={card.back} previewAction={previewAction} mediaSearchAction={mediaSearchAction} />
        <Side name="notes" label="Notes (mnemonic, example)" defaultValue={card.notes ?? ""} previewAction={previewAction} mediaSearchAction={mediaSearchAction} optional />
      </div>
      <div className="md:col-span-2">
        <TopicTagPicker
          syllabusOptions={syllabi}
          defaultSyllabusId={defaultSyllabusId}
          initialTopics={card.topics}
          loadTopicsAction={loadTopicsAction}
          hint="The primary topic decides the deck the card appears in."
        />
      </div>
      <AdminField name="accessTier" label="Access" type="select" options={ACCESS_TIER_OPTIONS} defaultValue={card.accessTier} />
      <AdminField name="languageCode" label="Language" defaultValue={card.languageCode} maxLength={10} mono />
      <div className="grid gap-4 rounded-card border border-border p-4 md:col-span-2 md:grid-cols-2">
        <h2 className="text-base font-semibold text-text md:col-span-2">Licensing</h2>
        <ProvenanceFields values={card} sources={sources} requiredForReview={["sourceId", "author", "copyrightStatus"]} />
      </div>
    </ActionForm>
  );
}
