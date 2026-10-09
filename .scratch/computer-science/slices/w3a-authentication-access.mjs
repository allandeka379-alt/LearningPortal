// Slice w3a: authentication and access control (comp.security.authentication-access).
import { concept, P } from "../lib.mjs";

concept("comp.security.authentication-access", { file: "security/authentication-access", keyPrefix: "security.authentication-access" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **authentication**?",
    options: [
      ["Checking that a user is who they claim to be", "Correct: for example with a password or fingerprint."],
      ["Deciding which files a user may edit", "That is access control (permissions)."],
      ["Scrambling data so it cannot be read", "That is encryption."],
      ["Making a copy of data in case it is lost", "That is a backup."],
    ],
    answer: "A",
    explanation: "Authentication confirms a user's identity before access is given.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which of these is the strongest password?",
    options: [
      ["Kopje8!Sunset#River", "Correct: long, with upper and lower case, a digit and symbols."],
      ["tendai2010", "It contains a name and a likely birth year."],
      ["qwerty123", "A very common keyboard pattern, tried early in brute-force attacks."],
      ["Harare", "A short dictionary word, easily guessed."],
    ],
    answer: "A",
    explanation: "Strong passwords are long, mix character types and are not linked to the user or common words.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **biometric** authentication?",
    options: [
      ["Scanning a fingerprint to unlock a phone", "Correct: a unique physical characteristic."],
      ["Typing a PIN at an ATM", "A PIN is something you know, not a biometric."],
      ["Entering a code sent by email", "That is part of two-step verification."],
      ["Choosing a security question answer", "That is something you know."],
    ],
    answer: "A",
    explanation: "Biometrics use physical or behavioural characteristics such as fingerprints, faces, irises or voices.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Chipo enters her password and is then asked for a six-digit code shown on her phone. What security method is this?",
    options: [
      ["Two-step verification", "Correct: a second, separate step after the password."],
      ["Biometric authentication", "No physical characteristic is scanned."],
      ["File permissions", "Permissions control what users may do with files."],
      ["A firewall", "A firewall filters network traffic."],
    ],
    answer: "A",
    explanation: "Two-step verification requires a second proof, such as a one-time code on the user's device, after the password.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What can the criminal still not get?"],
    stem: "How does two-step verification protect an account if the password is stolen?",
    options: [
      ["The criminal also needs the one-time code on the user's device", "Correct: the password alone is not enough."],
      ["It changes the password automatically every hour", "The password stays the same; the code changes."],
      ["It encrypts the password so it cannot be stolen", "The password has already been stolen in this case."],
      ["It blocks every login attempt from a new or unknown device permanently", "Logins are allowed when the code is entered."],
    ],
    answer: "A",
    explanation: "Without the one-time code on the user's phone or email, a stolen password cannot be used to log in.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about cuts, dirt and stolen data."],
    stem: "Which is a **disadvantage** of fingerprint authentication?",
    options: [
      ["A cut or dirty finger may cause a genuine user to be rejected", "Correct: scans can fail for real users."],
      ["Users often forget their fingerprints", "A fingerprint cannot be forgotten."],
      ["A fingerprint can easily be shared with friends", "It is very hard to share a fingerprint."],
      ["It needs the user to type a long password as well as scanning a finger", "The fingerprint replaces typing."],
    ],
    answer: "A",
    explanation: "Biometrics can reject genuine users, need extra hardware, and stolen biometric data cannot be changed.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which permission allows opening a file without changing it?"],
    stem: "Learners should be able to open the school timetable file but not change it. Which permission should they be given?",
    options: [
      ["Read only", "Correct: they can view but not edit."],
      ["Read and write", "Write would let them change or delete it."],
      ["Execute", "Execute allows running a program."],
      ["No access", "They would not be able to open it at all."],
    ],
    answer: "A",
    explanation: "Read-only access lets users view a file but not change or delete it.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Who needs which data to do their job?"],
    stem: "A pharmacy's system holds customer details and prescription records. Which arrangement best protects the data?",
    options: [
      ["Separate accounts, each with the least access its user's job needs", "Correct: each user sees only what they need."],
      ["One shared account whose password all staff know", "No one can tell who did what, and the password spreads."],
      ["Every account given full access to everything", "Any one stolen account would expose everything."],
      ["No passwords, but the computer is kept in a locked room that only staff enter", "Physical security alone does not control access in the system."],
    ],
    answer: "A",
    explanation: "Individual accounts with suitable access levels limit damage and record who did what.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Locking an account after a few wrong password attempts helps to defeat brute-force attacks.",
    answer: true,
    explanation: "True. The attacker cannot keep guessing once the account is locked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Setting a social media profile so that only friends can see posts is an example of a privacy setting.",
    answer: true,
    explanation: "True. Privacy settings control who can see a user's posts, photos and details.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Access levels check who the user is when they log in.",
    answer: false,
    explanation: "False. That is authentication. Access levels decide what an authenticated user may see and do.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each file permission to what it allows.",
    pairs: [
      ["Read", "Open and view the file"],
      ["Write", "Change or delete the file"],
      ["Execute", "Run the file as a program"],
    ],
    explanation: "Read: view. Write: change or delete. Execute: run.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Authentication or access control?"],
    stem: "Classify each measure as authentication or access control.",
    pairs: ["Facial recognition at login", "Giving learners read-only access to the timetable", "A one-time code sent by email", "Stopping the receptionist from seeing diagnoses"],
    right: ["Authentication", "Access control"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Proving identity is authentication; limiting what a logged-in user can do is access control.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the advice for a strong password.",
    template: "A strong password should be {{blank:a}}, mix upper and lower case letters, {{blank:b}} and symbols, and must not be linked to the user, such as their {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["long"], choices: ["long", "short", "shared", "written down"] },
      { id: "b", accepted: ["digits"], choices: ["digits", "spaces", "names", "emojis"] },
      { id: "c", accepted: ["name"], choices: ["name", "screen", "browser", "keyboard"] },
    ],
    explanation: "Long, mixed character types, and nothing personal such as a name or birthday.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of authentication that uses a unique physical characteristic, such as an iris or a face.",
    accepted: ["biometrics", "biometric", "biometric authentication"],
    wrong: ["password"],
    explanation: "Biometric authentication uses physical or behavioural characteristics.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["One point about forgetting or sharing, one about copying."],
    stem: "Give **two** advantages of biometric authentication over passwords.",
    points: [
      "A biometric cannot be forgotten (or lost) by the user",
      "It is unique and hard to copy, guess or share (so others cannot use it)",
    ],
    explanation: "Biometrics are always with the user and are hard to share or guess.",
    modelAnswer: "A fingerprint cannot be forgotten like a password, and it cannot be guessed or passed to a friend, because it is unique to the user.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Choose controls for the people and the data in the scenario.", "Say why each control is suitable."],
    stem: "A small insurance company in Mutare stores clients' details on a shared server used by 10 staff, two of whom are managers. Recommend suitable authentication and access controls and justify them.",
    points: [
      "Each member of staff has an individual user account with a strong password (so actions can be traced)",
      "Two-step verification (or biometrics) for logins, especially managers / remote access, so a stolen password is not enough",
      "Access levels: managers read and edit all records; other staff only the records/fields they need (least access)",
      "File permissions on folders (e.g. read only for most staff on sensitive files) / lock accounts after failed attempts",
    ],
    explanation: "Good answers combine authentication with access levels matched to each role, and justify each choice.",
    modelAnswer: "Give each person their own account with a strong password so every change can be traced. Use two-step verification, at least for the managers, so a stolen password alone cannot open the system. Managers get read and edit access to all client records, while other staff get only the records they work on, and sensitive folders are read only for most staff. Accounts lock after three failed attempts.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Authentication proves identity; access levels limit what a user can do."],
    stem: "A secondary school in Kwekwe puts learners' reports on an online portal used by learners, parents and teachers.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which access level should parents have to their own child's report?",
        options: [
          ["Read only", "Correct: they view but must not change it."],
          ["Read and write", "Parents must not be able to change marks."],
          ["Execute", "Reports are not programs."],
          ["Full administrator access", "Far too much access for a parent."],
        ],
        answer: "A", explanation: "Parents should only view reports.",
      }),
      P.tf({
        label: "(b)", stem: "Teachers should have the same access level as learners.",
        answer: false, explanation: "False. Teachers must edit marks for their classes; learners only view their own.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why teachers' accounts should use two-step verification.",
        points: [
          "Teachers' accounts can change marks, so they are attractive targets",
          "Even if a teacher's password is stolen/guessed, a criminal cannot log in without the one-time code on the teacher's device",
        ],
        modelAnswer: "A teacher's account can change marks, so it is a target; with two-step verification a learner who saw the password still could not log in without the code on the teacher's phone.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Give **two** rules the school should set for portal passwords.",
        points: [
          "At least 8 characters / long",
          "Mix of upper and lower case, digits and symbols / not a name or birthday / not reused / lock after failed attempts",
        ],
        modelAnswer: "Passwords must be at least 10 characters long and mix upper and lower case letters, digits and symbols, with no names or birthdays.",
      }),
    ],
    explanation: "(a) read only (b) false.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Compare cost, convenience and what happens if each is stolen."],
    stem: "A bank in Harare is choosing how staff will log in to the computers that process customer loans.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each method to a drawback.",
        pairs: [
          ["Password only", "Can be guessed, seen or stolen by phishing"],
          ["Fingerprint scanner", "Needs extra hardware and cannot be changed if the data is stolen"],
          ["Two-step verification by phone code", "Staff cannot log in if they leave their phone at home"],
        ],
        explanation: "Each method has a different weakness.",
      }),
      P.tf({
        label: "(b)", stem: "If the bank's stored fingerprint data were stolen, staff could simply change their fingerprints, as they would change a password.",
        answer: false, explanation: "False. A fingerprint cannot be changed, which is a drawback of biometrics.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Recommend a login method for the loans computers and justify your choice.",
        points: [
          "A clear recommendation, e.g. password plus fingerprint (or two-step verification)",
          "Combining two factors means one stolen factor is not enough to get in",
          "Loan data is confidential/financial, so a high level of security is justified despite the cost",
          "Practical point, e.g. fingerprints cannot be forgotten or shared at the desk / lock accounts after failed attempts",
        ],
        modelAnswer: "Use a strong password together with a fingerprint scan. A criminal would need both the password and the member of staff's finger, so phishing the password alone would not work. Loan records are confidential financial data, so the cost of scanners is justified, and staff cannot forget or lend a fingerprint.",
      }),
    ],
    explanation: "(a) password: can be stolen; fingerprint: hardware, cannot be changed; phone code: needs the phone.",
  });

  b.card("DEFINITION", "What is **authentication**?", "Checking that a user is who they claim to be before giving access.");
  b.card("FACT", "Features of a strong password?", "Long; mixes upper and lower case, digits and symbols; not a word, name or birthday; not reused.");
  b.card("DEFINITION", "What is **biometric** authentication?", "Using a unique physical or behavioural characteristic: fingerprint, face, iris, voice.");
  b.card("CONCEPT", "Biometrics: one advantage, two disadvantages?", "Cannot be forgotten or shared; but needs extra hardware, may reject genuine users, and cannot be changed if stolen.");
  b.card("DEFINITION", "What is **two-step verification**?", "A second step after the password, such as a one-time code on the user's phone or email, so a stolen password is not enough.");
  b.card("DEFINITION", "What are **access levels**?", "Different amounts of access for different users, deciding which data each can see and what they can do with it.");
  b.card("FACT", "Read, write and execute permissions?", "Read: view a file. Write: change or delete it. Execute: run it as a program.");
  b.card("DEFINITION", "What are **privacy settings**?", "Settings that control who can see a user's posts, photos, location and contact details.");
  b.card("CONCEPT", "Authentication compared with access control?", "Authentication: are you who you say you are? Access control: now you are in, what may you do?");
});
