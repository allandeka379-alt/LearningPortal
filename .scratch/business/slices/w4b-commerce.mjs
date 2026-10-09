// W4b exam-format items, ZIMSEC Commerce: Paper 2 Section A (7 marks) and Section B essays (20 marks).
// Mark splits of the 7-mark question and of the essay parts are ours (the syllabus does not print them).
import { concept, P, COM, money, fmt, round, table, f } from "../lib.mjs";

const L10 = [
  [3, 8, 10, "A range of relevant points, each explained accurately and illustrated with examples or figures."],
  [2, 4, 7, "Relevant points with some explanation; development or accuracy uneven."],
  [1, 1, 3, "Points listed or described with little explanation."],
];
const L8 = [
  [3, 6, 8, "Each measure explained accurately with its formula and what it shows."],
  [2, 3, 5, "Some measures explained; formulas or meanings incomplete."],
  [1, 1, 2, "Measures named with little explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];

// 7-mark: a hardware retailer's year.
const s = { open: 3400, purch: 27800, close: 4600, turnover: 34500 };
const cos = f.costOfSales(s.open, s.purch, s.close);
const gp = s.turnover - cos;
const rst = f.rateOfStockTurnover(cos, s.open, s.close);
const mu = f.markUp(gp, cos);
const tbl = table(["Item for the year", "US\\$"], [["Stock at 1 January", s.open], ["Purchases", s.purch], ["Stock at 31 December", s.close], ["Turnover (sales)", s.turnover]]);

concept("bus.finance.trading-calculations", { file: "exam/w4b-commerce", keyPrefix: "exam.w4b-commerce", applies: COM }, (b) => {
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 480, paper: "Paper 2", calculator: true,
    concepts: ["bus.finance.trading-calculations"],
    stem: `Tatenda owns a hardware shop in Kwekwe. The following figures relate to his business for the year.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: cos, stem: "Calculate the cost of goods sold.", wrong: [s.purch], explanation: `${fmt(s.open)} + ${fmt(s.purch)} − ${fmt(s.close)} = ${money(cos)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: gp, stem: "Calculate the gross profit.", wrong: [s.turnover - s.purch], explanation: `${fmt(s.turnover)} − ${fmt(cos)} = ${money(gp)}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "times", dp: 1, value: rst, stem: "Calculate the rate of stock turnover, to one decimal place.", wrong: [round(s.turnover / f.averageStock(s.open, s.close), 1), round(cos / s.close, 1)], explanation: `Average stock = (${fmt(s.open)} + ${fmt(s.close)}) ÷ 2 = ${fmt(f.averageStock(s.open, s.close))}; ${fmt(cos)} ÷ ${fmt(f.averageStock(s.open, s.close))} = ${round(rst, 1)} times.` }),
      P.num({ label: "(d)", marks: 1, kind: "pct", value: mu, stem: "Calculate the mark-up, to one decimal place.", wrong: [round(f.grossMargin(gp, s.turnover), 1)], explanation: `${fmt(gp)} ÷ ${fmt(cos)} × 100 = ${round(mu, 1)}%.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain **one** way Tatenda could increase his rate of stock turnover.", points: ["Way identified, e.g. advertising / special offers / clearance sale / smaller, more frequent orders (1)", "Explained: stock sells faster or less is held, so stock is replaced more times a year (1)"] }),
    ],
    hints: ["(a) Opening stock + purchases − closing stock.", "(c) Divide by average stock, not closing stock."],
    explanation: `(a) ${money(cos)}. (b) ${money(gp)}. (c) ${round(rst, 1)} times. (d) ${round(mu, 1)}%. (e) Promotion or smaller, more frequent orders.`,
    workedSolution: `1. Cost of goods sold = ${fmt(s.open)} + ${fmt(s.purch)} − ${fmt(s.close)} = ${fmt(cos)}.\n2. Gross profit = ${fmt(s.turnover)} − ${fmt(cos)} = ${fmt(gp)}.\n3. Average stock = ${fmt(f.averageStock(s.open, s.close))}; rate = ${fmt(cos)} ÷ ${fmt(f.averageStock(s.open, s.close))} = ${round(rst, 1)} times.\n4. Mark-up = ${fmt(gp)} ÷ ${fmt(cos)} × 100 = ${round(mu, 1)}%.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.trading-calculations"],
    stem: "A trader must understand the figures produced by the business in order to make good decisions.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Explain the meaning of each of the following and show how each is calculated: turnover, cost of goods sold, gross profit, net profit and rate of stock turnover.",
        points: [
          ["Turnover: total value of sales in the period (net of returns).", 2],
          ["Cost of goods sold: cost price of goods actually sold = opening stock + purchases − closing stock.", 2],
          ["Gross profit: turnover − cost of goods sold; profit on trading before expenses.", 2],
          ["Net profit: gross profit − expenses (rent, wages, electricity, transport).", 2],
          ["Rate of stock turnover: number of times average stock is sold in a period = cost of goods sold ÷ average stock, where average stock = (opening + closing) ÷ 2.", 2],
        ],
        levels: L10,
        modelAnswer: "**Turnover** is the total value of a trader's sales in a period, after deducting any goods returned by customers. **Cost of goods sold** is the cost price of the goods actually sold: opening stock plus purchases minus closing stock, because goods still on the shelves at the end have not yet been sold. **Gross profit** is turnover minus cost of goods sold; it is the profit on trading before the running costs of the business are paid. **Net profit** is gross profit minus expenses such as rent, wages, electricity and transport; it is what the owner finally earns. The **rate of stock turnover** is the number of times the trader sells and replaces the average stock in a period. It is calculated as cost of goods sold divided by average stock, where average stock is opening stock plus closing stock divided by two. For example, a trader with cost of goods sold of US\\$24,000 and average stock of US\\$4,000 turns stock over 6 times a year.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Discuss the ways in which a retailer could increase its net profit.",
        points: [
          ["Increase turnover: advertising, sales promotion, better display, wider range; but promotion costs money.", 2],
          ["Buy more cheaply: bulk buying, cheaper wholesalers, trade discounts, raising gross profit; but storage and quality risks.", 2],
          ["Raise prices / mark-up where customers will accept; risk of losing customers to rivals.", 2],
          ["Cut expenses: cheaper premises, energy saving, fewer staff, reduce waste and theft; risk to service.", 2],
          ["Increase rate of stock turnover so gross profit is earned more often; justified conclusion on the best approach.", 2],
        ],
        levels: L10,
        modelAnswer: "A retailer can raise net profit by increasing **turnover**, for example by advertising, offering special promotions and displaying goods attractively; however, promotion costs money, so the extra gross profit must exceed the cost. It can **buy more cheaply**, using bulk buying or a cheaper wholesaler and taking trade and cash discounts, which raises gross profit on every sale, although bulk buying ties up cash and needs storage space. It may **raise its mark-up**, but customers may go to rival shops, so this works best for goods with few nearby competitors. It can **cut expenses**, for example by using energy-saving lights, reducing waste and preventing theft, though cutting staff may harm service. Finally, by increasing the **rate of stock turnover**, for example by stocking lines that sell quickly, the retailer earns its gross profit more often from the same money. The best approach is usually to control expenses and buy well, because raising prices risks losing customers.",
      }),
    ],
    hints: ["(a) Define each term and give its formula.", "(b) Think of turnover, gross profit and expenses in turn, then judge."],
    explanation: "(a) Definitions and formulas for turnover, cost of goods sold, gross and net profit and stock turnover. (b) Raise sales, buy more cheaply, adjust mark-up, cut expenses, increase stock turn.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.profitability-ratios", "bus.finance.trading-calculations"],
    stem: "Business people use ratios to judge how well a business is performing.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe how the gross profit margin, the net profit margin and the return on capital employed are calculated, and what each shows.",
        points: [
          ["Gross profit margin = gross profit ÷ turnover × 100.", 1],
          ["Shows how much of each dollar of sales is left after the cost of goods sold; reflects buying and pricing.", 2],
          ["Net profit margin = net profit ÷ turnover × 100.", 1],
          ["Shows how much of each dollar of sales is profit after all expenses; reflects control of expenses.", 1],
          ["Return on capital employed = net profit ÷ capital employed × 100.", 1],
          ["Shows the return earned on the money invested; compare with interest rates / other investments.", 2],
        ],
        levels: L8,
        modelAnswer: "The **gross profit margin** is gross profit divided by turnover, multiplied by 100. It shows how much of each dollar of sales remains after paying for the goods sold, so it reflects how well the business buys and prices its goods. The **net profit margin** is net profit divided by turnover, multiplied by 100. It shows how much of each dollar of sales is profit after all expenses, so a gap between the two margins shows the effect of expenses. The **return on capital employed** is net profit divided by capital employed, multiplied by 100. It shows the return earned on the money invested in the business and can be compared with the interest the owner could earn elsewhere.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss how useful it is for a trader to compare these ratios with those of previous years and with those of other businesses.",
        points: [
          ["Previous years: shows trends, e.g. falling gross margin means dearer supplies or price cuts; prompts action.", 2],
          ["Other businesses: shows whether performance is good for the industry; sets targets.", 2],
          ["Ratios allow fair comparison between businesses of different sizes.", 2],
          ["Limitations: past data; inflation; other firms' figures may be unavailable or calculated differently.", 2],
          ["Ratios show what changed, not why; non-financial factors ignored; different industries not comparable.", 2],
          ["Justified conclusion: useful starting point but must be combined with investigation of causes.", 2],
        ],
        levels: L12,
        modelAnswer: "Comparing ratios with **previous years** shows whether the business is improving. If the gross profit margin falls from 30% to 25%, the trader knows that suppliers have raised prices or that selling prices were cut, and can act, for example by finding a cheaper wholesaler. Comparing with **other businesses** in the same trade shows whether the business is doing well for its industry and gives targets to aim at. Because ratios relate profit to turnover or capital, a small shop can be compared fairly with a larger one. However, ratios have limits. They are based on past figures, and conditions such as prices may have changed. Other traders' accounts may not be available, or may be prepared differently. Ratios show **what** has changed but not **why**, and they ignore non-financial factors such as customer service or location. Comparing a grocer with a jeweller would also be misleading, because margins differ between trades. Overall, comparisons are very useful as a starting point, provided the trader compares like with like and investigates the causes behind the figures.",
      }),
    ],
    hints: ["(a) Give the formula and what each shows.", "(b) Consider both kinds of comparison, then the limitations, then judge."],
    explanation: "(a) GP margin, NP margin and ROCE with formulas and meanings. (b) Comparisons over time and between firms are useful but limited by data, causes and like-for-like issues.",
  });
});
