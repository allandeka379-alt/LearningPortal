// W1a: opportunity cost (definition, contexts, measurement in goods and money, influence on decisions).
import { concept, P, money, fmt, table } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];

concept("econ.basics.opportunity-cost", { file: "basics/opportunity-cost", keyPrefix: "basics.opportunity-cost" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **opportunity cost**?",
    options: [
      ["The next best alternative forgone when a choice is made", "Correct: the single next best alternative given up."],
      ["The money price paid for the good that is chosen", "The money price is not the opportunity cost; name the alternative given up."],
      ["The total of all the alternatives that were not chosen", "Only the next best alternative counts, not all of them added together."],
      ["The extra cost of producing one more unit of a good", "That is marginal cost, a different idea."],
    ],
    answer: "A",
    explanation: "Opportunity cost is the next best alternative given up (forgone) when a choice is made.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Thandeka has US\\$10. In order of preference she would like a novel, a T-shirt, a meal out and a phone cover. She buys the novel. What is the opportunity cost of her choice?",
    options: [
      ["The T-shirt", "Correct: it was her second choice, the next best alternative."],
      ["The novel", "The novel is what she chose, not what she gave up."],
      ["The meal out and the phone cover", "These are lower-ranked alternatives; only the next best counts."],
      ["The T-shirt, the meal out and the phone cover", "Opportunity cost is not the sum of all alternatives."],
    ],
    answer: "A",
    explanation: "Rank the alternatives. The first choice is taken; the opportunity cost is the second-ranked alternative, the T-shirt.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A government spends its remaining budget on a new bridge instead of a vocational training college, which was its second choice. What is the opportunity cost of the bridge?",
    options: [
      ["The vocational training college", "Correct: it is the next best alternative given up."],
      ["The money spent on the bridge", "The money is the price, not the alternative forgone."],
      ["The taxes paid by citizens", "Taxes are how the spending is financed, not the alternative given up."],
      ["The bridge that was built", "The bridge is what was chosen."],
    ],
    answer: "A",
    explanation: "The opportunity cost of a government decision is the next best project that could have been funded with the same resources.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does opportunity cost exist?",
    options: [
      ["Resources are scarce and have alternative uses", "Correct: using a resource one way means it cannot be used another way."],
      ["Prices are set too high by producers", "Prices do not create opportunity cost; scarcity does."],
      ["Governments tax most goods and services", "Taxes are not the reason; there would be opportunity cost without taxes."],
      ["Consumers have unlimited incomes to spend", "Incomes are limited, which is why choices are needed."],
    ],
    answer: "A",
    explanation: "Opportunity cost follows from scarcity: finite resources with alternative uses mean every choice gives something up.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student leaves a part-time job paying US\\$30 a week to study full-time for 10 weeks before her exams. The course itself is free. What is the opportunity cost of studying, measured in money?",
    options: [
      ["US\\$300 of wages forgone", "Correct: 10 weeks × US\\$30 of earnings given up."],
      ["Nothing, because the course is free", "A zero fee does not mean a zero opportunity cost: earnings are given up."],
      ["US\\$30 of wages forgone", "This is one week only; she studies for 10 weeks."],
      ["US\\$3 of wages forgone", "The weekly wage was divided by 10 instead of multiplied."],
    ],
    answer: "A",
    explanation: "Opportunity cost can be measured as the earnings given up: 10 × US\\$30 = US\\$300, even though the course is free.",
    hints: ["What does she give up each week by studying?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A town council can use a plot of land for a market, a car park or a sports ground. It builds the market. Later it learns that the sports ground would have brought more benefit than the car park. What happens to the opportunity cost of the market?",
    options: [
      ["It is the sports ground, the most valuable alternative given up", "Correct: opportunity cost is the next best alternative, whichever ranks highest after the choice made."],
      ["It is the car park, because it was listed second", "The order of a list is not a ranking; the most valuable alternative forgone counts."],
      ["It is the car park and the sports ground, both of which were given up", "Only the next best alternative counts."],
      ["It is zero, because the market has been built", "Building the market used the plot, so an alternative was given up."],
    ],
    answer: "A",
    explanation: "The opportunity cost is the best alternative that was given up. If the sports ground would have brought more benefit than the car park, it is the next best alternative.",
    hints: ["Which alternative ranks next after the market?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Opportunity cost is the total of all the alternatives that were not chosen.",
    answer: false,
    explanation: "False. Only the next best alternative forgone counts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Attending a free public lecture can still have an opportunity cost.",
    answer: true,
    explanation: "True. The time spent could have been used for the next best activity, for example working or studying, so something is given up even though the price is zero.",
  });
  {
    const ha = 3, maizeYield = 7, gnYield = 1.5;
    const maizeLost = ha * maizeYield, gn = ha * gnYield, perTonne = maizeLost / gn;
    b.num({
      d: 3, skill: "APPLICATION", kind: "plain", value: maizeLost,
      stem: `On a farm near Marondera, one hectare yields ${maizeYield} tonnes of maize or ${gnYield} tonnes of groundnuts. The farmer moves ${ha} hectares from maize to groundnuts. What is the opportunity cost of the groundnuts, in tonnes of maize?`,
      wrong: [gn, maizeYield],
      explanation: `Maize given up = ${ha} hectares × ${maizeYield} tonnes = ${fmt(maizeLost)} tonnes. That is the opportunity cost of the ${fmt(gn)} tonnes of groundnuts gained. Answering ${fmt(gn)} gives the groundnuts gained, not what is given up; answering ${maizeYield} counts one hectare only.`,
      hints: ["Opportunity cost is measured in the good given up.", "Multiply the hectares switched by the maize yield per hectare."],
    });
    b.calc({
      d: 4, skill: "APPLICATION", kind: "plain", value: perTonne, dp: 1, calculator: true,
      stem: `Using the same farm (one hectare yields ${maizeYield} tonnes of maize or ${gnYield} tonnes of groundnuts), calculate the opportunity cost of **one tonne** of groundnuts in tonnes of maize. Give your answer to one decimal place.`,
      wrong: [roundTo1(gn / maizeLost), maizeYield],
      explanation: `1. One hectare gives up ${maizeYield} tonnes of maize to gain ${gnYield} tonnes of groundnuts.\n2. Per tonne of groundnuts: ${maizeYield} ÷ ${gnYield} = ${fmt(perTonne, 4)}.\n3. To one decimal place: **${fmt(perTonne, 1)} tonnes of maize**.\n\nDividing the other way (${gnYield} ÷ ${maizeYield} = ${fmt(gnYield / maizeYield, 2)}) gives the cost of one tonne of maize in groundnuts.`,
      hints: ["Divide the maize given up by the groundnuts gained.", "Check the answer is in tonnes of maize per tonne of groundnuts."],
    });
  }
  {
    const budget = 2400000, borehole = 15000, n = budget / borehole;
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: n, calculator: true,
      stem: `A government can spend ${money(budget)} on resurfacing a road or on drilling boreholes costing ${money(borehole)} each. It chooses the road. How many boreholes is the opportunity cost of the road?`,
      wrong: [n / 10, budget - borehole],
      explanation: `${fmt(budget)} ÷ ${fmt(borehole)} = ${fmt(n)} boreholes. These are the next best alternative given up by choosing the road.`,
    });
  }
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each decision-maker's choice to its opportunity cost.",
    pairs: [
      ["A consumer buys a radio instead of a pair of shoes", "The pair of shoes"],
      ["A worker takes a job as a clerk instead of a job as a driver", "The driver's wages and conditions"],
      ["A firm buys a delivery van instead of a new oven", "The new oven"],
      ["A government builds a dam instead of a hospital", "The hospital"],
    ],
    explanation: "In each case the opportunity cost is the alternative given up, not the item chosen.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Opportunity cost is the {{blank:a}} alternative {{blank:b}} when a choice is made.",
    blanks: [
      { id: "a", accepted: ["next best"], choices: ["next best", "cheapest", "most expensive"] },
      { id: "b", accepted: ["forgone"], choices: ["forgone", "chosen", "produced"] },
    ],
    explanation: "Opportunity cost is the **next best** alternative **forgone** (given up).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Explain how opportunity cost might influence a **firm** deciding whether to spend its savings on a new machine.",
    points: [
      "Identifies the alternative use of the savings (for example opening a new branch or keeping the money in the bank to earn interest).",
      "Explains that the firm compares the expected return of the machine with that next best alternative and buys only if the machine gives more.",
    ],
    explanation: "Firms judge a project against the next best use of the same money: the return given up is the opportunity cost.",
    modelAnswer: "The savings could instead open a second shop. The firm will compare the extra profit expected from the machine with the profit the second shop would earn, and buy the machine only if it is expected to earn more.",
    hints: ["What else could the savings be used for?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Tatenda, aged 16, is deciding whether to leave school and work as a mechanic's assistant or stay on for two more years of study. Analyse the opportunity cost of each choice.",
    points: [
      "Staying at school: gives up two years of wages from the assistant's job.",
      "Staying at school: may lead to higher qualifications and higher lifetime earnings, which is what leaving would give up.",
      "Leaving school: gives up the qualifications and the better-paid jobs they may lead to.",
      "Recognises that the best choice depends on comparing the value of these alternatives (for example the size of the wage gap, his interest in the trade).",
    ],
    explanation: "Each choice has its own opportunity cost: present earnings forgone if he stays, future qualifications and earnings forgone if he leaves.",
    modelAnswer: "If Tatenda stays at school, the opportunity cost is the two years of wages he would have earned as an assistant. If he leaves, the opportunity cost is the A-Level or diploma qualifications he would have gained, which might have led to higher-paid jobs later. He should compare the wages he would earn now with the extra earnings he expects later, and also consider whether he wants to become a mechanic, since the trade itself could later lead to a good income.",
    hints: ["Each option gives up something different.", "Think about earnings now and earnings later."],
  });
  {
    const opts = [["Upgrade the clinic", 340000, 1], ["Build a library", 340000, 2], ["Pave the market square", 340000, 3]];
    const t = table(["Option", "Cost (US\\$)", "Council's ranking"], opts.map(([n, c, r]) => [n, c, r]));
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true,
      stem: `A town council in Masvingo province has ${money(340000)} to spend this year. It has ranked three projects, each costing the full amount:\n\n${t}`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "What is the opportunity cost of upgrading the clinic?",
          options: [
            ["Building the library", "Correct: the library is ranked second, the next best alternative."],
            ["Paving the market square", "This is ranked third; only the next best alternative counts."],
            ["Upgrading the clinic", "This is the project chosen, not the one given up."],
            ["The library and the square together", "The opportunity cost is the next best alternative only."],
          ],
          answer: "A",
          explanation: "The opportunity cost is the second-ranked project: the library.",
        }),
        P.manual({
          label: "(b)", marks: 2,
          stem: "Explain why the council cannot carry out all three projects.",
          points: [
            "Its budget is limited (scarce resources).",
            "The three projects together cost more than the budget, so it must choose.",
          ],
          modelAnswer: `The council's budget of ${money(340000)} is enough for only one project, while residents want all three, so it must choose.`,
        }),
        P.manual({
          label: "(c)", marks: 3,
          stem: "Explain how the idea of opportunity cost could help the council make its decision.",
          points: [
            "It makes the council name what each choice gives up, not just its money cost.",
            "It allows the benefits of the chosen project to be compared with the benefits of the next best project.",
            "The council should choose the project whose benefits are greatest compared with what is given up.",
          ],
          modelAnswer: "Opportunity cost makes the council think about what each choice gives up rather than only its price. If it upgrades the clinic, it gives up the library, so it can compare the health benefits with the learning benefits of the library and choose the project that brings more benefit to residents.",
        }),
        P.manual({
          label: "(d)", marks: 6,
          stem: "Discuss whether upgrading the clinic is the best use of the money.",
          points: [
            "Explains a benefit of the clinic (better health care, fewer working days lost to illness).",
            "Develops the clinic argument (health is a basic need; benefits reach all ages).",
            "Explains a benefit of the library (education, skills, study space for pupils).",
            "Explains a benefit of paving the square (better conditions for traders, more trade, safer in the rainy season).",
            "Notes that the opportunity cost of the clinic is the library's benefits.",
            "Reaches a justified conclusion.",
          ],
          levels: LV6,
          modelAnswer: "Upgrading the clinic would improve health care in the town, so fewer people would lose working days or school days to illness, and health is a basic need for everyone. However, the opportunity cost is the library, which would give pupils a place to study and help raise skills in the long run. Paving the square would help traders, but it is ranked lowest. Because health problems need urgent treatment while the library's benefits come slowly, the clinic is probably the best use this year, as long as the library is planned for a later budget.",
        }),
      ],
      explanation: "The opportunity cost of the first choice is the second-ranked project. Opportunity cost helps a decision-maker compare benefits gained with benefits given up.",
      hints: ["Look at the ranking column.", "In (d), weigh the clinic against what it gives up before concluding."],
    });
  }
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Sipho has a free Saturday. He could work at a car wash in Bulawayo and earn US\\$14, help on his family's plot, or revise for his mock examinations. He decides to revise. His second choice was working at the car wash.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the opportunity cost of Sipho's decision to revise.",
        accepted: ["working at the car wash", "the car wash", "car wash", "working at the car wash and earning US$14", "US$14", "the US$14 he could earn", "14"],
        model: "working at the car wash",
        wrong: ["revising", "helping on the plot"],
        explanation: "His second choice, working at the car wash (and the US\\$14 he would have earned), is the opportunity cost.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why helping on the family plot is **not** part of the opportunity cost.",
        points: [
          "Opportunity cost is only the next best alternative.",
          "Helping on the plot was ranked below the car wash, so it would not have been chosen anyway.",
        ],
        modelAnswer: "Opportunity cost counts only the next best alternative. Sipho ranked the car wash above helping on the plot, so if he had not revised he would have gone to the car wash; the plot was never his next choice.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain whether Sipho made a sensible choice.",
        points: [
          "Revising may improve his examination results.",
          "Better results may lead to further study or a better-paid job, a benefit larger than US\\$14 over time.",
          "Recognises the cost: he gives up US\\$14 now (which may matter if the family needs income).",
        ],
        modelAnswer: "Revising may raise his mock and final results, which could lead to a place at college and higher earnings later, worth far more than US\\$14. The cost is the US\\$14 he gives up now, which might matter if his family needs the money, but for one Saturday close to examinations revising seems sensible.",
      }),
    ],
    explanation: "The opportunity cost is the next best alternative only (the car wash and its US\\$14). A sensible choice compares what is gained with that alternative.",
    hints: ["Which option was ranked second?", "Compare the benefit of revising with what he gives up."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A firm can invest US\\$50,000 in project X (expected profit US\\$8,000), project Y (US\\$6,500) or project Z (US\\$5,000). It chooses project Y. Which statement is correct?",
    options: [
      ["The opportunity cost is the US\\$8,000 profit of project X, so Y was a poor choice", "Correct: X is the best alternative forgone and it would earn more than Y."],
      ["The opportunity cost is the US\\$5,000 profit of project Z, so Y was a good choice", "Z is not the next best alternative to Y: X, which earns more, was also given up."],
      ["The opportunity cost is the US\\$50,000 invested, the same for every project", "The sum invested is the money cost; opportunity cost is the best alternative forgone."],
      ["The opportunity cost is US\\$13,000, the profits of X and Z added together", "Only one alternative could have been chosen, so they are not added."],
    ],
    answer: "A",
    explanation: "Once Y is chosen, the best alternative given up is X, which would have earned US\\$8,000. Because the opportunity cost is greater than Y's own profit, the firm would have done better to choose X.",
    hints: ["After choosing Y, which remaining project is the best?", "Compare Y's profit with that alternative."],
  });

  b.card("DEFINITION", "Define **opportunity cost**.", "The next best alternative forgone (given up) when a choice is made.");
  b.card("CONCEPT", "Why does every choice have an opportunity cost?", "Because resources are scarce and have alternative uses: using them one way means not using them another.");
  b.card("CONCEPT", "Is opportunity cost all the alternatives given up?", "No. It is only the next best (second-ranked) alternative.");
  b.card("CONCEPT", "Does a free event have an opportunity cost?", "Yes. The time and resources used could have been used for the next best alternative.");
  b.card("FORMULA", "How do you find the opportunity cost of one unit of good X in terms of good Y?", "Units of Y given up ÷ units of X gained.");
  b.card("CONCEPT", "Opportunity cost of studying full-time for a worker?", "The wages (and work experience) given up while studying.");
  b.card("CONCEPT", "How does opportunity cost help a government?", "It shows what each project gives up (for example a hospital instead of a dam), so the benefits of alternatives can be compared.");
  b.card("CONCEPT", "What steps find the opportunity cost of a choice?", "List the alternatives, rank them, take the first choice; the opportunity cost is the second-ranked alternative.");
  b.card("FACT", "Is the money price of a good its opportunity cost?", "No. Opportunity cost is the alternative given up, not the price paid.");
});

function roundTo1(v) {
  return Math.round(v * 10) / 10;
}
