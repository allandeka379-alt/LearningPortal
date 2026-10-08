import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { FAMILY_PATTERN, type SyllabusRef } from "./keys";
import {
  assessmentSourceSchema,
  conceptRegistrySchema,
  flashcardSourceSchema,
  lessonFrontMatterSchema,
  MAX_MEDIA_BYTES,
  mediaManifestSchema,
  questionSourceSchema,
  syllabusFileSchema,
  type AssessmentSource,
  type ConceptRegistryFile,
  type FlashcardSource,
  type LessonFrontMatter,
  type MediaEntry,
  type QuestionSource,
  type SyllabusFile,
} from "./schemas";
import type { Issue } from "./issues";

/**
 * Reads the version-controlled content tree (`content/`, docs/CONTENT_PIPELINE.md) from disk into typed records.
 * Every file is parsed independently and every array element is validated on its own, so one broken item never hides
 * the problems of its neighbours. Parse and schema problems are returned as issues; nothing throws for bad content.
 *
 * Layout (paths relative to the content root):
 *   concepts/<family>.json
 *   syllabi/<board>/<qualification>/<subject>/<versionLabel>.json
 *   subjects/<family>/lessons/**\/*.md
 *   subjects/<family>/questions/**\/*.json
 *   subjects/<family>/flashcards/**\/*.json
 *   subjects/<family>/assessments/**\/*.json
 *   subjects/<family>/media/media.json  (+ the image files it lists)
 *   README.md files anywhere (ignored)
 */

export interface Located {
  /** Path relative to the repository root, with forward slashes (e.g. content/subjects/mathematics-o/...). */
  file: string;
}

export interface LoadedRegistry extends Located {
  data: ConceptRegistryFile;
}

export interface LoadedSyllabus extends Located {
  ref: SyllabusRef;
  data: SyllabusFile;
}

export interface LoadedLesson extends Located {
  family: string;
  front: LessonFrontMatter;
  body: string;
  /** 1-based line of the first body line in the file (renderer line numbers are offset by this). */
  bodyLine: number;
}

export interface LoadedItem<T> extends Located {
  family: string;
  /** Position in the file's array (0-based). */
  index: number;
  data: T;
}

export interface LoadedMedia extends Located {
  family: string;
  entry: MediaEntry;
  /** Absolute path of the image file. */
  absPath: string;
  byteSize: number;
}

export interface ContentTree {
  /** Absolute path of the repository root the `file` paths are relative to. */
  repoRoot: string;
  /** Absolute path of the content root (normally <repo>/content). */
  contentRoot: string;
  registries: Map<string, LoadedRegistry>;
  syllabi: LoadedSyllabus[];
  lessons: LoadedLesson[];
  questions: LoadedItem<QuestionSource>[];
  flashcards: LoadedItem<FlashcardSource>[];
  assessments: LoadedItem<AssessmentSource>[];
  /** family → media file name → entry. */
  media: Map<string, Map<string, LoadedMedia>>;
  /** Families that have a subjects/<family> directory. */
  families: string[];
  issues: Issue[];
  /** Number of files read. */
  fileCount: number;
}

export interface LoadOptions {
  /** Limit items to these families (syllabi and registries of other families are still read for context). */
  families?: readonly string[];
}

function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

function listFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return (readdirSync(dir, { recursive: true }) as string[])
    .map((entry) => path.join(dir, entry))
    .filter((full) => statSync(full).isFile())
    .sort();
}

