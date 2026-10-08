import "server-only";
import { db } from "@/server/db";
import type { CmsActor } from "@/server/cms/users/access";
import { resolveApprover, resolveAuthor, type ResolvedAccount } from "./accounts";
import { assessmentTargets } from "./resolve";
import {
  assessmentRefs,
  importAssessment,
  importFlashcard,
  importLesson,
  importQuestion,
  loadAssessments,
  loadFlashcards,
  loadLessons,
  loadQuestions,
  type ItemImportContext,
  type ItemOutcome,
  type ItemResult,
  type ItemType,
} from "./import-items";
import type { Issue } from "./issues";
import { assessmentExternalRef, familyRefPrefix, itemExternalRef } from "./keys";
import { syncMedia, type MediaOutcome } from "./media";
import { promoteCatalogue } from "./publisher";
import { ensureOriginalSource } from "./sources";
import { syncSyllabus, type SyllabusIndexEntry, type SyllabusOutcome } from "./syllabus-sync";
import { validateContent, type ValidationResult } from "./validate";

/**
 * `npm run content:import` (docs/CONTENT_PIPELINE.md "Importing"): validates the content source, then upserts it into
 * the database as the pipeline author: syllabus versions (+ publication with an ADMIN `--approver`), media, questions,
 * lessons, flashcards and assessments, each through the CMS services and the shared publish helper. Idempotent: a
 * second run over unchanged files changes nothing. Never publishes content (that is `content:publish`, a human
 * attestation) and never deletes anything.
 */

export interface ImportOptions {
  repoRoot: string;
  contentRoot?: string;
  /** Families to import (default: every family). Their syllabus files are imported too. */
  families?: readonly string[];
  /** Author account (default: the dedicated pipeline account). */
  authorEmail?: string | null;
  /** ADMIN who publishes DRAFT syllabus versions during the import (optional). */
  approverEmail?: string | null;
  /** Import even when validation reports errors (never recommended; items with errors may fail individually). */
  force?: boolean;
  /** Check cache for the validation step (null disables). */
  cacheDir?: string | null;
  /** YYYY-MM-DD for new lessons' publication date (default today). */
  today?: string;
  onProgress?: (line: string) => void;
}

export interface OrphanRow {
  type: ItemType;
  id: string;
  externalRef: string;
  status: string;
}

export interface ImportReport {
  validation: Pick<ValidationResult, "errorCount" | "warningCount">;
  validationIssues: Issue[];
  /** True when validation errors stopped the import. */
  aborted: boolean;
  author: { email: string; created: boolean };
  syllabi: SyllabusOutcome[];
  media: MediaOutcome[];
  items: ItemResult[];
  orphans: OrphanRow[];
  counts: Record<ItemType, Record<ItemOutcome, number>>;
  /** Catalogue changes (only with an ADMIN approver: subjects with a current syllabus and published content). */
  catalogue: string[];
}

const OUTCOMES: readonly ItemOutcome[] = ["created", "updated", "unchanged", "retagged", "conflict", "skipped", "error"];
const TYPES: readonly ItemType[] = ["QUESTION", "LESSON", "FLASHCARD", "ASSESSMENT"];

function emptyCounts(): Record<ItemType, Record<ItemOutcome, number>> {
  return Object.fromEntries(TYPES.map((type) => [type, Object.fromEntries(OUTCOMES.map((o) => [o, 0]))])) as Record<ItemType, Record<ItemOutcome, number>>;
}

