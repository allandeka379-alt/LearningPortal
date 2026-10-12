import fs from "node:fs";
const files = ["market/ped","market/ped-revenue","market/yed-xed","market/pes","market/equilibrium","market/price-mechanism","market/surplus","utility/marginal-utility","utility/indifference-curves","intervention/taxes-subsidies","intervention/price-controls-buffer-stocks","skills/diagrams-and-data"];
for (const f of files) {
  const qs = JSON.parse(fs.readFileSync(`content/subjects/economics-a/questions/${f}.json`, "utf8"));
  console.log("=== " + f);
  for (const q of qs) if (q.type === "MULTIPLE_CHOICE") console.log(q.key.split(".").pop(), "|", q.stem.slice(0, 110), "=>", q.options.find(o=>o.correct).content.slice(0,70));
}
