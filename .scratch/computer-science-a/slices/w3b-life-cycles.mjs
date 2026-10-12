// Slice w3b: Development life cycles (acs.sdlc.life-cycles, both boards).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const projectWeeks = 20;
const iters = 4;
const perIter = projectWeeks / iters;
chk(perIter, 5);
const waterfallWeeks = [3, 4, 6, 4, 3];
chk(waterfallWeeks.reduce((a, b) => a + b, 0), 20);
const testStart = waterfallWeeks[0] + waterfallWeeks[1] + waterfallWeeks[2];
chk(testStart, 13);

concept("acs.sdlc.life-cycles", { file: "sdlc/life-cycles", keyPrefix: "sdlc.life-cycles" }, (b) => {
  mc(b, 1, "RECALL", "Which of these lists the stages of the program development life cycle in the correct order?",
    ["Analysis, design, coding, testing, maintenance", "Correct."],
    [["Design, analysis, coding, testing, maintenance", "Analysis comes before design."], ["Analysis, coding, design, testing, maintenance", "The design must be done before coding."], ["Coding, testing, analysis, design, maintenance", "Analysis is the first stage."]],
    "The order is analysis, design, coding, testing, maintenance.");
  mc(b, 2, "RECALL", "In the waterfall model, what happens at the end of each stage?",
    ["The stage is approved before the next one begins", "Correct."],
    [["The whole project starts again from analysis", "That describes repeating cycles, not the waterfall model."], ["The users are given a prototype to test", "That is the iterative or RAD approach."], ["The programmers choose for themselves which stage to do next", "The stages follow a fixed order."]],
    "Each waterfall stage is finished and signed off before the next.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of the waterfall model?",
    ["Each stage is documented, so progress is easy to measure", "Correct."],
    [["The user sees a working system within the first week", "The user normally sees nothing working until near the end."], ["Changes to the requirements are easy to make at any time", "Changes late in the project are costly in the waterfall model."], ["Testing is done continuously during coding", "Testing is a separate stage after coding."]],
    "Clear stages and documents make the waterfall easy to manage.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a drawback of the waterfall model?",
    ["Errors in the requirements may be found late", "Correct: the user sees the system late."],
    [["It needs the user to be present throughout", "That is more true of RAD."], ["It produces no documents", "It produces many documents."], ["It cannot be used for any large project at all", "It is often used for large, well-defined projects."]],
    "Users see the system late, so errors in the requirements are found late.");
  mc(b, 3, "APPLICATION", "A team is building a payroll program. The requirements are fixed by law and are well understood. Which life cycle model is the most suitable?",
    ["Waterfall", "Correct: stable requirements suit a sequence of stages."],
    [["Iterative, because the requirements keep changing", "The requirements are stable here."], ["RAD, because the users can build the program themselves", "RAD does not mean the users build the program."], ["No model, because the project is too small", "A life cycle gives structure to any project."]],
    "Stable, well-understood requirements are a good fit for the waterfall model.", { hints: ["Are the requirements likely to change?"] });
  mc(b, 3, "APPLICATION", "A start-up wants an app for farmers. The owner will only know what is needed after seeing a working version, and farmers are available for weekly trials. Which model is the most suitable?",
    ["Iterative or RAD, with working versions reviewed each cycle", "Correct: feedback from users shapes the next version."],
    [["Waterfall, with all the requirements fixed in week 1", "The requirements are not known in advance."], ["Waterfall, because the farmers are not needed until the end", "The farmers' feedback is the key resource."], ["No model, because apps do not need analysis", "Analysis is still needed in every cycle."]],
    "When requirements are unclear and users are available, an iterative approach or RAD works well.", { hints: ["Who will decide what is needed, and when?"] });
  mc(b, 3, "ANALYSIS", "Which statement about rapid application development (RAD) is correct?",
    ["It uses prototypes and reuse to deliver a system quickly", "Correct."],
    [["It requires every document to be completed before coding", "That is more like the waterfall model."], ["It never involves the users", "Users are involved throughout."], ["It is always the best choice for safety-critical systems", "Its speed is a risk for safety-critical systems."]],
    "RAD focuses on speed with prototypes, reuse and user involvement.", { hints: ["What does the R in RAD stand for?"] });
  mc(b, 4, "ANALYSIS", "In the ZIMSEC nine-stage cycle, which stage decides whether a proposed solution is possible, affordable and acceptable, before the detailed requirements are studied?",
    ["Feasibility study", "Correct."],
    [["Implementation stage", "Implementation is installing the finished system."], ["Evaluation stage", "Evaluation comes after the system has been in use."], ["Maintenance stage", "Maintenance is the work done after delivery."]],
    "The feasibility study follows the preliminary investigation and precedes analysis.", { hints: ["Which stage comes before analysis?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Maintenance is the last stage of the program development life cycle.", answer: true, explanation: "True. It continues for as long as the system is used." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In the iterative model the users can try a working version before the whole system is complete.", answer: true, explanation: "True. Each iteration produces a working version." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Think about when each model tests the program."],
    stem: "In the waterfall model all the testing is completed before any coding is done.", answer: false, explanation: "False. Testing follows coding in the waterfall model." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each development model to its description.",
    pairs: [["Waterfall", "Stages are done once, in order, each finished before the next"], ["Iterative", "Repeated cycles of working versions improved with feedback"], ["RAD", "Rapid prototypes built with users and reusable components"]],
    explanation: "Each model organises the stages differently." });
  b.match({ d: 3, skill: "UNDERSTANDING", hints: ["Put the stages in order first."], stem: "Match each stage of the ZIMSEC development cycle to the question that it answers.",
    pairs: [["Preliminary investigation", "Is there a problem worth solving?"], ["Feasibility study", "Is the solution possible, affordable and acceptable?"], ["Analysis", "What must the new system do?"], ["Implementation", "How is the system installed and started?"], ["Evaluation", "Does the system meet its objectives?"]],
    explanation: "Each stage has its own purpose." });
  b.fib({ d: 2, skill: "RECALL", stem: "Put the first four stages of the Cambridge life cycle in order.",
    template: "Stage 1: {{blank:a}}\n\nStage 2: {{blank:b}}\n\nStage 3: {{blank:c}}\n\nStage 4: {{blank:d}}",
    blanks: [
      { id: "a", accepted: ["Analysis"], choices: ["Analysis", "Design", "Coding", "Testing"] },
      { id: "b", accepted: ["Design"], choices: ["Analysis", "Design", "Coding", "Testing"] },
      { id: "c", accepted: ["Coding"], choices: ["Analysis", "Design", "Coding", "Testing"] },
      { id: "d", accepted: ["Testing"], choices: ["Analysis", "Design", "Coding", "Testing"] },
    ], explanation: "Analysis, design, coding, testing (then maintenance)." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the development model in which each stage is finished and approved before the next stage begins.",
    accepted: ["waterfall", "waterfall model", "the waterfall model"], explanation: "The waterfall model." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the weeks of the first three stages."],
    stem: `A waterfall project lasts ${projectWeeks} weeks. The stages are: analysis 3 weeks, design 4 weeks, coding 6 weeks, testing 4 weeks and maintenance set-up 3 weeks. After how many weeks does testing begin?`,
    unit: undefined, value: testStart, wrong: [10, 16], workedSolution: "1. Analysis 3 + design 4 + coding 6 = 13.\n2. Testing begins after week 13.", explanation: "3 + 4 + 6 = 13 weeks." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Divide the project length by the number of iterations."],
    stem: `A ${projectWeeks}-week iterative project is split into ${iters} iterations of equal length. How many weeks is the first iteration, after which the users see a working version?`,
    value: perIter, wrong: [4, 20], workedSolution: `${projectWeeks} ÷ ${iters} = ${perIter} weeks.`, explanation: `${projectWeeks} ÷ ${iters} = ${perIter}.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 2, hints: ["What is the consequence of a late discovery?"],
    stem: "Describe one benefit and one drawback of the waterfall model. [2]",
    points: ["Benefit: clear stages and documents, so the project is easy to manage and progress is easy to measure", "Drawback: the user sees the system late, so errors or changes in the requirements are found late and are costly"],
    modelAnswer: "A benefit is that the stages and documents are clear, so progress is easy to measure. A drawback is that the user sees the system late, so errors in the requirements are found late and are costly to fix.",
    explanation: "Each point has a reason." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe how it works, then give two benefits."],
    stem: "Describe the iterative model of development and give two benefits of using it. [4]",
    points: ["A basic working version is built first", "It is improved or extended in repeated cycles, using the users' feedback", "Benefit: users see working software early", "Benefit: changes in the requirements can be accommodated (or risks are found early)"],
    modelAnswer: "A basic working version is built first and then improved or extended in repeated cycles using the users' feedback. Users see working software early, and changes in the requirements can be accommodated.",
    explanation: "Process and two benefits." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Name a model, link it to the scenario, and give two reasons."],
    stem: "A college wants an online timetable system. The staff are not sure what the system should show and are willing to try versions every week. Recommend a life cycle model and justify your choice. [4]",
    points: ["Recommends an iterative model (or RAD)", "The requirements are unclear, so the system can be improved after each version", "Staff can try working versions every week and give feedback", "A model with all stages in sequence (waterfall) would show the system too late for the staff to change it"],
    modelAnswer: "An iterative model (or RAD) is suitable. The requirements are unclear, so each version can be improved after staff try it. Staff are available weekly to give feedback, whereas the waterfall model would show the system too late for them to change it.",
    explanation: "Choice justified using the scenario." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read what the scenario says about the requirements."],
    explanation: "The requirements are unclear and users are available, so an iterative approach (or RAD) is suitable.",
    stem: "A co-operative in Masvingo wants a mobile app that lets members see the price of their crops. The members have never used such an app and are not sure what they need. A group of members can test a new version every two weeks.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which life cycle model is the most suitable?", options: [["Iterative", "Correct: working versions can be improved using the members' comments."], ["Waterfall", "The requirements are not fixed."], ["No model", "Every project benefits from a life cycle."], ["Maintenance", "Maintenance is a stage, not a model."]], answer: "A", explanation: "Unclear requirements and frequent testers suit the iterative model." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two reasons for your answer to part (a).", points: ["The requirements are unclear, and each version can be changed in the light of the members' comments", "The members can test a version every two weeks, so feedback is frequent"], modelAnswer: "The requirements are unclear so each version can be changed after the members' comments, and the members can test a version every two weeks.", explanation: "Link to the scenario." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe three stages that are carried out in each cycle of the model chosen.", points: ["Analysis of the feedback and the next requirements", "Design and coding of the new or changed features", "Testing the new version before it is given to the members"], modelAnswer: "In each cycle the feedback and the next requirements are analysed, the new or changed features are designed and coded, and the new version is tested before it is given to the members.", explanation: "A mini life cycle in each iteration." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Which stage comes after coding?", "Think about the order of the ZIMSEC stages."],
    explanation: "The nine stages run from preliminary investigation to evaluation; feasibility precedes analysis.",
    stem: "A hospital in Harare develops a patient booking system using the nine-stage ZIMSEC cycle.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the stage that is done immediately after the feasibility study.", accepted: ["analysis", "system analysis"], explanation: "Analysis follows feasibility." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the stage in which the new system is installed and the staff are trained.", accepted: ["implementation"], explanation: "Implementation." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the purpose of the evaluation stage.", points: ["To judge whether the system meets its objectives", "To find improvements that can be made (which may start a new cycle)"], modelAnswer: "Evaluation judges whether the system meets its objectives and finds improvements that could be made.", explanation: "Evaluation looks back at the objectives." }),
      P.manual({ label: "(d)", marks: 4, stem: "The hospital director asks why the nine stages should not be replaced by simply starting to write the program. Give two reasons.", points: ["Without analysis the program may not do what the hospital needs", "Without design and testing, faults are likely and are costly to correct later", "The stages give a plan, documents and checkpoints so progress can be measured", "Maintenance and evaluation make sure the system keeps meeting the hospital's needs"], modelAnswer: "Without analysis the program may not do what the hospital needs, and without design and testing faults are costly to correct later. The stages also give a plan with documents and checkpoints so that progress can be measured.", explanation: "Two reasons, each explained." }),
    ] });
  b.card("DEFINITION", "Program development life cycle", "The stages a program passes through: analysis, design, coding, testing, maintenance.");
  b.card("FACT", "ZIMSEC nine stages", "Preliminary investigation, feasibility study, analysis, design, development, testing, implementation, maintenance, evaluation.");
  b.card("DEFINITION", "Waterfall model", "The stages are carried out once, in order; each is finished and approved before the next starts.");
  b.card("CONCEPT", "Waterfall: benefits and drawbacks", "Benefits: simple, clear documents, easy to measure. Drawbacks: users see it late, changes are costly, testing is late.");
  b.card("DEFINITION", "Iterative model", "Repeated cycles that each produce a working version, reviewed and improved in the next cycle.");
  b.card("CONCEPT", "Iterative: benefits and drawbacks", "Benefits: early working software, handles change, early risks. Drawbacks: cost and date harder to predict, needs user contact.");
  b.card("DEFINITION", "Rapid application development (RAD)", "Quick development using prototypes built with users and reused components, refined into the final system.");
  b.card("CONCEPT", "Choosing a model", "Stable requirements: waterfall. Changing or unclear: iterative. Speed with available users: RAD.");
  b.card("CONCEPT", "Why use a life cycle", "It gives a plan, documents and checkpoints, so a project is predictable and the system meets the user's needs.");
});
