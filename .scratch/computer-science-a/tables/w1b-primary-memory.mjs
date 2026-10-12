import { chk, mdTable } from "../lib.mjs";
// ROM size from address lines and word width
const addrLines = 12, width = 8;
const words = 2 ** addrLines;
const romBits = words * width;
chk(romBits / 8, 4096);
// Streaming buffer
const rateMbit = 6; // Mbit/s consumed
const seconds = 10;
const bufBits = rateMbit * 1e6 * seconds;
// Printer buffer
const fileMiB = 3, pcRate = 60, printerRate = 0.5;
const sendSecs = fileMiB / pcRate;
const printSecs = fileMiB / printerRate;
const table = mdTable(
  ["Type", "Volatile?", "Can it be changed?", "How it is erased", "Typical use"],
  [
    ["SRAM", "Yes", "Read and write", "Overwritten", "Cache"],
    ["DRAM", "Yes", "Read and write", "Overwritten (refreshed constantly)", "Main memory"],
    ["ROM (mask)", "No", "Read only", "Cannot be erased", "Fixed start-up code in a device"],
    ["PROM", "No", "Programmed once", "Cannot be erased", "Small production runs of firmware"],
    ["EPROM", "No", "Reprogrammable", "Ultraviolet light through a window", "Development of firmware"],
    ["EEPROM", "No", "Reprogrammable", "Electrically, byte by byte, in the circuit", "Settings stored in a device"],
    ["Flash", "No", "Reprogrammable", "Electrically, in blocks", "USB drives, SSDs, memory cards"],
  ],
);
export const snips = {
  words: String(words),
  romBits: String(romBits),
  romBytes: String(romBits / 8),
  bufBits: String(bufBits),
  bufBytes: String(bufBits / 8),
  sendSecs: String(sendSecs),
  printSecs: String(printSecs),
  table,
};
if (process.argv[1].endsWith("w1b-primary-memory.mjs")) console.log(snips);
