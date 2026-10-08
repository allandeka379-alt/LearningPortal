// W2b: the effect of errors on profit and the statement of financial position.
import { concept, P, money, sum, r2, check, ZIM, CAM } from "../lib.mjs";
import { table, correctedProfit } from "../tables/w2b-lib.mjs";

concept("acc.verification.errors-effect-on-profit", { file: "verification/errors-effect-on-profit", keyPrefix: "verification.errors-effect-on-profit" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The purchases journal was overcast by US\\$560. What is the effect of correcting this error on the profit for the year?",
    options: [
      ["Profit increases by US\\$560", "Correct: purchases (an expense) fall, so profit rises."],
      ["Profit decreases by US\\$560", "Reducing an expense increases profit."],
      ["Profit increases by US\\$1,120", "The error is 560; it is not doubled."],
      ["No effect, because only the suspense account changes", "The purchases account changes too, and it is an income statement item."],
    ],
    answer: "A",
    explanation: "Correction: debit suspense, credit purchases 560. Cost of sales falls by 560, so gross profit and profit for the year both rise by 560.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A receipt of US\\$745 from Moyo was credited to Mpofu's account. What is the effect of correcting this error on profit?",
    options: [
      ["No effect", "Correct: both accounts are trade receivables in the statement of financial position."],
      ["Profit increases by US\\$745", "No income or expense account is involved."],
      ["Profit decreases by US\\$745", "No income or expense account is involved."],
      ["Gross profit decreases by US\\$745 only", "Sales is not affected."],
    ],
    answer: "A",
    explanation: "Debit Mpofu, credit Moyo: both are customers' accounts, so neither profit nor the total of trade receivables changes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Carriage outwards of US\\$215 was debited to the carriage inwards account. What is the effect of the correction?",
    options: [
      ["Gross profit increases by US\\$215; profit for the year is unchanged", "Correct: cost of sales falls, but total expenses are the same."],
      ["Gross profit decreases by US\\$215; profit for the year is unchanged", "Carriage inwards is reduced, which raises gross profit."],
      ["Gross profit and profit for the year both increase by US\\$215", "The 215 is still an expense, now in the profit and loss section."],
      ["Neither gross profit nor profit for the year changes", "Gross profit changes because carriage inwards is a trading item."],
    ],
    answer: "A",
    hints: ["Which carriage is part of cost of sales?"],
    explanation: "Correction: debit carriage outwards, credit carriage inwards. Cost of sales falls by 215 (gross profit up), and expenses rise by 215, so profit for the year is unchanged.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Closing inventory at the year end was overvalued by US\\$430. Which statement is correct?",
    options: [
      ["Profit and current assets are both overstated by US\\$430", "Correct: closing inventory is in cost of sales and in current assets."],
      ["Profit is understated and current assets overstated by US\\$430", "Higher closing inventory lowers cost of sales, raising profit."],
      ["Only current assets are overstated by US\\$430", "Closing inventory also affects cost of sales and profit."],
      ["Only profit is overstated by US\\$430", "Closing inventory is also a current asset."],
    ],
    answer: "A",
    hints: ["Closing inventory appears in two statements."],
    explanation: "Overvalued closing inventory reduces cost of sales, so profit is 430 too high, and the inventory figure in current assets is also 430 too high.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Correcting entry: debit suspense US\\$390, credit rent received US\\$390. What is the effect on profit?",
    options: [
      ["Profit increases by US\\$390", "Correct: income increases."],
      ["Profit decreases by US\\$390", "Crediting an income account increases income."],
      ["No effect, because suspense is involved", "Suspense is a balance sheet item; rent received is income, so profit changes."],
      ["Profit increases by US\\$780", "Only one amount of 390 is credited to income."],
    ],
    answer: "A",
    hints: ["Is rent received income or expense? Is it credited or debited?"],
    explanation: "Rent received is other income. Crediting it increases income, so profit rises by 390.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Equipment repairs of US\\$610 were debited to the equipment account. What is the effect of correcting this error?",
    options: [
      ["Profit decreases and non-current assets decrease by US\\$610", "Correct: an expense is added and the asset reduced."],
      ["Profit increases and non-current assets decrease by US\\$610", "Adding an expense reduces profit."],
      ["Profit decreases and non-current assets increase by US\\$610", "The asset account is credited, so it falls."],
      ["Profit and non-current assets are unchanged", "This is an error of principle; both statements change."],
    ],
    answer: "A",
    explanation: "Correction: debit repairs, credit equipment 610. Expenses rise, so profit falls by 610; equipment falls by 610.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "Draft net profit was US\\$12,630. Sales were understated by US\\$820 and discount allowed was understated by US\\$95. What is the corrected net profit?",
    options: [
      ["US\\$13,355", "Correct: 12,630 + 820 − 95 = 13,355."],
      ["US\\$13,545", "This adds the discount allowed instead of deducting it."],
      ["US\\$11,715", "This deducts the sales instead of adding them."],
      ["US\\$11,905", "This reverses both corrections."],
    ],
    answer: "A",
    hints: ["More sales increase profit; more expenses reduce it."],
    explanation: "Corrected net profit = 12,630 + 820 − 95 = 13,355.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Goods costing US\\$170 taken by the owner were debited to purchases. After correction, what happens to the drawings and profit?",
    options: [
      ["Drawings increase by US\\$170 and profit increases by US\\$170", "Correct: purchases fall (profit up) and drawings rise."],
      ["Drawings increase by US\\$170 and profit decreases by US\\$170", "Reducing purchases increases profit."],
      ["Drawings decrease by US\\$170 and profit increases by US\\$170", "Drawings are debited, so they increase."],
      ["Drawings increase by US\\$170 and profit is unchanged", "Purchases is an expense, so profit changes."],
    ],
    answer: "A",
    explanation: "Correction: debit drawings, credit purchases 170. Cost of sales falls, so profit rises by 170; drawings rise by 170. Closing capital is unchanged overall.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Correcting an error that involves only two statement of financial position accounts does not change the profit for the year.",
    answer: true,
    explanation: "True. Profit changes only when an income or expense account is adjusted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If the sales journal was overcast, correcting the error will increase gross profit.",
    answer: false,
    explanation: "False. Overcast sales are too high; reducing them reduces gross profit and profit for the year.",
  });

  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each correction in Farai's books with its effect on the profit for the year.",
    pairs: [
      "Debit suspense, credit sales US\\$300",
      "Debit electricity, credit suspense US\\$300",
      "Debit Gumede, credit Gumbo US\\$300",
      "Debit carriage inwards, credit carriage outwards US\\$300",
    ],
    right: ["Increase by US\\$300", "Decrease by US\\$300", "No effect on any profit figure", "No effect on profit for the year; gross profit decreases"],
    rightIndex: [0, 1, 2, 3],
    hints: ["Find the income statement account in each entry."],
    explanation: "Sales credited: income up. Electricity debited: expense up. Two customers: no effect. Carriage moved into cost of sales: gross profit down, total expenses the same.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A correction that credits an expense account {{blank:a}} profit. A correction that debits an income account {{blank:b}} profit.",
    blanks: [
      { id: "a", accepted: ["increases"], choices: ["increases", "decreases", "does not change"] },
      { id: "b", accepted: ["decreases"], choices: ["increases", "decreases", "does not change"] },
    ],
    explanation: "Crediting an expense lowers expenses (profit up). Debiting income lowers income (profit down).",
  });

  // Calculation: corrected profit
  const cp = correctedProfit("x", 21485, [["Sales journal undercast", 1300], ["Rent prepaid wrongly charged in full", 0], ["Purchase of delivery van debited to motor expenses", 6750], ["Discount received not posted", 185], ["Wages not posted", -940], ["Returns inwards omitted", -265]].filter((x) => x[1] !== 0));
  check("cp", cp.corrected, 21485 + 1300 + 6750 + 185 - 940 - 265);
  b.calc({
    d: 4, kind: "money", value: cp.corrected, calculator: true, wrong: [r2(21485 + 1300 - 6750 + 185 - 940 - 265), r2(21485 + 1300 + 6750 - 185 - 940 - 265)],
    stem: "Tendai's draft profit for the year ended 30 June 2025 was US\\$21,485. These errors were then found:\n\n" + table(["No.", "Error"], [["1", "The sales journal was undercast by US\\$1,300"], ["2", "A delivery van bought for US\\$6,750 was debited to motor expenses"], ["3", "Discount received of US\\$185 was not posted to the discount received account"], ["4", "Wages of US\\$940 were not posted to the wages account"], ["5", "Returns inwards of US\\$265 were not posted to the returns inwards account"], ["6", "A payment of US\\$480 to a supplier was debited to the wrong supplier"]]) + "\n\nCalculate the corrected profit for the year.",
    hints: ["Mark each error +, − or no effect.", "Error 2 removes an expense; error 6 involves two suppliers only."],
    explanation: `Add: sales 1,300, motor expenses reduced 6,750, discount received 185. Less: wages 940, returns inwards 265. Error 6 has no effect. Corrected profit = 21,485 + 1,300 + 6,750 + 185 − 940 − 265 = ${money(cp.corrected)}. Deducting the van instead gives ${money(r2(21485 + 1300 - 6750 + 185 - 940 - 265))}.`,
    workedSolution: "1. Error 1: sales up, +1,300.\n2. Error 2: an asset removed from motor expenses, +6,750.\n3. Error 3: other income up, +185.\n4. Error 4: expense up, −940.\n5. Error 5: returns inwards (reduces sales) up, −265.\n6. Error 6: two trade payables accounts, no effect.\n7. $21,485 + 1,300 + 6,750 + 185 - 940 - 265 = 28,515$.",
  });
  check("cp value", cp.corrected, 28515);

  // Numerical: gross profit effect
  const gpEff = r2(520 + 340);
  b.num({
    d: 3, kind: "money", value: gpEff, wrong: [r2(520 - 340), 520],
    stem: "Two errors were found in Rudo's books: carriage outwards of US\\$520 had been debited to carriage inwards, and returns outwards of US\\$340 had been credited to discount received. By how much will gross profit **increase** when both are corrected?",
    hints: ["Which of the four accounts are trading items?"],
    explanation: `Error 1: debit carriage outwards, credit carriage inwards 520. Carriage inwards (cost of sales) falls, so gross profit rises by 520. Error 2: debit discount received, credit returns outwards 340. Returns outwards reduce cost of sales, so gross profit rises by 340. Total increase = 520 + 340 = ${gpEff}. (Profit for the year is unchanged by error 1 and by error 2, because the amounts only move within the income statement.)`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why an error of commission between two customers' accounts has no effect on the profit for the year or on the total trade receivables.",
    points: ["Both accounts are trade receivables (statement of financial position); no income or expense account is involved, so profit is unchanged", "One customer's balance rises and the other's falls by the same amount, so the total is unchanged"],
    modelAnswer: "The correction debits one customer and credits another. No income or expense account is touched, so profit is unchanged, and the increase in one balance equals the decrease in the other, so total trade receivables stay the same.",
    hints: ["Which statement are customers' accounts in?"],
    explanation: "Only corrections touching income statement accounts change profit.",
  });

  // Practice structured 1: corrected profit (ZIMSEC style)
  const errs = [
    ["1", "Rent of US\\$1,560 paid in advance for next year was included in the rent expense", 1560],
    ["2", "The sales journal was overcast by US\\$900", -900],
    ["3", "Commission received of US\\$275 was credited to the commission received account twice", -275],
    ["4", "A computer bought for US\\$1,145 was debited to office expenses", 1145],
    ["5", "A payment of US\\$630 to Kanda Ltd was posted to Kandi Ltd", 0],
  ];
  const sp = correctedProfit("Thandeka Ndlovu: Statement of corrected net profit for the year ended 30 September 2025", 16725, [["Rent paid in advance", 1560], ["Computer wrongly charged to office expenses", 1145], ["Sales journal overcast", -900], ["Commission received overstated", -275]], { draftLabel: "Net profit as originally calculated", finalLabel: "Corrected net profit" });
  check("sp", sp.corrected, 18255);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Thandeka Ndlovu runs a tuck shop in Masvingo. Her draft net profit for the year ended 30 September 2025 was US\\$16,725. These errors were then found:\n\n" + table(["No.", "Error"], errs.map((e) => [e[0], e[1]])),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which error has **no** effect on net profit?",
        options: [["Error 5", "Correct: two trade payables accounts."], ["Error 3", "Commission received (income) is overstated: profit changes."], ["Error 1", "Rent expense is overstated: profit changes."], ["Error 2", "Sales are overstated: profit changes."]],
        answer: "A", explanation: "An error between two suppliers' accounts does not touch income or expenses.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: 275, wrong: [550], stem: "By how much is commission received overstated (error 3)?", explanation: "It was credited twice instead of once, so it is overstated by one extra 275." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: sp.corrected, wrong: [r2(16725 - 1560 + 1145 - 900 - 275), r2(16725 + 1560 + 1145 + 900 - 275)], stem: "Calculate the corrected net profit.", explanation: `16,725 + 1,560 + 1,145 − 900 − 275 = ${sp.corrected.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a statement of corrected net profit.", points: ["Starts with net profit as originally calculated 16,725", "Add: rent paid in advance 1,560 and computer 1,145", "Less: sales overcast 900 and commission received 275", `Corrected net profit ${sp.corrected.toLocaleString("en-GB")}`], modelAnswer: sp.md, explanation: "Errors with no effect are left out." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the effect of correcting error 4 on the statement of financial position.", points: ["Non-current assets (office equipment/computers) increase", "by US\\$1,145"], modelAnswer: "Non-current assets (office equipment) increase by US\\$1,145.", explanation: "The computer is an asset, not an expense." }),
    ],
    hints: ["Overstated expenses: add back. Overstated income: deduct."],
    explanation: "This item tests a statement of corrected net profit.",
  });

  // Practice structured 2: effects on SOFP items (Cambridge style)
  const draft = { profit: 8340, rec: 5260, pay: 3915, inv: 2870 };
  const corr = { profit: r2(8340 - 715 + 290 - 440), rec: 5260, pay: r2(3915 + 715), inv: r2(2870 + 290) };
  check("corr", corr.profit, 7475);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true, applies: CAM,
    stem: "Sipho prepared draft financial statements for the year ended 30 June 2025 showing a profit for the year of US\\$8,340, inventory US\\$2,870, trade receivables US\\$5,260 and trade payables US\\$3,915. He then found these errors:\n\n" +
      table(["No.", "Error"], [["1", "A credit purchase invoice for US\\$715 had been omitted from the books"], ["2", "Closing inventory had been undervalued by US\\$290"], ["3", "An irrecoverable debt of US\\$440 had been written off in the customer's account but not in the irrecoverable debts account"], ["4", "Cash of US\\$360 received from Dube had been credited to Dlamini's account"]]) +
      "\n\nError 3 was entered in a suspense account.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: corr.profit, wrong: [r2(8340 - 715 + 290), r2(8340 + 715 + 290 - 440)], stem: "Calculate the corrected profit for the year.", explanation: `Error 1: purchases up 715 (−715). Error 2: closing inventory up 290 (+290). Error 3: debit irrecoverable debts 440, credit suspense (−440). Error 4: no effect. Corrected profit = 8,340 − 715 + 290 − 440 = ${corr.profit.toLocaleString("en-GB")}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: corr.rec, wrong: [r2(5260 - 440), r2(5260 - 360)], stem: "Calculate the corrected trade receivables.", explanation: `The write-off (error 3) was already posted to the customer's account, so trade receivables are correct for it; only the expense account was missing. Error 4 moves 360 between two customers, leaving the total unchanged. Trade receivables remain ${corr.rec.toLocaleString("en-GB")}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: corr.pay, wrong: [3915], stem: "Calculate the corrected trade payables.", explanation: `The omitted invoice is owed to the supplier: 3,915 + 715 = ${corr.pay.toLocaleString("en-GB")}.` }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: corr.inv, wrong: [r2(2870 - 290)], stem: "Calculate the corrected inventory.", explanation: `2,870 + 290 = ${corr.inv.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Sipho's bank has asked for his financial statements to support a loan application. Evaluate whether he should send the draft statements or wait for the corrected ones.", points: ["The draft overstates profit / understates payables, so it gives a misleadingly favourable picture", "The bank relies on accurate statements to judge his ability to repay; sending wrong figures could damage trust or lead to an unsuitable loan", "Conclusion: he should wait for / send the corrected statements (or explain the corrections)"], modelAnswer: "He should send the corrected statements. The draft overstates profit and understates trade payables, making the business look stronger than it is. The bank uses these figures to judge whether he can repay; if it later finds the errors, it may refuse the loan or lose trust in him.", explanation: "Accuracy and honesty matter to users of accounts." }),
    ],
    hints: ["Profit: only income and expense corrections count.", "Closing inventory is in both statements."],
    explanation: "This item tests the effect of corrections on profit and on statement of financial position items.",
  });

  b.card("CONCEPT", "When does a correction change profit?", "When one side of the correcting entry is an income or expense account and the other is not (asset, liability, capital, drawings or suspense).");
  b.card("FACT", "Expense overstated", "Correcting it increases profit.");
  b.card("FACT", "Income overstated", "Correcting it decreases profit.");
  b.card("FACT", "Asset debited to an expense account", "Correcting it increases profit and increases non-current assets.");
  b.card("FACT", "Closing inventory understated", "Correcting it increases profit and increases current assets by the same amount.");
  b.card("FACT", "Carriage outwards debited to carriage inwards", "Correcting it increases gross profit; profit for the year is unchanged.");
  b.card("FORMULA", "Statement of corrected profit", "Draft profit + corrections that increase profit − corrections that reduce profit = corrected profit.");
  b.card("FACT", "Error of commission between two customers", "No effect on profit or on total trade receivables.");
});
