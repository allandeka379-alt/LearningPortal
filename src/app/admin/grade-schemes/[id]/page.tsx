import Link from "next/link";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { ActiveBadge, DemoBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { GradeSchemeForm } from "@/components/admin/curriculum/GradeSchemeForm";
import { sourceOptions, withCurrent } from "@/components/admin/curriculum/labels";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatPercent } from "@/lib/format";
import { getCatalogueOptions, getGradeSchemeDetail } from "@/server/cms/curriculum";
import { updateGradeSchemeAction } from "../actions";

export const metadata = { title: "Grade scheme" };

/** /admin/grade-schemes/[id] — bands (estimates), usage, versions and the edit form of one grade scheme. */
export default async function GradeSchemePage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/grade-schemes/${id}` });
  const [scheme, options] = await Promise.all([orNotFound(getGradeSchemeDetail(actor, id)), getCatalogueOptions(actor)]);

  return (
    <Container size="wide">
      <PageHeader
        title={`${scheme.name} (v${scheme.version})`}
        eyebrow={`${scheme.qualification.examBoard.shortName} · ${scheme.qualification.shortName}`}
        breadcrumbs={[{ label: "Grade schemes", href: "/admin/grade-schemes" }, { label: `${scheme.name} v${scheme.version}` }]}
      />
      <div className="space-y-6">
        {scheme.used && (
          <Alert tone="info" title="Bands frozen">
            Students&apos; grade estimates were calculated with these bands, so they never change. Saving different bands creates version {scheme.version + 1}, which takes
            over this scheme&apos;s role (default flag, syllabus and route links); this version stays for the earlier results.
          </Alert>
        )}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <AdminSection title="Bands" flush>
            <DataTable
              caption="Grade bands, best first"
              className="rounded-none border-x-0 border-b-0"
              rows={scheme.bands}
              rowKey={(band) => band.id}
              columns={[
                { key: "label", header: "Grade", primary: true, cell: (band) => <span className="font-mono">{band.label}</span> },
                { key: "min", header: "From", align: "end", cell: (band) => formatPercent(band.minPercent, { maximumFractionDigits: 2 }) },
                { key: "pass", header: "Pass", cell: (band) => (band.isPass ? "Pass" : "Fail") },
                { key: "note", header: "Note", cell: (band) => band.description ?? "", hideOnMobile: true },
              ]}
            />
          </AdminSection>
          <AdminSection title="State">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                <ActiveBadge active={scheme.isActive} />
                {scheme.isDefault && <Badge tone="primary" size="sm">Default</Badge>}
                {scheme.isEstimate ? <Badge size="sm">Estimate</Badge> : <Badge tone="info" size="sm">Official</Badge>}
                {scheme.isDemo && <DemoBadge />}
              </div>
              <KeyValueList
                columns={1}
                items={[
                  { label: "Caveat shown to students", value: scheme.disclaimer },
                  { label: "Source", value: scheme.source?.name ?? null },
                  { label: "Linked syllabus versions", value: scheme._count.syllabi },
                  { label: "Linked routes", value: scheme._count.routes },
                  { label: "Assessments naming it", value: scheme._count.assessments },
                  { label: "Last changed", value: <Timestamp value={scheme.updatedAt} /> },
                  {
                    label: "Other versions",
                    value:
                      scheme.versions.length > 0 ? (
                        <span className="flex flex-wrap gap-x-3">
                          {scheme.versions.map((version) => (
                            <Link key={version.id} href={`/admin/grade-schemes/${version.id}`} className="text-primary underline underline-offset-4">
                              v{version.version}
                              {version.isActive ? "" : " (inactive)"}
                            </Link>
                          ))}
                        </span>
                      ) : null,
                  },
                ]}
              />
            </div>
          </AdminSection>
        </div>
        <AdminSection title="Edit" description={scheme.canEdit ? undefined : "Only an admin can change a live scheme."}>
          {scheme.canEdit ? (
            <GradeSchemeForm
              action={updateGradeSchemeAction}
              values={scheme}
              qualifications={null}
              sources={withCurrent(sourceOptions(options.sources), scheme.source ? { id: scheme.source.id, label: scheme.source.name } : null)}
              canEditLive={scheme.canEditLive}
              frozen={scheme.used}
              cancelHref="/admin/grade-schemes"
              submitLabel={scheme.used ? "Save (creates a new version if the bands change)" : "Save scheme"}
            />
          ) : (
            <p className="text-sm text-muted">You can review this scheme; changes are made by an admin.</p>
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
