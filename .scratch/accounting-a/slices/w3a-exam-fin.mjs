// W3a exam-format items: FIN25 (ZIMSEC Paper 3 problem solving; Cambridge Paper 3 financial accounting)
// 1 company statements with notes and ratios; 2 statement of cash flows with interpretation; 3 IAS-based adjustments; 4 (ZIMSEC) departmental statements
import { concept, P, EXAM, checkExam, table, check, sum, r2, fmt, money, chk, ratios, depreciation, inventory, ZIM } from "../lib.mjs";
import { coModel, cfModel, deptModel, ncaSchedule } from "../tables/w3a-models.mjs";

const r1 = (v) => Math.round(v * 10) / 10;
const p1 = (v) => r1(v).toFixed(1);

concept("aacc.company.notes-schedules", { file: "exam/w3a-fin", keyPrefix: "exam.w3a-fin" }, (b) => {
  const PAPER = "ZIMSEC and Cambridge Paper 3";

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: company statements, notes and ratios
  const f1 = {
    name: "Chivi Beverages Ltd", sc: 91500, prem: 14350, genRes: 21780, loan: 70400, loanLabel: "9% loan notes",
    ppe: [{ label: "Land", cost: 96500, accDep: 0, rate: 0 }, { label: "Plant", cost: 163700, accDep: 49110, rate: 10 }, { label: "Vehicles", cost: 58900, accDep: 23560, rate: 20, group: "dist" }],
    openInv: 33870, closeInv: 36120, sales: 652580, returnsIn: 7640, purchases: 372910, carriageIn: 4310, returnsOut: 5280,
    income: [{ label: "Rent received", tb: 6300, adv: 1480 }],
    expenses: [{ label: "Wages", tb: 82640, acc: 3240 }, { label: "Directors' fees", tb: 47600 }, { label: "Delivery expenses", tb: 15830, group: "dist" }, { label: "Insurance", tb: 8940, pre: 1310 }, { label: "Electricity", tb: 11570, acc: 960 }, { label: "Loan note interest", tb: 3168, acc: 3168, group: "fin" }, { label: "General expenses", tb: 12860 }],
    recv: 54380, writeOff: 1880, allowPct: 4, allowOpen: 2280, retOpen: 41640, cash: 1820, payables: 38260, tax: 14800, intDiv: 9250, finalDiv: 12500, toGeneral: 6150,
  };
  const m1 = coModel(f1);
  const plantAdd = 27600;
  const sch1 = ncaSchedule(
    [
      { name: "Land", costOpen: 96500, depOpen: 0, charge: 0 },
      { name: "Plant", costOpen: r2(163700 - plantAdd), add: plantAdd, depOpen: 49110, charge: m1.nca[1].charge },
      { name: "Vehicles", costOpen: 58900, depOpen: 23560, charge: m1.nca[2].charge },
    ],
    { title: "Schedule of property, plant and equipment", when: "year ended 31 December 2025" },
  );
  check("schedule agrees to statement", sch1.t.cv, m1.ppeCv);
  const capEmp = r2(m1.equity + f1.loan);
  const profOps = r2(m1.pbt + m1.fin);
  const roce = ratios.roce(profOps, capEmp);
  const cr = ratios.current(m1.ca, m1.cl);
  const gear = ratios.gearing(f1.loan, f1.sc + f1.prem, r2(m1.genResClose + m1.retClose));
  const prev = { roce: 22.9, cr: 1.48, gear: 31.5 };
  const better = roce > prev.roce && cr > prev.cr && gear < prev.gear;
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.company.notes-schedules", "aacc.company.profit-or-loss", "aacc.company.financial-position"],
    stem: `Chivi Beverages Ltd bottles soft drinks in Chinhoyi. Its trial balance at 31 December 2025 and the information at the year end are below. The statements are for internal use.\n\n${m1.tb.md}\n\n${m1.notesMd}\n\nThe plant at cost in the trial balance includes new plant which cost US\\$${fmt(plantAdd)} and was bought during the year. There were no disposals. Depreciation is charged on the cost of assets held at the year end.\n\nRatios for 2024 were: return on capital employed ${prev.roce}%; current ratio ${prev.cr.toFixed(2)} : 1; gearing ${prev.gear.toFixed(1)}%.`,
    parts: checkExam(EXAM.FIN25, [
      P.group({ label: "(a)", stem: "Profit.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: m1.pbt, wrong: [m1.profit, r2(m1.pbt + m1.irrCharge)], stem: "Calculate the profit before tax.", explanation: `Gross profit ${fmt(m1.gp)} + rent received ${fmt(m1.incomeTotal)} - distribution costs ${fmt(m1.dist)} - administrative expenses ${fmt(m1.admin)} - finance costs ${fmt(m1.fin)} = ${fmt(m1.pbt)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m1.profit, wrong: [m1.pbt, r2(m1.pbt - f1.tax - f1.intDiv - f1.finalDiv)], stem: "Calculate the profit for the year.", explanation: `${fmt(m1.pbt)} - income tax ${fmt(f1.tax)} = ${fmt(m1.profit)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Non-current assets and equity.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: m1.ppeCv, wrong: [sch1.t.costClose, r2(m1.ppeCv + m1.nca[1].charge + m1.nca[2].charge)], stem: "Calculate the carrying amount of property, plant and equipment at 31 December 2025.", explanation: `Cost ${fmt(sch1.t.costClose)} less accumulated depreciation ${fmt(sch1.t.depClose)} = ${fmt(m1.ppeCv)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m1.equity, wrong: [r2(m1.equity + f1.finalDiv), r2(m1.equity - f1.toGeneral)], stem: "Calculate the total equity at 31 December 2025.", explanation: `Share capital ${fmt(f1.sc)} + premium ${fmt(f1.prem)} + general reserve ${fmt(m1.genResClose)} + retained earnings ${fmt(m1.retClose)} = ${fmt(m1.equity)}.` }),
      ] }),
      P.group({ label: "(c)", stem: "Ratios for 2025.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "pct", value: roce, wrong: [r2(ratios.roce(m1.pbt, capEmp)), r2(ratios.roce(profOps, m1.equity))], stem: "Calculate the return on capital employed (profit from operations ÷ capital employed × 100), as a percentage to one decimal place. Capital employed is share capital plus all reserves plus non-current liabilities.", explanation: `Profit from operations = ${fmt(m1.pbt)} + finance costs ${fmt(m1.fin)} = ${fmt(profOps)}; capital employed = ${fmt(m1.equity)} + ${fmt(f1.loan)} = ${fmt(capEmp)}; ${fmt(profOps)} ÷ ${fmt(capEmp)} × 100 = ${p1(roce)}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "ratio", value: cr, wrong: [r2(m1.cl / m1.ca), r2(ratios.acidTest(m1.ca, f1.closeInv, m1.cl))], stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `${fmt(m1.ca)} ÷ ${fmt(m1.cl)} = ${fmt(r2(cr))} : 1.` }),
        P.num({ label: "(iii)", marks: 2, kind: "pct", value: gear, wrong: [r2((f1.loan / m1.equity) * 100), r2((f1.loan / capEmp) * 100 + 5)], stem: "Calculate the gearing (non-current liabilities ÷ (share capital + all reserves + non-current liabilities) × 100), as a percentage to one decimal place.", explanation: `${fmt(f1.loan)} ÷ ${fmt(capEmp)} × 100 = ${p1(gear)}%.` }),
      ] }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the schedule of property, plant and equipment for the year ended 31 December 2025.", points: ["Columns for land, plant, vehicles and a total, with a heading", "Cost: opening, additions of US\\$27,600 on plant and closing balances correct", "Accumulated depreciation: opening, charge for the year and closing balances correct", `Carrying amounts correct, total ${fmt(sch1.t.cv)}`], modelAnswer: sch1.md, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(e)", marks: 5, stem: "Evaluate the performance and position of the company in 2025 compared with 2024, using the three ratios, and advise the directors.", points: [`ROCE has ${roce > prev.roce ? "risen" : "fallen"} from ${prev.roce}% to ${p1(roce)}%, so the company earns ${roce > prev.roce ? "more" : "less"} on the capital employed`, `The current ratio has ${cr > prev.cr ? "risen" : "fallen"} from ${prev.cr.toFixed(2)} : 1 to ${fmt(r2(cr))} : 1, so short-term liquidity has ${cr > prev.cr ? "improved" : "weakened"}`, `Gearing has ${gear > prev.gear ? "risen" : "fallen"} from ${prev.gear.toFixed(1)}% to ${p1(gear)}%, so reliance on loan notes has ${gear > prev.gear ? "increased" : "decreased"}`, `A balanced judgement: overall the position is ${better ? "stronger" : "mixed"}, noting that the ratios use year-end figures and that a single year is limited evidence`, "A recommendation, for example how to use the retained profit or whether to repay loan notes"], modelAnswer: `ROCE moved from ${prev.roce}% to ${p1(roce)}%, the current ratio from ${prev.cr.toFixed(2)} to ${fmt(r2(cr))} and gearing from ${prev.gear.toFixed(1)}% to ${p1(gear)}%. Overall the position is ${better ? "stronger" : "mixed"}. The directors should keep liquidity adequate, consider repaying some loan notes with surplus cash and monitor the trend over several years.`, explanation: "One mark for each ratio compared with figures, one for a judgement and one for a recommendation." }),
    ]),
    hints: ["Land is not depreciated.", "Profit from operations is profit before finance costs and tax."],
    explanation: "This item tests a company's profit, schedule of property, plant and equipment, equity and three ratios, with an evaluation against the previous year.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: statement of cash flows with interpretation
  const f2 = {
    name: "Kwekwe Brick and Tile Ltd",
    open: { cost: 295400, accDep: 101800, inv: 44950, rec: 38640, bank: -9640, pay: 31750, taxPay: 10480, sc: 101500, prem: 18350, loan: 82500 },
    y: { pbt: 78300, intExp: 7200, dep: 26750, disp: { cost: 33100, accDep: 23800, proceeds: 5900 }, add: 73200, dInv: 6150, dRec: 4320, dPay: 3890, tax: 20150, taxPaid: 18900, divPaid: 12300, issue: { nominal: 27500, premium: 11000 }, loanChange: 17200 },
  };
  const m2 = cfModel(f2);
  const pat2 = r2(m2.c.ret - m2.retOpen + f2.y.divPaid);
  const taxCh2 = r2(m2.c.taxPay - f2.open.taxPay + f2.y.taxPaid);
  const pbt2 = r2(pat2 + taxCh2);
  chk(pbt2, f2.y.pbt);
  const proceeds2 = r2(f2.y.issue.nominal + f2.y.issue.premium);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.company.cash-flow-statement", "aacc.company.cash-flow-operating"],
    stem: `The statements of financial position of Kwekwe Brick and Tile Ltd at 31 December 2024 and 31 December 2025 are below.\n\n${m2.sofpOpen}\n\n${m2.sofpClose}\n\nFurther information.\n\n1. Property, plant and equipment at cost was US\\$${fmt(f2.open.cost)} at 31 December 2024 and US\\$${fmt(m2.c.cost)} at 31 December 2025.\n2. Equipment which cost US\\$${fmt(f2.y.disp.cost)} and had accumulated depreciation of US\\$${fmt(f2.y.disp.accDep)} was sold for US\\$${fmt(f2.y.disp.proceeds)}.\n3. Depreciation charged for the year was US\\$${fmt(f2.y.dep)}.\n4. Interest of US\\$${fmt(f2.y.intExp)} was charged and paid in full.\n5. Income tax paid was US\\$${fmt(f2.y.taxPaid)} and dividends paid were US\\$${fmt(f2.y.divPaid)}.\n6. Shares were issued for cash during the year. Loan notes of US\\$${fmt(f2.y.loanChange)} were issued.`,
    parts: checkExam(EXAM.FIN25, [
      P.group({ label: "(a)", stem: "Profit before tax.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: taxCh2, wrong: [f2.y.taxPaid, r2(f2.y.taxPaid + f2.open.taxPay)], stem: "Calculate the income tax charge for the year.", explanation: `Tax paid ${fmt(f2.y.taxPaid)} + closing payable ${fmt(m2.c.taxPay)} - opening payable ${fmt(f2.open.taxPay)} = ${fmt(taxCh2)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: pbt2, wrong: [pat2, r2(pat2 + f2.y.taxPaid)], stem: "Calculate the profit before tax.", explanation: `Profit for the year = ${fmt(m2.c.ret)} - ${fmt(m2.retOpen)} + dividends ${fmt(f2.y.divPaid)} = ${fmt(pat2)}; add tax ${fmt(taxCh2)} = ${fmt(pbt2)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Operating activities.", parts: [
        P.num({ label: "(i)", marks: 4, kind: "money", value: m2.cashGen, wrong: [m2.beforeWc, r2(m2.cashGen - 2 * Math.abs(m2.dispProfit))], stem: "Calculate the cash generated from operations.", explanation: `${fmt(pbt2)} + depreciation ${fmt(f2.y.dep)} + loss on disposal ${fmt(-m2.dispProfit)} + finance costs ${fmt(f2.y.intExp)} = ${fmt(m2.beforeWc)}; working capital ${fmt(m2.wc)}; total ${fmt(m2.cashGen)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m2.netOp, wrong: [m2.cashGen, r2(m2.cashGen - f2.y.taxPaid)], stem: "Calculate the net cash from operating activities.", explanation: `${fmt(m2.cashGen)} - interest ${fmt(f2.y.intExp)} - tax ${fmt(f2.y.taxPaid)} = ${fmt(m2.netOp)}.` }),
      ] }),
      P.group({ label: "(c)", stem: "Investing, financing and cash.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: m2.netInv, wrong: [-f2.y.add, r2(-f2.y.add + f2.y.disp.proceeds + f2.y.disp.cost)], stem: "Calculate the net cash used in investing activities. Enter an outflow as a negative number.", explanation: `Purchases ${fmt(f2.y.add)} (${fmt(m2.c.cost)} - ${fmt(f2.open.cost)} + ${fmt(f2.y.disp.cost)}) less proceeds ${fmt(f2.y.disp.proceeds)} = ${fmt(m2.netInv)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m2.netFin, wrong: [r2(proceeds2 + f2.y.loanChange), r2(m2.netFin + f2.y.divPaid)], stem: "Calculate the net cash from financing activities.", explanation: `Shares ${fmt(proceeds2)} + loan notes ${fmt(f2.y.loanChange)} - dividends ${fmt(f2.y.divPaid)} = ${fmt(m2.netFin)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: m2.bankClose, wrong: [m2.net, f2.open.bank], stem: "Calculate the cash and cash equivalents at 31 December 2025.", explanation: `Opening overdraft (${fmt(-f2.open.bank)}) + net change ${fmt(m2.net)} = ${fmt(m2.bankClose)}.` }),
      ] }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of cash flows for the year ended 31 December 2025.", points: ["Heading and the reconciliation of profit before tax to cash generated from operations", "Interest and tax paid, giving net cash from operating activities", "Investing section: purchases and proceeds", "Financing section: shares issued, loan notes issued and dividends paid", `Net change ${fmt(m2.net)} and closing cash ${fmt(m2.bankClose)}, reconciled with the opening overdraft`], modelAnswer: m2.cf, explanation: "One mark for each section; allow follow-through." }),
      P.manual({ label: "(e)", marks: 4, stem: "Interpret the statement of cash flows. Evaluate how the company financed its investment in 2025 and advise the directors.", points: [`Net cash from operating activities of ${fmt(m2.netOp)} exceeded the cash spent on new equipment of ${fmt(f2.y.add)}, so investment was financed from operations`, `Financing brought in a net ${fmt(m2.netFin)} (shares ${fmt(proceeds2)} and loan notes ${fmt(f2.y.loanChange)}), which turned the opening overdraft of ${fmt(-f2.open.bank)} into cash of ${fmt(m2.bankClose)}`, "The new loan notes raise the company's borrowing and interest in future years, so the directors should check that operating cash can service them", "Judgement: the position is healthy, but the company should avoid borrowing more than it needs"], modelAnswer: `Operating cash of ${fmt(m2.netOp)} was more than the ${fmt(f2.y.add)} spent on equipment. New shares and loan notes then turned an overdraft into cash of ${fmt(m2.bankClose)}. The directors should make sure operating cash can service the extra loan notes.`, explanation: "One mark each for the comparison of operating cash with investment, the use of financing, the risk and a judgement." }),
    ]),
    hints: ["Derive profit before tax from the movement in retained earnings.", "The opening overdraft is part of cash and cash equivalents."],
    explanation: "This item tests the derivation of profit before tax, a full statement of cash flows from two statements of financial position and its interpretation.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: IAS-based adjustments
  const A = { draftProfit: 96400, draftPpe: 410000, draftCa: 188000, draftCl: 94000, invCost: 14800, invNrv: 9350, mCost: 126000, mLife: 10, mYears: 3, mNewLife: 15, debt: 6800, repairs: 4200, vehRate: 25, research: 17400, cv: 62000, fv: 48000, viu: 53500 };
  const wd = r2(A.invCost - A.invNrv);
  const oldDep = r2(A.mCost / A.mLife);
  const mCv = r2(A.mCost - oldDep * A.mYears);
  const newDep = r2(mCv / (A.mNewLife - A.mYears));
  const depSaved = r2(oldDep - newDep);
  const depRepairs = r2((A.repairs * A.vehRate) / 100);
  const impLoss = r2(A.cv - Math.max(A.fv, A.viu));
  chk(wd, 5450); chk(newDep, 7350); chk(impLoss, 8500);
  const profC = r2(A.draftProfit - wd + depSaved - A.debt - (A.repairs - depRepairs) - A.research - impLoss);
  chk(profC, 60350);
  const ppeC = r2(A.draftPpe + depSaved - (A.repairs - depRepairs) - impLoss);
  const caC = r2(A.draftCa - wd - A.debt);
  const crD = ratios.current(A.draftCa, A.draftCl), crC = ratios.current(caC, A.draftCl);
  const adjTable = table(["No.", "Information found after the draft was prepared"], [
    ["1", `Inventory includes timber which cost US\\$${fmt(A.invCost)}. After the year end it was sold for a net US\\$${fmt(A.invNrv)}.`],
    ["2", `A machine cost US\\$${fmt(A.mCost)} and was depreciated over ${A.mLife} years. After ${A.mYears} years the total life was reassessed at ${A.mNewLife} years. The draft still charged US\\$${fmt(oldDep)} for 2025.`],
    ["3", `On 14 January 2026 a customer who owed US\\$${fmt(A.debt)} at the year end was declared insolvent.`],
    ["4", `Repairs of US\\$${fmt(A.repairs)} to a vehicle were added to its cost. Vehicles are depreciated at ${A.vehRate}% of cost and the draft included a full year's charge on the repairs.`],
    ["5", `Research costs of US\\$${fmt(A.research)} were recorded as an intangible asset.`],
    ["6", `A machine with a carrying amount of US\\$${fmt(A.cv)} has a fair value less costs of disposal of US\\$${fmt(A.fv)} and a value in use of US\\$${fmt(A.viu)}.`],
  ], ["l", "l"]).split("US$").join("US\\$");
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.standards.ias-1-2", "aacc.standards.ias-8-10", "aacc.standards.ias-16-36-38"],
    stem: `The draft financial statements of Bulawayo Joinery Ltd for the year ended 31 December 2025 show: profit for the year US\\$${fmt(A.draftProfit)}; property, plant and equipment US\\$${fmt(A.draftPpe)}; current assets US\\$${fmt(A.draftCa)} (including inventory at cost and trade receivables); current liabilities US\\$${fmt(A.draftCl)}. The draft includes an intangible asset of US\\$${fmt(A.research)} (see item 5). Ignore taxation.\n\n${adjTable}`,
    parts: checkExam(EXAM.FIN25, [
      P.group({ label: "(a)", stem: "Amounts to be corrected.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: wd, wrong: [A.invCost, A.invNrv], stem: "Calculate the write-down of inventory required by IAS 2 (item 1).", explanation: `${fmt(A.invCost)} - ${fmt(A.invNrv)} = ${fmt(wd)}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: newDep, wrong: [oldDep, r2(A.mCost / A.mNewLife)], stem: "Calculate the annual depreciation of the machine in item 2 under the revised life.", explanation: `Carrying amount ${fmt(A.mCost)} - ${A.mYears} × ${fmt(oldDep)} = ${fmt(mCv)}; remaining life ${A.mNewLife - A.mYears} years; ${fmt(mCv)} ÷ ${A.mNewLife - A.mYears} = ${fmt(newDep)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: impLoss, wrong: [r2(A.cv - A.fv), A.cv], stem: "Calculate the impairment loss in item 6.", explanation: `Recoverable amount = higher of ${fmt(A.fv)} and ${fmt(A.viu)} = ${fmt(Math.max(A.fv, A.viu))}; loss = ${fmt(A.cv)} - ${fmt(Math.max(A.fv, A.viu))} = ${fmt(impLoss)}.` }),
      ] }),
      P.num({ label: "(b)", marks: 4, kind: "money", value: profC, wrong: [r2(profC + A.research), r2(A.draftProfit - wd - A.debt - A.repairs - A.research - impLoss)], stem: "Calculate the corrected profit for the year after all six items.", explanation: `${fmt(A.draftProfit)} - inventory ${fmt(wd)} + depreciation saved ${fmt(depSaved)} - irrecoverable debt ${fmt(A.debt)} - repairs ${fmt(A.repairs)} + depreciation reversed ${fmt(depRepairs)} - research ${fmt(A.research)} - impairment ${fmt(impLoss)} = ${fmt(profC)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: ppeC, wrong: [r2(ppeC + impLoss), r2(A.draftPpe - impLoss)], stem: "Calculate the corrected carrying amount of property, plant and equipment.", explanation: `${fmt(A.draftPpe)} + depreciation saved ${fmt(depSaved)} - repairs net of depreciation ${fmt(r2(A.repairs - depRepairs))} - impairment ${fmt(impLoss)} = ${fmt(ppeC)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "ratio", value: crC, wrong: [crD, ratios.current(A.draftCa - wd, A.draftCl)], stem: "Calculate the corrected current ratio, as x : 1 to two decimal places.", explanation: `Current assets ${fmt(A.draftCa)} - ${fmt(wd)} - ${fmt(A.debt)} = ${fmt(caC)}; ÷ ${fmt(A.draftCl)} = ${fmt(r2(crC))} : 1. The draft ratio was ${fmt(r2(crD))} : 1.` }),
      P.manual({ label: "(e)", marks: 4, stem: "For items 1 to 6, state the standard that applies and the type of matter (adjusting event, change in estimate, or correction of a presentation or measurement rule).", points: ["Item 1: IAS 2 (lower of cost and NRV), supported by an adjusting event after the year end", "Item 2: IAS 8 (change in accounting estimate, applied prospectively) with IAS 16 depreciation", "Items 3 and 4: item 3 is an adjusting event (IAS 10); item 4 is IAS 16 (repairs are not part of cost)", "Items 5 and 6: item 5 is IAS 38 (research is expensed); item 6 is IAS 36 (impairment to recoverable amount)"], modelAnswer: "Item 1: IAS 2, with an adjusting event. Item 2: IAS 8, a change in estimate. Item 3: IAS 10, adjusting event. Item 4: IAS 16, repairs are expenses. Item 5: IAS 38, research is expensed. Item 6: IAS 36, impairment.", explanation: "One mark for each pair of items correctly classified." }),
      P.manual({ label: "(f)", marks: 5, stem: `The directors prefer to publish the draft profit of US\\$${fmt(A.draftProfit)}. Evaluate their preference and advise them.`, points: [`The corrected profit is ${fmt(profC)}, ${fmt(r2(A.draftProfit - profC))} lower (${fmt(r2(((A.draftProfit - profC) / A.draftProfit) * 100))}% of the draft), so the draft overstates profit`, "Items 1, 3, 4, 5 and 6 reduce profit because the standards require losses to be recognised, and only item 2 raises profit, as a change in estimate", `The current ratio falls from ${fmt(r2(crD))} : 1 to ${fmt(r2(crC))} : 1, so liquidity is weaker than the draft shows`, "Using the draft would breach IAS 1 (fair presentation) and mislead users such as lenders and shareholders", "Advice: adopt the corrected figures, disclose the change in estimate and the impairment in the notes, and explain the changes to the users"], modelAnswer: `The corrected profit of ${fmt(profC)} is well below the draft of ${fmt(A.draftProfit)}, and the current ratio falls from ${fmt(r2(crD))} to ${fmt(r2(crC))}. Publishing the draft would breach fair presentation and mislead users. The directors should adopt the corrected figures and disclose the changes.`, explanation: "One mark each for the profit difference, the effect of the standards, liquidity, the breach of fair presentation and the advice." }),
    ]),
    hints: ["Research is always an expense.", "Adjusting events change the figures; the estimate is prospective."],
    explanation: "This item applies IAS 2, IAS 8, IAS 10, IAS 16, IAS 36 and IAS 38 to correct a draft set of statements and evaluates the effect.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4 (ZIMSEC): departmental statements and the closure decision
  const D = {
    name: "Harare Household Supplies", year: 2025,
    depts: [
      { name: "Furniture", sales: 124600, openInv: 18350, purchases: 72480, closeInv: 19720, direct: [{ label: "Departmental wages", amt: 12430 }] },
      { name: "Kitchenware", sales: 71900, openInv: 9640, purchases: 43150, closeInv: 10280, direct: [{ label: "Departmental wages", amt: 7860 }] },
      { name: "Gifts", sales: 33500, openInv: 5180, purchases: 20370, closeInv: 5010, direct: [{ label: "Departmental wages", amt: 5640 }] },
    ],
    common: [
      { label: "Rent", total: 16800, basis: "floor", basisText: "Floor area (140 : 85 : 55 m²)", shares: [140, 85, 55] },
      { label: "Lighting and heating", total: 4200, basis: "floor", basisText: "Floor area", shares: [140, 85, 55] },
      { label: "General wages", total: 17500, basis: "staff", basisText: "Number of staff (5 : 3 : 2)", shares: [5, 3, 2] },
      { label: "Advertising", total: 6900, basis: "sales" },
      { label: "Depreciation", total: 6400, basis: "assets", basisText: "Asset values (22,000 : 14,000 : 4,000)", shares: [22000, 14000, 4000] },
    ],
    income: [{ label: "Commission received", total: 2300, basis: "sales" }],
  };
  const dm = deptModel(D);
  const contribG = r2(dm.dep[2].gp + dm.income[0].parts[2] - 5640);
  const profitAfter = r2(dm.totals.net - contribG);
  const deptTable = table(["", ...D.depts.map((x) => x.name + " US$")], [["Sales", ...D.depts.map((x) => x.sales)], ["Opening inventory", ...D.depts.map((x) => x.openInv)], ["Purchases", ...D.depts.map((x) => x.purchases)], ["Closing inventory", ...D.depts.map((x) => x.closeInv)], ["Departmental wages", ...D.depts.map((x) => x.direct[0].amt)]], ["l", "r", "r", "r"]).split("US$").join("US\\$");
  const commonTable = table(["Item", "US$", "Basis of apportionment"], [...D.common.map((c) => [c.label, c.total, c.basisText ?? "Sales"]), ...D.income.map((c) => [c.label + " (income)", c.total, "Sales"])], ["l", "r", "l"]).split("US$").join("US\\$");
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: "ZIMSEC Paper 3", applies: ZIM,
    concepts: ["aacc.departmental.apportionment", "aacc.departmental.statements"],
    stem: `Harare Household Supplies has three departments: furniture, kitchenware and gifts. The figures for the year ended 31 December 2025 are below. Wages of each department's own staff are allocated directly.\n\n${deptTable}\n\nCommon expenses and income.\n\n${commonTable}`,
    parts: checkExam(EXAM.FIN25, [
      P.group({ label: "(a)", stem: "Apportionment and trading results.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: dm.common[0].parts[2], wrong: [dm.common[0].parts[0], r2(16800 / 3)], stem: "Calculate the rent charged to the gifts department.", explanation: `${fmt(16800)} × 55 ÷ 280 = ${fmt(dm.common[0].parts[2])}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: dm.dep[0].cos, wrong: [r2(18350 + 72480), r2(dm.dep[0].cos + 2 * 19720)], stem: "Calculate the cost of sales of the furniture department.", explanation: `${fmt(18350)} + ${fmt(72480)} - ${fmt(19720)} = ${fmt(dm.dep[0].cos)}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: dm.dep[1].gp, wrong: [dm.dep[1].cos, r2(71900 - 43150)], stem: "Calculate the gross profit of the kitchenware department.", explanation: `${fmt(71900)} - cost of sales ${fmt(dm.dep[1].cos)} = ${fmt(dm.dep[1].gp)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Net profit or loss of each department. Enter a loss as a negative number.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: dm.net[0], wrong: [dm.dep[0].gp, r2(dm.net[0] - dm.income[0].parts[0])], stem: "Furniture.", explanation: `${fmt(dm.dep[0].gp)} + ${fmt(dm.income[0].parts[0])} - expenses ${fmt(dm.expTotals[0])} = ${fmt(dm.net[0])}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: dm.net[1], wrong: [dm.dep[1].gp, r2(dm.net[1] - dm.income[0].parts[1])], stem: "Kitchenware.", explanation: `${fmt(dm.dep[1].gp)} + ${fmt(dm.income[0].parts[1])} - expenses ${fmt(dm.expTotals[1])} = ${fmt(dm.net[1])}.` }),
        P.num({ label: "(iii)", marks: 3, kind: "money", value: dm.net[2], wrong: [-dm.net[2], dm.dep[2].gp], stem: "Gifts.", explanation: `${fmt(dm.dep[2].gp)} + ${fmt(dm.income[0].parts[2])} - expenses ${fmt(dm.expTotals[2])} = ${fmt(dm.net[2])}.` }),
      ] }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: contribG, wrong: [-dm.net[2], dm.dep[2].gp], stem: "The gifts department would be closed. Only its own wages would be saved and the common expenses would continue. Calculate the contribution of the gifts department.", explanation: `Gross profit ${fmt(dm.dep[2].gp)} + commission ${fmt(dm.income[0].parts[2])} - own wages ${fmt(5640)} = ${fmt(contribG)}.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the departmental statement of profit or loss for the year ended 31 December 2025, with a total column.", points: ["Three-line heading and the three department columns with a total column", "Revenue, cost of sales and gross profit of each department", "Commission received and the expenses, allocated and apportioned", `Net profit or loss of each department and total net profit ${fmt(dm.totals.net)}`], modelAnswer: dm.pl, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate the proposal to close the gifts department and advise the owner.", points: [`Gifts shows a loss of ${fmt(-dm.net[2])}, but it contributes ${fmt(contribG)} towards the common costs`, `If it closed, total net profit would fall from ${fmt(dm.totals.net)} to ${fmt(profitAfter)}, because the common costs would continue`, "Advice: keep the department, review its margin and the floor area it uses, and close it only if the space could earn more elsewhere"], modelAnswer: `Gifts shows a loss of ${fmt(-dm.net[2])} but contributes ${fmt(contribG)}. Closing it would reduce total net profit to ${fmt(profitAfter)}. The owner should keep it, review its margin and use of space, and close it only if the space can earn more.`, explanation: "One mark for the contribution, one for the effect on total profit and one for the advice." }),
    ]),
    hints: ["Apportion on the basis shown for each expense.", "The contribution ignores the common costs that continue."],
    explanation: "This item tests the apportionment of common expenses, the departmental statement of profit or loss and the closure decision.",
  });
  void sum; void money; void depreciation; void inventory;
});
