import { Package } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudyPackCard } from "@/components/study-packs/StudyPackCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listStudyPacksForStudent, STUDY_PACKS_PATH } from "@/server/study-packs/catalogue";

export const metadata: Metadata = { title: "Study packs" };

/**
 * Study-pack catalogue (§24): PUBLISHED packs for the student's qualification(s), what each unlocks and its price
 * (database data only). A pack is platform content unlocked in its scope, bought once through the checkout.
 */
export default async function StudyPacksPage() {
  const actor = await requireOnboardedStudent({ next: STUDY_PACKS_PATH });
  const catalogue = await listStudyPacksForStudent(actor);
  const forWhom = catalogue.qualificationLabels.length > 0 ? catalogue.qualificationLabels.join(", ") : null;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Study packs"
        description={
          forWhom
            ? `Complete packs for ${forWhom}: lessons, practice, tests and more for a subject, unlocked with one payment.`
            : "Complete packs for a subject: lessons, practice, tests and more, unlocked with one payment."
        }
        breadcrumbs={[{ label: "Plan & billing", href: "/app/billing" }, { label: "Study packs" }]}
        className="pb-0"
      />

      {catalogue.packs.length === 0 ? (
        <EmptyState
          icon={<Package aria-hidden="true" />}
          title={forWhom ? `No study packs for ${forWhom} yet` : "Choose your subjects to see study packs"}
          description={
            forWhom
              ? "Packs appear here as soon as they are published for your qualification. Your plan already gives you access to everything it includes."
              : "Study packs are listed for the qualification you study."
          }
          action={
            forWhom ? (
              <ButtonLink href="/app/billing" variant="outline">
                See your plan
              </ButtonLink>
            ) : (
              <ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>
            )
          }
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {catalogue.packs.map((pack) => (
            <li key={pack.id}>
              <StudyPackCard pack={pack} timeZone={actor.timeZone} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
