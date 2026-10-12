// W3a exam-format items: ZIMSEC Paper 2 structured questions (25 marks): cash flow statement; departmental accounts
import { concept, P, EXAM, checkExam, table, check, sum, r2, fmt, money, chk, ratios, ZIM } from "../lib.mjs";
import { cfModel, deptModel } from "../tables/w3a-models.mjs";

const r1 = (v) => Math.round(v * 10) / 10;

concept("aacc.company.cash-flow-statement", { file: "exam/w3a-zimp2", keyPrefix: "exam.w3a-zimp2", applies: ZIM }, (b) => {
  const PAPER = "ZIMSEC Paper 2";

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: cash flow statement of a company
  const d = {
    name: "Marondera Grain Millers Ltd",
    open: { cost: 280000, accDep: 96000, inv: 36400, rec: 31500, bank: 11800, pay: 23700, taxPay: 8800, sc: 120000, prem: 17300, loan: 66000 },
    y: { pbt: 69500, intExp: 4950, dep: 21300, disp: { cost: 26000, accDep: 19500, proceeds: 8100 }, add: 63400, dInv: 4700, dRec: 2800, dPay: -2100, tax: 17200, taxPaid: 15800, divPaid: 10650, issue: { nominal: 32000, premium: 16000 }, loanChange: -14250 },
  };
  const m = cfModel(d);
  const proceeds = r2(d.y.issue.nominal + d.y.issue.premium);
  chk(m.dispProfit, 1600);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, paper: PAPER, applies: EXAM.ZIM_P2_STRUCT.applies,
    concepts: ["aacc.company.cash-flow-statement", "aacc.company.cash-flow-operating"],
    stem: `The statements of financial position of Marondera Grain Millers Ltd at 31 December 2024 and 31 December 2025 are below. The statements are for internal use.\n\n${m.sofpOpen}\n\n${m.sofpClose}\n\nAdditional information.\n\n1. Property, plant and equipment at cost was US\\$${fmt(d.open.cost)} at 31 December 2024 and US\\$${fmt(m.c.cost)} at 31 December 2025.\n2. Equipment which cost US\\$${fmt(d.y.disp.cost)} and had accumulated depreciation of US\\$${fmt(d.y.disp.accDep)} was sold for US\\$${fmt(d.y.disp.proceeds)}.\n3. Profit before tax was US\\$${fmt(d.y.pbt)} after charging depreciation of US\\$${fmt(d.y.dep)}, interest of US\\$${fmt(d.y.intExp)} (paid in full) and after crediting the profit on the sale of the equipment.\n4. Income tax paid was US\\$${fmt(d.y.taxPaid)} and dividends paid were US\\$${fmt(d.y.divPaid)}.\n5. Loan notes of US\\$${fmt(-d.y.loanChange)} were repaid during the year.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({ label: "(a)", stem: "Investing and financing cash flows.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: d.y.add, wrong: [r2(m.c.cost - d.open.cost), r2(m.c.cost - d.open.cost - d.y.disp.cost)], stem: "Calculate the cash paid for new property, plant and equipment.", explanation: `${fmt(m.c.cost)} - ${fmt(d.open.cost)} + cost of equipment sold ${fmt(d.y.disp.cost)} = ${fmt(d.y.add)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: proceeds, wrong: [d.y.issue.nominal, d.y.issue.premium], stem: "Calculate the cash received from the issue of shares.", explanation: `Share capital rose by ${fmt(d.y.issue.nominal)} and share premium by ${fmt(d.y.issue.premium)}: total ${fmt(proceeds)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Operating activities.", parts: [
        P.num({ label: "(i)", marks: 4, kind: "money", value: m.cashGen, wrong: [m.beforeWc, r2(m.cashGen + 2 * m.dispProfit)], stem: "Calculate the cash generated from operations.", explanation: `Profit before tax ${fmt(d.y.pbt)} + depreciation ${fmt(d.y.dep)} + finance costs ${fmt(d.y.intExp)} - profit on disposal ${fmt(m.dispProfit)} = ${fmt(m.beforeWc)}; working capital (inventory ${fmt(-d.y.dInv)}, receivables ${fmt(-d.y.dRec)}, payables ${fmt(d.y.dPay)}) = ${fmt(m.wc)}; total ${fmt(m.cashGen)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m.netOp, wrong: [r2(m.cashGen - d.y.taxPaid), m.cashGen], stem: "Calculate the net cash from operating activities.", explanation: `${fmt(m.cashGen)} - interest ${fmt(d.y.intExp)} - tax ${fmt(d.y.taxPaid)} = ${fmt(m.netOp)}.` }),
      ] }),
      P.group({ label: "(c)", stem: "Net cash flows from investing and financing.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: m.netInv, wrong: [-d.y.add, r2(-d.y.add - d.y.disp.proceeds)], stem: "Calculate the net cash used in investing activities. Enter an outflow as a negative number.", explanation: `${fmt(-d.y.add)} + proceeds ${fmt(d.y.disp.proceeds)} = ${fmt(m.netInv)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: m.netFin, wrong: [r2(proceeds + d.y.loanChange), r2(proceeds - d.y.divPaid)], stem: "Calculate the net cash from financing activities. Enter an outflow as a negative number.", explanation: `Shares ${fmt(proceeds)} - loan notes repaid ${fmt(-d.y.loanChange)} - dividends ${fmt(d.y.divPaid)} = ${fmt(m.netFin)}.` }),
      ] }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare the cash flow statement for the year ended 31 December 2025.", points: ["Three-line heading", "Profit before tax with depreciation, profit on disposal and finance costs adjusted", "Working capital changes in the correct direction", `Cash generated from operations ${fmt(m.cashGen)}`, `Interest and tax paid deducted to give net cash from operating activities ${fmt(m.netOp)}`, "Investing section: purchases and proceeds of sale", "Financing section: shares, loan notes repaid and dividends", `Net increase ${fmt(m.net)}, opening cash ${fmt(d.open.bank)} and closing cash ${fmt(m.bankClose)}`], modelAnswer: m.cf, explanation: "One mark for each line of the layout; allow follow-through." }),
      P.manual({ label: "(e)", marks: 3, stem: "Comment on how the company financed its purchases of property, plant and equipment.", points: [`Net cash from operating activities was ${fmt(m.netOp)}, which covers most of the ${fmt(d.y.add)} spent on equipment`, `The shares issued (${fmt(proceeds)}) provided extra finance, so the owners contributed new money while loan notes of ${fmt(-d.y.loanChange)} were repaid`, "Judgement: the company relied mainly on its own operating cash, which is a healthy position"], modelAnswer: `Operating cash of ${fmt(m.netOp)} paid for most of the ${fmt(d.y.add)} spent on equipment. The company also raised ${fmt(proceeds)} from shares and repaid ${fmt(-d.y.loanChange)} of loan notes. It relied mainly on its own cash, which is healthy.`, explanation: "One mark for the figures, one for the other source and one for the judgement." }),
    ]),
    hints: ["The statement of financial position gives carrying amounts; use the cost information to find purchases.", "Add back the finance costs and deduct the profit on disposal."],
    explanation: "This item tests a company cash flow statement from two statements of financial position, with comment on the financing of investment.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: departmental accounts
  const D = {
    name: "Masvingo Trading Post", year: 2025,
    depts: [
      { name: "Groceries", sales: 142000, openInv: 11800, purchases: 96400, closeInv: 12900, direct: [{ label: "Departmental wages", amt: 11700 }] },
      { name: "Clothing", sales: 88000, openInv: 14300, purchases: 51200, closeInv: 15700, direct: [{ label: "Departmental wages", amt: 8650 }] },
      { name: "Electrical", sales: 54000, openInv: 9750, purchases: 36900, closeInv: 8800, direct: [{ label: "Departmental wages", amt: 6950 }] },
    ],
    common: [
      { label: "Rent", total: 15000, basis: "floor", basisText: "Floor area (170 : 100 : 30 m²)", shares: [170, 100, 30] },
      { label: "Lighting and heating", total: 3630, basis: "floor", basisText: "Floor area", shares: [170, 100, 30] },
      { label: "General wages", total: 20400, basis: "staff", basisText: "Number of staff (3 : 2 : 1)", shares: [3, 2, 1] },
      { label: "Advertising", total: 5680, basis: "sales" },
      { label: "Depreciation", total: 5650, basis: "assets", basisText: "Asset values (28,000 : 19,000 : 9,500)", shares: [28000, 19000, 9500] },
    ],
    income: [{ label: "Commission received", total: 2840, basis: "sales" }],
  };
  const dm = deptModel(D);
  const gmE = r1((dm.dep[2].gp / dm.dep[2].revenue) * 100);
  const gmC = r1((dm.dep[1].gp / dm.dep[1].revenue) * 100);
  const npE = r1((dm.net[2] / dm.dep[2].revenue) * 100);
  const deptTable = table(["", ...D.depts.map((x) => x.name + " US$")], [["Sales", ...D.depts.map((x) => x.sales)], ["Opening inventory", ...D.depts.map((x) => x.openInv)], ["Purchases", ...D.depts.map((x) => x.purchases)], ["Closing inventory", ...D.depts.map((x) => x.closeInv)], ["Departmental wages", ...D.depts.map((x) => x.direct[0].amt)]], ["l", "r", "r", "r"]);
  const commonTable = table(["Item", "US$", "Basis of apportionment"], [...D.common.map((c) => [c.label, c.total, (c.basisText ?? "Sales")]), ...D.income.map((c) => [c.label + " (income)", c.total, "Sales"])], ["l", "r", "l"]);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, paper: PAPER, applies: EXAM.ZIM_P2_STRUCT.applies,
    concepts: ["aacc.departmental.apportionment", "aacc.departmental.statements"],
    stem: `Masvingo Trading Post has three departments: groceries, clothing and electrical. The figures for the year ended 31 December 2025 are below. Wages of each department's own staff are allocated directly.\n\n${deptTable.split("US$").join("US\\$")}\n\nCommon expenses and income.\n\n${commonTable.split("US$").join("US\\$")}`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({ label: "(a)", stem: "Apportionment and trading results.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: dm.common[0].parts[2], wrong: [dm.common[0].parts[0], r2(15000 / 3)], stem: "Calculate the rent charged to the electrical department.", explanation: `${fmt(15000)} × 30 ÷ 300 = ${fmt(dm.common[0].parts[2])}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: dm.common[4].parts[1], wrong: [dm.common[4].parts[0], r2(5650 / 3)], stem: "Calculate the depreciation charged to the clothing department.", explanation: `${fmt(5650)} × 19,000 ÷ 56,500 = ${fmt(dm.common[4].parts[1])}.` }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: dm.dep[0].cos, wrong: [r2(11800 + 96400), r2(dm.dep[0].cos + 12900 * 2)], stem: "Calculate the cost of sales of the groceries department.", explanation: `${fmt(11800)} + ${fmt(96400)} - ${fmt(12900)} = ${fmt(dm.dep[0].cos)}.` }),
        P.num({ label: "(iv)", marks: 2, kind: "money", value: dm.dep[2].gp, wrong: [dm.dep[2].cos, r2(54000 - 36900)], stem: "Calculate the gross profit of the electrical department.", explanation: `${fmt(54000)} - cost of sales ${fmt(dm.dep[2].cos)} = ${fmt(dm.dep[2].gp)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Net profit of each department.", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: dm.net[0], wrong: [r2(dm.net[0] - dm.income[0].parts[0]), dm.dep[0].gp], stem: "Calculate the net profit of the groceries department.", explanation: `Gross profit ${fmt(dm.dep[0].gp)} + commission ${fmt(dm.income[0].parts[0])} - expenses ${fmt(dm.expTotals[0])} = ${fmt(dm.net[0])}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: dm.net[1], wrong: [r2(dm.net[1] - dm.income[0].parts[1]), dm.dep[1].gp], stem: "Calculate the net profit of the clothing department.", explanation: `Gross profit ${fmt(dm.dep[1].gp)} + commission ${fmt(dm.income[0].parts[1])} - expenses ${fmt(dm.expTotals[1])} = ${fmt(dm.net[1])}.` }),
        P.num({ label: "(iii)", marks: 3, kind: "money", value: dm.net[2], wrong: [r2(dm.net[2] - dm.income[0].parts[2]), dm.dep[2].gp], stem: "Calculate the net profit of the electrical department.", explanation: `Gross profit ${fmt(dm.dep[2].gp)} + commission ${fmt(dm.income[0].parts[2])} - expenses ${fmt(dm.expTotals[2])} = ${fmt(dm.net[2])}.` }),
      ] }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the departmental statement of profit or loss for the year ended 31 December 2025, with a total column.", points: ["Three-line heading and columns for the three departments and the total", "Revenue, cost of sales and gross profit of each department", "Commission received shown as income", "Departmental wages and apportioned expenses deducted", `Net profit of each department and total net profit ${fmt(dm.totals.net)}`], modelAnswer: dm.pl, explanation: "One mark for each element; allow follow-through." }),
      P.manual({ label: "(d)", marks: 3, stem: `The owner says that the electrical department should be closed because its net profit is only ${npE}% of its revenue, against a gross profit margin of ${gmE}%. Advise the owner.`, points: [`The electrical department's gross profit margin (${gmE}%) is lower than clothing's (${gmC}%), but it still makes a net profit of ${fmt(dm.net[2])}`, "Most of the common expenses charged to it would continue if it closed, so closing it would reduce total net profit", "Advice: keep the department and try to improve its margin or reduce the floor area it uses"], modelAnswer: `Electrical makes a net profit of ${fmt(dm.net[2])} and contributes to the common costs, which would continue if it closed. The owner should keep it and try to improve its margin.`, explanation: "One mark for the comparison with figures, one for the common costs and one for the advice." }),
    ]),
    hints: ["Divide each common expense in the ratio of its basis.", "Each department's net profit = gross profit + commission - own wages - apportioned expenses."],
    explanation: "This item tests the apportionment of common expenses, the departmental statement of profit or loss and the evaluation of a department.",
  });
  void check; void sum; void money; void ratios;
});
