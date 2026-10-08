import "server-only";
import { collectContentIssues, loadContentAggregate, type WorkflowEntityType } from "@/server/content/publish";
import { LESSON_RENDER_OPTIONS, loadAssetResolver } from "@/server/content/service";
import { renderContent } from "@/server/content/render";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { lessonStructureIssues } from "../lessons/core";
import {
  FLASHCARD_PROVENANCE_REQUIREMENTS,
  LESSON_PROVENANCE_REQUIREMENTS,
  mergeIssues,
  provenanceIssues,
  warningIssues,
} from "./provenance";

/**
 * Editorial checks that run before an item enters review (and are shown to reviewers): structure, licensing (§27),
 * accessibility of images (§43) and the publish helper's own authoring checks (invalid LaTeX, unknown blocks, question
 * definitions that cannot be marked). Lessons and flashcards have CMS-specific rules; other types get the helper's.
 */

/** Render options for flashcard sides (as `renderFlashcardHtml`, minus the per-card id prefix). */
export const FLASHCARD_PREVIEW_OPTIONS = { baseHeadingLevel: 3 } as const;

export async function lessonSubmitIssues(client: DbClient, lessonId: string): Promise<FieldErrors> {
  const lesson = await client.lesson.findUnique({
    where: { id: lessonId },
    select: {
      kind: true,
      title: true,
      body: true,
      summary: true,
      subjectId: true,
      sourceId: true,
      author: true,
      copyrightStatus: true,
      licenceCode: true,
      publicationDate: true,
      topics: { select: { isPrimary: true } },
      practiceLinks: {
        select: { question: { select: { id: true, status: true, parentId: true, schoolId: true, ownerUserId: true, draftOfId: true } } },
      },
    },
  });
  if (!lesson) throw AppError.notFound("Lesson not found.");
  const resolveAsset = await loadAssetResolver([lesson.body, lesson.summary], client);
  const rendered = renderContent(lesson.body, { ...LESSON_RENDER_OPTIONS, resolveAsset });
  const questionIssues: FieldErrors = {};
  for (const { question } of lesson.practiceLinks) {
    if (question.parentId !== null || question.draftOfId !== null || question.schoolId !== null || question.ownerUserId !== null) {
      (questionIssues.questionIds ??= []).push("Attach whole platform questions only (not parts, drafts or school questions).");
    } else if (question.status !== "PUBLISHED") {
      (questionIssues.questionIds ??= []).push("Every attached practice question must be published. Remove or publish the unpublished ones.");
    }
  }
  return mergeIssues(
    lessonStructureIssues({
      kind: lesson.kind,
      title: lesson.title,
      body: lesson.body,
      subjectId: lesson.subjectId,
      topicCount: lesson.topics.length,
      hasPrimaryTopic: lesson.topics.some((t) => t.isPrimary),
    }),
    provenanceIssues(lesson, LESSON_PROVENANCE_REQUIREMENTS),
    warningIssues({}, "body", rendered.warnings),
    questionIssues,
  );
}

export async function flashcardSubmitIssues(client: DbClient, flashcardId: string): Promise<FieldErrors> {
  const card = await client.flashcard.findUnique({
    where: { id: flashcardId },
    select: {
      front: true,
      back: true,
      notes: true,
      sourceId: true,
      author: true,
      copyrightStatus: true,
      licenceCode: true,
      publicationDate: true,
      ownerUserId: true,
      topics: { select: { isPrimary: true } },
    },
  });
  if (!card || card.ownerUserId !== null) throw AppError.notFound("Flashcard not found.");
  const errors: FieldErrors = {};
  if (card.front.trim() === "") (errors.front ??= []).push("Write the front of the card.");
  if (card.back.trim() === "") (errors.back ??= []).push("Write the back of the card.");
  if (!card.topics.some((t) => t.isPrimary)) (errors.topicIds ??= []).push("Tag the card to its primary topic so it appears in a deck.");
  const resolveAsset = await loadAssetResolver([card.front, card.back, card.notes], client);
  for (const field of ["front", "back", "notes"] as const) {
    const source = card[field];
    if (source) warningIssues(errors, field, renderContent(source, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }).warnings);
  }
  return mergeIssues(errors, provenanceIssues(card, FLASHCARD_PROVENANCE_REQUIREMENTS));
}

/**
 * Everything that blocks `entityType` / `id` from entering review (empty = ready): the CMS rules above plus the
 * publish helper's own checks.
 */
export async function contentSubmitIssues(tx: Tx, entityType: WorkflowEntityType, id: string): Promise<FieldErrors> {
  const own = entityType === "LESSON" ? await lessonSubmitIssues(tx, id) : entityType === "FLASHCARD" ? await flashcardSubmitIssues(tx, id) : {};
  const aggregate = await loadContentAggregate(tx, entityType, id);
  if (!aggregate) throw AppError.notFound("Content not found.");
  return mergeIssues(own, collectContentIssues(entityType, aggregate));
}
