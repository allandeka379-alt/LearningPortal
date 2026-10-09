// W2b: econ.labour.unions-government — unions, employers' associations, collective bargaining, minimum wages.
import { concept, P, schedule, money, check, fmt, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.unions-government", { file: "labour/unions-government", keyPrefix: "labour.unions-government" }, (b) => {
  // Security guards, monthly wage: Ld = 3570 - 9w, Ls = -420 + 10w; eq US$210, 1,680.
  const w = [180, 195, 210, 225, 240];
  const ld = w.map((x) => 3570 - 9 * x), ls = w.map((x) => -420 + 10 * x);
  const G = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Monthly wage (US\\$)", qdHeader: "Guards demanded", qsHeader: "Guards supplied", requireEquilibrium: true });
  check("guards eq", G.equilibrium.price, 210);
  const iMin = w.indexOf(225);
  const surplus = -G.excess[iMin];
  const jobsLost = G.equilibrium.quantity - ld[iMin];
  check("surplus", surplus, 285);
  check("jobs lost", jobsLost, 135);
  // Hotel cleaners (weekly): own data for the surplus question.
  const wh = [40, 45, 50, 55, 60];
  const ldh = wh.map((x) => 1330 - 14 * x), lsh = wh.map((x) => -370 + 20 * x);
  const H = schedule({ prices: wh, qd: ldh, qs: lsh, priceHeader: "Weekly wage (US\\$)", qdHeader: "Cleaners demanded", qsHeader: "Cleaners supplied", requireEquilibrium: true });
  check("H eq", H.equilibrium.price, 50);
  const iH = wh.indexOf(55);
  const surH = -H.excess[iH], lostH = H.equilibrium.quantity - ldh[iH];
  check("surH", surH, 170);
  // Shop assistants (monthly): own data for the jobs-lost question.
  const wa = [260, 280, 300, 320, 340];
  const lda = wa.map((x) => 4700 - 9 * x), lsa = wa.map((x) => -1600 + 12 * x);
  const A = schedule({ prices: wa, qd: lda, qs: lsa, priceHeader: "Monthly wage (US\\$)", qdHeader: "Shop assistants demanded", qsHeader: "Shop assistants supplied", requireEquilibrium: true });
  check("A eq", A.equilibrium.price, 300);
  const iA = wa.indexOf(320);
  const surA = -A.excess[iA], lostA = A.equilibrium.quantity - lda[iA];
  check("lostA", lostA, 180);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **collective bargaining**?",
    options: [
      ["Negotiation over pay and conditions between a union and employers", "Correct: workers bargain together through their union."],
      ["A worker negotiating his own wage with his manager", "That is individual bargaining."],
      ["The government setting a legal minimum wage for all workers", "That is government intervention, not bargaining."],
      ["Workers refusing to work until their demands are met", "That is a strike, a form of industrial action."],
    ],
    answer: "A",
    explanation: "Collective bargaining is negotiation between a trade union, acting for all its members, and an employer or employers' association.",
  });
  b.mcq({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "Which organisation represents the interests of **employers** in wage negotiations?",
    options: [
      ["An employers' association", "Correct: it speaks for firms in an industry."],
      ["A trade union", "A union represents workers."],
      ["A workers' committee at a firm", "A workers' committee represents employees at one workplace, not employers."],
      ["A consumers' council", "A consumers' council represents buyers of goods."],
    ],
    answer: "A",
    explanation: "Employers' associations negotiate with unions for their members, advise them on labour law and represent them to government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which situation is a trade union's bargaining power likely to be **strongest**?",
    options: [
      ["Its members are highly skilled and hard to replace", "Correct: a strike would stop production and replacements are hard to find."],
      ["Unemployment is high and many people want its members' jobs", "Employers can replace strikers easily."],
      ["Machines that can do its members' work have become cheap", "Employers can replace workers with machines."],
      ["Only a small share of the workers belong to the union", "A small membership weakens a strike threat."],
    ],
    answer: "A",
    explanation: "Union power is strong when members are hard to replace, membership is high, the firm is profitable and labour is a small share of costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Workers agree to do exactly what their contracts require and nothing more, to put pressure on management. This form of industrial action is called",
    options: [
      ["a work-to-rule.", "Correct: following the rules strictly slows work down."],
      ["a lock-out.", "A lock-out is action by employers, keeping workers out."],
      ["an overtime ban.", "An overtime ban refuses only extra hours."],
      ["arbitration.", "Arbitration is a way of settling disputes, not industrial action."],
    ],
    answer: "A",
    explanation: "A work-to-rule means doing only the minimum the contract requires, which reduces output without a full strike.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows the monthly market for security guards in a fictional city.\n\n${G.md}\n\nThe government sets a minimum wage of US\\$225 a month. How many guards are employed?`,
    options: [
      [fmt(ld[iMin]), "Correct: employers hire only the number they demand at US\\$225."],
      [fmt(ls[iMin]), "This is the number who want to work at US\\$225, not the number hired."],
      [fmt(G.equilibrium.quantity), "This is the employment before the minimum wage."],
      [fmt(surplus), "This is the surplus of labour, not employment."],
    ],
    answer: "A",
    explanation: `At US\\$225, firms demand ${fmt(ld[iMin])} guards, so only ${fmt(ld[iMin])} are employed, even though ${fmt(ls[iMin])} want work.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: surH, daily: true,
    stem: `The table shows the weekly market for hotel cleaners in a fictional resort town.\n\n${H.md}\n\nCalculate the surplus of labour (unemployment) caused by a minimum wage of US\\$55 a week.`,
    wrong: [lostH, lsh[iH]],
    explanation: `At US\\$55, ${fmt(lsh[iH])} cleaners want work but only ${fmt(ldh[iH])} are hired: ${fmt(lsh[iH])} − ${fmt(ldh[iH])} = **${surH}**. The ${lostH} is the fall in employment, not the whole surplus.`,
  });
  b.num({
    d: 3, skill: "ANALYSIS", kind: "plain", value: lostA,
    stem: `The table shows the monthly market for shop assistants in a fictional city.\n\n${A.md}\n\nBy how many shop assistants does employment **fall** when a minimum wage of US\\$320 a month is introduced?`,
    wrong: [surA],
    hints: ["Compare employment at equilibrium with employment at US\\$320."],
    explanation: `Employment falls from ${fmt(A.equilibrium.quantity)} (equilibrium at US\\$300) to ${fmt(lda[iA])}: a fall of **${lostA}**. The surplus (${surA}) is larger because the higher wage also attracts ${lsa[iA] - A.equilibrium.quantity} extra job-seekers.`,
  });
  const rise = 320 * 0.075;
  check("rise", rise, 24);
  const extra = rise * 250 * 12;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: extra, calculator: true,
    stem: "A union representing 250 workers at a fictional textile mill in Kadoma wins a pay rise of 7.5% on a basic wage of US\\$320 a month. Calculate the extra cost to the mill of the pay rise over one year.",
    wrong: [rise * 250, rise * 12],
    hints: ["Find the rise per worker per month first.", "Multiply by the number of workers and by 12 months."],
    explanation: `1. Rise per worker: 320 × 7.5 ÷ 100 = US\\$${rise} a month.\n2. Extra monthly wage bill: ${rise} × 250 = ${money(rise * 250)}.\n3. Over a year: ${fmt(rise * 250)} × 12 = **${money(extra)}**.\n4. ${money(rise * 250)} is only one month's cost; ${money(rise * 12)} is the cost for one worker.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A minimum wage set below the equilibrium wage has no effect on employment.",
    answer: true,
    explanation: "True. The market wage is already higher, so the law does not change what employers pay or how many they hire.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A minimum wage set above the equilibrium wage causes a shortage of labour.",
    answer: false,
    explanation: "False. It causes a **surplus** of labour: more people want work at the higher wage than employers wish to hire.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each party with one of its roles.",
    pairs: [
      ["Trade union", "Negotiates pay and conditions for its members"],
      ["Employers' association", "Represents firms of an industry in wage talks"],
      ["Workers' committee", "Raises employees' complaints with management at one workplace"],
      ["Government", "Sets a legal minimum wage"],
    ],
    applies: ZIM,
    explanation: "Unions and workers' committees act for workers (industry-wide and at one workplace); employers' associations act for firms; government sets laws such as a minimum wage.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words to describe the diagram of a minimum wage.",
    template: "The minimum wage is shown as a horizontal line {{blank:a}} the equilibrium wage. At this wage the quantity of labour demanded {{blank:b}} and the quantity supplied {{blank:c}}, leaving a {{blank:d}} of labour.",
    blanks: [
      { id: "a", accepted: ["above"], choices: ["above", "below"] },
      { id: "b", accepted: ["contracts"], choices: ["extends", "contracts"] },
      { id: "c", accepted: ["extends"], choices: ["extends", "contracts"] },
      { id: "d", accepted: ["surplus"], choices: ["shortage", "surplus"] },
    ],
    wrong: [["below", "extends", "contracts", "shortage"]],
    hints: ["A minimum wage is a price floor in the labour market."],
    explanation: "An effective minimum wage lies above W1; employers hire fewer workers (contraction of demand) while more people seek work (extension of supply): a surplus of labour.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government raises the minimum wage above the equilibrium wage. Which group is most likely to **lose** from this?",
    options: [
      ["Young unskilled people looking for their first job", "Correct: employers hire fewer workers and choose experienced ones."],
      ["Low-paid workers who keep their jobs", "They gain a higher wage."],
      ["Shops selling basic goods to low-paid workers", "Workers who keep their jobs spend more, which helps these shops."],
      ["The trade unions that campaigned for the rise", "Unions' members in work gain; the union is not the main loser."],
    ],
    answer: "A",
    hints: ["Who finds it hardest to get hired when employers cut back?"],
    explanation: "A minimum wage above equilibrium reduces the number of jobs. Those with the least skill and experience, often young people, are least likely to be hired.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A union wins a large wage rise for workers in an industry where labour costs are a small share of total costs and demand for the product is price inelastic. What is the most likely outcome?",
    options: [
      ["Wages rise with few job losses, as firms pass costs on to buyers", "Correct: inelastic product demand and a small labour share mean firms can pay."],
      ["Many workers lose their jobs, because firms cannot raise prices", "With inelastic demand firms can raise prices without losing many sales."],
      ["Firms close, because wages are a large part of their costs", "The stem says labour is a small share of costs."],
      ["Wages do not change, because unions cannot affect the wage", "Collective bargaining can raise the wage above the market level."],
    ],
    answer: "A",
    hints: ["Can firms pass the higher cost on in prices?", "How much does the wage rise add to total costs?"],
    explanation: "When labour is a small share of costs and product demand is inelastic, the wage rise adds little to costs and can be passed on in prices with little fall in sales, so few jobs are lost.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** roles of a trade union, other than negotiating wages.",
    points: [
      "Identifies a role (for example improving health and safety / working conditions).",
      "Explains it (pressing employers for protective equipment, safe machines, reasonable hours).",
      "Identifies a second role (for example protecting job security / representing members in disputes; training; influencing government).",
      "Explains it (supporting members at disciplinary hearings so they are not unfairly dismissed).",
    ],
    modelAnswer: "A union works to improve working conditions, for example by pressing employers to provide protective clothing and safe machines and to limit hours. It also protects job security by representing members at disciplinary hearings and in disputes, so that workers are not dismissed unfairly. Unions also lobby government on labour laws and offer training and legal advice.",
    hints: ["Think beyond pay: safety, security, services, influence."],
    explanation: "One mark for each role identified and one for explaining how the union carries it out.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Describe the diagram you would use to show the effect of a national minimum wage set above the equilibrium wage, and explain what it shows.",
    points: [
      "Wage rate on the vertical axis, quantity of labour on the horizontal axis.",
      "Downward-sloping demand for labour and upward-sloping supply of labour crossing at W1/Q1.",
      "A horizontal minimum wage line above W1.",
      "Labour demanded at the minimum wage (Qd) less than Q1: employment falls / contraction of demand.",
      "Labour supplied at the minimum wage (Qs) greater than Q1: extension of supply.",
      "The gap Qd to Qs is a surplus of labour (unemployment); those employed earn more.",
    ],
    modelAnswer: "I would draw the wage rate on the vertical axis and the quantity of labour on the horizontal axis, with a downward-sloping demand curve and an upward-sloping supply curve crossing at the equilibrium wage W1 and employment Q1. A horizontal line labelled 'minimum wage' is drawn above W1. Where it meets the demand curve, employers hire only Qd workers, fewer than Q1. Where it meets the supply curve, Qs people want work, more than Q1. The gap between Qd and Qs is a surplus of labour, which is unemployment, while the Qd workers who keep their jobs earn the higher wage.",
    hints: ["Axes, curves, the floor above equilibrium, the two quantities, the gap."],
    explanation: "Credit the axes, the curves and equilibrium, the minimum wage above W1, the lower employment, the higher number seeking work and the surplus.",
  });

  // Structured 1: minimum wage for domestic workers (fictional country).
  const wd = [70, 80, 90, 100, 110];
  const ldd = wd.map((x) => 2470 - 13 * x), lsd = wd.map((x) => 580 + 8 * x);
  const D = schedule({ prices: wd, qd: ldd, qs: lsd, priceHeader: "Monthly wage (US\\$)", qdHeader: "Domestic workers demanded (thousands)", qsHeader: "Domestic workers supplied (thousands)", requireEquilibrium: true });
  check("dom eq", D.equilibrium.price, 90);
  const iD = wd.indexOf(110);
  const surD = -D.excess[iD];
  const lostD = D.equilibrium.quantity - ldd[iD];
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 14,
    stem: `In a fictional country, the government plans a minimum wage of US\\$110 a month for domestic workers. The table shows the market.\n\n${D.md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: D.equilibrium.price, stem: "State the equilibrium monthly wage.", wrong: [110], explanation: `At US\\$90, ${fmt(D.equilibrium.quantity)} thousand workers are demanded and supplied.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: surD, stem: "Calculate the surplus of labour at the minimum wage (thousands).", wrong: [lostD], explanation: `${fmt(lsd[iD])} − ${fmt(ldd[iD])} = ${surD} thousand.` }),
      P.num({ label: "(c)", marks: 2, kind: "plain", value: lostD, stem: "Calculate the fall in employment (thousands).", wrong: [surD], explanation: `${fmt(D.equilibrium.quantity)} − ${fmt(ldd[iD])} = ${lostD} thousand.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why domestic workers may have weak bargaining power without a minimum wage.", points: ["Each works alone for one household, so they rarely join or form a union / cannot bargain collectively.", "Many people can do the work with little training, so they are easy to replace.", "High unemployment / few other jobs means workers accept low pay rather than lose the job."], modelAnswer: "Domestic workers each work alone in a separate household, so it is hard for them to organise a union and bargain collectively. The work needs little training, so an employer can easily replace a worker who asks for more pay, and with few other jobs available many accept whatever wage is offered." }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: "Discuss whether the minimum wage will make domestic workers as a group better off.",
        points: [
          `For: the ${fmt(ldd[iD])} thousand still employed earn US\\$20 a month more, reducing poverty.`,
          "For: protects workers with weak bargaining power from exploitation; extra spending helps local shops.",
          `Against: employment falls by ${lostD} thousand; these workers lose their income entirely.`,
          "Against: many employers may ignore the law or move to informal arrangements; enforcement in homes is difficult.",
          "Weighs the gain to those employed against the loss to those without work (for example total wages, elasticity of demand).",
          "Justified conclusion.",
        ],
        hints: ["Compare those who keep their jobs with those who lose them."],
        modelAnswer: `The ${fmt(ldd[iD])} thousand domestic workers who keep their jobs gain US\\$20 a month, which matters for low-paid households, and the law protects workers who have little bargaining power. However, ${lostD} thousand lose their jobs and their whole income, and others who want work cannot find it. Because work in private homes is hard to inspect, some employers may pay less than the minimum or offer informal arrangements. In fact total wages paid to the group fall, from ${money(90 * D.equilibrium.quantity * 1000)} to ${money(110 * ldd[iD] * 1000)} a month, because demand for domestic workers is quite responsive to the wage. So, although those in work are better off, the group as a whole is not; a lower minimum wage, closer to the equilibrium, would protect workers with fewer job losses.`,
      }),
    ],
    explanation: "(a) US\\$90. (b) Surplus = Qs − Qd at US\\$110. (c) Fall = Q at equilibrium − Qd at US\\$110. (d) Isolation, easy replacement, few alternatives. (e) Higher pay for some against job losses for others.",
    hints: ["The minimum wage is above equilibrium."],
  });
  check("total wages fall", 110 * ldd[iD] < 90 * D.equilibrium.quantity ? 1 : 0, 1);

  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "Workers at a fictional bus company in Bulawayo want a 10% pay rise. The company says it can afford only 4%. The workers' union has 90% of the drivers as members, and trained bus drivers are in short supply.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the process by which the union and the company negotiate the pay rise.", accepted: ["collective bargaining"], model: "collective bargaining", wrong: ["arbitration"], explanation: "Negotiation between a union and an employer over pay is collective bargaining." }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "If talks fail, which is an example of industrial action the drivers could take?",
        options: [["An overtime ban", "Correct: refusing extra hours puts pressure on the company."], ["A merger", "A merger joins firms; it is not industrial action."], ["A lock-out", "A lock-out is action by employers."], ["A price ceiling", "A price ceiling is a government price control."]],
        answer: "A",
        explanation: "Overtime bans, work-to-rules, go-slows and strikes are forms of industrial action by workers.",
      }),
      P.manual({ label: "(c)", marks: 6, stem: "Analyse **two** reasons why the union is likely to have strong bargaining power in this dispute.", points: ["High membership (90% of drivers).", "So a strike would stop almost all buses / the company cannot keep running services.", "Trained drivers are in short supply.", "So the company cannot easily replace striking drivers.", "Developed effect: lost fares during a strike cost the company more than the pay rise.", "Developed effect: the company may settle above 4% to avoid disruption."], modelAnswer: "First, 90% of the drivers are members, so if the union calls a strike almost no buses would run and the company would lose nearly all its fare revenue. Second, trained bus drivers are scarce, so the company cannot hire replacements quickly. Because a strike would cost the company more in lost fares than a higher pay rise, it is likely to settle above its 4% offer, closer to the union's 10%." }),
    ],
    explanation: "(a) Collective bargaining. (b) Overtime ban, work-to-rule, go-slow or strike. (c) High membership and scarce skills make a strike costly and replacement hard.",
    hints: ["What would happen to the company if the drivers stopped work?"],
  });

  b.card("DEFINITION", "Trade union", "An organisation of workers that acts together to improve its members' pay, conditions and job security.");
  b.card("DEFINITION", "Collective bargaining", "Negotiation over pay and conditions between a trade union and an employer or employers' association.");
  b.card("DEFINITION", "Employers' association", "An organisation of employers that represents their interests in wage negotiations and to government.", null, { applies: ZIM });
  b.card("DEFINITION", "National minimum wage", "A legal lowest wage that employers must pay; a price floor in the labour market.");
  b.card("CONCEPT", "Forms of industrial action by workers", "Overtime ban, work-to-rule, go-slow, strike.");
  b.card("CONCEPT", "What strengthens a union's bargaining power?", "High membership; skills that are hard to replace; a profitable firm with strong demand; labour a small share of costs; laws protecting strikes.");
  b.card("FACT", "What does a minimum wage above equilibrium cause?", "A surplus of labour (unemployment): fewer workers are hired and more seek work; those employed earn more.");
  b.card("CONCEPT", "Ways government intervenes in wage setting", "Minimum wages; labour laws; its own pay as an employer; conciliation and arbitration; agreements between government, employers and unions.");
  b.card("CONCEPT", "Advantages and disadvantages of a minimum wage", "Advantages: less poverty, less exploitation, more spending. Disadvantages: possible unemployment, higher costs and prices, informal work, replacement by machines.");
});
