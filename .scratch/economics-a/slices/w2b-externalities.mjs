// W2b: externalities (both boards; Cambridge A Level only, ZIMSEC Form 5).
import { concept, P, ZIM, chk, table, linearMarket } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.intervention.externalities", { file: "intervention/externalities", keyPrefix: "intervention.externalities" }, (b) => {
  mc(b, [1, "RECALL"], "An externality is",
    ["a cost or benefit to a third party that is not reflected in the market price", "Correct: it falls on people outside the transaction."],
    [["a tax charged on a good by the government to raise revenue", "A tax is a policy, not an externality."],
     ["the profit earned by the owner of a firm after all costs are paid", "Profit is a private return."],
     ["a payment made by a buyer to a seller", "That is the price within the transaction."]],
    "An externality is a spillover cost or benefit that falls on third parties.");

  mc(b, [1, "RECALL"], "Social cost is equal to",
    ["private cost plus external cost", "Correct: the cost to the producer plus the cost to others."],
    [["private cost minus external cost", "External costs are added, not subtracted."],
     ["external cost minus private benefit", "Benefits are not part of social cost."],
     ["private benefit plus external benefit", "That is social benefit."]],
    "Social cost = private cost + external cost.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a negative externality of production?",
    ["Smoke from a brickworks that harms the health of nearby residents", "Correct: a cost to third parties from production."],
    [["A farmer who benefits from a neighbour's vaccination of cattle", "That is a positive externality."],
     ["A student who pays fees to attend a college", "That is a private cost."],
     ["A firm that pays a high wage to its workers", "That is a private cost to the firm."]],
    "Pollution from production is a negative externality of production.");

  mc(b, [2, "UNDERSTANDING"], "In a free market with a positive externality of consumption, output will be",
    ["lower than the social optimum", "Correct: the benefit to others is ignored, so too little is produced."],
    [["higher than the social optimum", "That is the case for a negative externality."],
     ["equal to the social optimum", "The market ignores the external benefit."],
     ["zero", "The market still produces, but too little."]],
    "A positive externality means that marginal social benefit is above marginal private benefit, so the market under-provides.", { daily: true });

  mc(b, [3, "ANALYSIS"], "The free market output is where",
    ["marginal private benefit equals marginal private cost", "Correct: MPB = MPC."],
    [["marginal social benefit equals marginal social cost", "That is the social optimum."],
     ["marginal external cost equals marginal external benefit", "Those are not what decides market output."],
     ["marginal private cost equals marginal social cost", "That would be true only when there is no externality."]],
    "The market ignores externalities, so it produces where MPB = MPC.", { hints: ["Whose costs and benefits does the market count?"] });

  mc(b, [3, "APPLICATION"], "At the market output the marginal private cost of a good is US\\$20. The marginal external cost is US\\$6 and the marginal private benefit is US\\$20. The marginal social cost is",
    ["US\\$26", "Correct: 20 + 6."],
    [["US\\$14", "The external cost is added, not subtracted."],
     ["US\\$20", "That is the private cost only."],
     ["US\\$6", "That is the external cost only."]],
    "MSC = MPC + MEC = 20 + 6 = US\\$26.", { hints: ["MSC = MPC + MEC."] });

  mc(b, [4, "ANALYSIS"], "A firm produces a good with a marginal external cost that is constant at US\\$10. Compared with the market outcome, at the social optimum",
    ["output is lower and the price is higher", "Correct: the MSC curve is above MPC, so the intersection with demand is at a lower quantity and a higher price."],
    [["output is higher and the price is lower", "That would happen with a positive externality."],
     ["output and price are both unchanged", "The external cost shifts the MSC curve."],
     ["output is lower and the price is lower", "A fall in output along a demand curve raises the price."]],
    "Adding a constant MEC shifts MSC up parallel to MPC; with downward-sloping demand the optimum has a lower quantity and a higher price.", { hints: ["Where does the MSC curve cut the demand curve compared with the MPC curve?"] });

  {
    const m = linearMarket({ a: 100, b: 0.5, c: 10, d: 0.25 });
    const s = linearMarket({ a: 100, b: 0.5, c: 25, d: 0.25 });
    chk(m.quantity, 120, 1e-9); chk(s.quantity, 100, 1e-9);
    const wl = 0.5 * 15 * (m.quantity - s.quantity);
    chk(wl, 150, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: wl, hints: ["Find the social optimum, then use half × base × height."],
      stem: "Marginal private benefit is P = 100 − 0.5Q and marginal private cost is P = 10 + 0.25Q. The marginal external cost is a constant US\\$15 per unit (P in US\\$, Q in units). Calculate the welfare loss at the free market output, in US\\$.",
      wrong: [300, 1800, 75],
      explanation: "1. Market: 100 − 0.5Q = 10 + 0.25Q, so Q = 120.\n2. MSC = 25 + 0.25Q. Optimum: 100 − 0.5Q = 25 + 0.25Q, so Q = 100.\n3. Over-production = 20 units; the gap between MSC and MSB is US\\$15.\n4. Welfare loss = ½ × 20 × 15 = US\\$150. Using the full rectangle (20 × 15 = 300) or the total external cost (120 × 15 = 1,800) is wrong." });
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: s.quantity, unit: "units", hints: ["Add the external cost to MPC and equate with demand."],
      stem: "Using the same data (MPB: P = 100 − 0.5Q; MPC: P = 10 + 0.25Q; MEC: US\\$15 a unit), what is the socially optimal output, in units?",
      wrong: [120, 90, 150],
      explanation: "MSC = 25 + 0.25Q. Setting 100 − 0.5Q = 25 + 0.25Q gives 75 = 0.75Q, so Q = 100. The market output (120) ignores the external cost." });
    const p = linearMarket({ a: 94, b: 0.5, c: 10, d: 0.25 });
    const q = linearMarket({ a: 106, b: 0.5, c: 10, d: 0.25 });
    chk(p.quantity, 112, 1e-9); chk(q.quantity, 128, 1e-9); chk(0.5 * 12 * (q.quantity - p.quantity), 96, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: 0.5 * 12 * (q.quantity - p.quantity), hints: ["MSB = MPB + 12; find both outputs."],
      stem: "Marginal private benefit of vaccination is P = 94 − 0.5Q and marginal cost is P = 10 + 0.25Q. The marginal external benefit is a constant US\\$12 a unit (P in US\\$, Q in doses). Calculate the welfare loss from the free market output, in US\\$.",
      wrong: [192, 48, 1344],
      explanation: "1. Market: 94 − 0.5Q = 10 + 0.25Q, so Q = 112.\n2. MSB = 106 − 0.5Q. Optimum: 106 − 0.5Q = 10 + 0.25Q, so Q = 128.\n3. Under-provision = 16 doses; gap = US\\$12.\n4. Welfare loss = ½ × 16 × 12 = US\\$96." });
  }
  {
    const Q = [1, 2, 3, 4, 5, 6, 7], mpb = [40, 36, 32, 28, 24, 20, 16], mpc = [8, 12, 16, 20, 24, 28, 32];
    const mec = 4;
    const mark = Q.filter((_, i) => mpb[i] >= mpc[i]).slice(-1)[0];
    const opt = Q.filter((_, i) => mpb[i] >= mpc[i] + mec).slice(-1)[0];
    chk(mark, 5); chk(opt, 4);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: opt, unit: "units", hints: ["Compare MPB with MPC + MEC for each unit."],
      stem: "The following (illustrative) data show the MPB (price) of a good for output of 1 to 7 units: 40, 36, 32, 28, 24, 20 and 16, and the MPC: 8, 12, 16, 20, 24, 28 and 32. Each unit also imposes an external cost of US\\$4. What is the socially optimum output, in units?",
      wrong: [5, 3, 6],
      explanation: "Free market: MPB = MPC at 5 units. With MEC = 4 the MSC of the fifth unit is 28 and MSB is 24, so it should not be produced. The fourth unit has MSB 28 and MSC 24, so the optimum is 4 units." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A positive externality of consumption means that marginal social benefit is greater than marginal private benefit.", answer: true,
    explanation: "True. MSB = MPB + MEB, so MSB lies above MPB." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Which output does a free market choose?"], stem: "With a negative externality of production, the free market produces less than the socially optimal output.", answer: false,
    explanation: "False. The market ignores the external cost, so it produces more than the social optimum." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each example with the type of externality.",
    pairs: [["Pollution of a river by a gold mine", "Negative externality of production"], ["Noise from a loud party", "Negative externality of consumption"], ["Vaccination reducing the spread of disease", "Positive externality of consumption"], ["Training by a firm of workers who later join other firms", "Positive externality of production"]],
    explanation: "Classify by whether it is a cost or a benefit, and whether it arises from production or consumption." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "With a negative externality the market produces {{blank:a}} than the social optimum, because the price reflects only {{blank:b}} costs.",
    blanks: [{ id: "a", accepted: ["more"], choices: ["more", "less"] }, { id: "b", accepted: ["private"], choices: ["private", "social", "external"] }],
    explanation: "External costs are ignored, so output is too high." });

  b.short({ d: 2, skill: "RECALL", stem: "State the formula for marginal social cost in terms of marginal private cost and marginal external cost.",
    accepted: ["MSC = MPC + MEC", "msc = mpc + mec", "MPC + MEC", "marginal private cost plus marginal external cost"], wrong: ["MSC = MPC − MEC"],
    explanation: "MSC = MPC + MEC." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define an external cost.",
    points: ["A cost that falls on a third party (someone not involved in the transaction).", "It is not included in the market price paid by the buyer or received by the seller."],
    modelAnswer: "An external cost is a cost of production or consumption that falls on a third party and is not included in the price paid.",
    explanation: "One mark for third party and one for not being included in the price." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare private and social costs."],
    stem: "Explain why a free market produces too much of a good that causes pollution.",
    points: ["The producer counts only the private cost of production.", "The pollution is an external cost borne by others.", "So marginal social cost is higher than marginal private cost.", "The market output (where MPB = MPC) is higher than the social optimum (MSB = MSC)."],
    modelAnswer: "The producer counts only the private cost of production, and the cost of pollution falls on others. Marginal social cost is therefore above marginal private cost. The market produces where MPB = MPC, which is more than the output where MSB = MSC, so there is over-production.",
    explanation: "Private costs only, external cost ignored, over-production." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use external benefits."],
    stem: "Analyse why the market may provide too little education.",
    points: ["Education benefits the student (private benefit) and others (external benefits: a more productive workforce, better health, lower crime).", "Individuals consider only their own private benefit.", "Marginal social benefit is above marginal private benefit.", "The market output (MPB = MPC) is below the social optimum.", "There is a welfare loss from the under-provision."],
    modelAnswer: "Education brings private benefits to the student and external benefits to others, such as a more productive workforce and better health. Individuals consider only their own benefit, so marginal social benefit is higher than marginal private benefit. The market quantity, where MPB equals MPC, is lower than the social optimum, and there is a welfare loss from this under-provision.",
    explanation: "External benefits ignored, under-provision and welfare loss." });

  {
    const Q = [1, 2, 3, 4, 5, 6, 7], mpb = [40, 36, 32, 28, 24, 20, 16], mpc = [8, 12, 16, 20, 24, 28, 32], meb = 10;
    const msb = mpb.map((v) => v + meb);
    const market = Q.filter((_, i) => mpb[i] >= mpc[i]).slice(-1)[0];
    const opt = Q.filter((_, i) => msb[i] >= mpc[i]).slice(-1)[0];
    chk(market, 5); chk(opt, 6); chk(msb[5] - mpc[5], 2);
    const t1 = table(["Doses (units)", "MPB = price (US\\$)", "MPC (US\\$)", "MEB (US\\$)", "MSB (US\\$)"], Q.map((q, i) => [q, mpb[i], mpc[i], meb, msb[i]]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["The market produces where MPB = MPC.", "MSB = MPB + MEB."],
      stem: `**Vaccination in a fictional district (illustrative data)**\n\nVaccination protects the patient and also reduces the risk of infection for others.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: market, unit: "units", stem: "State the number of doses provided by the free market.", wrong: [4, 6, 7], explanation: "MPB equals MPC (US\\$24) at 5 doses." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: opt, unit: "units", stem: "State the socially optimum number of doses.", wrong: [5, 7, 4], explanation: "At 6 doses MSB is US\\$30 and MPC is US\\$28, so the sixth dose is worth providing; at 7 doses MSB is US\\$26 and MPC is US\\$32, so it is not. The optimum is 6." }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: msb[5] - mpc[5], stem: "Calculate the welfare gain from providing the optimum rather than the market number of doses, in US\\$.", wrong: [10, 4, 6], explanation: "The extra (sixth) dose has MSB 30 and MPC 28: gain = US\\$2." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why the free market provides too few doses.",
          points: ["Buyers count only their private benefit (MPB).", "Others also gain, through a lower risk of infection (an external benefit of US\\$10 a dose).", "MSB is therefore above MPB.", "The market stops at 5 doses, where MPB = MPC, below the social optimum of 6."],
          modelAnswer: "Each person decides on the basis of their own benefit (MPB). Vaccination also lowers the risk of infection for others, an external benefit of US\\$10 a dose, so the marginal social benefit is higher than the private benefit. The market stops at 5 doses, where MPB equals MPC, which is less than the optimum of 6, so there is under-provision." }),
      ],
      explanation: "Market 5 doses, optimum 6 doses, welfare gain US\\$2; the external benefit is ignored." });
  }
  {
    const m = linearMarket({ a: 110, b: 0.5, c: 20, d: 0.25 });
    const s = linearMarket({ a: 110, b: 0.5, c: 38, d: 0.25 });
    chk(m.quantity, 120, 1e-9); chk(m.price, 50, 1e-9); chk(s.quantity, 96, 1e-9); chk(s.price, 62, 1e-9);
    const wl = 0.5 * 18 * (m.quantity - s.quantity);
    chk(wl, 216, 1e-9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["MSC = MPC + 18.", "Welfare loss is a triangle."],
      stem: "**Small-scale gold panning (illustrative data)**\n\nIn a fictional district small-scale panners wash mud into a river, which raises the water treatment costs of a downstream town by US\\$18 for every unit of gold-bearing ore processed. The marginal private benefit (demand) is P = 110 − 0.5Q and the marginal private cost is P = 20 + 0.25Q (P in US\\$, Q in units of ore).",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: m.quantity, unit: "units", stem: "Calculate the free market output.", wrong: [96, 80, 144], explanation: "110 − 0.5Q = 20 + 0.25Q, so 90 = 0.75Q and Q = 120." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: s.quantity, unit: "units", stem: "Calculate the socially optimum output.", wrong: [120, 100, 72], explanation: "MSC = 38 + 0.25Q. 110 − 0.5Q = 38 + 0.25Q, so 72 = 0.75Q and Q = 96." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: wl, stem: "Calculate the welfare loss at the free market output, in US\\$.", wrong: [432, 2160, 108], explanation: "Over-production = 120 − 96 = 24 units; ½ × 24 × 18 = US\\$216." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the panners produce more than the socially optimum output.",
          points: ["The panners count only their private costs (MPC).", "The cost to the town's water treatment is an external cost they ignore.", "So MSC is higher than MPC, and output at MPB = MPC is above the optimum."],
          modelAnswer: "The panners count only their own private costs. The extra treatment cost of US\\$18 a unit is borne by the town and is ignored by the panners, so the marginal social cost is higher than the marginal private cost. They produce where MPB equals MPC, which is more than the optimum." }),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate the difficulty of measuring the external cost in this case.",
          points: ["The water treatment cost may be measured, but health and environmental damage is harder to value.", "The effects may vary over time, from season to season and with other sources of pollution.", "Judgement: an estimate of US\\$18 may be wrong, so the welfare loss and the optimum are uncertain."],
          modelAnswer: "The treatment cost can be measured, but damage to health and fish is difficult to value, and the amount may vary with the season and with other polluters, so the US\\$18 is only an estimate. The welfare loss and the optimum output are therefore uncertain, which makes it hard to set a policy that exactly corrects the externality." }),
      ],
      explanation: "Market 120 units; optimum 96 units; welfare loss US\\$216; the panners ignore the external cost; measurement is uncertain." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the size of the externality and the cost of action.", "Reach a judgement."],
    stem: "Assess whether the external costs of pollution from mining justify government intervention.",
    points: ["Pollution is a negative externality: MSC is above MPC and output is above the social optimum.", "There is a welfare loss to society.", "Those harmed (downstream communities) have little power to negotiate with the mine.", "Government can use taxes, regulation or permits to reduce output or pollution.", "Mining brings jobs, export earnings and tax revenue, so action has costs.", "Difficulty in measuring the external cost makes it hard to set the right policy.", "The costs of monitoring and enforcement may be high.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "The pollution from mining is an external cost: marginal social cost is above marginal private cost, so the mine produces more than the social optimum and society suffers a welfare loss. The people harmed, such as downstream communities, usually cannot negotiate with the mine, so there is a case for government action through taxes, regulation or permits. However, mining provides jobs, exports and tax revenue, the external cost is hard to measure, and monitoring and enforcement are costly. Overall, intervention is justified where the external cost is large, but the policy should be chosen so that its cost does not exceed the benefit.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the welfare loss from the externality against the economic benefits of mining and the cost of policy." });

  b.card("DEFINITION", "Define an **externality**.", "A cost or benefit that falls on a third party and is not reflected in the market price.");
  b.card("FORMULA", "How are **social cost** and **social benefit** found?", "Social cost = private cost + external cost; social benefit = private benefit + external benefit (marginal versions: MSC = MPC + MEC, MSB = MPB + MEB).");
  b.card("CONCEPT", "Where does the free market produce, and where is the social optimum?", "Market: MPB = MPC. Social optimum: MSB = MSC.");
  b.card("CONCEPT", "What does a negative externality of production do to output?", "MSC is above MPC, so the market produces more than the social optimum (over-provision).");
  b.card("CONCEPT", "What does a positive externality of consumption do to output?", "MSB is above MPB, so the market produces less than the social optimum (under-provision).");
  b.card("CONCEPT", "Give an example of each type of externality.", "Negative production: pollution; negative consumption: smoking; positive production: worker training; positive consumption: vaccination.");
  b.card("DEFINITION", "What is the **welfare loss** from an externality?", "The triangle between MSC and MSB over the units that are over- or under-provided; the loss of social welfare compared with the optimum.");
  b.card("FORMULA", "How do you calculate the welfare loss with a constant external cost?", "½ × (market output − optimum output) × external cost per unit.");
  b.card("CONCEPT", "Why are externalities hard to correct?", "External costs and benefits are difficult to measure and value, and policies have costs of their own.");
});
