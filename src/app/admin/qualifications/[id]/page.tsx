import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { QualificationForm } from "@/components/admin/curriculum/CatalogueForms";
import { CatalogueStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { isListedCatalogueStatus } from "@/server/curriculum/core";
import { curriculumAccess, getCatalogueOptions, getQualification } from "@/server/cms/curriculum";
import { updateQualificationAction } from "../actions";

export const metadata = { title: "Qualification" };

/** /admin/qualifications/[id] — details plus shortcuts to its subjects, exam sessions and grade schemes. */
export default async function QualificationPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/qualifications/${id}` });
  const [qualification, options] = await Promise.all([orNotFound(getQualification(actor, id)), getCatalogueOptions(actor)]);
  const { canAdmin } = curriculumAccess(actor);
  const live = isListedCatalogueStatus(qualification.catalogueStatus);

  return (
    <Container size="wide">
      <PageHeader
        title={qualification.name}
        eyebrow={`${qualification.examBoard.shortName} · ${qualification.level.name}`}
        breadcrumbs={[{ label: "Qualifications", href: "/admin/qualifications" }, { label: qualification.shortName }]}
        actions={
          <>
            <ButtonLink href={`/admin/subjects?qualificationId=${id}`} variant="outline">
              Subjects
            </ButtonLink>
            <ButtonLink href={`/admin/exam-sessions?qualificationId=${id}`} variant="outline">
              Exam sessions
            </ButtonLink>
            <ButtonLink href={`/admin/grade-schemes?qualificationId=${id}`} variant="outline">
              Grade schemes
            </ButtonLink>
          </>
        }
      />
      <div className="space-y-6">
        <AdminSection title="Summary">
          <KeyValueList
            columns={3}
            items={[
              { label: "Status", value: <CatalogueStatusBadge status={qualification.catalogueStatus} /> },
              { label: "Public URL", value: <span className="font-mono">{qualification.publicPath}</span> },
              { label: "Board status", value: <CatalogueStatusBadge status={qualification.examBoard.catalogueStatus} /> },
              { label: "Subjects", value: qualification._count.subjects },
              { label: "Exam sessions", value: qualification._count.examSessions },
              { label: "Grade schemes", value: qualification._count.gradeSchemes },
              { label: "Students on this track", value: qualification._count.students },
              { label: "Last changed", value: <Timestamp value={qualification.updatedAt} /> },
            ]}
          />
        </AdminSection>
        <AdminSection title="Details" description="The board is fixed once created: it is part of every public URL and student track.">
          {canAdmin ? (
            <QualificationForm
              action={updateQualificationAction}
              values={qualification}
              boards={null}
              levels={options.levels.map((level) => ({ value: level.id, label: level.name }))}
              live={live}
              boardSlug={qualification.examBoard.slug}
              cancelHref="/admin/qualifications"
              submitLabel="Save qualification"
            />
          ) : (
            <ReadOnlyNotice />
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
