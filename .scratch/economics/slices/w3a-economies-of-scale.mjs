// W3a: econ.firms.economies-of-scale — internal and external economies and diseconomies, the LRAC curve in words/tables.
import { concept, P, table, check, fmt, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.economies-of-scale", { file: "firms/economies-of-scale", keyPrefix: "firms.economies-of-scale" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are **economies of scale**?",
    options: [
      ["Falls in long-run average cost as a firm increases its scale", "Correct."],
      ["Falls in total cost as a firm increases its output", "Total cost rises with output; it is average cost that falls."],
      ["Rises in long-run average cost as a firm grows too large", "Those are diseconomies of scale."],
      ["Savings made by cutting the output of a firm", "Economies of scale come from growing, not shrinking."],
    ],
    answer: "A",
    explanation: "Economies of scale are reductions in long-run average cost that come from a larger scale of production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A large supermarket chain receives a discount for buying sugar by the truckload. Which economy of scale is this?",
    options: [
      ["Purchasing (bulk-buying)", "Correct: lower price per unit for large orders."],
      ["Financial (cheaper borrowing)", "Financial economies concern borrowing and raising capital."],
      ["Managerial (specialist staff)", "Managerial economies come from specialist managers."],
      ["Risk-bearing (diversification)", "Risk-bearing economies come from diversification."],
    ],
    answer: "A",
    explanation: "Discounts for large orders are purchasing (bulk-buying) economies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A large company can borrow from banks at a lower interest rate than a small firm. Which economy of scale is this?",
    options: [
      ["Financial", "Correct: lenders see large firms as less risky."],
      ["Technical", "Technical economies concern production methods and machinery."],
      ["Marketing", "Marketing economies concern advertising and distribution."],
      ["External", "This comes from the firm's own size: it is internal."],
    ],
    answer: "A",
    explanation: "Cheaper and easier borrowing is a financial economy of scale.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **external** economy of scale?",
    options: [
      ["A college near a group of textile firms trains skilled machinists", "Correct: it benefits every firm in the area."],
      ["A firm buys a larger and more efficient machine", "That is an internal technical economy."],
      ["A firm employs a specialist accountant", "That is an internal managerial economy."],
      ["A firm spreads the cost of an advertising campaign over more sales", "That is an internal marketing economy."],
    ],
    answer: "A",
    explanation: "External economies come from the growth of the industry or area, such as a pool of trained labour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **best** example of an internal diseconomy of scale?",
    options: [
      ["Instructions pass through many layers of managers and become delayed", "Correct: a communication problem in a large firm."],
      ["Suppliers offer discounts for very large orders", "That is a purchasing economy."],
      ["Traffic congestion in the industrial area delays deliveries to every firm", "That is an external diseconomy."],
      ["A new power line lowers costs for all firms in the area", "That is an external economy."],
    ],
    answer: "A",
    explanation: "Communication problems within an over-large firm raise its average cost: an internal diseconomy.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Average cost is on the vertical axis and output on the horizontal axis. What happens to a firm's average cost curve when the government builds a new rail link that lowers transport costs for every firm in the industry?",
    options: [
      ["The whole curve shifts downwards", "Correct: an external economy lowers costs at every output."],
      ["The firm moves down along its existing curve", "A movement along the curve comes from the firm's own change of scale."],
      ["The whole curve shifts upwards", "Lower transport costs reduce average cost."],
      ["The firm moves up along its existing curve", "This would describe internal diseconomies of scale."],
    ],
    answer: "A",
    hints: ["Is this saving caused by the firm's own growth?"],
    explanation: "Internal economies are movements along the LRAC curve; external economies shift the whole curve down.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why might a small firm be unable to gain the technical economies enjoyed by a large firm?",
    options: [
      ["Its output is too small to make full use of large, efficient machines", "Correct: indivisible equipment needs a large output."],
      ["It is not allowed to buy machinery from suppliers", "There is no such rule."],
      ["Its workers are always less skilled than those in large firms", "Not necessarily true."],
      ["Technical economies apply only to firms owned by the state", "Ownership is irrelevant."],
    ],
    answer: "A",
    hints: ["Think about a machine that can produce 10,000 units a day."],
    explanation: "Large machines are efficient only at high output; a small firm would leave them idle, so its cost per unit would be high.",
  });

  // LRAC table (different figures from the lesson).
  const sizes = ["Size A", "Size B", "Size C", "Size D", "Size E"];
  const out = [500, 2000, 4000, 8000, 9000], tc = [9000, 24000, 38000, 60000, 76500];
  const ac = out.map((q, i) => tc[i] / q);
  check("acC", ac[2], 9.5); check("acD", ac[3], 7.5); check("acE", ac[4], 8.5);
  const tL = table(["Scale of plant", "Output (units per month)", "Total cost (US\\$)"], sizes.map((s, i) => [s, out[i], tc[i]]));
  {
    const o = 4500, c = 40500, a = c / o;
    check("a", a, 9);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: a, daily: true,
      stem: `After moving to a larger plant, a fictional firm produces ${fmt(o)} units a month at a total cost of US\\$${fmt(c)}. Calculate its average cost per unit.`,
      wrong: [o / c, c - o],
      explanation: `Average cost = total cost ÷ output = ${fmt(c)} ÷ ${fmt(o)} = **US\\$${fmt(a)}** per unit.`,
    });
  }
  const best = ac.indexOf(Math.min(...ac));
  check("best", best, 3);
  b.short({
    d: 4, skill: "ANALYSIS",
    stem: `Use the table.\n\n${tL}\n\nAt which scale of plant do diseconomies of scale first appear? Give the scale (for example "Size B").`,
    accepted: ["Size E", "E"],
    rejected: ["Size D", "D"],
    wrong: ["Size D"],
    hints: ["Work out average cost at every size.", "Diseconomies appear when average cost starts to rise."],
    explanation: `Average costs: ${ac.map((x, i) => `${sizes[i]} US\\$${fmt(x, 2)}`).join(", ")}. Average cost falls up to Size D (the most efficient scale) and rises at **Size E**, so diseconomies of scale appear at Size E. Size D has the lowest average cost; it is where economies of scale end.`,
  });
  {
    const a0 = 14.4, a1 = 10.8, ch = pctChange(a0, a1);
    check("ch", ch, -25);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch,
      stem: `When a fictional shoe maker moves from a small workshop to a large factory, its average cost per pair falls from US\\$${a0.toFixed(2)} to US\\$${a1.toFixed(2)}. Calculate the percentage change in average cost, to one decimal place. Give a fall as a negative number.`,
      wrong: [pctChange(a1, a0), -ch],
      hints: ["Change ÷ original × 100."],
      explanation: `1. Change = ${a1.toFixed(2)} − ${a0.toFixed(2)} = −${(a0 - a1).toFixed(2)}.\n2. % change = −${(a0 - a1).toFixed(2)} ÷ ${a0.toFixed(2)} × 100 = **${fmt(ch, 1)}%**.\n3. This fall in average cost from a larger scale is an economy of scale. Using the new figure as the base gives +${fmt(pctChange(a1, a0), 1)}%, the wrong base and the wrong sign.`,
    });
  }
  {
    const n1 = 500, p1 = 6, n2 = 3000, p2 = 4.8, save = (p1 - p2) * n2;
    check("save", save, 3600);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: save,
      stem: `A fictional poultry farm pays US\\$${p1} a bag for feed when it buys ${n1} bags, but US\\$${p2.toFixed(2)} a bag when it buys ${fmt(n2)} bags. How much does it save on an order of ${fmt(n2)} bags compared with paying the higher price?`,
      wrong: [p1 - p2, (p1 - p2) * n1],
      explanation: `Saving = (${p1} − ${p2.toFixed(2)}) × ${fmt(n2)} = ${(p1 - p2).toFixed(2)} × ${fmt(n2)} = **US\\$${fmt(save)}**. This is a purchasing economy of scale.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Diseconomies of scale cause long-run average cost to rise.",
    answer: true,
    explanation: "True. Diseconomies of scale are increases in long-run average cost when a firm grows too large.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Economies of scale mean that a larger firm has a lower total cost than a smaller firm.",
    answer: false,
    explanation: "False. A larger firm usually has a higher total cost; economies of scale lower its average cost per unit.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of economy of scale.",
    pairs: [
      ["A firm uses one large lorry instead of two small ones", "Technical"],
      ["A firm sells many products in several countries", "Risk-bearing"],
      ["A firm spreads the cost of a television advert over high sales", "Marketing"],
      ["A firm employs a specialist engineer and a specialist accountant", "Managerial"],
      ["A firm raises capital by selling shares to the public", "Financial"],
    ],
    explanation: "Each internal economy lowers average cost in a different way.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the long-run average cost (LRAC) curve.",
    template: "While a firm gains economies of scale, its LRAC curve slopes {{blank:a}}. When diseconomies of scale set in, the curve slopes {{blank:b}}. An external diseconomy, such as congestion, shifts the whole curve {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["downwards"], choices: ["downwards", "upwards"] },
      { id: "b", accepted: ["upwards"], choices: ["downwards", "upwards"] },
      { id: "c", accepted: ["upwards"], choices: ["downwards", "upwards"] },
    ],
    explanation: "Falling LRAC = economies; rising LRAC = diseconomies; external diseconomies shift the curve up.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of internal diseconomies of scale.",
    points: [
      "Communication problems: many layers of management.",
      "So messages are slow / distorted and mistakes raise costs.",
      "Poor motivation / co-ordination: workers feel unimportant or departments do not work together.",
      "So productivity falls / absenteeism rises, raising average cost.",
    ],
    modelAnswer: "First, communication becomes difficult: messages pass through many layers of management, so they are slow or distorted and costly mistakes are made. Second, workers in a very large firm may feel unimportant and poorly motivated, and departments may not co-ordinate, so productivity falls and absenteeism rises, raising average cost.",
    hints: ["What goes wrong inside a very large organisation?"],
    explanation: "Two causes, each explained with its effect on average cost.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `A fictional dairy company in Marondera is planning to expand. Its estimates of monthly costs at different scales are shown below.\n\n${table(["Scale", "Output (thousand litres per month)", "Total cost (US\\$ thousand)"], [["Present plant", 150, 120], ["Expanded plant", 400, 260], ["Very large plant", 700, 497]])}`,
    parts: (() => {
      const o = [150, 400, 700], c = [120, 260, 497];
      const a = o.map((x, i) => c[i] / x);
      check("a0", a[0], 0.8); check("a1", a[1], 0.65); check("a2", a[2], 0.71);
      return [
        P.num({ label: "(a)", marks: 2, kind: "money", value: a[1], dp: 2, stem: "Calculate the average cost per litre at the expanded plant, in US\\$ to two decimal places.", wrong: [o[1] / c[1]], explanation: `260 ÷ 400 = US\\$${fmt(a[1], 2)} per litre (both figures are in thousands).` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: a[2], dp: 2, stem: "Calculate the average cost per litre at the very large plant, in US\\$ to two decimal places.", wrong: [a[1]], explanation: `497 ÷ 700 = US\\$${fmt(a[2], 2)} per litre.` }),
        P.manual({ label: "(c)", marks: 4, stem: "Using your answers, describe the long-run average cost curve these figures would give and identify where economies and diseconomies of scale occur.", points: ["Axes: average cost on the vertical axis, output on the horizontal axis.", "AC falls from US\\$0.80 to US\\$0.65 per litre: economies of scale up to the expanded plant.", "AC rises to US\\$0.71 at the very large plant: diseconomies of scale.", "So the curve is U-shaped, with its lowest point (most efficient scale) at about 400 thousand litres."], modelAnswer: "With average cost on the vertical axis and output on the horizontal axis, the curve falls from US\\$0.80 a litre at 150 thousand litres to US\\$0.65 at 400 thousand: economies of scale. It then rises to US\\$0.71 at 700 thousand litres: diseconomies of scale. It is U-shaped, with the most efficient scale around 400 thousand litres." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain **two** internal economies of scale the dairy might gain by moving to the expanded plant.", points: ["Technical: larger, more efficient processing and packaging machines / bigger tankers.", "Lower cost per litre because the equipment is used at high output.", "Purchasing / marketing / financial economy identified (e.g. bulk buying of packaging, cheaper loans).", "Explained: discount or lower interest lowers cost per litre."], modelAnswer: "First, technical economies: a larger plant can use bigger, faster pasteurising and packaging machines and larger tankers, which cost less per litre when used at high output. Second, purchasing economies: buying cartons and other packaging in bulk earns discounts, so the packaging cost per litre falls." }),
      ];
    })(),
    explanation: "(a) US\\$0.65. (b) US\\$0.71. (c) Falling then rising AC: economies then diseconomies. (d) Technical and purchasing economies.",
    hints: ["Average cost = total cost ÷ output (both in thousands)."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional furniture firm in Bulawayo employs 40 workers. Its owner wants to grow to 400 workers within five years by opening new factories in three other cities.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between internal and external economies of scale.", points: ["Internal: cost savings from the growth of the firm itself.", "External: cost savings from the growth of the industry / area, benefiting all firms there."], modelAnswer: "Internal economies come from the growth of the firm itself, such as bulk buying; external economies come from the growth of the industry or area, such as a pool of skilled workers, and benefit every firm there." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the firm's average costs are likely to fall if it grows to 400 workers.",
        points: [
          "Fall: bulk buying of timber and fittings; better machinery (technical).",
          "Fall: specialist managers; cheaper finance; marketing spread over more sales.",
          "Rise: communication and co-ordination across four cities; slower decisions.",
          "Rise: motivation problems; transport between sites; loss of local external economies in new cities.",
          "Depends on demand (can it sell the output?) and on management quality.",
          "Justified conclusion.",
        ],
        modelAnswer: "Growing tenfold should bring internal economies: the firm can buy timber and fittings in bulk at a discount, use larger, more efficient machines, employ specialist managers and borrow more cheaply, so average cost should fall. However, running factories in four cities brings communication and co-ordination problems, slower decisions and possibly poorer motivation, and costs of moving materials between sites; these diseconomies may raise average cost. The new factories may also lack the skilled workers and suppliers found in Bulawayo. Costs are likely to fall at first, provided the firm can sell the extra output and introduces good management systems; growing very fast across several cities increases the risk that diseconomies outweigh the gains.",
      }),
    ],
    explanation: "(a) Firm's own growth versus industry growth. (b) Internal economies against diseconomies from size and distance.",
    hints: ["Weigh economies against diseconomies."],
  });

  b.card("DEFINITION", "Economies of scale", "Falls in long-run average cost as a firm increases its scale of production.");
  b.card("DEFINITION", "Diseconomies of scale", "Rises in long-run average cost when a firm grows beyond its most efficient size.");
  b.card("CONCEPT", "Internal economies of scale", "Technical, purchasing (bulk-buying), marketing, financial, risk-bearing and managerial.");
  b.card("DEFINITION", "External economies of scale", "Cost savings from the growth of the industry or area, e.g. skilled labour pool, specialist suppliers, infrastructure, training.");
  b.card("CONCEPT", "Internal diseconomies of scale", "Poor communication, co-ordination and control problems, low motivation in very large firms.");
  b.card("CONCEPT", "External diseconomies of scale", "Congestion, higher land prices and rents, competition for scarce skilled workers in a crowded area.");
  b.card("CONCEPT", "Shape of the LRAC curve", "Falls (economies of scale), reaches the most efficient scale, then rises (diseconomies of scale).");
  b.card("FACT", "How do external economies affect the average cost curve?", "They shift the whole curve downwards; external diseconomies shift it upwards.");
  b.card("FACT", "What falls with economies of scale: total cost or average cost?", "Average cost. Total cost still rises as output rises.");
});
