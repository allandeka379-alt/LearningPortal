// Tables for lessons/db/table-design.md (run: node .scratch/computer-science/tables/w4c-table-design.mjs).
import { table, mdTable } from "../slices/w4c-0-kit.mjs";

const books = table("Books", [["BookID", "TEXT"], ["Title", "TEXT"], ["Author", "TEXT"], ["Category", "TEXT"], ["Pages", "INTEGER"], ["OnLoan", "INTEGER", { bool: true }], ["DateAdded", "TEXT"]], [
  ["B0012", "Rivers of the Lowveld", "T. Moyo", "Geography", 214, true, "14/01/2024"],
  ["B0013", "Coding for Beginners", "R. Ncube", "Computing", 188, false, "14/01/2024"],
  ["B0019", "The Granite Hills", "T. Moyo", "Fiction", 302, false, "03/03/2024"],
  ["B0027", "Birds of Zimbabwe", "C. Dube", "Science", 256, true, "21/05/2024"],
  ["B0031", "Coding for Beginners", "R. Ncube", "Computing", 188, true, "09/09/2024"],
  ["B0034", "Market Day", "N. Sibanda", "Fiction", 145, false, "09/09/2024"],
]);
console.log(books.md);
console.log("fields", books.columns.length, "records", books.count);
for (const [c] of books.columns) {
  const vals = books.rows.map((r) => r[books.columns.findIndex((x) => x[0] === c)]);
  console.log(c, new Set(vals).size === vals.length ? "UNIQUE" : "repeats");
}
