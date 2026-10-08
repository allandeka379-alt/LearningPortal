/**
 * Deep-link parameters of the practice builder (`/app/practice?subjectId=…&topicId=…&count=20&difficulty=MEDIUM`),
 * as produced by the dashboard, study plan and results recommendations (`hrefFor` in src/server/progress and
 * src/server/attempts/result.ts). Pure; unknown or malformed values fall back to the defaults (never an error page).
 */

export const DIFFICULTY_VALUES = ["ADAPTIVE", "EASY", "MEDIUM", "HARD"] as const;
export type DifficultyValue = (typeof DIFFICULTY_VALUES)[number];

export const PRACTICE_ORIGINS = ["BUILDER", "PLAN_ITEM", "RECOMMENDATION", "RETEST", "MISTAKES"] as const;
export type PracticeOrigin = (typeof PRACTICE_ORIGINS)[number];

export interface BuilderParams {
  subjectId: string | null;
  topicIds: string[];
  count: number;
  difficulty: DifficultyValue;
  mode: "PRACTICE" | "RETEST";
  origin: PracticeOrigin;
}

export type SearchParams = Record<string, string | string[] | undefined>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const DEFAULT_COUNT = 10;
export const MAX_COUNT = 60;
const MAX_TOPICS = 50;

function values(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return (Array.isArray(value) ? value : [value]).flatMap((v) => v.split(",")).map((v) => v.trim()).filter(Boolean);
}

function first(value: string | string[] | undefined): string | undefined {
  return values(value)[0];
}

export function parseBuilderParams(params: SearchParams): BuilderParams {
  const subject = first(params.subjectId);
  const topicIds = [...new Set([...values(params.topicId), ...values(params.topicIds)].filter((id) => UUID.test(id)))].slice(0, MAX_TOPICS);
  const countRaw = Number(first(params.count));
  const count = Number.isInteger(countRaw) && countRaw >= 1 && countRaw <= MAX_COUNT ? countRaw : DEFAULT_COUNT;
  const difficultyRaw = first(params.difficulty)?.toUpperCase();
  const difficulty = (DIFFICULTY_VALUES as readonly string[]).includes(difficultyRaw ?? "") ? (difficultyRaw as DifficultyValue) : "ADAPTIVE";
  const mode = first(params.mode)?.toUpperCase() === "RETEST" ? "RETEST" : "PRACTICE";
  const originRaw = first(params.origin)?.toUpperCase();
  const origin = (PRACTICE_ORIGINS as readonly string[]).includes(originRaw ?? "") ? (originRaw as PracticeOrigin) : mode === "RETEST" ? "RETEST" : "BUILDER";
  return { subjectId: subject && UUID.test(subject) ? subject : null, topicIds, count, difficulty, mode, origin };
}

/** Session sizes offered: the standard ones plus a deep link's own count. */
export function sessionSizes(standard: readonly number[], requested: number): number[] {
  return [...new Set([...standard, requested])].sort((a, b) => a - b);
}
