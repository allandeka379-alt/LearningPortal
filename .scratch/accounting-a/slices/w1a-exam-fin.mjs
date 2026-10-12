// W1a exam-format item: ZIMSEC Paper 3 (problem solving) question, EXAM.FIN25. Trial balance, adjustments, statements and analysis.
import { concept, P, EXAM, checkExam, ZIM, table, trialBalance, statement, check, sum, r2, fmt, money, ratios, chk } from "../lib.mjs";

concept("aacc.statements.sole-trader", { file: "exam/w1a-fin", keyPrefix: "exam.w1a-fin", applies: ZIM }, (b) => {
  // ---- Data of Gokwe Traders at 31 December 2025 (capital is the balancing figure of the trial balance)
  const equip = 26000;
  const accDep0 = 6500;
  const allow0 = 660;
  const sales = 209500;
  const returnsIn = 1500;
  const returnsOut = 2400;
  const commission = 2100;
  const openInv = 9800;
  const purchases = 148000;
  const carriage = 1870;
  const wagesTb = 36400;
  const rent = 6200;
  const insTb = 2400;
  const elec = 3100;
  const drawings = 9200;
  const recv = 21600;
  const bank = 7350;
  const payables = 14200;
  const debits = [
    ["Equipment at cost", equip],
    ["Inventory at 1 January 2025", openInv],
    ["Purchases", purchases],
    ["Carriage inwards", carriage],
    ["Returns inwards", returnsIn],
    ["Wages", wagesTb],
    ["Rent", rent],
    ["Insurance", insTb],
    ["Electricity", elec],
    ["Drawings", drawings],
    ["Trade receivables (debtors)", recv],
    ["Bank", bank],
  ];
  const otherCredits = [
    ["Sales", sales],
    ["Returns outwards", returnsOut],
    ["Commission received", commission],
    ["Trade payables (creditors)", payables],
    ["Accumulated depreciation: equipment", accDep0],
    ["Allowance for doubtful debts", allow0],
  ];
  const dTot = sum(debits.map((x) => x[1]));
  const cOther = sum(otherCredits.map((x) => x[1]));
  const capital0 = r2(dTot - cOther);
  const tbRows = debits.map(([n, v]) => [n, v, null]).concat(otherCredits.map(([n, v]) => [n, null, v])).concat([["Capital at 1 January 2025", null, capital0]]);
  const tb = trialBalance("Trial balance at 31 December 2025", tbRows);
  // ---- Adjustments
  const closingInv = 11400;
  const wagesAccrued = 1350;
  const insPrepaid = 620;
  const writeOff = 850;
  const allowRate = 4;
  const deprRate = 10;
  const revenue = r2(sales - returnsIn);
  const cos = r2(openInv + purchases + carriage - returnsOut - closingInv);
  const gp = r2(revenue - cos);
  const wages = r2(wagesTb + wagesAccrued);
  const ins = r2(insTb - insPrepaid);
  const remaining = r2(recv - writeOff);
  const allowance = r2((remaining * allowRate) / 100);
  const allowInc = r2(allowance - allow0);
  const idExp = r2(writeOff + allowInc);
  const dep = r2((equip * deprRate) / 100);
  const expenses = sum([wages, rent, ins, elec, idExp, dep]);
  const profit = r2(gp + commission - expenses);
  // ---- Statement of financial position
  const nbv = r2(equip - accDep0 - dep);
  const netRecv = r2(remaining - allowance);
  const ca = sum([closingInv, netRecv, insPrepaid, bank]);
  const assets = r2(nbv + ca);
  const cl = r2(payables + wagesAccrued);
  const capital1 = r2(capital0 + profit - drawings);
  check("balance", assets, capital1 + cl);
  const gm = ratios.grossMargin(gp, revenue);
  const cr = ratios.current(ca, cl);
  const F = (v) => fmt(v);

  const isModel = statement(
    "Gokwe Traders: income statement for the year ended 31 December 2025",
    [
      ["Sales", null, sales],
      ["Less: returns inwards", null, -returnsIn],
      ["**Revenue**", null, revenue],
      ["Opening inventory", openInv, null],
      ["Purchases", purchases, null],
      ["Carriage inwards", carriage, null],
      ["Less: returns outwards", -returnsOut, null],
      ["Less: closing inventory", -closingInv, null],
      ["**Cost of sales**", null, -cos],
      ["**Gross profit**", null, gp],
      ["Commission received", null, commission],
      [`Wages (${F(wagesTb)} + ${F(wagesAccrued)})`, wages, null],
      ["Rent", rent, null],
      [`Insurance (${F(insTb)} - ${F(insPrepaid)})`, ins, null],
      ["Electricity", elec, null],
      [`Bad debts and increase in allowance (${F(writeOff)} + ${F(allowInc)})`, idExp, null],
      ["Depreciation of equipment", dep, null],
      ["Total expenses", null, -expenses],
      ["**Profit for the year**", null, profit],
    ],
    { cols: ["US\\$", "US\\$"], checks: [["cos", sum([openInv, purchases, carriage, -returnsOut, -closingInv]), cos], ["profit", profit, r2(gp + commission - expenses)]] },
  );
  const data = table(
    ["Adjustments at 31 December 2025", ""],
    [
      ["1", `Closing inventory was valued at ${money(closingInv)}.`],
      ["2", `Wages owing at 31 December 2025 were ${money(wagesAccrued)}.`],
      ["3", `Insurance prepaid at 31 December 2025 was ${money(insPrepaid)}.`],
      ["4", `Bad debts of ${money(writeOff)} are to be written off. The allowance for doubtful debts is to be 4% of the remaining trade receivables.`],
      ["5", "Equipment is to be depreciated at 10% of cost per year, straight line."],
    ],
    ["l", "l"],
  );

  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 3",
    concepts: ["aacc.statements.sole-trader", "aacc.statements.adjustments", "aacc.ledger.accruals-prepayments", "aacc.ledger.irrecoverable-debts", "aacc.ledger.depreciation", "aacc.ratios.profitability", "aacc.ratios.liquidity"],
    stem: `Tendai Gokwe runs Gokwe Traders, a retail shop in Gokwe. The trial balance at 31 December 2025 is given below. The statements are for internal use.\n\n${tb.md}\n\n${data}`,
    parts: checkExam(EXAM.FIN25, [
      P.group({
        label: "(a)", stem: "Income statement figures",
        parts: [
          P.num({ label: "(i)", marks: 3, kind: "money", value: cos, wrong: [r2(openInv + purchases + carriage - returnsOut), r2(openInv + purchases + carriage - returnsOut + closingInv)], stem: "Calculate the cost of sales.", explanation: `Opening inventory ${F(openInv)} + purchases ${F(purchases)} + carriage inwards ${F(carriage)} - returns outwards ${F(returnsOut)} - closing inventory ${F(closingInv)} = ${F(cos)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: gp, wrong: [r2(sales - cos)], stem: "Calculate the gross profit.", explanation: `Revenue ${F(sales)} - ${F(returnsIn)} = ${F(revenue)}; gross profit ${F(revenue)} - ${F(cos)} = ${F(gp)}. Using sales without deducting returns inwards gives ${F(r2(sales - cos))}.` }),
          P.num({ label: "(iii)", marks: 4, kind: "money", value: profit, wrong: [r2(gp + commission - expenses + allowInc), r2(gp - expenses)], stem: "Calculate the profit for the year.", explanation: `Gross profit ${F(gp)} + commission ${F(commission)} - expenses ${F(expenses)} = ${F(profit)}. The expenses are wages ${F(wages)}, rent ${F(rent)}, insurance ${F(ins)}, electricity ${F(elec)}, bad debts and allowance ${F(idExp)} and depreciation ${F(dep)}.` }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Adjustments",
        parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: dep, wrong: [r2(equip * 0.1 * 2)], stem: "Calculate the depreciation charge for 2025.", explanation: `10% × ${F(equip)} = ${F(dep)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: idExp, wrong: [writeOff, allowance], stem: "Calculate the total charge to the income statement for bad debts and the change in the allowance for doubtful debts.", explanation: `Allowance required: 4% × (${F(recv)} - ${F(writeOff)}) = ${F(allowance)}. Increase ${F(allowance)} - ${F(allow0)} = ${F(allowInc)}. Total ${F(writeOff)} + ${F(allowInc)} = ${F(idExp)}.` }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Statement of financial position figures",
        parts: [
          P.num({ label: "(i)", marks: 3, kind: "money", value: ca, wrong: [r2(ca - insPrepaid), r2(ca + allowance)], stem: "Calculate the total current assets at 31 December 2025.", explanation: `Inventory ${F(closingInv)} + net trade receivables (${F(remaining)} - ${F(allowance)} = ${F(netRecv)}) + prepaid insurance ${F(insPrepaid)} + bank ${F(bank)} = ${F(ca)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: capital1, wrong: [r2(capital0 + profit), r2(capital0 - profit - drawings)], stem: "Calculate the capital at 31 December 2025 (opening capital + profit - drawings).", explanation: `${F(capital0)} + ${F(profit)} - ${F(drawings)} = ${F(capital1)}.` }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the income statement for the year ended 31 December 2025.", points: [`Heading with the business name, the statement and the period; revenue ${F(revenue)} after returns inwards`, `Cost of sales ${F(cos)} and gross profit ${F(gp)} with the workings`, `Commission received added; expenses with wages ${F(wages)}, insurance ${F(ins)}, bad debts ${F(idExp)} and depreciation ${F(dep)}`, `Profit for the year ${F(profit)}`], modelAnswer: isModel, explanation: "Award a mark for each section shown correctly, with own-figure credit." }),
      P.group({
        label: "(e)", stem: "Ratios",
        parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: gm, wrong: [r2(ratios.profitMargin(gp, sales))], stem: "Calculate the gross profit margin (gross profit ÷ revenue × 100), as a percentage to one decimal place.", explanation: `${F(gp)} ÷ ${F(revenue)} × 100 = ${F(r2(gm))}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "ratio", value: cr, wrong: [r2(ca / cl - 1)], stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `Current assets ${F(ca)} ÷ current liabilities (${F(payables)} + ${F(wagesAccrued)} = ${F(cl)}) = ${F(r2(cr))}.` }),
        ],
      }),
      P.manual({ label: "(f)", marks: 2, stem: "Tendai says: 'The shop has plenty of liquidity, so I can take more drawings.' Advise him, using the information given.", points: [`The current ratio of ${F(r2(cr))} : 1 looks healthy, but only ${F(bank)} of the current assets is cash and ${F(closingInv)} is inventory that must first be sold`, `Profit for the year is only ${F(profit)} and drawings are already ${F(drawings)}, so higher drawings would reduce capital; advise only a small increase`], modelAnswer: `The current ratio of ${F(r2(cr))} : 1 looks healthy, but only ${money(bank)} is cash and most of the rest is inventory and receivables that must first be turned into cash. The profit is only ${money(profit)} and drawings are already ${money(drawings)}, so larger drawings would reduce capital; I would advise only a small increase, if any.`, explanation: "Use figures and a balanced recommendation." }),
    ]),
    hints: ["Cost of sales: opening inventory + purchases + carriage inwards - returns outwards - closing inventory.", "Deduct the write-off before applying the 4% allowance rate.", "Each adjustment is used twice: once in the income statement and once in the statement of financial position."],
    explanation: "This item tests a trial balance with five adjustments, the income statement and statement of financial position totals, two ratios and advice.",
  });
});
