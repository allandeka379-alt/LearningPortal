import { table, chk, r2, operations } from "../lib.mjs";
const use = 30, lead = 4, buffer = 60, qty = 300;
const rol = operations.reorderLevel({ usagePerDay: use, leadTimeDays: lead, buffer }); chk(rol, 180);
const max = buffer + qty; chk(max, 360);
const rows = []; let stock = max; let orderDay = null, arrive = null;
for (let d = 0; d <= 12; d++) {
  let note = "";
  if (d === arrive) { stock += qty; note = "Delivery of 300 bags arrives"; }
  rows.push([`Day ${d}`, stock, note]);
  if (orderDay === null && stock <= rol) { orderDay = d; arrive = d + lead; rows[rows.length - 1][2] = "Stock reaches 180: order placed"; }
  stock -= use;
}
console.log(table(["Day", "Stock at start of day (bags)", "Event"], rows, ["l", "r", "l"]));
const avg = (max + buffer) / 2; chk(avg, 210);
console.log("avg", avg, avg * 9, avg * 9 * 0.12, (30 * 5 * 2.5), 30 * 9 * 0.12);
