import fs from "node:fs";
const dir = "content/subjects/religious-studies-o/questions/";
for (const folder of process.argv.slice(2)) for (const f of fs.readdirSync(dir + folder)) {
  if (!f.endsWith(".json")) continue;
  const qs = JSON.parse(fs.readFileSync(dir + folder + "/" + f, "utf8"));
  const check = (key, q) => {
    if (q.type !== "MULTIPLE_CHOICE" || !q.options) return;
    const ok = q.options.filter((o) => o.correct); if (ok.length !== 1) return;
    const L = q.options.map((o) => o.content.length); const m = Math.max(...L);
    if (ok[0].content.length === m && L.filter((x) => x === m).length === 1) console.log(key, ok[0].content.length, "vs", L.filter((x,i)=>!q.options[i].correct).join(","), "|", ok[0].content);
  };
  for (const q of qs) { check(q.key, q); for (const p of q.parts || []) check(q.key + p.label, p); }
}
