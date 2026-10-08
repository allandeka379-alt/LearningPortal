// W2a: econ.unemployment.effects-policies — consequences of unemployment and policies to reduce it.
// Figures differ from the lesson's worked examples.
import { concept, P, table, money, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.unemployment.effects-policies", { file: "unemployment/effects-policies", keyPrefix: "unemployment.effects-policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **opportunity cost** of unemployment to an economy?",
    options: [
      ["The output the unemployed could have produced", "Correct: goods and services lost for ever."],
      ["The wages paid to workers who keep their jobs", "Those wages are paid for output that is produced."],
      ["The interest paid on government debt", "This is not the output forgone because of idle labour."],
      ["The taxes paid by firms on their profits", "Taxes are a transfer, not the output lost."],
    ],
    answer: "A",
    explanation: "Unemployed labour produces nothing, so the economy loses the output it could have made: it is inside its PPC.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How does a rise in unemployment usually affect the government's budget?",
    options: [
      ["Tax revenue falls and welfare spending rises", "Correct: the budget deficit tends to widen."],
      ["Tax revenue rises and welfare spending falls", "Fewer people earning means less tax, not more."],
      ["Tax revenue and welfare spending both fall", "Spending on support for the unemployed tends to rise."],
      ["Neither tax revenue nor spending changes", "Both are affected by the number of people in work."],
    ],
    answer: "A",
    explanation: "Less income tax and VAT come in, while spending on benefits, welfare and job schemes rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **demand-side** policy to reduce unemployment?",
    options: [
      ["Cutting interest rates to encourage borrowing and spending", "Correct: it raises aggregate demand."],
      ["Providing retraining for workers from declining industries", "This is a supply-side policy."],
      ["Giving grants to help workers move to areas with jobs", "This improves mobility: supply side."],
      ["Opening job centres to publish vacancies", "This reduces search time: supply side."],
    ],
    answer: "A",
    explanation: "Demand-side policies raise total spending; they mainly reduce cyclical unemployment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group may **benefit** from high unemployment?",
    options: [
      ["Firms that are hiring, as workers are easier to find", "Correct: more applicants and weaker wage demands."],
      ["Shops selling luxury goods, because demand for luxuries rises", "Demand for luxuries falls as incomes fall."],
      ["The government, because its tax revenue rises", "Tax revenue falls."],
      ["Workers in jobs, because their wages rise faster", "High unemployment weakens wage demands."],
    ],
    answer: "A",
    explanation: "Recruiting firms have more applicants and face less pressure to raise wages, although they also face lower demand.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government raises spending on building clinics to reduce unemployment. Which is the most likely **drawback**?",
    options: [
      ["The budget deficit rises and, near full capacity, prices may rise", "Correct: extra spending must be financed and may be inflationary."],
      ["It will reduce structural unemployment in declining industries immediately", "This is not a drawback, and building clinics does not retrain workers."],
      ["It will lower aggregate demand", "Extra government spending raises aggregate demand."],
      ["It will reduce the number of construction jobs", "It creates construction jobs."],
    ],
    answer: "A",
    hints: ["How is the extra spending paid for, and what happens to prices if demand outruns supply?"],
    explanation: "Expansionary fiscal policy widens the deficit and can cause inflation; some spending may also go on imports.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Unemployed workers in a town spend less, so local shops cut staff, who in turn spend less. This process is called",
    options: [
      ["the downward multiplier effect.", "Correct: an initial fall in spending leads to further falls in income."],
      ["frictional unemployment.", "This describes searching between jobs, not the spread of lower spending."],
      ["the opportunity cost of unemployment.", "That is the lost output, not the chain of falling spending."],
      ["a supply-side policy.", "This is an effect, not a policy."],
    ],
    answer: "A",
    hints: ["The first fall in spending causes more falls."],
    explanation: "The multiplier spreads the effect of unemployment to other firms and workers.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "In a fictional country most unemployment is among young people who lack the skills employers want, while firms report many unfilled skilled vacancies. Which policy is likely to be **most** effective?",
    options: [
      ["Expanding technical training and apprenticeships", "Correct: it reduces the skills mismatch behind structural unemployment."],
      ["Cutting interest rates to raise consumer spending", "Firms already have vacancies; the problem is skills, not demand."],
      ["Raising import tariffs on manufactured goods", "Protection does not give young people the skills needed."],
      ["Raising the minimum wage for young workers", "This would make it more costly to hire unskilled young people."],
    ],
    answer: "A",
    hints: ["Are jobs missing, or are the skills missing?"],
    explanation: "Unfilled vacancies alongside unemployment point to structural unemployment, which needs supply-side policy.",
  });

  // Numericals.
  const u = 84000, w = 250, m = 12, tr = 0.2;
  const lost = u * w * m, lostTax = lost * tr;
  check("lost", lost, 252e6); check("lostTax", lostTax, 50.4e6);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: lostTax / 1e6, dp: 1, calculator: true,
    stem: `In a fictional country, ${fmt(u)} people are unemployed. If employed, each would earn an average of US\\$${w} a month and pay income tax at 20%. How much income tax, in US\\$ million, does the government lose in one year? Give your answer to one decimal place.`,
    wrong: [(u * w * tr) / 1e6, lost / 1e6],
    hints: ["Find the total income lost in a year (12 months) first."],
    explanation: `1. Income lost = ${fmt(u)} × ${w} × 12 = ${money(lost)} = US\\$${fmt(lost / 1e6)} million.\n2. Tax lost = 20% × ${fmt(lost / 1e6)} = **US\\$${fmt(lostTax / 1e6, 1)} million**.\n3. Forgetting to multiply by 12 gives US\\$${fmt((u * w * tr) / 1e6, 1)} million (one month only).`,
  });
  const cost = 15e6, jobs = 6000;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cost / jobs, daily: true,
    stem: `A fictional government spends US\\$15 million on a public works scheme that creates ${fmt(jobs)} temporary jobs. What is the cost per job?`,
    wrong: [jobs / 15],
    explanation: `${fmt(cost)} ÷ ${fmt(jobs)} = **${money(cost / jobs)}** per job.`,
  });
  check("cpj", cost / jobs, 2500);
  const benefit = 60, claim = 35000, newJobs = 5000;
  const saving = benefit * m * newJobs;
  check("saving", saving, 3.6e6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: saving,
    stem: `In a fictional country, ${fmt(claim)} unemployed people each receive a benefit of US\\$${benefit} a month. A training scheme helps ${fmt(newJobs)} of them into permanent jobs. How much does the government save on benefits in one year?`,
    wrong: [benefit * newJobs, benefit * m * claim],
    hints: ["Only the people who find jobs stop receiving the benefit."],
    explanation: `${fmt(newJobs)} × US\\$${benefit} × 12 = **${money(saving)}** a year. ${money(benefit * newJobs)} is the saving for one month only.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Long periods of unemployment can cause workers to lose skills, making it harder for them to find work.",
    answer: true,
    explanation: "True. Skills go out of date and employers may be reluctant to hire the long-term unemployed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lowering interest rates is an effective way to reduce structural unemployment.",
    answer: false,
    explanation: "False. Lower interest rates raise demand, which helps cyclical unemployment; structural unemployment needs retraining or help with mobility.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each policy with the type of unemployment it mainly targets.",
    pairs: [
      ["Lower income tax to raise spending", "Cyclical"],
      ["Retraining workers from closed mines", "Structural"],
      ["An online list of vacancies", "Frictional"],
      ["Irrigation so farms work all year", "Seasonal"],
    ],
    explanation: "Match the cure to the cause: demand for cyclical, skills for structural, information for frictional, off-season work for seasonal.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Higher government spending raises aggregate {{blank:a}}, which reduces {{blank:b}} unemployment. If the economy is close to full capacity, the policy is likely to cause {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["demand"], choices: ["demand", "supply"] },
      { id: "b", accepted: ["cyclical"], choices: ["cyclical", "structural"] },
      { id: "c", accepted: ["inflation"], choices: ["inflation", "deflation"] },
    ],
    wrong: [["supply", "structural", "deflation"]],
    hints: ["Which side of the economy does government spending act on?"],
    explanation: "Fiscal expansion raises aggregate demand, which reduces cyclical unemployment; near full capacity it pushes prices up.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** consequences of high unemployment for the government.",
    points: [
      "Identifies lower tax revenue.",
      "Explains: fewer people earn incomes (less income tax) and spend (less VAT).",
      "Identifies higher government spending (benefits, welfare, health, job schemes).",
      "Explains: so the budget deficit widens / less money for other services or more borrowing.",
    ],
    modelAnswer: "First, tax revenue falls: unemployed people pay no income tax and spend less, so VAT receipts fall too. Second, the government spends more on support for the unemployed, such as welfare, health care and job creation schemes. Together these widen the budget deficit, so the government must borrow more or cut spending on other services.",
    hints: ["Think about both sides of the budget."],
    explanation: "Identify (1) + explain (1) for each consequence.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why a supply-side policy such as retraining may fail to reduce unemployment quickly.",
    points: [
      "Identifies time lag: courses take months or years.",
      "Explains that unemployment stays high until trainees qualify.",
      "Identifies lack of jobs: training does not help if demand is low / there are no vacancies (cyclical).",
      "Explains: or trained workers emigrate / training does not match employers' needs.",
    ],
    modelAnswer: "First, retraining takes time: courses last months or years, so unemployment stays high until workers qualify. Second, training only helps if there are jobs for the new skills; in a recession firms are not hiring, so trained workers may stay unemployed or emigrate to find work.",
    hints: ["Time, and whether there are jobs to train for."],
    explanation: "Identify (1) + explain (1) for each reason.",
  });

  // Structured 1: comparing policies with data.
  const progs = [["Road maintenance scheme", 18, 7200, "9 months"], ["Small business loans", 6, 1500, "Lasting"], ["Wage subsidy for young workers", 10, 3200, "2 years"]];
  const T = table(["Programme", "Cost (US\\$ million)", "Jobs created", "Length of jobs"], progs, { align: ["l", "r", "r", "l"] });
  const cpj = progs.map(([, c, j]) => (c * 1e6) / j);
  check("cpj0", cpj[0], 2500); check("cpj1", cpj[1], 4000); check("cpj2", cpj[2], 3125);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 14, calculator: true,
    stem: `A fictional country in southern Africa has rising unemployment after a fall in export demand, and high unemployment among young school leavers. The government is considering three programmes.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cpj[0], stem: "Calculate the cost per job of the road maintenance scheme.", wrong: [progs[0][2] / progs[0][1]], explanation: `18,000,000 ÷ 7,200 = ${money(cpj[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: cpj[2], stem: "Calculate the cost per job of the wage subsidy for young workers.", wrong: [cpj[1]], explanation: `10,000,000 ÷ 3,200 = ${money(cpj[2])}.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how the road maintenance scheme could reduce unemployment by more than the 7,200 jobs it creates directly.",
        points: [
          "The new workers earn incomes and spend them.",
          "Spending raises demand for local goods and services (food, transport, shops).",
          "Firms selling these goods need more workers: the multiplier effect.",
          "Firms supplying materials and tools for the roads also hire more.",
        ],
        modelAnswer: "The 7,200 workers earn wages, which they spend on food, transport and other goods. This raises the sales of local shops, vendors and kombi operators, who may hire more workers, and those workers spend in turn: the multiplier effect. Firms supplying gravel, tools and fuel to the scheme also need more workers.",
        explanation: "Income → spending → demand for other firms → more jobs (multiplier), plus supplier jobs.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss which programme the government should choose.",
        points: [
          `Roads: lowest cost per job (${money(cpj[0])}), quick, tackles cyclical unemployment from the export fall, multiplier effects.`,
          "Roads: but jobs last only 9 months; unemployment returns unless exports recover.",
          `Business loans: highest cost per job (${money(cpj[1])}), but jobs are lasting and build enterprise; risk of loan defaults.`,
          `Wage subsidy: ${money(cpj[2])} per job, targets youth unemployment, gives experience and skills (structural).`,
          "Wage subsidy: firms may replace existing workers or let subsidised workers go when the subsidy ends.",
          "Justified conclusion based on the type of unemployment (e.g. roads now for cyclical, wage subsidy for youth structural).",
        ],
        modelAnswer: `The road scheme has the lowest cost per job (${money(cpj[0])}), creates jobs quickly and has multiplier effects, which suits the cyclical unemployment caused by the fall in exports; but the jobs end after nine months. The business loans cost the most per job (${money(cpj[1])}) and some borrowers may fail, but the jobs could last. The wage subsidy (${money(cpj[2])} per job) is aimed at young school leavers and gives them experience, tackling longer-term youth unemployment, although firms might replace other workers or drop the young workers when the subsidy ends. Because the country faces both problems, the best choice is the road scheme now, to support demand until exports recover, while using the wage subsidy for school leavers if money allows.`,
        explanation: "Weigh cost per job, length of jobs and the type of unemployment; conclude.",
      }),
    ],
    hints: ["Cost per job = cost ÷ jobs created.", "Which programme suits which type of unemployment?"],
    explanation: `Cost per job: roads ${money(cpj[0])}, loans ${money(cpj[1])}, wage subsidy ${money(cpj[2])}. The choice depends on whether unemployment is mainly cyclical or structural.`,
  });

  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The central bank of a fictional country cuts its interest rate from 12% to 8% to reduce unemployment, which has risen during a recession. Many households are worried about losing their jobs, and much of the country's consumer goods are imported.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Explain how a cut in interest rates could reduce unemployment.",
        points: ["Borrowing becomes cheaper / saving less rewarding.", "Households spend more and firms invest more: aggregate demand rises.", "Firms increase output and hire more workers (cyclical unemployment falls)."],
        modelAnswer: "Lower interest rates make loans cheaper and saving less attractive, so households buy more on credit and firms borrow to invest. Aggregate demand rises, so firms produce more and hire more workers, reducing cyclical unemployment.",
        explanation: "Chain: interest → borrowing and spending → output → jobs.",
      }),
      P.manual({
        label: "(b)", marks: 5, levels: LV(5),
        stem: "Discuss whether the cut in interest rates is likely to reduce unemployment in this country.",
        points: [
          "Likely to help: unemployment is cyclical (recession), which demand-side policy targets.",
          "Against: low confidence; households save rather than borrow and spend.",
          "Against: much spending goes on imports, creating jobs abroad rather than at home.",
          "Against: time lags; banks may not pass on the cut or lend to risky borrowers.",
          "Justified conclusion (e.g. some help, but weak unless confidence recovers; combine with fiscal policy).",
        ],
        modelAnswer: "The unemployment is cyclical, so a policy that raises demand is the right kind of cure: cheaper loans should encourage some borrowing and investment. However, households worried about their jobs are likely to save rather than borrow, and much of any extra spending will go on imported goods, which creates jobs abroad rather than at home. Banks may also be slow to pass on the cut or unwilling to lend in a recession, and the effects take months to appear. The cut will help a little, but on its own it is unlikely to reduce unemployment much; government spending on local projects would be more direct.",
        explanation: "Right type of policy, but confidence, imports and time lags weaken it; conclude.",
      }),
    ],
    hints: ["Will worried households borrow more?", "Where is the extra spending likely to go?"],
    explanation: "Monetary easing targets cyclical unemployment, but low confidence, imports and time lags limit its effect.",
  });

  b.card("CONCEPT", "Give two consequences of unemployment for individuals.", "Loss of income and living standards; loss of skills and confidence; stress and poor health.");
  b.card("CONCEPT", "Give two consequences of unemployment for the government.", "Lower tax revenue (income tax, VAT) and higher welfare spending, so a larger budget deficit.");
  b.card("DEFINITION", "What is the **opportunity cost** of unemployment?", "The output the unemployed could have produced, lost for ever.");
  b.card("DEFINITION", "What is a **demand-side policy** for unemployment?", "Raising aggregate demand through more government spending, lower taxes or lower interest rates; targets cyclical unemployment.");
  b.card("DEFINITION", "What is a **supply-side policy** for unemployment?", "Improving skills, mobility and incentives (training, job information, relocation grants, incentives for firms); targets structural and frictional unemployment.");
  b.card("CONCEPT", "Give two limits of demand-side policies.", "Inflation near full capacity; spending leaks into imports; larger budget deficit; do not cure structural unemployment.");
  b.card("CONCEPT", "Give two limits of supply-side policies.", "Slow (time lags); costly; need jobs to exist; trained workers may emigrate.");
  b.card("DEFINITION", "What is the **downward multiplier**?", "A fall in spending by the unemployed reduces others' incomes and spending, so total income falls by more than the first fall.");
  b.card("FACT", "Can unemployment benefit any group?", "Recruiting firms find workers more easily and face weaker wage demands; inflationary pressure is lower.");
});
