// W4a: econ.population.effects — optimum, over- and under-population; effects of changes in size, age and gender
// structure; dependency ratio; population and development. Figures differ from the lesson's worked examples.
import { concept, P, table, dependencyRatio, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.population.effects", { file: "population/effects", keyPrefix: "population.effects" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The optimum population of a country is the population that",
    options: [
      ["gives the highest output per head with existing resources and technology.", "Correct: optimum is defined by output per head."],
      ["gives the highest total output the country could ever produce.", "Total output may keep rising after output per head starts to fall."],
      ["is the largest that the country's land can physically hold.", "That is not an economic definition."],
      ["has an equal number of males and females in every age group.", "That describes structure, not size."],
    ],
    answer: "A",
    explanation: "Optimum population maximises output (income) per head, given resources and technology.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a sign that a country is **over-populated**?",
    options: [
      ["High unemployment and shortages of land and housing", "Correct: too many people for the available resources."],
      ["Shortages of workers in many industries", "This suggests under-population."],
      ["Large areas of fertile land left unused", "This suggests under-population."],
      ["Wages that are rising quickly because labour is scarce", "Scarce labour suggests under-population."],
    ],
    answer: "A",
    explanation: "Over-population shows in unemployment, pressure on land, housing and services, and low output per head.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would most likely **raise** a country's optimum population?",
    options: [
      ["New technology that raises output from the same resources", "Correct: more output per worker means a larger population can be supported at the highest output per head."],
      ["A fall in the birth rate over the next ten years", "This changes the actual population, not the optimum."],
      ["Severe soil erosion on much of the farmland", "Fewer productive resources lower the optimum."],
      ["An increase in the emigration of young workers", "This changes the actual population, not the optimum."],
    ],
    answer: "A",
    explanation: "The optimum depends on resources and technology; improvements raise it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group is counted as **dependants** in the dependency ratio?",
    options: [
      ["Children under 15 and people aged 65 and over", "Correct: these age groups are usually treated as dependants."],
      ["Unemployed people of working age", "They are of working age, even if not working."],
      ["Workers in the informal sector", "They are part of the working-age population."],
      ["All women who are not in paid employment", "The ratio is based on age, not employment."],
    ],
    answer: "A",
    explanation: "The dependency ratio compares the young and elderly with the population aged 15 to 64.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the most likely effect of an **ageing** population on government finances?",
    options: [
      ["Pension and health spending rises as the share of taxpayers falls", "Correct: more elderly people and relatively fewer workers."],
      ["Spending on primary schools rises sharply over time", "Fewer children means less need for primary schools."],
      ["Tax revenue rises because more people are now retired", "Retired people usually pay less income tax."],
      ["Spending on pensions falls because people live longer", "Longer lives mean pensions are paid for longer."],
    ],
    answer: "A",
    hints: ["Who receives pensions, and who pays for them?"],
    explanation: "An ageing population raises spending on pensions and care while the working population that pays taxes shrinks relative to it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many men from a rural district migrate to work in mines and towns. Which effect on the district is most likely?",
    options: [
      ["More households are headed by women farming alone", "Correct: the gender structure shifts towards women."],
      ["The number of men living in the district rises", "Men are leaving the district."],
      ["The district's dependency ratio falls sharply", "Working-age men leave, so the ratio of dependants to working-age people tends to rise."],
      ["Remittances sent to the district stop completely", "Migrants usually send money home."],
    ],
    answer: "A",
    hints: ["Which group is leaving, and who remains?"],
    explanation: "Male out-migration leaves more female-headed households, changes farm labour and makes households rely on remittances.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country's working-age population is about to grow rapidly as a large generation of children reaches 15. When is this most likely to raise output per head?",
    options: [
      ["When investment creates enough jobs for the new workers", "Correct: extra workers raise output only if employed productively."],
      ["When the birth rate also rises at the same time", "More children would raise dependency again."],
      ["When the new workers have had little or no education", "Low skills limit the gain in output."],
      ["When the government reduces spending on training", "Less training lowers productivity."],
    ],
    answer: "A",
    hints: ["A larger labour force is a benefit only if…"],
    explanation: "The demographic dividend depends on jobs, capital and skills; otherwise unemployment rises.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A country is below its optimum population. What would be the effect of a moderate rise in its population?",
    options: [
      ["Output per head would rise as resources are used more fully", "Correct: below the optimum, more people raise output per head."],
      ["Output per head would fall because of diminishing returns", "That happens above the optimum."],
      ["Total output would fall because of overcrowding", "Below the optimum, total output rises with population."],
      ["Output per head would stay exactly the same", "It changes as population moves towards the optimum."],
    ],
    answer: "A",
    hints: ["Under-population means resources are not fully used."],
    explanation: "An under-populated country gains from more people: specialisation and fuller use of resources raise output per head.",
  });

  // Numericals.
  const young = 4.6, work = 7.25, old = 0.475;
  const dr = dependencyRatio(young + old, work);
  check("dr", dr, 70);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: dr, daily: true, calculator: true,
    stem: `A fictional country has ${fmt(young, 1)} million people under 15, ${fmt(work, 2)} million aged 15 to 64 and ${fmt(old, 3)} million elderly people above working age. Calculate the dependency ratio (dependants per 100 people of working age).`,
    wrong: [(young / work) * 100, (work / (young + old)) * 100],
    explanation: `Dependants = ${fmt(young, 1)} + ${fmt(old, 3)} = ${fmt(young + old, 3)} million. Ratio = ${fmt(young + old, 3)} ÷ ${fmt(work, 2)} × 100 = **${fmt(dr)}**. Using only the young (${fmt((young / work) * 100, 1)}) leaves out the elderly.`,
  });
  const pops = [3, 5, 7, 9], outs = [5400, 10500, 13300, 15300];
  const ph = pops.map((p, i) => outs[i] / p), best = pops[ph.indexOf(Math.max(...ph))];
  check("ph", ph[1], 2100); check("best", best, 5);
  const T0 = table(["Population (million)", "Total output (US\\$ million)"], pops.map((p, i) => [p, outs[i]]));
  b.num({
    d: 3, skill: "ANALYSIS", kind: "plain", value: best,
    stem: `The table shows the total output of a fictional country at different population sizes, with fixed resources and technology.\n\n${T0}\n\nWhat is the optimum population, in millions?`,
    wrong: [pops[pops.length - 1]],
    hints: ["Work out output per head at each population."],
    explanation: `Output per head: ${pops.map((p, i) => `${p} million → US\\$${fmt(ph[i])}`).join("; ")}. The highest output per head (US\\$${fmt(Math.max(...ph))}) is at **${best} million**. ${pops[pops.length - 1]} million gives the highest total output but a lower output per head.`,
  });
  const wap = 9.6, under15 = 6.24, over65 = 0.48, lfRate = 0.75;
  const ratioA = dependencyRatio(under15 + over65, wap), workers = wap * lfRate, ratioW = ((under15 + over65 + (wap - workers)) / workers) * 100;
  check("ratioA", ratioA, 70); check("ratioW", ratioW, 126.6666667);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: ratioW, dp: 1, tol: 0.05, calculator: true,
    stem: `A fictional country has ${fmt(under15, 2)} million people under 15, ${fmt(wap, 1)} million aged 15 to 64 and ${fmt(over65, 2)} million elderly people above working age. Only 75% of the people aged 15 to 64 are working. How many people who are **not working** are there for every 100 **workers**? Count children, the elderly and working-age adults without work. Give your answer to one decimal place.`,
    wrong: [ratioA],
    hints: ["Find the number of workers: 75% of the working-age population.", "Everyone else is supported by the workers."],
    explanation: `1. Workers = 75% × ${fmt(wap, 1)} = ${fmt(workers, 1)} million.\n2. People not working = ${fmt(under15, 2)} + ${fmt(over65, 2)} + (${fmt(wap, 1)} − ${fmt(workers, 1)}) = ${fmt(under15 + over65 + wap - workers, 2)} million.\n3. Per 100 workers = ${fmt(under15 + over65 + wap - workers, 2)} ÷ ${fmt(workers, 1)} × 100 = **${fmt(ratioW, 1)}**.\n4. The ordinary dependency ratio is ${fmt(ratioA)}, which understates the burden because not all working-age people work.`,
  });
  const pOld = 1.26, wNow = 14.0, pNew = 1.82, wNew = 14.7;
  const oad0 = dependencyRatio(pOld, wNow), oad1 = dependencyRatio(pNew, wNew);
  check("oad0", oad0, 9); check("oad1", oad1, 12.380952);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: oad1 - oad0, dp: 1, tol: 0.05, calculator: true,
    stem: `In a fictional country the number of elderly people above working age rises from ${fmt(pOld, 2)} million to ${fmt(pNew, 2)} million over 20 years, while the population aged 15 to 64 rises from ${fmt(wNow, 1)} million to ${fmt(wNew, 1)} million. By how much does the old-age dependency ratio (elderly per 100 of working age) rise? Give your answer to one decimal place.`,
    wrong: [((pNew - pOld) / wNow) * 100],
    hints: ["Calculate the ratio at the start and at the end."],
    explanation: `1. Start: ${fmt(pOld, 2)} ÷ ${fmt(wNow, 1)} × 100 = ${fmt(oad0, 1)}.\n2. End: ${fmt(pNew, 2)} ÷ ${fmt(wNew, 1)} × 100 = ${fmt(oad1, 1)}.\n3. Rise = **${fmt(oad1 - oad0, 1)}** elderly per 100 people of working age: the population is ageing.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "An under-populated country has too few people to make full use of its resources.",
    answer: true,
    explanation: "True. More people would raise output per head.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fall in the birth rate will, in the short run, reduce the youth dependency ratio.",
    answer: true,
    explanation: "True. Fewer children are born, so there are fewer young dependants per person of working age.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each population change with its most likely economic effect.",
    pairs: [
      ["A rapidly rising number of children", "More government spending on schools and child health"],
      ["A rising share of people over 65", "Higher spending on pensions and healthcare"],
      ["Fast growth of the working-age population with few new jobs", "Rising unemployment and underemployment"],
      ["Emigration of many young adults", "Labour shortages and a higher dependency ratio"],
    ],
    hints: ["Think about who needs what at each age."],
    explanation: "The age structure determines where public spending goes and how large the labour force is.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "If a country's population is above its optimum, it is {{blank:a}}. A rise in population would then make output per head {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["over-populated"], choices: ["over-populated", "under-populated"] },
      { id: "b", accepted: ["fall"], choices: ["fall", "rise"] },
    ],
    wrong: [["under-populated", "rise"]],
    explanation: "Above the optimum, extra people reduce output per head because of diminishing returns.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits of a growing population for an economy.",
    points: [
      "Identifies: a larger labour force.",
      "Explains: more workers can raise total output, if jobs and capital are available.",
      "Identifies: a larger market.",
      "Explains: firms sell more and produce on a larger scale, gaining economies of scale / more investment.",
    ],
    modelAnswer: "First, a growing population provides a larger labour force, so the economy can produce more goods and services if there is enough capital and jobs. Second, it creates a bigger market: firms can sell more, produce on a larger scale and lower their average costs, which encourages investment.",
    hints: ["Think about people as workers and as consumers."],
    explanation: "Each benefit: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a high dependency ratio can slow economic development.",
    points: [
      "Each worker supports many dependants, so household income per person is low.",
      "Households spend most income on food and school costs, so saving is low.",
      "Low saving means less investment, so productivity and growth are slow.",
      "Government must spend heavily on schools and health for children (or pensions), leaving less for infrastructure / requiring higher taxes.",
    ],
    modelAnswer: "With a high dependency ratio, each worker supports many children or elderly people, so income per person in the household is low and most of it is spent on food and school costs. Little is left for saving, so there is less finance for investment and productivity grows slowly. The government must also spend a large share of its budget on schools and clinics for children, leaving less for roads, power and other infrastructure that would raise growth.",
    hints: ["Think about saving, investment and government spending."],
    explanation: "One mark per link in the chain.",
  });

  // Structured 1: age structure of two countries.
  const S = {
    G: { u15: 7.2, w: 10.0, o65: 0.4 },
    H: { u15: 1.5, w: 6.0, o65: 1.8 },
  };
  const dG = dependencyRatio(S.G.u15 + S.G.o65, S.G.w), dH = dependencyRatio(S.H.u15 + S.H.o65, S.H.w);
  check("dG", dG, 76); check("dH", dH, 55);
  const T1 = table(["Age group (million people)", "Country G", "Country H"], [["Under 15", fmt(S.G.u15, 1), fmt(S.H.u15, 1)], ["15 to 64", fmt(S.G.w, 1), fmt(S.H.w, 1)], ["Elderly (above working age)", fmt(S.G.o65, 1), fmt(S.H.o65, 1)]]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the age structure of two fictional countries.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: dG, stem: "Calculate the dependency ratio of Country G (dependants per 100 people aged 15 to 64).", wrong: [(S.G.u15 / S.G.w) * 100], explanation: `(${fmt(S.G.u15, 1)} + ${fmt(S.G.o65, 1)}) ÷ ${fmt(S.G.w, 1)} × 100 = ${fmt(dG)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: dH, stem: "Calculate the dependency ratio of Country H.", wrong: [(S.H.o65 / S.H.w) * 100], explanation: `(${fmt(S.H.u15, 1)} + ${fmt(S.H.o65, 1)}) ÷ ${fmt(S.H.w, 1)} × 100 = ${fmt(dH)}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which statement about the two countries is correct?",
        options: [
          ["G has a young population; H has an ageing population", "Correct: G has many children; H has more elderly than children."],
          ["G has an ageing population; H has a young population", "The reverse is true."],
          ["Both have ageing populations", "G has very few elderly people."],
          ["Both have young populations", "H has fewer children than elderly people."],
        ],
        answer: "A",
        explanation: `G: ${fmt(S.G.u15, 1)} million children and ${fmt(S.G.o65, 1)} million elderly; H: ${fmt(S.H.u15, 1)} million children and ${fmt(S.H.o65, 1)} million elderly.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **one** problem that Country H is likely to face in future.",
        points: [
          "Identifies: rising pension and healthcare costs / labour shortages.",
          "Explains: the elderly share is large and growing, while few children will join the labour force.",
          "Develops: higher taxes on a shrinking workforce / slower growth / need for immigration or later retirement.",
        ],
        modelAnswer: "Country H has more elderly people than children, so in future the number of pensioners will rise while few young people join the labour force. The cost of pensions and healthcare will rise, and it will have to be paid by a shrinking number of workers through higher taxes; labour shortages may also slow economic growth unless retirement ages rise or workers are attracted from abroad.",
        explanation: "Identify (1), explain (1), develop (1).",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether Country G's age structure is an advantage or a disadvantage for its economic development.",
        points: [
          "Disadvantage now: high dependency ratio; heavy spending on schools and child health; low saving.",
          "Advantage later: a large future labour force and growing market (demographic dividend).",
          "Depends on: jobs, investment, education and health; otherwise unemployment and pressure on resources.",
          "Justified conclusion.",
        ],
        modelAnswer: `Country G's dependency ratio of ${fmt(dG)} is high, almost all because of children, so it must spend heavily on schools and child health, and households save little. However, these children will soon form a large labour force and a growing market, which could raise output and attract investment. Whether this is an advantage depends on whether the government invests in education and health and the economy creates enough jobs; if not, the result will be unemployment and pressure on land and services. In the short run the age structure is a burden, but with the right investment it can become an advantage.`,
        explanation: "Short-run burden versus long-run potential; conclude on what it depends on.",
      }),
    ],
    hints: ["Dependants = under 15 + 65 and over.", "Dependency ratio = dependants ÷ working-age population × 100."],
    explanation: `Dependency ratios: G ${fmt(dG)}, H ${fmt(dH)}. G is young; H is ageing.`,
  });

  // Structured 2: falling population through emigration.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country's population has started to fall. The birth rate has dropped, and many young adults have emigrated to find work abroad, sending money home to their families. Some rural schools have closed, and farmers report shortages of labour at harvest time.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "Emigration of young adults tends to raise the dependency ratio of the country they leave.",
        answer: true,
        explanation: "True. Working-age people leave, while dependants mostly remain.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** benefit to the country of the money sent home by emigrants.",
        points: ["Remittances raise the incomes of families at home, so spending and living standards rise.", "They bring in foreign currency / can finance school fees, housing or small businesses."],
        modelAnswer: "Remittances raise the incomes of families at home, who spend them on food, school fees and housing; they also bring foreign currency into the country, which helps pay for imports.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether a falling population is likely to harm this country's economy.",
        points: [
          "Harm: labour shortages (e.g. at harvest), lower output; loss of skilled young workers.",
          "Harm: smaller market and tax base; higher dependency ratio; services such as schools close.",
          "Benefit: less pressure on land, jobs and services; output per head may rise if the country was over-populated.",
          "Benefit: remittances raise household incomes and foreign currency.",
          "Justified conclusion, e.g. harmful if skilled workers keep leaving; depends on whether the country was above its optimum.",
        ],
        modelAnswer: "A falling population can harm the economy: farmers already face labour shortages at harvest, so output may fall, and the young adults leaving are the most productive workers. A smaller population also means a smaller market and fewer taxpayers, while dependants remain, so the dependency ratio rises and services such as rural schools close. On the other hand, if the country was over-populated, fewer people means less pressure on land, jobs and services and could raise output per head, and remittances raise family incomes and bring in foreign currency. Overall the fall is likely to be harmful because it is caused by the loss of young workers, so policies to create jobs at home are needed.",
        explanation: "Weigh labour shortages and dependency against reduced pressure and remittances; conclude.",
      }),
    ],
    hints: ["Who is leaving, and who stays behind?"],
    explanation: "A falling population caused by emigration of young adults raises dependency and causes labour shortages, partly offset by remittances.",
  });

  b.card("DEFINITION", "Define **optimum population**.", "The population that gives the highest output per head with existing resources and technology.");
  b.card("DEFINITION", "What is **over-population**?", "More people than resources and technology can support at the highest output per head; output per head would rise with fewer people.");
  b.card("DEFINITION", "What is **under-population**?", "Too few people to use resources fully; output per head would rise with more people.");
  b.card("FORMULA", "Dependency ratio = ?", "(Under-15s + people 65 and over) ÷ population aged 15 to 64 × 100.");
  b.card("CONCEPT", "Give two effects of an ageing population.", "Higher spending on pensions and healthcare; fewer workers relative to dependants (higher taxes); possible labour shortages; new markets for the elderly.");
  b.card("CONCEPT", "Give two effects of a very young population.", "High spending on education and child health; low saving; a large future labour force needing jobs.");
  b.card("CONCEPT", "Give two benefits and two costs of a growing population.", "Benefits: larger labour force, bigger market. Costs: pressure on services and land, unemployment if jobs lag.");
  b.card("FACT", "What can raise a country's optimum population?", "New technology, more capital or newly discovered resources, which raise output at every population size.");
  b.card("CONCEPT", "How can male out-migration change a rural district?", "More female-headed households, labour shortages on farms, dependence on remittances.");
});
