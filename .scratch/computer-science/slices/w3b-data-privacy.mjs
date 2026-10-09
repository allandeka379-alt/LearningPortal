// Slice w3b: data privacy and data integrity (comp.security.data-privacy, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.security.data-privacy", { file: "security/data-privacy", keyPrefix: "security.data-privacy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **data integrity**?",
    options: [
      ["The accuracy, completeness and consistency of data", "Correct: integrity means the data can be trusted to be correct."],
      ["Keeping data hidden from people who are not allowed to see it", "That is privacy (confidentiality)."],
      ["Making a second copy of data in case it is lost", "That is a backup, one way of protecting integrity."],
      ["Scrambling data so that it cannot be read when intercepted", "That is encryption, a privacy measure."],
    ],
    answer: "A",
    explanation: "Data integrity is about data being accurate, complete and consistent throughout its life.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **personal data**?",
    options: [
      ["A learner's name and home address", "Correct: it identifies a living person."],
      ["The average mark of a whole province", "An average does not identify any individual."],
      ["The number of computers in a school lab", "This is not about a person."],
      ["The opening hours of a clinic in Bulawayo", "This is information about an organisation."],
    ],
    answer: "A",
    explanation: "Personal data is any information that relates to an identifiable living person.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A hospital receptionist can view appointment times but **not** test results. Which measure is being used?",
    options: [
      ["Access levels", "Correct: each user account is given only the permissions its job needs."],
      ["Data validation", "Validation checks input is sensible; it does not limit who can see data."],
      ["Data backup", "Backups protect against loss, not unauthorised viewing."],
      ["Data verification", "Verification checks data was entered or copied accurately."],
    ],
    answer: "A",
    explanation: "Access levels (access rights) control which data each user may see and whether they can change it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under data protection principles, a shop that collects customers' phone numbers to send delivery messages should **not**:",
    options: [
      ["Sell the numbers to another company for advertising", "Correct: data must be used only for the purpose for which it was collected."],
      ["Keep the numbers secure with passwords", "Keeping data secure is required, not forbidden."],
      ["Correct a number when a customer reports a mistake", "Keeping data accurate is required."],
      ["Delete the numbers when they are no longer needed", "Not keeping data longer than necessary is a principle."],
    ],
    answer: "A",
    explanation: "Personal data may be used only for the stated purpose. Selling it for advertising without consent breaks that principle.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which measure makes a stolen file unreadable?"],
    stem: "A school's laptop holding learners' records might be stolen. Which measure would **best** keep the records private if this happens?",
    options: [
      ["Encrypting the hard disk", "Correct: without the key the thief cannot read the data."],
      ["Running a daily backup of the records", "A backup restores the data but does not stop the thief reading it."],
      ["Adding a range check to the marks field", "Validation improves accuracy, not privacy."],
      ["Using double entry when typing the records", "Verification improves accuracy, not privacy."],
    ],
    answer: "A",
    explanation: "Encryption scrambles the data, so a stolen disk cannot be understood without the decryption key.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Has anyone seen data they should not, or is the data wrong?"],
    stem: "A power cut during saving corrupts a shop's stock file, so several quantities become wrong. What has been affected?",
    options: [
      ["Data integrity", "Correct: the data is no longer accurate."],
      ["Data privacy", "No one has seen data they should not."],
      ["Software copyright", "Copyright is not involved."],
      ["User consent", "Consent concerns permission to collect data."],
    ],
    answer: "A",
    explanation: "Corrupted, inaccurate data is a loss of integrity. Privacy is not involved because nobody has gained unauthorised access.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which measure records who changed what?"],
    stem: "A bank wants to find out which member of staff changed a customer's address last week. What should its system keep?",
    options: [
      ["An audit trail", "Correct: it logs who changed which data and when."],
      ["A firewall log of blocked websites", "This records network traffic, not data changes."],
      ["A presence check on the address field", "Validation does not record who made changes."],
      ["A copy of the privacy policy", "A policy states rules but records nothing."],
    ],
    answer: "A",
    explanation: "An audit trail records each change with the user ID and time, so changes can be traced and integrity checked.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which option addresses unauthorised changes AND tracing them?"],
    stem: "Marks in a college database have been altered dishonestly by someone using a shared staff login. Which change would **most** improve integrity?",
    options: [
      ["Give each lecturer a unique login with edit rights for their own classes only", "Correct: changes are limited and every change can be traced to one person."],
      ["Ask all lecturers to change the shared password every year", "A shared login still hides who made each change."],
      ["Add validation so that every mark must be between 0 and 100", "Dishonest marks within range still pass validation."],
      ["Back up the whole database to a cloud service at the end of every term", "Backups help recovery but do not stop or trace changes."],
    ],
    answer: "A",
    explanation: "Unique accounts with limited access rights stop unauthorised edits and make every change traceable to a person.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Data can be kept completely private and still be inaccurate.",
    answer: true,
    explanation: "True. Privacy and integrity are different: a record can be well protected from unauthorised people and still contain a typing error.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "In Zimbabwe, personal data protection is set out in the Cyber and Data Protection Act.",
    answer: true,
    explanation: "True. The Cyber and Data Protection Act [Chapter 12:07] (2021) sets out data protection principles in Zimbabwe.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure to what it does.",
    pairs: [
      ["Encryption", "Makes data unreadable without a key"],
      ["Access levels", "Limit which data each user may see or change"],
      ["Audit trail", "Records who changed data and when"],
      ["Backup", "Keeps a copy so lost data can be restored"],
    ],
    explanation: "Encryption: unreadable without the key. Access levels: limit users. Audit trail: records changes. Backup: allows recovery.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    hints: ["Privacy: someone sees data they should not. Integrity: data becomes wrong."],
    stem: "Classify each incident as mainly a breach of privacy or a loss of integrity.",
    pairs: ["A clerk tells a friend a customer's account balance", "A learner's mark is typed as 18 instead of 81", "A phone company's customer list is posted online", "Two copies of a patient's record show different blood groups"],
    right: ["Breach of privacy", "Loss of integrity"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Disclosure to unauthorised people breaks privacy; wrong or inconsistent data is a loss of integrity.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["One principle concerns how much data, another how long."],
    stem: "Complete the data protection principles.",
    template: "Personal data must be adequate, relevant and not {{blank:a}}. It must not be kept for {{blank:b}} than necessary. It must be collected with the person's {{blank:c}} or another lawful reason.",
    blanks: [
      { id: "a", accepted: ["excessive"], choices: ["excessive", "encrypted", "accurate", "shared"] },
      { id: "b", accepted: ["longer"], choices: ["longer", "shorter", "less", "fewer"] },
      { id: "c", accepted: ["consent"], choices: ["consent", "password", "licence", "backup"] },
    ],
    explanation: "Not excessive; not kept longer than necessary; collected with consent.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Zimbabwean regulator given the role of data protection authority under the Cyber and Data Protection Act (its abbreviation is enough).",
    accepted: ["POTRAZ", "Postal and Telecommunications Regulatory Authority", "Postal and Telecommunications Regulatory Authority of Zimbabwe"],
    wrong: ["ZIMSEC"],
    explanation: "POTRAZ, the Postal and Telecommunications Regulatory Authority of Zimbabwe, acts as the data protection authority.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Who sees it versus is it correct."],
    stem: "Explain the difference between data privacy and data integrity.",
    points: [
      "Privacy: personal data is kept away from unauthorised people / individuals control how it is used",
      "Integrity: data is accurate, complete and consistent (can be trusted)",
    ],
    explanation: "Privacy is about who may see and use data; integrity is about whether the data is correct.",
    modelAnswer: "Privacy means only authorised people can see or use someone's personal data. Integrity means the data is accurate, complete and consistent, so it can be trusted.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    hints: ["Two measures for privacy, two for integrity."],
    stem: "A pharmacy in Masvingo keeps customers' prescriptions on a computer. Suggest **two** measures to protect the privacy of the data and **two** measures to protect its integrity.",
    points: [
      "Privacy: unique user IDs and strong passwords / access levels so only pharmacists see prescriptions",
      "Privacy: encryption / firewall / screens that lock automatically / staff confidentiality training",
      "Integrity: validation of input (e.g. range check on dose) / verification (double entry or visual check)",
      "Integrity: regular backups / audit trail of changes / restricted edit rights",
    ],
    explanation: "Privacy measures restrict who sees data; integrity measures keep the data correct and recoverable.",
    modelAnswer: "Give each pharmacist a unique login with access levels so cashiers cannot view prescriptions, and encrypt the database. Use a range check on doses with a visual check of each prescription, and back the data up every day.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Each user should only see what their job needs.", "Is the problem who saw it, or whether it is correct?"],
    stem: "Bulawayo Community Clinic (fictional) stores patient records on a network. Receptionists book appointments; nurses record test results; doctors write diagnoses.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which access level should a receptionist have for patients' test results?",
        options: [
          ["No access", "Correct: booking appointments does not need test results."],
          ["Read only", "Even reading is more than the job needs."],
          ["Read and edit", "Receptionists do not record results."],
          ["Full control, including delete", "This would risk privacy and integrity."],
        ],
        answer: "A", explanation: "Users get only the access their job needs.",
      }),
      P.match({
        label: "(b)", stem: "Classify each incident at the clinic.",
        pairs: ["A nurse reads a famous patient's record out of curiosity", "A test result is saved under the wrong patient"],
        right: ["Breach of privacy", "Loss of integrity"],
        rightIndex: [0, 1],
        explanation: "Unauthorised viewing: privacy. Wrong data: integrity.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Describe **three** data protection principles the clinic must follow.",
        points: [
          "A principle stated clearly (e.g. collected fairly and lawfully with consent)",
          "A second principle (e.g. used only for the stated purpose / not excessive)",
          "A third principle (e.g. kept accurate and up to date / kept secure / not kept longer than necessary / patients may see their data)",
        ],
        modelAnswer: "The clinic must collect only the data it needs to treat patients, use it only for treatment and not share it with advertisers, and keep it secure with passwords and access levels.",
      }),
    ],
    explanation: "(a) No access. (b) Curiosity reading: privacy; wrong patient: integrity.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["A shared login hides who did what.", "Validation only checks data is sensible."],
    stem: "At Chipo's school, all teachers use one shared login, *staff1*, to enter marks into the database. A learner's mark was found to have been changed from 45 to 85.",
    parts: [
      P.tf({ label: "(a)", stem: "A range check of 0 to 100 on the marks field would have rejected the changed mark.", answer: false, explanation: "False: 85 is within the range 0 to 100, so it passes validation." }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why the shared login makes it hard to protect the integrity of the marks.",
        points: ["It is impossible to trace which teacher made the change (no accountability)", "Anyone who knows the password can change any mark / cannot restrict teachers to their own classes"],
        modelAnswer: "Because everyone uses staff1, the school cannot tell who changed the mark, and every teacher can edit every class's marks instead of only their own.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Recommend **two** improvements and explain how each helps.",
        points: ["Unique user IDs and passwords for each teacher, so changes can be traced", "Access levels limiting edits to own classes / an audit trail logging changes"],
        modelAnswer: "Give each teacher their own login and password so every change can be traced, and keep an audit trail that records each change to a mark with the user and time.",
      }),
    ],
    explanation: "(a) False: 85 is in range.",
  });

  b.card("DEFINITION", "Personal data", "Information relating to an identifiable living person, e.g. name, ID number, address, medical record, exam result.");
  b.card("DEFINITION", "Data privacy", "The right of individuals to control how their personal data is collected, used and shared; kept from unauthorised people.");
  b.card("DEFINITION", "Data integrity", "The accuracy, completeness and consistency of data over its whole life.");
  b.card("DEFINITION", "Access levels", "Permissions on a user account deciding what data the user may see and whether they can read, add, edit or delete it.");
  b.card("FACT", "Zimbabwe's data protection law", "The Cyber and Data Protection Act [Chapter 12:07] (2021); POTRAZ acts as the data protection authority.");
  b.card("CONCEPT", "Data protection principles", "Fair and lawful with consent; stated purpose only; adequate, not excessive; accurate; not kept too long; respect rights; secure; safe transfers abroad.");
  b.card("CONCEPT", "Privacy measures", "Unique IDs and strong passwords, access levels, file permissions, encryption, firewalls, policies, training, physical security.");
  b.card("CONCEPT", "Integrity measures", "Validation, verification, backups, restricted edit rights, audit trails.");
  b.card("CONCEPT", "Audit trail", "A log of who accessed or changed which data and when, so changes can be traced.");
});
