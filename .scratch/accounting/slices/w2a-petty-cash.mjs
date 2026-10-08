// W2a: the petty cash book and the imprest system.
import { concept, P, money, check, sum, r2, CAM } from "../lib.mjs";
// Figures quoted in explanations are checked below with check().
import { pettyCash, table } from "../tables/w2a-lib.mjs";

concept("acc.books.petty-cash", { file: "books/petty-cash", keyPrefix: "books.petty-cash" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a petty cash book?",
    options: [
      ["To record small everyday cash payments", "Correct: petty cash handles small payments such as postage and bus fares."],
      ["To record all credit sales of the business", "Credit sales are recorded in the sales journal."],
      ["To record the business's bank transfers", "Bank transfers go in the bank column of the cash book."],
      ["To record the owner's capital", "Capital is recorded in the capital account."],
    ],
    answer: "A",
    explanation: "Petty cash keeps small payments out of the main cash book and lets a junior member of staff deal with them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A petty cashier works on an imprest of US\\$300. At the end of the month US\\$46 is left in the cash box. How much is given to the petty cashier to restore the imprest?",
    options: [
      ["US\\$254", "Correct: 300 − 46 = 254, the amount spent."],
      ["US\\$300", "This is the full imprest; only the amount spent is given back."],
      ["US\\$46", "This is the cash left, not the amount spent."],
      ["US\\$346", "This adds the cash left to the imprest."],
    ],
    answer: "A",
    explanation: "Under the imprest system the float is restored by the amount spent: $300 - 46 = 254$.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which document supports each payment out of petty cash?",
    options: [
      ["A petty cash voucher", "Correct: a numbered, signed and authorised voucher."],
      ["A credit note", "Credit notes record returns or allowances."],
      ["A paying-in slip", "Paying-in slips are used to deposit money at the bank."],
      ["A sales invoice", "Sales invoices record credit sales."],
    ],
    answer: "A",
    explanation: "Each petty cash payment needs a voucher signed by the person paid and authorised by a manager, with a receipt attached where possible.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "At the end of the month, how is the total of the **travel** column in an analysed petty cash book posted?",
    options: [
      ["To the debit of the travel expenses account", "Correct: an expense is debited with the column total."],
      ["To the credit of the travel expenses account", "Expenses increase on the debit side."],
      ["To the credit of the bank column of the cash book", "The bank is credited only when the float is restored."],
      ["To the debit of the petty cash book", "The petty cash book is credited with payments, not debited."],
    ],
    answer: "A",
    explanation: "Analysis column totals are debited to the matching expense accounts.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The petty cashier paid US\\$38 to Kwekwe Stationers, a supplier, to settle their account. In which column of the analysed petty cash book is it entered, besides the total column?",
    options: [
      ["The ledger column", "Correct: payments to personal accounts go in the ledger column."],
      ["The stationery column", "The business is settling a debt, not buying stationery now."],
      ["The receipts column", "This is a payment, not a receipt."],
      ["It is not entered; suppliers are paid from the cash book only", "Small supplier balances can be settled from petty cash."],
    ],
    answer: "A",
    hints: ["Is this a new expense, or the payment of an amount owed?"],
    explanation: "Paying a supplier reduces a liability. It goes in the **ledger** column and is posted to the debit of Kwekwe Stationers' account.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "At a surprise check, a petty cashier with an imprest of US\\$200 has US\\$63 in the box and vouchers totalling US\\$129. What does this show?",
    options: [
      ["US\\$8 is missing", "Correct: cash plus vouchers should equal 200; 63 + 129 = 192."],
      ["The petty cash is correct", "Cash plus vouchers is 192, not 200."],
      ["There is US\\$8 too much in the box", "There is less, not more, than expected."],
      ["US\\$137 is missing", "This subtracts the cash from the imprest and ignores the vouchers."],
    ],
    answer: "A",
    hints: ["Under the imprest system, cash + vouchers = imprest at all times."],
    explanation: "$63 + 129 = 192$; $200 - 192 = 8$. Either a voucher is missing or US\\$8 has been lost or taken, and the difference must be investigated.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "When the petty cash float is restored by bank transfer, which entry is made in the main cash book?",
    options: [
      ["Credit the bank column", "Correct: money leaves the bank to top up petty cash."],
      ["Debit the bank column", "The bank balance falls, so the bank column is credited."],
      ["Debit the cash column", "The money goes to the petty cash book, not the main cash column."],
      ["No entry, because petty cash is part of the cash book", "The petty cash book is separate; the bank payment must be recorded."],
    ],
    answer: "A",
    hints: ["Does the bank balance go up or down?"],
    explanation: "Restoring the imprest is a payment from the bank (credit bank in the cash book) and a receipt in the petty cash book.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION", applies: CAM,
    stem: "Which is a **limitation** of keeping cash on the business premises?",
    options: [
      ["Cash on the premises can be stolen or misused", "Correct: this is the main risk of holding cash."],
      ["Small expenses can be paid immediately", "This is a benefit of keeping petty cash."],
      ["Senior staff save time by checking vouchers only once a period", "This is a benefit of the imprest system."],
      ["The main cash book is not cluttered with small payments", "This is a benefit, not a limitation."],
    ],
    answer: "A",
    hints: ["Three options describe advantages."],
    explanation: "Cash can be lost, stolen or misused, earns no interest and costs time to count and secure. The imprest system limits these risks by keeping the float small.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the imprest system, the petty cashier starts each period with the same fixed amount of cash.",
    answer: true,
    explanation: "True. The float is restored to the imprest at the start of each period.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an analysed petty cash book, the totals of the analysis columns should add up to the total of the payments column.",
    answer: true,
    explanation: "True. Each payment is entered in the total column and in one analysis column, so the totals must cross-check.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Gweru Printers analyses petty cash into postage, travel, cleaning, refreshments and ledger columns. Match each payment with its column.",
    pairs: ["Courier fee for sending proofs", "Kombi fare to the bank", "Floor polish", "Tea and sugar for staff", "Payment to a supplier, Rudo Mpofu"],
    right: ["Postage", "Travel", "Cleaning", "Refreshments", "Ledger"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each payment goes in the column for its type of expense; payments of amounts owed to suppliers go in the ledger column.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the rule.",
    template: "Under the imprest system, at any time, the cash in the petty cash box plus the total of the {{blank:a}} equals the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["vouchers"], choices: ["vouchers", "invoices", "receipts column"] },
      { id: "b", accepted: ["imprest"], choices: ["imprest", "bank balance", "capital"] },
    ],
    explanation: "Cash + vouchers = imprest, which allows a quick surprise check.",
  });

  // Calculations
  const c1 = pettyCash("x", {
    receipts: [["1 Mar", "Bank", 180]],
    payments: [["3 Mar", "Stamps", "1", "Postage", 12.5], ["8 Mar", "Bus fare", "2", "Travel", 9], ["12 Mar", "Detergent", "3", "Cleaning", 17.25], ["19 Mar", "Kombi fares", "4", "Travel", 15], ["25 Mar", "Courier", "5", "Postage", 26], ["29 Mar", "Mop", "6", "Cleaning", 11.75]],
    cols: ["Postage", "Travel", "Cleaning"], imprest: 180,
  });
  check("c1", c1.paid, 91.5);
  check("c1 bal", c1.balance, 88.5);
  b.calc({
    d: 3, kind: "money", value: c1.balance, calculator: true, wrong: [c1.paid, r2(c1.balance - 12.5)],
    stem: "Chipo's petty cash imprest is US\\$180. In March she paid: stamps US\\$12.50, bus fare US\\$9, detergent US\\$17.25, kombi fares US\\$15, courier US\\$26 and a mop US\\$11.75. Calculate the balance of petty cash at the end of March.",
    hints: ["Total the payments first."],
    explanation: `Payments $12.50 + 9 + 17.25 + 15 + 26 + 11.75 = 91.50$. Balance $180 - 91.50 = 88.50$, so ${money(c1.balance)}. ${money(c1.paid)} is the amount spent (and the amount needed to restore the float), not the balance.`,
  });
  const cl = [8.4, 13.6, 25];
  b.num({
    d: 2, kind: "money", value: sum(cl), wrong: [r2(sum(cl) + 16)],
    stem: "Farai's petty cash payments in May were: soap US\\$8.40 (cleaning), postage stamps US\\$16 (postage), a broom US\\$13.60 (cleaning) and the cleaner's wages US\\$25 (cleaning). Calculate the total of his **cleaning** column.",
    explanation: `Cleaning: $8.40 + 13.60 + 25 = 47$, so ${money(sum(cl))}. The stamps belong in the postage column; including them gives ${money(r2(sum(cl) + 16))}.`,
  });
  // Imprest change
  const oldImp = 150;
  const newImp = 220;
  const left = 31.4;
  const give = r2(newImp - left);
  b.calc({
    d: 4, kind: "money", value: give, calculator: true, wrong: [r2(oldImp - left), r2(newImp - oldImp)],
    stem: "Sipho's imprest was US\\$150. At the end of June US\\$31.40 was left in the box. The owner decided to raise the imprest to US\\$220 from 1 July. How much must be transferred from the bank on 1 July?",
    hints: ["The float must reach the new imprest, starting from the cash left."],
    explanation: `New imprest − cash left $= 220 - 31.40 = ${give}$, so ${money(give)}. This is the amount spent (${money(r2(oldImp - left))}) plus the increase (${money(newImp - oldImp)}).`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **three** ways in which the imprest system helps a business control its petty cash.",
    points: ["Only a small fixed amount is at risk at any time", "Every payment needs an authorised voucher, so spending can be checked", "Cash plus vouchers must equal the imprest, so surprise checks quickly show any shortage / the float is restored only after vouchers are checked"],
    modelAnswer: "The float is small, so losses are limited. Each payment is backed by a voucher signed and authorised, which the chief cashier checks before restoring the float. Because cash plus vouchers must always equal the imprest, a shortage is found quickly at a spot check.",
    hints: ["Think about the size of the float, the vouchers and the check."],
    explanation: "Control comes from the small fixed float, documentation and the reconciliation of cash and vouchers.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: CAM,
    stem: "Thandeka's shop keeps US\\$1,500 in petty cash so she never runs short. Evaluate this decision and recommend whether she should change it.",
    points: ["Benefit: she can always pay small expenses immediately", "Limitation: a large amount is at risk of theft or misuse", "Limitation: the money earns nothing and could be used elsewhere / costs of security and insurance", "Recommendation with reason: reduce the imprest to about one month's small payments and use bank transfers for larger items"],
    modelAnswer: "Holding US\\$1,500 means small bills are never delayed. But it is a large sum to lose to theft, it earns no interest and it ties up money she could use to buy inventory. She should reduce the float to what she spends in a month, keep vouchers and pay larger items by bank transfer.",
    hints: ["Weigh convenience against risk, then decide."],
    explanation: "An evaluation needs both sides and a justified conclusion.",
  });

  // Practice structured 1: analysed petty cash book
  const s1pay = [["2 Oct", "Stamps", "41", "Postage", 24.5], ["5 Oct", "Taxi to bank", "42", "Travel", 18.5], ["9 Oct", "Tea and milk", "43", "Refreshments", 14.75], ["13 Oct", "Paid Mutasa Stores", "44", "Ledger", 62], ["16 Oct", "Courier", "45", "Postage", 27.5], ["20 Oct", "Bus fares", "46", "Travel", 19], ["25 Oct", "Biscuits for visitors", "47", "Refreshments", 9.25], ["28 Oct", "Parcel post", "48", "Postage", 33]];
  const s1 = pettyCash("Petty cash book (October 2025)", {
    receipts: [["1 Oct", "Bank", 320]],
    payments: s1pay,
    cols: ["Postage", "Travel", "Refreshments", "Ledger"], imprest: 320, cdDate: "31 Oct", bdDate: "1 Nov", restoreDate: "1 Nov",
  });
  check("s1 paid", s1.paid, 208.5);
  check("s1 cols", sum(s1.colTotals), 85 + 37.5 + 24 + 62);
  check("s1 bal", s1.balance, 111.5);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tendai keeps an analysed petty cash book on the imprest system for his transport office in Bulawayo, with columns for postage, travel, refreshments and ledger. The imprest is US\\$320, received from the bank on 1 October 2025. Payments in October were:\n\n" +
      table(["Date", "Details", "Voucher", "US\\$"], s1pay.map((p) => [p[0], p[1] === "Paid Mutasa Stores" ? "Paid Mutasa Stores (a supplier)" : p[1], p[2], p[4]])),
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s1.colTotals[0], wrong: [r2(24.5 + 33)], stem: "Calculate the total of the postage column.", explanation: "$24.50 + 27.50 + 33 = 85$." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: s1.paid, wrong: [r2(s1.paid - 62)], stem: "Calculate the total payments for October.", explanation: `All eight vouchers total ${money(s1.paid)}. Leaving out the ledger payment gives ${money(r2(s1.paid - 62))}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: s1.balance, wrong: [s1.paid], stem: "Calculate the balance carried down at the end of October.", explanation: "$320 - 208.50 = 111.50$." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare Tendai's petty cash book for October 2025, showing the restoration of the imprest on 1 November.", points: ["Receipt 320 from bank on 1 Oct", "Each payment in the total column with voucher numbers", "Each payment in the correct analysis column", "Column totals: postage 85, travel 37.50, refreshments 24, ledger 62; total 208.50", "Balance c/d 111.50 and totals 320", "Balance b/d 111.50 and bank 208.50 received on 1 Nov"], modelAnswer: s1.md, explanation: "Analysis totals cross-check: 85 + 37.50 + 24 + 62 = 208.50." }),
      P.mcq({
        label: "(e)", stem: "Which ledger entry is made for the US\\$62 in the ledger column?",
        options: [["Debit Mutasa Stores' account US\\$62", "Correct: the amount owed to the supplier falls."], ["Credit Mutasa Stores' account US\\$62", "Crediting the supplier would increase the amount owed."], ["Debit the purchases account US\\$62", "The goods were already recorded when bought on credit."], ["Credit the bank column US\\$62", "The bank is credited only when the imprest is restored, with the full amount spent."]],
        answer: "A", explanation: "Ledger column items are debited to the suppliers' personal accounts.",
      }),
    ],
    hints: ["Each payment goes in the total column and one analysis column.", "Amount to restore = imprest − balance."],
    explanation: "This item tests writing up, balancing and restoring an analysed petty cash book.",
  });

  // Practice structured 2: imprest shortages and posting
  const s2 = { imprest: 250, cash: 41.6, post: 38.4, clean: 52, stat: 66.5, travel: 44 };
  const s2spent = r2(s2.post + s2.clean + s2.stat + s2.travel);
  const s2short = r2(s2.imprest - s2.cash - s2spent);
  check("s2 short", s2short, 7.5);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: `Rudo runs a secretarial college in Harare. Her petty cash imprest is ${money(s2.imprest)}. On 30 November 2025 the analysed petty cash book showed these column totals: postage ${money(s2.post)}, cleaning ${money(s2.clean)}, stationery ${money(s2.stat)} and travel ${money(s2.travel)}. The cash in the box was counted at ${money(s2.cash)}.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s2spent, wrong: [r2(s2.imprest - s2.cash)], stem: "Calculate the total spent according to the vouchers.", explanation: `$38.40 + 52 + 66.50 + 44 = ${s2spent}$.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2short, wrong: [r2(s2.imprest - s2spent)], stem: "Calculate the amount of cash missing.", explanation: `Cash should be $250 - ${s2spent} = ${r2(s2.imprest - s2spent)}$; counted ${s2.cash}; missing $${r2(s2.imprest - s2spent)} - 41.60 = ${s2short}$.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: r2(s2.imprest - s2.cash), wrong: [s2spent], stem: "How much must be paid from the bank on 1 December to restore the imprest?", explanation: `Imprest − cash actually left $= 250 - 41.60 = ${r2(s2.imprest - s2.cash)}$. The float must reach US\\$250 whatever caused the shortage.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Name the account debited with each of the postage and stationery totals, and state the entry for the bank payment on 1 December.", points: ["Debit postage account 38.40 and stationery account 66.50", "Credit the bank column of the cash book with 208.40 (debit/receipt in the petty cash book)"], modelAnswer: "Debit postage US\\$38.40 and stationery US\\$66.50; credit bank in the cash book US\\$208.40 and record it as a receipt in the petty cash book.", explanation: "Analysis totals go to expense accounts; the restoration is a bank payment." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** actions Rudo should take about the missing cash.", points: ["Investigate: check for a missing or unrecorded voucher / question the petty cashier", "Tighten control: surprise checks, locked box, authorised vouchers only, reduce the imprest or change the cashier"], modelAnswer: "First look for a missing voucher and question the petty cashier. Then carry out regular surprise checks and allow payments only against authorised vouchers.", explanation: "Shortages must be investigated and controls improved." }),
    ],
    hints: ["Cash + vouchers should equal the imprest.", "The restoration brings the cash back to the imprest."],
    explanation: "This item tests the imprest check, restoration and posting of petty cash totals.",
  });

  b.card("DEFINITION", "What is the **imprest system**?", "Petty cash starts each period with a fixed float; the amount spent is reimbursed at the end of the period to restore the float.");
  b.card("FORMULA", "Amount to restore the imprest", "Imprest − cash left (= total spent, if nothing is missing).");
  b.card("FACT", "Imprest check", "Cash in the box + vouchers = imprest, at any time.");
  b.card("DEFINITION", "What is a **petty cash voucher**?", "A numbered form, signed by the payee and authorised by a manager, supporting each petty cash payment.");
  b.card("FACT", "Posting analysis column totals", "Debit each expense account (postage, travel, cleaning ...) with its column total.");
  b.card("FACT", "Posting the ledger column", "Debit each supplier's personal account with the amount paid.");
  b.card("FACT", "Restoring the float by bank transfer", "Credit bank in the cash book; receipt in the petty cash book.");
  b.card("CONCEPT", "Benefits of keeping petty cash", "Small payments made quickly; main cash book not cluttered; senior staff save time; expense analysis.");
  b.card("CONCEPT", "Limitations of keeping cash on the premises", "Risk of theft or misuse; no interest earned; time and cost of security and counting.", undefined, { applies: CAM });
});
