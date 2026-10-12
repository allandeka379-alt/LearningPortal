// W1a: classifying goods (both boards; common property is ZIMSEC detail).
import { concept, P, chk, fmt, table, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.basics.goods-classification", { file: "basics/goods-classification", keyPrefix: "basics.goods-classification" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "A public good is a good that is",
    explanation: "Public goods are non-rival and non-excludable." },
    ["non-rival and non-excludable", "Correct."],
    [["rival and excludable", "That describes a private good."],
     ["rival and non-excludable", "That describes a common resource."],
     ["always provided by the government", "Provision by government is a consequence, not the definition."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which good is the best example of a **public good**?",
    explanation: "Street lighting is non-rival (one person's use does not reduce another's) and non-excludable (non-payers cannot be stopped from benefiting)." },
    ["Street lighting on a main road", "Correct."],
    [["A seat on a minibus taxi", "Rival and excludable: a private good."],
     ["A bottle of cooking oil", "Rival and excludable: a private good."],
     ["A tuition place at a private school", "Rival and excludable: a private good."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "What is the free-rider problem?",
    explanation: "Because non-payers cannot be excluded, people can benefit without paying, so private firms cannot make a profit from providing the good." },
    ["People can benefit from a good without paying for it", "Correct."],
    [["Consumers receive a good free from the government", "Free provision is not the free-rider problem."],
     ["Producers charge a price that is higher than the cost", "That is a profit margin."],
     ["Firms refuse to sell to customers who cannot pay", "That is exclusion, the opposite of the problem."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which is a **merit good**?",
    explanation: "Vaccination is regarded as beneficial but is under-consumed if people undervalue its benefits; tobacco is a demerit good and the others are ordinary private goods." },
    ["Vaccination against infectious diseases", "Correct: under-consumed relative to the social optimum."],
    [["Cigarettes sold in shops and kiosks across the country", "A demerit good."],
     ["A television set bought for use at home", "An ordinary private good."],
     ["National defence provided by the armed forces", "A public good."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Demerit goods are over-consumed mainly because",
    explanation: "Consumers underestimate the harm to themselves or ignore the harm to others, so they buy more than is socially desirable." },
    ["consumers underestimate the harm that they cause", "Correct: imperfect information."],
    [["the government provides them free of charge", "Demerit goods are usually priced and often taxed."],
     ["they are non-excludable, so firms cannot charge for them", "That describes public goods."],
     ["producers cannot supply enough of them", "The problem is over-consumption."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Is the good rival? Is it excludable?"],
    stem: "Fish in an open-access lake can be caught by anyone, and every kilogram caught by one fisher leaves less for others. The fish are",
    explanation: "Rival (one's catch reduces the supply for others) and non-excludable (no one can be stopped from fishing): a common resource, prone to over-use." },
    ["rival and non-excludable, so likely to be over-used", "Correct."],
    [["non-rival and non-excludable, so likely to be under-provided", "That describes a public good."],
     ["rival and excludable, so likely to be provided efficiently", "That describes a private good."],
     ["non-rival and excludable, so likely to be under-consumed", "That describes a club good."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Who bears the cost of the over-use?"],
    stem: "Why do users of a common resource tend to over-use it?",
    explanation: "Each user receives the full benefit of taking more but shares the cost of depletion with all others, so the incentive is to take more." },
    ["Each user gains the full benefit of taking more but shares the cost with others", "Correct."],
    [["The resource is a free good with no opportunity cost to anyone who uses it", "It is scarce, which is why over-use matters."],
     ["Private firms are prevented from owning the resource", "Ownership is not the point; excludability is."],
     ["Government provides the resource to users at no cost", "Provision is not the cause."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["Does it meet the definition?"],
    stem: "A fictional government says that primary education is a public good because it provides it free. Which comment is correct?",
    explanation: "Education is rival (a place in a class can be filled) and excludable (children can be refused entry), so it is a private good with merit-good characteristics, even if the state provides it." },
    ["Education is a merit good: provision by the state does not make it non-rival or non-excludable", "Correct."],
    [["The statement is correct because anything provided free of charge is a public good", "Free provision is not the definition."],
     ["Education is a free good because pupils pay nothing for the places they use", "It uses scarce resources, so it is an economic good."],
     ["Education is a demerit good because some pupils dislike school", "Demerit goods are harmful."]]);

  {
    const hh = 100, benefit = 30, cost = 2000;
    const totalBenefit = hh * benefit, share = cost / hh, payers = 40, rev = payers * share;
    chk(totalBenefit, 3000); chk(share, 20); chk(rev, 800);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: rev, hints: ["Revenue = payers × contribution."],
      stem: "A fictional neighbourhood of 100 households would benefit from street lighting costing US\\$2,000. Each household values it at US\\$30. Voluntary payments are requested at US\\$20 per household (an equal share of the cost), but only 40 households pay. How much is collected, in US\\$?",
      wrong: [2000, 40 * 30],
      explanation: `1. Equal share = 2,000 ÷ 100 = US\\$20.\n2. Collected = 40 × 20 = **US\\$${fmt(rev)}**.\n\nThis is well below the US\\$2,000 needed, so the lighting is not provided although total benefit (US\\$${fmt(totalBenefit)}) exceeds cost.` });
  }
  {
    const fishers = 8, each = 140, safe = 900, total = fishers * each, excess = total - safe, pct = (excess / safe) * 100;
    chk(total, 1120); chk(excess, 220);
    b.calc({ d: 3, skill: "APPLICATION", kind: "pct", value: pct, dp: 1, applies: ZIM, calculator: true, hints: ["Over-use = actual catch − sustainable catch."],
      stem: "A fictional lake can safely supply 900 kg of fish a year. Eight fishers each catch 140 kg. By what percentage does the total catch exceed the sustainable level? Give your answer to one decimal place.",
      wrong: [(220 / 1120) * 100, 220],
      explanation: `1. Total catch = 8 × 140 = ${total} kg.\n2. Excess = ${total} − ${safe} = ${excess} kg.\n3. Percentage above sustainable = ${excess} ÷ ${safe} × 100 = **${fmt(pct, 1)}%**.\n\nDividing by the total catch (19.6%) uses the wrong base; 220 is the excess in kilograms.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A free school lunch is a free good because pupils do not pay for it.", answer: false,
    explanation: "False. It uses scarce resources, so it is an economic good provided without charge." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A merit good may be rival and excludable, like a private good, yet still be under-consumed in a free market.", answer: true,
    explanation: "True. Merit goods are defined by under-consumption through imperfect information or undervaluing, not by rivalry or excludability." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Classifying a good as a merit or demerit good involves a value judgement.", answer: true,
    explanation: "True. People disagree about what is 'good for' individuals and society." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each good to its classification.",
    pairs: [["A loaf of bread", "Private good"], ["National defence", "Public good"], ["Alcohol", "Demerit good"], ["Immunisation", "Merit good"]],
    explanation: "Classification depends on rivalry, excludability and the effect of consumption." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Choose the correct terms.",
    template: "A public good is {{blank:a}} and non-excludable. Because users cannot be made to pay, the market suffers from the {{blank:b}} problem.",
    blanks: [{ id: "a", accepted: ["non-rival"], choices: ["rival", "non-rival"] }, { id: "b", accepted: ["free-rider"], choices: ["free-rider", "shortage", "monopoly"] }],
    wrong: [["rival", "shortage"]],
    explanation: "Public goods are non-rival and non-excludable, which creates the free-rider problem." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a good that is rival but non-excludable, such as fish in an open-access lake?",
    accepted: ["common resource", "common property", "common pool resource", "common-pool resource", "common access resource"], wrong: ["public good"],
    explanation: "A common resource (common property) is rival and non-excludable." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain why the free market is unlikely to provide street lighting.",
    points: ["Street lighting is non-excludable, so non-payers cannot be stopped from using it.", "People will free ride, so firms cannot earn revenue.", "So no private firm will supply it (or too little will be supplied)."],
    modelAnswer: "Street lighting is non-excludable, so once it is provided everyone benefits whether or not they pay. People therefore free ride, firms cannot earn revenue and none will provide it, so the government must supply it from taxes.",
    explanation: "Non-excludability, free riding, no revenue." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Information and externalities."],
    stem: "Analyse why the consumption of vaccinations may be below the socially best level in a free market.",
    points: ["People may be unaware of the full benefits, or undervalue them (imperfect information).", "Vaccination protects other people (a positive externality), but the individual gains only the private benefit.", "So the private demand is lower than the social benefit.", "Output and consumption are lower than the best level for society."],
    modelAnswer: "Some people do not fully understand how vaccination protects them, so they undervalue it. Vaccination also protects other people from infection, a benefit the individual does not receive, so private demand is lower than the social benefit. As a result, fewer vaccinations are bought than is best for society.",
    explanation: "Imperfect information and positive externalities." });

  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, applies: ZIM, hints: ["Why does each user ignore the effect on others?"],
    stem: "Communal grazing land in a fictional district is open to all villagers and the grass is becoming scarce. Explain why the land is likely to be over-used and suggest **one** solution.",
    points: ["The land is non-excludable, so no one can be stopped from grazing animals.", "Each villager gains from adding animals but shares the cost of lost grass with everyone.", "So the number of animals rises beyond what the land can support.", "A solution (for example limits on animals per family or community management rules)."],
    modelAnswer: "No villager can be excluded, and each gains the full benefit of an extra animal but shares the cost of reduced grass with all others, so too many animals are kept and the land is over-used. The community could limit the number of animals each family may graze or manage the land under agreed rules.",
    explanation: "Common property: non-excludable, rival, shared cost; solutions are rules or quotas." });

  // Structured 1: classification table.
  {
    const tab = table(["Good", "Can non-payers be excluded?", "Does one person's use reduce the amount for others?"], [["Good W: a bus journey", "Yes", "Yes"], ["Good X: a flood-warning siren", "No", "No"], ["Good Y: tobacco", "Yes", "Yes"], ["Good Z: fish in an open sea", "No", "Yes"]], { align: ["l", "l", "l"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Use the two characteristics."],
      stem: `The table describes four goods in a fictional country.\n\n${tab}`,
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which good is a public good?",
          options: [["Good X", "Correct: non-rival and non-excludable."], ["Good W", "A private good."], ["Good Y", "A private (demerit) good."], ["Good Z", "A common resource."]],
          answer: "A", explanation: "Only X is both non-excludable and non-rival." }),
        P.short({ label: "(b)", marks: 1, stem: "What type of good is Good Z?", accepted: ["common resource", "common property", "common pool resource", "common-pool resource"], explanation: "Rival and non-excludable: a common resource." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why Good X is unlikely to be provided by private firms.",
          points: ["Non-excludable: people cannot be made to pay.", "Free riding means no revenue.", "So private firms make no profit and do not supply it."],
          modelAnswer: "Once the siren is installed everyone nearby benefits whether or not they pay, so people free ride, firms cannot earn revenue and no private firm will supply it." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the government might tax Good Y.",
          points: ["Good Y is a demerit good, over-consumed because people underestimate the harm.", "A tax raises the price and reduces consumption.", "The revenue can fund health care or other spending."],
          modelAnswer: "Tobacco is a demerit good: people underestimate the harm, so they consume too much. A tax raises its price and reduces consumption, and the revenue can be used to fund health care." }),
      ],
      explanation: "X public good; Z common resource; public goods suffer from free riding; demerit goods can be taxed." });
  }

  // Structured 2: merit good evaluation.
  {
    const cost = 60, subs = 15, n = 400, subCost = subs * n;
    chk(subCost, 6000);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Total subsidy = subsidy per child × number of children."],
      stem: "A fictional government wants more children to attend preschool, a merit good. A year of preschool costs families US\\$60. The government offers a subsidy of US\\$15 per child to the 400 children in a district.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: subCost, stem: "Calculate the total cost of the subsidy in the district, in US\\$.", wrong: [15, 60 * 400], explanation: "15 × 400 = US\\$6,000." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: cost - subs, stem: "What price per year will families pay after the subsidy, in US\\$?", wrong: [15, 75], explanation: "60 − 15 = US\\$45." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why preschool is described as a merit good.",
          points: ["Families may undervalue the long-term benefits (imperfect information).", "Society also gains from better-educated children (positive externalities).", "So, without help, too few children attend."],
          modelAnswer: "Families may not fully appreciate the long-term benefits of preschool, and society also gains from better-educated children, which families do not take into account. As a result too few children attend unless the cost is reduced." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the subsidy is likely to be sufficient to ensure that all children attend.",
          points: ["A fall in price of 25% may encourage some families to send children.", "Poor families may still be unable to pay US\\$45 or live too far away.", "Information and transport may also be needed; a conclusion that the subsidy helps but may not be enough."],
          modelAnswer: "The subsidy lowers the cost by 25% and will encourage some families, but the poorest may still be unable to afford US\\$45, and distance and lack of information may also keep children out. The subsidy will help but is unlikely to ensure that all attend by itself." }),
      ],
      explanation: "Subsidy cost US\\$6,000; price after subsidy US\\$45; merit good under-consumption; the subsidy may not be sufficient." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Name the market failure, then the government's possible responses."],
    stem: "Assess whether the government rather than private firms should provide goods such as flood-warning systems, street lighting and national defence.",
    points: ["These are public goods: non-rival and non-excludable.", "Free riding means private firms cannot earn revenue.", "Provision by the government through taxation overcomes this.", "Government can ensure everyone benefits.", "Government provision may be inefficient or wasteful.", "It is hard to know how much people value the good, so the right amount is uncertain.", "Some can be provided by private firms under contract, funded by the government.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "These goods are public goods: once provided, no one can be excluded and one person's use does not reduce another's. Private firms cannot charge users, so free riding means little or none would be supplied. The government can overcome this by providing them from taxation, so that everyone contributes and benefits. However, government provision may be inefficient, and it is difficult to know how much people value the good, so too much or too little may be supplied. A solution is for the government to pay but contract private firms to build and run the service. On balance government funding is justified for public goods, though the delivery may be private.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Public goods justify government funding; efficiency of delivery and measuring demand are the limits." });

  b.card("DEFINITION", "Define a **public good**.", "A good that is non-rival and non-excludable, such as street lighting or national defence.");
  b.card("DEFINITION", "What is the **free-rider problem**?", "People can benefit from a good without paying, so private firms cannot earn revenue and the market under-provides it.");
  b.card("DEFINITION", "Define **rivalry** and **excludability**.", "Rival: one person's use reduces the amount available to others. Excludable: non-payers can be prevented from using it.");
  b.card("DEFINITION", "Define a **merit good**.", "A good that society considers beneficial but which is under-consumed in a free market because of imperfect information or undervaluing of benefits.");
  b.card("DEFINITION", "Define a **demerit good**.", "A good that is harmful but over-consumed because consumers underestimate the harm.");
  b.card("CONCEPT", "What is a **quasi-public good**?", "A good with some features of a public good, partly non-rival or partly non-excludable, such as a road or a park.");
  b.card("CONCEPT", "Why are common resources over-used?", "Each user gains fully from taking more but shares the cost of depletion with everyone.", "ZIMSEC detail: common property.", { applies: ZIM });
  b.card("CONCEPT", "How do free goods differ from economic goods?", "Free goods have no opportunity cost; economic goods are scarce and use resources, even when provided without charge.");
});
