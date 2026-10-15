// W3b: Keynesian and monetarist schools of thought (ZIMSEC only, Form 6).
import { concept, P, chk, table, fmt, keynes, quantityTheory, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.schools-of-thought", { file: "macro/schools-of-thought", keyPrefix: "macro.schools-of-thought" }, (b) => {
  mc(b, [1, "RECALL"], "Which statement best describes the Keynesian view?",
    ["Government spending can raise output and employment in a slump by raising aggregate demand", "Correct: demand management is the core of the Keynesian view."],
    [["Free markets always restore full employment very quickly without any intervention", "That is the classical view."],
     ["Inflation is always caused by the money supply growing faster than output", "That is the monetarist view."],
     ["Aggregate supply is vertical at the full employment level in the short run", "That is the classical view of the long run."]],
    "Keynesians believe that aggregate demand determines output in the short run and that fiscal policy can stabilise the economy.");

  mc(b, [2, "UNDERSTANDING"], "In the monetarist (classical) view, the long-run aggregate supply curve is",
    ["vertical at the full employment level of output", "Correct: output is determined by supply-side factors."],
    [["horizontal at the current price level", "That is a Keynesian view of the very short run."],
     ["upward-sloping, so that higher prices raise output permanently", "Output returns to full employment in the long run."],
     ["downward-sloping, so that lower prices raise output", "AS does not slope downward."]],
    "In the long run output depends on resources and technology, so LRAS is vertical.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Why do Keynesians believe that unemployment can persist for a long time?",
    ["Wages and prices are slow to fall, so labour markets do not clear quickly", "Correct: sticky wages prevent a quick return to full employment."],
    [["Workers always choose not to accept the wages that firms are offering them", "That is a voluntary-unemployment view."],
     ["The money supply always grows too slowly in a recession", "That is not the Keynesian argument."],
     ["Governments set the level of employment by law in each year", "Governments do not set employment by law."]],
    "Keynesians stress wage and price rigidity and deficient demand.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "According to monetarists, the main cause of sustained inflation is",
    ["growth of the money supply faster than the growth of output", "Correct: too much money chasing too few goods."],
    [["a rise in the real wage rate caused by union bargaining alone", "That is a cost-push explanation."],
     ["weak consumer confidence that reduces spending on goods", "Weak confidence would reduce inflation."],
     ["a rise in unemployment benefits paid to the unemployed", "Benefits are not the monetarist cause of inflation."]],
    "MV = PT: if M rises faster than T with V stable, P rises.");

  mc(b, [3, "APPLICATION"], "A government cuts the growth rate of the money supply to reduce inflation, and does not increase public spending to offset it. This policy follows",
    ["monetarist thinking", "Correct: control the money supply to control inflation."],
    [["Keynesian thinking", "Keynesians would emphasise demand management."],
     ["planned economy thinking", "A planned economy fixes output by the state."],
     ["development economics only", "The policy is not about development."]],
    "Controlling the growth of the money supply is the monetarist approach to inflation.", { hints: ["Which school stresses the money supply?"] });

  {
    const p0 = quantityTheory({ M: 200, V: 4, T: 400 }), p1 = quantityTheory({ M: 216, V: 4, T: 400 });
    chk(p1 / p0, 1.08, 1e-9);
    mc(b, [3, "APPLICATION"], "Using MV = PT, with V and T constant, the money supply rises by 8%. According to the quantity theory the price level will rise by",
      ["8%", "Correct: P rises in proportion to M."],
      [["0.8%", "That divides the percentage by 10."],
       ["Less than 8%, as output will adjust to take up the increase", "T is assumed constant."],
       ["More than 8%, as the velocity of circulation will also rise", "V is assumed constant."]],
      "With V and T constant, P changes in the same proportion as M.", { hints: ["P = MV ÷ T."] });
  }

  mc(b, [3, "ANALYSIS"], "Monetarists argue that a rise in government spending financed by borrowing may fail to raise output because",
    ["the borrowing raises interest rates and crowds out private spending", "Correct: crowding out offsets the extra demand."],
    [["government spending can never be a part of aggregate demand", "G is a component of AD."],
     ["workers always save the whole of any extra income that they receive", "That is not the monetarist argument."],
     ["the multiplier is always infinite in the long run", "That is not the argument."]],
    "Government borrowing competes for funds, raising interest rates and lowering private investment.", { hints: ["What happens to interest rates when the government borrows more?"] });

  mc(b, [4, "EVALUATION"], "An economy has high unemployment, spare capacity in most industries and very low inflation. Which view is likely to fit the situation better, and why?",
    ["Keynesian, because extra demand can raise output without raising prices when there is spare capacity", "Correct: the flat part of the AS curve."],
    [["Monetarist, because extra demand would raise prices without raising output", "That is true near full employment, not with spare capacity."],
     ["Monetarist, because a vertical long-run supply curve means demand has no effect on output", "The case has spare capacity in the short run."],
     ["Neither view, because the two schools say the same about spare capacity", "They differ on the role of demand."]],
    "With spare capacity and sticky prices, demand management can raise output.", { hints: ["What is the shape of AS when there is spare capacity?"] });

  {
    const p = quantityTheory({ M: 500, V: 5, T: 1000 }); chk(p, 2.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: p, dp: 1,
      stem: "In a fictional economy the money supply is 500, the velocity of circulation is 5 and the volume of transactions is 1,000. Using MV = PT, calculate the price level, to one decimal place.",
      wrong: [0.4, 2.0, 250], explanation: "P = MV ÷ T = 500 × 5 ÷ 1,000 = 2.5." });
    const m = quantityTheory({ P: 1.8, V: 4, T: 600 }); chk(m, 270, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: m, dp: 0, tol: 0.5, hints: ["M = PT ÷ V."],
      stem: "A central bank wants the price level to be 1.8 when the volume of transactions is 600 and velocity is 4. Using MV = PT, calculate the money supply needed.",
      wrong: [1080, 432, 120], explanation: "M = PT ÷ V = 1.8 × 600 ÷ 4 = 270." });
    const v = quantityTheory({ M: 300, P: 2, T: 900 }); chk(v, 6, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: v, dp: 0, tol: 0.5, hints: ["V = PT ÷ M."],
      stem: "The money supply is 300, the price level is 2 and the volume of transactions is 900. Calculate the velocity of circulation.",
      wrong: [1.5, 0.17, 5400], explanation: "V = PT ÷ M = 2 × 900 ÷ 300 = 6." });
    const k = keynes.multiplier({ mpc: 0.75 }); const dy = 80 * k; chk(dy, 320, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: dy, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Closed economy: k = 1 ÷ MPS."],
      stem: "A Keynesian economist advises a rise in government spending of US\\$80 million in a closed economy without taxes where the marginal propensity to consume is 0.75. Calculate the expected rise in national income, in US\\$ million.",
      wrong: [240, 80, 106.7], explanation: "k = 1 ÷ 0.25 = 4. Rise = 4 × 80 = US\\$320 million." });
    const g = ((250 - 200) / 200) * 100; chk(g, 25);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: g, dp: 1, unit: "%",
      stem: "The money supply of a fictional economy rises from 200 to 250. With velocity and the volume of transactions constant, calculate the percentage rise in the price level predicted by the quantity theory, to one decimal place.",
      wrong: [20, 50, 1.25], explanation: "P is proportional to M, so P rises by (250 − 200) ÷ 200 × 100 = 25.0%." });
  }

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each statement with the school of thought it describes.",
    pairs: ["Wages and prices are sticky, so slumps can last", "Inflation is caused by money supply growth", "Government should manage aggregate demand", "Government should control the money supply by a rule"],
    right: ["Keynesian", "Monetarist"], rightIndex: [0, 1, 0, 1],
    explanation: "Sticky wages and demand management are Keynesian; money supply control is monetarist." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Monetarists believe that in the long run output is determined by {{blank:a}}-side factors, so the long-run aggregate supply curve is {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["supply"], choices: ["supply", "demand"] }, { id: "b", accepted: ["vertical"], choices: ["vertical", "horizontal"] }],
    explanation: "Monetarists and classical economists stress supply; LRAS is vertical." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the economist whose work in the 1930s led to the Keynesian school of thought.",
    accepted: ["Keynes", "John Maynard Keynes", "J M Keynes", "J. M. Keynes", "Maynard Keynes"], wrong: ["Friedman"],
    explanation: "John Maynard Keynes." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare wages, prices and the role of the state."],
    stem: "State two differences between the Keynesian and monetarist views of the economy.",
    points: ["Keynesians believe wages and prices are sticky; monetarists believe they are flexible and markets clear.", "So Keynesians see unemployment lasting a long time; monetarists see a return to the natural rate.", "Keynesians favour active demand management; monetarists favour control of the money supply and limited government.", "Keynesians see fiscal policy as effective; monetarists see it as weak because of crowding out."],
    modelAnswer: "Keynesians believe that wages and prices are sticky, so unemployment can last a long time, whereas monetarists believe that they are flexible, so the economy returns to the natural rate. Keynesians favour active demand management by the government, while monetarists favour steady control of the money supply and a limited role for government.",
    explanation: "Two differences, each stated and explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use MV = PT and assumptions."],
    stem: "Explain how the quantity theory of money is used by monetarists to explain inflation.",
    points: ["MV = PT: money supply times velocity equals the price level times transactions.", "Velocity is assumed stable.", "Output (T) is assumed to be at full employment in the long run.", "So an increase in the money supply raises the price level in proportion.", "To control inflation, control the growth of the money supply."],
    modelAnswer: "The quantity theory states that MV = PT. Monetarists assume that velocity is stable and that output is at the full employment level in the long run, so if the money supply grows faster than output the price level rises in proportion. They therefore recommend controlling the growth of the money supply to control inflation.",
    explanation: "Equation, assumptions, result, policy." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Give two criticisms and a judgement."],
    stem: "Assess one criticism of the Keynesian approach to a recession.",
    points: ["Government borrowing to finance spending may crowd out private investment.", "Time lags may mean the spending arrives after the recovery has begun.", "Higher deficits increase government debt.", "If the economy is near capacity the spending raises inflation.", "Judgement: valid in some circumstances but less so with spare capacity."],
    modelAnswer: "Government borrowing to finance extra spending may raise interest rates and crowd out private investment, so the rise in output is smaller than the multiplier suggests. Time lags may also mean the spending arrives after the recovery has begun and raises debt. However, with a lot of spare capacity the crowding out effect is likely to be small, so the criticism is valid in some circumstances only.",
    explanation: "A criticism, its explanation and a judgement." });

  {
    const rows = [["Money supply M", 400, 480], ["Velocity V", 5, 5], ["Transactions T", 1000, 1000]];
    const p0 = quantityTheory({ M: 400, V: 5, T: 1000 }), p1 = quantityTheory({ M: 480, V: 5, T: 1000 });
    chk(p0, 2, 1e-9); chk(p1, 2.4, 1e-9);
    const t1 = table(["Item", "Year 1", "Year 2"], rows, { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["P = MV ÷ T.", "Percentage change = change ÷ original × 100."],
      stem: `**Money and prices in Zandia (fictional, illustrative data)**\n\n${t1}\n\nA monetarist economist says that the rise in prices is caused by the increase in the money supply. A Keynesian economist says that other factors may have been involved.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: p0, dp: 1, stem: "Using MV = PT, calculate the price level in year 1, to one decimal place.", wrong: [0.5, 2000, 4], explanation: "P = 400 × 5 ÷ 1,000 = 2.0." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: ((p1 - p0) / p0) * 100, dp: 1, unit: "%", stem: "Calculate the percentage rise in the price level between year 1 and year 2, to one decimal place.", wrong: [0.4, 20.4, 120], explanation: "P rises from 2.0 to 2.4: (2.4 − 2.0) ÷ 2.0 × 100 = 20.0%, the same as the 20% rise in M." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how the data support the monetarist view.",
          points: ["The money supply rose by 20% while velocity and transactions did not change.", "The price level rose by the same percentage (20%).", "This matches the quantity theory: with V and T constant, P changes in proportion to M."],
          modelAnswer: "The money supply rose by 20% while velocity and the volume of transactions did not change, and the price level rose by 20% as well. This is what the quantity theory predicts: with V and T constant, the price level changes in proportion to the money supply." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain one reason why a Keynesian economist might disagree that the money supply was the only cause of the price rise.",
          points: ["Velocity and output may change in other circumstances (not necessarily constant).", "Prices may also be affected by costs (for example wages or imports) or by demand.", "Money may have increased because of higher activity, rather than causing the price rise (causation can run the other way)."],
          modelAnswer: "The data show only that the two variables moved together. Prices could also have been driven up by higher costs, such as wages or import prices, or by rising demand, and the money supply may have increased because of higher activity, so the money supply need not be the only cause." }),
      ],
      explanation: "P = 2.0 then 2.4 (+20%), matching the 20% rise in M; Keynesians question causation and the constancy of V and T." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) apply both views to the case and conclude."],
    stem: "**A recession in Mbira (fictional)**\n\nMbira is in a deep recession. Unemployment is 18%, factories are using less than 60% of their capacity and inflation is 1%. The finance minister is advised by two economists. The first says that the government should increase spending on roads and clinics and cut taxes, because demand is too low and wages will not fall quickly. The second says that wages and prices will adjust if the government stops interfering, that the rise in the budget deficit would force interest rates up and crowd out private investment, and that the government should keep the money supply growing steadily and make the labour market more flexible.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain the Keynesian argument for increasing government spending in Mbira.",
        points: ["Demand is too low: there is spare capacity (60% use) and high unemployment.", "Government spending is an injection that raises aggregate demand and, through the multiplier, income.", "Wages and prices are sticky, so waiting would take a long time; with spare capacity output can rise without much inflation."],
        modelAnswer: "Aggregate demand is too low, which shows in the spare capacity and the high unemployment. Government spending is an injection that raises aggregate demand, and through the multiplier national income rises by a larger amount. Because wages and prices are slow to fall, waiting for the market to adjust would take a long time, and with spare capacity output can rise without much inflation." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain the monetarist argument against the spending proposal.",
        points: ["Borrowing to finance the deficit raises interest rates.", "Higher interest rates crowd out private investment.", "Wages and prices will adjust in the long run and the economy will return to the natural rate without intervention."],
        modelAnswer: "The extra borrowing needed to finance the deficit would raise interest rates and crowd out private investment, so the rise in output would be smaller than expected. Monetarists believe that wages and prices will adjust in time and that the economy will return to its natural rate without government intervention." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess which of the two economists' advice is more suitable for Mbira.",
        points: ["Spare capacity (60%) and low inflation support the Keynesian case: output can rise without inflation.", "Unemployment of 18% is high and wages adjust slowly; waiting may be costly.", "Crowding out is less likely when there is spare capacity and weak private demand.", "Labour market flexibility and steady money growth can help in the long run.", "Deficits and debt are a risk; time lags.", "Judgement: Keynesian measures suit the current slump, with supply-side reforms as a longer-term complement."],
        modelAnswer: "The first economist's advice fits Mbira's present position better. With less than 60% of capacity in use and inflation of only 1%, extra demand can raise output and jobs without raising prices, and with unemployment at 18% waiting for wages to adjust could be very costly. Crowding out is less likely when private demand is weak. The second economist is right that steady money growth, a flexible labour market and a sustainable deficit matter for the longer run, and that government borrowing carries risks. On balance a Keynesian stimulus is more suitable now, with supply-side reforms as a complement over the longer term." }),
    ],
    explanation: "Spare capacity and low inflation favour demand management now; monetarist concerns about crowding out and the long run still matter." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Both views, then apply to the situation."],
    stem: "Discuss whether Keynesian or monetarist ideas are more useful for a government facing high inflation and high unemployment at the same time.",
    points: ["Keynesian demand management cannot solve both: raising demand worsens inflation, cutting demand worsens unemployment.", "If the problem is cost-push (stagflation) a leftward shift of SRAS, demand policy is a poor remedy.", "Monetarists: control money growth to reduce inflation and supply-side reforms to cut the natural rate of unemployment.", "Monetarist policy may raise unemployment in the short run.", "Keynesians may use incomes policy or targeted measures.", "Time lags and costs for both.", "Mixed approach.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Keynesian demand management struggles when inflation and unemployment are both high, because raising demand to cut unemployment would worsen inflation and cutting demand to reduce inflation would worsen unemployment. If the cause is a rise in costs, a fall in short-run aggregate supply, demand policy is a poor remedy in either direction. Monetarists would control the growth of the money supply to bring down inflation and use supply-side reforms to reduce the natural rate of unemployment, which tackles both problems in the long run, but the fall in money growth may increase unemployment in the short run. Keynesians might use incomes policy or targeted measures. Overall, monetarist and supply-side ideas are more useful for the long-run problem, but a short-run policy to protect the unemployed may be needed, so a mixture is probably best.",
    explanation: "Apply both schools to stagflation and judge." });

  b.card("DEFINITION", "Define the **Keynesian school**.", "Output is determined by aggregate demand in the short run; wages and prices are sticky; the government should manage demand.");
  b.card("DEFINITION", "Define the **monetarist (classical) school**.", "Markets clear with flexible wages and prices; inflation is caused by money supply growth; limited government.");
  b.card("FORMULA", "State the quantity theory of money.", "MV = PT: money supply × velocity = price level × volume of transactions.");
  b.card("CONCEPT", "Keynesian view of aggregate supply?", "Horizontal at low output (spare capacity), then rising, then vertical at full capacity.");
  b.card("CONCEPT", "Monetarist view of long-run aggregate supply?", "Vertical at the full employment level of output.");
  b.card("CONCEPT", "Keynesian explanation of persistent unemployment?", "Deficient aggregate demand with sticky wages and prices.");
  b.card("CONCEPT", "Monetarist view of unemployment?", "The natural rate, determined by supply-side rigidities such as unions, benefits and minimum wages.");
  b.card("CONCEPT", "What is crowding out?", "Government borrowing raises interest rates and reduces private investment and spending.");
  b.card("CONCEPT", "Name one strength and one weakness of the monetarist view.", "Strength: explains inflation from excess money growth. Weakness: velocity is often unstable and the money supply is hard to control.");
});
