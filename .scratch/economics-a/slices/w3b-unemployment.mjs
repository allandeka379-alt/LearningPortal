// W3b: unemployment: measurement, types, causes and consequences (both boards).
import { concept, P, chk, table, fmt, unemploymentRate, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.unemployment", { file: "macro/unemployment", keyPrefix: "macro.unemployment" }, (b) => {
  mc(b, [1, "RECALL"], "The unemployment rate is calculated as the number unemployed as a percentage of",
    ["the labour force", "Correct: employed plus unemployed."],
    [["the total population", "The population includes children and people not seeking work."],
     ["the number of people in employment", "The base is the labour force, not the employed."],
     ["the number of people of working age", "That is the base of the participation rate."]],
    "Unemployment rate = unemployed ÷ labour force × 100.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following would be counted as unemployed under the standard definition?",
    ["A graduate who has no job, is available for work and is applying for vacancies", "Correct: without work, available and seeking work."],
    [["A full-time student who is not looking for a job at present", "Not seeking work: economically inactive."],
     ["A retired teacher who does not want to return to work at all", "Not available for work: economically inactive."],
     ["A person who gave up looking for work a year ago and no longer applies", "A discouraged worker is not counted as seeking work."]],
    "Unemployed people are without work, available and actively seeking work.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A builder is laid off because a recession has reduced demand for new houses. This is an example of",
    ["cyclical unemployment", "Correct: unemployment due to low aggregate demand."],
    [["frictional unemployment, because the builder is between jobs", "Frictional unemployment arises from job search, not a demand slump."],
     ["seasonal unemployment, because building slows in some months", "The cause is a recession, not the season."],
     ["structural unemployment, because the builder's skills are obsolete", "The skills are not obsolete; demand has fallen."]],
    "Cyclical or demand-deficient unemployment follows a fall in aggregate demand.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A school-leaver spends three months searching for the first job. This is mainly",
    ["frictional unemployment", "Correct: short-term unemployment while searching."],
    [["structural unemployment caused by a lasting decline in an industry", "There is no decline in an industry."],
     ["cyclical unemployment caused by a severe fall in demand", "No evidence of a recession is given."],
     ["technological unemployment caused by machines replacing workers", "Machines are not mentioned."]],
    "Frictional unemployment arises from the time taken to find and match to jobs.");

  mc(b, [3, "APPLICATION"], "The labour force of a fictional economy is 8.0 million and 7.2 million people are employed. The unemployment rate is",
    ["10%", "Correct: 0.8 ÷ 8.0 × 100."],
    [["8%", "That divides the unemployed by 10 rather than by the labour force."],
     ["11.1%", "That divides the unemployed by the number employed."],
     ["0.8%", "That is the number unemployed in millions."]],
    "Unemployed = 8.0 − 7.2 = 0.8 million, so the rate is 0.8 ÷ 8.0 × 100 = 10%.", { calculator: true, hints: ["Find the number unemployed first, then divide by the labour force."] });

  mc(b, [3, "ANALYSIS"], "Some unemployed people become discouraged and stop looking for work, and no new jobs are created. The measured unemployment rate will",
    ["fall, because they leave the labour force", "Correct: the numerator and denominator both fall, and the rate falls."],
    [["rise, because there are fewer people in work", "The number in work has not changed."],
     ["stay the same, because the number employed has not changed", "The unemployed and the labour force both fall."],
     ["rise, because the labour force has risen at the same time", "The labour force falls."]],
    "Discouraged workers are not counted as unemployed, so the measured rate falls.", { hints: ["Do discouraged workers count in the labour force?"] });

  mc(b, [3, "ANALYSIS"], "Textile factories in a town close because the industry has moved to another region, and the skills of the laid-off workers are not needed in the town's other industries. This is mainly",
    ["structural unemployment", "Correct: a mismatch of skills and jobs after a change in the structure of the economy."],
    [["frictional unemployment", "It is not short-term job search."],
     ["seasonal unemployment", "It is not related to the season."],
     ["cyclical unemployment", "It is caused by an industry's relocation, not a fall in total demand."]],
    "Structural unemployment follows the decline of an industry and lasts until workers retrain or move.", { hints: ["Is demand low in general, or has the industry changed?"] });

  mc(b, [4, "EVALUATION"], "Why might a low measured unemployment rate in a developing economy with a large informal sector be misleading?",
    ["Many people in the informal sector have low and unstable incomes but are counted as employed", "Correct: underemployment and poverty are hidden."],
    [["Informal workers are always counted as unemployed in every survey", "They are counted as employed if they work."],
     ["The labour force survey only counts people who receive unemployment benefit", "Surveys ask about work, availability and search."],
     ["Unemployment is always lower in countries which have large informal sectors", "That is not true as a general rule."]],
    "Underemployment and low-paid informal work are counted as employment.", { hints: ["What does 'employed' include in the survey?"] });

  {
    const ur = unemploymentRate({ employed: 7400, unemployed: 600 }); chk(ur, 7.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: ur, dp: 1, unit: "%",
      stem: "In a fictional economy 7,400 thousand people are employed and 600 thousand are unemployed. Calculate the unemployment rate, to one decimal place.",
      wrong: [8.1, 7.4, 92.5], explanation: "Labour force = 7,400 + 600 = 8,000. Rate = 600 ÷ 8,000 × 100 = 7.5%. Dividing by the number employed gives 8.1%." });
    const pr = (8000 / 10500) * 100; chk(roundTo(pr, 1), 76.2, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pr, dp: 1, unit: "%", hints: ["Participation rate = labour force ÷ working-age population."],
      stem: "The labour force is 8,000 thousand and the working-age population is 10,500 thousand. Calculate the participation rate, to one decimal place.",
      wrong: [23.8, 80, 131.3], explanation: "Participation rate = 8,000 ÷ 10,500 × 100 = 76.2%." });
    const dr = unemploymentRate({ unemployed: 500, labourForce: 7900 }); chk(roundTo(dr, 1), 6.3, 1e-9);
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "pct", value: dr, dp: 1, unit: "%", hints: ["Remove the discouraged workers from both the unemployed and the labour force."],
      stem: "In a fictional economy the labour force is 8,000 thousand and 600 thousand are unemployed (7.5%). Then 100 thousand unemployed people give up looking for work and leave the labour force, and no jobs are created. Calculate the new unemployment rate, to one decimal place.",
      wrong: [7.5, 7.6, 5.0], explanation: "1. Unemployed = 600 − 100 = 500 thousand.\n2. Labour force = 8,000 − 100 = 7,900 thousand.\n3. Rate = 500 ÷ 7,900 × 100 = 6.3%. The rate falls although no job has been created." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A full-time student who is not looking for a job is counted as unemployed.", answer: false,
    explanation: "False. A student who is not seeking work is economically inactive, not unemployed." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation with the type of unemployment.",
    pairs: [["A farm worker is idle between harvest and planting", "Seasonal"], ["A clerk is replaced by an automated system", "Technological"], ["Firms dismiss workers because aggregate demand falls", "Cyclical (demand-deficient)"], ["A worker moves between jobs and spends a month searching", "Frictional"]],
    explanation: "Match by the cause: season, machines, low demand, job search." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The labour force is the number employed plus the number {{blank:a}}. Unemployment that arises because workers' skills do not match the jobs available is called {{blank:b}} unemployment.",
    blanks: [{ id: "a", accepted: ["unemployed"], choices: ["unemployed", "retired"] }, { id: "b", accepted: ["structural"], choices: ["structural", "frictional"] }],
    explanation: "Labour force = employed + unemployed; a mismatch of skills causes structural unemployment." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes people who have stopped looking for work because they believe that no jobs are available?",
    accepted: ["discouraged workers", "discouraged worker", "hidden unemployed", "hidden unemployment"], wrong: ["frictional unemployed"],
    explanation: "Discouraged workers leave the labour force and are not counted as unemployed." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define unemployment.",
    points: ["People who are without work and available to start work.", "And actively seeking work (at the going wage)."],
    modelAnswer: "Unemployment is the state of being without work while being available to start work and actively seeking it at the going wage.",
    explanation: "One mark for without work and available, one for seeking work." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give two reasons, each with an explanation."],
    stem: "Explain two reasons why official unemployment figures may understate the extent of the problem.",
    points: ["Discouraged workers who have stopped searching are not counted as unemployed.", "So the labour force and unemployment appear smaller and the rate lower.", "Underemployed people (part-time workers who want full-time work) are counted as employed.", "So the lack of full employment of labour is hidden."],
    modelAnswer: "Discouraged workers who have given up looking for jobs are not counted as unemployed, so the number of unemployed and the rate are lower than the true need for work. People who work part-time but want full-time work, or who work in low-paid informal work, are counted as employed, so under-use of labour is hidden.",
    explanation: "Two reasons, each with a mark for the reason and one for the effect on the figures." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Costs to the unemployed, the government and the economy."],
    stem: "Analyse the economic consequences of high unemployment for a country.",
    points: ["Lost output: resources are not used, so actual output is below potential.", "Lower incomes for the unemployed, so lower consumption and aggregate demand.", "Lower tax revenue (income tax and VAT).", "Higher government spending on benefits or social support.", "Poverty and inequality, and possible loss of skills for the long-term unemployed."],
    modelAnswer: "High unemployment wastes resources, so actual output is below potential output. The unemployed have lower incomes, so consumption and aggregate demand fall. The government loses tax revenue and may spend more on benefits or social support. Poverty and inequality may increase, and long-term unemployment can reduce workers' skills, lowering the productive capacity of the economy.",
    explanation: "Lost output, demand, government budget, and social and long-term effects." });

  {
    const t = [{ e: 5040, u: 560, i: 2400 }, { e: 5200, u: 520, i: 2480 }];
    const lf = t.map((x) => x.e + x.u); chk(lf[1], 5720);
    const ur = unemploymentRate({ employed: t[1].e, unemployed: t[1].u }); chk(roundTo(ur, 1), 9.1, 1e-9);
    const wa = t[1].e + t[1].u + t[1].i; chk(wa, 8200);
    const pr = (lf[1] / wa) * 100; chk(roundTo(pr, 1), 69.8, 1e-9);
    const t1 = table(["Group (thousand)", "Year 1", "Year 2"], [["Employed", 5040, 5200], ["Unemployed", 560, 520], ["Economically inactive", 2400, 2480]], { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Labour force = employed + unemployed.", "Participation rate uses the working-age population = labour force + inactive."],
      stem: `**Labour market data for Country Mbira (fictional, illustrative)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: lf[1], unit: "people", stem: "Calculate the labour force in year 2, in thousand.", wrong: [5200, 8200, 6240], explanation: "Labour force = 5,200 + 520 = 5,720 thousand." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: ur, dp: 1, unit: "%", stem: "Calculate the unemployment rate in year 2, to one decimal place.", wrong: [10, 8.9, 7.1], explanation: "Rate = 520 ÷ 5,720 × 100 = 9.1%." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pr, dp: 1, unit: "%", stem: "Calculate the participation rate in year 2, to one decimal place.", wrong: [63.4, 9.1, 30.2], explanation: "Working-age population = 5,720 + 2,480 = 8,200. Participation rate = 5,720 ÷ 8,200 × 100 = 69.8%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the fall in the unemployment rate between year 1 and year 2 does not necessarily mean that the economy created many new jobs.",
          points: ["Unemployment fell from 560 to 520 thousand partly because some unemployed may have left the labour force (discouraged workers).", "The inactive group rose from 2,400 to 2,480 thousand.", "Employment rose by 160 thousand only while the working-age population rose by 200 thousand, so the rate may reflect people leaving the labour force."],
          modelAnswer: "The number of unemployed fell, but the economically inactive group grew from 2,400 to 2,480 thousand, so some of the unemployed may have given up searching and left the labour force. Employment rose by 160 thousand while the working-age population rose by 200 thousand, so the improvement in the rate may reflect people leaving the labour force rather than new jobs alone." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two costs of unemployment to the government.",
          points: ["Lower tax revenue from income tax and spending.", "Higher spending on benefits or social support."],
          modelAnswer: "Lower tax revenue from income and spending, and higher spending on benefits or social support." }),
      ],
      explanation: "Labour force 5,720; rate 9.1%; participation 69.8%; falling unemployment can reflect people leaving the labour force." });
  }
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["In (c) cover individuals, the government and the economy, then reach a judgement."],
    stem: "**Unemployment in Dambo Town (fictional)**\n\nIn Dambo Town many young people leave school each year and spend several months searching for work. A textile mill that employed 900 people has closed because cheaper imports have taken its customers, and the mill's workers, most of whom are over 40, have been unable to find work using their skills. Meanwhile many people earn a living by selling vegetables and airtime at the roadside, and a survey counts them as employed even though most earn very little. Hotels in the nearby tourist area dismiss staff each year in the quiet season.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify the types of unemployment shown by the school-leavers, the mill workers and the hotel staff.",
        points: ["School-leavers: frictional.", "Mill workers: structural.", "Hotel staff: seasonal."],
        modelAnswer: "The school-leavers are frictionally unemployed, the mill workers are structurally unemployed, and the hotel staff are seasonally unemployed." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the unemployment of the mill workers may last a long time.",
        points: ["Their skills are specific to textiles and are not needed by other industries in the town.", "Retraining takes time and money, and older workers may find it harder.", "They may be unable to move to other places where jobs exist (geographical immobility)."],
        modelAnswer: "The mill workers' skills are specific to textile production and are not wanted by other firms in the town. Retraining takes time and money and older workers may find it harder, and they may be unable to move to other regions, so structural unemployment can be long-lasting." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess the consequences of unemployment for Dambo Town.",
        points: ["Individuals: loss of income and poverty, loss of skills, stress.", "Lower spending reduces demand for local shops and services, a multiplier effect on local incomes.", "Lower tax revenue and pressure on council or government support.", "Wasted resources: output is lost.", "The informal work reduces the hardship but is low paid, so underemployment remains.", "Judgement: serious for the mill workers and youth; the extent depends on how long it lasts and on the support available."],
        modelAnswer: "For the mill workers and the school-leavers unemployment means a loss of income and skills, and stress. Their lower spending reduces the incomes of local traders and shops, so the effect spreads through the town, and the government collects less tax. Resources including labour are wasted. Informal work, such as vegetable and airtime selling, reduces hardship but it pays little and many are underemployed. Overall the consequences are serious for the groups affected, especially if unemployment lasts, but their size depends on the support available and on how quickly new jobs are created." }),
    ],
    explanation: "Frictional, structural and seasonal; structural unemployment lasts because skills are specific; consequences for individuals, the local economy and the budget." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the types, then say which is the most serious."],
    stem: "Discuss whether structural unemployment is a more serious problem than cyclical unemployment.",
    points: ["Structural unemployment is long-lasting; workers lose skills and may never return to work.", "It is concentrated in particular regions and industries, causing local poverty.", "Cyclical unemployment is widespread but usually temporary and reverses in recovery.", "Cyclical unemployment can be reduced by raising aggregate demand; structural needs supply-side policy (retraining, mobility).", "Prolonged cyclical unemployment can become structural (loss of skills).", "Severity depends on the scale and duration.", ["A justified judgement.", 2]],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Structural unemployment is usually more serious because it lasts longer. Workers whose industry has declined lose skills and confidence and may never return to work, and the unemployment is concentrated in particular regions, which causes local poverty. Cyclical unemployment affects many workers at once but is usually temporary, and it falls as the economy recovers. It can be reduced by raising aggregate demand, whereas structural unemployment needs supply-side policies such as retraining and help with moving, which are slower and cost more. However, a long recession can turn cyclical unemployment into structural unemployment as skills decay, and a deep slump may affect more people than a structural change in one industry. Overall, structural unemployment is more serious per person because it lasts longer, but the scale of a severe cyclical downturn can make it equally damaging.",
    explanation: "Duration, concentration and policy remedies for the two types, with a judgement." });

  b.card("DEFINITION", "Define **unemployment**.", "Being without work, available to start work and actively seeking it at the going wage rate.");
  b.card("FORMULA", "How is the **unemployment rate** calculated?", "Unemployed ÷ labour force × 100, where the labour force is employed plus unemployed.");
  b.card("FORMULA", "How is the **participation rate** calculated?", "Labour force ÷ working-age population × 100.");
  b.card("DEFINITION", "What is **frictional unemployment**?", "Short-term unemployment while people are between jobs or searching for their first job.");
  b.card("DEFINITION", "What is **structural unemployment**?", "Unemployment caused by a mismatch of skills or location after the structure of the economy changes; it is long-lasting.");
  b.card("DEFINITION", "What is **cyclical unemployment**?", "Unemployment caused by low aggregate demand in a slowdown or recession (demand-deficient).");
  b.card("CONCEPT", "Name two reasons why official unemployment figures can be misleading.", "Discouraged workers and underemployment (and the informal sector) are not counted as unemployed.");
  b.card("CONCEPT", "How does unemployment affect the government budget?", "Lower tax revenue and higher spending on benefits or social support.");
  b.card("CONCEPT", "What is seasonal unemployment?", "Unemployment caused by regular seasonal falls in demand for labour, for example in farming or tourism.");
});
