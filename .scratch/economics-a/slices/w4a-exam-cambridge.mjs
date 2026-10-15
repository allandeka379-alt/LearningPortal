// W4a: Cambridge exam-format items: one Paper 2 macroeconomics essay (8 + 12; monetary policy and inflation), one Paper 4 Section A data response (3 + 5 + 5 + 7; money and banking) and one Paper 4 macroeconomics essay (20 marks; the money supply and inflation).
import { concept, P, chk, fmt, table, roundTo, EXAM, checkExam, CAM, realInterest, quantityTheory } from "../lib.mjs";
import { L20 } from "../tables/w4a-kit.mjs";

const A = (k) => `aecon.${k}`;
const P2E = { skill: EXAM.CAM_P2_ESSAY.skill, secs: EXAM.CAM_P2_ESSAY.secs, applies: EXAM.CAM_P2_ESSAY.applies, examStyle: true, paper: "Paper 2" };
const P4D = { skill: EXAM.CAM_P4_DATA.skill, secs: EXAM.CAM_P4_DATA.secs, applies: EXAM.CAM_P4_DATA.applies, examStyle: true, paper: "Paper 4" };
const P4E = { skill: EXAM.CAM_P4_ESSAY.skill, secs: EXAM.CAM_P4_ESSAY.secs, applies: EXAM.CAM_P4_ESSAY.applies, examStyle: true, paper: "Paper 4" };

const LV12 = [
  [3, 9, 12, "Developed, balanced analysis applied to the question, with evaluation and a supported judgement."],
  [2, 5, 8, "Some analysis and application; evaluation limited or judgement not supported."],
  [1, 1, 4, "Simple, undeveloped points with little application."],
];
const LV7 = [
  [3, 5, 7, "Developed, balanced analysis applied to the data, with a supported judgement."],
  [2, 3, 4, "Some analysis, limited use of the data or an unsupported judgement."],
  [1, 1, 2, "Simple, undeveloped statements."],
];

