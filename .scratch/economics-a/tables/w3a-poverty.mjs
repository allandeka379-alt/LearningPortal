import { chk, fmt, table, median, round } from "../lib.mjs";
// NIT: guarantee 3000, rate 40%
const G = 3000, t = 0.4;
const rows = [0, 2000, 5000, 7500, 10000].map(E => { const s = G - t*E; return [E, s, E + s]; });
console.log(table(["Earnings (US\$ a year)", "Payment from (or tax to) the state (US\$)", "Total income after NIT (US\$)"], rows.map(r => [r[0], fmt(r[1]), r[2]])));
console.log("break-even", G/t);
// poverty trap
const gain = 100, lostBenefit = 60, taxPaid = 15; console.log(gain - lostBenefit - taxPaid, (lostBenefit+taxPaid)/gain*100);
// relative poverty: median
const inc = [1200, 1800, 2400, 3000, 3600, 4200, 5400, 6600, 9000, 15000, 24000];
const med = median(inc); console.log("median", med, "60%", med*0.6, inc.filter(x=>x<med*0.6));
// absolute: 3 per day * 365
console.log(3*365);
// UBI
console.log(1200*8e6/1e9, 1200*8e6*0.0);
