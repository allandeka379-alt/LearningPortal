// Rebalances the position of the correct option in single-answer MCQs of the chemistry-o question bank.
//
// Why: the player shows options in their stored order, labelled by their key (A, B, C, D), and no chemistry MCQ sets
// payload.shuffleOptions; 650 of 1,362 single-answer MCQs had the correct option at A (every one in bonding and the
// Periodic Table files), so a student could score by always choosing A.
//
// What: per question FILE, each letter gets a quota of floor(n/4) or ceil(n/4) correct answers (n = single-answer
// 4-option MCQs in the file, including MCQ parts of structured questions). MCQs already at an under-quota letter keep
// their order; the others move their correct option to a letter with spare quota (seeded by the question key, so the
// result is reproducible). The correct option is removed and inserted at the target position; distractors keep their
// authored relative order. Keys are re-lettered A, B, C, D in the new order, and every optionKeys in modelResponse and
// wrongResponses (top level and STRUCTURED parts) is mapped from old to new keys. Options are never edited.
//
// Skipped (kept in place, still counted): options that are all numbers in ascending or descending order (exam style
// lists numerical options in order), options that refer to other options ("all of the above", "both", "neither"),
// and MCQs whose text names an option letter.
//
// Usage: node .scratch/chem-assemble2/rebalance-mcq.cjs [--write]   (prints a per-file report; --write saves files)
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const DIR = path.join(ROOT, "content/subjects/chemistry-o/questions");
const WRITE = process.argv.includes("--write");
const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(path.join(dir, e.name)) : e.name.endsWith(".json") ? [path.join(dir, e.name)] : []));
}
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
  if (mcq.options.some((o) => /\b(of the above|of these|both [A-D]\b|neither [A-D]\b|[A-D] and [A-D]\b)/i.test(o.content))) return "refers to other options";
  const texts = [mcq.stem, mcq.explanation, mcq.workedSolution, ...(mcq.hints ?? []), ...mcq.options.map((o) => o.rationale)].filter(Boolean).join(" ");
  if (/\b(option|options|answer|choice)s?\s+\(?[A-D]\)?(?![a-z])|\banswer is \(?[A-D]\)?\b/i.test(texts)) return "text names an option letter";
  return null;
}

/** Every single-answer MCQ in a question (top level or nested part) with the path used in responses. */
function mcqsOf(q) {
  const out = [];
  if (q.type === "MULTIPLE_CHOICE" && (q.payload?.selectMode ?? "single") === "single") out.push({ node: q, label: null, root: q });
  for (const p of q.parts ?? []) {
    if (p.type === "MULTIPLE_CHOICE" && (p.payload?.selectMode ?? "single") === "single") out.push({ node: p, label: p.label, root: q });
    for (const s of p.parts ?? []) if (s.type === "MULTIPLE_CHOICE" && (s.payload?.selectMode ?? "single") === "single") out.push({ node: s, label: `${p.label}${s.label}`, root: q });
  }
  return out;
}

function remapResponse(response, label, map) {
  if (!response) return;
  if (label === null) {
    if (response.type === "MULTIPLE_CHOICE" && Array.isArray(response.optionKeys)) response.optionKeys = response.optionKeys.map((k) => map.get(k) ?? k);
    return;
  }
  const part = response.parts?.[label];
  if (part && part.type === "MULTIPLE_CHOICE" && Array.isArray(part.optionKeys)) part.optionKeys = part.optionKeys.map((k) => map.get(k) ?? k);
}

