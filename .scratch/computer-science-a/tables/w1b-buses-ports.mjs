import { chk, mdTable, bytesTo, toBase } from "../lib.mjs";
const sizeName = (bytes) => {
  for (const [u, f] of [["TiB", 2 ** 40], ["GiB", 2 ** 30], ["MiB", 2 ** 20], ["KiB", 2 ** 10]]) if (bytes >= f && Number.isInteger(bytes / f)) return `${bytes / f} ${u}`;
  return `${bytes} bytes`;
};
const rows = [8, 10, 16, 20, 24, 32].map((n) => [n, `2^${n}`, (2 ** n).toLocaleString("en-GB").replace(/,/g, " "), sizeName(2 ** n)]);
const table = mdTable(["Address lines", "Locations", "Number of locations", "Memory (1 byte per location)"], rows);
// lines needed for 6000 locations? use a clean example: 12 KiB needs?
const need = Math.ceil(Math.log2(12 * 1024));
chk(need, 14);
// transfer rate
const width = 32, mhz = 100;
const mbit = width * mhz;
chk(mbit, 3200);
const mbyte = mbit / 8;
// word on a data bus: bytes per transfer
const transfers = Math.ceil((64 * 8) / width); // 64 bytes in 32-bit transfers? 64*8 bits / 32 = 16
chk(transfers, 16);
export const snips = {
  table,
  need: String(need),
  locs12k: String(12 * 1024),
  mbit: String(mbit),
  mbyte: String(mbyte),
  transfers: String(transfers),
  bits512: String(64 * 8),
  addrBin: toBase(1000, 2, 16),
};
if (process.argv[1].endsWith("w1b-buses-ports.mjs")) console.log(snips);
