import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { QualificationForm } from "@/components/admin/curriculum/CatalogueForms";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess, getCatalogueOptions } from "@/server/cms/curriculum";
import { createQualificationAction } from "../actions";

export const metadata = { title: "New qualification" };

/** /admin/qualifications/new — ADMIN+ (`?boardId=` preselects the board). */
export default async function NewQualificationPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/qualifications/new" });
  if (!curriculumAccess(actor).canAdmin) redirect("/admin/qualifications");
  const params = await searchParams;
  const options = await getCatalogueOptions(actor);
  return (
    <Container size="wide">
      <PageHeader title="New qualification" breadcrumbs={[{ label: "Qualifications", href: "/admin/qualifications" }, { label: "New" }]} description="Start it hidden; list it as coming soon once its subjects are verified." />
      <AdminSection title="Qualification details">
        <QualificationForm
          action={createQualificationAction}
          values={{ examBoardId: firstParam(params, "boardId") }}
          boards={options.boards.map((board) => ({ value: board.id, label: `${board.shortName} (${board.name})` }))}
          levels={options.levels.map((level) => ({ value: level.id, label: level.name }))}
          live={false}
          cancelHref="/admin/qualifications"
          submitLabel="Create qualification"
        />
      </AdminSection>
    </Container>
  );
}
