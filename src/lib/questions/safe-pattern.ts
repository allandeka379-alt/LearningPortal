/**
 * Safe answer patterns for SHORT_ANSWER `answerSpec.patterns` (§9 automatic marking).
 *
 * JavaScript has no regex timeout, and author-supplied patterns come from self-service teachers as well as editors, so
 * a pattern must never be able to stall marking (ReDoS). Two layers:
 *
 * 1. GRAMMAR (authoring time: Zod refinement on the answer spec; re-checked whenever a spec is parsed for marking).
 *    Patterns are restricted to a small, anchored subset of JS regular expressions:
 *
 *   pattern := "^" term* "$"                      anchored at both ends; no top-level "|"
 *   term    := atom quantifier?
 *   atom    := literal | "." | escape | class | group
 *   group   := "(" | "(?:"  alt ("|" alt)* ")"    no nested groups; a group itself may only be optional ("?"),
 *   alt     := (atom quantifier?)*                 so `(a+)+`-style nested repetition is impossible
 *   escape  := \d \D \w \W \s \S \b \B or an escaped metacharacter
 *   class   := "[" "^"? (char | char "-" char | escape)+ "]"
 *   quant   := ? | * | + | {n} | {n,} | {n,m}      (n ≤ m ≤ 100), optionally lazy ("?")
 *
 *    Rejected: backreferences, lookarounds, named groups, unicode property escapes, anchors in the middle, nested
 *    groups, repeated groups (only "?" is allowed on a group), patterns longer than 200 characters.
 *
 *    Complexity budget (portability: keeps patterns tame in any backtracking engine, e.g. an author's own tools):
 *    every quantifier multiplies a cost by the number of ways it can match (unbounded quantifiers count as
 *    {@link PATTERN_SUBJECT_LIMIT} + 1, `{n,m}` as m − n + 1, `?` as 2); a group costs the SUM of its alternatives'
 *    costs. A pattern is accepted only when the product stays ≤ {@link MAX_PATTERN_COST}.
 *
 *    Size budget: a pattern is compiled to a small matching program (one instruction per character test, branch or
 *    jump; `{n,m}` is expanded). A pattern may use at most {@link MAX_PATTERN_PROGRAM_SIZE} instructions, one answer
 *    spec at most {@link MAX_SPEC_PATTERN_PROGRAM_SIZE} over all its patterns (`answer-spec.ts`), and one question at
 *    most {@link MAX_QUESTION_PATTERN_PROGRAM_SIZE} over all its parts (`validate.ts` when authoring; the marking
 *    dispatcher sends an over-budget stored question to review without running it).
 *
 * 2. MATCHING never backtracks. The backtracking cost above is NOT a time bound: V8 needs over a second for some
 *    patterns inside that budget (`^.{0,99}.{0,99}.{0,99}.{0,19}x$` on 200 characters), so answers are never run
 *    through a backtracking `RegExp`. {@link testSafePattern} simulates the compiled program over the answer one code
 *    point at a time, tracking every live instruction at once (Thompson / Pike NFA simulation): the work is at most
 *    (answer length + 1) × program size steps, i.e. ≤ 201 × 512 for one pattern and ≤ 201 × 2 048 for a whole spec.
 *    Single-character tests (literals, `.`, escapes, classes) are still evaluated by V8 on ONE code point with the
 *    same flags, so character semantics (case folding under `iu`, `\w`, ranges, negated classes) are exactly those of
 *    `new RegExp(pattern, flags)`; `\b`/`\B` use the same `\w` test. For a whole-string (anchored) match, greedy and
 *    lazy quantifiers accept the same answers, so laziness is ignored.
 *
 * Answers longer than {@link PATTERN_SUBJECT_LIMIT} characters are never tested against patterns. Patterns are
 * matched with the `u` flag (and `i` unless the answer is case-sensitive) against the NORMALISED answer text (see
 * `text.ts`), so authors should write them for normalised input (single spaces, NFKC).
 */
import { QUESTION_LIMITS } from "./constants";

