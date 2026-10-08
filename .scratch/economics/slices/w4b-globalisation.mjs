// W4b: econ.trade.globalisation (Cambridge only) — definition, causes of changes in globalisation and its effects on
// trade, competition, the environment, migration, income distribution and development. Figures differ from the lesson.
import { concept, P, table, fmt, pct, pctChange, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const openness = (x, m, gdp) => ((x + m) / gdp) * 100;

concept("econ.trade.globalisation", { file: "trade/globalisation", keyPrefix: "trade.globalisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of **globalisation**?",
    options: [
      ["The growing links between economies through trade, capital, people and technology", "Correct."],
      ["The government taking ownership of the largest firms in a country", "That is nationalisation."],
      ["A rise in the general level of prices across the world", "That is world inflation."],
      ["The growth of a country's population living in towns and cities", "That is urbanisation."],
    ],
    answer: "A",
    explanation: "Globalisation is the process by which economies become more closely connected through flows of goods, services, capital, people and information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change is most likely to **increase** globalisation?",
    options: [
      ["A fall in the cost of shipping goods between continents", "Correct: cheaper transport makes distant trade worthwhile."],
      ["A rise in tariffs on imported goods", "Higher barriers reduce trade."],
      ["A war that closes major shipping routes", "Disruption slows globalisation."],
      ["Stricter limits on foreign firms setting up factories", "This restricts the movement of MNCs."],
    ],
    answer: "A",
    explanation: "Lower transport costs, lower trade barriers and cheaper communication all encourage more international trade and investment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How has cheaper international communication contributed to globalisation?",
    options: [
      ["It lets firms manage production and sell services across many countries", "Correct: the internet and mobile phones allow coordination of global supply chains."],
      ["It has raised the cost of transporting goods by sea", "Communication costs do not raise shipping costs."],
      ["It has made tariffs on imports higher", "Tariffs are set by governments, not by communication costs."],
      ["It has reduced the number of multinational companies in the world", "It has helped MNCs to expand."],
    ],
    answer: "A",
    explanation: "Cheap communication allows firms to coordinate factories, suppliers and customers worldwide and to trade services such as software and call centres.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Many trained nurses leave a developing country to work abroad. Which effect of globalisation does this illustrate?",
    options: [
      ["Brain drain, partly offset by remittances sent home", "Correct: migration of skilled workers, with money sent back to families."],
      ["Dumping of goods below cost", "Dumping concerns goods, not workers."],
      ["An improvement in the country's terms of trade with other countries", "Migration does not directly change export and import prices."],
      ["A rise in tariff revenue", "Migration is not taxed at the border as a tariff."],
    ],
    answer: "A",
    hints: ["Which skills does the country lose, and what might it receive in return?"],
    explanation: "Emigration of skilled workers is a brain drain; the source country loses skills but gains remittances.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might globalisation **widen** income inequality within a developing country?",
    options: [
      ["Skilled workers and capital owners in export industries gain the most", "Correct: gains are unevenly shared."],
      ["Globalisation raises everyone's income by the same percentage", "Then inequality would not change."],
      ["Globalisation stops all international migration", "It usually increases migration."],
      ["Globalisation lowers the prices of goods bought by the poor", "This would tend to reduce inequality, not widen it."],
    ],
    answer: "A",
    hints: ["Who works in the industries that grow with trade?"],
    explanation: "Gains tend to go to those with skills, capital or jobs in export sectors; others may face competition from imports or be left out.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is the most likely effect of globalisation on **competition** in a country's domestic market?",
    options: [
      ["Competition increases as foreign firms and imports enter", "Correct."],
      ["Competition falls because only local firms can sell", "Globalisation opens markets to foreign firms."],
      ["Competition disappears because every firm becomes a monopoly", "More firms compete, not fewer."],
      ["Competition is unchanged because trade does not affect firms", "Imports compete directly with local firms."],
    ],
    answer: "A",
    hints: ["Who can now sell in the market?"],
    explanation: "Imports and foreign firms increase competition, lowering prices and pushing local firms to become more efficient, though some may close.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest **environmental** argument against increased globalisation?",
    options: [
      ["More long-distance transport and production raise carbon emissions and pollution", "Correct."],
      ["Globalisation spreads cleaner technologies such as solar panels", "This is an environmental benefit, not an argument against."],
      ["Globalisation reduces the total amount of goods produced", "It usually increases output."],
      ["Globalisation prevents countries from signing environmental agreements", "Countries still sign such agreements."],
    ],
    answer: "A",
    hints: ["Which option describes a cost to the environment?"],
    explanation: "Greater production and transport raise emissions and resource use, although globalisation can also spread cleaner technology.",
  });

  // Numericals.
  {
    const x = 18, m = 24, gdp = 120, o = openness(x, m, gdp);
    check("o", o, 35);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: o, daily: true,
      stem: `A fictional country's exports are US\\$${x} billion, its imports US\\$${m} billion and its GDP US\\$${gdp} billion. Calculate its trade openness, (exports + imports) ÷ GDP × 100. Give your answer to one decimal place.`,
      wrong: [((m - x) / gdp) * 100, (x / gdp) * 100],
      explanation: `(${x} + ${m}) ÷ ${gdp} × 100 = **${pct(o, 1)}**.`,
    });
  }
  {
    const c0 = 4800, c1 = 3000, ch = pctChange(c0, c1);
    check("ch", ch, -37.5);
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch,
      stem: `The cost of shipping a container from Asia to a port used by a fictional southern African country falls from US\\$${fmt(c0)} to US\\$${fmt(c1)}. Calculate the percentage change in the cost. Give a fall as a negative number, to one decimal place.`,
      wrong: [-ch, pctChange(c1, c0)],
      hints: ["Divide the change by the original cost."],
      explanation: `(${fmt(c1)} − ${fmt(c0)}) ÷ ${fmt(c0)} × 100 = **${fmt(ch, 1)}%**. Using the new cost as the base gives +${fmt(pctChange(c1, c0), 1)}%, which is wrong.`,
    });
  }
  {
    const y = [["2016", 8, 10, 54], ["2026", 21, 27, 96]];
    const o = y.map(([, x, m, g]) => openness(x, m, g));
    check("o0", o[0], 33.333, 0.001); check("o1", o[1], 50);
    const ch = o[1] - o[0];
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "plain", value: ch, dp: 1, calculator: true,
      stem: `The table shows data for a fictional country (US\\$ billion).\n\n${table(["Year", "Exports", "Imports", "GDP"], y)}\n\nCalculate the change in trade openness, (exports + imports) ÷ GDP × 100, between 2016 and 2026, in percentage points. Give your answer to one decimal place.`,
      wrong: [pctChange(o[0], o[1]), o[1]],
      hints: ["Calculate trade openness for each year first.", "Subtract: the answer is in percentage points."],
      explanation: `1. 2016: (8 + 10) ÷ 54 × 100 = ${fmt(o[0], 1)}%.\n2. 2026: (21 + 27) ÷ 96 × 100 = ${fmt(o[1], 1)}%.\n3. Change = ${fmt(o[1], 1)} − ${fmt(o[0], 1)} = **${fmt(ch, 1)} percentage points**. Trade grew faster than GDP: the economy became more globalised.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Globalisation includes the international movement of capital and people as well as trade in goods.",
    answer: true,
    explanation: "True. It covers goods, services, capital, people, technology and information.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Globalisation can only increase; it can never slow down.",
    answer: false,
    explanation: "False. Higher trade barriers, conflicts, pandemics and higher transport costs can slow or reverse it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause with the way it has encouraged globalisation.",
    pairs: [
      ["Container shipping", "Lower transport costs per unit"],
      ["The internet", "Cheaper communication and coordination"],
      ["Trade agreements", "Lower tariffs and quotas"],
      ["Multinational companies", "Investment and production spread across countries"],
    ],
    explanation: "Each of these lowered a cost or barrier to doing business across borders.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When a developing country becomes more globalised, local consumers usually face {{blank:a}} prices, local firms face {{blank:b}} competition, and skilled workers may {{blank:c}} abroad.",
    blanks: [
      { id: "a", accepted: ["lower"], choices: ["lower", "higher"] },
      { id: "b", accepted: ["more"], choices: ["more", "less"] },
      { id: "c", accepted: ["migrate"], choices: ["migrate", "be banned from moving"] },
    ],
    wrong: [["higher", "less", "be banned from moving"]],
    hints: ["Think about imports and migration."],
    explanation: "Imports lower prices and increase competition; easier migration lets skilled workers move abroad.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of increased globalisation.",
    points: [
      "Cause 1, e.g. lower transport costs (container ships, better ports)…",
      "…make it cheaper to trade goods over long distances.",
      "Cause 2, e.g. lower trade barriers / cheaper communication / expansion of MNCs…",
      "…developed: e.g. firms can coordinate production in several countries / goods face fewer tariffs.",
    ],
    modelAnswer: "First, transport costs have fallen because of container ships, larger aircraft and better ports and roads, so it is cheaper to move goods long distances and to buy from suppliers far away. Second, communication costs have fallen with the internet and mobile phones, so firms can run factories and offices in many countries and sell services online, which has helped multinational companies spread across the world.",
    hints: ["Think about transport, communication, trade barriers and MNCs."],
    explanation: "Two marks per cause: identify + explain.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how globalisation might affect a developing country's environment.",
    points: [
      "Negative: more production and mining for export / more transport…",
      "…raise pollution, emissions, deforestation or loss of natural resources.",
      "Positive: access to cleaner foreign technology (e.g. solar panels) / international standards…",
      "…can reduce pollution and improve resource use.",
    ],
    modelAnswer: "Globalisation can harm the environment because rising demand for exports leads to more mining, logging and factory production, and more goods are transported long distances, increasing pollution and emissions. On the other hand, it gives developing countries access to cleaner technologies, such as cheap imported solar panels, and to international environmental standards set by trading partners and multinational firms, which can reduce pollution.",
    hints: ["Give a harmful effect and a beneficial effect."],
    explanation: "Two marks for each side.",
  });

  // Structured 1 (8 marks).
  {
    const yrs = ["2016", "2021", "2026"], rem = [0.6, 0.9, 1.5], gdp = [20, 22, 25];
    const sh = rem.map((r, i) => (r / gdp[i]) * 100);
    check("sh26", sh[2], 6); check("sh16", sh[0], 3);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country G is a fictional developing country. Many of its doctors, nurses and engineers have moved abroad in the past ten years.\n\n${table(["Year", "Remittances received (US\\$ billion)", "GDP (US\\$ billion)"], yrs.map((y, i) => [y, fmt(rem[i], 1), gdp[i]]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: sh[2], stem: "Calculate remittances as a percentage of GDP in 2026. Give your answer to one decimal place.", wrong: [(rem[2] / gdp[0]) * 100], explanation: `1.5 ÷ 25 × 100 = ${pct(sh[2], 1)}.` }),
        P.mcq({
          label: "(b)", marks: 1,
          stem: "What happened to remittances as a share of GDP between 2016 and 2026?",
          options: [["It doubled, from 3.0% to 6.0%", "Correct."], ["It fell, because GDP rose", "Remittances rose faster than GDP."], ["It stayed the same", "It rose from 3.0% to 6.0%."], ["It rose by 0.9 percentage points", "0.9 is the rise in remittances in US$ billion, not in the share.".replace("US$", "US\\$")]],
          answer: "A",
          explanation: "2016: 0.6 ÷ 20 = 3.0%; 2026: 6.0%.",
        }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain one benefit to Country G of the rise in remittances.",
          points: ["Remittances raise the incomes of families at home (spending on food, school fees, housing)…", "…and bring in foreign currency that helps pay for imports."],
          modelAnswer: "Remittances raise the incomes of families at home, who spend them on food, school fees and building houses, and they bring foreign currency into the country, which helps pay for imports.",
          explanation: "Income and foreign currency.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether the migration of skilled workers has been good for Country G.",
          points: [
            "Good: remittances doubled as a share of GDP; higher family incomes and foreign currency; some migrants return with skills and savings.",
            "Bad: brain drain — fewer doctors, nurses and engineers; weaker health services and slower development; cost of training lost.",
            "Justified conclusion.",
          ],
          modelAnswer: "Migration has brought benefits: remittances rose to 6% of GDP, raising family incomes and bringing in foreign currency, and some migrants may return with new skills and savings. However, the country has lost doctors, nurses and engineers whose training it paid for, so hospitals and infrastructure projects suffer and long-run development may slow. Remittances help families, but they cannot replace skilled workers in public services, so overall the migration is probably harmful unless the country trains more professionals and attracts some back.",
          explanation: "Remittances versus brain drain; conclude.",
        }),
      ],
      hints: ["Share = remittances ÷ GDP × 100."],
      explanation: `Remittances rose from ${pct(sh[0], 1)} to ${pct(sh[2], 1)} of GDP.`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Over twenty years, a fictional lower-income country cut its tariffs, improved its main port and allowed foreign firms to set up factories. Exports of clothing and processed food grew quickly and many young people moved from farms to factory jobs in the cities. However, some local firms closed and air pollution near the new industrial areas rose.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** causes of increased globalisation mentioned in the passage.",
        points: ["Cutting tariffs (lower trade restrictions).", "Improving the port (lower transport costs) / allowing foreign firms (MNCs) to set up."],
        modelAnswer: "Cutting tariffs and improving the main port, which lowered transport costs; allowing foreign firms to set up factories is also correct.",
        explanation: "Any two of the three causes.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how globalisation may have affected competition in the country.",
        points: [
          "Lower tariffs let imports enter, so local firms faced more competition…",
          "…consumers gained lower prices and more choice, and firms had to become efficient.",
          "Foreign factories also competed for workers and markets…",
          "…so inefficient local firms closed (as the passage says).",
        ],
        modelAnswer: "Lower tariffs allowed more imports into the country, so local firms faced more competition; consumers gained from lower prices and wider choice, and firms were pushed to cut costs and improve quality. Foreign-owned factories also competed for workers and customers, so the least efficient local firms lost business and some closed, as the passage reports.",
        explanation: "Two developed points.",
      }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether globalisation has benefited this country.",
        points: [
          "Benefits: rapid export growth; jobs in factories with higher wages than farming; investment and technology from foreign firms; growth and development.",
          "Benefits: cheaper imports and more choice.",
          "Costs: closure of local firms and job losses; workers moving to cities may face poor housing; income inequality between urban and rural areas.",
          "Costs: rising air pollution and health problems; profits of foreign firms may go abroad; dependence on world demand.",
          "Evaluation: depends on whether the new jobs outnumber the lost ones and on government policies (pollution controls, training).",
          "Justified conclusion.",
        ],
        modelAnswer: "Globalisation has clearly brought benefits: exports of clothing and processed food grew quickly, young people found factory jobs that usually pay more than farm work, and foreign firms brought investment, technology and skills that support growth and development. Consumers also gained from cheaper imports. However, some local firms closed, so some workers lost their jobs, and the move to the cities may have created crowded housing and wider gaps between urban and rural incomes. Air pollution near the industrial areas has risen, harming health, and some profits of foreign firms are sent abroad. The country is also now more exposed to falls in world demand. Overall, the country seems to have gained, because the new export industries have created many jobs and growth, but the gains would be greater and fairer if the government controlled pollution and helped displaced workers and rural areas.",
        explanation: "Growth, jobs and investment versus closures, inequality and pollution; conclude.",
      }),
    ],
    hints: ["Look for causes linked to trade barriers, transport and MNCs.", "Weigh the gains to exporters and consumers against the costs."],
    explanation: "The passage shows causes (tariff cuts, port, MNCs) and mixed effects; a good answer weighs them.",
  });

  b.card("DEFINITION", "Define **globalisation**.", "The growing interconnection of the world's economies through trade, capital, people, technology and information.");
  b.card("CONCEPT", "Give four causes of changes in globalisation.", "Changes in trade restrictions; transport costs; communication costs; the movement of MNCs (also capital flows, political events).");
  b.card("CONCEPT", "Effect of globalisation on competition?", "More competition from imports and foreign firms: lower prices and more choice, but some inefficient local firms close.");
  b.card("CONCEPT", "Effect of globalisation on the environment?", "More production and transport raise pollution and emissions; but cleaner technology and standards can spread.");
  b.card("CONCEPT", "Effect of globalisation on migration?", "More movement of workers: host countries gain skills; source countries gain remittances but suffer brain drain.");
  b.card("CONCEPT", "Effect of globalisation on income distribution?", "Can reduce poverty overall, but gains go mainly to skilled workers and capital owners, so inequality within countries may widen.");
  b.card("FORMULA", "Trade openness = ?", "(Exports + imports) ÷ GDP × 100");
  b.card("FACT", "Can globalisation slow down?", "Yes: higher trade barriers, conflicts, pandemics and higher transport costs can slow or reverse it.");
});
