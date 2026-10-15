// W4a: supply-side policy (Cambridge AS only; single-board concept, tagged automatically).
import { concept, P, chk, schedule, pctChange } from "../lib.mjs";
import { mc, LV6, LV10 } from "../tables/w4a-kit.mjs";

concept("aecon.policy.supply-side", { file: "policy/supply-side", keyPrefix: "policy.supply-side" }, (b) => {
  mc(b, [2, "RECALL"], "The main aim of supply-side policy is to",
    ["increase the productive capacity of the economy", "Correct: it shifts the LRAS curve to the right."],
    [["increase the level of consumer spending in the economy", "That would shift aggregate demand, which is demand-side policy."],
     ["reduce the government's budget deficit in the short run", "That is a fiscal objective, not the aim of supply-side policy."],
     ["fix the exchange rate against the currencies of trading partners", "That is exchange rate policy."]],
    "Supply-side policy raises potential output by improving the quantity, quality or efficiency of resources.", { daily: true });

  mc(b, [2, "APPLICATION"], "Which of the following is an example of supply-side policy?",
    ["A government grant to colleges for vocational training", "Correct: it improves the skills of the labour force."],
    [["A cut in the central bank's policy interest rate", "This is monetary policy that raises demand."],
     ["A rise in the pensions paid to retired workers", "This is a transfer payment that raises demand."],
     ["A temporary cut in the rate of value added tax", "This mainly raises aggregate demand."]],
    "Training raises human capital and productivity, shifting LRAS to the right.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A successful supply-side policy, with no change in aggregate demand, is most likely to cause",
    ["a rise in real GDP and a fall in the price level", "Correct: SRAS shifts to the right along a downward-sloping AD curve."],
    [["a rise in real GDP and a rise in the price level", "A rise in AD would do this, not a rise in supply."],
     ["a fall in real GDP and a fall in the price level", "Output rises when capacity rises."],
     ["a fall in real GDP and a rise in the price level", "This is the effect of a fall in supply (cost-push)."]],
    "A rightward shift of SRAS lowers the price level and raises real output.", { hints: ["Draw SRAS shifting right along a fixed AD curve."] });

  mc(b, [2, "UNDERSTANDING"], "How might deregulation raise aggregate supply?",
    ["By lowering the costs of starting and running businesses", "Correct: fewer licences and less red tape reduce costs."],
    [["By increasing the rate of income tax paid by firms", "A tax rise would raise costs, not lower them."],
     ["By reducing the supply of credit to new firms", "This would restrict supply."],
     ["By raising the minimum wage above the market wage", "This is intervention that raises labour costs."]],
    "Removing unnecessary rules lowers costs and encourages new firms, so supply rises.");

  mc(b, [3, "APPLICATION"], "Which supply-side policy is likely to have the LONGEST time lag?",
    ["Reforming schools and colleges to raise skills", "Correct: a new generation must be educated before productivity rises."],
    [["Cutting the rate of tax on company profits", "Firms can respond within a year or two."],
     ["Reducing the paperwork needed to register a business", "This can take effect quite quickly."],
     ["Giving a one-year allowance for new machinery", "Firms can respond during the year."]],
    "Education and infrastructure take years; tax incentives and deregulation act more quickly.", { hints: ["Which policy needs people to complete years of study?"] });

  {
    const g = (13800 / 150); chk(g, 92);
    mc(b, [3, "APPLICATION"], "A firm employs 150 workers who produce 13,800 units a month. After training, the same workers produce 15,600 units. Labour productivity has risen by about",
      ["13%", "Correct: output per worker rises from 92 to 104, a rise of 13.04%."],
      [["12%", "This is the rise in output per worker (12 units), not a percentage."],
       ["11.5%", "This divides the rise by the new level (12 ÷ 104) instead of the original."],
       ["1,800%", "1,800 is the rise in units, not a percentage."]],
      "Productivity before = 13,800 ÷ 150 = 92. After = 15,600 ÷ 150 = 104. Rise = 12 ÷ 92 × 100 = 13%.", { hints: ["Productivity is output per worker; find it before and after."], calculator: true });
  }

  mc(b, [4, "EVALUATION"], "Why might supply-side policy fail to reduce unemployment in the short run?",
    ["Training takes years to work, and jobs will not appear if demand is weak", "Correct: lags and weak demand limit the effect."],
    [["Supply-side policy always raises the price level and so reduces employment", "A successful policy lowers or stabilises the price level."],
     ["Supply-side policy has no effect on the productivity of labour", "Training and technology raise productivity."],
     ["Unemployment is caused only by the level of the minimum wage", "Unemployment has many causes."]],
    "The effects are slow, and structural unemployment will remain if there are too few vacancies.", { hints: ["Think about lags and the demand for labour."] });

  {
    const p1 = 10800 / 120; chk(p1, 90);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: p1, unit: "units", dp: 0, tol: 0.5, hints: ["Productivity = output ÷ workers."],
      stem: "A factory employs 120 workers who together produce 10,800 units a month. Calculate labour productivity, in units per worker per month.",
      wrong: [0.011, 10920, 120], explanation: "Productivity = 10,800 ÷ 120 = 90 units per worker." });
    const g = pctChange(80, 90); chk(g, 12.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: g, dp: 1, unit: "%", calculator: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "Labour productivity at a firm rises from 80 units per worker to 90 units per worker after a training programme. Calculate the percentage rise in productivity, as a percentage.",
      wrong: [11.1, 10, 125], explanation: "Rise = (90 − 80) ÷ 80 × 100 = 12.5%. Dividing by 90 gives 11.1%." });
    const u = 600 / 90; chk(Math.round(u * 100) / 100, 6.67);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: u, dp: 2, calculator: true, hints: ["Labour cost per unit = wage cost per worker ÷ output per worker."],
      stem: "Each worker is paid US\\$600 a month and produces 90 units a month. Calculate the labour cost per unit, in US\\$ to the nearest cent.",
      wrong: [7.5, 54000, 0.15], explanation: "1. Labour cost per unit = 600 ÷ 90.\n2. = US\\$6.67 per unit. Multiplying 600 by 90 gives 54,000, which is not a cost per unit." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: the main aim of supply-side policy is to shift the aggregate demand curve to the right.",
    feedbackFalse: "Supply-side policy aims to shift the aggregate supply curves to the right.",
    explanation: "Supply-side policy raises productive capacity; it does not mainly change aggregate demand." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each supply-side policy with the way in which it raises productive capacity.",
    pairs: [["Vocational training programmes", "Raises the skills and productivity of workers"], ["Investment in roads and electricity", "Lowers firms' costs and improves capacity"], ["Tax relief on research spending", "Encourages the development and use of new technology"], ["Reducing licensing requirements", "Lowers the costs of starting and running firms"]],
    explanation: "Each policy works through productivity, costs or the incentive to invest." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Successful supply-side policy shifts the {{blank:a}}-run aggregate supply curve to the right. Output per worker is called labour {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["long"], choices: ["long", "short"] }, { id: "b", accepted: ["productivity"], choices: ["productivity", "capacity", "income"] }],
    explanation: "Supply-side policy raises LRAS; productivity is output per worker." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to output per worker?",
    accepted: ["labour productivity", "productivity", "productivity of labour"], wrong: ["capacity"],
    explanation: "Labour productivity is total output divided by the number of workers." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Mention capacity and the AS curve."],
    stem: "Define supply-side policy.",
    points: ["Government policies that aim to raise the productive capacity of the economy.", "By increasing the quantity, quality or efficiency of resources, so shifting the long-run aggregate supply curve to the right."],
    modelAnswer: "Supply-side policy consists of government policies that aim to raise the productive capacity of the economy by increasing the quantity, quality or efficiency of resources, which shifts the long-run aggregate supply curve to the right.",
    explanation: "Aim of capacity; mechanism through resources and LRAS." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Start with the skills of workers."],
    stem: "Explain how government spending on training could shift the long-run aggregate supply curve to the right.",
    points: ["Training raises the skills of the labour force (human capital).", "So output per worker (productivity) rises.", "Workers are better matched to vacancies, so structural unemployment falls and more resources are employed.", "Potential output rises, so LRAS shifts to the right."],
    modelAnswer: "Training raises the skills of the labour force, so the output of each worker (productivity) rises. Workers are also better matched to the vacancies that firms have, so structural unemployment falls and more resources are used. Potential output therefore rises, so the long-run aggregate supply curve shifts to the right.",
    explanation: "Skills, productivity, employment, LRAS." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Think about incentives to invest."],
    stem: "Explain how a cut in the rate of tax on company profits could raise aggregate supply.",
    points: ["Firms keep more of each dollar of profit, so the reward for investment rises.", "They are likely to invest more in machinery and buildings.", "The capital stock grows, which raises productive capacity.", "So long-run aggregate supply shifts to the right (with a time lag)."],
    modelAnswer: "A lower tax on profits means that firms keep more of each dollar earned, which increases the reward for investing. They are likely to invest more in machinery and buildings, so the capital stock grows and productive capacity rises. Long-run aggregate supply therefore shifts to the right, although this takes time.",
    explanation: "Incentive, investment, capacity, LRAS with lag." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Compare how quickly each policy works."],
    stem: "Analyse why supply-side policies often have long time lags.",
    points: ["Education and training take years to produce a skilled labour force.", "Building roads, power stations and railways takes years of planning and construction.", "Firms respond to incentives only after they have planned and carried out investment.", "Research and new technology take time to develop and to spread through the economy.", "So the shift in LRAS happens slowly, and the policy cannot cure a short-run recession."],
    modelAnswer: "Education and training take years to produce a skilled labour force, and roads, railways and power stations take years to plan and build. Firms respond to tax incentives only after they have planned and carried out new investment, and new technology takes time to develop and spread. The shift in long-run aggregate supply therefore happens slowly, so supply-side policy cannot cure a short-run recession.",
    explanation: "Lags for education, infrastructure, investment, technology; consequence." });

  {
    const w0 = 200, o0 = 16000, o1 = 18400;
    const a0 = o0 / w0, a1 = o1 / w0; chk(a0, 80); chk(a1, 92);
    const g = pctChange(a0, a1); chk(g, 15);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Productivity = output ÷ workers.", "Percentage change = change ÷ original × 100."],
      stem: "**A training programme at a Gweru clothing firm (fictional, illustrative)**\n\nA clothing firm in Gweru employs 200 workers and makes 16,000 shirts a month. The government pays half the cost of a training programme in modern sewing methods. After the programme the same 200 workers make 18,400 shirts a month. Wages are unchanged.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: a0, unit: "units", dp: 0, tol: 0.5, stem: "Calculate labour productivity before the training, in shirts per worker.", wrong: [8000, 0.0125, 200], explanation: "16,000 ÷ 200 = 80 shirts per worker." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: a1, unit: "units", dp: 0, tol: 0.5, stem: "Calculate labour productivity after the training, in shirts per worker.", wrong: [18400, 0.011, 80], explanation: "18,400 ÷ 200 = 92 shirts per worker." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: g, dp: 1, unit: "%", stem: "Calculate the percentage rise in labour productivity, as a percentage.", wrong: [13, 12, 2400], explanation: "(92 − 80) ÷ 80 × 100 = 15%. Dividing by 92 gives 13%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how a rise in productivity across many firms could lead to a lower price level in the economy.",
          points: ["Output per worker rises while wages do not, so labour cost per unit falls.", "Lower costs of production shift the short-run aggregate supply curve to the right.", "At the existing level of demand, firms can sell more at a lower price.", "So the price level falls, or rises more slowly, and real output rises."],
          modelAnswer: "If output per worker rises while wages do not, the labour cost of each unit falls. Lower costs of production shift the short-run aggregate supply curve to the right. With aggregate demand unchanged, firms can sell more at a lower price, so the price level falls (or rises more slowly) and real output rises." }),
      ],
      explanation: "Productivity rises from 80 to 92 shirts per worker, 15%; lower unit costs shift AS right." });
  }
  {
    const Pl = [60, 70, 80, 90, 100];
    const ad = [1135, 1050, 970, 890, 810];
    const as1 = [810, 890, 970, 1030, 1070];
    const as2 = as1.map((x) => x + 160);
    const s1 = schedule({ prices: Pl, qd: ad, qs: as1, priceHeader: "Price level (index)", qdHeader: "AD (US\\$ million)", qsHeader: "SRAS before (US\\$ million)", requireEquilibrium: true });
    const s2 = schedule({ prices: Pl, qd: ad, qs: as2, requireEquilibrium: true });
    chk(s1.equilibrium.price, 80); chk(s1.equilibrium.quantity, 970);
    chk(s2.equilibrium.price, 70); chk(s2.equilibrium.quantity, 1050);
    const dP = pctChange(80, 70); chk(dP, -12.5);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Add 160 to SRAS before at each price level, then find where AD equals the new SRAS.", "In (d) consider time lags, cost and the need for demand."],
      stem: `**Roads and power in Mbira (a fictional economy, illustrative)**\n\nMbira's firms face high transport costs and frequent power cuts. The government plans to spend on rural roads, electricity generation and a training scheme for technicians. Officials estimate that, when complete, the programme will raise the quantity of real GDP supplied by US\\$160 million at every price level. The spending will take about six years and will be paid for by a small rise in taxes.\n\n${s1.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 1050, unit: "US$ million", dp: 0, tol: 0.5, stem: "After the programme is complete, find the new equilibrium level of real GDP, in US\\$ million.", wrong: [970, 1130, 890], explanation: "SRAS after = SRAS before + 160. At a price level of 70, 890 + 160 = 1,050, which equals AD (1,050): equilibrium real GDP is US\\$1,050 million." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: dP, dp: 1, unit: "%", stem: "Calculate the percentage change in the price level between the old and new equilibrium, to one decimal place. Include the minus sign if the price level falls.", wrong: [12.5, -8.2, 10], explanation: "The price level falls from 80 to 70: (70 − 80) ÷ 80 × 100 = −12.5%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how better roads and a reliable electricity supply could shift the aggregate supply curve to the right.",
          points: ["They lower firms' costs of transport and of standby power.", "Lower costs mean firms can supply more at each price level (short-run aggregate supply shifts right).", "They raise productive capacity because firms can operate for longer and reach markets, so LRAS shifts right."],
          modelAnswer: "Better roads and a reliable electricity supply lower firms' costs of transport and standby power, so firms can supply more at each price level and the short-run aggregate supply curve shifts to the right. They also allow firms to operate for longer and to reach more markets, which raises productive capacity and shifts the long-run aggregate supply curve to the right." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 280 }, levels: LV6,
          stem: "Assess whether the government's programme is a good way of improving the economy of Mbira.",
          points: ["Real GDP rises by US\\$80 million and the price level falls by 12.5%: growth without inflation.", "Lower costs make Mbira's firms more competitive.", "The programme takes about six years, so it does not help in the short run.", "The cost is paid by higher taxes and may reduce spending now, and benefits are uncertain.", "Training may not match employers' needs; extra jobs depend on demand for output.", "Judgement: worthwhile for long-term benefits if well designed and affordable."],
          modelAnswer: "On the figures, real GDP rises by US\\$80 million and the price level falls by 12.5%, which is growth without inflation, and lower costs would make Mbira's firms more competitive. However, the programme takes about six years, so it does nothing for the economy in the short run, and it is paid for by higher taxes that reduce spending now. The benefits are uncertain because the training may not match what employers need, and extra jobs depend on enough demand for the extra output. Overall it is worthwhile for the long-term benefits if it is well designed and affordable, but it should be accompanied by measures to support demand while it is built." }),
      ],
      explanation: "New equilibrium US\\$1,050 million at price level 70 (−12.5%); lower costs and capacity; long lags, cost and uncertainty." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider lags, cost, the type of unemployment and the level of demand."],
    stem: "Assess the effectiveness of supply-side policies in reducing unemployment.",
    points: ["Training and better job information reduce structural unemployment by matching skills to jobs.", "Raising capacity and lowering costs lets firms expand and employ more.", "Tax incentives and deregulation encourage firms to start up and to hire.", "They can reduce unemployment without causing inflation.", "Time lags are long.", "Cost and uncertainty: training may not match demand for skills.", "If unemployment is caused by weak aggregate demand, supply-side policy will not create jobs.", "Some policies (tax cuts) may widen inequality.", "Application to an economy with structural unemployment.", "A justified judgement."],
    levels: LV10, wordLimit: { min: 150, max: 400 },
    modelAnswer: "Supply-side policies such as training and better information about vacancies reduce structural unemployment by matching the skills of workers to the jobs available, and lower costs and greater capacity allow firms to expand and employ more. Tax incentives and deregulation encourage new firms to start up and to hire, and these policies can reduce unemployment without causing inflation. However, the time lags are long, because training and infrastructure take years to work, and the cost is high and the results uncertain: training may not match the skills that employers need. If unemployment is caused by weak aggregate demand, supply-side policy will not create jobs, and some policies, such as tax cuts, may widen inequality. Supply-side policy is therefore effective against structural unemployment over the long term, but it needs to be combined with demand management when unemployment is also cyclical.",
    explanation: "Structural unemployment and non-inflationary growth against lags, cost, uncertainty and weak demand." });

  b.card("DEFINITION", "Define **supply-side policy**.", "Government policies that aim to raise the productive capacity of the economy and shift long-run aggregate supply to the right.");
  b.card("CONCEPT", "List five supply-side policies.", "Education and training, infrastructure, support for technology and research, tax incentives and deregulation.");
  b.card("FORMULA", "Labour productivity?", "Total output ÷ number of workers.");
  b.card("FORMULA", "Labour cost per unit?", "Labour cost per worker ÷ output per worker.");
  b.card("CONCEPT", "Effect of a successful supply-side policy in AD/AS?", "SRAS and LRAS shift right: higher real GDP and a lower price level.");
  b.card("CONCEPT", "Which supply-side policies work most slowly?", "Education, training and infrastructure (years); tax incentives and deregulation act sooner.");
  b.card("CONCEPT", "Supply-side or demand-side: a cut in the interest rate?", "Demand-side (monetary policy): it mainly shifts aggregate demand.");
  b.card("CONCEPT", "Name two costs or limits of supply-side policy.", "Long time lags, high cost and uncertain results; it will not create jobs if demand is weak.");
  b.card("DEFINITION", "What is **potential output**?", "The maximum real output an economy can sustain with resources fully employed; shown by LRAS.");
});
