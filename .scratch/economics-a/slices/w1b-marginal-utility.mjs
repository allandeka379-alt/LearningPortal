// W1b: utility, diminishing marginal utility and the equi-marginal principle (Cambridge A Level; ZIMSEC Form 6).
import { concept, P, chk, fmt, table, utility } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.utility.marginal-utility", { file: "utility/marginal-utility", keyPrefix: "utility.marginal-utility" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Marginal utility is",
    explanation: "Marginal utility is the extra satisfaction from consuming one more unit of a good." },
    ["the additional satisfaction from one more unit", "Correct: the change in total utility from one extra unit."],
    [["the total satisfaction from all units consumed", "That is total utility."], ["the price a consumer pays for one unit", "Price is not utility."], ["the satisfaction from the first unit only", "Marginal utility applies to each additional unit."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The law of diminishing marginal utility states that, as a consumer consumes more of a good in a given period,",
    explanation: "Each additional unit eventually adds less to total satisfaction than the one before." },
    ["the satisfaction from each extra unit eventually falls", "Correct: marginal utility diminishes."],
    [["total utility always falls as more units are consumed", "Total utility rises while MU is positive."], ["the price of the good falls as more is consumed", "The law concerns satisfaction, not price."], ["the consumer spends less income on the good", "Spending depends on price and quantity, not on this law."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Total utility is at its maximum when marginal utility is",
    explanation: "Total utility stops rising when the extra unit adds nothing: MU = 0." },
    ["zero", "Correct: further units add nothing."],
    [["at its highest", "MU is highest for the first unit, when total utility is still low."], ["negative", "Negative MU means total utility is already falling."], ["equal to price", "That is the condition for consumer equilibrium with a budget, not the maximum of TU."]]);

  {
    const tu = [15, 27, 37];
    const mu = utility.marginal(tu);
    chk(mu[2], 10, 1e-9);
    mc({ d: 2, skill: "APPLICATION", stem: "A consumer's total utility from 1, 2 and 3 oranges is 15, 27 and 37. The marginal utility of the third orange is",
      explanation: "MU = 37 − 27 = 10." },
      ["10", "Correct: 37 − 27."], [["37", "That is the total utility."], ["12", "That is the marginal utility of the second orange."], ["18.5", "This is 37 ÷ 2, an average of total utility."]]);
  }

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare marginal utility per dollar."],
    stem: "A consumer buys goods X and Y. MU of the last unit of X is 12 and its price is US\\$3. MU of the last unit of Y is 10 and its price is US\\$2. To raise total utility the consumer should",
    explanation: "MU per dollar: X = 12 ÷ 3 = 4; Y = 10 ÷ 2 = 5. A dollar spent on Y yields more utility, so buy more Y and less X." },
    ["buy more Y and less X", "Correct: Y gives 5 per dollar against 4."],
    [["buy more X and less Y", "X gives less utility per dollar."], ["make no change, because MU of X exceeds MU of Y", "The comparison must use MU per dollar."], ["buy only X", "A change at the margin is needed, not a complete switch."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Link the price fall to MU per dollar."],
    stem: "According to the equi-marginal principle, a fall in the price of X leads the consumer to buy more X because",
    explanation: "A lower price raises MU per dollar of X above that of other goods, so the consumer buys more X until diminishing MU restores the balance." },
    ["MU per dollar of X rises above that of other goods", "Correct: X becomes better value."],
    [["total utility of X falls", "A price fall does not change total utility at a given quantity."], ["the budget line becomes steeper", "That is indifference-curve language and the slope falls when X's price falls."], ["marginal utility of X rises with consumption", "MU diminishes with consumption."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about measurement."],
    stem: "A main criticism of the marginal utility approach is that",
    explanation: "Utility is subjective and cannot be measured or compared between people, so the cardinal units are an assumption." },
    ["utility cannot be measured in units or compared between people", "Correct: this led to the indifference-curve approach."],
    [["it cannot explain a downward-sloping demand curve", "It does explain it."], ["it ignores the price of goods", "Prices are part of the equilibrium condition."], ["it assumes consumers spend no income", "It assumes the whole budget is spent."]]);

  {
    const tu = [13, 25, 35, 43];
    const mu = utility.marginal(tu);
    chk(mu[3], 8, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: mu[3],
      stem: "A consumer's total utility from 1 to 4 cups of tea is 13, 25, 35 and 43. Calculate the marginal utility of the fourth cup.",
      wrong: [43, 10.75, 10],
      explanation: `MU = 43 − 35 = ${mu[3]}. Quoting the total utility (43) or the average (10.75) is a common slip.` });
  }
  {
    const r = 21 / 2;
    chk(r, 10.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: r, sf: 3,
      stem: "The marginal utility of the first unit of good X is 21 and its price is US\\$2. Calculate the marginal utility per dollar of that unit.",
      wrong: [42, 19, 0.095],
      explanation: `MU per dollar = 21 ÷ 2 = ${r}. Multiplying instead of dividing gives 42.` });
  }
  {
    const best = utility.bestBundle({ budget: 20, px: 4, py: 2, muX: [44, 36, 28, 20, 12], muY: [20, 16, 15, 11, 7, 3] });
    chk(best.x, 3, 0); chk(best.y, 4, 0); chk(best.totalUtility, 170, 0); chk(best.left, 0, 0);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: best.y, unit: "units", hints: ["Buy the unit with the highest MU per dollar each time, until the budget runs out."],
      stem: "A consumer has US\\$20. Good X costs US\\$4 with marginal utilities 44, 36, 28, 20, 12 for units 1 to 5. Good Y costs US\\$2 with marginal utilities 20, 16, 15, 11, 7, 3 for units 1 to 6. How many units of Y are in the utility-maximising bundle?",
      wrong: [3, 5, 6],
      explanation: `MU per dollar: X = 11, 9, 7, 5, 3; Y = 10, 8, 7.5, 5.5, 3.5, 1.5. Buy in order X1 (11), Y1 (10), X2 (9), Y2 (8), Y3 (7.5), X3 (7), Y4 (5.5): total US\\$20. Bundle: ${best.x} X and ${best.y} Y.` });
    const best2 = utility.bestBundle({ budget: 16, px: 4, py: 2, muX: [40, 32, 24, 8], muY: [19, 17, 15, 10, 6, 1] });
    chk(best2.x, 2, 0); chk(best2.y, 4, 0); chk(best2.totalUtility, 133, 0); chk(best2.left, 0, 0);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: best2.totalUtility, hints: ["Rank every unit by MU per dollar, then buy until the budget is spent."],
      stem: "A consumer has US\\$16 to spend on good X (US\\$4 each) and good Y (US\\$2 each). The marginal utilities are: X, units 1 to 4: 40, 32, 24, 8; Y, units 1 to 6: 19, 17, 15, 10, 6, 1. Calculate the total utility of the utility-maximising bundle.",
      wrong: [72, 61, 266],
      explanation: `MU per dollar: X = 10, 8, 6, 2; Y = 9.5, 8.5, 7.5, 5, 3, 0.5. Buy X1 (10), Y1 (9.5), Y2 (8.5), X2 (8), Y3 (7.5): US\\$14; X3 costs US\\$4 and cannot be bought, so buy Y4 (5) with the last US\\$2. Bundle: ${best2.x} X and ${best2.y} Y. TU = (40 + 32) + (19 + 17 + 15 + 10) = 72 + 61 = ${best2.totalUtility}.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Marginal utility can be negative.", answer: true,
    explanation: "True. If a consumer is forced to take too much (a seventh slice of bread), extra units reduce total satisfaction." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A consumer is in equilibrium when the marginal utility of every good is the same, whatever its price.", answer: false,
    explanation: "False. Equilibrium requires equal marginal utility per dollar (MU ÷ price)." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Total utility", "Total satisfaction from all units consumed"], ["Marginal utility", "Extra satisfaction from one more unit"], ["Diminishing marginal utility", "Each extra unit adds less than the one before"], ["Consumer equilibrium", "MU ÷ price is equal for all goods and the budget is spent"]],
    explanation: "These are the four basic ideas of utility theory." });

  b.short({ d: 2, skill: "RECALL", stem: "What condition for consumer equilibrium involves marginal utility divided by price for each good?",
    accepted: ["equi-marginal principle", "the equi-marginal principle", "equimarginal principle", "law of equi-marginal utility", "equi marginal principle"], wrong: ["law of demand"],
    explanation: "Equi-marginal principle: MU ÷ price is equal for all goods." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "State the law of diminishing marginal utility.",
    points: ["As more units of a good are consumed in a given period, the marginal utility of each additional unit eventually falls.", "Other things being equal (tastes, other goods, time)."],
    modelAnswer: "The law of diminishing marginal utility says that, other things being equal, as a consumer consumes more units of a good in a given period, the additional satisfaction from each extra unit eventually falls.", explanation: "Statement plus ceteris paribus." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use MU per dollar."],
    stem: "Explain how the equi-marginal principle helps a consumer maximise total utility.",
    points: ["The consumer compares MU per dollar for each good.", "If MU per dollar of X exceeds that of Y, a dollar moved from Y to X raises total utility.", "The consumer keeps reallocating until MU per dollar is equal for all goods.", "The whole budget is spent."],
    modelAnswer: "The consumer compares the marginal utility per dollar of each good. If it is higher for X than for Y, moving a dollar from Y to X raises total utility. Because marginal utility diminishes, MU per dollar falls as more X is bought and rises as less Y is bought, until MU per dollar is the same for all goods with the whole budget spent.",
    explanation: "Compare, reallocate, equalise." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["What happens to MU per dollar of the good?"],
    stem: "Use marginal utility theory to explain why the demand curve for a good slopes downward.",
    points: ["Marginal utility diminishes as more of the good is consumed.", "Consumers buy until MU per dollar equals that of other goods.", "A lower price raises MU per dollar, so the consumer buys more until MU per dollar falls back into line.", "So a lower price is associated with a larger quantity demanded."],
    modelAnswer: "Because marginal utility diminishes, a consumer will buy an extra unit only if the price falls. A fall in the price of a good raises its marginal utility per dollar above that of other goods, so the consumer buys more of it until diminishing marginal utility brings MU per dollar back into line. Quantity demanded therefore rises as price falls.",
    explanation: "Diminishing MU plus MU per dollar gives the downward-sloping demand curve." });

  {
    const tu = [12, 22, 30, 36, 40, 42, 41];
    const mu = utility.marginal(tu);
    chk(mu[2], 8, 0); chk(mu[6], -1, 0);
    const md = utility.table(tu, { unitHeader: "Plates of sadza" });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["MU is the change in total utility."],
      stem: `The table shows a fictional student's total utility (in utils, illustrative) from plates of sadza at one meal.\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: mu[2], stem: "State the marginal utility of the third plate.", wrong: [30, 10], explanation: "30 − 22 = 8." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: mu[6], stem: "Calculate the marginal utility of the seventh plate, including the sign.", wrong: [1, 41], explanation: "41 − 42 = −1." }),
        P.mcq({ label: "(c)", marks: 1, stem: "At how many plates is total utility highest?", options: [["6 plates", "Correct: TU = 42."], ["7 plates", "TU falls to 41."], ["1 plate", "TU is lowest here."], ["5 plates", "TU is 40, below the maximum."]], answer: "A", explanation: "TU is highest at 6 plates." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why a student who must pay for each plate would stop before the sixth plate.",
          points: ["Marginal utility falls with each plate (diminishing marginal utility).", "The student compares MU with the price (or the utility of spending that money on other things).", "When MU per dollar of another use is higher, the student stops buying plates."],
          modelAnswer: "Marginal utility diminishes with each plate. Since each plate costs money, the student compares the extra utility with what the same money would give elsewhere. Once the marginal utility per dollar of sadza falls below that of other uses, the student stops buying, which happens before marginal utility reaches zero at the sixth plate." }),
        P.manual({ label: "(e)", marks: 2, stem: "Use the table to illustrate the law of diminishing marginal utility.",
          points: ["MU falls from 12 to 10, 8, 6, 4, 2 as more plates are eaten.", "Each plate adds less to total utility than the one before."],
          modelAnswer: "The marginal utility falls with each extra plate: 12, 10, 8, 6, 4 and 2 for plates one to six. Each plate adds less to total utility than the previous one, which illustrates diminishing marginal utility." }),
      ],
      explanation: "MU is 12, 10, 8, 6, 4, 2, −1; TU is highest at 6 plates." });
  }
  {
    const best = utility.bestBundle({ budget: 14, px: 3, py: 2, muX: [18, 15, 12, 9, 6], muY: [13, 11, 9, 7, 5, 3] });
    chk(best.x, 2, 0); chk(best.y, 4, 0); chk(best.totalUtility, 73, 0); chk(best.left, 0, 0);
    const mdTable = table(["Unit", "MU of X (US\\$3 each)", "MU of Y (US\\$2 each)"], [[1, 18, 13], [2, 15, 11], [3, 12, 9], [4, 9, 7], [5, 6, 5], [6, "–", 3]]);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Rank every unit by MU per dollar.", "Stop when the budget cannot buy the next unit."],
      stem: `A consumer has US\\$14 to spend on goods X (price US\\$3) and Y (price US\\$2). The table shows the marginal utility of each unit (illustrative data).\n\n${mdTable}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 5.5, sf: 3, stem: "Calculate the marginal utility per dollar of the second unit of Y.", wrong: [11, 3.67, 22], explanation: "11 ÷ 2 = 5.5." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: best.x, unit: "units", stem: "How many units of X are in the utility-maximising bundle?", wrong: [3, 4, 1], explanation: "Ranking by MU per dollar: Y1 6.5, X1 6.0, Y2 5.5, X2 5.0, Y3 4.5, X3 4.0, Y4 3.5 … With US\\$14: Y1, X1, Y2, X2, Y3 cost US\\$12; X3 (US\\$3) is unaffordable; Y4 (US\\$2) uses the rest. Bundle: 2 X and 4 Y." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: best.totalUtility, stem: "Calculate the total utility of the best bundle.", wrong: [33, 40, 66], explanation: "TU = (18 + 15) + (13 + 11 + 9 + 7) = 33 + 40 = 73." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the consumer does not buy the third unit of X.",
          points: ["The consumer has already spent US\\$12 on the units with the highest MU per dollar.", "Only US\\$2 remains, which cannot buy a US\\$3 unit of X."],
          modelAnswer: "After buying two X and three Y the consumer has spent US\\$12 and has US\\$2 left, which cannot buy the third unit of X at US\\$3. The fourth unit of Y is affordable, so it is bought instead." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how the bundle would change if the price of Y rose, assuming the same marginal utilities.",
          points: ["MU per dollar of Y falls for every unit.", "The consumer switches spending towards X (buys less Y and more X)."],
          modelAnswer: "A higher price of Y lowers the marginal utility per dollar of every unit of Y, so X becomes better value. The consumer would buy fewer units of Y and shift spending towards X." }),
      ],
      explanation: "Best bundle 2 X and 4 Y giving 73 utils." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say what the theory explains and where its assumptions fail."],
    stem: "Evaluate the usefulness of marginal utility theory in explaining consumer behaviour.",
    points: ["Explains the downward-sloping demand curve.", "Explains how consumers allocate a limited budget between goods.", "Underlies consumer surplus.", "Utility cannot be measured or compared between people.", "Consumers may not be rational or well informed (habit, advertising).", "Goods may be indivisible or addictive; MU may not diminish.", "Tastes and incomes change.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Marginal utility theory explains why demand curves slope downward and how a consumer with a limited budget allocates spending by comparing marginal utility per dollar. It also underlies consumer surplus. However, utility cannot be measured in units or compared between people, so the numbers are assumptions. Consumers are often not rational or fully informed, being influenced by habit, advertising and others' behaviour, and for addictive or indivisible goods marginal utility may not diminish. Tastes and incomes also change. The theory is a useful simple explanation of demand and choice, but its realism is limited and other approaches, such as indifference curves and behavioural economics, add to it.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Explanatory strengths against measurement and rationality problems, with a judgement." });

  b.card("DEFINITION", "Define **marginal utility**.", "The additional satisfaction from consuming one more unit of a good (change in total utility ÷ change in quantity).");
  b.card("DEFINITION", "Define **total utility**.", "The total satisfaction obtained from consuming a given quantity of a good.");
  b.card("DEFINITION", "State the **law of diminishing marginal utility**.", "As more units of a good are consumed in a period, the marginal utility of each additional unit eventually falls.");
  b.card("CONCEPT", "When is **total utility at a maximum**?", "When marginal utility is zero (extra units add nothing).");
  b.card("FORMULA", "State the **equi-marginal principle**.", "A consumer maximises utility when MU₁ ÷ P₁ = MU₂ ÷ P₂ = … for all goods and the whole budget is spent.");
  b.card("CONCEPT", "How do you build the best bundle in a table?", "Buy, unit by unit, whichever has the highest MU per dollar until the budget cannot buy another unit.");
  b.card("CONCEPT", "How does utility theory explain a downward-sloping demand curve?", "A lower price raises MU per dollar, so the consumer buys more until diminishing MU restores the balance.");
  b.card("CONCEPT", "Give **two** criticisms of marginal utility theory.", "Utility cannot be measured or compared between people; consumers may not be rational or well informed.");
  b.card("FACT", "Can marginal utility be negative?", "Yes: if extra units reduce satisfaction, total utility falls.");
});
