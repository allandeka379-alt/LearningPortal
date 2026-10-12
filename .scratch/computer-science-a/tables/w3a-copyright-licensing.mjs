import { chk, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Licence cost: US$25 per computer or a site licence of US$400 for any number of computers at one site.
export const single = 25;
export const site = 400;
export const counts = [10, 16, 30];
export const costs = counts.map((n) => ({ n, individual: n * single, site, cheaper: n * single < site ? "Individual" : n * single === site ? "Same" : "Site" }));
export const breakEven = site / single;
chk(breakEven, 16);
export const costMd = mdTable(["Computers", "Individual licences (US\\$)", "Site licence (US\\$)", "Cheaper"], costs.map((c) => [c.n, c.individual, c.site, c.cheaper]));

// Similarity report: 800 words in the essay; 176 words match other sources.
export const words = 800;
export const matched = 176;
export const similarity = (matched / words) * 100;
chk(similarity, 22);
// After excluding 40 words that are correctly quoted and referenced:
export const quoted = 40;
export const after = ((matched - quoted) / words) * 100;
chk(after, 17);

if (process.argv[1]?.endsWith("w3a-copyright-licensing.mjs")) {
  console.log(costMd);
  console.log({ breakEven, similarity, after });
  needs("ethics/copyright-licensing", [costMd, "16 computers", "22%", "17%"]);
  console.log("lesson values OK");
}
