import { bitmapBits, bytesTo, chk, round } from "../lib.mjs";
// resistive touch: 4-wire, voltage divider along the layer
const supply = 5, reading = 2.0, length = 120;
const pos = (reading / supply) * length;
chk(pos, 48);
// laser printer: pages per minute
const pages = 300, ppm = 24;
const minutes = pages / ppm;
chk(minutes, 12.5);
// VR data rate, uncompressed
const bitsPerFrame = bitmapBits(1920, 1080, 24) * 2;
const perSec = (bitsPerFrame * 90) / 8;
const mib = bytesTo(perSec, "MiB");
export const snips = {
  pos: String(pos),
  minutes: String(minutes),
  frameBytes: String(bitsPerFrame / 8),
  perSec: String(perSec),
  mib: String(round(mib, 1)),
};
if (process.argv[1].endsWith("w1b-io-devices.mjs")) console.log(snips);
