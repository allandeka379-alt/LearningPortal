// W4a: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x2: population and dependency
// data; growth and development indicators. Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6,
// EVALUATION) x2. Fictional data, computed and checked here.
import { concept, P, ZIM, table, population, dependencyRatio, nationalIncome, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.population.effects", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2 (1): population and dependency data.
  {
    const A = { u: 5.4, w: 6.75, e: 0.45 }, B = { u: 6.12, w: 8.16, e: 0.5 };
    const totA = A.u + A.w + A.e, totB = B.u + B.w + B.e;
    check("totA", totA, 12.6); check("totB", totB, 14.78);
    const depA = dependencyRatio(A.u + A.e, A.w), depB = dependencyRatio(B.u + B.e, B.w);
    const popM = totB * 1e6, births = Math.round((popM * 34) / 1000), deaths = Math.round((popM * 9) / 1000), imm = 18400, emi = 76200;
    check("births", births, 502520); check("deaths", deaths, 133020);
    const br = population.ratePerThousand(births, popM), chg = births - deaths + (imm - emi), gr = (chg / popM) * 100;
    check("br", br, 34);
    const grow = { u: pctChange(A.u, B.u), w: pctChange(A.w, B.w), e: pctChange(A.e, B.e) };
    check("grow w", grow.w, 20.8888889);
    const T1 = table(["Age group (million people)", "Census year 1", "Census year 2 (ten years later)"], [
      ["Under 15", fmt(A.u, 2), fmt(B.u, 2)],
      ["Working age (15 to 64)", fmt(A.w, 2), fmt(B.w, 2)],
      ["Elderly (above working age)", fmt(A.e, 2), fmt(B.e, 2)],
    ]);
    const T2 = table(["In the year after census year 2", "Number of people"], [["Live births", births], ["Deaths", deaths], ["Immigrants", imm], ["Emigrants", emi]]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2", calculator: true,
      concepts: ["econ.population.effects", "econ.population.growth-distribution", "econ.population.labour-force"],
      stem: `Country T is a fictional country in southern Africa. Most of its people live in rural areas and depend on small-scale farming, although towns are growing quickly. Two national censuses, ten years apart, produced the data in Table 1. Table 2 shows population changes in the year after the second census. Many of the emigrants are young teachers and artisans who have found work in neighbouring countries.\n\n**Table 1: Population of Country T by age group**\n\n${T1}\n\n**Table 2: Births, deaths and migration**\n\n${T2}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: totB, dp: 2, tol: 0.005, stem: "Calculate the total population of Country T in census year 2, in millions.", wrong: [B.u + B.w], explanation: `${fmt(B.u, 2)} + ${fmt(B.w, 2)} + ${fmt(B.e, 2)} = ${fmt(totB, 2)} million.` }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: depB, dp: 1, tol: 0.05, stem: "Calculate the dependency ratio in census year 2 (dependants per 100 people of working age). Give your answer to one decimal place.", wrong: [(B.u / B.w) * 100, (B.w / (B.u + B.e)) * 100], explanation: `(${fmt(B.u, 2)} + ${fmt(B.e, 2)}) ÷ ${fmt(B.w, 2)} × 100 = ${fmt(B.u + B.e, 2)} ÷ ${fmt(B.w, 2)} × 100 = ${fmt(depB, 1)} (it was ${fmt(depA, 1)} in census year 1).` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: br, stem: "Using Table 2 and the population in census year 2, calculate the birth rate per 1,000 people.", wrong: [(births / popM) * 100], explanation: `${fmt(births)} ÷ ${fmt(popM)} × 1,000 = ${fmt(br)} per 1,000.` }),
        P.num({ label: "(d)", marks: 3, kind: "pct", value: gr, stem: "Calculate the percentage growth of the population in the year after census year 2, including migration. Give your answer to one decimal place.", wrong: [((births - deaths) / popM) * 100, ((births - deaths + imm + emi) / popM) * 100], explanation: `Natural increase = ${fmt(births)} − ${fmt(deaths)} = ${fmt(births - deaths)}; net migration = ${fmt(imm)} − ${fmt(emi)} = ${fmt(imm - emi)}; change = ${fmt(chg)}; ${fmt(chg)} ÷ ${fmt(popM)} × 100 = ${pct(gr, 1)}.` }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "Which age group grew by the largest percentage between the two censuses?",
          options: [
            ["Working age", `Correct: +${fmt(grow.w, 1)}%.`],
            ["Under 15", `+${fmt(grow.u, 1)}%.`],
            ["Elderly", `+${fmt(grow.e, 1)}%.`],
            ["All three grew by the same percentage", "The percentages differ."],
          ],
          answer: "A",
          explanation: `Under 15 +${fmt(grow.u, 1)}%, working age +${fmt(grow.w, 1)}%, elderly +${fmt(grow.e, 1)}%.`,
        }),
        P.fib({
          label: "(f)", marks: 2,
          stem: "Complete the sentence using Table 2.",
          template: "In the year after census year 2, Country T had a natural {{blank:a}} of population and net {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["increase"], choices: ["increase", "decrease"] },
            { id: "b", accepted: ["emigration"], choices: ["emigration", "immigration"] },
          ],
          wrong: [["decrease", "immigration"]],
          explanation: "Births exceeded deaths (natural increase), and more people left than arrived (net emigration).",
        }),
        P.manual({
          label: "(g)", marks: 3,
          stem: "Explain **three** reasons why the birth rate in Country T is high.",
          points: [
            "Most people depend on small-scale farming: children provide labour and support parents in old age.",
            "Limited access to family planning / little education for girls, so early marriage.",
            "High infant mortality or cultural values that favour large families.",
          ],
          modelAnswer: "First, most families farm small plots, so children are valued for their labour and as support for parents in old age. Second, in rural areas girls often leave school early and family-planning services are hard to reach, so women marry young and have more children. Third, where infant mortality is high, parents have more children to make sure some survive, and many communities value large families.",
          explanation: "One mark per explained reason.",
        }),
        P.manual({
          label: "(h)", marks: 6, levels: LV(6),
          stem: "Discuss the likely effects of Country T's population changes on its economic development.",
          points: [
            `Positive: the working-age population grew fastest (+${fmt(grow.w, 1)}%) and the dependency ratio fell (${fmt(depA, 1)} to ${fmt(depB, 1)}), so more people can work and save.`,
            "Positive: a larger labour force and market can raise output and attract investment (a possible demographic dividend).",
            `Negative: population still grows by about ${pct(gr, 1)} a year; many children need schools and clinics; pressure on land and urban services.`,
            "Negative: if jobs are not created, the growing labour force means unemployment and underemployment.",
            "Negative: emigration of young teachers and artisans (brain drain) reduces skills and the quality of services.",
            "Justified conclusion: the change can help development only if jobs, education and skills keep up and skilled workers are kept.",
          ],
          modelAnswer: `The working-age population grew faster than the other groups, by ${fmt(grow.w, 1)}%, so the dependency ratio fell from ${fmt(depA, 1)} to ${fmt(depB, 1)}. This could help development: more people are able to work, households have fewer dependants each, and saving and investment can rise, while a larger market attracts firms. However, the population is still growing by about ${pct(gr, 1)} a year with a high birth rate, so the government must keep building schools and clinics, and pressure on farmland and on the fast-growing towns will increase. If jobs are not created fast enough, the extra workers will be unemployed or underemployed. The emigration of young teachers and artisans also removes skills that the country needs. Overall the changes give Country T an opportunity, but they will promote development only if investment creates jobs, education keeps up and skilled workers are encouraged to stay.`,
          explanation: "Weigh the falling dependency ratio and larger labour force against rapid growth, job shortages and the brain drain; conclude.",
        }),
      ],
      explanation: `Total population year 2: ${fmt(totB, 2)} million; dependency ratio ${fmt(depA, 1)} → ${fmt(depB, 1)}; birth rate ${fmt(br)} per 1,000; population growth ${pct(gr, 1)}.`,
      hints: ["Dependency ratio = (under 15 + elderly) ÷ working age × 100.", "Rates per 1,000 use the population at the start of the year.", "Population change = natural increase + net migration."],
    });
  }

  // ---------------- Paper 2 (2): growth and development indicators.
  {
    const V = { g0: 13280, g1: 17264, p0: 8.0, p1: 9.6, le0: 58, le1: 57, lit0: 79, lit1: 78, el0: 33, el1: 31 };
    const W = { g0: 9660, g1: 11109, p0: 6.9, p1: 7.4, le0: 59, le1: 65, lit0: 80, lit1: 89, el0: 29, el1: 46 };
    const ph = (c, k) => nationalIncome.perHead(c[`g${k}`], c[`p${k}`]);
    const phV = [ph(V, 0), ph(V, 1)], phW = [ph(W, 0), ph(W, 1)];
    check("phV0", phV[0], 1660); check("phV1", phV[1], 1798.3333333); check("phW0", phW[0], 1400); check("phW1", phW[1], 1501.2162162);
    const gV = pctChange(V.g0, V.g1), phVch = pctChange(phV[0], phV[1]), phWch = pctChange(phW[0], phW[1]);
    check("gV", gV, 30);
    const T = table(["Indicator", "Country V 2016", "Country V 2026", "Country W 2016", "Country W 2026"], [
      ["Real GDP (US\\$ million, 2016 prices)", V.g0, V.g1, W.g0, W.g1],
      ["Population (million)", fmt(V.p0, 1), fmt(V.p1, 1), fmt(W.p0, 1), fmt(W.p1, 1)],
      ["Life expectancy (years)", V.le0, V.le1, W.le0, W.le1],
      ["Adult literacy rate (%)", V.lit0, V.lit1, W.lit0, W.lit1],
      ["Households with electricity (%)", V.el0, V.el1, W.el0, W.el1],
    ]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2", calculator: true,
      concepts: ["econ.growth.economic-growth", "econ.development.meaning-indicators"],
      stem: `Countries V and W are fictional neighbouring countries. Over ten years, Country V's growth was led by new foreign-owned diamond and coal mines that employ few local people. Country W grew more slowly, but its government spent heavily on rural clinics, schools and electricity, paid for partly by tax revenue from commercial farming.\n\n**Table 3: Indicators for Countries V and W**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: phV[1], dp: 2, tol: 0.006, stem: "Calculate Country V's real GDP per head in 2026, in US\\$ to two decimal places.", wrong: [V.g1 / V.p0], explanation: `${fmt(V.g1)} million ÷ ${fmt(V.p1, 1)} million = US\\$${fmt(phV[1], 2)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: gV, stem: "Calculate the percentage increase in Country V's real GDP between 2016 and 2026. Give your answer to one decimal place.", wrong: [((V.g1 - V.g0) / V.g1) * 100], explanation: `(${fmt(V.g1)} − ${fmt(V.g0)}) ÷ ${fmt(V.g0)} × 100 = ${pct(gV, 1)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "pct", value: phVch, stem: "Calculate the percentage change in Country V's real GDP per head between 2016 and 2026. Give your answer to one decimal place.", wrong: [gV, gV - pctChange(V.p0, V.p1)], explanation: `2016: ${fmt(V.g0)} ÷ ${fmt(V.p0, 1)} = US\\$${fmt(phV[0])}. 2026: US\\$${fmt(phV[1], 2)}. Change = (${fmt(phV[1], 2)} − ${fmt(phV[0])}) ÷ ${fmt(phV[0])} × 100 = ${pct(phVch, 1)}. Real GDP grew ${pct(gV, 0)} but population grew ${pct(pctChange(V.p0, V.p1), 0)}.` }),
        P.mcq({
          label: "(d)", marks: 1,
          stem: "Which country had the larger percentage rise in real GDP per head between 2016 and 2026?",
          options: [
            ["Country V", `Correct: V ${pct(phVch, 1)}, W ${pct(phWch, 1)}.`],
            ["Country W", `W's real GDP per head rose by ${pct(phWch, 1)}, less than V's.`],
            ["Both rose by the same percentage", "The percentages differ."],
            ["Neither: real GDP per head fell in both", "It rose in both countries."],
          ],
          answer: "A",
          explanation: `W: ${fmt(W.g0)} ÷ ${fmt(W.p0, 1)} = US\\$${fmt(phW[0])} → ${fmt(W.g1)} ÷ ${fmt(W.p1, 1)} = US\\$${fmt(phW[1], 2)}, a rise of ${pct(phWch, 1)}.`,
        }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "Which change in Table 3 is the clearest sign of economic development?",
          options: [
            ["The rise in Country W's adult literacy rate", "Correct: better education is a sign of development."],
            ["The rise in Country V's total real GDP", "This is a sign of growth, not necessarily development."],
            ["The rise in Country V's total population", "Population growth is not development."],
            ["The fall in Country V's life expectancy", "This shows worsening welfare."],
          ],
          answer: "A",
          explanation: "Higher literacy, longer life expectancy and access to electricity are signs of development.",
        }),
        P.manual({
          label: "(f)", marks: 3,
          stem: "Using Table 3, explain the difference between economic growth and economic development.",
          points: [
            "Growth is an increase in real output (real GDP): V's real GDP rose by 30%.",
            "Development is an improvement in welfare: health, education, services, e.g. W's life expectancy, literacy and electricity rose.",
            "V grew without developing (its welfare indicators fell), so growth does not guarantee development.",
          ],
          modelAnswer: "Economic growth is an increase in a country's real output; Country V's real GDP rose by 30%, so it grew. Economic development is a broader improvement in people's welfare: Country W's life expectancy rose from 59 to 65 years, literacy from 80% to 89% and households with electricity from 29% to 46%, so W developed. Country V's life expectancy, literacy and access to electricity all fell slightly, showing that it grew without developing.",
          explanation: "Define both terms and use the data.",
        }),
        P.manual({
          label: "(g)", marks: 2,
          stem: "Explain **one** reason why Country V's growth did not lead to development.",
          points: ["Mines are foreign-owned and employ few local people, so income goes to foreign owners and a few workers.", "So little of the extra output reached most households or was spent on health, schools and electricity."],
          modelAnswer: "The new mines are foreign-owned and employ few local people, so most of the extra income went to foreign owners and a small number of workers, and little reached ordinary households or was spent on clinics, schools and electricity.",
          explanation: "Identify (1) + explain (1).",
        }),
        P.manual({
          label: "(h)", marks: 6, levels: LV(6),
          stem: "Discuss whether real GDP per head is a good indicator of the standard of living in Countries V and W.",
          points: [
            "Good: simple, widely available, adjusted for inflation and population; V's higher figure shows more output per person.",
            "Poor: it is an average and ignores distribution: V's mining income goes to few people.",
            "Poor: ignores health, education and services: W has higher life expectancy, literacy and electricity despite lower GDP per head.",
            "Poor: misses informal and subsistence output common in rural areas; ignores environmental damage from mining.",
            "Better: use several indicators (HDI, life expectancy, literacy, access to services) together.",
            "Justified conclusion: on this evidence W probably has the higher standard of living, so GDP per head alone is misleading.",
          ],
          modelAnswer: `Real GDP per head is easy to calculate and compare and allows for inflation and population. On this measure Country V looks better off, with about US\\$${fmt(phV[1], 0)} per head against W's US\\$${fmt(phW[1], 0)}. However, it is only an average: V's mining income goes mainly to foreign owners and a few workers, so most people may not share in it. It also ignores health, education and services: W's people now live longer, more can read and almost half of households have electricity, while V's indicators have worsened. It misses subsistence farming and ignores environmental damage from mines. Real GDP per head is therefore a poor guide on its own; using it with life expectancy, literacy and access to services suggests that W's people probably enjoy the higher standard of living.`,
          explanation: "Weigh the strengths of the measure against what it misses, using both countries; conclude.",
        }),
      ],
      explanation: `Real GDP per head: V US\\$${fmt(phV[0])} → US\\$${fmt(phV[1], 2)} (${pct(phVch, 1)}); W US\\$${fmt(phW[0])} → US\\$${fmt(phW[1], 2)} (${pct(phWch, 1)}). V grew faster; W's welfare indicators improved while V's worsened.`,
      hints: ["Real GDP per head = real GDP ÷ population.", "Growth = more output; development = better welfare."],
    });
  }

  // ---------------- Paper 3 essays.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.growth.economic-growth", "econ.development.meaning-indicators"],
    stem: "Economic growth and economic development are important aims of the government of Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain **four** signs of economic development.",
        points: [
          "Higher literacy and school enrolment: more people can read, write and gain skills.",
          "Lower death rates (especially infant mortality) and longer life expectancy: better health care, water and nutrition.",
          "Better infrastructure: roads, electricity, safe water, sanitation and communications reach more people.",
          "Other: better housing / less poverty / more workers in manufacturing and services / more choice and participation.",
        ],
        modelAnswer: "First, literacy rises and more children, including girls, complete school, so people gain the skills to earn more and take part in society. Second, death rates fall, especially infant and maternal mortality, and life expectancy rises, because of better clinics, safe water and nutrition. Third, infrastructure improves: more households have electricity, piped water and sanitation, and roads and telephones connect rural areas to markets. Fourth, absolute poverty falls and more people live in decent housing, with a growing share working in manufacturing and services rather than subsistence farming.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether economic growth always leads to economic development.",
        points: [
          "Growth can lead to development: higher incomes, more jobs and more tax revenue to spend on schools, clinics, roads and water.",
          "Growth makes development affordable: development usually needs growth to pay for it.",
          "But growth may be unequally shared (owners, skilled workers, cities), so many people gain little.",
          "But population may grow faster than output, so real GDP per head falls.",
          "But growth may bring pollution, depletion of minerals and social costs, lowering quality of life; or extra revenue may not be spent on welfare.",
          "Justified conclusion: growth is necessary but not sufficient; development depends on how the gains are shared and used.",
        ],
        modelAnswer: "Economic growth can lead to development. Higher output creates jobs and incomes, and the government collects more tax, which it can spend on schools, clinics, roads and safe water; without growth, development is hard to pay for. However, growth does not always bring development. If the gains go mainly to the owners of mines and firms, to skilled workers or to the cities, many rural households are no better off. If population grows faster than real output, output per person falls. Growth from mining can bring pollution, land degradation and the depletion of minerals, lowering quality of life, and extra tax revenue may be wasted rather than spent on services. Growth is therefore necessary but not sufficient: it leads to development only when its benefits are widely shared and invested in health, education and infrastructure.",
      }),
    ],
    explanation: "Part (a) explains signs of development; part (b) weighs how growth can support development against reasons why it may not.",
    hints: ["(a) Think about health, education, infrastructure and poverty.", "(b) Consider who benefits from growth and what the extra income is used for."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.development.sustainable"],
    stem: "Zimbabwe's natural resources include wildlife, forests and minerals.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain how the CAMPFIRE programme promotes sustainable resource management.",
        points: [
          "Gives rural communities the right to benefit from wildlife in communal areas (revenue from safari hunting and tourism).",
          "Part of the revenue goes to communities for projects (schools, clinics, boreholes) and households.",
          "So communities have an incentive to protect wildlife and report poaching rather than kill animals.",
          "Wildlife is used at a rate that allows numbers to recover (quotas), so income continues for future generations.",
        ],
        modelAnswer: "CAMPFIRE gives rural communities in wildlife areas the right to benefit from the animals around them. Rural district councils earn revenue from safari hunting and tourism, and part of it is paid to communities for projects such as schools, clinics and boreholes, and to households. Because wildlife now brings income, communities have a reason to protect it, report poachers and tolerate animals on their land. Hunting is limited by quotas so that animal numbers can recover, which allows the income to continue for future generations: the resource is used without being used up.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether mining can contribute to sustainable development in Zimbabwe.",
        points: [
          "Yes: mining earns export revenue, taxes and royalties, creates jobs and attracts investment.",
          "Yes: if revenue is invested in education, health and infrastructure (or shared through community share ownership trusts), future generations benefit after the minerals are gone.",
          "No: minerals are non-renewable; once extracted they are gone.",
          "No: mining can cause pollution, land degradation and silting of rivers, harming farming and health (external costs).",
          "Depends on regulation (EMA, impact assessments, land rehabilitation) and on how revenue is used and shared.",
          "Justified conclusion.",
        ],
        modelAnswer: "Mining can contribute to sustainable development. Minerals such as gold, platinum and lithium earn foreign currency and tax revenue, create jobs and attract investment. If the government and community share ownership trusts invest the income in education, health and infrastructure, future generations will benefit even after the minerals have been used. However, minerals are non-renewable, so mining uses up resources that cannot be replaced, and badly managed mining pollutes rivers, degrades land and harms the health of nearby communities, imposing costs on others and on the future. Whether mining is sustainable therefore depends on regulation, such as environmental impact assessments by the Environmental Management Agency and requirements to rehabilitate land, and on whether revenue is invested and fairly shared. Mining can support sustainable development, but only when its environmental costs are controlled and its income is turned into lasting assets.",
      }),
    ],
    explanation: "Part (a) explains how CAMPFIRE links income from wildlife to conservation; part (b) weighs mining's revenue against depletion and environmental damage.",
    hints: ["(a) Who gets the income, and how does that change behaviour?", "(b) Think about non-renewable resources, external costs and how revenue is used."],
  });
});
