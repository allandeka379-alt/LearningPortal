// W2b exam-format items: Cambridge P1 five-mark (2), P2 data response (1), P4 essays (2, A Level), P3 8-mark (2), 16-mark (1), 12-mark (1)
import { concept, P, EXAM, checkExam, CAM, table, money, chk, r2, hr } from "../lib.mjs";

const LV8 = [[1, 1, 3, "Limited knowledge; points are stated or only partly explained"], [2, 4, 6, "Good analysis; points explained and applied to the context"], [3, 7, 8, "Developed, accurate analysis with clear chains of reasoning applied to the context"]];
const LV12 = [[1, 1, 4, "Mostly assertion or description; one-sided; limited or no judgement"], [2, 5, 8, "Some balance and application; a judgement that is not fully supported"], [3, 9, 12, "Balanced arguments applied to the context and a supported judgement that considers conditions or time-frame"]];
const LV8E = [[1, 1, 2, "Assertion with little support; no judgement"], [2, 3, 5, "Arguments for and against, partly applied; judgement stated"], [3, 6, 8, "Balanced, applied arguments and a justified recommendation with a condition"]];

concept("abus.motivation.needs-maslow-herzberg", { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  const pc = (extra = {}) => ({ examStyle: true, applies: CAM, ...extra });

  // Item 1: CAM_SHORT5 (Herzberg)
  b.struct({
    ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.motivation.needs-maslow-herzberg"],
    stem: "The owner of a fictional bakery in Harare raised all wages by 10%, but her bakers still arrive late and say that nobody notices their work.",
    parts: checkExam(EXAM.CAM_SHORT5, [
      P.fib({ label: "(a)", marks: 2, stem: "Complete the sentence about Herzberg's theory.", template: "In Herzberg's theory, pay is a {{blank:a}} factor, whereas recognition for good work is a {{blank:b}}.", blanks: [{ id: "a", accepted: ["hygiene"], choices: ["hygiene", "motivator"] }, { id: "b", accepted: ["motivator"], choices: ["hygiene", "motivator"] }], explanation: "Pay is a hygiene factor; recognition is a motivator." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the pay rise may not have motivated the bakers.", points: ["Pay is a hygiene factor, which prevents dissatisfaction but does not by itself motivate", "Application: the bakers' complaint is that nobody notices their work, which is a missing motivator", "So the rise may remove complaints about money but lateness continues"], modelAnswer: "Pay is a hygiene factor, which prevents dissatisfaction but does not by itself motivate. The bakers complain that nobody notices their work, which is a missing motivator, so the rise may remove complaints about money while lateness continues.", explanation: "Theory, application, consequence." }),
    ]),
    hints: ["Is pay a hygiene factor or a motivator?"],
    explanation: "Pay is hygiene, recognition is a motivator; the rise does not supply recognition.",
  });

  // Item 2: CAM_SHORT5 (piece rate)
  {
    const min = 4, hrs = 6, rate = 0.5;
    const perDay = (60 / min) * hrs;
    const pay = r2(perDay * rate);
    chk(perDay, 90); chk(pay, 45);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.motivation.scientific-human-relations"],
      stem: `A fictional workshop in Bulawayo pays machinists ${money(rate)} for each pocket stitched. A time and motion study shows that the standard time for one pocket is ${min} minutes. A machinist works ${hrs} hours a day.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pay, stem: "Calculate the daily pay of a machinist who works exactly to the standard time.", wrong: [perDay, r2((60 / min) * rate)], explanation: `60 ÷ ${min} = 15 pockets an hour; × ${hrs} = ${perDay} a day; × US\\$0.50 = US\\$${pay}.` }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain one disadvantage to the workshop of paying by piece rate.", points: ["Piece rate rewards quantity, so workers may rush", "Application: pockets may be badly stitched and rejected", "The workshop then pays for faulty work or must pay for inspection and rework"], modelAnswer: "Piece rate rewards quantity, so machinists may rush. Pockets may be badly stitched and rejected, so the workshop pays for faulty work or must pay for inspection and rework.", explanation: "Disadvantage, application, consequence." }),
      ]),
      hints: ["Pockets an hour first."],
      explanation: "US\\$45 a day; the disadvantage is lower quality.",
    });
  }

  // Item 3: CAM_DATA30 (AS): tailoring workshop
  {
    const min = 6, hrs = 8, days = 5, rate = 0.6, actual = 340;
    const std = (60 / min) * hrs * days;
    const payAct = r2(actual * rate);
    chk(std, 400); chk(payAct, 204);
    const standardPay = r2(std * rate);
    chk(standardPay, 240);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_DATA30.skill, secs: EXAM.CAM_DATA30.secs, calculator: true, paper: "Cambridge Paper 2" }),
      concepts: ["abus.motivation.scientific-human-relations", "abus.motivation.needs-maslow-herzberg", "abus.management.styles-mcgregor", "abus.management.functions-roles-theories"],
      stem: `Chikwanha Tailors is a fictional business in Gweru that makes school uniforms. The manager, Mr Chikwanha, believes that workers dislike work and must be watched. He decides everything himself, shows each machinist how to sew a garment in the quickest way after timing each movement, and pays ${money(rate)} for each garment completed. A garment has a standard time of ${min} minutes. Machinists work ${hrs} hours a day for ${days} days a week.\n\n` +
        table(["Item", "Figure"], [["Standard time per garment (minutes)", min], ["Piece rate per garment (US\\$)", rate], ["Average actual output per machinist last month (garments a week)", actual]], ["l", "r"]) +
        `\n\nMachinists say that the work is dull, that they work alone and that Mr Chikwanha never asks for their ideas. Several of the best machinists have left. Mr Chikwanha says: "If I give them a say, they will do less."`,
      parts: checkExam(EXAM.CAM_DATA30, [
        P.fib({ label: "(a)", marks: 2, stem: "Complete the sentence.", template: "Mr Chikwanha's belief that workers dislike work is {{blank:a}}, and deciding everything himself is an {{blank:b}} management style.", blanks: [{ id: "a", accepted: ["Theory X"], choices: ["Theory X", "Theory Y"] }, { id: "b", accepted: ["autocratic"], choices: ["autocratic", "laissez-faire", "participative"] }], explanation: "Believing that workers dislike work is McGregor's Theory X; deciding alone is autocratic." }),
        P.group({
          label: "(b)", stem: "Piece rate",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "units", value: std, stem: "Calculate the number of garments a machinist should complete in a week at the standard time.", wrong: [(60 / min) * hrs, (60 / min) * days], explanation: `60 ÷ ${min} = 10 an hour; × ${hrs} = 80 a day; × ${days} = ${std} a week.` }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: payAct, stem: "Calculate the weekly pay of a machinist who completes the average actual output.", wrong: [standardPay, actual], explanation: `${actual} × US\\$0.60 = US\\$${payAct}. This is US\\$${r2(standardPay - payAct)} less than the US\\$${standardPay} earned at the standard.` }),
          ],
        }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two features of scientific management that Mr Chikwanha uses.", points: ["He uses time and motion study to find the quickest method", "Application: each movement is timed and a standard time of 6 minutes is set", "He pays piece rate, assuming money is the main motivator", "Application: US\\$0.60 for each garment links pay to output"], modelAnswer: "He uses time and motion study to find the quickest method: each movement is timed and a standard time of 6 minutes set. He also pays piece rate, assuming money is the main motivator, so that US\\$0.60 for each garment links pay to output.", explanation: "Two features, each applied." }),
        P.manual({ label: "(d)", marks: 6, stem: "Analyse why the best machinists may have left, using Herzberg's theory.", points: ["Pay is a hygiene factor, so it removes dissatisfaction with money only", "Application: the piece rate is a hygiene factor and does not provide lasting motivation", "Motivators are missing: the work is dull and not interesting", "Application: repetitive sewing offers no responsibility or growth", "Mr Chikwanha never recognises ideas or achievement", "Consequence: skilled machinists look for jobs that offer motivators, so turnover rises"], modelAnswer: "Pay is a hygiene factor, so the piece rate removes dissatisfaction with money only and does not provide lasting motivation. Motivators are missing: the work is dull and repetitive, offering no responsibility or growth, and Mr Chikwanha never recognises ideas or achievement. Skilled machinists therefore look for jobs that offer motivators, so labour turnover rises.", explanation: "Hygiene factor, missing motivators and consequence." }),
        P.manual({ label: "(e)", marks: 6, stem: "Assess whether Mayo's human relations approach would be more suitable than Mr Chikwanha's present approach.", points: ["Mayo: workers have social needs; teams and consultation make them feel valued", "Application: machinists work alone and are never asked for ideas, so team working may raise morale", "It could reduce the number of skilled machinists leaving", "Consultation is slower and costs time in meetings", "Output may not rise, since happy workers are not always productive", "Judgement with a reason: use teams and consultation while keeping standard methods"], modelAnswer: "Mayo's approach says workers have social needs, so teams and consultation make them feel valued. The machinists work alone and are never asked for ideas, so teamwork may raise morale and reduce the number of skilled machinists leaving. But consultation takes time, and happy workers are not always productive. Mr Chikwanha should use teams and consultation while keeping the standard methods, to protect output as well as morale.", explanation: "Benefit, limitation and judgement." }),
        P.manual({ label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8E, stem: "Mr Chikwanha says: \"If I give them a say, they will do less.\" Evaluate whether he should change to a democratic style.", points: ["Democratic style: workers feel trusted, so motivation and loyalty rise", "Application: the best machinists left because they had no say", "Ideas from machinists could improve methods and quality", "Application: they know where the sewing process wastes time", "Risk: decisions are slower", "Risk: some workers may take advantage and work less, as he fears", "Control can be kept by agreed output and quality targets", "Judgement with a reason, e.g. consultative style on methods while keeping targets"], modelAnswer: "A democratic style would make workers feel trusted, so motivation and loyalty would rise; the best machinists left because they had no say. Their ideas could improve methods and quality, since they know where the sewing wastes time. But decisions would be slower, and some workers might do less, as Mr Chikwanha fears. He can keep control by agreeing output and quality targets. He should use a consultative style on methods while keeping targets, because losing skilled workers costs more than the risk of reduced effort.", explanation: "Both sides, applied, with a conditional judgement." }),
      ]),
      hints: ["Use 60 ÷ standard minutes to find garments an hour.", "Link hygiene factors and motivators to the case."],
      explanation: "Theory X, autocratic; 400 garments; US\\$204; scientific management features; missing motivators; human relations; democratic with targets.",
    });
  }

  // Item 4: CAM_ESSAY20 (A Level, Paper 4): delegation and structure
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 4" }),
    concepts: ["abus.organisation.delegation-control", "abus.organisation.structure-types"],
    stem: "Zambezi Hardware is a fictional chain of 14 shops with a head office in Harare. It has a tall structure with seven levels of hierarchy, and every purchase above US\\$200 must be approved by the managing director. Shop managers say that shelves are often empty while they wait for approval. Answer both parts.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8, stem: "Analyse two benefits to Zambezi Hardware of delegating purchasing decisions to shop managers.", points: ["Benefit 1: faster decisions", "Development: managers can order stock at once instead of waiting for head office", "Consequence: fewer empty shelves and fewer lost sales", "Benefit 2: motivation of managers", "Development: responsibility and trust make the job more rewarding", "Consequence: managers are more likely to stay, which lowers recruitment cost", "Context or limit: managers may order too much without limits", "Overall link: delegation helps if limits and review are in place"], modelAnswer: "Delegation would speed up decisions: managers could order stock at once instead of waiting for head office, so there would be fewer empty shelves and fewer lost sales.\n\nIt would also motivate managers. Responsibility and trust make the job more rewarding, so managers are more likely to stay, which lowers recruitment costs. However, managers may order too much without limits, so delegation helps if limits and review are in place.", explanation: "Two benefits analysed with chains of reasoning." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12, stem: "Evaluate whether Zambezi Hardware should move from a tall structure to a flatter one.", points: ["Benefit: fewer levels shorten the chain of command, so decisions are faster", "Benefit: removing managers lowers salary costs", "Benefit: wider spans require delegation, which motivates shop managers", "Risk: wider spans mean less close supervision, so mistakes may rise", "Risk: managers may be overloaded", "Risk: redundancy costs and loss of morale among those who stay", "Risk: fewer promotion routes for staff", "Alternative: keep the structure but raise the approval limit", "Criterion: skills of shop managers and the cost of errors", "Counter-argument: the present delays are costing sales", "Judgement with a recommendation", "Justification with a condition or time-frame, e.g. remove levels in phases with training"], modelAnswer: "Fewer levels would shorten the chain of command, so decisions would be faster, and removing managers would lower salary costs. Wider spans would require delegation, which motivates shop managers. But wider spans mean less close supervision, so mistakes may rise, managers may be overloaded, redundancy costs arise and morale may suffer among those who stay. Fewer levels also mean fewer promotion routes.\n\nAn alternative is to keep the structure but raise the approval limit above US\\$200. The key criteria are the skills of the shop managers and the cost of errors. The present delays are costing sales, which counts in favour of change. On balance Zambezi Hardware should flatten the structure in phases, with training for the managers, because the benefits in speed and cost outweigh the risks if supervision is supported by reports.", explanation: "Flattening weighed against an alternative with a conditional recommendation." }),
    ]),
    hints: ["Link each point to the delays and empty shelves."],
    explanation: "(a) two benefits of delegation; (b) flattening weighed against risks and an alternative.",
  });

  // Item 5: CAM_ESSAY20 (A Level, Paper 4): leadership
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 4" }),
    concepts: ["abus.leadership.nature-qualities", "abus.leadership.theories-eq"],
    stem: "Nyathi Foods is a fictional food processor in Mutare facing falling sales. Its new managing director, Farai, shares a clear vision for healthier products, listens to staff concerns, stays calm under pressure and explains to staff how each department contributes. Some directors say that she should concentrate on planning and control instead. Answer both parts.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8, stem: "Analyse two ways in which Farai's leadership may improve the performance of Nyathi Foods.", points: ["Way 1: a clear vision gives staff direction", "Development: staff know where the business is going and why", "Consequence: effort is better focused, so productivity and quality may rise", "Way 2: listening shows social awareness and builds trust", "Development: staff who are heard feel valued and are more committed to change", "Consequence: lower resistance and lower staff turnover", "Context or limit: results depend on market conditions as well as leadership", "Overall link: leadership matters most when a business faces change"], modelAnswer: "A clear vision gives staff direction: they know where the business is going and why, so effort is better focused and productivity and quality may rise.\n\nListening to concerns shows social awareness and builds trust. Staff who are heard feel valued and are more committed to change, so resistance and staff turnover fall. However, results also depend on market conditions, so leadership matters most when a business faces change.", explanation: "Two ways analysed with chains of reasoning." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12, stem: "Evaluate whether Farai should concentrate on leadership or on planning and control to restore the business's performance.", points: ["Leadership: inspires commitment during major change", "Leadership: transformational style suits a turnaround", "Leadership: emotional intelligence keeps morale during difficulty", "Planning and control: set targets and budgets that show where sales are lost", "Planning and control: corrective action when results differ from plans", "Planning without leadership may not win staff support", "Leadership without control may leave problems undetected", "Leadership is slow to show measurable results", "Criterion: the cause of the falling sales", "Counter-argument: both are needed and neither can replace the other", "Judgement with a recommendation", "Justification with a condition or time-frame, e.g. leadership first, with control measures in the first quarter"], modelAnswer: "Leadership can inspire commitment during major change, and a transformational style suits a turnaround. Emotional intelligence helps to keep morale during difficulty. Planning and control set budgets and targets that show where sales are being lost and allow corrective action. Planning without leadership may not win staff support, and leadership without control may leave problems undetected. Leadership is also slow to show measurable results.\n\nThe key criterion is the cause of the falling sales: if it is poor morale, leadership matters most; if it is poor costs or pricing, control matters most. Both are needed and neither can replace the other. On balance Farai should lead the change, because staff must support the new products, but she should introduce clear targets and monthly reviews in the first quarter so that progress can be measured.", explanation: "Leadership weighed against control with a conditional recommendation." }),
    ]),
    hints: ["Think about what causes the falling sales."],
    explanation: "(a) vision and trust; (b) leadership and control weighed against the cause of the problem.",
  });

  // Item 6: CAM_P3_8 (span of control)
  {
    const ops = 150, sSpan = 10, mSpan = 5;
    const sups = ops / sSpan, mids = sups / mSpan, total = sups + mids + 1;
    chk(sups, 15); chk(mids, 3); chk(total, 19);
    const sups2 = ops / 15, mids2 = sups2 / mSpan, total2 = sups2 + mids2 + 1;
    chk(total2, 13);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, paper: "Cambridge Paper 3" }),
      concepts: ["abus.organisation.delegation-control", "abus.organisation.structure-features"],
      stem: `Kopano Packers is a fictional firm in Gaborone with ${ops} packing operatives. Each supervisor has a span of control of ${sSpan} operatives, each middle manager has a span of ${mSpan} supervisors, and one director manages all the middle managers.`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.num({ label: "(a)", marks: 3, kind: "plain", unit: "managers", value: total, wrong: [sups, sups + mids], stem: "Calculate the total number of supervisors, middle managers and directors needed.", explanation: `${ops} ÷ ${sSpan} = ${sups} supervisors; ${sups} ÷ ${mSpan} = ${mids} middle managers; plus 1 director = ${total}.` }),
        P.manual({ label: "(b)", marks: 5, stem: "The firm considers widening the supervisors' span to 15 operatives (13 managers would then be needed in total). Analyse the likely effects.", points: ["Fewer managers are needed (13 instead of 19), so salary costs fall", "Application: six fewer managers on the wage bill", "Supervisors have less time for each operative, so supervision is less close", "Application: more packing errors may go unnoticed", "Operatives need more delegated responsibility, which may motivate them if they are trained"], modelAnswer: "Fewer managers are needed, 13 instead of 19, so six fewer salaries are paid. But each supervisor has less time for each operative, so supervision is less close and more packing errors may go unnoticed. Operatives need more delegated responsibility, which may motivate them if they are trained.", explanation: "Cost saving, closeness of supervision and delegation." }),
      ]),
      hints: ["Operatives ÷ span gives the next level up."],
      explanation: "15 supervisors, 3 middle managers and 1 director: 19; widening the span saves 6 managers.",
    });
  }

  // Item 7: CAM_P3_8 (performance, labour turnover)
  {
    const avg = 50, leavers = 15, cost = 600;
    const lt = hr.labourTurnover(leavers, avg);
    const total = leavers * cost;
    chk(lt, 30); chk(total, 9000);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.hrm.performance-mbo", "abus.leadership.nature-qualities"],
      stem: `Mhofu Call Services is a fictional business in Lusaka with an average of ${avg} employees. Last year ${leavers} employees left, which is high for the industry. Exit interviews showed that many felt their manager gave no feedback and set targets without discussion. It costs ${money(cost)} to recruit and train each replacement.`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: total, wrong: [cost, r2(avg * cost)], stem: "Calculate the total cost of replacing the employees who left.", explanation: `${leavers} × US\\$${cost} = US\\$${total}. (Labour turnover was ${lt}%.)` }),
        P.manual({ label: "(b)", marks: 5, stem: "Analyse how management by objectives might reduce labour turnover at the business.", points: ["Objectives are agreed with each employee, so they are not imposed", "Application: employees who help set targets feel trusted", "Regular reviews give feedback, which was missing", "Application: employees know how well they are doing and feel valued", "Employees who feel valued are less likely to leave, which cuts replacement cost"], modelAnswer: "Under MBO objectives are agreed with each employee, so employees who help set targets feel trusted. Regular reviews give feedback, which was missing, so employees know how well they are doing and feel valued. Employees who feel valued are less likely to leave, which cuts the cost of replacement.", explanation: "Agreement, feedback and retention." }),
      ]),
      hints: ["Leavers × cost per replacement."],
      explanation: "US\\$9,000 (labour turnover 30%); MBO provides agreement and feedback.",
    });
  }

  // Item 8: CAM_P3_16 (delayering)
  {
    const mgrs = 8, pay = 2500, sev = 6000;
    const annual = mgrs * pay * 12;
    const once = mgrs * sev;
    const net = annual - once;
    chk(annual, 240000); chk(once, 48000); chk(net, 192000);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_P3_16.skill, secs: EXAM.CAM_P3_16.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.organisation.structure-types", "abus.organisation.delegation-control"],
      stem: `Sibanda Engineering is a fictional company in Bulawayo with 360 employees and eight levels of hierarchy. Decisions on tenders take weeks, and customers have gone to faster competitors. The directors plan to remove one level of ${mgrs} middle managers, each paid ${money(pay)} a month. Each manager removed will receive a one-off payment of ${money(sev)}. Remaining managers will be given authority to approve spending up to ${money(4000)}. Some managers fear for their jobs.`,
      parts: checkExam(EXAM.CAM_P3_16, [
        P.num({ label: "(a)", marks: 4, kind: "money", value: net, wrong: [annual, once], stem: "Calculate the net saving in the first year after the change (annual salaries saved minus the one-off payments).", explanation: `Salaries saved = ${mgrs} × US\\$2,500 × 12 = US\\$${annual.toLocaleString("en-GB")}. One-off payments = ${mgrs} × US\\$6,000 = US\\$${once.toLocaleString("en-GB")}. Net saving = US\\$${net.toLocaleString("en-GB")}.` }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse how removing a level of management may affect communication at Sibanda Engineering.", points: ["The chain of command is shorter, so messages pass through fewer people", "Application: tender decisions should reach the directors faster", "Less distortion of messages on the way", "Remaining managers have wider spans, so each has less time to communicate with individuals"], modelAnswer: "The chain of command is shorter, so messages pass through fewer people and tender decisions should reach the directors faster. There is also less distortion of messages on the way. But remaining managers have wider spans, so each has less time to communicate with individuals.", explanation: "Shorter chain, less distortion, wider spans." }),
        P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8E, stem: "Evaluate whether the directors should go ahead with the plan.", points: ["Benefits: faster decisions, so fewer customers lost", "Benefits: a saving of US\\$192,000 in the first year and US\\$240,000 afterwards", "Authority to approve spending motivates remaining managers", "Risk: managers made redundant and those who stay may lose morale and trust", "Risk: remaining managers may be overloaded by wider spans", "Risk: managers may make poor spending decisions without training", "Consultation and communication with managers reduce the fear and the risk of resistance", "Judgement with a reason, e.g. go ahead in phases with training and consultation"], modelAnswer: "The change should speed up decisions, so fewer customers are lost, and it saves US\\$192,000 in the first year and US\\$240,000 a year afterwards. Authority to approve spending should motivate the remaining managers. But those made redundant, and those who stay, may lose morale and trust, the remaining managers may be overloaded by wider spans, and without training they may make poor spending decisions. Consultation and clear communication would reduce fear and resistance. The directors should go ahead in phases, with training and consultation, because the delays are costing business and the saving is large.", explanation: "Benefits and risks weighed with a conditional recommendation." }),
      ]),
      hints: ["Salaries saved × 12, then subtract the one-off payments."],
      explanation: "Net first-year saving US\\$192,000; shorter chain of command; go ahead in phases.",
    });
  }

  // Item 9: CAM_P3_12 (extended response)
  b.ext({
    d: 5, skill: EXAM.CAM_P3_12.skill, secs: EXAM.CAM_P3_12.secs, marks: 12, examStyle: true, applies: CAM, paper: "Cambridge Paper 3",
    concepts: ["abus.leadership.theories-eq", "abus.leadership.nature-qualities", "abus.hrm.performance-mbo"],
    stem: "Tendai's Safaris is a fictional tourism business near Victoria Falls. Its managing director, Tendai, has high emotional intelligence: she knows her own limits, stays calm, senses the mood of her 40 staff and resolves conflicts. However, she sets few targets, rarely reviews performance and leaves decisions to staff. Bookings have fallen for two years and standards of service are uneven. Evaluate whether emotional intelligence alone is enough for Tendai to lead the business successfully.",
    wordLimit: { max: 450 }, levels: LV12,
    points: ["Self-awareness helps Tendai to see her own limits and to ask for help", "Self-management keeps her calm in crises and sets an example", "Social awareness lets her sense staff morale and customer needs", "Social skills help her to resolve conflicts and build teamwork", "Trust and morale among staff are likely to be high", "But few targets mean staff do not know what is expected", "Rarely reviewing performance means problems in service are not detected", "Leaving decisions to staff may suit experienced staff but not new or weak staff", "Bookings have fallen, so results show that something is missing", "A contingency view: the style must fit the situation, which needs direction in a decline", "Management by objectives or clearer targets could add control without losing trust", "Judgement: emotional intelligence is necessary but not enough; with a reason and condition"],
    modelAnswer: "Tendai's emotional intelligence is a real strength. Self-awareness lets her see her limits and ask for help, and self-management keeps her calm in a crisis and sets an example. Social awareness lets her sense staff morale and customer needs, and social skills help her resolve conflicts and build teamwork, so trust and morale among her staff are likely to be high.\n\nHowever, she sets few targets, so staff do not know what is expected, and she rarely reviews performance, so problems in service are not detected. Leaving decisions to staff may suit experienced employees but not new or weak ones. Bookings have fallen for two years, which suggests that something is missing. A contingency view says that the style must fit the situation, and a business in decline needs direction.\n\nEmotional intelligence is therefore necessary but not enough. Tendai should keep her people skills but add clear targets and regular reviews, for example by introducing management by objectives, which would give control without losing trust. This is likely to restore standards if introduced in the next season with staff involvement.",
    hints: ["Use Goleman's competencies, then what is missing from her leadership."],
    explanation: "Emotional intelligence builds trust but does not replace targets, review and direction.",
  });
});
