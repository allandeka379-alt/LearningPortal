import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { Lock } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PersonalCardForm } from "@/components/flashcards/PersonalCardForm";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getPersonalCardFormOptions } from "@/server/flashcards/service";
import { parseDeckParams, type SearchParams } from "../_lib/params";
import { createPersonalCardAction, previewCardAction } from "../actions";

export const metadata: Metadata = { title: "New flashcard" };

/**
 * Write your own flashcard (§18): private to the student, studied like any other card (it comes up as a new card).
 * `?subjectId=&topicId=` pre-selects the subject and topic (deck and topic pages link here).
 */
export default async function NewFlashcardPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const actor = await requireOnboardedStudent({ next: "/app/flashcards/new" });
  const params = parseDeckParams(await searchParams);
  const options = await getPersonalCardFormOptions(actor);
  const breadcrumbs = [{ label: "Flashcards", href: "/app/flashcards" }, { label: "New card" }];

  if (!options.entitled) {
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="New flashcard" breadcrumbs={breadcrumbs} />
        <EmptyState
          icon={<Lock aria-hidden="true" />}
          title="Flashcards come with full access"
          description="Add a subject that includes flashcards, or upgrade your plan to write your own cards."
          action={
            <>
              <UpgradeButton />
              <ButtonLink href="/app/subjects/manage" variant="outline">
                Your subjects
              </ButtonLink>
            </>
          }
        />
      </Container>
    );
  }

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="New flashcard"
        breadcrumbs={breadcrumbs}
        description="Only you can see your own cards. They come up in your reviews like any other card."
        className="pb-0"
      />
      <Card>
        <CardBody>
          <PersonalCardForm
            mode="create"
            subjects={options.subjects}
            initial={{ ...(params.subjectId ? { subjectId: params.subjectId } : {}), ...(params.topicId ? { topicId: params.topicId } : {}) }}
            saveAction={createPersonalCardAction}
            previewAction={previewCardAction}
            doneHref="/app/flashcards"
          />
        </CardBody>
      </Card>
    </Container>
  );
}
