// W4a: the case for and against free trade (both boards; ZIMSEC Form 5, Cambridge AS).
import { concept, P, chk, table, fmt, roundTo, pctChange, linearMarket, schedule } from "../lib.mjs";
import { mc, LV10 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

// Q-set market: P = 120 - Q (demand), P = 30 + Q (supply), world price 45
const m = { a: 120, b: 1, c: 30, d: 1 };
const auto = linearMarket(m);
chk(auto.price, 75); chk(auto.quantity, 45); chk(auto.consumerSurplus, 1012.5); chk(auto.producerSurplus, 1012.5);
const pw = 45, qd = (m.a - pw) / m.b, qs = (pw - m.c) / m.d; chk(qd, 75); chk(qs, 15);
const csF = 0.5 * (m.a - pw) * qd, psF = 0.5 * (pw - m.c) * qs; chk(csF, 2812.5); chk(psF, 112.5);
const dCS = csF - auto.consumerSurplus, dPS = psF - auto.producerSurplus; chk(dCS, 1800); chk(dPS, -900); chk(dCS + dPS, 900);

concept("aecon.trade.free-trade", { file: "trade/free-trade", keyPrefix: "trade.free-trade" }, (b) => {
  mc(b, [2, "RECALL"], "Free trade is best described as trade between countries",
    ["without tariffs, quotas or similar barriers on imports", "Correct: goods can move freely."],
    [["in which the government sets the price of every single good traded", "Price-setting by government is intervention."],
     ["that is allowed only between members of the same trade bloc or union", "Free trade can be worldwide, not only within a bloc."],
     ["in which exports are always greater than imports in total value", "A free trader may have a deficit or a surplus."]],
    "Free trade means no barriers that restrict or favour particular imports or exports.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A fall in a country's exchange rate is likely to",
    ["raise the demand for its exports and reduce its imports", "Correct: exports are cheaper to foreigners and imports dearer at home."],
    [["reduce the demand for its exports and raise its imports", "This would follow a rise in the exchange rate."],
     ["leave both exports and imports unchanged, in the short run", "Prices in foreign currency change when the rate changes."],
     ["raise the prices of its exports in the markets of buyers", "Exports become cheaper in foreign currency terms."]],
    "A depreciation lowers the foreign-currency price of exports and raises the home price of imports.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a benefit of free trade?",
    ["Import competition pushes domestic firms to cut costs", "Correct: this raises efficiency."],
    [["Domestic industries are protected from all foreign competition", "That is a feature of protection."],
     ["All workers in the economy are guaranteed to keep their present jobs", "Jobs in declining industries may be lost."],
     ["Dependence on imports of food and fuel is always completely eliminated", "Free trade may increase dependence."]],
    "Competition, choice, lower prices and economies of scale are benefits of free trade.");

  mc(b, [3, "ANALYSIS"], "When a small country opens its market to imports at a world price below the previous domestic price, who is most likely to lose?",
    ["Domestic firms that supply the same product", "Correct: they face lower prices and sell less."],
    [["Domestic consumers of the product", "They gain from lower prices."],
     ["Foreign firms that export the product", "They gain a new market."],
     ["Workers in industries that export goods to other countries", "They are likely to gain."]],
    "Lower prices reduce producer surplus for firms competing with imports, while consumers gain.", { hints: ["Compare the price before and after trade."] });

  mc(b, [2, "RECALL"], "Dumping occurs when a firm sells goods in a foreign market",
    ["at a price below its cost of production", "Correct: the price is below cost."],
    [["at a price above the average price in the foreign market", "That would be a premium, not dumping."],
     ["in a quantity too small for the foreign market to notice", "Quantity is not the test."],
     ["only to customers who also buy goods from the home market", "Customers do not define dumping."]],
    "Dumping is selling below cost (or below the home price) in a foreign market.");

  mc(b, [3, "ANALYSIS"], "A small country opens its market to imports. Compared with no trade, the net effect on the country's total surplus (consumer surplus + producer surplus) is",
    ["positive, as consumers gain more than producers lose", "Correct: there is a net gain."],
    [["negative, because producers always lose more than consumers can gain", "Consumers' gain is the larger."],
     ["zero, because the gains to consumers equal the losses to all producers", "The gains are larger than the losses."],
     ["positive only if the government taxes the imports that enter the country", "A tariff reduces the net gain."]],
    "Free trade at a lower world price raises total surplus: the gain to consumers exceeds the loss to producers.", { hints: ["Compare the gain in consumer surplus with the loss in producer surplus."] });

  mc(b, [4, "EVALUATION"], "Free trade causes the clothing industry of a developing country to shrink. Which policy response best deals with this cost while keeping the benefits?",
    ["Retraining workers and helping them to move to growing industries", "Correct: it spreads the gains and reduces unemployment."],
    [["Banning all imports of clothing to protect the industry", "This loses the gains from trade."],
     ["Reducing spending on education so that wages remain low", "This reduces skills and growth."],
     ["Doing nothing, because the market always adjusts immediately", "Adjustment can be slow and costly."]],
    "Because gains exceed losses, policies to help workers adjust are preferable to restricting trade.", { hints: ["Which option deals with the cost without removing the gain?"] });

  {
    chk(qd - qs, 60);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: qd - qs, unit: "units", dp: 0, tol: 0.5, hints: ["Imports = quantity demanded − quantity supplied at the world price."],
      stem: "The home demand for a good is P = 120 − Q and home supply is P = 30 + Q (P in US\\$, Q in units). The country is small, and the world price is US\\$45. Calculate the quantity of imports under free trade, in units.",
      wrong: [75, 15, 45], explanation: "At US\\$45, Qd = 120 − 45 = 75 and Qs = 45 − 30 = 15. Imports = 75 − 15 = 60 units." });
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: dCS, calculator: true, hints: ["Consumer surplus = ½ × (maximum price − price) × quantity."],
      stem: "Using the same market (demand P = 120 − Q; supply P = 30 + Q; world price US\\$45), calculate the increase in consumer surplus when the country moves from no trade to free trade, in US\\$.",
      wrong: [1012.5, 2812.5, 900], explanation: "No trade: P = 75, Q = 45, CS = ½ × 45 × 45 = 1,012.50. Free trade: P = 45, Q = 75, CS = ½ × 75 × 75 = 2,812.50. Increase = US\\$1,800." });
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: dCS + dPS, calculator: true, hints: ["Find the change in producer surplus too, then add the changes."],
      stem: "Using the same market (demand P = 120 − Q; supply P = 30 + Q; world price US\\$45), calculate the net gain in total surplus from free trade, in US\\$.",
      wrong: [1800, 900 + 1800, 112.5], explanation: "1. Consumer surplus rises by US\\$1,800.\n2. Producer surplus: no trade = ½ × 45 × 45 = 1,012.50; free trade = ½ × 15 × 15 = 112.50, a fall of US\\$900.\n3. Net gain = 1,800 − 900 = US\\$900." });
    const open = ((2100 + 2700) / 8000) * 100; chk(open, 60);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: open, dp: 1, unit: "%", hints: ["Openness = (exports + imports) ÷ GDP × 100."],
      stem: "An economy has exports of US\\$2,100 million, imports of US\\$2,700 million and GDP of US\\$8,000 million. Calculate trade openness, (exports + imports) ÷ GDP, as a percentage.",
      wrong: [26.3, 33.75, 4800], explanation: "(2,100 + 2,700) ÷ 8,000 × 100 = 60%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: free trade benefits every individual and every industry in a country.",
    feedbackFalse: "There are winners and losers; industries that compete with imports may lose.",
    explanation: "Free trade gives net gains to the economy as a whole, but some producers and workers lose." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each factor with its likely effect on the pattern of trade.",
    pairs: ["A fall in the exchange rate", "A rise in incomes at home", "A new free trade agreement between neighbours", "Political instability and sanctions"],
    right: ["Raises exports and lowers imports", "Raises imports", "Raises trade between members", "Lowers trade and investment"], rightIndex: [0, 1, 2, 3],
    explanation: "Each factor changes either the price, the demand or the willingness to trade." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Selling goods abroad at a price below cost is called {{blank:a}}. Free trade can cause {{blank:b}} unemployment in industries that cannot compete with imports.",
    blanks: [{ id: "a", accepted: ["dumping"], choices: ["dumping", "specialisation", "hedging"] }, { id: "b", accepted: ["structural"], choices: ["structural", "seasonal", "frictional"] }],
    explanation: "Selling below cost is dumping; the decline of industries causes structural unemployment." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes selling goods in a foreign market at a price below their cost of production?",
    accepted: ["dumping", "dumping of goods"], wrong: ["specialisation"],
    explanation: "Dumping is selling below cost, often to drive out competitors." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give two separate benefits and explain each."],
    stem: "Explain two benefits of free trade for consumers and firms.",
    points: ["Consumers get lower prices and more choice, because imports add to supply and competition.", "So consumers' real incomes rise.", "Firms face competition, which gives them an incentive to cut costs and innovate.", "They can also obtain cheaper inputs and sell to larger markets (economies of scale)."],
    modelAnswer: "Free trade gives consumers lower prices and more choice, because imports add to supply and increase competition, so their real incomes rise. It also increases competition for firms, which gives them an incentive to cut costs and innovate, and it lets them obtain cheaper inputs and sell to larger markets, which allows economies of scale.",
    explanation: "Two benefits with explanation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Why can workers not move immediately?"],
    stem: "Explain how free trade can cause structural unemployment.",
    points: ["Industries that cannot compete with cheaper imports shrink or close.", "Workers in them have skills that are specific to that industry, so they cannot easily move to new jobs.", "They remain unemployed until they retrain or move, which is structural unemployment."],
    modelAnswer: "Industries that cannot compete with cheaper imports shrink or close. The workers in them have skills specific to that industry and cannot easily move to new jobs, so they remain unemployed until they retrain or move, which is structural unemployment.",
    explanation: "Decline of industries; specific skills; unemployment." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think about price changes and export earnings."],
    stem: "Analyse why a country that depends on exports of a single commodity is vulnerable under free trade.",
    points: ["Export earnings depend on the world price of one good.", "Commodity prices can fall sharply because of changes in supply or demand.", "A fall in the price reduces export earnings, incomes and government revenue.", "The country may be unable to pay for imports, so the exchange rate falls.", "It is also hard to move to other industries quickly, so the shock can last."],
    modelAnswer: "Export earnings depend on the world price of one good, and commodity prices can fall sharply because of changes in world supply or demand. A fall in the price reduces export earnings, incomes and government revenue, and the country may be unable to pay for the imports it needs, so its exchange rate may fall. It is also hard to move resources to other industries quickly, so the shock can last for a long time.",
    explanation: "Price dependence, volatility, falling earnings, balance of payments, slow adjustment." });

  {
    const prices = [20, 30, 40, 50, 60, 70];
    const qdA = [100, 90, 80, 70, 60, 50], qsA = [20, 30, 40, 50, 60, 70];
    const s = schedule({ prices, qd: qdA, qs: qsA, priceHeader: "Price (US\\$)", qdHeader: "Quantity demanded (units)", qsHeader: "Quantity supplied by home firms (units)", requireEquilibrium: true });
    chk(s.equilibrium.price, 60);
    const imp = qdA[2] - qsA[2]; chk(imp, 40);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["At the world price read Qd and Qs from the table.", "Imports = Qd − Qs."],
      stem: `**Free trade in cooking oil (a fictional country, illustrative)**\n\nThe table shows the home market for cooking oil. The country is small. The government removes all trade barriers and cooking oil can be imported at the world price of US\\$40 a unit.\n\n${s.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: 60, stem: "State the equilibrium price before trade, in US\\$.", wrong: [40, 50, 70], explanation: "Qd = Qs = 60 at US\\$60." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: imp, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the quantity of cooking oil imported at the world price, in units.", wrong: [80, 20, 60], explanation: "At US\\$40: Qd = 80 and Qs = 40, so imports = 80 − 40 = 40 units." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain the effect of free trade on home producers of cooking oil.",
          points: ["The price falls from US\\$60 to US\\$40.", "Home firms supply less (40 against 60 units).", "So their revenue and profits fall and some workers may lose their jobs."],
          modelAnswer: "The price falls from US\\$60 to the world price of US\\$40, and home firms supply only 40 units instead of 60. Their revenue and profits fall and some workers may lose their jobs." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain one benefit of free trade for consumers of cooking oil.",
          points: ["The price falls from US\\$60 to US\\$40.", "Consumers can buy more (80 units against 60), so their welfare rises."],
          modelAnswer: "The price falls from US\\$60 to US\\$40, so consumers can buy 80 units instead of 60 and their welfare rises." }),
      ],
      explanation: "Imports 40 units at the world price; consumers gain; home producers lose." });
  }
  {
    const x = 2400, mm = 3000, gdp = 12000;
    const open = ((x + mm) / gdp) * 100; chk(open, 45);
    const pc = pctChange(100, 82); chk(pc, -18);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Openness = (exports + imports) ÷ GDP × 100.", "In (d) think about who loses and for how long."],
      stem: "**Trade liberalisation in Mbira (a fictional economy, illustrative)**\n\nMbira removes the tariffs on imported clothing. Exports are US\\$2,400 million, imports are US\\$3,000 million and GDP is US\\$12,000 million. The price index of clothing falls from 100 to 82 over two years, and shoppers can choose from many more styles. However, five clothing factories have closed and 6,000 workers have lost their jobs. Many of them are over 45 and have worked only in clothing. The government says that growth in exports of horticultural products will create new jobs, but these are in a different part of the country.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: open, dp: 1, unit: "%", stem: "Calculate trade openness, (exports + imports) ÷ GDP, as a percentage.", wrong: [20, 25, 50], explanation: "(2,400 + 3,000) ÷ 12,000 × 100 = 45%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, dp: 1, unit: "%", stem: "Calculate the percentage change in the price of clothing. Include the minus sign if the price falls.", wrong: [18, -22, 82], explanation: "(82 − 100) ÷ 100 × 100 = −18%." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two benefits to Mbira of removing the tariffs.",
          points: ["Lower prices (an 18% fall), which raise consumers' real incomes.", "More choice of styles, so consumer welfare rises.", "Competition from imports pushes remaining firms to cut costs and raise quality.", "Resources can move to industries with a comparative advantage, such as horticulture, raising output."],
          modelAnswer: "Clothing prices have fallen by 18%, which raises consumers' real incomes, and shoppers have more choice of styles, so their welfare rises. Competition from imports also pushes the remaining firms to cut costs and raise quality, and resources can move to industries with a comparative advantage, such as horticulture, which raises total output." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether the benefits of trade liberalisation outweigh the costs for Mbira.",
          points: ["Consumers gain from lower prices and choice, and more efficient firms and exporters gain.", "6,000 workers have lost their jobs; older workers with specialised skills may be unemployed for a long time (structural unemployment).", "The new jobs are in a different region and require different skills, so the adjustment is slow.", "Judgement: net gains for the economy, but the government should provide retraining and help with moving."],
          modelAnswer: "Consumers gain from lower prices and more choice, and efficient firms and exporters gain from competition and new markets. However, 6,000 workers have lost their jobs, and older workers with specialised skills may be unemployed for a long time, which is structural unemployment. The new jobs are in a different part of the country and need different skills, so the adjustment is slow. The economy as a whole probably gains, but the benefits outweigh the costs only if the government provides retraining and help with moving." }),
      ],
      explanation: "Trade openness 45%; clothing prices fell 18%; consumers gain but workers lose; the net result depends on adjustment support." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider gains, costs, who gains and loses, and supporting policies."],
    stem: "Discuss whether a developing country should adopt free trade.",
    points: ["Specialisation in goods of comparative advantage raises output and exports.", "Lower prices, more choice and cheaper inputs raise welfare and productivity.", "Competition and access to technology increase efficiency.", "Adjustment costs: structural unemployment in declining industries.", "Dependence on a narrow range of exports exposes the country to price shocks.", "Infant industries may not survive against established foreign rivals; dumping.", "Gains may be unevenly shared among groups and regions.", "Benefits depend on policies: retraining, infrastructure, social support, and trade agreements.", "Application to a developing country.", "A justified judgement."],
    levels: LV10, wordLimit: { min: 150, max: 400 },
    modelAnswer: "Free trade allows a developing country to specialise in the goods in which it has a comparative advantage, such as minerals and farm products, which raises output and export earnings, and it gives consumers lower prices and more choice. It also gives firms cheaper inputs and access to technology, and competition pushes them to become more efficient. However, there are costs. Industries that cannot compete with imports may close, causing structural unemployment, and a country that depends on a narrow range of exports is exposed to price shocks. New industries may not survive against established foreign rivals, and dumping can destroy local firms. The gains may also be shared unequally between groups and regions. The benefits therefore depend on the policies that go with free trade, such as retraining, investment in infrastructure and social support, and on how quickly the economy can adjust. On balance free trade is likely to bring net gains, but a developing country may be wise to open its markets gradually and to support new industries while it builds its capacity.",
    explanation: "Gains from specialisation and efficiency against adjustment costs, dependence and infant industries, with a judgement." });

  b.card("DEFINITION", "Define **free trade**.", "Trade between countries without tariffs, quotas or other barriers that restrict imports or exports.");
  b.card("CONCEPT", "List six determinants of trade flows.", "Comparative advantage, exchange rates, incomes, trade barriers and agreements, quality and transport, and political factors.");
  b.card("CONCEPT", "Give four benefits of free trade.", "Specialisation and efficiency, lower prices and more choice, competition, and economies of scale (also growth).");
  b.card("CONCEPT", "Give four costs of free trade.", "Structural unemployment, dependence, dumping and loss of infant industries (also unequal gains).");
  b.card("DEFINITION", "Define **dumping**.", "Selling goods in a foreign market below their cost of production or below the price in the home market.");
  b.card("FORMULA", "Trade openness?", "(Exports + imports) ÷ GDP × 100.");
  b.card("CONCEPT", "Who gains and who loses when a small country opens to cheaper imports?", "Consumers gain; domestic producers competing with imports lose; the total surplus rises.");
  b.card("CONCEPT", "How does a fall in the exchange rate affect trade?", "Exports become cheaper and imports dearer, so exports rise and imports fall.");
  b.card("CONCEPT", "What policy helps those who lose from free trade?", "Retraining, help with moving and support for new industries.");
});