/** Answers longer than this (after normalisation) are never tested against patterns. */
export const PATTERN_SUBJECT_LIMIT = 200;
/** Upper bound of the backtracking-complexity product described in the module header. */
export const MAX_PATTERN_COST = 20_000_000;
/** Upper bound of one pattern's compiled program size (instructions; see the module header). */
export const MAX_PATTERN_PROGRAM_SIZE = 512;
/** Upper bound of the summed program sizes of all patterns of one answer spec. */
export const MAX_SPEC_PATTERN_PROGRAM_SIZE = 2_048;
/** Upper bound of the summed program sizes of all patterns of one question, parts included (STRUCTURED). */
export const MAX_QUESTION_PATTERN_PROGRAM_SIZE = 4_096;
const MAX_GROUPS = 10;
const MAX_REPEAT = 100;
const UNBOUNDED_FACTOR = PATTERN_SUBJECT_LIMIT + 1;

/** `size` is the compiled program size (instructions) that the spec-level budget adds up. */
export type SafePatternCheck = { ok: true; cost: number; size: number } | { ok: false; reason: string };

const CLASS_ESCAPES = new Set(["d", "D", "w", "W", "s", "S"]);
const ASSERTION_ESCAPES = new Set(["b", "B"]);
const META_ESCAPES = new Set(["\\", "^", "$", ".", "|", "?", "*", "+", "(", ")", "[", "]", "{", "}", "/", "-"]);
const QUANTIFIER_START = new Set(["?", "*", "+", "{"]);

class PatternError extends Error {}

function fail(reason: string): never {
  throw new PatternError(reason);
}

// =====================================================================================================================
// Parsing (grammar + budgets) into a small syntax tree
// =====================================================================================================================

/** One code point test (literal, ".", class escape, escaped metacharacter or class), as its pattern source. */
type CharNode = { kind: "char"; source: string };
/** `\b` (negated false) or `\B` (negated true). */
type AssertNode = { kind: "assert"; negated: boolean };
type GroupNode = { kind: "group"; alternatives: Term[][] };
type AtomNode = CharNode | AssertNode | GroupNode;

interface Term {
  atom: AtomNode;
  min: number;
  /** `Infinity` for `*`, `+` and `{n,}`. */
  max: number;
}

/** Parses `\x` at `i`; returns the index after it. */
function parseEscape(cs: readonly string[], i: number, inClass: boolean): number {
  const next = cs[i + 1];
  if (next === undefined) fail("Pattern ends with a lone backslash.");
  if (CLASS_ESCAPES.has(next) || META_ESCAPES.has(next)) return i + 2;
  if (!inClass && ASSERTION_ESCAPES.has(next)) return i + 2;
  if (/\d/.test(next)) fail("Backreferences are not allowed in answer patterns.");
  return fail(`Escape \\${next} is not allowed in answer patterns.`);
}

/** Parses a character class starting at `[`; returns the index after `]`. */
function parseClass(cs: readonly string[], start: number): number {
  let i = start + 1;
  if (cs[i] === "^") i += 1;
  let members = 0;
  while (i < cs.length) {
    const c = cs[i];
    if (c === "]") {
      if (members === 0) fail("Empty character class.");
      return i + 1;
    }
    if (c === "\\") {
      i = parseEscape(cs, i, true);
    } else {
      if (c === "[") fail("Nested character classes are not allowed.");
      i += 1;
    }
    members += 1;
  }
  return fail("Unterminated character class.");
}

interface Quantifier {
  next: number;
  factor: number;
  optionalOnly: boolean;
  min: number;
  max: number;
}

/** Parses a quantifier at `i`, or returns null when there is none. */
function parseQuantifier(cs: readonly string[], i: number): Quantifier | null {
  const c = cs[i];
  if (c === undefined || !QUANTIFIER_START.has(c)) return null;
  let next: number;
  let factor: number;
  let min: number;
  let max: number;
  let optionalOnly = false;
  if (c === "?") {
    next = i + 1;
    factor = 2;
    optionalOnly = true;
    min = 0;
    max = 1;
  } else if (c === "*" || c === "+") {
    next = i + 1;
    factor = UNBOUNDED_FACTOR;
    min = c === "*" ? 0 : 1;
    max = Infinity;
  } else {
    const rest = cs.slice(i, i + 12).join("");
    const m = /^\{(\d{1,4})(,(\d{0,4}))?\}/.exec(rest);
    if (!m) fail("Malformed {n,m} quantifier.");
    min = Number(m[1]);
    const hasComma = m[2] !== undefined;
    const maxText = m[3];
    if (min > MAX_REPEAT) fail(`Repetition counts above ${MAX_REPEAT} are not allowed.`);
    if (hasComma && (maxText === undefined || maxText === "")) {
      factor = UNBOUNDED_FACTOR;
      max = Infinity;
    } else {
      max = hasComma ? Number(maxText) : min;
      if (max > MAX_REPEAT) fail(`Repetition counts above ${MAX_REPEAT} are not allowed.`);
      if (max < min) fail("Quantifier {n,m} needs n ≤ m.");
      factor = max - min + 1;
    }
    next = i + Array.from(m[0]).length;
  }
  if (cs[next] === "?") next += 1; // lazy variant: same worst case, same set of whole-string matches
  const after = cs[next];
  if (after !== undefined && QUANTIFIER_START.has(after)) fail("Stacked quantifiers are not allowed.");
  return { next, factor, optionalOnly, min, max };
}

