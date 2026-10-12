import { runAsm, asmListingMd, asmTraceMd, mdTable, chk } from "../lib.mjs";
const src = ["LDM #7", "LDD Val", "LDI Ptr", "LDR #2", "LDX Table", "END", "Val: 12", "Ptr: 208", "Item: 25", "Table: 31", "34", "37"];
const r = runAsm(src, { base: 200 });
const L = r.labels;
chk(L.Val, 206); chk(L.Ptr, 207); chk(L.Item, 208); chk(L.Table, 209);
const accs = r.trace.map((t) => t.acc);
same(accs.slice(0, 5), [7, 12, 25, 25, 37]);
function same(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`mismatch ${JSON.stringify(a)} ${JSON.stringify(b)}`); }
const listing = asmListingMd(r);
const trace = asmTraceMd(r, { watch: [] });
// effective address table
const mem = r.mem;
const rows = [
  ["`LDM #7`", "Immediate", "7 is the value", "none", 7],
  ["`LDD Val`", "Direct", `Val = ${L.Val}`, L.Val, mem[L.Val]],
  ["`LDI Ptr`", "Indirect", `the contents of ${L.Ptr} give the address: ${mem[L.Ptr]}`, mem[L.Ptr], mem[mem[L.Ptr]]],
  ["`LDX Table` (IX = 2)", "Indexed", `${L.Table} + 2`, L.Table + 2, mem[L.Table + 2]],
];
const modes = mdTable(["Instruction", "Mode", "How the address is found", "Effective address", "Value loaded into ACC"], rows);
// relative: target = address of the jump + offset
const rel = [[640, "+5"], [640, "-3"], [744, "+10"], [744, "-12"]].map(([a, o]) => [a, `\`JMP ${o}\``, a + Number(o), ]);
const relTable = mdTable(["Address of the jump", "Instruction", "Next instruction executed at"], rel);
chk(640 + 5, 645); chk(640 - 3, 637);
// position independence: loop at 300 with JMP -2 then loaded at 500
const posTable = mdTable(["Program loaded at", "Address of `JMP -2`", "Target (address + offset)"], [640, 900].map((b) => [b, b + 2, b + 2 - 2]));
export const snips = {
  listing, trace, modes, relTable, posTable,
  valAddr: String(L.Val),
  eaInd: String(mem[L.Ptr]),
  valInd: String(mem[mem[L.Ptr]]),
  eaIdx: String(L.Table + 2),
  valIdx: String(mem[L.Table + 2]),
};
if (process.argv[1].endsWith("w1b-addressing-modes.mjs")) console.log(listing + "\n\n" + trace + "\n\n" + modes + "\n\n" + relTable + "\n\n" + posTable);
