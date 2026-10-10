import { Mr, moles, VM_RTP, sfStr } from "../lib.mjs";
// Lesson WE: 0.410 g of C6H10 absorbs 240 cm3 H2 at rtp
const n = moles(0.41, Mr("C6H10")); const nH = 0.240 / VM_RTP; console.log(Mr("C6H10"), n, nH, nH / n);
// question data: 1.12 g of C8H14? Try C5H8 0.340 g + H2 ?
for (const [f, g] of [["C5H8", 0.34], ["C10H16", 0.68], ["C4H8", 0.84], ["C8H14", 0.55]]) { const m = moles(g, Mr(f)); console.log(f, Mr(f), g, m, m * VM_RTP * 1000); }