interface Atom {
  next: number;
  node: AtomNode;
  /** Backtracking cost of the atom itself (1, or the sum over a group's alternatives). */
  cost: number;
}

/** Parses one atom at `i` (top level when `inGroup` is false). */
function parseAtom(cs: readonly string[], i: number, inGroup: boolean, state: { groups: number }): Atom {
  const c = cs[i];
  if (c === undefined) fail("Unexpected end of pattern.");
  switch (c) {
    case "\\": {
      const next = parseEscape(cs, i, false);
      const letter = cs[i + 1];
      const node: AtomNode = letter !== undefined && ASSERTION_ESCAPES.has(letter) ? { kind: "assert", negated: letter === "B" } : { kind: "char", source: cs.slice(i, next).join("") };
      return { next, node, cost: 1 };
    }
    case "[": {
      const next = parseClass(cs, i);
      return { next, node: { kind: "char", source: cs.slice(i, next).join("") }, cost: 1 };
    }
    case "(": {
      if (inGroup) fail("Nested groups are not allowed in answer patterns.");
      state.groups += 1;
      if (state.groups > MAX_GROUPS) fail(`At most ${MAX_GROUPS} groups are allowed.`);
      let j = i + 1;
      if (cs[j] === "?") {
        if (cs[j + 1] !== ":") fail("Lookarounds and named groups are not allowed in answer patterns.");
        j += 2;
      }
      const alternatives: Term[][] = [];
      let terms: Term[] = [];
      let total = 0;
      let alternative = 1;
      while (j < cs.length && cs[j] !== ")") {
        if (cs[j] === "|") {
          total += alternative;
          alternative = 1;
          alternatives.push(terms);
          terms = [];
          j += 1;
          continue;
        }
        const inner = parseAtom(cs, j, true, state);
        j = inner.next;
        const quantifier = parseQuantifier(cs, j);
        if (quantifier) {
          alternative *= quantifier.factor;
          j = quantifier.next;
        }
        terms.push({ atom: inner.node, min: quantifier?.min ?? 1, max: quantifier?.max ?? 1 });
        if (alternative > MAX_PATTERN_COST) fail("Pattern is too complex: reduce repetitions or alternatives.");
      }
      if (cs[j] !== ")") fail("Unterminated group.");
      alternatives.push(terms);
      return { next: j + 1, node: { kind: "group", alternatives }, cost: total + alternative };
    }
    case ")":
      return fail("Unbalanced parenthesis.");
    case "|":
      return fail(inGroup ? "Unexpected '|'." : "Top-level alternation is not allowed: wrap the alternatives in a group.");
    case "^":
    case "$":
      return fail("Anchors (^ and $) are only allowed at the start and end of the pattern.");
    case "]":
    case "}":
      return fail(`Unescaped '${c}'.`);
    case "?":
    case "*":
    case "+":
    case "{":
      return fail("Quantifier without anything to repeat.");
    default:
      return { next: i + 1, node: { kind: "char", source: c }, cost: 1 };
  }
}

/** Program size of one atom (see {@link compileTerms}): a group adds a branch and a jump per extra alternative. */
function atomSize(atom: AtomNode): number {
  if (atom.kind !== "group") return 1;
  return atom.alternatives.reduce((sum, terms) => sum + termsSize(terms), 0) + 2 * (atom.alternatives.length - 1);
}

/** Program size of a term: `min` copies, then a loop (unbounded) or `max − min` optional copies. */
function termSize(term: Term): number {
  const size = atomSize(term.atom);
  const rest = term.max === Infinity ? size + 2 : (term.max - term.min) * (size + 1);
  return term.min * size + rest;
}

function termsSize(terms: readonly Term[]): number {
  return terms.reduce((sum, term) => sum + termSize(term), 0);
}

