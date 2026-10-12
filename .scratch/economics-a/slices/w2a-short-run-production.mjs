// W2a: short-run production, diminishing returns, productivity (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, pctChange, dpStr, productivity } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied to the data and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.costs.short-run-production", { file: "costs/short-run-production", keyPrefix: "costs.short-run-production" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const workers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const tp = [0, 12, 30, 54, 74, 87, 95, 99, 98];
  const tab = productivity.table({ workers, tp });
  const mp = (i) => tp[i] - tp[i - 1];
  const ap = (i) => tp[i] / i;
  chk(mp(4), 20); chk(mp(5), 13); chk(ap(4), 18.5); chk(ap(6), 95 / 6, 1e-9);
  // the table must show the pattern the lesson describes: AP peaks at 4 workers, MP peaks at 3
  chk(Math.max(...workers.slice(1).map(ap)), 18.5);
  chk(Math.max(...workers.slice(1).map(mp)), 24);

  mc({ d: 1, skill: "RECALL", stem: "In economics, the short run is the period in which",
    explanation: "The short run has at least one fixed factor; output changes only by varying the other (variable) factors." },
    ["at least one factor of production is fixed", "Correct: this is the defining feature."],
    [["all factors of production are variable", "That describes the long run."], ["the firm makes a loss", "Profit or loss does not define the period."], ["the time is less than one year", "The short run is defined by fixed factors, not by calendar time."]]);

  mc({ d: 1, skill: "RECALL", stem: "The law of diminishing marginal returns states that, as units of a variable factor are added to fixed factors,",
    explanation: "Marginal product eventually falls: each extra unit of the variable factor adds less to output than the one before." },
    ["the marginal product of the variable factor will eventually fall", "Correct."],
    [["total product will fall from the first unit of the variable factor added", "Total product usually rises at first, and keeps rising while MP is positive."], ["the price of the variable factor will fall as more of it is used", "The law concerns output, not factor prices."], ["average cost will fall at each level of output as more is produced", "Costs are linked to the law, but the law itself is about product."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Marginal product of labour is best defined as the",
    explanation: "MP is the extra output from employing one more worker, the change in total product." },
    ["extra output from employing one more worker", "Correct."],
    [["total output divided by the number of workers", "This is average product."], ["output of the most productive worker", "MP is the addition to total product, not the best individual."], ["wage divided by output", "This is labour cost per unit."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "When the marginal product of labour is above the average product, the average product",
    explanation: "A marginal value above the average pulls the average up." },
    ["rises", "Correct: MP above AP raises AP."], [["falls", "AP falls only when MP is below AP."], ["stays constant", "AP is constant only where MP equals AP."], ["becomes zero", "Average product is not zero while output is positive."]]);

  mc({ d: 2, skill: "APPLICATION", stem: "Which cost of a fictional bakery is a fixed cost in the short run?",
    explanation: "Rent on the premises does not vary with the number of loaves baked; flour, piece-rate pay and fuel for the ovens do." },
    ["The monthly rent of the building", "Correct: it is paid at every output."],
    [["The flour used in each loaf", "Raw materials vary with output."], ["The pay of staff who are paid per loaf", "Piece-rate pay varies with output."], ["The fuel used by the ovens", "Fuel use varies with output."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare a marginal value with the average."],
    stem: "A firm has an average product of 40 units with 10 workers. The marginal product of the eleventh worker is 40 units. With 11 workers the average product will",
    explanation: "TP rises by 40 and workers by 1, so the average of 40 is unchanged: MP equal to AP leaves AP at its maximum." },
    ["stay at 40 units", "Correct: the new worker adds exactly the average."],
    [["rise above 40 units", "MP would have to exceed 40 to raise AP."], ["fall below 40 units", "MP would have to be below 40 to lower AP."], ["rise to 44 units", "The extra worker adds 40, not 44."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which statements follow from a lower MP alone?"],
    stem: "In a workshop with fixed machines, the marginal product of the sixth worker is lower than that of the fifth worker. This shows that",
    explanation: "A fall in marginal product is exactly what diminishing marginal returns means. Total product still rises while MP is positive, and AP depends on how MP compares with AP." },
    ["diminishing marginal returns have set in", "Correct: MP is falling as workers are added to fixed machines."],
    [["total product has begun to fall", "TP falls only when MP is negative."], ["average product must be falling", "AP may still be rising if MP is above AP."], ["the firm should stop hiring workers", "That depends on wages and the value of the extra output."]]);

  {
    const v = mp(5);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: v, unit: "units", wrong: [17.4, 87, 8],
      stem: "A fictional workshop employs 4 workers and produces 74 units a day. With 5 workers it produces 87 units a day. Calculate the marginal product of the fifth worker.",
      explanation: `MP = change in total product ÷ change in workers = (87 − 74) ÷ 1 = ${v} units. Dividing 87 by 5 gives the average product (17.4).` });
  }
  {
    const v = ap(6);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: v, dp: 2, unit: "units", hints: ["Average product is total product divided by workers."],
      wrong: [8, 95, 15.8],
      stem: "With 6 workers the workshop makes 95 units a day. Calculate the average product of labour, to two decimal places.",
      explanation: `AP = 95 ÷ 6 = ${dpStr(v, 2)} units per worker.` });
  }
  {
    const before = 750 / 25, after = 840 / 25;
    const g = pctChange(before, after);
    chk(g, 12, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: g, dp: 1, unit: "%", hints: ["Output per worker before and after."],
      wrong: [90, 10.7, 112],
      stem: "A fictional factory employs 25 workers who make 750 units a day. After training, the same 25 workers make 840 units a day. Calculate the percentage change in labour productivity.",
      explanation: `Productivity before = 750 ÷ 25 = ${before}; after = 840 ÷ 25 = ${after}. Change = (${after} − ${before}) ÷ ${before} × 100 = ${g}%. Using total output change (12% of 750 = 90 units) is not the productivity measure.` });
  }
  {
    const v = 36 / ap(6);
    chk(v, 36 * 6 / 95, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: v, dp: 2, hints: ["Labour cost per unit = wage ÷ average product."],
      wrong: [36, 3, 2.28],
      stem: "Workers at the fictional workshop are each paid US\\$36 a day. With 6 workers, total product is 95 units a day. Calculate the labour cost per unit, to the nearest cent.",
      explanation: `1. AP = 95 ÷ 6 = ${dpStr(ap(6), 2)} units.\n2. Labour cost per unit = wage ÷ AP = 36 ÷ ${dpStr(ap(6), 2)} = US\\$${dpStr(v, 2)}. (Total wages 6 × 36 = 216; 216 ÷ 95 gives the same result.)` });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "When marginal product begins to fall, total product must also begin to fall.", answer: false,
    explanation: "False. Total product keeps rising as long as marginal product is positive; it falls only when MP becomes negative." });

  b.match({ d: 2, skill: "RECALL", stem: "Match each term with its meaning.",
    pairs: [["Short run", "At least one factor is fixed"], ["Long run", "All factors can be varied"], ["Marginal product", "Extra output from one more unit of a factor"], ["Average product", "Total product divided by the number of units of the factor"]],
    extraRight: ["Output per worker rising because of a larger workforce"],
    explanation: "These are the four basic terms of production in the short run." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "In the short run at least one factor is {{blank:a}}, and as more of the variable factor is added the marginal product will eventually {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["fixed"], choices: ["fixed", "variable", "free"] }, { id: "b", accepted: ["fall"], choices: ["fall", "rise", "stay constant"] }],
    explanation: "The short run has a fixed factor; adding variable units to it eventually lowers MP." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the law that says the marginal product of a variable factor eventually falls when it is added to fixed factors.",
    accepted: ["diminishing returns", "law of diminishing returns", "diminishing marginal returns", "law of diminishing marginal returns", "variable proportions"],
    wrong: ["economies of scale"],
    explanation: "The law of diminishing (marginal) returns, also called the law of variable proportions." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "Define the law of diminishing marginal returns.",
    points: ["As more units of a variable factor are added to a fixed quantity of other factors.", "The marginal product of the variable factor will eventually fall.", "Technology (and the quality of the units) is assumed unchanged."],
    modelAnswer: "If successive units of a variable factor are added to a given quantity of fixed factors, with technology unchanged, the marginal product of the variable factor will eventually fall.",
    explanation: "Variable factor added to fixed factors; MP eventually falls; other things equal." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Explain the early stage and the later stage."],
    stem: "Explain why the marginal product of labour in a small workshop may rise at first and then fall as more workers are hired.",
    points: ["At first the fixed machines and space are under-used, so extra workers can share the work.", "Specialisation and teamwork make each extra worker add more than the previous one, so MP rises.", "Eventually the fixed factors become a constraint: workers share the same machines and space.", "Each additional worker therefore adds less to output, so MP falls (diminishing marginal returns)."],
    modelAnswer: "With few workers, the machines and space are under-used and workers can specialise, so each extra worker adds more than the last and MP rises. As more workers are hired the fixed machines and space limit what each can do, so each additional worker adds less to total output and MP falls: diminishing marginal returns.",
    explanation: "Specialisation first, then the fixed-factor constraint." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Link productivity to cost per unit."],
    stem: "Analyse how a rise in labour productivity can lower a firm's cost per unit even if the wage rate is unchanged.",
    points: ["Higher productivity means more output from each worker in the same time.", "Labour cost per unit = wage ÷ output per worker, so it falls when output per worker rises.", "With other costs unchanged, average total cost falls.", "The firm can cut price, raise profit or both."],
    modelAnswer: "If output per worker rises, the same wage is spread over more units, because labour cost per unit equals the wage divided by output per worker. Average total cost therefore falls, other costs being equal, which lets the firm lower its price to win sales or enjoy a larger profit margin.",
    explanation: "Unit labour cost = wage ÷ productivity." });

  {
    const tw = [0, 1, 2, 3, 4, 5, 6];
    const t2 = [0, 8, 22, 42, 58, 68, 72];
    const pt = productivity.table({ workers: tw, tp: t2 });
    const mp4 = t2[4] - t2[3], ap3 = t2[3] / 3;
    chk(mp4, 16); chk(ap3, 14);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Marginal product is the change in total product."],
      stem: `A fictional tailoring shop in Mutare has a fixed number of sewing machines. The table shows its daily output of shirts as it hires more workers (illustrative data).\n\n${table2(tw, t2)}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: mp4, unit: "units", stem: "Calculate the marginal product of the fourth worker.", wrong: [58, 14.5, 20], explanation: "MP = 58 − 42 = 16 shirts." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: ap3, unit: "units", stem: "Calculate the average product when 3 workers are employed.", wrong: [20, 42, 12], explanation: "AP = 42 ÷ 3 = 14 shirts per worker." }),
        P.mcq({ label: "(c)", marks: 1, stem: "With which worker do diminishing marginal returns begin?", options: [["The fourth worker", "Correct: MP falls from 20 for the third to 16 for the fourth."], ["The second worker", "MP rose from 8 to 14 to 20."], ["The sixth worker", "MP was already falling before the sixth worker."], ["The first worker", "The first worker's MP of 8 is the lowest, but returns are increasing after it."]], answer: "A", explanation: "MP: 8, 14, 20, 16, 10, 4. It first falls at the fourth worker." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why the marginal product falls after the third worker.", points: ["The number of sewing machines is fixed (a fixed factor).", "Additional workers must share the same machines and space.", "So each extra worker adds less to total output: diminishing marginal returns."],
          modelAnswer: "The shop has a fixed number of sewing machines and a fixed floor area. After three workers each new worker has to share the machines and space, so each adds less to output than the one before: diminishing marginal returns." }),
      ],
      explanation: "MP of the fourth worker is 16; AP at 3 workers is 14; diminishing returns begin with the fourth worker." });
  }
  {
    const w = 40, o1 = 1200, o2 = 1380;
    const p1 = o1 / w, p2 = o2 / w;
    const g = pctChange(p1, p2);
    const c1 = 10 / p1, c2 = 10 / p2;
    chk(p1, 30); chk(p2, 34.5); chk(g, 15, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Productivity is output per worker.", "Labour cost per unit = daily wage ÷ output per worker."],
      stem: "A fictional clothing factory in Bulawayo employs 40 workers on a fixed set of machines. Before a training programme it made 1,200 shirts a day. After the programme, with the same 40 workers and the same machines, it makes 1,380 shirts a day. Each worker is paid US\\$10 a day.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: p2, dp: 1, unit: "units", stem: "Calculate output per worker after the training programme.", wrong: [30, 1380, 3.45], explanation: "1,380 ÷ 40 = 34.5 shirts per worker." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: g, dp: 1, unit: "%", stem: "Calculate the percentage change in labour productivity.", wrong: [180, 13, 11.5], explanation: "Output per worker rose from 30 to 34.5: (34.5 − 30) ÷ 30 × 100 = 15%." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: c2, dp: 2, stem: "Calculate the labour cost per shirt after the programme, to the nearest cent.", wrong: [0.33, 10, 0.3], explanation: "10 ÷ 34.5 = US\\$0.29." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **two** ways in which higher productivity benefits the factory.", points: ["Lower labour cost per unit (and lower average cost).", "Allows lower prices to win sales, or a higher profit margin.", "Higher output without more workers, so more can be sold."],
          modelAnswer: "Higher productivity lowers labour cost per shirt, from about US\\$0.33 to US\\$0.29, so the factory can cut its price to win customers or keep the difference as extra profit. It also produces more with the same workforce, so it can supply more shirts without extra wage costs." }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest **one** way, other than training, in which the factory could raise productivity and explain how it works.", points: ["A valid method (better machines, better layout, incentives, better health).", "Explains the link to output per worker.", "Links to lower cost or higher output per unit of input."],
          modelAnswer: "The factory could buy faster sewing machines. Each worker can then finish more shirts in a day, so output per worker rises and labour cost per shirt falls." }),
      ],
      explanation: "Productivity rises from 30 to 34.5 shirts per worker (+15%); labour cost per shirt falls from US\\$0.33 to US\\$0.29." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the revenue each extra worker brings as well as the output."],
    stem: "Assess whether a firm should keep hiring workers until the marginal product of labour reaches zero.",
    points: ["The marginal product of labour reaches zero where total product is at its maximum.", "Each worker has to be paid a wage, so a worker is worth hiring only if the extra revenue exceeds the wage.", "Diminishing returns mean MP falls as workers are added, so the extra revenue falls too.", "Hiring beyond the point where extra revenue equals the wage lowers profit.", "If a worker's marginal product is zero, the worker adds cost but no output.", "In the long run the firm can add machines, which shifts MP upward and changes the best number of workers.", "Social aims, such as employment, may justify more workers than the profit-maximising number.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Total product is greatest where marginal product is zero, but a profit-seeking firm should stop hiring earlier. Each worker costs a wage, so a worker is worth hiring only while the extra revenue from the extra output is at least the wage. Because diminishing returns lower the marginal product as workers are added, the extra revenue falls, and beyond the point where it equals the wage each additional worker lowers profit. A worker with zero marginal product adds only cost. The best number of workers can change in the long run if the firm adds machines, since this raises the marginal product of labour, and a firm with social aims, such as a state-owned company, may employ more workers than the profit-maximising number. Overall, a firm that wants maximum profit should stop hiring well before MP reaches zero.",
    explanation: "Compare the revenue from the marginal product with the wage; stopping at zero MP ignores labour cost." });

  b.card("DEFINITION", "Define the **short run** in economics.", "The period in which at least one factor of production is fixed, so output can be changed only by varying the other factors.");
  b.card("DEFINITION", "State the **law of diminishing marginal returns**.", "If successive units of a variable factor are added to fixed factors (technology unchanged), the marginal product of the variable factor will eventually fall.");
  b.card("FORMULA", "How do you calculate **marginal product**?", "Change in total product ÷ change in the number of workers (extra output from one more worker).");
  b.card("FORMULA", "How do you calculate **average product**?", "Total product ÷ number of workers.");
  b.card("CONCEPT", "When MP is **above** AP, what happens to AP?", "AP rises; MP below AP lowers AP; MP cuts AP at the maximum of AP.");
  b.card("CONCEPT", "Why do returns diminish in the short run?", "Extra workers share fixed machines and space, so each adds less to output than the one before.");
  b.card("DEFINITION", "What is **productivity**?", "Output per unit of a factor of production in a given time, for example output per worker per day.");
  b.card("FACT", "How does higher productivity affect labour cost per unit?", "It lowers it: labour cost per unit = wage ÷ output per worker.");
  b.card("CONCEPT", "Diminishing returns versus decreasing returns to scale?", "Diminishing returns: one variable factor added to fixed factors (short run). Decreasing returns to scale: all factors increased together (long run).");
});

function table2(tw, tp) {
  return productivity.table({ workers: tw, tp }).md;
}
