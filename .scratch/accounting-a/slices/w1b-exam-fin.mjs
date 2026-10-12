// W1b exam-format items: FIN25 x2 (25 marks, ANALYSIS): (1) ZIMSEC: control accounts and personal ledger reconciliation;
// (2) both boards: corrected statement of profit or loss and financial position.
import { concept, P, EXAM, checkExam, ZIM, money, fmt, check, chk, r2, sum, rd, table, tAccount, statement, journal, ratios } from "../lib.mjs";
import { U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.control-accounts", { file: "exam/w1b-fin", keyPrefix: "exam.w1b-fin" }, (b) => {
  const F = EXAM.FIN25;

  // =====================================================================================================
  // Item 1 (ZIMSEC): control accounts and reconciliation of the debtors list
  {
    const d = { open: 41270, cs: 436900, rec: 409350, disc: 7830, ret: 9640, bad: 2260, dish: 1390, contra: 3570 };
    const dClose = chk(d.open + d.cs + d.dish - d.rec - d.disc - d.ret - d.bad - d.contra, 46910);
    const c = { open: 27540, paid: 281730, disc: 4980, ret: 5720, contra: 3570, close: 29860 };
    const purchases = chk(c.close - c.open + c.paid + c.disc + c.ret + c.contra, 298320);
    const x = { over: 1100, discAllowed: 330, omitted: 1860 };
    const ctlCorr = chk(dClose - x.over, 45810);
    const listDraft = 44610;
    const listCorr = chk(listDraft - 2 * x.discAllowed + x.omitted, 45810);
    const csCorr = d.cs - x.over;
    const dcp = (ctlCorr / csCorr) * 365;
    const cpp = (c.close / purchases) * 365;
    chk(Math.round(dcp), 38); chk(Math.round(cpp), 37);
    const dca = tAccount("Debtors ledger control account for the year ended 30 June 2026",
      [["1 Jul 2025", "Balance b/d", d.open], ["30 Jun 2026", "Credit sales", d.cs], ["30 Jun 2026", "Bank: dishonoured cheque", d.dish]],
      [["30 Jun 2026", "Bank and cash received", d.rec], ["30 Jun 2026", "Discount allowed", d.disc], ["30 Jun 2026", "Returns inwards", d.ret], ["30 Jun 2026", "Bad debts", d.bad], ["30 Jun 2026", "Creditors ledger control (contra)", d.contra]],
      { cdDate: "30 Jun 2026", bdDate: "1 Jul 2026" });
    const rec = statement("Reconciliation of the debtors ledger at 30 June 2026", [
      ["Balance per debtors ledger control account", dClose],
      ["Less sales day book overcast", -x.over],
      ["Corrected control account balance", ctlCorr],
      null,
      ["Total of the list of debtors' balances", listDraft],
      ["Less discount allowed of 330 debited to a debtor instead of credited (2 × 330)", -2 * x.discAllowed],
      ["Add debtor's balance omitted from the list", x.omitted],
      ["Corrected total of the list", listCorr],
    ], { cols: [U], checks: [["agree", ctlCorr, listCorr]] });
    b.struct({
      d: 5, examStyle: true, skill: F.skill, secs: F.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Paper 3", concepts: ["aacc.verification.control-accounts"],
      stem: `Masvingo Wholesalers keeps a debtors ledger control account and a creditors ledger control account. Its financial year ends on 30 June 2026. The totals for the year were:\n\n${table(["Debtors ledger", U], [["Debtors at 1 July 2025", d.open], ["Credit sales (per sales day book)", d.cs], ["Cheques and cash received from debtors", d.rec], ["Discount allowed", d.disc], ["Returns inwards", d.ret], ["Bad debts written off", d.bad], ["Cheque from a debtor dishonoured", d.dish], ["Contra with the creditors ledger", d.contra]])}\n\n${table(["Creditors ledger", U], [["Creditors at 1 July 2025", c.open], ["Payments to creditors", c.paid], ["Discount received", c.disc], ["Returns outwards", c.ret], ["Contra with the debtors ledger", c.contra], ["Creditors at 30 June 2026 (per list of balances, agreed)", c.close]])}\n\nThe total of the list of debtors' balances at 30 June 2026 was ${money(listDraft)}. The following errors were then found:\n\n1. The sales day book was overcast by ${money(x.over)}.\n2. A discount allowed of ${money(x.discAllowed)} was debited, instead of credited, to a debtor's account.\n3. A debtor's balance of ${money(x.omitted)} was left out of the list of balances.\n\nThe business allows its debtors 30 days to pay, and its creditors allow 45 days. Debtors collection period = debtors ÷ credit sales × 365. Creditors payment period = creditors ÷ credit purchases × 365. Use the corrected figures and give each answer to the nearest whole day.`,
      parts: checkExam(F, [
        P.group({ label: "(a)", stem: "Debtors ledger control account", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: dClose, wrong: [r2(dClose - d.dish), r2(dClose + 2 * d.contra)], stem: "Calculate the balance on the debtors ledger control account at 30 June 2026 before correcting any errors.", explanation: "41,270 + 436,900 + 1,390 − 409,350 − 7,830 − 9,640 − 2,260 − 3,570 = 46,910." }),
          P.manual({ label: "(ii)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the debtors ledger control account for the year ended 30 June 2026.", points: ["Debit: balance b/d, credit sales and the dishonoured cheque", "Credit: cheques and cash received, discount allowed and returns inwards", "Credit: bad debts and the contra entry", "Balance c/d 46,910, totals agreeing and balance b/d on 1 July 2026"], modelAnswer: dca, explanation: "Items that increase debtors are debited; items that reduce them are credited." }),
        ] }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: purchases, wrong: [r2(c.close - c.open + c.paid), r2(c.open + c.paid + c.disc + c.ret + c.contra - c.close)], stem: "Calculate the credit purchases for the year from the creditors ledger control account.", explanation: "Debits (payments 281,730, discount 4,980, returns 5,720, contra 3,570 and balance c/d 29,860) = 325,860. Credits: opening balance 27,540 plus purchases. Purchases = 325,860 − 27,540 = 298,320." }),
        P.group({ label: "(c)", stem: "Reconciliation", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: ctlCorr, wrong: [r2(dClose + x.over), dClose], stem: "Calculate the corrected balance on the debtors ledger control account.", explanation: "An overcast sales day book makes credit sales and the control balance too high: 46,910 − 1,100 = 45,810." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: listCorr, wrong: [r2(listDraft - x.discAllowed + x.omitted), r2(listDraft + x.omitted)], stem: "Calculate the corrected total of the list of debtors' balances.", explanation: "The discount was debited instead of credited, so the debtor's balance is too high by 2 × 330 = 660. The omitted balance adds 1,860. 44,610 − 660 + 1,860 = 45,810." }),
        ] }),
        P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare a statement reconciling the control account with the list of debtors' balances.", points: ["Corrected control account balance 45,810 (46,910 less the overcast 1,100)", "List of balances adjusted for the discount error (−660) and the omission (+1,860)", "Corrected list total 45,810 agreeing with the control account"], modelAnswer: rec, explanation: "Errors in totals adjust the control account; errors in personal accounts adjust the list." }),
        P.group({ label: "(e)", stem: "Calculate, using the corrected figures:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "days", value: dcp, wrong: [(dClose / d.cs) * 365, (d.open / d.cs) * 365], stem: "the debtors collection period", explanation: "Corrected credit sales 436,900 − 1,100 = 435,800. 45,810 ÷ 435,800 × 365 = 38.4, which is 38 days." }),
          P.num({ label: "(ii)", marks: 2, kind: "days", value: cpp, wrong: [(c.close / (purchases - c.ret)) * 365, (c.open / purchases) * 365], stem: "the creditors payment period", explanation: "29,860 ÷ 298,320 × 365 = 36.5, which is 37 days." }),
        ] }),
        P.manual({ label: "(f)", marks: 5, stem: "Evaluate the credit control and payment policies of Masvingo Wholesalers, using the figures calculated above, and advise the owner on **two** actions.", points: ["Debtors take about 38 days to pay against the 30 days allowed, so credit control is weak", "Creditors are paid in about 37 days, shorter than the 45 days allowed, so the business is not using all of its credit period", "The business is financing its debtors for longer than its creditors finance it, which reduces cash (working capital cycle)", "Action 1 with a reason, for example reminders, statements and a limit on late customers' credit", "Action 2 with a reason, for example paying suppliers nearer to 45 days to keep cash, while keeping discount received if it is worth more than the cost of waiting"], modelAnswer: "Debtors take about 38 days to pay although 30 days are allowed, so credit control is weak. Creditors are paid in 37 days although 45 are allowed, so the business is not using all of the credit available. The business therefore finances its debtors for longer than its creditors finance it, which reduces cash. The owner should send regular statements and chase late customers, and should pay suppliers nearer to 45 days, unless an early-payment discount is worth more than the cost of the cash.", explanation: "Compare each period with the term, explain the effect on cash and recommend actions." }),
      ]),
      hints: ["A contra entry is credited in the debtors control account.", "A discount debited instead of credited makes the balance too high by twice the discount.", "Use the corrected control balance and corrected credit sales in the ratio."],
      explanation: "This ZIMSEC Paper 3 style question prepares a control account, finds a missing figure, reconciles the personal ledger and analyses the credit periods.",
    });
  }

  // =====================================================================================================
  // Item 2 (both boards): corrected statement of profit or loss and financial position
  {
    const k = {
      rev: 203850, cos: 128940, wages: 26480, rent: 9420, ins: 3310, dep: 7150, gen: 8730,
      premises: 82000, mCost: 71500, mAcc: 21450, inv: 16820, rec: 24360, bank: 8490, pay: 19640, loan: 30000, draw: 13500,
      sold: 33600, soldAcc: 10080, sellMonths: 9, proc: 22300,
      chg: 165, dd: 420, dish: 780, dmgCost: 4160, dmgNrv: 2880, tools: 2350,
    };
    const gpD = k.rev - k.cos;
    const expD = k.wages + k.rent + k.ins + k.dep + k.gen;
    const pfyD = chk(gpD - expD, 19820);
    const caD = k.inv + k.rec + k.bank;
    const ncaD = k.premises + (k.mCost - k.mAcc);
    const assetsD = ncaD + caD;
    const equityD = assetsD - k.pay - k.loan;
    const capOpen = chk(equityD - pfyD + k.draw, 125760);
    // corrections
    const perYear = k.sold * 0.1;
    const accSold = chk(perYear * 2 + perYear * (k.sellMonths / 12), 9240);
    const revDep = chk(perYear - perYear * (k.sellMonths / 12), 840);
    const loss = chk(accSold === 0 ? 0 : (k.sold - accSold) - k.proc, 2060);
    const writeDown = chk(k.dmgCost - k.dmgNrv, 1280);
    const adj = [["Bank charges", -k.chg], ["Direct debit for insurance", -k.dd], ["Depreciation charged on the machine sold after 30 September (3,360 − 2,520)", revDep], ["Loss on disposal of the machine", -loss], ["Write-down of damaged inventory to net realisable value", -writeDown], ["Tools wrongly debited to purchases (reclassified as an asset)", k.tools]];
    const pfy = chk(pfyD + sum(adj.map((a) => a[1])), 19085);
    const gp = chk(gpD - writeDown + k.tools, 75980);
    const bank = chk(k.bank - k.chg - k.dd - k.dish + k.proc, 29425);
    const inv = k.inv - writeDown;
    const rec = k.rec + k.dish;
    const nca = chk(k.premises + (k.mCost - k.sold) - (k.mAcc - k.soldAcc) + k.tools, 110880);
    const ca = chk(inv + rec + bank, 70105);
    const assets = chk(nca + ca, 180985);
    const equity = chk(capOpen + pfy - k.draw, 131345);
    check("balance", assets, equity + k.pay + k.loan);
    const currentRatio = ratios.current(ca, k.pay);
    const margin = ratios.grossMargin(gp, k.rev);
    const profitMargin = ratios.profitMargin(pfy, k.rev);
    const rows = [["Draft profit for the year", pfyD], ...adj.map(([l, v]) => [l, v]), ["Corrected profit for the year", pfy]];
    const corrMd = statement("Kariba Fishing Supplies: statement of corrected profit for the year ended 31 December 2025", rows, { cols: [U], checks: [["pfy", pfyD + sum(adj.map((a) => a[1])), pfy]] });
    b.struct({
      d: 5, examStyle: true, skill: F.skill, secs: F.secs, calculator: true,
      paper: "ZIMSEC/Cambridge Paper 3",
      concepts: ["aacc.ledger.depreciation", "aacc.ledger.nca-disposal", "aacc.valuation.inventory", "aacc.verification.bank-reconciliation", "aacc.verification.errors"],
      stem: `Kariba Fishing Supplies is a sole trader. The draft statement of profit or loss (income statement) for the year ended 31 December 2025 and the draft statement of financial position at that date show:\n\n${table(["Draft figures", U], [["Revenue", k.rev], ["Cost of sales", k.cos], ["Gross profit", gpD], ["Expenses (wages, rent, insurance, general and depreciation)", expD], ["Profit for the year", pfyD], ["Premises at cost", k.premises], ["Machinery at cost", k.mCost], ["Accumulated depreciation on machinery", k.mAcc], ["Inventory (at cost)", k.inv], ["Trade receivables", k.rec], ["Bank", k.bank], ["Trade payables", k.pay], ["Loan (non-current)", k.loan], ["Drawings for the year", k.draw]])}\n\nThe owner's capital at 1 January 2025 was ${money(capOpen)}. The draft figures have not taken account of the following:\n\n1. The bank statement shows bank charges of ${money(k.chg)}, a direct debit of ${money(k.dd)} for insurance and a customer's cheque for ${money(k.dish)} that was dishonoured. None of these is in the cash book.\n2. A machine that cost ${money(k.sold)} was sold on 30 September 2025 for ${money(k.proc)}, which was paid into the bank. The sale has not been entered in the books, so the machine is still in the machinery account. Machinery is depreciated at 10% per annum on cost on a monthly basis; the draft depreciation of ${money(k.dep)} is a full year's charge on all machinery, which was all bought on 1 January 2023.\n3. Closing inventory includes damaged goods that cost ${money(k.dmgCost)} and can be sold for ${money(k.dmgNrv)}.\n4. Tools costing ${money(k.tools)} were bought on 1 December 2025 and debited to the purchases account. Ignore depreciation on the tools.`,
      parts: checkExam(F, [
        P.group({ label: "(a)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: accSold, wrong: [k.soldAcc, r2(perYear * 2)], stem: "the accumulated depreciation on the machine sold, up to the date of sale", explanation: "Two full years (2023 and 2024) at 3,360 = 6,720, plus 9 months of 2025: 3,360 × 9/12 = 2,520. Total 9,240." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: loss, wrong: [r2(k.sold - k.proc), r2(k.sold - k.soldAcc - k.proc)], stem: "the loss on disposal of the machine", explanation: "Carrying amount 33,600 − 9,240 = 24,360. Proceeds 22,300. Loss 2,060." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: writeDown, wrong: [k.dmgCost, k.dmgNrv], stem: "the write-down needed to value the damaged goods correctly", explanation: "The goods are valued at the lower of cost (4,160) and net realisable value (2,880): write-down 1,280." }),
        ] }),
        P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare a statement showing the corrected profit for the year, starting with the draft profit.", points: ["Starts with the draft profit 19,820 and shows each adjustment on a separate line", "Bank charges (165) and direct debit for insurance (420) deducted", "Depreciation overcharged on the machine sold added back (+840)", "Loss on disposal (2,060) and inventory write-down (1,280) deducted", "Tools reclassified (+2,350) and corrected profit 19,085"], modelAnswer: corrMd, explanation: "The dishonoured cheque affects receivables and bank, not profit." }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: pfy, wrong: [pfyD, r2(pfyD - sum(adj.map((a) => Math.abs(a[1]))))], stem: "State the corrected profit for the year.", explanation: "19,820 − 165 − 420 + 840 − 2,060 − 1,280 + 2,350 = 19,085." }),
        P.group({ label: "(d)", stem: "Calculate, after all the corrections:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: bank, wrong: [r2(k.bank + k.proc), r2(k.bank - k.chg - k.dd + k.proc)], stem: "the balance at the bank", explanation: "8,490 − 165 − 420 − 780 + 22,300 = 29,425." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: assets, wrong: [assetsD, r2(assets - k.tools)], stem: "total assets", explanation: "Non-current assets 110,880 (premises 82,000, machinery 26,530, tools 2,350) plus current assets 70,105 = 180,985." }),
          P.num({ label: "(iii)", marks: 2, kind: "ratio", dp: 2, value: currentRatio, wrong: [caD / k.pay, ca / k.pay + 1], stem: "the current ratio, as x : 1 to two decimal places (the answer is the value of x)", explanation: "Current assets 70,105 ÷ current liabilities 19,640 = 3.57." }),
          P.num({ label: "(iv)", marks: 1, kind: "pct", dp: 1, value: margin, wrong: [(gpD / k.rev) * 100], stem: "the gross profit margin, to one decimal place", explanation: "Gross profit 75,980 ÷ revenue 203,850 × 100 = 37.3%." }),
        ] }),
        P.manual({ label: "(e)", marks: 4, stem: "The owner says: \"The corrections show that my business is more liquid but less profitable than I thought.\" Evaluate this statement, using figures.", points: ["Profit for the year falls from 19,820 to 19,085, and the profit margin from 9.7% to 9.4%", "The current ratio rises from 2.53 to 3.57 because the sale proceeds increased the bank balance, so liquidity is better", "But the improvement in liquidity is partly a one-off from selling a machine, which is also a loss of productive capacity", "Conclusion: the statement is correct in direction, but the liquidity gain should not be assumed to continue"], modelAnswer: "The statement is correct in direction. Profit falls from 19,820 to 19,085 and the profit margin from 9.7% to 9.4%, mainly because of the loss on the machine and the inventory write-down. The current ratio rises from 2.53 to 3.57 because the sale proceeds increased the bank balance. However, this is a one-off gain from selling a machine, which also reduces the business's productive capacity, so the owner should not assume that the improved liquidity will continue.", explanation: "Use before-and-after figures, and note that the improvement in liquidity comes from a one-off." }),
      ]),
      hints: ["Remember that the machine's depreciation must stop at the date of sale.", "The dishonoured cheque reduces the bank balance and increases trade receivables.", "Work out the corrected profit before the statement of financial position."],
      explanation: "This Paper 3 style question corrects a draft set of accounts for a bank reconciliation, a disposal, an inventory write-down and an error, and asks for an evaluation.",
    });
  }
});
