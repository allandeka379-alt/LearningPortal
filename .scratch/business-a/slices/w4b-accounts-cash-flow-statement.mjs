// W4b: accounts.cash-flow-statement (ZIMSEC Business Studies only; the concept is tagged to its board automatically)
import { concept, P, table, r2, chk, fmt } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

concept("abus.accounts.cash-flow-statement", { file: "accounts/cash-flow-statement", keyPrefix: "accounts.cash-flow-statement" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Into which three sections is a statement of cash flows divided?",
    ok: ["Operating, investing, financing flows", "Correct: these are the three groups of cash flows."],
    bad: [["Revenue, expenses and profit activities", "These are the headings of the statement of profit or loss."], ["Assets, liabilities and equity activities", "These are the headings of the statement of financial position."], ["Cash in, cash out and cash held activities", "These are not the standard sections."]],
    explanation: "The statement groups cash flows into operating, investing and financing activities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which section of the statement of cash flows does the purchase of a delivery van appear?",
    ok: ["Investing activities, as a cash outflow", "Correct: buying non-current assets is investing."],
    bad: [["Operating activities, as a cash outflow", "Operating activities are the day-to-day trading flows."], ["Financing activities, as a cash inflow", "Buying a van is not a source of finance."], ["It does not appear, because depreciation is charged instead", "The cash paid for the van is shown when it is bought."]],
    explanation: "Purchases and sales of non-current assets are investing activities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Where are dividends paid to shareholders shown in the statement of cash flows?",
    ok: ["Financing activities, as an outflow", "Correct: dividends are a payment to the providers of finance."],
    bad: [["Operating activities, as an expense", "Dividends are not an expense of trading."], ["Investing activities, as an asset purchased", "Dividends are not the purchase of an asset."], ["Dividends are never shown, because they are profits", "The cash paid out is shown."]],
    explanation: "Dividends and loan repayments are financing outflows.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "In the indirect method, how is an increase in inventories during the year treated?",
    ok: ["Deducted, as cash is tied in inventory", "Correct: the extra stock was bought with cash."],
    bad: [["Added, because inventory is an asset", "More inventory uses cash, so it is deducted."], ["Ignored, because inventory is not cash", "The change in working capital affects cash."], ["Added to the investing activities", "Inventory changes are operating items."]],
    hints: ["Does more stock use cash or provide cash?"],
    explanation: "An increase in inventories means that more cash was used to buy stock than the profit figure suggests, so it is deducted from profit.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is depreciation added back to profit in the indirect method?",
    ok: ["It was deducted from profit but no cash was paid for it", "Correct: it is a non-cash expense."],
    bad: [["It is a source of cash that the business receives", "Depreciation does not bring any cash in."], ["It is paid in cash to the tax authority", "Depreciation is not paid to anyone."], ["It is a cash outflow that should be shown under financing", "No cash is paid, so it is not shown as an outflow."]],
    hints: ["Think about what was deducted to reach profit."],
    explanation: "Profit was reduced by depreciation, but no cash left the business, so it is added back to get the cash flow.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional company's profit rose by 30% but its cash fell. Which is the most likely reason?",
    ok: ["Inventory and receivables rose faster than profit", "Correct: profit was tied up in working capital."],
    bad: [["Depreciation was charged, which is paid in cash", "Depreciation involves no cash payment."], ["Profit cannot be linked to cash in any way", "Profit and cash are linked, but timing differences separate them."], ["Dividends are always added to profit to find cash", "Dividends paid reduce cash."]],
    hints: ["Which working capital items absorb cash?"],
    explanation: "A growing business often ties up profit in extra inventories and receivables, so cash can fall even as profit rises.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The direct and indirect methods give a different figure for net cash from operating activities.",
    answer: false,
    explanation: "False. The methods differ only in presentation; both give the same net cash from operating activities.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A decrease in trade payables is deducted from profit in the indirect method.",
    answer: true,
    hints: ["Paying suppliers uses cash."],
    explanation: "True. A fall in payables means the business paid suppliers more than it purchased on credit, using cash.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cash flow to the section of the statement in which it appears.",
    pairs: [["Cash received from customers", "Operating activities"], ["Purchase of machinery", "Investing activities"], ["Proceeds of a new bank loan", "Financing activities"], ["Tax paid", "Operating activities"]],
    explanation: "Trading receipts, interest and tax are operating; assets are investing; loans and dividends are financing.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Under the {{blank:a}} method the starting point is profit before tax, and depreciation is {{blank:b}} back.",
    blanks: [
      { id: "a", accepted: ["indirect"], choices: ["indirect", "direct", "closing"] },
      { id: "b", accepted: ["added"], choices: ["added", "deducted", "ignored"] },
    ],
    explanation: "The indirect method starts from profit before tax and adds back depreciation.",
  });

  // ---- numerical items
  const n1 = 38400 - 27000 + 9500;
  chk(n1, 20900);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: n1, calculator: true, daily: true, wrong: [38400 + 27000 + 9500, 38400 - 27000 - 9500],
    stem: "A fictional company has net cash from operating activities of US\\$38,400, net cash used in investing activities of US\\$27,000 and net cash from financing activities of US\\$9,500. Calculate the net increase in cash.",
    hints: ["Add the net cash flows, paying attention to the sign of each."],
    explanation: "38,400 − 27,000 + 9,500 = US\\$20,900. Adding the investing figure instead of deducting it gives US\\$74,900.",
  });
  const n2 = 6000 - 14300;
  chk(n2, -8300);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: n2, calculator: true, wrong: [14300 - 6000, 6000 + 14300],
    stem: "A fictional company starts the year with cash of US\\$6,000. Its statement of cash flows shows a net decrease in cash of US\\$14,300. Calculate the cash balance at the end of the year (enter an overdraft as a negative number).",
    hints: ["Opening cash plus the net change."],
    explanation: "6,000 − 14,300 = −US\\$8,300, an overdraft of US\\$8,300. The positive 8,300 is the wrong sign.",
  });
  const gen = 48500 + 12400 + 4000 - 9100 + 3300 + 2700;
  const op3 = gen - 4000 - 7500;
  chk(gen, 61800); chk(op3, 50300);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: op3, calculator: true, wrong: [gen, 48500 + 12400 - 9100 + 3300 + 2700 - 4000 - 7500],
    stem: "A fictional company has: profit before tax US\\$48,500 (after deducting finance costs of US\\$4,000); depreciation US\\$12,400; increase in inventories US\\$9,100; decrease in trade receivables US\\$3,300; increase in trade payables US\\$2,700. Interest paid was US\\$4,000 and tax paid US\\$7,500. Using the indirect method, calculate the net cash from operating activities.",
    hints: ["Add back the finance costs, then deduct the interest actually paid."],
    explanation: "Cash generated from operations = 48,500 + 12,400 + 4,000 − 9,100 + 3,300 + 2,700 = 61,800. Net cash from operating activities = 61,800 − 4,000 − 7,500 = US\\$50,300. Forgetting to add back the finance costs gives US\\$46,300.",
    workedSolution: "1. 48,500 + 12,400 + 4,000 = 64,900.\n2. 64,900 − 9,100 + 3,300 + 2,700 = 61,800.\n3. 61,800 − 4,000 interest − 7,500 tax = 50,300.",
  });
  const n4 = 372000 - (31900 - 28400);
  chk(n4, 368500);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: n4, calculator: true, wrong: [372000, 372000 + 3500],
    stem: "A fictional wholesaler has revenue of US\\$372,000, all on credit. Trade receivables were US\\$28,400 at the start of the year and US\\$31,900 at the end. Calculate the cash received from customers.",
    hints: ["An increase in receivables means some revenue has not yet been paid."],
    explanation: "Receivables rose by 3,500, so 3,500 of the revenue has not yet been collected. Cash received = 372,000 − 3,500 = US\\$368,500. Adding the increase gives US\\$375,500.",
  });
  const n5 = 310000 + 6200 + 1800;
  chk(n5, 318000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: n5, calculator: true, wrong: [310000, 310000 + 6200 - 1800],
    stem: "A fictional retailer's cost of sales and cash-type expenses for the year total US\\$310,000. Its inventories rose by US\\$6,200 and its trade payables fell by US\\$1,800. Calculate the cash paid to suppliers and for expenses.",
    hints: ["More inventory means more was bought; fewer payables means more was paid."],
    explanation: "Buying the extra inventory increases cash paid by 6,200, and paying down the payables by 1,800 increases it by a further 1,800. Cash paid = 310,000 + 6,200 + 1,800 = US\\$318,000.",
    workedSolution: "1. Costs = 310,000.\n2. Add the increase in inventories: 316,200.\n3. Add the decrease in payables: 318,000.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the section of the statement of cash flows in which the issue of new shares appears.",
    accepted: ["financing", "financing activities", "financing section"],
    explanation: "Financing activities.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a profitable business may still have a net decrease in cash.",
    points: ["Profit includes sales on credit that have not yet been paid for", "Cash may be used to buy more inventory or non-current assets, which are not expenses", "Cash is also used to repay loans and pay dividends, which are not deducted in arriving at profit"],
    modelAnswer: "Profit includes sales on credit that have not yet been paid for. Cash may also be used to buy more inventory or non-current assets, which are not expenses, and to repay loans and pay dividends, which are not deducted in arriving at profit.",
    hints: ["What uses cash but is not an expense?"],
    explanation: "Profit and cash differ because of timing and non-expense payments.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a lender would study a company's net cash from operating activities.",
    points: ["It shows how much cash the trading of the business generates", "Loan interest and repayments must be paid from cash, not from profit", "Operating cash that is regularly higher than the debt repayments shows ability to repay", "A business with high profit but weak operating cash may be unable to pay when payments fall due"],
    modelAnswer: "Net cash from operating activities shows how much cash the trading of the business generates. Interest and loan repayments must be paid from cash, not from profit, so operating cash that is regularly higher than the repayments shows that the business can pay. A business with high profit but weak operating cash may be unable to pay when payments fall due.",
    hints: ["Interest is paid in cash."],
    explanation: "A lender needs cash, not profit.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the usefulness of the statement of cash flows to the managers of a growing business.",
    points: ["It shows the cash generated by trading and how it was used", "It shows why cash differs from profit, for example because of extra inventory or receivables", "It shows reliance on borrowing and the capacity to pay dividends and invest", "It is historic, so it does not show future cash needs; a cash flow forecast is needed", "It is prepared after the year end, so problems may be found late", "Judgement and reason, for example useful as a review, but managers also need a forecast and regular monitoring"],
    modelAnswer: "The statement shows the cash generated by trading and how it was used, why cash differs from profit and how far the business relies on borrowing. But it is historic and prepared after the year end, so it does not show future cash needs or give an early warning. Managers of a growing business should use it as a review, together with a cash flow forecast and regular monitoring.",
    hints: ["Say what it shows and why a forecast is also needed."],
    explanation: "Uses and limits weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const M = { pbt: 22800, dep: 5400, inv: 3100, rec: 2300, pay: 1700, tax: 3600 };
  const opM = M.pbt + M.dep - M.inv - M.rec + M.pay - M.tax;
  const netM = opM - 14000 - 4000;
  chk(opM, 20900 - 0 + 0); chk(netM, 2900);
  const tblM = table(["US\\$ ", "Amount"].map((x) => x.trim().replace("US\\$", "US\\$")), [["Profit before tax", M.pbt], ["Depreciation", M.dep], ["Increase in inventories", M.inv], ["Increase in trade receivables", M.rec], ["Increase in trade payables", M.pay], ["Tax paid", M.tax], ["Purchase of an oven", 14000], ["Dividends paid", 4000]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Makoni Bakery Ltd is a fictional company in Chinhoyi. Its cash flow data for the year are shown. The company paid no interest.\n\n${tblM}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: opM, type: "CALCULATION", wrong: [M.pbt + M.dep, M.pbt + M.dep + M.inv + M.rec - M.pay - M.tax], stem: "Using the indirect method, calculate the net cash from operating activities.", explanation: "22,800 + 5,400 − 3,100 − 2,300 + 1,700 − 3,600 = US\\$20,900.", workedSolution: "1. 22,800 + 5,400 = 28,200.\n2. 28,200 − 3,100 − 2,300 + 1,700 = 24,500.\n3. 24,500 − 3,600 tax = 20,900." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: netM, wrong: [opM, opM + 14000 + 4000], stem: "Calculate the net increase in cash for the year.", explanation: "Investing: −14,000. Financing: −4,000. Net = 20,900 − 14,000 − 4,000 = US\\$2,900." }),
      P.manual({ label: "(c)", marks: 4, stem: "The bakery's profit before tax was US\\$22,800 but its cash increased by only US\\$2,900. Explain two reasons for the difference.", points: ["The bakery bought an oven for US\\$14,000, a cash outflow that is not an expense in the year", "Application: the oven is shown as investing, and only its depreciation reduces profit", "Inventories and receivables rose by US\\$5,400 together, tying up cash", "Dividends of US\\$4,000 and tax of US\\$3,600 were paid in cash but dividends are not deducted from profit"], modelAnswer: "The bakery bought an oven for US\\$14,000, which is a cash outflow in investing activities but not an expense, as only its depreciation reduces profit. Inventories and receivables rose by US\\$5,400 together, tying up cash, and dividends of US\\$4,000 were paid in cash although dividends are not deducted from profit.", explanation: "Profit and cash differ because of capital spending, working capital and dividends." }),
    ],
    hints: ["Increases in inventories and receivables are deducted; an increase in payables is added."],
    explanation: "Operating cash US\\$20,900; net increase US\\$2,900; the oven, working capital and dividends explain the gap from profit.",
  });
  const P2 = { pbt: 91500, dep: 26000, fin: 9000, inv: 14500, rec: 11200, pay: 6700, intPaid: 9000, taxPaid: 15400 };
  const gen2 = P2.pbt + P2.dep + P2.fin - P2.inv - P2.rec + P2.pay, op2 = gen2 - P2.intPaid - P2.taxPaid;
  const inv2 = -96000 + 9500, fin2 = -22000 - 16000, net2 = op2 + inv2 + fin2, close2 = 52000 + net2;
  chk(gen2, 107500); chk(op2, 83100); chk(inv2, -86500); chk(fin2, -38000); chk(net2, -41400); chk(close2, 10600);
  const tbl2 = table(["US\\$", "Amount"], [["Profit before tax (after finance costs of 9,000)", P2.pbt], ["Depreciation", P2.dep], ["Increase in inventories", P2.inv], ["Increase in trade receivables", P2.rec], ["Increase in trade payables", P2.pay], ["Interest paid", P2.intPaid], ["Tax paid", P2.taxPaid], ["Purchase of trucks", 96000], ["Proceeds of sale of an old truck", 9500], ["Repayment of a bank loan", 22000], ["Dividends paid", 16000], ["Cash at the start of the year", 52000]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Pfumo Transport Ltd is a fictional haulage company in Gweru. The data below are from its records for the year. The directors are satisfied with the profit but the bank manager has asked about the cash position.\n\n${tbl2}`,
    parts: [
      P.group({ label: "(a)", stem: "Using the indirect method, calculate:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: gen2, wrong: [P2.pbt + P2.dep - P2.inv - P2.rec + P2.pay, gen2 - 9000 - 15400], stem: "the cash generated from operations (before interest and tax paid);", explanation: "91,500 + 26,000 + 9,000 − 14,500 − 11,200 + 6,700 = US\\$107,500. The finance costs are added back because the interest paid is shown separately." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: op2, wrong: [gen2, gen2 - 9000], stem: "the net cash from operating activities.", explanation: "107,500 − 9,000 − 15,400 = US\\$83,100." }),
      ] }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: close2, wrong: [net2, 52000 + op2], stem: "Calculate the cash at the end of the year.", explanation: "Investing = −96,000 + 9,500 = −86,500. Financing = −22,000 − 16,000 = −38,000. Net change = 83,100 − 86,500 − 38,000 = −41,400. Closing cash = 52,000 − 41,400 = US\\$10,600." }),
      P.manual({ label: "(c)", marks: 3, stem: "Analyse why cash fell by US\\$41,400 although the company made a profit.", points: ["The company spent US\\$86,500 net on trucks, which is investing and not an expense", "It also repaid a loan of US\\$22,000 and paid dividends of US\\$16,000, which are financing outflows", "Inventories and receivables rose, tying up US\\$25,700, so operating cash was US\\$83,100 and not higher"], modelAnswer: "The company spent a net US\\$86,500 on trucks, which is an investing outflow and not an expense. It also repaid a loan of US\\$22,000 and paid dividends of US\\$16,000, which are financing outflows. In addition, inventories and receivables rose by US\\$25,700, tying up cash.", explanation: "Capital spending and financing outflows exceeded operating cash." }),
      P.manual({ label: "(d)", marks: 5, stem: "Evaluate whether the bank manager should be concerned about the cash position of the company.", points: ["Operating activities generated US\\$83,100, which is strong compared with the profit", "Cash fell mainly because of planned investment in trucks, which may increase future revenue", "Cash is down to US\\$10,600, much lower than the US\\$52,000 at the start, leaving a thin cushion", "The company repaid a loan and paid dividends, which it could reduce if cash is needed", "Judgement and reason, for example not seriously concerned if the trucks earn extra revenue, but should watch cash"], levels: [[3, 4, 5, "Uses figures from the statement to weigh strengths against the thin cash balance; a justified conclusion with a condition"], [2, 2, 3, "Explains some points with some figures; judgement weakly supported"], [1, 1, 1, "States a view with little support"]], modelAnswer: "Operating activities generated US\\$83,100, which is strong compared with the profit, and cash fell mainly because of planned investment in trucks that may increase revenue. However, cash is now only US\\$10,600 compared with US\\$52,000, which leaves a thin cushion. The company has also repaid a loan and paid dividends, which it could reduce if cash is needed. The bank manager need not be seriously concerned if the new trucks earn extra revenue, but should ask for a cash flow forecast and watch the position.", hints: ["Compare operating cash with the reasons for the fall."], explanation: "Strong operating cash and planned investment explain the fall; the thin balance needs watching." }),
    ],
    hints: ["Add back the finance costs, then deduct interest paid."],
    explanation: "Cash generated US\\$107,500; net operating US\\$83,100; closing cash US\\$10,600; planned investment explains the fall.",
  });

  b.card("DEFINITION", "Statement of cash flows", "A statement of the cash received and paid in a year, grouped into operating, investing and financing activities.");
  b.card("CONCEPT", "Three sections", "Operating: trading, interest and tax. Investing: non-current assets. Financing: shares, loans, dividends.");
  b.card("CONCEPT", "Direct method", "Lists cash received from customers and cash paid to suppliers, employees, interest and tax.");
  b.card("CONCEPT", "Indirect method", "Starts from profit before tax; adds back depreciation and finance costs; adjusts for changes in inventories, receivables and payables; then deducts interest and tax paid.");
  b.card("FORMULA", "Closing cash", "Opening cash + net cash from operating, investing and financing activities.");
  b.card("CONCEPT", "Working capital adjustments", "Increase in inventories or receivables: deduct. Increase in payables: add. Decreases: the opposite.");
  b.card("CONCEPT", "Why depreciation is added back", "It was deducted in arriving at profit but no cash was paid.");
  b.card("CONCEPT", "Profit is not cash", "Timing of credit sales, capital purchases, loan repayments and dividends all separate profit from cash.");
  b.card("CONCEPT", "Statement of cash flows and cash flow forecast", "The statement looks back at the year; the forecast looks ahead.");
});
