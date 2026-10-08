import { requireAdminPage } from "@/components/admin/guards";
import { BulkFlashcardForm } from "@/components/admin/editor/BulkFlashcardForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { contentSourceOptions, subjectOptions, syllabusOptions } from "@/server/cms/review/taxonomy";
import { loadTopicsAction } from "../../lessons/actions";
import { bulkFlashcardsAction } from "../actions";

export const metadata = { title: "Bulk add flashcards" };

/** /admin/flashcards/bulk — paste two spreadsheet columns, check them, then create every card as a DRAFT at once. */
export default async function BulkFlashcardsPage() {
  const actor = await requireAdminPage("content.draft", { next: "/admin/flashcards/bulk" });
  const [subjects, sources, syllabi] = await Promise.all([subjectOptions(actor), contentSourceOptions(actor), syllabusOptions(actor)]);
  return (
    <Container size="wide">
      <PageHeader
        title="Bulk add flashcards"
        description="Paste Front and Back columns (and optionally Notes) from a spreadsheet. Check the paste first; cards are created as drafts only when every row is valid."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Flashcards", href: "/admin/flashcards" },
          { label: "Bulk add" },
        ]}
      />
      <Card className="mb-12">
        <CardBody>
          <BulkFlashcardForm action={bulkFlashcardsAction} subjects={subjects} sources={sources} syllabi={syllabi} loadTopicsAction={loadTopicsAction} />
        </CardBody>
      </Card>
    </Container>
  );
}
