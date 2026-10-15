// W4a: settle.hierarchy-theories (both boards). Illustrative data; numbers computed in code with the lib helpers.
import { concept, P, t, chk, rnd, table, geographyLevels, rankSize, nearestNeighbour, sum } from "../lib.mjs";
import { mc, fmt } from "../tables/w4a-_h.mjs";

const exp4 = chk(rankSize(2400000, 4), 600000);
const prim1 = chk(4200000 / 1400000, 3);
const four1 = 3600000 / (900000 + 700000 + 500000); // 1.714
// nearest neighbour: clustered set in 20 km x 20 km
const pts1 = [[3, 4], [4, 5], [5, 3], [15, 15], [16, 16], [17, 14], [9, 18]];
const nn1 = nearestNeighbour(pts1, 400);
const tabP = table(["Settlement", "East (km)", "North (km)"], pts1.map((p, i) => [String.fromCharCode(65 + i), p[0], p[1]]));
// Struct 1: rank-size table
const POP = [2400, 1000, 800, 560, 470];
const tabQ = table(["Rank", "Population (thousands)"], POP.map((p, i) => [i + 1, fmt(p)]));
const exp3 = chk(rankSize(2400, 3), 800);
const primQ = chk(2400 / 1000, 2.4);
// Struct 2: regular
const pts2 = [[5, 5], [15, 5], [25, 5], [5, 15], [15, 15], [25, 15]];
const nn2 = nearestNeighbour(pts2, 600);
chk(nn2.dExp, 5, 1e-9);
chk(nn2.rn, 2, 1e-9);
const tabR = table(["Centre", "East (km)", "North (km)"], pts2.map((p, i) => [String.fromCharCode(65 + i), p[0], p[1]]));

