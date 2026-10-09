// W4b: econ.trade.terms-of-trade (ZIMSEC only) — formula, calculation, favourable and unfavourable movements, causes
// and interpretation. Figures differ from the lesson's worked examples.
import { concept, P, table, termsOfTrade, pctChange, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.terms-of-trade", { file: "trade/terms-of-trade", keyPrefix: "trade.terms-of-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How are the terms of trade calculated?",
    options: [
      ["Index of export prices ÷ index of import prices × 100", "Correct: export prices go on top."],
      ["Index of import prices ÷ index of export prices × 100", "This is upside down."],
      ["Value of exports − value of imports", "This is the balance of trade."],
      ["Volume of exports ÷ volume of imports × 100", "The terms of trade compare prices, not volumes."],
    ],
    answer: "A",
    explanation: "Terms of trade = export price index ÷ import price index × 100.",
  });
  {
    const v = termsOfTrade(115, 92);
    check("v", v, 125);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "A fictional country's export price index is 115 and its import price index is 92. What are its terms of trade?",
      options: [
        [fmt(v, 1), "Correct: 115 ÷ 92 × 100 = 125.0."],
        [fmt(termsOfTrade(92, 115), 1), "This divides import prices by export prices."],
        ["23.0", "This subtracts the indices."],
        ["207.0", "This adds the indices."],
      ],
      answer: "A",
      explanation: "115 ÷ 92 × 100 = 125.0, a favourable position compared with the base year (100).",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country's terms of trade rise from 100 to 110. What does this mean?",
    options: [
      ["A given quantity of exports now pays for more imports", "Correct: export prices have risen relative to import prices."],
      ["The value of exports is now greater than the value of imports", "That is a balance of trade surplus, a different measure."],
      ["The country is exporting 10% more goods than before", "The terms of trade measure prices, not quantities."],
      ["Import prices have risen faster than export prices", "That would lower the terms of trade."],
    ],
    answer: "A",
    explanation: "A rise in the terms of trade is a favourable movement: each unit of exports buys more imports.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change would cause a **favourable** movement in the terms of trade of a country that exports chrome and imports fuel?",
    options: [
      ["A rise in the world price of chrome while the price of fuel is unchanged", "Correct: export prices rise relative to import prices."],
      ["A rise in the world price of fuel while the price of chrome is unchanged", "Import prices rise: an unfavourable movement."],
      ["An increase in the quantity of chrome exported at the same price", "Quantities do not change the terms of trade."],
      ["Equal percentage rises in the prices of chrome and fuel", "The ratio is unchanged."],
    ],
    answer: "A",
    hints: ["Which index must rise relative to the other?"],
    explanation: "The terms of trade improve when export prices rise relative to import prices.",
  });
  {
    const yrs = ["2023", "2024", "2025", "2026"], X = [100, 107, 111, 103], M = [100, 103, 118, 103];
    const tot = X.map((x, i) => termsOfTrade(x, M[i]));
    check("t24", tot[1], 103.883, 0.001); check("t25", tot[2], 94.068, 0.001); check("t26", tot[3], 100);
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: `The table shows price indices for a fictional country (2023 = 100).\n\n${table(["Year", "Export price index", "Import price index"], yrs.map((y, i) => [y, X[i], M[i]]))}\n\nIn which year did the terms of trade move **unfavourably** compared with the year before?`,
      options: [
        ["2025", `Correct: from ${fmt(tot[1], 1)} to ${fmt(tot[2], 1)}.`],
        ["2024", `They rose from 100 to ${fmt(tot[1], 1)}, a favourable movement.`],
        ["2026", `They rose from ${fmt(tot[2], 1)} to 100.0, a favourable movement.`],
        ["2023", "2023 is the base year; there is no earlier year to compare with."],
      ],
      answer: "A",
      hints: ["Calculate the terms of trade for each year, then compare each with the year before."],
      explanation: `Terms of trade: 2023 100.0; 2024 ${fmt(tot[1], 1)}; 2025 ${fmt(tot[2], 1)}; 2026 ${fmt(tot[3], 1)}. Only 2025 shows a fall, because import prices rose much faster than export prices. Note that 2026 is favourable even though export prices fell, because import prices fell more.`,
    });
  }
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country's terms of trade improve because its inflation rate is higher than that of its trading partners. Demand for its exports is price elastic. What is the most likely result?",
    options: [
      ["Its export earnings fall", "Correct: higher export prices cut the quantity sold more than proportionately."],
      ["Its export earnings rise because exports are dearer", "With elastic demand, total revenue falls when price rises."],
      ["Its imports become dearer than before", "The terms of trade rose because export prices rose relative to import prices."],
      ["Its terms of trade fall back to 100 at once", "Nothing forces the index back to the base."],
    ],
    answer: "A",
    hints: ["What happens to total spending on a good with elastic demand when its price rises?"],
    explanation: "A favourable movement caused by relative inflation makes exports less competitive. With price elastic demand, the percentage fall in quantity is greater than the percentage rise in price, so export earnings fall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The world price of crude oil rises sharply while other prices are unchanged. What happens to the terms of trade of a country that imports all its oil and exports cotton?",
    options: [
      ["They fall: an unfavourable movement", "Correct: import prices rise relative to export prices."],
      ["They rise: a favourable movement", "This would be true for an oil exporter."],
      ["They do not change, because cotton prices are unchanged", "The import price index rises, so the ratio falls."],
      ["They rise, because the country must export more cotton", "Exporting more is a consequence of a fall, not a rise."],
    ],
    answer: "A",
    hints: ["Oil is in the import price index."],
    explanation: "Higher oil prices raise the import price index, so export prices ÷ import prices × 100 falls.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly distinguishes the terms of trade from the balance of trade?",
    options: [
      ["The terms of trade compare export and import prices; the balance of trade compares their values", "Correct."],
      ["The terms of trade include services; the balance of trade includes only income flows from abroad", "The balance of trade is about visible goods, not income flows."],
      ["The terms of trade are measured in US dollars; the balance of trade is an index", "It is the other way round."],
      ["They measure the same thing using different base years", "They measure different things."],
    ],
    answer: "A",
    explanation: "Terms of trade: a price ratio (index). Balance of trade: value of visible exports − value of visible imports.",
  });

  // Numericals.
  {
    const v = termsOfTrade(90, 120);
    check("v", v, 75);
    b.num({
      d: 2, skill: "APPLICATION", kind: "index", value: v, daily: true,
      stem: "A fictional country's export price index is 90 and its import price index is 120 (base year = 100). Calculate its terms of trade. Give your answer to one decimal place.",
      wrong: [termsOfTrade(120, 90), 120 - 90],
      explanation: `90 ÷ 120 × 100 = **${fmt(v, 1)}**. Turning the formula upside down gives ${fmt(termsOfTrade(120, 90), 1)}. The terms of trade are 25% worse than in the base year.`,
    });
  }
  {
    const t0 = termsOfTrade(96, 120), t1 = termsOfTrade(117, 104), ch = pctChange(t0, t1);
    check("t0", t0, 80); check("t1", t1, 112.5); check("ch", ch, 40.625);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: ch, calculator: true,
      stem: `In a fictional country, the export price index was 96 in 2025 and 117 in 2026; the import price index was 120 in 2025 and 104 in 2026. Calculate the percentage change in the terms of trade between 2025 and 2026. Give your answer to one decimal place.`,
      wrong: [t1 - t0, pctChange(96, 117)],
      hints: ["Calculate the terms of trade for each year first.", "Percentage change = change ÷ original × 100."],
      explanation: `1. 2025: 96 ÷ 120 × 100 = ${fmt(t0, 1)}.\n2. 2026: 117 ÷ 104 × 100 = ${fmt(t1, 1)}.\n3. Change = (${fmt(t1, 1)} − ${fmt(t0, 1)}) ÷ ${fmt(t0, 1)} × 100 = **${pct(ch, 1)}**, a favourable movement. ${fmt(t1 - t0, 1)} is the change in points, not per cent; ${pct(pctChange(96, 117), 1)} is the change in export prices only.`,
    });
  }
  {
    const tot = 95, m = 120, x = (tot * m) / 100;
    check("x", termsOfTrade(x, m), tot);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "index", value: x, calculator: true,
      stem: `A fictional country's terms of trade are ${tot} and its import price index is ${m}. Calculate its export price index. Give your answer to one decimal place.`,
      wrong: [(m / tot) * 100, (tot / m) * 100],
      hints: ["Rearrange: export index = terms of trade × import index ÷ 100."],
      explanation: `Export index = ${tot} × ${m} ÷ 100 = **${fmt(x, 1)}**. Check: ${fmt(x, 1)} ÷ ${m} × 100 = ${tot}.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the base year, the terms of trade index is 100.",
    answer: true,
    explanation: "True. Both price indices are 100 in the base year, so 100 ÷ 100 × 100 = 100.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a country's export prices rise, its terms of trade must improve.",
    answer: false,
    explanation: "False. If import prices rise even faster, the terms of trade worsen. Only the relative change matters.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each change (other prices unchanged) with its effect on the terms of trade of a country that exports gold and tobacco and imports fuel and machinery.",
    pairs: [
      ["World gold price rises", "Favourable movement"],
      ["World fuel price rises", "Unfavourable movement"],
      ["All export and import prices rise by 10%", "No change in the terms of trade"],
    ],
    extraRight: ["The balance of trade must move into surplus"],
    explanation: "Export prices up → favourable; import prices up → unfavourable; equal percentage rises in all prices leave the ratio unchanged. The terms of trade say nothing certain about the balance of trade.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "The terms of trade of a fictional country fall from 104 to 96. This is an {{blank:a}} movement, so the country must export {{blank:b}} goods to buy the same quantity of imports.",
    blanks: [
      { id: "a", accepted: ["unfavourable"], choices: ["favourable", "unfavourable"] },
      { id: "b", accepted: ["more"], choices: ["more", "fewer"] },
    ],
    wrong: [["favourable", "fewer"]],
    hints: ["A fall means import prices rose relative to export prices."],
    explanation: "A fall in the index is unfavourable: each unit of exports buys fewer imports, so more exports are needed for the same imports.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of an unfavourable movement in the terms of trade of a country that exports primary products.",
    points: [
      "A fall in world demand for (or a rise in world supply of) its primary exports, e.g. minerals or tobacco…",
      "…lowers its export prices relative to import prices.",
      "A rise in the world prices of its imports, such as fuel or machinery / a depreciation of its currency…",
      "…raises import prices relative to export prices, so the index falls.",
    ],
    modelAnswer: "First, a fall in world demand for its primary exports, for example during a world recession, or a big increase in supply from new mines or good harvests elsewhere, lowers the world prices of its minerals or crops, so its export price index falls relative to its import price index. Second, a rise in the world price of its imports, such as oil, fertiliser or machinery, or a depreciation of its currency that makes imports dearer in local currency, raises the import price index relative to the export price index. In both cases the terms of trade fall.",
    hints: ["One cause on the export side, one on the import side."],
    explanation: "Two marks per cause: identify + explain how it changes relative prices.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why a favourable movement in the terms of trade is not always good for a country.",
    points: [
      "If the improvement comes from higher export prices caused by domestic inflation (or appreciation), exports become less competitive.",
      "If demand for exports is price elastic, the quantity sold falls more than proportionately, so export earnings fall.",
      "Lower export earnings worsen the current account and cost jobs in export industries.",
    ],
    modelAnswer: "A favourable movement means export prices have risen relative to import prices. If this happened because the country's inflation is higher than its trading partners', its exports become less competitive. When demand for the exports is price elastic, the quantity sold falls by a bigger percentage than the price rises, so total export earnings fall, the current account worsens and workers in export industries may lose their jobs.",
    hints: ["Think about the cause and price elasticity of demand for exports."],
    explanation: "Cause → competitiveness → elastic demand → earnings and jobs.",
  });

  // Structured 1 (8 marks).
  {
    const yrs = ["2024", "2025", "2026"], X = [100, 94, 103], M = [100, 116, 116];
    const tot = X.map((x, i) => termsOfTrade(x, M[i]));
    check("t25", tot[1], 81.034, 0.001); check("t26", tot[2], 88.793, 0.001);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country T is a fictional country that exports cotton and copper and imports fuel and machinery.\n\n${table(["Year", "Export price index (2024 = 100)", "Import price index (2024 = 100)"], yrs.map((y, i) => [y, X[i], M[i]]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "index", value: tot[1], stem: "Calculate the terms of trade for 2025. Give your answer to one decimal place.", wrong: [termsOfTrade(M[1], X[1])], explanation: `${X[1]} ÷ ${M[1]} × 100 = ${fmt(tot[1], 1)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "index", value: tot[2], stem: "Calculate the terms of trade for 2026. Give your answer to one decimal place.", wrong: [termsOfTrade(M[2], X[2])], explanation: `${X[2]} ÷ ${M[2]} × 100 = ${fmt(tot[2], 2)} ≈ ${fmt(tot[2], 1)}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which describes the movement in the terms of trade between 2025 and 2026?",
          options: [["Favourable, but still worse than in 2024", "Correct: up from 81.0 to 88.8, still below 100."], ["Unfavourable, because the index is below 100", "Compared with 2025 the index rose."], ["Favourable, and better than in 2024", "88.8 is below the 2024 level of 100."], ["No change, because import prices did not change", "Export prices rose, so the ratio rose."]],
          answer: "A",
          explanation: "Compare each year with the previous year to judge the movement, and with 100 to compare with the base year.",
        }),
        P.manual({
          label: "(d)", marks: 4, levels: LV(4),
          stem: "Discuss whether the change in the terms of trade between 2024 and 2025 must have harmed Country T.",
          points: [
            "Harmful: export prices fell 6% while import prices rose 16%; more cotton and copper needed to buy the same fuel and machinery; real income falls; current account and inflation pressure.",
            "Not necessarily: if lower export prices raised the quantity sold (elastic demand), export earnings could hold up or rise.",
            "Not necessarily: if import volumes fell or dearer machinery is better quality, the effect is smaller.",
            "Justified conclusion.",
          ],
          modelAnswer: "The terms of trade fell to 81.0: export prices fell by 6% while import prices rose by 16%, so Country T had to export much more cotton and copper to buy the same fuel and machinery, which reduces its real income, worsens its current account and raises the cost of imported inputs. However, the harm depends on quantities. If the lower prices of its exports led foreign buyers to buy much more (elastic demand), export earnings might not fall, and if the country cut its fuel imports the extra cost would be smaller. As fuel and machinery are hard to do without, the demand for imports is probably inelastic, so on balance the change is likely to have harmed Country T.",
          explanation: "Price effect versus quantity effects; conclude.",
        }),
      ],
      hints: ["Terms of trade = export index ÷ import index × 100.", "Judge each movement against the year before."],
      explanation: `Terms of trade: 2024 100.0, 2025 ${fmt(tot[1], 1)}, 2026 ${fmt(tot[2], 1)}.`,
    });
  }
  // Structured 2 (12 marks).
  {
    const yrs = ["2022", "2023", "2024", "2025", "2026"], X = [100, 110, 121, 115, 99], M = [100, 104, 110, 115, 110];
    const tot = X.map((x, i) => termsOfTrade(x, M[i]));
    check("t23", tot[1], 105.769, 0.001); check("t24", tot[2], 110); check("t25", tot[3], 100); check("t26", tot[4], 90);
    const ch = pctChange(tot[2], tot[4]);
    check("ch", ch, -18.1818, 0.001);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country V is a fictional country whose main exports are gold, platinum and tobacco. It imports most of its fuel, fertiliser and machinery. After 2024 the world prices of gold and platinum fell.\n\n${table(["Year", "Export price index (2022 = 100)", "Import price index (2022 = 100)"], yrs.map((y, i) => [y, X[i], M[i]]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "index", value: tot[2], stem: "Calculate the terms of trade for 2024. Give your answer to one decimal place.", wrong: [termsOfTrade(M[2], X[2])], explanation: `${X[2]} ÷ ${M[2]} × 100 = ${fmt(tot[2], 1)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "index", value: tot[4], stem: "Calculate the terms of trade for 2026. Give your answer to one decimal place.", wrong: [termsOfTrade(M[4], X[4])], explanation: `${X[4]} ÷ ${M[4]} × 100 = ${fmt(tot[4], 1)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: ch, stem: "Calculate the percentage change in the terms of trade between 2024 and 2026. Give a fall as a negative number, to one decimal place.", wrong: [-ch, tot[4] - tot[2]], explanation: `(${fmt(tot[4], 1)} − ${fmt(tot[2], 1)}) ÷ ${fmt(tot[2], 1)} × 100 = ${fmt(ch, 1)}%.` }),
        P.fib({
          label: "(d)", marks: 2,
          stem: "Complete the sentence.",
          template: "Between 2024 and 2026 the terms of trade moved {{blank:a}}, mainly because {{blank:b}} prices fell.",
          blanks: [
            { id: "a", accepted: ["unfavourably"], choices: ["favourably", "unfavourably"] },
            { id: "b", accepted: ["export"], choices: ["export", "import"] },
          ],
          wrong: [["favourably", "import"]],
          explanation: "The export index fell from 121 to 99 (about 18%) while the import index was unchanged at 110.",
        }),
        P.manual({
          label: "(e)", marks: 2,
          stem: "Explain what the terms of trade figure for 2026 means for Country V.",
          points: ["90 means export prices are 10% lower relative to import prices than in 2022.", "So Country V must export about 11% more (100 ÷ 90) to buy the same quantity of imports as in 2022."],
          modelAnswer: "A figure of 90 means that, compared with 2022, export prices have fallen by 10% relative to import prices. A given quantity of gold, platinum and tobacco now buys only 90% of the imports it bought in 2022, so the country must export about 11% more (100 ÷ 90 = 1.11) to buy the same fuel, fertiliser and machinery.",
          explanation: "Interpret the index against the base year.",
        }),
        P.manual({
          label: "(f)", marks: 4, levels: LV(4),
          stem: "Discuss whether Country V should try to reduce its dependence on exports of minerals and tobacco.",
          points: [
            "For: primary product prices are volatile (shown by the fall after 2024); diversification into processed or manufactured goods stabilises export earnings and the terms of trade; adds value and jobs.",
            "For: reduces risk of foreign currency shortages and current account deficits when prices fall.",
            "Against: minerals and tobacco are where its comparative advantage lies; new industries need capital, skills and power and face foreign competition; prices may recover (they were high in 2024).",
            "Justified conclusion, e.g. gradual diversification, starting with processing its own minerals and crops.",
          ],
          modelAnswer: "The data show how risky it is to rely on minerals and tobacco: when gold and platinum prices fell after 2024, the terms of trade fell by about 18% in two years, so the country earned less foreign currency for the same exports. Diversifying into processed minerals or manufactured goods would make export earnings more stable and add value and jobs at home. On the other hand, minerals and tobacco are where Country V has a comparative advantage; new industries need capital, skills and reliable electricity, and they face strong foreign competition. Prices of primary goods also recover in good years, as in 2024. Country V should diversify gradually, beginning by processing its own minerals and crops, while continuing to export the products in which it is most efficient.",
          explanation: "Volatility and value added versus comparative advantage and costs of diversifying; conclude.",
        }),
      ],
      hints: ["Calculate each year's terms of trade from the two indices.", "A fall in the index is an unfavourable movement."],
      explanation: `Terms of trade: 2022 100.0, 2023 ${fmt(tot[1], 1)}, 2024 ${fmt(tot[2], 1)}, 2025 ${fmt(tot[3], 1)}, 2026 ${fmt(tot[4], 1)}; a fall of ${fmt(-ch, 1)}% from 2024 to 2026.`,
    });
  }

  b.card("FORMULA", "Terms of trade = ?", "Index of export prices ÷ index of import prices × 100");
  b.card("DEFINITION", "Define the **terms of trade**.", "The ratio of the average price of a country's exports to the average price of its imports, as an index.");
  b.card("CONCEPT", "What is a **favourable** movement in the terms of trade?", "A rise in the index: export prices rise relative to import prices, so a given quantity of exports buys more imports.");
  b.card("CONCEPT", "What is an **unfavourable** movement in the terms of trade?", "A fall in the index: import prices rise relative to export prices, so more exports are needed for the same imports.");
  b.card("FACT", "Export prices rise by 5% and import prices by 10%. Do the terms of trade improve?", "No. They fall (105 ÷ 110 × 100 = 95.5): an unfavourable movement.");
  b.card("CONCEPT", "Terms of trade versus balance of trade?", "Terms of trade compare export and import PRICES (an index); the balance of trade compares the VALUES of visible exports and imports.");
  b.card("CONCEPT", "Give three causes of changes in the terms of trade.", "World demand and supply of exports (commodity prices); world prices of imports such as fuel; relative inflation; exchange rate changes.");
  b.card("FACT", "When can a favourable movement harm a country?", "When it comes from higher export prices (e.g. inflation) and demand for exports is price elastic: export earnings fall.");
});
