// W4a: econ.development.sustainable (ZIMSEC only) — sustainable resource management (CAMPFIRE, EMA, community share
// ownership trusts, recycling), sustainable development, project costs and benefits, lessons from NICs.
// Figures differ from the lesson's worked examples.
import { concept, P, table, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.development.sustainable", { file: "development/sustainable", keyPrefix: "development.sustainable" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Sustainable development is development that",
    options: [
      ["meets present needs without reducing the ability of future generations to meet theirs.", "Correct: it balances present and future needs."],
      ["stops the use of all natural resources so that they last for ever.", "Resources can be used, at a sustainable rate."],
      ["maximises the output of the present generation, whatever the effect on the future.", "That ignores future generations."],
      ["depends only on the export of non-renewable resources to other countries.", "Depleting minerals is not in itself sustainable."],
    ],
    answer: "A",
    explanation: "Sustainable development meets the needs of today without compromising those of future generations.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **non-renewable** resource?",
    options: [
      ["Platinum", "Correct: minerals exist in fixed amounts and are used up."],
      ["A forest", "Forests can regrow if managed well."],
      ["Fish in Lake Kariba", "Fish stocks can recover if not overfished."],
      ["Water in a river", "Rainfall renews river water."],
    ],
    answer: "A",
    explanation: "Minerals such as platinum, gold, lithium and coal are non-renewable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main aim of the CAMPFIRE programme?",
    options: [
      ["To let communities earn income from wildlife so they protect it", "Correct: income from wildlife gives an incentive to conserve."],
      ["To ban all hunting and tourism in communal areas of the country", "CAMPFIRE earns income from hunting and tourism."],
      ["To move all wildlife from communal land into national parks", "Wildlife stays in communal areas under the scheme."],
      ["To give mining companies the rights to land in communal areas", "It concerns wildlife, not mining rights."],
    ],
    answer: "A",
    explanation: "CAMPFIRE returns part of the revenue from wildlife (safari hunting, tourism) to communities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of the Environmental Management Agency (EMA)?",
    options: [
      ["Requiring environmental impact assessments before large projects begin", "Correct: EMA reviews the environmental effects of projects."],
      ["Setting the interest rates charged by commercial banks", "That relates to monetary policy (the Reserve Bank)."],
      ["Collecting income tax and VAT from firms and workers", "That is ZIMRA's role."],
      ["Running the national census of population and households every ten years", "That is ZIMSTAT's role."],
    ],
    answer: "A",
    explanation: "EMA requires impact assessments, monitors pollution and enforces environmental rules.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which practice is an example of **sustainable** use of a renewable resource?",
    options: [
      ["Cutting trees for firewood no faster than new trees are planted and grow", "Correct: the stock of trees is maintained."],
      ["Panning for gold along river banks without restoring the land afterwards", "This damages land and rivers."],
      ["Catching as many fish as possible before the breeding season", "Overfishing reduces future stocks."],
      ["Clearing forest each year to grow tobacco without replanting", "The forest shrinks every year."],
    ],
    answer: "A",
    hints: ["Does the resource remain for the future?"],
    explanation: "A renewable resource is used sustainably when the rate of use is no greater than the rate of renewal.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How can a country use a non-renewable resource, such as gold, in a sustainable way?",
    options: [
      ["Invest the income from gold in education and infrastructure for the future", "Correct: converts a depleting asset into lasting assets."],
      ["Leave all the gold in the ground for ever and never mine it at all", "This gives no benefit to anyone."],
      ["Mine the gold as fast as possible and spend all the income on imported consumer goods", "Future generations gain nothing."],
      ["Sell the mining rights cheaply so production can start faster", "This gives away the country's future income."],
    ],
    answer: "A",
    hints: ["What can be left for the future once the gold is gone?"],
    explanation: "Investing the income in human and physical capital means future generations still benefit after the resource runs out.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the most important weakness of community wildlife schemes such as CAMPFIRE?",
    options: [
      ["Income depends on tourism and hunting, which can fall sharply", "Correct: revenue is unstable, so community benefits are unreliable."],
      ["They give communities no incentive to protect wildlife", "The scheme gives exactly this incentive."],
      ["They earn income from land suited to nothing else", "This is a benefit, not a weakness."],
      ["They pay for boreholes, clinics and schools in wards", "This is a benefit."],
    ],
    answer: "A",
    hints: ["What happens to the scheme if tourists stop coming?"],
    explanation: "Revenue depends on visitors and hunting quotas; a fall in tourism cuts community income. Crop damage and revenue disputes are other problems.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is a lesson that developing countries often draw from newly industrialised countries?",
    options: [
      ["Invest heavily in education and technical skills", "Correct: skilled workers underpinned rapid industrialisation."],
      ["Depend permanently on exporting unprocessed raw materials", "NICs moved away from raw-material exports to manufacturing."],
      ["Discourage saving so that people spend more on imports", "NICs had high saving and investment."],
      ["Ignore the environment completely until incomes are high", "NICs' later clean-up costs are a warning against this."],
    ],
    answer: "A",
    hints: ["What helped NICs move into manufacturing?"],
    explanation: "Education, high saving and investment, export-led manufacturing and stable planning are the usual lessons; their pollution is a warning.",
  });

  // Numericals.
  const revenue = 132000, commPct = 48, comm = (revenue * commPct) / 100, wards = 8, perWard = comm / wards;
  check("comm", comm, 63360); check("perWard", perWard, 7920);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: perWard, daily: true,
    stem: `A fictional district wildlife scheme earns US\\$${fmt(revenue)} in a year. ${commPct}% is given to communities and shared equally among ${wards} wards. Calculate the amount each ward receives, in US\\$.`,
    wrong: [revenue / wards, comm],
    explanation: `1. Community share = ${commPct}% × ${fmt(revenue)} = US\\$${fmt(comm)}.\n2. Per ward = ${fmt(comm)} ÷ ${wards} = **US\\$${fmt(perWard)}**.\n3. Dividing the whole revenue gives US\\$${fmt(revenue / wards)}, which forgets that only ${commPct}% goes to communities.`,
  });
  const cost = 27500, saving = 4100, extra = 1400, annual = saving + extra, payback = cost / annual;
  check("payback", payback, 5);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: payback, dp: 1, tol: 0.05,
    stem: `A fictional school installs solar panels costing US\\$${fmt(cost)}. They save US\\$${fmt(saving)} a year on electricity bills, and the school earns US\\$${fmt(extra)} a year by charging local people's phones. Calculate the payback period, in years.`,
    wrong: [cost / saving],
    hints: ["Add the yearly benefits first."],
    explanation: `1. Yearly benefit = ${fmt(saving)} + ${fmt(extra)} = US\\$${fmt(annual)}.\n2. Payback period = ${fmt(cost)} ÷ ${fmt(annual)} = **${fmt(payback, 1)} years**.\n3. Using the electricity saving only gives ${fmt(cost / saving, 1)} years.`,
  });
  const stock = 26000, growthRate = 4, sustainableCut = (stock * growthRate) / 100, actual = 1690;
  check("sus", sustainableCut, 1040);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: sustainableCut,
    stem: `A fictional communal forest has ${fmt(stock)} mature trees. Each year new growth adds trees equal to ${growthRate}% of the stock. What is the largest number of trees that can be cut each year without reducing the stock?`,
    wrong: [stock - sustainableCut],
    hints: ["The forest is maintained if no more is cut than regrows."],
    explanation: `Regrowth = ${growthRate}% × ${fmt(stock)} = **${fmt(sustainableCut)} trees** a year. Cutting more than this (for example ${fmt(actual)}) shrinks the forest every year.`,
  });
  const waste = 3250, recycledPct = 36, recycled = (waste * recycledPct) / 100, targetPct = 50;
  const extraT = (waste * targetPct) / 100 - recycled;
  check("extraT", extraT, 455);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: extraT,
    stem: `A fictional town produces ${fmt(waste)} tonnes of plastic waste a year and recycles ${recycledPct}% of it. The council sets a target of recycling ${targetPct}%. How many extra tonnes a year must be recycled to meet the target, if the amount of waste stays the same?`,
    wrong: [(waste * (targetPct - recycledPct)) / recycledPct, (waste * targetPct) / 100],
    hints: ["Find the tonnes recycled now and the tonnes needed for the target."],
    explanation: `1. Recycled now = ${recycledPct}% × ${fmt(waste)} = ${fmt(recycled)} tonnes.\n2. Target = ${targetPct}% × ${fmt(waste)} = ${fmt((waste * targetPct) / 100)} tonnes.\n3. Extra = ${fmt((waste * targetPct) / 100)} − ${fmt(recycled)} = **${fmt(extraT)} tonnes** (equal to 14 percentage points of the waste).`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A forest is used sustainably if more trees are cut each year than grow back.",
    answer: false,
    explanation: "False. Sustainable use means cutting no more than regrows, so the forest is maintained.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Community share ownership trusts are meant to give communities a share of the benefits from resources extracted in their area.",
    answer: true,
    explanation: "True. Trusts receive a share of the value or profits of large resource-based companies for community development.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each initiative with its main purpose.",
    pairs: [
      ["CAMPFIRE", "Communities earn income from wildlife and so protect it"],
      ["Environmental Management Agency", "Enforces environmental laws and requires impact assessments"],
      ["Community share ownership trusts", "Communities receive a share of the value of local resource companies"],
      ["Recycling schemes", "Waste is turned back into raw materials"],
    ],
    explanation: "Each initiative tackles sustainability in a different way: incentives, regulation, benefit-sharing and reuse.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Gold and coal are {{blank:a}} resources. Forests and wildlife are {{blank:b}} resources, which can be used sustainably if they are not used faster than they {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["non-renewable"], choices: ["non-renewable", "renewable"] },
      { id: "b", accepted: ["renewable"], choices: ["renewable", "non-renewable"] },
      { id: "c", accepted: ["regrow"], choices: ["regrow", "are sold", "are taxed"] },
    ],
    wrong: [["renewable", "non-renewable", "are sold"]],
    explanation: "Minerals are fixed in supply; living resources can regrow if their use is managed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which firms can manage resources sustainably.",
    points: [
      "Identifies: cleaner technology / waste treatment.",
      "Explains: less pollution of air and rivers, so other users and future generations are not harmed.",
      "Identifies: rehabilitating land after mining / efficient use of energy and materials / recycling.",
      "Explains: land can be used again / fewer resources are used per unit of output.",
    ],
    modelAnswer: "First, firms can treat their waste water and fumes before releasing them, so rivers and air stay clean for farmers, households and future generations. Second, mining firms can refill pits and replant vegetation after mining, so the land can be farmed or grazed again instead of being left damaged.",
    hints: ["Think about waste, land and energy use."],
    explanation: "Each way: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Outline a plan for a sustainable development project to reduce deforestation around a village.",
    points: [
      "States the problem and aim (e.g. trees cut for firewood faster than they regrow; aim to restore tree cover).",
      "Activities: a tree nursery and community woodlots.",
      "Activities: energy-saving stoves / solar or biogas to reduce firewood use.",
      "Resources and costs: seedlings, tools, stoves, training; funding source (community, NGO, council).",
      "Benefits: firewood in future, less soil erosion, income from selling seedlings or fruit.",
      "Management and monitoring: a village committee, rules on cutting, counting trees each year.",
    ],
    modelAnswer: "Problem and aim: trees around the village are being cut for firewood faster than they regrow; the aim is to restore tree cover within five years. Activities: set up a community tree nursery and plant woodlots, and introduce energy-saving stoves so that families use less firewood. Resources: seedlings, tools, stoves and training, funded by the community with help from the rural district council or an NGO. Benefits: a future supply of firewood, less soil erosion, and income from selling seedlings and fruit. Management: a village committee sets rules on cutting and counts the trees each year to check progress.",
    hints: ["Problem, aim, activities, resources, benefits, monitoring."],
    explanation: "One mark per element of the plan.",
  });

  // Structured 1: a project's costs and benefits.
  const yrs = [1, 2, 3, 4];
  const costs = [9600, 1200, 1200, 1200], benefits = [2500, 4300, 4300, 4300];
  const net = yrs.map((_, i) => benefits[i] - costs[i]);
  const cumNet = net.reduce((acc, v, i) => [...acc, (acc[i - 1] ?? 0) + v], []);
  check("cum4", cumNet[3], 2200);
  const T1 = table(["Year", "Costs (US\\$)", "Money benefits (US\\$)"], yrs.map((y, i) => [y, costs[i], benefits[i]]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `A fictional rural community plans a biogas project: cattle dung is used to produce gas for cooking and lighting, and the leftover slurry is used as fertiliser. The table shows the expected costs (building the digester in year 1, then maintenance) and the money benefits (savings on firewood and paraffin and extra crop sales).\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: net[0], stem: "Calculate the net benefit (benefits minus costs) in year 1, in US\\$. Give a loss as a negative number.", wrong: [-net[0]], explanation: `${fmt(benefits[0])} − ${fmt(costs[0])} = −US\\$${fmt(-net[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cumNet[3], stem: "Calculate the total net benefit over the four years, in US\\$.", wrong: [benefits.reduce((s, v) => s + v, 0)], explanation: `Total benefits ${fmt(benefits.reduce((s, v) => s + v, 0))} − total costs ${fmt(costs.reduce((s, v) => s + v, 0))} = US\\$${fmt(cumNet[3])}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "In which year does the project first make a positive total (cumulative) net benefit?",
        options: [
          ["Year 4", `Correct: cumulative net benefit ${cumNet.map((v) => fmt(v)).join(", ")}.`],
          ["Year 2", `After year 2 the total is still −US\\$${fmt(-cumNet[1])}.`],
          ["Year 3", `After year 3 the total is still −US\\$${fmt(-cumNet[2])}.`],
          ["Year 1", "Year 1 has a large loss because of building costs."],
        ],
        answer: "A",
        explanation: `Cumulative: year 1 ${fmt(cumNet[0])}, year 2 ${fmt(cumNet[1])}, year 3 ${fmt(cumNet[2])}, year 4 ${fmt(cumNet[3])}.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **three** benefits of the project that are not shown in the table.",
        points: [
          "Less firewood cut, so less deforestation and soil erosion.",
          "Cleaner indoor air than wood or paraffin smoke, so better health (especially for women and children).",
          "Less time spent collecting firewood (more time for school or work) / lower greenhouse gas emissions.",
        ],
        modelAnswer: "First, families cut fewer trees, so deforestation and soil erosion fall. Second, biogas burns more cleanly than firewood or paraffin, so there is less smoke in kitchens and fewer breathing illnesses. Third, women and children spend less time collecting firewood and have more time for school or other work.",
        explanation: "One mark per explained non-money benefit.",
      }),
      P.manual({
        label: "(e)", marks: 5, levels: LV(5),
        stem: "Discuss whether the community should go ahead with the project.",
        points: [
          `For: positive total net benefit (US\\$${fmt(cumNet[3])}) over four years, and benefits continue after year 4.`,
          "For: environmental and health benefits not in the table make the case stronger.",
          "Against: large cost in year 1 needs finance; benefits are uncertain (needs enough cattle and water, maintenance skills).",
          "Against: it takes until year 4 to pay back; risk if the digester breaks down.",
          "Justified conclusion, e.g. go ahead if finance and training are available.",
        ],
        modelAnswer: `Over four years the project gives a total net benefit of US\\$${fmt(cumNet[3])}, and the benefits continue after year 4 while costs fall to maintenance only. It also brings benefits not shown in money: less deforestation, cleaner kitchens and time saved. However, the community must find US\\$${fmt(costs[0])} in year 1, the money benefits depend on enough cattle dung and water and on people being trained to maintain the digester, and it takes until year 4 to recover the cost. On balance the community should go ahead, provided it can obtain a grant or loan for the building cost and train people to run the digester, because the long-term economic, health and environmental benefits are large.`,
        explanation: "Weigh net benefits and wider gains against cost, risk and time; conclude.",
      }),
    ],
    hints: ["Net benefit = benefits − costs.", "Add each year's net benefit to find the running total."],
    explanation: `Net benefits by year: ${net.map((v) => fmt(v)).join(", ")}; cumulative ${cumNet.map((v) => fmt(v)).join(", ")}.`,
  });

  // Structured 2: gold panning and EMA.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional district, many unemployed young people earn a living by panning for gold along river banks. Farmers downstream complain that the rivers are silting up and that mercury used to separate the gold is poisoning water and fish. The Environmental Management Agency is considering a complete ban on panning in the district.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "The harm to downstream farmers is an example of",
        options: [
          ["an external cost.", "Correct: a cost to third parties not paid by the panners."],
          ["an external benefit.", "Farmers are harmed, not helped."],
          ["an opportunity cost to the panners.", "Opportunity cost is the next best alternative given up by the panners."],
          ["a fixed cost of the panners.", "Fixed costs are costs of production that do not vary with output."],
        ],
        answer: "A",
        explanation: "Silting and mercury pollution are costs imposed on third parties: external costs.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why gold panning in this district is not sustainable.",
        points: ["Gold is non-renewable, and panning damages river banks and water quality.", "Future users (farmers, fishers, future generations) lose clean water, fish and land."],
        modelAnswer: "Gold is a non-renewable resource, and the way it is being extracted destroys river banks and poisons water and fish, so future farmers, fishers and generations lose resources they depend on.",
        explanation: "Two linked points.",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether a complete ban on gold panning is the best way to make resource use in the district sustainable.",
        points: [
          "For: stops silting and mercury pollution quickly; protects farmers, fish and drinking water.",
          "Against: removes the income of many unemployed young people, increasing poverty; may push panning underground.",
          "Against: enforcement is difficult and costly over large areas.",
          "Alternatives: licensing and registering panners, mercury-free methods, rehabilitation of land, training and other jobs.",
          "Justified conclusion, e.g. regulated, licensed small-scale mining with rehabilitation is better than a total ban.",
        ],
        modelAnswer: "A complete ban would stop the silting and mercury pollution quickly and protect downstream farmers, fish and drinking water. However, many young people depend on panning for income, so a ban would raise poverty and could simply drive panning into hiding, where it is even harder to control; enforcing it across a large district would also be costly. Alternatives include registering and licensing panners, requiring mercury-free methods and land rehabilitation, and providing training and other jobs. A regulated system is better than a total ban, because it reduces the damage while keeping incomes, though in the most damaged stretches of river a ban may still be needed.",
        explanation: "Weigh environmental gains against lost incomes and enforcement; consider alternatives; conclude.",
      }),
    ],
    hints: ["Who gains and who loses from a ban?"],
    explanation: "Panning causes external costs; the policy choice balances the environment against livelihoods.",
  });

  b.card("DEFINITION", "Define **sustainable development**.", "Development that meets present needs without reducing the ability of future generations to meet their own needs.");
  b.card("DEFINITION", "What is **sustainable resource management**?", "Using resources at a rate that allows renewal or replacement, protecting the environment and sharing benefits fairly.");
  b.card("FACT", "What does **CAMPFIRE** stand for?", "Communal Areas Management Programme for Indigenous Resources.");
  b.card("CONCEPT", "How does CAMPFIRE encourage conservation?", "Communities receive income from wildlife (safari hunting, tourism), so they have a reason to protect animals rather than poach them.");
  b.card("CONCEPT", "Give three roles of the Environmental Management Agency.", "Requires environmental impact assessments; monitors pollution; enforces rules on waste, veld fires and river-bank cultivation; educates the public.");
  b.card("CONCEPT", "What are community share ownership trusts?", "Trusts that receive a share of the value or profits of large local resource companies, to spend on community development.");
  b.card("CONCEPT", "Give two benefits and one problem of recycling.", "Saves raw materials and energy, reduces waste, creates jobs; but collection and sorting are costly.");
  b.card("CONCEPT", "How can a non-renewable resource be used sustainably?", "Use it efficiently, recycle where possible, and invest the income in education and infrastructure for future generations.");
  b.card("CONCEPT", "Give three lessons from newly industrialised countries.", "Invest in education and skills; high saving and investment; export-led manufacturing; stable planning; build in environmental protection.");
});