function readText(full: string): string {
  return readFileSync(full, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
}

function zodIssues(file: string, error: z.ZodError, base: { key?: string | undefined; index?: number }): Issue[] {
  return error.issues.map((issue) => ({
    file,
    ...(base.key ? { key: base.key } : {}),
    field: [...(base.index !== undefined ? [`[${base.index}]`] : []), ...issue.path.map(String)].join("."),
    severity: "error" as const,
    code: "schema",
    message: issue.message,
  }));
}

function parseJson(file: string, text: string, issues: Issue[]): unknown {
  let raw: unknown;
  try {
    raw = JSON.parse(text) as unknown;
  } catch (error) {
    issues.push({ file, severity: "error", code: "json", message: `Invalid JSON: ${error instanceof Error ? error.message : String(error)}` });
    return undefined;
  }
  issues.push(...jsonEscapeIssues(file, raw));
  return raw;
}

// ---------------------------------------------------------------------------------------------------------------------
// LaTeX written with ONE backslash inside a JSON string. JSON reads \b \f \n \r \t as escapes, so "\times" becomes a
// TAB followed by "imes", "\frac" a form feed + "rac", "\beta" a backspace + "eta", "\neq" a line break + "eq". KaTeX
// renders those as italic letters WITHOUT an error, so the renderer checks cannot catch them. (\( \$ \, \{ \sqrt \pi
// and \u… are invalid JSON escapes and already fail as "Invalid JSON".)
// ---------------------------------------------------------------------------------------------------------------------

/** Every control character except the line break (TAB, backspace, form feed, carriage return…). */
const CONTROL_CHARACTER = /[\u0000-\u0009\u000b-\u001f]/;
const CONTROL_NAMES: Record<number, string> = { 8: "backspace (\\b)", 9: "tab (\\t)", 12: "form feed (\\f)", 13: "carriage return (\\r)" };
/** LaTeX commands starting with n: a line break directly followed by the rest of one of these is almost surely "\n…". */
const N_COMMANDS = new Set([
  "ne", "neq", "nabla", "nu", "neg", "not", "notin", "ni", "nmid", "nleq", "ngeq", "nless", "ngtr", "newline", "nparallel",
  "nexists", "nsubseteq", "nsupseteq", "nrightarrow", "nleftarrow", "nLeftarrow", "nRightarrow", "natural", "nearrow",
  "nwarrow", "nsim", "ncong", "nleqslant", "ngeqslant", "nolimits", "nonumber",
]);

function excerpt(text: string, at: number, length: number): string {
  const visible = (s: string) => s.replace(/[\u0000-\u001f]/g, (c) => (c === "\n" ? "⏎" : c === "\t" ? "⇥" : "�"));
  return visible(text.slice(Math.max(0, at - 18), at + length + 18));
}

/** Why a JSON string value looks like it lost a LaTeX backslash, or null. */
export function jsonEscapeProblem(text: string): string | null {
  const advice = "In JSON every LaTeX backslash must be doubled: write \"\\\\times\", \"\\\\frac\", \"\\\\theta\", \"\\\\text\", \"\\\\neq\" (one backslash before b, f, n, r or t is a JSON escape).";
  const control = CONTROL_CHARACTER.exec(text);
  if (control) {
    const code = control[0].charCodeAt(0);
    const name = CONTROL_NAMES[code] ?? `control character U+${code.toString(16).padStart(4, "0").toUpperCase()}`;
    return `Contains a ${name} character, near "${excerpt(text, control.index, 1)}". ${advice}`;
  }
  for (const match of text.matchAll(/\n([A-Za-z]+)(.?)/g)) {
    const word = match[1] ?? "";
    // "\ne", "\ni", "\nu" are also how a line starting "e.g." or "i)" begins: only flag them before maths-like text.
    const shortWord = word.length === 1 && !/^(?:[\s\d{}\\$_^]|)$/.test(match[2] ?? "");
    if (N_COMMANDS.has(`n${word}`) && !shortWord) {
      return `A line break is followed by "${word}", near "${excerpt(text, match.index, word.length + 1)}": this was probably \\n${word} with one backslash. ${advice}`;
    }
  }
  return null;
}

/** json-escape errors for every string in a parsed JSON file (array files report the item key and index). */
export function jsonEscapeIssues(file: string, raw: unknown): Issue[] {
  const issues: Issue[] = [];
  const visit = (value: unknown, at: string[], key: string | undefined) => {
    if (typeof value === "string") {
      const problem = jsonEscapeProblem(value);
      if (problem) issues.push({ file, ...(key ? { key } : {}), field: at.join("."), severity: "error", code: "json-escape", message: problem });
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => visit(item, [...at, String(i)], key));
    } else if (typeof value === "object" && value !== null) {
      for (const [name, item] of Object.entries(value)) visit(item, [...at, name], key);
    }
  };
  if (Array.isArray(raw)) raw.forEach((item, index) => visit(item, [`[${index}]`], keyOf(item)));
  else visit(raw, [], keyOf(raw));
  return issues;
}

