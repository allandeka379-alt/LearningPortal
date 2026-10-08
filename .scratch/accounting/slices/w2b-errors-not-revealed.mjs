// W2b: errors that do not affect the trial balance.
import { concept, P, money, trialBalance, r2 } from "../lib.mjs";
import { table } from "../tables/w2b-lib.mjs";

concept("acc.verification.errors-not-revealed", { file: "verification/errors-not-revealed", keyPrefix: "verification.errors-not-revealed" }, (b) => {
  const TYPES = ["Error of omission", "Error of commission", "Error of principle", "Error of original entry", "Complete reversal of entries", "Compensating error"];
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Repairs to a delivery van costing US\\$265 were debited to the motor vehicles account. What type of error is this?",
    options: [
      ["Error of principle", "Correct: revenue expenditure (an expense) was treated as a non-current asset."],
      ["Error of commission", "Commission uses the wrong account of the same class; here the class itself is wrong."],
      ["Error of original entry", "The amount is correct, so this is not an original-entry error."],
      ["Error of omission", "The transaction was recorded, so nothing was omitted."],
    ],
    answer: "A",
    explanation: "Repairs are revenue expenditure (an expense account). Debiting an asset account puts the amount in the wrong class of account: an error of principle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cash of US\\$184 received from T. Gumbo was credited to the account of T. Gumede, another customer. What type of error is this?",
    options: [
      ["Error of commission", "Correct: the right type of account (a trade receivable) but the wrong one."],
      ["Error of principle", "Both accounts are customers' accounts, so the class of account is right."],
      ["Complete reversal of entries", "The sides are correct; only the customer is wrong."],
      ["Compensating error", "There is only one error here, not two that cancel."],
    ],
    answer: "A",
    explanation: "Both customers are in the sales (trade receivables) ledger, so the posting is in the correct class but the wrong account: an error of commission.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A purchase invoice for US\\$3,047 was entered in the purchases journal as US\\$3,074 and posted from there. What type of error is this?",
    options: [
      ["Error of original entry", "Correct: the wrong amount was recorded in the book of prime entry, so both postings use 3,074."],
      ["Error of commission", "The accounts are correct; only the amount is wrong."],
      ["Compensating error", "A compensating error needs two separate errors that cancel."],
      ["Complete reversal of entries", "The sides are correct; the amount is wrong."],
    ],
    answer: "A",
    explanation: "Because the wrong figure was entered in the book of prime entry, the supplier is credited and purchases debited with the same wrong amount. The trial balance still agrees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Discount received of US\\$76 was debited to the discount received account and credited to the supplier's account. What type of error is this?",
    options: [
      ["Complete reversal of entries", "Correct: the right accounts and amount, but the debit and credit are swapped."],
      ["Error of principle", "The class of account is correct."],
      ["Error of original entry", "The amount is correct."],
      ["Error of commission", "The right accounts were used, just on the wrong sides."],
    ],
    answer: "A",
    explanation: "Discount received should be debited to the supplier and credited to discount received. Swapping both sides is a complete reversal.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A sales invoice was lost before it was entered in the books. Which type of error is this?",
    options: [
      ["Error of omission", "Correct: neither the debit nor the credit was recorded."],
      ["Error of original entry", "Original entry means a wrong amount was recorded, not nothing."],
      ["Error of commission", "Commission means the wrong account was used; here no account was used."],
      ["Compensating error", "Nothing cancels here; the transaction is simply missing."],
    ],
    answer: "A",
    explanation: "A transaction left out completely is an error of omission; both totals are understated by the same amount.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which error **will** cause the trial balance totals to disagree?",
    options: [
      ["Rent of US\\$350 debited to rent and also debited to bank", "Correct: two debits and no credit, so the debit total is too high."],
      ["Rent of US\\$350 debited to wages and credited to bank", "Wrong expense account but equal debit and credit: an error of commission."],
      ["Rent of US\\$350 debited to bank and credited to rent", "A complete reversal: equal amounts on each side."],
      ["Rent of US\\$350 never recorded", "Omission: neither side is recorded, so the totals agree."],
    ],
    answer: "A",
    hints: ["Look for an entry where the debits no longer equal the credits."],
    explanation: "Two entries on the same side make the debits exceed the credits by $2 \\times 350 = 700$, so the trial balance is out. The other three are errors not revealed by the trial balance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The sales journal was undercast by US\\$500 and the wages account was also undercast by US\\$500. The trial balance agreed. What type of error is this?",
    options: [
      ["Compensating error", "Correct: a credit total and a debit total are both short by 500, so they cancel."],
      ["Error of omission", "The transactions were recorded; the additions were wrong."],
      ["Error of original entry", "The source documents were recorded at the right amounts."],
      ["Error of principle", "No entry was made in the wrong class of account."],
    ],
    answer: "A",
    hints: ["Sales is a credit balance; wages is a debit balance."],
    explanation: "Sales (credit) is 500 too low and wages (debit) is 500 too low, so both totals fall by 500 and still agree: a compensating error.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods taken by the owner for private use were debited to the purchases account. What type of error is this?",
    options: [
      ["Error of principle", "Correct: drawings (owner's account) were treated as a business expense."],
      ["Error of commission", "Purchases and drawings are different classes of account."],
      ["Error of omission", "An entry was made, so nothing was omitted."],
      ["Complete reversal of entries", "Purchases is never the correct account to debit here, so this is not a reversal."],
    ],
    answer: "A",
    explanation: "Goods taken by the owner are drawings: debit drawings, credit purchases. Recording them as purchases confuses the owner's private items with business expenses, an error of principle.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A credit sale of US\\$639 to Chipo was entered in the sales journal as US\\$693. By how much are Chipo's account and the sales account each misstated?",
    options: [
      ["Each is overstated by US\\$54", "Correct: 693 − 639 = 54 on both accounts."],
      ["Each is understated by US\\$54", "693 is more than the correct 639, so both are too high."],
      ["Each is overstated by US\\$108", "The difference is counted once on each account, not doubled."],
      ["Only the sales account is overstated by US\\$54", "Both entries were posted from the journal with the wrong figure."],
    ],
    answer: "A",
    hints: ["Both postings come from the same wrong figure in the journal."],
    explanation: "This is an error of original entry: debit Chipo 693 and credit sales 693 instead of 639. Each account is overstated by $693 - 639 = 54$, and the trial balance still agrees.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "An error of commission causes the trial balance totals to disagree.",
    answer: false,
    explanation: "False. In an error of commission the correct amount is debited and credited, only in the wrong account of the same type, so the totals agree.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An error of principle can cause the profit for the year to be wrong even though the trial balance agrees.",
    answer: true,
    explanation: "True. Treating a non-current asset as an expense (or an expense as an asset) moves an amount between the income statement and the statement of financial position, so profit is misstated.",
  });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Tendai's bookkeeper made six errors in the books of his Harare printing business. Match each error with its type.",
    pairs: [
      "A cheque for US\\$420 paid to Kanda Paper was never recorded",
      "A printer bought for the office was debited to the purchases account",
      "A sale of US\\$1,384 was entered in the sales journal as US\\$1,348",
      "Rent received of US\\$600 was debited to rent received and credited to bank",
      "Payment from Nyoni Bros was credited to Nyoni Traders",
      "Discount allowed and sales were both overcast by US\\$100",
    ],
    right: TYPES,
    rightIndex: [0, 2, 3, 4, 1, 5],
    hints: ["Ask: amount wrong, side wrong, account wrong, class wrong, or nothing recorded?"],
    explanation: "Nothing recorded: omission. Asset treated as purchases: principle. Wrong amount in the journal: original entry. Sides swapped: complete reversal. Wrong customer: commission. Two errors that cancel (a debit and a credit balance both overcast by 100): compensating.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "In an error of {{blank:a}} the correct amount is posted to the correct accounts but on the opposite sides. In an error of {{blank:b}} the wrong amount is used for both the debit and the credit entry.",
    blanks: [
      { id: "a", accepted: ["complete reversal"], choices: ["complete reversal", "commission", "omission", "principle"] },
      { id: "b", accepted: ["original entry"], choices: ["original entry", "principle", "commission", "omission"] },
    ],
    explanation: "Reversal: right amount, sides swapped. Original entry: wrong amount on both sides.",
  });

  // Numerical: effect on totals of an error of omission
  const tbRows = [["Capital", null, 9400], ["Equipment", 5870, null], ["Purchases", 7615, null], ["Sales", null, 11960], ["Trade receivables", 2140, null], ["Trade payables", null, 1735], ["Bank", 4130, null], ["Wages", 3340, null]];
  const tbx = trialBalance("x", tbRows);
  const omitted = 865;
  b.num({
    d: 3, kind: "money", value: r2(tbx.debit + omitted), calculator: true, wrong: [tbx.debit, r2(tbx.debit + 2 * omitted)],
    stem: `Sipho's trial balance at 30 June 2025 agrees with totals of ${money(tbx.debit)}. A credit purchase of goods for ${money(omitted)} from Mpofu Wholesalers had been omitted completely. When the purchase is recorded, what will each total of the trial balance be?`,
    hints: ["An omission leaves out a debit and a credit of the same amount."],
    explanation: `Recording the purchase adds ${omitted} to purchases (debit) and ${omitted} to trade payables (credit). Each total becomes ${tbx.debit.toLocaleString("en-GB")} + ${omitted} = ${money(r2(tbx.debit + omitted))}. Adding it twice to one side would put the totals out of agreement.`,
  });
  b.num({
    d: 3, kind: "money", value: 900, calculator: true, wrong: [450],
    stem: "Cash sales of US\\$450 were debited to the sales account and credited to the cash account. By how much is the sales account balance misstated compared with the correct balance?",
    hints: ["Should sales have a debit or a credit of 450? What did it get instead?"],
    explanation: "Sales should have been credited with 450; instead it was debited with 450. The balance is wrong by $2 \\times 450 = 900$ (understated). This complete reversal does not affect the trial balance agreement because cash is equally wrong in the other direction.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by an **error of principle** and give an example.",
    points: ["An amount posted to the wrong class / type of account (e.g. capital expenditure treated as revenue expenditure)", "A valid example, e.g. a computer for office use debited to office expenses, or motor repairs debited to motor vehicles"],
    modelAnswer: "An error of principle is an entry made in the wrong class of account, for example the purchase of a computer for office use debited to the office expenses account instead of office equipment.",
    explanation: "Principle errors confuse assets with expenses, capital with revenue, or drawings with business expenses.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "Explain why an error of original entry is **not** revealed by the trial balance.",
    points: ["The wrong amount is entered in the book of prime entry / on the document", "So both the debit and the credit are posted with the same (wrong) amount, and the totals still agree"],
    modelAnswer: "The wrong figure is entered in the book of prime entry, so both the debit and the credit entries are made with that same wrong figure; the debit and credit totals change equally and still agree.",
    hints: ["Where does the wrong figure first appear?"],
    explanation: "The trial balance compares totals only; equal wrong amounts on both sides do not upset the agreement.",
  });

  // Practice structured 1: identify and explain
  b.struct({
    d: 3, examStyle: true, skill: "ANALYSIS",
    stem: "Thandeka runs a poultry project near Chinhoyi. Her trial balance at 30 April 2025 agreed, but her accountant found these errors:\n\n" +
      table(["Error", "Details"], [
        ["1", "A cheque of US\\$1,175 from Bvumba Hotel, a customer, was credited to the account of Bvumba Lodge, another customer"],
        ["2", "Feed bought on credit from Gweru Millers for US\\$2,086 was entered in the purchases journal as US\\$2,068"],
        ["3", "A new incubator costing US\\$1,940, paid by bank transfer, was debited to the repairs account"],
        ["4", "Electricity of US\\$137 paid in cash was not recorded at all"],
      ]),
    parts: [
      P.match({ label: "(a)", stem: "Match each error with its type.", pairs: ["Error 1", "Error 2", "Error 3", "Error 4"], right: TYPES, rightIndex: [1, 3, 2, 0], explanation: "1: wrong customer (commission). 2: wrong amount in the journal (original entry). 3: asset treated as an expense (principle). 4: not recorded (omission)." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 18, wrong: [36], stem: "By how much is the purchases account understated as a result of error 2?", explanation: "$2,086 - 2,068 = 18$. The supplier's account is understated by the same 18." }),
      P.mcq({
        label: "(c)", stem: "What is the effect of error 3 on the profit for the year?",
        options: [["Profit is understated by US\\$1,940", "Correct: an asset was charged as an expense, so expenses are too high."], ["Profit is overstated by US\\$1,940", "Expenses are too high, which lowers profit."], ["Profit is not affected because the trial balance agreed", "Agreement does not mean profit is right."], ["Profit is understated by US\\$3,880", "The amount is charged once, not twice."]],
        answer: "A", explanation: "Repairs (an expense) is overstated by 1,940, so profit is understated by 1,940, and non-current assets are understated by 1,940.",
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why **each** of errors 1 and 4 did not prevent the trial balance from agreeing.", points: ["Error 1: the correct amount was credited (to a customer's account)", "so the debit and credit totals are unchanged / equal", "Error 4: neither the debit (electricity) nor the credit (cash) was recorded", "so both totals are understated by the same 137 and still agree"], modelAnswer: "Error 1: bank was debited and a customer was credited with 1,175, the right amount on each side, so the totals are unaffected even though the wrong customer was credited. Error 4: neither electricity nor cash was recorded, so both totals are 137 too low and still agree.", explanation: "Errors not revealed affect both totals equally or not at all." }),
    ],
    hints: ["For each error ask what happened to the debit and to the credit."],
    explanation: "This item tests identifying the six types and explaining why they are not revealed.",
  });

  // Practice structured 2: revealed vs not revealed
  b.struct({
    d: 4, examStyle: true, skill: "EVALUATION",
    stem: "Tatenda's transport business in Mutare has prepared a trial balance at 30 September 2025 that agrees. His bookkeeper lists these possible errors:\n\n" +
      table(["Error", "Details"], [
        ["A", "Fuel of US\\$318 was debited to the fuel account and also debited to the bank account"],
        ["B", "A payment of US\\$905 to Dube Tyres was debited to Dube Motors' account"],
        ["C", "The total of the sales journal, US\\$7,460, was not posted to the sales account"],
        ["D", "Wages of US\\$2,250 were debited to the bank account and credited to the wages account"],
        ["E", "The purchases account was undercast (added up short) by US\\$200"],
      ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which **two** errors could exist even though the trial balance agrees?",
        multiple: true, marks: 2,
        options: [["Error A", "Two debits and no credit: the debit total would be 636 too high."], ["Error B", "Correct: an error of commission."], ["Error C", "A missing credit of 7,460 would leave the credit total short."], ["Error D", "Correct: a complete reversal of entries."], ["Error E", "An uncancelled casting error leaves the debit total 200 short."]],
        answer: ["B", "D"], explanation: "B (commission) and D (complete reversal) keep the debit and credit totals equal; A and C are single-sided and E is an uncancelled casting error, so they would make the trial balance disagree.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 636, wrong: [318], stem: "If error A had been made, by how much would the debit total exceed the credit total?", explanation: "Bank should have been credited with 318 but was debited with 318: debits are too high by $2 \\times 318 = 636$." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: 4500, wrong: [2250], stem: "Error D was made. By how much is the wages account balance misstated?", explanation: "Wages should have a debit of 2,250 but has a credit of 2,250: it is wrong by $2 \\times 2,250 = 4,500$ (understated)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Tatenda says that because his trial balance agrees he does not need to check his customers' and suppliers' accounts. Advise him.", points: ["He should still check / his view is wrong", "Errors such as commission (error B) leave the totals in agreement but put amounts in the wrong personal accounts", "Consequence: suppliers or customers receive wrong statements / he could pay or chase the wrong amounts, so he should compare statements with the accounts"], modelAnswer: "He should still check them. An error of commission, such as the payment to Dube Tyres posted to Dube Motors, does not affect the trial balance but leaves both suppliers' balances wrong. He might pay Dube Tyres twice or dispute a correct statement, so he should compare suppliers' statements with their accounts.", explanation: "Agreement shows arithmetical accuracy only." }),
    ],
    hints: ["An error is not revealed only if the debit and credit totals change equally."],
    explanation: "This item tests telling revealed errors from errors not revealed, and evaluating reliance on the trial balance.",
  });

  b.card("DEFINITION", "Error of omission", "A transaction left out completely: no debit and no credit. Trial balance still agrees.");
  b.card("DEFINITION", "Error of commission", "Correct amount and side, but the wrong account of the same class (e.g. the wrong customer).");
  b.card("DEFINITION", "Error of principle", "An amount posted to the wrong class of account, e.g. a non-current asset debited to an expense.");
  b.card("DEFINITION", "Error of original entry", "The wrong amount entered in the book of prime entry, so both debit and credit use the wrong figure.");
  b.card("DEFINITION", "Complete reversal of entries", "Correct accounts and amount, but the debit and credit sides are swapped.");
  b.card("DEFINITION", "Compensating error", "Two or more errors of the same amount that cancel each other out in the trial balance.");
  b.card("FACT", "Mnemonic for the six errors", "Old Cats Pounce On Cold Rats: Omission, Commission, Principle, Original entry, Compensating, Reversal.");
  b.card("CONCEPT", "Why are the six errors not revealed?", "Each one changes the debit and credit totals by the same amount, or not at all, so the totals still agree.");
  b.card("FACT", "Which errors ARE revealed by a trial balance?", "Single-sided entries, unequal amounts, two entries on one side, uncancelled casting errors, balances omitted or misplaced in the trial balance.");
});
