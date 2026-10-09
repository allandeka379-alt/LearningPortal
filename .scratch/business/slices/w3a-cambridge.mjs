// W3a: Cambridge 0264 Paper 1 exam-format item: 1 × 20-mark question on stimulus material
// ((a) 2 + (b) 4 + (c) 6 + (d) 8). Mark split within parts is ours.
import { concept, P, f, money, fmt, round, table, CAM } from "../lib.mjs";

concept("bus.marketing.market-changes", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  const s24 = 84000, m24 = 600000, s25 = 99000, m25 = 900000;
  const ms24 = f.marketShare(s24, m24), ms25 = f.marketShare(s25, m25);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, calculator: true, paper: "Paper 1",
    concepts: ["bus.marketing.market-changes", "bus.marketing.segmentation", "bus.marketing.mass-niche"],
    stem: `Zuva Lamps (ZL) is a private limited company in Harare that makes one standard solar lamp sold through hardware shops across Zimbabwe. Many households want lighting during power cuts, and several new local and imported brands have entered the market. ZL's marketing director wants to segment the market: a cheap lamp for low-income rural households, a lamp with a phone charger for young urban customers, and a large lamp for small shops and market stalls.\n\n${table(["", "2024", "2025"], [["ZL sales US\\$", s24, s25], ["Total market sales US\\$", m24, m25]], { title: "Solar lamp market data" })}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify **two** bases of segmentation in the marketing director's plan.",
        template: "The cheap lamp for low-income households segments by {{blank:a}}. The lamp for rural households and the lamp for urban customers also segment by {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["income"], choices: ["income", "gender", "religion", "interests"] },
          { id: "b", accepted: ["location"], choices: ["location", "gender", "religion", "interests"] },
        ],
      }),
      P.num({
        label: "(b)", marks: 4, kind: "plain", value: ms24 - ms25, dp: 1, type: "CALCULATION",
        stem: "Calculate the change in ZL's market share between 2024 and 2025, in percentage points. Give the size of the fall.",
        wrong: [round(((s25 - s24) / s24) * 100, 1), round(ms25, 1)],
        explanation: `2024: ${fmt(s24)} ÷ ${fmt(m24)} × 100 = ${round(ms24, 1)}%. 2025: ${fmt(s25)} ÷ ${fmt(m25)} × 100 = ${round(ms25, 1)}%. Fall = ${round(ms24 - ms25, 1)} percentage points.`,
        workedSolution: `1. Market share = sales of the business ÷ total market sales × 100.
2. 2024: ${fmt(s24)} ÷ ${fmt(m24)} × 100 = ${round(ms24, 1)}%.
3. 2025: ${fmt(s25)} ÷ ${fmt(m25)} × 100 = ${round(ms25, 1)}%.
4. Fall = ${round(ms24, 1)} − ${round(ms25, 1)} = ${round(ms24 - ms25, 1)} percentage points.`,
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **two** reasons why the solar lamp market has become more competitive and how this has affected ZL.",
        points: [
          "Reason 1: new local brands entered, attracted by growing demand (1)",
          "Reason 2: imported brands / globalisation / customers compare prices online (1)",
          "Effect: customers have more choice and switch (1)",
          "Applied: ZL's market share fell from 14% to 11% despite higher sales (1)",
          "Effect: pressure on price / profit margins (1)",
          "Applied: sales still rose because the whole market grew (1)",
        ],
        modelAnswer: "Demand for lighting during power cuts has grown, which attracted new local brands, and imported brands have also entered, so customers have more choice. As a result ZL's market share fell from 14% to 11% even though its sales rose, and ZL faces pressure to cut prices, reducing its profit margin.",
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Should ZL continue to sell one standard lamp to the whole market or segment the market as the marketing director suggests? Justify your answer.",
        points: [
          "One standard lamp: economies of scale, low cost per unit (1)",
          "One standard lamp: but competes head-on with many brands; share already falling (uses data) (1)",
          "Segmenting: products meet different needs (rural low-income, young urban, shops) (1)",
          "Segmenting: targeted promotion and pricing; higher prices for charger and large lamps (1)",
          "Segmenting: may win back share in a growing market (1)",
          "Segmenting: costs of research, design, three product lines; fewer economies of scale (1)",
          "Segmenting: risk if a segment is too small / rivals copy (1)",
          "Justified recommendation (1)",
        ],
        levels: [[3, 6, 8, "Well-developed, balanced arguments applied to ZL and its data, with a justified recommendation."], [2, 3, 5, "Some developed arguments applied to the case; limited judgement."], [1, 1, 2, "Simple points, little application, no judgement."]],
        modelAnswer: "Selling one standard lamp gives ZL economies of scale and a low cost per lamp. However, ZL is competing directly with many new brands and its market share has already fallen from 14% to 11%. Segmenting would let ZL meet different needs: a cheap lamp for low-income rural households, a lamp with a phone charger that young urban customers may pay more for, and a large lamp for shops and stalls. Each could be priced and promoted for its group, helping ZL win back share in a growing market. Against this, three product lines need research, new designs and more stock, and smaller production runs raise unit costs; some segments may be too small. Because the market is growing fast while ZL's share is falling, ZL should segment the market, starting with the phone-charger lamp, which is most different from rivals' products, while keeping its standard lamp for the rural segment.",
      }),
    ],
    explanation: `Bases: income and location. Market share fell from ${round(ms24, 1)}% to ${round(ms25, 1)}% although sales rose from ${money(s24)} to ${money(s25)}. Segmentation trades economies of scale for products that meet each group's needs.`,
    hints: ["(a) Who is each lamp aimed at?", "(b) Work out both market shares first, then subtract.", "(d) Use the market-share data in your answer."],
  });
});
