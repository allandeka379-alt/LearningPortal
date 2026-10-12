// W2a exam-format items: Cambridge Paper 2 question 1 (30 marks, x2) and question 2/3 (15 marks, x1)
import { concept, P, EXAM, checkExam, CAM, table, check, sum, r2, fmt, money, chk, ratios, appropriation } from "../lib.mjs";
import { approTable } from "../tables/w2a-lib.mjs";
import { incompleteModel, incompleteStem } from "../tables/w2a-incomplete.mjs";
import { tradingModel, adjustmentNotes } from "../tables/w2a-models.mjs";

concept("aacc.incomplete.final-accounts", { file: "exam/w2a-camp2", keyPrefix: "exam.w2a-camp2", applies: CAM }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1 (30 marks): sole trader from incomplete records, with ratios and an evaluation
  const s1 = {
    biz: "Mapfumo Fresh Produce", grouped: false,
    openNca: [{ label: "Cold room equipment", cost: 22400, accDep: 8960, rate: 10 }],
    openInv: 5720, closeInv: 6485,
    recv: { open: 2780, close: 3340, cust: 52460, disc: 685, ret: 930, bad: 415 },
    pay: { open: 5260, close: 4870, supp: 39780, disc: 555, ret: 745 },
    cashSales: 15320, bank: { open: 3465, close: 6150 },
    expenses: [
      { label: "Wages", paid: 9260, openAcc: 360, closeAcc: 425 },
      { label: "Rent", paid: 5465, openPre: 495, closePre: 495 },
      { label: "Electricity", paid: 2235, openAcc: 185, closeAcc: 205 },
      { label: "Delivery costs", paid: 1965 },
      { label: "General expenses", paid: 1610 },
    ],
    allowOpen: 140, allowPct: 5,
  };
  const m1 = incompleteModel(s1);
  const gm = ratios.grossMargin(m1.model.gp, m1.model.revenue);
  const pm = ratios.profitMargin(m1.model.profit, m1.model.revenue);
  const depAllow = r2(m1.model.depTotal + m1.model.allowInc);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P2_Q1.skill, secs: EXAM.CAM_P2_Q1.secs, calculator: true, applies: CAM, paper: "Cambridge Paper 2",
    concepts: ["aacc.incomplete.statement-of-affairs", "aacc.incomplete.missing-figures", "aacc.incomplete.final-accounts", "aacc.ratios.profitability"],
    stem: `Rudo Mapfumo sells vegetables and fruit in Harare and keeps incomplete records. The information below is taken from her bank statements, invoices and till rolls for the year ended 31 December 2025.\n\n${incompleteStem(s1)}\n\nThe cold room equipment is depreciated at 10% of cost. The allowance for irrecoverable debts is to be 5% of trade receivables at the year end. All other withdrawals from the bank were drawings.`,
    parts: checkExam(EXAM.CAM_P2_Q1, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: m1.soa.capital, wrong: [m1.soa.assets, r2(m1.soa.capital + s1.openNca[0].accDep)], stem: "Calculate Rudo's capital at 1 January 2025.", explanation: `Assets: equipment ${fmt(22400 - 8960)}, inventory 5,720, trade receivables ${fmt(2780 - 140)}, prepaid rent 495, bank 3,465 = ${fmt(m1.soa.assets)}. Liabilities: trade payables 5,260 and accruals 545 = ${fmt(m1.soa.liabilities)}. Capital ${fmt(m1.soa.capital)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: m1.creditSales, wrong: [r2(m1.creditSales - s1.recv.bad), s1.recv.cust], stem: "Calculate the credit sales for the year.", explanation: `${fmt(s1.recv.close)} + ${fmt(s1.recv.cust)} + ${fmt(s1.recv.disc)} + ${fmt(s1.recv.ret)} + ${fmt(s1.recv.bad)} - ${fmt(s1.recv.open)} = ${fmt(m1.creditSales)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: m1.purchases, wrong: [r2(m1.purchases - s1.pay.ret)], stem: "Calculate the credit purchases for the year.", explanation: `${fmt(s1.pay.close)} + ${fmt(s1.pay.supp)} + ${fmt(s1.pay.disc)} + ${fmt(s1.pay.ret)} - ${fmt(s1.pay.open)} = ${fmt(m1.purchases)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: m1.drawings, wrong: [r2(m1.drawings + 185), r2(m1.drawings - 2 * 495)], stem: "Calculate Rudo's drawings for the year.", explanation: `Receipts ${fmt(s1.bank.open + s1.recv.cust + s1.cashSales)} less payments ${fmt(s1.pay.supp + s1.expenses.reduce((x, e) => x + e.paid, 0))} less closing bank ${fmt(s1.bank.close)} = ${fmt(m1.drawings)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: depAllow, wrong: [m1.model.depTotal, m1.model.allowNew], stem: "Calculate the total of depreciation and the change in the allowance for irrecoverable debts to be charged for the year.", explanation: `Depreciation 10% × 22,400 = ${fmt(m1.model.depTotal)}; allowance 5% × 3,340 = ${fmt(m1.model.allowNew)}, an increase of ${fmt(m1.model.allowInc)}; total ${fmt(depAllow)}.` }),
      P.num({ label: "(f)", marks: 5, kind: "money", value: m1.model.profit, wrong: [r2(m1.model.profit + m1.model.irrExp), r2(m1.model.gp)], stem: "Calculate the profit for the year.", explanation: `Revenue ${fmt(m1.model.revenue)} - cost of sales ${fmt(m1.model.cos)} = gross profit ${fmt(m1.model.gp)}; + discount received 555 - expenses ${fmt(m1.model.expensesTotal)} = ${fmt(m1.model.profit)}.` }),
      P.num({ label: "(g)", marks: 2, kind: "pct", value: gm, wrong: [r2(ratios.markUp(m1.model.gp, m1.model.cos)), r2(pm)], stem: "Calculate the gross profit margin as a percentage, to one decimal place.", explanation: `${fmt(m1.model.gp)} ÷ ${fmt(m1.model.revenue)} × 100 = ${fmt(r2(gm))}%.` }),
      P.num({ label: "(h)", marks: 2, kind: "pct", value: pm, wrong: [r2(gm), r2(ratios.profitMargin(m1.model.profit, m1.sales))], stem: "Calculate the profit margin (profit for the year ÷ revenue × 100), to one decimal place.", explanation: `${fmt(m1.model.profit)} ÷ ${fmt(m1.model.revenue)} × 100 = ${fmt(r2(pm))}%.` }),
      P.manual({ label: "(i)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year ended 31 December 2025.", points: [`Heading, revenue ${fmt(m1.model.revenue)} after returns inwards`, `Cost of sales ${fmt(m1.model.cos)} with opening inventory, purchases, returns outwards and closing inventory`, `Gross profit ${fmt(m1.model.gp)} and discount received`, "Expenses with accruals and prepayments adjusted, depreciation and irrecoverable debts", `Profit for the year ${fmt(m1.model.profit)}`], modelAnswer: m1.model.spl.md, explanation: "One mark per section; follow-through allowed." }),
      P.manual({ label: "(j)", marks: 3, stem: `Rudo says: "My business is healthy because profit is ${fmt(m1.model.profit)} and I drew ${fmt(m1.drawings)}." Evaluate her statement.`, points: [`Profit for the year of ${fmt(m1.model.profit)} compared with revenue gives a profit margin of ${fmt(r2(pm))}%, which supports her view`, `Drawings of ${fmt(m1.drawings)} were ${m1.drawings < m1.model.profit ? "less" : "more"} than profit, so capital ${m1.drawings < m1.model.profit ? "grew" : "fell"}`, "The profit depends on estimates and balancing figures from incomplete records, so she should keep full records before relying on it"], modelAnswer: `The profit margin of ${fmt(r2(pm))}% and profit above drawings support her view. But the figures come from incomplete records with balancing items, so they are less reliable and she should keep full books.`, explanation: "One mark each; the judgement must use the figures." }),
    ]),
    hints: ["Prepare an opening statement of affairs first.", "Use a total account for receivables and payables; drawings are the balancing figure of the bank summary."],
    explanation: "This item tests the reconstruction of figures from incomplete records, the statement of profit or loss and two profitability ratios.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2 (30 marks): partnership statements from a trial balance and notes
  const mk2 = (g) => ({
    biz: "Chikwava and Sithole", grouped: false,
    nca: [{ label: "Equipment", cost: 37500, accDep: 11250, rate: 10 }, { label: "Vehicles", cost: 27500, accDep: 11000, rate: 20 }],
    sales: 168350, returnsIn: 2240, openInv: 14820, purchases: 98260, carriageIn: 1435, returnsOut: 1915, closingInv: 16190,
    income: [{ label: "Discount received", tb: 780 }, { label: "Rent received", tb: 3600, acc: 330 }],
    expenses: [{ label: "Wages", tb: 21640, acc: 560 }, { label: "Rent", tb: 6300, pre: 520 }, { label: "Carriage outwards", tb: 2975 }, { label: "Insurance", tb: 2360, pre: 410 }, { label: "General expenses", tb: g }, { label: "Discount allowed", tb: 920 }],
    recv: 17640, writeOff: 665, allowPct: 4, allowOpen: 520, bank: 7935, cash: 380, payables: 11860,
    partners: [
      { name: "Chikwava", capital: 27500, currentOpen: 3120, drawings: 9850, salary: 0, intCapPct: 5, share: 3 },
      { name: "Sithole", capital: 16500, currentOpen: undefined, drawings: 8250, salary: 6400, intCapPct: 5, share: 2 },
    ],
  });
  let d2 = mk2(4185);
  for (let g = 4100; g < 4300; g += 1) {
    const t = tradingModel(mk2(g));
    if (t.appro.calc.lines.every((l) => Math.abs(l.residualShare - Math.round(l.residualShare)) < 1e-9)) {
      d2 = mk2(g);
      break;
    }
  }
  const m2 = tradingModel(d2);
  const pr = m2.partnerResults;
  const L = m2.appro.calc.lines;
  const gm2 = ratios.grossMargin(m2.gp, m2.revenue);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P2_Q1.skill, secs: EXAM.CAM_P2_Q1.secs, calculator: true, applies: CAM, paper: "Cambridge Paper 2",
    concepts: ["aacc.statements.adjustments", "aacc.partnership.accounts", "aacc.ratios.profitability"],
    stem: `Chikwava and Sithole are in partnership as wholesalers in Bulawayo. The trial balance at 31 December 2025 and the year-end adjustments follow. The partnership agreement provides: a salary of ${money(6400)} for Sithole; interest on capital at 5%; and the residual profit shared 3 : 2 (Chikwava : Sithole). Capital accounts are fixed. Drawings for the year were Chikwava ${money(9850)} and Sithole ${money(8250)}.\n\n${m2.tb.md}\n\n${adjustmentNotes(d2)}`,
    parts: checkExam(EXAM.CAM_P2_Q1, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: m2.cos, wrong: [r2(m2.cos - 1435), r2(m2.cos + 2 * 16190)], stem: "Calculate the cost of sales.", explanation: `${fmt(14820)} + ${fmt(98260)} + ${fmt(1435)} - ${fmt(1915)} - ${fmt(16190)} = ${fmt(m2.cos)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: m2.gp, wrong: [r2(168350 - m2.cos)], stem: "Calculate the gross profit.", explanation: `Revenue ${fmt(m2.revenue)} (sales less returns inwards) - ${fmt(m2.cos)} = ${fmt(m2.gp)}.` }),
      P.num({ label: "(c)", marks: 5, kind: "money", value: m2.profit, wrong: [r2(m2.profit + m2.irrExp), r2(m2.profit - 665)], stem: "Calculate the profit for the year.", explanation: `Gross profit ${fmt(m2.gp)} + other income ${fmt(m2.incs.reduce((x, i) => x + i.amt, 0))} - expenses ${fmt(m2.expensesTotal)} = ${fmt(m2.profit)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: m2.appro.residual, wrong: [r2(m2.profit - 6400), r2(m2.profit - L[0].interestOnCapital - L[1].interestOnCapital)], stem: "Calculate the residual profit to be shared.", explanation: `Interest on capital: ${fmt(L[0].interestOnCapital)} and ${fmt(L[1].interestOnCapital)}. Residual = ${fmt(m2.profit)} - 6,400 - ${fmt(r2(L[0].interestOnCapital + L[1].interestOnCapital))} = ${fmt(m2.appro.residual)}.` }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: pr[1].appropriated, wrong: [L[1].residualShare, r2(pr[0].appropriated)], stem: "Calculate the total profit appropriated to Sithole.", explanation: `Salary 6,400 + interest ${fmt(L[1].interestOnCapital)} + 2/5 × ${fmt(m2.appro.residual)} (${fmt(L[1].residualShare)}) = ${fmt(pr[1].appropriated)}.` }),
      P.num({ label: "(f)", marks: 3, kind: "money", value: pr[0].currentClose, wrong: [r2(pr[0].currentClose + 9850), r2(3120 + pr[0].appropriated)], stem: "Calculate the balance on Chikwava's current account at 31 December 2025 (credit).", explanation: `${fmt(3120)} + ${fmt(pr[0].appropriated)} - 9,850 = ${fmt(pr[0].currentClose)}.` }),
      P.num({ label: "(g)", marks: 3, kind: "money", value: m2.assets, wrong: [r2(m2.assets - 910), r2(m2.assets + m2.allowNew)], stem: "Calculate total assets at 31 December 2025.", explanation: `Non-current assets ${fmt(m2.ncaTotal)} + current assets ${fmt(m2.caTotal)} = ${fmt(m2.assets)}.` }),
      P.num({ label: "(h)", marks: 2, kind: "pct", value: gm2, wrong: [r2(ratios.markUp(m2.gp, m2.cos))], stem: "Calculate the gross profit margin as a percentage, to one decimal place.", explanation: `${fmt(m2.gp)} ÷ ${fmt(m2.revenue)} × 100 = ${fmt(r2(gm2))}%.` }),
      P.manual({ label: "(i)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: ["Heading and profit for the year", "Salary and interest on capital deducted for each partner", `Residual profit ${fmt(m2.appro.residual)} shared 3 : 2 with totals agreeing`], modelAnswer: m2.appro.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(j)", marks: 3, stem: `Sithole feels the agreement is unfair because Chikwava has invested more capital. Using the figures, evaluate the agreement.`, points: [`Chikwava receives ${fmt(pr[0].appropriated)} against Sithole's ${fmt(pr[1].appropriated)}, a difference that reflects his larger capital and 3/5 share`, "Sithole's salary and 2/5 share partly compensate him for working in the business", "The agreement is fair if his work is valued at the salary; otherwise they could renegotiate the ratio or salary"], modelAnswer: `Chikwava receives US\\$${fmt(pr[0].appropriated)} and Sithole US\\$${fmt(pr[1].appropriated)}. The larger share reflects Chikwava's capital, while Sithole's salary and share compensate him for his work. It is fair if the salary reflects his effort, otherwise they should renegotiate.`, explanation: "One mark each for two reasoned points and a judgement." }),
    ]),
    hints: ["Prepare the statement of profit or loss first, then the appropriation account.", "Fixed capitals: appropriations go through the current accounts."],
    explanation: "This item tests a partnership's statement of profit or loss with adjustments, the appropriation account and current accounts, and a ratio.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3 (15 marks): partnership agreement and appropriation
  const prof3 = 41765;
  const loan3 = 14500;
  const li3 = r2(loan3 * 0.05);
  const act3 = r2((prof3 - li3) / 2);
  const ag3 = appropriation({ profit: r2(prof3 - li3), partners: [
    { name: "Dube", salary: 7350, capital: 38000, interestOnCapitalPct: 6, share: 3 },
    { name: "Ncube", capital: 22000, interestOnCapitalPct: 6, share: 2 },
  ] });
  check("ag3", ag3.lines[0].total + ag3.lines[1].total, r2(prof3 - li3));
  b.struct({
    d: 4, examStyle: true, skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, calculator: true, applies: CAM, paper: "Cambridge Paper 2",
    concepts: ["aacc.partnership.agreement", "aacc.partnership.accounts"],
    stem: `Dube and Ncube run a garden-supplies business in Gweru. They have no written agreement. Ncube lent the partnership ${money(loan3)} at the start of the year. Profit for the year ended 31 December 2025 before any interest on the loan was ${money(prof3)}. Dube works full time and says he should receive a salary of ${money(7350)}; he also says interest should be allowed on capital at 6% (Dube ${money(38000)}, Ncube ${money(22000)}) and that residual profit should be shared 3 : 2. Ncube says the Partnership Act applies.`,
    parts: checkExam(EXAM.CAM_P2_SHORT, [
      P.match({ label: "(a)", marks: 4, stem: "Decide whether each claim is supported by the Partnership Act when there is no agreement.", pairs: ["Dube's claim to a salary", "Dube's claim to 6% interest on capital", "Dube's claim that profits are shared 3 : 2", "Ncube's claim to interest on his loan"], right: ["Not supported", "Supported"], rightIndex: [0, 0, 0, 1], explanation: "The Act gives no salary, no interest on capital and equal sharing; a loan earns 5%.", marksPerPair: 1 }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: li3, wrong: [r2(loan3 * 0.06)], stem: "Calculate the interest due to Ncube on his loan.", explanation: "5% × 14,500 = 725." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: act3, wrong: [r2(prof3 / 2)], stem: "Calculate the profit each partner receives if the Act applies.", explanation: `(${fmt(prof3)} - 725) ÷ 2 = ${fmt(act3)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: ag3.lines[0].total, wrong: [act3, ag3.lines[0].residualShare], stem: "Calculate Dube's total profit if Dube's terms were agreed (salary, 6% interest and 3 : 2 sharing of the residual, after loan interest).", explanation: `Profit after loan interest ${fmt(r2(prof3 - li3))}; salary 7,350; interest 2,280 + 1,320; residual ${fmt(ag3.residual)}; Dube: 7,350 + 2,280 + ${fmt(ag3.lines[0].residualShare)} = ${fmt(ag3.lines[0].total)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Advise the partners how to resolve the disagreement and evaluate the effect on each of them.", points: [`Under the Act each receives ${fmt(act3)}; under Dube's terms he receives ${fmt(ag3.lines[0].total)} and Ncube ${fmt(ag3.lines[1].total)}`, "Dube's terms recognise his work and larger capital, so may be fair, but Ncube loses a lot", "The Act applies only if there is no agreement, so the partners can agree different terms", "Advice: agree and sign a written partnership agreement with reasonable terms"], modelAnswer: `Under the Act each partner would receive US\\$${fmt(act3)}, but under Dube's terms he receives US\\$${fmt(ag3.lines[0].total)} and Ncube US\\$${fmt(ag3.lines[1].total)}. Dube's terms recognise his work and capital but are costly for Ncube. The partners should negotiate and sign a written agreement.`, explanation: "One mark each; figures must be used." }),
    ]),
    hints: ["Under the Act: equal shares, no salary, no interest on capital, 5% on loans.", "The loan interest is an expense deducted before profit is shared."],
    explanation: "This item tests the default rules of the Partnership Act and their effect on the appropriation of profit.",
  });
  void table;
  void sum;
});
