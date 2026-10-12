import { pageReplace, mdTable, chk, same } from "../lib.mjs";
export const refs = [3, 2, 1, 4, 2, 5, 2, 1, 3, 4, 2, 6];
export const trace = (algo, frames = 3) => {
  const r = pageReplace(refs, frames, algo);
  const md = mdTable(["Page requested", ...Array.from({ length: frames }, (_, i) => `Frame ${i + 1}`), "Page fault?"], r.rows.map((x) => [x.ref, ...Array.from({ length: frames }, (_, i) => x.frames[i] ?? "–"), x.fault ? "yes" : "no"]));
  return { r, md };
};
const f = trace("FIFO"), l = trace("LRU"), o = trace("OPT");
const cmp = mdTable(["Algorithm", "Page faults (3 frames)", "Page faults (4 frames)"], [["FIFO", f.r.faults, pageReplace(refs, 4, "FIFO").faults], ["LRU", l.r.faults, pageReplace(refs, 4, "LRU").faults], ["Optimal", o.r.faults, pageReplace(refs, 4, "OPT").faults]]);
// address translation
const pageSize = 1024;
const table = { 0: 5, 1: 2, 2: 7, 3: 0, 4: 9 };
const trans = (la) => { const page = Math.floor(la / pageSize), off = la % pageSize, frame = table[page]; return { la, page, off, frame, pa: frame * pageSize + off }; };
const t1 = trans(4100), t2 = trans(2500);
chk(t1.page, 4); chk(t1.off, 4); chk(t1.pa, 9 * 1024 + 4);
chk(t2.page, 2); chk(t2.off, 452); chk(t2.pa, 7 * 1024 + 452);
const pt = mdTable(["Page", "Frame"], Object.entries(table));
const tr = mdTable(["Logical address", "Page (÷ 1024)", "Offset (remainder)", "Frame (page table)", "Physical address"], [t1, t2].map((t) => [t.la, t.page, t.off, t.frame, `${t.frame} × 1024 + ${t.off} = ${t.pa}`]));
const seg = { Code: [2000, 800], Data: [5000, 300], Stack: [9000, 500] };
const segT = mdTable(["Segment", "Base address", "Limit (size)"], Object.entries(seg).map(([k, [bse, lim]]) => [k, bse, lim]));
chk(5000 + 120, 5120);
export const snips = {
  refs: refs.join(", "), fifo: f.md, lru: l.md, opt: o.md, cmp, pt, tr, segT,
  ff: String(f.r.faults), lf: String(l.r.faults), of: String(o.r.faults),
};
if (process.argv[1].endsWith("w2a-memory-management.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
