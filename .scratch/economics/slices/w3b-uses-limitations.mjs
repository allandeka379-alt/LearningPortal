// W3b: econ.national-income.uses-limitations (ZIMSEC only) — uses of national income statistics by different agents;
// limitations (double counting, informal sector, unrecorded activity, inaccurate data, price changes); real GDP and
// GDP per head. Figures differ from the lesson's worked examples.
import { concept, P, table, nationalIncome, prices, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.national-income.uses-limitations", { file: "national-income/uses-limitations", keyPrefix: "national-income.uses-limitations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **limitation** of national income statistics?",
    options: [
      ["Output of informal traders is often not recorded", "Correct: unrecorded informal output makes GDP understate production."],
      ["They allow living standards to be compared over time", "This is a use, not a limitation."],
      ["They help the government plan its spending", "This is a use, not a limitation."],
      ["They show the share of each sector in total output", "This is a use, not a limitation."],
    ],
    answer: "A",
    explanation: "Much informal activity is never recorded, so GDP is understated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "**Real GDP** is GDP that has been adjusted for changes in",
    options: [
      ["the general price level.", "Correct: real GDP is measured at constant (base-year) prices."],
      ["the size of the population.", "Dividing by population gives GDP per head."],
      ["the exchange rate.", "Exchange rates matter for comparing countries, not for real GDP."],
      ["the amount of income sent abroad.", "That adjustment turns GDP into GNP."],
    ],
    answer: "A",
    explanation: "Real GDP removes the effect of inflation, so it changes only when the volume of output changes.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A furniture manufacturer in Mutare is deciding whether to build a second factory. How might national income statistics help it?",
    options: [
      ["Rising real incomes suggest demand for furniture is likely to grow", "Correct: firms use growth figures to judge future demand."],
      ["They show the exact price the firm should charge for each chair", "National statistics do not set individual prices."],
      ["They tell the firm how much tax it must pay next year", "Tax liability depends on tax law and the firm's own profits."],
      ["They show how many workers the firm's rivals employ", "National income figures do not give data on individual firms."],
    ],
    answer: "A",
    explanation: "Firms use growth and income figures to forecast demand and decide whether to invest.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many rural households grow maize for their own food and do not sell it. What effect does this have on measured GDP?",
    options: [
      ["GDP understates output, because the maize is never sold or recorded", "Correct: non-market (subsistence) output is usually left out."],
      ["GDP overstates output, because the maize is counted twice", "Double counting involves intermediate goods, not unsold food."],
      ["GDP is accurate, because the maize is consumed in the country", "Consumption that never passes through a market is not recorded."],
      ["GDP falls, because the households pay no tax on the maize", "Taxes paid do not determine whether output is counted."],
    ],
    answer: "A",
    hints: ["Is there a market transaction that statisticians can record?"],
    explanation: "Subsistence output is real production but is not sold, so it is mostly missed and GDP is understated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, nominal GDP rises by 8% in a year while the general price level rises by 10%. What happened to real GDP?",
    options: [
      ["It fell, because prices rose faster than nominal GDP", "Correct: the volume of output fell (by about 1.8%)."],
      ["It rose by 8%, the same as nominal GDP", "This ignores the rise in prices."],
      ["It rose by 18%, the sum of the two changes", "Inflation reduces real GDP; it is not added."],
      ["It did not change, because both figures rose", "Prices rose faster, so real output fell."],
    ],
    answer: "A",
    hints: ["Real GDP = nominal GDP ÷ price index × 100."],
    explanation: `Real GDP index = 108 ÷ 110 × 100 = ${fmt((108 / 110) * 100, 1)}, a fall of about ${fmt(100 - (108 / 110) * 100, 1)}%.`,
  });
  check("real fall", (108 / 110) * 100, 98.18, 0.01);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "GDP per head in a fictional country rises by 5%, yet most households report that their living standards have not improved. Which is the most likely explanation?",
    options: [
      ["Most of the extra income went to a small number of rich households", "Correct: GDP per head is an average and hides how income is shared."],
      ["The population of the country grew faster than GDP did over the year", "Then GDP per head would have fallen, not risen."],
      ["The figures were adjusted for changes in prices", "Adjusting for prices makes the figure more, not less, reliable."],
      ["Exports rose faster than imports during the year", "Net exports add to GDP; they do not explain the gap."],
    ],
    answer: "A",
    hints: ["What does an average leave out?"],
    explanation: "GDP per head is a mean; if the gains are concentrated among a few, most people may see no improvement.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which event would **raise** measured GDP while making people worse off?",
    options: [
      ["Rebuilding homes and roads after a flood destroys them", "Correct: the rebuilding is recorded as output, but it only replaces what was lost."],
      ["A fall in pollution after a factory installs filters", "Cleaner air improves welfare; it is not a rise in GDP that harms people."],
      ["Workers choosing to work fewer hours for more leisure", "This lowers measured output; leisure is not in GDP."],
      ["More households growing their own vegetables", "Unsold home-grown food is not recorded, so GDP does not rise."],
    ],
    answer: "A",
    hints: ["Think about spending that replaces something that was destroyed."],
    explanation: "Repair spending after a disaster adds to GDP, but people are no better off than before the disaster; GDP measures activity, not welfare.",
  });

  // Numericals.
  {
    const nom = 9450, idx = 105, real = prices.realValue(nom, idx);
    check("real", real, 9000);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: real, daily: true,
      stem: `A fictional country's nominal GDP this year is US\\$${fmt(nom)} million. The price index is ${idx} (base year = 100). Calculate real GDP at base-year prices, in US\\$ million.`,
      wrong: [nom * idx / 100],
      explanation: `Real GDP = ${fmt(nom)} ÷ ${idx} × 100 = **US\\$${fmt(real)} million**. Multiplying by the index (${fmt(nom * idx / 100, 1)}) inflates the figure instead of removing inflation.`,
    });
  }
  {
    const n0 = 4800, n1 = 5700, i1 = 112.5;
    const real1 = prices.realValue(n1, i1), g = pctChange(n0, real1);
    check("real1", real1, 5066.67, 0.01);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: g, calculator: true,
      stem: `A fictional country's nominal GDP rises from US\\$${fmt(n0)} million in the base year to US\\$${fmt(n1)} million the next year. The price index rises from 100 to ${i1}. Calculate the rate of real economic growth. Give your answer to one decimal place.`,
      wrong: [pctChange(n0, n1), pctChange(n0, n1) - 12.5],
      hints: ["First find next year's real GDP: nominal GDP ÷ price index × 100.", "Then compare it with the base year."],
      explanation: `1. Real GDP next year = ${fmt(n1)} ÷ ${i1} × 100 = ${fmt(real1, 2)}.\n2. Real growth = (${fmt(real1, 2)} − ${fmt(n0)}) ÷ ${fmt(n0)} × 100 = **${pct(g, 1)}**.\n3. The nominal growth of ${pct(pctChange(n0, n1), 1)} includes inflation; simply subtracting 12.5 gives ${pct(pctChange(n0, n1) - 12.5, 1)}, which is only an approximation.`,
    });
  }
  {
    const g0 = 20000, p0 = 16, g1 = g0 * 1.02, p1 = p0 * 1.035;
    const ph0 = nationalIncome.perHead(g0, p0), ph1 = nationalIncome.perHead(g1, p1), ch = pctChange(ph0, ph1);
    check("ph0", ph0, 1250);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: ch, calculator: true,
      stem: `A fictional country's real GDP is US\\$${fmt(g0)} million and its population is ${p0} million. Next year real GDP grows by 2% and the population grows by 3.5%. Calculate the percentage change in real GDP per head. Give a fall as a negative number, to one decimal place.`,
      wrong: [2, -ch, 2 - 3.5],
      hints: ["Find the new GDP and the new population first.", "Compare GDP per head in the two years."],
      explanation: `1. New GDP = ${fmt(g0)} × 1.02 = ${fmt(g1)}; new population = ${p0} × 1.035 = ${fmt(p1, 2)} million.\n2. GDP per head: ${fmt(g0)} ÷ ${p0} = US\\$${fmt(ph0)}; ${fmt(g1)} ÷ ${fmt(p1, 2)} = US\\$${fmt(ph1, 2)}.\n3. Change = (${fmt(ph1, 2)} − ${fmt(ph0)}) ÷ ${fmt(ph0)} × 100 = **${fmt(ch, 1)}%**. GDP grew, but the population grew faster, so average output per person fell. (2 − 3.5 = −1.5 is only an approximation.)`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The value of unpaid housework is included in GDP.",
    answer: false,
    explanation: "False. Housework is not sold, so it is not recorded, although it is real production.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If nominal GDP rises by 6% and prices rise by 6%, the volume of output has stayed about the same.",
    answer: true,
    explanation: "True. The whole rise in nominal GDP is due to higher prices, so real GDP is unchanged.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each limitation with an example.",
    pairs: [
      ["Informal sector", "A street vendor in Harare keeps no records"],
      ["Non-market activity", "A family grows its own vegetables to eat"],
      ["Double counting", "Adding the value of tobacco leaf and of cigarettes made from it"],
      ["Price changes", "Nominal GDP rises only because prices are higher"],
    ],
    explanation: "Each limitation makes GDP a less accurate measure of output or living standards.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "If prices rise but the volume of output stays the same, nominal GDP {{blank:a}} and real GDP {{blank:b}}. To compare living standards between countries with different populations, economists use GDP {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["rises"], choices: ["rises", "falls", "stays the same"] },
      { id: "b", accepted: ["stays the same"], choices: ["rises", "falls", "stays the same"] },
      { id: "c", accepted: ["per head"], choices: ["per head", "at current prices", "plus imports"] },
    ],
    wrong: [["stays the same", "rises", "plus imports"]],
    explanation: "Nominal GDP rises with prices; real GDP does not. GDP per head divides by the population.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** ways in which a government uses national income statistics.",
    points: [
      "Identifies a use, e.g. measuring economic growth / spotting a recession.",
      "Explains: if real GDP is falling, the government can raise spending or cut taxes.",
      "Identifies a second use, e.g. planning the budget / estimating tax revenue / allocating spending to sectors.",
      "Explains: knowing incomes helps forecast revenue and decide spending on schools, health and roads.",
    ],
    modelAnswer: "First, the government uses real GDP to measure economic growth; if GDP is falling it knows there is a recession and can raise its spending or cut taxes. Second, it uses income figures to plan the budget: knowing how much income is earned helps it estimate tax revenue and decide how much it can spend on schools, clinics and roads.",
    hints: ["Think of the budget and of judging how the economy is doing."],
    explanation: "Identify (1) + explain (1) for each use; comparing with other countries or applying for loans also earn credit.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why GDP per head may not be a good measure of living standards in a country like Zimbabwe.",
    points: [
      "A large informal and subsistence sector is not fully recorded, so GDP per head understates incomes.",
      "It is an average and does not show how income is distributed.",
      "It ignores quality of life: leisure, health, education, pollution and depletion of resources.",
    ],
    modelAnswer: "Much of Zimbabwe's output comes from informal traders and subsistence farmers and is not fully recorded, so GDP per head understates what people really produce and consume. It is also an average, so it hides how unequally income is shared. Finally, it ignores things that affect well-being, such as health, education, working hours and environmental damage.",
    hints: ["Think about what is missing from the figure and what an average hides."],
    explanation: "Any three of: unrecorded output, distribution, non-income aspects of quality of life, price differences.",
  });

  // Structured 1: comparing two countries.
  {
    const R = { gdp: 14400, pop: 18, inf: 60, le: 61 }, S = { gdp: 9600, pop: 8, inf: 20, le: 66 };
    const phR = nationalIncome.perHead(R.gdp, R.pop), phS = nationalIncome.perHead(S.gdp, S.pop);
    check("phR", phR, 800); check("phS", phS, 1200);
    const T = table(["", "Country R", "Country S"], [["GDP (US\\$ million)", R.gdp, S.gdp], ["Population (million)", R.pop, S.pop], ["Estimated share of workers in the informal sector (%)", R.inf, S.inf], ["Life expectancy at birth (years)", R.le, S.le]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The table gives information about two fictional countries in the same year.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: phR, stem: "Calculate GDP per head in Country R, in US\\$.", wrong: [R.pop / R.gdp * 1e6], explanation: `${fmt(R.gdp)} million ÷ ${R.pop} million = US\\$${phR}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: phS, stem: "Calculate GDP per head in Country S, in US\\$.", wrong: [S.pop / S.gdp * 1e6], explanation: `${fmt(S.gdp)} million ÷ ${S.pop} million = US\\$${fmt(phS)}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which statement is supported by the data?",
          options: [
            ["Country R has the larger total output but the lower output per person", `Correct: GDP ${fmt(R.gdp)} > ${fmt(S.gdp)}, but per head ${phR} < ${fmt(phS)}.`],
            ["Country R has the larger total output and the higher output per person", `GDP per head is lower in R (US\\$${phR}).`],
            ["Country S has the larger total output and the higher output per person", `S's total GDP is smaller (${fmt(S.gdp)}).`],
            ["The two countries have the same output per person", "GDP per head differs by US\\$400."],
          ],
          answer: "A",
          explanation: "Total GDP must be divided by population to compare average output.",
        }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain why the GDP figure for Country R may be less accurate than the figure for Country S.",
          points: [
            `R has a much larger informal sector (${R.inf}% of workers against ${S.inf}%).`,
            "Informal businesses often keep no records and do not register or pay tax.",
            "Much of R's output is therefore unrecorded or estimated, so its GDP is understated more than S's.",
          ],
          modelAnswer: `About ${R.inf}% of workers in Country R are in the informal sector, compared with ${S.inf}% in Country S. Informal businesses usually keep no accounts and are not registered, so statisticians cannot record their output and must estimate it. A larger share of R's production is therefore missed, and its GDP is likely to be understated by more than S's.`,
          explanation: "Bigger informal sector → more unrecorded output → GDP more understated.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether people in Country S have a higher standard of living than people in Country R.",
          points: [
            `Yes: GDP per head is higher in S (US\\$${fmt(phS)} against US\\$${phR}).`,
            `Yes: life expectancy is higher in S (${S.le} against ${R.le} years), suggesting better health care and diet.`,
            "But: R's GDP is understated by its large informal sector; GDP per head is an average and ignores distribution, prices and quality of life.",
            "Justified conclusion: S probably has a higher standard of living, but the gap may be smaller than the figures suggest.",
          ],
          modelAnswer: `GDP per head is 50% higher in Country S (US\\$${fmt(phS)} against US\\$${phR}), and life expectancy is ${S.le - R.le} years longer, which suggests that people in S have higher incomes and better health. However, Country R's large informal sector means much of its output is not recorded, so the gap in GDP per head may be smaller than it looks. GDP per head is also an average: it does not show how income is distributed or differences in the cost of living. Since both the income and the health indicators favour S, people in S probably do have a higher standard of living, although the difference may be smaller than the figures suggest.`,
          explanation: "Use both indicators, qualify with the limitations, conclude.",
        }),
      ],
      hints: ["GDP per head = GDP ÷ population.", "Which country's figures are likely to miss more output?"],
      explanation: `GDP per head: R US\\$${phR}, S US\\$${fmt(phS)}. R's large informal sector makes its figure less reliable.`,
    });
  }
  // Structured 2: nominal and real GDP over two years.
  {
    const n = [15600, 18000], idx = [104, 125];
    const real = n.map((x, k) => prices.realValue(x, idx[k])), g = pctChange(real[0], real[1]);
    check("real0", real[0], 15000);
    check("real1", real[1], 14400);
    const T = table(["Year", "Nominal GDP (US\\$ million)", "Price index (2020 = 100)"], [["2025", n[0], idx[0]], ["2026", n[1], idx[1]]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
      stem: `A minister of a fictional country announces that "the economy grew strongly in 2026". The table shows the official figures.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: real[0], stem: "Calculate real GDP in 2025 at 2020 prices, in US\\$ million.", wrong: [n[0] * idx[0] / 100], explanation: `${fmt(n[0])} ÷ ${idx[0]} × 100 = ${fmt(real[0])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: g, stem: "Real GDP in 2026 was US\\$14,400 million at 2020 prices. Calculate the percentage change in real GDP between 2025 and 2026. Give a fall as a negative number, to one decimal place.", wrong: [pctChange(n[0], n[1]), -g], explanation: `(${fmt(real[1])} − ${fmt(real[0])}) ÷ ${fmt(real[0])} × 100 = ${fmt(g, 1)}%.` }),
        P.manual({
          label: "(c)", marks: 4, levels: LV(4),
          stem: "Discuss whether the minister's claim is justified.",
          points: [
            `For the claim: nominal GDP rose by ${pct(pctChange(n[0], n[1]), 1)}.`,
            `Against: prices rose by about ${pct(pctChange(idx[0], idx[1]), 1)}, so real GDP fell by ${fmt(-g, 1)}%: output fell.`,
            "Other limitations: data may be inaccurate, the informal sector is missed, population growth is ignored.",
            "Justified conclusion: the claim is not justified; the economy shrank in real terms.",
          ],
          modelAnswer: `Nominal GDP rose by ${pct(pctChange(n[0], n[1]), 1)}, which is what the minister appears to be using. But prices rose by about ${pct(pctChange(idx[0], idx[1]), 1)}, faster than nominal GDP, so real GDP fell by ${fmt(-g, 1)}%: the volume of output actually decreased. The figures may also be inaccurate and miss informal output, and they ignore population growth, which would make GDP per head fall even more. The claim is not justified: the rise was caused by inflation, and the economy shrank in real terms.`,
          explanation: "Nominal rise versus real fall; conclude.",
        }),
      ],
      hints: ["Real GDP = nominal GDP ÷ price index × 100.", "Compare real values, not nominal ones."],
      explanation: `Real GDP fell from US\\$${fmt(real[0])} million to US\\$${fmt(real[1])} million (${fmt(g, 1)}%), although nominal GDP rose.`,
    });
  }

  b.card("DEFINITION", "Define **real GDP**.", "GDP measured at constant (base-year) prices, so it changes only when the volume of output changes.");
  b.card("FORMULA", "Real GDP = ?", "Nominal GDP ÷ price index × 100");
  b.card("FORMULA", "GDP per head = ?", "GDP ÷ population");
  b.card("CONCEPT", "Give three uses of national income statistics.", "Measuring growth and spotting recessions; planning government spending and taxes; comparing living standards over time and between countries; guiding firms' investment.");
  b.card("CONCEPT", "Give five limitations of national income statistics.", "Double counting; the informal sector; unrecorded non-market activity; inaccurate data; price changes (and they ignore distribution and quality of life).");
  b.card("FACT", "Why does the informal sector make GDP understate output?", "Informal businesses keep few records and are not registered, so much of their output is never recorded.");
  b.card("FACT", "Can GDP rise while GDP per head falls?", "Yes: if the population grows faster than GDP.");
  b.card("CONCEPT", "Why is GDP per head an imperfect measure of living standards?", "It is an average: it hides inequality and ignores leisure, health, education, pollution and resource depletion.");
});
