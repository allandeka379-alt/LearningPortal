// Chooses mark values for a fixed list of single-topic exam-style rules so that the marks add up to a target and the
// candidate pools are as large as possible (maximise the smallest pool, then the summed capped log of the pools).
// Rules on the same topic must use different marks (so they never compete for the same questions).
// Usage: node optimise.cjs <zimsec|cambridge> <total> <dmin> <dmax> topic[=m1/m2...] ...
const fs = require("fs");
const inv = JSON.parse(fs.readFileSync(".scratch/chem-assemble2/inventory.json", "utf8"));
const [syl, totalS, lo, hi, ...specs] = process.argv.slice(2);
const key = Object.keys(inv).find((k) => k.startsWith(syl));
const files = {
  zimsec: "content/syllabi/zimsec/o-level/chemistry/2015-2022.json",
  cambridge: "content/syllabi/cambridge/igcse/chemistry/2026-2028.json",
};
const file = JSON.parse(fs.readFileSync(files[syl], "utf8"));
const parent = new Map();
const walk = (n, p) => {
  parent.set(n.key, p);
  for (const c of n.children ?? []) walk(c, n.key);
};
file.topics.forEach((t) => walk(t, null));
const within = (k, a) => {
  for (let x = k; x; x = parent.get(x)) if (x === a) return true;
  return false;
};
const total = +totalS;
const poolOf = (t, m) =>
  inv[key].filter((r) => r.nodes.some((n) => within(n, t)) && r.difficulty >= +lo && r.difficulty <= +hi && r.marks === m && r.examStyle).length;
const topics = specs.map((s) => {
  const [t, ms] = s.split("=");
  if (!parent.has(t)) throw new Error(`unknown topic ${t}`);
  const options = (ms ? ms.split("/").map(Number) : [4, 5, 6, 7, 8]).map((m) => ({ m, n: poolOf(t, m) })).filter((o) => o.n >= 2);
  return { t, options };
});
const score = (pick) => [Math.min(...pick.map((p) => p.n)), pick.reduce((s, p) => s + Math.min(Math.log2(p.n), 3.5), 0)];
const all = [];
const rec = (i, acc, marks) => {
  if (marks > total) return;
  if (i === topics.length) {
    if (marks === total) all.push({ s: score(acc), pick: [...acc] });
    return;
  }
  for (const o of topics[i].options) {
    if (acc.some((p) => p.t === topics[i].t && p.m === o.m)) continue;
    acc.push({ t: topics[i].t, ...o });
    rec(i + 1, acc, marks + o.m);
    acc.pop();
  }
};
rec(0, [], 0);
all.sort((a, b) => b.s[0] - a.s[0] || b.s[1] - a.s[1]);
if (all.length === 0) {
  console.log("no combination");
  process.exit(1);
}
for (const x of all.slice(0, +(process.env.TOP ?? 1))) {
  console.log(`min pool ${x.s[0]}, score ${x.s[1].toFixed(2)}, ${x.pick.length} questions`);
  for (const p of x.pick) console.log(`  ${p.t.padEnd(40)} ${p.m}m  pool ${p.n}`);
}
