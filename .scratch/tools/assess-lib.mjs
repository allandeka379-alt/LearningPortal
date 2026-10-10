// Shared helpers for per-family assessment builders (topic tests and mock exams), extracted from
// .scratch/english/build-assessments.mjs. A family builder:
//   import { setup, topicTest, autoTopicTests, examRule, mock, finish } from "../tools/assess-lib.mjs";
//   const S = setup("geography-o", { zim: "zimsec/o-level/geography/2015-2022", cam: "cambridge/igcse/geography/2027-2029" });
//   ... build tests with topicTest(S.zim, {...}) / autoTopicTests(S.zim, {...}) and mocks with mock(S.zim, {...}) ...
//   finish(S, { zim: { tests, mocks, file: "zimsec" }, cam: {...} }, { expectedMarks: { "mock.x": 100 } });
// Input: .scratch/<folder>/inventory.json from `npx tsx --conditions=react-server .scratch/tools/inventory.ts <family> <out>`.
// Run a builder with --report to print every rule's pool and --write to write the files (only when every rule is
// guaranteed: each rule has at least `count` candidates after earlier rules of the same paper have taken theirs).
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

export function setup(family, versions, inventoryPath) {
  const invFile = inventoryPath ?? path.join(ROOT, `.scratch/${family.replace(/-o$|-a$/, "")}/inventory.json`);
  const inv = JSON.parse(fs.readFileSync(invFile, "utf8"));
  const S = { family, problems: [], report: [] };
  for (const [id, versionPath] of Object.entries(versions)) {
    const parts = versionPath.split("/");
    const ref = parts.slice(0, 3).join("/");
    const file = JSON.parse(fs.readFileSync(path.join(ROOT, `content/syllabi/${versionPath}.json`), "utf8"));
    const nodes = new Map();
    const walk = (n) => {
      nodes.set(n.key, n);
      (n.children ?? []).forEach(walk);
    };
    file.topics.forEach(walk);
    S[id] = { id, ref, versionPath, file, nodes, inv: inv[versionPath] ?? [], S };
    if (!inv[versionPath]) S.problems.push(`no inventory rows for ${versionPath}`);
  }
  return S;
}

/** Candidate questions of a rule, as the validator filters them (PREMIUM tests accept every access tier). */
export function pool(s, rule) {
  const topic = rule.topics[0];
  if (!s.nodes.has(topic)) throw new Error(`${s.ref}: unknown node ${topic}`);
  return s.inv.filter((r) => {
    if (!r.lineages.some((l) => l.includes(topic))) return false;
    const [lo, hi] = rule.difficulty ?? [1, 5];
    if (r.difficulty < lo || r.difficulty > hi) return false;
    if (rule.type && r.type !== rule.type) return false;
    if (rule.marksPerQuestion && r.marks !== rule.marksPerQuestion) return false;
    if (rule.examStyleOnly && !r.examStyle) return false;
    if (rule.skill && r.skill !== rule.skill) return false;
    return true;
  });
}

export function checkAssessment(s, a) {
  const rules = a.sections.flatMap((sec, si) => sec.rules.map((rule, ri) => ({ rule, label: `s${si + 1}r${ri + 1}` })));
  const sets = rules.map(({ rule }) => new Set(pool(s, rule).map((r) => r.key)));
  rules.forEach(({ rule, label }, i) => {
    let mayBeTaken = 0;
    for (let j = 0; j < i; j += 1) {
      let overlap = 0;
      for (const k of sets[j]) if (sets[i].has(k)) overlap += 1;
      mayBeTaken += Math.min(rules[j].rule.count, overlap);
    }
    const n = sets[i].size;
    const desc = `${a.key}@${s.ref} ${label} ${rule.topics[0]} n=${rule.count} m=${rule.marksPerQuestion ?? "*"} d=${(rule.difficulty ?? [1, 5]).join("-")}${rule.type ? " " + rule.type : ""}${rule.examStyleOnly ? " exam" : ""}${rule.skill ? " " + rule.skill : ""}`;
    s.S.report.push(`${desc} -> pool ${n}${mayBeTaken ? ` (overlap ${mayBeTaken})` : ""}`);
    if (n < rule.count) s.S.problems.push(`${desc}: needs ${rule.count}, pool ${n}`);
    else if (n - mayBeTaken < rule.count) s.S.problems.push(`${desc}: not guaranteed (pool ${n}, earlier rules may take ${mayBeTaken})`);
  });
}

