// W3a: inequality of income and wealth, redistribution (Cambridge AS Level only).
import { concept, P, chk, table, fmt, tax, round } from "../lib.mjs";
import { mc, LV5, LV8 } from "../tables/w3a-kit.mjs";

const bands = [[5000, 0], [15000, 15], [Infinity, 30]];
const t13 = tax.banded(13000, bands), t40 = tax.banded(40000, bands), t12 = tax.banded(12000, bands);
chk(t13, 1200); chk(t40, 9000); chk(t12, 1050);

concept("aecon.equity.inequality-redistribution", { file: "equity/inequality-redistribution", keyPrefix: "equity.inequality-redistribution" }, (b) => {
  mc(b, [1, "RECALL"], "Wealth differs from income because wealth is",
    ["a stock of assets owned at a point in time", "Correct: it is measured at a date, unlike income, which is a flow."],
    [["a flow of money received over a period", "That describes income."], ["the same as wages, measured over a year", "Wages are only one source of income."], ["the amount of tax paid on earnings in a year", "Tax is a payment, not a stock of assets."]],
    "Wealth is a stock of assets (less debts); income is a flow.");

  mc(b, [2, "UNDERSTANDING"], "A Gini coefficient of 0.60 in country X and 0.35 in country Y shows that",
    ["income is distributed less equally in X than in Y", "Correct: a higher Gini value means greater inequality."],
    [["income is distributed less equally in Y than in X", "A lower value means more equality, so Y is more equal."], ["average income is higher in X than in Y", "The Gini coefficient says nothing about the level of income."], ["both countries have perfect equality of income", "Perfect equality would be 0."]],
    "The Gini coefficient measures inequality: the higher it is, the more unequal the distribution.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A tax is progressive if",
    ["the average rate of tax rises as income rises", "Correct: higher incomes pay a larger share in tax."],
    [["everyone pays the same amount of tax in dollars", "That is a lump-sum (poll) tax, which is regressive in effect."], ["the rich pay more dollars in tax than the poor at a flat rate", "A flat rate is proportional, even though the rich pay more dollars."], ["the average rate of tax falls as income rises", "That is a regressive tax."]],
    "A progressive tax takes a larger percentage of income as income rises.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a transfer payment?",
    ["An old-age pension paid by the government", "Correct: it is a payment not made in exchange for output."],
    [["The salary of a teacher in a government school", "A salary is payment for work done."], ["The price paid by a government for road building", "That is payment for a service supplied."], ["The profit earned by a private clinic's owner", "Profit is a reward for enterprise."]],
    "A transfer payment is not a reward for producing output; a pension is an example.");

  mc(b, [3, "APPLICATION"], "Tax rates are 0% on income up to US\\$3,000, 20% from US\\$3,000 to US\\$10,000 and 40% above US\\$10,000. A household earns US\\$8,500. Its income tax is",
    ["US\\$1,100", "Correct: (8,500 − 3,000) × 20%."],
    [["US\\$1,700", "That applies 20% to the whole US\\$8,500."], ["US\\$3,400", "That applies 40% to the whole US\\$8,500."], ["US\\$2,200", "That doubles the correct figure."]],
    "Tax = (8,500 − 3,000) × 20% = US\\$1,100 (no income is above US\\$10,000).", { hints: ["Tax only the part of income in each band."], calculator: true });

  mc(b, [3, "ANALYSIS"], "A government changes from a progressive income tax to a flat 20% tax on all incomes, with no other change. The most likely effect on inequality of disposable income is that it",
    ["increases", "Correct: lower earners pay a larger share than before and higher earners a smaller share."],
    [["decreases, because everyone now pays the same rate", "A flat rate removes the progressive element, so the after-tax gap widens."], ["stays the same, because total tax revenue is unchanged", "Revenue does not tell us who pays it."], ["falls to zero, because incomes are taxed equally", "Gross incomes still differ."]],
    "Moving to a flat tax usually reduces the tax paid by high earners relative to low earners, so inequality of disposable income rises.", { hints: ["Which group pays a larger share under a flat tax?"] });

  mc(b, [3, "EVALUATION"], "Which is an advantage of a universal child grant over a means-tested one?",
    ["It is simpler to run and reaches every family entitled to it", "Correct: no testing means lower administrative cost and no one is missed."],
    [["It costs the government less because fewer families receive it", "A universal grant is paid to more families, so it costs more."], ["It targets money only at the poorest households", "That is a feature of means-testing."], ["It removes the incentive for any person to work at all", "Neither type removes work incentives completely."]],
    "Universal benefits avoid the cost of assessing means and the problem of missing eligible families, but they cost more.", { hints: ["Think about administration and coverage."] });

  mc(b, [3, "UNDERSTANDING"], "Which of the following helps to explain why wealth is distributed more unequally than income?",
    ["Wealth is accumulated and passed on through inheritance", "Correct: assets build up and are inherited, concentrating ownership."],
    [["Everyone earns exactly the same wage each year", "Wages differ, and this would not concentrate wealth."], ["Governments tax all wealth at 100% each year", "No such tax exists."], ["Wealth is measured per month, while income is per year", "The periods of measurement do not explain the inequality."]],
    "Saving, investment returns and inheritance allow wealth to accumulate and become more concentrated.", { hints: ["Think about how wealth builds up over time."] });

  {
    const rate = t13 / 13000 * 100;
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: rate, dp: 1, calculator: true, hints: ["First find the tax in each band, then divide by gross income."],
      stem: "Income tax rates are 0% up to US\\$5,000, 15% from US\\$5,000 to US\\$15,000 and 30% above US\\$15,000. Calculate the average rate of tax for a household with an income of US\\$13,000, to one decimal place.",
      wrong: [15, 30, 12], explanation: "Tax = (13,000 − 5,000) × 15% = US\\$1,200. Average rate = 1,200 ÷ 13,000 × 100 = 9.2%. (15% is the marginal rate in that band.)" });
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: 40000 - t40, calculator: true, hints: ["Tax the part of income in each band separately."],
      stem: "Using the same tax bands, calculate the disposable income (income after tax) of a household with a gross income of US\\$40,000, in US\\$.",
      wrong: [28000, 40000, 30000], explanation: "1. Band 15%: (15,000 − 5,000) × 0.15 = US\\$1,500.\n2. Band 30%: (40,000 − 15,000) × 0.30 = US\\$7,500.\n3. Tax = US\\$9,000. Disposable income = 40,000 − 9,000 = US\\$31,000." });
    b.num({ d: 3, skill: "APPLICATION", kind: "ratio", value: 45 / 5, dp: 2, calculator: true, hints: ["Divide the richest share by the poorest share."],
      stem: "In a fictional country the poorest fifth of households receives 5% of national income and the richest fifth receives 45%. Calculate the quintile ratio (richest share ÷ poorest share), to two decimal places.",
      wrong: [0.11, 40, 11.1], explanation: "45 ÷ 5 = 9.00. The richest fifth receives nine times the share of the poorest fifth." });
    const est = (450000 - 150000) * 0.25;
    chk(est, 75000);
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: est, calculator: true, hints: ["Only the amount above the exemption is taxed."],
      stem: "An inheritance tax of 25% is charged on the value of an estate above US\\$150,000. An estate is worth US\\$450,000. Calculate the tax due, in US\\$.",
      wrong: [112500, 37500, 300000], explanation: "1. Taxable amount = 450,000 − 150,000 = US\\$300,000.\n2. Tax = 300,000 × 25% = US\\$75,000. (Taxing the whole estate would give US\\$112,500.)" });
    chk(8 / 5 * 100 - 100, 60);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: (8 - 5) / 5 * 100, dp: 1, calculator: true, daily: true,
      stem: "After taxes and benefits the poorest fifth's share of income rises from 5% to 8% of total income. By what percentage has its share increased, to one decimal place?",
      wrong: [3, 37.5, 160], explanation: "(8 − 5) ÷ 5 × 100 = 60.0%. (3 is the rise in percentage points.)" });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A tax that takes a flat 10% of everyone's income is a progressive tax.", answer: false,
    explanation: "False. A flat 10% tax is proportional: the average rate is the same at all incomes." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Which is a flow, and which a stock?"], stem: "A household can have a high income and a low level of wealth.", answer: true,
    explanation: "True. Income is a flow and wealth a stock; a well-paid young worker with debts has high income but little wealth." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its main way of reducing inequality.",
    pairs: [["Progressive income tax", "Takes a larger share of income from high earners"], ["Child grant", "Raises the incomes of poor households through a transfer"], ["Inheritance tax", "Reduces the concentration of wealth"], ["Free primary education", "Raises future earning ability of poor children"]],
    explanation: "Each policy works through taxes, transfers, wealth or provision in kind." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Income is a {{blank:a}} measured per period, whereas wealth is a {{blank:b}} measured at a point in time.",
    blanks: [{ id: "a", accepted: ["flow"], choices: ["flow", "stock", "tax"] }, { id: "b", accepted: ["stock"], choices: ["stock", "flow", "wage"] }],
    explanation: "Income is a flow; wealth is a stock." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the measure of inequality that takes a value between 0 (perfect equality) and 1 (perfect inequality).",
    accepted: ["gini coefficient", "the gini coefficient", "gini", "gini index", "gini ratio"], wrong: ["lorenz"],
    explanation: "The Gini coefficient." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between income and wealth.",
    points: ["Income is a flow of money received over a period of time (for example wages per month).", "Wealth is a stock of assets owned at a point in time (for example property and savings)."],
    modelAnswer: "Income is a flow of money received over a period, such as wages per month, while wealth is a stock of assets, such as property and savings, owned at a point in time.",
    explanation: "One mark for each definition." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give two separate causes and develop each."],
    stem: "Explain two reasons why incomes are unequal in an economy.",
    points: ["Differences in skills and education: skilled workers have a higher marginal revenue product and are scarcer.", "So they receive higher wages than unskilled workers.", "Ownership of assets: owners of land, property and shares receive rent, interest and dividends as well as wages.", "Assets can be inherited, so the advantage is passed on."],
    modelAnswer: "Differences in skills and education: skilled workers are more productive and fewer in number, so they receive higher wages than unskilled workers. Ownership of assets: people who own land, property or shares receive rent, interest and dividends in addition to wages, and these assets can be inherited, so the advantage is passed on.",
    explanation: "Two causes, each developed." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Consider the effect on inequality and on incentives."],
    stem: "Assess the use of a progressive income tax to reduce inequality.",
    points: ["It takes a higher share of income from high earners, so disposable incomes are more equal.", "The revenue can finance transfers and public services for the poor.", "It follows the ability-to-pay principle and is seen as fair by many people.", "High marginal rates may reduce the incentive to work, save and invest.", "It may encourage avoidance and evasion, and is hard to apply to the informal sector.", "A judgement: the tax is effective where incomes are recorded and the rates are moderate."],
    modelAnswer: "A progressive income tax takes a larger share of income from high earners, so disposable incomes are more equal, and the revenue can finance transfers and public services for the poor. Many people see it as fair because it follows ability to pay. However, high marginal rates may reduce incentives to work, save and invest, and the tax encourages avoidance and is difficult to apply to the informal sector. Overall it is effective where incomes are recorded and rates are moderate, but less effective where most income is informal.",
    explanation: "Effect on equality, revenue, fairness, incentives, avoidance, judgement." });

  {
    const bands2 = [[6000, 0], [18000, 10], [Infinity, 25]];
    const rows = [["Household P", 5400], ["Household Q", 15000], ["Household R", 38000]];
    const taxes = rows.map(([, y]) => tax.banded(y, bands2));
    chk(taxes[0], 0); chk(taxes[1], 900); chk(taxes[2], 6200);
    const t1 = table(["Household", "Gross income (US\\$)"], rows.map(([n, y]) => [n, y]));
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Calculate tax band by band.", "A progressive tax has a rising average rate."],
      stem: `**An income tax in a fictional country (illustrative data)**\n\nIncome tax is charged at 0% on income up to US\\$6,000, 10% on income from US\\$6,000 to US\\$18,000 and 25% on income above US\\$18,000.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: taxes[1], stem: "Calculate the income tax paid by Household Q, in US\\$.", wrong: [1500, 3750, 1800], explanation: "(15,000 − 6,000) × 10% = US\\$900." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: taxes[2] / 38000 * 100, dp: 1, stem: "Calculate the average rate of tax paid by Household R, to one decimal place.", wrong: [25, 10, 20], explanation: "Tax = (18,000 − 6,000) × 10% + (38,000 − 18,000) × 25% = 1,200 + 5,000 = US\\$6,200. Average rate = 6,200 ÷ 38,000 × 100 = 16.3%." }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: (38000 - 6200) / 5400, dp: 2, stem: "Calculate the ratio of Household R's disposable income to Household P's, to two decimal places.", wrong: [7.04, 2.4, 6.89], explanation: "R: 38,000 − 6,200 = 31,800. P pays no tax, so its disposable income is 5,400. Ratio = 31,800 ÷ 5,400 = 5.89. (Before tax the ratio is 38,000 ÷ 5,400 = 7.04.)" }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why this income tax is progressive and how it affects inequality.",
          points: ["The average tax rate rises with income (0% for P, 6.0% for Q, 16.3% for R).", "So it takes a larger share of income from higher earners.", "The ratio of disposable incomes (5.89) is lower than the ratio of gross incomes (7.04).", "So inequality of disposable income is reduced."],
          modelAnswer: "The average rate of tax rises with income: 0% for P, 6.0% for Q and 16.3% for R, so it takes a larger share from higher earners and is progressive. The ratio of disposable incomes of R to P (5.89) is lower than the ratio of gross incomes (7.04), so inequality of disposable income is reduced." }),
      ],
      explanation: "Q pays US\\$900; R's average rate 16.3%; disposable ratio 5.89 against 7.04 gross; the tax is progressive and narrows inequality." });
  }
  {
    const t2 = table(["Group of households", "Share of national income before tax and transfers (%)", "Share after tax and transfers (%)"], [["Poorest 20%", 5, 8], ["Middle 60%", 50, 54], ["Richest 20%", 45, 38]]);
    chk(45 / 5, 9); chk(38 / 8, 4.75);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Quintile ratio = richest share ÷ poorest share.", "Think about costs and incentives."],
      stem: `**Redistribution in a fictional country (illustrative data)**\n\nThe government taxes high incomes at progressive rates and pays a child grant to families on low incomes. Critics say the grant is expensive and that high tax rates discourage work and investment. Supporters say that it reduces poverty and inequality.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "ratio", value: 45 / 5, dp: 2, stem: "Calculate the quintile ratio before tax and transfers, to two decimal places.", wrong: [0.11, 40, 1], explanation: "45 ÷ 5 = 9.00." }),
        P.num({ label: "(b)", marks: 2, kind: "ratio", value: 38 / 8, dp: 2, stem: "Calculate the quintile ratio after tax and transfers, to two decimal places.", wrong: [4.5, 0.21, 30], explanation: "38 ÷ 8 = 4.75." }),
        P.manual({ label: "(c)", marks: 2, stem: "State two policies, other than those mentioned, that a government could use to reduce income inequality.",
          points: ["A minimum wage.", "State provision of education and health services (or a tax on wealth or inheritance)."],
          modelAnswer: "A minimum wage, and the state provision of education and health services (or an inheritance tax)." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether the redistribution policy in this country has been successful.",
          points: ["The quintile ratio fell from 9.00 to 4.75, so inequality of disposable income fell.", "The poorest fifth's share rose from 5% to 8%, a 60% increase.", "But the policy is costly and may reduce incentives to work and invest, as critics claim.", "A judgement: the policy reduced inequality, but whether it succeeded depends on its cost and on its effect on growth."],
          modelAnswer: "The policy reduced inequality: the quintile ratio fell from 9.00 to 4.75 and the poorest fifth's share rose from 5% to 8%, an increase of 60%. However, the grant is costly and high tax rates may reduce incentives to work and invest, as critics claim. Overall the policy was successful in reducing inequality, but whether it was worthwhile depends on its cost and its effect on economic growth." }),
      ],
      explanation: "Quintile ratio 9.00 before, 4.75 after; the poorest share up 60%; judgement weighs cost and incentives." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both equity and efficiency.", "Reach a judgement."],
    stem: "Assess whether state provision of education is a better way of reducing inequality than cash transfers to poor households.",
    points: ["Education raises the skills and productivity of poor children, and so their future earnings.", "Cash transfers help poor households immediately.", "Education has external benefits for the whole economy.", "Cash transfers give households choice about how to spend the money.", "Education takes many years to reduce inequality; transfers can act quickly.", "Education quality may differ, and children from poor families may drop out.", "Both have opportunity costs and need financing.", "A justified conclusion, for example that a combination works best."],
    levels: LV8,
    modelAnswer: "State provision of education raises the skills and productivity of poor children, so it addresses the cause of low incomes and brings external benefits for the economy. However, it takes many years to reduce inequality, quality may vary, and children from poor households may drop out. Cash transfers raise incomes at once and let households decide how to spend the money, but they only treat the symptom of low income, and need continuing finance. Overall, a combination works best: transfers to deal with immediate poverty and education to reduce inequality in the long run.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh long-run causes against immediate relief; both cost money." });

  b.card("DEFINITION", "Distinguish **income** from **wealth**.", "Income is a flow of money per period (wages, rent, interest, benefits); wealth is a stock of assets owned at a point in time, less debts.");
  b.card("DEFINITION", "What does the **Gini coefficient** measure?", "Inequality: 0 means perfect equality, 1 means one person has all the income; a higher value means more inequality.");
  b.card("DEFINITION", "What is a **progressive tax**?", "A tax whose average rate rises as income rises.");
  b.card("FORMULA", "How do you work out the average rate of income tax?", "Tax paid ÷ income × 100; tax is calculated band by band at the marginal rates.");
  b.card("FORMULA", "How is the quintile ratio found?", "The income share of the richest 20% divided by the share of the poorest 20%.");
  b.card("CONCEPT", "List four causes of inequality of income and wealth.", "Skills and education, ownership of assets, inheritance, discrimination or market power (also age and region).");
  b.card("CONCEPT", "List policies to redistribute income and wealth.", "Progressive income taxes, transfer payments, a minimum wage, taxes on inheritance and capital, and state provision of essential goods and services.");
  b.card("CONCEPT", "What is the difference between universal and means-tested benefits?", "Universal benefits go to everyone eligible by category; means-tested benefits go only to those below an income level, which costs less but is harder to administer.");
  b.card("CONCEPT", "Why can redistribution reduce efficiency?", "High marginal tax rates and benefit withdrawal may reduce incentives to work, save and invest.");
});
