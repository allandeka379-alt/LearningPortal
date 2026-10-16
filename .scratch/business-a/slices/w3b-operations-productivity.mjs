// W3b: operations.productivity
import { concept, P, chk, money, table, r2, operations, pctChange, ZIM } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.productivity", { file: "operations/productivity", keyPrefix: "operations.productivity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Labour productivity is best measured as",
    ok: ["output divided by the number of employees", "Correct: output for each worker."],
    bad: [["output multiplied by the number of employees", "Multiplying does not give output per worker."], ["wages divided by the number of employees", "That gives average pay, not productivity."], ["profit divided by the number of employees", "That is profit per employee, a different measure."]],
    explanation: "Labour productivity = output ÷ number of employees (or hours).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bakery makes bread at a very low cost per loaf, but customers no longer want the type of bread it makes. The bakery is",
    ok: ["efficient but not effective", "Correct: costs are low but it does not meet customers' needs."],
    bad: [["effective but not efficient", "It is not meeting customers' needs, so it is not effective."], ["both efficient and effective", "It fails the test of effectiveness."], ["neither efficient nor effective", "Its low cost per loaf shows efficiency."]],
    explanation: "Efficiency is about low cost and waste; effectiveness is about meeting customers' needs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a way of raising labour productivity?",
    ok: ["Training workers to use machines correctly", "Correct: skilled workers produce more output in the same time."],
    bad: [["Hiring more workers to make the same output", "More workers for the same output lowers productivity."], ["Using more raw materials to make the same number of units", "That wastes materials and does not raise output per worker."], ["Reducing the machines available to each worker", "Fewer machines normally reduces output per worker."]],
    explanation: "Training, motivation and better equipment raise output per worker.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional factory raises output by 10% while its labour cost rises by 6%. What happens to the unit labour cost?",
    ok: ["It falls, as output rises by more than labour cost", "Correct: the same labour cost is spread over more units."],
    bad: [["It rises, because the labour cost itself has risen", "Output has risen by more, so the cost per unit falls."], ["It stays the same, because both figures have risen", "They rose by different percentages."], ["It cannot be known without the selling price", "Unit labour cost does not depend on the selling price."]],
    hints: ["Compare the percentage rise in output with the percentage rise in labour cost."],
    explanation: "Unit labour cost = labour cost ÷ output. If output grows faster than labour cost, the unit labour cost falls.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional firm cuts its use of electricity by installing solar panels. Which is a **likely short-term cost**?",
    ok: ["The cost of buying and installing the panels", "Correct: sustainable investment usually has an upfront cost."],
    bad: [["A rise in the amount of waste produced", "Using solar power is not linked to more waste."], ["Higher electricity bills in the first year", "The bills should fall, not rise."], ["A fall in the firm's reputation among customers", "Customers are more likely to approve."]],
    hints: ["Think about what the firm must pay before the savings begin."],
    explanation: "Sustainable investments often need money upfront, though they may reduce costs later.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether to buy new machines to raise productivity?",
    ok: ["It depends on whether the extra output sells and the cost is repaid", "Correct: it names the conditions for success."],
    bad: [["Yes, because new machines always raise the profit of a firm", "If the extra output cannot be sold, profit may fall."], ["No, because machines always reduce the need for workers", "That may be true but is not a reason to reject all machines."], ["Yes, because higher productivity makes the price irrelevant", "Price and cost still matter."]],
    hints: ["Think about demand and about repaying the cost."],
    explanation: "A strong judgement is conditional on demand for the extra output and on repaying the investment.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm that doubles its workforce and doubles its output has increased its labour productivity.",
    answer: false,
    explanation: "False. Output per worker is unchanged, so labour productivity has not risen.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Unit labour cost is calculated by dividing total labour cost by total output.",
    answer: true,
    explanation: "True. Unit labour cost = labour cost ÷ output.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Efficiency", "Getting the most output from inputs with little waste"], ["Effectiveness", "Meeting objectives and customers' needs"], ["Productivity", "Output produced for each unit of input"], ["Sustainability", "Operating without damaging the environment for the future"]],
    explanation: "Each term has a distinct meaning in operations.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Capital productivity is output divided by {{blank:a}}, and unit labour cost is labour cost divided by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["capital employed"], choices: ["capital employed", "employees", "revenue"] },
      { id: "b", accepted: ["output"], choices: ["output", "employees", "profit"] },
    ],
    explanation: "Capital productivity uses capital employed; unit labour cost uses output.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which a business can increase its labour productivity.",
    accepted: ["training", "train workers", "better equipment", "new machinery", "motivation", "motivate workers", "better layout", "improved technology", "better supervision", "improve technology", "value analysis", "reduce waste"],
    explanation: "Training, motivation, equipment, layout and technology all raise output per worker.",
  });

  {
    const out = 7200, emp = 24;
    const lp = operations.labourProductivity(out, emp);
    chk(lp, 300);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional furniture workshop made ${out.toLocaleString("en-GB")} chairs in a year with ${emp} employees. Calculate its labour productivity in chairs per employee.`,
      kind: "plain", unit: "chairs per employee", value: lp, wrong: [emp / out, out * emp],
      explanation: "Labour productivity = 7,200 ÷ 24 = 300 chairs per employee.",
    });
  }
  {
    const out = 5600, hours = 800;
    const lp = out / hours;
    chk(lp, 7);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional sewing team made ${out.toLocaleString("en-GB")} garments in ${hours} working hours. Calculate its labour productivity in garments per hour.`,
      kind: "plain", unit: "garments per hour", value: lp, wrong: [hours / out, out - hours],
      explanation: "Output per hour = 5,600 ÷ 800 = 7 garments per hour.",
    });
  }
  {
    const out = 45000, cap = 250000;
    const cp = out / cap;
    chk(cp, 0.18);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional brick-maker produced ${out.toLocaleString("en-GB")} bricks with capital employed of ${money(cap)}. Calculate its capital productivity (bricks for each US\\$1 of capital employed) to two decimal places.`,
      kind: "index", value: cp, wrong: [cap / out, out / 1000],
      hints: ["Divide output by the capital employed."],
      explanation: "Capital productivity = 45,000 ÷ 250,000 = 0.18 bricks for each US\\$1. Inverting the fraction gives 5.56.",
    });
  }
  {
    const lab = 36000, out = 4800;
    const u = operations.unitLabourCost(lab, out);
    chk(u, 7.5);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional guitar workshop paid ${money(lab)} in labour costs in a year and made ${out.toLocaleString("en-GB")} guitars. Calculate the unit labour cost.`,
      kind: "money", value: u, wrong: [out / lab, lab - out],
      explanation: "Unit labour cost = 36,000 ÷ 4,800 = US\\$7.50 a guitar.",
    });
  }
  {
    const a = 40, c = 46;
    const g = pctChange(a, c);
    chk(g, 15, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `Labour productivity at a fictional bakery rose from ${a} loaves per worker per hour to ${c}. Calculate the percentage increase in labour productivity to one decimal place.`,
      kind: "pct", value: g, wrong: [pctChange(c, a), (c / a) * 100],
      explanation: "Increase = 46 − 40 = 6. 6 ÷ 40 × 100 = 15.0%. Dividing by the later figure gives 13.0%.",
    });
  }
  {
    const outG = 0.1, labG = 0.06;
    const ch = ((1 + labG) / (1 + outG) - 1) * 100;
    chk(ch, -3.6364, 1e-3);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A fictional factory raised its output by 10% and its total labour cost by 6%. Calculate the percentage change in unit labour cost, to one decimal place. Give a fall as a negative number.",
      kind: "pct", value: ch, wrong: [6 - 10, 6 / 10],
      hints: ["Take a starting labour cost of 100 and output of 100, find the new figures, then the new cost per unit."],
      workedSolution: "1. Start with labour cost 100 and output 100, so unit labour cost = 1.00.\n2. New labour cost = 106 and new output = 110.\n3. New unit labour cost = 106 ÷ 110 = 0.9636.\n4. Change = (0.9636 − 1.00) ÷ 1.00 × 100 = −3.6%.",
      explanation: "Unit labour cost falls by 3.6%. Subtracting the two percentages (−4.0%) is only an approximation and is not exact.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why higher labour productivity may help a business to be more competitive.",
    points: ["More output per worker lowers the labour cost of each unit", "The business can then charge a lower price or make a higher profit than its rivals"],
    modelAnswer: "When each worker produces more, the labour cost of each unit falls. The business can then charge lower prices or earn more profit than rivals whose productivity is lower.",
    explanation: "One mark for lower unit cost and one for the effect on price or profit.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Rudo owns a fictional bakery in Gweru. Explain **two** ways in which she could increase the productivity of her bakers.",
    points: ["Training in better methods of mixing and shaping dough", "Application: skilled bakers produce more loaves in the same time with fewer mistakes", "Buying a faster dough mixer or oven", "Application: the machine reduces the time spent mixing by hand, so each baker makes more loaves"],
    modelAnswer: "Rudo could train the bakers in better ways of mixing and shaping dough, so they make more loaves in the same time with fewer mistakes. She could also buy a faster dough mixer, which saves the time spent mixing by hand so each baker produces more loaves.",
    hints: ["Think about people and about equipment."],
    explanation: "Two methods, each developed with the bakery.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a rise in labour productivity may not lower a firm's unit labour cost.",
    points: ["Unit labour cost depends on pay as well as productivity", "If wages rise by more than output per worker, labour cost per unit rises", "Extra pay for overtime or bonuses may be needed to achieve the higher output", "Therefore the saving from higher productivity can be cancelled out"],
    modelAnswer: "Unit labour cost depends on pay as well as productivity. If wages rise by more than output per worker, for example because bonuses or overtime pay are needed to reach the higher output, the labour cost of each unit rises and the saving is lost.",
    hints: ["Remember that unit labour cost = labour cost ÷ output."],
    explanation: "A chain from pay increases to unit labour cost.",
  });

  {
    const x = { out: 9600, emp: 16, lab: 17600 }, y = { out: 7500, emp: 10, lab: 14000 };
    const ulcY = y.lab / y.out;
    chk(ulcY, 1.8667, 1e-3);
    chk(y.out / y.emp, 750); chk(x.out / x.emp, 600);
    const tbl = table(["", "Bakery X", "Bakery Y"], [["Loaves made in a month", x.out, y.out], ["Employees", x.emp, y.emp], ["Monthly labour cost (US\\$)", x.lab, y.lab]]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `Two fictional bakeries in Harare, X and Y, sell the same type of bread. Their figures for one month are shown.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the unit labour cost of Bakery Y, to the nearest cent.", kind: "money", value: ulcY, calculator: true, wrong: [y.out / y.lab, x.lab / x.out], explanation: "14,000 ÷ 7,500 = US\\$1.87 (1.8667). Bakery X's figure is 17,600 ÷ 9,600 = US\\$1.83." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which bakery has the higher labour productivity?", options: [["Bakery Y, with 750 loaves per employee", "Correct: 7,500 ÷ 10 = 750 compared with 600."], ["Bakery X, with 600 loaves per employee", "Bakery X makes 9,600 ÷ 16 = 600 per employee, fewer than Y."], ["Bakery X, because it makes more loaves", "Total output is not productivity."], ["They are equal", "The figures differ."]], answer: "A", explanation: "Y makes 750 loaves per employee and X 600." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why Bakery Y has the higher unit labour cost although its labour productivity is higher.", points: ["Y pays more per employee: 14,000 ÷ 10 = US\\$1,400 compared with 17,600 ÷ 16 = US\\$1,100", "Unit labour cost depends on pay as well as productivity", "Y's higher pay outweighs its higher output per worker"], modelAnswer: "Bakery Y pays US\\$1,400 per employee, against US\\$1,100 at Bakery X. Unit labour cost depends on pay as well as output per worker, and Y's higher pay outweighs its higher productivity, so its labour cost per loaf is higher.", hints: ["Work out the labour cost per employee in each bakery."], explanation: "Pay per employee, the link to unit cost, and the comparison." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether Bakery Y should reduce its pay to lower its unit labour cost.", points: ["Lower pay would cut the labour cost of each loaf", "It may reduce the motivation of workers and cause them to leave, which could lower productivity", "Judgement with a condition, for example: no, if the higher pay is the reason for the higher productivity"], modelAnswer: "Lower pay would cut the labour cost of each loaf. But it could reduce motivation and cause skilled workers to leave, lowering the productivity that Y has achieved. Y should not cut pay if the higher pay is what keeps its output per worker high.", hints: ["Think about how pay affects workers' output."], explanation: "A benefit, a risk and a conditional judgement." }),
      ],
      hints: ["Unit labour cost is labour cost divided by output."],
      explanation: "Y has higher productivity (750 against 600) but a higher unit labour cost (US\\$1.87 against US\\$1.83) because it pays more per worker.",
    });
  }
  {
    const o0 = 12000, o1 = 15000, emp = 25;
    const p0 = o0 / emp, p1 = o1 / emp;
    chk(p0, 480); chk(p1, 600);
    const g = pctChange(p0, p1);
    chk(g, 25, 1e-9);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Kwekwe Fabrication is a fictional metal workshop that employs ${emp} people and makes ${o0.toLocaleString("en-GB")} brackets a month. The owner can buy energy-efficient machines costing ${money(40000)} which are expected to raise output to ${o1.toLocaleString("en-GB")} brackets a month with the same workforce and to cut electricity use by a third. Monthly electricity costs are now ${money(1800)}. The owner is worried that the extra brackets may not all be sold, because a rival has recently started selling at lower prices, and that workers may fear that machines will replace them.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage increase in labour productivity expected from the new machines, to one decimal place.", kind: "pct", value: g, wrong: [pctChange(o1, o0), 25 / 12000], explanation: "Productivity now = 12,000 ÷ 25 = 480; expected = 15,000 ÷ 25 = 600. Increase = 120 ÷ 480 × 100 = 25.0%." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** way in which the new machines could improve the sustainability of the workshop.", points: ["The machines use a third less electricity", "Application: monthly electricity use falls from US\\$1,800 to US\\$1,200, a saving of US\\$600", "Less energy use means lower pollution from power generation", "Lower costs and a greener image could help sales to environmentally aware customers"], modelAnswer: "The machines cut electricity use by a third, so the monthly bill falls from US\\$1,800 to US\\$1,200, a saving of US\\$600. Using less energy means less pollution from generating power, and the lower costs and greener image may attract customers who care about the environment.", hints: ["Use the one-third saving on the electricity bill."], explanation: "A chain from energy saving to cost and image." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Kwekwe Fabrication should buy the new machines.", points: ["Output per worker rises by 25%, from 480 to 600 brackets", "Electricity cost falls by US\\$600 a month", "The machines cost US\\$40,000, so the payback from savings alone is long (about 67 months)", "The extra brackets must be sold, but a rival is selling at lower prices", "Workers may fear for their jobs, harming morale unless they are reassured and trained", "The machines could allow lower prices and better competitiveness", ["Judgement with a reason, for example: the cost is only justified if sales rise to use the extra output", 1], ["Condition or time-frame, for example: buy in stages or only after confirmed orders", 1]], levels: [[1, 1, 3, "General points on productivity with little use of the case."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the figures, with a justified judgement and a condition."]], modelAnswer: "The machines raise output per worker by 25% and save US\\$600 a month in electricity, but they cost US\\$40,000, so the electricity saving alone would take about 67 months to repay. The investment is only worthwhile if the extra 3,000 brackets a month can be sold, and a rival is already cutting prices. Workers may also fear for their jobs. The owner should buy only if confirmed orders show that the extra output can be sold, perhaps starting with one machine, and should reassure workers through training.", hints: ["Compare the savings with the cost, and test whether the extra output can be sold."], explanation: "Payback on electricity savings alone: 40,000 ÷ 600 = 66.7 months. The decision depends on sales." }),
      ],
      hints: ["Productivity is output divided by employees."],
      explanation: "Labour productivity rises by 25.0%. The decision depends on whether the extra output can be sold and the US\\$40,000 recovered.",
    });
    chk(40000 / 600, 66.67, 0.01);
  }

  b.card("DEFINITION", "Efficiency", "Producing output at the lowest cost or getting the most output from given inputs, with little waste.");
  b.card("DEFINITION", "Effectiveness", "How well output meets objectives and customers' needs: doing the right thing.");
  b.card("DEFINITION", "Productivity", "Output produced for each unit of input used in a period.");
  b.card("FORMULA", "Labour productivity", "Labour productivity = output ÷ number of employees (or hours worked).");
  b.card("FORMULA", "Capital productivity", "Capital productivity = output ÷ capital employed.");
  b.card("FORMULA", "Unit labour cost", "Unit labour cost = total labour cost ÷ output. It falls if output grows faster than labour cost.");
  b.card("FACT", "Ways to raise productivity", "Training, motivation, better equipment and technology, better layout, better materials, value analysis.");
  b.card("DEFINITION", "Value analysis (value engineering)", "Examining each part of a product and its process to cut cost without lowering quality.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Sustainable operations", "Reducing waste, energy use and pollution. May cost more at first but can lower costs and improve the firm's image.");
});
