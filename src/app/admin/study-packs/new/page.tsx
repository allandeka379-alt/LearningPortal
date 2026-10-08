import { requireAdminPage } from "@/components/admin/guards";
import { StudyPackDetailsForm } from "@/components/admin/questions/study-packs/StudyPackForms";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { getMediaOptions } from "@/server/cms/questions/lookups";
import { createStudyPackAction } from "../actions";

export const metadata = { title: "New study pack" };

/** /admin/study-packs/new — name the pack; scope, entitlements and prices follow on its page. */
export default async function NewStudyPackPage() {
  await requireAdminPage("content.draft", { next: "/admin/study-packs/new" });
  const covers = await getMediaOptions(["MARKETING_IMAGE"]);
  return (
    <Container>
      <PageHeader
        title="New study pack"
        breadcrumbs={[{ label: "Study packs", href: "/admin/study-packs" }, { label: "New" }]}
        description="Created as a draft that unlocks nothing yet. Add what it covers and unlocks next."
      />
      <Card>
        <CardBody>
          <StudyPackDetailsForm action={createStudyPackAction} submitLabel="Create draft" hiddenFields={{}} values={{ slug: "", title: "" }} covers={covers} />
        </CardBody>
      </Card>
    </Container>
  );
}
