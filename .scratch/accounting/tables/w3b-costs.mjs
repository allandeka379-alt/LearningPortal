import { statement } from "../lib.mjs";
import { table, U, r2, sum, check } from "./w3b-lib.mjs";
// Example 1: classification and prime cost (Nyasha's Furniture)
const rm = { open: 4200, purch: 38600, carr: 900, close: 5100 };
const consumed = r2(rm.open + rm.purch + rm.carr - rm.close);
const dl = 24500, de = 1200;
const prime = r2(consumed + dl + de);
const oh = [["Factory supervisor's salary", 9000], ["Factory rent", 6000], ["Factory electricity", 2750], ["Depreciation of factory machinery", 3400], ["Factory cleaning", 800]];
const totOH = sum(oh.map((x) => x[1]));
const fc = r2(prime + totOH);
if (process.argv[1]?.endsWith("w3b-costs.mjs")) {
  console.log(table(["Cost", "Classification"], [
    ["Timber and glue used", "Direct materials"], ["Carpenters' wages", "Direct labour"], ["Royalty per chair to the designer", "Direct expense"],
    ["Factory supervisor's salary", "Factory overhead (indirect)"], ["Factory rent and electricity", "Factory overhead (indirect)"], ["Depreciation of factory machinery", "Factory overhead (indirect)"],
    ["Office salaries", "Not a manufacturing cost (administration)"], ["Delivery van running costs", "Not a manufacturing cost (selling and distribution)"],
  ]));
  console.log();
  console.log(statement("Calculation of prime cost and factory cost", [
    ["Opening inventory of raw materials", rm.open, null], ["Add: Purchases of raw materials", rm.purch, null], ["Add: Carriage inwards on raw materials", rm.carr, null],
    ["", r2(rm.open + rm.purch + rm.carr), null], ["Less: Closing inventory of raw materials", -rm.close, null], ["Cost of raw materials consumed", null, consumed],
    ["Direct labour", null, dl], ["Direct expenses: royalties", null, de], ["**Prime cost**", null, prime], ["Add: Factory overheads", null, null],
    ...oh.map(([l, a], i) => [l, a, i === oh.length - 1 ? totOH : null]), ["**Total factory cost**", null, fc],
  ], { checks: [["consumed", consumed, 38600], ["prime", prime, consumed + dl + de], ["fc", fc, prime + totOH]] }));
  console.log({ consumed, prime, totOH, fc });
  // Example 2: WIP (Chipo's Uniform Factory)
  const mat = 26350, lab = 19800, lic = 1700;
  const p2 = r2(mat + lab + lic);
  const oh2l = [["Indirect wages (supervisor and cleaner)", 7400], ["Factory rent", 4800], ["Factory power", 2520], ["Depreciation of sewing machines", 1600]];
  const oh2 = sum(oh2l.map((x) => x[1]));
  const wo = 3640, wc = 4410, units = 1000;
  const tf = r2(p2 + oh2);
  const prod = r2(tf + wo - wc);
  console.log(statement("Production cost of goods completed", [
    ["Direct materials consumed", null, mat], ["Direct labour", null, lab], ["Direct expenses: design licence fee", null, lic], ["**Prime cost**", null, p2], ["Add: Factory overheads", null, null],
    ...oh2l.map(([l, a], i) => [l, a, i === oh2l.length - 1 ? oh2 : null]), ["Total factory cost", null, tf], ["Add: Opening work in progress", null, wo], ["", null, r2(tf + wo)],
    ["Less: Closing work in progress", null, -wc], ["**Production cost of goods completed**", null, prod],
  ], { checks: [["p2", p2, 47850], ["oh2", oh2, 16320], ["prod", prod, p2 + oh2 + wo - wc]] }));
  console.log({ p2, oh2, tf, prod, perUnit: prod / units });
}
