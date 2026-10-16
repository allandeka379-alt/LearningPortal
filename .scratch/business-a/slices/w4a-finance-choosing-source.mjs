// W4a: finance.choosing-source (both ZIMSEC syllabi and Cambridge AS)
// Conventions: overdraft interest = amount used x annual rate x months / 12; loans are charged for the whole term; weighted score = sum(weight x score).
import { concept, P, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

const scoreTable = (criteria, options) => {
  const rows = criteria.map((c, i) => [c[0], String(c[1]), ...options.map((o) => String(o[1][i]))]);
  const totals = options.map((o) => o[1].reduce((t, v, i) => t + v * criteria[i][1], 0));
  rows.push(["**Weighted total**", String(criteria.reduce((s, c) => s + c[1], 0)), ...totals.map(String)]);
  return { totals, md: table(["Criterion", "Weight", ...options.map((o) => o[0])], rows, ["l", "r", ...options.map(() => "r")]) };
};

concept("abus.finance.choosing-source", { file: "finance/choosing-source", keyPrefix: "finance.choosing-source" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which form of business **cannot** raise finance by issuing shares?",
    ok: ["A sole trader", "Correct: only companies can issue shares."],
    bad: [["A private limited company", "A private company can sell shares to chosen investors."], ["A public limited company", "A public company can sell shares to the public."], ["A company listed on a stock exchange", "A listed company issues shares."]],
    explanation: "Shares can be issued only by companies. A sole trader must use other sources such as savings, loans or grants.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which type of need is **best matched** by a bank overdraft?",
    ok: ["A short-term shortage of cash", "Correct: an overdraft is flexible and meant for short periods."],
    bad: [["The purchase of a factory", "A factory needs long-term finance."], ["A ten-year expansion", "A long expansion needs long-term finance."], ["Permanent increase in owner's capital", "Permanent capital is not an overdraft's role."]],
    explanation: "Overdrafts are flexible, short-term and repayable on demand, so they suit temporary cash shortages.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a business with a **high level of existing debt** advised to be careful about borrowing more?",
    ok: ["Interest must be paid even if profits fall", "Correct: heavy fixed payments increase the risk of failure in a poor year."],
    bad: [["Lenders always refuse a business with debt", "Lenders may lend, but at higher cost or with conditions."], ["Interest rates fall as debt rises", "Rates tend to rise, not fall, with more debt."], ["Debt reduces the business's costs", "Debt adds interest costs."]],
    hints: ["Think about what must be paid in a bad year."],
    explanation: "A highly geared business has large fixed interest payments; if profit falls it may be unable to pay them.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An owner wants to expand but also wants to keep full control. Which source is **most consistent** with this?",
    ok: ["A bank loan", "Correct: a lender does not gain a share in ownership."],
    bad: [["Selling shares to new investors", "New shareholders gain a say in the business."], ["Taking in a new partner", "A partner shares decisions and profit."], ["Venture capital", "Venture capitalists take a share and often a say."]],
    hints: ["Which source does not give up ownership?"],
    explanation: "Borrowing leaves ownership unchanged, whereas shares, partners and venture capital share control.",
  });
  const od = r2(18000 * 0.15 * 2 / 12), ln = r2(18000 * 0.09);
  chk(od, 450); chk(ln, 1620);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional furniture seller in Bulawayo needs US\\$18,000 for 2 months. An overdraft costs 15% a year on the amount used. A bank loan costs 9% a year but must be taken for a full year. How much cheaper in interest is the overdraft?",
    ok: [money(ln - od), "Correct: loan interest 1,620 less overdraft interest 450."],
    bad: [[money(od), "That is the overdraft interest, not the difference."], [money(ln), "That is the loan interest, not the difference."], [money(1350), "That uses 9% on 18,000 for 10 months, which is not what the question describes."]],
    hints: ["Work out each total interest cost first."],
    explanation: "Overdraft interest = 18,000 × 15% × 2 ÷ 12 = US\\$450. Loan interest = 18,000 × 9% = US\\$1,620. Difference = US\\$1,170.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional start-up in Harare has no trading history and no assets. Which source of finance is **most likely** to refuse it?",
    ok: ["A large unsecured bank loan", "Correct: banks want a record of trading or security."],
    bad: [["The owner's own savings", "The owner's savings do not need anyone's approval."], ["A grant for young entrepreneurs", "A grant is based on the project, not on past trading."], ["Crowd funding from supporters", "Crowd funding relies on the idea, not on past trading."]],
    hints: ["What does a bank usually ask for?"],
    explanation: "Lenders judge risk from trading history and security; a new business with neither may be refused.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional tourist lodge in Victoria Falls has income only in the dry season. It borrows with a long-term loan that needs fixed monthly repayments. What is the **main risk**?",
    ok: ["Cash may be short in the quiet months", "Correct: repayments are due every month, but income is not."],
    bad: [["Interest rates will always rise", "Rates may rise or fall; this is not a certainty."], ["The loan cannot be used for buildings", "A loan can fund buildings."], ["The lender will own the business", "A lender does not own the business."]],
    hints: ["Compare the pattern of income with the pattern of repayments."],
    explanation: "A seasonal business has uneven income, but loan repayments are fixed, so it may struggle to pay in the quiet months.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional dairy co-operative in Masvingo is choosing between a bank loan and a grant to buy a cooling tank. Which is the **best reason** to prefer the grant?",
    ok: ["It does not have to be repaid", "Correct: no repayment or interest reduces cost and risk."],
    bad: [["It is certain to be awarded", "Grants are competitive and not certain."], ["It can be used for any purpose with no conditions", "Grants normally have conditions about their use."], ["It is quicker to arrange than a loan", "Grants are often slower to arrange."]],
    hints: ["What does the dairy not have to do with a grant that it must do with a loan?"],
    explanation: "A grant usually need not be repaid, so it costs less and carries no repayment risk, though it may be slow and conditional.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The best source of finance for a business is always the one with the lowest rate of interest.",
    answer: false,
    explanation: "False. The period, flexibility, control, risk and availability also matter; a low rate may apply only to a long loan that costs more in total.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each need to the source that suits it best.",
    pairs: [["A short-term shortage of cash", "Bank overdraft"], ["Buying a building for 20 years", "Mortgage"], ["A new business with no security", "Micro-finance or a grant"], ["Large sums for a risky start-up", "Venture capital"]],
    explanation: "Each source matches a different period, size or risk.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Short-term needs should be matched with {{blank:a}}-term sources. Assets offered to a lender in case a loan is not repaid are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["short"], choices: ["short", "long", "no"] },
      { id: "b", accepted: ["security"], choices: ["security", "profit", "dividends"] },
    ],
    explanation: "Match the period of the finance to the need; security (collateral) reduces the lender's risk.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** factor that a business should consider when choosing a source of finance.",
    accepted: ["cost", "interest rate", "control", "risk", "purpose", "time period", "period", "flexibility", "security", "existing debt", "speed", "how quickly it is needed", "amount needed", "form of business", "availability"],
    explanation: "Accept: cost, flexibility, control, purpose, period, existing debt, risk, security, speed, amount or form of business.",
  });

  const crit = [["Cost", 40], ["Control kept", 30], ["Speed of arranging", 20], ["Low risk", 10]];
  const opts = [["Micro-finance loan", [2, 5, 5, 3]], ["Grant", [5, 5, 1, 4]], ["New partner", [4, 2, 3, 4]]];
  const st = scoreTable(crit, opts);
  chk(st.totals[0], 360); chk(st.totals[1], 410); chk(st.totals[2], 320);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "points", value: st.totals[0], wrong: [st.totals[1], 12],
    stem: `A fictional sewing project in Gweru scores three sources from 1 (poor) to 5 (best) and weights the criteria.\n\n${st.md}\n\nCalculate the weighted total for the micro-finance loan.`,
    hints: ["Multiply each score by its weight, then add."],
    explanation: "2 × 40 + 5 × 30 + 5 × 20 + 3 × 10 = 80 + 150 + 100 + 30 = 360. The grant scores 410 and the new partner 320.",
  });
  const breakEven = r2(1620 / (18000 * 0.15 / 12));
  chk(breakEven, 7.2);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "months", value: breakEven, dp: 1, calculator: true, wrong: [12, 0.8],
    stem: "A fictional hardware shop in Mutare can use an overdraft of US\\$18,000 at 15% a year (charged on the amount used) or a one-year loan of US\\$18,000 with total interest of US\\$1,620. For how many months would the overdraft have to be used for its interest to equal the loan's interest? Give the answer to one decimal place.",
    hints: ["Find the overdraft interest per month, then divide the loan interest by it."],
    explanation: "Overdraft interest per month = 18,000 × 15% ÷ 12 = US\\$225. Break-even = 1,620 ÷ 225 = 7.2 months. For a need shorter than 7.2 months the overdraft is cheaper; longer, the loan is cheaper.",
  });
  const lnTotal = r2(30000 * 0.12 * 5);
  chk(lnTotal, 18000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(30000 + lnTotal), calculator: true, wrong: [18000, 30000],
    stem: "A fictional transport firm in Gweru borrows US\\$30,000 for 5 years at 12% a year simple interest on the amount borrowed, and repays the interest and the original loan at the end. Calculate the total amount repaid.",
    hints: ["Total interest = loan × rate × years."],
    explanation: "Interest = 30,000 × 12% × 5 = US\\$18,000. Total repaid = 30,000 + 18,000 = US\\$48,000. The figure US\\$18,000 is only the interest.",
    workedSolution: "1. Interest each year = 30,000 × 0.12 = 3,600.\n2. Interest over 5 years = 3,600 × 5 = 18,000.\n3. Total repaid = 30,000 + 18,000 = US\\$48,000.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the length of time for which money is needed affects the choice of finance.",
    points: ["Short-term needs should be met with short-term sources such as an overdraft", "Long-term needs such as machinery suit loans, mortgages or share capital", "Using short-term finance for a long-term asset risks it being withdrawn before the asset has earned the money"],
    modelAnswer: "Short-term needs such as stock should be met with short-term sources such as an overdraft, while long-term needs such as machinery suit loans, mortgages or share capital. Using short-term finance for a long-term asset is risky because it can be withdrawn before the asset has earned the money.",
    hints: ["Match the period of the finance to the life of what it pays for."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional sole trader in Chinhoyi who runs a hair salon wants US\\$6,000 for new equipment. Explain two reasons why shares are not a suitable source for her.",
    points: ["A sole trader is not a company and cannot issue shares", "Application: her salon would have to be converted into a company first", "The amount is small, so the cost and time of a share issue would be out of proportion", "Application: legal and administrative costs could use up much of the US\\$6,000"],
    modelAnswer: "A sole trader is not a company and cannot issue shares, so the salon would have to be converted into a company first. The amount is small, so the legal and administrative costs of a share issue could use up much of the US\\$6,000.",
    hints: ["Think of the form of business and the size of the sum."],
    explanation: "Two reasons, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a bank may charge a higher rate of interest to a small new business than to an established one.",
    points: ["New businesses have a higher risk of failure", "The bank has no trading record to judge", "The business may have no assets as security", "A higher rate compensates the bank for the greater risk of not being repaid"],
    modelAnswer: "New businesses have a higher risk of failure and the bank has no trading record to judge them by. They may also have no assets to offer as security. A higher rate compensates the bank for the greater risk of not being repaid.",
    hints: ["Think about risk from the lender's point of view."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bakery in Mutare needs US\\$25,000 for a new oven that will last 10 years. It can use a 12-month bank overdraft or a 10-year bank loan. Assess which is the more appropriate.",
    points: ["The oven is a long-term need, so a 10-year loan matches its life", "An overdraft can be withdrawn at short notice, which would leave the bakery without the money", "The overdraft rate may be higher and is variable", "A loan has fixed repayments, which are easier to plan", "Counter-argument: the overdraft is flexible and the interest is paid only on the amount used", "Judgement with a reason, for example choose the loan, and keep an overdraft for short-term cash shortages"],
    modelAnswer: "The oven is a long-term need, so a 10-year loan matches its life and has fixed repayments that are easy to plan. An overdraft can be withdrawn at short notice, which would leave the bakery without the money, and its rate may be higher and variable. The overdraft is flexible, but it is designed for short-term shortages. The bakery should choose the loan and keep an overdraft for short-term cash shortages.",
    hints: ["Match the period of the finance to the oven's life."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const crit2 = [["Cost", 35], ["Control kept", 35], ["Speed", 20], ["Low risk", 10]];
  const opts2 = [["Bank loan", [3, 5, 3, 3]], ["Share issue", [3, 2, 1, 5]], ["Hire purchase", [2, 5, 5, 4]]];
  const st2 = scoreTable(crit2, opts2);
  chk(st2.totals[0], 370); chk(st2.totals[1], 245); chk(st2.totals[2], 385);
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `A fictional transport business in Bulawayo needs ${money(30000)} for a second truck. The owner scores three sources from 1 (poor) to 5 (best) and weights the criteria.\n\n${st2.md}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "points", value: st2.totals[2], wrong: [st2.totals[0], 400], stem: "Calculate the weighted total for hire purchase.", explanation: "2 × 35 + 5 × 35 + 5 × 20 + 4 × 10 = 70 + 175 + 100 + 40 = 385." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which source scores highest?", options: [["Hire purchase", "Correct: it has the highest weighted total."], ["Bank loan", "Its total is lower than hire purchase."], ["Share issue", "It has the lowest total."], ["They all score the same", "The totals differ."]], answer: "A", explanation: "Hire purchase scores highest." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate how reliable the scoring table is as a basis for the decision.", points: ["The scores and weights are the owner's judgements and not measured", "A change in the weights could change which source ranks first", "It does not show total cost or whether each source is actually available", "It gives a clear and organised comparison of the factors", "Counter-argument: showing the reasoning makes the decision easier to check", "Judgement with a reason: use it as a guide, then check cost and availability"], modelAnswer: "The scores and weights are the owner's own judgements, so a change in the weights could change which source ranks first. The table does not show total cost or whether each source is available. It does give a clear, organised comparison and makes the reasoning easy to check. The owner should use it as a guide and then check the cost and availability of the top choice.", explanation: "Weighs the usefulness of the table against its subjectivity." }),
    ],
    hints: ["Multiply each score by its weight and add.", "Think about who decides the scores."],
    explanation: "Hire purchase scores highest; the table is useful but subjective.",
  });

  // Practice structured 2 (14 marks)
  const needA = 24000, odRate = 0.2, months = 3, loanRate = 0.11;
  const odCost = r2(needA * odRate * months / 12), loanCost = r2(needA * loanRate);
  chk(odCost, 1200); chk(loanCost, 2640);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional tuck-shop supplier in Harare needs ${money(needA)} for 3 months to buy school stock. Its bank offers an overdraft at ${odRate * 100}% a year on the amount used, or a one-year loan at ${loanRate * 100}% a year. Both are charged only on ${money(needA)}. The supplier already has a loan of ${money(40000)} and its profit last year was ${money(18000)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: odCost, wrong: [needA * odRate, 4800], stem: "Calculate the interest cost of the overdraft for 3 months.", explanation: "24,000 × 20% × 3 ÷ 12 = US\\$1,200." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: loanCost, wrong: [1200, 26640], stem: "Calculate the interest cost of the one-year loan.", explanation: "24,000 × 11% = US\\$2,640." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: loanCost - odCost, wrong: [odCost, loanCost], stem: "Calculate how much cheaper the overdraft is.", explanation: "2,640 - 1,200 = US\\$1,440." }),
      P.manual({ label: "(d)", marks: 8, stem: "Evaluate which source the supplier should choose.", points: [["The overdraft costs US\\$1,440 less because it is paid only for three months", 2], ["It is flexible: interest is paid only on the amount used and it can be cleared when school stock is sold", 1], ["The bank can withdraw an overdraft at short notice, which would be a danger in the busy season", 1], ["Existing debt of US\\$40,000 against profit of US\\$18,000 makes extra fixed payments risky, and a one-year loan adds more", 2], ["Counter-argument: the loan has a lower rate and is certain for the full year", 1], ["Judgement with a reason: the overdraft for this short seasonal need, with a limit agreed in advance", 1]], levels: [[3, 6, 8, "Both costs used with the case; the existing debt, flexibility and risk weighed; a justified judgement"], [2, 3, 5, "Compares cost and some factors with some application; judgement weakly supported"], [1, 1, 2, "General statements about overdrafts and loans"]], modelAnswer: "The overdraft costs US\\$1,200 against US\\$2,640 for the loan, a saving of US\\$1,440, because interest is paid only for the three months it is used, and it can be cleared when the school stock is sold. The risk is that the bank can withdraw it at short notice in the busy season. With existing debt of US\\$40,000 and a profit of US\\$18,000, a one-year loan would add to fixed payments that the business may find hard to meet. The loan has a lower rate and is certain for the year, but the supplier should choose the overdraft for this short seasonal need, with a limit agreed in advance.", hints: ["Compare cost, flexibility and risk, and use the figures on existing debt."], explanation: "Weighs the lower cost and flexibility of the overdraft against the risk of withdrawal." }),
    ],
    hints: ["Overdraft interest = amount × rate × months ÷ 12.", "Loan interest is charged for the whole year."],
    explanation: "Overdraft US\\$1,200; loan US\\$2,640; the overdraft is cheaper for a three-month need.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional private limited company in Bulawayo makes school furniture. It wants US\\$150,000 to build a new workshop. It already has a bank loan that takes a large share of its profits, and the shareholders (a family) do not want outsiders to have a say in decisions. A development agency offers a grant of up to US\\$40,000 for workshops that create jobs. A venture capital firm has offered US\\$150,000 for a 35% share. The bank will lend US\\$90,000 secured on the workshop.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "State three factors the company should consider when choosing a source of finance.", points: ["Cost of the finance", "Control of the business", "Existing debt and risk"], modelAnswer: "The company should consider the cost, the control of the business and its existing debt and risk.", explanation: "Any three factors, one mark each." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse one reason why the existing bank loan matters for the choice.", points: ["Existing loan interest takes a large share of profit", "Application: a second loan would add more fixed repayments", "A highly geared business is exposed in a poor year", "Application: the furniture company could struggle to pay if sales fall"], modelAnswer: "The existing loan interest already takes a large share of profit, so a second loan of US\\$90,000 would add more fixed repayments. A highly geared company is exposed in a poor year, and the furniture company could struggle to pay if sales fall.", explanation: "Linked to the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate the sources the company should use to pay for the workshop.", points: [["The grant of up to US\\$40,000 need not be repaid and suits a job-creating workshop, but it is limited and competitive", 2], ["The bank loan of US\\$90,000 keeps control with the family but adds to existing debt", 2], ["Venture capital would cover the whole amount but gives away 35% and a say, against the family's wishes", 2], ["A mix, such as the grant plus a smaller loan plus retained profit, spreads the risk", 1], ["Judgement with a reason: the grant and a loan, and avoid venture capital to keep control", 1]], levels: [[3, 6, 8, "Each source linked to the case; cost, control and risk weighed; a justified judgement"], [2, 3, 5, "Some sources discussed with some application; judgement weakly supported"], [1, 1, 2, "Lists sources with little application"]], modelAnswer: "The grant of up to US\\$40,000 need not be repaid and suits a workshop that creates jobs, but it is limited and competitive. The bank loan of US\\$90,000 keeps control with the family, but it adds to debt that already takes a large share of profit. Venture capital would cover the whole amount but gives away 35% of the company and a say in decisions, which the family does not want. The company should apply for the grant, use a smaller bank loan and retained profit for the rest, and avoid venture capital to keep control.", hints: ["Use the facts about the family's wish for control and the existing loan."], explanation: "Weighs each source against the company's priorities and reaches a judgement." }),
    ],
    hints: ["Use the facts in the extract about existing debt, control and the three offers."],
    explanation: "Factors, the effect of existing debt, and a reasoned choice of sources.",
  });

  b.card("CONCEPT", "Matching finance to the need", "Short-term needs (stock, wages): overdraft, trade credit, factoring. Long-term needs (buildings, machinery): loans, mortgages, shares, retained profit.");
  b.card("FACT", "Factors in choosing finance", "Purpose and period, cost, flexibility, control, existing debt and risk, security, speed and the form of business.");
  b.card("FACT", "Sources by form of business", "Sole trader: no shares. Partnership: add partners. Private company: shares to chosen investors. Public company: shares to the public.");
  b.card("DEFINITION", "Security (collateral)", "An asset offered to a lender who may take it if a loan is not repaid; it lowers the lender's risk and the interest charged.");
  b.card("DEFINITION", "Gearing", "The proportion of long-term finance that is borrowed; high gearing means fixed interest payments even in a poor year.");
  b.card("FORMULA", "Overdraft interest", "Interest = amount used × annual rate × months ÷ 12. Loans are charged for the whole term.");
  b.card("CONCEPT", "Overdraft or loan?", "An overdraft is cheaper for a short need because interest is paid only while used; a loan can be cheaper for a long need.");
  b.card("CONCEPT", "Weighted scoring", "Score each source on each factor, multiply by the weight and add. The scores are judgements, so treat the result as a guide.");
  b.card("CONCEPT", "Writing a recommendation", "Name the source, link it to the purpose and period, give the main reason, mention a risk and state a condition.");
});
