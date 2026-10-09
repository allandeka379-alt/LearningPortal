// Slice w4c: database security (comp.db.security, ZIMSEC only). View outputs are computed in SQLite.
import { concept, P } from "../lib.mjs";
import { table, fence } from "./w4c-0-kit.mjs";

// Q: view that hides fields (clinic patients).
const clinic = table("Patients", [["PatientID", "TEXT"], ["PatientName", "TEXT"], ["Village", "TEXT"], ["Diagnosis", "TEXT"], ["NextVisit", "TEXT"]], [
  ["PA-1", "Tafadzwa", "Murewa", "Asthma", "12 May"],
  ["PA-2", "Rumbidzai", "Mutoko", "Diabetes", "3 June"],
  ["PA-3", "Kundai", "Murewa", "Malaria", "28 May"],
]);
const viewOpts = [
  "CREATE VIEW Reception AS SELECT PatientName, Village, NextVisit FROM Patients;",
  "CREATE VIEW Reception AS SELECT PatientName, Diagnosis, NextVisit FROM Patients;",
  "CREATE VIEW Reception AS SELECT * FROM Patients WHERE Village = 'Murewa';",
  "CREATE VIEW Reception AS SELECT PatientID, Diagnosis FROM Patients;",
];
const showsDiagnosis = viewOpts.map((v) => {
  const t = table("Patients", clinic.columns, clinic.rows);
  t.run(v);
  return t.result("SELECT * FROM Reception").head.includes("Diagnosis");
});
if (showsDiagnosis.join() !== "false,true,true,true") throw new Error(`views ${showsDiagnosis}`);

// Q: records shown by a view with WHERE (sales staff).
const sales = table("Sales", [["SaleID", "TEXT"], ["Branch", "TEXT"], ["Agent", "TEXT"], ["Amount", "INTEGER"]], [
  ["SL-A", "Gweru", "Thandeka", 160],
  ["SL-B", "Harare", "Tendai", 95],
  ["SL-C", "Gweru", "Sipho", 240],
  ["SL-D", "Gweru", "Thandeka", 85],
  ["SL-E", "Mutare", "Rudo", 130],
]);
const viewG = "CREATE VIEW GweruSales AS\nSELECT SaleID, Agent, Amount\nFROM Sales\nWHERE Branch = 'Gweru';";
sales.run(viewG);
const gweruRows = sales.value("SELECT COUNT(*) FROM GweruSales");
const gweruCols = sales.result("SELECT * FROM GweruSales").head.length;

// Q: backups needed to restore.
const week = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const failDay = "Tuesday";
const restoreSet = week.slice(0, week.indexOf(failDay)); // full (Friday night) + incrementals Sat, Sun, Mon nights
const restoreCount = restoreSet.length;

// Practice struct 8 marks: differential? keep to full + incremental.
const days2 = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const failDay2 = "Thursday"; // full Monday night, incrementals Tue and Wed nights, failure Thursday
const restore2 = days2.slice(0, days2.indexOf(failDay2)).length;

