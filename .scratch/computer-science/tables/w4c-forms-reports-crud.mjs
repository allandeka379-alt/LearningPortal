// Tables for lessons/db/forms-reports-crud.md (run: node .scratch/computer-science/tables/w4c-forms-reports-crud.mjs).
import { table } from "../slices/w4c-0-kit.mjs";

const t = table("Repairs", [["JobNo", "INTEGER"], ["Customer", "TEXT"], ["Device", "TEXT"], ["Fault", "TEXT"], ["Cost", "INTEGER"], ["Collected", "INTEGER", { bool: true }]], [
  [701, "T. Mapfumo", "Phone", "Screen", 45, true],
  [702, "C. Hove", "Tablet", "Battery", 30, false],
  [703, "S. Phiri", "Phone", "Charging port", 15, false],
  [704, "N. Zulu", "Laptop", "Keyboard", 55, false],
]);
console.log(t.md);
const steps = [
  "INSERT INTO Repairs VALUES (705, 'R. Gono', 'Phone', 'Battery', 25, FALSE);",
  "UPDATE Repairs SET Collected = TRUE WHERE JobNo = 702;",
  "UPDATE Repairs SET Cost = Cost + 10 WHERE Device = 'Phone' AND Collected = FALSE;",
  "DELETE FROM Repairs WHERE Collected = TRUE;",
];
// run against the same in-memory db via run() (prepare().all() works for DML too)
for (const s of steps) { t.run(s); console.log("\n" + s + "\n" + t.result("SELECT * FROM Repairs").md); }
console.log(t.result("SELECT Customer, Device, Cost FROM Repairs WHERE Cost >= 40 ORDER BY Cost DESC").md);
console.log(t.result("SELECT Device, COUNT(*) AS Jobs, SUM(Cost) AS Total FROM Repairs GROUP BY Device ORDER BY Device").md);
