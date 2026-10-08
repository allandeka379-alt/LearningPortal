import { collapseWhitespace, matchTokens, tokenizeWithSpans, type TokenSpan } from "./text";

/**
 * Query understanding for global search (§28 "search understands subject, topic, qualification, board"; ARCHITECTURE
 * §3.9). Pure: works on an in-memory catalogue snapshot (catalogue.ts loads and caches it).
 *
 * Board, level, qualification and subject words, slugs and syllabus codes inside the query become filters, and the
 * rest of the query is the residual text for full-text search:
 *   "igcse chemistry moles"  -> qualification Cambridge IGCSE, subject IGCSE Chemistry, text "moles"
 *   "0580 quadratic"         -> subject with code 0580, text "quadratic"
 *   "zimsec o level maths"   -> board ZIMSEC, level O-Level (-> ZIMSEC O-Level), subject ZIMSEC O-Level Mathematics
 *
 * Aliases come only from catalogue data (names, short names, slugs, codes), never from hard-coded subject lists
 * (CLAUDE.md rule 5). Generic spelling normalisation applies to every alias: accents/case/punctuation folded
 * ("O-Level" = "o level"), multi-word aliases also match without spaces ("olevel"), and a trailing "s" is optional
 * ("maths" also matches "math"). Aliases made only of 1-2 letter words ("AS", "as a") are ignored: they collide
 * with ordinary English. Codes must contain a digit and match a whole word.
 *
 * Topics are deliberately NOT turned into filters (thousands of names, many generic words): topic names are indexed
 * as weighted keywords and TOPIC documents, so full-text ranking already "understands" them.
 *
 * Words inside "quoted phrases" or negated with "-word" (websearch syntax) are never turned into filters.
 */

export interface CatalogueBoard {
  id: string;
  slug: string;
  code: string;
  name: string;
  shortName: string;
}

export interface CatalogueLevel {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
}

export interface CatalogueQualification {
  id: string;
  examBoardId: string;
  levelId: string;
  slug: string;
  code: string | null;
  name: string;
  shortName: string;
}

export interface CatalogueSubject {
  id: string;
  qualificationId: string;
  slug: string;
  name: string;
  shortName: string | null;
  /** Official subject code plus the codes of its published syllabus versions, e.g. ["0580"]. */
  codes: string[];
}

export interface SearchCatalogue {
  boards: readonly CatalogueBoard[];
  levels: readonly CatalogueLevel[];
  qualifications: readonly CatalogueQualification[];
  subjects: readonly CatalogueSubject[];
}

type TargetKind = "board" | "level" | "qualification" | "subject" | "code";

interface AliasTargets {
  board: Set<string>;
  level: Set<string>;
  qualification: Set<string>;
  subject: Set<string>;
  /** Subjects matched by an official / syllabus code (most specific). */
  code: Set<string>;
}

export interface CatalogueIndex {
  readonly aliases: ReadonlyMap<string, AliasTargets>;
  readonly maxAliasTokens: number;
  readonly boards: ReadonlyMap<string, CatalogueBoard>;
  readonly levels: ReadonlyMap<string, CatalogueLevel>;
  readonly qualifications: ReadonlyMap<string, CatalogueQualification>;
  readonly subjects: ReadonlyMap<string, CatalogueSubject>;
}

const MAX_ALIAS_TOKENS = 6;

function emptyTargets(): AliasTargets {
  return { board: new Set(), level: new Set(), qualification: new Set(), subject: new Set(), code: new Set() };
}

/** Spelling variants of one alias (see module doc). Single tokens shorter than 2 chars are never aliases. */
export function aliasVariants(value: string | null | undefined): string[] {
  if (!value) return [];
  const tokens = matchTokens(value).slice(0, MAX_ALIAS_TOKENS);
  if (tokens.length === 0) return [];
  // Only-short-token aliases ("as a", "AS", "o") collide with ordinary English words.
  if (tokens.every((token) => token.length <= 2)) return [];
  const variants = new Set<string>([tokens.join(" ")]);
  if (tokens.length > 1) {
    const joined = tokens.join("");
    if (joined.length <= 16) variants.add(joined);
  }
  const last = tokens.at(-1) ?? "";
  if (last.length > 4 && last.endsWith("s") && !/\d/.test(last)) {
    variants.add([...tokens.slice(0, -1), last.slice(0, -1)].join(" "));
  }
  return [...variants];
}

