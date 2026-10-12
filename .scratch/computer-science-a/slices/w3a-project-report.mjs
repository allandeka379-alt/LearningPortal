// Slice w3a: acs.skills.project-report (ZIMSEC only, Forms 5-6). Descriptive: marked against points. The project itself is not simulated.
import { concept, P, chk, same, py, codeBlock, mdTable, round } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

// Marks of a (fictional) report
const secs = { A: 21, B: 19, C: 22, D: 12, E: 7 };
const total = Object.values(secs).reduce((a, b) => a + b, 0);
chk(total, 81);
chk(round(total * 0.2, 1), 16.2);
// Pages
const mainPages = 38;
const appendixPages = 14;
chk(mainPages + appendixPages, 52);
// A grading routine with real output
const code = `def grade(mark_text):
    if not mark_text.isdigit():
        return "Invalid"
    mark = int(mark_text)
    if mark > 100:
        return "Invalid"
    if mark >= 70:
        return "A"
    if mark >= 50:
        return "B"
    return "U"


for item in ["85", "70", "69", "50", "49", "0", "100", "101", "x7"]:
    print(item, grade(item))`;
const out = py(code).split("\n");
same(out, ["85 A", "70 A", "69 B", "50 B", "49 U", "0 U", "100 A", "101 Invalid", "x7 Invalid"]);
const answer = (m) => out.find((l) => l.startsWith(m + " ")).slice(m.length + 1);
same(answer("69"), "B");
same(answer("101"), "Invalid");

