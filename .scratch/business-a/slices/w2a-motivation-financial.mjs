// W2a: motivation.financial
import { concept, P, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.motivation.financial", { file: "motivation/financial", keyPrefix: "motivation.financial" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which method of payment pays an employee for **each unit produced**?",
    ok: ["Piece rate", "Correct: earnings rise with the number of units made."],
    bad: [["Salary", "A salary is a fixed amount that does not vary with output."], ["Time rate", "Time rate pays for hours worked, not units made."], ["Profit sharing", "Profit sharing pays a share of the firm's profit."]],
    explanation: "Piece rate pays a fixed amount per unit produced.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which employees are most likely to be paid **commission**?",
    ok: ["Sales staff", "Correct: commission is a percentage of the value of sales."],
    bad: [["Night security guards", "Guards are normally paid a time rate."], ["Cleaners on a rota", "Cleaners are normally paid a time rate."], ["Newly recruited trainees", "Trainees are normally paid a fixed allowance."]],
    explanation: "Commission links pay to the value of sales, so it suits sales staff.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **disadvantage of piece rate**?",
    ok: ["Quality may fall as workers hurry", "Correct: workers paid per unit may rush and make more errors."],
    bad: [["Workers have no reason to work hard", "Piece rate rewards effort, so there is a reason."], ["Supervision costs always rise", "Piece rate normally needs less supervision of effort."], ["Pay is the same however many units are made", "Pay varies with units made."]],
    explanation: "Piece rate encourages speed, so quality control is needed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **fringe benefit**?",
    ok: ["A company vehicle for personal use", "Correct: it is a non-cash benefit given in addition to pay."],
    bad: [["Overtime pay at a higher hourly rate", "Overtime pay is part of wages, not a fringe benefit."], ["A weekly wage paid on a time rate", "A wage is the basic pay."], ["Commission on the value of sales made", "Commission is a form of pay."]],
    explanation: "Fringe benefits are non-cash benefits such as vehicles, medical aid or housing allowances.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional hospital in Mutare pays its nurses a monthly salary instead of piece rate. What is the best reason?",
    ok: ["Quality matters; output is hard to count", "Correct: paying per patient would risk poorer care."],
    bad: [["Nurses never need to be motivated", "All employees benefit from motivation."], ["Piece rate is illegal for nurses", "There is no such general rule."], ["Salaries are always lower than piece rates", "Salaries are not necessarily lower."]],
    hints: ["Is the output of a nurse easy to count, and does quality matter?"],
    explanation: "Where quality matters and output is hard to count, time rate or salary is more suitable than piece rate.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional firm moves its sales team to commission only, with no basic pay. Which is the most likely risk?",
    ok: ["Good staff may leave for rivals", "Correct: unstable earnings make the best staff look for security."],
    bad: [["Sales staff will no longer try to sell", "Commission gives a strong incentive to sell."], ["The firm's labour costs will rise in every month", "Commission rises only when sales rise."], ["Customers will never be pressured to buy", "Commission can increase pressure on customers."]],
    hints: ["Think about the effect on staff in a poor month."],
    explanation: "Commission-only pay is insecure, so reliable staff may prefer a rival with a basic wage.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Overtime at a premium rate is paid for all hours worked in a week, including the normal hours.",
    answer: false,
    explanation: "False. The premium rate applies only to the hours worked beyond the normal week.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Profit sharing can encourage teamwork because all employees gain if the business does well.",
    answer: true,
    explanation: "True. All share in the profit, but the effect of one person's effort on the total is small, so some may still not try harder.",
    hints: ["Who benefits when profit rises?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each payment method to its description.",
    pairs: [["Time rate", "Pay for each hour worked"], ["Commission", "A percentage of the value of sales"], ["Bonus", "A one-off payment for reaching a target"], ["Fringe benefit", "A non-cash benefit such as medical aid"], ["Profit sharing", "A share of the firm's profit divided among staff"]],
    explanation: "Each method links pay to something different: time, sales, targets, benefits or profit.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} is a fixed annual amount paid monthly, while {{blank:b}} is pay for each unit of output produced.",
    blanks: [
      { id: "a", accepted: ["salary"], choices: ["salary", "bonus", "commission"] },
      { id: "b", accepted: ["piece rate"], choices: ["time rate", "piece rate", "profit sharing"] },
    ],
    explanation: "Salary is fixed; piece rate varies with output.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** financial method of motivating employees.",
    accepted: ["piece rate", "commission", "bonus", "profit sharing", "time rate", "salary", "performance-related pay", "performance related pay", "fringe benefits", "wages", "overtime", "share options", "prp", "employee share ownership"],
    explanation: "Accept any named payment method, such as piece rate, commission, bonus or profit sharing.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the payment method in which pay depends on the number of units produced.",
    accepted: ["piece rate", "piece-rate", "piecework", "piece work", "payment by results"],
    explanation: "Piece rate pays per unit produced.",
  });

  const t1 = r2(5.2 * 40 + 5.2 * 1.5 * 4);
  chk(t1, 239.2);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: t1, calculator: true, daily: true, wrong: [r2(5.2 * 44), r2(5.2 * 1.5 * 44)],
    stem: "A fictional metal works in Harare pays a time rate of US\\$5.20 an hour for a 40-hour week, with overtime at one and a half times the normal rate. A worker works 44 hours. Calculate the worker's total pay for the week.",
    hints: ["Calculate normal pay and overtime pay separately."],
    explanation: "Normal pay = 40 × 5.20 = 208.00. Overtime rate = 5.20 × 1.5 = 7.80; overtime pay = 4 × 7.80 = 31.20. Total = US\\$239.20. Paying all 44 hours at the normal rate gives 228.80.",
  });
  const t2 = r2(0.65 * 310);
  chk(t2, 201.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: t2, calculator: true, wrong: [310, 0.65],
    stem: "A fictional clothing factory in Mutare pays its sewers US\\$0.65 for each garment completed. A sewer completes 310 garments in a week. Calculate the sewer's pay for the week.",
    hints: ["Multiply the rate by the number of garments."],
    explanation: "310 × US\\$0.65 = US\\$201.50.",
  });
  const t3 = r2(150 + 0.035 * 4800);
  chk(t3, 318);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: t3, calculator: true, wrong: [168, r2(0.035 * 4800 * 150)],
    stem: "A fictional furniture showroom in Gweru pays a sales assistant a basic wage of US\\$150 a week plus 3.5% commission on sales. In one week the assistant sells US\\$4,800 of furniture. Calculate the assistant's total pay for the week.",
    hints: ["Find the commission first, then add the basic wage."],
    explanation: "Commission = 3.5% of 4,800 = 168. Total pay = 150 + 168 = US\\$318. Giving 168 leaves out the basic wage.",
  });
  const profit = 26000, share = r2(profit * 0.08 / 20);
  chk(share, 104);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: share, calculator: true, wrong: [r2(profit * 0.08), r2(profit / 20)],
    stem: "A fictional printing works in Bulawayo made a profit of US\\$26,000 last year. It shares 8% of the profit equally among its 20 employees. Calculate the amount each employee receives.",
    hints: ["Find the total set aside, then divide among the employees."],
    explanation: "Amount shared = 8% of 26,000 = 2,080. Each employee receives 2,080 ÷ 20 = US\\$104. Giving 2,080 is the total, and 1,300 is the whole profit divided by 20.",
    workedSolution: "1. Amount shared = 0.08 × 26,000 = US\\$2,080.\n2. Each employee's share = 2,080 ÷ 20 = US\\$104.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain one advantage and one disadvantage of paying workers a piece rate.",
    points: ["Advantage: it rewards effort, so workers have a reason to produce more", "Advantage developed: little supervision of effort is needed", "Disadvantage: quality may fall as workers hurry, or earnings are unstable"],
    modelAnswer: "Piece rate rewards effort, so workers have a reason to produce more and little supervision of effort is needed. However, quality may fall as workers hurry, and earnings are unstable.",
    hints: ["Think of effort and quality."],
    explanation: "One advantage (developed) and one disadvantage.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional safari company in Victoria Falls wants to motivate its tour guides. Explain **two** financial methods it could use.",
    points: ["A bonus for good guest ratings", "Application: guides who earn high ratings from guests would receive an extra payment each quarter", "A share of the profit", "Application: all guides would benefit from a good season, which encourages teamwork and loyalty"],
    modelAnswer: "The company could pay a bonus for good guest ratings, so guides with high ratings receive an extra payment each quarter. It could also share part of the profit among the guides, so that all benefit from a good season, which encourages teamwork and loyalty.",
    hints: ["Link each method to the guides' work."],
    explanation: "Two methods, each applied.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional factory in Gweru is considering replacing its time rate with piece rate for its machine operators. Assess whether this will improve motivation and results.",
    points: ["Piece rate rewards effort, so output may rise", "Little supervision of effort is needed, which may reduce supervisory costs", "Quality may fall as workers hurry, so inspection may be needed", "Earnings become unstable, which can cause anxiety and arguments when machines break", "Pay is only one motivator; workers also want recognition and secure jobs", "Judgement with a reason: suitable if output is easy to measure and quality is checked, but not on its own"],
    modelAnswer: "Piece rate rewards effort, so output may rise and less supervision of effort is needed. But quality may fall as workers hurry, so inspection may be needed, and earnings become unstable when machines break. Pay is also only one motivator; workers also want recognition and security. Piece rate is suitable if output is easy to measure and quality is checked, but it should not be the only method.",
    hints: ["Give a benefit, a risk, and a condition."],
    explanation: "One point per mark; the judgement needs a reason or condition.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Sibanda Shoes of Bulawayo employs 10 workers on a time rate of US\\$210 a week. Each makes 330 pairs of shoes a week. The owner is considering a piece rate of US\\$0.70 a pair. She expects each worker to make 380 pairs under piece rate, but 5% of those pairs would be rejected for poor quality and not paid for.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(380 * 0.95 * 0.7), wrong: [r2(380 * 0.7), 210], stem: "Calculate a worker's weekly pay under piece rate if 5% of the 380 pairs are rejected and not paid for.", explanation: "Accepted pairs = 380 × 0.95 = 361. Pay = 361 × 0.70 = US\\$252.70." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(252.7 - 210), wrong: [r2(380 * 0.7 - 210), 252.7], stem: "Calculate how much more a worker would earn each week under piece rate than under time rate.", explanation: "252.70 − 210 = US\\$42.70." }),
      P.manual({ label: "(c)", marks: 5, stem: "Evaluate whether Sibanda Shoes should change to piece rate.", points: ["Workers earn US\\$42.70 more, so they may be motivated to make more pairs", "The firm gets 361 good pairs a worker against 330 before, an increase of about 9%", "Quality may fall; 5% are rejected and must be checked, which adds cost", "Workers may resent the uncertainty of earnings if machines break", "Judgement with a reason: change if the output gain exceeds the cost of inspection and wages"], modelAnswer: "Workers earn US\\$42.70 more a week, so they are likely to be motivated, and the firm gets 361 good pairs a worker against 330 before, an increase of about 9%. But quality may fall, since 5% would be rejected and must be inspected, which adds cost, and earnings become less certain if machines break. Sibanda Shoes should change if the gain in output is worth more than the extra wages and the cost of inspection.", hints: ["Compare the extra pay with the extra output."], explanation: "Compares pay, output and quality." }),
    ],
    hints: ["Rejected pairs are not paid for."],
    explanation: "Piece-rate pay US\\$252.70, US\\$42.70 above time rate; output gain must be weighed against quality costs.",
  });

  const A = r2(140 + 0.03 * 4200), B = r2(140 + 0.03 * 6100);
  chk(A, 266); chk(B, 323);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A fictional business: Moyo Vehicle Sales of Harare pays two sales staff a basic weekly wage of US\\$140 plus 3% commission on sales. In one week Tendai sold US\\$4,200 of vehicle parts and Nyasha sold US\\$6,100. The owner says that Nyasha's pay shows that the commission scheme is working, but she has received three complaints from customers who felt pressured by Nyasha. The business's total sales that week were US\\$10,300.",
    parts: [
      P.group({ label: "(a)", stem: "Calculate the weekly pay of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: A, wrong: [126, 140], stem: "Tendai;", explanation: "Commission = 3% × 4,200 = 126. Pay = 140 + 126 = US\\$266." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: B, wrong: [183, 140], stem: "Nyasha.", explanation: "Commission = 3% × 6,100 = 183. Pay = 140 + 183 = US\\$323." }),
      ] }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse two possible disadvantages of commission for Moyo Vehicle Sales.", points: ["Staff may pressure customers to buy, damaging reputation", "Application: three complaints have already been made about Nyasha", "Staff pay is unstable, so those with weak sales may leave", "Application: Tendai earns less than Nyasha, and may seek a rival with a steadier wage"], modelAnswer: "Staff may pressure customers to buy, which damages the firm's reputation, and three complaints have already been made about Nyasha. Pay is also unstable, so staff with weaker sales, such as Tendai, may leave for a rival with a steadier wage.", hints: ["Use the complaints and the pay difference."], explanation: "Two disadvantages, each applied." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether Moyo Vehicle Sales should keep its commission scheme.", points: ["Commission rewards effort and links labour cost to sales", "The basic wage gives some security", "Nyasha sells more, but the complaints suggest that some sales may harm customer relations", "A bonus based on customer ratings as well as sales would balance the incentive", "Pay is not the only motivator; training and recognition matter", "Judgement with a reason: keep the scheme but add a quality measure"], modelAnswer: "Commission rewards effort and links labour costs to sales, and the basic wage gives some security. But Nyasha's higher sales come with complaints from customers, so the scheme may harm the firm's reputation. A bonus based on customer ratings as well as sales would balance the incentive, and recognition and training would also help. The owner should keep the scheme but add a quality measure.", hints: ["Give a benefit, a problem from the case and an improvement."], explanation: "Weighs benefits and problems and recommends an adjustment." }),
    ],
    hints: ["Pay = basic wage + commission."],
    explanation: "Tendai US\\$266, Nyasha US\\$323; commission has benefits but may cause pressure on customers; add a quality measure.",
  });

  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: "A fictional business: Hwange Tour Lodge has 30 staff. Last year the owner paid a flat bonus of US\\$400 to every employee, costing US\\$12,000, even though profit fell from US\\$60,000 to US\\$45,000. Staff morale is low and four skilled staff have left. This year the owner is considering either a profit-sharing scheme in which 10% of profit is shared equally among all staff, or performance-related pay in which a manager scores each employee and pays up to US\\$600 to those who score highly.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r2(0.1 * 45000 / 30), wrong: [4500, 400], stem: "Calculate the amount each employee would receive under profit sharing if profit were US\\$45,000 and 30 employees shared 10% equally.", explanation: "Total shared = 4,500; each receives 4,500 ÷ 30 = US\\$150." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why last year's flat bonus may not have motivated the staff.", points: ["The bonus was the same for everyone, whatever their effort", "Application: skilled and hard-working staff received no more than others", "It was paid even though profit fell, so it was not linked to results", "Application: staff may see it as part of normal pay, and the owner may be unable to afford it again"], modelAnswer: "The flat bonus was the same for everyone, so skilled and hard-working staff received no more than others. It was also paid although profit fell, so it was not linked to results, and staff may see it as part of normal pay.", hints: ["What was the bonus linked to?"], explanation: "A bonus not linked to effort or results does not motivate." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate which of the two schemes the owner should choose, or whether another approach would be better.", points: [["Profit sharing ties pay to the success of the lodge, encouraging teamwork and cost control", 2], ["It would pay only US\\$150 each at the present profit, a small sum that may not motivate", 2], ["Individual effort has little effect on total profit, so some staff may not try harder", 1], ["Performance-related pay rewards individual achievement and can retain skilled staff", 2], ["It depends on fair scoring; managers may be biased and staff may resent the result", 1], ["Non-financial motivators and basic pay also matter, since four skilled staff have left", 1]], levels: [[3, 7, 9, "Uses the figures and the problems in the case; weighs both schemes and considers other motivators; a justified recommendation"], [2, 4, 6, "Explains both schemes with some use of the case; judgement weakly supported"], [1, 1, 3, "Describes the schemes with little application"]], modelAnswer: "Profit sharing ties pay to the success of the lodge and encourages teamwork, but at the present profit it pays only US\\$150 each, a small sum that may not motivate, and one person's effort has little effect on the total. Performance-related pay rewards individual achievement and could keep the skilled staff, but it depends on fair scoring, and staff may resent the result if managers appear biased. Four skilled staff have left, so the owner should also look at basic pay, training and recognition. The best choice is performance-related pay with clear, fair targets, supported by a smaller team bonus, with a review after a year.", hints: ["Use the US\\$150 figure and the reasons staff left."], explanation: "Weighs the two schemes with the evidence and recommends a combination." }),
    ],
    hints: ["Total shared = percentage × profit."],
    explanation: "Profit sharing gives US\\$150 each; PRP rewards individuals but needs fair scoring; combine with non-financial measures.",
  });

  b.card("DEFINITION", "Time rate", "Pay for each hour worked; overtime is paid at a premium for hours beyond the normal week.");
  b.card("DEFINITION", "Piece rate", "Pay for each unit produced, so earnings rise with output; quality may suffer.");
  b.card("DEFINITION", "Commission", "A percentage of the value of sales, often added to a basic wage; suits sales staff.");
  b.card("DEFINITION", "Profit sharing", "A share of the firm's profit divided among employees, linking pay to the success of the business.");
  b.card("DEFINITION", "Performance-related pay", "Extra pay linked to how well an employee, team or business meets agreed targets, judged by appraisal.");
  b.card("DEFINITION", "Fringe benefits", "Non-cash benefits, such as a company vehicle, medical aid or a housing allowance, in addition to pay.");
  b.card("FORMULA", "Pay with overtime", "Pay = normal hours × rate + overtime hours × (rate × overtime multiple).");
  b.card("CONCEPT", "Money as a motivator", "Herzberg: pay is a hygiene factor; it prevents dissatisfaction but does not alone create lasting motivation.");
  b.card("CONCEPT", "Choosing a pay method", "Ask: can output be measured? does quality or teamwork matter more? can the business afford it? Variable pay costs more only when output or sales rise.");
});
