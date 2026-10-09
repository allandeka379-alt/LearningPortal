// W4a: ZIMSEC Business Enterprise and Skills exam-format items: 2 × 20-mark Paper 2 Section B essays and
// 1 × 17-mark Paper 1 structured question. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, f, money, fmt, sum, cashFlow, table, BES } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced evaluation of each source, well developed and applied, with a justified conclusion."], [2, 5, 8, "Some evaluation, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points, little explanation, no conclusion."]];

concept("bus.finance.sources", { file: "exam/w4a-bes", keyPrefix: "exam.w4a-bes", applies: BES }, (b) => {
  // Essay 1 (20 marks): the need for finance and sources of finance for a small enterprise.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.need-for-finance", "bus.finance.sources"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain **four** reasons why an enterprise needs finance.",
        points: [
          ["Start-up capital: premises, equipment, opening stock before any sales", 2],
          ["Expansion: new branches, machinery, larger premises", 2],
          ["Replacing worn-out or outdated non-current assets / new technology", 2],
          ["Working capital: stock, wages and bills while waiting for customers to pay", 2],
        ],
        levels: L8,
        modelAnswer: "A new enterprise needs start-up capital to buy equipment, pay a rent deposit and buy opening stock before it makes any sales. As it grows it needs finance for expansion, such as a second outlet or more machinery, because these costs are paid long before the extra sales arrive. Machines and vehicles wear out or become outdated, so finance is needed to replace them or to adopt new technology that cuts costs. Finally, every enterprise needs working capital to buy stock and pay wages, rent and electricity while it waits for credit customers to pay.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "Evaluate **three** sources of finance available to a small enterprise owned by one person that wants to buy new equipment.",
        points: [
          "Owner's savings / retained profit: no interest, no loss of control (1)",
          "But limited amount; owner's personal risk / less reserve (1)",
          "Bank loan: larger sum, repayments spread over the equipment's life (1)",
          "But interest, collateral needed, repaid even if sales fall (1)",
          "Hire purchase / leasing: equipment used at once; HP equipment is its own security (1)",
          "But costs more than the cash price / never owned (lease) / repossession (1)",
          "Microfinance / family and friends / grants as alternatives, with a drawback (1)",
          "Cannot issue shares as a sole trader (1)",
          "Matches long-term need with long-term source (1)",
          "Applies to the size and age of the enterprise (1)",
          ["Justified conclusion recommending a source", 2],
        ],
        levels: L12,
        modelAnswer: "The owner could use savings or retained profit. These cost no interest and the owner keeps full control, but the amount is limited and using it may leave no reserve for emergencies. A bank loan could provide a larger sum, with repayments spread over the years the equipment is used, but the enterprise must pay interest, may need collateral and must repay even if sales fall. Hire purchase lets the enterprise use the equipment at once and uses the equipment itself as security, which suits a small business with few assets, but the total cost is higher than the cash price and the equipment can be repossessed if payments stop; leasing avoids a large outlay but the equipment is never owned. Because the owner is a sole trader, shares cannot be issued. As the equipment is a long-term asset, a long-term source is needed. I recommend hire purchase for an enterprise without collateral, combined with some retained profit as the deposit; an established enterprise with a good record and security should use a bank loan, which is usually cheaper.",
      }),
    ],
    explanation: "(a) Start-up, expansion, replacement and technology, working capital. (b) Savings and retained profit, bank loan, HP or leasing, each weighed; justified recommendation.",
    hints: ["(a) Think of each stage of an enterprise's life.", "(b) Sole traders cannot issue shares."],
  });

  // Essay 2 (20 marks): securing investors and managing working capital.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.finance.securing-investors", "bus.finance.working-capital"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe how an enterprise can secure investors.",
        points: [
          ["Sound business plan: market research, forecasts, use of funds, expected return", 2],
          ["Good corporate governance: accurate records, separate accounts, transparency, compliance", 2],
          ["Track record: profitable trading, loans repaid, promises kept", 2],
          ["Reputable brand: quality, honesty, loyal customers", 2],
          ["Favourable policy environment / incentives used; security or attractive share of profit offered", 2],
        ],
        levels: L10,
        modelAnswer: "An enterprise secures investors first with a sound business plan that shows, through market research, that customers want the product, and sets out forecasts of sales, costs and profit, how the money will be used and what the investor will earn. Good corporate governance builds trust: accurate, audited records, a separate business bank account, regular honest reports and compliance with tax and registration laws. A track record of profitable trading and loans repaid on time shows that the owners keep their promises, while a reputable brand with loyal customers makes future sales steadier and lowers risk. Finally, an enterprise can operate in sectors where government policy is stable and supportive, use incentives such as tax relief, and offer investors security or an attractive share of profits.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "\"Managing working capital is more important than making a profit for a small enterprise.\" Discuss.",
        points: [
          "Working capital = current assets − current liabilities; measures liquidity (1)",
          "Without it the enterprise cannot pay suppliers, wages and bills (1)",
          "Creditors may force closure even if the enterprise is profitable (1)",
          "Small enterprises have little access to overdrafts, so liquidity is vital (1)",
          "Too much working capital also wastes resources: idle stock, cash, debts (1)",
          "But profit is needed for survival in the long run / to reward owners (1)",
          "Profit (retained) adds to working capital and attracts lenders and investors (1)",
          "Both are linked: good working capital management supports profit (1)",
          ["Justified conclusion", 2],
        ],
        levels: L10,
        modelAnswer: "Working capital, current assets minus current liabilities, measures whether an enterprise can pay its short-term debts. A small enterprise that cannot pay suppliers, wages or rent loses credit and staff, and creditors may force it to close even if it is profitable on paper; small enterprises often cannot borrow easily, so liquidity is critical in the short run. Too much working capital is also wasteful, because cash is idle in stock and debtors. On the other hand, an enterprise that never makes a profit will eventually run out of cash and cannot reward its owners, and retained profit is a key source of working capital that also attracts lenders and investors. The two are therefore linked. In the short run, managing working capital is more urgent because it decides survival from month to month, but in the long run profit is essential; a well-run enterprise must manage both.",
      }),
    ],
    explanation: "(a) Business plan, governance, track record, brand, policy and incentives. (b) Liquidity decides short-run survival; profit decides long-run success; justified conclusion.",
    hints: ["(a) What does an investor need to trust you?", "(b) Can a profitable business close?"],
  });

  // 17 marks: Paper 1 structured question on a cash budget and working capital.
  const cf = cashFlow({
    months: ["Jan", "Feb", "Mar"], opening: 420,
    inflows: [["Cash sales", [2380, 1640, 2790]], ["Loan received", [0, 1250, 0]]],
    outflows: [["Fabric and thread", [930, 830, 1160]], ["Wages", [690, 690, 690]], ["Rent", [310, 310, 310]], ["Embroidery machine", [0, 1780, 0]]],
    blanks: ["Net cash flow:1", "Closing balance:1", "Opening balance:2", "Closing balance:2"],
  });
  const ca = [["Inventory of fabric", 1930], ["Trade receivables (schools)", 1380], ["Cash at bank", Math.max(cf.closing[2], 0)]];
  const cl = [["Trade payables", 1690], ["Bank overdraft", 0]];
  const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1080, calculator: true, paper: "Paper 1",
    concepts: ["bus.finance.cash-flow-forecast", "bus.finance.working-capital", "bus.finance.sources"],
    stem: `Nyasha runs a school-uniform enterprise in Mutare. In February she will buy an embroidery machine, partly financed by a loan from a microfinance institution. Her cash budget is:\n\n${cf.md}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: Math.abs(cf.net[1]), stem: "February has a net cash outflow. Calculate its size.", wrong: [cf.totalOut[1]], explanation: `Outflows ${fmt(cf.totalOut[1])} − inflows ${fmt(cf.totalIn[1])} = ${money(Math.abs(cf.net[1]))}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cf.closing[1], stem: "Calculate the closing balance for February.", wrong: [cf.closing[0]], explanation: `${fmt(cf.closing[0])} − ${fmt(Math.abs(cf.net[1]))} = ${money(cf.closing[1])}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cf.closing[2], stem: "Calculate the closing balance for March.", wrong: [cf.net[2]], explanation: `${fmt(cf.closing[1])} + ${fmt(cf.net[2])} = ${money(cf.closing[2])}.` }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: f.workingCapital(tca, tcl), type: "CALCULATION",
        stem: `At the end of March Nyasha expects inventory of ${money(ca[0][1])}, trade receivables of ${money(ca[1][1])}, the March closing cash balance in the bank, and trade payables of ${money(cl[0][1])}. Calculate her working capital.`,
        wrong: [tca],
        explanation: `${fmt(ca[0][1])} + ${fmt(ca[1][1])} + ${fmt(ca[2][1])} − ${fmt(cl[0][1])} = ${money(f.workingCapital(tca, tcl))}.`,
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "State **two** other sources of finance Nyasha could have used for the machine.",
        points: ["Hire purchase / leasing (1)", "Retained profit / own savings / bank loan / family (1)"],
      }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Explain **one** advantage and **one** disadvantage of the microfinance loan for Nyasha.",
        points: ["Advantage: available without collateral to a small enterprise (1)", "Developed: lets her buy the machine now and grow sales (1)", "Disadvantage: high interest / short repayment period strains cash (1)"],
      }),
      P.manual({
        label: "(g)", marks: 4,
        stem: "Recommend **two** actions Nyasha could take to improve her cash position. Justify your recommendations.",
        points: ["Action, e.g. collect payment from schools sooner / deposits on orders (1)", "Justified: cash arrives before fabric must be paid for (1)", "Action, e.g. hold less fabric stock / negotiate longer supplier credit (1)", "Justified: less cash tied up; supports a low March balance (1)"],
      }),
    ],
    explanation: `February net outflow ${money(Math.abs(cf.net[1]))}; closing balances ${cf.closing.map(fmt).join(", ")}; working capital ${money(f.workingCapital(tca, tcl))}.`,
    hints: ["Each month's opening balance is the previous month's closing balance.", "Working capital = current assets − current liabilities."],
  });
});
