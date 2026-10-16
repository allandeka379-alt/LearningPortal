// W3b: operations.quality
import { concept, P, chk, money, table, sum, pctChange, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.quality", { file: "operations/quality", keyPrefix: "operations.quality" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Checking finished products against a standard to find faults is an example of",
    ok: ["quality control", "Correct: faults are found by inspection or testing."],
    bad: [["quality assurance", "Quality assurance prevents faults through the whole system."], ["benchmarking", "Benchmarking compares performance with the best firm."], ["just-in-time", "JIT is an approach to inventory, not quality."]],
    explanation: "Quality control means inspecting or testing to find faults.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Comparing a firm's performance with that of the best firm in order to find ways to improve is called",
    ok: ["benchmarking", "Correct: the firm measures itself against the best."],
    bad: [["total quality management", "TQM makes everyone responsible for quality."], ["random sampling", "Sampling checks a few items to estimate the quality of a batch."], ["rationalisation", "Rationalisation means cutting capacity."]],
    explanation: "Benchmarking compares the firm with the best performer.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does **quality assurance** differ from quality control?",
    ok: ["It aims to prevent faults, not find them afterwards", "Correct: prevention built into the system."],
    bad: [["It checks only the finished product before it is sent out", "That is feedback quality control."], ["It involves only the inspectors in the factory", "Quality assurance involves all workers."], ["It never involves any training for the workers", "Training is a typical part of quality assurance."]],
    explanation: "Quality assurance prevents faults through standards and organisation; control detects them.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **feed-forward** quality control?",
    ok: ["Testing materials before they are used in production", "Correct: inputs are checked before work starts."],
    bad: [["Inspecting finished goods before they are sent to customers", "That is feedback control."], ["Recording customer complaints after sale", "That is feedback control."], ["Checking items as they move along the production line", "That is concurrent control."]],
    explanation: "Feed-forward control checks inputs and plans before production begins.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture maker lets a small group of workers meet each week to suggest how to cut mistakes in finishing. This is an example of",
    ok: ["a quality circle", "Correct: a small group solving quality problems."],
    bad: [["benchmarking", "Benchmarking compares with the best firm outside the group."], ["100% inspection of items", "Inspection is checking items, not group problem-solving."], ["offshoring", "No work is moved abroad."]],
    hints: ["The workers meet regularly to solve problems."],
    explanation: "A small group of workers meeting to solve problems is a quality circle (kaizen group).",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why is random sampling used instead of inspecting every item when the test destroys the product?",
    ok: ["Inspecting every item would leave nothing to sell", "Correct: destructive tests can only be applied to a sample."],
    bad: [["Sampling is always more accurate than checking every item", "Checking every item would be more accurate if it were possible."], ["Customers prefer products that have been tested", "Testing every item is not possible in this case."], ["Sampling removes the need for any standards", "Standards are needed to judge the sample."]],
    hints: ["Think about what happens to an item that has been destroyed by testing."],
    explanation: "With destructive testing, only a sample can be tested.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a small firm should introduce TQM?",
    ok: ["It depends on whether staff are committed and the savings exceed the cost", "Correct: success depends on staff and on cost-benefit."],
    bad: [["Yes, because TQM guarantees that no faults will ever occur", "No system can guarantee zero faults."], ["No, because quality has no effect on the sales of a firm", "Quality affects reputation and sales."], ["Yes, because TQM costs nothing to introduce or to run", "Training and time have a cost."]],
    hints: ["TQM needs the cooperation of workers and costs time and money."],
    explanation: "A strong judgement names the conditions: committed staff and net benefit.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Quality control focuses on finding faults, whereas quality assurance focuses on preventing them.",
    answer: true,
    explanation: "True. Quality control detects faults by inspection or testing; quality assurance organises the whole process so that faults do not occur.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "A high-quality product must always be expensive.",
    answer: false,
    explanation: "False. Quality means meeting customers' expectations and being fit for purpose. A low-priced product can be of high quality for its price.",
    hints: ["Quality is judged against what the customer expects at that price."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [["Quality control", "Inspecting or testing to find faults"], ["Quality assurance", "Preventing faults by organising the whole system"], ["TQM", "Making every employee responsible for quality"], ["Benchmarking", "Comparing performance with the best firm"]],
    explanation: "Each term has a distinct meaning in quality management.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A small group of workers that meets regularly to solve quality problems is called a quality {{blank:a}}, and the Japanese word for continuous improvement is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["circle"], choices: ["circle", "chart", "standard"] },
      { id: "b", accepted: ["kaizen"], choices: ["kaizen", "benchmark", "sampling"] },
    ],
    explanation: "Quality circles are small problem-solving groups; kaizen means continuous improvement.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** benefit to a business of high quality.",
    accepted: ["customer loyalty", "higher prices", "fewer returns", "less waste", "good reputation", "better reputation", "more sales", "fewer complaints", "brand image", "lower costs", "repeat purchases", "win contracts"],
    explanation: "Loyalty, higher prices, fewer returns and waste, and a good reputation are benefits of quality.",
  });

  {
    const n = 150, d = 6;
    const r = (d / n) * 100;
    chk(r, 4, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `An inspector checks a random sample of ${n} items from a fictional factory and finds ${d} faulty. Calculate the defect rate in the sample as a percentage to one decimal place.`,
      kind: "pct", value: r, wrong: [(n / d), (d / (n - d)) * 100],
      explanation: "Defect rate = 6 ÷ 150 × 100 = 4.0%. Dividing by the good items (144) gives 4.2%.",
    });
  }
  {
    const batch = 8000, rate = 2.5;
    const e = (batch * rate) / 100;
    chk(e, 200);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `Sampling suggests that ${rate}% of the items in a fictional batch of ${batch.toLocaleString("en-GB")} are faulty. How many faulty items would you expect in the whole batch?`,
      kind: "units", value: e, wrong: [batch / rate, batch * rate],
      explanation: "Expected faulty items = 2.5% × 8,000 = 200. Dividing 8,000 by 2.5 gives 3,200.",
    });
  }
  {
    const out = 4800, rate = 2.5, cost = 6.5;
    const d = (out * rate) / 100;
    const c = d * cost;
    chk(d, 120); chk(c, 780);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional tile maker produces ${out.toLocaleString("en-GB")} tiles a month, of which ${rate}% are defective. Each defective tile costs ${money(cost)} in scrap and lost materials. Calculate the monthly cost of defects.`,
      kind: "money", value: c, wrong: [d, out * cost],
      hints: ["Find the number of defective tiles first."],
      workedSolution: "1. Defective tiles = 2.5% × 4,800 = 120.\n2. Cost = 120 × US\\$6.50 = US\\$780 a month.",
      explanation: "120 defective tiles at US\\$6.50 each cost US\\$780. Multiplying all the tiles by the unit cost gives US\\$31,200, which is the cost of all tiles.",
    });
  }
  {
    const before = 52000, after = 41600;
    const ch = pctChange(before, after);
    chk(ch, -20, 1e-9);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: `A fictional bakery's total yearly quality costs (prevention, inspection and failure) fell from ${money(before)} to ${money(after)} after it introduced quality assurance. Calculate the percentage change in total quality cost to one decimal place. Give a fall as a negative number.`,
      kind: "pct", value: ch, wrong: [pctChange(after, before), (after / before) * 100],
      hints: ["Divide the change in cost by the cost before the change."],
      explanation: "Change = 41,600 − 52,000 = −10,400. −10,400 ÷ 52,000 × 100 = −20.0%. Dividing by the later figure gives +25.0%.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** reason why quality is important to a business.",
    points: ["Good quality keeps customers satisfied, so they buy again and recommend the product", "Poor quality causes returns, waste and a damaged reputation, which raise costs"],
    modelAnswer: "Good quality keeps customers satisfied, so they buy again and recommend the product. Poor quality causes returns and waste and damages the reputation, which raises costs.",
    explanation: "One mark for the effect on customers and one for the effect on cost.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Rudo owns a fictional clothing factory in Gweru that has many returned shirts with loose buttons. Explain **two** ways she could improve quality.",
    points: ["Train the machinists in how to attach buttons correctly", "Application: trained workers make fewer faulty seams and buttons, so returns fall", "Inspect shirts at each stage (concurrent control) before they are packed", "Application: loose buttons would be found and repaired before delivery to customers"],
    modelAnswer: "Rudo could train the machinists to attach buttons correctly, so there are fewer faulty shirts and fewer returns. She could also inspect shirts at each stage before they are packed, so loose buttons are found and repaired before delivery to customers.",
    hints: ["Think about prevention and about inspection."],
    explanation: "Two methods, each developed for the factory.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a quality circle may improve both quality and morale.",
    points: ["Workers who do the job know where faults arise and can suggest practical solutions", "Solutions based on their ideas reduce faults and waste", "Being asked for ideas gives workers a sense of involvement and recognition", "Higher motivation leads to more care and fewer errors"],
    modelAnswer: "Workers who do the job know where faults arise and can suggest practical solutions, which reduce faults and waste. Being asked for ideas gives them a sense of involvement and recognition, so their motivation rises and they take more care.",
    hints: ["Think about knowledge and about involvement."],
    explanation: "A chain from worker ideas to fewer faults and higher motivation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional bottling company wants to benchmark its delivery times against the best firm in its industry. Assess the usefulness of benchmarking.",
    points: ["It shows how far the firm is behind the best and sets targets", "It identifies methods that could be copied", "It needs information from rivals, which may be hard to get", "Methods that suit another firm may not suit this one", "Judgement with a condition, for example: useful if the firm can adapt the best practice to its own situation"],
    modelAnswer: "Benchmarking shows how far the firm is behind the best and sets targets, and it can identify methods to copy. But information from rivals may be hard to get, and methods that suit another firm may not suit this one. It is useful if the company can adapt the best practice to its own situation.",
    hints: ["Weigh the targets and ideas against the difficulty of getting information."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const rows = [["Prevention (training, maintenance)", 4000, 9500], ["Inspection and testing", 7500, 4000], ["Failure (rework, returns, scrap)", 23500, 9000]];
    const tb = sum(rows.map((r) => r[1])), ta = sum(rows.map((r) => r[2]));
    chk(tb, 35000); chk(ta, 22500);
    const tbl = table(["Quality cost (US\\$ a year)", "Before", "After"], rows, ["l", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional bakery in Masvingo moved from relying on inspection towards quality assurance. Its yearly quality costs before and after the change are shown.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total quality cost after the change.", kind: "money", value: ta, wrong: [tb, ta - 9500], explanation: "9,500 + 4,000 + 9,000 = US\\$22,500. Before the change the total was US\\$35,000." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Into which type of quality cost does the training of bakers fall?", options: [["Prevention", "Correct: training prevents faults from occurring."], ["Inspection", "Inspection means checking for faults."], ["Failure", "Failure costs arise from faults that have occurred."], ["Benchmarking", "Benchmarking is not a cost category in the table."]], answer: "A", explanation: "Training is a prevention cost." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why spending more on prevention reduced the bakery's total quality cost.", points: ["Prevention spending rose from US\\$4,000 to US\\$9,500", "Fewer faults occurred, so failure costs fell from US\\$23,500 to US\\$9,000", "The fall in failure and inspection costs was greater than the rise in prevention"], modelAnswer: "Prevention spending rose from US\\$4,000 to US\\$9,500, but fewer faults occurred, so failure costs fell from US\\$23,500 to US\\$9,000 and inspection costs also fell. The saving on failure and inspection was greater than the extra spent on prevention.", hints: ["Compare the change in each line."], explanation: "Prevention up, failure down, net fall." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the bakery should now stop inspecting its bread altogether.", points: ["Inspection costs US\\$4,000, which could be saved", "Without inspection, faults that still occur would reach customers", "Judgement with a condition, for example: keep a small sample inspection because failure costs of US\\$9,000 remain"], modelAnswer: "Stopping inspection would save US\\$4,000, but faults that still occur would reach customers and harm the bakery's reputation. Failure costs of US\\$9,000 remain, so a small sample inspection should be kept until defects are lower.", hints: ["Remember that some faults still occur."], explanation: "Saving, risk and a conditional judgement." }),
      ],
      hints: ["Add the three lines for each year."],
      explanation: "Total quality cost fell from US\\$35,000 to US\\$22,500. Prevention reduced failure costs by more than it cost.",
    });
  }
  {
    const tiles = 50000, before = 6, after = 2, cost = 2.8, y1 = 6500, y2 = 2000;
    const defB = (tiles * before) / 100, defA = (tiles * after) / 100;
    chk(defB, 3000); chk(defA, 1000);
    const costB = defB * cost, costA = defA * cost;
    chk(costB, 8400); chk(costA, 2800);
    const saving = costB - costA;
    chk(saving, 5600);
    const net1 = saving - y1, net2 = saving - y2;
    chk(net1, -900); chk(net2, 3600);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Zambezi Tiles is a fictional tile maker in Bulawayo. It makes ${tiles.toLocaleString("en-GB")} tiles a year and ${before}% are defective, each costing ${money(cost)} in scrap. The owner is considering total quality management (TQM), with training, quality circles and a new system of checks at each stage. The programme would cost ${money(y1)} in the first year and ${money(y2)} a year afterwards, and is expected to cut the defect rate to ${after}%. Customers have complained about late deliveries caused by remaking faulty tiles. Some supervisors say that quality circles will waste time.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the yearly cost of defective tiles at present.", kind: "money", value: costB, calculator: true, wrong: [defB, tiles * cost], explanation: "6% × 50,000 = 3,000 defective tiles. 3,000 × 2.80 = US\\$8,400." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** way in which TQM could benefit Zambezi Tiles besides lower scrap costs.", points: ["Fewer defective tiles means fewer tiles to remake, so deliveries are quicker", "Application: customers have complained about late deliveries caused by remaking", "Better delivery and quality improve the firm's reputation", "A better reputation could win repeat orders and allow higher prices"], modelAnswer: "With fewer defective tiles there are fewer to remake, so deliveries are quicker and the complaints about late delivery should fall. A better reputation for quality and delivery could bring repeat orders and allow the firm to charge higher prices.", hints: ["Use the complaints about late deliveries."], explanation: "A chain from fewer defects to delivery and reputation." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Zambezi Tiles should introduce TQM.", points: ["Defects fall from 3,000 to 1,000 tiles, saving 2,000 × US\\$2.80 = US\\$5,600 a year", "In year 1 the net result is a loss of US\\$900 (5,600 − 6,500)", "From year 2 the net gain is US\\$3,600 a year (5,600 − 2,000)", "Better delivery and reputation are further benefits that the figures do not show", "Supervisors' doubts and the time taken by quality circles are risks", "The expected 2% defect rate is an estimate and may not be achieved", ["Judgement with a reason, for example: yes, because the programme pays from year 2", 1], ["Condition or time-frame, for example: if the supervisors support it and results are reviewed after a year", 1]], levels: [[1, 1, 3, "General points on TQM with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the yearly gains, with a justified judgement and a condition."]], modelAnswer: "Cutting defects from 6% to 2% saves 2,000 tiles a year, worth US\\$5,600. In the first year the programme costs US\\$6,500, so there is a loss of US\\$900, but from the second year the net gain is US\\$3,600 a year. Better delivery and reputation add further benefits. Against this, the 2% target is only an estimate, and supervisors doubt the value of quality circles. Zambezi Tiles should introduce TQM, because the gain from year 2 is clear, provided the supervisors are won over with training and results are reviewed after the first year.", hints: ["Compare the saving with the cost in year 1 and in later years."], explanation: "Saving US\\$5,600 a year; net −US\\$900 in year 1 and +US\\$3,600 afterwards." }),
      ],
      hints: ["Defective tiles = defect rate × tiles made."],
      explanation: "Defects cost US\\$8,400 now. TQM saves US\\$5,600 a year, so it pays from the second year; the judgement depends on staff support and the defect target.",
    });
  }

  b.card("DEFINITION", "Quality", "The degree to which a product meets customers' expectations and is fit for its purpose.");
  b.card("DEFINITION", "Quality control", "Checking products or inputs against a standard, by inspection or testing, to find faults.");
  b.card("DEFINITION", "Quality assurance", "A system that prevents faults by setting standards and organising every stage of production, involving all workers.");
  b.card("CONCEPT", "Feed-forward, concurrent and feedback control", "Feed-forward: check inputs before production. Concurrent: check during production. Feedback: check finished goods and learn from faults.");
  b.card("DEFINITION", "Total quality management (TQM)", "Every employee is responsible for quality at every stage, aiming for zero defects and customer satisfaction.");
  b.card("DEFINITION", "Quality circle (kaizen group)", "A small group of workers who meet regularly to find and solve quality and efficiency problems.");
  b.card("DEFINITION", "Benchmarking", "Comparing performance with the best firm to find ways to improve and set targets.");
  b.card("FORMULA", "Defect rate", "Defect rate (%) = faulty items ÷ items checked × 100. Expected faulty items in a batch = defect rate × batch size.");
  b.card("FACT", "Benefits and costs of quality systems", "Benefits: fewer returns, less waste, loyalty, higher prices. Costs: inspectors, training, meetings and time.");
});
