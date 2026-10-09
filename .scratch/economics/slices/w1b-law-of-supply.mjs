// W1b: econ.supply.law-of-supply — supply, the law of supply, schedules and curves, market supply.
import { concept, P, schedule, marketSum, money } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.supply.law-of-supply", { file: "supply/law-of-supply", keyPrefix: "supply.law-of-supply" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **supply**?",
    options: [
      ["The quantity producers are willing and able to sell at each price over a period", "Correct: supply needs willingness and ability, a price and a time period."],
      ["The total quantity of a good that producers have in their warehouses", "Stocks held are not the same as the quantity offered for sale at each price."],
      ["The quantity consumers are willing and able to buy at each price over a period of time", "That is the definition of demand."],
      ["The quantity of a good actually sold in a market in one year", "Quantity sold depends on demand as well; supply is what is offered at each price."],
    ],
    answer: "A",
    explanation: "Supply is the quantity of a good or service that producers are **willing and able to offer for sale** at each possible price over a given period of time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a diagram with price on the vertical axis, how does a normal supply curve slope?",
    options: [
      ["Upwards from left to right", "Correct: a higher price goes with a larger quantity supplied."],
      ["Downwards from left to right", "A downward slope is the normal demand curve."],
      ["It is a horizontal straight line", "A horizontal line is a special case (perfectly elastic supply), not the normal curve."],
      ["It is a vertical straight line", "A vertical line is a special case (perfectly inelastic supply), not the normal curve."],
    ],
    answer: "A",
    explanation: "Price and quantity supplied are directly related, so the supply curve slopes upwards from left to right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the quantity supplied of a good normally rise when its price rises?",
    options: [
      ["Producing and selling more becomes more profitable", "Correct: each unit earns more revenue, so firms want to sell more."],
      ["Consumers want to buy more at the higher price", "The law of demand says consumers buy less at a higher price."],
      ["The cost of producing each unit falls", "Costs are held constant; a change in costs would shift the curve."],
      ["The government requires firms to produce more", "Supply describes producers' own choices in a market."],
    ],
    answer: "A",
    explanation: "A higher price raises the revenue from each unit, so extra output becomes profitable; it also covers the higher cost of extra units and attracts new producers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The price of cotton lint rises and, other things being equal, farmers offer more cotton for sale. On a supply diagram this is",
    options: [
      ["an extension of supply, a movement up along the curve.", "Correct: a change in own price causes a movement along the supply curve."],
      ["an increase in supply, a shift of the curve to the right.", "A shift needs a change in a non-price factor such as costs or technology."],
      ["a contraction of supply, a movement down along the curve.", "A contraction follows a fall in price."],
      ["a decrease in supply, a shift of the curve to the left.", "A leftward shift follows, for example, higher costs or bad weather."],
    ],
    answer: "A",
    explanation: "A rise in the good's own price leads to a larger quantity supplied: an **extension**, a movement up along the same supply curve.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which reason explains why **new firms** may start supplying a good when its price rises?",
    options: [
      ["The higher price now covers their costs, so they can make a profit", "Correct: firms that could not cover costs at the lower price now can."],
      ["The higher price reduces their costs of production", "The price received does not change a firm's costs."],
      ["Consumers prefer to buy from new firms when prices rise", "Consumers' preferences are about demand, not the decision to supply."],
      ["The government gives subsidies to new firms whenever prices rise", "Subsidies are a separate policy and would shift supply."],
    ],
    answer: "A",
    explanation: "Some producers have higher costs; they enter only when the price is high enough to cover them. So market supply rises with price partly because new producers join.",
  });

  const p = [5, 6, 7, 8];
  const T = [10, 14, 17, 19], R = [0, 4, 8, 11], F = [6, 8, 9, 10];
  const M = marketSum([T, R, F]);
  for (const q of [T, R, F, M]) schedule({ prices: p, qs: q });
  const tb = schedule({ prices: p, qs: T, priceHeader: "Price per chicken (US\\$)", qsHeader: "Tatenda", extra: [{ header: "Rudo", values: R }, { header: "Farai", values: F }] }).md;
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `The table shows how many chickens three fictional poultry farmers offer for sale each week. They are the only suppliers in the market.\n\n${tb}\n\nWhat is the market quantity supplied at US\\$7?`,
    options: [
      [`${M[2]} chickens`, `Correct: ${T[2]} + ${R[2]} + ${F[2]} = ${M[2]}.`],
      [`${M[1]} chickens`, `${M[1]} is the market supply at US\\$6.`],
      [`${M[3]} chickens`, `${M[3]} is the market supply at US\\$8.`],
      [`${T[2]} chickens`, "This is Tatenda's supply only; market supply adds all three farmers."],
    ],
    answer: "A",
    hints: ["Add the quantities of all producers at the same price."],
    explanation: `Market supply at US\\$7 = ${T[2]} + ${R[2]} + ${F[2]} = **${M[2]} chickens** a week.`,
  });
  const g1 = [30, 0, 12], g2 = [42, 15, 18];
  const G1 = g1.reduce((s, x) => s + x, 0), G2 = g2.reduce((s, x) => s + x, 0);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: G2 - G1,
    stem: `Three fictional dairy-goat farmers are the only suppliers of goats' milk in a town. At US\\$1.00 a litre they offer ${g1.join(", ")} litres a day; at US\\$1.50 a litre they offer ${g2.join(", ")} litres a day. By how many litres a day does **market** supply extend when the price rises from US\\$1.00 to US\\$1.50?`,
    wrong: [G2, g2[0] - g1[0]],
    hints: ["Find the market quantity at each price, then subtract."],
    explanation: `Market supply at US\\$1.00 = ${g1.join(" + ")} = ${G1}; at US\\$1.50 = ${g2.join(" + ")} = ${G2}. Extension = ${G2} − ${G1} = **${G2 - G1} litres** a day. The second farmer enters the market only at the higher price.`,
  });
  const n = 45, q1 = 120, q2 = 150;
  const sp = [44, 54, 64, 74], X = [11, 13, 16, 18], Y = [0, 0, 6, 10], Z = [7, 9, 12, 13];
  const SM = marketSum([X, Y, Z]);
  for (const q of [X, Y, Z, SM]) schedule({ prices: sp, qs: q });
  const ts = schedule({ prices: sp, qs: X, priceHeader: "Price per cubic metre (US\\$)", qsHeader: "Mill X", extra: [{ header: "Mill Y", values: Y }, { header: "Mill Z", values: Z }] }).md;
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `The table shows how many cubic metres of timber three fictional sawmills offer for sale each week.\n\n${ts}\n\nWhich conclusion is supported by the data?`,
    options: [
      ["Mill Y's costs are probably higher than the other mills' costs", `Correct: it supplies nothing until the price reaches US$${sp[2]}, so lower prices do not cover its costs.`],
      ["Mill Z's supply responds most to a rise in price", `Mill Z adds ${Z[3] - Z[0]} cubic metres from US$${sp[0]} to US$${sp[3]}, but Mill Y adds ${Y[3] - Y[0]}.`],
      [`Market supply falls as the price rises from US$${sp[0]} to US$${sp[3]}`, `Market supply rises from ${SM[0]} to ${SM[3]}; the law of supply holds.`],
      ["Mill X will supply 20 cubic metres at US$85", `The table stops at US$${sp[3]}; we cannot be sure what Mill X would supply at US$85.`],
    ].map(([a, r]) => [a.replace(/US\$/g, "US\\$"), r.replace(/US\$/g, "US\\$")]),
    answer: "A",
    hints: ["Look at who supplies nothing at the lower prices.", "Why would a producer offer nothing at a low price?"],
    explanation: `A producer supplies only when the price covers its costs. Mill Y supplies nothing at US\\$${sp[0]} or US\\$${sp[1]} but 6 cubic metres at US\\$${sp[2]}, so its costs are probably higher: the higher price brings a **new producer** into the market.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: n * q2, daily: true,
    stem: `A fictional district has ${n} identical carpentry workshops. Each offers ${q1} school desks a month at US\\$30 a desk and ${q2} desks a month at US\\$36. What is the market quantity supplied at US\\$36?`,
    wrong: [n * q1, q2],
    explanation: `Market supply = number of workshops × quantity each supplies = ${n} × ${q2} = **${n * q2} desks** a month.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "According to the law of supply, other things being equal, a fall in price leads to a fall in the quantity supplied.",
    answer: true,
    explanation: "True. Price and quantity supplied move in the same direction; a fall in price causes a contraction of supply.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A farmer who would like to sell 200 bags of maize but harvested only 120 bags supplies 200 bags at today's price.",
    answer: false,
    explanation: "False. Supply counts what producers are willing **and able** to offer. The farmer can offer at most 120 bags.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Supply", "Quantity producers are willing and able to offer for sale at each price"],
      ["Extension of supply", "A rise in quantity supplied caused by a rise in the good's own price"],
      ["Contraction of supply", "A fall in quantity supplied caused by a fall in the good's own price"],
      ["Market supply", "The sum of all producers' quantities at each price"],
    ],
    explanation: "Extensions and contractions are movements along the supply curve caused by own-price changes; market supply adds individual supplies.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "The relationship between price and quantity supplied is {{blank:a}}. On a supply diagram, price is on the {{blank:b}} axis and the curve slopes {{blank:c}} from left to right.",
    blanks: [
      { id: "a", accepted: ["direct"], choices: ["direct", "inverse"] },
      { id: "b", accepted: ["vertical"], choices: ["vertical", "horizontal"] },
      { id: "c", accepted: ["upwards"], choices: ["upwards", "downwards"] },
    ],
    wrong: [["inverse", "horizontal", "downwards"]],
    explanation: "Higher price, more supplied: a **direct** (positive) relationship, so the curve slopes **upwards**; price is always on the **vertical** axis.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a supply curve slopes upwards from left to right.",
    points: [
      "Identifies the profit motive: a higher price raises revenue per unit.",
      "Develops: so it becomes more profitable to produce more, and firms increase the quantity supplied.",
      "Identifies a second reason: new firms enter / extra units cost more to produce.",
      "Develops: a higher price covers the higher costs of extra output or of less efficient producers, so they supply more.",
    ],
    modelAnswer: "First, a higher price means each unit earns more revenue, so producing more becomes more profitable and existing producers expand output. Second, extra output usually costs more per unit (overtime, poorer land), and some producers have high costs; a higher price covers these costs, so existing firms produce more and new firms enter the market.",
    hints: ["Think about profit and about costs."],
    explanation: "Each reason: identify (1) and explain how it raises quantity supplied (1).",
  });

  // Structured 1: market supply from identical firms; describe the diagram.
  const pr = [2, 3, 4, 5], one = [40, 55, 65, 70], nf = 30;
  const mk = one.map((x) => x * nf);
  schedule({ prices: pr, qs: one });
  const s1 = schedule({ prices: pr, qs: one, priceHeader: "Price per dozen eggs (US\\$)", qsHeader: "Dozens per week (one farm)" });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `There are ${nf} small egg farms near Bulawayo, all with the same supply. The table shows the supply of one farm.\n\n${s1.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: mk[1], stem: "Calculate the market quantity supplied at US\\$3 per dozen.", wrong: [one[1]], explanation: `${nf} × ${one[1]} = ${mk[1]} dozen a week.` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: mk[3] - mk[1], stem: "By how many dozen a week does market supply extend when the price rises from US\\$3 to US\\$5?", wrong: [one[3] - one[1]], explanation: `${nf} × ${one[3]} = ${mk[3]}; ${mk[3]} − ${mk[1]} = ${mk[3] - mk[1]} dozen.` }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Describe the market supply diagram you would draw, showing the change in (b).",
        points: [
          "Price on the vertical axis, quantity supplied (dozens per week) on the horizontal axis.",
          "Supply curve S sloping upwards from left to right.",
          `Movement up along S from (US\\$3, ${mk[1]}) to (US\\$5, ${mk[3]}), with no shift.`,
        ],
        modelAnswer: `Price on the vertical axis, dozens of eggs per week on the horizontal axis. An upward-sloping curve S. The price rise is shown as a movement up along S from ${mk[1]} dozen at US\\$3 to ${mk[3]} dozen at US\\$5.`,
        explanation: "Axes, slope and the movement along the curve.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "The extra supply for each US\\$1 rise in price gets smaller. Suggest a reason for this.",
        points: [
          "Identifies a limit on capacity (number of hens, space, feed).",
          "Explains that extra output becomes more costly to produce as the farms approach their limit.",
          "Links this to each price rise bringing a smaller extension of supply (curve becomes steeper).",
        ],
        modelAnswer: "The farms are close to full capacity: they can keep only so many hens in their sheds. Each extra dozen eggs costs more to produce (more feed per egg, overtime), so a higher price brings a smaller and smaller increase in quantity supplied, and the supply curve becomes steeper.",
        explanation: "Rising extra costs near capacity make supply less responsive at higher outputs.",
      }),
    ],
    hints: ["Market supply = number of farms × supply of one farm.", "Look at how much quantity rises for each US$1 step."].map((s) => s.replace("US$", "US\\$")),
    explanation: "Identical producers: multiply. The schedule shows the law of supply, with smaller extensions at higher prices.",
  });

  // Structured 2: a discussion.
  const pa = [20, 25, 30], qa = [300, 420, 500];
  schedule({ prices: pa, qs: qa });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: `A fictional company buys sunflower seed from small-scale farmers in a district. Farmers there grow sunflowers or maize on the same land. The company estimates how many tonnes farmers would offer at different prices per tonne next season.\n\n${schedule({ prices: pa.map((x) => x * 10), qs: qa, priceHeader: "Price per tonne (US\\$)", qsHeader: "Tonnes offered next season" }).md}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What does the schedule show?",
        options: [
          ["An upward-sloping supply curve", "Correct: quantity offered rises with price."],
          ["A downward-sloping demand curve", "The quantities are offered by sellers, not demanded by buyers."],
          ["A shift of the supply curve to the right", "One schedule shows one curve; a shift needs two schedules."],
          ["A perfectly inelastic supply curve", "Quantity changes with price, so supply is not perfectly inelastic."],
        ],
        answer: "A",
        explanation: "A schedule of quantities offered by sellers at each price is a supply schedule; rising quantities mean an upward slope.",
      }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: qa[2] - qa[0], stem: "By how many tonnes does the quantity offered rise if the company raises its price from US\\$200 to US\\$300 a tonne?", wrong: [qa[2]], explanation: `${qa[2]} − ${qa[0]} = ${qa[2] - qa[0]} tonnes.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why farmers would offer more sunflower seed at a higher price.",
        points: [
          "A higher price raises the revenue / profit from each tonne of sunflowers.",
          "Farmers switch land and labour from maize to sunflowers (the alternative crop is now relatively less profitable).",
          "Farmers with higher costs (e.g. poorer land, further away) can now cover their costs and start supplying.",
          "So the quantity supplied extends along the supply curve.",
        ],
        modelAnswer: "At a higher price each tonne earns more, so sunflowers become more profitable than maize and farmers move some land and labour from maize to sunflowers. Farmers with poorer land or higher transport costs, who could not cover their costs at US$200, can now make a profit and start growing them. Quantity supplied therefore extends along the supply curve.".replace("US$", "US\\$"),
        explanation: "Profit per tonne, switching between crops and new suppliers.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether raising its price to US\\$300 a tonne is a good way for the company to get more sunflower seed.",
        points: [
          `For: quantity offered rises from ${qa[0]} to ${qa[2]} tonnes (data).`,
          "For: farmers can respond by switching land from maize, so the response is real.",
          `Against: the company's spending on seed rises from ${money(pa[0] * 10 * qa[0])} to ${money(pa[2] * 10 * qa[2])}, which may cut its profit.`,
          "Against: farmers can respond only next season, and bad weather could reduce the harvest whatever the price.",
          "Alternative: supply seed, fertiliser or advice to farmers to raise yields instead.",
          "Justified conclusion.",
        ],
        modelAnswer: `Raising the price would raise the quantity offered from ${qa[0]} to ${qa[2]} tonnes, because sunflowers would become more profitable than maize and more farmers would grow them. However, the company would pay ${money(pa[2] * 10 * qa[2])} instead of ${money(pa[0] * 10 * qa[0])}, so this only makes sense if it can sell the oil at a profit. Farmers can only respond at the next planting, and a drought could cut output anyway. Helping farmers with seed and fertiliser might raise yields at a lower cost. On balance a price rise is the quickest way to attract more supply, but the company should check that the higher cost is covered by its sales.`,
        explanation: "Weigh the larger quantity against the cost and the time lag, and conclude.",
      }),
    ],
    hints: ["Compare the quantities at the two prices.", "What else, apart from price, decides how much farmers harvest?"],
    explanation: "The schedule obeys the law of supply. A higher price attracts more supply, but it raises the buyer's costs and takes a season to work.",
  });

  b.card("DEFINITION", "Define **supply**.", "The quantity of a good or service that producers are willing and able to offer for sale at each price over a given period of time.");
  b.card("DEFINITION", "State the **law of supply**.", "Other things being equal, as price rises quantity supplied rises, and as price falls quantity supplied falls.");
  b.card("CONCEPT", "How does a normal supply curve slope?", "Upwards from left to right (a direct relationship between price and quantity supplied).");
  b.card("CONCEPT", "Give three reasons why supply rises with price.", "Higher profit per unit; a higher price covers the rising cost of extra output; new producers enter.");
  b.card("CONCEPT", "What is an **extension of supply**?", "A rise in quantity supplied caused by a rise in the good's own price: a movement up along the supply curve.");
  b.card("CONCEPT", "What is a **contraction of supply**?", "A fall in quantity supplied caused by a fall in the good's own price: a movement down along the supply curve.");
  b.card("CONCEPT", "How is market supply found?", "Add the quantities supplied by all producers at each price.");
  b.card("FACT", "Does a change in a good's own price shift its supply curve?", "No. It causes a movement along the curve; only non-price factors shift it.");
});
