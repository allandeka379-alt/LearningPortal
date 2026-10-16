import fs from "node:fs";
const R = "content/subjects/business-a/";
const files = fs.readdirSync(R + "lessons/mix").map((f) => "mix/" + f.replace(".md", "")).concat(fs.readdirSync(R + "lessons/operations").map((f) => "operations/" + f.replace(".md", "")));
const mine = ["mix/life-cycle-portfolio","mix/pricing","mix/promotion","mix/digital","mix/place","operations/transformation","operations/productivity","operations/methods-intensity","operations/inventory-control","operations/inventory-eoq-jit","operations/capacity-outsourcing","operations/location-scale","operations/quality"];
let tl = 0, tm = 0, tu = 0;
for (const f of mine) {
  const md = fs.readFileSync(`${R}lessons/${f}.md`, "utf8");
  const body = md.split("\n---\n").slice(1).join("\n").split("\n").filter((l) => !l.startsWith("|")).join(" ").replace(/[:#*`]/g, " ");
  const words = body.split(/\s+/).filter(Boolean).length;
  const qs = JSON.parse(fs.readFileSync(`${R}questions/${f}.json`, "utf8"));
  const cards = JSON.parse(fs.readFileSync(`${R}flashcards/${f}.json`, "utf8"));
  const by = {}; for (const q of qs) by[q.type] = (by[q.type] ?? 0) + 1;
  const daily = qs.filter((q) => q.dailyEligible).length;
  let mcq = 0, uniq = 0;
  for (const q of qs) for (const m of [q, ...(q.parts ?? [])]) if (m.type === "MULTIPLE_CHOICE" && m.payload?.selectMode !== "multiple") { mcq++; const k = m.options.find((o) => o.correct).content.length; const d = m.options.filter((o) => !o.correct).map((o) => o.content.length); if (d.every((x) => k > x)) uniq++; }
  console.log(f.padEnd(34), "words", words, "q", qs.length, "cards", cards.length, "daily", daily, "mcq", mcq, "uniqLongest", uniq, JSON.stringify(by));
  tm += mcq; tu += uniq;
}
console.log("overall unique-longest", tu, "/", tm, ((tu / tm) * 100).toFixed(0) + "%");
