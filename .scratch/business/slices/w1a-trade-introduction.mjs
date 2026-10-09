// W1a: introduction to trade (COM).
import { concept, P } from "../lib.mjs";

concept("bus.trade.introduction", { file: "trade/introduction", keyPrefix: "trade.introduction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **barter**?",
    options: [
      ["Exchanging goods directly for other goods", "Correct: barter is exchange without money."],
      ["Buying goods on credit from a shop", "That is credit trading, which uses money."],
      ["Selling goods to buyers in another country", "That is export trade."],
      ["Buying in bulk and selling in small amounts", "That is what a wholesaler does."],
    ],
    answer: "A",
    explanation: "Barter is the direct exchange of goods or services for other goods or services without using money.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a branch of **home** trade?",
    options: [
      ["Wholesale trade", "Correct: home trade is made up of retail and wholesale trade."],
      ["Entrepot trade", "Entrepot trade (re-exporting) is part of foreign trade."],
      ["Export trade", "Exporting is foreign trade."],
      ["Import trade", "Importing is foreign trade."],
    ],
    answer: "A",
    explanation: "Home trade: retail and wholesale. Foreign trade: import, export and entrepot.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tendai has goats and wants a bicycle. The bicycle owner wants a radio, not goats. Which problem of barter does this show?",
    options: [
      ["Lack of a double coincidence of wants", "Correct: each trader must want exactly what the other has."],
      ["Indivisibility of some goods", "Indivisibility is about goods that cannot be divided, such as a cow."],
      ["Difficulty in storing wealth", "Storage is not the problem described here."],
      ["No standard for deferred payment", "Nothing is being borrowed or paid later."],
    ],
    answer: "A",
    explanation: "Barter needs a double coincidence of wants. Money solves this: Tendai can sell his goats to anyone for money and buy the bicycle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which function of money allows the prices of a cow and a bag of maize to be compared easily?",
    options: [
      ["Measure of value", "Correct: money acts as a common unit of account for comparing values."],
      ["Store of value", "This allows saving, not comparing prices."],
      ["Standard of deferred payment", "This concerns paying debts later."],
      ["Medium of exchange", "This concerns accepting money in payment, not comparing values."],
    ],
    answer: "A",
    explanation: "Money as a measure of value (unit of account) gives every good a price, solving barter's lack of a common measure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Importing goods and then re-exporting them to other countries is called:",
    options: [
      ["entrepot trade", "Correct: the goods pass through the country to other markets."],
      ["wholesale trade", "Wholesaling is buying in bulk and selling to retailers at home."],
      ["retail trade", "Retailing sells to final consumers."],
      ["visible trade", "Visible trade means trade in goods; it is not specific to re-exports."],
    ],
    answer: "A",
    explanation: "Entrepot trade is importing goods to re-export them, often after storing, sorting or repacking.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which aid to trade overcomes the problem that goods are produced long before they are needed?",
    options: [
      ["Warehousing", "Correct: warehousing bridges the gap in time between production and consumption."],
      ["Transport", "Transport bridges distance, not time."],
      ["Advertising", "Advertising informs and persuades buyers."],
      ["Communication", "Communication lets buyers and sellers contact each other."],
    ],
    answer: "A",
    explanation: "Warehousing stores goods (for example harvested maize) until they are needed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does specialisation make trade necessary?",
    options: [
      ["Specialists produce a surplus of one good and none of others", "Correct: they must exchange the surplus for what they lack."],
      ["Specialists produce everything they need themselves", "That describes direct production, not specialisation."],
      ["Specialisation makes money unnecessary as a medium of exchange", "Specialisation increases the use of money in trade."],
      ["Specialists never sell any of their output", "Specialists sell their output; that is the point of specialising."],
    ],
    answer: "A",
    explanation: "Specialisation creates surpluses and shortages for each person. Trade lets people exchange their surplus for the things they do not make.",
    hints: ["What does a specialist have too much of, and what do they lack?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Insurance, banking and advertising are aids to trade.",
    answer: true,
    explanation: "True. The aids to trade are transport, communication, banking, insurance, warehousing and advertising.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A wholesaler in Bulawayo that sells imported rice to local shops is engaged in foreign trade.",
    answer: false,
    explanation: "False. Selling to local shops is wholesale trade, a branch of home trade, even if the goods were imported. The importer is engaged in foreign trade.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem of barter with the function of money that solves it.",
    pairs: [
      ["Double coincidence of wants", "Medium of exchange"],
      ["No common measure of value", "Unit of account (measure of value)"],
      ["Perishable goods cannot be saved", "Store of value"],
      ["Debts are hard to measure", "Standard of deferred payment"],
    ],
    explanation: "Each function of money removes one of the main problems of barter.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each activity with its branch of trade.",
    pairs: [
      ["A tuck shop sells bread to a family", "Retail trade"],
      ["A cash and carry sells cases of soap to tuck shops", "Wholesale trade"],
      ["A Zimbabwean farmer sells tobacco to a buyer overseas", "Export trade"],
      ["A Harare dealer buys tractors from abroad", "Import trade"],
    ],
    explanation: "Retail and wholesale are home trade; exports and imports are foreign trade.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Trade within one country is called {{blank:a}} trade, while trade between countries is called {{blank:b}} trade.",
    blanks: [
      { id: "a", accepted: ["home"], choices: ["home", "foreign", "entrepot", "visible"] },
      { id: "b", accepted: ["foreign"], choices: ["home", "foreign", "retail", "wholesale"] },
    ],
    explanation: "Home (domestic) trade happens within a country; foreign (international) trade happens between countries.",
  });
  b.short({
    d: 2,
    stem: "Name the aid to trade that moves goods from producers to consumers in different places.",
    accepted: ["transport", "transportation"],
    wrong: ["warehousing", "communication"],
    explanation: "Transport bridges the distance between producer and consumer.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** problems of barter, giving an example of each.",
    points: [
      "Problem 1 named, e.g. double coincidence of wants (1)",
      "Example/explanation, e.g. a farmer with maize must find someone with shoes who wants maize (1)",
      "Problem 2 named, e.g. indivisibility / no measure of value / storage (1)",
      "Example/explanation, e.g. a cow cannot be divided to buy a small item (1)",
    ],
    modelAnswer: "First, barter needs a double coincidence of wants: a farmer with maize who wants shoes must find a shoemaker who wants maize. Second, some goods are indivisible: a cow cannot be cut into pieces to buy a few plates without losing its value.",
    explanation: "Name each problem precisely and give an example that shows it.",
    hints: ["What must both traders want?", "Can every good be divided?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how **banking** and **insurance** each help trade to take place.",
    points: [
      "Banking provides safe, quick ways of paying (transfers, cards, cheques) (1)",
      "Banks lend to traders, financing stock and expansion (1)",
      "Insurance compensates traders for loss or damage to goods (1)",
      "So traders are willing to take the risks of transporting and storing goods (1)",
    ],
    modelAnswer: "Banks let buyers and sellers pay each other safely without carrying cash, even over long distances, and they lend money so that traders can buy stock before they sell it. Insurance compensates traders if goods are stolen, damaged or destroyed, so they are willing to take the risks of moving and storing goods.",
    explanation: "For each aid, say what it provides and how that makes trade easier or less risky.",
    hints: ["Think about payment and finance for banks.", "Think about risk for insurance."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "In a remote village in Binga district, few people have cash. Families often exchange fish from Lake Kariba for maize, and pay for ploughing with goats. A mobile network operator has recently started offering mobile money in the area.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the type of exchange the families use.",
        accepted: ["barter", "barter trade", "bartering"],
        wrong: ["retail", "credit"],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Fish rot quickly. Which problem of barter does this create?",
        options: [["Difficulty of storing wealth", "Correct: perishable goods cannot be kept as savings."], ["Lack of a double coincidence of wants", "This concerns finding a suitable trading partner."], ["Indivisibility", "Fish can easily be divided."], ["Bulkiness of goods", "The problem described is perishability, not bulk."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** functions money would perform for the villagers.",
        points: ["Function 1 named, e.g. medium of exchange (1)", "Applied, e.g. fish can be sold to anyone and the money used to buy maize (1)", "Function 2 named, e.g. store of value / measure of value (1)", "Applied, e.g. savings kept in mobile money instead of rotting fish (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether mobile money is likely to replace barter in the village.",
        points: [
          "Mobile money removes the need for a double coincidence of wants (1)",
          "Value can be stored safely and sent over distances (1)",
          "Limits: network coverage / phones / charging (1)",
          "Limits: transaction charges / low trust / habit and social ties of barter (1)",
          "Conclusion (1)",
          "Justified, e.g. barter will decline but continue for small local exchanges (1)",
        ],
        modelAnswer: "Mobile money would let villagers sell fish to anyone, store value safely and pay for ploughing without finding someone who wants goats, so trade becomes easier. However, not every family has a phone, network coverage and charging may be poor, and transaction charges can be high compared with small exchanges. Barter is also a familiar custom between neighbours. Mobile money is likely to replace barter for most trade with outsiders, but barter will probably continue for small exchanges within the village.",
      }),
    ],
    explanation: "The villagers use barter. Money as a medium of exchange and store of value removes barter's problems, but access, costs and custom limit how fast it is adopted.",
    hints: ["Which problems does money solve?", "What does a family need before it can use mobile money?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "A fictional company, Kariba Traders, imports cooking oil from a neighbouring country. It stores the oil in its warehouse in Harare, sells it in bulk to supermarkets and tuck shops, and sends some of it on to customers in Malawi.",
    parts: [
      P.fib({
        label: "(a)", marks: 3,
        stem: "Identify the branch of trade for each activity.",
        template: "Buying oil from a neighbouring country: {{blank:a}} trade. Selling in bulk to supermarkets: {{blank:b}} trade. Sending the imported oil to Malawi: {{blank:c}} trade.",
        blanks: [
          { id: "a", accepted: ["import"], choices: ["import", "export", "entrepot", "wholesale", "retail"] },
          { id: "b", accepted: ["wholesale"], choices: ["import", "export", "entrepot", "wholesale", "retail"] },
          { id: "c", accepted: ["entrepot"], choices: ["import", "export", "entrepot", "wholesale", "retail"] },
        ],
        wrong: [["import", "retail", "export"]],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** aids to trade Kariba Traders uses, other than warehousing.",
        points: ["Transport (1)", "Any other, e.g. insurance, banking, communication, advertising (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why warehousing is important to Kariba Traders.",
        points: ["Stores oil until customers need it (1)", "Allows bulk buying / steady supply to shops (1)", "Protects goods from damage/theft (1)"],
      }),
    ],
    explanation: "Buying from abroad is import trade; selling in bulk is wholesale; re-exporting imported goods is entrepot trade.",
    hints: ["Selling in bulk to shops is home trade.", "Goods imported and sent on to another country are re-exported."],
  });
  b.card("DEFINITION", "Trade", "The buying and selling (exchange) of goods and services.");
  b.card("DEFINITION", "Barter", "Direct exchange of goods or services without money.");
  b.card("FACT", "Problems of barter", "Double coincidence of wants, no common measure of value, indivisibility, storing wealth, deferred payment, bulky goods.");
  b.card("FACT", "Functions of money", "Medium of exchange, measure of value (unit of account), store of value, standard of deferred payment.");
  b.card("CONCEPT", "Branches of trade", "Home trade: retail and wholesale. Foreign trade: import, export and entrepot.");
  b.card("DEFINITION", "Entrepot trade", "Importing goods in order to re-export them to other countries.");
  b.card("FACT", "Aids to trade", "Transport, communication, banking, insurance, warehousing and advertising.");
  b.card("CONCEPT", "Why people trade", "Specialisation creates surpluses; trade exchanges them for goods not produced, raising living standards.");
  b.card("DEFINITION", "Double coincidence of wants", "In barter, each trader must want what the other offers at the same time.");
});
