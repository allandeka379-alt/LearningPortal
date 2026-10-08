// W1a: Cambridge 0455 Paper 2 items. Section A (STRUCTURED 20 ANALYSIS, parts (a)-(f)): a PPC and resource-allocation
// case. Section B (STRUCTURED 20 EVALUATION, parts (a)-(d) = 2/4/6/8): the market economic system and the price mechanism.
import { concept, P, table, fmt, money, pct, pctChange, check, CAM } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];
const LV8 = [
  [3, 6, 8, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 4, 5, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 3, "Simple points, little explanation."],
];

concept("econ.basics.ppc", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: Country K's production possibilities.
  {
    const L = ["A", "B", "C", "D", "E"], cap = [0, 10, 20, 30, 40], con = [130, 124, 110, 86, 50];
    const steps = cap.slice(1).map((_, i) => con[i] - con[i + 1]);
    for (let i = 1; i < steps.length; i++) if (!(steps[i] > steps[i - 1])) throw new Error("PPC not concave");
    const actual = { cap: 20, con: 92 };
    const idle = con[2] - actual.con;
    const ocCD = con[2] - con[3];
    check("oc C-D", ocCD, 24);
    check("idle", idle, 18);
    const t = table(["Combination", "Capital goods (million units)", "Consumer goods (million units)"], L.map((l, i) => [l, cap[i], con[i]]));
    const passage = [
      "Country K is a fictional lower-middle-income economy in southern Africa. Most of its people work in farming, mining and small businesses, and its government has to decide how to use the country's limited resources.",
      `Economists in the planning ministry estimate that, if all resources were fully and efficiently employed, Country K could produce the combinations of capital goods (such as machinery, power lines and roads) and consumer goods (such as food, clothing and household items) shown in Table 1.\n\n**Table 1: Production possibilities of Country K, 2025**\n\n${t}`,
      `In 2025, however, Country K actually produced ${actual.cap} million units of capital goods and only ${actual.con} million units of consumer goods. Long power cuts left many factories idle for part of each week, and many young people could not find work.`,
      "Two other changes are under way. A large deposit of lithium has been discovered in the north of the country, and a foreign firm has offered to develop a mine. At the same time, many engineers, doctors and nurses have left Country K to work abroad, where wages are higher.",
      "The government now plans to move resources towards capital goods, from combination C to combination D, by building a new power station and repairing the main roads. The finance minister argues that this will raise living standards in the future. Critics reply that many households are already struggling to buy food and clothing, and that the country should not reduce the output of consumer goods. They also point out that the power cuts, not a lack of factories, are the main reason so many workers and machines stood idle in 2025, and that the new roads and power station will take several years to complete.",
    ].join("\n\n");
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.basics.ppc", "econ.basics.ppc-shapes-shifts", "econ.basics.opportunity-cost", "econ.basics.factors-of-production"],
      stem: passage,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Identify the factor of production that each of the following is an example of.",
          template: "The lithium deposit: {{blank:a}}. The engineers, doctors and nurses: {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["land"], choices: ["land", "labour", "capital", "enterprise"] },
            { id: "b", accepted: ["labour"], choices: ["land", "labour", "capital", "enterprise"] },
          ],
          wrong: [["capital", "enterprise"]],
          explanation: "Natural resources such as minerals are land; human effort and skills are labour.",
        }),
        P.num({
          label: "(b)", marks: 2, kind: "plain", value: ocCD,
          stem: "Using Table 1, calculate the opportunity cost, in million units of consumer goods, of the government's plan to move from combination C to combination D.",
          wrong: [con[3], cap[3] - cap[2]],
          explanation: `Consumer goods fall from ${con[2]} million to ${con[3]} million: ${con[2]} − ${con[3]} = ${ocCD} million units are given up to gain ${cap[3] - cap[2]} million units of capital goods. ${con[3]} is the output still produced at D, not the amount given up.`,
        }),
        P.num({
          label: "(c)", marks: 2, kind: "plain", value: idle,
          stem: "Using the information, calculate how many more million units of consumer goods Country K could have produced in 2025 without producing fewer capital goods.",
          wrong: [con[2], actual.con],
          explanation: `With ${actual.cap} million units of capital goods, the maximum is ${con[2]} million units of consumer goods (combination C). Actual output was ${actual.con} million, so ${con[2]} − ${actual.con} = ${idle} million units more were possible.`,
        }),
        P.fib({
          label: "(d)", marks: 2,
          stem: "Complete the sentence.",
          template: "In 2025 Country K produced at a point {{blank:a}} its PPC, which shows that some of its resources were {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["inside"], choices: ["inside", "on", "beyond"] },
            { id: "b", accepted: ["unemployed"], choices: ["unemployed", "fully employed", "unattainable"] },
          ],
          wrong: [["on", "fully employed"]],
          explanation: "Actual output (20, 92) is below combination C (20, 110), so it lies inside the PPC: idle factories and unemployed young people mean resources were not fully used.",
        }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Analyse how the discovery of lithium and the emigration of skilled workers are likely to affect Country K's production possibility curve.",
          points: [
            "Lithium: an increase in the quantity of natural resources (land).",
            "Lithium: raises productive capacity, so the PPC shifts outwards (more of both goods possible); export earnings may buy more capital.",
            "Emigration: a fall in the quantity and quality of labour (skilled workers lost).",
            "Emigration: lowers productive capacity, so the PPC shifts inwards (or grows less); fewer doctors and nurses also harm the health and productivity of other workers.",
            "Recognises the overall effect depends on the relative size of the two changes.",
            "Notes that the lithium affects mining output most, so the shift may be uneven, while skills losses affect many industries.",
          ],
          modelAnswer: "The lithium deposit increases Country K's natural resources (land). Once the mine is developed the economy can produce more, so its PPC shifts outwards, and lithium exports could earn foreign currency to buy more machinery. The emigration of engineers, doctors and nurses reduces both the quantity and the quality of labour. Fewer engineers means less can be built and maintained, and fewer health workers means other workers are ill more often and less productive, so the PPC shifts inwards. The overall effect depends on which change is larger. The mine adds mainly to mining output, while the loss of skills affects almost every industry, so the outward shift may be smaller than it first appears.",
        }),
        P.manual({
          label: "(f)", marks: 6,
          stem: "Discuss whether Country K's government should move from combination C to combination D.",
          points: [
            "For: more capital goods (power station, roads) raise future productive capacity, shifting the PPC outwards.",
            "For: a reliable power supply would also bring idle factories back into use, moving actual output towards the PPC.",
            `Against: the opportunity cost is ${ocCD} million units of consumer goods, lowering living standards now.`,
            "Against: households already struggling to buy food and clothing would suffer; the cost rises steeply along the curve.",
            "Considers an alternative: first use idle resources (inside the curve) to raise both goods without an opportunity cost.",
            "Reaches a justified conclusion.",
          ],
          levels: LV6,
          modelAnswer: `Moving to D would give 10 million more units of capital goods, such as a power station and better roads. These would raise Country K's productive capacity, shifting the PPC outwards and raising future living standards, and reliable electricity would also bring idle factories back into production. However, the opportunity cost is ${ocCD} million units of consumer goods, and because the curve is bowed outwards this cost is larger than for the previous move from B to C. Many households are already struggling, so cutting consumer goods would lower living standards now. Since Country K is producing inside its PPC, it could first use its idle resources to produce more of both goods at no opportunity cost. On balance the government should go ahead with the power station, because power cuts are the main reason resources are idle, but it should protect the consumption of the poorest households while the investment takes place.`,
        }),
      ],
      explanation: `Opportunity cost of C to D: ${ocCD} million units of consumer goods. In 2025 output was ${idle} million units of consumer goods below the PPC (inside the curve). Lithium shifts the PPC outwards; emigration shifts it inwards. The final part weighs future capacity against present living standards.`,
      hints: ["Use the rows for C and D in Table 1.", "Compare actual output with combination C.", "In (f), consider both the future gains and the present cost."],
    });
  }

  // ---------------- Section B: the market economic system and the price mechanism.
  {
    const f0 = 0.8, f1 = 1.0, rise = pctChange(f0, f1);
    check("fare rise", rise, 25);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "pct", value: rise,
      stem: `Calculate the percentage increase in the average fare. Give your answer to one decimal place.`,
      wrong: [((f1 - f0) / f1) * 100, f1 - f0],
      explanation: `(${fmt(f1, 2)} − ${fmt(f0, 2)}) ÷ ${fmt(f0, 2)} × 100 = ${pct(rise, 1)}. Using the new fare as the base gives ${pct(((f1 - f0) / f1) * 100, 1)}.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how the higher fares could lead to more buses being provided.",
      points: [
        "Higher fares signal that bus travel is scarce or more wanted (signalling function).",
        "Higher fares raise the profit from running buses (incentive function).",
        "Existing operators add buses and new firms enter the market, so supply increases.",
        "The extra supply reduces the shortage of seats and may later hold fares down (rationing function eases).",
      ],
      modelAnswer: "The rise in fares signals that bus travel is in short supply compared with demand. Higher fares also raise the profit from each bus journey, giving existing operators an incentive to add buses and attracting new firms into the market. As more buses run, the shortage of seats falls and fares are less likely to keep rising.",
    });
    const partC = {
      part: { label: "(c)", type: "STRUCTURED", marks: 6, stem: "Since the bus company was sold, average fares on the main routes have risen from US\\$0.80 to US\\$1.00.", parts: [sub1.part, sub2.part] },
      model: null,
      wrong: [],
    };
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.systems.market-economy", "econ.markets.price-mechanism", "econ.systems.planned-mixed"],
      stem: "The government of a fictional country has sold its state-owned bus company to private firms and plans to let demand and supply set the prices of most goods and services. Supporters say this will make the economy more efficient. Critics fear that poorer households will be unable to afford essential services.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition of the market economic system.",
          template: "In a market economic system, resources are owned mainly by {{blank:a}} and are allocated mainly by {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["private individuals and firms"], choices: ["private individuals and firms", "the government", "trade unions"] },
            { id: "b", accepted: ["the price mechanism"], choices: ["the price mechanism", "central planners", "the central bank"] },
          ],
          explanation: "A market economic system has private ownership of resources, and the price mechanism (the interaction of demand and supply) allocates them.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how the price mechanism would respond to a rise in demand for bus travel. Complete the explanation.",
          template: "At the existing fare there is a {{blank:a}} of seats, so fares {{blank:b}}. The higher fares make running buses {{blank:c}} profitable, so operators supply {{blank:d}} buses.",
          blanks: [
            { id: "a", accepted: ["shortage"], choices: ["shortage", "surplus"] },
            { id: "b", accepted: ["rise"], choices: ["rise", "fall"] },
            { id: "c", accepted: ["more"], choices: ["more", "less"] },
            { id: "d", accepted: ["more"], choices: ["more", "fewer"] },
          ],
          wrong: [["surplus", "fall", "less", "fewer"]],
          explanation: "A rise in demand creates a shortage at the old fare; competition for seats pushes fares up (signal); higher fares raise profits (incentive), so more buses are supplied until the market clears.",
        }),
        partC,
        P.manual({
          label: "(d)", marks: 8,
          stem: "Discuss whether a market economic system is the best way to provide services such as bus transport.",
          points: [
            "For: competition and the profit motive make operators efficient and keep costs down.",
            "For: price signals and incentives match supply to demand (more buses where they are wanted), with choice and innovation.",
            "Against: services go to those who can pay; poorer households may be priced out of essential travel to work or school.",
            "Against: unprofitable routes (rural areas, late-night services) may be dropped although socially useful.",
            "Against: a few large firms may gain market power and raise fares; safety may be neglected without regulation.",
            "Considers a mixed approach: private operators with regulation, subsidies for essential routes or fares for poor households.",
            "Uses the context (fares rose 25%, more buses).",
            "Reaches a justified conclusion.",
          ],
          levels: LV8,
          modelAnswer: "A market system can provide bus transport efficiently. Competition forces operators to keep costs down and offer good service, and the profit motive encourages them to add buses where demand is high, as the price signals of rising fares show. Consumers gain choice, and operators have an incentive to innovate, for example with mobile ticketing. However, fares in the country rose by 25%, and some poorer households may no longer afford travel to work, school or clinics. Private firms will also drop unprofitable routes, such as those to remote villages, even though these routes are important for the people who use them, and if a few firms come to dominate they could raise fares further or cut safety. The market is therefore good at providing buses on busy routes but poor at protecting access for everyone. The best approach is a mixed one: let private firms compete, but regulate safety and fares and subsidise essential routes or fares for low-income travellers.",
        }),
      ],
      explanation: `The market economic system relies on private ownership and the price mechanism. A rise in demand raises fares, signalling scarcity and giving operators an incentive to add buses. The fare rise of ${pct(rise, 1)} shows the rationing effect on poorer households, which a balanced discussion weighs against efficiency.`,
      hints: ["(a) Ownership and allocation.", "(b) Shortage, price, profit, supply.", "(c)(i) Change ÷ original fare × 100."],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
