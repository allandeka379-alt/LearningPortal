/**
 * Pure text rules for the public SEO pages (§44): page titles, meta descriptions, display labels and date ranges.
 * Every value is built from catalogue data passed in; the only literals are UI copy (no subjects, prices or claims).
 */

import { TITLE_SEPARATOR } from "@/lib/config";

/** Recommended upper bound for `<meta name="description">` (search engines truncate around 155–160 characters). */
export const META_DESCRIPTION_MAX = 160;

/** Collapses whitespace and cuts at a word boundary with an ellipsis (no cut when the text already fits). */
export function truncateText(value: string, max: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?\-–—]+$/, "")}…`;
}

/** First non-blank candidate, trimmed and clamped to {@link META_DESCRIPTION_MAX}. */
export function metaDescription(...candidates: Array<string | null | undefined>): string {
  for (const candidate of candidates) {
    const text = candidate?.replace(/\s+/g, " ").trim();
    if (text) return truncateText(text, META_DESCRIPTION_MAX);
  }
  return "";
}

/**
 * "ZIMSEC O-Level", "Cambridge IGCSE": board short name + qualification short name, unless the qualification name
 * already starts with the board name ("Cambridge IGCSE" stays as is).
 */
export function qualificationLabel(boardShortName: string, qualificationShortName: string): string {
  const board = boardShortName.trim();
  const qualification = qualificationShortName.trim();
  if (!board) return qualification;
  return qualification.toLowerCase().startsWith(board.toLowerCase()) ? qualification : `${board} ${qualification}`;
}

/**
 * Appends the product name as the title suffix, exactly as the root layout's title template does ("… · BvunzoHub"), unless
 * an editor's meta title already contains it. SEO pages set absolute titles (so the template is not applied twice).
 */
export function withBrand(title: string, appName: string): string {
  const clean = title.replace(/\s+/g, " ").trim();
  if (!appName || clean.toLowerCase().includes(appName.toLowerCase())) return clean;
  return `${clean}${TITLE_SEPARATOR}${appName}`;
}

/** Page title (before branding) for a board landing page. */
export function boardTitle(board: { shortName: string; metaTitle: string | null }): string {
  return board.metaTitle?.trim() || `${board.shortName} qualifications, subjects and practice`;
}

/** Page title (before branding) for a qualification page, e.g. "ZIMSEC O-Level subjects — syllabus topics and practice". */
export function qualificationTitle(label: string, qualification: { metaTitle: string | null }): string {
  return qualification.metaTitle?.trim() || `${label} subjects — syllabus topics and practice`;
}

/** Page title (before branding), e.g. "ZIMSEC O-Level Mathematics — topics, lessons and practice". */
export function subjectTitle(label: string, subject: { name: string; metaTitle: string | null }): string {
  return subject.metaTitle?.trim() || `${label} ${subject.name} — topics, lessons and practice`;
}

/** Page title (before branding), e.g. "Quadratic equations — ZIMSEC O-Level Mathematics". */
export function topicTitle(label: string, subjectName: string, topic: { name: string; metaTitle: string | null }): string {
  return topic.metaTitle?.trim() || `${topic.name} — ${label} ${subjectName}`;
}

/** Page title (before branding) of a public guide. */
export function guideTitle(scopeLabel: string, lesson: { title: string; metaTitle: string | null }): string {
  return lesson.metaTitle?.trim() || `${lesson.title} — ${scopeLabel}`;
}

/** Fallback description of a board page (UI copy around catalogue names). */
export function describeBoard(board: { shortName: string; name: string }, qualificationNames: readonly string[]): string {
  const names = qualificationNames.length > 0 ? ` for ${joinNames(qualificationNames)}` : "";
  return `Study for ${board.name} (${board.shortName}) examinations${names}: subjects, syllabus topics, exam dates and practice questions.`;
}

/** Fallback description of a qualification page. */
export function describeQualification(label: string): string {
  return `Browse ${label} subjects: syllabus topics, exam dates, free sample questions and lessons to help you prepare.`;
}

/** Fallback description of a subject page. */
export function describeSubject(label: string, subject: { name: string; officialCode: string | null }): string {
  const code = subject.officialCode ? ` (${subject.officialCode})` : "";
  return `${label} ${subject.name}${code}: the syllabus topic list, exam dates, free sample questions and how to practise each topic.`;
}

/** Fallback description of a topic page. */
export function describeTopic(label: string, subjectName: string, topicName: string): string {
  return `${topicName} in ${label} ${subjectName}: what the syllabus expects you to know, the learning objectives and how to practise.`;
}

/** "A, B and C". */
export function joinNames(names: readonly string[]): string {
  const list = names.filter((name) => name.trim() !== "");
  if (list.length <= 1) return list[0] ?? "";
  return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
}

/** "Topic 2.1 Quadratic equations" style label: the official code (when any) before the name. */
export function codedName(node: { code: string | null; name: string }): string {
  return node.code ? `${node.code} ${node.name}` : node.name;
}

const DAY_MONTH = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const DAY_MONTH_YEAR = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function calendarDate(date: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const instant = new Date(`${date}T12:00:00.000Z`);
  return Number.isNaN(instant.getTime()) ? null : instant;
}

/**
 * A calendar-date range for exam sessions: "3 Nov 2027", "20 Oct – 30 Nov 2027", "30 Nov 2027 – 12 Jan 2028".
 * Dates are `YYYY-MM-DD` (DATE columns), formatted without any time-zone shift.
 */
export function formatDateRange(startsOn: string, endsOn: string): string {
  const start = calendarDate(startsOn);
  const end = calendarDate(endsOn);
  if (!start) return startsOn;
  if (!end || startsOn === endsOn) return DAY_MONTH_YEAR.format(start);
  if (startsOn.slice(0, 4) === endsOn.slice(0, 4)) return `${DAY_MONTH.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
  return `${DAY_MONTH_YEAR.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
}

/** A calendar date as "3 Nov 2027" (`YYYY-MM-DD` in, no time-zone shift). */
export function formatCalendarDate(date: string): string {
  const instant = calendarDate(date);
  return instant ? DAY_MONTH_YEAR.format(instant) : date;
}
