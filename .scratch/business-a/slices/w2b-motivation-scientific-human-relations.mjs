// W2b: motivation.scientific-human-relations
import { concept, P, chk, money } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.motivation.scientific-human-relations", { file: "motivation/scientific-human-relations", keyPrefix: "motivation.scientific-human-relations" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which theorist is associated with **scientific management**?",
    ok: ["Frederick W. Taylor", "Correct: Taylor developed time and motion study and piece rate payment."],
    bad: [["Elton Mayo", "Mayo is linked with the human relations school."], ["Abraham Maslow (hierarchy)", "Maslow wrote about the hierarchy of needs."], ["Henri Fayol", "Fayol analysed the functions of management."]],
    explanation: "Taylor founded scientific management.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The Hawthorne studies are associated with which approach to management?",
    ok: ["Human relations", "Correct: Mayo's studies showed the importance of attention and group belonging."],
    bad: [["Scientific management", "Taylor's work is scientific management."], ["Bureaucracy", "Bureaucracy is linked with Weber."], ["Contingency theory", "The studies were not about contingency theory."]],
    explanation: "The Hawthorne studies led Mayo to the human relations school.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the purpose of a **time and motion study**?",
    ok: ["To find the quickest method and set a standard time", "Correct: it removes wasted movement and sets the time expected for a task."],
    bad: [["To find out what workers feel about their jobs and managers", "This is the concern of human relations methods such as surveys."], ["To decide who should be promoted", "It measures the method of work, not promotion."], ["To set the prices charged to customers", "It measures labour time, not the market price."]],
    explanation: "A time and motion study finds the most efficient method and sets standards for output.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which payment method did Taylor recommend to motivate workers?",
    ok: ["Piece rate", "Correct: pay for each unit produced links reward to output."],
    bad: [["Fixed salary", "A salary does not link pay to output."], ["Profit sharing", "This is not a feature of Taylor's approach."], ["Job rotation", "Job rotation is not a method of payment."]],
    explanation: "Taylor believed money motivated, so he advocated piece rates linked to output.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bottling plant in Mutare breaks the job into five simple tasks and pays workers for every crate filled. This is best described as",
    ok: ["Scientific management", "Correct: specialised tasks and piece rate are Taylor's methods."],
    bad: [["Human relations", "That approach stresses teams and social needs."], ["Job enrichment", "Enrichment gives more responsibility, not simpler tasks."], ["Democratic leadership", "This is a leadership style, not a method of organising work and pay."]],
    explanation: "Breaking a job into simple tasks and paying per unit are features of scientific management.",
    hints: ["Which two features does Taylor stress?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A manager of a fictional restaurant in Victoria Falls starts weekly team meetings where waiters can suggest changes. Which school's ideas is she applying?",
    ok: ["Human relations", "Correct: consultation and teamwork meet social needs."],
    bad: [["Scientific management", "This approach leaves decisions to managers."], ["Bureaucracy", "Bureaucracy stresses rules and hierarchy."], ["Piece rate payment", "Meetings are not a method of payment."]],
    explanation: "Consulting staff and team working are applications of Mayo's ideas.",
    hints: ["Which approach values consultation?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **weakness of piece rate** payment?",
    ok: ["Workers may rush and produce faulty goods", "Correct: pay depends on quantity, so quality may suffer."],
    bad: [["Workers have no reason to work any faster than before", "Pay rises with output, so there is a reason to work faster."], ["Managers cannot measure output", "Output per worker is easy to count."], ["It rewards the group, not the individual", "Piece rate pays the individual for their own output."]],
    explanation: "Piece rate rewards quantity, so quality needs separate checking.",
    hints: ["What does the payment reward: quantity or quality?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional architecture firm in Harare uses a strict system of time standards for every design task. Designers complain and several leave. Which is the most likely reason for the problem?",
    ok: ["Creative work cannot be reduced to standard times", "Correct: scientific management suits repetitive tasks, not creative ones."],
    bad: [["Time standards give creative workers too much freedom", "Standards restrict freedom, so they do not give too much."], ["Piece rates always raise the quality of design", "Pay per unit rewards speed, not quality."], ["Teams have been given too much responsibility", "The firm is using strict standards, not team responsibility."]],
    explanation: "Taylor's methods suit repetitive, measurable work. Creative jobs need freedom and recognition.",
    hints: ["Is design work repetitive?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Taylor believed that workers were motivated mainly by money.",
    answer: true,
    explanation: "True. Scientific management assumes that workers will work harder if pay is linked to output.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The Hawthorne studies showed that output rose only when physical working conditions were improved.",
    answer: false,
    explanation: "False. Output rose even when conditions were made worse, which suggested that attention from managers and group belonging were important.",
    hints: ["What happened to output when conditions got worse?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Piece rate", "Pay for each unit produced"], ["Time and motion study", "Timing each movement to find the best method"], ["Specialisation", "Breaking a job into small repeated tasks"], ["Hawthorne effect", "Output rising because workers receive attention"], ["Informal group", "A social group with its own norms at work"]],
    explanation: "Each term fits one meaning.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} led the Hawthorne studies and stressed {{blank:b}} needs, whereas Taylor stressed pay.",
    blanks: [
      { id: "a", accepted: ["Mayo"], choices: ["Mayo", "Taylor", "Herzberg"] },
      { id: "b", accepted: ["social"], choices: ["social", "physical", "legal"] },
    ],
    explanation: "Elton Mayo led the Hawthorne studies and emphasised social needs.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the method of payment by which a worker is paid a fixed amount for each unit produced.",
    accepted: ["piece rate", "piece-rate", "piecework", "piece work"],
    explanation: "Piece rate pays for each unit produced.",
  });

  const rate = 0.5;
  const minPerUnit = 4;
  const perHour = 60 / minPerUnit;
  const perWeek = perHour * 6 * 5;
  const weeklyPay = perWeek * rate;
  chk(perHour, 15); chk(perWeek, 450); chk(weeklyPay, 225);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: perWeek, calculator: true, daily: true, wrong: [perHour * 6, perHour * 5],
    stem: "A time and motion study at a fictional garment workshop in Gweru finds that the best method takes 4 minutes to stitch one pocket. A machinist works 6 hours a day for 5 days. How many pockets should the machinist stitch in a week at the standard time?",
    hints: ["Find the output per hour first."],
    explanation: "60 / 4 = 15 pockets an hour; 15 x 6 = 90 a day; 90 x 5 = 450 a week. Using only one day (90) or forgetting the hours (75) are common slips.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: weeklyPay, calculator: true, wrong: [perWeek, 90 * rate],
    stem: "At the workshop above the piece rate is US\\$0.50 for each pocket. What would a machinist earn in a week by working exactly to the standard (450 pockets)?",
    hints: ["Weekly pay = pockets x rate."],
    explanation: "450 x US\\$0.50 = US\\$225. Giving 450 forgets the rate; giving US\\$45 uses a day's output.",
    workedSolution: "1. Output at standard = 450 pockets.\n2. Pay = 450 x US\\$0.50 = US\\$225.",
  });
  const actual = 380;
  const shortfall = (perWeek - actual) * rate;
  chk(shortfall, 35);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: shortfall, calculator: true, wrong: [actual * rate, perWeek - actual],
    stem: "One machinist at the workshop makes only 380 pockets in a week because of a machine fault. By how much does the machinist's pay fall short of the standard weekly pay of US\\$225, at US\\$0.50 a pocket?",
    hints: ["Find the missing pockets, then multiply by the rate."],
    explanation: "Missing pockets = 450 - 380 = 70; 70 x US\\$0.50 = US\\$35. (Actual pay is 380 x 0.50 = US\\$190; 225 - 190 = 35.) Giving 70 forgets the rate.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by scientific management.",
    points: ["An approach developed by Taylor to find the one best way of doing each job", "Using time and motion study and specialisation", "Workers are paid according to output because money is assumed to be the main motivator"],
    modelAnswer: "Scientific management is Taylor's approach of studying work to find the one best method for each job. It uses time and motion study and breaks work into specialised tasks. Workers are paid by output, such as piece rate, because money is assumed to be the main motivator.",
    hints: ["Mention method, specialisation and pay."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional printing business in Mutare wants to apply the human relations school. Explain **two** actions it could take.",
    points: ["Set up small teams for each print job", "Application: team members would support each other and feel they belong", "Hold regular meetings and ask for suggestions", "Application: staff who are consulted feel valued, so morale and commitment rise"],
    modelAnswer: "It could set up small teams for each print job so team members support each other and feel they belong. It could also hold regular meetings and ask for suggestions. Staff who are consulted feel valued, so morale and commitment should rise.",
    hints: ["Think of teams and consultation."],
    explanation: "Two actions, each applied to the printing business.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why scientific management might reduce the quality of goods in a factory.",
    points: ["Jobs are broken into small repetitive tasks", "Workers become bored and less careful", "Piece rate rewards quantity over quality", "Workers may rush, so more goods are faulty and costs of rework or waste rise"],
    modelAnswer: "Jobs are broken into small repetitive tasks, so workers become bored and less careful. Piece rate rewards the number of units, not their quality, so workers may rush. More goods are then faulty, which raises the cost of rework and waste.",
    hints: ["Link boredom and the payment method to quality."],
    explanation: "Boredom and payment by quantity both reduce care.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a fictional call centre in Harare should rely on Mayo's ideas rather than Taylor's to improve service.",
    points: ["Service quality depends on how staff treat callers, which is linked to morale", "Teams and consultation can meet staff social needs and reduce staff turnover", "Application: staff who feel valued may handle callers more patiently", "Taylor's time standards may be needed to control costs and waiting times", "Human relations methods can be slow and costly and may not raise output", "Judgement with a reason: mainly Mayo's approach, with some measurement of call times"],
    modelAnswer: "Service quality depends on how staff treat callers, and this is linked to morale. Teams and consultation meet social needs and can reduce staff turnover, so staff who feel valued may be more patient with callers. However, the centre also needs some time standards to control costs and waiting times, and consultation can be slow and costly. The best approach is mainly Mayo's, with some measurement of call times so that costs remain under control.",
    hints: ["Give a benefit, a limit and a judgement about the mix."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  const jarsWeek = (60 / 2) * 6 * 5;
  const jarPay = jarsWeek * 0.3;
  chk(jarsWeek, 900); chk(jarPay, 270);
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Chipo's Jam Factory in Masvingo packs jars of jam. A time and motion study shows that the standard time to fill, seal and label one jar is 2 minutes. Packers work 6 hours a day for 5 days a week and are paid a piece rate of US\\$0.30 a jar.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: jarsWeek, wrong: [180, 360], stem: "Calculate the number of jars a packer should complete in a week at the standard time.", explanation: "60 / 2 = 30 jars an hour; 30 x 6 = 180 a day; 180 x 5 = 900 a week." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: jarPay, wrong: [900, 54], stem: "Calculate the weekly pay of a packer who reaches the standard.", explanation: "900 x US\\$0.30 = US\\$270. Giving 900 forgets the rate." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** problems that Chipo may face by using piece rate.", points: ["Workers may rush and produce poor-quality jars", "Workers lose pay when machines or supplies fail, which may demotivate them"], modelAnswer: "Workers may rush and produce poor-quality jars. They may also lose pay when machines or supplies fail, which may demotivate them.", explanation: "Quality and loss of pay are two problems of piece rate." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how team meetings could help Chipo to reduce faulty jars.", points: ["Packers can describe the causes of faults", "Application: packers might report that labels stick poorly or lids are faulty", "Staff who are consulted feel responsible for quality"], modelAnswer: "Packers can describe the causes of faults, for example poor labels or faulty lids. Staff who are consulted feel more responsible for quality.", hints: ["Think about what packers know that managers do not."], explanation: "Consultation produces ideas and builds responsibility." }),
    ],
    hints: ["Find jars per hour first, then per day, then per week."],
    explanation: "900 jars a week at the standard; weekly pay US\\$270.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Farai's Furniture in Gweru makes wooden chairs. Until now each carpenter has made a whole chair. Farai plans to introduce specialised workstations (cutting, joining, sanding, varnishing) with piece rates for each stage. Several carpenters say they take pride in making a complete chair and fear that the work will become boring.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the likely effects of specialised workstations on output and on the workers.", points: ["Each carpenter becomes quicker at one stage through repetition", "Application: cutting and sanding times fall, raising chairs per week", "Unit labour costs may fall", "Carpenters may lose pride in completing a whole chair", "Boredom may lead to errors or to staff leaving", "Work may stop when one stage falls behind and others wait"], modelAnswer: "Each carpenter becomes quicker at one stage through repetition, so chairs per week should rise and labour cost per chair fall. But carpenters may lose pride in making a complete chair and become bored, which may lead to errors or staff leaving. If one stage falls behind, the next workstations must wait.", hints: ["Give effects on output and effects on workers."], explanation: "Benefits for output, risks for workers." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether Farai should introduce specialised workstations with piece rates.", points: [["Benefit: higher output and lower cost per chair through specialisation", 2], ["Piece rates reward faster workers and make pay fair for effort", 1], ["Risk: poor quality if workers rush; inspection costs rise", 2], ["Risk: loss of pride and higher staff turnover, which raises training costs", 2], ["Alternative: teams of carpenters with a group bonus, using human relations ideas", 1], ["Judgement with a reason, for example trial it on one product first", 1]], levels: [[3, 7, 9, "Weighs benefits and risks with application to the chair workshop; justified recommendation with a condition"], [2, 4, 6, "Explains benefits and risks with some application; judgement weak"], [1, 1, 3, "Describes specialisation or piece rate with little application"]], modelAnswer: "Specialised workstations should raise output and lower the cost of each chair, because carpenters become faster at one stage. Piece rates reward the fastest workers. But workers may rush, which lowers quality and raises inspection costs, and carpenters who take pride in whole chairs may leave, raising training costs. An alternative is to organise carpenters into teams with a group bonus, which keeps the human relations benefits. Farai should trial the new system on one product first and compare quality and staff turnover before extending it.", hints: ["Weigh output and cost against quality and morale."], explanation: "Weigh benefits against risks, then give a conditional judgement." }),
    ],
    hints: ["Think about speed, quality and the carpenters' feelings."],
    explanation: "Specialisation raises output but risks quality and morale; a trial is sensible.",
  });

  b.card("DEFINITION", "Scientific management", "Taylor's approach: study work scientifically to find the one best way, specialise tasks and pay for output.");
  b.card("DEFINITION", "Time and motion study", "Timing each movement in a task to remove waste and set a standard time and output.");
  b.card("DEFINITION", "Piece rate", "Pay for each unit produced: motivates speed but may harm quality and gives no pay when production stops.");
  b.card("DEFINITION", "Human relations school", "Mayo's approach: workers are motivated by social needs, attention and group belonging as well as pay.");
  b.card("FACT", "Hawthorne studies", "Mayo's experiments in the 1920s and 1930s: output rose when workers were given attention, even when conditions worsened (the Hawthorne effect).");
  b.card("FACT", "Strengths and weaknesses of Taylor", "Strengths: higher output, clear standards. Weaknesses: boredom, quality problems, assumes money is the only motivator.");
  b.card("FACT", "Strengths and weaknesses of Mayo", "Strengths: better morale, lower turnover. Weaknesses: slow and costly; happy workers are not always productive.");
  b.card("CONCEPT", "Comparing Taylor and Mayo", "Taylor: economic view, pay, managers plan, specialised individual tasks. Mayo: social view, belonging, consultation, teams.");
  b.card("FORMULA", "Weekly pay under piece rate", "Weekly pay = units produced x rate per unit. Standard output = (60 / minutes per unit) x hours x days.");
});
