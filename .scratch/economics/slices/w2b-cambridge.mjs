// W2b: Cambridge 0455 Paper 2 exam-format items: Section A x1 (a labour market with wage, employment and output data,
// STRUCTURED 20, ANALYSIS) and Section B x1 (STRUCTURED 20 = 2/4/6/8, EVALUATION). Fictional data, computed here.
import { concept, P, CAM, pctChange, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });

concept("econ.production.factor-demand", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: a construction boom and the labour market in Country Z.
  {
    const S = {
      con: { w: [435, 522], emp: [60, 69] },
      man: { w: [340, 357], emp: [120, 105], out: [2160, 2205] },
      agr: { w: [175, 182], emp: [680, 646] },
    };
    const pw = { con: pctChange(...S.con.w), man: pctChange(...S.man.w), agr: pctChange(...S.agr.w) };
    check("pw con", pw.con, 20); check("pw man", pw.man, 5); check("pw agr", pw.agr, 4);
    const pEmpCon = pctChange(...S.con.emp);
    check("pEmpCon", pEmpCon, 15);
    const prod = S.man.out.map((o, i) => o / S.man.emp[i]); // US$ thousand per worker
    check("prod0", prod[0], 18); check("prod1", prod[1], 21);
    const pProd = pctChange(prod[0], prod[1]);
    const t = table(
      ["Sector", "Average monthly wage, Year 1 (US\\$)", "Average monthly wage, Year 2 (US\\$)", "Workers, Year 1 (thousands)", "Workers, Year 2 (thousands)"],
      [["Construction", S.con.w[0], S.con.w[1], S.con.emp[0], S.con.emp[1]], ["Manufacturing", S.man.w[0], S.man.w[1], S.man.emp[0], S.man.emp[1]], ["Agriculture", S.agr.w[0], S.agr.w[1], S.agr.emp[0], S.agr.emp[1]]],
    );
    const passage = [
      "Country Z is a fictional lower-middle-income country. Most of its workers are employed in agriculture, where many grow maize and vegetables on small plots and wages are low. Over the last two years the government has spent heavily on new roads, bridges and housing, and a group of private investors has begun building hotels and shopping centres in the capital.",
      "This construction boom has increased the demand for builders, electricians, plumbers and machine operators. Construction firms report that they cannot find enough skilled workers, and average wages in construction have risen much faster than in other sectors. Some firms have started to recruit workers from neighbouring countries.",
      "At the same time, many farm workers are looking for better-paid work. Few of them have the skills that construction firms need, and training courses are expensive and mostly found in the capital, a long and costly journey from the main farming areas. Rents in the capital have also risen sharply, and many farm workers have families and small plots of land that they do not want to leave.",
      "Manufacturing firms have faced rising costs and competition from imports. Several have replaced older equipment with modern machines, employing fewer workers. The total value of manufacturing output rose from US\\$2,160 million in Year 1 to US\\$2,205 million in Year 2.",
      "The government is considering a scheme that would pay for farm workers to attend construction training courses and give them a travel and housing allowance while they train. Critics say the money would be better spent on improving farming, which still employs most of the country's workers.",
    ].join("\n\n");
    const words = passage.split(/\s+/).length;
    if (words < 250 || words > 400) throw new Error(`Section A passage has ${words} words`);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.labour.wage-determination", "econ.labour.wage-differentials", "econ.labour.mobility", "econ.production.productivity", "econ.production.factor-demand"],
      stem: `Read the information and study the table, then answer all parts.\n\n${passage}\n\n**Table 1: wages and employment in Country Z**\n\n${t}`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "Using Table 1, identify the sector in which the average wage rose by the largest percentage between Year 1 and Year 2.",
          options: [["Construction", "Correct: +20%."], ["Manufacturing", "+5%."], ["Agriculture", "+4%."], ["All three sectors rose by the same percentage", "The percentages differ."]],
          answer: "A",
          explanation: `Construction ${fmt(pw.con, 1)}%, manufacturing ${fmt(pw.man, 1)}%, agriculture ${fmt(pw.agr, 1)}%.`,
        }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pEmpCon, stem: "Calculate the percentage change in the number of construction workers between Year 1 and Year 2. Give your answer to one decimal place.", wrong: [((69 - 60) / 69) * 100, 9], explanation: `(69 − 60) ÷ 60 × 100 = ${fmt(pEmpCon, 1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: prod[1], stem: "Using the passage and Table 1, calculate output per worker in manufacturing in Year 2, in thousands of US dollars per worker.", wrong: [prod[0], 2205 / 120], explanation: `US\\$2,205 million ÷ 105 thousand workers = US\\$${prod[1]} thousand per worker.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: pProd, stem: "Calculate the percentage increase in output per worker in manufacturing between Year 1 and Year 2. Give your answer to one decimal place.", wrong: [((prod[1] - prod[0]) / prod[1]) * 100, pctChange(2160, 2205)], explanation: `Year 1: 2,160 ÷ 120 = 18. Year 2: 2,205 ÷ 105 = 21. (21 − 18) ÷ 18 × 100 = ${fmt(pProd, 1)}%. The ${fmt(pctChange(2160, 2205), 1)}% rise in total output understates it because fewer workers were employed.` }),
        P.manual({
          label: "(e)", marks: 7,
          stem: "Analyse why average wages rose faster in construction than in agriculture.",
          points: [
            "Demand for construction workers is derived from the demand for roads, housing and hotels, which rose sharply.",
            "So the demand curve for construction labour shifted right, raising the wage.",
            "Construction needs skills; the supply of skilled workers is limited / inelastic in the short run.",
            "Farm workers cannot easily move into construction: low occupational mobility (lack of skills, costly training).",
            "And low geographical mobility (distance, travel costs, high rents in the capital).",
            "Agriculture has a large supply of unskilled workers and low productivity, keeping wages low.",
            "Uses data: construction wages +20% against agriculture +4%.",
          ],
          modelAnswer: "The demand for construction workers is derived from the demand for buildings and infrastructure, which rose sharply with government spending and private investment, so the demand for construction labour shifted to the right. Because construction needs skills, the supply of qualified workers is limited and cannot rise quickly, so the higher demand raised wages rather than employment alone: construction wages rose by 20%. Farm workers could not easily fill the gap, because they lack the skills (low occupational mobility) and training is costly and far away, while high rents in the capital reduce geographical mobility. In agriculture, a large supply of unskilled workers and low output per worker kept wages almost unchanged, rising by only 4%.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the government should pay for farm workers to train for construction jobs.",
          points: [
            "For: increases occupational and geographical mobility; fills skills shortages in construction.",
            "For: farm workers move to higher-paid jobs; incomes and output rise; construction costs fall.",
            "Against: cost / opportunity cost (improving farming, which employs most workers).",
            "Against: the boom may not last; trainees may not complete the course or find jobs; recruitment from abroad continues.",
            "Considers alternatives (training centres in rural areas; firms paying for apprenticeships).",
            "Justified conclusion.",
          ],
          hints: ["Will the construction jobs still be there when training ends?"],
          modelAnswer: "The scheme would raise both occupational mobility (by giving farm workers skills) and geographical mobility (by paying travel and housing costs), helping construction firms fill vacancies and letting farm workers move from low-paid to better-paid work, which raises incomes and output. However, it costs money that could improve farming, where most people still work, and the construction boom may slow once the roads and hotels are built, leaving newly trained workers without jobs. A cheaper option might be training centres in rural areas or apprenticeships paid partly by construction firms. On balance, a targeted scheme is worthwhile while the shortage lasts, if firms share the cost.",
        }),
      ],
      explanation: `Construction wages rose most (${fmt(pw.con, 1)}%); construction employment +${fmt(pEmpCon, 1)}%; manufacturing output per worker rose from 18 to 21 thousand US dollars (+${fmt(pProd, 1)}%).`,
      hints: ["Percentage change = change ÷ original × 100.", "Output per worker = output ÷ workers (watch the units).", "Think about derived demand and mobility."],
    });
  }

  // ---------------- Section B: automation in a car-assembly firm.
  {
    const w0 = 1250, o0 = 37500, w1 = 850, o1 = 42500; // workers and vehicles a year
    const p0 = o0 / w0, p1 = o1 / w1;
    check("p0", p0, 30); check("p1", p1, 50);
    const subB1 = P.num({ label: "(i)", marks: 2, kind: "plain", value: p1, stem: `After installing robots, the firm employs ${w1} workers and assembles ${fmt(o1)} vehicles a year. Before, ${fmt(w0)} workers assembled ${fmt(o0)} vehicles a year. Calculate output per worker after the change.`, wrong: [p0, o1 / w0], explanation: `${fmt(o1)} ÷ ${w1} = ${p1} vehicles per worker a year (before: ${fmt(o0)} ÷ ${fmt(w0)} = ${p0}).` });
    const subB2 = P.manual({ label: "(ii)", marks: 2, stem: "Explain why output per worker rose.", points: ["Each worker now works with more / better capital (robots).", "So the same work is done faster and more output is produced per worker."], modelAnswer: "Each remaining worker now works with robots, which do much of the assembly faster and more accurately, so more vehicles are produced per worker." });
    const wage = 5000, wbill0 = w0 * wage, wbill1 = w1 * wage;
    const pBill = pctChange(wbill0, wbill1);
    check("pBill", pBill, -32);
    const subC1 = P.num({ label: "(i)", marks: 2, kind: "pct", value: pBill, stem: `Each worker is paid US\\$${fmt(wage)} a year. Calculate the percentage change in the firm's annual wage bill. Give a fall as a negative number, to one decimal place.`, wrong: [Math.abs(pBill), ((wbill1 - wbill0) / wbill1) * 100], explanation: `Before: ${fmt(w0)} × ${fmt(wage)} = US\\$${fmt(wbill0)}. After: ${w1} × ${fmt(wage)} = US\\$${fmt(wbill1)}. (${fmt(wbill1)} − ${fmt(wbill0)}) ÷ ${fmt(wbill0)} × 100 = ${fmt(pBill, 1)}%.` });
    const subC2 = P.mcq({
      label: "(ii)", marks: 1,
      stem: "Which change would most encourage the firm to choose capital-intensive production?",
      options: [["A rise in wages relative to the price of robots", "Correct: labour becomes relatively dearer."], ["A fall in demand for the firm's vehicles", "Lower output makes expensive machines less worthwhile."], ["A large supply of cheap unskilled labour", "Favours labour-intensive methods."], ["A rise in the interest rate on loans for machinery", "Makes capital dearer."]],
      answer: "A",
      explanation: "Firms choose the method with the lowest cost; when labour becomes relatively dearer, capital-intensive methods become more attractive.",
    });
    const subC3 = P.manual({ label: "(iii)", marks: 3, stem: "Analyse why a car-assembly firm is likely to adopt capital-intensive production.", points: ["Large, standardised output, so the high cost of robots is spread over many vehicles (low unit cost).", "Precision and consistent quality are essential in vehicle assembly.", "Robots can work long hours without breaks, raising output and reducing labour problems."], modelAnswer: "Car assembly produces large numbers of identical vehicles, so the high cost of robots is spread over many units, giving a low cost per vehicle. Assembly needs precision and consistent quality, which robots provide, and they can work long shifts without breaks, raising output and avoiding problems such as absence." });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.production.factor-demand", "econ.production.productivity", "econ.labour.wage-determination"],
      stem: "A fictional car-assembly firm in a middle-income country has replaced many of its assembly-line workers with robots. The firm says the change will make its vehicles cheaper and better; the workers' union says that hundreds of jobs have been lost in a town with few other employers.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Capital-intensive production uses a high proportion of {{blank:a}} relative to {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["capital"], choices: ["capital", "labour", "land"] },
            { id: "b", accepted: ["labour"], choices: ["capital", "labour", "enterprise"] },
          ],
          wrong: [["labour", "capital"]],
          explanation: "Capital-intensive: relatively more machinery and equipment than workers.",
        }),
        nested("(b)", 4, "Use the information about the firm's workforce and output.", [subB1, subB2]),
        nested("(c)", 6, "The firm's wage bill and its choice of production method.", [subC1, subC2, subC3]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the move to capital-intensive production will benefit the economy of the country.",
          points: [
            "For: higher productivity and lower unit costs; cheaper vehicles for consumers.",
            "For: more competitive firm; more exports / fewer imports; economic growth.",
            "For: remaining workers more skilled and possibly better paid; demand for technicians and robot makers.",
            "Against: job losses / technological unemployment, especially in a town with few other employers.",
            "Against: lower incomes reduce local spending (shops, services); government pays more benefits / loses tax.",
            "Against: robots may be imported (foreign currency); breakdowns stop production; inflexible if demand falls.",
            "Considers time: short-run losses versus long-run gains if workers retrain and move.",
            "Justified conclusion.",
          ],
          hints: ["Who gains and who loses, and in the short run or the long run?"],
          modelAnswer: "The robots raise output per worker from 30 to 50 vehicles a year and cut the wage bill by 32%, so vehicles become cheaper and more competitive, which can increase exports, reduce imports and support economic growth; consumers gain lower prices, and the remaining, more skilled workers may be paid more. However, 400 workers lost their jobs in a town with few other employers, so unemployment rises, local shops lose customers and the government may lose tax revenue and pay more support. The robots may be imported, using foreign currency, and breakdowns or a fall in demand leave the firm with costly idle machines. In the long run the economy is likely to benefit if the displaced workers can retrain and find new jobs, but in the short run the town bears heavy costs, so the gains depend on support for retraining and mobility.",
        }),
      ],
      explanation: `(a) Capital, labour. (b) Output per worker rose from ${p0} to ${p1}. (c) Wage bill ${fmt(pBill, 1)}%; relative factor prices; large standardised output. (d) Productivity and competitiveness against job losses and local effects.`,
      hints: ["(b) Output per worker = output ÷ workers.", "(c) Percentage change = change ÷ original × 100.", "(d) Consider consumers, workers, the town and the whole economy."],
    });
    q.modelResponse.parts["(b)(i)"] = subB1.model;
    q.wrongResponses[0].parts["(b)(i)"] = subB1.wrong[0];
    q.modelResponse.parts["(c)(i)"] = subC1.model;
    q.wrongResponses[0].parts["(c)(i)"] = subC1.wrong[0];
    q.modelResponse.parts["(c)(ii)"] = subC2.model;
    q.wrongResponses[0].parts["(c)(ii)"] = subC2.wrong[0];
  }
});