type Analysis = { ok: true; cost: number; size: number; terms: Term[] } | { ok: false; reason: string };

function analysePattern(source: string): Analysis {
  if (typeof source !== "string" || source.length === 0) return { ok: false, reason: "Pattern is empty." };
  if (source.length > QUESTION_LIMITS.patternLength) {
    return { ok: false, reason: `Patterns are limited to ${QUESTION_LIMITS.patternLength} characters.` };
  }
  const cs = Array.from(source);
  try {
    if (cs[0] !== "^") fail("Patterns must start with ^ (anchored).");
    const end = cs.length - 1;
    if (end < 1 || cs[end] !== "$") fail("Patterns must end with $ (anchored).");
    const state = { groups: 0 };
    const terms: Term[] = [];
    let cost = 1;
    let size = 1; // the final MATCH instruction
    let i = 1;
    while (i < end) {
      const atom = parseAtom(cs, i, false, state);
      i = atom.next;
      if (i > end) fail("Patterns must end with an unescaped $.");
      cost *= atom.cost;
      const quantifier = i < end ? parseQuantifier(cs, i) : null;
      if (quantifier) {
        if (atom.node.kind === "group" && !quantifier.optionalOnly) fail("Groups may only be made optional with '?'.");
        if (quantifier.next > end) fail("Patterns must end with an unescaped $.");
        cost *= quantifier.factor;
        i = quantifier.next;
      }
      const term: Term = { atom: atom.node, min: quantifier?.min ?? 1, max: quantifier?.max ?? 1 };
      terms.push(term);
      size += termSize(term);
      if (cost > MAX_PATTERN_COST) fail("Pattern is too complex: reduce repetitions or alternatives.");
      if (size > MAX_PATTERN_PROGRAM_SIZE) fail("Pattern is too long once its repetitions are expanded: use smaller {n,m} counts.");
    }
    if (i !== end) fail("Patterns must end with an unescaped $.");
    try {
      new RegExp(source, "u");
    } catch {
      fail("Pattern is not a valid regular expression.");
    }
    return { ok: true, cost, size, terms };
  } catch (error) {
    if (error instanceof PatternError) return { ok: false, reason: error.message };
    throw error;
  }
}

/**
 * Checks that `source` is a safe, anchored answer pattern (grammar and budgets in the module header).
 * Pure and fast (linear in the pattern length).
 */
export function checkSafePattern(source: string): SafePatternCheck {
  const analysis = analysePattern(source);
  return analysis.ok ? { ok: true, cost: analysis.cost, size: analysis.size } : analysis;
}

/**
 * Summed program size of a spec's patterns, compared with {@link MAX_SPEC_PATTERN_PROGRAM_SIZE}. Patterns that fail
 * {@link checkSafePattern} count as 0 (they are reported on their own and never run).
 */
export function patternsProgramSize(patterns: readonly string[]): number {
  let total = 0;
  for (const pattern of patterns) {
    const check = checkSafePattern(pattern);
    if (check.ok) total += check.size;
  }
  return total;
}

/** A question as stored (raw answer specs), with its parts. */
export interface PatternTree {
  type: string;
  answerSpec?: unknown;
  parts?: readonly PatternTree[] | null;
}

/** Root → part → sub-part; deeper parts are never marked (marking/structured.ts). */
const MAX_PATTERN_TREE_DEPTH = 2;

/**
 * Summed program size of every SHORT_ANSWER pattern in a question and its parts (raw stored JSON, never throws),
 * compared with {@link MAX_QUESTION_PATTERN_PROGRAM_SIZE} when authoring and again before marking.
 */
export function questionPatternsProgramSize(tree: PatternTree): number {
  const visit = (node: PatternTree, depth: number): number => {
    if (depth > MAX_PATTERN_TREE_DEPTH) return 0;
    let total = 0;
    const spec = node.answerSpec;
    if (node.type === "SHORT_ANSWER" && typeof spec === "object" && spec !== null) {
      const patterns = (spec as { patterns?: unknown }).patterns;
      // More patterns than allowed make the spec invalid anyway (it is then never run).
      if (Array.isArray(patterns)) total += patternsProgramSize(patterns.slice(0, QUESTION_LIMITS.maxPatterns).filter((p): p is string => typeof p === "string"));
    }
    for (const part of node.parts ?? []) total += visit(part, depth + 1);
    return total;
  };
  return visit(tree, 0);
}

