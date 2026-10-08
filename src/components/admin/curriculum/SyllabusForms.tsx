import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ButtonLink } from "@/components/ui/Button";
import type { SelectOption } from "@/components/ui/Select";
import { CALCULATOR_OPTIONS, COMPONENT_KIND_OPTIONS, COPYRIGHT_OPTIONS } from "./labels";

/**
 * Forms of the syllabus version pages (§26, §27): create a version (empty or copied), edit a draft's metadata and
 * provenance, correct a published version's wording, papers (components) and award routes. Server components around
 * the shared `ActionForm`; the services validate, enforce the version rules and audit.
 */

type Values = object;

function text(values: Values | undefined, key: string): string | undefined {
  const value = values === undefined ? undefined : (values as Record<string, unknown>)[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

export function NewVersionForm({
  action,
  subjectId,
  versions,
  defaults,
  cancelHref,
}: {
  action: AdminFormAction<unknown>;
  subjectId: string;
  versions: readonly SelectOption[];
  defaults: { versionLabel: string; title: string; code: string | null; cloneFromId: string | null };
  cancelHref: string;
}) {
  return (
    <ActionForm
      action={action}
      submitLabel="Create draft version"
      pendingLabel="Creating…"
      columns="two"
      hiddenFields={{ subjectId }}
      secondaryActions={
        <ButtonLink href={cancelHref} variant="ghost">
          Cancel
        </ButtonLink>
      }
    >
      <AdminField
        name="cloneFromId"
        label="Start from"
        type="select"
        options={versions}
        placeholder="An empty tree"
        defaultValue={defaults.cloneFromId}
        wide
        hint="Copying keeps lineage (each topic remembers the one it came from), so tagged lessons, questions and flashcards can be carried over to the new version later."
      />
      <AdminField name="versionLabel" label="Version label" required defaultValue={defaults.versionLabel} hint='Unique per subject, e.g. "2028-2030".' />
      <AdminField name="code" label="Official syllabus code" optional mono maxLength={16} defaultValue={defaults.code} />
      <AdminField name="title" label="Title" required wide defaultValue={defaults.title} />
      <AdminField name="effectiveFrom" label="Examined from" type="date" required hint="First exam series this version covers." />
      <AdminField name="effectiveTo" label="Examined until" type="date" optional hint="Leave blank if open-ended." />
    </ActionForm>
  );
}

export function DraftVersionForm({
  action,
  values,
  sources,
  gradeSchemes,
}: {
  action: AdminFormAction<unknown>;
  values: Values;
  sources: readonly SelectOption[];
  gradeSchemes: readonly SelectOption[];
}) {
  return (
    <ActionForm action={action} submitLabel="Save draft" columns="two" hiddenFields={{ id: text(values, "id") ?? "" }}>
      <AdminField name="versionLabel" label="Version label" required defaultValue={text(values, "versionLabel")} />
      <AdminField name="code" label="Official syllabus code" optional mono maxLength={16} defaultValue={text(values, "code")} />
      <AdminField name="title" label="Title" required wide defaultValue={text(values, "title")} />
      <AdminField name="effectiveFrom" label="Examined from" type="date" required defaultValue={text(values, "effectiveFrom")} />
      <AdminField name="effectiveTo" label="Examined until" type="date" optional defaultValue={text(values, "effectiveTo")} />
      <AdminField
        name="sourceId"
        label="Source of this structure"
        type="select"
        options={sources}
        placeholder="Not recorded"
        defaultValue={text(values, "sourceId")}
        hint="Usually the board's official syllabus document (§27). Required to publish."
      />
      <AdminField
        name="copyrightStatus"
        label="Copyright status"
        type="select"
        options={COPYRIGHT_OPTIONS}
        defaultValue={text(values, "copyrightStatus") ?? "UNVERIFIED"}
        hint="Clear it only once you know the structure may be used. Required to publish."
      />
      <AdminField
        name="sourceNotes"
        label="Source notes"
        type="textarea"
        optional
        rows={3}
        wide
        defaultValue={text(values, "sourceNotes")}
        hint="What may be reproduced from the official document, and where the structure came from."
      />
      <AdminField name="officialDocumentUrl" label="Official document link" type="url" optional wide defaultValue={text(values, "officialDocumentUrl")} hint="Link only: official documents are never re-hosted." />
      <AdminField name="gradeSchemeId" label="Grade scheme" type="select" options={gradeSchemes} placeholder="Qualification default" defaultValue={text(values, "gradeSchemeId")} />
      <AdminField name="overview" label="Overview (Markdown)" type="textarea" optional rows={4} wide mono defaultValue={text(values, "overview")} hint="Original summary for the subject page." />
      <AdminField
        name="assessmentOverview"
        label="Assessment overview (Markdown)"
        type="textarea"
        optional
        rows={4}
        wide
        mono
        defaultValue={text(values, "assessmentOverview")}
        hint="Papers, weightings and assessment objectives, summarised in your own words."
      />
    </ActionForm>
  );
}

export function EditorialVersionForm({ action, values, gradeSchemes }: { action: AdminFormAction<unknown>; values: Values; gradeSchemes: readonly SelectOption[] }) {
  return (
    <ActionForm action={action} submitLabel="Save corrections" columns="two" hiddenFields={{ id: text(values, "id") ?? "" }}>
      <AdminField name="title" label="Title" required wide defaultValue={text(values, "title")} />
      <AdminField name="effectiveTo" label="Examined until" type="date" optional defaultValue={text(values, "effectiveTo")} hint="Set when the board announces the last series." />
      <AdminField name="gradeSchemeId" label="Grade scheme" type="select" options={gradeSchemes} placeholder="Qualification default" defaultValue={text(values, "gradeSchemeId")} />
      <AdminField name="officialDocumentUrl" label="Official document link" type="url" optional wide defaultValue={text(values, "officialDocumentUrl")} />
      <AdminField name="sourceNotes" label="Source notes" type="textarea" optional rows={3} wide defaultValue={text(values, "sourceNotes")} />
      <AdminField name="overview" label="Overview (Markdown)" type="textarea" optional rows={4} wide mono defaultValue={text(values, "overview")} />
      <AdminField name="assessmentOverview" label="Assessment overview (Markdown)" type="textarea" optional rows={4} wide mono defaultValue={text(values, "assessmentOverview")} />
    </ActionForm>
  );
}

export function ComponentForm({ action, syllabusId, values, submitLabel }: { action: AdminFormAction<unknown>; syllabusId: string; values?: Values; submitLabel: string }) {
  const id = text(values, "id");
  const calculatorAllowed = values === undefined ? undefined : (values as Record<string, unknown>).calculatorAllowed;
  const calculator = calculatorAllowed === true ? "yes" : calculatorAllowed === false ? "no" : "unspecified";
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" successAs="toast" hiddenFields={id ? { id, syllabusId } : { syllabusId }}>
      <AdminField name="code" label="Paper code" required mono maxLength={16} defaultValue={text(values, "code")} hint='As the board numbers it, e.g. "1" or "42".' />
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint='e.g. "Paper 2 (Extended)"' />
      <AdminField name="kind" label="Kind" type="select" options={COMPONENT_KIND_OPTIONS} defaultValue={text(values, "kind") ?? "WRITTEN"} />
      <AdminField name="calculatorAllowed" label="Calculator" type="select" options={CALCULATOR_OPTIONS} defaultValue={calculator} />
      <AdminField name="durationMinutes" label="Duration (minutes)" type="number" min={1} optional defaultValue={text(values, "durationMinutes")} />
      <AdminField name="maxMarks" label="Maximum marks" type="number" min={1} optional defaultValue={text(values, "maxMarks")} />
      <AdminField name="weightingPercent" label="Weighting (%)" type="number" min={0} max={100} step="0.01" optional defaultValue={text(values, "weightingPercent")} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} wide defaultValue={text(values, "description")} />
    </ActionForm>
  );
}

