// Standard genetic code (mRNA codons -> three-letter amino acid names), used by W1b slices and lesson tables.
const B = "UCAG";
const AA = {
  UU: ["Phe", "Phe", "Leu", "Leu"], UC: ["Ser", "Ser", "Ser", "Ser"], UA: ["Tyr", "Tyr", "Stop", "Stop"], UG: ["Cys", "Cys", "Stop", "Trp"],
  CU: ["Leu", "Leu", "Leu", "Leu"], CC: ["Pro", "Pro", "Pro", "Pro"], CA: ["His", "His", "Gln", "Gln"], CG: ["Arg", "Arg", "Arg", "Arg"],
  AU: ["Ile", "Ile", "Ile", "Met"], AC: ["Thr", "Thr", "Thr", "Thr"], AA: ["Asn", "Asn", "Lys", "Lys"], AG: ["Ser", "Ser", "Arg", "Arg"],
  GU: ["Val", "Val", "Val", "Val"], GC: ["Ala", "Ala", "Ala", "Ala"], GA: ["Asp", "Asp", "Glu", "Glu"], GG: ["Gly", "Gly", "Gly", "Gly"],
};
export const CODE = {};
for (const [k, v] of Object.entries(AA)) for (let i = 0; i < 4; i++) CODE[k + B[i]] = v[i];
// self-check of well-known codons
for (const [c, a] of [["AUG", "Met"], ["UGG", "Trp"], ["UAA", "Stop"], ["UAG", "Stop"], ["UGA", "Stop"], ["GAG", "Glu"], ["GUG", "Val"], ["UUU", "Phe"], ["GGC", "Gly"], ["AAA", "Lys"], ["CAU", "His"], ["AGU", "Ser"], ["AGA", "Arg"], ["UGC", "Cys"]]) {
  if (CODE[c] !== a) throw new Error(`code table wrong at ${c}`);
}
if (Object.keys(CODE).length !== 64) throw new Error("64 codons expected");
/** Translate an mRNA string (5'→3', length multiple of 3) into amino acids, stopping at a stop codon. */
export function translate(mrna) {
  const out = [];
  for (let i = 0; i + 3 <= mrna.length; i += 3) {
    const aa = CODE[mrna.slice(i, i + 3)];
    if (!aa) throw new Error(`bad codon ${mrna.slice(i, i + 3)}`);
    if (aa === "Stop") break;
    out.push(aa);
  }
  return out;
}
/** mRNA from the template strand given 3'→5' (written left to right as 3'…5'). */
export const mrnaFromTemplate = (tmpl3to5) => tmpl3to5.split("").map((b) => ({ A: "U", T: "A", C: "G", G: "C" })[b]).join("");
/** anticodon (written 3'→5' to align with a codon written 5'→3'). */
export const anticodon = (codon) => codon.split("").map((b) => ({ A: "U", U: "A", C: "G", G: "C" })[b]).join("");
/** Table of codons used, for stems: rows [codon, amino acid]. */
export function codonRows(codons) {
  return [...new Set(codons)].sort().map((c) => [c, CODE[c]]);
}
