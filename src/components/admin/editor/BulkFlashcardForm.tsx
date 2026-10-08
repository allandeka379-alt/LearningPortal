"use client";

import { Layers } from "lucide-react";
import { useState } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { ActionForm, AdminField, useActionFormState } from "../ActionForm";
import { fieldErrorsFor, type AdminFormAction } from "../form-state";
import { ACCESS_TIER_OPTIONS, CARD_TYPE_OPTIONS } from "./options";
import { ProvenanceFields } from "./ProvenanceFields";
import { TopicTagPicker } from "./TopicTagPicker";
import type { Choice, LoadTopicsAction } from "./types";
import { WarningList } from "./WarningList";

/**
 * Bulk flashcard creation from a pasted 2-column block (§18, §25). "Check paste" (the default submit) parses and
 * renders without saving and lists every problem by row; "Create drafts" saves all cards in one transaction only
 * when every row is valid. Shared subject, card type, primary topic, access and licensing apply to every card.
 */

interface BulkPreview {
  intent: "preview";
  total: number;
  problems: { row: number; message: string }[];
  cards: { row: number; front: SanitizedHtml; back: SanitizedHtml; notes: SanitizedHtml | null; warnings: readonly ContentWarning[] }[];
}

function isPreview(value: unknown): value is BulkPreview {
  return typeof value === "object" && value !== null && (value as { intent?: unknown }).intent === "preview";
}

/**
 * The paste itself is a CONTROLLED textarea: React resets uncontrolled fields after a successful form action, and the
 * echoed form values are capped in length, so a long paste must not depend on them.
 */
function PasteField() {
  const { state } = useActionFormState();
  const [text, setText] = useState("");
  return (
    <Field
      label="Cards"
      required
      className="md:col-span-2"
      error={fieldErrorsFor(state, "text")}
      hint="Copy two columns from a spreadsheet: Front, Back (and optionally Notes). One card per row; a header row is skipped. Maths and markdown work as in the editor."
    >
      <Textarea name="text" rows={12} value={text} onChange={(event) => setText(event.target.value)} className="font-mono text-sm" spellCheck={false} />
    </Field>
  );
}

function PreviewResult() {
  const { state } = useActionFormState();
  if (!state?.ok || !isPreview(state.data)) return null;
  const { total, problems, cards } = state.data;
  return (
    <section aria-label="Paste check" className="space-y-3 md:col-span-2" aria-live="polite">
      <p className="text-sm font-medium text-text">
        {total} card{total === 1 ? "" : "s"} found{problems.length > 0 ? `, ${problems.length} problem${problems.length === 1 ? "" : "s"} to fix` : ", ready to create"}.
      </p>
      {problems.length > 0 && (
        <ul className="space-y-1 rounded-control border border-danger/40 bg-danger-soft p-3 text-sm text-danger-text">
          {problems.map((problem, index) => (
            <li key={`${problem.row}-${index}`}>
              Row {problem.row}: {problem.message}
            </li>
          ))}
        </ul>
      )}
      {cards.length > 0 && (
        <ol className="grid gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <li key={card.row} className="space-y-2 rounded-card border border-border bg-surface p-3">
              <p className="text-xs font-semibold text-muted">Row {card.row}</p>
              <RichContent html={card.front} className="font-semibold" />
              <hr className="border-border" />
              <RichContent html={card.back} />
              {card.notes && <RichContent html={card.notes} className="text-sm text-muted" />}
              <WarningList warnings={card.warnings} title="Warnings" />
            </li>
          ))}
        </ol>
      )}
      {total > cards.length && <p className="text-sm text-muted">Showing the first {cards.length} cards.</p>}
    </section>
  );
}

export function BulkFlashcardForm({
  action,
  subjects,
  sources,
  syllabi,
  loadTopicsAction,
}: {
  action: AdminFormAction<unknown>;
  subjects: readonly Choice[];
  sources: readonly Choice[];
  syllabi: readonly Choice[];
  loadTopicsAction: LoadTopicsAction;
}) {
  return (
    <ActionForm
      action={action}
      submitLabel="Check paste"
      submitVariant="secondary"
      pendingLabel="Working…"
      columns="two"
      secondaryActions={
        <Button type="submit" name="intent" value="create" iconStart={<Layers aria-hidden="true" />}>
          Create drafts
        </Button>
      }
    >
      <AdminField name="subjectId" label="Subject" type="select" options={subjects} placeholder="Choose a subject" required />
      <AdminField name="cardType" label="Card type" type="select" options={CARD_TYPE_OPTIONS} defaultValue="DEFINITION" required />
      <div className="md:col-span-2">
        <TopicTagPicker syllabusOptions={syllabi} initialTopics={[]} loadTopicsAction={loadTopicsAction} legend="Deck topic" hint="Tag one topic: it becomes every card's primary topic (deck). More tags can be added per card later." />
      </div>
      <PasteField />
      <AdminField name="accessTier" label="Access" type="select" options={ACCESS_TIER_OPTIONS} defaultValue="PREMIUM" />
      <AdminField name="languageCode" label="Language" defaultValue="en" maxLength={10} mono />
      <div className="grid gap-4 rounded-card border border-border p-4 md:col-span-2 md:grid-cols-2">
        <h2 className="text-base font-semibold text-text md:col-span-2">Licensing (applies to every card)</h2>
        <ProvenanceFields
          values={{ sourceId: null, author: null, copyrightStatus: "UNVERIFIED", licenceCode: null, attribution: null, sourceUrl: null, publicationDate: null }}
          sources={sources}
          requiredForReview={["sourceId", "author", "copyrightStatus"]}
        />
      </div>
      <PreviewResult />
    </ActionForm>
  );
}
