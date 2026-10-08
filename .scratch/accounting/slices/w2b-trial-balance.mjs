// W2b: the trial balance.
import { concept, P, money, trialBalance, check, sum, r2, ZIM } from "../lib.mjs";
import { table } from "../tables/w2b-lib.mjs";

concept("acc.verification.trial-balance", { file: "verification/trial-balance", keyPrefix: "verification.trial-balance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **main** purpose of a trial balance?",
    options: [
      ["To check the arithmetical accuracy of the double entry", "Correct: equal totals show that equal debits and credits were recorded."],
      ["To calculate the profit for the year", "Profit is calculated in the income statement, not the trial balance."],
      ["To show the financial position of the business", "That is the job of the statement of financial position."],
      ["To prove that no errors have been made in the ledger", "Six types of error leave the totals in agreement, so it cannot prove this."],
    ],
    answer: "A",
    explanation: "A trial balance checks that total debit balances equal total credit balances. It also summarises the ledger and is the starting point for the financial statements, but it cannot prove the books are free of all errors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which balance appears in the **credit** column of a trial balance?",
    options: [
      ["Returns outwards", "Correct: purchases returns reduce purchases, so they are a credit."],
      ["Returns inwards", "Sales returns reduce sales income, so they are a debit."],
      ["Discount allowed", "Discount allowed is an expense: a debit."],
      ["Carriage inwards", "Carriage inwards is an expense: a debit."],
    ],
    answer: "A",
    explanation: "Returns outwards (purchases returns) is the opposite of purchases, which is a debit, so it is a credit balance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which balance appears in the **debit** column of a trial balance?",
    options: [
      ["Drawings", "Correct: drawings reduce capital and are a debit balance."],
      ["Bank overdraft", "An overdraft is owed to the bank: a liability and a credit."],
      ["Discount received", "Discount received is income: a credit."],
      ["Loan from a bank", "A loan is a liability: a credit."],
    ],
    answer: "A",
    explanation: "Drawings, expenses and assets are debit balances (DEAD); capital, liabilities and income are credit balances (CLIC).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trial balance includes an inventory figure. Which inventory is it?",
    options: [
      ["The inventory at the start of the financial year", "Correct: opening inventory is a ledger balance carried from the previous year."],
      ["The inventory counted at the end of the year", "Closing inventory is given as a note below the trial balance."],
      ["The average of opening and closing inventory", "No average is recorded in the ledger."],
      ["The inventory bought during the year", "Goods bought during the year are in the purchases account."],
    ],
    answer: "A",
    explanation: "The inventory account holds the opening inventory until the year-end transfer. Closing inventory is counted after the trial balance is extracted, so it is shown as a note.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A trial balance is prepared **at** a date. Which heading is correct?",
    options: [
      ["Trial balance at 30 June 2025", "Correct: it lists balances at one moment in time."],
      ["Trial balance for the year ended 30 June 2025", "\"For the year ended\" is used for the income statement, which covers a period."],
      ["Trial balance for the month of June 2025", "A trial balance is not a record of a period's transactions."],
      ["Trial balance from 1 July 2024 to 30 June 2025", "Balances are taken at one date, not over a period."],
    ],
    answer: "A",
    explanation: "Balances exist at a point in time, so the trial balance is headed \"at\" a date, like the statement of financial position.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A clerk listed every balance correctly except the trade payables of US\\$1,465, which he put in the **debit** column. Which statement describes the trial balance?",
    options: [
      ["The debit total exceeds the credit total by US\\$2,930", "Correct: debits gain 1,465 and credits lose 1,465, a difference of twice the amount."],
      ["The debit total exceeds the credit total by US\\$1,465", "This counts only one side of the error; the credit column is also short."],
      ["The credit total exceeds the debit total by US\\$2,930", "The debit column is the one that is too large."],
      ["The totals agree, because the amount is still included", "The amount is in the wrong column, so the totals cannot agree."],
    ],
    answer: "A",
    hints: ["What happens to each total when a balance moves from one column to the other?"],
    explanation: "Correctly listed, trade payables would add 1,465 to the credits. Listed as a debit, the debits are 1,465 too high and the credits 1,465 too low: a difference of $2 \\times 1,465 = 2,930$ with the debits larger.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Gweru Electrical's trial balance totals agree. What does this show?",
    options: [
      ["Equal debits and credits have been recorded, although some errors may remain", "Correct: agreement shows arithmetical accuracy only."],
      ["Every transaction has been posted to the correct account in the ledger", "An error of commission or principle would not be revealed."],
      ["Every transaction of the year has been recorded somewhere in the ledger", "An error of omission leaves the totals equal."],
      ["The business made a profit for the year", "A trial balance does not calculate profit."],
    ],
    answer: "A",
    hints: ["Think of an error that changes the debit and credit totals by the same amount."],
    explanation: "Errors of omission, commission, principle, original entry, complete reversal and compensating errors all leave the totals equal, so agreement is not proof of correct books.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is **not** part of the double-entry system?",
    options: [
      ["The trial balance", "Correct: it is a list of balances taken from the ledger, a checking device."],
      ["The bank account", "The bank account is a ledger account (in the cash book)."],
      ["The capital account", "Capital is a ledger account."],
      ["The trade payables' personal accounts", "Suppliers' accounts are ledger accounts."],
    ],
    answer: "A",
    explanation: "Nothing is posted from a trial balance; it simply lists the closing balances of the ledger accounts to check them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "In a ZIMSEC trial balance, on which side does the **debtors** total appear?",
    options: [
      ["Debit, because debtors are an asset", "Correct: debtors owe the business money."],
      ["Credit, because debtors are a liability", "Debtors are amounts owed to the business, not by it."],
      ["Credit, because they came from sales", "Sales is the credit; the debtors' accounts are debited."],
      ["Either side, depending on the amount", "The side depends on the nature of the balance, not its size."],
    ],
    answer: "A",
    explanation: "Debtors (trade receivables) are a current asset, so their total is a debit balance.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A bank overdraft is shown in the credit column of a trial balance.",
    answer: true,
    explanation: "True. An overdraft is money the business owes to the bank, a liability, so it is a credit balance.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a trial balance does not agree, the difference between the totals is always equal to the amount of a single error.",
    answer: false,
    explanation: "False. A difference shows that at least one error exists, but several errors can combine, and a balance in the wrong column produces a difference of twice its amount.",
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Rudo is preparing the trial balance of her Masvingo hair salon. Choose the column for each balance.",
    pairs: ["Capital", "Wages", "Equipment", "Rent received from a tenant", "Loan from a micro-finance lender", "Drawings"],
    right: ["Debit column", "Credit column"],
    rightIndex: [1, 0, 0, 1, 1, 0],
    explanation: "Capital, income (rent received) and liabilities (the loan) are credits. Expenses (wages), assets (equipment) and drawings are debits.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Assets, expenses and drawings have {{blank:a}} balances. Liabilities, capital and income have {{blank:b}} balances. Returns inwards is a {{blank:c}} balance.",
    blanks: [
      { id: "a", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "b", accepted: ["credit"], choices: ["debit", "credit"] },
      { id: "c", accepted: ["debit"], choices: ["debit", "credit"] },
    ],
    explanation: "DEAD CLIC. Returns inwards reduces sales (a credit), so it is a debit.",
  });

  // Missing capital
  const dr1 = [["Premises", 46000], ["Motor van", 12750], ["Inventory at 1 July 2024", 3380], ["Purchases", 41260], ["Wages", 9840], ["General expenses", 2715], ["Trade receivables", 4190], ["Bank", 2605], ["Drawings", 7400]];
  const cr1 = [["Sales", 68390], ["Trade payables", 3870], ["Mortgage loan", 18000]];
  const cap1 = r2(sum(dr1.map((x) => x[1])) - sum(cr1.map((x) => x[1])));
  const tb1 = trialBalance("check", [["Capital", null, cap1], ...dr1.map(([a, v]) => [a, v, null]), ...cr1.map(([a, v]) => [a, null, v])]);
  check("cap1", tb1.debit, tb1.credit);
  b.calc({
    d: 3, kind: "money", value: cap1, calculator: true, wrong: [r2(cap1 + 2 * 7400), r2(cap1 - 2 * 3870)],
    stem: "Tatenda's balances at 30 June 2025 were:\n\n" + table(["Account", "US\\$"], [...dr1, ...cr1]) + "\n\nThe capital balance is missing. Calculate it.",
    hints: ["Put each balance in the debit or credit column.", "Capital is the credit needed to make the columns agree."],
    explanation: `Debits: ${dr1.map((x) => x[1].toLocaleString("en-GB")).join(" + ")} = ${tb1.debit.toLocaleString("en-GB")}. Credits other than capital: 68,390 + 3,870 + 18,000 = ${sum(cr1.map((x) => x[1])).toLocaleString("en-GB")}. Capital = ${tb1.debit.toLocaleString("en-GB")} − ${sum(cr1.map((x) => x[1])).toLocaleString("en-GB")} = ${money(cap1)}. Treating drawings as a credit gives ${money(r2(cap1 + 2 * 7400))}; treating trade payables as a debit gives ${money(r2(cap1 - 2 * 3870))}.`,
  });

  // Total of a TB
  const tb2rows = [["Capital", null, 27500], ["Fixtures", 9630, null], ["Purchases", 35470, null], ["Sales", null, 52960], ["Returns inwards", 845, null], ["Returns outwards", null, 615], ["Carriage inwards", 390, null], ["Salaries", 11280, null], ["Discount received", null, 435], ["Trade receivables", 5165, null], ["Trade payables", null, 4210], ["Bank", 19760, null], ["Drawings", 3180, null]];
  const tb2 = trialBalance("check", tb2rows);
  b.num({
    d: 2, kind: "money", value: tb2.debit, calculator: true, daily: false, wrong: [r2(tb2.debit - 845 + 615)],
    stem: "Farai's ledger balances at 30 April 2025 were: capital 27,500; fixtures 9,630; purchases 35,470; sales 52,960; returns inwards 845; returns outwards 615; carriage inwards 390; salaries 11,280; discount received 435; trade receivables 5,165; trade payables 4,210; bank 19,760; drawings 3,180 (all in US\\$). Calculate the total of each column of his trial balance.",
    hints: ["Add only the debit balances."],
    explanation: `Debits: 9,630 + 35,470 + 845 + 390 + 11,280 + 5,165 + 19,760 + 3,180 = ${tb2.debit.toLocaleString("en-GB")}. Credits: 27,500 + 52,960 + 615 + 435 + 4,210 = ${tb2.credit.toLocaleString("en-GB")}, so each column totals ${money(tb2.debit)}. Swapping the two returns gives ${money(r2(tb2.debit - 845 + 615))} for the debits, and the columns would not agree.`,
  });

  // Corrected total after misplaced balances
  const wrong3 = [["Capital", null, 10100], ["Office equipment", 6250, null], ["Inventory at 1 October 2024", 4185, null], ["Purchases", 22930, null], ["Sales", null, 33680], ["Discount allowed", null, 385], ["Rent", 4800, null], ["Carriage outwards", 615, null], ["Trade receivables", 3720, null], ["Trade payables", 2945, null], ["Bank overdraft", 1460, null], ["Drawings", 5300, null]];
  const w3 = trialBalance("w3", wrong3, { allowDifference: true });
  const fixed3 = wrong3.map(([a, d, c]) => (["Discount allowed"].includes(a) ? [a, c, null] : ["Trade payables", "Bank overdraft"].includes(a) ? [a, null, d] : [a, d, c]));
  const f3 = trialBalance("f3", fixed3);
  b.calc({
    d: 4, kind: "money", value: f3.debit, calculator: true, wrong: [w3.debit, r2(w3.debit - 2945 - 1460)],
    stem: "A trainee prepared this trial balance for Sipho's printing business at 30 September 2025. Three balances are in the wrong column; all the amounts are correct.\n\n" + trialBalance("Draft trial balance at 30 September 2025", wrong3, { allowDifference: true }).md + "\n\nCalculate the correct total of the debit column.",
    hints: ["Test each balance: asset, expense or drawings → debit; liability, capital or income → credit.", "Discount allowed is an expense; trade payables and an overdraft are liabilities."],
    explanation: `Discount allowed (an expense) must move to the debit column; trade payables and the bank overdraft (liabilities) must move to the credit column. Debit total: ${w3.debit.toLocaleString("en-GB")} + 385 − 2,945 − 1,460 = ${f3.debit.toLocaleString("en-GB")}. Check: credits ${w3.credit.toLocaleString("en-GB")} − 385 + 2,945 + 1,460 = ${f3.credit.toLocaleString("en-GB")}. The correct total is ${money(f3.debit)}.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** purposes of preparing a trial balance.",
    points: ["One purpose: to check the arithmetical accuracy of the double entry / that total debits equal total credits", "A second purpose: to help locate errors / to summarise the ledger balances / to provide the basis for preparing the financial statements"],
    modelAnswer: "To check that total debits equal total credits, so the double entry is arithmetically correct; and to provide a summary of balances from which the income statement and statement of financial position are prepared.",
    hints: ["One purpose is about checking; another is about what happens next."],
    explanation: "Purposes: arithmetical check, help in finding errors, a summary of the ledger, and the starting point for the financial statements.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Thandeka says: \"My trial balance agrees, so my books contain no errors.\" Explain whether she is correct, giving an example.",
    points: ["She is not (fully) correct", "Some errors do not affect the agreement of the trial balance / the totals can agree with errors present", "A valid example explained, e.g. an error of omission: a transaction left out completely, so neither the debit nor the credit is recorded"],
    modelAnswer: "She is not correct. Agreement only shows that equal debits and credits have been recorded. For example, if a credit sale was never entered (an error of omission), both the debit and the credit are missing, so the totals still agree although the books are wrong.",
    hints: ["Think of an error that affects both columns equally."],
    explanation: "The six errors not revealed are omission, commission, principle, original entry, complete reversal and compensating errors.",
  });

  // Practice structured 1: prepare TB from list with missing capital
  const s1dr = [["Machinery", 14600], ["Delivery van", 9850], ["Inventory at 1 October 2024", 2965], ["Purchases", 38420], ["Returns inwards", 710], ["Carriage inwards", 455], ["Wages", 12360], ["Electricity", 1845], ["Discount allowed", 290], ["Trade receivables", 6125], ["Cash", 340], ["Drawings", 4800]];
  const s1cr = [["Sales", 61275], ["Returns outwards", 520], ["Discount received", 365], ["Trade payables", 5390], ["Bank overdraft", 1785], ["Loan from Harare Finance", 8000]];
  const s1cap = r2(sum(s1dr.map((x) => x[1])) - sum(s1cr.map((x) => x[1])));
  const s1rows = [["Capital", null, s1cap], ...s1dr.map(([a, v]) => [a, v, null]), ...s1cr.map(([a, v]) => [a, null, v])];
  const s1 = trialBalance("Chipo Ncube: Trial balance at 30 September 2025", s1rows);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo Ncube runs a furniture workshop in Bulawayo. Her ledger balances at 30 September 2025 were:\n\n" + table(["Account", "US\\$"], [...s1dr, ...s1cr].sort((a, b) => a[0].localeCompare(b[0]))) + "\n\nInventory at 30 September 2025 was valued at US\\$3,215. Capital is not given.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1.debit, wrong: [r2(s1.debit - 1785)], stem: "Calculate the total of the debit column of the trial balance.", explanation: `Debit balances: ${s1dr.map((x) => x[1].toLocaleString("en-GB")).join(" + ")} = ${s1.debit.toLocaleString("en-GB")}. The overdraft is a credit; closing inventory is not included.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1cap, wrong: [r2(s1cap + 2 * 1785), r2(s1cap + 3215)], stem: "Calculate Chipo's capital.", explanation: `Credits other than capital: ${s1cr.map((x) => x[1].toLocaleString("en-GB")).join(" + ")} = ${sum(s1cr.map((x) => x[1])).toLocaleString("en-GB")}. Capital = ${s1.debit.toLocaleString("en-GB")} − ${sum(s1cr.map((x) => x[1])).toLocaleString("en-GB")} = ${s1cap.toLocaleString("en-GB")}.` }),
      P.mcq({
        label: "(c)", stem: "How should the inventory of US\\$3,215 at 30 September 2025 be treated?",
        options: [["As a note below the trial balance", "Correct: closing inventory is counted after the balances are extracted."], ["In the debit column of the trial balance", "The debit inventory figure is the opening inventory of US\\$2,965."], ["In the credit column of the trial balance", "Inventory is an asset, never a credit balance."], ["Added to purchases in the trial balance", "Closing inventory is deducted in the cost of sales, not added to purchases."]],
        answer: "A", explanation: "Closing inventory is used in the financial statements but is not a ledger balance at the time the trial balance is drawn up.",
      }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Chipo's trial balance at 30 September 2025.", points: ["Correct heading: name and \"Trial balance at 30 September 2025\"", "Non-current assets, inventory, trade receivables and cash in the debit column", "Expenses, returns inwards, discount allowed, purchases and drawings in the debit column", "Sales, returns outwards, discount received, trade payables, overdraft and loan in the credit column", `Capital ${s1cap.toLocaleString("en-GB")} and equal totals of ${s1.debit.toLocaleString("en-GB")}`], modelAnswer: s1.md, explanation: "Use DEAD CLIC for every balance." }),
    ],
    hints: ["Sort every balance into debit or credit first.", "Capital is the balancing figure; closing inventory stays out."],
    explanation: "This item tests classifying balances, calculating a missing capital and the layout of a trial balance.",
  });

  // Practice structured 2: redraft a wrong trial balance
  const wrong4 = [["Capital", null, 15635], ["Drawings", null, 4260], ["Shop fittings", 8940, null], ["Inventory at 1 May 2024", 3175, null], ["Purchases", 29810, null], ["Sales", null, 47385], ["Returns outwards", 495, null], ["Wages", 10620, null], ["Rent received", 1800, null], ["Discount allowed", 340, null], ["Trade receivables", 3965, null], ["Trade payables", null, 2880], ["Bank", 7085, null]];
  const w4 = trialBalance("Draft trial balance at 30 April 2025", wrong4, { allowDifference: true });
  const fix4 = wrong4.map(([a, d, c]) => (a === "Drawings" ? [a, c, null] : ["Returns outwards", "Rent received"].includes(a) ? [a, null, d] : [a, d, c]));
  const capFix = r2(sum(fix4.map((x) => x[1] ?? 0)) - sum(fix4.filter((x) => x[0] !== "Capital").map((x) => x[2] ?? 0)));
  check("capital agrees", capFix, 15635);
  const f4 = trialBalance("Nyasha Banda: Trial balance at 30 April 2025", fix4);
  b.struct({
    d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
    stem: "Nyasha Banda's assistant prepared the trial balance below for her Mutare stationery shop. The figures are correct, but some balances are in the wrong column.\n\n" + w4.md,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: Math.abs(w4.difference), wrong: [r2(Math.abs(w4.difference) / 2)], stem: "Calculate the difference between the two totals of the draft trial balance.", explanation: `${w4.credit.toLocaleString("en-GB")} − ${w4.debit.toLocaleString("en-GB")} = ${Math.abs(w4.difference).toLocaleString("en-GB")}.` }),
      P.mcq({
        label: "(b)", stem: "Which balances are in the wrong column?",
        options: [["Drawings, returns outwards and rent received", "Correct: drawings is a debit; returns outwards and rent received are credits."], ["Drawings, discount allowed and trade payables", "Discount allowed (expense, debit) and trade payables (liability, credit) are correctly placed."], ["Returns outwards, wages and rent received", "Wages is an expense and correctly a debit."], ["Capital, drawings and rent received", "Capital is correctly a credit."]],
        answer: "A", explanation: "Drawings reduce capital (debit). Returns outwards reduce purchases (credit). Rent received is income (credit).",
      }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: f4.debit, wrong: [w4.debit, r2(w4.debit + 4260)], stem: "Calculate the correct total of each column.", explanation: `Debits: ${w4.debit.toLocaleString("en-GB")} + 4,260 − 495 − 1,800 = ${f4.debit.toLocaleString("en-GB")}. Credits: ${w4.credit.toLocaleString("en-GB")} − 4,260 + 495 + 1,800 = ${f4.credit.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Redraft the trial balance correctly.", points: ["Heading with the name and \"at 30 April 2025\"", "Drawings moved to the debit column", "Returns outwards and rent received moved to the credit column", `Totals ${f4.debit.toLocaleString("en-GB")} on both sides`], modelAnswer: f4.md, explanation: "Every other balance was already correctly placed." }),
      P.manual({ label: "(e)", marks: 2, stem: "Nyasha's corrected trial balance agrees. State **two** types of error that it would not reveal.", points: ["One error type named (omission, commission, principle, original entry, complete reversal, compensating)", "A second, different error type named"], modelAnswer: "An error of omission and an error of principle.", explanation: "These errors affect both columns equally or not at all." }),
    ],
    hints: ["Moving a balance to the other column changes both totals.", "The difference is twice the net amount misplaced."],
    explanation: "This item tests amending a trial balance and its limitations.",
  });

  b.card("DEFINITION", "What is a **trial balance**?", "A list of all ledger balances at a date, debits in one column and credits in the other, used to check the arithmetical accuracy of the double entry.");
  b.card("FACT", "DEAD CLIC", "Debit balances: Expenses, Assets, Drawings. Credit balances: Liabilities, Income, Capital.");
  b.card("CONCEPT", "Four purposes of a trial balance", "Check arithmetical accuracy; help locate errors; summarise the ledger balances; provide the basis for the financial statements.");
  b.card("CONCEPT", "Main limitation of a trial balance", "Agreement does not prove the books are correct: six types of error (omission, commission, principle, original entry, complete reversal, compensating) leave the totals equal.");
  b.card("FACT", "Which inventory is in the trial balance?", "Opening inventory (a debit). Closing inventory is shown as a note below the trial balance.");
  b.card("FACT", "Returns in the trial balance", "Returns inwards (sales returns): debit. Returns outwards (purchases returns): credit.");
  b.card("FACT", "Discounts in the trial balance", "Discount allowed (an expense): debit. Discount received (income): credit.");
  b.card("FORMULA", "Missing capital", "Capital = total debit balances − all other credit balances.");
  b.card("FACT", "Effect of a balance in the wrong column", "It creates a difference of twice the amount between the totals.");
});
