// W2b: econ.production.factor-demand (Cambridge only) — demand for factors; labour- vs capital-intensive production.
import { concept, P, table, money, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.production.factor-demand", { file: "production/factor-demand", keyPrefix: "production.factor-demand" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **capital-intensive** production?",
    options: [
      ["Using a high proportion of machinery and equipment relative to labour", "Correct: capital dominates the mix of factors."],
      ["Using a large amount of borrowed money to finance a firm", "Capital here means capital goods, not money."],
      ["Using a high proportion of workers relative to machinery", "That is labour-intensive production."],
      ["Producing goods only in the capital city", "This is about location, not the mix of factors."],
    ],
    answer: "A",
    explanation: "Capital-intensive production uses relatively more capital goods than labour; labour-intensive uses relatively more labour.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is the demand for labour called a **derived demand**?",
    options: [
      ["It depends on the demand for the goods and services that labour produces", "Correct: firms hire workers to meet demand for their products."],
      ["It is set by the government through the minimum wage", "The minimum wage affects the price, not why demand is derived."],
      ["It comes from workers' desire to find jobs and earn a living wage", "That is the supply of labour."],
      ["It is calculated from the number of unemployed people", "Unemployment does not define derived demand."],
    ],
    answer: "A",
    explanation: "Firms want workers only because consumers want the products they make.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Demand for new houses rises sharply in a fictional country. What is the most likely effect on the demand for bricklayers?",
    options: [
      ["It increases, because builders need more workers to build more houses", "Correct: derived demand rises with demand for the product."],
      ["It falls, because house prices rise", "Higher demand for houses raises demand for builders."],
      ["It is unchanged, because wages are fixed", "Demand for labour changes even if wages are fixed."],
      ["It falls, because builders switch from houses to building offices instead", "There is no reason to expect a switch."],
    ],
    answer: "A",
    explanation: "A rise in demand for the product raises the derived demand for the factors that make it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which situation would most encourage a firm to choose **labour-intensive** production?",
    options: [
      ["Wages are low and machines are expensive to buy and maintain", "Correct: labour is relatively cheap."],
      ["The firm produces millions of identical bottles a day", "Large standardised output favours capital-intensive methods."],
      ["Skilled workers are scarce and wages are high", "This favours capital-intensive methods."],
      ["The product must be made to very precise standards", "Precision favours machines."],
    ],
    answer: "A",
    explanation: "Firms choose the lowest-cost combination: cheap labour relative to capital favours labour-intensive methods.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of capital-intensive production?",
    options: [
      ["Low cost per unit when output is large", "Correct: machinery costs are spread over many units."],
      ["Low initial cost of setting up", "Machinery is expensive to buy."],
      ["Many jobs are created", "Fewer workers are needed."],
      ["Easy to change the product quickly", "Machines are often specialised and inflexible."],
    ],
    answer: "A",
    explanation: "At high output the cost of machines is spread over many units, giving low unit costs and consistent quality.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The price of robotic packing machines falls while wages stay the same. What is the most likely effect on a firm's demand for factors?",
    options: [
      ["Demand for capital rises and demand for packing workers falls", "Correct: firms substitute the now relatively cheaper capital for labour."],
      ["Demand for both capital and packing workers falls", "Cheaper capital raises demand for capital."],
      ["Demand for packing workers rises because machines are cheaper", "Machines replace packing workers."],
      ["There is no effect, because wages are unchanged", "Relative prices have changed."],
    ],
    answer: "A",
    hints: ["Which factor is now relatively cheaper?"],
    explanation: "When capital becomes cheaper relative to labour, firms substitute machines for workers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A handmade-furniture firm keeps labour-intensive methods even though a rival uses machines. Which is the best reason?",
    options: [
      ["Its customers want individually designed pieces that machines cannot easily make", "Correct: customised products suit labour-intensive methods."],
      ["Labour-intensive methods always give the lowest cost per unit of furniture", "Not when output is large and standardised."],
      ["Workers never need training in handmade production", "Craft work needs much training."],
      ["Machines cannot be used to make any furniture", "The rival uses machines."],
    ],
    answer: "A",
    hints: ["What kind of product does the firm sell?"],
    explanation: "Customised, high-quality craft products are better suited to skilled labour than to machines.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "In which situation is a switch to capital-intensive production **least** likely to reduce a firm's costs?",
    options: [
      ["Output is small and the machines would be idle most of the day", "Correct: fixed machinery costs are spread over few units."],
      ["Output is large and the product is standardised", "Here capital-intensive methods usually cut unit costs."],
      ["Wages are rising faster than the cost of machinery", "This makes capital relatively cheaper."],
      ["Many workers are absent and quality is poor", "Machines may improve reliability and quality."],
    ],
    answer: "A",
    hints: ["Machinery costs must be spread over the output."],
    explanation: "Machines have high fixed costs; with small output the cost per unit stays high, so the switch may not pay.",
  });
  // Cost comparison (different from the lesson).
  const LI = { w: 40, mach: 120 }, CI = { w: 10, mach: 450 };
  const wage = 15;
  const cLI = LI.w * wage + LI.mach, cCI = CI.w * wage + CI.mach;
  check("cLI", cLI, 720);
  check("cCI", cCI, 600);
  const tC = table(["Method", "Workers", "Daily cost of machinery (US\\$)"], [["Labour-intensive", LI.w, LI.mach], ["Capital-intensive", CI.w, CI.mach]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cLI, daily: true,
    stem: `A fictional firm can make 600 pairs of shoes a day by either method. Each worker is paid US\\$${wage} a day.\n\n${tC}\n\nCalculate the total daily cost of the labour-intensive method.`,
    wrong: [LI.w * wage],
    explanation: `Wages: ${LI.w} × ${wage} = US\\$${LI.w * wage}; plus machinery US\\$${LI.mach} = **${money(cLI)}**. US\\$${LI.w * wage} leaves out the machinery cost.`,
  });
  // Per-unit comparison with its own data.
  const L2 = { w: 36, mach: 110 }, C2 = { w: 9, mach: 470 }, wage2 = 16, out2 = 480;
  const cL2 = L2.w * wage2 + L2.mach, cC2 = C2.w * wage2 + C2.mach;
  check("cL2", cL2, 686);
  check("cC2", cC2, 614);
  const tC2 = table(["Method", "Workers", "Daily cost of machinery (US\\$)"], [["Labour-intensive", L2.w, L2.mach], ["Capital-intensive", C2.w, C2.mach]]);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: (cL2 - cC2) / out2, calculator: true,
    stem: `A fictional garment firm can make ${out2} shirts a day by either method. Each worker is paid US\\$${wage2} a day.\n\n${tC2}\n\nCalculate how much lower the cost per shirt is under the capital-intensive method. Give your answer in dollars to the nearest cent.`,
    wrong: [cL2 - cC2, cC2 / out2],
    hints: ["Total cost of each method = wages + machinery.", `Cost per shirt = total cost ÷ ${out2}.`],
    explanation: `1. Labour-intensive: ${L2.w} × ${wage2} + ${L2.mach} = US\\$${cL2} a day → ${cL2} ÷ ${out2} = US\\$${fmt(cL2 / out2, 4)} a shirt.\n2. Capital-intensive: ${C2.w} × ${wage2} + ${C2.mach} = US\\$${cC2} a day → ${cC2} ÷ ${out2} = US\\$${fmt(cC2 / out2, 4)} a shirt.\n3. Difference: ${cL2 - cC2} ÷ ${out2} = **${money((cL2 - cC2) / out2, 2)}** a shirt.\n4. US\\$${cL2 - cC2} is the difference per day, not per shirt.`,
  });
  // Break-even wage with its own data: 50w + 140 = 14w + 572 → w = 12.
  const L3 = { w: 50, mach: 140 }, C3 = { w: 14, mach: 572 };
  const wStar = (C3.mach - L3.mach) / (L3.w - C3.w);
  check("wStar", wStar, 12);
  const tC3 = table(["Method", "Workers", "Daily cost of machinery (US\\$)"], [["Labour-intensive", L3.w, L3.mach], ["Capital-intensive", C3.w, C3.mach]]);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: wStar,
    stem: `A fictional brick maker can produce the same daily output by either method.\n\n${tC3}\n\nAt what daily wage per worker would the two methods cost exactly the same in total?`,
    wrong: [(C3.mach - L3.mach) / L3.w, C3.mach / C3.w],
    hints: ["Write total cost as workers × wage + machinery for each method.", "Set the two totals equal and solve for the wage."],
    explanation: `1. Labour-intensive total: ${L3.w}w + ${L3.mach}. Capital-intensive total: ${C3.w}w + ${C3.mach}.\n2. Set equal: ${L3.w}w + ${L3.mach} = ${C3.w}w + ${C3.mach}, so ${L3.w - C3.w}w = ${C3.mach - L3.mach}.\n3. w = ${C3.mach - L3.mach} ÷ ${L3.w - C3.w} = **${money(wStar)}** a day.\n4. Below this wage the labour-intensive method is cheaper; above it the capital-intensive method is cheaper.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Labour-intensive production usually creates more jobs than capital-intensive production for the same output.",
    answer: true,
    explanation: "True. By definition it uses a higher proportion of labour.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A rise in the productivity of workers tends to reduce firms' demand for labour at any given wage.",
    answer: false,
    explanation: "False. More productive workers are worth more to firms, so at a given wage demand for them tends to rise.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its likely effect on a firm's demand for labour.",
    pairs: ["Demand for the firm's product rises", "The wage rate rises", "Machines become cheaper", "Workers become more productive after training"],
    right: ["Demand for labour rises", "Demand for labour falls"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Higher product demand and productivity raise labour demand; higher wages and cheaper substitute capital reduce it.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "If wages rise while the price of machinery stays the same, labour becomes relatively {{blank:a}}, so firms tend to switch towards {{blank:b}}-intensive methods and the quantity of labour demanded {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["dearer"], choices: ["dearer", "cheaper"] },
      { id: "b", accepted: ["capital"], choices: ["capital", "labour"] },
      { id: "c", accepted: ["falls"], choices: ["falls", "rises"] },
    ],
    wrong: [["cheaper", "labour", "rises"]],
    hints: ["Compare the price of labour with the price of capital."],
    explanation: "Higher wages make labour relatively more expensive, so firms substitute capital for labour.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** influences on a firm's demand for labour, other than the wage rate.",
    points: [
      "Identifies demand for the product (derived demand).",
      "Explains: more sales mean more workers are needed to produce them.",
      "Identifies productivity / price of capital / availability of skills.",
      "Explains its effect (more productive workers are worth more; cheaper machines replace workers; scarce skills limit hiring).",
    ],
    modelAnswer: "First, demand for labour is derived from demand for the product: if more customers buy the firm's goods, it needs more workers. Second, the productivity of labour matters: if training makes workers produce more, each is worth more to the firm, so it wants to employ more of them at the same wage.",
    hints: ["Why does a firm want workers at all?"],
    explanation: "One mark for each influence and one for explaining its effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why many firms in low-income countries use labour-intensive methods.",
    points: [
      "Labour is plentiful and wages are low relative to the cost of capital.",
      "So the labour-intensive method gives the lower cost per unit.",
      "Capital is expensive / finance is hard to obtain / machines must be imported.",
      "Unreliable power or lack of maintenance skills makes machinery less productive.",
    ],
    modelAnswer: "In many low-income countries labour is plentiful and wages are low compared with the price of machines, so labour-intensive methods give the lowest cost per unit. Machines often have to be imported and finance is scarce and expensive, and unreliable power or a lack of technicians to maintain machinery reduces the benefit of capital, so firms rely on workers.",
    hints: ["Compare the relative prices of labour and capital."],
    explanation: "Each point links a feature of the economy to the cost of each method.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 16,
    stem: "A fictional drinks firm fills bottles by hand, employing 80 workers. It is considering an automatic filling line that would need only 20 workers. Demand for its drinks has been growing steadily, and wages in the area have risen in recent years.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which term describes the firm's current method of production?",
        options: [["Labour-intensive", "Correct: many workers, little capital."], ["Capital-intensive", "That would be the automatic line."], ["Division of capital", "Not a recognised term."], ["Derived production", "Not a recognised term."]],
        answer: "A",
        explanation: "Filling bottles by hand with 80 workers is labour-intensive.",
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the firm's demand for labour is a derived demand.", points: ["The firm employs workers to produce drinks.", "Its demand for workers depends on how many drinks consumers buy.", "If demand for drinks rises, demand for workers rises (and vice versa)."], modelAnswer: "The firm employs workers only to produce drinks, so how many it needs depends on how many drinks consumers buy. As demand for its drinks rises, its demand for workers (or machines) rises too." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** reasons why the firm may now consider the automatic line.", points: ["Wages have risen, so labour is relatively more expensive.", "So the capital-intensive method may now give the lower cost per bottle.", "Demand is growing, so output is large and standardised.", "So the cost of the machine is spread over many bottles / consistent quality."], modelAnswer: "Wages in the area have risen, making labour relatively more expensive than machinery, so the automatic line may now give a lower cost per bottle. Demand is also growing, so the firm will produce large numbers of identical bottles, allowing the high cost of the line to be spread over many units, with more consistent filling." }),
      P.manual({ label: "(d)", marks: 8, levels: LV(8), stem: "Discuss whether the firm should switch to the automatic filling line.", points: ["For: lower cost per bottle at high output, so lower prices or higher profit.", "For: consistent quality / hygiene / faster output to meet growing demand.", "For: fewer labour problems; remaining workers more productive and possibly better paid.", "Against: high initial cost, loans and interest; opportunity cost of the funds.", "Against: breakdowns or power cuts stop all production; spare parts may be imported.", "Against: 60 jobs lost; effect on morale, local community and the firm's reputation.", "Against: less flexible if demand falls / product changes.", "Justified conclusion (for example switch if growth in demand is expected to continue; retrain or redeploy staff)."], hints: ["Will demand keep growing? What if the power fails?"], modelAnswer: "The automatic line would cut the cost per bottle at high output, since 60 fewer workers are needed at rising wages, and it would give consistent filling and the speed needed to meet growing demand. Remaining workers would be more productive and could be paid more. However, the line is expensive, may require a loan, and a breakdown or power cut would stop all production, while spare parts may need to be imported. Sixty workers would lose their jobs, which may harm morale and the firm's reputation, and the line would be costly to run if demand fell. Because demand is growing steadily and wages are rising, the switch is likely to pay in the long run, but the firm should keep a back-up generator and redeploy or retrain as many workers as possible." }),
    ],
    explanation: "(a) Labour-intensive. (b) Workers are wanted to make drinks. (c) Rising wages and large output. (d) Lower unit cost and quality against cost, risk, inflexibility and job losses.",
    hints: ["Use the information about wages and demand."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A fictional government is choosing how to build small dams in rural areas: with earth-moving machines, or with local workers using hand tools.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the advantages of the labour-intensive method for the rural areas.", points: ["Creates many jobs for local people.", "So incomes rise and poverty falls in the area.", "Spending of wages benefits local traders (money stays in the local economy).", "Lower need for imported machinery, fuel and spare parts.", "So it saves foreign currency / is not stopped by breakdowns.", "Workers gain skills that can be used on later projects."], modelAnswer: "Using local workers creates many jobs, so household incomes rise and poverty falls. Workers spend their wages with local traders, so the money stays in the area and supports other businesses. The method needs little imported machinery, fuel or spare parts, saving foreign currency and avoiding delays from breakdowns. Workers also gain skills they can use on future projects." }),
    ],
    explanation: "Jobs and incomes, local spending, less import dependence and new skills.",
    hints: ["Think about jobs, local spending and imports."],
  });

  b.card("DEFINITION", "Derived demand", "Demand for a factor of production that comes from demand for the product it helps to make.");
  b.card("DEFINITION", "Labour-intensive production", "Production using a high proportion of labour relative to capital.");
  b.card("DEFINITION", "Capital-intensive production", "Production using a high proportion of capital (machinery, equipment) relative to labour.");
  b.card("CONCEPT", "Influences on the demand for factors", "Demand for the product, price of the factor, prices of other factors, productivity, availability, government policy.");
  b.card("CONCEPT", "Why choose labour-intensive methods?", "Cheap plentiful labour, expensive or scarce capital, small output, customised or hand-made products, personal services.");
  b.card("CONCEPT", "Why choose capital-intensive methods?", "High wages or scarce skills, large standardised output, need for precision, finance available.");
  b.card("FACT", "What happens to labour demand if machines become cheaper relative to wages?", "Firms substitute capital for labour, so demand for labour tends to fall.");
  b.card("CONCEPT", "Disadvantages of capital-intensive production", "High initial cost, breakdowns and power cuts stop output, inflexible if demand falls, fewer jobs.");
  b.card("CONCEPT", "Disadvantages of labour-intensive production", "Higher unit costs at large output, less consistent quality, labour problems such as absence and turnover.");
});
