// W1b: indifference curves, budget lines and income/substitution effects (Cambridge A Level; ZIMSEC Form 6).
import { concept, P, chk, fmt, dpStr, budgetLine, CAM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Illustrative preferences U = xy: the consumer spends half of income on each good.
const hicks = ({ income, px0, px1, py }) => {
  const x0 = income / 2 / px0;
  const y0 = income / 2 / py;
  const u = x0 * y0;
  const x1 = income / 2 / px1;
  // compensated bundle at new prices on the original curve: x/y = py/px1
  const yc = Math.sqrt(u * (px1 / py));
  const xc = u / yc;
  return { x0, y0, x1, xc, yc, sub: xc - x0, inc: x1 - xc, total: x1 - x0, expenditure: px1 * xc + py * yc };
};

concept("aecon.utility.indifference-curves", { file: "utility/indifference-curves", keyPrefix: "utility.indifference-curves" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "An indifference curve shows",
    explanation: "An indifference curve joins all combinations of two goods that give the consumer the same satisfaction." },
    ["combinations of two goods that give equal satisfaction", "Correct: the consumer is indifferent between them."],
    [["combinations of two goods the consumer can afford", "That is the budget line."], ["the quantities of a good demanded at different prices", "That is the demand curve."], ["the relationship between price and quantity supplied", "That is the supply curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which statement about indifference curves is correct?",
    explanation: "Indifference curves slope downward and are convex to the origin because the marginal rate of substitution diminishes." },
    ["They slope downward and are convex to the origin", "Correct: diminishing MRS."],
    [["They slope upward and are concave to the origin", "Upward-sloping curves would mean more of both goods is equally good."], ["They can cross if the consumer's tastes change", "Curves for one consumer at one time never cross."], ["A curve nearer the origin shows higher satisfaction", "Higher curves, further from the origin, are preferred."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "With good X on the horizontal axis and good Y on the vertical axis, the slope of the budget line is",
    explanation: "The budget line joins I/PX on the X axis and I/PY on the Y axis; its slope is PX ÷ PY." },
    ["PX ÷ PY", "Correct: the price ratio."],
    [["PY ÷ PX", "That is the reciprocal."], ["I ÷ PX", "That is the X intercept."], ["MUX × MUY", "Not related to the slope."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A rise in the consumer's income, with prices unchanged, causes the budget line to",
    explanation: "Higher income allows more of both goods: the budget line shifts outward, parallel to the original." },
    ["shift outward in parallel", "Correct: the price ratio is unchanged."],
    [["pivot on the Y axis", "That follows a change in the price of X."], ["shift inward in parallel", "That follows a fall in income."], ["become steeper", "The slope depends only on prices."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare slopes."],
    stem: "At the consumer's equilibrium, the indifference curve is",
    explanation: "Equilibrium is at the point of tangency: the slope of the indifference curve (MRS) equals the slope of the budget line (price ratio)." },
    ["tangent to the budget line, so MRS equals the price ratio", "Correct: the highest affordable curve."],
    [["crossing the budget line, so MRS is greater than the price ratio", "At a crossing a higher curve could be reached."], ["parallel to the budget line at all points", "Curves are convex; they touch the budget line at one point."], ["above the budget line, at the highest curve", "Such bundles are unaffordable."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which effect arises because real income has risen?"],
    stem: "The price of good X falls. The income effect arises because",
    explanation: "A lower price of X raises the consumer's real income (what her money can buy), so she can reach a higher indifference curve." },
    ["the consumer's real income has increased", "Correct: the price fall makes her better off."],
    [["X has become cheaper relative to Y, so she switches", "That is the substitution effect."], ["the consumer's money income has increased", "Money income is unchanged."], ["the consumer prefers X to Y after the price change", "Preferences are unchanged."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Inferior goods have a negative income effect."],
    stem: "The price of an inferior good falls. Compared with a normal good, the total effect on quantity demanded is",
    explanation: "For an inferior good the income effect works against the substitution effect, so the rise in quantity is smaller than for a normal good (but still positive unless the good is a Giffen good)." },
    ["smaller, because the income effect reduces the quantity", "Correct: the income effect is negative."],
    [["larger, because both effects raise the quantity", "That describes a normal good."], ["negative, because inferior goods always have upward-sloping demand", "Only Giffen goods do."], ["zero, because the effects cancel exactly", "They cancel only in a special case."]]);

  mc({ d: 4, skill: "EVALUATION", applies: CAM, hints: ["Giffen goods: income effect stronger than substitution effect."],
    stem: "For a Giffen good, a fall in price causes quantity demanded to",
    explanation: "A Giffen good is inferior and its negative income effect outweighs the substitution effect, so a price fall reduces the quantity demanded." },
    ["fall, because the negative income effect exceeds the substitution effect", "Correct: the demand curve slopes upward."],
    [["rise, because the substitution effect exceeds the income effect", "That describes an ordinary inferior good."], ["rise, because the income effect is positive", "The income effect of a Giffen good is negative."], ["stay constant, because the effects cancel", "Giffen goods are defined by the income effect being larger."]]);

  {
    const bl = budgetLine({ income: 120, px: 4, py: 6 });
    chk(bl.maxX, 30, 1e-9); chk(bl.maxY, 20, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: bl.maxX, unit: "units",
      stem: "A consumer has an income of US\\$120. Good X costs US\\$4 and good Y costs US\\$6. What is the maximum quantity of X she can buy?",
      wrong: [20, 480, 24],
      explanation: `Maximum X = income ÷ price of X = 120 ÷ 4 = ${bl.maxX}. (The maximum of Y is 120 ÷ 6 = 20.)` });
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", value: bl.slope, dp: 2, hints: ["Slope = PX ÷ PY when X is on the horizontal axis."],
      stem: "With the same income and prices (PX = US\\$4, PY = US\\$6), calculate the slope of the budget line, ignoring the sign, to 2 decimal places.",
      wrong: [1.5, 0.5, 30],
      explanation: `Slope = PX ÷ PY = 4 ÷ 6 = ${dpStr(bl.slope, 2)}. Equivalent: rise 20 over run 30. Giving 1.5 inverts the ratio.` });
  }
  {
    const h = hicks({ income: 160, px0: 8, px1: 4, py: 5 });
    chk(h.x0, 10, 1e-9); chk(h.x1, 20, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "plain", value: h.sub, sf: 3, unit: "units", hints: ["Substitution effect = compensated quantity − original quantity."],
      stem: "A consumer with income US\\$160 always spends half of it on each good. The price of X falls from US\\$8 to US\\$4 (PY = US\\$5). She buys 10 units of X before the fall and 20 after it. The bundle on the original indifference curve at the new price ratio has 14.14 units of X. Calculate the substitution effect on X, to 2 decimal places.",
      wrong: [10, 5.86, 4],
      explanation: `Substitution effect = 14.14 − 10 = ${dpStr(h.sub, 2)} units. The income effect is 20 − 14.14 = ${dpStr(h.inc, 2)}; together they make the price effect of +10.` });
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "plain", value: h.inc, sf: 3, unit: "units", hints: ["Income effect = new quantity − compensated quantity."],
      stem: "In the same case (X rises from 10 to 20 units after the price fall, and the compensated bundle contains 14.14 units of X) calculate the income effect on X, to 2 decimal places.",
      wrong: [4.14, 10, 6],
      explanation: `Income effect = 20 − 14.14 = ${dpStr(h.inc, 2)} units. The substitution effect is 14.14 − 10 = ${dpStr(h.sub, 2)}.` });
    chk(h.sub + h.inc, 10, 1e-9);
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Two indifference curves of the same consumer can cross.", answer: false,
    explanation: "False. Crossing would imply that one bundle is both preferred to and equally good as another, which is inconsistent." });
  b.tf({ d: 4, skill: "UNDERSTANDING", applies: CAM, hints: ["Compare the sizes of the two effects."], stem: "Every inferior good is a Giffen good.", answer: false,
    explanation: "False. Giffen goods are rare inferior goods whose income effect outweighs the substitution effect; most inferior goods have downward-sloping demand." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect on the budget line (good X on the horizontal axis).",
    pairs: [["Income rises", "Parallel shift outward"], ["Income falls", "Parallel shift inward"], ["Price of X falls", "Pivots outward on the X axis"], ["Price of X rises", "Pivots inward on the X axis"]],
    explanation: "Income changes shift the line; price changes pivot it." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the amount of one good a consumer will give up to gain one more unit of another while staying on the same indifference curve?",
    accepted: ["marginal rate of substitution", "mrs", "the marginal rate of substitution"], wrong: ["opportunity cost"],
    explanation: "The marginal rate of substitution (MRS) is the slope of the indifference curve." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define a budget line.",
    points: ["A line showing the combinations of two goods a consumer can buy with a given income.", "At given prices (its slope is the price ratio)."],
    modelAnswer: "A budget line shows all the combinations of two goods that a consumer can buy with a given income at given prices. Its slope equals the ratio of the two prices.", explanation: "Definition with prices and income." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Explain both effects separately."],
    stem: "Explain the substitution effect and the income effect of a fall in the price of a normal good.",
    points: ["Substitution effect: the good is cheaper relative to others, so the consumer switches towards it.", "The substitution effect increases quantity demanded.", "Income effect: the price fall raises real income, so the consumer can buy more of everything.", "For a normal good the income effect also increases quantity demanded."],
    modelAnswer: "The substitution effect arises because the good is now cheaper relative to other goods, so the consumer buys more of it in place of others. The income effect arises because the lower price raises the consumer's real income. For a normal good, demand rises with income, so the income effect also increases the quantity demanded.",
    explanation: "Two effects, same direction for a normal good." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about the direction of the income effect."],
    stem: "Analyse why the demand curve for an inferior good normally still slopes downward.",
    points: ["Substitution effect of a price fall raises quantity demanded.", "Income effect of a price fall is negative for an inferior good.", "In most cases the substitution effect is stronger than the income effect.", "So the net effect is a rise in quantity demanded."],
    modelAnswer: "When the price of an inferior good falls, the substitution effect raises the quantity demanded, while the income effect is negative because higher real income reduces purchases of an inferior good. In most cases the substitution effect is the stronger, so the net effect is still a rise in quantity demanded and the demand curve slopes downward.",
    explanation: "Opposing effects; the substitution effect usually dominates." });

  {
    const bl0 = budgetLine({ income: 90, px: 3, py: 5 });
    const bl1 = budgetLine({ income: 120, px: 3, py: 5 });
    const bl2 = budgetLine({ income: 90, px: 2, py: 5 });
    chk(bl0.maxX, 30, 1e-9); chk(bl0.maxY, 18, 1e-9); chk(bl0.slope, 0.6, 1e-9); chk(bl1.maxX, 40, 1e-9); chk(bl1.maxY, 24, 1e-9); chk(bl2.maxX, 45, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Intercepts are income divided by price."],
      stem: "A consumer has an income of US\\$90 a month to spend on good X (price US\\$3) and good Y (price US\\$5).",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: bl0.maxX, unit: "units", stem: "Calculate the maximum quantity of X she can buy.", wrong: [18, 270], explanation: "90 ÷ 3 = 30." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: bl0.maxY, unit: "units", stem: "Calculate the maximum quantity of Y she can buy.", wrong: [30, 450], explanation: "90 ÷ 5 = 18." }),
        P.num({ label: "(c)", marks: 2, kind: "elasticity", value: bl0.slope, dp: 2, stem: "Calculate the slope of the budget line (ignoring the sign).", wrong: [1.67, 0.5], explanation: "PX ÷ PY = 3 ÷ 5 = 0.60 (or 18 ÷ 30)." }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe how the budget line changes if her income rises to US\\$120.",
          points: ["The budget line shifts outward, parallel to the original.", "Intercepts become 40 units of X and 24 units of Y; the slope is unchanged."],
          modelAnswer: "The budget line shifts outward in parallel because prices have not changed. The new intercepts are 40 units of X and 24 units of Y, and the slope is still 0.6." }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe how the original budget line changes if the price of X falls to US\\$2.",
          points: ["The line pivots outward on the Y axis intercept (which stays at 18 units).", "The X intercept rises to 45 units and the line becomes flatter."],
          modelAnswer: "The budget line pivots outward: the Y intercept stays at 18 units because the price of Y and income are unchanged, but the X intercept rises to 45 units and the line becomes flatter (slope 0.4)." }),
      ],
      explanation: "Intercepts 30 and 18, slope 0.6; income shifts, price pivots." });
  }
  {
    const h = hicks({ income: 240, px0: 6, px1: 3, py: 8 });
    chk(h.x0, 20, 1e-9); chk(h.x1, 40, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Substitution effect: original to compensated bundle.", "Income effect: compensated bundle to the new bundle."],
      stem: "A consumer with an income of US\\$240 always spends half of it on each of goods X and Y. The price of Y is US\\$8. The price of X falls from US\\$6 to US\\$3. To find the substitution effect, the economist works out the bundle on the original indifference curve at the new prices: it contains 28.28 units of X and 10.61 units of Y (illustrative preferences).",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: h.x0, unit: "units", stem: "How many units of X does she buy at the original prices?", wrong: [40, 15], explanation: "She spends US\\$120 on X at US\\$6: 20 units." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: h.total, unit: "units", stem: "Calculate the price effect on X (the total change in the quantity of X) after the price falls to US\\$3.", wrong: [8.28, 28.28], explanation: "After the fall she buys 120 ÷ 3 = 40 units of X: 40 − 20 = +20." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: h.sub, sf: 3, unit: "units", stem: "Calculate the substitution effect on X, to 2 decimal places.", wrong: [11.72, 20], explanation: "28.28 − 20 = +8.28." }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: h.inc, sf: 3, unit: "units", stem: "Calculate the income effect on X, to 2 decimal places.", wrong: [8.28, 28.28], explanation: "40 − 28.28 = +11.72." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the income effect is positive for this good.",
          points: ["The fall in the price of X raises the consumer's real income (she can afford more).", "X is a normal good for this consumer, so higher real income increases purchases of it."],
          modelAnswer: "The price fall increases the consumer's real income because she can buy the same bundle for less money. X is a normal good for her, so with more real income she buys more of it, which gives a positive income effect." }),
      ],
      explanation: "Price effect +20 = substitution +8.28 and income +11.72." });
    chk(h.sub, 8.284271247461902, 1e-9);
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say what the model explains and what it assumes."],
    stem: "Evaluate the usefulness of indifference curve analysis in explaining consumer choice.",
    points: ["Needs only ordinal preferences (no measuring of utility).", "Shows how the budget and preferences determine choice.", "Separates the substitution and income effects of a price change.", "Explains normal, inferior and Giffen goods.", "Limited to two goods and assumes rational consumers with stable tastes.", "Cannot be observed directly.", "Ignores habit, advertising and household decision-making.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Indifference curve analysis is useful because it needs only ordinal preferences, so utility does not have to be measured. It shows how a given budget and preferences determine a consumer's choice, and it separates the substitution and income effects of a price change, explaining normal, inferior and Giffen goods. However, it treats only two goods, assumes consumers are rational with stable tastes and cannot easily be tested with real data. It ignores habit, advertising and the way households decide jointly. The model is a powerful tool for understanding the logic of demand, but its predictions are limited by its simple assumptions.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Analytical strengths against realism, with a judgement." });

  b.card("DEFINITION", "Define an **indifference curve**.", "A curve showing all combinations of two goods that give the consumer equal satisfaction.");
  b.card("DEFINITION", "Define the **marginal rate of substitution (MRS)**.", "The amount of one good a consumer will give up for one more unit of another, staying on the same indifference curve; the slope of the curve (MUx ÷ MUy).");
  b.card("DEFINITION", "Define a **budget line**.", "All combinations of two goods affordable with a given income at given prices; slope = PX ÷ PY.");
  b.card("CONCEPT", "What is the **equilibrium condition** in indifference curve analysis?", "Tangency of the highest affordable indifference curve with the budget line: MRS = PX ÷ PY.");
  b.card("CONCEPT", "What does a change in **income** do to the budget line?", "A parallel shift (outward if income rises).");
  b.card("CONCEPT", "What does a change in the **price of X** do to the budget line?", "It pivots on the intercept of the other good; a fall in PX pivots it outward on the X axis.");
  b.card("CONCEPT", "Define the **substitution effect**.", "The change in quantity demanded due to the change in relative prices, keeping the consumer on the original indifference curve.");
  b.card("CONCEPT", "Define the **income effect** of a price change.", "The change in quantity demanded caused by the change in the consumer's real income.");
  b.card("CONCEPT", "Describe a **Giffen good**.", "A very inferior good whose negative income effect outweighs the substitution effect, so a price rise increases quantity demanded.", undefined, { applies: CAM });
});
