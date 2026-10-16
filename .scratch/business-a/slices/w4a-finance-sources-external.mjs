// W4a: finance.sources-external (both ZIMSEC syllabi and Cambridge AS)
// Conventions: loan interest is simple interest on the amount borrowed unless the stem says otherwise; hire purchase total = deposit + instalments.
import { concept, P, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.finance.sources-external", { file: "finance/sources-external", keyPrefix: "finance.sources-external" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **equity** finance?",
    ok: ["Issuing new shares", "Correct: investors buy a share in the ownership of the business."],
    bad: [["A fixed-term bank loan", "A loan is debt that must be repaid with interest."], ["A bank overdraft facility", "An overdraft is short-term borrowing, which is debt."], ["Hire purchase of a van", "Hire purchase is a form of debt."]],
    explanation: "Equity finance is raised by selling a share in ownership, for example by issuing shares.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **bank overdraft** is best described as",
    ok: ["short-term borrowing up to an agreed limit", "Correct: the account may be overdrawn up to a set limit, with interest on the amount used."],
    bad: [["a long-term loan secured on property", "That describes a mortgage."], ["money raised by selling shares", "That describes share capital."], ["money given by the government that need not be repaid", "That describes a grant."]],
    explanation: "An overdraft lets the business draw more than its balance up to a limit; it is flexible, short-term and repayable on demand.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main difference between **hire purchase** and **leasing**?",
    ok: ["With hire purchase the business owns the asset at the end", "Correct: with leasing the asset stays with the owner (the lessor)."],
    bad: [["Leasing requires the business to own the asset from the start", "In leasing the asset belongs to someone else."], ["Hire purchase is always cheaper than leasing", "The total cost depends on the terms; neither is always cheaper."], ["Hire purchase has no regular payments", "Hire purchase has deposits and regular instalments."]],
    hints: ["Who owns the asset when the payments end?"],
    explanation: "Under hire purchase ownership passes to the business after the last instalment; under a lease the asset is returned.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do lenders usually charge **lower interest** on a mortgage than on an unsecured loan?",
    ok: ["The loan is secured on property", "Correct: the lender can sell the property if repayments are missed, so the risk is lower."],
    bad: [["Mortgages are always for short periods", "Mortgages are usually long-term loans."], ["Mortgages are not repaid", "A mortgage must be repaid."], ["Interest rates are fixed by shareholders", "Shareholders do not set the interest rate on a mortgage."]],
    hints: ["What can the lender take if the borrower cannot pay?"],
    explanation: "Security reduces the lender's risk, and lower risk usually means lower interest.",
  });
  const hp = 2250 + 450 * 18;
  chk(hp, 10350);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional sewing business in Gweru buys a machine on hire purchase with a deposit of US\\$2,250 and 18 monthly instalments of US\\$450. What is the total hire purchase price?",
    ok: [money(hp), "Correct: 2,250 + (18 × 450)."],
    bad: [[money(8100), "That leaves out the deposit."], [money(2700), "That adds one instalment to the deposit."], [money(8550), "That subtracts the deposit from the instalments instead of adding it."]],
    hints: ["Total = deposit + all the instalments."],
    explanation: "Instalments = 18 × 450 = US\\$8,100. Total = 2,250 + 8,100 = US\\$10,350.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional sole trader in Mutare needs US\\$40,000 for expansion and does not want to share control. Which source is **not available** to her?",
    ok: ["Selling shares to the public", "Correct: a sole trader is not a company and cannot issue shares."],
    bad: [["A bank loan", "A sole trader can borrow from a bank."], ["Hire purchase of equipment", "A sole trader can buy equipment on hire purchase."], ["Trade credit from its suppliers", "A sole trader can use trade credit."]],
    hints: ["Which of these needs the business to be a company?"],
    explanation: "Only companies issue shares. A sole trader can raise external finance by loans, hire purchase, leasing and other sources.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional start-up software company in Harare has no profits and no property. It needs US\\$100,000 for development. Which source is **most likely** to be available?",
    ok: ["Venture capital", "Correct: specialist investors back risky new businesses in return for a share."],
    bad: [["A mortgage", "A mortgage needs property as security."], ["A bank overdraft", "A bank is unlikely to lend a large sum without profits or security."], ["Trade credit", "Trade credit is for short-term purchases and cannot fund US\\$100,000 of development."]],
    hints: ["Who invests in risky ventures with no security?"],
    explanation: "Venture capitalists accept high risk for a share of the ownership and possible high returns; banks usually want security.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional hotel in Victoria Falls can finance an extension by a bank loan or by selling shares. Which is the strongest argument **for choosing the loan**?",
    ok: ["Existing owners keep full control", "Correct: lenders do not take a share of the ownership."],
    bad: [["Interest need not be paid in a poor year", "Interest must be paid whether or not profits are made."], ["The loan never has to be repaid", "A loan must be repaid."], ["Shareholders always demand repayment in a year", "Shareholders do not have a right to repayment on a fixed date."]],
    hints: ["What does a lender not gain that a shareholder does?"],
    explanation: "A loan leaves ownership unchanged; the cost is fixed interest and repayment, whether or not profits are made.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Interest on a bank loan must be paid even in a year when the business makes a loss.",
    answer: true,
    explanation: "True. Interest is a contractual cost. Dividends, by contrast, can be reduced or missed in a poor year.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of finance to its description.",
    pairs: [["Debenture", "A company's long-term loan certificate paying fixed interest"], ["Venture capital", "Investment in a risky new business in return for shares"], ["Trade credit", "Paying suppliers after delivery of the goods"], ["Crowd funding", "Raising small sums from many people through a website"]],
    explanation: "Each is an external source with different cost and risk.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Money borrowed that must be repaid with interest is {{blank:a}} finance, while money from selling a share in ownership is {{blank:b}} finance.",
    blanks: [
      { id: "a", accepted: ["debt"], choices: ["debt", "equity", "grant"] },
      { id: "b", accepted: ["equity"], choices: ["equity", "debt", "overdraft"] },
    ],
    explanation: "Debt is borrowed money; equity is money from owners or investors.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** disadvantage of raising finance by selling shares.",
    accepted: ["dividends must be paid", "ownership is shared", "control is shared", "loss of control", "owners lose control", "profit is shared", "takes time", "legal costs", "expensive to arrange", "dilutes ownership", "shareholders may disagree"],
    explanation: "Accept: loss or dilution of control, sharing of profit through dividends, cost and time of issuing shares.",
  });

  const interest = r2(24000 * 0.08 * 3);
  chk(interest, 5760);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: interest, calculator: true, wrong: [1920, 29760],
    stem: "A fictional poultry project in Chinhoyi borrows US\\$24,000 for 3 years at 8% a year simple interest on the amount borrowed. Calculate the total interest paid.",
    hints: ["Interest each year = loan × rate; multiply by the number of years."],
    explanation: "Interest each year = 24,000 × 8% = US\\$1,920. Over 3 years = 1,920 × 3 = US\\$5,760. The total repaid is 29,760.",
  });
  const newShares = 80000 / 2, share = r2((newShares / (160000 + newShares)) * 100);
  chk(share, 20);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: share, calculator: true, wrong: [25, 50],
    stem: "A fictional company in Bulawayo has 160,000 shares in issue. It raises US\\$80,000 by issuing new shares at US\\$2 each. What percentage of the company will the new shareholders own, to one decimal place?",
    hints: ["Number of new shares ÷ total shares afterwards."],
    explanation: "New shares = 80,000 ÷ 2 = 40,000. Total shares = 160,000 + 40,000 = 200,000. New shareholders own 40,000 ÷ 200,000 × 100 = 20.0%. Dividing by the old number of shares gives 25%.",
  });
  const hpExtra = r2(sum([1500, 460 * 15]) - 7500);
  chk(hpExtra, 900);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: hpExtra, calculator: true, wrong: [8400, 6900],
    stem: "A welding machine costs US\\$7,500 in cash. On hire purchase it needs a deposit of US\\$1,500 and 15 monthly instalments of US\\$460. Calculate how much more the hire purchase price is than the cash price.",
    hints: ["Find the total hire purchase price first."],
    explanation: "Hire purchase total = 1,500 + 15 × 460 = US\\$8,400. Extra = 8,400 - 7,500 = US\\$900.",
    workedSolution: "1. Instalments = 15 × 460 = 6,900.\n2. Total = 1,500 + 6,900 = US\\$8,400.\n3. Extra cost = 8,400 - 7,500 = US\\$900.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between debt finance and equity finance.",
    points: ["Debt finance is borrowed and must be repaid, normally with interest", "Equity finance is raised by selling a share in ownership", "Equity investors share profit and control and are not repaid on a fixed date"],
    modelAnswer: "Debt finance is money borrowed that must be repaid, normally with interest. Equity finance is raised by selling a share in the ownership, so investors share the profit and control and are not repaid on a fixed date.",
    hints: ["Think about repayment and ownership."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Masvingo needs a new oven costing US\\$12,000. Explain two reasons why it might choose hire purchase.",
    points: ["It spreads the cost over regular instalments", "Application: the bakery pays a small deposit instead of US\\$12,000 at once", "The business owns the oven at the end", "Application: the oven can be used for many years after the last instalment"],
    modelAnswer: "Hire purchase spreads the cost, so the bakery pays a small deposit instead of US\\$12,000 at once. It also owns the oven at the end, so the oven can be used for many years after the last instalment.",
    hints: ["Link each reason to cash and ownership."],
    explanation: "Two reasons, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a bank may refuse to lend to a small new business.",
    points: ["The business has no trading record to show it can repay", "It may have no assets to offer as security", "New businesses have a high risk of failure", "The bank may judge that the interest would not cover the risk"],
    modelAnswer: "A new business has no trading record to show it can repay, and may have no assets to offer as security. Because new businesses have a high risk of failure, the bank may judge that the interest would not cover the risk.",
    hints: ["Think of the bank's risk."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional tourism company in Victoria Falls needs US\\$200,000 to build chalets. Assess whether it should raise the money by a bank loan or by issuing shares.",
    points: ["A loan keeps control with the owners", "Interest must be paid every year whether or not profits are made", "Shares need no repayment and dividends can be reduced in a poor year", "Shares share ownership and profit with new investors", "Tourism is seasonal, so fixed interest may be a burden in quiet years", "Judgement with a reason, for example a mix, with a loan for the part that can be paid from steady income and shares for the rest"],
    modelAnswer: "A loan keeps control with the owners, but interest must be paid every year whether or not profits are made, which is a burden in the quiet seasons of tourism. Shares need no repayment and dividends can be reduced in a poor year, but they share ownership and profit with new investors. A mix is best: a loan for the part that can be paid from steady income and shares for the rest.",
    hints: ["Think about seasonal income and control."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const leaseMonthly = 270, leaseMonths = 48;
  const leaseTotal = leaseMonthly * leaseMonths;
  const hpTotal = 2200 + 330 * 30;
  chk(leaseTotal, 12960); chk(hpTotal, 12100);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional printing firm in Harare needs a press costing ${money(11000)} in cash. It can buy on hire purchase with a deposit of ${money(2200)} and 30 instalments of ${money(330)}, or lease it for ${money(leaseMonthly)} a month for ${leaseMonths} months.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: hpTotal, wrong: [330 * 30, 11000], stem: "Calculate the total hire purchase price.", explanation: "2,200 + (30 × 330) = 2,200 + 9,900 = US\\$12,100." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: leaseTotal, wrong: [270, 11000], stem: "Calculate the total paid under the lease.", explanation: "270 × 48 = US\\$12,960." }),
      P.manual({ label: "(c)", marks: 5, stem: "Recommend which option the firm should choose, justifying your answer.", points: ["Hire purchase costs US\\$12,100 against US\\$12,960 for the lease, so it is US\\$860 cheaper in total", "Under hire purchase the firm owns the press at the end; under the lease it owns nothing", "The lease needs no deposit, while hire purchase needs US\\$2,200 at the start", "The lease lasts 48 months, so payments continue 18 months longer than under hire purchase", "Judgement with a reason: hire purchase if the firm can afford the deposit and will use the press for many years; the lease if cash is short or the equipment may soon be out of date"], modelAnswer: "Hire purchase costs US\\$12,100 against US\\$12,960 for the lease, so it is US\\$860 cheaper in total, and the firm owns the press at the end. The lease needs no deposit, whereas hire purchase needs US\\$2,200 at the start. The firm should choose hire purchase if it can afford the deposit and will use the press for many years, and the lease if cash is short or the press may soon be out of date.", explanation: "Compares cost, cash needed and ownership to a judgement." }),
    ],
    hints: ["Total hire purchase = deposit + instalments.", "Consider ownership as well as cost."],
    explanation: "Hire purchase US\\$12,100; lease US\\$12,960; the recommendation depends on ownership and cash.",
  });

  // Practice structured 2 (14 marks): loan vs shares
  const need = 90000, rate = 0.1, newOwnerPct = 0.3;
  const intr = need * rate, equityKeep = (p) => p * (1 - newOwnerPct), debtKeep = (p) => p - intr;
  const be = intr / newOwnerPct;
  chk(intr, 9000); chk(be, 30000);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional furniture company in Gweru needs ${money(need)} for a new factory. It can borrow the money at ${rate * 100}% a year interest, or sell a ${newOwnerPct * 100}% share of the business to an investor, who would take ${newOwnerPct * 100}% of profit. Profit before interest is expected to be ${money(50000)} in a good year and ${money(15000)} in a poor year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: intr, wrong: [need, 900], stem: "Calculate the annual interest on the loan.", explanation: "90,000 × 10% = US\\$9,000." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: debtKeep(50000), wrong: [equityKeep(50000), 50000], stem: "Calculate the profit the owners keep in a good year if they use the loan.", explanation: "50,000 - 9,000 = US\\$41,000.", workedSolution: "1. Interest = 90,000 × 10% = US\\$9,000.\n2. Profit kept = 50,000 - 9,000 = US\\$41,000." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: equityKeep(15000), wrong: [debtKeep(15000), 4500], stem: "Calculate the profit the existing owners keep in a poor year if they sell the 30% share.", explanation: "70% × 15,000 = US\\$10,500. With the loan they would keep only 15,000 - 9,000 = US\\$6,000." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate which source of finance the company should choose.", points: ["In a good year the loan leaves the owners US\\$41,000 against US\\$35,000 with the investor", "In a poor year the investor option leaves US\\$10,500 against US\\$6,000 with the loan", "The two are equal at a profit of US\\$30,000 (9,000 ÷ 0.30), so the loan is better above it", "The loan keeps full control; the investor takes a say and a share for ever", "Interest must be paid even in a loss, which is a risk if profits are uncertain", "Counter-argument: the investor may bring skills and contacts", "Judgement with a reason, for example choose the loan if profit is expected to be above US\\$30,000 and stable"], levels: [[3, 5, 7, "Both options calculated; break-even and risk weighed; a justified judgement"], [2, 3, 4, "Compares some figures with some weighing; judgement weakly supported"], [1, 1, 2, "General statements on debt and equity"]], modelAnswer: "In a good year the loan leaves the owners US\\$41,000 against US\\$35,000 with the investor, but in a poor year the investor option leaves US\\$10,500 against US\\$6,000. The two are equal at a profit of US\\$30,000, so the loan is better above that figure. The loan also keeps full control, but interest must be paid even in a loss. The investor may bring skills and contacts. The company should choose the loan if profit is expected to be above US\\$30,000 and stable, and the investor if profit is uncertain.", hints: ["Compare both years, then find where the two options are equal."], explanation: "Compares both options in a good and a poor year, with the break-even profit." }),
    ],
    hints: ["Interest = loan × rate.", "With an investor the owners keep 70% of profit."],
    explanation: "Interest US\\$9,000; good year US\\$41,000 (loan) vs US\\$35,000; poor year US\\$10,500 (investor) vs US\\$6,000; break-even US\\$30,000.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional partnership of two sisters runs a successful mushroom farm near Mutare. They want US\\$45,000 to double production. They have no spare savings and their profits are used up by family drawings. Their bank has offered a five-year loan at a fixed rate of interest, secured on their farm buildings. A local investor has offered to join as a third partner for a 40% share of profit. Prices for mushrooms are rising and their orders are growing.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain two features of a bank loan.", points: ["A fixed sum is borrowed and repaid over a set period", "Interest is charged on the amount borrowed", "It is usually secured on an asset such as property"], modelAnswer: "A bank loan is a fixed sum borrowed and repaid over a set period, with interest charged on the amount borrowed. It is usually secured on an asset such as property.", explanation: "Any three features, one mark each." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse one disadvantage to the sisters of taking a new partner.", points: ["Profit has to be shared with the new partner", "Application: the investor would take 40% of profit, leaving the sisters less than before", "Control is shared and the partners may disagree", "Application: the sisters would no longer make every decision on the farm"], modelAnswer: "Profit has to be shared, and the investor would take 40% of it, leaving the sisters with less than before. Control is also shared, so the sisters could no longer make every decision on the farm and the partners might disagree.", explanation: "Developed with the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the sisters should take the bank loan or the new partner.", points: [["The loan keeps full ownership and control with the sisters", 2], ["Fixed interest must be paid whatever the profit, and the farm buildings are at risk if repayments are missed", 2], ["Growing orders and rising prices make repayments more likely to be affordable", 1], ["The partner takes 40% of profit for ever, which could be more costly than interest if the farm is very profitable", 1], ["Counter-argument: a partner may bring skills and share the risk", 1], ["Judgement with a reason: the loan, provided repayments are affordable from growing profit", 1]], levels: [[3, 6, 8, "Both sources compared in the context of the farm; risk and cost weighed; a justified judgement"], [2, 3, 5, "Some comparison with some application; judgement weakly supported"], [1, 1, 2, "Lists features of each source"]], modelAnswer: "The loan keeps ownership and control with the sisters. Interest is fixed and must be paid whatever the profit, and the farm buildings are at risk if repayments are missed, but growing orders and rising prices make repayments more likely to be affordable. A partner would take 40% of profit for ever, which could cost more than the interest if the farm is very profitable, although a partner could bring skills and share the risk. On balance the sisters should take the loan, provided they check that the repayments can be met from growing profit.", hints: ["Use the facts about growth, security and control."], explanation: "Compares the loan with the partner in the context of the farm." }),
    ],
    hints: ["Use the facts in the extract about security, orders and control."],
    explanation: "Features of a loan; a disadvantage of a partner; a judgement between the two sources.",
  });

  b.card("DEFINITION", "Debt finance", "Money borrowed from outside the business that must be repaid, normally with interest (loans, overdrafts, debentures, mortgages, hire purchase).");
  b.card("DEFINITION", "Equity finance", "Money raised by selling a share in ownership (share capital, new partners, venture capital); no fixed repayment but profit and control are shared.");
  b.card("DEFINITION", "Bank overdraft", "Short-term borrowing up to an agreed limit; flexible, interest on the amount used, can be withdrawn at short notice.");
  b.card("DEFINITION", "Hire purchase", "Paying for an asset by a deposit and instalments; the business owns it at the end; total cost exceeds the cash price.");
  b.card("DEFINITION", "Leasing", "Paying regular rent to use an asset owned by someone else; no large outlay but no ownership at the end.");
  b.card("DEFINITION", "Venture capital", "Investment by specialists in risky new businesses in return for shares and the chance of a high return.");
  b.card("DEFINITION", "Debenture", "A company's long-term loan certificate paying fixed interest and repayable on a set date.");
  b.card("FACT", "Short-term and long-term sources", "Short: overdraft, trade credit, factoring. Medium/long: bank loan, hire purchase, leasing, mortgage, debentures, share capital.");
  b.card("CONCEPT", "Factors in choosing external finance", "Amount needed, time period, cost, risk, security available, form of business and willingness to give up control.");
});