const totals = { before: {}, after: {}, moved: 0, skipped: {}, files: 0, filesChanged: 0, mcqs: 0 };
const changedKeys = [];
for (const file of files(DIR).sort()) {
  const text = fs.readFileSync(file, "utf8");
  const data = JSON.parse(text);
  const items = data.flatMap((q) => mcqsOf(q)).filter((m) => m.node.options?.length === 4);
  totals.files += 1;
  if (items.length === 0) continue;
  totals.mcqs += items.length;
  const n = items.length;
  const quota = new Map(LETTERS.slice(0, 4).map((L, i) => [L, Math.floor(n / 4) + (i < n % 4 ? 1 : 0)]));
  // Spread the "+1" quotas by a seeded order so files with n % 4 != 0 do not always favour A.
  const order = LETTERS.slice(0, 4);
  const r0 = rng(hash(path.relative(ROOT, file)));
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(r0() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  quota.clear();
  order.forEach((L, i) => quota.set(L, Math.floor(n / 4) + (i < n % 4 ? 1 : 0)));

  const current = items.map((m) => m.node.options.findIndex((o) => o.correct === true));
  for (const idx of current) totals.before[LETTERS[idx]] = (totals.before[LETTERS[idx]] ?? 0) + 1;
  const left = new Map(quota);
  const plan = items.map(() => null);
  // 1. Skipped items keep their position (they may exceed a quota; the others then make room).
  items.forEach((m, i) => {
    const reason = skipReason(m.node);
    if (reason) {
      totals.skipped[reason] = (totals.skipped[reason] ?? 0) + 1;
      plan[i] = current[i];
      left.set(LETTERS[current[i]], (left.get(LETTERS[current[i]]) ?? 0) - 1);
    }
  });
  // 2. Items at a letter with spare quota keep their position (first come, first kept).
  items.forEach((m, i) => {
    if (plan[i] !== null) return;
    const L = LETTERS[current[i]];
    if ((left.get(L) ?? 0) > 0) {
      plan[i] = current[i];
      left.set(L, left.get(L) - 1);
    }
  });
  // 3. The rest move to letters with spare quota, in a seeded order.
  items.forEach((m, i) => {
    if (plan[i] !== null) return;
    const spare = LETTERS.slice(0, 4).filter((L) => (left.get(L) ?? 0) > 0);
    const pool = spare.length > 0 ? spare : LETTERS.slice(0, 4).filter((L) => L !== LETTERS[current[i]]);
    const pick = pool[Math.floor(rng(hash(`${m.root.key}${m.label ?? ""}`))() * pool.length)];
    plan[i] = LETTERS.indexOf(pick);
    left.set(pick, (left.get(pick) ?? 0) - 1);
  });

  let changed = false;
  items.forEach((m, i) => {
    const target = plan[i];
    totals.after[LETTERS[target]] = (totals.after[LETTERS[target]] ?? 0) + 1;
    if (target === current[i]) return;
    const opts = m.node.options;
    const correct = opts[current[i]];
    const rest = opts.filter((_, k) => k !== current[i]);
    const reordered = [...rest.slice(0, target), correct, ...rest.slice(target)];
    const map = new Map();
    reordered.forEach((o, k) => map.set(o.key, LETTERS[k]));
    m.node.options = reordered.map((o, k) => ({ ...o, key: LETTERS[k] }));
    // Key order inside each option object stays as authored ("key" first).
    m.node.options = m.node.options.map((o) => {
      const { key, ...restFields } = o;
      return { key, ...restFields };
    });
    remapResponse(m.root.modelResponse, m.label, map);
    for (const w of m.root.wrongResponses ?? []) remapResponse(w, m.label, map);
    totals.moved += 1;
    changed = true;
    changedKeys.push(`${m.root.key}${m.label ?? ""}: ${LETTERS[current[i]]} -> ${LETTERS[target]}`);
  });
  if (changed) {
    totals.filesChanged += 1;
    if (WRITE) fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  }
}
console.log(JSON.stringify(totals, null, 1));
fs.writeFileSync(path.join(__dirname, "rebalance-changes.txt"), changedKeys.join("\n") + "\n");
console.log(`${changedKeys.length} MCQs ${WRITE ? "rewritten" : "would move"}; list in .scratch/chem-assemble2/rebalance-changes.txt`);