export async function importContent(options: ImportOptions): Promise<ImportReport> {
  const progress = options.onProgress ?? (() => undefined);
  const validation = validateContent({
    repoRoot: options.repoRoot,
    ...(options.contentRoot ? { contentRoot: options.contentRoot } : {}),
    ...(options.families && options.families.length > 0 ? { targets: options.families } : {}),
    ...(options.cacheDir !== undefined ? { cacheDir: options.cacheDir } : {}),
  });
  const tree = validation.tree;
  const report: ImportReport = {
    validation: { errorCount: validation.errorCount, warningCount: validation.warningCount },
    validationIssues: validation.issues,
    aborted: false,
    author: { email: "", created: false },
    syllabi: [],
    media: [],
    items: [],
    orphans: [],
    counts: emptyCounts(),
    catalogue: [],
  };
  if (validation.errorCount > 0 && !options.force) {
    report.aborted = true;
    return report;
  }

  const families = (options.families && options.families.length > 0 ? [...options.families] : [...new Set([...tree.families, ...tree.registries.keys()])]).sort();
  const author: ResolvedAccount = await resolveAuthor(db, options.authorEmail ?? null);
  report.author = { email: author.email, created: author.created };
  const approver: CmsActor | null = options.approverEmail ? (await resolveApprover(db, options.approverEmail, { needAdmin: true })).actor : null;
  const originalSourceId = await ensureOriginalSource(db);

  // 1. Syllabus versions of the selected families.
  const models = validation.models.filter((m) => families.includes(m.family));
  const index = new Map<string, SyllabusIndexEntry>();
  for (const model of models) {
    progress(`syllabus ${model.path}`);
    const { entry, outcomes } = await syncSyllabus(model, { author: author.actor, approver });
    report.syllabi.push(...outcomes);
    if (entry) index.set(model.path, entry);
  }

  // 2. Media.
  const media = await syncMedia(tree, families, originalSourceId);
  report.media = media.outcomes;

  const ctx: ItemImportContext = {
    author: author.actor,
    originalSourceId,
    index,
    models: validation.models,
    registries: tree.registries,
    media: media.ids,
    today: options.today ?? new Date().toISOString().slice(0, 10),
  };
  const inScope = <T extends { family: string }>(items: readonly T[]) => items.filter((item) => families.includes(item.family));
  const record = (item: ItemResult) => {
    report.items.push(item);
    report.counts[item.type][item.outcome] += 1;
    if (item.outcome !== "unchanged") progress(`${item.type.toLowerCase()} ${item.family}:${item.key} ${item.outcome}${item.message ? ` (${item.message})` : ""}`);
  };

  // 3. Questions (assessments reference them), lessons, flashcards, assessments.
  const questions = inScope(tree.questions);
  const existingQuestions = await loadQuestions(questions.map((q) => itemExternalRef(q.family, q.data.key)));
  for (const item of questions) record(await importQuestion(item, existingQuestions.get(itemExternalRef(item.family, item.data.key)), ctx));

  const lessons = inScope(tree.lessons);
  const existingLessons = await loadLessons(lessons.map((l) => itemExternalRef(l.family, l.front.key)));
  for (const lesson of lessons) record(await importLesson(lesson, existingLessons.get(itemExternalRef(lesson.family, lesson.front.key)), ctx));

  const flashcards = inScope(tree.flashcards);
  const existingCards = await loadFlashcards(flashcards.map((f) => itemExternalRef(f.family, f.data.key)));
  for (const item of flashcards) record(await importFlashcard(item, existingCards.get(itemExternalRef(item.family, item.data.key)), ctx));

  const assessments = inScope(tree.assessments);
  if (assessments.length > 0) {
    const liveQuestions = await loadQuestions(tree.questions.filter((q) => families.includes(q.family)).map((q) => itemExternalRef(q.family, q.data.key)));
    const existingAssessments = await loadAssessments(assessments.flatMap((a) => assessmentRefs(a, validation.models)));
    for (const item of assessments) {
      const questionIds = new Map<string, string>();
      for (const q of tree.questions) {
        if (q.family !== item.family) continue;
        const row = liveQuestions.get(itemExternalRef(q.family, q.data.key));
        if (row) questionIds.set(q.data.key, row.id);
      }
      for (const target of assessmentTargets(item.family, item.data, validation.models)) {
        if (!families.includes(target.family)) continue;
        record(await importAssessment(item, target, existingAssessments.get(assessmentExternalRef(item.family, item.data.key, target.ref)), questionIds, ctx));
      }
    }
  }

  // 4. Catalogue: with an ADMIN approver, subjects that now have a current syllabus and published content become
  // AVAILABLE (content:publish does the same after publishing).
  if (approver) report.catalogue = await promoteCatalogue(approver, models, false);

  // 5. Orphans: pipeline rows whose key is no longer in the files (reported, never deleted).
  const known = new Set<string>([
    ...questions.map((q) => itemExternalRef(q.family, q.data.key)),
    ...lessons.map((l) => itemExternalRef(l.family, l.front.key)),
    ...flashcards.map((f) => itemExternalRef(f.family, f.data.key)),
    ...assessments.flatMap((a) => assessmentRefs(a, validation.models)),
  ]);
  for (const family of families) {
    const where = { externalRef: { startsWith: familyRefPrefix(family) } };
    const select = { id: true, externalRef: true, status: true } as const;
    const rows: [ItemType, { id: string; externalRef: string | null; status: string }[]][] = [
      ["QUESTION", await db.question.findMany({ where, select })],
      ["LESSON", await db.lesson.findMany({ where, select })],
      ["FLASHCARD", await db.flashcard.findMany({ where, select })],
      ["ASSESSMENT", await db.assessment.findMany({ where, select })],
    ];
    for (const [type, list] of rows) {
      for (const row of list) {
        if (row.externalRef && !known.has(row.externalRef)) report.orphans.push({ type, id: row.id, externalRef: row.externalRef, status: row.status });
      }
    }
  }
  return report;
}
