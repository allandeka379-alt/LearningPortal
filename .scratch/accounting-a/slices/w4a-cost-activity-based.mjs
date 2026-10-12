// W4a: cost.activity-based (Cambridge A Level only; tagged to Cambridge automatically)
import { concept, P, table, chk, r2 } from "../lib.mjs";
import { mc, F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.activity-based", { file: "cost/activity-based", keyPrefix: "cost.activity-based" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a cost driver in activity based costing?",
    ok: ["The cause of the cost of an activity", "Correct: for example the number of set-ups or inspections."],
    bad: [["The total cost of one activity in the factory", "That is a cost pool."], ["The person who manages a department of the factory", "A cost driver is a cause of cost, not a person."], ["The selling price of a product in the market", "The selling price is not the cause of the activity cost."]],
    explanation: "A cost driver is the factor that causes the cost of an activity. It is used to share the cost pool among products.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a cost pool?",
    ok: ["The total overhead cost of one activity", "Correct: for example all the costs of machine set-ups."],
    bad: [["The total of all the factory overheads", "A cost pool is for one activity, not for the whole factory."], ["The cost of one unit of a product", "A cost pool is a collection of overhead costs."], ["The profit shared among the owners", "A cost pool is not a profit measure."]],
    explanation: "A cost pool collects the overhead costs of one activity before they are charged to products using the cost driver.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "How is a cost driver rate calculated?",
    ok: ["Cost of the pool ÷ total activity of the driver", "Correct: for example US\\$ per set-up."],
    bad: [["Cost of the pool × total activity of the driver", "The rate is a division, not a multiplication."], ["Total factory overhead ÷ direct labour hours", "That is the traditional absorption rate."], ["Selling price ÷ cost of the pool", "The selling price is not used in the rate."]],
    explanation: "Cost driver rate = cost of the activity pool ÷ total quantity of the cost driver.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A pool of quality inspection costs of US\\$36,000 has a cost driver of the number of inspections. Total inspections in the year were 45. Product X had 18 inspections. How much of the pool is allocated to X?",
    ok: ["US\\$14,400", "Correct: 36,000 ÷ 45 = 800 per inspection; 800 × 18."],
    bad: [["US\\$800", "This is the rate per inspection, not the amount allocated to X."], ["US\\$18,000", "This takes half of the pool without using the driver."], ["US\\$2,000", "This divides the pool by the inspections of X."]],
    hints: ["Find the rate per inspection first."],
    explanation: "Rate = 36,000 ÷ 45 = US\\$800 per inspection. X: 18 × 800 = US\\$14,400.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A business uses a single labour hour rate. One product is made in small numbers but needs many set-ups. What is the likely effect on its reported cost compared with ABC?",
    ok: ["The reported cost is too low, because set-up costs are spread by labour hours", "Correct: its set-up costs are under-allocated."],
    bad: [["The reported cost is too high, because it uses fewer labour hours", "Fewer hours mean less overhead is charged under the traditional method."], ["The reported cost is the same under both methods", "ABC allocates by activity and changes the cost."], ["The reported cost is too high, because set-up costs are fixed", "Fixed set-up costs are spread by hours, so a low-hour product gets too little."]],
    hints: ["Which method charges by the number of set-ups?"],
    explanation: "A low-volume product with many set-ups causes more overhead than its labour hours suggest. The traditional method under-costs it.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a limitation of activity based costing?",
    ok: ["Collecting the data is costly and takes time", "Correct: the benefits may not justify the effort for a small business."],
    bad: [["It cannot be used to help in pricing products", "ABC costs can be used for pricing."], ["It always increases the total overhead of the firm", "ABC changes only how overhead is shared."], ["It ignores the overheads that are caused by activities", "ABC is based on activities."]],
    hints: ["Think about the work needed to introduce ABC."],
    explanation: "ABC needs detailed data and judgement in choosing drivers. For a small business with similar products it may not be worth the cost.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "ABC shows that a custom product makes a loss although the traditional method showed a profit. What is the best action?",
    ok: ["Review its price and activity costs before deciding", "Correct: decisions should use the ABC cost and consider the customers."],
    bad: [["Stop making it at once without any further analysis", "Customer relationships and avoidable costs should be considered first."], ["Ignore the ABC figures because the old method is simpler", "The ABC cost reflects the real use of activities."], ["Raise the price of all of the other products in the range", "The problem is with this product, not the others."]],
    hints: ["Think of price, cost reduction and non-financial factors."],
    explanation: "ABC gives a more accurate cost. The business should consider repricing, reducing activity costs (for example fewer set-ups) and the effect on customers before stopping the product.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Activity based costing changes the total overhead of the business.", answer: false, explanation: "False. The total overhead is the same; ABC changes how it is shared among products." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Traditional absorption costing tends to over-cost high-volume simple products and under-cost low-volume complex products.", answer: true, hints: ["Which products use many activities relative to their volume?"], explanation: "True. Volume-based rates spread overheads by hours or units, so complex low-volume products receive too little of the costs they cause." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each overhead activity to a suitable cost driver.",
    pairs: ["Machine set-ups", "Quality inspection", "Materials handling", "Deliveries to customers"],
    right: ["Number of set-ups", "Number of inspections", "Number of material movements", "Number of deliveries"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each activity has a driver that causes its cost to change: set-ups, inspections, movements and deliveries.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "In ABC the cost of each activity is collected in a cost {{blank:a}} and charged to products at a rate per unit of the cost {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["pool"], choices: ["pool", "centre", "unit"] }, { id: "b", accepted: ["driver"], choices: ["driver", "code", "centre"] }],
    explanation: "Overheads are collected in cost pools and charged using cost drivers.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the three-letter abbreviation for activity based costing.", accepted: ["ABC"], explanation: "ABC." });

  const pool = 36000, tot = 45, used = 18, uX = 1200, oh = 96000, lh = 16000, hX = 3600;
  const rate = pool / tot;
  chk(rate, 800);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: rate, calculator: true, daily: true, wrong: [pool / used, pool],
    stem: `A Chitungwiza bag factory has a quality inspection cost pool of ${usd(pool)}. The cost driver is the number of inspections, and ${tot} inspections were carried out in the year. Calculate the cost driver rate per inspection.`,
    explanation: `${F(pool)} ÷ ${tot} = ${usd(rate)} per inspection.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rate * used, calculator: true, wrong: [rate, pool - rate * used],
    stem: `Product X required ${used} of the inspections. Calculate the inspection cost allocated to X.`,
    hints: ["Rate × inspections used."],
    explanation: `${used} × ${rate} = ${usd(rate * used)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: (rate * used) / uX, dp: 2, calculator: true, wrong: [rate / uX, (rate * used) / used],
    stem: `${F(uX)} units of X were made. Calculate the inspection cost per unit of X, to the nearest cent.`,
    hints: ["Divide the allocated cost by the units."],
    explanation: `${F(rate * used)} ÷ ${F(uX)} = ${usd((rate * used) / uX)}.`,
  });
  const trRate = oh / lh;
  chk(trRate, 6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: (trRate * hX) / uX, dp: 2, calculator: true, wrong: [trRate, (oh / uX)],
    stem: `Under traditional absorption costing the factory's total overhead of ${usd(oh)} is absorbed on ${F(lh)} direct labour hours. Product X used ${F(hX)} labour hours to make ${F(uX)} units. Calculate the overhead per unit of X.`,
    hints: ["Find the rate per hour, then the hours per unit."],
    explanation: `Rate = ${F(oh)} ÷ ${F(lh)} = ${usd(trRate)} per hour. Overhead per unit = ${F(trRate * hX)} ÷ ${F(uX)} = ${usd((trRate * hX) / uX)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: 40 - 22 - 12, calculator: true, wrong: [40 - 22 - 15, 40 - 22],
    stem: "Product X sells for US\\$40 a unit and has a direct cost of US\\$22. Using the ABC overhead of US\\$12 a unit from the earlier calculation, calculate the profit per unit.".replace(/US\\$/g, "US\\$"),
    hints: ["Price less direct cost less overhead."],
    explanation: "Profit = 40 - 22 - 12 = US\\$6 a unit.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the three main steps in calculating product costs using activity based costing.",
    points: ["Identify the activities and collect their overhead costs in cost pools", "Calculate a cost driver rate for each pool = cost ÷ total driver activity", "Allocate overhead to each product using the rate × the driver quantity the product uses"],
    modelAnswer: "Collect overheads into cost pools by activity, calculate the rate per unit of the driver for each pool, then charge each product the rate times the amount of the driver it uses.",
    explanation: "One mark for each step.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why activity based costing may give more accurate product costs than a single labour hour rate.",
    points: ["Many overheads are caused by activities such as set-ups and inspections, not by labour hours", "ABC charges each product for the activities it actually uses", "So low-volume complex products are no longer subsidised by high-volume simple ones"],
    modelAnswer: "Overheads are caused by activities, not labour hours. ABC charges products for the activities they use, so complex low-volume products carry their true costs.",
    hints: ["What causes the overhead?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Evaluate whether a small business making similar products should introduce activity based costing.",
    points: ["ABC gives more accurate costs when products use activities differently", "If the products are similar, the traditional and ABC costs will be close, so the benefit is small", "ABC is costly to set up and requires detailed data", "Overheads may be small compared with direct costs, so errors in sharing them matter less", "Judgement: not worthwhile unless overheads are large and products are very different"],
    modelAnswer: "ABC is more accurate when products differ in their use of activities. For a small business with similar products the benefit is small and the system is costly, so it is probably not worthwhile unless overheads are large.",
    hints: ["Weigh the benefit against the cost."],
    explanation: "One mark for each of the five points.",
  });

  // Structured 1 (12)
  const A = { setups: 6, insp: 15, lh: 4500, units: 3000 };
  const Bp = { setups: 9, insp: 20, lh: 1500, units: 600 };
  const pS = 45000, pI = 21000;
  const rS = pS / (A.setups + Bp.setups), rI = pI / (A.insp + Bp.insp);
  chk(rS, 3000); chk(rI, 600);
  const abcB = rS * Bp.setups + rI * Bp.insp;
  chk(abcB, 39000);
  const trR = (pS + pI) / (A.lh + Bp.lh);
  chk(trR, 11);
  const trB = (trR * Bp.lh) / Bp.units;
  chk(trB, 27.5);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Mutare Plastics makes standard buckets (A) and special-order tanks (B). Overheads are set-up costs of ${usd(pS)} and inspection costs of ${usd(pI)}. Activity data for the year:\n\n${table(["", "A", "B"], [["Units made", F(A.units), F(Bp.units)], ["Direct labour hours", F(A.lh), F(Bp.lh)], ["Number of set-ups", A.setups, Bp.setups], ["Number of inspections", A.insp, Bp.insp]], ["l", "r", "r"])}\n\nTraditional absorption costing charges overhead on direct labour hours.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: rS, wrong: [pS / A.setups, pS], stem: "Calculate the cost per set-up.", explanation: `${F(pS)} ÷ ${A.setups + Bp.setups} = ${usd(rS)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: rI, wrong: [pI / A.insp, pI], stem: "Calculate the cost per inspection.", explanation: `${F(pI)} ÷ ${A.insp + Bp.insp} = ${usd(rI)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: abcB, wrong: [rS * Bp.setups, trR * Bp.lh], stem: "Calculate the total overhead allocated to B under ABC.", explanation: `Set-ups ${Bp.setups} × ${rS} = ${F(Bp.setups * rS)}; inspections ${Bp.insp} × ${rI} = ${F(Bp.insp * rI)}; total ${usd(abcB)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: abcB / Bp.units, dp: 2, wrong: [trB, abcB / A.units], stem: "Calculate the overhead per unit of B under ABC.", explanation: `${F(abcB)} ÷ ${F(Bp.units)} = ${usd(abcB / Bp.units)}.` }),
      P.num({ label: "(e)", marks: 1, kind: "money", value: trB, dp: 2, wrong: [abcB / Bp.units, trR], stem: "Calculate the overhead per unit of B under traditional absorption costing.", explanation: `Rate = ${F(pS + pI)} ÷ ${F(A.lh + Bp.lh)} = ${usd(trR)} an hour; B: ${F(trR * Bp.lh)} ÷ ${F(Bp.units)} = ${usd(trB)}.` }),
      P.manual({ label: "(f)", marks: 5, stem: "Evaluate the effect on the price and profit of tanks (B) of using ABC instead of traditional absorption costing.", points: [`Traditional costing charges B ${trB.toFixed(2)} a unit but ABC charges ${(abcB / Bp.units).toFixed(2)}, more than twice as much`, "B causes 9 of the 15 set-ups and 20 of the 35 inspections although it uses only a quarter of the labour hours", "Under the traditional method B is under-costed and A over-costed", "Prices based on the traditional cost may leave B unprofitable and A over-priced", "Recommendation: reprice B (or reduce set-ups by larger batches) and consider the effect on customers"].map((x) => x.replace("US$", "US\\$")), modelAnswer: `ABC charges B ${(abcB / Bp.units).toFixed(2)} a unit against ${trB.toFixed(2)} under the traditional method because B causes most of the set-ups and inspections. B has been under-costed and may be unprofitable at its present price. The business should reprice B or reduce set-ups, considering customer reaction.`, hints: ["Compare the two unit overheads and the activities B uses."], explanation: "One mark for each of the five points." }),
    ],
    hints: ["Rate = cost of pool ÷ total driver quantity.", "Traditional rate = total overhead ÷ total labour hours."],
    explanation: "This item tests cost driver rates, allocation, a comparison with traditional costing and an evaluation.",
  });

  // Structured 2 (14): Gweru Packaging
  const PQ = {
    P: { units: 25000, mh: 5000, setups: 12, insp: 50, deliv: 40, direct: 2.1, price: 8 },
    Q: { units: 6000, mh: 3000, setups: 36, insp: 100, deliv: 20, direct: 3.4, price: 20 },
  };
  const pools = { setup: 48000, insp: 33000, deliv: 15000, gen: 56000 };
  const tOH = pools.setup + pools.insp + pools.deliv + pools.gen;
  chk(tOH, 152000);
  const mhT = PQ.P.mh + PQ.Q.mh;
  const trRt = tOH / mhT;
  chk(trRt, 19);
  const r = { s: pools.setup / (PQ.P.setups + PQ.Q.setups), i: pools.insp / (PQ.P.insp + PQ.Q.insp), d: pools.deliv / (PQ.P.deliv + PQ.Q.deliv), g: pools.gen / mhT };
  chk(r.s, 1000); chk(r.i, 220); chk(r.d, 250); chk(r.g, 7);
  const abcQ = r.s * PQ.Q.setups + r.i * PQ.Q.insp + r.d * PQ.Q.deliv + r.g * PQ.Q.mh;
  chk(abcQ, 84000);
  const abcQU = abcQ / PQ.Q.units;
  chk(abcQU, 14);
  const trQU = (trRt * PQ.Q.mh) / PQ.Q.units;
  chk(trQU, 9.5);
  const profQtr = PQ.Q.price - PQ.Q.direct - trQU, profQabc = PQ.Q.price - PQ.Q.direct - abcQU;
  chk(profQtr, 7.1); chk(profQabc, 2.6);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Gweru Packaging makes plain boxes (P) and printed boxes (Q). Overheads for the year are set-ups ${usd(pools.setup)} (driver: number of set-ups), quality control ${usd(pools.insp)} (inspections), delivery handling ${usd(pools.deliv)} (deliveries) and general factory costs ${usd(pools.gen)} (machine hours).\n\n${table(["", "P", "Q"], [["Units made", F(PQ.P.units), F(PQ.Q.units)], ["Machine hours", F(PQ.P.mh), F(PQ.Q.mh)], ["Set-ups", PQ.P.setups, PQ.Q.setups], ["Inspections", PQ.P.insp, PQ.Q.insp], ["Deliveries", PQ.P.deliv, PQ.Q.deliv], ["Direct cost per box US\\$", PQ.P.direct, PQ.Q.direct], ["Selling price per box US\\$", PQ.P.price, PQ.Q.price]], ["l", "r", "r"])}\n\nTraditional absorption costing charges all overhead on machine hours.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: trQU, dp: 2, wrong: [trRt, abcQU], stem: "Calculate the overhead per box of Q under traditional absorption costing.", explanation: `Rate = ${F(tOH)} ÷ ${F(mhT)} = ${usd(trRt)} per machine hour; Q: ${F(trRt * PQ.Q.mh)} ÷ ${F(PQ.Q.units)} = ${usd(trQU)}.` }),
      P.group({ label: "(b)", stem: "Calculate the cost driver rate for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: r.s, wrong: [pools.setup / PQ.Q.setups, 4000], stem: "set-ups", explanation: `${F(pools.setup)} ÷ ${PQ.P.setups + PQ.Q.setups} = ${usd(r.s)}.` }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: r.i, wrong: [pools.insp / PQ.Q.insp, 150], stem: "inspections", explanation: `${F(pools.insp)} ÷ ${PQ.P.insp + PQ.Q.insp} = ${usd(r.i)}.` }),
        P.num({ label: "(iii)", marks: 1, kind: "money", value: r.d, wrong: [pools.deliv / PQ.Q.deliv, 450], stem: "deliveries", explanation: `${F(pools.deliv)} ÷ ${PQ.P.deliv + PQ.Q.deliv} = ${usd(r.d)}.` }),
        P.num({ label: "(iv)", marks: 1, kind: "money", value: r.g, wrong: [trRt, pools.gen / PQ.Q.mh], stem: "general factory costs, per machine hour", explanation: `${F(pools.gen)} ÷ ${F(mhT)} = ${usd(r.g)}.` }),
      ] }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: abcQ, wrong: [trRt * PQ.Q.mh, r.s * PQ.Q.setups], stem: "Calculate the total overhead allocated to Q under ABC.", explanation: `Set-ups ${F(r.s * PQ.Q.setups)} + inspections ${F(r.i * PQ.Q.insp)} + deliveries ${F(r.d * PQ.Q.deliv)} + general ${F(r.g * PQ.Q.mh)} = ${usd(abcQ)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: profQabc, dp: 2, wrong: [profQtr, PQ.Q.price - PQ.Q.direct], stem: "Calculate the profit per box of Q under ABC, to the nearest cent.", explanation: `Overhead per box ${F(abcQU)}; profit = ${PQ.Q.price} - ${PQ.Q.direct} - ${F(abcQU)} = ${usd(profQabc)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Compare the profit per box of Q under the two methods and explain the difference.", points: [`Traditional costing shows ${profQtr.toFixed(2)} a box, ABC only ${profQabc.toFixed(2)}`, "Q uses 36 of the 48 set-ups and 100 of the 150 inspections but only 3/8 of the machine hours", "So the machine hour rate under-allocates the costs of Q"], modelAnswer: `Traditional costing shows a profit of ${profQtr.toFixed(2)} a box but ABC shows ${profQabc.toFixed(2)}. Q uses most of the set-ups and inspections, so a machine hour rate charges it too little.`, explanation: "One mark for each point." }),
    ],
    hints: ["Rates: cost of each pool ÷ total driver quantity.", "Divide by units to get the cost per box."],
    explanation: "This item tests ABC allocation with four pools and compares unit profit under two methods.",
  });

  b.card("DEFINITION", "Activity based costing (ABC)", "Overheads are collected in cost pools by activity and charged to products at a rate per unit of the cost driver.");
  b.card("DEFINITION", "Cost driver", "The factor that causes the cost of an activity, such as the number of set-ups or inspections.");
  b.card("DEFINITION", "Cost pool", "The total overhead cost of one activity.");
  b.card("FORMULA", "Cost driver rate", "Cost of the pool ÷ total quantity of the cost driver.");
  b.card("FORMULA", "Overhead charged to a product", "Cost driver rate × quantity of the driver used by the product; divide by units for the overhead per unit.");
  b.card("CONCEPT", "Why ABC differs from traditional costing", "Volume-based rates over-cost high-volume simple products and under-cost low-volume complex ones.");
  b.card("CONCEPT", "ABC and total overhead", "ABC does not change total overhead; it changes how it is shared among products.");
  b.card("CONCEPT", "Limitations of ABC", "Costly data collection, judgement in choosing drivers, some overheads have no clear driver, historical costs.");
  b.card("CONCEPT", "Decisions using ABC", "Reprice products, reduce activities (fewer set-ups), review unprofitable products, with non-financial factors considered.");
  b.card("FACT", "Where ABC is examined", "Cambridge A Level Paper 4 only; not in the ZIMSEC syllabus.");
});
void p1; void p2; void r2; void table;
