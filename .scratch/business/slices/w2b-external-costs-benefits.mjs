// W2b: external costs and benefits (Cambridge only).
import { concept, P } from "../lib.mjs";

concept("bus.economy.external-costs-benefits", { file: "economy/external-costs-benefits", keyPrefix: "economy.external-costs-benefits" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an external cost?",
    options: [
      ["A cost of a business decision paid by others, not the business", "Correct: e.g. pollution suffered by the community."],
      ["A cost paid by the business for imported materials", "This is a private cost, even if the materials come from abroad."],
      ["The wages a business pays to its workers", "Wages are private costs."],
      ["A cost the business pays to an outside consultant", "The business pays it, so it is private."],
    ],
    answer: "A",
    explanation: "An **external cost** falls on people outside the business, such as neighbours affected by noise or pollution.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A new mine opens near a village. Which is an external benefit?",
    options: [
      ["Villagers find jobs at the mine", "Correct: the benefit goes to people outside the business."],
      ["The mine earns revenue from selling ore", "Revenue is a private benefit."],
      ["The mine pays for new machinery", "This is a private cost."],
      ["Dust from the mine damages crops", "This is an external cost."],
    ],
    answer: "A",
    explanation: "Jobs for local people are an **external benefit**: the community gains from the business's decision.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which is an external cost of a new factory?",
    options: [
      ["Smoke that affects the health of nearby residents", "Correct: residents bear this cost."],
      ["The cost of electricity used by the factory", "The factory pays this: private."],
      ["The rent paid for the factory site", "Rent is a private cost."],
      ["Salaries of the factory managers", "Salaries are private costs."],
    ],
    answer: "A",
    explanation: "Pollution harming residents is an **external cost**; electricity, rent and salaries are **private** costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the social cost of a decision include?",
    options: [
      ["Both the private and the external costs", "Correct: social cost counts every cost of the decision."],
      ["Only the costs paid by the business", "Those are private costs only."],
      ["Only pollution caused by the business", "Pollution is one external cost; social cost includes more."],
      ["Only the costs paid by the government", "Government costs are just one part of external costs."],
    ],
    answer: "A",
    explanation: "**Social cost** = private costs + external costs: every cost of the decision, whoever pays it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Workers at a new factory spend their wages in local shops, which then employ more people. What is this called?",
    options: [
      ["The multiplier effect", "Correct: the first spending creates further rounds of income."],
      ["Diseconomies of scale", "These are rising average costs in very large firms."],
      ["Vertical integration", "This is joining with a supplier or customer."],
      ["Private benefit", "The shops' gains are external to the factory."],
    ],
    answer: "A",
    hints: ["The extra income passes from one business to another."],
    explanation: "The **multiplier effect** spreads the benefit of new jobs through the local economy.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A large supermarket opens in a small town. Which external cost may result?",
    options: [
      ["Small local shops lose customers and may close", "Correct: other businesses bear this cost."],
      ["The supermarket pays for building its store", "This is a private cost."],
      ["Shoppers find a wider choice of goods", "This is a benefit, not a cost."],
      ["The supermarket pays tax to the government", "Tax payments are a private cost and a benefit to the government."],
    ],
    answer: "A",
    hints: ["Who outside the supermarket loses?"],
    explanation: "Loss of trade for small shops is an **external cost** of the supermarket's decision.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On which costs and benefits does a business usually base its decisions?",
    options: [
      ["Private costs and benefits", "Correct: the business considers its own costs and revenue."],
      ["External costs only", "Businesses usually do not pay external costs."],
      ["External benefits only", "External benefits go to others."],
      ["Social costs only", "Social costs include costs the business does not pay."],
    ],
    answer: "A",
    explanation: "Businesses mainly consider **private** costs and benefits, which is why governments regulate external costs.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "When is a project most likely to be good for society as a whole?",
    options: [
      ["When social benefits are greater than social costs", "Correct: all effects, private and external, are counted."],
      ["Whenever the business makes a profit", "Profit ignores external costs."],
      ["When there are no private costs", "Every project has private costs."],
      ["When external costs are greater than external benefits", "This makes the project worse for society."],
    ],
    answer: "A",
    hints: ["Society counts every cost and benefit."],
    explanation: "Society gains when **social benefits exceed social costs**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Wages paid by a business are an example of an external cost.",
    answer: false,
    explanation: "False. Wages are paid by the business, so they are a private cost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A project can be profitable for a business but still be bad for society.",
    answer: true,
    explanation: "True. If external costs such as pollution are very large, social costs can exceed social benefits even though the business makes a profit.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "A new road-side hotel is built. Classify each effect.",
    pairs: [
      ["Revenue from guests", "Private benefit"],
      ["Cost of furniture and beds", "Private cost"],
      ["Jobs for local cleaners and cooks", "External benefit"],
      ["Noise and traffic for nearby homes", "External cost"],
    ],
    explanation: "Private effects fall on the hotel; external effects fall on others.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Social benefit = private benefits + {{blank:a}} benefits. Costs paid by the business itself are {{blank:b}} costs.",
    blanks: [
      { id: "a", accepted: ["external"], choices: ["external", "private", "fixed", "variable"] },
      { id: "b", accepted: ["private"], choices: ["private", "external", "social", "hidden"] },
    ],
    explanation: "Social benefit adds **external** benefits; the business pays **private** costs.",
  });
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Lorries from a new quarry crack the surface of a public road, and the local council must pay for repairs. Is this a private cost or an external cost of the quarry?",
    accepted: ["external", "external cost", "an external cost", "social cost"],
    rejected: ["private", "private cost"],
    wrong: ["private cost"],
    explanation: "The council, not the quarry, pays for the damage, so it is an **external cost**.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "A company plans to build a large brewery on the edge of a town. Explain **two** external costs of this decision.",
    points: [
      "Traffic / congestion / road damage from delivery lorries.",
      "Explains who suffers (residents, road users, local council repairs).",
      "Water use lowering supplies / waste water pollution / smells / noise.",
      "Explains who suffers.",
    ],
    hints: ["Who outside the brewery might be harmed?"],
    modelAnswer: "Delivery lorries will increase traffic and damage roads, so residents face congestion and accidents and the council must pay for repairs. The brewery uses large amounts of water and may release waste water, which could reduce supplies or pollute rivers used by farmers downstream.",
    explanation: "External costs fall on residents, road users, farmers and the environment.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** external benefits of a new clothing factory in a rural town.",
    points: [
      "Jobs for local people.",
      "Raises incomes / reduces unemployment and migration to cities.",
      "Multiplier effect / training / infrastructure / tax revenue.",
      "Explains who gains.",
    ],
    hints: ["Think about jobs and spending in the town."],
    modelAnswer: "The factory creates jobs, so local people earn incomes and fewer have to move to the city for work. Workers spend their wages in local shops and markets, which then gain sales and may employ more people: the multiplier effect.",
    explanation: "External benefits: jobs, multiplier effect, training, infrastructure, tax revenue.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 960,
    stem: "A company wants to build a sugar-processing plant near Chiredzi. A government report lists these expected effects:\n\n- The company will spend heavily on machinery and pay wages to 400 workers.\n- Smoke from burning cane before harvest will drift over nearby villages.\n- Small-scale cane growers will have a buyer for their crop.\n- Heavy lorries will use village roads that were built for light traffic.\n- The company will earn revenue from selling sugar.\n- Local shops expect more customers as workers spend their wages.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which effect in the report is a private benefit?",
        options: [["Revenue from selling sugar", "Correct: the company itself gains it."], ["A buyer for small-scale growers' cane", "The growers gain this: external benefit."], ["More customers for local shops", "The shops gain this: external benefit."], ["Smoke over nearby villages", "This is an external cost."]],
        answer: "A",
      }),
      P.mcq({
        label: "(b)", stem: "Which effect in the report is an external cost?",
        options: [["Heavy lorries on village roads", "Correct: villagers and the council bear the damage."], ["Spending on machinery", "The company pays: private cost."], ["Wages paid to workers", "The company pays: private cost."], ["Revenue from selling sugar", "This is a private benefit."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **one** external cost and **one** external benefit of the plant for the local community.",
        points: [
          "External cost: smoke from burning cane / heavy lorries.",
          "Effect: health problems / damaged roads / accidents.",
          "External benefit: jobs / income for cane growers / more trade for shops.",
          "Effect: higher incomes, spending in local shops (multiplier effect).",
        ],
        modelAnswer: "Smoke from burning cane harms the health of people living nearby and dirties their homes. On the other hand, small-scale growers gain a buyer for their cane, so their incomes rise and they spend more in local shops.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Should the government allow the plant to be built? Justify your answer.",
        points: [
          "External benefits: jobs for 400 workers, income for growers, trade for shops (multiplier).",
          "External costs fall on particular people (villagers breathing smoke, road users).",
          "The business is likely to be profitable, so it will invest if allowed.",
          "Conditions could reduce costs: road upgrades, controls on burning, compensation.",
          "Considers long-term effects (health, jobs) and the size of each effect.",
          "Justified decision.",
        ],
        modelAnswer: "The plant would employ 400 people, give small-scale growers a buyer for their cane and bring more trade to local shops, which is a large benefit in an area with few employers. However, the external costs fall heavily on villagers who breathe the smoke and live beside roads that were not built for heavy lorries. The government should allow the plant on conditions: the company should upgrade the village roads, limit cane burning near homes and contribute to a clinic. With these conditions, the social benefits are likely to be much greater than the social costs.",
      }),
    ],
    hints: ["(a)(b) Ask who gains or pays: the company or others?", "(d) Can the external costs be reduced?"],
    explanation: "(a) Revenue. (b) Road damage. (c) Smoke or lorries vs jobs, grower incomes or shop trade. (d) Allow with conditions that reduce the external costs.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A company plans to build a large shopping centre on open land at the edge of Mutare. The land is used by local people to graze cattle. The centre would include a supermarket, fast-food outlets and a bus terminus.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** groups outside the company that would be affected and how.",
        points: [
          "Cattle owners lose grazing land (external cost).",
          "Must find other land / sell cattle.",
          "Shoppers / job seekers / transport operators / small shops in town centre.",
          "Explains the effect (benefit or cost).",
        ],
        modelAnswer: "Cattle owners lose the land where they graze their animals, so they must travel further or sell cattle. Small shops in the town centre may lose customers to the new supermarket, while job seekers gain new jobs in the shops and fast-food outlets.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate whether the shopping centre would be good for the community overall.",
        points: [
          "Benefits: jobs, wider choice, lower prices, bus terminus improves transport.",
          "Costs: loss of grazing land, traffic, possible closure of small shops.",
          "Who gains and who loses; can losers be compensated (alternative grazing land)?",
          "Short-term construction effects vs long-term effects.",
          "Considers how large each effect is likely to be.",
          "Justified judgement.",
        ],
        modelAnswer: "The centre would create many jobs, give shoppers more choice and lower prices, and a bus terminus would improve transport. However, cattle owners would lose grazing land, traffic would increase, and some small shops in the town centre might close, so their owners and workers would lose income. Overall the centre is likely to benefit more people than it harms, especially if the company helps cattle owners find other grazing land and the council manages traffic. It would be good for the community overall, but only if the losers are helped.",
      }),
    ],
    hints: ["(b) Who gains, who loses, and can the losers be helped?"],
    explanation: "External effects fall on different groups; evaluation weighs their size and whether costs can be reduced or compensated.",
  });
  b.card("DEFINITION", "**Private costs**?", "Costs paid by the business itself (wages, materials, machinery).");
  b.card("DEFINITION", "**External costs**?", "Costs of a business decision paid by others: pollution, noise, congestion, road damage.");
  b.card("DEFINITION", "**External benefits**?", "Benefits of a business decision gained by others: jobs, infrastructure, training, local spending.");
  b.card("CONCEPT", "Social cost and social benefit?", "Social cost: all costs of a decision (private + external). Social benefit: all benefits (private + external).");
  b.card("DEFINITION", "What is the **multiplier effect**?", "New spending (e.g. wages) creates further rounds of income and jobs in the local economy.");
  b.card("FACT", "Examples of private costs and benefits?", "Private costs: wages, materials, machinery, rent. Private benefits: revenue and profit.");
  b.card("CONCEPT", "When is a project good for society?", "When social benefits exceed social costs.");
  b.card("CONCEPT", "How can governments reduce external costs?", "Laws and planning rules, fines and taxes on polluters, conditions on new projects.");
});
