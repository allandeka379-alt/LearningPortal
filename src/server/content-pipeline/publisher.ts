import "server-only";
import type { ContentStatus } from "@/generated/prisma/client";
import { assessmentChecks } from "@/server/cms/assessments/service";
import { updateQualification, updateSubject } from "@/server/cms/curriculum/catalogue";
import { publishSyllabusVersion } from "@/server/cms/curriculum/syllabuses";
import { approveContent, publishContent, submitContent } from "@/server/cms/review/workflow";
import type { CmsActor } from "@/server/cms/users/access";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { canPublishCurriculum, resolveApprover, resolveAuthor } from "./accounts";
import type { ItemType } from "./import-items";
import { describeError } from "./issues";
import { familyRefPrefix } from "./keys";
import { loadContentTree } from "./load";
import { buildSyllabusModel, type SyllabusModel } from "./resolve";
import { officialSourceSlug } from "./sources";
import { rollbackProblem } from "./syllabus-sync";

/**
 * `npm run content:publish -- --approver <email>` (docs/CONTENT_PIPELINE.md "Publishing").
 *
 * RUNNING THIS COMMAND IS A HUMAN ATTESTATION (§41): the approver states that they reviewed every item it publishes
 * (accuracy, notation, syllabus alignment, originality). It approves IN_REVIEW pipeline items as that person and
 * publishes APPROVED ones through the shared publish helper (four-eyes: the approver is never the author, and the
 * database refuses it when `app.four_eyes = 'on'`), which writes the revision snapshot, audit entries and the search
 * re-index job. Order: syllabus versions (ADMIN approver) → questions → flashcards → lessons → assessments, so tests
 * can draw from the questions just published. Subjects that now have a current syllabus and published content are made
 * AVAILABLE (with their qualification) when the approver is an ADMIN.
 */

export interface PublishOptions {
  repoRoot: string;
  contentRoot?: string;
  approverEmail: string;
  /** Families to publish (default all). */
  families?: readonly string[];
  /** Only items tagged to this topic node (Topic.contentKey) or below it, in the families' syllabi. */
  topicKey?: string | null;
  dryRun?: boolean;
  /** Approval note recorded on every approved item (default: the attestation sentence). */
  note?: string | null;
  /** The pipeline author (to submit fixed assessments whose questions were not yet published at import). */
  authorEmail?: string | null;
  /** Make subjects / qualifications AVAILABLE (ADMIN approver; default true). */
  catalogue?: boolean;
  /**
   * Enforce four-eyes inside every approval transaction even where the database default is off (development, tests).
   * It can only make the rule stricter: production databases always enforce it.
   */
  requireFourEyes?: boolean;
  onProgress?: (line: string) => void;
}

export interface PublishedItem {
  type: ItemType;
  id: string;
  externalRef: string | null;
  title: string;
  from: ContentStatus;
  outcome: "published" | "would-publish" | "skipped" | "error";
  revision?: number;
  message?: string;
}

export interface PublishReport {
  approver: string;
  dryRun: boolean;
  syllabi: { path: string; outcome: "published" | "would-publish" | "already-published" | "skipped" | "missing" | "error"; message?: string }[];
  items: PublishedItem[];
  catalogue: string[];
}

export const DEFAULT_ATTESTATION =
  "Reviewed before publication: answers, facts, notation, syllabus alignment and originality checked (content:publish attestation, §41).";

const ORDER: readonly ItemType[] = ["QUESTION", "FLASHCARD", "LESSON", "ASSESSMENT"];

interface Candidate {
  type: ItemType;
  id: string;
  externalRef: string | null;
  title: string;
  status: ContentStatus;
  reviewNotes: string | null;
}

