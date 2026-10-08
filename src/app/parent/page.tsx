import { KeyRound, Mail, UserPlus, Users } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChildSummaryCard } from "@/components/parent/ChildSummaryCard";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireRole } from "@/server/auth/guards";
import { getParentDashboard } from "@/server/family";

export const metadata: Metadata = { title: "Your children" };

/**
 * Parent dashboard (§21): every linked child with their exam countdown, this week's study time, recent results and
 * weak areas, as far as each child shares them. Honest empty state with the linking steps when no child is linked.
 */
export default async function ParentHomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const actor = await requireRole("PARENT", { next: "/parent" });
  const [children, query] = await Promise.all([getParentDashboard(actor), searchParams]);

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Your children"
        description="See how each child is getting on. Children choose what they share with you."
        actions={
          children.length > 0 ? (
            <ButtonLink href="/parent/link" variant="outline" iconStart={<UserPlus aria-hidden="true" />}>
              Link another child
            </ButtonLink>
          ) : undefined
        }
        className="pb-0"
      />

      {query.unlinked === "1" && (
        <Alert tone="neutral" role="status">
          You no longer follow that child. To link again, you&rsquo;ll need their agreement.
        </Alert>
      )}

      {children.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            motif
            icon={<Users aria-hidden="true" />}
            title="No children linked yet"
            description="Link your child's account to follow their subjects, study time, results and exam countdown."
            action={<ButtonLink href="/parent/link">Link a child</ButtonLink>}
          />
          <Card variant="sunken">
            <CardBody>
              <h2 className="text-base font-semibold text-text">How linking works</h2>
              <ol className="mt-3 space-y-3 text-sm text-text">
                <li className="flex gap-3">
                  <KeyRound aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-semibold">Fastest:</strong> ask your child to open <em>Family</em> in their account and create a link
                    code, then enter the code on the Link a child page. The code works once and expires after a day.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-semibold">Or</strong> send a request using your child&rsquo;s email, phone number or school username.
                    They approve it in their account.
                  </span>
                </li>
              </ol>
              <p className="mt-3 text-sm text-muted">
                Your child decides what you can see and can change it at any time. Their AI tutor conversations are private unless they choose to share them.
              </p>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          {children.map((detail) => (
            <ChildSummaryCard key={detail.child.linkId} detail={detail} />
          ))}
        </div>
      )}
    </Container>
  );
}
