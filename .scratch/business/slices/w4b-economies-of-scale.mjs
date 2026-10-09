// W4b: economies and diseconomies of scale (CAM 4.4.2).
import { concept, P, money, fmt, r2, round, table, f } from "../lib.mjs";

concept("bus.operations.economies-of-scale", { file: "operations/economies-of-scale", keyPrefix: "operations.economies-of-scale" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are **economies of scale**?",
    options: [
      ["Falls in average cost as a business grows", "Correct: unit costs fall with scale."],
      ["Rises in total cost as output increases", "Total cost rises with output; this is not an economy of scale."],
      ["Savings made by employing fewer workers", "This may cut costs but is not what economies of scale means."],
      ["Increases in price charged by large firms", "Economies of scale are about costs, not prices."],
    ],
    answer: "A",
    explanation: "Economies of scale reduce average (unit) cost as the scale of operation increases.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A supermarket chain pays less per carton of soap than a small shop because it buys huge quantities. Which economy of scale is this?",
    options: [
      ["Purchasing", "Correct: bulk-buying discounts."],
      ["Financial", "Financial economies are about cheaper borrowing."],
      ["Managerial", "Managerial economies are about specialist managers."],
      ["Technical", "Technical economies are about machinery and methods."],
    ],
    answer: "A",
    explanation: "Buying in bulk gains discounts: purchasing economies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can large businesses often borrow at lower interest rates than small ones?",
    options: [
      ["Banks see them as less risky because they have more assets", "Correct: a financial economy of scale."],
      ["The law sets lower interest rates for large firms", "There is no such law."],
      ["Large firms never need to repay their loans", "All loans must be repaid."],
      ["Large firms borrow only from their own employees", "Large firms borrow from banks and markets."],
    ],
    answer: "A",
    explanation: "Lower risk to the lender means cheaper, easier finance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of a **diseconomy** of scale?",
    options: [
      ["Messages between head office and branches are slow and distorted", "Correct: poor communication raises costs."],
      ["The business gains discounts for buying in bulk", "That is a purchasing economy."],
      ["The business employs a specialist marketing manager", "That is a managerial economy."],
      ["The business buys a faster, larger machine", "That is a technical economy."],
    ],
    answer: "A",
    explanation: "Poor communication, low commitment, weak coordination and lack of control are diseconomies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A national bus company's television advertising costs the same whether it sells one million tickets or two million. Which economy of scale does this show?",
    options: [
      ["Marketing", "Correct: advertising cost per unit falls as sales grow."],
      ["Purchasing", "Purchasing economies are about buying inputs in bulk."],
      ["Financial", "Financial economies are about borrowing."],
      ["Technical", "Technical economies are about production methods."],
    ],
    answer: "A",
    explanation: "Marketing costs spread over more sales lower the cost per ticket.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Workers in a very large factory say they feel like \"just a number\" and absence has risen. Which diseconomy of scale is this?",
    options: [
      ["Low commitment of employees", "Correct: workers feel remote and unmotivated."],
      ["Weak coordination", "Coordination is about departments working together."],
      ["Purchasing diseconomies", "This is not a recognised type and is unrelated to workers."],
      ["Financial economies", "This is an economy, not a diseconomy."],
    ],
    answer: "A",
    explanation: "Feeling unimportant in a huge organisation lowers motivation and productivity.",
    hints: ["The problem is about how workers feel."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which action would **best** reduce diseconomies of scale in a business with many branches?",
    options: [
      ["Giving branch managers authority to make local decisions", "Correct: decentralisation speeds decisions and improves control."],
      ["Adding more layers of management at head office", "More layers make communication slower."],
      ["Buying raw materials in even larger quantities", "This is a purchasing economy; it does not fix diseconomies."],
      ["Stopping all meetings between managers and staff", "This would worsen communication and commitment."],
    ],
    answer: "A",
    explanation: "Decentralisation, better communication and motivation reduce diseconomies.",
    hints: ["Think about where decisions are made."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A large machine costs twice as much as a small one but produces four times the output. What happens to the machine cost per unit?",
    options: [
      ["It halves", "Correct: 2 × cost ÷ 4 × output = half the cost per unit."],
      ["It doubles", "Output rises more than cost, so cost per unit falls."],
      ["It stays the same", "Output rises faster than cost."],
      ["It falls to a quarter", "Cost also doubled, so it halves, not quarters."],
    ],
    answer: "A",
    explanation: "Twice the cost spread over four times the output gives half the cost per unit: a technical economy.",
    hints: ["Divide the change in cost by the change in output."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Economies of scale reduce the average cost of production.",
    answer: true,
    explanation: "True. They lower cost per unit, although total costs rise with output.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The bigger a business becomes, the lower its average cost will always be.",
    answer: false,
    explanation: "False. Beyond a certain size, diseconomies of scale can raise average cost.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each economy of scale with an example.",
    pairs: [
      ["Purchasing", "Discounts for buying cement by the truckload"],
      ["Marketing", "National advertising spread over millions of sales"],
      ["Financial", "Borrowing at a lower interest rate"],
      ["Managerial", "Employing a specialist finance director"],
      ["Technical", "Using an automated production line"],
    ],
    explanation: "Each type lowers cost per unit in a different way.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "When a business becomes so large that its average cost rises, it suffers {{blank:a}} of scale, for example because of poor {{blank:b}} between managers and workers.",
    blanks: [
      { id: "a", accepted: ["diseconomies"], choices: ["diseconomies", "economies", "returns", "efficiencies"] },
      { id: "b", accepted: ["communication"], choices: ["communication", "purchasing", "advertising", "borrowing"] },
    ],
    explanation: "Diseconomies of scale include poor communication, low commitment, weak coordination and lack of control.",
  });
  const s1 = { q: 2000, fc: 3200, vc: 1.8 }, s2 = { q: 8000, fc: 5600, vc: 1.5 };
  const ac1 = f.averageCost(f.totalCost(s1.fc, s1.vc * s1.q), s1.q), ac2 = f.averageCost(f.totalCost(s2.fc, s2.vc * s2.q), s2.q);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: ac1, daily: true,
    stem: `A juice maker produces ${fmt(s1.q)} bottles a month with fixed costs of ${money(s1.fc)} and a variable cost of ${money(s1.vc)} a bottle. Calculate the average cost per bottle.`,
    wrong: [s1.vc, s1.fc / s1.q],
    explanation: `(${fmt(s1.fc)} + ${s1.vc.toFixed(2)} × ${fmt(s1.q)}) ÷ ${fmt(s1.q)} = ${money(ac1)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: ((ac1 - ac2) / ac1) * 100, calculator: true,
    stem: `The juice maker (average cost ${money(ac1)} a bottle) expands to ${fmt(s2.q)} bottles a month. Fixed costs rise to ${money(s2.fc)}, and bulk buying cuts the variable cost to ${money(s2.vc)} a bottle. Calculate the percentage fall in average cost, to one decimal place.`,
    wrong: [round(ac1 - ac2, 2), round(((ac1 - ac2) / ac2) * 100, 1)],
    explanation: `New average cost = (${fmt(s2.fc)} + ${s2.vc.toFixed(2)} × ${fmt(s2.q)}) ÷ ${fmt(s2.q)} = ${fmt(ac2)}; fall = ${fmt(r2(ac1 - ac2))} ÷ ${fmt(ac1)} × 100 = ${round(((ac1 - ac2) / ac1) * 100, 1)}%.`,
    workedSolution: `1. New total cost = ${fmt(s2.fc)} + ${s2.vc.toFixed(2)} × ${fmt(s2.q)} = ${fmt(f.totalCost(s2.fc, s2.vc * s2.q))}.\n2. New average cost = ${fmt(f.totalCost(s2.fc, s2.vc * s2.q))} ÷ ${fmt(s2.q)} = ${money(ac2)}.\n3. Percentage fall = (${fmt(ac1)} − ${fmt(ac2)}) ÷ ${fmt(ac1)} × 100 = ${round(((ac1 - ac2) / ac1) * 100, 1)}%.`,
    hints: ["Find the new average cost.", "Divide the fall by the original average cost."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** economies of scale a supermarket chain might gain by opening more branches.",
    points: [
      "Economy 1 identified, e.g. purchasing (1)",
      "Explained: buys in bulk for all branches, lower cost per item (1)",
      "Economy 2 identified, e.g. marketing / managerial / financial (1)",
      "Explained: one advertising campaign covers all branches / specialist managers / cheaper loans (1)",
    ],
    modelAnswer: "With more branches the chain buys goods in much larger quantities, so suppliers give bulk discounts and the cost of each item falls. One national advertising campaign also serves all branches, so the advertising cost per item sold is lower.",
    explanation: "Purchasing, marketing, financial, managerial and technical economies all lower unit cost.",
    hints: ["What can a big chain do that a single shop cannot?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** diseconomies of scale a manufacturer might suffer after merging with a rival, and **one** way to reduce them.",
    points: [
      "Diseconomy 1, e.g. poor communication through more layers / two sites (1)",
      "Diseconomy 2, e.g. weak coordination / low commitment of staff from the other firm (1)",
      "Explained effect on costs: slower decisions, duplication, lower productivity (1)",
      "Way to reduce: decentralise / clear communication systems / involve staff (1)",
    ],
    modelAnswer: "After the merger, instructions must pass through more managers across two sites, so messages are slow and mistakes increase. Staff from the rival firm may also feel unimportant and lose commitment, lowering productivity. Giving each site's manager authority over daily decisions and holding regular briefings would reduce these problems.",
    explanation: "Mergers enlarge firms quickly, so communication, coordination and commitment suffer.",
    hints: ["What changes when two organisations become one?"],
  });
  // Structured 1.
  const rows = [[500, 2400, 4.0], [2000, 4400, 3.2], [8000, 9600, 2.6]];
  const acs = rows.map(([q, fc, vc]) => f.averageCost(f.totalCost(fc, vc * q), q));
  const tbl = table(["Bags of cement a day", "Fixed costs US\\$", "Variable cost per bag US\\$"], rows.map(([q, fc, vc]) => [q, fc, vc.toFixed(2)]));
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Kwekwe Cement Ltd (a fictional company) is planning to expand. Its accountant has estimated costs at three sizes of plant.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: acs[1], stem: "Calculate the average cost per bag at 2,000 bags a day.", wrong: [rows[1][2], round(rows[1][1] / rows[1][0], 2)], explanation: `(${fmt(rows[1][1])} + ${rows[1][2].toFixed(2)} × 2,000) ÷ 2,000 = ${money(acs[1])}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: acs[2], stem: "Calculate the average cost per bag at 8,000 bags a day.", wrong: [rows[2][2]], explanation: `(${fmt(rows[2][1])} + ${rows[2][2].toFixed(2)} × 8,000) ÷ 8,000 = ${money(acs[2])}.` }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** economies of scale that could explain the fall in average cost.", points: ["Purchasing: bulk buying of limestone, fuel, bags (1)", "Explained: lower variable cost per bag, from US\\$4.00 to US\\$2.60 (1)", "Technical: larger kilns and automated packing (1)", "Explained: fixed costs rise less than output, so fixed cost per bag falls (1)"] }),
      P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the company should build the largest plant.", points: [`Lowest average cost (${money(acs[2])}), so lower prices or higher margins (1)`, "Needs demand for 8,000 bags a day; otherwise fixed costs are not spread (1)", "Risk of diseconomies: communication, control, more workers (1)", "Justified conclusion (1)"] }),
    ],
    explanation: `Average cost: ${money(acs[0])} at 500, ${money(acs[1])} at 2,000, ${money(acs[2])} at 8,000 bags a day.`,
    hints: ["Average cost = (fixed + variable cost per bag × output) ÷ output."],
  });
  // Structured 2.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "Thandeka's company runs one hotel in Victoria Falls. She plans to buy four more hotels in different towns over the next three years and manage them all from her office in Victoria Falls.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** economies of scale the company could gain.", points: ["Purchasing, e.g. bulk buying of food, linen, cleaning products (1)", "Marketing / financial / managerial, e.g. one website and booking system for all hotels (1)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** diseconomies of scale the company might suffer.", points: ["Poor communication: one office managing five distant hotels (1)", "Explained: slow decisions, mistakes with bookings or supplies (1)", "Lack of control / low commitment: Thandeka cannot check service standards everywhere (1)", "Explained: falling quality, waste, complaints (1)"] }),
      P.manual({ label: "(c)", marks: 4, stem: "Recommend how Thandeka should organise the business to gain economies of scale while avoiding diseconomies. Justify your answer.", points: ["Central buying and marketing to keep economies (1)", "A manager in each hotel with authority for daily decisions (decentralisation) (1)", "Regular reports, targets and communication systems (1)", "Justified recommendation (1)"] }),
    ],
    explanation: "Central buying and marketing keep economies of scale; decentralised hotel managers reduce diseconomies.",
    hints: ["Which tasks should be central and which local?"],
  });
  b.card("DEFINITION", "Economies of scale", "Falls in average (unit) cost as a business increases its scale of operation.");
  b.card("DEFINITION", "Diseconomies of scale", "Rises in average cost when a business grows too large.");
  b.card("CONCEPT", "Five economies of scale", "Purchasing (bulk discounts), marketing (spread over more sales), financial (cheaper loans), managerial (specialists), technical (better machinery).");
  b.card("CONCEPT", "Four diseconomies of scale", "Poor communication, low commitment of employees, weak coordination, lack of control.");
  b.card("CONCEPT", "Reducing diseconomies", "Decentralise, improve communication, motivate and involve staff, set clear objectives.");
  b.card("FACT", "Total v average cost", "Economies of scale lower average cost; total cost still rises with output.");
  b.card("CONCEPT", "Technical economies", "A larger machine may cost twice as much but produce four times as much, halving cost per unit.");
  b.card("CONCEPT", "Financial economies", "Large firms are less risky to lenders, so they borrow more easily and at lower interest; plcs can sell shares.");
});
