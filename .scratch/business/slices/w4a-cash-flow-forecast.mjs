// W4a: cash flow forecasts and cash budgets (BES Forms 2-3; CAM 5.2.1). Constructing a forecast is BES only.
import { concept, P, money, fmt, r2, cashFlow, table, BES } from "../lib.mjs";

concept("bus.finance.cash-flow-forecast", { file: "finance/cash-flow-forecast", keyPrefix: "finance.cash-flow-forecast" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a cash flow forecast show?",
    options: [
      ["Expected cash in, cash out and balances each month", "Correct: it predicts the cash position."],
      ["The profit or loss made in the past financial year", "That is shown by an income statement."],
      ["The value of the business's assets on one date", "That is a statement of financial position."],
      ["The daily share price of the company on the exchange", "Share prices are not part of a cash forecast."],
    ],
    answer: "A",
    explanation: "A forecast predicts cash in, cash out and closing balances, month by month.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a cash inflow?",
    options: [
      ["Cash received from credit customers", "Correct: money coming in."],
      ["Payment of wages", "An outflow."],
      ["Purchase of stock for cash", "An outflow."],
      ["Repayment of a bank loan", "An outflow."],
    ],
    answer: "A",
    explanation: "Inflows include cash sales, receipts from debtors, capital and loans received.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A month's closing balance is (650). What does this mean?",
    options: [
      ["The business expects to be overdrawn by US\\$650", "Correct: brackets show a negative balance."],
      ["The business expects a profit of US\\$650", "Cash balances are not profit."],
      ["The business has US\\$650 in the bank", "That would be shown without brackets."],
      ["Inflows were US\\$650 in the month", "The closing balance is not the total of inflows."],
    ],
    answer: "A",
    explanation: "A negative closing balance means an overdraft or other finance is needed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the opening balance for a month found?",
    options: [
      ["It equals the previous month's closing balance", "Correct: balances are carried forward."],
      ["It equals that month's total inflows", "Inflows are separate from the balance."],
      ["It equals that month's net cash flow", "Net cash flow is added to the opening balance."],
      ["It is always zero at the start of each month", "Balances carry forward."],
    ],
    answer: "A",
    explanation: "Closing balance this month = opening balance next month.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a credit sale made in March, with payment in May, recorded as an inflow in May?",
    options: [
      ["The cash is received in May", "Correct: forecasts record cash when it moves."],
      ["Credit sales are always delayed by two months by law", "Credit periods vary by agreement."],
      ["Sales in March are never recorded", "They are recorded when cash arrives."],
      ["May is the end of the financial year", "Timing of cash, not the year end, matters."],
    ],
    answer: "A",
    explanation: "Cash forecasts record cash when it is received or paid, not when the sale is made.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A forecast shows negative closing balances in two months, then positive balances. What is the most suitable action?",
    options: [
      ["Arrange an overdraft in advance for those months", "Correct: a short, temporary shortage suits an overdraft."],
      ["Issue new shares to the public to raise permanent capital", "Too costly and long-term for a short gap."],
      ["Take out a twenty-year mortgage", "A long-term loan is unsuited to a temporary shortage."],
      ["Close the business before the shortage begins", "The business recovers, so closure is unnecessary."],
    ],
    answer: "A",
    explanation: "Temporary shortages are best covered by flexible short-term finance.",
    hints: ["How long does the shortage last?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which is a limitation of a cash flow forecast?",
    options: [
      ["Its figures are estimates that may prove wrong", "Correct: sales and costs can differ from the forecast."],
      ["It cannot show negative balances", "Brackets show negative balances."],
      ["Banks never ask to see one", "Banks often ask for a forecast."],
      ["It shows only last year's cash flows", "It looks forward, not back."],
    ],
    answer: "A",
    explanation: "Forecasts depend on assumptions about sales, costs and timing.",
    hints: ["Can anyone know next month's sales for certain?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a bank ask a business owner for a cash flow forecast before lending?",
    options: [
      ["To see whether and when the loan can be repaid", "Correct: it shows future cash available for repayments."],
      ["To calculate the owner's income tax", "Tax is assessed by the tax authority."],
      ["To value the business's shares", "That is not the forecast's purpose."],
      ["To set the price of the business's products", "The bank does not set prices."],
    ],
    answer: "A",
    explanation: "A forecast shows the bank the borrower's expected ability to repay.",
  });
  // Net cash flow and closing balance (figures differ from the lesson).
  const ti = 4850, to = 5320, ob = 1180;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: ob + ti - to,
    stem: `In October a business expects total cash inflows of ${money(ti)} and total cash outflows of ${money(to)}. Its opening balance is ${money(ob)}. Calculate the closing balance.`,
    wrong: [ti - to, ob + ti + to],
    explanation: `Net cash flow = ${fmt(ti)} − ${fmt(to)} = (${fmt(to - ti)}); closing = ${fmt(ob)} − ${fmt(to - ti)} = ${money(ob + ti - to)}.`,
  });
  const ob2 = -620, net2 = 940;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ob2 + net2, daily: true,
    stem: `A forecast shows an opening balance of (${fmt(-ob2)}) and a net cash flow of ${money(net2)} for the month. Calculate the closing balance.`,
    wrong: [-ob2 + net2, net2],
    explanation: `−${fmt(-ob2)} + ${fmt(net2)} = ${money(ob2 + net2)}.`,
    workedSolution: `1. The opening balance is negative: −${fmt(-ob2)}.\n2. Closing = −${fmt(-ob2)} + ${fmt(net2)} = ${money(ob2 + net2)}.`,
    hints: ["Brackets mean a negative number."],
  });
  const cf = cashFlow({
    months: ["Jan", "Feb", "Mar"], opening: 260,
    inflows: [["Cash sales", [3950, 3150, 4400]], ["Receipts from debtors", [720, 850, 610]]],
    outflows: [["Purchases", [2650, 2450, 2900]], ["Wages", [880, 880, 950]], ["Rent and electricity", [520, 520, 540]], ["Loan repayment", [300, 300, 300]]],
    blanks: ["Net cash flow:1", "Opening balance:1", "Closing balance:1", "Closing balance:2", "Opening balance:2", "Net cash flow:2"],
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cf.closing[2],
    stem: `Complete the forecast to find the closing balance for March.\n\n${cf.md}`,
    wrong: [cf.net[2], r2(cf.closing[0] + cf.net[2])],
    explanation: `February: net ${fmt(cf.net[1])}, closing ${fmt(cf.closing[1])}. March: net ${fmt(cf.net[2])}, closing ${fmt(cf.closing[1])} + ${fmt(cf.net[2])} = ${money(cf.closing[2])}.`,
    workedSolution: `1. February net cash flow = ${fmt(cf.totalIn[1])} − ${fmt(cf.totalOut[1])} = ${fmt(cf.net[1])}.\n2. February closing = ${fmt(cf.closing[0])} + (${fmt(cf.net[1])}) = ${fmt(cf.closing[1])}.\n3. March net cash flow = ${fmt(cf.totalIn[2])} − ${fmt(cf.totalOut[2])} = ${fmt(cf.net[2])}.\n4. March closing = ${fmt(cf.closing[1])} + ${fmt(cf.net[2])} = ${money(cf.closing[2])}.`,
    hints: ["Work month by month.", "February's closing balance is March's opening balance."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business that makes a profit can still run short of cash.",
    answer: true,
    explanation: "True. Profit may be tied up in stock and debtors, or cash spent on equipment.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Changing the sales figure for one month affects the closing balances of all later months.",
    answer: true,
    explanation: "True. The change alters that month's closing balance, which is carried forward.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each item in a cash flow forecast.",
    pairs: ["Owner puts in extra capital", "Payment for a new oven", "Bank loan received", "Monthly rent paid"],
    right: ["Cash inflow", "Cash outflow"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Money in is an inflow; money out is an outflow.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulae.",
    template: "Net cash flow = total inflows − total {{blank:a}}. Closing balance = {{blank:b}} balance + net cash flow.",
    blanks: [
      { id: "a", accepted: ["outflows"], choices: ["outflows", "profits", "assets", "sales"] },
      { id: "b", accepted: ["opening"], choices: ["opening", "closing", "average", "profit"] },
    ],
    explanation: "These two lines drive every forecast.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a business should prepare a cash flow forecast.",
    points: [
      "Shows months when cash will be short (1)",
      "So finance such as an overdraft can be arranged in advance (1)",
      "Supports a loan application / helps control spending / plans use of surpluses (1)",
      "Explained, e.g. the bank sees when repayments can be made (1)",
    ],
    modelAnswer: "A forecast shows in advance which months will be short of cash, so the owner can arrange an overdraft before the problem arises. It also supports a loan application, because the bank can see when the business will have cash to make repayments.",
    explanation: "Planning, finance and control.",
    hints: ["What can the owner do once a shortage is spotted early?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why a cash flow forecast may turn out to be inaccurate.",
    points: [
      "Sales may be lower or higher than expected (1)",
      "e.g. a new competitor or seasonal change (1)",
      "Costs may change / customers may pay late / unexpected expenses (1)",
      "e.g. fuel or electricity prices rise; machine breaks down (1)",
    ],
    modelAnswer: "Sales are only estimates, so a new competitor opening nearby could make them much lower than forecast. Costs can also change unexpectedly, for example if electricity prices rise or a machine breaks down and must be repaired.",
    explanation: "Forecasts rely on assumptions about the future.",
    hints: ["Which figures are guesses?"],
  });
  // BES: prepare a simple cash budget.
  const cb = cashFlow({
    months: ["April", "May", "June"], opening: 300,
    inflows: [["Cash sales", [1850, 2150, 1530]]],
    outflows: [["Materials", [700, 820, 650]], ["Wages", [500, 500, 500]], ["Rent", [250, 250, 250]], ["Sewing machine", [0, 0, 640]]],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 900, calculator: true, applies: BES,
    stem: `Chipo starts a dressmaking enterprise in Masvingo on 1 April with ${money(300)} in the bank. She expects:\n\n- cash sales: April ${money(1850)}, May ${money(2150)}, June ${money(1530)};\n- materials: April ${money(700)}, May ${money(820)}, June ${money(650)};\n- wages of ${money(500)} and rent of ${money(250)} every month;\n- a second-hand sewing machine for ${money(640)}, paid in June.\n\nPrepare her cash budget for April to June by answering the parts below.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cb.net[0], stem: "Calculate the net cash flow for April.", wrong: [cb.totalIn[0]], explanation: `${fmt(cb.totalIn[0])} − ${fmt(cb.totalOut[0])} = ${money(cb.net[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cb.closing[0], stem: "Calculate the closing balance for April.", wrong: [cb.net[0]], explanation: `${fmt(300)} + ${fmt(cb.net[0])} = ${money(cb.closing[0])}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cb.closing[1], stem: "Calculate the closing balance for May.", wrong: [cb.net[1]], explanation: `${fmt(cb.closing[0])} + ${fmt(cb.net[1])} = ${money(cb.closing[1])}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: Math.abs(cb.net[2]), stem: "June has a net cash outflow. Calculate its size.", wrong: [cb.totalOut[2]], explanation: `Outflows ${fmt(cb.totalOut[2])} − inflows ${fmt(cb.totalIn[2])} = ${money(Math.abs(cb.net[2]))} net outflow.` }),
      P.num({ label: "(e)", marks: 1, kind: "money", value: cb.closing[2], stem: "Calculate the closing balance for June.", wrong: [cb.closing[1]], explanation: `${fmt(cb.closing[1])} − ${fmt(Math.abs(cb.net[2]))} = ${money(cb.closing[2])}.` }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Comment on Chipo's cash position over the three months.",
        points: ["Positive balance every month (1)", "June outflow caused by the machine and lower sales (1)", "Balance still positive, so no overdraft needed / small cushion, so keep a reserve (1)"],
      }),
    ],
    explanation: `Net cash flows ${cb.net.map(fmt).join(", ")}; closing balances ${cb.closing.map(fmt).join(", ")}.\n\n${cb.md}`,
    hints: ["Total the outflows for each month first.", "Carry each closing balance forward as the next opening balance."],
  });
  const base = cashFlow({
    months: ["Oct", "Nov", "Dec"], opening: 1010,
    inflows: [["Cash sales", [5200, 5600, 8200]]],
    outflows: [["Stock", [3600, 3900, 5100]], ["Wages and rent", [1750, 1750, 1750]], ["Delivery van deposit", [0, 1500, 0]]],
  });
  const amended = cashFlow({
    months: ["Oct", "Nov", "Dec"], opening: 1010,
    inflows: [["Cash sales", [5200, r2(5600 * 0.9), 8200]]],
    outflows: [["Stock", [3600, 3900, 5100]], ["Wages and rent", [1750, 1750, 1750]], ["Delivery van deposit", [0, 1500, 0]]],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Sipho owns a grocery shop in Bulawayo. His cash flow forecast is:\n\n${base.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: Math.abs(base.closing[1]), stem: "By how much is Sipho expected to be overdrawn at the end of November?", wrong: [Math.abs(base.net[1])], explanation: `The November closing balance is (${fmt(Math.abs(base.closing[1]))}).` }),
      P.num({
        label: "(b)", marks: 3, kind: "money", value: Math.abs(amended.closing[2]), type: "CALCULATION",
        stem: "Sipho now expects November cash sales to be 10% lower than forecast. Calculate the new closing balance for December and state whether it is positive or negative (enter the amount only).",
        wrong: [Math.abs(base.closing[2])],
        explanation: `November sales = ${fmt(r2(5600 * 0.9))}; November net = ${fmt(amended.net[1])}; closing ${fmt(amended.closing[1])}; December closing = ${fmt(amended.closing[1])} + ${fmt(amended.net[2])} = ${fmt(amended.closing[2])}.`,
        workedSolution: `1. New November sales = 5,600 × 0.9 = ${fmt(r2(5600 * 0.9))}.\n2. November net cash flow = ${fmt(amended.totalIn[1])} − ${fmt(amended.totalOut[1])} = ${fmt(amended.net[1])}.\n3. November closing = ${fmt(amended.closing[0])} + (${fmt(amended.net[1])}) = ${fmt(amended.closing[1])}.\n4. December closing = ${fmt(amended.closing[1])} + ${fmt(amended.net[2])} = ${fmt(amended.closing[2])}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Identify the main cause of the cash shortage in November.",
        points: ["Delivery van deposit (1)", "Paid in a month when sales are not yet at the December peak (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend **one** way Sipho should deal with the November shortage. Justify your answer.",
        points: ["Option, e.g. arrange an overdraft / delay the van deposit to December / ask supplier for longer credit (1)", "Shortage is temporary: December sales restore a positive balance (1)", "Compare with an alternative and its drawback (1)", "Justified recommendation (1)"],
      }),
    ],
    explanation: `Original November closing ${fmt(base.closing[1])}; with 10% lower November sales the December closing becomes ${fmt(amended.closing[2])}. The van deposit causes a temporary shortage.`,
    hints: ["Brackets mean negative.", "Recalculate November first, then carry the balance forward."],
  });
  b.card("DEFINITION", "Cash flow forecast (cash budget)", "Estimate of future cash inflows and outflows, month by month, with expected closing balances.");
  b.card("FORMULA", "Net cash flow", "Net cash flow = total cash inflows − total cash outflows.");
  b.card("FORMULA", "Closing balance", "Closing balance = opening balance + net cash flow; it becomes next month's opening balance.");
  b.card("CONCEPT", "Typical inflows and outflows", "In: cash sales, receipts from debtors, capital, loans. Out: purchases, wages, rent, bills, loan repayments, equipment.");
  b.card("CONCEPT", "Uses of a cash flow forecast", "Spot shortages early, arrange finance, support loan applications, control spending, plan surpluses.");
  b.card("CONCEPT", "Cash is not profit", "Credit sales add to profit before cash arrives; buying equipment uses cash but is not a full expense this year.");
  b.card("CONCEPT", "Limitations of forecasts", "Estimates can be wrong: sales, costs, late payments and unexpected events change the figures.");
  b.card("FACT", "Board difference", "Cambridge 0264 does not assess constructing a forecast; BES learners prepare simple cash budgets.");
});
