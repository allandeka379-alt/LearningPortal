import { lorenz, chk } from "../lib.mjs";
for (const s of [[5,10,15,25,45],[8,12,17,24,39],[10,14,18,23,35],[3,7,12,23,55]]) { const l=lorenz(s,{groupName:"Quintile"}); console.log(s.join(","), l.gini, l.areaUnderLorenz); if(s[0]===5||s[0]===8) console.log(l.md); }
