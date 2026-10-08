// W1b: econ.supply.shifts — conditions of supply; movements along versus shifts of the supply curve.
import { concept, P, schedule, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const DIR = ["shifts to the right", "shifts to the left", "moves up along the curve", "moves down along the curve"];

concept("econ.supply.shifts", { file: "supply/shifts", keyPrefix: "supply.shifts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which change causes a **movement along** the supply curve for tobacco?",
    options: [
      ["A change in the price of tobacco", "Correct: only the good's own price moves the point along its supply curve."],
      ["A change in the cost of fertiliser", "Costs are a condition of supply; a change shifts the curve."],
      ["A change in the weather during the growing season", "Weather shifts the supply curve."],
      ["A change in the number of tobacco farmers", "The number of producers shifts the market supply curve."],
    ],
    answer: "A",
    explanation: "Own price → extension or contraction along the curve. Costs, weather and the number of firms shift the curve.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Wages paid to workers in a clothing factory rise. What happens to the supply of shirts?",
    options: [
      ["It decreases: the curve shifts to the left", "Correct: higher costs mean fewer shirts are supplied at every price."],
      ["It increases: the curve shifts to the right", "A rightward shift needs lower costs or better technology."],
      ["Quantity supplied contracts along the curve", "The price of shirts has not changed, so there is no movement along the curve."],
      ["It does not change because wages are paid anyway", "Higher wages raise the cost of every shirt, reducing profitability at each price."],
    ],
    answer: "A",
    explanation: "Wages are a cost of production. Higher costs reduce profit at every price, so **supply decreases** (shift to the left).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The government gives a subsidy of US\\$5 per tonne to producers of maize. What is the effect on the supply of maize?",
    options: [
      ["Supply increases: the curve shifts to the right", "Correct: the subsidy lowers producers' costs, so they supply more at every price."],
      ["Supply decreases: the curve shifts to the left", "That is the effect of an indirect tax, not a subsidy."],
      ["Quantity supplied extends along the curve", "A subsidy is not a change in the market price; it shifts the curve."],
      ["Demand for maize increases", "A subsidy to producers affects supply, not consumers' demand."],
    ],
    answer: "A",
    explanation: "A subsidy is a payment to producers that lowers their costs: **supply increases**, the curve shifts right.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The world price of tobacco rises. Farmers in a district can grow either tobacco or maize on their land. What is the most likely effect on the supply of **maize** from the district?",
    options: [
      ["It decreases, as land is switched to tobacco", "Correct: tobacco becomes more profitable, so farmers grow less maize at every maize price."],
      ["It increases, as farmers earn more income", "Higher tobacco income does not make maize more profitable to grow."],
      ["Quantity supplied of maize extends along its curve", "The price of maize has not changed."],
      ["It is unaffected because maize and tobacco are different goods", "They compete for the same land, so they are competitive in supply."],
    ],
    answer: "A",
    hints: ["Maize and tobacco compete for the same land.", "Which crop is now more profitable?"],
    explanation: "When the price of an alternative product rises, producers move resources towards it, so the supply of the original good **decreases** (shift left).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "More cattle are slaughtered in Zimbabwe because demand for beef rises. What is the likely effect on the supply of **hides** for leather?",
    options: [
      ["Supply of hides increases", "Correct: beef and hides are in joint supply, so more slaughtering produces more hides at every price."],
      ["Supply of hides decreases", "More slaughtering produces more hides, not fewer."],
      ["Demand for hides increases", "The change comes from the production side: more hides become available."],
      ["Quantity of hides supplied contracts", "A contraction needs a fall in the price of hides."],
    ],
    answer: "A",
    hints: ["Each animal slaughtered gives both beef and a hide."],
    explanation: "Goods in **joint supply** are produced together. More beef means more hides at every price: supply of hides increases (shift right).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the supply of bricks by firms in a fictional town in two years.\n\n| Price per 1,000 bricks (US\\$) | Year 1 (thousand bricks per month) | Year 2 (thousand bricks per month) |\n| --- | ---: | ---: |\n| 80 | 180 | 250 |\n| 100 | 240 | 310 |\n| 120 | 285 | 355 |\n\nWhich event could explain the change from Year 1 to Year 2?",
    options: [
      ["New firms opened brickworks in the town", "Correct: more producers means more supplied at every price, a shift to the right."],
      ["The price of firewood used in the kilns rose", "Higher costs would decrease supply (fewer bricks at every price)."],
      ["The price of bricks rose from US\\$80 to US\\$120", "A price change moves along one column; here the whole column has changed."],
      ["A new tax was placed on each brick sold", "An indirect tax raises costs and decreases supply."],
    ],
    answer: "A",
    hints: ["Compare the two columns at the same price.", "More at every price is an increase in supply."],
    explanation: "At every price 70 thousand more bricks are supplied in Year 2: an **increase in supply** (shift right). More firms entering causes this; higher costs or taxes would do the opposite.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of events would **both** shift the supply curve of bread to the left?",
    options: [
      ["A rise in the price of flour and a new tax on each loaf", "Correct: both raise the cost of supplying each loaf."],
      ["A rise in the price of flour and a new, faster oven", "A faster oven lowers costs and shifts supply to the right."],
      ["A subsidy to bakers and a new tax on each loaf", "A subsidy shifts supply to the right; the tax shifts it to the left."],
      ["A fall in the price of bread and a rise in wages", "A fall in the price of bread is a movement along the curve, not a shift."],
    ],
    answer: "A",
    hints: ["Which events raise the cost of each loaf?"],
    explanation: "Higher input prices and indirect taxes both raise costs, decreasing supply.",
  });

  // Numerical: size of a shift and percentage change.
  const p = [1, 2, 3, 4], s1 = [340, 460, 580, 680], s2 = [430, 550, 670, 770];
  schedule({ prices: p, qs: s1 }); schedule({ prices: p, qs: s2 });
  const t = schedule({ prices: p, qs: s1, priceHeader: "Price per kg (US\\$)", qsHeader: "S1: before irrigation (kg per week)", extra: [{ header: "S2: after irrigation (kg per week)", values: s2 }] }).md;
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: s2[1] - s1[1], daily: true,
    stem: `A co-operative of vegetable growers near Mutare installed an irrigation system. The table shows their weekly supply of tomatoes.\n\n${t}\n\nBy how many kilograms a week does supply increase at a price of US\\$2?`,
    wrong: [s2[1], s1[2] - s1[1]],
    explanation: `At US\\$2: ${s2[1]} − ${s1[1]} = **${s2[1] - s1[1]} kg** a week. Supply increases by the same amount at every price: the curve shifts right.`,
  });
  const h1 = 640, h2 = 784;
  const pc = pctChange(h1, h2);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: pc, calculator: true,
    stem: `After a fictional sugar-cane estate in the Lowveld introduced a new cane variety, the quantity of cane it supplies at a price of US\\$40 a tonne rose from ${h1} tonnes a week to ${h2} tonnes a week. Calculate the percentage increase in supply at this price. Give your answer to one decimal place.`,
    wrong: [-pctChange(h2, h1), h2 - h1],
    hints: ["Percentage change = change ÷ original value × 100.", "The original value is the supply before the new variety."],
    explanation: `1. Change = ${h2} − ${h1} = ${h2 - h1} tonnes.\n2. Percentage change = ${h2 - h1} ÷ ${h1} × 100 = **${pc.toFixed(1)}%**.\n3. Dividing by the new value (${h2}) gives ${(-pctChange(h2, h1)).toFixed(1)}%, which uses the wrong base.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An improvement in technology shifts the supply curve to the right.",
    answer: true,
    explanation: "True. Better technology lowers the cost of producing each unit, so more is supplied at every price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If producers expect the price of their product to rise next month, the current supply is likely to increase.",
    answer: false,
    explanation: "False. Producers who expect higher prices later tend to hold back stocks to sell later, so current supply **decreases** (shift left).",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each event to its effect on the supply of **cotton** from Zimbabwean farmers.",
    pairs: [
      ["Good rains in the growing season", "Supply curve shifts to the right"],
      ["A new tax on every bale sold", "Supply curve shifts to the left"],
      ["A rise in the price paid for cotton", "Movement up along the supply curve"],
      ["A fall in the price paid for cotton", "Movement down along the supply curve"],
    ],
    hints: ["Own price → movement; anything else → shift."],
    explanation: "Good weather increases supply (right); a tax decreases it (left); changes in the cotton price itself move along the curve (extension when it rises, contraction when it falls).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "An indirect tax on a product {{blank:a}} producers' costs, so the supply curve {{blank:b}}. A subsidy {{blank:c}} costs, so the supply curve {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["raises"], choices: ["raises", "lowers"] },
      { id: "b", accepted: ["shifts to the left"], choices: DIR },
      { id: "c", accepted: ["lowers"], choices: ["raises", "lowers"] },
      { id: "d", accepted: ["shifts to the right"], choices: DIR },
    ],
    wrong: [["lowers", "shifts to the right", "raises", "shifts to the left"]],
    explanation: "Taxes add to costs and decrease supply; subsidies reduce costs and increase supply.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a rise in the price of diesel affects the supply of kombi transport services.",
    points: [
      "Diesel is a major cost of running a kombi.",
      "A rise in its price raises the cost of each trip / reduces profit at every fare.",
      "Some operators run fewer trips or leave the market.",
      "So the supply curve of kombi services shifts to the left (decrease in supply).",
    ],
    modelAnswer: "Fuel is one of the main costs of running a kombi. When diesel becomes dearer, each trip costs more, so at any given fare operators earn less profit. Some reduce the number of trips and some may park their vehicles altogether. Fewer trips are supplied at every fare, so supply decreases: the supply curve shifts to the left.",
    hints: ["Start with costs, end with the direction of the shift."],
    explanation: "Costs ↑ → profit at each price ↓ → less supplied at every price → shift left.",
  });

  // Structured 1: schedules with a cost change.
  const pp = [3, 4, 5, 6], a1 = [400, 520, 600, 660], a2 = [280, 400, 480, 540];
  schedule({ prices: pp, qs: a1 }); schedule({ prices: pp, qs: a2 });
  const t2 = schedule({ prices: pp, qs: a1, priceHeader: "Price per 5-litre tin (US\\$)", qsHeader: "S1: before (tins per week)", extra: [{ header: "S2: after (tins per week)", values: a2 }] }).md;
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A fictional paint maker in Gweru imports some of its raw materials. In March the cost of these materials rose. The table shows the weekly supply of paint before and after the rise.\n\n${t2}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: a1[2] - a2[2], stem: "By how many tins a week did supply fall at US\\$5?", wrong: [a2[2]], explanation: `${a1[2]} − ${a2[2]} = ${a1[2] - a2[2]} tins.` }),
      P.fib({
        label: "(b)", marks: 2, stem: "Complete the sentence.",
        template: "The rise in costs caused a {{blank:a}} in supply: the supply curve {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["decrease"], choices: ["increase", "decrease", "contraction", "extension"] },
          { id: "b", accepted: ["shifts to the left"], choices: DIR },
        ],
        wrong: [["contraction", "moves down along the curve"]],
        explanation: "Less is supplied at every price: a decrease in supply, a shift to the left.",
      }),
      P.num({ label: "(c)", marks: 1, kind: "plain", value: 6, stem: "After the cost rise, what price per tin would the firm need to receive to supply 540 tins a week?", wrong: [5], explanation: "On S2, 540 tins are supplied at US\\$6. Before the cost rise, 540 tins would have needed a price between US\\$4 and US\\$5." }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Describe the diagram that shows the change, and explain why the curve moves in this direction.",
        points: [
          "Price on the vertical axis, quantity of tins per week on the horizontal axis.",
          "S1 and a new curve S2 to the left of S1.",
          `Shows at US\\$5 the quantity falls from ${a1[2]} to ${a2[2]}.`,
          "Explains: higher raw-material costs reduce profit at every price, so less is supplied at each price.",
        ],
        modelAnswer: `Price on the vertical axis, tins per week on the horizontal axis. Two upward-sloping supply curves: S2 lies to the left of S1. At US\\$5 the quantity supplied falls from ${a1[2]} on S1 to ${a2[2]} on S2. The curve shifts left because the dearer raw materials raise the cost of each tin, so at any price the firm earns less profit and offers fewer tins.`,
        explanation: "Axes, the leftward shift with figures, and the cost reasoning.",
      }),
    ],
    hints: ["Compare the columns at the same price.", "Did the price of paint cause the change?"],
    explanation: "Higher costs decrease supply: S shifts left; the firm needs a higher price to supply any given quantity.",
  });

  // Structured 2: subsidy discussion.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "The government of a fictional country in southern Africa is worried that too little wheat is grown. It is considering two policies: a subsidy paid to wheat farmers for every tonne they grow, or a programme to build irrigation dams in wheat-growing areas.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What effect would the subsidy have on the supply of wheat?",
        options: [
          ["Supply would increase: the curve shifts to the right", "Correct: the subsidy lowers farmers' costs per tonne."],
          ["Supply would decrease: the curve shifts to the left", "This is the effect of a tax."],
          ["Quantity supplied would extend along the curve", "The subsidy is not a change in the market price."],
          ["Demand for wheat would increase", "The subsidy is paid to producers, so it affects supply."],
        ],
        answer: "A",
        explanation: "Subsidies lower costs, so more is supplied at every price.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how irrigation dams could increase the supply of wheat.",
        points: [
          "Irrigation reduces dependence on rainfall / protects crops in a drought.",
          "Yields per hectare rise, lowering the cost per tonne.",
          "More land can be farmed in the dry season (winter wheat).",
          "So more wheat is supplied at every price: the supply curve shifts to the right.",
        ],
        modelAnswer: "Wheat is mostly a dry-season crop in this region, so it depends on water. Dams allow farmers to irrigate, so yields rise and are less affected by drought, and more land can be planted. Higher yields lower the cost of each tonne, so farmers supply more at every price and the supply curve shifts to the right.",
        explanation: "Water → yields and area planted → lower cost per tonne → shift right.",
      }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss which policy is likely to be more effective in increasing the supply of wheat.",
        points: [
          "Subsidy: acts quickly (next season) and directly lowers costs.",
          "Subsidy: costs the government money every year / may go to large farmers who would grow wheat anyway.",
          "Dams: tackle the main limit on output (water) and reduce the risk of drought, a lasting increase in supply.",
          "Dams: high cost up front and take years to build; need maintenance.",
          "Other conditions matter: inputs, power for pumps, farmers' skills.",
          "Justified conclusion (e.g. dams better in the long run, subsidy for a quick effect).",
        ],
        modelAnswer: "A subsidy lowers costs at once, so supply could rise at the next planting. But it costs the government money every year and may mostly reward farmers who would have grown wheat anyway; when it ends, supply falls back. Dams remove the main constraint, a lack of water, so they raise yields and protect output in a drought, giving a lasting rightward shift in supply. However, they are expensive and take years to build, and farmers still need power for pumps and inputs. In the long run dams are likely to be more effective because they lower costs permanently; a temporary subsidy could bridge the gap while they are built.",
        explanation: "Compare speed, cost and how lasting each effect is, then conclude.",
      }),
    ],
    hints: ["Both policies lower the cost of growing wheat.", "Think about time: which works quickly, which lasts?"],
    explanation: "Both policies increase supply by lowering costs; they differ in speed, cost and permanence.",
  });

  b.card("DEFINITION", "What is a **change in supply**?", "A shift of the whole supply curve caused by a factor other than the good's own price.");
  b.card("DEFINITION", "What is a **change in quantity supplied**?", "A movement along the supply curve caused by a change in the good's own price (extension or contraction).");
  b.card("CONCEPT", "Which way does the supply curve shift for a **decrease** in supply?", "To the left: less is supplied at every price.");
  b.card("CONCEPT", "List five conditions of supply.", "Costs of production; technology; weather; number of firms; taxes and subsidies; prices of other goods; expectations.");
  b.card("FACT", "What is the effect of an indirect tax on supply?", "It raises costs, so supply decreases (the curve shifts left).");
  b.card("FACT", "What is the effect of a subsidy on supply?", "It lowers costs, so supply increases (the curve shifts right).");
  b.card("CONCEPT", "What is **joint supply**?", "When producing one good also produces another, e.g. beef and hides; more of one means more of the other.");
  b.card("FACT", "How does a drought affect the supply of maize?", "It decreases supply: less is harvested at every price (shift left).");
  b.card("CONCEPT", "Why does better technology increase supply?", "It lowers the cost of producing each unit, so firms can profitably supply more at every price.");
});
