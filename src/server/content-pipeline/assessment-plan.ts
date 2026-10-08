import { isWithin, lowestCommonAncestor, type FlatNode, type SyllabusModel } from "./resolve";
import type { AssessmentSource } from "./schemas";

/**
 * How an assessment source maps onto ONE syllabus version (pure; shared by the validator and the importer): its topic
 * scope (AssessmentTopic rows), each section paper, and each blueprint rule resolved to the topic subtree it draws
 * from. Concept-scoped rules use the smallest subtree that covers the concepts (the lowest common ancestor of the
 * covering nodes), because a database rule names one topic.
 */

export interface ResolvedRule {
  /** Topic node the rule draws from (null = the assessment's scope, or the whole syllabus). */
  topic: FlatNode | null;
  includeSubtopics: boolean;
  rule: AssessmentSource["sections"][number]["rules"][number];
}

export interface ResolvedAssessmentTarget {
  syllabus: SyllabusModel;
  scope: FlatNode[];
  /** Per section: the paper, rules resolved to topic nodes, and fixed items. */
  sections: { componentCode: string | null; rules: ResolvedRule[]; items: { key: string; label: string | null; marks: number | null }[] }[];
  problems: { field: string; message: string; severity: "error" | "warning" }[];
}

/** Resolves an assessment's scope and rules against one syllabus version (pure; shared with the importer). */
export function resolveAssessmentTarget(assessment: AssessmentSource, syllabus: SyllabusModel): ResolvedAssessmentTarget {
  const problems: ResolvedAssessmentTarget["problems"] = [];
  const covering = (concepts: readonly string[]) => {
    const seen = new Set<string>();
    const nodes: FlatNode[] = [];
    for (const concept of concepts) {
      for (const node of syllabus.conceptNodes.get(concept) ?? []) {
        if (seen.has(node.key)) continue;
        seen.add(node.key);
        nodes.push(node);
      }
    }
    return nodes;
  };
  const byKeys = (keys: readonly string[], field: string) =>
    keys.flatMap((key) => {
      const node = syllabus.byKey.get(key);
      if (!node) problems.push({ field, severity: "error", message: `Topic "${key}" does not exist in ${syllabus.path}.` });
      return node ? [node] : [];
    });
  const scope: FlatNode[] = [];
  if (assessment.scope?.concepts) {
    const nodes = covering(assessment.scope.concepts);
    if (nodes.length === 0) problems.push({ field: "scope.concepts", severity: "error", message: `No topic of ${syllabus.path} covers the scope concepts.` });
    scope.push(...nodes);
  }
  if (assessment.scope?.topics) scope.push(...byKeys(assessment.scope.topics, "scope.topics"));
  // Keep only the top-most scope nodes (their subtrees include the rest).
  const topScope = scope.filter((node) => !scope.some((other) => other !== node && isWithin(node, other.key)));

  const sections = assessment.sections.map((section, s) => {
    if (section.component && !syllabus.data.components.some((c) => c.code === section.component)) {
      problems.push({ field: `sections.${s}.component`, severity: "error", message: `Paper "${section.component}" is not a component of ${syllabus.path}.` });
    }
    const rules = section.rules.map((rule, r): ResolvedRule => {
      const field = `sections.${s}.rules.${r}`;
      if (rule.topics) {
        const nodes = byKeys(rule.topics, `${field}.topics`);
        if (rule.topics.length > 1) problems.push({ field: `${field}.topics`, severity: "error", message: "A rule draws from ONE topic subtree: give one topic key (use several rules for several topics)." });
        return { topic: nodes[0] ?? null, includeSubtopics: rule.includeSubtopics, rule };
      }
      if (rule.concepts && rule.concepts.length > 0) {
        const nodes = covering(rule.concepts);
        if (nodes.length === 0) {
          problems.push({ field: `${field}.concepts`, severity: "error", message: `No topic of ${syllabus.path} covers ${rule.concepts.join(", ")}.` });
          return { topic: null, includeSubtopics: true, rule };
        }
        const topic = nodes.length === 1 ? (nodes[0] as FlatNode) : lowestCommonAncestor(syllabus, nodes);
        if (!topic) {
          problems.push({ field: `${field}.concepts`, severity: "warning", message: `In ${syllabus.path} these concepts sit under different top-level topics, so the rule draws from the whole assessment scope.` });
        }
        return { topic, includeSubtopics: true, rule };
      }
      return { topic: null, includeSubtopics: true, rule };
    });
    return { componentCode: section.component ?? null, rules, items: section.items.map((i) => ({ key: i.question, label: i.label ?? null, marks: i.marks ?? null })) };
  });
  return { syllabus, scope: topScope, sections, problems };
}

