// W2a: incomplete.final-accounts
import { concept, P, table, r2, fmt, money, chk, check } from "../lib.mjs";
import { mc, colLedger } from "../tables/w2a-lib.mjs";
import { incompleteModel, incompleteStem } from "../tables/w2a-incomplete.mjs";

concept("aacc.incomplete.final-accounts", { file: "incomplete/final-accounts", keyPrefix: "incomplete.final-accounts" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the first step in preparing final accounts from incomplete records?",
    ok: ["Prepare the opening statement of affairs to find opening capital", "Correct: it gives the starting position for the capital."],
    bad: [["Prepare the statement of profit or loss for the year", "Its figures depend on workings that come first."], ["Calculate the depreciation on the equipment for the year", "Depreciation is an adjustment made once the opening position is known."], ["Prepare the closing statement of financial position at the year end", "The closing statement is the last stage."]],
    explanation: "The opening statement of affairs fixes the opening capital, against which the reconstruction can be checked.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A payment of US\\$1,600 for a new freezer was made from the bank during the year. How is it treated in the final accounts?",
    ok: ["Added to the cost of equipment and depreciated", "Correct: it is capital expenditure, not an expense."],
    bad: [["Charged to the statement of profit or loss in full", "It will benefit several years, so it is not an expense of this year alone."], ["Treated as drawings", "It was paid for the business, not the owner."], ["Deducted from trade payables", "It is a payment for an asset, not for goods bought on credit."]],
    explanation: "Equipment purchases are capital expenditure. The cost is added to equipment and depreciation is charged.",
  });
  const paid = 5430;
  const op = 430;
  const cp = 560;
  const re = r2(paid + op - cp);
  chk(re, 5300);
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Rent paid during the year was ${money(paid)}. Rent prepaid was ${money(op)} at the start of the year and ${money(cp)} at the end. What is the rent expense for the year?`,
    ok: [money(re), "Correct: 5,430 + 430 - 560."],
    bad: [[money(paid), "The cash paid has not been adjusted."], [money(r2(paid - op + cp)), "The prepayments have been adjusted the wrong way."], [money(r2(paid + op + cp)), "The closing prepayment has been added instead of deducted."]],
    hints: ["The opening prepayment is used up this year; the closing prepayment belongs to next year."],
    explanation: "Expense = cash paid + opening prepayment - closing prepayment = 5,300.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In a partnership's appropriation account, which items are deducted before the residual profit is shared in the profit-sharing ratio?",
    ok: ["Partners' salaries and interest on capital", "Correct: they are allocated first; only the residual is shared in the ratio."],
    bad: [["Partners' drawings taken during the year", "Drawings are charged to the current accounts, not to the appropriation account."], ["Depreciation, wages and other expenses of the business", "These are expenses already deducted in the statement of profit or loss."], ["Interest on partners' loans to the firm", "That is an expense of the business, not an appropriation."]],
    hints: ["Think of what is allocated to individual partners regardless of the ratio."],
    explanation: "Appropriations such as salaries and interest on capital come before the residual is shared.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Prepaid insurance of US\\$380 at the start of the year was left out of the opening statement of affairs. What is the effect?",
    ok: ["Opening capital is understated by US\\$380", "Correct: an asset has been omitted, so net assets are too low."],
    bad: [["Opening capital is overstated by US\\$380", "Omitting an asset lowers the capital."], ["Profit for the year is overstated by US\\$380", "Opening capital does not itself change profit; the expense working would need the prepayment as well."], ["Opening capital is unaffected", "Capital is assets less liabilities, so it changes."]],
    hints: ["Capital = assets - liabilities."],
    explanation: "A missing asset reduces the net assets and therefore the opening capital.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A bank payment of US\\$600 for repairs was left out of the bank summary of a sole trader, and the drawings were found as the balancing figure. What is the effect?",
    ok: ["Drawings and profit are both overstated by US\\$600, and the statement still balances", "Correct: the missing payment inflates the balancing drawings and the omitted expense inflates profit equally."],
    bad: [["Drawings are understated by US\\$600 and profit is overstated by US\\$600", "A missing payment makes the balancing drawings larger, not smaller."], ["Profit is overstated by US\\$600 but drawings are correct", "The balancing figure drawings includes the missing 600."], ["The statement of financial position will no longer balance", "Drawings and profit move together, so capital is unaffected."]],
    hints: ["Which figure absorbs the missing payment?"],
    explanation: "Drawings (the balancing figure) absorb the 600, and profit is 600 too high because repairs are missing; the two cancel in closing capital.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "US\\$1,600 paid for a freezer was charged to repairs and no depreciation has been charged. Ignoring any tax, what is the effect before correction?",
    ok: ["Profit is understated by US\\$1,600 and non-current assets are understated", "Correct: the cost should be an asset, so profit is too low."],
    bad: [["Profit is overstated by US\\$1,600 and non-current assets are overstated", "Charging an expense lowers profit, not raises it."], ["Profit is understated by US\\$1,600 but non-current assets are correct", "The freezer is missing from the assets."], ["Profit and assets are correct but drawings are understated", "Drawings are not involved."]],
    hints: ["Expense too high or too low?"],
    explanation: "The freezer is a non-current asset, so charging it as an expense understates profit and the assets.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In incomplete records final accounts, the cost of a new machine bought during the year is added to non-current assets and not charged as an expense.", answer: true, explanation: "True. A machine benefits several years, so the cost is capitalised and depreciated." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "In a partnership, interest on a partner's loan to the business is deducted in the appropriation account.", answer: false, hints: ["Is the lender acting as an owner or as a creditor?"], explanation: "False. Interest on loans is an expense of the business; interest on capital is an appropriation." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each working to the figure it finds.",
    pairs: ["Total trade receivables account", "Total trade payables account", "Bank summary of a sole trader", "Expense account working"],
    right: ["Credit sales", "Credit purchases", "Drawings", "Expense for the year"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each working finds its balancing figure from the known items.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formula for closing capital.",
    template: "Closing capital = opening capital {{blank:a}} profit {{blank:b}} drawings.",
    blanks: [
      { id: "a", accepted: ["plus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["minus"], choices: ["plus", "minus"] },
    ],
    explanation: "Profit increases capital; drawings reduce it.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In the bank summary of a sole trader with incomplete records, which figure is usually the balancing figure?",
    accepted: ["drawings", "the drawings", "owner's drawings"],
    explanation: "After all known receipts and payments, the unexplained withdrawal is the owner's drawings.",
  });

  // numerical
  const dep = r2((14500 + 2300) * 0.1);
  chk(dep, 1680);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: dep, daily: true, calculator: true, wrong: [r2(14500 * 0.1), r2(2300 * 0.1)],
    stem: `Equipment cost ${money(14500)} at the start of the year, and a further machine costing ${money(2300)} was bought and paid from the bank during the year. Depreciation is 10% of the cost of equipment held at the year end. Calculate the depreciation charge for the year.`,
    explanation: "10% × (14,500 + 2,300) = 1,680. Leaving out the new machine gives 1,450.",
  });
  const cosV = r2(7140 + (3560 + 21480 + 295 + 410 - 3015) - 410 - 7925);
  chk(cosV, 21535);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cosV, calculator: true, wrong: [r2(7140 + 3560 + 21480 - 7925), r2(7140 + 21480 - 7925)],
    stem: `Opening inventory was ${money(7140)} and closing inventory ${money(7925)}. Trade payables were ${money(3015)} at the start and ${money(3560)} at the end. Suppliers were paid ${money(21480)}, discount received was ${money(295)} and returns outwards were ${money(410)}. There were no cash purchases. Calculate the cost of sales.`,
    hints: ["Find credit purchases with a total payables account, then deduct returns outwards in the cost of sales."],
    explanation: "Purchases = 3,560 + 21,480 + 295 + 410 - 3,015 = 22,730. Cost of sales = 7,140 + 22,730 - 410 - 7,925 = 21,535.",
  });
  const cap = r2(16240 + 9385 - 7210);
  chk(cap, 18415);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cap, calculator: true, wrong: [r2(16240 + 9385 + 7210), r2(16240 - 9385 - 7210)],
    stem: `A sole trader's opening capital was ${money(16240)}. The profit for the year was ${money(9385)} and drawings, found from the bank summary, were ${money(7210)}. Calculate the closing capital.`,
    hints: ["Profit is added; drawings are deducted."],
    explanation: "16,240 + 9,385 - 7,210 = 18,415.",
  });
  const sa = r2(21150 + 3420 - 4075);
  void sa;
  const opCap = r2(8420 + 5260 + 2310 + 1475 + 390 - 3865 - 255);
  chk(opCap, 13735);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: opCap, calculator: true, wrong: [r2(8420 + 5260 + 2310 + 1475 - 3865), r2(8420 + 5260 + 2310 + 1475 + 390 - 3865 + 255)],
    stem: `At the start of the year a trader owned equipment with a carrying amount of ${money(8420)}, inventory ${money(5260)}, trade receivables ${money(2310)}, and a bank balance of ${money(1475)}. Insurance of ${money(390)} was prepaid. The business owed trade payables ${money(3865)} and wages ${money(255)}. Calculate the opening capital.`,
    hints: ["List all assets, including prepayments, and all liabilities, including accruals."],
    explanation: "Assets: 8,420 + 5,260 + 2,310 + 1,475 + 390 = 17,855. Liabilities: 3,865 + 255 = 4,120. Capital = 13,735. Omitting the prepayment gives 13,345.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a new machine bought during the year is not treated as an expense in the final accounts from incomplete records.",
    points: ["It will be used for several years, so it is a non-current asset (capital expenditure)", "Only the depreciation for the year is charged to the statement of profit or loss"],
    modelAnswer: "The machine will help the business for several years, so its cost is added to non-current assets. Only each year's depreciation is charged as an expense.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "The statement of financial position of a trader with incomplete records balances. Explain why this does not prove that the profit is correct.",
    points: ["Drawings are found as a balancing figure, so an omitted payment is absorbed by drawings", "The omitted expense raises profit and drawings by the same amount, so the statement still balances", "Errors in valuations of inventory or receivables affect capital and profit equally"],
    modelAnswer: "Drawings are a balancing figure, so an unrecorded expense is hidden in drawings. Profit is then too high and drawings too high by the same amount, and the statement still balances. Valuation errors move assets and capital together.",
    hints: ["Which figure absorbs a mistake?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A partnership with incomplete records wants to borrow from a bank. Evaluate the reliability of its final accounts and advise the partners.",
    points: ["Several figures (drawings, credit sales, purchases) are balancing figures that absorb unrecorded items, so they are less reliable", "Accruals, prepayments and the allowance are estimates and can be manipulated", "The bank may place more weight on audited accounts and bank statements", "Advice: keep proper double-entry records and have the accounts prepared by a qualified accountant before applying"],
    modelAnswer: "The accounts rely on balancing figures and estimates, so they may hide errors. A bank would rate them less reliable than audited accounts. The partners should keep double-entry records and ask an accountant to prepare accounts before applying.",
    hints: ["Which figures are derived rather than recorded?"],
    explanation: "One mark each for two weaknesses, the bank's view and the advice.",
  });

  // Structured 1: sole trader (12 marks)
  const s1 = {
    biz: "Chirwa Stationers", grouped: false,
    openNca: [{ label: "Equipment", cost: 9740, accDep: 2435, rate: 10 }],
    openInv: 5380, closeInv: 6215,
    recv: { open: 1845, close: 2260, cust: 28615, disc: 320, ret: 570, bad: 190 },
    pay: { open: 2730, close: 3085, supp: 19480, disc: 265, ret: 430 },
    cashSales: 6970, bank: { open: 1260, close: 1945 },
    expenses: [{ label: "Wages", paid: 7310, openAcc: 210, closeAcc: 265 }, { label: "Rent", paid: 2640, openPre: 225, closePre: 330 }, { label: "Sundry expenses", paid: 1873 }],
    allowOpen: 90, allowPct: 5,
  };
  const m1 = incompleteModel(s1);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Tatenda Chirwa owns a stationery shop in Gweru and keeps no ledger. The financial year ends on 31 December 2025.\n\n${incompleteStem(s1)}\n\nEquipment is depreciated at 10% of cost and the allowance for irrecoverable debts is to be 5% of the closing trade receivables. All other withdrawals from the bank were drawings.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: m1.creditSales, wrong: [r2(m1.creditSales - s1.recv.bad), r2(s1.recv.close + s1.recv.cust)], stem: "Calculate the credit sales for the year.", explanation: `${fmt(s1.recv.close)} + ${fmt(s1.recv.cust)} + ${fmt(s1.recv.disc)} + ${fmt(s1.recv.ret)} + ${fmt(s1.recv.bad)} - ${fmt(s1.recv.open)} = ${fmt(m1.creditSales)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: m1.purchases, wrong: [r2(m1.purchases - s1.pay.ret)], stem: "Calculate the credit purchases for the year.", explanation: `${fmt(s1.pay.close)} + ${fmt(s1.pay.supp)} + ${fmt(s1.pay.disc)} + ${fmt(s1.pay.ret)} - ${fmt(s1.pay.open)} = ${fmt(m1.purchases)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: m1.drawings, wrong: [r2(m1.drawings + 1873), r2(m1.drawings - 1873)], stem: "Calculate the drawings.", explanation: `Bank receipts ${fmt(s1.bank.open)} + ${fmt(s1.recv.cust)} + ${fmt(s1.cashSales)} less payments ${fmt(s1.pay.supp)} + ${fmt(s1.expenses.reduce((x, e) => x + e.paid, 0))} less the closing balance ${fmt(s1.bank.close)} = ${fmt(m1.drawings)}.` }),
      P.num({ label: "(d)", marks: 4, kind: "money", value: m1.model.profit, wrong: [r2(m1.model.profit + 1873), r2(m1.model.profit - m1.model.irrExp)], stem: "Calculate the profit for the year.", explanation: `Revenue ${fmt(m1.model.revenue)}, cost of sales ${fmt(m1.model.cos)}, gross profit ${fmt(m1.model.gp)}; expenses ${fmt(m1.model.expensesTotal)}; plus discount received ${fmt(s1.pay.disc)}; profit ${fmt(m1.model.profit)}.` }),
    ],
    hints: ["Use a total account for each of receivables and payables.", "Adjust each expense for the opening and closing accruals and prepayments."],
    explanation: "This item tests the reconstruction of credit sales, purchases, drawings and profit.",
  });

  // Structured 2: partnership (18 marks)
  let spec2 = null;
  for (let g = 3000; g < 3100; g += 1) {
    const cand = {
      biz: "Dube and Sibanda, bakery", grouped: false,
      openNca: [{ label: "Ovens", cost: 16500, accDep: 6600, rate: 10 }, { label: "Van", cost: 12000, accDep: 4800, rate: 20 }],
      openInv: 3185, closeInv: 3640,
      recv: { open: 2465, close: 2900, cust: 38740, disc: 445, ret: 690, bad: 275 },
      pay: { open: 3350, close: 2980, supp: 24915, disc: 365, ret: 515 },
      cashSales: 19380, bank: { open: 2530 },
      expenses: [{ label: "Wages", paid: 10640, openAcc: 395, closeAcc: 470 }, { label: "Electricity", paid: 2760, openAcc: 180, closeAcc: 245 }, { label: "Van expenses", paid: 1925 }, { label: "General expenses", paid: g }],
      allowOpen: 110, allowPct: 4,
      partners: [
        { name: "Dube", capital: 10000, currentOpen: 1920, drawings: 7450, salary: 3000, intCapPct: 4, share: 2 },
        { name: "Sibanda", capital: 7000, currentOpen: undefined, drawings: 6240, salary: 0, intCapPct: 4, share: 1 },
      ],
    };
    const m = incompleteModel(cand);
    const res = m.model.appro.residual;
    if (Number.isInteger(res) && res % 3 === 0 && res > 3000 && Number.isInteger(m.model.profit)) {
      spec2 = cand;
      break;
    }
  }
  if (!spec2) throw new Error("no clean partnership scenario");
  const m2 = incompleteModel(spec2);
  const pr = m2.model.partnerResults;
  const lines = m2.model.appro.calc.lines;
  const full2 = { ...spec2, bank: { ...spec2.bank, close: m2.bankClose }, partners: spec2.partners.map((p, i) => (i === 1 ? { ...p, currentOpen: m2.lastCurrentFromSoa } : p)) };
  const stemPartners = incompleteStem({ ...spec2, bank: { ...spec2.bank, close: m2.bankClose } });
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Sipho Dube and Rudo Sibanda trade as a bakery in Gweru. They share profits and losses 2 : 1. The financial year ends on 31 December 2025. No ledger is kept. Dube's current account had a credit balance of ${money(1920)} at 1 January; the partners' fixed capitals are ${money(10000)} (Dube) and ${money(7000)} (Sibanda). Dube is entitled to a salary of ${money(3000)} and each partner to interest on capital at 4%.\n\n${stemPartners}\n\nOvens are depreciated at 10% and the van at 20% of cost. The allowance for irrecoverable debts is to be 4% of closing trade receivables. Statements are for internal use.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: m2.lastCurrentFromSoa, wrong: [m2.soa.capital, r2(m2.lastCurrentFromSoa + 1920)], stem: "Calculate Sibanda's current account balance (credit) at 1 January 2025 from the opening assets and liabilities.", explanation: `Opening net assets ${fmt(m2.soa.capital)}; less capital accounts 17,000 and Dube's current account 1,920 = ${fmt(m2.lastCurrentFromSoa)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: m2.creditSales, wrong: [r2(m2.creditSales + spec2.cashSales)], stem: "Calculate the credit sales.", explanation: `${fmt(spec2.recv.close)} + ${fmt(spec2.recv.cust)} + ${fmt(spec2.recv.disc)} + ${fmt(spec2.recv.ret)} + ${fmt(spec2.recv.bad)} - ${fmt(spec2.recv.open)} = ${fmt(m2.creditSales)}.` }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: m2.model.profit, wrong: [r2(m2.model.profit + 275), r2(m2.model.profit - m2.model.depTotal)], stem: "Calculate the profit for the year.", explanation: `Revenue ${fmt(m2.model.revenue)} - cost of sales ${fmt(m2.model.cos)} = gross profit ${fmt(m2.model.gp)}; + discount received 365 - expenses ${fmt(m2.model.expensesTotal)} = ${fmt(m2.model.profit)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: pr[0].appropriated, wrong: [lines[0].residualShare, r2(lines[0].salary + lines[0].interestOnCapital)], stem: "Calculate the total profit appropriated to Dube (salary, interest and share of the residual).", explanation: `Residual ${fmt(m2.model.appro.residual)} after salary 3,000 and interest 400 + 280; Dube: 3,000 + 400 + ${fmt(lines[0].residualShare)} = ${fmt(pr[0].appropriated)}.` }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: pr[1].currentClose, wrong: [r2(pr[1].currentClose + pr[1].drawings), r2(m2.lastCurrentFromSoa + pr[1].appropriated)], stem: "Calculate Sibanda's current account balance at 31 December 2025 (credit).", explanation: `${fmt(m2.lastCurrentFromSoa)} + ${fmt(pr[1].appropriated)} - ${fmt(pr[1].drawings)} = ${fmt(pr[1].currentClose)}.` }),
      P.manual({ label: "(f)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: ["Heading and profit for the year", "Salary and interest on capital for each partner correctly deducted", "Residual shared 2 : 1 and agreeing with the residual profit"], modelAnswer: m2.model.appro.md, explanation: "One mark per point; allow own-figure follow-through." }),
    ],
    hints: ["Opening net assets less the capital accounts leaves the current accounts.", "Appropriate profit before sharing the residual."],
    explanation: "This item tests a partnership's final accounts from incomplete records.",
  });
  check("current account ledger agrees", colLedger("x", ["D", "S"], [["Drawings", pr[0].drawings, pr[1].drawings]], [["Balance", pr[0].currentOpen, pr[1].currentOpen], ["Appropriation", pr[0].appropriated, pr[1].appropriated]]).closing[1], pr[1].currentClose);
  void full2;

  b.card("DEFINITION", "What is a **reconstruction** in incomplete records?", "Recovering missing figures (credit sales, purchases, expenses, drawings, opening capital) step by step from the surviving information.");
  b.card("CONCEPT", "Order of work: final accounts from incomplete records", "Opening statement of affairs, total accounts, bank summary, expenses, adjustments, then the statements and a balance check.");
  b.card("FORMULA", "Expense for the year", "Cash paid + opening prepayment + closing accrual - opening accrual - closing prepayment.");
  b.card("FACT", "Purchase of equipment in the year", "Add to the cost of non-current assets and depreciate; it is not an expense.");
  b.card("FACT", "Opening current account of the last partner", "Opening net assets less the capital accounts and the other partners' current accounts.");
  b.card("FORMULA", "Closing current account of a partner", "Opening balance + salary + interest on capital + share of residual - interest on drawings - drawings.");
  b.card("CONCEPT", "Why can the statement of financial position balance yet be wrong?", "Balancing figures such as drawings absorb omitted items, so profit and drawings may both be misstated.");
  b.card("FACT", "Partnership appropriation order", "Profit for the year, then salaries and interest on capital, then the residual shared in the profit-sharing ratio.");
  b.card("FACT", "Interest on partners' loans", "An expense of the business, charged before profit for the year; not an appropriation.");
});
