import Link from "next/link";
import { redirect } from "next/navigation";
import { ActionForm, AdminCheckboxGroup, AdminField } from "@/components/admin/ActionForm";
import { formatMicrosUsd, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { ADMIN_HOME } from "@/components/admin/nav";
import { buildHref, enumParam, firstParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatNumber } from "@/lib/format";
import {
  AI_DRAFT_KINDS,
  AI_KIND_META,
  DIFFICULTY_BANDS,
  DIFFICULTY_LABELS,
  GENERATABLE_QUESTION_TYPES,
  LANGUAGE_LEVEL_LABELS,
  LANGUAGE_LEVELS,
  type AiDraftKind,
} from "@/server/cms/ai-drafts/schemas";
import { canGenerate, getEditorUsageToday, getGenerationEstimate, isAiConfigured, searchTargetQuestions } from "@/server/cms/ai-drafts/service";
import { getCurriculumOptions, getObjectiveOptions, getSyllabusOptions, getTopicOptions } from "@/server/cms/questions/lookups";
import { createGenerationJobAction } from "../actions";
import { AiNotConfigured, UsageTiles } from "../_components/AiJobBits";

export const metadata = { title: "Generate drafts with AI" };

const ACCESS_OPTIONS = [
  { value: "PREMIUM", label: "Premium (subscribers)" },
  { value: "FREE", label: "Free (signed-in students)" },
  { value: "PUBLIC", label: "Public (also on SEO pages)" },
];
const MAX_OBJECTIVE_CHOICES = 60;

const DIFFICULTY_KINDS: ReadonlySet<AiDraftKind> = new Set(["QUESTIONS", "MCQ"]);
const COUNTED_KINDS: ReadonlySet<AiDraftKind> = new Set(["QUESTIONS", "MCQ", "FLASHCARDS", "HINTS", "STUDY_PLAN"]);
const OBJECTIVE_KINDS: ReadonlySet<AiDraftKind> = new Set(["QUESTIONS", "MCQ", "FLASHCARDS", "LESSON"]);
const ACCESS_KINDS: ReadonlySet<AiDraftKind> = new Set(["QUESTIONS", "MCQ", "FLASHCARDS", "LESSON", "STUDY_PLAN"]);

/**
 * /admin/ai/generate — §41: choose what to draft (step 1), narrow the scope to a syllabus version, topic and
 * objectives (plain GET forms, no client data fetching), then queue the job with a cost estimate. Refused with an
 * explanation when AI is not configured or today's cap is used up; nothing here produces sample output.
 */
export default async function GenerateDraftsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the AI admin pages are a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireAdminPage("ai.generate", { next: "/admin/ai/generate" });
  if (!canGenerate(actor)) redirect(ADMIN_HOME);
  const params = await searchParams;
  const breadcrumbs = [{ label: "AI content generation", href: "/admin/ai" }, { label: "Generate drafts" }];

  if (!isAiConfigured()) {
    return (
      <Container size="wide">
        <PageHeader title="Generate drafts with AI" breadcrumbs={breadcrumbs} />
        <AiNotConfigured />
      </Container>
    );
  }

  const kind = enumParam(params, "kind", AI_DRAFT_KINDS);
  const subjectId = uuidParam(params, "subject");
  const curriculum = await getCurriculumOptions(actor, { selectedSubjectIds: [subjectId] });
  const subject = curriculum.subjects.find((s) => s.value === subjectId);

  if (!kind || !subject) {
    return (
      <Container size="wide">
        <PageHeader title="Generate drafts with AI" breadcrumbs={breadcrumbs} description="Choose what to draft and the subject. Drafts are original, aligned to the objectives you pick, and always reviewed by a person before students see them." />
        <form method="get" action="/admin/ai/generate" className="space-y-6 pb-12">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-text">What should AI draft?</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AI_DRAFT_KINDS.map((value) => (
                <Card key={value} as="div" className="has-checked:border-primary has-checked:bg-primary-soft">
                  <CardBody className="p-0 sm:p-0">
                    <label className="flex min-h-11 cursor-pointer gap-3 p-4">
                      <input type="radio" name="kind" value={value} required defaultChecked={value === (kind ?? "MCQ")} className="mt-1 size-5 accent-primary" />
                      <span>
                        <span className="block font-semibold text-text">{AI_KIND_META[value].label}</span>
                        <span className="mt-0.5 block text-sm text-muted">{AI_KIND_META[value].description}</span>
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
      </Container>
    );
  }

  const meta = AI_KIND_META[kind];
  const syllabi = await getSyllabusOptions([subject.value]);
  const syllabus = syllabi.find((s) => s.value === uuidParam(params, "syllabus")) ?? null;
  const topics = syllabus ? await getTopicOptions([syllabus.value]) : [];
  const topic = topics.find((t) => t.value === uuidParam(params, "topic")) ?? null;
  const objectivesAll = syllabus && OBJECTIVE_KINDS.has(kind) ? await getObjectiveOptions([syllabus.value]) : [];
  const topicPaths = new Map(topics.map((t) => [t.value, t.path]));
  const inTopic = (topicId: string) => {
    if (!topic) return true;
    const path = topicPaths.get(topicId) ?? "";
    return path === topic.path || path.startsWith(`${topic.path}/`);
  };
  const objectives = objectivesAll.filter((o) => inTopic(o.topicId)).slice(0, MAX_OBJECTIVE_CHOICES);
  const q = firstParam(params, "q");
  const targets = meta.needsTargetQuestion ? await searchTargetQuestions(actor, { subjectId: subject.value, q: q ?? null }) : [];
  const [usage, estimateDefault, estimateMax] = await Promise.all([
    getEditorUsageToday(actor),
    getGenerationEstimate(kind, meta.defaultCount),
    getGenerationEstimate(kind, meta.maxCount),
  ]);
  const capped = usage.jobs >= usage.limits.editorDailyJobs || (usage.limits.editorDailyCostMicros !== null && usage.costMicros >= usage.limits.editorDailyCostMicros);
  const scopeReady = !meta.needsSyllabus || syllabus !== null;

  return (
    <Container size="wide">
      <PageHeader
        title={`Generate: ${meta.label.toLowerCase()}`}
        eyebrow={subject.label}
        breadcrumbs={breadcrumbs}
        description={
          <>
            {meta.description}{" "}
            <Link href={buildHref("/admin/ai/generate", { kind })} className="font-medium text-primary underline underline-offset-2">
              Change
            </Link>
          </>
        }
      />
      <div className="grid gap-6 pb-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-6">
          <Card as="section" aria-label="Scope">
            <CardBody>
              <form method="get" action="/admin/ai/generate" className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
                <input type="hidden" name="kind" value={kind} />
                <input type="hidden" name="subject" value={subject.value} />
                <Field label="Syllabus version" className="md:min-w-64 md:flex-1">
                  <Select name="syllabus" defaultValue={syllabus?.value ?? ""} placeholder={meta.needsSyllabus ? "Choose a version" : "Whole subject (no version)"} options={syllabi.map((s) => ({ value: s.value, label: s.label }))} />
                </Field>
                {syllabus && (
                  <Field label="Topic" className="md:min-w-64 md:flex-1">
                    <Select name="topic" defaultValue={topic?.value ?? ""} placeholder={kind === "STUDY_PLAN" ? "All topics of the version" : "No single topic"} options={topics.map((t) => ({ value: t.value, label: t.label }))} />
                  </Field>
                )}
                {meta.needsTargetQuestion && (
                  <Field label="Find the question" className="md:min-w-64 md:flex-1">
                    <Input type="search" name="q" defaultValue={q} placeholder="Words from the question, or its id" maxLength={200} />
                  </Field>
                )}
                <Button type="submit" variant="outline">
                  Update scope
                </Button>
              </form>
              {syllabus && !topic && kind !== "STUDY_PLAN" && <p className="mt-3 text-sm text-muted">Without a topic, each draft is tagged to the topic the AI picks from this version&apos;s list; choosing a topic keeps everything on it.</p>}
            </CardBody>
          </Card>

          {capped ? (
            <Alert tone="warning" title="Today's AI generation allowance is used up">
              You have used {formatNumber(usage.jobs)} of {formatNumber(usage.limits.editorDailyJobs)} runs (or today&apos;s spend cap). It resets tomorrow.
            </Alert>
          ) : !scopeReady ? (
            <Alert tone="info" title="Choose the syllabus version">
              Study plans follow one syllabus version&apos;s topics. Choose it above.
            </Alert>
          ) : meta.needsTargetQuestion && targets.length === 0 ? (
            <Alert tone="info" title="No question to write for">
              {q ? "No draft or published question of this subject matches your search." : "This subject has no draft or published questions without an edit in progress."} Questions in review cannot be changed.
            </Alert>
          ) : (
            <ActionForm
              action={createGenerationJobAction}
              submitLabel="Queue generation"
              pendingLabel="Queueing…"
              hiddenFields={{ kind, subjectId: subject.value, syllabusId: syllabus?.value ?? "", topicId: topic?.value ?? "" }}
              columns="two"
            >
              {meta.needsTargetQuestion && (
                <AdminField
                  name="targetQuestionId"
                  label="Question"
                  type="select"
                  required
                  placeholder="Choose the question"
                  options={targets.map((t) => ({ value: t.id, label: `${t.label} (${humanizeEnum(t.type).toLowerCase()}, ${t.status === "PUBLISHED" ? "published: a draft copy is created" : "draft"})` }))}
                  hint="Published questions get a draft copy with the AI text; students keep seeing the current version until the copy is approved and published."
                  wide
                />
              )}
              {COUNTED_KINDS.has(kind) && (
                <AdminField name="count" label={meta.countLabel} type="number" min={1} max={meta.maxCount} defaultValue={meta.defaultCount} hint={`1 to ${meta.maxCount} per run.`} />
              )}
              {DIFFICULTY_KINDS.has(kind) && <AdminField name="difficulty" label="Difficulty" type="select" options={DIFFICULTY_BANDS.map((value) => ({ value, label: DIFFICULTY_LABELS[value] }))} defaultValue="MIXED" />}
              <AdminField
                name="languageLevel"
                label="Language level"
                type="select"
                options={LANGUAGE_LEVELS.map((value) => ({ value, label: LANGUAGE_LEVEL_LABELS[value].label }))}
                defaultValue="STANDARD"
                hint={LANGUAGE_LEVELS.map((value) => `${LANGUAGE_LEVEL_LABELS[value].label}: ${LANGUAGE_LEVEL_LABELS[value].hint}`).join(" ")}
              />
              {kind === "QUESTIONS" && (
                <AdminCheckboxGroup
                  name="questionTypes"
                  legend="Question types"
                  options={GENERATABLE_QUESTION_TYPES.map((value) => ({ value, label: humanizeEnum(value) }))}
                  defaultValues={[...GENERATABLE_QUESTION_TYPES]}
                  hint="The AI mixes the types you leave ticked."
                  wide
                />
              )}
              {(kind === "QUESTIONS" || kind === "MCQ") && <AdminField name="marksPerQuestion" label="Marks per question" type="number" min={1} max={20} optional hint="Leave blank to let each question carry its natural marks." />}
              {ACCESS_KINDS.has(kind) && <AdminField name="accessTier" label="Access when published" type="select" options={ACCESS_OPTIONS} defaultValue="PREMIUM" />}
              {kind === "STUDY_PLAN" && <AdminField name="weeklyMinutes" label="Study minutes per week" type="number" min={30} max={1200} optional />}
              {objectives.length > 0 && (
                <AdminCheckboxGroup
                  name="objectiveIds"
                  legend="Learning objectives (optional)"
                  options={objectives.map((o) => ({ value: o.value, label: o.label }))}
                  hint={topic ? "Tick the objectives the drafts must cover; leave all unticked to cover the topic's objectives." : `Showing up to ${MAX_OBJECTIVE_CHOICES}. Choose a topic above to narrow the list.`}
                  wide
                />
              )}
              <AdminField
                name="instructions"
                label="Notes for the AI"
                type="textarea"
                optional
                rows={3}
                maxLength={1000}
                hint="Style or focus, e.g. 'use farming and market contexts' or 'include negative temperatures'. Notes never override the originality rules."
                wide
              />
              <p className="text-sm text-muted md:col-span-2">
                Estimated cost: about {formatMicrosUsd(estimateDefault.costMicros)} for {meta.defaultCount} {meta.countLabel.toLowerCase()}
                {meta.maxCount > meta.defaultCount && `, at most ${formatMicrosUsd(estimateMax.costMicros)} for ${meta.maxCount}`} ({estimateDefault.tier} tier). The job records the actual metered cost.
              </p>
            </ActionForm>
          )}
        </div>
        <aside aria-label="About AI drafts" className="space-y-4">
          <UsageTiles usage={usage} />
          <div className="rounded-card border border-border bg-surface p-4 text-sm">
            <h2 className="text-base font-semibold text-text">What happens next</h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted">
              <li>The job is queued and runs on the server; this usually takes a minute or two.</li>
              <li>Each item is checked against the same rules as hand-written content. Items that fail are listed with the reason.</li>
              <li>Valid items are saved as drafts marked AI-generated, with copyright unverified.</li>
              <li>Another editor checks answers, facts, notation and originality, then approves. AI never publishes.</li>
            </ol>
            <p className="mt-3 text-muted">Prompts require original content aligned to the chosen objectives, with no copying of past papers, mark schemes or textbooks, and Zimbabwean context where it fits.</p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
