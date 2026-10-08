/**
 * schema.org JSON-LD for the public curriculum pages (§44). Pure builders: every value comes from catalogue rows passed
 * in, URLs are absolute, and nothing is invented: no ratings, reviews, enrolment counts or prices (CLAUDE.md rule 6).
 *
 * - every page: `BreadcrumbList`;
 * - board / qualification pages: `CollectionPage` about the examination board, publisher = our `EducationalOrganization`,
 *   with an `ItemList` of the listed qualifications / subjects (Google's "summary page" pattern for course lists);
 * - subject pages: `Course` (name, description, course code, level, language, topics taught, provider);
 * - topic pages: `LearningResource` that `isPartOf` the subject's course and `teaches` its objectives;
 * - guide pages: `Article`.
 */

export type JsonLd = Record<string, unknown>;

const CONTEXT = "https://schema.org";

/** Maximum entries per ItemList / `teaches` array (keeps the payload small on slow connections). */
export const JSON_LD_LIST_LIMIT = 50;

export interface Crumb {
  name: string;
  /** Absolute URL. */
  url: string;
}

export function breadcrumbListJsonLd(crumbs: readonly Crumb[]): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: crumb.url })),
  };
}

/** The platform itself, as publisher / course provider. */
export function siteOrganization(appName: string, appUrl: string): JsonLd {
  return { "@type": "EducationalOrganization", name: appName, url: appUrl };
}

/** The examination board a page is about (an external organisation: we never claim to be it). */
export function boardOrganization(board: { name: string; shortName: string; websiteUrl: string | null }): JsonLd {
  const out: JsonLd = { "@type": "Organization", name: board.name, alternateName: board.shortName };
  if (board.websiteUrl && /^https?:\/\//i.test(board.websiteUrl)) out.url = board.websiteUrl;
  return out;
}

export interface CollectionPageInput {
  name: string;
  description: string;
  url: string;
  about: JsonLd;
  publisher: JsonLd;
  /** Absolute URLs of the listed child pages, in display order. */
  items: readonly { name: string; url: string }[];
}

export function collectionPageJsonLd(input: CollectionPageInput): JsonLd {
  const out: JsonLd = {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    name: input.name,
    url: input.url,
    about: input.about,
    publisher: input.publisher,
  };
  if (input.description) out.description = input.description;
  if (input.items.length > 0) {
    out.mainEntity = {
      "@type": "ItemList",
      itemListElement: input.items.slice(0, JSON_LD_LIST_LIMIT).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    };
  }
  return out;
}

export interface CourseInput {
  name: string;
  description: string;
  url: string;
  provider: JsonLd;
  /** Official syllabus / subject code, e.g. "4004". */
  courseCode: string | null;
  /** e.g. "ZIMSEC O-Level". */
  educationalLevel: string;
  /** BCP 47. */
  inLanguage: string;
  /** Topic names (top-level topics of the current syllabus version). */
  teaches: readonly string[];
  /** Examination board the course prepares for. */
  about: JsonLd;
}

export function courseJsonLd(input: CourseInput): JsonLd {
  const out: JsonLd = {
    "@context": CONTEXT,
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: input.provider,
    educationalLevel: input.educationalLevel,
    inLanguage: input.inLanguage,
    about: input.about,
  };
  if (input.courseCode) out.courseCode = input.courseCode;
  if (input.teaches.length > 0) out.teaches = input.teaches.slice(0, JSON_LD_LIST_LIMIT);
  return out;
}

export interface LearningResourceInput {
  name: string;
  description: string;
  url: string;
  educationalLevel: string;
  inLanguage: string;
  /** Learning objective statements. */
  teaches: readonly string[];
  /** The subject course this topic belongs to. */
  course: { name: string; url: string };
  publisher: JsonLd;
}

export function learningResourceJsonLd(input: LearningResourceInput): JsonLd {
  const out: JsonLd = {
    "@context": CONTEXT,
    "@type": "LearningResource",
    name: input.name,
    description: input.description,
    url: input.url,
    educationalLevel: input.educationalLevel,
    inLanguage: input.inLanguage,
    learningResourceType: "Topic overview",
    isPartOf: { "@type": "Course", name: input.course.name, url: input.course.url },
    publisher: input.publisher,
  };
  if (input.teaches.length > 0) out.teaches = input.teaches.slice(0, JSON_LD_LIST_LIMIT);
  return out;
}

export interface ArticleInput {
  headline: string;
  description: string;
  url: string;
  inLanguage: string;
  publisher: JsonLd;
  author: string | null;
  datePublished: Date | null;
  dateModified: Date | null;
}

export function articleJsonLd(input: ArticleInput): JsonLd {
  const out: JsonLd = {
    "@context": CONTEXT,
    "@type": "Article",
    headline: input.headline.slice(0, 110),
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: input.inLanguage,
    publisher: input.publisher,
    isAccessibleForFree: true,
    author: input.author ? { "@type": "Person", name: input.author } : input.publisher,
  };
  if (input.description) out.description = input.description;
  if (input.datePublished) out.datePublished = input.datePublished.toISOString();
  if (input.dateModified) out.dateModified = input.dateModified.toISOString();
  return out;
}

/**
 * Serialises JSON-LD for an inline `<script type="application/ld+json">`. `<`, `>` and `&` are escaped as unicode
 * escapes (still valid JSON) so text from the CMS can never close the script element or open a comment, and U+2028 /
 * U+2029 are escaped for old JavaScript parsers.
 */
export function serializeJsonLd(data: JsonLd | readonly JsonLd[]): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}
