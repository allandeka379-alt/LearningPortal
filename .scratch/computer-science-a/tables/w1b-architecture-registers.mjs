import { runAsm, asmListingMd, mdTable, chk } from "../lib.mjs";
// A short program run on the 9618 accumulator machine; the register table is built from the real trace.
const src = ["LDD Value", "ADD #5", "STO Result", "END", "Value: 12", "Result: 0"];
const r = runAsm(src, { base: 200, watch: ["Result"] });
const L = r.labels;
const rows = [];
let acc = 0;
r.trace.forEach((t, i) => {
  const text = t.text;
  const op = text.split(" ")[0];
  rows.push([`Fetch \`${text}\``, t.addr + 1, t.addr, `\`${text}\``, `\`${text}\``, acc]);
  if (op === "LDD") rows.push([`Execute \`${text}\``, t.addr + 1, L.Value, t.acc, `\`${text}\``, t.acc]);
  else if (op === "ADD") rows.push([`Execute \`${text}\``, t.addr + 1, "", "", `\`${text}\``, t.acc]);
  else if (op === "STO") rows.push([`Execute \`${text}\``, t.addr + 1, L.Result, t.acc, `\`${text}\``, t.acc]);
  acc = t.acc;
});
// fix: blank cells where the register did not change in the execute row of ADD (MAR and MDR keep the old values)
for (let i = 1; i < rows.length; i++) {
  if (rows[i][2] === "") { rows[i][2] = rows[i - 1][2]; rows[i][3] = rows[i - 1][3]; }
}
chk(r.acc, 17);
chk(r.mem[L.Result], 17);
const regTable = mdTable(["Stage", "PC", "MAR", "MDR", "CIR", "ACC"], rows.filter((x) => !x[0].includes("END")));
export const snips = {
  listing: asmListingMd(r),
  regTable,
  result: String(r.mem[L.Result]),
  addrValue: String(L.Value),
  addrResult: String(L.Result),
};
if (process.argv[1].endsWith("w1b-architecture-registers.mjs")) console.log(snips.listing + "\n\n" + snips.regTable);
