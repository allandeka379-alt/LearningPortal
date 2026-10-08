import type { Metadata } from "next";
import { EnterCodeForm } from "@/components/family/EnterCodeForm";
import { LinkCodeCard } from "@/components/family/LinkCodeCard";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RelationshipSelect, RequestLinkForm } from "@/components/parent/RequestLinkForm";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { getParentOutstandingCode } from "@/server/family";
import { cancelParentCodeAction, createParentCodeAction, redeemChildCodeAction, requestLinkAction } from "./actions";

export const metadata: Metadata = { title: "Link a child" };

/**
 * /parent/link (§21): three ways to link, all ending with the child's consent: enter the child's code (instant),
 * ask by the child's email / phone / username (the child approves), or create a code for the child to enter.
 */
export default async function LinkChildPage() {
  const actor = await requireRole("PARENT", { next: "/parent/link" });
  const outstanding = await getParentOutstandingCode(actor);

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Link a child"
        breadcrumbs={[{ label: "Your children", href: "/parent" }, { label: "Link a child" }]}
        description="Your child always agrees to the link and chooses what you can see."
        className="pb-0"
      />

      <Card as="section" aria-labelledby="link-code">
        <CardHeader
          titleAs="h2"
          title={<span id="link-code">Enter your child&rsquo;s code</span>}
          description="Your child creates a code under Family in their account. Enter it here to link straight away."
        />
        <CardBody>
          <EnterCodeForm action={redeemChildCodeAction} label="Link code" submitLabel="Link my child">
            <RelationshipSelect />
          </EnterCodeForm>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="link-request">
        <CardHeader
          titleAs="h2"
          title={<span id="link-request">Or send a request</span>}
          description="We'll ask your child to approve it in their account. Requests expire after 14 days."
        />
        <CardBody>
          <RequestLinkForm action={requestLinkAction} />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="link-parent-code">
        <CardHeader titleAs="h2" title={<span id="link-parent-code">Or give your child a code</span>} />
        <CardBody>
          <LinkCodeCard
            action={createParentCodeAction}
            cancelAction={cancelParentCodeAction}
            outstanding={outstanding ? { linkId: outstanding.linkId, expiresAt: outstanding.expiresAt.toISOString() } : null}
            audience="parent"
            timeZone={actor.timeZone}
            extraFields={<RelationshipSelect />}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
