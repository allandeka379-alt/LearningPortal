// W3a: intervention in factor markets: wages policies, trade unions and land reform (ZIMSEC only, Form 5; factual and neutral).
import { concept, P, chk, table, fmt, labourMarket, pctChange, growthRate } from "../lib.mjs";
import { mc, LV5, LV8, LV12 } from "../tables/w3a-kit.mjs";

concept("aecon.intervention.wages-land-policies", { file: "intervention/wages-land-policies", keyPrefix: "intervention.wages-land-policies" }, (b) => {
  mc(b, [1, "RECALL"], "A minimum wage is",
    ["a legal minimum price for labour", "Correct: employers may not pay less than the minimum."],
    [["a maximum price that firms may charge", "That is a price ceiling for goods."], ["the highest wage a worker may earn", "A minimum wage sets a floor, not a ceiling."], ["a tax charged on workers' earnings", "That is an income tax."]],
    "A minimum wage is a legal floor on the price of labour.");

  mc(b, [2, "UNDERSTANDING"], "In a competitive labour market, a binding minimum wage above the equilibrium wage is likely to",
    ["reduce the quantity of labour demanded and create unemployment", "Correct: employers hire fewer workers at the higher wage."],
    [["increase the quantity of labour demanded because workers are paid more by firms", "A higher wage reduces the quantity demanded by firms."], ["leave employment unchanged in the market because wages are fixed by law", "The quantity demanded still responds to the wage."], ["reduce the number of people who want to work at the higher wage", "A higher wage attracts more people to supply labour."]],
    "A wage floor above equilibrium reduces the quantity of labour demanded and increases the quantity supplied, so there is excess supply.");

  mc(b, [2, "UNDERSTANDING"], "What is the aim of an incomes policy?",
    ["To limit increases in wages and other incomes, usually to reduce inflation", "Correct: it restrains incomes to control cost-push pressures."],
    [["To raise the minimum price that workers can charge for their labour", "That describes a minimum wage."], ["To redistribute land from large estates to small farmers", "That describes land reform."], ["To increase the bargaining power of a single trade union", "Incomes policy restrains wages."]],
    "An incomes policy restrains wage and income growth, usually in order to reduce inflation.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Collective bargaining is",
    ["negotiation between employers and unions over pay and conditions", "Correct: unions bargain on behalf of workers."],
    [["a government decision that fixes every wage rate in the whole economy", "That would be a wage control, not bargaining."], ["an agreement among firms to fix the price of the goods they sell", "That is collusion between firms."], ["the purchase of farm land by a group of farmers acting together", "That has nothing to do with wages."]],
    "Collective bargaining is negotiation between employers (or their associations) and unions.");

  mc(b, [3, "APPLICATION"], "The equilibrium wage in a competitive labour market is US\\$6 and employment is 400 workers. A binding minimum wage of US\\$7.20 reduces employment to 340 workers. The percentage change in employment is",
    ["−15%", "Correct: (340 − 400) ÷ 400 × 100."],
    [["+15%", "Employment falls, so the change is negative."], ["−17.6%", "That uses the new level as the base."], ["−20%", "That is the change in the wage (1.20 ÷ 6), not in employment."]],
    "(340 − 400) ÷ 400 × 100 = −15%.", { hints: ["Base is the original employment of 400."], calculator: true });

  mc(b, [3, "ANALYSIS"], "Why might a minimum wage raise employment where there is a single dominant employer (monopsony)?",
    ["The employer paid below the competitive wage and hired too few workers", "Correct: a floor raises the wage and removes the monopsony's incentive to restrict hiring."],
    [["The employer will always want more workers at a higher wage than before, in any market", "Employers normally demand fewer workers at a higher wage."], ["The minimum wage raises the demand for labour by lowering workers' productivity", "A minimum wage does not lower productivity."], ["Workers will supply fewer hours at a higher wage in every market", "A higher wage normally attracts a larger supply of labour."]],
    "A monopsonist keeps wages and employment below competitive levels; a moderate minimum wage can move both closer to the competitive outcome.", { hints: ["Compare the monopsony outcome with the competitive one."] });

  mc(b, [3, "EVALUATION"], "Which would be the best criterion for judging the success of a land reform programme in economic terms?",
    ["Changes in efficiency, equity and total output over time", "Correct: these are the three standard criteria."],
    [["Whether the programme was announced shortly before an election was held", "Timing is a political, not economic, criterion."], ["The number of speeches made about the programme by public figures", "Speeches do not measure economic effects."], ["The size of the public debate about the programme in the media", "The scale of debate is not an economic measure."]],
    "Economic assessment looks at efficiency, equity and output, with support and tenure conditions.", { hints: ["Which option is an economic measure of results?"] });

  mc(b, [4, "ANALYSIS"], "A government limits public sector wage rises to 4% while inflation is 9%. Which statement is correct?",
    ["The real wage of public sector workers falls", "Correct: nominal wages rise by less than prices."],
    [["The real wage rises because the nominal wage has risen", "The real wage depends on wages relative to prices."], ["The real wage is unchanged because the limit is set by law", "A law does not stop prices rising faster than wages."], ["Wages rise by 13%, the sum of the two rates", "Rates are not added to find the real wage."]],
    "Real wage change ≈ 4 − 9 = −5 percentage points (exactly 1.04 ÷ 1.09 − 1 = −4.6%).", { hints: ["Compare the rise in wages with the rise in prices."] });

  {
    const lm = labourMarket({ m: 14, n: 0.02, s: 2, k: 0.02, minimumWage: 9.5 });
    chk(lm.competitive.employment, 300); chk(lm.competitive.wage, 8); chk(lm.minimumWage.demanded, 225); chk(lm.minimumWage.supplied, 375); chk(lm.minimumWage.unemployed, 150);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: lm.minimumWage.unemployed, unit: "workers", calculator: true, hints: ["Find the quantity demanded and the quantity supplied at the minimum wage."],
      stem: "Labour demand is W = 14 − 0.02L and labour supply is W = 2 + 0.02L (W in US\\$ an hour, L in workers). A minimum wage of US\\$9.50 an hour is introduced. How many workers are unemployed?",
      wrong: [75, 225, 375], explanation: "Demand at 9.50: L = (14 − 9.5) ÷ 0.02 = 225. Supply at 9.50: L = (9.5 − 2) ÷ 0.02 = 375. Unemployment = 375 − 225 = 150 workers. (The equilibrium is 300 workers at US\\$8.)" });
    const bill0 = 8 * 300, bill1 = 9.5 * 225;
    chk(bill1, 2137.5);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: bill1 - bill0, calculator: true, hints: ["Wage bill = wage × employment, before and after."],
      stem: "In the same labour market, calculate the change in the total hourly wage bill of employed workers when the minimum wage of US\\$9.50 is introduced (a negative number for a fall), in US\\$.",
      wrong: [262.5, 2137.5, 150], explanation: "1. Before: 8 × 300 = US\\$2,400.\n2. After: 9.50 × 225 = US\\$2,137.50.\n3. Change = 2,137.50 − 2,400 = −US\\$262.50. The wage bill falls because the demand for labour is elastic between these wages (%ΔL = −25%, %Δwage = +18.75%)." });
    const e = Math.abs(pctChange(300, 225) / pctChange(8, 9.5));
    chk(e, 4 / 3, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "elasticity", value: e, dp: 2, calculator: true, hints: ["Elasticity = %ΔL ÷ %Δwage; ignore the sign."],
      stem: "Calculate the elasticity of demand for labour between the wage of US\\$8 and US\\$9.50 (employment 300 and 225). Ignore the sign and give your answer to two decimal places.",
      wrong: [0.75, 1.5, 0.25], explanation: "%ΔL = (225 − 300) ÷ 300 × 100 = −25%. %Δwage = (9.5 − 8) ÷ 8 × 100 = 18.75%. Elasticity = 25 ÷ 18.75 = 1.33 (elastic)." });
  }
  {
    const mono = labourMarket({ m: 16, n: 0.04, s: 4, k: 0.02, minimumWage: 7.6 });
    chk(mono.competitive.employment, 200); chk(mono.monopsony.employment, 150); chk(mono.monopsony.wage, 7); chk(mono.minimumWage.employed, 180);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: mono.minimumWage.employed, unit: "workers", calculator: true, hints: ["The employer hires up to the quantity supplied at the minimum wage, if demand is greater."],
      stem: "A single employer buys all labour in a district. Labour demand (MRP) is W = 16 − 0.04L and labour supply is W = 4 + 0.02L (W in US\\$ an hour, L in workers). Without regulation the employer hires 150 workers at US\\$7. A minimum wage of US\\$7.60 is introduced. How many workers are employed?",
      wrong: [150, 200, 210], explanation: "At US\\$7.60: supply L = (7.6 − 4) ÷ 0.02 = 180; demand L = (16 − 7.6) ÷ 0.04 = 210. The employer hires up to the supply: 180 workers. Employment rises from 150 to 180." });
  }
  {
    const land = 3000, y0 = 5, y1 = 3.5;
    chk(land * y0, 15000); chk(land * y1, 10500); chk(growthRate(15000, 10500), -30, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: growthRate(15000, 10500), dp: 1, calculator: true, hints: ["Output = land × yield for each year."],
      stem: "A fictional district has 3,000 hectares. Before land reform the yield is 5 tonnes per hectare. In the second year after reform the yield is 3.5 tonnes per hectare on the same area. Calculate the percentage change in total output (a negative number for a fall), to one decimal place.",
      wrong: [30, -70, -1.5], explanation: "Output before = 3,000 × 5 = 15,000 tonnes. Output after = 3,000 × 3.5 = 10,500 tonnes. Change = (10,500 − 15,000) ÷ 15,000 × 100 = −30.0%." });
  }
  b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: (1.04 / 1.09 - 1) * 100, dp: 1, calculator: true,
    stem: "Wages rise by 4% in a year in which prices rise by 9%. Calculate the percentage change in the real wage (a negative number for a fall), to one decimal place, using real wage = nominal wage index ÷ price index.",
    wrong: [-5, 13, -4], explanation: "Real wage change = (1.04 ÷ 1.09 − 1) × 100 = −4.6%. The simple difference 4 − 9 = −5 is only an approximation." });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a competitive labour market a minimum wage set below the equilibrium wage has no effect on employment.", answer: true,
    explanation: "True. A floor below the equilibrium wage is not binding, so the market wage stays above it." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Which criteria do economists use?"], stem: "Economists judge land reform only by the total output of the farms after the reform.", answer: false,
    explanation: "False. Economists also consider equity (the distribution of land and incomes) and efficiency (productivity, tenure and support), not only total output." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its main aim.",
    pairs: [["Minimum wage", "To protect the incomes of low-paid workers"], ["Incomes policy", "To restrain wage growth in order to reduce inflation"], ["Collective bargaining", "To negotiate pay and conditions through representatives"], ["Land reform", "To change the ownership or use of agricultural land"]],
    explanation: "Each policy intervenes in a factor market for a different aim." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A minimum wage set above the equilibrium wage in a competitive market raises the quantity of labour {{blank:a}} and reduces the quantity {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["supplied"], choices: ["supplied", "demanded", "taxed"] }, { id: "b", accepted: ["demanded"], choices: ["demanded", "supplied", "taxed"] }],
    explanation: "More people want to work at the higher wage, but firms demand fewer workers." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of labour market, with a single dominant buyer of labour, in which a moderate minimum wage can increase employment.",
    accepted: ["monopsony", "a monopsony", "monopsonistic labour market", "monopsonistic"], wrong: ["monopoly"],
    explanation: "Monopsony: one dominant buyer of labour." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define an incomes policy.",
    points: ["Government action to limit increases in wages and other incomes (by guidelines, agreements or controls).", "Usually aimed at reducing inflation."],
    modelAnswer: "An incomes policy is government action to limit increases in wages and other incomes, usually in order to reduce inflation.",
    explanation: "One mark for limiting incomes, one for the aim of reducing inflation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the supply and demand for labour."],
    stem: "Explain why a minimum wage set above the equilibrium wage may cause unemployment in a competitive labour market.",
    points: ["The minimum wage is above the equilibrium wage, so it is binding.", "At the higher wage employers demand less labour (a movement up the demand curve).", "At the higher wage more people want to work.", "The quantity supplied exceeds the quantity demanded, so there is unemployment."],
    modelAnswer: "A minimum wage above the equilibrium is binding. At the higher wage employers demand less labour, because it is more expensive, while more people want to work. The quantity supplied exceeds the quantity demanded, so there is unemployment.",
    explanation: "Binding wage, lower demand, higher supply, excess supply." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Give a case for and a case against, then a judgement."],
    stem: "Assess the effects of an incomes policy on workers and on inflation.",
    points: ["It limits wage growth, which reduces cost-push pressure on prices.", "If inflation falls, the policy has worked and price stability helps planning.", "Workers' real wages may fall if inflation remains above the wage limit.", "It may cause disputes and be hard to enforce, especially in the informal sector.", "It does not help if inflation is caused by demand or by other costs such as imports.", "A justified judgement."],
    modelAnswer: "An incomes policy limits wage growth and so reduces cost-push pressure on prices, and if inflation falls it helps price stability. However, if prices still rise faster than the wage limit, workers' real wages fall, which may cause disputes, and the policy is hard to enforce in the informal sector. It also does nothing if inflation is caused by excess demand or by import costs. Overall it is likely to work only if wages are the main cause of inflation and if the limits are seen as fair.",
    explanation: "Reduces cost-push, real wage loss, enforcement, limited if other causes, judgement." });

  {
    const m = labourMarket({ m: 12, n: 0.01, s: 3, k: 0.005, minimumWage: 5.5 });
    // dataset differs from the lesson example in the hours and wage bill used below
    const rows = [[4, 560, 100], [5, 600, 400]];
    const mono = labourMarket({ m: 18, n: 0.02, s: 4, k: 0.01, minimumWage: 9 });
    chk(mono.competitive.employment, 466.6666666666667, 1e-6);
    const lm = labourMarket({ m: 22, n: 0.04, s: 2, k: 0.04, minimumWage: 13 });
    chk(lm.competitive.employment, 250); chk(lm.competitive.wage, 12); chk(lm.minimumWage.demanded, 225); chk(lm.minimumWage.supplied, 275); chk(lm.minimumWage.unemployed, 50);
    const t1 = table(["Hourly wage (US\\$)", "Workers demanded", "Workers supplied"], [[11, 275, 225], [12, 250, 250], [13, 225, 275]]);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Compare quantity demanded and supplied at the minimum wage.", "Wage bill = wage × employment."],
      stem: `**A minimum wage in a fictional town (illustrative data)**\n\nThe government sets a minimum wage of US\\$13 an hour for general workers in a town.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: 12, stem: "State the equilibrium wage, in US\\$ an hour.", wrong: [11, 13, 250], explanation: "Workers demanded equal workers supplied (250) at US\\$12." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: lm.minimumWage.unemployed, unit: "workers", stem: "Calculate the unemployment at the minimum wage.", wrong: [25, 225, 275], explanation: "At US\\$13, 275 are supplied and 225 are demanded: unemployment = 50." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: 13 * 225 - 12 * 250, stem: "Calculate the change in the total hourly wage bill of employed workers (a negative number for a fall), in US\\$.", wrong: [75, 2925, 3000], explanation: "Before: 12 × 250 = 3,000. After: 13 × 225 = 2,925. Change = −US\\$75." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain two reasons why unemployment may be lower than the table suggests.",
          points: ["Some employers may hire informally and not follow the minimum wage.", "Some people who cannot find work may leave the labour force or move.", "If the employer has monopsony power the minimum wage may raise employment."],
          modelAnswer: "Some employers may hire workers informally and not follow the minimum wage, so those jobs are not lost. Some people who cannot find work may leave the labour force or move, so they are not counted. If the employer has monopsony power, a moderate minimum wage could even raise employment." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two groups that gain and one group that loses from the minimum wage.",
          points: ["Gain: workers who keep their jobs and receive US\\$13 instead of US\\$12 (a rise in their income).", "Lose: workers who lose jobs or cannot find work; employers face higher costs."],
          modelAnswer: "Workers who keep their jobs gain, since they now earn US\\$13 instead of US\\$12. Workers who lose their jobs or cannot find work lose, and employers also lose because their costs are higher." }),
      ],
      explanation: "Equilibrium US\\$12; unemployment 50; wage bill falls by US\\$75; informal sector and monopsony may reduce the loss of jobs." });
  }
  {
    const rows = [["Before reform", 6, 3000, 5, 15000], ["After reform", 200, 3000, 4.5, 13500]];
    chk(3000 * 5, 15000); chk(3000 * 4.5, 13500); chk(15000 / 6, 2500); chk(13500 / 200, 67.5);
    const t1 = table(["Stage (fictional district)", "Holdings", "Land (hectares)", "Yield (tonnes per hectare)", "Output (tonnes)"], [["Before reform", 6, 3000, 5, 15000], ["Eight years after reform", 200, 3000, 4.5, 13500]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Output = land × yield; percentage change = change ÷ original × 100.", "Use the criteria efficiency, equity and output."],
      stem: `**Land reform in a fictional district (illustrative data)**\n\nIn a district, 3,000 hectares were held in 6 large farms. The land was redistributed into 200 holdings. Supporters of the reform say that many more families now have access to land and a livelihood. Critics say that the farms lost access to credit and machinery and that total output fell.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: growthRate(15000, 13500), dp: 1, stem: "Calculate the percentage change in total output (a negative number for a fall), to one decimal place.", wrong: [10, -11.1, 90], explanation: "(13,500 − 15,000) ÷ 15,000 × 100 = −10.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 200 / 6, dp: 1, stem: "By what factor did the number of holdings increase? Give your answer to one decimal place.", wrong: [194, 3, 0.03], explanation: "200 ÷ 6 = 33.3 times." }),
        P.manual({ label: "(c)", marks: 3, stem: "Using the table, explain one criterion on which supporters of the reform would judge it a success.",
          points: ["Equity: the number of holdings (families with land) rose from 6 to 200.", "The land is more widely shared, giving many more households a livelihood.", "Output only fell by 10%, so most of the previous production was maintained."],
          modelAnswer: "Supporters would judge the reform on equity. The number of holdings rose from 6 to 200, so the land is more widely shared and many more households have a livelihood. Total output fell by only 10%, so most of the previous production was maintained." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 60, max: 200 }, levels: LV5,
          stem: "Evaluate whether the land reform in this district was successful.",
          points: ["Equity: 200 holdings instead of 6, so many more households have land.", "Output: total output is 10% lower than before the reform, so there is a cost.", "Efficiency: yield fell from 5 to 4.5 tonnes per hectare, but it may continue to recover with credit, inputs and secure tenure.", "Eight years is a limited period; the result may change with rainfall and support.", "A justified judgement that depends on the weight given to equity and to total output."],
          modelAnswer: "On equity the reform was successful: 200 holdings instead of 6 means many more households have land. On output there was a cost: total output is 10% lower than before and yield fell from 5 to 4.5 tonnes per hectare. However, yields may continue to recover if the new farmers receive credit, inputs and secure tenure, and eight years is a short period in which rainfall also matters. Overall, the reform can be judged a partial success: it improved equity at a modest cost in output, and its longer-term success depends on the support given to the new farmers." }),
      ],
      explanation: "Output −10.0%; holdings ×33.3; equity gain against a modest fall in output; judgement depends on weights and support." });
  }

  b.ext({ d: 5, skill: "EVALUATION", marks: 12, hints: ["Use the competitive and monopsony models.", "Give both sides and the influence of the informal sector.", "Reach a judgement."],
    stem: "Discuss whether a minimum wage is an effective way of reducing poverty in a developing economy such as Zimbabwe.",
    points: ["A minimum wage raises the pay of low-paid workers who keep their jobs, which supports incomes.", "In a competitive market a binding minimum wage reduces employment and creates unemployment.", "The size of the job loss depends on the elasticity of demand for labour: if it is inelastic, the total wage bill rises.", "Under monopsony a moderate minimum wage can raise both wages and employment.", "A large informal sector means that many low-paid workers are not covered, and some employers may avoid the law.", "Higher costs may raise prices, which reduces the benefit to workers.", "Productivity may rise with higher pay (efficiency wage effect), which offsets part of the cost.", "The level of the minimum relative to average wages and productivity is crucial.", "Poverty depends on household income and dependants, not only on individual wages; the poorest may be unemployed and not helped by a minimum wage.", "Alternative or complementary policies include social transfers, skills training and support for small enterprises.", "Evidence differs between studies and countries, and supporters and critics draw different conclusions.", "A justified judgement."],
    levels: LV12,
    modelAnswer: "A minimum wage raises the pay of low-paid workers who keep their jobs, which supports incomes. In a competitive market, however, a binding minimum wage reduces the quantity of labour demanded, and if demand for labour is elastic the total wage bill falls and unemployment rises. Where there is a dominant employer, a moderate minimum wage can raise both wages and employment. In a country with a large informal sector, many of the poorest workers are not covered and some employers avoid the law, and higher costs may be passed on in higher prices. Productivity may rise with higher pay, which offsets part of the cost. Poverty depends on household income, and the poorest households may have no wage earner, so a minimum wage does not reach them; social transfers, skills training and support for small enterprises are complementary measures. Evidence differs between studies, and supporters and critics draw different conclusions. Overall, a moderate, well-enforced minimum wage can reduce poverty among low-paid workers, but it is not enough alone, and its effect depends on the level, the market structure and the size of the informal sector.",
    wordLimit: { min: 150, max: 400 },
    explanation: "Weigh income gains for employed workers against job losses, informality and limited reach; judgement." });

  b.card("DEFINITION", "Define a **minimum wage**.", "A legal minimum price for labour: employers may not pay less than the stated rate.");
  b.card("CONCEPT", "What happens when a minimum wage is set above the equilibrium wage in a competitive labour market?", "The quantity of labour demanded falls, the quantity supplied rises and unemployment results; those who keep their jobs earn more.");
  b.card("CONCEPT", "How can a minimum wage raise employment?", "Under monopsony (one dominant employer) a moderate minimum wage raises the wage and employment towards the competitive level.");
  b.card("DEFINITION", "Define **collective bargaining**.", "Negotiation of pay and conditions between employers and workers' representatives (trade unions).");
  b.card("DEFINITION", "Define an **incomes policy**.", "Government action to limit increases in wages and other incomes, usually to reduce inflation.");
  b.card("FORMULA", "How do you work out the real wage change?", "Real wage index = nominal wage index ÷ price index; if wages rise 4% and prices 9%, real wage change = 1.04 ÷ 1.09 − 1 = −4.6%.");
  b.card("DEFINITION", "Define **land reform**.", "A deliberate change in the ownership, distribution or conditions of use of agricultural land.");
  b.card("CONCEPT", "Name the three criteria for assessing land reform.", "Efficiency, equity and output.");
  b.card("CONCEPT", "Why is the treatment of wages and land policy in an essay balanced?", "Attribute arguments to groups (supporters, critics), use economic criteria and justify the judgement.");
});
