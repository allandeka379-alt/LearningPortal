// Pool sizes for rules per syllabus node and mark value, as the validator filters them (lineage-aware: ZIMSEC topics
// sit under SECTION nodes whose keys are not prefixes of theirs).
// Usage: node pools.cjs <zimsec|cambridge> <dmin> <dmax> <exam:0|1> topic...
const fs = require("fs");
const inv = JSON.parse(fs.readFileSync(".scratch/chem-assemble2/inventory.json", "utf8"));
const files = { zimsec: "content/syllabi/zimsec/o-level/chemistry/2015-2022.json", cambridge: "content/syllabi/cambridge/igcse/chemistry/2026-2028.json" };
const [syl, lo, hi, exam, ...topics] = process.argv.slice(2);
const parent = new Map();
const walk = (n, p) => { parent.set(n.key, p); for (const c of n.children ?? []) walk(c, n.key); };
JSON.parse(fs.readFileSync(files[syl], "utf8")).topics.forEach((t) => walk(t, null));
const within = (k, a) => { for (let x = k; x; x = parent.get(x)) if (x === a) return true; return false; };
const key = Object.keys(inv).find((k) => k.startsWith(syl));
const pool = (topic, marks) => inv[key].filter((r) => r.nodes.some((n) => within(n, topic)) && r.difficulty >= +lo && r.difficulty <= +hi && r.marks === marks && (exam !== "1" || r.examStyle));
for (const t of topics) {
  if (!parent.has(t)) throw new Error(`unknown topic ${t}`);
  const row = [];
  for (let m = 1; m <= 10; m += 1) { const n = pool(t, m).length; if (n) row.push(`${m}m:${n}`); }
  console.log(t.padEnd(52), row.join("  "));
}
