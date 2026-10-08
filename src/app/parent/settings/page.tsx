import { KeyRound, LogOut, Mail } from "lucide-react";
import type { Metadata } from "next";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DigestPreferenceForm } from "@/components/parent/DigestPreferenceForm";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { getParentDigestPreference } from "@/server/family";
import { saveDigestPreferenceAction } from "./actions";

export const metadata: Metadata = { title: "Settings" };

/** Parent settings: the progress-summary preference (§21), email and password, and signing out. */
export default async function ParentSettingsPage() {
  const actor = await requireRole("PARENT", { next: "/parent/settings" });
  const digest = await getParentDigestPreference(actor);
  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader title="Settings" className="pb-0" />
      <Card as="section" aria-labelledby="settings-digest">
        <CardHeader
          titleAs="h2"
          title={<span id="settings-digest">Progress summaries</span>}
          description="Summaries are part of detailed reports: they cover each child whose plan includes progress reports for parents."
        />
        <CardBody>
          <DigestPreferenceForm value={digest} action={saveDigestPreferenceAction} />
        </CardBody>
      </Card>
      <Card as="section" aria-labelledby="settings-sign-in">
        <CardHeader
          titleAs="h2"
          title={<span id="settings-sign-in">Email and password</span>}
          description="You sign in with your email address. Sign-in codes and password resets go to it."
        />
        <CardBody className="flex flex-wrap gap-2">
          <ButtonLink href="/change-email" variant="outline" iconStart={<Mail aria-hidden="true" />}>
            Change email address
          </ButtonLink>
          <ButtonLink href="/change-password" variant="outline" iconStart={<KeyRound aria-hidden="true" />}>
            Change password
          </ButtonLink>
        </CardBody>
      </Card>
      <Card as="section" aria-labelledby="settings-account">
        <CardHeader titleAs="h2" title={<span id="settings-account">This device</span>} />
        <CardBody>
          <LogoutButton variant="ghost" iconStart={<LogOut aria-hidden="true" />}>
            Sign out
          </LogoutButton>
        </CardBody>
      </Card>
    </Container>
  );
}
