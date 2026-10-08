// W2b: correcting errors with journal entries (no suspense account).
import { concept, P, money, journal, r2 } from "../lib.mjs";
import { table } from "../tables/w2b-lib.mjs";

concept("acc.verification.correcting-errors", { file: "verification/correcting-errors", keyPrefix: "verification.correcting-errors" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Insurance of US\\$275 paid by bank transfer was debited to the rent account. Which journal entry corrects the error?",
    options: [
      ["Debit insurance US\\$275; credit rent US\\$275", "Correct: move the amount out of rent and into insurance."],
      ["Debit rent US\\$275; credit insurance US\\$275", "This moves the amount the wrong way, doubling the error."],
      ["Debit insurance US\\$275; credit bank US\\$275", "The bank entry was already correct; this pays the bill twice in the books."],
      ["Debit insurance US\\$550; credit rent US\\$550", "Doubling is only for a complete reversal of entries."],
    ],
    answer: "A",
    explanation: "Done: debit rent, credit bank. Should have been: debit insurance, credit bank. Correction: debit insurance, credit rent. Bank is untouched.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A credit purchase of goods for US\\$1,315 from Kwekwe Supplies was not recorded at all. Which entry corrects it?",
    options: [
      ["Debit purchases; credit Kwekwe Supplies", "Correct: the full original entry is made for an omission."],
      ["Debit Kwekwe Supplies; credit purchases", "This is the reverse of a credit purchase."],
      ["Debit purchases; credit bank", "The goods were bought on credit, not paid for."],
      ["Debit purchases; credit suspense", "The omission did not affect the trial balance, so no suspense account is involved."],
    ],
    answer: "A",
    explanation: "An omission is corrected by making the whole entry that was missed: purchases (debit) and the supplier (credit).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Discount allowed of US\\$84 was debited to the customer's account and credited to the discount allowed account. What is the correcting entry?",
    options: [
      ["Debit discount allowed US\\$168; credit the customer US\\$168", "Correct: twice the amount cancels the reversal and records the right entry."],
      ["Debit discount allowed US\\$84; credit the customer US\\$84", "This only cancels the wrong entry; the correct entry is still missing."],
      ["Debit the customer US\\$168; credit discount allowed US\\$168", "This doubles the error instead of correcting it."],
      ["Debit discount allowed US\\$84; credit suspense US\\$84", "A complete reversal does not affect the trial balance."],
    ],
    answer: "A",
    hints: ["A reversal needs one amount to cancel and one amount to correct."],
    explanation: "Should have been: debit discount allowed 84, credit customer 84. Done: the opposite. Correction: $2 \\times 84 = 168$ debit discount allowed, credit customer.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A sales invoice for US\\$2,146 was entered in the sales journal as US\\$2,416. Which entry corrects the error?",
    options: [
      ["Debit sales US\\$270; credit the customer US\\$270", "Correct: both accounts are overstated by 270, so both are reduced."],
      ["Debit the customer US\\$270; credit sales US\\$270", "This increases both accounts, making them more overstated."],
      ["Debit sales US\\$2,416; credit the customer US\\$2,146", "A journal entry must have equal debits and credits."],
      ["Debit sales US\\$540; credit the customer US\\$540", "The error is 270; doubling applies only to reversals."],
    ],
    answer: "A",
    hints: ["Find the difference between the recorded and the correct amount."],
    explanation: "Recorded 2,416, correct 2,146: both the customer (debit) and sales (credit) are 270 too high. Reduce them: debit sales 270, credit the customer 270.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods costing US\\$190 taken by the owner for her family were not recorded. Which entry corrects this?",
    options: [
      ["Debit drawings; credit purchases", "Correct: drawings increase and the goods are removed from purchases."],
      ["Debit purchases; credit drawings", "This would add the goods to purchases."],
      ["Debit drawings; credit sales", "Goods taken for own use are removed at cost from purchases, not sold."],
      ["Debit drawings; credit capital", "Capital is reduced by drawings at the year end, not by this entry."],
    ],
    answer: "A",
    explanation: "Goods taken for private use are drawings at cost: debit drawings, credit purchases.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A payment of US\\$720 for a new shop counter was debited to the repairs account. Which statement about the correction is true?",
    options: [
      ["It debits shop fittings and credits repairs, and increases profit", "Correct: an expense of 720 is removed, so profit rises by 720."],
      ["It debits repairs and credits shop fittings, and reduces profit", "That would move the counter into repairs, which is the error."],
      ["It debits shop fittings and credits bank, and does not affect profit", "Bank was correct; and moving an expense to an asset does change profit."],
      ["It debits shop fittings and credits repairs, and reduces profit", "Removing an expense increases profit."],
    ],
    answer: "A",
    hints: ["Is repairs an income statement item or a statement of financial position item?"],
    explanation: "This is an error of principle. The correction (debit shop fittings, credit repairs) moves 720 from an expense to a non-current asset, so profit increases by 720.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why should each correcting journal entry have a narrative?",
    options: [
      ["To explain the reason for the entry so it can be checked later", "Correct: the narrative records why the entry was made."],
      ["To make the debit and credit totals equal", "The amounts make the entry balance, not the narrative."],
      ["To show the balance of the account after the correction", "Balances are worked out in the ledger, not the journal."],
      ["To record the book of prime entry for the original transaction", "A narrative explains the reason; it is not a book reference."],
    ],
    answer: "A",
    explanation: "The journal is the record of unusual entries. A narrative such as \"Repairs wrongly debited to motor vehicles\" lets anyone trace the reason.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Goods returned by a customer, Moyo, for US\\$130 were entered in the returns outwards journal and posted from it. Which entry corrects the error?",
    options: [
      ["Debit returns inwards US\\$130 and returns outwards US\\$130; credit Moyo US\\$260", "Correct: cancels the wrong debit to Moyo and credit to returns outwards, then records the return properly."],
      ["Debit returns inwards US\\$130; credit returns outwards US\\$130", "Moyo was debited instead of credited, so Moyo's account must be corrected too."],
      ["Debit Moyo US\\$260; credit returns inwards US\\$130 and returns outwards US\\$130", "These are the opposite sides of the required correction."],
      ["Debit returns inwards US\\$130; credit Moyo US\\$130", "This ignores the wrong entries already made in Moyo's account and returns outwards."],
    ],
    answer: "A",
    hints: ["List what was done: which account was debited, which credited?"],
    explanation: "Done: debit Moyo 130, credit returns outwards 130. Should have been: debit returns inwards 130, credit Moyo 130. Correction: debit returns outwards 130 and returns inwards 130, credit Moyo 260.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Errors in the ledger should be corrected by crossing out the wrong figure and writing the right one beside it.",
    answer: false,
    explanation: "False. Errors are corrected by journal entries with narratives, so there is a clear record of the change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To correct an error of commission, only the two personal (or nominal) accounts involved are adjusted; the bank or cash account is not touched.",
    answer: true,
    explanation: "True. In an error of commission the other side of the entry (for example bank) was correct; only the wrong account and the right account are adjusted.",
  });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each error in Nyasha's books with the entry that corrects it.",
    pairs: [
      "Rent received of US\\$400 credited to commission received",
      "Cash of US\\$400 paid to Sibanda (a supplier) not recorded",
      "Wages of US\\$400 debited to bank and credited to wages",
      "Office desk of US\\$400 debited to purchases",
    ],
    right: ["Debit commission received; credit rent received", "Debit Sibanda; credit cash", "Debit wages US\\$800; credit bank US\\$800", "Debit office furniture; credit purchases"],
    rightIndex: [0, 1, 2, 3],
    hints: ["Identify the type of each error first."],
    explanation: "Commission: move to the right income account. Omission: make the full entry. Complete reversal: twice the amount. Principle: move from purchases to the asset.",
  });

  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Electricity of US\\$228 for the owner's home was paid from the business bank account and debited to the electricity account. Complete the correcting journal entry.",
    template: "Debit {{blank:a}} US\\$228; credit {{blank:b}} US\\$228.",
    blanks: [
      { id: "a", accepted: ["Drawings"], choices: ["Drawings", "Electricity", "Bank", "Capital"] },
      { id: "b", accepted: ["Electricity"], choices: ["Electricity", "Drawings", "Bank", "Capital"] },
    ],
    hints: ["The bank payment was correct. Which account should have been debited?"],
    explanation: "Private expenses paid by the business are drawings. Debit drawings and credit electricity to remove the private bill from the business expense.",
  });

  // Numerical items
  b.num({
    d: 3, kind: "money", value: 1270, wrong: [635],
    stem: "Cash sales of US\\$635 were debited to the sales account and credited to the bank account. What amount is entered on **each** side of the correcting journal entry?",
    hints: ["This is a complete reversal of entries."],
    explanation: "Twice the amount: $2 \\times 635 = 1,270$; debit bank 1,270, credit sales 1,270. Using 635 would only cancel the wrong entry.",
  });
  const corr = r2(4085 - 4058);
  b.num({
    d: 2, kind: "money", value: corr, wrong: [4058, 4085], daily: true,
    stem: "A supplier's invoice for US\\$4,085 was entered in the purchases journal as US\\$4,058. What amount appears in the correcting journal entry?",
    explanation: `Error of original entry: only the difference is corrected, 4,085 − 4,058 = ${corr}. Debit purchases ${corr}, credit the supplier ${corr}.`,
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "A cheque for US\\$517 received from T. Ncube was credited to the account of T. Nkomo. Write the journal entry to correct the error, with a narrative.",
    points: ["Debit T. Nkomo US\\$517", "Credit T. Ncube US\\$517", "Suitable narrative, e.g. \"Receipt from T. Ncube wrongly credited to T. Nkomo\""],
    modelAnswer: "Debit T. Nkomo 517; Credit T. Ncube 517. Narrative: Cheque received from T. Ncube wrongly credited to T. Nkomo's account.",
    hints: ["Cancel the wrong credit, then make the right one."],
    explanation: "Error of commission: the bank entry was right; Nkomo was wrongly credited, so debit Nkomo and credit Ncube.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "The sales account was undercast by US\\$300 and the rent account was undercast by US\\$300. Write the correcting entry and explain why no suspense account is needed.",
    points: ["Debit rent US\\$300; credit sales US\\$300", "No suspense: the two errors compensate / the debit and credit totals were both short by 300, so the trial balance agreed"],
    modelAnswer: "Debit rent 300, credit sales 300. The undercast sales (a credit) and undercast rent (a debit) cancel each other, so the trial balance agreed and no suspense account was opened.",
    hints: ["Sales is a credit balance; rent is a debit balance."],
    explanation: "Compensating errors are corrected by adjusting each account that is wrong.",
  });

  // Practice structured 1: journal entries for five errors
  const errs1 = [
    { d: "Repairs to machinery, US\\$342, paid by bank, were debited to the machinery account", e: { lines: [["Repairs to machinery", 342, null], ["Machinery", null, 342]], narrative: "Repairs wrongly debited to the machinery account" } },
    { d: "A credit sale of US\\$1,085 to Gweru Butchery was not recorded", e: { lines: [["Gweru Butchery", 1085, null], ["Sales", null, 1085]], narrative: "Credit sale omitted from the books" } },
    { d: "Discount received of US\\$56 from Agro Feeds was debited to discount received and credited to Agro Feeds", e: { lines: [["Agro Feeds", 112, null], ["Discount received", null, 112]], narrative: "Discount received entries reversed" } },
    { d: "Goods costing US\\$245 taken by the owner were debited to the wages account", e: { lines: [["Drawings", 245, null], ["Wages", null, 245]], narrative: "Goods taken by the owner wrongly debited to wages" } },
    { d: "A purchase invoice from Agro Feeds for US\\$2,964 was entered in the purchases journal as US\\$2,694", e: { lines: [["Purchases", 270, null], ["Agro Feeds", null, 270]], narrative: "Purchase invoice understated in the purchases journal" } },
  ];
  const j1 = journal(errs1.map((x) => ({ date: "30 Jun", ...x.e })), { title: "Journal" });
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai runs a poultry farm near Masvingo. His trial balance at 30 June 2025 agreed, but these errors were discovered later:\n\n" + table(["No.", "Error"], errs1.map((x, i) => [String(i + 1), x.d])),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 112, wrong: [56], stem: "State the amount of the correcting entry for error 3.", explanation: "A complete reversal is corrected with twice the amount: $2 \\times 56 = 112$." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 270, wrong: [2964], stem: "State the amount of the correcting entry for error 5.", explanation: "Original entry: correct only the difference, 2,964 − 2,694 = 270." }),
      P.fib({
        label: "(c)", stem: "Complete the correcting entry for error 4.",
        template: "Debit {{blank:a}} US\\$245; credit {{blank:b}} US\\$245.",
        blanks: [{ id: "a", accepted: ["Drawings"], choices: ["Drawings", "Wages", "Purchases", "Capital"] }, { id: "b", accepted: ["Wages"], choices: ["Wages", "Drawings", "Purchases", "Sales"] }],
        explanation: "The goods are drawings; the wrong debit to wages is cancelled by crediting wages.",
      }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries to correct errors 1 to 5. Narratives are required.", points: ["Error 1: debit repairs to machinery 342, credit machinery 342", "Error 2: debit Gweru Butchery 1,085, credit sales 1,085", "Error 3: debit Agro Feeds 112, credit discount received 112", "Error 4: debit drawings 245, credit wages 245", "Error 5: debit purchases 270, credit Agro Feeds 270", "Suitable narratives for the entries"], modelAnswer: j1, explanation: "Use Done / Should have been / Correction for each error." }),
    ],
    hints: ["Original entry: the difference. Reversal: double. Omission: the full entry."],
    explanation: "This item tests correcting each type of error by journal entries.",
  });

  // Practice structured 2: errors and their effect on accounts
  b.struct({
    d: 4, examStyle: true, skill: "ANALYSIS",
    stem: "Rudo runs a clothing shop in Bulawayo. After her trial balance at 30 April 2025 agreed, these errors were found:\n\n" +
      table(["No.", "Error"], [
        ["1", "A payment of US\\$1,460 for a new display cabinet was debited to the purchases account"],
        ["2", "A cheque for US\\$385 received from C. Dube was credited to C. Dhlamini's account"],
        ["3", "Carriage inwards of US\\$93 was debited to the carriage outwards account"],
      ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which entry corrects error 1?",
        options: [["Debit shop fittings; credit purchases", "Correct: move the cabinet from purchases to a non-current asset account."], ["Debit purchases; credit shop fittings", "This moves the amount the wrong way."], ["Debit shop fittings; credit bank", "The bank entry was correct."], ["Debit shop fittings; credit sales", "Sales was not involved."]],
        answer: "A", explanation: "Error of principle: debit the asset, credit purchases.",
      }),
      P.manual({ label: "(b)", marks: 2, stem: "Write the journal entry to correct error 2 (a narrative is not required).", points: ["Debit C. Dhlamini 385", "Credit C. Dube 385"], modelAnswer: "Debit C. Dhlamini 385; credit C. Dube 385.", explanation: "Cancel the wrong credit to Dhlamini and credit Dube." }),
      P.manual({ label: "(c)", marks: 2, stem: "Write the journal entry to correct error 3 (a narrative is not required).", points: ["Debit carriage inwards 93", "Credit carriage outwards 93"], modelAnswer: "Debit carriage inwards 93; credit carriage outwards 93.", explanation: "Both are expenses; move the amount to the correct one." }),
      P.mcq({
        label: "(d)", stem: "What is the effect of correcting error 3 on Rudo's gross profit?",
        options: [["Gross profit decreases by US\\$93", "Correct: carriage inwards is part of cost of sales, so cost of sales rises."], ["Gross profit increases by US\\$93", "Moving a cost into cost of sales lowers gross profit."], ["Gross profit is unchanged", "Carriage inwards is in the trading section; carriage outwards is not."], ["Gross profit decreases by US\\$186", "Only one amount of 93 is moved."]],
        answer: "A", explanation: "Carriage inwards increases cost of sales; carriage outwards is a profit and loss expense. Gross profit falls by 93; profit for the year is unchanged.",
      }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why error 2 should be corrected even though it does not affect profit.", points: ["Both customers' balances are wrong: C. Dube owes 385 less than shown, C. Dhlamini 385 more", "Wrong statements / Dube could be asked to pay again or Dhlamini's debt might not be collected"], modelAnswer: "C. Dube's account still shows the 385 as owing, and C. Dhlamini's shows 385 less than he owes. Dube could be asked to pay twice and Dhlamini's debt might go uncollected.", explanation: "Personal accounts must be correct for credit control." }),
    ],
    hints: ["Bank was right in errors 1 and 2."],
    explanation: "This item tests correcting errors of principle and commission and their effects.",
  });

  b.card("CONCEPT", "Three-step method for correcting errors", "Write what was done, what should have been done, then the correction that turns one into the other.");
  b.card("FACT", "Correcting an error of omission", "Make the full original double entry.");
  b.card("FACT", "Correcting an error of commission", "Debit/credit the correct account and reverse the wrong one; the other side (e.g. bank) is not touched.");
  b.card("FACT", "Correcting an error of principle", "Move the amount from the wrong class of account to the right one, e.g. debit equipment, credit repairs.");
  b.card("FACT", "Correcting an error of original entry", "Adjust both accounts by the difference between the correct and recorded amounts.");
  b.card("FACT", "Correcting a complete reversal", "Use twice the amount on the correct sides.");
  b.card("FACT", "Correcting a compensating error", "Adjust each wrong account by the amount of the error.");
  b.card("DEFINITION", "Narrative", "A short explanation under a journal entry stating why the entry is made.");
  b.card("FACT", "Goods taken by the owner", "Debit drawings, credit purchases (at cost).");
});
