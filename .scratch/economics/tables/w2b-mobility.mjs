// Tables for lessons/labour/mobility.md (W2b).
import { table, check } from "../lib.mjs";
const now = { wage: 430, rent: 90, transport: 25 }, move = { wage: 520, rent: 170, transport: 35 };
const left = (x) => x.wage - x.rent - x.transport;
check("now", left(now), 315);
check("move", left(move), 315);
console.log(table(["Monthly item (US\\$)", "Stay in Bulawayo", "Move to Harare"], [["Wage", now.wage, move.wage], ["Rent", now.rent, move.rent], ["Transport to work", now.transport, move.transport], ["**Left after rent and transport**", `**${left(now)}**`, `**${left(move)}**`]]));
// Retraining payback.
const fee = 600, gain = 75;
check("payback", fee / gain, 8);
console.log(fee / gain);