function excerpt(text: string, max = 70): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/** Pipeline rows (live rows with a family key, and their pending draft copies) that are waiting for review/publication. */
async function candidates(families: readonly string[], topicIds: readonly string[] | null): Promise<Candidate[]> {
  const out: Candidate[] = [];
  const keyed = { OR: families.map((family) => ({ externalRef: { startsWith: familyRefPrefix(family) } })) };
  const waiting: ContentStatus[] = ["IN_REVIEW", "APPROVED", "DRAFT"];
  const pick = (row: { id: string; status: ContentStatus; reviewNotes: string | null }, type: ItemType, externalRef: string | null, title: string) => {
    if (row.status === "DRAFT" && type !== "ASSESSMENT") return;
    out.push({ type, id: row.id, externalRef, title, status: row.status, reviewNotes: row.reviewNotes });
  };
  const draftSelect = { id: true, status: true, reviewNotes: true } as const;

  const questions = await db.question.findMany({
    where: { AND: [keyed, ...(topicIds ? [{ topics: { some: { topicId: { in: [...topicIds] } } } }] : [])] },
    select: { id: true, status: true, reviewNotes: true, externalRef: true, stem: true, pendingDraft: { select: draftSelect } },
    orderBy: { externalRef: "asc" },
  });
  for (const q of questions) {
    if (waiting.includes(q.status)) pick(q, "QUESTION", q.externalRef, excerpt(q.stem));
    if (q.pendingDraft && waiting.includes(q.pendingDraft.status)) pick(q.pendingDraft, "QUESTION", q.externalRef, `${excerpt(q.stem)} (edit)`);
  }
  const cards = await db.flashcard.findMany({
    where: { AND: [keyed, ...(topicIds ? [{ topics: { some: { topicId: { in: [...topicIds] } } } }] : [])] },
    select: { id: true, status: true, reviewNotes: true, externalRef: true, front: true, pendingDraft: { select: draftSelect } },
    orderBy: { externalRef: "asc" },
  });
  for (const c of cards) {
    if (waiting.includes(c.status)) pick(c, "FLASHCARD", c.externalRef, excerpt(c.front));
    if (c.pendingDraft && waiting.includes(c.pendingDraft.status)) pick(c.pendingDraft, "FLASHCARD", c.externalRef, `${excerpt(c.front)} (edit)`);
  }
  const lessons = await db.lesson.findMany({
    where: { AND: [keyed, ...(topicIds ? [{ topics: { some: { topicId: { in: [...topicIds] } } } }] : [])] },
    select: { id: true, status: true, reviewNotes: true, externalRef: true, title: true, pendingDraft: { select: draftSelect } },
    orderBy: { externalRef: "asc" },
  });
  for (const l of lessons) {
    if (waiting.includes(l.status)) pick(l, "LESSON", l.externalRef, l.title);
    if (l.pendingDraft && waiting.includes(l.pendingDraft.status)) pick(l.pendingDraft, "LESSON", l.externalRef, `${l.title} (edit)`);
  }
  const assessments = await db.assessment.findMany({
    where: {
      AND: [
        keyed,
        ...(topicIds ? [{ OR: [{ topics: { some: { topicId: { in: [...topicIds] } } } }, { sections: { some: { rules: { some: { topicId: { in: [...topicIds] } } } } } }] }] : []),
      ],
    },
    select: { id: true, status: true, reviewNotes: true, externalRef: true, title: true, pendingDraft: { select: draftSelect } },
    orderBy: { externalRef: "asc" },
  });
  for (const a of assessments) {
    if (waiting.includes(a.status)) pick(a, "ASSESSMENT", a.externalRef, a.title);
    if (a.pendingDraft && waiting.includes(a.pendingDraft.status)) pick(a.pendingDraft, "ASSESSMENT", a.externalRef, `${a.title} (edit)`);
  }
  return out.sort((x, y) => ORDER.indexOf(x.type) - ORDER.indexOf(y.type));
}

async function syllabusModels(options: PublishOptions, families: readonly string[]): Promise<SyllabusModel[]> {
  const tree = loadContentTree(options.repoRoot, { families: [...families] }, options.contentRoot);
  return tree.syllabi.map((loaded) => buildSyllabusModel(loaded).model).filter((m) => families.includes(m.family));
}

async function versionOf(model: SyllabusModel) {
  return db.syllabus.findFirst({
    where: { versionLabel: model.ref.versionLabel, subject: { slug: model.ref.subject, qualification: { slug: model.ref.qualification, examBoard: { slug: model.ref.board } } } },
    select: { id: true, status: true, subjectId: true },
  });
}

