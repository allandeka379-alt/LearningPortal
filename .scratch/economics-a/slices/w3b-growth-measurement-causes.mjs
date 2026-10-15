// W3b: economic growth: meaning, measurement, causes and consequences (both boards).
import { concept, P, chk, table, fmt, deflator, growthRate, compoundRate, roundTo } from "../lib.mjs";
import { mc, LV8, LV6, LV12 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.growth-measurement-causes", { file: "macro/growth-measurement-causes", keyPrefix: "macro.growth-measurement-causes" }, (b) => {
  mc(b, [1, "RECALL"], "Economic growth is best measured by the percentage change in",
    ["real GDP", "Correct: output adjusted for price changes."],
    [["nominal GDP", "Nominal GDP also rises when prices rise."],
     ["the GDP deflator", "The deflator measures price changes, not output."],
     ["the exchange rate", "The exchange rate is not a measure of output."]],
    "Growth is the rise in the volume of output, so it uses real GDP.");

  mc(b, [2, "APPLICATION"], "Nominal GDP in a fictional economy rises by 10% in a year while the GDP deflator rises by about 4.8%. Real GDP has grown by approximately",
    ["5%", "Correct: 1.10 ÷ 1.048 − 1 is about 5%."],
    [["10%", "That is the nominal rise, which includes the price effect."],
     ["15%", "Adding the price rise reverses the adjustment."],
     ["4.8%", "That is the rise in prices, not output."]],
    "Deflate the nominal growth: real growth is about 5%.", { daily: true, calculator: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an increase in the quality of a factor of production rather than its quantity?",
    ["A training programme raises the skills of machine operators", "Correct: the same workers become more productive."],
    [["Migrants join the labour force of a large and growing district", "That raises the number of workers, not their quality."],
     ["A new coal mine opens up in a mining region", "That raises the quantity of natural resources."],
     ["More new factories are built along a highway", "That raises the quantity of capital."]],
    "Better skills raise labour quality; extra workers, mines or factories raise quantity.");

  mc(b, [2, "APPLICATION"], "Real GDP rises by 3% in a year in which the population rises by 4%. Real GDP per head",
    ["falls, because the population grew faster than output", "Correct: output per person is lower."],
    [["rises by 7%, because the two rises are added together", "Per head growth is the difference, not the sum."],
     ["rises by 3%, because population does not affect GDP per head", "Population is the denominator."],
     ["is unchanged, because the two changes cancel out", "They would cancel only if both rose by the same percentage."]],
    "Real GDP per head grows by roughly 3 − 4 = −1%.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Real GDP per head in a fictional economy rises by 4%, but almost all the extra income goes to the richest 10% of households. This best shows that growth",
    ["does not guarantee that most people become better off", "Correct: averages hide the distribution of income."],
    [["always reduces inequality between households over time", "Here inequality may widen."],
     ["cannot be measured using real GDP per head figures", "It is measured that way, but the average hides the distribution."],
     ["is exactly the same thing as economic development", "Development includes distribution and wider well-being."]],
    "GDP per head is an average, so it does not show who receives the gains.", { hints: ["What does an average hide?"] });

  mc(b, [3, "ANALYSIS"], "Which change is most likely to raise an economy's capacity to produce in the long run?",
    ["Investment in roads, schools and machinery", "Correct: it adds to or improves the factors of production."],
    [["A temporary rise in consumer spending financed by credit", "That raises demand, not capacity."],
     ["A one-off bonus paid to all public employees", "That is a transfer of income with no new capacity."],
     ["A rise in the price level of consumer goods", "Higher prices do not create capacity."]],
    "Long-run growth requires more or better factors of production.", { hints: ["Is the change on the demand side or does it add capacity?"] });

  mc(b, [3, "ANALYSIS"], "Rapid growth based on mining a non-renewable resource has an environmental cost mainly because",
    ["the resource is used up, which reduces what is left for future generations", "Correct: depletion is a cost to the future."],
    [["real GDP per head always falls when minerals are extracted", "Extraction usually raises measured output."],
     ["the price level must rise at the same rate as output", "Output and prices need not move together."],
     ["mining cannot create any jobs in the economy", "Mining usually creates employment."]],
    "Depletion and pollution are costs that GDP does not record.", { hints: ["Think about who bears the cost, and when."] });

  mc(b, [4, "EVALUATION"], "Two fictional countries both record growth of real GDP per head of 3%. In X the gain is spread widely and comes from cleaner technology; in Y it is concentrated and comes with heavy pollution. Which conclusion is best supported?",
    ["Welfare is probably improving more in X, so the growth rate alone is not enough for comparison", "Correct: the source and the distribution of growth matter."],
    [["Welfare is improving equally in both, because the growth rate is the same", "The rate ignores distribution and pollution."],
     ["Welfare is improving more in Y, because pollution shows high output", "Pollution is a cost, not a gain."],
     ["Neither country has experienced economic growth", "Real GDP per head did rise in both."]],
    "Growth rates ignore who gains and the environmental cost.", { hints: ["What does the growth rate leave out?"] });

  {
    const real = deflator.real(6300, 105); chk(real, 6000, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: real, unit: "US$ million",
      stem: "Nominal GDP of a fictional economy is US\\$6,300 million and the GDP deflator is 105 (base year = 100). Calculate real GDP, in US\\$ million.",
      wrong: [6615, 6300, 5995], explanation: "Real GDP = nominal ÷ deflator × 100 = 6,300 ÷ 105 × 100 = US\\$6,000 million. Multiplying by 1.05 (6,615) goes the wrong way." });
    const g = growthRate(5000, 5350); chk(g, 7, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: g, dp: 1, unit: "%",
      stem: "Real GDP of a fictional economy rises from US\\$5,000 million to US\\$5,350 million. Calculate the rate of economic growth, to one decimal place.",
      wrong: [6.5, 0.07, 350], explanation: "Growth = (5,350 − 5,000) ÷ 5,000 × 100 = 7.0%. Dividing by the new value gives 6.5%." });
    const ph = (1.06 / 1.02 - 1) * 100; chk(roundTo(ph, 2), 3.92, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: ph, dp: 1, unit: "%", hints: ["Real GDP per head = real GDP ÷ population; compare the ratios."],
      stem: "In a fictional economy real GDP rises by 6.0% and the population rises by 2.0%. Calculate the percentage rise in real GDP per head, to one decimal place (use (1 + g) ÷ (1 + p) − 1).",
      wrong: [4.0, 8.0, 3.0], explanation: "1. Real GDP per head changes by a factor 1.06 ÷ 1.02 = 1.0392.\n2. The rise is 3.9%.\n3. The approximation 6.0 − 2.0 = 4.0% is close but not the exact answer." });
    const cg = compoundRate(4000, 4862, 4); chk(roundTo(cg, 1), 5.0, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: cg, dp: 1, unit: "%", hints: ["Use (final ÷ start)^(1/n) − 1."],
      stem: "Real GDP of a fictional economy rises from US\\$4,000 million to US\\$4,862 million over four years. Calculate the average annual rate of growth (compound rate), to one decimal place.",
      wrong: [5.4, 21.6, 4.0], explanation: "1. The total rise is 4,862 ÷ 4,000 = 1.21550, or 21.6%.\n2. The fourth root is 1.21550^0.25 = 1.0500.\n3. The average annual growth is 5.0%. Dividing 21.6% by 4 gives 5.4%, which ignores compounding." });
  }


  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Nominal GDP", "Output valued at the prices of the year it was produced"], ["Real GDP", "Output valued at the prices of a base year"], ["Real GDP per head", "Real GDP divided by the population"], ["Economic development", "A wider improvement in income, health, education and opportunities"]],
    explanation: "Nominal includes price changes; real removes them; per head divides by population; development is wider than growth." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Economic growth is measured by the change in {{blank:a}} GDP. Growth caused by workers acquiring new skills is an increase in the {{blank:b}} of labour.",
    blanks: [{ id: "a", accepted: ["real"], choices: ["real", "nominal"] }, { id: "b", accepted: ["quality"], choices: ["quality", "quantity"] }],
    explanation: "Use real GDP; training raises labour quality." });

  b.short({ d: 1, skill: "RECALL", stem: "Name the price index used to convert nominal GDP into real GDP.",
    accepted: ["GDP deflator", "the GDP deflator", "deflator", "implicit price deflator"], wrong: ["retail price index"],
    explanation: "Real GDP = nominal GDP ÷ GDP deflator × 100." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define economic growth.",
    points: ["An increase in the output (volume of goods and services) of an economy over time.", "Measured by the percentage rise in real GDP (adjusted for price changes)."],
    modelAnswer: "Economic growth is an increase in the volume of goods and services produced in an economy over time, measured by the percentage rise in real GDP.",
    explanation: "One mark for rising output and one for real (price-adjusted) measurement." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Which is narrower, and what does the other include?"],
    stem: "Distinguish between economic growth and economic development.",
    points: ["Growth is a rise in real output (real GDP) and is a quantitative measure.", "Development is a wider improvement in living standards, including health, education and poverty.", "Growth can occur without development, for example if the gains go to a few people."],
    modelAnswer: "Growth is the rise in real GDP. Development is wider and includes better health, education and lower poverty. A country can have growth without development if the extra output benefits only a few people.",
    explanation: "One mark each for the two definitions and one for the link." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each cause and say how it raises output."],
    stem: "Explain two causes of economic growth.",
    points: ["Investment in capital (machinery, roads) increases the stock of capital.", "More capital raises the output each worker can produce, so real GDP rises.", "Education and training improve the quality of labour (or technology raises productivity).", "Higher productivity means more output from the same inputs, so real GDP rises."],
    modelAnswer: "Investment in machinery and roads raises the capital stock, so each worker can produce more and real GDP rises. Education and training improve the skills of workers, raising labour productivity, so the same number of workers produce more output.",
    explanation: "Two causes, each with a mark for the cause and a mark for the link to output." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare the growth of output with the growth of population."],
    stem: "Explain why real GDP per head is a better measure of changes in living standards than real GDP.",
    points: ["Real GDP per head divides output by the population.", "Real GDP can rise while the population rises faster, so each person has less.", "Per head figures show the average output available to each person.", "It allows a fair comparison between countries of different sizes or over time."],
    modelAnswer: "Real GDP per head divides real GDP by the population. If the population grows faster than output, real GDP rises but average output per person falls. The per head figure shows the average output available to each person and lets us compare countries of different sizes.",
    explanation: "Population is the denominator; the example of a faster population rise; average meaning; comparison." });

  {
    const yrs = ["2024", "2025"], nom = [4200, 4992], defl = [100, 104], pop = [6.0, 6.3];
    const real = nom.map((n, i) => deflator.real(n, defl[i])); chk(real[0], 4200, 1e-9); chk(real[1], 4800, 1e-9);
    const gr = growthRate(real[0], real[1]); chk(roundTo(gr, 1), 14.3, 1e-9);
    const ph = real.map((r, i) => r / pop[i]); chk(ph[0], 700, 1e-9); chk(roundTo(ph[1], 2), 761.90, 1e-9);
    const gph = growthRate(ph[0], ph[1]); chk(roundTo(gph, 1), 8.8, 1e-9);
    const t1 = table(["Year", "Nominal GDP (US\\$ million)", "GDP deflator (2024 = 100)", "Population (million)"], yrs.map((y, i) => [y, nom[i], defl[i], fmt(pop[i], 1)]), { align: ["l", "r", "r", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Real GDP = nominal ÷ deflator × 100.", "Per head: divide real GDP by population before finding growth."],
      stem: `**Growth in Country Mbira (fictional, illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: real[1], unit: "US$ million", stem: "Calculate real GDP in 2025, in US\\$ million.", wrong: [4992, 5040, 4200], explanation: "Real GDP 2025 = 4,992 ÷ 104 × 100 = US\\$4,800 million." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: gr, dp: 1, unit: "%", stem: "Calculate the rate of economic growth between 2024 and 2025, to one decimal place.", wrong: [18.9, 4.6, 6.7], explanation: "Real GDP rose from 4,200 to 4,800: (4,800 − 4,200) ÷ 4,200 × 100 = 14.3%. Using nominal GDP would give 18.9%." }),
        P.num({ label: "(c)", marks: 3, kind: "pct", value: gph, dp: 1, unit: "%", stem: "Calculate the percentage rise in real GDP per head between 2024 and 2025, to one decimal place.", wrong: [14.3, 5, 18.9], explanation: "Real GDP per head: 2024 = 4,200 ÷ 6.0 = 700.00; 2025 = 4,800 ÷ 6.3 = 761.90. Growth = (761.90 − 700.00) ÷ 700.00 × 100 = 8.8%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why growth of real GDP per head is lower than growth of real GDP.",
          points: ["Real GDP per head divides real GDP by population.", "The population rose by 5.0% (from 6.0 to 6.3 million).", "So the same output is shared among more people, and the per head growth (8.8%) is below 14.3%."],
          modelAnswer: "Real GDP per head is real GDP divided by population. The population rose from 6.0 to 6.3 million, an increase of 5.0%, so the extra output is shared among more people and per head growth is lower than the growth of total output." }),
      ],
      explanation: "Real GDP 4,800; growth 14.3%; per head growth 8.8%; the population grew too." });
  }
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Name the cause, then trace the chain to output.", "In (c) give a benefit and a cost, then a judgement."],
    stem: "**Growth in Zandia (fictional)**\n\nZandia has grown by about 5% a year for six years. A government report credits the growth to three things: a rise in investment in factories and a new power station; a new training college that has doubled the number of skilled technicians; and the discovery of a large deposit of coal, most of which is exported. Critics note that wage growth has been slow, that smoke from the coal plants has increased respiratory illness in the nearby town, and that the richest fifth of households receive most of the new income.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify two sources of growth from the passage.",
        points: ["Investment in factories and a power station (capital).", "Training of skilled technicians (labour quality) or discovery of coal (natural resources)."],
        modelAnswer: "Investment in factories and a power station, and the training college that increased skilled technicians (or the coal discovery)." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how the training college might raise the economy's growth rate.",
        points: ["It increases the number of skilled technicians (human capital).", "Skilled workers are more productive: more output per hour.", "They can operate modern machinery and so make investment more effective.", "Higher productivity raises potential output and real GDP."],
        modelAnswer: "The college raises the skills of workers, so each technician produces more output per hour. Skilled workers can use the new factories and the power station more effectively, so investment is more productive. Higher productivity raises the economy's capacity to produce and increases real GDP." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether the growth in Zandia has improved living standards.",
        points: ["Growth of 5% a year raises average output and tax revenue and may create jobs.", "Skilled technicians and power supply may raise productivity for the long run.", "Wage growth has been slow, so many workers may not have gained much.", "Smoke has increased respiratory illness: a cost not counted in GDP.", "Most of the new income goes to the richest fifth, so gains are unequal.", "Judgement: growth has probably improved average living standards, but gains are uneven and some costs are ignored."],
        modelAnswer: "Growth of 5% a year has increased average output and probably tax revenue and jobs, and the new power station and training should raise productivity in the future. However, wage growth has been slow, so many workers have gained little, and most of the new income goes to the richest fifth of households. The smoke has increased respiratory illness, which is a cost that GDP does not record. Overall, living standards have probably improved on average, but the improvement is uneven and some of the costs are ignored, so growth alone overstates the gain." }),
    ],
    explanation: "Capital and labour quality as sources; chain from skills to productivity; benefits against unequal gains and health costs." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give benefits and costs, then who gains.", "Conclude on when growth is worth having."],
    stem: "Assess whether economic growth is always desirable.",
    points: ["Growth raises real incomes and consumption, giving people more choice.", "It raises tax revenue to fund health, education and infrastructure.", "It creates jobs and can reduce poverty.", "It can cause inflation and a rise in imports when demand grows faster than capacity.", "It may damage the environment and use up resources (external costs for future generations).", "Gains may be unequally shared, so inequality may rise.", "Growth is not development: health, education and freedom also matter.", "A justified judgement: growth is desirable when sustainable and shared."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Economic growth raises average real incomes and gives people more choice. It also raises tax revenue, which governments can use for schools, clinics and roads, and it creates jobs that can reduce poverty. However, growth can have costs. If demand grows faster than capacity it can cause inflation and a rise in imports. It can damage the environment, use up non-renewable resources and impose external costs on future generations. The gains may be unequally shared, so inequality can widen, and growth in output does not necessarily improve health, education or freedom, which are part of development. Overall, growth is desirable when it is sustainable and widely shared, but growth that pollutes or benefits only a few people is much less valuable.",
    explanation: "Weigh benefits (income, revenue, jobs) against costs (inflation, environment, inequality) and conclude." });

  b.card("DEFINITION", "Define **economic growth**.", "An increase in the volume of goods and services produced over time, measured by the percentage rise in real GDP.");
  b.card("FORMULA", "How is **real GDP** calculated from nominal GDP?", "Real GDP = nominal GDP ÷ GDP deflator × 100.");
  b.card("FORMULA", "How is the **growth rate** of real GDP calculated?", "(Real GDP new − real GDP old) ÷ real GDP old × 100.");
  b.card("DEFINITION", "What is **real GDP per head**?", "Real GDP divided by the population: average output per person, the usual measure of average living standards.");
  b.card("CONCEPT", "Name four causes of economic growth.", "More or better labour, more capital (investment), new resources and technology; supportive institutions.");
  b.card("CONCEPT", "What is the difference between growth and development?", "Growth is a rise in real output; development is a wider improvement in income, health, education and opportunities.");
  b.card("CONCEPT", "Give three possible costs of economic growth.", "Inflation, environmental damage and resource depletion, and widening inequality.");
  b.card("FACT", "Why is nominal GDP a poor measure of growth?", "It rises when prices rise even if output does not.");
  b.card("FORMULA", "Approximate growth of real GDP per head.", "Growth of real GDP minus growth of the population (exact: (1 + g) ÷ (1 + p) − 1).");
});
