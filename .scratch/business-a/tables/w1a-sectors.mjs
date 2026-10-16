import { table, chk, rd } from "../lib.mjs";
const secs = ["Primary", "Secondary", "Tertiary", "Quaternary"];
const y1 = [1200, 500, 800, 100], y2 = [900, 450, 1500, 250];
const t1 = y1.reduce((a, b) => a + b), t2 = y2.reduce((a, b) => a + b);
console.log(t1, t2);
const rows = secs.map((s, i) => {
  const p1 = rd((y1[i] / t1) * 100, 1), p2 = rd((y2[i] / t2) * 100, 1);
  return [s, y1[i], p1.toFixed(1), y2[i], p2.toFixed(1), rd(p2 - p1, 1).toFixed(1)];
});
console.log(table(["Sector", "2005 jobs (000)", "2005 share (%)", "2025 jobs (000)", "2025 share (%)", "Change (percentage points)"], [...rows, ["Total", t1, "100.0", t2, "100.0", ""]]));
console.log(rows.reduce((a, r) => a + Number(r[2]), 0), rows.reduce((a, r) => a + Number(r[4]), 0));
