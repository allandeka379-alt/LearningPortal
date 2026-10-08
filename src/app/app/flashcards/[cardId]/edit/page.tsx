import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PersonalCardForm } from "@/components/flashcards/PersonalCardForm";
import { Card, CardBody } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getPersonalCard, getPersonalCardFormOptions, type PersonalCardDetail } from "@/server/flashcards/service";
import { isAppError } from "@/server/lib/errors";
import { previewCardAction, updatePersonalCardAction } from "../../actions";

export const metadata: Metadata = { title: "Edit flashcard" };

/** Edit one of the student's own cards (§18). Another student's card id is a plain 404 (never "forbidden"). */
export default async function EditFlashcardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const { cardId } = await params;
  const actor = await requireOnboardedStudent({ next: `/app/flashcards/${encodeURIComponent(cardId)}/edit` });
  let card: PersonalCardDetail;
  try {
    card = await getPersonalCard(actor, cardId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const options = await getPersonalCardFormOptions(actor);
  // A card whose subject left the list (dropped, or no longer in the plan) cannot be moved silently to another one.
  const subjectAvailable = options.subjects.some((s) => s.subjectId === card.subjectId);

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Edit flashcard"
        breadcrumbs={[
          { label: "Flashcards", href: "/app/flashcards" },
          { label: "Your cards", href: "/app/flashcards/mine" },
          { label: "Edit" },
        ]}
        description="Changes apply from your next review. Your schedule for this card is kept."
        className="pb-0"
      />
      <Card>
        <CardBody>
          {!subjectAvailable ? (
            <p className="text-sm text-muted">This card&rsquo;s subject isn&rsquo;t on your list any more, so it can&rsquo;t be edited right now. You can still delete it from Your cards.</p>
          ) : (
            <PersonalCardForm
              mode="edit"
              subjects={options.subjects}
              initial={card}
              saveAction={updatePersonalCardAction}
              previewAction={previewCardAction}
              doneHref="/app/flashcards/mine"
            />
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
