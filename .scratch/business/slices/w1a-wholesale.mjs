// W1a: wholesale trade, marketing boards, commodity markets (COM).
import { concept, P } from "../lib.mjs";

concept("bus.trade.wholesale", { file: "trade/wholesale", keyPrefix: "trade.wholesale" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **breaking bulk**?",
    options: [
      ["Dividing large quantities into smaller ones for sale", "Correct: the wholesaler buys in bulk and sells in smaller quantities."],
      ["Damaging goods while they are being transported", "Breaking bulk has nothing to do with damage."],
      ["Refusing to sell goods on credit to retailers", "That describes a cash and carry's credit policy."],
      ["Selling goods abroad in very large quantities", "That describes exporting in bulk."],
    ],
    answer: "A",
    explanation: "Breaking bulk is a key service of the wholesaler to the retailer: the retailer can buy a few cartons rather than a lorry-load.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A self-service warehouse where retailers choose goods, pay cash and take them away themselves is a:",
    options: [
      ["cash and carry wholesaler", "Correct: no credit and no delivery, so prices are lower."],
      ["specialist wholesaler", "A specialist stocks one line of goods; it may deliver and give credit."],
      ["marketing board", "A marketing board buys farm produce from farmers."],
      ["commodity market", "A commodity market trades large lots of raw materials."],
    ],
    answer: "A",
    explanation: "A cash and carry is self-service, cash only, with no delivery.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a service of the wholesaler **to the manufacturer**?",
    options: [
      ["Buying in bulk and storing the goods", "Correct: the manufacturer deals with fewer, larger orders and needs less storage."],
      ["Giving advice on how to display goods in a shop", "This is a service to the retailer."],
      ["Selling goods in small quantities", "Breaking bulk is a service to the retailer."],
      ["Allowing the shopkeeper to pay at month end", "Credit to shopkeepers is a service to the retailer."],
    ],
    answer: "A",
    explanation: "Services to the manufacturer: bulk buying, storage, bearing risk, prompt payment, market information, transport and advertising.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which goods are most likely to go **directly** from producer to consumer?",
    options: [
      ["Fresh milk from a dairy farm", "Correct: perishable goods must reach consumers quickly."],
      ["Packets of matches", "Small, durable, mass-produced goods usually pass through wholesalers."],
      ["Tins of baked beans", "Tinned food keeps well and is normally distributed through wholesalers."],
      ["Bars of washing soap", "Soap is sold through wholesalers to many small retailers."],
    ],
    answer: "A",
    explanation: "Perishable goods, goods made to order and goods sold at factory shops or online often bypass the wholesaler.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a function of the Grain Marketing Board?",
    options: [
      ["Holding strategic grain reserves", "Correct: reserves protect the country against food shortages."],
      ["Selling groceries to final consumers", "The board does not run retail grocery shops."],
      ["Insuring farmers' crops against drought", "That is the work of insurance companies."],
      ["Lending money to car buyers", "Lending is the work of banks and finance houses."],
    ],
    answer: "A",
    explanation: "Marketing boards buy, grade, store and sell farm produce; the GMB also holds strategic grain reserves for food security.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A supermarket chain starts buying directly from manufacturers. Which statement is correct?",
    options: [
      ["The chain must now store and break bulk itself", "Correct: the wholesaler's functions remain; the chain takes them over."],
      ["All storage and transport costs disappear", "The costs remain; they are paid by the chain instead."],
      ["Manufacturers will need to sell in smaller lots", "The chain buys in bulk, so manufacturers still sell large lots."],
      ["Consumers must now buy from the factory", "Consumers still buy from the supermarket."],
    ],
    answer: "A",
    explanation: "You can eliminate the wholesaler but not the wholesaler's functions: storage, breaking bulk, transport and risk-bearing.",
    hints: ["Who now does the storing and transporting?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "On a commodity market, a buyer agrees today a price for coffee to be delivered in six months. This is a:",
    options: [
      ["futures deal", "Correct: delivery later at a price agreed now; it reduces the risk of price changes."],
      ["spot deal", "A spot deal is for immediate delivery."],
      ["cash and carry deal", "Cash and carry is a type of wholesaler."],
      ["hire purchase deal", "Hire purchase is a form of consumer credit."],
    ],
    answer: "A",
    explanation: "Futures contracts fix the price now for later delivery, so both buyer and seller are protected against price changes (hedging).",
    hints: ["When is the coffee delivered?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A cash and carry wholesaler usually gives credit and delivers goods to retailers.",
    answer: false,
    explanation: "False. A cash and carry is cash only and the retailer collects the goods; that is why prices are lower.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "On commodity markets goods are usually sold by grade, so buyers do not need to inspect every load.",
    answer: true,
    explanation: "True. Grading means each lot of a grade meets a known standard.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of wholesaler with its feature.",
    pairs: [
      ["General wholesaler", "Stocks a wide range of different goods"],
      ["Specialist wholesaler", "Stocks one line of goods, such as medicines"],
      ["Cash and carry", "Self-service, cash payment, no delivery"],
      ["Co-operative wholesale society", "Owned by the retail co-operatives it supplies"],
    ],
    explanation: "Know the main feature of each type of wholesaler.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each service with the group that mainly benefits from it.",
    right: ["Manufacturer", "Retailer", "Consumer"],
    pairs: ["Pays promptly for large orders", "Sells goods on credit in small quantities", "Goods are available all year round", "Bears the risk of goods going out of fashion"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Prompt payment and bearing risk help the manufacturer; credit and small quantities help the retailer; steady availability helps the consumer.",
  });
  b.fib({
    d: 2,
    stem: "Complete the chains of distribution.",
    template: "The traditional chain is producer → {{blank:a}} → retailer → consumer. A supermarket chain that buys directly from the factory uses producer → {{blank:b}} → consumer.",
    blanks: [
      { id: "a", accepted: ["wholesaler"], choices: ["wholesaler", "retailer", "consumer", "producer"] },
      { id: "b", accepted: ["retailer"], choices: ["wholesaler", "retailer", "agent", "producer"] },
    ],
    explanation: "Large retailers bypass the wholesaler and buy directly from producers.",
  });
  b.short({
    d: 2,
    stem: "Name the type of market where large quantities of graded raw materials such as metals and grain are traded.",
    accepted: ["commodity market", "a commodity market", "commodity exchange", "commodities market"],
    wrong: ["stock exchange", "wholesale market"],
    explanation: "Commodity markets (commodity exchanges) trade graded raw materials, spot or futures.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** services a wholesaler provides to a small retailer.",
    points: [
      "Service 1, e.g. breaks bulk (1)",
      "Explained: retailer needs little capital and storage space (1)",
      "Service 2, e.g. credit / delivery / variety / advice (1)",
      "Explained, e.g. credit lets the retailer sell goods before paying for them (1)",
    ],
    modelAnswer: "The wholesaler breaks bulk, so a small retailer can buy one carton instead of a lorry-load and needs little capital or storage space. It also gives credit, so the retailer can sell the goods before paying for them, which helps cash flow.",
    explanation: "Name each service and explain how it helps a small retailer.",
    hints: ["Think about quantity, payment, delivery and choice."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage to a maize farmer of selling to a marketing board rather than to a private buyer.",
    points: [
      "Advantage identified, e.g. guaranteed buyer / announced price (1)",
      "Explained, e.g. reduces risk, farmer can plan (1)",
      "Disadvantage identified, e.g. late payment / lower price / distance to depot (1)",
      "Explained, e.g. farmer lacks cash to buy inputs for the next season (1)",
    ],
    modelAnswer: "The board is a guaranteed buyer at an announced price, so the farmer knows he can sell the whole crop and can plan. However, if payment is delayed he may not have cash to buy seed and fertiliser for the next season, while a private buyer may pay cash on delivery.",
    explanation: "Each side needs a point and an explanation linked to the farmer.",
    hints: ["What does the farmer need at the end of the season?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Mutare Soap Works, a fictional manufacturer, sells all its output through two general wholesalers. A large supermarket chain has offered to buy directly from the factory if Mutare Soap Works gives it a lower price. The factory has little storage space and no delivery vehicles.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "If the offer is accepted, the chain of distribution to the supermarket's customers becomes:",
        options: [["producer → retailer → consumer", "Correct: the wholesaler is bypassed."], ["producer → consumer", "The supermarket is still a retailer between them."], ["producer → wholesaler → consumer", "The wholesaler is the one being removed."], ["producer → agent → retailer → consumer", "No agent is involved."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **one** service the wholesalers currently provide to Mutare Soap Works.",
        points: ["Identifies, e.g. storage / bulk buying / transport / prompt payment (1)", "Explains, e.g. the factory has little storage space, so wholesalers hold stock (1)", "Benefit to the business, e.g. lower costs / better cash flow (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether Mutare Soap Works should accept the supermarket chain's offer. Justify your answer.",
        points: [
          "Benefit: large regular orders / single big customer (1)",
          "Benefit: closer contact with the retailer / control over presentation (1)",
          "Drawback: lower price reduces margin (1)",
          "Drawback: needs storage and delivery it does not have / may upset existing wholesalers (1)",
          "Recommendation (1)",
          "Justified with reference to the case (1)",
        ],
        modelAnswer: "Supplying the chain directly would give Mutare Soap Works large, regular orders and closer control over how its soap is displayed. However, it would have to accept a lower price, and it has no storage or delivery vehicles, so it would need to rent space and hire transport, which adds costs. The wholesalers might also stop stocking its soap, losing it sales in small shops across the country. I recommend accepting only if the chain collects the goods from the factory and the lower price still leaves a profit, while keeping the wholesalers for small retailers.",
      }),
    ],
    explanation: "Bypassing the wholesaler gives large orders but shifts storage, transport and risk to the manufacturer, and may cost sales through small shops.",
    hints: ["Which wholesaler functions would the factory have to do itself?", "What could happen to sales through small shops?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Rudo owns a grocery tuck shop in Gweru. She buys from a cash and carry, which is cheaper, but a delivery wholesaler has offered her 30 days' credit and weekly delivery at slightly higher prices.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** features of a cash and carry wholesaler.",
        points: ["Self-service / retailer collects goods (1)", "Cash payment, no credit / no delivery / lower prices (1)"],
      }),
      P.tf({ label: "(b)", stem: "The 30 days' credit would allow Rudo to sell goods before she pays for them.", answer: true }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend which wholesaler Rudo should use. Justify your answer.",
        points: ["Cash and carry: lower prices / higher margin (1)", "Cash and carry: costs of time, transport, closing the shop to collect (1)", "Delivery wholesaler: credit helps cash flow (1)", "Delivery wholesaler: saves time and transport cost, but higher prices (1)", "Recommendation (1)", "Justified, e.g. compares the price difference with transport costs (1)"],
        modelAnswer: "The cash and carry's lower prices give Rudo a bigger margin on each item. However, she must close the shop or pay someone while she collects goods, pay for transport and pay cash at once, which ties up her money. The delivery wholesaler charges a little more, but weekly delivery saves her time and transport costs, and 30 days' credit means she can sell the goods before paying. If her transport costs and lost sales are greater than the price difference, she should switch to the delivery wholesaler; for a small shop short of cash, the credit alone makes it the better choice.",
      }),
    ],
    explanation: "A cash and carry is cheaper but cash only with no delivery; a delivery wholesaler costs more but saves time and transport and offers credit.",
    hints: ["Compare price with the cost of collecting goods.", "How does credit help a small shop?"],
  });
  b.card("DEFINITION", "Wholesaler", "Buys in bulk from producers and sells in smaller quantities to retailers.");
  b.card("FACT", "Services of the wholesaler to the manufacturer", "Bulk buying, storage, bearing risk, prompt payment, market information, transport, advertising.");
  b.card("FACT", "Services of the wholesaler to the retailer", "Breaking bulk, credit, variety, delivery, advice, holding stock.");
  b.card("DEFINITION", "Cash and carry", "Self-service warehouse: retailers pay cash and collect goods themselves; no credit or delivery; lower prices.");
  b.card("CONCEPT", "Bypassing the wholesaler", "Large retailers, perishable or made-to-order goods, factory shops, e-commerce. The functions remain and someone must pay for them.");
  b.card("DEFINITION", "Marketing board", "Body set up by government to buy, grade, store and sell particular farm produce, often at announced prices.");
  b.card("FACT", "Functions of a marketing board", "Buying from farmers, grading, storage, strategic reserves, selling to processors or exporting, price stability.");
  b.card("DEFINITION", "Commodity market", "Organised market where graded raw materials are traded in large quantities, spot or futures.");
  b.card("DEFINITION", "Futures contract", "Agreement now on the price of a commodity to be delivered later; reduces the risk of price changes.");
});
