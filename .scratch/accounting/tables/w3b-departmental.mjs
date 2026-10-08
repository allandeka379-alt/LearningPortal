import { departmental, apportion, table, U } from "./w3b-lib.mjs";
export const ex1 = departmental({
  name: "Tatenda's General Dealer", depts: ["Groceries", "Hardware"],
  revenue: [84000, 56000], openInv: [6200, 9400], purchases: [63500, 38900], closeInv: [7100, 10300],
  expenses: [
    ["Wages (staff 5 : 3)", apportion(18000, [5, 3])],
    ["Rent (floor area 300 : 500)", apportion(9600, [300, 500])],
    ["Electricity (floor area)", apportion(2400, [300, 500])],
    ["Advertising (revenue)", apportion(2800, [84000, 56000])],
    ["General expenses (equally)", apportion(1500, [1, 1])],
  ],
});
export const ex2 = departmental({
  name: "Thandeka's Store", depts: ["Clothing", "Shoes"],
  revenue: [72000, 24000], openInv: [8000, 4500], purchases: [50600, 17400], closeInv: [9200, 5100],
  expenses: [
    ["Wages (staff 4 : 2)", apportion(12600, [4, 2])],
    ["Rent (floor area 2 : 1)", apportion(7200, [2, 1])],
    ["Insurance (floor area)", apportion(1800, [2, 1])],
    ["Advertising (revenue)", apportion(1920, [72000, 24000])],
  ],
});
if (process.argv[1]?.endsWith("w3b-departmental.mjs")) {
  console.log(table(["Expense", `Total ${U}`, "Basis", `Groceries ${U}`, `Hardware ${U}`], [
    ["Wages", 18000, "Staff 5 : 3", ...apportion(18000, [5, 3])],
    ["Rent", 9600, "Floor area 300 : 500", ...apportion(9600, [300, 500])],
    ["Electricity", 2400, "Floor area 300 : 500", ...apportion(2400, [300, 500])],
    ["Advertising", 2800, "Revenue 84,000 : 56,000", ...apportion(2800, [84000, 56000])],
    ["General expenses", 1500, "Equally", ...apportion(1500, [1, 1])],
  ]));
  console.log();
  for (const e of [ex1, ex2]) console.log(e.md, "\n", JSON.stringify({ ...e, md: 0 }), "\n");
}
