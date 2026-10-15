// W4a: pop.distribution-growth (ZIMSEC Form 5; Cambridge AS). Illustrative data; published census totals rounded (ZimStat 2012, 2022).
import { concept, P, t, chk, rnd, table, geographyLevels, projectPopulation, doublingTime } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const zimDens = chk(91000 / 650, 140, 1e-9);
const proj = projectPopulation(9.6, 3.0, 10); // 12.90
chk(rnd(proj, 1, 12.9, "proj"), 12.9);
const dbl = chk(doublingTime(3.5), 20, 1e-9);
const censusPct = (9.9 - 8.2) / 8.2 * 100; // 20.73
const dens = (p, a) => p / a;
chk(dens(84000, 700), 120);
chk(dens(18200, 1400), 13);
chk(dens(260000, 650), 400);
const D = [["A (hill farming)", 96000, 800, 1.2], ["B (plains)", 48000, 1600, 1.6], ["C (valley)", 9000, 1800, 0.9], ["D (town)", 180000, 450, 3.1], ["E (mining)", 63000, 700, 2.4]];
const dE = chk(dens(63000, 700), 90);
const dTimes = chk(dens(180000, 450) / dens(9000, 1800), 80);
const tab1 = table(["District", "Population", "Area (km²)", "Growth (% a year)"], D.map((r) => [r[0], String(r[1]).replace(/\B(?=(\d{3})+(?!\d))/g, " "), String(r[2]).replace(/\B(?=(\d{3})+(?!\d))/g, " "), r[3]]));
const yDens = chk(2100000 / 840000, 2.5);