/** A code is matched as a whole token and must contain a digit ("0580", "9709", "4004"); 3+ characters. */
function codeVariants(code: string | null | undefined): string[] {
  if (!code) return [];
  const tokens = matchTokens(code);
  if (tokens.length !== 1) return [];
  const token = tokens[0] ?? "";
  return token.length >= 3 && /\d/.test(token) ? [token] : [];
}

export function buildCatalogueIndex(catalogue: SearchCatalogue): CatalogueIndex {
  const aliases = new Map<string, AliasTargets>();
  let maxAliasTokens = 1;
  const add = (kind: TargetKind, id: string, variants: readonly string[]): void => {
    for (const variant of variants) {
      let targets = aliases.get(variant);
      if (!targets) {
        targets = emptyTargets();
        aliases.set(variant, targets);
      }
      targets[kind].add(id);
      maxAliasTokens = Math.max(maxAliasTokens, variant.split(" ").length);
    }
  };

  for (const board of catalogue.boards) {
    for (const value of [board.slug, board.code, board.name, board.shortName]) add("board", board.id, aliasVariants(value));
  }
  for (const level of catalogue.levels) {
    for (const value of [level.slug, level.name, level.shortName]) add("level", level.id, aliasVariants(value));
  }
  for (const qualification of catalogue.qualifications) {
    for (const value of [qualification.slug, qualification.code, qualification.name, qualification.shortName]) {
      add("qualification", qualification.id, aliasVariants(value));
    }
  }
  for (const subject of catalogue.subjects) {
    for (const value of [subject.slug, subject.name, subject.shortName]) add("subject", subject.id, aliasVariants(value));
    for (const code of subject.codes) add("code", subject.id, codeVariants(code));
  }

  return {
    aliases,
    maxAliasTokens: Math.min(maxAliasTokens, MAX_ALIAS_TOKENS),
    boards: new Map(catalogue.boards.map((row) => [row.id, row])),
    levels: new Map(catalogue.levels.map((row) => [row.id, row])),
    qualifications: new Map(catalogue.qualifications.map((row) => [row.id, row])),
    subjects: new Map(catalogue.subjects.map((row) => [row.id, row])),
  };
}

export type DetectedFilterKind = "board" | "level" | "qualification" | "subject";

/** A filter recognised in the query, shown as a removable chip. */
export interface DetectedFilter {
  kind: DetectedFilterKind;
  /** Ids the filter applies (boards, qualifications for level/qualification chips, subjects). */
  ids: string[];
  /** Display label from catalogue data, e.g. "ZIMSEC", "O-Level", "Cambridge IGCSE", "Mathematics". */
  label: string;
  /** The words of the query that were recognised (as typed). */
  matchedText: string;
  /** The query with those words removed: what the UI submits when the chip is removed. */
  removeQuery: string;
  /** True when recognised by an official / syllabus code. */
  byCode: boolean;
}

export interface ParsedQuery {
  raw: string;
  /** Query with recognised words removed (websearch syntax preserved). */
  residual: string;
  filters: {
    boardIds: string[] | null;
    qualificationIds: string[] | null;
    subjectIds: string[] | null;
  };
  detected: DetectedFilter[];
}

/** Explicit filters already chosen in the UI: detection does not override them and is narrowed by them. */
export interface ParseContext {
  boardId?: string;
  levelId?: string;
  qualificationId?: string;
  /** With an explicit subject or topic there is nothing left to detect. */
  subjectId?: string;
  topicId?: string;
}

interface PhraseMatch {
  spans: TokenSpan[];
  targets: AliasTargets;
}

