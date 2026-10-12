import { mdTable, chk, same } from "../lib.mjs";
import { makeDisk, write, remove, pieces, defrag, mapMd } from "./w2a-disk.mjs";
const d = makeDisk(12);
write(d, "A", 3); write(d, "B", 2); write(d, "C", 4);
const m1 = mapMd(d);
remove(d, "B");
const m2 = mapMd(d);
write(d, "D", 4);
const m3 = mapMd(d);
chk(pieces(d, "D"), 2);
same(d.join(""), "AAADD" + "CCCCDD" + "." .repeat(1) , "disk after D");
const d2 = defrag(d);
const m4 = mapMd(d2);
chk(pieces(d2, "D"), 1);
// backup storage
const full = 40, daily = 2, days = 6;
const incTotal = full + daily * days;
chk(incTotal, 52);
const diffs = [1, 2, 3, 4, 5, 6].map((k) => daily * k); // a differential grows each day if changes are cumulative
const backupTable = mdTable(["Day", "Full backup (GiB)", "Incremental (GiB)", "Cumulative incremental total (GiB)"], [["Sunday", full, "–", full], ...[1, 2, 3, 4, 5, 6].map((k, i) => [["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i], "–", daily, full + daily * k])]);
// DLL saving
const progs = 5, lib = 3;
const shared = lib + progs * 1, own = progs * (1 + lib);
chk(own - shared, 12);
const dllTable = mdTable(["Method", "Calculation (MiB)", "Memory used (MiB)"], [["Library built into each program", `${progs} × (${1} + ${lib})`, own], ["One shared DLL", `${lib} + ${progs} × ${1}`, shared]]);
export const snips = { m1, m2, m3, m4, backupTable, dllTable, incTotal: String(incTotal), saving: String(own - shared), own: String(own), shared: String(shared) };
if (process.argv[1].endsWith("w2a-functions-utilities.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