export const sectionMarks = (sec) => (sec.answerCount ? sec.marks : sec.rules.reduce((u, r) => u + r.count * r.marksPerQuestion, 0));
export const marksOf = (a) => a.sections.reduce((t, sec) => t + sectionMarks(sec), 0);
export const countOf = (a) => a.sections.reduce((t, sec) => t + sec.rules.reduce((u, r) => u + r.count, 0), 0);
export const list = (items) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
export const plainName = (name) => name.replace(/^\d+(\.\d+)*\s*/, "");

function spreadOnes(s, unitKeys, n1) {
  const one = (key, count) => ({ topics: [key], count, difficulty: [1, 3], marksPerQuestion: 1 });
  const pools = unitKeys.map((key) => ({ key, n: pool(s, one(key, 1)).length })).filter((p) => p.n > 0);
  if (pools.length > n1) {
    pools.sort((a, b) => b.n - a.n);
    pools.length = n1;
  }
  const alloc = new Map(pools.map((p) => [p.key, 1]));
  let left = n1 - pools.length;
  for (let guard = 0; left > 0 && guard < 10000; guard += 1) {
    const order = [...pools].sort((a, b) => b.n / alloc.get(b.key) - a.n / alloc.get(a.key));
    const p = order[0];
    if (!p || alloc.get(p.key) >= Math.floor(p.n / 2)) break;
    alloc.set(p.key, alloc.get(p.key) + 1);
    left -= 1;
  }
  if (left > 0) throw new Error(`${s.ref} ${unitKeys.join(",")}: cannot spread ${n1} one-mark questions`);
  return unitKeys.filter((k) => alloc.has(k)).map((k) => one(k, alloc.get(k)));
}

/**
 * Section B for a topic test: one medium (2-4 marks) and one longer question (marks from `longMarks`, never a value in
 * `reserved` for its type), from the given nodes, with different marks so the two rules never compete.
 */
function sectionB(s, nodes, total, minOnes, { longMarks = [5, 6, 7, 8, 9, 10, 12], reserved = [] } = {}) {
  const options = [];
  for (const medNode of nodes) {
    for (const m of [2, 3, 4]) {
      const med = { topics: [medNode], count: 1, difficulty: [2, 4], marksPerQuestion: m };
      const nMed = pool(s, med).length;
      if (nMed < 1) continue;
      for (const longNode of nodes) {
        for (const l of longMarks) {
          if (l === m || reserved.includes(l)) continue;
          const long = { topics: [longNode], count: 1, difficulty: [3, 5], marksPerQuestion: l };
          const nLong = pool(s, long).length;
          if (nLong < 1) continue;
          const n1 = total - m - l;
          if (n1 < minOnes) continue;
          let score = Math.min(Math.log2(nMed + 1), 3) + Math.min(Math.log2(nLong + 1), 3) * 1.5;
          if (medNode !== longNode) score += 0.5;
          if (l >= 5 && l <= 7) score += 0.8;
          score -= Math.abs(n1 - 12) * 0.25;
          options.push({ med, long, n1, score });
        }
      }
    }
  }
  options.sort((a, b) => b.score - a.score);
  return options[0] ?? null;
}

const TOPIC_TEST_INSTRUCTIONS =
  "Answer every question. You have 25 minutes.\n\n- Multiple-choice, true/false, matching, gap-fill, numerical and most short answers are marked automatically when you submit.\n- Written answers cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer honestly.";

/**
 * A 20-mark, 25-minute topic test. spec: { key, title, about, topics: [scope node keys], units?: [node keys for
 * Section A], keyPrefix, total?: 20, minutes?: 25, reserved?: [mark values never used in Section B] }.
 */
