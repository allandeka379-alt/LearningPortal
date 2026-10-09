// W2a: franchises, joint ventures and social enterprises (BES, CAM).
import { concept, P, money, fmt, r2, CAM, BES } from "../lib.mjs";

concept("bus.organisation.franchises-joint-ventures", { file: "organisation/franchises-joint-ventures", keyPrefix: "organisation.franchises-joint-ventures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a franchise, who owns the brand name and the way of doing business?",
    options: [
      ["The franchisor", "Correct: the franchisor sells the right to use its brand."],
      ["The franchisee", "The franchisee buys the right to use the brand and owns the outlet."],
      ["The customers", "Customers buy products; they own no brand."],
      ["The landlord", "The landlord owns the premises only."],
    ],
    answer: "A",
    explanation: "The franchisor owns the brand, products and business format; the franchisee pays for the right to use them.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **royalty** in a franchise agreement?",
    options: [
      ["A regular payment to the franchisor, often a share of sales", "Correct: paid throughout the agreement."],
      ["A one-off payment made to buy shares in the franchisor's company", "Franchisees do not buy shares to join."],
      ["A loan from the franchisor to the franchisee", "A royalty is a payment, not a loan."],
      ["A tax paid to the government on profits", "That is company or income tax."],
    ],
    answer: "A",
    explanation: "Besides an initial fee, a franchisee usually pays royalties, often a percentage of sales, to the franchisor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of a franchise to the **franchisee**?",
    options: [
      ["Selling a product customers already know", "Correct: the established brand reduces the risk of failure."],
      ["Freedom to change the menu and prices", "Franchisees must follow the franchisor's rules."],
      ["Keeping all the profit with no fees", "Fees and royalties must be paid."],
      ["Receiving royalties from other outlets", "Royalties go to the franchisor."],
    ],
    answer: "A",
    explanation: "A franchisee benefits from a known brand, training and national advertising, which lower the risk of failure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of franchising to the **franchisor**?",
    options: [
      ["A badly run outlet can damage the whole brand", "Correct: reputation is shared by every outlet."],
      ["It must find all the capital for each new outlet", "Franchisees provide most of the capital for their outlets."],
      ["It receives no income from the outlets", "It receives fees and royalties."],
      ["It loses ownership of its brand name", "The franchisor keeps ownership of the brand."],
    ],
    answer: "A",
    explanation: "Franchisors give up direct control of each outlet, so poor service in one outlet can harm the reputation of the whole chain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **joint venture**?",
    options: [
      ["Two businesses sharing a project while staying independent", "Correct: they share costs, risks and profits of the project."],
      ["Two businesses joining to become one new firm", "That is a merger."],
      ["One business buying a controlling stake in another", "That is a takeover."],
      ["A business selling the right to use its brand", "That is franchising."],
    ],
    answer: "A",
    explanation: "In a joint venture, independent businesses agree to share the capital, risk, control and profit of a particular project.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A business sells refurbished school desks and uses its surplus to fund reading clubs in rural schools. What type of organisation is it?",
    options: [
      ["A social enterprise", "Correct: it trades, but its main aim is social."],
      ["A public corporation", "It is not owned by the state."],
      ["A franchise", "Nothing suggests it uses another firm's brand."],
      ["A joint venture", "No two businesses are sharing a project."],
    ],
    answer: "A",
    explanation: "A social enterprise sells goods or services and reinvests most of its surplus in social or environmental aims.",
    hints: ["What does it do with its surplus?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A foreign solar-panel maker enters Zimbabwe through a joint venture with a local firm. What is the most likely reason?",
    options: [
      ["To gain the local firm's market knowledge and contacts", "Correct: local partners reduce the risk of entering a new market."],
      ["To avoid paying any taxes in Zimbabwe", "Joint ventures still pay taxes."],
      ["To take full control of the local firm and its customers", "That would be a takeover, not a joint venture."],
      ["To stop selling its own products", "It wants to sell more of its products."],
    ],
    answer: "A",
    explanation: "Joint ventures combine one partner's technology or capital with the other's local knowledge, contacts and licences.",
    hints: ["What does the foreign firm lack in a new country?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A franchisee must follow the franchisor's rules on products and presentation.",
    answer: true,
    explanation: "True. Franchise agreements set rules on products, prices, layout and quality so every outlet is consistent.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a joint venture, the businesses involved merge to become one company.",
    answer: false,
    explanation: "False. They remain separate businesses and cooperate only on the shared project.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Franchisor", "Owns the brand and sells the right to use it"],
      ["Franchisee", "Runs an outlet using another firm's brand"],
      ["Joint venture", "Independent firms sharing one project"],
      ["Social enterprise", "Trades mainly to achieve social aims"],
    ],
    explanation: "Know the four forms of enterprise and who does what in each.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "A franchisee pays an initial {{blank:a}} to join and then regular {{blank:b}} based on sales.",
    blanks: [
      { id: "a", accepted: ["fee", "franchise fee", "joining fee"] },
      { id: "b", accepted: ["royalties", "royalty", "royalty payments"] },
    ],
    wrong: [["royalty", "dividends"]],
    explanation: "Franchise costs: an initial fee and continuing royalties.",
  });
  {
    const sales = 96000, pct = 6, royalty = r2((sales * pct) / 100);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: royalty, calculator: true, daily: true,
      stem: `A franchisee in Masvingo has annual sales of ${money(sales)}. The franchise agreement sets a royalty of ${pct}% of sales. Calculate the royalty for the year.`,
      wrong: [r2(sales / pct), sales * pct],
      explanation: `${pct}% × ${fmt(sales)} = ${money(royalty)}.`,
    });
  }
  b.short({
    d: 2,
    stem: "Name the type of external relationship in which two firms remain independent but share the costs, risks and profits of a project.",
    accepted: ["joint venture", "a joint venture", "JV"],
    wrong: ["merger", "franchise"],
    explanation: "This is a **joint venture**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of a joint venture.",
    points: [
      "Disadvantage 1, e.g. profits must be shared (1)",
      "Explained, e.g. each partner earns less than if it did the project alone (1)",
      "Disadvantage 2, e.g. disagreements / partner may copy technology / unclear responsibility (1)",
      "Explained, e.g. slow decisions / partner later becomes a competitor (1)",
    ],
    modelAnswer: "Profits are shared, so each business earns less than it would alone. The partners may also disagree over how the project is run, which slows decisions and can end the venture.",
    explanation: "State and explain each disadvantage.",
    hints: ["Think about profit and about relationships."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why a successful restaurant chain might choose to expand by franchising rather than opening its own new branches.",
    points: [
      "Reason 1, e.g. franchisees provide the capital (1)",
      "Developed: chain can expand quickly without borrowing (1)",
      "Reason 2, e.g. motivated owner-managers / local knowledge / fee and royalty income (1)",
      "Developed: outlets run well because franchisees keep the profit / adapt to local customers (1)",
    ],
    modelAnswer: "Franchisees pay for their own premises and equipment, so the chain can open many outlets quickly without borrowing. Franchisees also own their outlets, so they are more motivated to run them well than salaried managers.",
    explanation: "Link each reason to growth, cost or management.",
    hints: ["Who pays for a new franchised outlet?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Farai has US\\$30,000 and wants to open a fast-food outlet in Chinhoyi. He can buy a franchise from a fictional national chain, Chicken Spot, for a fee of US\\$12,000 plus royalties of 5% of sales, or open his own brand, Farai's Grill. He expects sales of US\\$140,000 a year as a Chicken Spot franchisee, or US\\$90,000 under his own brand.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: (140000 * 5) / 100,
        stem: "Calculate the royalty Farai would pay in a year as a franchisee.",
        wrong: [(90000 * 5) / 100, 12000 + (140000 * 5) / 100],
        explanation: "5% × 140,000 = US\\$7,000.",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "money", value: 140000 - 90000,
        stem: "By how much are the expected sales higher with the franchise?",
        wrong: [90000, 140000],
        explanation: "140,000 − 90,000 = US\\$50,000.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** disadvantage to Farai of buying the franchise.",
        points: ["Identifies, e.g. fees and royalties / loss of freedom (1)", "Applies: US\\$12,000 fee uses much of his US\\$30,000; US\\$7,000 a year royalties (1)", "Effect, e.g. lower profit per sale / cannot adapt menu to local tastes (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether Farai should buy the franchise or open his own brand. Justify your answer.",
        points: [
          "Franchise: much higher expected sales from a known brand (1)",
          "Franchise: training and advertising lower the risk of failure (1)",
          "Own brand: no fee or royalties, full freedom (1)",
          "Own brand: lower sales and higher risk as a new name (1)",
          "Compares: extra US\\$50,000 sales outweighs US\\$7,000 royalties (if costs allow) (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: "The franchise is expected to bring in US\\$50,000 more sales a year, far more than the US\\$7,000 royalty, and the known brand, training and advertising lower the risk of failure. Its drawbacks are the US\\$12,000 fee, which leaves less of his US\\$30,000 for other costs, and no freedom to change the menu. Farai's own brand would give him full control but lower sales and a greater risk as an unknown name. He should buy the franchise, provided the remaining US\\$18,000 covers his set-up costs.",
      }),
    ],
    explanation: "Royalty = 5% × US\\$140,000 = US\\$7,000; the franchise adds US\\$50,000 of expected sales.",
    hints: ["A royalty is a percentage of sales.", "Compare the extra sales with the extra costs."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, applies: BES,
    stem: "A Zimbabwean mining company and a foreign engineering firm are considering a joint venture to build a processing plant near Kwekwe. The mining company has the mineral rights and local workers; the engineering firm has the technology and finance.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define a **joint venture**.",
        points: ["Two or more businesses share a project's capital, risks and profits (1)", "While remaining separate businesses (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits of the joint venture to the mining company.",
        points: ["Benefit 1: access to technology (1)", "Developed: can process minerals locally and add value (1)", "Benefit 2: shared finance and risk (1)", "Developed: does not have to raise all the capital alone (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the mining company should enter the joint venture.",
        points: [
          "For: technology and finance it lacks (1)",
          "For: shared risk on a large project (1)",
          "Against: profits shared with the foreign firm (1)",
          "Against: disagreements / loss of control / foreign firm may later compete (1)",
          "Need for a clear written agreement (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The joint venture gives the mining company technology and finance it does not have and spreads the risk of a costly plant. However, it must share profits and some control, and disputes could arise over decisions. With a clear written agreement on profit shares and management, the benefits of processing locally outweigh the drawbacks, so it should go ahead.",
      }),
    ],
    explanation: "Joint ventures combine complementary resources but share profit and control.",
    hints: ["What does each partner bring?", "What could go wrong between partners?"],
  });
  b.card("DEFINITION", "Franchise", "An agreement allowing a franchisee to use a franchisor's brand, products and methods in return for fees and royalties.");
  b.card("DEFINITION", "Franchisor", "The business that owns the brand and sells franchises.");
  b.card("DEFINITION", "Franchisee", "The person or business that buys a franchise and runs an outlet under the brand.");
  b.card("DEFINITION", "Royalty", "A regular payment from franchisee to franchisor, often a percentage of sales.");
  b.card("DEFINITION", "Joint venture", "Independent businesses sharing the capital, risks, control and profits of a project.");
  b.card("DEFINITION", "Social enterprise", "A business with mainly social or environmental aims that reinvests most of its surplus in them.", null, { applies: CAM });
  b.card("CONCEPT", "Franchise: franchisee's view", "Gains a known brand, training and advertising; loses part of profit and freedom.");
  b.card("CONCEPT", "Franchise: franchisor's view", "Expands quickly with others' capital and earns royalties; risks brand damage and loses direct control.");
  b.card("CONCEPT", "Joint venture versus merger", "In a joint venture firms stay separate and cooperate on one project; in a merger they become one business.");
});
