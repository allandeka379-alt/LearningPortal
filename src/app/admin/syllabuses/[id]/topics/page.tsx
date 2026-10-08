import { SyllabusStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { sourceOptions } from "@/components/admin/curriculum/labels";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { TopicTreeEditor } from "@/components/admin/curriculum/TopicTreeEditor";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { getCatalogueOptions, getTopicEditor } from "@/server/cms/curriculum";
import { runTopicCommand } from "../../actions";

export const metadata = { title: "Topic tree" };

/**
 * /admin/syllabuses/[id]/topics — the topic tree editor (§3): accessible tree, button-based reordering, objectives,
 * paper links and pasted outlines. Structure is editable only while the version is a DRAFT.
 */
export default async function TopicTreePage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/syllabuses/${id}/topics` });
  const [editor, options] = await Promise.all([orNotFound(getTopicEditor(actor, id)), getCatalogueOptions(actor)]);
  const { syllabus } = editor;

  return (
    <Container size="wide">
      <PageHeader
        title={`Topics · ${syllabus.versionLabel}`}
        eyebrow={syllabus.subject.name}
        breadcrumbs={[
          { label: "Subjects", href: "/admin/subjects" },
          { label: syllabus.subject.name, href: `/admin/subjects/${syllabus.subject.id}` },
          { label: syllabus.versionLabel, href: `/admin/syllabuses/${id}` },
          { label: "Topics" },
        ]}
        description={syllabus.title}
        actions={
          <ButtonLink href={`/admin/syllabuses/${id}`} variant="outline">
            Version details
          </ButtonLink>
        }
      />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <SyllabusStatusBadge status={syllabus.status} />
        <span className="text-sm text-muted">Public topic pages live under {syllabus.publicPath}/&lt;topic&gt; once this version is current.</span>
      </div>
      {!editor.editable && (
        <Alert tone="info" className="mb-5" title={syllabus.status === "DRAFT" ? "Read only" : "This version is published"}>
          {syllabus.status === "DRAFT"
            ? "You can view this draft but not change it."
            : editor.canCorrect
              ? "Its structure is frozen (students may be studying it). You can correct wording; for structural changes, create a new version."
              : "Its structure is frozen. Structural changes need a new version."}
        </Alert>
      )}
      <TopicTreeEditor
        syllabusId={id}
        versionLabel={syllabus.versionLabel}
        editable={editor.editable}
        canCorrect={editor.canCorrect}
        roots={editor.roots}
        components={editor.components}
        sources={sourceOptions(options.sources)}
        runCommand={runTopicCommand}
      />
    </Container>
  );
}
