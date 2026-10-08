// Tables/figures for lessons/technology/manual-digital-records.md (W1a).
import { sum, check, fmt } from "../lib.mjs";
const inv = [["2 Sep", "Kudzai Primary School", "S101", 640], ["5 Sep", "Hope Clinic", "S102", 385], ["11 Sep", "Mutare Lodge", "S103", 1120], ["18 Sep", "Kudzai Primary School", "S104", 275], ["26 Sep", "Tafara Stores", "S105", 930]];
const tot = sum(inv.map((x) => x[3]));
console.log(inv.map((x, i) => `| ${i + 2} | ${x[0]} | ${x[1]} | ${x[2]} | ${fmt(x[3])} |`).join("\n"));
console.log({ tot, kudzai: 640 + 275 });
const manual = 40 * 2.5, comp = 12 * 2.5 + 35, saving = manual - comp, payback = 480 / saving;
console.log({ manual, comp, saving, payback });
check("s", saving, 35);
