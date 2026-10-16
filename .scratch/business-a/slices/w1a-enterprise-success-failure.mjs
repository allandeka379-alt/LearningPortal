// W1a: enterprise.success-failure
import { concept, P, CAM, ZBS, check, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.enterprise.success-failure", { file: "enterprise/success-failure", keyPrefix: "enterprise.success-failure" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a common **cause of business failure**?",
    ok: ["Running out of cash to pay its bills on time", "Correct: poor cash management is one of the leading causes of failure."],
    bad: [["Having loyal customers who return often", "Loyal customers support success."], ["Selling a product of high quality at a fair price", "Quality and fair pricing help a business."], ["Having a clear and realistic business plan", "Sound planning reduces the risk of failure."]],
    explanation: "A business that cannot pay its bills when due fails even if sales are rising.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **liquidation**?",
    ok: ["Closing a firm and selling assets to pay debts", "Correct: the assets are sold and creditors are paid from the proceeds."],
    bad: [["Selling extra shares to raise new finance for growth", "That is raising capital, not closing the business."], ["Merging with a competitor to grow larger", "A merger is external growth."], ["Moving production to a cheaper site", "Relocation keeps the business running."]],
    explanation: "Liquidation ends the business by selling its assets to pay creditors.",
    applies: CAM,
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which action would help a business **reduce the risk of failure**?",
    ok: ["Preparing a cash flow forecast each month", "Correct: forecasting shows cash shortages early so action can be taken."],
    bad: [["Expanding into new markets without research", "Expansion without research raises risk."], ["Ignoring competitors' price changes", "Ignoring rivals can lose customers."], ["Delaying payment of all wages to save cash", "This would damage workers' morale and could breach labour rules."]],
    explanation: "Cash flow control and planning are standard ways of reducing the risk of failure.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a profitable business still fail?",
    ok: ["It may be unable to pay bills on time", "Correct: profit is not the same as cash available to pay debts."],
    bad: [["Profit always falls once sales begin to rise", "Rising sales normally raise profit unless costs rise faster."], ["Profit is always paid out in full as tax", "Tax takes only a share of profit."], ["Profitable businesses never need suppliers", "All businesses need suppliers."]],
    explanation: "Customers may pay late while suppliers and wages must be paid on time, causing a cash shortage.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional hardware shop in Mutare borrowed heavily to open three new branches in one year, before its first shop had proved profitable. Sales at the new branches were lower than forecast and loan repayments could not be met. Which cause of failure is shown?",
    ok: ["Over-expansion of the business", "Correct: the business grew faster than its finance and sales could support."],
    bad: [["Lack of competition", "Nothing in the case concerns competition."], ["Over-staffing in the first shop", "Staff numbers are not mentioned."], ["Excellent market research", "Sales were lower than forecast, so the research was not sound."]],
    hints: ["Which cause involves growing too fast?"],
    explanation: "Opening too many outlets too quickly, financed by debt, is over-expansion.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A bakery's owner finds that falling incomes in the town have reduced demand for bread. Which cause of failure does this illustrate?",
    ok: ["A change in the economy", "Correct: lower incomes are an economic change outside the owner's control."],
    bad: [["Poor labour relations", "Labour relations are not mentioned."], ["Weak product design", "Product design is not the problem in the case."], ["Heavy over-borrowing", "Borrowing is not mentioned."]],
    hints: ["Is the cause inside or outside the business?"],
    explanation: "Falling incomes are a change in the economy, an external cause of failure.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional garage in Bulawayo has rising sales but has begun to pay suppliers late. Which analysis best explains why this may end in failure?",
    ok: ["Suppliers may refuse credit, so parts cannot be bought", "Correct: loss of supplier trust cuts off inputs and sales."],
    bad: [["Suppliers will pay the garage more as sales rise", "Suppliers are paid by the garage, not the other way."], ["Late payment always raises profit permanently", "It can ease cash briefly but harms supplier trust."], ["Rising sales cannot cause cash problems", "Fast growth often needs more cash for stock and wages."]],
    hints: ["What can suppliers do when they are paid late?"],
    explanation: "Late payment damages trust; suppliers may demand cash on delivery or stop supplying, which interrupts production.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the best reason why a small business might decide NOT to spend heavily on market research before launching a product?",
    ok: ["The cost may be too high for its cash flow", "Correct: research is useful but costs money a small firm may lack."],
    bad: [["Market research always gives wrong answers to firms", "Research can be accurate, though not perfect."], ["Customers never change what they want to buy", "Tastes do change."], ["Research increases the risk of failure", "Research normally reduces risk."]],
    hints: ["Compare the benefit of research with its cost."],
    explanation: "Reducing risk has a cost; a small firm may prefer cheaper methods such as talking to customers.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A business that makes a profit cannot fail.",
    answer: false,
    explanation: "False. A profitable business can fail if it runs out of cash to pay debts on time.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "When a company goes into administration, an independent administrator tries to keep it trading or to sell it as a going concern.",
    answer: true,
    explanation: "True. Administration aims to rescue the business or sell it; liquidation ends it.",
    hints: ["Compare administration with liquidation."],
    applies: CAM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of failure to the example.",
    pairs: [["Poor cash management", "A shop buys more stock than it can pay for"], ["Competition", "A new supermarket opens nearby and cuts prices"], ["Change in the law", "A new licence fee the owner had not budgeted for"], ["Weak management", "An owner who does not check stock or costs"]],
    explanation: "Each example matches the named cause.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} means closing a business and selling its assets to pay creditors, whereas {{blank:b}} puts a struggling company under an independent administrator who tries to keep it trading.",
    blanks: [
      { id: "a", accepted: ["Liquidation"], choices: ["Liquidation", "Administration", "Diversification"] },
      { id: "b", accepted: ["administration"], choices: ["liquidation", "administration", "diversification"] },
    ],
    explanation: "Liquidation ends the business; administration tries to rescue it.",
    applies: CAM,
  });

  const open = 1800, rec = 5400, pay = 8100;
  const bal = r2(open + rec - pay);
  check("bal", bal, -900);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: Math.abs(bal), calculator: true, daily: true, wrong: [r2(pay - rec), r2(open + rec)],
    stem: "A fictional hair salon in Gweru starts a month with US\\$1,800 in the bank. During the month it receives US\\$5,400 from customers and pays out US\\$8,100 for wages, rent and supplies. By how much is the bank account overdrawn at the end of the month?",
    hints: ["Add receipts to opening cash, then deduct payments."],
    explanation: "1,800 + 5,400 − 8,100 = −900, an overdraft of US\\$900. Using payments less receipts gives US\\$2,700, which ignores opening cash.",
  });
  const sales = 18500, costs = 14300, fall = 0.15;
  const p1 = r2(sales - costs);
  const p2 = r2(sales * (1 - fall) - costs);
  const pf = ((p1 - p2) / p1) * 100;
  chk(p1, 4200);
  chk(p2, 1425);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: pf, calculator: true, wrong: [15, r2(((p1 - p2) / p2) * 100)],
    stem: "A fictional bakery in Chinhoyi has monthly sales of US\\$18,500 and total costs of US\\$14,300 (assume the costs do not change when sales change). A new competitor takes 15% of its sales. Calculate the percentage fall in the bakery's monthly profit, to one decimal place.",
    hints: ["Work out the profit before and after the fall in sales."],
    explanation: "Profit before = 18,500 − 14,300 = 4,200. Sales after = 18,500 × 0.85 = 15,725, so profit after = 15,725 − 14,300 = 1,425. Fall = (4,200 − 1,425) ÷ 4,200 × 100 = 66.1%. A 15% sales fall causes a much larger fall in profit because costs stay the same.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** cause of business failure.",
    accepted: ["poor cash management", "cash flow problems", "over-expansion", "overtrading", "weak management", "competition", "poor planning", "change in the economy", "change in the law", "lack of finance", "running out of cash", "bad management"],
    explanation: "Accept poor cash management, over-expansion, weak management, competition, economic or legal change, or poor planning.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for closing a company and selling its assets to pay its debts.",
    accepted: ["liquidation", "liquidating", "winding up"],
    explanation: "Liquidation is the closing down of the business and selling of assets to pay creditors.",
    applies: CAM,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why poor cash management is a common cause of business failure.",
    points: ["A business must pay suppliers, wages and rent when they fall due", "Customers may pay late, so cash received can be less than cash due out", "If bills cannot be paid, suppliers stop supplying and lenders may close the business, even if it is profitable"],
    modelAnswer: "A business has to pay suppliers, wages and rent on time. If customers pay late, cash coming in is less than cash going out. When bills cannot be paid, suppliers stop supplying and lenders may act, so the business can close even if it is profitable.",
    hints: ["Think about timing: when money comes in and when it must go out."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Moyo's Tuck Shop in Masvingo has lost customers since a larger shop opened across the road. Explain **two** ways in which the owner could reduce the risk of the business failing.",
    points: ["Conduct market research to find out what local customers want", "Application: stock goods the larger shop does not, such as credit sales to regulars", "Control cash flow by forecasting and keeping stock low", "Application: avoid buying slow-selling goods that tie up money"],
    modelAnswer: "He could carry out market research to find what his regulars want, then stock items the larger shop does not sell. He could also control cash flow with a simple forecast and buy only fast-selling goods, so that less money is tied up in unsold stock.",
    hints: ["Link each remedy to the tuck shop's situation."],
    explanation: "Two ways, each developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse the consequences of the failure of a large clothing factory for the community of a small town.",
    points: ["Workers lose their jobs and incomes", "Spending by households in local shops falls", "Local businesses lose sales, and some may close", "The town loses tax revenue, so public services may suffer"],
    modelAnswer: "Workers lose their jobs and so their incomes. They spend less in local shops, which lose sales and may have to lay off staff or close. The town also loses tax revenue from the factory and its workers, so there is less money for public services.",
    hints: ["Follow the chain from jobs to spending to local business."],
    explanation: "A chain of cause and effect.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Farai's Fresh Foods, in Mutare, supplies vegetables to three restaurants. Over six months it has expanded from one delivery van to four, financed by a bank loan. Two of the restaurants have now closed, and a third pays 90 days after delivery. Farai's cash balance at the end of the month was US\\$600 against bills of US\\$4,100 due next week.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 3500, stem: "Calculate the shortfall of cash against the bills due next week.", wrong: [600, 4100], explanation: "4,100 − 600 = US\\$3,500." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain **two** causes of the cash problem faced by Farai's Fresh Foods.", points: ["Over-expansion: four vans financed by loan raised costs and repayments", "Loss of customers: two restaurants closed, reducing sales", "Late-paying customer: 90 days' credit delays cash coming in"], modelAnswer: "Buying four vans increased the loan repayments and running costs before sales had grown. Two of his three customers closed, so sales fell, and the remaining one takes 90 days to pay, so cash comes in late.", explanation: "Any two causes with explanation; 3 marks for two developed causes." }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess how Farai could reduce the risk of failure.", points: ["Chase the debt or ask for shorter credit terms from the slow-paying restaurant", "Sell or lease out spare vans to cut costs", "Find new customers through market research", "Judgement: cash action first, as the bills are due next week", ], modelAnswer: "He should first collect cash from the slow-paying restaurant or negotiate a shorter payment period, because the bills are due next week. Selling or leasing spare vans would cut repayments. He should then research new customers to replace the closed restaurants. Cash must come first, because without it the business cannot survive to win new customers.", hints: ["Which action is most urgent?"], explanation: "Actions plus a judgement about priority." }),
    ],
    hints: ["Subtract cash held from bills due."],
    explanation: "Shortfall US\\$3,500; causes are over-expansion, lost customers and late payment; actions are cash first.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Nyasha's Photo Studio in Bulawayo made a profit of US\\$6,000 last year but is struggling to pay its bills. It buys equipment on credit, sells most services on 30 days' credit and has no cash reserve. A friend suggests that it should reduce the risk of failure by diversifying into printing T-shirts.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain how a profitable business such as Nyasha's can still struggle to pay its bills.", points: ["Profit is not the same as cash", "Customers pay after 30 days while the studio must pay equipment suppliers and costs sooner", "With no cash reserve, any delay leaves the studio unable to pay on time"], modelAnswer: "Profit is not cash. Customers take 30 days to pay but the studio must pay its suppliers and costs sooner, and with no reserve any delay leaves it without cash to meet bills.", explanation: "Profit versus cash timing." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether diversifying into printing T-shirts is the best way for Nyasha to reduce the risk of failure.", points: ["Benefit: a second income source spreads risk", "Cost: new equipment and stock need cash the studio does not have", "Diversifying does not solve the cash timing problem", "Alternative: better credit control, a cash flow forecast or a cash reserve", "Condition: diversification suits a business that already has cash", "Judgement and reason"], modelAnswer: "Printing T-shirts would give a second source of income, which spreads risk. But it needs new equipment and stock, which the studio cannot afford while it is short of cash, and it does not solve the delay in customer payments. Better credit control and a cash flow forecast would address the real problem at lower cost. Diversification may help later, once cash is under control.", hints: ["Does the suggestion tackle the actual cause of the problem?"], explanation: "Weighs a suggestion against alternatives and reaches a reasoned judgement." }),
    ],
    hints: ["Identify the true cause of the trouble first."],
    explanation: "Cash timing is the cause; diversifying costs cash, so cash control comes first.",
  });

  b.card("DEFINITION", "Business failure", "The closing down of a business because it cannot meet its costs or pay its debts when they fall due.");
  b.card("FACT", "Causes of business failure", "Poor cash management, over-expansion, weak management, competition, changes in the economy or law, and poor planning.");
  b.card("FACT", "Causes of business success", "Good management, adequate finance, understanding the market, innovation and quality.");
  b.card("CONCEPT", "Profit is not cash", "A profitable business can fail if customers pay late and bills must be paid first.");
  b.card("FACT", "Ways to reduce the risk of failure", "Planning, cash flow control, market research, training, diversification and contingency plans.");
  b.card("FACT", "Consequences of failure", "Owners lose investment, workers lose jobs, suppliers may not be paid, and the community loses jobs and tax revenue.");
  b.card("DEFINITION", "Liquidation", "Closing a business and selling its assets to pay its debts.", undefined, { applies: CAM });
  b.card("DEFINITION", "Administration", "A struggling company is run by an independent administrator who tries to keep it trading or to sell it as a going concern.", undefined, { applies: CAM });
  b.card("CONCEPT", "Over-expansion (overtrading)", "Growing faster than finance and sales can support, so cash runs out.");
});
