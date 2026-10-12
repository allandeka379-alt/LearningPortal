import { mdTable, same } from "../lib.mjs";
// learning switch simulation: ports = { device: port }
export function switchSim(ports, frames) {
  const table = {}; const rows = []; const all = Object.values(ports);
  for (const [src, dst] of frames) {
    const sp = ports[src]; table[src] = sp;
    let action;
    if (dst in table) { action = table[dst] === sp ? "filtered" : `forwarded to port ${table[dst]}`; }
    else { action = `flooded to ports ${all.filter(p => p !== sp).join(", ")}`; }
    rows.push({ src, dst, inPort: sp, learned: `${src} = port ${sp}`, action, table: Object.entries(table).map(([d, p]) => `${d}:${p}`).join(" ") });
  }
  return rows;
}
export const switchMd = (rows) => mdTable(["Frame", "Arrives on port", "Table after learning", "Action"], rows.map((r) => [`${r.src} to ${r.dst}`, r.inPort, r.table, r.action]));
if (process.argv[1].endsWith("w2b-lan-hardware.mjs")) {
  const rows = switchSim({ A: 1, B: 2, C: 3, D: 4 }, [["A", "B"], ["B", "A"], ["C", "A"], ["A", "C"]]);
  console.log(switchMd(rows));
}
