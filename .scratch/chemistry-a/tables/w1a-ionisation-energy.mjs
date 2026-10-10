import { sfStr, dpStr } from "../lib.mjs";
const IE = { Al: [577,1820,2740,11600], Ca:[590,1150,4940,6480], Si:[786,1580,3230,4360], Mg:[736,1450,7740,10500], Ba:[502,966,3390,4700], Ga:[577,1980,2960,6190], P:[1060,1900,2920,4960], S:[1000,2260,3390,4540], Na:[494,4560,6940,9540], B:[799,2420,3660,25000]};
for (const [el, v] of Object.entries(IE)) console.log(el, v.slice(1).map((x,i)=> (x/v[i]).toFixed(2)).join(" "));
console.log("Mg2+ energy", 736+1450, "Ca", 590+1150, "Al3+", 577+1820+2740);
console.log("per atom Na J", sfStr(494e3/6.022e23*1e19,3),"e-19");