/** Splits a lesson file into its JSON front matter and Markdown body. */
export function splitFrontMatter(text: string): { json: string; body: string; bodyLine: number } | { problem: string } {
  const normalised = text.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  if (!normalised.startsWith("---\n")) return { problem: "A lesson file must start with a line containing only --- followed by its JSON front matter." };
  const end = normalised.indexOf("\n---\n", 3);
  const endAtEof = end === -1 && normalised.endsWith("\n---") ? normalised.length - 4 : -1;
  const close = end !== -1 ? end : endAtEof;
  if (close === -1) return { problem: "The JSON front matter must be closed by a line containing only ---." };
  const json = normalised.slice(4, close);
  const rest = normalised.slice(close + 5);
  const linesBefore = normalised.slice(0, close + 5).split("\n").length;
  const leading = /^\n*/.exec(rest)?.[0].length ?? 0;
  return { json, body: rest.slice(leading), bodyLine: linesBefore + leading };
}

function keyOf(value: unknown): string | undefined {
  return typeof value === "object" && value !== null && typeof (value as { key?: unknown }).key === "string" ? ((value as { key: string }).key) : undefined;
}

function loadArray<T>(
  file: string,
  family: string,
  text: string,
  schema: z.ZodType<T>,
  issues: Issue[],
  label: string,
): LoadedItem<T>[] {
  const raw = parseJson(file, text, issues);
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) {
    issues.push({ file, severity: "error", code: "schema", message: `A ${label} file is a JSON array of ${label}s.` });
    return [];
  }
  const out: LoadedItem<T>[] = [];
  raw.forEach((value, index) => {
    const parsed = schema.safeParse(value);
    if (parsed.success) out.push({ file, family, index, data: parsed.data });
    else issues.push(...zodIssues(file, parsed.error, { key: keyOf(value), index }));
  });
  return out;
}

