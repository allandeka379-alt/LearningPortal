import { chk, round, transferSeconds, toBytes, bytesTo, mdTable } from "../lib.mjs";
// Rotational latency
const rpm = 7200;
const revMs = (60 / rpm) * 1000;
const latency = revMs / 2;
const seek = 9;
const access = seek + latency;
chk(round(revMs, 3), 8.333, 1e-3);
// Backup time over a link
const sizeGiB = 90;
const bits = toBytes(sizeGiB, "GiB") * 8;
const secs = transferSeconds(bits, 400e6);
// Flash cells
const cells = 2 ** 33 * 8 / 1; // 8 GiB at 1 bit per cell
chk(cells, 8 * 2 ** 33);
const tlcCells = (8 * 2 ** 30 * 8) / 3;
const speeds = mdTable(
  ["Spindle speed (rpm)", "Time for one revolution (ms)", "Average rotational latency (ms)"],
  [5400, 7200, 10000].map((r) => [r, round((60 / r) * 1000, 2), round((60 / r) * 500, 2)]),
);
export const snips = {
  revMs: String(round(revMs, 2)),
  latency: String(round(latency, 2)),
  access: String(round(access, 2)),
  speeds,
  secs: String(round(secs, 0)),
  mins: String(round(secs / 60, 1)),
  gibBits: String(toBytes(sizeGiB, "GiB") * 8),
  cells1: String(8 * 2 ** 30 * 8),
  cells2: String((8 * 2 ** 30 * 8) / 2),
};
if (process.argv[1].endsWith("w1b-secondary-storage.mjs")) console.log(snips);