concept(A("policy.monetary-policy"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ Paper 2 Sections B/C: macroeconomics essay (monetary policy and inflation)
  b.struct({
    ...P2E, d: 5,
    concepts: [A("policy.monetary-policy"), A("macro.inflation")],
    hints: ["In (a) trace the chain from the policy rate to aggregate demand and the price level.", "In (b) weigh the strengths of monetary policy against its limits and the alternatives."],
    stem: "Many central banks use the interest rate to control inflation.",
    parts: checkExam(EXAM.CAM_P2_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain how a central bank can use monetary policy to reduce inflation.",
        points: ["Demand-pull inflation occurs when aggregate demand grows faster than the economy's capacity to produce.", "The central bank raises its policy interest rate (or sells securities or raises the reserve requirement).", "Commercial banks raise their lending rates, so borrowing becomes more expensive.", "Households borrow and spend less on credit-financed goods, and saving becomes more attractive, so consumption falls.", "Firms invest less because the cost of borrowing is higher.", "A higher interest rate may attract funds from abroad and raise the exchange rate, making exports dearer and imports cheaper, so net exports fall.", "Aggregate demand shifts to the left.", "So the price level rises more slowly or falls, and inflation is reduced."],
        modelAnswer: "Demand-pull inflation occurs when aggregate demand grows faster than the economy's capacity to produce. To reduce it, the central bank can raise its policy interest rate, sell government securities or raise the reserve requirement. Commercial banks then raise their lending rates, so borrowing becomes more expensive. Households borrow and spend less on goods bought on credit, and saving becomes more attractive, so consumption falls, and firms invest less because the cost of borrowing is higher. A higher interest rate may also attract funds from abroad and raise the exchange rate, which makes exports dearer and imports cheaper, so net exports fall. Consumption, investment and net exports all fall, so aggregate demand shifts to the left. As a result the price level rises more slowly or falls, and inflation is reduced." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 250, max: 650 }, levels: LV12,
        stem: "Assess whether monetary policy is the most effective way of reducing inflation.",
        points: [["Raising interest rates reduces aggregate demand and is effective against demand-pull inflation; the central bank can act quickly and, if independent, is not subject to political pressure.", 2], ["A credible policy lowers inflation expectations, which reduces the cost of cutting inflation.", 1], ["There are time lags of many months, and the effect on spending is uncertain, particularly if confidence is low or if much of the economy uses cash or informal credit.", 1], ["Cost-push inflation (imported fuel, wages) is not removed by higher interest rates, which may even raise firms' costs.", 2], ["Costs: lower output and higher unemployment, a higher exchange rate that hurts exporters, and higher payments for borrowers.", 2], ["Alternatives: contractionary fiscal policy, which is slower to decide but can be targeted, and supply-side policy, which reduces costs and raises capacity in the longer run.", 2], ["The best policy depends on the cause of the inflation, its size and the state of the economy.", 1], ["A justified judgement.", 1]],
        modelAnswer: "Raising interest rates reduces consumption, investment and net exports, so aggregate demand falls, and this is effective against demand-pull inflation. A central bank can act quickly and, if it is independent, is not subject to the political pressures that affect fiscal policy, and a credible policy lowers inflation expectations, which reduces the cost of cutting inflation. However, monetary policy has limits. There are time lags of many months and the effect on spending is uncertain, particularly if confidence is low or much of the economy uses cash or informal credit. If inflation is caused by rising costs, such as imported fuel or wages, higher interest rates do not remove the cause and may even raise firms' costs. Tight policy also has costs: lower output and higher unemployment, a higher exchange rate that hurts exporters, and higher payments for borrowers. Alternatives include contractionary fiscal policy, which is slower to decide but can be targeted, and supply-side policy, which reduces costs and raises capacity in the longer run. Monetary policy is therefore likely to be the most effective tool against demand-pull inflation in an economy with a developed financial system, but it is not the most effective way when inflation comes from costs or in an economy where the banking system is weak, in which case it should be combined with other policies." }),
    ]),
    explanation: "(a) Chain from the policy rate to AD and prices; (b) strengths of monetary policy against lags, cost-push inflation, costs and alternatives.",
  });

  // ------------------------------------------------------------------ Paper 4 Section A data response: money and banking in Mbira
  const k = 1 / 0.125; chk(k, 8);
  const dD = 45 * k; chk(dD, 360);
  const real = realInterest(11, 9).approx; chk(real, 2);
  const M = [800, 960], V = [5, 5], T = [2000, 2100];
  const p1 = (M[0] * V[0]) / T[0], p2 = (M[1] * V[1]) / T[1]; chk(p1, 2); chk(roundTo(p2, 2), 2.29);
  const t1 = table(["", "Year 1", "Year 2"], [["Broad money supply (US\\$ million)", M[0], M[1]], ["Velocity of circulation (times a year)", V[0], V[1]], ["Volume of transactions (million)", fmt(T[0]), fmt(T[1])]]);

  b.struct({
    ...P4D, d: 5, calculator: true,
    concepts: [A("money.credit-creation"), A("money.interest-rates"), A("money.quantity-theory"), A("money.money-demand-supply")],
    hints: ["Credit multiplier = 1 ÷ reserve ratio.", "P = MV ÷ T.", "In (d) weigh the central bank's ability to control the money supply against the other causes of inflation."],
    stem: `**Money, banks and prices in Mbira** (a fictional economy)\n\nMbira has a small, open economy that exports tobacco and minerals and imports fuel and manufactured goods. In year 2 the government had a large budget deficit. The central bank bought government bonds worth US\\$45 million from the commercial banks, paying with newly created money, which raised the banks' reserves by US\\$45 million. The commercial banks keep a reserve ratio of 12.5%.\n\nBanks lent more to firms and households in year 2, but the increase was smaller than the central bank had hoped. Many people prefer to hold cash and mobile money rather than bank deposits, and some banks, which had suffered losses on earlier loans, chose to keep more reserves than required. Small firms said that, although the nominal lending rate had fallen to 11%, they were unwilling to borrow because they doubted that customers would buy more.\n\nThe average rate of inflation in year 2 was 9%. The central bank argues that the growth of the money supply is the main cause of the rise in prices. Critics point out that the price of imported fuel also rose and that the exchange rate fell during the year.\n\n**Table 1: Money, velocity and transactions (illustrative data)**\n\n${t1}`,
    parts: checkExam(EXAM.CAM_P4_DATA, [
      P.group({ label: "(a)", stem: "Using the information about the central bank's purchase of bonds:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "elasticity", value: k, dp: 2, stem: "Calculate the credit multiplier.", wrong: [0.125, 12.5, 80], explanation: "Credit multiplier = 1 ÷ 0.125 = 8." }),
        P.num({ label: "(ii)", marks: 2, kind: "plain", value: dD, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the maximum rise in bank deposits, in US\\$ million.", wrong: [45, 5.6, 405], explanation: "Maximum rise = US\\$45 million × 8 = US\\$360 million." }),
      ] }),
      P.group({ label: "(b)", stem: "Using the information about interest rates and inflation:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: real, dp: 1, unit: "%", stem: "Calculate the approximate real rate of interest in year 2 (nominal lending rate minus the rate of inflation).", wrong: [20, -2, 11], explanation: "Real rate ≈ 11% − 9% = 2%." }),
        P.manual({ label: "(ii)", marks: 3, stem: "Explain why the real rate of interest, rather than the nominal rate, affects firms' decisions to borrow and invest.",
          points: ["The real rate adjusts the nominal rate for inflation, so it shows the true cost of borrowing.", "Firms compare the real cost of borrowing with the expected real return from an investment.", "A higher real rate makes fewer projects profitable, so investment falls (a lower real rate has the opposite effect)."],
          modelAnswer: "The real rate adjusts the nominal rate for inflation, so it shows the true cost of borrowing, because with inflation the money repaid is worth less. Firms compare the real cost of borrowing with the expected real return from an investment, so a higher real rate makes fewer projects profitable and investment falls, while a lower real rate has the opposite effect." }),
      ] }),
      P.group({ label: "(c)", stem: "Using Table 1 and the quantity theory of money (MV = PT):", parts: [
        P.num({ label: "(i)", marks: 2, kind: "plain", value: p2, dp: 2, stem: "Calculate the average price level (P) in year 2, in US\\$ to two decimal places. (The price level in year 1 was US\\$2.00.)", wrong: [2.4, 0.44, 4.57], explanation: "P = MV ÷ T = 960 × 5 ÷ 2,100 = US\\$2.29." }),
        P.manual({ label: "(ii)", marks: 3, stem: "Analyse why the price level rose between year 1 and year 2.",
          points: ["The money supply rose by 20% (from 800 to 960) while velocity was constant.", "The volume of transactions rose by only 5%, so MV grew faster than T.", "By the equation MV = PT, the price level had to rise (here by about 14%)."],
          modelAnswer: "The money supply rose by 20%, from 800 to 960, while velocity was constant at 5. The volume of transactions rose by only 5%, so total spending MV grew faster than the volume of transactions T. By the equation MV = PT the price level had to rise, here by about 14%." }),
      ] }),
      P.manual({ label: "(d)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 320 }, levels: LV7,
        stem: "Assess whether controlling the growth of the money supply would be an effective way for the central bank to keep inflation low in Mbira.",
        points: [["The money supply grew by 20%, faster than transactions (5%), so on the quantity theory excess money growth is a major cause of the price rise.", 2], "The central bank can reduce money growth by selling bonds, raising the reserve requirement or the interest rate, and by refusing to finance the deficit.", "Control is not complete: many people prefer cash and mobile money, banks hold excess reserves and firms do not want loans, so the credit multiplier (8) is not reached.", "Part of the inflation is cost-push (imported fuel and a lower exchange rate), which controlling the money supply does not remove.", "Velocity may not stay constant, and a fall in the money supply would reduce output and raise unemployment.", "Judgement: restraining money growth would help to reduce inflation, but it is not sufficient on its own; the deficit and cost pressures must also be tackled."],
        modelAnswer: "On the quantity theory, excess growth of the money supply is a major cause of the rise in prices in Mbira, since the money supply grew by 20% while transactions grew by only 5%. The central bank could reduce money growth by selling bonds, raising the reserve requirement or the interest rate, and by refusing to finance the government's deficit. However, control is not complete. Many people prefer cash and mobile money, banks hold excess reserves and firms do not want loans, so the credit multiplier of 8 is not reached and the central bank cannot be sure how much the money supply will change. Part of the inflation is also cost-push, caused by imported fuel and the lower exchange rate, which controlling the money supply does not remove, and velocity may not stay constant. A fall in money growth would also reduce output and raise unemployment. Restraining money growth would therefore help to reduce inflation, but it is not sufficient on its own, and the deficit and the cost pressures would also need to be tackled." }),
    ]),
    explanation: "(a) Multiplier 8, rise in deposits US\\$360 million; (b) real rate 2%; (c) P rises to US\\$2.29 because M grew faster than T; (d) control of the money supply helps but is not sufficient.",
  });

  // ------------------------------------------------------------------ Paper 4 essay (macroeconomics): the money supply and inflation
  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("money.quantity-theory"), A("money.money-demand-supply")],
    hints: ["Explain the quantity theory, then examine the limits of controlling the money supply and the other causes of inflation.", "Reach a judgement that depends on the cause of the inflation, the time period and the financial system."],
    stem: "'Controlling the growth of the money supply is the most effective way to control inflation.' Discuss.",
    points: [
      ["Explains the quantity theory MV = PT: with V and T constant, faster growth of M than of T raises P in proportion.", 3, ["MV = PT", "quantity theory"]],
      ["Evidence: very high inflation is linked with very rapid money growth, and the link is stronger in the long run; monetarist policy sets targets for money growth.", 2],
      ["The central bank can influence the money supply through open-market operations, reserve requirements and the interest rate, and by not financing government deficits.", 2],
      ["Limits of control: credit creation depends on banks and borrowers, cash drain, excess reserves and weak loan demand; in an open economy capital flows and the use of foreign currencies change the money supply.", 3, ["cash drain", "capital flows"]],
      ["The link is weakened because velocity is unstable and T can rise when there is spare capacity, so output rather than prices may respond.", 3, ["velocity", "spare capacity"]],
      ["Cost-push inflation (imported fuel, wages, exchange rate) is not cured by controlling money; alternatives include supply-side, fiscal and exchange rate policy.", 3],
      ["Costs of tight money: higher interest rates, lower output and employment; a credible policy lowers expectations and reduces the cost.", 2],
      ["Evaluation: the answer depends on the cause of the inflation, the time horizon and the strength of the financial system; a justified judgement.", 2],
    ],
    levels: L20, wordLimit: { min: 350, max: 1000 },
    modelAnswer: "The quantity theory of money states that MV = PT. If velocity (V) and the volume of transactions (T) are constant, then a rise in the money supply faster than the growth of T raises the price level in proportion, so controlling the growth of money should control inflation. There is evidence for this, since very high inflation is almost always linked with very rapid money growth, especially when governments finance deficits by creating money, and monetarist policy sets targets for money growth. A central bank can influence the money supply through open-market operations, reserve requirements and the interest rate, and by refusing to finance government deficits. In the long run, and when inflation is high, controlling the money supply is therefore central. However, there are important limits. The central bank does not control the money supply completely, since credit creation depends on the decisions of banks to lend and of households and firms to borrow, and cash drain, excess reserves and weak demand for loans make the credit multiplier unreliable. In an open economy, capital flows and the balance of payments change the money supply, and where foreign currencies are widely used the central bank has little control. The link between money and prices is also weakened because velocity is unstable and T can rise when there is spare capacity, so a change in the money supply may affect output rather than prices. In addition, cost-push inflation caused by imported fuel, wages or a falling exchange rate is not cured by controlling the money supply, and other policies such as supply-side policy, contractionary fiscal policy or exchange rate policy may be more effective. Tight monetary policy also has costs, with higher interest rates, lower output and higher unemployment, although a credible policy lowers inflation expectations and so reduces those costs. Overall, controlling the growth of the money supply is likely to be the most effective way of controlling demand-pull inflation, particularly high inflation caused by deficit financing, in the long run and in an economy with a developed financial system. For short-run inflation or inflation caused by costs it is not sufficient, and it should be combined with other policies.",
    explanation: "Quantity theory and monetarist policy against limits of control, unstable velocity, spare capacity, cost-push inflation and the costs of tight policy.",
  });
});
