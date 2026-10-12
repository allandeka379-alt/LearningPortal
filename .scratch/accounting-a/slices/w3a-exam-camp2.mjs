// W3a exam-format items: Cambridge Paper 2 question 1 (30 marks): company statements of profit or loss, changes in equity and financial position
import { concept, P, EXAM, checkExam, table, check, sum, r2, fmt, money, chk, ratios, CAM } from "../lib.mjs";
import { coModel } from "../tables/w3a-models.mjs";

const r1 = (v) => Math.round(v * 10) / 10;
const p1 = (v) => r1(v).toFixed(1);

concept("aacc.company.profit-or-loss", { file: "exam/w3a-camp2", keyPrefix: "exam.w3a-camp2", applies: CAM }, (b) => {
  const PAPER = "Cambridge Paper 2";
  const CONCEPTS = ["aacc.company.profit-or-loss", "aacc.company.changes-in-equity", "aacc.company.financial-position"];

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: trading company
  const d1 = {
    name: "Gokwe Dairy Products Ltd", sc: 78500, prem: 11750, genRes: 14300, loan: 52500, loanLabel: "8% loan notes",
    ppe: [{ label: "Land", cost: 83400, accDep: 0, rate: 0 }, { label: "Equipment", cost: 53700, accDep: 21480, rate: 10 }, { label: "Vehicles", cost: 46300, accDep: 18520, rate: 25, group: "dist" }],
    openInv: 21370, closeInv: 24690, sales: 507350, returnsIn: 5870, purchases: 296430, carriageIn: 3960, returnsOut: 4140,
    income: [{ label: "Discount received", tb: 2340 }],
    expenses: [{ label: "Wages", tb: 64830, acc: 2870 }, { label: "Directors' remuneration", tb: 38350 }, { label: "Delivery expenses", tb: 12370, group: "dist" }, { label: "Insurance", tb: 6810, pre: 925 }, { label: "Lighting and heating", tb: 7615, acc: 545 }, { label: "Loan note interest", tb: 2150, acc: 2050, group: "fin" }, { label: "General expenses", tb: 10145 }],
    recv: 38945, writeOff: 1320, allowPct: 4, allowOpen: 1660, retOpen: 9150, cash: 1445, payables: 29460, tax: 13640, intDiv: 6350, finalDiv: 9650, toGeneral: 5260,
  };
  const m1 = coModel(d1);
  const div1 = r2(d1.intDiv + d1.finalDiv);
  const payout1 = r2((div1 / m1.profit) * 100);
  const cr1 = ratios.current(m1.ca, m1.cl);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.CAM_P2_Q1.skill, secs: EXAM.CAM_P2_Q1.secs, calculator: true, paper: PAPER, applies: EXAM.CAM_P2_Q1.applies, concepts: CONCEPTS,
    stem: `Gokwe Dairy Products Ltd has the trial balance below at 31 December 2025. The trial balance is followed by information at the year end. The statements are for internal use.\n\n${m1.tb.md}\n\n${m1.notesMd}`,
    parts: checkExam(EXAM.CAM_P2_Q1, [
      P.group({ label: "(a)", stem: "Statement of profit or loss.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: m1.cos, wrong: [r2(m1.cos - d1.carriageIn), r2(d1.openInv + d1.purchases - d1.returnsOut - d1.closeInv)], stem: "Calculate the cost of sales.", explanation: `${fmt(d1.openInv)} + ${fmt(d1.purchases)} + ${fmt(d1.carriageIn)} - ${fmt(d1.returnsOut)} - ${fmt(d1.closeInv)} = ${fmt(m1.cos)}.` }),
        P.num({ label: "(ii)", marks: 4, kind: "money", value: m1.pbt, wrong: [m1.profit, r2(m1.pbt + m1.irrCharge)], stem: "Calculate the profit before tax.", explanation: `Gross profit ${fmt(m1.gp)} + discount received ${fmt(m1.incomeTotal)} - distribution costs ${fmt(m1.dist)} - administrative expenses ${fmt(m1.admin)} - finance costs ${fmt(m1.fin)} = ${fmt(m1.pbt)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: m1.profit, wrong: [m1.pbt, r2(m1.pbt - d1.tax - div1)], stem: "Calculate the profit for the year.", explanation: `${fmt(m1.pbt)} - income tax ${fmt(d1.tax)} = ${fmt(m1.profit)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Equity and liabilities at 31 December 2025.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: m1.retClose, wrong: [r2(m1.retClose + d1.finalDiv), r2(m1.retClose + d1.toGeneral)], stem: "Calculate the retained earnings at 31 December 2025.", explanation: `${fmt(m1.retOpen)} + ${fmt(m1.profit)} - interim dividend ${fmt(d1.intDiv)} - final dividend ${fmt(d1.finalDiv)} - transfer ${fmt(d1.toGeneral)} = ${fmt(m1.retClose)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m1.equity, wrong: [r2(m1.equity - d1.toGeneral), r2(m1.equity + d1.finalDiv)], stem: "Calculate the total equity at 31 December 2025.", explanation: `Share capital ${fmt(d1.sc)} + share premium ${fmt(d1.prem)} + general reserve ${fmt(m1.genResClose)} + retained earnings ${fmt(m1.retClose)} = ${fmt(m1.equity)}.` }),
        P.num({ label: "(iii)", marks: 3, kind: "money", value: m1.cl, wrong: [r2(m1.cl - d1.finalDiv), r2(m1.cl - d1.tax)], stem: "Calculate the total current liabilities.", explanation: `Trade payables ${fmt(d1.payables)} + other payables ${fmt(m1.otherPay)} + dividends payable ${fmt(d1.finalDiv)} + income tax ${fmt(d1.tax)}${m1.overdraft ? ` + overdraft ${fmt(m1.overdraft)}` : ""} = ${fmt(m1.cl)}.` }),
      ] }),
      P.num({ label: "(c)", marks: 3, kind: "ratio", value: cr1, wrong: [r2(ratios.acidTest(m1.ca, d1.closeInv, m1.cl)), r2(m1.cl / m1.ca)], stem: "Calculate the current ratio at 31 December 2025, as x : 1 to two decimal places.", explanation: `Current assets ${fmt(m1.ca)} ÷ current liabilities ${fmt(m1.cl)} = ${fmt(r2(cr1))} : 1.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year ended 31 December 2025.", points: ["Heading with the company name, statement and date", `Revenue ${fmt(m1.revenue)}, cost of sales ${fmt(m1.cos)} and gross profit ${fmt(m1.gp)}`, "Other income, distribution costs and administrative expenses grouped correctly, with finance costs", `Profit before tax ${fmt(m1.pbt)}, income tax and profit for the year ${fmt(m1.profit)}`], modelAnswer: m1.spl, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of changes in equity for the year ended 31 December 2025.", points: ["Columns for share capital, share premium, general reserve and retained earnings with opening balances", "Profit for the year, the two dividends and the transfer entered in the correct columns", `Closing balances correct with total ${fmt(m1.equity)}`], modelAnswer: m1.soce.md, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(f)", marks: 3, stem: `The directors declared dividends of US\\$${fmt(div1)} for the year. Evaluate the dividend decision.`, points: [`Dividends are ${fmt(payout1)}% of the profit for the year (${fmt(div1)} ÷ ${fmt(m1.profit)}), so ${fmt(r2(100 - payout1))}% is kept in the business`, `The current ratio of ${fmt(r2(cr1))} : 1 shows the company can pay the final dividend of ${fmt(d1.finalDiv)} from its liquid resources`, "Judgement: the payout is reasonable if the company has no urgent need of cash, but it should keep enough to replace its equipment and to repay the loan notes"], modelAnswer: `The dividends take about ${fmt(payout1)}% of profit, so most profit is retained. Liquidity is adequate, so the dividend is reasonable if the company does not need the cash for replacing equipment or repaying the loan notes.`, explanation: "One mark for the payout percentage, one for liquidity and one for a reasoned judgement." }),
    ]),
    hints: ["Land is not depreciated.", "The final dividend was declared before the year end, so it is a liability."],
    explanation: "This item tests a company's statements of profit or loss, changes in equity and financial position from a trial balance, with a ratio and an evaluation.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: service company with revaluation
  const d2 = {
    name: "Plumtree Cold Chain Ltd", trading: false, salesLabel: "Revenue", sc: 97500, prem: 19750, revRes: 17650, loan: 67000, loanLabel: "10% loan notes",
    ppe: [{ label: "Land", cost: 121500, accDep: 0, rate: 0, revalTo: 148600 }, { label: "Cold rooms", cost: 208300, accDep: 62490, rate: 10 }, { label: "Trucks", cost: 95400, accDep: 38160, rate: 20, group: "dist" }],
    sales: 393260,
    income: [{ label: "Interest received", tb: 1240, acc: 185 }],
    expenses: [{ label: "Drivers' wages", tb: 92470, acc: 3810 }, { label: "Directors' remuneration", tb: 41850 }, { label: "Fuel", tb: 71340, group: "dist" }, { label: "Repairs", tb: 18260 }, { label: "Insurance", tb: 9470, pre: 1255 }, { label: "Electricity", tb: 24640, acc: 1940 }, { label: "Loan note interest", tb: 3350, acc: 3350, group: "fin" }, { label: "Office expenses", tb: 8960 }],
    recv: 27360, allowPct: 5, allowOpen: 1120, retOpen: 33150, cash: 875, payables: 19770, tax: 11860, intDiv: 8050,
  };
  const m2 = coModel(d2);
  const cr2 = ratios.current(m2.ca, m2.cl);
  const pm2 = ratios.profitMargin(m2.profit, m2.revenue);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P2_Q1.skill, secs: EXAM.CAM_P2_Q1.secs, calculator: true, paper: PAPER, applies: EXAM.CAM_P2_Q1.applies, concepts: CONCEPTS,
    stem: `Plumtree Cold Chain Ltd stores and transports perishable goods in Masvingo. It has no inventory for resale. The trial balance at 31 December 2025 and the information at the year end follow. The statements are for internal use.\n\n${m2.tb.md}\n\n${m2.notesMd}`,
    parts: checkExam(EXAM.CAM_P2_Q1, [
      P.group({ label: "(a)", stem: "Profit and comprehensive income.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: m2.pbt, wrong: [m2.profit, r2(m2.pbt + m2.fin)], stem: "Calculate the profit before tax.", explanation: `Revenue ${fmt(m2.revenue)} + interest received ${fmt(m2.incomeTotal)} - distribution costs ${fmt(m2.dist)} - administrative expenses ${fmt(m2.admin)} - finance costs ${fmt(m2.fin)} = ${fmt(m2.pbt)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m2.profit, wrong: [m2.pbt, r2(m2.pbt - d2.tax - d2.intDiv)], stem: "Calculate the profit for the year.", explanation: `${fmt(m2.pbt)} - ${fmt(d2.tax)} = ${fmt(m2.profit)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: m2.tci, wrong: [m2.profit, r2(m2.profit - m2.revalGain)], stem: "Calculate the total comprehensive income for the year.", explanation: `Profit for the year ${fmt(m2.profit)} + revaluation gain ${fmt(m2.revalGain)} = ${fmt(m2.tci)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Reserves and equity.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: m2.revResClose, wrong: [d2.revRes, m2.revalGain], stem: "Calculate the revaluation reserve at 31 December 2025.", explanation: `${fmt(d2.revRes)} + ${fmt(m2.revalGain)} = ${fmt(m2.revResClose)}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: m2.retClose, wrong: [r2(m2.retClose + d2.intDiv), r2(m2.retClose + m2.revalGain)], stem: "Calculate the retained earnings at 31 December 2025.", explanation: `${fmt(m2.retOpen)} + ${fmt(m2.profit)} - interim dividend ${fmt(d2.intDiv)} = ${fmt(m2.retClose)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: m2.equity, wrong: [r2(m2.equity - m2.revalGain), r2(m2.equity + d2.intDiv)], stem: "Calculate the total equity at 31 December 2025.", explanation: `Share capital ${fmt(d2.sc)} + share premium ${fmt(d2.prem)} + revaluation reserve ${fmt(m2.revResClose)} + retained earnings ${fmt(m2.retClose)} = ${fmt(m2.equity)}.` }),
      ] }),
      P.group({ label: "(c)", stem: "Ratios.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "ratio", value: cr2, wrong: [r2(m2.cl / m2.ca), r2(ratios.current(m2.ca, m2.cl - d2.tax))], stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `Current assets ${fmt(m2.ca)} ÷ current liabilities ${fmt(m2.cl)} = ${fmt(r2(cr2))} : 1.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: pm2, wrong: [r2(ratios.profitMargin(m2.pbt, m2.revenue)), r2(ratios.profitMargin(m2.tci, m2.revenue))], stem: "Calculate the profit margin (profit for the year ÷ revenue × 100), as a percentage to one decimal place.", explanation: `${fmt(m2.profit)} ÷ ${fmt(m2.revenue)} × 100 = ${p1(pm2)}%.` }),
      ] }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of financial position at 31 December 2025.", points: ["Three-line heading", `Property, plant and equipment at carrying amount ${fmt(m2.ppeCv)}`, "Current assets: trade receivables after the allowance, other receivables, cash and cash equivalents", `Total assets ${fmt(m2.assets)}`, "Equity: share capital, share premium, revaluation reserve and retained earnings", "Non-current liabilities: loan notes", "Current liabilities: trade payables, other payables and income tax", `Total equity and liabilities ${fmt(m2.assets)}, equal to total assets`], modelAnswer: m2.sofp, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(e)", marks: 3, stem: "The directors wish to pay a large final dividend. Evaluate whether the company's liquidity could support it.", points: [`The current ratio is ${fmt(r2(cr2))} : 1, so current assets cover current liabilities`, `Cash and equivalents are ${fmt(m2.cashEq)} while income tax payable is ${fmt(d2.tax)} and trade payables ${fmt(d2.payables)}, so cash is limited and a large dividend could cause an overdraft`, "Judgement: a modest dividend could be paid, but a large one would weaken liquidity and the loan notes interest still has to be paid"], modelAnswer: `The current ratio of ${fmt(r2(cr2))} : 1 looks adequate, but cash of ${fmt(m2.cashEq)} is small compared with the tax and payables due. A large dividend could cause an overdraft, so only a modest dividend is advisable.`, explanation: "One mark for the ratio, one for the cash position and one for the judgement." }),
    ]),
    hints: ["The land is revalued, not depreciated, and the gain is not part of profit for the year.", "The trial balance gives the interim dividend only."],
    explanation: "This item tests a service company's profit, comprehensive income, equity, financial position, ratios and an evaluation of liquidity.",
  });
  void check; void sum; void money; void table;
});
