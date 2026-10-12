// W2a exam-format items: ZIMSEC Paper 2 structured questions (25 marks each), EXAM.ZIM_P2_STRUCT
import { concept, P, EXAM, checkExam, ZIM, table, check, sum, r2, fmt, money, chk, appropriation } from "../lib.mjs";
import { approTable, colLedger } from "../tables/w2a-lib.mjs";
import { incompleteModel, incompleteStem } from "../tables/w2a-incomplete.mjs";

// ZIMSEC wording for generated tables
const zt = (s) =>
  s
    .replace(/Irrecoverable debts and change in allowance/g, "Bad debts and change in provision")
    .replace(/Change in allowance for irrecoverable debts/g, "Change in provision for doubtful debts")
    .replace(/Irrecoverable debts written off/g, "Bad debts written off")
    .replace(/Allowance for irrecoverable debts/g, "Provision for doubtful debts")
    .replace(/Trade receivables/g, "Debtors")
    .replace(/Trade payables/g, "Creditors")
    .replace(/Inventory/g, "Stock")
    .replace(/inventory/g, "stock");

concept("aacc.incomplete.final-accounts", { file: "exam/w2a-zimp2", keyPrefix: "exam.w2a-zimp2", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: final accounts from incomplete records (sole trader)
  const s1 = {
    biz: "Chitepo General Dealer", splTitle: "Income statement", grouped: false,
    openNca: [{ label: "Equipment", cost: 16400, accDep: 4100, rate: 10, added: 2700 }],
    openInv: 8615, closeInv: 9380,
    recv: { open: 3245, close: 3880, cust: 47915, disc: 545, ret: 845, bad: 315 },
    pay: { open: 4630, close: 4255, supp: 31420, disc: 465, ret: 610 },
    cashSales: 12860, bank: { open: 2185, close: 3015 },
    expenses: [
      { label: "Wages", paid: 11840, openAcc: 270, closeAcc: 335 },
      { label: "Rent", paid: 4860, openPre: 405, closePre: 405 },
      { label: "Delivery expenses", paid: 2180, closeAcc: 305 },
      { label: "General expenses", paid: 2935 },
    ],
    allowOpen: 160, allowPct: 5,
  };
  const m1 = incompleteModel(s1);
  const bad = r2(s1.recv.bad + m1.model.allowInc);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 2",
    concepts: ["aacc.incomplete.statement-of-affairs", "aacc.incomplete.missing-figures", "aacc.incomplete.final-accounts"],
    stem: `Farai Chitepo owns Chitepo General Dealer in Masvingo. He does not keep a ledger. The information below is taken from his bank statements, invoices and till rolls for the year ended 31 December 2025.\n\n${zt(incompleteStem(s1))}\n\nEquipment is depreciated at 10% of the cost of equipment held at the year end. The provision for doubtful debts is to be 5% of debtors at the year end. All other withdrawals from the bank were drawings. The statements are for internal use.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: m1.soa.capital, wrong: [m1.soa.assets, r2(m1.soa.capital + 405)], stem: "Calculate Farai's capital at 1 January 2025 (include the rent prepaid and the wages and electricity owing as given).", explanation: `Assets: equipment ${fmt(16400 - 4100)}, stock 8,615, debtors less provision ${fmt(3245 - 160)}, prepaid rent 405, bank 2,185 = ${fmt(m1.soa.assets)}. Liabilities: creditors 4,630 and wages owing 270 = ${fmt(m1.soa.liabilities)}. Capital = ${fmt(m1.soa.capital)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: m1.creditSales, wrong: [r2(m1.creditSales - s1.recv.bad), s1.recv.cust], stem: "Calculate the credit sales for the year.", explanation: `Debtors account: ${fmt(s1.recv.close)} + ${fmt(s1.recv.cust)} + ${fmt(s1.recv.disc)} + ${fmt(s1.recv.ret)} + ${fmt(s1.recv.bad)} - ${fmt(s1.recv.open)} = ${fmt(m1.creditSales)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: m1.purchases, wrong: [r2(m1.purchases - s1.pay.ret)], stem: "Calculate the credit purchases for the year.", explanation: `Creditors account: ${fmt(s1.pay.close)} + ${fmt(s1.pay.supp)} + ${fmt(s1.pay.disc)} + ${fmt(s1.pay.ret)} - ${fmt(s1.pay.open)} = ${fmt(m1.purchases)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: m1.drawings, wrong: [r2(m1.drawings + 2700), r2(m1.drawings - 2700)], stem: "Calculate Farai's drawings for the year (remember the equipment bought).", explanation: `Bank receipts ${fmt(s1.bank.open + s1.recv.cust + s1.cashSales)} less payments ${fmt(s1.pay.supp + s1.expenses.reduce((x, e) => x + e.paid, 0) + 2700)} less closing bank ${fmt(s1.bank.close)} = ${fmt(m1.drawings)}.` }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: bad, wrong: [s1.recv.bad, m1.model.allowNew], stem: "Calculate the total charge to the income statement for bad debts and the change in the provision for doubtful debts.", explanation: `Provision required 5% × ${fmt(s1.recv.close)} = ${fmt(m1.model.allowNew)}; change ${fmt(m1.model.allowNew)} - 160 = ${fmt(m1.model.allowInc)}; total ${fmt(s1.recv.bad)} + ${fmt(m1.model.allowInc)} = ${fmt(bad)}.` }),
      P.num({ label: "(f)", marks: 4, kind: "money", value: m1.model.profit, wrong: [r2(m1.model.profit + 2700), r2(m1.model.profit - m1.model.depTotal)], stem: "Calculate the profit for the year.", explanation: `Sales ${fmt(m1.sales)} less returns ${fmt(s1.recv.ret)} = ${fmt(m1.model.revenue)}; cost of sales ${fmt(m1.model.cos)}; gross profit ${fmt(m1.model.gp)}; add discount received 465; expenses ${fmt(m1.model.expensesTotal)}; profit ${fmt(m1.model.profit)}.` }),
      P.manual({ label: "(g)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the income statement for the year ended 31 December 2025.", points: [`Heading, sales ${fmt(m1.sales)} less returns inwards giving ${fmt(m1.model.revenue)}`, `Cost of sales ${fmt(m1.model.cos)} with opening stock, purchases, returns outwards and closing stock`, `Gross profit ${fmt(m1.model.gp)} and discount received added`, "Expenses with wages, rent, delivery expenses, general expenses, discount allowed, bad debts, depreciation and the change in the provision", `Profit for the year ${fmt(m1.model.profit)}`], modelAnswer: zt(m1.model.spl.md), explanation: "One mark per section; follow-through allowed." }),
      P.manual({ label: "(h)", marks: 2, stem: "State two limitations of using incomplete records.", points: ["Balancing figures such as drawings absorb unrecorded items, so errors are not detected", "No detailed records of sales and expenses, so profit and control are less reliable"], modelAnswer: "Errors are not detected because drawings and sales are balancing figures, and the lack of detailed records makes it hard to control the business and verify the profit.", explanation: "One mark for each limitation." }),
    ]),
    hints: ["Write a total account for debtors and for creditors.", "Expense for the year = cash paid adjusted for accruals and prepayments."],
    explanation: "This item tests the reconstruction of figures from incomplete records, the profit for the year and the income statement.",
  });
  chk(m1.model.capOpen, m1.soa.capital);

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: partnership appropriation and current accounts
  const names = ["Takura", "Nyasha", "Rudo"];
  const terms = [
    { name: "Takura", salary: 0, capital: 36000, interestOnCapitalPct: 5, drawings: 7850, interestOnDrawingsPct: 4, share: 3 },
    { name: "Nyasha", salary: 5000, capital: 28000, interestOnCapitalPct: 5, drawings: 8400, interestOnDrawingsPct: 4, share: 2 },
    { name: "Rudo", salary: 0, capital: 16000, interestOnCapitalPct: 5, drawings: 5250, interestOnDrawingsPct: 4, share: 1 },
  ];
  let profit2 = 0;
  for (let p = 54000; p < 56000; p += 1) {
    const c = appropriation({ profit: p, partners: terms });
    if (c.lines.every((l) => Math.abs(l.residualShare - Math.round(l.residualShare)) < 1e-9)) {
      profit2 = p;
      break;
    }
  }
  const A = approTable({ biz: "Takura, Nyasha and Rudo", when: "for the year ended 31 December 2025", profit: profit2, partners: terms, intro: "Net profit for the year" });
  const L = A.calc.lines;
  const open = [1630, -910, 2215];
  const close = terms.map((t, i) => r2(open[i] + L[i].total - t.drawings));
  const intCap = r2(L.reduce((s, l) => s + l.interestOnCapital, 0));
  const intDr = r2(L.reduce((s, l) => s + l.interestOnDrawings, 0));
  chk(intCap, 4000);
  chk(intDr, 860);
  const cur = colLedger(
    "Partners' current accounts",
    names,
    [["Balance b/d", null, 910, null], ["Interest on drawings", L[0].interestOnDrawings, L[1].interestOnDrawings, L[2].interestOnDrawings], ["Drawings", 7850, 8400, 5250]],
    [["Balance b/d", 1630, null, 2215], ["Salary", null, 5000, null], ["Interest on capital", L[0].interestOnCapital, L[1].interestOnCapital, L[2].interestOnCapital], ["Share of residual profit", L[0].residualShare, L[1].residualShare, L[2].residualShare]],
    { cdDate: "31 Dec", bdDate: "1 Jan" },
  );
  chk(cur.closing[2], close[2]);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 2",
    concepts: ["aacc.partnership.accounts"],
    stem: `Takura, Nyasha and Rudo are in partnership as hardware merchants in Gweru. The partnership agreement provides for: a salary of ${money(5000)} a year for Nyasha; interest on capital at 5% a year; interest charged on drawings at 4% of the drawings for the year; and the residual profit to be shared in the ratio 3 : 2 : 1 (Takura : Nyasha : Rudo).\n\nThe capital accounts are fixed: Takura ${money(36000)}, Nyasha ${money(28000)}, Rudo ${money(16000)}. Drawings for the year ended 31 December 2025 were Takura ${money(7850)}, Nyasha ${money(8400)} and Rudo ${money(5250)}. Current account balances at 1 January 2025 were Takura ${money(1630)} credit, Nyasha ${money(910)} debit and Rudo ${money(2215)} credit. The net profit for the year was ${money(profit2)}.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.num({ label: "(a)", marks: 2, kind: "money", value: intCap, wrong: [r2(intCap / 2)], stem: "Calculate the total interest on capital for the year.", explanation: "5% × (36,000 + 28,000 + 16,000) = 5% × 80,000 = 4,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: intDr, wrong: [r2(intDr * 2)], stem: "Calculate the total interest charged on drawings.", explanation: "4% × (7,850 + 8,400 + 5,250) = 4% × 21,500 = 860." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: A.residual, wrong: [r2(A.residual - 2 * intDr), r2(profit2 - 5000 - intCap)], stem: "Calculate the residual profit to be shared.", explanation: `${fmt(profit2)} + interest on drawings ${fmt(intDr)} - salary 5,000 - interest on capital 4,000 = ${fmt(A.residual)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: L[1].total, wrong: [L[1].residualShare, r2(L[1].total + 2 * L[1].interestOnDrawings)], stem: "Calculate the total profit appropriated to Nyasha (salary, interest on capital and share of residual, less interest on drawings).", explanation: `Salary 5,000 + interest 1,400 + share ${fmt(L[1].residualShare)} - interest on drawings ${fmt(L[1].interestOnDrawings)} = ${fmt(L[1].total)}.` }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: close[2], wrong: [r2(close[2] + 5250), r2(2215 + L[2].residualShare)], stem: "Calculate the balance on Rudo's current account at 31 December 2025 (credit).", explanation: `${fmt(2215)} + ${fmt(L[2].total)} - 5,250 = ${fmt(close[2])}.` }),
      P.manual({ label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the profit and loss appropriation account for the year ended 31 December 2025.", points: ["Heading and net profit with interest on drawings added", "Salary for Nyasha deducted", "Interest on capital deducted for each partner", `Residual profit ${fmt(A.residual)}`, "Residual shared 3 : 2 : 1 and agreeing"], modelAnswer: A.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(g)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' current accounts for the year in columnar form.", points: ["Opening balances on the correct sides (Nyasha debit)", "Salary, interest on capital and share of residual credited", "Interest on drawings and drawings debited", "Closing balances brought down correctly"], modelAnswer: cur.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(h)", marks: 3, stem: "Explain why partners may agree to charge interest on drawings.", points: ["It discourages partners from withdrawing money early", "Partners who draw more than others are charged for the use of the firm's funds", "It treats the partners fairly because the firm loses the use of money withdrawn"], modelAnswer: "Interest on drawings discourages early withdrawals. A partner who draws more uses more of the firm's funds, so the charge is fair to the others.", explanation: "One mark for each reason." }),
    ]),
    hints: ["Add interest on drawings to the profit before sharing.", "Fixed capital: all entries go through the current accounts."],
    explanation: "This item tests the appropriation account and current accounts of a three-partner firm.",
  });
  check("exam item 2 total", sum(L.map((l) => l.total)), profit2);
});
