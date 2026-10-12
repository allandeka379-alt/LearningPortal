// W1b exam-format items: Cambridge Paper 2 (CAM_P2_SHORT x3: depreciation and disposal; suspense and corrected profit;
// bank reconciliation. CAM_P2_Q1 x1: sole trader statements with depreciation, an error correction and inventory valuation).
import { concept, P, EXAM, checkExam, CAM, money, fmt, check, chk, r2, sum, rd, table, tAccount, statement, journal, trialBalance, ratios } from "../lib.mjs";
import { U } from "../tables/w1b-lib.mjs";

concept("aacc.ledger.nca-disposal", { file: "exam/w1b-camp2", keyPrefix: "exam.w1b-camp2", applies: CAM }, (b) => {
  const X = EXAM.CAM_P2_SHORT;
  const common = { examStyle: true, applies: CAM, calculator: true, paper: "Cambridge Paper 2" };

  // =====================================================================================================
  // CAM_P2_SHORT 1: depreciation and disposal of machinery (monthly basis), year ended 30 June 2026
  {
    const m = { cost0: 144000, acc0: 57600, add: 42000, soldCost: 39000, proc: 30500, rate: 10 };
    const perYear = (c) => (c * m.rate) / 100;
    const accSold = chk(perYear(m.soldCost) * 2 + perYear(m.soldCost) * (8 / 12), 10400);
    const nbvSold = m.soldCost - accSold;
    const profit = chk(m.proc - nbvSold, 1900);
    const charge = chk(perYear(m.cost0 - m.soldCost) + perYear(m.soldCost) * (8 / 12) + perYear(m.add) * (8 / 12), 15900);
    const costClose = m.cost0 - m.soldCost + m.add;
    const accClose = chk(m.acc0 - accSold + charge, 63100);
    const carrying = chk(costClose - accClose, 83900);
    const disp = tAccount("Disposal of machinery account",
      [["28 Feb 2026", "Machinery at cost", m.soldCost], ["30 Jun 2026", "Statement of profit or loss (profit)", profit]],
      [["28 Feb 2026", "Accumulated depreciation", accSold], ["28 Feb 2026", "Bank", m.proc]]);
    b.struct({
      ...common, d: 4, skill: X.skill, secs: X.secs, concepts: ["aacc.ledger.nca-disposal", "aacc.ledger.depreciation"],
      stem: `Tatenda Printers is a sole trader in Bulawayo with a year end of 30 June. At 1 July 2025 machinery had a total cost of ${money(m.cost0)} and accumulated depreciation of ${money(m.acc0)}. Machinery is depreciated at ${m.rate}% per annum on cost, straight line, on a monthly basis.\n\nDuring the year ended 30 June 2026:\n- on 1 November 2025 a new machine was bought for ${money(m.add)};\n- on 28 February 2026 a machine that had been bought on 1 July 2023 for ${money(m.soldCost)} was sold for ${money(m.proc)}, received in the bank.`,
      parts: checkExam(X, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: accSold, wrong: [r2(perYear(m.soldCost) * 2), r2(perYear(m.soldCost) * 3)], stem: "Calculate the accumulated depreciation on the machine sold, up to the date of sale.", explanation: "Two full years (2023/24 and 2024/25) at 3,900 = 7,800, plus 8 months of 2025/26 (July to February): 3,900 × 8/12 = 2,600. Total 10,400." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: profit, wrong: [r2(m.proc - m.soldCost), r2(m.proc - (m.soldCost - perYear(m.soldCost) * 2))], stem: "Calculate the profit on disposal of the machine.", explanation: "Carrying amount 39,000 − 10,400 = 28,600. Profit = 30,500 − 28,600 = 1,900." }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: charge, wrong: [perYear(m.cost0), r2(perYear(costClose))], stem: "Calculate the depreciation charge for the year ended 30 June 2026.", explanation: "Machines owned all year: 10% × (144,000 − 39,000) = 10,500. Machine sold: 2,600 (8 months). New machine: 10% × 42,000 × 8/12 = 2,800 (November to June). Total 15,900." }),
        P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal of machinery account.", points: ["Debit: machinery at cost 39,000", "Credit: accumulated depreciation 10,400 and bank 30,500", "Profit of 1,900 shown as the balancing figure on the debit side, totals 40,900"], modelAnswer: disp, explanation: "The profit is the debit balancing figure." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: carrying, wrong: [r2(costClose - m.acc0)], stem: "Calculate the carrying amount of machinery at 30 June 2026.", explanation: "Cost 144,000 − 39,000 + 42,000 = 147,000. Accumulated depreciation 57,600 − 10,400 + 15,900 = 63,100. Carrying amount 83,900." }),
        P.manual({ label: "(f)", marks: 3, stem: "Tatenda says: \"The profit on disposal shows that the machine was a good purchase.\" Evaluate this statement.", points: ["A profit means proceeds exceeded the carrying amount", "It indicates that too much depreciation was charged in earlier years, not necessarily that the machine was a good purchase", "The machine's contribution to revenue over its life should be considered; conclusion that the statement is not justified by the profit alone"], modelAnswer: "The profit shows that the machine was sold for more than its carrying amount, which means that depreciation charged in earlier years was too high. It does not prove a good purchase, because that depends on the revenue the machine helped to earn over its life.", explanation: "A balanced answer separates the accounting correction from the quality of the investment." }),
      ]),
      hints: ["The machine is charged for two full years and 8 months of the year of sale.", "The new machine is owned for 8 months (November to June)."],
      explanation: "This Cambridge Paper 2 style question tests depreciation on a monthly basis, the disposal account and an evaluation of the result on disposal.",
    });
  }

  // =====================================================================================================
  // CAM_P2_SHORT 2: suspense account and corrected profit
  {
    const e = { sale: 2100, saleBooked: 2010, ins: 570, rent: 800 };
    const e1 = e.sale - e.saleBooked; // 90 debit missing
    const susp = chk(e1 + e.ins, 660);
    const draftDr = 118330, draftCr = draftDr + susp;
    const draftProfit = 27400, draftWC = 15900;
    const corrProfit = chk(draftProfit - e.ins + e.rent, 27630);
    const corrWC = chk(draftWC + e1 + e.rent, 16790);
    const j = journal([
      { date: "1", lines: [["Customer: trade receivables", e1, null], ["Suspense", null, e1]], narrative: "Credit sale of 2,100 debited to the customer as 2,010" },
      { date: "2", lines: [["Insurance", e.ins, null], ["Suspense", null, e.ins]], narrative: "Insurance paid by cheque credited to bank but not debited to insurance" },
      { date: "3", lines: [["Bank", e.rent, null], ["Rent received", null, e.rent]], narrative: "Rent received omitted from the books" },
    ]);
    b.struct({
      ...common, d: 4, skill: X.skill, secs: X.secs, concepts: ["aacc.verification.suspense", "aacc.verification.errors"],
      stem: `The trial balance of Nyasha Stores at 30 September 2025 did not agree. The debit column totalled ${money(draftDr)} and the credit column ${money(draftCr)}. The difference was placed in a suspense account. These errors were then found:\n\n1. A credit sale of ${money(e.sale)} was correctly credited to sales but debited to the customer's account as ${money(e.saleBooked)}.\n2. Insurance of ${money(e.ins)} paid by cheque was credited to the bank account but no debit entry was made.\n3. Rent received of ${money(e.rent)} was not recorded in the books.\n\nThe draft profit for the year was ${money(draftProfit)} and the draft working capital was ${money(draftWC)}.`,
      parts: checkExam(X, [
        P.group({ label: "(a)", stem: "Suspense account", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: susp, wrong: [draftCr], stem: "Calculate the amount placed in the suspense account.", explanation: "118,990 − 118,330 = 660." }),
          P.fib({ label: "(ii)", marks: 1, stem: "Complete the sentence.", template: "The suspense account was {{blank:s}}.", blanks: [{ id: "s", accepted: ["debited"], choices: ["debited", "credited"] }], explanation: "Credits were higher, so debits were short and the suspense account was debited." }),
        ] }),
        P.fib({ label: "(b)", marks: 3, stem: "Identify the type of each error.", template: "Error 1: {{blank:e1}}. Error 2: {{blank:e2}}. Error 3: {{blank:e3}}.", blanks: [["unequal amounts", "e1"], ["one-sided entry", "e2"], ["omission", "e3"]].map(([a, id]) => ({ id, accepted: [a], choices: ["unequal amounts", "one-sided entry", "omission", "principle", "commission"] })), explanation: "1 unequal debit and credit amounts; 2 one-sided entry; 3 omission (so the trial balance is unaffected)." }),
        P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct the three errors. Narratives are required.", points: ["Dr Customer 90, Cr Suspense 90", "Dr Insurance 570, Cr Suspense 570", "Dr Bank 800, Cr Rent received 800", "Narratives given for all three entries"], modelAnswer: j, explanation: "Errors 1 and 2 are corrected through suspense; error 3 is not." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: corrProfit, wrong: [draftProfit - e.ins - e.rent, draftProfit], stem: "Calculate the corrected profit for the year.", explanation: "Insurance is an expense: −570. Rent received is income: +800. 27,400 − 570 + 800 = 27,630. Error 1 does not change profit." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: corrWC, wrong: [draftWC + e.rent, draftWC], stem: "Calculate the corrected working capital.", explanation: "Trade receivables +90 and bank +800: 15,900 + 90 + 800 = 16,790." }),
        P.manual({ label: "(f)", marks: 2, stem: "The accountant says: \"Now that the suspense account has been cleared, the books are free of errors.\" Evaluate this statement.", points: ["Clearing suspense shows that the errors which upset the trial balance have been found", "Errors that do not affect the trial balance (omission, principle, compensating) may remain, so the books may still contain errors"], modelAnswer: "A cleared suspense account shows that the errors that upset the trial balance have been found. However, omissions, errors of principle and compensating errors do not affect the trial balance, so the books may still contain errors.", explanation: "The trial balance has limitations." }),
      ]),
      hints: ["Credits are higher than debits, so which side is the suspense account on?", "Error 3 does not affect the trial balance."],
      explanation: "This Cambridge Paper 2 style question tests the opening and clearing of a suspense account and the effect of corrections on profit and working capital.",
    });
  }

  // =====================================================================================================
  // CAM_P2_SHORT 3: bank reconciliation, 30 June 2026
  {
    const r = { cb: 14860, chg: 126, dd: 480, dc: 1420, dish: 610, intr: 95, chq: 1840, chqBooked: 1380, unp: 3260, lodg: 2075 };
    const errAdj = r.chq - r.chqBooked; // cash book payment understated by 460 -> cash book balance too high
    const upd = chk(r.cb - r.chg - r.dd + r.dc - r.dish + r.intr - errAdj, 14699);
    const stmt = chk(upd - r.lodg + r.unp, 15884);
    const profitEffect = chk(-r.chg - r.dd + r.intr, -511);
    const recMd = statement("Bank reconciliation statement at 30 June 2026", [
      ["Balance per bank statement", stmt],
      ["Add outstanding lodgement", r.lodg],
      ["Less unpresented cheques", -r.unp],
      ["Balance per updated cash book", upd],
    ], { cols: [U], checks: [["rec", stmt + r.lodg - r.unp, upd]] });
    b.struct({
      ...common, d: 4, skill: X.skill, secs: X.secs, concepts: ["aacc.verification.bank-reconciliation"],
      stem: `Rudo Traders in Gweru found that the balance in its cash book at 30 June 2026 was ${money(r.cb)}, while the bank statement showed ${money(stmt)}. The following were identified:\n\n1. Bank charges of ${money(r.chg)} not yet in the cash book.\n2. A direct debit of ${money(r.dd)} for insurance, not yet in the cash book.\n3. A direct credit of ${money(r.dc)} from a customer, not yet in the cash book.\n4. A customer's cheque for ${money(r.dish)}, dishonoured and not yet in the cash book.\n5. Interest of ${money(r.intr)} credited by the bank, not yet in the cash book.\n6. A cheque to a supplier for ${money(r.chq)} was entered in the cash book as ${money(r.chqBooked)}.\n7. Cheques of ${money(r.unp)} written but not yet presented.\n8. A deposit of ${money(r.lodg)} not yet credited by the bank.`,
      parts: checkExam(X, [
        P.fib({ label: "(a)", marks: 3, stem: "State whether each item requires an entry in the cash book.", template: "Bank charges: {{blank:a}}. Unpresented cheques: {{blank:b}}. Direct credit from a customer: {{blank:c}}.", blanks: [["yes", "a"], ["no", "b"], ["yes", "c"]].map(([a, id]) => ({ id, accepted: [a], choices: ["yes", "no"] })), explanation: "Items first recorded by the bank must be entered in the cash book. Unpresented cheques are already in it." }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: upd, wrong: [r.cb, r2(r.cb - r.chg - r.dd + r.dc - r.dish + r.intr + errAdj)], stem: "Calculate the balance in the updated cash book.", explanation: "14,860 − 126 − 480 + 1,420 − 610 + 95 − 460 = 14,699. The payment was understated by 460 (1,840 − 1,380), so the balance is reduced by 460." }),
        P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a bank reconciliation statement at 30 June 2026, starting with the balance on the bank statement.", points: ["Starts with the bank statement balance 15,884", "Adds the outstanding lodgement 2,075", "Deducts the unpresented cheques 3,260", "Ends with the updated cash book balance 14,699"], modelAnswer: recMd, explanation: "The reconciliation ends with the updated cash book balance." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: Math.abs(profitEffect), wrong: [r.chg + r.dd, r2(r.chg + r.dd + r.intr)], stem: "Calculate by how much profit for the year decreases as a result of the items entered in the cash book (items 1 to 6).", explanation: "Bank charges 126 and insurance 480 are expenses; interest received 95 is income. Net decrease = 126 + 480 − 95 = 511. The other items affect receivables, payables and bank only." }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which figure is shown as the bank balance in the statement of financial position?", options: [["The balance in the updated cash book", "Correct: it includes all the business's transactions."], ["The balance on the bank statement", "It excludes unpresented cheques and the outstanding lodgement."], ["The cash book balance before updating", "It excludes charges, direct debits and other items."], ["The difference between the two balances", "The difference is explained in the reconciliation."]], answer: "A", explanation: "The updated cash book balance is used." }),
        P.manual({ label: "(f)", marks: 2, stem: "Advise Rudo Traders whether to prepare a bank reconciliation statement every month. Justify your answer.", points: ["Yes: errors, unauthorised payments or fraud are found early, and the true bank balance is known", "Limitation: it takes time and does not find errors that appear in both records, but the benefit outweighs the cost"], modelAnswer: "A monthly reconciliation finds errors and unauthorised payments early and shows the true bank balance. It takes time and does not find errors in both records, but the benefits outweigh the cost.", explanation: "A benefit, a limitation and a conclusion." }),
      ]),
      hints: ["Items first recorded by the bank update the cash book.", "Work out the effect of the cash book error before finding the updated balance."],
      explanation: "This Cambridge Paper 2 style question tests the updated cash book, the bank reconciliation statement and the effect on profit.",
    });
  }

  // =====================================================================================================
  // CAM_P2_Q1: sole trader statements with depreciation, error correction and inventory valuation (30 marks), year end 30 June 2026
  {
    const Q = EXAM.CAM_P2_Q1;
    const dr = [
      ["Premises", 84000], ["Equipment at cost", 52400], ["Motor vehicles at cost", 28000], ["Inventory at 1 July 2025", 11350], ["Purchases", 176420],
      ["Returns inwards", 1970], ["Carriage inwards", 2260], ["Wages", 28750], ["Rent and rates", 8930], ["General expenses", 9840], ["Trade receivables", 15260], ["Bank", 4830], ["Drawings", 12450],
    ];
    const crOther = [["Sales", 284590], ["Returns outwards", 2470], ["Trade payables", 13180], ["Provision for depreciation: equipment", 14300], ["Provision for depreciation: motor vehicles", 9800], ["Loan from DevBank", 18000]];
    const drTot = sum(dr.map((x) => x[1]));
    const capital = r2(drTot - sum(crOther.map((x) => x[1])));
    chk(capital, 94120);
    const err = { rent: 960, over: 380, eq: 3200, closeCost: 15600, dmgCost: 2150, dmgNrv: 1250 };
    const suspense = chk(err.rent - err.over, 580);
    const draftRows = [
      ["Premises", 84000, null], ["Equipment at cost", 52400 - err.eq, null], ["Motor vehicles at cost", 28000, null], ["Inventory at 1 July 2025", 11350, null], ["Purchases", 176420 + err.eq + err.over, null],
      ["Returns inwards", 1970, null], ["Carriage inwards", 2260, null], ["Wages", 28750, null], ["Rent and rates", 8930 - err.rent, null], ["General expenses", 9840, null], ["Trade receivables", 15260, null], ["Bank", 4830, null], ["Drawings", 12450, null],
      ["Suspense", suspense, null],
      ["Sales", null, 284590], ["Returns outwards", null, 2470], ["Trade payables", null, 13180], ["Provision for depreciation: equipment", null, 14300], ["Provision for depreciation: motor vehicles", null, 9800], ["Loan from DevBank", null, 18000], ["Capital at 1 July 2025", null, capital],
    ];
    const tb = trialBalance("Tendai Hardware: trial balance at 30 June 2026", draftRows);
    // workings (corrected figures)
    const depEq = chk((52400 - err.eq) * 0.1 + err.eq * 0.1 * (9 / 12), 5160);
    const depVeh = chk((28000 - 9800) * 0.25, 4550);
    const writeDown = err.dmgCost - err.dmgNrv;
    const closingInv = chk(err.closeCost - writeDown, 14700);
    const revenue = 284590 - 1970;
    const cos = chk(11350 + 176420 + 2260 - 2470 - closingInv, 172860);
    const gp = chk(revenue - cos, 109760);
    const expenses = 28750 + 8930 + 9840 + depEq + depVeh;
    const pfy = chk(gp - expenses, 52530);
    const eqCost = 52400, eqAcc = 14300 + depEq, vehCost = 28000, vehAcc = 9800 + depVeh;
    const nca = chk(84000 + (eqCost - eqAcc) + (vehCost - vehAcc), 130590);
    const ca = chk(closingInv + 15260 + 4830, 34790);
    const capClose = chk(capital + pfy - 12450, 134200);
    check("SoFP balances", nca + ca, capClose + 18000 + 13180);
    const margin = ratios.grossMargin(gp, revenue);
    const j = journal([
      { date: "1", lines: [["Rent and rates", err.rent, null], ["Suspense", null, err.rent]], narrative: "Rent paid by cheque credited to bank but not debited to rent" },
      { date: "2", lines: [["Suspense", err.over, null], ["Purchases", null, err.over]], narrative: "Purchases account overcast by 380" },
      { date: "3", lines: [["Equipment at cost", err.eq, null], ["Purchases", null, err.eq]], narrative: "Equipment bought on 1 October 2025 wrongly debited to purchases" },
    ]);
    const sopl = statement("Tendai Hardware: statement of profit or loss for the year ended 30 June 2026", [
      ["Revenue (284,590 − 1,970)", null, revenue],
      ["Opening inventory", 11350, null],
      ["Purchases", 176420, null],
      ["Carriage inwards", 2260, null],
      ["Returns outwards", -2470, null],
      ["Closing inventory", -closingInv, null],
      ["Cost of sales", null, -cos],
      ["Gross profit", null, gp],
      ["Wages", 28750, null],
      ["Rent and rates", 8930, null],
      ["General expenses", 9840, null],
      ["Depreciation: equipment", depEq, null],
      ["Depreciation: motor vehicles", depVeh, null],
      ["Total expenses", null, -expenses],
      ["Profit for the year", null, pfy],
    ], { cols: [U, U], checks: [["cos", 11350 + 176420 + 2260 - 2470 - closingInv, cos], ["gp", revenue - cos, gp], ["pfy", gp - expenses, pfy]] });
    const sofp = statement("Tendai Hardware: statement of financial position at 30 June 2026", [
      ["Non-current assets", null, null, null],
      ["Premises", 84000, 0, 84000],
      ["Equipment", eqCost, eqAcc, eqCost - eqAcc],
      ["Motor vehicles", vehCost, vehAcc, vehCost - vehAcc],
      ["Total non-current assets", null, null, nca],
      ["Current assets", null, null, null],
      ["Inventory", null, null, closingInv],
      ["Trade receivables", null, null, 15260],
      ["Bank", null, null, 4830],
      ["Total current assets", null, null, ca],
      ["Total assets", null, null, nca + ca],
      ["Equity: capital at 1 July 2025", null, null, capital],
      ["Add profit for the year", null, null, pfy],
      ["Less drawings", null, null, -12450],
      ["Capital at 30 June 2026", null, null, capClose],
      ["Non-current liability: loan", null, null, 18000],
      ["Current liability: trade payables", null, null, 13180],
      ["Total equity and liabilities", null, null, capClose + 18000 + 13180],
    ], { cols: ["Cost US\\$", "Depreciation US\\$", "Carrying amount US\\$"], checks: [["sofp", nca + ca, capClose + 18000 + 13180]] });
    b.struct({
      ...common, d: 5, skill: Q.skill, secs: Q.secs, applies: Q.applies,
      concepts: ["aacc.ledger.depreciation", "aacc.valuation.inventory", "aacc.verification.errors", "aacc.verification.suspense", "aacc.ledger.trial-balance"],
      stem: `Tendai Hardware is a sole trader in Harare with a year end of 30 June. The draft trial balance at 30 June 2026 is shown below. The difference was placed in a suspense account.\n\n${tb.md}\n\n**Notes**\n\n1. Errors found:\n   - rent of ${money(err.rent)} paid by cheque was credited to the bank account but no debit entry was made;\n   - the purchases account was overcast by ${money(err.over)};\n   - equipment costing ${money(err.eq)} bought on 1 October 2025 was debited to the purchases account.\n2. Depreciation for the year: equipment 10% per annum on cost, straight line, on a monthly basis; motor vehicles 25% per annum on the reducing balance (carrying amount at the start of the year). The provisions shown in the trial balance are the accumulated depreciation at 1 July 2025.\n3. Closing inventory was counted at cost of ${money(err.closeCost)}. This includes damaged goods that cost ${money(err.dmgCost)} and can be sold for ${money(err.dmgNrv)} after repair.`,
      parts: checkExam(Q, [
        P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct the three errors in note 1 and clear the suspense account. Narratives are required.", points: ["Dr Rent and rates 960, Cr Suspense 960", "Dr Suspense 380, Cr Purchases 380", "Dr Equipment 3,200, Cr Purchases 3,200", "Narratives given and the suspense account clears to nil"], modelAnswer: j, explanation: "Errors 1 and 2 are corrected through suspense; error 3 is an error of principle." }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: depEq, wrong: [4920, r2(52400 * 0.1)], stem: "the depreciation charge for equipment for the year", explanation: "10% × 49,200 = 4,920, plus 10% × 3,200 × 9/12 = 240: total 5,160." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: depVeh, wrong: [7000], stem: "the depreciation charge for motor vehicles for the year", explanation: "25% × (28,000 − 9,800) = 4,550." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: closingInv, wrong: [err.closeCost, r2(err.closeCost + writeDown)], stem: "the value of closing inventory at 30 June 2026", explanation: "Damaged goods are valued at the lower of cost (2,150) and net realisable value (1,250): write down 900. 15,600 − 900 = 14,700." }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate, for the year ended 30 June 2026:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: cos, wrong: [r2(cos + 2470 + 2470), r2(11350 + 176420 + err.eq + err.over + 2260 - 2470 - closingInv)], stem: "cost of sales", explanation: "11,350 + 176,420 + 2,260 − 2,470 − 14,700 = 172,860 (purchases are corrected to 176,420)." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: gp, wrong: [r2(284590 - cos)], stem: "gross profit", explanation: "Revenue 282,620 − 172,860 = 109,760." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: pfy, wrong: [r2(gp - 28750 - 8930 - 9840)], stem: "profit for the year", explanation: "Expenses 28,750 + 8,930 + 9,840 + 5,160 + 4,550 = 57,230. 109,760 − 57,230 = 52,530." }),
        ] }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss of Tendai Hardware for the year ended 30 June 2026, showing the calculation of cost of sales.", points: ["Heading with business name, statement and date; revenue after returns inwards 282,620", "Cost of sales calculation including carriage inwards and returns outwards", "Gross profit and the expenses including both depreciation charges (own figures)", "Total expenses and profit for the year"], modelAnswer: sopl, explanation: "The corrected figures are used throughout." }),
        P.group({ label: "(e)", stem: "At 30 June 2026:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: nca, wrong: [r2(nca + depEq + depVeh)], stem: "calculate the total carrying amount of non-current assets", explanation: "Premises 84,000 + equipment (52,400 − 19,460 = 32,940) + vehicles (28,000 − 14,350 = 13,650) = 130,590." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: ca, wrong: [r2(ca + writeDown)], stem: "calculate total current assets", explanation: "14,700 + 15,260 + 4,830 = 34,790." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: capClose, wrong: [r2(capital + pfy)], stem: "calculate the capital of the owner", explanation: `Opening capital ${fmt(capital)} + profit 52,530 − drawings 12,450 = ${fmt(capClose)}.` }),
          P.manual({ label: "(iv)", marks: 3, type: "EXTENDED_RESPONSE", stem: "prepare the statement of financial position", points: ["Heading and non-current assets with cost, accumulated depreciation and carrying amount (own figures)", "Current assets, with inventory at the lower of cost and net realisable value", "Equity with profit and drawings, the loan and trade payables; totals agree"], modelAnswer: sofp, explanation: `The statement balances at ${fmt(nca + ca)}.` }),
        ] }),
        P.group({ label: "(f)", stem: "Analysis", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", dp: 1, value: margin, wrong: [(gp / 284590) * 100], stem: "Calculate the gross profit margin for the year, to one decimal place.", explanation: "Gross profit 109,760 ÷ revenue 282,620 × 100 = 38.8%." }),
          P.manual({ label: "(ii)", marks: 3, stem: "Tendai suggests valuing the damaged goods at cost to keep profit higher. Advise him, justifying your answer.", points: ["Inventory must be valued at the lower of cost and net realisable value (IAS 2)", "Valuing the damaged goods at cost would overstate inventory and profit by 900", "Recommend writing the goods down; prudence and a fair view"], modelAnswer: "He should not value the goods at cost. IAS 2 requires inventory to be valued at the lower of cost and net realisable value, so the damaged goods are valued at 1,250. Using cost would overstate inventory and profit by 900 and would break the prudence concept, so the write-down should be made.", explanation: "The recommendation is supported by the standard and the amount involved." }),
        ] }),
      ]),
      hints: ["Opening suspense is a debit; each correction clears part of it.", "Cost of sales uses the corrected purchases figure and the corrected closing inventory.", "Capital at the year end = opening capital + profit − drawings."],
      explanation: "This Cambridge Paper 2 style question combines error correction through suspense, depreciation, inventory valuation, the financial statements and an advice part.",
    });
  }
});
