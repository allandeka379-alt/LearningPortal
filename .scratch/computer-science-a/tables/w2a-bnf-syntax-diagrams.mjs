import { mdTable, chk, same, codeBlock } from "../lib.mjs";
import { accepts, derive, bnfText, digits } from "./w2a-bnf.mjs";
export const G1 = { "<digit>": digits.map((d) => [d]), "<integer>": [["<digit>"], ["<integer>", "<digit>"]] };
export const G2 = { ...G1, "<expression>": [["<term>"], ["<expression>", "+", "<term>"]], "<term>": [["<factor>"], ["<term>", "*", "<factor>"]], "<factor>": [["<integer>"], ["(", "<expression>", ")"]] };
export const G3 = { "<digit>": digits.map((d) => [d]), "<province>": [["HA"], ["BU"], ["MA"], ["MS"]], "<schoolcode>": [["<province>", "<digit>", "<digit>", "<digit>"]] };
const tests = (G, start, list) => mdTable(["String", "Valid?"], list.map((s) => [`\`${s}\``, accepts(G, start, s) ? "valid" : "not valid"]));
chk(accepts(G1, "<integer>", "4071") ? 1 : 0, 1); chk(accepts(G1, "<integer>", "40a1") ? 1 : 0, 0);
chk(accepts(G2, "<expression>", "2+3*4") ? 1 : 0, 1); chk(accepts(G2, "<expression>", "(2+3)*4") ? 1 : 0, 1);
chk(accepts(G2, "<expression>", "2+*3") ? 1 : 0, 0); chk(accepts(G2, "<expression>", "(2+3") ? 1 : 0, 0);
chk(accepts(G3, "<schoolcode>", "BU204") ? 1 : 0, 1); chk(accepts(G3, "<schoolcode>", "HA20") ? 1 : 0, 0);
const d1 = derive(G1, "<integer>", "407");
const d2 = derive(G2, "<expression>", "2+3*4");
const d3 = derive(G3, "<schoolcode>", "BU204");
if (!d1 || !d2 || !d3) throw new Error("derivation failed");
const dTable = (d) => mdTable(["Step", "Sentential form"], d.map((f, i) => [i, `\`${f}\``]));
export const snips = {
  g1: bnfText(G1), g2: bnfText({ "<expression>": G2["<expression>"], "<term>": G2["<term>"], "<factor>": G2["<factor>"] }), g3: bnfText(G3),
  t1: tests(G1, "<integer>", ["4071", "7", "40a1", ""]),
  t2: tests(G2, "<expression>", ["2+3*4", "(2+3)*4", "2+*3", "(2+3"]),
  t3: tests(G3, "<schoolcode>", ["BU204", "MS007", "HA20", "XY123"]),
  d1: dTable(d1), d2: dTable(d2), d3: dTable(d3), n1: String(d1.length - 1), n2: String(d2.length - 1),
};
if (process.argv[1].endsWith("w2a-bnf-syntax-diagrams.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
