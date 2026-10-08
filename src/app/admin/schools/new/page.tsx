import { requireAdminPage } from "@/components/admin/guards";
import { SchoolForm } from "@/components/admin/schools/SchoolForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { listCountryOptions } from "@/server/cms/schools/service";
import { createSchoolAction } from "../actions";

export const metadata = { title: "New school" };

/** /admin/schools/new — create a school (pending verification unless verified now). */
export default async function NewSchoolPage() {
  const actor = await requireAdminPage("school.manage", { next: "/admin/schools/new" });
  const countries = await listCountryOptions(actor);
  return (
    <Container size="wide">
      <PageHeader
        title="New school"
        breadcrumbs={[{ label: "Schools", href: "/admin/schools" }, { label: "New school" }]}
        description="Add a school so its admins and teachers can be invited. Students join through the school's rosters or class codes."
      />
      <Card className="max-w-4xl">
        <CardBody>
          <SchoolForm action={createSchoolAction} countries={countries} submitLabel="Create school" />
        </CardBody>
      </Card>
    </Container>
  );
}
