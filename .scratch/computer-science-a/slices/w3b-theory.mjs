// W3b exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on databases and software development.
import { concept, P, EXAM, checkExam, CAM, ZIM, chk, same, sql, mdTable } from "../lib.mjs";
import { pm } from "../tables/w3b-q.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;

concept(C("db.normalisation"), { file: "exam/w3b-theory", keyPrefix: "exam.w3b-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Normalisation to 2NF (both)
  {
    const cols = ["TraineeID", "CourseCode", "TraineeName", "CourseTitle", "Fee", "DateEntered"];
    const rows = [
      ["T11", "WD", "Tatenda Moyo", "Welding", 120, "2026-02-03"],
      ["T11", "EL", "Tatenda Moyo", "Electrical", 150, "2026-02-10"],
      ["T12", "WD", "Rudo Chuma", "Welding", 120, "2026-02-12"],
      ["T13", "PL", "Farai Dube", "Plumbing", 130, "2026-02-17"],
    ];
    // check the dependencies stated in the answer key
    const holds = (det, dep) => {
      const di = det.map((c) => cols.indexOf(c));
      const pi = dep.map((c) => cols.indexOf(c));
      const m = new Map();
      for (const r of rows) {
        const k = JSON.stringify(di.map((i) => r[i]));
        const v = JSON.stringify(pi.map((i) => r[i]));
        if (m.has(k) && m.get(k) !== v) return false;
        m.set(k, v);
      }
      return true;
    };
    same(holds(["TraineeID"], ["TraineeName"]), true);
    same(holds(["CourseCode"], ["CourseTitle", "Fee"]), true);
    same(holds(["TraineeID"], ["DateEntered"]), false);
    same(holds(["CourseCode"], ["DateEntered"]), false);
    same(holds(["TraineeID", "CourseCode"], ["DateEntered"]), true);
    const table = mdTable(cols.map((c) => c), rows.map((r) => [r[0], r[1], r[2], r[3], Number(r[4]).toFixed(2), r[5]]));
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("db.normalisation")],
      stem: `A training college in Mutare stores course entries in one table. A trainee may enter several courses, and a course has many trainees. Each course has one title and one fee. The primary key is the combination of \`TraineeID\` and \`CourseCode\`.\n\n${table}`,
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "How many fields make up the primary key of the table?", ["Two", "Correct: TraineeID and CourseCode together."], [["One", "No single field is unique."], ["Three", "Only two fields are needed to identify each record."], ["Six", "A key does not need to include every field."]], "The key is the pair (TraineeID, CourseCode).", 1),
        P.mcq({ label: "(b)", marks: 2, multiple: true, stem: "Select the three attributes that depend on only part of the primary key.", options: [["TraineeName", "Correct: depends on TraineeID alone."], ["CourseTitle", "Correct: depends on CourseCode alone."], ["Fee", "Correct: depends on CourseCode alone."], ["DateEntered", "DateEntered depends on both fields: when this trainee entered this course."], ["TraineeID", "TraineeID is part of the primary key."], ["CourseCode", "CourseCode is part of the primary key."]], answer: ["A", "B", "C"], explanation: "TraineeName, CourseTitle and Fee are partially dependent; DateEntered depends on the whole key." }),
        P.short({ label: "(c)", marks: 1, stem: "State the highest normal form that the table is in. Give your answer as 1NF, 2NF or 3NF.", accepted: ["1NF", "first normal form", "1"], explanation: "The table is in 1NF but has partial dependencies, so it is not in 2NF." }),
        pm("(d)", "The fee for a new course cannot be stored until a trainee has entered it. What type of anomaly is this?", ["Insertion anomaly", "Correct."], [["Deletion anomaly", "No record is being deleted."], ["Update anomaly", "No existing value is being changed."], ["Referential anomaly", "This is not a standard anomaly."]], "A fact cannot be stored without another: an insertion anomaly.", 1),
        P.manual({ label: "(e)", marks: 3, stem: "Write the tables that put the data into second normal form, marking the primary keys.", points: ["Trainee(TraineeID, TraineeName) with TraineeID as the primary key", "Course(CourseCode, CourseTitle, Fee) with CourseCode as the primary key", "Entry(TraineeID, CourseCode, DateEntered) with the composite primary key (TraineeID, CourseCode)"], modelAnswer: "Trainee(TraineeID, TraineeName); Course(CourseCode, CourseTitle, Fee); Entry(TraineeID, CourseCode, DateEntered) with the primary key (TraineeID, CourseCode).", explanation: "Each partially dependent attribute moves to a table keyed on its determinant." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two benefits of storing the data in the three tables instead of the single table.", points: ["Each course title and fee, and each trainee's name, is stored once, so there is less redundancy", "A fee is changed in one place only, so the data stays consistent (or a course can be stored before anyone enters it)"], modelAnswer: "Each title, fee and name is stored once, so there is less redundancy, and a fee is changed in one place only so the data stays consistent.", explanation: "Less redundancy and no anomalies." }),
      ]),
      hints: ["Which fields identify one record?", "Does the attribute depend on both parts of the key, or on one part?"],
      explanation: "The key is the pair (TraineeID, CourseCode); TraineeName, CourseTitle and Fee are partial dependencies; the table is in 1NF.",
    });
  }
  // ------------------------------------------------------------------ 2. SQL on two tables (both)
  {
    const setup = `
CREATE TABLE Patient (PatientID CHARACTER(3) PRIMARY KEY, Surname VARCHAR(20), Town VARCHAR(15));
CREATE TABLE Visit (VisitID INTEGER PRIMARY KEY, PatientID CHARACTER(3), Reason VARCHAR(12), Cost INTEGER, FOREIGN KEY (PatientID) REFERENCES Patient(PatientID));
INSERT INTO Patient VALUES ('P01','Moyo','Gweru'),('P02','Ncube','Kwekwe'),('P03','Banda','Gweru'),('P04','Chuma','Kadoma');
INSERT INTO Visit VALUES (1,'P01','Check-up',15),(2,'P02','Injury',40),(3,'P01','Injury',35),(4,'P03','Check-up',15),(5,'P04','Fever',25),(6,'P02','Check-up',15),(7,'P03','Fever',25);
`;
    const patientMd = sql(setup, "SELECT * FROM Patient").md;
    const visitMd = sql(setup, "SELECT * FROM Visit").md;
    const cnt = sql(setup, "SELECT COUNT(*) FROM Visit WHERE Cost > 20").rows[0][0];
    chk(cnt, 4);
    const grp = sql(setup, "SELECT Reason, SUM(Cost) FROM Visit GROUP BY Reason ORDER BY Reason");
    same(grp.rows, [["Check-up", 45], ["Fever", 50], ["Injury", 75]]);
    const model = "SELECT Patient.Surname, Visit.Reason\nFROM Patient\nINNER JOIN Visit ON Patient.PatientID = Visit.PatientID\nWHERE Patient.Town = 'Gweru'\nORDER BY Patient.Surname;";
    const mr = sql(setup, model);
    same(mr.rows, [["Banda", "Check-up"], ["Banda", "Fever"], ["Moyo", "Check-up"], ["Moyo", "Injury"]]);
    const upd = "UPDATE Visit\nSET Cost = 20\nWHERE Reason = 'Check-up';";
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("db.sql-dml")],
      stem: `A clinic stores its data in two tables. \`PatientID\` in \`Visit\` is a foreign key to \`Patient\`.\n\n**Patient**\n\n${patientMd}\n\n**Visit**\n\n${visitMd}`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the number returned by:\n\n```\nSELECT COUNT(*)\nFROM Visit\nWHERE Cost > 20;\n```", value: cnt, wrong: [3, 7], explanation: "The visits costing more than 20 are visits 2, 3, 5 and 7: four.", workedSolution: "1. " + ("The visits costing more than 20 are visits 2, 3, 5 and 7: four.") }),
        P.fib({ label: "(b)", marks: 3, stem: "Complete the result of the query:\n\n```\nSELECT Reason, SUM(Cost)\nFROM Visit\nGROUP BY Reason\nORDER BY Reason;\n```", template: "Check-up: {{blank:a}}\n\nFever: {{blank:b}}\n\nInjury: {{blank:c}}", blanks: grp.rows.map((r, i) => ({ id: "abc"[i], input: "number", accepted: [String(r[1])], wrong: "0" })), explanation: "Check-up 15 + 15 + 15 = 45; Fever 25 + 25 = 50; Injury 40 + 35 = 75." }),
        P.short({ label: "(c)", marks: 1, stem: "Name the SQL clause in the query in part (b) that puts the result in alphabetical order of reason.", accepted: ["ORDER BY", "order by"], explanation: "ORDER BY sorts the result." }),
        P.manual({ label: "(d)", marks: 3, stem: "Write an SQL query that shows the surname and the reason of every visit by a patient from Gweru, in alphabetical order of surname. Use both tables.", points: ["SELECT Patient.Surname, Visit.Reason FROM Patient", "INNER JOIN Visit ON Patient.PatientID = Visit.PatientID", "WHERE Patient.Town = 'Gweru' and ORDER BY Patient.Surname"], modelAnswer: `\n\`\`\`\n${model}\n\`\`\``, explanation: "Join, filter, sort." }),
        P.manual({ label: "(e)", marks: 2, stem: "The cost of every check-up is changed to 20. Write the SQL statement to make this change.", points: ["UPDATE Visit SET Cost = 20", "WHERE Reason = 'Check-up'"], modelAnswer: `\n\`\`\`\n${upd}\n\`\`\``, explanation: "UPDATE ... SET ... WHERE." }),
      ]),
      hints: ["Select the matching visits first, then count or add.", "A join links the foreign key to the primary key."],
      explanation: "Four visits cost more than 20; the totals by reason are 45, 50 and 75.",
    });
  }
  // ------------------------------------------------------------------ 3. Life cycles and testing (both)
  {
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("sdlc.life-cycles"), C("sdlc.testing-maintenance")],
      stem: "A school in Gweru wants a program to record the results of inter-school sports matches. The sports master is not sure what the program should show, but he will try a new version every week. The program accepts the number of players in a team, which must be a whole number from 5 to 11 inclusive.",
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which life cycle model is the most suitable for this project?", ["Iterative", "Correct: a working version is improved each week using the sports master's feedback."], [["Waterfall", "The requirements are not known at the start."], ["No model", "Every project benefits from a model."], ["Maintenance", "Maintenance is a stage, not a model."]], "Unclear requirements and frequent feedback suit an iterative approach.", 1),
        P.manual({ label: "(b)", marks: 2, stem: "Give two reasons for your answer to part (a).", points: ["The requirements are unclear, so each version can be changed after the sports master has tried it", "He can try a version every week, so feedback is frequent"], modelAnswer: "The requirements are unclear so each version can be changed after he has tried it, and he can try a version every week so feedback is frequent.", explanation: "Link to the scenario." }),
        P.fib({ label: "(c)", marks: 3, stem: "The rule for the number of players is 5 to 11 inclusive. State the type of test data for each value.", template: "8 players: {{blank:a}}\n\n11 players: {{blank:b}}\n\n12 players: {{blank:c}}", blanks: [{ id: "a", accepted: ["Normal"], choices: ["Normal", "Extreme", "Abnormal"] }, { id: "b", accepted: ["Extreme"], choices: ["Normal", "Extreme", "Abnormal"] }, { id: "c", accepted: ["Abnormal"], choices: ["Normal", "Extreme", "Abnormal"] }], explanation: "8 is a typical valid value, 11 is at the limit and 12 is outside the range." }),
        pm("(d)", "The program runs but adds up the players of the two teams wrongly. What type of error is this?", ["Logic error", "Correct: the algorithm is wrong."], [["Syntax error", "A syntax error stops the program starting."], ["Run-time error", "The program does not stop."], ["Hardware error", "Nothing suggests a hardware fault."]], "A wrong result without a message is a logic error.", 1),
        pm("(e)", "The sports master tries the nearly finished program in his own office for a week and reports faults. What type of testing is this?", ["Beta testing", "Correct: a real user tests it in his own setting."], [["Stub testing", "Stub testing uses stand-ins for modules."], ["White-box testing", "White-box tests are chosen from the code."], ["Integration testing", "Integration testing joins the modules."]], "Real users testing in their own setting is beta testing.", 1),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why 5 and 11 should be used as test values.", points: ["They are the boundary values of the range, where mistakes such as writing < instead of <= are most likely", "They show that the limits are correctly accepted"], modelAnswer: "They are the boundary values, where mistakes such as writing < instead of <= are most likely, and they show that the limits are correctly accepted.", explanation: "Boundary values catch comparison errors." }),
      ]),
      hints: ["Are the requirements clear?", "A value at the edge of the valid range is extreme data."],
      explanation: "Iterative model; 8 normal, 11 extreme, 12 abnormal; logic error; beta testing.",
    });
  }
  // ------------------------------------------------------------------ 4. ZIMSEC systems-development case (ZIM)
  {
    const cost = 4800;
    const saving = 400;
    chk(cost / saving, 12);
    b.struct({
      ...TH10, d: 4, paper: "ZIMSEC Paper 1", applies: ZIM,
      concepts: [C("sdlc.fact-finding-feasibility"), C("sdlc.analysis-design-documentation")],
      stem: `A bus company in Mutare keeps its bookings in a paper register. It wants a computer booking system that will cost US\\$${cost} to set up and will save US\\$${saving} a month in clerks' time.`,
      parts: checkExam(EXAM.THEORY10, [
        P.match({ label: "(a)", marks: 3, stem: "Match each type of feasibility to the question the analyst asks.", pairs: [["Economic", "Do the savings outweigh the cost of the system?"], ["Legal", "Does the system keep the law on personal data?"], ["Operational", "Will the booking clerks accept and use the system?"]], extraRight: ["Can the system be finished in the time allowed?"], explanation: "Economic: cost and benefit; legal: the law; operational: acceptance by the users." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the payback period, in months.", value: cost / saving, wrong: [10, 19200], workedSolution: `${cost} ÷ ${saving} = ${cost / saving}.`, explanation: `${cost} ÷ ${saving} = ${cost / saving} months.` }),
        P.manual({ label: "(c)", marks: 2, stem: "The analyst gives a questionnaire to 200 regular passengers. State one advantage and one disadvantage of using a questionnaire.", points: ["Advantage: many people can be asked cheaply and the answers are easy to compare", "Disadvantage: many are not returned and the answers give little detail"], modelAnswer: "Many people can be asked cheaply and the answers are easy to compare, but many questionnaires are not returned and the answers give little detail.", explanation: "One advantage and one disadvantage." }),
        P.mcq({ label: "(d)", marks: 1, stem: "The company's income depends on bookings. Which changeover method is the safest?", options: [["Parallel running", "Correct: the paper register is a back-up."], ["Direct changeover", "No back-up if the new system fails."], ["No changeover", "The old system is being replaced."], ["Direct changeover with no training", "Neither safe nor sensible."]], answer: "A", explanation: "Parallel running keeps the old system as a back-up." }),
        P.manual({ label: "(e)", marks: 2, stem: "Distinguish between technical documentation and user documentation.", points: ["Technical documentation is for programmers and administrators and describes the design, files and programs so the system can be maintained", "User documentation is for the booking clerks and explains how to use the system"], modelAnswer: "Technical documentation is for the programmers and administrators and describes the design, files and programs so the system can be maintained. User documentation is for the clerks and explains how to use the system.", explanation: "Audience and contents." }),
      ]),
      hints: ["Payback = cost ÷ monthly saving.", "Think about the audience of each kind of documentation."],
      explanation: "Payback 12 months; parallel running is the safest changeover.",
    });
  }

  // ================================================================== THEORY5
  // ------------------------------------------------------------------ 5. DBMS features (both)
  b.struct({
    ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
    concepts: [C("db.dbms")],
    stem: "A school stores its records in a database managed by a database management system (DBMS).",
    parts: checkExam(EXAM.THEORY5, [
      P.match({ label: "(a)", marks: 3, stem: "Match each feature of a DBMS to its purpose.", pairs: [["Data dictionary", "Stores the names, types and rules of the fields"], ["Access rights", "Control which users may read or change which tables"], ["Backup", "Makes a copy so that lost data can be restored"]], extraRight: ["Carries out the instructions of a program"], explanation: "Each feature has its own role." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how access rights help to keep the learners' records secure.", points: ["Each user or group is given only the access they need, such as read only or read and write", "A teacher can see marks but not fees, so users cannot see or change data that is not theirs"], modelAnswer: "Each user or group is given only the access they need, so a teacher can see marks but not fees, and users cannot see or change data that is not theirs.", explanation: "Least access needed." }),
    ]),
    hints: ["Which feature describes the data? Which controls users?"],
    explanation: "Data dictionary, access rights and backup; access rights limit what each group can do.",
  });
  // ------------------------------------------------------------------ 6. Keys and relationships (both)
  b.struct({
    ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
    concepts: [C("db.relational-concepts"), C("db.er-diagrams")],
    stem: "A secondary school database has two tables.\n\n`Form(FormID, FormTeacher, Room)`\n\n`Learner(LearnerID, Surname, FormID)`\n\nEach learner is in one form and a form has many learners.",
    parts: checkExam(EXAM.THEORY5, [
      P.short({ label: "(a)", marks: 1, stem: "State the primary key of the `Form` table.", accepted: ["FormID"], explanation: "FormID identifies each form." }),
      P.short({ label: "(b)", marks: 1, stem: "State the foreign key in the `Learner` table.", accepted: ["FormID"], explanation: "FormID in Learner refers to Form." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the relationship between `Form` and `Learner`.", accepted: ["one-to-many", "one to many", "1:m", "1:many"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "One form, many learners." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain what referential integrity means for these two tables.", points: ["Every FormID in Learner must match an existing FormID in Form", "The DBMS refuses to add a learner in a form that does not exist (or to delete a form that still has learners)"], modelAnswer: "Every FormID in Learner must match an existing FormID in Form, so the DBMS refuses to add a learner in a form that does not exist or to delete a form that still has learners.", explanation: "Valid links between the tables." }),
    ]),
    hints: ["Which table is on the many side?"],
    explanation: "FormID is the primary key of Form and the foreign key in Learner; the relationship is one-to-many.",
  });
  // ------------------------------------------------------------------ 7. Maintenance types (CAM)
  b.struct({
    ...TH5, d: 2, paper: "Cambridge Paper 1", applies: CAM,
    concepts: [C("sdlc.testing-maintenance")],
    stem: "A payroll program has been used by a company in Harare for two years and now needs changes.",
    parts: checkExam(EXAM.THEORY5, [
      P.match({ label: "(a)", marks: 3, stem: "Match each change to the type of maintenance.", pairs: [["A total is wrong when an employee has no overtime", "Corrective"], ["The tax rates are changed by law", "Adaptive"], ["The payslip report is changed to print faster and show a new column", "Perfective"]], explanation: "Corrective fixes a fault, adaptive responds to a change and perfective improves." }),
      P.manual({ label: "(b)", marks: 2, stem: "After a change has been made to the program, the programmer repeats the earlier tests. Explain why.", points: ["To check that the change has not stopped any other part of the program from working", "To make sure the original faults and features still behave as expected (regression testing)"], modelAnswer: "To check that the change has not stopped any other part of the program from working, so that earlier features still behave as expected.", explanation: "Regression testing." }),
    ]),
    hints: ["Why is each change needed?"],
    explanation: "Corrective, adaptive and perfective; earlier tests are repeated to check nothing else broke.",
  });
});
