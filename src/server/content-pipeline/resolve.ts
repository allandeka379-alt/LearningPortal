import type { TopicKind } from "@/generated/prisma/enums";
import { defaultChildKind, topicPlacementProblem } from "@/server/cms/curriculum/core";
import type { Issue } from "./issues";
import {
  parseObjectiveRef,
  parseSelector,
  selectorMatches,
  slugify,
  subjectPath,
  syllabusPath,
  type SyllabusRef,
  type SyllabusSelector,
} from "./keys";
import type { LoadedRegistry, LoadedSyllabus } from "./load";
import type { SyllabusFile, SyllabusNode } from "./schemas";

/**
 * Curriculum resolution shared by the validator and the importer (pure): flattens syllabus topic trees, and maps
 * content tagged with CONCEPT KEYS onto the topic nodes of every syllabus version whose nodes `cover` those concepts.
 * This is what lets one question written once appear under the right topic of both ZIMSEC and Cambridge syllabi.
 *
 * Tagging rule: an item with concepts [c1, c2] is tagged, in every syllabus of its family (or that borrows its family's
 * concepts through `conceptFamilies`) that its `applies` selectors allow (default: all), to every node whose `covers`
 * lists c1 or c2. The PRIMARY tag in a syllabus is the first such
 * node for the first concept that matches (pre-order). Practice and mastery use topic subtrees, so tagging the most
 * specific covering node is enough; covering a concept on both a node and its ancestor is redundant (warning).
 */

export interface FlatNode {
  key: string;
  name: string;
  code: string | null;
  slug: string;
  kind: TopicKind;
  depth: number;
  parentKey: string | null;
  /** Keys from the root to this node, inclusive. */
  lineage: string[];
  /** Position among its siblings. */
  sortOrder: number;
  /** Pre-order index in the whole tree. */
  order: number;
  covers: string[];
  objectives: SyllabusNode["objectives"];
  components: string[];
  optional: boolean;
  optionGroup: string | null;
  description: string | null;
  estimatedStudyMinutes: number | null;
}

export interface SyllabusModel {
  file: string;
  ref: SyllabusRef;
  /** board/qualification/subject/version */
  path: string;
  /** board/qualification/subject */
  subjectPath: string;
  family: string;
  /** Other families whose concepts this syllabus covers (see `syllabiForFamily`). */
  conceptFamilies: string[];
  data: SyllabusFile;
  /** Pre-order. */
  nodes: FlatNode[];
  byKey: Map<string, FlatNode>;
  /** concept key → covering nodes (pre-order). */
  conceptNodes: Map<string, FlatNode[]>;
  /** objective code → node holding it. */
  objectiveNodes: Map<string, FlatNode>;
}

