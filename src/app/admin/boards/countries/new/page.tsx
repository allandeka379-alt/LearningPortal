import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { CountryForm } from "@/components/admin/curriculum/CatalogueForms";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess } from "@/server/cms/curriculum";
import { createCountryAction } from "../../actions";

export const metadata = { title: "New country" };

/** /admin/boards/countries/new — ADMIN+. */
export default async function NewCountryPage() {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/boards/countries/new" });
  if (!curriculumAccess(actor).canAdmin) redirect("/admin/boards/countries");
  return (
    <Container size="wide">
      <PageHeader title="New country" breadcrumbs={[{ label: "Countries", href: "/admin/boards/countries" }, { label: "New" }]} description="Start it hidden; add its year groups and board availability before listing it." />
      <AdminSection title="Country details">
        <CountryForm action={createCountryAction} cancelHref="/admin/boards/countries" submitLabel="Create country" />
      </AdminSection>
    </Container>
  );
}