// =====================================================================================================================
// Compilation and linear-time matching (Pike VM)
// =====================================================================================================================

const OP_CHAR = 0; // x = atom index; consumes one code point when the atom matches it
const OP_SPLIT = 1; // continue at x and at y
const OP_JMP = 2; // continue at x
const OP_ASSERT = 3; // x = 1 for \B, 0 for \b; continue at pc + 1 when it holds
const OP_MATCH = 4;

interface Program {
  op: Uint8Array;
  x: Int32Array;
  y: Int32Array;
  /** Single-code-point tests (`^(?:atom)$` with the pattern's flags), indexed by OP_CHAR's x. */
  atoms: RegExp[];
  /** `^\w$` with the pattern's flags (word characters for \b / \B), or null when the program has no assertion. */
  word: RegExp | null;
}

class ProgramBuilder {
  readonly op: number[] = [];
  readonly x: number[] = [];
  readonly y: number[] = [];
  readonly atomSources: string[] = [];
  private readonly atomIndex = new Map<string, number>();
  hasAssertion = false;

  get pc(): number {
    return this.op.length;
  }

  emit(op: number, x = 0, y = 0): number {
    this.op.push(op);
    this.x.push(x);
    this.y.push(y);
    return this.op.length - 1;
  }

  atom(source: string): number {
    let index = this.atomIndex.get(source);
    if (index === undefined) {
      index = this.atomSources.length;
      this.atomSources.push(source);
      this.atomIndex.set(source, index);
    }
    return index;
  }
}

function compileAtom(b: ProgramBuilder, atom: AtomNode): void {
  switch (atom.kind) {
    case "char":
      b.emit(OP_CHAR, b.atom(atom.source));
      return;
    case "assert":
      b.hasAssertion = true;
      b.emit(OP_ASSERT, atom.negated ? 1 : 0);
      return;
    case "group": {
      const jumps: number[] = [];
      atom.alternatives.forEach((terms, index) => {
        const last = index === atom.alternatives.length - 1;
        const split = last ? -1 : b.emit(OP_SPLIT);
        if (split >= 0) b.x[split] = b.pc;
        compileTerms(b, terms);
        if (!last) {
          jumps.push(b.emit(OP_JMP));
          b.y[split] = b.pc;
        }
      });
      for (const jump of jumps) b.x[jump] = b.pc;
      return;
    }
  }
}

/** Emits exactly {@link termsSize} instructions. */
function compileTerms(b: ProgramBuilder, terms: readonly Term[]): void {
  for (const term of terms) {
    // A quantified assertion is a syntax error under the `u` flag, so the RegExp check has already refused it.
    if (term.atom.kind === "assert" && (term.min !== 1 || term.max !== 1)) throw new PatternError("Assertions cannot be repeated.");
    for (let k = 0; k < term.min; k += 1) compileAtom(b, term.atom);
    if (term.max === Infinity) {
      const loop = b.emit(OP_SPLIT);
      b.x[loop] = b.pc;
      compileAtom(b, term.atom);
      b.emit(OP_JMP, loop);
      b.y[loop] = b.pc;
    } else {
      for (let k = term.min; k < term.max; k += 1) {
        const split = b.emit(OP_SPLIT);
        b.x[split] = b.pc;
        compileAtom(b, term.atom);
        b.y[split] = b.pc;
      }
    }
  }
}

function compileProgram(terms: readonly Term[], caseSensitive: boolean): Program | null {
  const flags = caseSensitive ? "u" : "iu";
  const b = new ProgramBuilder();
  try {
    compileTerms(b, terms);
    b.emit(OP_MATCH);
    return {
      op: Uint8Array.from(b.op),
      x: Int32Array.from(b.x),
      y: Int32Array.from(b.y),
      atoms: b.atomSources.map((source) => new RegExp(`^(?:${source})$`, flags)),
      word: b.hasAssertion ? new RegExp("^\\w$", flags) : null,
    };
  } catch {
    return null; // fail closed: the pattern is treated as invalid
  }
}

/**
 * Whole-string match of `text` against a compiled program. Every instruction is visited at most once per position, so
 * the work is at most (code points + 1) × program size steps, whatever the pattern or the text.
 */
