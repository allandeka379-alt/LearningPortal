// W2b: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x2: a labour market with wage data;
// a productivity table. Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6, EVALUATION) x3.
// Fictional data, computed and checked here.
import { concept, P, ZIM, schedule, productivity, pctChange, money, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.wage-determination", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2, item 1: the market for nurses and an earnings table.
  {
    const w = [325, 365, 405, 445, 485];
    const ld = w.map((x) => 3955 - 5 * x), ls = w.map((x) => -940 + 6 * x);
    const N = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Monthly wage (US\\$)", qdHeader: "Nurses demanded", qsHeader: "Nurses supplied", requireEquilibrium: true });
    check("eq", N.equilibrium.price, 445);
    check("emp", N.equilibrium.quantity, 1730);
    const iG = w.indexOf(365);
    const shortage = N.excess[iG];
    check("shortage", shortage, 880);
    const earn = [["Clerk (public sector)", 285], ["Nurse (public sector)", 365], ["Teacher (public sector)", 395], ["Doctor (public sector)", 1241]];
    const tE = table(["Occupation", "Average monthly earnings (US\\$)"], earn);
    const pDoc = pctChange(365, 1241);
    check("pDoc", pDoc, 240);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.labour.wage-determination", "econ.labour.wage-differentials", "econ.labour.mobility", "econ.labour.unions-government"],
      stem: `In a fictional country, most nurses work in government hospitals, where pay is set on a national scale. Table 1 shows the monthly labour market for nurses in the country's cities. Table 2 shows average monthly earnings in some public-sector occupations. The government pays nurses US\\$365 a month, and many trained nurses have left to work abroad.\n\n**Table 1**\n\n${N.md}\n\n**Table 2**\n\n${tE}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: N.equilibrium.price, stem: "From Table 1, state the equilibrium monthly wage for nurses.", wrong: [365], explanation: `At US\\$445, ${fmt(N.equilibrium.quantity)} nurses are demanded and ${fmt(N.equilibrium.quantity)} supplied.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: N.equilibrium.quantity, stem: "State the number of nurses employed at the equilibrium wage.", wrong: [ld[iG]], explanation: `${fmt(N.equilibrium.quantity)} nurses at US\\$445.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: shortage, stem: "Calculate the shortage of nurses at the government wage of US\\$365 a month.", wrong: [ld[iG], ls[iG]], explanation: `At US\\$365: demanded ${fmt(ld[iG])} − supplied ${fmt(ls[iG])} = ${shortage} nurses.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: pDoc, stem: "Using Table 2, calculate by what percentage a doctor's average earnings exceed a nurse's. Give your answer to one decimal place.", wrong: [((1241 - 365) / 1241) * 100, 876], explanation: `(1,241 − 365) ÷ 365 × 100 = ${fmt(pDoc, 1)}%.` }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "Which describes the effect of the emigration of trained nurses on Table 1?",
          options: [
            ["The supply curve shifts to the left, raising the equilibrium wage", "Correct: fewer nurses are available at every wage."],
            ["The demand curve shifts to the left, lowering the equilibrium wage", "Hospitals still need as many nurses."],
            ["The supply curve shifts to the right, lowering the equilibrium wage", "Emigration reduces supply."],
            ["There is a movement along the demand curve only", "A change in the number of nurses available shifts supply."],
          ],
          answer: "A",
          explanation: "Emigration reduces the number of nurses willing to work at each wage: supply decreases (shifts left) and the equilibrium wage rises.",
        }),
        P.manual({
          label: "(f)", marks: 4,
          stem: "Explain **two** reasons why doctors earn more than nurses.",
          points: [
            "Doctors need much longer training and higher qualifications.",
            "So the supply of doctors is small (and inelastic), which raises their wage.",
            "Doctors' work is more highly skilled / carries greater responsibility, so its value (demand) is higher.",
            "Few people can replace a doctor, so doctors have stronger bargaining power.",
          ],
          modelAnswer: "Doctors train for six years or more and need high qualifications, so few people can become doctors and the supply is small, which raises the wage. Their work is also highly skilled and carries great responsibility, so it is valued highly and demand for doctors is strong; because they are hard to replace, they also have strong bargaining power.",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Describe a demand and supply diagram that shows the shortage of nurses at the government wage.",
          points: [
            "Wage on the vertical axis, number of nurses on the horizontal axis.",
            "Downward-sloping demand and upward-sloping supply crossing at US\\$445 and 1,730 nurses.",
            "A horizontal line at US\\$365, below the equilibrium wage.",
            "At US\\$365, quantity demanded (2,130) exceeds quantity supplied (1,250): the gap is the shortage of 880.",
          ],
          modelAnswer: "The wage is on the vertical axis and the number of nurses on the horizontal axis. The demand curve slopes down and the supply curve slopes up; they cross at US\\$445 and 1,730 nurses. A horizontal line at US\\$365 lies below the equilibrium. At that wage the demand curve shows 2,130 nurses wanted and the supply curve only 1,250 willing to work, so the horizontal gap between the curves is a shortage of 880 nurses.",
        }),
        P.manual({
          label: "(h)", marks: 5, levels: LV(5),
          stem: "Discuss whether the government should raise nurses' pay to the equilibrium wage.",
          points: [
            "For: the shortage of 880 nurses disappears; more nurses are employed (1,730 instead of 1,250).",
            "For: fewer nurses emigrate; better health care and morale.",
            "Against: the wage bill rises sharply, a cost to the budget with an opportunity cost (or higher taxes).",
            "Against/alternative: non-wage benefits (housing, training, allowances) or bonding of trainees may be cheaper.",
            "Justified conclusion.",
          ],
          hints: ["Compare the wage bill at US\\$365 and at US\\$445."],
          modelAnswer: `Raising pay to US\\$445 would remove the shortage: employment would rise from ${fmt(ls[iG])} to ${fmt(N.equilibrium.quantity)} nurses and fewer would emigrate, improving health care. However, the monthly wage bill would rise from ${money(365 * ls[iG])} to ${money(445 * N.equilibrium.quantity)}, which the government must fund by cutting other spending or raising taxes. Non-wage benefits such as housing allowances or training could attract nurses more cheaply. On balance, a gradual rise towards the equilibrium wage, combined with non-wage benefits, is justified because a shortage of nurses harms the whole population's health.`,
        }),
      ],
      explanation: `Equilibrium US\\$445 and ${fmt(N.equilibrium.quantity)} nurses; at US\\$365 a shortage of ${shortage}. Doctors earn ${fmt(pDoc, 1)}% more than nurses. Emigration shifts supply left.`,
      hints: ["Equilibrium is where quantity demanded equals quantity supplied.", "Shortage = quantity demanded − quantity supplied.", "Percentage difference: divide by the nurse's earnings."],
    });
  }

  // ---------------- Paper 2, item 2: a productivity table.
  {
    const workers = [1, 2, 3, 4, 5, 6, 7], tp = [40, 95, 160, 210, 245, 265, 270];
    const T = productivity.table({ workers, tp });
    check("ap4", T.rows[3].ap, 52.5);
    check("mp5", T.rows[4].mp, 35);
    const peak = T.rows.reduce((best, r) => (r.mp !== null && (best === null || r.mp > best.mp) ? r : best), null);
    check("peak", peak.w, 3);
    const tT = table(["Number of workers", "Total output (shirts per day)"], workers.map((x, i) => [x, tp[i]]));
    const newOut = 252, ap1 = newOut / 4, gain = pctChange(T.rows[3].ap, ap1);
    check("gain", gain, 20);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.production.productivity", "econ.labour.division-of-labour"],
      stem: `A fictional clothing workshop in Chitungwiza has a fixed number of sewing machines in a small building. Table 3 shows its daily output as more workers are employed. Later, the owner replaced the old machines with new electric ones; with the new machines, 4 workers produce ${newOut} shirts a day.\n\n**Table 3**\n\n${tT}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: T.rows[3].ap, dp: 1, stem: "Calculate the average product of labour when 4 workers are employed (shirts per worker).", wrong: [T.rows[3].mp], explanation: `210 ÷ 4 = ${fmt(T.rows[3].ap, 1)} shirts per worker.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: T.rows[4].mp, stem: "Calculate the marginal product of the 5th worker.", wrong: [T.rows[4].ap], explanation: `245 − 210 = ${T.rows[4].mp} shirts.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: peak.w + 1, stem: "Diminishing returns set in with the first worker whose marginal product is lower than that of the worker before. Which worker is this? Give the worker's number.", wrong: [peak.w], explanation: `MP: ${T.rows.map((r) => r.mp).join(", ")}. MP is highest for the 3rd worker (65); the 4th adds only 50, so diminishing returns set in with the 4th worker.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: gain, stem: "Calculate the percentage increase in output per worker for 4 workers after the new machines were installed. Give your answer to one decimal place.", wrong: [((ap1 - T.rows[3].ap) / ap1) * 100], explanation: `Before: 210 ÷ 4 = 52.5. After: ${newOut} ÷ 4 = ${ap1}. (${ap1} − 52.5) ÷ 52.5 × 100 = ${fmt(gain, 1)}%.` }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "The 7th worker raises total output from 265 to 270 shirts. Which statement is correct?",
          options: [
            ["Production rises but output per worker falls", "Correct: TP rises by 5 while AP falls from about 44.2 to about 38.6."],
            ["Production and output per worker both rise", "AP falls."],
            ["Production falls and output per worker rises", "TP rises."],
            ["Production and output per worker both fall", "TP rises by 5 shirts."],
          ],
          answer: "A",
          explanation: "Total output (production) rises, but productivity (output per worker) falls because the 7th worker adds less than the average.",
        }),
        P.manual({
          label: "(f)", marks: 3,
          stem: "Explain why the marginal product falls as more workers are employed in the workshop.",
          points: ["The number of sewing machines and the building are fixed.", "Extra workers have to share machines / wait / get in each other's way.", "So each extra worker adds less output than the one before: diminishing returns."],
          modelAnswer: "The workshop has a fixed number of sewing machines and a small building. As more workers are employed, they have to share machines and wait for them and get in each other's way, so each extra worker adds less output than the one before. This is the law of diminishing returns.",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Explain **two** ways, other than buying new machines, in which the owner could raise labour productivity.",
          points: ["Training workers.", "So they sew faster with fewer mistakes, raising output per worker.", "Division of labour / incentives (piece rates, bonuses) / better organisation.", "Explains the effect: specialised tasks are done faster / workers are motivated to produce more."],
          modelAnswer: "First, the owner could train the workers, so they sew faster and make fewer mistakes, raising output per worker. Second, she could divide the work so that each worker specialises in one task, such as cutting, sewing collars or finishing, or pay a bonus for each extra shirt; workers then become quicker through repetition or are motivated to produce more.",
        }),
        P.manual({
          label: "(h)", marks: 6, levels: LV(6),
          stem: "Discuss whether the investment in new machines benefits the workers in the workshop.",
          points: [
            `For: output per worker rose by ${fmt(gain, 1)}%, so the workshop can afford higher wages or bonuses.`,
            "For: lower costs make the workshop more competitive, making jobs more secure.",
            "For: work may be less tiring; workers gain new skills.",
            "Against: the owner may need fewer workers to produce the same output, so some may lose their jobs.",
            "Against: the gains may go to the owner as profit; workers may need retraining.",
            "Justified conclusion (depends on demand for shirts and how gains are shared).",
          ],
          hints: ["Will the workshop sell more shirts, or make the same number with fewer workers?"],
          modelAnswer: `The new machines raised output per worker by ${fmt(gain, 1)}%, which lowers the cost of each shirt and makes the workshop more competitive; this can make jobs more secure and allow higher wages or bonuses, and the work may be less tiring. However, if demand for shirts does not rise, the owner can now produce the same output with fewer workers, so some may lose their jobs, and the extra profit may simply go to the owner. Workers benefit if demand grows and the owner shares the gains; otherwise the main beneficiary is the owner.`,
        }),
      ],
      explanation: `AP(4) = 52.5; MP(5) = 35; diminishing returns from the 4th worker; output per worker rose by ${fmt(gain, 1)}%.`,
      hints: ["AP = TP ÷ workers; MP = change in TP.", "Percentage change uses the original value as the base."],
    });
  }

  // ---------------- Paper 3 essays.
  const essay = (concepts, stem, a, bPart) =>
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
      concepts,
      stem,
      parts: [
        P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, ...a }),
        P.manual({ label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6), ...bPart }),
      ],
      explanation: "Part (a) rewards accurate explanation; part (b) rewards a two-sided discussion with a justified conclusion.",
      hints: ["Plan both parts before you write.", "In (b), give both sides and a conclusion."],
    });

  essay(
    ["econ.production.location-of-industry"],
    "Firms and governments both care where industries are located.",
    {
      stem: "Explain **four** factors that influence where a firm locates.",
      points: [
        "Raw materials: weight-losing or perishable inputs pull firms towards them (e.g. sugar mills near cane estates).",
        "Market: bulky, fragile or perishable products and services locate near customers (e.g. breweries, bakeries).",
        "Labour: availability of workers with the right skills at an acceptable wage.",
        "Power, transport, water (or land, government policy, external economies), with a reason.",
      ],
      modelAnswer: "A firm locates where its costs are lowest and it can reach its customers. Firms using heavy or perishable raw materials, such as sugar mills, locate near them because carrying the raw material is costly. Firms whose products are bulky or perishable, such as breweries and bakeries, locate near their markets. Firms need a supply of suitable labour, so those needing skilled workers choose large towns. Finally, reliable power, transport links and water matter: a smelter needs cheap electricity, and a food processor needs good roads and a large water supply.",
    },
    {
      stem: "Discuss how and why the government influences the location of industry.",
      points: [
        "Why: to reduce regional inequality and rural poverty / spread development.",
        "Why: to reduce rural-urban migration, urban congestion and pollution.",
        "How: incentives such as tax holidays, grants, cheap loans and sites.",
        "How: infrastructure and growth points; restrictions such as zoning and planning permission.",
        "Limits: cost to the budget / opportunity cost; firms may face higher costs and leave when incentives end.",
        "Justified conclusion on how effective such policy is.",
      ],
      hints: ["Give reasons, methods and a judgement on success."],
      modelAnswer: "Government influences location to reduce inequality between regions, create jobs in rural areas, slow rural-urban migration and reduce congestion and pollution in the cities. It uses incentives, such as tax holidays, grants and cheap factory sites in chosen areas, and builds roads, power lines and water supplies at growth points to make them attractive. It can also restrict industry through zoning and planning permission. However, incentives cost money that could be spent elsewhere, and remote areas may still lack markets and skilled workers, so firms may face higher costs and leave when incentives end. Location policy works best when it builds lasting infrastructure in places that already have some advantages, rather than relying on temporary incentives alone.",
    },
  );

  essay(
    ["econ.production.land-reform"],
    "Land reform has been one of the most important economic changes in Zimbabwe since independence.",
    {
      stem: "Explain the aims of Zimbabwe's land reform programme.",
      points: [
        "To correct the unequal distribution of land inherited from the colonial period / broaden ownership.",
        "To resettle landless and land-short families.",
        "To decongest (reduce overcrowding in) communal areas.",
        "To bring more land into productive use / create more indigenous farmers / reduce rural poverty.",
      ],
      modelAnswer: "At independence much of the best farmland was held by relatively few large commercial farms, while most rural families farmed crowded communal land with poor soils. Land reform aimed to correct this unequal distribution and broaden ownership; to resettle landless and land-short families; to reduce overcrowding in communal areas; and to bring under-used land into production by creating many new small and commercial farmers, so reducing rural poverty.",
    },
    {
      stem: "Discuss the economic effects of the land reform programme.",
      points: [
        "Positive: many families gained land, self-employment and food for their households.",
        "Positive: many new farmers; growth of smallholder production of some crops such as tobacco.",
        "Negative: falls in commercial output of several crops and in exports in the early years; food imports.",
        "Negative: loss of farm workers' jobs; agro-industries lost raw materials.",
        "Negative/explanation: insecure tenure limited borrowing and investment; other causes (drought, economic crisis) also played a part.",
        "Balanced, justified conclusion.",
      ],
      hints: ["Give recognised benefits and recognised problems, and consider other causes."],
      modelAnswer: "Land reform gave many thousands of families access to land, self-employment and a source of food, and created a large number of new farmers; smallholders became important producers of some crops, notably tobacco. On the other hand, output of several commercial crops and exports fell in the early years, many farm workers lost their jobs, and agro-processing firms received fewer raw materials. New farmers often lacked capital and held land under permits that could not be used as collateral, which limited investment. Droughts and the economic crisis also affected output, so not every fall can be blamed on land reform. Overall, land reform widened access to land, but its effects on output depend on giving new farmers secure tenure, finance and support.",
    },
  );

  essay(
    ["econ.labour.wage-determination", "econ.labour.unions-government"],
    "Wages differ between occupations and change over time.",
    {
      stem: "Explain how the wage rate is determined in a free labour market.",
      points: [
        "Demand for labour is a derived demand: it comes from demand for the product.",
        "Supply of labour: the number of workers willing and able to work at each wage.",
        "The equilibrium wage is where the quantity of labour demanded equals the quantity supplied.",
        "A shortage raises the wage / a surplus lowers it until equilibrium is reached (or a change in demand or supply changes the wage).",
      ],
      modelAnswer: "In a free labour market the wage is set by demand and supply. Firms demand labour because consumers want the goods and services workers produce, so it is a derived demand; more workers are demanded at lower wages. The supply of labour is the number of people willing and able to do the job at each wage, which rises as the wage rises. The equilibrium wage is where the two are equal. If the wage is below it there is a shortage of workers and employers bid the wage up; if it is above, there is a surplus and the wage falls.",
    },
    {
      stem: "Discuss whether trade unions are able to raise the wages of their members.",
      points: [
        "Unions bargain collectively, which is stronger than workers bargaining alone.",
        "Strong unions (high membership, scarce skills, essential services) can win rises through the threat of industrial action.",
        "Union strength is limited when unemployment is high, members are easily replaced, or membership is low.",
        "Employers' ability to pay matters: firms making losses or facing competition cannot pay more.",
        "Higher wages may lead firms to employ fewer workers or replace them with machines.",
        "Justified conclusion.",
      ],
      hints: ["When are unions strong, and when are they weak?"],
      modelAnswer: "By bargaining collectively, unions have more power than individual workers, and the threat of a strike or go-slow can force employers to pay more, especially where membership is high, members' skills are scarce and the service is essential. However, union power is limited when unemployment is high and workers can easily be replaced, when membership is low, or when the employer is making losses and cannot afford a rise. Even when unions win higher pay, firms may respond by employing fewer workers or buying machines, so some members lose their jobs. Unions can therefore raise wages for their members, but mainly in industries where they are well organised and employers can afford to pay.",
    },
  );

});
