// W2b: the business environment, constraints and SWOT.
import { concept, P, BES } from "../lib.mjs";

concept("bus.environment.business-environment", { file: "environment/business-environment", keyPrefix: "environment.business-environment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is part of a business's internal environment?",
    options: [
      ["The skills of its employees", "Correct: employees are inside the business and their training can be controlled."],
      ["The rate of inflation", "Inflation is an external economic factor."],
      ["A new law on business licences", "Laws are external legal factors."],
      ["A drought in the region", "Drought is an external ecological factor."],
    ],
    answer: "A",
    explanation: "The **internal environment** includes owners, employees, management, resources and culture: things the business can control.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "More customers want to pay a hair salon by mobile money. Which PESTLE factor is this mainly an example of?",
    options: [
      ["Technological", "Correct: a change in payment technology."],
      ["Ecological", "Ecological factors concern the natural environment."],
      ["Legal", "No law is involved."],
      ["Political", "No government policy is involved."],
    ],
    answer: "A",
    explanation: "Mobile money is a **technological** change that affects how businesses receive payment.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A drought reduces the maize harvest and raises the price of maize for a milling company. Which external factor is this?",
    options: [
      ["Ecological", "Correct: a natural event affects the supply of raw materials."],
      ["Social", "Social factors concern people's lifestyles and attitudes."],
      ["Technological", "No technology change is involved."],
      ["Legal", "No law is involved."],
    ],
    answer: "A",
    explanation: "Drought is an **ecological** (environmental) factor. Its effect on prices is felt through costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a SWOT analysis, which are external factors?",
    options: [
      ["Opportunities and threats", "Correct: these come from outside the business."],
      ["Strengths and weaknesses", "These are internal."],
      ["Strengths and opportunities", "Strengths are internal."],
      ["Weaknesses and threats", "Weaknesses are internal."],
    ],
    answer: "A",
    explanation: "**Strengths and weaknesses** are internal; **opportunities and threats** are external.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A new tarred road is built to the village where Rudo runs a grocery shop. In her SWOT analysis, where does this belong?",
    options: [
      ["Opportunity", "Correct: an external change that could help her business."],
      ["Strength", "Strengths are internal; the road was built by others."],
      ["Weakness", "A new road is helpful, not harmful, and is external."],
      ["Threat", "It may bring rivals too, but it is mainly a chance to reach more customers and cheaper supplies."],
    ],
    answer: "A",
    hints: ["Is the road inside or outside the business? Helpful or harmful?"],
    explanation: "The road is **external** and **helpful** (easier deliveries and more customers), so it is an **opportunity**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An old delivery van that often breaks down belongs in which part of a SWOT analysis?",
    options: [
      ["Weakness", "Correct: an internal resource problem."],
      ["Threat", "Threats are external; the van belongs to the business."],
      ["Opportunity", "A failing van is harmful, not helpful."],
      ["Strength", "An unreliable van is not a strength."],
    ],
    answer: "A",
    explanation: "Problems with the business's own resources are **weaknesses**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the best example of a social factor affecting a business?",
    options: [
      ["A growing number of young people living in towns", "Correct: population and lifestyle changes are social factors."],
      ["A rise in interest rates on bank loans", "This is an economic factor."],
      ["A new law requiring food-hygiene certificates", "This is a legal factor."],
      ["The arrival of faster internet connections", "This is a technological factor."],
    ],
    answer: "A",
    hints: ["Social factors are about people: population, culture and lifestyles."],
    explanation: "**Social** factors concern population size and structure, culture, lifestyles and urbanisation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a business constraint?",
    options: [
      ["Anything that limits what a business can do", "Correct: e.g. lack of finance or a law."],
      ["A target the business aims to achieve", "That is an objective."],
      ["A document that forms a company", "That is a formation document."],
      ["A payment made to shareholders", "That is a dividend."],
    ],
    answer: "A",
    explanation: "A **constraint** limits the choices of a business: finance, laws, economic conditions, the natural environment or social attitudes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business can control the factors in its external environment.",
    answer: false,
    explanation: "False. External factors (economy, laws, competitors, weather) cannot be controlled; the business can only respond.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Competitors and suppliers are part of a business's external environment.",
    answer: true,
    explanation: "True. They are outside the business, in its immediate (task) environment.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each change with the PESTLE factor it represents.",
    pairs: [
      ["The government changes the rules on imported goods", "Political"],
      ["Inflation raises the price of raw materials", "Economic"],
      ["Customers increasingly prefer healthy food", "Social"],
      ["A new law sets a minimum wage", "Legal"],
      ["Heavy floods damage roads to a factory", "Ecological"],
    ],
    explanation: "PESTLE: Political, Economic, Social, Technological, Legal, Ecological.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "A hardware shop in Masvingo carries out a SWOT analysis. Match each point with its place in the analysis.",
    pairs: [
      ["Staff who give expert advice on building materials", "Strength"],
      ["No computer system to track stock", "Weakness"],
      ["Many new houses being built in the town", "Opportunity"],
      ["A large building-supplies chain plans to open nearby", "Threat"],
    ],
    hints: ["First decide internal or external, then helpful or harmful."],
    explanation: "Internal and helpful = strength; internal and harmful = weakness; external and helpful = opportunity; external and harmful = threat.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In SWOT analysis, S stands for strengths, W for {{blank:a}}, O for opportunities and T for {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["weaknesses", "weakness"] },
      { id: "b", accepted: ["threats", "threat"] },
    ],
    explanation: "Strengths, **Weaknesses**, Opportunities, **Threats**.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the type of analysis that sums up a business's strengths, weaknesses, opportunities and threats.",
    accepted: ["swot", "swot analysis", "a swot analysis"],
    wrong: ["pestle", "pest"],
    explanation: "**SWOT analysis**.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain how **two** economic factors could affect a transport business.",
    points: [
      "Rising fuel prices / inflation.",
      "Raise operating costs, so fares must rise or profit falls.",
      "Higher interest rates / recession / exchange rate changes.",
      "Explains effect, e.g. dearer loans for new vehicles / fewer passengers.",
    ],
    hints: ["Think about costs and demand."],
    modelAnswer: "Inflation, especially rising fuel prices, increases the business's running costs, so it must raise fares or accept lower profit. A recession reduces people's incomes, so fewer people travel and the business carries fewer passengers and goods.",
    explanation: "Economic factors affect both costs and demand.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** benefits to a business of carrying out a SWOT analysis.",
    points: [
      "Shows strengths to build on / weaknesses to fix.",
      "So managers can plan improvements (e.g. train staff, replace equipment).",
      "Identifies opportunities and threats in advance.",
      "So the business can prepare (take new markets, reduce risks) before rivals do.",
    ],
    hints: ["What does the business do with the information?"],
    modelAnswer: "SWOT shows the business's own strengths and weaknesses, so managers know what to build on and what to fix, such as replacing old equipment. It also identifies opportunities and threats early, so the business can act first, for example entering a growing market before rivals or preparing for a new competitor.",
    explanation: "SWOT is a planning tool: it leads to action.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
    stem: "Mai Tariro runs a poultry project near Gweru, selling broiler chickens to butcheries and households. She has ten years' experience and loyal customers, but she keeps few records and her chicken houses are old. A fast-food outlet has asked her to supply 500 chickens a week. The price of chicken feed has risen sharply, and a large commercial poultry producer has started selling cheap frozen chickens in Gweru.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Carry out a SWOT analysis of Mai Tariro's business using the case (one point in each box).",
        points: ["Strength: experience / loyal customers.", "Weakness: few records / old chicken houses.", "Opportunity: fast-food outlet order of 500 a week.", "Threat: rising feed prices / cheap frozen chickens from a large producer."],
        modelAnswer: "Strength: ten years' experience and loyal customers. Weakness: few records and old chicken houses. Opportunity: the fast-food outlet wants 500 chickens a week. Threat: cheap frozen chickens from a large producer (and rising feed prices).",
      }),
      P.mcq({
        label: "(b)", stem: "The rise in the price of chicken feed is an example of which external factor?",
        options: [["Economic", "Correct: a change in input prices."], ["Legal", "No law is involved."], ["Social", "It is not about people's lifestyles."], ["Technological", "No technology change is involved."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the rise in feed prices affects Mai Tariro's business.",
        points: ["Feed is a major cost of raising chickens.", "Costs per chicken rise.", "She must raise prices (hard against cheap frozen chickens) or accept lower profit."],
        modelAnswer: "Feed is one of the biggest costs of raising chickens, so the cost of each bird rises. She must either raise her prices, which is hard when cheap frozen chickens are on sale, or accept a lower profit.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend how Mai Tariro should use her SWOT analysis. Justify your answer.",
        points: [
          "Take the opportunity: accept the fast-food contract (regular, large sales).",
          "Fix weaknesses: start keeping records; repair or expand chicken houses (needed to meet the order).",
          "Respond to threats: stress freshness/quality vs frozen chickens; buy feed in bulk.",
          "Justified priority.",
        ],
        modelAnswer: "She should accept the fast-food contract, because a regular order of 500 chickens a week gives steady income in a market where frozen chickens threaten her ordinary sales. To meet it she must fix her weaknesses: start keeping records so she knows her costs, and repair her chicken houses. Buying feed in bulk with the larger order could reduce the effect of rising feed prices. The contract should come first, because it uses her strengths and protects her against the main threat.",
      }),
    ],
    hints: ["(a) Internal: strengths and weaknesses. External: opportunities and threats."],
    explanation: "(a) S: experience, loyal customers; W: no records, old houses; O: fast-food order; T: feed prices, frozen chickens. (b) Economic. (c) Higher costs squeeze profit. (d) Use the opportunity and fix weaknesses.",
    applies: BES,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A furniture factory in Harare is affected by several external factors: frequent power cuts, a new law requiring all workers to have protective equipment, rising demand for affordable furniture as new houses are built, and cheaper imported furniture.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain how **two** of these external factors could affect the factory.",
        points: [
          "Power cuts: machines stop, output falls / orders delayed / generator costs.",
          "Explains effect on profit or customers.",
          "Second factor (legal / social-economic demand / competition).",
          "Explains effect, e.g. new law raises costs; imports reduce sales.",
        ],
        modelAnswer: "Power cuts stop the machines, so output falls and orders are delivered late, which may lose customers unless the factory buys a generator, which adds to costs. Cheaper imported furniture takes customers away, so the factory may have to cut prices or improve quality.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Which external factor is the most serious for the factory? Justify your answer.",
        points: [
          "Analyses power cuts (affects all production; costly to solve).",
          "Analyses the new law (one-off, modest cost; also improves safety).",
          "Analyses imports (permanent competition on price).",
          "Notes rising demand is an opportunity that may offset threats.",
          "Compares how far the business can respond to each.",
          "Justified judgement.",
        ],
        modelAnswer: "The new safety law costs money but is a one-off cost that also protects workers, so it is not the most serious. Rising demand is an opportunity, not a threat. Cheaper imports are a permanent threat, but the factory can respond with local designs, quick delivery and custom orders that importers cannot offer. Power cuts are the most serious, because when the power is off nothing can be made, so the factory cannot take advantage of the rising demand, and solving the problem with a generator or solar power is expensive. The factory should therefore make reliable power its first priority.",
      }),
    ],
    hints: ["(b) Which factor stops the factory from doing anything else?"],
    explanation: "External factors include economic, legal, social and technological forces. The most serious is the one the business can least easily respond to.",
  });
  b.card("DEFINITION", "What is the **business environment**?", "All the internal and external factors that affect how a business operates and performs.");
  b.card("FACT", "Internal environment factors?", "Owners, employees, management, resources, culture, systems and records.");
  b.card("FACT", "What does **PESTLE** stand for?", "Political, Economic, Social, Technological, Legal, Ecological (environmental).");
  b.card("CONCEPT", "SWOT: internal or external?", "Strengths and weaknesses are internal; opportunities and threats are external.");
  b.card("DEFINITION", "What is a **business constraint**?", "Anything that limits what a business can do (finance, laws, economy, natural environment, social attitudes).");
  b.card("FACT", "Four groups of external constraints (BES)?", "Economic, ecological, social, legal.", undefined, { applies: BES });
  b.card("CONCEPT", "Purpose of SWOT analysis?", "To plan: build on strengths, fix weaknesses, take opportunities, reduce threats.");
  b.card("CONCEPT", "Immediate (task) environment?", "Customers, suppliers and competitors: the external groups a business deals with directly.");
});
