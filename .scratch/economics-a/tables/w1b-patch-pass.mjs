import fs from "node:fs";
function patch(p, pairs) {
  let s = fs.readFileSync(p, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 60));
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s);
}
patch(".scratch/economics-a/slices/w1b-cambridge.mjs", [
  ["Some smuggling of fuel from a neighbouring country was also reported near the border.", "Some smuggling of fuel from a neighbouring country was also reported near the border. The Ministry of Finance said that it would review the tax after one year. Economists at the national university expect that, if the higher price lasts, demand for petrol will become more responsive over time, as households replace old vehicles and as public transport improves."],
]);
patch(".scratch/economics-a/slices/w1b-zimsec.mjs", [
  ["because few households can replace it with other cooking fats.", "because few households can replace it with other cooking fats. The Ministry also notes that Zandia imports a small amount of cooking oil, but that foreign currency for imports is limited and shipments take several weeks to arrive."],
  ['stem: "Price elasticity of demand and its uses."', 'stem: "Answer both parts of this question on price elasticity of demand and its uses."'],
  ['stem: "Indirect taxes and subsidies."', 'stem: "Answer both parts of this question on indirect taxes and subsidies."'],
  ['stem: "Consumer theory."', 'stem: "Answer both parts of this question on consumer theory."'],
]);
patch(".scratch/economics-a/slices/w1b-cambridge.mjs", [
  ['stem: "Minimum prices and buffer stocks in agriculture."', 'stem: "Answer both parts of this question on minimum prices and buffer stocks in agriculture."'],
  ['stem: "Elasticities and agricultural markets."', 'stem: "Answer both parts of this question on elasticities and agricultural markets."'],
]);
console.log("ok");