export function topicTest(s, spec) {
  const total = spec.total ?? 20;
  const childKeys = (s.nodes.get(spec.topics[0]).children ?? []).map((c) => c.key);
  const unitKeys = spec.units ?? (childKeys.length ? childKeys : spec.topics);
  const b = sectionB(s, [...new Set([...spec.topics, ...unitKeys])], total, Math.min(unitKeys.length, 8), { reserved: spec.reserved ?? [] });
  const n1 = b ? b.n1 : total;
  const ones = spreadOnes(s, unitKeys, n1);
  const sections = [{ title: "Section A: short questions", instructions: "Each question is worth 1 mark.", rules: ones }];
  if (b) {
    sections.push({
      title: "Section B: longer questions",
      instructions: `These questions are worth ${b.med.marksPerQuestion} and ${b.long.marksPerQuestion} marks. Use the marks as a guide to how much to write.`,
      rules: [b.med, b.long],
    });
  }
  const minutes = spec.minutes ?? 25;
  const a = {
    key: `${spec.keyPrefix}.${spec.key}.topic-test`,
    kind: "TOPIC_TEST",
    title: `${spec.title}: topic test`,
    description: `A ${minutes}-minute test on ${spec.about}: ${countOf({ sections })} questions, ${total} marks, from quick questions to ${b ? "longer answers" : "exam-style items"}. Questions are drawn at random from the question bank, so every attempt is different.`,
    instructions: TOPIC_TEST_INSTRUCTIONS.replace("25 minutes", `${minutes} minutes`),
    timeLimitMinutes: minutes,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions: true,
    syllabus: s.ref,
    scope: { topics: spec.topics },
    sections,
  };
  if (marksOf(a) !== total) throw new Error(`${a.key}: ${marksOf(a)} marks`);
  return a;
}

/**
 * One topic test per top-level topic (or per SECTION child topic when the top level is SECTIONs). Topics whose bank is
 * too small are skipped and reported (merge them by hand with `topicTest` if needed). opts: { keyPrefix, reserved,
 * skip: [node keys], about: (node) => string }.
 */
export function autoTopicTests(s, opts) {
  const tops = s.file.topics.flatMap((t) => (t.kind === "SECTION" ? t.children ?? [] : [t]));
  const out = [];
  for (const t of tops) {
    if ((opts.skip ?? []).includes(t.key)) continue;
    try {
      out.push(topicTest(s, { key: t.key, title: plainName(t.name), about: opts.about ? opts.about(t) : plainName(t.name).toLowerCase(), topics: [t.key], keyPrefix: opts.keyPrefix, reserved: opts.reserved }));
    } catch (error) {
      s.S.problems.push(`topic test ${t.key}@${s.ref} skipped: ${error.message}`);
    }
  }
  return out;
}

/** A blueprint rule for exam-format items: type + exact marks + examStyle. */
export const examRule = (topic, type, marks, count = 1, difficulty = [3, 5], extra = {}) => ({ topics: [topic], count, difficulty, type, marksPerQuestion: marks, examStyleOnly: true, ...extra });
/**
 * Overlap-aware allocation of `n` draws over topics (rules in topic order). A draw goes to the topic with the biggest
 * pool per draw, capped at max(1, floor(pool / 2)) so attempts vary, and only while every rule stays guaranteed in the
 * validator's sense (a rule's pool minus what earlier rules may take from the same questions >= its count): an item
 * tagged under two topics can otherwise be drawn by the earlier rule and leave the later one short.
 */
function spreadAlloc(s, makeRule, n, topics, label, full = false) {
  const sets = topics.map((k) => new Set(pool(s, makeRule(k, 1)).map((r) => r.key)));
  const overlap = topics.map((_, i) => topics.map((__, j) => (j < i ? [...sets[j]].filter((x) => sets[i].has(x)).length : 0)));
  const alloc = topics.map(() => 0);
  const guaranteed = () =>
    topics.every((_, i) => {
      if (!alloc[i]) return true;
      let taken = 0;
      for (let j = 0; j < i; j += 1) taken += Math.min(alloc[j], overlap[i][j]);
      return sets[i].size - taken >= alloc[i];
    });
  let placed = 0;
  for (; placed < n; placed += 1) {
    let best = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < topics.length; i += 1) {
      const size = sets[i].size;
      if (size === 0 || alloc[i] + 1 > (full ? size : Math.max(1, Math.floor(size / 2)))) continue;
      alloc[i] += 1;
      const ok = guaranteed();
      alloc[i] -= 1;
      if (!ok) continue;
      const score = size / (alloc[i] + 1);
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    }
    if (best < 0) break;
    alloc[best] += 1;
  }
  if (placed < n) s.S.problems.push(`${s.ref}: ${label}: only ${placed} of ${n} draws placed (pools ${topics.map((k, i) => `${k}:${sets[i].size}`).join(" ")})`);
  return topics.map((k, i) => (alloc[i] ? makeRule(k, alloc[i]) : null)).filter(Boolean);
}

