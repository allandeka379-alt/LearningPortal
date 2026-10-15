// W2b: ZIMSEC exam-format items: one Paper 2 data-response question (20 marks, labour market) and three Paper 3 essays (10 + 15 marks).
import { concept, P, chk, fmt, table, schedule, pctChange, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P2 = { skill: EXAM.ZIM_P2_DATA.skill, secs: EXAM.ZIM_P2_DATA.secs, applies: EXAM.ZIM_P2_DATA.applies, examStyle: true, paper: "Paper 2" };
const P3 = { skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, examStyle: true, paper: "Paper 3" };

const LV15 = [
  [3, 11, 15, "Two-sided, developed and applied analysis with a justified conclusion that answers the question."],
  [2, 6, 10, "Some analysis of one or both sides, limited application, a partial or unsupported conclusion."],
  [1, 1, 5, "Simple, undeveloped points with little or no explanation or conclusion."],
];
const LV5 = [
  [3, 4, 5, "Both sides weighed using the data, with a supported judgement."],
  [2, 2, 3, "Some weighing of both sides with limited use of the data."],
  [1, 1, 1, "A simple statement with little application."],
];

concept(A("labour.wage-determination"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ Paper 2 data response: a district labour market with a minimum wage
  const wages = [4, 5, 6, 7, 8], qd = [600, 500, 400, 300, 200], qs = [200, 300, 400, 500, 600];
  const s = schedule({ prices: wages, qd, qs, priceHeader: "Hourly wage (US\\$)", qdHeader: "Workers demanded", qsHeader: "Workers supplied", requireEquilibrium: true });
  chk(s.equilibrium.price, 6); chk(s.equilibrium.quantity, 400);
  const unemployed = qs[3] - qd[3]; chk(unemployed, 200);
  const bill0 = 6 * 400, bill1 = 7 * 300; chk(bill1 - bill0, -300);
  const ped = pctChange(400, 300) / pctChange(6, 7); chk(ped, -1.5, 1e-9);

  b.struct({
    ...P2, d: 4, calculator: true,
    concepts: [A("labour.wage-determination"), A("labour.wage-differentials"), A("labour.demand-mrp")],
    hints: ["At the minimum wage, compare the workers demanded with the workers supplied.", "Elasticity: percentage change in workers demanded divided by the percentage change in the wage."],
    stem: `**Wages in Dambo District** (a fictional district)\n\nDambo District has two main employers: a large commercial farm and a small coal mine. Most of the 400 general workers in the district are hired by the farm and by a number of small businesses in the market town. Wages in the district are mostly set by the demand for and the supply of general workers, and the table shows the position before any government action.\n\n**Table 1: The market for general workers in Dambo District (illustrative data)**\n\n${s.md}\n\nIn the mine, underground drillers earn about US\\$9 an hour, against about US\\$6 an hour for farm labourers. The drillers must work in dust and heat and on night shifts, and it takes about two years to train a driller, while a farm labourer can start work after a few days' instruction. The mine owner says that it would be unable to attract enough drillers if it paid the farm wage.\n\nThe government now introduces a minimum wage of US\\$7 an hour for general workers throughout the district. Supporters of the policy argue that it will raise the incomes of the lowest paid and reduce poverty. Critics argue that it will make employers cut jobs and push some of them to hire workers informally and avoid the new rule. The local council has asked an economist to study the effects of the policy on the district.\n\nThe economist notes that the district has no other large employers, that many workers cannot easily move to other districts because of family ties and the cost of housing, and that the farm needs the same number of workers throughout the year.`,
    parts: checkExam(EXAM.ZIM_P2_DATA, [
      P.group({ label: "(a)", stem: "Use Table 1.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: 6, stem: "State the equilibrium wage, in US\\$ an hour.", wrong: [4, 7, 8], explanation: "Workers demanded and supplied are both 400 at US\\$6." }),
        P.num({ label: "(ii)", marks: 2, kind: "plain", value: unemployed, unit: "workers", stem: "Calculate the number of unemployed workers when the minimum wage of US\\$7 is introduced.", wrong: [100, 300, 500], explanation: "At US\\$7, 500 workers are supplied and 300 demanded: unemployment = 500 − 300 = 200 workers." }),
      ] }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: bill1 - bill0, unit: "US$ per hour", stem: "Calculate the change in the total hourly wage bill of employed workers when the minimum wage is introduced, in US\\$ (a negative number for a fall).", wrong: [300, 2100, 2400], explanation: "Before: 6 × 400 = US\\$2,400. After: 7 × 300 = US\\$2,100. Change = −US\\$300." }),
      P.num({ label: "(c)", marks: 2, kind: "elasticity", value: Math.abs(ped), dp: 2, stem: "Calculate the wage elasticity of demand for labour between US\\$6 and US\\$7. Ignore the sign and give your answer to two decimal places.", wrong: [0.67, 1.33, 0.25], explanation: "%Δ workers demanded = (300 − 400) ÷ 400 × 100 = −25%. %Δ wage = (7 − 6) ÷ 6 × 100 = 16.7%. Elasticity = 25 ÷ 16.7 = 1.50 (elastic)." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why a minimum wage of US\\$7 may cause unemployment in this market.",
        points: ["US\\$7 is above the equilibrium wage of US\\$6, so it is a binding minimum.", "At the higher wage employers demand fewer workers (300 against 400).", "At the higher wage more people want to work (500 against 400).", "Quantity supplied exceeds quantity demanded, so 200 workers are unemployed."],
        modelAnswer: "A wage of US\\$7 is above the equilibrium wage of US\\$6, so it is binding. At the higher wage employers demand only 300 workers instead of 400, because labour is more expensive, while 500 people want to work instead of 400. The quantity supplied exceeds the quantity demanded, so 200 workers are unemployed." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain why drillers earn more than farm labourers.",
        points: ["Underground work in dust, heat and at night is unattractive and must be compensated (a compensating differential).", "Drillers need training, so fewer people can supply the labour (supply is smaller and more inelastic).", "Drillers' MRP is high because their output (coal) is worth a lot and they use costly equipment (so the mine's demand is high).", "Farm labour needs little training, so supply is large and the wage is lower."],
        modelAnswer: "Underground work in dust, heat and at night is unattractive, so the mine must pay more to attract workers: a compensating differential. Drillers also need two years of training, so fewer people can supply the labour and the supply is smaller, while farm labourers need almost no training and are plentiful. The marginal revenue product of a driller, who works with costly equipment to produce valuable coal, is higher, so the mine is willing to pay more." }),
      P.manual({ label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 250 }, levels: LV5,
        stem: "Discuss whether the council should support the minimum wage in Dambo District.",
        points: ["For: it raises the wage of workers who keep their jobs (300 workers earn US\\$7 instead of US\\$6).", "Against: 200 workers are unemployed and the total wage bill falls by US\\$300 an hour.", "Demand for labour is elastic (1.50), so the loss of jobs is relatively large.", "If the farm has monopsony power (few other employers, immobile workers) a minimum wage could raise employment, so the effect depends on the market.", "Judgement: depends on the level, the elasticity, the enforcement and the informal sector; a smaller minimum may be better."],
        modelAnswer: "The minimum wage would raise the pay of the 300 workers who keep their jobs from US\\$6 to US\\$7, which supports the aim of helping the lowest paid. However, 200 workers would be unemployed and the total wage bill would fall by US\\$300 an hour, because the demand for labour is elastic (1.50). On the other hand, if the farm is almost the only employer and workers cannot easily move, it may hold wages below the competitive level, and then a moderate minimum wage might raise employment instead. Overall, the council should be cautious: at US\\$7 the evidence in the table suggests more harm than good in a competitive market, and a lower minimum wage, with good enforcement, would carry less risk." }),
    ]),
    explanation: "Equilibrium wage US\\$6; unemployment 200 at US\\$7; wage bill falls by US\\$300; elasticity 1.50; compensating differential and training explain the drillers' wage; discuss pay gains against job losses.",
  });

  // ------------------------------------------------------------------ Paper 3 essays
  // Essay 1: mergers and efficiency
  b.struct({
    ...P3, d: 5,
    concepts: [A("firms.growth-integration"), A("firms.efficiency")],
    hints: ["In (a) give the motives and link each to costs or market power.", "In (b) weigh economies of scale and innovation against market power and diseconomies."],
    stem: "Two large retailers in a Zimbabwean city agree to merge.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why firms may choose to grow by merger or takeover.",
        points: [
          "A merger joins two firms into one; a takeover is the purchase of one firm by another.",
          "To gain economies of scale (lower average cost, for example in buying, marketing and distribution).",
          "To increase market share and market power, raising the ability to set prices.",
          "To remove a competitor (horizontal integration).",
          "To secure supplies of inputs (vertical integration backwards) and reduce the risk of shortages.",
          "To secure outlets for products (vertical integration forwards).",
          "To spread risk by diversifying into different markets (conglomerate integration).",
          "To acquire the technology, skills, brands or customers of another firm.",
          "Growth through merger is faster than internal (organic) growth.",
          "Managers may seek the prestige or higher pay of a larger firm (the principal-agent problem).",
        ],
        modelAnswer: "A merger joins two firms into one, and a takeover is the purchase of one firm by another. Firms may grow in this way to gain economies of scale, since a larger firm can buy in bulk, spread its advertising and distribution costs and so lower its average costs. A horizontal merger removes a competitor and raises market share and market power, which allows the firm to set prices with less fear of rivals. Vertical integration backwards secures supplies of inputs and forwards secures outlets for the product, reducing the risk of shortages. A conglomerate merger spreads risk by diversifying into different markets. A firm may also acquire technology, skills, brands or customers that would take time to build. Growth by merger is faster than organic growth. Finally, managers may favour growth for prestige or pay, which can differ from the interests of the owners." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether consumers are likely to benefit from the merger of two large firms in the same industry.",
        points: [
          "Economies of scale may lower average costs and, if passed on, prices.",
          "Larger firms may have the funds to invest in new technology and quality (dynamic efficiency).",
          "A larger firm may be able to offer a wider range of products or better service.",
          "Reduced competition gives the merged firm market power: it may raise prices and cut output.",
          "Consumers may face less choice if products are discontinued.",
          "Higher prices and supernormal profit may represent a transfer from consumers and a welfare loss.",
          "Less competition may lead to X-inefficiency and less incentive to improve.",
          "Diseconomies of scale: the larger firm may be harder to manage and costs may rise.",
          "Costs of the merger, such as redundancies and the integration of systems, may be passed on.",
          "The effect depends on the market share of the merged firm and on the strength of the remaining competitors.",
          "The threat of entry (contestability) or imports can discipline the merged firm.",
          "Competition authorities and regulators may block the merger or set conditions.",
          "Workers may lose jobs or gain from a stronger firm.",
          "Short run and long run: costs may rise at first and fall later as savings are realised.",
          "A justified conclusion that weighs the likely benefits and costs.",
        ],
        modelAnswer: "A merger of two large retailers could benefit consumers in several ways. The larger firm may gain economies of scale, for example by buying in bulk and spreading its distribution costs, and if the saving is passed on, prices fall. It may also have more funds to invest in new technology, a wider range of products and better service, so there is a gain in dynamic efficiency. However, a horizontal merger removes a competitor, so the firm gains market power and may raise prices and restrict choice. If it earns supernormal profit there is a transfer from consumers to the firm and a welfare loss, and with less competition the firm may become X-inefficient. A larger firm may also suffer diseconomies of scale, as it becomes harder to manage, and the costs of combining the two firms may be passed on to consumers. The outcome depends on the combined market share, on how strong the remaining competitors are, and on whether new firms or imports can enter the market. Competition authorities may block the merger or attach conditions. In the short run costs may rise as the firms are integrated, while savings come later. Overall, consumers are likely to gain only if the economies of scale are large and competition remains strong; if the merged firm has a dominant share and entry is difficult, the risk of higher prices is greater, and the merger should be examined carefully." }),
    ]),
    explanation: "(a) Motives: scale economies, market power, removal of a competitor, vertical and conglomerate integration, speed. (b) Lower costs and innovation against market power and diseconomies; depends on competition.",
  });

  // Essay 2: labour demand, supply and unions
  b.struct({
    ...P3, d: 5,
    concepts: [A("labour.demand-mrp"), A("labour.supply"), A("labour.wage-determination")],
    hints: ["In (a) cover demand (MRP) and supply for an occupation.", "In (b) consider competitive markets, monopsony and productivity effects of unions."],
    stem: "Nurses in a country's public hospitals belong to a trade union.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain the factors that determine the wage in a particular occupation.",
        points: [
          "The wage depends on the demand for and the supply of labour to the occupation.",
          "Demand for labour is a derived demand, based on marginal revenue product (MRP = MPP × price).",
          "Higher productivity or a higher price of the product raises MRP and demand.",
          "More capital or better technology can raise the productivity of labour.",
          "Supply depends on the wage in the occupation relative to other occupations.",
          "Length and cost of training and qualifications reduce supply.",
          "Non-monetary factors (working conditions, risk, hours, status) affect supply.",
          "Mobility of labour (occupational and geographical) affects the elasticity of supply.",
          "The equilibrium wage is where the quantity demanded equals the quantity supplied.",
          "Unions, minimum wages, discrimination and monopsony may alter the wage from the market level.",
        ],
        modelAnswer: "The wage in an occupation is determined by the demand for and the supply of labour to that occupation. Demand is a derived demand, based on the marginal revenue product of labour, which is the extra output produced by the last worker multiplied by the price of the product. A rise in productivity, from training or technology, or a rise in the price of the product, raises MRP and the demand for labour. Supply depends on the wage in the occupation relative to wages in other jobs, and on the length and cost of training, so skilled occupations have a smaller and less elastic supply. Non-monetary factors such as working conditions, risk, hours and status, as well as the mobility of labour, also affect supply. The equilibrium wage is where the quantity demanded equals the quantity supplied. In practice unions, minimum wages, discrimination and the presence of a dominant employer may move wages away from the market level." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether trade unions raise the wages of their members at the expense of employment.",
        points: [
          "A union bargains collectively and can threaten industrial action to raise wages above the market level.",
          "In a competitive labour market a higher wage reduces the quantity of labour demanded, so employment falls (movement along the demand curve).",
          "The effect depends on the elasticity of labour demand: if demand is inelastic, few jobs are lost and the wage bill rises.",
          "Outsiders (unemployed or non-members) may lose while insiders gain.",
          "Higher wages raise costs, so prices may rise or firms may substitute capital for labour.",
          "In a monopsony a union can raise both the wage and employment (to the competitive level).",
          "Unions may raise productivity through training and better morale, shifting labour demand to the right.",
          "Unions may reduce staff turnover and improve conditions.",
          "Strikes cost output and income and may reduce a firm's competitiveness.",
          "The union's power depends on the share of workers who are members and on the ease of replacing them.",
          "In the public sector, wages depend on government budgets as well as on the union.",
          "Where unemployment is high and the informal sector is large, union power is limited.",
          "The effect on the economy depends on whether the higher wages raise demand or reduce investment.",
          "Time period: effects on employment may be small in the short run but larger in the long run as firms adjust.",
          "A justified conclusion that depends on market type, elasticity and productivity.",
        ],
        modelAnswer: "A union bargains collectively and can threaten industrial action to raise the wages of its members above the market level. In a competitive labour market this reduces the quantity of labour demanded, so employment falls and outsiders who would have been hired may lose out. How many jobs are lost depends on the elasticity of the demand for labour: if demand is inelastic, the loss is small and the total pay of members rises, while if it is elastic the loss of jobs is large. Higher wages also raise costs, so firms may raise prices or replace workers with machines. However, the effect is different in other situations. Where there is a monopsony employer, a union can raise both the wage and employment towards the competitive level. Unions may also raise productivity through training and better morale, which shifts the demand for labour to the right and offsets the cost of higher pay, and they can reduce turnover and improve working conditions. Against this, strikes cost output and may harm competitiveness. The strength of a union depends on the share of workers who belong to it and on how easily they can be replaced, and where unemployment is high and the informal sector is large its power is limited. In the public sector, pay depends on the government's budget as well. Effects on jobs may be small in the short run and larger in the long run as firms adjust. Overall, unions are likely to raise members' wages, but whether this costs jobs depends on the type of market, the elasticity of labour demand and the effect on productivity." }),
    ]),
    explanation: "(a) Wage = demand (MRP) and supply (training, wages elsewhere, mobility). (b) Unions raise members' wages; jobs may be lost in a competitive market but not under monopsony or if productivity rises.",
  });

  // Essay 3: market failure and externalities
  b.struct({
    ...P3, d: 5,
    concepts: [A("intervention.market-failure"), A("intervention.externalities")],
    hints: ["In (a) name the source and say why the market misallocates resources.", "In (b) weigh the social benefit of correcting the externality against the cost and effects of the policy."],
    stem: "A factory beside a river releases waste water that harms fish and the water supply of a downstream town.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why the free market may fail to allocate resources efficiently.",
        points: [
          "Market failure means a misallocation of resources: output is not at the level that maximises the welfare of society.",
          "Public goods are non-excludable and non-rivalrous, so free riders mean that private firms do not supply them.",
          "Externalities: costs or benefits to third parties are ignored, so output differs from the social optimum.",
          "Negative externalities (pollution) lead to over-production; positive externalities lead to under-production.",
          "Merit goods are under-consumed and demerit goods over-consumed because of imperfect information.",
          "Asymmetric information gives one party an advantage and can cause poor decisions.",
          "Monopoly power: price above marginal cost and output below the efficient level.",
          "Factor immobility: resources cannot move to their best use, leading to unemployment.",
          "Common property resources are over-used because nobody owns them.",
          "Inequality: the market allocates by ability to pay and not by need.",
        ],
        modelAnswer: "Market failure occurs when the free market misallocates resources, so that the output is not at the level that maximises the welfare of society. Public goods, which are non-excludable and non-rivalrous, are not supplied by private firms because of the free-rider problem. Externalities are costs or benefits to third parties that the market ignores: pollution causes over-production, while a positive externality such as the benefit of vaccination causes under-production. Merit goods are under-consumed and demerit goods over-consumed because consumers lack full information, and asymmetric information, where one party knows more, can lead to poor decisions. A monopoly restricts output and sets a price above marginal cost. Labour and other factors may be immobile, so they cannot move to their best use. Common property resources such as grazing land are over-used because nobody owns them. Finally, the market allocates by ability to pay, which may leave some people unable to afford basic needs." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether government intervention is the best way to deal with the pollution caused by the factory.",
        points: [
          "The factory ignores the external cost of the pollution, so marginal social cost exceeds marginal private cost and it produces too much.",
          "There is a welfare loss to society (the downstream town and fishermen bear the cost).",
          "A tax equal to the marginal external cost raises the factory's costs and reduces output towards the social optimum.",
          "Regulation (limits on discharges, fines) can set a maximum level of pollution.",
          "Tradable pollution permits can limit total pollution at a low cost.",
          "Subsidies for cleaner technology can reduce pollution without reducing output.",
          "Government can provide information and require monitoring.",
          "Difficulties: measuring the external cost and setting the right tax or standard.",
          "Costs of monitoring and enforcement; a weak enforcement agency reduces effectiveness.",
          "A tax or regulation may raise prices, reduce jobs or lead the firm to move, especially if the factory is a large employer.",
          "Private solutions: the town and the factory could negotiate (property rights), but this is difficult with many people.",
          "Government failure: policy may be poorly designed, influenced by interest groups or costly.",
          "Short run and long run: firms may adopt cleaner technology over time.",
          "Compare the benefits (cleaner water, health) with the costs of the policy.",
          "A justified conclusion on the best policy or combination of policies.",
        ],
        modelAnswer: "The factory ignores the cost of pollution that falls on the downstream town and the fishermen, so marginal social cost is above marginal private cost and it produces more than the social optimum, causing a welfare loss. Government intervention can correct this. A tax equal to the marginal external cost would raise the factory's costs and reduce its output towards the optimum, while regulation, such as limits on the discharge of waste with fines for breaking them, can set a maximum level of pollution. Tradable permits can limit total pollution at a low cost, and subsidies can help the factory adopt cleaner technology. However, intervention has difficulties: the external cost is hard to measure, so the tax or standard may be set wrongly, and monitoring and enforcement cost money and may be weak. A tax or strict regulation may raise prices or cost jobs, especially if the factory is a major employer, and may lead the firm to move. A private solution, in which the town and the factory negotiate, is unlikely to work when many people are affected. Government itself may fail if the policy is badly designed or influenced by interest groups. Over time, firms may adopt cleaner technology in response to the policy. Overall, intervention is probably needed because the market will not correct the problem by itself, but the best policy is likely to be a combination of regulation and an incentive such as a tax or permits, set after weighing the benefits of cleaner water against the costs to the factory and its workers." }),
    ]),
    explanation: "(a) Sources of market failure. (b) Tax, regulation, permits and subsidies can correct the externality; measurement, enforcement and the effect on jobs limit them.",
  });
});
