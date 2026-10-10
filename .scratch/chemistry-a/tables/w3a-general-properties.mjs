import { table, AR } from "../lib.mjs";
const IE = { Ca: [590, 1150, 4940, 6480], Ti: [661, 1310, 2720, 4170], V: [648, 1370, 2870, 4600], Cr: [653, 1590, 2990, 4770], Mn: [716, 1510, 3250, 5190], Fe: [762, 1560, 2960, 5400], Co: [757, 1640, 3230, 5100], Ni: [736, 1750, 3390, 5400], Cu: [745, 1960, 3350, 5690] };
console.log(table(["Element", "IE₁", "IE₂", "IE₃", "IE₄"], Object.entries(IE).map(([k, v]) => [k, ...v])));
const s = (el, n) => IE[el].slice(0, n).reduce((a, b) => a + b, 0);
console.log("Ca 1+2", s("Ca", 2), "Ca 1-3", s("Ca", 3), "Fe 1+2", s("Fe", 2), "Fe 1-3", s("Fe", 3));
console.log("jump Ca IE3-IE2", IE.Ca[2] - IE.Ca[1], "Fe IE3-IE2", IE.Fe[2] - IE.Fe[1], "ratio Ca", (IE.Ca[2] / IE.Ca[1]).toFixed(2), "Fe", (IE.Fe[2] / IE.Fe[1]).toFixed(2));
