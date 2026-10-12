// W1b: income elasticity and cross elasticity of demand (both boards, AS).
import { concept, P, chk, fmt, pctChange, elasticity, dpStr, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.market.yed-xed", { file: "market/yed-xed", keyPrefix: "market.yed-xed" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Income elasticity of demand is calculated as",
    explanation: "YED is the percentage change in quantity demanded divided by the percentage change in income." },
    ["% change in quantity demanded ÷ % change in income", "Correct: this is the definition."],
    [["% change in income ÷ % change in quantity demanded", "This inverts the formula."], ["% change in quantity demanded ÷ % change in price", "This is price elasticity of demand."], ["% change in quantity of A ÷ % change in price of B", "This is cross elasticity of demand."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A good has a negative income elasticity of demand. It is",
    explanation: "A negative YED means that demand falls as income rises: an inferior good." },
    ["an inferior good", "Correct: demand falls when income rises."],
    [["a luxury good", "A luxury has YED above 1."], ["a necessity", "A necessity has YED between 0 and 1."], ["a complement", "Complement describes a relationship between two goods (negative XED)."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A positive cross elasticity of demand between two goods shows that they are",
    explanation: "If a rise in the price of B raises demand for A, the goods are substitutes." },
    ["substitutes", "Correct: consumers switch from B to A."],
    [["complements", "Complements have negative XED."], ["unrelated goods", "Unrelated goods have XED close to zero."], ["inferior goods", "Inferior describes the income response of one good, not a link between two."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "The income elasticity of demand for maize meal is +0.3. Maize meal is best described as",
    explanation: "A positive YED below 1 shows a normal good with income-inelastic demand: a necessity." },
    ["a necessity", "Correct: demand rises, but by less than income."],
    [["an inferior good", "Inferior goods have negative YED."], ["a luxury", "Luxuries have YED above 1."], ["a substitute", "Substitute describes a relationship between goods."]]);

  {
    const dq = 1.5 * 4;
    chk(dq, 6, 1e-9);
    mc({ d: 3, skill: "APPLICATION", hints: ["% change in quantity = YED × % change in income."],
      stem: "YED for restaurant meals is +1.5. Incomes are expected to rise by 4%. Other things equal, demand for restaurant meals will rise by",
      explanation: "% change in demand = 1.5 × 4 = 6%." },
      ["6%", "Correct: 1.5 × 4."], [["2.7%", "This divides 4 by 1.5."], ["4%", "This ignores the elasticity."], ["1.5%", "This divides by 4 instead of multiplying."]]);
  }

  mc({ d: 3, skill: "APPLICATION", hints: ["Sign first, then size."],
    stem: "When the price of sugar rises by 20%, the quantity of tea demanded falls by 10%. The cross elasticity of demand of tea with respect to the price of sugar is",
    explanation: "XED = −10 ÷ 20 = −0.5. The negative sign shows that tea and sugar are complements." },
    ["−0.5, showing complements", "Correct: negative XED means complements."],
    [["+0.5, showing substitutes", "Quantity fell, so the sign is negative."], ["−2, showing complements", "This divides the price change by the quantity change."], ["−0.5, showing substitutes", "A negative XED shows complements."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which sign and size show the closest substitutes?"],
    stem: "XED between brand A and brand B is +3.2, and between brand A and brand C is +0.4. Which statement is correct?",
    explanation: "Both are substitutes (positive), but the larger value shows that brand B is a much closer substitute for A." },
    ["B is a closer substitute for A than C is", "Correct: a higher positive XED shows a closer substitute."],
    [["C is a closer substitute for A than B is", "The larger value, 3.2, shows the closer link."], ["B and C are complements of A", "Positive XED means substitutes."], ["The goods are unrelated because the values differ", "Unrelated goods have XED near zero."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about which goods grow fastest as incomes rise."],
    stem: "A retailer expects incomes to grow steadily for several years. Which product line should it expand?",
    explanation: "A good with high positive income elasticity (a luxury) will see demand grow faster than incomes." },
    ["Goods with YED above 1", "Correct: demand grows faster than income."],
    [["Goods with a negative YED", "Demand for inferior goods falls as incomes grow."], ["Goods with YED between 0 and 1", "Demand grows more slowly than income."], ["Goods with an XED of zero", "XED measures links between goods, not income growth."]]);

  {
    const y = elasticity.yed({ y1: 300, y2: 360, q1: 40, q2: 52 });
    chk(y, 1.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, kind: "elasticity", value: y, dp: 2,
      stem: "Average household income in a fictional town rises from US\\$300 to US\\$360 a month. Monthly purchases of chicken portions per household rise from 40 to 52. Calculate YED.",
      wrong: [0.67, 0.2, 30],
      explanation: `% change in income = +20%; % change in quantity = +30%; YED = 30 ÷ 20 = ${dpStr(y, 2)}. The inverse (0.67) is a common slip.` });
  }
  {
    const y = elasticity.yed({ y1: 800, y2: 880, q1: 500, q2: 465 });
    chk(y, -0.7, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: y, dp: 2, hints: ["Keep the sign."],
      stem: "Household income rises from US\\$800 to US\\$880 a month. Purchases of cassava fall from 500 to 465 kg a month. Calculate YED, including the sign.",
      wrong: [0.7, -1.43, -7],
      explanation: `% change in income = +10%; % change in quantity = −7%; YED = −7 ÷ 10 = ${dpStr(y, 2)}. The negative sign shows an inferior good.` });
  }
  {
    const x = elasticity.xed({ pb1: 1.5, pb2: 1.65, qa1: 400, qa2: 448 });
    chk(x, 1.2, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: x, dp: 2, hints: ["Use the percentage change in the price of the other good."],
      stem: "A fictional bus company raises its fare from US\\$1.50 to US\\$1.65. Daily train trips on the same route rise from 400 to 448. Calculate the cross elasticity of demand of train trips with respect to the bus fare.",
      wrong: [0.83, 0.12, 12],
      explanation: `% change in bus fare = +10%; % change in train trips = +12%; XED = 12 ÷ 10 = ${dpStr(x, 2)}. The positive sign shows substitutes. Dividing the other way gives 0.83.` });
  }
  {
    const x = elasticity.xed({ pb1: 1.0, pb2: 1.1, qa1: 600, qa2: 552 });
    chk(x, -0.8, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: x, dp: 2, hints: ["Sign shows the relationship."],
      stem: "The price of a loaf of bread rises from US\\$1.00 to US\\$1.10 and weekly sales of margarine fall from 600 to 552 tubs. Calculate XED of margarine with respect to the price of bread, including the sign.",
      wrong: [0.8, -1.25, -8],
      explanation: `% change in the price of bread = +10%; % change in margarine = −8%; XED = −8 ÷ 10 = ${dpStr(x, 2)}: complements.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Cross elasticity of demand between two unrelated goods is close to zero.", answer: true,
    explanation: "True. A change in the price of one has no effect on demand for the other." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An inferior good must be a poor-quality good.", answer: false,
    explanation: "False. A good is inferior if demand falls as income rises (negative YED); this depends on consumers' alternatives, not on quality alone." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each value with the type of good or relationship it shows.",
    pairs: [["YED = −0.6", "Inferior good"], ["YED = +0.4", "Necessity (normal good)"], ["YED = +1.8", "Luxury (normal good)"], ["XED = −1.2", "Complements"]],
    explanation: "Negative YED: inferior; 0 to 1: necessity; above 1: luxury; negative XED: complements." });

  b.short({ d: 2, skill: "RECALL", stem: "What type of good has a negative income elasticity of demand?",
    accepted: ["inferior good", "inferior", "an inferior good"], wrong: ["luxury"],
    explanation: "Demand for an inferior good falls as income rises." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define cross elasticity of demand.",
    points: ["A measure of the responsiveness of the quantity demanded of one good to a change in the price of another good.", "% change in quantity demanded of A divided by % change in price of B."],
    modelAnswer: "Cross elasticity of demand measures how responsive the quantity demanded of one good (A) is to a change in the price of another good (B). It equals the percentage change in quantity demanded of A divided by the percentage change in the price of B.",
    explanation: "Idea of responsiveness to another good's price plus the formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use a forecast with numbers."],
    stem: "Explain how a restaurant chain could use income elasticity of demand when planning for the next five years.",
    points: ["YED shows how demand for restaurant meals responds to changes in income.", "With a positive YED above 1, demand grows faster than income (forecast growth).", "It can plan capacity, staffing and investment accordingly (or diversify if incomes are expected to fall)."],
    modelAnswer: "If YED for restaurant meals is above 1, demand will grow by a larger percentage than income. By combining the YED with forecasts of income growth, the chain can estimate future demand and plan the number of restaurants, staff and investment, or diversify if incomes are expected to fall.",
    explanation: "Link YED to forecasting and planning." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["One firm's price affects another's sales."],
    stem: "Analyse why a firm should be interested in the cross elasticity of demand between its product and a rival's product.",
    points: ["A high positive XED means the rival's good is a close substitute.", "A price cut by the rival would reduce the firm's sales by a large amount.", "The firm must anticipate this reaction when setting its own price.", "A low or zero XED means the firm has more freedom to set price."],
    modelAnswer: "A high positive XED shows that the rival's product is a close substitute, so a price cut by the rival will move many customers away from the firm. The firm must therefore expect and prepare for a reaction when setting its own price. If XED is low, customers do not switch much and the firm has more freedom to choose its price.",
    explanation: "Close substitutes make firms interdependent." });

  {
    const rows = [["Maize meal (kg)", 40, 42], ["Restaurant meals", 10, 13], ["Second-hand shoes (pairs)", 20, 17]];
    const ys = rows.map(([, q1, q2]) => elasticity.yed({ y1: 500, y2: 600, q1, q2 }));
    chk(ys[0], 0.25, 1e-9); chk(ys[1], 1.5, 1e-9); chk(ys[2], -0.75, 1e-9);
    const md = table(["Good (monthly purchases per household)", "Income US\\$500", "Income US\\$600"], rows);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Income rises by 20% in each case."],
      stem: `Average household income in a fictional town rises from US\\$500 to US\\$600 a month. The table shows purchases of three goods (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: ys[0], dp: 2, stem: "Calculate YED for maize meal.", wrong: [0.05, 4], explanation: "Income +20%; maize meal +5%; YED = 5 ÷ 20 = 0.25." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: ys[1], dp: 2, stem: "Calculate YED for restaurant meals.", wrong: [0.67, 3], explanation: "Income +20%; restaurant meals +30%; YED = 30 ÷ 20 = 1.50." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which good is an inferior good?", options: [["Second-hand shoes", "Correct: purchases fall as income rises (YED −0.75)."], ["Maize meal", "Purchases rose: a normal good."], ["Restaurant meals", "Purchases rose: a normal good."], ["Both maize meal and restaurant meals", "Both are normal goods."]], answer: "A", explanation: "Only second-hand shoes have a negative YED." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain what the results suggest for a trader who sells all three goods if incomes in the town continue to rise.",
          points: ["Restaurant meals (YED above 1) will grow fastest, so expand that line.", "Maize meal (YED between 0 and 1) will grow more slowly than income.", "Second-hand shoes (negative YED) will decline, so the trader should reduce stock or diversify."],
          modelAnswer: "Demand for restaurant meals has a YED above 1 and will grow faster than incomes, so the trader should expand that line. Maize meal has a positive YED below 1, so demand grows more slowly than income. Second-hand shoes have a negative YED, so sales will fall as incomes rise and the trader should reduce that stock." }),
      ],
      explanation: "YED values 0.25, 1.5 and −0.75: a necessity, a luxury and an inferior good." });
  }
  {
    const x1 = elasticity.xed({ pb1: 2.0, pb2: 2.2, qa1: 700, qa2: 805 });
    const x2 = elasticity.xed({ pb1: 4.0, pb2: 4.4, qa1: 400, qa2: 376 });
    chk(x1, 1.5, 1e-9); chk(x2, -0.6, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Percentage changes first.", "The sign shows the relationship."],
      stem: "A fictional supermarket sells two brands of cooking oil and also sells tea and sugar. When the price of Brand Y oil rose from US\\$2.00 to US\\$2.20, weekly sales of Brand X oil rose from 700 to 805 bottles. When the price of sugar rose from US\\$4.00 to US\\$4.40 a bag, weekly sales of tea fell from 400 to 376 packets.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: x1, dp: 2, stem: "Calculate XED of Brand X with respect to the price of Brand Y.", wrong: [0.67, 15], explanation: "Price of Y +10%; sales of X +15%; XED = 15 ÷ 10 = +1.50." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: x2, dp: 2, stem: "Calculate XED of tea with respect to the price of sugar, including the sign.", wrong: [0.6, -1.67], explanation: "Price of sugar +10%; sales of tea −6%; XED = −6 ÷ 10 = −0.60." }),
        P.mcq({ label: "(c)", marks: 1, stem: "What does the sign of the answer to (b) show?", options: [["Tea and sugar are complements", "Correct: a rise in the price of sugar lowers demand for tea."], ["Tea and sugar are substitutes", "Substitutes have positive XED."], ["Tea is an inferior good", "The sign of XED shows a relationship between goods, not income response."], ["Tea and sugar are unrelated", "Unrelated goods have XED near zero."]], answer: "A", explanation: "Negative XED shows complements." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the manager of a rival brand of oil would want to know the answer to (a).",
          points: ["XED of +1.5 shows that Brand X and Brand Y are close substitutes.", "A price rise by one brand moves many customers to the other.", "The manager can use it to predict the effect of a price change by Brand Y (or to decide its own price)."],
          modelAnswer: "A cross elasticity of +1.5 shows that the two brands are close substitutes: when one raises its price, many customers switch to the other. A manager can use this to predict how many customers would move in response to a price change and to decide on the firm's own price." }),
        P.manual({ label: "(e)", marks: 2, stem: "State what a cross elasticity close to zero between cement and bread would show, and give a reason.",
          points: ["The goods are unrelated.", "A change in the price of one has no effect on demand for the other, because they are not used together or in place of each other."],
          modelAnswer: "It would show that cement and bread are unrelated goods: a change in the price of cement would not change demand for bread because the goods are neither substitutes nor complements." }),
      ],
      explanation: "XED +1.5 (close substitutes) and −0.6 (complements); near zero means unrelated." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say who benefits from knowing YED and what limits its use."],
    stem: "Assess the usefulness of income elasticity of demand to a government planning for a growing economy.",
    points: ["YED shows which sectors will expand fastest as incomes rise.", "High YED goods and services (luxuries) will grow faster than the economy; low YED goods (food) slower.", "Helps plan infrastructure, training and investment, and forecast tax revenue.", "Explains structural change from agriculture to services.", "Estimates are uncertain and change over time.", "Income growth is not shared equally; averages may mislead.", "Other factors (prices, tastes, population, imports) also affect demand.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "YED helps a government to see which sectors will expand as incomes rise: goods with YED above 1 will grow faster than the economy and basic foods more slowly, so planners can direct infrastructure, training and investment, and forecast tax revenue. It also helps to explain the shift from agriculture to manufacturing and services. However, YED estimates are uncertain and change as incomes and tastes change, the average income hides unequal growth, and other factors such as prices, population and imports also affect demand. YED is therefore a useful guide to the direction of change, but it needs to be combined with other information before major decisions are made.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Uses of YED against its limits, with a judgement." });

  b.card("FORMULA", "State the formula for **income elasticity of demand (YED)**.", "YED = % change in quantity demanded ÷ % change in income.");
  b.card("FORMULA", "State the formula for **cross elasticity of demand (XED)**.", "XED = % change in quantity demanded of good A ÷ % change in the price of good B.");
  b.card("FACT", "What does a **negative YED** show?", "An inferior good: demand falls as income rises.");
  b.card("FACT", "What does a YED **above 1** show?", "A luxury (income-elastic normal good): demand rises by a larger percentage than income.");
  b.card("FACT", "What does a YED **between 0 and 1** show?", "A necessity (income-inelastic normal good): demand rises by a smaller percentage than income.");
  b.card("FACT", "What does a **positive XED** show?", "The goods are substitutes; the larger the value, the closer the substitutes.");
  b.card("FACT", "What does a **negative XED** show?", "The goods are complements; a rise in the price of one lowers demand for the other.");
  b.card("CONCEPT", "How can a firm use YED?", "To forecast demand when incomes change and to plan its product range and capacity.");
  b.card("CONCEPT", "Why is the sign important for YED and XED?", "The sign carries the meaning: it separates normal from inferior goods and substitutes from complements.");
});
