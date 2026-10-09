// W4b: profit and why it matters (BES 7.5.3, CAM 5.3.1).
import { concept, P, money, fmt, r2, sum, table } from "../lib.mjs";

concept("bus.finance.profit", { file: "finance/profit", keyPrefix: "finance.profit" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is profit calculated?",
    options: [
      ["Revenue minus total costs", "Correct: profit is what is left from revenue after all costs."],
      ["Revenue minus the cost of sales only", "That gives gross profit, before expenses are deducted."],
      ["Selling price multiplied by quantity sold", "That gives revenue, not profit."],
      ["Cash received minus cash paid out", "That is net cash flow, which is not the same as profit."],
    ],
    answer: "A",
    explanation: "Profit = revenue − total costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is retained profit often called the cheapest source of finance?",
    options: [
      ["No interest is paid and it does not have to be repaid", "Correct: it belongs to the owners and is kept in the business."],
      ["Banks add extra money to every dollar of retained profit", "Banks do not add to retained profit."],
      ["Retained profit is not counted when the business pays tax", "Tax is charged on profit before it is retained."],
      ["It can be used only to pay the wages of employees", "Retained profit can be used for any business purpose."],
    ],
    answer: "A",
    explanation: "Retained profit costs no interest, needs no repayment and does not dilute ownership.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Profit is described as a reward for risk-taking. Whose risk does it reward?",
    options: [
      ["The owners, who could lose the money they invested", "Correct: owners risk their capital and are rewarded by profit."],
      ["The customers, who might buy a faulty product", "Customers are protected by consumer law, not rewarded by profit."],
      ["The suppliers, who deliver goods before being paid", "Suppliers are rewarded by the price they charge."],
      ["The government, which collects tax from the business", "The government does not invest at risk in a private business."],
    ],
    answer: "A",
    explanation: "Entrepreneurs and shareholders risk their money; profit is their reward.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about gross profit is correct?",
    options: [
      ["It is revenue minus the cost of the goods that were sold", "Correct: expenses have not yet been deducted."],
      ["It is always smaller than the profit for the year", "Profit is gross profit minus expenses, so it is usually smaller."],
      ["It is the cash a business has in the bank at the year end", "Gross profit is a calculation, not cash held."],
      ["It is the money the owners put into the business", "That is capital."],
    ],
    answer: "A",
    explanation: "Gross profit = revenue − cost of sales; profit = gross profit − expenses.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A company's profit has risen for three years in a row. Why might this help it to raise a bank loan?",
    options: [
      ["The bank sees it as more likely to repay the loan and interest", "Correct: a profit record shows the business can afford repayments."],
      ["Banks are required to lend to every company that makes a profit", "Banks choose whom to lend to."],
      ["A profitable company never needs to pay interest on loans", "Interest is still charged."],
      ["Profit can be used as security in place of assets", "Security is an asset the bank can take; profit is not an asset."],
    ],
    answer: "A",
    explanation: "Lenders and investors look for a record of profit as evidence the business is successful and can pay.",
    hints: ["What is the bank worried about when it lends?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A new business makes a loss in its first year. Which objective is it **most** likely to have?",
    options: [
      ["Survival", "Correct: new businesses often aim to survive before they can make a profit."],
      ["Maximising dividends", "A loss-making business cannot pay large dividends."],
      ["Paying the highest wages in its industry", "This is not a likely first-year objective."],
      ["Increasing its retained profit", "With a loss there is no profit to retain."],
    ],
    answer: "A",
    explanation: "In the first year costs are high and customers few; the main aim is usually to survive.",
    hints: ["Think about the problems a business faces in its first year."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organisation is **least** likely to have profit as its main objective?",
    options: [
      ["A community health clinic run by a charity", "Correct: its main aim is to provide a service."],
      ["A private limited company making furniture", "Private companies usually aim for profit."],
      ["A sole trader running a hair salon", "A sole trader relies on profit for income."],
      ["A public limited company listed on a stock exchange", "Shareholders expect profit and dividends."],
    ],
    answer: "A",
    explanation: "Charities and many social enterprises aim to serve people rather than to make profit.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business makes a loss when its total costs are greater than its revenue.",
    answer: true,
    explanation: "True. Profit = revenue − total costs, so a negative result is a loss.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business with very high revenue must be making a profit.",
    answer: false,
    explanation: "False. If total costs are higher than revenue, it makes a loss, however high revenue is.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason why profit matters with the way it helps the business.",
    pairs: [
      ["Reward for risk", "Encourages people to start and invest in businesses"],
      ["Source of finance", "Retained profit pays for new equipment without interest"],
      ["Measure of success", "Shows owners whether the business is improving"],
      ["Attracting investors", "Shareholders expect dividends from a profitable company"],
    ],
    explanation: "Profit rewards risk, finances growth, measures performance and attracts investment.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Revenue minus cost of sales gives {{blank:a}} profit. Profit kept in the business rather than paid to the owners is called {{blank:b}} profit.",
    blanks: [
      { id: "a", accepted: ["gross"], choices: ["gross", "retained", "net", "operating"] },
      { id: "b", accepted: ["retained"], choices: ["retained", "gross", "distributed", "average"] },
    ],
    explanation: "Gross profit comes before expenses; retained profit is kept for future use.",
  });
  const rev1 = 5200, c1 = [["Goods sold", 3100], ["Rent", 400], ["Wages", 900], ["Electricity", 150]];
  const tc1 = sum(c1.map((c) => c[1]));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: rev1 - tc1, daily: true,
    stem: `A tuck shop in Gweru has revenue of ${money(rev1)} for a month. Its costs are: goods sold ${money(3100)}, rent ${money(400)}, wages ${money(900)} and electricity ${money(150)}. Calculate its profit.`,
    wrong: [rev1 - 3100, tc1],
    explanation: `Total costs = ${fmt(tc1)}; profit = ${fmt(rev1)} − ${fmt(tc1)} = ${money(rev1 - tc1)}.`,
  });
  const pr2 = 24000, div2 = 9500;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pr2 - div2,
    stem: `A company makes a profit of ${money(pr2)} and pays ${money(div2)} to its shareholders as dividends. How much profit does it retain?`,
    wrong: [pr2 + div2],
    explanation: `${fmt(pr2)} − ${fmt(div2)} = ${money(pr2 - div2)}.`,
  });
  const q3 = 450, p3 = 14, vc3 = 8, fc3 = 1900;
  const rev3 = q3 * p3, tc3 = fc3 + q3 * vc3;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: rev3 - tc3, calculator: true,
    stem: `Tatenda sells ${q3} handmade baskets a month at ${money(p3)} each. Each basket costs ${money(vc3)} in materials and his monthly fixed costs are ${money(fc3)}. Calculate his monthly profit.`,
    wrong: [rev3 - q3 * vc3, rev3 - fc3],
    explanation: `Revenue = ${q3} × ${fmt(p3)} = ${fmt(rev3)}; total costs = ${fmt(fc3)} + ${q3} × ${fmt(vc3)} = ${fmt(tc3)}; profit = ${money(rev3 - tc3)}.`,
    workedSolution: `1. Revenue = ${q3} × ${fmt(p3)} = ${money(rev3)}.\n2. Total costs = ${fmt(fc3)} + (${q3} × ${fmt(vc3)}) = ${fmt(fc3)} + ${fmt(q3 * vc3)} = ${money(tc3)}.\n3. Profit = ${fmt(rev3)} − ${fmt(tc3)} = ${money(rev3 - tc3)}.`,
    hints: ["Find revenue and total costs separately.", "Total costs = fixed costs + all the material costs."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why profit is important to a sole trader.",
    points: [
      "Reason 1, e.g. reward for risk / income for the owner (1)",
      "Explained: the owner's savings are at risk and profit is their living (1)",
      "Reason 2, e.g. retained profit to expand / evidence for a bank loan (1)",
      "Explained: buys stock or equipment without interest / bank more willing to lend (1)",
    ],
    modelAnswer: "Profit is the sole trader's reward for risking their own savings and is the income they live on. Profit kept in the business can also pay for more stock or new equipment without borrowing, so no interest is paid.",
    explanation: "Profit is income and reward for the owner and a cheap source of finance.",
    hints: ["Think about the owner and about the business's future."],
  });
  // Structured 1: comparing two years.
  const y = [["Revenue", 42000, 51000], ["Total costs", 35000, 46500]];
  const ty = table(["US\\$", "Year 1", "Year 2"], y);
  const p1 = 42000 - 35000, p2 = 51000 - 46500;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, calculator: true,
    stem: `Sipho owns a small private limited company in Bulawayo that repairs mobile phones. These are its results for two years.\n\n${ty}\n\nSipho wants to open a second shop costing ${money(12000)} and is deciding how to finance it.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: p1, stem: "Calculate the profit for Year 1.", wrong: [42000], explanation: `42,000 − 35,000 = ${money(p1)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: p1 - p2, stem: "Calculate by how much profit fell from Year 1 to Year 2.", wrong: [51000 - 42000], explanation: `Year 2 profit = 51,000 − 46,500 = ${fmt(p2)}; fall = ${fmt(p1)} − ${fmt(p2)} = ${money(p1 - p2)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why revenue rose but profit fell.", points: ["Total costs rose faster than revenue (1)", `Costs up by ${money(46500 - 35000)} while revenue rose by only ${money(51000 - 42000)} (1)`] }),
      P.manual({
        label: "(d)", marks: 6, stem: "Sipho could finance the second shop from retained profit or from a bank loan. Recommend which he should use. Justify your answer.",
        points: [
          "Retained profit: no interest, no repayment, no security (1)",
          "But profit is falling: may not have enough retained profit / leaves no cushion (1)",
          "Loan: whole amount available now (1)",
          "But interest increases costs when profit is already falling; bank may doubt repayment (1)",
          "Uses the data: profit fell from US\\$7,000 to US\\$4,500 (1)",
          "Justified recommendation, e.g. delay / mix of both / control costs first (1)",
        ],
      }),
    ],
    explanation: `Profit fell from ${money(p1)} to ${money(p2)} because costs rose faster than revenue.`,
    hints: ["Profit = revenue − total costs."],
  });
  // Structured 2: why profit matters, with figures.
  const rev5 = 68000, cos5 = 39000, exp5 = 17000;
  const gp5 = rev5 - cos5, np5 = gp5 - exp5;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 660, calculator: true,
    stem: `Rudo runs a hair and beauty products shop in Harare as a sole trader. Last year revenue was ${money(rev5)}, the cost of the products sold was ${money(cos5)} and other expenses were ${money(exp5)}. An investor has offered to buy a share of the business if it can show a good profit.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: gp5, stem: "Calculate the gross profit.", wrong: [rev5 - exp5], explanation: `${fmt(rev5)} − ${fmt(cos5)} = ${money(gp5)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: np5, stem: "Calculate the profit for the year.", wrong: [gp5], explanation: `${fmt(gp5)} − ${fmt(exp5)} = ${money(np5)}.` }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** reasons why profit is important to Rudo's business.", points: ["Reason 1, e.g. attracts the investor (1)", "Explained: investor expects a return; shows the business is successful (1)", "Reason 2, e.g. retained profit / reward for risk (1)", "Explained in context: funds more stock for the shop / Rudo's own income (1)"] }),
      P.manual({ label: "(d)", marks: 4, stem: "Discuss whether profit is the best measure of the success of Rudo's business.", points: ["Profit shows whether revenue covers all costs (1)", "But profit alone ignores the size of the business / capital invested (1)", "Other measures: customer satisfaction, growth in sales, cash, survival (1)", "Justified conclusion (1)"] }),
    ],
    explanation: `Gross profit ${money(gp5)}; profit ${money(np5)}. Profit matters as a reward, a source of finance and a signal to investors, but is not the only measure of success.`,
    hints: ["Gross profit = revenue − cost of sales.", "Profit = gross profit − expenses."],
  });
  b.card("FORMULA", "Profit", "Profit = revenue − total costs. A negative result is a loss.");
  b.card("FORMULA", "Gross profit and profit", "Gross profit = revenue − cost of sales; profit = gross profit − expenses.");
  b.card("DEFINITION", "Retained profit", "Profit kept in the business instead of being paid to the owners; a source of finance with no interest.");
  b.card("CONCEPT", "Why profit matters", "Reward for risk, source of finance, measure of success, attracts investors and lenders.");
  b.card("DEFINITION", "Revenue", "Income from selling goods or services: selling price × quantity sold. Also called sales or turnover.");
  b.card("FACT", "Profit is not cash", "A profitable business can be short of cash, for example after credit sales or buying equipment.");
  b.card("CONCEPT", "Organisations not aiming for profit", "New businesses may aim to survive; charities, social enterprises and public-sector bodies aim to provide services.");
  b.card("FACT", "Board terms", "ZIMSEC: net profit and income statement. Cambridge: profit and statement of profit or loss.");
});
