// Tables for lessons/db/sql.md (run: node .scratch/computer-science/tables/w4c-sql.mjs). Queries run in SQLite.
import { table } from "../slices/w4c-0-kit.mjs";

export const plants = table("Plants", [["PlantID", "TEXT"], ["PlantName", "TEXT"], ["Type", "TEXT"], ["Price", "INTEGER"], ["Stock", "INTEGER"], ["Indoor", "INTEGER", { bool: true }]], [
  ["PL01", "Basil", "Herb", 3, 64, true],
  ["PL02", "Msasa", "Tree", 18, 7, false],
  ["PL03", "Aloe", "Succulent", 6, 23, true],
  ["PL04", "Rosemary", "Herb", 4, 38, false],
  ["PL05", "Bougainvillea", "Shrub", 9, 16, false],
  ["PL06", "Mint", "Herb", 2, 52, true],
  ["PL07", "Jacaranda", "Tree", 21, 5, false],
  ["PL08", "Snake plant", "Succulent", 8, 29, true],
]);
export const qs = [
  "SELECT PlantName, Price\nFROM Plants\nWHERE Type = 'Herb'\nORDER BY Price DESC;",
  "SELECT COUNT(*)\nFROM Plants\nWHERE Indoor = TRUE AND Price < 7;",
  "SELECT SUM(Stock)\nFROM Plants\nWHERE Type = 'Tree' OR Type = 'Shrub';",
  "SELECT PlantName, Stock\nFROM Plants\nWHERE Stock < 20\nORDER BY PlantName ASC;",
  "SELECT PlantName\nFROM Plants\nWHERE Type = 'Tree' AND Type = 'Shrub';",
];
if (process.argv[1].endsWith("w4c-sql.mjs")) {
  console.log(plants.md);
  for (const q of qs) console.log("\n" + q + "\n" + plants.result(q).md);
}
