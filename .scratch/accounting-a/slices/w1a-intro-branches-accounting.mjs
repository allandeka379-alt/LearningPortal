// W1a: intro.branches-accounting (ZIMSEC only: tagged automatically)
import { concept, P, table, check, sum, r2, fmt, money } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.intro.branches-accounting", { file: "intro/branches-accounting", keyPrefix: "intro.branches-accounting" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which branch of accounting prepares budgets and variance reports to help managers plan and control?",
    ok: ["Management accounting", "Correct: it supports internal planning, control and decisions."],
    bad: [["Financial reporting", "This produces statements for external users."], ["Auditing", "This is an independent check of the accounts."], ["Bookkeeping", "This records transactions."]],
    explanation: "Budgets and variance reports are management accounting outputs.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who gives an independent opinion on whether the accounts are fair?",
    ok: ["The auditor", "Correct: the auditor is independent of those who prepared the accounts."],
    bad: [["The bookkeeper", "The bookkeeper records the transactions."], ["The cost accountant", "The cost accountant works out costs inside the business."], ["The manager", "Managers use the accounts but do not audit them."]],
    explanation: "Auditing is the independent examination of the accounts.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of cost accounting?",
    ok: ["To find and control the cost of products, jobs or services", "Correct: it analyses materials, labour and overheads."],
    bad: [["To prepare accounts for the tax authority only", "That is taxation and financial reporting."], ["To record every sale in a day book", "That is bookkeeping."], ["To check that the statements are fair", "That is auditing."]],
    explanation: "Cost accounting analyses costs so that unit costs and cost control can be established.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes **financial accounting**?",
    ok: ["It reports past performance in set formats following laws and standards", "Correct: the statements are historic and follow required formats."],
    bad: [["It forecasts future costs for managers", "That is management accounting."], ["It has no required format", "That describes management accounting."], ["It is prepared only for the owner of a business", "Its users include outside parties."]],
    explanation: "Financial accounting is historic, rule-based and aimed mainly at external users.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which task in a bakery is an example of **cost accounting**?",
    ok: ["Calculating the cost of making one loaf", "Correct: it analyses materials, labour and overhead per unit."],
    bad: [["Recording cash sales in the cash book", "That is bookkeeping."], ["Preparing the statement of financial position at year end", "That is financial reporting."], ["Checking the accounts and signing an opinion", "That is auditing."]],
    hints: ["Which task finds a cost per unit?"],
    explanation: "Finding the cost per unit is the classic cost accounting task.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about management accounting reports is correct?",
    ok: ["They need not follow a format set by law and can look to the future", "Correct: they are designed for managers' decisions."],
    bad: [["They must follow the format of the income statement", "Only published statements follow a set format."], ["They are only produced once a year", "They are produced as often as managers need."], ["They are mainly for lenders", "Their users are managers."]],
    hints: ["Who uses them, and does the law set the format?"],
    explanation: "Management accounting is flexible and often forward-looking.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which activity uses the accounts to work out the amount payable to ZIMRA?",
    ok: ["Taxation", "Correct: tax is calculated from the profit and other figures in the accounts."],
    bad: [["Auditing", "Auditing gives an opinion on fairness."], ["Cost accounting", "This concerns the cost of products."], ["Bookkeeping", "Bookkeeping only records the transactions."]],
    hints: ["Which activity involves paying money to the tax authority?"],
    explanation: "Taxation uses the accounts to calculate the tax due.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The manager of a furniture factory asks which of three products will earn the most for each hour of scarce machine time next month. Which branch answers this?",
    ok: ["Management accounting", "Correct: it supports short-term decisions using forward-looking information."],
    bad: [["Financial reporting", "Statements show past results for outsiders."], ["Auditing", "Auditors do not make business decisions."], ["Bookkeeping", "Bookkeeping records the past."]],
    hints: ["The decision concerns the future and is for a manager."],
    explanation: "Ranking products by return on a scarce resource is a decision-making task for management accounting.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Management accounting reports must follow a format set by law.",
    answer: false,
    explanation: "False. Only published financial statements are required to follow set formats.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Bookkeeping provides the data on which financial accounting is based.",
    answer: true,
    explanation: "True. Transactions are recorded by the bookkeeper, then summarised in the statements.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each task to the branch or activity.",
    pairs: ["Recording purchases in the purchases journal", "Preparing the annual income statement", "Calculating the cost of one job", "Comparing actual costs with the budget", "Giving an independent opinion on the accounts"],
    right: ["Bookkeeping", "Financial reporting", "Cost accounting", "Management accounting", "Auditing"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Match by purpose: recording, reporting, costing, managing and checking.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Financial accounting is concerned mainly with the {{blank:a}}, whereas management accounting also looks to the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["past"], choices: ["past", "future"] },
      { id: "b", accepted: ["future"], choices: ["past", "future"] },
    ],
    explanation: "Financial statements are historic; management reports include budgets and forecasts.",
  });

  const cpu = r2(6300 / 450);
  check("cpu", cpu, 14);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cpu, daily: true, calculator: true, wrong: [r2(450 / 6300)],
    stem: "A bakery in Chinhoyi spent US\\$6,300 on materials, labour and overheads to make 450 cakes. Calculate the cost per cake.",
    explanation: "6,300 ÷ 450 = US\\$14.00 per cake.",
  });
  const sv = r2(12500 - 11840);
  check("sv", sv, 660);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: sv, calculator: true, wrong: [r2(12500 + 11840)],
    stem: "The budgeted cost of a job was US\\$12,500 and the actual cost was US\\$11,840. Calculate the amount by which the actual cost is below the budget (the favourable difference).",
    hints: ["Budget less actual."],
    explanation: "12,500 - 11,840 = 660 favourable.",
  });
  const tc = sum([5100, 2800, 1350]);
  check("tc", tc, 9250);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: tc, calculator: true, wrong: [sum([5100, 2800])],
    stem: "A batch of 370 chairs cost: direct materials US\\$5,100; direct labour US\\$2,800; production overheads US\\$1,350. Calculate the total cost of the batch.",
    hints: ["Add all three types of cost."],
    explanation: "5,100 + 2,800 + 1,350 = 9,250. Leaving out the overheads gives 7,900.",
  });
  const sp = r2((9250 / 370) * 1.2);
  check("sp", sp, 30);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: sp, calculator: true, wrong: [25, r2(9250 * 1.2)],
    stem: "The 370 chairs in the previous batch cost a total of US\\$9,250. The owner wants a selling price that gives a profit of 20% on cost for each chair. Calculate the selling price per chair.",
    hints: ["First find the cost per chair."],
    explanation: "Cost per chair 9,250 ÷ 370 = 25.00. Selling price 25.00 × 120% = 30.00. Using the whole batch cost gives 11,100.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the branch of accounting that provides managers with budgets, variances and decision-making information.",
    accepted: ["management accounting", "management accounts"],
    explanation: "Management accounting.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between financial accounting and management accounting.",
    points: ["Financial accounting reports past results to external users in set formats; management accounting helps managers plan and control", "Management accounting has no required format and includes future information such as budgets"],
    modelAnswer: "Financial accounting reports past performance to outsiders in a format set by law, whereas management accounting gives managers flexible information, including budgets, for planning and control.",
    explanation: "Pairs of contrasts earn the marks.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the role of an auditor.",
    points: ["An independent person who examines the accounts and records", "Gives an opinion on whether the statements are fair, so users can rely on them"],
    modelAnswer: "An auditor is independent of the business. He examines the accounts and gives an opinion on whether they are fair, which helps users to rely on them.",
    hints: ["Think of independence and the opinion."],
    explanation: "Independence and an opinion on fairness.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A small furniture workshop owner says: 'I only need the income statement; cost accounting is a waste of time.' Evaluate this view.",
    points: ["The income statement shows the overall profit but not the cost or profit of each product", "Without product costs, prices may be set too low and unprofitable lines may continue", "For a very small business with one product the benefit may not justify much cost, so a simple costing method might be enough"],
    modelAnswer: "The income statement shows only total profit, so the owner would not know which products make money, and prices could be too low. A simple costing method would help, although a very small workshop with one product may not need an elaborate system.",
    hints: ["What does the income statement not show?"],
    explanation: "A reasoned judgement that weighs benefit against cost.",
  });

  // Structured 1: 8 marks
  const mat = 3400;
  const lab = 2150;
  const oh = 1250;
  const total = sum([mat, lab, oh]);
  const units = 250;
  const per = r2(total / units);
  check("total", total, 6800);
  check("per", per, 27.2);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rudo's bakery in Mutare made 250 wedding cakes in a month. The costs were: direct materials ${money(mat)}, direct labour ${money(lab)} and production overheads ${money(oh)}.`,
    parts: [
      P.match({ label: "(a)", stem: "Match each task to the branch of accounting.", pairs: ["Recording the purchase of flour", "Calculating the cost per cake", "Comparing actual and budgeted costs", "Reporting the month's profit to the bank"], right: ["Bookkeeping", "Cost accounting", "Management accounting", "Financial reporting"], rightIndex: [0, 1, 2, 3], explanation: "Recording is bookkeeping; the unit cost is cost accounting; budget comparison is management accounting; the bank report is financial reporting." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: total, wrong: [sum([mat, lab])], stem: "Calculate the total cost of the 250 cakes.", explanation: "3,400 + 2,150 + 1,250 = 6,800." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: per, dp: 2, wrong: [total], stem: "Calculate the cost per cake.", explanation: "6,800 ÷ 250 = 27.20." }),
    ],
    hints: ["Unit cost = total cost ÷ number of units."],
    explanation: "This item tests the branches and a unit cost.",
  });

  // Structured 2: 12 marks
  const budgetC = 21500;
  const actualC = sum([8900, 6700, 2900]);
  const varc = r2(budgetC - actualC);
  check("actualC", actualC, 18500);
  check("varc", varc, 3000);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Chinhoyi Metal Works makes gates. For a contract of 60 gates the budgeted cost was ${money(budgetC)}. The actual costs were: direct materials ${money(8900)}, direct labour ${money(6700)} and production overheads ${money(2900)}. The contract price was ${money(24000)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: actualC, wrong: [sum([8900, 6700])], stem: "Calculate the actual cost of the contract.", explanation: "8,900 + 6,700 + 2,900 = 18,500." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: varc, wrong: [r2(budgetC + actualC)], stem: "Calculate the amount by which the actual cost was below the budgeted cost (favourable).", explanation: "21,500 - 18,500 = 3,000 favourable." }),
      P.mcq({ label: "(c)", marks: 2, stem: "Which branch of accounting produced the comparison in (b)?", options: [["Management accounting", "Correct: comparing actual with budget is a control task for managers."], ["Auditing", "Auditors do not compare costs with budgets."], ["Bookkeeping", "Bookkeeping records transactions only."], ["Taxation and tax planning", "Taxation calculates tax payable."]], answer: "A", explanation: "Budgetary control is management accounting." }),
      P.manual({ label: "(d)", marks: 3, stem: "Distinguish between the information given to the bank (income statement) and the information given to the manager (the cost comparison).", points: ["The bank receives a historic statement in a set format showing overall profit", "The manager receives detailed cost figures compared with the budget, which are used to control costs", "The comparison is internal and flexible; the bank statement follows laws and standards"], modelAnswer: "The bank gets a historic income statement in a set format showing the overall profit. The manager gets detailed cost figures compared with the budget so that costs can be controlled; this report is internal and flexible.", explanation: "Contrast purpose, format and users." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether the owner should rely only on the income statement to decide whether to accept similar contracts in future.", points: ["The income statement shows the overall profit but not the profit on each contract", "Cost and budget information shows where costs were saved and what the cost of a similar contract is likely to be", "A decision needs both: the statement for the overall picture and the cost information for pricing"], modelAnswer: "The income statement does not show the profit on each contract, so it cannot show whether similar contracts will pay. The cost and budget figures show what a contract costs and where costs can be controlled. The owner needs both.", explanation: "A balanced conclusion earns the last mark." }),
    ],
    hints: ["Actual cost is the sum of the three types of cost.", "Favourable means the cost is below the budget."],
    explanation: "This item tests cost accounting, management accounting and the use of the income statement.",
  });

  b.card("DEFINITION", "What is **financial accounting**?", "Recording and summarising transactions and preparing statements of past performance and position.");
  b.card("DEFINITION", "What is **cost accounting**?", "Collecting and analysing costs to find and control the cost of products, jobs or services.");
  b.card("DEFINITION", "What is **management accounting**?", "Providing financial and other information to managers for planning, control and decisions.");
  b.card("DEFINITION", "What is **auditing**?", "An independent examination of the accounts, resulting in an opinion on their fairness.");
  b.card("CONCEPT", "Financial against management accounting", "Financial: past, outsiders, set format. Management: past and future, managers, flexible.");
  b.card("FACT", "Typical outputs of cost accounting", "Cost statements, cost per unit, job costs.");
  b.card("FACT", "Typical outputs of management accounting", "Budgets, variance reports, break-even and appraisal statements.");
  b.card("FACT", "Role of bookkeeping", "Day-to-day recording of transactions; the data for financial accounting.");
});
