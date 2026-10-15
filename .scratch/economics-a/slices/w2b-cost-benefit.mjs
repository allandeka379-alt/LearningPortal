// W2b: cost-benefit analysis (both boards; Cambridge A Level only, ZIMSEC Form 6; NPV is ZIMSEC detail).
import { concept, P, ZIM, chk, table, cba, discount, roundTo } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.intervention.cost-benefit", { file: "intervention/cost-benefit", keyPrefix: "intervention.cost-benefit" }, (b) => {
  mc(b, [1, "RECALL"], "Cost-benefit analysis is a method of",
    ["comparing the costs and benefits to society of a project or policy", "Correct: it lists and values all costs and benefits."],
    [["finding the financial profit of a single private firm over one year", "That is a private appraisal."],
     ["measuring the rate of inflation", "CBA is not a price index."],
     ["calculating national income", "CBA appraises a particular project."]],
    "CBA compares the social costs and social benefits of a project.");

  mc(b, [2, "UNDERSTANDING"], "Why are future costs and benefits discounted in a cost-benefit analysis?",
    ["Money received in the future is worth less than the same amount today", "Correct: people prefer money sooner and money today can be invested."],
    [["Prices always fall over time, so future money buys more", "Prices usually rise, and discounting is not about price changes."],
     ["Future benefits are always certain to be smaller than the costs paid today", "They may be larger or smaller; discounting reflects time preference."],
     ["Future costs are always paid by someone else", "Discounting does not depend on who pays."]],
    "Discounting reflects time preference and the opportunity cost of funds.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A project has a net present value of +US\\$12 million. The decision rule says that the project should be",
    ["accepted, because the present value of benefits exceeds the present value of costs", "Correct: NPV > 0."],
    [["rejected, because most of the benefits arrive only in the future", "Future benefits are counted after discounting."],
     ["rejected, because the net present value is a profit", "A positive NPV is a reason to accept."],
     ["accepted only if the discount rate is set at zero, so that future values are not reduced", "The NPV already uses the discount rate."]],
    "A positive NPV means that benefits exceed costs in present value terms.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an intangible benefit of a new road?",
    ["Less stress for drivers on shorter journeys", "Correct: it has no market price and must be estimated."],
    [["The tolls collected by the road operator", "Tolls are a market payment."],
     ["The cost of the tar used to build the road", "That is a cost."],
     ["The wages paid to road builders", "Wages are a market cost."]],
    "Intangibles are effects that have no market price, such as stress, health or scenery.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Which of the following is the most important reason why a private firm and a government might reach different decisions on the same road project?",
    ["The government counts external costs and benefits as well as private ones", "Correct: CBA is a social appraisal."],
    [["Only the government pays for the road, so firms cannot compare", "Who pays is not the main reason."],
     ["Private firms do not use discounting when they compare costs with revenues", "Firms usually discount."],
     ["The government can ignore costs", "A CBA must include costs."]],
    "A social appraisal counts external effects that a private firm ignores.", { hints: ["Whose costs and benefits does each count?"] });

  mc(b, [3, "ANALYSIS"], "If the discount rate used in a cost-benefit analysis rises, what is the likely effect on a project with large initial costs and benefits spread over many years?",
    ["Its net present value falls", "Correct: the later benefits are discounted more heavily."],
    [["Its net present value rises", "A higher rate reduces the value of later benefits."],
     ["Its net present value is unchanged", "The discount rate changes the present values."],
     ["Its initial costs fall", "Costs in year 0 are not discounted."]],
    "A higher discount rate lowers the present value of future benefits, so the NPV falls.", { hints: ["Which amounts are in the future: the costs or the benefits?"] });

  mc(b, [4, "EVALUATION"], "A cost-benefit analysis of a dam shows a positive NPV for the country but some farmers lose their land. This best illustrates the limitation that CBA",
    ["adds up gains and losses without showing who receives them", "Correct: the distribution of gains and losses is not shown."],
    [["cannot include any costs that fall on third parties", "It includes costs."],
     ["ignores the discount rate", "The NPV uses a discount rate."],
     ["can only be used for private firms", "It is used mainly for public projects."]],
    "A positive total NPV can hide losers; CBA does not by itself take account of equity.", { hints: ["Does a positive NPV show who gains?"] });

  {
    const costs = [500, 60, 60, 60, 60, 60], ben = [0, 150, 180, 200, 200, 200];
    const r5 = cba({ costs, benefits: ben, ratePct: 5 });
    const r10 = cba({ costs, benefits: ben, ratePct: 10 });
    chk(roundTo(r5.npv, 1), 40.4, 1e-9); chk(roundTo(r10.npv, 1), -31.3, 1e-9);
    chk(roundTo(r5.bcr, 2), 1.05, 1e-9); chk(roundTo(r10.bcr, 2), 0.96, 1e-9);
    const pvv = discount(1000, 8, 3);
    chk(roundTo(pvv, 2), 793.83, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true, kind: "money", value: pvv, dp: 2, hints: ["Divide by (1 + r) for each year."],
      stem: "A benefit of US\\$1,000 will be received in 3 years' time. The discount rate is 8%. Calculate its present value, in US\\$ to two decimal places.",
      wrong: [1259.71, 760, 920],
      explanation: "PV = 1,000 ÷ 1.08³ = 1,000 ÷ 1.259712 = US\\$793.83. Multiplying by 1.08³ gives a future value (1,259.71), which is the wrong direction." });
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: r5.npv, dp: 1, unit: "US$ thousand", hints: ["Discount each year's costs and benefits, then subtract."],
      stem: "A fictional clinic costs US\\$500 thousand now and US\\$60 thousand a year to run in years 1 to 5. Its benefits are US\\$150, 180, 200, 200 and 200 thousand in years 1 to 5. At a discount rate of 5% the present value of costs is US\\$759.8 thousand and the present value of benefits is US\\$800.1 thousand. Calculate the net present value, in US\\$ thousand to one decimal place (use the unrounded present values).",
      wrong: [130, -31.3, 800.1],
      explanation: "NPV = PV of benefits − PV of costs = 800.14 − 759.77 = +US\\$40.4 thousand (using unrounded values). 130 is the undiscounted net benefit (930 − 800), which ignores the timing of money." });
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "plain", value: r10.npv, dp: 1, unit: "US$ thousand", hints: ["Higher discount rate: compare PVs again."],
      stem: "For the same clinic at a discount rate of 10%, the present value of costs is US\\$727.4 thousand and the present value of benefits is US\\$696.2 thousand. Calculate the net present value, in US\\$ thousand to one decimal place (a loss is negative; use the unrounded present values).",
      wrong: [31.3, 40.4, -130],
      explanation: "NPV = 696.17 − 727.45 = −US\\$31.3 thousand. The project passes at 5% but fails at 10%: the result depends on the discount rate." });
    const q = cba({ costs: [100, 10, 10, 10], benefits: [0, 50, 60, 60], ratePct: 8 });
    chk(roundTo(q.bcr, 2), 1.16, 1e-9);
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "ratio", value: q.bcr, dp: 2, hints: ["BCR = PV of benefits ÷ PV of costs."],
      stem: "A water project costs US\\$100 thousand now and US\\$10 thousand in each of years 1 to 3. Its benefits are US\\$50, 60 and 60 thousand in years 1 to 3. At an 8% discount rate the present value of costs is US\\$125.8 thousand and of benefits US\\$145.4 thousand. Calculate the benefit-cost ratio to two decimal places (use unrounded present values).",
      wrong: [0.87, 19.6, 1.45],
      explanation: "BCR = 145.37 ÷ 125.77 = 1.16. A BCR above 1 means the present value of benefits exceeds that of costs. 0.87 is the inverse." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A cost-benefit analysis includes external costs and benefits as well as private ones.", answer: true,
    explanation: "True. It is a social appraisal, so it counts all costs and benefits to society." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Compare present values, not raw totals."], stem: "If total benefits exceed total costs when added up without discounting, the project must have a positive net present value.", answer: false,
    explanation: "False. Discounting reduces later benefits more than early costs, so a project that looks worthwhile undiscounted can have a negative NPV (as in the clinic at 10%)." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Present value", "Value today of an amount received in the future"], ["Net present value", "PV of benefits minus PV of costs"], ["Intangible benefit", "A benefit with no market price"], ["Discount rate", "The rate used to convert future amounts to present values"]],
    explanation: "Match each CBA term with its definition." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "To find a present value, a future amount is {{blank:a}} by (1 + r) raised to the number of years. A project is accepted if its net present value is {{blank:b}} than zero.",
    blanks: [{ id: "a", accepted: ["divided"], choices: ["divided", "multiplied"] }, { id: "b", accepted: ["greater"], choices: ["greater", "less"] }],
    explanation: "Discount by dividing; accept if NPV > 0." });

  b.short({ d: 2, skill: "RECALL", stem: "What is the term for the value today of an amount that will be received in the future?",
    accepted: ["present value", "the present value", "PV"], wrong: ["future value"],
    explanation: "The present value is the discounted value of a future amount." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define cost-benefit analysis.",
    points: ["A method of appraising a project by listing and valuing all its costs and benefits to society.", "Comparing the totals (usually after discounting) to decide whether it is worthwhile."],
    modelAnswer: "Cost-benefit analysis lists and values all the costs and benefits of a project to society, and compares the totals, usually after discounting, to decide whether the project is worthwhile.",
    explanation: "One mark for all costs and benefits to society, one for the comparison." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about time preference."],
    stem: "Explain why future benefits are discounted in a cost-benefit analysis.",
    points: ["People prefer to receive benefits sooner rather than later (time preference).", "Money received today can be invested to earn a return (opportunity cost).", "So a given amount in the future is worth less than the same amount today.", "Discounting converts future amounts to present values so that they can be compared fairly."],
    modelAnswer: "People prefer benefits sooner, and money received today can be invested to earn a return, so a future amount is worth less than the same amount today. Discounting converts future amounts to present values, so that costs and benefits arising in different years can be compared fairly.",
    explanation: "Time preference, opportunity cost, lower value of later amounts and comparison." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Give limitations and then a judgement."],
    stem: "Discuss the limitations of cost-benefit analysis as a guide to a public decision.",
    points: ["Intangibles are hard to value (health, scenery, life).", "The result is sensitive to the discount rate.", "Forecasts of costs and benefits are uncertain.", "It does not show who gains and who loses.", "Judgement: CBA is a useful guide but should not be the only basis for a decision."],
    modelAnswer: "It is difficult to put a money value on intangibles such as health or scenery, and the result can change with the discount rate chosen. Forecasts of future costs and benefits are uncertain, and a positive total hides who gains and who loses. CBA is a useful way of organising information, but it should be used with other considerations such as fairness and risk, and not as the only basis for a decision.",
    explanation: "Valuation, discount rate, uncertainty, distribution and a judgement." });

  {
    const costs = [60, 5, 5, 5], ben = [0, 35, 35, 35];
    const r = cba({ costs, benefits: ben, ratePct: 10 });
    chk(roundTo(r.pvCosts, 1), 72.4, 1e-9); chk(roundTo(r.pvBenefits, 1), 87.0, 1e-9); chk(roundTo(r.npv, 1), 14.6, 1e-9);
    const t1 = table(["Year", "Costs (US\\$ thousand)", "Benefits (US\\$ thousand)"], costs.map((c, i) => [i, c, ben[i]]), { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the costs and benefits for all years.", "Discount at 10%: divide by 1.1 for each year."],
      stem: `**A village borehole project (illustrative data)**\n\nA council is considering a borehole. Costs and benefits are shown below. The discount rate is 10%.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 105 - 75, unit: "US$ thousand", stem: "Calculate the undiscounted net benefit, in US\\$ thousand.", wrong: [75, 105, 45], explanation: "Total benefits = 3 × 35 = 105. Total costs = 60 + 3 × 5 = 75. Net benefit = 30." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: r.pvCosts, dp: 1, unit: "US$ thousand", stem: "Calculate the present value of the costs, in US\\$ thousand to one decimal place.", wrong: [75, 66.4, 60], explanation: "PV = 60 + 5 ÷ 1.1 + 5 ÷ 1.1² + 5 ÷ 1.1³ = 60 + 4.55 + 4.13 + 3.76 = 72.4." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: r.npv, dp: 1, unit: "US$ thousand", stem: "The present value of the benefits is US\\$87.0 thousand. Calculate the net present value, in US\\$ thousand to one decimal place (use unrounded values).", wrong: [30, 87, 12], explanation: "PV of benefits = 35 × (1/1.1 + 1/1.1² + 1/1.1³) = 87.04. NPV = 87.04 − 72.43 = 14.6." }),
        P.manual({ label: "(d)", marks: 2, stem: "State whether the project should go ahead and give a reason.",
          points: ["Yes, it should go ahead.", "The NPV is positive (US\\$14.6 thousand), so the present value of benefits exceeds that of costs."],
          modelAnswer: "Yes. The net present value is positive, US\\$14.6 thousand, so the present value of the benefits exceeds the present value of the costs." }),
      ],
      explanation: "Undiscounted net benefit 30; PV costs 72.4; NPV +14.6; accept." });
  }
  {
    const costs = [900, 40, 40, 40, 40], ben = [0, 320, 320, 320, 320];
    const r6 = cba({ costs, benefits: ben, ratePct: 6 });
    const r10 = cba({ costs, benefits: ben, ratePct: 10 });
    chk(roundTo(r6.npv, 1), 70.2, 1e-9); chk(roundTo(r10.npv, 1), -12.4, 1e-9);
    const t2 = table(["Item", "Who is affected", "US\\$ thousand"], [["Construction cost (year 0)", "Council", "900"], ["Maintenance (years 1-4, each year)", "Council", "40"], ["Time and vehicle costs saved (years 1-4, each year)", "Road users", "320"], ["Loss of farmland and noise (not valued in the figures)", "Nearby residents", "Not valued"]], { align: ["l", "l", "r"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Total costs and benefits first; then discounting.", "In (d) consider what the figures leave out."],
      stem: `**A new road (illustrative data)**\n\nA council is appraising a new road. The table shows the main items; the cost and benefit figures are for the whole road.\n\n${t2}\n\nThe present value of costs at 6% is US\\$1,038.6 thousand and the present value of benefits is US\\$1,108.8 thousand.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 4 * 320 - (900 + 4 * 40), unit: "US$ thousand", stem: "Calculate the undiscounted net benefit over the four years, in US\\$ thousand.", wrong: [1280, 1060, 220], explanation: "Benefits 4 × 320 = 1,280; costs 900 + 4 × 40 = 1,060; net benefit = 220." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: r6.npv, dp: 1, unit: "US$ thousand", stem: "Calculate the net present value at 6%, in US\\$ thousand to one decimal place (use unrounded values).", wrong: [220, 1108.8, 0], explanation: "NPV = 1,108.80 − 1,038.60 = +70.2." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: r10.npv, dp: 1, unit: "US$ thousand", stem: "At a discount rate of 10% the present value of costs is US\\$1,026.8 thousand and of benefits is US\\$1,014.4 thousand. Calculate the net present value, in US\\$ thousand to one decimal place (a negative number for a loss; use unrounded values).", wrong: [12.4, 70.2, -220], explanation: "NPV = 1,014.4 − 1,026.8 = −12.4. The decision reverses at the higher rate." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why this cost-benefit analysis may give a misleading result.",
          points: ["The external costs (loss of farmland, noise) are not valued in the figures.", "Time savings are estimates and may be wrong.", "The result depends on the discount rate (positive at 6%, negative at 10%)."],
          modelAnswer: "The external costs, such as the loss of farmland and the noise suffered by residents, are not valued, so the costs are understated. The time savings are estimates that may be wrong, and the result changes sign between a discount rate of 6% and 10%, so it depends on a judgement that is open to challenge." }),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether the council should build the road.",
          points: ["For: positive NPV at 6% and benefits to many road users.", "Against: negative at a higher rate; unvalued costs to residents; uncertainty.", "Judgement: build only if the council is confident of the benefits, compensates those who lose and tests alternative discount rates."],
          modelAnswer: "At a discount rate of 6% the NPV is positive and many road users gain, which supports building the road. But the result is negative at 10%, the costs to residents are not valued and forecasts are uncertain. The council should build the road only if the benefits are well supported, the losers are compensated and the result holds when other discount rates are tested." }),
      ],
      explanation: "Undiscounted net benefit 220; NPV +70.2 at 6% and −12.4 at 10%; unvalued external costs and the discount rate limit the result." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give advantages and limitations.", "Reach a judgement."],
    stem: "Assess the usefulness of cost-benefit analysis to a government deciding whether to build a new dam.",
    points: ["It considers all costs and benefits to society, including external effects (land, environment).", "It puts the effects in a common money unit, so alternatives can be compared.", "Discounting allows costs and benefits in different years to be compared.", "Intangibles such as environmental damage are hard to value.", "The result is sensitive to the discount rate, which matters for a long project.", "Forecasts are uncertain and costs often overrun.", "It does not show who gains and who loses (for example displaced villagers).", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Cost-benefit analysis helps a government by considering all the costs and benefits of a dam, including external effects such as flooded farmland and effects on the environment, and by valuing them in money so that alternatives can be compared. Discounting allows costs and benefits that arise in different years to be compared. However, intangibles such as damage to the environment are hard to value, the result for a long-lived project is sensitive to the discount rate, and forecasts are uncertain. It also does not show who gains and who loses, for example villagers who are displaced. Overall it is a useful guide, but the decision should also take account of fairness, risk and other objectives.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the benefits of a systematic social appraisal against valuation, discount-rate and distribution problems." });

  b.card("DEFINITION", "Define **cost-benefit analysis**.", "A method of appraising a project by listing and valuing all its costs and benefits to society and comparing the totals.");
  b.card("FORMULA", "How is **present value** calculated?", "Present value = future value ÷ (1 + r)ⁿ, with r the discount rate as a decimal and n the number of years.");
  b.card("FORMULA", "How is **net present value** calculated?", "NPV = present value of benefits − present value of costs.");
  b.card("CONCEPT", "What is the decision rule in cost-benefit analysis?", "Accept if NPV > 0 (benefit-cost ratio > 1); rank projects by NPV when funds are limited.");
  b.card("CONCEPT", "Why do we discount?", "Money now is worth more than the same amount later (time preference and the opportunity cost of funds).");
  b.card("CONCEPT", "What happens to NPV when the discount rate rises?", "It falls, especially for projects with early costs and late benefits.");
  b.card("DEFINITION", "What is an **intangible** benefit or cost?", "An effect with no market price, such as health, scenery or time saved, which must be estimated.");
  b.card("CONCEPT", "Give three limitations of cost-benefit analysis.", "Valuing intangibles, choosing the discount rate and uncertain forecasts; it also hides who gains and loses.");
  b.card("FACT", "Do Cambridge students need net present value?", "No: Cambridge A Level needs the use of costs and benefits in decisions; NPV is ZIMSEC detail.", "Cambridge note", { applies: ZIM });
});
