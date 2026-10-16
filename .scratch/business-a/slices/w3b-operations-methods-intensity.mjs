// W3b: operations.methods-intensity
import { concept, P, chk, money, table, costing, r2, ZIM, CAM } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.methods-intensity", { file: "operations/methods-intensity", keyPrefix: "operations.methods-intensity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A tailor makes a single suit to a customer's measurements. This is",
    ok: ["job production", "Correct: a one-off product made to order."],
    bad: [["batch production", "Batch production makes groups of identical products."], ["flow production", "Flow production is continuous output of identical products."], ["mass customisation", "Mass customisation allows choices on mass-produced items."]],
    explanation: "A single product made to an individual order is job production.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A soft-drink bottler fills identical bottles continuously along a line. This is",
    ok: ["flow production", "Correct: continuous production of identical items."],
    bad: [["job production", "Job production is one-off work to order."], ["batch production", "Batch production stops between groups of items."], ["labour-intensive production", "A bottling line is capital-intensive, not labour-intensive."]],
    explanation: "Continuous production of a standard product on a line is flow production.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a disadvantage of **flow production**?",
    ok: ["It is inflexible, and a breakdown can stop the line", "Correct: the line is built for one product and depends on every stage."],
    bad: [["The cost per unit is very high at large outputs of goods", "Flow production gives the lowest cost per unit at large output."], ["Each product is made differently for each customer", "That describes job production."], ["It needs no capital investment before production begins", "Flow lines need heavy investment."]],
    explanation: "Flow production has a low unit cost but needs heavy investment and is inflexible.",
  });
  mc(b, {
    d: 2, applies: CAM, skill: "UNDERSTANDING",
    stem: "What is the main feature of **mass customisation**?",
    ok: ["Large volumes made while letting each customer choose features", "Correct: mass output with individual choice."],
    bad: [["One product made to one customer's order with no repetition", "That describes job production."], ["Standard products made in separate groups with equipment changes between them", "That describes batch production."], ["Hand-made goods sold at high prices to a few customers", "That describes craft or job production."]],
    explanation: "Mass customisation combines flow-type volumes with options chosen by the customer.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Mutare bakes 300 loaves, then 200 sweet buns, then 300 loaves again, cleaning the machines between runs. This is",
    ok: ["batch production", "Correct: groups of identical items made in turn."],
    bad: [["job production", "The goods are not one-off items made to order."], ["flow production", "The production line is stopped and changed between items."], ["mass customisation", "Customers do not choose individual features."]],
    hints: ["The machines are changed between groups of items."],
    explanation: "Making products in groups with changes between them is batch production.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which situation **best justifies** a labour-intensive method?",
    ok: ["Small, varied orders where customers want a personal touch", "Correct: flexible, skilled work suits small and varied output."],
    bad: [["Very large, steady output of one identical product line", "That suits capital-intensive production."], ["Scarce, expensive labour and plentiful money for machines", "That would favour machines."], ["A need for exactly uniform quality in every single item", "Machines give more uniform quality than people."]],
    hints: ["Think about the size and variety of output."],
    explanation: "Labour-intensive methods suit small, varied or personal work where flexibility matters.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a typical problem when a firm changes from batch to flow production?",
    ok: ["Heavy investment and retraining, with output disrupted", "Correct: change needs money, time and new skills."],
    bad: [["A fall in the cost of each unit as soon as the change begins", "Savings come later, after the change is complete."], ["A rise in the firm's flexibility to make different products", "Flow production is less flexible than batch."], ["No need to change the layout of the factory at all", "The layout normally has to be rebuilt."]],
    hints: ["Think about what has to be bought and learned."],
    explanation: "Changing method needs equipment, layout changes and retraining, and may disrupt output.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a small firm should replace workers with machines?",
    ok: ["It depends on whether output is high enough to cover the fixed cost", "Correct: the answer rests on volume and cost."],
    bad: [["Yes, because machines always cost less to run than workers", "At low output the fixed cost of machines makes unit cost higher."], ["No, because workers are always more productive than machines", "Machines can raise productivity at high output."], ["Yes, because a machine never breaks down and needs no repair", "Machines do break down and need maintenance."]],
    hints: ["Think about when a high fixed cost is worth paying."],
    explanation: "A strong judgement names the condition: output must be large enough to spread the fixed cost.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Job production usually has a higher cost per unit than flow production.",
    answer: true,
    explanation: "True. Job production uses skilled labour and has no economies of scale, whereas flow production spreads high fixed costs over a very large output.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A capital-intensive method always has a lower cost per unit than a labour-intensive method.",
    answer: false,
    explanation: "False. At low output the large fixed cost of capital-intensive production makes the unit cost higher. It is cheaper only above a certain level of output.",
  });

  b.match({
    d: 2, applies: CAM, skill: "UNDERSTANDING",
    stem: "Match each method of production to the example.",
    pairs: [["Job", "A carpenter builds a wardrobe to a customer's design"], ["Batch", "A bakery bakes 300 identical rolls, then changes to a different bread"], ["Flow", "A factory makes identical bottles non-stop on a moving line"], ["Mass customisation", "A shop prints each customer's own design on a shirt using a standard system"]],
    explanation: "Each example matches one method of production.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}}-intensive method uses a high proportion of machines and has high fixed costs, whereas a {{blank:b}}-intensive method uses many workers and has lower fixed costs.",
    blanks: [
      { id: "a", accepted: ["capital"], choices: ["capital", "labour", "batch"] },
      { id: "b", accepted: ["labour"], choices: ["capital", "labour", "flow"] },
    ],
    explanation: "Capital-intensive means machine-heavy; labour-intensive means worker-heavy.",
  });


  {
    const fixed = 2400, vc = 0.65, q = 7500;
    const tc = costing.totalCost(fixed, vc, q);
    chk(tc, 7275);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional labour-intensive pottery in Masvingo has fixed costs of ${money(fixed)} a month and variable costs of ${money(vc)} a pot. Calculate its total cost of making ${q.toLocaleString("en-GB")} pots in a month.`,
      kind: "money", value: tc, wrong: [fixed + vc, vc * q],
      explanation: "Total cost = 2,400 + 0.65 × 7,500 = 2,400 + 4,875 = US\\$7,275. Leaving out the fixed cost gives US\\$4,875.",
    });
  }
  {
    const fixed = 9000, vc = 0.15, q = 12000;
    const u = costing.totalCost(fixed, vc, q) / q;
    chk(u, 0.9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional capital-intensive plant has fixed costs of ${money(fixed)} a month and variable costs of ${money(vc)} a unit. Calculate its cost per unit when it makes ${q.toLocaleString("en-GB")} units in a month.`,
      kind: "money", value: u, wrong: [vc, fixed / q],
      hints: ["Find the total cost first, then divide by the units."],
      explanation: "Total cost = 9,000 + 0.15 × 12,000 = 10,800. Cost per unit = 10,800 ÷ 12,000 = US\\$0.90. The fixed cost per unit alone is US\\$0.75.",
    });
  }
  {
    const aF = 2400, aV = 0.5, bF = 7200, bV = 0.2;
    const q = (bF - aF) / (aV - bV);
    chk(q, 16000, 1e-6);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A fictional printer can use Method A (fixed costs ${money(aF)} a month, variable cost ${money(aV)} a page) or Method B (fixed costs ${money(bF)} a month, variable cost ${money(bV)} a page). At what monthly output of pages do the two methods have the same total cost?`,
      kind: "units", value: q, wrong: [bF / bV, aF / aV],
      hints: ["Set the two total-cost expressions equal and solve for the number of pages."],
      workedSolution: "1. Total cost of A = 2,400 + 0.50q. Total cost of B = 7,200 + 0.20q.\n2. Equal when 2,400 + 0.50q = 7,200 + 0.20q.\n3. 0.30q = 4,800, so q = 16,000 pages.",
      explanation: "The methods cost the same at 16,000 pages. Below that output Method A is cheaper; above it Method B is cheaper.",
    });
  }
  {
    const lab = 18000, total = 90000;
    const sh = (lab / total) * 100;
    chk(sh, 20, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional bottling plant spends ${money(lab)} a month on labour out of total costs of ${money(total)}. What percentage of its total costs is labour? Give your answer to one decimal place.`,
      kind: "pct", value: sh, wrong: [(lab / (total - lab)) * 100, (total / lab) * 100],
      explanation: "Labour share = 18,000 ÷ 90,000 × 100 = 20.0%. A low labour share suggests a capital-intensive method.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** advantage of batch production over job production.",
    points: ["Products can be made in larger numbers, so there are some economies of scale", "The cost per unit is lower than for one-off products"],
    modelAnswer: "In batch production identical items are made in groups, so there are some economies of scale. The cost per unit is therefore lower than for one-off job production.",
    explanation: "One mark for the advantage, one for its result on unit cost.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Thandeka owns a fictional clothing workshop in Bulawayo that makes school uniforms in batches. Explain **two** problems of batch production for her workshop.",
    points: ["Machines are idle while they are changed between batches", "Application: when she switches from shirts to skirts, sewing machines are reset and no uniforms are made", "Stock builds up between stages", "Application: batches of cut cloth wait for sewing, tying up money and space"],
    modelAnswer: "Machines stand idle while they are reset between batches, so when Thandeka switches from shirts to skirts no uniforms are made. Stock also builds up between stages, for example cut cloth waiting for sewing, which ties up money and space.",
    hints: ["Think about the time between batches and about stock."],
    explanation: "Two problems, each developed with the workshop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a rise in wages might make a firm change from a labour-intensive to a capital-intensive method.",
    points: ["Higher wages raise the variable cost of labour-intensive production", "Machines have a high fixed cost but low variable cost, so unit cost may become lower", "The change becomes worthwhile when output is high enough to spread the fixed cost", "Lower unit cost lets the firm cut prices or raise profit"],
    modelAnswer: "Higher wages raise the variable cost of a labour-intensive method. Machines have a high fixed cost but a low variable cost, so if output is high enough to spread the fixed cost, the cost per unit becomes lower, and the firm can cut prices or make more profit.",
    hints: ["Think about fixed and variable costs under each method."],
    explanation: "A chain from wages to the relative cost of the methods.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional bakery wants to move from batch to flow production for its sliced bread. Assess whether this is a good decision.",
    points: ["Flow production lowers the cost per loaf at high output", "Consistent quality and fast output suit a standard product such as sliced bread", "The investment in the line is large and the line is inflexible", "A fall in demand or a breakdown would leave the firm with high fixed costs or stopped output", "Judgement with a condition, for example: yes, if demand is large and steady enough to repay the line"],
    modelAnswer: "Flow production lowers the cost per loaf at high output and gives consistent quality, which suits sliced bread. But the line is expensive and inflexible, and a fall in demand or a breakdown would leave the bakery with high fixed costs or stopped output. It is a good decision only if demand is large and steady enough to repay the investment.",
    hints: ["Weigh lower unit cost against the cost and inflexibility of the line."],
    explanation: "Both sides, then a judgement with a condition.",
  });

  {
    const pF = 1200, pV = 6.5, qF = 7200, qV = 3.5, out = 2500;
    const tcP = costing.totalCost(pF, pV, out), tcQ = costing.totalCost(qF, qV, out);
    chk(tcQ, 15950); chk(tcP, 17450);
    chk((qF - pF) / (pV - qV), 2000, 1e-6);
    const tbl = table(["", "Method P (labour-intensive)", "Method Q (capital-intensive)"], [["Fixed costs a month (US\\$)", pF, qF], ["Variable cost per uniform (US\\$)", "6.50", "3.50"]]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional uniform maker in Gweru is choosing between two methods of production. Expected monthly output is ${out.toLocaleString("en-GB")} uniforms.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total monthly cost of Method Q at an output of 2,500 uniforms.", kind: "money", value: tcQ, calculator: true, wrong: [qV * out, qF + qV], explanation: "7,200 + 3.50 × 2,500 = 7,200 + 8,750 = US\\$15,950. Leaving out the fixed cost gives US\\$8,750." }),
        P.mcq({ label: "(b)", marks: 1, stem: "At an output of 2,500 uniforms, which method has the lower total cost?", options: [["Method Q, at US\\$15,950", "Correct: Method P costs US\\$17,450."], ["Method P, at US\\$17,450", "Method P costs more at this output."], ["They cost the same", "The costs differ at 2,500 uniforms; they are equal at 2,000."], ["It cannot be calculated", "Total cost = fixed cost + variable cost × output."]], answer: "A", explanation: "Method P: 1,200 + 6.50 × 2,500 = US\\$17,450. Method Q: US\\$15,950." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why a capital-intensive method has a lower cost per unit at high output.", points: ["Capital-intensive methods have high fixed costs but low variable cost per unit", "At high output the fixed cost is spread over many units", "The lower variable cost on each extra unit then outweighs the higher fixed cost"], modelAnswer: "A capital-intensive method has high fixed costs but a low variable cost per uniform. At high output the fixed cost is spread over many units, and the saving on variable cost for each unit outweighs the higher fixed cost.", hints: ["Think about spreading fixed cost over many units."], explanation: "Cost structure, spreading fixed cost, net effect." }),
        P.manual({ label: "(d)", marks: 3, stem: "The owner expects output to fall to 1,800 uniforms a month. Assess whether she should still choose Method Q.", points: ["The methods cost the same at 2,000 uniforms (6,000 ÷ 3 = 2,000)", "At 1,800 uniforms Method P costs US\\$12,900 and Q US\\$13,500, so P is cheaper", "Judgement with a condition, for example: choose P unless output is likely to rise above 2,000"], modelAnswer: "The methods cost the same at 2,000 uniforms. At 1,800, Method P costs US\\$12,900 and Method Q US\\$13,500, so P is cheaper. She should choose P unless output is likely to rise above 2,000.", hints: ["Find the output at which the two methods cost the same."], explanation: "Break-even between methods at 2,000; below it P is cheaper." }),
      ],
      hints: ["Total cost = fixed cost + variable cost per uniform × output."],
      explanation: "Q costs US\\$15,950 and P costs US\\$17,450 at 2,500 uniforms; they are equal at 2,000, so Q is cheaper only above 2,000.",
    });
    chk(costing.totalCost(pF, pV, 1800), 12900); chk(costing.totalCost(qF, qV, 1800), 13500);
  }
  {
    const price = 5, vc = 3.2, vol = 10000, cp = 7.5, cv = 5.1, cvol = 6500, fix = 1800;
    const c0 = (price - vc) * vol, c1 = (cp - cv) * cvol, c1net = c1 - fix;
    chk(cp - cv, 2.4); chk(c0, 18000); chk(c1, 15600); chk(c1net, 13800);
    b.struct({
      d: 5, applies: CAM, skill: "EVALUATION", examStyle: true,
      stem: `Mwenje Prints is a fictional T-shirt business in Harare. It makes plain shirts on a flow line, selling ${vol.toLocaleString("en-GB")} a month at ${money(price)} each with a variable cost of ${money(vc)}. The owner is considering mass customisation, so that customers could order shirts online with their own print designs. Each customised shirt would sell for ${money(cp)}, with a variable cost of ${money(cv)}, and the owner expects to sell ${cvol.toLocaleString("en-GB")} a month. The computer system and printing machine would add ${money(fix)} to monthly fixed costs. Some staff fear that the change will be hard to learn.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the contribution on each customised shirt.", kind: "money", value: cp - cv, wrong: [price - vc, cv], explanation: "7.50 − 5.10 = US\\$2.40. The plain shirt's contribution is 5.00 − 3.20 = US\\$1.80." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** problem the business may face in changing from flow production to mass customisation.", points: ["Staff must learn new systems and skills, so output may fall during the change", "Application: staff already fear the change, so morale and productivity could drop", "The variable cost per shirt is higher because each design must be set up", "Unit costs rise and the contribution of each shirt may not cover the extra fixed cost"], modelAnswer: "Staff must learn new systems, and since some already fear the change, morale and output may fall at first. Each customised shirt also costs more to make because every design must be set up, so the extra contribution may not cover the new fixed cost of US\\$1,800 a month.", hints: ["Use the staff's fears and the higher cost per shirt."], explanation: "A chain from the problem in the case to the effect on cost or output." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mwenje Prints should move to mass customisation.", points: ["Customised shirts earn more per shirt (US\\$2.40 against US\\$1.80)", "Plain shirts earn 10,000 × 1.80 = US\\$18,000 a month", "Customised shirts earn 6,500 × 2.40 = US\\$15,600, or US\\$13,800 after the extra fixed cost", "On the expected figures profit falls by US\\$4,200 a month", "Customers who want their own design may be new, and demand could exceed 6,500", "The change disrupts staff and needs investment, but gives a distinctive offer", ["Judgement with a reason, for example: do not change unless sales are likely to be much higher than 6,500", 1], ["Condition or time-frame, for example: test with a small online range before closing the plain-shirt line", 1]], levels: [[1, 1, 3, "General points on mass customisation with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the contribution figures, with a justified judgement and a condition."]], modelAnswer: "Each customised shirt earns US\\$2.40, more than the US\\$1.80 on a plain shirt, but the owner expects to sell fewer, so total contribution is 6,500 × 2.40 = US\\$15,600 against US\\$18,000 now. After the extra fixed cost of US\\$1,800 the change would leave the business US\\$4,200 a month worse off. Customised shirts could, however, attract new customers and sales might exceed 6,500, and the change would give a more distinctive product. On the figures, the owner should not replace the plain-shirt line. She should test customised orders on a small scale first and move further only if demand is clearly higher than 6,500 a month.", hints: ["Compare total contribution before and after the extra fixed cost."], explanation: "Plain shirts earn US\\$18,000; customised shirts US\\$15,600 less US\\$1,800 fixed cost = US\\$13,800. A judgement should rest on the likely sales." }),
      ],
      hints: ["Contribution per shirt = selling price − variable cost."],
      explanation: "The customised shirt earns US\\$2.40 against US\\$1.80, but total contribution falls from US\\$18,000 to US\\$13,800 after the extra fixed cost on the expected sales.",
    });
  }

  b.card("DEFINITION", "Job production", "Making a single one-off product to a customer's order, such as a wedding dress or a bridge.");
  b.card("DEFINITION", "Batch production", "Making a group of identical products together before the equipment is changed for the next batch.");
  b.card("DEFINITION", "Flow production", "Continuous production of identical products on a line, with the product moving from stage to stage without a break.");
  b.card("DEFINITION", "Mass customisation", "Mass output on a flexible system in which each customer chooses some features.", undefined, { applies: CAM });
  b.card("CONCEPT", "Capital-intensive and labour-intensive", "Capital-intensive: many machines, high fixed cost, low variable cost. Labour-intensive: many workers, lower fixed cost, higher variable cost per unit.");
  b.card("FACT", "When capital-intensive is cheaper", "Only above a certain output, where the fixed cost is spread widely enough that the lower variable cost wins.");
  b.card("FACT", "Problems of changing production method", "Investment, new layout, retraining, disruption of output, worker resistance and loss of flexibility.");
  b.card("DEFINITION", "Kaizen", "Continuous improvement through small changes, often suggested by workers in small groups, to cut waste and improve quality.", undefined, { applies: ZIM });
  b.card("FORMULA", "Total cost and unit cost", "Total cost = fixed cost + variable cost per unit × output. Unit cost = total cost ÷ output.");
});
