import Link from "next/link";
import { ListTree, Tags } from "lucide-react";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, ApprovalInfo, KeyValueList } from "@/components/admin/DetailParts";
import { formatLocalDate } from "@/components/admin/format";
import { DemoBadge, SyllabusStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { EditableList } from "@/components/admin/curriculum/EditableList";
import { COPYRIGHT_OPTIONS, sourceOptions, withCurrent } from "@/components/admin/curriculum/labels";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { ComponentForm, DraftVersionForm, EditorialVersionForm, RouteForm } from "@/components/admin/curriculum/SyllabusForms";
import { VersionLifecycle } from "@/components/admin/curriculum/VersionLifecycle";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { today } from "@/server/cms/curriculum/shared";
import { curriculumAccess, getCatalogueOptions, getSyllabusVersion } from "@/server/cms/curriculum";
import {
  addComponentAction,
  addRouteAction,
  archiveSyllabusAction,
  correctPublishedSyllabusAction,
  deleteComponentAction,
  deleteDraftSyllabusAction,
  deleteRouteAction,
  makeSyllabusCurrentAction,
  publishSyllabusAction,
  updateComponentAction,
  updateDraftSyllabusAction,
  updateRouteAction,
} from "../actions";

export const metadata = { title: "Syllabus version" };

const COPYRIGHT_LABEL = new Map(COPYRIGHT_OPTIONS.map((option) => [option.value, option.label]));

/**
 * /admin/syllabuses/[id] — one syllabus version: lifecycle (publish / make current / archive with who/when), metadata
 * and provenance (§27), papers and award routes, lineage, and links to the topic tree and content carry-over.
 * Published versions are read-only apart from admin wording corrections.
 */
export default async function SyllabusVersionPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/syllabuses/${id}` });
  const [version, options] = await Promise.all([orNotFound(getSyllabusVersion(actor, id)), getCatalogueOptions(actor)]);
  const access = curriculumAccess(actor);
  const isDraft = version.status === "DRAFT";
  const { permissions } = version;
  const subject = version.subject;
  const current = version.siblings.find((sibling) => sibling.status === "CURRENT") ?? null;
  const gradeSchemes = version.gradeSchemes.map((scheme) => ({ value: scheme.id, label: `${scheme.name} (v${scheme.version})${scheme.isActive ? "" : " (inactive)"}` }));
  const sources = withCurrent(sourceOptions(options.sources), version.source ? { id: version.source.id, label: version.source.name } : null);
  const componentChoices = version.components.map((component) => ({ id: component.id, code: component.code, name: component.name }));

  return (
    <Container size="wide">
      <PageHeader
        title={`${subject.name} · ${version.versionLabel}`}
        eyebrow={`${subject.qualification.examBoard.shortName} · ${subject.qualification.shortName}`}
        breadcrumbs={[
          { label: "Subjects", href: "/admin/subjects" },
          { label: subject.name, href: `/admin/subjects/${subject.id}` },
          { label: version.versionLabel },
        ]}
        description={version.title}
        actions={
          <>
            <ButtonLink href={`/admin/syllabuses/${id}/topics`} iconStart={<ListTree aria-hidden="true" />}>
              {permissions.canEditStructure ? "Edit topic tree" : "View topic tree"}
            </ButtonLink>
            {permissions.canCreateVersion && !isDraft && (
              <ButtonLink href={`/admin/syllabuses/new?subjectId=${subject.id}&from=${id}`} variant="outline">
                New version from this
              </ButtonLink>
            )}
          </>
        }
      />
      <div className="space-y-6">
        {version.isDemo && (
          <Alert tone="warning" title="Development demo data">
            This version was created by the development seed. It is not an official syllabus.
          </Alert>
        )}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <AdminSection title="Status" description={isDraft ? "Drafts are invisible to students and fully editable." : "Published: the structure is frozen."}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <SyllabusStatusBadge status={version.status} />
                {version.isDemo && <DemoBadge />}
              </div>
              <ApprovalInfo
                steps={[
                  { label: "Created", by: version.createdByName, at: version.createdAt },
                  { label: "Published", by: version.publishedByName, at: version.publishedAt },
                  { label: "Archived", by: null, at: version.archivedAt },
                ]}
              />
              <VersionLifecycle
                id={id}
                status={version.status}
                versionLabel={version.versionLabel}
                permissions={permissions}
                publishProblems={version.publishProblems}
                publishBlockedByFourEyes={version.publishBlockedByFourEyes}
                canDraft={access.canDraft}
                currentVersionLabel={current?.versionLabel ?? null}
                pinnedEnrollments={version._count.enrollments}
                effectiveFromInFuture={version.effectiveFrom > today()}
                actions={{ publish: publishSyllabusAction, makeCurrent: makeSyllabusCurrentAction, archive: archiveSyllabusAction, deleteDraft: deleteDraftSyllabusAction }}
              />
            </div>
          </AdminSection>

          <AdminSection title="At a glance">
            <KeyValueList
              columns={1}
              items={[
                { label: "Effective", value: `${formatLocalDate(version.effectiveFrom)} to ${version.effectiveTo ? formatLocalDate(version.effectiveTo) : "open-ended"}` },
                { label: "Topics and objectives", value: `${version._count.topics} topics · ${version.objectiveCount} objectives` },
                { label: "Students on this version", value: version._count.enrollments },
                { label: "Question tags in this version", value: version._count.questionTopics },
                { label: "Copyright", value: COPYRIGHT_LABEL.get(version.copyrightStatus) ?? version.copyrightStatus },
                { label: "Source", value: version.source?.name ?? null },
                { label: "Public subject page", value: <span className="font-mono">{version.publicPath}</span> },
                {
                  label: "Copied from",
                  value: version.supersedes ? (
                    <Link href={`/admin/syllabuses/${version.supersedes.id}`} className="text-primary underline underline-offset-4">
                      {version.supersedes.versionLabel}
                    </Link>
                  ) : null,
                },
                {
                  label: "Copied into",
                  value:
                    version.supersededBy.length > 0 ? (
                      <span className="flex flex-wrap gap-x-3">
                        {version.supersededBy.map((next) => (
                          <Link key={next.id} href={`/admin/syllabuses/${next.id}`} className="text-primary underline underline-offset-4">
                            {next.versionLabel}
                          </Link>
                        ))}
                      </span>
                    ) : null,
                },
              ]}
            />
          </AdminSection>
        </div>

        {version.supersedes && (
          <AdminSection
            title="Carry content over"
            description={`Copy question, lesson and flashcard tags from ${version.supersedes.versionLabel} to the matching topics of this version. Students on the old version keep their content.`}
            action={
              <ButtonLink href={`/admin/syllabuses/${id}/retag`} variant="outline" size="sm" iconStart={<Tags aria-hidden="true" />}>
                Review and copy tags
              </ButtonLink>
            }
          >
            <p className="text-sm text-muted">Tags are curriculum metadata, so this never creates a new content revision.</p>
          </AdminSection>
        )}

        <AdminSection title={isDraft ? "Version details and provenance" : "Version details"}>
          {permissions.canEditStructure ? (
            <DraftVersionForm action={updateDraftSyllabusAction} values={version} sources={sources} gradeSchemes={gradeSchemes} />
          ) : permissions.canCorrect ? (
            <>
              <p className="mb-4 text-sm text-muted">The version is published: its label, code, start date and provenance are frozen. You can correct its wording and links.</p>
              <EditorialVersionForm action={correctPublishedSyllabusAction} values={version} gradeSchemes={gradeSchemes} />
            </>
          ) : (
            <KeyValueList
              items={[
                { label: "Title", value: version.title },
                { label: "Official code", value: version.code },
                { label: "Official document", value: version.officialDocumentUrl },
                { label: "Grade scheme", value: version.gradeScheme ? `${version.gradeScheme.name} (v${version.gradeScheme.version})` : "Qualification default" },
                { label: "Source notes", value: version.sourceNotes },
              ]}
            />
          )}
        </AdminSection>

        <AdminSection title="Papers" description="Examination components of this version (mock-exam structure, timetable).">
          <EditableList
            empty={<EmptyState title="No papers yet" description={permissions.canEditStructure ? "Add the papers students sit." : undefined} titleAs="p" appearance="plain" />}
            rows={version.components.map((component) => ({
              id: component.id,
              title: (
                <>
                  <span className="font-mono">{component.code}</span> {component.name}
                </>
              ),
              editLabel: `Edit ${component.name}`,
              meta: (
                <>
                  <span>{component.kind.replace(/_/g, " ").toLowerCase()}</span>
                  {component.durationMinutes && <span>{component.durationMinutes} min</span>}
                  {component.maxMarks && <span>{component.maxMarks} marks</span>}
                  {component.weightingPercent !== null && <span>{component.weightingPercent}%</span>}
                </>
              ),
              editor: permissions.canEditStructure ? (
                <div className="space-y-4">
                  <ComponentForm action={updateComponentAction} syllabusId={id} values={component} submitLabel="Save paper" />
                  <ConfirmAction
                    action={deleteComponentAction}
                    fields={{ id: component.id }}
                    triggerLabel="Remove paper"
                    triggerVariant="ghost"
                    title={`Remove ${component.name}?`}
                    description="Its links to routes and topics are removed too."
                    confirmLabel="Remove paper"
                    tone="danger"
                  />
                </div>
              ) : undefined,
            }))}
          />
          {permissions.canEditStructure && (
            <details className="mt-4">
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary">Add a paper</summary>
              <div className="mt-3">
                <ComponentForm action={addComponentAction} syllabusId={id} values={{ sortOrder: version.components.length }} submitLabel="Add paper" />
              </div>
            </details>
          )}
        </AdminSection>

        <AdminSection title="Award routes" description="Routes through one version, e.g. IGCSE Core and Extended, or AS and full A Level. Leave empty for a single route.">
          <EditableList
            empty={<EmptyState title="Single route" description="No routes defined: every student takes the whole version." titleAs="p" appearance="plain" />}
            rows={version.routes.map((route) => ({
              id: route.id,
              title: (
                <>
                  <span className="font-mono">{route.code}</span> {route.name}
                </>
              ),
              editLabel: `Edit ${route.name}`,
              meta: (
                <>
                  {route.isDefault && <span>Default</span>}
                  <span>
                    {route.componentLinks.length} {route.componentLinks.length === 1 ? "paper" : "papers"}
                  </span>
                </>
              ),
              editor: permissions.canEditStructure ? (
                <div className="space-y-4">
                  <RouteForm action={updateRouteAction} syllabusId={id} values={route} components={componentChoices} gradeSchemes={gradeSchemes} submitLabel="Save route" />
                  <ConfirmAction
                    action={deleteRouteAction}
                    fields={{ id: route.id }}
                    triggerLabel="Remove route"
                    triggerVariant="ghost"
                    title={`Remove ${route.name}?`}
                    confirmLabel="Remove route"
                    tone="danger"
                  />
                </div>
              ) : undefined,
            }))}
          />
          {permissions.canEditStructure && (
            <details className="mt-4">
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary">Add a route</summary>
              <div className="mt-3">
                <RouteForm action={addRouteAction} syllabusId={id} values={{ sortOrder: version.routes.length }} components={componentChoices} gradeSchemes={gradeSchemes} submitLabel="Add route" />
              </div>
            </details>
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
