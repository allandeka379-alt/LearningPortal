// W1a: foreign trade: reasons, difficulties, entrepot trade, intermediaries (COM).
import { concept, P } from "../lib.mjs";

concept("bus.trade.foreign-trade", { file: "trade/foreign-trade", keyPrefix: "trade.foreign-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Goods bought by Zimbabwe from other countries are called:",
    options: [
      ["imports", "Correct: imports are bought from abroad."],
      ["exports", "Exports are sold to other countries."],
      ["re-exports", "Re-exports are imported goods sent on to other countries."],
      ["invisibles", "Invisibles are services, not goods bought from abroad as such."],
    ],
    answer: "A",
    explanation: "Imports are goods and services bought from other countries; exports are sold to them.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An intermediary who earns **commission** by acting for a principal without owning the goods is:",
    options: [
      ["an agent", "Correct: agents act on behalf of others and earn commission."],
      ["a merchant", "A merchant buys the goods and earns profit on resale."],
      ["an importer", "An importer buys goods from abroad on its own account."],
      ["a wholesaler", "A wholesaler buys and resells goods at home."],
    ],
    answer: "A",
    explanation: "Agents, brokers and factors earn commission; merchants own the goods and earn profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Zimbabwe imports fuel mainly because:",
    options: [
      ["it has no oil fields of its own", "Correct: countries import what their resources cannot provide."],
      ["it wants to save foreign currency", "Imports use up foreign currency rather than save it."],
      ["fuel is a service, not a good", "Fuel is a good."],
      ["all imports are cheaper than local goods", "Not all imports are cheaper; fuel is imported because it is not produced locally."],
    ],
    explanation: "Differences in natural resources are a main reason for trade: countries import goods they cannot produce.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which agent guarantees that the buyers it finds will pay, in return for extra commission?",
    options: [
      ["A del credere agent", "Correct: it accepts the risk of bad debts."],
      ["A broker", "A broker brings buyers and sellers together but gives no guarantee."],
      ["A clearing and forwarding agent", "This agent handles customs and transport."],
      ["An indent house", "An indent house buys goods on receipt of a foreign order."],
    ],
    answer: "A",
    explanation: "A del credere agent guarantees payment and earns an extra (del credere) commission.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a difficulty faced by an exporter that is **not** usually faced in home trade?",
    options: [
      ["Converting payment between different currencies", "Correct: home trade uses one currency."],
      ["Customers who delay paying their debts for months", "Late payment can happen in home trade too."],
      ["Competition from other sellers", "Competition exists in home trade as well."],
      ["Paying for transport to customers", "Home traders also pay transport costs."],
    ],
    answer: "A",
    explanation: "Currency conversion, different languages, laws and customs procedures are particular to foreign trade.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do Zimbabwean exporters often face higher transport costs than exporters in coastal countries?",
    options: [
      ["Zimbabwe is landlocked, so goods cross other countries to reach a port", "Correct: road or rail transit to Beira, Durban or Dar es Salaam adds cost and delay."],
      ["Zimbabwe has no road or rail links with any of its neighbouring countries", "Zimbabwe has road and rail links with its neighbours."],
      ["Exporters must use air freight for every product", "Most bulk exports go by road and rail."],
      ["Foreign buyers refuse to pay for any transport", "Who pays depends on the contract terms."],
    ],
    answer: "A",
    explanation: "Being landlocked means extra distance, border crossings, documents and transit charges.",
    hints: ["How does a container from Harare reach a ship?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A trader in Harare buys cotton lint from local ginners with her own money and sells it to spinners overseas at a higher price. She is acting as:",
    options: [
      ["an export merchant", "Correct: she buys on her own account and earns profit on resale."],
      ["an export agent", "An agent would not buy the goods with her own money."],
      ["a broker", "A broker only brings buyers and sellers together."],
      ["a confirming house", "A confirming house buys on behalf of foreign importers for commission."],
    ],
    answer: "A",
    explanation: "Owning the goods and earning profit (bearing the risk) is what makes her a merchant.",
    hints: ["Does she own the cotton before selling it?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Entrepot trade means importing goods in order to re-export them.",
    answer: true,
    explanation: "True. The goods pass through the entrepot centre, often after storage, sorting or repacking.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A broker owns the goods that it sells on behalf of its clients.",
    answer: false,
    explanation: "False. A broker brings buyers and sellers together and earns brokerage; it does not own or usually handle the goods.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each difficulty of foreign trade with a way of overcoming it.",
    pairs: [
      ["The buyer abroad may not pay", "Letter of credit or credit insurance"],
      ["Goods may be damaged on the long journey", "Marine or transit insurance"],
      ["The exporter does not speak the buyer's language", "Use an agent or translator in that country"],
      ["Customs procedures are complicated", "Use a clearing and forwarding agent"],
    ],
    explanation: "Specialist services exist to reduce each risk or barrier in foreign trade.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each intermediary with how it is rewarded.",
    pairs: [["Merchant", "Profit on goods it has bought and resold"], ["Broker", "Brokerage"], ["Del credere agent", "Commission plus extra for guaranteeing payment"], ["Clearing and forwarding agent", "Fees for handling customs and transport"]],
    explanation: "Only merchants own the goods and earn profit; the others are paid commission or fees.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Countries depend on each other for goods, markets and resources; this is called {{blank:a}}. Producing what a country is best at and trading for the rest is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["interdependence"], choices: ["interdependence", "protection", "indigenisation", "entrepot"] },
      { id: "b", accepted: ["specialisation"], choices: ["specialisation", "barter", "quota", "dumping"] },
    ],
    explanation: "Interdependence and specialisation are the basic reasons for international trade.",
  });
  b.short({
    d: 2,
    stem: "Name the type of trade in which a country imports goods and then re-exports them.",
    accepted: ["entrepot", "entrepot trade", "entrepôt trade", "re-export trade", "re-exporting"],
    wrong: ["export trade", "import trade"],
    explanation: "Entrepot (re-export) trade.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why countries engage in foreign trade.",
    points: [
      "Reason 1, e.g. differences in natural resources/climate (1)",
      "Explained with example, e.g. Zimbabwe imports fuel because it has no oil (1)",
      "Reason 2, e.g. specialisation / wider market / variety / foreign currency (1)",
      "Explained, e.g. exporters sell more, gaining economies of scale (1)",
    ],
    modelAnswer: "Countries have different natural resources and climates, so they must import goods they cannot produce: Zimbabwe imports fuel because it has no oil fields. Trade also lets countries specialise in what they produce best and sell to a much larger market, which raises output and earns foreign currency.",
    explanation: "Each reason should be explained, ideally with an example.",
    hints: ["Think about resources and specialisation."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** benefits to a country of being an entrepot centre.",
    points: [
      "Benefit 1, e.g. employment in warehousing, handling, transport (1)",
      "Explained (1)",
      "Benefit 2, e.g. income from storage/handling charges / growth of banking and insurance (1)",
      "Explained, e.g. earns foreign currency without producing the goods (1)",
    ],
    modelAnswer: "Entrepot trade creates jobs in ports, warehouses, transport and handling, because goods must be unloaded, stored, sorted and reloaded. It also earns income for banks, insurers and port authorities, often in foreign currency, even though the country did not produce the goods.",
    explanation: "Credit realistic benefits linked to the services entrepot trade needs.",
    hints: ["What happens to goods while they pass through?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Chimanimani Coffee, a fictional co-operative of small-scale growers, wants to export coffee to buyers in Europe for the first time. Its members know little about foreign markets or export procedures.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** reasons why exporting could benefit the co-operative.",
        points: ["Larger market / sell more (1)", "Higher prices / foreign currency earnings (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** difficulties the co-operative may face in exporting.",
        points: ["Difficulty 1, e.g. landlocked / distance to port (1)", "Explained, e.g. high transport cost and delays via Beira (1)", "Difficulty 2, e.g. payment risk / language / regulations / standards (1)", "Explained, e.g. may not be paid by an unknown buyer (1)"],
      }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which intermediary would handle customs clearance and arrange transport to the port?",
        options: [["A clearing and forwarding agent", "Correct: it deals with documents, customs and transport."], ["A del credere agent", "It finds buyers and guarantees payment."], ["A commodity broker", "A broker brings buyers and sellers together."], ["An export merchant in Harare", "A merchant buys the coffee on its own account."]],
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "The co-operative can either sell all its coffee to an export merchant in Harare or appoint an agent in Europe. Recommend which option it should choose. Justify your answer.",
        points: [
          "Merchant: co-operative is paid at once / no risk of foreign non-payment (1)",
          "Merchant: lower price, as the merchant takes a profit (1)",
          "Agent: higher price, co-operative keeps ownership and pays only commission (1)",
          "Agent: co-operative bears export risks, documents, payment delays (1)",
          "Recommendation (1)",
          "Justified, e.g. merchant suits a first-time exporter with little knowledge (1)",
        ],
        modelAnswer: "Selling to an export merchant means the co-operative is paid in Zimbabwe straight away and avoids the risks of transport, documents and foreign buyers who may not pay, but the merchant will pay less because it takes a profit. An agent in Europe could find buyers who pay higher prices, and the co-operative would keep the difference after paying commission, but it would bear the risks and must handle export procedures it does not understand. As a first-time exporter with little knowledge, the co-operative should sell through a merchant at first and consider an agent once members have learned the export process.",
      }),
    ],
    explanation: "Exporting widens the market but brings transport, payment and procedural difficulties. Merchants remove risk at a lower price; agents earn a higher price but leave the risk with the exporter.",
    hints: ["Who owns the coffee under each option?", "Who bears the risk of non-payment?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Farai imports spare parts for tractors from a manufacturer overseas and sells them to farmers in Mashonaland.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Explain **one** difficulty Farai faces as an importer.",
        points: ["Identifies, e.g. currency/exchange rate changes (1)", "Explains, e.g. the price in US dollars may rise between order and payment (1)", "Effect, e.g. lower profit or higher prices for farmers (1)"],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Farai sometimes sends parts on to buyers in Zambia without changing them. This part of his business is:",
        options: [["entrepot (re-export) trade", "Correct: imported goods re-exported."], ["home trade", "Selling to another country is not home trade."], ["direct production", "Direct production is for own use."], ["visible import (inward) trade", "Sending goods out of the country is not importing."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** ways Farai could reduce the risks of importing.",
        points: ["Way 1, e.g. insure goods in transit (1)", "Explained (1)", "Way 2, e.g. use a reliable supplier/letter of credit / clearing agent / agree prices in advance (1)", "Explained (1)"],
      }),
    ],
    explanation: "Importers face currency, transport, regulation and supplier risks; insurance, clearing agents and secure payment methods reduce them.",
    hints: ["What could go wrong between ordering and receiving the parts?"],
  });
  b.card("DEFINITION", "Foreign trade", "Exchange of goods and services between countries: imports, exports and entrepot trade.");
  b.card("FACT", "Reasons for foreign trade", "Different resources and climate, specialisation, goods not produced at home, larger markets, variety, foreign currency.");
  b.card("FACT", "Difficulties of foreign trade", "Distance, currencies, language, laws and customs procedures, payment risk, tastes and standards, restrictions, lack of information.");
  b.card("DEFINITION", "Entrepot trade", "Importing goods to re-export them, often after storage, sorting or repacking.");
  b.card("CONCEPT", "Merchant versus agent", "A merchant owns the goods and earns profit; an agent acts for a principal and earns commission.");
  b.card("DEFINITION", "Del credere agent", "Agent who guarantees that the buyers will pay, for extra commission.");
  b.card("DEFINITION", "Broker", "Brings buyers and sellers together (commodities, shipping, insurance) for brokerage; does not own goods.");
  b.card("DEFINITION", "Factor", "Agent with possession of the goods who sells in his own name and may advance money to the seller.");
  b.card("FACT", "Zimbabwe and foreign trade", "Landlocked: exports and imports travel by road or rail through neighbouring countries to seaports.");
});