function phraseText(raw: string, phrase: PhraseMatch): string {
  const first = phrase.spans[0];
  const last = phrase.spans.at(-1);
  return first && last ? raw.slice(first.start, last.end) : "";
}

/** `raw` without the given phrases (whitespace collapsed). */
function removePhrases(raw: string, phrases: readonly PhraseMatch[]): string {
  const ranges = phrases
    .map((phrase) => [phrase.spans[0]?.start ?? 0, phrase.spans.at(-1)?.end ?? 0] as const)
    .sort((a, b) => a[0] - b[0]);
  let out = "";
  let cursor = 0;
  for (const [start, end] of ranges) {
    out += `${raw.slice(cursor, start)} `;
    cursor = end;
  }
  out += raw.slice(cursor);
  return collapseWhitespace(out);
}

/** Greedy longest-match scan of the query tokens against the alias map. */
function scanPhrases(spans: readonly TokenSpan[], index: CatalogueIndex): PhraseMatch[] {
  const matches: PhraseMatch[] = [];
  let i = 0;
  while (i < spans.length) {
    let matched: PhraseMatch | null = null;
    const maxN = Math.min(index.maxAliasTokens, spans.length - i);
    for (let n = maxN; n >= 1 && matched === null; n--) {
      const window = spans.slice(i, i + n);
      if (window.some((span) => span.quoted || span.negated)) continue;
      const candidates = [window.map((span) => span.token).join(" ")];
      if (n > 1) candidates.push(window.map((span) => span.token).join(""));
      for (const candidate of candidates) {
        const targets = index.aliases.get(candidate);
        if (targets) {
          matched = { spans: window, targets };
          break;
        }
      }
    }
    if (matched) {
      matches.push(matched);
      i += matched.spans.length;
    } else {
      i += 1;
    }
  }
  return matches;
}

function uniqueLabel(names: Array<string | undefined>): string {
  const distinct = [...new Set(names.filter((name): name is string => !!name))];
  return distinct.slice(0, 2).join(" / ") + (distinct.length > 2 ? " …" : "");
}

/**
 * Splits `raw` into recognised filters and residual text. Filters of different kinds AND together; ids within one
 * filter OR together (e.g. "chemistry" alone matches every board's Chemistry). A phrase whose candidates are all
 * excluded by the other filters (e.g. "zimsec 0580") is not applied and stays in the residual text.
 */