/** Flattens and checks one syllabus file. Structural problems are returned as issues (the model is still usable). */
export function buildSyllabusModel(loaded: LoadedSyllabus): { model: SyllabusModel; issues: Issue[] } {
  const issues: Issue[] = [];
  const { file, data, ref } = loaded;
  const nodes: FlatNode[] = [];
  const byKey = new Map<string, FlatNode>();
  const explicitSlugs = new Set<string>();
  const usedSlugs = new Set<string>();
  const componentCodes = new Set<string>();
  for (const component of data.components) {
    if (componentCodes.has(component.code)) issues.push({ file, severity: "error", code: "duplicate-component", field: `components.${component.code}`, message: `Paper code "${component.code}" is listed twice.` });
    componentCodes.add(component.code);
  }
  const defaults = data.routes.filter((route) => route.isDefault);
  if (defaults.length > 1) issues.push({ file, severity: "error", code: "route-default", field: "routes", message: "At most one route can be the default." });
  const routeCodes = new Set<string>();
  for (const route of data.routes) {
    if (routeCodes.has(route.code)) issues.push({ file, severity: "error", code: "duplicate-route", field: `routes.${route.code}`, message: `Route code "${route.code}" is listed twice.` });
    routeCodes.add(route.code);
    for (const link of route.components) {
      const code = typeof link === "string" ? link : link.code;
      if (!componentCodes.has(code)) issues.push({ file, severity: "error", code: "component-unknown", field: `routes.${route.code}`, message: `Route ${route.code} names paper "${code}", which is not in components.` });
    }
  }
  if (data.effectiveTo !== null && data.effectiveTo <= data.effectiveFrom) {
    issues.push({ file, severity: "error", code: "dates", field: "effectiveTo", message: "effectiveTo must be after effectiveFrom." });
  }

  // Explicit slugs first, so derived slugs never steal them.
  const collectExplicit = (list: readonly SyllabusNode[]) => {
    for (const node of list) {
      if (node.slug) {
        if (explicitSlugs.has(node.slug)) issues.push({ file, key: node.key, severity: "error", code: "duplicate-slug", field: "slug", message: `Slug "${node.slug}" is used twice in this syllabus.` });
        explicitSlugs.add(node.slug);
      }
      collectExplicit(node.children);
    }
  };
  collectExplicit(data.topics);
  for (const slug of explicitSlugs) usedSlugs.add(slug);

  const codes = new Map<string, string>();
  const objectiveNodes = new Map<string, FlatNode>();
  const topLevelKind: "SECTION" | "TOPIC" = data.topics.some((node) => node.kind === "SECTION") ? "SECTION" : "TOPIC";
  const visit = (list: readonly SyllabusNode[], parent: FlatNode | null) => {
    list.forEach((node, index) => {
      const kind: TopicKind = node.kind ?? (parent === null ? topLevelKind : defaultChildKind(parent.kind));
      const placement = topicPlacementProblem(kind, parent?.kind ?? null);
      if (placement) issues.push({ file, key: node.key, severity: "error", code: "topic-kind", field: "kind", message: placement });
      let slug = node.slug ?? slugify(node.name, 100);
      if (!node.slug) {
        if (slug === "") slug = slugify(node.key.replace(/\./g, "-"), 100) || "topic";
        if (usedSlugs.has(slug)) {
          let n = 2;
          while (usedSlugs.has(`${slug}-${n}`)) n += 1;
          slug = `${slug}-${n}`;
        }
      }
      usedSlugs.add(slug);
      const flat: FlatNode = {
        key: node.key,
        name: node.name.trim(),
        code: node.code,
        slug,
        kind,
        depth: parent ? parent.depth + 1 : 0,
        parentKey: parent?.key ?? null,
        lineage: [...(parent?.lineage ?? []), node.key],
        sortOrder: index,
        order: nodes.length,
        covers: [...new Set(node.covers)],
        objectives: node.objectives,
        components: node.components,
        optional: node.optional,
        optionGroup: node.optionGroup ?? null,
        description: node.description?.trim() ? node.description : null,
        estimatedStudyMinutes: node.estimatedStudyMinutes ?? null,
      };
      if (byKey.has(node.key)) issues.push({ file, key: node.key, severity: "error", code: "duplicate-key", message: `Node key "${node.key}" is used twice in this syllabus.` });
      byKey.set(node.key, flat);
      nodes.push(flat);
      if (node.code) {
        const other = codes.get(node.code);
        if (other) issues.push({ file, key: node.key, severity: "warning", code: "duplicate-code", field: "code", message: `Topic code "${node.code}" is also used by "${other}".` });
        else codes.set(node.code, node.key);
      }
      if (node.covers.length !== flat.covers.length) issues.push({ file, key: node.key, severity: "warning", code: "duplicate-cover", field: "covers", message: "A concept is listed twice in covers." });
      for (const component of node.components) {
        if (!componentCodes.has(component)) issues.push({ file, key: node.key, severity: "error", code: "component-unknown", field: "components", message: `Paper "${component}" is not in this syllabus's components.` });
      }
      const objectiveCodes = new Set<string>();
      for (const objective of node.objectives) {
        if (objectiveNodes.has(objective.code) || objectiveCodes.has(objective.code)) {
          issues.push({ file, key: node.key, severity: "error", code: "duplicate-objective", field: `objectives.${objective.code}`, message: `Objective code "${objective.code}" is used twice in this syllabus.` });
        }
        objectiveCodes.add(objective.code);
        objectiveNodes.set(objective.code, flat);
      }
      if (node.optionGroup && !node.optional) issues.push({ file, key: node.key, severity: "warning", code: "option-group", field: "optionGroup", message: "optionGroup is only meaningful on optional nodes." });
      visit(node.children, flat);
    });
  };
  visit(data.topics, null);

  const conceptNodes = new Map<string, FlatNode[]>();
  for (const node of nodes) {
    for (const concept of node.covers) conceptNodes.set(concept, [...(conceptNodes.get(concept) ?? []), node]);
  }
  for (const [concept, covering] of conceptNodes) {
    for (const node of covering) {
      const ancestor = covering.find((other) => other !== node && node.lineage.includes(other.key));
      if (ancestor) {
        issues.push({ file, key: node.key, severity: "warning", code: "redundant-cover", field: "covers", message: `"${concept}" is already covered by the ancestor "${ancestor.key}": cover it on the most specific node only.` });
      }
    }
  }

  return {
    model: {
      file,
      ref,
      path: syllabusPath(ref),
      subjectPath: subjectPath(ref),
      family: data.family,
      conceptFamilies: data.conceptFamilies,
      data,
      nodes,
      byKey,
      conceptNodes,
      objectiveNodes,
    },
    issues,
  };
}

/** The syllabi an item of `family` can be tagged in: its own family's, and those that borrow its family's concepts. */
export function syllabiForFamily(family: string, syllabi: readonly SyllabusModel[]): SyllabusModel[] {
  return syllabi.filter((s) => s.family === family || s.conceptFamilies.includes(family));
}

/** Is `node` the node with key `ancestorKey` or one of its descendants? */
export function isWithin(node: FlatNode, ancestorKey: string): boolean {
  return node.lineage.includes(ancestorKey);
}

