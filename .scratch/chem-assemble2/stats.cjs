// Per-topic pool statistics for blueprint design. Run: node .scratch/chem-assemble2/stats.cjs [syllabus-prefix]
const fs = require("fs");
const inv = JSON.parse(fs.readFileSync(".scratch/chem-assemble2/inventory.json", "utf8"));
const SH = { MULTIPLE_CHOICE: "MCQ", TRUE_FALSE: "TF", NUMERICAL: "NUM", CALCULATION: "CALC", SHORT_ANSWER: "SA", FILL_IN_THE_BLANK: "FIB", MATCHING: "MAT", STRUCTURED: "STR", EXTENDED_RESPONSE: "EXT", DIAGRAM_LABELLING: "DIA", ESSAY: "ESS" };
const only = process.argv[2];
for (const [syl, rows] of Object.entries(inv)) {
  if (only && !syl.startsWith(only)) continue;
  console.log(`\n=== ${syl}: ${rows.length}`);
  const multi = rows.filter((r) => r.selectMode === "multiple");
  console.log(`MCQ single ${rows.filter((r) => r.selectMode === "single").length}, multi ${multi.length}; options: ${JSON.stringify(rows.filter((r) => r.type === "MULTIPLE_CHOICE").reduce((m, r) => ((m[r.optionCount] = (m[r.optionCount] ?? 0) + 1), m), {}))}`);
  console.log(`exam-style ${rows.filter((r) => r.examStyle).length}; marks hist: ${JSON.stringify(rows.reduce((m, r) => ((m[r.marks] = (m[r.marks] ?? 0) + 1), m), {}))}`);
  console.log(`exam-style marks hist: ${JSON.stringify(rows.filter((r) => r.examStyle).reduce((m, r) => ((m[r.marks] = (m[r.marks] ?? 0) + 1), m), {}))}`);
  const tops = [...new Set(rows.flatMap((r) => r.tops))];
  for (const top of tops) {
    const list = rows.filter((r) => r.tops.includes(top));
    const m = {};
    for (const r of list) {
      const k = `${SH[r.type]}${r.type === "MULTIPLE_CHOICE" && r.selectMode === "multiple" ? "x" : ""}${r.marks}`;
      m[k] = (m[k] ?? 0) + 1;
    }
    const keys = Object.keys(m).sort((a, b) => a.replace(/\D/g, "") - b.replace(/\D/g, "") || a.localeCompare(b));
    const ex = {};
    for (const r of list.filter((r) => r.examStyle && r.marks >= 2)) {
      const k = `${r.marks}d${r.difficulty}`;
      ex[k] = (ex[k] ?? 0) + 1;
    }
    const mcqSingle = list.filter((r) => r.selectMode === "single").length;
    console.log(`  ${top.padEnd(36)} n=${String(list.length).padStart(3)} mcq1=${mcqSingle} | ${keys.map((k) => `${k}:${m[k]}`).join(" ")}`);
    console.log(`  ${"".padEnd(36)}   exam>=2m: ${Object.entries(ex).sort((a, b) => parseInt(a[0]) - parseInt(b[0]) || a[0].localeCompare(b[0])).map(([k, v]) => `${k}:${v}`).join(" ")}`);
  }
}