concept("ageo.pop.distribution-growth", { file: "pop/distribution-growth", keyPrefix: "pop.distribution-growth" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does population density measure?",
    ok: ["The average number of people per unit area", "Correct: usually people per km²."],
    bad: [["The pattern in which people are spread over a region", "That is distribution, not density."], ["The number of births per 1 000 people", "That is the birth rate."], ["The size of the largest city", "Density is an average over an area, not a city size."]],
    explanation: "Density = population ÷ area. Distribution describes the pattern; density is a number.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which area of Zimbabwe is most likely to have the lowest population density?",
    ok: ["The low, hot Zambezi valley with low and unreliable rainfall", "Correct: dry conditions, poor soils, disease risk and protected areas keep numbers low."],
    bad: [["The Harare area with jobs and services", "A capital city has a high density."], ["The eastern highlands near Mutare with high and reliable rainfall", "Reliable rain and fertile land support high densities."], ["The communal lands on the fertile Highveld", "Good farming land supports dense settlement."]],
    explanation: "Low, unreliable rainfall, poor soils, tsetse and wildlife areas limit settlement in the Zambezi valley and similar lowlands.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best defines overpopulation?",
    ok: ["Too many people for the resources and technology available", "Correct: it is a balance between people and resources."],
    bad: [["A population with a very high density of people per square kilometre", "A dense population is not necessarily overpopulated."], ["A population that is growing quickly", "Fast growth is not the same as overpopulation."], ["A population larger than 10 million", "No fixed number defines overpopulation."]],
    explanation: "Overpopulation depends on resources and technology, not on density or growth rate alone.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which view argues that population pressure can stimulate innovation and raise food production?",
    ok: ["Boserup", "Correct: more people create pressure that leads to intensive farming and new technology."],
    bad: [["Malthus", "Malthus expected food supply to lag behind population and cause checks."], ["Reilly", "Reilly's law is about retail catchments."], ["Ravenstein", "Ravenstein wrote laws of migration."]],
    explanation: "Boserup (1965) saw population pressure as a spur to innovation; Malthus (1798) saw it as leading to famine, disease and war.",
    hints: ["Which writer was optimistic about people finding new ways to farm?"],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A country's growth rate falls from 2.8% to 2.2% a year. What is true of its population?",
    ok: ["It is still growing, but more slowly", "Correct: a positive rate always adds people."],
    bad: [["It has started to decrease", "A fall in the rate is not a fall in numbers."], ["Its doubling time is shorter than before", "A lower rate gives a longer doubling time."], ["Its death rate must have risen above its birth rate", "Then the rate would be negative."]],
    explanation: "A growth rate of 2.2% is positive, so numbers still rise. Doubling time (70 ÷ rate) lengthens from 25 to about 32 years.",
    hints: ["Is 2.2% positive or negative?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which change is most likely to raise the carrying capacity of a semi-arid farming district?",
    ok: ["Introducing small-scale irrigation and drought-tolerant crops", "Correct: more food can be produced from the same land."],
    bad: [["Clearing steep slopes and hillsides to make extra fields for maize", "This risks soil erosion, which lowers capacity."], ["Allowing livestock numbers to double", "Overgrazing damages the land that supports people."], ["Cutting the remaining woodland for fuel", "Losing the woodland reduces long-term capacity."]],
    explanation: "Technology that raises output without damaging the land increases carrying capacity; damage lowers it.",
    hints: ["Which option increases output without harming the land?"],
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A rural district has a population of 91 000 and an area of 650 km². Calculate the average population density, in people per km².",
    value: zimDens, dp: 0, unit: "people/km²", wrong: [0.007, 91],
    explanation: "Density = population ÷ area = 91 000 ÷ 650 = 140 people per km². Dividing the area by the population gives 0.007.",
    hints: ["Divide the number of people by the area."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A country has 9.6 million people and a constant growth rate of 3.0% a year. Calculate its population after 10 years, in millions, to one decimal place, using $P = P_0(1 + r/100)^n$.`,
    value: proj, dp: 1, unit: "million", wrong: [12.5, 12.0],
    explanation: t`1. $P = 9.6 \times 1.03^{10}$.\n2. $1.03^{10} = 1.3439$.\n3. $P = 9.6 \times 1.3439 = 12.9$ million.\n4. 12.5 comes from adding 3.0% ten times to the starting figure (simple, not compound, growth).`,
    hints: ["Compound growth: multiply by 1.03 ten times."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Use the rule of 70 to estimate the doubling time of a population growing at 3.5% a year, in years.",
    value: dbl, unit: "years", wrong: [245, 0.05],
    explanation: "Doubling time ≈ 70 ÷ growth rate (%) = 70 ÷ 3.5 = 20 years.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A country had 8.2 million people in 2010 and 9.9 million in 2020 (illustrative data). Calculate the percentage increase over the ten years, to the nearest whole number.",
    value: censusPct, dp: 0, unit: "%", wrong: [1.7, 17],
    explanation: "Increase = 9.9 − 8.2 = 1.7 million. Percentage increase = 1.7 ÷ 8.2 × 100 = 21%. Giving 1.7 forgets to convert to a percentage; 17 divides by the new value (1.7 ÷ 9.9).",
    hints: ["Divide the increase by the starting population."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country with a high population density is always overpopulated.",
    answer: false,
    explanation: "False. Overpopulation depends on the balance between people and resources, technology and trade. Dense, wealthy countries can have high living standards.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The rate of world population growth peaked in the 1960s and has fallen since.",
    answer: true,
    explanation: "True. The growth rate peaked at about 2.1% a year in the 1960s. The total still rises, but more slowly.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor affecting population distribution to its type.",
    pairs: [
      ["Reliable rainfall and fertile soil", "Physical"],
      ["Employment in a mine or factory", "Economic"],
      ["Presence of schools and clinics", "Social"],
      ["A national park where settlement is restricted", "Political"],
    ],
    explanation: "Physical factors are natural conditions; economic factors are jobs and income; social factors are services and culture; political factors are laws and policies.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Population {{blank:a}} is the pattern of where people live, while population {{blank:b}} is the number of people per km².",
    blanks: [
      { id: "a", accepted: ["distribution"], choices: ["distribution", "density", "growth", "structure"] },
      { id: "b", accepted: ["density"], choices: ["density", "distribution", "growth", "migration"] },
    ],
    explanation: "Distribution is a pattern; density is a calculated number.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term means the largest population an area can support indefinitely without damaging its environment?",
    accepted: ["carrying capacity", "the carrying capacity", "environmental carrying capacity"],
    wrong: ["optimum population", "density"],
    explanation: "Carrying capacity is the maximum sustainable population. Optimum population is the number that gives the highest standard of living.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which writer argued in 1798 that population grows faster than food supply and is limited by famine, disease and war?",
    accepted: ["Malthus", "Thomas Malthus", "Thomas Robert Malthus", "T. R. Malthus"],
    wrong: ["Boserup", "Ravenstein"],
    explanation: "Thomas Malthus argued that population grows geometrically and food arithmetically.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the distribution of population in Zimbabwe.",
    points: ["Population is concentrated in the cities and towns such as Harare and Bulawayo", "High densities in the Highveld and eastern districts and other areas with higher rainfall and fertile land", "Low densities in the Zambezi valley, the lowveld and protected areas such as Hwange"],
    modelAnswer: "Population is concentrated in the cities such as Harare and Bulawayo and in the Highveld and eastern districts where rainfall and soils are better. Densities are low in the Zambezi valley, the lowveld and large protected areas.",
    explanation: "Name high- and low-density areas, with a link to the main pattern.",
    hints: ["Give one high-density and one low-density area."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why population density is low in a semi-arid district.",
    points: ["Low and unreliable rainfall makes crop growing risky", "Poor soils and limited water supply support few people and livestock", "Few jobs and services, so people migrate to better areas", "Disease or wildlife (for example tsetse fly or protected areas) may limit settlement"],
    modelAnswer: "Low and unreliable rainfall makes crop farming risky, and thin soils and limited water support few people. With few jobs and services many people migrate to better areas, and disease or wildlife areas may also limit settlement.",
    explanation: "Link each factor to a reason why people avoid or leave the area.",
    hints: ["Think of farming, jobs and services."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain three problems that rapid population growth can cause for a low-income country.",
    points: ["Pressure on food, water and land, leading to shortages or land degradation", "Pressure on schools, clinics and housing because a large young population needs services", "Not enough jobs for the many young people entering the workforce, so unemployment or migration rise"],
    modelAnswer: "Rapid growth puts pressure on food, water and land, which can cause shortages and land degradation. It also strains schools, clinics and housing because many young people need services, and it may create more job seekers than jobs.",
    explanation: "Give three separate problems, each with a reason.",
    hints: ["Think of resources, services and jobs."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the optimum population of a country can change over time.",
    points: ["Technology can raise output from the same resources, so the optimum rises", "Discovery or exhaustion of resources changes the number that can be supported", "Trade and imports allow a country to support more people than its own resources alone", "Changes in living standards or damage to the environment change the balance"],
    modelAnswer: "New technology such as irrigation raises output from the same land, so the optimum increases. Discovery or loss of resources, trade that allows food or energy to be imported, and environmental damage also change how many people can enjoy a high standard of living.",
    explanation: "Optimum population is relative to resources, technology and trade, which all change.",
    hints: ["What can change in the balance between people and resources?"],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Illustrative data for five districts of a country are shown below.\n\n${tab1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the population density of District E, in people per km².", value: dE, unit: "people/km²", wrong: [63, 0.011], explanation: "63 000 ÷ 700 = 90 people per km²." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times greater is the density of District D than that of District C?", value: dTimes, unit: "times", wrong: [20, 400], explanation: "D: 180 000 ÷ 450 = 400. C: 9 000 ÷ 1 800 = 5. 400 ÷ 5 = 80 times." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the pattern of density shown by the data.", points: ["District D (the town) has the highest density at 400 people per km²", "District C (the valley) has the lowest density at 5 people per km²", "Density is highest in the town and mining and hill-farming districts and lowest in the plains and valley districts"], modelAnswer: "District D, the town, has the highest density at 400 people per km², and District C, the valley, has the lowest at 5. The hill farming and mining districts have intermediate densities (120 and 90), and the plains district has only 30.", explanation: "Quote the highest and lowest values with units and note the pattern." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why District D has the fastest growth rate.", points: ["Jobs and services attract migrants from rural districts", "Migrants are mostly young adults, so births increase as well", "Better health care keeps the death rate low"], modelAnswer: "Jobs and services in the town attract migrants from other districts, and because migrants are mostly young adults they have children there, which raises the birth rate. Better health care also keeps the death rate low.", explanation: "Growth combines net migration and natural increase." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three problems that rapid growth could cause in District D.", points: ["Pressure on housing, with informal settlement or overcrowding", "Pressure on water supply, sanitation and waste disposal", "Unemployment and strain on schools, clinics and transport"], modelAnswer: "Rapid growth could cause a shortage of housing and informal settlement, pressure on water, sanitation and waste disposal, and unemployment with strain on schools, clinics and transport.", explanation: "Link growth to housing, services and jobs." }),
    ],
    explanation: "Density calculations, description of a pattern, and causes and effects of growth.",
    hints: ["Divide population by area for each district."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "Country Y has 2.1 million people on 840 000 km². It has large areas of unused farmland and deposits of minerals that are not mined, and employers report a shortage of skilled workers (illustrative data).",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which term best describes the situation of Country Y?", options: [["Underpopulation", "Correct: resources are not fully used because there are too few people and skills."], ["Overpopulation", "There is no evidence of too many people for the resources."], ["Optimum population", "Unused resources and a skills shortage show that it is not optimum."], ["Carrying capacity reached", "Resources are unused, so capacity has not been reached."]], answer: "A", explanation: "Unused resources and labour shortages indicate underpopulation." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the population density of Country Y, in people per km².", value: yDens, unit: "people/km²", wrong: [0.4, 400], explanation: "2 100 000 ÷ 840 000 = 2.5 people per km²." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why a low density does not by itself prove that a country is underpopulated.", points: ["Underpopulation depends on whether resources are used, not on the number of people per km²", "The land may be desert, mountain or forest that cannot support many people", "A low-density country may have a high standard of living using technology and trade"], modelAnswer: "Underpopulation depends on whether resources are being used. Low density may simply reflect desert or mountain that cannot support many people, and some low-density countries have a high standard of living through technology and trade.", explanation: "Density is an average; underpopulation is a balance between people and usable resources." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which Country Y could increase its population or its output per person.", points: ["Encourage immigration of skilled workers or offer incentives for larger families", "Train its workers and invest in machinery and technology to use the resources"], modelAnswer: "It could attract skilled immigrants and train its own workers, and invest in machinery and technology so that the farmland and minerals are used.", explanation: "Raise labour supply or skills and use technology." }),
    ],
    explanation: "Identify underpopulation, calculate density and explain the limits of density.",
    hints: ["Divide population by area and think about what is unused."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess whether a country with a high population density is necessarily overpopulated. [8]",
    points: [
      "Density is only an average number of people per km² and says nothing about resources",
      "Overpopulation is a balance between people and the resources and technology available",
      "Some dense countries have high living standards, for example the Netherlands, because of trade, technology and skills",
      "Some low-density areas cannot support their people (dry areas with poor soils), so can be overpopulated",
      "Signs of overpopulation are unemployment, shortage of food or water, land degradation and out-migration",
      "Technology, such as irrigation and fertilisers, raises carrying capacity",
      "Trade lets a country import food and energy and so support more people",
      "Judgement: density alone is a poor measure; judge by living standards, resource use and sustainability",
    ],
    levels: geographyLevels(8),
    modelAnswer: "A high density does not necessarily mean overpopulation, because density is only an average number of people per km² and says nothing about resources. Overpopulation means too many people for the resources and technology available. The Netherlands is very dense but has a high standard of living because of trade, technology and skills, whereas a dry area with poor soils can be overpopulated at a much lower density. Technology such as irrigation raises carrying capacity, and trade allows a country to import food and energy. The signs of overpopulation are unemployment, shortages of food and water, land degradation and out-migration. Density is therefore a poor measure on its own: overpopulation must be judged from living standards and the sustainable use of resources.",
    wordLimit: { max: 300 },
    explanation: "Weigh density against resources, technology and trade, then judge.",
    hints: ["Compare a dense rich country with a sparse dry one."],
  });

  b.card("DEFINITION", "Population density?", "The average number of people per unit area (people per km²) = population ÷ area.");
  b.card("DEFINITION", "Population distribution?", "The pattern of where people live: clustered, spread or in lines.");
  b.card("DEFINITION", "Optimum population?", "The number of people that gives the highest standard of living with the resources and technology available.");
  b.card("DEFINITION", "Carrying capacity?", "The largest population an area can support indefinitely without damaging the environment.");
  b.card("FORMULA", "Rule of 70?", "Doubling time (years) ≈ 70 ÷ annual growth rate (%).");
  b.card("FACT", "When did the world reach 8 billion people?", "November 2022 (United Nations). 7 billion was reached in 2011.");
  b.card("FACT", "Zimbabwe's population in the 2022 census?", "About 15.2 million (ZimStat, rounded), compared with about 13.1 million in 2012.");
  b.card("CONCEPT", "Malthus versus Boserup?", "Malthus (1798): population outgrows food, so famine, disease and war act as checks. Boserup (1965): population pressure stimulates innovation and higher food output.");
  b.card("CONCEPT", "Why can a dense country be rich?", "Density is not overpopulation: trade, technology and skills can support high living standards.");
});