/** Nodes of `model` in the subtree of `key` (inclusive). */
export function subtree(model: SyllabusModel, key: string): FlatNode[] {
  return model.nodes.filter((node) => isWithin(node, key));
}

/** Lowest common ancestor of `nodes` (null when they sit under different roots or the list is empty). */
export function lowestCommonAncestor(model: SyllabusModel, nodes: readonly FlatNode[]): FlatNode | null {
  const first = nodes[0];
  if (!first) return null;
  let common = [...first.lineage];
  for (const node of nodes.slice(1)) {
    let i = 0;
    while (i < common.length && i < node.lineage.length && common[i] === node.lineage[i]) i += 1;
    common = common.slice(0, i);
  }
  const key = common[common.length - 1];
  return key ? (model.byKey.get(key) ?? null) : null;
}

export interface TagPlan {
  syllabus: SyllabusModel;
  /** Covering nodes in priority order; the first is the primary tag in this syllabus. */
  nodes: FlatNode[];
}

/** Parses `applies` selectors (invalid ones are reported by the schema and ignored here). */
export function parseSelectors(applies: readonly string[] | undefined): SyllabusSelector[] | null {
  if (!applies || applies.length === 0) return null;
  return applies.map(parseSelector).filter((s): s is SyllabusSelector => s !== null);
}

/** Where an item tagged with `concepts` is tagged, per syllabus version (only syllabi with at least one node). */
export function planTags(concepts: readonly string[], applies: readonly string[] | undefined, syllabi: readonly SyllabusModel[]): TagPlan[] {
  const selectors = parseSelectors(applies);
  const plans: TagPlan[] = [];
  for (const syllabus of syllabi) {
    if (selectors && !selectors.some((selector) => selectorMatches(selector, syllabus.ref))) continue;
    const seen = new Set<string>();
    const nodes: FlatNode[] = [];
    for (const concept of concepts) {
      for (const node of syllabus.conceptNodes.get(concept) ?? []) {
        if (seen.has(node.key)) continue;
        seen.add(node.key);
        nodes.push(node);
      }
    }
    if (nodes.length > 0) plans.push({ syllabus, nodes });
  }
  return plans;
}

/** Syllabus versions an assessment is built for (one assessment row per version). */
export function assessmentTargets(
  family: string,
  target: { syllabus?: string | undefined; applies?: readonly string[] | undefined },
  syllabi: readonly SyllabusModel[],
): SyllabusModel[] {
  const ofFamily = syllabi.filter((s) => s.family === family);
  if (target.syllabus) {
    const selector = parseSelector(target.syllabus);
    return selector ? ofFamily.filter((s) => selectorMatches(selector, s.ref)) : [];
  }
  const selectors = parseSelectors(target.applies);
  return selectors ? ofFamily.filter((s) => selectors.some((selector) => selectorMatches(selector, s.ref))) : ofFamily;
}

/** The home subject of an item: the first of the registry's subjects (preference order) it is tagged in. */
export function homeSubjectPath(plans: readonly TagPlan[], registry: LoadedRegistry | undefined): string | null {
  const tagged = new Set(plans.map((plan) => plan.syllabus.subjectPath));
  for (const ref of registry?.data.subjects ?? []) {
    const subject = ref.split("@")[0] as string;
    if (tagged.has(subject)) return subject;
  }
  return plans[0]?.syllabus.subjectPath ?? null;
}

export interface ResolvedObjective {
  syllabus: SyllabusModel;
  node: FlatNode;
  code: string;
}

/**
 * Resolves objective references against the tagged syllabi. Problems: unknown reference, or an objective whose topic
 * is outside the item's tagged topics (the CMS only links objectives of tagged topics).
 */
export function resolveObjectives(refs: readonly string[], plans: readonly TagPlan[]): { objectives: ResolvedObjective[]; problems: string[] } {
  const objectives: ResolvedObjective[] = [];
  const problems: string[] = [];
  for (const text of refs) {
    const ref = parseObjectiveRef(text);
    if (!ref) continue;
    const subject = subjectPath(ref.subject);
    const candidates = plans.filter((plan) => plan.syllabus.subjectPath === subject);
    if (candidates.length === 0) {
      problems.push(`Objective ${text}: the item is not tagged to any ${subject} syllabus (its concepts or applies exclude it).`);
      continue;
    }
    let found = false;
    for (const plan of candidates) {
      const node = plan.syllabus.objectiveNodes.get(ref.code);
      if (!node) continue;
      found = true;
      if (!plan.nodes.some((tagged) => isWithin(node, tagged.key))) {
        problems.push(`Objective ${text} belongs to topic "${node.key}" in ${plan.syllabus.path}, which the item's concepts do not tag.`);
        continue;
      }
      objectives.push({ syllabus: plan.syllabus, node, code: ref.code });
    }
    if (!found) problems.push(`Objective ${text} does not exist in any ${subject} syllabus file.`);
  }
  return { objectives, problems };
}
