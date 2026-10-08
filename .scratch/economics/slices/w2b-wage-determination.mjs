// W2b: econ.labour.wage-determination — derived demand, demand for and supply of labour, the equilibrium wage.
import { concept, P, schedule, money, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.wage-determination", { file: "labour/wage-determination", keyPrefix: "labour.wage-determination" }, (b) => {
  // Kombi drivers, weekly wage: Ld = 1300 - 10w, Ls = 100 + 20w; eq w = 40, L = 900.
  const w = [30, 35, 40, 45, 50];
  const ld = w.map((x) => 1300 - 10 * x), ls = w.map((x) => 100 + 20 * x);
  const K = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Weekly wage (US\\$)", qdHeader: "Drivers demanded", qsHeader: "Drivers supplied", requireEquilibrium: true });
  check("kombi eq", K.equilibrium.price, 40);
  const i35 = w.indexOf(35);
  const short35 = K.excess[i35];
  check("short35", short35, 150);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is the demand for labour described as a **derived demand**?",
    options: [
      ["It comes from the demand for the goods and services that workers produce", "Correct: firms hire workers because consumers want their output."],
      ["It is worked out by the government from the size of the labour force", "Governments do not calculate firms' demand for workers."],
      ["It depends only on the wage rate that trade unions agree with employers", "The wage affects the quantity demanded, but that is not why demand is called derived."],
      ["It comes from workers' need to earn an income to buy goods", "That explains the supply of labour, not the demand for it."],
    ],
    answer: "A",
    explanation: "Derived demand means the demand for a factor comes from the demand for the product it helps to make: no demand for houses, no demand for bricklayers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change is most likely to **increase** the demand for tobacco graders in a fictional auction town?",
    options: [
      ["A rise in world demand for tobacco leaf", "Correct: more demand for tobacco raises the derived demand for graders."],
      ["A rise in the wage paid to tobacco graders", "A higher wage causes a contraction of demand, a movement along the curve."],
      ["A new machine that grades leaf without workers", "A machine that replaces graders reduces demand for them."],
      ["A rise in the number of trained graders looking for work", "This increases the supply of graders, not the demand for them."],
    ],
    answer: "A",
    explanation: "Demand for graders is derived from demand for tobacco. Greater demand for tobacco shifts the demand curve for graders to the right.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change is most likely to **reduce** the supply of labour to nursing in a country?",
    options: [
      ["Many nurses emigrate to work abroad for higher pay", "Correct: fewer nurses are available, so supply shifts left."],
      ["Nursing training is shortened from four years to three", "Easier entry would increase the supply of nurses."],
      ["Hospitals offer free housing to nursing staff", "A better non-wage benefit attracts more people, raising supply."],
      ["Wages in other jobs open to school leavers fall", "Other jobs become less attractive, so more people choose nursing."],
    ],
    answer: "A",
    explanation: "Emigration lowers the number of nurses available at every wage, shifting the supply curve to the left; the other changes would raise supply.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The table shows the weekly labour market for kombi drivers in a fictional city.\n\n${K.md}\n\nWhat is the equilibrium weekly wage?`,
    options: [
      [money(40), `Correct: ${fmt(K.equilibrium.quantity)} drivers are demanded and ${fmt(K.equilibrium.quantity)} are supplied.`],
      [money(35), `At US\\$35 there is a shortage of ${short35} drivers.`],
      [money(45), `At US\\$45 there is a surplus of ${-K.excess[w.indexOf(45)]} drivers.`],
      [money(50), "This is the highest wage, where the surplus of drivers is largest."],
    ],
    answer: "A",
    explanation: `The equilibrium wage is where the quantity of labour demanded equals the quantity supplied: US\\$40, with ${fmt(K.equilibrium.quantity)} drivers employed.`,
  });
  // Welders (own data): shortage below equilibrium.
  const ww = [62, 66, 70, 74, 78];
  const ldw = ww.map((x) => 2330 - 17 * x), lsw = ww.map((x) => -260 + 20 * x);
  const W = schedule({ prices: ww, qd: ldw, qs: lsw, priceHeader: "Weekly wage (US\\$)", qdHeader: "Welders demanded", qsHeader: "Welders supplied", requireEquilibrium: true });
  check("welders eq", W.equilibrium.price, 70);
  const iW = ww.indexOf(66);
  const shortW = W.excess[iW];
  check("shortW", shortW, 148);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: shortW, daily: true,
    stem: `The table shows the weekly market for welders in a fictional industrial town.\n\n${W.md}\n\nIf firms paid only US\\$66 a week, how many vacancies for welders would be left unfilled?`,
    wrong: [ldw[iW], lsw[iW]],
    explanation: `At US\\$66, ${fmt(ldw[iW])} welders are demanded but only ${fmt(lsw[iW])} are supplied: ${fmt(ldw[iW])} − ${fmt(lsw[iW])} = **${shortW}** unfilled vacancies (a shortage of labour). ${fmt(ldw[iW])} and ${fmt(lsw[iW])} are the two quantities, not the gap.`,
  });
  // Security guards (own data): wage bill.
  const g3 = { w: [57, 61, 65], d: [472, 436, 400], s: [400, 436, 472] };
  const G3 = schedule({ prices: g3.w, qd: g3.d, qs: g3.s, priceHeader: "Weekly wage (US\\$)", qdHeader: "Guards demanded", qsHeader: "Guards supplied", requireEquilibrium: true });
  const billG = G3.equilibrium.price * G3.equilibrium.quantity;
  check("billG", billG, 26596);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: billG,
    stem: `The table shows the weekly market for security guards in a fictional town.\n\n${G3.md}\n\nCalculate the total weekly wage bill for guards at the equilibrium.`,
    wrong: [65 * 472, 57 * 472],
    explanation: `Wage bill = equilibrium wage × number employed = 61 × ${G3.equilibrium.quantity} = **${money(billG)}** a week. Using the highest wage and supply (${money(65 * 472)}) ignores that only the workers demanded are hired.`,
  });
  // Plumbers (own data): supply falls by 84 at every wage.
  const wp = [20, 24, 28, 32, 36];
  const ldp = wp.map((x) => 905 - 12 * x), lsp = wp.map((x) => 317 + 9 * x);
  const PL = schedule({ prices: wp, qd: ldp, qs: lsp, priceHeader: "Daily wage (US\\$)", qdHeader: "Plumbers demanded", qsHeader: "Plumbers supplied", requireEquilibrium: true });
  check("plumbers eq", PL.equilibrium.price, 28);
  const lsp2 = lsp.map((x) => x - 84);
  const PL2 = schedule({ prices: wp, qd: ldp, qs: lsp2, requireEquilibrium: true });
  check("plumbers eq2", PL2.equilibrium.price, 32);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: PL2.equilibrium.price,
    stem: `The table shows the daily market for plumbers in a fictional city.\n\n${PL.md}\n\nA new rule requires every plumber to hold an extra licence, and 84 fewer plumbers are supplied at every wage. Demand does not change. Calculate the new equilibrium daily wage.`,
    wrong: [28, 24],
    hints: ["Subtract 84 from every figure in the supply column.", "Find the wage at which the new supply equals demand."],
    explanation: `1. New supply: ${lsp2.map((x, k) => `US\\$${wp[k]}: ${fmt(x)}`).join("; ")}.\n2. At US\\$32, demand is ${fmt(ldp[3])} and new supply is ${fmt(lsp2[3])}: equal.\n3. The new equilibrium wage is **${money(32)}** and employment falls from ${fmt(PL.equilibrium.quantity)} to ${fmt(PL2.equilibrium.quantity)}.\n4. US\\$28 is the old wage: at US\\$28 there is now a shortage of ${PL2.excess[2]} plumbers, which pushes the wage up.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A rise in the wage rate shifts the demand curve for labour to the left.",
    answer: false,
    explanation: "False. A change in the wage causes a **contraction** of demand, a movement along the curve. Shifts are caused by other factors, such as a fall in demand for the product.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the supply of labour to an occupation increases while demand is unchanged, the equilibrium wage falls and employment rises.",
    answer: true,
    explanation: "True. The supply curve shifts right; at the old wage there is a surplus of workers, so the wage falls and more workers are hired (an extension of demand).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A fall in demand for gold reduces the demand for miners, so the demand curve for miners shifts to the {{blank:a}}. At the old wage there is a {{blank:b}} of labour, so the wage {{blank:c}} and employment {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["left"], choices: ["left", "right"] },
      { id: "b", accepted: ["surplus"], choices: ["shortage", "surplus"] },
      { id: "c", accepted: ["falls"], choices: ["rises", "falls"] },
      { id: "d", accepted: ["falls"], choices: ["rises", "falls"] },
    ],
    wrong: [["right", "shortage", "rises", "rises"]],
    explanation: "Less derived demand shifts DL left; more workers want jobs than are offered at the old wage (a surplus), so the wage and employment both fall.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each change in a labour market with its effect on the equilibrium wage and employment (demand and supply curves have their normal slopes).",
    pairs: [
      ["Demand for the product rises", "Wage rises, employment rises"],
      ["Many workers emigrate", "Wage rises, employment falls"],
      ["New machines replace workers", "Wage falls, employment falls"],
      ["Training for the job is made shorter", "Wage falls, employment rises"],
    ],
    hints: ["Decide first which curve shifts and which way."],
    explanation: "Demand right → wage and employment up; supply left → wage up, employment down; demand left → both down; supply right → wage down, employment up.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A clothing factory gives its machinists better sewing machines, and each machinist can now produce more shirts per hour. Demand for shirts is strong. What is the most likely effect on the factory's demand for machinists?",
    options: [
      ["It increases, because each machinist is now worth more to the firm", "Correct: higher productivity makes each worker more valuable, so demand rises."],
      ["It falls, because fewer machinists are needed to make the same output", "That can happen if demand for shirts is weak; here demand is strong, so the firm can sell the extra output."],
      ["It does not change, because only the wage affects the demand for labour", "Productivity and demand for the product also shift demand."],
      ["It increases, because the machinists will ask for a higher wage", "A higher wage would reduce the quantity of labour demanded."],
    ],
    answer: "A",
    hints: ["What does a more productive worker add to the firm's output and revenue?"],
    explanation: "When workers' productivity rises and the extra output can be sold, each worker adds more to revenue, so the demand curve for labour shifts right.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many trained teachers from Country Z arrive to work in a neighbouring country. Which describes the effect on the neighbouring country's market for teachers?",
    options: [
      ["Supply of teachers shifts right; the wage falls and employment rises", "Correct: more teachers are available at every wage."],
      ["Demand for teachers shifts right; the wage and employment both rise", "Immigrant teachers add to supply, not to schools' demand for teachers."],
      ["Supply of teachers shifts left; the wage rises and employment falls", "That is the effect on Country Z, which loses teachers."],
      ["Demand for teachers shifts left; the wage and employment both fall", "Nothing has reduced schools' need for teachers."],
    ],
    answer: "A",
    hints: ["Immigrants are extra people offering to work."],
    explanation: "Immigration increases the supply of labour: SL shifts right, causing a surplus at the old wage, so the wage falls and more teachers are employed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a factor that affects the **demand** for labour rather than the supply of labour?",
    options: [
      ["The price of machines that could do the same work", "Correct: cheaper machines can replace workers, so firms' demand for labour changes."],
      ["The length of training needed to enter the job", "Training requirements limit how many people can offer to work: supply."],
      ["The wages paid in other occupations", "Wages elsewhere affect how many people choose this job: supply."],
      ["The working conditions and holidays in the job", "Non-wage factors attract or put off workers: supply."],
    ],
    answer: "A",
    explanation: "Demand for labour depends on demand for the product, productivity, and the price and productivity of capital; the other three affect workers' willingness to supply labour.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a fictional country, demand for software developers rises sharply. Training a new developer takes four years. What happens to developers' wages and employment in the **first year**?",
    options: [
      ["The wage rises a lot and employment rises only a little", "Correct: supply is inelastic in the short run, so most of the effect is on the wage."],
      ["The wage rises a little and employment rises a lot", "That needs elastic supply, which long training prevents."],
      ["The wage falls and employment rises", "A rise in demand cannot lower the equilibrium wage."],
      ["The wage and employment stay the same", "With a rise in demand there is a shortage at the old wage, so the wage rises."],
    ],
    answer: "A",
    hints: ["How quickly can new developers be trained?", "Inelastic supply: a steep supply curve."],
    explanation: "With long training, few extra developers can be found quickly: supply is inelastic, so the right shift in demand raises the wage sharply while employment grows slowly. Over time, more people train and supply becomes more elastic.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors that affect the supply of labour to an occupation such as mining.",
    points: [
      "Identifies a factor (for example the wage compared with other jobs).",
      "Explains it: higher pay than other jobs attracts more workers, so supply increases.",
      "Identifies a second factor (for example danger / working conditions, training needed, population of the area).",
      "Explains it: dangerous, unpleasant conditions put people off, so fewer offer to work at each wage.",
    ],
    modelAnswer: "First, the wage compared with other jobs: if mining pays more than farming or building, workers move into mining and the supply of labour rises. Second, working conditions: mining is dangerous and physically hard and mines are often far from towns, so many people will not do the work unless they are paid more, which reduces supply at each wage.",
    hints: ["Identify, then explain how each changes the number of workers willing to work."],
    explanation: "One mark for each factor identified and one for explaining how it changes the number of workers offering to work.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Describe the diagram you would use to show the effect of a rise in demand for construction workers on their wage and employment.",
    points: [
      "Wage rate on the vertical axis, quantity of labour (number of workers) on the horizontal axis.",
      "Downward-sloping demand curve DL1 and upward-sloping supply curve SL crossing at W1/Q1.",
      "Demand curve shifts to the right, from DL1 to DL2.",
      "New equilibrium at a higher wage W2 and higher employment Q2.",
    ],
    modelAnswer: "I would put the wage rate on the vertical axis and the number of construction workers on the horizontal axis. A downward-sloping demand curve DL1 crosses an upward-sloping supply curve SL at the equilibrium wage W1 and employment Q1. The rise in demand is shown by DL1 shifting right to DL2. The new equilibrium is at W2, which is higher than W1, and at Q2, which is greater than Q1.",
    hints: ["Axes, both curves, the shift, the new equilibrium."],
    explanation: "Credit labelled axes, both curves with the first equilibrium, the rightward shift of demand, and the higher wage and employment.",
  });

  // Structured 1: platinum mine workers (fictional district).
  const wm = [60, 70, 80, 90, 100];
  const ldm = wm.map((x) => 4200 - 20 * x), lsm = wm.map((x) => 600 + 25 * x);
  const M = schedule({ prices: wm, qd: ldm, qs: lsm, priceHeader: "Weekly wage (US\\$)", qdHeader: "Mine workers demanded", qsHeader: "Mine workers supplied", requireEquilibrium: true });
  check("mine eq", M.equilibrium.price, 80);
  const billM = 80 * M.equilibrium.quantity;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the weekly market for mine workers in a fictional mining district.\n\n${M.md}\n\nThe world price of platinum has just risen sharply, and the district's mines plan to expand output.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 80, stem: "State the equilibrium weekly wage.", wrong: [70], explanation: `At US\\$80, ${fmt(M.equilibrium.quantity)} workers are demanded and supplied.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: billM, stem: "Calculate the total weekly wage bill at the equilibrium.", wrong: [100 * lsm[4]], explanation: `80 × ${fmt(M.equilibrium.quantity)} = ${money(billM)} a week.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which describes the effect of the higher platinum price on this labour market?",
        options: [
          ["Demand for mine workers shifts right; the wage rises", "Correct: derived demand for workers rises with demand for platinum output."],
          ["Supply of mine workers shifts right; the wage falls", "The platinum price changes the mines' demand, not workers' supply."],
          ["Demand for mine workers shifts left; the wage falls", "Expanding mines want more workers, not fewer."],
          ["There is no change, because only wages affect the market", "The demand for labour is derived from the profitability of output."],
        ],
        answer: "A",
        explanation: "Mines can sell more platinum at a higher price, so they want more workers at every wage: DL shifts right and the wage rises.",
      }),
      P.manual({
        label: "(d)", marks: 8, levels: LV(8),
        stem: "Discuss whether the rise in the platinum price will benefit the mine workers of the district.",
        points: [
          "For: higher demand for labour raises the equilibrium wage, so existing workers earn more.",
          "For: employment rises, so some unemployed people in the district find jobs.",
          "For: mines may offer overtime, bonuses or better benefits to attract scarce workers.",
          "Against: the gain depends on supply; if many workers move in from other areas, the wage rise is small.",
          "Against: mines may use the extra profit to buy machines instead of hiring workers.",
          "Against: world prices can fall again, so jobs and higher wages may not last.",
          "Against/other: dangerous work and longer hours; living costs in the district may rise.",
          "Justified conclusion (for example workers benefit in the short run, especially if supply is inelastic, but the gains may be temporary).",
        ],
        hints: ["Think about the size of the wage rise and whether it lasts."],
        modelAnswer: "The higher price of platinum makes mining more profitable, so the mines' derived demand for workers rises. At the old wage of US\\$80 there is a shortage of labour, so the wage rises and more workers are employed, which benefits both existing workers and the unemployed of the district. Mines may also offer bonuses and overtime. However, how much wages rise depends on supply: if workers from other districts move in, supply rises and the wage increase is small. The mines might also invest the extra profit in machines that replace some workers. World metal prices are volatile, so if the price falls again workers may lose the gains. Overall, workers are likely to benefit in the short run, but the size and length of the benefit are uncertain.",
      }),
    ],
    explanation: "(a) US\\$80. (b) Wage × employment. (c) Derived demand rises. (d) Weigh higher wages and jobs against the size and permanence of the change.",
    hints: ["Use the row where demand equals supply.", "Demand for labour is derived."],
  });

  // Structured 2: hotel workers at Victoria Falls (fictional data), 8 marks.
  const wh = [44, 52, 60, 68, 76];
  const ldh = wh.map((x) => 1130 - 9 * x), lsh = wh.map((x) => 170 + 7 * x);
  const H = schedule({ prices: wh, qd: ldh, qs: lsh, priceHeader: "Weekly wage (US\\$)", qdHeader: "Hotel workers demanded", qsHeader: "Hotel workers supplied", requireEquilibrium: true });
  check("hotel eq", H.equilibrium.price, 60);
  const ldh2 = ldh.map((x) => x - 128);
  const H2 = schedule({ prices: wh, qd: ldh2, qs: lsh, requireEquilibrium: true });
  check("hotel eq2", H2.equilibrium.price, 52);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `The table shows the weekly market for hotel workers in a fictional tourist town near Victoria Falls.\n\n${H.md}\n\nA fall in the number of foreign tourists reduces the demand for hotel workers by 128 at every wage.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: H2.equilibrium.price, stem: "Calculate the new equilibrium weekly wage.", wrong: [60], explanation: `New demand at US\\$52 is ${fmt(ldh2[1])}, equal to supply of ${fmt(lsh[1])}: the new equilibrium wage is US\\$52.` }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: H.equilibrium.quantity - H2.equilibrium.quantity, stem: "By how many workers does employment fall?", wrong: [128], explanation: `Employment falls from ${fmt(H.equilibrium.quantity)} to ${fmt(H2.equilibrium.quantity)}: ${H.equilibrium.quantity - H2.equilibrium.quantity} workers. It falls by less than 128 because the lower wage leads hotels to keep some workers and some people stop offering to work.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why the demand for hotel workers fell when the number of tourists fell.",
        points: [
          "Demand for labour is derived demand.",
          "Fewer tourists means less demand for hotel rooms, meals and tours.",
          "Hotels need fewer workers to produce fewer services / revenue falls.",
          "So hotels want fewer workers at every wage: the demand curve shifts left.",
        ],
        modelAnswer: "The demand for hotel workers is a derived demand: hotels hire cooks, cleaners and guides because tourists want their services. When fewer tourists come, hotels sell fewer rooms and meals, so they need fewer staff to provide them and their revenue falls. They therefore want fewer workers at every wage, and the demand curve for hotel workers shifts to the left.",
      }),
    ],
    explanation: `(a) US\\$52. (b) Employment falls by ${H.equilibrium.quantity - H2.equilibrium.quantity}. (c) Derived demand: fewer tourists, fewer services needed, fewer workers.`,
    hints: ["Subtract 128 from each demand figure.", "Compare the old and new equilibrium quantities."],
  });

  b.card("DEFINITION", "Derived demand", "Demand for a factor of production that comes from the demand for the product it helps to make.", "Example: demand for bricklayers comes from demand for houses.");
  b.card("DEFINITION", "Labour market", "The market where workers supply labour and employers demand it; the price is the wage rate.");
  b.card("DEFINITION", "Equilibrium wage", "The wage at which the quantity of labour demanded equals the quantity supplied.");
  b.card("CONCEPT", "Name four factors that shift the demand for labour.", "Demand for the product; productivity of labour; price and productivity of machines (capital); other labour costs such as employment taxes.");
  b.card("CONCEPT", "Name four factors that shift the supply of labour to an occupation.", "Wages in other jobs; non-wage factors (conditions, security); training and qualifications needed; size of the working population (migration, school-leaving and retirement ages).");
  b.card("FACT", "What happens to the wage and employment when the demand for labour increases?", "Both rise: DL shifts right, causing a shortage at the old wage.");
  b.card("FACT", "What happens to the wage and employment when the supply of labour decreases?", "The wage rises and employment falls: SL shifts left.");
  b.card("CONCEPT", "Why do occupations with long training often pay high wages?", "Few people can enter, so supply is low and inelastic; with strong demand the equilibrium wage is high.");
  b.card("FORMULA", "Wage bill", "Wage bill = wage rate × number of workers employed.");
});
