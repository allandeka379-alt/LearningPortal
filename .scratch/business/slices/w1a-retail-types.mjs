// W1a: retail trade, functions and types of retailer (COM).
import { concept, P } from "../lib.mjs";

concept("bus.trade.retail-types", { file: "trade/retail-types", keyPrefix: "trade.retail-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A retailer sells goods mainly to:",
    options: [
      ["final consumers", "Correct: the retailer is the last link in the chain of distribution."],
      ["manufacturers", "Manufacturers sell to wholesalers and retailers rather than buy from them."],
      ["wholesalers", "Wholesalers sell to retailers, not the other way round."],
      ["importers", "Importers bring goods into the country."],
    ],
    answer: "A",
    explanation: "Retailers buy from wholesalers or producers and sell in small quantities to final consumers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which retailer is a **large-scale** retailer?",
    options: [
      ["A hypermarket", "Correct: a very large self-service store with a wide range."],
      ["A kiosk", "A kiosk is a very small booth: small-scale."],
      ["A hawker", "Hawkers carry their goods and need little capital: small-scale."],
      ["A market stall", "A market stall is small-scale."],
    ],
    answer: "A",
    explanation: "Large-scale retailers: supermarkets, hypermarkets, chain stores, department stores.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A large shop divided into sections such as clothing, furniture and cosmetics, each run like a separate shop under one roof, is a:",
    options: [
      ["department store", "Correct: each department has its own manager and buyer."],
      ["mobile shop", "A mobile shop is a vehicle that travels to customers."],
      ["tuck shop", "A tuck shop is a small owner-run shop."],
      ["cash and carry", "A cash and carry is a type of wholesaler."],
    ],
    answer: "A",
    explanation: "Department stores offer many departments and a high level of service under one roof.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the **main** reason small tuck shops survive competition from supermarkets?",
    options: [
      ["They are close to customers and open long hours", "Correct: convenience is their main advantage."],
      ["They always charge lower prices than supermarkets", "Small shops usually charge more, as they cannot buy in bulk."],
      ["They offer a wider range of goods than supermarkets", "Supermarkets offer a far wider range."],
      ["They use more advertising than supermarkets", "Small shops spend little on advertising."],
    ],
    answer: "A",
    explanation: "Small retailers survive through convenience, long hours, personal service, credit and selling in very small quantities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of the retailer **to the producer**?",
    options: [
      ["Passing on information about consumers' tastes", "Correct: retailers are in daily contact with consumers."],
      ["Selling goods to consumers in small quantities", "This is a service to the consumer."],
      ["Giving consumers advice on how to use products", "This is a service to the consumer."],
      ["Opening at hours convenient for shoppers", "This is a service to the consumer."],
    ],
    answer: "A",
    explanation: "Retailers help producers by buying their goods, displaying and advertising them, and passing on information about what consumers want.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can a chain store usually charge lower prices than an independent shop?",
    options: [
      ["Its head office buys in bulk for all branches", "Correct: centralised bulk buying earns large discounts."],
      ["It gives every customer credit for one month", "Credit raises costs; it does not explain lower prices."],
      ["It is always located in residential areas", "Location does not explain the lower prices."],
      ["It employs fewer staff in total than a tuck shop", "A chain employs many more staff in total."],
    ],
    answer: "A",
    explanation: "Centralised buying in bulk gives chain stores economies of scale, so their cost per unit is lower.",
    hints: ["Think about how and where the chain buys its goods."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Sipho wants to sell groceries to farm workers on scattered commercial farms far from any town. Which type of retailing would suit him best?",
    options: [
      ["A mobile shop", "Correct: a vehicle can take goods to customers who live far from shops."],
      ["A hypermarket", "A hypermarket needs a large population nearby and huge capital."],
      ["A department store", "A department store needs a large town-centre market."],
      ["A kiosk in the town centre", "Customers on distant farms cannot easily reach a town kiosk."],
    ],
    answer: "A",
    explanation: "Mobile shops travel to customers in rural areas or new suburbs where there are no shops.",
    hints: ["The customers are scattered and far from town."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Many supermarkets are also chain stores.",
    answer: true,
    explanation: "True. 'Supermarket' describes the size and self-service method; 'chain store' describes ownership of many branches.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Small-scale retailers usually survive because their prices are lower than supermarket prices.",
    answer: false,
    explanation: "False. Small retailers usually charge more; they survive through convenience, credit, long hours and personal service.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each retailer with its main feature.",
    pairs: [
      ["Hawker", "Moves from place to place carrying goods"],
      ["Supermarket", "Large self-service store selling mainly food"],
      ["Chain store", "Many branches with one name and centralised buying"],
      ["Kiosk", "Very small fixed booth selling items such as airtime"],
    ],
    explanation: "Learn one clear feature of each type of retailer.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "In a supermarket, customers serve themselves; this is called {{blank:a}}. A chain store's head office buys goods for all its branches, which is called {{blank:b}} buying.",
    blanks: [
      { id: "a", accepted: ["self-service"], choices: ["self-service", "counter service", "credit", "barter"] },
      { id: "b", accepted: ["centralised"], choices: ["centralised", "direct", "informal", "local"] },
    ],
    explanation: "Self-service cuts staff costs; centralised buying earns bulk discounts.",
  });
  b.short({
    d: 2,
    stem: "Name the type of small-scale retailer that operates from a vehicle travelling to customers.",
    accepted: ["mobile shop", "a mobile shop", "mobile shops", "mobile retailer", "travelling shop"],
    wrong: ["hawker", "kiosk"],
    explanation: "A mobile shop is a vehicle fitted out as a shop.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors Tatenda should consider before opening a hardware shop in Chinhoyi.",
    points: [
      "Factor 1, e.g. location (1)",
      "Explained, e.g. near builders and customers, with parking for loading heavy goods (1)",
      "Factor 2, e.g. capital / competition / suppliers / demand / licence (1)",
      "Explained, e.g. hardware needs a large opening stock, so enough capital is needed (1)",
    ],
    modelAnswer: "Location: the shop should be near building sites and on a main road with space to load cement and timber. Capital: hardware needs a large opening stock of many items, so Tatenda must know how much he needs and where he will get it.",
    explanation: "Name each factor and explain it in the context of a hardware shop.",
    hints: ["Think about who buys hardware and what they need when collecting it."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** advantages of self-service to a supermarket.",
    points: [
      "Advantage 1, e.g. fewer shop assistants needed (1)",
      "Explained: lower wage costs, so lower prices or higher profit (1)",
      "Advantage 2, e.g. impulse buying / more customers served quickly (1)",
      "Explained, e.g. customers see and pick up goods they had not planned to buy, raising sales (1)",
    ],
    modelAnswer: "Self-service needs fewer assistants, so wage costs fall and the supermarket can cut prices. Customers also walk past displays and pick up items they had not planned to buy (impulse buying), so sales rise.",
    explanation: "Each advantage needs a point and its effect on costs or sales.",
    hints: ["Think about staff costs and how customers behave in the aisles."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Nyasha runs a tuck shop in a high-density suburb of Bulawayo. A large supermarket has just opened 2 km away. Nyasha's shop opens from 06:00 to 21:00, sells bread, milk, sugar, soap and airtime, and lets 40 regular customers pay at month end. The supermarket's prices are on average lower than hers.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Nyasha's shop is an example of a:",
        options: [["small-scale retailer", "Correct: owner-run, little capital, small range."], ["large-scale retailer", "Her shop is small and owner-run."], ["wholesaler", "She sells to final consumers."], ["department store", "A department store is large with many departments."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Give **two** reasons why the supermarket can charge lower prices.",
        points: ["Buys in bulk / gets discounts (1)", "Self-service lowers wage costs / economies of scale (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Nyasha's credit to regular customers helps her compete.",
        points: ["Customers without cash until payday can still buy (1)", "Builds loyalty: they keep coming back (1)", "Supermarket does not offer this, so it is a point of difference (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend **two** actions Nyasha should take to keep her customers. Justify your recommendations.",
        points: [
          "Action 1 identified, e.g. stay open early/late when supermarket is closed (1)",
          "Action 1 justified in context (1)",
          "Action 2 identified, e.g. join a buying group / sell in very small quantities / add delivery or mobile money (1)",
          "Action 2 justified in context (1)",
          "Considers a cost or limit of the actions (1)",
          "Overall justified conclusion (1)",
        ],
        modelAnswer: "First, Nyasha should keep her long hours and stress convenience: workers who leave before 07:00 or return after 20:00 cannot reach the supermarket. Second, she could join other tuck shop owners in a buying group so they can buy in bulk from a wholesaler and narrow the price gap. She should be careful with credit, since bad debts would hurt her cash flow. Convenience and credit are the advantages the supermarket cannot match, so building on them while reducing her prices on everyday items is her best strategy.",
      }),
    ],
    explanation: "Small retailers compete on convenience, hours, credit and personal service; buying groups help narrow the price gap.",
    hints: ["What can a tuck shop offer that a supermarket 2 km away cannot?", "How could small shops get bulk discounts?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Farai has US\\$1,500 of savings and wants to start selling fresh vegetables in Masvingo. He is choosing between a stall at the main market and selling from a cart that he pushes around residential areas.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify each option.",
        template: "A stall at the main market is a {{blank:a}}; selling from a cart around residential areas makes him a {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["market stall"], choices: ["market stall", "supermarket", "chain store", "kiosk"] },
          { id: "b", accepted: ["hawker"], choices: ["hawker", "wholesaler", "department store", "mobile shop"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "State **two** legal or official requirements Farai may need to meet.",
        points: ["Licence/permit from the local council (1)", "Health/food hygiene rules / tax registration (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Recommend which option Farai should choose. Justify your answer.",
        points: ["Stall: many shoppers come to the market / fixed place customers know (1)", "Cart: goes to customers / lower rent but tiring, limited stock (1)", "Recommendation (1)", "Justified by comparing the two (1)"],
      }),
    ],
    explanation: "A market stall is fixed and attracts many shoppers; a hawker takes goods to customers with lower costs but limited stock.",
    hints: ["Which option brings customers to Farai, and which takes Farai to customers?"],
  });
  b.card("DEFINITION", "Retailer", "Buys from wholesalers or producers and sells in small quantities to final consumers.");
  b.card("FACT", "Functions of the retailer to consumers", "Small quantities, variety, convenient location and hours, advice, credit, delivery, after-sales service.");
  b.card("FACT", "Functions of the retailer to producers and wholesalers", "Buys their goods, passes on information, advertises and displays, stores goods, bears risk.");
  b.card("FACT", "Small-scale retailers", "Tuck shops, kiosks, market stalls, hawkers and vendors, mobile shops.");
  b.card("FACT", "Large-scale retailers", "Supermarkets, hypermarkets, chain stores (multiple shops), department stores.");
  b.card("DEFINITION", "Chain store", "One of many similar branches owned by one company, with centralised buying.");
  b.card("DEFINITION", "Department store", "Large store divided into departments under one roof, each run like a separate shop.");
  b.card("CONCEPT", "Why small retailers survive", "Convenience, long hours, personal service, credit, very small quantities, flexibility, little capital needed.");
  b.card("FACT", "Opening a retail outlet: factors", "Location, capital, demand, competition, premises and rent, licences, suppliers, security, skills.");
});
