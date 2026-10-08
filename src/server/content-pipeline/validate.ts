import path from "node:path";
import katex from "katex";
import { blueprintFeasibility, computeTotals, tiersUpTo, type RuleDemand } from "@/server/cms/assessments/core";
import { DAILY_ACCESS_TIERS, DAILY_DIFFICULTY_MAX, DAILY_DIFFICULTY_MIN, DAILY_QUESTION_TYPES } from "@/server/cms/daily-questions/core";
import { PIPELINE_VERSION, type AssetResolver } from "@/server/content/render";
import { CheckCache, CHECKS_VERSION } from "./cache";
import { countErrors, issueSort, type Issue } from "./issues";
import { flashcardChecks, lessonChecks, questionChecks, type CheckContext, type ItemIssue } from "./item-checks";
import { slugify as lessonSlugify } from "@/server/cms/lessons/core";
import { conceptPrefix, stableUuid } from "./keys";
import { loadContentTree, type ContentTree, type LoadedItem } from "./load";
import { defaultMarkingMode, mediaReferences, questionAccessTier, questionMediaFiles, type MediaIdResolver } from "./question-model";
import { resolveAssessmentTarget } from "./assessment-plan";
import { assessmentTargets, buildSyllabusModel, homeSubjectPath, isWithin, planTags, resolveObjectives, syllabiForFamily, type SyllabusModel, type TagPlan } from "./resolve";
import type { AssessmentSource, QuestionSource } from "./schemas";

/**
 * `npm run content:validate` (docs/CONTENT_PIPELINE.md "Validation"): checks the whole content source before anything
 * touches a database.
 *
 * Cheap checks (always, for every loaded item): file layout and schemas, unique keys, concept and objective references,
 * that every item lands on at least one syllabus topic, daily-question eligibility, lesson slugs, assessments
 * satisfiable by the bank (blueprint feasibility with the same rules as the assessment builder).
 * Expensive checks (selected items, cached per item hash): every Markdown field rendered by the real content pipeline
 * with NO warnings and no KaTeX errors; every automatically marked question's modelResponse scores full marks and each
 * wrongResponse scores less with the real marking engine; MCQ / structured / essay rules.
 */

export interface ValidateOptions {
  repoRoot: string;
  /** Default `<repoRoot>/content`. */
  contentRoot?: string;
  /** Families (e.g. `mathematics-o`) and/or paths relative to the repository root to validate. Default: everything. */
  targets?: readonly string[];
  /** Directory of the check cache; null disables it. Default `<repoRoot>/node_modules/.cache/content-pipeline`. */
  cacheDir?: string | null;
}

export interface FamilySummary {
  family: string;
  lessons: number;
  questions: number;
  questionsByType: Record<string, number>;
  flashcards: number;
  assessments: number;
  concepts: number;
  /** Concepts with at least one lesson, question or flashcard. */
  conceptsWithContent: number;
  /** Concepts covered by at least one syllabus node. */
  conceptsInSyllabi: number;
}

export interface SyllabusSummary {
  path: string;
  family: string;
  topics: number;
  objectives: number;
  /** Distinct concepts the version's nodes cover. */
  concepts: number;
  /** Of those, concepts that have content. */
  conceptsWithContent: number;
}

export interface ValidationResult {
  tree: ContentTree;
  models: SyllabusModel[];
  /** Issues of the selected files, sorted. */
  issues: Issue[];
  errorCount: number;
  warningCount: number;
  families: FamilySummary[];
  syllabi: SyllabusSummary[];
  /** Items whose expensive checks ran (or came from the cache). */
  checkedItems: number;
  cachedItems: number;
  durationMs: number;
}

/**
 * What to validate: everything, or the union of named families and paths. `loadFamilies` limits loading to the
 * families involved when every target lies inside a family (syllabi and registries are always read).
 */
interface Selection {
  all: boolean;
  familyNames: Set<string>;
  paths: string[];
  /** Families whose summaries are shown (empty with `all`). */
  summaryFamilies: Set<string>;
  loadFamilies: string[] | undefined;
}

const FAMILY_TARGET = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

