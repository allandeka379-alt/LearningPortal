// Slice w3b: the systems development life cycle and fact-finding (comp.sad.sdlc-fact-finding, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const STAGES = ["Problem identification", "Feasibility study", "Analysis", "Design", "Development and testing", "Implementation", "Evaluation", "Maintenance"];

concept("comp.sad.sdlc-fact-finding", { file: "sad/sdlc-fact-finding", keyPrefix: "sad.sdlc-fact-finding" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **systems development life cycle**?",
    options: [
      ["The series of stages followed to develop a new information system", "Correct: from problem identification through to maintenance."],
      ["The time a computer takes to start up and load its operating system", "That is the boot process."],
      ["The number of years a computer lasts before it must be replaced", "That is the hardware's lifespan."],
      ["The steps the processor takes to fetch and execute an instruction", "That is the fetch-execute cycle."],
    ],
    answer: "A",
    explanation: "The SDLC is the ordered set of stages used to develop or replace an information system.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which fact-finding method involves the analyst **watching** staff using the current system?",
    options: [
      ["Observation", "Correct: the analyst watches the system in use."],
      ["Questionnaire", "A questionnaire collects written answers."],
      ["Interview", "An interview is a conversation."],
      ["Record inspection", "Record inspection examines documents."],
    ],
    answer: "A",
    explanation: "Observation means watching the current system being used.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which stage of the SDLC are users trained and the old system replaced by the new one?",
    options: [
      ["Implementation", "Correct: installation, data conversion, training and changeover happen here."],
      ["Analysis", "Analysis studies the current system and requirements."],
      ["Design", "Design plans inputs, outputs, files and processes."],
      ["Feasibility study", "This decides whether the project is worthwhile."],
    ],
    answer: "A",
    explanation: "Implementation includes installing the system, converting data, training users and changing over.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An analyst needs the views of 1,500 customers spread across Zimbabwe. Which fact-finding method is most suitable?",
    options: [
      ["Questionnaire", "Correct: it reaches many people cheaply and quickly."],
      ["Interview", "Interviewing 1,500 people would take far too long."],
      ["Observation", "Observation shows actions, not customers' views."],
      ["Record inspection", "Documents do not hold customers' opinions."],
    ],
    answer: "A",
    explanation: "Questionnaires suit large, spread-out groups.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of an interview over a questionnaire?",
    options: [
      ["The analyst can ask follow-up questions to get more detail", "Correct: interviews are flexible and detailed."],
      ["Many people can be asked in a short time", "This is an advantage of a questionnaire."],
      ["The answers can be completely anonymous, so people answer more honestly", "Interviews are face to face, so they are not anonymous."],
      ["It costs less of the analyst's working time", "Interviews take more of the analyst's time."],
    ],
    answer: "A",
    explanation: "Interviews allow questions to be explained and followed up, giving detailed answers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which method shows the actual fields and volumes of data?"],
    stem: "An analyst wants to know which fields appear on a clinic's patient admission card and how many cards are completed each week. Which method should she use?",
    options: [
      ["Record inspection", "Correct: examining the cards shows the fields and the volume."],
      ["Questionnaire", "Staff opinions will not reliably give the fields and numbers."],
      ["Interview", "An interview gives views, not the actual document layout."],
      ["Observation", "Watching staff for a day may not show weekly volumes."],
    ],
    answer: "A",
    explanation: "Record inspection gives the actual data, fields and volumes used by the current system.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What happens when people know they are watched?"],
    stem: "Which is a **disadvantage** of observation as a fact-finding method?",
    options: [
      ["Staff may work differently because they know they are being watched", "Correct: behaviour can change under observation."],
      ["It cannot show how long each task actually takes", "Observation is good at showing timings."],
      ["Only written answers to set questions are collected", "That describes a questionnaire."],
      ["Documents that the analyst reads may be out of date or incomplete", "That is a disadvantage of record inspection."],
    ],
    answer: "A",
    explanation: "When staff know they are observed they may follow procedures more carefully than usual, so the analyst may not see the real system.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which stage decides whether to go ahead at all?"],
    stem: "A school asks whether it can afford a new library system, whether its staff could use it and whether suitable hardware exists. Which stage of the SDLC is this?",
    options: [
      ["Feasibility study", "Correct: it decides whether the project is possible and worthwhile."],
      ["Analysis", "Analysis studies the current system in detail after the go-ahead."],
      ["Evaluation", "Evaluation reviews the system after it is in use."],
      ["Design", "Design plans the new system's inputs, outputs and files."],
    ],
    answer: "A",
    explanation: "Questions of cost, technical possibility and users' ability are technical, economic and operational feasibility.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Questionnaires allow the analyst to ask follow-up questions when an answer is unclear.",
    answer: false,
    explanation: "False. Once a questionnaire is handed out, unclear answers cannot be followed up. Interviews allow follow-up questions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The SDLC is called a cycle because evaluation and maintenance can reveal new problems that start the process again.",
    answer: true,
    explanation: "True. As needs change, a system eventually needs replacing and the cycle restarts.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each activity to the SDLC stage in which it takes place.",
    pairs: [
      ["Data flow diagrams of the current system are drawn", "Analysis"],
      ["Input screens and report layouts are planned", "Design"],
      ["The program is tested with normal, abnormal and extreme data", "Development and testing"],
      ["Users are asked whether the system meets its objectives", "Evaluation"],
    ],
    explanation: "DFDs: analysis. Screen and report layouts: design. Testing: development and testing. Checking objectives: evaluation.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Many people → questionnaire; actual data → records; what really happens → observation."],
    stem: "Match each situation to the most suitable fact-finding method.",
    pairs: [
      ["Getting the detailed requirements of the managing director", "Interview"],
      ["Finding out what 800 learners think of the tuck shop", "Questionnaire"],
      ["Checking whether clerks really follow the official procedure", "Observation"],
      ["Finding the fields used on existing invoices", "Record inspection"],
    ],
    explanation: "Detail from one key person: interview. Many people: questionnaire. Real behaviour: observation. Existing data: record inspection.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["The cycle begins with the problem and ends with keeping the system running."],
    stem: "Complete the order of the SDLC stages.",
    template: `1 ${STAGES[0]}, 2 {{blank:a}}, 3 ${STAGES[2]}, 4 {{blank:b}}, 5 ${STAGES[4]}, 6 {{blank:c}}, 7 ${STAGES[6]}, 8 ${STAGES[7]}`,
    blanks: [
      { id: "a", accepted: [STAGES[1]], choices: [STAGES[1], STAGES[3], STAGES[5], "Coding"] },
      { id: "b", accepted: [STAGES[3]], choices: [STAGES[1], STAGES[3], STAGES[5], "Coding"] },
      { id: "c", accepted: [STAGES[5]], choices: [STAGES[1], STAGES[3], STAGES[5], "Coding"] },
    ],
    explanation: `In order: ${STAGES.join(", ")} (documentation is produced throughout).`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the job title of the person who studies an existing system and designs a new one.",
    accepted: ["systems analyst", "system analyst", "analyst", "a systems analyst"],
    wrong: ["programmer"],
    explanation: "A systems analyst investigates the current system and designs the new one.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["What does the analyst write in the first short report?"],
    stem: "Describe what happens during the problem identification (preliminary investigation) stage.",
    points: [
      "The problems with the current system are identified / defined",
      "The objectives of the new system are set",
      "The scope is agreed / a short report decides whether a full feasibility study is worthwhile",
    ],
    explanation: "The preliminary investigation defines the problem, sets objectives and scope, and reports whether to continue.",
    modelAnswer: "The analyst briefly studies the current system to find out what is going wrong, sets the objectives the new system must meet, agrees what is in and out of scope, and reports whether a full feasibility study should go ahead.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["One advantage and one disadvantage of each method."],
    stem: "Compare interviews and questionnaires as methods of fact-finding. Give **one** advantage and **one** disadvantage of each.",
    points: [
      "Interview advantage: detailed answers / follow-up questions / body language",
      "Interview disadvantage: time-consuming / few people / not anonymous / expensive",
      "Questionnaire advantage: many people quickly and cheaply / anonymous / easy to analyse",
      "Questionnaire disadvantage: low return rate / cannot follow up / misunderstood questions",
    ],
    explanation: "Interviews give depth from a few people; questionnaires give breadth from many.",
    modelAnswer: "An interview lets the analyst ask follow-up questions for detail, but it takes a long time so only a few people can be interviewed. A questionnaire reaches many people quickly and cheaply, but questions cannot be explained and many forms may not be returned.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Think about how many people and what you need to know.", "The cycle starts with the problem."],
    stem: "Mutare Valley Clinic (fictional) records patient visits on paper cards. Cards are often lost and patients wait a long time. The clinic has 12 staff and about 4,000 registered patients. Nyasha, a systems analyst, is asked to investigate.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which SDLC stage is Nyasha starting?",
        options: [["Problem identification", "Correct: she is investigating what is wrong."], ["Implementation", "That is when the new system is installed."], ["Maintenance", "That follows implementation."], ["Design", "Design comes after analysis."]],
        answer: "A", explanation: "Investigating the problems is the first stage.",
      }),
      P.match({
        label: "(b)", stem: "Match each group to the most suitable fact-finding method.",
        pairs: ["The clinic's manager", "The 4,000 patients", "The paper cards"],
        right: ["Interview", "Questionnaire", "Record inspection", "Observation"],
        rightIndex: [0, 1, 2],
        explanation: "One key person: interview. Many patients: questionnaire. Existing cards: record inspection.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Nyasha also decides to observe the reception desk. Give **one** advantage and **one** disadvantage of this.",
        points: ["Advantage: sees what really happens / where delays occur, first-hand", "Disadvantage: staff may behave differently when watched / time-consuming / problems may not occur that day"],
        modelAnswer: "She can see for herself where patients wait and why cards go missing, but the receptionists may work more carefully than usual while being watched.",
      }),
    ],
    explanation: "(a) Problem identification. (b) Interview, questionnaire, record inspection.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Each stage has its own activities.", "Justify the method with the size of the group."],
    stem: "A school in Bulawayo is replacing its manual fees system with a computerised one.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each activity to its SDLC stage.",
        pairs: ["The bursar is trained to use the new system", "The fees screen layout is planned", "Errors found after six months are corrected"],
        right: ["Implementation", "Design", "Maintenance", "Analysis"],
        rightIndex: [0, 1, 2],
        explanation: "Training: implementation. Screen layout: design. Fixing errors later: maintenance.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "The analyst wants the views of all 900 parents. Recommend a fact-finding method and justify your choice.",
        points: ["Questionnaire", "Justification: many parents can be reached quickly and cheaply / they can answer in their own time / anonymity"],
        modelAnswer: "A questionnaire, because 900 parents are too many to interview and a questionnaire can reach them all quickly and cheaply, letting them answer at home.",
      }),
    ],
    explanation: "(a) Implementation, design, maintenance.",
  });

  b.card("DEFINITION", "Systems development life cycle", "The ordered stages for developing a new information system, from problem identification to maintenance.");
  b.card("FACT", "SDLC stages in order", "Problem identification, feasibility study, analysis, design, development and testing, implementation, (documentation), evaluation, maintenance.");
  b.card("DEFINITION", "Systems analyst", "Studies the existing system, finds problems and requirements, and designs and oversees the new system.");
  b.card("CONCEPT", "Preliminary investigation", "Defines the problem, sets the objectives and scope of the new system, and reports whether to do a feasibility study.");
  b.card("CONCEPT", "Questionnaire", "+ many people, cheap, anonymous, easy to analyse. − low return, no follow-up, questions may be misunderstood.");
  b.card("CONCEPT", "Interview", "+ detailed, follow-up questions, body language. − time-consuming, few people, not anonymous, may hear what the analyst wants.");
  b.card("CONCEPT", "Record inspection", "+ real data, fields, volumes; facts not opinions. − documents may be out of date or confidential; time-consuming.");
  b.card("CONCEPT", "Observation", "+ shows what really happens, first-hand. − people act differently when watched; time-consuming; no opinions.");
  b.card("FACT", "Choosing a method", "Many people → questionnaire; detail from a few → interview; actual data → record inspection; real procedures → observation.");
});
