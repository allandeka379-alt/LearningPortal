// W1a: enterprise.business-plans
import { concept, P, ZIM, table, cvp, sum, r2, money, chk, check } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.enterprise.business-plans", { file: "enterprise/business-plans", keyPrefix: "enterprise.business-plans" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which section of a business plan is usually written **last** and gives a one-page summary of the whole plan?",
    ok: ["The executive summary", "Correct: it summarises the finished plan, so it is written last."],
    bad: [["The marketing plan", "The marketing plan is a full section, not a summary of the whole."], ["The human resources plan", "This section covers staff, not the whole plan."], ["The cash flow forecast", "The forecast is part of the financial section."]],
    explanation: "The executive summary condenses the whole plan and is written once the other sections are complete.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which is a main purpose of a business plan?",
    ok: ["To help persuade lenders to provide finance", "Correct: lenders and investors expect a plan before committing money."],
    bad: [["To guarantee that the business will make a profit", "A plan is a forecast and guarantees nothing."], ["To replace the need for market research", "A plan uses research; it does not replace it."], ["To avoid paying tax on early profits", "A plan has no effect on tax."]],
    explanation: "A plan guides the owner, sets targets and helps to raise finance.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank manager reads a start-up's business plan. What is she **most** likely to look for in the financial section?",
    ok: ["Evidence that the loan can be repaid", "Correct: a lender's main concern is getting its money back with interest."],
    bad: [["The colour of the logo on the cover", "Appearance does not show the ability to repay."], ["The number of friends the owner has", "A bank lends against repayment ability and security, not friends."], ["Whether the owner enjoys the work", "Enjoyment does not repay a loan."]],
    explanation: "Banks look for realistic forecasts and ability to repay.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **limitation** of a business plan?",
    ok: ["Forecasts in it may turn out to be wrong", "Correct: figures for a new business are estimates and may be inaccurate."],
    bad: [["It prevents the owner from borrowing money", "A plan normally helps borrowing."], ["It removes the need to set targets", "Targets are part of the plan."], ["It cannot contain any financial information", "The financial plan is a main section."]],
    explanation: "Plans rely on forecasts, which can be wrong, and they can go out of date.",
  });
  const fund = sum([6200, 3400, 1850, 420, 2130]);
  chk(fund, 14000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional fish-farming project in Kariba lists these start-up costs: ponds US\\$6,200, nets and pumps US\\$3,400, first stock of fingerlings US\\$1,850, licences US\\$420 and working capital US\\$2,130. The owner can contribute US\\$4,500. How much must be borrowed?",
    ok: ["US\\$9,500", "Correct: total funding 6,200 + 3,400 + 1,850 + 420 + 2,130 = 14,000; 14,000 − 4,500 = 9,500."],
    bad: [["US\\$14,000", "This is the total funding required, before the owner's contribution."], ["US\\$11,870", "This leaves out working capital and the contribution is also applied wrongly."], ["US\\$4,500", "This is the owner's own contribution, not the amount to borrow."]],
    hints: ["Add all the costs, then subtract the owner's contribution."],
    explanation: "Total funding US\\$14,000 less US\\$4,500 from the owner leaves US\\$9,500 to borrow.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A supplier is deciding whether to sell timber on 60 days' credit to a new furniture maker. Which part of the maker's business plan would help the supplier **most**?",
    ok: ["The cash flow forecast", "Correct: it shows whether the maker will have cash to pay when the bill falls due."],
    bad: [["The description of the logo", "A logo says nothing about payment."], ["The list of the owner's hobbies", "Hobbies do not show ability to pay."], ["The marketing slogan", "A slogan does not show cash for payment."]],
    hints: ["What does the supplier need to know?"],
    explanation: "The supplier needs to be sure of payment; the cash flow forecast shows the timing of cash in and out.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional restaurant owner in Masvingo prepares a plan using forecasts made before a large rise in fuel prices. Which is the most likely result?",
    ok: ["The plan's cost forecasts may now be wrong", "Correct: plans become out of date when conditions change."],
    bad: [["The plan becomes more accurate with time", "Plans lose accuracy when conditions change."], ["The plan can no longer be used by lenders in any case", "A lender can still use it if it is updated."], ["The plan has no effect on future decisions", "A plan guides later decisions, so out-of-date figures could mislead."]],
    hints: ["Think about what happens to the cost figures."],
    explanation: "Forecasts are based on conditions at the time. A plan should be reviewed and updated when conditions change.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional stallholder who needs no loan asks whether a 25-page formal business plan is worth the time. Which reply is the best judgement?",
    ok: ["A short plan is worthwhile, but a long one may not be", "Correct: planning helps, but its value must be set against its cost."],
    bad: [["A plan is never worthwhile for a stall", "Even a short plan helps to set targets and spot problems."], ["A longer plan is always better than a short one", "A longer plan costs more time and is not always more useful."], ["A plan is only needed once the business fails", "The plan is most useful before money is spent."]],
    hints: ["Weigh the benefit of planning against the cost for a small firm."],
    explanation: "The benefit of planning is real, but a small business with no borrowing may need only a short plan.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank is more likely to lend to a new business if it can see a realistic business plan.",
    answer: true,
    explanation: "True. The plan shows the lender how the business will operate and how the loan will be repaid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Once a business plan has been written, it should not be changed.",
    answer: false,
    explanation: "False. A plan should be reviewed and revised as conditions change and results are compared with targets.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reader of a business plan to what they are most likely to look for.",
    pairs: [["A bank", "Ability to repay the loan and security"], ["An investor", "Return on the money invested and growth prospects"], ["A supplier", "Evidence that bills will be paid on time"], ["The owner", "A clear direction and targets to measure progress"]],
    explanation: "Each reader uses the plan for a different purpose.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The {{blank:a}} summary is written last, while the {{blank:b}} plan includes start-up costs and the cash flow forecast.",
    blanks: [
      { id: "a", accepted: ["executive"], choices: ["executive", "marketing", "operations"] },
      { id: "b", accepted: ["financial"], choices: ["financial", "human resources", "marketing"] },
    ],
    explanation: "The executive summary is written last; the financial plan contains the costs and forecasts.",
  });

  const c = cvp({ price: 12, variable: 7.5, fixed: 2700 });
  chk(c.breakEvenUnits, 600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: c.breakEvenUnits, calculator: true, daily: true, wrong: [r2(2700 / 12), r2(2700 / 7.5)],
    stem: "The plan for a fictional sandal workshop in Bulawayo shows a selling price of US\\$12 a pair, variable cost of US\\$7.50 a pair and fixed costs of US\\$2,700 a month. Calculate the break-even output in pairs a month.",
    hints: ["Break-even = fixed costs ÷ contribution per unit."],
    explanation: "Contribution = 12 − 7.50 = 4.50. Break-even = 2,700 ÷ 4.50 = 600 pairs. Dividing by the price (225 pairs) or by the variable cost (360 pairs) are common errors.",
  });
  const c3 = cvp({ price: 15, variable: 9.5, fixed: 3300 });
  chk(c3.breakEvenUnits, 600);
  chk(c3.marginOfSafetyPct(800), 25, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: c3.marginOfSafetyPct(800), calculator: true, wrong: [r2(((800 - 600) / 600) * 100), 75],
    stem: "The plan for a fictional leather-bag maker in Harare shows a selling price of US\\$15 a bag, variable cost of US\\$9.50 a bag and fixed costs of US\\$3,300 a month. Forecast sales are 800 bags a month. Calculate the margin of safety as a percentage of forecast sales, to one decimal place.",
    hints: ["Margin of safety = forecast sales - break-even sales; divide by forecast sales."],
    explanation: "Contribution = 15 - 9.50 = 5.50; break-even = 3,300 / 5.50 = 600 bags. Margin of safety = 800 - 600 = 200 bags. 200 / 800 x 100 = 25.0%. Dividing by break-even output gives 33.3%, which is a different measure.",
  });
  const c4 = cvp({ price: 8, variable: 5, fixed: 1500 });
  const prof = c4.profitAt(620);
  chk(prof, 360);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [r2(620 * 8 - 1500), r2(620 * 3)],
    stem: "A planning forecast for a fictional juice stall in Gweru shows sales of 620 bottles in the first month (selling price US\\$8, variable cost US\\$5, fixed costs US\\$1,500). Calculate the profit for the month.",
    hints: ["Profit = total contribution - fixed costs."],
    explanation: "Contribution = 620 x 3 = 1,860. Profit = 1,860 - 1,500 = US\\$360. Using sales revenue less fixed costs gives US\\$3,460, which ignores variable costs.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** element that a business plan normally contains.",
    accepted: ["executive summary", "marketing plan", "financial plan", "cash flow forecast", "business objectives", "operations plan", "human resources plan", "market analysis", "description of the business", "management plan", "break-even"],
    explanation: "Accept any element: executive summary, description and objectives, products, market analysis, marketing plan, operations, human resources or financial plan.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **why** a bank usually asks for a business plan before lending to a new business.",
    points: ["A new business has no track record, so the bank has no past accounts to judge it by", "The plan shows how the business will operate and make money", "The forecasts show whether the loan can be repaid, which reduces the bank's risk"],
    modelAnswer: "A new business has no past accounts, so the bank cannot judge it from history. The plan shows how the business will operate and earn income, and the cash flow forecast shows whether it can repay the loan. This reduces the bank's risk of not being repaid.",
    hints: ["What does the bank not know about a new business?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo plans to open a mobile phone repair shop in Masvingo. Explain **two** benefits to her of preparing a business plan.",
    points: ["It helps her to raise finance, as lenders expect a plan", "Application: she can show a lender her expected repair numbers and costs", "It shows weaknesses before money is spent", "Application: she may find that the rent of a shop is too high for expected repairs"],
    modelAnswer: "A plan helps her to raise finance because a lender will want to see the expected number of repairs and costs. It also shows weaknesses before money is spent, for example if the plan shows the rent is too high for the number of repairs she expects.",
    hints: ["Link each benefit to the repair shop."],
    explanation: "Two benefits, each applied to the shop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Assess whether a business plan is worth the time and cost for a very small business.",
    points: ["Benefit: it helps to raise finance and to set targets", "Limitation: it takes time, and forecasts may be guesses", "Counter-argument: a short plan costs little and may prevent an expensive mistake", "Judgement with reason, e.g. worthwhile if borrowing or risk is significant"],
    modelAnswer: "A plan helps a small business raise finance and set targets, but it takes time and its forecasts may be wrong. A short plan costs little and can prevent an expensive mistake. It is worth the effort if the owner is borrowing or committing a large share of savings, but less so for a tiny, low-risk venture.",
    hints: ["Weigh benefit against cost and finish with a condition."],
    explanation: "Both sides and a conditional judgement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline **three** steps in preparing a business plan.",
    points: ["Identify the opportunity and set objectives", "Research the market, costs and competitors", "Work out the funding required and expected profit, then write and review the plan"],
    modelAnswer: "First identify the opportunity and set objectives. Then research the market, the costs and competitors. Finally work out the funding and expected profit, then write the plan and have it checked.",
    hints: ["Think of the order: idea, research, figures, writing."],
    explanation: "Any three correct steps.",
    applies: ZIM,
  });

  const fundTot = sum([5200, 2750, 1480, 260, 910]);
  chk(fundTot, 10600);
  const own2 = 4000;
  const loan2 = r2(fundTot - own2);
  const c2 = cvp({ price: 3.2, variable: 1.7, fixed: 1050 });
  chk(c2.breakEvenUnits, 700);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Sipho plans a small bakery in Mutare. His plan shows the start-up costs below, a selling price of US\\$3.20 per loaf of premium bread, variable cost of US\\$1.70 per loaf and fixed costs of US\\$1,050 a month.\n\n" + table(["Start-up item", "US\\$"], [["Oven and tins", 5200], ["Shop fittings", 2750], ["First stock of flour and packaging", 1480], ["Licences", 260], ["Working capital", 910]]) + `\n\nSipho can contribute ${money(own2)} of his own money.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: loan2, stem: "Calculate the amount Sipho needs to borrow.", wrong: [fundTot, own2], explanation: "Total = 5,200 + 2,750 + 1,480 + 260 + 910 = 10,600. Loan = 10,600 − 4,000 = US\\$6,600." }),
      P.num({ label: "(b)", marks: 2, kind: "units", value: c2.breakEvenUnits, stem: "Calculate the break-even output in loaves a month.", wrong: [r2(1050 / 3.2), r2(1050 / 1.7)], explanation: "Contribution = 3.20 − 1.70 = 1.50. Break-even = 1,050 ÷ 1.50 = 700 loaves." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** pieces of information a bank would look for in the plan.", points: ["Evidence of how the loan will be repaid (cash flow forecast)", "Evidence of demand for the product or security offered"], modelAnswer: "The bank would look for a cash flow forecast showing how the loan will be repaid, and evidence that customers will buy the bread.", explanation: "One mark each." }),
    ],
    hints: ["Add the costs first."],
    explanation: "Loan US\\$6,600; break-even 700 loaves; a lender wants repayment evidence and demand evidence.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A fictional business: Rudo has prepared a plan for an internet café in Gweru. Her forecasts assume 60 customers a day, but she based this on one week of counting passers-by in the month when a trade fair was held nearby. A potential investor says the plan is too optimistic.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** weakness in the way Rudo prepared her forecast.", points: ["She used a single week of data", "The week was unusual because of the trade fair", "So her forecast of 60 customers may overstate normal demand"], modelAnswer: "She used only one week of passers-by, and that week was unusual because of the trade fair, so her forecast of 60 customers a day may be much higher than normal demand.", explanation: "Weakness, evidence from case, consequence." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Rudo should revise her plan before approaching lenders.", points: ["Benefit: a realistic plan is more credible to lenders", "Benefit: lower forecasts allow her to see whether the café can still break even", "Cost: research takes time and delays the start", "Risk of not revising: borrowing too much or losing credibility if sales are lower", "Counter-argument: she could present best and worst cases", "Judgement and reason"], modelAnswer: "A realistic plan is more credible to lenders and shows whether the café could still break even on lower demand. Revising costs time and delays the opening, but lending on over-optimistic figures could lead to repayment problems and loss of credibility. She could present best-case and worst-case forecasts. On balance she should collect data over several ordinary weeks first, because a plan that the lender trusts is worth the short delay.", hints: ["Compare the cost of delay with the risk of an over-optimistic plan."], explanation: "Both sides, then a reasoned decision." }),
    ],
    hints: ["Think about what makes a forecast reliable."],
    explanation: "A single unusual week is weak evidence; a revised plan is more credible.",
  });

  b.card("DEFINITION", "Business plan", "A written document setting out a business's objectives, products, market, operations, management and finances, used to guide the owner and persuade others to provide support.");
  b.card("FACT", "Key elements of a business plan", "Executive summary; description and objectives; products; market analysis and marketing plan; operations and management; human resources; financial plan.");
  b.card("CONCEPT", "Purposes of a business plan", "Guide the owner, raise finance, set targets for control and reduce risk by testing ideas on paper.");
  b.card("CONCEPT", "What a bank looks for", "Evidence that the loan can be repaid: a realistic cash flow forecast, security and a sound market.");
  b.card("FACT", "Limitations of a business plan", "Takes time and cost; forecasts may be wrong; goes out of date; does not guarantee success.");
  b.card("FORMULA", "Break-even output", "Fixed costs ÷ contribution per unit (selling price − variable cost per unit).");
  b.card("FORMULA", "Margin of safety (%)", "(Forecast sales − break-even sales) ÷ forecast sales × 100.");
  b.card("CONCEPT", "Executive summary", "A one-page summary of the whole plan, written last but read first.");
  b.card("CONCEPT", "Steps in preparing a plan", "Identify the opportunity and set objectives; research the market; decide product, price and promotion; plan operations and people; work out costs and funding; write and check; implement; compare results and revise.", undefined, { applies: ZIM });
});
