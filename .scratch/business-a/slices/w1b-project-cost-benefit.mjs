// W1b: project.cost-benefit (ZIMSEC only)
import { concept, P, chk, money, sum, r2 } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.project.cost-benefit", { file: "project/cost-benefit", keyPrefix: "project.cost-benefit" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "**Cost-benefit analysis** is a method of",
    ok: ["comparing the total costs and benefits of a project", "Correct: it lists, values and compares them."],
    bad: [["calculating a firm's tax payable to the government", "That is a tax calculation, not a CBA."], ["recording the daily sales of a shop in a ledger", "That is bookkeeping."], ["measuring the share of a market held by a firm", "That is market share analysis."]],
    explanation: "CBA lists and values all the costs and benefits of a project and compares the totals.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a **social cost** of building a new factory?",
    ok: ["Pollution of a nearby river", "Correct: it falls on the community, not on the owners."],
    bad: [["The price paid for the factory machinery", "That is a private (economic) cost to the firm."], ["The wages paid to the factory workers", "That is a private cost to the firm."], ["The sales income earned by the factory", "That is a private benefit to the firm."]],
    explanation: "Social costs such as pollution fall on people outside the business.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **social benefit** of a new rural clinic?",
    ok: ["Better health for people in the area", "Correct: it benefits the community."],
    bad: [["The cost of buying medical equipment", "That is a cost, not a benefit."], ["The fee the clinic pays for its licence", "That is a cost to the clinic."], ["The depreciation of the clinic building", "Depreciation is a cost."]],
    explanation: "Improved health and time saved are social benefits.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A project has total benefits of US\\$80,000 and total costs of US\\$50,000. What is the **net benefit**?",
    ok: ["US\\$30,000", "Correct: 80,000 − 50,000."],
    bad: [["US\\$130,000", "Adding the totals is not the net benefit."], ["US\\$1.60", "That is the ratio of benefits to costs, not the net benefit."], ["US\\$40,000", "No calculation of this kind gives 40,000."]],
    hints: ["Net benefit = total benefits − total costs."],
    explanation: "Net benefit = 80,000 − 50,000 = US\\$30,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is it difficult to value the **social benefits** of a project?",
    ok: ["They have no market price, so estimates must be made", "Correct: time saved or health gained are not bought and sold."],
    bad: [["Social benefits are always smaller than economic ones", "Social benefits are often large; the claim is false."], ["Social benefits never arise from a business project", "Many projects bring social benefits."], ["The law forbids social benefits to be given a value", "No law forbids estimating a value."]],
    hints: ["Think about whether time or health is sold in a market."],
    explanation: "Social benefits lack market prices, so valuation relies on estimates.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A planner values the benefits of a road at US\\$500,000, but later finds that the traffic forecast was too high. What does this show about CBA?",
    ok: ["Forecasts are uncertain, so the result may change", "Correct: results depend on estimates."],
    bad: [["CBA can never be used for any project at all", "CBA is useful but should be tested for uncertainty."], ["Costs and benefits are always known with certainty", "Many values are forecasts and may prove wrong."], ["The road must be built, whatever the new forecast", "A new forecast could change the decision."]],
    hints: ["What happens to the benefit-cost ratio if the benefits fall?"],
    explanation: "CBA depends on forecasts and valuations, so the result should be tested against different assumptions.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of cost-benefit analysis?",
    ok: ["It takes account of effects on the whole community", "Correct: it includes social as well as private effects."],
    bad: [["It gives the owners their profit in advance of trading", "CBA does not give profit to owners."], ["It removes all uncertainty from a decision about a project", "CBA cannot remove uncertainty."], ["It can be completed without any estimates being made", "Estimates are always needed."]],
    hints: ["Which feature distinguishes CBA from a simple profit calculation?"],
    explanation: "CBA looks beyond private cash flows to the wider effects on the community.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on a project that has a positive net benefit in a cost-benefit analysis?",
    ok: ["It looks worthwhile, if the estimates are reasonable and tested", "Correct: the decision depends on the quality of the estimates."],
    bad: [["It must be accepted, because a positive net benefit is a guarantee", "No result based on estimates is a guarantee."], ["It must be rejected, because CBA uses estimates and is useless", "Estimates do not make CBA useless; they must be tested."], ["It is worthwhile only if costs exceed benefits by a margin", "A project is worthwhile when benefits exceed costs."]],
    hints: ["Choose the answer that makes the decision conditional."],
    explanation: "A positive net benefit supports the project, but only if the estimates are sound.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a cost-benefit analysis, a benefit-cost ratio above 1 shows that total benefits exceed total costs.",
    answer: true,
    explanation: "True. A ratio above 1 means each dollar of cost produces more than a dollar of benefit.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A cost-benefit analysis only counts the costs and revenues of the owners of the project.",
    answer: false,
    explanation: "False. CBA also counts social costs and benefits that fall on the community and the environment.",
    hints: ["Think about pollution or time saved."],
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to whether it is a social cost or a social benefit of a new factory.",
    pairs: [["Noise and dust for nearby homes", "Social cost"], ["New jobs for local people", "Social benefit"], ["Heavy lorries causing traffic jams", "Social cost"], ["Skills training for workers", "Social benefit"]],
    explanation: "Social effects fall on the community, either as costs or benefits.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Net benefit equals total {{blank:a}} minus total {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["benefits"], choices: ["benefits", "costs", "profits"] },
      { id: "b", accepted: ["costs"], choices: ["benefits", "costs", "taxes"] },
    ],
    explanation: "Net benefit = total benefits − total costs.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** limitation of cost-benefit analysis.",
    accepted: ["difficult to value social effects", "estimates may be wrong", "forecasts are uncertain", "social benefits are hard to measure", "timing of costs and benefits", "bias", "it can be costly", "hard to put a money value on some effects", "uncertainty"],
    explanation: "Valuing social effects, uncertain forecasts, timing and bias are limitations.",
  });

  {
    const costs = [30000, 12000, 4500], bens = [38000, 21000];
    const net = sum(bens) - sum(costs);
    chk(net, 12500, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional council values a school-building project. The costs are ${money(30000)} for building, ${money(12000)} for running costs over ten years and ${money(4500)} for the loss of a football field. The benefits are ${money(38000)} of extra incomes over ten years and ${money(21000)} for the value of extra learning. Calculate the net benefit.`,
      kind: "money", value: net, wrong: [sum(bens), sum(bens) + sum(costs), sum(costs)],
      hints: ["Add the benefits, add the costs, then subtract."],
      explanation: `Total costs = 30,000 + 12,000 + 4,500 = 46,500. Total benefits = 38,000 + 21,000 = 59,000. Net benefit = 59,000 − 46,500 = US\\$12,500.`,
    });
  }
  {
    const cost = 46500, ben = 59000;
    const r = ben / cost;
    chk(r, 1.2688172043, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A fictional project has total benefits of ${money(ben)} and total costs of ${money(cost)}. Calculate the benefit-cost ratio (total benefits ÷ total costs) to two decimal places.`,
      kind: "index", value: r, wrong: [cost / ben, ben - cost],
      hints: ["Divide benefits by costs."],
      explanation: `59,000 ÷ 46,500 = 1.27. Inverting the ratio gives 0.79, which would suggest costs exceed benefits.`,
    });
  }
  {
    const hours = 6, households = 120, wage = 2, weeks = 50;
    const value = hours * households * weeks * wage;
    chk(value, 72000, 1e-9);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A fictional borehole saves each of ${households} households ${hours} hours of water-carrying time a week. The council values an hour of this time at ${money(wage)}. Assuming ${weeks} weeks of use in a year, what is the yearly value of the time saved?`,
      kind: "money", value, wrong: [hours * households * wage, hours * households * 52 * wage],
      hints: ["Hours saved a year = hours a week × households × weeks."],
      explanation: `Hours saved a year = 6 × 120 × 50 = 36,000 hours. Value = 36,000 × 2 = US\\$72,000. Using only one week gives US\\$1,440.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between an economic cost and a social cost of a project.",
    points: ["An economic cost is a money cost to the organisation, such as building and wages", "A social cost falls on the community or environment, such as pollution or congestion"],
    modelAnswer: "An economic cost is a money cost to the organisation, such as the cost of building and wages. A social cost falls on the community or environment, such as pollution or congestion.",
    explanation: "One mark for each type, with an example.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional council plans a new bridge over a river near Gweru. Explain **two** social benefits it might bring.",
    points: ["Shorter travel times for people and goods", "Application: farmers can reach the market faster and sell fresh produce", "Safer crossing for children going to school", "Application: fewer accidents and improved attendance"],
    modelAnswer: "The bridge shortens travel times, so farmers can reach the market faster and sell fresh produce. It also gives children a safe crossing to school, which means fewer accidents and better attendance.",
    hints: ["Think about time, safety and access."],
    explanation: "Two social benefits, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why two groups may disagree about the result of a cost-benefit analysis of a new road.",
    points: ["Landowners who lose land bear the costs", "Businesses and travellers gain the benefits", "Each group values the items differently", "So the same total may seem fair to one group and unfair to the other"],
    modelAnswer: "Landowners lose land and bear the cost, while businesses and travellers gain the benefits. Each group values the items differently, so the same total may seem fair to one group and unfair to the other.",
    hints: ["Think about who pays and who gains."],
    explanation: "The totals hide who gains and who loses.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess how far cost-benefit analysis is a reliable way of deciding whether to build a clinic.",
    points: ["It includes health benefits and costs to the community as well as money costs", "It allows comparison with other projects on the same basis", "Health benefits are hard to value and may be over- or understated", "Future costs and benefits are uncertain", "Judgement with a reason or condition"],
    modelAnswer: "CBA includes the health benefits to the community and the money costs, and allows the clinic to be compared with other projects. But health benefits are hard to value and future costs and benefits are uncertain. CBA is a useful guide if the estimates are checked and the decision is tested with different values, but it should not be the only basis for the decision.",
    hints: ["Weigh the advantages against the limits, and add a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Masvingo Irrigation Co-operative wants to build a small canal to bring water to 80 farms. The canal costs US\\$40,000 to build, US\\$2,500 a year to maintain (for 8 years) and will cause the loss of wetland valued at US\\$5,000. Extra crops are valued at US\\$12,000 a year (for 8 years) and extra jobs at US\\$3,000 a year (for 8 years).",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total costs over the 8 years.", kind: "money", value: 40000 + 2500 * 8 + 5000, wrong: [40000 + 2500 + 5000, 40000 + 2500 * 8], explanation: "Maintenance = 2,500 × 8 = 20,000. Total costs = 40,000 + 20,000 + 5,000 = US\\$65,000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total benefits over the 8 years.", kind: "money", value: (12000 + 3000) * 8, wrong: [12000 * 8, 12000 + 3000], explanation: "Yearly benefits = 12,000 + 3,000 = 15,000. Over 8 years = US\\$120,000." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the net benefit.", kind: "money", value: 120000 - 65000, wrong: [120000 + 65000, 65000 - 120000], explanation: "Net benefit = 120,000 − 65,000 = US\\$55,000." }),
      P.manual({ label: "(d)", marks: 3, stem: "Identify **one** social cost in the case and explain why it is difficult to value.", points: ["The loss of wetland is a social (environmental) cost", "It has no market price", "Its value depends on estimates of what the wetland provides, such as water storage or wildlife"], modelAnswer: "The loss of wetland is a social cost. It has no market price, so its value depends on estimates of what the wetland provides, such as water storage or wildlife.", explanation: "A social cost and the reason valuation is hard." }),
    ],
    hints: ["Maintenance occurs every year for 8 years."],
    explanation: "Costs and benefits are totalled over the project's life, the net benefit is found and a valuation difficulty explained.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: a district council in Matabeleland is choosing between a new clinic and a new bus station. The clinic has total costs of US\\$150,000 and total benefits of US\\$210,000. The bus station has total costs of US\\$100,000 and total benefits of US\\$125,000. Most of the clinic's benefits are the estimated value of better health; the bus station's benefits are mostly fares and market sales that can be measured more reliably. Some residents live far from the proposed clinic site.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the net benefit of the clinic.", kind: "money", value: 210000 - 150000, wrong: [210000 / 150000, 210000 + 150000], explanation: "210,000 − 150,000 = US\\$60,000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the benefit-cost ratio of the bus station to two decimal places.", kind: "index", value: 125000 / 100000, wrong: [100000 / 125000, 25000], explanation: "125,000 ÷ 100,000 = 1.25." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why the clinic's result may be less reliable than the bus station's.", points: ["Most of the clinic's benefits are estimated values of health", "Health benefits have no market price", "So the result could change greatly if the estimates change"], modelAnswer: "Most of the clinic's benefits are estimated values of better health, which have no market price. The result could change greatly if those estimates change, whereas the bus station's benefits can be measured more reliably.", explanation: "Reliability depends on the type of benefit." }),
      P.manual({ label: "(d)", marks: 8, stem: "Evaluate which project the council should choose.", points: ["Clinic: higher net benefit (US\\$60,000 against US\\$25,000) and ratio of 1.40 against 1.25", "Clinic benefits are estimated and may be overstated", "Bus station benefits are more certain", "Some residents live far from the clinic, so the benefit is unequally shared", "Test with lower health values; consider funding both in stages", ["A reasoned recommendation", 2], ["A condition or time-frame", 1]], modelAnswer: "The clinic has the higher net benefit (US\\$60,000 against US\\$25,000) and the higher ratio (1.40 against 1.25), so on the numbers it comes first. But most of its benefit is an estimated value of health, which may be overstated, and some residents live far from the site. The bus station's benefits are more certain. The council should choose the clinic if the result still holds when the value of health is lowered and if transport to the clinic is improved, and could fund the bus station later.", hints: ["Compare the numbers, then the reliability and who benefits, then recommend with a condition."], explanation: "Numbers, reliability and distribution weighed, with a conditional recommendation.", levels: [[1, 1, 3, "Compares totals without considering reliability."], [2, 4, 6, "Considers reliability and distribution using the case."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use the numbers in (a) and (b) in your evaluation."],
    explanation: "Net benefit and ratio are calculated and the choice is evaluated with the limits of the data.",
  });

  b.card("DEFINITION", "Cost-benefit analysis", "A method of deciding whether a project is worthwhile by listing, valuing and comparing all its costs and benefits, including social ones.");
  b.card("FORMULA", "Net benefit", "Net benefit = total benefits − total costs. Worthwhile if positive.");
  b.card("FORMULA", "Benefit-cost ratio", "Benefit-cost ratio = total benefits ÷ total costs. Worthwhile if above 1.");
  b.card("CONCEPT", "Economic and social costs and benefits", "Economic: money costs and benefits to the organisation. Social: effects on the community and environment such as pollution, congestion, jobs and health.");
  b.card("FACT", "Advantages of CBA", "Whole-community view, forces a full list of effects, common measure in money, easier to justify decisions.");
  b.card("FACT", "Limitations of CBA", "Social effects are hard to value, forecasts are uncertain, timing and discounting, hidden winners and losers, possible bias, can be costly.");
  b.card("DEFINITION", "Discounting", "Reducing the value of future costs and benefits because money received later is worth less than money today.");
  b.card("CONCEPT", "Steps in CBA", "Define the project, list costs, list benefits, value each in money, add up, compare, then test the result with different assumptions.");
});
