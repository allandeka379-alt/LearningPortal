// Tables for lessons/db/security.md (run: node .scratch/computer-science/tables/w4c-security.mjs).
import { table } from "../slices/w4c-0-kit.mjs";

const t = table("Staff", [["StaffID", "TEXT"], ["StaffName", "TEXT"], ["Department", "TEXT"], ["Extension", "INTEGER"], ["Salary", "INTEGER"]], [
  ["ST-A", "R. Mutasa", "Science", 214, 910],
  ["ST-B", "T. Ncube", "Languages", 207, 870],
  ["ST-C", "C. Mpofu", "Science", 219, 940],
  ["ST-D", "F. Banda", "Bursary", 230, 820],
]);
console.log(t.md);
t.run("CREATE VIEW StaffDirectory AS SELECT StaffName, Department, Extension FROM Staff");
console.log(t.result("SELECT * FROM StaffDirectory").md);
// Backups: full on Sunday, incremental Mon..Sat; failure during Thursday.
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fail = days.indexOf("Thursday");
const needed = days.slice(0, fail); // Sunday full + Mon, Tue, Wed incrementals (each made at end of day)
console.log(needed, needed.length);
