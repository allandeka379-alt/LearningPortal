import "server-only";
import { db, type DbClient } from "@/server/db";
import type { MarketingLevel } from "./catalogue-core";
import { buildMarketingForms, type ContentStats, type MarketingForm } from "./learning-core";

/**
 * Data for the learning-first sections of the public site (owner brief 2026-10-12): the school years we teach (Form 3
 * to Form 6, from `YearGroup`) and real published-content counts. Public pages are ISR, so these run once per
 * regeneration, not per visitor.
 */

/** Country whose school years the public site describes (Zimbabwe: Forms 3-4 O-Level, Lower/Upper Sixth A-Level). */
export const MARKETING_COUNTRY_ISO = "ZW";

/** First school year the platform is for (owner brief 2026-10-12: Form 3 to Form 6). */
export const FIRST_FORM_ORDINAL = 3;

export async function getMarketingForms(levels: readonly MarketingLevel[], client: DbClient = db): Promise<MarketingForm[]> {
  if (levels.length === 0) return [];
  const rows = await client.yearGroup.findMany({
    where: { isActive: true, ordinal: { gte: FIRST_FORM_ORDINAL }, country: { isoCode: MARKETING_COUNTRY_ISO }, typicalLevelId: { in: levels.map((level) => level.id) } },
    select: { code: true, name: true, ordinal: true, typicalLevel: { select: { id: true, slug: true, name: true } } },
    orderBy: { ordinal: "asc" },
    take: 20,
  });
  return buildMarketingForms(rows, levels);
}

/**
 * Published content that students can reach: lessons (not articles) and questions, flashcards and tests in the
 * PUBLISHED state, and subjects open in the catalogue. Five counts, run in parallel.
 */
export async function getContentStats(client: DbClient = db): Promise<ContentStats> {
  const [subjects, lessons, questions, flashcards, tests] = await Promise.all([
    client.subject.count({ where: { catalogueStatus: "AVAILABLE", qualification: { catalogueStatus: "AVAILABLE" } } }),
    client.lesson.count({ where: { status: "PUBLISHED", kind: "LESSON" } }),
    client.question.count({ where: { status: "PUBLISHED" } }),
    client.flashcard.count({ where: { status: "PUBLISHED" } }),
    client.assessment.count({ where: { status: "PUBLISHED" } }),
  ]);
  return { subjects, lessons, questions, flashcards, tests };
}
