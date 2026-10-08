/**
 * Public SEO curriculum URLs (§44, ARCHITECTURE §3.3 "Public SEO curriculum pages"). Pure: no I/O, safe to unit test.
 *
 *   /[board]                                          board: qualifications offered
 *   /[board]/[qualification]                          qualification: subjects by category
 *   /[board]/[qualification]/[subject]                subject: syllabus outline, topics, exam sessions, samples
 *   /[board]/[qualification]/[subject]/[topic]        topic: summary, objectives, free previews, sample question
 *   /[board]/guides/[slug]                            board-level public guide (Lesson with accessTier PUBLIC)
 *   /[board]/[qualification]/guides/[slug]            qualification-level public guide
 *   /[board]/[qualification]/[subject]/guides/[slug]  subject guide (the lesson's HOME subject)
 *   /guides/[slug]                                    general guide (no board, qualification or subject)
 *
 * How the `(public)/[board]` route group avoids conflicts: Next.js matches static segments before dynamic ones, so
 * `/app`, `/pricing`, `/login`, ... always reach their own routes. A path BELOW a static route that has no matching
 * child (e.g. `/pricing/anything`, `/app/x/y/z`) falls through to the dynamic `[board]` tree, so every page here first
 * checks {@link isPublicBoardSlug} and answers 404 for reserved first segments. `routing.test.ts` scans `src/app` and
 * fails when a top-level route is added without being reserved here.
 */
import { RESERVED_TOP_LEVEL_SLUGS, isValidCurriculumSlug } from "@/server/curriculum/core";

/** Static segment of the guide routes; it shadows a qualification or subject slug "guides" (never use that slug). */
export const GUIDES_SEGMENT = "guides";

/**
 * First URL segments a board slug may never take on public pages: every top-level app route (the curriculum list in
 * `RESERVED_TOP_LEVEL_SLUGS`) plus routes added since (`/s` share pages, `/r` referral landing, `/billing`,
 * `/exam-countdown`, `/subjects`) and metadata/infrastructure names. Keep in sync with `src/app` (enforced by
 * `routing.test.ts`).
 */
export const PUBLIC_RESERVED_SLUGS: ReadonlySet<string> = new Set([
  ...RESERVED_TOP_LEVEL_SLUGS,
  "s",
  "r",
  "billing",
  "exam-countdown",
  GUIDES_SEGMENT,
  "search",
  "subjects",
  "opengraph-image",
  "twitter-image",
  "sitemap",
  "sitemap.xml",
  "robots",
  "manifest",
  "icons",
  "media",
  "auth",
  "logout",
  "terms",
  "privacy",
  "contact",
  "help",
  "blog",
]);

/** True when `slug` may be the first segment of a public curriculum URL (well formed, not a reserved route). */
export function isPublicBoardSlug(slug: string): boolean {
  return isValidCurriculumSlug(slug) && !PUBLIC_RESERVED_SLUGS.has(slug);
}

/** True when `slug` may be a qualification / subject / topic segment (well formed and not the guides segment). */
export function isPublicSegmentSlug(slug: string): boolean {
  return isValidCurriculumSlug(slug) && slug !== GUIDES_SEGMENT;
}

/** True when `slug` is a well-formed guide (lesson) slug. */
export function isGuideSlug(slug: string): boolean {
  return isValidCurriculumSlug(slug);
}

const seg = (value: string): string => encodeURIComponent(value);

export function boardPath(board: string): string {
  return `/${seg(board)}`;
}

export function qualificationPath(board: string, qualification: string): string {
  return `${boardPath(board)}/${seg(qualification)}`;
}

export function subjectPath(board: string, qualification: string, subject: string): string {
  return `${qualificationPath(board, qualification)}/${seg(subject)}`;
}

export function topicPath(board: string, qualification: string, subject: string, topic: string): string {
  return `${subjectPath(board, qualification, subject)}/${seg(topic)}`;
}

/**
 * Where a public guide lives: under its home subject, else its qualification, else its board, else (no scope at all,
 * e.g. a general study-skills article) the top-level `/guides/[slug]`.
 */
export type GuideScope =
  | { kind: "subject"; board: string; qualification: string; subject: string }
  | { kind: "qualification"; board: string; qualification: string }
  | { kind: "board"; board: string }
  | { kind: "general" };

export function guidePath(scope: GuideScope, slug: string): string {
  const base =
    scope.kind === "subject"
      ? subjectPath(scope.board, scope.qualification, scope.subject)
      : scope.kind === "qualification"
        ? qualificationPath(scope.board, scope.qualification)
        : scope.kind === "board"
          ? boardPath(scope.board)
          : "";
  return `${base}/${GUIDES_SEGMENT}/${seg(slug)}`;
}

/** Absolute URL on the public origin (`base` without a trailing slash, e.g. `getEnv().APP_URL`). */
export function absoluteUrl(base: string, path: string): string {
  const origin = base.replace(/\/+$/, "");
  return path === "/" ? `${origin}/` : `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
