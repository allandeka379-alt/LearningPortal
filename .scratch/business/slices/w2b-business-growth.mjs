// W2b: business growth.
import { concept, P, money, f, check, round } from "../lib.mjs";

const gMkt = 740000, gA = 133200, gB = 88800;
const shA = f.marketShare(gA, gMkt), shB = f.marketShare(gB, gMkt), shC = f.marketShare(gA + gB, gMkt); // 18, 12, 30
check("merged", shA + shB, shC);
const nRev = 54000, nCost = 37800;
const nExtra = f.profit(nRev, nCost); // 16200
// struct
const tMkt = 2600000, tSales = 338000, tRival = 247000;
const tShare = f.marketShare(tSales, tMkt), tAfter = f.marketShare(tSales + tRival, tMkt);

concept("bus.enterprise.business-growth", { file: "enterprise/business-growth", keyPrefix: "enterprise.business-growth" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is internal growth?",
    options: [
      ["Expanding the business's own operations", "Correct: also called organic growth."],
      ["Buying a controlling share of another business", "That is a takeover, which is external growth."],
      ["Joining with another business by agreement", "That is a merger, which is external growth."],
      ["Selling part of the business to a rival", "This makes the business smaller, not larger."],
    ],
    answer: "A",
    explanation: "**Internal (organic) growth** comes from within: more sales, new products or new markets.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A bakery in Harare buys a flour mill that supplies it. What type of integration is this?",
    options: [
      ["Backward vertical integration", "Correct: the bakery joins with its supplier, an earlier stage."],
      ["Forward vertical integration", "Forward integration means joining with a customer."],
      ["Horizontal integration", "Horizontal means joining a firm at the same stage."],
      ["Conglomerate integration", "Flour milling and baking are related stages, not unrelated industries."],
    ],
    answer: "A",
    explanation: "Joining with a **supplier** (an earlier stage of the same chain) is **backward vertical integration**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Two bus companies operating between Harare and Bulawayo merge. What type of integration is this?",
    options: [
      ["Horizontal integration", "Correct: both are at the same stage of the same industry."],
      ["Backward vertical integration", "Neither company supplies the other."],
      ["Forward vertical integration", "Neither company is a customer of the other."],
      ["Conglomerate integration", "The two businesses are in the same industry."],
    ],
    answer: "A",
    explanation: "Businesses at the **same stage** of the same industry joining is **horizontal integration**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A clothing factory buys a chain of clothing shops. What is the main benefit to the factory?",
    options: [
      ["Guaranteed outlets for its products", "Correct: forward vertical integration secures places to sell."],
      ["Guaranteed supplies of cotton", "That would come from buying a supplier (backward integration)."],
      ["Spreading risk across unrelated industries", "Clothing shops are in a related industry."],
      ["Removing a direct competitor", "The shops are customers, not competitors."],
    ],
    answer: "A",
    explanation: "Buying its retail customers is **forward vertical integration**: the factory secures outlets and keeps the retailer's profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main aim of conglomerate integration?",
    options: [
      ["To spread risk across different markets", "Correct: a fall in one market is offset by others."],
      ["To secure supplies of raw materials", "That is the aim of backward vertical integration."],
      ["To remove competitors in the same market", "That is the aim of horizontal integration."],
      ["To secure outlets for the business's products", "That is the aim of forward vertical integration."],
    ],
    answer: "A",
    explanation: "Joining with a business in an **unrelated** industry diversifies the business and spreads risk.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the most likely disadvantage of a merger between two large companies?",
    options: [
      ["A clash of management styles and cultures", "Correct: staff used to different methods may not work well together."],
      ["The business grows too slowly", "Mergers are a fast method of growth."],
      ["The business's market share falls", "A horizontal merger usually increases market share."],
      ["The business can no longer gain economies of scale", "A larger business usually gains more economies of scale."],
    ],
    answer: "A",
    hints: ["Think about what happens when two sets of managers and workers have to work together."],
    explanation: "Mergers are fast but bring **culture clashes**, duplicated jobs and low morale.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can rapid growth cause cash-flow problems?",
    options: [
      ["Money is spent on expansion before extra revenue arrives", "Correct: costs come first, revenue later."],
      ["Larger businesses are not allowed to borrow money", "Larger businesses can usually borrow more easily."],
      ["Growth always reduces the number of customers", "Growth normally means more customers."],
      ["Growth stops the business from paying any taxes", "Growth has no such effect on tax."],
    ],
    answer: "A",
    hints: ["When are new machines and stock paid for, and when are the extra sales made?"],
    explanation: "Expansion needs spending on premises, stock and staff before the extra sales come in, so cash can run short (overtrading).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which factor is most likely to limit the growth of a small business?",
    options: [
      ["Lack of finance", "Correct: small firms often struggle to borrow."],
      ["Rising demand for its products", "Rising demand helps growth."],
      ["Low interest rates on loans", "Low interest rates make borrowing cheaper and help growth."],
      ["Government grants for small firms", "Grants help growth."],
    ],
    answer: "A",
    explanation: "**Lack of finance** is a common limit: banks see small firms as risky and may demand collateral.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A takeover always takes place with the agreement of the managers of the business being bought.",
    answer: false,
    explanation: "False. A takeover can be hostile: the buyer gains control by buying shares even if the managers object.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Internal growth is usually slower but lower in risk than external growth.",
    answer: true,
    explanation: "True. The business grows at its own pace and keeps control, but it takes longer than buying another firm.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each example with the type of growth.",
    pairs: [
      ["A dairy buys a chain of milk kiosks", "Forward vertical integration"],
      ["A tea estate buys a fertiliser company", "Backward vertical integration"],
      ["Two supermarket chains join together", "Horizontal integration"],
      ["A hotel group buys a cement company", "Conglomerate integration"],
      ["A butchery opens a second branch", "Internal growth"],
    ],
    hints: ["Ask: same stage, earlier stage, later stage or unrelated?"],
    explanation: "Customer = forward; supplier = backward; same stage = horizontal; unrelated = conglomerate; own expansion = internal.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "When two businesses agree to join together it is called a {{blank:a}}. When one business buys control of another it is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["merger"], choices: ["merger", "takeover", "franchise", "partnership"] },
      { id: "b", accepted: ["takeover"], choices: ["takeover", "merger", "franchise", "partnership"] },
    ],
    explanation: "A **merger** is agreed; a **takeover** (acquisition) is a purchase of control.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `Two soap makers merge. Before the merger one had sales of ${money(gA)} and the other ${money(gB)} in a market with total sales of ${money(gMkt)}. Calculate the market share of the merged business as a percentage to one decimal place.`,
    kind: "pct", value: shC, wrong: [round(shA, 1)],
    explanation: `(${gA.toLocaleString("en-GB")} + ${gB.toLocaleString("en-GB")}) ÷ ${gMkt.toLocaleString("en-GB")} × 100 = ${shC.toFixed(1)}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A printing firm in Gweru plans internal growth by printing school exercise books. The new product is expected to bring extra revenue of ${money(nRev)} a year and extra costs of ${money(nCost)} a year. Calculate the extra profit expected.`,
    kind: "money", value: nExtra, wrong: [nRev],
    hints: ["Profit = revenue − total costs."],
    explanation: `Extra profit = ${money(nRev)} − ${money(nCost)} = ${money(nExtra)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why the owners of a business may want it to grow.",
    points: [
      "Economies of scale / lower average costs.",
      "Explains: e.g. bulk-buying discounts raise profit per unit.",
      "Higher profit / larger market share / security / status.",
      "Explains the second reason, e.g. a larger firm is less likely to fail or be taken over.",
    ],
    hints: ["Think about costs, profit, security and status."],
    modelAnswer: "A larger business gains economies of scale, such as discounts for buying in bulk, so average costs fall and profit per unit rises. Growth also gives security: a larger business with more products and customers is less likely to fail or be taken over.",
    explanation: "Reasons: profit, economies of scale, market share, security, status.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** problems a business may face as it grows, and how each could be reduced.",
    points: [
      "Poor communication / coordination.",
      "Reduced by a clear structure, delegation, regular meetings or ICT.",
      "Cash shortage / loss of control / lower motivation.",
      "Reduced by a suitable method, e.g. cash-flow planning and long-term finance.",
    ],
    hints: ["Name the problem, then the solution."],
    modelAnswer: "Communication becomes harder as more people and levels are added; a clear structure, delegation and regular meetings help. Cash may run short because expansion is paid for before extra revenue arrives; planning cash flow and using long-term loans for long-term expansion reduces this.",
    explanation: "Problems of growth: communication, cash, control, motivation, diseconomies of scale.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 900,
    stem: `Marange Mills (a fictional business) makes maize meal in Mutare. Last year its sales were ${money(tSales)} in a regional market worth ${money(tMkt)}. A rival mill with sales of ${money(tRival)} is for sale. The directors are considering buying it, or instead growing internally by opening sales depots in three new towns.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Marange Mills' market share last year as a percentage to one decimal place.", kind: "pct", value: tShare, wrong: [round((tSales / (tSales + tRival)) * 100, 1)] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the market share of the combined business if Marange Mills buys the rival mill, as a percentage to one decimal place.", kind: "pct", value: tAfter, wrong: [round(tShare, 1)] }),
      P.short({ label: "(c)", marks: 1, stem: "State the type of integration if Marange Mills buys the rival mill.", accepted: ["horizontal", "horizontal integration", "horizontal merger", "horizontal takeover"], wrong: ["vertical"] }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Should Marange Mills buy the rival mill or open sales depots? Justify your answer.",
        points: [
          `Buying: fast increase in market share (from ${round(tShare, 1)}% to ${round(tAfter, 1)}%); removes a competitor; economies of scale.`,
          "Buying: high cost; culture clash; possible job losses and low morale.",
          "Depots: lower risk; keeps control and culture; reaches new customers.",
          "Depots: slower; growth depends on winning customers from rivals.",
          "Considers finance available / objectives of directors.",
          "Justified recommendation.",
        ],
        modelAnswer: `Buying the rival would raise Marange Mills' market share from ${round(tShare, 1)}% to ${round(tAfter, 1)}% at once and remove a competitor, giving economies of scale in buying maize. But it would be expensive and could cause a clash between the two workforces. Opening depots is cheaper and keeps control, but growth would be slow and the depots must win customers from rivals. If the directors can finance the purchase without straining cash flow, buying the rival is better, because it gives a large, immediate gain in share and costs fall with bulk buying; otherwise the depots are the safer choice.`,
      }),
    ],
    hints: ["(a)(b) Market share = sales of the business ÷ total market sales × 100.", "(d) Compare speed, cost, risk and control."],
    explanation: `(a) ${tSales.toLocaleString("en-GB")} ÷ ${tMkt.toLocaleString("en-GB")} × 100 = ${tShare.toFixed(1)}%. (b) ${(tSales + tRival).toLocaleString("en-GB")} ÷ ${tMkt.toLocaleString("en-GB")} × 100 = ${tAfter.toFixed(1)}%. (c) Horizontal. (d) Justified choice between external and internal growth.`,
    workedSolution: `1. Market share = ${tSales.toLocaleString("en-GB")} ÷ ${tMkt.toLocaleString("en-GB")} × 100 = ${tShare.toFixed(1)}%.\n2. Combined sales = ${tSales.toLocaleString("en-GB")} + ${tRival.toLocaleString("en-GB")} = ${(tSales + tRival).toLocaleString("en-GB")}.\n3. Combined share = ${(tSales + tRival).toLocaleString("en-GB")} ÷ ${tMkt.toLocaleString("en-GB")} × 100 = ${tAfter.toFixed(1)}%.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Rudo owns a chain of four pharmacies in Bulawayo. She often runs short of some medicines because her wholesaler delivers late. She is considering two options: buying a small pharmaceutical wholesaler, or buying a chain of grocery shops in Gweru.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify the type of integration in each option and explain one benefit of each.",
        points: [
          "Buying the wholesaler: backward vertical integration.",
          "Benefit: secure, reliable supplies of medicines / control of cost.",
          "Buying grocery shops: conglomerate (diversification).",
          "Benefit: spreads risk across unrelated markets.",
        ],
        modelAnswer: "Buying the wholesaler is backward vertical integration: Rudo would control her supplies, so late deliveries would stop. Buying grocery shops is conglomerate integration, which spreads her risk across a different market.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Which option should Rudo choose? Justify your answer.",
        points: [
          "Wholesaler solves her main problem (late deliveries, lost sales).",
          "Also keeps the wholesaler's profit and may supply other pharmacies.",
          "Wholesaler: needs new skills (storage, distribution, licensing).",
          "Grocery shops: spreads risk but Rudo lacks experience in groceries; does not solve the supply problem.",
          "Compares cost and risk of each.",
          "Justified recommendation.",
        ],
        modelAnswer: "Rudo should buy the wholesaler. Her main problem is running out of medicines because of late deliveries, which loses sales and customers' trust; owning her supplier solves this, and she could earn extra profit by supplying other pharmacies. She would need new skills in storage and distribution, but these are close to her pharmacy knowledge. Grocery shops would spread risk, but she has no experience in that market and it does nothing about her supply problem, so it is the riskier choice.",
      }),
    ],
    hints: ["(b) Which option solves the problem described in the case?"],
    explanation: "Backward vertical integration secures supplies; conglomerate integration spreads risk. The choice should address Rudo's main problem.",
  });
  b.card("DEFINITION", "**Internal (organic) growth**?", "Growth from within: more sales, new products or new markets.");
  b.card("DEFINITION", "**External growth**?", "Growth by joining with another business through a merger or a takeover.");
  b.card("CONCEPT", "Merger or takeover?", "Merger: two businesses agree to join. Takeover: one buys control of another, possibly against its managers' wishes.");
  b.card("DEFINITION", "**Horizontal integration**?", "Joining with a business at the same stage of the same industry (e.g. two bakeries).");
  b.card("DEFINITION", "**Vertical integration** (backward and forward)?", "Joining with a supplier (backward) or a customer (forward) in the same chain of production.");
  b.card("DEFINITION", "**Conglomerate integration**?", "Joining with a business in an unrelated industry, to spread risk.");
  b.card("CONCEPT", "Why do owners want growth?", "Profit, economies of scale, market share, security, status.");
  b.card("CONCEPT", "Problems of growth?", "Poor communication, cash shortages, loss of control, low motivation, diseconomies of scale.");
  b.card("CONCEPT", "Internal vs external growth?", "Internal: slow, lower risk, keeps control. External: fast, costly, culture clashes, removes competitors.");
});
