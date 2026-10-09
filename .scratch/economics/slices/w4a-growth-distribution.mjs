// W4a: econ.population.growth-distribution — census, birth and death rates, natural increase, migration, factors
// affecting growth, geographical / occupational / age-sex distribution. Figures differ from the lesson's examples.
import { concept, P, ZIM, table, population, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.population.growth-distribution", { file: "population/growth-distribution", keyPrefix: "population.growth-distribution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The birth rate of a country is",
    options: [
      ["the number of live births in a year per 1,000 people.", "Correct: rates are expressed per 1,000 of the population."],
      ["the total number of live births in a year.", "That is a count, not a rate."],
      ["the number of births minus the number of deaths.", "That is natural increase."],
      ["the average number of children born to each woman.", "That is the fertility rate."],
    ],
    answer: "A",
    explanation: "Birth rate = births in the year ÷ population × 1,000.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Net migration is",
    options: [
      ["immigration minus emigration.", "Correct: people arriving minus people leaving."],
      ["emigration minus immigration.", "This reverses the definition."],
      ["births minus deaths.", "That is natural increase."],
      ["the movement of people from rural areas to towns.", "That is urbanisation (internal migration)."],
    ],
    answer: "A",
    explanation: "Net migration = immigrants − emigrants; it is negative when more people leave than arrive.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the main reason why governments conduct a population census?",
    options: [
      ["To plan the provision of schools, clinics, housing and jobs", "Correct: planning needs accurate data on numbers, ages and location."],
      ["To collect income tax from every household", "Tax is collected by the revenue authority, not the census."],
      ["To set the prices of basic goods in shops", "The census does not set prices."],
      ["To decide the interest rate that the central bank will charge banks", "Interest rates are set by the central bank on other grounds."],
    ],
    answer: "A",
    explanation: "Census data show how many people there are, their ages, where they live and what they do, which is needed for planning.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would most likely **reduce** the birth rate of a country?",
    options: [
      ["More girls completing secondary school and taking paid jobs", "Correct: educated women tend to marry later and have fewer children."],
      ["A rise in infant mortality", "Parents may have more children to replace those who die."],
      ["More families depending on their children to work on the family farm", "This makes large families more valuable."],
      ["Reduced access to family-planning services", "This tends to raise the birth rate."],
    ],
    answer: "A",
    explanation: "Education and employment of women, family planning and lower infant mortality reduce birth rates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **push factor** that causes people to emigrate from a country?",
    options: [
      ["High unemployment at home", "Correct: lack of jobs pushes people to leave."],
      ["Higher wages in a neighbouring country", "This is a pull factor of the destination."],
      ["Better hospitals in another country", "This is a pull factor of the destination."],
      ["Job offers from foreign employers", "This is a pull factor."],
    ],
    answer: "A",
    explanation: "Push factors are conditions at home that drive people away; pull factors attract them elsewhere.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A country has a birth rate of 34 per 1,000, a death rate of 11 per 1,000 and no migration. What is its rate of population growth?",
    options: [
      ["2.3% a year", "Correct: (34 − 11) ÷ 1,000 × 100 = 2.3%."],
      ["23% a year", "Natural increase is 23 per 1,000, not per 100."],
      ["4.5% a year", "This adds the death rate instead of subtracting it."],
      ["0.23% a year", "23 per 1,000 is 2.3 per 100."],
    ],
    answer: "A",
    hints: ["Natural increase per 1,000 ÷ 10 gives a percentage."],
    explanation: "Natural increase = 34 − 11 = 23 per 1,000 = 2.3%.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do low-income countries often have faster population growth than high-income countries?",
    options: [
      ["Death rates have fallen, but birth rates remain high", "Correct: healthcare cuts deaths before families become smaller."],
      ["Their birth rates and death rates are both very low", "That leads to slow growth, as in high-income countries."],
      ["Their death rates are higher than their birth rates", "That would make population fall."],
      ["They receive large numbers of immigrants every year", "Many low-income countries experience net emigration."],
    ],
    answer: "A",
    hints: ["Compare the gap between birth and death rates."],
    explanation: "Better health lowers death rates quickly, while birth rates fall only as incomes, education and urbanisation rise.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A population pyramid has a very wide base that narrows quickly towards the top. What does this show?",
    options: [
      ["A high birth rate and a young, fast-growing population", "Correct: many children, few elderly."],
      ["A low birth rate and an ageing population", "An ageing population has a narrow base."],
      ["A population with equal numbers in every age group", "That gives straight, vertical sides."],
      ["A population with more men than women of working age", "The sex balance shows in the two sides, not the shape of the base."],
    ],
    answer: "A",
    hints: ["The base of the pyramid shows the youngest age groups."],
    explanation: "A wide base shows many young children (high birth rate); a narrow top shows few elderly people (relatively high death rates).",
  });

  // Numericals.
  const pop1 = 4800000, births1 = 172800, br1 = population.ratePerThousand(births1, pop1);
  check("br1", br1, 36);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: br1, daily: true,
    stem: `A fictional country has a population of ${fmt(pop1)}. In one year there are ${fmt(births1)} live births. Calculate the birth rate per 1,000 people.`,
    wrong: [(births1 / pop1) * 100],
    explanation: `Birth rate = ${fmt(births1)} ÷ ${fmt(pop1)} × 1,000 = **${br1} per 1,000**. ${fmt((births1 / pop1) * 100, 1)} is the rate per 100 (a percentage).`,
  });
  const imm = 14500, emi = 61200, nm = population.netMigration(imm, emi);
  check("nm", nm, -46700);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: nm,
    stem: `In a year, ${fmt(imm)} people move into a fictional country to live and ${fmt(emi)} people leave it to live abroad. Calculate net migration. Include a minus sign if it is negative.`,
    wrong: [-nm, imm + emi],
    explanation: `Net migration = immigrants − emigrants = ${fmt(imm)} − ${fmt(emi)} = **${fmt(nm)}** (net emigration).`,
  });
  const P0 = 8600000, B = 266600, D = 77400, I = 9300, E = 35100;
  const chg = B - D + (I - E), gr = (chg / P0) * 100;
  check("chg", chg, 163400); check("gr", gr, 1.9);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: gr, calculator: true,
    stem: `A fictional country starts the year with ${fmt(P0)} people. During the year there are ${fmt(B)} births, ${fmt(D)} deaths, ${fmt(I)} immigrants and ${fmt(E)} emigrants. Calculate the percentage growth of the population during the year. Give your answer to one decimal place.`,
    wrong: [((B - D) / P0) * 100, ((B - D + I + E) / P0) * 100],
    hints: ["Population change = natural increase + net migration."],
    explanation: `1. Natural increase = ${fmt(B)} − ${fmt(D)} = ${fmt(B - D)}.\n2. Net migration = ${fmt(I)} − ${fmt(E)} = ${fmt(I - E)}.\n3. Change = ${fmt(B - D)} − ${fmt(E - I)} = ${fmt(chg)}.\n4. Growth = ${fmt(chg)} ÷ ${fmt(P0)} × 100 = **${pct(gr, 1)}**. Ignoring migration gives ${pct(((B - D) / P0) * 100, 1)}.`,
  });
  const occ = { prim: 2232, sec: 558, ter: 930 }, totO = occ.prim + occ.sec + occ.ter, terShare = (occ.ter / totO) * 100;
  check("totO", totO, 3720); check("ter", terShare, 25);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: terShare,
    stem: `In a fictional country, ${fmt(occ.prim)} thousand people work in the primary sector, ${fmt(occ.sec)} thousand in the secondary sector and ${fmt(occ.ter)} thousand in the tertiary sector. Calculate the percentage of workers in the tertiary sector. Give your answer to one decimal place.`,
    wrong: [(occ.ter / (occ.prim + occ.sec)) * 100],
    hints: ["Find the total number of workers first."],
    explanation: `1. Total = ${fmt(occ.prim)} + ${occ.sec} + ${occ.ter} = ${fmt(totO)} thousand.\n2. Tertiary share = ${occ.ter} ÷ ${fmt(totO)} × 100 = **${pct(terShare, 1)}**.`,
  });
  const p2a = 12500000, br2 = 28, dr2 = 8, nm2 = -30000;
  const ch2 = (p2a * (br2 - dr2)) / 1000 + nm2, p2b = p2a + ch2;
  check("ch2", ch2, 220000);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: p2b,
    stem: `A fictional country has ${fmt(p2a)} people at the start of a year, a birth rate of ${br2} per 1,000, a death rate of ${dr2} per 1,000 and net migration of ${fmt(nm2)}. Calculate its population at the end of the year.`,
    wrong: [p2a + (p2a * (br2 - dr2)) / 1000, p2a + (p2a * (br2 - dr2)) / 1000 - nm2],
    hints: ["Turn the rates into numbers of births and deaths using the starting population."],
    explanation: `1. Births = ${br2} ÷ 1,000 × ${fmt(p2a)} = ${fmt((p2a * br2) / 1000)}; deaths = ${dr2} ÷ 1,000 × ${fmt(p2a)} = ${fmt((p2a * dr2) / 1000)}.\n2. Natural increase = ${fmt((p2a * (br2 - dr2)) / 1000)}.\n3. Change = ${fmt((p2a * (br2 - dr2)) / 1000)} − ${fmt(-nm2)} = ${fmt(ch2)}.\n4. End population = ${fmt(p2a)} + ${fmt(ch2)} = **${fmt(p2b)}**.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Natural increase is the difference between the birth rate and the death rate.",
    answer: true,
    explanation: "True. Natural increase = birth rate − death rate (migration is not included).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A country's population can fall even if its birth rate is higher than its death rate.",
    answer: true,
    explanation: "True. If net emigration is larger than the natural increase, the population falls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Census", "An official count of every person in the country"],
      ["Geographical distribution", "Where in the country people live"],
      ["Occupational distribution", "How workers are divided between sectors of the economy"],
      ["Urbanisation", "The movement of people from rural areas to towns"],
      ["Brain drain", "The emigration of skilled and educated workers"],
    ],
    explanation: "These terms describe how population is counted, where it lives, what it does and how it moves.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Better healthcare and clean water make the death rate {{blank:a}}. If the birth rate stays the same, the rate of natural increase will {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fall"], choices: ["fall", "rise"] },
      { id: "b", accepted: ["rise"], choices: ["rise", "fall", "stay the same"] },
    ],
    wrong: [["rise", "fall"]],
    hints: ["Natural increase = birth rate − death rate."],
    explanation: "A lower death rate with an unchanged birth rate widens the gap, so natural increase rises.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why birth rates are higher in rural areas than in towns in many developing countries.",
    points: [
      "Identifies: children are an economic asset on family farms.",
      "Explains: they provide labour and support parents in old age, so larger families are valued.",
      "Identifies another: less access to family planning / less education for girls / higher infant mortality / cultural values.",
      "Explains it, e.g. girls who leave school early marry and start families younger.",
    ],
    modelAnswer: "First, on family farms children help with planting, herding and fetching water, and later support their parents in old age, so large families are an economic advantage. Second, rural girls often have less schooling and less access to family-planning services, so they tend to marry earlier and have more children.",
    hints: ["Think about the value of children and access to education and health services."],
    explanation: "Each reason: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Explain **three** problems a country may face in conducting a population census.",
    points: [
      "High cost: training enumerators, travel, printing or devices, processing data.",
      "Some people are missed or counted twice: remote areas, homeless or mobile people.",
      "Inaccurate answers (fear, mistrust, misunderstanding) / results soon become out of date.",
    ],
    modelAnswer: "First, a census is very expensive, because thousands of enumerators must be trained, paid and transported. Second, some people are missed, such as those in remote areas, the homeless or people moving between places, while others may be counted twice. Third, people may give false answers out of fear or mistrust, and the results quickly become out of date.",
    hints: ["Think about cost, coverage and accuracy."],
    explanation: "One mark per explained problem.",
  });

  // Structured 1: a population data table.
  const Y = [
    { y: "2025", pop: 9400000, births: 310200, deaths: 84600, imm: 12000, emi: 47000 },
  ][0];
  const brY = population.ratePerThousand(Y.births, Y.pop), drY = population.ratePerThousand(Y.deaths, Y.pop);
  const nmY = Y.imm - Y.emi, chY = Y.births - Y.deaths + nmY, grY = (chY / Y.pop) * 100;
  check("brY", brY, 33); check("drY", drY, 9); check("chY", chY, 190600);
  const T1 = table(["Item (2025)", "Number"], [["Population at the start of the year", Y.pop], ["Live births", Y.births], ["Deaths", Y.deaths], ["Immigrants", Y.imm], ["Emigrants", Y.emi]]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows population data for a fictional country, Country N, in 2025. Many of the emigrants are nurses and teachers.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: brY, stem: "Calculate the birth rate per 1,000 people.", wrong: [(Y.births / Y.pop) * 100], explanation: `${fmt(Y.births)} ÷ ${fmt(Y.pop)} × 1,000 = ${brY} per 1,000.` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: drY, stem: "Calculate the death rate per 1,000 people.", wrong: [(Y.deaths / Y.pop) * 100], explanation: `${fmt(Y.deaths)} ÷ ${fmt(Y.pop)} × 1,000 = ${drY} per 1,000.` }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: grY, stem: "Calculate the percentage change in population during 2025, including migration. Give your answer to one decimal place.", wrong: [((Y.births - Y.deaths) / Y.pop) * 100], explanation: `Change = ${fmt(Y.births)} − ${fmt(Y.deaths)} + (${fmt(Y.imm)} − ${fmt(Y.emi)}) = ${fmt(chY)}; ${fmt(chY)} ÷ ${fmt(Y.pop)} × 100 = ${pct(grY, 1)}.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **one** economic effect on Country N of the emigration of nurses and teachers.",
        points: [
          "Identifies: loss of skilled workers (brain drain).",
          "Explains: fewer nurses and teachers lowers the quality of health and education services.",
          "Develops: the cost of training them is lost; future productivity falls / remittances may partly offset.",
        ],
        modelAnswer: "The emigration of nurses and teachers is a brain drain. Hospitals and schools become short-staffed, so the quality of healthcare and education falls, which lowers the future health and productivity of the workforce. The country also loses the money it spent training them, although the emigrants may send remittances home.",
        explanation: "Identify (1), explain (1), develop (1).",
      }),
      P.manual({
        label: "(e)", marks: 5, levels: LV(5),
        stem: "Discuss whether Country N's government should try to reduce its rate of population growth.",
        points: [
          `For: natural increase of ${brY - drY} per 1,000 is high; rapid growth spreads output over more people and raises the dependency ratio.`,
          "For: pressure on schools, clinics, housing, land and jobs; more spending on dependants, less saving.",
          "Against: a growing population provides a larger future labour force and a bigger market; emigration is already reducing growth.",
          "Against: policies may conflict with family choices; the problem may be lack of jobs, not people.",
          "Justified conclusion, e.g. voluntary measures (girls' education, family planning) plus job creation and keeping skilled workers.",
        ],
        modelAnswer: `Country N's natural increase is ${brY - drY} per 1,000, a high rate, so its population of children is growing fast. This puts pressure on schools, clinics, housing and land, raises the dependency ratio and leaves less income for saving and investment. However, a growing population also provides more workers and a bigger market in future, and net emigration is already reducing growth; indeed, the loss of nurses and teachers suggests that keeping skilled people is also a problem. The government should reduce growth gently through voluntary measures, such as education for girls and family-planning services, while also creating jobs so that the growing labour force is used productively.`,
        explanation: "Weigh costs of rapid growth against benefits of a larger population; conclude.",
      }),
    ],
    hints: ["Rates are per 1,000 people at the start of the year.", "Population change = (births − deaths) + (immigrants − emigrants)."],
    explanation: `Birth rate ${brY}, death rate ${drY} per 1,000; net migration ${fmt(nmY)}; change ${fmt(chY)} (${pct(grY, 1)}).`,
  });

  // Structured 2: census and geographical distribution.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A census in a fictional country shows that the population of its two largest cities has grown much faster than the national population over the last ten years, while many rural districts have lost young adults. City councils report shortages of housing, water and transport.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "The movement of people described in the census is called",
        options: [
          ["urbanisation.", "Correct: rural-to-urban migration."],
          ["emigration.", "Emigration is leaving the country."],
          ["natural increase.", "Natural increase is births minus deaths."],
          ["the brain drain.", "The brain drain is emigration of skilled workers."],
        ],
        answer: "A",
        explanation: "Urbanisation is the growing share of people living in towns, mainly through rural-urban migration.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** reason why young adults move from rural districts to the cities.",
        points: ["Identifies a push or pull factor: jobs / higher wages / better services in cities; or drought / lack of land in rural areas.", "Explains: they expect higher and more regular incomes or better education and health services."],
        modelAnswer: "Young adults move because cities offer more paid jobs and higher wages than rural areas, where incomes depend on rain-fed farming; they expect to earn more and to send money home.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether the government should use the census results to spend more on rural development rather than on the cities.",
        points: [
          "For rural spending: creating jobs, irrigation and services in rural areas reduces push factors and slows migration to crowded cities.",
          "For rural spending: reduces regional inequality and keeps young workers in farming.",
          "For city spending: the census shows that people are already in the cities; housing, water and transport shortages harm health and productivity now.",
          "Cities offer economies of scale in providing services; some migration is a normal part of development.",
          "Justified conclusion, e.g. a balance: urgent city services plus rural investment to reduce future pressure.",
        ],
        modelAnswer: "Spending on rural development, such as irrigation, roads, clinics and small businesses, would reduce the push factors that drive young adults to the cities and narrow the gap between rural and urban living standards. However, the census shows that the extra people are already in the cities, where shortages of housing, water and transport threaten health and productivity now; services can also be provided more cheaply per person in dense cities. Some movement to towns is a normal part of development. The government should use the census to do both: meet the urgent needs of the growing cities while investing in rural areas so that future migration is a choice rather than a necessity.",
        explanation: "Weigh rural and urban spending, using the census evidence; conclude.",
      }),
    ],
    hints: ["The census tells the government where people live now and how this is changing."],
    explanation: "Census data on geographical distribution guide where public spending is needed.",
  });

  b.card("DEFINITION", "What is a **census**?", "An official count of every person in a country at a given time, collecting data such as age, sex, location and occupation.");
  b.card("CONCEPT", "Give four reasons for holding a census.", "Planning schools, clinics and housing; estimating the labour force and jobs needed; allocating resources between regions; identifying trends; electoral boundaries; business planning.");
  b.card("FORMULA", "Birth rate = ?", "Live births in a year ÷ population × 1,000.");
  b.card("FORMULA", "Population change = ?", "(Births − deaths) + (immigrants − emigrants).");
  b.card("DEFINITION", "Define **net migration**.", "Immigration minus emigration.");
  b.card("CONCEPT", "Give three reasons for high birth rates.", "Children valued as farm labour and old-age support; high infant mortality; limited family planning; little education for girls; cultural beliefs.");
  b.card("CONCEPT", "Give three reasons for falling death rates.", "Better healthcare and vaccination; clean water and sanitation; better nutrition; health education.");
  b.card("CONCEPT", "What is the **occupational distribution** of population?", "How the working population is divided between the primary, secondary and tertiary sectors.");
  b.card("CONCEPT", "What does a population pyramid with a wide base show?", "A high birth rate and a young, fast-growing population.", undefined, { applies: ZIM });
  b.card("FACT", "A birth rate of 30 per 1,000 is what percentage?", "3% (divide by 10).");
});
