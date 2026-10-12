import { caesar, mdTable, same } from "../lib.mjs";
/** columnar transposition: write text (letters only, upper case) in rows of `cols`, pad with X, read columns in `order` (1-based) */
export function transpose(text, cols, order = null, pad = "X") {
  const t = text.toUpperCase().replace(/[^A-Z]/g, "");
  const padded = t + pad.repeat((cols - (t.length % cols)) % cols);
  const rows = []; for (let i = 0; i < padded.length; i += cols) rows.push(padded.slice(i, i + cols));
  const ord = order ?? Array.from({ length: cols }, (_, i) => i + 1);
  return { rows, cipher: ord.map((c) => rows.map((r) => r[c - 1]).join("")).join("") };
}
export function untranspose(cipher, cols, order = null) {
  const n = cipher.length / cols; const ord = order ?? Array.from({ length: cols }, (_, i) => i + 1);
  const rows = Array.from({ length: n }, () => Array(cols));
  ord.forEach((c, k) => { for (let r = 0; r < n; r++) rows[r][c - 1] = cipher[k * n + r]; });
  return rows.map((r) => r.join("")).join("");
}
export const sharedKeys = (n) => n * (n - 1) / 2;
export const freq = (s) => { const f = {}; for (const ch of s.toUpperCase().replace(/[^A-Z]/g, "")) f[ch] = (f[ch] ?? 0) + 1; return Object.entries(f).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); };
if (process.argv[1].endsWith("w2b-encryption.mjs")) {
  console.log(caesar("MEET AT THE GATE", 3), caesar("PHHW DW WKH JDWH", -3));
  const t = transpose("MEET AT THE GATE", 4); console.log(t, untranspose(t.cipher, 4));
  const t2 = transpose("MEET AT THE GATE", 4, [3,1,4,2]); console.log(t2.cipher, untranspose(t2.cipher,4,[3,1,4,2]));
  console.log(mdTable(["Key","Decrypted attempt"], [0,1,2,3,4,5].map(k=>[k, caesar("PHHW DW WKH JDWH", -k)])));
  console.log(sharedKeys(10), sharedKeys(30), freq("PHHW DW WKH JDWH").slice(0,4));
}
