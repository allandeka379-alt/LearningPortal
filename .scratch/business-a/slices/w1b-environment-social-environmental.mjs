// W1b: environment.social-environmental (Cambridge only)
import { concept, P, chk, money, pctChange, invest } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.environment.social-environmental", { file: "environment/social-environmental", keyPrefix: "environment.social-environmental" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Corporate social responsibility (CSR) means that a business",
    ok: ["considers its effect on society and the planet", "Correct: CSR goes beyond owners to society and the planet."],
    bad: [["tries only to maximise the profit of its owners", "That is a narrow profit objective, not CSR."], ["avoids obeying laws that it considers costly", "CSR goes beyond the law; it does not mean ignoring it."], ["stops selling goods to customers who live nearby", "CSR does not require a firm to stop selling to locals."]],
    explanation: "CSR is the acceptance of responsibility for the effects of business decisions on society and the environment.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "An **ageing population** means that",
    ok: ["a higher share of people are in older age groups", "Correct: the average age of the population rises."],
    bad: [["more people are moving from towns to the countryside", "That is a different movement of people (rural migration)."], ["the total population is falling year by year", "A falling population is not the same as an older one."], ["fewer people are being born in the cities", "A change in births alone is not the definition of ageing."]],
    explanation: "An ageing population has a rising proportion of older people.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is an **environmental audit**?",
    ok: ["A review of a firm's likely impact on the local environment", "Correct: it measures energy use, waste and emissions."],
    bad: [["A check of a firm's accounts for errors in its sales figures", "That is a financial audit, not an environmental one."], ["A survey of customers' opinions of a product's colour", "That is market research, not an audit."], ["A meeting at which workers choose the factory's location", "Choosing a location is a business decision, not an audit."]],
    explanation: "An environmental audit measures and reports a firm's effect on the environment.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional furniture firm in Mutare buys timber only from forests that are replanted after cutting. This is an example of",
    ok: ["a sustainable approach to the use of resources", "Correct: replanting allows the supply to continue."],
    bad: [["a decision to ignore the environment completely", "Buying replanted timber shows concern for the environment."], ["a strategy of paying incentives to win contracts", "No payments to win contracts are involved."], ["a change in the age structure of the workforce", "The case concerns materials, not the age of workers."]],
    explanation: "Using resources in a way that can continue is the core of sustainability.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A town's population is becoming older. Which fictional business is **most likely** to benefit?",
    ok: ["A chain of pharmacies and care homes", "Correct: older people need more health products and care."],
    bad: [["A company selling school uniforms", "Fewer children means falling demand for uniforms."], ["A firm making baby clothes", "A fall in the share of young people lowers demand for baby clothes."], ["A shop specialising in skateboards and games", "Demand is strongest among younger people."]],
    hints: ["Think about which goods older people buy more of."],
    explanation: "Ageing raises demand for health care and falls for products aimed at the young.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional mine pays an official to be given a licence in preference to its rivals. Which statement is **most accurate**?",
    ok: ["It is a bribe: illegal and likely to harm its reputation", "Correct: payments to win contracts are corrupt and risky."],
    bad: [["It is a legitimate marketing cost that all firms should pay", "Bribery is not a legitimate marketing cost."], ["It is a social audit that proves the firm is responsible", "A payment to an official is not an audit of any kind."], ["It is an example of sustainable sourcing of materials", "Nothing in the case concerns sourcing or sustainability."]],
    hints: ["Which option describes a payment made to win a contract unfairly?"],
    explanation: "Paying an official for a licence is bribery, an issue of CSR; it is illegal and risks the firm's reputation.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why might a firm decide to make its environmental audit public?",
    ok: ["To show customers that it takes the issue seriously", "Correct: openness builds trust and goodwill."],
    bad: [["To hide details of the firm's energy use", "Publishing reveals information; it does not hide it."], ["To avoid having to take any action on its findings", "Publication usually increases pressure to act."], ["To reduce the number of customers who buy its goods", "Firms publish to attract and keep customers, not to lose them."]],
    hints: ["Think about who reads the audit and what they think of the firm."],
    explanation: "Publishing the audit signals openness and builds trust, although it must be backed by action.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported** judgement on whether a small firm should invest in sustainable equipment?",
    ok: ["It depends on cost, savings, customers' attitudes and the finance available", "Correct: it names the factors on which the decision depends."],
    bad: [["Yes, because sustainable equipment always pays for itself within one year of use", "Payback varies and is rarely this quick in all cases."], ["No, because sustainability has no importance for any business or customer", "Sustainability is increasingly important to customers and regulators."], ["Yes, because small firms never face any cash-flow problems at all in practice", "Small firms often face cash-flow problems; the claim is wrong."]],
    hints: ["Look for the answer that balances costs and benefits and says what the choice depends on."],
    explanation: "A judgement should weigh the cost against the savings and the market and give the conditions that decide the choice.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A pressure group may campaign to change a firm's behaviour by publicity, petitions or boycotts.",
    answer: true,
    explanation: "True. Pressure groups use publicity, petitions, boycotts and lobbying to influence firms and governments.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Corporate social responsibility is satisfied if a firm gives money to charity, whatever else it does.",
    answer: false,
    explanation: "False. CSR concerns how the firm treats workers, customers, the community and the environment in its operations; donations do not excuse harmful behaviour.",
    hints: ["Think about a firm that gives to charity but pollutes."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each demographic term to its meaning.",
    pairs: [["Ageing population", "A rising share of older people"], ["Urbanisation", "A movement of people from the countryside to towns"], ["Migration", "A movement of people from one area or country to another"], ["Population growth", "A rise in the total number of people"]],
    explanation: "Each term describes a different type of demographic change.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A business that uses resources in a way that can continue for future generations is following {{blank:a}}, while criticism that its claims are false and only for show is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sustainability"], choices: ["sustainability", "bribery", "urbanisation"] },
      { id: "b", accepted: ["greenwashing"], choices: ["greenwashing", "auditing", "migration"] },
    ],
    explanation: "Sustainability meets today's needs without harming the future; greenwashing is false or exaggerated environmental claims.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** example of a physical environmental issue that a business might face.",
    accepted: ["pollution", "air pollution", "water pollution", "resource depletion", "waste", "climate change", "deforestation", "global warming", "noise pollution", "emissions"],
    explanation: "Pollution, resource depletion, waste and climate change are physical environmental issues.",
  });

  {
    const pop = 80000, share = 20;
    const n = (pop * share) / 100;
    chk(n, 16000, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional town has a population of ${pop.toLocaleString("en-GB")}. Of these, ${share}% are aged 60 or over. How many people are aged 60 or over?`,
      kind: "plain", unit: "people", value: n, wrong: [pop - n, pop / share],
      explanation: `20% of 80,000 = 80,000 × 20 ÷ 100 = 16,000 people. Taking the other 80% gives 64,000.`,
    });
  }
  {
    const a = 9000, c = 11700;
    const g = pctChange(a, c);
    chk(g, 30, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `The number of people aged 60 or over in a fictional district is expected to rise from ${a.toLocaleString("en-GB")} to ${c.toLocaleString("en-GB")} over ten years. Calculate the percentage increase to one decimal place.`,
      kind: "pct", value: g, wrong: [((c - a) / c) * 100, (c / a) * 100],
      hints: ["Divide the increase by the original number."],
      explanation: `Increase = 11,700 − 9,000 = 2,700. 2,700 ÷ 9,000 × 100 = 30.0%. Dividing by the new figure gives 23.1%.`,
    });
  }
  {
    const cost = 18000, saving = 4500;
    const pb = invest.payback(cost, [saving, saving, saving, saving, saving]);
    chk(pb, 4, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional bakery installs energy-saving ovens costing ${money(cost)}. They save ${money(saving)} a year in fuel, in equal amounts through each year. How many years will it take for the savings to repay the cost? Give your answer to two decimal places.`,
      kind: "years", value: pb, wrong: [cost * saving, saving / cost],
      hints: ["Payback is the cost divided by the yearly saving."],
      explanation: `Payback = 18,000 ÷ 4,500 = 4.00 years. Inverting the ratio gives 0.25.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by corporate social responsibility.",
    points: ["A firm accepts responsibility for the effects of its decisions on society and the environment", "It goes beyond the legal minimum, e.g. fair treatment of workers and care for the environment"],
    modelAnswer: "CSR means that a firm accepts responsibility for the effects of its decisions on society and the environment. It goes beyond the law, for example by treating workers fairly and reducing pollution.",
    explanation: "A definition and its scope beyond the law.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Nyasha owns a fictional tannery near Gweru that releases chemicals into a river used by villagers. Explain **two** ways in which this could harm her business.",
    points: ["Villagers or a pressure group may protest or campaign for a boycott", "Application: customers who hear about the pollution may buy leather elsewhere", "The authorities may impose fines or close the tannery", "Application: a fine or closure reduces profit and may end the business"],
    modelAnswer: "Villagers and pressure groups may protest and call for a boycott, so customers who hear about the pollution may buy leather elsewhere. The authorities may also fine or close the tannery, which would cut profit and could end the business.",
    hints: ["Think about the community and the authorities."],
    explanation: "Two effects, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how an ageing population could affect a fictional supermarket chain.",
    points: ["Demand for health foods, medicines and easy-open packs grows", "The chain may need to change its product range", "Fewer young workers are available for recruitment", "Wage costs may rise as labour becomes scarcer"],
    modelAnswer: "Older customers buy more health foods and medicines, so the chain may change its range and packaging. A smaller proportion of young people means fewer recruits, so labour becomes scarcer and wage costs may rise.",
    hints: ["Consider customers first and workers second."],
    explanation: "Effects on demand and on labour supply.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a business should carry out an environmental audit.",
    points: ["It identifies waste and savings in energy or materials", "It shows customers and regulators that the firm is serious", "It costs money and expert time", "It achieves nothing unless the firm acts on the findings", "Judgement with a reason or condition"],
    modelAnswer: "An audit can identify waste and savings and show customers and regulators that the firm takes the environment seriously. It costs money and time, and it achieves nothing unless the firm acts on the findings. A firm that is exposed to public scrutiny or uses a lot of energy should carry one out, provided that it is willing to act on the results.",
    hints: ["Weigh the benefits against the cost, then add a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Chimanimani Honey sells honey to shops and hotels. The owner, Rudo, is considering buying solar-powered processing equipment for US\\$12,000 that would save US\\$3,000 a year in electricity. A local group has asked her to join an environmental audit of the area. The district's population of 50,000 is ageing: 12% are aged 60 or over now and 15% will be in ten years (population unchanged).",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the payback period of the equipment in years.", kind: "years", value: 12000 / 3000, wrong: [3000 / 12000, 12000 * 3000], explanation: "12,000 ÷ 3,000 = 4.00 years." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the rise in the number of people aged 60 or over in the district over ten years.", kind: "plain", unit: "people", value: (50000 * 15) / 100 - (50000 * 12) / 100, wrong: [(50000 * 15) / 100, 3], explanation: "Now: 12% of 50,000 = 6,000. In ten years: 15% of 50,000 = 7,500. Rise = 1,500." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** benefit to Rudo of taking part in the environmental audit.", points: ["It shows hotels and shops that she cares about the environment", "Application: customers who value sustainable products may buy more of her honey", "It can reveal waste or savings in her production"], modelAnswer: "Taking part shows hotels and shops that Rudo cares about the environment, so customers who value sustainability may buy more of her honey. The audit may also reveal waste or savings in production.", explanation: "A benefit, applied, with a result." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** possible disadvantages of buying the equipment.", points: ["High initial cost of US\\$12,000, which may strain cash flow", "Payback is four years, so benefits are slow"], modelAnswer: "It has a high initial cost of US\\$12,000 that may strain her cash flow, and it takes four years to pay back.", explanation: "Two disadvantages, one mark each." }),
    ],
    hints: ["Use payback = cost divided by yearly saving."],
    explanation: "The payback and the change in population are calculated; the benefits and disadvantages of the sustainable investment are considered.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Mashonaland Fashion makes school and work uniforms in Harare. A pressure group has claimed that a subcontractor used by Mashonaland pays very low wages and uses unsafe equipment. The directors know that a social audit would cost US\\$8,000. They also notice that the number of school-age children in the city is falling as the birth rate drops, while the number of office workers is rising.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the pressure group's claim is a CSR issue for Mashonaland Fashion.", points: ["Mashonaland's responsibility extends to its suppliers' treatment of workers", "Customers may blame Mashonaland for the subcontractor's behaviour", "Low wages and unsafe equipment are issues of fair treatment and safety"], modelAnswer: "Mashonaland's responsibility covers its suppliers, so low wages and unsafe equipment at the subcontractor reflect on it. Customers may blame Mashonaland, and the issues concern the fair treatment and safety of workers.", explanation: "Responsibility extends along the supply chain." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse how the fall in the number of school-age children could affect Mashonaland Fashion.", points: ["Demand for school uniforms falls", "Revenue from this product falls and capacity may be underused", "The firm needs to shift towards work uniforms or other products"], modelAnswer: "With fewer school-age children, demand for school uniforms falls, so revenue from this line falls and machines may be underused. The firm needs to switch towards work uniforms, which are growing.", hints: ["Think about demand for each product."], explanation: "Demographic change leads to a shift in demand." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mashonaland Fashion should pay for the social audit.", points: ["For: it checks the claim and shows seriousness", "For: protects the firm's reputation with schools and employers", "Against: US\\$8,000 is a cost, and the audit might reveal embarrassing facts", "Against: audit does not by itself improve conditions", "Alternative: change subcontractor or require standards in contracts", ["A reasoned recommendation", 2], ["A condition or time-frame", 1]], modelAnswer: "The audit would check the claim and show schools and employers that the firm is serious, which protects its reputation. It costs US\\$8,000 and may reveal problems, and it does nothing unless the firm acts. Changing subcontractor or requiring standards in contracts could be cheaper. Mashonaland should commission the audit because the cost is small compared with the damage that an unchallenged claim could do, provided it is ready to act on the findings and to change supplier if needed.", hints: ["Weigh cost against reputation, mention an alternative and end with a condition."], explanation: "The audit is weighed against its alternatives and a conditional recommendation made.", levels: [[1, 1, 3, "States points for and against with little use of the case."], [2, 4, 6, "Applies the case and weighs the audit against alternatives."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use the details of the case: the subcontractor, the cost and the market."],
    explanation: "A CSR issue is explained, a demographic effect analysed and a decision evaluated.",
  });

  b.card("DEFINITION", "Corporate social responsibility (CSR)", "A firm's acceptance of responsibility for the effects of its decisions on society and the environment, going beyond the law.");
  b.card("DEFINITION", "Social audit", "An independent review of a firm's impact on workers, customers and the community compared with its stated aims.");
  b.card("DEFINITION", "Environmental audit", "A measurement and report of a firm's impact on the environment (energy, waste, emissions, water) to show compliance and plan improvements.");
  b.card("CONCEPT", "Pressure groups", "Groups that campaign to change a firm's behaviour using publicity, petitions, boycotts and lobbying.");
  b.card("FACT", "Types of demographic change", "Ageing population, urbanisation, migration, population growth and a fall in the birth rate.");
  b.card("CONCEPT", "Effect of an ageing population", "More demand for health care, pharmacies and leisure for older people; fewer young workers; possible higher wage costs.");
  b.card("DEFINITION", "Sustainability", "Meeting present needs without damaging the ability of future generations to meet theirs.");
  b.card("CONCEPT", "Costs and benefits of environmental responsibility", "Costs: cleaner equipment and monitoring. Benefits: reputation, lower risk of fines, savings on energy and waste, new customers.");
  b.card("CONCEPT", "Greenwashing", "Making false or exaggerated claims about a firm's environmental performance to improve its image.");
});
