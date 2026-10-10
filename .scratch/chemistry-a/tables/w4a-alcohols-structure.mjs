import { Mr, moles, VM_RTP, sfStr, chk, percentYield } from "../lib.mjs";
// Example: fermentation of 72.0 g glucose; actual ethanol obtained 27.6 g
const mG = 72.0, MG = Mr("C6H12O6"), ME = Mr("C2H5OH");
const n = moles(mG, MG);
const nE = 2 * n;
const mE = nE * ME;
const v = nE * VM_RTP;
console.log({ MG, ME, n, nE, mE, v, y: percentYield(27.6, mE) });
// Example 2: hydration atom economy
const ae = (ME / (Mr("C2H4") + Mr("H2O"))) * 100;
const aeF = ((2 * ME) / MG) * 100;
console.log({ ae, aeF: sfStr(aeF, 3) });