function toPosix(p: string): string {
  return p.replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/+$/, "");
}

function resolveSelection(repoRoot: string, contentRoot: string, targets: readonly string[] | undefined): Selection {
  const everything: Selection = { all: true, familyNames: new Set(), paths: [], summaryFamilies: new Set(), loadFamilies: undefined };
  if (!targets || targets.length === 0) return everything;
  const contentRel = toPosix(path.relative(repoRoot, contentRoot));
  const familyNames = new Set<string>();
  const paths: string[] = [];
  for (const raw of targets) {
    const target = toPosix(path.isAbsolute(raw) ? path.relative(repoRoot, raw) : raw);
    if (target === contentRel || target === "") return everything;
    if (FAMILY_TARGET.test(target)) familyNames.add(target);
    else paths.push(target);
  }
  const subjectsPrefix = `${contentRel}/subjects/`;
  const pathFamilies = paths.flatMap((p) => (p.startsWith(subjectsPrefix) ? [p.slice(subjectsPrefix.length).split("/")[0] as string] : []));
  const allInFamilies = paths.every((p) => p.startsWith(subjectsPrefix));
  const summaryFamilies = new Set([...familyNames, ...pathFamilies]);
  return { all: false, familyNames, paths, summaryFamilies, loadFamilies: allInFamilies ? [...summaryFamilies] : undefined };
}

/** The validator's fingerprint: cached results are only reused with the same checks, renderer and KaTeX. */
export function checksFingerprint(): string {
  return `${CHECKS_VERSION}|${PIPELINE_VERSION}|${katex.version}`;
}

