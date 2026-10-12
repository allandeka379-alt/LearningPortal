// Slice w3b: Preliminary investigation, fact finding and feasibility (acs.sdlc.fact-finding-feasibility, ZIMSEC only).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const cost = 3600;
const saving = 150;
const payback = cost / saving;
chk(payback, 24);
const runningMonthly = 25;
const cost3 = 4200;
const saving3 = 175;
const net2 = saving3 * 24 - cost3 - runningMonthly * 24;
chk(net2, -600);
const sent = 150;
const returned = 96;
const rate = (returned / sent) * 100;
chk(rate, 64);
const sent2 = 200;
const returned2 = 138;
const rate2 = (returned2 / sent2) * 100;
chk(rate2, 69);
const interviews = 10;
const mins = 45;
const hours = (interviews * mins) / 60;
chk(hours, 7.5);
const cost2 = 5400;
const saving2 = 300;
chk(cost2 / saving2, 18);

concept("acs.sdlc.fact-finding-feasibility", { file: "sdlc/fact-finding-feasibility", keyPrefix: "sdlc.fact-finding-feasibility" }, (b) => {
  mc(b, 1, "RECALL", "What is the purpose of a feasibility study?",
    ["To decide if the solution is worth developing", "Correct."],
    [["To test the finished program thoroughly for faults", "Testing comes later in the cycle."], ["To train the users how to use the new system", "Training happens at implementation."], ["To write the program code for the new system", "Coding is part of development."]],
    "A feasibility study decides whether to go ahead with the project.");
  mc(b, 2, "RECALL", "Which fact-finding technique involves the analyst watching staff do their normal work?",
    ["Observation", "Correct."],
    [["Interview", "An interview is a set of questions asked face to face."], ["Questionnaire", "A questionnaire is a set of written questions."], ["Document inspection", "That means studying forms and reports."]],
    "Observation shows what really happens.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a disadvantage of using a questionnaire to collect facts?",
    ["Many questionnaires may not be returned", "Correct: the response rate can be low."],
    [["Only one person can be asked at a time", "Many people can be asked at once."], ["It is the most expensive technique", "Questionnaires are cheap."], ["The analyst must travel to every person", "Questionnaires can be given out or sent."]],
    "Low response and little detail are the main disadvantages.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is an advantage of an interview compared with a questionnaire?",
    ["Questions can be explained and followed up", "Correct."],
    [["A very large number of people can be asked cheaply", "That is an advantage of questionnaires."], ["It never takes very much time to carry out", "Interviews take a long time."], ["The answers can be compared automatically", "Interview answers are harder to compare."]],
    "Interviews allow follow-up questions and detail.");
  mc(b, 3, "APPLICATION", "A company wants a system that has to hold personal details of customers. The analyst checks that the plan respects the data protection laws. Which type of feasibility is this?",
    ["Legal", "Correct."],
    [["Technical", "Technical feasibility concerns the hardware, software and skills."], ["Economic", "Economic feasibility concerns costs and benefits."], ["Schedule", "Schedule feasibility concerns the time needed."]],
    "Checking the law is legal feasibility.", { hints: ["Which feasibility type is about laws and regulations?"] });
  mc(b, 3, "APPLICATION", "The staff of a small clinic say they will not use a computer system because they prefer their paper cards. Which type of feasibility is most affected?",
    ["Operational", "Correct: it concerns whether the people will accept and use the system."],
    [["Technical", "The technology may be available."], ["Economic", "The question is about acceptance, not cost."], ["Legal", "Nothing here concerns the law."]],
    "Operational feasibility asks whether the users will use the system.", { hints: ["Who must use the system?"] });
  mc(b, 3, "ANALYSIS", "Which is the best requirement for a user requirements specification?",
    ["A booking is saved in under 3 seconds", "Correct: it is specific and can be tested."],
    [["The system must be quick", "This cannot be tested."], ["The system must be good", "This cannot be tested."], ["The program should use modern ideas and methods", "This is vague and cannot be tested."]],
    "A good requirement is specific and testable.", { hints: ["Can you check the requirement with a test?"] });
  mc(b, 3, "ANALYSIS", "Which document is produced at the end of the feasibility study?",
    ["A feasibility report", "Correct."],
    [["A user requirements specification", "That follows, in the analysis stage."], ["A user guide", "That is produced near implementation."], ["A completed test plan", "The test plan is produced in design."]],
    "The study reports its findings and recommendation to the management.", { hints: ["What does the management need to decide?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Document inspection shows how staff actually carry out their work.", answer: false, explanation: "False. It shows the data and forms that are used, but observation shows how the work is done." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of feasibility to the question it asks.",
    pairs: [["Technical", "Are the hardware, software and skills available?"], ["Economic", "Do the benefits outweigh the costs?"], ["Operational", "Will the users accept and use the system?"], ["Legal", "Does the system obey the law?"], ["Schedule", "Can it be finished in the time allowed?"]],
    explanation: "Each type tests a different aspect." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each fact-finding technique to the situation in which it is the best choice.",
    pairs: [["Interview", "Detailed opinions are needed from a few managers"], ["Questionnaire", "Simple views are needed from 400 customers"], ["Observation", "The analyst needs to see how the work is really done"], ["Document inspection", "The analyst needs to see which data items the forms contain"]],
    explanation: "Choose the technique to suit the information needed." });
  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentences about fact finding.",
    template: "A {{blank:a}} is a set of written questions given to many people. An {{blank:b}} is a face-to-face conversation with questions.",
    blanks: [
      { id: "a", accepted: ["questionnaire"], choices: ["questionnaire", "interview", "observation"] },
      { id: "b", accepted: ["interview"], choices: ["questionnaire", "interview", "observation"] },
    ], explanation: "Questionnaire: written; interview: face to face." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the document that lists what the new system must do and is agreed with the users.",
    accepted: ["user requirements specification", "requirements specification", "URS", "the user requirements specification", "user requirement specification"], explanation: "The user requirements specification." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Payback = cost ÷ saving each month."],
    stem: "A shop will pay US\\$3 600 for a stock control system that saves US\\$150 a month. Calculate the payback period, in months.",
    value: payback, unit: undefined, wrong: [12, 54], workedSolution: `1. Payback = cost ÷ monthly saving.\n2. 3 600 ÷ 150 = ${payback} months.`, explanation: `${cost} ÷ ${saving} = ${payback} months.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "%", hints: ["Response rate = returned ÷ sent × 100."],
    stem: `An analyst sends ${sent} questionnaires to customers and ${returned} are returned. Calculate the response rate as a percentage.`,
    value: rate, wrong: [96, 36], workedSolution: `${returned} ÷ ${sent} × 100 = ${rate}%.`, explanation: `${returned} ÷ ${sent} × 100 = ${rate}%.` });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Savings over 24 months minus the cost minus the running costs."],
    stem: `A system costs US\\$${cost3} to set up and saves US\\$${saving3} a month. It costs US\\$${runningMonthly} a month to run. Calculate the net benefit, in US\\$, after 24 months. (A negative answer means a net loss.)`,
    value: net2, wrong: [4200, 0], workedSolution: `1. Savings = 24 × ${saving3} = ${24 * saving3}.\n2. Running costs = 24 × ${runningMonthly} = ${24 * runningMonthly}.\n3. Net benefit = ${24 * saving3} − ${cost3} − ${24 * runningMonthly} = ${net2}.`, explanation: `The net benefit is ${net2}: after 24 months the system has not yet paid for itself.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Name the technique, then an advantage and a disadvantage."],
    stem: "Describe one advantage and one disadvantage of each of the following fact-finding techniques: interviews and questionnaires. [4]",
    points: ["Interview advantage: detailed answers and the analyst can ask follow-up questions", "Interview disadvantage: time-consuming (and expensive) to carry out", "Questionnaire advantage: many people can be asked cheaply and the answers are easy to compare", "Questionnaire disadvantage: many are not returned, and they give little detail"],
    modelAnswer: "Interviews give detailed answers and allow follow-up questions, but they take a long time. Questionnaires can be given cheaply to many people and the answers are easy to compare, but many are not returned and the answers have little detail.",
    explanation: "One advantage and one disadvantage for each." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Technical, economic and operational are three of the types."],
    stem: "A bus company in Gweru is considering a ticketing system. Explain what is tested in the economic, technical and operational feasibility studies. [3]",
    points: ["Economic: whether the benefits (savings, extra income) outweigh the costs", "Technical: whether suitable hardware, software and skills are available", "Operational: whether the staff and customers will accept and use the system"],
    modelAnswer: "Economic: whether the benefits outweigh the costs. Technical: whether the hardware, software and skills are available. Operational: whether the staff and customers will accept and use the system.",
    explanation: "One test for each type." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what the users and the developers need to agree."],
    stem: "Give three reasons why a user requirements specification is needed. [3]",
    points: ["It records what the system must do, agreed by the users", "It gives the developers a clear target to design and build", "It can be used at the end to test whether the system meets the requirements"],
    modelAnswer: "It records what the users need and have agreed to. It gives the developers a clear target. It is used at the end to check that the finished system meets the requirements.",
    explanation: "Agreement, target, test." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Think about what each technique shows that the other does not."],
    stem: "An analyst uses both observation and document inspection to study how a clinic records appointments. Explain why it is better to use both techniques than only one. [4]",
    points: ["Observation shows how the work is really done, including problems the staff do not mention", "Document inspection shows the actual forms, data items and their formats", "Observation alone does not show the data fields or the volumes of data", "Document inspection alone does not show the steps of the process or the delays"],
    modelAnswer: "Observation shows how the work is really done and any problems staff do not mention, but does not show the data fields. Document inspection shows the forms and data items but not the steps or delays. Using both gives a complete picture.",
    explanation: "Each technique covers what the other misses." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Work out the payback and the percentages."],
    explanation: `Payback ${cost2} ÷ ${saving2} = 18 months; response rate ${returned2} ÷ ${sent2} = ${rate2}%.`,
    stem: `A school in Mutare is considering a fees system that costs US\\$${cost2} and saves US\\$${saving2} a month in clerks' time. The analyst sent ${sent2} questionnaires to parents and ${returned2} were returned.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the payback period, in months.", value: cost2 / saving2, workedSolution: `${cost2} ÷ ${saving2} = ${cost2 / saving2}.`, wrong: [15, 1620], explanation: `${cost2} ÷ ${saving2} = 18 months.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the response rate to the questionnaire, as a percentage.", value: rate2, unit: "%", workedSolution: `${returned2} ÷ ${sent2} × 100 = ${rate2}.`, wrong: [138, 31], explanation: `${returned2} ÷ ${sent2} × 100 = ${rate2}%.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State two other tests of feasibility that the analyst should make, and say what each tests.", points: ["Technical: whether the equipment and skills are available (or operational: whether the staff will use it)", "Legal or schedule: whether the system keeps the law about personal data (or whether it can be finished in time)"], modelAnswer: "Technical feasibility tests whether the equipment and skills are available. Legal feasibility tests whether the system obeys the law about personal data.", explanation: "Name two types and say what they test." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Think about when each technique is most suitable."],
    explanation: "A questionnaire reaches all 300 parents; interviews give detail; observation shows the real process.",
    stem: "A school in Chinhoyi wants to replace its paper-based library records with a computer system. The librarian, two teachers and 300 learners use the library.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Choose a fact-finding technique to collect the opinions of the 300 learners and give a reason.", points: ["A questionnaire", "Many people can be asked cheaply and the answers can be compared"], modelAnswer: "A questionnaire, because 300 learners can be asked cheaply and the answers are easy to compare.", explanation: "Questionnaire for large groups." }),
      P.manual({ label: "(b)", marks: 2, stem: "Choose a technique to find out in detail how the librarian lends books and give a reason.", points: ["An interview (or observation)", "The librarian can describe the process in detail and the analyst can ask follow-up questions (or the analyst sees what really happens)"], modelAnswer: "An interview, because the librarian can describe the process in detail and the analyst can ask follow-up questions.", explanation: "Interview or observation for detail." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what the analyst learns by inspecting the cards that are currently filled in when a book is borrowed.", points: ["Which data items are recorded (for example title, borrower and dates)", "The layout and format of the data that the new system must hold"], modelAnswer: "The analyst learns which data items are recorded, such as the title, borrower and dates, and their format.", explanation: "Document inspection shows data items." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two items that should appear in the user requirements specification.", points: ["What the system must do, for example record a loan and show overdue books", "A constraint, such as the budget or the time available (or the inputs and outputs required)"], modelAnswer: "The system must record a loan and list overdue books, and it must cost no more than the budget.", explanation: "Functions and constraints." }),
    ] });
  b.card("DEFINITION", "Preliminary investigation", "A short study at the start to find out what the problem is, who is affected and whether it is worth studying further.");
  b.card("DEFINITION", "Feasibility study", "A study that tests whether a proposed solution is practical: technical, economic, operational, legal and schedule.");
  b.card("FACT", "Five types of feasibility", "Technical, economic, operational, legal, schedule.");
  b.card("FORMULA", "Payback period", "Payback period = initial cost ÷ saving per period (for example per month).");
  b.card("CONCEPT", "Interview", "Advantage: detailed answers and follow-up questions. Disadvantage: slow and costly.");
  b.card("CONCEPT", "Questionnaire", "Advantage: cheap, many people, easy to compare. Disadvantage: low response, little detail.");
  b.card("CONCEPT", "Observation and document inspection", "Observation shows what really happens. Document inspection shows the data and forms used.");
  b.card("DEFINITION", "User requirements specification", "A document agreed with the users that lists what the new system must do and the constraints.");
  b.card("FORMULA", "Response rate", "Response rate = questionnaires returned ÷ questionnaires sent × 100%.");
});
