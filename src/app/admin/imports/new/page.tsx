import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminField } from "@/components/admin/ActionForm";
import { requireAdminPage } from "@/components/admin/guards";
import { ADMIN_HOME } from "@/components/admin/nav";
import { enumParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { IMPORT_ENTITY_LABELS, IMPORT_ENTITY_TYPES, MAX_IMPORT_FILE_BYTES } from "@/server/cms/imports/constants";
import { importAccess } from "@/server/cms/imports/service";
import { getCurriculumOptions, getSourceOptions, getSyllabusOptions } from "@/server/cms/questions/lookups";
import { FileField } from "../_components/FileField";
import { ImportUploadForm } from "../_components/ImportUploadForm";
import { TEMPLATE_LINKS, templateHref } from "../_components/links";

export const metadata = { title: "New import" };

const ACCESS_OPTIONS = [
  { value: "PREMIUM", label: "Premium (subscribers)" },
  { value: "FREE", label: "Free (signed-in students)" },
  { value: "PUBLIC", label: "Public (also on SEO pages)" },
];

const DIFFICULTY_OPTIONS = [1, 2, 3, 4, 5].map((value) => ({ value: String(value), label: `${value}${value === 1 ? " (easiest)" : value === 5 ? " (hardest)" : ""}` }));

/**
 * /admin/imports/new — step 1 chooses what is imported and into which subject (a plain GET form, so it works without
 * JavaScript); step 2 uploads the file with the import-level source and licence (§27). Uploading runs the dry run;
 * nothing is created until the editor imports from the report.
 */
export default async function NewImportPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("imports.run", { minScope: "restricted", next: "/admin/imports/new" });
  const access = importAccess(actor);
  if (!access.content) redirect(ADMIN_HOME);
  const params = await searchParams;
  const allowedTypes = IMPORT_ENTITY_TYPES.filter((type) => type !== "TOPIC" || access.topics);
  const entityType = enumParam(params, "type", allowedTypes);
  const subjectId = uuidParam(params, "subject");
  const curriculum = await getCurriculumOptions(actor, { selectedSubjectIds: [subjectId] });
  const subject = curriculum.subjects.find((s) => s.value === subjectId);
  const breadcrumbs = [{ label: "Imports", href: "/admin/imports" }, { label: "New import" }];

  if (!entityType || !subject) {
    return (
      <Container size="wide">
        <PageHeader title="New import" breadcrumbs={breadcrumbs} description="Choose what you are importing and its subject. You will check the file before anything is created." />
        {curriculum.subjects.length === 0 ? (
          <p className="text-muted">Add a subject in the curriculum first.</p>
        ) : (
          <form method="get" action="/admin/imports/new" className="space-y-6 pb-12">
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-text">What are you importing?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {allowedTypes.map((value) => (
                  <Card key={value} as="div" className="has-checked:border-primary has-checked:bg-primary-soft">
                    <CardBody className="p-0 sm:p-0">
                      <label className="flex min-h-11 cursor-pointer gap-3 p-4">
                        <input type="radio" name="type" value={value} required defaultChecked={value === (entityType ?? "QUESTION")} className="mt-1 size-5 accent-primary" />
                        <span>
                          <span className="block font-semibold text-text">{IMPORT_ENTITY_LABELS[value].plural}</span>
                          <span className="mt-0.5 block text-sm text-muted">{IMPORT_ENTITY_LABELS[value].hint}</span>
                        </span>
                      </label>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </fieldset>
            <Field label="Subject" className="max-w-xl">
              <Select name="subject" required defaultValue={subjectId ?? ""} placeholder="Choose a subject" options={curriculum.subjects} />
            </Field>
            <Button type="submit">Continue</Button>
          </form>
        )}
      </Container>
    );
  }

  const [syllabi, sources] = await Promise.all([getSyllabusOptions([subject.value]), getSourceOptions()]);
  const isTopic = entityType === "TOPIC";
  const versionOptions = (isTopic ? syllabi.filter((s) => s.status === "DRAFT") : syllabi).map((s) => ({ value: s.value, label: s.label }));
  const label = IMPORT_ENTITY_LABELS[entityType];

  return (
    <Container size="wide">
      <PageHeader
        title={`Import ${label.plural.toLowerCase()}`}
        eyebrow={subject.label}
        breadcrumbs={breadcrumbs}
        description={
          <>
            Uploading checks the file and shows a report; nothing is created yet.{" "}
            <Link href={`/admin/imports/new?type=${entityType}`} className="font-medium text-primary underline underline-offset-2">
              Change type or subject
            </Link>
          </>
        }
      />
      <div className="grid gap-6 pb-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          {sources.length === 0 ? (
            <Alert tone="warning" title="No content source to cite">
              Every import names where its material comes from (§27). Ask an admin to add an active content source first.
            </Alert>
          ) : isTopic && versionOptions.length === 0 ? (
            <Alert tone="warning" title="No draft syllabus version">
              Topic outlines are added to a DRAFT syllabus version (published versions are frozen). Create or clone a draft version of this subject first.
            </Alert>
          ) : (
            <ImportUploadForm hiddenFields={{ entityType, subjectId: subject.value }}>
              <AdminField
                name="syllabusId"
                label="Syllabus version"
                type="select"
                options={versionOptions}
                placeholder={isTopic ? "Choose a draft version" : "No version (no topic or objective codes)"}
                required={isTopic}
                optional={!isTopic}
                hint={isTopic ? "The outline is added to this DRAFT version." : "Topic and learning-objective codes in the file are matched in this version."}
                wide
              />
              <FileField maxBytes={MAX_IMPORT_FILE_BYTES} />
              <fieldset className="space-y-4 md:col-span-2">
                <legend className="text-base font-semibold text-text">Source and licence</legend>
                <p className="text-sm text-muted">
                  Recorded on every imported item. Imports never assert copyright: each item arrives as &ldquo;unverified&rdquo; and a reviewer clears it before publishing.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField name="sourceId" label="Content source" type="select" options={sources} placeholder="Choose the source" required />
                  <AdminField name="licenceCode" label="Licence code" optional hint="Defaults to the source's licence, e.g. CC-BY-4.0 or PROPRIETARY." maxLength={64} mono />
                  <AdminField name="author" label="Author" optional maxLength={200} />
                  <AdminField name="sourceUrl" label="Source link" type="url" optional maxLength={2000} />
                  <AdminField name="attribution" label="Attribution" type="textarea" optional rows={2} maxLength={1000} hint="Required credit text, if the licence asks for one." wide />
                </div>
              </fieldset>
              {!isTopic && (
                <fieldset className="space-y-4 md:col-span-2">
                  <legend className="text-base font-semibold text-text">Defaults for rows that leave them blank</legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    {entityType === "QUESTION" && <AdminField name="defaultDifficulty" label="Difficulty" type="select" options={DIFFICULTY_OPTIONS} defaultValue="3" />}
                    <AdminField name="defaultAccessTier" label="Access" type="select" options={ACCESS_OPTIONS} defaultValue="PREMIUM" />
                  </div>
                </fieldset>
              )}
              <AdminField
                name="rightsConfirmed"
                label="This material is original or licensed for this use"
                type="checkbox"
                description="No past exam papers, mark schemes, examiner reports or textbook text are copied or lightly reworded."
                wide
              />
            </ImportUploadForm>
          )}
        </div>
        <aside aria-label="Templates" className="space-y-3 text-sm">
          <h2 className="text-base font-semibold text-text">Templates</h2>
          <p className="text-muted">Start from a template so the columns match. The first worksheet of an Excel file is read.</p>
          <ul className="space-y-1">
            {TEMPLATE_LINKS.map((link) => (
              <li key={link.file}>
                <a href={templateHref(entityType, link.file)} download className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline lg:min-h-0">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-muted">
            Lists inside a cell (answers, hints, topics) are separated by <code className="rounded bg-subtle px-1">|</code> or line breaks. Reference topics and objectives by their codes in the chosen version.
            {entityType === "LESSON" && " Lessons can also be uploaded as JSON with a markdown field that starts with --- front matter."}
          </p>
        </aside>
      </div>
    </Container>
  );
}
