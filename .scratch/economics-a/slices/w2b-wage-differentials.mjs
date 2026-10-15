// W2b: wage differentials (both boards; Cambridge A Level only, ZIMSEC Form 5).
import { concept, P, ZIM, chk, table, pctChange } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.labour.wage-differentials", { file: "labour/wage-differentials", keyPrefix: "labour.wage-differentials" }, (b) => {
  mc(b, [1, "RECALL"], "A wage differential is",
    ["a difference in the pay received by workers in different jobs or groups", "Correct: the gap in wages between occupations, industries, regions or groups."],
    [["the wage at which the labour market clears exactly", "That is the equilibrium wage."],
     ["a payment made to workers who work extra overtime hours", "Overtime pay is only one form of pay."],
     ["the fall in wages caused by a fall in demand", "That is a change in the wage, not a differential."]],
    "A wage differential is a difference in pay between occupations, industries, regions or groups.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an example of a compensating differential?",
    ["Higher pay for workers who must work night shifts underground", "Correct: the extra pay compensates for unattractive conditions."],
    [["Higher pay for workers because of their gender", "That would be discrimination, not compensation."],
     ["A bonus paid to every worker in the firm each December", "A general bonus does not compensate for a particular job feature."],
     ["Lower pay for workers in a job with a high status", "That reflects status, not compensation for unpleasant work."]],
    "A compensating differential pays more for unattractive features such as danger or unsocial hours.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The marginal revenue product of a surgeon is higher than that of a general clerk. Other things equal, this explains why the surgeon",
    ["has a higher demand and is likely to receive a higher wage", "Correct: firms and hospitals will pay more for a worker whose output is worth more."],
    [["works fewer hours than the clerk", "MRP says nothing about hours."],
     ["has a more elastic supply of labour than the clerk", "Supply is the other side of the market, and it is usually less elastic for surgeons."],
     ["pays a higher rate of income tax than the clerk", "Taxes do not explain the wage before tax."]],
    "A higher MRP raises the demand for the worker and so the wage employers are willing to pay.");

  mc(b, [2, "UNDERSTANDING"], "Why does a long period of training tend to raise the wage in an occupation?",
    ["It reduces the supply of labour to the occupation", "Correct: fewer people can or will bear the cost, so supply is smaller."],
    [["It reduces the demand for labour in the occupation", "Trained workers are more productive, so demand does not fall."],
     ["It makes the supply of labour perfectly elastic", "Supply is more inelastic, not perfectly elastic."],
     ["It means that workers are paid for the time they train", "Trainees usually earn little or nothing."]],
    "Training costs reduce the supply of labour to the occupation and raise the equilibrium wage.", { daily: true });

  mc(b, [3, "ANALYSIS"], "The demand for two types of labour rises by the same amount. The wage of type X rises by 40% and the wage of type Y by 10%. The most likely explanation is that, compared with Y, the supply of X is",
    ["less elastic", "Correct: inelastic supply means the same rise in demand raises the wage more and employment less."],
    [["more elastic", "Elastic supply would limit the wage rise."],
     ["perfectly elastic", "That would leave the wage unchanged."],
     ["unrelated to the wage", "Supply of labour responds to the wage; the question concerns how much."]],
    "The same rise in demand raises the wage more where supply is inelastic.", { hints: ["Where supply responds slowly, which variable adjusts more?"] });

  mc(b, [3, "ANALYSIS"], "Women in a fictional country earn less than men in the same jobs with the same qualifications, experience and productivity. Which explanation fits these facts?",
    ["Discrimination by employers", "Correct: equal productivity and unequal pay point to discrimination."],
    [["Compensating differences for unpleasant work", "The jobs are the same, so there is nothing to compensate."],
     ["Differences in the cost of training", "The qualifications are the same."],
     ["Differences in the marginal revenue product", "Productivity is the same."]],
    "A gap between equally productive workers in the same job cannot be explained by MRP or compensation.", { hints: ["What differs between the groups, if jobs and productivity do not?"] });

  mc(b, [3, "ANALYSIS"], "Which of the following is most likely to make wage differentials between two regions persist for a long time?",
    ["Geographical immobility of labour", "Correct: workers do not move to the higher-paying region."],
    [["Perfect information about wages in both regions", "Perfect information would encourage movement."],
     ["Falling transport costs between the regions", "Lower costs make moving easier."],
     ["Free movement of workers between occupations", "That would narrow differentials."]],
    "If workers cannot or will not move, wage gaps between regions are not competed away.", { hints: ["What stops workers from moving to where pay is higher?"] });

  mc(b, [4, "EVALUATION"], "Which of the following would be the strongest evidence that a pay gap between two groups of workers is NOT explained by discrimination?",
    ["The gap disappears once workers are compared by skills, experience and working conditions", "Correct: the gap is then explained by productivity and compensating differences."],
    [["The group with the lower pay is smaller than the other group", "The size of the groups says nothing about the cause."],
     ["The firms in the industry employ a high number of managers and supervisors", "The number of managers is irrelevant to the cause of the gap."],
     ["The union in the industry has more members than a rival union", "Union membership does not show the gap has a non-discriminatory cause."]],
    "Comparing like with like is how economists separate productivity and compensation from discrimination.", { hints: ["How would you compare like with like?"] });

  {
    const gap = (12 - 4) / 4 * 100;
    chk(gap, 200, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: gap, dp: 0,
      stem: "A skilled technician earns US\\$12 an hour and a general labourer earns US\\$4 an hour. By what percentage is the technician's wage above the labourer's wage? Give your answer as a whole number percentage.",
      wrong: [66.7, 300, 8],
      explanation: "Differential = (12 − 4) ÷ 4 × 100 = 200%. Using the technician's wage as the base gives 66.7%, which is the labourer's shortfall, not the technician's excess. 300 is the ratio of the two wages written as a percentage (12 ÷ 4 × 100), not the excess." });

    const X = 40 * 6000, Y = 37 * 9500 - 9000;
    chk(Y, 342500, 0); chk(X, 240000, 0);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "money", value: Y, hints: ["Years of earnings after training × annual pay, less the fees."],
      stem: "Worker Y trains for 3 years, earning nothing and paying US\\$9,000 in fees, and then earns US\\$9,500 a year for the next 37 years. Calculate Y's total earnings over the 40 years net of the fees, in US\\$ (ignore interest and tax).",
      wrong: [351500, 380000, 9500],
      explanation: "1. Earnings after training = 37 × 9,500 = US\\$351,500.\n2. Subtract the fees: 351,500 − 9,000 = US\\$342,500.\nForgetting the fees gives 351,500; using 40 years at 9,500 gives 380,000." });

    const payback = 27000 / 3500;
    chk(Math.round(payback * 10) / 10, 7.7, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: payback, dp: 1, unit: "years", hints: ["Total cost = forgone earnings + fees; extra pay per year = difference in annual pay."],
      stem: "Worker X earns US\\$6,000 a year without training. Worker Y gives up 3 years of such earnings and pays US\\$9,000 in fees, and then earns US\\$9,500 a year. After how many years of working is Y's investment in training recovered? Give your answer in years to one decimal place.",
      wrong: [2.6, 4.5, 3.1],
      explanation: "1. Cost = 3 × 6,000 + 9,000 = US\\$27,000.\n2. Extra pay = 9,500 − 6,000 = US\\$3,500 a year.\n3. Years to recover the cost = 27,000 ÷ 3,500 = 7.7 years.\nIgnoring the forgone earnings gives 9,000 ÷ 3,500 = 2.6 years." });

    const spec = pctChange(100, 110) / pctChange(20, 26);
    chk(spec, 1 / 3, 1e-9);
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "elasticity", value: spec, dp: 2, hints: ["Percentage change in employment divided by percentage change in the wage."],
      stem: "The wage of specialist engineers rises from US\\$20 to US\\$26 an hour and the number of engineers employed rises from 100 to 110. Calculate the wage elasticity of labour supply, to two decimal places.",
      wrong: [3, 0.38, 0.1],
      explanation: "%Δ wage = 6 ÷ 20 = 30%. %Δ employment = 10 ÷ 100 = 10%. Elasticity = 10 ÷ 30 = 0.33, which is inelastic. Dividing the other way gives 3.00." });

  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If workers could move freely between occupations, wage differentials not due to compensating differences would tend to narrow.", answer: true,
    explanation: "True. Workers would move from low-paid to high-paid jobs, lowering wages in the second and raising them in the first." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each factor with the way it affects pay.",
    pairs: [["Long, costly training", "Smaller supply of labour"], ["High output value per worker", "Higher marginal revenue product"], ["Danger and unsocial hours", "Compensating differential"], ["Unequal pay for equal work", "Discrimination"]],
    explanation: "Each factor works through demand, supply, compensation or discrimination." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Workers who bear the cost of training expect a higher wage as a return on {{blank:a}}. Where supply is {{blank:b}}, a rise in demand raises the wage by a larger percentage.",
    blanks: [{ id: "a", accepted: ["human capital"], choices: ["human capital", "physical capital"] }, { id: "b", accepted: ["inelastic"], choices: ["inelastic", "elastic"] }],
    explanation: "Training is an investment in human capital; inelastic supply gives a larger wage response." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to extra pay for unpleasant or dangerous features of a job?",
    accepted: ["compensating differential", "a compensating differential", "compensating wage differential", "compensating difference"], wrong: ["discrimination"],
    explanation: "A compensating differential pays for the unattractive features of a job." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define a wage differential.",
    points: ["A difference in pay.", "Between occupations, industries, regions or groups of workers."],
    modelAnswer: "A wage differential is a difference in the pay of workers in different occupations, industries, regions or groups.",
    explanation: "One mark for a difference in pay, one for the groups being compared." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use supply and demand for labour."],
    stem: "Explain why a qualified pilot is paid more than a baggage handler.",
    points: ["The pilot's marginal revenue product is higher: the output is worth more and is linked to costly equipment.", "Firms' demand for pilots is therefore higher.", "Long, costly training means few people can supply pilot labour, so supply is smaller and less elastic.", "High demand and low supply give a higher equilibrium wage."],
    modelAnswer: "A pilot's marginal revenue product is high, because the airline earns a great deal from the flights the pilot flies, so the demand for pilots is high. Pilots need long and costly training, so few people can supply this labour and supply is low. High demand and limited supply give a high equilibrium wage compared with a baggage handler, whose training is short and whose supply is large.",
    explanation: "High MRP, high demand, restricted supply and the resulting wage." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Say what the extra pay compensates for."],
    stem: "Analyse why workers in a dangerous job such as underground mining may be paid more than workers in a similar surface job.",
    points: ["The job has unattractive features: risk of injury, dust and shift work.", "Without extra pay fewer people would be willing to do it.", "Supply of labour to the dangerous job is therefore lower (shifts left).", "The equilibrium wage is higher: a compensating differential."],
    modelAnswer: "Underground mining has risks and unpleasant conditions that surface jobs do not. If the pay were equal, few workers would choose the dangerous job, so the supply of labour to it would be low. The supply curve is further to the left and the equilibrium wage is higher. The extra pay is a compensating differential.",
    explanation: "Unpleasant features reduce supply, which raises the wage." });
  {
    const t1 = table(["Occupation", "Hourly wage (US\\$)", "Years of training", "Workers employed"], [["Lab technician", "9", "3", "120"], ["Cleaner", "3", "0", "900"]], { align: ["l", "r", "r", "r"] });
    chk((9 - 3) / 3 * 100, 200, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Use the cleaner's wage as the base.", "Think about supply and demand."],
      stem: `**Pay in two occupations in a fictional town (illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: 200, dp: 0, stem: "Calculate by what percentage the technician's wage is above the cleaner's wage.", wrong: [66.7, 300, 6], explanation: "(9 − 3) ÷ 3 × 100 = 200%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 3, stem: "How many times larger is the technician's wage than the cleaner's wage? Give a whole number.", wrong: [2, 6, 27], explanation: "9 ÷ 3 = 3 times." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain **two** reasons why the technician is paid more than the cleaner.",
          points: ["The technician has a higher MRP (output is worth more).", "So demand for technicians is higher.", "Three years of training make supply smaller and more inelastic.", "Training must be rewarded as a return on human capital."],
          modelAnswer: "The technician's output is worth more per hour, so the marginal revenue product and demand are higher. Also, three years of training mean that fewer people can supply this labour, so supply is smaller and the wage is higher, partly as a return on the investment in human capital." }),
      ],
      explanation: "Differential 200%; wage is 3 times larger; MRP and training explain the gap." });
  }
  {
    const cost = 2 * 7000 + 6000, extra = 10000 - 7000;
    chk(cost, 20000, 0); chk(extra, 3000, 0); chk(Math.round(cost / extra * 10) / 10, 6.7, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Total cost = forgone earnings + fees.", "In (d) weigh market against non-market reasons."],
      stem: "**A nursing course (illustrative data)**\n\nIn a fictional country a school leaver can start work as a care assistant and earn US\\$7,000 a year. Alternatively she can spend 2 years on a nursing course, earning nothing and paying US\\$6,000 in fees, and then earn US\\$10,000 a year as a nurse. Nurses are in short supply and some move to other countries.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cost, stem: "Calculate the total cost of the course to the student, including the earnings she gives up, in US\\$.", wrong: [6000, 14000, 26000], explanation: "Forgone earnings 2 × 7,000 = 14,000; fees 6,000; total US\\$20,000." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: cost / extra, dp: 1, unit: "years", stem: "Calculate how many years of working as a nurse recover the cost, to one decimal place.", wrong: [2, 2.9, 4], explanation: "Extra pay = 10,000 − 7,000 = US\\$3,000 a year. 20,000 ÷ 3,000 = 6.7 years." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain how the high cost of training affects the supply of nurses and their wage.",
          points: ["A high cost of training deters some people from entering nursing.", "Supply of nurses is lower (shifts left) and less elastic.", "With demand unchanged, the equilibrium wage is higher.", "The wage rise is a return on the investment in human capital."],
          modelAnswer: "A high cost of training deters some people from becoming nurses, so the supply of nurses is lower and less elastic. With the demand for nurses unchanged, the equilibrium wage is higher. The higher wage is a return on the investment in training." }),
        P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the wages of nurses are best explained by market forces.",
          points: ["Market forces: MRP, scarce skills and training costs raise the wage.", "In many countries wages are set by the government in the public sector, not by supply and demand.", "Movement abroad shows that supply responds to pay differences between countries.", "Judgement: market forces matter, but government pay scales limit how much wages respond."],
          modelAnswer: "Training costs and scarcity of nurses raise the market wage, and the movement of some nurses abroad shows that supply responds to pay. However, most nurses in many countries work in the public sector, where the government sets pay scales and does not simply follow supply and demand. So market forces explain part of the differential, but government decisions limit how far wages respond." }),
      ],
      explanation: "Cost US\\$20,000; recovered after 6.7 years; training costs reduce supply and raise wages, but public-sector pay is set by the government." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider market and non-market reasons.", "Reach a judgement."],
    stem: "Assess the reasons why wage differentials exist between occupations.",
    points: ["Differences in MRP and demand for different workers.", "Differences in supply because of training, skills and entry barriers.", "Compensating differences for danger or unsocial hours.", "Immobility of labour allows differentials to persist.", "Union bargaining power and professional licensing.", "Discrimination and occupational segregation.", "Government pay scales and minimum wages.", "A justified judgement about which reasons are most important."],
    levels: LV8,
    modelAnswer: "Many differentials are explained by market forces. Workers with a high marginal revenue product face a high demand, and skills that need long training have a smaller and less elastic supply, so the equilibrium wage is higher. Dangerous or unpleasant jobs pay more as a compensating differential. Other differentials persist because of imperfections: labour is occupationally and geographically immobile, unions and professional bodies can restrict entry and bargain for higher pay, discrimination and occupational segregation reduce the pay of some groups, and the government sets pay in the public sector. Overall, market forces explain most of the differentials between occupations, but discrimination and immobility explain gaps that are not justified by productivity, and their importance varies between economies.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Separate market reasons (MRP, supply, compensation) from imperfections (immobility, power, discrimination) and judge." });

  b.card("DEFINITION", "Define a **wage differential**.", "A difference in pay between workers in different occupations, industries, regions or groups.");
  b.card("DEFINITION", "Define a **compensating differential**.", "Extra pay for the unattractive features of a job, such as danger, unsocial hours or insecurity.");
  b.card("DEFINITION", "Define **human capital**.", "The knowledge, skills and health of workers, built up through education, training and experience.");
  b.card("CONCEPT", "Why do skilled workers usually earn more?", "Their MRP (and so the demand for them) is higher and training makes the supply of their labour smaller and less elastic.");
  b.card("FORMULA", "How do you find the **wage elasticity of labour supply**?", "%Δ quantity of labour supplied ÷ %Δ wage.");
  b.card("CONCEPT", "Why can wage differentials persist?", "Occupational and geographical immobility, imperfect information, union and employer power, discrimination and government pay scales.");
  b.card("CONCEPT", "How can you tell discrimination from a compensating differential?", "Discrimination is pay that differs for equally productive workers in similar jobs; a compensating differential is extra pay for worse conditions.");
  b.card("FACT", "A rise in demand raises wages more where supply is…", "More inelastic (for example in jobs needing long training).");
  b.card("CONCEPT", "How is the return on training measured?", "Compare the extra pay with the cost (fees plus forgone earnings); the years to recover the cost = cost ÷ extra annual pay.");
});
