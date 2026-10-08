// W4b: ZIMSEC Paper 2 exam-format item (20 marks): incomplete records with mark-up (ZIMSEC terms).
import { concept, P, money, ZIM } from "../lib.mjs";
import { incomeStatement, financialPosition, statementOfAffairs, receivablesAccount, payablesAccount, table, TERMS, fmt, r2, sum, check, ratios, d1 } from "../tables/w4b-lib.mjs";

concept("acc.incomplete.financial-statements", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  const soa = statementOfAffairs({ name: "Tendai Moyo", date: "1 January 2025", nca: [["Shop fittings", 9800]], ca: [["Stock", 7840], ["Debtors", 3260], ["Rent prepaid", 200], ["Bank", 2280]], cl: [["Creditors", 4380]] });
  const pay = payablesAccount({ title: "Total creditors account", opening: 4380, payments: 51760, closing: 4910 });
  const rec = receivablesAccount({ title: "Total debtors account", opening: 3260, receipts: 61420, closing: 3840 });
  const mu = 40, closeStock = 9270;
  const cos = r2(7840 + pay.creditPurchases - closeStock);
  const sales = r2((cos * (100 + mu)) / 100);
  const cashSales = r2(sales - rec.creditSales);
  const rent = r2(2520 + 200 - 280), gen = r2(1940 + 135), dep = r2(9800 * 0.1);
  const bank = r2(2280 + 61420 + cashSales - 51760 - 7590 - 2520 - 1940 - 6500);
  const is = incomeStatement({ name: "Tendai Moyo", terms: TERMS.ZIM, revenueLabel: "Sales", revenue: sales, openInv: 7840, openInvLabel: "Opening stock", cos: [["Purchases", pay.creditPurchases]], closeInv: closeStock, closeInvLabel: "Less: Closing stock", otherIncome: [], expenses: [["Wages", 7590], ["Rent (2,520 + 200 − 280)", rent], ["General expenses (1,940 + 135)", gen], ["Depreciation: shop fittings", dep]] });
  const fp = financialPosition({ name: "Tendai Moyo", terms: TERMS.ZIM, nca: [["Shop fittings", 9800, dep]], ca: [["Stock", closeStock], ["Debtors", 3840], ["Prepaid expenses (rent)", 280], ["Bank", bank]], cl: [["Creditors", 4910], ["Accrued expenses (general)", 135]], openCap: soa.capital, profit: is.np, drawings: 6500 });
  check("w4b zim gp", is.gp, r2(sales - cos));
  check("w4b zim bank", bank, 2594);
  const npp = ratios.profitMargin(is.np, sales);
  const bankTable = table(["Receipts", "US\\$", "Payments", "US\\$"], [["Balance at 1 January 2025", 2280, "Creditors", 51760], ["Debtors", 61420, "Wages", 7590], ["Cash sales (all banked)", "?", "Rent", 2520], ["", "", "General expenses", 1940], ["", "", "Drawings", 6500]]);
  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.incomplete.financial-statements", "acc.incomplete.statement-of-affairs", "acc.incomplete.missing-figures", "acc.analysis.mark-up-margin", "acc.analysis.profitability-ratios"],
    stem: `Tendai Moyo owns a hardware shop in Chegutu. He does not keep a full set of books. At 1 January 2025 his assets and liabilities were: shop fittings ${money(9800)}, stock ${money(7840)}, debtors ${money(3260)}, rent prepaid ${money(200)}, bank ${money(2280)} and creditors ${money(4380)}.\n\nA summary of his bank account for 2025:\n\n${bankTable}\n\nAdditional information at 31 December 2025:\n\n1. Debtors were ${money(3840)} and creditors ${money(4910)}. All purchases were on credit.\n2. Stock was valued at ${money(closeStock)}.\n3. Tendai sells all goods at a mark-up of ${mu}% on cost. Sales are partly on credit and partly for cash; the cash sales figure was not recorded.\n4. Rent of ${money(280)} was prepaid and general expenses of ${money(135)} were owing.\n5. Shop fittings are to be depreciated at 10% per annum on cost.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: soa.capital, wrong: [r2(soa.capital - 400)], stem: "Calculate Tendai's capital at 1 January 2025.", explanation: `Assets ${fmt(soa.assets)} − creditors 4,380 = ${fmt(soa.capital)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: pay.creditPurchases, wrong: [r2(51760 + 4380 - 4910)], stem: "Calculate the purchases for 2025.", explanation: `Total creditors account: 51,760 + 4,910 − 4,380 = ${fmt(pay.creditPurchases)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cos, stem: "Calculate the cost of sales for 2025.", explanation: `7,840 + ${fmt(pay.creditPurchases)} − ${fmt(closeStock)} = ${fmt(cos)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: sales, wrong: [r2(cos / 0.6)], stem: "Using the mark-up, calculate the total sales for 2025.", explanation: `${fmt(cos)} × 140/100 = ${fmt(sales)}. Treating 40% as a margin gives ${fmt(r2(cos / 0.6))}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: cashSales, wrong: [r2(sales - 61420)], stem: "Calculate the cash sales for 2025.", explanation: `Credit sales (total debtors account) 61,420 + 3,840 − 3,260 = ${fmt(rec.creditSales)}. Cash sales = ${fmt(sales)} − ${fmt(rec.creditSales)} = ${fmt(cashSales)}.` }),
      P.manual({ label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Tendai's income statement for the year ended 31 December 2025.", points: ["Correct heading (name, income statement, for the year ended 31 December 2025)", `Sales ${fmt(sales)} and cost of sales section ${fmt(cos)} (own figures)`, `Gross profit ${fmt(is.gp)}`, `Rent ${fmt(rent)}, general expenses ${fmt(gen)} and depreciation ${fmt(dep)}`, `Wages 7,590; net profit ${fmt(is.np)}`], modelAnswer: is.md, explanation: "Follow-through marks for own figures from (b)-(e)." }),
      P.num({ label: "(g)", marks: 2, kind: "money", value: fp.closing, wrong: [r2(fp.closing + 6500)], stem: "Calculate Tendai's capital at 31 December 2025.", explanation: `${fmt(soa.capital)} + net profit ${fmt(is.np)} − drawings 6,500 = ${fmt(fp.closing)}. This agrees with net assets of ${fmt(fp.netAssets)}.` }),
      P.num({ label: "(h)", marks: 1, kind: "pct", value: npp, stem: "Calculate the net profit percentage, to one decimal place.", explanation: `${fmt(is.np)} ÷ ${fmt(sales)} × 100 = ${d1(npp)}%.` }),
      P.manual({ label: "(i)", marks: 2, stem: "State **two** advantages to Tendai of keeping a full set of double-entry records.", points: ["A trial balance can be drawn up to check arithmetical accuracy", "Sales, purchases and expenses are known directly, so missing cash or stock is easier to detect / figures accepted by lenders and ZIMRA"], modelAnswer: "He could check his books with a trial balance, and he would know his cash sales and expenses exactly, so missing cash would be noticed at once.", explanation: "Any two valid advantages." }),
    ],
    hints: ["Work in order: opening capital, total creditors account, cost of sales, sales from the mark-up, total debtors account for cash sales.", "Rent: paid + opening prepaid − closing prepaid."],
    explanation: `Workings:\n\n${soa.md}\n\n${pay.md}\n\n${rec.md}\n\nModel answers:\n\n${is.md}\n\n${fp.md}`,
  });
});