/** Subjects with a CURRENT version and published content → AVAILABLE (verified by their official syllabus source). */
export async function promoteCatalogue(approver: CmsActor, models: readonly SyllabusModel[], dryRun: boolean): Promise<string[]> {
  const notes: string[] = [];
  const seen = new Set<string>();
  for (const model of models) {
    const version = await versionOf(model);
    if (!version || seen.has(version.subjectId)) continue;
    seen.add(version.subjectId);
    const subject = await db.subject.findUniqueOrThrow({ where: { id: version.subjectId }, include: { qualification: true } });
    const current = await db.syllabus.findFirst({ where: { subjectId: subject.id, status: "CURRENT" }, select: { id: true } });
    if (!current) continue;
    const published = await db.questionTopic.count({ where: { syllabusId: current.id, question: { status: "PUBLISHED" } } });
    const publishedLessons = await db.lessonTopic.count({ where: { topic: { syllabusId: current.id }, lesson: { status: "PUBLISHED" } } });
    if (published + publishedLessons === 0) continue;
    if (subject.catalogueStatus !== "AVAILABLE") {
      const source = await db.contentSource.findUnique({ where: { slug: officialSourceSlug(model) }, select: { id: true } });
      const sourceId = subject.sourceId ?? source?.id ?? null;
      notes.push(`${dryRun ? "would make" : "made"} ${model.subjectPath} AVAILABLE (was ${subject.catalogueStatus})`);
      if (!dryRun) {
        await updateSubject(approver, {
          id: subject.id,
          categoryId: subject.categoryId,
          slug: subject.slug,
          name: subject.name,
          shortName: subject.shortName,
          officialCode: subject.officialCode ?? model.data.code,
          description: subject.description,
          publicSummary: subject.publicSummary,
          metaTitle: subject.metaTitle,
          metaDescription: subject.metaDescription,
          languageCode: subject.languageCode,
          iconKey: subject.iconKey,
          catalogueStatus: "AVAILABLE",
          isPublic: subject.isPublic,
          sortOrder: subject.sortOrder,
          sourceId,
          confirmSlugChange: false,
        });
      }
    }
    const qualification = subject.qualification;
    if (qualification.catalogueStatus === "HIDDEN" || qualification.catalogueStatus === "COMING_SOON") {
      notes.push(`${dryRun ? "would make" : "made"} qualification ${model.ref.board}/${model.ref.qualification} AVAILABLE (was ${qualification.catalogueStatus})`);
      if (!dryRun) {
        await updateQualification(approver, {
          id: qualification.id,
          levelId: qualification.levelId,
          slug: qualification.slug,
          code: qualification.code,
          name: qualification.name,
          shortName: qualification.shortName,
          description: qualification.description,
          publicSummary: qualification.publicSummary,
          catalogueStatus: "AVAILABLE",
          sortOrder: qualification.sortOrder,
          metaTitle: qualification.metaTitle,
          metaDescription: qualification.metaDescription,
          confirmSlugChange: false,
        });
      }
    }
  }
  return notes;
}

