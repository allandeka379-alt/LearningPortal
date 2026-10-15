// W3a: macroeconomic equilibrium in the AD/AS model (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, pctChange } from "../lib.mjs";
import { mc, LV5, LV8, LV12 } from "../tables/w3a-kit.mjs";

// Each calculation item has its own schedule (price levels PL, AD, SRAS) with one exact equilibrium.
const shift = (a, d) => a.map((v) => v + d);
const eqOf = (PL, ad, as) => {
  const hits = PL.map((p, i) => (ad[i] === as[i] ? { p, y: ad[i] } : null)).filter(Boolean);
  if (hits.length !== 1) throw new Error("equilibrium not unique/exact");
  return hits[0];
};
const mkTable = (PL, cols) => table(["Price level (index)", ...cols.map((c) => c[0])], PL.map((p, i) => [p, ...cols.map((c) => c[1][i])]));
// A: equilibrium price level
const A = { PL: [25, 35, 45, 55, 65], AD: [5200, 4900, 4600, 4300, 4000], AS: [3800, 4300, 4600, 4800, 4900] };
chk(eqOf(A.PL, A.AD, A.AS).p, 45);
// B: equilibrium output
const B = { PL: [210, 220, 230, 240, 250], AD: [9100, 8800, 8500, 8200, 7900], AS: [7000, 8000, 8500, 8800, 9000] };
chk(eqOf(B.PL, B.AD, B.AS).y, 8500);
// C: AD rises by 450
const C = { PL: [20, 30, 40, 50, 60], AD: [3300, 3000, 2700, 2400, 2100], AS: [2100, 2500, 2700, 2850, 2950] };
chk(eqOf(C.PL, C.AD, C.AS).y, 2700); chk(eqOf(C.PL, shift(C.AD, 450), C.AS).y, 2850); chk(eqOf(C.PL, shift(C.AD, 450), C.AS).p, 50);
// D: SRAS falls by 450
const D = { PL: [70, 80, 90, 100, 110], AD: [6500, 6200, 5900, 5600, 5300], AS: [5100, 5700, 5900, 6050, 6150] };
chk(eqOf(D.PL, D.AD, D.AS).y, 5900); chk(eqOf(D.PL, D.AD, shift(D.AS, -450)).y, 5600); chk(eqOf(D.PL, D.AD, shift(D.AS, -450)).p, 100);
// E: AD falls by 750 (structured item 1)
const E = { PL: [12, 22, 32, 42, 52], AD: [7400, 7000, 6600, 6200, 5800], AS: [5400, 6250, 6600, 6800, 6950] };
const E0 = eqOf(E.PL, E.AD, E.AS), E1 = eqOf(E.PL, shift(E.AD, -750), E.AS);
chk(E0.y, 6600); chk(E0.p, 32); chk(E1.y, 6250); chk(E1.p, 22);
// F: SRAS falls by 450 (structured item 2)
const F = { PL: [105, 115, 125, 135, 145], AD: [4950, 4700, 4450, 4200, 3950], AS: [3900, 4400, 4450, 4650, 4780] };
const F0 = eqOf(F.PL, F.AD, F.AS), F1 = eqOf(F.PL, F.AD, shift(F.AS, -450));
chk(F0.y, 4450); chk(F0.p, 125); chk(F1.y, 4200); chk(F1.p, 135);

