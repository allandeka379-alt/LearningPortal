// W1b: using diagrams, data and calculations in economics answers (both boards, Forms 5-6, AS and A Level).
import { concept, P, chk, fmt, pctChange, dpStr, table, prices } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.skills.diagrams-and-data", { file: "skills/diagrams-and-data", keyPrefix: "skills.diagrams-and-data" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "A rise in the unemployment rate from 8% to 10% is a rise of",
    explanation: "The difference between two percentages is measured in percentage points: 2 percentage points." },
    ["2 percentage points", "Correct: 10 − 8."], [["2%", "A rise of 2% would be from 8% to 8.16%."], ["20%", "This misreads 8 to 10 as a percentage change of the wrong size."], ["25 percentage points", "25 is the percentage change in the rate, not the difference in points."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In an index number series, the base year has a value of",
    explanation: "The base year is set at 100 so that other years show percentage changes from it." },
    ["100", "Correct: the base is the reference point."], [["0", "Zero would show no value."], ["1", "An index is on a scale of 100, not 1."], ["the lowest value in the series", "The base is chosen, not the minimum."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "On a diagram of a market, a change in the price of the good itself causes",
    explanation: "A change in the good's own price causes a movement along the curve; a change in a condition shifts the curve." },
    ["a movement along the demand curve", "Correct: an extension or contraction of demand."], [["a shift of the demand curve", "A shift needs a change in a condition such as income."], ["a shift of the supply curve", "Supply shifts with cost or technology changes."], ["no change in the diagram", "The point on the curve changes."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In a data-response question, the command word 'calculate' requires you to",
    explanation: "Calculate means to work out an answer with working, using the data given." },
    ["show your working and give the answer with units", "Correct: marks are given for method and unit."], [["give a definition of the term in the question only", "That is 'define'."], ["give a judgement about the data without any figures", "That is 'evaluate' or 'assess'."], ["list all the figures in the table", "Quoting is not calculating."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Percentage changes cannot be added across years."],
    stem: "Sales rise by 10% in one year and by 20% in the next. The total rise over the two years is",
    explanation: "1.10 × 1.20 = 1.32, a rise of 32%, not 30%." },
    ["32%", "Correct: the changes compound."], [["30%", "This adds percentages with different bases."], ["15%", "This averages them."], ["200%", "This multiplies the percentages instead of the factors."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Real value = nominal ÷ index × 100."],
    stem: "A worker's nominal wage rises from US\\$500 to US\\$630 while the price index rises from 100 to 120. The real wage in the original prices is",
    explanation: "Real wage = 630 ÷ 120 × 100 = US\\$525, a rise of 5% against the nominal rise of 26%." },
    ["US\\$525", "Correct: deflated by the price index."], [["US\\$630", "This is the nominal wage."], ["US\\$756", "This multiplies by the index instead of dividing."], ["US\\$500", "This ignores the rise in the nominal wage."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about what a diagram contributes to an argument."],
    stem: "Which diagram in an answer about a tax on cigarettes would earn the most credit?",
    explanation: "A labelled diagram with a shift of supply, the new equilibrium, and the tax revenue and burden marked and explained in the text shows full understanding." },
    ["A labelled supply shift with new equilibrium, explained in the text", "Correct: complete, labelled and used."],
    [["An unlabelled sketch of two crossing lines", "Without labels it cannot be credited."], ["A diagram of demand shifting although the tax is on sellers", "The curve that shifts is wrong."], ["A diagram that is not referred to in the answer", "Unused diagrams earn little credit."]]);

  {
    const g = pctChange(320, 384);
    chk(g, 20, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, kind: "pct", value: g, dp: 0, unit: "%",
      stem: "A fictional firm's sales are US\\$320 thousand in 2023 and US\\$384 thousand in 2024. Calculate the percentage change in sales from 2023 to 2024.",
      wrong: [16.7, 55, 0.2],
      explanation: `(384 − 320) ÷ 320 × 100 = ${dpStr(g, 0)}%. Using 384 as the base gives 16.7%.` });
    const idx = (300 / 240) * 100;
    chk(idx, 125, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", calculator: true, kind: "index", value: idx, dp: 0,
      stem: "A fictional firm's sales were US\\$240 thousand in the base year 2020 (= 100) and US\\$300 thousand in 2024. Calculate the index of sales in 2024.",
      wrong: [25, 120, 80],
      explanation: `Index = 300 ÷ 240 × 100 = ${idx}. Sales in 2024 are 25% above the base year.` });
    const real = prices.realValue(351, 130);
    chk(real, 270, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: real, hints: ["Real value = nominal ÷ price index × 100."],
      stem: "Nominal sales in 2025 are US\\$351 thousand and the price index (2020 = 100) is 130. Calculate real sales in 2020 prices, in US\\$ thousand.",
      wrong: [456.3, 351, 221],
      explanation: `Real sales = 351 ÷ 130 × 100 = US\\$${fmt(real)} thousand. Multiplying by 130 ÷ 100 gives 456.3.` });
    const pc = pctChange(8, 10);
    chk(pc, 25, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: pc, dp: 0, unit: "%", hints: ["Treat the rate as a number and find its percentage change."],
      stem: "The unemployment rate in a fictional country rises from 8% to 10%. Calculate the percentage change in the rate.",
      wrong: [2, 20, 80],
      explanation: `(10 − 8) ÷ 8 × 100 = ${dpStr(pc, 0)}%. The difference in the rate is 2 percentage points.` });
    const ang = (50 / 200) * 360;
    chk(ang, 90, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: ang, unit: "units",
      stem: "A fictional country's exports are US\\$200 million, of which tobacco is US\\$50 million. In a pie chart, what angle in degrees should the tobacco sector have?",
      wrong: [25, 45, 180],
      explanation: `Share = 50 ÷ 200 = 25%; angle = 25% × 360° = ${ang}°.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A movement along a demand curve is caused by a change in a condition of demand such as income.", answer: false,
    explanation: "False. A change in income shifts the demand curve; a change in the good's own price causes a movement along it." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A table of data showing that two variables moved together proves that one caused the other.", answer: false,
    explanation: "False. Data shows association; other factors may explain the pattern, so say that the data 'suggests' a link." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Percentage point", "The unit for the difference between two percentages"], ["Index number", "A value expressed relative to a base year set at 100"], ["Real value", "A nominal value adjusted for changes in prices"], ["Nominal value", "A value measured at current prices"]],
    explanation: "These terms are used in almost every data-response question." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a value adjusted to remove the effect of changes in prices?",
    accepted: ["real value", "real", "real terms", "a real value"], wrong: ["nominal"],
    explanation: "Real values are deflated by a price index." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "State **two** features of a well-presented diagram in economics.",
    points: ["Labelled axes (with units) and labelled curves.", "Equilibrium or key points marked and shifts shown with arrows and new labels (any valid second feature)."],
    modelAnswer: "A good diagram has labelled axes with units and labelled curves, such as D1 and S1. It also marks the equilibrium price and quantity and shows any shifts with arrows and new curve labels.", explanation: "Two valid features." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what has different bases."],
    stem: "Explain why a 10% rise followed by a 20% rise does not make a 30% rise overall.",
    points: ["Each percentage change is measured on a different base.", "The 20% applies to the already-increased value.", "Overall the value is 1.10 × 1.20 = 1.32 times the original: a 32% rise."],
    modelAnswer: "The second percentage change is calculated on the higher value reached after the first rise, not on the original, so the changes compound. Overall the value is 1.10 × 1.20 = 1.32 times the original, a rise of 32%.",
    explanation: "Different bases and compounding." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Think about what data can and cannot prove."],
    stem: "Analyse **two** precautions an economist should take when using a table of data to support an argument.",
    points: ["Check the units, period and whether values are real or nominal.", "Explain why this matters (misleading comparisons).", "Be careful about cause: other factors may explain the pattern, so say 'suggests'.", "Explain why this matters (the data may not prove the claim)."],
    modelAnswer: "First, check the units, time period and whether figures are real or nominal, because comparing nominal figures over time overstates growth when prices rise. Second, avoid claiming that the data proves a cause: other factors may explain the pattern, so the data should be described as consistent with or suggesting an explanation.",
    explanation: "Two precautions, each explained." });

  {
    const md = table(["Year", "Exports (US\\$ million)"], [[2022, 200], [2023, 230], [2024, 276]]);
    const a = pctChange(200, 230), c = pctChange(230, 276), idx = (276 / 200) * 100;
    chk(a, 15, 1e-9); chk(c, 20, 1e-9); chk(idx, 138, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Use the earlier year as the base."],
      stem: `The table shows the exports of a fictional country, Zandia (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: a, dp: 0, unit: "%", stem: "Calculate the percentage change in exports from 2022 to 2023.", wrong: [13, 30], explanation: "(230 − 200) ÷ 200 × 100 = 15%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: c, dp: 0, unit: "%", stem: "Calculate the percentage change in exports from 2023 to 2024.", wrong: [16.7, 46], explanation: "(276 − 230) ÷ 230 × 100 = 20%." }),
        P.num({ label: "(c)", marks: 2, kind: "index", value: idx, dp: 0, stem: "Calculate the index of exports in 2024 with 2022 = 100.", wrong: [35, 120], explanation: "276 ÷ 200 × 100 = 138." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the rise in exports over the two years is not 35% (15% + 20%).",
          points: ["The 20% is measured on 2023 exports, which are higher than the 2022 base.", "Percentage changes with different bases cannot be added.", "The correct overall rise is (276 − 200) ÷ 200 = 38%."],
          modelAnswer: "The 20% rise is calculated on the 2023 value of US\\$230 million, which is already 15% above the 2022 base, so the changes compound. The overall rise is (276 − 200) ÷ 200 × 100 = 38%, not 35%." }),
      ],
      explanation: "15%, 20%, index 138; percentage changes compound." });
  }
  {
    const infl = prices.inflationRate(100, 108), real = prices.realValue(594, 108);
    chk(infl, 8, 1e-9); chk(real, 550, 1e-9);
    const md = table(["", "2024", "2025"], [["Unemployment rate (%)", "7", "9"], ["Consumer price index (2024 = 100)", "100", "108"], ["Average monthly nominal wage (US\\$)", "500", "594"]], { align: ["l", "r", "r"] });
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Real value = nominal ÷ index × 100.", "Rates differ in percentage points."],
      stem: `The table shows data for a fictional country (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: infl, dp: 0, unit: "%", stem: "Calculate the inflation rate between 2024 and 2025.", wrong: [7.4, 108], explanation: "(108 − 100) ÷ 100 × 100 = 8%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 2, unit: "percentage points", stem: "State the change in the unemployment rate in percentage points.", wrong: [25, 20], explanation: "9 − 7 = 2 percentage points." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: real, stem: "Calculate the average real wage in 2025, in 2024 prices.", wrong: [594, 641.5], explanation: "594 ÷ 108 × 100 = US\\$550." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why real wages rose by less than nominal wages.",
          points: ["Prices rose by 8% (inflation).", "Nominal wages rose by 18.8% but part of the rise only keeps up with prices, so the real rise is 10%."],
          modelAnswer: "Prices rose by 8%, so part of the 18.8% rise in nominal wages was needed just to keep up with higher prices. The rise in purchasing power is only 10%, from US\\$500 to US\\$550 in 2024 prices." }),
        P.manual({ label: "(e)", marks: 2, stem: "Using the data, assess whether the average worker is better off in 2025.",
          points: ["Employed workers: real wage up 10% so purchasing power rose.", "Unemployment rose by 2 percentage points, so some workers lost income altogether (the average may mislead)."],
          modelAnswer: "The average employed worker is better off because the real wage rose by 10%. However, unemployment rose by 2 percentage points, so some people lost their income entirely, and the average wage hides differences, so the overall conclusion depends on whether we look at employed workers or all workers." }),
      ],
      explanation: "Inflation 8%; unemployment +2 percentage points; real wage 550." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider what diagrams and data add and what they cannot show."],
    stem: "Assess the importance of diagrams and data in supporting an economic argument.",
    points: ["A diagram shows the mechanism visually (shifts, equilibrium) and organises the argument.", "Data gives evidence, allows calculation of magnitudes (percentage change, elasticity).", "Using the source in the context earns application marks.", "Diagrams simplify and rely on assumptions (ceteris paribus).", "Data may be unreliable, nominal rather than real, or show association not cause.", "Calculations need correct units and bases.", "Explanation in words is still needed.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "Diagrams show the mechanism of an argument, such as a shift of supply and the new equilibrium, and organise the reasoning clearly. Data supplies evidence and allows magnitudes to be calculated, for example the percentage change in price or an elasticity, and quoting the source shows application. However, diagrams simplify and rest on assumptions such as ceteris paribus, and data may be unreliable, nominal instead of real, or show association rather than cause. Neither replaces explanation in words. Overall, diagrams and data strengthen an argument considerably, but only when they are accurate, correctly labelled and linked to a clear explanation.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Value of diagrams and data against their limitations, with a judgement." });

  b.card("FORMULA", "How do you calculate a **percentage change**?", "(new value − original value) ÷ original value × 100.");
  b.card("DEFINITION", "Define a **percentage point**.", "The unit for the difference between two percentages: a rise from 8% to 10% is 2 percentage points (a 25% rise in the rate).");
  b.card("DEFINITION", "Define an **index number**.", "A value expressed as a percentage of its value in a base year, which is set at 100.");
  b.card("FORMULA", "How do you convert a nominal value to a **real value**?", "Real value = nominal value ÷ price index × 100.");
  b.card("CONCEPT", "What labels does a good economics diagram need?", "Axes with units, curve names (D1, S1), equilibrium price and quantity, arrows for shifts and new labels.");
  b.card("CONCEPT", "Movement along or shift of a curve?", "A change in the good's own price moves along the curve; a change in any other condition shifts it.");
  b.card("CONCEPT", "Why can't percentage changes in different years be added?", "Each has a different base; they compound (1.10 × 1.20 = 1.32).");
  b.card("CONCEPT", "How should you handle data in a data-response answer?", "Quote figures with units, calculate changes, link to theory and say 'suggests' about cause.");
  b.card("CONCEPT", "What do command words 'calculate' and 'evaluate' require?", "Calculate: show working and the answer with units. Evaluate: weigh evidence and reach a justified judgement.");
});
