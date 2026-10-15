// W3b: dev.indicators-sectors (ZIMSEC only, Form 5). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";
import { hdi, X, Y } from "../tables/w3b-dev-indicators-sectors.mjs";

const gdpPc = chk(24e9 / 15e6, 1600, 1e-6);
const gdpG = chk(((21.4 - 20.0) / 20.0) * 100, 7, 1e-9);
const lei705 = rnd((70.5 - 20) / 65, 3, 0.777, "lei705");
const hx = hdi(X);
const hy = hdi(Y);
const hdiX = rnd(hx.hdi, 3, 0.593, "hdiX");
const hdiY = rnd(hy.hdi, 3, 0.77, "hdiY");
const leiY = rnd(hy.lei, 3, 0.846, "leiY");
const gni = (v) => String(v).replace(/^(\d+)(\d{3})$/, "$1 $2");
const CT = tbl(["Indicator", "Country X", "Country Y"], [
  ["Life expectancy at birth (years)", X.le, Y.le], ["Expected years of schooling", X.eys.toFixed(1), Y.eys.toFixed(1)], ["Mean years of schooling", X.mys.toFixed(1), Y.mys.toFixed(1)], ["GNI per capita (PPP, US\\$)", gni(X.gni), gni(Y.gni)],
]);
// Struct B: sectors
const EMP = { 2000: [62, 11, 27], 2020: [48, 13, 39] };
const GDP = { 2000: [24, 28, 48], 2020: [17, 24, 59] };
for (const y of [2000, 2020]) { chk(EMP[y].reduce((a, c) => a + c, 0), 100); chk(GDP[y].reduce((a, c) => a + c, 0), 100); }
const fallPrim = chk(EMP[2000][0] - EMP[2020][0], 14);
const ow = rnd(GDP[2020][0] / EMP[2020][0], 2, 0.35, "ow");
const owT = rnd(GDP[2020][2] / EMP[2020][2], 2, 1.51, "owT");
const ST = tbl(["Sector", "Share of employment 2000 (%)", "Share of employment 2020 (%)", "Share of GDP 2000 (%)", "Share of GDP 2020 (%)"], ["Primary", "Secondary", "Tertiary (including quaternary)"].map((n, i) => [n, EMP[2000][i], EMP[2020][i], GDP[2000][i], GDP[2020][i]]));
const ratioIncome = chk(Math.round((8200 / 1300) * 10) / 10, 6.3, 1e-9);