/** Spreads `n` exam-format draws (type + exact marks + examStyle) over the given topics. */
export function examSpread(s, { type, marks, n, topics, difficulty = [3, 5], skill, full = false }) {
  // full: allow a topic's whole pool (thin exam banks); every attempt then repeats more items.
  return spreadAlloc(s, (k, c) => examRule(k, type, marks, c, difficulty, skill ? { skill } : {}), n, topics, `examSpread ${type} ${marks}${skill ? " " + skill : ""}`, full);
}

/** Spreads `n` one-mark single-answer MCQ draws over the given topics. */
export function mcqSpread(s, { n, topics, difficulty = [1, 4] }) {
  return spreadAlloc(s, (k, c) => mcqRule(k, c, difficulty), n, topics, "mcqSpread");
}

/** A rule for one-mark single-answer MCQs. */
export const mcqRule = (topic, count, difficulty = [1, 4]) => ({ topics: [topic], count, difficulty, type: "MULTIPLE_CHOICE", marksPerQuestion: 1 });

export const DISCLAIMER = "This is an original practice paper written for this platform in the style of the real examination. It is not an official paper, and its questions are not past-paper questions.";
export const SELF_MARK = "Written answers cannot be marked automatically: after you submit, each one is shown with our mark scheme so that you can mark your own answer honestly. Multiple-choice, numerical and short factual answers are marked automatically.";

export function mock(s, { key, title, description, instructions, minutes, sections, shuffleOptions = true }) {
  return {
    key,
    kind: "MOCK_EXAM",
    title,
    description: `${description} ${DISCLAIMER}`,
    instructions,
    timeLimitMinutes: minutes,
    access: "PREMIUM",
    feedback: "AFTER_SUBMIT",
    shuffleQuestions: false,
    shuffleOptions,
    syllabus: s.ref,
    sections,
  };
}

/**
 * Checks every assessment, prints a summary and (with --write and no problems) writes
 * content/subjects/<family>/assessments/{topic-tests,mocks}/<file>-{topic-tests,mocks}.json.
 * plan: { <id>: { tests, mocks, file } }; opts.expectedMarks: { mockKey: marks }.
 */
export function finish(S, plan, opts = {}) {
  const args = process.argv.slice(2);
  for (const [id, { tests, mocks }] of Object.entries(plan)) {
    const s = S[id];
    for (const a of [...tests, ...mocks]) checkAssessment(s, a);
    for (const m of mocks) {
      const want = opts.expectedMarks?.[m.key];
      if (want !== undefined && marksOf(m) !== want) S.problems.push(`${m.key}: ${marksOf(m)} marks, expected ${want}`);
    }
    for (const a of tests) console.log(`${a.key}: ${countOf(a)} q, ${marksOf(a)} marks${a.sections[1] ? `; B ${a.sections[1].rules.map((r) => `${r.topics[0]}:${r.marksPerQuestion}`).join(" ")}` : ""}`);
    for (const m of mocks) console.log(`${m.key}: ${countOf(m)} q, ${marksOf(m)} marks, ${m.timeLimitMinutes} min`);
  }
  if (args.includes("--report")) console.log(S.report.join("\n"));
  if (S.problems.length) {
    console.log(`\n${S.problems.length} problem(s):\n${S.problems.join("\n")}`);
    process.exitCode = 1;
  } else console.log("every rule guaranteed");
  if (args.includes("--write") && S.problems.length === 0) {
    const dir = path.join(ROOT, `content/subjects/${S.family}/assessments`);
    fs.mkdirSync(path.join(dir, "topic-tests"), { recursive: true });
    fs.mkdirSync(path.join(dir, "mocks"), { recursive: true });
    for (const { tests, mocks, file } of Object.values(plan)) {
      if (tests.length) fs.writeFileSync(path.join(dir, `topic-tests/${file}-topic-tests.json`), JSON.stringify(tests, null, 2) + "\n");
      if (mocks.length) fs.writeFileSync(path.join(dir, `mocks/${file}-mocks.json`), JSON.stringify(mocks, null, 2) + "\n");
    }
    console.log("written");
  }
}