export interface RouteFormValues {
  id?: string;
  code?: string;
  name?: string;
  description?: string | null;
  gradeSchemeId?: string | null;
  isDefault?: boolean;
  sortOrder?: number;
  componentLinks?: readonly { componentId: string; isCompulsory: boolean; choiceGroup: string | null }[];
}

export function RouteForm({
  action,
  syllabusId,
  values,
  components,
  gradeSchemes,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  syllabusId: string;
  values?: RouteFormValues;
  components: readonly { id: string; code: string; name: string }[];
  gradeSchemes: readonly SelectOption[];
  submitLabel: string;
}) {
  const links = new Map((values?.componentLinks ?? []).map((link) => [link.componentId, link]));
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" successAs="toast" hiddenFields={values?.id ? { id: values.id, syllabusId } : { syllabusId }}>
      <AdminField name="code" label="Route code" required mono maxLength={16} defaultValue={values?.code} hint="e.g. CORE, EXTENDED, AS, A" />
      <AdminField name="name" label="Name" required defaultValue={values?.name} hint='e.g. "Extended tier"' />
      <AdminField name="gradeSchemeId" label="Grade scheme" type="select" options={gradeSchemes} placeholder="Version default" defaultValue={values?.gradeSchemeId ?? undefined} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={values?.sortOrder ?? 0} />
      <AdminField name="isDefault" label="Default route" type="checkbox" defaultChecked={values?.isDefault ?? false} description="Pre-selected in onboarding (one per version)." />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} wide defaultValue={values?.description ?? undefined} />
      <fieldset className="min-w-0 md:col-span-2">
        <legend className="mb-2 text-sm font-medium text-text">Papers in this route</legend>
        {components.length === 0 ? (
          <p className="text-sm text-muted">Add papers to the version first.</p>
        ) : (
          <ul className="divide-y divide-border rounded-card border border-border">
            {components.map((component, index) => {
              const link = links.get(component.id);
              const base = `components.${index}`;
              return (
                <li key={component.id} className="grid gap-2 px-3 py-2 sm:grid-cols-[1fr_auto_12rem] sm:items-center">
                  <input type="hidden" name={`${base}.componentId`} value={component.id} />
                  <label className="flex min-h-11 cursor-pointer items-center gap-3">
                    <input type="checkbox" name={`${base}.included`} defaultChecked={link !== undefined} className="size-5 accent-primary" />
                    <span>
                      <span className="font-mono">{component.code}</span> {component.name}
                    </span>
                  </label>
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                    <input type="checkbox" name={`${base}.isCompulsory`} defaultChecked={link?.isCompulsory ?? true} className="size-5 accent-primary" />
                    Compulsory
                  </label>
                  <input
                    type="text"
                    name={`${base}.choiceGroup`}
                    defaultValue={link?.choiceGroup ?? ""}
                    maxLength={64}
                    placeholder="Choice group (optional)"
                    aria-label={`Choice group for ${component.name}`}
                    className="min-h-11 rounded-control border border-border-strong bg-surface px-3 text-sm text-text"
                  />
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-2 text-sm text-muted">Optional papers share a choice group, e.g. &quot;One applied paper&quot;.</p>
      </fieldset>
    </ActionForm>
  );
}
