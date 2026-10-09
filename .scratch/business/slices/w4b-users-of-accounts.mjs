// W4b: users of accounts and the limits of ratio analysis (CAM 5.5.3).
import { concept, P, money, fmt, round, table, f } from "../lib.mjs";

concept("bus.finance.users-of-accounts", { file: "finance/users-of-accounts", keyPrefix: "finance.users-of-accounts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** user of accounts?",
    options: [
      ["The managers of the business", "Correct: managers work inside the business."],
      ["A bank considering a loan", "A bank is outside the business: an external user."],
      ["A supplier of raw materials", "Suppliers are external users."],
      ["The government tax authority", "The tax authority is external."],
    ],
    answer: "A",
    explanation: "Internal users are managers, directors and employees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A supplier is deciding whether to give a business 60 days' credit. Which ratio is it **most** likely to study?",
    options: [
      ["The acid test ratio", "Correct: it shows whether the business can pay short-term debts."],
      ["The gross profit margin", "This shows profitability, not the ability to pay on time."],
      ["Return on capital employed", "ROCE interests investors more than suppliers."],
      ["The mark-up on goods", "Mark-up shows pricing, not ability to pay."],
    ],
    answer: "A",
    explanation: "Suppliers giving credit are concerned with liquidity: the current ratio and the acid test.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why would a potential shareholder study a company's ROCE?",
    options: [
      ["To judge the return the company earns on the money invested in it", "Correct: a higher ROCE suggests better returns and dividends."],
      ["To find out how quickly the company pays its suppliers", "That relates to liquidity and payment periods."],
      ["To decide whether to supply goods to the company on credit", "That is a supplier's decision."],
      ["To calculate how much tax the company owes this year", "That is the tax authority's concern."],
    ],
    answer: "A",
    explanation: "Investors compare ROCE with other investments and with interest rates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might employees and their trade union study a company's accounts?",
    options: [
      ["To judge whether the company can afford a pay rise", "Correct: profit shows whether higher wages are affordable."],
      ["To decide whether to lend the company money", "That is a lender's decision."],
      ["To set the rate of corporate tax the company pays", "Tax rates are set by government."],
      ["To choose the company's suppliers", "Managers choose suppliers."],
    ],
    answer: "A",
    explanation: "Employees use accounts to judge job security and the ability to pay higher wages.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which is a limitation of ratio analysis?",
    options: [
      ["Ratios show what has changed but not why it changed", "Correct: users must look for the causes."],
      ["Ratios allow businesses of different sizes to be compared", "This is an advantage of ratios."],
      ["Ratios are calculated from published accounts", "Being based on accounts is not itself a limitation."],
      ["Ratios can be compared with those of previous years", "Comparison over time is a strength."],
    ],
    answer: "A",
    explanation: "A falling margin could have many causes; ratios alone do not explain them.",
    hints: ["What can a ratio not tell you?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which factor would **not** be shown in a company's accounts?",
    options: [
      ["The skills and motivation of its employees", "Correct: non-financial factors are missing from accounts."],
      ["The amount it owes to its suppliers for goods", "Trade payables appear as a current liability."],
      ["The value of its inventory", "Inventory appears as a current asset."],
      ["The profit it made during the year", "Profit appears in the statement of profit or loss."],
    ],
    answer: "A",
    explanation: "Accounts record financial items only; staff skills, morale and reputation are not shown.",
    hints: ["Think of things that are valuable but hard to put a money value on."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Comparing the ROCE of a mining company with that of a hair salon may be misleading **mainly** because:",
    options: [
      ["they are in industries with very different capital needs", "Correct: comparisons are fairest within the same industry."],
      ["ROCE cannot be calculated for small businesses", "ROCE can be calculated for any business with capital."],
      ["mining companies are never required to publish any accounts", "Companies are required to prepare accounts."],
      ["a hair salon has no capital employed in it at all", "A salon has equipment and owner's capital."],
    ],
    answer: "A",
    explanation: "Ratios should be compared with similar businesses; industries differ in capital needs and normal margins.",
    hints: ["Is the comparison like with like?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Banks are external users of a business's accounts.",
    answer: true,
    explanation: "True. Banks are outside the business and use accounts to decide whether to lend.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Because accounts are checked carefully, they show exactly how a business will perform next year.",
    answer: false,
    explanation: "False. Accounts are historical; future performance depends on changing conditions.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each user with the decision it makes using the accounts.",
    pairs: [
      ["Bank", "Whether to lend and on what terms"],
      ["Shareholder", "Whether to buy, keep or sell shares"],
      ["Supplier", "Whether to give credit and for how long"],
      ["Managers", "How to control costs and plan expansion"],
      ["Tax authority", "How much tax the business must pay"],
    ],
    explanation: "Each user reads the same accounts for a different decision.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Shareholders are mainly interested in {{blank:a}} ratios, while suppliers and banks are mainly interested in {{blank:b}} ratios.",
    blanks: [
      { id: "a", accepted: ["profitability"], choices: ["profitability", "liquidity", "stock", "mark-up"] },
      { id: "b", accepted: ["liquidity"], choices: ["liquidity", "profitability", "productivity", "market share"] },
    ],
    explanation: "Returns matter to investors; ability to pay matters to creditors.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the general name for people outside a business, such as banks and suppliers, who use its accounts.",
    accepted: ["external users", "external user", "external stakeholders", "external users of accounts"],
    wrong: ["internal users"],
    explanation: "People outside the business who use accounts are external users.",
  });
  // Numerical, comparing with an interest rate.
  const p1 = 27000, ce1 = 300000, rate = 10;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: f.roce(p1, ce1), calculator: true,
    stem: `An investor is considering a company with profit of ${money(p1)} and capital employed of ${money(ce1)}. Calculate the company's ROCE, to one decimal place.`,
    wrong: [round(ce1 / p1, 1)],
    explanation: `${fmt(p1)} ÷ ${fmt(ce1)} × 100 = ${round(f.roce(p1, ce1), 1)}%. Assume savings pay ${rate}%: the company earns less than this.`,
    workedSolution: `1. ROCE = profit ÷ capital employed × 100.\n2. = ${fmt(p1)} ÷ ${fmt(ce1)} × 100 = ${round(f.roce(p1, ce1), 1)}%.`,
    hints: ["Divide profit by capital employed."],
  });
  const ca2 = 19500, inv2 = 11500, cl2 = 16000;
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: f.acidTest(ca2, inv2, cl2),
    stem: `A supplier checks a customer's accounts: current assets ${money(ca2)}, of which inventory ${money(inv2)}; current liabilities ${money(cl2)}. Calculate the acid test ratio as x : 1 to two decimal places (enter x).`,
    wrong: [round(f.current(ca2, cl2), 2)],
    explanation: `(${fmt(ca2)} − ${fmt(inv2)}) ÷ ${fmt(cl2)} = ${round(f.acidTest(ca2, inv2, cl2), 2).toFixed(2)} : 1: the supplier should be cautious about giving credit.`,
    hints: ["Leave out inventory."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** limitations of using a company's published accounts to decide whether to buy its shares.",
    points: [
      "Limitation 1, e.g. historical: shows last year, not the future (1)",
      "Explained: new competitors or rising costs may change results (1)",
      "Limitation 2, e.g. non-financial factors missing / figures are estimates / limited detail (1)",
      "Explained: management quality, staff morale and brand reputation affect future profit but are not shown (1)",
    ],
    modelAnswer: "Accounts show last year's results, but the investor is buying future returns; a new competitor or higher costs could make next year very different. Accounts also leave out non-financial factors such as the quality of management and the reputation of the brand, which strongly affect future profits.",
    explanation: "Historical data, missing non-financial factors, estimates and limited detail limit the usefulness of accounts.",
    hints: ["What does an investor really want to know about?"],
  });
  // Structured 1: bank lending decision.
  const K = { rev: 400000, p: 36000, ce: 240000, ca: 70000, inv: 40000, cl: 50000, ncl: 120000 };
  const tbl = table(["Item", "US\\$"], [["Revenue", K.rev], ["Profit for the year", K.p], ["Capital employed", K.ce], ["Current assets", K.ca], ["of which inventory", K.inv], ["Current liabilities", K.cl], ["Non-current liabilities (existing loans)", K.ncl]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Kwekwe Builders Ltd has asked a bank for a ${money(60000)} loan to buy a new truck. Assume the bank's interest rate is 13%. Figures from its latest accounts are shown below.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "pct", value: f.roce(K.p, K.ce), stem: "Calculate the ROCE, to one decimal place.", wrong: [round(f.profitMargin(K.p, K.rev), 1)], explanation: `${fmt(K.p)} ÷ ${fmt(K.ce)} × 100 = ${round(f.roce(K.p, K.ce), 1)}%.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "ratio", value: f.acidTest(K.ca, K.inv, K.cl), stem: "Calculate the acid test ratio as x : 1 to two decimal places (enter x).", wrong: [round(f.current(K.ca, K.cl), 2)], explanation: `(${fmt(K.ca)} − ${fmt(K.inv)}) ÷ ${fmt(K.cl)} = ${round(f.acidTest(K.ca, K.inv, K.cl), 2).toFixed(2)} : 1.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify **two** other users of Kwekwe Builders' accounts and the decision each would make.", points: ["User and decision, e.g. shareholders: whether to keep shares (1)", "User and decision, e.g. suppliers: whether to give credit / employees: pay claims (1)"] }),
      P.manual({ label: "(d)", marks: 6, stem: "Should the bank lend Kwekwe Builders Ltd the money? Justify your answer.", points: [`ROCE ${round(f.roce(K.p, K.ce), 1)}% is above the assumed 13% interest rate: profitable use of capital (1)`, `Acid test ${round(f.acidTest(K.ca, K.inv, K.cl), 2).toFixed(2)} : 1 is below 1 : 1: relies on inventory (1)`, `Existing loans of ${money(K.ncl)} are large; another loan adds interest (1)`, "The truck could be security for the loan (1)", "Limitations: accounts are historical; need a cash flow forecast / order book (1)", "Justified decision with conditions (1)"] }),
    ],
    explanation: `ROCE ${round(f.roce(K.p, K.ce), 1)}%; acid test ${round(f.acidTest(K.ca, K.inv, K.cl), 2).toFixed(2)} : 1.`,
    hints: ["ROCE = profit ÷ capital employed × 100.", "Acid test leaves out inventory."],
  });
  // Structured 2: limitations in comparison.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "Rudo wants to invest her savings in one of two fictional companies. Company P, a mobile-phone retailer, has a profit margin of 6% and ROCE of 18%. Company Q, a tourist lodge near Victoria Falls, has a profit margin of 25% and ROCE of 9%. Both sets of accounts are for last year.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which company earned more profit for each dollar of capital invested?", options: [["Company P", "Correct: ROCE 18% v 9%."], ["Company Q", "Q has the higher margin but the lower ROCE."], ["Both earned the same", "The ROCEs differ."], ["It cannot be calculated", "ROCE answers exactly this question."]], answer: "A" }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the two companies' profit margins are so different.", points: ["Different industries (1)", "Retailer sells high volumes at low margins / competition on price (1)", "Lodge charges high prices relative to running costs but needs large capital (buildings) (1)"] }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate how useful these ratios are to Rudo in making her decision.", points: ["Useful: ROCE allows comparison of returns despite different sizes (1)", "Useful: margins show how much of sales becomes profit (1)", "Limit: different industries, so comparison is not like with like (1)", "Limit: historical; tourism may change / new competitors (1)", "Limit: non-financial factors (management, risk) and causes not shown (1)", "Justified conclusion: useful starting point, needs more information (1)"] }),
    ],
    explanation: "P earns the higher return on capital; comparisons across industries and with past data have limits.",
    hints: ["Which ratio measures return on money invested?"],
  });
  b.card("DEFINITION", "Users of accounts", "People who read financial statements to make decisions: internal (managers, employees) and external (shareholders, lenders, suppliers, customers, government, competitors).");
  b.card("CONCEPT", "Shareholders' use of accounts", "Profitability and ROCE to decide whether to buy, keep or sell shares.");
  b.card("CONCEPT", "Lenders' and suppliers' use", "Liquidity ratios, existing debt and security to decide whether to lend or give credit.");
  b.card("CONCEPT", "Managers' use", "All ratios compared with budgets and past years to set prices, control costs and plan growth.");
  b.card("CONCEPT", "Limitations of accounts", "Historical; snapshot; estimates; non-financial factors missing; limited detail.");
  b.card("CONCEPT", "Limitations of ratio analysis", "Need comparison; different sizes, industries and methods; show what not why; inflation; cannot predict the future.");
  b.card("FACT", "Employees and unions", "Use profit figures to judge job security and whether the business can afford a pay rise.");
  b.card("FACT", "Government", "Uses accounts to assess tax and to check the business obeys the law.");
});
