// W4b: measuring living standards and economic development (both boards; ZIMSEC Form 5, Cambridge A Level only).
import { concept, P, chk, table, hdi, roundTo, pctChange } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.living-standards-indicators", { file: "dev/living-standards-indicators", keyPrefix: "dev.living-standards-indicators" }, (b) => {
  mc(b, [2, "RECALL"], "Economic development differs from economic growth because development",
    ["includes health, education and poverty reduction as well as output", "Correct: it is a broader improvement in well-being."],
    [["means only a rise in real GDP per head", "That is economic growth."],
     ["is measured only by changes in the general level of prices and in wages over time", "Prices do not measure development."],
     ["refers only to a rise in exports and imports", "Exports are one part of output."]],
    "Growth is a rise in real output; development includes wider improvements in well-being.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which statement about real GDP per head is correct?",
    ["It is adjusted for inflation and for the size of the population", "Correct: real and per capita."],
    [["It shows how income is shared between households", "It is an average and hides inequality."],
     ["It includes the value of unpaid household work", "Unpaid work is usually excluded."],
     ["It is the same as nominal GDP divided by the exchange rate of the currency", "That ignores inflation and population."]],
    "Real GDP per head = real GDP ÷ population.");

  mc(b, [2, "UNDERSTANDING"], "Converting incomes using purchasing power parity rather than market exchange rates is intended to",
    ["allow for differences in the prices of goods between countries", "Correct: it compares what incomes can buy."],
    [["allow for differences in the size of populations between the countries compared", "That is done by using per head figures."],
     ["remove the effect of inflation over time", "That is done by using real values."],
     ["show how equally income is distributed", "PPP says nothing about distribution."]],
    "PPP compares purchasing power rather than currency values.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Which is a reason why GDP per head may overstate the living standard of a typical person in a developing economy?",
    ["It is an average, and a few very rich households can raise it", "Correct: the mean is affected by high incomes."],
    [["It counts unpaid subsistence output at much too high a value in the figures", "Subsistence output is usually undercounted."],
     ["It includes only the informal sector", "The informal sector is partly excluded."],
     ["It is always adjusted for the environment", "It is not adjusted."]],
    "An average hides the distribution of income.", { hints: ["What does an average ignore?"] });

  mc(b, [3, "UNDERSTANDING"], "The Human Development Index combines",
    ["life expectancy, years of schooling and income per head", "Correct: health, education and income."],
    [["the price level, the unemployment rate and the growth rate", "These are macroeconomic indicators."],
     ["the Gini coefficient, the inflation rate and the budget deficit", "These are not HDI components."],
     ["exports, imports and the exchange rate", "These are trade indicators."]],
    "The HDI is a geometric mean of health, education and income indices.", { hints: ["Which three dimensions does the HDI cover?"] });

  mc(b, [3, "UNDERSTANDING"], "The Kuznets curve suggests that as income per head rises inequality at first",
    ["rises and later falls", "Correct: an inverted U-shape."],
    [["falls and later rises", "That is a U-shape."],
     ["rises continuously", "The hypothesis predicts an eventual fall."],
     ["is unaffected", "The hypothesis links inequality to income."]],
    "The Kuznets hypothesis predicts an inverted U between inequality and income per head.", { hints: ["Is it a U or an inverted U?"] });

  mc(b, [3, "ANALYSIS"], "Which is a weakness of the HDI as a measure of development?",
    ["It ignores inequality and damage to the environment", "Correct: it uses averages and excludes environmental costs."],
    [["It includes only the level of income per head", "It also includes health and education."],
     ["It cannot be compared between countries", "It is designed for comparison."],
     ["It uses nominal rather than real values", "The income measure is adjusted for purchasing power."]],
    "The HDI is an average and does not include the environment or freedoms.", { hints: ["What is not in the three dimensions?"] });

  mc(b, [2, "RECALL"], "The Multidimensional Poverty Index measures",
    ["the proportion of people deprived in health, education and living standards", "Correct: overlapping deprivations."],
    [["the share of income received by the richest 10%", "That measures inequality."],
     ["the average income of the poorest households only", "It is not an income measure."],
     ["the difference in average income between rich and poor countries", "It measures poverty within a country."]],
    "The MPI counts deprivations across several dimensions and their intensity.");

  {
    const g = (1.04 / 1.015 - 1) * 100; chk(roundTo(g, 1), 2.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: g, unit: "%", hints: ["Real GDP per head = real GDP ÷ population."],
      stem: "Real GDP rises by 4% in a year while the population rises by 1.5%. Calculate the percentage change in real GDP per head, to one decimal place.",
      wrong: [5.5, 2.6, 4.0], explanation: "1.04 ÷ 1.015 = 1.0246, a rise of 2.5%. (The approximation 4 − 1.5 = 2.5 gives the same answer to one decimal place; subtracting is only approximate.)" });
    const ppp = 55000 / 22; chk(ppp, 2500);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: ppp,
      stem: "GNI per head in a country is 55,000 units of local currency. The purchasing power parity exchange rate is 22 units per US dollar. Calculate GNI per head at PPP, in US\\$.",
      wrong: [1210000, 22, 55000], explanation: "55,000 ÷ 22 = US\\$2,500." });
    const h = (70 - 20) / 65; chk(roundTo(h, 3), 0.769);
    b.num({ d: 2, skill: "APPLICATION", kind: "elasticity", dp: 3, value: h, daily: true,
      stem: "The health index of the HDI is (life expectancy − 20) ÷ (85 − 20). Calculate the health index for a country with a life expectancy of 70 years, to three decimal places.",
      wrong: [0.824, 0.7, 0.538], explanation: "(70 − 20) ÷ 65 = 0.769." });
    const r = hdi({ lifeExpectancy: 58, meanYears: 5, expectedYears: 9, gniPerCapita: 1500 }); chk(roundTo(r.hdi, 3), 0.464);
    b.calc({ d: 4, skill: "APPLICATION", kind: "elasticity", dp: 3, value: r.hdi, calculator: true, hints: ["Education index = average of mean years ÷ 15 and expected years ÷ 18.", "Income index uses natural logs between 100 and 75,000."],
      stem: "A country has a life expectancy of 58 years, mean years of schooling of 5, expected years of schooling of 9 and GNI per head of US\\$1,500. Using health = (LE − 20) ÷ 65, education = average of (mean years ÷ 15) and (expected years ÷ 18), and income = [ln(GNI) − ln(100)] ÷ [ln(75,000) − ln(100)], calculate the HDI (the geometric mean of the three indices), to three decimal places.",
      wrong: [0.497, 0.468, 0.585],
      explanation: "1. Health = 38 ÷ 65 = 0.585.\n2. Education = (5 ÷ 15 + 9 ÷ 18) ÷ 2 = (0.333 + 0.500) ÷ 2 = 0.417.\n3. Income = (ln 1,500 − ln 100) ÷ (ln 75,000 − ln 100) = 2.708 ÷ 6.620 = 0.409.\n4. HDI = (0.585 × 0.417 × 0.409)^(1/3) = 0.464." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "Real GDP per head shows how income is distributed among the households of a country.",
    explanation: "It is an average and says nothing about distribution." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each indicator with what it measures or does.",
    pairs: [["Purchasing power parity", "Adjusts income for differences in prices between countries"], ["Human Development Index", "Combines health, education and income"], ["Measure of Economic Welfare", "Adjusts GDP for leisure, unpaid work and environmental costs"], ["Multidimensional Poverty Index", "Counts overlapping deprivations in health, education and living standards"]],
    explanation: "Each has a different purpose in measuring living standards." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "To compare living standards over time we use real GDP per head, which is adjusted for {{blank:a}} and for population. The HDI is the {{blank:b}} mean of three indices.",
    blanks: [{ id: "a", accepted: ["inflation"], choices: ["inflation", "exports", "tax"] }, { id: "b", accepted: ["geometric"], choices: ["geometric", "arithmetic", "weighted"] }],
    explanation: "Real values remove inflation; the HDI uses a geometric mean since 2010." });

  b.short({ d: 2, skill: "RECALL", stem: "What does the abbreviation PPP stand for in a comparison of living standards?",
    accepted: ["purchasing power parity", "purchasing-power parity"], wrong: ["per person payment"],
    explanation: "Purchasing power parity." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between economic growth and economic development.",
    points: ["Economic growth is an increase in real output (real GDP or GDP per head) over time", "Economic development is a broader improvement in well-being, including health, education and reduction in poverty"],
    modelAnswer: "Economic growth is an increase in real output over time, while economic development is a broader improvement in well-being that includes health, education and the reduction of poverty.",
    explanation: "Output against wider well-being." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of what GDP leaves out."],
    stem: "Explain two limitations of using real GDP per head to compare living standards between countries.",
    points: ["It is an average and hides inequality in the distribution of income.", "So a country with a high average may have many poor people.", "It excludes unpaid and subsistence work and much of the informal economy.", "So it understates output in countries where these are important (also ignores the environment and leisure)."],
    modelAnswer: "Real GDP per head is an average and hides inequality, so a country with a high average may have many poor people. It also excludes unpaid and subsistence work and much of the informal economy, so it understates output in countries where these are important.",
    explanation: "Two limitations explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Compare what each measure includes."],
    stem: "Explain why the Human Development Index may give a different ranking of two countries from GDP per head.",
    points: ["The HDI includes life expectancy and years of schooling as well as income.", "A country with a lower income per head may have better health and education.", "The income component uses logarithms, so extra income counts for less at higher levels.", "So a poorer country with good health and education may score higher than a richer one.", "GDP per head ignores health and education."],
    modelAnswer: "The HDI includes life expectancy and years of schooling as well as income, so a country with a lower income per head but better health and education may score higher. The income component uses logarithms, so extra income counts for less at higher levels, whereas GDP per head ignores health and education altogether.",
    explanation: "Wider coverage and diminishing weight of income." });

  {
    const t = table(["Country", "GNI per head, market rate (US\\$)", "PPP-adjusted GNI per head (US\\$)"], [["Tamba", 3000, 4500], ["Kavala", 3600, 3900]]);
    const ratio = pctChange(3900, 4500); chk(roundTo(ratio, 1), 15.4);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Local GNI ÷ exchange rate gives US dollars at the market rate.", "Percentage difference = (4,500 − 3,900) ÷ 3,900 × 100."],
      stem: "**Comparing Tamba and Kavala (fictional, illustrative)**\n\nTamba's GNI per head is 90,000 units of local currency. The market exchange rate is 30 units per US dollar, and the PPP exchange rate is 20 units per US dollar. Data for Tamba and Kavala are shown below.\n\n" + t,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: 90000 / 30, stem: "Calculate Tamba's GNI per head in US dollars at the market exchange rate.", wrong: [4500, 2700000, 30], explanation: "90,000 ÷ 30 = US\\$3,000." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 90000 / 20, stem: "Calculate Tamba's GNI per head in US dollars at the PPP exchange rate.", wrong: [3000, 1800000, 20], explanation: "90,000 ÷ 20 = US\\$4,500." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: ratio, unit: "%", stem: "By what percentage is Tamba's PPP-adjusted GNI per head higher than Kavala's? Give your answer to one decimal place.", wrong: [13.3, 25, 0.154], explanation: "(4,500 − 3,900) ÷ 3,900 × 100 = 15.4%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why Tamba's PPP income is higher than its income at the market exchange rate.",
          points: ["The prices of many goods and services are lower in Tamba than in countries where the market rate is used for comparison.", "So each US dollar of income buys more in Tamba.", "The PPP rate (20) is lower than the market rate (30), reflecting this lower price level."],
          modelAnswer: "Prices of many goods and services, especially non-traded ones, are lower in Tamba than in the countries used for comparison, so each dollar of income buys more there. The PPP rate of 20 units to the dollar is lower than the market rate of 30, which reflects this lower price level, so the PPP income is higher." }),
      ],
      explanation: "Market-rate US\\$3,000; PPP US\\$4,500; 15.4% higher than Kavala; lower local prices explain the difference." });
  }
  {
    const h = hdi({ lifeExpectancy: 66, meanYears: 8, expectedYears: 12, gniPerCapita: 4500 });
    chk(roundTo(h.health, 3), 0.708); chk(roundTo(h.education, 3), 0.6); chk(roundTo(h.hdi, 3), 0.625);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Health = (LE − 20) ÷ 65.", "Education = (mean ÷ 15 + expected ÷ 18) ÷ 2.", "In (d) consider what each measure includes and leaves out."],
      stem: "**Measuring development in Mbira (fictional, illustrative)**\n\nMbira has a life expectancy of 66 years, mean years of schooling of 8, expected years of schooling of 12 and GNI per head of US\\$4,500. Its income index is 0.575 (calculated from the logarithm formula). Mbira has a large informal sector and a very unequal distribution of income, and its mining industry has damaged the environment. The government says that the country is developing quickly because GNI per head has risen.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "elasticity", dp: 3, value: h.health, stem: "Calculate Mbira's health index, to three decimal places.", wrong: [0.66, 0.7, 0.846], explanation: "(66 − 20) ÷ 65 = 0.708." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", dp: 3, value: h.education, stem: "Calculate Mbira's education index, to three decimal places.", wrong: [0.533, 0.667, 0.5], explanation: "(8 ÷ 15 + 12 ÷ 18) ÷ 2 = (0.533 + 0.667) ÷ 2 = 0.600." }),
        P.num({ label: "(c)", marks: 3, type: "CALCULATION", kind: "elasticity", dp: 3, value: h.hdi, stem: "Using the income index of 0.575, calculate Mbira's HDI, to three decimal places.", wrong: [0.628, 0.628 + 0.1, 0.46], explanation: "HDI = (0.708 × 0.600 × 0.575)^(1/3) = (0.2443)^(1/3) = 0.625.", workedSolution: "1. Health 0.708; education 0.600; income 0.575.\n2. Product = 0.708 × 0.600 × 0.575 = 0.2443.\n3. Geometric mean = 0.2443^(1/3) = 0.625." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the HDI is a better measure than GNI per head of whether Mbira is developing.",
          points: ["The HDI includes health and education as well as income, so it shows whether people's lives are improving.", "GNI per head is a single, easily available figure but an average that hides inequality.", "Neither measure includes inequality in Mbira's distribution, the informal sector or the environmental damage from mining.", "The HDI weights the three dimensions equally and income is logarithmic, so it is less affected by very high incomes.", "Other indicators (MPI, MEW, inequality measures) would give a fuller picture.", "Judgement."],
          modelAnswer: "The HDI is better than GNI per head because it includes life expectancy and years of schooling, so it shows whether people's health and education are improving alongside income, and its logarithmic income index reduces the effect of very high incomes. GNI per head is simpler and easily available, but it is an average that hides inequality and ignores health and education. However, neither measure includes Mbira's very unequal distribution of income, the informal sector, or the environmental damage from mining, so the government's claim of rapid development is not proven by either figure. The HDI is therefore a better single guide, but a fuller assessment would use other indicators such as the MPI or a measure of inequality." }),
      ],
      explanation: "Health 0.708; education 0.600; HDI 0.625; the HDI is broader than GNI per head but still omits inequality and the environment." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider what money measures leave out and what composite measures add."],
    stem: "Assess whether real GDP per head is a reliable measure of the standard of living in a developing economy.",
    points: ["It adjusts for inflation and population and is available regularly.", "It is an average and hides inequality.", "It excludes subsistence output, unpaid work and much of the informal economy.", "It ignores leisure, environmental damage and the quality of goods.", "Prices differ between countries, so PPP is needed for comparison.", "Non-monetary indicators (life expectancy, schooling) and composite indices (HDI) add information.", "Real GDP per head is useful for trends over time within one country.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Real GDP per head is useful because it is adjusted for inflation and population and is available regularly, so it can show trends in average incomes. However, it is only an average and hides inequality, and it excludes subsistence output, unpaid work and much of the informal economy, which are large in developing economies. It also ignores leisure and environmental damage, and market exchange rates can misrepresent purchasing power, so PPP is needed for comparisons between countries. Non-monetary indicators such as life expectancy and schooling and composite indices such as the HDI add important information. Overall it is a useful starting point but not a reliable measure of the standard of living on its own.",
    explanation: "Weigh availability and comparability against averages, omissions and the environment." });

  b.card("DEFINITION", "Define **economic development**.", "A broad improvement in well-being: higher incomes, better health and education, less poverty and inequality.");
  b.card("DEFINITION", "Define **purchasing power parity**.", "An adjustment converting incomes at the rate that equalises the price of a basket of goods, to compare what incomes can buy.");
  b.card("FORMULA", "HDI formula?", "The geometric mean of the health, education and income indices.");
  b.card("FORMULA", "HDI health index?", "(Life expectancy − 20) ÷ (85 − 20).");
  b.card("CONCEPT", "Three problems with GDP per head as a measure of living standards?", "It hides inequality, omits non-market output and the informal sector, and ignores the environment and leisure.");
  b.card("DEFINITION", "What is the **Measure of Economic Welfare (MEW)**?", "GDP adjusted for leisure and unpaid work and net of environmental and urban costs.");
  b.card("DEFINITION", "What is the **Multidimensional Poverty Index**?", "A measure of how many people are deprived in several dimensions of health, education and living standards, and how intensely.");
  b.card("CONCEPT", "State the **Kuznets curve** hypothesis.", "Inequality first rises and then falls as income per head grows (an inverted U); the evidence is mixed.");
  b.card("CONCEPT", "Why is the income index of the HDI logarithmic?", "Extra income adds less to well-being at higher income levels.");
});
