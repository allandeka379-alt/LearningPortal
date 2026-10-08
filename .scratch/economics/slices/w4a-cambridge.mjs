// W4a: Cambridge 0455 Paper 2 exam-format items: Section A x1 (living standards with GDP per head and HDI data —
// STRUCTURED 20, ANALYSIS) and Section B x1 (recession and growth policy — STRUCTURED 20 = 2/4/6/8, EVALUATION).
// Fictional data, computed and checked here.
import { concept, P, CAM, table, nationalIncome, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });
const words = (s) => s.split(/\s+/).filter(Boolean).length;

concept("econ.development.meaning-indicators", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: living standards with GDP per head and HDI data.
  {
    const R = { gdp: 59220, pop: 14.1, le: 61.4, sch: 6.2, hdi: 0.587, top: 52 };
    const S = { gdp: 40470, pop: 14.2, le: 68.9, sch: 8.8, hdi: 0.648, top: 34 };
    const phR = nationalIncome.perHead(R.gdp, R.pop), phS = nationalIncome.perHead(S.gdp, S.pop), diff = pctChange(phS, phR);
    check("phR", phR, 4200); check("phS", phS, 2850);
    const passage = [
      "Country R and Country S are fictional neighbouring countries in southern Africa with populations of about 14 million each. Country R's economy depends on oil, which was discovered twenty years ago and is extracted by a small number of large firms using imported machinery and skilled foreign workers. Oil provides most of the country's exports and government revenue. Outside the oil industry, most people work in small-scale farming and informal trading.",
      "Country S has no oil. Its income comes from commercial and small-scale farming, a growing manufacturing sector and tourism. For many years its government has spent a large share of its budget on primary health care, clean water and free primary and secondary education, paid for by a progressive income tax and by taxes on tourism.",
      "Table 1 shows indicators of living standards for the two countries. The Human Development Index (HDI) combines measures of health, education and income into a single number between 0 and 1.",
      "A government minister in Country R recently said that her country's people are much better off than those of Country S, because its GDP per head is far higher. An economist replied that the figures tell a more complicated story. She pointed out that a large share of Country R's income goes to the richest households, that many rural children leave school early, and that clinics outside the capital are short of staff and medicines. She argued that Country R should spend more of its oil revenue on health and education, while Country S needs to raise its income if it is to continue improving its services.",
    ].join("\n\n");
    const n = words(passage);
    if (n < 250 || n > 400) throw new Error(`Section A passage has ${n} words`);
    const T = table(["Indicator", "Country R", "Country S"], [
      ["GDP (US\\$ million)", R.gdp, S.gdp],
      ["Population (million)", fmt(R.pop, 1), fmt(S.pop, 1)],
      ["Life expectancy at birth (years)", fmt(R.le, 1), fmt(S.le, 1)],
      ["Mean years of schooling (adults)", fmt(R.sch, 1), fmt(S.sch, 1)],
      ["HDI", fmt(R.hdi, 3), fmt(S.hdi, 3)],
      ["Share of income received by the richest 10% of households (%)", R.top, S.top],
    ]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.development.meaning-indicators", "econ.development.international-differences", "econ.development.poverty"],
      stem: `${passage}\n\n**Table 1: Indicators of living standards, 2026**\n\n${T}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Real GDP per head is the total output of a country, adjusted for {{blank:a}}, divided by its {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["inflation"], choices: ["inflation", "exports", "taxation"] },
            { id: "b", accepted: ["population"], choices: ["population", "labour force", "land area"] },
          ],
          wrong: [["exports", "labour force"]],
          explanation: "Real = adjusted for price changes; per head = divided by the population.",
        }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: phR, stem: "Calculate GDP per head in Country R, in US\\$.", wrong: [R.pop / R.gdp, R.gdp / S.pop], explanation: `${fmt(R.gdp)} million ÷ ${fmt(R.pop, 1)} million = US\\$${fmt(phR)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "pct", value: diff, calculator: true, stem: "Calculate by what percentage Country R's GDP per head is higher than Country S's. Give your answer to one decimal place.", wrong: [((phR - phS) / phR) * 100, pctChange(S.gdp, R.gdp)], explanation: `S: ${fmt(S.gdp)} ÷ ${fmt(S.pop, 1)} = US\\$${fmt(phS)}. Difference = (${fmt(phR)} − ${fmt(phS)}) ÷ ${fmt(phS)} × 100 = ${pct(diff, 1)}. Dividing by R's figure (${pct(((phR - phS) / phR) * 100, 1)}) uses the wrong base.` }),
        P.manual({
          label: "(d)", marks: 4,
          stem: "Using the information, explain **two** reasons why Country S has a higher HDI than Country R, even though its GDP per head is lower.",
          points: [
            "Identifies: S has better health: life expectancy 68.9 against 61.4 years.",
            "Explains: S's government spent heavily on primary health care and clean water.",
            "Identifies: S has more education: 8.8 against 6.2 mean years of schooling.",
            "Explains: free primary and secondary education in S; rural children in R leave school early.",
          ],
          modelAnswer: "First, people in Country S live longer: life expectancy is 68.9 years compared with 61.4 in R, because S's government has spent heavily on primary health care and clean water, while R's rural clinics lack staff and medicines. Second, adults in S have had more schooling, 8.8 years against 6.2, because S provides free primary and secondary education, while many rural children in R leave school early. The HDI includes health and education as well as income, so S's lead in these two dimensions outweighs R's higher income.",
          explanation: "Each reason: identify with data (1) + explain using the passage (1).",
        }),
        P.manual({
          label: "(e)", marks: 3,
          stem: "Explain why GDP per head may overstate the living standards of most people in Country R.",
          points: [
            "It is an average; the richest 10% receive 52% of income, so most households have far less than the average.",
            "Oil income goes largely to a few firms, foreign workers and the government, not to ordinary households.",
            "It ignores health and education, which are poor in rural R.",
          ],
          modelAnswer: "GDP per head is an average, but in Country R the richest 10% of households receive 52% of income, so most households earn far less than US$4,200. Much of the oil income goes to a few large firms, to foreign workers and to the government rather than to ordinary families, and the figure says nothing about the poor health and schooling in rural areas.".replace(/US\$/g, "US\\$"),
          explanation: "One mark per point.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the HDI is a better indicator of living standards than GDP per head for comparing Countries R and S.",
          points: [
            "HDI better: includes health (life expectancy) and education (schooling), so it captures welfare that GDP per head misses; here it ranks S above R.",
            "HDI better: uses income adjusted for purchasing power, so it allows for differences in the cost of living.",
            "GDP per head: simple, widely available, shows the income available to spend; R's income could finance future improvements.",
            "HDI limits: ignores income distribution (R's richest 10% receive 52%), poverty, freedom, environment; years of schooling ignore quality; averages.",
            "Use of several indicators (HDI plus inequality and poverty measures) gives the best comparison.",
            "Justified conclusion, e.g. HDI better here, but still incomplete.",
          ],
          modelAnswer: "The HDI is broader than GDP per head because it includes life expectancy and years of schooling as well as income. For R and S it gives a fuller picture: S's people live longer and have more education, so the HDI ranks S above R even though R's GDP per head is about 47% higher. The HDI also adjusts income for differences in the cost of living. On the other hand, GDP per head is simple, widely available and shows the income R has available, which could pay for better services in future. The HDI also has limits: it ignores how income is shared, and R's richest 10% receive over half of all income; it leaves out poverty, freedom and the environment, and years of schooling say nothing about quality. Overall the HDI is a better indicator than GDP per head for comparing these two countries, because their differences lie mainly in health and education, but it should be used with measures of inequality and poverty.",
          explanation: "Weigh the HDI's breadth against its limits and GDP per head's simplicity; conclude.",
        }),
      ],
      explanation: `GDP per head: R US\\$${fmt(phR)}, S US\\$${fmt(phS)} (R ${pct(diff, 1)} higher). S has higher life expectancy, schooling and HDI, and a more equal income distribution.`,
      hints: ["GDP per head = GDP ÷ population.", "The HDI combines health, education and income."],
    });
  }

  // ---------------- Section B: recession and policies to promote growth.
  {
    const q = [26400, 26004, 25770];
    const c2 = pctChange(q[0], q[1]), c3 = pctChange(q[1], q[2]), tot = pctChange(q[0], q[2]);
    check("c2", c2, -1.5); check("c3", c3, -0.8998615);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "pct", value: tot,
      stem: `Real GDP fell from US\\$${fmt(q[0])} million in the first quarter of the year to US\\$${fmt(q[1])} million in the second and US\\$${fmt(q[2])} million in the third. Calculate the total percentage fall from the first to the third quarter. Give your answer to one decimal place and include the minus sign.`,
      wrong: [c2 + c3, -tot],
      explanation: `(${fmt(q[2])} − ${fmt(q[0])}) ÷ ${fmt(q[0])} × 100 = −${fmt(q[0] - q[2])} ÷ ${fmt(q[0])} × 100 = ${pct(tot, 1)}. Adding the two quarterly changes (${pct(c2 + c3, 2)}) gives a slightly different, incorrect figure.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how the recession is likely to affect workers and firms in the country.",
      points: [
        "Firms' sales fall, so they cut output and need fewer workers.",
        "Cyclical unemployment rises; those in work get fewer hours and smaller pay rises.",
        "Lower incomes reduce spending further, so other firms' sales and profits fall (knock-on effect).",
        "Firms postpone investment and some close; the unemployed lose skills, lowering future productivity.",
      ],
      modelAnswer: "As demand falls, firms sell less, so they cut output and need fewer workers: cyclical unemployment rises, and those still in work get fewer hours and smaller pay rises. The workers who lose their jobs spend less, so other firms' sales and profits also fall. Firms postpone investment in new machinery and some close. People who stay unemployed for a long time lose skills, which lowers the economy's productivity in the future.",
    });
    const qB = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.growth.recession-policies", "econ.growth.economic-growth"],
      stem: "A fictional country that exports copper and cut flowers has entered a recession. Its main trading partners are in recession, world copper prices have fallen, and consumer confidence is low. Unemployment is rising and the government's budget deficit has widened. The government is considering a programme of spending on roads, railways and electricity, while the central bank is considering a cut in interest rates.",
      parts: [
        P.mcq({
          label: "(a)", marks: 2,
          stem: "Which definition of a recession is correct?",
          options: [
            ["A fall in real GDP, commonly over two consecutive quarters", "Correct: a period of negative economic growth."],
            ["A fall in the rate of inflation over two consecutive quarters", "That is disinflation."],
            ["A rise in unemployment above a set level over two quarters", "Unemployment usually rises in a recession, but that is not the definition."],
            ["A fall in the growth rate of real GDP for two consecutive quarters", "Slower growth still means rising output."],
          ],
          answer: "A",
          explanation: "A recession is a period of negative economic growth.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain why the government's budget deficit has widened. Complete the explanation.",
          template: "In a recession incomes, spending and profits {{blank:a}}, so the government collects {{blank:b}} tax revenue. At the same time more people need support, so government spending on benefits {{blank:c}}. The gap between spending and revenue therefore {{blank:d}}.",
          blanks: [
            { id: "a", accepted: ["fall"], choices: ["fall", "rise"] },
            { id: "b", accepted: ["less"], choices: ["less", "more"] },
            { id: "c", accepted: ["rises"], choices: ["rises", "falls"] },
            { id: "d", accepted: ["widens"], choices: ["widens", "narrows"] },
          ],
          wrong: [["rise", "more", "falls", "narrows"]],
          explanation: "Lower tax revenue and higher spending on support widen the deficit.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether government spending on infrastructure is the best way for this country to end its recession and promote growth.",
          points: [
            ["For: adds directly to total demand, creating jobs in construction and orders for suppliers, which is needed when consumers and exports are weak.", 2],
            "For: roads, railways and electricity also raise productive capacity (supply-side effect), lowering costs for exporters.",
            "Against: time lags in planning and building; widens the deficit further and adds to debt; some spending leaks into imports of machinery and materials.",
            ["Alternative: a cut in interest rates is quicker and cheaper for the government, may weaken the exchange rate and help exports; but low confidence may stop people borrowing.", 2],
            "The cause is external (trading partners' recession, copper prices): neither policy can raise world demand directly; diversification of exports matters.",
            "Justified conclusion, e.g. infrastructure spending combined with lower interest rates is best, as it raises demand now and capacity later.",
          ],
          modelAnswer: "Spending on roads, railways and electricity adds directly to total demand at a time when consumer spending and exports are weak: construction firms hire workers and buy materials, and their workers spend their wages, so output rises. The projects also raise the country's productive capacity, cutting transport and energy costs for copper and flower exporters and supporting long-term growth. However, large projects take time to plan and start, so the effect may come after the recession is over; the spending widens an already larger deficit and adds to debt; and some of the money will be spent on imported machinery and materials. A cut in interest rates would act more quickly and cost the government nothing, and a weaker exchange rate would help exporters, but with confidence low, households and firms may not borrow more. Neither policy can raise world copper prices or demand from trading partners, so diversifying exports also matters. The best approach is to combine well-chosen infrastructure projects that can start quickly with lower interest rates: together they raise demand now and capacity in the future.",
          explanation: "Weigh how infrastructure spending raises demand and capacity against time lags, debt and import leakage; compare with interest rates; conclude.",
        }),
      ],
      explanation: `Real GDP fell ${pct(c2, 1)} and then ${pct(c3, 1)}: two consecutive quarters of negative growth, a total fall of ${pct(tot, 1)}.`,
      hints: ["A recession means real GDP falls.", "Think about what happens to tax revenue and to benefit spending."],
    });
    qB.modelResponse.parts["(c)(i)"] = sub1.model;
    qB.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