/** Loads the content tree under `contentRoot` (default `<repoRoot>/content`). */
export function loadContentTree(repoRoot: string, options: LoadOptions = {}, contentRoot = path.join(repoRoot, "content")): ContentTree {
  const issues: Issue[] = [];
  const rel = (full: string) => toPosix(path.relative(repoRoot, full));
  const wanted = options.families && options.families.length > 0 ? new Set(options.families) : null;
  const tree: ContentTree = {
    repoRoot,
    contentRoot,
    registries: new Map(),
    syllabi: [],
    lessons: [],
    questions: [],
    flashcards: [],
    assessments: [],
    media: new Map(),
    families: [],
    issues,
    fileCount: 0,
  };
  if (!existsSync(contentRoot)) {
    issues.push({ file: rel(contentRoot), severity: "error", code: "layout", message: "The content directory does not exist." });
    return tree;
  }

  // Concept registries.
  for (const full of listFiles(path.join(contentRoot, "concepts"))) {
    const file = rel(full);
    tree.fileCount += 1;
    if (path.basename(full).toLowerCase() === "readme.md") continue;
    if (path.dirname(full) !== path.join(contentRoot, "concepts") || !full.endsWith(".json")) {
      issues.push({ file, severity: "warning", code: "layout", message: "Unexpected file: concept registries are content/concepts/<family>.json." });
      continue;
    }
    const raw = parseJson(file, readText(full), issues);
    if (raw === undefined) continue;
    const parsed = conceptRegistrySchema.safeParse(raw);
    if (!parsed.success) {
      issues.push(...zodIssues(file, parsed.error, {}));
      continue;
    }
    const expected = path.basename(full, ".json");
    if (parsed.data.family !== expected) {
      issues.push({ file, severity: "error", code: "layout", field: "family", message: `The family must match the file name ("${expected}").` });
      continue;
    }
    tree.registries.set(parsed.data.family, { file, data: parsed.data });
  }

  // Syllabus versions.
  for (const full of listFiles(path.join(contentRoot, "syllabi"))) {
    const file = rel(full);
    tree.fileCount += 1;
    if (path.basename(full).toLowerCase() === "readme.md") continue;
    const parts = toPosix(path.relative(path.join(contentRoot, "syllabi"), full)).split("/");
    if (parts.length !== 4 || !full.endsWith(".json")) {
      issues.push({ file, severity: "warning", code: "layout", message: "Unexpected file: syllabi are content/syllabi/<board>/<qualification>/<subject>/<version>.json." });
      continue;
    }
    const raw = parseJson(file, readText(full), issues);
    if (raw === undefined) continue;
    const parsed = syllabusFileSchema.safeParse(raw);
    if (!parsed.success) {
      issues.push(...zodIssues(file, parsed.error, {}));
      continue;
    }
    const [board, qualification, subject, name] = parts as [string, string, string, string];
    const data = parsed.data;
    const versionLabel = name.replace(/\.json$/, "");
    const mismatch = (
      [
        ["board", board, data.board],
        ["qualification", qualification, data.qualification],
        ["subject", subject, data.subject],
        ["versionLabel", versionLabel, data.versionLabel],
      ] as const
    ).filter(([, fromPath, fromFile]) => fromPath !== fromFile);
    if (mismatch.length > 0) {
      for (const [field, fromPath] of mismatch) {
        issues.push({ file, severity: "error", code: "layout", field, message: `Must match the file path ("${fromPath}").` });
      }
      continue;
    }
    tree.syllabi.push({ file, ref: { board, qualification, subject, versionLabel }, data });
  }

  // Families.
  const subjectsRoot = path.join(contentRoot, "subjects");
  const familyDirs = existsSync(subjectsRoot) ? readdirSync(subjectsRoot).filter((name) => statSync(path.join(subjectsRoot, name)).isDirectory()).sort() : [];
  for (const family of familyDirs) {
    if (!FAMILY_PATTERN.test(family)) {
      issues.push({ file: rel(path.join(subjectsRoot, family)), severity: "error", code: "layout", message: "Family directories are lower-case words joined by hyphens, e.g. mathematics-o." });
      continue;
    }
    tree.families.push(family);
    if (wanted && !wanted.has(family)) continue;
    const familyRoot = path.join(subjectsRoot, family);
    const mediaFiles = new Map<string, LoadedMedia>();
    tree.media.set(family, mediaFiles);

    for (const full of listFiles(familyRoot)) {
      const file = rel(full);
      const inner = toPosix(path.relative(familyRoot, full));
      const area = inner.split("/")[0];
      if (path.basename(full).toLowerCase() === "readme.md") continue;
      if (area === "media") continue; // read through the manifest below
      tree.fileCount += 1;
      if (area === "lessons" && full.endsWith(".md")) {
        const split = splitFrontMatter(readText(full));
        if ("problem" in split) {
          issues.push({ file, severity: "error", code: "front-matter", message: split.problem });
          continue;
        }
        const raw = parseJson(file, split.json, issues);
        if (raw === undefined) continue;
        const parsed = lessonFrontMatterSchema.safeParse(raw);
        if (!parsed.success) {
          issues.push(...zodIssues(file, parsed.error, { key: keyOf(raw) }));
          continue;
        }
        tree.lessons.push({ file, family, front: parsed.data, body: split.body, bodyLine: split.bodyLine });
      } else if (area === "questions" && full.endsWith(".json")) {
        tree.questions.push(...loadArray(file, family, readText(full), questionSourceSchema, issues, "question"));
      } else if (area === "flashcards" && full.endsWith(".json")) {
        tree.flashcards.push(...loadArray(file, family, readText(full), flashcardSourceSchema, issues, "flashcard"));
      } else if (area === "assessments" && full.endsWith(".json")) {
        tree.assessments.push(...loadArray(file, family, readText(full), assessmentSourceSchema, issues, "assessment"));
      } else {
        issues.push({ file, severity: "warning", code: "layout", message: "Unexpected file: use lessons/*.md, questions/*.json, flashcards/*.json, assessments/*.json or media/." });
      }
    }

    const manifestPath = path.join(familyRoot, "media", "media.json");
    if (existsSync(manifestPath)) {
      const file = rel(manifestPath);
      tree.fileCount += 1;
      const raw = parseJson(file, readText(manifestPath), issues);
      const parsed = raw === undefined ? null : mediaManifestSchema.safeParse(raw);
      if (parsed && !parsed.success) issues.push(...zodIssues(file, parsed.error, {}));
      for (const entry of parsed?.success ? parsed.data : []) {
        const absPath = path.join(familyRoot, "media", ...entry.file.split("/"));
        if (mediaFiles.has(entry.file)) {
          issues.push({ file, severity: "error", code: "duplicate-media", field: entry.file, message: `"${entry.file}" is listed twice.` });
          continue;
        }
        if (!existsSync(absPath)) {
          issues.push({ file, severity: "error", code: "media-missing", field: entry.file, message: `The image "${entry.file}" does not exist in media/.` });
          continue;
        }
        const byteSize = statSync(absPath).size;
        if (byteSize > MAX_MEDIA_BYTES) {
          issues.push({ file, severity: "error", code: "media-size", field: entry.file, message: `"${entry.file}" is ${Math.round(byteSize / 1024)} KB; keep images under ${MAX_MEDIA_BYTES / 1024} KB (students are on mobile data).` });
          continue;
        }
        mediaFiles.set(entry.file, { file: rel(absPath), family, entry, absPath, byteSize });
      }
    }
  }
  return tree;
}
