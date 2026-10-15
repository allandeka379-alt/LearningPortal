// W2b: Cambridge exam-format items: one Paper 4 Section A data response (3 + 5 + 5 + 7 marks, externalities) and two Paper 4 microeconomics essays (20 marks).
import { concept, P, chk, table, linearMarket, EXAM, checkExam, CAM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P4D = { skill: EXAM.CAM_P4_DATA.skill, secs: EXAM.CAM_P4_DATA.secs, applies: EXAM.CAM_P4_DATA.applies, examStyle: true, paper: "Paper 4" };
const P4E = { skill: EXAM.CAM_P4_ESSAY.skill, secs: EXAM.CAM_P4_ESSAY.secs, applies: EXAM.CAM_P4_ESSAY.applies, examStyle: true, paper: "Paper 4" };

const LV20 = [
  [3, 14, 20, "Developed, two-sided analysis, well applied, with evaluation and a justified judgement that answers the question."],
  [2, 7, 13, "Some analysis and some application; evaluation limited or not supported; judgement partial."],
  [1, 1, 6, "Simple, undeveloped points; little analysis or evaluation."],
];
const LV7 = [
  [3, 5, 7, "Developed analysis of both sides, applied to the data, with a supported judgement."],
  [2, 3, 4, "Some analysis, limited use of the data or an unsupported judgement."],
  [1, 1, 2, "Simple, undeveloped statements."],
];

concept(A("intervention.externalities"), { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ Paper 4 Section A: a cement works and dust pollution
  const mk = linearMarket({ a: 126, b: 0.5, c: 18, d: 0.25 });
  const so = linearMarket({ a: 126, b: 0.5, c: 30, d: 0.25 });
  chk(mk.quantity, 144, 1e-9); chk(mk.price, 54, 1e-9); chk(so.quantity, 128, 1e-9); chk(so.price, 62, 1e-9);
  const wl = 0.5 * 12 * (mk.quantity - so.quantity); chk(wl, 96, 1e-9);
  const taxRev = 12 * so.quantity; chk(taxRev, 1536, 1e-9);
  const mpb = (q) => 126 - 0.5 * q, mpc = (q) => 18 + 0.25 * q;
  const rows = [96, 112, 128, 144].map((q) => [q, mpb(q), mpc(q), 12, mpc(q) + 12]);
  chk(mpc(144), 54, 1e-9); chk(mpc(128) + 12, 62, 1e-9);
  const t1 = table(["Output (thousand tonnes)", "MPB = price (US\\$ per tonne)", "MPC (US\\$ per tonne)", "MEC (US\\$ per tonne)", "MSC (US\\$ per tonne)"], rows);

  b.struct({
    ...P4D, d: 5, calculator: true,
    concepts: [A("intervention.externalities"), A("intervention.cost-benefit")],
    hints: ["MSC = MPC + MEC; the free market produces where MPB = MPC.", "In (d) compare the tax and the regulation using the data and the limits of each."],
    stem: `**Dust from the Zandia Cement Works** (a fictional business)\n\nThe Zandia Cement Works is the only cement producer in a fictional country's western region. Its kilns release fine dust that settles on the farms and in the houses of a nearby town. A study by a university team finds that the dust raises health-care costs and reduces the yield of farms in the town by an amount equal to US\\$12 for every tonne of cement produced.\n\nThe marginal private benefit (MPB, the demand for cement) is given by P = 126 − 0.5Q and the marginal private cost (MPC) of the works by P = 18 + 0.25Q, where P is in US\\$ a tonne and Q in thousand tonnes a year. The marginal external cost (MEC) is a constant US\\$12 a tonne. Table 1 shows selected values.\n\n**Table 1: Marginal benefits and costs at selected levels of output (illustrative data)**\n\n${t1}\n\nThe works employs 800 people and is the largest taxpayer in the region. It says that a heavy tax would force it to close kilns and dismiss workers, and that dust from its kilns has fallen since it installed filters last year. Town residents say that the dust has not stopped and that their health costs have continued to rise. The government is considering either a tax on each tonne of cement or a rule that limits the dust released by each kiln, with fines for breaking the rule. The environment agency has only a small staff and says it has never measured the dust in the town directly.`,
    parts: checkExam(EXAM.CAM_P4_DATA, [
      P.group({ label: "(a)", stem: "Use the data.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", value: mk.quantity, unit: "units", stem: "Calculate the free market output, in thousand tonnes.", wrong: [128, 96, 108], explanation: "MPB = MPC: 126 − 0.5Q = 18 + 0.25Q, so 108 = 0.75Q and Q = 144 thousand tonnes." }),
        P.num({ label: "(ii)", marks: 2, kind: "plain", value: so.quantity, unit: "units", stem: "Calculate the socially optimum output, in thousand tonnes.", wrong: [144, 136, 156], explanation: "MSC = 30 + 0.25Q. Setting 126 − 0.5Q = 30 + 0.25Q gives 96 = 0.75Q and Q = 128 thousand tonnes." }),
      ] }),
      P.group({ label: "(b)", stem: "The works produces at the free market output.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "plain", value: wl, unit: "US$ thousand", stem: "Calculate the welfare loss, in US\\$ thousand.", wrong: [192, 1728, 48], explanation: "Over-production = 144 − 128 = 16 thousand tonnes. Welfare loss = ½ × 16 × 12 = 96 (US\\$ thousand, because quantities are in thousands)." }),
        P.manual({ label: "(ii)", marks: 3, stem: "Explain why the works produces more than the socially optimum output.",
          points: ["The works counts only its private costs (MPC).", "The US\\$12 dust cost falls on the town and is an external cost the works ignores.", "Marginal social cost is higher than marginal private cost, so output at MPB = MPC (144) is more than the optimum (128)."],
          modelAnswer: "The works counts only its own private costs. The dust cost of US\\$12 a tonne falls on the town and is ignored, so marginal social cost is higher than marginal private cost. The works produces where MPB equals MPC, 144 thousand tonnes, which is more than the optimum of 128 thousand tonnes." }),
      ] }),
      P.group({ label: "(c)", stem: "The government considers a tax of US\\$12 on each tonne.", parts: [
        P.num({ label: "(i)", marks: 2, kind: "plain", value: taxRev, unit: "US$ thousand", stem: "Calculate the revenue from the tax at the socially optimum output, in US\\$ thousand.", wrong: [1728, 144, 768], explanation: "Tax revenue = 12 × 128 = US\\$1,536 thousand." }),
        P.manual({ label: "(ii)", marks: 3, stem: "Explain how a tax of US\\$12 a tonne would move output to the socially optimum level.",
          points: ["The tax is equal to the marginal external cost, so the external cost becomes a private cost to the works (internalised).", "The MPC curve shifts up by US\\$12 and becomes equal to MSC.", "The works now produces where MPB = MPC + tax, which is the social optimum of 128 thousand tonnes."],
          modelAnswer: "A tax equal to the marginal external cost makes the works pay for the dust, so the external cost is internalised. Its marginal private cost curve shifts up by US\\$12 and coincides with the marginal social cost curve, so the works now produces where MPB equals MPC plus the tax, which is the social optimum of 128 thousand tonnes." }),
      ] }),
      P.manual({ label: "(d)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 350 }, levels: LV7,
        stem: "Evaluate whether a tax on each tonne is better than a rule limiting dust from each kiln as a way of dealing with the pollution.",
        points: ["A tax of US\\$12 equal to the MEC would reduce output to the optimum and raise revenue (US\\$1,536 thousand) that could compensate the town.", "A tax lets the works choose how to cut costs (cheaper pollution control), so it is flexible.", "The tax requires knowing the MEC accurately; the external cost is only a study's estimate and the agency has never measured the dust.", "A tax raises costs and prices and may reduce output and jobs (800 workers).", "A limit on dust directly cuts the pollution but needs measurement and enforcement, which the small agency may lack.", "A rule does not make the works pay for the damage, and a fixed limit may be set wrongly.", "Judgement: a tax is likely to be better if the external cost can be estimated and collected; if measurement is weak, a limit with monitoring or a combination may be needed."],
        modelAnswer: "A tax of US\\$12 a tonne, equal to the marginal external cost, would reduce output to the social optimum of 128 thousand tonnes and raise revenue of about US\\$1,536 thousand, which could compensate the town. It leaves the works free to decide how to reduce its costs, for example by cutting dust more cheaply, so it is flexible. However, the tax requires an accurate estimate of the external cost, and the US\\$12 comes from one study; if it is wrong the tax will be too high or too low. It would also raise the works' costs and prices and might cost some of the 800 jobs. A limit on the dust released by each kiln acts directly on the pollution, but it requires measurement and enforcement, and the environment agency has a small staff and has never measured dust in the town; a fixed limit also does not make the works pay for the damage, and it may be set wrongly. Overall a tax is likely to be better if the external cost can be estimated and collected reliably, but where measurement is weak a combination of a limit with proper monitoring may be needed." }),
    ]),
    explanation: "Market 144, optimum 128 thousand tonnes; welfare loss US$96 thousand; tax revenue US$1,536 thousand; compare a tax (flexible, needs MEC) with a limit (direct, needs monitoring).",
  });

  // ------------------------------------------------------------------ Paper 4 essays (microeconomics)
  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("labour.wage-determination"), A("labour.demand-mrp")],
    hints: ["Consider competitive markets, monopsony and the effects on productivity.", "Reach a judgement on when a union raises wages without reducing employment."],
    stem: "'Trade unions can raise wages for their members only by reducing employment.' Discuss.",
    points: [
      ["Defines a trade union and collective bargaining; the competitive labour market (MRP demand, supply, equilibrium wage).", 2],
      ["In a competitive market a union wage above equilibrium reduces the quantity of labour demanded: unemployment among outsiders.", 3, ["movement along the demand curve"]],
      ["Elasticity of demand for labour: if inelastic, the loss of jobs is small and the wage bill rises; if elastic, large loss of jobs.", 3],
      ["Monopsony: a union can raise both the wage and employment towards the competitive level (MRP = MCL).", 3, ["MCL"]],
      ["Productivity: unions may raise the MRP through training and morale, shifting demand to the right.", 2],
      ["Insiders and outsiders: members gain, and others may lose, creating a differential.", 1],
      ["Higher costs raise prices or lead firms to substitute capital for labour and to reduce competitiveness.", 2],
      ["Union power depends on membership, replaceability and the state of the economy (strength is limited in a recession or large informal sector).", 1],
      ["Strikes and the cost of disputes.", 1],
      ["Evaluation: short run and long run, size of the wage rise, and the type of labour market; a justified judgement.", 2],
    ],
    levels: LV20, wordLimit: { min: 300, max: 900 },
    modelAnswer: "A trade union bargains collectively for higher pay and better conditions. In a competitive labour market, where demand for labour is based on marginal revenue product and the wage settles where demand equals supply, a union that raises the wage above equilibrium reduces the quantity of labour demanded along the demand curve. Employment falls and outsiders who would have been hired lose out, while insiders gain. How large the fall in employment is depends on the elasticity of the demand for labour: if demand is inelastic, few jobs are lost and the total wage bill rises, but if it is elastic many jobs are lost. The statement is not always true, however. Where a firm is a monopsony it pays less than the competitive wage and employs fewer workers, because the marginal cost of labour exceeds the wage. A union can raise the wage and the employment towards the competitive level, so both rise. A union can also raise productivity through training and by improving morale and reducing turnover, which raises MRP and shifts the demand for labour to the right, so a higher wage need not reduce employment. On the other hand, higher wages raise costs, so firms may raise prices, lose competitiveness or replace labour with machinery, and strikes are costly. The strength of a union depends on its membership, on how easily its members can be replaced and on the state of the economy, so in a recession or where the informal sector is large its power is limited. The effect also differs between the short run and the long run, as firms take time to adjust. Overall, the statement is true for competitive labour markets with elastic demand, but it overstates the case where there is a monopsony or where unions raise productivity, so the result depends on the market and on the size of the wage rise.",
    explanation: "Competitive market: wage rise reduces employment (depending on elasticity); monopsony and productivity effects can raise wages without reducing employment.",
  });

  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("intervention.externalities"), A("intervention.cost-benefit")],
    hints: ["Explain the external cost and the welfare loss, then the policy options.", "Evaluate with measurement, enforcement and effects on jobs."],
    stem: "'Government intervention is always needed to deal with negative externalities.' Discuss.",
    points: [
      ["Defines negative externality (external cost) and social cost = private cost + external cost; the market produces where MPB = MPC.", 2],
      ["Over-production compared with the social optimum (MSB = MSC) and the welfare loss.", 3, ["welfare loss", "MSC"]],
      ["Taxes equal to the marginal external cost internalise the externality and raise revenue.", 2],
      ["Regulation, standards, bans and fines; tradable permits as a market-based approach.", 2],
      ["Subsidies for cleaner technology.", 1],
      ["Difficulties: measuring the external cost and setting the tax or standard correctly.", 2],
      ["Costs of monitoring and enforcement; government failure (poor information, lobbying).", 2],
      ["Effects on prices, jobs, competitiveness and the poor.", 1],
      ["Private solutions: negotiation (property rights), reputation and social pressure; limits when many people are affected.", 2],
      ["Cost-benefit analysis can help to decide whether intervention is worthwhile: compare the benefit of reducing the externality with the cost of the policy.", 2],
      ["Judgement: intervention is usually needed when the external cost is large and private solutions are not available; it is not needed if the cost is small or private bargaining works.", 1],
    ],
    levels: LV20, wordLimit: { min: 300, max: 900 },
    modelAnswer: "A negative externality is a cost of production or consumption that falls on a third party, so social cost is private cost plus external cost. The free market produces where marginal private benefit equals marginal private cost, which is more than the social optimum where marginal social benefit equals marginal social cost, so there is over-production and a welfare loss. Government intervention can correct this. A tax equal to the marginal external cost makes the producer pay for the damage, which internalises the externality and raises revenue that can compensate those affected. Regulation, such as standards, bans and fines, can directly limit the pollution, tradable permits can cap the total at low cost, and subsidies can help firms adopt cleaner technology. But the claim that intervention is always needed is too strong. It is difficult to measure the external cost and so to set the tax or standard at the right level, and monitoring and enforcement may be costly; governments may also lack information or be influenced by interest groups, causing government failure. Taxes and regulation can raise prices, reduce jobs and competitiveness, and fall most heavily on the poor. In some cases a private solution is possible: if property rights are clear, the parties may negotiate, and reputation or social pressure may also reduce the harm, although bargaining is hard when many people are affected. Cost-benefit analysis can help to decide whether a policy is worthwhile by comparing the benefit of reducing the externality with the cost of the policy. Overall, intervention is usually needed when the external cost is large and private solutions are not available, but it is not always needed, and the policy chosen should be one whose benefits exceed its costs.",
    explanation: "Externality causes over-production and welfare loss; taxes, regulation and permits can correct it, but measurement, enforcement and government failure limit them, and private solutions may work in some cases.",
  });
});