export async function publishContentFromPipeline(options: PublishOptions): Promise<PublishReport> {
  const progress = options.onProgress ?? (() => undefined);
  const dryRun = options.dryRun === true;
  const approver = await resolveApprover(db, options.approverEmail);
  const curriculumAdmin = canPublishCurriculum(approver.actor);
  const tree = loadContentTree(options.repoRoot, {}, options.contentRoot);
  const families = (options.families && options.families.length > 0 ? [...options.families] : [...new Set([...tree.families, ...tree.registries.keys()])]).sort();
  const report: PublishReport = { approver: approver.email, dryRun, syllabi: [], items: [], catalogue: [] };
  const note = options.note?.trim() || DEFAULT_ATTESTATION;

  // 1. Syllabus versions.
  const models = await syllabusModels(options, families);
  for (const model of models) {
    const version = await versionOf(model);
    if (!version) {
      report.syllabi.push({ path: model.path, outcome: "missing", message: "not imported yet (npm run content:import)" });
      continue;
    }
    if (version.status !== "DRAFT") {
      report.syllabi.push({ path: model.path, outcome: "already-published", message: version.status });
      continue;
    }
    if (!curriculumAdmin) {
      report.syllabi.push({ path: model.path, outcome: "skipped", message: "DRAFT: publishing a syllabus version needs an ADMIN approver" });
      continue;
    }
    const blocked = await rollbackProblem(version.subjectId, version.id, model.data.publishAs);
    if (blocked) {
      report.syllabi.push({ path: model.path, outcome: "error", message: blocked });
      continue;
    }
    if (dryRun) {
      report.syllabi.push({ path: model.path, outcome: "would-publish", message: `as ${model.data.publishAs}` });
      continue;
    }
    try {
      const result = await publishSyllabusVersion(approver.actor, { id: version.id, mode: model.data.publishAs, archivePrevious: false });
      report.syllabi.push({ path: model.path, outcome: "published", message: `as ${result.status}` });
    } catch (error) {
      report.syllabi.push({ path: model.path, outcome: "error", message: describeError(error) });
    }
  }

  // 2. Topic filter.
  let topicIds: string[] | null = null;
  if (options.topicKey) {
    const syllabusIds: string[] = [];
    for (const model of models) {
      const version = await versionOf(model);
      if (version) syllabusIds.push(version.id);
    }
    const roots = await db.topic.findMany({ where: { contentKey: options.topicKey, syllabusId: { in: syllabusIds } }, select: { path: true, syllabusId: true } });
    if (roots.length === 0) throw new Error(`No topic with the key "${options.topicKey}" in the ${families.join(", ")} syllabi.`);
    const subtreeRows = await db.topic.findMany({
      where: { OR: roots.map((root) => ({ syllabusId: root.syllabusId, OR: [{ path: root.path }, { path: { startsWith: `${root.path}/` } }] })) },
      select: { id: true },
    });
    topicIds = subtreeRows.map((row) => row.id);
  }

  // 3. Items, in dependency order; each in its own transaction (one failure never rolls back the others).
  const author = await resolveAuthor(db, options.authorEmail ?? null);
  for (const item of await candidates(families, topicIds)) {
    const base = { type: item.type, id: item.id, externalRef: item.externalRef, title: item.title, from: item.status };
    if (item.status === "DRAFT") {
      // Only assessments are picked up as DRAFT: fixed tests that could not enter review before their questions were published.
      if (item.reviewNotes) {
        report.items.push({ ...base, outcome: "skipped", message: `changes were requested: ${item.reviewNotes}` });
        continue;
      }
    }
    if (dryRun) {
      report.items.push({ ...base, outcome: "would-publish", message: item.status === "APPROVED" ? "approved earlier" : item.status === "DRAFT" ? "will be submitted, approved and published" : "will be approved and published" });
      continue;
    }
    try {
      const published = await db.$transaction(
        async (tx) => {
          if (options.requireFourEyes) await tx.$queryRaw`SELECT set_config('app.four_eyes', 'on', true)`;
          if (item.status === "DRAFT") await submitContent(author.actor, { entityType: item.type, id: item.id }, { client: tx });
          if (item.type === "ASSESSMENT") {
            const checks = await assessmentChecks(tx, item.id);
            const problems = Object.values(checks.errors).flat();
            if (problems.length > 0) throw new Error(problems.join(" "));
          }
          if (item.status !== "APPROVED") await approveContent(approver.actor, { entityType: item.type, id: item.id, notes: note }, { client: tx });
          return publishContent(approver.actor, { entityType: item.type, id: item.id, changeNote: "Published from the content source (content:publish)." }, { client: tx });
        },
        { timeout: 120_000, maxWait: 15_000 },
      );
      report.items.push({ ...base, id: published.id, outcome: "published", revision: published.revision, ...(published.changed ? {} : { message: "the draft copy matched the published version and was discarded" }) });
      progress(`published ${item.type.toLowerCase()} ${item.externalRef ?? item.id} (revision ${published.revision})`);
    } catch (error) {
      report.items.push({ ...base, outcome: "error", message: describeError(error) });
    }
  }

  // 4. Catalogue.
  if (options.catalogue !== false && curriculumAdmin) {
    try {
      report.catalogue = await promoteCatalogue(approver.actor, models, dryRun);
    } catch (error) {
      report.catalogue = [`catalogue update failed: ${describeError(error)}`];
    }
  }

  // 5. One summary audit entry for the attestation (each approval and publication is audited by the publish helper).
  if (!dryRun) {
    const published = report.items.filter((i) => i.outcome === "published").length;
    await auditInTx(db, {
      actorUserId: approver.actor.userId,
      actorRoles: approver.actor.roles,
      action: AUDIT_ACTIONS.CONTENT_PUBLISH,
      entityType: "ContentPipeline",
      entityId: families.join(",").slice(0, 128),
      metadata: {
        operation: "content.pipeline_publish",
        attestation: note,
        families,
        topicKey: options.topicKey ?? null,
        published,
        failed: report.items.filter((i) => i.outcome === "error").length,
        syllabiPublished: report.syllabi.filter((s) => s.outcome === "published").length,
      },
    });
  }
  return report;
}