concept("aecon.macro.ad-as-equilibrium", { file: "macro/ad-as-equilibrium", keyPrefix: "macro.ad-as-equilibrium" }, (b) => {
  mc(b, [1, "RECALL"], "Macroeconomic equilibrium in the AD/AS model is where",
    ["AD equals SRAS", "Correct: the quantity of real output demanded equals the quantity supplied."],
    [["AD equals LRAS at every price level", "LRAS shows potential output; equilibrium is with SRAS."], ["the price level equals the base year index", "The base year index is not the equilibrium condition."], ["investment equals government spending", "That is not the condition for AD/AS equilibrium."]],
    "Equilibrium is the price level and output at which AD equals SRAS.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "At a price level above the equilibrium, in the AD/AS model,",
    ["SRAS exceeds AD, and the price level tends to fall", "Correct: excess supply puts downward pressure on prices."],
    [["AD exceeds SRAS, and the price level tends to rise", "That describes a price level below equilibrium."], ["AD equals SRAS, and the price level is stable", "That describes equilibrium itself."], ["LRAS shifts to the left until output falls", "LRAS is not affected by the price level."]],
    "Above equilibrium, firms supply more than is demanded, so prices fall.");

  mc(b, [2, "UNDERSTANDING"], "A rightward shift of AD along an upward-sloping SRAS curve will cause",
    ["a rise in real output and a rise in the price level", "Correct: the economy moves up along SRAS to a higher output and price level."],
    [["a rise in real output and a fall in the price level", "That would result from a rightward shift of SRAS."], ["a fall in real output and a rise in the price level", "That would result from a leftward shift of SRAS."], ["a fall in real output and a fall in the price level", "That would result from a leftward shift of AD."]],
    "Demand-pull: AD shifts right, and the economy moves along SRAS to higher output and a higher price level.");

  mc(b, [2, "UNDERSTANDING"], "A sharp rise in the price of imported oil shifts SRAS to the left. The likely effects are",
    ["lower output and employment and a higher price level", "Correct: this is stagflation, from cost-push."],
    [["higher output and employment and a lower price level", "That would be the effect of lower costs."], ["lower output and employment and a lower price level", "A leftward AS shift raises prices."], ["higher output and a higher price level", "A fall in supply cannot raise output."]],
    "A leftward shift of SRAS along AD reduces output and raises the price level.", { daily: true });

  mc(b, [3, "APPLICATION"], "At a price level of 75, AD is US\\$5,350 million and SRAS is US\\$4,900 million. Which statement is correct at this price level?",
    ["There is excess demand of 450 and the price level tends to rise", "Correct: AD − SRAS = 5,350 − 4,900 = 450."],
    [["There is excess supply of 450 and the price level tends to fall", "AD is larger than SRAS, so there is excess demand, not supply."], ["The economy is in equilibrium at this price level", "Equilibrium needs AD to equal SRAS."], ["There is excess demand of 5,350 and the price level is stable", "The excess is the difference between AD and SRAS, and it pushes the price up."]],
    "At 75, AD (5,350) exceeds SRAS (4,900) by 450: the price level rises.", { hints: ["Subtract SRAS from AD at that price level."], calculator: true });

  mc(b, [3, "ANALYSIS"], "The economy is operating well below its potential output. An increase in government spending is most likely to cause",
    ["a rise in output and employment with only a small rise in prices", "Correct: SRAS is shallow when there is spare capacity."],
    [["a large rise in prices and almost no change in output", "That occurs near full capacity."], ["a fall in output because AD shifts left", "Higher government spending shifts AD right."], ["a rise in potential output in the same year", "Government spending shifts AD, not capacity, in the short run."]],
    "With spare capacity, firms can raise output without large cost increases, so most of the AD shift goes into output.", { hints: ["How steep is SRAS when there is spare capacity?"] });

  mc(b, [3, "ANALYSIS"], "A rightward shift of SRAS caused by lower energy costs, with AD unchanged, will cause",
    ["a fall in the price level and a rise in real output", "Correct: the economy moves down along AD to the right."],
    [["a rise in the price level and a rise in real output", "That would require AD to shift right."], ["a fall in the price level and a fall in real output", "A rise in supply raises output."], ["no change in the price level because AD is fixed", "The price level falls as SRAS shifts right."]],
    "More is supplied at each price level, so equilibrium moves to a lower price level and higher output.", { hints: ["Where does the new SRAS cross the old AD?"] });

  mc(b, [4, "EVALUATION"], "A government states that a stimulus to AD will raise output and employment without inflation. Which fact would most weaken this claim?",
    ["The economy is already close to its potential output", "Correct: SRAS is steep near full capacity, so mostly prices would rise."],
    [["The economy has large amounts of unemployed labour", "Spare capacity supports the claim."], ["Firms have plenty of unused machinery", "Idle machinery supports the claim."], ["The price level has been falling for several years", "Falling prices suggest spare capacity, supporting the claim."]],
    "Near potential output, a rise in AD mostly raises prices (demand-pull) with little extra output.", { hints: ["When is SRAS steep?"] });

  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 45, calculator: true, daily: true,
    stem: `The table shows AD and SRAS for a fictional economy.\n\n${mkTable(A.PL, [["AD (US\\$ million)", A.AD], ["SRAS (US\\$ million)", A.AS]])}\n\nWhat is the equilibrium price level (index)?`,
    wrong: [35, 55, 4600], explanation: "AD equals SRAS (4,600) at a price level of 45." });
  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 8500, unit: "US$ million", calculator: true,
    stem: `The table shows AD and SRAS for another fictional economy.\n\n${mkTable(B.PL, [["AD (US\\$ million)", B.AD], ["SRAS (US\\$ million)", B.AS]])}\n\nWhat is the equilibrium real output, in US\\$ million?`,
    wrong: [8800, 230, 9000], explanation: "AD equals SRAS at a price level of 230, where both are 8,500." });
  b.num({ d: 3, skill: "ANALYSIS", kind: "plain", value: 2850, unit: "US$ million", calculator: true, hints: ["Add 450 to AD at each price level and find where it equals SRAS."],
    stem: `Another fictional economy has the schedules below. AD then rises by US\\$450 million at every price level. What is the new equilibrium real output, in US\\$ million?\n\n${mkTable(C.PL, [["AD before (US\\$ million)", C.AD], ["SRAS (US\\$ million)", C.AS]])}`,
    wrong: [2700, 3150, 2950], explanation: "New AD: 3,750; 3,450; 3,150; 2,850; 2,550 at price levels 20 to 60. It equals SRAS at a price level of 50, where both are 2,850. (The original equilibrium output was 2,700 at a price level of 40.)" });
  b.calc({ d: 3, skill: "ANALYSIS", kind: "pct", value: pctChange(6400, 6880), dp: 1, calculator: true, hints: ["Percentage change = change ÷ original × 100."],
    stem: "After a rise in AD, equilibrium real output in a fictional economy moves from US\\$6,400 million to US\\$6,880 million. Calculate the percentage change in real output, to one decimal place.",
    wrong: [7, 480, 7.0 + 0.8], explanation: "(6,880 − 6,400) ÷ 6,400 × 100 = 7.5%." });
  b.calc({ d: 3, skill: "ANALYSIS", kind: "pct", value: pctChange(140, 154), dp: 1, calculator: true, hints: ["Compare the old price level with the new one."],
    stem: "In the same case the equilibrium price level rises from 140 to 154. Calculate the percentage change in the price level, to one decimal place.",
    wrong: [9.1, 14, 1.1], explanation: "(154 − 140) ÷ 140 × 100 = 10.0%. (9.1% divides by the new level.)" });
  {
    const e0 = 3800e6 / 15000, e1 = 4100e6 / 15000;
    chk(e1 - e0, 20000, 1e-6);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: e1 - e0, unit: "workers", calculator: true, hints: ["Employment = output ÷ output per worker (watch the units: US\\$ million to US\\$)."],
      stem: "Each worker produces US\\$15,000 of output a year, and employment moves with output. Calculate the rise in employment when equilibrium output rises from US\\$3,800 million to US\\$4,100 million.",
      wrong: [300, 273333, 253333], explanation: "1. Employment before = 3,800,000,000 ÷ 15,000 = 253,333.\n2. Employment after = 4,100,000,000 ÷ 15,000 = 273,333.\n3. Rise = 20,000 workers (equivalently 300 million ÷ 15,000)." });
  }
  b.num({ d: 3, skill: "ANALYSIS", kind: "plain", value: 5600, unit: "US$ million", calculator: true, hints: ["Subtract 450 from SRAS at each price level."],
    stem: `Another fictional economy has the schedules below. A rise in costs shifts SRAS to the left by US\\$450 million at every price level. What is the new equilibrium real output, in US\\$ million?\n\n${mkTable(D.PL, [["AD (US\\$ million)", D.AD], ["SRAS before (US\\$ million)", D.AS]])}`,
    wrong: [5900, 6050, 5450], explanation: "New SRAS: 4,650; 5,250; 5,450; 5,600; 5,700. It equals AD (5,600) at a price level of 100, where output is 5,600. Output falls from 5,900 and the price level rises from 90 to 100." });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A leftward shift of SRAS causes both the price level and real output to rise.", answer: false,
    explanation: "False. A leftward shift of SRAS raises the price level but lowers real output (stagflation)." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["How steep is SRAS near capacity?"], stem: "A rightward shift of AD always increases real output by the same amount as the shift.", answer: false,
    explanation: "False. Because SRAS slopes upward, the price level rises and the increase in real output is smaller than the shift in AD; the closer to capacity, the smaller the rise in output." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect in the AD/AS model.",
    pairs: [["AD shifts right", "Higher output and a higher price level"], ["SRAS shifts left", "Lower output and a higher price level"], ["SRAS shifts right", "Higher output and a lower price level"], ["AD shifts left", "Lower output and a lower price level"]],
    explanation: "Combine the shift of the curve with the slope of the other curve." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A rise in the price level caused by an increase in AD is called {{blank:a}} inflation; a rise caused by higher costs is called {{blank:b}} inflation.",
    blanks: [{ id: "a", accepted: ["demand-pull"], choices: ["demand-pull", "cost-push", "imported"] }, { id: "b", accepted: ["cost-push"], choices: ["cost-push", "demand-pull", "hyper"] }],
    explanation: "Demand-pull from AD; cost-push from SRAS." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the situation in which a rise in the price level occurs together with falling output and rising unemployment.",
    accepted: ["stagflation"], wrong: ["deflation"],
    explanation: "Stagflation." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "State what is meant by macroeconomic equilibrium.",
    points: ["The position at which aggregate demand equals short-run aggregate supply.", "Which determines the equilibrium price level and the level of real output."],
    modelAnswer: "Macroeconomic equilibrium is the position at which aggregate demand equals short-run aggregate supply, which determines the equilibrium price level and the level of real output.",
    explanation: "One mark for AD = SRAS, one for price level and output." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Describe the shift first, then the move along SRAS."],
    stem: "Explain the effect of a fall in consumer confidence on real output, the price level and employment.",
    points: ["Lower confidence reduces consumption, so AD shifts to the left.", "The economy moves down along SRAS to a lower price level.", "Real output falls.", "Employment falls as firms need fewer workers."],
    modelAnswer: "Lower confidence reduces consumption, so AD shifts to the left. The economy moves down along the SRAS curve to a lower price level and a lower level of real output. Firms need fewer workers, so employment falls.",
    explanation: "AD left, price level lower, output lower, employment lower." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use the idea of stagflation."],
    stem: "Analyse how a drought that reduces agricultural output could affect real output, prices and employment.",
    points: ["Food and raw materials become scarcer and dearer, raising firms' costs.", "SRAS shifts to the left.", "Real output falls and the price level rises (cost-push inflation).", "Lower output means lower employment, so there is stagflation.", "The effect may be temporary if harvests recover, as LRAS is unchanged."],
    modelAnswer: "The drought makes food and raw materials scarcer and more expensive, which raises firms' costs and shifts SRAS to the left. Real output falls and the price level rises, which is cost-push inflation. Lower output means lower employment, so the economy suffers stagflation. The effect may be temporary if harvests recover, since long-run capacity is not affected.",
    explanation: "Costs up, SRAS left, output down and prices up, employment down, temporary." });

  {
    const t1 = mkTable(E.PL, [["AD before (US\\$ million)", E.AD], ["AD after (US\\$ million)", shift(E.AD, -750)], ["SRAS (US\\$ million)", E.AS]]);
    const emp = (E0.y - E1.y) * 1e6 / 14000;
    chk(emp, 25000, 1e-6);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Find where AD equals SRAS before and after.", "Percentage change = change ÷ original × 100."],
      stem: `**A fall in aggregate demand (illustrative data)**\n\nA global recession reduces the demand for a fictional country's exports. The table shows AD before and after and the SRAS schedule. Employment moves with output; each worker produces US\\$14,000 a year.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: E0.y, unit: "US$ million", stem: "State the equilibrium real output before the fall in AD, in US\\$ million.", wrong: [7000, 6250, 32], explanation: "Before: AD = SRAS = 6,600 at a price level of 32." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: E1.y, unit: "US$ million", stem: "State the equilibrium real output after the fall in AD, in US\\$ million.", wrong: [6600, 7000, 22], explanation: "After: AD = SRAS = 6,250 at a price level of 22." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pctChange(E0.y, E1.y), dp: 1, stem: "Calculate the percentage change in real output (negative for a fall), to one decimal place.", wrong: [5.3, 5.6, -5.6], explanation: "(6,250 − 6,600) ÷ 6,600 × 100 = −5.3%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain the likely effect of the recession on the price level and employment.",
          points: ["The price level falls from 32 to 22 as AD shifts left along SRAS.", "Output falls by 350, so firms need fewer workers.", "Employment falls by about 25,000 (350 million ÷ 14,000).", "Falling prices and rising unemployment indicate a demand-deficient slowdown."],
          modelAnswer: "AD shifts to the left along the SRAS curve, so the price level falls from 32 to 22. Output falls by US\\$350 million, so firms need fewer workers. Employment falls by about 25,000 (350 million divided by 14,000). Falling prices and rising unemployment are signs of weak demand." }),
      ],
      explanation: "Output 6,600 to 6,250 (−5.3%); price level 32 to 22; employment falls by about 25,000." });
  }
  {
    const t2 = mkTable(F.PL, [["AD (US\\$ million)", F.AD], ["SRAS before (US\\$ million)", F.AS], ["SRAS after (US\\$ million)", shift(F.AS, -450)]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Find where AD equals the new SRAS.", "Think about whether the shock is temporary."],
      stem: `**An oil price shock (illustrative data)**\n\nA sharp rise in the price of imported oil raises the cost of transport and production in a fictional country.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: F1.p, stem: "State the new equilibrium price level after the shock.", wrong: [125, 145, 115], explanation: "The new SRAS equals AD (4,200) at a price level of 135." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(F0.y, F1.y), dp: 1, stem: "Calculate the percentage change in real output (negative for a fall), to one decimal place.", wrong: [5.6, 5.9, -5.9], explanation: "(4,200 − 4,450) ÷ 4,450 × 100 = −5.6%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the oil price rise is an example of cost-push inflation and stagflation.",
          points: ["Higher oil prices raise firms' costs of production, shifting SRAS to the left.", "The price level rises (from 125 to 135): cost-push inflation.", "Real output falls and unemployment rises while prices rise: stagflation."],
          modelAnswer: "Higher oil prices raise firms' costs of production, so SRAS shifts to the left. The price level rises from 125 to 135, which is cost-push inflation. At the same time real output falls and unemployment rises, so the economy suffers stagflation." }),
        P.manual({ label: "(d)", marks: 3, stem: "Evaluate whether the government should respond by increasing AD.",
          points: ["Raising AD would restore output and employment but make the price level rise further.", "The shock is on the supply side, so demand policy is not a cure; it trades more inflation for output.", "A judgement, for example that measures to cut costs or raise supply are better if the shock is lasting, while patience may be sufficient if it is temporary."],
          modelAnswer: "Raising AD would help to restore output and employment, but it would make the price level rise further, because the problem is on the supply side. If the oil price rise is lasting, measures that reduce costs or raise supply, such as improving energy efficiency, would be better; if the shock is temporary, it may be sensible to allow the economy to adjust." }),
      ],
      explanation: "New equilibrium price level 135; output −5.6%; cost-push and stagflation; demand policy trades prices for output." });
  }

  b.ext({ d: 5, skill: "EVALUATION", marks: 12, hints: ["Explain what spare capacity means for the slope of SRAS.", "Consider the time lag and what else may change."],
    stem: "Evaluate the likely effects of a large increase in government spending on output, prices and employment in an economy.",
    points: ["Government spending is a component of AD, so a rise shifts AD to the right.", "Output and employment rise as the economy moves along SRAS.", "The price level also rises (demand-pull).", "If there is much spare capacity, SRAS is shallow and most of the effect is on output and jobs.", "If the economy is near potential output, SRAS is steep and most of the effect is on prices.", "A multiplier effect may magnify the initial increase.", "Imports may rise, reducing the effect on domestic output.", "Financing: borrowing may raise interest rates and reduce private investment (crowding out), or add to debt.", "If the spending is on infrastructure, LRAS may shift right over time, raising capacity.", "Time lags: spending takes time to plan and carry out.", "The effect depends on confidence and on whether the spending is efficient.", "A justified judgement."],
    levels: LV12,
    modelAnswer: "An increase in government spending shifts AD to the right, so output and employment rise as the economy moves along the SRAS curve, and the price level also rises (demand-pull). If there is much spare capacity, SRAS is shallow and most of the effect falls on output and jobs; if the economy is near potential output, SRAS is steep and most of the effect falls on prices. A multiplier effect may magnify the increase, but imports may rise and reduce the effect on domestic output. The spending has to be financed: borrowing may raise interest rates and reduce private investment (crowding out) or add to debt. If the spending is on infrastructure such as roads and power, LRAS may shift to the right over time, raising capacity and reducing the inflationary effect. There are also time lags, and the result depends on confidence and on how efficiently the money is spent. Overall, the increase is most beneficial when there is spare capacity and when the spending raises supply as well as demand.",
    wordLimit: { min: 150, max: 400 },
    explanation: "Spare capacity, financing, multiplier, imports and supply effects weighed; judgement." });

  b.card("DEFINITION", "What is **macroeconomic equilibrium**?", "The price level and real output at which AD equals short-run aggregate supply.");
  b.card("CONCEPT", "What happens to output, price level and employment when AD shifts right?", "All three rise (demand-pull); the nearer to potential output, the more the price level rises.");
  b.card("CONCEPT", "What happens when SRAS shifts left?", "The price level rises, output and employment fall (cost-push, stagflation).");
  b.card("CONCEPT", "What happens when SRAS shifts right?", "The price level falls, output and employment rise.");
  b.card("DEFINITION", "Define **stagflation**.", "Inflation occurring together with falling output and rising unemployment, typically after a leftward shift of SRAS.");
  b.card("DEFINITION", "Define **demand-pull** and **cost-push** inflation.", "Demand-pull: a rise in the price level from a rightward shift of AD. Cost-push: a rise in the price level from a leftward shift of SRAS (higher costs).");
  b.card("CONCEPT", "Why does spare capacity matter when AD rises?", "With spare capacity SRAS is shallow, so output rises with little price rise; near potential output SRAS is steep, so mostly prices rise.");
  b.card("CONCEPT", "How do you describe an AD/AS diagram in words?", "Name the axes, the curves and the original equilibrium, state the shift, give the new equilibrium and the changes in price level, output and employment.");
  b.card("CONCEPT", "How does LRAS growth help?", "It raises potential output so the economy can grow without inflationary pressure.");
});
