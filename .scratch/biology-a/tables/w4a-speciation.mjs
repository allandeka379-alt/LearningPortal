// Lesson table for evolution/speciation: pairwise differences between aligned DNA sequences.
import { table } from "../lib.mjs";
const seqs = {
  W: "ATGGCCTTAGCAGTCAAGCTGGAACGTTAC",
  X: "ATGGCCTTGGCAGTCAAGCTGGAACGCTAC",
  Y: "ATGGCTTTGGCAGTTAAGCTCGAACGCTAC",
  Z: "ATGACTTTGGCCGTTAAACTCGAGCGCTAT",
};
const names = Object.keys(seqs);
const diff = (a, b) => [...a].filter((c, i) => c !== b[i]).length;
for (const n of names) console.log(n, seqs[n].length, seqs[n].match(/.{1,10}/g).join(" "));
console.log(table(["", ...names], names.map((a) => [a, ...names.map((b) => (a === b ? "–" : String(diff(seqs[a], seqs[b]))))])));
