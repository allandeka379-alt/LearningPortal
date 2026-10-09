// Slice W3b: risk, uncertainty and decision making.
import { concept, P, mean, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: mean gross margin of sugar beans over four seasons.
const BEANS = [360, 540, 470, 390];
const beanMean = mean(BEANS);
check(beanMean === 440, "beans");
// Num: insurance premium 4% of US$2,500.
const premium = (4 / 100) * 2500;
check(premium === 100, "premium");
// Calc: sell at harvest vs store 4 months.
const bags = 40, pNow = 12, pLater = 17, lossPct = 5, storeCost = 0.6;
const now = bags * pNow;
const later = round(bags * (1 - lossPct / 100) * pLater - bags * storeCost, 2);
const extra = round(later - now, 2);
check(now === 480 && later === 622 && extra === 142, "storage");
// Structured 12: tomatoes vs butternut over five seasons.
const TOM = [900, 1300, 150, 1100, 1050];
const BUT = [520, 610, 480, 580, 560];
const tMean = mean(TOM), bMean = mean(BUT);
const tRange = Math.max(...TOM) - Math.min(...TOM), bRange = Math.max(...BUT) - Math.min(...BUT);
check(tMean === 900 && bMean === 550 && tRange === 1150 && bRange === 130, "struct");
const R_TABLE = table(["Season", "1", "2", "3", "4", "5"], [["Tomatoes (US\\$ per ha)", ...TOM], ["Butternut (US\\$ per ha)", ...BUT]]);

concept("agri.business.risk-decisions", { file: "business/risk-decisions", keyPrefix: "business.risk-decisions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to running several different enterprises so that a loss in one is balanced by the others?",
    options: [
      ["Diversification", "Correct."],
      ["Specialisation", "Specialisation is concentrating on one enterprise, which increases risk."],
      ["Insurance", "Insurance transfers risk to an insurer for a premium."],
      ["Mechanisation", "This is the use of machines."],
    ],
    answer: "A",
    explanation: "Diversification spreads risk across enterprises with different weaknesses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an example of **uncertainty** rather than risk?",
    options: [
      ["A completely new pest arriving with no past records", "Correct: its likelihood and effects cannot be estimated."],
      ["Hail in an area where records show it most years", "Its chance can be estimated: a risk."],
      ["Low prices at harvest, as happens most seasons", "This can be estimated from past seasons."],
      ["A dry spell in a region where records show them often", "Records allow an estimate: a risk."],
    ],
    answer: "A",
    explanation: "Uncertainty means outcomes or likelihoods cannot be estimated, so they cannot be insured.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Against which loss could a tobacco farmer most easily take out insurance?",
    options: [
      ["Hail destroying the crop in the field", "Correct: a measurable, insurable risk."],
      ["A sudden change in government policy", "This is uncertain and not usually insurable."],
      ["Choosing the wrong variety to plant", "Poor management is not insured."],
      ["A fall in the auction price", "Price falls are handled by contracts, not normal insurance."],
    ],
    answer: "A",
    explanation: "Hail insurance is common because the chance of hail can be estimated from records.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the **first** step in making a farm decision?",
    options: [
      ["Identify the problem or opportunity", "Correct."],
      ["Choose the best of the possible alternatives", "This comes after analysing the alternatives."],
      ["Evaluate the results", "This is the last step."],
      ["Implement the plan", "This comes after choosing."],
    ],
    answer: "A",
    explanation: "Identify, collect information, list alternatives, analyse, choose, implement, evaluate.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A farmer signs a contract before planting to sell all her soya beans to a processor at an agreed price. Which risk does this mainly reduce?",
    options: [
      ["The risk of low prices or no buyer", "Correct: market and price risk."],
      ["The risk of drought", "A contract does not bring rain."],
      ["The risk of the beans being stolen", "Security reduces theft."],
      ["The risk of disease in the crop", "Husbandry reduces disease."],
    ],
    answer: "A",
    hints: ["What does the contract fix?"],
    explanation: "A contract guarantees a buyer and a price, reducing market risk.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A vegetable grower near Masvingo loses crops in dry spells most years. Which measure most directly reduces this risk?",
    options: [
      ["Installing irrigation from a borehole or dam", "Correct: it removes dependence on rain."],
      ["Buying a second delivery vehicle", "This does not affect water supply."],
      ["Taking out livestock insurance", "This insures animals, not vegetables."],
      ["Planting more of the same crop on more of the land", "More land does not reduce drought losses."],
    ],
    answer: "A",
    hints: ["What is missing during a dry spell?"],
    explanation: "Irrigation makes yields less dependent on rainfall.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why can insurance companies cover risks but not uncertainty?",
    options: [
      ["They cannot calculate a fair premium without known chances", "Correct: premiums are based on the likelihood of loss."],
      ["Uncertain events never cause any losses", "They can cause great losses."],
      ["Uncertain events are always far too small to matter to anyone", "Size is not the reason."],
      ["The law forbids insuring any farm activity", "Farm insurance exists."],
    ],
    answer: "A",
    hints: ["How does an insurer decide what to charge?"],
    explanation: "Insurers set premiums from the estimated chance and size of loss; with uncertainty these cannot be estimated.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Crop X has a higher average gross margin than crop Y but fails badly about one year in four; crop Y gives a steady, lower return. Which choice is most sensible for a family with no savings?",
    options: [
      ["Mostly crop Y, as one failure could ruin the family", "Correct: lower risk matters most without reserves."],
      ["Only crop X, because its average is higher", "One failure could leave the family without food or money."],
      ["Neither crop, because both carry some risk", "All farming carries risk."],
      ["Whichever crop the neighbours grow", "This ignores the family's situation."],
    ],
    answer: "A",
    hints: ["What happens to this family in a failure year?"],
    explanation: "Without savings, a farmer should limit risk; growing mostly the steady crop (perhaps with some of X) protects the family.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The last step in making a farm decision is to evaluate the results of the decision.",
    answer: true,
    explanation: "True. Evaluation shows whether the decision worked and guides future decisions.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each risk with a suitable way of reducing it.",
    pairs: [
      ["Drought", "Irrigation or drought-tolerant crops"],
      ["Hail", "Crop insurance"],
      ["Low price at harvest", "Contract farming or storing to sell later"],
      ["Stock theft", "Branding and kraaling animals at night"],
      ["Newcastle disease in chickens", "Vaccination and hygiene"],
    ],
    explanation: "Each risk has a matching management method.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the last steps of decision making.",
    template: "… analyse the alternatives, choose the best one, {{blank:a}} the decision and then {{blank:b}} the results.",
    blanks: [
      { id: "a", accepted: ["implement", "carry out", "put into practice", "apply"] },
      { id: "b", accepted: ["evaluate", "review", "assess", "check"] },
    ],
    explanation: "Implement, then evaluate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the payment a farmer makes to an insurance company for insurance cover called?",
    accepted: ["premium", "a premium", "insurance premium", "premiums"],
    keywords: { any: ["premium"] },
    explanation: "A **premium**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer's sugar bean gross margins for four seasons were US\\$360, US\\$540, US\\$470 and US\\$390 per hectare. Calculate the mean gross margin per hectare.",
    value: beanMean, prefix: "US$", wrong: [540 - 360, BEANS.reduce((s, v) => s + v, 0)],
    explanation: `(360 + 540 + 470 + 390) ÷ 4 = 1,760 ÷ 4 = US\\$${beanMean}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A farmer insures a crop worth US\\$2,500. Assume the premium is 4% of the value insured. Calculate the premium.",
    value: premium, prefix: "US$", wrong: [2500 / 4, 4 * 2500],
    explanation: `4 ÷ 100 × 2,500 = US\\$${premium}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda has ${bags} bags of maize. He can sell now at US\\$${pNow} a bag, or store them for four months, when he expects US\\$${pLater} a bag. Assume storage losses of ${lossPct}% of the bags and storage costs of US\\$${storeCost.toFixed(2)} per bag stored. Calculate how much more he would receive by storing, after losses and costs.`,
    value: extra, prefix: "US$", wrong: [bags * (pLater - pNow), round(bags * pLater - bags * storeCost - now, 2)],
    hints: ["Bags left after losses = 95% of 40.", "Subtract storage costs on all 40 bags stored."],
    explanation: `Sell now: 40 × 12 = US\\$${now}. Store: 40 × 0.95 = 38 bags × 17 = US\\$646, minus 40 × 0.60 = US\\$24, gives US\\$${later}. Extra = ${later} − ${now} = US\\$${extra}. The expected price is not certain, so storing carries price risk.`,
    workedSolution: `1. Income if sold now = 40 × US\\$12 = US\\$${now}.\n2. Bags left after 5% loss = 40 × 0.95 = 38 bags.\n3. Income after storage = 38 × US\\$17 = US\\$646.\n4. Storage costs = 40 × US\\$0.60 = US\\$24, so net = 646 − 24 = US\\$${later}.\n5. Extra from storing = ${later} − ${now} = US\\$${extra}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between risk and uncertainty, giving a farming example of each.",
    hints: ["Can the chance of the event be estimated?"],
    points: [
      "Risk: the possible outcomes and their chances can be estimated from past records.",
      "Example of risk: hail, drought or low harvest prices that occur in a known proportion of years (insurable).",
      "Uncertainty: the outcomes or their chances cannot be estimated / cannot be insured.",
      "Example of uncertainty: a new pest or disease never seen before / a sudden policy change.",
    ],
    modelAnswer: "Risk is a situation whose outcomes and likelihood can be estimated from records, such as hail that hits the area in some years and can be insured. Uncertainty cannot be estimated or insured, such as the arrival of a completely new pest or a sudden change in policy.",
    explanation: "Definition plus example of each.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why good decision making is important in farming.",
    hints: ["Think of scarce resources and changing conditions."],
    points: [
      "Land, labour, capital and management are scarce, so they must be used where they earn most.",
      "Good decisions raise profit and reduce losses.",
      "Farmers must respond to changes in weather, prices and policy / meet family goals such as food and school fees.",
    ],
    modelAnswer: "A farmer's land, labour and money are limited, so careful decisions put them where they earn most, raising profit and cutting losses, and let the farm respond quickly to changes in weather and prices.",
    explanation: "Scarce resources, profit, response to change.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: `A farmer near Mutare kept records of the gross margins (US\\$ per ha) of two crops over five seasons. Season 3 was a drought year.\n\n${R_TABLE}`,
    hints: ["Mean = total ÷ 5; range = highest − lowest.", "A wide range means a risky crop."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean gross margin of the tomatoes.",
        value: tMean, prefix: "US$", wrong: [TOM.reduce((s, v) => s + v, 0), 1050],
        explanation: `(900 + 1,300 + 150 + 1,100 + 1,050) ÷ 5 = 4,500 ÷ 5 = US\\$${tMean}.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the mean gross margin of the butternut.",
        value: bMean, prefix: "US$", wrong: [BUT.reduce((s, v) => s + v, 0), 520],
        explanation: `2,750 ÷ 5 = US\\$${bMean}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the range of the tomato gross margins.",
        value: tRange, prefix: "US$", wrong: [1300 - 900, 1300],
        explanation: `1,300 − 150 = US\\$${tRange.toLocaleString("en-GB")}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which statement is supported by the records?",
        options: [
          ["Tomatoes earn more on average but are much riskier", "Correct: mean US\\$900, range US\\$1,150."],
          ["Butternut earns more on average than the tomatoes do", "Butternut's mean is US\\$550."],
          ["Both crops vary by about the same amount", "Butternut's range is only US\\$130."],
          ["The drought had no effect on the tomatoes", "Tomatoes fell to US\\$150 in season 3."],
        ],
        answer: "A",
        explanation: "Tomatoes: higher mean, much wider range. Butternut: lower but steady.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** reasons why the tomato gross margin fell so much in season 3.",
        points: ["Drought reduced yields (tomatoes need regular water).", "Higher costs of watering or spraying / poor fruit quality or price in the dry year."],
        explanation: "Weather effects on yield and costs.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Evaluate how the farmer could reduce the risk of the tomato enterprise while keeping most of its income.",
        points: [
          "Irrigation (e.g. drip from a borehole) reduces the drought risk that caused season 3's loss.",
          "Diversification: keep some butternut (steady returns) alongside tomatoes.",
          "Contracts with buyers or staggered plantings reduce price risk at harvest gluts; IPM and savings reduce other losses.",
          "Judgement: the best combination depends on cost (irrigation is expensive but tackles the main risk shown); a mix of irrigated tomatoes and butternut balances income and risk.",
        ],
        levels: agricultureLevels(4),
        explanation: "Weigh methods against the risks shown and reach a judgement.",
      }),
    ],
    explanation: "Compare the return and risk of two crops from records and evaluate ways of reducing risk.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: "Chipo keeps 30 goats and grows maize near Hwange. Last season she lost four goats to theft, the rains stopped early, and a buyer who promised to collect her maize never came.",
    hints: ["Name each risk, then match a method to it."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Name the **three** types of risk Chipo faced last season.",
        points: ["Theft (of livestock).", "Weather / drought (rains stopped early).", "Market risk (buyer failed to collect / no market)."],
        explanation: "Theft, weather, market.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Suggest one way of reducing each risk you named in (a).",
        points: ["Theft: brand or ear-tag goats, kraal them at night, herd them.", "Drought: plant drought-tolerant crops such as sorghum or millets / early-maturing varieties / conservation agriculture or water harvesting.", "Market: a written contract with a reliable buyer / sell through a co-operative or the GMB / store grain safely to sell later."],
        explanation: "Matching methods.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how keeping goats as well as growing maize already reduces Chipo's risk.",
        points: ["Two enterprises (diversification): a loss in one is partly balanced by the other.", "Goats tolerate drought better than maize and can be sold for cash when the crop fails."],
        explanation: "Diversification.",
      }),
    ],
    explanation: "Identify risks on a mixed farm and suggest ways of reducing them.",
  });

  b.card("DEFINITION", "Risk", "Outcomes and their likelihood can be estimated from records; often insurable (hail, drought frequency).");
  b.card("DEFINITION", "Uncertainty", "Outcomes or likelihood cannot be estimated; not insurable (new pest, sudden policy change).");
  b.card("CONCEPT", "Risks in agriculture", "Weather, pests and diseases, prices and markets, fire and theft, policy, illness, finance, technology.");
  b.card("CONCEPT", "Reducing the effects of risk", "Diversification, insurance, irrigation, drought-tolerant crops, contracts, savings, good husbandry, security, information, flexibility.");
  b.card("DEFINITION", "Diversification", "Running several enterprises so a loss in one is balanced by the others.");
  b.card("CONCEPT", "Steps in making a farm decision", "Identify problem, collect information, list alternatives, analyse, choose, implement, evaluate.");
  b.card("CONCEPT", "Economic factors in decisions", "Costs and prices, expected returns, capital and credit, opportunity cost, markets, risk, diminishing returns.");
  b.card("CONCEPT", "Return versus risk", "A crop with a higher average but wide range is riskier; families without savings may choose steadier returns.");
});
