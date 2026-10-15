// W2b: wage determination in perfect and imperfect labour markets (both boards; Cambridge A Level only, ZIMSEC Forms 5-6).
import { concept, P, ZIM, chk, table, schedule, labourMarket } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.labour.wage-determination", { file: "labour/wage-determination", keyPrefix: "labour.wage-determination" }, (b) => {
  mc(b, [1, "RECALL"], "In a competitive labour market the equilibrium wage is the wage at which",
    ["the quantity of labour demanded equals the quantity supplied", "Correct: there is no shortage or surplus of workers."],
    [["all workers in the market are employed by the government", "That is not what equilibrium means."],
     ["every worker receives the same amount of pay", "Equilibrium does not imply equal pay."],
     ["firms make the largest possible profit from the workers they employ", "Equilibrium concerns the balance of demand and supply."]],
    "Equilibrium wage: labour demanded = labour supplied.");

  mc(b, [2, "UNDERSTANDING"], "A minimum wage set below the equilibrium wage in a competitive labour market will",
    ["have no effect on wages or employment", "Correct: the market wage is already higher."],
    [["raise the wage and reduce employment", "That happens when the minimum is above equilibrium."],
     ["cause a shortage of workers", "No shortage arises from a non-binding minimum."],
     ["lower the equilibrium wage", "A non-binding minimum does not change the equilibrium."]],
    "A minimum wage binds only if it is above the market wage.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Collective bargaining by a trade union means that",
    ["workers negotiate pay and conditions together with employers", "Correct: bargaining as a group."],
    [["employers fix each worker's pay on their own without any discussion", "That is not bargaining."],
     ["the government sets the pay of every worker by law", "That is wages legislation."],
     ["workers set their own pay by choosing their hours", "That describes self-employment."]],
    "Collective bargaining is group negotiation of pay and conditions by union and employer.", { daily: true });

  mc(b, [3, "UNDERSTANDING"], "For a monopsony employer, the marginal cost of labour is above the wage because it",
    ["must raise the wage of all workers to hire one more", "Correct: the higher wage applies to existing workers too."],
    [["pays workers more than they produce", "MCL is not about paying above productivity."],
     ["faces a horizontal supply curve of labour at the going wage rate", "That is the case of a wage taker."],
     ["pays the same wage whatever the number hired", "That describes a competitive buyer."]],
    "With an upward-sloping supply curve, hiring one more worker raises the wage for all workers.", { hints: ["What happens to the wage of existing workers when the firm hires more?"] });

  mc(b, [3, "ANALYSIS"], "A minimum wage above the equilibrium wage in a competitive labour market is likely to",
    ["reduce employment and create unemployment", "Correct: demand falls and supply rises."],
    [["increase employment and reduce unemployment", "Employment falls when the wage is above equilibrium."],
     ["leave employment unchanged and lower wages", "Wages are raised, not lowered."],
     ["create a shortage of workers", "A wage above equilibrium causes a surplus."]],
    "Above equilibrium, quantity supplied exceeds quantity demanded: unemployment.", { hints: ["Compare quantity demanded and supplied at the higher wage."] });

  mc(b, [4, "EVALUATION"], "A moderate minimum wage is most likely to increase employment where",
    ["a single large employer has monopsony power", "Correct: the minimum offsets the employer's power."],
    [["labour demand is very elastic", "Elastic demand magnifies the job losses."],
     ["the minimum is far above the competitive wage", "A very high minimum reduces jobs."],
     ["the market has many employers competing for workers", "In a competitive market a binding minimum reduces jobs."]],
    "Under monopsony the wage is below the competitive level and employment is restricted; a minimum in the right range raises both.", { hints: ["Which market structure pays less than the competitive wage?"] });

  mc(b, [3, "ANALYSIS"], "A trade union is most likely to raise employment in a firm when it",
    ["raises the productivity of workers through training", "Correct: higher MRP shifts demand for labour right."],
    [["secures a wage far above the equilibrium wage", "That reduces employment in a competitive market."],
     ["calls a long strike in the middle of the year", "A strike reduces output."],
     ["limits the number of people who can join the trade", "That reduces labour supply and employment."]],
    "If the union raises productivity, MRP and demand for labour rise.", { hints: ["What raises MRP?"] });

  mc(b, [4, "EVALUATION"], "A union wins a large wage rise for its members in a competitive market. Which group is most likely to lose?",
    ["Workers who would have been employed at the lower wage but now cannot find jobs", "Correct: the outsiders."],
    [["Union members who keep their jobs", "They gain the higher wage."],
     ["Consumers who buy the product at a lower price than before", "Costs rise, so prices do not fall."],
     ["Workers who were already unemployed and looking for jobs before the wage rise took place", "They are unaffected by the rise."]],
    "Insiders gain; outsiders who lose jobs or cannot get them are worse off.", { hints: ["Who would have had a job at the lower wage?"] });

  {
    const mk = { m: 22, n: 0.04, s: 4, k: 0.02 };
    const r = labourMarket({ ...mk, minimumWage: 11 });
    chk(r.competitive.employment, 300, 1e-9); chk(r.competitive.wage, 10, 1e-9);
    chk(r.minimumWage.unemployed, 75, 1e-9); chk(r.minimumWage.demanded * 11 - 3000, 25, 1e-9); chk(r.monopsony.employment, 225, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: r.minimumWage.unemployed, unit: "workers", hints: ["Quantity supplied minus quantity demanded at the minimum wage."],
      stem: "In a fictional labour market the demand for workers is W = 22 − 0.04L and the supply is W = 4 + 0.02L (W in US\\$ an hour, L in workers). The equilibrium wage is US\\$10 with 300 workers. A minimum wage of US\\$11 is introduced. Calculate the number of unemployed workers.",
      wrong: [25, 50, 350],
      explanation: "1. Demand at US\\$11: 11 = 22 − 0.04L, so L = 275.\n2. Supply at US\\$11: 11 = 4 + 0.02L, so L = 350.\n3. Unemployment = 350 − 275 = 75 workers. Subtracting the equilibrium employment (300 − 275 = 25) counts only the workers who lost jobs." });
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: r.minimumWage.demanded * 11 - 10 * 300, unit: "US$ per hour", hints: ["Wage bill = wage × employment, before and after."],
      stem: "Using the same market, calculate the change in the total hourly wage bill of the employed workers when the minimum wage of US\\$11 replaces the equilibrium wage of US\\$10 (give a positive number for a rise).",
      wrong: [-25, 275, 3025],
      explanation: "Before: 10 × 300 = US\\$3,000. After: 11 × 275 = US\\$3,025. Change = +US\\$25 an hour. The wage bill rises because the higher wage outweighs the fall in employment." });
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: r.monopsony.employment, unit: "workers", hints: ["MCL = 4 + 0.04L; set MRP equal to MCL."],
      stem: "A single fictional employer is the only buyer of labour in the same market. Its marginal cost of labour is W = 4 + 0.04L. Calculate the number of workers it employs when it sets marginal revenue product (22 − 0.04L) equal to marginal cost of labour.",
      wrong: [300, 275, 150],
      explanation: "22 − 0.04L = 4 + 0.04L, so 18 = 0.08L and L = 225 workers. The wage is read from the supply curve: 4 + 0.02 × 225 = US\\$8.50." });
  }
  {
    const mk = { m: 30, n: 0.05, s: 6, k: 0.025 };
    const r = labourMarket({ ...mk, minimumWage: 13 });
    chk(r.monopsony.employment, 240, 1e-9);
    b.num({ d: 2, skill: "UNDERSTANDING", daily: true, kind: "plain", value: 150, unit: "workers",
      stem: "At a wage of US\\$8 an hour a fictional town's employers demand 350 workers and 200 workers are willing to work. How large is the shortage of workers?",
      wrong: [200, 550, 350],
      explanation: "Shortage = quantity demanded − quantity supplied = 350 − 200 = 150 workers." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A monopsony is a labour market in which there is a single dominant buyer of labour.", answer: true,
    explanation: "True. A monopsony employer can influence the wage because the workers have few alternative employers." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Compare the wage under monopsony with the competitive wage."], stem: "A monopsony employer pays a higher wage than a competitive labour market would.", answer: false,
    explanation: "False. A monopsonist restricts employment and pays below the competitive wage." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each labour-market situation with its likely effect.",
    pairs: [["Minimum wage above equilibrium in a competitive market", "Unemployment"], ["Moderate minimum wage in a monopsony", "Higher wage and higher employment"], ["Union raising productivity", "Shift of demand for labour to the right"], ["Wage below equilibrium", "Shortage of labour"]],
    explanation: "The effect depends on the type of labour market." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A minimum wage set above equilibrium causes {{blank:a}} of labour, because the quantity supplied is {{blank:b}} than the quantity demanded.",
    blanks: [{ id: "a", accepted: ["a surplus"], choices: ["a surplus", "a shortage"] }, { id: "b", accepted: ["greater"], choices: ["greater", "less"] }],
    explanation: "Above equilibrium, supply exceeds demand: a surplus of labour (unemployment)." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a labour market with a single dominant employer?",
    accepted: ["monopsony", "a monopsony"], wrong: ["monopoly"],
    explanation: "A single buyer of labour is a monopsony." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define a national minimum wage.",
    points: ["A legal minimum rate of pay.", "Employers may not pay below it."],
    modelAnswer: "A national minimum wage is a legal floor for wage rates: employers are not allowed to pay workers less than this amount.",
    explanation: "One mark each for legal and floor." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the idea of quantity demanded and supplied."],
    stem: "Explain why a minimum wage set above the equilibrium wage may cause unemployment in a competitive labour market.",
    points: ["The higher wage raises the cost of labour to employers.", "Quantity of labour demanded falls (movement up the demand curve).", "More people want to work at the higher wage (quantity supplied rises).", "Supply exceeds demand, so there is unemployment."],
    modelAnswer: "A wage above equilibrium raises the cost of labour, so firms reduce the number of workers they demand. At the same time more people want to work at the higher wage. The quantity supplied exceeds the quantity demanded, so there is unemployment.",
    explanation: "Higher cost, fall in demand, rise in supply and the resulting surplus." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare the monopsony wage with the competitive wage."],
    stem: "Analyse how a minimum wage can increase employment in a monopsony.",
    points: ["A monopsonist hires where MRP = MCL, paying less than the competitive wage and employing fewer workers.", "A minimum wage makes the wage fixed at a higher level up to the quantity supplied.", "The cost of an extra worker then equals the minimum wage, not above it.", "The firm hires more workers until MRP falls to the minimum wage, so employment rises."],
    modelAnswer: "A monopsonist hires where MRP equals the marginal cost of labour, which is above the wage, so it pays less and employs fewer workers than a competitive market. A minimum wage between the monopsony and competitive wages makes the cost of each extra worker equal to the minimum wage. The firm therefore hires more workers until MRP falls to that wage, so employment rises.",
    explanation: "Monopsony outcome, effect of a floor on MCL and the rise in employment." });

  {
    const wages = [5, 6, 7, 8, 9], qd = [520, 440, 360, 280, 200], qs = [160, 240, 360, 480, 600];
    const s = schedule({ prices: wages, qd, qs, priceHeader: "Wage (US\\$ an hour)", qdHeader: "Workers demanded", qsHeader: "Workers supplied", requireEquilibrium: true });
    chk(s.equilibrium.price, 7, 0);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Equilibrium is where demand equals supply.", "Wage bill = wage × workers employed."],
      stem: `**A town labour market (illustrative data)**\n\n${s.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: 360, unit: "workers", stem: "How many workers are employed at the equilibrium wage?", wrong: [7, 280, 480], explanation: "Demand equals supply at US\\$7: 360 workers." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 200, unit: "workers", stem: "A minimum wage of US\\$8 an hour is introduced. How many workers are unemployed?", wrong: [280, 480, 120], explanation: "At US\\$8, 480 want to work and 280 are demanded: unemployment = 480 − 280 = 200." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: 8 * 280 - 7 * 360, unit: "US$ per hour", stem: "Calculate the change in the wage bill of the employed workers, in US\\$ an hour (a negative number for a fall).", wrong: [280, 2240, 2520], explanation: "Before: 7 × 360 = 2,520. After: 8 × 280 = 2,240. Change = −US\\$280 an hour." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the wage bill falls in this case.",
          points: ["The higher wage reduces employment by a larger percentage than the wage rises.", "Demand for labour is elastic between US\\$7 and US\\$8: employment falls 22.2% and the wage rises 14.3%.", "So the loss from fewer jobs outweighs the gain from higher pay."],
          modelAnswer: "Between US\\$7 and US\\$8 employment falls by 22.2% (from 360 to 280) while the wage rises by only 14.3%. Demand for labour is elastic here, so the loss of income from the lost jobs is larger than the gain from higher pay, and the wage bill falls." }),
      ],
      explanation: "Equilibrium US\\$7, 360 workers; unemployment 200 at US\\$8; wage bill falls by US\\$280." });
  }
  {
    const mk = { m: 30, n: 0.05, s: 6, k: 0.025 };
    const r = labourMarket({ ...mk, minimumWage: 13 });
    chk(r.monopsony.wage, 12, 1e-9); chk(r.minimumWage.employed, 280, 1e-9); chk(r.competitive.employment, 320, 1e-9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["MCL rises twice as fast as the supply curve.", "Read the wage from the supply curve."],
      stem: "**A mining town with one employer (illustrative data)**\n\nIn a fictional mining town a single company hires most workers. The demand for labour (MRP) is W = 30 − 0.05L and the supply of labour is W = 6 + 0.025L, where W is the hourly wage in US\\$ and L is the number of workers. The company's marginal cost of labour is MCL = 6 + 0.05L. A competitive market would employ 320 workers at US\\$14.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: r.monopsony.employment, unit: "workers", stem: "Calculate the number of workers the company employs when MRP equals MCL.", wrong: [320, 120, 480], explanation: "30 − 0.05L = 6 + 0.05L, so 24 = 0.1L and L = 240." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: r.monopsony.wage, stem: "Calculate the wage the company pays, in US\\$ an hour.", wrong: [18, 14, 6], explanation: "The wage is on the supply curve: 6 + 0.025 × 240 = US\\$12." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: r.minimumWage.employed, unit: "workers", stem: "A minimum wage of US\\$13 an hour is introduced. How many workers are employed?", wrong: [240, 340, 320], explanation: "At US\\$13 the supply is (13 − 6) ÷ 0.025 = 280 and the demand is (30 − 13) ÷ 0.05 = 340. Employment is the lower: 280." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the company pays less than the competitive wage.",
          points: ["It is the only major buyer, so it faces the whole upward-sloping supply curve.", "Hiring one more worker raises the wage for all, so MCL exceeds the wage.", "It hires where MRP = MCL (240 workers) and pays the supply-curve wage of US\\$12, below US\\$14."],
          modelAnswer: "As the only major buyer it faces the whole upward-sloping supply curve, so hiring one more worker means raising the wage for all its workers; the marginal cost of labour is above the wage. It therefore hires where MRP equals MCL, employing 240 workers and paying only US\\$12, below the competitive US\\$14." }),
        P.manual({ label: "(e)", marks: 4, stem: "Evaluate whether a minimum wage of US\\$13 benefits workers in the town.",
          points: ["Gain: the wage rises from US\\$12 to US\\$13 and employment from 240 to 280.", "The minimum moves the market towards the competitive outcome.", "Risk: if set above about US\\$14 employment would fall (at US\\$17, for example, demand is only 260 workers).", "Judgement: beneficial if set between the monopsony and competitive wages and enforced; depends on how well the government knows the true wage."],
          modelAnswer: "At US\\$13 the wage rises from US\\$12 and employment rises from 240 to 280, because the minimum offsets the company's monopsony power. The outcome approaches the competitive level of 320 workers at US\\$14. But if the minimum were set too high, above the competitive wage, demand would fall below supply and jobs would be lost. The policy benefits workers if it is set between US\\$12 and US\\$14, which requires good knowledge of the market." }),
      ],
      explanation: "Monopsony: 240 workers at US$12; a minimum of US$13 gives 280 workers; benefit depends on the level of the minimum." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider competitive markets and monopsony.", "Reach a judgement."],
    stem: "Assess the likely effects of a national minimum wage on low-paid workers.",
    points: ["In a competitive market a minimum above equilibrium raises wages for those employed.", "It reduces the quantity of labour demanded and creates unemployment.", "The wage bill may still rise if demand for labour is inelastic.", "In a monopsony a moderate minimum can raise both wages and employment.", "Firms may respond by raising prices, cutting hours or moving into the informal sector.", "Enforcement and the size of the informal sector are important.", "The effect depends on the level of the minimum relative to equilibrium.", "A justified judgement."],
    levels: LV8,
    modelAnswer: "In a competitive labour market a minimum wage above equilibrium raises the pay of those who keep their jobs, but it reduces the quantity of labour demanded and increases the quantity supplied, so there is unemployment; if demand for labour is inelastic, the total wage bill may still rise. In a monopsony, a moderate minimum can raise both wages and employment. Firms may also respond by raising prices, cutting hours or moving into the informal sector, and enforcement may be weak. Overall the effect on low-paid workers depends on the level of the minimum relative to the equilibrium wage, the elasticity of labour demand and the type of market. A moderate minimum is likely to help, but a high one risks harming the very workers it aims to protect.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh pay gains against job losses by market type and level, then judge." });

  b.card("DEFINITION", "Define the **equilibrium wage**.", "The wage at which the quantity of labour demanded equals the quantity supplied.");
  b.card("CONCEPT", "What happens if a minimum wage is set **below** equilibrium?", "Nothing: it is not binding because the market wage is already higher.");
  b.card("CONCEPT", "What happens if a minimum wage is set **above** equilibrium in a competitive market?", "Employment falls and unemployment arises (supply exceeds demand), though the wage bill may rise if demand is inelastic.");
  b.card("DEFINITION", "Define **monopsony**.", "A labour market with a single dominant employer, able to influence the wage; its marginal cost of labour exceeds the wage.");
  b.card("FORMULA", "Where does a monopsonist hire and what does it pay?", "It hires where MRP = MCL and pays the wage on the supply curve at that employment, which is below the competitive wage.");
  b.card("CONCEPT", "How can a minimum wage raise employment in a monopsony?", "A minimum between the monopsony wage and the competitive wage makes the cost of an extra worker equal to the wage, so the firm hires more.");
  b.card("CONCEPT", "How can a trade union affect wages and employment?", "It can raise wages above equilibrium (reducing employment), raise productivity, or offset monopsony power; insiders gain and outsiders may lose.");
  b.card("CONCEPT", "Name **four** imperfections in labour markets.", "Immobility, imperfect information, discrimination, employer or union power, and wages legislation.", "ZIMSEC detail on legislation", { applies: ZIM });
  b.card("FORMULA", "How is the amount of unemployment caused by a minimum wage found?", "Quantity of labour supplied minus quantity demanded at the minimum wage.");
});
