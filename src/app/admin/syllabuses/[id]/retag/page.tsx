import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection } from "@/components/admin/DetailParts";
import { SyllabusStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { DataTable } from "@/components/ui/DataTable";
import { StatTile } from "@/components/ui/StatTile";
import { curriculumAccess, getSyllabusVersion, previewRetag } from "@/server/cms/curriculum";
import { applyRetagAction } from "../../actions";

export const metadata = { title: "Carry content over" };

/**
 * /admin/syllabuses/[id]/retag — copy content tags from the version this one was copied from (§26). Follows topic
 * and objective lineage; only ADDS tags, so students pinned to the old version keep exactly their content.
 */
export default async function RetagPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/syllabuses/${id}/retag` });
  const [version, preview] = await Promise.all([orNotFound(getSyllabusVersion(actor, id)), orNotFound(previewRetag(actor, id))]);
  const { canDraft } = curriculumAccess(actor);
  const { toAdd, alreadyTagged } = preview;
  const pendingTotal = toAdd.questions + toAdd.lessons + toAdd.flashcards + toAdd.questionObjectives + toAdd.lessonObjectives;

  return (
    <Container size="wide">
      <PageHeader
        title="Carry content over"
        eyebrow={`${version.subject.name} · ${version.versionLabel}`}
        breadcrumbs={[
          { label: "Syllabus versions", href: "/admin/syllabuses" },
          { label: version.versionLabel, href: `/admin/syllabuses/${id}` },
          { label: "Carry content over" },
        ]}
        description="Tag existing lessons, questions and flashcards to the matching topics of this version. Tags are curriculum metadata: no content revision is created."
      />
      {!preview.source ? (
        <Alert tone="info" title="Nothing to carry over">
          This version was not copied from another version, so its topics have no lineage. Tag content to its topics from the content editors.
        </Alert>
      ) : (
        <div className="space-y-6">
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            From{" "}
            <Link href={`/admin/syllabuses/${preview.source.id}`} className="text-primary underline underline-offset-4">
              {preview.source.versionLabel}
            </Link>
            <SyllabusStatusBadge status={preview.source.status} /> to {version.versionLabel} <SyllabusStatusBadge status={version.status} /> · {preview.mappedTopics} topics
            have an equivalent in the previous version.
          </p>
          <section aria-labelledby="retag-counts">
            <h2 id="retag-counts" className="mb-3 text-lg font-semibold text-text">
              Tags to add now
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatTile label="Question tags" value={toAdd.questions} hint={`${alreadyTagged.questions} already copied`} />
              <StatTile label="Lesson tags" value={toAdd.lessons} hint={`${alreadyTagged.lessons} already copied`} />
              <StatTile label="Flashcard tags" value={toAdd.flashcards} hint={`${alreadyTagged.flashcards} already copied`} />
              <StatTile label="Question objectives" value={toAdd.questionObjectives} hint={`${alreadyTagged.questionObjectives} already copied`} />
              <StatTile label="Lesson objectives" value={toAdd.lessonObjectives} hint={`${alreadyTagged.lessonObjectives} already copied`} />
            </div>
          </section>

          {canDraft && (
            <AdminSection title="Copy tags" description="Only adds tags. Running it again adds nothing twice. Personal student flashcards are never touched.">
              {pendingTotal === 0 ? (
                <p className="text-sm text-muted">Every tag with an equivalent topic is already in this version.</p>
              ) : (
                <ActionForm action={applyRetagAction} hiddenFields={{ syllabusId: id }} submitLabel="Copy tags to this version" pendingLabel="Copying…" columns="two">
                  <AdminField name="questions" label="Questions" type="checkbox" defaultChecked description="Keeps each question's primary topic for this version." />
                  <AdminField name="lessons" label="Lessons" type="checkbox" defaultChecked description="Added as secondary tags (a lesson keeps its one home topic)." />
                  <AdminField name="flashcards" label="Platform flashcards" type="checkbox" defaultChecked />
                  <AdminField name="objectives" label="Learning objective links" type="checkbox" defaultChecked description="For objectives copied with lineage." />
                </ActionForm>
              )}
            </AdminSection>
          )}

          <AdminSection
            title="Topics without an equivalent"
            description="These topics of the previous version carry tags but have no matching topic here (removed, or added fresh). Tag their content by hand if it still applies."
            flush
          >
            <DataTable
              caption="Tagged topics without an equivalent in this version"
              className="rounded-none border-x-0 border-b-0"
              rows={preview.unmapped}
              rowKey={(row) => row.id}
              empty={<p className="px-4 pb-4 text-sm text-muted sm:px-5">None: every tagged topic has an equivalent.</p>}
              columns={[
                { key: "topic", header: "Topic", primary: true, cell: (row) => <>{row.code && <span className="mr-1.5 font-mono text-muted">{row.code}</span>}{row.name}</> },
                { key: "tags", header: "Tags", align: "end", cell: (row) => row.tags },
              ]}
            />
          </AdminSection>
        </div>
      )}
    </Container>
  );
}
