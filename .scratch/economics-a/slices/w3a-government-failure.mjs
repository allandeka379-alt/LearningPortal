// W3a: government failure (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, chk, table, linearMarket, priceControl } from "../lib.mjs";
import { mc, LV5, LV8, LV12 } from "../tables/w3a-kit.mjs";

const base = { a: 96, b: 0.5, c: 6, d: 0.25 };
const mec = 9;
const taxQ = (tax) => linearMarket({ ...base, c: base.c + tax });
const mkt = linearMarket(base);
const opt = taxQ(mec);
chk(mkt.quantity, 120); chk(mkt.price, 36); chk(opt.quantity, 108); chk(opt.price, 42);
const wlOf = (tax) => 0.5 * Math.abs(tax - mec) * Math.abs(opt.quantity - taxQ(tax).quantity);
chk(wlOf(0), 54); chk(wlOf(15), 24); chk(wlOf(6), 6); chk(taxQ(15).quantity, 100); chk(taxQ(6).quantity, 112);

concept("aecon.intervention.government-failure", { file: "intervention/government-failure", keyPrefix: "intervention.government-failure" }, (b) => {
  mc(b, [1, "RECALL"], "Government failure occurs when government intervention",
    ["leads to a net welfare loss or a worse allocation of resources", "Correct: the policy costs more than it gains."],
    [["corrects every market failure completely and at no cost", "That would be a successful policy."], ["is not needed because the market is already efficient", "That describes the absence of market failure."], ["raises the level of employment in the public sector", "Jobs in the public sector are not what defines failure."]],
    "Government failure means intervention reduces welfare or misallocates resources.");

  mc(b, [2, "UNDERSTANDING"], "A regulator comes to act mainly in the interests of the firms it is supposed to control. This is an example of",
    ["regulatory capture", "Correct: the regulator is 'captured' by the industry."],
    [["market failure through a negative externality", "An externality is a spillover cost, not a regulator's bias."], ["a successful price cap on a monopoly industry", "A cap protects consumers; capture works against them."], ["a movement along the demand curve for regulation", "This has nothing to do with the demand curve."]],
    "Regulatory capture is a cause of government failure in which the regulator serves the industry.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an unintended consequence of a binding maximum price?",
    ["A shortage and a black market in the good", "Correct: quantity demanded exceeds quantity supplied at the controlled price."],
    [["A surplus of the good in the shops across the country", "A maximum price below equilibrium creates a shortage, not a surplus."], ["A fall in the cost of producing the good in the long run", "A control does not lower production costs."], ["A rise in the supply of the good to the market", "Suppliers are more likely to cut supply at a lower price."]],
    "A maximum price below equilibrium causes excess demand, which leads to queues and illegal trading.");

  mc(b, [2, "UNDERSTANDING"], "Which cause of government failure is shown when a minister delays an unpopular but necessary policy until after an election?",
    ["A short-term political horizon", "Correct: the decision is shaped by the electoral cycle."],
    [["Regulatory capture by the industry that is affected", "No industry influence is described."], ["An accurate estimate of the external cost of the good", "The example is not about estimation."], ["A fall in administrative cost due to computers", "This is unrelated to the timing of the decision."]],
    "Short-term political horizons make governments favour quick, visible gains over long-run benefits.");

  mc(b, [3, "APPLICATION"], "The marginal external cost of a good is US\\$9 a unit. The government sets a tax of US\\$15 a unit because it overestimated the external cost. Compared with the social optimum, output will be",
    ["too low, because the tax is greater than the external cost", "Correct: an over-large tax cuts output below the optimum."],
    [["too high, because the tax does not remove the whole external cost", "That would apply to a tax below US\\$9."], ["exactly at the optimum, because a tax always fixes the externality", "The tax equals the external cost only when it is US\\$9."], ["unchanged from the free market level, because the tax is paid by consumers", "A tax shifts supply and changes output."]],
    "A tax above the marginal external cost overcorrects, so output falls below the social optimum and a welfare loss re-appears.", { hints: ["Compare the tax with the external cost."] });

  mc(b, [3, "ANALYSIS"], "A government introduces a tax with annual revenue of US\\$800,000. Collection and enforcement cost US\\$200,000 a year. Which statement is correct?",
    ["Collection costs are 25% of revenue, so net revenue is US\\$600,000", "Correct: 200,000 ÷ 800,000 = 25%."],
    [["Collection costs are 20% of revenue, so net revenue is US\\$640,000", "20% uses the cost as a share of revenue plus cost."], ["Collection costs are 4% of revenue, so net revenue is US\\$768,000", "That inverts the division."], ["Collection costs are 25% of revenue, so net revenue is US\\$1,000,000", "Net revenue is revenue minus costs, not plus."]],
    "Collection cost share = 200,000 ÷ 800,000 × 100 = 25%; net revenue = 800,000 − 200,000 = US\\$600,000.", { hints: ["Divide the cost by the revenue, then subtract."], calculator: true });

  mc(b, [3, "EVALUATION"], "Which factor would most reduce the chance of government failure when a country introduces a complex tradable permit scheme?",
    ["A well-staffed regulator able to measure emissions accurately", "Correct: monitoring capacity is essential to complex schemes."],
    [["A large informal sector that is hard to monitor", "That raises the risk of failure."], ["Frequent changes to the rules of the scheme", "Policy instability reduces credibility."], ["A regulator that relies on the industry for its data", "That raises the risk of capture."]],
    "Complex market-based schemes work only if the authority can measure and enforce them.", { hints: ["Which option increases capacity rather than reducing it?"] });

  mc(b, [4, "EVALUATION"], "Which statement best evaluates the case for intervention in a market with a negative externality?",
    ["It depends on whether the welfare gain exceeds the policy's costs and the risk of mis-setting it", "Correct: it weighs market failure against government failure."],
    [["It is always justified because markets never allocate resources efficiently", "Markets do work well in many cases."], ["It is never justified because governments always make mistakes", "Government failure is a risk, not a certainty."], ["It is justified only if it raises government revenue", "Revenue is not the test of welfare."]],
    "A balanced judgement compares the welfare gain from correcting the failure with the costs and risks of the policy.", { hints: ["Which option weighs both market failure and government failure?"] });

  b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: opt.quantity, unit: "units", calculator: true, hints: ["Add the external cost to the supply (MPC) intercept."],
    stem: "Demand (MPB) is P = 96 − 0.5Q and supply (MPC) is P = 6 + 0.25Q (P in US\\$, Q in units). The marginal external cost is a constant US\\$9. What is the socially optimum output, in units?",
    wrong: [120, 100, 112], explanation: "MSC = 15 + 0.25Q. Setting 96 − 0.5Q = 15 + 0.25Q gives 81 = 0.75Q, so Q = 108. The free market output is 120 (96 − 0.5Q = 6 + 0.25Q)." });
  b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: wlOf(15), calculator: true, hints: ["Find the output with the tax, then use the triangle.", "The loss is ½ × (tax − MEC) × (optimum − output with tax)."],
    stem: "In the same market (MPB: P = 96 − 0.5Q; MPC: P = 6 + 0.25Q; marginal external cost US\\$9) the government sets a tax of US\\$15 a unit. Calculate the welfare loss that remains, relative to the social optimum, in US\\$.",
    wrong: [54, 6, 48], explanation: "1. Optimum Q = 108 (tax of US\\$9).\n2. With a US\\$15 tax supply is P = 21 + 0.25Q, so 96 − 0.5Q = 21 + 0.25Q, Q = 100.\n3. At 100 units MSB − MSC = (96 − 50) − (15 + 25) = 46 − 40 = US\\$6 (the overcorrection, 15 − 9).\n4. Welfare loss = ½ × 6 × (108 − 100) = US\\$24. (US\\$54 is the loss with no tax.)" });
  b.num({ d: 3, skill: "APPLICATION", kind: "money", value: wlOf(0), calculator: true, hints: ["Use the free market output and the optimum."],
    stem: "In the same market, what is the welfare loss if the government does nothing, in US\\$?",
    wrong: [24, 108, 216], explanation: "Free market Q = 120; optimum Q = 108. Welfare loss = ½ × 9 × (120 − 108) = US\\$54." });
  {
    const share = 90 / 600 * 100;
    chk(share, 15);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: share, dp: 1, calculator: true, daily: true,
      stem: "A subsidy scheme costs US\\$600,000 a year to run, of which US\\$90,000 is spent on administration and inspections. What percentage of the cost is administration, to one decimal place?",
      wrong: [6.7, 85, 0.15], explanation: "90,000 ÷ 600,000 × 100 = 15.0%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Government failure means that the free market has failed to allocate resources efficiently.", answer: false,
    explanation: "False. That describes market failure. Government failure is the failure of a policy to improve, or its worsening of, the allocation of resources." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Compare the cost of the policy with the benefit."], stem: "A policy that leaves some market failure uncorrected must be an example of government failure.", answer: false,
    explanation: "False. A policy that reduces the loss, even if not completely, is an improvement. Government failure requires that the policy makes welfare worse than the alternative." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each cause of government failure with an example.",
    pairs: [["Poor information", "A tax is set on a wrong estimate of the external cost"], ["Regulatory capture", "A regulator relies on the industry for data and favours it"], ["Unintended consequences", "A maximum price creates a black market"], ["Administrative costs", "Collecting a tax costs a large share of its revenue"]],
    explanation: "Each example shows a different cause of government failure." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A policy is justified only if its {{blank:a}} exceed its costs; when the costs are greater, the result is {{blank:b}} failure.",
    blanks: [{ id: "a", accepted: ["benefits"], choices: ["benefits", "prices", "taxes"] }, { id: "b", accepted: ["government"], choices: ["government", "market", "consumer"] }],
    explanation: "Compare benefits with costs; if costs exceed benefits, the policy is a government failure." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the term for a regulator acting in the interests of the industry it is meant to control.",
    accepted: ["regulatory capture", "capture", "regulator capture"], wrong: ["market failure"],
    explanation: "Regulatory capture." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define government failure.",
    points: ["Government intervention in a market (a policy).", "That causes a net welfare loss or a worse allocation of resources than the situation it was meant to improve."],
    modelAnswer: "Government failure is a situation in which government intervention in a market causes a net welfare loss or a worse allocation of resources than before.",
    explanation: "One mark for intervention, one for the net welfare loss or worse allocation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link the information problem to the policy."],
    stem: "Explain how poor information could lead to government failure when a government taxes a good that causes pollution.",
    points: ["The government needs to know the marginal external cost to set the tax correctly.", "The external cost is hard to measure (for example damage to health or the environment).", "If the tax is set above the external cost, output falls below the social optimum; if below, output is above the optimum.", "Either way a welfare loss remains, and a large error may remove the gain from the tax."],
    modelAnswer: "To set the tax at the right level the government needs to know the marginal external cost, but the damage to health or the environment is hard to measure. If it sets the tax above the true external cost, output falls below the social optimum; if it sets it below, output stays above the optimum. Either way there is a welfare loss, and a large error can remove the gain from the policy.",
    explanation: "Information needed, measurement difficulty, over- and under-correction, welfare loss." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Trace the effect of a maximum price step by step."],
    stem: "Analyse how a maximum price set below the equilibrium price of a basic food may lead to government failure.",
    points: ["The maximum price is below equilibrium, so quantity demanded rises.", "Quantity supplied falls because the price is below what producers want, so there is a shortage.", "The shortage leads to queues, rationing and a black market where the price is above the controlled price.", "Producers may cut output or reduce quality, and some of the poor may be worse off.", "Government spends resources on enforcing the control; the net result may be a loss of welfare."],
    modelAnswer: "A maximum price below the equilibrium price raises the quantity demanded and reduces the quantity supplied, so there is a shortage. The shortage leads to queues, rationing and a black market where the good is sold above the controlled price. Producers may cut output or reduce quality, so some of the people the policy was meant to help may be worse off, and the government must spend resources enforcing the control. The result may be a net loss of welfare, which is government failure.",
    explanation: "Shortage, queues and black market, supply response, enforcement cost." });

  {
    const m = { a: 10, b: 0.02, c: 2, d: 0.02 };
    const pc = priceControl({ ...m, price: 4 });
    chk(pc.eq.quantity, 200); chk(pc.eq.price, 6); chk(pc.qd, 300); chk(pc.qs, 100); chk(pc.shortage, 200); chk(pc.traded, 100);
    const t1 = table(["Price (US\\$ a litre)", "Quantity demanded (thousand litres a week)", "Quantity supplied (thousand litres a week)"], [[4, 300, 100], [6, 200, 200], [8, 100, 300]]);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["At a maximum price compare quantity demanded and supplied.", "The quantity traded is the smaller of the two."],
      stem: `**A maximum price on cooking oil in a fictional country (illustrative data)**\n\nTo protect poor households the government sets a maximum price of US\\$4 a litre for cooking oil. The demand is P = 10 − 0.02Q and the supply is P = 2 + 0.02Q (P in US\\$ a litre, Q in thousand litres a week).\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: pc.eq.price, stem: "State the free market price, in US\\$ a litre.", wrong: [4, 8, 10], explanation: "Demand equals supply (200 thousand litres) at US\\$6." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: pc.shortage, unit: "units", stem: "Calculate the shortage at the maximum price, in thousand litres a week.", wrong: [100, 300, 400], explanation: "At US\\$4: quantity demanded 300, quantity supplied 100; the shortage is 200 thousand litres." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain two unintended consequences of the maximum price.",
          points: ["Only 100 thousand litres are traded, so many households cannot buy any oil (queues or rationing).", "A black market may develop in which the oil is sold above US\\$4 (the price consumers would pay for scarce supply is up to US\\$8).", "Producers may cut quality or hold back supply, since the price is below the level at which they would supply 200 thousand litres."],
          modelAnswer: "Only 100 thousand litres are supplied, so many households cannot buy any oil and have to queue or go without. A black market may develop in which oil is sold above US\\$4, since consumers value the scarce oil at up to US\\$8. Producers may also reduce quality or hold back supply, because the price is below the level at which they would supply 200 thousand litres." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest one alternative policy to help poor households that avoids a shortage.",
          points: ["Direct payments or vouchers to poor households (income support), leaving the market price free.", "This helps them buy the oil without creating a shortage, although it costs the government money and requires identifying the households."],
          modelAnswer: "The government could give poor households direct payments or vouchers and leave the price free. This helps them to buy oil without a shortage, although it costs the government money and needs the poor households to be identified." }),
      ],
      explanation: "Free market price US\\$6; shortage 200 thousand litres; black market and rationing; direct payments avoid the shortage." });
  }
  {
    const tbl = table(["Policy", "Tax per unit (US\\$)", "Output (units)"], [["No tax", 0, 120], ["Tax set by the ministry", 15, 100], ["Tax equal to the external cost", 9, 108]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["The welfare loss is a triangle: half × the gap in the tax and MEC × the gap in output from the optimum.", "Think about why the ministry's estimate was wrong."],
      stem: `**A tax on charcoal (illustrative data)**\n\nCharcoal burning causes smoke and deforestation that cost the community US\\$9 for every unit produced (the marginal external cost). The demand (MPB) is P = 96 − 0.5Q and the supply (MPC) is P = 6 + 0.25Q (P in US\\$, Q in units). A ministry, using a rough study, sets a tax of US\\$15 a unit.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: wlOf(0), stem: "Calculate the welfare loss when there is no tax, in US\\$.", wrong: [24, 108, 216], explanation: "½ × 9 × (120 − 108) = US\\$54." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: wlOf(15), stem: "Calculate the welfare loss when the tax is US\\$15, in US\\$.", wrong: [54, 6, 48], explanation: "The overcorrection is 15 − 9 = US\\$6 and output is 108 − 100 = 8 units below the optimum: ½ × 6 × 8 = US\\$24." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain one cause of government failure shown in this case.",
          points: ["Poor information: the ministry used a rough study, so it overestimated the external cost.", "This led to a tax (US\\$15) above the true marginal external cost (US\\$9).", "Output (100) fell below the social optimum (108), leaving a welfare loss."],
          modelAnswer: "The ministry used a rough study and so overestimated the external cost. The tax of US\\$15 is higher than the true external cost of US\\$9, so output falls to 100 units, below the social optimum of 108, and a welfare loss of US\\$24 remains." }),
        P.manual({ label: "(d)", marks: 3, stem: "Evaluate whether the tax is still better than doing nothing.",
          points: ["The welfare loss falls from US\\$54 to US\\$24, so the tax is an improvement.", "The tax also raises revenue and may reduce deforestation.", "A judgement: the tax is worthwhile, but a tax set nearer to the true external cost, or one reviewed as better information arrives, would be better."],
          modelAnswer: "The tax reduces the welfare loss from US\\$54 to US\\$24 and raises revenue, so it is better than doing nothing, even though it is set too high. A tax nearer to the true external cost, reviewed as better information becomes available, would give a still better result." }),
      ],
      explanation: "No tax loss US\\$54; tax US\\$15 loss US\\$24; poor information caused the over-estimate; the tax is still an improvement." });
  }

  b.ext({ d: 5, skill: "EVALUATION", marks: 12, hints: ["Cover market failure and government failure.", "Consider the economy's capacity to implement policy.", "Reach a judgement."],
    stem: "Evaluate whether government intervention in markets in a developing economy is likely to do more harm than good.",
    points: ["Market failures (public goods, externalities, merit goods, monopoly) are widespread and may be serious in a developing economy.", "Intervention can raise welfare, for example vaccination programmes or a pollution tax set near the true cost.", "Government failure: poor information about external costs and benefits.", "Government failure: weak institutions and regulatory capture.", "Government failure: large informal sector makes taxes and rules hard to enforce.", "Unintended consequences such as black markets from price controls.", "Administrative costs may be a large share of the benefit.", "Limited funds mean subsidies and state provision have a high opportunity cost.", "Short-term political goals and lobbying distort choices.", "Simple, predictable and well-monitored policies are more likely to succeed than complex ones.", "The comparison should be with the realistic alternative, not with a perfect market.", "A justified judgement that depends on the policy, the market and institutions."],
    levels: LV12,
    modelAnswer: "In a developing economy market failures are widespread, with weak infrastructure, limited access to health care and education, and large externalities, so there is a strong case for intervention. Well-designed policies, such as vaccination programmes or a tax set close to the true external cost, can raise welfare considerably. However, government failure is a serious risk: governments often lack accurate information about external costs, regulators can be captured, and a large informal sector makes taxes and rules hard to enforce. Price controls may lead to shortages and black markets, administrative costs can take a large share of any benefit, and funds are limited, so subsidies and state provision carry a high opportunity cost. Short-term political goals and lobbying add further distortions. The comparison, however, must be with the realistic alternative: doing nothing leaves the market failure in place. Overall, intervention is more likely to do good if it is simple, predictable and monitored, and if it targets the largest failures, such as basic health and education, than if it is complex or aims at fine-tuning markets, where the risk of government failure is greater.",
    wordLimit: { min: 150, max: 400 },
    explanation: "Weigh the gains from correcting market failure against the risks of government failure in a low-capacity setting." });

  b.card("DEFINITION", "Define **government failure**.", "Government intervention that causes a net welfare loss or a worse allocation of resources than before.");
  b.card("CONCEPT", "List five causes of government failure.", "Poor information, regulatory capture, unintended consequences, administrative costs and short-term political horizons (also lobbying and corruption).");
  b.card("DEFINITION", "What is **regulatory capture**?", "A regulator comes to act in the interests of the industry it is meant to control.");
  b.card("CONCEPT", "What happens if a tax is set well above the marginal external cost?", "Output falls below the social optimum and a welfare loss re-appears; a very high tax may be as bad as no tax.");
  b.card("CONCEPT", "Why is a maximum price below equilibrium often a government failure?", "It creates a shortage, queues and a black market, and may cut supply and quality.");
  b.card("FORMULA", "How do you measure the administrative burden of a tax?", "Collection cost ÷ revenue × 100; net revenue = revenue − collection cost.");
  b.card("CONCEPT", "What conditions make intervention more likely to succeed?", "Good information, strong and independent institutions, simple and predictable rules, and a credible budget.");
  b.card("CONCEPT", "Why must intervention be compared with the realistic alternative?", "Doing nothing leaves the market failure in place; government failure matters only if the policy does worse than that.");
  b.card("CONCEPT", "How does a large informal sector affect intervention?", "It makes taxes, licences and regulations harder to enforce and narrows the tax base.");
});
