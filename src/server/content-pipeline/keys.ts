/**
 * Key grammar of the version-controlled content source (`content/`, docs/CONTENT_PIPELINE.md). Pure and isomorphic.
 *
 * - family        board-agnostic subject family, e.g. `mathematics-o`, `chemistry-a` (directory under content/subjects)
 * - concept key   canonical concept, e.g. `math.algebra.quadratic-equations` (dot-separated, at least two segments,
 *                 first segment = the registry's `prefix`); the tag that maps content onto every syllabus
 * - item key      stable key of a lesson / question / flashcard / assessment, unique within its family,
 *                 e.g. `quadratics.factorising.q01`. NEVER change a key once imported: the database row is found by it.
 * - node key      stable key of a syllabus topic node, unique within its syllabus file (Topic.contentKey)
 * - subject ref   `<board>/<qualification>/<subject>` (catalogue slugs), optionally `@<versionLabel>`
 *
 * Database references (externalRef) are namespaced so they never collide with spreadsheet imports:
 *   lessons / questions / flashcards  `content:<family>:<key>` (one row, tagged to every matching syllabus)
 *   assessments                       `content:<family>:<key>@<board>/<qualification>/<subject>/<version>` (one row per
 *                                     syllabus version, because blueprint rules name that version's topics)
 */

export const FAMILY_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
export const ITEM_KEY_PATTERN = /^[a-z0-9]+(?:[-_][a-z0-9]+)*(?:\.[a-z0-9]+(?:[-_][a-z0-9]+)*)*$/;
export const NODE_KEY_PATTERN = ITEM_KEY_PATTERN;
export const CONCEPT_KEY_PATTERN = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/;
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Version labels double as file names (`<versionLabel>.json`). */
export const VERSION_LABEL_PATTERN = /^[a-z0-9]+(?:[-.][a-z0-9]+)*$/;

export const MAX_ITEM_KEY_LENGTH = 100;
export const MAX_CONCEPT_KEY_LENGTH = 120;

/** Prefix of every database reference written by the pipeline. */
export const EXTERNAL_REF_PREFIX = "content:";

export function itemExternalRef(family: string, key: string): string {
  return `${EXTERNAL_REF_PREFIX}${family}:${key}`;
}

export function assessmentExternalRef(family: string, key: string, syllabus: SyllabusRef): string {
  return `${itemExternalRef(family, key)}@${syllabusPath(syllabus)}`;
}

/** `content:<family>:` — every pipeline row of a family starts with it. */
export function familyRefPrefix(family: string): string {
  return `${EXTERNAL_REF_PREFIX}${family}:`;
}

/** Parses a pipeline externalRef back into family and key (assessments: plus the syllabus path). */
export function parseExternalRef(ref: string): { family: string; key: string; syllabusPath: string | null } | null {
  if (!ref.startsWith(EXTERNAL_REF_PREFIX)) return null;
  const rest = ref.slice(EXTERNAL_REF_PREFIX.length);
  const colon = rest.indexOf(":");
  if (colon <= 0) return null;
  const family = rest.slice(0, colon);
  const tail = rest.slice(colon + 1);
  const at = tail.indexOf("@");
  return at === -1 ? { family, key: tail, syllabusPath: null } : { family, key: tail.slice(0, at), syllabusPath: tail.slice(at + 1) };
}

export interface SubjectRef {
  board: string;
  qualification: string;
  subject: string;
}

export interface SyllabusRef extends SubjectRef {
  versionLabel: string;
}

export function subjectPath(ref: SubjectRef): string {
  return `${ref.board}/${ref.qualification}/${ref.subject}`;
}

export function syllabusPath(ref: SyllabusRef): string {
  return `${subjectPath(ref)}/${ref.versionLabel}`;
}

/**
 * An `applies` selector: `zimsec`, `zimsec/o-level`, `zimsec/o-level/mathematics` or
 * `zimsec/o-level/mathematics@2024-2028`. Returns null when malformed.
 */
export interface SyllabusSelector {
  board: string;
  qualification: string | null;
  subject: string | null;
  versionLabel: string | null;
}

export function parseSelector(text: string): SyllabusSelector | null {
  const [path, version, extra] = text.split("@");
  if (path === undefined || extra !== undefined) return null;
  const segments = path.split("/");
  if (segments.length < 1 || segments.length > 3 || segments.some((s) => !SLUG_PATTERN.test(s))) return null;
  if (version !== undefined && (segments.length !== 3 || !VERSION_LABEL_PATTERN.test(version))) return null;
  return { board: segments[0] as string, qualification: segments[1] ?? null, subject: segments[2] ?? null, versionLabel: version ?? null };
}

export function selectorMatches(selector: SyllabusSelector, ref: SyllabusRef): boolean {
  return (
    selector.board === ref.board &&
    (selector.qualification === null || selector.qualification === ref.qualification) &&
    (selector.subject === null || selector.subject === ref.subject) &&
    (selector.versionLabel === null || selector.versionLabel === ref.versionLabel)
  );
}

/** `zimsec/o-level/mathematics:A3.2` → subject ref + objective code. */
export function parseObjectiveRef(text: string): { subject: SubjectRef; code: string } | null {
  const colon = text.lastIndexOf(":");
  if (colon <= 0) return null;
  const segments = text.slice(0, colon).split("/");
  const code = text.slice(colon + 1).trim();
  if (segments.length !== 3 || segments.some((s) => !SLUG_PATTERN.test(s)) || code === "" || code.length > 32) return null;
  return { subject: { board: segments[0] as string, qualification: segments[1] as string, subject: segments[2] as string }, code };
}

/** First segment of a concept key (must equal the registry prefix). */
export function conceptPrefix(conceptKey: string): string {
  return conceptKey.split(".")[0] ?? "";
}

/** URL slug from a title (same rules as the CMS: ASCII, lower-case, single hyphens). */
export function slugify(input: string, maxLength = 80): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= maxLength) return slug;
  const cut = slug.slice(0, maxLength);
  const lastHyphen = cut.lastIndexOf("-");
  return (lastHyphen > maxLength / 2 ? cut.slice(0, lastHyphen) : cut).replace(/-+$/g, "");
}

/**
 * Deterministic UUID-shaped id derived from a string (FNV-1a based, version nibble 8 = "custom"). Used for placeholder
 * ids in validation (structured part ids, media placeholders) where no database row exists yet. Not a security
 * primitive.
 */
export function stableUuid(seed: string): string {
  const parts: string[] = [];
  for (let round = 0; round < 4; round += 1) {
    let hash = 0x811c9dc5 ^ round;
    for (let i = 0; i < seed.length; i += 1) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    parts.push(hash.toString(16).padStart(8, "0"));
  }
  const hex = parts.join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-8${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}