concept("acs.skills.project-report", { file: "skills/project-report", keyPrefix: "skills.project-report" }, (b) => {
  mc(b, 1, "RECALL", "Which section of the ZIMSEC project report is worth 15 marks?",
    ["Section D: testing and evaluation", "Correct."],
    [["Section A: selection, investigation and analysis", "Section A is worth 25 marks."], ["Section B: design", "Section B is worth 25 marks."], ["Section E: general expectations", "Section E is worth 10 marks."]],
    "Section D is worth 15 marks.");
  mc(b, 2, "UNDERSTANDING", "Where should completed questionnaires and interview answers be placed in the report?",
    ["In the appendices", "Correct: they are evidence of the research."],
    [["On the cover page", "The cover page carries the title and details."], ["In the table of contents", "The contents page lists sections and pages."], ["They should not be included", "Evidence of research earns marks."]],
    "Bulky evidence goes in the appendices.", { daily: true });
  mc(b, 2, "APPLICATION", "A program accepts ages from 12 to 18. Which value is extreme (boundary) test data?",
    ["12", "Correct: it is valid and on the lower limit."],
    [["15", "15 is standard data."], ["11", "11 is abnormal data, just outside the range."], ["abc", "abc is abnormal data."]],
    "Extreme data is valid data at the limits of the range.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which document explains to the client how to install, start and use the system?",
    ["The user documentation", "Correct."],
    [["The technical documentation", "This is written for programmers."], ["The feasibility study", "This checks whether the solution is worthwhile."], ["The program listing", "This lists the code."]],
    "User documentation is written for the client.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "According to the project guide, what is the limit on the length of the project?",
    ["50 pages, not counting the appendices", "Correct."],
    [["10 pages including everything", "This is too short."], ["There is no limit", "The guide sets a limit."], ["50 pages including all of the appendices", "The appendices are not counted."]],
    "The limit is 50 pages excluding appendices.", { hints: ["Do the appendices count?"] });
  mc(b, 3, "ANALYSIS", "What does a feasibility study check?",
    ["Whether the proposed solution is possible and worthwhile", "Correct."],
    [["Whether the program has any spelling mistakes", "That is testing."], ["Whether the report is spiral bound", "That is a presentation rule."], ["Which colour to use on the cover page", "That is not a feasibility question."]],
    "A feasibility study checks technical, economic and operational factors.", { hints: ["Is it done at the start or the end of the project?"] });
  mc(b, 3, "EVALUATION", "Which objective is best written for a project, so that it can be tested?",
    ["The bursar can find a learner's balance in under ten seconds", "Correct: it can be measured."],
    [["The system will be good", "This cannot be measured."], ["The program will be modern", "This cannot be measured."], ["The users will like the system very much when it is finished", "This is vague."]],
    "Objectives should be specific and measurable.", { hints: ["Can you test it and get a yes or no?"] });
  mc(b, 4, "EVALUATION", "Which statement would earn most credit in the evaluation of a project?",
    ["Objectives 1 to 4 were met, shown by the tests; objective 5 was not met because reports cannot be printed, and printing is planned as an improvement", "Correct: it is honest, linked to the objectives and looks forward."],
    [["The system works perfectly and has no faults, the user was extremely happy with every part of it, and nothing needs to be improved", "No system is perfect and the claim has no evidence."], ["The system was finished on time", "This says nothing about the objectives."], ["The user was happy", "This has no evidence or detail."]],
    "An evaluation compares the result with each objective.", { hints: ["Which answer is specific and honest?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a test plan the expected results should be written before the tests are run.", answer: true, explanation: "True. Expected results are decided from the requirements, so that the real result can be judged against them." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each section of the project report to what it contains.",
    pairs: [["Section A", "Investigation of the current system, feasibility study and requirements"], ["Section B", "Alternative methods, input, output and file design, and the test strategy"], ["Section C", "Well-structured code, technical documentation and user documentation"], ["Section D", "Test data, system testing and the evaluation"], ["Section E", "Depth, originality, conduct and the quality of the report"]],
    explanation: "Each section has a clear purpose." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about test data.", hints: ["Typical, limit and invalid."],
    template: "Typical valid data is {{blank:a}} data. Valid data at the limits of the range is {{blank:b}} data. Invalid data that the program must reject is {{blank:c}} data.",
    blanks: [
      { id: "a", accepted: ["standard"], choices: ["standard", "extreme", "abnormal", "random"] },
      { id: "b", accepted: ["extreme"], choices: ["extreme", "standard", "abnormal", "normal"] },
      { id: "c", accepted: ["abnormal"], choices: ["abnormal", "standard", "extreme", "normal"] },
    ], explanation: "Standard, extreme and abnormal." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the research tool in which a researcher asks a person questions face to face and writes down the answers.",
    accepted: ["interview", "an interview", "interviews"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["questionnaire"], explanation: "An interview." });
  b.num({ d: 2, skill: "APPLICATION", hints: ["Add the five section marks."],
    stem: `A learner's project is marked: Section A ${secs.A}, Section B ${secs.B}, Section C ${secs.C}, Section D ${secs.D} and Section E ${secs.E}. Calculate the total mark out of 100.`,
    value: total, wrong: [100 - total, 85], workedSolution: `1. ${Object.values(secs).join(" + ")} = ${total}.`, explanation: `${total} out of 100.` });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Only the main text counts towards the limit of 50 pages."],
    stem: `A report has ${mainPages} pages of main text and ${appendixPages} pages of appendices. By how many pages is the main text below the limit of 50 pages (the appendices are not counted)?`,
    value: 50 - mainPages, wrong: [50 - mainPages - appendixPages, mainPages + appendixPages - 50], workedSolution: `1. Limit = 50 pages of main text.\n2. 50 − ${mainPages} = ${50 - mainPages} pages.`, explanation: `50 − ${mainPages} = ${50 - mainPages}.` });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Project marks out of 100 are worth 20% of the final grade."],
    stem: `The project (Paper 4) carries 20% of the final grade. A learner scores ${total} out of 100 for it. How many percentage points does it add to the final grade? Give your answer to one decimal place.`,
    value: 16.2, tol: 0.05, wrong: [81, 20], workedSolution: `1. ${total} ÷ 100 × 20 = 16.2 percentage points.`, explanation: `${total}% of 20 = 16.2.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Two tools with a use for each."],
    stem: "Describe two research tools that a learner could use to investigate the current system of a school office. [4]",
    points: ["Interview: ask the bursar or clerk questions face to face about how the work is done", "It gives detailed answers and explanations of problems", "Questionnaire or record inspection: many staff answer the same questions, or the learner reads the existing paper records", "It gives comparable answers from many people, or shows the real data and forms in use"],
    modelAnswer: "An interview with the bursar gives detailed answers about how the work is done and what problems there are. A questionnaire given to many staff gives comparable answers, and inspecting the paper records shows the real forms and data in use.",
    explanation: "Two tools and their value." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about the four tasks a client must do with the system."],
    stem: "State what the user documentation of a project should contain. [4]",
    points: ["How to install the system", "How to start the system", "How to use it (navigation), with screens and examples", "How to exit the system, what the error messages mean and what to do if something goes wrong"],
    modelAnswer: "How to install the system, how to start it, how to use and navigate it with screens and examples, and how to exit it, including what the messages mean and what to do if something goes wrong.",
    explanation: "Installation, starting, navigation, exiting." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 6, hints: ["Give a table with standard, extreme and abnormal data, each with an expected result."],
    stem: "A project includes a routine that accepts a mark from 0 to 100. Write a test plan with six tests. Give the type of data, the input and the expected result for each. [6]",
    points: ["A standard test such as 65, accepted", "A lower extreme test, 0, accepted", "An upper extreme test, 100, accepted", "An abnormal test just outside the range, such as 101 or -1, rejected with a message", "An abnormal test of the wrong type, such as a letter, rejected", "An empty input or another abnormal case, rejected, and every test has an expected result"],
    modelAnswer: "65 (standard) accepted; 0 (extreme) accepted; 100 (extreme) accepted; 101 (abnormal) rejected with an error message; the letter x (abnormal, wrong type) rejected; an empty entry (abnormal) rejected.",
    explanation: "Standard, extreme and abnormal with expected results." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the result with the objectives; mention limits and the future."],
    stem: "Describe how a learner should evaluate a finished project. [4]",
    points: ["Compare the system with each objective in the requirements specification", "State which objectives were met and give the evidence from testing", "State the limitations, honestly", "Suggest improvements and opportunities for future development, and include the user's feedback"],
    modelAnswer: "Compare the system with each objective, saying which were met with the evidence from testing. State the limitations honestly, include the user's feedback and suggest improvements for the future.",
    explanation: "Objectives, evidence, limitations, future." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Check the conditions in the order of the program.", "Marks of 70 or more get an A; 50 to 69 a B."],
    explanation: "69 gives B, 101 and x7 are invalid, and 49 gives U.",
    stem: `A learner's project contains this grading routine. Marks must be whole numbers from 0 to 100.\n\n${codeBlock(code, "python")}\n\nThe method \`isdigit()\` is true only when the text is made up only of digits.`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the result for the input 69.", accepted: ["B"], normalise: ["trim", "lowercase"], wrong: ["A"], explanation: "69 is at least 50 and below 70." }),
      P.short({ label: "(b)", marks: 1, stem: "State the result for the input 49.", accepted: ["U"], normalise: ["trim", "lowercase"], wrong: ["B"], explanation: "49 is below 50." }),
      P.short({ label: "(c)", marks: 1, stem: "State the result for the input x7.", accepted: ["Invalid"], normalise: ["trim", "lowercase"], wrong: ["U"], explanation: "x7 contains a letter, so isdigit() is false." }),
      P.manual({ label: "(d)", marks: 3, stem: "Classify the inputs 70, 100 and 101 as standard, extreme or abnormal data, and state the result of each.", points: ["70 is extreme (a boundary between B and A) and the result is A", "100 is extreme (upper limit) and the result is A", "101 is abnormal (just outside the range) and the result is Invalid"], modelAnswer: "70 is a boundary value and gives A; 100 is the upper limit and gives A; 101 is abnormal and gives Invalid.", explanation: "Boundaries and invalid data." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["An objective should be specific and measurable."],
    explanation: "Each objective needs a test and evidence; weak objectives cannot be tested.",
    stem: "Nyasha is writing a stock-control program for a school tuck shop. One of her objectives is: \"The system should be good.\"",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why this objective is weak.", points: ["It is vague: the word good has no measure", "It cannot be tested, so there is no way to show in the evaluation whether it was met"], modelAnswer: "It is vague because good cannot be measured, so it cannot be tested and the evaluation cannot show whether it was met.", explanation: "Not measurable." }),
      P.manual({ label: "(b)", marks: 2, stem: "Rewrite the objective as two specific, measurable objectives.", points: ["For example: the shop assistant can record a sale in under ten seconds", "For example: the system warns the assistant when the stock of an item falls below a set level"], modelAnswer: "The shop assistant can record a sale in under ten seconds, and the system warns the assistant when the stock of an item falls below a set level.", explanation: "Specific, measurable objectives." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the evidence she should include to show that the first of the two new objectives has been met.", points: ["A timed trial with the assistant recording several sales, with the times written down", "A screen shot or sample run, and the assistant's comment"], modelAnswer: "A timed trial with the assistant recording several sales, with the times written down, plus a screen shot or sample run and the assistant's comment.", explanation: "Test evidence." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Each part of the report has to show a different skill."],
    explanation: "A good project begins with real investigation and ends with an honest evaluation.",
    stem: "Tendai is in Form 5 in Hwange and has chosen to write a library system for his school as his project.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give two reasons why this is a suitable choice of problem.", points: ["There is a real client (the librarian) who can answer questions and give feedback", "It needs enough programming to show depth, such as files or a database, validation and reports"], modelAnswer: "There is a real client, the librarian, who can answer questions and give feedback, and it needs enough programming such as files or a database, validation and reports.", explanation: "Real client and depth." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two items of evidence he should put in the appendices.", points: ["Completed questionnaires or interview questions with the answers", "Sample documents, such as the library's current loan cards or forms"], modelAnswer: "Completed questionnaires or interview answers, and sample documents such as the library's loan cards.", explanation: "Evidence of research." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe two things that would make his code easy to read and maintain.", points: ["Meaningful names, comments, indentation and blank lines", "Separate procedures and functions for each task, with local variables where possible"], modelAnswer: "Meaningful names, comments, indentation and blank lines, and separate procedures and functions for each task with local variables where possible.", explanation: "Code structure." }),
    ] });
  b.card("DEFINITION", "Project report", "A report of limited length describing the investigation, design, development, testing and evaluation of a computer-based solution to a real problem.");
  b.card("CONCEPT", "Sections and marks", "A: selection, investigation and analysis 25. B: design 25. C: software development 25. D: testing and evaluation 15. E: general expectations 10.");
  b.card("FACT", "Layout rules", "Maximum 50 pages excluding appendices; cover page, contents and appendices; spiral bound; appendices hold any two of questionnaires, interviews with answers, sample documents.");
  b.card("CONCEPT", "Research tools", "Questionnaires, interviews, record inspection and observation; keep the completed evidence.");
  b.card("CONCEPT", "Test data", "Standard (typical), extreme (limits) and abnormal (invalid); write expected results before testing and show sample runs.");
  b.card("CONCEPT", "Code quality", "Procedures and functions, local and global variables, comments, blank lines and indentation; technical documentation and user documentation.");
  b.card("CONCEPT", "User documentation", "Installation, starting the system, navigation and exiting the system, written for the client.");
  b.card("CONCEPT", "Evaluation", "Compare the system with each objective: achievements, limitations, user feedback and future development.");
});
