import { chk, fmt, table, pctChange, round } from "../lib.mjs";
const c = 7200, i = 1800, g = 2400, x = 2500, m = 2900;
const ad = c + i + g + x - m; console.log(ad, [c,i,g,x-m].map(v=>round(v/ad*100,1)));
const ad2 = c + i*1.1 + g + x*0.92 - m; console.log(ad2, ad2-ad, pctChange(ad, ad2));
console.log(table(["Component (US\$ billion)", "Year 1", "Year 2", "Change"], [["Consumption (C)", c, c, 0], ["Investment (I)", i, i*1.1, i*0.1], ["Government spending (G)", g, g, 0], ["Exports (X)", x, x*0.92, x*0.92-x], ["Imports (M)", m, m, 0], ["**AD = C + I + G + (X − M)**", `**${fmt(ad)}**`, `**${fmt(ad2)}**`, fmt(ad2-ad)]]));
const P = [80,90,100,110,120], ADq = [124,117,110,104,99], AD2 = ADq.map(v=>v+10);
console.log(table(["Price level (index)", "Real AD before (US\$ billion)", "Real AD after (US\$ billion)"], P.map((p,k)=>[p,ADq[k],AD2[k]])));
