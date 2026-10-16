// W4b: accounts.users-reports-concepts
import { concept, P, table, r2, chk, fmt, pctChange } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.accounts.users-reports-concepts", { file: "accounts/users-reports-concepts", keyPrefix: "accounts.users-reports-concepts" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A fictional business owner pays for a family holiday from the business bank account. Which concept says this should not be treated as a business expense?",
    ok: ["The business entity concept", "Correct: the business is separate from its owner."],
    bad: [["The prudence concept", "Prudence is about not overstating profit or assets."], ["The realisation concept", "Realisation is about when revenue is recorded."], ["The money measurement concept", "That concept limits records to items measurable in money."]],
    explanation: "The business entity concept separates the owner's private affairs from the business; the holiday is drawings.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the **prudence** concept require?",
    ok: ["Avoid overstating profit or assets; record likely losses", "Correct: caution when there is uncertainty."],
    bad: [["Record revenue as soon as orders are received from customers", "That ignores realisation and is not prudent."], ["Always value assets at their market price", "Prudence does not require market values."], ["Record every transaction twice in the books", "That describes double entry."]],
    explanation: "Prudence means that gains are recognised only when realised and losses as soon as they are likely.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which user of accounts would be **most** interested in whether the business can pay its debts on time?",
    ok: ["A supplier who is selling goods on credit", "Correct: a supplier wants to be paid on the due date."],
    bad: [["A customer buying a small item in cash", "A one-off cash customer has little interest in this."], ["A competitor who wants to know the prices", "A competitor is interested in performance and strategy."], ["A shareholder who wants a high share price", "A shareholder looks mainly at return, though liquidity matters too."]],
    explanation: "Suppliers and lenders are concerned with liquidity and ability to pay.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "According to the realisation concept, when should revenue from a credit sale be recorded?",
    ok: ["When the goods are delivered or service given", "Correct: the sale is realised when the customer takes ownership."],
    bad: [["When the customer places the order", "An order is only a promise to buy."], ["When the customer finally pays the invoice", "Revenue is recorded when earned, not when cash arrives."], ["When the business buys the goods from its supplier", "Buying goods is a cost, not a sale."]],
    explanation: "Revenue is recognised when goods or services are delivered, even if payment comes later.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is **not** recorded in the accounts because of the money measurement concept?",
    ok: ["Skill and loyalty of the workforce", "Correct: it cannot be measured reliably in money."],
    bad: [["Cash held in the bank at the year end", "Cash is measured in money and recorded."], ["Inventory of goods held at the year end", "Inventory is valued in money and recorded."], ["Money owed to the business by customers", "Receivables are measured in money and recorded."]],
    hints: ["Which item cannot be given a reliable money value?"],
    explanation: "Only items that can be measured in money are recorded, so human skills and reputation are left out.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main purpose of the auditor's report in a company's annual report?",
    ok: ["To give an independent opinion on the accounts", "Correct: it adds credibility to the figures."],
    bad: [["To prepare the accounts on behalf of the directors", "Directors prepare the accounts; auditors check them."], ["To forecast the profit for the following year", "Auditors report on past figures, not forecasts."], ["To recommend what dividend should be paid", "The directors recommend the dividend."]],
    hints: ["Who checks the work of the directors?"],
    explanation: "The auditor independently examines the accounts and states whether they give a true and fair view.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shop pays rent of US\\$12,000 on 1 October for the next twelve months. Its year ends on 31 December. What does the accruals concept require?",
    ok: ["Charge US\\$3,000 to the year and carry forward US\\$9,000", "Correct: only the three months used belong to this year."],
    bad: [["Charge the whole US\\$12,000 to the year because it was paid", "Accruals matches cost with the period used, not with cash paid."], ["Charge nothing to the year because it was paid in advance", "Three months of rent were used in the year."], ["Charge US\\$9,000 to the year and carry forward US\\$3,000", "This reverses the used and unused months."]],
    hints: ["How many months of the rent fall before the year end?"],
    explanation: "Three of the twelve months fall in the year: 3/12 × 12,000 = 3,000 is an expense and 9,000 is a prepayment (a current asset).",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the most important limitation of a company's annual report for a shareholder who is deciding whether to buy more shares?",
    ok: ["It is historic and tells little about future profit", "Correct: the decision concerns the future."],
    bad: [["It contains financial statements prepared by the company", "That is a feature, not a limitation."], ["It is available only to the directors of the company", "Annual reports are published for shareholders."], ["It includes an independent auditor's report", "That strengthens, not weakens, its reliability."]],
    hints: ["Think about what the shareholder needs to know."],
    explanation: "The report records past performance. Shareholders need information about future prospects, which must come from forecasts, strategy and market information.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the accruals concept, an expense is recorded when the cash is paid.",
    answer: false,
    explanation: "False. Expenses are recorded in the period in which they are incurred, whether or not cash has been paid.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "A clean auditor's report guarantees that a company will not fail.",
    answer: false,
    hints: ["What does the auditor give an opinion about?"],
    explanation: "False. The auditor gives an opinion on whether the accounts are true and fair; it says nothing certain about the future.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each user of accounts to the information that interests it most.",
    pairs: [["Bank", "Ability to pay interest and repay the loan"], ["Shareholder", "Profit, dividends and return on capital"], ["Tax authority", "Profit before tax and the accuracy of the records"], ["Employees", "Job security and ability to afford a pay rise"]],
    explanation: "Each user has its own purpose.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each accounting concept to its meaning.",
    pairs: [["Accruals", "Match revenue and costs to the period in which they arise"], ["Prudence", "Do not overstate profits or assets"], ["Realisation", "Record revenue when goods are delivered or service given"], ["Business entity", "The business is separate from its owner"]],
    explanation: "The concepts guide how transactions are recorded.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The {{blank:a}} concept says that only items that can be measured in money are recorded, so the loyalty of customers is {{blank:b}} in the accounts.",
    blanks: [
      { id: "a", accepted: ["money measurement"], choices: ["money measurement", "prudence", "realisation"] },
      { id: "b", accepted: ["left out"], choices: ["left out", "recorded", "valued at cost"] },
    ],
    explanation: "Money measurement limits the accounts to items with a money value.",
  });

  // ---- numerical items
  const pre = 24000 * (8 / 12);
  chk(pre, 16000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pre, calculator: true, wrong: [24000 * (4 / 12), 24000],
    stem: "A fictional company pays US\\$24,000 on 1 September for 12 months' insurance. Its year ends on 31 December. Calculate the prepayment at the year end.",
    hints: ["How many of the twelve months are still to come?"],
    explanation: "Four months (September to December) are used. The remaining 8 months are a prepayment: 8/12 × 24,000 = US\\$16,000. The US\\$8,000 is the expense of the year.",
  });
  const c2 = 56000 + 6000 - 2500;
  chk(c2, 59500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: c2, calculator: true, daily: false, wrong: [56000 + 6000 + 2500, 56000 - 6000 - 2500],
    stem: "A fictional company's draft profit for the year is US\\$56,000. The accountant then finds that US\\$6,000 of an expense paid belongs to next year (a prepayment) and that wages of US\\$2,500 for the last week are unpaid and unrecorded (an accrual). Calculate the corrected profit.",
    hints: ["A prepayment raises profit; an accrual lowers it."],
    explanation: "Removing the prepaid expense raises profit by 6,000 and recording the accrued wages lowers it by 2,500: 56,000 + 6,000 − 2,500 = US\\$59,500.",
    workedSolution: "1. Prepayment raises profit: 56,000 + 6,000 = 62,000.\n2. Accrual lowers profit: 62,000 − 2,500 = 59,500.",
  });
  const c3 = 31500 - (12000 - 10200) - (5000 - 3200) - 900;
  chk(c3, 27000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: c3, calculator: true, wrong: [31500 - 1800 - 5000 - 900, 31500 - 1800 - 900],
    stem: "A fictional company's draft profit is US\\$31,500. Three corrections are needed: (1) inventory that cost US\\$12,000 has a net realisable value of US\\$10,200; (2) a sale of US\\$5,000 (cost US\\$3,200) was recorded although the goods will be delivered next year; (3) interest of US\\$900 owed at the year end has not been recorded. Calculate the corrected profit.",
    hints: ["For the early sale remove both the revenue and the cost of sales."],
    explanation: "(1) Prudence: write inventory down by 1,800. (2) Realisation: the sale adds profit of 5,000 − 3,200 = 1,800 that belongs to next year, so profit falls by 1,800. (3) Accruals: interest of 900 is an expense. Corrected profit = 31,500 − 1,800 − 1,800 − 900 = US\\$27,000.",
    workedSolution: "1. Inventory write-down = 12,000 − 10,200 = 1,800.\n2. Early sale: profit removed = 5,000 − 3,200 = 1,800.\n3. Accrued interest = 900.\n4. Corrected profit = 31,500 − 1,800 − 1,800 − 900 = 27,000.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the accounting concept that treats a business as separate from its owner.",
    accepted: ["business entity", "the business entity concept", "business entity concept", "separate entity", "entity"],
    explanation: "The business entity concept.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a bank needs a company's financial statements before it lends money.",
    points: ["The statements show profit from operations, which is available to pay interest", "The statement of financial position shows assets that may be security and existing debts", "Ratios such as gearing and the current ratio show the risk of lending"],
    modelAnswer: "The statements show profit from operations, which is available to pay interest, and the statement of financial position shows the assets that may serve as security and the debts already owed. Ratios such as gearing and the current ratio show how risky the loan would be.",
    hints: ["What does a lender need to know?"],
    explanation: "A lender assesses ability to repay and security.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why poor record keeping could harm a small business.",
    points: ["Costs and sales may be wrongly recorded, so prices and profits are miscalculated", "Bad debts, theft and errors may go unnoticed", "The tax authority may assess too much tax or impose penalties for incorrect returns", "A bank or investor may refuse finance because it cannot trust the figures"],
    modelAnswer: "Costs and sales may be wrongly recorded, so prices and profits are miscalculated, and bad debts, theft and errors may go unnoticed. The tax authority may assess too much tax or impose penalties for incorrect returns, and a bank or investor may refuse finance because it cannot trust the figures.",
    hints: ["Think about decisions, control, tax and finance."],
    explanation: "Records support decisions, control and trust.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate how far financial statements help managers to develop a business strategy.",
    points: ["They show profitability, liquidity and gearing, which indicate strengths and weaknesses", "Trends and comparisons with rivals show where to act on prices or costs", "They help to decide how to finance growth and how much dividend to pay", "They show the past, not the future, and exclude market and non-financial information", "They may be affected by accounting policies or window dressing", "Judgement and reason, for example a useful starting point to be combined with forecasts and market research"],
    modelAnswer: "Financial statements show profitability, liquidity and gearing, so they point to strengths and weaknesses, and trends and comparisons with rivals show where to act on prices or costs. They help to decide how to finance growth and how much dividend to pay. But they show the past, not the future, exclude market and non-financial information and may be affected by accounting policies or window dressing. They are a useful starting point, but managers should combine them with forecasts and market research.",
    hints: ["Say what the statements show and what they leave out."],
    explanation: "Uses and limits weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Tafara Dairy is a fictional business in Marondera. It is asked for its accounts by its bank, the workers' union and the tax authority. The draft profit for the year is US\\$18,600. The accountant then finds that rent of US\\$1,400 for December is owed but has not been recorded.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each user to the information it is most likely to use.", pairs: [["Bank", "Profit from operations and gearing"], ["Workers' union", "Profit and cash available for a pay rise"], ["Tax authority", "Profit before tax and the accuracy of the records"]], explanation: "Each user has a different purpose." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 18600 - 1400, wrong: [18600 + 1400, 1400], stem: "Calculate the corrected profit for the year.", explanation: "The accrued rent is an expense of the year: 18,600 − 1,400 = US\\$17,200." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why it is important for the dairy to correct the draft profit before sending the accounts to these users.", points: ["The draft overstates profit by US\\$1,400 because an expense of the year is missing", "The tax authority would be given an overstated profit and could assess too much tax", "The union might ask for a pay rise based on profit that is not real", "The bank would be misled about the dairy's ability to pay interest"], modelAnswer: "The draft overstates profit by US\\$1,400 because an expense of the year is missing. The tax authority would assess too much tax, the union might ask for a pay rise based on a profit that is not real, and the bank would be misled about the dairy's ability to pay interest.", explanation: "Each user would take a wrong decision." }),
    ],
    hints: ["An accrued expense reduces profit."],
    explanation: "Corrected profit US\\$17,200; the correction avoids wrong decisions by the bank, union and tax authority.",
  });
  const gP = pctChange(85000, 102000), gR = pctChange(640000, 700000);
  chk(gP, 20, 1e-9); chk(gR, 9.375, 1e-9);
  const tbl = table(["US\\$", "2024", "2025"].map((x) => x.replace("US\\$", "US\\$")), [["Revenue", 640000, 700000], ["Profit for the year", 85000, 102000]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Hwange Quarry Ltd is a fictional company. Its annual report says: "2025 was a record year". The directors' report praises the 20% rise in profit. During the year the directors lengthened the assumed life of the company's crushing equipment from 5 to 8 years. The notes disclose that a customer who owes US\\$38,000 is in financial difficulty and that no provision has been made. The auditors gave an unqualified opinion.\n\n${tbl}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate, to one decimal place, the percentage increase in:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: gP, wrong: [r2(pctChange(102000, 85000)), 17], stem: "profit for the year;", explanation: "(102,000 − 85,000) ÷ 85,000 × 100 = 20.0%." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: gR, wrong: [r2(pctChange(700000, 640000)), 60], stem: "revenue.", explanation: "(700,000 − 640,000) ÷ 640,000 × 100 = 9.375%, which is 9.4% to one decimal place." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why profit has risen more than twice as fast as revenue.", points: ["Lengthening the assumed life of the equipment from 5 to 8 years reduces the annual depreciation charge", "A lower expense raises profit without any improvement in trading", "Costs may have been controlled or the sales mix may have improved", "Part of the rise in profit may therefore be a result of accounting policy, not performance"], modelAnswer: "Lengthening the assumed life of the crushing equipment from 5 to 8 years reduces the annual depreciation charge, and a lower expense raises profit without any improvement in trading. Costs may also have been controlled or the sales mix may have improved, but part of the rise in profit may be the result of accounting policy, not performance.", explanation: "A change of policy can raise profit." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate how reliable the annual report is as a basis for a decision to invest in Hwange Quarry Ltd.", points: [["The auditors' unqualified opinion means the accounts follow the rules and are true and fair, which adds some reliability", 1], ["The profit rise of 20% is partly due to the change in depreciation policy, so the quality of earnings is lower than it appears", 2], ["No provision for the US\\$38,000 owed by a customer in difficulty means that profit and assets may be overstated (prudence)", 2], ["Judgement with a reason and a condition, for example useful but needs adjustment and information on cash flow and the customer", 1]], levels: [[3, 5, 6, "Uses at least three features of the report with application to prudence and policy; a justified conclusion with a condition"], [2, 3, 4, "Explains some features with some application; judgement weakly supported"], [1, 1, 2, "States that the report may be useful or not with little support"]], modelAnswer: "The auditors' unqualified opinion shows that the accounts follow the rules and are true and fair, which adds some reliability. But the 20% rise in profit is partly caused by the change in the depreciation policy, so the quality of the earnings is lower than it appears, and the lack of any provision for the US\\$38,000 owed by a customer in difficulty means that profit and assets may be overstated, which is against the prudence concept. The report is therefore useful but not fully reliable. An investor should adjust the profit for the policy change and ask about the customer and the company's cash flow before deciding.", hints: ["Look at the depreciation change, the unprovided debt and the audit opinion."], explanation: "The report is audited but flattering; an investor should adjust for the policy change and the unprovided debt." }),
    ],
    hints: ["Percentage change is based on the earlier year."],
    explanation: "Profit +20.0%, revenue +9.4%; the rise is partly caused by a policy change and an unprovided debt reduces reliability.",
  });

  b.card("DEFINITION", "Annual report", "A yearly document containing a company's financial statements, notes, directors' report and auditor's report.");
  b.card("CONCEPT", "Users of accounts and their needs", "Owners: profit and return. Lenders: ability to repay. Suppliers: liquidity. Employees: security and pay. Government: tax. Managers: control and decisions.");
  b.card("DEFINITION", "Accruals concept", "Revenue and expenses are recorded in the period they arise, not when cash moves.");
  b.card("DEFINITION", "Prudence concept", "Do not overstate profits or assets; record likely losses early, gains only when realised.");
  b.card("DEFINITION", "Realisation concept", "Revenue is recorded when goods are delivered or the service is given.");
  b.card("DEFINITION", "Business entity concept", "The business is separate from its owner; private spending is drawings.");
  b.card("DEFINITION", "Money measurement concept", "Only items that can be measured in money are recorded; morale and loyalty are left out.");
  b.card("CONCEPT", "Limitations of the annual report", "Historic; directors write the narrative; accounting policies differ; limited non-financial information.");
  b.card("CONCEPT", "Using the statements for strategy", "Guide pricing, cost control, expansion, financing and dividend decisions and judge whether a strategy has worked.");
});
