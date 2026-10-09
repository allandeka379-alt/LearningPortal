// W1b: globalisation — reasons, opportunities and threats (Cambridge 0264 6.2.1; tariffs and quotas are in protectionism).
import { concept, P } from "../lib.mjs";

concept("bus.economy.globalisation", { file: "economy/globalisation", keyPrefix: "economy.globalisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is globalisation?",
    options: [
      ["The growing integration of the world's economies", "Correct: the world increasingly acts as one market."],
      ["A government policy of buying only goods made locally", "That is a protectionist or 'buy local' policy, the opposite of globalisation."],
      ["The growth of a business by opening branches in one town", "That is internal growth in a local market."],
      ["The movement of people from rural areas to towns", "That is urbanisation."],
    ],
    answer: "A",
    explanation: "**Globalisation** is the increasing integration of economies through trade in goods and services, flows of capital and people, and the spread of technology and ideas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **reason** for globalisation?",
    options: [
      ["Cheaper and faster international transport", "Correct: container ships and air freight make it cheaper to move goods between continents."],
      ["Higher import tariffs between countries", "Higher tariffs reduce trade; free trade agreements lower them."],
      ["Fewer people using the internet", "Wider internet use, not less, drives globalisation."],
      ["Countries producing everything they need themselves", "Self-sufficiency reduces trade between countries."],
    ],
    answer: "A",
    explanation: "Reasons for globalisation: improved transport links, technological change including communication, free trade agreements and newly industrialised countries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do free trade agreements encourage globalisation?",
    options: [
      ["They reduce barriers such as tariffs between member countries", "Correct: lower barriers make trading across borders cheaper and easier."],
      ["They require every country to use one currency", "Free trade agreements do not require a single currency."],
      ["They ban multinational companies", "They do not ban multinationals; they often encourage investment."],
      ["They set the minimum wages paid by employers in every member country", "Wages are not set by free trade agreements."],
    ],
    answer: "A",
    explanation: "A free trade agreement removes or reduces tariffs and quotas between members, so firms can sell into a bigger market on better terms.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A Zimbabwean clothing factory now faces cheaper imported clothes in local shops. For the factory this is:",
    options: [
      ["a threat of globalisation", "Correct: more competition from imports can cut its sales and prices."],
      ["an opportunity of globalisation", "Cheaper rival imports are a danger to its sales, not an opportunity."],
      ["a reason for globalisation", "Reasons are causes such as transport and technology; this is an effect."],
      ["an import quota", "A quota limits imports; here imports have increased."],
    ],
    answer: "A",
    explanation: "Increased competition from imports is a key **threat** of globalisation to local producers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a newly industrialised country (NIC)?",
    options: [
      ["A country whose economy has moved rapidly towards manufacturing and trade", "Correct: NICs have industrialised quickly and trade heavily with the world."],
      ["A country that has just gained independence", "Independence is not what defines an NIC."],
      ["A country that relies only on subsistence farming for its income", "That describes a less developed, mainly agricultural economy."],
      ["A country that has banned all imports to protect its industries", "NICs trade heavily with other countries."],
    ],
    answer: "A",
    explanation: "NICs produce large quantities of manufactured goods at low cost and have growing consumer markets, so they are both competitors and new markets.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A tea estate in the Eastern Highlands starts selling packed tea online to buyers in other countries. Which reason for globalisation has made this easiest?",
    options: [
      ["Technological change, including communication", "Correct: the internet and e-commerce let it reach foreign buyers directly."],
      ["The rise of newly industrialised countries", "NICs are a source of competition and markets; the online selling depends on technology."],
      ["Higher import tariffs", "Tariffs make trade harder, not easier."],
      ["Lower interest rates charged by local banks", "Interest rates are not a reason for globalisation in the syllabus."],
    ],
    answer: "A",
    hints: ["How does the estate reach its foreign buyers?"],
    explanation: "The internet, mobile communication and electronic payments let even small firms find foreign customers, take orders and receive payment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can globalisation help a business achieve economies of scale?",
    options: [
      ["It can sell to a much larger market and so produce more", "Correct: higher output spreads fixed costs and allows bulk buying."],
      ["It guarantees the business a monopoly in every market", "Globalisation usually increases competition."],
      ["It removes all transport costs", "Transport costs fall but do not disappear."],
      ["It means the business can stop advertising its products", "Firms still need to promote their products in new markets."],
    ],
    answer: "A",
    hints: ["What happens to average cost when output rises?"],
    explanation: "Access to world markets allows larger output, so average costs fall through economies of scale (bulk buying, spreading fixed costs, specialised machinery).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Improved transport links are one of the reasons for globalisation.",
    answer: true,
    explanation: "True. Container ships, larger aircraft and better road and rail links have cut the cost and time of moving goods between countries.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Globalisation brings only opportunities, and no threats, to businesses in developing countries.",
    answer: false,
    explanation: "False. It brings new markets and cheaper inputs, but also more competition from imports and multinationals, takeover risks and exposure to exchange-rate changes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each development with how it encourages globalisation.",
    pairs: [
      ["Container shipping", "Cuts the cost of moving goods between continents"],
      ["The internet and e-commerce", "Lets firms find and serve foreign customers"],
      ["A regional free trade agreement", "Removes tariffs between member countries"],
      ["Rapid industrial growth in some countries", "Creates low-cost producers and new markets"],
    ],
    explanation: "These are the four reasons in the syllabus: transport links, technology and communication, free trade agreements and newly industrialised countries.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Lower costs from buying materials worldwide are an {{blank:a}} of globalisation, while more competition from imports is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["opportunity"], choices: ["opportunity", "threat", "reason"] },
      { id: "b", accepted: ["threat"], choices: ["opportunity", "threat", "reason"] },
    ],
    explanation: "Opportunities include cheaper inputs and new markets; threats include stronger competition.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a business with its headquarters in one country and operations in several countries.",
    accepted: ["multinational company", "multinational", "MNC", "multinational corporation", "multinational enterprise"],
    wrong: ["franchise", "conglomerate"],
    explanation: "A **multinational company (MNC)** operates in more than one country; MNCs both result from and drive globalisation.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** opportunities that globalisation offers a Zimbabwean manufacturer of cooking oil.",
    points: [
      "New export markets in other countries.",
      "So higher sales and risk spread across markets.",
      "Cheaper inputs (e.g. machinery, packaging) from the lowest-cost suppliers worldwide.",
      "So lower costs and higher profit or lower prices (or: economies of scale / new technology / partnerships).",
    ],
    hints: ["Think about selling abroad and buying abroad."],
    modelAnswer: "The manufacturer can export cooking oil to neighbouring countries, increasing sales and spreading its risk across several markets. It can also buy machinery and packaging from the cheapest suppliers worldwide, lowering its costs.",
    explanation: "Opportunities: new markets, cheaper inputs, economies of scale, new technology, partnerships. Each needs an applied consequence.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** threats that globalisation poses to a small Zimbabwean furniture maker.",
    points: [
      "More competition from cheap imported furniture.",
      "So lower sales or pressure to cut prices and profit.",
      "Competition from multinationals for skilled workers / for retail space.",
      "So higher wage costs or loss of staff; or exchange-rate risk if importing materials.",
    ],
    hints: ["Who are the new competitors?"],
    modelAnswer: "Cheap imported furniture competes with the maker's products, so it may sell less or have to cut prices and profit. Large foreign firms may also attract its skilled carpenters with higher pay, raising its wage costs.",
    explanation: "Threats: stronger competition, competition for resources, takeover, exchange-rate risk, dependence on distant suppliers.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
    stem: "Sunrise Biscuits is a fictional private limited company in Harare that sells biscuits to supermarkets in Zimbabwe. Imported biscuits from a newly industrialised country now cost less than Sunrise's biscuits. Zimbabwe is a member of a regional free trade agreement, and Sunrise's directors are thinking about exporting to neighbouring countries.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** reasons for globalisation shown in the case.",
        points: ["Newly industrialised countries.", "Free trade agreements."],
        modelAnswer: "Newly industrialised countries; free trade agreements.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **one** opportunity and **one** threat of globalisation for Sunrise Biscuits.",
        points: [
          "Opportunity: export to neighbouring countries through the free trade agreement.",
          "Explains: tariff-free access means a larger market, more sales and economies of scale.",
          "Threat: cheaper imported biscuits in Zimbabwean supermarkets.",
          "Explains: Sunrise may lose sales or have to cut prices, reducing profit.",
        ],
        modelAnswer: "Opportunity: the free trade agreement lets Sunrise export to neighbouring countries without tariffs, giving it a larger market and more sales. Threat: cheaper imported biscuits compete in Zimbabwean supermarkets, so Sunrise may lose sales or have to cut its prices and profit.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Sunrise should start exporting. Justify your answer.",
        points: [
          "For: larger market and sales; spreads risk.",
          "For: economies of scale lower average cost, helping to compete with imports at home.",
          "Against: export costs (transport, marketing, distribution partners).",
          "Against: competition from the same low-cost producers abroad / exchange-rate risk / knowledge of foreign markets.",
          "Weighs points for this company.",
          "Justified recommendation.",
        ],
        modelAnswer: "Exporting would give Sunrise a larger market, spreading its risk if sales fall at home, and higher output would bring economies of scale that lower its average cost and help it compete with imports. However, it would face transport and marketing costs, would need distributors abroad, and may meet the same low-cost rivals there. Because the free trade agreement removes tariffs and its home market is already under threat, I recommend starting with one neighbouring country, where it can test demand at low risk before expanding.",
      }),
    ],
    hints: ["(a) Look for two of the four reasons in the case.", "(c) Weigh the gains of a larger market against the costs and risks."],
    explanation: "Globalisation creates both export opportunities (free trade agreements, scale) and threats (cheaper imports from NICs); a phased approach limits risk.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "\"Globalisation is good for large businesses but bad for small businesses.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** ways in which large businesses benefit from globalisation.",
        points: [
          "Can afford to set up operations or export to many countries.",
          "So they gain large new markets and economies of scale.",
          "Can buy inputs worldwide in bulk / locate where costs are lowest.",
          "So their costs fall and they can compete on price.",
        ],
        modelAnswer: "Large businesses have the capital to export or set up operations in many countries, giving them huge markets and economies of scale. They can also buy inputs in bulk from the cheapest suppliers worldwide and produce where costs are lowest, so their costs fall.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Do you agree with the statement? Justify your answer.",
        points: [
          "Agree: small firms face cheaper imports and powerful multinationals.",
          "Agree: small firms lack capital to export or to cut costs.",
          "Disagree: e-commerce lets small firms reach foreign customers cheaply.",
          "Disagree: small firms can buy cheaper inputs and serve niches large firms ignore.",
          "Disagree: large firms also face strong global competition.",
          "Justified conclusion.",
        ],
        modelAnswer: "Small businesses often lose out because cheaper imports and multinationals compete with them, and they lack the capital to export or invest in cost-cutting machinery. However, the internet and e-commerce let small firms, such as craft makers, reach foreign customers cheaply, they can buy cheaper inputs from abroad, and they can serve local niches that large firms ignore. Large firms also face fierce global rivals. I partly agree: large firms gain more easily, but small firms that use technology and specialise can also benefit.",
      }),
    ],
    hints: ["(b) Give both sides before deciding."],
    explanation: "Large firms gain markets and scale; small firms face competition but can use e-commerce and niches. The balance depends on how each firm responds.",
  });
  b.card("DEFINITION", "What is **globalisation**?", "The increasing worldwide integration of economies through trade, investment, movement of people and the spread of technology.");
  b.card("FACT", "Four reasons for globalisation (0264)?", "Improved transport links; technological change including communication; free trade agreements; newly industrialised countries.");
  b.card("DEFINITION", "What is a **free trade agreement**?", "An agreement between countries to reduce or remove trade barriers, such as tariffs and quotas, between them.");
  b.card("DEFINITION", "What is a **newly industrialised country**?", "A country whose economy has quickly moved from agriculture and raw materials towards manufacturing and world trade.");
  b.card("FACT", "Opportunities of globalisation for a business?", "New markets, cheaper inputs, economies of scale, production abroad, new technology, partnerships.");
  b.card("FACT", "Threats of globalisation for a business?", "More competition from imports and multinationals, competition for workers, takeovers, exchange-rate risk, dependence on distant suppliers.");
  b.card("CONCEPT", "How can a local firm respond to cheaper imports?", "Improve quality and efficiency, focus on a niche, market its local advantage, export, form partnerships.");
  b.card("CONCEPT", "How does technology drive globalisation?", "The internet, mobile communication and e-payments let firms find, serve and be paid by customers anywhere.");
});
