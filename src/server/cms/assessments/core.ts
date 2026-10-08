import type { ContentAccessTier } from "@/generated/prisma/enums";

/**
 * Pure rules of the assessment builder (§12, §13): totals and "can this blueprint be satisfied by the published bank?".
 * No I/O; unit tested in core.test.ts. The service loads candidate question ids and delegates the decisions here.
 */

export interface TotalsSection {
  answerCount: number | null;
  marks: number | null;
  items: readonly { questionId: string; marks: number | null }[];
  rules: readonly { questionCount: number; marksPerQuestion: number | null }[];
}

export interface Totals {
  /** Total marks; a lower bound when `exact` is false. */
  total: number;
  /** False when a blueprint rule has no marks target: drawn questions keep their own marks (each is worth at least 1). */
  exact: boolean;
  sections: { total: number; exact: boolean; questionCount: number }[];
}

/**
 * Total marks of a structure (Assessment.totalMarks is service-maintained): an "answer any N" section contributes its
 * stated marks; otherwise fixed items (override, else the question's marks) plus rules (count × marks per question).
 */
export function computeTotals(sections: readonly TotalsSection[], questionMarks: ReadonlyMap<string, number>): Totals {
  let total = 0;
  let exact = true;
  const out: Totals["sections"] = [];
  for (const section of sections) {
    const questionCount = section.items.length + section.rules.reduce((sum, rule) => sum + rule.questionCount, 0);
    if (section.answerCount !== null) {
      const marks = section.marks ?? 0;
      out.push({ total: marks, exact: true, questionCount });
      total += marks;
      continue;
    }
    let sectionTotal = 0;
    let sectionExact = true;
    for (const item of section.items) sectionTotal += item.marks ?? questionMarks.get(item.questionId) ?? 0;
    for (const rule of section.rules) {
      sectionTotal += rule.questionCount * (rule.marksPerQuestion ?? 1);
      if (rule.marksPerQuestion === null) sectionExact = false;
    }
    out.push({ total: sectionTotal, exact: sectionExact, questionCount });
    total += sectionTotal;
    exact &&= sectionExact;
  }
  return { total, exact, sections: out };
}

/** Access tiers a student of `tier` content can be given (a FREE test is filled from PUBLIC and FREE questions). */
export function tiersUpTo(tier: ContentAccessTier): ContentAccessTier[] {
  return tier === "PUBLIC" ? ["PUBLIC"] : tier === "FREE" ? ["PUBLIC", "FREE"] : ["PUBLIC", "FREE", "PREMIUM"];
}

export interface RuleDemand {
  /** Questions the rule must draw. */
  required: number;
  /** Ids of the PUBLISHED questions that match the rule (fixed items already removed). */
  candidates: readonly string[];
  /** True when `candidates` was truncated at the query cap (there are at least that many). */
  capped: boolean;
}

export interface RuleFeasibility {
  required: number;
  /** Matching questions in the bank (a lower bound when capped). */
  available: number;
  capped: boolean;
  /** Enough questions remain for this rule even if earlier rules draw the overlapping ones first. */
  guaranteed: boolean;
}

export interface Feasibility {
  /** Some assignment of distinct questions satisfies every rule (maximum bipartite matching). */
  possible: boolean;
  /**
   * Every attempt fills every rule, whatever the earlier rules happen to draw (rules are filled in order, each from a
   * random sample): no shortfall is possible.
   */
  guaranteed: boolean;
  /** Questions an optimal assignment can place, out of `required`. */
  assignable: number;
  required: number;
  rules: RuleFeasibility[];
}

/**
 * Maximum number of rule slots that distinct questions can fill (Kuhn's augmenting paths, rules with capacities).
 * Capped rules are given their full demand (they have far more candidates than any rule can ask for).
 */
export function maxAssignable(rules: readonly RuleDemand[]): number {
  const owner = new Map<string, number>();
  let filled = 0;
  const augment = (ruleIndex: number, visited: Set<string>): boolean => {
    for (const question of rules[ruleIndex]?.candidates ?? []) {
      if (visited.has(question)) continue;
      visited.add(question);
      const current = owner.get(question);
      if (current === undefined || augment(current, visited)) {
        owner.set(question, ruleIndex);
        return true;
      }
    }
    return false;
  };
  rules.forEach((rule, index) => {
    if (rule.capped) {
      filled += rule.required;
      return;
    }
    for (let slot = 0; slot < rule.required; slot += 1) {
      if (!augment(index, new Set())) break;
      filled += 1;
    }
  });
  return filled;
}

/** Feasibility of a blueprint (rules in the order the attempt engine fills them: sections, then rules). */
export function blueprintFeasibility(rules: readonly RuleDemand[]): Feasibility {
  const required = rules.reduce((sum, rule) => sum + rule.required, 0);
  const assignable = maxAssignable(rules);
  const sets = rules.map((rule) => new Set(rule.candidates));
  const perRule: RuleFeasibility[] = rules.map((rule, index) => {
    if (rule.capped) return { required: rule.required, available: rule.candidates.length, capped: true, guaranteed: true };
    let mayBeTaken = 0;
    for (let earlier = 0; earlier < index; earlier += 1) {
      const other = rules[earlier] as RuleDemand;
      let overlap = 0;
      for (const id of sets[earlier] as Set<string>) if ((sets[index] as Set<string>).has(id)) overlap += 1;
      mayBeTaken += Math.min(other.required, overlap);
    }
    return { required: rule.required, available: rule.candidates.length, capped: false, guaranteed: rule.candidates.length - mayBeTaken >= rule.required };
  });
  return {
    possible: assignable >= required,
    guaranteed: assignable >= required && perRule.every((rule) => rule.guaranteed),
    assignable,
    required,
    rules: perRule,
  };
}
