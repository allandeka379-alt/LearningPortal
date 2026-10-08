// W3a: econ.structures.competitive-markets — competitive markets (both boards, no diagrams for Cambridge) and the
// features of perfect competition (ZIMSEC).
import { concept, P, schedule, check, fmt, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.structures.competitive-markets", { file: "structures/competitive-markets", keyPrefix: "structures.competitive-markets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a characteristic of a competitive market?",
    options: [
      ["Many sellers and easy entry for new firms", "Correct."],
      ["One seller protected by high barriers to entry", "That describes monopoly."],
      ["A few large firms that watch each other's prices", "That describes oligopoly."],
      ["A single buyer of the product", "Competitive markets have many buyers."],
    ],
    answer: "A",
    explanation: "Competitive markets have many buyers and sellers, similar products and easy entry and exit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do profits in a competitive market tend to be low in the long run?",
    options: [
      ["High profits attract new firms, which increase supply and push the price down", "Correct: entry competes profits away."],
      ["The government sets the price in all competitive markets", "Prices are set by demand and supply."],
      ["Firms in competitive markets have no costs to cover", "All firms have costs."],
      ["Consumers in competitive markets refuse to buy at any price above cost", "It is competition between sellers, not consumer refusal."],
    ],
    answer: "A",
    explanation: "Easy entry means abnormal profits attract new firms; supply rises and the price falls until only normal profit is earned.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the most likely effect of **many firms** in a market on the **quality** of products?",
    options: [
      ["Quality tends to improve as firms compete for customers", "Correct."],
      ["Quality always falls because firms make no profit", "Firms that offer poor quality lose customers."],
      ["Quality is unaffected because consumers cannot switch", "Consumers can easily switch in competitive markets."],
      ["Quality is set by law, so competition has no effect", "Competition gives firms an incentive to improve."],
    ],
    answer: "A",
    explanation: "Customers can easily switch to rivals, so firms have an incentive to improve quality and service.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which is a feature of **perfect competition**?",
    options: [
      ["Firms sell identical (homogeneous) products", "Correct."],
      ["Each firm sells a branded product", "Branding is a feature of monopolistic competition."],
      ["Barriers prevent new firms from entering", "Perfect competition has free entry."],
      ["One firm sets the price for the market", "Firms are price takers."],
    ],
    answer: "A",
    explanation: "Perfect competition: very many small firms, identical products, perfect knowledge, free entry and exit.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Why is a firm in perfect competition a **price taker**?",
    options: [
      ["It is too small to affect market supply and its product is identical to others'", "Correct: a higher price would lose all its customers."],
      ["The government fixes the price of every product it sells", "Perfect competition has no government interference."],
      ["It has no costs of production to cover", "It has costs like any firm."],
      ["Its customers have no information about other sellers' prices", "Perfect knowledge is a feature of perfect competition."],
    ],
    answer: "A",
    hints: ["What happens if it raises its price above the market price?"],
    explanation: "Each firm is tiny relative to the market and sells an identical product to buyers with perfect knowledge, so it must accept the market price.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "For a firm in perfect competition, which statement about revenue is correct?",
    options: [
      ["Price = average revenue = marginal revenue", "Correct: every unit sells at the market price."],
      ["Marginal revenue is less than price", "That is true for a firm that must cut price to sell more."],
      ["Average revenue falls as the firm sells more", "The price stays the same whatever it sells."],
      ["Total revenue is the same at every output", "TR rises with every unit sold."],
    ],
    answer: "A",
    hints: ["Does the firm need to cut its price to sell more?"],
    explanation: "The firm's demand curve is horizontal (perfectly elastic) at the market price, so P = AR = MR.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a **disadvantage** of a market made up of many small competing firms?",
    options: [
      ["Firms are too small to gain large economies of scale", "Correct: average costs may stay high."],
      ["Consumers have too much choice of products", "Choice is an advantage."],
      ["Prices are kept too close to costs of production", "Low prices benefit consumers."],
      ["Firms respond too quickly to consumers' wishes", "Responsiveness is an advantage."],
    ],
    answer: "A",
    hints: ["Which benefit of large size is missing?"],
    explanation: "Small firms cannot use large machines or bulk-buy, and low profits leave little for research.",
  });

  {
    const p = 0.65, q = 3400, tr = p * q;
    check("tr", tr, 2210);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: tr, daily: true, applies: ZIM,
      stem: `Rudo is one of many fictional growers selling identical cabbages at a market price of US\\$${p.toFixed(2)} each. She sells ${fmt(q)} cabbages in a month. Calculate her total revenue.`,
      wrong: [q / p],
      explanation: `As a price taker she receives the market price for every cabbage: TR = ${p.toFixed(2)} × ${fmt(q)} = **US\\$${fmt(tr)}**.`,
    });
  }
  {
    const prices = [1.6, 1.8, 2.0, 2.2, 2.4];
    const qd = [9300, 8800, 8300, 7800, 7300], qs1 = [6300, 6800, 7300, 7800, 8300], qs2 = [8300, 8800, 9300, 9800, 10300];
    const s1 = schedule({ prices, qd, qs: qs1, requireEquilibrium: true, priceHeader: "Price (US\\$ per dozen)", qdHeader: "Quantity demanded (dozen per week)", qsHeader: "Quantity supplied (dozen per week)" });
    const s2 = schedule({ prices, qd, qs: qs2, requireEquilibrium: true, priceHeader: "Price (US\\$ per dozen)", qdHeader: "Quantity demanded (dozen per week)", qsHeader: "Quantity supplied after entry (dozen per week)" });
    check("p1", s1.equilibrium.price, 2.2); check("p2", s2.equilibrium.price, 1.8);
    const stimulus = `The tables show the weekly market for eggs in a fictional town before and after new poultry farmers enter the market.\n\n**Before entry**\n\n${s1.md}\n\n**After entry**\n\n${s2.md}`;
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: s2.equilibrium.price - s1.equilibrium.price, dp: 2,
      stem: `${stimulus}\n\nBy how much does the market price of eggs change after the new farmers enter? Give a fall as a negative number, in US\\$ to two decimal places.`,
      wrong: [s1.equilibrium.price - s2.equilibrium.price, s2.equilibrium.price],
      hints: ["Find the price at which quantity demanded equals quantity supplied in each table."],
      explanation: `1. Before entry: quantity demanded = quantity supplied = ${fmt(s1.equilibrium.quantity)} dozen at US\\$${s1.equilibrium.price.toFixed(2)}.\n2. After entry: ${fmt(s2.equilibrium.quantity)} dozen at US\\$${s2.equilibrium.price.toFixed(2)}.\n3. Change = ${s2.equilibrium.price.toFixed(2)} − ${s1.equilibrium.price.toFixed(2)} = **−US\\$${(s1.equilibrium.price - s2.equilibrium.price).toFixed(2)}**.\n4. Entry raises supply, so the price falls and more eggs are bought: consumers gain, and the high profits that attracted the new farmers are reduced.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a competitive market, new firms find it easy to enter.",
    answer: true,
    explanation: "True. Low barriers to entry are a key characteristic of competitive markets.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a competitive market a firm can raise its price well above its rivals' prices without losing customers.",
    answer: false,
    explanation: "False. Products are close substitutes and buyers know rivals' prices, so a firm that charges much more loses customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In perfect competition, buyers and sellers have perfect knowledge of prices in the market.",
    answer: true,
    explanation: "True. Perfect knowledge is one of the assumptions of perfect competition.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each aspect of the market with the usual effect of many competing firms.",
    pairs: [
      ["Price", "Kept low, close to the cost of production"],
      ["Choice", "Wide range of products and sellers"],
      ["Profit in the long run", "Normal profit only, as new firms enter"],
      ["Quality", "Pressure to improve to keep customers"],
    ],
    explanation: "Competition benefits consumers through low prices, wide choice and better quality, while long-run profits are normal.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Complete the sentences about perfect competition.",
    template: "Each firm sells a {{blank:a}} product. The firm is a price {{blank:b}}. Its demand curve is perfectly {{blank:c}} at the market price.",
    blanks: [
      { id: "a", accepted: ["homogeneous"], choices: ["homogeneous", "branded", "unique"] },
      { id: "b", accepted: ["taker"], choices: ["taker", "maker", "setter"] },
      { id: "c", accepted: ["elastic"], choices: ["elastic", "inelastic"] },
    ],
    explanation: "Identical products and many firms make each firm a price taker facing a horizontal (perfectly elastic) demand curve.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages to consumers of a competitive market.",
    points: [
      "Low prices: firms cannot charge much above rivals.",
      "Because consumers would switch to close substitutes, so prices stay close to costs.",
      "Wide choice / better quality / good service.",
      "Because firms must attract customers away from many rivals.",
    ],
    modelAnswer: "First, prices are low: if one seller charges more, consumers switch to the many rivals selling similar products, so prices stay close to costs. Second, consumers get wide choice and better quality, because each firm must offer something to attract customers away from its many competitors.",
    hints: ["Think about price, choice and quality."],
    explanation: "Two advantages, each explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "In a fictional town there are about 150 sellers of second-hand clothes at the main market. Anyone can rent a stall for a small daily fee. Prices for similar items are almost the same at every stall, and shoppers walk from stall to stall comparing them. Last year a few sellers made high profits by selling school uniforms; this year many more sellers are offering uniforms.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which feature of the market makes it easy for new sellers to start?", options: [["Anyone can rent a stall for a small fee", "Correct: low barriers to entry."], ["Prices are almost the same at every stall", "That shows competition, not ease of entry."], ["Shoppers compare prices", "That is good information, not ease of entry."], ["There are about 150 sellers", "Many sellers is a result, not the cause, of easy entry."]], answer: "A", explanation: "A low stall fee means low barriers to entry." }),
      P.manual({ label: "(b)", marks: 3, stem: "Identify **three** characteristics of a competitive market shown in the information.", points: ["Many sellers (about 150).", "Similar products / similar prices at every stall.", "Easy entry (small stall fee) / good information (shoppers compare prices)."], modelAnswer: "There are many sellers (about 150); the products and prices are similar at every stall; and entry is easy because anyone can rent a stall for a small fee, while shoppers have good information because they compare prices." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain what is likely to happen to the price of school uniforms and to sellers' profits this year.", points: ["High profits last year attracted more sellers into uniforms.", "Supply of uniforms increases.", "So the price of uniforms falls (sellers compete for shoppers).", "So profits fall towards normal profit."], modelAnswer: "The high profits made on uniforms last year attracted many more sellers this year, so the supply of uniforms has increased. With many stalls competing for the same shoppers, the price of uniforms will fall, and the profits of uniform sellers will fall towards normal profit." }),
      P.manual({ label: "(d)", marks: 4, levels: LV(4), stem: "Discuss whether shoppers benefit from the large number of sellers.", points: ["Benefit: low prices, wide choice, ability to compare / bargain.", "Benefit: sellers improve quality and service to attract customers.", "Limit: quality of second-hand goods may vary; time spent searching; small sellers may close, reducing reliability / after-sales service.", "Justified conclusion."], modelAnswer: "Shoppers benefit from low prices, a wide choice and the ability to compare prices at many stalls, and sellers try to attract them with better items and service. However, the quality of second-hand clothes varies, shoppers spend time searching, and small sellers can close suddenly, so there is little after-sales service. Overall shoppers benefit, because low prices and choice matter most for second-hand clothing." }),
    ],
    explanation: "(a) Low barriers to entry. (b) Many sellers, similar products, easy entry, good information. (c) Entry raises supply, price and profit fall. (d) Low prices and choice against variable quality and search time.",
    hints: ["Link high profits to the entry of new sellers."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8, applies: ZIM,
    stem: "Many economists use perfect competition as a benchmark for judging real markets, although few markets meet all its conditions.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** features of perfect competition.", points: ["Any one feature: many small buyers and sellers / identical products.", "Another: perfect knowledge / free entry and exit / perfect mobility of factors."], modelAnswer: "A very large number of small firms selling identical products, and freedom of entry and exit." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether perfect competition is the best market structure for consumers.",
        points: [
          "For: price equals marginal cost (allocative efficiency) and lowest average cost in the long run (productive efficiency).",
          "For: only normal profit in the long run, so prices are as low as possible; consumers' wishes guide resources.",
          "Against: identical products mean no choice of brands or variety.",
          "Against: small firms gain no economies of scale; low profits leave nothing for research and innovation.",
          "Against: the conditions rarely exist in practice.",
          "Justified conclusion.",
        ],
        modelAnswer: "Perfect competition gives consumers low prices: in the long run firms earn only normal profit, produce at the lowest average cost and charge a price equal to marginal cost, so resources go to what consumers want. However, products are identical, so there is no variety or branding, and small firms cannot gain economies of scale or afford research, so new and better products may not appear; a large firm could sometimes produce more cheaply. The conditions are also rarely met. Perfect competition is best for consumers of simple, identical goods such as vegetables, but in industries with large economies of scale or rapid innovation, other structures may serve consumers better.",
      }),
    ],
    explanation: "(a) Features of perfect competition. (b) Efficiency and low prices against lack of variety, economies of scale and innovation.",
    hints: ["Think about efficiency, variety and innovation."],
  });

  b.card("DEFINITION", "Competitive market", "A market with many buyers and sellers of similar products, easy entry and exit and good information, so no firm controls the price.");
  b.card("DEFINITION", "Barriers to entry", "Obstacles that stop new firms from entering a market, e.g. high start-up costs, licences, patents.");
  b.card("CONCEPT", "Effect of many firms on price, quality, choice and profit", "Low prices, pressure to improve quality, wide choice, normal profit in the long run.");
  b.card("CONCEPT", "Why profits fall in competitive markets", "High profits attract new firms; supply rises and price falls until only normal profit remains.");
  b.card("CONCEPT", "Disadvantages of competitive markets", "Few economies of scale, little money for research, duplication of resources, frequent business failure.");
  b.card("FACT", "Features of perfect competition", "Very many small firms, identical products, perfect knowledge, free entry and exit, perfect factor mobility.", null, { applies: ZIM });
  b.card("DEFINITION", "Price taker", "A firm that must accept the market price because it is too small to influence it.");
  b.card("FACT", "Revenue of a firm in perfect competition", "Price = AR = MR; the firm's demand curve is horizontal (perfectly elastic).", null, { applies: ZIM });
  b.card("FACT", "Examples close to perfect competition", "Markets for agricultural produce such as maize, vegetables and eggs.", null, { applies: ZIM });
});