concept("ageo.dev.indicators-sectors", { file: "dev/indicators-sectors", keyPrefix: "dev.indicators-sectors", applies: ZIM }, (b) => {
  mc(b, 2, "RECALL", "What three dimensions does the Human Development Index combine?", [
    ["Health, education and income", "Correct: life expectancy, years of schooling and GNI per capita."],
    ["Population, area and climate", "These are not the dimensions of HDI."],
    ["Trade, tourism and industry", "These are economic activities, not HDI dimensions."],
    ["Birth rate, death rate and migration", "These are demographic measures."],
  ], "HDI combines **health, education and income**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is GDP per capita an incomplete measure of development?", [
    ["It is an average that hides inequality and omits non-market activity", "Correct: it says nothing about how income is shared."],
    ["It measures only life expectancy and the quality of schools", "It measures income per person."],
    ["It can only be calculated for countries that have no informal sector at all", "It can be calculated for any country, but the informal sector is poorly recorded."],
    ["It is always lower in richer countries than in poorer countries", "It is generally higher in richer countries."],
  ], "GDP per capita is an **average**: it hides differences and omits unrecorded work.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which activity belongs to the quaternary sector?", [
    ["Developing software and carrying out research", "Correct: knowledge-based activities are quaternary."],
    ["Mining gold from an underground mine", "Mining is a primary activity."],
    ["Making furniture in a sawmill and workshop", "Manufacturing is a secondary activity."],
    ["Selling goods in a shop in the centre of the town", "Retail is a tertiary activity."],
  ], "**Research and information technology** are quaternary activities.");
  mc(b, 3, "ANALYSIS", "A country has a high GNI per capita but a short life expectancy and low literacy. What does this suggest?", [
    ["Income alone does not show development or how it is shared", "Correct: a broader set of indicators gives a fuller picture."],
    ["The country is fully developed because its income is so high", "Other indicators suggest weaknesses."],
    ["The data must be wrong, since income always determines health", "Income and health are linked but not identical."],
    ["Life expectancy is not a measure of development at all", "It is one of the main social indicators."],
  ], "Different indicators can **disagree**: use several.", { hints: ["Look at the social indicators."] });
  mc(b, 3, "ANALYSIS", "In the Clark–Fisher model, what usually happens to employment as a country develops?", [
    ["The share in the primary sector falls and the share in services rises", "Correct: workers move from farming to manufacturing and then to services."],
    ["The share in the primary sector rises and the share in services falls too", "This is the reverse of the usual pattern."],
    ["All sectors keep exactly the same share of workers", "The shares change as the economy changes."],
    ["Only the secondary sector grows, to 100% of workers", "No sector reaches 100%."],
  ], "Employment moves **from primary to secondary and then tertiary**.", { hints: ["Think of what happens to farming jobs."] });
  mc(b, 3, "EVALUATION", "Which is a limitation of using literacy rate as a measure of development?", [
    ["Definitions vary and it does not measure the quality of education", "Correct: it is a basic measure that says little about quality."],
    ["It cannot be collected in any country", "Literacy is widely collected in censuses and surveys."],
    ["It measures only income", "It measures reading and writing ability."],
    ["It is always higher in poorer countries than in richer ones with more schools", "It is usually higher in richer countries."],
  ], "Literacy is **simple but basic**: definitions vary and quality is not shown.", { hints: ["Consider what the figure leaves out."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A country with a high HDI has no inequality within its population.", answer: false,
    feedbackTrue: "Not so: HDI is based on national averages.", feedbackFalse: "Correct: HDI is a national average and does not show inequality within the country.",
    explanation: "HDI uses **averages**, so it hides inequality between groups and regions." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each activity to its sector.",
    pairs: [
      ["Growing tobacco", "Primary"],
      ["Milling maize into mealie meal", "Secondary"],
      ["Running a bus service", "Tertiary"],
      ["Researching new crop varieties", "Quaternary"],
      ["Mining platinum", "Primary"],
    ], explanation: "Primary extracts, secondary processes, tertiary serves and quaternary handles knowledge." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "{{blank:a}} is the total value of goods and services produced inside a country in a year. The {{blank:b}} adjusts incomes for differences in the cost of living between countries, and the Gini coefficient measures {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["GDP"], choices: ["GDP", "HDI", "IMR"] },
      { id: "b", accepted: ["PPP"], choices: ["PPP", "GNI", "CBD"] },
      { id: "c", accepted: ["inequality"], choices: ["inequality", "literacy", "population"] },
    ], explanation: "GDP, purchasing power parity (PPP) and inequality." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the sector of the economy that includes farming, mining, forestry and fishing.",
    accepted: ["primary", "primary sector", "primary activities", "the primary sector"],
    explanation: "The **primary sector** extracts or grows raw materials." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "A country has a GDP of US\\$ 24 billion and a population of 15 million people. Calculate the GDP per capita, in US\\$.",
    hints: ["GDP ÷ population; 24 billion = 24 000 million."],
    value: gdpPc, wrong: [1.6, 160, 360],
    explanation: "24 000 000 000 ÷ 15 000 000 = **US\\$ 1 600** per person. The value 1.6 is in thousands of dollars." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A country's GDP rises from US\\$ 20.0 billion to US\\$ 21.4 billion in a year. Calculate the percentage growth.",
    hints: ["Increase ÷ original × 100."],
    value: gdpG, wrong: [1.4, 6.5, 107],
    explanation: "(21.4 − 20.0) ÷ 20.0 × 100 = **7.0%**. The value 6.5 divides by the new value." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "For the HDI, the life expectancy index = (life expectancy − 20) ÷ (85 − 20). Calculate the index for a country with life expectancy of 70.5 years, to three decimal places.",
    hints: ["70.5 − 20 = 50.5."],
    value: lei705, dp: 3, wrong: [0.829, 0.993, 50.5],
    explanation: "(70.5 − 20) ÷ 65 = 50.5 ÷ 65 = **0.777**. Dividing by 85 would give 0.594." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "Country Q has a GNI per capita of US\\$ 8 200 and Country P has US\\$ 1 300. How many times greater is Q's GNI per capita than P's, to one decimal place?",
    hints: ["8 200 ÷ 1 300."],
    value: ratioIncome, dp: 1, wrong: [0.16, 6900, 7.3],
    explanation: "8 200 ÷ 1 300 = **6.3 times**. The value 0.16 inverts the ratio." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why using several indicators gives a better measure of development than GDP per capita alone.",
    hints: ["Think of what GDP misses."],
    points: [
      "GDP per capita measures only income, not health, education or access to services.",
      "It is an average that hides inequality between rich and poor and between regions.",
      "It leaves out unpaid and informal work, which is large in many low-income countries.",
      "Social indicators such as life expectancy and literacy show whether income is turned into well-being, so combining them gives a fuller picture.",
    ],
    modelAnswer: "GDP per capita measures only income, not health, education or access to services. It is an average that hides inequality between rich and poor and between regions. It leaves out unpaid and informal work, which is large in many low-income countries. Social indicators such as life expectancy and literacy show whether income is turned into well-being, so combining them gives a fuller picture.",
    explanation: "Income, averages, informal work and social indicators." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Describe how you would carry out a survey to compare the level of development of two wards in your district.",
    hints: ["Choose indicators, collect primary and secondary data, and evaluate."],
    points: [
      "Choose measurable indicators, such as housing materials, access to safe water and electricity, distance to clinics and schools, and type of employment.",
      "Collect primary data by a questionnaire given to a fair sample (for example systematic or stratified) of households in each ward, and by observation and mapping of services.",
      "Collect secondary data, such as census figures from ZimStat and council or clinic records.",
      "Present the results in tables and maps, compare the wards, and evaluate the reliability (sample size, honesty of answers, season) while keeping answers confidential.",
    ],
    modelAnswer: "I would choose indicators such as housing materials, access to safe water and electricity, distance to clinics and schools, and types of employment. I would collect primary data with a questionnaire given to a fair sample of households in each ward and by observing and mapping services, and secondary data such as ZimStat census figures. I would present the results in tables and maps, compare the wards and evaluate reliability, keeping answers confidential.",
    explanation: "Indicators, primary and secondary data, presentation and evaluation." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why processing raw materials (secondary activity) usually contributes more to development than exporting them unprocessed.",
    hints: ["Think of value, jobs and linkages."],
    points: [
      "Processing adds value, so the product sells for a higher price than the raw material.",
      "It creates more and more skilled jobs in factories and related services.",
      "It creates links with suppliers, transport and other businesses (linkages and multiplier effects).",
      "It makes the economy less dependent on unstable prices of raw materials and earns more export income.",
    ],
    modelAnswer: "Processing adds value, so the product sells for a higher price than the raw material. It creates more and more skilled jobs in factories and related services, and links with suppliers, transport and other businesses. It also makes the economy less dependent on unstable raw material prices and earns more export income.",
    explanation: "Value added, jobs, linkages and stability." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess the usefulness of the infant mortality rate as an indicator of development.",
    hints: ["Give a strength and a limit."],
    points: [
      "Strength: it is sensitive to health care, nutrition, sanitation and the education of mothers, so it reflects living conditions.",
      "Limit: the data may be unreliable where births and deaths are not registered, and national averages hide differences between rural and urban areas.",
      "Judgement: it is useful, but best used with other indicators such as income and education.",
    ],
    modelAnswer: "It is sensitive to health care, nutrition, sanitation and mothers' education, so it reflects living conditions. However, the data may be unreliable where births and deaths are not registered, and national averages hide differences between areas. It is useful, but best used with income and education indicators.",
    explanation: "Strength, limit and judgement." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives illustrative development data for two countries (invented for this exercise).\n\n${CT}\n\nThe HDI is the cube root of (life expectancy index × education index × income index). The life expectancy index = (life expectancy − 20) ÷ (85 − 20). For Country Y the education index is 0.722 and the income index is 0.746.`,
    hints: ["Cube root = raise to the power 1/3.", "HDI of 0.700–0.799 is high; 0.550–0.699 is medium."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the life expectancy index for Country Y, to three decimal places.", value: leiY, dp: 3, wrong: [0.882, 75, 0.926],
        explanation: "(75 − 20) ÷ (85 − 20) = 55 ÷ 65 = 0.846." }),
      P.num({ label: "(b)", marks: 3, type: "CALCULATION", stem: "Calculate the HDI of Country Y, to three decimal places.", value: hdiY, dp: 3, wrong: [0.456, 0.746, 0.6],
        explanation: "0.846 × 0.722 × 0.746 = 0.4557. The cube root of 0.4557 = 0.770. (The value 0.456 is the product before taking the cube root.)" }),
      P.mcq({ label: "(c)", marks: 1, stem: "Into which HDI group does Country Y fall?", options: [
        ["High human development", "Correct: 0.770 lies between 0.700 and 0.799."],
        ["Very high human development", "Very high needs 0.800 or more."],
        ["Medium human development", "Medium is 0.550–0.699."],
        ["Low human development", "Low is below 0.550."],
      ], answer: "A", explanation: "0.770 is in the 0.700–0.799 band." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two limitations of using the HDI to compare Country X and Country Y.",
        points: ["It uses national averages and hides inequality within each country (rich and poor, urban and rural).", "It leaves out other aspects of development such as the environment, freedom and security, and the quality of the data may differ between countries."],
        modelAnswer: "It uses national averages and hides inequality within each country. It also leaves out the environment, freedom and security, and the quality of data may differ between the countries.",
        explanation: "Averages and omitted dimensions." }),
    ], explanation: "Calculate and interpret a composite index and evaluate its limits." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows illustrative changes in the structure of the economy of a country between 2000 and 2020 (data invented for this exercise).\n\n${ST}`,
    hints: ["Output per worker relative to the average = share of GDP ÷ share of employment.", "Think about why people move between sectors."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which sector's share of employment fell between 2000 and 2020?", options: [
        ["Primary", "Correct: it fell from 62% to 48%."],
        ["Secondary", "It rose from 11% to 13%."],
        ["Tertiary", "It rose from 27% to 39%."],
        ["All three sectors", "The shares of secondary and tertiary rose."],
      ], answer: "A", explanation: "Only the primary share fell." }),
      P.num({ label: "(b)", marks: 2, stem: "By how many percentage points did the share of employment in the primary sector fall?", value: fallPrim, unit: "%", wrong: [22.6, 14.0 * 2, 62],
        explanation: "62 − 48 = 14 percentage points." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the output per worker in the primary sector in 2020, relative to the national average (share of GDP ÷ share of employment), to two decimal places.", value: ow, dp: 2, wrong: [3.53, 0.17, 1.51],
        explanation: "17 ÷ 48 = 0.35, so a primary worker produced about 35% of the national average." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the share of employment in services often increases as a country develops.",
        points: ["Higher incomes increase demand for services such as education, health care, retail, banking and tourism.", "Mechanisation and better methods in farming and manufacturing mean fewer workers are needed for the same output.", "Urbanisation and better transport and communications make services easier to provide and use."],
        modelAnswer: "Higher incomes increase demand for services such as education, health care, retail and banking. Mechanisation and better methods mean fewer workers are needed in farming and manufacturing. Urbanisation and better transport and communications make services easier to provide.",
        explanation: "Demand, productivity and urbanisation." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far the structure of employment is a good indicator of the level of development.",
        points: ["A low share in primary work and high shares in secondary and tertiary work are usually linked with higher incomes and productivity, as the table shows (primary output per worker is only 0.35 of the average).", "It is easy to measure and compare between countries and over time.", "But it does not show income, working conditions or inequality, and a large informal service sector (such as street vending) may be low-paid.", "Some rich countries rely on primary exports, so it should be used with other indicators such as income, life expectancy and education."],
        modelAnswer: "A low share in primary work and high shares in secondary and tertiary work are usually linked with higher productivity, as in the table, where primary output per worker is only 0.35 of the average. The measure is easy to compare between countries and over time. But it does not show income, conditions or inequality, and a large informal service sector may be low-paid. Some rich countries rely on primary exports, so it should be used with other indicators.",
        explanation: "Weigh usefulness against limits." }),
    ], explanation: "Interpret a change in economic structure, calculate productivity and assess an indicator." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the usefulness of the Human Development Index as a measure of the level of development of a country.",
    hints: ["Give advantages, disadvantages and a conclusion."],
    points: [
      "HDI combines three dimensions (health, education and income), so it gives a broader picture than GDP per capita alone.",
      "It is a single number from 0 to 1, simple to compare between countries and over time, and countries are placed in clear groups.",
      "It shows that income and well-being do not always match: some countries have a higher HDI rank than their income suggests because of strong health and education.",
      "It uses national averages and hides inequality between rich and poor, regions and genders.",
      "It leaves out the environment, security, freedom and the informal economy.",
      "The three parts are given fixed weights and combined by a cube root, so a low score in one dimension reduces the whole index; the choice of goalposts is arbitrary.",
      "Data quality varies, because many countries lack accurate registration of births, deaths and schooling.",
      "Judgement: HDI is more useful than GDP per capita, but still limited, so it should be used together with indicators of inequality, environment and local surveys.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The Human Development Index combines health, education and income, so it gives a broader picture than GDP per capita alone. It is a single number between 0 and 1 that is easy to compare between countries and over time, and it shows that income and well-being do not always match: some countries rank higher on HDI than on income because of their health and education. However, it uses national averages and hides inequality between groups and regions. It leaves out the environment, security, freedom and the informal economy, its weights and goalposts are fixed, and data quality varies. I conclude that HDI is more useful than GDP per capita but still limited, so it should be used with indicators of inequality and the environment and with local surveys.",
    wordLimit: { max: 300 }, explanation: "Weigh advantages against limits and judge." });

  b.card("DEFINITION", "GDP and GNI", "GDP: value of goods and services produced inside a country in a year. GNI: GDP plus income from abroad minus income sent abroad. Per capita = divided by population.");
  b.card("DEFINITION", "Human Development Index", "A composite index from 0 to 1 combining life expectancy, years of schooling and GNI per capita; very high ≥ 0.800, high 0.700–0.799, medium 0.550–0.699, low < 0.550.");
  b.card("FORMULA", "HDI calculation", "Dimension index = (value − minimum) ÷ (maximum − minimum); education index is the mean of expected and mean years of schooling indices; income uses logarithms; HDI = cube root of (health × education × income).");
  b.card("CONCEPT", "Limits of indicators", "National averages hide inequality; informal and unpaid work and the environment are omitted; definitions and data quality vary; use several indicators together.");
  b.card("CONCEPT", "Economic sectors", "Primary: raw materials. Secondary: manufacturing and construction. Tertiary: services. Quaternary: knowledge and information (research, IT).");
  b.card("CONCEPT", "Clark–Fisher model", "As an economy develops, employment shifts from the primary sector to the secondary and then to the tertiary and quaternary sectors.");
  b.card("CONCEPT", "Surveying local development", "Choose indicators; collect primary data (questionnaires, observation, mapping) and secondary data (ZimStat, council records); present; evaluate reliability and ethics.");
  b.card("FORMULA", "Output per worker (relative)", "Share of GDP of a sector ÷ share of employment of that sector; below 1 means below the national average.");
});
