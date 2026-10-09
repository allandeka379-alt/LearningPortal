// W4b: econ.trade.protection — methods (tariffs, quotas, subsidies, embargoes, exchange controls), reasons and
// consequences of protection. Figures differ from the lesson's worked examples.
import { concept, P, ZIM, schedule, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.protection", { file: "trade/protection", keyPrefix: "trade.protection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **tariff**?",
    options: [
      ["A tax on imported goods", "Correct."],
      ["A limit on the quantity of a good that may be imported", "That is an import quota."],
      ["A complete ban on trade with a country", "That is an embargo."],
      ["A payment made by the government to local producers", "That is a subsidy."],
    ],
    answer: "A",
    explanation: "A tariff (customs duty) is a tax on imports; it may be a fixed amount per unit (specific) or a percentage of value (ad valorem).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method of protection raises revenue for the government?",
    options: [
      ["A tariff on imported clothing", "Correct: the duty is paid to the government."],
      ["An import quota on clothing, with free import licences", "A quota limits quantity; with free licences the government earns nothing."],
      ["A subsidy to local clothing factories", "A subsidy costs the government money."],
      ["An embargo on clothing from one country", "A ban means no imports, so there is nothing to tax."],
    ],
    answer: "A",
    explanation: "Tariffs are taxes, so they raise revenue; subsidies cost the government money; quotas and embargoes raise none (unless licences are sold).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **infant industry** argument for protection?",
    options: [
      ["New firms need time to grow and cut costs before they can compete with established foreign rivals", "Correct: protection is meant to be temporary while they gain economies of scale."],
      ["Firms producing goods for babies and children should be protected from foreign competition", "'Infant' refers to the age of the industry, not its customers."],
      ["Old industries should be protected so that workers have time to find other jobs", "This is the declining industry argument."],
      ["Foreign firms selling below cost should be kept out of the market", "This is the anti-dumping argument."],
    ],
    answer: "A",
    explanation: "An infant industry has high average costs because it is small; protection gives it time to grow and benefit from economies of scale.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A government imposes a tariff on imported cooking oil. What is the most likely effect?",
    options: [
      ["The domestic price rises and local producers sell more", "Correct: imports become dearer, so demand switches to local oil."],
      ["The domestic price falls and imports rise", "A tariff makes imports dearer, not cheaper."],
      ["Consumers buy more cooking oil than before", "A higher price reduces the quantity demanded."],
      ["Local producers sell less because consumers prefer imports", "Imports become dearer, so local producers gain sales."],
    ],
    answer: "A",
    hints: ["Who pays the tariff, and what happens to the price consumers face?"],
    explanation: "The tariff raises the price of imports, so the domestic price rises; consumers buy less in total, local producers sell more, imports fall and the government collects revenue.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A foreign producer sells steel in a fictional country at US\\$300 a tonne, although it costs US\\$420 a tonne to produce. What is this practice called?",
    options: [
      ["Dumping", "Correct: selling abroad below the cost of production."],
      ["Comparative advantage", "Comparative advantage is about lower opportunity cost, not selling below cost."],
      ["An embargo", "An embargo is a ban on trade."],
      ["A specific tariff", "A tariff is a tax on imports, not a pricing practice."],
    ],
    answer: "A",
    hints: ["Compare the selling price with the cost."],
    explanation: "Selling below cost (or below the home price) in a foreign market is dumping; it can drive efficient local firms out of business, so countries may impose anti-dumping duties.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "How do **exchange controls** reduce imports?",
    options: [
      ["They limit the foreign currency that residents can obtain to pay for imports", "Correct: importers cannot buy as much foreign currency as they want."],
      ["They place a tax on every unit of an imported good", "That is a tariff."],
      ["They pay local producers to lower their prices", "That is a subsidy."],
      ["They raise the interest rate so that imports become cheaper for local residents", "Exchange controls ration currency; they do not set interest rates."],
    ],
    answer: "A",
    hints: ["Imports must be paid for in foreign currency."],
    explanation: "Imports must be paid for in foreign currency; rationing it limits how much can be imported.",
  });
  // Schedule for cement.
  const prices = [6, 7, 8, 9, 10], qd = [530, 490, 450, 410, 370], qs = [110, 170, 230, 290, 350];
  const sc = schedule({ prices, qd, qs, priceHeader: "Price (US\\$ per bag)", qdHeader: "Quantity demanded (thousand bags a month)", qsHeader: "Quantity supplied by local firms (thousand bags a month)" });
  const pw = 6, t = 2, imp0 = qd[0] - qs[0], imp1 = qd[2] - qs[2];
  check("imp0", imp0, 420); check("imp1", imp1, 220);
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows the market for cement in a fictional country. The world price is US\\$${pw} a bag and the country can import any quantity at that price.\n\n${sc.md}\n\nThe government imposes a tariff of US\\$${t} a bag. By how much do imports fall?`,
    options: [
      ["200 thousand bags a month", `Correct: from ${imp0} to ${imp1} thousand bags.`],
      ["80 thousand bags a month", "This is the fall in quantity demanded only (530 − 450)."],
      ["120 thousand bags a month", "This is the rise in local output only (230 − 110)."],
      ["420 thousand bags a month", "This is the level of imports before the tariff, not the fall."],
    ],
    answer: "A",
    hints: ["Imports = quantity demanded − local supply, at each price.", "The price with the tariff is US\\$6 + US\\$2."],
    explanation: `Free trade: imports = 530 − 110 = ${imp0}. With the tariff the price is US\\$8: imports = 450 − 230 = ${imp1}. Imports fall by ${imp0 - imp1} thousand bags: demand falls by 80 and local output rises by 120.`,
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country raises tariffs on imports from its main trading partner. Which consequence is most likely to reduce the benefit of this policy to the country?",
    options: [
      ["The trading partner retaliates by taxing the country's exports", "Correct: retaliation costs export sales and jobs."],
      ["Local producers of the protected goods expand output", "This is the intended benefit."],
      ["The government collects more customs revenue", "This is a benefit to the government."],
      ["Spending switches from imports to goods made by local firms", "This is the aim of the tariff."],
    ],
    answer: "A",
    hints: ["Which option describes a cost, not an aim?"],
    explanation: "Retaliation hits the country's export industries, offsetting the jobs and output gained in the protected industries.",
  });

  // Numericals.
  {
    const v = 2400, rate = 15, price = v * (1 + rate / 100);
    check("price", price, 2760);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: price, daily: true,
      stem: `A fictional country charges an ad valorem tariff of ${rate}% on imported motorcycles. A motorcycle is imported for US\\$${fmt(v)}. Calculate its price after the tariff, in US\\$, assuming the whole tariff is passed on.`,
      wrong: [v * rate / 100, v + rate],
      explanation: `Tariff = ${rate}% × ${fmt(v)} = US\\$${fmt(v * rate / 100)}; price = ${fmt(v)} + ${fmt(v * rate / 100)} = **US\\$${fmt(price)}**. US\\$${fmt(v * rate / 100)} is the tariff alone.`,
    });
  }
  {
    const sp = [3, 4, 5, 6, 7], sd = [260, 240, 220, 200, 180], ss = [60, 90, 120, 150, 180];
    const S = schedule({ prices: sp, qd: sd, qs: ss, priceHeader: "Price (US\\$ per bag)", qdHeader: "Quantity demanded (thousand bags a week)", qsHeader: "Quantity supplied by local mills (thousand bags a week)" });
    const w = 3, tt = 1, m0 = sd[0] - ss[0], m1 = sd[1] - ss[1], rv = tt * m1 * 1000;
    check("m0", m0, 200); check("m1", m1, 150); check("rv", rv, 150000);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: rv, calculator: true,
      stem: `The table shows the market for bags of sugar in a fictional country, which can import any quantity at the world price of US\\$${w} a bag.\n\n${S.md}\n\nCalculate the government's revenue each week from a tariff of US\\$${tt} a bag, in US\\$.`,
      wrong: [tt * m0 * 1000, tt * sd[1] * 1000],
      hints: ["Find the price with the tariff and the imports at that price.", "Revenue = tariff per bag × number of bags imported."],
      explanation: `1. Price with the tariff = ${w} + ${tt} = US\\$4.\n2. Imports at US\\$4 = 240 − 90 = ${m1} thousand bags.\n3. Revenue = ${tt} × ${fmt(m1 * 1000)} = **US\\$${fmt(rv)}** a week. Using the free-trade imports (${m0} thousand) or total demand (240 thousand) overstates the revenue.`,
    });
  }
  {
    const tariffPct = (t / pw) * 100;
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: tariffPct,
      stem: `A specific tariff of US\\$${t} a bag is placed on imported cement whose world price is US\\$${pw} a bag. Express the tariff as a percentage of the world price. Give your answer to one decimal place.`,
      wrong: [(t / (pw + t)) * 100, (pw / t) * 100],
      hints: ["Divide the tariff by the world price."],
      explanation: `${t} ÷ ${pw} × 100 = **${pct(tariffPct, 1)}**. Dividing by the price including the tariff (US\\$8) gives ${pct((t / 8) * 100, 1)}, which uses the wrong base.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "An embargo is a complete ban on trade in certain goods or with a certain country.",
    answer: true,
    explanation: "True. It is the most extreme form of protection.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Protection always increases the total number of jobs in a country.",
    answer: false,
    explanation: "False. Jobs may rise in protected industries but fall in industries that use the protected goods as inputs and in export industries hit by retaliation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of protection with how it works.",
    pairs: [
      ["Tariff", "Raises the price of imports through a tax"],
      ["Import quota", "Limits the quantity of imports allowed"],
      ["Subsidy", "Lowers local producers' costs with government payments"],
      ["Embargo", "Bans trade in a good or with a country"],
    ],
    explanation: "Tariffs work through price; quotas and embargoes through quantity; subsidies help local firms compete without taxing imports.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When a tariff is imposed, the domestic price of the good {{blank:a}}, local production {{blank:b}}, imports {{blank:c}} and consumers are {{blank:d}} off.",
    blanks: [
      { id: "a", accepted: ["rises"], choices: ["rises", "falls"] },
      { id: "b", accepted: ["rises"], choices: ["rises", "falls"] },
      { id: "c", accepted: ["fall"], choices: ["rise", "fall"] },
      { id: "d", accepted: ["worse"], choices: ["better", "worse"] },
    ],
    wrong: [["falls", "falls", "rise", "better"]],
    hints: ["A tariff makes imports dearer."],
    explanation: "Dearer imports raise the domestic price; local firms expand along their supply curve; imports fall; consumers pay more and buy less.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons, other than protecting infant industries, why a government might restrict imports.",
    points: [
      "Reason 1 identified, e.g. to reduce a current account deficit / save foreign currency…",
      "…developed: fewer imports mean less spending abroad, so the deficit narrows.",
      "Reason 2 identified, e.g. to prevent dumping / raise revenue / strategic industries / demerit goods / protect jobs / declining industries…",
      "…developed: e.g. goods sold below cost could force efficient local firms out of business.",
    ],
    modelAnswer: "First, to reduce a current account deficit: if fewer goods are imported, less is spent abroad, so the deficit narrows and the country saves scarce foreign currency. Second, to prevent dumping: when foreign firms sell goods below their cost of production, efficient local firms may be forced to close; an anti-dumping duty raises the import price to a fair level.",
    hints: ["Think about the current account, dumping, revenue, strategic goods and jobs."],
    explanation: "Two marks per reason: identify + develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** disadvantages of protection for the country that imposes it.",
    points: [
      "Consumers pay higher prices and have less choice…",
      "…so their real incomes fall, especially for imported necessities.",
      "Protected firms lack competition and stay inefficient / other firms pay more for inputs / trading partners retaliate…",
      "…so costs stay high and export industries can lose sales and jobs.",
    ],
    modelAnswer: "First, consumers pay more for protected goods and have less choice, which lowers their real incomes, especially when the goods are necessities such as food. Second, protected firms face little competition, so they have less reason to cut costs or improve quality, and other industries that use their products as inputs face higher costs; trading partners may also retaliate against the country's exports, costing jobs.",
    hints: ["Consider consumers, efficiency, other firms and retaliation."],
    explanation: "Two marks for each disadvantage: identify + explain.",
  });

  // Structured 1 (8 marks).
  {
    const pr = [20, 25, 30, 35, 40], d = [70, 60, 50, 40, 30], s = [10, 20, 30, 40, 50];
    const S = schedule({ prices: pr, qd: d, qs: s, priceHeader: "Price (US\\$ per pair)", qdHeader: "Quantity demanded (thousand pairs a year)", qsHeader: "Quantity supplied by local firms (thousand pairs a year)" });
    const i0 = d[0] - s[0], i1 = d[1] - s[1], r = 5 * i1 * 1000;
    check("i0", i0, 60); check("i1", i1, 40); check("r", r, 200000);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `The table shows the market for school shoes in a fictional country. Shoes can be imported in any quantity at the world price of US\\$20 a pair. Local shoe makers ask the government for a tariff of US\\$5 a pair.\n\n${S.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: i0, stem: "Calculate the quantity of shoes imported under free trade, in thousand pairs.", wrong: [d[0]], explanation: `70 − 10 = ${i0} thousand pairs.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: i1, stem: "Calculate the quantity imported with the tariff, in thousand pairs.", wrong: [i0, d[1]], explanation: `At US\\$25: 60 − 20 = ${i1} thousand pairs.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: r, stem: "Calculate the government's revenue from the tariff, in US\\$.", wrong: [5 * i0 * 1000], explanation: `5 × ${fmt(i1 * 1000)} = US\\$${fmt(r)}.` }),
        P.manual({
          label: "(d)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should grant the tariff.",
          points: [
            "For: local output doubles (10 → 20 thousand pairs), more jobs; revenue US$200,000; saves foreign currency.",
            "Against: parents pay 25% more for a necessity (school shoes), and buy fewer (70 → 60); burden on poor families; local firms may stay inefficient.",
            "Against: possible retaliation; alternative support (training, subsidy) may be better.",
            "Justified conclusion, e.g. only a temporary tariff if local makers can become competitive.",
          ].map((x) => x.replace("US$", "US\\$")),
          modelAnswer: "The tariff would double local output from 10 to 20 thousand pairs, creating jobs, and raise US\\$200,000 for the government while saving foreign currency. However, school shoes are a necessity: parents would pay 25% more, and total purchases would fall from 70 to 60 thousand pairs, hurting poorer families most. Protected firms may also have little reason to become more efficient, and trading partners might retaliate. The government should grant the tariff only if it is temporary and the local makers have a realistic plan to cut costs; otherwise help such as training or cheaper finance would be better.",
          explanation: "Producer and government gains versus consumer losses; conclude.",
        }),
      ],
      hints: ["Imports = quantity demanded − local supply.", "With the tariff the price is US\\$20 + US\\$5."],
      explanation: `Imports fall from ${i0} to ${i1} thousand pairs; tariff revenue US\\$${fmt(r)}.`,
    });
  }
  // Structured 2 (12 marks).
  {
    const shirt = 8, rate = 30, p1 = shirt * (1 + rate / 100);
    check("p1", p1, 10.4);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, calculator: true,
      stem: "A fictional country in southern Africa grows cotton but exports almost all of it as raw lint. A group of investors has opened two small textile factories in Gweru, but their shirts cost more to produce than imported shirts. The government is considering either a 30% tariff on imported shirts or a subsidy to the new factories.",
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "Which of the two policies would raise revenue for the government?",
          options: [["The tariff", "Correct: it is a tax on imports."], ["The subsidy", "A subsidy is government spending."], ["Both policies", "Only the tariff is a tax."], ["Neither policy", "The tariff raises revenue."]],
          answer: "A",
          explanation: "A tariff is a tax; a subsidy is a payment by the government.",
        }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: p1, dp: 2, stem: `An imported shirt costs US\\$${shirt}.00 before the tariff. Calculate its price with the 30% tariff, in US\\$, assuming the whole tariff is passed on.`, wrong: [shirt * rate / 100, shirt + rate], explanation: `${shirt} × 1.30 = US\\$${fmt(p1, 2)}.` }),
        P.manual({
          label: "(c)", marks: 3,
          stem: "Explain the infant industry argument for protecting the textile factories.",
          points: [
            "The factories are new and small, so their average costs are high.",
            "Protection lets them sell more and grow, gaining economies of scale and experience.",
            "Once their costs have fallen they can compete without protection, which should then be removed.",
          ],
          modelAnswer: "The textile factories are new and small, so they cannot yet benefit from bulk buying or specialised machinery, and their average costs are higher than those of large foreign producers. Protection gives them a bigger share of the home market, so they can expand, gain economies of scale and learn by experience. Once their costs have fallen, they should be able to compete without help, so the protection is meant to be temporary.",
          explanation: "Small → high cost → growth and economies of scale → temporary.",
        }),
        P.manual({
          label: "(d)", marks: 2,
          stem: "Explain one advantage of a subsidy rather than a tariff for consumers.",
          points: ["A subsidy lowers the factories' costs, so local shirts can be sold more cheaply…", "…while imported shirts are not taxed, so consumers do not face higher prices or less choice."],
          modelAnswer: "A subsidy lowers the factories' costs so that they can cut their prices, while imported shirts stay at their old price. Consumers therefore keep cheap imports and their choice, whereas a tariff would raise shirt prices for everyone.",
          explanation: "Lower local prices without raising import prices.",
        }),
        P.manual({
          label: "(e)", marks: 5, levels: LV(5),
          stem: "Discuss whether the government should protect the textile factories.",
          points: [
            "For: adds value to local cotton instead of exporting raw lint; jobs in Gweru; saves foreign currency; infant industry may become competitive.",
            "For: diversifies the economy away from raw commodities.",
            "Against: higher shirt prices (tariff) or cost to taxpayers (subsidy); factories may never become efficient and want permanent protection.",
            "Against: retaliation and SADC/COMESA trade commitments; comparative advantage may lie in cotton growing.",
            "Justified conclusion, e.g. limited, time-bound support with targets, preferably a subsidy or training.",
          ],
          modelAnswer: "Protecting the factories would let the country add value to its own cotton instead of exporting raw lint, creating jobs in Gweru, saving foreign currency on imported shirts and helping the economy diversify. If the factories really are infant industries, they may become competitive once they have grown. However, a tariff would raise the price of shirts for all consumers, and a subsidy would cost taxpayers money that could be spent on schools or clinics. There is a danger that the factories never become efficient and lobby for protection forever, and raising tariffs could break the country's trade commitments in SADC and COMESA or invite retaliation. On balance, the government should give limited, time-bound support, preferably through a subsidy or training linked to cost targets, and remove it if the factories do not become competitive.",
          explanation: "Value added, jobs and diversification versus consumer, taxpayer and efficiency costs; conclude.",
        }),
      ],
      hints: ["Price with an ad valorem tariff = price × (1 + rate).", "Think about who gains and who pays under each policy."],
      explanation: `The tariff raises the price of a US\\$${shirt} shirt to US\\$${fmt(p1, 2)}; the subsidy avoids this but costs the government money.`,
    });
  }

  b.card("DEFINITION", "Define **protectionism**.", "Government measures that restrict trade, usually by limiting imports or helping local producers, to protect domestic industries.");
  b.card("DEFINITION", "Specific versus ad valorem tariff?", "Specific: a fixed amount per unit. Ad valorem: a percentage of the value of the import.");
  b.card("DEFINITION", "What is an **import quota**?", "A legal limit on the quantity (or value) of a good that can be imported in a period.");
  b.card("DEFINITION", "What is **dumping**?", "Selling goods abroad at a price below their cost of production (or below the home price).");
  b.card("CONCEPT", "Tariff versus quota: which raises revenue?", "A tariff raises revenue; a quota does not (unless import licences are sold).");
  b.card("CONCEPT", "List six reasons for protection.", "Infant industries, declining industries, strategic industries, anti-dumping, current account deficit, revenue, demerit goods/environment, jobs.");
  b.card("CONCEPT", "List four disadvantages of protection.", "Higher prices and less choice; inefficiency of protected firms; dearer inputs for other firms; retaliation; lost gains from trade.");
  b.card("FACT", "Effect of a tariff on price, local output, imports and consumers?", "Price rises; local output rises; imports fall; consumers pay more and buy less; the government gains revenue.");
  b.card("DEFINITION", "What are **exchange controls**?", "Government limits on the foreign currency residents may buy, which restrict their ability to import.", undefined, { applies: ZIM });
});
