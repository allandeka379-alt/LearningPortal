// W3a: econ.costs.costs-of-production — fixed, variable, semi-variable (ZIM), total and average costs; short and long run.
import { concept, P, table, costTable, check, fmt, money, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.costs.costs-of-production", { file: "costs/costs-of-production", keyPrefix: "costs.costs-of-production" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **fixed cost** for a small clothing factory?",
    options: [
      ["The monthly rent of the factory building", "Correct: rent is paid whatever the output."],
      ["The cloth used to make each shirt", "Cloth rises with the number of shirts made: a variable cost."],
      ["The thread and buttons for each shirt", "These are used per shirt: a variable cost."],
      ["Packaging bags for finished shirts", "One bag per shirt, so this varies with output."],
    ],
    answer: "A",
    explanation: "A fixed cost does not change with output in the short run. Rent is paid even if no shirts are made; materials and packaging are variable costs.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is **average total cost** calculated?",
    options: [
      ["Total cost divided by output", "Correct: ATC = TC ÷ output."],
      ["Total fixed cost divided by output", "That is average fixed cost."],
      ["Total variable cost divided by output", "That is average variable cost."],
      ["Total fixed cost plus total variable cost", "That is total cost, not an average."],
    ],
    answer: "A",
    explanation: "ATC = TC ÷ output. It also equals AFC + AVC.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm doubles its output in the short run. What happens to its **total fixed cost** and its **average fixed cost**?",
    options: [
      ["Total fixed cost is unchanged and average fixed cost halves", "Correct: the same total is spread over twice as many units."],
      ["Total fixed cost doubles and average fixed cost is unchanged", "Total fixed cost does not change with output."],
      ["Both total fixed cost and average fixed cost are unchanged", "The average falls when output rises."],
      ["Total fixed cost halves and average fixed cost doubles", "Both directions are reversed."],
    ],
    answer: "A",
    explanation: "TFC is constant in the short run, so AFC = TFC ÷ output halves when output doubles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Costs are on the vertical axis and output on the horizontal axis. Which describes the **total cost** curve in the short run?",
    options: [
      ["It starts at the level of fixed cost and rises as output rises", "Correct: TC = TFC + TVC, and TVC is zero at zero output."],
      ["It starts at the origin and rises as output rises", "That describes total variable cost."],
      ["It is a horizontal line at the level of fixed cost", "That describes total fixed cost."],
      ["It falls continuously as output rises, never touching the axis", "That describes average fixed cost."],
    ],
    answer: "A",
    explanation: "At zero output TC equals TFC, so the TC curve starts on the vertical axis at TFC and runs parallel above TVC.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by the **long run** in the theory of costs?",
    options: [
      ["A period in which all factors of production can be changed", "Correct: so all costs are variable."],
      ["A period in which at least one factor of production is fixed", "That is the short run."],
      ["Any period of more than one year in every industry", "The length differs between industries."],
      ["A period in which output cannot be changed at all", "Output can be changed in both runs."],
    ],
    answer: "A",
    explanation: "In the long run the firm can change all its inputs, including buildings and machinery, so there are no fixed costs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "At an output of 500 units a firm's average total cost is US\\$8 and its average variable cost is US\\$5. What is its total fixed cost?",
    options: [
      ["US\\$1,500", "Correct: AFC = 8 − 5 = US\\$3; TFC = 3 × 500."],
      ["US\\$4,000", "That is total cost (8 × 500)."],
      ["US\\$2,500", "That is total variable cost (5 × 500)."],
      ["US\\$3", "That is average fixed cost, not the total."],
    ],
    answer: "A",
    hints: ["AFC = ATC − AVC.", "Multiply the average by output to get the total."],
    explanation: "AFC = ATC − AVC = 8 − 5 = US\\$3 per unit; TFC = 3 × 500 = US\\$1,500.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does a firm's **average total cost** eventually rise as output increases in the short run?",
    options: [
      ["Fixed factors become crowded, so each extra unit adds more variable cost", "Correct: diminishing returns raise AVC, which outweighs falling AFC."],
      ["Average fixed cost starts to rise once output passes a certain level", "AFC falls at every output."],
      ["Total fixed cost rises each time the firm produces another unit", "TFC is constant in the short run."],
      ["The firm can change all its factors of production in the short run", "That describes the long run."],
    ],
    answer: "A",
    hints: ["ATC = AFC + AVC. Which of the two can rise?"],
    explanation: "AFC keeps falling, but with fixed capacity diminishing returns push AVC up; once the rise in AVC outweighs the fall in AFC, ATC rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A firm's electricity bill is a standing charge of US\\$40 a month plus US\\$0.20 for every unit of electricity used. What type of cost is this?",
    options: [
      ["A semi-variable cost", "Correct: it has a fixed part and a variable part."],
      ["A fixed cost", "Part of the bill rises with use."],
      ["A variable cost", "Part of the bill is paid even with no use."],
      ["An average cost", "An average is a cost per unit of output."],
    ],
    answer: "A",
    explanation: "A semi-variable cost has a fixed element (the standing charge) and an element that varies with use.",
  });

  // Figures differ from the lesson and from item to item.
  {
    const fcA = 520, vcA = 780, qA = 130, tcA = fcA + vcA;
    check("tcA", tcA, 1300);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: tcA, daily: true,
      stem: `A fictional brick-moulding firm in Masvingo has fixed costs of US\\$${fcA} a week. When it makes ${qA} pallets of bricks a week its variable costs are US\\$${vcA}. Calculate its total cost for the week.`,
      wrong: [vcA, vcA - fcA],
      explanation: `TC = TFC + TVC = ${fcA} + ${vcA} = **US\\$${fmt(tcA)}**. US\\$${vcA} is the variable cost only; subtracting the fixed cost is the wrong operation.`,
    });
  }
  {
    const fcB = 900, vcB = 1620, qB = 180, tcB = fcB + vcB, atcB = tcB / qB, avcB = vcB / qB;
    check("atcB", atcB, 14); check("avcB", avcB, 9);
    b.calc({
      d: 2, skill: "APPLICATION", kind: "money", value: atcB,
      stem: `A fictional soap maker in Kadoma has fixed costs of US\\$${fcB} and variable costs of US\\$${fmt(vcB)} when it produces ${qB} boxes a month. Calculate its average total cost per box.`,
      wrong: [avcB, fcB / qB],
      explanation: `1. TC = ${fcB} + ${fmt(vcB)} = US\\$${fmt(tcB)}.\n2. ATC = TC ÷ output = ${fmt(tcB)} ÷ ${qB} = **US\\$${fmt(atcB)}** per box.\n3. US\\$${fmt(avcB)} is AVC (${fmt(vcB)} ÷ ${qB}), which leaves out the fixed cost; US\\$${fcB / qB} is AFC.`,
    });
  }
  {
    const fcC = 1250, qC = 50, afcC = fcC / qC;
    check("afcC", afcC, 25);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: afcC, daily: true,
      stem: `A fictional guest house in Kariba has fixed costs of US\\$${fmt(fcC)} a month. In May it lets ${qC} room-nights. Calculate its average fixed cost per room-night.`,
      wrong: [fcC * qC, fcC],
      explanation: `AFC = TFC ÷ output = ${fmt(fcC)} ÷ ${qC} = **US\\$${afcC}** per room-night. Multiplying gives a meaningless figure.`,
    });
  }
  const out = [0, 40, 80, 120, 160], fc = 480, vc = [0, 360, 560, 840, 1360];
  const C = costTable({ output: out, fc, vc });
  const tGap = table(["Output (units)", "Total fixed cost (US\\$)", "Total variable cost (US\\$)"], out.map((q, i) => [q, fc, vc[i]]));
  const minRow = C.rows.slice(1).reduce((m, r) => (r.atc < m.atc ? r : m));
  check("min", minRow.q, 120);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: minRow.q,
    stem: `The table shows the weekly costs of a fictional welding workshop.\n\n${tGap}\n\nAt which output is average total cost lowest? Give the output in units.`,
    wrong: [160, 40],
    hints: ["Work out ATC = (TFC + TVC) ÷ output at each output."],
    explanation: `ATC at 40, 80, 120 and 160 units: ${C.rows.slice(1).map((r) => `US\\$${fmt(r.atc)}`).join(", ")}. The lowest is **${minRow.q} units** (US\\$${fmt(minRow.atc)}). The highest output (160) does not have the lowest average cost: ATC rises again once the workshop is crowded.`,
  });
  // Semi-variable (ZIM): fictional hair salon.
  const clients = 140, standing = 30, perClient = 0.25, rent = 220, prod = 2;
  const semi = standing + perClient * clients, tc = rent + semi + prod * clients;
  check("semi", semi, 65); check("tc", tc, 565);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: tc, applies: ZIM,
    stem: `Rudo runs a fictional hair salon in Chinhoyi. Each month she pays rent of US\\$${rent}, a water bill made up of a US\\$${standing} standing charge plus US\\$${perClient.toFixed(2)} per client, and US\\$${prod} of hair products per client. In July she serves ${clients} clients. Calculate her total cost for July.`,
    wrong: [rent + prod * clients, rent + standing + prod * clients],
    hints: ["Split the water bill into its fixed and variable parts."],
    explanation: `1. Fixed: rent US\\$${rent}.\n2. Semi-variable water bill: ${standing} + ${perClient.toFixed(2)} × ${clients} = US\\$${semi}.\n3. Variable products: ${prod} × ${clients} = US\\$${prod * clients}.\n4. Total cost = ${rent} + ${semi} + ${prod * clients} = **US\\$${tc}**.\n5. Leaving out the water bill gives US\\$${rent + prod * clients}; leaving out its variable part gives US\\$${rent + standing + prod * clients}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A firm has to pay its fixed costs even when its output is zero.",
    answer: true,
    explanation: "True. Fixed costs such as rent and insurance are paid whatever the output in the short run, so at zero output total cost equals fixed cost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "As output rises, the gap between average total cost and average variable cost gets wider.",
    answer: false,
    explanation: "False. The gap is average fixed cost, which falls as output rises, so the two curves get closer together.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "A fictional transport firm runs kombis between Harare and Chitungwiza. Match each cost with its type.",
    pairs: [
      ["Annual insurance on each kombi", "Fixed cost"],
      ["Diesel used on each trip", "Variable cost"],
      ["A phone contract with a monthly fee plus a charge per call", "Semi-variable cost"],
      ["Total cost divided by the number of trips", "Average total cost"],
    ],
    applies: ZIM,
    explanation: "Insurance does not change with the number of trips; diesel does; the phone contract has both parts; cost per trip is an average.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about costs as output rises in the short run.",
    template: "Average fixed cost {{blank:a}} as output rises. Total fixed cost {{blank:b}}. Average total cost usually {{blank:c}} at first and then rises.",
    blanks: [
      { id: "a", accepted: ["falls"], choices: ["falls", "rises", "stays the same"] },
      { id: "b", accepted: ["stays the same"], choices: ["falls", "rises", "stays the same"] },
      { id: "c", accepted: ["falls"], choices: ["falls", "rises", "stays the same"] },
    ],
    explanation: "TFC is constant, so AFC falls; ATC is U-shaped, falling and then rising.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between the short run and the long run for a maize-milling firm.",
    points: [
      "Short run: at least one factor of production is fixed.",
      "Example: the mill building / milling machines cannot be changed quickly; the firm can only add workers or maize.",
      "Long run: all factors of production can be changed.",
      "So all costs are variable in the long run (the firm can build a bigger mill or close).",
    ],
    modelAnswer: "In the short run at least one factor is fixed: the miller cannot quickly build a bigger mill or install new milling machines, so it can raise output only by hiring more workers and buying more maize, and it has fixed costs such as rent. In the long run every factor can be changed: the firm can build a larger mill, buy more machines or close down, so all its costs become variable.",
    hints: ["Which inputs can the miller change this month, and which take years?"],
    explanation: "One mark for each definition and one for applying each to the mill.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `Tatenda runs a fictional furniture workshop in Bulawayo. The table shows some of his monthly costs.\n\n${table(["Output (chairs)", "Total cost (US\\$)", "Average total cost (US\\$)"], [[0, 800, "–"], [20, 1200, "60"], [40, "?", "35"], [60, 2100, "?"]])}`,
    parts: (() => {
      const fcT = 800, tc40 = 35 * 40, atc60 = 2100 / 60, tvc20 = 1200 - 800;
      check("tc40", tc40, 1400); check("atc60", atc60, 35); check("afc40", fcT / 40, 20);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: fcT, stem: "State the workshop's total fixed cost.", wrong: [0], explanation: "At zero output total cost = fixed cost = US\\$800." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: tc40, stem: "Calculate the total cost of producing 40 chairs.", wrong: [35], explanation: `TC = ATC × output = 35 × 40 = US\\$${fmt(tc40)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: atc60, stem: "Calculate the average total cost of producing 60 chairs.", wrong: [(2100 - 800) / 60], explanation: `ATC = 2,100 ÷ 60 = US\\$${fmt(atc60)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: tvc20, stem: "Calculate the total variable cost of producing 20 chairs.", wrong: [1200], explanation: "TVC = TC − TFC = 1,200 − 800 = US\\$400." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain what happens to average fixed cost as output rises from 20 to 60 chairs.", points: ["AFC falls (from US\\$40 to about US\\$13.33).", "The same fixed cost of US\\$800 is spread over more chairs."], modelAnswer: "Average fixed cost falls, from 800 ÷ 20 = US\\$40 to 800 ÷ 60 = about US\\$13.33, because the same fixed cost of US\\$800 is shared among more chairs." }),
        P.manual({ label: "(f)", marks: 4, stem: "Describe the average total cost curve you would draw from these figures and explain its shape.", points: ["Axes: cost (US\\$) on the vertical axis, output (chairs) on the horizontal axis.", "ATC falls from US\\$60 (20 chairs) to US\\$35 (40 chairs) and stays at US\\$35 at 60 chairs: the falling part of a U shape.", "It falls because AFC falls as fixed costs are spread over more chairs.", "With more output the curve would eventually rise as the fixed workshop becomes crowded (diminishing returns raise AVC)."], modelAnswer: "With cost on the vertical axis and chairs on the horizontal axis, the ATC curve falls steeply from US\\$60 at 20 chairs to US\\$35 at 40 chairs and is flat between 40 and 60 chairs, so it is near the bottom of a U shape. It falls because the US\\$800 of fixed cost is spread over more chairs. If Tatenda kept raising output in the same workshop, the curve would eventually rise, because the crowded workshop and tools mean each extra chair needs more labour and materials." }),
      ];
    })(),
    explanation: "(a) US\\$800. (b) US\\$1,400. (c) US\\$35. (d) US\\$400. (e) AFC falls as fixed cost is spread. (f) Falling part of a U-shaped ATC curve.",
    hints: ["At zero output, all cost is fixed cost.", "TC = ATC × output."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "Nyasha owns a fictional printing shop in Harare. She is offered a large order that would double her monthly output using her existing two printers, by running them for longer each day.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **one** fixed cost and **one** variable cost of the printing shop.", points: ["A fixed cost, e.g. rent / insurance / loan interest / manager's salary.", "A variable cost, e.g. paper / ink / electricity used by the printers / hourly wages."], modelAnswer: "Fixed: the shop rent. Variable: paper and ink." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether doubling output with the same two printers will reduce Nyasha's average total cost.",
        points: [
          "Yes: fixed costs (rent, printers) are spread over twice the output, so AFC halves.",
          "Yes: bulk buying of paper and ink may lower variable cost per page.",
          "No: printers run longer, so more breakdowns and maintenance; overtime wages raise AVC.",
          "No: diminishing returns with fixed capital: crowded equipment, waiting time, mistakes.",
          "Depends on whether she is below or above the lowest point of ATC now.",
          "Justified conclusion.",
        ],
        hints: ["ATC = AFC + AVC. Which falls and which may rise?"],
        modelAnswer: "Doubling output spreads the fixed costs, such as rent and the cost of the printers, over twice as many pages, so average fixed cost halves; she might also buy paper and ink in bulk more cheaply. However, running two printers for longer means more breakdowns and maintenance, and staff may need overtime pay, so average variable cost may rise; with fixed equipment, diminishing returns set in. If the shop is now working well below capacity, the fall in AFC is likely to outweigh any rise in AVC and ATC will fall; if the printers are already busy, ATC may rise. Because she is running the machines for longer rather than adding more work at the same time, ATC will probably fall unless overtime pay is high.",
      }),
    ],
    explanation: "(a) Rent is fixed; paper and ink are variable. (b) Falling AFC against rising AVC from crowded fixed capital.",
    hints: ["Think about AFC and AVC separately."],
  });

  b.card("DEFINITION", "Fixed cost", "A cost that does not change with output in the short run and must be paid even at zero output (rent, insurance, loan interest).");
  b.card("DEFINITION", "Variable cost", "A cost that changes directly with output and is zero at zero output (raw materials, fuel, packaging, piece-rate wages).");
  b.card("DEFINITION", "Semi-variable cost", "A cost with a fixed part and a variable part, such as a phone bill with a monthly fee plus a charge per call.", null, { applies: ZIM });
  b.card("FORMULA", "Total cost", "TC = TFC + TVC.");
  b.card("FORMULA", "Average costs", "ATC = TC ÷ output; AFC = TFC ÷ output; AVC = TVC ÷ output; ATC = AFC + AVC.");
  b.card("FACT", "What happens to average fixed cost as output rises?", "It falls continuously, because the same fixed cost is spread over more units.");
  b.card("CONCEPT", "Shape of the ATC curve", "U-shaped: falls as fixed costs are spread and resources are used better, then rises as fixed factors become crowded (diminishing returns).");
  b.card("DEFINITION", "Short run", "The period in which at least one factor of production is fixed, so the firm has fixed and variable costs.");
  b.card("DEFINITION", "Long run", "The period in which all factors of production can be changed, so all costs are variable.");
});
