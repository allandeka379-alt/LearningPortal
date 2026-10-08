import { AnnouncementForm } from "@/components/admin/announcements/AnnouncementForm";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { listAnnouncementCountries } from "@/server/cms/announcements/service";
import { createAnnouncementAction } from "../actions";

export const metadata = { title: "New announcement" };

/** /admin/notifications/new — write an announcement (`?scope=SCHOOL&school=<slug>` pre-fills a school). */
export default async function NewAnnouncementPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("class.manage", { next: "/admin/notifications/new" });
  const params = await searchParams;
  const countries = await listAnnouncementCountries(actor);
  const scope = enumParam(params, "scope", ["GLOBAL", "SCHOOL", "CLASS"] as const) ?? "GLOBAL";
  return (
    <Container size="wide">
      <PageHeader
        title="New announcement"
        breadcrumbs={[{ label: "Notifications", href: "/admin/notifications" }, { label: "New announcement" }]}
        description="Write it once; publishing delivers it to each recipient's inbox. Drafts and scheduled announcements can still be edited."
      />
      <Card className="max-w-4xl">
        <CardBody>
          <AnnouncementForm
            action={createAnnouncementAction}
            countries={countries}
            submitLabel="Save draft"
            values={{ scope, schoolRef: firstParam(params, "school") ?? null, classRef: firstParam(params, "class") ?? null }}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
