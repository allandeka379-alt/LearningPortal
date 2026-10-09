// W1a: e-commerce and trends in retailing (COM, CAM).
import { concept, P, COM, CAM } from "../lib.mjs";

concept("bus.marketing.ecommerce", { file: "marketing/ecommerce", keyPrefix: "marketing.ecommerce" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of **e-commerce**?",
    options: [
      ["Buying a bus ticket on a website", "Correct: online ticketing is e-commerce."],
      ["Paying cash for bread at a tuck shop", "A cash sale in a shop is not electronic commerce."],
      ["Buying vegetables at a market stall", "This is face-to-face trade, not online."],
      ["Ordering goods by posting a letter", "Post is not an electronic network."],
    ],
    answer: "A",
    explanation: "E-commerce is buying and selling through electronic networks: online shopping, mobile and internet banking, online ticketing.",
  });
  b.mcq({
    d: 1, skill: "RECALL", applies: COM,
    stem: "A till system that scans bar codes and updates stock records automatically is called:",
    options: [
      ["electronic point of sale", "Correct: EPOS records each sale and adjusts stock."],
      ["electronic funds transfer", "EFT moves money between accounts; it does not scan goods."],
      ["a loyalty scheme", "A loyalty scheme rewards repeat customers."],
      ["a vending machine", "A vending machine sells goods without staff."],
    ],
    answer: "A",
    explanation: "EPOS (electronic point of sale) speeds up checkouts and keeps stock records up to date.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of e-commerce **for customers**?",
    options: [
      ["They can compare prices easily from home", "Correct: comparing sellers online saves time and money."],
      ["The business can reach customers abroad", "This is an advantage for the business."],
      ["The business needs smaller shop premises", "This is an advantage for the business."],
      ["The business gathers data on buying habits", "This benefits the business, not the customer."],
    ],
    answer: "A",
    explanation: "Customer advantages: convenience, 24-hour shopping, wider choice, easy price comparison, reviews.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of e-commerce **for customers**?",
    options: [
      ["They cannot inspect goods before buying", "Correct: customers rely on photographs and descriptions."],
      ["The business must pay for a website", "This is a cost for the business."],
      ["The business faces more price competition", "This is a disadvantage for the business."],
      ["The business has to arrange deliveries", "Arranging delivery is the business's problem, though customers may pay for it."],
    ],
    answer: "A",
    explanation: "Customer disadvantages: cannot see or try goods, delivery charges and delays, fraud risk, needs internet access, returns can be hard.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "What is the main purpose of a supermarket loyalty scheme?",
    options: [
      ["To encourage customers to keep returning", "Correct: rewards make customers loyal and give the store data."],
      ["To reduce the number of checkout staff", "Self-service and EPOS reduce staff, not loyalty schemes."],
      ["To allow customers to buy on hire purchase", "Hire purchase is a form of credit, not a loyalty scheme."],
      ["To check stock levels in the warehouse", "Stock control is done by EPOS and stock systems."],
    ],
    answer: "A",
    explanation: "Loyalty schemes reward repeat purchases with points or discounts, and record what customers buy.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "A small furniture maker in Gweru starts selling online. Which problem is it **most likely** to face?",
    options: [
      ["High delivery costs for bulky items", "Correct: heavy, bulky goods are expensive to deliver to distant customers."],
      ["Customers being unable to compare prices", "Online, customers can compare prices more easily."],
      ["Being unable to reach customers in other towns", "Selling online widens its reach."],
      ["Needing a much larger showroom", "Selling online reduces the need for a showroom."],
    ],
    answer: "A",
    explanation: "Delivery cost and damage in transit are serious problems for bulky goods sold online.",
    hints: ["Think about the product: furniture is heavy and bulky."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which business would gain **most** from vending machines or online sales operating 24 hours a day?",
    options: [
      ["A seller of airtime and cold drinks", "Correct: small standard items are easy to sell automatically at any time."],
      ["A tailor making suits to measure", "Made-to-measure clothing needs personal fittings."],
      ["A hairdresser in a shopping centre", "Hairdressing is a personal service that must be done in person."],
      ["A builder of houses on order", "House building needs meetings, plans and site visits."],
    ],
    answer: "A",
    explanation: "Standardised, low-value items suit self-service technology; personal services do not.",
    hints: ["Which product needs no personal service to sell?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mobile phone banking is an example of e-commerce.",
    answer: true,
    explanation: "True. Mobile and internet banking are electronic ways of carrying out financial transactions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Selling online always reduces a business's total costs.",
    answer: false,
    explanation: "False. Premises costs may fall, but website, delivery, packaging, returns and online advertising add new costs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each trend in retailing with its main benefit to the retailer.",
    pairs: [
      ["Self-service", "Fewer shop assistants needed"],
      ["Bar codes and EPOS", "Automatic stock records and fast checkouts"],
      ["Vending machines", "Sales 24 hours a day without staff"],
      ["Loyalty scheme", "Customers return to the same store"],
    ],
    explanation: "Each trend either cuts costs, speeds service or keeps customers.",
  });
  b.match({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Classify each point about e-commerce.",
    right: ["Advantage for the business", "Disadvantage for the business", "Advantage for the customer", "Disadvantage for the customer"],
    pairs: ["Can sell to customers in other countries", "Must pay to build and maintain a website", "Can shop at midnight without travelling", "Personal details may be stolen by fraudsters"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Always check whose point of view a question asks for: the business's or the customer's.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Buying and selling over the internet is called {{blank:a}}. A pattern of lines on a product that is scanned at the till is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["e-commerce", "ecommerce", "electronic commerce"] },
      { id: "b", accepted: ["bar code", "barcode"] },
    ],
    explanation: "E-commerce is electronic buying and selling; bar codes are read by EPOS scanners.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of e-commerce for a small business.",
    points: [
      "Advantage 1, e.g. reaches more customers / wider market (1)",
      "Explained, e.g. customers across the country can order, so sales rise (1)",
      "Advantage 2, e.g. lower premises costs / open 24 hours / compete with large firms (1)",
      "Explained, e.g. no need to rent a shop in an expensive town centre (1)",
    ],
    modelAnswer: "A small business selling online can reach customers far beyond its own town, so sales can rise without opening new shops. It also needs less expensive shop space, because goods can be stored at home or in a cheap workshop and posted to buyers.",
    explanation: "Each advantage should be explained in terms of sales or costs.",
    hints: ["Think about the size of the market and the cost of premises."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: COM,
    stem: "Explain **two** ways electronic point of sale (EPOS) helps a supermarket manager.",
    points: [
      "Way 1, e.g. automatic stock control (1)",
      "Explained, e.g. stock record updated at each sale; re-order before shelves are empty (1)",
      "Way 2, e.g. sales information / faster, accurate checkouts (1)",
      "Explained, e.g. shows best-selling lines so the manager stocks more of them (1)",
    ],
    modelAnswer: "EPOS updates stock records every time an item is scanned, so the manager knows when to re-order and shelves are not left empty. It also gives sales information, showing which products sell best and when, so the manager can plan orders, displays and staff rotas.",
    explanation: "Link each feature of EPOS to a management benefit.",
    hints: ["What does the system record each time an item is scanned?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Rudo sells handmade baskets from a stall in Victoria Falls. Most buyers are tourists. Sales fall sharply in the rainy season when there are fewer tourists. Her nephew suggests selling online through a social-media page, with payment by card or mobile money and delivery by courier.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Selling through a social-media page with electronic payment is an example of:",
        options: [["e-commerce", "Correct: buying and selling through electronic networks."], ["barter", "Barter is exchange without money."], ["wholesaling", "Rudo would sell to final consumers."], ["a loyalty scheme", "A loyalty scheme rewards repeat buyers."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how selling online could help Rudo with the fall in sales in the rainy season.",
        points: ["Reaches customers who are not in Victoria Falls (1)", "E.g. people in other towns or tourists who have gone home (1)", "So sales continue when few tourists visit (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Identify **two** disadvantages of e-commerce for Rudo's customers.",
        points: ["Cannot see or touch the baskets before buying (1)", "Delivery charges / wait / fraud risk (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether Rudo should start selling online. Justify your answer.",
        points: [
          "Benefit: wider market, all-year sales (1)",
          "Benefit: low set-up cost through social media (1)",
          "Drawback: courier costs for bulky baskets / damage in transit (1)",
          "Drawback: time needed for photos, messages; trust and payment issues (1)",
          "Recommendation (1)",
          "Justified in context, e.g. baskets are light and photograph well; start small (1)",
        ],
        modelAnswer: "Selling online would let Rudo reach customers all year, including tourists who have returned home, which tackles the rainy-season drop in sales. A social-media page costs little to start. However, baskets are bulky, so courier costs may be high, and she will need time to take good photographs and answer messages, and to build trust with buyers who cannot see her work. Because baskets are light and her main problem is seasonal demand, I recommend she starts online sales, beginning with smaller baskets that are cheap to post and checking courier charges before she sets prices.",
      }),
    ],
    explanation: "E-commerce widens the market beyond Victoria Falls; delivery cost, presentation and trust are the main issues.",
    hints: ["Who could buy from Rudo online who cannot buy from her stall?", "What extra costs does online selling bring?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, applies: COM,
    stem: "Tendai owns a grocery shop in Kwekwe with counter service: an assistant fetches each item for the customer. He is thinking of converting to self-service with two EPOS checkouts.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** features of self-service.",
        points: ["Customers pick goods from open shelves (1)", "Pay at a checkout near the exit / goods priced and displayed (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits Tendai could gain from installing EPOS checkouts.",
        points: ["Benefit 1, e.g. faster checkouts (1)", "Explained, e.g. more customers served at busy times (1)", "Benefit 2, e.g. automatic stock records / fewer errors / sales data (1)", "Explained, e.g. knows when to re-order (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Evaluate whether converting to self-service is a good idea for Tendai.",
        points: ["Advantage, e.g. lower wage costs / impulse buying (1)", "Disadvantage, e.g. cost of equipment and shelving / more shoplifting / power cuts affect EPOS (1)", "Conclusion (1)", "Justified, e.g. depends on number of customers and capital available (1)"],
      }),
    ],
    explanation: "Self-service and EPOS cut wage costs and speed service but need capital, reliable power and security against theft.",
    hints: ["Think about wages, sales, equipment costs and theft."],
  });
  b.card("DEFINITION", "E-commerce", "Buying and selling goods and services through the internet or other electronic networks.");
  b.card("FACT", "Examples of e-commerce", "Online shopping, mobile phone and internet banking, mobile money payments, online ticketing.");
  b.card("DEFINITION", "Electronic point of sale (EPOS)", "Computerised till that scans bar codes, records sales and updates stock automatically.", null, { applies: COM });
  b.card("FACT", "Trends in retailing", "Self-service, EPOS and bar codes, electronic payment, vending machines, loyalty schemes, out-of-town centres, online shopping.", null, { applies: COM });
  b.card("CONCEPT", "E-commerce: advantages for businesses", "Wider market, 24-hour sales, lower premises costs, customer data, small firms can compete.");
  b.card("CONCEPT", "E-commerce: disadvantages for businesses", "Website and skills costs, delivery problems, more price competition, fraud and hacking, returns.");
  b.card("CONCEPT", "E-commerce: advantages for customers", "Convenience, shop any time, wider choice, easy price comparison, reviews.");
  b.card("CONCEPT", "E-commerce: disadvantages for customers", "Cannot inspect goods, delivery charges and delays, fraud and data risk, needs internet access, returns can be hard.");
  b.card("DEFINITION", "Loyalty scheme", "Rewards (points, discounts) for customers who keep buying from the same retailer.", null, { applies: COM });
});
