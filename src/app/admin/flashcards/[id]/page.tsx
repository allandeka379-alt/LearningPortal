import { ClipboardCheck } from "lucide-react";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ContentWorkflowBar } from "@/components/admin/editor/ContentWorkflowBar";
import { FlashcardEditorForm } from "@/components/admin/editor/FlashcardEditorForm";
import { CARD_TYPE_OPTIONS, COPYRIGHT_OPTIONS, optionLabel } from "@/components/admin/editor/options";
import { PreviewSections } from "@/components/admin/editor/PreviewSections";
import { WorkflowSummary } from "@/components/admin/editor/WorkflowSummary";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { getFlashcardEditor } from "@/server/cms/flashcards/service";
import { previewMarkdown } from "@/server/cms/lessons/service";
import { reviewHref, revisionsHref } from "@/server/cms/review/labels";
import { reviewCapabilities } from "@/server/cms/review/service";
import { contentSourceOptions, subjectOptions, syllabusOptions } from "@/server/cms/review/taxonomy";
import { loadTopicsAction, previewMarkdownAction } from "../../lessons/actions";
import { searchMediaAction } from "../../media/actions";
import { orNotFound } from "../../review/_lib/load";
import {
  approveAction,
  archiveAction,
  reopenAction,
  discardDraftAction,
  publishAction,
  requestChangesAction,
  startEditAction,
  submitForReviewAction,
} from "../../review/actions";
import { saveFlashcardAction } from "../actions";

export const metadata = { title: "Edit flashcard" };

/** /admin/flashcards/[id] — flashcard editor (drafts) or read-only view with the workflow actions. */
export default async function FlashcardEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/flashcards/${id}` });
  const card = await orNotFound(getFlashcardEditor(actor, id));
  const capabilities = reviewCapabilities(actor);
  const liveId = card.draftOfId ?? card.id;
  const [subjects, sources, syllabi, subjectSyllabi] = await Promise.all([
    subjectOptions(actor),
    contentSourceOptions(actor, [card.fields.sourceId]),
    syllabusOptions(actor),
    syllabusOptions(actor, card.fields.subjectId),
  ]);
  const defaultSyllabusId = card.topics.find((t) => t.isPrimary)?.syllabusId ?? subjectSyllabi[0]?.value ?? null;
  const sides = card.editable
    ? []
    : await Promise.all(
        (
          [
            ["Front", card.fields.front],
            ["Back", card.fields.back],
            ["Notes", card.fields.notes],
          ] as const
        )
          .filter(([, source]) => source && source.trim() !== "")
          .map(async ([label, source]) => {
            const preview = await previewMarkdown(actor, { body: source ?? "", mode: "card" });
            return { label, html: preview.html, inline: false, warnings: preview.warnings };
          }),
      );
  const title = `${optionLabel(CARD_TYPE_OPTIONS, card.fields.cardType)} card`;

  return (
    <Container size="wide">
      <PageHeader
        title={title}
        eyebrow={card.draftOfId ? "Draft of a published card" : subjects.find((s) => s.value === card.fields.subjectId)?.label}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Flashcards", href: "/admin/flashcards" },
          { label: title },
        ]}
        actions={
          <ButtonLink href={reviewHref("FLASHCARD", card.id)} variant="outline" iconStart={<ClipboardCheck aria-hidden="true" />}>
            Review view
          </ButtonLink>
        }
      />
      <div className="space-y-6 pb-12">
        <AdminSection title="Workflow">
          <div className="space-y-4">
            <WorkflowSummary
              status={card.status}
              revision={card.revision}
              draftOfId={card.draftOfId}
              aiGenerated={card.aiGenerated}
              reviewNotes={card.reviewNotes}
              people={card.people}
              openFlags={card.openFlags}
              flagsHref={`/admin/flags?entityType=FLASHCARD&entityId=${liveId}`}
              historyHref={revisionsHref("FLASHCARD", liveId)}
              liveHref={card.draftOfId ? `/admin/flashcards/${card.draftOfId}` : null}
              pendingDraft={card.pendingDraft ? { href: `/admin/flashcards/${card.pendingDraft.id}`, status: card.pendingDraft.status } : null}
            />
            <ContentWorkflowBar
              entityType="FLASHCARD"
              id={card.id}
              status={card.status}
              draftOfId={card.draftOfId}
              pendingDraftId={card.pendingDraft?.id ?? null}
              aiGenerated={card.aiGenerated}
              isOwnWork={card.isOwnWork}
              fourEyes={card.fourEyes}
              capabilities={capabilities}
              itemLabel="this card"
              actions={{
                submit: submitForReviewAction,
                requestChanges: requestChangesAction,
                approve: approveAction,
                publish: publishAction,
                archive: archiveAction,
                reopen: reopenAction,
                startEdit: startEditAction,
                discard: discardDraftAction,
              }}
            />
          </div>
        </AdminSection>

        {card.editable ? (
          <FlashcardEditorForm
            action={saveFlashcardAction}
            submitLabel="Save draft"
            card={{ id: card.id, updatedAt: card.updatedAt.toISOString(), ...card.fields, topics: card.topics }}
            subjects={subjects}
            sources={sources}
            syllabi={syllabi}
            defaultSyllabusId={defaultSyllabusId}
            previewAction={previewMarkdownAction}
            mediaSearchAction={searchMediaAction}
            loadTopicsAction={loadTopicsAction}
          />
        ) : (
          <>
            <Alert tone="info" title={card.status === "PUBLISHED" ? "Published cards are not edited in place" : "This card is locked while it is in the workflow"}>
              {card.status === "PUBLISHED"
                ? "Use “Edit published version” to create a draft copy. Students keep this version until the copy is published."
                : card.status === "ARCHIVED"
                  ? "Archived cards are hidden from students; their review history is kept."
                  : "A reviewer can send it back to draft with notes, or approve and publish it."}
            </Alert>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <AdminSection title="Preview">
                <PreviewSections sections={sides} />
              </AdminSection>
              <AdminSection title="Details">
                <KeyValueList
                  columns={1}
                  items={[
                    { label: "Topics", value: card.topics.map((t) => `${t.label}${t.isPrimary ? " (primary)" : ""} — ${t.syllabusLabel}`).join("; ") },
                    { label: "Access", value: humanizeEnum(card.fields.accessTier) },
                    { label: "Copyright", value: optionLabel(COPYRIGHT_OPTIONS, card.fields.copyrightStatus) },
                    { label: "Source", value: sources.find((s) => s.value === card.fields.sourceId)?.label },
                    { label: "Author", value: card.fields.author },
                    { label: "Licence", value: card.fields.licenceCode },
                  ]}
                />
              </AdminSection>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
