// W4a: econ.population.hiv-aids (ZIMSEC only) — causes of the spread of HIV, effects on population, the labour force
// and development, solutions. Factual, respectful, non-stigmatising. Figures differ from the lesson's examples.
import { concept, P, table, dependencyRatio, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.population.hiv-aids", { file: "population/hiv-aids", keyPrefix: "population.hiv-aids" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a way in which HIV can be transmitted?",
    options: [
      ["Sharing needles or razors contaminated with infected blood", "Correct: infected blood can pass on the virus."],
      ["Shaking hands with a person living with HIV", "Everyday contact does not transmit HIV."],
      ["Sharing plates and cups at a meal", "HIV is not passed on through food or utensils."],
      ["Working in the same office as a person living with HIV", "Working together carries no risk."],
    ],
    answer: "A",
    explanation: "HIV is passed on through unprotected sex, from mother to child without treatment, and through infected blood or sharp instruments; never through everyday contact.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does antiretroviral therapy (ART) do?",
    options: [
      ["It keeps HIV under control so people can stay healthy and work", "Correct: ART controls the virus and greatly reduces transmission."],
      ["It cures HIV completely after a single course of tablets", "There is no cure; ART is taken daily."],
      ["It is a vaccine that prevents people from ever being infected", "ART is a treatment, not a vaccine."],
      ["It is a test used to find out whether a person has HIV", "Testing is separate from treatment."],
    ],
    answer: "A",
    explanation: "ART allows people living with HIV to live long, healthy and productive lives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which economic or social factor has contributed to the spread of HIV?",
    options: [
      ["Labour migration that separates workers from their families", "Correct: long periods away from home have increased risk."],
      ["Free and confidential testing services in every district", "Testing helps to control the epidemic."],
      ["Education in schools about how HIV is transmitted", "Education reduces the spread."],
      ["Wider access to antiretroviral therapy in clinics", "Treatment reduces transmission."],
    ],
    answer: "A",
    explanation: "Poverty, labour migration, gender inequality, lack of knowledge and stigma have helped HIV to spread.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the HIV epidemic, before treatment was widely available, affect the dependency ratio?",
    options: [
      ["It raised it, because many working-age adults died and orphans remained", "Correct: fewer working-age people supporting dependants."],
      ["It lowered it, because fewer children were born", "The main effect was on working-age adults."],
      ["It had no effect, because all the age groups were affected equally by HIV", "Working-age adults were affected most."],
      ["It lowered it, because the elderly population fell sharply", "The elderly were not the main group affected."],
    ],
    answer: "A",
    explanation: "Deaths among working-age adults reduced the number supporting children and the elderly, raising the dependency ratio.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can stigma and discrimination make the HIV epidemic worse?",
    options: [
      ["People avoid testing and treatment for fear of being treated unfairly", "Correct: fear stops people from knowing their status or starting ART."],
      ["Stigma makes treatment medicines more expensive to produce", "Stigma does not change production costs."],
      ["Stigma increases the number of clinics offering free testing and counselling", "Stigma discourages the use of services."],
      ["Discrimination raises the wages of people living with HIV", "Discrimination harms, not helps, people's job prospects."],
    ],
    answer: "A",
    hints: ["What stops a person from going for a test?"],
    explanation: "When people fear rejection, they avoid testing and treatment, so the virus is not controlled and can be passed on.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Several experienced workers on a commercial farm fall ill and leave. Which consequence is most likely to **raise the farm's average costs**?",
    options: [
      ["Recruiting and training replacement workers", "Correct: extra costs for the same output."],
      ["A rise in the world price of the farm's main crops", "This raises revenue, not costs."],
      ["A fall in the total wage bill paid to the workers", "This would lower costs."],
      ["A fall in foreign demand for the farm's products", "This affects revenue, not costs."],
    ],
    answer: "A",
    hints: ["Think about what the farm must pay for when workers are absent or leave."],
    explanation: "Absenteeism, lost output, recruitment, training and medical costs all raise average costs.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure is likely to have the greatest effect in reducing both new infections and the economic impact of HIV?",
    options: [
      ["Widespread testing combined with treatment for everyone who needs it", "Correct: keeps people healthy and working and greatly reduces transmission."],
      ["Dismissing workers who are known to be living with HIV to protect productivity", "This is discrimination; it worsens stigma and loses skilled workers."],
      ["Stopping all labour migration by law", "This is impractical and harms incomes."],
      ["Closing schools in areas with high HIV prevalence", "This damages education and does not reduce infections."],
    ],
    answer: "A",
    hints: ["Which measure helps people stay healthy and also prevents onward transmission?"],
    explanation: "Testing and treatment protect health, keep workers productive and prevent new infections.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did the death of many parents in the worst years of the epidemic reduce the **future** skills of the labour force?",
    options: [
      ["Many orphaned children left school early to work or care for others", "Correct: lost schooling lowers future human capital."],
      ["Orphaned children were automatically given places at university", "No such automatic places exist."],
      ["The number of teachers in the country rose sharply", "Teachers were also affected; numbers did not rise."],
      ["Fewer children meant that schools had more money per pupil", "The issue was lost schooling, not school funding."],
    ],
    answer: "A",
    hints: ["Think about what happens to children's education when a household loses its earners."],
    explanation: "When households lost earners, children often left school, reducing the skills of the future labour force.",
  });

  // Numericals.
  const kids = 39000, wk = 62500, eld = 4750;
  const dr = dependencyRatio(kids + eld, wk);
  check("dr", dr, 70);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: dr, daily: true, calculator: true,
    stem: `A fictional district has ${fmt(kids)} children, ${fmt(wk)} people of working age and ${fmt(eld)} elderly people. Calculate the dependency ratio (dependants per 100 people of working age).`,
    wrong: [(kids / wk) * 100],
    explanation: `(${fmt(kids)} + ${fmt(eld)}) ÷ ${fmt(wk)} × 100 = ${fmt(kids + eld)} ÷ ${fmt(wk)} × 100 = **${fmt(dr)}**.`,
  });
  const workers = 340, absDays = 7, daysPerYear = 250, lostPct = (workers * absDays) / (workers * daysPerYear) * 100;
  check("lostPct", lostPct, 2.8);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: lostPct,
    stem: `A fictional factory has ${workers} workers, each scheduled to work ${daysPerYear} days a year. On average each worker misses ${absDays} days a year through illness or caring for sick relatives. What percentage of scheduled working days is lost? Give your answer to one decimal place.`,
    wrong: [(absDays / workers) * 100],
    explanation: `Days lost = ${workers} × ${absDays} = ${fmt(workers * absDays)}; scheduled days = ${workers} × ${daysPerYear} = ${fmt(workers * daysPerYear)}. Lost share = ${fmt(workers * absDays)} ÷ ${fmt(workers * daysPerYear)} × 100 = **${pct(lostPct, 1)}** (the same as ${absDays} ÷ ${daysPerYear} × 100).`,
  });
  const cost = 42000, days = 1900, perDay = 18, train = 11500, benefit = days * perDay + train, net = benefit - cost;
  check("net", net, 3700);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: net,
    stem: `A fictional company runs a workplace health programme (education, free testing and support for treatment) costing US\\$${fmt(cost)} a year. It reduces working days lost to illness by ${fmt(days)} a year, each lost day costing the company US\\$${perDay}, and saves US\\$${fmt(train)} a year on training replacement workers. Calculate the net benefit of the programme to the company, in US\\$ a year.`,
    wrong: [benefit, days * perDay - cost],
    hints: ["Add both savings, then subtract the cost."],
    explanation: `1. Saving on lost days = ${fmt(days)} × ${perDay} = US\\$${fmt(days * perDay)}.\n2. Total saving = ${fmt(days * perDay)} + ${fmt(train)} = US\\$${fmt(benefit)}.\n3. Net benefit = ${fmt(benefit)} − ${fmt(cost)} = **US\\$${fmt(net)}** a year.\n4. Forgetting the training saving gives ${fmt(days * perDay - cost)} (a net cost).`,
  });
  const income = 4800, levyRate = 3, levy = (income * levyRate) / 100;
  check("levy", levy, 144);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: levy,
    stem: `In a fictional country, a health levy is charged at ${levyRate}% of the income tax a person pays. A worker's income tax for the year is US\\$${fmt(income)}. Calculate the levy, in US\\$.`,
    wrong: [income * levyRate, income + levy],
    hints: ["The levy is a percentage of the tax, not of income."],
    explanation: `Levy = ${levyRate}% × ${fmt(income)} = ${levyRate} ÷ 100 × ${fmt(income)} = **US\\$${fmt(levy)}**. ${fmt(income + levy)} would be the total of tax plus levy.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "HIV can be passed on by hugging or by sharing a cup.",
    answer: false,
    explanation: "False. HIV is not transmitted by everyday contact.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "People living with HIV who take antiretroviral therapy can live long and productive working lives.",
    answer: true,
    explanation: "True. ART keeps the virus under control, so people can stay healthy and work.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each effect of the HIV epidemic with the area of the economy it affects.",
    pairs: [
      ["Children leave school to care for sick relatives", "Future human capital"],
      ["Workers miss days to attend funerals and care for family", "Productivity of firms"],
      ["Government spends more on treatment and care of orphans", "Public spending"],
      ["Households sell cattle to pay for medical care", "Household assets and poverty"],
    ],
    explanation: "HIV affects education, productivity, the government budget and household wealth.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Illness among skilled workers reduces labour {{blank:a}}, which raises firms' average {{blank:b}}. Treatment that keeps workers healthy makes output per worker {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["productivity"], choices: ["productivity", "demand", "mobility"] },
      { id: "b", accepted: ["costs"], choices: ["costs", "revenue", "prices"] },
      { id: "c", accepted: ["rise"], choices: ["rise", "fall"] },
    ],
    wrong: [["demand", "revenue", "fall"]],
    hints: ["Less output from the same workers means each unit costs more to make."],
    explanation: "Lower productivity raises cost per unit; healthy workers produce more.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of HIV and AIDS on the labour force.",
    points: [
      "Identifies: loss of skilled and experienced workers (especially before treatment).",
      "Explains: firms and public services lose skills and must recruit and train replacements.",
      "Identifies: absenteeism / lower productivity.",
      "Explains: workers who are ill or caring for relatives miss work, so output per worker falls.",
    ],
    modelAnswer: "First, before treatment was widely available, many skilled and experienced workers, such as teachers, nurses and miners, fell ill and died, so employers had to recruit and train replacements and lost valuable skills. Second, absenteeism rose, because workers who were unwell or caring for sick relatives missed work, so productivity and output fell.",
    hints: ["Think about the number of workers and how much each produces."],
    explanation: "Each effect: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** measures a large employer could take to reduce the impact of HIV on its workforce, and explain how each helps.",
    points: [
      "Identifies a measure: workplace education / free confidential testing / support for treatment / non-discrimination policy.",
      "Explains how it helps, e.g. workers learn how to protect themselves, so fewer new infections.",
      "Identifies a second measure.",
      "Explains it, e.g. workers on treatment stay healthy and productive, reducing absenteeism.",
    ],
    modelAnswer: "First, the employer can run workplace education about how HIV is transmitted and prevented, so fewer workers become infected. Second, it can offer free, confidential testing and time off to collect treatment, so workers living with HIV stay healthy and productive, absenteeism falls and the firm keeps its skilled staff.",
    hints: ["Think about prevention and about keeping workers healthy."],
    explanation: "Each measure: identify (1) + explain (1).",
  });

  // Structured 1: district data.
  const D = { kids: [41000, 43500], wk: [74000, 69600], eld: [5000, 4500] };
  const d0 = dependencyRatio(D.kids[0] + D.eld[0], D.wk[0]), d1 = dependencyRatio(D.kids[1] + D.eld[1], D.wk[1]);
  check("d0", d0, 62.1621622); check("d1", d1, 68.9655172);
  const wkCh = ((D.wk[1] - D.wk[0]) / D.wk[0]) * 100;
  const T1 = table(["", "Year 1", "Year 10"], [["Children (under 15)", D.kids[0], D.kids[1]], ["Working age", D.wk[0], D.wk[1]], ["Elderly", D.eld[0], D.eld[1]]]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the population of a fictional rural district during a period when HIV treatment was not yet widely available. Many working-age adults moved away to look for work or died, and grandparents cared for many orphaned children.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: wkCh, stem: "Calculate the percentage change in the working-age population between year 1 and year 10. Give your answer to one decimal place and include the minus sign.", wrong: [-wkCh], explanation: `(${fmt(D.wk[1])} − ${fmt(D.wk[0])}) ÷ ${fmt(D.wk[0])} × 100 = ${pct(wkCh, 1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: d1, dp: 1, tol: 0.05, stem: "Calculate the dependency ratio in year 10 (dependants per 100 people of working age). Give your answer to one decimal place.", wrong: [(D.kids[1] / D.wk[1]) * 100], explanation: `(${fmt(D.kids[1])} + ${fmt(D.eld[1])}) ÷ ${fmt(D.wk[1])} × 100 = ${fmt(d1, 1)} (it was ${fmt(d0, 1)} in year 1).` }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the change in the dependency ratio affects households in the district.",
        points: [
          "Each working-age adult supports more dependants.",
          "Income per household member falls; more households fall into poverty.",
          "Less is saved / children may leave school to work or care; grandparents bear a heavy burden.",
        ],
        modelAnswer: "The dependency ratio rose, so each working-age adult has to support more children and elderly people. Household income per person falls and more families fall into poverty; little can be saved, and some children leave school to work or to help care for younger siblings, while elderly grandparents carry a heavy burden.",
        explanation: "One mark per point.",
      }),
      P.manual({
        label: "(d)", marks: 5, levels: LV(5),
        stem: "Discuss whether providing free treatment is the most effective way to reduce the economic impact of HIV in the district.",
        points: [
          "For: treatment keeps adults healthy and working, so incomes, farm output and care of children are maintained.",
          "For: treatment reduces onward transmission, so fewer new infections in future.",
          "Against/limits: needs clinics, staff, transport and daily adherence; costly; people must first test, which stigma may discourage.",
          "Other measures also needed: education and prevention, testing, support for orphans (school fees), poverty reduction.",
          "Justified conclusion, e.g. treatment is the most important single measure but works best with testing, prevention and support.",
        ],
        modelAnswer: "Free treatment would keep adults living with HIV healthy, so they could continue to farm, work and care for their children; this protects household incomes and reduces the number of orphans. Treatment also greatly reduces the chance of passing the virus on. However, it needs clinics, trained staff and regular supplies, which are costly in remote districts, and people must first be tested, which stigma may discourage. Education and prevention, free testing, and support for orphans and grandparents caring for them are also needed. Treatment is the most important single measure, but it is most effective as part of a package with testing, prevention and support for affected households.",
        explanation: "Weigh benefits of treatment against limits and other measures; conclude.",
      }),
    ],
    hints: ["Percentage change = change ÷ original × 100.", "Dependants = children + elderly."],
    explanation: `Working-age population ${pct(wkCh, 1)}; dependency ratio ${fmt(d0, 1)} → ${fmt(d1, 1)}.`,
  });

  // Structured 2: government response.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The government of a fictional country funds its HIV programme partly from a levy added to income tax and company tax, and partly from foreign donors. Donors have announced that their funding will fall over the next five years.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "A levy added to income tax and company tax is",
        options: [
          ["a direct tax.", "Correct: it is charged on income and profits."],
          ["an indirect tax.", "Indirect taxes are charged on spending."],
          ["a subsidy.", "A subsidy is a payment by government, not a charge."],
          ["a tariff.", "A tariff is a tax on imports."],
        ],
        answer: "A",
        explanation: "Taxes on income and profits are direct taxes.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** reason why spending on the HIV programme is an investment in economic development.",
        points: ["Healthy workers stay productive and keep their skills.", "So output, incomes and tax revenue are higher in future / fewer orphans, more children in school."],
        modelAnswer: "Treatment keeps workers healthy and productive, so they keep working, earning and paying tax, and fewer children lose parents and leave school; the future output and skills of the economy are protected.",
        explanation: "Two linked points.",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether the government should raise the levy to replace the falling donor funding.",
        points: [
          "For: secures continued treatment and prevention; avoids a rise in illness, absenteeism and deaths, which would cost the economy more.",
          "For: domestic funding is more reliable than donor funding.",
          "Against: higher taxes reduce disposable income and profits; may discourage investment and work; many workers are informal and do not pay it (narrow base).",
          "Alternatives: improve efficiency, reallocate spending from other areas, lower-cost medicines, partnerships with employers.",
          "Justified conclusion.",
        ],
        modelAnswer: "Raising the levy would keep treatment and prevention running, which matters because a fall in treatment would bring more illness, absenteeism and deaths, costing the economy far more than the levy. Domestic funding is also more reliable than donor money. However, a higher levy reduces workers' disposable income and firms' profits, which could reduce spending and investment, and since many people work in the informal sector, the burden falls on a small number of formal taxpayers. The government could also make the programme more efficient, buy cheaper medicines or move money from lower-priority spending. A moderate rise in the levy, combined with efficiency savings, is justified because the cost of cutting the programme would be much greater.",
        explanation: "Weigh benefits of continued funding against the costs of higher tax; conclude.",
      }),
    ],
    hints: ["What happens to the economy if treatment programmes are cut?"],
    explanation: "Health spending protects the labour force; funding choices involve trade-offs between taxes, other spending and efficiency.",
  });

  b.card("DEFINITION", "What is the difference between **HIV** and **AIDS**?", "HIV is the virus that attacks the immune system; AIDS is the advanced stage of untreated HIV infection.");
  b.card("CONCEPT", "Name four ways HIV can be transmitted.", "Unprotected sex; from mother to child without treatment; sharing contaminated needles or sharp instruments; unscreened blood transfusion.");
  b.card("CONCEPT", "Give four social and economic factors in the spread of HIV.", "Poverty; labour migration; gender inequality; lack of knowledge; multiple concurrent partners; stigma; limited access to testing.");
  b.card("CONCEPT", "Give three effects of HIV on population.", "Higher death rates among working-age adults (before treatment); lower life expectancy; orphans; a higher dependency ratio.");
  b.card("CONCEPT", "Give three effects of HIV on the labour force.", "Loss of skilled workers; absenteeism; lower productivity; higher recruitment and training costs.");
  b.card("CONCEPT", "Give three effects of HIV on economic development.", "Household poverty and asset sales; higher government health spending; lower saving and investment; lost schooling.");
  b.card("CONCEPT", "Give five solutions to HIV and AIDS.", "Education; free testing and counselling; treatment (ART); prevention of mother-to-child transmission; condoms; workplace policies; fighting stigma.");
  b.card("FACT", "How is Zimbabwe's National AIDS Council partly funded?", "By the AIDS Levy, a charge added to income tax and company tax (and by donors).");
  b.card("FACT", "Why does fighting stigma matter economically?", "Stigma stops people testing and starting treatment, so illness, absenteeism and new infections continue.");
});
