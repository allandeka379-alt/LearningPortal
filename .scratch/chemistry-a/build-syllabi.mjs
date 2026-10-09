// Builds content/concepts/chemistry-a.json and the two A-Level Chemistry syllabus files:
//   content/syllabi/zimsec/a-level/chemistry/2015-2022.json      (ZIMSEC A-Level Chemistry, Forms 5-6)
//   content/syllabi/cambridge/a-level/chemistry/2025-2027.json   (Cambridge International AS & A Level Chemistry 9701)
// Sources (local only, not in git): .scratch/chemistry-a/sources/zimsec-chemistry.pdf (+ .txt) and 9701-2025-2027.pdf
// (+ .txt). The concept registry is ./concepts.mjs, the trees are ./zimsec.mjs and ./cambridge.mjs; this script checks
// them and prepends each concept's coverage label.
// Run from the repo root: node .scratch/chemistry-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";
import { zimsec } from "./zimsec.mjs";
import { c9701 } from "./cambridge.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^achem\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
const names = new Set();
for (const [, n] of CONCEPTS) {
  if (names.has(n)) throw new Error(`duplicate concept name ${n}`);
  names.add(n);
}

// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique, paper codes exist;
// report what each syllabus leaves out and which nodes cover nothing. Then label each concept with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9701]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  const papers = new Set(s.components.map((c) => c.code));
  const empty = [];
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      for (const p of n.components ?? []) if (!papers.has(p)) throw new Error(`${s.board}: ${n.key} names unknown paper ${p}`);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      if (!(n.children ?? []).length && !(n.covers ?? []).length) {
        if (!n.description) throw new Error(`${s.board}: ${n.key} covers nothing and has no description saying where it is taught`);
        empty.push(n.code);
      }
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; leaf nodes covering nothing: ${empty.join(", ") || "none"}; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "chemistry-a",
  name: "Chemistry (A-Level / AS & A Level)",
  level: "A",
  prefix: "achem",
  subjects: ["zimsec/a-level/chemistry", "cambridge/a-level/chemistry"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/chemistry-a.json", registry);
write("content/syllabi/zimsec/a-level/chemistry/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/chemistry/2025-2027.json", c9701);
