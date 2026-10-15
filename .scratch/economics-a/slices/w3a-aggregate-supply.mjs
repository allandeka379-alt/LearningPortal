// W3a: aggregate supply (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, pctChange, round } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

const costChange = (w) => w.reduce((s, [share, ch]) => s + share * ch, 0) / 100;
chk(costChange([[50, 6], [35, 8], [15, -10]]), 4.3, 1e-9);

concept("aecon.macro.aggregate-supply", { file: "macro/aggregate-supply", keyPrefix: "macro.aggregate-supply" }, (b) => {
  mc(b, [1, "RECALL"], "The long-run aggregate supply curve shows",
    ["the productive capacity of the economy", "Correct: potential output when all resources are fully employed."],
    [["the level of total spending on output", "That is aggregate demand."], ["the quantity of imports that are demanded", "Imports are not what LRAS shows."], ["the inflation rate in the economy over time", "LRAS is not a measure of inflation."]],
    "LRAS shows potential output, determined by the quantity and quality of resources and technology.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Why does the short-run aggregate supply curve slope upward?",
    ["Input prices such as wages are fixed in the short run while the price level rises", "Correct: unit profits rise, so firms supply more."],
    [["Consumers prefer to buy more output as the price level rises", "Demand responds the other way; this is about supply."], ["The government sets output targets for each firm in the economy", "SRAS does not depend on targets."], ["Firms are forced to supply more by competition from abroad", "The slope arises from fixed input prices, not forced supply."]],
    "With fixed input prices a higher price level raises profit per unit, so firms supply more.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following would shift the SRAS curve to the left?",
    ["A rise in the price of imported oil", "Correct: higher costs reduce supply at each price level."],
    [["A rise in the general price level of the economy", "That is a movement along SRAS."], ["A fall in the cost of electricity for firms", "That shifts SRAS to the right."], ["A subsidy on raw materials used by farmers", "That lowers costs and shifts SRAS to the right."]],
    "A rise in input costs raises costs of production, shifting SRAS to the left.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following would shift the LRAS curve to the right?",
    ["An increase in the quantity and quality of labour and capital", "Correct: productive capacity grows."],
    [["A temporary fall in the price of oil", "That shifts SRAS but not potential output."], ["A rise in the price level of goods and services", "That moves the economy along SRAS."], ["A fall in the rate of interest on loans", "That mainly affects AD in the short run."]],
    "LRAS shifts when productive capacity changes: more or better resources or technology.");

  mc(b, [3, "APPLICATION"], "A firm's costs are 70% labour and 30% materials. Wages rise by 5% and materials prices fall by 10%. The firm's total costs change by",
    ["+0.5%", "Correct: 0.7 × 5 + 0.3 × (−10)."],
    [["−5%", "That adds the two percentage changes."], ["+3.5%", "That ignores the fall in materials prices."], ["+8%", "That adds the labour rise to a share of materials."]],
    "Weighted change = 70% × 5% + 30% × (−10%) = 3.5 − 3.0 = +0.5%.", { hints: ["Weight each percentage change by its share of costs."], calculator: true });

  mc(b, [3, "ANALYSIS"], "A severe drought reduces harvests for one year. The most likely effect on the aggregate supply curves is that",
    ["SRAS shifts to the left and LRAS is unchanged", "Correct: a temporary supply shock raises costs but leaves capacity unchanged."],
    [["LRAS shifts to the left and SRAS is unchanged", "A temporary shock does not permanently reduce capacity."], ["both curves shift to the right", "Output falls, so a rightward shift is wrong."], ["there is a movement down along SRAS", "A price level change is not the cause here."]],
    "A one-off supply shock shifts SRAS left; potential output is unchanged unless the damage is lasting.", { hints: ["Is the damage permanent or temporary?"] });

  mc(b, [3, "UNDERSTANDING"], "In the three-section view of LRAS, the section where output can rise without raising the price level is the",
    ["highly elastic section, when there is much spare capacity", "Correct: resources are idle, so output can expand with little pressure on prices."],
    [["vertical section, when the economy is at full capacity", "At full capacity output cannot rise."], ["upward-sloping section, when bottlenecks start to appear", "There prices rise as output rises."], ["section after a rise in the exchange rate", "The exchange rate does not define a section."]],
    "When there is spare capacity, firms can expand output at about the same unit costs, so the curve is nearly horizontal.", { hints: ["When can output rise with no price rise?"] });

  mc(b, [4, "EVALUATION"], "Which of these would be the most likely cause of a long-term rightward shift of LRAS in a developing economy?",
    ["Investment in education, power and roads over many years", "Correct: it raises the quantity and quality of resources and productivity."],
    [["A short-lived fall in world oil prices that reverses next year", "Temporary and mainly a cost change."], ["A temporary cut in the rate of income tax on households", "That mainly affects AD."], ["A rise in the general price level caused by higher demand", "A movement along SRAS, not a capacity change."]],
    "Education, energy and transport raise productive capacity, shifting LRAS to the right.", { hints: ["Which option changes capacity rather than costs or demand?"] });

  {
    const w = [[50, 6], [35, 8], [15, -10]];
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: costChange(w), dp: 1, calculator: true, hints: ["Weighted change = Σ (share × percentage change)."],
      stem: "A firm's costs are 50% labour, 35% materials and 15% energy. Wages rise by 6%, materials prices rise by 8% and energy prices fall by 10%. Calculate the percentage change in the firm's total costs, to one decimal place.",
      wrong: [4, 13, 6.4], explanation: "Weighted change = 0.50 × 6 + 0.35 × 8 + 0.15 × (−10) = 3.0 + 2.8 − 1.5 = 4.3%. (Simply adding 6 + 8 − 10 would give 4.)" });
    const pot = 2.5e6 * 8000;
    chk(pot, 20e9);
    const pot2 = pot * 1.015 * 1.02;
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: pctChange(pot, pot2), dp: 1, calculator: true, hints: ["Potential output = workers × output per worker.", "Multiply the growth factors."],
      stem: "A fictional economy has a labour force of 2.5 million, each producing US\\$8,000 of output a year at full employment. The labour force grows by 1.5% and output per worker by 2%. Calculate the percentage growth of potential output, to one decimal place.",
      wrong: [3, 3.9, 1.7], explanation: "1. Potential output now = 2.5 million × 8,000 = US\\$20 billion.\n2. New potential output = 20 × 1.015 × 1.02 = US\\$20.706 billion.\n3. Growth = (20.706 − 20) ÷ 20 × 100 = 3.5%. (Adding 1.5 + 2 = 3.5 is only approximately right; the exact figure is 3.53%.)" });
    chk(pctChange(pot, pot2), 3.53, 1e-9);
  }
  {
    const s = [[95, 6200], [105, 6800], [115, 7200], [125, 7450]];
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 7200 - 6800, unit: "US$ million", calculator: true, daily: true,
      stem: "A fictional SRAS schedule gives real output (US\\$ million) of 6,200 at a price level of 95, 6,800 at 105, 7,200 at 115 and 7,450 at 125. By how much does real output supplied rise when the price level rises from 105 to 115, in US\\$ million?",
      wrong: [250, 600, 400.5], explanation: "7,200 − 6,800 = 400. This is a movement along the SRAS curve." });
    b.num({ d: 3, skill: "ANALYSIS", kind: "plain", value: 5800 - 5500, unit: "US$ million", calculator: true, hints: ["Compare the increase from 50 to 60 with that from 70 to 80."],
      stem: "Another fictional SRAS schedule shows real output (US\\$ million) of 4,000 at a price level of 50, 4,900 at 60, 5,500 at 70 and 5,800 at 80. By how much does output rise when the price level rises from 70 to 80, in US\\$ million? (Compare it with the rise from 50 to 60: the curve gets steeper as capacity is approached.)",
      wrong: [900, 800, 1800], explanation: "5,800 − 5,500 = 300, compared with 900 for the rise from 50 to 60: the curve is steeper at higher output levels." });
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: 9300 + 500, unit: "US$ million", calculator: true, hints: ["The shift adds a fixed amount at each price level."],
      stem: "At a price level of 99 firms supplied real output of US\\$9,300 million. A fall in oil prices then shifts SRAS to the right by US\\$500 million at every price level. What is the real output supplied at a price level of 99 after the shift, in US\\$ million?",
      wrong: [9300, 8800, 9500], explanation: "Before: 9,300. After: 9,300 + 500 = 9,800 at the same price level." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In the classical view, long-run aggregate supply is a vertical line at the economy's potential output.", answer: true,
    explanation: "True. In the long run output is determined by supply-side factors, not the price level." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Does the oil price change the economy's capacity?"], stem: "A permanent fall in the price of oil shifts both the SRAS and LRAS curves to the right by equal amounts.", answer: false,
    explanation: "False. A fall in oil prices lowers costs and shifts SRAS right. LRAS shifts only if the capacity or productivity of resources changes; it may rise a little but not by an equal amount automatically." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with the curve it shifts.",
    pairs: [["A rise in wage costs", "SRAS shifts to the left"], ["A subsidy to firms' inputs", "SRAS shifts to the right"], ["A big investment in education and roads", "LRAS shifts to the right"], ["A rise in the price level", "Movement along SRAS"]],
    explanation: "Cost changes shift SRAS; capacity changes shift LRAS; the price level moves the economy along SRAS." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A rise in the cost of raw materials shifts {{blank:a}} to the left; an increase in the quality of the labour force shifts {{blank:b}} to the right.",
    blanks: [{ id: "a", accepted: ["SRAS"], choices: ["SRAS", "LRAS", "AD"] }, { id: "b", accepted: ["LRAS"], choices: ["LRAS", "SRAS", "AD"] }],
    explanation: "Input costs shift SRAS; capacity changes shift LRAS (and SRAS)." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the term for the maximum sustainable level of real output that an economy can produce when its resources are fully employed.",
    accepted: ["potential output", "productive capacity", "full employment output", "full-employment output", "potential GDP"], wrong: ["nominal GDP"],
    explanation: "Potential output (productive capacity)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define aggregate supply.",
    points: ["The total quantity of goods and services (real output) that firms in the economy are willing and able to supply.", "At different price levels in a given period."],
    modelAnswer: "Aggregate supply is the total quantity of goods and services that all firms in the economy are willing and able to supply at different price levels in a given period.",
    explanation: "One mark for total output, one for price levels and period." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Why do firms supply more when the price level rises?"],
    stem: "Explain why the short-run aggregate supply curve slopes upward.",
    points: ["In the short run the prices of some inputs, such as wages, are fixed.", "A higher price level raises the revenue per unit while costs per unit stay the same, so profit per unit rises.", "Firms are therefore willing to supply more output.", "As output rises towards capacity, costs per unit rise (overtime, shortages), so the curve gets steeper."],
    modelAnswer: "In the short run some input prices, such as wages, are fixed. A higher price level raises revenue per unit while costs per unit stay the same, so profit per unit rises and firms supply more. As output rises towards capacity, costs per unit rise because of overtime and shortages, so the curve becomes steeper.",
    explanation: "Fixed input prices, rising profit, more supply, steeper near capacity." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Separate the short-run and long-run effects."],
    stem: "Analyse how a major investment in roads and electricity could affect aggregate supply in the short run and the long run.",
    points: ["In the short run the investment may reduce firms' costs (reliable power, lower transport costs), shifting SRAS to the right.", "In the long run it raises the productive capacity of the economy, shifting LRAS to the right.", "More output can be produced at each price level, with downward pressure on the price level.", "The effect takes time because construction and take-up take years.", "The gain depends on the quality of the investment and its financing."],
    modelAnswer: "In the short run reliable power and cheaper transport reduce firms' costs, shifting SRAS to the right. In the long run the investment raises the productive capacity of the economy, shifting LRAS to the right, so more output can be produced at each price level with less pressure on prices. The effect takes years, because construction and take-up are slow, and it depends on the quality of the projects and how they are financed.",
    explanation: "SRAS right (lower costs), LRAS right (capacity), time lag, quality of investment." });

  {
    const t1 = table(["Price level (index)", "Real output supplied before (US\\$ million)", "Real output supplied after (US\\$ million)"], [[130, 5900, 5500], [140, 6600, 6200], [150, 7000, 6600], [160, 7300, 6900]]);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Compare the columns at the same price level.", "A fall in supply at each price level is a leftward shift."],
      stem: `**A supply shock in a fictional economy (illustrative data)**\n\nA severe flood damages roads and power stations, raising the cost of transport and energy. Potential output in the long run is US\\$8,000 million and is not permanently affected.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 400, unit: "US$ million", stem: "By how much does output supplied change at each price level after the flood (a positive number for the fall), in US\\$ million?", wrong: [800, 6800, 350], explanation: "6,600 − 6,200 = 400 at a price level of 140; the same fall of 400 at the other price levels." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(6600, 6200), dp: 1, stem: "Calculate the percentage change in output supplied at a price level of 140 (negative for a fall), to one decimal place.", wrong: [6.1, 6.5, -6.5], explanation: "(6,200 − 6,600) ÷ 6,600 × 100 = −6.1%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the flood shifts SRAS but not LRAS.",
          points: ["The flood raises the costs of transport and energy, so firms supply less at each price level (SRAS shifts left).", "The damage is temporary and potential output is unchanged (US\\$8,000 million).", "LRAS depends on the quantity and quality of resources and technology, which have not permanently changed."],
          modelAnswer: "The flood raises the costs of transport and energy, so firms supply less at each price level and SRAS shifts to the left. The damage is temporary and potential output is unchanged at US\\$8,000 million, because the quantity and quality of resources and technology have not permanently changed, so LRAS does not shift." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether the shift would be permanent if the government rebuilt the roads and power stations with better equipment.",
          points: ["Rebuilding restores supply and lowers costs, so SRAS shifts back to the right.", "Better equipment and infrastructure could raise productivity and potential output, shifting LRAS to the right beyond the original level.", "The speed depends on funds, construction time and the availability of skills.", "A judgement that the shift is temporary in the short run, but better investment could permanently raise capacity."],
          modelAnswer: "Rebuilding the roads and power stations would restore supply and lower costs, so SRAS would shift back to the right. If the equipment is better than before, productivity and potential output could rise, shifting LRAS to the right beyond its original level. The speed depends on funds, construction time and skills. Overall the cost shock is temporary, but good reconstruction could permanently raise the economy's capacity." }),
      ],
      explanation: "Supply falls 400 at each price level; −6.1% at 140; temporary shock shifts SRAS not LRAS; rebuilding can restore or raise supply." });
  }
  {
    const t2 = table(["Item", "Year 1", "Year 2"], [["Labour force (million)", 3.2, 3.296], ["Output per worker (US\\$)", 9000, 9270]]);
    const q1 = 3.2e6 * 9000, q2 = 3.296e6 * 9270;
    const gr = pctChange(q1, q2);
    chk(q1, 28.8e9, 1e-3); chk(gr, 6.0909, 1e-3);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Potential output = labour force × output per worker.", "Percentage growth = change ÷ original × 100."],
      stem: `**Growth in capacity (illustrative data)**\n\nA fictional government spends heavily on training and on a new power station. Full-employment output is the labour force multiplied by output per worker.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: pctChange(3.2, 3.296), dp: 1, stem: "Calculate the percentage growth of the labour force, to one decimal place.", wrong: [0.1, 3.3, 96], explanation: "(3.296 − 3.2) ÷ 3.2 × 100 = 3.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(9000, 9270), dp: 1, stem: "Calculate the percentage growth of output per worker, to one decimal place.", wrong: [2.9, 3.3, 270], explanation: "(9,270 − 9,000) ÷ 9,000 × 100 = 3.0%." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: gr, dp: 1, stem: "Calculate the percentage growth of potential output, to one decimal place.", wrong: [6, 3, 9.1], explanation: "Year 1: 3.2 million × 9,000 = US\\$28.8 billion. Year 2: 3.296 million × 9,270 = US\\$30.56 billion. Growth = 6.1%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how the training and the power station could shift LRAS to the right.",
          points: ["Training raises the skills of workers, so output per worker (productivity) rises.", "A power station provides reliable energy, which raises output per worker and lowers firms' costs.", "Both increase potential output (LRAS shifts right by about 6.1%).", "The gain takes time and depends on the quality of the training and the project."],
          modelAnswer: "Training raises the skills of workers, so output per worker rises. A new power station provides reliable energy, which raises productivity and lowers firms' costs. Both increase the economy's potential output, which here grows by about 6.1%, shifting LRAS to the right. The gain takes time and depends on the quality of the training and the project." }),
      ],
      explanation: "Labour force +3.0%; output per worker +3.0%; potential output +6.1%; training and energy raise productivity and shift LRAS." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Distinguish short-run and long-run effects.", "Reach a judgement."],
    stem: "Assess the extent to which a fall in the price of oil benefits an oil-importing developing economy.",
    points: ["A fall in oil prices lowers firms' costs, shifting SRAS to the right.", "Output rises and the price level falls in the short run, with higher employment.", "Household costs (transport, electricity) fall, raising real incomes and AD.", "The import bill falls, improving the balance of payments and the exchange rate.", "The effect is temporary if prices rise again; LRAS is not shifted unless capacity changes.", "The benefit depends on how important oil is in costs and how fully firms pass on the saving.", "Producers of oil-related exports or substitutes may lose.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "A fall in oil prices lowers firms' costs of transport and energy, shifting SRAS to the right, so output and employment rise and the price level falls. Households also benefit from cheaper fuel and electricity, which raises real incomes and AD, and the import bill falls, improving the balance of payments. However, the benefit is temporary if prices rise again, because LRAS does not shift unless capacity changes. The gain depends on how important oil is in costs and on whether firms pass on the savings, and any domestic producers of substitutes may lose. Overall an importing economy gains in the short run, but the gain is larger if the saving is used to invest in capacity.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Cost shift gains weighed against temporary nature and distributional effects." });

  b.card("DEFINITION", "Define **aggregate supply**.", "The total real output that firms in an economy are willing and able to supply at different price levels in a period.");
  b.card("CONCEPT", "Why does SRAS slope upward?", "Input prices such as wages are fixed in the short run, so a higher price level raises profit per unit and firms supply more.");
  b.card("CONCEPT", "What shape is LRAS?", "Vertical at potential output (classical); or in three sections: highly elastic, upward-sloping, then vertical (Keynesian).");
  b.card("CONCEPT", "What shifts SRAS?", "Changes in the costs of production: wages, raw materials and energy, exchange rate, taxes and subsidies, productivity, supply shocks.");
  b.card("CONCEPT", "What shifts LRAS?", "Changes in the quantity or quality of factors of production, technology and institutions that change productive capacity.");
  b.card("CONCEPT", "What is the difference between a movement along SRAS and a shift?", "A price level change moves the economy along SRAS; a change in costs or capacity shifts the curve.");
  b.card("FORMULA", "How do you find a weighted change in costs?", "Sum of (share of costs × percentage change in that cost).");
  b.card("FORMULA", "How do you calculate growth of potential output?", "Potential output = labour force × output per worker; growth = (new − old) ÷ old × 100.");
  b.card("DEFINITION", "Define **productive capacity**.", "The maximum sustainable output of an economy when its resources are fully employed.");
});