function runProgram(program: Program, text: string): boolean {
  const { op, x, y, atoms, word: wordTest } = program;
  const chars = Array.from(text);
  const n = chars.length;
  const size = op.length;
  // Lazily evaluated atom × position results: 0 = unknown, 1 = matches, 2 = does not match.
  const memo = new Uint8Array(atoms.length * n);
  // Word characters for \b / \B, with one extra slot on each side (outside the text = not a word character).
  const word = new Uint8Array(n + 2);
  if (wordTest) chars.forEach((c, index) => (word[index + 1] = wordTest.test(c) ? 1 : 0));
  const marks = new Uint32Array(size);
  const stack = new Int32Array(size);
  let current = new Int32Array(size);
  let next = new Int32Array(size);
  let generation = 0;
  let matched = false;

  /** Adds the instructions reachable from `start` without consuming input (at position `pos`) to `out`. */
  const closure = (start: number, pos: number, out: Int32Array, count: number): number => {
    let sp = 0;
    if (marks[start] !== generation) {
      marks[start] = generation;
      stack[sp++] = start;
    }
    while (sp > 0) {
      const pc = stack[--sp] as number;
      let a = -1;
      let b = -1;
      switch (op[pc]) {
        case OP_CHAR:
          out[count++] = pc;
          break;
        case OP_MATCH:
          if (pos === n) matched = true;
          break;
        case OP_JMP:
          a = x[pc] as number;
          break;
        case OP_SPLIT:
          a = x[pc] as number;
          b = y[pc] as number;
          break;
        case OP_ASSERT:
          // \b holds between a word and a non-word character; \B (x = 1) everywhere else.
          if ((word[pos] !== word[pos + 1]) !== (x[pc] === 1)) a = pc + 1;
          break;
      }
      if (b >= 0 && marks[b] !== generation) {
        marks[b] = generation;
        stack[sp++] = b;
      }
      if (a >= 0 && marks[a] !== generation) {
        marks[a] = generation;
        stack[sp++] = a;
      }
    }
    return count;
  };

  generation += 1;
  let count = closure(0, 0, current, 0);
  for (let i = 0; i < n; i += 1) {
    if (count === 0) return false;
    generation += 1;
    let nextCount = 0;
    for (let k = 0; k < count; k += 1) {
      const pc = current[k] as number;
      const atom = x[pc] as number;
      const slot = atom * n + i;
      let result = memo[slot];
      if (result === 0) {
        result = (atoms[atom] as RegExp).test(chars[i] as string) ? 1 : 2;
        memo[slot] = result;
      }
      if (result === 1) nextCount = closure(pc + 1, i + 1, next, nextCount);
    }
    [current, next] = [next, current];
    count = nextCount;
  }
  return matched;
}

/** A compiled safe pattern. `test` is a whole-string match in linear time (never backtracks). */
export interface SafePatternMatcher {
  readonly source: string;
  readonly caseSensitive: boolean;
  test(text: string): boolean;
}

const compiled = new Map<string, SafePatternMatcher | null>();
const MAX_CACHE = 500;

/**
 * Compiles a pattern that passed {@link checkSafePattern}; returns null for unsafe patterns (never throws).
 * Compiled matchers are cached (bounded).
 */
export function compileSafePattern(source: string, caseSensitive: boolean): SafePatternMatcher | null {
  const cacheKey = `${caseSensitive ? "s" : "i"}:${source}`;
  const cached = compiled.get(cacheKey);
  if (cached !== undefined) return cached;
  const analysis = analysePattern(source);
  const program = analysis.ok ? compileProgram(analysis.terms, caseSensitive) : null;
  const matcher: SafePatternMatcher | null = program ? { source, caseSensitive, test: (text: string) => runProgram(program, text) } : null;
  if (compiled.size >= MAX_CACHE) {
    const oldest = compiled.keys().next().value;
    if (oldest !== undefined) compiled.delete(oldest);
  }
  compiled.set(cacheKey, matcher);
  return matcher;
}

/**
 * Tests normalised answer text against a safe pattern (whole-string match, linear time). Returns `"skipped"` when the
 * text exceeds {@link PATTERN_SUBJECT_LIMIT} (patterns describe short answers; long text is never run through them)
 * and `"invalid"` when the pattern is not safe.
 */
export function testSafePattern(text: string, source: string, caseSensitive: boolean): boolean | "skipped" | "invalid" {
  if (text.length > PATTERN_SUBJECT_LIMIT) return "skipped";
  const matcher = compileSafePattern(source, caseSensitive);
  if (!matcher) return "invalid";
  return matcher.test(text);
}
