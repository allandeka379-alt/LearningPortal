// W4b: economic integration (ZIMSEC Form 5; Cambridge A Level only).
import { concept, P, chk, table, fmt } from "../lib.mjs";
import { mc, LV6, LV8 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.economic-integration", { file: "trade/economic-integration", keyPrefix: "trade.economic-integration" }, (b) => {
  mc(b, [2, "RECALL"], "Which feature distinguishes a customs union from a free trade area?",
    ["A common external tariff on imports from non-members", "Correct: members share one tariff against outsiders."],
    [["Free trade in goods between the members", "Both have this."],
     ["A single currency used by all members", "That describes a monetary union."],
     ["Free movement of labour between the members", "That is a feature of a common market."]],
    "Both remove internal tariffs; only a customs union adds a common external tariff.", { daily: true });

  mc(b, [1, "RECALL"], "A group of countries with no tariffs between them, each keeping its own tariffs against other countries, is a",
    ["free trade area", "Correct: internal free trade with separate external tariffs."],
    [["customs union", "A customs union has a common external tariff."],
     ["monetary union", "A monetary union has a single currency."],
     ["common market", "A common market also has free movement of labour and capital."]],
    "The key phrase is that each member keeps its own external tariff.");

  mc(b, [2, "UNDERSTANDING"], "Which is an example of trade creation?",
    ["Imports from a partner replace more costly output of domestic firms", "Correct: cheaper partner supply replaces higher-cost home production."],
    [["Imports from a partner replace cheaper imports from outside the bloc", "That is trade diversion."],
     ["A tariff is raised on imports from non-members", "That is protection, not creation."],
     ["Exports from the bloc fall because of a stronger currency", "That is an exchange rate effect."]],
    "Trade creation moves production from a high-cost to a lower-cost source.");

  mc(b, [2, "UNDERSTANDING"], "Trade diversion occurs when a customs union causes",
    ["imports to switch from a low-cost outside supplier to a higher-cost member", "Correct: the external tariff makes the outsider look dearer."],
    [["domestic output to be replaced by cheaper imports from a partner member country", "That is trade creation."],
     ["exports to switch to the member with the lowest tariff", "That is not what the term means."],
     ["the external tariff to be removed on all goods", "Diversion arises because the tariff is kept."]],
    "The partner's tariff-free price is below the outsider's tariff-inclusive price, but above the outsider's true cost.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which stage of integration first allows firms and workers to move freely between member countries?",
    ["A common market", "Correct: free movement of labour and capital as well as goods."],
    [["A preferential trade area", "Only some tariffs are lowered."],
     ["A free trade area", "Only goods and services move freely."],
     ["A customs union", "It adds a common external tariff, not free factor movement."]],
    "A common market adds free movement of factors of production to a customs union.");

  mc(b, [3, "APPLICATION"], "Home firms can produce a good at US\\$30 a unit. A partner can supply it at US\\$22 and the rest of the world at US\\$16. Before a customs union all members charge a 50% tariff on imports; afterwards no tariff is charged between partners. The union leads to",
    ["trade diversion", "Correct: the world supplier at US\\$24 is replaced by the partner at US\\$22, though the world has the lower cost."],
    [["trade creation", "Home output is not replaced: imports from the world were already cheaper than home output."],
     ["no change in the source of supply", "The partner's price now falls below the tariff-inclusive world price."],
     ["a rise in the consumer price", "The consumer price falls from US\\$24 to US\\$22."]],
    "World price with tariff = 16 × 1.5 = US\\$24, below home 30 and partner with tariff 33. After the union the partner's price is US\\$22 < 24: imports switch from the cheaper world producer to the partner, which is diversion.", { hints: ["Add the tariff to the world price and compare all three sources before and after."] });

  mc(b, [3, "ANALYSIS"], "Which is a likely cost of joining a monetary union?",
    ["Loss of the ability to set a national interest rate", "Correct: monetary policy is made for the whole union."],
    [["A rise in the price of goods from other members", "Trade within the union becomes cheaper."],
     ["The introduction of tariffs between members", "Tariffs between members are removed."],
     ["Greater uncertainty about exchange rates inside the union", "Exchange rate uncertainty between members ends."]],
    "A single central bank sets one interest rate, which may not suit every member's cycle.", { hints: ["What can a member no longer control?"] });

  mc(b, [2, "RECALL"], "Under the main principle of the World Trade Organization, a member should normally",
    ["give every other member the same trade terms", "Correct: non-discrimination (most-favoured-nation treatment)."],
    [["give all trade preferences only to neighbours", "Preferences are an exception."],
     ["set the same tariff as all other members", "Tariff levels differ between members."],
     ["trade only with countries in its own region", "The WTO is a global body."]],
    "Non-discrimination is the central principle; regional unions are permitted exceptions.", { applies: ["zimsec"] });

  {
    const home = 14, partner = 11, saving = home - partner; chk(saving, 3);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: saving, daily: true,
      stem: "Before a customs union Zandia produces a good at a cost of US\\$14 a unit. After the union it imports the good from a partner at US\\$11 a unit, with no tariff. Calculate the fall in the price per unit to consumers, in US\\$.",
      wrong: [11, 25, 14], explanation: "Fall in price = 14 − 11 = US\\$3 per unit. This is an example of trade creation." });
    const w = 9, tariff = 0.5, rev = w * tariff; chk(rev, 4.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: rev, dp: 2, hints: ["Tariff revenue per unit = world price × tariff rate."],
      stem: "A country imports fertiliser from the rest of the world at US\\$9 a unit and charges a 50% tariff. It then joins a customs union and buys from a partner at US\\$11 a unit, tariff-free. Calculate the tariff revenue per unit the government loses, in US\\$ to two decimal places.",
      wrong: [2, 9, 13.5], explanation: "Tariff revenue = 50% of US\\$9 = US\\$4.50 per unit, which is lost when imports switch to the tariff-free partner." });
    const dc = 11 - 9; chk(dc, 2);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: dc, calculator: true, hints: ["Compare real resource costs (before the tariff), not prices paid by consumers."],
      stem: "In the example above (world cost US\\$9, tariff 50%, partner cost US\\$11), calculate the rise in the real resource cost of each unit of fertiliser when imports switch to the partner, in US\\$.",
      wrong: [2.5, 4.5, 13.5],
      explanation: "1. Before the union the real resource cost of a unit is the world price, US\\$9.\n2. After the union it is the partner's cost, US\\$11.\n3. Rise in real cost = 11 − 9 = US\\$2 per unit. The consumer price falls from US\\$13.50 to US\\$11, but the tariff revenue lost (US\\$4.50) means the country as a whole is worse off on this good." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "In a free trade area the members adopt a common external tariff on imports from non-members.",
    explanation: "A common external tariff is the feature of a customs union. In a free trade area each member keeps its own." });

  b.match({ d: 2, skill: "RECALL", stem: "Match each form of integration with its description.",
    pairs: [["Free trade area", "No tariffs between members; each sets its own external tariff"], ["Customs union", "No internal tariffs and a common external tariff"], ["Common market", "A customs union with free movement of labour and capital"], ["Monetary union", "Members share one currency and a central bank"]],
    explanation: "Each stage adds a feature to the one before it." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "When a customs union replaces cheaper imports from the rest of the world with dearer imports from a member, this is trade {{blank:a}}. When it replaces dearer home output with cheaper imports from a member, this is trade {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["diversion"], choices: ["diversion", "creation", "protection"] }, { id: "b", accepted: ["creation"], choices: ["creation", "diversion", "protection"] }],
    explanation: "Diversion moves supply from a low-cost outsider to a higher-cost member; creation moves supply from a high-cost home producer to a lower-cost member." });

  b.short({ d: 1, skill: "RECALL", stem: "Name the type of trading bloc whose members remove tariffs between themselves and adopt a common external tariff.",
    accepted: ["customs union", "a customs union"], wrong: ["free trade area"],
    explanation: "A customs union is a free trade area with a common external tariff." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define trade diversion.",
    points: ["A switch of imports from a lower-cost supplier outside a trading bloc", "to a higher-cost supplier inside it, because the external tariff makes the outsider dearer"],
    modelAnswer: "Trade diversion is a switch of imports from a lower-cost supplier outside a trading bloc to a higher-cost supplier inside it, which happens because the common external tariff makes the outsider's goods dearer than the member's.",
    explanation: "Switch from outside low-cost to inside higher-cost source because of the tariff." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about scale, competition and investment."],
    stem: "Explain two benefits to a small economy of joining a regional trading bloc.",
    points: ["A larger market allows firms to produce on a bigger scale", "so average costs fall and prices may fall", "Lower tariffs between members increase competition", "so firms become more efficient and consumers have more choice (or foreign direct investment is attracted by market access)"],
    modelAnswer: "A bloc gives firms access to a larger market, so they can produce on a bigger scale and average costs fall, which allows lower prices. Removing tariffs between members also increases competition, so firms must become more efficient and consumers gain more choice. The larger market may also attract foreign direct investment.",
    explanation: "Two benefits, each developed." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare the real cost of supply with the price the consumer pays."],
    stem: "Explain why trade diversion may reduce the welfare of a member country even though consumer prices fall.",
    points: ["Imports switch from the lowest-cost world producer to a higher-cost partner.", "The real resource cost of obtaining the good rises.", "The government loses the tariff revenue it collected on the outside imports.", "If the loss of revenue and extra cost exceed the gain to consumers, national welfare falls."],
    modelAnswer: "Trade diversion shifts imports from the lowest-cost world producer to a higher-cost partner, so the real resource cost of the good rises. The government also loses the tariff revenue it used to collect on the outside imports. Consumers pay a lower price, but if the extra resource cost and lost revenue are greater than the gain to consumers, the member country as a whole is worse off.",
    explanation: "Higher real cost, lost revenue, net effect." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, applies: ["zimsec"], hints: ["Think of quotas and buffer stocks."],
    stem: "Explain why commodity agreements often fail to stabilise prices for long.",
    points: ["Members have an incentive to produce more than their quota.", "Producers outside the agreement can expand output and undermine the price.", "A price held above equilibrium creates a surplus that must be stored or destroyed.", "Storing surpluses is costly and the agreement may run out of funds."],
    modelAnswer: "Members have an incentive to cheat by producing more than their quota, and producers outside the agreement can expand their output and undermine the price. If the price is held above its equilibrium level a surplus is created which must be stored or destroyed, and storage is costly, so the agreement may run out of funds.",
    explanation: "Cheating, outsiders, surplus, cost." });

  {
    const tariff = 0.4, w = 10 * (1 + tariff), part = 12; chk(w, 14);
    const dcost = part - 10; chk(dcost, 2);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the tariff to the world price.", "Compare resource costs before tariff."],
      stem: "**A customs union in Tamba (fictional, illustrative)**\n\nTamba and its neighbour form a customs union with a common external tariff of 40%. Before the union Tamba imported cooking oil from the rest of the world at US\\$10 a litre before tariff. After the union it buys cooking oil from its partner at US\\$12 a litre, tariff-free.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: w, stem: "Calculate the price per litre of oil from the rest of the world before the union, including the tariff, in US\\$.", wrong: [10, 4, 22], explanation: "10 × 1.40 = US\\$14." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: dcost, stem: "Calculate the rise in the real resource cost of each litre when imports switch to the partner, in US\\$.", wrong: [4, 0, 2.8], explanation: "Real cost rises from US\\$10 to US\\$12: US\\$2 a litre." }),
        P.short({ label: "(c)", marks: 1, stem: "Name this effect of the customs union on trade.", accepted: ["trade diversion", "diversion"], wrong: ["trade creation"], explanation: "Imports switch from a lower-cost outsider to a higher-cost member: trade diversion." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain whether Tamba's consumers and its government gain or lose from the switch.",
          points: ["Consumers gain because the price falls from US\\$14 to US\\$12 a litre.", "The government loses the tariff revenue of US\\$4 a litre on oil previously imported from outside.", "The country pays more resources (US\\$12 against US\\$10) for each litre.", "Overall the country loses on this good unless gains elsewhere (scale, competition) outweigh it."],
          modelAnswer: "Consumers gain because the price falls from US\\$14 to US\\$12 a litre. The government loses the tariff revenue of US\\$4 a litre it collected on oil from outside the union, and the country uses more resources (US\\$12 instead of US\\$10) for each litre, so the country as a whole loses on this good, unless gains from scale and competition elsewhere outweigh the loss." }),
      ],
      explanation: "World price with tariff US\\$14; resource cost rises US\\$2; trade diversion; consumers gain but revenue is lost and resource cost rises." });
  }
  {
    const tf = 0.4;
    const x = { home: 18, partner: 13, world: 25 }, y = { home: 30, partner: 20, world: 15 };
    chk(x.world * (1 + tf), 35); chk(x.partner * (1 + tf), 18.2);
    chk(y.world * (1 + tf), 21); chk(y.partner * (1 + tf), 28);
    const sx = x.home - x.partner; chk(sx, 5);
    const dy = y.partner - y.world; chk(dy, 5);
    const ry = y.world * tf; chk(ry, 6);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Work out the cheapest source before and after the union for each good.", "In (e) weigh creation and diversion and say what else matters."],
      stem: "**Two goods in Kavanda (fictional, illustrative)**\n\nKavanda joins a customs union with a common external tariff of 40% on goods from non-members. Costs per unit (US\\$) before any tariff:\n\n" + table(["Good", "Kavanda producers", "Partner producers", "Rest of the world"], [["Good X (soap)", 18, 13, 25], ["Good Y (machine parts)", 30, 20, 15]]) + "\n\nBefore the union all imports faced the 40% tariff. After it, partner goods enter tariff-free.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which good illustrates trade creation?", options: [["Good X", "Correct: home output is replaced by cheaper partner imports."], ["Good Y", "That is diversion: the world producer is replaced."], ["Both goods", "Only one is creation."], ["Neither good", "One of them is creation."]], answer: "A", explanation: "For Good X the partner's price of US\\$13 is below home cost of US\\$18; before the union imports cost US\\$18.20 from the partner and US\\$35 from the world, so home output was cheapest." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: sx, stem: "Calculate the fall in the price of Good X per unit after the union, in US\\$.", wrong: [18.2, 13, 22], explanation: "Before 18, after 13: fall of US\\$5." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: dy, stem: "Calculate the rise in the real resource cost of Good Y per unit after the union, in US\\$.", wrong: [1, 10, 6], explanation: "World cost 15 replaced by partner cost 20: rise of US\\$5." }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: ry, stem: "Calculate the tariff revenue per unit of Good Y that the government loses, in US\\$.", wrong: [21, 5, 8], explanation: "Tariff = 40% of US\\$15 = US\\$6." }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether Kavanda gains overall from joining the customs union.",
          points: ["Good X: consumers gain a fall in price of US\\$5 and resources move to better uses (creation).", "Good Y: the consumer price falls only from US\\$21 to US\\$20, but the resource cost rises by US\\$5 and the government loses US\\$6 of revenue (diversion).", "Net effect on each good depends on quantities traded and the extent of creation compared with diversion.", "Other gains: a larger market, scale economies, competition and investment.", "Costs: job losses in the soap industry; loss of control of the external tariff.", "Judgement supported by the balance of creation and diversion."],
          modelAnswer: "On Good X consumers gain a fall in price of US\\$5 a unit and resources move out of the high-cost soap industry into better uses: trade creation. On Good Y the consumer price falls by only US\\$1 (from US\\$21 to US\\$20), but the real cost of supply rises by US\\$5 and the government loses US\\$6 of tariff revenue, so this is diversion and a net loss on this good. The overall result depends on the quantities of each good traded. Kavanda may also gain from a larger market, economies of scale, more competition and investment, but it faces job losses in soap production and loses control of its external tariff. On balance Kavanda probably gains if creation is larger than diversion, but the case would be stronger if the external tariff were lower." }),
      ],
      explanation: "Good X: creation (US\\$5 fall); Good Y: diversion (resource cost +US\\$5, lost revenue US\\$6); assess the balance." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider market size, similar exports, infrastructure and adjustment costs."],
    stem: "Assess whether regional economic integration is likely to benefit a developing economy.",
    points: ["A larger market allows scale economies and attracts investment.", "Free trade among members lowers prices and widens choice (trade creation).", "Competition may raise efficiency and encourage specialisation by comparative advantage.", "Trade diversion may raise the real cost of imports.", "Members often export similar primary goods, so trade between them is limited.", "Poor infrastructure and border delays reduce gains; tariff revenue may be lost.", "Gains may flow to the more developed members.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Integration can benefit a developing economy by giving its firms a larger market, which allows economies of scale and attracts investment, and by lowering prices and widening choice through trade creation. Competition may also raise efficiency. However, many developing economies export similar primary goods, so there is little to trade between members and the gains from creation are small. Trade diversion may raise the real cost of imports, governments may lose tariff revenue, and poor roads and border delays limit the gains. Benefits may also flow mainly to the more developed members. Overall, integration is likely to help most when members have different strengths, a low external tariff and good transport links; otherwise the gains are modest.",
    explanation: "Weigh larger markets and creation against diversion, similar exports, lost revenue and uneven gains." });

  b.card("DEFINITION", "Define a **free trade area**.", "A group of countries with no tariffs or quotas between members, each keeping its own tariffs on non-members.");
  b.card("DEFINITION", "Define a **customs union**.", "A free trade area with a common external tariff on imports from non-members.");
  b.card("CONCEPT", "Order the stages of integration.", "Preferential trade area, free trade area, customs union, common market, monetary union, full economic union.");
  b.card("DEFINITION", "Define **trade creation**.", "Replacement of higher-cost home output by lower-cost imports from a partner in a trading bloc.");
  b.card("DEFINITION", "Define **trade diversion**.", "Switch of imports from a lower-cost outside supplier to a higher-cost member, because of the external tariff.");
  b.card("CONCEPT", "What does a **common market** add to a customs union?", "Free movement of labour and capital between members.");
  b.card("CONCEPT", "Main cost of a monetary union to a member?", "Loss of its own interest rate and exchange rate policy.");
  b.card("FACT", "What replaced the GATT in 1995?", "The World Trade Organization (WTO).", "ZIMSEC detail.", { applies: ["zimsec"] });
  b.card("CONCEPT", "Why do commodity agreements often fail?", "Cheating on quotas, new producers outside the agreement, and the cost of storing surpluses.", "ZIMSEC detail.", { applies: ["zimsec"] });
});
