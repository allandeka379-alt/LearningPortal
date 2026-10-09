// W4b: econ.forex.shortages (ZIMSEC only) — causes and problems of foreign exchange shortages and the possible sources
// of foreign currency for Zimbabwe. No disputed statistics; fictional data only. Figures differ from the lesson.
import { concept, P, table, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.forex.shortages", { file: "forex/shortages", keyPrefix: "forex.shortages" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A foreign currency shortage occurs when",
    options: [
      ["the demand for foreign currency is greater than the supply available", "Correct."],
      ["a country's exports are greater than its imports", "That would usually create a surplus of foreign currency."],
      ["the central bank holds more reserves than it needs", "That is the opposite of a shortage."],
      ["the government spends more than it collects in taxes each year", "That is a budget deficit."],
    ],
    answer: "A",
    explanation: "A shortage means the country needs more foreign currency (for imports, debts and other payments) than it earns or receives.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is a source of foreign currency for Zimbabwe?",
    options: [
      ["Money sent home by Zimbabweans working abroad", "Correct: remittances bring in foreign currency."],
      ["Imports of fuel from other countries", "Imports use up foreign currency."],
      ["Profits sent abroad by foreign-owned mines", "These are outflows of foreign currency."],
      ["Interest paid on foreign loans", "Interest payments are outflows."],
    ],
    answer: "A",
    explanation: "Remittances from the diaspora are an inflow; imports, profit outflows and interest payments use foreign currency.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How can a severe drought cause a foreign currency shortage in Zimbabwe?",
    options: [
      ["It cuts farm exports and increases imports of food", "Correct: inflows fall and outflows rise."],
      ["It raises the world price of fuel imports", "A local drought does not set world fuel prices."],
      ["It increases the number of foreign tourists", "Drought does not usually attract tourists."],
      ["It reduces the country's need to import goods", "It increases the need to import food."],
    ],
    answer: "A",
    explanation: "Lower harvests of tobacco, cotton and maize reduce exports, while grain must be imported, so the gap between inflows and outflows widens.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a shortage of foreign currency often lead to **inflation**?",
    options: [
      ["Imported goods and inputs become scarce and dearer, raising costs and prices", "Correct: a cost-push effect."],
      ["Firms are able to import more raw materials than before", "A shortage means they can import less."],
      ["The supply of goods in the shops increases", "Supply falls when imports are scarce."],
      ["Consumers spend less on local goods, so demand-pull inflation rises sharply", "Lower spending would reduce, not raise, demand-pull inflation."],
    ],
    answer: "A",
    hints: ["Think about the cost of imported fuel and raw materials."],
    explanation: "When foreign currency is scarce, imports are scarce and their local price rises (often at the parallel market rate), pushing up costs and prices.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is a **parallel market** for foreign currency?",
    options: [
      ["An unofficial market where currency is traded, often above the official rate", "Correct."],
      ["A market in which two banks set the same exchange rate", "This is not the meaning of a parallel market."],
      ["The stock market where foreign firms' shares are sold", "That is a stock exchange."],
      ["A market for exports that runs alongside the market for imports of goods", "This is not the meaning of a parallel market."],
    ],
    answer: "A",
    hints: ["What happens when official supplies of foreign currency are short?"],
    explanation: "When official supplies are short, people buy and sell foreign currency unofficially at higher rates.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure is most likely to reduce Zimbabwe's foreign currency shortages **in the long run**?",
    options: [
      ["Diversifying and adding value to exports", "Correct: builds lasting, more stable foreign currency earnings."],
      ["Borrowing more foreign currency from abroad every year", "Loans must be repaid with interest, adding to future outflows."],
      ["Printing more of the local currency", "Printing local currency does not create foreign currency and may cause inflation."],
      ["Encouraging people to hold savings outside the banking system", "This reduces foreign currency available to the official system."],
    ],
    answer: "A",
    hints: ["Which option increases earnings rather than borrowing?"],
    explanation: "Lasting solutions raise earnings: more varied and processed exports, tourism and investment. Borrowing is a short-term fix that adds future repayments.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Foreign investors fear that they will not be able to send their profits home because of a foreign currency shortage. What is the most likely result?",
    options: [
      ["Foreign direct investment falls, reducing future inflows", "Correct: the shortage discourages investment, which worsens the shortage."],
      ["Foreign direct investment rises because profits are higher", "Investors are deterred by the risk, not attracted."],
      ["Exports rise immediately", "Less investment does not raise exports."],
      ["The shortage ends because investors keep profits in the country", "Investors are more likely not to invest at all."],
    ],
    answer: "A",
    hints: ["Would you invest if you could not take your profits home?"],
    explanation: "Shortages create a vicious circle: lower investment means fewer future exports and inflows.",
  });

  // Numericals.
  {
    const src = [["Gold and platinum exports", 2400], ["Tobacco exports", 900], ["Remittances", 750], ["Tourism", 450]];
    const tot = src.reduce((s, x) => s + x[1], 0), need = 5100, gap = need - tot;
    check("tot", tot, 4500); check("gap", gap, 600);
    const T = table(["Source", "Inflow (US\\$ million)"], src);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: gap, daily: true,
      stem: `A fictional country's foreign currency inflows are shown below.\n\n${T}\n\nIt needs US\\$${fmt(need)} million a year for imports and debt payments. Calculate the size of its foreign currency gap, in US\\$ million.`,
      wrong: [need, tot],
      explanation: `Total inflows = ${src.map((x) => fmt(x[1])).join(" + ")} = ${fmt(tot)}. Gap = ${fmt(need)} − ${fmt(tot)} = **US\\$${gap} million**.`,
    });
    const sh = (2400 / tot) * 100;
    check("sh", sh, 53.333, 0.001);
    const need2 = 6200, tot2 = 5500, gap2 = need2 - tot2, tob2 = 1200, tobFall = 0.25 * tob2, newGap = gap2 + tobFall;
    check("newGap", newGap, 1000);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: newGap,
      stem: `A different fictional country needs US\\$${fmt(need2)} million a year and currently receives US\\$${fmt(tot2)} million, of which US\\$${fmt(tob2)} million comes from tobacco exports. A drought cuts tobacco export earnings by 25%, while other inflows and its needs are unchanged. Calculate the new foreign currency gap, in US\\$ million.`,
      wrong: [tobFall, gap2],
      hints: ["Find the fall in tobacco earnings.", "Add it to the existing gap."],
      explanation: `1. Existing gap = ${fmt(need2)} − ${fmt(tot2)} = ${gap2}.\n2. Fall in tobacco earnings = 25% × ${fmt(tob2)} = ${tobFall}.\n3. New gap = ${gap2} + ${tobFall} = **US\\$${fmt(newGap)} million**.`,
    });
  }
  {
    const off = 25, par = 32, prem = ((par - off) / off) * 100;
    check("prem", prem, 28);
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: prem,
      stem: `In a fictional country the official exchange rate is US\\$1 = ${off} mali, but on the parallel market US\\$1 sells for ${par} mali. Calculate the parallel market premium as a percentage of the official rate. Give your answer to one decimal place.`,
      wrong: [((par - off) / par) * 100, par - off],
      hints: ["Premium = (parallel rate − official rate) ÷ official rate × 100."],
      explanation: `(${par} − ${off}) ÷ ${off} × 100 = **${pct(prem, 1)}**. A large premium shows that official supplies of foreign currency are short.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Tourism is a source of foreign currency for Zimbabwe.",
    answer: true,
    explanation: "True. Foreign tourists pay for hotels, tours and transport with foreign currency.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Borrowing from abroad permanently solves a foreign currency shortage.",
    answer: false,
    explanation: "False. Loans bring foreign currency now but must be repaid with interest, adding to future outflows.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each item as an inflow or an outflow of foreign currency for Zimbabwe.",
    pairs: ["Sales of tobacco to foreign buyers", "Imports of diesel", "Remittances from the diaspora", "Repayment of a foreign loan", "Spending by foreign tourists"],
    right: ["Inflow", "Outflow"],
    rightIndex: [0, 1, 0, 1, 0],
    explanation: "Exports, remittances and tourism bring foreign currency in; imports and debt repayments send it out.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When foreign currency is scarce, factories that use imported raw materials {{blank:a}} production, and the price of foreign currency on the parallel market {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cut"], choices: ["cut", "increase"] },
      { id: "b", accepted: ["rises"], choices: ["rises", "falls"] },
    ],
    wrong: [["increase", "falls"]],
    hints: ["Scarcity raises price."],
    explanation: "Without foreign currency, firms cannot import inputs, so output falls; excess demand pushes up the parallel market rate.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline **two** problems caused by foreign currency shortages.",
    points: [
      "Shortages of imported goods such as fuel and medicines…",
      "…cause queues, rationing and higher prices.",
      "Factories cannot import raw materials / inflation / difficulty repaying debts / lower investment…",
      "…developed, e.g. output and jobs fall.",
    ],
    modelAnswer: "First, imported goods such as fuel, medicines and spare parts become scarce, causing queues, rationing and higher prices. Second, factories that depend on imported raw materials and machinery cannot obtain them, so they cut production and lay off workers.",
    hints: ["Think about goods in the shops and firms' production."],
    explanation: "Two marks per problem.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** possible sources of foreign currency for Zimbabwe other than mineral exports.",
    points: [
      "Farm exports such as tobacco, cotton, horticulture…",
      "…sold to foreign buyers who pay in foreign currency.",
      "Tourism / remittances / foreign direct investment / loans and grants…",
      "…developed, e.g. visitors to Victoria Falls pay in foreign currency.",
    ],
    modelAnswer: "First, farm exports such as tobacco, cotton, flowers and citrus are sold to foreign buyers, who pay in foreign currency. Second, tourism brings in foreign currency when visitors to Victoria Falls, Hwange and Great Zimbabwe pay for hotels, tours and transport; remittances from Zimbabweans abroad are another important source.",
    hints: ["Think about farming, tourism and the diaspora."],
    explanation: "Two marks per source.",
  });

  // Structured 1 (8 marks).
  {
    const src = [["Mineral exports", 2600, 2080], ["Farm exports", 1100, 1210], ["Remittances", 900, 950], ["Tourism", 200, 260]];
    const t0 = src.reduce((s, x) => s + x[1], 0), t1 = src.reduce((s, x) => s + x[2], 0);
    check("t0", t0, 4800); check("t1", t1, 4500);
    const minFall = ((2080 - 2600) / 2600) * 100;
    check("minFall", minFall, -20);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `The table shows the foreign currency inflows of Country Z, a fictional country (US\\$ million). It needs about US\\$5,000 million a year for imports and debt payments.\n\n${table(["Source", "2025", "2026"], src)}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: t1, stem: "Calculate total inflows in 2026, in US\\$ million.", wrong: [t0], explanation: `2,080 + 1,210 + 950 + 260 = ${fmt(t1)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: minFall, stem: "Calculate the percentage change in mineral export earnings between 2025 and 2026. Give a fall as a negative number, to one decimal place.", wrong: [-minFall, ((2080 - 2600) / 2080) * 100], explanation: `(2,080 − 2,600) ÷ 2,600 × 100 = ${fmt(minFall, 1)}%.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain what happened to Country Z's foreign currency shortage between 2025 and 2026.",
          points: [`Inflows fell from US$4,800m to US$4,500m, so the gap with the US$5,000m needed widened from US$200m to US$500m.`.replace(/US\$/g, "US\\$"), "Mainly because mineral earnings fell by 20%; other sources rose but not enough to offset it."],
          modelAnswer: "Total inflows fell from US\\$4,800 million to US\\$4,500 million, so the gap with the US\\$5,000 million needed widened from US\\$200 million to US\\$500 million. This was mainly because mineral earnings fell by 20%; farm exports, remittances and tourism rose, but not by enough to make up for it.",
          explanation: "Gap widened; cause.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether Country Z should rely on mineral exports as its main source of foreign currency.",
          points: [
            "For: minerals are its largest earner and comparative advantage; large earnings when prices are high.",
            "Against: earnings volatile (fell 20% in one year), worsening the shortage; finite resources; other sources (tourism, farm exports, remittances) grew.",
            "Justified conclusion, e.g. keep minerals but diversify and add value.",
          ],
          modelAnswer: "Minerals are Country Z's largest source of foreign currency and probably where it has a comparative advantage, so they will remain important. However, mineral earnings fell by 20% in one year and caused the shortage to widen, which shows how volatile they are, and minerals eventually run out. Farm exports, tourism and remittances all grew, so developing them, and processing minerals before export, would give more stable earnings. Country Z should not rely mainly on minerals; it should keep mining but diversify its sources of foreign currency.",
          explanation: "Importance versus volatility; conclude.",
        }),
      ],
      hints: ["Percentage change = change ÷ original × 100."],
      explanation: `Inflows fell from US\\$${fmt(t0)} million to US\\$${fmt(t1)} million; mineral earnings fell ${fmt(-minFall, 1)}%.`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "In a fictional country, fuel queues have returned and several factories have closed because they cannot obtain foreign currency to import raw materials. The price of US dollars on the parallel market is well above the official rate. The government is considering three options: borrowing from abroad, restricting imports of non-essential goods, or offering incentives to exporters and the tourism industry.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which evidence in the passage shows that official supplies of foreign currency are short?",
        options: [["The parallel market rate is well above the official rate", "Correct: excess demand pushes buyers to the unofficial market."], ["The government is considering three different policy options", "This is a response, not evidence."], ["Exporters may receive incentives", "This is a proposed policy."], ["Tourism is an industry in the country", "This says nothing about shortages."]],
        answer: "A",
        explanation: "A high parallel market premium shows that demand for foreign currency exceeds the official supply.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the shortage affects the country's factories and workers.",
        points: ["Factories cannot pay for imported raw materials and spare parts.", "So they cut output or close (as in the passage).", "Workers lose jobs and incomes; prices of local goods rise as supply falls."],
        modelAnswer: "Without foreign currency, factories cannot buy imported raw materials and spare parts, so they cut output or, as the passage says, close. Their workers lose their jobs and incomes, and as fewer goods are produced, prices rise for consumers.",
        explanation: "Inputs → output → jobs and prices.",
      }),
      P.manual({
        label: "(c)", marks: 8, levels: LV(8),
        stem: "Discuss which of the three options would best reduce the country's foreign currency shortage.",
        points: [
          "Borrowing: quick relief, allows fuel and raw material imports at once.",
          "Borrowing: adds to debt and future interest outflows; does not fix the cause; may be hard to obtain.",
          "Restricting non-essential imports: saves foreign currency for fuel, medicines and inputs quickly.",
          "Restricting imports: smuggling, less choice, higher prices, possible retaliation and parallel markets.",
          "Export and tourism incentives: raise lasting earnings; diversification; jobs.",
          "Incentives: slow to work; cost to government; depend on world demand and infrastructure.",
          "Combination/sequencing: short-term measures with long-term export growth.",
          "Justified conclusion.",
        ],
        modelAnswer: "Borrowing from abroad would bring foreign currency quickly, so fuel and raw materials could be imported at once and factories could reopen. But it adds to debt, and future interest and repayments will use up foreign currency, so it does not fix the cause and may be hard to obtain. Restricting non-essential imports would quickly save foreign currency for fuel, medicines and inputs, but it reduces choice, raises prices, encourages smuggling and may provoke retaliation. Incentives for exporters and tourism tackle the root cause by raising earnings and diversifying sources of foreign currency, creating jobs too, but they take time, cost the government money and depend on world demand and good infrastructure. The best option for lasting improvement is the export and tourism incentives, but because the shortage is urgent, the government may need a small, carefully used loan or temporary priority for essential imports while export earnings grow.",
        explanation: "Speed versus sustainability of each option; conclude.",
      }),
    ],
    hints: ["Separate quick fixes from measures that raise earnings.", "Consider the costs of each option."],
    explanation: "Borrowing and import restrictions act fast but do not raise earnings; export and tourism incentives are slower but lasting.",
  });

  b.card("DEFINITION", "What is a **foreign currency shortage**?", "When the demand for foreign currency (imports, debts, other payments) exceeds the supply available to the country.");
  b.card("DEFINITION", "What are **foreign currency reserves**?", "The stock of foreign currency held by the central bank (the Reserve Bank of Zimbabwe) to pay for imports and support the currency.");
  b.card("CONCEPT", "Give five causes of foreign currency shortages.", "Low export earnings (drought, falling prices); high import demand; debt repayments; profits sent abroad; capital flight; illegal outflows; overvalued official rate.");
  b.card("CONCEPT", "Give five problems caused by foreign currency shortages.", "Shortages of fuel and medicines; factory closures and job losses; inflation; parallel markets; debt problems; lower investment.");
  b.card("CONCEPT", "Name six sources of foreign currency for Zimbabwe.", "Mineral exports; farm exports (tobacco); tourism; remittances; foreign direct investment; loans and grants; processed exports to the region.");
  b.card("DEFINITION", "What is a **parallel market**?", "An unofficial market for foreign currency, usually at a rate above the official one, which appears when official supplies are short.");
  b.card("FACT", "Why is borrowing not a lasting solution to a foreign currency shortage?", "Loans must be repaid with interest, adding to future outflows of foreign currency.");
  b.card("CONCEPT", "Long-run solution to foreign currency shortages?", "Raise and diversify earnings: value-added and varied exports, tourism, attracting investment and remittances through official channels.");
});
