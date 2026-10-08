import { Bot, EyeOff, ImageOff, Undo2 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiConsentForm } from "@/components/family/AiConsentForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getStudentLinkForConsent } from "@/server/family";
import { allowAiSharingAction } from "../../actions";

export const metadata: Metadata = { title: "Share AI conversations" };

/**
 * The separate, explicit consent screen for letting ONE linked parent read the student's AI tutor / solver
 * conversations (§21 "unless explicitly designed and consented to"). Only reachable while the platform switch is on
 * and the link rests on the student's own consent; otherwise it explains that sharing is not available.
 */
export default async function AiConsentPage({ params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  const actor = await requireOnboardedStudent({ next: `/app/family/${linkId}/ai-consent` });
  const link = await getStudentLinkForConsent(actor, linkId);
  if (!link) notFound();

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Share your AI conversations?"
        breadcrumbs={[{ label: "Family", href: "/app/family" }, { label: "Share AI conversations" }]}
        description={`This is optional. Your conversations with the AI tutor are private unless you choose to share them with ${link.parentName}.`}
        className="pb-0"
      />

      {link.aiShared ? (
        <Alert
          tone="info"
          title="Already shared"
          action={
            <ButtonLink href="/app/family" variant="outline" size="sm">
              Back to Family
            </ButtonLink>
          }
        >
          {link.parentName} can already read your AI conversations. You can stop sharing on the Family page.
        </Alert>
      ) : !link.canOffer ? (
        <Alert
          tone="neutral"
          title="Not available"
          action={
            <ButtonLink href="/app/family" variant="outline" size="sm">
              Back to Family
            </ButtonLink>
          }
        >
          Sharing AI conversations with {link.parentName} isn&rsquo;t available. Your conversations stay private.
        </Alert>
      ) : (
        <Card>
          <CardBody className="space-y-5">
            <h2 className="text-base font-semibold text-text">If you share with {link.parentName}</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Bot aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>They can read your AI tutor and question-solver conversations: what you typed and what the tutor answered.</span>
              </li>
              <li className="flex gap-3">
                <ImageOff aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>They won&rsquo;t see photos you uploaded, only that a photo was attached.</span>
              </li>
              <li className="flex gap-3">
                <EyeOff aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>They won&rsquo;t see conversations you archived. Teachers and schools can never see your AI conversations.</span>
              </li>
              <li className="flex gap-3">
                <Undo2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>They stop seeing them the moment you choose &ldquo;Stop sharing&rdquo; or remove them from Family.</span>
              </li>
            </ul>
            <AiConsentForm linkId={link.linkId} parentName={link.parentName} action={allowAiSharingAction} backHref="/app/family" />
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
