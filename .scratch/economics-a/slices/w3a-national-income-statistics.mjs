// W3a: national income statistics (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, chk, table, fmt, nationalIncome, nationalAccounts, round } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

const gdp = nationalIncome.expenditure({ c: 8200, i: 2300, g: 2700, x: 3100, m: 3500 });
const na = nationalAccounts({ gdpMarket: gdp, taxesOnProducts: 1600, subsidiesOnProducts: 300, netPrimaryIncome: 420, depreciation: 1150 });
chk(gdp, 12800); chk(na.gdpBasic, 11500); chk(na.gni, 13220); chk(na.nni, 12070);

concept("aecon.macro.national-income-statistics", { file: "macro/national-income-statistics", keyPrefix: "macro.national-income-statistics" }, (b) => {
  mc(b, [1, "RECALL"], "Gross domestic product (GDP) is the total value of final goods and services produced",
    ["within a country's borders in a year", "Correct: GDP is a measure of domestic production."],
    [["by a country's citizens anywhere in the world", "That is closer to GNI, which follows the owners of the factors."], ["by the government sector only in a given year", "GDP includes private and public production."], ["at any time since a country's independence", "GDP is measured over a year."]],
    "GDP counts output produced inside the country's borders in a period, whoever owns the factors.");

  mc(b, [2, "UNDERSTANDING"], "Gross national income (GNI) is equal to GDP",
    ["plus net primary income from abroad", "Correct: add income earned abroad by residents less income sent abroad."],
    [["minus depreciation of capital goods used up", "That gives net values (NNI is GNI minus depreciation)."], ["minus taxes on products plus subsidies on products", "That gives GDP at basic prices."], ["divided by the number of people in the population", "That gives a per capita figure."]],
    "GNI = GDP + net primary income from abroad.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is included in GDP calculated by the expenditure approach?",
    ["Spending by firms on new machinery", "Correct: investment (I) is part of expenditure on final output."],
    [["Spending by households on second-hand goods already counted earlier", "Resale of existing goods is not new output."], ["Payments of pensions by the government to retired workers", "Transfer payments are not payment for output."], ["The value of all raw materials bought by firms for production", "Intermediate goods are not counted separately; that would be double counting."]],
    "New capital goods bought by firms are investment, a component of expenditure on final output.");

  mc(b, [2, "UNDERSTANDING"], "Why must the output approach use value added rather than total sales at each stage?",
    ["To avoid counting intermediate goods more than once", "Correct: double counting would overstate GDP."],
    [["Because the sales of firms are difficult to find", "The problem is double counting, not data."], ["Because final goods are not sold to anyone", "Final goods are sold to final users."], ["Because value added includes imports from abroad", "Imports are not part of domestic value added."]],
    "Adding total sales would count the value of intermediate goods several times.");

  mc(b, [3, "APPLICATION"], "In a year, C = 5,000, I = 1,400, G = 1,600, X = 2,000 and M = 2,300 (US\\$ million). GDP at market prices is",
    ["US\\$7,700 million", "Correct: 5,000 + 1,400 + 1,600 + (2,000 − 2,300)."],
    [["US\\$8,300 million", "That adds imports instead of subtracting them from exports."], ["US\\$8,000 million", "That leaves out net exports (X − M)."], ["US\\$12,300 million", "That adds all components including X and M."]],
    "GDP = 5,000 + 1,400 + 1,600 + (2,000 − 2,300) = 8,000 − 300 = US\\$7,700 million.", { hints: ["GDP = C + I + G + (X − M)."], calculator: true });

  mc(b, [3, "APPLICATION"], "GDP at market prices is US\\$900 million, taxes on products are US\\$120 million and subsidies on products are US\\$20 million. GDP at basic prices is",
    ["US\\$800 million", "Correct: 900 − 120 + 20."],
    [["US\\$1,000 million", "That adds taxes and subtracts subsidies, the wrong way round."], ["US\\$780 million", "That subtracts both taxes and subsidies."], ["US\\$1,040 million", "That adds both taxes and subsidies."]],
    "Basic price = market price − taxes on products + subsidies on products = 900 − 120 + 20 = US\\$800 million.", { hints: ["Basic prices exclude taxes and include subsidies."], calculator: true });

  mc(b, [3, "EVALUATION"], "Which is the best reason why GDP per head may overstate the standard of living of the typical person?",
    ["It ignores how income is distributed among households", "Correct: an average can be raised by a few very rich households."],
    [["It includes goods produced for sale in markets", "Market output is what GDP is meant to include."], ["It is measured for a period of one year", "The time period does not cause overstatement."], ["It is always calculated at constant prices", "Constant prices are used for growth, not per capita levels."]],
    "Per capita GDP is an average and does not show inequality.", { hints: ["Which option is a limitation of an average?"] });

  mc(b, [4, "ANALYSIS"], "A country's GNI is lower than its GDP. This suggests that",
    ["more income is paid to foreign owners of factors than residents earn abroad", "Correct: net primary income from abroad is negative."],
    [["the country is producing less than it did in the previous year", "GDP and GNI are measured in the same year; the gap is not growth."], ["the country has no foreign trade with other countries", "The gap relates to income flows, not trade."], ["depreciation is larger than investment in the country", "Depreciation affects the gross-to-net step, not GNI against GDP."]],
    "GNI = GDP + net primary income from abroad, so GNI < GDP means net primary income is negative.", { hints: ["Look at the difference between GDP and GNI."] });

  b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: gdp, unit: "US$ million", calculator: true, daily: true,
    stem: "In a fictional economy (US\\$ million): consumption 8,200, investment 2,300, government spending 2,700, exports 3,100 and imports 3,500. Calculate GDP at market prices, in US\\$ million.",
    wrong: [16300, 13200, 12000], explanation: "GDP = 8,200 + 2,300 + 2,700 + (3,100 − 3,500) = 13,200 − 400 = 12,800." });
  b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: na.gdpBasic, unit: "US$ million", calculator: true, hints: ["Basic price = market price − taxes on products + subsidies on products."],
    stem: "In the same economy taxes on products are US\\$1,600 million and subsidies on products are US\\$300 million. Calculate GDP at basic prices, in US\\$ million.",
    wrong: [14100, 11200, 12800], explanation: "GDP at basic prices = 12,800 − 1,600 + 300 = 11,500." });
  b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: na.nni, unit: "US$ million", calculator: true, hints: ["GNI = GDP + net primary income; NNI = GNI − depreciation."],
    stem: "In the same economy net primary income from abroad is +US\\$420 million and depreciation is US\\$1,150 million. Calculate net national income (NNI) at market prices, in US\\$ million.",
    wrong: [13220, 11650, 11070], explanation: "GNI = 12,800 + 420 = 13,220. NNI = 13,220 − 1,150 = 12,070." });
  b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: gdp / 6.4, calculator: true, hints: ["Per head = total ÷ population (watch the units: millions divided by millions)."],
    stem: "The economy's population is 6.4 million. Calculate GDP per head at market prices, in US\\$.",
    wrong: [2065.6, 1885.9, 1800], explanation: "1. GDP = US\\$12,800 million.\n2. GDP per head = 12,800 million ÷ 6.4 million = US\\$2,000." });
  {
    const stages = [["Farmer (cotton)", 30, 0], ["Ginner (cotton lint)", 55, 30], ["Spinner (yarn)", 90, 55], ["Garment maker (shirts sold to consumers)", 150, 90]];
    const va = stages.map(([, s, i]) => s - i);
    chk(va.reduce((a, x) => a + x, 0), 150);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: va[2], calculator: true, hints: ["Value added = sales − cost of inputs."],
      stem: "A cotton chain: the farmer sells cotton for US\\$30; the ginner sells lint for US\\$55; the spinner sells yarn for US\\$90; the garment maker sells shirts to consumers for US\\$150. Calculate the value added by the spinner, in US\\$.",
      wrong: [90, 55, 25], explanation: "Spinner's value added = 90 − 55 = US\\$35. (The sum of all value added is 30 + 25 + 35 + 60 = US\\$150, the value of the final shirts.)" });
  }
  {
    const sectors = [["Agriculture", 1800], ["Mining", 1300], ["Manufacturing", 2100], ["Services", 6300]];
    const tot = sectors.reduce((a, x) => a + x[1], 0); chk(tot, 11500);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: 6300 / 11500 * 100, dp: 1, calculator: true, hints: ["Share = sector value added ÷ total × 100."],
      stem: "Value added by sector (US\\$ million): agriculture 1,800; mining 1,300; manufacturing 2,100; services 6,300. Calculate the share of services in the total value added, to one decimal place.",
      wrong: [63, 5.5, 18.3], explanation: "Total = 1,800 + 1,300 + 2,100 + 6,300 = 11,500. Services share = 6,300 ÷ 11,500 × 100 = 54.8%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The output, income and expenditure approaches should in principle give the same value for GDP.", answer: true,
    explanation: "True. The value of output is paid out as incomes and is spent by someone, so the three measures are equal (apart from statistical errors)." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Is unpaid work sold in a market?"], stem: "Housework done unpaid by family members is included in GDP.", answer: false,
    explanation: "False. Unpaid household work is not sold in a market and is normally not counted, which is a limitation of GDP." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each measure with its definition.",
    pairs: [["GDP", "Value of final output produced within the country's borders"], ["GNI (GNP)", "GDP plus net primary income from abroad"], ["NNI (NNP)", "GNI minus depreciation"], ["Value added", "Output value minus the cost of intermediate inputs"]],
    explanation: "GDP is domestic production; GNI adds net income from abroad; NNI subtracts depreciation; value added avoids double counting." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "To move from GDP at market prices to GDP at basic prices, {{blank:a}} on products are subtracted and {{blank:b}} on products are added.",
    blanks: [{ id: "a", accepted: ["taxes"], choices: ["taxes", "subsidies", "profits"] }, { id: "b", accepted: ["subsidies"], choices: ["subsidies", "taxes", "wages"] }],
    explanation: "Basic prices = market prices − taxes on products + subsidies on products." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the error that arises if the full value of intermediate goods is added to the value of final goods when measuring national output.",
    accepted: ["double counting", "double-counting", "counting twice"], wrong: ["depreciation"],
    explanation: "Double counting." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between GDP and GNI.",
    points: ["GDP is the value of output produced within a country's borders.", "GNI is GDP plus net primary income from abroad (income of residents from abroad less income sent abroad)."],
    modelAnswer: "GDP is the value of final output produced within a country's borders, while GNI is GDP plus net primary income from abroad, that is, income earned abroad by residents less income paid abroad to foreigners.",
    explanation: "One mark for each definition." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of the circular flow."],
    stem: "Explain why the output, income and expenditure approaches to national income give the same total.",
    points: ["The value of output produced is the value of goods and services made.", "This output is sold, so spending on it equals its value.", "The money paid for output becomes incomes for factors (wages, rent, interest and profit).", "So output = expenditure = income, in principle."],
    modelAnswer: "The value of what is produced is the value of the goods and services made. All of this output is sold, so expenditure equals the value of output. The money spent becomes incomes for the factors of production as wages, rent, interest and profit. So output, expenditure and income are equal in principle.",
    explanation: "Output, expenditure, income and the circular flow link." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Give limitations, then a judgement."],
    stem: "Assess whether GDP per head is a good measure of the standard of living in a developing economy.",
    points: ["It measures average output per person, so it is useful for broad comparison over time and between countries.", "It understates output where there is a large informal sector and subsistence production.", "It ignores the distribution of income, so the average may hide poverty.", "It does not count externalities such as pollution, or leisure and working conditions.", "Other indicators (life expectancy, schooling) show different aspects of living standards.", "A justified judgement."],
    modelAnswer: "GDP per head is useful as a broad measure of average output per person and for comparison over time and between countries. However, in a developing economy it understates output because of the large informal sector and subsistence production, it ignores how income is distributed so the average may hide poverty, and it does not count pollution, leisure or working conditions. Other indicators such as life expectancy and years of schooling show other aspects of living standards. Overall it is a good starting point but should be used with other indicators.",
    explanation: "Uses, limitations, other indicators, judgement." });

  {
    const g3 = nationalIncome.expenditure({ c: 7600, i: 2000, g: 2500, x: 3400, m: 3000 });
    const n3 = nationalAccounts({ gdpMarket: g3, taxesOnProducts: 1500, subsidiesOnProducts: 250, netPrimaryIncome: 340, depreciation: 1250 });
    chk(g3, 12500); chk(n3.gni, 12840); chk(n3.nni, 11590); chk(n3.gdpBasic, 11250);
    const t1 = table(["Item", "US\\$ million"], [["Household consumption", 7600], ["Investment", 2000], ["Government spending", 2500], ["Exports", 3400], ["Imports", 3000], ["Taxes on products", 1500], ["Subsidies on products", 250], ["Net primary income from abroad", 340], ["Depreciation", 1250]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Use GDP = C + I + G + (X − M), then make the adjustments one at a time."],
      stem: `**The national accounts of Zandia (illustrative data)**\n\nZandia is a fictional country.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: g3, unit: "US$ million", stem: "Calculate GDP at market prices, in US\\$ million.", wrong: [15500, 12100, 11250], explanation: "7,600 + 2,000 + 2,500 + (3,400 − 3,000) = 12,100 + 400 = 12,500." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: n3.gni, unit: "US$ million", stem: "Calculate gross national income (GNI), in US\\$ million.", wrong: [12160, 11250, 11590], explanation: "GNI = GDP + net primary income from abroad = 12,500 + 340 = 12,840." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: n3.nni, unit: "US$ million", stem: "Calculate net national income (NNI), in US\\$ million.", wrong: [14090, 11250, 12840], explanation: "NNI = GNI − depreciation = 12,840 − 1,250 = 11,590." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why GNI is greater than GDP in Zandia.",
          points: ["Net primary income from abroad is positive (+US\\$340 million).", "Residents of Zandia earn more income from abroad than foreign residents take out of Zandia."],
          modelAnswer: "Net primary income from abroad is positive, US\\$340 million, because Zandia's residents earn more income from abroad than foreign owners of factors take out of Zandia." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two reasons why GDP may understate the true output of Zandia.",
          points: ["Informal sector activity is not recorded.", "Subsistence farming and unpaid household work are not sold in markets."],
          modelAnswer: "Informal sector activity is not recorded, and subsistence farming and unpaid household work are not sold in markets, so they are left out." }),
      ],
      explanation: "GDP 12,500; GNI 12,840; NNI 11,590; positive net primary income raises GNI above GDP; informal and unpaid output are missed." });
  }
  {
    const t2 = table(["Year", "GDP (US\\$ million)", "GNI (US\\$ million)", "Population (million)"], [["Year 1", 9600, 8640, 4.8], ["Year 2", 10560, 9504, 4.8]]);
    const g1 = 9600 / 4.8, g2 = 10560 / 4.8; chk(g1, 2000); chk(g2, 2200);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["GNI is below GDP when net primary income is negative.", "Percentage change = change ÷ original × 100."],
      stem: `**Mining income in a fictional country (illustrative data)**\n\nMost of the country's mines are owned by foreign companies, which send their profits abroad. Nominal figures are shown; prices were stable in both years.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 9600 - 8640, unit: "US$ million", stem: "Calculate net primary income from abroad in Year 1, in US\\$ million (a negative number for an outflow).", wrong: [960, 18240, 0], explanation: "GNI − GDP = 8,640 − 9,600 = −960. The country pays out US\\$960 million more than it receives." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: g2, stem: "Calculate GDP per head in Year 2, in US\\$.", wrong: [2200.1, 1980, 22000], explanation: "10,560 ÷ 4.8 = US\\$2,200." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: (10560 - 9600) / 9600 * 100, dp: 1, stem: "Calculate the percentage change in GDP between Year 1 and Year 2.", wrong: [9.1, 10, 0.1], explanation: "(10,560 − 9,600) ÷ 9,600 × 100 = 10.0%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether GDP or GNI is a better measure of the income available to the country's residents.",
          points: ["GNI includes income earned by residents abroad and excludes profits sent abroad by foreign owners.", "Here GNI is lower than GDP because of the outflow of profits (US\\$960 million in Year 1), so GDP overstates residents' income.", "But GDP shows the output and jobs created within the country, which matter for employment and tax revenue.", "A judgement: GNI is a better measure of residents' income, while GDP is a better measure of domestic production."],
          modelAnswer: "GNI includes the income earned by residents abroad and excludes the profits sent abroad by foreign owners, so it is a better measure of the income available to residents. In this country GNI is US\\$960 million lower than GDP in Year 1, so GDP overstates residents' income. However, GDP shows the output and jobs created within the country, which matter for employment and tax revenue. Overall GNI is better for residents' income and GDP for domestic production." }),
      ],
      explanation: "Net primary income −US\\$960 million; GDP per head US\\$2,200; GDP +10.0%; GNI better measures residents' income, GDP domestic production." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Use specific limitations of the statistics.", "Reach a judgement."],
    stem: "Assess the usefulness of national income statistics for comparing living standards in different countries.",
    points: ["National income per head gives a simple, widely available measure of average output.", "It allows comparison over time and between countries and shows the structure of the economy.", "Exchange rate conversion may not reflect purchasing power; PPP adjustments help.", "The informal economy and subsistence output are understated, especially in developing countries.", "Distribution of income is hidden by the average.", "Externalities, depletion of resources and pollution are not subtracted.", "Leisure, health, education and quality of life are not measured directly.", "Data quality differs between countries and the figures are revised.", "Supplementary indicators (life expectancy, education, poverty) give a fuller picture.", "A justified judgement."],
    levels: LV10,
    modelAnswer: "National income per head is a simple and widely available measure that allows comparison between countries and over time, and shows the structure of the economy. However, there are several limitations. Converting at exchange rates may not reflect the purchasing power of incomes, though purchasing power adjustments help. The informal economy and subsistence output are understated, especially in developing countries, so their living standards may be underestimated. The average hides the distribution of income, and the figures do not subtract pollution or depletion of resources, nor measure leisure, health or education. Data quality also differs between countries. Supplementary indicators such as life expectancy, education and poverty rates give a fuller picture. Overall, national income statistics are a useful starting point for comparison but should be used with other indicators.",
    wordLimit: { min: 120, max: 350 },
    explanation: "Weigh the convenience of the statistic against its limitations; supplement with other indicators." });

  b.card("DEFINITION", "Define **GDP**.", "The total value of final goods and services produced within a country's borders in a year.");
  b.card("FORMULA", "How are **GNI** and **NNI** found from GDP?", "GNI = GDP + net primary income from abroad; NNI = GNI − depreciation. (ZIMSEC: GNP and NNP.)");
  b.card("FORMULA", "What is the expenditure formula for GDP?", "GDP = C + I + G + (X − M).");
  b.card("FORMULA", "How do you move from market prices to basic prices?", "GDP at basic prices = GDP at market prices − taxes on products + subsidies on products.");
  b.card("DEFINITION", "What is **value added**?", "The value of output minus the value of the intermediate inputs bought from other firms.");
  b.card("CONCEPT", "What are the three approaches to national income?", "Output (value added), income (wages, rent, interest, profit) and expenditure (C + I + G + X − M); in principle they give the same total.");
  b.card("CONCEPT", "What is double counting?", "Counting the value of intermediate goods more than once, as well as the final goods that contain them.");
  b.card("CONCEPT", "Give four limitations of national income statistics.", "Informal and non-marketed output, distribution hidden by averages, externalities ignored, and quality of data.");
  b.card("FORMULA", "How do you calculate national income per head?", "National income (GDP, GNI or NNI) ÷ population.");
});
