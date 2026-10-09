// W3a: mass and niche marketing (ZIMSEC Commerce and Cambridge 0264).
import { concept, P } from "../lib.mjs";

concept("bus.marketing.mass-niche", { file: "marketing/mass-niche", keyPrefix: "marketing.mass-niche" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a niche market?",
    options: [
      ["A small, specialised part of a larger market", "Correct: customers with particular needs."],
      ["A market where most customers buy standard products", "That is a mass market."],
      ["A market found only in rural areas", "Location does not define a niche."],
      ["A market for products sold below cost", "Niche products are often priced higher."],
    ],
    answer: "A",
    explanation: "A **niche market** is a small segment of a larger market with specific needs.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which product is most likely to be sold in a mass market?",
    options: [
      ["Bath soap", "Correct: bought by almost every household."],
      ["Wheelchair-accessible tour holidays", "This serves a specialised group."],
      ["Handmade wedding gowns", "This is a specialised product."],
      ["Gluten-free bread", "This meets a specific dietary need."],
    ],
    answer: "A",
    explanation: "Mass-market products are standardised and bought by most customers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of mass marketing?",
    options: [
      ["Economies of scale lower the cost per unit", "Correct: large output lowers average costs."],
      ["There is little competition", "Mass markets are usually very competitive."],
      ["High prices can be charged", "Mass-market prices are usually low."],
      ["Products are made for each customer's needs", "Products are standardised."],
    ],
    answer: "A",
    explanation: "Large-scale production brings **economies of scale** and low prices.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of niche marketing?",
    options: [
      ["Sales depend on one small group of customers", "Correct: if the group's needs change, sales fall."],
      ["Customers do not value the product", "Niche customers value specialised products."],
      ["Promotion must reach the whole country", "Niche promotion is targeted."],
      ["Products must be sold at very low prices", "Niche products often sell at higher prices."],
    ],
    answer: "A",
    explanation: "Niche businesses carry concentrated risk and have limited sales volume.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A tailor in Gweru makes suits only for very tall men who struggle to find clothes that fit. Which approach is she using?",
    options: [
      ["Niche marketing", "Correct: a specialised group with particular needs."],
      ["Mass marketing", "She is not aiming at all customers."],
      ["The production concept", "She is not focusing on cheap mass output."],
      ["The selling concept", "There is no pressure selling."],
    ],
    answer: "A",
    explanation: "Serving a small group with specific needs is **niche marketing**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is niche marketing often more suitable than mass marketing for a new small business?",
    options: [
      ["It avoids competing on price with large firms that have lower costs", "Correct: small firms lack economies of scale."],
      ["It guarantees the business will grow quickly into a large firm", "Niche markets limit growth."],
      ["It needs national television advertising", "Niche promotion is targeted and cheaper."],
      ["Niche customers always buy in large quantities", "Niche markets are small."],
    ],
    answer: "A",
    hints: ["Who has lower costs in a mass market?"],
    explanation: "Small firms cannot match the costs of large firms in mass markets, so specialising is often safer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A small business's niche product becomes very popular. What is the greatest threat it now faces?",
    options: [
      ["Large firms enter the niche with similar products", "Correct: profitable niches attract competitors."],
      ["Its customers become less loyal because sales rose", "Popularity does not reduce loyalty."],
      ["Its costs per unit rise as sales grow", "Costs per unit usually fall with more output."],
      ["It must lower its quality standards", "Nothing requires lower quality."],
    ],
    answer: "A",
    hints: ["What do large firms do when they see a profitable market?"],
    explanation: "Success in a niche attracts larger rivals, which may have lower costs.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A large soft-drinks company sells its main cola in every shop and also launches a sugar-free cola for health-conscious customers. Which statement is correct?",
    options: [
      ["It uses both mass marketing and niche marketing", "Correct: a mass brand plus a niche product."],
      ["It uses only niche marketing, because both colas are specialised", "The main cola is a mass-market product."],
      ["It uses only mass marketing", "The sugar-free product targets a niche."],
      ["It uses neither approach", "Both approaches are shown."],
    ],
    answer: "A",
    explanation: "Large firms often combine a mass-market brand with niche products.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mass-market products are usually standardised.",
    answer: true,
    explanation: "True. The same product is sold to most customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Only small businesses can operate in niche markets.",
    answer: false,
    explanation: "False. Large firms also serve niches, often with separate brands.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature with the marketing approach it describes.",
    right: ["Mass marketing", "Niche marketing"],
    pairs: [
      "Economies of scale and low prices",
      "Specialised products at higher prices",
      "Strong competition and national advertising",
      "Targeted promotion to a small group",
    ],
    rightIndex: [0, 1, 0, 1],
    explanation: "Mass marketing means volume, low prices and strong competition; niche marketing means specialisation, higher prices and targeted promotion.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Selling the same product to the whole market is {{blank:a}} marketing; developing products for a small, specialised group is {{blank:b}} marketing.",
    blanks: [
      { id: "a", accepted: ["mass"], choices: ["mass", "niche"] },
      { id: "b", accepted: ["niche"], choices: ["niche", "mass"] },
    ],
    explanation: "Mass: whole market. Niche: small, specialised segment.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the cost advantage that large firms gain from producing in large quantities for a mass market.",
    accepted: ["economies of scale", "economy of scale", "economies of large scale production"],
    wrong: ["diseconomies of scale"],
    explanation: "**Economies of scale** lower the average cost per unit.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** advantages of niche marketing for a small business.",
    points: [
      "Less competition from large firms.",
      "So the business can survive without matching large firms' low costs.",
      "Higher prices / customer loyalty.",
      "So higher profit margins / repeat sales.",
    ],
    hints: ["Think about rivals and prices."],
    modelAnswer: "Large firms often ignore small niches, so a small business faces less competition and does not have to match their low costs. Customers with specific needs will pay higher prices and stay loyal, giving good profit margins and repeat sales.",
    explanation: "Less competition, higher prices, loyalty, targeted promotion.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "A soap factory in Harare sells one cheap bar soap to the mass market. It is considering adding a range of handmade natural soaps for a niche market. Discuss whether it should do so.",
    points: [
      "For: higher prices and margins in the niche.",
      "For: spreads risk across two markets; meets changing tastes.",
      "Against: small volumes, higher unit costs; new skills needed.",
      "Against: niche customers may doubt a mass-market brand / needs a separate brand.",
      "Uses existing distribution and supplier contacts.",
      "Justified conclusion.",
    ],
    hints: ["Can a mass-market brand convince niche customers?"],
    modelAnswer: "A natural-soap range could sell at higher prices with better margins, and it would spread the factory's risk if competition in cheap soap increases. It could use the factory's existing suppliers and distribution. However, handmade soaps are produced in small quantities, so unit costs are high, and staff need new skills. Niche customers may not trust a cheap mass-market name, so a separate brand may be needed. If the factory can create a separate brand and sell through pharmacies and craft shops, the range is worth trying on a small scale first.",
    explanation: "A large firm can add a niche range if it manages costs and branding.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Nyasha plans to start a business in Mutare making peanut butter. She has little capital and one small grinding machine. Two large companies already sell cheap peanut butter in every supermarket. Nyasha's research shows that some customers want peanut butter with no added sugar or salt, and will pay more for it.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "The customers who want peanut butter with no added sugar or salt form:",
        options: [["A niche market", "Correct: a small group with particular needs."], ["A mass market", "They are a small part of the market."], ["A global market", "Nothing suggests worldwide sales."], ["A physical market", "This describes a place, not a customer group."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why Nyasha would find it difficult to compete in the mass market.",
        points: ["Large companies have economies of scale / lower costs.", "They can charge lower prices than Nyasha.", "She has little capital and one machine, so cannot produce large volumes or advertise widely."],
        modelAnswer: "The two large companies produce in large quantities, so economies of scale give them lower costs and prices. Nyasha has one machine and little capital, so she cannot produce enough or advertise widely enough to compete on price.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Nyasha should use niche marketing. Justify your answer.",
        points: [
          "Research shows demand from a specific group willing to pay more.",
          "Less direct competition from the large companies.",
          "Small machine suits small volumes.",
          "Risks: small market; large firms could copy; higher unit costs.",
          "Targeted promotion (health shops, social media) is affordable.",
          "Justified recommendation.",
        ],
        modelAnswer: "Nyasha's research shows a group of customers who want peanut butter with no added sugar or salt and will pay more. The large companies do not focus on this group, so she avoids competing with their low prices, and her single machine suits small volumes. She can promote cheaply through health shops, pharmacies and social media. The risks are that the niche is small and the large firms could launch a similar product. Even so, niche marketing is the only realistic approach for a business with her capital, so she should use it and build loyalty quickly.",
      }),
    ],
    hints: ["(b) Think about economies of scale.", "(c) Use the research and her resources."],
    explanation: "A small business with limited capital usually suits a niche rather than competing on price with large firms.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai's business makes school shoes in Bulawayo and sells them through supermarkets across Zimbabwe at low prices. Cheap imported shoes are now taking many of his customers. His designer suggests a new range of high-quality orthopaedic shoes for children with foot problems, sold through clinics and specialist shops.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify Farai's present marketing approach and the approach his designer suggests.",
        points: ["Present: mass marketing.", "Suggested: niche marketing."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** problems Farai faces in the mass market.",
        points: [
          "Strong competition from cheap imports.",
          "Loss of customers / lower sales.",
          "Must keep prices low.",
          "So profit margins are small / hard to cover costs.",
        ],
        modelAnswer: "Cheap imported shoes compete strongly on price, so Farai is losing customers. To keep the rest, he must keep prices low, which leaves him small profit margins.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Farai should change completely to the niche market, add the niche range alongside his school shoes, or stay only in the mass market.",
        points: [
          "Niche: higher prices and margins, less competition from imports.",
          "Niche: small volume; needs new skills, materials, contacts with clinics.",
          "Complete change: high risk, factory capacity unused, lost school-shoe revenue.",
          "Staying mass only: continuing losses to imports.",
          "Adding a range spreads risk and uses existing skills and factory.",
          "Justified conclusion.",
        ],
        modelAnswer: "The orthopaedic range would earn higher prices and face little competition from cheap imports. However, the market is small and needs special materials and links with clinics, so changing completely would leave much of his factory idle and give up the revenue from school shoes, which is very risky. Staying only in the mass market means continuing to lose customers to imports. The best option is to add the niche range alongside school shoes: it spreads risk, uses his existing skills and factory, and the higher margins can support the business while he finds ways to cut the costs of his school shoes.",
      }),
    ],
    hints: ["(c) Consider all three options, then choose."],
    explanation: "Adding a niche range can spread risk for a mass-market business facing cheap competition.",
  });
  b.card("DEFINITION", "What is a **mass market**?", "A very large market in which most customers buy similar, standardised products.");
  b.card("DEFINITION", "What is a **niche market**?", "A small, specialised segment of a larger market with particular needs.");
  b.card("CONCEPT", "Mass marketing: advantages?", "Large sales volume, economies of scale, low prices, risk spread, brand recognition.");
  b.card("CONCEPT", "Mass marketing: disadvantages?", "Strong (price) competition, high costs of entry and advertising, specific needs unmet.");
  b.card("CONCEPT", "Niche marketing: advantages?", "Less competition, higher prices and margins, customer loyalty, suits small firms, targeted promotion.");
  b.card("CONCEPT", "Niche marketing: disadvantages?", "Small volume, higher unit costs, depends on one group, attracts larger rivals, limited growth.");
  b.card("CONCEPT", "Which approach suits a small new business?", "Usually niche marketing: avoids price competition with large firms that have economies of scale.");
  b.card("FACT", "Example of a firm using both approaches?", "A drinks firm selling a mass-market cola and a niche sugar-free version.");
});
