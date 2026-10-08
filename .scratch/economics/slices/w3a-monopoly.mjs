// W3a: econ.structures.monopoly — characteristics, barriers to entry, effects on price, quality, choice and profit,
// advantages and disadvantages, monopoly as a cause of market failure (no diagrams for Cambridge).
import { concept, P, table, check, fmt, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.structures.monopoly", { file: "structures/monopoly", keyPrefix: "structures.monopoly" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a characteristic of a **monopoly**?",
    options: [
      ["A single seller of a product with no close substitutes", "Correct."],
      ["Many sellers of identical products", "That describes perfect competition."],
      ["Many sellers of slightly different branded products", "That describes monopolistic competition."],
      ["Free entry and exit for new firms", "Monopoly has high barriers to entry."],
    ],
    answer: "A",
    explanation: "Monopoly: one seller, no close substitutes, high barriers to entry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **legal** barrier to entry?",
    options: [
      ["A patent on a new medicine", "Correct: the law stops others copying it for a period."],
      ["Large economies of scale", "That is a cost barrier."],
      ["Strong brand loyalty", "That is a marketing barrier."],
      ["High start-up costs", "That is a financial barrier."],
    ],
    answer: "A",
    explanation: "Patents, licences and government franchises are legal barriers to entry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a monopoly continue to earn abnormal profits in the long run?",
    options: [
      ["Barriers to entry stop new firms from entering and competing", "Correct."],
      ["Its costs are always lower than those of any other firm", "Not necessarily; barriers are the key."],
      ["Consumers prefer to pay higher prices", "Consumers pay because they have no alternative."],
      ["The government guarantees every monopoly a profit", "There is no such guarantee."],
    ],
    explanation: "In competitive markets entry competes profits away; barriers to entry prevent this in monopoly.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Compared with a competitive market, what is a monopoly most likely to do?",
    options: [
      ["Charge a higher price and sell a smaller quantity", "Correct: it restricts supply to raise price."],
      ["Charge a lower price and sell a larger quantity", "That is the competitive outcome."],
      ["Charge a higher price and sell a larger quantity", "A higher price reduces the quantity demanded."],
      ["Charge the same price and sell the same quantity", "Monopoly power changes the outcome."],
    ],
    answer: "A",
    explanation: "A monopoly restricts output to push up the price, earning abnormal profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which industry is the **best** example of a natural monopoly?",
    options: [
      ["Distribution of piped water in a town", "Correct: a second network would double costs."],
      ["Hairdressing in a city centre", "Many small firms can compete."],
      ["Selling vegetables at a market", "Many sellers, low costs of entry."],
      ["Making school uniforms", "Many firms can supply."],
    ],
    answer: "A",
    explanation: "Where infrastructure costs are huge, one firm can supply the whole market most cheaply.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is monopoly described as a cause of **market failure**?",
    options: [
      ["It restricts supply and raises price, so too little is produced", "Correct."],
      ["It always produces more of the product than consumers want to buy", "A monopoly restricts output."],
      ["It creates external benefits for third parties in the market", "That is not why monopoly is a market failure."],
      ["It is always owned and run by the government", "Monopolies can be private or public."],
    ],
    answer: "A",
    hints: ["Compare the monopoly's output with what a competitive market would produce."],
    explanation: "Restricted output and higher prices mean resources are not allocated in line with consumers' wishes.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest argument that a monopoly might **benefit** consumers?",
    options: [
      ["Economies of scale may give it lower costs, which could allow lower prices", "Correct: possible if savings are passed on."],
      ["It offers consumers a wider choice of products than competitors would", "Monopoly usually reduces choice."],
      ["It has a strong incentive to cut prices to win customers from rivals", "It has no rivals."],
      ["It must charge the price set by the market", "A monopoly is a price maker."],
    ],
    answer: "A",
    hints: ["Which advantage comes from the firm's large size?"],
    explanation: "A large single firm may have lower average costs; abnormal profit can also fund research. Whether consumers gain depends on whether savings are passed on.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A dominant soft-drinks firm cuts its prices below cost in one town each time a new rival opens there, and raises them again once the rival closes. What is this?",
    options: [
      ["An anti-competitive practice that acts as a barrier to entry", "Correct: predatory pricing."],
      ["An economy of scale that lowers average cost", "Pricing below cost is not a cost saving."],
      ["A legal barrier granted by the government", "No law is involved."],
      ["Normal competition that benefits consumers in the long run", "Prices rise again once the rival leaves."],
    ],
    answer: "A",
    hints: ["What happens to prices after the rival closes?"],
    explanation: "Predatory pricing drives out rivals and deters entry; consumers lose once prices rise again.",
  });

  // Monopoly pricing table (different from the lesson).
  {
    const p = [6, 7, 8, 9, 10, 11], q = [42000, 39000, 35000, 30000, 24000, 17000], ac = 6;
    const prof = p.map((x, i) => (x - ac) * q[i]);
    const best = prof.indexOf(Math.max(...prof));
    check("best", p[best], 10); check("prof", prof[best], 96000);
    const tD = table(["Price (US\\$ per bag)", "Quantity demanded (bags per month)"], p.map((x, i) => [x, q[i]]));
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: p[best],
      stem: `A fictional firm is the only supplier of a type of fertiliser in a country. Its cost per bag, including a normal return, is US\\$${ac} at every output. Demand is shown below.\n\n${tD}\n\nAt which price is the firm's abnormal profit greatest?`,
      wrong: [p[0], p[p.length - 1]],
      hints: ["Abnormal profit = (price − 6) × quantity.", "Work it out at every price."],
      explanation: `1. Abnormal profit = (price − ${ac}) × quantity: ${p.map((x, i) => `US\\$${x}: ${fmt(prof[i])}`).join("; ")}.\n2. The greatest is US\\$${fmt(prof[best])} at a price of **US\\$${p[best]}** (${fmt(q[best])} bags).\n3. A competitive market would sell at about US\\$${ac} (${fmt(q[0])} bags): the monopoly charges US\\$${p[best] - ac} more and sells ${fmt(q[0] - q[best])} fewer bags. The highest price (US\\$${p[p.length - 1]}) loses too many sales.`,
    });
  }
  {
    const pc = 4.5, pm = 6.3, ch = pctChange(pc, pm);
    check("ch", ch, 40);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: ch, daily: true,
      stem: `When a fictional bus route was served by several operators, the fare was US\\$${pc.toFixed(2)}. After one operator bought out the others, the fare rose to US\\$${pm.toFixed(2)}. Calculate the percentage rise in the fare, to one decimal place.`,
      wrong: [pctChange(pm, pc) * -1, pm - pc],
      explanation: `(${pm.toFixed(2)} − ${pc.toFixed(2)}) ÷ ${pc.toFixed(2)} × 100 = **${fmt(ch, 1)}%**. Dividing by the new fare gives ${fmt(-pctChange(pm, pc), 1)}%, the wrong base. A single seller can raise the price because passengers have no alternative.`,
    });
  }
  {
    const firm = 228, tot = 240, sh = (firm / tot) * 100;
    check("sh", sh, 95);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: sh, daily: true,
      stem: `A fictional sugar refiner sells US\\$${firm} million of sugar a year in a country where total sugar sales are US\\$${tot} million. Calculate its market share, to one decimal place.`,
      wrong: [(tot / firm) * 100],
      explanation: `${firm} ÷ ${tot} × 100 = **${fmt(sh, 1)}%**. With such a dominant share, the firm has monopoly power even if a few small rivals exist.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A monopoly is a price maker.",
    answer: true,
    explanation: "True. With no close competitors it can set its price, although the quantity it sells then depends on demand.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A monopoly can charge a higher price and still sell as much as it would at a lower price.",
    answer: false,
    explanation: "False. A monopoly faces the market demand curve: a higher price means a smaller quantity demanded.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each barrier to entry with an example.",
    pairs: [
      ["Legal barrier", "Only one firm is licensed to run the national railway"],
      ["Economies of scale", "The existing firm's cost per unit is far below a newcomer's"],
      ["Control of raw materials", "The firm owns the only quarry of a mineral"],
      ["Brand loyalty", "Customers trust a long-established name and will not switch"],
    ],
    explanation: "Each barrier keeps potential rivals out in a different way.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the effect of a monopoly compared with a competitive market.",
    template: "Price is usually {{blank:a}}. Choice is usually {{blank:b}}. Abnormal profit can be earned in the {{blank:c}} run.",
    blanks: [
      { id: "a", accepted: ["higher"], choices: ["higher", "lower"] },
      { id: "b", accepted: ["less"], choices: ["less", "greater"] },
      { id: "c", accepted: ["long"], choices: ["long", "short only"] },
    ],
    explanation: "Monopoly: higher price, less choice and long-run abnormal profit because barriers block entry.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** barriers to entry that could protect a monopoly mobile network operator.",
    points: [
      "High start-up costs: building towers and a network costs a huge amount.",
      "So few new firms can raise the capital to compete.",
      "Legal barrier: a government licence / limited radio spectrum.",
      "So only licensed firms are allowed to operate.",
    ],
    modelAnswer: "First, start-up costs are very high: a new operator must build masts and a network across the country, which few firms can finance. Second, operators need a government licence and radio frequencies, which are limited, so new firms may simply not be allowed to enter.",
    hints: ["Think about cost and about the law."],
    explanation: "Two barriers, each identified and explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `A fictional country has one firm that refines and sells cooking oil; imports are banned. The table compares this market with a neighbouring country where many firms compete and imports are allowed.\n\n${table(["Item", "Country with one firm", "Neighbouring country with many firms"], [["Price of a 2-litre bottle (US\\$)", "4.40", "3.20"], ["Sales (million bottles per year)", 30, 38], ["Number of brands on sale", 1, 9]])}`,
    parts: (() => {
      const pd = 4.4 - 3.2, pc = pctChange(3.2, 4.4);
      check("pc", pc, 37.5);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: pd, dp: 2, stem: "Calculate the difference in the price of a bottle between the two countries.", wrong: [4.4 + 3.2], explanation: "4.40 − 3.20 = US\\$1.20." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, stem: "Calculate how much higher, as a percentage, the price is in the country with one firm than in the neighbouring country, to one decimal place.", wrong: [(1.2 / 4.4) * 100], explanation: `1.20 ÷ 3.20 × 100 = ${fmt(pc, 1)}%.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Identify the barrier to entry in the country with one firm and explain how it protects the firm.", points: ["Ban on imports (a legal barrier).", "Foreign producers cannot sell in the country.", "So the firm faces no competition and can keep its price high."], modelAnswer: "The ban on imports is a legal barrier: foreign producers are not allowed to sell cooking oil in the country, so the firm faces no competition and can keep its price high." }),
        P.manual({ label: "(d)", marks: 6, stem: "Using the data, analyse the effects of the monopoly on consumers in terms of price, choice and quantity.", points: ["Price is US\\$1.20 (37.5%) higher.", "Because the firm faces no rivals, it can restrict supply and raise price.", "Choice: only one brand against nine.", "Consumers cannot switch to better-value or preferred products.", "Quantity: 30 million bottles against 38 million: less is bought.", "Higher prices take a larger share of household income, especially for poor households."], modelAnswer: "Consumers pay US\\$1.20 more per bottle, 37.5% more than in the neighbouring country, because the firm has no rivals and can restrict supply to raise its price. They have only one brand to choose from instead of nine, so they cannot switch if they dislike the product or its price. Sales are 30 million bottles against 38 million, so less oil is consumed, and since cooking oil is a necessity, the higher price takes a larger share of poorer households' income." }),
      ];
    })(),
    explanation: "(a) US\\$1.20. (b) 37.5%. (c) Import ban as a legal barrier. (d) Higher price, less choice and lower quantity.",
    hints: ["Compare the two columns line by line."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country's only railway company carries both goods and passengers. Some people want the government to allow new private rail companies to run trains on the same tracks.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define a **monopoly**.", points: ["A single seller in a market.", "Of a product with no close substitutes / protected by barriers to entry."], modelAnswer: "A monopoly is a market with a single seller of a product that has no close substitutes, protected by barriers to entry." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether allowing competition on the railway would benefit consumers.",
        points: [
          "Benefit: competition puts pressure on fares (lower prices).",
          "Benefit: better service, punctuality and new services to attract customers; more efficient operators.",
          "Against: tracks are a natural monopoly; duplication not possible, so competition limited to trains.",
          "Against: loss of economies of scale; co-ordination / safety problems; unprofitable routes may be dropped.",
          "Depends on regulation of access to the tracks and of safety.",
          "Justified conclusion.",
        ],
        modelAnswer: "Allowing private companies to run trains would give the existing operator rivals, putting pressure on fares and encouraging better punctuality and service as companies try to win passengers and freight. However, the tracks are a natural monopoly, so competition can only be between train operators; splitting services may lose economies of scale, make timetables and safety harder to co-ordinate, and new operators may run only profitable routes, leaving rural lines with poorer service. If a regulator sets fair charges for the tracks and safety standards, competition between operators is likely to benefit consumers; without good regulation the benefits may be small.",
      }),
    ],
    explanation: "(a) Single seller, no close substitutes. (b) Lower fares and better service against natural monopoly, lost economies of scale and co-ordination.",
    hints: ["Which part of the railway is a natural monopoly?"],
  });

  b.card("DEFINITION", "Monopoly", "A market with a single seller of a product with no close substitutes, protected by barriers to entry.");
  b.card("CONCEPT", "Barriers to entry", "Legal rights (licences, patents), economies of scale, high start-up costs, control of raw materials or outlets, brand loyalty, anti-competitive practices.");
  b.card("DEFINITION", "Natural monopoly", "An industry where one firm can supply the whole market at lower average cost than several firms, e.g. water pipes or a power grid.");
  b.card("CONCEPT", "Effect of one firm on price, quality, choice and profit", "Higher price, possibly lower quality, less choice, abnormal profit in the long run.");
  b.card("CONCEPT", "Advantages of monopoly", "Economies of scale, research funded by profits, no duplication of infrastructure, stability.");
  b.card("CONCEPT", "Disadvantages of monopoly", "Higher prices, restricted output, less choice, little incentive to be efficient, exploitation of consumers.");
  b.card("FACT", "Why is monopoly a market failure?", "It restricts supply and raises price, so too few resources are used to make the product.");
  b.card("FACT", "Can a monopoly set both price and quantity?", "No. It sets one; demand then decides the other. A higher price means lower sales.");
  b.card("CONCEPT", "Government responses to monopoly", "Competition policy, price and quality regulation, public ownership, removing barriers to entry.");
});
