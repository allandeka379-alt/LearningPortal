// W1b exam-format items: ZIMSEC data response (25), case study (30) and two essays (25 each)
import { concept, P, EXAM, checkExam, ZIM, table, sum, r2, money, chk } from "../lib.mjs";

const LV10 = [[1, 1, 3, "Names points with little or no explanation; little use of examples"], [2, 4, 7, "Explains several points with some examples; some development"], [3, 8, 10, "Accurate, developed explanation of each point with relevant examples"]];
const LV15 = [[1, 1, 5, "One-sided description; assertions without support; no clear judgement"], [2, 6, 10, "Arguments for and against developed; a judgement that is only partly supported"], [3, 11, 15, "Balanced, developed arguments with examples and a justified judgement that considers conditions"]];
const LV10E = [[1, 1, 3, "Points listed; limited application; no judgement"], [2, 4, 7, "Applied points and some balance; judgement stated but not fully supported"], [3, 8, 10, "Balanced, applied analysis and a justified recommendation with a condition"]];

concept("abus.size.mergers-takeovers", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec" }, (b) => {
  const zim = (plan, extra = {}) => ({ examStyle: true, skill: plan.skill, secs: plan.secs, applies: ZIM, ...extra });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: ZIM_DATA25 (Business Studies Paper 2 section A): a merger of two bakeries
  {
    const market = 1800000;
    const A = { sales: 288000, profit: 25920, workers: 20, over: 46000 };
    const B = { sales: 162000, profit: 9720, workers: 14, over: 34000 };
    const share = ((A.sales + B.sales) / market) * 100;
    chk(share, 25, 1e-9);
    const after = ((A.over + B.over) * 85) / 100;
    chk(after, 68000, 1e-9);
    const marginB = (B.profit / B.sales) * 100;
    chk(marginB, 6, 1e-9);
    b.struct({
      ...zim(EXAM.ZIM_DATA25, { d: 4, calculator: true, paper: "ZIMSEC Business Studies Paper 2" }),
      concepts: ["abus.size.mergers-takeovers", "abus.stakeholders.roles-influence", "abus.objectives.aims-types"],
      stem:
        `Nyamhunga Bakery and Kudzai Breads are two fictional bakeries in Mutare. Their owners have agreed to merge and trade as one firm. The owners' objective is to raise profit by reducing costs. The whole bread market in Mutare is worth ${money(market)} a year.\n\n` +
        table(["Last year", "Nyamhunga Bakery", "Kudzai Breads"], [["Sales (US\\$)", A.sales, B.sales], ["Profit (US\\$)", A.profit, B.profit], ["Number of workers", A.workers, B.workers], ["Administration and distribution overheads (US\\$)", A.over, B.over]]) +
        `\n\nThe owners expect the combined overheads to be 15% lower after the merger. Eight jobs are duplicated and will be lost. Some of Kudzai Breads' workers say they will leave rather than work under Nyamhunga's managers, who give detailed orders, whereas Kudzai's staff are used to making their own decisions. The only flour mill in the town supplies both bakeries and fears that the merged firm may buy from a cheaper mill elsewhere.`,
      parts: checkExam(EXAM.ZIM_DATA25, [
        P.group({
          label: "(a)", stem: "Using the data:",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "Which firm has the larger share of the Mutare bread market?", options: [["Nyamhunga Bakery", "Correct: its sales are larger."], ["Kudzai Breads", "Its sales are smaller."], ["They have equal shares", "Their sales differ."], ["It cannot be told from the data", "Sales and the market total are given."]], answer: "A", explanation: "Nyamhunga has the larger sales and therefore the larger share." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: share, stem: "Calculate the share of the market held by the merged firm. Give your answer as a percentage to one decimal place.", wrong: [(A.sales / market) * 100, (B.sales / market) * 100], explanation: "Combined sales = 288,000 + 162,000 = 450,000. Share = 450,000 ÷ 1,800,000 × 100 = 25.0%." }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Costs and profit:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: after, stem: "Calculate the expected combined overheads after the merger.", wrong: [A.over + B.over, ((A.over + B.over) * 15) / 100], explanation: "Combined overheads now = 46,000 + 34,000 = 80,000. A fall of 15% leaves 85%: 80,000 × 85 ÷ 100 = US\\$68,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: marginB, stem: "Calculate the profit of Kudzai Breads as a percentage of its sales (profit ÷ sales × 100), to one decimal place.", wrong: [(B.profit / A.sales) * 100, (B.profit / (B.sales - B.profit)) * 100], explanation: "9,720 ÷ 162,000 × 100 = 6.0%." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 2, stem: "State the type of integration shown in the case and give **one** reason why the owners chose it.",
          points: ["Horizontal integration (two bakeries at the same stage of the same industry)", "A reason, such as a larger market share, lower overheads or removing a competitor"],
          modelAnswer: "It is horizontal integration, because two bakeries at the same stage of the same industry are joining. The owners chose it to reduce overheads and to gain a larger share of the Mutare market.",
          explanation: "The type and one reason, using the case.",
        }),
        P.manual({
          label: "(d)", marks: 6, stem: "Analyse the likely effects of the merger on **two** of the following stakeholders: workers, the flour mill, customers.",
          points: ["First stakeholder: effect identified (for example, eight workers lose their jobs)", "Development: using the case (duplicated jobs; some Kudzai workers may leave)", "Consequence: lower morale or loss of skills, which may reduce output and quality", "Second stakeholder: effect identified (for example, the flour mill may lose a customer)", "Development: the merged firm has stronger bargaining power and may switch to a cheaper mill", "Consequence: the mill's sales and jobs may fall, or it may have to cut its price"],
          modelAnswer: "Workers are affected because eight duplicated jobs will be lost, and some of Kudzai's workers say they will leave because of the different style of management. This will lower morale and the firm may lose skilled staff, which could reduce output and quality. The flour mill is also affected: the merged firm will buy more flour but has a stronger bargaining position and may switch to a cheaper mill. The mill could then lose half of its business, so it may have to cut its price or reduce its workforce.",
          hints: ["Choose two stakeholders and write a chain for each: effect, development from the case, consequence."],
          explanation: "Two stakeholders, each with an effect, a development and a consequence.",
          type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: [[1, 1, 2, "Names effects with little explanation"], [2, 3, 4, "Explains effects using the case"], [3, 5, 6, "Developed chains of reasoning for both stakeholders"]],
        }),
        P.manual({
          label: "(e)", marks: 10, stem: "Evaluate whether the merger will achieve the owners' objective of higher profit.",
          points: ["Overheads fall by US\\$12,000 (from US\\$80,000 to US\\$68,000), which adds to profit", "A 25.0% market share gives bargaining power and may lower costs of flour or increase sales", "Job losses reduce wages, a further saving", "Kudzai's profit margin is only 6.0%, so extra savings have a large effect on its profit", "Culture clash: different management styles may lower morale and cause skilled staff to leave", "Staff leaving would reduce output and may cost more to replace", "Customers may lose choice but have no new price protection; some may switch to rivals", "The flour mill may raise prices or lose, which would raise or cut costs", "Judgement that states whether profit will rise", "A condition or time-frame, such as integration within a year and retention of key staff"],
          modelAnswer: "The merger should reduce costs. Overheads fall from US\\$80,000 to US\\$68,000, a saving of US\\$12,000 a year, and the loss of eight duplicated jobs reduces wages. With a 25.0% share of the market the merged firm has more bargaining power with its flour supplier and can spread its fixed costs over more sales. Kudzai Breads earns a profit margin of only 6.0%, so savings of this size could raise profit considerably. However, the different management styles may cause a clash of cultures. If skilled bakers leave, output and quality will suffer and replacing them will cost money, which could cancel the savings. The flour mill might respond by raising its price or the firm might find a cheaper mill, which would help or harm costs. Overall, the merger is likely to raise profit in the long run, provided the owners keep the key staff and manage the change in the first year. If many workers leave, the savings could be lost.",
          explanation: "Cost savings and market power weighed against culture clash, with a conditional judgement.",
          type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10E,
        }),
      ]),
      hints: ["Market share = firm's sales ÷ total market sales × 100.", "A fall of 15% leaves 85% of the old figure."],
      explanation: "Merged share 25.0%; overheads fall to US\\$68,000; Kudzai's margin 6.0%; horizontal integration; effects on workers and the mill; evaluation of the profit objective.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: ZIM_CASE30 (both ZIMSEC syllabi): a co-operative's irrigation project
  {
    const weights = [35, 30, 20, 15];
    const scores = { irr: [5, 2, 4, 3], poul: [3, 3, 3, 2], bees: [3, 4, 2, 4] };
    const ws = (s) => s.reduce((a, v, i) => a + v * weights[i], 0) / 100;
    chk(ws(scores.irr), 3.6, 1e-9);
    chk(ws(scores.poul), 2.85, 1e-9);
    chk(ws(scores.bees), 3.25, 1e-9);
    const last = 150000, rise = 30;
    const target = (last * (100 + rise)) / 100;
    chk(target, 195000, 1e-9);
    const years = 6;
    const costs = [["Pumps and pipes (once)", 22000], ["Packhouse (once)", 11000], ["Running costs (US\\$3,200 a year for 6 years)", 3200 * years], ["Loss of river water to downstream users (social cost)", 4000]];
    const bens = [["Extra vegetable sales (US\\$15,500 a year for 6 years)", 15500 * years], ["Wages for 12 villagers (US\\$4,500 a year for 6 years)", 4500 * years]];
    const tc = costs.reduce((a, c) => a + c[1], 0), tb = bens.reduce((a, c) => a + c[1], 0);
    chk(tc, 56200, 1e-9);
    chk(tb, 120000, 1e-9);
    const wsTable = table(["Criterion", "Weight (%)", "Irrigation and packhouse", "Poultry", "Bee-keeping"], [
      ["Local demand", 35, ...[0].map(() => scores.irr[0]), scores.poul[0], scores.bees[0]],
      ["Start-up cost (higher score = cheaper)", 30, scores.irr[1], scores.poul[1], scores.bees[1]],
      ["Skills the members have", 20, scores.irr[2], scores.poul[2], scores.bees[2]],
      ["Risk (higher score = lower risk)", 15, scores.irr[3], scores.poul[3], scores.bees[3]],
    ]);
    const cbTable = table(["Irrigation and packhouse project over 6 years", "US\\$"], [["**Costs**", ""], ...costs, ["**Benefits**", ""], ...bens]);
    b.struct({
      ...zim(EXAM.ZIM_CASE30, { d: 4, calculator: true, paper: "ZIMSEC Business Studies Paper 1" }),
      concepts: ["abus.objectives.aims-types", "abus.project.formulation", "abus.project.cost-benefit", "abus.stakeholders.roles-influence", "abus.environment.political-legal"],
      stem:
        `Case study: Zambezi Greens Co-operative (a fictional business). Zambezi Greens is a co-operative of 30 farmers near Chinhoyi who sell vegetables to local markets. Sales last year were ${money(last)}. The members' objective is to raise sales by ${rise}% by 31 December next year. Each member earns a small income, but the co-operative has no storage, and vegetables often spoil before they are sold.\n\n` +
        "The members have listed three project ideas and scored them from 1 (poor) to 5 (best), using weights agreed at a meeting. The first idea is to buy pumps and pipes and build a packhouse; the second is a poultry project; the third is bee-keeping. The members need to register the project, obtain permits to take water from the river and follow labour law if they employ villagers. Downstream households, who also use the river, and the local council have said they want to be consulted. The co-operative has US\\$40,000 saved and could borrow the rest from a lender, which asks for a clear plan.\n\n" +
        wsTable + "\n\nThe members have costed the irrigation and packhouse project over six years (all values are estimates).\n\n" + cbTable,
      parts: checkExam(EXAM.ZIM_CASE30, [
        P.group({
          label: "(a)", stem: "The objective:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: target, stem: "Calculate the sales target for next year.", wrong: [(last * rise) / 100, last + rise], explanation: "30% of 150,000 = 45,000. Target = 150,000 + 45,000 = US\\$195,000." }),
            P.manual({ label: "(ii)", marks: 2, stem: "State **two** features of the objective that make it SMART.", points: ["Measurable: a 30% increase in sales", "Time-limited: by 31 December next year"], modelAnswer: "It is measurable because it states a 30% increase and time-limited because it gives a date of 31 December next year.", explanation: "One mark each, using the case." }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Choosing a project:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "plain", dp: 2, value: ws(scores.irr), stem: "Calculate the weighted score of the irrigation and packhouse project (sum of score × weight, divided by 100). Give your answer to two decimal places.", wrong: [(5 + 2 + 4 + 3) / 4, ws(scores.bees)], explanation: "(5 × 35 + 2 × 30 + 4 × 20 + 3 × 15) ÷ 100 = (175 + 60 + 80 + 45) ÷ 100 = 3.60." }),
            P.mcq({ label: "(ii)", marks: 1, stem: "The weighted scores of the poultry and bee-keeping projects are 2.85 and 3.25. Which project has the highest weighted score?", options: [["Irrigation and packhouse", "Correct: 3.60 is the highest."], ["Poultry", "Its score of 2.85 is the lowest."], ["Bee-keeping", "Its score of 3.25 is lower than 3.60."], ["They all have the same score", "The scores differ."]], answer: "A", explanation: "3.60 is higher than 3.25 and 2.85." }),
          ],
        }),
        P.group({
          label: "(c)", stem: "Cost-benefit analysis of the irrigation and packhouse project:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: tc, stem: "Calculate the total costs over the six years.", wrong: [22000 + 11000 + 3200 + 4000, 22000 + 11000 + 4000], explanation: "Running costs = 3,200 × 6 = 19,200. Total = 22,000 + 11,000 + 19,200 + 4,000 = US\\$56,200." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: tb, stem: "Calculate the total benefits over the six years.", wrong: [15500 + 4500, 15500 * 6], explanation: "Extra sales = 15,500 × 6 = 93,000. Wages = 4,500 × 6 = 27,000. Total = US\\$120,000." }),
            P.num({ label: "(iii)", marks: 2, kind: "money", value: tb - tc, stem: "Calculate the net benefit.", wrong: [tb + tc, tc - tb], explanation: "120,000 − 56,200 = US\\$63,800." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 6, stem: "Analyse how the irrigation project could affect **two** stakeholders of the co-operative.",
          points: ["First stakeholder identified (for example, members of the co-operative) with an effect: higher output and income", "Development: the packhouse reduces spoilage, so more vegetables are sold", "Consequence: higher incomes for members and progress towards the 30% sales target", "Second stakeholder identified (for example, downstream households) with an effect: less river water", "Development: the water taken for irrigation reduces what is available downstream", "Consequence: conflict or protests, or a possible permit problem with the council"],
          modelAnswer: "Members of the co-operative will gain because the packhouse stops vegetables from spoiling, so more are sold. Their incomes rise and the co-operative moves towards its 30% sales target. Downstream households may lose because the irrigation takes water from the river that they also use. This could lead to protests and difficulty in obtaining the permits the project needs from the council, which could delay it.",
          hints: ["Use the facts in the case for each stakeholder."],
          explanation: "Two stakeholders with effect, development and consequence.",
          type: "EXTENDED_RESPONSE", wordLimit: { max: 250 }, levels: [[1, 1, 2, "Names effects with little explanation"], [2, 3, 4, "Explains effects using the case"], [3, 5, 6, "Developed chains for both stakeholders"]],
        }),
        P.manual({
          label: "(e)", marks: 4, stem: "Outline **four** legal requirements that the co-operative should consider when starting the project.",
          points: ["Registering the business or project", "Obtaining permits or licences, such as to take water from the river", "Paying tax on its income", "Following labour law when employing villagers (contracts, pay, safety)"],
          modelAnswer: "The co-operative should register the project, obtain a permit to take water from the river, pay tax on its income, and follow labour law when it employs villagers, including contracts, pay and safe conditions.",
          explanation: "One mark for each requirement.",
        }),
        P.manual({
          label: "(f)", marks: 7, stem: "Evaluate whether the co-operative should go ahead with the irrigation and packhouse project.",
          points: ["Highest weighted score (3.60) of the three ideas", "Net benefit of US\\$63,800 over six years and positive", "Likely to meet the objective by reducing spoilage and raising sales", "Costs: US\\$56,200 is more than the US\\$40,000 saved, so borrowing is needed", "Risk of conflict with downstream households and permit delays", "Many benefit values are estimates, so the result should be tested", "Judgement with a condition, such as consulting households, securing the permit and testing lower benefits"],
          modelAnswer: "The project has the highest weighted score (3.60) and a net benefit of US\\$63,800 over six years. By stopping spoilage it should help the co-operative to reach its sales target. But the total costs of US\\$56,200 are more than the US\\$40,000 the members have saved, so they must borrow, and downstream households could object and delay the permit. Many of the benefits are estimates. The co-operative should go ahead if it consults the households, secures the permit and finds that the project still has a positive net benefit when the benefits are valued lower.",
          hints: ["Use the weighted score, the net benefit, the funding gap and the risks."],
          explanation: "Evidence for and against and a conditional judgement.",
          type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: [[1, 1, 2, "Lists points with little use of the case; no judgement"], [2, 3, 5, "Applies the figures and considers both sides; judgement stated"], [3, 6, 7, "Balanced, applied evaluation and a justified recommendation with a condition"]],
        }),
      ]),
      hints: ["Weighted score = sum of (score × weight) ÷ 100.", "Total costs include running costs for all six years."],
      explanation: "Target US\\$195,000; weighted score 3.60 (highest); costs US\\$56,200; benefits US\\$120,000; net benefit US\\$63,800; stakeholders, legal requirements and a recommendation.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: ZIM_ESSAY25 (stakeholders and shareholders)
  b.struct({
    ...zim(EXAM.ZIM_ESSAY25, { d: 4, paper: "ZIMSEC Business Studies Paper 2" }),
    concepts: ["abus.stakeholders.roles-influence", "abus.objectives.aims-types"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe the interests of **three** stakeholders in a business such as a supermarket.",
        points: ["Stakeholder 1 named (shareholders)", "Interest described: dividends and growth in the value of shares", "Development: they want the supermarket to be profitable and to grow", "Stakeholder 2 named (employees)", "Interest described: good pay, job security and safe conditions", "Development: they want training and fair treatment", "Stakeholder 3 named (customers)", "Interest described: good quality and fair prices", "Development: they want safe goods, a wide range and good service", "Link to the supermarket, for example how each group can react (leave, boycott, strike)"],
        modelAnswer: "Shareholders own the supermarket and want a return on their investment in the form of dividends and a rise in the value of their shares. They therefore want the supermarket to be profitable and to grow. Employees are interested in good pay, job security and safe working conditions, and they also want training and fair treatment from managers. If they are unhappy they may leave or strike. Customers want good quality goods at fair prices, safe products, a wide range and good service. If the supermarket fails to give this, they will shop elsewhere. Other groups such as suppliers, lenders and the community have interests too, but these three are the most directly affected.",
        explanation: "Three stakeholders, each with an interest and a development.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 600 }, levels: LV15,
        stem: "Discuss whether a business should always put the interests of its shareholders before those of its other stakeholders.",
        points: ["Shareholders own the business and take the risk, so they expect a return", "Without profit the business may not survive, which would harm all stakeholders", "Shareholders can sell shares or replace directors if unhappy", "Dividends and growth reward investors and help the firm to raise more finance", "Other stakeholders such as workers can reduce profit by leaving or striking", "Customers can switch to rivals if the business ignores quality and price", "The community and pressure groups can damage the firm's reputation", "Governments can fine or restrict a firm that ignores law and safety", "Treating stakeholders well can raise productivity and loyalty, which helps shareholders in the long run", "Interests often conflict (for example, wages against dividends), so the managers must balance them", "Short-term versus long-term: cutting wages may raise profit now but harm the firm later", "Small firms with owner-managers may find the owners' interests coincide with the firm's survival", "Large firms with many shareholders may be more under pressure to put dividends first", "Judgement that states a view on whether shareholders should always be first", "A condition or time-frame supporting the judgement"],
        modelAnswer: "Shareholders own the business and take the risk, so they expect a return, and without profit the business might not survive, which would harm everyone connected with it. Shareholders can sell their shares or replace the directors if they are unhappy, and dividends and growth help the firm to raise more finance.\n\nHowever, other stakeholders can reduce profit if they are ignored. Workers may leave or go on strike, customers can switch to rivals if quality and price are neglected, pressure groups can damage the firm's reputation and the government can fine or restrict a firm that breaks the law. Treating stakeholders well often raises productivity and loyalty, which helps shareholders in the long run. Interests do conflict, for example wages against dividends, so managers must balance them. Cutting wages may raise profit this year but harm the firm later.\n\nThe importance of shareholders also depends on the firm. In a small business where the owner is also the manager, the owner's interests and the firm's survival usually coincide, whereas in a large company with many shareholders there may be more pressure to put dividends first.\n\nOverall, a business should not always put shareholders first. In the short run it may need to satisfy them to raise finance, but in the long run the firm that treats workers, customers and the community fairly is more likely to earn profits that shareholders value. Shareholders should come first only when the firm's survival depends on it, for example in a financial crisis.",
        explanation: "Reasons for and against, links to the long run and a conditional judgement.",
      }),
    ]),
    hints: ["Part (b): give arguments for putting shareholders first and against, then judge."],
    explanation: "(a) three stakeholders and their interests; (b) shareholders compared with other stakeholders with a conditional judgement.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: ZIM_ESSAY25 (trade barriers and regional integration)
  b.struct({
    ...zim(EXAM.ZIM_ESSAY25, { d: 4, paper: "ZIMSEC BES Paper 2" }),
    concepts: ["abus.international.trade-integration"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Explain how **three** different trade barriers may affect an enterprise that imports goods.",
        points: ["Tariff named: a tax on imports", "Effect: the cost of the imported goods rises", "Development: the enterprise must raise prices or accept lower profit", "Quota named: a limit on the quantity of imports", "Effect: the enterprise cannot bring in as much as it wants", "Development: shortages, higher prices and lost sales", "Standards and licences named: technical, safety or permit requirements", "Effect: extra cost and delay", "Development: goods that do not comply may be refused entry", "Link to a response, such as finding local suppliers"],
        modelAnswer: "A tariff is a tax on imports. It raises the cost of the imported goods, so the enterprise must raise its prices, which may reduce sales, or accept a lower profit. A quota limits the quantity that may be imported. The enterprise cannot bring in as much as it wants, which can cause shortages, higher prices and lost sales. Standards and licences, such as safety rules or import permits, add cost and delay and goods that do not comply may be refused entry. The enterprise may respond by finding local suppliers or by changing the goods it sells.",
        explanation: "Three barriers, each with its effect and a development.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 600 }, levels: LV15,
        stem: "Discuss whether regional economic integration benefits small enterprises in Zimbabwe.",
        points: ["Integration removes or lowers tariffs between members", "Small enterprises can sell in larger regional markets", "Cheaper imported inputs from members can lower costs", "Economies of scale are possible with larger sales", "Easier movement of goods and sometimes labour and capital", "Technology and information about markets spread more easily", "More competition from firms in partner countries, some of which are bigger and cheaper", "Small enterprises often lack the finance, transport and information to export", "Border delays, paperwork and different rules remain", "Standards and quality requirements may be difficult for small firms to meet", "Unequal gains: larger firms and larger economies may benefit more", "Some small firms in niche or local markets are little affected", "Support from government or associations can help small enterprises to take advantage", "Judgement that states whether small enterprises benefit overall", "A condition or time-frame supporting the judgement"],
        modelAnswer: "Regional integration lowers or removes tariffs between members, so small Zimbabwean enterprises can sell in larger markets and may buy cheaper inputs from other members. Larger sales can bring economies of scale, and goods and information move more easily.\n\nHowever, the same agreement exposes small enterprises to competition from firms in partner countries, some of which are bigger and have lower costs. Small enterprises often lack the finance, transport and market information to export. Border delays, paperwork and different standards may still block them, and the largest firms and larger economies may gain more than small ones. Enterprises that serve a local or niche market, such as fresh bread, may be little affected either way.\n\nOverall, regional integration offers small enterprises an opportunity, but whether they benefit depends on their ability to compete and to meet standards. Enterprises that are efficient, produce goods with a clear advantage and receive support in finance, transport and information are likely to gain. Those that depend on tariff protection and cannot improve their costs are more likely to lose. The effect will also appear over time, as it takes years to build export relationships.",
        explanation: "Opportunities and threats weighed, with a conditional judgement.",
      }),
    ]),
    hints: ["Part (b): consider markets, costs and competition, then judge."],
    explanation: "(a) three trade barriers and their effects on an importer; (b) regional integration and small enterprises with a conditional judgement.",
  });
});
