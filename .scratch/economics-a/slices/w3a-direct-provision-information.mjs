// W3a: direct provision and the provision of information (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, chk, table, fmt } from "../lib.mjs";
import { mc, LV5, LV8 } from "../tables/w3a-kit.mjs";

concept("aecon.intervention.direct-provision-information", { file: "intervention/direct-provision-information", keyPrefix: "intervention.direct-provision-information" }, (b) => {
  mc(b, [1, "RECALL"], "A good that is non-excludable and non-rival is called a",
    ["public good", "Correct: these are the two defining characteristics."],
    [["merit good", "A merit good is under-consumed but is usually excludable."], ["private good", "A private good is excludable and rival."], ["demerit good", "A demerit good is over-consumed and harmful."]],
    "Non-excludable and non-rival describe a public good.");

  mc(b, [2, "UNDERSTANDING"], "Why will private firms not supply a pure public good such as street lighting?",
    ["People can use it without paying, so revenue cannot cover costs", "Correct: the free-rider problem removes the incentive to supply."],
    [["The cost of providing it is far too small to interest any firm", "Cost is not the reason; the missing revenue is."], ["Consumers do not want a good that they cannot own privately", "People do want it; they will not pay for it."], ["The law forbids private firms from providing such goods at all", "Nothing prevents it by law; the market simply fails."]],
    "Non-excludability allows free riding, so a firm cannot charge enough to cover its costs.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A government pays for vaccination through taxation and offers it free. Which market failure is this policy mainly addressing?",
    ["Under-consumption of a merit good", "Correct: vaccination benefits the user and others, and would be under-consumed at a market price."],
    [["Over-consumption of a demerit good by users", "Vaccination is not a demerit good."], ["Monopoly power of a single supplier of vaccines", "The policy does not target a single supplier's power."], ["A fall in the general price level across the economy", "That is a macroeconomic problem, not market failure."]],
    "Free provision raises consumption of a merit good closer to the social optimum.");

  mc(b, [2, "UNDERSTANDING"], "Which statement about the provision of information is correct?",
    ["It aims to correct imperfect information", "Correct: it targets the knowledge gap and leaves the choice with the consumer."],
    [["It always removes the need for taxes on demerit goods because people stop buying them", "It may not change behaviour enough for addictive goods."], ["It forces consumers to stop buying a harmful good by law", "Information leaves choice with the consumer."], ["It is a form of price control that fixes the price of a good", "A price control fixes prices; information does not."]],
    "Information addresses imperfect information but leaves the decision with the consumer.");

  mc(b, [3, "ANALYSIS"], "A clinic is free at the point of use and has limited capacity. The most likely result is that",
    ["quantity demanded exceeds the supply and queues ration the service", "Correct: a zero price removes price rationing, so waiting rations the service."],
    [["supply rises automatically to meet all of the demand for treatment", "Capacity is fixed by the budget, not by demand."], ["demand falls to zero once users have to wait in a queue for care", "Waiting costs reduce demand a little but not to zero."], ["the opportunity cost of providing the service becomes zero", "The resources still have alternative uses."]],
    "At a zero price quantity demanded exceeds the limited supply, so rationing is by queue, distance or connections.", { hints: ["What replaces price as the rationing device?"] });

  mc(b, [3, "APPLICATION"], "A country spends US\\$2.4 million on a rural road. This money could instead have built 12 clinics at US\\$200,000 each. The opportunity cost of the road is",
    ["12 clinics", "Correct: 2.4 million ÷ 200,000 = 12."],
    [["US\\$2.4 million of public spending", "That is the money cost, not the next best use given up."], ["one clinic costing US\\$200,000", "That is the cost of one clinic, not the clinics given up."], ["nothing, because the road is a public good", "A public good still has an opportunity cost."]],
    "Opportunity cost is the next best alternative given up: 2,400,000 ÷ 200,000 = 12 clinics.", { hints: ["Divide the cost of the road by the cost of one clinic."] });

  mc(b, [4, "EVALUATION"], "Which is the strongest argument against direct provision of a service by the state?",
    ["Without competition there may be little pressure to keep unit costs low", "Correct: a typical efficiency criticism of state production."],
    [["It allows people on low incomes to use the service as much as others", "That is an advantage of provision on grounds of equity."], ["It can raise the consumption of a merit good towards the optimum", "This is the aim of provision, not a drawback."], ["It removes the need for anyone to pay for the service in any way", "Provision still has to be paid for from taxes."]],
    "Provision removes the profit motive and competition, so unit costs may be higher.", { hints: ["Which option states a weakness rather than a strength?"] });

  b.num({ d: 2, skill: "APPLICATION", kind: "money", value: 7, daily: true, calculator: true,
    stem: "A district spends US\\$4,200,000 a year on health clinics for a population of 600,000. Calculate the spending per head of population, in US\\$.",
    wrong: [0.14, 70, 25200], explanation: "Spending per head = 4,200,000 ÷ 600,000 = US\\$7." });
  b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: 25, calculator: true, hints: ["Cost per visit = annual cost ÷ number of visits."],
    stem: "A contracted clinic costs US\\$1,000,000 a year and records 40,000 patient visits. Calculate the cost per visit, in US\\$.",
    wrong: [250, 40, 0.04], explanation: "1. Cost per visit = total annual cost ÷ visits.\n2. 1,000,000 ÷ 40,000 = US\\$25." });
  {
    const adults = 40000, fewer = adults * 2.5 / 100;
    chk(fewer, 1000); chk(45000 / fewer, 45);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: 45000 / fewer, calculator: true, hints: ["Work out the number of fewer smokers first.", "A fall from 21% to 18.5% is 2.5 percentage points."],
      stem: "A fictional town has 40,000 adults. A health campaign costing US\\$45,000 is followed by a fall in the share of adults who smoke from 21% to 18.5%. Assuming the campaign caused the whole fall, calculate the cost per adult who stopped smoking, in US\\$.",
      wrong: [18, 1.8, 4500], explanation: "1. Fall = 21 − 18.5 = 2.5 percentage points.\n2. Fewer smokers = 2.5% of 40,000 = 1,000.\n3. Cost per adult who stopped = 45,000 ÷ 1,000 = US\\$45.\nUsing the 21% as the number of smokers who stopped, or the percentage change instead of the point change, gives the wrong figure." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A school that is provided by the government is a public good.", answer: false,
    explanation: "False. A school is a merit good provided by the state; it is excludable and rival, so it is not a public good." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Who pays when the service is free to the user?"], stem: "A service that is free at the point of use has no opportunity cost to society.", answer: false,
    explanation: "False. The resources used (staff, buildings, tax revenue) have alternative uses, so there is an opportunity cost." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each government action with the market failure it mainly addresses.",
    pairs: [["Street lighting provided from taxes", "Public good with free riding"], ["Free primary education", "Merit good under-consumed"], ["Health warnings on tobacco", "Imperfect information about harm"], ["A radio campaign on hand-washing", "Imperfect information about benefits"]],
    explanation: "Match the policy to the failure: provision for public and merit goods; information for knowledge gaps." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Public goods are {{blank:a}} and non-rival, so people can be {{blank:b}} riders.",
    blanks: [{ id: "a", accepted: ["non-excludable"], choices: ["non-excludable", "excludable", "rival"] }, { id: "b", accepted: ["free"], choices: ["free", "fast", "tax"] }],
    explanation: "Non-excludable and non-rival goods allow free riders, which is why the market fails to supply them." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the problem that arises when people can use a public good without paying for it.",
    accepted: ["free rider problem", "free-rider problem", "free riding", "free rider", "the free rider problem"], wrong: ["monopoly"],
    explanation: "The free-rider problem: people benefit without paying, so private firms cannot cover costs." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define a merit good.",
    points: ["A good that is under-consumed (or under-provided) in a free market.", "Because consumers do not fully recognise its benefits or because it creates external benefits (for example education)."],
    modelAnswer: "A merit good is one that is under-consumed in a free market, either because consumers do not fully appreciate its benefits or because it creates external benefits, such as education.",
    explanation: "One mark for under-consumption, one for the reason." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link the characteristics of a public good to the behaviour of firms."],
    stem: "Explain why the government may need to provide a public good such as street lighting.",
    points: ["The good is non-excludable: people cannot be prevented from using it.", "It is non-rival: one person's use does not reduce another's.", "People have an incentive to free ride and not pay.", "Firms cannot collect revenue, so the market supplies none, and the government provides it using tax revenue."],
    modelAnswer: "Street lighting is non-excludable, since no one can be stopped from benefiting from it, and non-rival, since one person's use does not reduce another's. People therefore have an incentive to free ride and not pay. Firms cannot collect enough revenue to cover their costs, so the market supplies none and the government provides it from taxation.",
    explanation: "Two characteristics, free riding, and provision from taxes." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Give a point for and a point against, then conclude."],
    stem: "Assess one advantage and one disadvantage of providing health care directly through the state, and give a judgement.",
    points: ["Advantage: access does not depend on income, which improves equity.", "Advantage developed: more people are treated, so more of the external benefits (less disease spread) are achieved, bringing consumption closer to the social optimum.", "Disadvantage: opportunity cost, since tax money used cannot be spent on other services.", "Disadvantage developed: without competition or a profit motive there may be less pressure to control costs, and demand may exceed supply, causing queues.", "A judgement.", "The judgement is justified, for example by reference to the size of the external benefits or the quality of management."],
    modelAnswer: "State provision of health care allows people on low incomes to be treated, which improves equity, and it increases consumption of a service with large external benefits such as less spread of disease, so output moves closer to the social optimum. However, the money has an opportunity cost, and without competition or a profit motive unit costs may be high and demand may exceed supply, so queues ration the service. Overall, state provision is justified where the external benefits and equity gains are large, as with basic health care, provided that costs are monitored and the quality of management is good.",
    explanation: "Advantage, disadvantage, each developed, and a justified judgement." });

  {
    const rows = [["Clinic X", 780000, 26000], ["Clinic Y", 1350000, 36000], ["Clinic Z", 880000, 44000]];
    const cpv = rows.map(([, c, v]) => c / v);
    chk(cpv[0], 30); chk(cpv[1], 37.5); chk(cpv[2], 20);
    const t1 = table(["Clinic", "Provider", "Annual cost (US\\$)", "Patient visits"], [["Clinic X", "Government", 780000, 26000], ["Clinic Y", "Government", 1350000, 36000], ["Clinic Z", "Private operator paid by government", 880000, 44000]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Cost per visit = annual cost ÷ visits.", "Think about what the table does not show."],
      stem: `**Three clinics in a fictional district (illustrative data)**\n\nThe district health authority pays for all three clinics. Clinic Z is run by a private operator under contract.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cpv[1], stem: "Calculate the cost per patient visit at Clinic Y, in US\\$.", wrong: [30, 20, 1350000], explanation: "1,350,000 ÷ 36,000 = US\\$37.50." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: cpv[0] - cpv[2], stem: "How much lower is the cost per visit at Clinic Z than at Clinic X, in US\\$?", wrong: [7.5, 17.5, 5], explanation: "Clinic X: US\\$30. Clinic Z: US\\$20. The difference is US\\$10." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain one reason why the government might pay a private operator to run a clinic instead of running it directly.",
          points: ["The private operator faces competition for the contract or a profit motive.", "This gives an incentive to keep unit costs low (here US\\$20 against US\\$30 and US\\$37.50).", "The government still finances the service, so access is not limited by ability to pay."],
          modelAnswer: "A private operator has a profit motive and may have to compete for the contract, so it has an incentive to keep costs down, as shown by the lower cost per visit at Clinic Z. The government still pays, so the service stays free to the user and equity is protected." }),
        P.manual({ label: "(d)", marks: 2, stem: "State two other pieces of information needed before concluding that Clinic Z is the best provider.",
          points: ["The quality or outcomes of treatment (for example the number of patients cured).", "The type of patients and the location of each clinic (costs depend on the difficulty of the cases and how remote the clinic is)."],
          modelAnswer: "Information on the quality and outcomes of treatment, and information on the type of patients and the location of each clinic, since remote clinics or sicker patients raise costs." }),
      ],
      explanation: "Cost per visit X US\\$30, Y US\\$37.50, Z US\\$20; contracting may improve incentives, but quality and patient mix are not shown." });
  }
  {
    const adults = 80000, b0 = 22, a0 = 19, cost = 90000;
    const drop = (b0 - a0) / 100 * adults;
    chk(drop, 2400); chk(cost / drop, 37.5);
    const t2 = table(["", "Before the campaign", "After the campaign"], [["Share of adults who drink alcohol heavily (%)", 22, 19], ["Number of adults", 80000, 80000]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["The fall is in percentage points.", "Consider what else might have caused the change."],
      stem: `**An alcohol awareness campaign in a fictional city (illustrative data)**\n\nA city council spends US\\$90,000 on radio advertisements, posters in bars and talks in schools about the harm done by heavy drinking.\n\n${t2}\n\nDuring the same period the national government raised the tax on alcohol.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: b0 - a0, unit: "percentage points", stem: "Calculate the fall in the share of heavy drinkers, in percentage points.", wrong: [13.6, 3.3, 41], explanation: "22 − 19 = 3 percentage points." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: drop, unit: "people", stem: "Calculate the fall in the number of heavy drinkers.", wrong: [3000, 1800, 17600], explanation: "3% of 80,000 = 2,400." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: cost / drop, stem: "Calculate the campaign cost per fewer heavy drinker, in US\\$.", wrong: [30, 1.1, 90000], explanation: "90,000 ÷ 2,400 = US\\$37.50." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 60, max: 200 }, levels: LV5,
          stem: "Evaluate whether the campaign was a success.",
          points: ["The share of heavy drinkers fell by 3 percentage points (2,400 people), which suggests some success.", "The cost per person (US\\$37.50) can be compared with the cost of health problems avoided.", "The tax rise on alcohol may have caused part of the fall, so the campaign cannot take all the credit.", "Heavy drinking is often addictive, and the data show only a short period, so the effect may not last.", "A judgement, for example that the campaign probably helped but should be combined with other policies."],
          modelAnswer: "The share of heavy drinkers fell by three percentage points, 2,400 people, at a cost of US\\$37.50 each, which looks effective if the health costs avoided are larger. However, the national tax rise on alcohol took place at the same time and may explain part of the fall, so the campaign cannot claim all of the credit. The effect may also not last, because heavy drinking is often addictive and the data cover a short period. Overall the campaign probably helped, but it is better regarded as one part of a package with taxes and regulation, and its long-run effect should be monitored." }),
      ],
      explanation: "Fall 3 percentage points, 2,400 people, US\\$37.50 each; the tax rise is a competing explanation." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both the benefits for equity and efficiency and the opportunity cost.", "Reach a judgement."],
    stem: "Assess whether the government should provide primary education directly instead of leaving it to the market.",
    points: ["Education is a merit good with external benefits (a more productive workforce, better health), so the market under-provides it.", "Without free provision, low-income families may not afford it, which raises equity concerns.", "Provision raises enrolment toward the social optimum.", "Provision is paid for by taxes, so there is an opportunity cost.", "Without competition there may be less pressure to control costs or raise quality.", "The government could finance education without producing it (vouchers, grants to church-run schools).", "Capacity may be limited so that classes become large.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "Primary education is a merit good with external benefits, such as a more productive workforce and better health, so a free market would provide too little, especially for low-income families who cannot afford fees. Government provision raises enrolment towards the social optimum and improves equity. However, it is paid for out of taxes, so there is an opportunity cost, and with no competition there may be less pressure on costs and quality, and classes may become too large if funds are short. The government could also finance education without producing it, for example through grants to church-run schools. Overall, state financing is strongly justified for primary education, but the form of production should be chosen to balance cost, quality and access.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the external benefits and equity gains against opportunity cost and efficiency problems." });

  b.card("DEFINITION", "Define **direct provision**.", "The supply of goods and services by the government, paid for from public funds and either free or below cost.");
  b.card("DEFINITION", "What are the two characteristics of a **public good**?", "Non-excludable (people cannot be prevented from using it) and non-rival (one person's use does not reduce what is left for others).");
  b.card("CONCEPT", "What is the **free-rider problem**?", "People can benefit from a good without paying, so firms cannot collect revenue and the market fails to supply it.");
  b.card("DEFINITION", "Define a **merit good**.", "A good that is under-consumed in a free market because people do not fully recognise its benefits or because it has external benefits, for example education.");
  b.card("CONCEPT", "Name three ways of financing government provision.", "Taxation, borrowing and user charges (donor funds are a fourth); each has an opportunity cost.");
  b.card("CONCEPT", "Give three weaknesses of direct provision.", "Opportunity cost, possible high unit costs without competition, and rationing by queues; also poor information about preferences.");
  b.card("CONCEPT", "Why can the government finance a service without producing it?", "It can pay private or church-run providers, so funding and production are separate decisions.");
  b.card("CONCEPT", "What does the **provision of information** aim to correct?", "Imperfect information: consumers who do not know the true costs or benefits of a good make poor choices.");
  b.card("CONCEPT", "Give two limits of information campaigns.", "They may be ignored (addictive goods), they take time and are hard to measure, and they may be outweighed by advertising.");
});
