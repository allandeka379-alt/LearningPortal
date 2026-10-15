// W4a: pop.policies (ZIMSEC Form 6; Cambridge AS). Illustrative data; policy facts general and dated. Numbers computed in code.
import { concept, P, t, chk, table, geographyLevels } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const before = 10e6 * 40 / 1000;
const after = 10e6 * 28 / 1000;
const fallPct = chk(((before - after) / before) * 100, 30);
const nextGen = (1.2 / 2.1) * 100; // 57.14
const tfrFall = ((3.4 - 1.1) / 3.4) * 100; // 67.65
const bonusCost = chk((1500 * 12000) / 1e6, 18);
const tabL = table(["Year", "Total fertility rate", "People aged 65 and over (%)"], [[1985, 3.4, 6], [2005, 2.2, 9], [2023, 1.1, 17]]);

concept("ageo.pop.policies", { file: "pop/policies", keyPrefix: "pop.policies" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the aim of an anti-natalist population policy?",
    ok: ["To reduce the birth rate", "Correct: anti-natalist policies discourage births."],
    bad: [["To raise the birth rate", "That is the aim of a pro-natalist policy."], ["To reduce the death rate", "That is the aim of health policy, not natalist policy."], ["To stop all migration", "Migration policy is a different kind of population policy."]],
    explanation: "Natalist policies are about births: anti-natalist lowers them and pro-natalist raises them.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which measure is an example of a pro-natalist policy?",
    ok: ["Paid parental leave and subsidised childcare for families", "Correct: it makes having children easier and so supports higher fertility."],
    bad: [["Free contraceptives and family planning advice at all clinics", "Family planning usually lowers the birth rate."], ["A legal limit on the number of children", "A limit is an anti-natalist measure."], ["A higher minimum age of marriage", "Later marriage tends to lower fertility."]],
    explanation: "Pro-natalist policies reduce the cost or difficulty of raising children, for example through leave, allowances and childcare.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes the view of Malthus?",
    ok: ["Population grows faster than food supply, so famine, disease or war will check it", "Correct: this is the central Malthusian argument."],
    bad: [["Population pressure always leads to new farming methods and rising food output for everyone", "That is the view of Boserup."], ["Population size is unimportant for development", "Malthus believed population was critical."], ["Food supply grows faster than population", "Malthus argued the opposite."]],
    explanation: "Malthus (1798): population grows geometrically, food only arithmetically, so checks are inevitable unless people limit their numbers.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which was a long-term consequence of China's one-child policy?",
    ok: ["Rapid ageing of the population and a smaller workforce", "Correct: a very low fertility rate leads to fewer workers per pensioner."],
    bad: [["A rise in the proportion of children in the population", "The share of children fell."], ["A sharp rise in the birth rate", "The birth rate fell."], ["A fall in the average age of the population", "The population grew older."]],
    explanation: "Low fertility over decades reduces the number of young people and raises the share of older people. A preference for sons also produced an imbalance between boys and girls.",
    hints: ["What happens to the age structure when fertility stays low for decades?"],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why is it difficult to say how much of the fall in China's fertility was caused by the one-child policy?",
    ok: ["Fertility was already falling, and education, incomes and urban living were rising", "Correct: other factors also lower fertility."],
    bad: [["There are no reliable data on fertility in China before or after the policy began", "Data exist; the problem is separating causes."], ["The policy was never enforced", "It was enforced, with penalties and incentives."], ["Fertility has risen since 1980", "It fell to below replacement level."]],
    explanation: "Fertility fell in the 1970s before the policy and continued to fall as incomes, education and urbanisation rose, so the policy's own effect is hard to isolate.",
    hints: ["What else lowers fertility?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which approach to population policy is usually more acceptable and more successful in the long run?",
    ok: ["Voluntary measures such as education and access to family planning", "Correct: they respect choice and work with social change."],
    bad: [["Compulsory sterilisation of large families enforced by local officials", "Coercion is widely condemned and creates resentment."], ["Heavy fines for every extra child", "Penalties are seen as unfair and are hard to enforce."], ["Banning migration of young adults", "This does not address fertility."]],
    explanation: "Voluntary programmes combined with education, health care and women's employment respect rights and have lasting effect.",
    hints: ["Which approach respects people's choices?"],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A country of 10 million people had a crude birth rate of 40 per 1 000 before a family planning programme and 28 per 1 000 afterwards (assume the population stayed constant). Calculate the percentage fall in the number of births a year.",
    value: fallPct, unit: "%", wrong: [12, 120],
    explanation: "Births before = 10 000 000 × 40 ÷ 1 000 = 400 000. Births after = 280 000. Fall = 120 000. Percentage fall = 120 000 ÷ 400 000 × 100 = 30%. Giving 12 uses the difference in rates per 1 000 as a percentage.",
    hints: ["Convert both rates to numbers of births first."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A country has a total fertility rate of 1.2 and the replacement level is 2.1. Ignoring migration, the next generation will be what percentage of the size of the present generation? Give the answer to the nearest whole number.",
    value: nextGen, dp: 0, unit: "%", wrong: [43, 175],
    explanation: "1.2 ÷ 2.1 = 0.571, so the next generation is about 57% of the present one. 43% is the size of the fall, not the size of the next generation.",
    hints: ["Divide the actual TFR by the replacement TFR."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A government pays a baby bonus of US\\$1 500 for each of the 12 000 births a year. Calculate the annual cost, in US\\$ million.",
    value: bonusCost, unit: "US$ million", wrong: [180, 1.8],
    explanation: "1 500 × 12 000 = 18 000 000, which is US\\$18 million.",
    hints: ["Multiply the bonus by the number of births."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Boserup argued that population growth always leads to famine.",
    answer: false,
    explanation: "False. Boserup argued that population pressure stimulates innovation and intensive farming. The argument that growth leads to famine is Malthus's.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country with very low fertility may adopt policies to raise its birth rate.",
    answer: true,
    explanation: "True. Countries worried about ageing and a shrinking workforce adopt pro-natalist policies such as parental leave, childcare and allowances.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure to the type of policy.",
    pairs: [
      ["Free contraceptives at clinics", "Anti-natalist"],
      ["Paid parental leave for both parents", "Pro-natalist"],
      ["Skilled-worker visas to fill labour shortages", "Migration policy"],
      ["Education of girls to secondary level", "Indirect policy affecting fertility"],
    ],
    explanation: "Direct measures target births or migration; education works indirectly through changes in marriage and family size.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "China's one-child policy was replaced by a {{blank:a}}-child policy in 2016 and a {{blank:b}}-child policy in 2021.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["two", "three", "four"] },
      { id: "b", accepted: ["three"], choices: ["two", "three", "four"] },
    ],
    explanation: "China relaxed the limit to two children in 2016 and three in 2021 because of falling fertility and ageing.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes a policy that aims to increase the birth rate?",
    accepted: ["pro-natalist", "pronatalist", "pro natalist"],
    wrong: ["anti-natalist", "migration policy"],
    explanation: "A pro-natalist policy raises births; an anti-natalist policy lowers them.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which writer argued that population pressure stimulates innovation and higher food production?",
    accepted: ["Boserup", "Ester Boserup"],
    wrong: ["Malthus", "Ravenstein"],
    explanation: "Ester Boserup (1965) argued that population pressure leads to more intensive farming and technology.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a government might introduce an anti-natalist policy.",
    points: ["Rapid growth puts pressure on food, water, land and housing", "A large young population requires more schools, clinics and jobs than the country can provide", "Lower fertility improves the health of mothers and children and can raise income per person"],
    modelAnswer: "Rapid growth puts pressure on food, water, land and housing. A large young population needs more schools, clinics and jobs than the country can provide, and lower fertility improves the health of mothers and children and can raise income per person.",
    explanation: "Link growth to resources, services and living standards.",
    hints: ["What does fast growth strain?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the measures used in a named country to encourage people to have more children.",
    points: ["Paid maternity and paternity or parental leave", "Subsidised or free childcare and child allowances or cash bonuses", "Tax relief or flexible working arrangements for parents"],
    modelAnswer: "In Sweden parents share paid parental leave of about 16 months, childcare is subsidised, and child allowances are paid to families. Taxes and flexible working help parents combine work with family life.",
    explanation: "Name the country and give three measures.",
    hints: ["Think of time off, money and childcare."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why pro-natalist policies often have only a small effect on fertility.",
    points: ["The financial support covers only a small part of the high cost of raising a child", "Women's education and employment raise the cost of leaving paid work", "Cultural changes lead to later marriage and smaller families, which incentives do not reverse", "Housing costs and job insecurity discourage couples from having children"],
    modelAnswer: "Cash payments cover only a small part of the high cost of raising a child, and women's education and employment raise the cost of leaving work. Cultural change towards later marriage and smaller families is hard to reverse, and high housing costs and job insecurity also discourage couples from having children.",
    explanation: "Give reasons based on cost, women's roles and social change.",
    hints: ["Compare the size of the incentive with the cost of a child."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two problems caused by a policy that limits family size strictly.",
    points: ["Rapid ageing, with fewer workers supporting many pensioners", "Imbalance between boys and girls where sons are preferred", "Loss of personal freedom and possible coercion, causing resentment", "Many families have a single child who must support parents and grandparents"],
    modelAnswer: "A strict limit leads to rapid ageing, with fewer workers supporting many pensioners, and to an imbalance between boys and girls where sons are preferred. It also removes freedom of choice and can involve coercion, causing resentment.",
    explanation: "Any two valid problems, each developed.",
    hints: ["Think of age structure, gender and rights."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows fertility and ageing in Country L, which adopted a strict anti-natalist policy in 1985 (illustrative data).\n\n${tabL}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage fall in the total fertility rate between 1985 and 2023, to the nearest whole number.", value: tfrFall, dp: 0, unit: "%", wrong: [2.3, 32], explanation: "(3.4 − 1.1) ÷ 3.4 × 100 = 68%. Giving 2.3 is the fall in children per woman, not a percentage; 32 is the 2023 value as a percentage of the 1985 value." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the change in the share of people aged 65 and over.", points: ["It rose from 6% in 1985 to 17% in 2023", "It increased by 3 percentage points by 2005 and then by 8 more by 2023, nearly tripling overall"], modelAnswer: "The share of people aged 65 and over rose from 6% in 1985 to 9% in 2005 and 17% in 2023, so it nearly tripled, and the increase accelerated after 2005.", explanation: "Quote the figures and the trend." }),
      P.mcq({ label: "(c)", marks: 1, stem: "How does the TFR in 2023 compare with the replacement level of about 2.1?", options: [["It is well below replacement level", "Correct: 1.1 is far below 2.1."], ["It is above replacement level, as in a growing population", "1.1 is less than 2.1."], ["It is equal to replacement level", "The values are different."], ["It cannot be compared", "TFR is compared with replacement level directly."]], answer: "A", explanation: "A TFR of 1.1 means each generation will be about 52% of the size of the previous one without migration." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the fall in fertility cannot be attributed to the policy alone.", points: ["Education and employment of women increased and delayed marriage", "Urbanisation and the rising cost of children encouraged smaller families", "Lower infant mortality meant parents needed fewer births, and fertility was already falling before 1985"], modelAnswer: "Women's education and employment grew and delayed marriage. Urbanisation and the rising cost of raising children encouraged smaller families, and lower infant mortality meant parents needed fewer births. Fertility had also begun to fall before 1985.", explanation: "Other factors lower fertility at the same time." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess the economic and social consequences for Country L of the very low fertility.", points: ["A shrinking working-age population reduces output and taxes", "Costs of pensions and health care for older people rise", "Fewer children means falling school rolls and under-used schools", "Judgement: the policy reached its aim, but the long-term costs are serious and may need immigration or a change of policy"], modelAnswer: "A shrinking working-age population reduces output and taxes, while the cost of pensions and health care rises with more older people. School rolls fall. The policy achieved its aim of lower fertility, but the long-term costs are serious and may require immigration or a change of policy.", explanation: "Costs and a judgement." }),
    ],
    explanation: "Calculate a change in fertility and assess a policy's results and consequences.",
    hints: ["Divide the fall in TFR by the 1985 value."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "Country B has a low fertility rate and an ageing population. It offers a baby bonus of US\\$2 400 for each birth. There are 7 500 births a year (illustrative data).",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the annual cost of the bonus, in US\\$ million.", value: bonusCost, unit: "US$ million", wrong: [180, 1.8], explanation: "2 400 × 7 500 = US\\$18 000 000 = US\\$18 million." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What type of policy is the baby bonus?", options: [["Pro-natalist", "Correct: it aims to raise births."], ["Anti-natalist", "It encourages births."], ["A migration policy", "It does not control migration."], ["A mortality policy", "It does not target deaths."]], answer: "A", explanation: "A cash payment for births is a pro-natalist incentive." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the bonus may not raise fertility much.", points: ["US\\$2 400 is small compared with the cost of raising a child to adulthood", "Women's education and careers and later marriage lead to smaller families regardless of payments", "Couples may only change the timing of births, not the total number"], modelAnswer: "US\\$2 400 is small compared with the cost of raising a child to adulthood. Women's education and careers lead to later marriage and smaller families regardless of payments, and couples may only change the timing of births rather than have more.", explanation: "Cost of children, social change and timing effect." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two other measures Country B could use to address an ageing population.", points: ["Encourage skilled immigration to fill labour shortages", "Raise the retirement age or encourage older workers to continue working, or improve childcare and parental leave"], modelAnswer: "Country B could encourage skilled immigration to fill labour shortages, and raise the retirement age or improve childcare and parental leave.", explanation: "Any two valid measures." }),
    ],
    explanation: "Calculate the cost of a pro-natalist measure and evaluate its likely effect.",
    hints: ["Multiply the bonus by the number of births."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the success of China's one-child policy as an attempt to manage population growth. [8]",
    points: [
      "Introduced about 1980 with limits on family size, incentives and penalties",
      "Fertility fell from about 2.7 in 1979 to below replacement level, and growth slowed",
      "Government claims hundreds of millions of births were prevented",
      "Part of the fall would have happened anyway because of falling fertility in the 1970s and rising education, incomes and urbanisation",
      "Costs: rapid ageing, a shrinking workforce and a heavy burden of care on single children (the 4-2-1 problem)",
      "A gender imbalance because of the preference for sons",
      "Human-rights criticism of coercion in some areas, and resentment",
      "Judgement: it achieved its aim of lowering fertility, but the long-term costs were high, and it was relaxed in 2016 and 2021",
    ],
    levels: geographyLevels(8),
    modelAnswer: "China's one-child policy, introduced about 1980, was successful in lowering fertility: the total fertility rate fell from about 2.7 in 1979 to below replacement level and growth slowed, and the government claims that hundreds of millions of births were prevented. However, fertility had already begun to fall in the 1970s and rising education, incomes and urbanisation would have reduced it anyway, so the policy's own effect is smaller than claimed. The costs were high: rapid ageing, a shrinking workforce, a heavy burden on single children who support two parents and four grandparents, and a gender imbalance because of the preference for sons. There was also criticism of coercion. The policy was relaxed in 2016 and 2021. Overall it succeeded in its aim of lowering fertility, but the long-term demographic costs were serious.",
    wordLimit: { max: 300 },
    explanation: "Weigh achievement against other factors and costs, then judge.",
    hints: ["Separate the aim from the long-term consequences."],
  });

  b.card("DEFINITION", "Anti-natalist policy?", "A policy that aims to reduce the birth rate (family planning, education, limits on family size).");
  b.card("DEFINITION", "Pro-natalist policy?", "A policy that aims to raise the birth rate (paid parental leave, childcare, baby bonuses, tax relief).");
  b.card("CONCEPT", "Malthus (1798)?", "Population grows faster than food supply; checks such as famine, disease and war limit numbers unless people restrict births.");
  b.card("CONCEPT", "Boserup (1965)?", "Population pressure stimulates innovation and intensive farming, so food output can rise with population.");
  b.card("FACT", "China's one-child policy: dates?", "Strict limits from about 1980; two-child policy from 2016; three-child policy from 2021.");
  b.card("CONCEPT", "Consequences of China's one-child policy?", "Fertility below replacement, rapid ageing, shrinking workforce, gender imbalance, the 4-2-1 problem, human-rights criticism.");
  b.card("CONCEPT", "Sweden's family policy?", "Paid parental leave of about 16 months shared by both parents, subsidised childcare and allowances; fertility still below replacement.");
  b.card("CONCEPT", "Zimbabwe's family planning approach?", "Voluntary: clinics and community distribution of contraceptives through ZNFPC; fertility fell from over five children per woman in the 1980s to about four in the 2010s.");
  b.card("CONCEPT", "How to evaluate a population policy?", "Compare results with aims; separate the policy's effect from other causes; weigh social costs, rights and long-term consequences.");
});
