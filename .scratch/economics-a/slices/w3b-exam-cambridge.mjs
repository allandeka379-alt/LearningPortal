// W3b: Cambridge exam-format items: Paper 2 Section A (AS data response, unemployment and inflation), one Paper 2 macroeconomics essay (8 + 12), one Paper 4 Section A data response (3 + 5 + 5 + 7, multiplier and gap) and one Paper 4 macroeconomics essay (20 marks).
import { concept, P, chk, table, fmt, unemploymentRate, keynes, roundTo, EXAM, checkExam, CAM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P2D = { skill: EXAM.CAM_P2_DATA.skill, secs: EXAM.CAM_P2_DATA.secs, applies: EXAM.CAM_P2_DATA.applies, examStyle: true, paper: "Paper 2" };
const P2E = { skill: EXAM.CAM_P2_ESSAY.skill, secs: EXAM.CAM_P2_ESSAY.secs, applies: EXAM.CAM_P2_ESSAY.applies, examStyle: true, paper: "Paper 2" };
const P4D = { skill: EXAM.CAM_P4_DATA.skill, secs: EXAM.CAM_P4_DATA.secs, applies: EXAM.CAM_P4_DATA.applies, examStyle: true, paper: "Paper 4" };
const P4E = { skill: EXAM.CAM_P4_ESSAY.skill, secs: EXAM.CAM_P4_ESSAY.secs, applies: EXAM.CAM_P4_ESSAY.applies, examStyle: true, paper: "Paper 4" };

const LV7 = [
  [3, 5, 7, "Developed, balanced analysis applied to the data, with a supported judgement."],
  [2, 3, 4, "Some analysis, limited use of the data or an unsupported judgement."],
  [1, 1, 2, "Simple, undeveloped statements."],
];
const LV12 = [
  [3, 9, 12, "Developed, balanced analysis applied to the question, with evaluation and a supported judgement."],
  [2, 5, 8, "Some analysis and application; evaluation limited or judgement not supported."],
  [1, 1, 4, "Simple, undeveloped points with little application."],
];
const LV20 = [
  [3, 14, 20, "Developed, two-sided analysis, well applied, with evaluation and a justified judgement that answers the question."],
  [2, 7, 13, "Some analysis and some application; evaluation limited or not supported; judgement partial."],
  [1, 1, 6, "Simple, undeveloped points; little analysis or evaluation."],
];

concept(A("macro.unemployment"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ Paper 2 Section A: unemployment and inflation in Zandia (AS concepts only)
  const growth = [4.0, 3.5, 1.0, -1.5, 0.5], infl = [3.0, 4.5, 7.5, 9.0, 5.5], un = [330, 355, 410, 505, 545], em = [3670, 3735, 3790, 3795, 3855];
  const ur5 = unemploymentRate({ unemployed: un[4], employed: em[4] }); chk(roundTo(ur5, 1), 12.4, 1e-9);
  const emp = ((em[4] - em[0]) / em[0]) * 100; chk(roundTo(emp, 1), 5.0, 1e-9);
  const t1 = table(["Year", "Real GDP growth (%)", "Inflation (%)", "Unemployed (thousand)", "Employed (thousand)"], growth.map((g, i) => [String(i + 1), fmt(g, 1), fmt(infl[i], 1), un[i], em[i]]), { align: ["l", "r", "r", "r", "r"] });

  b.struct({
    ...P2D, d: 4, calculator: true,
    concepts: [A("macro.unemployment"), A("macro.inflation"), A("policy.objectives")],
    hints: ["Unemployment rate = unemployed ÷ (employed + unemployed) × 100.", "In (e) give two separate causes and trace each to the price level.", "In (f) consider the cause of the inflation and the cost of higher interest rates."],
    stem: `**Prices and jobs in Zandia** (a fictional economy)\n\nZandia is a middle-income country with a growing urban population. Its main industries are textiles, mining and farming, and it imports most of its fuel. Table 1 shows economic data for five years.\n\n**Table 1: Economic data for Zandia (illustrative)**\n\n${t1}\n\nIn year 3 world oil prices rose and Zandia's currency lost value, which raised the cost of imported fuel and of the materials used by firms. At the same time the central bank had cut its interest rate to support growth, and wage settlements in the towns averaged more than 10%. In year 4 the textile company Zandia Cloth closed its three mills because cheaper imports had taken its customers, and 5,000 workers lost their jobs; most were over 40 and had spent their careers in textiles. Many school-leavers took months to find their first jobs.\n\nBy year 5 the central bank had raised its interest rate and inflation had fallen, but the government is worried about unemployment, which is highest among the young, and about inflation, which remains above its target range of 2% to 4%. Many people in Zandia earn a living in the informal sector, selling goods in the markets, and the official figures count them as employed.`,
    parts: checkExam(EXAM.CAM_P2_DATA, [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: ur5, dp: 1, unit: "%", stem: "Using Table 1, calculate the unemployment rate in year 5, to one decimal place.", wrong: [14.1, 12.0, 545], explanation: "Labour force = 3,855 + 545 = 4,400 thousand. Rate = 545 ÷ 4,400 × 100 = 12.4%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The closure of Zandia Cloth caused mainly",
        options: [["structural unemployment", "Correct: a mismatch of skills after an industry declines."], ["frictional unemployment", "It is not short-term job search."], ["seasonal unemployment", "It is not related to the season."], ["cyclical unemployment", "It was caused by import competition, not a fall in total demand."]], answer: "A",
        explanation: "The mill workers' skills are specific to a declining industry: structural unemployment." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: emp, dp: 1, unit: "%", stem: "Calculate the percentage change in the number of people employed between year 1 and year 5, to one decimal place.", wrong: [4.8, 185, 12.4], explanation: "Employment rose from 3,670 to 3,855 thousand: (3,855 − 3,670) ÷ 3,670 × 100 = 5.0%." }),
      P.fib({ label: "(d)", marks: 2, stem: "Complete the sentences using Table 1.", template: "In year 4 falling output, high inflation and rising unemployment occurred together, which is called {{blank:a}}. The fall in inflation from 9.0% to 5.5% in year 5 is an example of {{blank:b}}.",
        blanks: [{ id: "a", accepted: ["stagflation"], choices: ["stagflation", "deflation", "hyperinflation"] }, { id: "b", accepted: ["disinflation"], choices: ["disinflation", "deflation", "stagflation"] }],
        explanation: "Stagflation is stagnant or falling output with inflation and unemployment; a fall in the rate of inflation is disinflation." }),
      P.manual({ label: "(e)", marks: 6, stem: "Analyse two possible causes of the rise in the rate of inflation in year 3.",
        points: ["Cost-push: world oil prices rose and the currency fell, raising the price of imported fuel and materials.", "Higher costs shift short-run aggregate supply to the left.", "So firms raise prices and the price level rises.", "Demand-pull or wage push: the lower interest rate and wage settlements above 10% raised spending and costs.", "Higher demand (or higher unit labour costs) pushes up the price level.", "Wage rises may lead to further price rises: a wage–price spiral."],
        modelAnswer: "One cause was cost-push. World oil prices rose and Zandia's currency lost value, which raised the price of imported fuel and the materials that firms use. Higher costs shift short-run aggregate supply to the left, so firms raise their prices and the price level rises. A second cause was the rise in demand and wage costs: the central bank cut the interest rate, which encouraged borrowing and spending, so aggregate demand rose, and wage settlements of more than 10% raised firms' unit labour costs. Higher demand and higher costs both push up the price level, and the wage rises may have led to further price rises as workers tried to protect their real wages." }),
      P.manual({ label: "(f)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 300 }, levels: LV7,
        stem: "Assess whether a higher interest rate is the best way for the government of Zandia to bring inflation down to its target range.",
        points: ["A higher interest rate reduces borrowing, consumption and investment, so aggregate demand falls and inflation falls (it fell from 9.0% to 5.5%).", "It may attract capital and raise the currency, lowering import prices.", "Part of the inflation was cost-push from oil and the currency, which interest rates do not remove.", "Higher rates reduce output and raise unemployment, already 12.4% and rising, and reduce growth (0.5%).", "Structural unemployment among former textile workers is not helped by tighter policy.", "Time lags and the size of the effect are uncertain.", "Judgement: useful for demand-driven inflation but costly and not enough on its own; supply-side measures and exchange rate stability are needed."],
        modelAnswer: "A higher interest rate reduces borrowing, consumption and investment, so aggregate demand falls and inflation falls, as it did from 9.0% to 5.5% in year 5. It may also attract funds from abroad and raise the exchange rate, lowering import prices. However, part of the inflation was cost-push, caused by higher oil prices and the fall in the currency, and interest rates do not remove those costs. A higher rate also reduces output and raises unemployment, which was already 12.4% and rising, while growth was only 0.5%, and it does nothing for the structural unemployment of the former textile workers. The effects are uncertain and take time. Higher interest rates are therefore helpful in dealing with the demand-driven part of the inflation but they are costly and not sufficient on their own; measures to raise supply and keep the exchange rate stable would also be needed." }),
    ]),
    explanation: "Unemployment rate 12.4%; employment +5.0%; closure of mills is structural; stagflation and disinflation; causes of inflation; assess interest rates against cost-push and unemployment.",
  });

  // ------------------------------------------------------------------ Paper 2 Sections B/C: macroeconomics essay (inflation and objectives)
  b.struct({
    ...P2E, d: 5,
    concepts: [A("macro.inflation"), A("policy.objectives")],
    hints: ["In (a) show how each type of inflation affects AD or AS.", "In (b) weigh price stability against other objectives and say when it matters most."],
    stem: "Many governments try to keep inflation low.",
    parts: checkExam(EXAM.CAM_P2_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain how demand-pull inflation differs from cost-push inflation.",
        points: ["Inflation is a sustained rise in the general price level.", ["Demand-pull inflation is caused by a rise in aggregate demand faster than the economy's capacity: the AD curve shifts to the right and the price level rises.", 2], "Causes of higher AD: lower interest rates, tax cuts, government spending, export boom, rapid growth of money supply.", ["Cost-push inflation is caused by a rise in firms' costs: the short-run aggregate supply curve shifts to the left, raising the price level and lowering output.", 2], "Causes of higher costs: wages above productivity, raw material or fuel prices, a fall in the exchange rate, higher indirect taxes.", "In demand-pull, output and employment rise; in cost-push, output falls and unemployment may rise (stagflation)."],
        modelAnswer: "Inflation is a sustained rise in the general price level. Demand-pull inflation is caused by a rise in aggregate demand which is faster than the economy's capacity to produce, so the aggregate demand curve shifts to the right and the price level rises. Aggregate demand may increase because of lower interest rates, tax cuts, higher government spending, a boom in exports or a rapid growth in the money supply. Cost-push inflation is caused by a rise in firms' costs, which shifts the short-run aggregate supply curve to the left, raising the price level and reducing output. Costs may rise because of wages that increase faster than productivity, higher raw material or fuel prices, a fall in the exchange rate or higher indirect taxes. The two differ in their effects on output: with demand-pull inflation output and employment rise, whereas with cost-push inflation output falls and unemployment may rise, which is stagflation." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 250, max: 650 }, levels: LV12,
        stem: "Assess whether low inflation is the most important macroeconomic objective of a government.",
        points: [["Price stability protects savings and fixed incomes, reduces uncertainty and avoids menu and shoe-leather costs.", 3], "Stable prices support investment and growth and keep exports competitive; hyperinflation destroys the functions of money.", ["Low unemployment: lost output, poverty and loss of skills; may be considered more urgent in a slump.", 2], "Economic growth raises incomes and living standards.", "Balance of payments stability and equity are also objectives.", "Conflicts: reducing inflation may raise unemployment and slow growth in the short run.", "The importance of inflation depends on how high it is and how unstable: more important when it is high or accelerating.", ["Justified judgement, for example that low inflation is a necessary condition for lasting growth and employment but not the only objective.", 2]],
        modelAnswer: "Low inflation matters because rising prices reduce the real value of savings and fixed incomes, make planning more difficult and impose menu and shoe-leather costs. Stable prices also support investment and growth and keep exports competitive, and in extreme cases hyperinflation destroys the functions of money. However, other objectives are also important. Unemployment wastes output, causes poverty and erodes skills, and in a deep slump it may be more urgent than a small rise in prices. Economic growth raises living standards, and a sustainable balance of payments and a fair distribution of income also matter. The objectives can conflict: policies to cut inflation, such as higher interest rates, may raise unemployment and slow growth in the short run. How important inflation is depends on its level and stability: when it is high or accelerating it is likely to be the most urgent, but when it is low and stable other objectives deserve more weight. Overall low inflation is a necessary condition for lasting growth and employment, and so a very important objective, but not the only one and not always the most important." }),
    ]),
    explanation: "(a) demand-pull (AD right) against cost-push (SRAS left); (b) price stability benefits against unemployment, growth and other objectives, and the conflict between them.",
  });

  // ------------------------------------------------------------------ Paper 4 Section A: multiplier and deflationary gap in Zandia (A Level)
  const aut = 90 + 170 + 230 + 140; chk(aut, 630);
  const k = keynes.multiplier({ mpc: 0.85, mrt: 0.2, mpm: 0.18 }); chk(roundTo(k, 6), 2, 1e-9);
  const ye = keynes.equilibriumIncome({ autonomous: aut, mpc: 0.85, mrt: 0.2, mpm: 0.18 }); chk(roundTo(ye, 6), 1260, 1e-9);
  const gp = keynes.gap({ fullEmployment: 1390, equilibrium: ye, k }); chk(roundTo(gp.injectionChange, 6), 65, 1e-9);
  const mps = (1 - 0.2) * (1 - 0.85); chk(roundTo(mps, 6), 0.12, 1e-9);
  const t2 = table(["Component of aggregate demand", "Value or function (US\\$ million)"], [["Consumption C", "90 + 0.85Yd (Yd = disposable income)"], ["Income tax", "20% of national income Y"], ["Investment I", "170"], ["Government spending G", "230"], ["Exports X", "140"], ["Imports M", "0.18Y"], ["Full employment level of income", "1,390"]], { align: ["l", "l"] });

  b.struct({
    ...P4D, d: 5, calculator: true,
    concepts: [A("macro.multiplier"), A("macro.income-gaps"), A("macro.consumption-saving-investment")],
    hints: ["MPS as a fraction of national income = (1 − MPC) × (1 − marginal tax rate).", "Equilibrium income = autonomous spending × multiplier.", "The injection needed = income gap ÷ multiplier."],
    stem: `**A spending plan for Zandia** (a fictional economy)\n\nZandia is a small open economy with a large informal sector. After a fall in world demand for its exports, firms cut their investment and unemployment rose. The government wants to restore full employment by spending US\\$65 million more on roads and housing, financed by borrowing. Table 2 gives data for the economy.\n\n**Table 2: Zandia's economy (illustrative)**\n\n${t2}\n\nThe central bank warns that heavy government borrowing could raise interest rates and reduce private investment. Builders say that they import most of their cement-making equipment and machinery, and that there is a shortage of skilled construction workers. Economists in the finance ministry say that their estimate of the full employment level of income is uncertain because much of the economy is informal.`,
    parts: checkExam(EXAM.CAM_P4_DATA, [
      P.group({ label: "(a)", stem: "Use Table 2.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "elasticity", value: mps, dp: 2, stem: "Calculate the marginal propensity to save out of national income, to two decimal places.", wrong: [0.15, 0.85, 0.68], explanation: "Disposable income is 0.8 of each extra dollar of Y; saving is 0.15 of that: 0.15 × 0.8 = 0.12." }),
        P.num({ label: "(ii)", marks: 2, kind: "elasticity", value: k, dp: 2, stem: "Calculate the multiplier, to two decimal places.", wrong: [5.0, 2.08, 1.92], explanation: "Withdrawals: MPS 0.12 + MPT 0.20 + MPM 0.18 = 0.50, so k = 1 ÷ 0.50 = 2.00. (Check: 1 ÷ (1 − 0.85 × 0.8 + 0.18) = 2.)" }),
      ] }),
      P.group({ label: "(b)", stem: "Use Table 2 and your answer to (a).", parts: [
        P.num({ label: "(i)", marks: 3, kind: "plain", value: ye, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate equilibrium national income, in US\\$ million.", wrong: [630, 1400, 1700], explanation: "Autonomous spending = 90 + 170 + 230 + 140 = 630. Ye = 2 × 630 = US\\$1,260 million." }),
        P.num({ label: "(ii)", marks: 2, kind: "plain", value: gp.injectionChange, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the increase in injections needed to reach the full employment level of income, in US\\$ million.", wrong: [130, 260, 33], explanation: "Income gap = 1,390 − 1,260 = 130. Injection needed = 130 ÷ 2 = US\\$65 million." }),
      ] }),
      P.manual({ label: "(c)", marks: 5, stem: "Analyse how the planned rise in government spending could increase national income.",
        points: ["Government spending is an injection that raises aggregate demand.", "Firms and workers who supply the roads and housing receive extra income.", "They spend part of the extra income on home-produced goods (the rest is saved, taxed or spent on imports).", "This creates further income in successive rounds (the multiplier process).", "National income rises by a multiple of US\\$60 million (2 × 65 = 130), which closes the gap."],
        modelAnswer: "Government spending is an injection into the circular flow that raises aggregate demand. The firms and workers who build the roads and houses receive extra income, and they spend part of it on home-produced goods, while the rest leaks away through saving, taxes and imports. The spending creates income for others in successive rounds, which is the multiplier process. With a multiplier of 2, national income rises by 2 × US\\$65 million = US\\$130 million, which closes the gap to full employment." }),
      P.manual({ label: "(d)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 320 }, levels: LV7,
        stem: "Evaluate whether the government's plan is likely to achieve full employment in Zandia.",
        points: ["The calculation suggests that a rise in spending of US\\$65 million closes a gap of US\\$130 million in income.", "Imports of equipment mean that more of the spending leaks abroad, so the actual multiplier is lower than 2.", "Borrowing may raise interest rates and crowd out private investment.", "Shortages of skilled construction workers limit the supply response, so prices may rise instead of output.", "The full employment level of income and the propensities are uncertain (informal sector), so the injection may be too small or too large.", "Time lags and extra debt; unemployment may be partly structural.", "Judgement: a useful step but unlikely to reach full employment exactly; supply-side support (training) and monitoring are needed."],
        modelAnswer: "On the figures in the table the plan should work: a rise in government spending of US\\$65 million, with a multiplier of 2, raises income by US\\$130 million and closes the gap to full employment. In practice the effect is likely to be smaller. Builders import most of their equipment, so more of the spending leaks abroad and the real multiplier is lower than 2. Government borrowing might raise interest rates and crowd out private investment, which would offset part of the gain, and the shortage of skilled construction workers means that some of the extra demand may raise wages and prices instead of output. The full employment level of income and the propensities are uncertain because the economy is largely informal, so the injection may be too small or too large, and some unemployment may be structural and not cured by more demand. Overall the plan is a useful step that should reduce unemployment, but it is unlikely to achieve full employment exactly; it should be supported by training for construction workers and monitored so that policy can be adjusted." }),
    ]),
    explanation: "MPS 0.12; k = 2.00; Ye = 1,260; injection needed 65; the plan is helped by the multiplier but limited by import leakages, crowding out, skill shortages and uncertainty.",
  });

  // ------------------------------------------------------------------ Paper 4 essay (macroeconomics): Phillips curve and unemployment
  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("policy.interrelated-problems-phillips"), A("macro.unemployment-natural-rate")],
    hints: ["Use the short-run and long-run Phillips curves and the natural rate.", "Distinguish cyclical from structural unemployment and give a judgement."],
    stem: "'A government cannot reduce unemployment without causing inflation.' Discuss.",
    points: [
      ["Defines unemployment and inflation; the traditional Phillips curve suggests a short-run trade-off: lower unemployment with higher inflation.", 2],
      ["Demand-side policy (lower interest rates, higher spending) reduces cyclical unemployment; higher AD raises demand for labour, wages and prices.", 3, ["movement along the SRPC"]],
      ["Expectations-augmented Phillips curve: if unemployment is held below the natural rate, expectations adjust, the SRPC shifts up and inflation accelerates; the LRPC is vertical at the natural rate.", 3, ["LRPC", "natural rate"]],
      ["If there is large spare capacity (flat part of AS), extra demand raises output and employment with little inflation.", 2],
      ["Supply-side policies (training, job information, mobility, labour market reform) reduce structural unemployment and the natural rate, shifting the LRPC left, without raising inflation.", 3, ["shifts the LRPC"]],
      ["Limitations of supply-side policy: slow, costly, uncertain results; may reduce equity.", 2],
      ["Stagflation: inflation and unemployment can rise together after supply shocks, so the trade-off is not stable.", 1],
      ["Credible policy lowers inflation expectations, reducing the cost; hysteresis means early action prevents a higher natural rate.", 1],
      ["Evaluation: depends on the type of unemployment, spare capacity, the time horizon and the credibility of policy; a justified judgement.", 3],
    ],
    levels: LV20, wordLimit: { min: 350, max: 1000 },
    modelAnswer: "The traditional Phillips curve suggests that there is a short-run trade-off between unemployment and inflation. Demand-side policies such as lower interest rates or higher government spending raise aggregate demand and reduce cyclical unemployment, but as unemployment falls labour becomes scarce, wages rise and firms raise prices, so the economy moves up the short-run Phillips curve to higher inflation. The statement is therefore true for some policies in the short run. However, the expectations-augmented Phillips curve shows that the problem is more serious in the long run. If a government tries to hold unemployment below the natural rate, actual inflation exceeds expected inflation, workers and firms revise their expectations upwards and the short-run curve shifts up, so inflation accelerates; the long-run Phillips curve is vertical at the natural rate, so there is no lasting reduction in unemployment from higher demand. The statement is not always true, though. If the economy has a lot of spare capacity, with the aggregate supply curve flat, extra demand raises output and employment with little effect on prices. More importantly, policies on the supply side, such as training, better information on vacancies, help with moving and labour market reforms, reduce structural unemployment and the natural rate, shifting the long-run Phillips curve to the left, so unemployment can fall without causing inflation. These policies are slow, costly and uncertain, and some, such as cutting benefits, may reduce equity. Experience also shows that the relationship is unstable: after supply shocks inflation and unemployment can rise together, which is stagflation. A credible policy that lowers inflation expectations reduces the cost of fighting inflation, and because long periods of unemployment can raise the natural rate through hysteresis, acting early matters. Overall, the statement is true in the short run for demand-side policy when the economy is near capacity, but a government can reduce unemployment without inflation when there is spare capacity or when it uses supply-side policy that reduces the natural rate, so the conclusion depends on the type of unemployment, the state of the economy, the time horizon and the credibility of policy.",
    explanation: "Short-run trade-off and expectations-augmented curve against spare capacity, supply-side policy lowering the natural rate, stagflation and credibility.",
  });
});