concept("ageo.settle.hierarchy-theories", { file: "settle/hierarchy-theories", keyPrefix: "settle.hierarchy-theories" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which statement describes a typical settlement hierarchy?",
    ok: ["There are many small settlements and few large ones, and larger ones offer more services", "Correct: numbers fall and services rise as the rank rises."],
    bad: [["There are as many cities as villages", "Villages are far more numerous."], ["Small settlements offer more services than large ones because they are closer together", "Services increase with size."], ["All settlements offer the same services", "Services differ by order of settlement."]],
    explanation: "A hierarchy ranks settlements by size and function: many small, few large, with higher-order services in the largest.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a primate city?",
    ok: ["A city much larger than the second-ranked city that dominates the country", "Correct: it is large relative to the other cities."],
    bad: [["Any city with a population above one million, whatever the size of the second city", "Primacy is about size relative to other cities, not a fixed number."], ["The oldest city in the country", "Age is not the criterion."], ["A city with the highest rainfall", "Rainfall has no connection."]],
    explanation: "A primate city is disproportionately large compared with the next largest cities and dominates the economy and politics.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "According to the rank-size rule, how large should the third-ranked city be if the largest has a population of 1.8 million?",
    ok: ["600 000", "Correct: 1 800 000 ÷ 3 = 600 000."],
    bad: [["900 000", "That is the expected size of the second-ranked city."], ["1 200 000", "That is two-thirds of the largest, not one-third."], ["300 000", "That is the expected size of the sixth-ranked city."]],
    explanation: "The rank-size rule gives P3 = P1 ÷ 3 = 600 000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A nearest neighbour index of 0.4 shows that the settlements are...",
    ok: ["clustered", "Correct: values near 0 indicate clustering."],
    bad: [["randomly spaced", "Random patterns have an index near 1."], ["regularly spaced", "Regular patterns have values above 1, up to 2.15."], ["all the same size", "The index measures spacing, not size."]],
    explanation: "A value near 0 means the observed mean distance is much smaller than expected, so the points are clustered.",
    hints: ["Is the observed distance smaller or larger than expected?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "According to central place theory, how are higher-order settlements distributed compared with lower-order settlements?",
    ok: ["They are fewer and further apart", "Correct: a high threshold and long range mean fewer centres with large spacing."],
    bad: [["They are more numerous and closer together", "Lower-order places are the more numerous."], ["They are located only on the coast", "Theory assumes an even plain, not a coast."], ["They are located at random", "The theory predicts a regular pattern."]],
    explanation: "Higher-order places need a large market and serve a wide area, so there are few of them and they are widely spaced.",
    hints: ["Think of threshold and range."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which factor most often helps to create a primate city?",
    ok: ["A colonial capital and port where government and trade were concentrated", "Correct: early concentration attracts further investment."],
    bad: [["Even spacing of services across the whole country", "Even spacing works against primacy."], ["A very large country with many regional capitals sharing government and trade", "Large countries with many centres tend not to have a primate city."], ["Absence of any government or trade", "Primacy arises from concentration of both."]],
    explanation: "Colonial history, centralised government and economies of scale concentrate activity in one city.",
    hints: ["Think of history and the concentration of government."],
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "The largest city of a country has 2 400 000 people. Using the rank-size rule, calculate the expected population of the fourth-ranked city.",
    value: exp4, unit: "people", wrong: [960000, 1200000],
    explanation: "P4 = 2 400 000 ÷ 4 = 600 000 people. Using 2.4 million × 0.4 gives 960 000, which is wrong.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a country the largest city has 4 200 000 people and the second-largest has 1 400 000. Calculate the primacy index (largest ÷ second-largest) and give the answer as a single number.",
    value: prim1, wrong: [0.33, 2.8],
    explanation: "Primacy index = 4 200 000 ÷ 1 400 000 = 3. The largest city is three times the size of the second. 0.33 inverts the fraction.",
    hints: ["Use only the top two cities."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In the same country (3 600 000, 900 000, 700 000 and 500 000 in the four largest cities), calculate the four-city index (largest ÷ sum of the next three), to two decimal places.",
    value: four1, dp: 2, wrong: [4, 0.58],
    explanation: "Four-city index = 3 600 000 ÷ (900 000 + 700 000 + 500 000) = 3 600 000 ÷ 2 100 000 = 1.71.",
    hints: ["Add the next three cities first."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Seven settlements lie in a region of 400 km². Their grid positions are given below in km (illustrative data).\n\n${tabP}\n\nThe mean distance from each settlement to its nearest neighbour is ${nn1.dObs.toFixed(3)} km. Calculate the nearest neighbour index Rn, to two decimal places, using the expected distance $0.5 / \\sqrt{n/A}$.`,
    value: nn1.rn, dp: 2, wrong: [3.78, 1.57],
    explanation: t`1. $\bar{d}_{exp} = 0.5 / \sqrt{7/400} = 0.5 / 0.1323 = ${nn1.dExp.toFixed(2)}$ km.\n2. $R_n = ${nn1.dObs.toFixed(3)} \div ${nn1.dExp.toFixed(3)} = ${nn1.rn.toFixed(2)}$.\n3. A value near 0.6 indicates a clustered pattern. 3.78 is the expected distance, and 1.57 is the inverse ratio.`,
    hints: ["Divide the observed mean distance by the expected distance."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A nearest neighbour index of 2.0 indicates a clustered pattern.",
    answer: false,
    explanation: "False. A value near 2 indicates a regular (evenly spaced) pattern; clustered patterns have values near 0.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A primate city is one that is large compared with the second-ranked city, not just large in absolute terms.",
    answer: true,
    explanation: "True. Primacy compares the largest city with the others, for example using the primacy index.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Primacy index", "Population of the largest city divided by that of the second-largest"],
      ["Rank-size rule", "The nth city has 1/n of the population of the largest"],
      ["Central place", "A settlement providing goods and services for a surrounding area"],
      ["World city", "A city with global influence in finance and company headquarters"],
    ],
    explanation: "These terms describe different ways of studying a hierarchy.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Christaller's central place theory suggests that market areas are shaped like {{blank:a}} and that higher-order places are {{blank:b}} than lower-order places.",
    blanks: [
      { id: "a", accepted: ["hexagons"], choices: ["hexagons", "circles", "triangles", "rectangles"] },
      { id: "b", accepted: ["fewer"], choices: ["fewer", "more numerous", "closer together"] },
    ],
    explanation: "Hexagons fit together without gaps; higher-order places are few and far apart.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the German geographer who proposed central place theory in 1933.",
    accepted: ["Christaller", "Walter Christaller"],
    wrong: ["Reilly", "Burgess"],
    explanation: "Walter Christaller proposed central place theory.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "What name is given to the city in a country that is much larger than the second-ranked city and dominates it?",
    accepted: ["primate city", "primate", "a primate city"],
    wrong: ["world city", "capital city"],
    explanation: "A primate city dominates the urban hierarchy. It is not necessarily the capital, though often it is.",
    hints: ["The word begins with 'prim-'."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the characteristics of a settlement hierarchy.",
    points: ["There are many small settlements and progressively fewer larger ones", "Services and the range of goods increase with the size of settlement", "Larger settlements are further apart and serve larger areas (spheres of influence)"],
    modelAnswer: "There are many small settlements and progressively fewer larger ones. The number and level of services increase with the size of the settlement, and larger settlements are further apart and serve larger areas.",
    explanation: "Numbers, services and spacing.",
    hints: ["Think of numbers, services and spheres of influence."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a primate city often forms in a developing country.",
    points: ["Colonial and government development concentrated administration, a port or railway in one place", "Investment, jobs and services attract migrants and firms to the largest market, which strengthens its growth (economies of scale)", "Centralised government and a small economy leave few other centres with enough resources to grow"],
    modelAnswer: "Colonial and government development concentrated administration, a port or a railway in one place. Investment, jobs and services then attracted migrants and firms to the largest market, and centralised government and a small economy left few other centres with enough resources to grow.",
    explanation: "History, agglomeration and centralisation.",
    hints: ["Why do firms and migrants choose the biggest city?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two problems that a primate city can cause for the rest of a country.",
    points: ["Regional inequality, because services, jobs and investment are concentrated in the primate city and smaller towns lack them", "Migration to the city leaves rural areas and small towns short of young workers", "Congestion, housing shortage and informal settlements in the primate city", "Strain on water, sanitation and transport because services cannot keep up with growth"],
    modelAnswer: "Services, jobs and investment are concentrated in the primate city, so smaller towns lack them and regional inequality grows. Migration to the city also leaves rural areas short of young workers, while the city itself suffers congestion, housing shortages and informal settlements.",
    explanation: "Any two problems, each developed.",
    hints: ["Consider both the city and the regions outside it."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four reasons why a real settlement pattern may differ from the regular hexagonal pattern of central place theory.",
    points: ["Physical barriers such as rivers, mountains and poor soils affect where people settle", "Population is not evenly spread, and incomes and tastes differ", "Roads and railways create routes along which places grow, so spacing follows transport rather than distance", "Resources such as minerals and political decisions such as growth points create places unrelated to market areas, or modern transport and the internet extend the range people will travel"],
    modelAnswer: "Rivers, mountains and poor soils affect where people settle, and population and income are not evenly spread. Roads and railways make places grow along routes, resources and political decisions such as growth points create places outside the pattern, and modern transport extends ranges.",
    explanation: "Any four valid reasons.",
    hints: ["The theory assumes an even plain and even population."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the populations of the five largest towns of a country (illustrative data).\n\n${tabQ}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Use the rank-size rule to calculate the expected population (in thousands) of the third-ranked town.", value: exp3, wrong: [2400, 1200], explanation: "P3 = 2 400 ÷ 3 = 800 thousand." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the primacy index (largest ÷ second-largest), to one decimal place.", value: primQ, dp: 1, wrong: [0.4, 2.4 + 1], explanation: "2 400 ÷ 1 000 = 2.4." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement best describes the data?", options: [["The hierarchy is close to that predicted by the rank-size rule", "Correct: ranks 3 to 5 are within a few per cent of the expected values (800, 600 and 480 thousand)."], ["The country has an extreme primate city", "The primacy index of 2.4 is moderate and the other ranks fit the rule."], ["The towns are all of equal size, with no difference between ranks", "Populations fall from 2 400 to 470 thousand."], ["The data show a clustered pattern", "Nothing is said about spacing."]], answer: "A", explanation: "Expected values are 1 200, 800, 600 and 480 thousand for ranks 2 to 5; actual values are 1 000, 800, 560 and 470." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the second-ranked town is smaller than the rank-size rule predicts.", points: ["The largest town may have extra functions (capital, port, major industry) that draw people and investment", "Economies of scale and migration favour the largest market", "Physical or political factors may limit the growth of the second town"], modelAnswer: "The largest town may have extra functions such as being the capital or main port, which draw people and investment. Economies of scale and migration favour the largest market, and physical or political factors may limit the growth of the second town.", explanation: "Functions, agglomeration and constraints." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess the usefulness of the rank-size rule for describing a country's hierarchy.", points: ["It is simple and gives a benchmark to compare real hierarchies with", "Large departures show a primate city or a missing level in the hierarchy", "It describes only population and ignores functions, services and spacing", "Results depend on how the urban area is defined and on the number of towns used, and it is a statistical pattern, not an explanation"], modelAnswer: "The rule is simple and gives a benchmark for comparing real hierarchies, and large departures show a primate city or a gap in the hierarchy. However, it describes only population, ignoring functions and spacing, and the result depends on how urban areas are defined. It describes a pattern but does not explain it.", explanation: "Strengths and limits." }),
    ],
    explanation: "Apply the rank-size rule and the primacy index and evaluate them.",
    hints: ["Divide the largest population by the rank."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Six service centres lie in a region of 30 km by 20 km (600 km²). Their positions are shown below (illustrative data). The distance from each centre to its nearest neighbour is 10 km.\n\n${tabR}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the expected mean nearest-neighbour distance, in km, using $0.5/\\sqrt{n/A}$.", value: nn2.dExp, unit: "km", wrong: [10, 0.05], explanation: t`$\bar{d}_{exp} = 0.5 / \sqrt{6/600} = 0.5 / 0.1 = 5.0$ km.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the nearest neighbour index Rn, to one decimal place.", value: nn2.rn, dp: 1, wrong: [0.5, 10], explanation: "Rn = observed ÷ expected = 10 ÷ 5.0 = 2.0." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What does this value show about the pattern of centres?", options: [["It is regular (evenly spaced)", "Correct: a value of 2.0 is close to the maximum of 2.15."], ["It is clustered, with groups of centres close together", "Clustered patterns have values near 0."], ["It is random", "Random patterns have values near 1."], ["It cannot be interpreted", "The index can be interpreted as shown."]], answer: "A", explanation: "Regular patterns have values above about 1.3, and a perfectly regular hexagonal pattern gives 2.15." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why centres of the same order tend to be regularly spaced.", points: ["Each centre needs a minimum market area (threshold) to survive", "Competition between neighbouring centres of the same order sets a limit to how close they can be", "A regular spacing gives each centre a similar share of customers within the range people will travel"], modelAnswer: "Each centre needs a minimum market area to survive, and competition between neighbouring centres of the same order sets a limit on how close they can be. Regular spacing gives each centre a similar share of customers within the range people will travel.", explanation: "Threshold, competition and range." }),
    ],
    explanation: "Calculate and interpret a nearest neighbour index.",
    hints: ["Use n = 6 and A = 600."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess whether a primate city is harmful to a country's development. [8]",
    points: [
      "Defines a primate city (much larger than the next city) with an example",
      "Benefits: concentration of services, firms and infrastructure gives economies of scale and attracts investment",
      "A single clear gateway for trade, transport and government can be efficient",
      "Harm: investment, jobs and services concentrated in one place leave other regions poor",
      "Rural-urban migration drains regions of young people and increases inequality",
      "Congestion, housing shortage, informal settlements and pollution in the primate city",
      "Policies such as growth points, decentralisation and transport links may reduce the harm",
      "Judgement: a primate city can drive growth, but it harms development when the benefits are not shared with other regions",
    ],
    levels: geographyLevels(8),
    modelAnswer: "A primate city is much larger than the second-ranked city and dominates the country. It can help development because its concentration of services, firms and infrastructure gives economies of scale and attracts investment, and it acts as a clear gateway for trade and government. However, investment, jobs and services concentrated in one place leave other regions poor, and rural-urban migration drains them of young people. The primate city itself suffers congestion, housing shortages, informal settlements and pollution. Policies such as growth points, decentralisation and better transport links may reduce the harm. A primate city can therefore drive growth, but it harms development when its benefits are not shared with other regions.",
    wordLimit: { max: 300 },
    explanation: "Balance benefits and harm, mention policies and judge.",
    hints: ["Consider the city and the rest of the country."],
  });

  b.card("DEFINITION", "Settlement hierarchy?", "Settlements ranked by size and function: many small places and few large ones, with higher-order services in the largest.");
  b.card("DEFINITION", "Primate city?", "A city much larger than the second-ranked city, dominating a country's economy and politics.");
  b.card("FORMULA", "Primacy index?", "Population of the largest city ÷ population of the second-largest. The four-city index is the largest ÷ the sum of the next three.");
  b.card("FORMULA", "Rank-size rule?", t`$P_n = P_1 / n$: the town of rank n has 1/n of the population of the largest.`);
  b.card("FORMULA", "Nearest neighbour index?", t`$R_n = \bar{d}_{obs} / \bar{d}_{exp}$, with $\bar{d}_{exp} = 0.5/\sqrt{n/A}$. Near 0 clustered, near 1 random, up to 2.15 regular.`);
  b.card("CONCEPT", "Central place theory (Christaller, 1933)?", "Settlements serve surrounding areas; high-order places are few and far apart, low-order ones many and close; market areas are hexagons.");
  b.card("CONCEPT", "Causes of primate cities?", "Colonial capital or port, centralised government, concentration of investment and economies of scale.");
  b.card("CONCEPT", "Problems of a primate city?", "Regional inequality, rural depopulation, congestion, housing shortage and informal settlement in the city.");
  b.card("CONCEPT", "What makes a world city?", "Headquarters of transnational companies, finance and advanced services, major airports and communications, skilled workforce; ranked as alpha, beta and gamma cities (GaWC).");
});
