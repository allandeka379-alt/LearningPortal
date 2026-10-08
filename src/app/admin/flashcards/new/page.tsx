import { requireAdminPage } from "@/components/admin/guards";
import { FlashcardEditorForm } from "@/components/admin/editor/FlashcardEditorForm";
import { firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { contentSourceOptions, subjectOptions, syllabusOptions } from "@/server/cms/review/taxonomy";
import { searchMediaAction } from "../../media/actions";
import { loadTopicsAction, previewMarkdownAction } from "../../lessons/actions";
import { createFlashcardAction } from "../actions";

export const metadata = { title: "New flashcard" };

/** /admin/flashcards/new — one DRAFT platform card with live preview (`?subjectId=` preselects the subject). */
export default async function NewFlashcardPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/flashcards/new" });
  const params = await searchParams;
  const subjectId = uuidParam(params, "subjectId") ?? null;
  const cardType = firstParam(params, "cardType") ?? "DEFINITION";
  const [subjects, sources, syllabi, subjectSyllabi] = await Promise.all([
    subjectOptions(actor),
    contentSourceOptions(actor),
    syllabusOptions(actor),
    subjectId ? syllabusOptions(actor, subjectId) : Promise.resolve([]),
  ]);
  return (
    <Container size="wide">
      <PageHeader
        title="New flashcard"
        description="Write the prompt and the answer. The card is saved as a draft and goes through review before students see it."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Flashcards", href: "/admin/flashcards" },
          { label: "New flashcard" },
        ]}
      />
      <div className="pb-12">
        <FlashcardEditorForm
          action={createFlashcardAction}
          submitLabel="Create draft"
          card={{
            id: null,
            updatedAt: null,
            subjectId,
            cardType,
            front: "",
            back: "",
            notes: null,
            accessTier: "PREMIUM",
            languageCode: "en",
            topics: [],
            sourceId: null,
            author: null,
            copyrightStatus: "UNVERIFIED",
            licenceCode: null,
            attribution: null,
            sourceUrl: null,
            publicationDate: null,
          }}
          subjects={subjects}
          sources={sources}
          syllabi={syllabi}
          defaultSyllabusId={subjectSyllabi[0]?.value ?? null}
          previewAction={previewMarkdownAction}
          mediaSearchAction={searchMediaAction}
          loadTopicsAction={loadTopicsAction}
        />
      </div>
    </Container>
  );
}
