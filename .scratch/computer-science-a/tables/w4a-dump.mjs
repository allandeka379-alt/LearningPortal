// dump questions of given files compactly for review: node w4a-dump.mjs <relative json>...
import fs from "node:fs";
const root = "content/subjects/computer-science-a/questions/";
for (const f of process.argv.slice(2)) {
  const qs = JSON.parse(fs.readFileSync(root + f, "utf8"));
  for (const q of qs) {
    const k = q.key.split(".").slice(-1)[0];
    const stem = q.stem.replace(/```[\s\S]*?```/g, "[code]").replace(/\n+/g, " ").slice(0, 170);
    if (q.type === "MULTIPLE_CHOICE") console.log(`${k} MCQ d${q.difficulty}: ${stem} => ${q.options.filter(o => o.correct).map(o => o.content).join(" | ")}`);
    else if (q.type === "TRUE_FALSE") console.log(`${k} TF: ${stem} => ${q.answerSpec.correct}`);
    else if (q.type === "NUMERICAL" || q.type === "CALCULATION") console.log(`${k} NUM: ${stem} => ${q.answerSpec.value}`);
    else if (q.type === "SHORT_ANSWER" && q.markingMode !== "MANUAL") console.log(`${k} SHORT: ${stem} => ${q.answerSpec.accepted?.map(a=>a.value).join("/")}`);
  }
}
