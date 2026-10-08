import { ActionForm, AdminCheckboxGroup, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import type { AssessmentMetaInput } from "@/server/cms/assessments/schemas";
import type { Option, SourceOption, SyllabusOption, TopicOption } from "@/server/cms/questions/lookups";
import { ACCESS_TIER_LABELS, ASSEMBLY_LABELS, ASSESSMENT_KIND_LABELS, COPYRIGHT_LABELS, FEEDBACK_TIMING_LABELS, optionsOf } from "../labels";

/**
 * Settings of an assessment (§12, §13): kind, assembly, syllabus version / route, instructions, timing, attempts,
 * grade scheme, feedback timing, navigation and shuffling, access tier, topic scope and licensing (§27).
 * Server-compatible composition of the admin form primitives.
 */

export interface AssessmentSettingsFormProps {
  action: AdminFormAction<unknown>;
  submitLabel: string;
  values: AssessmentMetaInput;
  hiddenFields: Record<string, string>;
  syllabi: readonly SyllabusOption[];
  routes: readonly (Option & { syllabusId: string })[];
  gradeSchemes: readonly Option[];
  sources: readonly SourceOption[];
  /** Topics of the saved syllabus version (scope); empty until a version is saved. */
  topics: readonly TopicOption[];
}

const text = (value: unknown): string | undefined => (value === null || value === undefined ? undefined : String(value));

export function AssessmentSettingsForm({ action, submitLabel, values, hiddenFields, syllabi, routes, gradeSchemes, sources, topics }: AssessmentSettingsFormProps) {
  const syllabusLabel = new Map(syllabi.map((s) => [s.value, s.label]));
  return (
    <ActionForm action={action} submitLabel={submitLabel} hiddenFields={hiddenFields} columns="two" successAs="toast">
      <AdminField name="title" label="Title" required maxLength={200} defaultValue={values.title} wide />
      <AdminField name="kind" label="Kind" type="select" options={optionsOf(ASSESSMENT_KIND_LABELS)} defaultValue={values.kind} />
      <AdminField
        name="assembly"
        label="How questions are chosen"
        type="select"
        options={optionsOf(ASSEMBLY_LABELS)}
        defaultValue={values.assembly}
        hint="Blueprint and adaptive assessments draw from the published bank by rules."
      />
      <AdminField name="syllabusId" label="Syllabus version" type="select" options={syllabi} placeholder="Any version (fixed tests only)" defaultValue={text(values.syllabusId)} hint="Required for mock exams and blueprints." />
      <AdminField
        name="routeId"
        label="Route"
        type="select"
        optional
        options={routes.map((r) => ({ value: r.value, label: `${syllabusLabel.get(r.syllabusId) ?? ""}: ${r.label}` }))}
        placeholder="Every route"
        defaultValue={text(values.routeId)}
      />
      <AdminField name="timeLimitMinutes" label="Time limit (minutes)" type="number" optional min={1} max={1440} defaultValue={text(values.timeLimitMinutes)} hint="Blank: untimed." />
      <AdminField name="maxAttempts" label="Attempts allowed" type="number" optional min={1} max={100} defaultValue={text(values.maxAttempts)} hint="Blank: unlimited." />
      <AdminField name="gradeSchemeId" label="Grade estimate scheme" type="select" optional options={gradeSchemes} placeholder="The version or qualification default" defaultValue={text(values.gradeSchemeId)} />
      <AdminField name="feedbackTiming" label="Marks and answers shown" type="select" options={optionsOf(FEEDBACK_TIMING_LABELS)} defaultValue={values.feedbackTiming} />
      <AdminField name="accessTier" label="Who can take it" type="select" options={optionsOf(ACCESS_TIER_LABELS)} defaultValue={values.accessTier} hint="Free tests are filled from free questions only." />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} maxLength={2000} defaultValue={text(values.description)} wide />
      <AdminField name="instructions" label="Instructions shown before starting" type="textarea" optional rows={4} maxLength={20000} mono defaultValue={text(values.instructions)} hint="Markdown and maths, e.g. “Answer all questions. Calculators are allowed.”" wide />
      <AdminField name="allowNavigation" label="Students may move freely between questions" type="checkbox" defaultChecked={values.allowNavigation === true} description="Not available for adaptive tests." />
      <AdminField name="shuffleQuestions" label="Shuffle questions within each section" type="checkbox" defaultChecked={values.shuffleQuestions === true} />
      <AdminField name="shuffleOptions" label="Shuffle multiple-choice options" type="checkbox" defaultChecked={values.shuffleOptions === true} />
      {topics.length > 0 ? (
        <AdminCheckboxGroup
          name="topicIds"
          legend="Topic scope"
          hint="Leave all unticked to cover the whole syllabus version. Rules without a topic draw from this scope."
          options={topics.filter((t) => t.kind !== "SUBTOPIC").map((t) => ({ value: t.value, label: t.label }))}
          defaultValues={values.topicIds ?? []}
          wide
        />
      ) : (
        <p className="text-sm text-muted md:col-span-2">Save a syllabus version to limit the assessment to some of its topics.</p>
      )}
      <AdminField name="copyrightStatus" label="Copyright status" type="select" options={optionsOf(COPYRIGHT_LABELS)} defaultValue={values.copyrightStatus} />
      <AdminField name="sourceId" label="Content source" type="select" optional options={sources} placeholder="No source" defaultValue={text(values.sourceId)} />
      <AdminField name="author" label="Author" optional maxLength={200} defaultValue={text(values.author)} />
      <AdminField name="licenceCode" label="Licence code" optional maxLength={64} mono defaultValue={text(values.licenceCode)} />
      <AdminField name="attribution" label="Attribution" optional maxLength={1000} defaultValue={text(values.attribution)} />
      <AdminField name="sourceUrl" label="Source web address" type="url" optional defaultValue={text(values.sourceUrl)} />
      <AdminField name="publicationDate" label="Publication date" type="date" optional defaultValue={text(values.publicationDate)} />
    </ActionForm>
  );
}
