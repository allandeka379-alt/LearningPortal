import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { Timestamp } from "@/components/admin/DetailParts";
import { ActiveBadge, DemoBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav } from "@/components/admin/curriculum/CurriculumSubnav";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getCatalogueOptions, listGradeSchemes, type GradeSchemeRow } from "@/server/cms/curriculum";

export const metadata = { title: "Grade schemes" };

/** /admin/grade-schemes — grade-estimate bands per qualification (§12). Never presented as official grades. */
export default async function GradeSchemesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/grade-schemes" });
  const params = await searchParams;
  const filter = { qualificationId: firstParam(params, "qualificationId"), active: firstParam(params, "active"), cursor: firstParam(params, "cursor") };
  const [page, options] = await Promise.all([listGradeSchemes(actor, filter), getCatalogueOptions(actor)]);
  const { canDraft } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Grade schemes"
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Grade schemes" }]}
        description="Bands that turn a percentage into an estimated grade. Once a scheme has graded attempts its bands are frozen; changing them creates a new version so earlier results always reproduce."
        actions={
          canDraft ? (
            <ButtonLink href={filter.qualificationId ? `/admin/grade-schemes/new?qualificationId=${filter.qualificationId}` : "/admin/grade-schemes/new"}>New scheme</ButtonLink>
          ) : undefined
        }
      />
      <CurriculumSubnav active="grade-schemes" />
      <FilterBar
        action="/admin/grade-schemes"
        filters={[
          {
            kind: "select",
            name: "qualificationId",
            label: "Qualification",
            options: options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.shortName}` })),
            value: filter.qualificationId,
          },
          {
            kind: "select",
            name: "active",
            label: "State",
            options: [
              { value: "yes", label: "Active" },
              { value: "no", label: "Inactive" },
            ],
            value: filter.active,
          },
        ]}
      />
      <DataTable<GradeSchemeRow>
        caption="Grade schemes"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={<EmptyState title="No grade schemes match" titleAs="p" />}
        columns={[
          {
            key: "name",
            header: "Scheme",
            primary: true,
            cell: (row) => (
              <Link href={`/admin/grade-schemes/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                {row.name} <span className="font-normal text-muted">v{row.version}</span>
              </Link>
            ),
          },
          { key: "qualification", header: "Qualification", cell: (row) => `${row.qualification.examBoard.shortName} ${row.qualification.shortName}` },
          {
            key: "state",
            header: "State",
            cell: (row) => (
              <span className="inline-flex flex-wrap gap-1.5">
                <ActiveBadge active={row.isActive} />
                {row.isDefault && <Badge tone="primary" size="sm">Default</Badge>}
                {row.isEstimate ? <Badge tone="neutral" size="sm">Estimate</Badge> : <Badge tone="info" size="sm">Official</Badge>}
                {row.used && <Badge tone="neutral" appearance="outline" size="sm">Bands frozen</Badge>}
                {row.isDemo && <DemoBadge />}
              </span>
            ),
          },
          { key: "bands", header: "Bands", align: "end", cell: (row) => row._count.bands },
          { key: "used", header: "Used by", cell: (row) => `${row._count.syllabi} versions, ${row._count.routes} routes, ${row._count.assessments} assessments`, hideOnMobile: true },
          { key: "updated", header: "Updated", cell: (row) => <Timestamp value={row.updatedAt} />, hideOnMobile: true },
        ]}
      />
      <CursorPagination path="/admin/grade-schemes" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
    </Container>
  );
}
