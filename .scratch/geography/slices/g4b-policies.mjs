// Slice G4b: population policies (ZIMSEC 7.11.10; Cambridge 6.1.3).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.population.policies", { file: "population/policies", keyPrefix: "population.policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **anti-natalist** population policy?",
    options: [
      ["A policy that aims to reduce the birth rate", "Correct: 'anti' means against, so it discourages births."],
      ["A policy that aims to raise the birth rate", "That is a pro-natalist policy."],
      ["A policy that controls immigration", "Migration policies are a different kind of population policy."],
      ["A policy that moves people to new towns", "That is a population distribution policy."],
    ],
    answer: "A",
    explanation: "Anti-natalist policies try to lower the number of births, for example through family planning.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which measure is part of a **pro-natalist** policy?",
    options: [
      ["Paying a cash bonus for each baby born", "Correct: it encourages couples to have more children."],
      ["Free contraception at clinics", "This helps couples have fewer children (anti-natalist)."],
      ["Raising the legal age of marriage", "Later marriage lowers births (anti-natalist)."],
      ["Fines for families with many children", "Penalties discourage births (anti-natalist)."],
    ],
    answer: "A",
    explanation: "Baby bonuses, child allowances and subsidised childcare are pro-natalist measures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which situation is most likely to lead a government to adopt a pro-natalist policy?",
    options: [
      ["An ageing population with low fertility", "Correct: the workforce will shrink and care costs rise."],
      ["A high dependency ratio of young children", "This leads to anti-natalist policies."],
      ["Rapid growth outpacing school building", "This leads to anti-natalist policies."],
      ["Overgrazing caused by land shortage", "Pressure on land is a reason to reduce growth."],
    ],
    answer: "A",
    explanation: "Low fertility and ageing threaten the future workforce and tax base, so governments try to raise births.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year did China replace its one-child policy with a two-child policy?",
    options: [
      ["2016", "Correct: the two-child policy began in 2016."],
      ["1979", "The one-child policy was introduced in about 1979-1980."],
      ["2021", "2021 was when a three-child policy was announced."],
      ["2000", "No change to the policy was made in 2000."],
    ],
    answer: "A",
    explanation: "One-child policy about 1979-1980; two-child 2016; three-child 2021.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which problem in China is most directly linked to the one-child policy combined with a preference for sons?",
    options: [
      ["Many more boys than girls in some age groups", "Correct: this gender imbalance resulted from son preference."],
      ["A very high infant mortality rate", "Infant mortality in China fell during this period."],
      ["Rapid growth of the young population", "The policy reduced the young population."],
      ["Large-scale emigration of the elderly abroad", "The policy did not cause elderly people to emigrate."],
    ],
    answer: "A",
    explanation: "With only one child allowed, many families wanted a son, which skewed the sex ratio.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which organisation leads family planning services in Zimbabwe?",
    options: [
      ["The Zimbabwe National Family Planning Council", "Correct: the ZNFPC provides contraception, education and advice."],
      ["The Zimbabwe Electricity Supply Authority", "ZESA supplies electricity."],
      ["The Environmental Management Agency", "EMA deals with the environment."],
      ["The Zimbabwe Tourism Authority", "This body promotes tourism."],
    ],
    answer: "A",
    explanation: "The ZNFPC runs clinics and community-based distributors who visit rural homes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What is the '4-2-1' problem?"],
    stem: "Why is the '4-2-1' structure a problem in China?",
    options: [
      ["One child may have to support two parents and four grandparents", "Correct: few young adults support many older relatives."],
      ["Four children compete for the inheritance of one farm", "The policy produced fewer children, not more."],
      ["Four workers share one job between two families", "This is not what 4-2-1 refers to."],
      ["Families must have four children before they are allowed a house", "This was never a rule of the policy."],
    ],
    answer: "A",
    explanation: "Two generations of only children leave one grandchild with up to six older relatives to support.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about what happened when Singapore tried to raise births."],
    stem: "What does Singapore's experience suggest about population policies?",
    options: [
      ["It is easier to lower birth rates than to raise them again", "Correct: fertility stayed very low despite incentives."],
      ["Pro-natalist policies always raise fertility above replacement", "Singapore's fertility stayed well below replacement."],
      ["Anti-natalist campaigns have no effect on fertility", "'Stop at Two' was followed by a fall in fertility."],
      ["Policies never need to change direction", "Singapore did change direction in 1987."],
    ],
    answer: "A",
    explanation: "After 'Stop at Two', fertility fell below replacement and later incentives had only a small effect.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "France is an example of a country with a pro-natalist policy.",
    answer: true,
    explanation: "True. France pays family allowances, gives tax reductions and subsidises childcare to encourage births.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Zimbabwe's family planning programme is based mainly on fines for families with many children.",
    answer: false,
    explanation: "False. Zimbabwe's programme is voluntary and presents family planning as child spacing for the health of mothers and children.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure with the type of policy it belongs to.",
    right: ["Anti-natalist", "Pro-natalist"],
    pairs: ["Community-based distributors of contraception", "Subsidised nursery places", "Long paid parental leave", "Raising the legal age of marriage"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Contraception and later marriage reduce births; childcare and parental leave make it easier to have children.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A total fertility rate of about {{blank:a}} children per woman is needed to replace a population in the long term. Countries well below this level often adopt {{blank:b}} policies.",
    blanks: [
      { id: "a", accepted: ["2.1"], choices: ["2.1", "1.0", "4.5", "6.0"] },
      { id: "b", accepted: ["pro-natalist"], choices: ["pro-natalist", "anti-natalist", "one-child", "migration"] },
    ],
    explanation: "Replacement level is about 2.1; below it, populations eventually shrink, so governments encourage births.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Change ÷ original × 100."],
    stem: "In a fictional country births rose from 512 thousand in the year a baby bonus began to 547 thousand five years later. Calculate the percentage increase in births. Give your answer to one decimal place.",
    value: (35 / 512) * 100, answer: "6.8", tol: 0.05,
    wrong: [35, 6.4],
    workedSolution: "1. Change = 547 − 512 = 35 thousand.\n2. 35 ÷ 512 × 100 = 6.8%.",
    explanation: "35 ÷ 512 × 100 = 6.8%.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fictional country's total fertility rate fell from 6.4 to 3.9 children per woman during a family planning programme. By how many children per woman did it fall?",
    value: 2.5, tol: 0.01,
    wrong: [10.3, 3.9],
    explanation: "6.4 − 3.9 = 2.5 children per woman.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** reasons why a government may adopt an anti-natalist policy.",
    points: [
      "Population growth is faster than the growth of food supply, jobs or services (schools, clinics, housing).",
      "A high dependency ratio of children places a burden on the working population.",
      "Pressure on land and the environment / to improve the health of mothers and children by spacing births.",
    ],
    modelAnswer: "Rapid growth may outpace the building of schools and clinics and the creation of jobs; many young dependants burden the workforce; and pressure on land causes overgrazing and deforestation.",
    explanation: "One mark per distinct reason.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["Think of side effects, not only the birth rate."],
    stem: "Explain **two** negative consequences of China's one-child policy.",
    points: [
      "Gender imbalance: son preference led to many more boys than girls.",
      "Explains a consequence, e.g. many men unable to find wives.",
      "Ageing population / the 4-2-1 problem / shrinking workforce.",
      "Explains a consequence, e.g. few workers to support pensions and care for the elderly; human-rights concerns over forced abortions and sterilisations.",
    ],
    modelAnswer: "Because many families wanted a son, far more boys than girls were born, so many men cannot find wives. The policy also created a rapidly ageing population: one child may have to support two parents and four grandparents, and the workforce paying for pensions is shrinking.",
    explanation: "Two consequences, each explained.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Use one anti-natalist and one pro-natalist example; judge the effect on birth rates."],
    stem: "Evaluate the impacts of anti-natalist and pro-natalist policies on birth rates. Refer to named countries.",
    points: [
      "Anti-natalist example (e.g. China): measures described (one child; bonuses and fines).",
      "Impact: fertility fell sharply / slower growth.",
      "Other factors also lowered births (economic growth, urbanisation, education) so not all due to policy.",
      "Side effects: gender imbalance, ageing, 4-2-1, human-rights concerns.",
      "Pro-natalist example (e.g. France or Singapore): allowances, tax cuts, childcare, leave.",
      "Impact: France relatively high fertility for Europe but below replacement; Singapore still very low; expensive.",
      "Judgement: easier to lower than raise births; voluntary policies with education are fairer.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "China's one-child policy, introduced in about 1979-1980, rewarded couples with one child and fined those with more. Fertility fell sharply and growth slowed, although rapid economic growth and urbanisation would also have lowered births. The policy caused a gender imbalance, an ageing population and human-rights concerns, and even after it was relaxed to two children in 2016 and three in 2021 births stayed low. France's pro-natalist policy of allowances, tax reductions and subsidised childcare has kept fertility among the highest in the EU, but still below replacement, and it is costly. Singapore changed from 'Stop at Two' to encouraging births, yet fertility remains very low. Overall, anti-natalist policies can lower birth rates strongly, but pro-natalist policies have only modest effects, suggesting that it is easier to reduce births than to raise them.",
    explanation: "Two policy types, evidence and a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the total fertility rate (TFR) of a fictional country before and after a pro-natalist policy introduced in Year 0 (fictional data).\n\n| Year | TFR (children per woman) |\n|---|---|\n| −10 | 1.66 |\n| −5 | 1.54 |\n| 0 | 1.43 |\n| 5 | 1.58 |\n| 10 | 1.51 |",
    hints: ["Replacement level is about 2.1.", "Compare Year 5 with Year 10."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the change in TFR between Year 0 and Year 5.", value: 0.15, tol: 0.001, wrong: [1.58, 0.08], explanation: "1.58 − 1.43 = 0.15." }),
      P.num({ label: "(b)", stem: "By how much was the TFR in Year 10 below a replacement level of 2.1?", value: 0.59, tol: 0.001, wrong: [1.51, 0.49], explanation: "2.1 − 1.51 = 0.59." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Using Table 1, evaluate how successful the policy was.",
        points: ["The TFR rose after Year 0 (to 1.58 in Year 5), so the policy had some effect.", "The TFR fell again by Year 10 (1.51): the effect was short-lived / births may only have been brought forward.", "The TFR always stayed well below replacement (2.1), so the policy did not solve the problem."],
        modelAnswer: "The TFR rose from 1.43 to 1.58 after the policy began, but slipped back to 1.51 by Year 10 and stayed far below 2.1, so the policy had only a small, short-lived effect.",
        explanation: "Use data and reach a judgement.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why couples might still have few children despite the policy.",
        points: ["High cost of housing / education / raising children.", "Careers of women / later marriage / changing attitudes to family size."],
        modelAnswer: "Housing and education are expensive, and many women want careers and marry later.",
        explanation: "Reasons outside the policy's control.",
      }),
    ],
    explanation: "This item practises judging a policy from data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540, applies: ZIM,
    stem: "Resource: a district health officer in a fictional rural district of Zimbabwe reports that community-based distributors now visit most villages, and that the average family size of women aged 45-49 has fallen from 6 to 4 children over 25 years (fictional data).",
    hints: ["Is the programme voluntary?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of population policy does this programme represent?",
        options: [
          ["Voluntary anti-natalist", "Correct: it helps couples choose smaller families without penalties."],
          ["Compulsory anti-natalist", "No fines or limits are mentioned."],
          ["Pro-natalist", "It aims to reduce, not raise, family size."],
          ["Migration policy", "It concerns births, not movement."],
        ],
        answer: "A", explanation: "Contraception and advice offered by choice.",
      }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage fall in average family size.", value: (2 / 6) * 100, answer: "33.3", tol: 0.1, wrong: [2, 50], explanation: "(6 − 4) ÷ 6 × 100 = 33.3%." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** benefits of smaller families for households in the district.",
        points: ["Better health of mothers and children through child spacing.", "More money per child for school fees, food and clothing.", "Less pressure on land / less subdivision of plots."],
        modelAnswer: "Spacing births protects mothers' and children's health, parents can afford school fees for every child, and land does not have to be divided into tiny plots.",
        explanation: "Household-level benefits.",
      }),
    ],
    explanation: "This item practises applying policy ideas to a Zimbabwean context.",
  });

  b.card("DEFINITION", "Population policy", "Government measures to influence the size, growth, structure or distribution of a population.");
  b.card("DEFINITION", "Anti-natalist policy", "A policy to reduce the birth rate, e.g. family planning, later marriage, incentives for small families.");
  b.card("DEFINITION", "Pro-natalist policy", "A policy to raise the birth rate, e.g. baby bonuses, child allowances, childcare, parental leave.");
  b.card("CONCEPT", "Reasons for anti-natalist policies", "Growth outpacing food, jobs and services; high child dependency; pressure on land; maternal and child health.");
  b.card("CONCEPT", "Reasons for pro-natalist policies", "Fertility below replacement (about 2.1); ageing; shrinking workforce and tax base.");
  b.card("FACT", "China's one-child policy", "About 1979-1980 to 2015; two-child from 2016, three-child from 2021. Cut births; gender imbalance, ageing, 4-2-1 problem.");
  b.card("FACT", "Family planning in Zimbabwe", "Voluntary, led by the ZNFPC with community-based distributors; fertility fell from over 6 to about 4 (approximate).", undefined, { applies: ZIM });
  b.card("FACT", "France and Singapore", "France: allowances, tax cuts, childcare - relatively high EU fertility. Singapore: 'Stop at Two' then pro-natalist from 1987; still very low.");
  b.card("CONCEPT", "Evaluating a policy", "Did births change? Other causes? Fair and voluntary? Side effects? Cost? Did it last?");
});
