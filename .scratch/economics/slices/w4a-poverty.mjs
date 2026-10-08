// W4a: econ.development.poverty (Cambridge only) — absolute and relative poverty, causes, policies to alleviate
// poverty and redistribute income. Figures differ from the lesson's worked examples.
import { concept, P, table, tax, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.development.poverty", { file: "development/poverty", keyPrefix: "development.poverty" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Absolute poverty is a situation in which",
    options: [
      ["income is too low to buy basic necessities such as food, water and shelter.", "Correct: absolute poverty is measured against basic needs."],
      ["income is below the average income of the society in which a person lives.", "That describes relative poverty."],
      ["a person has no paid job but receives a pension from the government.", "Pensioners may or may not be poor."],
      ["a household spends more than it earns in a month by borrowing money.", "Borrowing is not the definition of poverty."],
    ],
    answer: "A",
    explanation: "Absolute poverty means being unable to meet basic needs; relative poverty compares a person's income with others'.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Relative poverty is usually measured as",
    options: [
      ["income below a set percentage of the median income.", "Correct: for example below 50% or 60% of the median."],
      ["income below the cost of a basic basket of food.", "That is an absolute poverty line."],
      ["the number of people without a paid job.", "That measures unemployment."],
      ["the share of income paid in tax by poor households.", "This does not measure poverty."],
    ],
    answer: "A",
    explanation: "A relative poverty line moves with average income: it is a fraction of the median.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **environmental** cause of poverty?",
    options: [
      ["A drought that destroys a rural family's maize crop", "Correct: natural shocks destroy farm income."],
      ["A factory closing because demand for its products has fallen", "This is an economic cause (unemployment)."],
      ["A worker earning a very low wage in a shop", "This is a cause linked to low wages."],
      ["An elderly person who has no pension", "This is a cause linked to age."],
    ],
    answer: "A",
    explanation: "Droughts, floods and land degradation are environmental causes of poverty, especially for rain-fed farmers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which policy **redistributes** income from richer to poorer households?",
    options: [
      ["A progressive income tax that pays for grants to poor families", "Correct: it takes a larger share from the rich and gives to the poor."],
      ["A cut in the top rate of income tax paid by high earners", "This increases the after-tax income of the rich."],
      ["A rise in the rate of VAT charged on basic foods", "This takes a larger share of poor households' income."],
      ["Charging new fees for using primary schools and clinics", "Fees hit poor households hardest."],
    ],
    answer: "A",
    explanation: "Redistribution uses progressive taxes, transfers and free public services.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Every household's income in a country rises by 10% and prices do not change. What happens to poverty?",
    options: [
      ["Absolute poverty falls, but relative poverty stays the same", "Correct: real incomes rise, but the median rises by the same 10%."],
      ["Both absolute and relative poverty fall", "The relative line rises with the median, so relative poverty is unchanged."],
      ["Relative poverty falls, but absolute poverty stays the same", "This is the wrong way round."],
      ["Neither changes, because prices are unchanged", "Higher real incomes help some households over the absolute line."],
    ],
    answer: "A",
    hints: ["What happens to the median when every income rises by 10%?"],
    explanation: "Some households now afford basic needs (absolute poverty falls), but income is shared exactly as before, so relative poverty is unchanged.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a minimum wage do little to reduce poverty in a country with a large informal sector?",
    options: [
      ["Most poor workers are informal and are not covered by it", "Correct: the law applies to formal employment."],
      ["It reduces the wages of formal-sector workers", "A minimum wage raises the lowest formal wages."],
      ["It increases the number of jobs available in the formal sector", "If anything it may reduce formal jobs."],
      ["It applies only to workers in the government sector", "Minimum wages usually apply to all formal employers."],
    ],
    hints: ["Who is protected by a minimum wage law?"],
    answer: "A",
    explanation: "Informal workers and the unemployed gain nothing; and if set too high, it may reduce formal jobs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which policy is most likely to reduce poverty **permanently** rather than only relieve it?",
    options: [
      ["Free secondary schooling and training for poor children", "Correct: raises skills and future earnings."],
      ["A one-off handout of maize meal to families after a drought", "This relieves hunger now but does not raise future income."],
      ["A temporary cut in the price of fuel lasting for one month", "A short-term effect only."],
      ["A loan to poor households to pay for a family funeral", "This helps with a one-off cost and adds debt."],
    ],
    answer: "A",
    hints: ["Which option raises people's future earning power?"],
    explanation: "Education tackles a root cause of poverty (low skills) and raises lifetime earnings; handouts relieve symptoms.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do poor households pay a larger share of their income in VAT than rich households?",
    options: [
      ["They spend almost all their income, while rich households save part of theirs", "Correct: VAT is paid on spending, not on saving."],
      ["The rate of VAT is higher on goods bought by poor people", "The rate is the same for all buyers."],
      ["Rich households are not allowed to be charged VAT", "Everyone who buys taxed goods pays VAT."],
      ["Poor households pay VAT on their wages before they spend them", "VAT is charged on purchases, not on wages."],
    ],
    answer: "A",
    hints: ["What share of income does each household spend?"],
    explanation: "Because the poor spend a larger share of income, an indirect tax such as VAT takes a larger share of their income: it is regressive.",
  });

  // Numericals.
  const med = 380, frac = 0.5, line = med * frac;
  check("line", line, 190);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: line, daily: true,
    stem: `In a fictional country the median monthly household income is US\\$${med}. A household is counted as relatively poor if its income is below 50% of the median. Calculate the relative poverty line, in US\\$ a month.`,
    wrong: [med * 0.6],
    explanation: `Poverty line = 50% × ${med} = **US\\$${line}** a month. (60% would give US\\$${fmt(med * 0.6)}, a different, higher line.)`,
  });
  const perPerson = 53, size = 5, income = 226, need = perPerson * size, gap = need - income;
  check("need", need, 265); check("gap", gap, 39);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: gap,
    stem: `In a fictional district the cost of basic needs is US\\$${perPerson} per person per month. A household of ${size} people has an income of US\\$${income} a month. Calculate the household's monthly poverty gap (the extra income needed to reach the cost of basic needs), in US\\$.`,
    wrong: [need, perPerson - income / size],
    hints: ["Find the cost of basic needs for the whole household first."],
    explanation: `1. Cost of basic needs = ${perPerson} × ${size} = US\\$${need}.\n2. Poverty gap = ${need} − ${income} = **US\\$${gap}** a month.\n3. ${need} is the total cost, not the gap; ${fmt(perPerson - income / size, 1)} is the gap per person.`,
  });
  const hh = [["A", 160], ["B", 205], ["C", 238], ["D", 310], ["E", 455], ["F", 720], ["G", 980]];
  const medH = hh[3][1], lineH = 0.6 * medH, poorN = hh.filter(([, y]) => y < lineH).length;
  check("medH", medH, 310); check("lineH", lineH, 186); check("poorN", poorN, 1);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: poorN,
    stem: `Seven households in a fictional village have monthly incomes (US\\$) of ${hh.map(([, y]) => y).join(", ")}. A household is relatively poor if its income is below 60% of the median income of the village. How many households are relatively poor?`,
    wrong: [hh.filter(([, y]) => y < 0.6 * (hh.reduce((s, [, v]) => s + v, 0) / hh.length)).length],
    hints: ["The median is the middle value when incomes are in order.", "Then find 60% of it."],
    explanation: `1. The incomes are already in order; the middle (4th) value is the median: US\\$${medH}.\n2. Poverty line = 60% × ${medH} = US\\$${fmt(lineH)}.\n3. Only one household (US\\$${hh[0][1]}) is below US\\$${fmt(lineH)}, so **${poorN}** household is relatively poor.\n4. Using the mean (US\\$${fmt(hh.reduce((s, [, v]) => s + v, 0) / hh.length)}) instead of the median gives a higher line (US\\$${fmt(0.6 * hh.reduce((s, [, v]) => s + v, 0) / hh.length)}) and ${hh.filter(([, y]) => y < 0.6 * (hh.reduce((s, [, v]) => s + v, 0) / hh.length)).length} poor households: the mean is pulled up by the richest households.`,
  });
  const bands = [[300, 0], [900, 20], [Infinity, 40]];
  const yLow = 280, yHigh = 1500, tL = tax.banded(yLow, bands), tH = tax.banded(yHigh, bands), avgH = tax.averageRate(tH, yHigh);
  check("tH", tH, 360); check("avgH", avgH, 24);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "pct", value: avgH, dp: 1, calculator: true,
    stem: `A fictional country's income tax is charged on monthly income: the first US\\$300 is tax-free, income from US\\$300 to US\\$900 is taxed at 20%, and income above US\\$900 at 40%. Calculate the average rate of tax paid by a person earning US\\$${fmt(yHigh)} a month. Give your answer to one decimal place.`,
    wrong: [40, (0.4 * (yHigh - 300) / yHigh) * 100],
    hints: ["Work out the tax in each band, then divide the total by income."],
    explanation: `1. First US\\$300: no tax. Next US\\$600 (300 to 900): 20% × 600 = US\\$120. Remaining US\\$600 (above 900): 40% × 600 = US\\$240.\n2. Total tax = US\\$${tH}.\n3. Average rate = ${tH} ÷ ${fmt(yHigh)} × 100 = **${pct(avgH, 1)}**. A person earning US\\$${yLow} pays US\\$${tL}, so the tax is progressive: the average rate rises with income. 40% is only the top (marginal) rate.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A household can be in relative poverty without being in absolute poverty.",
    answer: true,
    explanation: "True. It may meet its basic needs but still have much less than most people in its society.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If all incomes rise by the same percentage, relative poverty will fall.",
    answer: false,
    explanation: "False. The median rises by the same percentage, so the relative poverty line rises too and the number below it is unchanged.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the cause of poverty it shows.",
    pairs: [
      ["A retrenched factory worker who cannot find another job", "Unemployment"],
      ["A cleaner working full time whose pay does not cover rent and food", "Low wages"],
      ["A farmer too sick to work his fields for most of the season", "Illness"],
      ["A widow aged 78 with no pension or savings", "Age"],
      ["A family whose cattle died in a severe drought", "Environmental factors"],
    ],
    explanation: "The syllabus names unemployment, low wages, illness, age and environmental factors as causes of poverty.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "A tax that takes a larger percentage of income as income rises is {{blank:a}}. A tax that takes a larger percentage of the income of the poor, such as VAT on basic foods, is {{blank:b}}. To reduce inequality a government should rely more on {{blank:c}} taxes.",
    blanks: [
      { id: "a", accepted: ["progressive"], choices: ["progressive", "regressive", "proportional"] },
      { id: "b", accepted: ["regressive"], choices: ["regressive", "progressive", "proportional"] },
      { id: "c", accepted: ["progressive"], choices: ["progressive", "regressive"] },
    ],
    wrong: [["regressive", "progressive", "regressive"]],
    hints: ["Think about the average rate of tax at different incomes."],
    explanation: "Progressive taxes take a rising share as income rises; regressive taxes take a larger share from the poor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of poverty in rural areas of a developing country.",
    points: [
      "Identifies: environmental factors such as drought or floods.",
      "Explains: crops and livestock are lost, so farm income and food fall.",
      "Identifies another: low productivity / lack of credit, land or education / few jobs / illness.",
      "Explains it, e.g. without loans farmers cannot buy fertiliser or irrigation, so yields and incomes stay low.",
    ],
    modelAnswer: "First, many rural households depend on rain-fed farming, so a drought or flood destroys crops and livestock, cutting both food supply and income. Second, small farmers often lack access to credit, so they cannot buy fertiliser, better seed or irrigation equipment; yields stay low and so do their incomes.",
    hints: ["Think about the weather and about what farmers need to raise output."],
    explanation: "Each cause: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of using cash transfers to poor households to reduce poverty.",
    points: [
      "Advantage identified: reaches the poorest directly / immediate effect / households choose what they need.",
      "Advantage explained, e.g. extra income is spent on food and school costs, raising living standards at once.",
      "Disadvantage identified: cost to the government (taxes or borrowing) / poor targeting / may reduce incentive to work / does not remove causes.",
      "Disadvantage explained, e.g. higher taxes or less spending elsewhere; poverty returns if transfers stop.",
    ],
    modelAnswer: "An advantage is that cash transfers reach poor households directly and quickly, and the money is spent on what each family most needs, such as food and school costs. A disadvantage is that they are costly, so the government must raise taxes, borrow or cut other spending; and because they relieve poverty without raising skills or jobs, households fall back into poverty if the payments stop.",
    hints: ["Think about speed and directness, and about cost and long-term effects."],
    explanation: "Advantage: identify (1) + explain (1). Disadvantage: identify (1) + explain (1).",
  });

  // Structured 1: survey data.
  const groups = [["Under US\\$120", 27], ["US\\$120 to US\\$199", 49], ["US\\$200 to US\\$349", 86], ["US\\$350 and over", 138]];
  const tot = groups.reduce((s, g) => s + g[1], 0), medS = 400, lineS = 0.5 * medS;
  const poorS = groups[0][1] + groups[1][1], shareS = (poorS / tot) * 100;
  check("tot", tot, 300); check("lineS", lineS, 200); check("shareS", shareS, 25.3333333);
  const T1 = table(["Monthly household income", "Number of households"], [...groups, ["**Total**", `**${tot}**`]]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `A survey of households in a fictional town gave the results below. The median monthly household income in the country is US\\$${medS}, and the government counts a household as relatively poor if its income is below 50% of the median. The cost of basic needs for an average household is estimated at US\\$120 a month.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: lineS, stem: "Calculate the relative poverty line, in US\\$ a month.", wrong: [medS], explanation: `50% × ${medS} = US\\$${lineS}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: shareS, stem: "Calculate the percentage of surveyed households in relative poverty. Give your answer to one decimal place.", wrong: [(groups[0][1] / tot) * 100, poorS], explanation: `Below US\\$200: ${groups[0][1]} + ${groups[1][1]} = ${poorS}; ${poorS} ÷ ${tot} × 100 = ${pct(shareS, 1)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "plain", value: groups[0][1], stem: "How many of the surveyed households are in absolute poverty, on the cost-of-basic-needs measure?", wrong: [poorS], explanation: `Households below US\\$120 = ${groups[0][1]}.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain why more households are in relative poverty than in absolute poverty in this town.",
        points: [
          "The relative line (US$200) is above the cost of basic needs (US$120).",
          "Households with incomes between US$120 and US$199 can meet basic needs but are well below the average.",
          "So they are relatively poor but not absolutely poor.",
        ].map((x) => x.replace(/US\$/g, "US\\$")),
        modelAnswer: "The relative poverty line of US\\$200 is higher than the US\\$120 cost of basic needs. The households earning between US\\$120 and US\\$199 can afford basic necessities, so they are not absolutely poor, but they earn far less than most households in the country, so they are relatively poor.",
        explanation: "Compare the two lines.",
      }),
      P.manual({
        label: "(e)", marks: 5, levels: LV(5),
        stem: "Discuss whether providing free healthcare is the best way to reduce poverty in this town.",
        points: [
          "For: illness is a major cause of poverty; free care keeps workers healthy and productive and avoids costly medical bills.",
          "For: benefits the poorest most, since they could not otherwise afford care: it redistributes real income.",
          "Against: costly to provide (taxes/borrowing); does not create jobs or raise wages; may not reach remote households.",
          "Alternatives: cash transfers act faster; education and job creation tackle unemployment and low wages; help for small businesses.",
          "Justified conclusion, e.g. free healthcare is valuable but a combination is needed, depending on the main causes of poverty in the town.",
        ],
        modelAnswer: "Free healthcare would help, because illness is a major cause of poverty: sick workers lose earnings and medical bills drain savings. Free care benefits the poorest households most, so it redistributes real income. However, it is costly for the government, and it does nothing directly about unemployment or low wages, which may be the main reasons for the 76 households below the relative line. Cash transfers would raise incomes faster, while education and job creation would raise earnings permanently. Free healthcare is an important part of an anti-poverty strategy, but it is unlikely to be the best single policy; the government should combine it with policies aimed at jobs and skills.",
        explanation: "Weigh benefits and costs of free healthcare against alternatives; conclude.",
      }),
    ],
    hints: ["The relative line is a percentage of the median.", "The absolute line is the cost of basic needs."],
    explanation: `Relative line US\\$${lineS}; ${poorS} of ${tot} households (${pct(shareS, 1)}) are relatively poor; ${groups[0][1]} are absolutely poor.`,
  });

  // Structured 2: policy choice.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional government wants to reduce poverty. It is considering two policies: (1) raising the national minimum wage by a large amount; (2) giving small farmers loans and training to irrigate their land. Most poor people in the country are small farmers and informal traders.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "A minimum wage law usually protects informal traders as well as formal employees.",
        answer: false,
        explanation: "False. Informal traders are self-employed or unregistered, so they are not covered.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how loans and training for small farmers could reduce poverty.",
        points: ["Farmers can invest in irrigation, seed and fertiliser, raising yields.", "Higher and more reliable output raises their income, including in dry years."],
        modelAnswer: "With loans and training, farmers can buy irrigation equipment, better seed and fertiliser, so yields rise. Irrigation also protects them against drought, so their incomes become higher and more reliable.",
        explanation: "Investment → higher, more reliable output → higher income.",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss which of the two policies would be more effective in reducing poverty in this country.",
        points: [
          "Minimum wage: raises the pay of low-paid formal workers quickly.",
          "But most poor people are farmers and informal traders, who are not covered; a large rise may reduce formal jobs.",
          "Farm loans and training: reach the largest poor group; raise productivity and income; reduce vulnerability to drought.",
          "But: take time; risk of loan default; need water sources and markets; cost to government.",
          "Justified conclusion: farm support is likely to be more effective here, as it reaches most of the poor.",
        ],
        modelAnswer: "A large rise in the minimum wage would quickly raise the pay of low-paid formal workers. However, most poor people are small farmers and informal traders, whom the law does not cover, and if the rise is large some employers may cut jobs, pushing people into poverty. Loans and training for small farmers reach the largest group of poor people and raise their productivity and income, while irrigation protects them from drought. They take time to work, some loans may not be repaid, and farmers need water and markets for their crops. Because most of the poor are farmers, the farm programme is likely to be more effective, especially if combined with access to markets.",
        explanation: "Compare who each policy reaches and its side effects; conclude.",
      }),
    ],
    hints: ["Who are the poor in this country?"],
    explanation: "Policies work only if they reach the poor: a minimum wage misses farmers and informal traders.",
  });

  b.card("DEFINITION", "Define **absolute poverty**.", "Income too low to buy the basic necessities of life: food, clean water, shelter, clothing and basic healthcare.");
  b.card("DEFINITION", "Define **relative poverty**.", "Income well below the average of the society, often below 50% or 60% of median income.");
  b.card("CONCEPT", "Name five causes of poverty.", "Unemployment, low wages, illness, age, environmental factors (also lack of education, assets and credit).");
  b.card("CONCEPT", "Give three policies that raise the incomes of the poor.", "Economic growth; education and training; healthcare; minimum wage; credit and training for small producers.");
  b.card("CONCEPT", "Give three ways to redistribute income.", "Progressive taxes; transfer payments (grants, pensions); free or subsidised public services; lower taxes on necessities.");
  b.card("FACT", "Does growth reduce relative poverty?", "Not necessarily: if all incomes rise at the same rate, the median rises too and relative poverty is unchanged.");
  b.card("CONCEPT", "Why is VAT on basic foods regressive?", "The poor spend almost all their income, much of it on food, so the tax takes a larger share of their income.");
  b.card("CONCEPT", "Limit of a minimum wage as an anti-poverty policy?", "It does not cover informal workers or the unemployed, and if set too high it may reduce formal jobs.");
  b.card("DEFINITION", "What is a **poverty line**?", "The income level below which a person or household is counted as poor (absolute: cost of basic needs; relative: a fraction of median income).");
});
