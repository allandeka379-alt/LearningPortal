// W3a: types of markets: physical and virtual, local, regional, global (ZIMSEC Commerce and BES).
import { concept, P, BES } from "../lib.mjs";

concept("bus.marketing.types-of-markets", { file: "marketing/types-of-markets", keyPrefix: "marketing.types-of-markets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a virtual market?",
    options: [
      ["A market where buyers and sellers trade electronically without meeting", "Correct: trade happens online or by phone."],
      ["A market held in a town square only on public holidays", "Timing does not make a market virtual."],
      ["A market where only services are sold", "Virtual markets sell goods too."],
      ["A market that has no buyers", "Every market has buyers and sellers."],
    ],
    answer: "A",
    explanation: "A **virtual market** uses the internet, mobile phones or other electronic means; buyers and sellers do not meet.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of a physical market?",
    options: [
      ["A fruit and vegetable market in Mutare", "Correct: buyers and sellers meet face to face."],
      ["An online shop selling phone accessories", "That is a virtual market."],
      ["A social-media group for selling cars", "That is a virtual market."],
      ["A food-ordering mobile app", "That is a virtual market."],
    ],
    answer: "A",
    explanation: "A **physical market** is a real place where buyers and sellers meet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of a virtual market to buyers?",
    options: [
      ["They can compare prices quickly at any time", "Correct: online markets are open all day and easy to search."],
      ["They can touch the goods before paying", "That is an advantage of physical markets."],
      ["They avoid all risk of fraud", "Fraud is a risk in virtual markets."],
      ["They never pay for delivery", "Delivery often has a cost."],
    ],
    answer: "A",
    explanation: "Virtual markets are open 24 hours and allow quick price comparison.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of a physical market to sellers?",
    options: [
      ["They must pay rent or stall fees", "Correct: a physical place has costs."],
      ["Customers cannot see the goods", "Customers can see goods in a physical market."],
      ["They cannot bargain with customers", "Bargaining is common in physical markets."],
      ["They need a website to trade", "A website is needed for virtual trade, not physical."],
    ],
    answer: "A",
    explanation: "Physical markets involve rent, stall fees, transport and limited opening hours.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A woman in Gweru buys a dress from a seller in Harare after seeing a photo in a messaging group, and pays by mobile money. What type of market is this?",
    options: [
      ["Virtual market", "Correct: buyer and seller never met."],
      ["Physical market", "They did not meet at a place."],
      ["Global market", "Both are in Zimbabwe."],
      ["Black market", "Nothing illegal is described."],
    ],
    answer: "A",
    explanation: "Trading through a messaging group and mobile money is a **virtual market**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: BES,
    stem: "A Masvingo company sells its canned beans in Zimbabwe, Zambia and Mozambique. Which market does this describe best?",
    options: [
      ["Regional market", "Correct: several neighbouring countries."],
      ["Local market", "Local means one town or community."],
      ["Global market", "Global means worldwide."],
      ["Virtual market", "Nothing says the sales are online."],
    ],
    answer: "A",
    explanation: "Selling across neighbouring countries in southern Africa is a **regional market**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many buyers still prefer a physical market for fresh produce?",
    options: [
      ["They can check freshness and quality before paying", "Correct: inspection matters for perishable goods."],
      ["Physical markets are always cheaper", "Prices vary; physical markets are not always cheaper."],
      ["Physical markets are open 24 hours", "Virtual markets are the ones open all day."],
      ["They cannot pay by mobile money in virtual markets", "Mobile money is widely used in virtual markets."],
    ],
    answer: "A",
    hints: ["What does a buyer of tomatoes want to see before paying?"],
    explanation: "With perishable goods, seeing and touching before buying is a strong advantage.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: BES,
    stem: "Which is the greatest risk for a small business moving from a local to a global market?",
    options: [
      ["Strong competition from producers in many countries", "Correct: global markets are highly competitive."],
      ["Too few potential customers to buy its products", "Global markets have very many customers."],
      ["Lower transport costs than locally", "Transport costs rise."],
      ["Customers who all share the same tastes", "Tastes differ more globally."],
    ],
    answer: "A",
    hints: ["Who else sells in a global market?"],
    explanation: "Global markets bring many customers but also intense competition, exchange-rate risk and high transport costs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A market must be a building or open space where buyers and sellers meet.",
    answer: false,
    explanation: "False. A market is any arrangement for exchange, including virtual markets.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business can sell in both physical and virtual markets at the same time.",
    answer: true,
    explanation: "True. Many shops also take online orders.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each example with the type of market.",
    applies: BES,
    pairs: [
      ["A tuck shop selling to families in one street", "Local market"],
      ["A dairy selling in every province of Zimbabwe and in Botswana", "Regional market"],
      ["A mining company selling to buyers on several continents", "Global market"],
      ["An app where users order taxis", "Virtual market"],
    ],
    explanation: "Local, regional and global describe reach; virtual describes how trade happens.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A market where buyers and sellers meet face to face is a {{blank:a}} market; one where they trade electronically is a {{blank:b}} market.",
    blanks: [
      { id: "a", accepted: ["physical"], choices: ["physical", "virtual", "global"] },
      { id: "b", accepted: ["virtual"], choices: ["virtual", "physical", "local"] },
    ],
    explanation: "Physical: face to face; virtual: electronic.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give another name for a virtual market.",
    accepted: ["online market", "an online market", "electronic market", "e-market", "internet market", "online marketplace"],
    wrong: ["flea market"],
    explanation: "Virtual markets are also called **online** or electronic markets.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** disadvantages of a virtual market to buyers.",
    points: [
      "Cannot inspect goods before paying.",
      "Goods may be poor quality or not as described.",
      "Risk of fraud / delivery delays / need internet and phone.",
      "Explained, e.g. may lose money to fake sellers / wait for goods / excludes those without data.",
    ],
    hints: ["Think about seeing the goods and trusting the seller."],
    modelAnswer: "Buyers cannot inspect goods before paying, so they may receive poor-quality items or items unlike the photo. There is also a risk of fraud: a fake seller may take payment and never deliver.",
    explanation: "Inspection, fraud, delivery and access problems.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Tatenda sells car spare parts from a shop in Kwekwe. Customers come from the town and surrounding farms. A friend suggests that he also sells through a website and social media, delivering by courier to customers in other towns.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the type of market Tatenda's shop is in at present (physical or virtual).",
        accepted: ["physical", "physical market", "a physical market"],
        wrong: ["virtual"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to Tatenda of selling through a virtual market as well.",
        points: [
          "Reaches customers in other towns.",
          "So higher sales / more customers without opening new shops.",
          "Open 24 hours / low cost of advertising on social media.",
          "Customers can order at any time / cheap promotion.",
        ],
        modelAnswer: "Selling online lets Tatenda reach customers in other towns, increasing sales without the cost of new shops. Social media is a cheap way to advertise, and customers can order at any time.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether Tatenda should start selling through a virtual market.",
        points: [
          "For: more customers, wider reach, low cost.",
          "For: competitors may already sell online.",
          "Against: courier costs and delays; parts must be correct for each vehicle.",
          "Against: returns and complaints harder; fraud risk with payments.",
          "Needs time / skills to manage website and messages.",
          "Justified conclusion.",
        ],
        modelAnswer: "Selling online would reach customers in other towns at low cost, and if rivals already sell online Tatenda may lose customers by not doing so. However, courier costs and delays reduce the benefit, and spare parts must match the exact vehicle, so wrong orders and returns would be costly. He would also need time to answer messages and protect himself from payment fraud. He should start on social media with a small range of common parts, asking customers for vehicle details before sending and taking payment first, while keeping the shop as his main market.",
      }),
    ],
    hints: ["(b) Who can he reach that he cannot reach now?", "(c) Consider the nature of spare parts."],
    explanation: "Combining physical and virtual markets widens reach but brings delivery, returns and fraud risks.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900, applies: BES,
    stem: "Chipo's co-operative in Binga makes woven baskets and mats. It sells at a local craft market to tourists. A buyer from a shop in Harare wants to order 200 baskets a month, and an overseas website offers to list the baskets for customers around the world, taking a commission on each sale.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify the type of market (local, regional or global) for the Harare order and for the overseas website.",
        points: ["Harare order: regional (national / wider than local).", "Overseas website: global."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to the co-operative of selling in the global market.",
        points: [
          "Very large number of potential customers.",
          "Higher sales / less dependence on tourist seasons.",
          "Earns foreign currency / possibly higher prices for handmade crafts.",
          "More income for members / funds to grow.",
        ],
        modelAnswer: "The global market has many more customers than the local craft market, so sales would rise and the co-operative would depend less on the tourist season. Overseas customers may also pay higher prices for handmade crafts, earning foreign currency for members.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate which opportunity the co-operative should choose first.",
        points: [
          "Harare order: steady, known volume (200 a month); lower transport costs; known buyer.",
          "Harare: may need to raise output; price per basket may be lower (wholesale).",
          "Global website: more customers; commission paid; shipping costs and delays; uncertain sales.",
          "Global: competition from crafts of other countries; exchange-rate and payment issues.",
          "Capacity of the co-operative to meet both.",
          "Justified choice.",
        ],
        modelAnswer: "The Harare order gives a steady 200 baskets a month from one known buyer, with lower transport costs and less risk, although the shop will expect a lower wholesale price. The global website offers many customers and possibly higher prices, but the co-operative pays commission and shipping, sales are uncertain, and it competes with crafts from many countries. As a small co-operative it may not be able to supply both at once. It should take the Harare order first, using the regular income to increase output, and try the website later with a small range.",
      }),
    ],
    hints: ["(c) Which offer is more certain?", "(c) Can the co-operative make enough baskets for both?"],
    explanation: "Regional markets can give steady income; global markets offer more customers with more cost and risk.",
  });
  b.card("DEFINITION", "What is a **physical market**?", "A real place where buyers and sellers meet face to face, e.g. a market stall, shop or auction.");
  b.card("DEFINITION", "What is a **virtual market**?", "A market where buyers and sellers trade electronically without meeting (online market).");
  b.card("CONCEPT", "Physical market: advantages to buyers?", "Inspect goods, bargain, take goods home at once, build trust.");
  b.card("CONCEPT", "Virtual market: advantages?", "Open 24/7, wide reach, low rent, quick price comparison, cheap advertising.");
  b.card("CONCEPT", "Virtual market: disadvantages?", "Cannot inspect goods, fraud risk, delivery time and cost, needs internet and phones, harder returns.");
  b.card("DEFINITION", "Local, regional and global markets?", "Local: one town or community. Regional: a province or neighbouring countries. Global: worldwide.", undefined, { applies: BES });
  b.card("CONCEPT", "Global market: two disadvantages?", "Strong international competition; exchange-rate risk, transport costs, different laws and cultures.", undefined, { applies: BES });
  b.card("CONCEPT", "Why use both physical and virtual markets?", "Reach more customers while keeping the trust of face-to-face selling.");
});
