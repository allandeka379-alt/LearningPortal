// W4b: ratios.liquidity
import { concept, P, table, r2, ratios, chk, fmt } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.ratios.liquidity", { file: "ratios/liquidity", keyPrefix: "ratios.liquidity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **acid test ratio**?",
    ok: ["(Current assets − inventories) ÷ current liabilities", "Correct: inventories are removed because they are the least liquid current asset."],
    bad: [["Current assets ÷ current liabilities", "That is the current ratio, which includes inventories."], ["(Current liabilities − inventories) ÷ current assets", "This mixes up the two sides of the ratio."], ["Current assets − current liabilities", "That is working capital, a sum of money and not a ratio."]],
    explanation: "Acid test = (current assets − inventories) ÷ current liabilities, shown as x : 1.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are inventories left out when the acid test ratio is calculated?",
    ok: ["They are the current asset least easily turned into cash", "Correct: they must be sold, perhaps on credit, before cash arrives."],
    bad: [["They are not owned by the business at the year end", "Inventories are owned by the business and appear in the accounts."], ["They are always valued at more than their selling price", "Inventories are normally valued at the lower of cost and net realisable value."], ["They are part of non-current assets rather than current assets", "Inventories are current assets."]],
    explanation: "Inventories take longest to convert into cash, so the acid test gives a stricter measure of ability to pay debts quickly.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action would **improve** the liquidity of a fictional farm-supply business?",
    ok: ["Selling an unused delivery truck for cash", "Correct: cash rises and current assets increase."],
    bad: [["Buying extra inventory on credit from a supplier", "Inventory and current liabilities both rise; the acid test falls."], ["Allowing customers longer to pay their accounts", "Cash arrives later, which reduces liquidity."], ["Paying a long-term loan early from its cash", "This uses cash that is needed for short-term debts."]],
    explanation: "Selling a surplus asset raises cash and so improves the ability to meet short-term debts.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional wholesaler has a current ratio of 1.8 : 1 but an acid test ratio of 0.6 : 1. What does this suggest?",
    ok: ["Most of its current assets are inventories that must still be sold", "Correct: the gap between the two ratios is caused by inventories."],
    bad: [["It holds a large amount of cash compared with its debts", "Large cash balances would raise the acid test ratio as well."], ["Its current liabilities are far larger than its current assets", "A current ratio above 1 means current assets are larger."], ["It has no inventories at all, so the ratios must be wrong", "With no inventories the two ratios would be equal."]],
    hints: ["What does the acid test remove from current assets?"],
    explanation: "The acid test removes inventories. A large fall from 1.8 to 0.6 shows that inventories make up most of the current assets.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "A fictional supermarket in Harare has a current ratio of 0.9 : 1. Which comment is the most reasonable?",
    ok: ["It may be acceptable, as sales are in cash and inventory turns over fast", "Correct: a retailer can operate safely with a low ratio."],
    bad: [["It must be in serious danger, because the ratio is below the 1.5 : 1 guideline", "The guideline does not apply equally to all industries."], ["It proves the supermarket is making losses", "Liquidity ratios do not measure profit."], ["It means the supermarket has too much cash", "A low ratio does not point to excess cash."]],
    hints: ["Think about how a supermarket is paid."],
    explanation: "Because supermarkets sell for cash and hold fast-moving inventory, they can operate safely with low ratios, so the industry must be considered.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional firm has current assets of US\\$75,000 and current liabilities of US\\$50,000. It uses US\\$15,000 of cash to repay a trade payable. What is the effect?",
    ok: ["The current ratio rises and working capital is unchanged", "Correct: the ratio goes from 1.50 to 1.71, but working capital stays at US\\$25,000."],
    bad: [["The current ratio and working capital both rise", "Working capital is the difference, which is unchanged because both totals fall by US\\$15,000."], ["The current ratio falls because cash is reduced", "Current liabilities fall too, so the ratio rises."], ["The current ratio is unchanged because both totals fall", "Equal falls in both totals change the ratio when it is above 1."]],
    hints: ["Recalculate both totals after the payment."],
    explanation: "New current assets = 60,000 and new current liabilities = 35,000. The ratio = 60,000 ÷ 35,000 = 1.71 (from 1.50). Working capital = 60,000 − 35,000 = 25,000, unchanged.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A profitable business can still have a liquidity problem.",
    answer: true,
    explanation: "True. Profit may be tied up in inventory, receivables or non-current assets, leaving too little cash to pay bills when they fall due.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "A higher current ratio is always better for a business.",
    answer: false,
    hints: ["Think about what high current assets might consist of."],
    explanation: "False. A very high ratio may mean idle cash, slow-selling inventory or slow-paying customers, which earn nothing and reduce profit.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Liquidity", "Ability to pay short-term debts when due"], ["Working capital", "Current assets less current liabilities"], ["Acid test ratio", "Liquidity measure that excludes inventories"], ["Overtrading", "Expanding sales faster than finance allows"]],
    explanation: "Each term relates to short-term financial health.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The current ratio compares current {{blank:a}} with current {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["assets"], choices: ["assets", "liabilities", "profits"] },
      { id: "b", accepted: ["liabilities"], choices: ["assets", "liabilities", "profits"] },
    ],
    explanation: "Current ratio = current assets ÷ current liabilities.",
  });

  // ---- numerical items
  const cr = ratios.currentRatio(66000, 44000);
  chk(cr, 1.5, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "ratio", value: cr, calculator: true, wrong: [r2(44000 / 66000), r2(22000 / 44000)],
    stem: "A fictional bakery in Mutare has current assets of US\\$66,000 and current liabilities of US\\$44,000. Calculate the current ratio as x : 1, to two decimal places.",
    hints: ["Current assets ÷ current liabilities."],
    explanation: "66,000 ÷ 44,000 = 1.50, so the ratio is 1.50 : 1. Inverting gives 0.67, and using working capital (22,000) gives 0.50.",
  });
  const at = ratios.acidTest(84000, 36000, 40000);
  chk(at, 1.2, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: at, calculator: true, daily: true, wrong: [r2(84000 / 40000), r2(36000 / 40000)],
    stem: "A fictional hardware shop has current assets of US\\$84,000, of which inventories are US\\$36,000, and current liabilities of US\\$40,000. Calculate the acid test ratio as x : 1, to two decimal places.",
    hints: ["Remove inventories from current assets first."],
    explanation: "(84,000 − 36,000) ÷ 40,000 = 48,000 ÷ 40,000 = 1.20, so the ratio is 1.20 : 1. Leaving the inventories in gives the current ratio, 2.10.",
  });
  const ca3 = 52000 + 31500 + 6500, cl3 = 38000 + 22000;
  const at3 = ratios.acidTest(ca3, 52000, cl3);
  chk(ca3, 90000); chk(cl3, 60000); chk(at3, 0.63333, 1e-4);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "ratio", value: at3, calculator: true, wrong: [r2(ratios.currentRatio(ca3, cl3)), r2(ratios.acidTest(ca3, 52000, 38000))],
    stem: "A fictional timber merchant has inventories of US\\$52,000, trade receivables of US\\$31,500 and cash of US\\$6,500. Its current liabilities are trade payables of US\\$38,000 and a bank overdraft of US\\$22,000. Calculate the acid test ratio as x : 1, to two decimal places.",
    hints: ["Add every current liability, including the overdraft."],
    explanation: "Current assets = 52,000 + 31,500 + 6,500 = 90,000. Current liabilities = 38,000 + 22,000 = 60,000. Acid test = (90,000 − 52,000) ÷ 60,000 = 38,000 ÷ 60,000 = 0.63, so 0.63 : 1. Leaving out the overdraft gives 1.00; including inventories gives 1.50.",
    workedSolution: "1. Current assets = 52,000 + 31,500 + 6,500 = 90,000.\n2. Current liabilities = 38,000 + 22,000 = 60,000.\n3. Acid test = (90,000 − 52,000) ÷ 60,000 = 0.63 : 1.",
  });
  const need = 1.5 * 50000 - 60000;
  chk(need, 15000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: need, calculator: true, wrong: [10000, 25000],
    stem: "A fictional printing company has current assets of US\\$60,000 and current liabilities of US\\$50,000, a current ratio of 1.2 : 1. It plans to sell surplus machinery for cash, which will increase current assets only. Calculate the cash it must raise to reach a current ratio of 1.5 : 1.",
    hints: ["Find the current assets needed for a ratio of 1.5 : 1."],
    explanation: "Current assets needed = 1.5 × 50,000 = 75,000. Cash to raise = 75,000 − 60,000 = US\\$15,000. Working capital (10,000) is not the right target.",
    workedSolution: "1. Required current assets = 1.5 × 50,000 = 75,000.\n2. Cash needed = 75,000 − 60,000 = 15,000.",
  });
  const cr5 = ratios.currentRatio(54000 - 8000, 36000 - 8000);
  chk(cr5, 1.64286, 1e-4);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "ratio", value: cr5, calculator: true, wrong: [1.5, r2(54000 / 28000)],
    stem: "A fictional clothing company has current assets of US\\$54,000 and current liabilities of US\\$36,000. It uses US\\$8,000 of cash to repay part of a short-term loan (a current liability). Calculate the new current ratio as x : 1, to two decimal places.",
    hints: ["Both current assets and current liabilities fall by the same amount."],
    explanation: "New current assets = 54,000 − 8,000 = 46,000. New current liabilities = 36,000 − 8,000 = 28,000. Ratio = 46,000 ÷ 28,000 = 1.64, up from 1.50. Reducing only the liabilities gives 1.93, the wrong answer.",
    workedSolution: "1. Current assets = 54,000 − 8,000 = 46,000.\n2. Current liabilities = 36,000 − 8,000 = 28,000.\n3. Ratio = 46,000 ÷ 28,000 = 1.64 : 1.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one way in which a business could improve its liquidity.",
    accepted: ["sell unused assets", "reduce inventory", "collect debts faster", "delay payments to suppliers", "get a long-term loan", "sale and leaseback", "reduce stock", "improve credit control", "use an overdraft"],
    keywords: { any: ["sell", "reduce inventory", "reduce stock", "collect", "credit control", "delay", "long-term", "leaseback", "overdraft", "factoring", "debtors", "receivables"], minAny: 1 },
    explanation: "Accept selling idle assets, reducing inventory, faster collection of receivables, delaying payables, long-term borrowing or sale and leaseback.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a very high current ratio is not necessarily a good sign for a business.",
    points: ["A high ratio may mean too much cash or inventory is lying idle", "Idle resources earn no return, so profit is lower than it could be", "It may also mean customers are paying slowly, or that inventory is not selling"],
    modelAnswer: "A very high ratio may mean that cash or inventory is lying idle, which earns no return and so reduces profit. It may also show that customers are slow to pay or that inventory is not selling, which is a problem in itself.",
    hints: ["What could the current assets consist of?"],
    explanation: "Too much liquidity has a cost.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional furniture maker allows customers 90 days to pay. Analyse how this affects its liquidity.",
    points: ["Cash from sales arrives three months after the goods are made", "So trade receivables are large and cash is low", "The firm still has to pay wages and suppliers sooner, so it may need an overdraft", "This lowers the acid test ratio and may harm the firm's relations with its own suppliers"],
    modelAnswer: "Cash from sales arrives three months after the goods are made, so receivables are large and cash is low. The firm still has to pay wages and suppliers sooner, so it may need an overdraft. The shortage of cash lowers its acid test ratio and could harm its relations with suppliers.",
    hints: ["Follow the cash through the business."],
    explanation: "Long credit terms tie up cash.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional hardware company has a falling acid test ratio caused by growing inventories. Evaluate whether it should reduce its inventory or raise an overdraft.",
    points: ["Reducing inventory frees cash and cuts storage costs", "It improves the acid test without adding debt", "Lower inventory may cause stock-outs and lost sales", "An overdraft gives cash quickly but adds interest and is repayable on demand", "Borrowing treats the symptom, not the cause of excess inventory", "Judgement and reason, for example reduce inventory, using an overdraft only as a short-term bridge"],
    modelAnswer: "Reducing inventory frees cash, cuts storage costs and improves the acid test without adding debt, but it may cause stock-outs and lost sales. An overdraft gives cash quickly but adds interest, is repayable on demand and treats the symptom rather than the cause of excess inventory. The company should reduce inventory, using an overdraft only as a short-term bridge while it does so.",
    hints: ["Compare the cause being tackled with the cost of each method."],
    explanation: "Both methods weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const y24 = { inv: 64000, rec: 28000, cash: 8000, cl: 62500 }, y25 = { inv: 78000, rec: 35000, cash: 3000, cl: 87000 };
  const ca = (y) => y.inv + y.rec + y.cash;
  const c25 = ratios.currentRatio(ca(y25), y25.cl), a25 = ratios.acidTest(ca(y25), y25.inv, y25.cl), c24 = ratios.currentRatio(ca(y24), y24.cl), a24 = ratios.acidTest(ca(y24), y24.inv, y24.cl);
  chk(c24, 1.6, 1e-9); chk(a24, 0.576, 1e-9); chk(c25, 1.33333, 1e-4); chk(a25, 0.43678, 1e-4);
  const tbl1 = table(["US\\$", "2024", "2025"], [["Inventories", y24.inv, y25.inv], ["Trade receivables", y24.rec, y25.rec], ["Cash", y24.cash, y25.cash], ["Current liabilities", y24.cl, y25.cl]]);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Tendai's Hardware is a fictional shop in Gweru. In 2025 it stocked up before the building season and paid a deposit on a new delivery van. Its current assets and liabilities at the year end are shown.\n\n${tbl1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "ratio", value: c25, wrong: [r2(y25.cl / ca(y25)), a25], stem: "Calculate the current ratio for 2025, as x : 1 to two decimal places.", explanation: "Current assets = 78,000 + 35,000 + 3,000 = 116,000. Current ratio = 116,000 ÷ 87,000 = 1.33, so 1.33 : 1." }),
      P.num({ label: "(b)", marks: 3, kind: "ratio", value: a25, type: "CALCULATION", wrong: [c25, r2(38000 / 116000)], stem: "Calculate the acid test ratio for 2025, as x : 1 to two decimal places.", explanation: "Acid test = (116,000 − 78,000) ÷ 87,000 = 38,000 ÷ 87,000 = 0.44, so 0.44 : 1.", workedSolution: "1. Current assets = 116,000; less inventories 78,000 = 38,000.\n2. Acid test = 38,000 ÷ 87,000 = 0.44 : 1." }),
      P.manual({ label: "(c)", marks: 4, stem: "The ratios for 2024 were 1.60 : 1 and 0.58 : 1. Analyse why the shop's liquidity worsened in 2025.", points: ["Inventories rose from US\\$64,000 to US\\$78,000, tying up cash", "Cash fell from US\\$8,000 to US\\$3,000, partly paying the deposit on the van", "Current liabilities rose from US\\$62,500 to US\\$87,000, so more debts are due soon", "So the acid test fell to 0.44 : 1: less than half of each dollar owed is covered by quick assets"], modelAnswer: "Inventories rose from US\\$64,000 to US\\$78,000, which tied up cash, and cash itself fell from US\\$8,000 to US\\$3,000 partly because of the deposit on the van. At the same time current liabilities rose from US\\$62,500 to US\\$87,000. As a result the acid test fell to 0.44 : 1, so less than half of each dollar owed is covered by quickly available assets.", explanation: "Higher inventory and liabilities, lower cash." }),
    ],
    hints: ["Add the current assets first.", "Compare each item with 2024."],
    explanation: "Current ratio 1.33 : 1; acid test 0.44 : 1; liquidity worsened because inventories and liabilities rose and cash fell.",
  });
  const X = { ca: 150000, inv: 30000, cl: 100000 }, Y = { ca: 189000, inv: 126000, cl: 90000 };
  const xA = ratios.acidTest(X.ca, X.inv, X.cl), yA = ratios.acidTest(Y.ca, Y.inv, Y.cl);
  chk(xA, 1.2, 1e-9); chk(yA, 0.7, 1e-9);
  const tbl2 = table(["US\\$", "Chinhoyi Cold Stores", "Masvingo Furniture"], [["Current assets", X.ca, Y.ca], ["of which inventories", X.inv, Y.inv], ["Current liabilities", X.cl, Y.cl]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fictional bank manager must decide which of two private companies to lend a short-term working-capital loan to. Chinhoyi Cold Stores sells frozen food to shops for cash on delivery; Masvingo Furniture makes goods to order and sells mainly on 60 days' credit.\n\n${tbl2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "ratio", value: xA, wrong: [1.5, r2(30000 / 100000)], stem: "Calculate the acid test ratio of Chinhoyi Cold Stores, as x : 1 to two decimal places.", explanation: "(150,000 − 30,000) ÷ 100,000 = 1.20, so 1.20 : 1." }),
      P.num({ label: "(b)", marks: 2, kind: "ratio", value: yA, wrong: [2.1, r2(126000 / 90000)], stem: "Calculate the acid test ratio of Masvingo Furniture, as x : 1 to two decimal places.", explanation: "(189,000 − 126,000) ÷ 90,000 = 63,000 ÷ 90,000 = 0.70, so 0.70 : 1." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse why the current ratio of Masvingo Furniture (2.10 : 1) gives a misleading impression of its liquidity.", points: ["Most of its current assets (US\\$126,000 of US\\$189,000) are inventories", "Inventories must still be sold, often on 60 days' credit, before cash arrives", "Its acid test ratio is only 0.70 : 1, below that of the cold store", "So it may find it hard to pay its US\\$90,000 of current liabilities on time"], modelAnswer: "Most of Masvingo's current assets, US\\$126,000 out of US\\$189,000, are inventories, which must still be sold, often on 60 days' credit, before cash arrives. Its acid test ratio is only 0.70 : 1, below the cold store's 1.20 : 1, so it may find it hard to pay its US\\$90,000 of current liabilities on time.", explanation: "The current ratio hides the dependence on inventory." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate which company the bank should lend to.", points: [["Chinhoyi has the stronger acid test (1.20 : 1 against 0.70 : 1) and a current ratio of 1.50 : 1, so it can meet its debts from quick assets", 2], ["Chinhoyi sells for cash, so it collects cash quickly and the stock turns over fast", 1], ["Masvingo's liquidity depends on selling inventory and collecting from customers on credit, which is slower and riskier", 1], ["Limitation: ratios at one date; the trend, the purpose and the security offered are not known", 1], ["Judgement with a reason, for example lend to Chinhoyi, or to Masvingo only with security", 1]], levels: [[3, 5, 6, "Uses ratios for both firms and the type of trade; a justified decision with a condition"], [2, 3, 4, "Compares some ratios with some analysis; judgement weakly supported"], [1, 1, 2, "States ratios with little analysis"]], modelAnswer: "Chinhoyi Cold Stores has the stronger position: its acid test is 1.20 : 1 against 0.70 : 1 for Masvingo, and it sells for cash so its money comes in quickly. Masvingo's liquidity depends on selling a large inventory and then collecting from customers on credit, which is slower and riskier. The ratios are for one date only, and the trend and the security offered are not known. On this evidence the bank should lend to Chinhoyi, and to Masvingo only if it provides security or shows that its customers pay on time.", hints: ["Compare the acid test ratios and the way each firm is paid."], explanation: "Chinhoyi is the safer borrower; the decision is qualified by the single date and the security." }),
    ],
    hints: ["Remove inventories before dividing."],
    explanation: "Acid tests 1.20 : 1 and 0.70 : 1; the bank should prefer Chinhoyi, subject to the trend and security.",
  });

  b.card("DEFINITION", "Liquidity", "The ability of a business to pay its short-term debts as they fall due.");
  b.card("FORMULA", "Current ratio", "Current assets ÷ current liabilities, shown as x : 1.");
  b.card("FORMULA", "Acid test ratio", "(Current assets − inventories) ÷ current liabilities, shown as x : 1.");
  b.card("FORMULA", "Working capital", "Current assets − current liabilities.");
  b.card("CONCEPT", "Why inventories are removed in the acid test", "They are the least liquid current asset: they must be sold before cash is received.");
  b.card("CONCEPT", "Guideline liquidity ratios", "About 1.5 to 2 : 1 for the current ratio and 1 : 1 for the acid test, but they depend on the industry; a supermarket can operate lower.");
  b.card("CONCEPT", "A ratio that is too high", "May mean idle cash, slow-selling inventory or slow-paying customers, which earn no return.");
  b.card("CONCEPT", "Methods of improving liquidity", "Sell idle assets, reduce inventory, collect debts faster, delay payments to suppliers, refinance with a long-term loan, sale and leaseback.");
  b.card("CONCEPT", "Using cash to repay a current liability", "Current assets and current liabilities both fall; a current ratio above 1 rises but working capital is unchanged.");
});
