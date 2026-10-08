// W3a: econ.structures.monopolistic-competition (ZIMSEC only) — features, advantages and disadvantages of monopolistic
// competition; outline of oligopoly (few firms, interdependence, non-price competition, collusion, concentration ratio).
import { concept, P, table, check, fmt, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.structures.monopolistic-competition", { file: "structures/monopolistic-competition", keyPrefix: "structures.monopolistic-competition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a feature of **monopolistic competition**?",
    options: [
      ["Many firms selling differentiated products", "Correct."],
      ["One firm selling a product with no substitutes", "That is monopoly."],
      ["A few large firms that depend on each other's decisions", "That is oligopoly."],
      ["Many firms selling identical products", "That is perfect competition."],
    ],
    answer: "A",
    explanation: "Monopolistic competition: many firms, differentiated products, low barriers to entry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which market is the **best** example of monopolistic competition?",
    options: [
      ["Restaurants and takeaways in a city centre", "Correct: many firms with different menus and styles."],
      ["The national electricity grid", "That is a natural monopoly."],
      ["A market with three mobile network operators", "That is an oligopoly."],
      ["Identical maize sold by hundreds of farmers", "That is close to perfect competition."],
    ],
    answer: "A",
    explanation: "Many restaurants offer different food, service and locations, with easy entry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **non-price competition**?",
    options: [
      ["A bakery offering a loyalty card that gives every tenth loaf free", "Correct: competing by a means other than the price itself."],
      ["A bakery cutting the price of its bread by 10%", "That is price competition."],
      ["A bakery matching the price of a rival's bread", "That is price competition."],
      ["A bakery raising its price because flour costs more", "That is a price change, not competition by other means."],
    ],
    answer: "A",
    explanation: "Non-price competition includes branding, advertising, loyalty schemes, quality and service.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a firm in monopolistic competition have **some** control over its price?",
    options: [
      ["Its product is differentiated, so some buyers stay loyal", "Correct: it faces a downward-sloping demand curve."],
      ["It is the only seller of the product in its market", "There are many sellers."],
      ["High barriers stop other firms from entering the market", "Barriers are low."],
      ["The government lets it set the market price", "No government role is involved."],
    ],
    answer: "A",
    explanation: "Brand loyalty means the firm keeps some customers if it raises its price, but close substitutes keep demand elastic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **interdependence** in an oligopoly?",
    options: [
      ["Each firm must consider how rivals will react before changing its price", "Correct."],
      ["Firms depend on the government for their profits", "Not the meaning here."],
      ["Each firm produces a product that depends on another firm's product", "That describes complements or supply chains."],
      ["Firms share all their profits equally", "That is not what interdependence means."],
    ],
    answer: "A",
    explanation: "With only a few firms, one firm's decision affects the others, so each must predict its rivals' reactions.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do firms in an oligopoly often prefer non-price competition to cutting prices?",
    options: [
      ["Price cuts are quickly matched by rivals, so no firm gains customers", "Correct: a price war cuts everyone's profit."],
      ["The law forbids oligopolies from changing their prices", "There is no such law."],
      ["Consumers never respond to lower prices", "Consumers do respond, but rivals match the cut."],
      ["Advertising has no cost to the firm", "Advertising is costly."],
    ],
    answer: "A",
    hints: ["What will rivals do if one firm cuts its price?"],
    explanation: "Because rivals match price cuts, firms compete through advertising, branding and new products instead, and prices tend to be rigid.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do firms in monopolistic competition earn only normal profit in the long run?",
    options: [
      ["New firms enter easily and take customers until abnormal profit goes", "Correct."],
      ["The government taxes away all of their abnormal profit", "Entry, not tax, removes the profit."],
      ["Their products are identical, so they must be price takers", "Products are differentiated."],
      ["They are forced by law to charge the lowest possible price", "There is no such law."],
    ],
    answer: "A",
    hints: ["What happens when one salon in a town is very profitable?"],
    explanation: "Abnormal profit attracts new firms; each existing firm's demand falls until only normal profit remains.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a **disadvantage** of monopolistic competition compared with perfect competition?",
    options: [
      ["Advertising and excess capacity raise prices", "Correct."],
      ["Consumers have less variety of products to choose from", "Variety is greater, not less."],
      ["New firms can never enter the market", "Entry is easy."],
      ["Firms earn abnormal profits forever, even in the long run", "Profits are normal in the long run."],
    ],
    answer: "A",
    hints: ["Think about costs that perfect competitors do not have."],
    explanation: "Branding and advertising add costs, and many firms produce below their lowest-cost output, so prices are above the perfectly competitive level.",
  });

  {
    const s = [96, 72, 54, 42, 36], tot = 300;
    const cr4 = ((s[0] + s[1] + s[2] + s[3]) / tot) * 100;
    check("tot", s.reduce((a, x) => a + x, 0) + 0, tot); check("cr4", cr4, 88);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: cr4,
      stem: `In a fictional country's banking market, total deposits are US\\$${tot} million. The four largest banks hold US\\$${s[0]} million, US\\$${s[1]} million, US\\$${s[2]} million and US\\$${s[3]} million; many small banks hold the remaining US\\$${s[4]} million. Calculate the four-firm concentration ratio, to one decimal place.`,
      wrong: [(s[0] / tot) * 100, (s[4] / tot) * 100],
      hints: ["Add the four largest firms' figures, then divide by the total."],
      explanation: `1. Four largest: ${s.slice(0, 4).join(" + ")} = ${s[0] + s[1] + s[2] + s[3]}.\n2. CR4 = ${s[0] + s[1] + s[2] + s[3]} ÷ ${tot} × 100 = **${fmt(cr4, 1)}%**.\n3. Four banks hold most deposits: an oligopoly. ${fmt((s[0] / tot) * 100, 1)}% is the share of the largest bank only.`,
    });
  }
  {
    const p0 = 5, p1 = 5.5, q0 = 600, q1 = 450, ch = pctChange(q0, q1);
    check("ch", ch, -25);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: ch, daily: true,
      stem: `A fictional takeaway raises the price of a meal from US\\$${p0} to US\\$${p1.toFixed(2)}. Its weekly sales fall from ${q0} to ${q1} meals. Calculate the percentage change in sales, to one decimal place. Give a fall as a negative number.`,
      wrong: [-ch, pctChange(q1, q0)],
      explanation: `(${q1} − ${q0}) ÷ ${q0} × 100 = **${fmt(ch, 1)}%**. The price rose by 10% but sales fell by 25%: demand is price elastic because there are many similar takeaways nearby.`,
    });
  }
  {
    const p0 = 6, p1 = 6.6, q0 = 500, q1 = 410, tr0 = p0 * q0, tr1 = p1 * q1;
    check("tr1", tr1, 2706);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: tr1 - tr0,
      stem: `A fictional car-wash business raises its price from US\\$${p0} to US\\$${p1.toFixed(2)}. The number of cars washed each month falls from ${q0} to ${q1}. Calculate the change in its monthly total revenue. Give a fall as a negative number.`,
      wrong: [tr0 - tr1, (q1 - q0) * p0],
      hints: ["TR = price × quantity, before and after."],
      explanation: `1. TR before = ${p0} × ${q0} = US\\$${fmt(tr0)}.\n2. TR after = ${p1.toFixed(2)} × ${q1} = US\\$${fmt(tr1)}.\n3. Change = **−US\\$${fmt(tr0 - tr1)}**.\n4. With many rival car washes, demand is price elastic, so raising the price lowers revenue: the firm has only a little control over its price.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In monopolistic competition, barriers to entry are high.",
    answer: false,
    explanation: "False. Barriers are low, so new firms can enter easily.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Collusion between oligopolists to fix prices usually harms consumers.",
    answer: true,
    explanation: "True. Firms acting together like a monopoly can raise prices and restrict output; collusion is illegal in many countries.",
  });
  b.match({
    d: 4, skill: "ANALYSIS",
    stem: "Match each market structure with its feature.",
    pairs: [
      ["Perfect competition", "Identical products sold by very many firms"],
      ["Monopolistic competition", "Many firms selling differentiated products"],
      ["Oligopoly", "A few large interdependent firms"],
      ["Monopoly", "A single seller protected by barriers to entry"],
    ],
    hints: ["Count the firms and look at the products."],
    explanation: "The structures differ by the number of firms, the type of product and the barriers to entry.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Making a product different from rivals' through branding is called product {{blank:a}}. A formal agreement between firms to fix prices is called a {{blank:b}}. In oligopoly, prices tend to be {{blank:c}} for long periods.",
    blanks: [
      { id: "a", accepted: ["differentiation"], choices: ["differentiation", "integration", "diversification"] },
      { id: "b", accepted: ["cartel"], choices: ["cartel", "co-operative", "merger"] },
      { id: "c", accepted: ["stable"], choices: ["stable", "falling", "rising"] },
    ],
    explanation: "Differentiation, cartels and price rigidity are key terms for these structures.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of monopolistic competition for consumers.",
    points: [
      "Wide choice / variety of products and styles.",
      "Because each firm differentiates its product to attract customers.",
      "Prices kept fairly low / normal profit in the long run / innovation and quality.",
      "Because many close substitutes and easy entry limit each firm's power.",
    ],
    modelAnswer: "First, consumers get a wide variety, because each firm tries to make its product different, for example salons offering different styles and services. Second, prices stay fairly low and profits are normal in the long run, because there are many close substitutes and new firms can enter if profits are high.",
    hints: ["Think about variety and price."],
    explanation: "Two advantages, each explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `The table shows the market for bottled water in a fictional country.\n\n${table(["Firm", "Annual sales (US\\$ million)"], [["Firm P", 44], ["Firm Q", 36], ["Firm R", 24], ["Firm S", 16], ["About 40 small firms (together)", 40]])}`,
    parts: (() => {
      const s = [44, 36, 24, 16, 40], tot = 160, shP = (44 / tot) * 100, cr4 = (120 / tot) * 100;
      check("tot", s.reduce((a, x) => a + x, 0), tot); check("cr4", cr4, 75); check("shP", shP, 27.5);
      return [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: tot, stem: "Calculate total sales in the market, in US\\$ million.", wrong: [120], explanation: "44 + 36 + 24 + 16 + 40 = 160." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: shP, stem: "Calculate Firm P's market share, to one decimal place.", wrong: [(44 / 120) * 100], explanation: `44 ÷ 160 × 100 = ${fmt(shP, 1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: cr4, stem: "Calculate the four-firm concentration ratio, to one decimal place.", wrong: [(40 / tot) * 100], explanation: `(44 + 36 + 24 + 16) ÷ 160 × 100 = 120 ÷ 160 × 100 = ${fmt(cr4, 1)}%.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why this market can be described as an oligopoly.", points: ["The four largest firms have 75% of sales: a high concentration ratio.", "A few large firms dominate, although there are many small firms.", "Their decisions are likely to be interdependent."], modelAnswer: "The four largest firms have 75% of all sales, so a few large firms dominate the market even though about 40 small firms exist. Each large firm's pricing and advertising decisions will affect the others, so they are interdependent: an oligopoly." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain **two** forms of non-price competition the large firms are likely to use.", points: ["Advertising / branding (e.g. sponsorship, distinctive bottles).", "To build loyalty so customers do not switch.", "Promotions / new products (flavoured water, larger packs) / wider distribution.", "Because price cuts would be matched by rivals."], modelAnswer: "First, advertising and branding, such as sponsoring sports events and using distinctive bottles, to build customer loyalty. Second, new products and promotions, such as flavoured water or bonus packs, to attract customers; they prefer these to price cuts, which rivals would quickly match." }),
      ];
    })(),
    explanation: "(a) US\\$160 million. (b) 27.5%. (c) 75.0%. (d) High concentration and interdependence. (e) Advertising and branding; new products and promotions.",
    hints: ["Concentration ratio = combined share of the largest firms."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional town there are 35 small clothing shops, each with its own style and loyal customers. New shops open and others close every year.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** features of monopolistic competition shown in this market.", points: ["Many firms (35 shops).", "Differentiated products (own style) / low barriers (shops open and close)."], modelAnswer: "There are many firms, 35 shops, and each sells a differentiated product with its own style; entry and exit are easy." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether consumers in the town benefit more from these 35 small shops than they would from one large clothing store.",
        points: [
          "Small shops: wide variety and choice of styles; personal service; competition keeps prices in check.",
          "Small shops: entry of new shops keeps profits normal and brings new ideas.",
          "One large store: economies of scale (bulk buying) could mean lower prices; one-stop shopping.",
          "One large store: but it might have monopoly power, less choice, higher prices over time.",
          "Small shops may have higher costs (excess capacity, no bulk buying) and spend on advertising.",
          "Justified conclusion.",
        ],
        modelAnswer: "The 35 small shops give consumers wide variety, personal service and competition that keeps prices in check, and new shops bring new styles while keeping profits normal. However, small shops cannot buy in bulk and many are half-empty, so their costs and prices may be higher than a large store's. One large store might offer lower prices through economies of scale and the convenience of one-stop shopping, but as the only clothing seller it could gain monopoly power, reduce choice and raise prices later. Overall consumers probably benefit more from the many small shops, because clothing is a product where variety matters and competition protects them from high prices.",
      }),
    ],
    explanation: "(a) Many firms, differentiated products, easy entry. (b) Variety and competition against economies of scale.",
    hints: ["Weigh variety and competition against economies of scale."],
  });

  b.card("DEFINITION", "Monopolistic competition", "Many firms selling differentiated products, with low barriers to entry and some control over price.");
  b.card("DEFINITION", "Product differentiation", "Making a product different from rivals' through branding, design, quality, location or service.");
  b.card("DEFINITION", "Non-price competition", "Competing through advertising, branding, loyalty schemes, quality and service rather than price.");
  b.card("CONCEPT", "Long-run profit in monopolistic competition", "Normal profit: abnormal profit attracts new firms, which take customers until it disappears.");
  b.card("DEFINITION", "Oligopoly", "A market dominated by a few large, interdependent firms, usually protected by barriers to entry.");
  b.card("CONCEPT", "Interdependence (oligopoly)", "Each firm must consider how rivals will react before changing its price or output.");
  b.card("DEFINITION", "Cartel", "A formal agreement between firms (or countries) to fix prices or limit output, acting like a monopoly.");
  b.card("FORMULA", "Four-firm concentration ratio", "Combined market share of the four largest firms = their sales ÷ total market sales × 100.");
  b.card("CONCEPT", "Disadvantages of monopolistic competition", "Higher prices than perfect competition, advertising costs, excess capacity and duplication.");
});
