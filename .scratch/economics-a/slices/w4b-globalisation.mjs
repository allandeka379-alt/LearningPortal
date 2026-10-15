// W4b: globalisation (Cambridge A Level only; free preview lesson).
import { concept, P, chk, table, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.globalisation", { file: "dev/globalisation", keyPrefix: "dev.globalisation" }, (b) => {
  mc(b, [2, "RECALL"], "Globalisation is best described as",
    ["growing integration of economies through flows of goods and capital", "Correct: wider than trade alone."],
    [["a rise in tariffs and quotas between trading countries", "That is protection, the opposite of globalisation."],
     ["the growth of a country's own domestic market only, without trade", "Globalisation concerns links between countries."],
     ["an agreement between two countries to trade freely", "That is a bilateral trade agreement."]],
    "Globalisation covers trade, finance, investment, technology and migration.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which is a cause of globalisation?",
    ["A fall in transport and communication costs", "Correct: it makes international production and trade cheaper."],
    [["A rise in tariffs and quotas on imports", "That reduces trade."],
     ["The introduction of controls on capital flows", "That reduces capital mobility."],
     ["A decline in the number of multinational companies", "MNCs drive globalisation."]],
    "Lower transport and communication costs make trade and production abroad more profitable.", { daily: true });

  mc(b, [3, "UNDERSTANDING"], "A multinational company that locates each stage of production where costs are lowest is an example of",
    ["the global organisation of production and spread of technology", "Correct: MNCs link economies."],
    [["a protectionist policy to shield home firms", "It is a business strategy, not a trade barrier."],
     ["a monopoly that sells only in its home market", "MNCs operate across countries."],
     ["a decline in capital flows and technology transfer between rich countries", "MNCs increase flows."]],
    "MNCs are both a cause and an agent of globalisation.", { hints: ["How does an MNC link several economies?"] });

  {
    const o = (2400 + 2600) / 8000 * 100; chk(o, 62.5);
    mc(b, [3, "APPLICATION"], "A country has exports of US\\$2,400 million, imports of US\\$2,600 million and GDP of US\\$8,000 million. Its trade openness (exports plus imports as a percentage of GDP) is",
      ["62.5%", "Correct: 5,000 ÷ 8,000 × 100."],
      [["2.5%", "That is the trade deficit as a percentage of GDP."],
       ["30.0%", "That uses exports alone."],
       ["32.5%", "That uses imports alone."]],
      "(2,400 + 2,600) ÷ 8,000 × 100 = 62.5%.", { hints: ["Add exports and imports before dividing."] });
  }

  mc(b, [3, "ANALYSIS"], "Which is a likely effect of globalisation on workers in a high-income country's labour-intensive manufacturing industry?",
    ["Job losses or wage pressure as production moves abroad", "Correct: offshoring and import competition."],
    [["Higher wages for all workers because of larger markets", "Gains are unevenly shared."],
     ["No effect, because wages are set by governments", "Competition affects wages and jobs."],
     ["A fall in the quantity of imports from abroad", "Imports typically rise."]],
    "Low-skilled workers in industries facing import competition may lose jobs or face lower wages.", { hints: ["Who faces competition from lower-cost producers?"] });

  mc(b, [3, "ANALYSIS"], "Which is an argument that globalisation may harm the environment?",
    ["More transport and production raise emissions and resource use", "Correct: rising volumes of trade and output."],
    [["Cleaner technology spreads more quickly", "That is a possible benefit."],
     ["Countries become richer and can afford environmental protection", "That is a possible benefit."],
     ["Imports replace production from polluting domestic firms", "That could reduce domestic pollution."]],
    "Higher volumes of transport and output increase emissions unless offset by cleaner methods.", { hints: ["What happens to the volume of freight and production?"] });

  mc(b, [4, "EVALUATION"], "A developing country that relies on exports of one raw material joins fully in global markets. Which is the most likely risk?",
    ["Exposure to a fall in the price of the raw material", "Correct: volatile prices of primary products."],
    [["Loss of all the benefits of specialisation and trade", "Specialisation still has benefits."],
     ["An end to all foreign investment in the country", "FDI is more likely."],
     ["A guarantee of stable export earnings each year", "Prices of raw materials fluctuate."]],
    "Dependence on one primary product leaves earnings exposed to world price changes.", { hints: ["How stable are the prices of raw materials?"] });

  mc(b, [3, "UNDERSTANDING"], "Trade liberalisation contributes to globalisation by",
    ["reducing tariffs and quotas on imports and exports", "Correct: it lowers barriers."],
    [["raising the cost of exporting to foreign markets", "That would reduce trade."],
     ["banning foreign investment in home industries", "That would reduce globalisation."],
     ["fixing the quantity of each good traded", "That describes quotas, a barrier."]],
    "Liberalisation lowers barriers to trade.", { hints: ["What happens to barriers to trade?"] });

  {
    const o = (2400 + 2600) / 8000 * 100; chk(o, 62.5);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: o, unit: "%", daily: true,
      stem: "A country has exports of US\\$2,400 million, imports of US\\$2,600 million and GDP of US\\$8,000 million. Calculate trade openness, (exports + imports) ÷ GDP × 100, to one decimal place.",
      wrong: [30, 2.5, 32.5], explanation: "(2,400 + 2,600) ÷ 8,000 × 100 = 62.5%." });
    const d1 = 80 + 20, d2 = 80 + 0.6 * 20; chk(d2, 92);
    const pc = (d2 - d1) / d1 * 100; chk(roundTo(pc, 6), -8);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: roundTo(pc, 6), unit: "%", hints: ["Delivered price = factory price + transport cost."],
      stem: "A good costs US\\$80 at the factory and US\\$20 to transport to the buyer, so the delivered price is US\\$100. Transport costs fall by 40%. Calculate the percentage change in the delivered price (a fall is negative), to one decimal place.",
      wrong: [-40, -12, -20], explanation: "New transport cost = 0.6 × 20 = 12; new price = 92; change = (92 − 100) ÷ 100 × 100 = −8.0%." });
    const u1 = 12 / 6, u2 = 3 / 4; chk(u1, 2); chk(u2, 0.75);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: u2, dp: 2, hints: ["Labour cost per unit = wage per hour ÷ units per hour."],
      stem: "In a lower-cost country, workers are paid US\\$3 an hour and produce 4 units an hour. Calculate the labour cost per unit, in US\\$ to two decimal places.",
      wrong: [1.33, 12, 7], explanation: "3 ÷ 4 = US\\$0.75 per unit." });
    const pp = (62.5 - 40); chk(pp, 22.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: pp, unit: "percentage points", dp: 1, hints: ["Subtract the two openness figures."],
      stem: "Trade openness rises from 40% to 62.5% of GDP. Calculate the change in openness, in percentage points.",
      wrong: [56.25, 22, 1.5625], explanation: "62.5 − 40 = 22.5 percentage points. (The percentage change would be 22.5 ÷ 40 × 100 = 56.25%.)" });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "Globalisation refers only to the growth of international trade in goods.",
    explanation: "It also includes flows of capital, technology, information, services and people." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each cause of globalisation with its effect.",
    pairs: [["Containerisation and cheaper freight", "Lower costs of moving goods between countries"], ["The internet and mobile phones", "Easier coordination and sale of goods and services across borders"], ["WTO tariff reductions", "Lower barriers to trade"], ["Multinational companies", "Production spread across several countries"]],
    explanation: "Each cause lowers costs or barriers or organises production internationally." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Moving production from a high-cost country to a lower-cost country is called {{blank:a}}. Trade openness is calculated as exports plus imports divided by {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["offshoring"], choices: ["offshoring", "outsourcing at home", "devaluation"] }, { id: "b", accepted: ["GDP"], choices: ["GDP", "exports", "population"] }],
    explanation: "Offshoring relocates production abroad; openness = (X + M) ÷ GDP × 100." });

  b.short({ d: 2, skill: "RECALL", stem: "What type of company organises production in several countries and is an important agent of globalisation?",
    accepted: ["multinational company", "multinational", "multinational corporation", "mnc", "a multinational company", "transnational company", "multinational enterprise"], wrong: ["monopoly"],
    explanation: "A multinational company." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define globalisation.",
    points: ["The growing integration of national economies", "through increasing flows of trade, capital, technology, information and people across borders"],
    modelAnswer: "Globalisation is the growing integration of national economies through increasing flows of goods, services, capital, technology, information and people across borders.",
    explanation: "Integration through cross-border flows." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Show the mechanism from cause to effect."],
    stem: "Explain two causes of globalisation.",
    points: ["Falling transport costs (containers, air freight) reduce the cost of moving goods.", "So it is profitable to trade and produce far from the final consumer.", "Trade liberalisation removes tariffs and quotas.", "So imports and exports are cheaper and trade grows (also: technology, capital mobility, MNCs)."],
    modelAnswer: "Falling transport costs, through containerisation and cheaper air freight, reduce the cost of moving goods, so it becomes profitable to trade and to produce far from the final consumer. Trade liberalisation removes tariffs and quotas, which makes imports and exports cheaper and increases trade.",
    explanation: "Two causes explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider both the gains and the unevenness of the gains."],
    stem: "Analyse how globalisation may affect inequality within a developing country.",
    points: ["Export industries and MNCs create jobs and raise wages for skilled and urban workers.", "Workers with skills gain more than unskilled workers.", "Rural and informal workers may gain little.", "Local firms may lose out to imports.", "So the gap between rich and poor, and between regions, may widen unless policy spreads the gains."],
    modelAnswer: "Export industries and multinational companies create jobs and raise wages, but mainly for skilled and urban workers, so those with skills gain more than unskilled workers. Rural and informal workers may gain little, and local firms may lose out to imports, so the gap between rich and poor and between regions may widen unless policy spreads the gains.",
    explanation: "Uneven gains widen inequality." });

  {
    const x1 = [900, 1100, 5000], x2 = [2400, 2600, 8000];
    const o1 = (x1[0] + x1[1]) / x1[2] * 100, o2 = (x2[0] + x2[1]) / x2[2] * 100; chk(o1, 40); chk(o2, 62.5);
    const t1 = table(["", "Year 1 (US\\$ million)", "Year 10 (US\\$ million)"], [["Exports", 900, 2400], ["Imports", 1100, 2600], ["GDP", 5000, 8000]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Openness = (exports + imports) ÷ GDP × 100."],
      stem: "**Tamba and the world economy (fictional, illustrative)**\n\nOver ten years Tamba reduced its tariffs, attracted foreign investment in manufacturing and improved its ports. Data are shown below.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: o1, unit: "%", stem: "Calculate trade openness in year 1, to one decimal place.", wrong: [18, 22, 4], explanation: "(900 + 1,100) ÷ 5,000 × 100 = 40.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: o2, unit: "%", stem: "Calculate trade openness in year 10, to one decimal place.", wrong: [30, 32.5, 2.5], explanation: "(2,400 + 2,600) ÷ 8,000 × 100 = 62.5%." }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: o2 - o1, unit: "percentage points", dp: 1, stem: "Calculate the change in openness, in percentage points.", wrong: [56.25, 22, 1.56], explanation: "62.5 − 40.0 = 22.5 percentage points." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how lower tariffs and improved ports contributed to the rise in Tamba's openness.",
          points: ["Lower tariffs reduce the price of imports and the cost of imported inputs.", "Better ports reduce the cost and time of moving goods.", "Lower costs of trading raise imports and exports, so trade grows faster than GDP."],
          modelAnswer: "Lower tariffs reduce the price of imports and of imported inputs, and improved ports reduce the cost and time of moving goods. Lower costs of trading raise both imports and exports, so trade grows faster than GDP and openness rises." }),
      ],
      explanation: "Openness 40.0% then 62.5%, up 22.5 percentage points; lower trading costs raise trade." });
  }
  {
    const uA = 14 / 7, uB = 4 / 2.5; chk(uA, 2); chk(uB, 1.6);
    const delivered = uB + 0.30; chk(roundTo(delivered, 6), 1.9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Labour cost per unit = wage ÷ output per hour.", "Add the transport cost to the labour cost per unit."],
      stem: "**An offshoring decision (fictional, illustrative)**\n\nA clothing firm in Country A pays workers US\\$14 an hour, and each worker produces 7 garments an hour. The firm is considering moving its production to Country B, where workers are paid US\\$4 an hour and produce 2.5 garments an hour because the equipment is older and power cuts are frequent. Shipping the garments back to Country A would cost US\\$0.30 per garment. About 400 workers in Country A would lose their jobs, but Country B would gain 900 jobs.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: uA, dp: 2, stem: "Calculate the labour cost per garment in Country A, in US\\$.", wrong: [98, 0.5, 7], explanation: "14 ÷ 7 = US\\$2.00." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: uB, dp: 2, stem: "Calculate the labour cost per garment in Country B, in US\\$.", wrong: [10, 0.625, 1], explanation: "4 ÷ 2.5 = US\\$1.60." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: uA - delivered, dp: 2, stem: "Calculate the saving per garment from moving to Country B, after paying the shipping cost, in US\\$.", wrong: [0.4, 0.3, 0.7], explanation: "Country B cost = 1.60 + 0.30 = US\\$1.90; saving = 2.00 − 1.90 = US\\$0.10 per garment." }),
        P.manual({ label: "(d)", marks: 2, stem: "State two factors other than labour cost that the firm should consider before moving.",
          points: ["Quality and reliability of power and infrastructure (power cuts could cause delays).", "Skills of workers, political and exchange rate risks, or the costs of closing the plant in Country A."],
          modelAnswer: "The firm should consider the quality and reliability of power and infrastructure in Country B, since power cuts could cause delays, and the skills of workers, political and exchange rate risks, or the cost of closing the plant in Country A." }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess the effects of the move on Country A and Country B.",
          points: ["Country A: 400 workers lose their jobs; structural unemployment unless retrained; lower clothing prices for consumers.", "The firm gains only US\\$0.10 per garment, a small saving that could be removed by higher wages or a currency change.", "Country B gains 900 jobs, incomes, skills and technology transfer.", "Risks for B: dependence on the firm, low wages and possible poor conditions.", "Gains and losses are uneven; retraining policies matter.", "Judgement."],
          modelAnswer: "In Country A 400 workers lose their jobs, which is a loss of income and may lead to long-term unemployment if they cannot retrain, although consumers may gain from lower prices. The saving to the firm is only US\\$0.10 per garment, so a small rise in wages or a change in the exchange rate could remove it. Country B gains 900 jobs, higher incomes and possibly skills and technology, but it also risks dependence on the firm and poor working conditions. The gains and losses are unevenly shared, and the overall effect depends on whether workers in Country A can be retrained and whether Country B develops its own capabilities. On balance Country B gains more, while Country A's losses fall on a small group and could be reduced by support." }),
      ],
      explanation: "Labour cost per garment 2.00 in A and 1.60 in B; saving US\\$0.10 after shipping; assess effects on both countries." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Distinguish gains and losses by group and think about policy."],
    stem: "Assess whether globalisation has been beneficial for developing countries.",
    points: ["Access to larger export markets and growth in trade.", "Inflows of foreign investment, technology and skills.", "Cheaper imports and wider choice for consumers.", "Dependence on a narrow range of exports and MNCs; exposure to world price falls and financial shocks.", "Gains concentrated among skilled and urban groups; local firms may not compete.", "Unequal bargaining power and environmental pressure.", "Outcomes depend on policy, institutions and investment in skills.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Globalisation gives developing countries access to larger export markets, foreign investment, technology and cheaper imports, and several countries that opened to trade and investment have grown quickly. However, countries that depend on a narrow range of exports are exposed to falls in world prices and to financial shocks, the gains are often concentrated among skilled and urban workers, local firms may not be able to compete, and bargaining power with multinational companies is unequal. Environmental pressures may also rise. Overall globalisation has benefited developing countries most where they have diversified, invested in skills and infrastructure, and have good institutions, and least where they rely on a few raw materials.",
    explanation: "Weigh market access, investment and technology against dependence, shocks and uneven gains." });

  b.card("DEFINITION", "Define **globalisation**.", "The growing integration of economies through flows of goods, services, capital, technology, information and people across borders.");
  b.card("FORMULA", "Trade openness?", "(Exports + imports) ÷ GDP × 100.");
  b.card("CONCEPT", "Name four causes of globalisation.", "Technology and communications, lower transport costs, trade liberalisation, capital mobility (and MNCs).");
  b.card("DEFINITION", "Define **offshoring**.", "Relocating production or services to another country, usually to cut costs.");
  b.card("CONCEPT", "Who gains from globalisation?", "Consumers (lower prices), export industries, skilled workers and countries with good institutions.");
  b.card("CONCEPT", "Who may lose from globalisation?", "Low-skilled workers in industries facing import competition or offshoring, and countries dependent on a few raw materials.");
  b.card("CONCEPT", "Environmental arguments about globalisation?", "More transport and output raise emissions; technology transfer and higher incomes may help protection.");
  b.card("CONCEPT", "Why can globalisation raise inequality within a country?", "Gains go mainly to skilled, urban and export-oriented workers and owners.");
  b.card("CONCEPT", "How can a country limit the risks of globalisation?", "Diversify exports, invest in skills and infrastructure, strengthen institutions and support displaced workers.");
});
