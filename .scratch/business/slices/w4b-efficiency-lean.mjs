// W4b: productivity, efficiency and lean production (CAM 4.1.1).
import { concept, P, money, fmt, round, r2, table, f } from "../lib.mjs";

concept("bus.operations.efficiency-lean", { file: "operations/efficiency-lean", keyPrefix: "operations.efficiency-lean" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is labour productivity calculated?",
    options: [
      ["Output ÷ number of employees", "Correct: output per worker in a period."],
      ["Number of employees ÷ output", "The figures are the wrong way round."],
      ["Total wages ÷ output", "That gives labour cost per unit."],
      ["Output × number of employees", "Multiplying does not measure output per worker."],
    ],
    answer: "A",
    explanation: "Labour productivity = output ÷ number of employees.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **Kaizen** mean?",
    options: [
      ["Continuous improvement through many small changes", "Correct: a lean production technique."],
      ["Delivering materials exactly when they are needed", "That is just-in-time."],
      ["Making goods in large batches to cut costs", "That describes batch production."],
      ["Checking every product at the end of the line", "That is quality inspection."],
    ],
    answer: "A",
    explanation: "Kaizen is continuous improvement, usually through workers' suggestions.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A factory with 25 workers produces 4,500 units a week. What is its labour productivity?",
    options: [
      ["180 units per worker per week", "Correct: 4,500 ÷ 25."],
      ["112,500 units per worker per week", "This multiplies instead of dividing."],
      ["0.006 units per worker per week", "This divides workers by output."],
      ["4,475 units per worker per week", "This subtracts the workers from the output."],
    ],
    answer: "A",
    explanation: "4,500 ÷ 25 = 180 units per worker per week.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **main** aim of lean production?",
    options: [
      ["To reduce waste of all kinds", "Correct: lean production removes activities that add no value."],
      ["To hold as much inventory as possible", "Lean production keeps inventory low."],
      ["To employ as many workers as possible", "Lean production aims to use fewer resources."],
      ["To make every product by hand", "Lean production often uses technology."],
    ],
    answer: "A",
    explanation: "Lean production cuts waste of materials, time, space, effort and stock.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of just-in-time (JIT) inventory control?",
    options: [
      ["Less cash is tied up in inventory", "Correct: materials arrive only when needed."],
      ["Bulk-buying discounts are easier to obtain", "JIT uses small, frequent orders, so bulk discounts are lost."],
      ["Production continues even if suppliers are late", "Under JIT a late delivery can stop production."],
      ["It needs more warehouse space than before", "JIT needs less storage space."],
    ],
    answer: "A",
    explanation: "Low inventory frees cash and space and reduces waste.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A factory's suppliers are 600 km away and deliveries are often delayed. Why might JIT be unsuitable?",
    options: [
      ["A late delivery would halt production with no stock", "Correct: JIT depends on reliable deliveries."],
      ["JIT always increases the amount of stock a factory holds", "JIT reduces stock."],
      ["JIT can only be used by service businesses", "Manufacturers use JIT widely."],
      ["Distant suppliers never charge their customers for transport", "Distance usually raises delivery costs."],
    ],
    answer: "A",
    explanation: "Without buffer stock, a delayed delivery halts production; JIT needs close, reliable suppliers.",
    hints: ["What happens if materials do not arrive on time?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business hires 10 more workers. Total output rises, but labour productivity falls. How is this possible?",
    options: [
      ["Output rose by a smaller percentage than the number of workers", "Correct: output per worker fell."],
      ["Labour productivity always falls when output rises", "Productivity can rise or fall with output."],
      ["The new workers produced nothing at all in their first month", "Output rose, so they produced something; this is not the only explanation."],
      ["Productivity is measured in US dollars, not units", "Labour productivity is output per worker."],
    ],
    answer: "A",
    explanation: "Productivity = output ÷ workers; if workers rise faster than output, productivity falls.",
    hints: ["Productivity is a ratio of two numbers."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a disadvantage of Kaizen?",
    options: [
      ["Meetings to discuss ideas take time from production", "Correct: Kaizen needs time for group discussion."],
      ["It needs very expensive new machinery", "Kaizen relies mainly on small, low-cost changes."],
      ["Workers have no chance at all to share their own ideas", "Kaizen involves workers' ideas."],
      ["It stops a business from improving the quality of products", "Kaizen usually improves quality."],
    ],
    answer: "A",
    explanation: "Kaizen needs time, training and willing workers; small steps may not be enough for big problems.",
    hints: ["What does Kaizen ask workers to do?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Higher labour productivity usually lowers the labour cost of each unit produced.",
    answer: true,
    explanation: "True. The same wage bill is spread over more output.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under just-in-time, a business buys raw materials in very large quantities to get discounts.",
    answer: false,
    explanation: "False. JIT uses small, frequent deliveries; bulk-buying discounts are usually lost.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each way of raising efficiency with how it works.",
    pairs: [
      ["Automation", "Machines work faster and more accurately"],
      ["Training", "Skilled workers make fewer mistakes"],
      ["Just-in-time", "Materials arrive only when needed, cutting stock"],
      ["Kaizen", "Workers suggest many small improvements"],
    ],
    explanation: "Each method raises output per worker or cuts waste.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Lean production aims to reduce {{blank:a}}. Under {{blank:b}}, materials are delivered exactly when they are needed for production.",
    blanks: [
      { id: "a", accepted: ["waste"], choices: ["waste", "output", "quality", "wages"] },
      { id: "b", accepted: ["just-in-time"], choices: ["just-in-time", "Kaizen", "batch production", "job production"] },
    ],
    explanation: "Lean production cuts waste; JIT is its inventory method.",
  });
  const o1 = 3600, w1 = 15, o2 = 3900, w2 = 13;
  const lp1 = f.labourProductivity(o1, w1), lp2 = f.labourProductivity(o2, w2);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: lp1, daily: true,
    stem: `A brick works employs ${w1} workers who make ${fmt(o1)} bricks a day. Calculate the labour productivity (bricks per worker per day).`,
    wrong: [o1 * w1],
    explanation: `${fmt(o1)} ÷ ${w1} = ${lp1} bricks per worker per day.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: ((lp2 - lp1) / lp1) * 100, calculator: true,
    stem: `The brick works (${w1} workers, ${fmt(o1)} bricks a day) buys a new mixer. Now ${w2} workers make ${fmt(o2)} bricks a day. Calculate the percentage increase in labour productivity, to one decimal place.`,
    wrong: [round(((o2 - o1) / o1) * 100, 1), round(lp2 - lp1, 1)],
    explanation: `Before ${lp1}; after ${fmt(o2)} ÷ ${w2} = ${lp2}; increase ${lp2 - lp1} ÷ ${lp1} × 100 = ${round(((lp2 - lp1) / lp1) * 100, 1)}%.`,
    workedSolution: `1. Before: ${fmt(o1)} ÷ ${w1} = ${lp1} bricks per worker.\n2. After: ${fmt(o2)} ÷ ${w2} = ${lp2} bricks per worker.\n3. Increase = ${lp2 - lp1}; percentage = ${lp2 - lp1} ÷ ${lp1} × 100 = ${round(((lp2 - lp1) / lp1) * 100, 1)}%.`,
    hints: ["Find productivity before and after.", "Percentage change = change ÷ original × 100."],
  });
  const w3 = 6, wage3 = 145, out3 = 1160;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: (w3 * wage3) / out3,
    stem: `A tailoring business employs ${w3} machinists, each paid ${money(wage3)} a week. Together they make ${fmt(out3)} shirts a week. Calculate the labour cost per shirt.`,
    wrong: [r2(wage3 / out3), r2(out3 / (w3 * wage3))],
    explanation: `Wage bill = ${w3} × ${fmt(wage3)} = ${fmt(w3 * wage3)}; ${fmt(w3 * wage3)} ÷ ${fmt(out3)} = ${money((w3 * wage3) / out3)}.`,
    workedSolution: `1. Weekly wage bill = ${w3} × ${fmt(wage3)} = ${money(w3 * wage3)}.\n2. Labour cost per shirt = ${fmt(w3 * wage3)} ÷ ${fmt(out3)} = ${money((w3 * wage3) / out3)}.`,
    hints: ["Find the total wage bill first."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways a manufacturer could increase labour productivity.",
    points: [
      "Way 1, e.g. training (1)",
      "Explained: workers become faster and make fewer mistakes, so output per worker rises (1)",
      "Way 2, e.g. automation / better equipment / motivation / better layout (1)",
      "Explained: each worker can produce more in the same time (1)",
    ],
    modelAnswer: "The manufacturer could train its workers so they work faster and make fewer faulty products, raising output per worker. It could also buy better machinery, so each worker produces more units in the same time.",
    explanation: "Training, technology, motivation and organisation all raise output per worker.",
    hints: ["Think about skills and equipment."],
  });
  // Structured 1: JIT decision.
  const inv = 24000, store = 900;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Sipho's company in Bulawayo assembles solar water heaters. It keeps about ${money(inv)} of components in a rented store costing ${money(store)} a month. Most components are imported and arrive by road; deliveries are sometimes held up for several days at the border. The production manager wants to introduce just-in-time (JIT) inventory control. This year the company's 16 workers assembled 2,880 heaters; next year it plans to assemble 3,240 with 18 workers.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "units", value: f.labourProductivity(2880, 16), stem: "Calculate this year's labour productivity (heaters per worker per year).", wrong: [2880 * 16], explanation: `2,880 ÷ 16 = ${f.labourProductivity(2880, 16)}.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "What will happen to labour productivity next year if the plan is met?", options: [["It will stay the same", "Correct: 3,240 ÷ 18 = 180, the same as this year."], ["It will rise", "Output rises, but so does the number of workers, in the same proportion."], ["It will fall", "3,240 ÷ 18 = 180, the same as this year."], ["It cannot be calculated", "Both figures are given."]], answer: "A" }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: store * 12, stem: "Calculate the yearly cost of renting the store.", wrong: [store], explanation: `12 × ${fmt(store)} = ${money(store * 12)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain **one** benefit of JIT for the company.", points: [`Frees cash tied up in ${money(inv)} of components / saves store rent of ${money(store * 12)} a year (1)`, "Less damage, theft or obsolete stock (1)"] }),
      P.manual({ label: "(e)", marks: 6, stem: "Should the company introduce JIT? Justify your answer.", points: ["Benefits: cash freed and store costs saved (1)", "Imported components and border delays make deliveries unreliable (1)", "A late delivery would stop assembly: lost sales and idle workers (1)", "Loses bulk-buying discounts / higher transport costs for small deliveries (1)", "Possible compromise: JIT for local components, buffer stock for imports (1)", "Justified decision (1)"] }),
    ],
    explanation: `Productivity ${f.labourProductivity(2880, 16)} heaters per worker; unchanged next year. JIT saves ${money(store * 12)} rent but delivery risk is high.`,
    hints: ["Productivity = output ÷ workers."],
  });
  // Structured 2: Kaizen and automation.
  const before = { out: 2400, w: 20 }, after = { out: 2400, w: 12 };
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `A dairy in Mutare packs ${fmt(before.out)} litres of milk a day using ${before.w} workers. It could buy an automatic packing machine, after which ${after.w} workers would pack the same amount. Alternatively, it could introduce Kaizen groups, which managers expect to raise output gradually with the existing workforce.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "units", value: f.labourProductivity(after.out, after.w) - f.labourProductivity(before.out, before.w), stem: "Calculate the increase in litres packed per worker per day if the machine is bought.", wrong: [before.w - after.w], explanation: `Before ${f.labourProductivity(before.out, before.w)}; after ${f.labourProductivity(after.out, after.w)}; increase ${f.labourProductivity(after.out, after.w) - f.labourProductivity(before.out, before.w)}.` }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how Kaizen could raise productivity at the dairy.", points: ["Workers meet in small groups to suggest improvements (1)", "Many small changes, e.g. layout, cleaning routines, less waiting (1)", "Workers feel involved, so motivation and output rise (1)"] }),
      P.manual({ label: "(c)", marks: 6, stem: "Recommend whether the dairy should buy the machine or introduce Kaizen. Justify your answer.", points: ["Machine: large immediate rise in productivity (1)", "But high cost; eight jobs lost; morale; breakdowns (1)", "Kaizen: low cost, motivating, uses workers' knowledge (1)", "But gains are slow and uncertain (1)", "Could do both: Kaizen alongside the machine / redeploy workers (1)", "Justified recommendation (1)"] }),
    ],
    explanation: `Productivity would rise from ${f.labourProductivity(before.out, before.w)} to ${f.labourProductivity(after.out, after.w)} litres per worker per day with the machine.`,
    hints: ["Productivity = output ÷ workers."],
  });
  b.card("FORMULA", "Labour productivity", "Output ÷ number of employees (per period).");
  b.card("DEFINITION", "Productivity", "Output compared with the inputs used to produce it.");
  b.card("DEFINITION", "Efficiency", "Producing output with the minimum use of resources, so cost per unit is as low as possible.");
  b.card("CONCEPT", "Ways to raise productivity", "Automation and technology, training, motivation, better organisation, inventory control, quality control.");
  b.card("DEFINITION", "Lean production", "Techniques that cut waste of all kinds to raise efficiency.");
  b.card("DEFINITION", "Just-in-time (JIT)", "Materials arrive exactly when needed and goods are made to order, so little inventory is held.");
  b.card("CONCEPT", "JIT pros and cons", "Less cash and space tied up, less waste; but needs reliable suppliers, loses bulk discounts, cannot meet sudden demand.");
  b.card("DEFINITION", "Kaizen", "Continuous improvement through many small changes, often suggested by workers.");
  b.card("CONCEPT", "Kaizen pros and cons", "Low cost, motivating, uses workers' knowledge; but takes time, may meet resistance, small steps may not be enough.");
});