concept("comp.db.security", { file: "db/security", keyPrefix: "db.security" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **audit trail** in a database?",
    options: [
      ["A log of who accessed or changed data, what changed and when", "Correct: it records actions automatically."],
      ["A copy of the database kept at another site", "That is an off-site backup."],
      ["A list of the tables and fields that each user is allowed to open", "That describes access rights."],
      ["A method of scrambling data so it cannot be read", "That is encryption."],
    ],
    answer: "A",
    explanation: "An audit trail records each login and change (user, time, record, old and new values), so misuse can be traced and undone.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In database security, what is a **view**?",
    options: [
      ["A saved query showing users only chosen fields and records", "Correct: the rest of the table is hidden from them."],
      ["A printed report of every record in a table", "Reports present data; they are not a security control."],
      ["A second copy of a table kept in case of loss", "That is a backup."],
      ["The login screen on which a user types a username and password", "That is the login screen."],
    ],
    answer: "A",
    explanation: "Users given a view instead of the table can see only what the view selects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each security measure to the problem it mainly deals with.",
    pairs: [
      ["Usernames and passwords", "An outsider trying to log in to the database"],
      ["Access rights", "A teacher who could change fees records"],
      ["Encryption", "A laptop holding the database being stolen"],
      ["Off-site backup", "A fire destroying the school office server"],
      ["Audit trail", "Finding out who changed a learner's mark"],
    ],
    explanation: "Passwords stop unauthorised logins; access rights limit what logged-in users can do; encryption makes stolen data unreadable; off-site backups allow recovery after a disaster; audit trails trace changes.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A school's database administrator gives the sports master read-only access to the Learners table and no access to the Fees table. Which principle is she following?",
    options: [
      ["Least privilege: only the rights the job needs", "Correct: users get no more access than their role requires."],
      ["Encryption: data is scrambled for some users", "No data is scrambled here."],
      ["Validation: only sensible data is accepted", "Validation checks data on entry, not who may see it."],
      ["Backup: data is copied in case it is lost", "No copy is being made."],
    ],
    answer: "A",
    explanation: "Least privilege limits each user to the access needed for their role, which reduces both mistakes and misuse.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Making regular backups prevents data in a database from being lost or damaged.",
    answer: false,
    explanation: "False. A backup does not stop loss or damage; it allows the data to be restored afterwards.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A user's password decides which tables that user is allowed to edit.",
    answer: false,
    explanation: "False. The password checks who the user is (authentication). Access rights decide what that user may do.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A field officer in Masvingo carries a laptop holding a copy of a farmers' database. Which measure best protects the data if the laptop is stolen?",
    options: [
      ["Encrypting the database file on the laptop", "Correct: without the key the stolen data cannot be read."],
      ["Making an audit trail of the officer's changes", "An audit trail would not stop a thief reading the file."],
      ["Giving the officer read-only access rights", "A thief can copy the file regardless of database rights."],
      ["Making a backup of the database every night", "A backup helps recovery but does not stop the thief reading the data."],
    ],
    answer: "A",
    explanation: "Encryption at rest makes a stolen file unreadable without the decryption key.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which option leaves Diagnosis out of the SELECT list?"],
    stem: `A clinic's \`Patients\` table is shown below. Receptionists must see names, villages and visit dates, but **not** diagnoses.\n\n${clinic.md}\n\nWhich statement creates a suitable view?`,
    options: viewOpts.map((v, i) => [`\`${v}\``, !showsDiagnosis[i] ? "Correct: Diagnosis is not selected, so receptionists never see it." : i === 2 ? "SELECT * shows every field, including Diagnosis." : "Diagnosis is in the SELECT list, so it would be shown."]),
    answer: "A",
    explanation: "A view shows only the fields listed after SELECT. Leaving Diagnosis out hides it, while names, villages and visit dates remain available.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Count the records that pass the WHERE condition.", "Count the fields after SELECT."],
    stem: `A company stores sales in this table.\n\n${sales.md}\n\nThe Gweru branch manager is given only this view:\n\n${fence(viewG)}\n\nComplete the sentence.`,
    template: "The manager sees {{blank:r}} records, each with {{blank:c}} fields.",
    blanks: [
      { id: "r", accepted: [String(gweruRows)], input: "number", wrong: "5" },
      { id: "c", accepted: [String(gweruCols)], input: "number", wrong: "4" },
    ],
    explanation: `Only the ${gweruRows} Gweru sales pass the WHERE clause, and only SaleID, Agent and Amount are selected (${gweruCols} fields). The Branch field and other branches' sales are hidden.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Start from the full backup, then apply every incremental made after it, in order."],
    stem: `A shop makes a full backup of its database every Friday night and an incremental backup every other night. The server fails on ${failDay} afternoon. How many backups must be restored to recover the data up to the last backup?`,
    value: restoreCount,
    wrong: [2],
    explanation: `Restore Friday's full backup, then the incrementals from ${restoreSet.slice(1).join(", ")} nights: ${restoreCount} backups.`,
    workedSolution: `1. Full backup: Friday night.\n2. Incrementals made since: ${restoreSet.slice(1).join(", ")} nights (${restoreCount - 1}).\n3. Total ${restoreCount}.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What does each type copy?"],
    stem: "How does an incremental backup differ from a full backup?",
    options: [
      ["It copies only the data changed since the previous backup", "Correct: so it is smaller and quicker to make."],
      ["It copies the whole database, including unchanged data", "That is a full backup."],
      ["It encrypts the data instead of copying it", "Encryption is separate from the type of backup."],
      ["It is always stored on the same disk as the database", "Backups should be stored separately, preferably off-site."],
    ],
    answer: "A",
    explanation: "Incremental backups hold only changes, so restoring needs the last full backup plus every incremental since, in order.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["What could destroy both the server and a backup kept beside it?"],
    stem: "Why should at least one backup of a school database be kept off-site or in cloud storage?",
    options: [
      ["A fire, flood or theft at the school could destroy the server and nearby copies together", "Correct: a copy elsewhere survives."],
      ["Off-site copies are always made faster than copies saved to the school's own drives and servers", "Speed is not the reason; distance from the risk is."],
      ["The law requires all school data to be stored outside the country", "There is no such general requirement."],
      ["A backup kept on site cannot be encrypted", "On-site backups can be encrypted too."],
    ],
    answer: "A",
    explanation: "An off-site copy protects against disasters that affect the whole building.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "A school sets access rights by role. Choose the most suitable right for each.",
    template: "Class teacher, Marks table: {{blank:a}}\n\nBursar, Marks table: {{blank:b}}\n\nLearner, own fees balance: {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["Read and edit"], choices: ["Read and edit", "Read only", "No access"] },
      { id: "b", accepted: ["No access"], choices: ["Read and edit", "Read only", "No access"] },
      { id: "c", accepted: ["Read only"], choices: ["Read and edit", "Read only", "No access"] },
    ],
    wrong: [["Read only", "Read and edit", "No access"]],
    explanation: "Teachers enter marks, the bursar has no need to see marks, and a learner may look at, but not change, their own balance.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["What would an attacker who copied the users table be able to read?"],
    stem: "Why should a database store users' passwords in a hashed (one-way scrambled) form instead of as plain text?",
    options: [
      ["Anyone who reads or steals the table cannot see the actual passwords", "Correct: the login check compares hashes."],
      ["Hashed passwords let users log in without typing a password", "A password is still needed."],
      ["Hashing lets the administrator read every password when needed", "One-way hashing means nobody can read them back."],
      ["Hashing makes every password at least eight characters long", "Hashing does not enforce length rules."],
    ],
    answer: "A",
    explanation: "With hashing, the stored value cannot be turned back into the password, so a stolen table does not reveal users' passwords.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Does an audit trail stop a change? What does it do instead?"],
    stem: "A learner's mark in a school database was changed without permission. Explain two ways an audit trail helps the school.",
    points: [
      "It shows which user account made the change and when, so the person responsible can be identified",
      "It records the old value so the mark can be restored / users who know actions are logged are deterred from misuse",
    ],
    explanation: "Audit trails trace, deter and help undo changes.",
    modelAnswer: "The audit trail shows which account changed the mark and at what time, so the school can find who did it. It also records the original mark, so the correct value can be put back.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    hints: ["Think about logging in, what each user can do, and recovering from loss."],
    stem: "A pharmacy in Harare keeps customers' prescriptions in a database used by six staff. Describe three different measures that would keep the data secure.",
    points: [
      "Individual user accounts with strong passwords that are not shared (account locked after failed attempts)",
      "Access rights / views so that, e.g., cashiers see only what they need and cannot edit prescriptions",
      "A third measure described: regular encrypted backups kept off-site / encryption of the database / an audit trail of changes",
    ],
    explanation: "Credit each different measure with how it protects the data.",
    modelAnswer: "Each member of staff has an individual account with a strong password, so only staff can log in and actions can be traced. Access rights mean cashiers can see only names and payment details through a view, while only pharmacists can edit prescriptions. The database is backed up every night to encrypted cloud storage so it can be restored after a failure.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["A password answers 'who are you?'; access rights answer 'what may you do?'."],
    stem: "A secondary school in Gweru stores learners' personal details, marks and fees in one database. Teachers, the bursar and the headteacher all use it.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which measure stops a teacher, who is logged in, from opening the Fees table?",
        options: [["Access rights", "Correct: they control what a logged-in user may use."], ["A password", "The teacher has already logged in with a valid password."], ["An incremental backup", "Backups help recovery only."], ["A data type", "Data types control what can be stored in a field."]],
        answer: "A", explanation: "Access rights set per role decide which tables each user can open.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Give two rules for passwords that the school should enforce.",
        points: ["One rule, e.g. at least 8 characters with a mix of letters, digits and symbols", "A second rule, e.g. never shared or written down / changed if it may have been seen / account locked after several wrong attempts"],
        modelAnswer: "Passwords must be at least 10 characters with letters, digits and symbols, and the account is locked after five wrong attempts.",
      }),
      P.mcq({
        label: "(c)", stem: "Teachers need learners' names and classes but must not see home addresses. What should the administrator create?",
        options: [["A view of only the name and class fields", "Correct: the view hides the address field."], ["A report listing every field", "That would show the addresses."], ["An extra copy of the Learners table", "A copy would still contain the addresses."], ["A full backup of the whole Learners table", "A backup is for recovery."]],
        answer: "A", explanation: "A view shows only the fields it selects.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the school should keep a backup of the database at a different site.",
        points: ["A disaster at the school (fire, flood, theft) could destroy the server and any backup kept with it", "A copy elsewhere survives, so the data can be restored"],
        modelAnswer: "If a fire or theft hit the school office, the server and any backup drive beside it could be lost together. A copy kept off-site or in the cloud would survive, so the database could be restored.",
      }),
    ],
    explanation: "(a) Access rights. (c) A view. Backups off-site survive local disasters.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["Restore the full backup first, then each incremental in order.", "Which control records changes, and which one hides data?"],
    stem: "A savings club in Kwekwe keeps members' contributions in a database. It makes a full backup every Monday night and an incremental backup on Tuesday and Wednesday nights. On Thursday morning the database file is found to be damaged.",
    parts: [
      P.num({ label: "(a)", stem: "State how many backups must be restored to recover the data.", value: restore2, wrong: [1], explanation: `Monday's full backup, then the incrementals from Tuesday and Wednesday: ${restore2}.`, workedSolution: `1. Full: Monday night.\n2. Incrementals: Tuesday, Wednesday.\n3. ${restore2} backups.` }),
      P.mcq({
        label: "(b)", stem: "In what order must they be restored?",
        options: [["Monday full, then Tuesday, then Wednesday", "Correct: the full backup first, then each set of changes in order."], ["Wednesday, then Tuesday, then Monday full", "Changes must be applied on top of the full backup, oldest first."], ["Only Wednesday's incremental", "An incremental holds only one night's changes."], ["Monday full, then Wednesday only", "Tuesday's changes would be missing."]],
        answer: "A", explanation: "Each incremental holds only the changes since the previous backup, so all are needed, in order.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "State what data will still be missing after the restore.",
        points: ["Any changes made after the Wednesday night backup (e.g. on Thursday morning before the damage was found)"],
        modelAnswer: "Contributions entered after Wednesday night's backup, before the damage was found.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "The treasurer suspects that a contribution was reduced on purpose. Explain how an audit trail would help.",
        points: ["It records which user changed the record and when", "It stores the old and new values, so the original amount can be restored / evidence for action"],
        modelAnswer: "The audit trail shows which user account edited the contribution and when, and records both the old and new amounts, so the treasurer can identify the person and restore the true amount.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Members can log in to see their own balance. Describe how the database can stop a member seeing other members' balances.",
        points: ["Members are given access only to a view / query, not to the whole table", "The view selects only the record(s) where MemberID matches the logged-in member (and only the needed fields), read-only"],
        modelAnswer: "Members get no access to the Contributions table itself. Instead they are given read-only access to a view that selects only the rows whose MemberID matches the member who has logged in.",
      }),
    ],
    explanation: `(a) ${restore2}. (b) Full backup first, then each incremental in order.`,
  });

  b.card("DEFINITION", "Access rights", "Permissions saying which tables, queries, forms or reports a user may use and whether they may read only or also add, change and delete.");
  b.card("DEFINITION", "View (security)", "A saved query given to users instead of the table, so they see only selected fields and records.");
  b.card("DEFINITION", "Audit trail", "An automatic log of who accessed or changed data, what changed (old and new values) and when.");
  b.card("CONCEPT", "Principle of least privilege", "Each user gets only the access rights needed for their job.");
  b.card("CONCEPT", "Full versus incremental backup", "Full: copies everything. Incremental: copies only changes since the last backup. Restore = last full + every incremental since, in order.");
  b.card("FACT", "Why keep a backup off-site?", "A fire, flood or theft could destroy the server and any copy kept beside it.");
  b.card("CONCEPT", "Encryption at rest and in transit", "At rest: the stored database file is scrambled. In transit: data is scrambled as it travels over a network.");
  b.card("FACT", "Storing passwords", "Store them hashed (one-way scrambled), never as plain text, so a stolen table does not reveal them.");
  b.card("CONCEPT", "Password versus access rights", "A password checks who the user is; access rights decide what that user may do.");
});
