// W2a: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x1 on unemployment survey data;
// Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6, EVALUATION) x2. Fictional data, computed and checked.
import { concept, P, ZIM, table, unemploymentRate, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.unemployment.measurement", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2: labour force survey of a fictional province.
  {
    const yrs = ["2024", "2025"];
    const wap = [820, 850], formal = [150, 132], informal = [290, 330], unemp = [110, 128], inactive = [270, 260];
    yrs.forEach((_, i) => check(`sum ${i}`, formal[i] + informal[i] + unemp[i] + inactive[i], wap[i]));
    const lf = yrs.map((_, i) => formal[i] + informal[i] + unemp[i]);
    const rate = yrs.map((_, i) => unemploymentRate({ unemployed: unemp[i], labourForce: lf[i] }));
    const fPc = pctChange(formal[0], formal[1]);
    check("lf0", lf[0], 550); check("r0", rate[0], 20); check("fPc", fPc, -12);
    const T = table(["Thousands of people aged 15-64", "2024", "2025"], [
      ["Employed in the formal sector", formal[0], formal[1]],
      ["Employed in the informal sector", informal[0], informal[1]],
      ["Unemployed (without work, available, seeking work)", unemp[0], unemp[1]],
      ["Economically inactive", inactive[0], inactive[1]],
      ["Working-age population", wap[0], wap[1]],
    ]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.unemployment.measurement", "econ.unemployment.types", "econ.unemployment.effects-policies", "econ.unemployment.job-creation"],
      stem: `A labour force survey was carried out in a fictional province of a southern African country in 2024 and 2025. During 2025 two large textile factories in the province's main town closed because they could not compete with cheaper imported cloth. Many former workers started selling goods at the town market, and more school leavers began looking for work.\n\n**Table 1: Labour force survey results**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: lf[0], stem: "Calculate the labour force in 2024, in thousands.", wrong: [wap[0], formal[0] + informal[0]], explanation: `Labour force = employed + unemployed = ${formal[0]} + ${informal[0]} + ${unemp[0]} = ${lf[0]} thousand.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: rate[0], stem: "Calculate the unemployment rate in 2024. Give your answer to one decimal place.", wrong: [(unemp[0] / wap[0]) * 100], explanation: `${unemp[0]} ÷ ${lf[0]} × 100 = ${pct(rate[0], 1)}. Dividing by the working-age population (${pct((unemp[0] / wap[0]) * 100, 1)}) is wrong.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: rate[1], stem: "Calculate the unemployment rate in 2025. Give your answer to one decimal place.", wrong: [(unemp[1] / wap[1]) * 100, (unemp[1] / lf[0]) * 100], explanation: `Labour force = ${formal[1]} + ${informal[1]} + ${unemp[1]} = ${lf[1]}; ${unemp[1]} ÷ ${lf[1]} × 100 = ${pct(rate[1], 1)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: fPc, stem: "Calculate the percentage change in formal sector employment between 2024 and 2025. Give a fall as a negative number, to one decimal place.", wrong: [-fPc, pctChange(formal[1], formal[0])], explanation: `(${formal[1]} − ${formal[0]}) ÷ ${formal[0]} × 100 = ${fmt(fPc, 1)}%.` }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "Which statement best describes the change in employment between 2024 and 2025?",
          options: [
            ["Formal employment fell while informal employment rose", `Correct: formal ${formal[0]} → ${formal[1]}; informal ${informal[0]} → ${informal[1]}.`],
            ["Formal and informal employment both fell", `Informal employment rose by ${informal[1] - informal[0]} thousand.`],
            ["Total employment fell", `Total employment rose from ${formal[0] + informal[0]} to ${formal[1] + informal[1]} thousand.`],
            ["Formal employment rose while informal employment fell", "This reverses the changes in the table."],
          ],
          answer: "A",
          explanation: "Workers moved from formal jobs into informal work, while total employment still rose.",
        }),
        P.manual({
          label: "(f)", marks: 3,
          stem: "Explain why the rise in informal employment may hide the true extent of unemployment in the province.",
          points: [
            "Informal workers who did any paid work are counted as employed.",
            "Many earn low, irregular incomes or work few hours: they are underemployed.",
            "So the unemployment rate understates joblessness / under-use of labour (discouraged workers in the inactive group are also missed).",
          ],
          modelAnswer: "Former factory workers selling at the market are counted as employed because they did some paid work. Many of them work only a few hours or earn very little, so they are underemployed. The unemployment rate therefore understates how much labour is idle, and people who have given up looking are counted as inactive, which hides even more joblessness.",
          explanation: "Counted as employed → underemployed → rate understates joblessness.",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Identify the type of unemployment caused by the closure of the textile factories and explain its cause.",
          points: [
            "Identifies structural unemployment (or regional unemployment, as it is concentrated in one town).",
            "Cause: a permanent decline in the local textile industry because of cheaper imports.",
            "The workers' skills do not match the jobs available elsewhere (occupational immobility).",
            "They may be unable to move to other areas where there are jobs (geographical immobility), so it lasts a long time.",
          ],
          modelAnswer: "This is structural unemployment, concentrated in one town, so it is also regional unemployment. Demand has shifted permanently from local cloth to cheaper imports, so the factories will not reopen. The textile workers' skills do not match the jobs available in other industries, and many cannot afford to move to other towns where there may be work, so the unemployment is likely to last a long time.",
          explanation: "Name the type (1) and explain the cause and why it persists (3).",
        }),
        P.manual({
          label: "(h)", marks: 5, levels: LV(5),
          stem: "Discuss whether the government should support the informal sector or try to attract new formal-sector firms to reduce unemployment in the province.",
          points: [
            "Informal sector: quick, cheap to support (stalls, microcredit, training); already absorbing workers (informal employment rose by 40 thousand).",
            "Informal sector: but low, irregular incomes, no social protection, little tax; underemployment continues.",
            "Formal firms: better paid, secure jobs, tax revenue, training, linkages to local suppliers.",
            "Formal firms: costly incentives, slow to arrive, may need skills the unemployed lack; may leave when incentives end.",
            "Justified conclusion (e.g. support the informal sector in the short run while attracting formal firms and retraining in the long run).",
          ],
          modelAnswer: `Supporting the informal sector is quick and cheap: market stalls, small loans and business training would help the people already trading, and informal employment has already risen from ${informal[0]} to ${informal[1]} thousand. However, informal work often gives low and irregular incomes with no protection, so underemployment would continue and little tax would be collected. Attracting new formal firms would provide better paid and more secure jobs, tax revenue and links to local suppliers, but incentives are costly, firms take time to arrive, and they may need skills the former textile workers lack. The best approach is to support the informal sector now, so that people have some income, while retraining workers and attracting formal firms to create lasting jobs.`,
          explanation: "Weigh speed and cost against job quality; conclude with a justified balance.",
        }),
      ],
      explanation: `Labour force ${lf[0]} → ${lf[1]} thousand; unemployment rate ${pct(rate[0], 1)} → ${pct(rate[1], 1)}; formal employment ${fmt(fPc, 1)}% while informal employment rose. The factory closures caused structural (regional) unemployment.`,
      hints: ["Labour force = employed (formal + informal) + unemployed.", "Unemployment rate = unemployed ÷ labour force × 100.", "Percentage change uses the 2024 value as the base."],
    });
  }

  // ---------------- Paper 3 essays.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.markets.price-controls"],
    stem: "Governments sometimes control the prices of basic commodities such as maize meal, bread and cooking oil.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain what is meant by a price ceiling and describe its effects on the market for a basic commodity.",
        points: [
          "A price ceiling is a legal maximum price, set below the equilibrium price to be effective.",
          "At the lower price quantity demanded rises (extends) and quantity supplied falls (contracts).",
          "This creates a shortage (excess demand).",
          "Results: queues, rationing or first come first served, and black (parallel) markets at higher prices.",
        ],
        modelAnswer: "A price ceiling is a maximum price set by law, above which a good may not be sold. To have any effect it must be set below the equilibrium price. At the lower price consumers want to buy more, while producers are willing to supply less, because the good is less profitable. Quantity demanded exceeds quantity supplied, so there is a shortage. Goods disappear from shop shelves, people queue, sellers ration supplies or sell to favoured customers, and a black market develops in which the good is sold illegally above the ceiling.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether price ceilings on basic commodities benefit consumers.",
        points: [
          "Benefit: those who can buy pay a lower price; basic goods become more affordable for poor households.",
          "Benefit: protects consumers from exploitation where sellers have market power or during shortages.",
          "Cost: shortages mean many consumers cannot buy at all; time lost in queues.",
          "Cost: black markets where consumers pay more than the equilibrium price; quality may fall.",
          "Cost: producers cut output or leave the industry; less investment, so shortages last longer.",
          "Justified conclusion (e.g. benefits some consumers in the short run, but many lose; targeted subsidies or support may be better).",
        ],
        modelAnswer: "A price ceiling benefits consumers who manage to buy the good, because they pay less than the equilibrium price, and it can make basic foods affordable for poor households or stop sellers exploiting a temporary shortage. However, because the price is below equilibrium, quantity supplied falls and quantity demanded rises, so there is a shortage. Many consumers cannot buy the good at all, others lose hours in queues, and some end up paying black-market prices above the original equilibrium. Producers earn less, so they cut output, reduce quality or stop investing, making shortages worse over time. Price ceilings therefore help some consumers in the short run, but many consumers lose; targeted help such as subsidies to producers or support for poor households is usually a better way to make basic goods affordable.",
      }),
    ],
    explanation: "Part (a) defines a price ceiling and traces the shortage; part (b) weighs lower prices for some against shortages, queues and black markets.",
    hints: ["(a) Where must a ceiling be set to have an effect?", "(b) Who gains and who loses among consumers?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.unemployment.types", "econ.unemployment.effects-policies", "econ.unemployment.job-creation"],
    stem: "Unemployment, especially among young people, is one of Zimbabwe's main economic problems.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Describe **two** types of unemployment found in Zimbabwe and their causes.",
        points: [
          "Names a first type (e.g. structural, seasonal, frictional, cyclical, regional).",
          "Explains its cause with a Zimbabwean example (e.g. factory closures from cheap imports; dry season on farms).",
          "Names a second type.",
          "Explains its cause with an example.",
        ],
        modelAnswer: "Structural unemployment occurs when an industry declines for good, for example when clothing factories closed because they could not compete with cheaper imports; the workers' skills no longer match the jobs available. Seasonal unemployment occurs because demand for some workers depends on the time of year: farm workers who plant, weed and harvest crops during the rainy season and harvest have less work in the dry months.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether encouraging enterprise and small businesses is the best way to reduce unemployment in Zimbabwe.",
        points: [
          "For: self-employment removes people from unemployment; small firms hire local workers.",
          "For: low start-up costs; linkages to suppliers; builds skills; suits the large informal sector.",
          "Against: many small firms fail; credit is expensive; markets are crowded; incomes often low (underemployment).",
          "Against: does not cure all types: structural unemployment needs retraining; cyclical needs higher aggregate demand.",
          "Alternatives: attracting investment and formal firms, education and training, infrastructure, public works.",
          "Justified conclusion (e.g. an important part of the answer, but must be combined with other policies).",
        ],
        modelAnswer: "Encouraging enterprise can reduce unemployment directly, because each new business employs its owner and often hires others, and indirectly through purchases from suppliers. Start-up costs are low, so many young people can take part, and support such as training, microcredit and market stalls builds on the large informal sector. However, many small businesses fail within a few years, credit is expensive, and markets become crowded with people selling the same goods, so incomes are often low and people remain underemployed. Enterprise also does not suit every cause: structural unemployment needs retraining, and cyclical unemployment needs higher aggregate demand. Attracting investment, improving education and building infrastructure are also needed to create more productive jobs. Enterprise is therefore an important part of the solution, but it is not on its own the best way; it works best combined with these other policies.",
      }),
    ],
    explanation: "Part (a) names and explains two types with causes; part (b) weighs enterprise against its limits and other policies.",
    hints: ["(a) Choose types with clear Zimbabwean examples.", "(b) Does enterprise suit every type of unemployment?"],
  });
});
