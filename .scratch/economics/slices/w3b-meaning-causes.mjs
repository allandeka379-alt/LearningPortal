// W3b: econ.inflation.meaning-causes — inflation, deflation, demand-pull and cost-push inflation, telling them apart,
// excessive money creation (outline). Figures differ from the lesson's worked examples.
import { concept, P, table, prices, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.inflation.meaning-causes", { file: "inflation/meaning-causes", keyPrefix: "inflation.meaning-causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Inflation is best defined as",
    options: [
      ["a sustained rise in the general level of prices.", "Correct: general, sustained and over time."],
      ["a rise in the price of one important product.", "A single price rise is a change in a relative price."],
      ["a rise in the quantity of goods produced.", "That is economic growth."],
      ["a fall in the value of the country's exports.", "This concerns trade, not the price level."],
    ],
    answer: "A",
    explanation: "Inflation is a sustained rise in the general price level over a period of time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "**Deflation** means",
    options: [
      ["a sustained fall in the general level of prices.", "Correct: a negative rate of inflation."],
      ["a fall in the rate of inflation from 7% to 4%.", "Prices are still rising, only more slowly."],
      ["a fall in the value of the currency.", "That is depreciation."],
      ["a fall in the total output of the economy.", "That is a fall in real GDP (a recession if sustained)."],
    ],
    answer: "A",
    explanation: "Deflation is a sustained fall in the general price level.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is most likely to cause **demand-pull** inflation?",
    options: [
      ["A large rise in consumer spending when factories are at full capacity", "Correct: spending outruns the ability to supply."],
      ["A sharp rise in the world price of fuel and other imported energy", "This raises costs: cost-push."],
      ["A drought that reduces the maize harvest", "A supply shock raises costs and prices: cost-push."],
      ["A rise in VAT on all goods", "Higher indirect taxes raise costs to buyers: cost-push."],
    ],
    answer: "A",
    explanation: "Demand-pull inflation happens when aggregate demand rises faster than output can respond.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a cause of **cost-push** inflation?",
    options: [
      ["Wage rises that are greater than increases in productivity", "Correct: unit labour costs rise and firms raise prices."],
      ["A cut in income tax that raises consumer spending", "This raises demand: demand-pull."],
      ["Strong growth in bank lending to households", "This raises spending: demand-pull."],
      ["A rise in government spending on public-sector pay and pensions", "This raises demand: demand-pull."],
    ],
    answer: "A",
    explanation: "Cost-push inflation comes from higher costs: wages above productivity, raw materials, imports, taxes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A fictional country's rate of inflation falls from 9% to 6%. What happened to the general price level?",
    options: [
      ["It continued to rise, but more slowly", "Correct: a positive rate means prices are still rising."],
      ["It fell by 3%, the difference between the two rates", "Prices fall only when the rate is negative."],
      ["It stayed the same", "A 6% rate means prices rose by 6%."],
      ["It fell by 6%", "6% is a rate of increase, not of decrease."],
    ],
    answer: "A",
    hints: ["Is the rate of inflation still positive?"],
    explanation: "A lower but positive rate of inflation (disinflation) means prices are still rising, more slowly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, inflation rises while real GDP falls and unemployment rises. Electricity tariffs and fuel prices have increased sharply. What type of inflation is this most likely to be?",
    options: [
      ["Cost-push inflation", "Correct: rising costs, falling output and rising unemployment."],
      ["Demand-pull inflation", "Demand-pull usually comes with rising output and falling unemployment."],
      ["Deflation", "Prices are rising, not falling."],
      ["Disinflation caused by lower demand", "The rate of inflation is rising."],
    ],
    answer: "A",
    hints: ["What happened to output and costs?"],
    explanation: "Higher energy costs push up prices and reduce output: cost-push inflation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is meant by a **wage-price spiral**?",
    options: [
      ["Rising prices lead workers to demand higher wages, which raise costs and prices again", "Correct: each round of wage and price rises causes the next."],
      ["Wages fall as prices fall, leading to deflation", "This describes falling wages and prices, not the spiral."],
      ["Firms cut prices to win customers, so wages rise", "Price cuts do not drive a spiral of rising wages."],
      ["Wages and prices rise once together and then stay stable for several years afterwards", "A spiral continues over time."],
    ],
    answer: "A",
    hints: ["Think about what workers do when prices rise."],
    explanation: "Higher prices → higher wage demands → higher costs → higher prices, so inflation becomes self-sustaining.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional country's currency falls sharply in value. It imports most of its fuel, fertiliser and machinery. Which is the most likely outcome?",
    options: [
      ["Cost-push inflation, because imported inputs become dearer", "Correct: firms pass on higher import costs."],
      ["Deflation, because exports become cheaper", "Cheaper exports do not lower the domestic price level."],
      ["Demand-pull inflation only, because imports become cheaper", "A weaker currency makes imports dearer, not cheaper."],
      ["No change in prices, because the inputs are bought in US dollars", "Firms pay more local currency for each US dollar."],
    ],
    answer: "A",
    hints: ["What happens to the local price of imports when the currency falls?"],
    explanation: "A depreciation raises the local price of imported inputs, raising firms' costs and prices: cost-push (imported) inflation.",
  });

  // Numericals.
  {
    const c0 = 180, c1 = 194.4, r = prices.inflationRate(c0, c1);
    check("r", r, 8);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: r, daily: true, calculator: true,
      stem: `The cost of a fixed basket of goods rises from US\\$${c0} to US\\$${fmt(c1, 2)} in a year. Calculate the rate of inflation. Give your answer to one decimal place.`,
      wrong: [((c1 - c0) / c1) * 100, c1 - c0],
      explanation: `(${fmt(c1, 2)} − ${c0}) ÷ ${c0} × 100 = **${pct(r, 1)}**. Using the new cost as the base gives ${pct(((c1 - c0) / c1) * 100, 1)}.`,
    });
  }
  {
    const c = [400, 430, 451.5], r1 = prices.inflationRate(c[0], c[1]), r2 = prices.inflationRate(c[1], c[2]);
    check("r2", r2, 5);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: r2, calculator: true,
      stem: `A basket of goods cost US\\$${c[0]} in 2024, US\\$${c[1]} in 2025 and US\\$${fmt(c[2], 2)} in 2026. Calculate the rate of inflation in 2026. Give your answer to one decimal place.`,
      wrong: [prices.inflationRate(c[0], c[2]), ((c[2] - c[1]) / c[0]) * 100],
      hints: ["Use the 2025 cost as the base for 2026."],
      explanation: `1. 2026 rate = (${fmt(c[2], 2)} − ${c[1]}) ÷ ${c[1]} × 100 = **${pct(r2, 1)}**.\n2. The 2025 rate was ${pct(r1, 1)}, so inflation slowed, although prices still rose.\n3. Using 2024 as the base gives ${pct(prices.inflationRate(c[0], c[2]), 1)}, which is the change over two years.`,
    });
  }
  {
    const p0 = 136, r = 12.5, p1 = p0 * (1 + r / 100);
    check("p1", p1, 153);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "index", value: p1, calculator: true,
      stem: `A fictional country's price index is ${p0} this year. Next year the rate of inflation is ${r}%. Calculate next year's price index. Give your answer to one decimal place.`,
      wrong: [p0 + r, p0 * (1 - r / 100)],
      hints: ["Increase the index by 12.5% of its current value."],
      explanation: `1. Increase = ${r}% × ${p0} = ${fmt((p0 * r) / 100, 1)}.\n2. New index = ${p0} + ${fmt((p0 * r) / 100, 1)} = **${fmt(p1, 1)}**.\n3. Adding 12.5 points (${fmt(p0 + r, 1)}) treats the rate as a change in points.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A rise in the price of bread alone, while other prices stay the same, is inflation.",
    answer: false,
    explanation: "False. Inflation is a rise in the general price level, not in one price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cost-push inflation is often accompanied by falling output and rising unemployment.",
    answer: true,
    explanation: "True. Higher costs lead firms to raise prices and cut production.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event with the type of inflation it is most likely to cause.",
    pairs: ["A large rise in public-sector wages paid for by borrowing", "A rise in the world price of oil", "Rapid growth in bank lending to households", "A drought that raises the cost of maize"],
    right: ["Demand-pull inflation", "Cost-push inflation"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Events that raise spending cause demand-pull inflation; events that raise costs cause cost-push inflation.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Demand-pull inflation is caused by a rise in {{blank:a}} that is faster than the growth of output. It is most likely when the economy is close to {{blank:b}}. Cost-push inflation starts with a rise in firms' {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["aggregate demand"], choices: ["aggregate demand", "unemployment", "productivity"] },
      { id: "b", accepted: ["full capacity"], choices: ["full capacity", "a recession", "deflation"] },
      { id: "c", accepted: ["costs"], choices: ["costs", "sales", "exports"] },
    ],
    wrong: [["unemployment", "a recession", "sales"]],
    hints: ["Demand-pull is about spending; cost-push is about costs."],
    explanation: "Demand-pull: spending outruns capacity. Cost-push: higher costs are passed on in prices.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between demand-pull and cost-push inflation, giving an example of each.",
    points: [
      "Demand-pull: aggregate demand rises faster than output can increase.",
      "Example: tax cuts or a credit boom raise consumer spending when the economy is near capacity.",
      "Cost-push: rising costs of production are passed on as higher prices.",
      "Example: a rise in fuel prices, wages above productivity, or a fall in the exchange rate.",
    ],
    modelAnswer: "Demand-pull inflation happens when total spending rises faster than firms can increase output, so they raise prices; for example, a large cut in income tax raises consumer spending when factories are already working at full capacity. Cost-push inflation happens when firms' costs rise and they pass them on as higher prices; for example, a sharp rise in the price of fuel raises transport and production costs.",
    hints: ["One starts with spending, the other with costs."],
    explanation: "Explain each type (1) and give a matching example (1).",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how excessive money creation by a central bank can lead to hyperinflation.",
    points: [
      "More money is created to finance government spending, while output does not rise.",
      "Spending rises but goods are limited: more money chases the same goods, so prices rise.",
      "People expect further rises, so they spend money quickly and workers demand higher wages.",
      "The government creates even more money to pay its rising bills, so inflation accelerates out of control.",
    ],
    modelAnswer: "If the central bank creates money to pay for government spending while the output of goods does not rise, there is more money chasing the same quantity of goods, so prices rise. People then expect prices to keep rising, so they spend money as soon as they receive it and workers demand higher wages, which pushes prices up faster. As the government's costs rise it creates even more money, and inflation accelerates into hyperinflation, as happened in Zimbabwe in 2007-2008.",
    hints: ["Compare the growth of money with the growth of goods, then think about expectations."],
    explanation: "A four-step chain: money growth > output growth → rising prices → expectations → more money creation.",
  });

  // Structured 1: identifying causes from data.
  {
    const yrs = ["2024", "2025", "2026"], basket = [320, 334.4, 371.184], gdp = [2.0, 1.5, -1.0], wage = [4, 5, 14], fuel = [0, 2, 35];
    const r = [null, prices.inflationRate(basket[0], basket[1]), prices.inflationRate(basket[1], basket[2])];
    check("r1", r[1], 4.5); check("r2", r[2], 11);
    const T = table(["", ...yrs], [["Cost of a household basket (US\\$)", ...basket.map((x) => fmt(x, 2))], ["Real GDP growth (%)", ...gdp.map((x) => fmt(x, 1))], ["Average wage increase (%)", ...wage], ["Increase in the price of fuel (%)", ...fuel]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The table shows data for a fictional country. In 2026 a major trade union won a 14% pay rise for its members, and the world price of fuel rose sharply.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: r[1], stem: "Calculate the rate of inflation in 2025. Give your answer to one decimal place.", wrong: [((basket[1] - basket[0]) / basket[1]) * 100], explanation: `(${fmt(basket[1], 2)} − ${basket[0]}) ÷ ${basket[0]} × 100 = ${pct(r[1], 1)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: r[2], stem: "Calculate the rate of inflation in 2026. Give your answer to one decimal place.", wrong: [prices.inflationRate(basket[0], basket[2])], explanation: `(${fmt(basket[2], 2)} − ${fmt(basket[1], 2)}) ÷ ${fmt(basket[1], 2)} × 100 = ${pct(r[2], 1)}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which type of inflation does the data for 2026 most suggest?",
          options: [
            ["Cost-push, because wages and fuel prices rose while output fell", "Correct: costs up, real GDP −1.0%."],
            ["Demand-pull, because real GDP and consumer spending grew rapidly", "Real GDP fell by 1.0% in 2026."],
            ["Deflation, because the basket became cheaper", "The basket became dearer."],
            ["Demand-pull, because fuel became cheaper", "Fuel prices rose by 35%."],
          ],
          answer: "A",
          explanation: "Rising costs with falling output point to cost-push inflation.",
        }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain how the 14% pay rise could lead to a wage-price spiral.",
          points: ["Higher wages (above productivity) raise firms' labour costs per unit.", "Firms pass the higher costs on as higher prices.", "Workers then demand further pay rises to protect their real wages, raising costs and prices again."],
          modelAnswer: "If wages rise by 14% without a matching rise in productivity, the labour cost of each unit rises, so firms put up their prices. Higher prices reduce workers' real wages, so unions demand further pay rises, which raise costs again, and the cycle repeats: a wage-price spiral.",
          explanation: "Wages → costs → prices → wage demands.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the rise in fuel prices or the rise in wages was the more important cause of inflation in 2026.",
          points: [
            "Fuel: rose 35%; fuel is used in transport and production across the whole economy; outside the country's control.",
            "Wages: rose 14% against 5% in 2025; labour is a large share of costs; may start a spiral that keeps inflation high.",
            "Evidence limits: no data on shares of costs or productivity; the two interact (fuel rises lead to wage claims).",
            "Justified conclusion.",
          ],
          modelAnswer: `Fuel prices rose by 35%, and fuel is used for transport and production in almost every industry, so the rise pushed up costs throughout the economy, and the country could not control it. Wages rose by 14%, far more than the 5% of 2025, and because labour is a large share of firms' costs this also pushed up prices; it could also start a wage-price spiral that keeps inflation high in future. The data do not show the share of fuel and labour in costs, and the two causes are linked, because higher fuel prices encourage wage claims. Fuel was probably the more important trigger in 2026, given its 35% rise, but the wage rise may matter more in the long run if it starts a spiral.`,
          explanation: "Weigh both causes using the data; conclude.",
        }),
      ],
      hints: ["Rate of inflation = change in basket cost ÷ previous cost × 100.", "Look at what happened to output."],
      explanation: `Inflation rose from ${pct(r[1], 1)} (2025) to ${pct(r[2], 1)} (2026) while real GDP fell: cost-push inflation from wages and fuel.`,
    });
  }
  // Structured 2: demand-pull boom.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country has enjoyed a boom in mineral exports. Mining companies and their workers are spending heavily, banks are lending more, and building firms report shortages of workers and materials. Inflation has risen from 4% to 10% in two years.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "The inflation described is most likely to be",
        options: [
          ["demand-pull inflation.", "Correct: spending and lending are rising and firms face shortages."],
          ["cost-push inflation caused by falling demand.", "Demand is rising, not falling."],
          ["deflation.", "Prices are rising."],
          ["cost-push inflation caused by a drought.", "No drought is mentioned."],
        ],
        answer: "A",
        explanation: "Rising export earnings, spending and lending with capacity shortages indicate demand-pull inflation.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the boom in mineral exports has caused inflation.",
        points: ["Higher export earnings raise incomes of mining firms and workers.", "They spend more (and banks lend more), so aggregate demand rises.", "Firms are near capacity (shortages of workers and materials), so they raise prices rather than output."],
        modelAnswer: "The mineral boom raised the incomes of mining companies and their workers, and banks lent more, so spending in the economy rose strongly. Because building firms and others were already short of workers and materials, they could not raise output fast enough and instead raised their prices, so the general price level rose: demand-pull inflation.",
        explanation: "Exports → incomes → spending → capacity limits → prices.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether the rise in inflation is a serious problem for this country.",
        points: [
          "Serious: erodes real incomes of those not in mining (pensioners, low-paid); makes other exports and tourism less competitive; may lead to wage-price spiral and rising expectations.",
          "Not so serious: it comes with growth, jobs and higher incomes; 10% is high but not hyperinflation; may fall when the boom ends.",
          "Depends on whether wages keep pace and whether it keeps rising.",
          "Justified conclusion.",
        ],
        modelAnswer: "Inflation of 10% reduces the real incomes of people whose incomes do not rise with it, such as pensioners and workers outside mining, and it makes the country's other exports, such as farm produce and tourism, less competitive. If people come to expect high inflation, a wage-price spiral may develop. On the other hand, the inflation comes with a boom that has raised incomes and jobs, 10% is far from hyperinflation, and it may ease when the mineral boom slows. The rise is a serious problem if it continues to climb, because it redistributes income unfairly and harms other industries, so the government should act to stop it rising further.",
        explanation: "Weigh costs of inflation against the benefits of the boom; conclude.",
      }),
    ],
    hints: ["Is the economy short of capacity or short of buyers?"],
    explanation: "An export and credit boom with capacity shortages causes demand-pull inflation.",
  });

  b.card("DEFINITION", "Define **inflation**.", "A sustained rise in the general level of prices over a period of time.");
  b.card("DEFINITION", "Define **deflation**.", "A sustained fall in the general level of prices over a period of time.");
  b.card("DEFINITION", "Define **demand-pull inflation**.", "Inflation caused by aggregate demand rising faster than the economy's ability to supply goods and services.");
  b.card("DEFINITION", "Define **cost-push inflation**.", "Inflation caused by rising costs of production that firms pass on as higher prices.");
  b.card("FORMULA", "Rate of inflation = ?", "(Price level this year − price level last year) ÷ price level last year × 100");
  b.card("FACT", "If inflation falls from 8% to 5%, are prices falling?", "No. Prices are still rising, only more slowly.");
  b.card("CONCEPT", "How can you tell cost-push from demand-pull inflation in data?", "Demand-pull: spending and output rise, unemployment falls. Cost-push: costs rise, output falls or stagnates, unemployment rises.");
  b.card("FACT", "When did Zimbabwe experience hyperinflation, and what followed?", "In 2007-2008; in 2009 the Zimbabwe dollar was abandoned for a multi-currency system.");
  b.card("CONCEPT", "What is a wage-price spiral?", "Rising prices lead to higher wage demands, which raise costs and prices again, and so on.");
});
