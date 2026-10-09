// W1b: econ.elasticity.income-cross (ZIMSEC only) — YED and XED: calculation, interpretation, importance.
import { concept, P, elasticity, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => (v > 0 ? "+" : "") + v.toFixed(2).replace("-", "−");

concept("econ.elasticity.income-cross", { file: "elasticity/income-cross", keyPrefix: "elasticity.income-cross" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives **income elasticity of demand**?",
    options: [
      ["% change in quantity demanded ÷ % change in income", "Correct."],
      ["% change in income ÷ % change in quantity demanded", "This is upside down."],
      ["% change in quantity demanded ÷ % change in price", "This is PED."],
      ["% change in quantity of A ÷ % change in price of B", "This is cross elasticity."],
    ],
    answer: "A",
    explanation: "YED = % change in quantity demanded ÷ % change in income.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The income elasticity of demand for a good is −0.6. The good is",
    options: [
      ["an inferior good.", "Correct: demand falls as income rises."],
      ["a luxury.", "A luxury has YED greater than 1."],
      ["a normal necessity.", "A normal necessity has YED between 0 and 1."],
      ["a complement.", "Complements are identified by a negative cross elasticity, not YED."],
    ],
    answer: "A",
    explanation: "A negative YED means an inferior good.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The cross elasticity of demand between two goods is +1.8. The goods are",
    options: [
      ["close substitutes.", "Correct: positive and large."],
      ["close complements.", "Complements have a negative XED."],
      ["unrelated.", "Unrelated goods have an XED of about zero."],
      ["inferior goods.", "Inferior goods are identified by a negative YED."],
    ],
    answer: "A",
    explanation: "A positive XED means substitutes; a large value means close substitutes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of goods is most likely to have a **negative** cross elasticity of demand?",
    options: [
      ["Mobile phones and airtime", "Correct: complements, used together."],
      ["Beef and chicken", "Substitutes: positive XED."],
      ["Two brands of cooking oil", "Substitutes: positive XED."],
      ["Pencils and bicycles", "Unrelated: XED about zero."],
    ],
    answer: "A",
    explanation: "Complements have a negative XED: a rise in the price of phones reduces demand for airtime.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A good has a YED of +0.4. If incomes rise by 10%, what happens to the quantity demanded?",
    options: [
      ["It rises by 4%", "Correct: 0.4 × 10 = 4."],
      ["It rises by 25%", "This divides 10 by 0.4."],
      ["It falls by 4%", "A positive YED means demand rises with income."],
      ["It rises by 10.4%", "This adds the YED to the income change."],
    ],
    answer: "A",
    hints: ["% change in quantity = YED × % change in income."],
    explanation: "% change in quantity = 0.4 × 10 = +4%: a normal necessity.",
  });

  // Calculations.
  const y = { y1: 600, y2: 690, q1: 250, q2: 295 };
  const yed = elasticity.yed(y);
  check("yed", yed, 1.2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "elasticity", value: yed,
    stem: "Average monthly household income in a fictional district rises from US\\$600 to US\\$690. Monthly restaurant meals bought rise from 250 to 295. Calculate the income elasticity of demand for restaurant meals, to two decimal places.",
    wrong: [1 / yed, -yed],
    hints: ["% change in income = (690 − 600) ÷ 600 × 100.", "% change in quantity = (295 − 250) ÷ 250 × 100."],
    explanation: `1. % change in quantity = 45 ÷ 250 × 100 = +18%.\n2. % change in income = 90 ÷ 600 × 100 = +15%.\n3. YED = 18 ÷ 15 = **${f2(yed)}**: a normal good and a luxury (income elastic). The upside-down answer is ${(1 / yed).toFixed(2)}.`,
  });
  const yi = elasticity.yed({ y1: 500, y2: 550, q1: 120, q2: 114 });
  b.num({
    d: 3, skill: "APPLICATION", kind: "elasticity", value: yi,
    stem: "When average income rises from US\\$500 to US\\$550 a month, demand for second-hand clothes at a fictional market falls from 120 to 114 bales a month. Calculate the YED. Include the sign and give your answer to two decimal places.",
    wrong: [-yi, 1 / yi],
    hints: ["Use the original values as bases.", "A fall in quantity gives a negative percentage change."],
    explanation: `% change in quantity = −6 ÷ 120 × 100 = −5%; % change in income = 50 ÷ 500 × 100 = +10%; YED = −5 ÷ 10 = **${f2(yi)}**: an inferior good.`,
  });
  const x = elasticity.xed({ pb1: 0.8, pb2: 1.0, qa1: 3000, qa2: 3450 });
  b.num({
    d: 3, skill: "APPLICATION", kind: "elasticity", value: x, daily: true,
    stem: "The price of brand T tea rises from US\\$0.80 to US\\$1.00 a packet. Sales of brand R tea rise from 3,000 to 3,450 packets a week. Calculate the cross elasticity of demand for brand R with respect to the price of brand T, to two decimal places.",
    wrong: [-x, 1 / x],
    hints: ["XED = % change in quantity of R ÷ % change in price of T."],
    explanation: `% change in quantity of R = 450 ÷ 3,000 × 100 = +15%; % change in price of T = 0.20 ÷ 0.80 × 100 = +25%; XED = 15 ÷ 25 = **${f2(x)}**: substitutes.`,
  });
  const xc = elasticity.xed({ pb1: 250, pb2: 300, qa1: 500, qa2: 440 });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "elasticity", value: xc,
    stem: "A fictional shop raises the price of a games console from US\\$250 to US\\$300. Monthly sales of games for the console fall from 500 to 440. Calculate the cross elasticity of demand for games with respect to the price of consoles. Include the sign and give your answer to two decimal places.",
    wrong: [-xc, 1 / xc],
    hints: ["% change in quantity of games ÷ % change in price of consoles.", "Keep the sign: it tells you the relationship."],
    explanation: `1. % change in quantity of games = −60 ÷ 500 × 100 = −12%.\n2. % change in price of consoles = 50 ÷ 250 × 100 = +20%.\n3. XED = −12 ÷ 20 = **${f2(xc)}**: negative, so consoles and games are complements.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A good with an income elasticity of demand of +2.5 is a luxury.",
    answer: true,
    explanation: "True. YED above 1 means demand rises by a larger percentage than income: a luxury (income elastic).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the cross elasticity of demand between two goods is negative, they are substitutes.",
    answer: false,
    explanation: "False. A negative XED means complements; substitutes have a positive XED.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each elasticity value with its meaning.",
    pairs: [
      ["YED = −0.3", "Inferior good"],
      ["YED = +0.5", "Normal good, necessity"],
      ["XED = +1.2", "Substitutes"],
      ["XED = −0.8", "Complements"],
    ],
    explanation: "YED: negative inferior, 0–1 necessity, above 1 luxury. XED: positive substitutes, negative complements.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A normal good has a {{blank:a}} income elasticity of demand. Two goods with a cross elasticity of zero are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative", "zero"] },
      { id: "b", accepted: ["unrelated"], choices: ["substitutes", "complements", "unrelated"] },
    ],
    wrong: [["negative", "complements"]],
    explanation: "Normal goods: YED > 0. XED = 0: a change in one price does not affect the other good's demand.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** ways a firm could use knowledge of the income elasticity of demand for its products.",
    points: [
      "Forecasting sales when incomes change (e.g. luxuries grow fast in a boom).",
      "Develops: so it can plan output, stocks and workers in advance.",
      "Choosing a mix of products (luxuries and necessities / inferior goods) to spread risk over the economic cycle.",
      "Develops: e.g. sales of inferior goods may hold up in a recession while luxury sales fall.",
    ],
    modelAnswer: "First, a firm can forecast its sales: if incomes are expected to rise by 5% and its product has a YED of +2, sales should rise by about 10%, so it can plan extra output and staff. Second, it can choose a balanced range of products: luxury goods sell well when incomes rise but fall sharply in a recession, while necessities and inferior goods are more stable, so selling both spreads its risk.",
    hints: ["Think about forecasting and about spreading risk."],
    explanation: "Two uses, each explained.",
  });

  // Structured 1: YED table.
  const yrows = [["Basic maize meal", 200, 190], ["Chicken", 150, 165], ["Mobile phones", 40, 50]];
  const inc = { y1: 400, y2: 440 };
  const yeds = yrows.map(([, q1, q2]) => elasticity.yed({ ...inc, q1, q2 }));
  const t = table(["Good", "Monthly sales before", "Monthly sales after"], yrows);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `In a fictional town average monthly income rose from US\\$400 to US\\$440. The table shows sales of three goods in a shop before and after the rise (other things unchanged).\n\n${t}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "elasticity", value: yeds[1], stem: "Calculate the YED for chicken, to two decimal places.", wrong: [1 / yeds[1], -yeds[1]], explanation: `% change in quantity = 15 ÷ 150 × 100 = 10%; % change in income = 40 ÷ 400 × 100 = 10%; YED = ${f2(yeds[1])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "elasticity", value: yeds[2], stem: "Calculate the YED for mobile phones, to two decimal places.", wrong: [1 / yeds[2], -yeds[2]], explanation: `% change in quantity = 10 ÷ 40 × 100 = 25%; YED = 25 ÷ 10 = ${f2(yeds[2])}.` }),
      P.match({
        label: "(c)", stem: "Match each good with its type.", marks: 3,
        pairs: [["Basic maize meal", "Inferior good"], ["Chicken", "Normal good (unitary income elasticity)"], ["Mobile phones", "Luxury (income elastic)"]],
        explanation: `Maize meal: YED ${f2(yeds[0])} (negative, inferior); chicken ${f2(yeds[1])}; phones ${f2(yeds[2])} (above 1, luxury).`,
      }),
      P.tf({ label: "(d)", stem: "If incomes fall in a recession, the shop's sales of basic maize meal are likely to rise.", answer: true, explanation: "True: an inferior good's demand moves opposite to income." }),
    ],
    hints: ["YED = % change in quantity ÷ % change in income (10%).", "Negative: inferior; above 1: luxury."],
    explanation: "Income rose by 10%; compare each good's percentage change in sales.",
  });
  check("yed0", yeds[0], -0.5);
  check("yed1", yeds[1], 1);

  // Structured 2: XED and government; discuss.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "In a fictional country, the government plans a large tax on petrol to reduce traffic congestion in cities. Studies estimate that the cross elasticity of demand for bus travel with respect to the price of petrol is +0.3, and for new cars with respect to the price of petrol is −0.6.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: 0.3 * 20, stem: "If the tax raises the price of petrol by 20%, calculate the expected percentage change in demand for bus travel. Give your answer to one decimal place.", wrong: [20 / 0.3, -6], explanation: "0.3 × 20 = +6.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: -0.6 * 20, stem: "Calculate the expected percentage change in demand for new cars. Include the minus sign for a fall and give your answer to one decimal place.", wrong: [12, -20 / 0.6], explanation: "−0.6 × 20 = −12.0%." }),
      P.manual({
        label: "(c)", marks: 8, levels: LV(8),
        stem: "Discuss whether the petrol tax is likely to reduce traffic congestion.",
        points: [
          "Petrol and cars are complements (XED −0.6): fewer new cars bought, so fewer cars on the road over time.",
          "Buses are substitutes (XED +0.3): some drivers switch to buses, reducing cars in cities.",
          "But XED for buses is small (+0.3): bus travel rises only 6%, so most drivers keep driving.",
          "Demand for petrol itself is likely to be price inelastic in the short run, so driving falls little.",
          "Effect depends on the quality and availability of buses; extra bus demand needs more buses.",
          "Tax raises costs for businesses and poorer households (unfair / higher prices).",
          "Tax revenue could be used to improve public transport, making the policy more effective.",
          "Justified conclusion.",
        ],
        modelAnswer: "The tax should reduce congestion somewhat. Cars and petrol are complements (XED −0.6), so a 20% rise in petrol prices would cut new car sales by about 12%, slowing the growth of traffic. Buses are substitutes (XED +0.3), so some drivers would switch, raising bus travel by about 6%. However, the XED for buses is small, which suggests that buses are not seen as a close substitute; most drivers would keep driving, especially as demand for petrol is usually inelastic in the short run. Many people would simply pay more, and the tax would raise costs for businesses and hurt poorer households. The policy would work better if the tax revenue were used to provide more and better buses, raising the cross elasticity. Conclusion: on its own the tax will reduce congestion only a little; combined with better public transport it could be effective.",
        explanation: "Use both XED values, consider their size, PED of petrol, fairness and complementary policies; conclude.",
      }),
    ],
    hints: ["% change in demand = XED × % change in the price of petrol.", "How big are the effects compared with the 20% price rise?"],
    explanation: "XED values predict how a tax on one good spreads to substitutes and complements.",
  });

  b.card("FORMULA", "Formula for **income elasticity of demand**?", "% change in quantity demanded ÷ % change in income.");
  b.card("FORMULA", "Formula for **cross elasticity of demand**?", "% change in quantity demanded of good A ÷ % change in price of good B.");
  b.card("CONCEPT", "YED negative means…", "An inferior good: demand falls as income rises.");
  b.card("CONCEPT", "YED between 0 and 1 means…", "A normal good that is a necessity (income inelastic).");
  b.card("CONCEPT", "YED greater than 1 means…", "A normal good that is a luxury (income elastic).");
  b.card("CONCEPT", "XED positive means…", "The goods are substitutes.");
  b.card("CONCEPT", "XED negative means…", "The goods are complements.");
  b.card("CONCEPT", "XED of zero means…", "The goods are unrelated.");
  b.card("CONCEPT", "Why do firms selling luxuries do badly in a recession?", "YED is above 1, so demand falls by a larger percentage than income.");
});
