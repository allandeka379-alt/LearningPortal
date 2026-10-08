// W2b: the suspense account.
import { concept, P, money, journal, sum, r2, check } from "../lib.mjs";
import { table, suspense } from "../tables/w2b-lib.mjs";

concept("acc.verification.suspense-account", { file: "verification/suspense-account", keyPrefix: "verification.suspense-account" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trial balance has debit totals of US\\$48,615 and credit totals of US\\$48,240. How is the suspense account opened?",
    options: [
      ["With a credit balance of US\\$375", "Correct: the credit column is 375 short, so suspense is a credit."],
      ["With a debit balance of US\\$375", "A debit would make the debit column even larger."],
      ["With a credit balance of US\\$750", "The difference is 375; it is not doubled."],
      ["With a debit balance of US\\$48,615", "Only the difference is entered in suspense."],
    ],
    answer: "A",
    explanation: "48,615 − 48,240 = 375. The credit side is short, so the suspense account is opened with a credit of 375 to make the trial balance agree.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of a suspense account?",
    options: [
      ["To hold a trial balance difference until the errors are found", "Correct: it is a temporary account."],
      ["To record transactions that the owner wants kept private", "Private transactions are drawings, not suspense."],
      ["To record amounts owed by customers who may not pay", "That is the allowance (provision) for doubtful debts."],
      ["To hold the profit until it is transferred to capital", "Profit is transferred from the income statement to capital."],
    ],
    answer: "A",
    explanation: "The suspense account lets the trial balance agree temporarily; it is cleared as the errors are corrected.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which error would be corrected **through** the suspense account?",
    options: [
      ["Carriage outwards of US\\$128 entered in the cash book but not posted to the ledger", "Correct: only one side was recorded, so the trial balance disagreed."],
      ["A credit sale of US\\$128 to a customer not recorded anywhere in the books", "An omission leaves both totals equal."],
      ["Carriage outwards of US\\$128 paid by bank debited to the carriage inwards account", "An error of commission; equal debits and credits."],
      ["A printer for office use costing US\\$128 debited to the purchases account", "An error of principle; equal debits and credits."],
    ],
    answer: "A",
    explanation: "Only errors that made the trial balance disagree use suspense. A single-sided posting is one of them; the other three are errors not revealed by the trial balance.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The purchases journal was overcast by US\\$400. Which journal entry corrects the error?",
    options: [
      ["Debit suspense US\\$400; credit purchases US\\$400", "Correct: purchases is too high and must be reduced with a credit."],
      ["Debit purchases US\\$400; credit suspense US\\$400", "This would increase purchases further."],
      ["Debit suspense US\\$400; credit trade payables US\\$400", "The suppliers were posted with their own invoices; only the total was wrong."],
      ["Debit purchases US\\$800; credit suspense US\\$800", "Doubling is for two entries on the same side."],
    ],
    answer: "A",
    hints: ["Is the purchases account too high or too low?"],
    explanation: "Overcast means added up too high. The purchases total was posted 400 too high, so purchases is credited 400 and suspense debited 400.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Commission received of US\\$215 was debited to the bank account and also debited to the commission received account. Which entry corrects the error?",
    options: [
      ["Debit suspense US\\$430; credit commission received US\\$430", "Correct: cancel the wrong debit and make the missing credit."],
      ["Debit suspense US\\$215; credit commission received US\\$215", "This only cancels the wrong debit; the credit is still missing."],
      ["Debit commission received US\\$430; credit suspense US\\$430", "This doubles the error."],
      ["Debit bank US\\$215; credit commission received US\\$215", "Bank was already correct."],
    ],
    answer: "A",
    hints: ["Both entries were on the debit side."],
    explanation: "The commission account should have a credit of 215 but has a debit of 215. It needs a credit of $2 \\times 215 = 430$; the other side is suspense.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A cheque for US\\$563 paid to Sibanda Suppliers was correctly entered in the bank account but posted to Sibanda's account as US\\$536. Which entry corrects the error?",
    options: [
      ["Debit Sibanda Suppliers US\\$27; credit suspense US\\$27", "Correct: Sibanda was debited 27 too little."],
      ["Debit suspense US\\$27; credit Sibanda Suppliers US\\$27", "This makes Sibanda's debit even smaller."],
      ["Debit Sibanda Suppliers US\\$27; credit bank US\\$27", "Bank was correct, so it is not adjusted."],
      ["Debit Sibanda Suppliers US\\$563; credit suspense US\\$563", "Sibanda was posted with 536, so only the shortfall is needed."],
    ],
    answer: "A",
    hints: ["Only one side is wrong. By how much?"],
    explanation: "Bank was credited 563; Sibanda was debited only 536. Debit Sibanda $563 - 536 = 27$ and credit suspense 27.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "After all errors were corrected, a suspense account still had a debit balance of US\\$140. What does this show?",
    options: [
      ["At least one error affecting the trial balance has not been found or corrected", "Correct: a fully corrected suspense account clears to nil."],
      ["The business made a loss of US\\$140", "Suspense has nothing to do with profit or loss."],
      ["The balance should be shown as a current asset in the statement of financial position","A suspense balance is not an asset; it signals an unfound error."],
      ["All errors have been corrected, because the balance is small", "Any remaining balance, however small, means an error remains."],
    ],
    answer: "A",
    hints: ["When does a suspense account clear?"],
    explanation: "When every error that affected the trial balance is corrected, the suspense account has no balance. A balance means more work is needed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The balance of the drawings account, US\\$2,900, was left out of the trial balance. On which side was the suspense account opened, if this was the only error?",
    options: [
      ["Debit US\\$2,900", "Correct: a debit balance was missing, so the debit column was short."],
      ["Credit US\\$2,900", "Drawings is a debit balance; leaving it out makes the debits short."],
      ["Debit US\\$5,800", "The column is short by the balance itself, not twice it."],
      ["No suspense account is needed", "A missing balance makes the totals disagree."],
    ],
    answer: "A",
    explanation: "Drawings is a debit balance. Omitted from the trial balance, the debit column is 2,900 short, so suspense opens with a debit of 2,900.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "An error of principle is corrected through the suspense account.",
    answer: false,
    explanation: "False. An error of principle has equal debit and credit entries, so it does not affect the trial balance and does not involve suspense.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the credit column of a trial balance is larger than the debit column, the suspense account will have a debit balance.",
    answer: true,
    explanation: "True. The difference is put on the short side, here the debit side, so suspense is a debit balance.",
  });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "For each error in Nyasha's books, choose the correct entry in the **suspense account**.",
    pairs: [
      "Sales journal undercast by US\\$250",
      "Wages of US\\$250 paid, not posted to the wages account",
      "A receipt of US\\$250 from Dube debited in the bank account and debited to Dube",
      "Rent of US\\$250 debited to rates (bank correct)",
    ],
    right: ["Debit suspense US\\$250", "Credit suspense US\\$250", "Debit suspense US\\$500", "No entry in suspense"],
    rightIndex: [0, 1, 2, 3],
    hints: ["Find the account that is wrong; suspense takes the other side."],
    explanation: "Sales undercast: credit sales, debit suspense. Wages missing: debit wages, credit suspense. Dube debited instead of credited: credit Dube 500, debit suspense 500. Rent to rates: commission, no suspense.",
  });

  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Discount received of US\\$93 (the cash book total) was not posted to the discount received account. Complete the correcting entry.",
    template: "Debit {{blank:a}} US\\$93; credit {{blank:b}} US\\$93.",
    blanks: [
      { id: "a", accepted: ["Suspense"], choices: ["Suspense", "Discount received", "Trade payables", "Bank"] },
      { id: "b", accepted: ["Discount received"], choices: ["Discount received", "Suspense", "Trade payables", "Bank"] },
    ],
    hints: ["The suppliers were already debited."],
    explanation: "The suppliers' accounts were debited, but the credit to discount received was missing. Credit discount received and debit suspense.",
  });

  // Calculation: find the original difference from a list of errors
  const errs = [["Rent received of US\\$870 posted to rent received as US\\$780", "credit missing 90", -90], ["Purchases journal undercast by US\\$1,100", "debit short 1,100", -1100], ["Payment of US\\$346 to Nhamo Ltd not posted to Nhamo Ltd's account", "debit short 346", -346], ["Returns inwards of US\\$58 credited to returns inwards (customer correctly credited)", "two credits", -116]];
  // suspense entries: rent received short credit 90 -> Cr rent recd, Dr suspense 90; purchases undercast -> Dr purchases, Cr suspense 1,100; Nhamo -> Dr Nhamo, Cr suspense 346; returns inwards -> Dr RI 116, Cr suspense 116
  const sDr = [90];
  const sCr = [1100, 346, 116];
  const open = r2(sum(sCr) - sum(sDr));
  check("open", open, 1472);
  b.calc({
    d: 4, kind: "money", value: open, calculator: true, wrong: [r2(sum(sCr) + sum(sDr)), r2(open - 58)],
    stem: "Tatenda opened a suspense account for the difference on his trial balance at 30 June 2025. These were the only errors:\n\n" + table(["No.", "Error"], errs.map((e, i) => [String(i + 1), e[0]])) + "\n\nCalculate the amount of the difference that was entered in the suspense account.",
    hints: ["Write the correcting entry for each error and note the suspense side.", "The opening balance is the amount that makes the suspense account clear."],
    explanation: `Corrections: (1) credit rent received 90, debit suspense 90; (2) debit purchases 1,100, credit suspense 1,100; (3) debit Nhamo Ltd 346, credit suspense 346; (4) debit returns inwards $2 \\times 58 = 116$, credit suspense 116. Suspense credits 1,562, debits 90, so the opening entry was a **debit** of 1,562 − 90 = ${money(open)}. Using 58 instead of 116 for error 4 gives ${money(r2(open - 58))}.`,
    workedSolution: "1. Error 1: rent received is 90 too low: credit rent received 90, debit suspense 90.\n2. Error 2: purchases is 1,100 too low: debit purchases 1,100, credit suspense 1,100.\n3. Error 3: debit Nhamo Ltd 346, credit suspense 346.\n4. Error 4: returns inwards was credited instead of debited: debit returns inwards 116, credit suspense 116.\n5. Suspense: credits $1,100 + 346 + 116 = 1,562$; debits 90. Opening balance (debit) $= 1,562 - 90 = 1,472$.",
  });
  b.num({
    d: 3, kind: "money", value: 1840, calculator: true, wrong: [920],
    stem: "Machinery repairs of US\\$920 were credited to the repairs account; bank was correctly credited. What amount is debited to the repairs account to correct the error?",
    hints: ["Both entries were credits."],
    explanation: "Repairs should have a debit of 920 but has a credit of 920, so it needs a debit of $2 \\times 920 = 1,840$; the credit goes to suspense.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a sale of US\\$510 on credit to Gora, wrongly debited to Gore's account, is **not** corrected through the suspense account.",
    points: ["The debit and credit were equal / the trial balance was not affected (error of commission)", "So the correction is between the two personal accounts only: debit Gora, credit Gore"],
    hints: ["Did the error make the debit and credit totals different?"],
    modelAnswer: "It is an error of commission: sales was credited and a customer debited with 510, so the totals agreed. The correction only moves the debit from Gore to Gora (debit Gora 510, credit Gore 510); suspense is not involved.",
    explanation: "Only errors that made the trial balance disagree use suspense.",
  });

  // Practice structured 1
  const k = [
    { d: "The sales journal was overcast by US\\$1,200", e: [["Sales", 1200, null], ["Suspense", null, 1200]], n: "Sales journal overcast" },
    { d: "Insurance of US\\$684 paid by bank was posted to the insurance account as US\\$648", e: [["Insurance", 36, null], ["Suspense", null, 36]], n: "Insurance posted as 648 instead of 684" },
    { d: "Goods of US\\$157 returned by Mpofu, a customer, were debited to Mpofu's account (returns inwards correctly debited)", e: [["Suspense", 314, null], ["Mpofu", null, 314]], n: "Return by Mpofu debited instead of credited to his account" },
    { d: "A cash sale of US\\$290 was entered in the cash book but not posted to the sales account", e: [["Suspense", 290, null], ["Sales", null, 290]], n: "Cash sale not posted to sales" },
    { d: "A payment of US\\$475 for advertising was debited to the stationery account", e: [["Advertising", 475, null], ["Stationery", null, 475]], n: "Advertising wrongly debited to stationery" },
  ];
  const sd = [], sc = [];
  for (const x of k) for (const [a, d, c] of x.e) if (a === "Suspense") (d ? sd : sc).push(["30 Sep", x.e.find((l) => l[0] !== "Suspense")[0], d ?? c]);
  const diff = r2(sum(sc.map((x) => x[2])) - sum(sd.map((x) => x[2])));
  check("diff", diff, 632);
  const sMd = suspense("Suspense account", [["30 Sep", "Difference on trial balance", diff], ...sd], sc);
  const jMd = journal(k.map((x) => ({ date: "30 Sep", lines: x.e, narrative: x.n })));
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: `Chipo's trial balance at 30 September 2025 did not agree. She opened a suspense account with the difference and later found these errors:\n\n` + table(["No.", "Error"], k.map((x, i) => [String(i + 1), x.d])),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which error does **not** affect the suspense account?",
        options: [["Error 5", "Correct: an error of commission, with equal debit and credit."], ["Error 2", "Insurance is debited 36 too little: it uses suspense."], ["Error 3", "Two debits: it uses suspense."], ["Error 4", "A single-sided entry: it uses suspense."]],
        answer: "A", explanation: "Advertising and stationery are both expenses; the amounts were equal, so the trial balance was not affected.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: diff, wrong: [r2(diff + 157), r2(1200 + 36 - 157 - 290)], stem: "Calculate the difference on the trial balance that was entered in the suspense account.", explanation: `Suspense credits: 1,200 + 36 = 1,236. Suspense debits: 314 + 290 = 604. Opening balance (debit) = 1,236 − 604 = ${diff}.` }),
      P.mcq({
        label: "(c)", stem: "On which side of the suspense account was the difference entered?",
        options: [["Debit, because the credit column of the trial balance was larger", "Correct: the corrections leave suspense with more credits, so it opened as a debit."], ["Credit, because the debit column of the trial balance was larger", "The corrections would then not clear the account."], ["Debit, because the debit column of the trial balance was larger", "If debits were larger, suspense would be a credit."], ["Credit, because the credit column of the trial balance was larger", "The short column receives the suspense balance; a larger credit column means a debit suspense."]],
        answer: "A", explanation: "Sales was overstated by 1,200 (credits too high) and other errors partly offset it; overall credits exceeded debits by 632.",
      }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries to correct errors 1 to 5. Narratives are not required.", points: ["Error 1: debit sales 1,200, credit suspense 1,200", "Error 2: debit insurance 36, credit suspense 36", "Error 3: debit suspense 314, credit Mpofu 314", "Error 4: debit suspense 290, credit sales 290", "Error 5: debit advertising 475, credit stationery 475"], modelAnswer: jMd, explanation: "One side to the wrong account, the other to suspense (except error 5)." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account, showing the opening difference.", points: [`Difference on trial balance ${diff} on the debit side`, "Mpofu 314 and Sales 290 on the debit side; Sales 1,200 and Insurance 36 on the credit side", "Totals 1,236 on each side (account clears)"], modelAnswer: sMd, explanation: "The account clears to nil once all suspense errors are corrected." }),
    ],
    hints: ["Do the journal first; post only the suspense lines.", "Mpofu was debited instead of credited: double the amount."],
    explanation: "This item tests choosing errors that use suspense, journal entries and the suspense account.",
  });

  // Practice structured 2: credit suspense
  const k2 = [
    { d: "The total of the discount allowed column in the cash book, US\\$148, was posted to the credit of the discount allowed account", e: [["Discount allowed", 296, null], ["Suspense", null, 296]] },
    { d: "The purchases journal was undercast by US\\$700", e: [["Purchases", 700, null], ["Suspense", null, 700]] },
    { d: "Rent received of US\\$1,050 was credited to the rent received account as US\\$1,500", e: [["Rent received", 450, null], ["Suspense", null, 450]] },
    { d: "Motor expenses of US\\$186 were omitted from the trial balance", e: [["Motor expenses", 186, null], ["Suspense", null, 186]] },
  ];
  const s2c = k2.map((x) => ["30 Apr", x.e[0][0], x.e[0][1]]);
  const diff2 = sum(s2c.map((x) => x[2]));
  check("diff2", diff2, 1632);
  const s2Md = suspense("Suspense account", [["30 Apr", "Difference on trial balance", diff2]], s2c);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Sipho runs a printing business in Gweru. His trial balance at 30 April 2025 did not agree, and the difference was placed in a suspense account. These errors were then discovered:\n\n" + table(["No.", "Error"], k2.map((x, i) => [String(i + 1), x.d])),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 296, wrong: [148], stem: "State the amount needed to correct the discount allowed account (error 1).", explanation: "The account was credited 148 instead of debited: it needs a debit of $2 \\times 148 = 296$." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 450, wrong: [1050], stem: "State the amount needed to correct the rent received account (error 3).", explanation: "1,500 − 1,050 = 450: rent received is overstated by 450, so debit rent received 450." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: diff2, wrong: [r2(diff2 - 148), r2(diff2 - 186)], stem: "Calculate the difference originally entered in the suspense account.", explanation: `Every correction credits suspense: 296 + 700 + 450 + 186 = ${diff2.toLocaleString("en-GB")}. So suspense was opened with a debit of ${diff2.toLocaleString("en-GB")} (the credit column was larger).` }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account.", points: [`Difference on trial balance ${diff2.toLocaleString("en-GB")} on the debit side`, "Discount allowed 296, Purchases 700, Rent received 450 and Motor expenses 186 on the credit side", "Equal totals; no balance remains"], modelAnswer: s2Md, explanation: "All four errors affected the trial balance." }),
      P.manual({ label: "(e)", marks: 2, stem: "Error 4 needs no journal entry to correct the motor expenses account, only an entry in the suspense account. Explain why.", points: ["The motor expenses account itself is correct / the balance was only left out of the trial balance list", "So only the trial balance (and the suspense account) needs correcting, not the ledger account"], modelAnswer: "The motor expenses account was correct; the balance was simply not copied into the trial balance. The ledger needs no correction, so the amount is written off the suspense account and included in the corrected trial balance.", explanation: "A balance omitted from the trial balance is a listing error, not a ledger error." }),
    ],
    hints: ["Each error left the debit column short or the credit column too high."],
    explanation: "This item tests reasoning about errors that pass through suspense.",
  });

  b.card("DEFINITION", "Suspense account", "A temporary account opened with the trial balance difference so the trial balance agrees until the errors are found.");
  b.card("FACT", "Side of the suspense balance", "Put it on the short side: credits larger → suspense debit; debits larger → suspense credit.");
  b.card("FACT", "Errors that go through suspense", "Single-sided postings, unequal amounts, two entries on one side, casting errors, balances omitted from or misplaced in the trial balance.");
  b.card("FACT", "Errors that never go through suspense", "Omission, commission, principle, original entry, complete reversal, compensating.");
  b.card("FACT", "Sales journal overcast by X", "Debit sales X; credit suspense X.");
  b.card("FACT", "Purchases journal overcast by X", "Debit suspense X; credit purchases X.");
  b.card("FACT", "Both entries on the same side", "Correct the wrong account with twice the amount; the other side goes to suspense.");
  b.card("CONCEPT", "When is the suspense account finished?", "When all errors affecting the trial balance are corrected, it has no balance (it clears).");
  b.card("DEFINITION", "Casting error", "An error in adding up: overcast = total too high; undercast = total too low.");
});
