// W2b: business and the environment (Cambridge only).
import { concept, P, money, f } from "../lib.mjs";

const elecBefore = 1450, elecAfter = 610;
const yearlySaving = (elecBefore - elecAfter) * 12; // 10080
const pRev = 230000, pCost = 198000, pExtra = 9500;
const pNew = f.profit(pRev, pCost + pExtra); // 22500
// struct
const sRev = 140000, sCost = 117000, sPack = 6300, sGain = 8800;
const sP0 = f.profit(sRev, sCost), sP1 = f.profit(sRev + sGain, sCost + sPack);

concept("bus.economy.environmental-issues", { file: "economy/environmental-issues", keyPrefix: "economy.environmental-issues" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the depletion of resources?",
    options: [
      ["Using up natural resources faster than they can be replaced", "Correct: e.g. cutting forests faster than they regrow."],
      ["Releasing harmful substances from factories into rivers and dams", "That is water pollution."],
      ["Recycling waste materials", "Recycling helps to conserve resources."],
      ["Planting trees after logging", "Replanting replaces resources."],
    ],
    answer: "A",
    explanation: "**Depletion** means resources such as forests, minerals, fish and water are used up faster than they are replaced.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Waste from a mine enters a river used by farmers downstream. What type of environmental damage is this?",
    options: [
      ["Water pollution", "Correct: harmful substances enter the river."],
      ["Noise pollution", "Noise is not the issue here."],
      ["Visual pollution", "The damage is to water quality, not appearance."],
      ["Depletion of resources", "The river is polluted, not used up."],
    ],
    answer: "A",
    explanation: "Mine waste in a river is **water pollution**, harming farmers, livestock and fish.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the most likely reason a business installs filters on its chimneys even though they are expensive?",
    options: [
      ["To obey laws limiting pollution and avoid fines", "Correct: legal controls are a key reason."],
      ["To increase the amount of smoke it releases", "Filters reduce smoke."],
      ["To reduce the wages it pays", "Filters do not affect wages."],
      ["To avoid paying tax on its profits", "Filters do not remove tax on profits."],
    ],
    answer: "A",
    explanation: "Businesses respond to **legal controls**, customer pressure, pressure groups and cost savings.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A law bans a type of thin plastic packaging. Which aspect of a business does this mainly affect?",
    options: [
      ["What it produces or sells", "Correct: it must change its packaging or product."],
      ["Where it is located", "The ban is about the product, not the location."],
      ["How many shareholders it has", "Ownership is unaffected."],
      ["The interest rate on its loans", "Interest rates are not affected."],
    ],
    answer: "A",
    explanation: "Legal controls can change **what** is produced, **how** it is produced, **where** and at what **cost**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which environmental measure is most likely to **reduce** a business's costs over time?",
    options: [
      ["Installing energy-efficient machines", "Correct: lower energy bills can repay the cost."],
      ["Paying for an environmental impact assessment", "This is a cost, not a saving."],
      ["Buying more expensive certified timber", "This raises material costs."],
      ["Paying a fine for dumping waste", "Fines are a cost."],
    ],
    answer: "A",
    hints: ["Which measure lowers a regular bill?"],
    explanation: "Energy and water efficiency, and recycling, can **save money** as well as protect the environment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a safari lodge have a strong business reason to protect the environment?",
    options: [
      ["Its revenue depends on wildlife and landscapes attracting tourists", "Correct: environmental damage would destroy its product."],
      ["It pays no taxes if it protects wildlife", "Tax is not linked in this way."],
      ["Lodges are exempt from all environmental laws and inspections", "Lodges must obey environmental laws like other businesses."],
      ["Lodges are not allowed to make a profit", "Lodges are usually profit-making businesses."],
    ],
    answer: "A",
    hints: ["What do tourists pay to see?"],
    explanation: "For businesses that depend on natural resources, protecting the environment is essential for **long-term survival**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is an environmental impact assessment?",
    options: [
      ["A study of how a project will affect the environment", "Correct: often required before large projects begin."],
      ["A tax charged on businesses that pollute rivers or the air", "That is a pollution tax or fine."],
      ["A list of a business's assets", "That is part of a financial statement."],
      ["An advertisement for green products", "That is promotion."],
    ],
    answer: "A",
    explanation: "An **EIA** studies a project's likely environmental effects and how to reduce them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Planning rules say new factories may not be built near rivers. Which aspect of business decisions does this affect?",
    options: [
      ["Where the business produces", "Correct: the rule limits location choices."],
      ["What the business produces", "The product is not restricted."],
      ["Who owns the business", "Ownership is unaffected."],
      ["How much tax on profits it pays", "Tax is unaffected."],
    ],
    answer: "A",
    explanation: "Planning rules affect **where** a business can operate.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Recycling waste can help a business reduce both environmental damage and costs.",
    answer: true,
    explanation: "True. Reusing materials or selling waste can cut costs while reducing landfill.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Environmental laws always reduce a business's costs.",
    answer: false,
    explanation: "False. They usually raise costs (equipment, permits, dearer materials), though some measures save money later.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business activity with the environmental damage it causes.",
    pairs: [
      ["Diesel lorries in a busy town", "Air pollution"],
      ["Fertiliser running off farms into a dam", "Water pollution"],
      ["Overfishing in a lake", "Depletion of resources"],
      ["A quarry blasting rock near homes", "Noise pollution"],
    ],
    explanation: "Each activity harms a different part of the environment.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Producing in a way that meets present needs without harming future generations is called {{blank:a}} production. Releasing harmful substances into the air, water or land is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sustainable"], choices: ["sustainable", "mass", "batch", "flow"] },
      { id: "b", accepted: ["pollution"], choices: ["pollution", "depletion", "recycling", "conservation"] },
    ],
    explanation: "**Sustainable** production; **pollution**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A hotel installs solar water heaters. Its monthly electricity bill falls from ${money(elecBefore)} to ${money(elecAfter)}. Calculate the saving over a year of 12 months.`,
    kind: "money", value: yearlySaving, wrong: [elecBefore - elecAfter, elecAfter * 12],
    explanation: `Monthly saving = ${money(elecBefore - elecAfter)}; yearly saving = 12 × ${money(elecBefore - elecAfter)} = ${money(yearlySaving)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A food processor has annual revenue of ${money(pRev)} and total costs of ${money(pCost)}. A new law requires it to treat its waste water, adding ${money(pExtra)} a year to its costs. Assuming revenue does not change, calculate its new annual profit.`,
    kind: "money", value: pNew, wrong: [f.profit(pRev, pCost), f.profit(pRev, pCost) + pExtra],
    hints: ["Add the extra cost to total costs first."],
    explanation: `Profit = ${money(pRev)} − (${money(pCost)} + ${money(pExtra)}) = ${money(pNew)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why businesses may try to reduce the damage they cause to the environment.",
    points: [
      "Legal controls / avoid fines or closure.",
      "Explains the consequence of breaking the law.",
      "Customer pressure / pressure groups / reputation / cost savings / long-term resources.",
      "Explains the effect on sales, costs or survival.",
    ],
    hints: ["Think about the law, customers and costs."],
    modelAnswer: "Laws limit pollution, so a business that breaks them may be fined or closed. Customers increasingly prefer environmentally responsible firms, so reducing damage protects the business's reputation and sales.",
    explanation: "Reasons: laws, customers, pressure groups, cost savings, long-term survival, ethics.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "A timber company cuts trees in the Eastern Highlands. Explain **two** ways it could reduce its effect on the environment.",
    points: [
      "Replant trees after cutting.",
      "So the forest regrows and timber is available in future (sustainable).",
      "Use off-cuts / reduce waste / protect rivers and soil / avoid cutting near streams.",
      "Explains the benefit.",
    ],
    hints: ["Think about replacing what is used and reducing waste."],
    modelAnswer: "It could replant trees after each harvest, so the forest regrows and timber will be available for future harvests. It could also sell or reuse off-cuts and sawdust instead of burning them, reducing waste and air pollution.",
    explanation: "Sustainable forestry replaces what it uses and reduces waste.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 960,
    stem: `Fresh Juice (a fictional business) makes fruit juice in Mutare and sells it in plastic bottles. It has annual revenue of ${money(sRev)} and total costs of ${money(sCost)}. A pressure group has criticised the plastic bottles littering the town. Switching to returnable glass bottles would add ${money(sPack)} a year to costs, but research suggests that environmentally aware customers would increase revenue by ${money(sGain)} a year.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate Fresh Juice's current profit.", kind: "money", value: sP0, wrong: [sRev] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Fresh Juice's profit if it switches to glass bottles and the research is correct.", kind: "money", value: sP1, wrong: [sP0 - sPack] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons, other than profit, why Fresh Juice might switch to glass bottles.",
        points: [
          "Pressure group criticism / bad publicity.",
          "Could damage reputation and sales if it continues.",
          "Possible future laws banning or taxing plastic / ethical reasons / reduce litter in the town.",
          "Explains effect: avoids fines or forced change later / meets social responsibility.",
        ],
        modelAnswer: "The pressure group's campaign could damage Fresh Juice's reputation, so switching protects its brand. The government may also ban or tax plastic bottles in future, so changing now avoids a forced and costly change later.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Should Fresh Juice switch to returnable glass bottles? Justify your answer.",
        points: [
          `Uses (a) and (b): profit rises from ${money(sP0)} to ${money(sP1)} if the research is right.`,
          "Research may be wrong; customers may not return bottles; glass breaks; heavier transport.",
          "Reputation and pressure-group benefits.",
          "Risk of future legal controls on plastic.",
          "Considers competitors / customers' willingness to pay.",
          "Justified decision.",
        ],
        modelAnswer: `If the research is right, profit rises from ${money(sP0)} to ${money(sP1)}, because the extra revenue is greater than the extra cost. Switching would also end the pressure group's criticism and prepare Fresh Juice for possible laws on plastic. However, the research may be too optimistic, glass is heavier to transport and breaks, and a return system needs organising. Even if revenue rises less than expected, the reputation benefit and lower legal risk are valuable, so Fresh Juice should switch, perhaps starting with one product to test customers' response.`,
      }),
    ],
    hints: ["(a) Profit = revenue − total costs.", "(b) Add the extra revenue and the extra cost before subtracting."],
    explanation: `(a) ${money(sRev)} − ${money(sCost)} = ${money(sP0)}. (b) ${money(sRev + sGain)} − ${money(sCost + sPack)} = ${money(sP1)}. (c) Reputation and future laws. (d) A justified decision.`,
    workedSolution: `1. Current profit = ${sRev.toLocaleString("en-GB")} − ${sCost.toLocaleString("en-GB")} = ${sP0.toLocaleString("en-GB")}.\n2. New revenue = ${(sRev + sGain).toLocaleString("en-GB")}; new costs = ${(sCost + sPack).toLocaleString("en-GB")}.\n3. New profit = ${(sRev + sGain).toLocaleString("en-GB")} − ${(sCost + sPack).toLocaleString("en-GB")} = ${sP1.toLocaleString("en-GB")}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "The government introduces stricter limits on smoke and dust from factories and quarries. Granite Stone (a fictional business) runs a quarry near Harare that sells crushed stone to builders. To meet the limits it must buy dust-control equipment or reduce its output.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain how the new limits could affect **how** Granite Stone produces and its **costs**.",
        points: [
          "How: must use water sprays / covered crushers / dust-control equipment, or work fewer hours.",
          "Explains the change to production methods.",
          "Costs: buying and running equipment raises costs.",
          "So profit falls or prices must rise.",
        ],
        modelAnswer: "Granite Stone must change how it works, for example using water sprays and covered crushers, or crushing less stone. Buying and running the equipment raises its costs, so it must either raise its prices to builders or accept lower profit.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate whether stricter environmental limits are good for businesses such as Granite Stone.",
        points: [
          "Costs rise; small firms may struggle to afford equipment.",
          "Prices may rise, so builders may buy from cheaper sources or competitors abroad.",
          "But all quarries face the same rules, so competition stays fair.",
          "Benefits: healthier workers and neighbours, fewer complaints, better reputation, avoids fines.",
          "Long-term: protects the business's licence to operate.",
          "Justified conclusion.",
        ],
        modelAnswer: "In the short term the limits are costly: Granite Stone must buy equipment, and small quarries may not afford it. Higher costs may mean higher prices for stone. However, every quarry must meet the same rules, so no rival gains an unfair advantage. Less dust protects workers' health and reduces complaints from neighbours, who could otherwise press for the quarry to be closed. Overall the limits reduce short-term profit but are good for businesses like Granite Stone in the long run, because they protect their workers, their reputation and their right to keep operating.",
      }),
    ],
    hints: ["(b) Do the rules apply to all competitors?"],
    explanation: "Legal controls change how businesses produce and raise costs, but they also protect health, reputation and the right to operate.",
  });
  b.card("DEFINITION", "What is **pollution**?", "Harmful substances or noise released into the air, water or land by human activity.");
  b.card("DEFINITION", "**Depletion of resources**?", "Using up natural resources faster than they can be replaced.");
  b.card("DEFINITION", "**Sustainable production**?", "Meeting present needs without harming the ability of future generations to meet theirs.");
  b.card("CONCEPT", "Why do businesses respond to environmental issues?", "Laws, customer pressure, pressure groups, cost savings, long-term survival, ethics, staff and investors.");
  b.card("CONCEPT", "Ways to reduce environmental damage?", "Cleaner methods, reduce-reuse-recycle, energy and water efficiency, sustainable sourcing, proper disposal, rehabilitation.");
  b.card("CONCEPT", "Legal controls affect …?", "What is produced, how it is produced, where, and costs.");
  b.card("DEFINITION", "**Environmental impact assessment (EIA)**?", "A study of a project's likely effects on the environment and how to reduce them, often required before approval.");
  b.card("CONCEPT", "Can environmental measures save money?", "Yes: energy and water efficiency, recycling and less packaging can cut costs over time.");
});
