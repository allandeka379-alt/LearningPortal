// Lists, per syllabus top-level topic, which proposed freePreview concepts fall under it (at most one each).
import fs from "node:fs";
const fp = process.argv.slice(2).map((k) => (k.startsWith("bus.") ? k : `bus.${k}`));
const files = ["zimsec/o-level/commerce/2015-2022", "zimsec/o-level/business-studies/2015-2022", "cambridge/igcse/business-studies/2027-2029"];
let bad = 0;
for (const f of files) {
  const s = JSON.parse(fs.readFileSync(`content/syllabi/${f}.json`, "utf8"));
  for (const t of s.topics) {
    const hits = [];
    const walk = (n) => { for (const c of n.covers ?? []) if (fp.includes(c)) hits.push(c); (n.children ?? []).forEach(walk); };
    walk(t);
    if (hits.length > 1) bad += 1;
    console.log(`${f} ${t.code} ${t.name}: ${hits.join(", ") || "-"}${hits.length > 1 ? "  <-- more than one" : ""}`);
  }
}
process.exitCode = bad ? 1 : 0;
