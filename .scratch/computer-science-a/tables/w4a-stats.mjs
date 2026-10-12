import fs from "node:fs";
const root = "content/subjects/computer-science-a/";
const files = ["algo/algorithm-design","algo/trace-tables","algo/linear-search-bubble-sort","algo/binary-search-insertion-sort","algo/quick-sort","algo/complexity-big-o","algo/recursion","ds/data-types-records","ds/arrays","ds/text-files","ds/adt-introduction","ds/stack-queue-algorithms","ds/linked-list-algorithms","ds/binary-tree-algorithms"];
const tot = {};
for (const f of files) {
  const qs = JSON.parse(fs.readFileSync(root + "questions/" + f + ".json", "utf8"));
  const cards = JSON.parse(fs.readFileSync(root + "flashcards/" + f + ".json", "utf8"));
  const c = {};
  for (const q of qs) { const t = q.type === "SHORT_ANSWER" && q.markingMode === "MANUAL" ? "MANUAL" : q.type; c[t] = (c[t] ?? 0) + 1; tot[t] = (tot[t] ?? 0) + 1; }
  const daily = qs.filter((q) => q.dailyEligible).length;
  const ds = [1,2,3,4,5].map((d) => qs.filter((q) => q.difficulty === d).length);
  console.log(f.padEnd(36), String(qs.length).padStart(2), "cards", cards.length, "daily", daily, "diff", ds.join("/"), JSON.stringify(c).replace(/"/g, ""));
}
console.log(JSON.stringify(tot));
for (const f of ["exam/w4a-theory","exam/w4a-cambridge","exam/w4a-zimsec"]) {
  const qs = JSON.parse(fs.readFileSync(root + "questions/" + f + ".json", "utf8"));
  for (const q of qs) console.log(f, q.key.split(".").pop(), q.type, q.marks, q.skill, q.difficulty, q.applies ? "CAM/ZIM" : "both", q.paper);
}
