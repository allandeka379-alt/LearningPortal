// W4b: cash and solving cash-flow problems (BES 7.5.4, CAM 5.2.1).
import { concept, P, money, fmt, r2, cashFlow } from "../lib.mjs";

concept("bus.finance.cash-flow-problems", { file: "finance/cash-flow-problems", keyPrefix: "finance.cash-flow-problems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **cash flow**?",
    options: [
      ["The movement of money into and out of a business over a period", "Correct: cash flow is about inflows and outflows of cash over time."],
      ["The profit left after all of a business's expenses are paid", "That describes profit, which is not the same as cash."],
      ["The total value of the goods a business has in its store", "That is inventory, which is not cash until it is sold."],
      ["The amount of money the owners first put into the business", "That is the owner's capital, only one possible inflow."],
    ],
    answer: "A",
    explanation: "Cash flow is the movement of cash in (inflows) and out (outflows) of a business over a period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which transaction increases a business's profit for the month but does **not** increase its cash that month?",
    options: [
      ["Selling goods to a customer on 30 days' credit", "Correct: the sale counts as revenue now, but the cash arrives next month."],
      ["Receiving a bank loan to buy new equipment", "A loan raises cash but is not revenue, so it does not raise profit."],
      ["Selling goods for cash at a market stall", "A cash sale raises both revenue and cash at the same time."],
      ["The owner putting her savings into the business", "Capital introduced raises cash but is not revenue or profit."],
    ],
    answer: "A",
    explanation: "Credit sales are counted in revenue (and so profit) when the sale is made, but cash comes in only when the customer pays.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a business that makes a profit still have to close?",
    options: [
      ["It may not have enough cash to pay its debts when they are due", "Correct: creditors can take action against an insolvent business even if it is profitable."],
      ["Profit is always smaller than the cash held in the bank account", "Profit and cash are different measures; either can be larger."],
      ["Profitable businesses must pay all of their profit out to the owners", "Owners can choose to keep profit in the business."],
      ["Banks are not allowed to lend money to businesses that make a profit", "Banks prefer to lend to profitable businesses."],
    ],
    answer: "A",
    explanation: "Survival depends on liquidity: a business that cannot pay suppliers, wages or loans when due is insolvent and may be forced to close.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a cause of a short-term cash-flow problem?",
    options: [
      ["Allowing customers much longer to pay than suppliers allow the business", "Correct: cash goes out to suppliers before cash comes in from customers."],
      ["Asking customers to pay for their goods in cash on delivery", "This brings cash in sooner, which helps cash flow."],
      ["Selling off old stock that has been in the store for a long time", "Selling stock turns it back into cash."],
      ["Leasing a delivery van instead of buying it outright", "Leasing spreads the cost and avoids a large outflow."],
    ],
    answer: "A",
    explanation: "If customers take 60 days to pay but suppliers want payment in 30 days, the business pays out before it receives cash.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A clothing factory receives a very large order and buys extra fabric and hires more workers before the customer pays. It runs out of cash. What is this called?",
    options: [
      ["Overtrading", "Correct: expanding faster than the cash available to pay for the growth."],
      ["Bad debts", "Bad debts are amounts customers never pay; this customer has not failed to pay."],
      ["Insurance", "Insurance protects against risks; it does not describe this problem."],
      ["Destocking", "Destocking means reducing inventory, the opposite of what happened."],
    ],
    answer: "A",
    explanation: "Overtrading happens when a business grows quickly and spends cash on materials and wages before the extra sales bring cash in.",
    hints: ["The business is growing too fast for its cash."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A tuck shop expects a cash shortage for **one month** only, until a large payment from a school arrives. Which is the **most** suitable solution?",
    options: [
      ["Arrange a bank overdraft for that month", "Correct: an overdraft is flexible short-term finance repaid when the school pays."],
      ["Take out a ten-year bank loan", "A long-term loan is unsuitable for a one-month gap and costs interest for years."],
      ["Sell shares to the public on the stock exchange", "A tuck shop cannot sell shares to the public, and this is long-term finance."],
      ["Stop selling goods to any of its customers", "Stopping sales would reduce cash inflows and make the problem worse."],
    ],
    answer: "A",
    explanation: "Match finance to the problem: a short, temporary shortage suits an overdraft that is repaid when the expected cash arrives.",
    hints: ["How long will the problem last?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business delays paying its suppliers to improve its cash flow. What is the **main** risk of doing this?",
    options: [
      ["Suppliers may stop supplying or refuse credit in the future", "Correct: late payment damages the relationship with suppliers."],
      ["Customers will have to pay their own bills more quickly", "Delaying payments to suppliers does not affect customers' credit terms."],
      ["The business will have to pay a higher rate of income tax", "Paying suppliers late has no effect on tax rates."],
      ["Its sales revenue will be counted in a different year", "Paying suppliers later does not change when revenue is recorded."],
    ],
    answer: "A",
    explanation: "Delaying payments keeps cash in the business, but suppliers may lose trust, refuse credit, raise prices or withdraw discounts.",
    hints: ["Think about the supplier's point of view."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action would **reduce** a business's cash inflows in the next month?",
    options: [
      ["Giving customers 60 days to pay instead of 30 days", "Correct: money from customers arrives later, so inflows fall next month."],
      ["Delaying the purchase of a new computer until next year", "This reduces outflows, not inflows."],
      ["Offering a small discount to customers who pay in cash", "This encourages earlier payment and raises inflows."],
      ["Selling a machine the business no longer uses", "Selling an unused asset brings cash in."],
    ],
    answer: "A",
    explanation: "Longer credit to customers delays receipts, so cash inflows in the coming month fall.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business that cannot pay its debts when they are due is said to be insolvent.",
    answer: true,
    explanation: "True. Insolvency means being unable to pay debts on time; creditors may then take legal action.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank loan received by a business increases its profit for the year.",
    answer: false,
    explanation: "False. A loan is a cash inflow but not revenue; it must be repaid, so it does not increase profit.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each cash-flow problem with the most suitable solution.",
    pairs: [
      ["Customers are taking three months to pay their bills", "Offer a discount for prompt payment"],
      ["A new delivery van is due to be bought in a month when cash is low", "Delay the purchase or lease the van"],
      ["The store is full of slow-selling stock", "Hold a clearance sale to turn stock into cash"],
      ["Wages are due a week before a large customer payment arrives", "Use a short-term bank overdraft"],
    ],
    explanation: "Each solution tackles the cause: late customers, a large asset purchase, cash tied up in stock, and a short timing gap.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Selling goods on credit increases {{blank:a}} when the sale is made but increases {{blank:b}} only when the customer pays. Spending too much cash on growth before sales bring cash in is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["profit"], choices: ["profit", "cash", "capital", "liabilities"] },
      { id: "b", accepted: ["cash"], choices: ["cash", "profit", "inventory", "expenses"] },
      { id: "c", accepted: ["overtrading"], choices: ["overtrading", "insolvency", "destocking", "leasing"] },
    ],
    explanation: "Revenue and profit are recorded at the sale; cash moves when the customer pays. Rapid growth without enough cash is overtrading.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the short-term bank facility that lets a business pay out more than it has in its current account, up to an agreed limit.",
    accepted: ["overdraft", "bank overdraft", "an overdraft", "a bank overdraft", "overdraft facility"],
    wrong: ["loan"],
    explanation: "An overdraft lets the account go below zero up to an agreed limit; interest is paid only on the amount used.",
  });
  // Calculations (figures differ from the lesson).
  const units = 40, price = 35, cost = 900;
  const rev = units * price;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: rev - cost, daily: true,
    stem: `Rudo sells ${units} school jerseys at ${money(price)} each to a school on 60 days' credit. The wool and wages for the jerseys cost ${money(cost)}, paid in cash this month. Calculate the profit Rudo makes on the order.`,
    wrong: [rev, cost],
    explanation: `Revenue = ${units} × ${money(price)} = ${money(rev)}; profit = ${money(rev)} − ${money(cost)} = ${money(rev - cost)}. Cash this month still falls by ${money(cost)}, because the school has not paid.`,
    workedSolution: `1. Revenue = ${units} × ${fmt(price)} = ${money(rev)}.\n2. Profit = ${fmt(rev)} − ${fmt(cost)} = ${money(rev - cost)}.`,
  });
  const ob = 580, cin = 3150, cout = 4260;
  const close = r2(ob + cin - cout);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: -close,
    stem: `A hardware shop starts the month with ${money(ob)} in the bank. Cash inflows for the month are ${money(cin)} and cash outflows are ${money(cout)}. Calculate the size of the overdraft the shop will need at the end of the month.`,
    wrong: [r2(cout - cin), r2(cout - cin + ob)],
    explanation: `Net cash flow = ${fmt(cin)} − ${fmt(cout)} = (${fmt(cout - cin)}); closing balance = ${fmt(ob)} − ${fmt(cout - cin)} = (${fmt(-close)}), so an overdraft of ${money(-close)} is needed.`,
    workedSolution: `1. Net cash flow = ${fmt(cin)} − ${fmt(cout)} = −${fmt(cout - cin)}.\n2. Closing balance = opening + net cash flow = ${fmt(ob)} − ${fmt(cout - cin)} = −${fmt(-close)}.\n3. The overdraft needed is ${money(-close)}.`,
    hints: ["Find the net cash flow first.", "Do not forget the opening balance."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a profitable business might have a cash-flow problem.",
    points: [
      "Reason 1, e.g. sales on credit / customers pay late (1)",
      "Explained: revenue and profit are recorded but cash has not yet been received (1)",
      "Reason 2, e.g. buying a non-current asset / building up inventory / repaying a loan (1)",
      "Explained: a large cash outflow now, although only part of the cost (or none of it) reduces this year's profit (1)",
    ],
    modelAnswer: "First, the business may sell on credit. The sale counts as revenue and profit now, but the cash arrives only when the customer pays. Second, it may buy a new machine for cash. The whole price leaves the bank at once, but only part of the cost is charged against this year's profit.",
    explanation: "Profit and cash differ in timing: credit sales, asset purchases, inventory and loan repayments.",
    hints: ["When is a credit sale counted? When does the cash arrive?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A small engineering firm plans to solve a cash shortage by asking its customers to pay within 14 days instead of 45 days. Explain **one** advantage and **one** disadvantage of this solution.",
    points: [
      "Advantage: cash from sales arrives sooner (1)",
      "Developed: firm can pay suppliers, wages or avoid overdraft interest (1)",
      "Disadvantage: customers may be unhappy / switch to rivals giving longer credit (1)",
      "Developed: sales and future cash inflows may fall (1)",
    ],
    modelAnswer: "Cash from customers would arrive about a month sooner, so the firm could pay its suppliers and wages without paying overdraft interest. However, customers used to 45 days may move to rival firms that still give long credit, so sales and future cash inflows could fall.",
    explanation: "Shorter credit improves cash flow but may lose customers; evaluation weighs both.",
    hints: ["Who is affected by the change: the firm and its customers."],
  });
  // Structured 1: complete and solve a forecast.
  const cf = cashFlow({
    months: ["July", "August", "September"],
    opening: 320,
    inflows: [["Cash sales", [2650, 2150, 3050]], ["Receipts from debtors", [850, 750, 1450]]],
    outflows: [["Purchases", [1750, 1850, 1650]], ["Wages", [950, 950, 950]], ["Rent", [350, 350, 350]], ["Freezer", [0, 1600, 0]]],
    blanks: ["Net cash flow:1", "Closing balance:1", "Opening balance:2"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Chipo runs a butchery in Kwekwe. She has prepared this cash flow forecast (cash budget). She plans to buy a new freezer in August.\n\n${cf.md}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: -cf.net[1], stem: "Calculate the net cash outflow for August (enter it as a positive number).", wrong: [cf.totalOut[1], r2(cf.totalOut[1] - cf.totalIn[1] - 1500)], explanation: `Total inflows ${fmt(cf.totalIn[1])} − total outflows ${fmt(cf.totalOut[1])} = (${fmt(-cf.net[1])}).` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: -cf.closing[1], stem: "Calculate the size of the overdraft Chipo will need at the end of August (enter it as a positive number).", wrong: [-cf.net[1], r2(-cf.net[1] + cf.opening[1])], explanation: `Opening ${fmt(cf.opening[1])} + net cash flow (${fmt(-cf.net[1])}) = (${fmt(-cf.closing[1])}).` }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify the **main** cause of the cash shortage in August. Use the forecast.", points: [`The freezer costing ${money(1600)} is paid for in August (1)`, "At the same time inflows fall: cash sales and debtor receipts are lower than in July (1)"] }),
      P.manual({
        label: "(d)", marks: 6, stem: "Chipo could delay buying the freezer until September or arrange a bank overdraft. Recommend which she should choose. Justify your answer.",
        points: [
          "Delay: avoids the shortage and interest; September has a large positive net cash flow (1)",
          "But meat may spoil / sales lost if the old freezer fails; risk to food safety (1)",
          "Overdraft: freezer bought on time; needed for only one month (1)",
          `Uses the forecast: September net cash flow of ${money(cf.net[2])} repays the overdraft (1)`,
          "Drawback of overdraft: interest and fees; bank may refuse or recall (1)",
          "Justified recommendation linked to the condition of the old freezer / cost (1)",
        ],
      }),
    ],
    explanation: `August net cash flow (${fmt(-cf.net[1])}); closing (${fmt(-cf.closing[1])}). The freezer and lower receipts cause it; delay or a short overdraft solves it.`,
    workedSolution: `1. August inflows = ${fmt(cf.totalIn[1])}; outflows = ${fmt(cf.totalOut[1])}.\n2. Net cash flow = ${fmt(cf.totalIn[1])} − ${fmt(cf.totalOut[1])} = −${fmt(-cf.net[1])}.\n3. Closing balance = ${fmt(cf.opening[1])} − ${fmt(-cf.net[1])} = −${fmt(-cf.closing[1])}.\n4. September closing = −${fmt(-cf.closing[1])} + ${fmt(cf.net[2])} = ${fmt(cf.closing[2])}.`,
    hints: ["Net cash flow = total inflows − total outflows.", "Closing balance = opening balance + net cash flow."],
  });
  // Structured 2: cash v profit and solutions.
  const sales2 = 5200, credit2 = 3400, costs2 = 4300;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, calculator: true,
    stem: `Farai runs a building-materials business in Gweru. Last month his sales were ${money(sales2)}, of which ${money(credit2)} were on credit to builders who pay after 60 days; the rest were cash sales. All of his costs for the month, ${money(costs2)}, were paid in cash. Several builders are now paying late, and Farai is worried about paying his suppliers next month.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: sales2 - costs2, stem: "Calculate Farai's profit for the month.", wrong: [sales2 - credit2 - costs2], explanation: `${fmt(sales2)} − ${fmt(costs2)} = ${money(sales2 - costs2)}; credit sales count as revenue.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: costs2 - (sales2 - credit2), stem: "Calculate by how much Farai's cash fell during the month (enter a positive number).", wrong: [sales2 - costs2, credit2], explanation: `Cash in = ${fmt(sales2)} − ${fmt(credit2)} = ${fmt(sales2 - credit2)}; cash out = ${fmt(costs2)}; fall = ${money(costs2 - (sales2 - credit2))}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why Farai made a profit but his cash fell.", points: ["Credit sales counted as revenue/profit but cash not yet received (1)", "All costs paid in cash this month, so outflows exceed inflows (1)"] }),
      P.manual({
        label: "(d)", marks: 5, stem: "Evaluate **two** ways Farai could improve his cash flow. Recommend the better one.",
        points: [
          "Way 1, e.g. ask builders to pay sooner / discount for prompt payment / cash on delivery for late payers (1)",
          "Evaluated: brings cash in, but builders may buy elsewhere / discount reduces revenue (1)",
          "Way 2, e.g. overdraft / ask suppliers for longer credit (1)",
          "Evaluated: quick, but interest cost / supplier goodwill at risk (1)",
          "Justified recommendation linked to late-paying builders (1)",
        ],
      }),
    ],
    explanation: `Profit ${money(sales2 - costs2)}, but cash fell by ${money(costs2 - (sales2 - credit2))} because ${money(credit2)} of sales were on credit.`,
    hints: ["Cash in this month = cash sales only.", "Compare cash in with costs paid in cash."],
  });
  b.card("DEFINITION", "Cash flow", "The movement of cash into (inflows) and out of (outflows) a business over a period.");
  b.card("CONCEPT", "Cash v profit", "Profit is counted when a sale is made; cash only when money moves. Credit sales and purchases, buying assets, inventory and loans make them differ.");
  b.card("DEFINITION", "Insolvent", "Unable to pay debts when they are due; creditors may take action and the business may close even if it is profitable.");
  b.card("CONCEPT", "Why cash matters", "To pay suppliers, wages, bills and loan repayments, and to take opportunities such as cash discounts.");
  b.card("CONCEPT", "Causes of cash-flow problems", "Long credit to customers, bad debts, overtrading, too much inventory, large asset purchases, poor forecasting, seasonal demand.");
  b.card("CONCEPT", "Solutions to short-term cash problems", "Overdraft; delay payments to suppliers; ask customers to pay sooner; delay buying non-current assets; lease; sell surplus stock.");
  b.card("DEFINITION", "Overtrading", "Expanding faster than the cash available, so cash runs out before extra sales bring money in.");
  b.card("FORMULA", "Closing balance", "Closing balance = opening balance + (total inflows − total outflows).");
  b.card("FACT", "Matching finance to the problem", "A short gap suits an overdraft or delayed payment; a long-term problem needs higher sales, lower costs or long-term finance.");
});