export function parseSearchQuery(raw: string, index: CatalogueIndex, context: ParseContext = {}): ParsedQuery {
  const query = collapseWhitespace(raw);
  const none: ParsedQuery = {
    raw: query,
    residual: query,
    filters: { boardIds: null, qualificationIds: null, subjectIds: null },
    detected: [],
  };
  if (query === "" || context.subjectId || context.topicId) return none;

  const phrases = scanPhrases(tokenizeWithSpans(query), index);
  if (phrases.length === 0) return none;

  const detectBoards = !context.boardId && !context.qualificationId;
  const detectQualifications = !context.qualificationId && !context.levelId;

  // 1. Boards.
  const boardPhrases = detectBoards ? phrases.filter((p) => p.targets.board.size > 0 && !hasSubjectTargets(p)) : [];
  const boardIds = new Set(boardPhrases.flatMap((p) => [...p.targets.board]));
  const boardScope: ReadonlySet<string> | null = context.boardId
    ? new Set([context.boardId])
    : boardIds.size > 0
      ? boardIds
      : null;

  // 2. Levels / qualifications ("o level" is usually both a level name and a qualification short name).
  const qualificationScopeFromContext = context.qualificationId
    ? new Set([context.qualificationId])
    : context.levelId
      ? new Set(
          [...index.qualifications.values()]
            .filter((q) => q.levelId === context.levelId && (boardScope === null || boardScope.has(q.examBoardId)))
            .map((q) => q.id),
        )
      : null;

  const qualificationChips: Array<{ phrase: PhraseMatch; ids: string[]; kind: "level" | "qualification" }> = [];
  if (detectQualifications) {
    for (const phrase of phrases) {
      if (boardPhrases.includes(phrase) || hasSubjectTargets(phrase)) continue;
      const { level, qualification } = phrase.targets;
      if (level.size === 0 && qualification.size === 0) continue;
      const candidates = new Set(qualification);
      for (const q of index.qualifications.values()) if (level.has(q.levelId)) candidates.add(q.id);
      const ids = [...candidates].filter((id) => {
        const q = index.qualifications.get(id);
        return q !== undefined && (boardScope === null || boardScope.has(q.examBoardId));
      });
      if (ids.length > 0) qualificationChips.push({ phrase, ids, kind: level.size > 0 ? "level" : "qualification" });
    }
  }
  let qualificationScope: ReadonlySet<string> | null = qualificationScopeFromContext;
  if (qualificationChips.length > 0) {
    // Several level/qualification phrases ("igcse o level") OR together.
    qualificationScope = new Set(qualificationChips.flatMap((chip) => chip.ids));
  }

  // 3. Subjects (by code or name), narrowed by the board / qualification scope.
  const subjectChips: Array<{ phrase: PhraseMatch; ids: string[]; byCode: boolean }> = [];
  for (const phrase of phrases) {
    if (!hasSubjectTargets(phrase)) continue;
    const byCode = phrase.targets.code.size > 0;
    const candidates = byCode ? phrase.targets.code : phrase.targets.subject;
    const ids = [...candidates].filter((id) => {
      const subject = index.subjects.get(id);
      if (!subject) return false;
      if (qualificationScope !== null && !qualificationScope.has(subject.qualificationId)) return false;
      if (boardScope !== null) {
        const q = index.qualifications.get(subject.qualificationId);
        if (!q || !boardScope.has(q.examBoardId)) return false;
      }
      return true;
    });
    if (ids.length > 0) subjectChips.push({ phrase, ids, byCode });
  }

  const applied: PhraseMatch[] = [
    ...boardPhrases,
    ...qualificationChips.map((chip) => chip.phrase),
    ...subjectChips.map((chip) => chip.phrase),
  ];
  if (applied.length === 0) return none;

  const detected: DetectedFilter[] = [];
  for (const phrase of boardPhrases) {
    const ids = [...phrase.targets.board];
    detected.push({
      kind: "board",
      ids,
      label: uniqueLabel(ids.map((id) => index.boards.get(id)?.shortName)),
      matchedText: phraseText(query, phrase),
      removeQuery: removePhrases(query, [phrase]),
      byCode: false,
    });
  }
  for (const chip of qualificationChips) {
    const label =
      chip.kind === "level"
        ? uniqueLabel([...chip.phrase.targets.level].map((id) => index.levels.get(id)?.name))
        : uniqueLabel(chip.ids.map((id) => index.qualifications.get(id)?.name));
    detected.push({
      kind: chip.kind,
      ids: chip.ids,
      label,
      matchedText: phraseText(query, chip.phrase),
      removeQuery: removePhrases(query, [chip.phrase]),
      byCode: false,
    });
  }
  for (const chip of subjectChips) {
    detected.push({
      kind: "subject",
      ids: chip.ids,
      label: uniqueLabel(chip.ids.map((id) => index.subjects.get(id)?.name)),
      matchedText: phraseText(query, chip.phrase),
      removeQuery: removePhrases(query, [chip.phrase]),
      byCode: chip.byCode,
    });
  }

  const subjectIds = subjectChips.length > 0 ? [...new Set(subjectChips.flatMap((chip) => chip.ids))] : null;
  return {
    raw: query,
    residual: removePhrases(query, applied),
    filters: {
      boardIds: boardPhrases.length > 0 ? [...boardIds] : null,
      qualificationIds: qualificationChips.length > 0 && qualificationScope ? [...qualificationScope] : null,
      subjectIds,
    },
    detected,
  };
}

function hasSubjectTargets(phrase: PhraseMatch): boolean {
  return phrase.targets.subject.size > 0 || phrase.targets.code.size > 0;
}
