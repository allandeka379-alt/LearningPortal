// W4a: finance.cash-flow-forecast (owns the cash-flow-forecast conventions; both ZIMSEC syllabi and Cambridge AS)
// Conventions: net cash flow = receipts - payments; closing = opening + net; closing becomes next opening; brackets/negative = overdraft;
// credit sales are received in a later month; depreciation and profit are never cash items; every forecast table is printed by cashForecast().
import { concept, P, cashForecast, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

// Small three-month summary table for stems: months with given receipts and payments (totals), opening balance given.
const three = (opening, rows) => {
  let bal = opening;
  const out = rows.map(([m, rec, pay]) => {
    const net = r2(rec - pay);
    const open = bal;
    bal = r2(bal + net);
    return { m, rec, pay, net, open, close: bal };
  });
  return { out, md: table(["US\\$", ...rows.map((r) => r[0])], [["Total receipts", ...rows.map((r) => r[1])], ["Total payments", ...rows.map((r) => r[2])]]), opening };
};

concept("abus.finance.cash-flow-forecast", { file: "finance/cash-flow-forecast", keyPrefix: "finance.cash-flow-forecast" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **net cash flow** for a month calculated?",
    ok: ["Total receipts minus total payments", "Correct: it shows the change in cash in the month."],
    bad: [["Revenue minus cost of sales", "That is gross profit, not net cash flow."], ["Opening balance plus closing balance", "These are balances, not a flow of cash."], ["Profit minus depreciation", "Net cash flow is based on cash received and paid, not on profit."]],
    explanation: "Net cash flow = total cash receipts - total cash payments for the period.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a cash flow forecast, the **closing balance** of one month becomes",
    ok: ["next month's opening balance", "Correct: the balance is carried forward."],
    bad: [["the net cash flow of the next month", "Net cash flow is receipts less payments, not a balance."], ["the total receipts of the next month", "Receipts are new cash coming in."], ["the profit for the year", "Profit is a different measure."]],
    explanation: "Closing balance of one period = opening balance of the next.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would **not** appear in a cash flow forecast?",
    ok: ["Depreciation of machinery", "Correct: depreciation is not a payment of cash."],
    bad: [["Wages paid in the month", "Wages are a payment of cash."], ["Cash received from customers", "Receipts from customers are cash inflows."], ["Loan repayment", "Loan repayments are cash outflows."]],
    hints: ["Ask: does cash actually move?"],
    explanation: "Depreciation spreads the cost of an asset over its life and involves no cash payment, so it is not in a cash flow forecast.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely **cause** of a cash flow problem?",
    ok: ["Customers paying later than expected", "Correct: receipts arrive later while payments continue."],
    bad: [["Selling for cash only to all customers", "Cash sales improve cash flow."], ["Paying suppliers after 60 days", "Delaying payments helps cash flow."], ["Holding very little stock at all times", "Low stock reduces the cash tied up."]],
    hints: ["Which change delays cash coming in?"],
    explanation: "When customers delay payment the business must still pay wages and suppliers, so cash may run short.",
  });
  const d1 = three(2500, [["Jan", 9400, 10300], ["Feb", 8700, 9100], ["Mar", 12600, 8900]]);
  chk(d1.out[2].close, 4900);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional hardware shop in Chinhoyi begins January with ${money(d1.opening)} in the bank. Its forecast receipts and payments are:\n\n${d1.md}\n\nWhat is the forecast closing balance at the end of March?`,
    ok: [money(4900), "Correct: 2,500 - 900 - 400 + 3,700."],
    bad: [[money(3700), "That is only the net cash flow for March."], [money(2400), "That adds the first two months' net flows but ignores March and the opening balance."], [money(7400), "That adds the opening balance twice or ignores the deficits in January and February."]],
    hints: ["Work out the net cash flow of each month and carry the balance forward."],
    explanation: "January net = 9,400 - 10,300 = -900, closing 1,600. February net = -400, closing 1,200. March net = +3,700, closing US\\$4,900.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery in Gweru has a forecast showing a negative balance in March only. Which action would **most directly** remove the problem?",
    ok: ["Arranging an overdraft for March", "Correct: it covers the temporary shortage."],
    bad: [["Raising prices only from June onwards", "A June change does not help a March shortage."], ["Buying extra stock in March", "More stock uses more cash."], ["Paying all suppliers early in March", "Paying early makes the shortage worse."]],
    hints: ["The shortage is short-term; which source of finance suits that?"],
    explanation: "A short-lived deficit is best covered by short-term finance such as an overdraft, arranged before it occurs.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional school-uniform seller in Harare earns most of its income in January but pays wages every month. What will its forecast **most probably** show?",
    ok: ["Negative balances before January", "Correct: costs continue but sales are low until January."],
    bad: [["Positive balances in every month", "Steady wages and uneven sales make this unlikely."], ["No receipts in January", "January is the main selling month."], ["Equal receipts in every month of the year", "Sales are seasonal, so receipts are uneven."]],
    hints: ["Compare when money comes in with when wages go out."],
    explanation: "With seasonal income and steady costs, cash falls before the peak season and may need to be covered by an overdraft.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **main reason** why a new business should treat its cash flow forecast with caution?",
    ok: ["Sales and payment times are only rough estimates", "Correct: the forecast is only as reliable as its assumptions."],
    bad: [["Forecasts are never needed by new businesses", "New businesses need forecasts most."], ["Cash flow forecasts always show a surplus", "Forecasts can show deficits or surpluses."], ["Banks do not look at forecasts", "Banks often ask for a forecast before lending."]],
    hints: ["What does the forecast rely on?"],
    explanation: "A new business has no history, so its sales and the speed at which customers pay are estimates that may prove wrong.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A negative closing balance in a cash flow forecast means the business is making a loss.",
    answer: false,
    explanation: "False. A negative closing balance means cash is short (an overdraft is needed), but a profitable business can have one, for example after buying equipment.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each action to its effect on cash flow.",
    pairs: [["Chasing late-paying customers", "Brings cash in sooner"], ["Negotiating longer terms with suppliers", "Delays payments"], ["Leasing instead of buying equipment", "Avoids a large payment now"], ["Offering a discount for prompt payment", "Encourages customers to pay sooner"]],
    explanation: "Each action changes the timing of receipts or payments.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Closing balance = {{blank:a}} balance + net cash flow. A negative closing balance means the business needs an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["opening"], choices: ["opening", "closing", "total"] },
      { id: "b", accepted: ["overdraft"], choices: ["overdraft", "increase in prices", "dividend"] },
    ],
    explanation: "Closing balance = opening balance + net cash flow; a negative balance means finance such as an overdraft is needed.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which a business can improve its cash flow.",
    accepted: ["chase late payers", "reduce the credit period", "offer discounts for prompt payment", "offer a discount for early payment", "delay payments to suppliers", "extend trade credit", "use debt factoring", "factoring", "lease equipment instead of buying", "arrange an overdraft", "cut costs", "sale and leaseback", "sell unwanted assets", "reduce stock", "ask for deposits", "demand cash on delivery", "hold less stock"],
    explanation: "Accept: collecting debts sooner, discounts, longer supplier credit, factoring, leasing, an overdraft, cutting costs, selling assets or reducing stock.",
  });

  const sales = 14000, prev = 12000;
  const receipts = sales * 0.3 + prev * 0.7;
  chk(receipts, 12600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: receipts, calculator: true, daily: true, wrong: [sales, sales * 0.3 + sales * 0.7 * 0],
    stem: "A fictional furniture seller in Bulawayo expects sales of US\\$14,000 in May. 30% are paid in cash in May and 70% are on credit and paid in the following month. April sales were US\\$12,000. Calculate the cash it receives from customers in May.",
    hints: ["Cash sales this month plus credit sales from last month."],
    explanation: "Cash sales = 30% × 14,000 = 4,200. Credit receipts from April = 70% × 12,000 = 8,400. Total = US\\$12,600. Using May's total sales (14,000) ignores the delay.",
  });
  const d2 = three(1500, [["Jan", 7600, 9100], ["Feb", 8100, 8800], ["Mar", 6900, 7000]]);
  chk(d2.out[0].net, -1500); chk(d2.out[1].close, -700); chk(d2.out[2].close, -800);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: Math.abs(d2.out[1].close), calculator: true, wrong: [1500, 8800],
    stem: `A fictional laundry in Masvingo begins January with ${money(1500)} in the bank. Its forecast receipts and payments are:\n\n${d2.md}\n\nCalculate the size of the overdraft at the end of February.`,
    hints: ["Net cash flow for each month, then carry the balance forward."],
    explanation: "January net = 7,600 - 9,100 = -1,500, so the closing balance is 1,500 - 1,500 = 0. February net = 8,100 - 8,800 = -700, so the closing balance is -700: an overdraft of US\\$700.",
  });
  const d4 = three(3100, [["Jan", 6400, 7900], ["Feb", 7200, 8100], ["Mar", 6500, 7900]]);
  chk(d4.out[0].close, 1600); chk(d4.out[1].close, 700); chk(d4.out[2].close, -700);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(d4.out[2].close), calculator: true, wrong: [1400, 1600],
    stem: `Using the forecast below for a fictional tailoring shop in Mutare, calculate the size of the overdraft at the end of March. The opening balance on 1 January is ${money(3100)}.\n\n${d4.md}`,
    hints: ["Carry each closing balance forward as the next opening balance."],
    explanation: "Closing balances: January 3,100 - 1,500 = 1,600; February 1,600 - 900 = 700; March 700 - 1,400 = -700. The overdraft at the end of March is US\\$700. The figure 1,400 is only the net outflow in March.",
    workedSolution: "1. January net = 6,400 - 7,900 = -1,500; closing = 3,100 - 1,500 = 1,600.\n2. February net = 7,200 - 8,100 = -900; closing = 1,600 - 900 = 700.\n3. March net = 6,500 - 7,900 = -1,400; closing = 700 - 1,400 = -700.\n4. The overdraft is US\\$700.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a business might prepare a cash flow forecast.",
    points: ["To show when cash shortages are likely so that finance can be arranged in time", "To plan the timing of big payments such as equipment", "To support an application to a bank or investor"],
    modelAnswer: "A forecast shows when cash shortages are likely, so the business can arrange finance in time. It helps plan the timing of large payments such as equipment, and it can be shown to a bank or investor to support a request for finance.",
    hints: ["What can the manager do if a shortage is seen in advance?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional tuck-shop supplier in Chinhoyi finds its forecast shows a cash shortage because schools pay 60 days after delivery. Explain two ways of improving its cash flow.",
    points: ["Offer schools a small discount for paying within 14 days", "Application: cash from deliveries would arrive weeks earlier", "Ask suppliers for longer credit", "Application: the supplier would pay for stock after schools have paid"],
    modelAnswer: "The supplier could offer schools a small discount for paying within 14 days, so cash from deliveries arrives weeks earlier. It could also ask its own suppliers for longer credit, so it pays for stock only after the schools have paid.",
    hints: ["One way for receipts and one for payments."],
    explanation: "Two ways, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a profitable business may still have a negative cash balance in its forecast.",
    points: ["Large payments, such as equipment, may fall in one month", "Customers on credit pay later than sales are recorded", "Costs such as wages are paid before the money from sales arrives", "So a negative balance can appear although the business makes a profit over the year"],
    modelAnswer: "Large payments such as equipment may fall in a single month, and customers on credit pay later than sales are made. Costs such as wages are paid before the money from sales arrives, so a negative balance can appear although the business makes a profit over the year.",
    hints: ["Think of timing."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional lodge near Hwange has a cash flow forecast that shows an overdraft of US\\$8,000 from February to April. Assess whether the owner should rely on an overdraft to deal with it.",
    points: ["An overdraft is flexible and interest is paid only on the amount used", "It is quick to arrange and suited to a temporary shortage", "The bank can withdraw it at short notice and the interest rate is often high", "The forecast is an estimate, so the shortage could be larger or last longer", "Counter-argument: other methods, such as chasing debts, may cost less", "Judgement with a reason, for example arrange an overdraft with a margin above US\\$8,000 and also speed up receipts"],
    modelAnswer: "An overdraft is flexible, quick to arrange and suited to a temporary shortage, and interest is paid only on the amount used. But the bank can withdraw it at short notice, the rate is often high, and the forecast is an estimate so the shortage could be larger or last longer. Other methods, such as chasing debts, may cost less. The owner should arrange an overdraft with a margin above US\\$8,000 and also work to speed up receipts.",
    hints: ["Say why the forecast figure itself may not be exact."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const d3 = three(3000, [["Apr", 10800, 11900], ["May", 9600, 12300], ["Jun", 13500, 9400]]);
  chk(d3.out[0].close, 1900); chk(d3.out[1].close, -800); chk(d3.out[2].close, 3300);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional garage in Gweru begins April with ${money(3000)} in the bank. Its forecast is:\n\n${d3.md}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: Math.abs(d3.out[1].net), wrong: [2700, 9600], stem: "Calculate the net cash flow for May (enter the amount as a positive number).", explanation: "9,600 - 12,300 = -2,700, a net outflow of US\\$2,700." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: Math.abs(d3.out[1].close), wrong: [2700, 1900], stem: "Calculate the size of the overdraft at the end of May.", explanation: "April net = 10,800 - 11,900 = -1,100, closing 1,900. May net = -2,700, closing -800. An overdraft of US\\$800.", workedSolution: "1. April closing = 3,000 + (10,800 - 11,900) = 1,900.\n2. May net = 9,600 - 12,300 = -2,700.\n3. May closing = 1,900 - 2,700 = -800: an overdraft of US\\$800." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain two actions the garage could take to avoid the shortage in May.", points: ["Arrange an overdraft of at least US\\$800 before May", "Application: it covers the one-month shortage until June, when the balance becomes positive", "Ask customers to pay accounts sooner or delay a supplier payment", "Application: moving US\\$800 of payments or receipts between May and June would remove the overdraft"], modelAnswer: "The garage could arrange an overdraft of at least US\\$800 before May, which would cover the shortage for one month until the balance becomes positive in June. It could also ask customers to pay accounts sooner or delay a supplier payment, because moving US\\$800 between May and June would remove the overdraft.", explanation: "Two actions, each applied." }),
    ],
    hints: ["Carry each closing balance forward.", "Think of a short-term source of finance."],
    explanation: "May net outflow US\\$2,700; overdraft US\\$800 at the end of May; actions to avoid it.",
  });

  // Practice structured 2 (14 marks): full forecast with an amendment
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const rev = [5600, 6300, 6900, 7700, 6200], dec = 5400, nov = 5200;
  const mk = (lag) => months.map((m, i) => ({
    label: m,
    receipts: [["Cash sales (60%)", rev[i] * 0.6], [lag === 1 ? "Credit sales received (40% of last month)" : "Credit sales received (40% of sales two months ago)", ((lag === 1 ? (i === 0 ? dec : rev[i - 1]) : [nov, dec, ...rev][i]) * 0.4)]],
    payments: [["Wages", 2600], ["Detergent (15% of sales)", rev[i] * 0.15], ["Rent", 850], ["Utilities", 550], ["Loan repayment", 400], ...(i === 2 ? [["New washing machine", 5200]] : [])],
  }));
  const f1 = cashForecast({ opening: 2300, periods: mk(1), title: "Cash flow forecast, January to May" });
  const f2 = cashForecast({ opening: 2300, periods: mk(2), title: "Amended forecast" });
  chk(f1.rows[2].close, -720); chk(f1.rows[4].close, 2575);
  const amendedMar = f2.rows[2].close; chk(amendedMar, -1160); chk(f2.rows[0].close, 2500); chk(f2.rows[1].close, 3095);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional laundry in Bulawayo prepares this forecast. Revenue is 60% cash and 40% on credit to hotels, which pay in the following month. December revenue was ${money(5400)}.\n\n${f1.md}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: Math.abs(f1.rows[2].close), wrong: [3975, 5200], stem: "State the size of the overdraft forecast at the end of March.", explanation: "The forecast closing balance in March is (720): an overdraft of US\\$720." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: Math.abs(amendedMar), wrong: [720, 4255], stem: "The hotels now pay after two months instead of one: credit receipts are 40% of the revenue of two months earlier (November revenue was US\\$5,200). Calculate the size of the overdraft at the end of March in this amended forecast.", explanation: "Amended credit receipts are 2,080 (January), 2,160 (February) and 2,240 (March). Closing balances: January 2,500; February 3,095; March 3,095 + (6,380 - 10,635) = -1,160. The overdraft is US\\$1,160.", workedSolution: "1. Credit receipts: Jan 40% × 5,200 = 2,080; Feb 40% × 5,400 = 2,160; Mar 40% × 5,600 = 2,240.\n2. Total receipts: Jan 3,360 + 2,080 = 5,440; Feb 3,780 + 2,160 = 5,940; Mar 4,140 + 2,240 = 6,380.\n3. Payments are unchanged: 5,240; 5,345; 10,635.\n4. Closing balances: Jan 2,300 + 200 = 2,500; Feb 2,500 + 595 = 3,095; Mar 3,095 - 4,255 = -1,160.\n5. The overdraft is US\\$1,160." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two possible reasons why the hotels might pay later.", points: ["They may have cash flow problems of their own", "They may take advantage of longer credit when it is not challenged"], modelAnswer: "The hotels may have cash flow problems of their own, or they may take longer credit because it is not challenged.", explanation: "Two reasons, one mark each." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate how the laundry should deal with the forecast overdraft.", points: ["An overdraft arranged in advance covers the shortage in March and later months", "Chasing hotels or offering a discount would bring receipts sooner but costs revenue", "Leasing the machine instead of buying avoids a US\\$5,200 payment in March", "Delaying the purchase to April would avoid the March deficit", "Leasing has a higher total cost and delaying may reduce capacity", "Counter-argument: the forecast is an estimate and the hotel delay is only a possibility", "Judgement with a reason, for example arrange a small overdraft and ask the hotels to pay within a month"], levels: [[3, 5, 7, "Several actions applied to the case with their costs; the forecast figures used; a justified judgement"], [2, 3, 4, "Some actions with some application; judgement weakly supported"], [1, 1, 2, "Lists actions without applying them"]], modelAnswer: "An overdraft arranged in advance would cover the shortage, which is small in the original forecast but larger if the hotels pay late. Chasing the hotels or offering a discount would bring receipts sooner but costs revenue. Leasing the machine or delaying its purchase would avoid the US\\$5,200 payment in March, although leasing has a higher total cost and delay may reduce capacity. The forecast is only an estimate and the hotel delay is a possibility. The laundry should arrange a small overdraft and ask the hotels to pay within a month, buying the machine once cash has recovered.", hints: ["Use the size and length of the shortage in the original and amended forecasts."], explanation: "Weighs the actions by cost and effect on the overdraft." }),
    ],
    hints: ["Carry the closing balance forward each month.", "Amended receipts: use the revenue of two months earlier."],
    explanation: "Original overdraft US\\$720 in March; amended overdraft US\\$1,160; the evaluation weighs overdraft, faster receipts and leasing.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional bakery in Mutare delivers bread to schools and hotels. Its cash flow forecast shows an overdraft of US\\$8,400 at the end of June, caused by the purchase of a delivery van for US\\$13,000 in May and by schools paying 60 days after delivery. The bank has said that its overdraft limit is US\\$5,500. The owner could lease a van instead, ask schools to pay in 30 days or sell her old van for US\\$2,900.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why a profitable bakery can still have an overdraft.", points: ["Large payments such as a van fall in one month", "Schools pay 60 days after delivery, so cash arrives late", "Wages and flour are paid before the money arrives"], modelAnswer: "A large payment such as the van falls in a single month, schools pay 60 days after delivery so cash arrives late, and wages and flour must be paid before that money arrives.", explanation: "Any three, one mark each." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse one way in which the bakery could use its old van to improve cash flow.", points: ["The old van can be sold for US\\$2,900", "Application: this would reduce the overdraft from US\\$8,400 to US\\$5,500, which is within the limit", "The sale gives cash straight away without interest", "Application: but the bakery loses the van's use, which could reduce its deliveries"], modelAnswer: "The old van can be sold for US\\$2,900, which would reduce the overdraft from US\\$8,400 to US\\$5,500, exactly within the bank's limit. The sale gives cash without interest, but the bakery would lose the use of the van, which could reduce its deliveries.", explanation: "Linked to the case with the calculation." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate which actions the owner should take to deal with the overdraft.", points: [["Selling the old van brings the overdraft down to the US\\$5,500 limit but reduces delivery capacity", 2], ["Leasing a van instead of buying avoids the US\\$13,000 payment but costs more over time and gives no ownership", 2], ["Asking schools to pay in 30 days would improve cash flow every month but schools may refuse or take their business elsewhere", 2], ["Combining methods, such as the sale and a request to the schools, reduces the risk of relying on one", 1], ["Judgement with a reason: ask schools to pay sooner and sell the old van only if the new van replaces it, otherwise lease", 1]], levels: [[3, 6, 8, "Each action applied to the case with costs and risks weighed; a justified judgement"], [2, 3, 5, "Some actions with some application; judgement weakly supported"], [1, 1, 2, "Lists actions without applying them"]], modelAnswer: "Selling the old van would bring the overdraft down to the US\\$5,500 limit but would reduce delivery capacity. Leasing a van instead of buying would avoid the US\\$13,000 payment, but it costs more over time and gives no ownership. Asking schools to pay in 30 days would improve cash flow every month, but schools may refuse or take their business elsewhere. Combining methods reduces the risk of relying on one. The owner should ask the schools to pay sooner and, because the new van replaces the old one, sell the old van to bring the overdraft within the limit.", hints: ["Use the overdraft limit and the sale price to test each option."], explanation: "Tests each option against the overdraft limit and the effect on the business." }),
    ],
    hints: ["Compare each option with the overdraft limit."],
    explanation: "Why a profitable bakery can be overdrawn; the effect of selling the old van; a judgement on the best actions.",
  });

  b.card("DEFINITION", "Cash flow forecast", "A statement of the cash a business expects to receive and pay out in future periods, with the expected cash balance at the end of each period.");
  b.card("FORMULA", "Net cash flow", "Net cash flow = total receipts - total payments for the period.");
  b.card("FORMULA", "Closing balance", "Closing balance = opening balance + net cash flow. It becomes the next period's opening balance.");
  b.card("CONCEPT", "What is not in a forecast", "Depreciation and profit are not cash flows. Credit sales appear when customers pay, not when the sale is made.");
  b.card("FACT", "Purposes of a forecast", "Foresee shortages, arrange finance in time, time big payments, support loan applications and control the business.");
  b.card("FACT", "Causes of cash flow problems", "Late-paying customers, over-stocking, heavy spending on equipment, seasonal sales with steady costs, falling sales and poor forecasting.");
  b.card("FACT", "Ways to improve cash flow", "Chase debts, offer discounts, use trade credit, factoring, leasing, sale and leaseback, overdraft, cut costs or sell assets.");
  b.card("CONCEPT", "Amending a forecast", "Change the assumptions (later customer payments, higher costs) and recalculate to see the effect on the balances (what-if analysis).");
  b.card("CONCEPT", "Evaluating a forecast", "It is based on estimates, so check how reliable the sales and payment assumptions are and how long and how big any shortage is.");
});
