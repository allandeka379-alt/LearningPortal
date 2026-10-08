// Pool statistics per Combined Science node (for blueprint design). Run: node .scratch/combined-science/stats.mjs [depth]
import fs from "node:fs";
const inv = Object.values(JSON.parse(fs.readFileSync(".scratch/combined-science/inventory.json", "utf8")))[0];
const syl = JSON.parse(fs.readFileSync("content/syllabi/zimsec/o-level/combined-science/2015-2022.json", "utf8"));
const maxDepth = Number(process.argv[2] ?? 2);
const inTopic = (r, key) => r.lineages.some((l) => l.includes(key));
const walk = (n, d) => {
  const list = inv.filter((r) => inTopic(r, n.key));
  const single = list.filter((r) => r.selectMode === "single").length;
  const fam = {};
  for (const r of list) fam[r.family.replace("-o", "")] = (fam[r.family.replace("-o", "")] ?? 0) + 1;
  const ex = {};
  for (const r of list.filter((r) => r.examStyle && r.marks >= 2 && !["MULTIPLE_CHOICE", "TRUE_FALSE", "MATCHING"].includes(r.type))) ex[r.marks] = (ex[r.marks] ?? 0) + 1;
  const one = list.filter((r) => r.marks === 1 && r.difficulty <= 3 && ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "NUMERICAL"].includes(r.type) && r.selectMode !== "multiple").length;
  const mid = {};
  for (const r of list.filter((r) => r.marks >= 2 && r.marks <= 5 && r.difficulty >= 2 && r.difficulty <= 4 && !(r.type === "MULTIPLE_CHOICE"))) mid[r.marks] = (mid[r.marks] ?? 0) + 1;
  console.log(`${"  ".repeat(d)}${n.code} ${n.key} n=${list.length} mcq1=${single} one=${one} ${JSON.stringify(fam)} | exam>=2m ${JSON.stringify(ex)} | mid2-5 ${JSON.stringify(mid)}`);
  if (d < maxDepth) for (const c of n.children ?? []) walk(c, d + 1);
};
syl.topics.forEach((t) => walk(t, 0));
