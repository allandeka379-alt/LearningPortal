// W3b: quality (BES, CAM).
import { concept, P, BES, money, round, r2, table } from "../lib.mjs";

// Reject rate.
const made = 2500, rejected = 60;
const rejRate = (rejected / made) * 100; // 2.4
// Cost of rejects.
const costEach = 3.5;
const rejCost = r2(rejected * costEach); // 210
// Structured data.
const months = [["January", 4000, 180], ["February", 4200, 168], ["March", 4100, 205]];
const qTbl = table(["Month", "Units produced", "Units rejected"], months);
const rates = months.map(([, p, r]) => (r / p) * 100); // 4.5, 4, 5
const totalRej = months.reduce((s, m) => s + m[2], 0); // 553
const unitCost = 2;
const rejCostQ = totalRej * unitCost; // 1106

concept("bus.operations.quality", { file: "operations/quality", keyPrefix: "operations.quality" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does quality mean in business?",
    options: [
      ["Meeting customers' expectations and being fit for purpose", "Correct."],
      ["Always using the most expensive materials available", "Quality does not require expensive materials."],
      ["Producing as many units as possible every day", "That is about quantity."],
      ["Selling at the highest possible price", "Price is not quality."],
    ],
    answer: "A",
    explanation: "A product is good quality if it meets customers' expectations for the price they pay.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is quality control?",
    options: [
      ["Inspecting products to find and remove faulty items", "Correct: usually at the end of production."],
      ["Making every worker responsible for quality at every stage", "That is TQM."],
      ["Small groups of workers discussing quality problems", "That is a quality circle."],
      ["Agreeing standards with suppliers before production", "That is part of quality assurance."],
    ],
    answer: "A",
    explanation: "**Quality control** finds faults by inspection; it does not prevent them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main difference between quality assurance and quality control?",
    options: [
      ["Assurance prevents faults at each stage; control finds them after production", "Correct."],
      ["Assurance is only used by small businesses", "Both are used by businesses of all sizes."],
      ["Control involves all of the workers; assurance uses only specialist inspectors", "It is the other way round."],
      ["Assurance checks only finished products", "Assurance checks every stage."],
    ],
    answer: "A",
    explanation: "Control **finds** faults; assurance **prevents** them by checking at every stage.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Eight machinists at a clothing factory meet every Friday to discuss why seams are splitting and suggest improvements. What is this?",
    options: [
      ["A quality circle", "Correct: workers meet to solve quality problems."],
      ["Quality control by inspectors", "No inspectors are involved."],
      ["A focus group of customers", "These are workers, not customers."],
      ["Test marketing of a new product", "No product is being tested in a market."],
    ],
    answer: "A",
    explanation: "A **quality circle** is a small group of workers who identify and solve quality problems.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of quality control?",
    options: [
      ["Faults are found after materials and time have been wasted", "Correct."],
      ["Faulty goods are found and removed before reaching customers", "That is an advantage."],
      ["It is easy for workers to understand", "That is an advantage."],
      ["It needs little training for production workers", "That is an advantage."],
    ],
    answer: "A",
    explanation: "Control finds faults late and does not tackle their causes; inspectors are an extra cost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might total quality management improve worker motivation?",
    options: [
      ["Workers are given responsibility and their ideas are valued", "Correct: links to Herzberg's motivators."],
      ["Workers no longer have to check their own work", "In TQM workers do check their work."],
      ["Wages are always increased under TQM", "TQM does not require pay rises."],
      ["Managers make all decisions without consulting staff", "TQM involves staff."],
    ],
    answer: "A",
    hints: ["Think about responsibility and recognition."],
    explanation: "TQM and quality circles give workers responsibility and recognition, which can motivate them.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "For which business would quality assurance at every stage be most important?",
    options: [
      ["A factory making medicines", "Correct: a single fault could harm patients."],
      ["A stall selling second-hand books", "Faults are easy to see and low risk."],
      ["A firm printing party invitations", "Faults are low risk and easy to check at the end."],
      ["A shop selling plastic buckets", "Faults are low risk."],
    ],
    answer: "A",
    hints: ["Where would a fault be most dangerous?"],
    explanation: "When faults are dangerous, they must be prevented at every stage, not just found at the end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a cost of poor quality to a business?",
    options: [
      ["Refunds, replacements and lost customers", "Correct."],
      ["More repeat customers", "Good quality brings repeat customers."],
      ["A better reputation", "Poor quality damages reputation."],
      ["The ability to charge higher prices", "Good quality supports higher prices."],
    ],
    answer: "A",
    explanation: "Poor quality brings waste, refunds, complaints, lost customers and damage to reputation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In total quality management every employee is responsible for quality.",
    answer: true,
    explanation: "True. TQM involves everyone in every department.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A low-priced product can never be of good quality.",
    answer: false,
    explanation: "False. Quality means meeting expectations for the price; a cheap product can be good quality.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its description.",
    pairs: [
      ["Quality control", "Inspecting products to find faults"],
      ["Quality assurance", "Checking at every stage to prevent faults"],
      ["Total quality management", "Every employee responsible for quality, aiming at zero defects"],
      ["Quality circle", "Workers meeting to solve quality problems"],
    ],
    explanation: "Control finds; assurance prevents; TQM involves everyone; circles involve workers in solutions.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The aim of total quality management is {{blank:a}} defects. In TQM the next department in a process is treated as an {{blank:b}} customer.",
    blanks: [
      { id: "a", accepted: ["zero", "no"], wrong: "fewer" },
      { id: "b", accepted: ["internal"], wrong: "external" },
    ],
    explanation: "TQM aims at zero defects and treats colleagues as internal customers.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `A factory made ${made.toLocaleString("en-GB")} jars of jam and rejected ${rejected}. Calculate the reject rate as a percentage, to one decimal place.`,
    kind: "pct", value: rejRate, wrong: [round((made / rejected) * 100, 1), round((rejected / (made - rejected)) * 100, 1)],
    explanation: `${rejected} ÷ ${made.toLocaleString("en-GB")} × 100 = ${round(rejRate, 1)}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Each rejected jar in the previous question cost ${money(costEach)} to make. Calculate the cost of the ${rejected} rejected jars.`,
    kind: "money", value: rejCost, wrong: [r2(made * costEach), rejected + costEach],
    hints: ["Number rejected × cost per jar."],
    explanation: `${rejected} × ${money(costEach)} = ${money(rejCost)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why quality is important to a business.",
    points: [
      "Reason 1, e.g. customer loyalty / repeat sales.",
      "Explained: satisfied customers return and recommend the business.",
      "Reason 2, e.g. lower costs of waste and returns / higher price / reputation.",
      "Explained: fewer refunds and scrapped goods / premium price / easier to win retailers.",
    ],
    hints: ["Think about customers and costs."],
    modelAnswer: "Good quality keeps customers satisfied, so they return and recommend the business to others, raising sales. It also reduces waste, refunds and replacements, which lowers costs.",
    explanation: "Quality affects sales, reputation, price and costs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840, calculator: true,
    stem: `Farai's factory in Bulawayo makes plastic water tanks. At present, two inspectors check every tank at the end of production. Customers have complained about leaking tanks. Production data are shown below.\n\n${qTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the reject rate in March as a percentage.",
        kind: "pct", dp: 0, value: rates[2], wrong: [round((months[2][1] / months[2][2]), 1)],
        explanation: `${months[2][2]} ÷ ${months[2][1].toLocaleString("en-GB")} × 100 = ${rates[2]}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: `Each rejected tank costs ${money(unitCost * 10)} in materials, but ${money(unitCost)} of plastic can be recycled from it, so the net cost is ${money(unitCost * 9)} a tank. Calculate the total net cost of the tanks rejected over the three months.`,
        kind: "money", value: totalRej * unitCost * 9, wrong: [totalRej * unitCost * 10, rejCostQ],
        explanation: `Total rejected = ${months.map((m) => m[2]).join(" + ")} = ${totalRej}. ${totalRej} × ${money(unitCost * 9)} = ${money(totalRej * unitCost * 9)}.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why quality control has not stopped customers complaining.",
        points: ["Inspectors find faults only after the tanks are made.", "Some faults are missed (leaks may not show in inspection).", "It does not tackle the cause of the faults, so reject rates stay high."],
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Recommend whether Farai should introduce quality assurance with quality circles. Justify your answer.",
        points: [`Uses data: reject rate 4-5% and rising in March; rejects cost ${money(totalRej * unitCost * 9)} in three months.`, "QA prevents faults at each stage (moulding, fitting, sealing) so fewer rejects and leaks.", "Quality circles use machinists' knowledge to find causes; may motivate.", "Costs: training, time for meetings, slower at first; workers' commitment needed.", "Could keep a final leak test while QA is introduced.", "Justified recommendation."],
        modelAnswer: `Rejects cost about ${money(totalRej * unitCost * 9)} in three months and the March reject rate rose to ${rates[2]}%, while leaking tanks still reach customers. Quality assurance would make workers check each stage, such as moulding and sealing, preventing faults instead of finding them late, and quality circles would use the machinists' knowledge to find why tanks leak. Training and meetings cost money and time, and success depends on workers' commitment. Because the waste and complaints are costly and rising, Farai should introduce quality assurance with quality circles, keeping a final leak test until the reject rate falls.`,
      }),
    ],
    hints: ["(b) Add the three months' rejects first.", "(d) Compare prevention with inspection."],
    explanation: `(a) ${rates[2]}%. (b) ${money(totalRej * unitCost * 9)}. (c) Control finds faults late and misses causes. (d) QA with quality circles, justified with the data.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: BES,
    stem: "Chipo runs a small catering enterprise in Gweru that supplies school canteens. She has six workers. Two schools have complained about cold food and late deliveries. Chipo is considering introducing total quality management.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term *total quality management*.", points: ["Every employee is responsible for quality at all times.", "Aim of zero defects / complete customer satisfaction / continuous improvement."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how TQM could solve **two** of Chipo's problems.",
        points: ["Cold food: cooks and drivers check temperatures / use insulated containers at each stage.", "Because everyone sees the school as the customer.", "Late deliveries: drivers and kitchen plan times together / internal customer idea (kitchen supplies drivers on time).", "Problems found and fixed by workers themselves."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Evaluate whether TQM is suitable for Chipo's enterprise.",
        points: ["Small team: easy to involve all six workers.", "Service quality depends on every worker (cooks, drivers).", "Cost of training and time; Chipo's limited budget.", "Benefits take time; schools may cancel contracts first.", "Quick fixes also needed (insulated boxes, earlier departure).", "Justified conclusion."],
        modelAnswer: "With only six workers, Chipo can easily involve everyone, and in catering quality depends on every person, from the cook to the driver. TQM would make each worker responsible for food being hot and on time. However, training takes time and money, and benefits may come slowly while the schools want immediate improvement. Chipo should make quick changes now, such as insulated containers and earlier departures, and introduce simple TQM practices such as weekly team meetings to review complaints. A small, low-cost version of TQM suits her enterprise.",
      }),
    ],
    hints: ["(b) Link each problem to workers checking their own stage.", "(c) Weigh the small team against cost and time."],
    explanation: "TQM suits small service teams if kept simple and combined with quick practical fixes.",
  });
  b.card("DEFINITION", "Quality?", "Meeting customers' expectations; a product fit for purpose and free from faults.");
  b.card("DEFINITION", "Quality control?", "Inspecting finished products (or samples) to find and remove faulty items.");
  b.card("DEFINITION", "Quality assurance?", "Checking at every stage of production, by workers, against agreed standards, to prevent faults.");
  b.card("DEFINITION", "Total quality management (TQM)?", "Every employee responsible for quality all the time; aims at zero defects and customer satisfaction.");
  b.card("DEFINITION", "Quality circle?", "A small group of workers meeting regularly to identify quality problems and suggest solutions.");
  b.card("CONCEPT", "Why quality matters?", "Customer loyalty, reputation, higher prices, less waste and fewer returns, access to large retailers and exports.");
  b.card("CONCEPT", "Quality control: advantage and disadvantage?", "Finds faults before customers receive them; but waste already happened and causes are not tackled.");
  b.card("FORMULA", "Reject rate?", "Number rejected ÷ number produced × 100.");
  b.card("CONCEPT", "TQM drawbacks?", "Costly training, needs commitment from everyone, slow to show results, meetings take time.");
});
