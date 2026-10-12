// W2b: supply of labour and of the other factors (both boards; Cambridge A Level only, ZIMSEC Forms 5-6).
import { concept, P, ZIM, chk, table, elasticity, unemploymentRate } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.labour.supply", { file: "labour/supply", keyPrefix: "labour.supply" }, (b) => {
  mc(b, [1, "RECALL"], "The supply of labour is the number of workers",
    ["willing and able to work at each wage rate", "Correct: willingness and ability at each wage."],
    [["employed by the government at each wage rate", "Government employment is only a part of labour demand."],
     ["who are looking for a job but cannot find one", "That describes the unemployed."],
     ["who have retired from work at each wage rate", "Retired people are outside the labour force."]],
    "Labour supply is the number willing and able to work at each wage.");

  mc(b, [1, "RECALL"], "The participation rate is",
    ["labour force divided by working-age population", "Correct: the share of adults in or seeking work."],
    [["the unemployed as a percentage of the labour force", "That is the unemployment rate."],
     ["the employed as a percentage of the whole population", "That is not the participation rate."],
     ["the part-time workers as a percentage of the employed", "That measures part-time work."]],
    "Participation rate = labour force ÷ working-age population × 100.");

  mc(b, [2, "UNDERSTANDING"], "The supply of labour to one small firm in a large competitive labour market is",
    ["perfectly elastic at the going wage", "Correct: the firm can hire any number at the market wage."],
    [["perfectly inelastic whatever the wage", "That would mean no response to the wage at all."],
     ["upward sloping like the whole occupation's supply", "The occupation's supply slopes upward, not the small firm's."],
     ["backward bending at high wages", "That describes some individuals' hours."]],
    "A small firm is a wage taker: at the market wage it can hire as many as it likes, at less it hires none.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a non-wage factor that affects the supply of labour to a job?",
    ["The safety and conditions of the work", "Correct: workers weigh conditions as well as pay."],
    [["The wage paid to workers in that job", "The wage is a wage factor."],
     ["The price of the product that the firm sells", "That affects demand for labour."],
     ["The profit made by the firm in the year", "That does not directly affect labour supply."]],
    "Working conditions, hours, status and security are non-wage factors.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Wages rise in construction. The most likely effect on the supply of labour to the farm sector is that it will",
    ["shift left as some workers move to construction", "Correct: a better wage elsewhere draws workers away."],
    [["shift to the right as workers move to farms", "Workers move towards the higher wage."],
     ["move along the curve to a higher quantity", "The wage in farming has not changed."],
     ["be unchanged because wages elsewhere do not matter", "Wages in other occupations influence supply."]],
    "Higher pay in a rival occupation reduces supply at every wage in farming.", { hints: ["Where do workers prefer to be if construction pays more?"] });

  mc(b, [3, "APPLICATION"], "A farm worker trains to become an electrician. This is an example of",
    ["occupational mobility", "Correct: the worker has changed type of job."],
    [["geographical mobility", "That means moving place."],
     ["a fall in the participation rate", "The worker is still in the labour force."],
     ["a movement along the labour supply curve", "A change of occupation is not a movement along a given curve."]],
    "Moving between types of job is occupational mobility, which often needs training.", { hints: ["Did the worker move place or change the type of work?"] });

  mc(b, [3, "ANALYSIS"], "Which factor is most likely to cause geographical immobility of labour?",
    ["High housing costs and family ties", "Correct: moving is costly and breaks links."],
    [["Training courses for new skills and trades", "That affects occupational mobility."],
     ["High wages offered in the occupation", "High wages attract workers."],
     ["Easy information about the vacancies", "Information helps mobility."]],
    "Cost of moving, housing and family ties keep workers where they are.", { hints: ["Which option concerns place rather than skills?"] });

  mc(b, [4, "ANALYSIS"], "The government pays for the training of plumbers. Other things equal, the supply of plumbers will",
    ["shift right, lowering the equilibrium wage", "Correct: more qualified plumbers at every wage."],
    [["shift to the left, raising the equilibrium wage", "Training increases supply."],
     ["be unchanged, because the wage has not changed", "Training shifts the curve irrespective of the wage."],
     ["move along the curve to a higher wage", "Training shifts the curve; it is not a wage change."]],
    "Training raises the number able to work at each wage, so supply shifts right, and with unchanged demand the wage falls.", { hints: ["Does training change the number able to work at each wage?"] });

  {
    const e = elasticity.pes({ p1: 8, p2: 9.6, q1: 300, q2: 345 });
    chk(e, 0.75, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: e, dp: 2, hints: ["Percentage change in the number of workers ÷ percentage change in the wage."],
      stem: "A fictional bakery chain raises its hourly wage from US\\$8.00 to US\\$9.60 and the number of workers who apply to work for it rises from 300 to 345. Calculate the elasticity of labour supply.",
      wrong: [1.33, 0.2, 0.15],
      explanation: "Wage change = +20%. Number of workers = (345 − 300) ÷ 300 × 100 = +15%. Elasticity = 15 ÷ 20 = 0.75: supply is inelastic." });
  }
  {
    const r = (1134 / 1800) * 100;
    chk(r, 63, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: r, dp: 1,
      stem: "A fictional district has a working-age population of 1,800 thousand and a labour force of 1,134 thousand. Calculate the participation rate, in % to one decimal place.",
      wrong: [36.0, 158.7, 6.3],
      explanation: "1,134 ÷ 1,800 × 100 = 63.0%." });
  }
  {
    const net = 520 - 90 + 40;
    chk(net, 470, 0);
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: net, hints: ["Add benefits and subtract costs."],
      stem: "A fictional job pays US\\$520 a month. The worker spends US\\$90 a month on travel and receives a meal allowance worth US\\$40 a month. Calculate the net monthly value of the job, in US\\$.",
      wrong: [430, 520, 650],
      explanation: "Net value = 520 − 90 + 40 = US\\$470. Adding the travel cost instead of subtracting gives 650." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A rise in the wage paid in an occupation shifts the supply curve of labour for that occupation to the right.", answer: false,
    explanation: "False. A change in the occupation's own wage causes a movement along the supply curve, not a shift." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Occupational immobility can lead to unemployment in one industry while another industry has vacancies.", answer: true,
    explanation: "True. Workers without the right skills cannot move to the vacancies." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its effect on the supply of labour to an occupation.",
    pairs: [["A rise in the wage in the occupation", "Movement along the supply curve"], ["More people qualify for the occupation", "Supply shifts right"], ["Higher wages in a rival occupation", "Supply shifts left"], ["Stricter licensing requirements", "Supply shifts left"]],
    explanation: "Only the occupation's own wage moves along the curve; everything else shifts it." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct terms.",
    template: "The ease with which workers change type of job is called {{blank:a}} mobility, and the ease with which they move between places is called {{blank:b}} mobility.",
    blanks: [{ id: "a", accepted: ["occupational"], choices: ["occupational", "geographical"] }, { id: "b", accepted: ["geographical"], choices: ["occupational", "geographical"] }],
    explanation: "Occupational is by job; geographical is by place." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the ease with which workers move between types of job?",
    accepted: ["occupational mobility", "occupational"], wrong: ["geographical mobility"],
    explanation: "Moving between occupations is occupational mobility." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define the supply of labour.",
    points: ["The number of workers willing and able to work.", "At each wage rate in a given period."],
    modelAnswer: "The supply of labour is the number of workers who are willing and able to work at each wage rate in a given period.",
    explanation: "One mark each for willingness and ability, and the link to the wage." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each factor and say how it changes the number willing to work."],
    stem: "Explain **two** non-wage factors that affect the supply of labour to an occupation.",
    points: ["Factor 1 identified (for example, the length of training required).", "Factor 1 explained: a long training raises the cost of entry, so fewer people supply their labour.", "Factor 2 identified (for example, working conditions or hours).", "Factor 2 explained: pleasant, safe conditions attract more workers at a given wage."],
    modelAnswer: "A long training period raises the cost of entering an occupation, so fewer people can supply their labour at any wage. Good working conditions, such as safety and flexible hours, attract more workers at a given wage, so supply is greater.",
    explanation: "Two factors, each identified and explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think of costs and information."],
    stem: "Analyse why geographical immobility of labour may cause unemployment and vacancies to exist at the same time.",
    points: ["Workers in one area cannot easily move to another: high moving and housing costs.", "Family ties and lack of information also prevent movement.", "Vacancies exist in the other area, so employers cannot fill them.", "Unemployment persists where the workers live."],
    modelAnswer: "Workers in a depressed area may be unable to move because of the cost of moving and housing, family ties and a lack of information about jobs elsewhere. Meanwhile employers in another area cannot fill their vacancies. Unemployment therefore persists in the first area while vacancies remain in the second.",
    explanation: "Barriers to moving and the resulting mismatch." });

  {
    const e = elasticity.pes({ p1: 12, p2: 15, q1: 640, q2: 720 });
    chk(e, 0.5, 1e-9);
    const next = 720 * (1 + (e * 10) / 100);
    chk(next, 756, 1e-9);
    const tbl = table(["", "Wage (US\\$ an hour)", "Nurses willing to work"], [["Before", 12, 640], ["After", 15, 720]], { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Elasticity = % change in quantity ÷ % change in wage.", "Use the elasticity to predict the change."],
      stem: `**Nurses in a fictional province (illustrative data)**\n\nThe provincial hospital raised the hourly wage for nurses. The table shows the number of qualified nurses willing to work for it.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: e, dp: 2, stem: "Calculate the elasticity of the supply of nurses.", wrong: [2, 0.8, 1.25], explanation: "Wage change = (15 − 12) ÷ 12 × 100 = +25%. Nurses = (720 − 640) ÷ 640 × 100 = +12.5%. Elasticity = 12.5 ÷ 25 = 0.50." }),
        P.mcq({ label: "(b)", marks: 1, stem: "The supply of nurses is", options: [["elastic", "The value is below 1."], ["unitary elastic", "It would be exactly 1."], ["inelastic", "Correct: the value is 0.5."], ["perfectly elastic", "That would be infinity."]], answer: "C", explanation: "0.5 is less than 1, so supply is inelastic." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: next, unit: "workers", stem: "Using the elasticity, predict the number of nurses willing to work if the wage rises by a further 10% from US\\$15 (starting from 720 nurses).", wrong: [792, 720, 727], explanation: "A 10% rise in the wage raises supply by 0.5 × 10 = 5%. 720 × 1.05 = 756 nurses." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the supply of nurses is likely to be inelastic.",
          points: ["Nursing needs several years of training and qualifications.", "People cannot switch into nursing quickly when the wage rises.", "Many nurses are already employed elsewhere or tied to places by family and housing."],
          modelAnswer: "Nursing requires long training and qualifications, so a higher wage cannot quickly increase the number of qualified people. Existing nurses may also be tied to other jobs or places by family and housing, so the response to a wage rise is small." }),
      ],
      explanation: "PEL 0.50 (inelastic); predicted 756 nurses; training time makes supply inelastic." });
  }
  {
    const ur = unemploymentRate({ unemployed: 117, labourForce: 1560 });
    chk(ur, 7.5, 1e-9); chk((1560 / 2400) * 100, 65, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Participation = labour force ÷ working-age population.", "Unemployment rate = unemployed ÷ labour force."],
      stem: "**Labour in a fictional region (illustrative)**\n\nA fictional region has a working-age population of 2,400 thousand and a labour force of 1,560 thousand, of whom 117 thousand are unemployed. Most of the unemployed live in the old industrial town, while an irrigated farming district 200 km away reports many unfilled vacancies for skilled irrigation workers.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: 65, dp: 1, stem: "Calculate the participation rate, in % to one decimal place.", wrong: [35, 4.9, 153.8], explanation: "1,560 ÷ 2,400 × 100 = 65.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: ur, dp: 1, stem: "Calculate the unemployment rate, in % to one decimal place.", wrong: [4.9, 92.5, 117], explanation: "117 ÷ 1,560 × 100 = 7.5%. Dividing by the working-age population gives 4.9%." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why the unemployed in the town do not fill the vacancies in the farming district.",
          points: ["The unemployed may lack the skills needed (occupational immobility).", "Moving 200 km is costly: housing, transport and loss of family ties (geographical immobility).", "Workers may lack information about the vacancies."],
          modelAnswer: "Many of the unemployed were industrial workers and lack irrigation skills, so they cannot take the skilled vacancies. Moving 200 km also costs money for housing and transport and breaks family ties, which makes them reluctant to move." }),
        P.manual({ label: "(d)", marks: 3, stem: "Analyse how a training programme for irrigation skills could reduce unemployment.",
          points: ["The programme gives the unemployed the skills the district needs.", "This raises their occupational mobility.", "Vacancies are filled and unemployment falls (and output rises)."],
          modelAnswer: "A training programme gives the unemployed in the town the skills that the farming district needs. This raises their occupational mobility, so they can fill the vacancies. Unemployment falls and the district's output rises." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **one** reason why the training programme might not fully solve the problem.",
          points: ["Geographical immobility remains: workers may still be unable or unwilling to move.", "The programme takes time, or not all the unemployed can be trained (age, cost, language)."],
          modelAnswer: "Even trained workers may be unable to move 200 km because of housing costs and family ties, so vacancies could remain unfilled; training also takes time." }),
      ],
      explanation: "Participation 65.0%; unemployment 7.5%; mismatch caused by occupational and geographical immobility." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider wage and non-wage factors.", "Think about time."],
    stem: "Assess whether a higher wage is the most effective way to increase the supply of nurses.",
    points: ["A higher wage attracts more people to train and keeps existing nurses (movement along the supply curve).", "Training takes years, so supply responds slowly.", "Non-wage factors matter: working conditions, staffing, housing, career prospects and status.", "Training places and subsidies shift supply to the right.", "Nurses may emigrate if pay elsewhere is much higher.", "A wage rise is costly for the hospital or government budget.", "Wage rises may not work if the main cause of shortage is poor conditions.", "A justified judgement: a combination of pay and non-wage measures is likely to work best."],
    levels: LV8,
    modelAnswer: "A higher wage raises the reward for nursing, which attracts more people to train and helps to keep existing nurses, moving along the supply curve. However, the response is slow because training takes years, and non-wage factors such as working conditions, staffing levels, housing and career prospects may matter as much as pay. Training places and bursaries can shift supply directly, and if nurses emigrate for higher pay, domestic wages alone may not stop the outflow. A wage rise is also costly. Overall, higher pay helps, but it is likely to be most effective when combined with better conditions and more training places.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh wage effects against time and non-wage factors, then judge." });

  b.card("DEFINITION", "Define the **supply of labour**.", "The number of workers willing and able to work at each wage rate in a given period.");
  b.card("FORMULA", "How is the **participation rate** calculated?", "Labour force ÷ working-age population × 100.");
  b.card("CONCEPT", "What is the supply curve of labour to **one small firm** in a competitive market?", "Horizontal at the going wage: the firm can hire any number at that wage.");
  b.card("CONCEPT", "What is the supply curve of labour to an **occupation**?", "Upward sloping: a higher wage attracts workers from other occupations and from outside the labour force.");
  b.card("CONCEPT", "Give **four** non-wage factors affecting labour supply.", "Hours, working conditions, training required, job security, benefits, status and location.");
  b.card("CONCEPT", "What shifts the supply of labour to an occupation?", "Wages elsewhere, qualifications and training, conditions and benefits, immigration or population, entry requirements and participation.");
  b.card("DEFINITION", "Define **occupational mobility**.", "The ease with which workers move between types of job; limited by skills, training and licences.");
  b.card("DEFINITION", "Define **geographical mobility**.", "The ease with which workers move between places; limited by housing costs, family ties and lack of information.");
  b.card("CONCEPT", "How does the supply of land differ from the supply of labour?", "The quantity of land to the whole economy is fixed, though its supply to a particular use is more elastic; labour supply responds to wages and other factors.", "ZIMSEC detail", { applies: ZIM });
});
