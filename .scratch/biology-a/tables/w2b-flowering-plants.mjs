// W2b lesson numbers: flowering plants.
import { chk, dpStr, table } from "../lib.mjs";
// Maize 2n = 20
const n2 = 20, n = n2 / 2;
console.log("microspore", n, "generative", n, "male gametes", n, "egg", n, "polar nuclei each", n, "zygote", 2 * n, "endosperm", 3 * n);
// pollen counts: 500 microspore mother cells -> pollen grains
console.log("pollen from 500 MMC", 500 * 4, "functional megaspores from 1 MMC", 1);
// pollen germination (hypothetical)
const suc = [0, 5, 10, 15, 20, 30];
const germ = [[4, 50], [21, 50], [33, 50], [38, 50], [30, 50], [12, 50]];
console.log(table(["Sucrose concentration / %", ...suc.map(String)], [["Pollen grains germinated (of 50)", ...germ.map((g) => String(g[0]))], ["Germination / %", ...germ.map((g) => String(g[0] / g[1] * 100))]]));
