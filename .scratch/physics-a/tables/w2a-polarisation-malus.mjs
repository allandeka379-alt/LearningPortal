import { malus, dpStr, sfStr } from "../lib.mjs";
console.log([0, 15, 30, 45, 60, 75, 90].map((th) => `| ${th} | ${dpStr(malus(1, th), 3)} |`).join("\n"));
console.log("12 at 30", malus(12, 30), "at 60", malus(12, 60));
console.log("two filters 45 then 45", malus(malus(1, 45), 45), "direct 90", malus(1, 90));
console.log("I0=20 at 45,45:", malus(malus(20, 45), 45));
console.log("angle for 0.25:", Math.acos(Math.sqrt(0.25)) * 180 / Math.PI);
