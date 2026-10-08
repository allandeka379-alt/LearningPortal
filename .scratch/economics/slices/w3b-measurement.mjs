// W3b: econ.national-income.measurement (ZIMSEC only) — GDP, GNP, net income from abroad, output / income /
// expenditure methods, components C, I, G, X, M. Figures differ from the lesson's worked examples.
import { concept, P, table, nationalIncome, pctChange, pct, fmt, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.national-income.measurement", { file: "national-income/measurement", keyPrefix: "national-income.measurement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Gross Domestic Product (GDP) is the total value of",
    options: [
      ["final goods and services produced within a country in one year.", "Correct: GDP measures production inside the country's borders."],
      ["all goods and services produced by a country's citizens anywhere in the world.", "Production by residents at home and abroad is closer to GNP."],
      ["all sales of goods, including raw materials, made in a country in one year.", "Counting raw materials and final goods together is double counting."],
      ["goods and services exported by a country in one year.", "Exports are only one component of GDP."],
    ],
    answer: "A",
    explanation: "GDP is the market value of final output produced within a country's borders in a year, whoever owns the factors of production.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Gross National Product (GNP) is equal to",
    options: [
      ["GDP plus net income from abroad.", "Correct: income flowing in minus income flowing out is added to GDP."],
      ["GDP minus exports plus imports.", "Exports and imports are already inside GDP by expenditure."],
      ["GDP plus all transfer payments made by the government.", "Transfer payments are not payments for output."],
      ["GDP divided by the population of the country.", "That is GDP per head."],
    ],
    answer: "A",
    explanation: "GNP = GDP + net income from abroad (income earned abroad by residents minus income paid to foreigners).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is part of **government spending (G)** when GDP is measured by the expenditure method?",
    options: [
      ["Salaries paid to government nurses", "Correct: the government buys the nurses' services, which are output."],
      ["State pensions paid to retired workers", "Pensions are transfer payments: nothing is produced in return."],
      ["Grants paid to university students", "Grants are transfer payments, not spending on output."],
      ["Interest paid on old government loans", "Debt interest is a transfer, not a purchase of current output."],
    ],
    answer: "A",
    explanation: "G includes only spending on goods and services, such as salaries of public servants and road building; transfer payments are excluded.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When national income is measured by the **income method**, which item is left out?",
    options: [
      ["Pensions paid to retired civil servants", "Correct: a transfer payment, not a reward for current production."],
      ["Rent received by a landlord for a shop in Gweru", "Rent is the reward for land and is included."],
      ["Profits earned by a bus company", "Profits are the reward for enterprise and are included."],
      ["Wages earned by mine workers in Hwange", "Wages are the reward for labour and are included."],
    ],
    answer: "A",
    explanation: "The income method adds wages, rent, interest and profits; transfer payments such as pensions are excluded.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How do statisticians avoid **double counting** when they measure national income by the output method?",
    options: [
      ["They add only the value added at each stage of production", "Correct: value added excludes inputs bought from other firms."],
      ["They add the value of all sales made by every firm", "Adding every sale counts intermediate goods more than once."],
      ["They leave out the output of the services sector", "Services are final output and must be counted."],
      ["They subtract exports from the value of all output", "Exports are produced in the country and are part of output."],
    ],
    answer: "A",
    hints: ["Think about the maize that is counted again inside the price of mealie-meal."],
    explanation: "Counting only value added (or final goods only) means each piece of output is counted once.",
  });
  {
    const e = { c: 4100, i: 950, g: 1300, x: 1450, m: 1800 };
    const gdp = nationalIncome.expenditure(e);
    check("mcq gdp", gdp, 6000);
    const addM = e.c + e.i + e.g + e.x + e.m, noNet = e.c + e.i + e.g, xOnly = e.c + e.i + e.g + e.x;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional country has consumption of US\\$${fmt(e.c)} million, investment of US\\$${fmt(e.i)} million, government spending of US\\$${fmt(e.g)} million, exports of US\\$${fmt(e.x)} million and imports of US\\$${fmt(e.m)} million. What is its GDP?`,
      options: [
        [`US\\$${fmt(gdp)} million`, `Correct: ${fmt(e.c)} + ${fmt(e.i)} + ${fmt(e.g)} + (${fmt(e.x)} − ${fmt(e.m)}) = ${fmt(gdp)}.`],
        [`US\\$${fmt(addM)} million`, "This adds imports instead of subtracting them."],
        [`US\\$${fmt(noNet)} million`, "This leaves out net exports altogether."],
        [`US\\$${fmt(xOnly)} million`, "This adds exports but forgets to subtract imports."],
      ],
      answer: "A",
      hints: ["GDP = C + I + G + (X − M)."],
      explanation: `GDP = C + I + G + (X − M) = ${fmt(e.c)} + ${fmt(e.i)} + ${fmt(e.g)} + (${fmt(e.x - e.m)}) = US\\$${fmt(gdp)} million.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A foreign-owned platinum mine in Zimbabwe sends all its profits to its owners overseas. How are the mine's output and profits treated in Zimbabwe's national accounts?",
    options: [
      ["Its output is in GDP; the profits sent abroad reduce GNP", "Correct: production is inside the country, but the income goes to foreigners."],
      ["Its output is in GNP but not in GDP", "The mine produces inside Zimbabwe, so its output is part of GDP."],
      ["Its output is left out of both GDP and GNP", "Production inside the borders is always part of GDP."],
      ["Its profits are added to GNP as income from abroad", "Profits paid to foreign owners flow out, so they are subtracted."],
    ],
    answer: "A",
    hints: ["GDP asks where production happens; GNP asks who receives the income."],
    explanation: "GDP counts all production within the borders. Profits paid to foreign owners are income paid abroad, which makes net income from abroad lower and so reduces GNP relative to GDP.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Tendai buys a new imported refrigerator for US\\$600. Nothing else changes. What is the effect on GDP measured by the expenditure method?",
    options: [
      ["No change, because consumption and imports both rise by US\\$600", "Correct: C rises by 600 and M rises by 600, so C + I + G + (X − M) is unchanged."],
      ["GDP rises by US\\$600, because consumption has increased", "The rise in imports cancels the rise in consumption."],
      ["GDP falls by US\\$600, because imports have increased", "The fall in net exports is offset by higher consumption."],
      ["GDP rises by US\\$1,200, because consumption and imports both rise", "Imports are subtracted, not added."],
    ],
    answer: "A",
    hints: ["The fridge appears in C and in M."],
    explanation: "Spending on an imported good appears in consumption and in imports. Since imports are subtracted, GDP does not change: the fridge was produced abroad.",
  });

  // Numericals.
  {
    const e = { c: 3200, i: 700, g: 950, x: 1100, m: 1350 };
    const gdp = nationalIncome.expenditure(e);
    check("gdp2", gdp, 4600);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: gdp, daily: true,
      stem: `In a fictional country, consumption is US\\$${fmt(e.c)} million, investment US\\$${fmt(e.i)} million, government spending US\\$${fmt(e.g)} million, exports US\\$${fmt(e.x)} million and imports US\\$${fmt(e.m)} million. Calculate GDP, in US\\$ million.`,
      wrong: [e.c + e.i + e.g + e.x + e.m, e.c + e.i + e.g],
      explanation: `GDP = ${fmt(e.c)} + ${fmt(e.i)} + ${fmt(e.g)} + (${fmt(e.x)} − ${fmt(e.m)}) = ${fmt(e.c + e.i + e.g)} − ${e.m - e.x} = **US\\$${fmt(gdp)} million**. Adding imports gives ${fmt(e.c + e.i + e.g + e.x + e.m)}, and leaving out net exports gives ${fmt(e.c + e.i + e.g)}.`,
    });
  }
  {
    const gdp = 12500, nfia = -640, gnp = nationalIncome.gnp(gdp, nfia);
    check("gnp2", gnp, 11860);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: gnp,
      stem: `A fictional country's GDP is US\\$${fmt(gdp)} million. Its residents receive US\\$410 million of income from abroad, and US\\$1,050 million of income is paid to foreign owners of firms in the country. Calculate GNP, in US\\$ million.`,
      wrong: [gdp - nfia, gdp + 410 + 1050],
      explanation: `Net income from abroad = 410 − 1,050 = −640. GNP = ${fmt(gdp)} + (−640) = **US\\$${fmt(gnp)} million**. Adding 640 instead (${fmt(gdp - nfia)}) gets the sign wrong.`,
    });
    check("nfia", 410 - 1050, nfia);
  }
  {
    const chain = [["Maize farmer sells maize to a miller", 0, 180], ["Miller sells mealie-meal to a wholesaler", 180, 310], ["Wholesaler sells to a retailer", 310, 380], ["Retailer sells to households", 380, 450]];
    const va = chain.map(([, i, o]) => o - i), tva = va.reduce((s, x) => s + x, 0), sales = chain.reduce((s, x) => s + x[2], 0);
    check("tva", tva, 450);
    const T = table(["Stage", "Value of sales (US\\$ thousand)"], chain.map((c) => [c[0], c[2]]));
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: tva, calculator: true,
      stem: `The table shows the sales at each stage of producing mealie-meal in a fictional district. Each firm buys its input from the stage before it.\n\n${T}\n\nCalculate the total value added, in US\\$ thousand.`,
      wrong: [sales, sales - 450],
      hints: ["Value added = value of sales − value of inputs bought.", "The total value added equals the value of the final good."],
      explanation: `1. Value added: farmer ${va[0]}; miller 310 − 180 = ${va[1]}; wholesaler 380 − 310 = ${va[2]}; retailer 450 − 380 = ${va[3]}.\n2. Total = ${va.join(" + ")} = **US\\$${tva} thousand**, the value of the final sale to households.\n3. Adding all the sales (${fmt(sales)}) double counts the maize and meal.`,
    });
  }
  {
    const gdp = 9000, c = 6100, i = 1400, x = 2000, m = 2300;
    const g = gdp - c - i - (x - m);
    check("g", g, 1800);
    check("gdp chk", nationalIncome.expenditure({ c, i, g, x, m }), gdp);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: g,
      stem: `A fictional country's GDP is US\\$${fmt(gdp)} million. Consumption is US\\$${fmt(c)} million, investment US\\$${fmt(i)} million, exports US\\$${fmt(x)} million and imports US\\$${fmt(m)} million. Calculate government spending, in US\\$ million.`,
      wrong: [gdp - c - i - (m - x), gdp - c - i - x - m],
      hints: ["Rearrange GDP = C + I + G + (X − M).", "Net exports are negative here."],
      explanation: `1. Net exports = ${fmt(x)} − ${fmt(m)} = −${m - x}.\n2. G = GDP − C − I − (X − M) = ${fmt(gdp)} − ${fmt(c)} − ${fmt(i)} + ${m - x} = **US\\$${fmt(g)} million**.\n3. Treating net exports as +${m - x} gives ${fmt(gdp - c - i - (m - x))}, a sign error.`,
    });
  }
  {
    const w = 2750, r = 310, int = 420, pr = 1180, pens = 260, secondHand = 90;
    const ni = w + r + int + pr;
    check("ni", ni, 4660);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: ni,
      stem: `A fictional country records the following for one year (US\\$ million): wages and salaries ${fmt(w)}; rent ${r}; interest ${int}; profits ${fmt(pr)}; state pensions ${pens}; sales of second-hand cars ${secondHand}. Calculate national income by the income method, in US\\$ million.`,
      wrong: [ni + pens + secondHand, ni + pens],
      hints: ["Include only rewards to factors of production for current output.", "Pensions and second-hand sales are not payments for new production."],
      explanation: `1. Factor incomes = ${fmt(w)} + ${r} + ${int} + ${fmt(pr)} = **US\\$${fmt(ni)} million**.\n2. Pensions (${pens}) are transfer payments, and second-hand car sales (${secondHand}) are not new output, so both are excluded.\n3. Including both gives ${fmt(ni + pens + secondHand)}; including pensions only gives ${fmt(ni + pens)}.`,
    });
  }
  {
    const gdp = 26400, popn = 15, ph = nationalIncome.perHead(gdp, popn);
    check("ph", ph, 1760);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: ph, calculator: true,
      stem: `A fictional country has a GDP of US\\$${fmt(gdp)} million and a population of ${popn} million. Calculate GDP per head, in US\\$.`,
      wrong: [popn / gdp * 1e6],
      explanation: `GDP per head = GDP ÷ population = ${fmt(gdp)} million ÷ ${popn} million = **US\\$${fmt(ph)}**.`,
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "GNP is always larger than GDP.",
    answer: false,
    explanation: "False. If income paid to foreigners is greater than income received from abroad, net income from abroad is negative and GNP is smaller than GDP.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "In theory, the output, income and expenditure methods should give the same total for national income.",
    answer: true,
    explanation: "True. Output produced creates income for the factors, and that income is spent on the output; in practice small statistical differences appear.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure or method with what is added up.",
    pairs: [
      ["Output method", "Value added by each sector of the economy"],
      ["Income method", "Wages, rent, interest and profits"],
      ["Expenditure method", "C + I + G + (X − M)"],
      ["GNP", "GDP plus net income from abroad"],
    ],
    explanation: "Output adds value added; income adds factor rewards; expenditure adds spending on final output; GNP adjusts GDP for income flows across borders.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "In the expenditure method, imports are {{blank:a}} because they are produced abroad. If a country pays more income to foreign owners than it receives from abroad, its GNP is {{blank:b}} than its GDP.",
    blanks: [
      { id: "a", accepted: ["subtracted"], choices: ["added", "subtracted"] },
      { id: "b", accepted: ["smaller"], choices: ["larger", "smaller"] },
    ],
    wrong: [["added", "larger"]],
    explanation: "GDP = C + I + G + (X − M). Negative net income from abroad makes GNP smaller than GDP.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the output, income and expenditure methods should give the same value of national income.",
    points: [
      "Producing output creates income for the factors of production (wages, rent, interest, profit).",
      "The value of output equals the incomes paid out, because profit is what is left after other factors are paid.",
      "Incomes are spent on the output produced, so expenditure equals output (the circular flow).",
    ],
    modelAnswer: "When firms produce output, they pay wages, rent and interest to the factors of production, and whatever is left of the value of the output is profit, so the value of output equals total income. Households and other buyers spend this income on the goods and services produced, so total spending also equals the value of output. Output, income and expenditure are three ways of measuring the same flow.",
    hints: ["Think of the circular flow of income."],
    explanation: "Output = income (profit is the residual) = expenditure (income is spent on output).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why exports are added and imports are subtracted when GDP is calculated by the expenditure method.",
    points: [
      "Exports are output produced in the country but bought by foreigners, so they must be added.",
      "Spending on imports is included in C, I and G but was produced abroad, so it is subtracted.",
    ],
    modelAnswer: "Exports are goods and services produced in the country and sold abroad, so they are part of the country's output and are added. Some of the spending in C, I and G goes on imported goods made in other countries, so imports are subtracted to leave only spending on domestic output.",
    hints: ["Ask where each good was produced."],
    explanation: "GDP measures domestic production: add foreign spending on it, remove domestic spending on foreign output.",
  });

  // Structured 1: two years of expenditure data.
  {
    const y = { c: [7200, 7650], i: [1600, 1850], g: [2100, 2250], x: [2400, 2300], m: [2900, 3150] };
    const gdp = [0, 1].map((k) => nationalIncome.expenditure({ c: y.c[k], i: y.i[k], g: y.g[k], x: y.x[k], m: y.m[k] }));
    const nfia = -520, gnp1 = nationalIncome.gnp(gdp[1], nfia), ch = pctChange(gdp[0], gdp[1]);
    check("g0", gdp[0], 10400); check("g1", gdp[1], 10900);
    const T = table(["US\\$ million", "2025", "2026"], [["Consumption", y.c[0], y.c[1]], ["Investment", y.i[0], y.i[1]], ["Government spending", y.g[0], y.g[1]], ["Exports", y.x[0], y.x[1]], ["Imports", y.m[0], y.m[1]]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The table shows spending in a fictional country, Country Z, in 2025 and 2026. In 2026 net income from abroad was −US\\$520 million, mainly because of profits sent abroad by foreign-owned mining companies.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: gdp[0], stem: "Calculate GDP in 2025, in US\\$ million.", wrong: [y.c[0] + y.i[0] + y.g[0] + y.x[0] + y.m[0]], explanation: `${fmt(y.c[0])} + ${fmt(y.i[0])} + ${fmt(y.g[0])} + (${fmt(y.x[0])} − ${fmt(y.m[0])}) = ${fmt(gdp[0])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: gdp[1], stem: "Calculate GDP in 2026, in US\\$ million.", wrong: [y.c[1] + y.i[1] + y.g[1] + y.x[1] + y.m[1]], explanation: `${fmt(y.c[1])} + ${fmt(y.i[1])} + ${fmt(y.g[1])} + (${fmt(y.x[1])} − ${fmt(y.m[1])}) = ${fmt(gdp[1])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: ch, stem: "Calculate the percentage change in GDP between 2025 and 2026. Give your answer to one decimal place.", wrong: [pctChange(gdp[1], gdp[0])], explanation: `(${fmt(gdp[1])} − ${fmt(gdp[0])}) ÷ ${fmt(gdp[0])} × 100 = ${pct(ch, 1)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: gnp1, stem: "Calculate GNP in 2026, in US\\$ million.", wrong: [gdp[1] - nfia], explanation: `${fmt(gdp[1])} + (−520) = ${fmt(gnp1)}.` }),
        P.manual({
          label: "(e)", marks: 2,
          stem: "Explain why GNP was smaller than GDP in 2026.",
          points: ["Net income from abroad was negative: more income was paid to foreigners than received.", "Profits of foreign-owned mines are produced in the country (in GDP) but paid abroad, so they are not part of GNP."],
          modelAnswer: "Net income from abroad was negative, because the profits of the foreign-owned mines, which are part of GDP because the mining happens in Country Z, were sent to their owners abroad. More income flowed out than came in, so GNP was smaller than GDP.",
          explanation: "Negative net income from abroad, linked to the profits of foreign-owned mines.",
        }),
        P.manual({
          label: "(f)", marks: 3, levels: LV(3),
          stem: "Discuss whether the rise in GDP between 2025 and 2026 means that Country Z produced more goods and services.",
          points: [
            "Yes: GDP measures the value of output, so a rise may reflect more production (investment rose strongly).",
            "No: the figures are at current prices; if prices rose, part or all of the rise may be inflation, so real GDP is needed.",
            "Justified conclusion: only if the rise is larger than the rate of inflation (real GDP rises) did output increase.",
          ],
          modelAnswer: `GDP rose by ${pct(ch, 1)}, and investment and consumption both increased, which suggests that more was produced. However, the figures are in current prices, so if the general price level rose by about ${pct(ch, 0)} or more, the volume of output did not increase at all. The rise shows more production only if it is larger than the rate of inflation; real GDP figures are needed to be sure.`,
          explanation: "Nominal versus real GDP; conclude.",
        }),
      ],
      hints: ["GDP = C + I + G + (X − M).", "Use 2025 as the base for the percentage change."],
      explanation: `GDP rose from US\\$${fmt(gdp[0])} million to US\\$${fmt(gdp[1])} million (${pct(ch, 1)}); GNP in 2026 was US\\$${fmt(gnp1)} million.`,
    });
  }
  // Structured 2: output method by sector.
  {
    const sectors = [["Agriculture", 1450], ["Mining", 1120], ["Manufacturing", 980], ["Construction", 360], ["Services", 2690]];
    const tot = sectors.reduce((s, x) => s + x[1], 0), agShare = (1450 / tot) * 100;
    check("tot", tot, 6600);
    const T = table(["Sector", "Value added (US\\$ million)"], sectors);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
      stem: `The statistics office of a fictional country estimates the value added by each sector in one year. Many traders, artisans and small farmers in the country work in the informal sector and keep no records.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: tot, stem: "Calculate GDP by the output method, in US\\$ million.", wrong: [tot - 2690], explanation: `${sectors.map((s) => fmt(s[1])).join(" + ")} = ${fmt(tot)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: agShare, stem: "Calculate agriculture's share of GDP. Give your answer to one decimal place.", wrong: [(1450 / (tot - 1450)) * 100], explanation: `1,450 ÷ ${fmt(tot)} × 100 = ${pct(agShare, 1)}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Why does the office record value added rather than the value of each sector's sales?",
          options: [
            ["To avoid counting intermediate goods more than once", "Correct: sales include inputs bought from other sectors."],
            ["To leave out the output of the services sector", "Services are part of value added."],
            ["To include transfer payments in GDP", "Transfer payments are not output."],
            ["To add the value of imported raw materials", "Imported inputs are excluded from value added."],
          ],
          answer: "A",
          explanation: "The value of a sector's sales includes inputs bought from other firms; adding sales would double count.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether the output figure is likely to be an accurate measure of the country's production.",
          points: [
            "Inaccurate: informal traders, artisans and small farmers keep no records, so much output is unrecorded and GDP is understated.",
            "Accurate in part: large formal firms (mines, factories) report their output; estimates can be made from surveys.",
            "Justified conclusion: likely to understate production; treat it as an estimate.",
          ],
          modelAnswer: "Large formal firms such as mines and factories keep accounts, so their value added is recorded fairly well, and the office can estimate other output from surveys. However, many traders, artisans and small farmers keep no records and much of their output is never reported, and subsistence farming is not sold at all. The figure is therefore likely to understate total production and should be treated as an estimate.",
          explanation: "Formal sector recorded versus unrecorded informal output; conclude.",
        }),
      ],
      hints: ["Add the value added of all sectors.", "Share = sector value ÷ total × 100."],
      explanation: `GDP by output = US\\$${fmt(tot)} million; agriculture = ${pct(agShare, 1)} of GDP. Informal output is likely to be under-recorded.`,
    });
  }

  b.card("DEFINITION", "Define **Gross Domestic Product (GDP)**.", "The total market value of final goods and services produced within a country's borders in one year.");
  b.card("DEFINITION", "Define **Gross National Product (GNP)**.", "The value of final goods and services produced by a country's residents and their factors of production, at home or abroad, in one year: GDP + net income from abroad.");
  b.card("DEFINITION", "What is **net income from abroad**?", "Income earned by residents from factors of production abroad minus income paid to foreigners from production in the country.");
  b.card("FORMULA", "GDP by the expenditure method = ?", "C + I + G + (X − M)");
  b.card("FORMULA", "GNP = ?", "GDP + net income from abroad");
  b.card("CONCEPT", "What does the **output method** add up, and what must it avoid?", "The value added by each sector (or final goods only), to avoid double counting.");
  b.card("CONCEPT", "What does the **income method** add up?", "Wages and salaries, rent, interest and profits; transfer payments such as pensions are excluded.");
  b.card("DEFINITION", "What is **double counting**?", "Counting the same output more than once, for example counting the maize and again the mealie-meal made from it.");
  b.card("FACT", "Why is spending on an imported car not part of GDP?", "The car was produced abroad: it is added in C but subtracted again in M.");
});
