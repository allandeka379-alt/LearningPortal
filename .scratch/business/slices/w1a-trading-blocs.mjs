// W1a: trading blocs and economic integration (COM, BES).
import { concept, P } from "../lib.mjs";

concept("bus.trade.trading-blocs", { file: "trade/trading-blocs", keyPrefix: "trade.trading-blocs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **trading bloc**?",
    options: [
      ["A group of countries that reduce trade barriers between themselves", "Correct: members trade with fewer tariffs and quotas."],
      ["A large company that owns factories and trades in many countries", "That is a multinational company."],
      ["A market where commodities are bought and sold", "That is a commodity market."],
      ["A ban on trade with a particular country", "That is an embargo."],
    ],
    answer: "A",
    explanation: "A trading bloc is an agreement among countries to remove or reduce barriers to trade between members.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which trading bloc has its headquarters in Gaborone, Botswana?",
    options: [
      ["SADC", "Correct: the Southern African Development Community."],
      ["COMESA", "COMESA's headquarters is in Lusaka, Zambia."],
      ["ECOWAS", "ECOWAS is based in Abuja, Nigeria."],
      ["The EU", "The EU's main institutions are in Brussels."],
    ],
    answer: "A",
    explanation: "SADC is headquartered in Gaborone; Zimbabwe is a member.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a **customs union**, member countries:",
    options: [
      ["trade freely and charge a common tariff on non-members", "Correct: this is what distinguishes a customs union from a free trade area."],
      ["keep their own different tariffs on non-members", "That describes a free trade area."],
      ["share a single currency and central bank", "That is a monetary union."],
      ["ban all imports from non-member countries", "Imports from non-members are taxed, not banned."],
    ],
    answer: "A",
    explanation: "Free trade area + common external tariff = customs union.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which country is a member of ECOWAS?",
    options: [
      ["Ghana", "Correct: Ghana is in West Africa and a member of ECOWAS."],
      ["Zimbabwe", "Zimbabwe is in southern Africa: SADC and COMESA."],
      ["Botswana", "Botswana is a SADC member."],
      ["Zambia", "Zambia belongs to SADC and COMESA."],
    ],
    answer: "A",
    explanation: "ECOWAS is the Economic Community of West African States (e.g. Nigeria, Ghana, Senegal).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of a trading bloc to a **business** in a member country?",
    options: [
      ["A larger market for its goods without tariffs", "Correct: more sales and economies of scale."],
      ["Less competition from firms in other members", "Competition usually increases."],
      ["Higher tariffs on its imported raw materials", "Tariffs between members fall."],
      ["More tariff revenue for its own government", "Governments lose tariff revenue, and this is not a business benefit."],
    ],
    answer: "A",
    explanation: "Businesses gain a larger tariff-free market and cheaper inputs, but face more competition.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a small Zimbabwean manufacturer **lose** from joining a regional free trade area?",
    options: [
      ["Larger, cheaper producers from other members can sell in Zimbabwe without tariffs", "Correct: the protection tariffs gave is removed."],
      ["It can sell its products to other member countries without paying tariffs", "This is a benefit."],
      ["Its imported inputs from members become cheaper", "This is a benefit."],
      ["Border procedures with members become simpler", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Removing tariffs exposes local firms to competition from more efficient regional producers.",
    hints: ["Three options are benefits."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A member of a customs union buys cloth from a more expensive member rather than a cheaper non-member, because the non-member's cloth faces the common tariff. This is called:",
    options: [
      ["trade diversion", "Correct: trade is diverted from the cheapest producer to a member."],
      ["trade creation", "Trade creation is new trade from removing barriers between members."],
      ["dumping", "Dumping is selling abroad below cost."],
      ["retaliation", "Retaliation is responding to another country's restrictions."],
    ],
    answer: "A",
    explanation: "Trade diversion is a disadvantage of trading blocs: buying from a less efficient member because of the external tariff.",
    hints: ["Has new trade been created, or has existing trade moved?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe is a member of both SADC and COMESA.",
    answer: true,
    explanation: "True. Zimbabwe belongs to both regional blocs (and to the African Union).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a free trade area, member countries must charge the same tariff on imports from non-members.",
    answer: false,
    explanation: "False. In a free trade area each member keeps its own external tariffs; a common external tariff makes it a customs union.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of economic integration with its feature.",
    pairs: [
      ["Free trade area", "No tariffs between members; own tariffs on non-members"],
      ["Customs union", "Adds a common external tariff"],
      ["Common market", "Adds free movement of labour and capital"],
      ["Economic and monetary union", "Adds common economic policies and a single currency"],
    ],
    explanation: "Each stage adds a feature to the one before.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each trading bloc with its region.",
    pairs: [["SADC", "Southern Africa"], ["ECOWAS", "West Africa"], ["EU", "Europe"], ["AU", "The whole of Africa"]],
    explanation: "SADC: southern Africa; ECOWAS: West Africa; EU: Europe; AU: the continent.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "To sell goods at the reduced duty within a trading bloc, an exporter needs a {{blank:a}} showing where the goods were made. Governments of members lose {{blank:b}} revenue when tariffs are removed.",
    blanks: [
      { id: "a", accepted: ["certificate of origin"], choices: ["certificate of origin", "bill of lading", "credit note", "receipt"] },
      { id: "b", accepted: ["tariff"], choices: ["tariff", "sales", "profit", "rent"] },
    ],
    explanation: "Rules of origin are checked with certificates of origin; removing tariffs cuts customs revenue.",
  });
  b.short({
    d: 2,
    stem: "Give the full name of SADC.",
    accepted: ["Southern African Development Community", "the Southern African Development Community", "Southern Africa Development Community"],
    wrong: ["Southern African Customs Union"],
    explanation: "SADC = Southern African Development Community.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages to Zimbabwe of being a member of SADC.",
    points: [
      "Advantage 1, e.g. larger market for Zimbabwean exports (1)",
      "Explained, e.g. reduced duty makes products competitive in neighbouring countries (1)",
      "Advantage 2, e.g. cheaper imports / co-operation on infrastructure / bargaining power / investment (1)",
      "Explained (1)",
    ],
    modelAnswer: "Zimbabwean firms can sell to other SADC countries at reduced or zero duty, so a much larger market is open to them and they can produce on a larger scale. Members also co-operate on regional roads, railways and power, which lowers the cost of moving Zimbabwe's goods to ports.",
    explanation: "Each advantage should be explained and linked to Zimbabwe.",
    hints: ["Think about markets, inputs and infrastructure."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** disadvantages of trading blocs for a member country.",
    points: [
      "Disadvantage 1, e.g. local firms face stronger competition (1)",
      "Explained, e.g. closures and job losses (1)",
      "Disadvantage 2, e.g. loss of tariff revenue / trade diversion / loss of independence / unequal benefits (1)",
      "Explained (1)",
    ],
    modelAnswer: "Local firms lose the protection of tariffs and must compete with more efficient firms from other members, so some may close and workers lose jobs. The government also loses the customs revenue it used to collect on imports from members, so it has less to spend or must raise other taxes.",
    explanation: "Credit any two developed disadvantages.",
    hints: ["What protection do local firms lose?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Kwekwe Paints, a fictional manufacturer, sells only in Zimbabwe. Its products meet the regional rules of origin. A large paint manufacturer from another SADC country has started selling in Zimbabwe at lower prices.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Why can the foreign manufacturer sell in Zimbabwe at reduced duty?",
        options: [["Both countries are members of the same trading bloc", "Correct: tariffs between members are reduced."], ["Zimbabwe has banned locally made paint", "There is no such ban."], ["The foreign firm pays no taxes in its own country at all", "It still pays taxes in its own country."], ["Paint is an invisible export", "Paint is a visible good."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State **two** ways Zimbabwean consumers could benefit.",
        points: ["Lower prices (1)", "More choice / better quality through competition (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** opportunity membership of the bloc gives Kwekwe Paints.",
        points: ["Identifies, e.g. export to other members at reduced duty (1)", "Explains, e.g. larger market (1)", "Effect, e.g. economies of scale lower its costs (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend how Kwekwe Paints should respond to the new competition. Justify your answer.",
        points: [
          "Option, e.g. cut costs / improve efficiency (1)",
          "Option, e.g. export to neighbouring markets / differentiate (quality, local service, colours) (1)",
          "Analysis of an option's benefit (1)",
          "Analysis of an option's cost or risk (1)",
          "Recommendation (1)",
          "Justified in context (1)",
        ],
        modelAnswer: "Kwekwe Paints could cut prices to match the competitor, but as a smaller firm it may not survive a price war. It could instead differentiate: offer colour-mixing, delivery and advice to local builders, which a foreign firm cannot easily match. It can also use the bloc's reduced duties to export to neighbouring countries, gaining the sales volume to lower its costs. I recommend differentiation at home combined with careful exports, because this uses its local knowledge and the bloc's opportunities instead of competing only on price.",
      }),
    ],
    explanation: "A trading bloc brings both a threat (regional competitors) and an opportunity (regional markets) to local firms.",
    hints: ["What can a local firm offer that a foreign one cannot?", "How can the firm use the bloc to its own advantage?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Three neighbouring countries, A, B and C, agree to remove all tariffs on trade between them. Country A keeps a 20% tariff on imported cloth from non-members, Country B charges 10% and Country C charges 15%.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name this stage of economic integration.",
        accepted: ["free trade area", "a free trade area", "free trade zone", "FTA"],
        wrong: ["customs union", "common market"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain what the three countries would need to change to form a customs union.",
        points: ["Agree a common external tariff (1)", "Same tariff on cloth from non-members in all three (1)", "Explains why: stops imports entering through the lowest-tariff member (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **one** advantage and **one** disadvantage of the agreement for a cloth importer in Country A.",
        points: ["Advantage identified, e.g. cloth from B and C now duty-free (1)", "Explained (1)", "Disadvantage identified, e.g. competition from importers in B / complex rules of origin (1)", "Explained (1)"],
      }),
    ],
    explanation: "Removing tariffs between members with separate external tariffs is a free trade area; a common external tariff makes it a customs union.",
    hints: ["Do the members charge the same tariff on non-members?"],
  });
  b.card("DEFINITION", "Trading bloc", "Group of countries that reduce or remove trade barriers between members.");
  b.card("DEFINITION", "Free trade area", "No tariffs between members; each keeps its own tariffs on non-members.");
  b.card("DEFINITION", "Customs union", "Free trade area plus a common external tariff on non-members.");
  b.card("DEFINITION", "Common market", "Customs union plus free movement of labour and capital.");
  b.card("FACT", "SADC", "Southern African Development Community; headquarters Gaborone; members include Zimbabwe, South Africa, Botswana, Zambia, Mozambique.");
  b.card("FACT", "COMESA", "Common Market for Eastern and Southern Africa; headquarters Lusaka; members include Zimbabwe, Zambia, Malawi, Kenya.");
  b.card("FACT", "ECOWAS", "Economic Community of West African States; headquarters Abuja; members include Nigeria, Ghana, Senegal.");
  b.card("CONCEPT", "Advantages of trading blocs", "Larger markets, economies of scale, cheaper inputs, lower prices, more choice, bargaining power, co-operation.");
  b.card("CONCEPT", "Disadvantages of trading blocs", "More competition for local firms, lost tariff revenue, trade diversion, loss of independence, unequal benefits.");
});