/** Runs every check; never throws for bad content. */
export function validateContent(options: ValidateOptions): ValidationResult {
  const started = Date.now();
  const repoRoot = path.resolve(options.repoRoot);
  const contentRoot = options.contentRoot ? path.resolve(options.contentRoot) : path.join(repoRoot, "content");
  const selection = resolveSelection(repoRoot, contentRoot, options.targets);
  const tree = loadContentTree(repoRoot, selection.loadFamilies ? { families: selection.loadFamilies } : {}, contentRoot);
  const issues: Issue[] = [...tree.issues];
  const contentRel = toPosix(path.relative(repoRoot, contentRoot));

  for (const family of selection.familyNames) {
    if (!tree.families.includes(family) && !tree.registries.has(family)) {
      issues.push({ file: `${contentRel}/subjects/${family}`, severity: "error", code: "family-unknown", message: `There is no content family "${family}".` });
    }
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Syllabi and concept registries
  // ---------------------------------------------------------------------------------------------------------------
  const models: SyllabusModel[] = [];
  for (const loaded of tree.syllabi) {
    const built = buildSyllabusModel(loaded);
    models.push(built.model);
    issues.push(...built.issues);
  }
  models.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  const conceptSets = new Map<string, Set<string>>();
  for (const [family, registry] of tree.registries) {
    const keys = new Set<string>();
    for (const concept of registry.data.concepts) {
      if (keys.has(concept.key)) issues.push({ file: registry.file, key: concept.key, severity: "error", code: "duplicate-concept", message: `Concept "${concept.key}" is listed twice.` });
      if (conceptPrefix(concept.key) !== registry.data.prefix) {
        issues.push({ file: registry.file, key: concept.key, severity: "error", code: "concept-prefix", message: `Concept keys of ${family} start with "${registry.data.prefix}.".` });
      }
      keys.add(concept.key);
    }
    conceptSets.set(family, keys);
    const subjects = new Set<string>();
    for (const subject of registry.data.subjects) {
      if (subjects.has(subject)) issues.push({ file: registry.file, field: "subjects", severity: "error", code: "duplicate-subject", message: `${subject} is listed twice.` });
      subjects.add(subject);
      if (!models.some((m) => m.family === family && m.subjectPath === subject)) {
        issues.push({ file: registry.file, field: "subjects", severity: "warning", code: "subject-without-syllabus", message: `No syllabus file exists yet for ${subject}.` });
      }
    }
  }
  for (const model of models) {
    const registry = tree.registries.get(model.family);
    if (!registry) {
      issues.push({ file: model.file, field: "family", severity: "error", code: "family-unknown", message: `There is no concept registry content/concepts/${model.family}.json.` });
      continue;
    }
    if (!registry.data.subjects.includes(model.subjectPath)) {
      issues.push({ file: model.file, field: "family", severity: "error", code: "subject-not-in-family", message: `${model.subjectPath} is not listed in the subjects of ${registry.file}.` });
    }
    for (const other of model.conceptFamilies) {
      if (other === model.family) {
        issues.push({ file: model.file, field: "conceptFamilies", severity: "warning", code: "concept-family", message: `${other} is this syllabus's own family: remove it from conceptFamilies.` });
      } else if (!tree.registries.has(other)) {
        issues.push({ file: model.file, field: "conceptFamilies", severity: "error", code: "family-unknown", message: `There is no concept registry content/concepts/${other}.json.` });
      }
    }
    // A syllabus may cover the concepts of its own family and of the families it borrows from (conceptFamilies).
    const known = new Set([model.family, ...model.conceptFamilies].flatMap((family) => [...(conceptSets.get(family) ?? [])]));
    for (const node of model.nodes) {
      for (const concept of node.covers) {
        if (!known.has(concept)) issues.push({ file: model.file, key: node.key, field: "covers", severity: "error", code: "concept-unknown", message: `Unknown concept "${concept}" (add it to ${registry.file}).` });
      }
    }
  }
  for (const family of tree.families) {
    if (!tree.registries.has(family)) {
      issues.push({ file: `${contentRel}/subjects/${family}`, severity: "error", code: "family-unknown", message: `Add the concept registry content/concepts/${family}.json for this family.` });
    }
  }
  // Overlapping versions of one subject (enrolment chooses by exam date).
  const bySubject = new Map<string, SyllabusModel[]>();
  for (const model of models) bySubject.set(model.subjectPath, [...(bySubject.get(model.subjectPath) ?? []), model]);
  for (const versions of bySubject.values()) {
    const sorted = [...versions].sort((a, b) => (a.data.effectiveFrom < b.data.effectiveFrom ? -1 : 1));
    for (let i = 1; i < sorted.length; i += 1) {
      const prev = sorted[i - 1] as SyllabusModel;
      const next = sorted[i] as SyllabusModel;
      if (prev.data.effectiveTo === null || prev.data.effectiveTo >= next.data.effectiveFrom) {
        issues.push({ file: next.file, field: "effectiveFrom", severity: "warning", code: "version-overlap", message: `Overlaps ${prev.path}: give the earlier version an effectiveTo before this effectiveFrom.` });
      }
    }
    if (sorted.filter((m) => m.data.publishAs === "CURRENT").length > 1) {
      issues.push({ file: (sorted[sorted.length - 1] as SyllabusModel).file, field: "publishAs", severity: "warning", code: "version-current", message: "Several versions of this subject publish as CURRENT: the last one published becomes current." });
    }
  }

  const familyModels = (family: string) => syllabiForFamily(family, models);

  // ---------------------------------------------------------------------------------------------------------------
  // Media
  // ---------------------------------------------------------------------------------------------------------------
  const mediaResolvers = new Map<string, { resolveMedia: MediaIdResolver; resolveAsset: AssetResolver; state: (files: readonly string[]) => unknown[] }>();
  const resolversFor = (family: string) => {
    const existing = mediaResolvers.get(family);
    if (existing) return existing;
    const media = tree.media.get(family) ?? new Map();
    const byId = new Map<string, { file: string; alt: string }>();
    for (const [file, loaded] of media) byId.set(stableUuid(`media:${family}:${file}`), { file, alt: loaded.entry.alt });
    const created = {
      resolveMedia: (file: string) => (media.has(file) ? stableUuid(`media:${family}:${file}`) : null),
      resolveAsset: (id: string) => {
        const hit = byId.get(id);
        return hit ? { src: `/content-media/${hit.file}`, alt: hit.alt } : null;
      },
      state: (files: readonly string[]) => files.map((file) => [file, media.get(file)?.entry.alt ?? null]),
    };
    mediaResolvers.set(family, created);
    return created;
  };

  // ---------------------------------------------------------------------------------------------------------------
  // Items: cheap checks
  // ---------------------------------------------------------------------------------------------------------------
  const isSelected = (file: string, family: string | null): boolean =>
    selection.all ||
    selection.paths.some((p) => file === p || file.startsWith(`${p}/`)) ||
    (family !== null && selection.familyNames.has(family));

  const plansOf = new Map<string, TagPlan[]>();
  const conceptsWithContent = new Map<string, Set<string>>();
  const noteContent = (family: string, concepts: readonly string[]) => {
    const set = conceptsWithContent.get(family) ?? new Set<string>();
    for (const concept of concepts) set.add(concept);
    conceptsWithContent.set(family, set);
  };

  const commonChecks = (
    kind: "lesson" | "question" | "flashcard",
    file: string,
    family: string,
    key: string,
    concepts: readonly string[],
    applies: readonly string[] | undefined,
    objectives: readonly string[],
  ): TagPlan[] => {
    const known = conceptSets.get(family);
    if (!known) {
      issues.push({ file, key, severity: "error", code: "family-unknown", message: `There is no concept registry for ${family}.` });
      return [];
    }
    for (const concept of concepts) {
      if (!known.has(concept)) issues.push({ file, key, field: "concepts", severity: "error", code: "concept-unknown", message: `Unknown concept "${concept}" (add it to content/concepts/${family}.json).` });
    }
    if (new Set(concepts).size !== concepts.length) issues.push({ file, key, field: "concepts", severity: "warning", code: "duplicate-concept", message: "A concept is listed twice." });
    const plans = planTags(concepts, applies, familyModels(family));
    if (plans.length === 0) {
      issues.push({
        file,
        key,
        field: "concepts",
        severity: "error",
        code: "untagged",
        message: `This ${kind} would not appear in any syllabus: no topic of ${applies ? `the syllabi matching ${applies.join(", ")}` : `the ${family} syllabi`} covers ${concepts.join(", ")}.`,
      });
    }
    const resolved = resolveObjectives(objectives, plans);
    for (const problem of resolved.problems) issues.push({ file, key, field: "objectives", severity: "error", code: "objective", message: problem });
    noteContent(family, concepts);
    return plans;
  };

  const seenKeys = new Map<string, string>();
  const uniqueKey = (kind: string, family: string, key: string, file: string) => {
    const id = `${kind}\u0000${family}\u0000${key}`;
    const other = seenKeys.get(id);
    if (other !== undefined) issues.push({ file, key, severity: "error", code: "duplicate-key", message: `The ${kind} key "${key}" is also used in ${other}. Keys must be unique within ${family}.` });
    else seenKeys.set(id, file);
  };

  const lessonSlugs = new Map<string, string>();
  for (const lesson of tree.lessons) {
    const { front, file, family } = lesson;
    uniqueKey("lesson", family, front.key, file);
    const plans = commonChecks("lesson", file, family, front.key, front.concepts, front.applies, front.objectives);
    plansOf.set(`lesson:${family}:${front.key}`, plans);
    const home = homeSubjectPath(plans, tree.registries.get(family));
    const slug = front.slug ?? lessonSlugify(front.title);
    const slugKey = `${home}\u0000${slug}`;
    const clash = lessonSlugs.get(slugKey);
    if (home && clash) issues.push({ file, key: front.key, field: "slug", severity: "error", code: "duplicate-slug", message: `Lesson slug "${slug}" is also used by ${clash} in ${home}: set a distinct "slug".` });
    else if (home) lessonSlugs.set(slugKey, front.key);
    for (const ref of mediaReferences(lesson.body)) {
      if (!tree.media.get(family)?.has(ref)) issues.push({ file, key: front.key, field: "body", severity: "error", code: "media-unknown", message: `media:${ref} is not listed in content/subjects/${family}/media/media.json.` });
    }
  }

  const questionsByFamily = new Map<string, LoadedItem<QuestionSource>[]>();
  for (const item of tree.questions) {
    const q = item.data;
    uniqueKey("question", item.family, q.key, item.file);
    questionsByFamily.set(item.family, [...(questionsByFamily.get(item.family) ?? []), item]);
    const plans = commonChecks("question", item.file, item.family, q.key, q.concepts, q.applies, q.objectives);
    plansOf.set(`question:${item.family}:${q.key}`, plans);
    for (const ref of questionMediaFiles(q)) {
      if (!tree.media.get(item.family)?.has(ref.file)) issues.push({ file: item.file, key: q.key, field: ref.field, severity: "error", code: "media-unknown", message: `media "${ref.file}" is not listed in content/subjects/${item.family}/media/media.json.` });
    }
    if (q.dailyEligible) {
      const mode = q.markingMode ?? defaultMarkingMode(q.type);
      const problems: string[] = [];
      if (!(DAILY_QUESTION_TYPES as readonly string[]).includes(q.type)) problems.push(`type must be one of ${DAILY_QUESTION_TYPES.join(", ")}`);
      if (mode !== "AUTO") problems.push("it must be marked automatically");
      if (q.difficulty < DAILY_DIFFICULTY_MIN || q.difficulty > DAILY_DIFFICULTY_MAX) problems.push(`difficulty must be ${DAILY_DIFFICULTY_MIN}-${DAILY_DIFFICULTY_MAX}`);
      if (!(DAILY_ACCESS_TIERS as readonly string[]).includes(questionAccessTier(q))) problems.push(`access must be ${DAILY_ACCESS_TIERS.join(" or ")}`);
      if (problems.length > 0) issues.push({ file: item.file, key: q.key, field: "dailyEligible", severity: "error", code: "daily", message: `Not usable as a daily question: ${problems.join("; ")}.` });
      if (q.stem.length > 600) issues.push({ file: item.file, key: q.key, field: "stem", severity: "warning", code: "daily", message: "Daily questions should be short (they are also sent as a message)." });
    }
  }

  for (const item of tree.flashcards) {
    uniqueKey("flashcard", item.family, item.data.key, item.file);
    plansOf.set(`flashcard:${item.family}:${item.data.key}`, commonChecks("flashcard", item.file, item.family, item.data.key, item.data.concepts, item.data.applies, []));
    for (const field of ["front", "back", "notes"] as const) {
      for (const ref of mediaReferences(item.data[field])) {
        if (!tree.media.get(item.family)?.has(ref)) issues.push({ file: item.file, key: item.data.key, field, severity: "error", code: "media-unknown", message: `media:${ref} is not listed in the family's media.json.` });
      }
    }
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Assessments (blueprint feasibility per target syllabus version)
  // ---------------------------------------------------------------------------------------------------------------
  for (const item of tree.assessments) {
    uniqueKey("assessment", item.family, item.data.key, item.file);
    issues.push(...assessmentIssues(item, familyModels(item.family), questionsByFamily, plansOf, conceptSets.get(item.family) ?? new Set()));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Expensive checks (selected items, cached)
  // ---------------------------------------------------------------------------------------------------------------
  const fingerprint = checksFingerprint();
  const cacheDir = options.cacheDir === undefined ? path.join(repoRoot, "node_modules", ".cache", "content-pipeline") : options.cacheDir;
  const cache = CheckCache.open(cacheDir, fingerprint);
  let checkedItems = 0;
  let cachedItems = 0;
  const run = (file: string, family: string, kind: string, source: unknown, mediaFiles: readonly string[], check: (ctx: CheckContext) => ItemIssue[], key: string) => {
    if (!isSelected(file, family)) return;
    checkedItems += 1;
    const resolvers = resolversFor(family);
    const hash = CheckCache.hash([kind, family, source, resolvers.state(mediaFiles)]);
    let result = cache.get(hash);
    if (result) cachedItems += 1;
    else {
      result = check({ key, resolveMedia: resolvers.resolveMedia, resolveAsset: resolvers.resolveAsset });
      cache.set(hash, result);
    }
    for (const issue of result) issues.push({ ...issue, file });
  };
  for (const lesson of tree.lessons) {
    run(lesson.file, lesson.family, "lesson", [lesson.front, lesson.body, lesson.bodyLine], mediaReferences(lesson.body), (ctx) => lessonChecks(lesson.front, lesson.body, lesson.bodyLine, ctx), lesson.front.key);
  }
  for (const item of tree.questions) {
    run(item.file, item.family, "question", item.data, questionMediaFiles(item.data).map((m) => m.file), (ctx) => questionChecks(item.data, ctx), item.data.key);
  }
  for (const item of tree.flashcards) {
    const files = [item.data.front, item.data.back, item.data.notes].flatMap((text) => mediaReferences(text));
    run(item.file, item.family, "flashcard", item.data, files, (ctx) => flashcardChecks(item.data, ctx), item.data.key);
  }
  cache.save(fingerprint, selection.all);

  // ---------------------------------------------------------------------------------------------------------------
  // Report
  // ---------------------------------------------------------------------------------------------------------------
  const syllabusFamily = new Map(models.map((m) => [m.file, m.family]));
  const registryFamily = new Map([...tree.registries].map(([family, registry]) => [registry.file, family]));
  const familyOfFile = (file: string): string | null => {
    const match = /\/subjects\/([^/]+)(?:\/|$)/.exec(`/${file}`);
    return match?.[1] ?? syllabusFamily.get(file) ?? registryFamily.get(file) ?? null;
  };
  const reported = issues.filter((issue) => isSelected(issue.file, familyOfFile(issue.file))).sort(issueSort);

  const families: FamilySummary[] = [];
  const inSummary = (family: string) => selection.all || selection.summaryFamilies.size === 0 || selection.summaryFamilies.has(family);
  const familyNames = [...new Set([...tree.families, ...tree.registries.keys()])].filter(inSummary).sort();
  for (const family of familyNames) {
    const questions = tree.questions.filter((q) => q.family === family);
    const byType: Record<string, number> = {};
    for (const q of questions) byType[q.data.type] = (byType[q.data.type] ?? 0) + 1;
    const concepts = conceptSets.get(family) ?? new Set<string>();
    const inSyllabi = new Set(familyModels(family).flatMap((m) => [...m.conceptNodes.keys()]));
    families.push({
      family,
      lessons: tree.lessons.filter((l) => l.family === family).length,
      questions: questions.length,
      questionsByType: byType,
      flashcards: tree.flashcards.filter((f) => f.family === family).length,
      assessments: tree.assessments.filter((a) => a.family === family).length,
      concepts: concepts.size,
      conceptsWithContent: [...(conceptsWithContent.get(family) ?? [])].filter((c) => concepts.has(c)).length,
      conceptsInSyllabi: [...concepts].filter((c) => inSyllabi.has(c)).length,
    });
    for (const concept of concepts) {
      if (!inSyllabi.has(concept) && tree.registries.get(family)) {
        const registry = tree.registries.get(family);
        if (registry && isSelected(registry.file, family)) {
          reported.push({ file: registry.file, key: concept, severity: "warning", code: "concept-uncovered", message: "No syllabus node covers this concept, so its content would not be tagged anywhere." });
        }
      }
    }
  }
  const syllabi: SyllabusSummary[] = models
    .filter((m) => inSummary(m.family))
    .map((m) => {
      const withContent = new Set([m.family, ...m.conceptFamilies].flatMap((family) => [...(conceptsWithContent.get(family) ?? [])]));
      const concepts = [...m.conceptNodes.keys()];
      return {
        path: m.path,
        family: m.family,
        topics: m.nodes.length,
        objectives: m.nodes.reduce((sum, node) => sum + node.objectives.length, 0),
        concepts: concepts.length,
        conceptsWithContent: concepts.filter((c) => withContent.has(c)).length,
      };
    });

  return {
    tree,
    models,
    issues: reported,
    errorCount: countErrors(reported),
    warningCount: reported.length - countErrors(reported),
    families,
    syllabi,
    checkedItems,
    cachedItems,
    durationMs: Date.now() - started,
  };
}

// =====================================================================================================================
// Assessments
// =====================================================================================================================

function assessmentIssues(
  item: LoadedItem<AssessmentSource>,
  syllabi: readonly SyllabusModel[],
  questionsByFamily: ReadonlyMap<string, readonly LoadedItem<QuestionSource>[]>,
  plansOf: ReadonlyMap<string, TagPlan[]>,
  concepts: ReadonlySet<string>,
): Issue[] {
  const questions = questionsByFamily.get(item.family) ?? [];
  const a = item.data;
  const issues: Issue[] = [];
  const add = (field: string | undefined, message: string, severity: "error" | "warning" = "error", code = "assessment") =>
    issues.push({ file: item.file, key: a.key, ...(field ? { field } : {}), severity, code, message });

  const needsSingle = a.sections.some((s) => s.component || s.rules.some((r) => r.topics)) || (a.scope?.topics?.length ?? 0) > 0;
  if (needsSingle && !a.syllabus) add("syllabus", "Papers (component) and topic-key rules/scope need one target syllabus: set \"syllabus\".");
  if (a.syllabus && a.applies) add("applies", "Use either \"syllabus\" or \"applies\", not both.");
  const allConcepts = [...(a.scope?.concepts ?? []), ...a.sections.flatMap((s) => s.rules.flatMap((r) => r.concepts ?? []))];
  for (const concept of allConcepts) if (!concepts.has(concept)) add("concepts", `Unknown concept "${concept}".`, "error", "concept-unknown");
  const hasRules = a.sections.some((s) => s.rules.length > 0);
  const assembly = a.assembly ?? (hasRules ? "BLUEPRINT" : "FIXED");
  if (assembly === "FIXED" && hasRules) add("assembly", "Fixed assessments use fixed items only: remove the rules or use BLUEPRINT.");
  if (assembly === "FIXED" && !a.sections.some((s) => s.items.length > 0)) add("sections", "A fixed assessment needs at least one question item.");
  if (assembly === "ADAPTIVE" && a.allowNavigation) add("allowNavigation", "Adaptive tests cannot allow free navigation.");
  if (a.timeLimitMinutes === null && (a.kind === "TOPIC_TEST" || a.kind === "MOCK_EXAM" || a.kind === "TIMED_EXAM")) add("timeLimitMinutes", "Give a time limit for tests and mock exams.", "warning");
  a.sections.forEach((section, s) => {
    if (section.answerCount !== undefined && section.marks === undefined) add(`sections.${s}.marks`, "An “answer any N” section states its total marks.");
    const available = section.items.length + section.rules.reduce((sum, rule) => sum + rule.count, 0);
    if (section.answerCount !== undefined && section.answerCount > available) add(`sections.${s}.answerCount`, `The section has only ${available} questions to choose from.`);
    const seen = new Set<string>();
    for (const it of section.items) {
      if (seen.has(it.question)) add(`sections.${s}.items`, `Question "${it.question}" is listed twice.`);
      seen.add(it.question);
    }
  });

  const targets = assessmentTargets(item.family, a, syllabi);
  if (targets.length === 0) {
    add(a.syllabus ? "syllabus" : "applies", `No syllabus file of ${item.family} matches ${a.syllabus ?? a.applies?.join(", ") ?? "this family"}.`);
    return issues;
  }
  const byKey = new Map(questions.map((q) => [q.data.key, q.data]));
  const allowedTiers = new Set(tiersUpTo(a.access));
  for (const target of targets) {
    const resolved = resolveAssessmentTarget(a, target);
    for (const problem of resolved.problems) add(problem.field, problem.message, problem.severity);
    const scopeKeys = resolved.scope.map((n) => n.key);
    const fixed = new Set(resolved.sections.flatMap((s) => s.items.map((i) => i.key)));
    const questionMarks = new Map<string, number>();
    for (const section of resolved.sections) {
      for (const it of section.items) {
        const q = byKey.get(it.key);
        if (!q) {
          add("sections.items", `Question "${it.key}" does not exist in ${item.family}.`);
          continue;
        }
        questionMarks.set(it.key, q.marks);
        const tagged = plansOf.get(`question:${item.family}:${it.key}`)?.some((p) => p.syllabus === target) ?? false;
        if (!tagged) add("sections.items", `Question "${it.key}" is not tagged to any topic of ${target.path}.`, "warning");
        if (!allowedTiers.has(questionAccessTier(q))) add("sections.items", `Question "${it.key}" is ${questionAccessTier(q)} but the assessment is ${a.access}.`, "warning");
      }
    }
    // Rules draw from every question tagged in the target: its own family's and those of the families it borrows from.
    const pool = [questions, ...target.conceptFamilies.map((family) => questionsByFamily.get(family) ?? [])].flat();
    const demands: RuleDemand[] = [];
    for (const section of resolved.sections) {
      for (const { topic, rule, includeSubtopics } of section.rules) {
        const candidates: string[] = [];
        const outside = new Set<string>();
        for (const loaded of pool) {
          const q = loaded.data;
          if (loaded.family === item.family && fixed.has(q.key)) continue;
          if (q.difficulty < rule.difficulty[0] || q.difficulty > rule.difficulty[1]) continue;
          if (rule.type && q.type !== rule.type) continue;
          if (rule.skill && q.skill !== rule.skill) continue;
          if (rule.marksPerQuestion && q.marks !== rule.marksPerQuestion) continue;
          if (rule.examStyleOnly && !q.examStyle) continue;
          if (!allowedTiers.has(questionAccessTier(q))) continue;
          const plan = plansOf.get(`question:${loaded.family}:${q.key}`)?.find((p) => p.syllabus === target);
          if (!plan) continue;
          const inScope = topic
            ? plan.nodes.some((node) => (includeSubtopics ? isWithin(node, topic.key) : node.key === topic.key))
            : scopeKeys.length === 0 || plan.nodes.some((node) => scopeKeys.some((key) => isWithin(node, key)));
          if (!inScope) continue;
          candidates.push(`${loaded.family}:${q.key}`);
          if (rule.concepts && !q.concepts.some((c) => rule.concepts?.includes(c))) outside.add(q.key);
        }
        if (outside.size > 0) {
          add("sections", `In ${target.path} a rule scoped to ${(rule.concepts ?? []).join(", ")} draws from the topic "${topic?.key ?? "scope"}", so it can also draw ${outside.size} question(s) of other concepts (e.g. ${[...outside].slice(0, 3).join(", ")}). Narrow the rule (difficulty, type, marks) or accept the wider scope.`, "warning");
        }
        demands.push({ required: rule.count, candidates, capped: false });
      }
    }
    if (demands.length > 0) {
      const feasibility = blueprintFeasibility(demands);
      if (!feasibility.possible) {
        const short = feasibility.rules
          .map((rule, index) => (rule.available < rule.required ? `rule ${index + 1} needs ${rule.required}, ${rule.available} match` : null))
          .filter((x): x is string => x !== null);
        add("sections", `Not enough questions for ${target.path}: ${feasibility.assignable}/${feasibility.required} can be drawn${short.length > 0 ? ` (${short.join("; ")})` : " (rules compete for the same questions)"}. Write more questions or relax the rules.`, "error", "blueprint");
      } else if (!feasibility.guaranteed) {
        add("sections", `In ${target.path} rules overlap: an attempt may fall short when earlier rules take the questions later rules need. Narrow the rules or add questions.`, "warning", "blueprint");
      }
    }
    const totals = computeTotals(
      a.sections.map((section) => ({
        answerCount: section.answerCount ?? null,
        marks: section.marks ?? null,
        items: section.items.map((i) => ({ questionId: i.question, marks: i.marks ?? null })),
        rules: section.rules.map((r) => ({ questionCount: r.count, marksPerQuestion: r.marksPerQuestion ?? null })),
      })),
      questionMarks,
    );
    if (a.timeLimitMinutes !== null && totals.exact && totals.total > 0) {
      const perMark = a.timeLimitMinutes / totals.total;
      if (perMark < 0.5 || perMark > 4) add("timeLimitMinutes", `${a.timeLimitMinutes} minutes for ${totals.total} marks (${perMark.toFixed(1)} min per mark) looks wrong; exams allow about 1-1.5 minutes per mark.`, "warning");
    }
  }
  return issues;
}

