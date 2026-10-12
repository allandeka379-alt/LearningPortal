// Tiny disk-block simulator used by the os.functions-utilities lesson and slice (first-fit, one file = list of block numbers).
import { mdTable } from "../lib.mjs";
export function makeDisk(n) { return Array(n).fill("."); }
export function write(disk, name, size) {
  const free = disk.map((c, i) => (c === "." ? i : -1)).filter((i) => i >= 0);
  if (free.length < size) throw new Error("disk full");
  free.slice(0, size).forEach((i) => (disk[i] = name));
  return disk;
}
export function remove(disk, name) { disk.forEach((c, i) => { if (c === name) disk[i] = "."; }); return disk; }
/** number of separate pieces (runs of consecutive blocks) of a file */
export function pieces(disk, name) { let r = 0; disk.forEach((c, i) => { if (c === name && disk[i - 1] !== name) r++; }); return r; }
export function defrag(disk) { const names = []; disk.forEach((c) => { if (c !== "." && !names.includes(c)) names.push(c); }); const out = []; for (const n of names) disk.forEach((c) => { if (c === n) out.push(n); }); while (out.length < disk.length) out.push("."); return out; }
export function mapMd(disk) { return mdTable(disk.map((_, i) => i + 1), [disk.map((c) => (c === "." ? "free" : c))]); }
