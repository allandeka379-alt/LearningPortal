import { mdTable, chk, same, sql } from "../lib.mjs";
// Hardware store orders: the table the lesson normalises.
const cols = ["OrderNo", "Date", "CustomerID", "CustomerName", "CustomerCity", "ProductCode", "ProductName", "UnitPrice", "Quantity"];
const rows = [
  [5001, "2026-03-02", "C10", "Mutare Builders", "Mutare", "P1", "Cement bag", 12.5, 20],
  [5001, "2026-03-02", "C10", "Mutare Builders", "Mutare", "P2", "Paint tin", 8, 5],
  [5002, "2026-03-02", "C11", "Kariba Supplies", "Kariba", "P1", "Cement bag", 12.5, 10],
  [5003, "2026-03-04", "C10", "Mutare Builders", "Mutare", "P3", "Nails (kg)", 2, 30],
  [5003, "2026-03-04", "C10", "Mutare Builders", "Mutare", "P1", "Cement bag", 12.5, 4],
  [5004, "2026-03-05", "C12", "Hwange Traders", "Hwange", "P2", "Paint tin", 8, 8],
  [5004, "2026-03-05", "C12", "Hwange Traders", "Hwange", "P3", "Nails (kg)", 2, 15],
];
const fmtAt = (i) => (r) => r.map((v, j) => (j === i ? v.toFixed(2) : v));
const idx = Object.fromEntries(cols.map((c, i) => [c, i]));
const project = (names) => {
  const seen = new Map();
  for (const r of rows) {
    const p = names.map((n) => r[idx[n]]);
    seen.set(JSON.stringify(p), p);
  }
  return [...seen.values()];
};
const customer = project(["CustomerID", "CustomerName", "CustomerCity"]);
const order = project(["OrderNo", "Date", "CustomerID"]);
const product = project(["ProductCode", "ProductName", "UnitPrice"]);
const line = project(["OrderNo", "ProductCode", "Quantity"]);
same([customer.length, order.length, product.length, line.length], [3, 4, 3, 7]);
const cells1 = rows.length * cols.length;
const cells3 = customer.length * 3 + order.length * 3 + product.length * 3 + line.length * 3;
chk(cells1, 63);
chk(cells3, 51);
// anomaly counts
const p1rows = rows.filter((r) => r[idx.ProductCode] === "P1").length;
chk(p1rows, 3);
const c10rows = rows.filter((r) => r[idx.CustomerID] === "C10").length;
chk(c10rows, 4);
// deleting order 5004 removes the only rows for customer C12
const c12only = rows.filter((r) => r[idx.CustomerID] === "C12").every((r) => r[idx.OrderNo] === 5004);
same(c12only, true);
// lossless join check in SQLite
const setup = `
CREATE TABLE Flat(OrderNo INT, Date TEXT, CustomerID TEXT, CustomerName TEXT, CustomerCity TEXT, ProductCode TEXT, ProductName TEXT, UnitPrice REAL, Quantity INT);
${rows.map((r) => `INSERT INTO Flat VALUES (${r.map((v) => (typeof v === "string" ? `'${v}'` : v)).join(",")});`).join("\n")}
CREATE TABLE Customer AS SELECT DISTINCT CustomerID, CustomerName, CustomerCity FROM Flat;
CREATE TABLE "Order" AS SELECT DISTINCT OrderNo, Date, CustomerID FROM Flat;
CREATE TABLE Product AS SELECT DISTINCT ProductCode, ProductName, UnitPrice FROM Flat;
CREATE TABLE OrderLine AS SELECT OrderNo, ProductCode, Quantity FROM Flat;
`;
const joined = sql(setup, `SELECT o.OrderNo, o.Date, c.CustomerID, c.CustomerName, c.CustomerCity, p.ProductCode, p.ProductName, p.UnitPrice, l.Quantity
FROM OrderLine l INNER JOIN "Order" o ON l.OrderNo = o.OrderNo INNER JOIN Customer c ON o.CustomerID = c.CustomerID INNER JOIN Product p ON l.ProductCode = p.ProductCode
ORDER BY o.OrderNo, p.ProductCode`);
const orig = [...rows].sort((a, b) => a[0] - b[0] || (a[5] < b[5] ? -1 : 1));
same(JSON.stringify(joined.rows), JSON.stringify(orig));
// UNF
const unf = [
  [5001, "C10", "P1, P2", "20, 5"],
  [5002, "C11", "P1", "10"],
  [5003, "C10", "P3, P1", "30, 4"],
];
export const snips = {
  unf: mdTable(["OrderNo", "CustomerID", "ProductCode", "Quantity"], unf),
  flat: mdTable(cols, rows.map(fmtAt(7))),
  customer: mdTable(["CustomerID (PK)", "CustomerName", "CustomerCity"], customer),
  order: mdTable(["OrderNo (PK)", "Date", "CustomerID (FK)"], order),
  product: mdTable(["ProductCode (PK)", "ProductName", "UnitPrice"], product.map(fmtAt(2))),
  line: mdTable(["OrderNo (PK, FK)", "ProductCode (PK, FK)", "Quantity"], line),
  order2nf: mdTable(["OrderNo (PK)", "Date", "CustomerID", "CustomerName", "CustomerCity"], project(["OrderNo", "Date", "CustomerID", "CustomerName", "CustomerCity"])),
  cells1: String(cells1),
  cells3: String(cells3),
  saved: String(cells1 - cells3),
  nRows: String(rows.length),
  p1rows: String(p1rows),
  c10rows: String(c10rows),
};
if (process.argv[1].endsWith("w3b-normalisation.mjs")) console.log(snips);
