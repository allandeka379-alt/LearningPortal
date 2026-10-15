// W3b: links between macroeconomic problems and the Phillips curve (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, table, fmt, prices, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

// Expectations-augmented Phillips curve: inflation = expected inflation + a (natural rate - unemployment).
const eapc = ({ pe, a, un, u, years }) => {
  const out = [];
  let e = pe;
  for (let t = 1; t <= years; t++) {
    const pi = e + a * (un - u);
    out.push({ t, expected: e, inflation: pi });
    e = pi;
  }
  return out;
};

concept("aecon.policy.interrelated-problems-phillips", { file: "policy/interrelated-problems-phillips", keyPrefix: "policy.interrelated-problems-phillips" }, (b) => {
  mc(b, [1, "RECALL"], "The long-run Phillips curve is",
    ["vertical at the natural rate of unemployment", "Correct: no long-run trade-off."],
    [["horizontal at the current rate of inflation", "It does not run along the inflation rate."],
     ["downward-sloping, so lower unemployment always raises inflation", "That is the short-run curve."],
     ["upward-sloping, so higher unemployment raises inflation", "That would be stagflation behaviour only."]],
    "In the long run, with expectations adjusted, unemployment returns to the natural rate whatever the inflation rate.");

  mc(b, [2, "UNDERSTANDING"], "The external value of a country's money is shown by",
    ["its exchange rate against other currencies", "Correct: what it buys abroad."],
    [["the rate of inflation inside the whole country", "That relates to the internal value."],
     ["the size of the government budget deficit", "That is unrelated to the value of money."],
     ["the level of unemployment in the economy", "That is unrelated to the value of money."]],
    "The external value is the purchasing power of the currency abroad, shown by the exchange rate.");

  mc(b, [2, "UNDERSTANDING"], "Stagflation is a situation in which an economy experiences",
    ["high inflation together with stagnant output and high unemployment", "Correct: bad performance on both."],
    [["low inflation together with fast growth and falling unemployment", "That describes good performance."],
     ["falling prices together with falling unemployment and rising output", "That is a favourable position."],
     ["high inflation together with fast growth and a large current account surplus", "Fast growth with a surplus is not stagflation."]],
    "Stagflation combines inflation with weak output and unemployment, often after a supply shock.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A country's prices rise faster than those of its trading partners, and its exchange rate does not change. The most likely effect is that its current account",
    ["worsens, because its exports become dearer and imports cheaper", "Correct: loss of competitiveness."],
    [["improves, because higher prices raise export revenue per unit sold", "Volume falls as exports become uncompetitive."],
     ["is unaffected, because the exchange rate has not changed", "Relative prices have changed."],
     ["moves into surplus, because imports become dearer", "Imports become relatively cheaper."]],
    "Relative prices determine competitiveness when the nominal rate is fixed.");

  mc(b, [3, "ANALYSIS"], "Expected inflation rises from 3% to 5%. On a Phillips curve diagram, this causes",
    ["the short-run Phillips curve to shift upwards", "Correct: each unemployment rate now goes with higher inflation."],
    [["a movement down along the short-run Phillips curve", "A change in expectations shifts the curve."],
     ["the long-run Phillips curve to shift to the right", "The LRPC depends on the natural rate."],
     ["the short-run Phillips curve to shift to the left", "Higher expected inflation shifts it up (or to the right)."]],
    "Higher expected inflation raises actual inflation at every level of unemployment.", { hints: ["Which variable changed: expectations or unemployment?"] });

  mc(b, [3, "ANALYSIS"], "A government uses demand management to keep unemployment below the natural rate for several years. According to the expectations-augmented Phillips curve, inflation will",
    ["accelerate, as expectations adjust upwards each year", "Correct: inflation keeps rising to hold unemployment below the natural rate."],
    [["stay at the original rate, because the Phillips curve is stable", "Expectations will adjust."],
     ["fall each year, because unemployment is low", "Low unemployment raises wages and prices."],
     ["rise once and then stabilise at the new level", "It must keep rising to hold unemployment below the natural rate."]],
    "Below the natural rate, inflation exceeds expected inflation, which then rises.", { hints: ["What happens to expected inflation in each new year?"] });

  mc(b, [3, "ANALYSIS"], "Which policy would be expected to shift the long-run Phillips curve to the left?",
    ["Training and job-search policies that reduce the natural rate of unemployment", "Correct: a lower natural rate moves the vertical line left."],
    [["A cut in interest rates that raises aggregate demand", "That moves the economy along the short-run curve."],
     ["An increase in the money supply that raises expected inflation", "That shifts the short-run curve upwards."],
     ["A rise in the exchange rate that lowers import prices", "That may shift the short-run curve down."]],
    "Supply-side policy lowers the natural rate, shifting the LRPC to the left.", { hints: ["What determines the position of the LRPC?"] });

  mc(b, [4, "EVALUATION"], "A reason why many economies could not use the simple Phillips curve in the 1970s was that",
    ["supply shocks and higher inflation expectations shifted the curve upwards", "Correct: inflation and unemployment rose together."],
    [["unemployment could not be measured in any of the economies", "Unemployment was measured."],
     ["the curve had been vertical in the short run in all the countries", "It is vertical only in the long run."],
     ["inflation had been steadily falling for the previous twenty years", "Inflation was rising."]],
    "Stagflation showed that the curve is not stable when expectations and supply conditions change.", { hints: ["What can shift the short-run curve?"] });

  {
    const iv = 100 / 1.6; chk(iv, 62.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "index", value: iv, dp: 1,
      stem: "The price index of a fictional economy rises from 100 to 160 over some years. What is the purchasing power of 100 units of money now in terms of the original prices (that is, 100 ÷ price index × 100)? Give the answer to one decimal place.",
      wrong: [160, 60, 37.5], explanation: "Purchasing power = 100 ÷ 160 × 100 = 62.5: the internal value of money has fallen by 37.5%." });
    const rel = (1.08 / 1.02 - 1) * 100; chk(roundTo(rel, 1), 5.9, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: rel, dp: 1, unit: "%", hints: ["Relative price = (1 + home inflation) ÷ (1 + foreign inflation) − 1."],
      stem: "Prices in a fictional country rise by 8% in a year, while prices in its trading partners rise by 2%. The nominal exchange rate is unchanged. By what percentage have the country's goods become dearer relative to foreign goods? Give the answer to one decimal place.",
      wrong: [6.0, 10.0, 4.0], explanation: "1.08 ÷ 1.02 = 1.0588, so goods are 5.9% dearer relative to foreign goods. The simple difference, 6.0, is only an approximation." });
    const path = eapc({ pe: 2, a: 0.8, un: 6, u: 5, years: 3 });
    chk(roundTo(path[2].inflation, 1), 4.4, 1e-9); chk(roundTo(path[0].inflation, 1), 2.8, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: path[2].inflation, dp: 1, unit: "%", hints: ["Each year's inflation becomes next year's expected inflation."],
      stem: "In a fictional economy inflation = expected inflation + 0.8 × (natural rate − actual unemployment). The natural rate is 6% and the government holds unemployment at 5%. Expected inflation in year 1 is 2%, and each year's expected inflation equals the previous year's actual inflation. Calculate actual inflation in year 3, to one decimal place.",
      wrong: [2.8, 3.6, 4.0], explanation: "1. Year 1: 2 + 0.8 × (6 − 5) = 2.8%.\n2. Year 2: expected 2.8, so inflation = 2.8 + 0.8 = 3.6%.\n3. Year 3: expected 3.6, so inflation = 3.6 + 0.8 = 4.4%. Inflation accelerates by 0.8 percentage points each year." });
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: 6 - (4 - 2) / 0.8, dp: 1, unit: "%", hints: ["Rearrange: unemployment = natural rate − (inflation − expected) ÷ a."],
      stem: "In the same economy (inflation = expected inflation + 0.8 × (6 − unemployment), natural rate 6%) expected inflation is 2%. What rate of unemployment would give inflation of 4% in that year? Give the answer to one decimal place.",
      wrong: [2.5, 3.0, 4.0], explanation: "4 = 2 + 0.8 × (6 − U), so 6 − U = 2 ÷ 0.8 = 2.5 and U = 3.5%." });
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 5.1 - 3.2, unit: "percentage points", dp: 1,
      stem: "Along a short-run Phillips curve, inflation is 3.2% when unemployment is 6% and 5.1% when unemployment is 4%. By how many percentage points does inflation rise when unemployment falls from 6% to 4%? Give the answer to one decimal place.",
      wrong: [2.0, 8.3, 1.1], explanation: "Rise in inflation = 5.1 − 3.2 = 1.9 percentage points." });
  }


  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Internal value of money", "Purchasing power over domestic goods and services"], ["External value of money", "What the currency buys in foreign currency (the exchange rate)"], ["NAIRU", "The unemployment rate at which inflation does not accelerate"], ["Stagflation", "High inflation with stagnant output and high unemployment"]],
    explanation: "Match each term with its definition." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "On a Phillips curve diagram, unemployment is measured on the {{blank:a}} axis. A rise in expected inflation shifts the short-run curve {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["horizontal"], choices: ["horizontal", "vertical"] }, { id: "b", accepted: ["upwards"], choices: ["upwards", "downwards"] }],
    explanation: "Unemployment on the horizontal axis; higher expectations shift the SRPC up." });

  b.short({ d: 2, skill: "RECALL", stem: "Which economist first published the relationship between unemployment and the rate of change of wages in 1958, which gave its name to a curve?",
    accepted: ["Phillips", "A. W. Phillips", "A W Phillips", "Bill Phillips", "William Phillips"], wrong: ["Keynes"],
    explanation: "A. W. Phillips." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Use the idea of a short-run trade-off."],
    stem: "Explain why the traditional Phillips curve slopes downwards.",
    points: ["Low unemployment means high aggregate demand and scarce labour.", "Wages rise faster as firms compete for workers.", "Firms pass on higher costs, so inflation is higher; with high unemployment inflation is lower."],
    modelAnswer: "When unemployment is low, aggregate demand is high and labour is scarce, so firms compete for workers and wages rise faster. Firms pass on the higher wage costs in higher prices, so inflation is high; when unemployment is high, wage and price rises are smaller.",
    explanation: "Demand and scarce labour, wages, prices." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Start with the effect of expectations on wages."],
    stem: "Explain why the long-run Phillips curve is vertical.",
    points: ["In the short run, higher demand reduces unemployment and raises inflation along the SRPC.", "People come to expect the higher inflation and build it into wage demands.", "The SRPC shifts upward.", "Unemployment returns to the natural rate at a higher rate of inflation.", "So in the long run there is no trade-off: unemployment is at the natural rate whatever the inflation rate."],
    modelAnswer: "In the short run an increase in demand reduces unemployment and raises inflation, moving the economy along the short-run Phillips curve. Workers and firms then expect the higher inflation and build it into wage demands, so the short-run curve shifts upward and unemployment returns to the natural rate at a higher inflation rate. In the long run unemployment is at the natural rate whatever the inflation rate, so the long-run curve is vertical.",
    explanation: "Short-run move, expectations, shift, return to natural rate." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link growth to imports, then to the balance of payments."],
    stem: "Explain why fast economic growth may cause a current account deficit.",
    points: ["Rising incomes increase consumption and investment.", "Part of the extra spending goes on imports (marginal propensity to import).", "Imports grow faster than exports unless world demand also rises.", "So the current account moves into deficit (or the deficit widens)."],
    modelAnswer: "As growth raises incomes, consumption and investment increase, and part of the extra spending goes on imports because the marginal propensity to import is positive. If imports grow faster than exports the current account moves into deficit or the deficit widens.",
    explanation: "Income, imports, comparison with exports, deficit." });

  {
    const U = [4, 5, 6, 7, 9], Pi = [6.8, 4.8, 3.4, 2.4, 1.4];
    const t1 = table(["Unemployment rate (%)", "Inflation rate (%)"], U.map((u, i) => [u, fmt(Pi[i], 1)]), { align: ["r", "r"] });
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Read the table: the rise in inflation when unemployment falls.", "In (d) think about expectations."],
      stem: `**A short-run Phillips curve for Country Zandia (fictional, illustrative data)**\n\n${t1}\n\nThe government wants to reduce unemployment from 7% to 5% by raising government spending.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: 3.4, dp: 1, unit: "%", stem: "State the rate of inflation when unemployment is 6%.", wrong: [2.4, 4.8, 6.0], explanation: "From the table, 3.4%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: Pi[1] - Pi[3], unit: "percentage points", dp: 1, stem: "Calculate the rise in the inflation rate, in percentage points, if unemployment falls from 7% to 5%.", wrong: [2.0, 7.2, 3.4], explanation: "Inflation rises from 2.4% to 4.8%: a rise of 2.4 percentage points." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the Phillips curve slopes downward.",
          points: ["Lower unemployment means higher aggregate demand and scarcer labour.", "Wages rise faster as firms compete for workers.", "Firms raise prices to cover higher costs, so inflation is higher."],
          modelAnswer: "Lower unemployment goes with higher aggregate demand and scarcer labour, so wages rise faster as firms compete for workers. Firms raise prices to cover the higher wage costs, so inflation is higher." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why the government may not be able to keep unemployment at 5% without causing inflation to keep rising.",
          points: ["If 5% is below the natural rate, actual inflation exceeds the expected rate.", "Workers and firms adjust their expectations upwards.", "The short-run Phillips curve shifts upward.", "To keep unemployment at 5% requires further demand and ever-higher inflation."],
          modelAnswer: "If 5% is below the natural rate, actual inflation is higher than people expected. They revise their expectations upwards and build the higher inflation into wage demands, which shifts the short-run Phillips curve upward. To keep unemployment at 5% the government would have to keep raising demand, and inflation would keep rising." }),
      ],
      explanation: "3.4% at 6% unemployment; inflation rises 2.4 points; downward slope from demand and wages; expectations make the trade-off temporary." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) apply the links between growth, inflation and the balance of payments."],
    stem: "**A boom in Mbira (fictional)**\n\nMbira's economy has grown by 8% a year for two years and unemployment has fallen to 4%, below its estimated natural rate of 6%. Inflation has risen from 4% to 12%, imports have surged and the current account deficit has widened, which has weakened the currency. Workers now expect prices to keep rising and are asking for large pay rises. The central bank says that bringing inflation down will mean slower growth and higher unemployment for a time.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the rapid growth may have widened the current account deficit.",
        points: ["Higher incomes increased spending, including spending on imports.", "Higher inflation made exports less competitive and imports cheaper.", "So imports grew faster than exports and the deficit widened."],
        modelAnswer: "Rapid growth raised incomes and spending, including spending on imports. Higher inflation also made Mbira's exports less competitive and imports relatively cheaper, so imports grew faster than exports and the deficit widened." }),
      P.manual({ label: "(b)", marks: 3, stem: "Using the Phillips curve, explain why inflation is rising while unemployment is below the natural rate.",
        points: ["Unemployment below the natural rate means actual inflation exceeds expected inflation.", "Workers' expectations of inflation rise and are built into pay claims.", "The short-run Phillips curve shifts upward, so inflation keeps rising."],
        modelAnswer: "With unemployment below the natural rate, actual inflation is higher than expected. Workers expect prices to keep rising and ask for big pay rises, which shifts the short-run Phillips curve upward, so inflation continues to rise." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether the central bank should accept slower growth and higher unemployment to bring inflation down.",
        points: ["Inflation of 12% with rising expectations will keep rising and harm competitiveness and the currency.", "Unemployment of 4% is below the natural rate and unsustainable.", "Slowing demand reduces inflation and imports, helping the current account.", "The cost is lower growth and higher unemployment in the short run, possibly large if expectations are slow to fall.", "A credible policy lowers expectations and reduces the cost; supply-side policy lowers the natural rate.", "Judgement: yes, but the speed and the support for the unemployed matter."],
        modelAnswer: "Inflation of 12% with rising expectations will keep rising while unemployment remains below the natural rate, and it is damaging competitiveness and the currency. Slowing demand would reduce inflation and imports and help the current account, but at the cost of lower growth and higher unemployment for a time, which could be large if expectations are slow to fall. A credible inflation target would lower expectations and make the adjustment cheaper, and supply-side policy could reduce the natural rate. On balance the central bank should act, because the present position is unsustainable, but it should do so at a pace that limits the damage to jobs." }),
    ],
    explanation: "Growth raises imports and inflation hurts competitiveness; below the natural rate inflation accelerates; the central bank should act but manage the cost." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Distinguish short run and long run."],
    stem: "Assess whether there is a trade-off between inflation and unemployment.",
    points: ["In the short run a rise in demand lowers unemployment and raises inflation (SRPC).", "The trade-off depends on expectations: if expectations are slow to adjust the trade-off lasts longer.", "In the long run unemployment returns to the natural rate: the LRPC is vertical.", "Supply shocks can raise both inflation and unemployment (stagflation).", "Supply-side policy can lower the natural rate and so improve both.", "Credible policy lowers expectations and the cost of reducing inflation.", "Evidence is unstable across time and countries.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "In the short run there is a trade-off: an increase in demand reduces unemployment but raises inflation, moving the economy along the short-run Phillips curve. How long it lasts depends on how quickly expectations adjust. In the long run, workers and firms expect the higher inflation and the short-run curve shifts upward, so unemployment returns to the natural rate whatever the inflation rate, and the long-run curve is vertical. Supply shocks can also raise inflation and unemployment together, as in stagflation. Supply-side policy that reduces the natural rate can improve both, and a credible policy can lower expectations and the cost of reducing inflation. Overall there is a short-run trade-off, but not a lasting one, and its size varies over time and between countries.",
    explanation: "Short-run trade-off, long-run vertical curve, shocks and supply-side policy." });

  b.card("DEFINITION", "What is the **internal value of money**?", "Its purchasing power over domestic goods and services; it falls as the price level rises.");
  b.card("DEFINITION", "What is the **external value of money**?", "Its purchasing power abroad, shown by the exchange rate.");
  b.card("DEFINITION", "Define the **Phillips curve**.", "A curve showing the relationship between the unemployment rate (horizontal) and the inflation rate (vertical); downward-sloping in the short run.");
  b.card("DEFINITION", "Define **stagflation**.", "High inflation together with stagnant output and high unemployment.");
  b.card("CONCEPT", "Why is the long-run Phillips curve vertical?", "Expectations adjust, so unemployment returns to the natural rate whatever the inflation rate.");
  b.card("CONCEPT", "What shifts the short-run Phillips curve?", "Changes in expected inflation, supply shocks and changes in productivity.");
  b.card("CONCEPT", "What shifts the long-run Phillips curve?", "A change in the natural rate: better skills, mobility and flexibility shift it left; hysteresis shifts it right.");
  b.card("CONCEPT", "How can fast growth harm the balance of payments?", "Rising incomes raise imports; high inflation reduces competitiveness.");
  b.card("CONCEPT", "What happens if unemployment is held below the natural rate?", "Inflation accelerates as expectations adjust each year.");
});
