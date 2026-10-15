// W3b: equilibrium and disequilibrium unemployment, the natural rate, mobility and policies (Cambridge A Level only).
import { concept, P, chk, table, schedule, labourMarket, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.unemployment-natural-rate", { file: "macro/unemployment-natural-rate", keyPrefix: "macro.unemployment-natural-rate" }, (b) => {
  mc(b, [1, "RECALL"], "The natural rate of unemployment is best described as the rate of unemployment",
    ["when the labour market is in equilibrium, with no cyclical unemployment", "Correct: only equilibrium unemployment remains."],
    [["when every person of working age has a job in the formal sector", "That would be zero unemployment, which is not the natural rate."],
     ["when the number of vacancies is less than the number of jobseekers", "That describes excess supply of labour."],
     ["which is reached only at the peak of a boom in demand", "At a peak, unemployment may be below the natural rate."]],
    "The natural rate is the rate when the labour market is in equilibrium and inflation is stable.");

  mc(b, [2, "UNDERSTANDING"], "Full employment means that",
    ["there is no cyclical unemployment, though some other unemployment remains", "Correct: it does not mean zero unemployment."],
    [["the measured unemployment rate is exactly 0% at every single point in the trade cycle", "Some unemployment always remains."],
     ["every person in the labour force works more than 40 hours in every week", "Hours of work are not the test."],
     ["all workers receive exactly the same wage whichever job they do in the economy", "Wages differ even at full employment."]],
    "Full employment is reached when the only unemployment is equilibrium unemployment.");

  mc(b, [2, "UNDERSTANDING"], "A worker is willing and able to work at the going wage but cannot find a job. This worker is",
    ["involuntarily unemployed", "Correct: willing and able to work at the going wage."],
    [["voluntarily unemployed, because the worker is not currently employed", "A voluntary decision means refusing work at the going wage."],
     ["economically inactive, because the worker has no job at present", "The worker is seeking work, so is in the labour force."],
     ["underemployed, because the worker is working part-time hours", "The worker has no job."]],
    "Involuntary unemployment is where people are willing to work at the going wage but cannot find jobs.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Hysteresis in the labour market refers to the idea that",
    ["the natural rate rises after a long period of high actual unemployment", "Correct: unemployment today affects the equilibrium rate later."],
    [["unemployment always returns to the same rate after a recession", "Hysteresis says that it may not."],
     ["the unemployed are always unwilling to accept the wages offered", "That describes voluntary unemployment."],
     ["unemployment can be reduced to zero by raising aggregate demand enough", "Hysteresis suggests that this may not be so."]],
    "Long-term unemployment erodes skills and contacts, so the natural rate rises.", { daily: true });

  {
    const lm = labourMarket({ m: 30, n: 0.02, s: 6, k: 0.02, minimumWage: 21 });
    chk(lm.competitive.wage, 18); chk(lm.competitive.employment, 600); chk(lm.minimumWage.unemployed, 300);
    mc(b, [3, "ANALYSIS"], "In a labour market the equilibrium wage is US\\$18 an hour with 600 workers. A minimum wage of US\\$21 is introduced. At US\\$21, 450 workers are demanded and 750 supplied. The result is",
      ["300 workers who are involuntarily unemployed", "Correct: 750 − 450 = 300, an excess supply of labour."],
      [["150 workers who are voluntarily unemployed", "The difference between 600 and 450 is employment lost, not unemployment."],
       ["a shortage of 300 workers, so vacancies rise throughout the market", "A wage above equilibrium causes excess supply."],
       ["no unemployment, because the wage has risen above the equilibrium", "Quantity supplied exceeds quantity demanded."]],
      "Excess supply = 750 − 450 = 300 workers, who would work at the going wage but cannot find jobs.", { hints: ["Compare the quantity supplied with the quantity demanded at the new wage."] });
  }

  mc(b, [3, "ANALYSIS"], "Unemployment in a region is caused by the closure of a mine, and the miners' skills are not needed by other firms. Which policy is most suitable?",
    ["Retraining programmes and help for workers to move to other areas", "Correct: it addresses the mismatch of skills and location."],
    [["A cut in interest rates to raise consumer spending nationally", "Demand-side policy does not solve a skills mismatch."],
     ["A rise in the minimum wage to increase miners' incomes in the region", "A higher wage floor can make unemployment worse."],
     ["An increase in the exchange rate to lower the price of imports", "It does not create jobs for miners."]],
    "Structural unemployment needs supply-side policies such as training and mobility.", { hints: ["Is the problem a lack of demand, or a mismatch?"] });

  mc(b, [3, "ANALYSIS"], "An economy is operating at the natural rate of unemployment, and the government expands aggregate demand further. The most likely result is",
    ["higher inflation with little further fall in unemployment", "Correct: no cyclical unemployment remains to be removed."],
    [["a large fall in unemployment with no change in the price level", "Unemployment cannot fall far below the natural rate."],
     ["a rise in the natural rate caused directly by the extra spending", "Demand does not change the natural rate directly."],
     ["a fall in wages as more workers move to take new jobs", "Tight labour markets tend to raise wages."]],
    "At the natural rate, extra demand mainly raises prices.", { hints: ["How much cyclical unemployment is left to remove?"] });

  mc(b, [3, "UNDERSTANDING"], "Which change would most likely reduce the natural rate of unemployment?",
    ["Better information about vacancies and improved training for the unemployed", "Correct: it reduces frictional and structural unemployment."],
    [["A long recession that leaves many workers out of work for years", "Hysteresis may raise the natural rate."],
     ["A rise in the minimum wage to a level far above the equilibrium wage", "That would raise unemployment."],
     ["Benefits that continue indefinitely without any search requirement", "That could lengthen job search."]],
    "Better matching and skills reduce equilibrium unemployment.", { hints: ["Which option improves matching or skills?"] });

  mc(b, [4, "EVALUATION"], "A government cuts unemployment benefits and finds that unemployment falls but poverty among the unemployed rises. This best illustrates",
    ["a trade-off between the efficiency of the labour market and equity", "Correct: a gain in one aim at a cost to another."],
    [["a fall in the natural rate that has no cost to anyone", "Poverty has risen, so there is a cost."],
     ["the failure of supply-side policy to affect the search behaviour of workers", "Unemployment fell, so behaviour changed."],
     ["a rise in cyclical unemployment caused by lower demand", "The policy is aimed at supply-side incentives."]],
    "Reducing benefits may increase the incentive to work but raises hardship.", { hints: ["Which objectives gain and which lose?"] });

  {
    const lf = 15000, ra = 7.4, rn = 5.0;
    const act = (ra / 100) * lf, nat = (rn / 100) * lf; chk(act, 1110, 1e-6); chk(nat, 750, 1e-6);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: act - nat, unit: "workers", dp: 0, tol: 0.5,
      stem: "A fictional economy has a labour force of 15,000 thousand, an unemployment rate of 7.4% and a natural rate of 5.0%. Calculate the number of workers in cyclical (disequilibrium) unemployment, in thousand.",
      wrong: [750, 1110, 2.4], explanation: "Actual unemployment = 7.4% × 15,000 = 1,110 thousand. Natural unemployment = 5.0% × 15,000 = 750 thousand. Cyclical unemployment = 1,110 − 750 = 360 thousand." });
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 6.9 - 4.6, unit: "percentage points", dp: 1,
      stem: "The actual unemployment rate is 6.9% and the natural rate is 4.6%. By how many percentage points does actual unemployment exceed the natural rate? Give the answer to one decimal place.",
      wrong: [2.0, 2.5, 11.5], explanation: "Difference = 6.9 − 4.6 = 2.3 percentage points." });
    const lm = labourMarket({ m: 30, n: 0.02, s: 6, k: 0.02, minimumWage: 24 }); chk(lm.minimumWage.unemployed, 600);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: lm.minimumWage.unemployed, unit: "workers", hints: ["Demand: W = 30 − 0.02L, supply: W = 6 + 0.02L."],
      stem: "In a labour market the demand for labour is W = 30 − 0.02L and the supply is W = 6 + 0.02L, where W is the hourly wage in US\\$ and L is the number of workers. A minimum wage of US\\$24 is set. Calculate the number of workers who are unemployed at this wage.",
      wrong: [300, 900, 150], explanation: "1. Demand at W = 24: L = (30 − 24) ÷ 0.02 = 300.\n2. Supply at W = 24: L = (24 − 6) ÷ 0.02 = 900.\n3. Unemployment = 900 − 300 = 600 workers." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Full employment is achieved only when the unemployment rate is zero.", answer: false,
    explanation: "False. Frictional and structural (equilibrium) unemployment remain at full employment." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Hysteresis", "The natural rate rises after a long period of high unemployment"], ["Geographical immobility", "Workers cannot move to areas where jobs exist"], ["Occupational immobility", "Workers lack the skills to move between types of job"], ["NAIRU", "The unemployment rate at which inflation does not accelerate"]],
    explanation: "Match each term with its definition." });

  b.short({ d: 2, skill: "RECALL", stem: "What does NAIRU stand for? Give the full term.",
    accepted: ["non-accelerating inflation rate of unemployment", "non accelerating inflation rate of unemployment", "the non-accelerating inflation rate of unemployment"], wrong: ["natural rate of unemployment"],
    explanation: "NAIRU is the non-accelerating inflation rate of unemployment, equal to the natural rate." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between voluntary and involuntary unemployment.",
    points: ["Voluntary: people who choose not to work at the going wage (or are searching for a better job).", "Involuntary: people who are willing and able to work at the going wage but cannot find a job."],
    modelAnswer: "Voluntary unemployment is where people choose not to accept jobs at the going wage, while involuntary unemployment is where people are willing and able to work at the going wage but cannot find jobs.",
    explanation: "One mark for each type." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of barriers to geographical and occupational mobility."],
    stem: "Explain two reasons why unemployed workers may be unable to take jobs that exist in other areas or industries.",
    points: ["Geographical immobility: housing costs or family ties prevent moving.", "So workers cannot take vacancies in other regions.", "Occupational immobility: workers lack the skills for the vacancies.", "Retraining takes time and money, so the mismatch persists."],
    modelAnswer: "Workers may be geographically immobile because housing is costly in the areas with vacancies or because of family ties, so they cannot take jobs elsewhere. They may also be occupationally immobile because their skills do not match the jobs available, and retraining takes time and money, so the mismatch continues.",
    explanation: "Two barriers, each developed." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Start with the effect of long unemployment on skills."],
    stem: "Analyse how hysteresis could raise the natural rate of unemployment after a recession.",
    points: ["A recession raises actual unemployment and many are unemployed for a long time.", "Workers lose skills and work habits.", "Employers regard long-term unemployed people as less employable.", "Some become discouraged and search less actively.", "So after the recovery more unemployment remains: a higher natural rate."],
    modelAnswer: "A deep recession leaves many workers out of work for a long time. They lose skills and work habits, employers see them as less employable and some become discouraged and search less. When demand recovers, the labour market matches workers to jobs less effectively, so more unemployment remains at stable inflation: the natural rate has risen.",
    explanation: "The chain from long unemployment to a higher natural rate." });

  {
    const wages = [9, 11, 13, 15, 17], qd = [980, 900, 820, 740, 660], qs = [660, 900, 1140, 1380, 1620];
    const s = schedule({ prices: wages, qd, qs, priceHeader: "Hourly wage (US\\$)", qdHeader: "Workers demanded", qsHeader: "Workers supplied", requireEquilibrium: true });
    chk(s.equilibrium.price, 11); chk(s.equilibrium.quantity, 900);
    const un = qs[3] - qd[3]; chk(un, 640);
    const fall = ((qd[3] - 900) / 900) * 100; chk(roundTo(fall, 1), -17.8, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Compare the quantities demanded and supplied at US\\$15.", "Employment is the quantity demanded at the new wage."],
      stem: `**A labour market in Country Zandia (fictional, illustrative data)**\n\n${s.md}\n\nA union agreement sets the wage at US\\$15 an hour.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: 11, stem: "State the equilibrium wage, in US\\$ an hour.", wrong: [9, 13, 15], explanation: "Demand equals supply (900) at US\\$11." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: un, unit: "workers", stem: "Calculate the number of workers who are unemployed at US\\$15.", wrong: [160, 740, 1380], explanation: "At US\\$15, 1,380 are supplied and 740 demanded: unemployment = 1,380 − 740 = 640." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: fall, dp: 1, unit: "%", stem: "Calculate the percentage change in employment compared with the equilibrium, to one decimal place (a fall is a negative number).", wrong: [17.8, -19.4, -35.6], explanation: "Employment falls from 900 to 740: (740 − 900) ÷ 900 × 100 = −17.8%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why this unemployment is disequilibrium unemployment.",
          points: ["The wage (US\\$15) is above the equilibrium wage (US\\$11).", "The quantity of labour supplied (1,380) exceeds the quantity demanded (740).", "The market does not clear, so the unemployed are involuntarily unemployed; this is not equilibrium (natural) unemployment."],
          modelAnswer: "The wage of US\\$15 is above the equilibrium wage of US\\$11, so 1,380 workers want to work but firms demand only 740. The labour market does not clear, and the 640 unemployed are willing to work at the going wage, so this is disequilibrium unemployment and not equilibrium unemployment." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two policies which could reduce structural unemployment.",
          points: ["Education and training or retraining programmes.", "Help with moving (mobility), regional policy or better job information."],
          modelAnswer: "Retraining programmes and help for workers to move to areas where there are jobs." }),
      ],
      explanation: "Equilibrium wage 11; unemployment 640 at 15; employment −17.8%; wage above equilibrium causes disequilibrium unemployment." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) match the policy to the type of unemployment."],
    stem: "**After a long slump in Mbira (fictional)**\n\nMbira suffered a deep recession lasting four years, during which the unemployment rate rose from 5% to 14%. Output has now recovered to its earlier level, but the unemployment rate has fallen only to 9%, and inflation has begun to rise. Many of the unemployed have been out of work for over two years. Firms report vacancies for skilled technicians, but the jobless are mostly unskilled or live in towns far from the new factories, where housing costs are high. The government is considering either a large rise in public spending or a programme of training and housing support.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why unemployment is still 9% although output has recovered.",
        points: ["Long-term unemployment has reduced skills and employability (hysteresis).", "The natural rate has risen above its earlier level (5%).", "Vacancies need skills that the jobless do not have, and they live far from the jobs (structural mismatch)."],
        modelAnswer: "Many of the unemployed have been out of work for over two years, so their skills have decayed and employers see them as less employable, which means the natural rate has risen above 5%. Vacancies are for skilled technicians, but the jobless are mostly unskilled and live far from the new factories, so there is a structural mismatch." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why inflation has begun to rise while unemployment is still 9%.",
        points: ["The economy may be close to the natural rate, which is higher than before.", "Firms face skill shortages, so wages in the skilled jobs rise.", "Extra demand then raises prices instead of creating jobs."],
        modelAnswer: "The natural rate has probably risen, so 9% may be close to the rate at which inflation is stable. Firms compete for the few skilled workers, which raises wages in those jobs, and extra demand raises prices rather than creating jobs for the unskilled unemployed." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether the government should raise public spending or provide training and housing support.",
        points: ["Public spending raises aggregate demand and could create jobs quickly, but little cyclical unemployment remains, so it risks inflation.", "Spending adds to the budget deficit and debt.", "Training addresses the skills mismatch and raises productivity.", "Housing support raises geographical mobility.", "Both are slow and costly and may not match the jobs wanted.", "Judgement: supply-side programme is more suitable because the unemployment is mainly structural; some demand support might be used if it is targeted."],
        modelAnswer: "Because output has recovered and inflation is rising, most of the remaining unemployment is probably structural or due to hysteresis, so extra public spending would mainly raise prices and the deficit rather than create jobs for the unskilled. Training would give the jobless the skills the firms want, raising their employment and productivity, and housing support would help people to move to the new factories. These measures are slow and expensive, and they might not match the jobs that are available. On balance the training and housing programme is more suitable, perhaps with a little targeted spending to support it." }),
    ],
    explanation: "Hysteresis and mismatch raise the natural rate; extra demand would raise inflation; supply-side policies address the cause." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Match policy to the type of unemployment."],
    stem: "Assess whether supply-side policies are more effective than demand-side policies in reducing unemployment.",
    points: ["Demand-side policies reduce cyclical unemployment quickly by raising aggregate demand.", "They are ineffective when unemployment is structural and risk inflation at the natural rate.", "Supply-side policies (training, mobility, flexibility) reduce the natural rate.", "They work slowly and cost money; results are uncertain.", "Reforms to benefits and wages may harm equity.", "The right policy depends on the type of unemployment.", "Policies may be combined.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Demand-side policies, such as lower interest rates or higher government spending, raise aggregate demand and can reduce cyclical unemployment quickly. But when unemployment is structural, or the economy is already at the natural rate, they mainly raise inflation. Supply-side policies such as training, help with moving and better job information reduce the natural rate by improving the skills and matching of workers, but they take time and cost money, and reforms of benefits or wages can harm fairness. The better policy therefore depends on the type of unemployment: demand-side policies for a slump, and supply-side policies for persistent mismatch. In most cases a combination is needed, with supply-side policy more important in the long run.",
    explanation: "Weigh speed and scope of demand-side policy against the long-run effect and cost of supply-side policy." });

  b.card("DEFINITION", "Define the **natural rate of unemployment**.", "The rate when the labour market is in equilibrium (no cyclical unemployment); also the rate at which inflation is stable (NAIRU).");
  b.card("DEFINITION", "What is **full employment**?", "No disequilibrium (cyclical) unemployment; frictional and structural unemployment remain.");
  b.card("CONCEPT", "What is the difference between equilibrium and disequilibrium unemployment?", "Equilibrium: frictional, structural and voluntary unemployment when the market clears. Disequilibrium: excess supply of labour from a wage above equilibrium or low demand.");
  b.card("DEFINITION", "What is **hysteresis** in the labour market?", "The natural rate rises after a long period of high actual unemployment, because skills and contacts are lost.");
  b.card("CONCEPT", "Voluntary against involuntary unemployment.", "Voluntary: people choose not to work at the going wage. Involuntary: willing and able to work at the going wage but cannot find a job.");
  b.card("CONCEPT", "Name two barriers to geographical mobility of labour.", "Housing costs and family ties (also lack of information and the cost of moving).");
  b.card("CONCEPT", "Which policy suits cyclical unemployment?", "Demand-side policy: raise aggregate demand through lower interest rates, higher spending or lower taxes.");
  b.card("CONCEPT", "Which policies suit structural unemployment?", "Supply-side policies: training, retraining, mobility support, job information and regional policy.");
  b.card("CONCEPT", "What happens if demand is expanded when unemployment is at the natural rate?", "Inflation rises with little fall in unemployment.");
});
