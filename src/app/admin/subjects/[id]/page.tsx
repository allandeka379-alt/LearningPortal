import Link from "next/link";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatLocalDate } from "@/components/admin/format";
import { SubjectForm } from "@/components/admin/curriculum/CatalogueForms";
import { CatalogueStatusBadge, DemoBadge, SyllabusStatusBadge, VerifiedBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { sourceOptions, withCurrent } from "@/components/admin/curriculum/labels";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { localDateFromDateColumn } from "@/lib/dates";
import { isListedCatalogueStatus } from "@/server/curriculum/core";
import { curriculumAccess, getCatalogueOptions, getSubject } from "@/server/cms/curriculum";
import { updateSubjectAction } from "../actions";

export const metadata = { title: "Subject" };

/** /admin/subjects/[id] — verification, catalogue status, details and syllabus versions of one subject. */
export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/subjects/${id}` });
  const [subject, options] = await Promise.all([orNotFound(getSubject(actor, id)), getCatalogueOptions(actor)]);
  const access = curriculumAccess(actor);
  const live = isListedCatalogueStatus(subject.catalogueStatus) && subject.isPublic;
  const hasCurrent = subject.syllabi.some((version) => version.status === "CURRENT");

  return (
    <Container size="wide">
      <PageHeader
        title={subject.name}
        eyebrow={`${subject.qualification.examBoard.shortName} · ${subject.qualification.shortName}`}
        breadcrumbs={[{ label: "Subjects", href: "/admin/subjects" }, { label: subject.name }]}
        actions={access.canDraft ? <ButtonLink href={`/admin/syllabuses/new?subjectId=${subject.id}`}>New syllabus version</ButtonLink> : undefined}
      />
      <div className="space-y-6">
        {!subject.verified && (
          <Alert tone="warning" title="Not verified yet">
            <p>
              {subject.seedNote?.policy ??
                "Confirm the name, official code and availability against the board's official subject list, then record that list as this subject's source."}
            </p>
            {subject.seedNote && (
              <p className="mt-2">
                Seeded as <strong>{subject.seedNote.seededName}</strong>
                {subject.seedNote.seededCode ? (
                  <>
                    {" "}
                    with code <span className="font-mono">{subject.seedNote.seededCode}</span>
                  </>
                ) : (
                  " with no code (to be entered from the official list)"
                )}
                .{subject.seedNote.note ? <> Seed note: {subject.seedNote.note}</> : null}
              </p>
            )}
          </Alert>
        )}

        <AdminSection title="Summary">
          <KeyValueList
            columns={3}
            items={[
              {
                label: "Status",
                value: (
                  <span className="inline-flex flex-wrap gap-1.5">
                    <CatalogueStatusBadge status={subject.catalogueStatus} />
                    <VerifiedBadge verified={subject.verified} />
                    {subject.isDemo && <DemoBadge />}
                  </span>
                ),
              },
              { label: "Public URL", value: <span className="font-mono">{subject.publicPath}</span> },
              { label: "Verified against", value: subject.source?.name ?? null },
              { label: "Official code", value: subject.officialCode ? <span className="font-mono">{subject.officialCode}</span> : null },
              { label: "Current syllabus", value: hasCurrent ? "Published" : "None yet" },
              { label: "Students enrolled", value: subject._count.enrollments },
              { label: "Qualification status", value: <CatalogueStatusBadge status={subject.qualification.catalogueStatus} /> },
              { label: "Last changed", value: <Timestamp value={subject.updatedAt} /> },
            ]}
          />
          <p className="mt-4 text-sm text-muted">
            Coming soon requires verification. Available (enrollable) also requires a current syllabus version.
          </p>
        </AdminSection>

        <AdminSection
          title="Syllabus versions"
          description="Each version is a separate record. Students stay on the version they enrolled in."
          action={access.canDraft ? <ButtonLink href={`/admin/syllabuses/new?subjectId=${subject.id}`} variant="outline" size="sm">New version</ButtonLink> : undefined}
          flush
        >
          <DataTable
            caption="Syllabus versions"
            className="rounded-none border-x-0 border-b-0"
            rows={subject.syllabi}
            rowKey={(row) => row.id}
            empty={<EmptyState title="No syllabus versions yet" description="Create the first version and build its topic tree." titleAs="p" appearance="plain" />}
            columns={[
              {
                key: "label",
                header: "Version",
                primary: true,
                cell: (row) => (
                  <Link href={`/admin/syllabuses/${row.id}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {row.versionLabel}
                    <span className="block text-sm font-normal text-muted">{row.title}</span>
                  </Link>
                ),
              },
              { key: "status", header: "Status", cell: (row) => <span className="inline-flex gap-1.5"><SyllabusStatusBadge status={row.status} />{row.isDemo && <DemoBadge />}</span> },
              {
                key: "dates",
                header: "Effective",
                cell: (row) =>
                  `${formatLocalDate(localDateFromDateColumn(row.effectiveFrom))} to ${row.effectiveTo ? formatLocalDate(localDateFromDateColumn(row.effectiveTo)) : "open-ended"}`,
              },
              { key: "published", header: "Published", cell: (row) => <Timestamp value={row.publishedAt} />, hideOnMobile: true },
            ]}
          />
        </AdminSection>

        <AdminSection title="Details and verification">
          {access.canAdmin ? (
            <SubjectForm
              action={updateSubjectAction}
              values={subject}
              qualifications={null}
              categories={options.categories.map((c) => ({ value: c.id, label: c.name }))}
              sources={withCurrent(sourceOptions(options.sources), subject.source ? { id: subject.source.id, label: subject.source.name } : null)}
              live={live}
              publicPrefix={`/${subject.qualification.examBoard.slug}/${subject.qualification.slug}/`}
              cancelHref="/admin/subjects"
              submitLabel="Save subject"
            />
          ) : (
            <ReadOnlyNotice />
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
