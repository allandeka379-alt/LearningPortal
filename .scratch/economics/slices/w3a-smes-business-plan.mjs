// W3a: econ.firms.smes-business-plan (ZIMSEC only) — SMEs, their importance, problems and survival; business plans and
// cash-flow projections (arithmetic checked).
import { concept, P, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

/** Cash-flow projection with carried-forward balances. blanks: {"row|col": "?"} hides cells. */
function cashFlow({ months, opening, receipts, payments, hide = [] }) {
  const n = months.length;
  const totR = months.map((_, i) => receipts.reduce((s, r) => s + r.values[i], 0));
  const totP = months.map((_, i) => payments.reduce((s, r) => s + r.values[i], 0));
  const net = months.map((_, i) => totR[i] - totP[i]);
  const open = [], close = [];
  let bal = opening;
  for (let i = 0; i < n; i++) { open.push(bal); bal += net[i]; close.push(bal); }
  for (let i = 1; i < n; i++) check(`open ${i}`, open[i], close[i - 1]);
  const rows = [
    ["Opening balance", ...open],
    ...receipts.map((r) => [r.name, ...r.values]),
    ["**Total receipts**", ...totR],
    ...payments.map((p) => [p.name, ...p.values]),
    ["**Total payments**", ...totP],
    ["**Net cash flow**", ...net],
    ["**Closing balance**", ...close],
  ];
  for (const h of hide) {
    const [r, c] = h.split("|");
    const row = rows.find((x) => x[0] === r);
    if (!row) throw new Error(`hide: no row ${r}`);
    row[Number(c) + 1] = "?";
  }
  return { md: table(["(US\\$)", ...months], rows), open, close, net, totR, totP };
}

concept("econ.firms.smes-business-plan", { file: "firms/smes-business-plan", keyPrefix: "firms.smes-business-plan" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a typical feature of a small and medium enterprise (SME)?",
    options: [
      ["It is usually managed by its owner", "Correct: owners usually run SMEs themselves."],
      ["It usually sells its shares on the stock exchange", "That describes a large public company."],
      ["It usually employs thousands of workers", "SMEs have few workers."],
      ["It is usually owned by the government", "SMEs are private businesses."],
    ],
    answer: "A",
    explanation: "SMEs are small, privately owned and usually owner-managed, with few workers and little capital.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many SMEs find it hard to get bank loans?",
    options: [
      ["They often lack collateral and proper financial records", "Correct: banks see them as risky."],
      ["Banks are not allowed to lend to small businesses", "There is no such rule."],
      ["SMEs never need any finance to operate", "SMEs need finance for stock and equipment."],
      ["SMEs can always raise money by issuing shares", "Most SMEs are not companies that can sell shares."],
    ],
    answer: "A",
    explanation: "Without collateral or records, banks cannot judge or secure the loan, so they refuse or charge high interest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of a business plan describes the target customers, the size of the market and the competitors?",
    options: [
      ["Market research and analysis", "Correct."],
      ["Operations plan", "This covers premises, equipment and production."],
      ["Financial plan", "This covers costs, sales forecasts and cash flow."],
      ["Management and staffing", "This covers who runs the business."],
    ],
    answer: "A",
    explanation: "The market analysis section shows that there are customers for the product and who the competitors are.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a cash-flow projection, how is the **closing balance** for a month calculated?",
    options: [
      ["Opening balance + net cash flow", "Correct."],
      ["Total receipts − total payments", "That is net cash flow."],
      ["Opening balance + total receipts", "Payments must also be subtracted."],
      ["Total payments − opening balance", "This has no meaning."],
    ],
    answer: "A",
    explanation: "Closing balance = opening balance + (total receipts − total payments).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A cash-flow projection shows a negative closing balance in March only. What is the **most sensible** action for the owner?",
    options: [
      ["Arrange an overdraft in advance to cover the March shortfall", "Correct: short-term finance for a short-term gap."],
      ["Close the business at once because it is making a loss", "A cash shortage in one month does not prove a loss."],
      ["Issue shares on the stock exchange", "An SME cannot do this, and it is a long-term source."],
      ["Ignore it because cash flow does not matter", "Without cash the bills cannot be paid."],
    ],
    answer: "A",
    hints: ["Is this a short-term or a long-term problem?"],
    explanation: "A temporary shortage needs short-term finance (an overdraft), or delaying payments or speeding up receipts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Several small welding businesses work next to each other in one area and share suppliers and customers. How does this help them survive?",
    options: [
      ["They gain external economies such as nearby suppliers", "Correct: clustering lowers costs for all."],
      ["They are protected from competition by other welders", "They actually compete with each other."],
      ["They can charge whatever prices they like to customers", "Many sellers keep prices competitive."],
      ["They no longer need any customers", "All businesses need customers."],
    ],
    answer: "A",
    hints: ["Think about the benefits of an industry growing in one place."],
    explanation: "Clusters attract suppliers, skilled labour and customers looking for that product, lowering costs for every firm.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **main** purpose of a business plan for a person seeking a loan?",
    options: [
      ["To show the lender that the business is viable and can repay", "Correct."],
      ["To register the business as a public limited company", "Registration needs separate documents."],
      ["To guarantee that the business will make a profit", "A plan cannot guarantee profit."],
      ["To avoid paying any tax on the business's profits", "A business plan has no effect on tax."],
    ],
    answer: "A",
    explanation: "Lenders use the plan, especially the cash-flow projection, to judge whether the business can repay.",
  });

  // Cash-flow items (figures different from the lesson).
  {
    const cf = cashFlow({ months: ["January", "February", "March"], opening: 450, receipts: [{ name: "Cash sales", values: [1300, 1700, 2100] }], payments: [{ name: "Materials", values: [700, 850, 1000] }, { name: "Wages", values: [400, 400, 450] }, { name: "Rent", values: [250, 250, 250] }] });
    check("net1", cf.net[0], -50); check("close1", cf.close[0], 400); check("close3", cf.close[2], 1000);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: cf.close[0], daily: true,
      stem: `A fictional furniture repair business has an opening balance of US\\$450 in January. Its January receipts are US\\$1,300 and its January payments are US\\$${fmt(cf.totP[0])}. Calculate its closing balance for January.`,
      wrong: [cf.net[0], 450 + 1300],
      explanation: `Net cash flow = 1,300 − ${fmt(cf.totP[0])} = −US\\$50. Closing balance = 450 + (−50) = **US\\$${cf.close[0]}**. −50 is the net cash flow, not the balance.`,
    });
  }
  {
    const cf = cashFlow({ months: ["July", "August", "September"], opening: 230, receipts: [{ name: "Sales of uniforms", values: [860, 650, 2380] }], payments: [{ name: "Cloth and thread", values: [760, 920, 630] }, { name: "Electricity", values: [55, 55, 55] }, { name: "Stall fee", values: [35, 35, 35] }], hide: ["**Net cash flow**|1", "**Closing balance**|1", "Opening balance|2", "**Net cash flow**|2", "**Closing balance**|2"] });
    check("closeJul", cf.close[0], 240); check("closeAug", cf.close[1], -120); check("closeSep", cf.close[2], 1540);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: cf.close[1],
      stem: `Chipo's fictional tailoring business prepares the cash-flow projection below.\n\n${cf.md}\n\nCalculate the closing balance for August. Give a negative balance as a negative number.`,
      wrong: [cf.net[1], -cf.close[1]],
      hints: ["August's opening balance is July's closing balance.", "Net cash flow = receipts − payments."],
      explanation: `1. July closing balance = ${cf.open[1]} (the August opening balance).\n2. August payments = 920 + 55 + 35 = ${fmt(cf.totP[1])}; net cash flow = 650 − ${fmt(cf.totP[1])} = ${cf.net[1]}.\n3. Closing balance = ${cf.open[1]} + (${cf.net[1]}) = **−US\\$${-cf.close[1]}**: an overdrawn balance, so Chipo needs short-term finance for August.\n4. ${cf.net[1]} is August's net cash flow only; ${-cf.close[1]} drops the minus sign.`,
    });
  }
  {
    const open = -85, rec = 1240, pay = 960, close = open + rec - pay;
    check("close", close, 195);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: close,
      stem: `A fictional car wash starts October with an overdrawn balance of −US\\$85. Its October receipts are projected at US\\$${fmt(rec)} and its payments at US\\$${pay}. Calculate its projected closing balance for October.`,
      wrong: [rec - pay, 85 + rec - pay],
      hints: ["Closing balance = opening balance + net cash flow; the opening balance is negative."],
      explanation: `Net cash flow = ${fmt(rec)} − ${pay} = ${rec - pay}. Closing balance = −85 + ${rec - pay} = **US\\$${close}**. Treating the opening balance as +85 gives ${85 + rec - pay}; ${rec - pay} is the net cash flow only.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Net cash flow is total receipts minus total payments.",
    answer: true,
    explanation: "True. The closing balance then equals the opening balance plus the net cash flow.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A business that is making a profit can never run short of cash.",
    answer: false,
    explanation: "False. If customers pay late or the business buys expensive equipment, it can run short of cash even while profitable.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each SME problem with a way of reducing it.",
    pairs: [
      ["No collateral for a bank loan", "Borrowing from a microfinance institution or savings club"],
      ["High prices for small orders of materials", "Joining a co-operative to buy in bulk"],
      ["Poor record keeping", "Attending book-keeping training"],
      ["Too few customers in a crowded local market", "Finding a niche or selling through social media"],
    ],
    explanation: "Each survival strategy targets a particular problem.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "In a cash-flow projection, money coming in is called {{blank:a}}. Money going out is called {{blank:b}}. Each month's opening balance is the previous month's {{blank:c}} balance.",
    blanks: [
      { id: "a", accepted: ["receipts"], choices: ["receipts", "payments", "profit"] },
      { id: "b", accepted: ["payments"], choices: ["receipts", "payments", "profit"] },
      { id: "c", accepted: ["closing"], choices: ["closing", "opening", "net"] },
    ],
    explanation: "Receipts in, payments out; balances are carried forward.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why SMEs are important to the Zimbabwean economy.",
    points: [
      "Create jobs / self-employment.",
      "Especially for young people and those who lost formal jobs, providing incomes and reducing poverty.",
      "Supply goods and services locally at low cost / supply larger firms / use local resources.",
      "Develop entrepreneurial skills; some grow into large firms; competition and innovation.",
    ],
    modelAnswer: "First, SMEs create jobs and self-employment for many people, including school leavers and workers who have lost formal jobs, giving them an income. Second, they provide goods and services locally at low cost and use local materials, and some grow into larger firms that employ more people.",
    hints: ["Think about jobs and about what SMEs produce."],
    explanation: "Two reasons, each identified and developed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 14,
    stem: (() => {
      const cf = cashFlow({ months: ["Month 1", "Month 2", "Month 3"], opening: 760, receipts: [{ name: "Sales of detergent", values: [640, 1530, 1940] }, { name: "Grant", values: [450, 0, 0] }], payments: [{ name: "Chemicals and bottles", values: [870, 730, 815] }, { name: "Mixing equipment", values: [620, 0, 0] }, { name: "Wages", values: [310, 310, 310] }], hide: ["**Total payments**|0", "**Net cash flow**|0", "**Closing balance**|0", "Opening balance|1", "**Closing balance**|2"] });
      return `Tatenda plans to start a fictional business making liquid detergent in Gweru. His cash-flow projection for the first three months is shown below.\n\n${cf.md}`;
    })(),
    parts: (() => {
      const cf = cashFlow({ months: ["Month 1", "Month 2", "Month 3"], opening: 760, receipts: [{ name: "Sales of detergent", values: [640, 1530, 1940] }, { name: "Grant", values: [450, 0, 0] }], payments: [{ name: "Chemicals and bottles", values: [870, 730, 815] }, { name: "Mixing equipment", values: [620, 0, 0] }, { name: "Wages", values: [310, 310, 310] }] });
      check("tp1", cf.totP[0], 1800); check("net1", cf.net[0], -710); check("c1", cf.close[0], 50); check("c3", cf.close[2], 1355);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: cf.totP[0], stem: "Calculate total payments in Month 1.", wrong: [870 + 310], explanation: `870 + 620 + 310 = US\\$${fmt(cf.totP[0])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: cf.net[0], stem: "Calculate the net cash flow in Month 1. Give a negative figure as a negative number.", wrong: [-cf.net[0], 640 - cf.totP[0]], explanation: `Receipts 640 + 450 = 1,090; 1,090 − ${fmt(cf.totP[0])} = ${cf.net[0]}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: cf.close[0], stem: "Calculate the closing balance in Month 1.", wrong: [cf.net[0]], explanation: `760 + (${cf.net[0]}) = US\\$${cf.close[0]}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: cf.close[2], stem: "Calculate the closing balance in Month 3.", wrong: [cf.net[2]], explanation: `Month 2: ${cf.close[0]} + (1,530 − 1,040) = ${cf.close[1]}. Month 3: ${cf.close[1]} + (1,940 − 1,125) = US\\$${fmt(cf.close[2])}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the net cash flow is negative in Month 1.", points: ["Large one-off payment for mixing equipment (US\\$620) / start-up stock.", "Sales are low at first while customers are found."], modelAnswer: "In Month 1 Tatenda pays US\\$620 for mixing equipment and buys his first stock of chemicals and bottles, while sales are only US\\$640 because he has few customers yet, so payments exceed receipts." }),
        P.manual({ label: "(f)", marks: 2, stem: "State **two** other parts of a business plan Tatenda should prepare.", points: ["Any one part, e.g. market research / marketing plan.", "Another, e.g. operations plan / management / description / finance required / executive summary."], modelAnswer: "A market research section on his customers and competitors, and an operations plan describing his premises, equipment and suppliers." }),
        P.manual({
          label: "(g)", marks: 4, levels: LV(4),
          stem: "Discuss whether a lender should be confident about the business after reading this projection.",
          points: [
            "Confident: closing balance stays positive every month and rises to US\\$1,355; sales grow.",
            "Not confident: Month 1 balance only US\\$50 (no margin for error); depends on a grant and on sales forecasts that may be optimistic.",
            "Only three months shown; no loan repayments included; competition from established brands.",
            "Justified conclusion.",
          ],
          modelAnswer: "The projection is encouraging: the balance never becomes negative and rises to US\\$1,355 by Month 3 as sales grow. However, the balance at the end of Month 1 is only US\\$50, so any delay in sales or rise in costs would leave him overdrawn; it also relies on a US\\$450 grant and on sales forecasts that may be optimistic in a market with established brands, and it covers only three months. A lender should be cautiously positive but ask for evidence behind the sales figures and a longer projection that includes loan repayments.",
        }),
      ];
    })(),
    explanation: "(a) US\\$1,800. (b) −US\\$710. (c) US\\$50. (d) US\\$1,355. (e) Start-up costs and low early sales. (f) Two other parts of a plan. (g) Positive balances against a thin margin and optimistic forecasts.",
    hints: ["Net cash flow = receipts − payments; closing = opening + net cash flow."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional town, many young people run small businesses such as phone repairs, hairdressing and vegetable vending. The town council is considering building a covered market with cheap stalls, electricity and a training centre for small businesses.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** problems that SMEs commonly face.", points: ["One problem, e.g. lack of finance / collateral.", "Another, e.g. lack of workspace / power cuts / crowded markets / lack of skills / regulations."], modelAnswer: "Lack of finance because they have no collateral, and lack of secure, affordable workspace with electricity." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the covered market and training centre would help the town's SMEs survive and grow.",
        points: [
          "Yes: secure workspace and reliable power lower costs and protect stock.",
          "Yes: customers attracted to one place (cluster); training improves records, marketing and access to loans.",
          "No: does not solve lack of finance or crowded markets; stall fees may still be too high for some.",
          "No: may not suit mobile traders; location may be far from customers; cost to the council (opportunity cost).",
          "Depends on stall fees, location and whether finance (e.g. microcredit) is also provided.",
          "Justified conclusion.",
        ],
        modelAnswer: "A covered market would give the businesses secure space and reliable electricity, which lowers costs, protects stock and allows phone repairers and hairdressers to work longer. Bringing traders together also attracts more customers, and training would improve record keeping and marketing, making it easier to get loans. However, it would not solve the shortage of finance or the problem of too many traders selling the same goods, and if stall fees are too high or the market is far from where customers are, many traders would not use it. The money spent also has an opportunity cost for the council. Overall the plan would help many businesses, especially if stalls are cheap, the site is convenient and it is combined with access to microfinance.",
      }),
    ],
    explanation: "(a) Finance, workspace and other problems. (b) Workspace, clustering and skills against finance, location and cost.",
    hints: ["Which SME problems does the plan solve, and which does it not?"],
  });

  b.card("DEFINITION", "Small and medium enterprises (SMEs)", "Small, usually owner-managed businesses with few workers, little capital and a small turnover.");
  b.card("CONCEPT", "Importance of SMEs", "Jobs and incomes, local goods and services, use of local resources, links with large firms, competition, future large firms.");
  b.card("CONCEPT", "Problems facing SMEs", "Finance and collateral, infrastructure, workspace, crowded markets, skills, regulation.");
  b.card("CONCEPT", "How SMEs survive", "Niches, co-operatives, clusters, microfinance, subcontracting, low costs, training and record keeping.");
  b.card("DEFINITION", "Business plan", "A document describing a business idea, its market, operations, management and finances, used to guide the owner and persuade lenders.");
  b.card("FACT", "Parts of a business plan", "Executive summary, business description, market analysis, marketing plan, operations, management, financial plan, finance required.");
  b.card("FORMULA", "Cash-flow projection", "Net cash flow = receipts − payments; closing balance = opening balance + net cash flow.");
  b.card("CONCEPT", "Why prepare a cash-flow projection?", "To spot months with cash shortages in advance and arrange finance, and to show lenders the business can repay.");
  b.card("FACT", "Can a profitable business run out of cash?", "Yes: late payment by customers or large purchases can leave it short of cash.");
});
