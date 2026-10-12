// W4b: budget.cash-budget
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.budget.cash-budget", { file: "budget/cash-budget", keyPrefix: "budget.cash-budget" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which item is NOT included in a cash budget?",
    ok: ["Depreciation of equipment", "Correct: it is a non-cash expense."],
    bad: [["Purchase of a delivery van for cash", "A cash payment, so it is included."], ["Wages paid in the month", "A cash payment, so it is included."], ["Drawings by the owner", "A cash payment, so it is included."]],
    explanation: "Depreciation does not involve a payment, so it is excluded.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Credit sales of US\\$6,000 are made in April and customers pay one month later. In which month does the cash budget show the receipt?",
    ok: ["May", "Correct: cash arrives a month after the sale."],
    bad: [["April", "The sale is made in April but the cash is not yet received."], ["June", "That would be two months' credit."], ["It is not shown, because credit sales are not cash", "They are shown when the cash is received."]],
    explanation: "A cash budget shows cash when it moves: here in May.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the closing bank balance for a month calculated?",
    ok: ["Opening balance + receipts - payments", "Correct: it is the opening balance adjusted by the net cash flow."],
    bad: [["Opening balance + profit for the month", "Profit is not the same as cash flow."], ["Receipts - payments only", "The opening balance must be included."], ["Opening balance - receipts + payments", "The signs are reversed."]],
    explanation: "Closing balance = opening balance + receipts - payments.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A customer pays within the month and takes a 4% discount on an invoice of US\\$2,500. What amount appears as a receipt in the cash budget?",
    ok: ["US\\$2,400", "Correct: 2,500 less 4% (US\\$100)."],
    bad: [["US\\$2,500", "The discount has been ignored."], ["US\\$2,600", "The discount has been added."], ["US\\$100", "That is the discount, not the receipt."]],
    hints: ["Cash received = invoice - discount."],
    explanation: "2,500 × 96% = US\\$2,400.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A bank loan of US\\$10,000 is received in July. How is it shown in the cash budget?",
    ok: ["As a receipt in July", "Correct: cash comes in, though it is not income."],
    bad: [["As a reduction of expenses in July", "A loan is a receipt, not a reduction of costs."], ["It is excluded, because a loan is not income", "Cash from a loan is a receipt even though it is not income."], ["As sales revenue", "A loan is not sales."]],
    hints: ["The question is about cash, not profit."],
    explanation: "All cash received, including loans and capital, is shown in the month it arrives.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "A cash budget shows an overdraft in September caused by a large dividend. Which action is MOST appropriate?",
    ok: ["Delay or reduce the dividend", "Correct: the shortage is caused by that payment."],
    bad: [["Buy extra inventory to use up the cash", "Buying inventory worsens the shortage."], ["Ignore the forecast because it is only an estimate", "Forecasts are made to be acted on."], ["Pay all suppliers early", "This increases the deficit."]],
    hints: ["Look at the cause of the deficit."],
    explanation: "Attack the cause of the shortage: delay or reduce the payment that creates it.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Customers who used to pay after 30 days begin to pay after 60 days. What is the effect on the cash budget?",
    ok: ["Receipts fall in the early months and the bank balance is lower", "Correct: cash arrives later."],
    bad: [["Profit falls by an equal amount in each of the early months of the year", "Profit is unchanged; only the timing of cash changes."], ["Receipts rise in the early months because of the longer credit", "Longer credit delays receipts."], ["The cash budget is unaffected", "Credit terms are a key input."]],
    hints: ["Think about when cash arrives."],
    explanation: "Longer credit delays receipts, so the early months show lower balances or overdrafts.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A business can be profitable and still have a cash shortage.", answer: true, explanation: "True. Profit includes sales not yet collected and excludes capital spending and loan repayments." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Depreciation is shown in the payments section of a cash budget because it is an expense.", answer: false, hints: ["Is any cash paid?"], explanation: "False. Depreciation involves no payment, so it is left out." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item to its place in the cash budget.",
    pairs: ["Cash sales", "Equipment bought for cash", "Bank loan received", "Depreciation"],
    right: ["Receipt in the month of sale", "Payment in the month paid", "Receipt in the month received", "Not shown"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Only items that move cash are shown, in the month they move.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "An overdraft is shown in {{blank:a}} in the closing balance row. The closing balance of one month becomes the {{blank:b}} balance of the next.",
    blanks: [{ id: "a", accepted: ["brackets"], choices: ["brackets", "capital letters", "red ink only"] }, { id: "b", accepted: ["opening"], choices: ["opening", "closing", "average"] }],
    explanation: "Brackets mean a negative balance, and balances carry forward.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Give one example of a non-cash item that is excluded from a cash budget.", accepted: ["depreciation", "allowance for irrecoverable debts", "provision for doubtful debts", "allowance for doubtful debts", "profit on disposal"], explanation: "Depreciation is the usual example." });

  {
    const credit = 30000, prompt = 0.5, disc = 0.04, prev = 24000;
    const cash = r2(prompt * credit * (1 - disc) + (1 - prompt) * prev);
    chk(cash, 26400);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: cash, calculator: true, wrong: [credit, r2(prompt * credit + (1 - prompt) * prev)],
      stem: `A Gweru wholesaler has sales of ${usd(prev)} in October and ${usd(credit)} in November. Half of the customers pay in the month of sale and take a 4% discount; the other half pay in the following month with no discount. Calculate the cash received from customers in November.`,
      hints: ["Prompt payers this month, late payers from last month."],
      explanation: `Prompt payers: 50% × ${F(credit)} × 96% = ${F(credit * prompt * (1 - disc))}. Late payers from October: 50% × ${F(prev)} = ${F(prev * 0.5)}. Total ${usd(cash)}. Ignoring the discount gives ${usd(credit * prompt + prev * 0.5)}.` });
  }
  {
    const open = 4200, rec = 18500, pay = 21700;
    const close = open + rec - pay;
    chk(close, 1000);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: close, calculator: true, wrong: [rec - pay, open + rec + pay],
      stem: `A market vendor in Harare starts May with a bank balance of ${usd(open)}. Budgeted receipts are ${usd(rec)} and budgeted payments are ${usd(pay)}. Calculate the closing bank balance for May.`,
      hints: ["Opening + receipts - payments."],
      explanation: `${F(open)} + ${F(rec)} - ${F(pay)} = ${usd(close)}. Leaving out the opening balance gives an overdraft of ${usd(pay - rec)}.` });
  }
  {
    const wages = 3600, rent = 1100, dep = 800, drawings = 1400, purchases = 9800;
    const pay = wages + rent + drawings + purchases;
    chk(pay, 15900);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: pay, calculator: true, wrong: [pay + dep, wages + rent + purchases],
      stem: `A Mutare hardware shop pays wages of ${usd(wages)}, rent of ${usd(rent)} and drawings of ${usd(drawings)} in September, and pays suppliers ${usd(purchases)} for August's purchases. Depreciation for the month is ${usd(dep)}. Calculate the total payments in the cash budget for September.`,
      hints: ["Which items involve cash?"],
      explanation: `${F(wages)} + ${F(rent)} + ${F(drawings)} + ${F(purchases)} = ${usd(pay)}. Including depreciation (${usd(pay + dep)}) would be wrong because no cash is paid.` });
  }
  {
    const open = 2500, flows = [3100, -4200, -2900];
    let bal = open;
    let first = null;
    flows.forEach((f, i) => { bal += f; if (bal < 0 && first === null) first = i; });
    chk(bal, -1500); chk(first, 2);
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(bal), calculator: true, wrong: [flows.reduce((s, x) => s + x, 0) * -1 + 0, 2900],
      stem: `A bakery in Bulawayo has a bank balance of ${usd(open)} on 1 July. The net cash flows are: July US\\$3,100 inflow; August US\\$4,200 outflow; September US\\$2,900 outflow. Calculate the overdraft at 30 September (amount only).`,
      hints: ["Carry the balance forward month by month."],
      explanation: `July: 2,500 + 3,100 = 5,600. August: 5,600 - 4,200 = 1,400. September: 1,400 - 2,900 = -1,500, an overdraft of ${usd(Math.abs(bal))}. Adding the net outflows without the opening balance gives ${usd(4000)}.` });
  }
  {
    const sales = 15000, cashPct = 0.35;
    const rec = r2(sales * cashPct);
    chk(rec, 5250);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: rec, calculator: true, wrong: [r2(sales * (1 - cashPct)), sales],
      stem: `A shop expects sales of ${usd(sales)} in a month, of which 35% are for cash. How much cash is received from sales in the month of sale?`,
      explanation: `35% × ${F(sales)} = ${usd(rec)}. The rest (${usd(sales * (1 - cashPct))}) is collected later.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why depreciation is not included in a cash budget.",
    points: ["Depreciation is an accounting charge that spreads the cost of an asset over its life", "No cash is paid when depreciation is recorded", "The cash was paid when the asset was bought, which is shown as a payment in that month"],
    modelAnswer: "Depreciation spreads the cost of an asset but no cash is paid when it is charged. The cash outflow occurs when the asset is bought, so only that payment is shown.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Give two ways in which a business could improve a forecast cash deficit in the next quarter and explain a drawback of each.",
    points: ["Delay a large payment such as a dividend, drawings or equipment", "Drawback: a delay may upset suppliers, owners or staff, or postpone growth", "Offer discounts for prompt payment or chase late customers", "Drawback: discounts reduce income and chasing may damage customer relations"],
    modelAnswer: "The business could delay a large payment, but suppliers or owners may be unhappy. It could offer a discount for prompt payment, but this reduces its income.",
    hints: ["Give a method and a cost for each."],
    explanation: "One mark for each action and one for each drawback.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A business is profitable but its cash budget shows overdrafts in four months of the year. Evaluate whether the owner should be worried.",
    points: ["Overdrafts cost interest and the bank may refuse or withdraw the facility", "The causes may be temporary (a seasonal peak, one-off equipment) rather than a permanent weakness", "Profit is a good sign but cash is needed to pay bills on time", "A judgement: not worried if the overdraft is short, agreed in advance and caused by timing; worried if it is rising and caused by over-trading or long credit"],
    modelAnswer: "Interest is a cost and the bank could withdraw the facility. If the overdrafts come from seasonal timing and are agreed in advance, the position is manageable, but if they are growing because of over-trading or slow customers the owner should act.",
    hints: ["Consider causes and the size of the shortage."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const sales = { mar: 12000, apr: 13000, may: 14500, jun: 15500 };
    const pur = { mar: 7500, apr: 8400, may: 9100 };
    const exp = 3100, dep = 450, draw = 1200, fridge = 5500, open = 1800, cashPct = 0.2;
    const rec = { apr: sales.apr * cashPct + sales.mar * (1 - cashPct), may: sales.may * cashPct + sales.apr * (1 - cashPct), jun: sales.jun * cashPct + sales.may * (1 - cashPct) };
    chk(rec.may, 13300);
    const pay = { apr: pur.mar + exp + draw, may: pur.apr + exp + draw + fridge, jun: pur.may + exp + draw };
    chk(pay.may, 18200);
    const cl = { apr: open + rec.apr - pay.apr };
    cl.may = cl.apr + rec.may - pay.may;
    cl.jun = cl.may + rec.jun - pay.jun;
    chk(cl.apr, 2200); chk(cl.may, -2700); chk(cl.jun, -1400);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Nyasha Tuck Shop in Masvingo budgets sales of ${usd(sales.mar)} for March, ${usd(sales.apr)} for April, ${usd(sales.may)} for May and ${usd(sales.jun)} for June. 20% of sales are for cash and 80% are on credit, collected in the month after the sale. Purchases are ${usd(pur.mar)} (March), ${usd(pur.apr)} (April) and ${usd(pur.may)} (May), paid in the month after purchase. Expenses of ${usd(exp)} a month are paid in cash. Depreciation is ${usd(dep)} a month. Drawings are ${usd(draw)} a month. A fridge costing ${usd(fridge)} is bought and paid for in May. The bank balance on 1 April is ${usd(open)} (in credit).`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: rec.may, wrong: [sales.may, r2(sales.may * 0.8 + sales.apr * 0.2)], stem: "Calculate the cash received from customers in May.", explanation: `Cash sales 20% × ${F(sales.may)} = ${F(sales.may * cashPct)}; April credit sales 80% × ${F(sales.apr)} = ${F(sales.apr * 0.8)}. Total ${usd(rec.may)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: pay.may, wrong: [pay.may + dep, pay.may - fridge], stem: "Calculate the total payments in May.", explanation: `Purchases (April) ${F(pur.apr)} + expenses ${F(exp)} + drawings ${F(draw)} + fridge ${F(fridge)} = ${usd(pay.may)}. Depreciation is not a payment.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(cl.may), wrong: [cl.apr, pay.may - rec.may], stem: "Calculate the overdraft at 31 May (amount only).", explanation: `April closing ${F(cl.apr)} + May receipts ${F(rec.may)} - May payments ${F(pay.may)} = -${F(Math.abs(cl.may))}: an overdraft of ${usd(Math.abs(cl.may))}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: Math.abs(cl.jun), wrong: [rec.jun - pay.jun, Math.abs(cl.may)], stem: "Calculate the overdraft at 30 June (amount only).", explanation: `June receipts ${F(rec.jun)} - payments ${F(pay.jun)} = ${F(rec.jun - pay.jun)}. ${F(cl.may)} + ${F(rec.jun - pay.jun)} = -${F(Math.abs(cl.jun))}: an overdraft of ${usd(Math.abs(cl.jun))}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which item is left out of the cash budget?", options: [["Depreciation of US\\$450 a month", "Correct: no cash is paid."], ["The fridge of US\\$5,500 bought in May", "Cash is paid in May, so it is included."], ["Drawings of US\\$1,200", "Cash drawn by the owner is included."], ["Payments to suppliers", "They are included in the month paid."]], answer: "A", explanation: "Depreciation is a non-cash expense." }),
        P.manual({ label: "(f)", marks: 3, stem: "Advise the owner on how to deal with the overdraft in May and June.", points: ["The overdraft is caused by buying the fridge for cash in May (US\\$5,500)", "Options: arrange an overdraft or a loan, or lease or buy the fridge on instalments", "Reduce drawings or delay the fridge purchase until the balance is higher"], modelAnswer: "The overdraft arises in May because the fridge is paid for in cash. The owner could ask the bank for a short overdraft, buy the fridge on instalments, or reduce drawings for a few months.", explanation: "One mark for each point." }),
      ],
      hints: ["Customers pay a month late.", "Carry each closing balance forward."],
      explanation: "This item prepares and interprets a cash budget for three months.",
    });
  }

  // Struct 2 (8 marks): discount proposal
  {
    const sales = 40000, p = 0.5, d = 0.04;
    const first = r2(p * sales * (1 - d));
    const cost = r2(p * sales * d);
    chk(first, 19200); chk(cost, 800);
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: `A Harare stationery wholesaler has credit sales of ${usd(sales)} every month. At present all customers pay in the month after the sale. The owner is considering a 4% discount to customers who pay in the month of sale. She expects half of the customers to take the offer.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: first, wrong: [r2(p * sales), r2(sales * (1 - d))], stem: "Calculate the cash received from customers in the month of sale under the proposal.", explanation: `50% × ${F(sales)} × 96% = ${usd(first)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: cost, wrong: [r2(sales * d), first], stem: "Calculate the monthly cost of the discount.", explanation: `50% × ${F(sales)} × 4% = ${usd(cost)}.` }),
        P.manual({ label: "(c)", marks: 4, stem: "Evaluate whether the owner should introduce the discount.", points: ["Cash is received one month earlier from half the customers, improving the bank balance and reducing any overdraft interest", "The discount costs US\\$800 a month (US\\$9,600 a year), which reduces profit", "Compare the cost with the interest saved (4% for one month is a high price for a month's credit)", "Judgement: only worthwhile if the business has a serious cash shortage or expensive borrowing; otherwise a smaller discount or chasing customers may be better"], modelAnswer: "The discount brings forward half the receipts by a month, but costs US\\$800 a month. A 4% discount for one month's earlier payment is expensive compared with overdraft interest, so it is worthwhile only if cash is very short.", hints: ["Compare the discount cost with the benefit of earlier cash."], explanation: "One mark for each point." }),
      ],
      hints: ["Apply the discount only to the customers who pay promptly."],
      explanation: "This item tests the effect and the cost of a cash discount.",
    });
  }

  b.card("DEFINITION", "Cash budget", "A month-by-month forecast of cash receipts and payments and the closing bank balance.");
  b.card("FORMULA", "Closing bank balance", "Opening balance + receipts - payments; it is the next month's opening balance.");
  b.card("CONCEPT", "Non-cash items", "Depreciation, allowances for irrecoverable debts and profit on disposal are excluded from the cash budget.");
  b.card("CONCEPT", "Capital items in a cash budget", "Equipment, loans received and repaid, drawings, dividends and tax are included in the month the cash moves.");
  b.card("CONCEPT", "Receipts on credit sales", "Shown in the month the customer pays (for example one month after the sale), less any discount taken.");
  b.card("CONCEPT", "Cash discounts in the cash budget", "Receipts and payments are shown net of the discount that is taken.");
  b.card("CONCEPT", "Dealing with a cash deficit", "Arrange an overdraft; delay payments; speed up receipts; lease instead of buy; reduce drawings or dividends.");
  b.card("CONCEPT", "Dealing with a cash surplus", "Pay suppliers early for discounts, repay loans or invest short term.");
  b.card("CONCEPT", "Profit v cash", "A profitable business can run out of cash because of credit, capital spending and loan repayments.");
});
