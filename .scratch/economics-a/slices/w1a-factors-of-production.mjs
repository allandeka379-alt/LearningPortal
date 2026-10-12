// W1a: factors of production (both boards; sustainable use is ZIMSEC detail).
import { concept, P, chk, fmt, table, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.basics.factors-of-production", { file: "basics/factors-of-production", keyPrefix: "basics.factors-of-production" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which of the following are the four factors of production?",
    explanation: "The four factors are land, labour, capital and enterprise." },
    ["Land, labour, capital and enterprise", "Correct."],
    [["Land, labour, money and profit", "Money and profit are not factors of production."],
     ["Capital, interest, wages and rent", "These are mostly rewards of the factors."],
     ["Natural resources, tax, labour and technology", "Tax is not a factor of production."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In economics, what does *capital* mean?",
    explanation: "Capital is man-made goods used to produce other goods and services. Money is not capital in this sense." },
    ["Machines, tools and buildings used to produce goods", "Correct: man-made productive equipment."],
    [["The money a business holds in its bank account", "Money is a financial asset, not a factor of production."],
     ["The natural resources found in a country", "Those are land."],
     ["The skills and training of the workforce", "That is human capital, a part of labour in some treatments."]]);

  mc({ d: 2, skill: "APPLICATION", stem: "A farmer in Mashonaland uses a tractor to plough her land. The tractor is an example of",
    explanation: "A tractor is man-made equipment used in production, so it is capital." },
    ["capital", "Correct."],
    [["land", "Land is a natural resource."],
     ["labour", "Labour is human effort."],
     ["enterprise", "Enterprise is organising and risk-taking."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is an example of **human capital**?",
    explanation: "Human capital is the knowledge, skills and health of workers, built through education and training." },
    ["A nurse who has completed three years of training", "Correct: training raises productivity."],
    [["A hospital building where the nurse works", "A building is physical capital."],
     ["The wages paid to the nurse each month", "Wages are the reward to labour."],
     ["A loan from a bank to open a clinic", "A loan is finance, not a factor of production."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which resource is **non-renewable**?",
    explanation: "Minerals such as platinum cannot be replaced within a human time scale once mined; forests, fish and soil fertility can regenerate." },
    ["Platinum ore in the ground", "Correct: once extracted it cannot be replaced."],
    [["Fish in Lake Kariba", "Fish reproduce, so they are renewable if not overfished."],
     ["Trees in a managed plantation", "Trees regrow."],
     ["Water in a river fed by rain", "Rainfall replenishes it."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which factor earns profit?"],
    stem: "Sipho sets up a business to repair mobile phones, hires two assistants, buys tools and rents a shop. Which factor of production does Sipho himself provide?",
    explanation: "Sipho organises the other factors and bears the risk, which is enterprise. The assistants are labour, the tools capital and the shop land (or capital)." },
    ["Enterprise", "Correct: he organises production and takes the risk."],
    [["Labour only", "The assistants provide the hired labour; Sipho's distinct role is enterprise."],
     ["Capital", "The tools are capital, but they are not what Sipho provides as an entrepreneur."],
     ["Land", "The shop he rents is land or buildings, which are not his role."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which method uses more labour relative to capital?"],
    stem: "A fictional firm has monthly costs of US\\$30,000 for labour and US\\$10,000 for capital. Another firm has US\\$8,000 for labour and US\\$32,000 for capital. Which statement is correct?",
    explanation: "The first firm spends 75% of its costs on labour (labour-intensive); the second spends 20% (capital-intensive)." },
    ["The first firm is labour-intensive and the second is capital-intensive", "Correct: labour shares are 75% and 20%."],
    [["The first firm is capital-intensive and the second is labour-intensive", "This reverses the types."],
     ["Both firms are capital-intensive because both use some capital", "Intensity depends on the proportion, not on any use of capital."],
     ["Both firms are labour-intensive because both employ workers", "Intensity depends on the proportion, not on any use of labour."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which kind of mobility is it?"],
    stem: "A teacher trained in history takes a retraining course and becomes an accountant. This is an example of",
    explanation: "A change of occupation is occupational mobility; a change of place is geographical mobility." },
    ["occupational mobility of labour", "Correct: the worker changes type of job."],
    [["geographical mobility of labour", "This would involve a change of location."],
     ["the immobility of capital", "The example concerns a person's job."],
     ["a fall in human capital", "Retraining adds to skills; human capital does not fall."]]);

  {
    const lab = 15000, cap = 5000, share = (lab / (lab + cap)) * 100;
    chk(share, 75);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: share, dp: 0, unit: "%",
      stem: "A fictional knitting firm has monthly labour costs of US\\$15,000 and capital costs of US\\$5,000. Calculate labour costs as a percentage of total costs.",
      wrong: [(cap / (lab + cap)) * 100, (lab / cap) * 100],
      explanation: `Total costs = 15,000 + 5,000 = 20,000. Labour share = 15,000 ÷ 20,000 × 100 = ${fmt(share)}%. The capital share is 25% and 300% divides labour by capital instead of by the total.` });
  }
  {
    const stock = 3000, rate = 0.04, regrow = stock * rate;
    chk(regrow, 120);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: regrow, unit: "units", applies: ZIM, hints: ["Regrowth = stock × rate."],
      stem: "A fictional woodland has 3,000 hectares of trees that regrow by 4% of the stock each year if left uncut. What is the maximum number of hectares that can be cut each year without reducing the woodland, assuming the growth rate is unchanged?",
      wrong: [4, 3000 - 120],
      explanation: `1. Annual regrowth = 3,000 × 0.04 = **${regrow}** hectares.\n2. Cutting up to ${regrow} hectares a year leaves the stock unchanged: this is the sustainable level.\n\n2,880 is the area left after regrowth is taken away, and 4 is the rate, not an area.` });
  }
  {
    const lab = 12000, out = 600, per = out / 12;
    chk(per, 50);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: per, unit: "units", daily: true,
      stem: "A fictional factory in Gweru employs 12 workers and produces 600 pairs of shoes in a week. Calculate the output per worker.",
      wrong: [600 * 12, 12 / 600],
      explanation: `Output per worker = 600 ÷ 12 = ${per} pairs. Multiplying gives 7,200, and dividing the workers by output gives 0.02.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "In economics, a minibus used in a taxi business is an example of capital.", answer: true,
    explanation: "True. It is a man-made good used to produce a service (transport)." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A renewable resource can never be exhausted.", answer: false,
    explanation: "False. If fish or trees are used faster than they regenerate, the stock falls and may be exhausted." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each factor of production to the reward it earns.",
    pairs: [["Land", "Rent"], ["Labour", "Wages"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Each factor earns its own reward." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Choose the correct words.",
    template: "Production that uses a high proportion of workers relative to machines is {{blank:a}}-intensive. The ability of a worker to change to a different type of job is {{blank:b}} mobility.",
    blanks: [{ id: "a", accepted: ["labour"], choices: ["labour", "capital"] }, { id: "b", accepted: ["occupational"], choices: ["occupational", "geographical"] }],
    wrong: [["capital", "geographical"]],
    explanation: "A high labour share means labour-intensive; a change of job is occupational mobility." });

  b.short({ d: 2, skill: "RECALL", stem: "Which factor of production earns profit as its reward?",
    accepted: ["enterprise", "entrepreneur", "the entrepreneur"], wrong: ["labour"],
    explanation: "Enterprise (the entrepreneur) earns profit." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, stem: "Distinguish between physical capital and human capital.",
    points: ["Physical capital is man-made equipment such as machines and buildings used in production.", "Human capital is the knowledge, skills and health of workers that raise their productivity."],
    modelAnswer: "Physical capital means man-made goods such as machines, tools and factories used to produce other goods. Human capital is the education, skills and health of the workforce, which make workers more productive.",
    explanation: "A definition of each." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, applies: ZIM, hints: ["Explain a cause and a consequence for the future."],
    stem: "Explain **two** ways a government could encourage the sustainable use of a country's forests.",
    points: ["Method 1 (for example limits on cutting or licences).", "Explained: the cut is kept at or below regrowth so the stock is maintained.", "Method 2 (for example replanting schemes or fines for illegal logging).", "Explained: new trees replace those cut, so future generations also have timber."],
    modelAnswer: "The government could limit cutting through licences so that the amount of wood taken each year does not exceed the natural regrowth, which keeps the stock of trees constant. It could also require or subsidise replanting, which replaces cut trees so that timber is available to future generations as well.",
    explanation: "Credit two methods, each linked to the sustainable stock." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Think about the cost of each factor and the number of jobs."],
    stem: "A fictional government is deciding whether a new clothing factory should use labour-intensive or capital-intensive methods. Analyse **one** advantage of labour-intensive methods for an economy with high unemployment.",
    points: ["More workers are employed per unit of capital.", "Unemployment falls and incomes rise.", "Capital is scarce and labour abundant, so the cheaper abundant factor is used.", "Higher household incomes increase spending in the local economy."],
    modelAnswer: "Labour-intensive methods employ more workers for each dollar of capital, so unemployment falls and household incomes rise. Because labour is abundant and capital scarce in such an economy, using more of the abundant factor also keeps costs lower and allows more people to spend in local shops.",
    explanation: "Link the method to jobs, incomes and the relative scarcity of factors." });

  // Structured 1.
  {
    const rows = [["Tinashe Bricks", 14000, 6000], ["Kariba Fishing Co-op", 9000, 3000], ["Zandia Steel", 4000, 26000]];
    const tab = table(["Firm", "Labour cost (US\\$ per month)", "Capital cost (US\\$ per month)"], rows);
    const sh = rows.map(([, l, c]) => (l / (l + c)) * 100);
    chk(sh[0], 70); chk(sh[1], 75); chk(sh[2], (4000 / 30000) * 100, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Labour share = labour ÷ total × 100."],
      stem: `The table shows the monthly costs of three fictional firms (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: sh[0], dp: 0, unit: "%", stem: "Calculate labour costs as a percentage of total costs for Tinashe Bricks.", wrong: [(14000 / 6000) * 100, 30], explanation: "14,000 ÷ (14,000 + 6,000) × 100 = 70%." }),
        P.short({ label: "(b)", marks: 1, stem: "Which firm is the most capital-intensive?", accepted: ["Zandia Steel", "Zandia"], explanation: "Zandia Steel has the lowest labour share (13.3%)." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why Kariba Fishing Co-op might use labour-intensive methods.",
          points: ["Labour is cheaper or more abundant than capital in the area.", "Fishing with small boats and nets needs many workers.", "Little capital is available to the co-op, so it relies on the factor it has."],
          modelAnswer: "The co-op probably finds labour more abundant and cheaper than capital, and fishing from small boats with nets needs many workers. With little capital available, it relies on the factor it has in plenty." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether Zandia Steel should switch to more labour-intensive methods.",
          points: ["More jobs and lower capital costs if labour is cheap.", "But output per worker and quality may be lower.", "Steel production needs heavy machinery and cannot easily be done by hand.", "A conclusion: only partly, since technology limits the choice."],
          modelAnswer: "More labour-intensive methods might create jobs and reduce spending on machinery, but they would lower output per worker and the quality of steel, and much of the process cannot be done by hand. On balance Zandia Steel should stay capital-intensive, although it may use extra labour in tasks that do not need machines." }),
      ],
      explanation: "Labour shares are 70%, 75% and 13.3%; Zandia Steel is the most capital-intensive." });
  }

  // Structured 2: resources and sustainability.
  {
    const stock = 5000, rate = 0.03, regrow = stock * rate, cut = 200;
    chk(regrow, 150);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, applies: ZIM, hints: ["Compare the cut with the regrowth."],
      stem: "A fictional community forest has 5,000 hectares of trees. If left uncut the forest regrows by 3% a year. The community cuts 200 hectares each year for firewood and building.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: regrow, unit: "units", stem: "Calculate the number of hectares by which the forest regrows each year.", wrong: [3, 200], explanation: "5,000 × 0.03 = 150 hectares." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: cut - regrow, unit: "units", stem: "By how many hectares does the forest shrink each year?", wrong: [150, 200], explanation: "Cut 200 − regrowth 150 = 50 hectares." }),
        P.mcq({ label: "(c)", marks: 1, stem: "What type of resource is the forest?",
          options: [["Renewable", "Correct: trees regrow."], ["Non-renewable", "Trees regenerate."], ["A free good", "Wood has an opportunity cost."], ["Physical capital", "It is a natural resource."]],
          answer: "A", explanation: "Trees regenerate, so the forest is a renewable resource." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain **two** ways the community could use the forest sustainably.",
          points: ["Limit cutting to no more than the regrowth (150 hectares).", "This keeps the stock of trees constant for the future.", "Replant trees or use alternative fuels.", "This raises the regrowth or reduces the pressure on the forest."],
          modelAnswer: "The community could limit cutting to the regrowth of 150 hectares a year, so that the stock of trees does not fall. It could also replant cleared areas or use other fuels, which would increase the forest's regrowth or reduce the demand for wood." }),
      ],
      explanation: "Regrowth is 150 ha; cutting 200 ha means a net loss of 50 ha a year; the forest is renewable but used unsustainably." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the contribution of different factors.", "Judge which is most important and why."],
    stem: "Evaluate whether the quality of a country's labour force is more important than the quantity of its natural resources in explaining its output.",
    points: ["Natural resources provide raw materials and export income.", "Resources need labour and capital to be used.", "Countries with few resources but skilled labour have grown rapidly.", "Human capital raises productivity and allows innovation.", "Resource-rich countries may depend on primary exports whose prices fluctuate.", "Quantity of resources sets limits for some industries (e.g. mining, tourism).", "Quality of labour depends on education and health, which need resources.", "A justified conclusion that both matter, but human capital is usually more important in the long run."],
    levels: LV8,
    modelAnswer: "Natural resources such as minerals and farmland provide raw materials and export earnings, and a country such as Zimbabwe with platinum, gold and fertile soil has an advantage in those industries. However, resources must be extracted and processed by skilled workers with capital, and countries with few resources but well-educated workers have grown quickly by making high-value goods and services. Resource-based incomes also depend on world prices that can fall. On the other hand, skilled labour cannot produce minerals that do not exist, and good education needs resources to pay for it. Overall both matter, but over the long run the quality of the labour force is usually more important because it allows a country to use and add value to whatever resources it has.",
    wordLimit: { min: 100, max: 300 },
    explanation: "A balanced assessment of resource endowment against human capital." });

  b.card("DEFINITION", "Name the **four factors of production**.", "Land, labour, capital and enterprise.");
  b.card("DEFINITION", "Define **capital** in economics.", "Man-made goods used to produce other goods and services, such as machines, tools and buildings. It does not mean money.");
  b.card("DEFINITION", "Define **human capital**.", "The knowledge, skills and health of workers that make them more productive.");
  b.card("CONCEPT", "What is the difference between a **renewable** and a **non-renewable** resource?", "Renewable resources can regenerate (forests, fish); non-renewable resources cannot be replaced in human time (coal, platinum).");
  b.card("CONCEPT", "What is the reward to each factor of production?", "Land: rent. Labour: wages. Capital: interest. Enterprise: profit.");
  b.card("CONCEPT", "What makes production **labour-intensive**?", "A high proportion of labour relative to capital, for example a high share of labour in total costs.");
  b.card("DEFINITION", "Distinguish **occupational** from **geographical** mobility.", "Occupational: moving to a different type of job. Geographical: moving to a different place.", null, { applies: undefined });
  b.card("CONCEPT", "What is meant by **sustainable use** of a resource?", "Using it so that future generations can use it too, for example cutting no more than the regrowth.", "ZIMSEC detail.", { applies: ZIM });
});
