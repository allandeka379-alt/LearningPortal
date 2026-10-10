import { chk, cardiacOutput, pctChange, dpStr, mean } from "../lib.mjs";
console.log("pulse 18 in 15 s ->", chk(18 * 4, 72));
const before = cardiacOutput(66, 76), after = cardiacOutput(81, 62);
console.log("CO before", before, "after", after, "HR change %", dpStr(pctChange(76, 62), 1), "SV change %", dpStr(pctChange(66, 81), 1));
const ex = [74, 128, 112, 96, 84, 76]; console.log("pct rise", dpStr(pctChange(74, 128), 1));
console.log(mean([71, 73, 72]));
