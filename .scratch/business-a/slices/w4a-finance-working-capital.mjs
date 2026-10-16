// W4a: finance.working-capital (both ZIMSEC syllabi and Cambridge AS)
// Conventions: working capital = current assets - current liabilities; 365-day year for receivables; a discount cost = value of sales taking it x rate.
import { concept, P, table, money, chk, r2, sum, statement } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

const wcTable = (ca, cl) => {
  const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
  return {
    tca, tcl, wc: r2(tca - tcl),
    md: table(["Item", "US\\$"], [["**Current assets**", ""], ...ca, ["Total current assets", tca], ["**Current liabilities**", ""], ...cl, ["Total current liabilities", tcl]]),
  };
};

concept("abus.finance.working-capital", { file: "finance/working-capital", keyPrefix: "finance.working-capital" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **working capital** calculated?",
    ok: ["Current assets - current liabilities", "Correct: it measures the funds available for day-to-day running."],
    bad: [["Non-current assets minus current assets", "That compares different types of asset and is not working capital."], ["Revenue minus cost of sales", "That is gross profit."], ["Cash plus the owner's capital", "Working capital is not the owner's capital plus cash."]],
    explanation: "Working capital = current assets - current liabilities.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is **capital expenditure**?",
    ok: ["Buying a new delivery lorry", "Correct: a lorry is a non-current asset used for several years."],
    bad: [["Paying this month's wages", "Wages are revenue expenditure."], ["Buying a month's supply of fuel", "Fuel is used up in the period, so it is revenue expenditure."], ["Repairing a broken window", "A repair maintains an asset and is revenue expenditure."]],
    explanation: "Capital expenditure buys assets that last more than a year. Wages, fuel and repairs are revenue expenditure.",
  });
  const w1 = wcTable([["Inventory (stock)", 11200], ["Trade receivables (debtors)", 7800], ["Cash", 900]], [["Trade payables (creditors)", 9300], ["Bank overdraft", 4500]]);
  chk(w1.tca, 19900); chk(w1.tcl, 13800); chk(w1.wc, 6100);
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `A fictional hardware shop in Chinhoyi has the following current items.\n\n${w1.md}\n\nWhat is its working capital?`,
    ok: [money(w1.wc), "Correct: 19,900 - 13,800."],
    bad: [[money(w1.tca), "That is the total of current assets; current liabilities have not been deducted."], [money(w1.tcl), "That is the total of current liabilities only."], [money(33700), "That adds the current assets and the current liabilities together."]],
    hints: ["Add each group first, then subtract."],
    explanation: `Current assets = 11,200 + 7,800 + 900 = ${w1.tca.toLocaleString("en-GB")}. Current liabilities = 9,300 + 4,500 = ${w1.tcl.toLocaleString("en-GB")}. Working capital = US\\$6,100.`,
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which problem is most likely to result from having **too little** working capital?",
    ok: ["Difficulty paying suppliers and wages", "Correct: the business lacks the funds to meet its short-term debts."],
    bad: [["Cash lying idle in the bank account", "Idle cash is a problem of too much working capital."], ["A large stock of goods that will not sell", "Excess stock is a sign of too much working capital tied up."], ["Falling prices for customers", "Working capital does not directly set prices."]],
    hints: ["Think of the bills that fall due in the short term."],
    explanation: "Too little working capital means the business cannot pay its short-term debts, which may damage relations with suppliers or lead to failure.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A fictional furniture maker in Gweru offers customers a 3% discount for payment within 10 days instead of 45 days. What is the **main purpose** of the discount?",
    ok: ["To receive its cash sooner", "Correct: faster payment releases cash and cuts borrowing."],
    bad: [["To raise the selling price", "A discount lowers income; it does not raise the price."], ["To increase the stock held", "A discount for early payment does not change stock."], ["To delay payments to suppliers", "The discount concerns customers, not suppliers."]],
    hints: ["Why would the business give up part of the price?"],
    explanation: "An early settlement discount encourages customers to pay sooner, improving the cash position, but it costs the business part of its revenue.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional clothing wholesaler in Bulawayo sells a US\\$20,000 invoice to a factoring firm, which pays 80% at once. What is the **immediate** cash received?",
    ok: [money(16000), "Correct: 80% of 20,000."],
    bad: [[money(20000), "The factor pays only part of the invoice immediately."], [money(4000), "That is the 20% that is paid later, not the immediate payment."], [money(8000), "That is 40% of the invoice, not 80%."]],
    hints: ["Take 80% of the invoice value."],
    explanation: "80% × 20,000 = US\\$16,000 immediately. The balance, less the factor's fee, is paid when the customer pays.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional tuck-shop supplier grows quickly, buys more stock for cash and gives customers longer to pay. It reports higher profit but has a bank overdraft that grows every month. What is the best description of its problem?",
    ok: ["Overtrading: growth outran its cash", "Correct: growth has absorbed cash in stock and receivables."],
    bad: [["Too much working capital being held", "A growing overdraft shows too little working capital, not too much."], ["Falling sales across the whole year", "The business reports higher profit and rising sales."], ["A lack of long-term assets to use", "The problem is short-term funding, not fixed assets."]],
    hints: ["Where has the extra cash gone as the business grew?"],
    explanation: "Overtrading occurs when a business expands faster than its working capital allows: cash goes into stock and credit to customers, so the overdraft grows despite profit.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional printer in Harare is considering factoring its invoices to improve working capital. Which is the best argument **against** doing so?",
    ok: ["The fee reduces the profit on every invoice factored", "Correct: the improvement in cash is bought at a continuing cost."],
    bad: [["Factoring increases the number of days customers take to pay", "The factor collects the debts; customers' payment time is not lengthened by factoring."], ["Factoring makes all customers pay early", "It is the factor, not customers, who is paid early by the printer."], ["Factoring creates a long-term asset on the statement of financial position", "Factoring turns receivables into cash; it creates no long-term asset."]],
    hints: ["What does the business give up in exchange for faster cash?"],
    explanation: "Factoring provides cash quickly but the fee lowers profit, and customers may dislike dealing with a third party.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A business with positive working capital can never have difficulty paying its bills.",
    answer: false,
    hints: ["What are the current assets made of?"],
    explanation: "False. If most current assets are stock and receivables rather than cash, the business may be unable to pay bills that fall due before it sells stock or customers pay.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method to what it does.",
    pairs: [["Early settlement discount", "Encourages customers to pay sooner"], ["Debt factoring", "Sells invoices to a firm for immediate cash"], ["Credit limit", "Sets the most a customer can owe at one time"], ["Negotiating longer terms with suppliers", "Delays payment of trade payables"]],
    explanation: "Each method controls a different part of working capital.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Money owed by customers is called trade {{blank:a}}, and money owed to suppliers is trade {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["receivables"], choices: ["receivables", "payables", "assets"] },
      { id: "b", accepted: ["payables"], choices: ["payables", "receivables", "capital"] },
    ],
    explanation: "Receivables (debtors) owe the business; payables (creditors) are owed by the business.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which a business can reduce the time customers take to pay.",
    accepted: ["offer a discount for early payment", "early settlement discount", "chase late payers", "send invoices promptly", "invoice promptly", "set credit limits", "check credit references", "use debt factoring", "factoring", "charge interest on late payments", "demand payment in advance", "ask for a deposit", "cash only"],
    explanation: "Accept: discounts for early payment, prompt invoicing, chasing late payers, credit checks and limits, factoring, penalties for lateness, or deposits.",
  });

  const ca2 = [["Inventory (stock)", 6400], ["Trade receivables (debtors)", 9100], ["Cash", 300]], cl2 = [["Trade payables (creditors)", 12600], ["Bank overdraft", 5200]];
  const w2 = wcTable(ca2, cl2);
  chk(w2.wc, -2000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: Math.abs(w2.wc), calculator: true, wrong: [15800, 17800],
    stem: `A fictional cattle-feed seller in Masvingo has current assets of inventory US\\$6,400, trade receivables US\\$9,100 and cash US\\$300, and current liabilities of trade payables US\\$12,600 and a bank overdraft US\\$5,200. By how much do its current liabilities exceed its current assets (its working capital deficit)?`,
    hints: ["Total each group and subtract."],
    explanation: "Current assets = 6,400 + 9,100 + 300 = 15,800. Current liabilities = 12,600 + 5,200 = 17,800. Working capital = 15,800 - 17,800 = -US\\$2,000, a deficit of US\\$2,000.",
  });
  const sales = 150000, days0 = 45, days1 = 7, takeUp = 0.4, rate = 0.02, cost = 0.15;
  const rec0 = (sales * days0) / 365, rec1 = (sales * takeUp * days1) / 365 + (sales * (1 - takeUp) * days0) / 365;
  const released = rec0 - rec1, interest = released * cost, discounts = sales * takeUp * rate;
  chk(discounts, 1200);
  chk(Math.round(released), 6247); chk(Math.round(interest), 937);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: r2(discounts - interest), dp: 0, tol: 0.5, calculator: true, wrong: [r2(interest), r2(discounts)],
    stem: `A fictional furniture wholesaler in Harare has credit sales of ${money(sales)} a year and customers take ${days0} days to pay. It offers a ${rate * 100}% discount for payment within ${days1} days. It expects ${takeUp * 100}% of sales (by value) to take the discount and pay in ${days1} days; the rest will still pay in ${days0} days. Its overdraft costs ${cost * 100}% a year. Use a 365-day year. Calculate the net annual cost of the discount scheme (the cost of the discounts given less the interest saved), to the nearest dollar.`,
    hints: ["Find the fall in average receivables, then the interest saved, then the cost of the discounts."],
    explanation: "Average receivables now = 150,000 × 45 ÷ 365 = US\\$18,493. With the discount = 60,000 × 7 ÷ 365 + 90,000 × 45 ÷ 365 = 1,151 + 11,096 = US\\$12,247. Fall = US\\$6,247, so interest saved = 6,247 × 15% = US\\$937. Cost of discounts = 60,000 × 2% = US\\$1,200. Net cost = 1,200 - 937 = US\\$263.",
    workedSolution: "1. Receivables now = 150,000 × 45 ÷ 365 = 18,493.\n2. With the discount = 60,000 × 7 ÷ 365 + 90,000 × 45 ÷ 365 = 1,151 + 11,096 = 12,247.\n3. Fall = 6,247; interest saved = 6,247 × 0.15 = 937.\n4. Cost of discounts = 60,000 × 0.02 = 1,200.\n5. Net cost = 1,200 - 937 = US\\$263.",
  });
  const fee = r2(25000 * 0.02), finalPay = r2(25000 - 18750 - fee);
  chk(fee, 500); chk(finalPay, 5750);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: finalPay, calculator: true, wrong: [6250, 6000],
    stem: "A fictional bakery in Mutare factors a US\\$25,000 invoice. The factor pays 75% at once and charges a fee of 2% of the invoice value, which is deducted from the balance paid when the customer pays. How much will the bakery receive when the customer pays?",
    hints: ["Balance = 25% of the invoice, minus the fee."],
    explanation: "Balance = 25,000 - 18,750 = 6,250. Fee = 2% × 25,000 = 500. Final payment = 6,250 - 500 = US\\$5,750. The bakery receives 18,750 + 5,750 = US\\$24,500 in total.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why working capital is important to a business.",
    points: ["It funds the day-to-day running of the business", "It pays suppliers, wages and expenses on time", "Without enough, the business may fail even if it is profitable"],
    modelAnswer: "Working capital funds the day-to-day running of the business, such as paying suppliers, wages and expenses on time. Without enough of it, the business may fail even if it is profitable.",
    hints: ["What does the business use working capital to pay?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hotel in Victoria Falls gives conference organisers 60 days to pay. Explain two ways in which it could improve its working capital.",
    points: ["Ask for part-payment or a deposit when the booking is made", "Application: organisers would pay part of the fee months before the event", "Offer a discount for early payment", "Application: a small discount for payment within 14 days would bring cash in sooner"],
    modelAnswer: "The hotel could ask for a deposit when a conference is booked, so part of the fee arrives months before the event. It could also offer a small discount for payment within 14 days so that cash comes in sooner.",
    hints: ["Link each way to the conference organisers."],
    explanation: "Two ways, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how holding too much stock affects a business's working capital.",
    points: ["Money is tied up in stock and cannot be used elsewhere", "Storage, insurance and security costs rise", "Stock may be damaged or go out of date", "Less cash is available to pay bills, so the business may need to borrow"],
    modelAnswer: "Money is tied up in stock and cannot be used elsewhere, and storage, insurance and security costs rise. Stock may be damaged or go out of date. With less cash available to pay bills, the business may need to borrow.",
    hints: ["Follow the money from stock to the ability to pay bills."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional supermarket supplier in Gweru has slow-paying customers and a growing overdraft. Assess whether it should use debt factoring.",
    points: ["Factoring provides most of the invoice value at once, reducing the overdraft", "The factor takes over collecting the debts, saving administration time", "The fee reduces profit on every invoice", "Customers may dislike dealing with a factor, which may harm relations", "Counter-argument: other methods, such as discounts or credit checks, may cost less", "Judgement with a reason, for example use factoring for a limited period while tightening credit control"],
    modelAnswer: "Factoring would provide most of each invoice at once, reducing the overdraft, and the factor takes over collecting the debts. But the fee reduces profit on every invoice and customers may dislike dealing with a factor. Discounts and tighter credit checks may cost less. The supplier should use factoring for a limited period while it tightens credit control.",
    hints: ["Compare the benefit of fast cash with the continuing fee."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const ca3 = [["Inventory (stock)", 14600], ["Trade receivables (debtors)", 11900], ["Cash", 700]], cl3 = [["Trade payables (creditors)", 13400], ["Bank overdraft", 6800]];
  const w3 = wcTable(ca3, cl3);
  chk(w3.tca, 27200); chk(w3.tcl, 20200); chk(w3.wc, 7000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional garage in Masvingo has the following current items at the end of June.\n\n${w3.md}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", type: "CALCULATION", value: w3.wc, wrong: [w3.tca, w3.tcl], stem: "Calculate the garage's working capital.", explanation: "Current assets 27,200 - current liabilities 20,200 = US\\$7,000.", workedSolution: "1. Current assets = 14,600 + 11,900 + 700 = 27,200.\n2. Current liabilities = 13,400 + 6,800 = 20,200.\n3. Working capital = 27,200 - 20,200 = US\\$7,000." }),
      P.manual({ label: "(b)", marks: 6, stem: "Explain why the garage may still have difficulty paying its bills although its working capital is positive.", points: ["Most current assets are stock and receivables, not cash", "Application: only US\\$700 of the US\\$27,200 is cash", "The overdraft (US\\$6,800) may be repayable on demand", "Application: the garage owes US\\$13,400 to suppliers who may want payment before customers pay", "Stock may take time to sell and customers time to pay", "So the business may not have the cash when the bills fall due"], modelAnswer: "Most of the current assets are stock and receivables, not cash: only US\\$700 of the US\\$27,200 is cash. The overdraft of US\\$6,800 may be repayable on demand and the garage owes US\\$13,400 to suppliers who may want payment before customers pay. Stock takes time to sell and customers take time to pay, so the garage may not have the cash when its bills fall due.", explanation: "Distinguishes working capital from cash, using the figures." }),
    ],
    hints: ["Total each group of items.", "Look at how much of the current assets is cash."],
    explanation: "Working capital US\\$7,000; but only US\\$700 is cash, so liquidity may still be a problem.",
  });

  // Practice structured 2 (14 marks): discount decision with different numbers
  const s2 = 96000, d0 = 60, d1 = 10, t2 = 0.5, r = 0.03, c = 0.12;
  const rA = (s2 * d0) / 365, rB = (s2 * t2 * d1) / 365 + (s2 * (1 - t2) * d0) / 365;
  const rel = r2(rA - rB), save = r2(rel * c), dc = r2(s2 * t2 * r);
  chk(dc, 1440);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional paint supplier in Bulawayo has credit sales of ${money(s2)} a year. Customers take ${d0} days to pay. The owner is considering a ${r * 100}% discount for payment within ${d1} days, which she expects ${t2 * 100}% of sales (by value) to take; the rest would still pay in ${d0} days. Her overdraft costs ${c * 100}% a year. Use a 365-day year and round to the nearest dollar.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", type: "CALCULATION", value: rel, dp: 0, tol: 1, wrong: [Math.round(rA), Math.round(rB)], stem: "Calculate the fall in average receivables if the discount is introduced, to the nearest dollar.", explanation: "Now: 96,000 × 60 ÷ 365 = 15,781. With the discount: 48,000 × 10 ÷ 365 + 48,000 × 60 ÷ 365 = 1,315 + 7,890 = 9,205. Fall = US\\$6,575.", workedSolution: "1. Receivables now = 96,000 × 60 ÷ 365 = 15,781.\n2. With the discount = 48,000 × 10 ÷ 365 + 48,000 × 60 ÷ 365 = 9,205.\n3. Fall = 15,781 - 9,205 = US\\$6,575 (6,576 if the rounded figures are subtracted)." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: save, dp: 0, tol: 1, wrong: [Math.round(rel), 1440], stem: "Calculate the annual saving in overdraft interest, to the nearest dollar.", explanation: "6,575 × 12% = US\\$789." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: dc, wrong: [2880, 96000 * r], stem: "Calculate the cost of the discounts given in a year.", explanation: "Sales taking the discount = 96,000 × 50% = 48,000. Cost = 48,000 × 3% = US\\$1,440." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate whether the owner should introduce the discount.", points: ["The interest saved (about US\\$789) is less than the cost of the discounts (US\\$1,440), so the scheme loses about US\\$651 a year at 12%", "A higher cost of borrowing would make it worthwhile", "Cash is released earlier, which reduces the risk of a cash shortage", "The take-up of 50% is an estimate; fewer customers taking it would cost less but release less cash", "Customers may take the discount and still pay late", "Counter-argument: the cash released may allow the owner to avoid a more costly crisis", "Judgement with a reason: reject on cost, or use a smaller discount or other methods such as chasing late payers"], levels: [[3, 5, 7, "Both figures compared; risk and estimates weighed; a justified judgement"], [2, 3, 4, "Compares some figures with some weighing; judgement weakly supported"], [1, 1, 2, "General statements about discounts"]], modelAnswer: "The interest saved is about US\\$789 while the discounts cost US\\$1,440, so at a borrowing rate of 12% the scheme loses about US\\$651 a year. At a higher borrowing rate it would pay, and releasing cash earlier reduces the risk of a cash shortage. The take-up of 50% is only an estimate, and some customers may take the discount and still pay late. On the figures the owner should not introduce a 3% discount, but she could try a smaller one or chase late payers instead.", hints: ["Compare the interest saved with the cost of the discounts, then think about what could change the answer."], explanation: "Weighs the saving against the cost and the uncertainty of take-up." }),
    ],
    hints: ["Compare average receivables before and after the discount.", "Interest saved = cash released × the interest rate."],
    explanation: "Interest saved is less than the discount cost; the scheme is not worthwhile at 12%.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional bakery chain in Harare opened four new shops in one year. Sales doubled and profit rose, but the owner now finds that bills are paid late. Each shop holds a large stock of flour and packaging. Two hotel customers take 90 days to pay. The bakery's overdraft is at its limit and the bank has asked for a meeting.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain what is meant by overtrading.", points: ["Expanding faster than the finance available allows", "Cash is absorbed by stock and credit to customers", "So the business cannot pay its bills although sales and profit rise"], modelAnswer: "Overtrading is expanding faster than the finance available allows. Cash is absorbed by extra stock and credit given to customers, so the business cannot pay its bills even though sales and profit are rising.", explanation: "One point per mark." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two causes of the bakery's working capital problem.", points: ["Large stocks of flour and packaging in each shop tie up cash", "Application: four new shops have each bought a full stock", "Hotel customers take 90 days to pay", "Application: flour and wages for the hotels' orders are paid long before the cash arrives"], modelAnswer: "Each of the four new shops holds a large stock of flour and packaging, which ties up cash. The two hotels take 90 days to pay, so flour and wages for their orders are paid long before the cash arrives.", explanation: "Two causes, each linked to the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate the actions the owner should take to improve the bakery's working capital before the meeting with the bank.", points: [["Cut stock levels in each shop so that less cash is tied up", 2], ["Ask hotels to pay in 30 days or give a discount for early payment, or factor their invoices", 2], ["Negotiate longer terms with the flour supplier", 1], ["Each action has a cost: discounts and factoring fees reduce profit, tight stock risks running out, and hotels may take their business elsewhere", 1], ["Counter-argument: further expansion should pause until cash improves", 1], ["Judgement with a reason: first cut stock and chase the hotels, as these cost least", 1]], levels: [[3, 6, 8, "Several actions linked to the case, their costs and risks weighed, and a justified judgement"], [2, 3, 5, "Some actions with some application; judgement weakly supported"], [1, 1, 2, "Lists actions without applying them"]], modelAnswer: "The cheapest first step is to cut the stocks of flour and packaging in the shops, which frees cash straight away, though stocks must not be so low that shops run out. The owner should also ask the hotels to pay within 30 days or offer a discount, or factor their invoices, but discounts and fees reduce profit and the hotels might take their business elsewhere. Negotiating longer terms with the flour supplier would help but may not be possible. She should also pause further expansion until cash improves. She should cut stock and chase the hotels first because they cost least, and tell the bank what she is doing.", hints: ["Say which action is cheapest and fastest and why."], explanation: "Weighs the actions by cost, speed and risk." }),
    ],
    hints: ["Use the facts in the extract: four new shops, 90-day hotels, a full overdraft."],
    explanation: "Overtrading; causes in stock and credit; actions to improve working capital with their costs.",
  });

  b.card("DEFINITION", "Working capital", "The finance available for the day-to-day running of a business: current assets minus current liabilities.");
  b.card("FORMULA", "Working capital", "Working capital = current assets - current liabilities.");
  b.card("CONCEPT", "Too little working capital", "Cannot pay suppliers and wages on time; may lose credit, miss orders or be forced to close (overtrading is a common cause).");
  b.card("CONCEPT", "Too much working capital", "Cash tied up in idle stock, slow-paying customers or unused bank balances that could earn a return elsewhere.");
  b.card("CONCEPT", "Controlling trade receivables", "Credit checks and limits, prompt invoicing, chasing late payers, early settlement discounts and debt factoring.");
  b.card("DEFINITION", "Debt factoring", "Selling invoices to a specialist firm that pays most of the value at once and collects the debt, for a fee.");
  b.card("DEFINITION", "Capital expenditure", "Spending on non-current assets that last more than a year, such as machinery, vehicles and buildings.");
  b.card("DEFINITION", "Revenue expenditure", "Spending on the day-to-day running of the business, such as wages, materials and repairs, charged against profit.");
  b.card("CONCEPT", "Cost of an early settlement discount", "Compare the discount given (sales taking it × rate) with the interest saved on the cash released earlier.");
});
