import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { renderContent } from "@/server/content/render";
import { db, type DbClient } from "@/server/db";
import { isFeatureEnabled } from "@/server/features";
import { isProd } from "@/server/lib/env";

/**
 * Published FAQ entries (FaqItem, CMS-managed, §45) for /faq, the home page and the contextual blocks on /pricing and
 * /schools. Answers are Markdown, rendered server-side through the sanitising content pipeline. Dev-seed placeholders
 * (`isDemo`) are excluded in production and flagged elsewhere (CLAUDE.md rule 6). Nothing is ever invented: with no
 * published rows the caller omits its FAQ section. Entries in the {@link AI_FAQ_CATEGORY} category are hidden while AI
 * is switched off (`features.ai`, owner decision 2026-10-07): the public site makes no AI claims then.
 */

/** FAQ category about the AI tutor; only listed while `features.ai` is on. */
export const AI_FAQ_CATEGORY = "ai";

export interface PublicFaqItem {
  id: string;
  question: string;
  answerHtml: SanitizedHtml;
  /** Admin-defined group key, e.g. "general", "pricing", "schools". */
  category: string;
  /** Dev-seed placeholder (never returned in production). */
  isDemo: boolean;
}

export interface ListFaqOptions {
  /** Only these categories (case-insensitive). */
  categories?: readonly string[];
  /** BCP-47 locale (default "en"). */
  locale?: string;
  /** Maximum entries (default 100, at most 200). */
  limit?: number;
}

const MAX_LIMIT = 200;

/** Category keys are free text in the CMS: compare them trimmed and lower-cased. */
export function normalizeFaqCategory(category: string): string {
  return category.trim().toLowerCase();
}

const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  general: "General",
  pricing: "Plans and payments",
  billing: "Plans and payments",
  schools: "For schools",
  exams: "Exams and boards",
  ai: "AI tutor",
  privacy: "Privacy and safety",
  account: "Your account",
};

/** Heading for an FAQ group: a known label, else the key in sentence case ("study-tips" → "Study tips"). */
export function faqCategoryLabel(category: string): string {
  const key = normalizeFaqCategory(category);
  const known = CATEGORY_LABELS[key];
  if (known) return known;
  const words = key.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return words ? `${words.charAt(0).toUpperCase()}${words.slice(1)}` : "Other";
}

/** Published FAQ entries in admin order (category, then sort order). */
export async function listPublishedFaqs(options: ListFaqOptions = {}, client: DbClient = db): Promise<PublicFaqItem[]> {
  const limit = Math.min(Math.max(1, Math.trunc(options.limit ?? 100)), MAX_LIMIT);
  const categories = options.categories?.map(normalizeFaqCategory).filter(Boolean);
  const hidden = (await isFeatureEnabled("ai")) ? null : AI_FAQ_CATEGORY;
  const where: Prisma.FaqItemWhereInput = {
    isPublished: true,
    locale: options.locale ?? "en",
    ...(isProd() ? { isDemo: false } : {}),
  };
  const rows = await client.faqItem.findMany({
    where,
    select: { id: true, question: true, answer: true, category: true, isDemo: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    // Categories are compared normalised in memory (the CMS stores them as typed); over-fetch a little for that.
    take: categories || hidden ? MAX_LIMIT : limit,
  });
  return rows
    .filter((row) => !categories || categories.includes(normalizeFaqCategory(row.category)))
    .filter((row) => hidden === null || normalizeFaqCategory(row.category) !== hidden)
    .slice(0, limit)
    .map((row) => ({
      id: row.id,
      question: row.question.trim(),
      answerHtml: renderContent(row.answer, { idPrefix: `faq-${row.id.slice(-8)}-`, baseHeadingLevel: 4 }).html,
      category: normalizeFaqCategory(row.category),
      isDemo: row.isDemo,
    }));
}

export interface FaqGroup {
  category: string;
  label: string;
  /** Safe element id / URL fragment for the group, e.g. "faq-study-tips". */
  anchor: string;
  items: PublicFaqItem[];
}

/** Groups FAQ entries by category, keeping first-seen order (pure). */
export function groupFaqs(items: readonly PublicFaqItem[]): FaqGroup[] {
  const groups = new Map<string, FaqGroup>();
  for (const item of items) {
    let group = groups.get(item.category);
    if (!group) {
      const slug = item.category.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "other";
      group = { category: item.category, label: faqCategoryLabel(item.category), anchor: `faq-${slug}`, items: [] };
      groups.set(item.category, group);
    }
    group.items.push(item);
  }
  return [...groups.values()];
}
