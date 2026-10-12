"use client";

import type { ReactNode } from "react";
import { ActionForm, AdminField, useActionFormState } from "../ActionForm";
import { fieldErrorsFor, type AdminFormAction } from "../form-state";
import { MarkdownEditor } from "./MarkdownEditor";
import { ProvenanceFields, type ProvenanceValues } from "./ProvenanceFields";
import { QuestionPicker } from "./QuestionPicker";
import { ACCESS_TIER_OPTIONS, LESSON_KIND_OPTIONS } from "./options";
import { TopicTagPicker } from "./TopicTagPicker";
import type {
  Choice,
  LoadTopicsAction,
  MediaSearchAction,
  ObjectiveChoice,
  PreviewAction,
  QuestionChoice,
  QuestionSearchAction,
  TaggedTopicChoice,
} from "./types";

/**
 * The lesson editor (§8): markdown body with the directive toolbar and live server-rendered preview, topic tags (one
 * primary) and learning objectives, ordered practice questions, reading time, access (free preview / public SEO page),
 * SEO fields and licensing (§27). Saves the DRAFT through `saveLessonAction`; workflow steps live on the page.
 */

export interface LessonEditorValues extends ProvenanceValues {
  id: string;
  updatedAt: string;
  title: string;
  slug: string;
  kind: string;
  subjectId: string | null;
  summary: string | null;
  body: string;
  estimatedMinutes: number;
  accessTier: string;
  languageCode: string;
  metaTitle: string | null;
  metaDescription: string | null;
  topics: TaggedTopicChoice[];
  objectives: ObjectiveChoice[];
  objectiveIds: string[];
  questions: QuestionChoice[];
}

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-card border border-border bg-surface p-4 sm:p-5 md:col-span-2" aria-label={title}>
      <div>
        <h2 className="text-base font-semibold text-text">{title}</h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function BodyEditor({ defaultValue, previewAction, mediaSearchAction }: { defaultValue: string; previewAction: PreviewAction; mediaSearchAction: MediaSearchAction }) {
  const { state } = useActionFormState();
  return (
    <MarkdownEditor
      name="body"
      label="Lesson body"
      hint="Markdown with $maths$, tables and content blocks. Start sections at ## (the title is the page heading)."
      defaultValue={state?.values?.body ?? defaultValue}
      error={fieldErrorsFor(state, "body")}
      previewAction={previewAction}
      mediaSearchAction={mediaSearchAction}
      mode="lesson"
      rows={24}
    />
  );
}

export function LessonEditorForm({
  action,
  lesson,
  subjects,
  sources,
  syllabi,
  defaultSyllabusId,
  previewAction,
  mediaSearchAction,
  loadTopicsAction,
  questionSearchAction,
}: {
  action: AdminFormAction<unknown>;
  lesson: LessonEditorValues;
  subjects: readonly Choice[];
  sources: readonly Choice[];
  syllabi: readonly Choice[];
  defaultSyllabusId: string | null;
  previewAction: PreviewAction;
  mediaSearchAction: MediaSearchAction;
  loadTopicsAction: LoadTopicsAction;
  questionSearchAction: QuestionSearchAction;
}) {
  return (
    <ActionForm
      action={action}
      submitLabel="Save draft"
      pendingLabel="Saving…"
      successAs="toast"
      columns="two"
      hiddenFields={{ id: lesson.id, expectedUpdatedAt: lesson.updatedAt }}
    >
      <Section title="Content">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField name="title" label="Title" defaultValue={lesson.title} required maxLength={200} wide />
          <AdminField name="kind" label="Kind" type="select" options={LESSON_KIND_OPTIONS} defaultValue={lesson.kind} />
          <AdminField name="subjectId" label="Home subject" type="select" options={subjects} placeholder="General (articles and study guides only)" defaultValue={lesson.subjectId} />
          <AdminField name="summary" label="Summary" type="textarea" rows={2} defaultValue={lesson.summary} optional maxLength={1000} wide hint="One paragraph for lesson cards and search results." />
        </div>
        <BodyEditor defaultValue={lesson.body} previewAction={previewAction} mediaSearchAction={mediaSearchAction} />
      </Section>

      <Section title="Curriculum" description="Where students find this lesson, and what it covers.">
        <TopicTagPicker
          syllabusOptions={syllabi}
          defaultSyllabusId={defaultSyllabusId}
          initialTopics={lesson.topics}
          loadTopicsAction={loadTopicsAction}
          withObjectives
          initialObjectives={lesson.objectives}
          initialObjectiveIds={lesson.objectiveIds}
          hint="The primary topic places the lesson in the topic tree. Add tags to reuse it in other boards or syllabus versions."
        />
        <QuestionPicker initial={lesson.questions} searchAction={questionSearchAction} subjectId={lesson.subjectId} />
      </Section>

      <Section title="Access and reading time">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminField name="accessTier" label="Access" type="select" options={ACCESS_TIER_OPTIONS} defaultValue={lesson.accessTier} hint="Public = also shown on the public SEO pages. Every other tier needs Full access (no free tier)." />
          <AdminField name="estimatedMinutes" label="Estimated minutes" type="number" min={1} max={600} step={1} defaultValue={lesson.estimatedMinutes} />
          <AdminField name="languageCode" label="Language" defaultValue={lesson.languageCode} maxLength={10} mono hint="en, sn (Shona), nd (Ndebele)…" />
        </div>
      </Section>

      <Section title="Search engines" description="Used on public pages (articles, study guides, free previews). Leave empty to use the title and summary.">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField name="slug" label="URL slug" defaultValue={lesson.slug} maxLength={80} mono hint="Lower-case words joined by hyphens." />
          <AdminField name="metaTitle" label="SEO title" defaultValue={lesson.metaTitle} optional maxLength={120} />
          <AdminField name="metaDescription" label="SEO description" type="textarea" rows={2} defaultValue={lesson.metaDescription} optional maxLength={320} wide />
        </div>
      </Section>

      <Section title="Licensing" description="Required before review (§27). Record where the content comes from and what permits its use.">
        <div className="grid gap-4 md:grid-cols-2">
          <ProvenanceFields values={lesson} sources={sources} />
        </div>
      </Section>
    </ActionForm>
  );
}
