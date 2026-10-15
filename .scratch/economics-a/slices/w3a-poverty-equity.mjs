// W3a: poverty, equity and equality (Cambridge A Level only).
import { concept, P, chk, table, fmt, median, round } from "../lib.mjs";
import { mc, LV5, LV8, LV12 } from "../tables/w3a-kit.mjs";

// NIT: guarantee G, withdrawal rate t.
const nit = (G, t, E) => G - t * E;
chk(nit(2400, 0.3, 3000), 1500); chk(2400 / 0.3, 8000);

concept("aecon.equity.poverty-equity", { file: "equity/poverty-equity", keyPrefix: "equity.poverty-equity" }, (b) => {
  mc(b, [1, "RECALL"], "Relative poverty is best defined as",
    ["income far below that of most people in the same society", "Correct: it compares a person with others in the society."],
    [["income below a fixed amount needed for basic needs", "That is absolute poverty."], ["income that is lower than last year's income", "Relative poverty compares people, not years."], ["income earned only from government benefits", "The source of income does not define relative poverty."]],
    "Relative poverty compares a person's income with a typical income in the same society, for example below 60% of the median.");

  mc(b, [2, "UNDERSTANDING"], "Which statement about equity and equality is correct?",
    ["Equity concerns fairness and may allow unequal outcomes", "Correct: equity is a normative judgement about what is fair."],
    [["Equity and equality always mean exactly the same thing", "They differ: equity is fairness, equality is sameness."], ["Equality means treating people according to their needs", "That is a form of equity, not equality."], ["Equity can be measured exactly without value judgements", "Equity involves normative judgements."]],
    "Equity is about fairness, which can include unequal outcomes (for example by need); equality is sameness.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A person on a low income who earns more finds that most of the extra income is lost in lower benefits and higher tax. This is called",
    ["the poverty trap", "Correct: the high effective marginal rate weakens the incentive to earn more."],
    [["the multiplier effect", "That is the effect of an injection on national income."], ["a regressive tax on wealth", "This is not described in the situation."], ["absolute poverty", "Absolute poverty concerns the level of income, not the loss of benefits as earnings rise."]],
    "The poverty trap arises when benefit withdrawal and tax leave a very small gain from extra earnings.");

  mc(b, [2, "UNDERSTANDING"], "Means-tested benefits differ from universal benefits because they",
    ["are paid only to people whose income is below a set level", "Correct: they are targeted at lower-income households."],
    [["are paid to everyone in a group, whatever their income", "That describes universal benefits."], ["are financed only by borrowing from other countries", "The way of financing does not define the type."], ["are always larger than universal benefits for every person", "The size is not what defines a means test."]],
    "A means test limits payment to those whose income or assets are below a threshold.");

  mc(b, [3, "APPLICATION"], "Under a negative income tax the guaranteed minimum is US\\$2,700 a year and the withdrawal rate is 30%. A person earns US\\$3,500 a year. The payment from the state is",
    ["US\\$1,650", "Correct: 2,700 − 0.30 × 3,500."],
    [["US\\$1,050", "That is 30% of earnings, not the payment."], ["US\\$2,700", "That is the guarantee before it is reduced."], ["US\\$3,750", "That adds the 30% withdrawal to the guarantee."]],
    "Payment = 2,700 − 0.3 × 3,500 = 2,700 − 1,050 = US\\$1,650.", { hints: ["Payment = guarantee − rate × earnings."], calculator: true });

  mc(b, [3, "ANALYSIS"], "A universal basic income differs from a means-tested benefit mainly because it",
    ["is not withdrawn as the recipient's earnings rise", "Correct: this removes the poverty trap."],
    [["costs less to run because fewer people receive it", "A UBI is paid to everyone, so it costs more."], ["is paid only to the unemployed after a work test", "A UBI has no work test."], ["is financed entirely by foreign aid in every country", "Financing is not defined by aid."]],
    "A UBI is paid to all regardless of earnings, so there is no withdrawal and no poverty trap; the cost is higher.", { hints: ["Consider what happens to the payment as earnings rise."] });

  mc(b, [3, "EVALUATION"], "Which is the strongest reason for caution about a large universal basic income in a low-income economy?",
    ["The total cost may be very high compared with government revenue", "Correct: it is paid to everyone, so the gross cost is large."],
    [["It removes all incentive for any person to work again", "Evidence on work incentives is mixed; this is too strong."], ["It would make absolute poverty impossible to measure", "It does not affect measurement."], ["It requires the government to make payments in kind only", "A UBI is normally a cash payment."]],
    "A UBI's gross cost is the payment multiplied by the whole population, which can exceed what a poor country can finance.", { hints: ["Gross cost = payment × number of recipients."] });

  mc(b, [4, "EVALUATION"], "Which statement best describes the relationship between equity and efficiency?",
    ["It depends on how redistribution is carried out and how large it is", "Correct: some policies cost efficiency, others (education) improve it."],
    [["Greater equity always reduces efficiency in every economy", "This is too strong; some policies raise both."], ["Greater equity always increases efficiency in every economy", "This is also too strong; high tax rates may reduce effort."], ["There is no link between the two in any circumstances", "The two are linked through incentives and human capital."]],
    "Policies like education raise both equity and efficiency; high marginal tax rates may trade one for the other.", { hints: ["Which option avoids saying 'always'?"] });

  {
    const inc = [600, 1500, 2100, 2700, 3300, 4500, 6300, 8400, 18000];
    const med = median(inc); chk(med, 3300);
    const rel = 0.6 * med; chk(rel, 1980);
    const below = inc.filter((x) => x < rel).length; chk(below, 2);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: rel, calculator: true, daily: true,
      stem: "Nine households in a fictional town have annual incomes per person (US\\$) of 600, 1,500, 2,100, 2,700, 3,300, 4,500, 6,300, 8,400 and 18,000. The relative poverty line is 60% of the median income. What is the relative poverty line, in US\\$?",
      wrong: [3300, 2700, 3960], explanation: "The median (5th of 9) is US\\$3,300. 60% of 3,300 = US\\$1,980." });
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: below / 9 * 100, dp: 1, calculator: true, hints: ["Count the households with income below the relative poverty line."],
      stem: "In the same town, what percentage of households are in relative poverty (income below US\\$1,980), to one decimal place?",
      wrong: [11.1, 33.3, 18], explanation: "The households with 600 and 1,500 are below US\\$1,980: 2 of 9 = 22.2%." });
    const absLine = 2 * 365; chk(absLine, 730);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "pct", value: 1 / 9 * 100, dp: 1, calculator: true, hints: ["Convert the daily line to a yearly figure first."],
      stem: "The absolute poverty line in the same town is US\\$2 a day. What percentage of the nine households have an annual income per person below this line (take a year as 365 days), to one decimal place?",
      wrong: [22.2, 33.3, 0], explanation: "1. Absolute line = 2 × 365 = US\\$730 a year.\n2. Only the household with US\\$600 is below it: 1 of 9.\n3. Percentage = 1 ÷ 9 × 100 = 11.1%. (22.2% is the relative poverty rate.)" });
  }
  {
    const gain = 80, lost = 44, taxp = 12;
    chk(gain - lost - taxp, 24); chk((lost + taxp) / gain * 100, 70);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: (lost + taxp) / gain * 100, dp: 1, calculator: true, hints: ["Effective marginal rate = (benefits lost + extra tax) ÷ extra earnings."],
      stem: "A worker earns an extra US\\$80. She loses US\\$44 of means-tested benefits and pays US\\$12 more in tax. Calculate the effective marginal tax rate she faces, as a percentage, to one decimal place.",
      wrong: [30, 55, 15], explanation: "Effective rate = (44 + 12) ÷ 80 × 100 = 70.0%. Her net gain is only US\\$24 of the extra US\\$80." });
  }
  {
    const G = 2400, t = 0.3;
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: G / t, calculator: true, hints: ["Break-even income is where the payment falls to zero."],
      stem: "A negative income tax gives a guaranteed minimum of US\\$2,400 a year, reduced by 30 cents for each dollar earned. At what annual income is the payment zero (the break-even income), in US\\$?",
      wrong: [720, 3000, 7200], explanation: "2,400 − 0.3E = 0, so E = 2,400 ÷ 0.3 = US\\$8,000." });
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: 5000 + nit(G, t, 5000), calculator: true, hints: ["Total income = earnings + payment."],
      stem: "Using the same scheme (guarantee US\\$2,400, withdrawal rate 30%), calculate the total income of a person who earns US\\$5,000 a year, in US\\$.",
      wrong: [900, 1500, 6500], explanation: "1. Payment = 2,400 − 0.3 × 5,000 = 2,400 − 1,500 = US\\$900.\n2. Total income = 5,000 + 900 = US\\$5,900. (Earnings of 5,000 alone would be US\\$5,000.)" });
    const ubi = 5e6 * 600 / 1e9; chk(ubi, 3);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: ubi, unit: "US$ billion", calculator: true,
      hints: ["Gross cost = payment × number of adults."],
      stem: "A fictional country has 5 million adults and proposes a universal basic income of US\\$600 a year for each. What is the gross cost, in US\\$ billion?",
      wrong: [0.3, 30, 3000], explanation: "5,000,000 × 600 = US\\$3,000,000,000 = US\\$3 billion." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Absolute poverty can exist in a society even if the incomes of all households are rising.", answer: true,
    explanation: "True. If incomes of the poorest remain below the fixed line, absolute poverty persists; relative poverty also persists if the poorest do not gain faster than the median." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Does a universal benefit have a withdrawal rate?"], stem: "A universal benefit creates a poverty trap because it is withdrawn as earnings rise.", answer: false,
    explanation: "False. A universal benefit is paid regardless of income and is not withdrawn, so it does not create a poverty trap; the trap belongs to means-tested benefits." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Equality", "People receive the same amount"], ["Equity", "A fair distribution, judged by values"], ["Absolute poverty", "Income below a fixed minimum for basic needs"], ["Universal basic income", "A regular payment to every citizen"]],
    explanation: "Equality is sameness; equity is fairness; absolute poverty uses a fixed standard; UBI is paid to all." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A means-tested benefit is {{blank:a}} as earnings rise, which can create a poverty {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["withdrawn"], choices: ["withdrawn", "increased", "taxed"] }, { id: "b", accepted: ["trap"], choices: ["trap", "line", "gap"] }],
    explanation: "Withdrawal of benefits as earnings rise creates the poverty trap." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the scheme in which people below a break-even income receive a payment from the government and those above it pay tax.",
    accepted: ["negative income tax", "NIT", "a negative income tax"], wrong: ["universal basic income"],
    explanation: "A negative income tax." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between absolute poverty and relative poverty.",
    points: ["Absolute poverty is income below a fixed minimum needed for basic needs.", "Relative poverty is income far below that of others in the same society (for example below 60% of the median)."],
    modelAnswer: "Absolute poverty is having an income below a fixed minimum needed for basic needs such as food and shelter, while relative poverty is having an income far below that of others in the same society, for example below 60% of the median income.",
    explanation: "One mark for each definition." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Describe what happens to the benefit and the tax when earnings rise."],
    stem: "Explain how the poverty trap arises.",
    points: ["Means-tested benefits are withdrawn as earnings rise.", "Extra earnings are also taxed.", "So the worker keeps only a small share of each extra dollar (a high effective marginal tax rate).", "This gives little incentive to work more or take a better job, so the person stays poor."],
    modelAnswer: "Means-tested benefits are withdrawn as earnings rise, and the extra earnings are also taxed. The worker therefore keeps only a small share of each extra dollar, which means a high effective marginal tax rate. There is little incentive to work more or take a better job, so the person stays poor.",
    explanation: "Withdrawal, tax, high effective rate, weak incentive." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Give advantages and disadvantages, then a judgement."],
    stem: "Evaluate the use of a universal basic income to reduce poverty.",
    points: ["It gives every citizen a basic income, which reduces absolute poverty directly.", "It is not withdrawn as earnings rise, so there is no poverty trap.", "It is simple and has low administration costs and no stigma.", "The gross cost is very high, because it is paid to everyone, including those who do not need it.", "It would need large tax rises or cuts to other spending, which may reduce incentives or services.", "A judgement, for example that a UBI is more feasible in a richer economy or if set at a modest level."],
    modelAnswer: "A UBI gives every citizen a basic income, which reduces absolute poverty directly, and because it is not withdrawn as earnings rise it avoids the poverty trap. It is simple, cheap to administer and carries no stigma. However, the gross cost is very high since it is paid to everyone, including those who do not need it, and would need large tax rises or cuts in other spending, which may reduce incentives or services. Overall a UBI may be more feasible in a richer economy or at a modest level, while a poorer country might do better with targeted transfers and investment in education.",
    explanation: "Direct effect, no trap, simplicity, cost, financing, judgement." });

  {
    const G = 3500, t = 0.25;
    const E = [0, 6400, 11200, 14000, 22000];
    const pay = E.map((e) => nit(G, t, e));
    chk(pay[1], 1900); chk(pay[2], 700); chk(pay[3], 0); chk(pay[4], -2000);
    const t1 = table(["Earnings (US\\$ a year)", "Payment from (or tax to) the state (US\\$)"], E.map((e, i) => [e, fmt(pay[i])]));
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Total income = earnings + payment.", "Break-even is where the payment is zero."],
      stem: `**A negative income tax in a fictional country (illustrative data)**\n\nThe government proposes a negative income tax. Every adult is guaranteed US\\$3,500 a year and the payment is reduced by 25 cents for every dollar earned. Above the break-even income people pay tax at the same rate.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: G / t, stem: "Calculate the break-even income, in US\\$ a year.", wrong: [875, 3500, 10500], explanation: "3,500 − 0.25E = 0, so E = 3,500 ÷ 0.25 = US\\$14,000." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 6400 + pay[1], stem: "Calculate the total income of a person who earns US\\$6,400 a year, in US\\$.", wrong: [1900, 1600, 8000], explanation: "Payment = 3,500 − 0.25 × 6,400 = US\\$1,900. Total income = 6,400 + 1,900 = US\\$8,300." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: 75, dp: 1, stem: "What percentage of each extra dollar earned does a person below the break-even income keep?", wrong: [25, 100, 0], explanation: "She loses 25 cents of the payment for each dollar earned, so she keeps 75% (75 cents)." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain one advantage and one disadvantage of this scheme compared with means-tested benefits that are withdrawn at 80 cents for each dollar earned.",
          points: ["Advantage: a lower withdrawal rate (25 cents) leaves workers with more of each extra dollar, so the poverty trap is reduced.", "Developed: total income always rises as earnings rise, so work pays.", "Disadvantage: the lower withdrawal rate means payments extend higher up the income scale (break-even US\\$14,000), so the cost is greater.", "Developed: it must be financed by higher taxes or less spending elsewhere, which has an opportunity cost."],
          modelAnswer: "A withdrawal rate of 25 cents leaves workers with 75 cents of each extra dollar, instead of only 20 cents, so the poverty trap is reduced and total income always rises with earnings, so work pays. The disadvantage is that payments extend further up the income scale, to US\\$14,000, so the cost is greater and must be financed by higher taxes or cuts in other spending, which has an opportunity cost." }),
      ],
      explanation: "Break-even US\\$14,000; total income US\\$8,300 at US\\$6,400 earnings; the person keeps 75%; lower withdrawal reduces the trap but raises cost." });
  }
  {
    const t2 = table(["Country Z, annual income per person (US\\$)", "Number of households (thousand)"], [["Below 1,000", 120], ["1,000 to 2,000", 180], ["2,000 to 4,000", 300], ["4,000 to 8,000", 250], ["Above 8,000", 150]]);
    chk(120 + 180 + 300 + 250 + 150, 1000);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Add the households below the line.", "Think about both measures of poverty."],
      stem: `**Poverty in a fictional country (illustrative data)**\n\nAn absolute poverty line is set at an income per person of US\\$2,000 a year. A relative poverty line is set at US\\$2,400 a year.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: (120 + 180) / 1000 * 100, dp: 1, stem: "Calculate the percentage of households in absolute poverty, to one decimal place.", wrong: [12, 18, 48], explanation: "Households below US\\$2,000: 120 + 180 = 300 thousand out of 1,000 thousand = 30.0%." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the percentage of households in relative poverty might be higher than in absolute poverty here.",
          points: ["The relative poverty line (US\\$2,400) is above the absolute line (US\\$2,000).", "So households with incomes between US\\$2,000 and US\\$2,400 are in relative poverty but not in absolute poverty."],
          modelAnswer: "The relative poverty line of US\\$2,400 is above the absolute line of US\\$2,000, so households with incomes between the two lines are in relative poverty but not in absolute poverty." }),
        P.manual({ label: "(c)", marks: 4, stem: "Assess whether means-tested benefits are the best way of helping the households below the poverty lines.",
          points: ["They target the poorest, so cost less than universal benefits.", "They may create a poverty trap if withdrawn rapidly as earnings rise.", "Administration is costly and information on incomes is poor if many are informal.", "A judgement, for example that a simple transfer with a gradual withdrawal or investment in education may be better."],
          modelAnswer: "Means-tested benefits target the poorest households, so they cost less than universal benefits. However, if they are withdrawn rapidly as earnings rise they create a poverty trap, and they are costly to administer and need reliable information on incomes, which is difficult if many people work informally. Overall they are useful if the withdrawal is gradual, but a simple transfer or investment in education may do more to reduce poverty over time." }),
      ],
      explanation: "30.0% below the absolute line; the relative line is higher; means-tested benefits are targeted but create traps and need information." });
  }

  b.ext({ d: 5, skill: "EVALUATION", marks: 12, hints: ["Consider cost, incentives, administration and the context.", "Reach a justified judgement."],
    stem: "Evaluate whether a universal basic income is the best policy for reducing poverty in a developing economy.",
    points: ["A UBI gives a guaranteed income to all, reducing absolute poverty directly.", "It has no means test, so no poverty trap and no stigma.", "Administration costs are low because there is no need to measure incomes, which suits an economy with a large informal sector.", "The gross cost is very high since it is paid to everyone, and revenue in a developing economy is limited.", "The funding may require higher taxes or cuts in other spending such as health and education.", "Cash gives recipients choice and can boost local demand.", "The payment may be too small to lift households out of poverty at an affordable cost.", "Work incentives: evidence is mixed; there is no withdrawal, but some may work less.", "Targeted transfers cost less but need information and may exclude eligible households.", "Investment in education, health and infrastructure raises incomes in the long run.", "Mobile money and registration systems affect how easily payments can be made.", "A justified judgement."],
    levels: LV12,
    modelAnswer: "A UBI gives a guaranteed income to everyone, so it reduces absolute poverty directly, and since there is no means test there is no poverty trap and no stigma. Administration is simple, which suits an economy with a large informal sector where incomes are hard to measure. Cash also gives recipients choice and may raise local demand. However, the gross cost is very high because it is paid to everyone, including those who do not need it, and a developing economy has limited tax revenue; funding it may require higher taxes or cuts in health and education. If the payment is kept affordable it may be too small to lift households out of poverty. Work incentives are uncertain, since there is no withdrawal but some people might work less. Targeted transfers cost less but need information and may exclude eligible households, and investment in education, health and infrastructure raises incomes in the long run. Overall, a modest UBI could work where revenue is adequate and payments can be delivered cheaply, for example by mobile money, but in most developing economies a mix of targeted transfers and investment in basic services is likely to be more affordable and effective.",
    wordLimit: { min: 150, max: 400 },
    explanation: "Weigh simplicity and no trap against cost, size of payment and alternatives." });

  b.card("DEFINITION", "Distinguish **equity** from **equality**.", "Equality is sameness of income or opportunity; equity is fairness, a normative judgement that may allow unequal outcomes (for example by need).");
  b.card("CONCEPT", "How may equity and efficiency conflict?", "High marginal tax rates and large transfers may reduce incentives to work, save and invest; but policies such as education can raise both equity and efficiency.");
  b.card("DEFINITION", "Define **absolute poverty**.", "Income below a fixed minimum needed to meet basic needs such as food, shelter and health.");
  b.card("DEFINITION", "Define **relative poverty**.", "Income far below that of others in the same society, often below 60% of the median income.");
  b.card("DEFINITION", "What is the **poverty trap**?", "A situation in which extra earnings lead to loss of benefits and extra tax, so the effective marginal rate is high and the incentive to escape poverty is weak.");
  b.card("FORMULA", "How do you work out the effective marginal tax rate?", "(Benefits lost + extra tax) ÷ extra earnings × 100.");
  b.card("FORMULA", "What is the formula for a negative income tax?", "Payment = guarantee − (withdrawal rate × earnings); break-even income = guarantee ÷ withdrawal rate.");
  b.card("CONCEPT", "Compare means-tested and universal benefits.", "Means-tested: targeted and cheaper but trap, stigma and administration; universal: simple, no trap, but costs more and pays those who do not need it.");
  b.card("CONCEPT", "Name two strengths and two weaknesses of a universal basic income.", "Strengths: no poverty trap, low administration; weaknesses: very high gross cost, may be too small to remove poverty or reduce work incentives.");
});
