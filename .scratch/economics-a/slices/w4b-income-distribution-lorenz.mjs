// W4b: income distribution, the Lorenz curve and the Gini coefficient (Cambridge A Level only).
import { concept, P, chk, table, lorenz, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.income-distribution-lorenz", { file: "dev/income-distribution-lorenz", keyPrefix: "dev.income-distribution-lorenz" }, (b) => {
  mc(b, [2, "RECALL"], "A Lorenz curve plots",
    ["the cumulative percentage of income against the cumulative percentage of population", "Correct: both cumulative, from poorest to richest."],
    [["income per head against the price level", "That is not a Lorenz curve."],
     ["the percentage of income of each separate group against the size of that group, counted from poorest to richest", "It must be cumulative."],
     ["the Gini coefficient against national income", "The Gini is calculated from the curve."]],
    "The Lorenz curve shows cumulative income shares for the poorest x% of the population.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The line of perfect equality on a Lorenz diagram is a",
    ["45-degree line from the origin", "Correct: x% of the population receives x% of income."],
    [["horizontal line at 50% of income", "That is not equality."],
     ["vertical line at 100% of the population", "That is not equality."],
     ["curve bowed below the diagonal", "That is a Lorenz curve of unequal distribution."]],
    "On the diagonal each percentage of the population has the same percentage of income.");

  mc(b, [2, "UNDERSTANDING"], "A Gini coefficient of 0 would mean that",
    ["income is distributed perfectly equally", "Correct: the Lorenz curve is the diagonal."],
    [["one person receives all the income", "That gives a Gini close to 1."],
     ["half the population receives all the income", "That is inequality."],
     ["there is no income in the economy", "The Gini measures distribution."]],
    "Gini = 0 means perfect equality; Gini = 1 means complete inequality.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A country's Lorenz curve moves closer to the line of perfect equality. This shows that",
    ["income is more equal and the Gini has fallen", "Correct: the area between the curve and the diagonal is smaller."],
    [["average income per head must have risen", "The Lorenz curve says nothing about average income."],
     ["the Gini coefficient has risen as well", "A smaller area means a lower Gini."],
     ["poverty must have been completely eliminated", "People can still be poor in a more equal country."]],
    "The Lorenz curve shows distribution, not the level of income.", { hints: ["What does the curve show and what does it not show?"] });

  mc(b, [3, "APPLICATION"], "The poorest 20% of households receive 6% of income and the next 20% receive 11%. What percentage of income is received by the poorest 40%?",
    ["17%", "Correct: 6 + 11."],
    [["11%", "That is the second quintile only."],
     ["8.5%", "That is the average of the two."],
     ["66%", "That multiplies the shares."]],
    "Cumulative share = 6% + 11% = 17%.", { hints: ["Add the shares, because the Lorenz curve is cumulative."] });

  mc(b, [3, "ANALYSIS"], "Which is a limitation of the Gini coefficient?",
    ["Different Lorenz curves can give the same Gini", "Correct: it is a single summary figure."],
    [["It cannot be calculated from grouped data", "It can."],
     ["It shows the level of income in a country", "It shows only distribution."],
     ["It includes the value of wealth in all cases", "It may be based on income only."]],
    "A single number hides where the inequality lies.", { hints: ["Think about what a single number cannot show."] });

  mc(b, [3, "EVALUATION"], "Between two years a country's Gini coefficient rises from 0.38 to 0.42 although real GDP per head rises. The most accurate conclusion is that",
    ["richer households gained more, but the poor may be better off", "Correct: inequality rose, but absolute incomes may have increased."],
    [["the poor must be worse off in absolute terms than before", "Their incomes may have risen."],
     ["inequality has fallen because average incomes rose", "The Gini rose."],
     ["economic growth always reduces inequality in the end through higher incomes", "This shows it does not."]],
    "A higher Gini with rising average income means unequal gains, not necessarily falling incomes for the poor.", { hints: ["Distinguish inequality from absolute income."] });

  mc(b, [3, "UNDERSTANDING"], "In calculating the Gini coefficient from the area under the Lorenz curve, the Gini equals",
    ["1 minus twice the area under the Lorenz curve", "Correct: since the area under the diagonal is 0.5."],
    [["the area under the Lorenz curve", "That is not the Gini."],
     ["twice the area under the Lorenz curve", "That is not correct."],
     ["1 minus the area under the Lorenz curve", "The factor of 2 is missing."]],
    "Gini = (0.5 − area under the curve) ÷ 0.5 = 1 − 2 × area.", { hints: ["What is the area under the line of perfect equality?"] });

  {
    const g1 = lorenz([10, 14, 18, 23, 35]).gini; chk(roundTo(g1, 3), 0.236);
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", dp: 3, value: g1, calculator: true, hints: ["Find the cumulative shares, then the area under the curve."],
      stem: "A country's five income quintiles (poorest first) receive 10%, 14%, 18%, 23% and 35% of national income. Calculate the Gini coefficient, to three decimal places.",
      wrong: [0.382, 0.472, 0.35],
      explanation: "Cumulative shares: 0.10, 0.24, 0.42, 0.65, 1.00. Area under the Lorenz curve = 0.2 × [(0 + 0.10) + (0.10 + 0.24) + (0.24 + 0.42) + (0.42 + 0.65) + (0.65 + 1.00)] ÷ 2 = 0.382. Gini = 1 − 2 × 0.382 = 0.236." });
    const g2 = lorenz([3, 7, 12, 23, 55]).gini; chk(roundTo(g2, 3), 0.48);
    b.calc({ d: 4, skill: "APPLICATION", kind: "elasticity", dp: 3, value: g2, calculator: true, hints: ["Cumulative shares are 0.03, 0.10, 0.22, 0.45 and 1.00.", "Gini = 1 − 2 × area under the curve."],
      stem: "A country's five income quintiles (poorest first) receive 3%, 7%, 12%, 23% and 55% of national income. Calculate the Gini coefficient, to three decimal places.",
      wrong: [0.26, 0.74, 0.52],
      explanation: "1. Cumulative shares: 0.03, 0.10, 0.22, 0.45, 1.00.\n2. Area under the curve = 0.2 × [(0 + 0.03) + (0.03 + 0.10) + (0.10 + 0.22) + (0.22 + 0.45) + (0.45 + 1.00)] ÷ 2 = 0.2 × 2.60 ÷ 2 = 0.260.\n3. Gini = 1 − 2 × 0.260 = 0.480." });
    const ratio = 55 / 3; chk(roundTo(ratio, 6), 18.333333);
    b.num({ d: 2, skill: "APPLICATION", kind: "times", value: ratio, dp: 1,
      stem: "In the distribution above the richest 20% receive 55% of income and the poorest 20% receive 3%. Calculate how many times larger the share of the richest 20% is than that of the poorest 20%, to one decimal place.",
      wrong: [52, 0.05, 1.8], explanation: "55 ÷ 3 = 18.3 times." });
    const gini = 0.17 / 0.5; chk(gini, 0.34);
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", value: gini, dp: 2, hints: ["Gini = area between the diagonal and the curve ÷ area under the diagonal."],
      stem: "On a Lorenz diagram, measured in units where the whole square has area 1, the area between the line of perfect equality and the Lorenz curve is 0.17. Calculate the Gini coefficient, to two decimal places.",
      wrong: [0.17, 0.66, 0.83], explanation: "The area under the diagonal is 0.5, so Gini = 0.17 ÷ 0.5 = 0.34." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "Two countries with the same Gini coefficient must have the same average income.",
    explanation: "The Gini measures only the distribution of income, not its level." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each description with the Lorenz diagram feature.",
    pairs: [["Line of perfect equality", "The 45-degree diagonal"], ["More unequal distribution", "A Lorenz curve further from the diagonal"], ["Gini coefficient of 1", "One person receives all the income"], ["Gini coefficient of 0", "Every household receives the same income"]],
    explanation: "The diagonal represents equality; the further the curve, the larger the Gini." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The Lorenz curve is drawn using {{blank:a}} percentages of income and population. A curve further from the diagonal shows {{blank:b}} inequality.",
    blanks: [{ id: "a", accepted: ["cumulative"], choices: ["cumulative", "annual", "average"] }, { id: "b", accepted: ["greater"], choices: ["greater", "less"] }],
    explanation: "Cumulative percentages are plotted; a larger gap means more inequality." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the measure of inequality equal to the area between the line of perfect equality and the Lorenz curve divided by the area under the line of perfect equality?",
    accepted: ["gini coefficient", "the gini coefficient", "gini", "gini index"], wrong: ["lorenz curve"],
    explanation: "The Gini coefficient." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Explain what is shown by a Lorenz curve that lies close to the line of perfect equality.",
    points: ["Income is distributed fairly equally among the population", "Each part of the population receives a share of income close to its share of the population"],
    modelAnswer: "A Lorenz curve close to the line of perfect equality shows that income is distributed fairly equally, because each part of the population receives a share of income close to its share of the population.",
    explanation: "Close to the diagonal means a more equal distribution." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of what the Gini leaves out."],
    stem: "Explain two limitations of the Gini coefficient as a measure of inequality.",
    points: ["It is a single figure, so different distributions can have the same Gini.", "It does not show where in the distribution the inequality lies.", "It does not show the level of income or whether the poor are getting better off.", "It depends on how the data are collected (income or wealth, before or after tax, informal incomes)."],
    modelAnswer: "The Gini is a single figure, so different distributions can give the same value and it does not show where in the distribution the inequality lies. It also does not show the level of income or whether the poor are better off, and it depends on how the data are collected, for example whether income is measured before or after tax and whether informal incomes are included.",
    explanation: "Two limitations explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider ownership, skills and policy."],
    stem: "Analyse two reasons why income may be unequally distributed in a developing economy.",
    points: ["Unequal ownership of land and capital means that owners receive rents and profits.", "So a small group receives a large share of income.", "Differences in education and skills lead to large differences in wages.", "Skilled workers in the formal sector earn much more than people in subsistence farming or informal work.", "Weak taxes and transfers do little to redistribute income."],
    modelAnswer: "Ownership of land and capital is unequal, so a small group receives a large share of income as rents and profits. Differences in education and skills also lead to large differences in wages, as skilled workers in the formal sector earn much more than people in subsistence farming or informal work, and weak taxes and transfers do little to redistribute income.",
    explanation: "Ownership, skills, policy." });

  {
    const sh = [6, 11, 16, 24, 43], l = lorenz(sh); chk(roundTo(l.gini, 3), 0.348);
    const t1 = table(["Quintile (poorest first)", "Share of income (%)"], sh.map((v, i) => [String(i + 1), v]), { align: ["l", "r"], dp: [undefined, 1] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the shares to get cumulative shares.", "Gini = 1 − 2 × area under the Lorenz curve."],
      stem: "**Income distribution in Tamba (fictional, illustrative)**\n\n" + t1 + "\n\nHouseholds are divided into five equal groups.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: 6 + 11 + 16, unit: "%", stem: "Calculate the percentage of income received by the poorest 60% of households, to one decimal place.", wrong: [16, 24, 67], explanation: "6 + 11 + 16 = 33%." }),
        P.num({ label: "(b)", marks: 3, type: "CALCULATION", kind: "elasticity", dp: 3, value: l.gini, stem: "Calculate the Gini coefficient, to three decimal places.", wrong: [0.326, 0.652, 0.43], explanation: "Area under the curve = 0.326; Gini = 1 − 2 × 0.326 = 0.348.", workedSolution: "1. Cumulative shares: 0.06, 0.17, 0.33, 0.57, 1.00.\n2. Area = 0.2 × [(0 + 0.06) + (0.06 + 0.17) + (0.17 + 0.33) + (0.33 + 0.57) + (0.57 + 1.00)] ÷ 2 = 0.2 × 3.26 ÷ 2 = 0.326.\n3. Gini = 1 − 2 × 0.326 = 0.348." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two reasons why a government should not judge the success of its policies on poverty by the Gini coefficient alone.",
          points: ["The Gini shows only the distribution of income, not its level.", "Incomes of the poor could rise while the Gini rises, or fall while it falls.", "Different distributions can give the same Gini.", "Measures of poverty (such as the share below a poverty line or the MPI) show the position of the poorest directly."],
          modelAnswer: "The Gini shows only the distribution of income and not its level, so the incomes of the poor could rise while the Gini rises, or fall while it falls. Different distributions can also give the same Gini, so the position of the poorest is better shown directly by measures of poverty such as the share of people below a poverty line or the MPI." }),
      ],
      explanation: "Poorest 60% receive 33%; Gini 0.348; the Gini alone does not show the level of income or the position of the poor." });
  }
  {
    const X = [4, 9, 14, 25, 48], Y = [9, 13, 18, 24, 36];
    const gx = lorenz(X).gini, gy = lorenz(Y).gini; chk(roundTo(gx, 3), 0.416); chk(roundTo(gy, 3), 0.26);
    const yq1 = 1800 * 0.09 / 0.2, xq1 = 3000 * 0.04 / 0.2; chk(roundTo(yq1, 6), 810); chk(roundTo(xq1, 6), 600);
    const t1 = table(["Quintile (poorest first)", "Country X: share of income (%)", "Country Y: share of income (%)"], X.map((v, i) => [String(i + 1), v, Y[i]]), { align: ["l", "r", "r"], dp: [undefined, 1, 1] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Average income of a quintile = national income per head × share ÷ 0.2.", "In (d) compare distribution with the level of income."],
      stem: "**Two countries compared (fictional, illustrative)**\n\nCountry X has a GNI per head of US\\$3,000 and Country Y has a GNI per head of US\\$1,800. Their income distributions are shown below.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "elasticity", dp: 3, value: gx, stem: "Calculate the Gini coefficient of Country X, to three decimal places.", wrong: [0.292, 0.584, 0.48], explanation: "Area under the curve = 0.292; Gini = 1 − 0.584 = 0.416.", workedSolution: "1. Cumulative shares: 0.04, 0.13, 0.27, 0.52, 1.00.\n2. Area = 0.2 × [(0 + 0.04) + (0.04 + 0.13) + (0.13 + 0.27) + (0.27 + 0.52) + (0.52 + 1.00)] ÷ 2 = 0.292.\n3. Gini = 1 − 2 × 0.292 = 0.416." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "elasticity", dp: 3, value: gy, stem: "Calculate the Gini coefficient of Country Y, to three decimal places.", wrong: [0.37, 0.74, 0.32], explanation: "Area under the curve = 0.370; Gini = 1 − 0.740 = 0.260.", workedSolution: "1. Cumulative shares: 0.09, 0.22, 0.40, 0.64, 1.00.\n2. Area = 0.2 × [(0 + 0.09) + (0.09 + 0.22) + (0.22 + 0.40) + (0.40 + 0.64) + (0.64 + 1.00)] ÷ 2 = 0.370.\n3. Gini = 1 − 2 × 0.370 = 0.260." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: yq1, stem: "Calculate the average income per head of the poorest 20% of the population in Country Y, in US dollars.", wrong: [1800, 162, 600], explanation: "Poorest 20% receive 9% of income: 1,800 × 0.09 ÷ 0.20 = US\\$810." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the poorest people in Country X or Country Y have the higher standard of living.",
          points: ["Country X has the higher average income (US\\$3,000 against US\\$1,800) but a higher Gini (0.416 against 0.260).", "The poorest 20% in Y have US\\$810 per head; in X they have 3,000 × 0.04 ÷ 0.20 = US\\$600.", "So the poorest in Y are better off in money terms.", "Averages and the Gini do not show prices, public services, health or the quality of life of the poor.", "Poverty depends on the cost of living and access to services; Gini and income are not enough.", "Judgement."],
          modelAnswer: "Country X has the higher average income, US\\$3,000 against US\\$1,800, but a more unequal distribution (a Gini of 0.416 against 0.260). The poorest 20% in Y receive US\\$810 per head, while in X they receive 3,000 × 0.04 ÷ 0.20 = US\\$600, so the poorest are better off in money terms in Y. However, these figures do not show differences in prices, public services, health or the quality of life, which also determine the living standards of the poor. On the evidence given the poorest in Country Y have the higher living standard, but the conclusion would be stronger with data on prices and services." }),
      ],
      explanation: "Gini X 0.416; Gini Y 0.260; poorest quintile in Y US\\$810 against US\\$600 in X; assess using income level and distribution." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider what the Lorenz curve and Gini show and what they miss."],
    stem: "Assess the usefulness of the Lorenz curve and Gini coefficient for comparing inequality between countries.",
    points: ["The Lorenz curve gives a visual picture of the whole distribution.", "The Gini summarises it in a single figure that can be compared across countries and over time.", "If one curve lies wholly inside another, the ranking is clear.", "Curves can cross and different distributions can have the same Gini.", "Neither shows the level of income.", "Data differences (income or wealth, before or after tax, household size, informal incomes) reduce comparability.", "Other measures (quintile ratios, poverty rates) complement them.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The Lorenz curve gives a visual picture of the whole distribution of income and the Gini summarises it in a single figure which can be compared between countries and over time. If one Lorenz curve lies wholly inside another, the ranking of the two is clear. However, curves can cross and different distributions can have the same Gini, and neither measure shows the level of income, so a poor country and a rich country may have the same Gini. Differences in how the data are collected, for example whether income or wealth is measured, before or after tax, and whether informal incomes are included, also reduce comparability. Other measures such as quintile ratios and poverty rates are therefore needed. Overall the Lorenz curve and Gini are useful for broad comparison but should not be used alone.",
    explanation: "Weigh clarity and comparability against loss of detail and data differences." });

  b.card("DEFINITION", "Define the **Lorenz curve**.", "A curve of the cumulative percentage of income against the cumulative percentage of population, ranked from poorest to richest.");
  b.card("DEFINITION", "Define the **Gini coefficient**.", "The area between the line of perfect equality and the Lorenz curve divided by the area under the line of perfect equality (0 = equality, 1 = complete inequality).");
  b.card("FORMULA", "Gini from the area under the Lorenz curve?", "Gini = 1 − 2 × (area under the Lorenz curve).");
  b.card("CONCEPT", "How does a more unequal distribution change the Lorenz curve?", "The curve bows further from the diagonal.");
  b.card("CONCEPT", "Why use cumulative percentages?", "The Lorenz curve shows what share of income the poorest x% receive.");
  b.card("CONCEPT", "Give two limitations of the Gini coefficient.", "Different distributions can share a Gini; it shows no level of income; data differences reduce comparability.");
  b.card("FACT", "A Gini of 0.30 means what compared with 0.45?", "A more equal distribution of income.");
  b.card("CONCEPT", "Why can the Gini rise while the poor become better off?", "Everyone's income may rise, but the richest gain proportionally more.");
  b.card("CONCEPT", "What other measures complement the Gini?", "Quintile ratios, poverty rates and the Multidimensional Poverty Index.");
});
