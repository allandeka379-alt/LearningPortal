// W4a: figures and tables for the finance lessons (money to cash flow forecasts). Run: node .scratch/business/tables/w4a-lessons.mjs
import { f, money, fmt, r2, round, table, statement, cashFlow, check, sum } from "../lib.mjs";

const out = (k, v) => console.log(`\n=== ${k}\n${v}`);

// money: inflation
const b0 = 80, b1 = 86;
out("money WE1", `rise ${b1 - b0}; rate ${round(((b1 - b0) / b0) * 100, 1)}%`);
const wage = 300, rise = 20;
out("money WE2", `old-price value ${r2(wage / (1 + rise / 100))}`);

// income-saving-investment
const p = 600, rate = 5, yrs = 2;
const si = r2((p * rate * yrs) / 100);
out("saving WE1", `interest ${si}; total ${p + si}`);
const inv = 400, sRate = 6, div = 30, endVal = 420;
const sInt = r2((inv * sRate) / 100), sh = div + (endVal - inv);
out("saving WE2", `savings ${sInt}; shares ${sh} = ${round((sh / inv) * 100, 1)}%`);

// personal budget
const inc = [["Wages", 420], ["Tuck-shop sales profit", 80]];
const exp = [["Rent", 150], ["Food", 140], ["Transport", 60], ["School fees", 70], ["Electricity and water", 35], ["Airtime and data", 25]];
const ti = sum(inc.map((x) => x[1])), te = sum(exp.map((x) => x[1]));
out("budget WE1", table(["Item", "US\\$"], [["**Income**", null], ...inc, ["Total income", ti], ["**Expenditure**", null], ...exp, ["Total expenditure", te], ["Surplus (available to save)", ti - te]]));
const loan = 1200, lr = 15;
const li = r2((loan * lr) / 100);
out("budget WE2", `interest ${li}; total ${loan + li}; monthly ${r2((loan + li) / 12)}`);

// taxation
const pre = 240, vat = 15;
out("tax WE1", `VAT ${r2((pre * vat) / 100)}; price ${r2(pre * 1.15)}`);
const salary = 700, free = 100, itRate = 20;
const it = r2(((salary - free) * itRate) / 100);
out("tax WE2", `taxable ${salary - free}; tax ${it}; net ${salary - it}`);
const imp = 2000, duty = 25;
out("tax WE3", `duty ${r2((imp * duty) / 100)}`);

// commercial banks: statement
const open = 850;
const tx = [["1 Mar", "Balance brought forward", null, null, open], ["4 Mar", "Cash deposit", null, 400], ["9 Mar", "Cheque 000214 (supplier)", 620, null], ["15 Mar", "Standing order: insurance", 150, null], ["31 Mar", "Bank charges", 12, null]];
let bal = open;
const rows = tx.map(([d, det, dr, cr, b]) => {
  if (b === undefined) bal = r2(bal - (dr ?? 0) + (cr ?? 0));
  return [d, det, dr ?? "", cr ?? "", bal];
});
out("bank WE1", table(["Date", "Details", "Debit US\\$", "Credit US\\$", "Balance US\\$"], rows, { align: ["l", "l", "r", "r", "r"] }));
const b2 = 300, chq = 750, odr = 2;
out("bank WE2", `overdrawn ${chq - b2}; interest ${r2(((chq - b2) * odr) / 100)}`);

// need for finance
const su = [["Equipment (two sewing machines and a table)", 2400], ["Opening stock of fabric and thread", 900], ["Rent deposit for a workshop", 600], ["Cash reserve for the first months", 300]];
out("need WE1", table(["Start-up need", "US\\$"], [...su, ["Total start-up capital", sum(su.map((x) => x[1]))]]));
out("need WE2", `oven 3500 - savings 1500 = ${3500 - 1500}`);

// sources
const L = 5000, Lr = 12, Ly = 2;
const Li = r2((L * Lr * Ly) / 100);
out("sources WE1", `interest ${Li}; total ${L + Li}; monthly ${r2((L + Li) / 24)}`);
const leaseM = 240, hpDep = 1000, hpI = 230, hpN = 24;
out("sources WE2", `lease ${leaseM * 24}; HP ${hpDep + hpI * hpN}`);

// shares
const ord = 50000, pref = 20000, prefRate = 8, avail = 9600;
const pd = r2((pref * prefRate) / 100), od = avail - pd;
out("shares WE1", `pref ${pd}; ord ${od}; per share ${round(od / ord, 2)}; ${round((od / ord) * 100, 1)}%`);
const deb = 30000, debR = 10;
out("shares WE2", `deb interest ${r2((deb * debR) / 100)}`);
out("capital", table(["Type of capital", "US\\$"], [["Authorised capital (maximum the company may issue)", 100000], ["Issued capital (shares actually issued)", 80000], ["Called-up capital (amount asked for so far)", 60000], ["Paid-up capital (amount received)", 55000], ["Calls in arrear (called up but not yet paid)", 60000 - 55000]]));

// stock exchange
const n1 = 2000, ip = 0.5, sp = 0.58;
out("zse WE1", `cost ${n1 * ip}; sold ${r2(n1 * sp)}; gain ${r2(n1 * (sp - ip))}`);
const n2 = 1000, s2 = 1.2, b2p = 1.05;
out("zse WE2", `sold ${n2 * s2}; bought back ${r2(n2 * b2p)}; gain ${r2(n2 * (s2 - b2p))}`);

// working capital
const ca = [["Inventory (stock)", 6500], ["Trade receivables (debtors)", 3200], ["Cash and bank", 1300]];
const cl = [["Trade payables (creditors)", 4800], ["Bank overdraft", 1200]];
const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
out("wc WE1", statement("Extract from the statement of financial position of Nyasha Hardware", [["**Current assets**"], ...ca.map(([l, v]) => [l, v]), ["Total current assets", null, tca], ["**Current liabilities**"], ...cl.map(([l, v]) => [l, v]), ["Total current liabilities", null, tcl], ["Working capital", null, f.workingCapital(tca, tcl)]], { checks: [["ca", tca, 11000], ["cl", tcl, 6000]] }));
const ca2 = 7400, cl2 = 8100;
out("wc WE2", `wc ${f.workingCapital(ca2, cl2)}; after loan cash +2000: ${f.workingCapital(ca2 + 2000, cl2)}`);

// cash flow forecast
const cf1 = cashFlow({
  months: ["July", "August", "September"], opening: 400,
  inflows: [["Cash sales", [2600, 2400, 3100]], ["Owner's capital", [500, 0, 0]]],
  outflows: [["Purchases of stock", [1800, 1700, 2100]], ["Rent", [350, 350, 350]], ["Wages", [600, 600, 600]], ["New fridge", [0, 900, 0]]],
});
out("cff WE1", cf1.md + `\nclosing ${cf1.closing}`);
const cf2 = cashFlow({
  months: ["July", "August", "September"], opening: 400,
  inflows: [["Cash sales", [2600, r2(2400 * 0.8), 3100]], ["Owner's capital", [500, 0, 0]]],
  outflows: [["Purchases of stock", [1800, 1700, 2100]], ["Rent", [350, 350, 350]], ["Wages", [600, 600, 600]], ["New fridge", [0, 900, 0]]],
});
out("cff WE2", cf2.md + `\nclosing ${cf2.closing}`);
