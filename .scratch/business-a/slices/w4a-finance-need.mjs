// W4a: finance.need (both ZIMSEC syllabi and Cambridge AS)
// Conventions: profit = revenue - costs for the period; net cash flow = cash received - cash paid; closing cash = opening cash + net cash flow.
import { concept, P, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.finance.need", { file: "finance/need", keyPrefix: "finance.need" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **start-up capital**?",
    ok: ["Funds needed to open the business", "Correct: it pays for equipment, stock and early expenses."],
    bad: [["Money a business earns in its first year", "That describes early revenue, not the money needed to start."], ["Profit paid to owners at the end of a year", "That is a distribution of profit, not start-up capital."], ["Money lent by customers who buy on credit", "Credit sales are not a source of start-up capital."]],
    explanation: "Start-up capital is the money needed to set up the business before sales begin, for example for equipment, stock and registration.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which is a **long-term** need for finance?",
    ok: ["Buying a delivery vehicle", "Correct: a vehicle lasts for years, so it needs long-term finance."],
    bad: [["Paying this week's wages", "Wages are a short-term need."], ["Buying a month's supply of flour", "Day-to-day stock is a short-term need."], ["Covering a late payment from a customer", "A late payment causes a short-term cash shortage."]],
    explanation: "Vehicles, machinery and buildings last several years and are long-term needs; wages and stock are short-term needs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can a business make a **profit** but still run out of cash?",
    ok: ["Credit customers may not have paid yet", "Correct: revenue counts when the sale is made, but the cash arrives later."],
    bad: [["Profit is always paid out as wages", "Profit is not paid out as wages; wages are a cost."], ["Cash and profit are the same thing", "They are different: profit is a surplus, cash is money held."], ["Businesses only receive cash after a year", "Cash is received when customers pay, which can be soon."]],
    hints: ["When is revenue recorded and when does the cash arrive?"],
    explanation: "Sales on credit are included in revenue and profit before the customer pays, but the cash is received later.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which term describes closing down a company by selling its assets to pay its creditors?",
    ok: ["Liquidation", "Correct: the assets are sold and the business ends."],
    bad: [["Administration", "In administration an administrator tries to rescue the company."], ["Merger", "A merger joins two businesses; it does not close one to repay debts."], ["Franchising", "Franchising is a way of operating a business, not of closing one."]],
    explanation: "In liquidation the company's assets are sold to repay creditors and the company ceases to exist. Administration tries to rescue it.",
  });
  const prof = 12500 - 9200;
  chk(prof, 3300);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional mushroom grower in Mutare sells US\\$12,500 of mushrooms to supermarkets on 60 days' credit in March. Costs of US\\$9,200 are paid in cash in March. What is the effect for March?",
    ok: ["Profit of US\\$3,300 but cash outflow of US\\$9,200", "Correct: revenue less costs is a profit; no cash arrives until customers pay."],
    bad: [["Profit of US\\$3,300 and cash inflow of US\\$3,300", "The customers have not paid, so no cash has come in."], ["Loss of US\\$9,200 and cash outflow of US\\$9,200", "The sales of US\\$12,500 are part of March revenue, so the business made a profit."], ["Profit of US\\$12,500 and cash inflow of US\\$12,500", "The costs have been left out and the cash has not yet arrived."]],
    hints: ["Profit counts the credit sales; cash does not."],
    explanation: "Profit = 12,500 - 9,200 = US\\$3,300. Cash received in March is nil, and cash paid out is US\\$9,200.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery in Gweru doubles its orders in one month. It must buy flour and pay overtime immediately, but its customers pay after 45 days. What is the most likely financial result?",
    ok: ["A shortage of cash despite higher profit", "Correct: costs are paid before the sales income arrives."],
    bad: [["A surplus of cash as soon as orders arrive", "Cash does not arrive until customers pay."], ["A fall in the cost of flour and wages", "Higher orders do not make costs fall."], ["Less need for working capital than before", "Faster growth increases the need for working capital."]],
    hints: ["Compare when costs are paid and when income arrives."],
    explanation: "Growth means paying for materials and wages before the extra sales are paid for, so cash is short even when profit rises.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional tour operator in Victoria Falls plans to open a second lodge. It has strong profits but little cash. Which is the **most important** question to answer before it expands?",
    ok: ["Can it fund costs before income arrives?", "Correct: profit does not pay bills; cash does."],
    bad: [["Will the new lodge have a modern design?", "Design matters less than being able to pay for the project."], ["Is the profit of the first lodge large enough?", "Profit helps but is not cash; the timing of cash is the issue."], ["Do competitors also have two lodges?", "Competitors' numbers do not decide whether the expansion can be funded."]],
    hints: ["Think of what stops a profitable business from paying its bills."],
    explanation: "Expansion needs cash before it brings income. If the operator cannot finance the gap, even a profitable project can bring failure.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business that is making a profit can never fail.",
    answer: false,
    explanation: "False. A profitable business can fail if it has too little cash to pay suppliers and wages when they fall due.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In administration, an administrator takes control of an insolvent company and tries to rescue it.",
    answer: true,
    explanation: "True. An administrator tries to keep the company trading or sell it as a going concern, with temporary protection from creditors.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Start-up capital", "Money needed to set up a business before it earns revenue"], ["Working capital", "Money available for the day-to-day running of the business"], ["Bankruptcy", "A legal process for a person who cannot pay their debts"], ["Liquidation", "Closing a company and selling its assets to pay creditors"]],
    explanation: "Each term describes a different part of a business's financial position.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Money needed to buy machinery that will last several years is a {{blank:a}}-term need. Goods sold on credit add to {{blank:b}} but not yet to cash.",
    blanks: [
      { id: "a", accepted: ["long"], choices: ["long", "short", "no"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "wages", "debt"] },
    ],
    explanation: "Machinery needs long-term finance. Credit sales are counted in revenue and profit before the cash arrives.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** reason why a business needs finance after it has started trading.",
    accepted: ["to pay wages", "to pay suppliers", "to buy stock", "to pay bills", "to grow", "to expand", "working capital", "to survive", "to cover cash shortages", "to buy equipment", "to pay for day-to-day running costs", "to pay expenses"],
    explanation: "Accept: working capital for wages, bills and stock; expansion; survival through a shortage of cash; replacing equipment.",
  });

  const cashOpening = 4000, cashOut = 9200;
  const closing = cashOpening - cashOut;
  chk(closing, -5200);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: 5200, calculator: true, wrong: [3300, 9200],
    stem: "A fictional hardware shop in Chinhoyi starts March with US\\$4,000 in the bank. During March it pays out US\\$9,200 and receives no cash because its sales are on credit. Calculate the size of its overdraft at the end of March.",
    hints: ["Opening balance minus cash paid out; a negative balance is an overdraft."],
    explanation: "Closing balance = 4,000 - 9,200 = -US\\$5,200, an overdraft of US\\$5,200. Giving 9,200 forgets the opening balance.",
  });
  const gap = sum([2100, 3900, 4200, 700, 350, 2000]) - 5500;
  chk(gap, 7750);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: gap, calculator: true, wrong: [13250, 5500],
    stem: "A fictional bee-farming project in Mutare needs these start-up items: hives US\\$2,100, bees US\\$3,900, a honey store US\\$4,200, protective clothing US\\$700, licences US\\$350 and cash for the first month US\\$2,000. The owner can contribute US\\$5,500. Calculate the finance she still needs to find.",
    hints: ["Add the items, then subtract what the owner can pay."],
    explanation: "Total = 2,100 + 3,900 + 4,200 + 700 + 350 + 2,000 = US\\$13,250. Finance needed = 13,250 - 5,500 = US\\$7,750. Forgetting the owner's contribution gives US\\$13,250.",
    workedSolution: "1. Total start-up cost = 2,100 + 3,900 + 4,200 + 700 + 350 + 2,000 = US\\$13,250.\n2. Shortfall = 13,250 - 5,500 = US\\$7,750.",
  });
  const prof2 = 19000 - 11500 - 3200;
  chk(prof2, 4300);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: prof2, calculator: true, daily: true, wrong: [19000, 7500],
    stem: "A fictional dairy in Gweru has revenue of US\\$19,000, material costs of US\\$11,500 and wages of US\\$3,200 in a month. Calculate its profit for the month.",
    hints: ["Profit = revenue - all costs."],
    explanation: "19,000 - 11,500 - 3,200 = US\\$4,300. Taking away only the material costs gives US\\$7,500.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between cash and profit.",
    points: ["Cash is the money a business actually receives and pays out", "Profit is revenue minus costs for a period", "Credit sales are counted in profit before the cash is received"],
    modelAnswer: "Cash is the money a business actually holds and moves in and out. Profit is revenue minus costs for a period. Because credit sales count as revenue before customers pay, a business can show a profit and still have little cash.",
    hints: ["When does a credit sale count in each?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional tuck shop near Harare is about to open. Explain two ways in which the owner will need finance in the first months.",
    points: ["To buy start-up equipment such as shelves and a fridge", "Application: these are long-term items bought before any sales", "To pay for stock and running costs until sales cover them", "Application: the first stock of sweets, bread and airtime must be paid for before customers buy"],
    modelAnswer: "The owner needs finance for equipment such as shelves and a fridge, which are bought before any sales and last for years. She also needs working capital to buy the first stock of bread, sweets and airtime, and to pay running costs until the takings cover them.",
    hints: ["Separate equipment from running costs."],
    explanation: "Two needs, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why rapid growth can cause a profitable business to fail.",
    points: ["More orders mean more materials and wages to pay immediately", "Customers usually pay later, so cash flows out before it flows in", "The business may run out of cash and be unable to pay suppliers", "Suppliers or the bank may then take action, causing failure"],
    modelAnswer: "More orders mean more materials and wages to pay at once, but customers usually pay later, so cash flows out before it flows in. The business may run out of cash and be unable to pay suppliers, who may then stop supplying it or demand payment, causing failure.",
    hints: ["Think of the timing of cash."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional chicken farm in Bulawayo is profitable but has a growing overdraft. Assess the importance of cash flow compared with profit to the farm's survival.",
    points: ["Profit shows whether the farm earns more than it spends over time", "Cash is needed to pay feed suppliers and wages when due", "The overdraft shows the farm is paying out cash faster than it receives it", "Lenders may withdraw the overdraft, forcing the farm to close despite profits", "Counter-argument: a profit that continues will eventually improve cash if customers pay", "Judgement with a reason, for example cash flow is more urgent for survival, profit matters for the long term"],
    modelAnswer: "Profit shows whether the farm earns more than it spends over time, but cash is what pays feed suppliers and wages when they are due. The growing overdraft shows that cash is paid out faster than it comes in, and the bank may withdraw it, forcing the farm to close despite profits. A continuing profit should eventually improve cash if customers pay on time. In the short run cash flow is more important for survival, while profit matters for the long term.",
    hints: ["Say which matters more in the short run and why."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const sales = 14000, cashSales = 6000, credit = sales - cashSales, costs = 8800, open = 2500;
  const profit = sales - costs;
  const cashIn = cashSales, net = cashIn - costs, clos = open + net;
  chk(profit, 5200); chk(net, -2800); chk(clos, -300);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional honey business in Chinhoyi had sales of ${money(sales)} in April, of which ${money(cashSales)} was paid in cash and the rest was sold on credit and is not yet paid. It paid ${money(costs)} in costs during April. It began April with ${money(open)} in the bank.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: profit, wrong: [net, cashSales], stem: "Calculate the profit for April.", explanation: "Profit = 14,000 - 8,800 = US\\$5,200." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(clos), wrong: [2800, 5200], stem: "Calculate the size of the overdraft at the end of April.", explanation: "Cash received = 6,000; cash paid = 8,800; net = -2,800. Closing = 2,500 - 2,800 = -US\\$300, an overdraft of US\\$300." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain why the business has an overdraft although it made a profit.", points: ["Profit includes sales on credit that have not yet been paid", "Application: US\\$8,000 of April's sales has not been received in cash", "Costs were paid in cash during the month", "Application: US\\$8,800 was paid out but only US\\$6,000 came in", "The cash will arrive when the credit customers pay, but meanwhile the bank balance is negative"], modelAnswer: "Profit includes the US\\$8,000 of sales on credit that has not yet been paid, but the costs of US\\$8,800 were paid in cash during the month and only US\\$6,000 came in. The overdraft will be cleared when the credit customers pay, but until then the bank balance is negative.", explanation: "Credit sales raise profit but not cash." }),
    ],
    hints: ["Profit counts credit sales; cash does not.", "Closing balance = opening balance + cash received - cash paid."],
    explanation: "Profit US\\$5,200; closing balance -US\\$300 (an overdraft of US\\$300); credit sales explain the difference.",
  });

  // Practice structured 2 (14 marks): start-up finance
  const items = [["Equipment", 7500], ["Stock", 3000], ["Rent deposit", 1200], ["Licences", 600], ["Cash for the first two months' wages", 3400]];
  const total = sum(items.map((i) => i[1]));
  const lt = items[0][1], stt = total - lt;
  chk(total, 15700); chk(stt, 8200);
  const gap2 = total - 9500;
  chk(gap2, 6200);
  const pct = r2((9500 / total) * 100);
  chk(pct, 60.51);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional computer repair shop in Gaborone needs the following start-up finance.\n\n${table(["Item", "US\\$"], items.map((i) => [i[0], i[1]]))}\n\nThe owner can invest ${money(9500)} of her own savings.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: total, wrong: [gap2, 9500], stem: "Calculate the total start-up finance needed.", explanation: "7,500 + 3,000 + 1,200 + 600 + 3,400 = US\\$15,700." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pct, wrong: [39.5, 100], stem: "Calculate the percentage of the total that the owner can provide, to one decimal place.", explanation: "9,500 ÷ 15,700 × 100 = 60.5%." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: gap2, wrong: [total, 9500], stem: "Calculate how much finance the owner still needs to find.", explanation: "15,700 - 9,500 = US\\$6,200." }),
      P.manual({ label: "(d)", marks: 8, stem: "Evaluate whether the owner should start the business with this level of finance.", points: [["The owner must find US\\$6,200 more, which is nearly 40% of the total", 1], ["Equipment of US\\$7,500 is a long-term need and could be bought second-hand or leased to reduce the gap", 2], ["The cash for wages (US\\$3,400) covers only two months, so a slow start could cause a cash shortage", 2], ["Costs may be higher than planned, so a margin is needed", 1], ["Counter-argument: the business could begin on a smaller scale with less stock and fewer staff", 1], ["Judgement with a reason: start only when the shortfall is financed, with a cash reserve", 1]], levels: [[3, 6, 8, "Figures used with the case; short- and long-term needs distinguished; risks weighed; a justified judgement"], [2, 3, 5, "Some use of the figures and some weighing; judgement weakly supported"], [1, 1, 2, "Lists needs without using the case figures"]], modelAnswer: "The owner can provide 60.5% of the US\\$15,700 needed and must still find US\\$6,200, which is a large gap. The equipment is a long-term need and could be bought second-hand or leased to reduce it. The cash set aside for wages covers only two months, so a slow start could cause a shortage of cash, and costs may turn out higher than planned. She could begin on a smaller scale, but the sensible choice is to start only when the shortfall is financed and a cash reserve is available.", hints: ["Use the percentage, the shortfall and the type of each need."], explanation: "Weighs the size of the shortfall against ways to reduce it and the risk of a cash shortage." }),
    ],
    hints: ["Add every item first.", "The percentage uses the total as the base."],
    explanation: "Total US\\$15,700; owner provides 60.5%; shortfall US\\$6,200; a judgement on starting.",
  });

  // Practice structured 3 (18 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional printing company in Harare grew quickly after winning a large contract to print school textbooks. It bought two new machines using a short-term loan, paid its paper suppliers within 30 days and gave schools 90 days to pay. Its profit for the year was high, but at the year end it had no cash, its overdraft limit was reached and the bank refused any further loan. Two suppliers have now threatened court action.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Define the term 'liquidation'.", points: ["The closing down of a company", "Its assets are sold", "The money is used to pay creditors"], modelAnswer: "Liquidation is the closing down of a company, when its assets are sold and the money is used to pay what it owes to its creditors.", explanation: "One point per mark." }),
      P.manual({ label: "(b)", marks: 6, stem: "Analyse why the company has a cash problem although it made a high profit.", points: ["Schools take 90 days to pay but suppliers want paying in 30 days", "Application: paper is paid for 60 days before the cash arrives", "A short-term loan was used for machines that last for years", "Application: repayments fall due before the machines have earned the money", "Rapid growth meant more paper and wages to pay in advance", "The overdraft is full and the bank has refused more, so there is no way to fill the gap"], modelAnswer: "Schools take 90 days to pay but suppliers want payment in 30 days, so the company pays out cash 60 days before it receives any. It also used a short-term loan to buy machines that last for years, so the repayments fall due before the machines have earned the money. Rapid growth added to the paper and wages to pay in advance, and with the overdraft full and the bank unwilling to lend, there is no way to fill the gap.", explanation: "Three causes, each linked to the case." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate what the company should do to avoid liquidation.", points: [["Negotiate longer payment terms with suppliers or an extension while the schools pay", 2], ["Ask schools to pay sooner or in part in advance, or use debt factoring", 2], ["Replace the short-term loan with long-term finance, such as a loan over several years, or lease the machines", 2], ["Each solution has a cost: factoring lowers income and long-term borrowing adds interest", 1], ["Counter-argument: the suppliers' threat of court action leaves little time", 1], ["Judgement with a reason: talk to suppliers at once and arrange long-term finance", 1]], levels: [[3, 7, 9, "Several solutions applied to the case with their costs weighed and a justified judgement"], [2, 4, 6, "Some solutions with some application; judgement weakly supported"], [1, 1, 3, "Lists solutions without applying them"]], modelAnswer: "The most urgent step is to negotiate with the two suppliers, because court action leaves little time; a longer payment period or a short extension would give time for the schools to pay. The company could also ask schools to pay in part in advance or use debt factoring, though factoring lowers its income. In the longer term it should replace the short-term loan with a loan over several years or lease the machines so repayments match the income the machines earn, although borrowing adds interest. It should talk to the suppliers at once and then arrange long-term finance.", hints: ["Say which action is most urgent and why."], explanation: "Weighs the solutions against their cost and the urgency of the suppliers' threat." }),
    ],
    hints: ["Use the details of payment terms and the loan in each answer."],
    explanation: "Defines liquidation; shows why profit and cash differ; recommends actions with their costs.",
  });

  b.card("DEFINITION", "Start-up capital", "The money needed to set up a business before it earns revenue: premises, equipment, first stock and early expenses.");
  b.card("DEFINITION", "Working capital (need)", "The finance needed for day-to-day running: wages, bills and stock paid for before customers pay.");
  b.card("CONCEPT", "Short-term and long-term needs", "Short-term (up to about a year): wages, stock, bills. Long-term: machinery, vehicles, buildings. Match the finance to the life of the asset.");
  b.card("CONCEPT", "Cash is not profit", "Profit = revenue - costs for a period. Cash = money actually received and paid. Credit sales raise profit before they raise cash.");
  b.card("FORMULA", "Closing cash balance", "Closing balance = opening balance + cash received - cash paid. A negative result is an overdraft.");
  b.card("DEFINITION", "Bankruptcy", "A legal process for an individual (such as a sole trader) who cannot pay their debts; assets are used to repay creditors.");
  b.card("DEFINITION", "Liquidation", "A company is closed down and its assets are sold to pay creditors.");
  b.card("DEFINITION", "Administration", "An administrator takes control of an insolvent company to rescue it or sell it as a going concern, with temporary protection from creditors.");
  b.card("FACT", "Financial causes of business failure", "Cash shortage, too little start-up capital, over-expansion, bad debts and falling sales.");
});
