// W2b: Cambridge 0452 Paper 2 exam-format items (20 marks): (1) sales and purchases ledger control accounts with
// evaluation of digital recording; (2) suspense account, corrected profit and statement of financial position effects.
import { concept, P, money, journal, sum, r2, check, CAM } from "../lib.mjs";
import { table, suspense, control, correctedProfit } from "../tables/w2b-lib.mjs";

concept("acc.verification.sales-ledger-control", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Item 1: Thandeka Moyo, Mutare: control accounts
  const data = [
    ["Sales ledger: debit balances, 1 October 2024", 11380],
    ["Sales ledger: credit balances, 1 October 2024", 236],
    ["Purchases ledger: credit balances, 1 October 2024", 8715],
    ["Purchases ledger: debit balances, 1 October 2024", 164],
    ["Credit sales", 67425],
    ["Cash sales", 9850],
    ["Credit purchases", 49380],
    ["Receipts from credit customers", 63970],
    ["Payments to credit suppliers", 47215],
    ["Discount allowed", 1285],
    ["Discount received", 960],
    ["Returns inwards", 1745],
    ["Returns outwards", 1190],
    ["Irrecoverable debts written off", 870],
    ["Increase in allowance for irrecoverable debts", 340],
    ["Dishonoured cheques", 1065],
    ["Interest charged to customers on overdue accounts", 87],
    ["Refund received from a supplier with a debit balance", 164],
    ["Contra: sales ledger balance set off against purchases ledger", 615],
    ["Sales ledger: credit balances, 30 September 2025", 198],
    ["Purchases ledger: debit balances, 30 September 2025", 72],
  ];
  const v = Object.fromEntries(data.map(([k, x]) => [k, x]));
  const sl = control("Sales ledger control account", [["1 Oct", "Balance b/d", 11380], ["30 Sep", "Sales", 67425], ["30 Sep", "Bank (dishonoured cheques)", 1065], ["30 Sep", "Interest on overdue accounts", 87]], [["1 Oct", "Balance b/d", 236], ["30 Sep", "Bank", 63970], ["30 Sep", "Discount allowed", 1285], ["30 Sep", "Returns inwards", 1745], ["30 Sep", "Irrecoverable debts", 870], ["30 Sep", "Purchases ledger control (contra)", 615]], { crBalance: 198, cdDate: "30 Sep", bdDate: "1 Oct" });
  const pl = control("Purchases ledger control account", [["1 Oct", "Balance b/d", 164], ["30 Sep", "Bank", 47215], ["30 Sep", "Discount received", 960], ["30 Sep", "Returns outwards", 1190], ["30 Sep", "Sales ledger control (contra)", 615]], [["1 Oct", "Balance b/d", 8715], ["30 Sep", "Purchases", 49380], ["30 Sep", "Bank (refund)", 164]], { drBalance: 72, cdDate: "30 Sep", bdDate: "1 Oct" });
  check("sl", sl.drBalance, sum([11380, 67425, 1065, 87, 198]) - sum([236, 63970, 1285, 1745, 870, 615]));
  check("pl", pl.crBalance, sum([8715, 49380, 164, 72]) - sum([164, 47215, 960, 1190, 615]));
  check("v", v["Credit sales"], 67425);
  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.verification.sales-ledger-control", "acc.verification.purchases-ledger-control"],
    stem: "Thandeka Moyo owns a wholesale business in Mutare and keeps sales ledger and purchases ledger control accounts. Her records for the year ended 30 September 2025 showed:\n\n" + table(["Item", "US\\$"], data),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which item is **not** entered in either control account?",
        options: [["Increase in allowance for irrecoverable debts", "Correct: no customer's account is changed by an allowance."], ["Irrecoverable debts written off", "These reduce customers' balances: credit in the sales ledger control account."], ["Refund received from a supplier with a debit balance", "This cancels a supplier's debit balance: credit in the purchases ledger control account."], ["Interest charged to customers on overdue accounts", "This increases what customers owe: debit in the sales ledger control account."]],
        answer: "A", explanation: "The allowance is an estimate in its own account; cash sales are also excluded.",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: sl.drBalance, wrong: [r2(sl.drBalance + 9850), r2(sl.drBalance - 198), r2(sl.drBalance - 340)], stem: "Calculate the closing debit balance of the sales ledger control account at 30 September 2025.", explanation: `Debit side: 11,380 + 67,425 + 1,065 + 87 + 198 (credit balances c/d) = ${sum([11380, 67425, 1065, 87, 198]).toLocaleString("en-GB")}. Credit items: 236 + 63,970 + 1,285 + 1,745 + 870 + 615 = ${sum([236, 63970, 1285, 1745, 870, 615]).toLocaleString("en-GB")}. Closing debit balance ${sl.drBalance.toLocaleString("en-GB")}. Cash sales and the allowance are excluded.` }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: pl.crBalance, wrong: [r2(pl.crBalance - 72), r2(pl.crBalance + 2 * 615)], stem: "Calculate the closing credit balance of the purchases ledger control account at 30 September 2025.", explanation: `Credit side: 8,715 + 49,380 + 164 (refund) + 72 (debit balances c/d) = ${sum([8715, 49380, 164, 72]).toLocaleString("en-GB")}. Debit items: 164 + 47,215 + 960 + 1,190 + 615 = ${sum([164, 47215, 960, 1190, 615]).toLocaleString("en-GB")}. Closing credit balance ${pl.crBalance.toLocaleString("en-GB")}.` }),
      P.fib({
        label: "(d)", stem: "Complete the statements about the contra.",
        template: "The contra is entered on the {{blank:a}} side of the sales ledger control account and on the {{blank:b}} side of the purchases ledger control account. Its source is the {{blank:c}}.",
        blanks: [{ id: "a", accepted: ["credit"], choices: ["debit", "credit"] }, { id: "b", accepted: ["debit"], choices: ["debit", "credit"] }, { id: "c", accepted: ["general journal"], choices: ["general journal", "cash book", "sales journal", "purchases journal"] }],
        explanation: "The customer owes less (credit sales ledger control) and Thandeka owes the same person less (debit purchases ledger control). Transfers between ledgers are recorded in the general journal.",
      }),
      P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the sales ledger control account for the year ended 30 September 2025, bringing down both balances on 1 October 2025.", points: ["Opening balances 11,380 (debit) and 236 (credit)", "Sales 67,425, dishonoured cheques 1,065 and interest 87 on the debit side", "Bank 63,970, discount allowed 1,285 and returns inwards 1,745 on the credit side", "Irrecoverable debts 870 and contra 615 on the credit side", `Balances c/d 198 (debit side) and ${sl.drBalance.toLocaleString("en-GB")} (credit side); equal totals; both brought down`], modelAnswer: sl.md, explanation: "Cash sales and the allowance are excluded." }),
      P.manual({ label: "(f)", marks: 4, stem: "Thandeka is considering accounting software that would update each customer's account and the sales ledger control account automatically from every entry. Evaluate whether she should still keep a separate manual control account.", points: ["Benefit of software: control account always up to date / totals instantly available / no arithmetical posting errors", "Limitation: input errors (wrong amount or customer, missed invoice) appear in both records, so the control account no longer reveals them / reliance on the system", "Further consideration: cost of the software and training / need for passwords, access controls and backups to replace the division of duties", "Justified conclusion, e.g. a separate manual control account is not needed, but she should check customers' statements and use access controls instead"], modelAnswer: "Software would keep the control account and the customers' accounts in agreement automatically and give her an up-to-date total at any time. However, if an invoice is keyed in wrongly, both records are wrong, so the control account would not reveal it. A separate manual account would add work but no real check; she should instead review customer statements regularly and restrict who can post entries.", explanation: "Evaluation needs both sides and a conclusion." }),
    ],
    hints: ["Cross out cash sales and the allowance first.", "Closing credit balances in the sales ledger are carried down on the debit side."],
    explanation: "This item tests sales and purchases ledger control accounts with debit and credit balances, and evaluating digital recording.",
  });
  check("item1 marks", 1 + 3 + 4 + 3 + 5 + 4, 20);

  // ---------------------------------------------------------------------------------------------------------------
  // Item 2: Nyasha Gwatidzo, Harare electrical shop: suspense, corrected profit, SOFP items
  const draft = 24875;
  const errs = [
    { t: "The purchases journal was overcast by US\\$2,000.", j: [["Suspense", 2000, null], ["Purchases", null, 2000]], p: ["Purchases overcast", 2000] },
    { t: "Carriage outwards of US\\$318, paid by bank, had not been posted to the carriage outwards account.", j: [["Carriage outwards", 318, null], ["Suspense", null, 318]], p: ["Carriage outwards not recorded", -318] },
    { t: "Rent received of US\\$950 had been debited in the bank account and also debited to the rent received account.", j: [["Suspense", 1900, null], ["Rent received", null, 1900]], p: ["Rent received", 1900] },
    { t: "A credit sale of US\\$1,476 to Gwenzi had been entered in the sales journal as US\\$1,467.", j: [["Gwenzi", 9, null], ["Sales", null, 9]], p: ["Sales understated", 9] },
    { t: "A payment of US\\$2,830 to Zindoga, a supplier, had been entered in the bank account but not in Zindoga's account.", j: [["Zindoga", 2830, null], ["Suspense", null, 2830]], p: null },
  ];
  const sDr = errs.flatMap((e) => e.j.filter((l) => l[0] === "Suspense" && l[1]).map((l) => ["30 Apr", e.j.find((x) => x[0] !== "Suspense")[0], l[1]]));
  const sCr = errs.flatMap((e) => e.j.filter((l) => l[0] === "Suspense" && l[2]).map((l) => ["30 Apr", e.j.find((x) => x[0] !== "Suspense")[0], l[2]]));
  const diff = r2(sum(sDr.map((x) => x[2])) - sum(sCr.map((x) => x[2])));
  check("diff", diff, 752);
  const sMd = suspense("Suspense account", sDr, [["30 Apr", "Trial balance difference", diff], ...sCr]);
  const jMd = journal(errs.map((e) => ({ date: "30 Apr", lines: e.j })));
  const cp = correctedProfit("Nyasha Gwatidzo: Statement of corrected profit for the year ended 30 April 2025", draft, errs.filter((e) => e.p).map((e) => e.p));
  check("cp", cp.corrected, 28466);
  const pay = r2(6415 - 2830);
  const rec = r2(5120 + 9);
  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
    concepts: ["acc.verification.suspense-account", "acc.verification.correcting-errors", "acc.verification.errors-effect-on-profit", "acc.verification.trial-balance"],
    stem: `Nyasha Gwatidzo owns an electrical shop in Harare. Her trial balance at 30 April 2025 did not agree, so she opened a suspense account. Her draft statement of profit or loss showed a profit for the year of ${money(draft)}, and her draft statement of financial position showed trade receivables of US\\$5,120 and trade payables of US\\$6,415. The following errors were then discovered:\n\n` + table(["No.", "Error"], errs.map((e, i) => [String(i + 1), e.t])),
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: diff, wrong: [r2(diff + 950), r2(2000 + 1900 + 318 + 2830)], stem: "Calculate the trial balance difference entered in the suspense account.", explanation: `Error 4 (an error of original entry) does not affect suspense. Suspense debits needed: 2,000 + 1,900 = 3,900. Suspense credits needed: 318 + 2,830 = 3,148. The opening entry is a credit of 3,900 − 3,148 = ${diff}, so the debit total of the trial balance was the larger.` }),
      P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries to correct errors 1 to 5. Narratives are not required.", points: ["Error 1: debit suspense 2,000; credit purchases 2,000", "Error 2: debit carriage outwards 318; credit suspense 318", "Error 3: debit suspense 1,900; credit rent received 1,900", "Error 4: debit Gwenzi 9; credit sales 9", "Error 5: debit Zindoga 2,830; credit suspense 2,830"], modelAnswer: jMd, explanation: "Error 4 does not involve suspense." }),
      P.manual({ label: "(c)", marks: 2, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account.", points: [`Trial balance difference ${diff} and carriage outwards 318 and Zindoga 2,830 on the credit side`, "Purchases 2,000 and rent received 1,900 on the debit side; totals 3,900 each; account clears"], modelAnswer: sMd, explanation: "The account clears to nil." }),
      P.num({ label: "(d)", marks: 5, kind: "money", value: cp.corrected, wrong: [r2(cp.corrected - 950), r2(draft - 2000 - 318 + 1900 + 9)], stem: "Calculate the corrected profit for the year ended 30 April 2025.", explanation: `24,875 + 2,000 (purchases overcast) − 318 (carriage outwards) + 1,900 (rent received) + 9 (sales) = ${cp.corrected.toLocaleString("en-GB")}. Error 5 does not affect profit.` }),
      P.fib({
        label: "(e)", stem: "Complete the corrected figures for the statement of financial position at 30 April 2025 (numbers only).",
        template: "Corrected trade payables: US\\$ {{blank:a}}. Corrected trade receivables: US\\$ {{blank:b}}.",
        blanks: [{ id: "a", accepted: [String(pay), pay.toLocaleString("en-GB")], wrong: String(r2(6415 + 2830)) }, { id: "b", accepted: [String(rec), rec.toLocaleString("en-GB")], wrong: String(r2(5120 - 9)) }],
        explanation: `The payment to Zindoga reduces what is owed: 6,415 − 2,830 = ${pay.toLocaleString("en-GB")}. Gwenzi owes 9 more: 5,120 + 9 = ${rec.toLocaleString("en-GB")}.`,
      }),
      P.manual({ label: "(f)", marks: 3, stem: "Nyasha plans to take extra drawings of US\\$3,000 because the corrected profit is higher than the draft. Advise her whether this is wise.", points: ["The higher profit is largely from correcting errors (e.g. overcast purchases), not extra cash; part of the increase (rent received) is not new money", "Correcting error 5 shows more cash was already paid to suppliers; drawings would reduce the bank balance / working capital further", "Justified recommendation, e.g. check the bank balance and liquidity before taking drawings / take a smaller amount"], modelAnswer: "The corrected profit is higher mainly because of book corrections, not because more cash came in, and correcting error 5 shows she has already paid out 2,830 to Zindoga. Taking 3,000 extra would weaken her bank balance and working capital. She should check her cash position first and take less, or delay the drawings.", explanation: "Profit is not the same as cash; evaluate liquidity." }),
    ],
    hints: ["Do the journal first, then post the suspense lines.", "Only income and expense corrections change profit."],
    explanation: "This item tests the suspense account, journal corrections, corrected profit and statement of financial position effects, with advice (Cambridge Paper 2 style).",
  });
  check("item2 marks", 3 + 5 + 2 + 5 + 2 + 3, 20);
});
