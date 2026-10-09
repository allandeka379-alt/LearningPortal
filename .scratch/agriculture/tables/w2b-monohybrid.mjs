// Lesson numbers for breeding/monohybrid.
import { monohybrid, check } from "../lib.mjs";
const f1 = monohybrid("PP", "pp");
console.log("PP x pp", JSON.stringify(f1));
const f2 = monohybrid("Pp", "Pp");
console.log("Pp x Pp", JSON.stringify(f2));
const calves = 120;
console.log("expected polled", calves * f2.phenotypes.dominant / 4, "horned", calves * f2.phenotypes.recessive / 4);
const tc = monohybrid("Bb", "bb");
console.log("Bb x bb", JSON.stringify(tc));
const tc2 = monohybrid("BB", "bb");
console.log("BB x bb", JSON.stringify(tc2));
check(f2.phenotypes.dominant === 3, "3:1");
