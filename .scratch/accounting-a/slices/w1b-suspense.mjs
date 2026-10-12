// W1b: verification.suspense
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, journal, tAccount, statement } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.suspense", { file: "verification/suspense", keyPrefix: "verification.suspense" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The debit column of a trial balance totals US\\$700 less than the credit column. How is the difference entered in the suspense account?",
    right: ["Debit suspense US\\$700", "Correct: debits are short, so suspense is debited."],
    wrong: [["Credit suspense US\\$700", "Crediting would make the credit column even higher."], ["Debit suspense US\\$1,400", "The difference is 700, not twice 700."], ["Credit suspense US\\$1,400", "The amount is the difference, and the side is the debit."]],
    explanation: "The suspense account is placed on the side that is short so the trial balance agrees.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which error would **not** need a suspense account to correct it?",
    right: ["A sale of goods that was not recorded at all", "Correct: an error of omission leaves the trial balance in agreement."],
    wrong: [["A payment credited to the bank account but not debited to any account", "A one-sided entry makes the totals differ."], ["The sales account added up US\\$900 too low", "An addition error makes the totals differ."], ["A debit entry for US\\$480 made as US\\$840 with the credit entry correct", "Unequal amounts make the totals differ."]],
    explanation: "Only errors that upset the trial balance are corrected through suspense.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What should be the balance on the suspense account when all errors have been found and corrected?",
    right: ["Nil", "Correct: the account is closed."],
    wrong: [["A debit balance equal to the draft profit", "Suspense is not related to profit."], ["A credit balance equal to the original difference", "The difference has been explained and cleared."], ["The balance on the capital account", "These accounts are unrelated."]],
    explanation: "Every correction clears part of the suspense balance; when all are made the account is nil.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A credit sale of US\\$450 was debited to the customer's account but the credit entry in the sales account was omitted. Suspense was credited with the difference when the trial balance was drawn up. What is the correcting entry?",
    right: ["Debit suspense US\\$450; credit sales US\\$450", "Correct: the missing credit is made to sales; suspense is the other side."],
    wrong: [["Debit sales US\\$450; credit suspense US\\$450", "That would reduce sales instead of increasing them."], ["Debit the customer US\\$450; credit sales US\\$450", "The customer has already been debited."], ["Debit suspense US\\$450; credit the customer US\\$450", "This would remove the sale from the customer's account."]],
    hints: ["Which account is missing its credit entry?"],
    explanation: "Sales should have been credited. The other side of the correction clears the suspense account.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Rent of US\\$600 was paid by cheque. It was credited to bank correctly but debited to the rent account as US\\$900. Suspense was credited with the resulting difference. What is the correcting entry?",
    right: ["Debit suspense US\\$300; credit rent US\\$300", "Correct: rent is overstated by 300."],
    wrong: [["Debit rent US\\$300; credit suspense US\\$300", "This would increase rent further."], ["Debit suspense US\\$900; credit rent US\\$900", "Only the excess of 300 is wrong."], ["Debit suspense US\\$600; credit rent US\\$600", "600 is the correct payment."]],
    hints: ["By how much is the rent account wrong, and in which direction?"],
    explanation: "The debit to rent is 300 too high, so rent is credited with 300 and suspense is debited with 300.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "The entry 'debit suspense US\\$450; credit sales US\\$450' is made to correct an error. What is the effect on the profit for the year?",
    right: ["Profit increases by US\\$450", "Correct: sales were understated."],
    wrong: [["Profit decreases by US\\$450", "Increasing sales increases profit."], ["Profit is unchanged because suspense is a temporary account", "The credit to sales changes profit."], ["Profit increases by US\\$900", "The sales credit is 450 only."]],
    hints: ["Which account in the profit calculation changes?"],
    explanation: "The credit to sales increases revenue and therefore profit by 450.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A cheque for US\\$800 received from a customer was debited to bank but the credit entry in the customer's account was omitted. Suspense was credited when the trial balance was drawn up. What is the correcting entry and its effect on profit?",
    right: ["Debit suspense US\\$800; credit the customer US\\$800; profit is unchanged", "Correct: the customer's balance was overstated; profit is not affected."],
    wrong: [["Debit suspense US\\$800; credit sales US\\$800; profit increases by US\\$800", "The receipt does not create extra sales."], ["Debit the customer US\\$800; credit suspense US\\$800; profit is unchanged", "The customer has to be credited, not debited."], ["Debit suspense US\\$800; credit the customer US\\$800; profit increases by US\\$800", "Only receivables and the suspense account change."]],
    hints: ["Both accounts affected are balance sheet accounts."],
    explanation: "Credit the customer to complete the entry; the offsetting entry clears suspense. Profit is unaffected.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A suspense account is used to hold a trial balance difference until the causes are found.",
    answer: true,
    explanation: "True. It is a temporary account used so the trial balance can be drawn up.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "When the suspense account has been cleared, it is certain that the books contain no errors.",
    answer: false,
    hints: ["Which errors do not affect the trial balance?"],
    explanation: "False. Errors that do not affect the trial balance, such as omissions and errors of principle, may still be present.",
  });

  // --- Matching
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each error to the way it is corrected.",
    pairs: ["A purchase invoice was never entered", "A payment was credited to bank but not debited to the supplier", "Sales were added up US\\$500 too low", "A computer was debited to repairs"],
    right: ["Journal between the two accounts; no suspense needed", "Journal using the suspense account"],
    rightIndex: [0, 1, 1, 0],
    hints: ["Does the error make the trial balance disagree?"],
    explanation: "Omission and principle errors do not affect the trial balance. A one-sided entry and an addition error do, so they go through suspense.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "If the credit column is higher than the debit column, the suspense account is {{blank:a}}. After all errors are corrected the suspense balance is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["debited"], choices: ["debited", "credited"] },
      { id: "b", accepted: ["nil"], choices: ["nil", "equal to the profit", "carried forward"] },
    ],
    explanation: "Suspense is debited when debits are short; the account is closed when all errors are corrected.",
  });

  // --- Numerical
  const n1 = { dr: 94260, cr: 95010 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", 
    value: n1.cr - n1.dr, wrong: [n1.dr, n1.cr],
    stem: `A trial balance has a debit column total of ${money(n1.dr)} and a credit column total of ${money(n1.cr)}. What amount is entered in the suspense account? (The suspense account is debited.)`,
    explanation: "95,010 − 94,260 = 750, debited to suspense because the debit column is lower.",
  });
  const c1 = { draft: 15800, sales: 620, expense: 380, repairs: 450 };
  const c1v = chk(c1.draft + c1.sales - c1.expense - c1.repairs, 15590);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: c1v, wrong: [r2(c1.draft + c1.sales + c1.expense + c1.repairs), r2(c1.draft + c1.sales - c1.expense)],
    stem: `Farai's draft profit for the year is ${money(c1.draft)}. Errors found include: (1) a credit sale of ${money(c1.sales)} debited to the customer but not credited to sales; (2) the telephone account added up ${money(c1.expense)} too low; (3) repairs of ${money(c1.repairs)} to a delivery van debited to the motor vans account. Calculate the corrected profit for the year.`,
    hints: ["Which errors change income or expenses?"],
    explanation: "(1) sales are 620 higher: +620. (2) the expense is 380 higher: −380. (3) repairs are an expense not an asset: −450. 15,800 + 620 − 380 − 450 = 15,590.",
  });
  const w = { wc: 8900, payables: 390, receivables: 260 };
  const wv = chk(w.wc + w.payables + w.receivables, 9550);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: wv, wrong: [w.wc, r2(w.wc - w.payables - w.receivables)],
    stem: `Thandeka's draft working capital is ${money(w.wc)}. Two errors are corrected: a payment of ${money(w.payables)} to a supplier was not debited to the supplier's account (so trade payables were overstated), and a cheque from a customer of ${money(w.receivables)} was credited twice in the customer's account (so trade receivables were understated). Calculate the corrected working capital.`,
    hints: ["Lower current liabilities and higher current assets both increase working capital."],
    explanation: "Trade payables fall by 390 and trade receivables rise by 260. Working capital = 8,900 + 390 + 260 = 9,550.",
  });
  const s = { cr: 1200, a: 500, b: 350 };
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money",
    value: s.cr - s.a - s.b, wrong: [s.cr, s.cr - s.a],
    stem: `A suspense account was opened with a credit of ${money(s.cr)}. Two errors have been corrected so far: one with a debit to suspense of ${money(s.a)} and another with a debit to suspense of ${money(s.b)}. What credit balance remains on the suspense account?`,
    hints: ["Each debit reduces the credit balance."],
    explanation: "1,200 − 500 − 350 = 350 credit balance still to be explained.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the temporary account in which a trial balance difference is placed until the errors are found.",
    accepted: ["suspense account", "suspense", "a suspense account"],
    explanation: "A suspense account holds the difference temporarily.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a suspense account is opened when a trial balance does not agree.",
    points: ["So that the trial balance can be made to agree and the final accounts can be prepared", "Without waiting for the errors to be found", "The account holds the difference temporarily until each error is corrected"],
    modelAnswer: "A suspense account lets the trial balance agree, so the final accounts are not delayed while the errors are traced. The account is temporary: each error is corrected by a journal that clears part of the balance.",
    hints: ["Think about what the business needs after the trial balance."],
    explanation: "Three points: agree the trial balance, no delay, temporary.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an error of omission is corrected without using the suspense account.",
    points: ["The transaction was left out of both accounts", "So the trial balance still agreed and no difference was placed in suspense", "A journal is made between the two accounts concerned"],
    modelAnswer: "An error of omission leaves out both the debit and the credit entry, so the trial balance still agrees and no difference was placed in suspense. It is corrected by a journal that makes both entries.",
    hints: ["Did the trial balance disagree?"],
    explanation: "Suspense is only used for errors that affect the trial balance.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A bookkeeper in Gweru cannot find US\\$300 of a trial balance difference and suggests leaving it in suspense and shown in the statement of financial position. Evaluate this suggestion.",
    points: ["Allows the statements to be completed on time", "The statements will contain an unexplained balance and so may be misstated (profit or net assets)", "Errors or fraud may remain undetected", "Justified conclusion, for example that the effort should continue and the amount be reported to the owner"],
    modelAnswer: "Leaving the 300 in suspense lets the statements be finished, but they would contain an unexplained balance that may misstate profit or net assets, and errors or fraud could remain. The search should continue and the owner should be told about the unresolved amount.",
    hints: ["Weigh speed against reliability."],
    explanation: "A balanced evaluation links the unexplained amount to the reliability of the accounts.",
  });

  // --- Practice structured 1 (12 marks)
  const s1 = { dr: 87450, cr: 86720, sale: 970, elec: 240, tel: 150, draft: 14200 };
  const s1diff = s1.dr - s1.cr;
  chk(s1diff, s1.sale - s1.elec);
  const s1pfy = chk(s1.draft + s1.sale - s1.elec, 14930);
  const s1j = journal([
    { date: "1", lines: [["Suspense", s1.sale, null], ["Sales", null, s1.sale]], narrative: "Cash sale debited to bank but not credited to sales" },
    { date: "2", lines: [["Electricity", s1.elec, null], ["Suspense", null, s1.elec]], narrative: "Payment credited to bank but not debited to electricity" },
    { date: "3", lines: [["Telephone", s1.tel, null], ["Postage", null, s1.tel]], narrative: "Telephone expense wrongly debited to postage" },
  ]);
  const s1susp = tAccount("Suspense account", [["31 Dec", "Sales", s1.sale]], [["31 Dec", "Trial balance difference", s1diff], ["31 Dec", "Electricity", s1.elec]]);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Thandeka's boutique in Chinhoyi has a draft trial balance with debits of ${money(s1.dr)} and credits of ${money(s1.cr)}. The difference was entered in a suspense account. Later these errors were found:\n\n1. A cash sale of ${money(s1.sale)} was debited to the bank account but the credit entry in the sales account was omitted.\n2. Electricity of ${money(s1.elec)} was paid by cheque and credited to the bank account but the debit entry was omitted.\n3. Telephone expense of ${money(s1.tel)} was debited to the postage account.\n\nThe draft profit for the year was ${money(s1.draft)}.`,
    parts: [
      P.mcq({ label: "(a)", marks: 2, stem: "State the entry made to open the suspense account.", options: [[`Credit suspense ${money(s1diff)}`, "Correct: debits exceed credits, so suspense is credited."], [`Debit suspense ${money(s1diff)}`, "The debit column is the higher one, so suspense is credited."], [`Credit suspense ${money(s1.dr)}`, "The amount is the difference only."], [`Debit suspense ${money(s1.cr)}`, "The amount is the difference only."]], answer: "A", explanation: "Debit total 87,450 − credit total 86,720 = 730; credit suspense." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct the three errors. Narratives are required.", points: ["Dr Suspense 970, Cr Sales 970", "Dr Electricity 240, Cr Suspense 240", "Dr Telephone 150, Cr Postage 150", "Narratives for all three entries"], modelAnswer: s1j, explanation: "Errors 1 and 2 go through suspense; error 3 does not." }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account.", points: ["Credit: trial balance difference 730", "Credit: electricity 240 and debit: sales 970", "Totals agree at 970 so the account is cleared"], modelAnswer: s1susp, explanation: "The account balances at nil." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1pfy, wrong: [r2(s1.draft + s1.sale + s1.elec + s1.tel), s1.draft], stem: "Calculate the corrected profit for the year.", explanation: "14,200 + 970 − 240 = 14,930. Error 3 moves cost between two expenses, so profit is unchanged." }),
      P.tf({ label: "(e)", marks: 1, yesNo: true, stem: "Does error 3 pass through the suspense account?", answer: false, explanation: "No. Both accounts are expense accounts and the trial balance totals were not affected." }),
    ],
    hints: ["Credits are short or debits are short?", "Only errors that affected the trial balance go through suspense."],
    explanation: "This item practises opening, using and clearing a suspense account and finding corrected profit.",
  });

  // --- Practice structured 2 (10 marks)
  const s2 = { dr: 66340, cr: 66940, gp: 52300, pfy: 19800, ca: 28700, cl: 17400, err1: 600, err2: 1250, err3: 880 };
  const s2diff = s2.cr - s2.dr;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda's trial balance shows debits of ${money(s2.dr)} and credits of ${money(s2.cr)}. The difference is entered in a suspense account. Three errors are found:\n\n1. Rent paid of ${money(s2.err1)} was credited to the bank account but not debited to the rent account.\n2. A credit sale of ${money(s2.err2)} was omitted completely from the books.\n3. Equipment bought for ${money(s2.err3)} was debited to the purchases account.\n\nThe draft figures are gross profit ${money(s2.gp)}, profit for the year ${money(s2.pfy)}, current assets ${money(s2.ca)} and current liabilities ${money(s2.cl)}.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s2diff, stem: "Calculate the amount entered in the suspense account (debited).", explanation: "66,940 − 66,340 = 600." }),
      P.fib({ label: "(b)", marks: 2, stem: "Which errors pass through the suspense account?", template: "Error 1: {{blank:a}}. Error 2: {{blank:b}}. Error 3: {{blank:c}}.", blanks: [
        { id: "a", accepted: ["yes"], choices: ["yes", "no"] },
        { id: "b", accepted: ["no"], choices: ["yes", "no"] },
        { id: "c", accepted: ["no"], choices: ["yes", "no"] },
      ], marks: 2, explanation: "Only error 1 is a one-sided entry that upset the trial balance (600, which clears the suspense difference)." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s2.gp + s2.err2 + s2.err3, wrong: [s2.gp + s2.err2], stem: "Calculate the corrected gross profit.", explanation: "Sales +1,250 and purchases −880: 52,300 + 1,250 + 880 = 54,430." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: s2.pfy + s2.err2 + s2.err3 - s2.err1, wrong: [s2.pfy + s2.err2 + s2.err3, s2.pfy], stem: "Calculate the corrected profit for the year.", explanation: "Gross profit +2,130, rent expense −600: 19,800 + 1,250 + 880 − 600 = 21,330." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: (s2.ca + s2.err2) - s2.cl, wrong: [s2.ca - s2.cl], stem: "Calculate the corrected working capital.", explanation: "The omitted credit sale adds 1,250 to trade receivables. Working capital = (28,700 + 1,250) − 17,400 = 12,550." }),
    ],
    hints: ["Which errors change sales, purchases or expenses?", "Which current items are affected?"],
    explanation: "This item practises the effect of errors on gross profit, profit and working capital.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Suspense account", "A temporary account that holds a trial balance difference until the errors are found and corrected.");
  b.card("FACT", "Opening suspense: credit column higher", "Debit suspense with the difference.");
  b.card("FACT", "Opening suspense: debit column higher", "Credit suspense with the difference.");
  b.card("CONCEPT", "Errors corrected through suspense", "One-sided entries, entries with unequal amounts and addition errors.");
  b.card("CONCEPT", "Errors corrected without suspense", "Omission, commission, principle, original entry, reversal and compensating errors.");
  b.card("FACT", "Suspense after correction", "The suspense account balances at nil when all errors have been found.");
  b.card("CONCEPT", "Statement of corrected profit", "Start with the draft profit; add or subtract the effect of each error to reach the corrected profit.");
  b.card("CONCEPT", "Effect of errors on working capital", "Only errors affecting a current asset or current liability change working capital.");
  b.card("CONCEPT", "Balance omitted from the trial balance", "No journal is needed; only the trial balance is corrected.");
});
