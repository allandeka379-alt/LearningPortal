// Balances where the correct option sits in multiple-choice questions, for content generators that write question
// files (physics-o, combined-science-o). Same rules as .scratch/chem-assemble2/rebalance-mcq.cjs (chemistry-o):
//
// The player shows options in their stored order (no question sets payload.shuffleOptions), so authored banks where
// the key is usually A let a student score by always choosing A.
//
// - Single-answer MCQs with 4 options (top level and parts of structured questions): per question FILE each letter
//   gets a quota of floor(n/4) or ceil(n/4) keys; MCQs at an under-quota letter keep their order, the others move the
//   correct option to a letter with spare quota (seeded by the question key, so the result is reproducible).
// - Single-answer MCQs with 3, 5 or 6 options, and multi-select MCQs: the options are put in a seeded order.
// - Skipped (left as authored): options that are all numbers in ascending or descending order, options that refer to
//   other options ("all of the above", "both", "A and B"), and MCQs whose text names an option letter.
//
// Distractors keep their authored relative order when only the key moves. Keys are re-lettered A, B, C... in the new
// order, and optionKeys in modelResponse and wrongResponses (top level and STRUCTURED parts) are remapped.
const LETTERS = ["A", "B", "C", "D", "E", "F"];

function hash(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(list, seed) {
  const out = [...list];
  const r = rng(hash(seed));
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const num = (content) => {
  const m = /^\s*\$?\s*(-?[0-9][0-9.,]*)/.exec(content);
  return m ? parseFloat(m[1].replace(/,/g, "")) : null;
};
function skipReason(mcq) {
  const nums = mcq.options.map((o) => num(o.content));
  if (nums.every((n) => n !== null && Number.isFinite(n))) {
    const asc = nums.every((n, i) => i === 0 || n >= nums[i - 1]);
    const desc = nums.every((n, i) => i === 0 || n <= nums[i - 1]);
    if (asc || desc) return "sorted numbers";
  }
  if (mcq.options.some((o) => /\b(of the above|of these|both [A-F]\b|neither [A-F]\b|[A-F] and [A-F]\b)/i.test(o.content))) return "refers to other options";
  const texts = [mcq.stem, mcq.explanation, mcq.workedSolution, ...(mcq.hints ?? []), ...mcq.options.map((o) => o.rationale)].filter(Boolean).join(" ");
  if (/\b(option|options|answer|choice)s?\s+\(?[A-F]\)?(?![a-z])|\banswer is \(?[A-F]\)?\b/i.test(texts)) return "text names an option letter";
  return null;
}

/** Every MCQ in a question (top level or nested part) with the label used in responses. */
function mcqsOf(q) {
  const out = [];
  const add = (node, label) => {
    if (node.type === "MULTIPLE_CHOICE" && Array.isArray(node.options)) out.push({ node, label, root: q, multiple: node.payload?.selectMode === "multiple" });
  };
  add(q, null);
  for (const p of q.parts ?? []) {
    add(p, p.label);
    for (const s of p.parts ?? []) add(s, `${p.label}${s.label}`);
  }
  return out;
}

function remapResponse(response, label, map) {
  if (!response) return;
  const target = label === null ? response : response.parts?.[label];
  if (target && target.type === "MULTIPLE_CHOICE" && Array.isArray(target.optionKeys)) target.optionKeys = target.optionKeys.map((k) => map.get(k) ?? k);
}

function applyOrder(m, reordered) {
  const map = new Map();
  reordered.forEach((o, k) => map.set(o.key, LETTERS[k]));
  m.node.options = reordered.map((o, k) => {
    const { key, ...rest } = o;
    return { key: LETTERS[k], ...rest };
  });
  remapResponse(m.root.modelResponse, m.label, map);
  for (const w of m.root.wrongResponses ?? []) remapResponse(w, m.label, map);
}

/**
 * Rebalances the MCQs of one question file in place. `fileId` seeds the quota order. Returns a report
 * { mcqs, moved, skipped: {reason: n}, before: {A: n...}, after: {A: n...} } for single-answer 4-option MCQs.
 */
export function rebalanceQuestions(questions, fileId) {
  const report = { mcqs: 0, moved: 0, reordered: 0, skipped: {}, before: {}, after: {} };
  const all = questions.flatMap((q) => mcqsOf(q));
  const four = all.filter((m) => !m.multiple && m.node.options.length === 4);
  const others = all.filter((m) => m.multiple || m.node.options.length !== 4);
  report.mcqs = four.length;

  // Single-answer 4-option MCQs: quotas per letter.
  const n = four.length;
  const left = new Map();
  shuffled(LETTERS.slice(0, 4), `quota:${fileId}`).forEach((L, i) => left.set(L, Math.floor(n / 4) + (i < n % 4 ? 1 : 0)));
  const current = four.map((m) => m.node.options.findIndex((o) => o.correct === true));
  current.forEach((idx) => (report.before[LETTERS[idx]] = (report.before[LETTERS[idx]] ?? 0) + 1));
  const plan = four.map(() => null);
  four.forEach((m, i) => {
    const reason = skipReason(m.node);
    if (!reason) return;
    report.skipped[reason] = (report.skipped[reason] ?? 0) + 1;
    plan[i] = current[i];
    left.set(LETTERS[current[i]], (left.get(LETTERS[current[i]]) ?? 0) - 1);
  });
  four.forEach((m, i) => {
    if (plan[i] !== null) return;
    const L = LETTERS[current[i]];
    if ((left.get(L) ?? 0) > 0) {
      plan[i] = current[i];
      left.set(L, left.get(L) - 1);
    }
  });
  four.forEach((m, i) => {
    if (plan[i] !== null) return;
    const spare = LETTERS.slice(0, 4).filter((L) => (left.get(L) ?? 0) > 0);
    const pool = spare.length > 0 ? spare : LETTERS.slice(0, 4).filter((L) => L !== LETTERS[current[i]]);
    const pick = pool[Math.floor(rng(hash(`${m.root.key}${m.label ?? ""}`))() * pool.length)];
    plan[i] = LETTERS.indexOf(pick);
    left.set(pick, (left.get(pick) ?? 0) - 1);
  });
  four.forEach((m, i) => {
    const target = plan[i];
    report.after[LETTERS[target]] = (report.after[LETTERS[target]] ?? 0) + 1;
    if (target === current[i]) return;
    const opts = m.node.options;
    const correct = opts[current[i]];
    const rest = opts.filter((_, k) => k !== current[i]);
    applyOrder(m, [...rest.slice(0, target), correct, ...rest.slice(target)]);
    report.moved += 1;
  });

  // Multi-select MCQs and MCQs with 3, 5 or 6 options: seeded order of all options.
  for (const m of others) {
    const reason = skipReason(m.node);
    if (reason) {
      report.skipped[reason] = (report.skipped[reason] ?? 0) + 1;
      continue;
    }
    const order = shuffled(m.node.options, `order:${m.root.key}${m.label ?? ""}`);
    if (order.every((o, k) => o.key === m.node.options[k].key)) continue;
    applyOrder(m, order);
    report.reordered += 1;
  }
  return report;
}
