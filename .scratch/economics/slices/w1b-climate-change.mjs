// W1b: econ.supply.climate-change (ZIMSEC only) — climate change, effects on production, mitigation and adaptation.
import { concept, P, pctChange, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.supply.climate-change", { file: "supply/climate-change", keyPrefix: "supply.climate-change" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of **climate change**?",
    options: [
      ["A long-term change in average temperatures and weather patterns", "Correct: climate is the average over many years."],
      ["A very dry rainy season in one particular year", "One season is weather, not a long-term change in climate."],
      ["The daily change in temperature between morning and night", "Daily changes are weather."],
      ["The movement of the seasons from summer to winter", "Seasons are a normal, regular pattern, not a change in climate."],
    ],
    answer: "A",
    explanation: "Climate change is a long-term shift in average temperature and weather patterns; today it is mainly caused by greenhouse gases from human activity.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which human activity adds most to the greenhouse gases that cause climate change?",
    options: [
      ["Burning coal, oil and gas", "Correct: fossil fuels release carbon dioxide when burned."],
      ["Planting new forests", "Trees absorb carbon dioxide, so planting them reduces greenhouse gases."],
      ["Using solar panels for electricity", "Solar power produces electricity without burning fuel."],
      ["Harvesting rainwater in tanks", "Water harvesting is an adaptation measure; it releases no greenhouse gases."],
    ],
    answer: "A",
    explanation: "Burning fossil fuels releases carbon dioxide, the main greenhouse gas; clearing forests also adds to it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A severe drought reduces the maize harvest in Zimbabwe. What happens to the market supply curve for maize?",
    options: [
      ["It shifts to the left", "Correct: less maize is available at every price."],
      ["It shifts to the right", "A rightward shift would follow a good season or better technology."],
      ["There is a movement up along it", "The drought is not a change in the price of maize."],
      ["There is a movement down along it", "The cause is not a change in the price of maize."],
    ],
    answer: "A",
    explanation: "Drought lowers yields, so **supply decreases**: the curve shifts left and the price of maize tends to rise.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure is an example of **mitigation** of climate change?",
    options: [
      ["Planting trees on bare hillsides", "Correct: trees absorb carbon dioxide, reducing a cause of climate change."],
      ["Growing drought-tolerant sorghum", "This helps farmers cope with drought: adaptation."],
      ["Building a dam to irrigate crops", "Irrigation helps producers cope with dry spells: adaptation."],
      ["Buying crop insurance", "Insurance protects incomes after a disaster: adaptation."],
    ],
    answer: "A",
    explanation: "Mitigation reduces the causes (emissions, carbon in the air). Adaptation helps producers cope with the effects.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Low rainfall in the Zambezi catchment reduces hydro-electricity generation at Kariba. Which is the most likely effect on a manufacturing firm in Harare?",
    options: [
      ["Its costs rise and its supply decreases", "Correct: power cuts cut output or force the firm to pay for generator fuel."],
      ["Its costs fall and its supply increases", "Less electricity makes production harder and dearer, not cheaper."],
      ["Demand for its products increases", "The effect is on the firm's ability to produce, which is supply."],
      ["There is no effect because it is far from Kariba", "The national grid carries Kariba's power to towns across the country."],
    ],
    answer: "A",
    hints: ["How does a factory keep machines running during a power cut?"],
    explanation: "Power cuts stop machines or force the use of diesel generators, raising costs; less is supplied at every price (shift left).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which measure helps a cattle farmer in Matabeleland South **adapt** to more frequent droughts?",
    options: [
      ["Storing fodder and selling some animals before the dry season", "Correct: this protects the herd's value when pasture fails."],
      ["Buying more cattle at the start of the dry season", "More animals need more grazing and water just when they are scarce."],
      ["Burning grassland to clear it for grazing", "Burning destroys pasture and releases carbon dioxide."],
      ["Moving cattle away from water points", "Cattle need water most in a drought."],
    ],
    answer: "A",
    hints: ["Adaptation means coping with the effects of drought."],
    explanation: "Fodder storage and planned destocking reduce losses when pastures and water dry up.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A government wants a measure that both **reduces** greenhouse gas emissions and **protects** production when hydro-electricity is scarce. Which measure fits best?",
    options: [
      ["Encouraging solar power for farms and factories", "Correct: solar is renewable (mitigation) and does not depend on rainfall (adaptation)."],
      ["Building more coal-fired power stations", "This protects electricity supply but increases emissions."],
      ["Encouraging farmers to grow drought-tolerant crops", "This is adaptation only; it does not reduce emissions."],
      ["Cutting trees for firewood when power is unavailable", "This increases emissions and damages catchments."],
    ],
    answer: "A",
    hints: ["You need a measure that mitigates and adapts at the same time."],
    explanation: "Solar power cuts fossil-fuel use and removes dependence on hydro power in dry years, so it both mitigates and adapts.",
  });

  // Numerical items (fictional farms).
  const ha = 8, y1 = 3.5, y2 = 2.1;
  const pc = pctChange(ha * y1, ha * y2);
  check("pc", pc, -40);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: ha * y2, dp: 1, tol: 0.05,
    stem: `A fictional farmer grows maize on ${ha} hectares. In a drought year the yield falls to ${y2} tonnes per hectare. Calculate her total output in tonnes.`,
    wrong: [ha * y1, y2],
    explanation: `Output = area × yield = ${ha} × ${y2} = **${(ha * y2).toFixed(1)} tonnes**.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: pc,
    stem: `The same farmer (${ha} hectares) normally harvests ${y1} tonnes per hectare; in the drought year she harvests ${y2} tonnes per hectare. Calculate the percentage change in her output. Include the minus sign for a fall and give your answer to one decimal place.`,
    wrong: [-pc, pctChange(ha * y2, ha * y1)],
    hints: ["Work out output in each year, or use the yields directly: the area is the same.", "Percentage change = (new − original) ÷ original × 100."],
    explanation: `1. Normal output = ${ha} × ${y1} = ${ha * y1} tonnes; drought output = ${ha} × ${y2} = ${(ha * y2).toFixed(1)} tonnes.\n2. Change = ${(ha * y2).toFixed(1)} − ${ha * y1} = ${(ha * y2 - ha * y1).toFixed(1)} tonnes.\n3. Percentage change = ${(ha * y2 - ha * y1).toFixed(1)} ÷ ${ha * y1} × 100 = **${pc.toFixed(1)}%**.\n4. Using the drought output as the base gives ${pctChange(ha * y2, ha * y1).toFixed(1)}%, the wrong base and the wrong sign.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Growing drought-tolerant crops such as sorghum and millet is an example of adapting to climate change.",
    answer: true,
    explanation: "True. These crops still produce a harvest in dry seasons, helping farmers cope with the effects of climate change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Because climate change reduces crop supply, it usually leads to lower food prices.",
    answer: false,
    explanation: "False. A decrease in supply (shift left) with unchanged demand **raises** the equilibrium price of food.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure to how it helps.",
    pairs: [
      ["Reforestation", "Absorbs carbon dioxide and protects water catchments"],
      ["Drip irrigation", "Reduces crops' dependence on rainfall"],
      ["Mulching and minimum tillage", "Keeps moisture and soil in the field"],
      ["Early-warning weather forecasts", "Help farmers decide when and what to plant"],
    ],
    explanation: "Reforestation mitigates; irrigation, conservation agriculture and forecasts help producers adapt.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Actions that reduce the causes of climate change are called {{blank:a}}. Actions that help producers cope with its effects are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["mitigation"], choices: ["mitigation", "adaptation"] },
      { id: "b", accepted: ["adaptation"], choices: ["mitigation", "adaptation"] },
    ],
    wrong: [["adaptation", "mitigation"]],
    explanation: "Mitigation tackles causes; adaptation copes with effects.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** effects of climate change on livestock production in Zimbabwe.",
    points: [
      "Identifies: droughts dry up pastures and water points.",
      "Explains: cattle lose condition or die, so supply of beef, milk and draught power falls.",
      "Identifies a second effect, e.g. heat stress or new pests and diseases / forced sales at low prices.",
      "Explains its effect on output, costs or farmers' incomes.",
    ],
    modelAnswer: "First, longer droughts dry up grazing and water points, so cattle lose weight or die; less beef and milk is produced, and farmers lose draught power for ploughing. Second, farmers may be forced to sell animals in a hurry at low prices before they die, so their herds and incomes shrink and they cannot restock quickly.",
    hints: ["Think about grazing, water and farmers' incomes."],
    explanation: "Each effect: identify (1) and link it to production or income (1).",
  });

  // Structured 1: data on a fictional ward.
  const rows = [["Maize", 6, 1.8], ["Sorghum", 3.5, 2.4], ["Millet", 2.8, 2.2]];
  const t = table(["Crop", "Normal year (tonnes per hectare)", "Drought year (tonnes per hectare)"], rows);
  const pcs = rows.map(([, a, c]) => pctChange(a, c));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows average yields of three crops in a fictional ward in a normal year and in a drought year.\n\n${t}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: pcs[0], stem: "Calculate the percentage change in the maize yield in the drought year. Include the minus sign and give your answer to one decimal place.", wrong: [-pcs[0], pctChange(1.8, 6)], explanation: `(1.8 − 6) ÷ 6 × 100 = ${pcs[0].toFixed(1)}%.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pcs[1], stem: "Calculate the percentage change in the sorghum yield in the drought year. Include the minus sign and give your answer to one decimal place.", wrong: [-pcs[1], pctChange(2.4, 3.5)], explanation: `(2.4 − 3.5) ÷ 3.5 × 100 = ${pcs[1].toFixed(1)}%.` }),
      P.mcq({
        label: "(c)", stem: "Which crop gave the **highest** yield in the drought year?",
        options: [["Sorghum", "Correct: 2.4 tonnes per hectare."], ["Maize", "Maize has the highest normal yield but only 1.8 in the drought."], ["Millet", "Millet gave 2.2, slightly less than sorghum."], ["All three were equal", "The drought yields differ: 1.8, 2.4 and 2.2."]],
        answer: "A",
        explanation: "In the drought, sorghum (2.4) > millet (2.2) > maize (1.8).",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether farmers in the ward should replace maize with sorghum and millet.",
        points: [
          `For: sorghum and millet lose much less in a drought (maize ${pcs[0].toFixed(1)}%, sorghum ${pcs[1].toFixed(1)}%, millet ${pcs[2].toFixed(1)}%).`,
          "For: more reliable food and income as droughts become more frequent (adaptation).",
          "Against: in a normal year maize yields far more (6 against 3.5 and 2.8 tonnes per hectare).",
          "Against: maize is the staple food and easier to sell; sorghum may fetch lower prices / need processing / birds damage it.",
          "Possible compromise: plant a mix of crops to spread risk, or use conservation agriculture for maize.",
          "Justified conclusion, e.g. depends on how often droughts occur.",
        ],
        modelAnswer: `Sorghum and millet are far more reliable in a drought: their yields fall by about ${Math.abs(pcs[1]).toFixed(0)}% and ${Math.abs(pcs[2]).toFixed(0)}%, while maize falls by ${Math.abs(pcs[0]).toFixed(0)}%. As droughts become more common, switching would protect food supply and income. However, in a normal year maize gives much more grain per hectare, and it is the main staple with a ready market, so a full switch would cost farmers output in good years. A sensible approach is to plant part of the land with sorghum and millet to spread risk, and keep maize on the wettest land. The best mix depends on how often droughts strike: the more frequent they are, the more land should go to the drought-tolerant crops.`,
        explanation: "Weigh drought resilience against lower yields in normal years and market demand; conclude.",
      }),
    ],
    hints: ["Percentage change = (new − original) ÷ original × 100.", "Compare both normal-year and drought-year yields."],
    explanation: "Drought-tolerant crops lose less in dry years but yield less in good years: a trade-off between risk and output.",
  });

  // Structured 2: hydro power chain.
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "A fictional dairy processor in Gweru makes milk, yoghurt and cheese. In a dry year the national grid introduces long daily power cuts because hydro-electricity generation has fallen. The firm must either stop its machines or run a diesel generator.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which is the most likely effect on the supply of the firm's yoghurt?",
        options: [
          ["Supply decreases: the curve shifts to the left", "Correct: higher costs and lost production time."],
          ["Supply increases: the curve shifts to the right", "Power cuts do not lower costs."],
          ["Quantity supplied extends along the curve", "The price of yoghurt has not changed."],
          ["Demand for yoghurt decreases", "Power cuts affect the firm's ability to produce, which is supply."],
        ],
        answer: "A",
        explanation: "Less output and higher costs at every price: a decrease in supply.",
      }),
      P.tf({ label: "(b)", stem: "Running a diesel generator is a form of climate-change mitigation.", answer: false, explanation: "False: burning diesel adds greenhouse gases. It helps the firm cope (adapt) but does not mitigate." }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain how a dry year can raise the price of dairy products in shops. Use the idea of supply in your answer.",
        points: [
          "Low rainfall lowers Kariba's water level, so less hydro-electricity is generated (power cuts).",
          "Processors lose production time or pay for diesel, so their costs rise.",
          "Drought also reduces pasture, so farmers produce less milk / feed costs rise.",
          "Supply of dairy products decreases: the supply curve shifts to the left.",
          "With unchanged demand there is a shortage at the old price.",
          "So the equilibrium price rises.",
        ],
        modelAnswer: "In a dry year Kariba holds less water, so less electricity is generated and processors suffer power cuts. They lose production time or pay for diesel, which raises their costs. The drought also dries up pasture, so dairy farmers produce less milk or pay more for feed. For both reasons less is supplied at every price: the supply curve shifts to the left. At the old price there is now a shortage, so the price rises to a new, higher equilibrium.",
        explanation: "Two routes (power and pasture) to a leftward supply shift, then the price effect.",
      }),
    ],
    hints: ["Trace both the power supply and the milk supply.", "A leftward supply shift with unchanged demand raises the price."],
    explanation: "Drought affects dairy supply through electricity and through pasture, so supply decreases and prices rise.",
  });

  b.card("DEFINITION", "Define **climate change**.", "A long-term change in average temperatures and weather patterns, now mainly caused by greenhouse gases from human activity.");
  b.card("DEFINITION", "What is **mitigation** of climate change?", "Reducing its causes, e.g. cutting emissions with renewable energy or planting trees.");
  b.card("DEFINITION", "What is **adaptation** to climate change?", "Coping with its effects, e.g. irrigation, drought-tolerant crops, conservation agriculture, insurance.");
  b.card("FACT", "How does drought affect the supply curve of maize?", "Supply decreases: the curve shifts to the left and the price tends to rise.");
  b.card("CONCEPT", "Why can low rainfall reduce factory output in Zimbabwe?", "Lower water levels at Kariba cut hydro-electricity, causing power cuts that stop machines or raise costs.");
  b.card("FACT", "Give three effects of climate change on production in Zimbabwe.", "Lower crop yields; livestock losses; less hydro-electricity; damage from floods and cyclones.");
  b.card("CONCEPT", "Give two drought-tolerant crops.", "Sorghum and millet (also short-season maize varieties).");
  b.card("CONCEPT", "Why is solar power both mitigation and adaptation?", "It cuts fossil-fuel emissions and does not depend on rainfall for hydro power.");
});
