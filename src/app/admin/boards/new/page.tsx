import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { BoardForm } from "@/components/admin/curriculum/CatalogueForms";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess, getCatalogueOptions } from "@/server/cms/curriculum";
import { createBoardAction } from "../actions";

export const metadata = { title: "New exam board" };

/** /admin/boards/new — ADMIN+. */
export default async function NewBoardPage() {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/boards/new" });
  if (!curriculumAccess(actor).canAdmin) redirect("/admin/boards");
  const options = await getCatalogueOptions(actor);
  return (
    <Container size="wide">
      <PageHeader
        title="New exam board"
        breadcrumbs={[{ label: "Exam boards", href: "/admin/boards" }, { label: "New" }]}
        description="Start it hidden. List it once its qualifications and subjects are ready."
      />
      <AdminSection title="Board details">
        <BoardForm
          action={createBoardAction}
          countries={options.countries.map((country) => ({ value: country.id, label: country.name }))}
          live={false}
          cancelHref="/admin/boards"
          submitLabel="Create board"
        />
      </AdminSection>
    </Container>
  );
}
