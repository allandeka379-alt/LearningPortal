// W4b: econ.trade.free-trade — definition, advantages and disadvantages of free trade. Figures differ from the
// lesson's worked example.
import { concept, P, fmt, pct, pctChange, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.free-trade", { file: "trade/free-trade", keyPrefix: "trade.free-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **free trade**?",
    options: [
      ["Trade between countries without tariffs, quotas or other barriers", "Correct."],
      ["Trade in which goods are exchanged without any payment", "Free trade still involves payment; 'free' refers to the absence of barriers."],
      ["Trade that takes place only within one country", "That is home trade."],
      ["Trade in which the government sets the prices of all exports", "That would be a restriction on trade."],
    ],
    answer: "A",
    explanation: "Free trade means no tariffs, quotas, subsidies, embargoes or other government barriers on trade between countries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of free trade for **consumers**?",
    options: [
      ["Lower prices and a wider choice of goods", "Correct: imports are not taxed and come from the cheapest producers."],
      ["Higher tariff revenue for the government", "Free trade removes tariffs, so revenue falls."],
      ["Protection of local jobs from foreign competition", "Free trade increases foreign competition."],
      ["Fewer foreign goods in the shops", "Free trade brings more foreign goods."],
    ],
    answer: "A",
    explanation: "Removing barriers lowers import prices and lets consumers buy from producers all over the world.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On which economic idea is the case for free trade mainly based?",
    options: [
      ["Specialisation according to comparative advantage", "Correct: free trade lets each country specialise where its opportunity cost is lowest."],
      ["The law of diminishing returns", "This concerns adding variable factors in production."],
      ["The infant industry argument for temporary protection", "This is an argument for protection."],
      ["Demand-pull inflation", "This is a cause of inflation, not a basis for trade."],
    ],
    answer: "A",
    explanation: "With free trade, resources move to the industries where each country has a comparative advantage, raising total world output.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a developing country's government lose an important source of income under free trade?",
    options: [
      ["It can no longer collect tariff revenue on imports", "Correct: customs duties are a major and easy-to-collect tax in many developing countries."],
      ["Its exporters must pay tariffs to it on every sale", "Exporters do not pay tariffs to their own government."],
      ["Free trade forbids all forms of taxation", "Only trade barriers are removed."],
      ["Consumers stop buying imported goods", "Imports usually rise under free trade."],
    ],
    answer: "A",
    hints: ["What tax is collected at the border?"],
    explanation: "Removing tariffs ends customs revenue, so the government must find other taxes or cut spending.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A fictional country removes all tariffs on imported clothing. What is the most likely effect on its small, high-cost clothing factories?",
    options: [
      ["They lose sales and some may close", "Correct: cheaper imports take their customers."],
      ["They gain sales because imports become dearer", "Imports become cheaper, not dearer."],
      ["They are unaffected because tariffs apply only to exports", "Tariffs are taxes on imports."],
      ["They receive government subsidies automatically", "Free trade does not include subsidies; subsidies are a trade barrier."],
    ],
    answer: "A",
    hints: ["What happens to the price of imported clothing?"],
    explanation: "Without tariffs, cheaper foreign clothing competes directly with local output; inefficient firms lose sales and may close, causing structural unemployment.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument **against** free trade is strongest for a developing country trying to build its first manufacturing industries?",
    options: [
      ["New industries cannot gain economies of scale while facing large foreign competitors", "Correct: the infant industry argument."],
      ["Free trade always raises the prices paid by consumers", "Free trade usually lowers prices."],
      ["Free trade prevents the country from exporting its minerals and farm goods", "Free trade makes exporting easier."],
      ["Free trade reduces competition in the home market", "It increases competition."],
    ],
    answer: "A",
    hints: ["Think about the situation of young firms with high average costs."],
    explanation: "Young firms have high average costs; without temporary protection they may never grow large enough to compete, leaving the country dependent on primary exports.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "A group of countries removes tariffs on trade among themselves, but each keeps its own tariffs against other countries. What is this called?",
    options: [
      ["A free trade area", "Correct."],
      ["A customs union", "A customs union also has a common external tariff."],
      ["An embargo", "An embargo bans trade."],
      ["Self-sufficiency", "Self-sufficiency means producing everything at home."],
    ],
    answer: "A",
    explanation: "In a free trade area, members trade freely with each other while keeping separate tariffs against non-members.",
  });

  // Numericals.
  {
    const p = 1200, r = 25, withT = p * (1 + r / 100), saving = withT - p;
    check("withT", withT, 1500); check("saving", saving, 300);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: saving, daily: true,
      stem: `A fictional country charges a ${r}% tariff on imported solar systems, which cost US\\$${fmt(p)} each before the tariff. The country then moves to free trade. Assuming the whole tariff was passed on to buyers, how much does each buyer save, in US\\$?`,
      wrong: [withT, r],
      explanation: `With the tariff the price is ${fmt(p)} × 1.${r} = US\\$${fmt(withT)}; under free trade it is US\\$${fmt(p)}. Saving = **US\\$${saving}** per system.`,
    });
  }
  {
    const p = 40, r = 15, q = 60000, rev = p * (r / 100) * q;
    check("rev", rev, 360000);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: rev, calculator: true,
      stem: `A fictional country imports ${fmt(q)} bicycle tyres a year at US\\$${p} each and charges a ${r}% tariff on them. It agrees to remove the tariff under a free trade agreement. Calculate the tariff revenue the government loses each year, in US\\$, assuming imports stay at ${fmt(q)}.`,
      wrong: [p * r * q, p * q],
      hints: ["Tariff per tyre = 15% of US$40.", "Multiply by the number of tyres."].map((h) => h.replace("US$", "US\\$")),
      explanation: `1. Tariff per tyre = ${r}% × ${p} = US\\$${fmt(p * r / 100)}.\n2. Revenue = ${fmt(p * r / 100)} × ${fmt(q)} = **US\\$${fmt(rev)}** a year. (In practice imports would probably rise when the price falls.)`,
    });
  }
  {
    const x0 = 180, x1 = 243, ch = pctChange(x0, x1);
    check("ch", ch, 35);
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch,
      stem: `After joining a regional free trade area, a fictional country's exports of cement to its neighbours rise from US\\$${x0} million to US\\$${x1} million. Calculate the percentage increase. Give your answer to one decimal place.`,
      wrong: [x1 - x0, -pctChange(x1, x0)],
      hints: ["Divide the change by the original value."],
      explanation: `(${x1} − ${x0}) ÷ ${x0} × 100 = **${pct(ch, 1)}**. Dividing by the new value gives ${pct(-pctChange(x1, x0), 1)}.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under free trade, governments do not impose tariffs or quotas on imports.",
    answer: true,
    explanation: "True. That is what free trade means.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Free trade benefits every firm and every worker in a country.",
    answer: false,
    explanation: "False. Total output rises, but firms and workers in industries that cannot compete with imports may lose.",
  });
  b.match({
    d: 2, skill: "ANALYSIS",
    stem: "Match each effect of free trade with the group most directly affected.",
    pairs: [
      ["Cheaper imported goods and more choice", "Consumers"],
      ["Access to larger foreign markets", "Efficient exporters"],
      ["Loss of customs duty income", "The government"],
      ["Lost sales to cheaper imports", "High-cost local producers"],
    ],
    explanation: "Free trade spreads gains and losses unevenly: consumers and efficient exporters gain; high-cost producers and tariff revenue lose.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When tariffs are removed, the prices of imports {{blank:a}}, competition for local firms {{blank:b}} and world output tends to {{blank:c}} because countries specialise according to comparative advantage.",
    blanks: [
      { id: "a", accepted: ["fall"], choices: ["rise", "fall"] },
      { id: "b", accepted: ["increases"], choices: ["increases", "decreases"] },
      { id: "c", accepted: ["rise"], choices: ["rise", "fall"] },
    ],
    wrong: [["rise", "decreases", "fall"]],
    hints: ["Tariffs are taxes on imports."],
    explanation: "Without tariffs imports are cheaper, local firms face more competition, and specialisation raises total output.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of free trade for a country's producers.",
    points: [
      "Access to larger export markets…",
      "…so firms can expand and gain economies of scale, lowering average costs.",
      "Cheaper imported inputs (machinery, fuel, raw materials) / competition encourages efficiency…",
      "…lowering production costs and making exports more competitive.",
    ],
    modelAnswer: "First, free trade opens larger export markets, so efficient firms can expand output and gain economies of scale, which lowers their average costs. Second, firms can import machinery, fuel and raw materials without tariffs, which lowers their production costs and makes their exports more competitive; competition from imports also pushes them to become more efficient.",
    hints: ["Think about markets and inputs."],
    explanation: "Two marks per advantage: identify + explain.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why a developing country might not want completely free trade.",
    points: [
      "Infant industries need temporary protection…",
      "…to grow and gain economies of scale before facing established foreign firms.",
      "Tariff revenue is an important source of government income / dumping / dependence on primary exports / job losses…",
      "…so removing barriers could cut spending on services or harm employment.",
    ],
    modelAnswer: "First, its new manufacturing industries are small and have high costs, so they need temporary protection while they grow and gain economies of scale; under free trade they might never survive. Second, customs duties are an important and easy-to-collect source of government revenue in many developing countries, so removing them could force cuts in spending on health and education or higher taxes elsewhere.",
    hints: ["Think about young industries and government revenue."],
    explanation: "Two marks per reason.",
  });

  // Structured 1 (8 marks).
  {
    const pBefore = 650, tariff = 30, pAfter = Math.round((pBefore / (1 + tariff / 100)) * 100) / 100, saving = pBefore - pAfter;
    check("pAfter", pAfter, 500); check("saving", saving, 150);
    const fall = pctChange(pBefore, pAfter);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A fictional country has agreed to remove its 30% tariff on imported water pumps. A pump currently sells for US\\$${pBefore}, including the tariff. Two local firms make pumps, but at a higher cost than foreign producers. Farmers use the pumps for irrigation.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pAfter, stem: "Calculate the price of an imported pump after the tariff is removed, in US\\$, assuming the whole tariff was passed on.", wrong: [pBefore * 0.7], explanation: `Price before tariff = ${pBefore} ÷ 1.30 = US\\$${pAfter}. (Taking 30% off US\\$${pBefore} gives US\\$${fmt(pBefore * 0.7)}, which is wrong because the tariff was 30% of the lower price.)` }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: fall, stem: "Calculate the percentage fall in the price of a pump. Give a fall as a negative number, to one decimal place.", wrong: [-30], explanation: `(${pAfter} − ${pBefore}) ÷ ${pBefore} × 100 = ${fmt(fall, 1)}%.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain how farmers may benefit from removing the tariff.",
          points: ["Pumps are US$150 cheaper, so irrigation costs fall.".replace("US$", "US\\$"), "More farmers can irrigate, raising output and incomes and reducing the risk from drought."],
          modelAnswer: `Each pump is US\\$${saving} cheaper, so the cost of irrigation falls. More farmers can afford pumps, which raises their output and incomes and makes them less dependent on rain.`,
          explanation: "Lower input cost → more irrigation → output.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether removing the tariff is good for the country.",
          points: [
            "Good: cheaper pumps for farmers; more irrigation, food output and exports; competition pushes local pump makers to become efficient.",
            "Bad: the two local firms may close, causing job losses; lost tariff revenue; dependence on imported pumps.",
            "Justified conclusion.",
          ],
          modelAnswer: "Removing the tariff makes pumps cheaper, so more farmers can irrigate, raising food production and possibly exports; this benefits many people. However, the two local pump makers may lose sales and close, putting their workers out of work, and the government loses tariff revenue. Because pumps are an input used by a large and important farming sector, the gains to farmers and food security probably outweigh the losses, so removing the tariff is good for the country, especially if the displaced workers are helped to find new jobs.",
          explanation: "Gains to users versus losses to local producers and revenue; conclude.",
        }),
      ],
      hints: ["The tariff was 30% of the price before the tariff.", "Price with tariff = price without tariff × 1.30."],
      explanation: `Pump price falls from US\\$${pBefore} to US\\$${pAfter} (${fmt(fall, 1)}%).`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "A fictional developing country in southern Africa is negotiating to join a free trade agreement with a much larger and more industrialised neighbour. Its government earns about a fifth of its revenue from customs duties. Its main exports are maize, beef and copper, and it has a small but growing food-processing industry.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which change would the free trade agreement require?",
        options: [["Removing tariffs on imports from the neighbour", "Correct."], ["Setting a tariff on all imports from outside the region", "That is a feature of a customs union, not a free trade area."], ["Banning exports of copper", "That would restrict trade."], ["Fixing the exchange rate with the neighbour", "Not part of a free trade agreement."]],
        answer: "A",
        explanation: "A free trade agreement removes tariffs and quotas on trade between the members.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the country's government might be worried about its revenue.",
        points: ["About a fifth of revenue comes from customs duties.", "Removing tariffs on imports from the neighbour (probably its main source of imports) cuts this revenue.", "The government must raise other taxes or cut spending on services."],
        modelAnswer: "About one fifth of the government's revenue comes from customs duties. A large share of its imports probably comes from its bigger, industrialised neighbour, so removing tariffs on them would cut this revenue sharply. The government would then have to raise other taxes, which may be harder to collect, or cut spending on services such as health and education.",
        explanation: "Share of revenue → loss → consequence.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain one way in which the country's exporters could benefit from the agreement.",
        points: ["Maize, beef and copper could enter the neighbour's large market without tariffs…", "…so they become more competitive there, sales and output rise, and firms may gain economies of scale."],
        modelAnswer: "The country's maize, beef and copper could enter the neighbour's large market without tariffs, so they would be cheaper there and sales would rise; exporters could expand output and gain economies of scale.",
        explanation: "Market access → sales → scale.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the country should join the free trade agreement.",
        points: [
          "For: larger tariff-free market for maize, beef and copper; more export earnings and jobs.",
          "For: cheaper imports of manufactured goods and inputs for consumers and farmers; competition improves efficiency.",
          "Against: loss of about a fifth of revenue from customs duties; need for new taxes or spending cuts.",
          "Against: young food-processing industry may not survive competition from the industrialised neighbour; risk of staying dependent on primary products.",
          "Considerations: phase in tariff cuts; protect infant industries temporarily; find alternative revenue; size of neighbour's market.",
          "Justified conclusion.",
        ],
        modelAnswer: "Joining would give the country's maize, beef and copper tariff-free access to a much larger market, raising export earnings and jobs, and consumers and farmers would pay less for manufactured goods and inputs. Competition would also push local firms to become more efficient. However, the government would lose a large part of the fifth of its revenue that comes from customs duties, and it would need new taxes or spending cuts. The young food-processing industry might be swamped by large, established firms from the neighbour, leaving the country dependent on raw exports. On balance, the country should join, because the market access is valuable, but it should negotiate a gradual phase-in of tariff cuts, temporary protection for food processing, and time to build other sources of tax revenue.",
        explanation: "Market access and cheaper imports versus revenue and infant-industry risks; conclude.",
      }),
    ],
    hints: ["Consider exporters, consumers, the government and new industries."],
    explanation: "Free trade offers market access and cheaper imports, but costs revenue and threatens infant industries; a phased approach balances these.",
  });

  b.card("DEFINITION", "Define **free trade**.", "Trade between countries without government restrictions such as tariffs, quotas, subsidies or embargoes.");
  b.card("DEFINITION", "What is a **free trade area**?", "Countries that remove tariffs and quotas on trade among themselves but keep their own barriers against non-members.");
  b.card("CONCEPT", "On what theory is the case for free trade based?", "Specialisation according to comparative advantage, which raises world output.");
  b.card("CONCEPT", "Give four advantages of free trade.", "Lower prices and more choice; higher world output; larger markets and economies of scale; competition and efficiency; cheaper inputs; technology transfer.");
  b.card("CONCEPT", "Give four disadvantages of free trade.", "Harm to infant industries; job losses; dumping; dependence on few exports and on imports; loss of tariff revenue; current account problems.");
  b.card("FACT", "What happens to government revenue when tariffs are removed?", "Customs duty revenue falls, so other taxes must rise or spending must fall.");
  b.card("FACT", "When was the World Trade Organization set up?", "In 1995; it provides a forum for negotiating lower trade barriers and settling trade disputes.");
  b.card("CONCEPT", "Who loses from free trade?", "High-cost local producers and their workers, and governments that relied on tariff revenue.");
});
