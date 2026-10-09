// Tables for lessons/db/advanced-queries.md (run: node .scratch/computer-science/tables/w4c-advanced-queries.mjs).
import { table } from "../slices/w4c-0-kit.mjs";

const t = table("Products", [["ProductID", "TEXT"], ["ProductName", "TEXT"], ["UnitPrice", "INTEGER"]], [
  ["F1", "Eggs (tray)", 6],
  ["F2", "Honey (jar)", 4],
  ["F3", "Maize meal (10 kg)", 9],
], [{ name: "Sales", columns: [["SaleID", "INTEGER"], ["ProductID", "TEXT"], ["Quantity", "INTEGER"], ["SaleDay", "TEXT"]], rows: [
  [851, "F1", 3, "Monday"],
  [852, "F3", 2, "Monday"],
  [853, "F2", 5, "Tuesday"],
  [854, "F1", 4, "Tuesday"],
  [855, "F3", 1, "Wednesday"],
  [856, "F1", 2, "Wednesday"],
] }]);
console.log(t.md + "\n\n" + t.mdOf("Sales"));
const q1 = "SELECT Sales.SaleID, Products.ProductName, Sales.Quantity, Sales.Quantity * Products.UnitPrice AS LineTotal\nFROM Sales\nINNER JOIN Products ON Sales.ProductID = Products.ProductID\nWHERE Sales.SaleDay = 'Tuesday';";
console.log("\n" + q1 + "\n" + t.result(q1).md);
const q2 = "SELECT Products.ProductName, SUM(Sales.Quantity) AS TotalSold\nFROM Sales\nINNER JOIN Products ON Sales.ProductID = Products.ProductID\nGROUP BY Products.ProductName\nORDER BY TotalSold DESC;";
console.log("\n" + q2 + "\n" + t.result(q2).md);
console.log(t.result("SELECT SUM(Sales.Quantity * Products.UnitPrice) AS Takings FROM Sales INNER JOIN Products ON Sales.ProductID = Products.ProductID").md);
console.log(t.result("SELECT SaleID, Quantity FROM Sales WHERE SaleDay = 'Wednesday'").md);
