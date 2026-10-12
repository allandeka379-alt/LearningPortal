// W1b: verification.errors
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, journal } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.verification.errors", { file: "verification/errors", keyPrefix: "verification.errors" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A credit sale is not recorded in the books at all. What type of error is this?",
    right: ["Error of omission", "Correct: both entries were left out."],
    wrong: [["Error of commission", "Commission is an entry in the wrong account of the same class."], ["Error of principle", "Principle breaks an accounting rule by using the wrong class of account."], ["Compensating error", "A compensating error needs two errors that cancel."]],
    explanation: "A transaction left out completely is an error of omission. The trial balance still agrees.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rent of US\\$400 is debited to the rates account by mistake. What type of error is this?",
    right: ["Error of commission", "Correct: both are expense accounts, so the entry is in the wrong account of the same class."],
    wrong: [["Error of principle", "Both accounts are expenses; no principle is broken."], ["Error of original entry", "The amount is correct on both sides."], ["Error of omission", "The transaction was recorded."]],
    explanation: "An entry in the wrong account of the same class (expense for expense) is an error of commission.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The purchase of a delivery van is debited to the motor expenses account. What type of error is this?",
    right: ["Error of principle", "Correct: a capital item has been treated as a revenue expense."],
    wrong: [["Error of commission", "Commission would be the wrong account of the same class; a van is a non-current asset."], ["Error of omission", "The transaction has been recorded."], ["Reversal of entries", "The debit and credit sides are not swapped."]],
    explanation: "Treating capital expenditure as revenue expenditure breaks an accounting principle.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A sales invoice for US\\$1,260 is recorded as US\\$1,620 in both the sales account and the customer's account. What type of error is this?",
    right: ["Error of original entry", "Correct: the wrong amount was used for both entries."],
    wrong: [["Compensating error", "A compensating error needs two separate errors."], ["Error of commission", "The accounts are the right ones."], ["Reversal of entries", "The sides are correct; only the amount is wrong."]],
    hints: ["Are the right accounts used on the right sides?"],
    explanation: "The accounts and sides are right, but the amount is wrong on both: original entry.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which error will be revealed by a difference in the trial balance?",
    right: ["A credit sale debited to the customer but not credited to sales", "Correct: a one-sided entry makes debits and credits unequal."],
    wrong: [["A credit sale debited to the wrong customer's account", "An error of commission leaves the totals equal."], ["A credit sale that is not recorded in either account", "An error of omission leaves the totals equal."], ["A credit sale recorded at the wrong amount in both accounts", "An error of original entry leaves the totals equal."]],
    hints: ["Which error leaves the debit and credit totals unequal?"],
    explanation: "A one-sided entry means one entry is missing, so the totals differ.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A payment of US\\$380 to a supplier was debited to the bank account and credited to the supplier's account. What is the correcting entry?",
    right: ["Debit the supplier US\\$760; credit bank US\\$760", "Correct: twice the amount cancels the wrong entry and records the right one."],
    wrong: [["Debit the supplier US\\$380; credit bank US\\$380", "This only cancels the wrong entry and does not record the right one."], ["Debit bank US\\$760; credit the supplier US\\$760", "This repeats the error."], ["Debit bank US\\$380; credit the supplier US\\$380", "This repeats the original error."]],
    hints: ["What was done, and what should have been done?"],
    explanation: "Correct entry: Dr supplier, Cr bank. The wrong entry was the opposite, so 2 × 380 = 760 is needed.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Office furniture costing US\\$2,500 was debited to the purchases account. What is the effect on the financial statements?",
    right: ["Gross profit and profit for the year are understated by US\\$2,500", "Correct: purchases are overstated, which lowers profit."],
    wrong: [["Gross profit and profit for the year are overstated by US\\$2,500", "An overstated expense understates profit."], ["Gross profit is understated but profit for the year is unaffected", "The expense also reduces profit for the year."], ["There is no effect on profit because both accounts are debits", "The furniture is a non-current asset; the purchases are an expense."]],
    hints: ["Is furniture an expense?"],
    explanation: "Purchases are too high, so cost of sales and gross profit are wrong; correcting debits furniture and credits purchases.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which error would have **no effect** on profit for the year?",
    right: ["Insurance of US\\$600 debited to the rent account", "Correct: both are expenses, so total expenses are unchanged."],
    wrong: [["A credit sale of US\\$600 not recorded", "Sales and profit are understated."], ["Repairs of US\\$600 debited to the premises account", "Profit is overstated because an expense was capitalised."], ["Drawings of US\\$600 debited to wages", "Profit is understated because a private item was treated as an expense."]],
    hints: ["Does the error move an amount between income or expense and something else?"],
    explanation: "An error between two expense accounts leaves profit unchanged.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An error of commission, such as an expense debited to another expense account, usually changes the profit for the year.",
    answer: false,
    hints: ["Do both accounts affect profit in the same way?"],
    explanation: "False. If both accounts are expenses, total expenses and profit are unchanged.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Compensating errors are not revealed by the trial balance because their effects cancel out.",
    answer: true,
    explanation: "True. For example, two overcasts of equal amounts on opposite sides leave debits equal to credits.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each error to its type.",
    pairs: [["A supplier's invoice is lost and never entered", "Omission"], ["Rent paid is debited to the rates account", "Commission"], ["The owner's private groceries are debited to purchases", "Principle"], ["Cash received of US\\$760 is entered as US\\$670 on both sides", "Original entry"], ["Sales are overcast by US\\$500 and wages are overcast by US\\$500", "Compensating"]],
    extraRight: ["Reversal"],
    explanation: "Each description matches one of the six types that do not affect the trial balance.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "An error of {{blank:a}} puts an entry in the wrong class of account. A reversal needs a correcting entry for {{blank:b}} the amount.",
    blanks: [
      { id: "a", accepted: ["principle"], choices: ["principle", "commission", "omission"] },
      { id: "b", accepted: ["twice"], choices: ["twice", "half", "the same as"] },
    ],
    explanation: "Principle uses the wrong class; a reversal must cancel the wrong entry and make the right one.",
  });

  // --- Numerical
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", 
    value: 550, wrong: [275],
    stem: `A payment of ${money(275)} to a supplier was recorded as a debit in the bank account and a credit in the supplier's account. What is the amount of the correcting entry?`,
    explanation: "The entry was the reverse of the correct one, so the correction is 2 × 275 = 550.",
  });
  const c1 = { draft: 18900, sale: 1200, machine: 3000, painting: 500 };
  const c1v = chk(c1.draft + c1.sale + c1.machine - c1.painting, 22600);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: c1v, wrong: [r2(c1.draft + c1.sale - c1.machine - c1.painting), r2(c1.draft + c1.sale + c1.machine + c1.painting)],
    stem: `Farai's draft profit for the year is ${money(c1.draft)}. Three errors are found: (1) a credit sale of ${money(c1.sale)} was not recorded; (2) a machine costing ${money(c1.machine)} was debited to repairs; (3) painting costing ${money(c1.painting)} was debited to the premises account. Ignore depreciation. Calculate the corrected profit for the year.`,
    hints: ["Which errors understate profit, and which overstate it?"],
    explanation: "1,200 more sales (+1,200); the machine is capital, so repairs were too high (+3,000); painting is revenue expenditure, so premises were overstated and expenses understated (−500). 18,900 + 1,200 + 3,000 − 500 = 22,600.",
  });
  const w = { ca: 14600, cl: 9250, sale: 780, purch: 1140, pay: 900 };
  const wCA = w.ca + w.sale - 2 * w.pay;
  const wCL = w.cl + w.purch - 2 * w.pay;
  const wWC = chk(wCA - wCL, 4990);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: wWC, wrong: [w.ca - w.cl, r2(w.ca - w.cl + w.sale + w.purch)],
    stem: `Tendai's draft statement of financial position shows current assets of ${money(w.ca)} and current liabilities of ${money(w.cl)}. Three errors are found: (1) a credit sale of ${money(w.sale)} was not recorded; (2) a credit purchase of ${money(w.purch)} was not recorded; (3) a cheque of ${money(w.pay)} to a supplier was debited to bank and credited to the supplier. Calculate the corrected working capital.`,
    hints: ["The reversal changes both bank and trade payables by twice the amount."],
    explanation: "Current assets: 14,600 + 780 − 1,800 = 13,580. Current liabilities: 9,250 + 1,140 − 1,800 = 8,590. Working capital 13,580 − 8,590 = 4,990 (draft: 5,350).",
  });
  const g = { gp: 29700, van: 6400 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money",
    value: g.gp + g.van, wrong: [g.gp - g.van, g.gp],
    stem: `A delivery van costing ${money(g.van)} was debited to the purchases account. The draft gross profit is ${money(g.gp)}. Calculate the corrected gross profit.`,
    hints: ["Purchases are too high by the cost of the van."],
    explanation: "Purchases were overstated by 6,400, so cost of sales was too high and gross profit too low. Corrected gross profit = 29,700 + 6,400 = 36,100.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of error that occurs when a credit purchase is not recorded at all.",
    accepted: ["omission", "error of omission", "an error of omission"],
    explanation: "A transaction left out completely is an error of omission.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why compensating errors are not detected by the trial balance. Give an example.",
    points: ["Two errors have equal and opposite effects on the debit and credit totals", "So total debits still equal total credits", "A valid example (for example sales overcast by 500 and wages overcast by 500)"],
    modelAnswer: "Compensating errors cancel out: one error makes the debit total too high and another makes it too high on the credit side by the same amount, so the totals still agree. For example, sales and wages could both be overcast by 500.",
    hints: ["What happens to the debit and credit totals?"],
    explanation: "Three points: equal and opposite, totals agree, example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between an error of commission and an error of principle. Give an example of each.",
    points: ["Commission: entry in the wrong account of the same class", "Example of commission (for example telephone debited to electricity)", "Principle: entry in the wrong class of account, breaking an accounting rule", "Example of principle (for example a computer debited to repairs)"],
    modelAnswer: "An error of commission puts the entry in the wrong account of the same class, such as telephone debited to electricity. An error of principle puts it in the wrong class of account, such as a computer debited to repairs, so a capital item is treated as an expense.",
    hints: ["Same class or different class?"],
    explanation: "Define each and give a valid example.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A machine costing US\\$3,000 was debited to repairs. Explain the effect on profit for the year and on the statement of financial position, and state the correcting entry.",
    points: ["Profit for the year is understated by 3,000 because repairs are too high (before depreciation)", "Non-current assets are understated by 3,000", "Correcting entry: debit machinery 3,000; credit repairs 3,000"],
    modelAnswer: "Repairs are overstated, so profit is understated by 3,000, and the machine is missing from non-current assets, which are understated by 3,000. The correcting entry is debit machinery 3,000, credit repairs 3,000.",
    hints: ["Which account should have been debited?"],
    explanation: "Effect on profit, effect on the statement of financial position, and the journal.",
  });

  // --- Practice structured 1 (12 marks)
  const s1 = { draft: 18450, purch: 1150, wages: 980, rates: 345, chq: 1260, chqWrong: 1590 };
  const s1pfy = chk(s1.draft - s1.purch - s1.wages, 16320);
  const s1diff = s1.chqWrong - s1.chq;
  const s1j = journal([
    { date: "1", lines: [["Purchases", s1.purch, null], ["Mutare Fabrics", null, s1.purch]], narrative: "Credit purchase omitted from the books" },
    { date: "2", lines: [["Wages", s1.wages, null], ["Drawings", null, s1.wages]], narrative: "Shop wages wrongly debited to drawings" },
    { date: "3", lines: [["Rates", s1.rates, null], ["Insurance", null, s1.rates]], narrative: "Rates wrongly debited to insurance" },
    { date: "4", lines: [["Mrs Tembo", s1diff, null], ["Bank", null, s1diff]], narrative: "Cheque of 1,260 recorded as 1,590" },
  ]);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Thandeka's boutique in Chinhoyi has a draft profit for the year of ${money(s1.draft)}. The following errors are found:\n\n1. A credit purchase of ${money(s1.purch)} from Mutare Fabrics was not recorded at all.\n2. Wages of ${money(s1.wages)} for the shop assistant were debited to the drawings account.\n3. Rates of ${money(s1.rates)} were debited to the insurance account.\n4. A cheque of ${money(s1.chq)} received from Mrs Tembo was recorded as ${money(s1.chqWrong)} in both the bank account and her account.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Identify the type of each error.", template: "Error 1: {{blank:e1}}. Error 2: {{blank:e2}}. Error 3: {{blank:e3}}. Error 4: {{blank:e4}}.", blanks: ["omission", "principle", "commission", "original entry"].map((a, i) => ({ id: `e${i + 1}`, accepted: [a], choices: ["omission", "commission", "principle", "original entry", "reversal", "compensating"] })), explanation: "1 omission; 2 principle (private account used for a business expense); 3 commission (two expenses); 4 original entry (the same wrong amount on both sides)." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct the four errors. Narratives are required.", points: ["Dr Purchases 1,150, Cr Mutare Fabrics 1,150", "Dr Wages 980, Cr Drawings 980", "Dr Rates 345, Cr Insurance 345", "Dr Mrs Tembo 330, Cr Bank 330 (with narratives)"], modelAnswer: s1j, explanation: "Each correction cancels the wrong part and records the right part." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: s1pfy, wrong: [r2(s1.draft + s1.purch + s1.wages)], stem: "Calculate the corrected profit for the year.", explanation: "Errors 1 and 2 add expenses: 18,450 − 1,150 − 980 = 16,320. Errors 3 and 4 do not change profit." }),
      P.tf({ label: "(d)", marks: 1, yesNo: true, stem: "Does correcting error 4 change the profit for the year?", answer: false, explanation: "No. The error is between bank and a receivable, both assets." }),
    ],
    hints: ["Wages are a business expense; drawings are private.", "Errors between two assets or two expenses do not change profit."],
    explanation: "This item practises classifying errors, correcting them and finding the corrected profit.",
  });

  // --- Practice structured 2 (10 marks)
  const s2 = { ca: 24800, cl: 15300, purch: 880, sale: 1340, equip: 2200 };
  const s2ca = s2.ca + s2.sale;
  const s2cl = s2.cl + s2.purch;
  const s2wc = chk(s2ca - s2cl, 9960);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Rudo's draft statement of financial position shows current assets of ${money(s2.ca)} and current liabilities of ${money(s2.cl)}. Three errors are found:\n\n1. A credit purchase of ${money(s2.purch)} was not recorded.\n2. A credit sale of ${money(s2.sale)} was not recorded.\n3. Equipment costing ${money(s2.equip)} was debited to the purchases account.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s2.ca - s2.cl, stem: "Calculate the draft working capital.", explanation: "24,800 − 15,300 = 9,500." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2ca, wrong: [s2.ca], stem: "Calculate the corrected current assets.", explanation: "The credit sale adds 1,340 to trade receivables: 24,800 + 1,340 = 26,140." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s2cl, wrong: [s2.cl], stem: "Calculate the corrected current liabilities.", explanation: "The credit purchase adds 880 to trade payables: 15,300 + 880 = 16,180." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s2wc, wrong: [s2.ca - s2.cl], stem: "Calculate the corrected working capital.", explanation: "26,140 − 16,180 = 9,960." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain the effect of error 3 on gross profit and on working capital.", points: ["Purchases were overstated, so gross profit is understated by 2,200 (until corrected)", "Equipment is a non-current asset, so working capital is not affected", "Correction: debit equipment 2,200, credit purchases 2,200"], modelAnswer: "Purchases were too high by 2,200, so gross profit was understated by 2,200. Equipment is not a current asset, so working capital is unaffected. The correction is debit equipment 2,200, credit purchases 2,200.", explanation: "Link the entry to profit and to the classification of the asset." }),
    ],
    hints: ["Which items are current assets or current liabilities?"],
    explanation: "This item practises the effect of errors on working capital and gross profit.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Error of omission", "A transaction is left out of the books completely. The trial balance still agrees.");
  b.card("DEFINITION", "Error of commission", "An entry is made in the wrong account of the same class, for example an expense debited to another expense account.");
  b.card("DEFINITION", "Error of principle", "An entry is made in the wrong class of account, for example a capital item treated as an expense.");
  b.card("DEFINITION", "Error of original entry", "The wrong amount is used for both the debit and the credit entries.");
  b.card("DEFINITION", "Reversal of entries", "The right accounts are used but the debit and credit sides are swapped. The correction is twice the amount.");
  b.card("DEFINITION", "Compensating errors", "Two or more errors with equal and opposite effects, so the totals still agree.");
  b.card("FACT", "Errors that upset the trial balance", "One-sided entries, unequal debit and credit amounts, addition errors and wrongly copied or omitted balances.");
  b.card("CONCEPT", "Capital item treated as an expense", "Profit is understated and non-current assets are understated. Correct by debiting the asset and crediting the expense.");
  b.card("CONCEPT", "Do errors between two expense accounts change profit?", "No. Total expenses and therefore profit are unchanged.");
});
