// Tables for lessons/transmission/error-detection.md (w1b).
import { toBase, fromBase } from "../lib.mjs";
const ones = (s) => [...s].filter((c) => c === "1").length;
const parityBit = (bits7, kind) => { const n = ones(bits7); return kind === "even" ? n % 2 : 1 - (n % 2); };
// WE1: even parity on 7-bit 1011001
const d = "1011001";
console.log("WE1 ones", ones(d), "even bit", parityBit(d, "even"), "byte", parityBit(d, "even") + d, "odd bit", parityBit(d, "odd"));
// WE2 parity block (even parity), 4 bytes, one bit flipped
const rows = ["1101001", "0110110", "1000111", "0011010"].map((r) => parityBit(r, "even") + r);
const colP = Array.from({ length: 8 }, (_, i) => String(rows.reduce((s, r) => s + Number(r[i]), 0) % 2)).join("");
console.log("sent rows", rows, "parity byte", colP);
const recv = rows.slice(); recv[2] = recv[2].slice(0, 4) + (recv[2][4] === "1" ? "0" : "1") + recv[2].slice(5);
const all = [...recv, colP];
console.log("| Byte | " + ["P", "1", "2", "3", "4", "5", "6", "7"].join(" | ") + " | 1s in row | OK? |");
all.forEach((r, i) => console.log(`| ${i < 4 ? i + 1 : "Parity byte"} | ${r.split("").join(" | ")} | ${ones(r)} | ${ones(r) % 2 === 0 ? "yes" : "no"} |`));
const colOnes = Array.from({ length: 8 }, (_, i) => all.reduce((s, r) => s + Number(r[i]), 0));
console.log("col ones", colOnes.join(","), "bad cols", colOnes.map((c, i) => (c % 2 ? i : null)).filter((x) => x !== null));
// WE3 ISBN-13 check digit for 978-0-30640615-? (we use our own number)
const isbn12 = "978186197271";
const w = [...isbn12].map((c, i) => Number(c) * (i % 2 === 0 ? 1 : 3));
const sum = w.reduce((a, b) => a + b, 0);
console.log("ISBN weights products", w.join(" + "), "=", sum, "check", (10 - (sum % 10)) % 10);
console.log("| Digit | " + [...isbn12].join(" | ") + " |");
console.log("| Weight | " + [...isbn12].map((_, i) => (i % 2 === 0 ? 1 : 3)).join(" | ") + " |");
console.log("| Product | " + w.join(" | ") + " |");
// WE4 checksum: sum of bytes mod 256
const bytes = [120, 45, 200, 33];
const cs = bytes.reduce((a, b) => a + b, 0);
console.log("checksum sum", cs, "mod 256", cs % 256);
