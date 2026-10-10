import { glcPercent, sfStr, dpStr } from "../lib.mjs";
const p = glcPercent({ ethanol: 0.5 * 0.6 * 52, propanol: 0.5 * 0.8 * 18, butanol: 0.5 * 1.0 * 9.6 });
console.log("areas", 0.5 * 0.6 * 52, 0.5 * 0.8 * 18, 0.5 * 1.0 * 9.6, Object.fromEntries(Object.entries(p).map(([k, v]) => [k, sfStr(v, 3)])));
