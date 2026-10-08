// W2a: econ.market-failure.externalities — private, external and social costs and benefits. No diagrams.
import { concept, P, table, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.market-failure.externalities", { file: "market-failure/externalities", keyPrefix: "market-failure.externalities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **external cost**?",
    options: [
      ["A cost of an activity paid by third parties who are not compensated", "Correct: for example pollution suffered by neighbours."],
      ["A cost paid by a firm to suppliers in other countries", "Paying foreign suppliers is a private cost of the firm."],
      ["The total cost of an activity to the whole of society", "This is social cost."],
      ["A cost paid by consumers when they buy a good", "The price paid is a private cost to the consumer."],
    ],
    answer: "A",
    explanation: "An external cost (negative externality) falls on people outside the decision who are not compensated.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Social benefit is equal to",
    options: [
      ["private benefit + external benefit.", "Correct: the total benefit to society."],
      ["private benefit − external benefit.", "External benefits add to, not subtract from, the total."],
      ["private benefit + external cost.", "Costs and benefits are not added together."],
      ["external benefit − private cost.", "This mixes a benefit with a cost."],
    ],
    answer: "A",
    explanation: "Social benefit = private benefit + external benefit; social cost = private cost + external cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of an **external benefit**?",
    options: [
      ["A neighbour's crops are pollinated by a farmer's bees", "Correct: a benefit to a third party who does not pay."],
      ["A shop owner earns more revenue after repainting the shop", "Higher revenue is a private benefit to the owner."],
      ["A student enjoys a film she paid to watch", "Her enjoyment is a private benefit."],
      ["A factory's smoke damages washing hung outside nearby houses", "This is an external cost, not a benefit."],
    ],
    answer: "A",
    explanation: "The neighbours gain from pollination without paying the beekeeper: an external (positive) benefit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a free market tend to over-produce goods whose production creates external costs?",
    options: [
      ["Producers base decisions on private costs, which are below social costs", "Correct: costs falling on third parties are ignored."],
      ["Consumers know the goods are harmful and buy more of them", "Consumers' knowledge of harm would reduce, not raise, demand."],
      ["The government pays producers to make more of them", "That would be a subsidy, not the cause of the failure."],
      ["Social costs are always lower than private costs", "With external costs, social cost is higher than private cost."],
    ],
    answer: "A",
    explanation: "Firms ignore the external cost, so they act as if production is cheaper than it really is for society and produce too much.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A firm's private cost of producing a batch of chemicals is US\\$4,600. Its waste causes US\\$1,350 of damage to a river used by farmers. What is the social cost of the batch?",
    options: [
      ["US\\$5,950", "Correct: 4,600 + 1,350."],
      ["US\\$3,250", "This subtracts the external cost instead of adding it."],
      ["US\\$4,600", "This is the private cost only."],
      ["US\\$1,350", "This is the external cost only."],
    ],
    answer: "A",
    hints: ["Social cost = private cost + external cost."],
    explanation: "Social cost = 4,600 + 1,350 = **US\\$5,950**.",
  });
  check("sc", 4600 + 1350, 5950);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which situation is most likely to lead to **under-consumption** in a free market?",
    options: [
      ["Households decide whether to have their children vaccinated", "Correct: vaccination has external benefits that households ignore."],
      ["Motorists decide how often to drive into a crowded city centre", "Driving has external costs, so it is over-consumed."],
      ["A mine decides how much ore to process near a river", "Pollution is an external cost, leading to over-production."],
      ["Smokers decide how many cigarettes to buy each week", "Smoking has external costs and is over-consumed."],
    ],
    answer: "A",
    hints: ["Under-consumption comes from external benefits."],
    explanation: "When social benefit exceeds private benefit, people consume less than is best for society, as with vaccination.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A factory's smoke causes an external cost of US\\$12 per unit produced. Which policy would make the factory take the full social cost into account?",
    options: [
      ["An indirect tax of US\\$12 on each unit produced", "Correct: the tax equals the external cost, so the firm's costs now match social costs."],
      ["A subsidy of US\\$12 on each unit produced", "A subsidy lowers costs and would increase output and pollution."],
      ["A maximum price set US\\$12 below the market price", "A price ceiling does not make the firm count the smoke as a cost."],
      ["A guarantee to buy all the factory's unsold output", "Buying surpluses encourages more output, not less."],
    ],
    answer: "A",
    hints: ["Which policy adds the external cost to the firm's own costs?"],
    explanation: "A tax per unit equal to the external cost 'internalises' the externality: the firm's private cost rises to the social cost, so it cuts output towards the socially best level.",
  });
  // Calculations.
  const pb = 41000, pc = 33500, ec = 9800;
  const sc = pc + ec;
  check("sc2", sc, 43300);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: pb - sc,
    stem: `A fictional sawmill earns revenue of US\\$${pb.toLocaleString("en-GB")} a month and has private costs of US\\$${pc.toLocaleString("en-GB")}. Its logging causes soil erosion and silting of a river, which cost local farmers an estimated US\\$${ec.toLocaleString("en-GB")} a month. There are no external benefits. Calculate the net gain or loss to society each month (enter a loss as a negative number).`,
    wrong: [pb - pc, sc],
    hints: ["Social cost = private cost + external cost.", "Net effect = social benefit − social cost."],
    explanation: `1. Social cost = ${pc.toLocaleString("en-GB")} + ${ec.toLocaleString("en-GB")} = ${money(sc)}.\n2. Social benefit = private benefit = ${money(pb)}.\n3. Net effect = ${pb.toLocaleString("en-GB")} − ${sc.toLocaleString("en-GB")} = **${money(pb - sc)}** a month: a loss to society, although the sawmill makes a private profit of ${money(pb - pc)}.`,
  });
  const pb2 = 650, eb2 = 290;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pb2 + eb2, daily: true,
    stem: `A household installs a solar water heater. It saves the household US\\$${pb2} a year in electricity bills (private benefit). Less demand on the national grid gives other users an external benefit of US\\$${eb2} a year. Calculate the social benefit per year.`,
    wrong: [pb2 - eb2, pb2],
    explanation: `Social benefit = private benefit + external benefit = ${pb2} + ${eb2} = **${money(pb2 + eb2)}** a year.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: 7300 - 5150,
    stem: "The social cost of running a fictional cement plant for a day is US\\$7,300. Its private cost is US\\$5,150. Calculate the external cost per day.",
    wrong: [7300 + 5150, 7300],
    hints: ["Rearrange: external cost = social cost − private cost."],
    explanation: `External cost = social cost − private cost = 7,300 − 5,150 = **${money(7300 - 5150)}** a day.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Social cost is the sum of private cost and external cost.",
    answer: true,
    explanation: "True: social cost = private cost + external cost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The wages a factory pays its workers are an external cost of production.",
    answer: false,
    explanation: "False. Wages are paid by the firm itself: a **private** cost. External costs fall on third parties.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each effect with its type.",
    pairs: [
      ["Fuel bought by a bus operator", "Private cost"],
      ["Fumes from the bus breathed by pedestrians", "External cost"],
      ["Fares received by the bus operator", "Private benefit"],
      ["Less crowded roads for car drivers when people travel by bus", "External benefit"],
    ],
    explanation: "Private effects fall on the operator; external effects fall on third parties (pedestrians, drivers).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When there are external costs, social cost is {{blank:a}} than private cost and the good is {{blank:b}}. When there are external benefits, social benefit is {{blank:c}} than private benefit and the good is {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["greater"], choices: ["greater", "less"] },
      { id: "b", accepted: ["over-produced"], choices: ["over-produced", "under-produced"] },
      { id: "c", accepted: ["greater"], choices: ["greater", "less"] },
      { id: "d", accepted: ["under-produced"], choices: ["over-produced", "under-produced"] },
    ],
    wrong: [["less", "under-produced", "less", "over-produced"]],
    explanation: "External costs: SC > PC, over-production. External benefits: SB > PB, under-production.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why people may drive into a city centre more than is best for society.",
    points: [
      "Drivers consider only their private costs (fuel, time) and private benefits.",
      "Driving creates external costs: congestion that slows others, fumes, noise, accidents.",
      "So the social cost of a journey is greater than the private cost.",
      "Drivers make more journeys than they would if they paid the full social cost (over-consumption).",
    ],
    modelAnswer: "Each driver weighs only private costs, such as fuel and time, against the benefit of the trip. But every extra car slows other road users, adds fumes and noise, and raises the risk of accidents: external costs paid by others. Because the social cost of a trip is higher than the private cost, drivers make more trips than is best for society.",
    hints: ["What do drivers pay for, and what do they not pay for?"],
    explanation: "Credit: private decision, external costs named, SC > PC, over-consumption.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss whether a tax is the best way to reduce pollution from a mine.",
    points: [
      "For: a tax per unit equal to the external cost makes the mine pay the social cost, so it cuts output / pollution.",
      "For: raises revenue that can repair damage or compensate affected people; firms choose the cheapest way to cut pollution.",
      "Against: hard to measure the external cost, so the tax may be set too high or too low.",
      "Against: if demand is inelastic or the mine is very profitable, output and pollution may fall little; jobs may be lost.",
      "Alternative: regulation (emission limits, inspection) acts directly but is costly to enforce.",
      "Justified conclusion.",
    ],
    modelAnswer: "A tax equal to the external cost makes the mine treat pollution as a cost, so it produces less or invests in cleaner methods, and the revenue can compensate people living nearby. However, the damage is hard to value, so the tax may be wrong, and a profitable mine may simply pay it and keep polluting, while a high tax could cost jobs. Regulation, such as limits on waste released into rivers backed by inspections, acts more directly but is costly to enforce. A tax is a good tool, but for dangerous pollution strict regulation is better; often the two are combined.",
    hints: ["How does a tax change the mine's costs? What might stop it working?"],
    explanation: "Weigh the incentive and revenue of a tax against measurement and effectiveness problems, compare with regulation, conclude.",
  });

  // Structured 1: table of a smelter-style decision (different figures from the lesson).
  const ext = 180;
  const rows = [
    { u: "1st", rev: 760, pc: 420 },
    { u: "2nd", rev: 760, pc: 520 },
    { u: "3rd", rev: 760, pc: 610 },
    { u: "4th", rev: 760, pc: 700 },
    { u: "5th", rev: 760, pc: 790 },
  ];
  const firmQ = rows.filter((r) => r.rev > r.pc).length;
  const socialQ = rows.filter((r) => r.rev >= r.pc + ext).length;
  check("firmQ", firmQ, 4);
  check("socialQ", socialQ, 2);
  const T = table(["Truckload", "Extra revenue (US\\$)", "Extra private cost (US\\$)"], rows.map((r) => [r.u, r.rev, r.pc]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `A fictional quarry decides how many truckloads of crushed stone to produce each day. Each truckload causes dust and noise that cost nearby residents US\\$${ext} (an external cost).\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: firmQ, stem: "How many truckloads will the quarry produce if it compares only extra revenue with extra private cost?", wrong: [5], explanation: `Truckloads 1 to ${firmQ} each add more revenue than private cost (the 5th costs US\\$790, more than US\\$760).` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: rows[2].pc + ext, stem: "Calculate the extra social cost of the 3rd truckload.", wrong: [rows[2].pc], explanation: `${rows[2].pc} + ${ext} = ${money(rows[2].pc + ext)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "plain", value: socialQ, stem: "How many truckloads a day are best for society?", wrong: [firmQ], explanation: `Extra social costs are ${rows.map((r) => r.pc + ext).join(", ")}; only the first ${socialQ} are covered by the extra revenue of US\\$760.` }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain why the quarry's own decision is an example of market failure.",
        points: [
          "The quarry ignores the external cost, so its private cost is below the social cost.",
          `It produces ${firmQ} truckloads instead of the socially best ${socialQ}: over-production, a misallocation of resources.`,
        ],
        modelAnswer: `The quarry counts only its private costs and ignores the US\\$${ext} of dust and noise each truckload imposes on residents, so it produces ${firmQ} truckloads when only ${socialQ} are worth their full social cost. Resources are over-allocated to quarrying.`,
        explanation: "Ignoring the external cost leads to over-production.",
      }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government should limit the quarry to two truckloads a day by regulation.",
        points: [
          "For: a limit directly cuts output to the socially best level, reducing dust and noise quickly.",
          "For: easy for residents to understand and to check (count trucks).",
          "Against: the government needs accurate information on the external cost; the right limit may change.",
          "Against: enforcement cost; the quarry may cheat; lost output and jobs; customers pay more for stone.",
          "Alternative: a tax of US\\$180 per truckload gives the same result while raising revenue to compensate residents; or require dust controls.",
          "Justified conclusion.",
        ],
        modelAnswer: `A limit of two truckloads would bring output straight down to the level that is best for society and cut the dust and noise at once, and it is easy to check. However, the government must know the external cost accurately, the limit needs inspectors to enforce it, and the quarry will lose output and may cut jobs. A tax of US\\$${ext} per truckload would lead the quarry to choose two truckloads by itself and raise money to compensate residents, and rules requiring dust nets or watering could cut the external cost instead of output. Regulation works, but a tax or a requirement to reduce dust may achieve the same aim at lower cost.`,
        explanation: "Weigh the directness of a quantity limit against information, enforcement and output costs; compare with a tax.",
      }),
    ],
    hints: ["Extra social cost = extra private cost + external cost.", "Produce a unit only if its extra revenue covers its extra cost."],
    explanation: `Firm: ${firmQ} truckloads; society: ${socialQ}. The external cost of US\\$${ext} per truckload causes over-production.`,
  });

  // Structured 2: external benefits, apprenticeships.
  const pbA = 2700, pcA = 3100, ebA = 950;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: `A young worker in a fictional town is considering an apprenticeship. It would cost him US\\$${pcA.toLocaleString("en-GB")} in fees and lost wages and raise his future earnings by about US\\$${pbA.toLocaleString("en-GB")}. Firms in the town and his future colleagues would gain about US\\$${ebA} from his skills.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: pbA + ebA, stem: "Calculate the social benefit of the apprenticeship.", wrong: [pbA], explanation: `${pbA.toLocaleString("en-GB")} + ${ebA} = ${money(pbA + ebA)}.` }),
      P.tf({ label: "(b)", stem: "Acting in his own interest, the worker will take the apprenticeship.", answer: false, explanation: `False: his private cost (${money(pcA)}) exceeds his private benefit (${money(pbA)}), so he will not.` }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government should subsidise apprenticeships.",
        points: [
          `For: social benefit (${money(pbA + ebA)}) exceeds cost (${money(pcA)}), so society gains; a subsidy above US\\$400 would change his decision.`,
          "For: more skilled workers raise productivity and growth, and reduce unemployment.",
          "Against: opportunity cost of government spending; benefits are hard to estimate.",
          "Against: subsidy goes also to people who would have trained anyway; firms may cut their own training spending.",
          "Alternative: loans, information about returns to training, or requiring firms to train.",
          "Justified conclusion.",
        ],
        modelAnswer: `The apprenticeship is worth ${money(pbA + ebA)} to society but costs ${money(pcA)}, so it should happen, yet the worker will not choose it because his own benefit is US\\$400 short of his cost. A subsidy of just over US\\$400 would change his decision, and more skilled workers raise productivity across the town. However, the subsidy has an opportunity cost, the external benefit is only an estimate, and much of the money may go to people who would have trained anyway. On balance a targeted subsidy is justified because the external benefits are real, but it should be limited to trades where skills are scarce.`,
        explanation: "External benefits justify a subsidy; weigh cost, measurement and deadweight spending.",
      }),
    ],
    hints: ["Social benefit = private benefit + external benefit.", "Compare his private benefit with his private cost."],
    explanation: "An external benefit makes the social benefit exceed the cost while the private benefit does not: under-consumption, corrected by a subsidy.",
  });
  check("gap", pcA - pbA, 400);

  b.card("DEFINITION", "Define **private cost**.", "The cost of an activity paid by the person or firm carrying it out (for example wages, materials, the price paid).");
  b.card("DEFINITION", "Define **external cost**.", "A cost of an activity paid by third parties who are not compensated (for example pollution, congestion).");
  b.card("FORMULA", "Social cost = ?", "Private cost + external cost.");
  b.card("FORMULA", "Social benefit = ?", "Private benefit + external benefit.");
  b.card("DEFINITION", "Define **external benefit**.", "A benefit of an activity received by third parties who do not pay for it (for example less disease when others are vaccinated).");
  b.card("CONCEPT", "What do external costs lead to in a free market?", "Over-production / over-consumption, because social cost exceeds private cost.");
  b.card("CONCEPT", "What do external benefits lead to in a free market?", "Under-production / under-consumption, because social benefit exceeds private benefit.");
  b.card("CONCEPT", "When is an activity worth doing from society's point of view?", "When social benefit is at least equal to social cost.");
  b.card("CONCEPT", "How does a tax equal to the external cost correct over-production?", "It raises the firm's private cost to the social cost, so the firm cuts output to the socially best level.");
});
