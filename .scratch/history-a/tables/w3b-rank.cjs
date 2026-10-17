// usage: node w3b-rank.cjs <questions json path substring> -> lists MCQ option lengths, flags key longest/shortest
const fs = require("fs");
const path = require("path");
const dir = "content/subjects/history-a/questions";
function walk(d, o = []) {
  for (const n of fs.readdirSync(d)) {
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) walk(p, o);
    else if (n.endsWith(".json")) o.push(p);
  }
  return o;
}
for (const f of walk(dir).filter((x) => x.split(path.sep).join("/").includes(process.argv[2]))) {
  for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) {
    for (const m of [q, ...(q.parts || [])]) {
      if (m.type !== "MULTIPLE_CHOICE" || (m.payload && m.payload.selectMode === "multiple")) continue;
      const L = m.options.map((o) => o.content.length);
      const k = m.options.findIndex((o) => o.correct);
      const mx = Math.max(...L);
      const mn = Math.min(...L);
      const flag = L[k] === mx && L.filter((x) => x === mx).length === 1 ? "LONG" : L[k] === mn && L.filter((x) => x === mn).length === 1 ? "SHORT" : "ok";
      console.log(q.key, flag, JSON.stringify(L), "key", k);
    }
  }
}
