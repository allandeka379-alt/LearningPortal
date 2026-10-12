// Slice w3a: acs.security.privacy-integrity (both boards).
import { concept, P, chk, same, checksum8, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";
import "../tables/w3a-privacy-integrity.mjs";

const sum = (a) => a.reduce((x, y) => x + y, 0);
const bytesA = [88, 120, 45, 200, 150];
const csA = checksum8(bytesA);
const bytesF = [23, 150, 177, 62];
const csF = checksum8(bytesF);
chk(sum(bytesA), 603);
chk(csA, 91);
const bytesB = [212, 97, 180, 33, 140, 73];
const csB = checksum8(bytesB);
chk(sum(bytesB), 735);
chk(csB, 223);
const recvB = [212, 97, 180, 33, 141, 73];
const csRecvB = checksum8(recvB);
chk(csRecvB, 224);
// Two compensating errors in bytesA
const recvA = [89, 119, 45, 200, 150];
same(checksum8(recvA), csA);
const recvF = [24, 149, 177, 62];
same(checksum8(recvF), checksum8(bytesF));
chk(sum(bytesF), 412);
chk(checksum8(bytesF), 156);
const bytesD = [154, 61, 205, 38, 119, 90];
const recvD = [154, 61, 205, 39, 119, 90];
chk(sum(bytesD), 667);
chk(checksum8(bytesD), 155);
chk(checksum8(recvD), 156);
const csD = checksum8(bytesD);
const csRecvD = checksum8(recvD);

concept("acs.security.privacy-integrity", { file: "security/privacy-integrity", keyPrefix: "security.privacy-integrity" }, (b) => {
  mc(b, 1, "RECALL", "Which term describes the right of a person to control who can see and use their personal data?",
    ["Data privacy", "Correct: privacy is about who is entitled to see and use the data."],
    [["Data integrity", "Integrity is about the data being accurate and unchanged."], ["Data compression", "Compression makes files smaller."], ["Data validation", "Validation checks data as it is entered."]],
    "Privacy concerns who may see and use personal data.");
  mc(b, 2, "UNDERSTANDING", "A clerk at a school changes a learner's term mark from 48 to 84 without permission. Which property of the data has been lost?",
    ["Integrity", "Correct: the data is no longer accurate."],
    [["Privacy", "Nobody has necessarily seen data they should not see."], ["Compression", "The size of the file has not been reduced."], ["Availability", "The data can still be opened by the people who need it."]],
    "Unauthorised change makes the data wrong, which is a loss of integrity.", { daily: true });
  mc(b, 2, "APPLICATION", "A flood destroys a school's only server and the only copy of its records. Which statement describes the damage?",
    ["The security of the data has failed because the data has been lost", "Correct: loss and destruction are failures of data security."],
    [["Only privacy has been breached because the records were not protected from visitors", "Nobody has seen the records without permission."], ["Only integrity has been lost because the marks are now wrong", "The marks are not wrong; they no longer exist."], ["Nothing has failed because the school can print new marks", "The loss is real, and printing new marks does not restore the original records."]],
    "Destruction of the only copy is a failure of data security (availability).", { daily: true });
  mc(b, 2, "RECALL", "Which measure mainly protects the integrity of data rather than its privacy?",
    ["A backup that is used to restore damaged data", "Correct: a backup lets damaged or lost data be put right."],
    [["Encrypting the data before it is sent", "Encryption mainly stops other people reading the data."], ["Giving every user a different password for each file", "Passwords mainly control who can see and use the data."], ["Locking the server room", "A lock mainly controls access to the equipment."]],
    "Backups, validation and verification mainly protect integrity.");
  mc(b, 3, "UNDERSTANDING", "Which of these is a measure for computer-system security rather than for data security alone?",
    ["Installing an update to the operating system that closes a weakness", "Correct: it protects the software that runs the computer."],
    [["Encrypting a single file of results", "Encrypting a file protects the data itself."], ["Shredding printed class lists", "This protects data on paper."], ["Asking a parent to confirm by signing a form that a phone number is correct", "This is a check on the accuracy of the data."]],
    "Updates, firewalls and anti-malware protect the system; encryption and access rights protect the data itself.", { hints: ["Does the measure protect the data or the equipment and programs?"] });
  mc(b, 3, "ANALYSIS", "A school collects learners' home addresses for transport planning. It then gives the list to a company that sells uniforms, without telling parents. Which data protection principle has the school broken?",
    ["Data must be used only for the purpose for which it was collected", "Correct: the address list was used for a purpose the parents were not told about."],
    [["Data must be kept accurate and up to date by checking it with the parents each year", "Nothing in the scenario says the addresses were wrong."], ["Data must be backed up every day", "Backups are a security measure, not this principle."], ["Data must be stored in encrypted form", "Encryption is a safeguard; the problem here is how the data was used."]],
    "Purpose limitation: data collected for one purpose should not be passed on for another without permission.", { hints: ["Why was the data collected, and what was it used for?"] });
  mc(b, 3, "UNDERSTANDING", "The receiver of a file calculates a checksum that differs from the checksum sent with the file. What does this show?",
    ["The data was changed or damaged on the way", "Correct: the sum of the received data is not the sum of the data that was sent."],
    [["The data was read by an unauthorised person", "Reading data does not change a checksum."], ["The file was too large to be sent", "File size is not tested by a checksum."], ["The sender's password was wrong", "A checksum does not check passwords."]],
    "A mismatch shows that the received data differs from the data that was sent.", { hints: ["What does a checksum add up?"] });
  mc(b, 4, "EVALUATION", "A student says: \"Because the checksums match, the file must have been received exactly as it was sent.\" Which comment is correct?",
    ["The student is wrong because two errors can cancel out and leave the checksum unchanged", "Correct: a checksum gives strong evidence but not proof."],
    [["The student is right because a checksum is unique to each file", "Different files can have the same checksum."], ["The student is wrong because a checksum can only be used on text files", "A checksum can be calculated from any bytes."], ["The student is right because the checksum is encrypted", "A checksum is not encryption."]],
    "A checksum is a sum, so different data can give the same value.", { hints: ["Could two different files have the same total?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Data integrity can be lost by an honest typing mistake as well as by a hacker.", answer: true, explanation: "True. Integrity means the data is accurate and complete; accidental errors damage it as much as deliberate changes." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Data security", "Protection of data from loss, damage and unauthorised access"], ["Data privacy", "The right to control who sees and uses personal data"], ["Data integrity", "The data is accurate, complete and consistent"], ["Computer-system security", "Protection of the hardware, software and network"]],
    explanation: "Security protects, privacy controls who sees, integrity means correct, system security protects the equipment and programs." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A hacker who copies a list of patients' names has breached {{blank:a}}. A nurse who enters a wrong blood group has damaged {{blank:b}}. A fire that destroys the only copy of the records is a failure of data {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["privacy"], choices: ["privacy", "integrity", "validation", "compression"] },
      { id: "b", accepted: ["integrity"], choices: ["integrity", "privacy", "encryption", "availability only"] },
      { id: "c", accepted: ["security"], choices: ["security", "verification", "entry", "formatting"] },
    ], explanation: "Copying is a privacy breach, a wrong entry harms integrity, loss is a security failure." });
  b.num({ d: 3, skill: "APPLICATION", daily: true, calculator: false, hints: ["Add the five values, then find the remainder when you divide by 256."],
    stem: `Five bytes with the values ${bytesA.join(", ")} are sent. The checksum is the sum of the values modulo 256. Calculate the checksum.`,
    value: csA, wrong: [sum(bytesA), 603 - 256], workedSolution: `1. ${bytesA.join(" + ")} = ${sum(bytesA)}.\n2. ${sum(bytesA)} = 2 × 256 + ${csA}.\n3. The checksum is ${csA}.`, explanation: `The sum is ${sum(bytesA)}; taking the remainder after dividing by 256 gives ${csA}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the received values and take the remainder after dividing by 256."],
    stem: `Six bytes ${bytesB.join(", ")} were sent with the checksum ${csB}. The receiver gets ${recvB.join(", ")}. Calculate the checksum that the receiver finds.`,
    value: csRecvB, wrong: [csB, sum(recvB)], workedSolution: `1. ${recvB.join(" + ")} = ${sum(recvB)}.\n2. ${sum(recvB)} = 2 × 256 + ${csRecvB}.\n3. The receiver finds ${csRecvB}, which is not ${csB}, so the data was damaged.`, explanation: `The received total is ${sum(recvB)}, so the checksum is ${csRecvB}. It differs from ${csB}.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Define each term, then give a short example of each."],
    stem: "Explain the difference between the privacy and the integrity of data. [4]",
    points: ["Privacy is about who is entitled to see and use the data (personal data kept from people who should not have it)", "An example of a privacy breach: a stranger reads a learner's medical record", "Integrity is about the data being accurate, complete and not wrongly changed", "An example of an integrity failure: a wrong mark is entered or an unauthorised person alters a mark"],
    modelAnswer: "Privacy is about who is entitled to see and use data, for example a stranger reading a learner's medical record breaches it. Integrity is about the data being accurate and not wrongly changed, for example a wrong mark entered by mistake or altered by an unauthorised person.",
    explanation: "Definition and example for each term." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["One point each for the focus and an example of the two kinds."],
    stem: "A bank in Gweru protects both its data and its computer system. Explain the difference between data security and computer-system security, with an example of each. [4]",
    points: ["Data security protects the data itself from loss, damage and unauthorised access", "Example of data security: encrypting customer files or setting access rights on accounts", "Computer-system security protects the hardware, software and network so that they keep working and cannot be misused", "Example of system security: a firewall, anti-malware software or applying operating system updates"],
    modelAnswer: "Data security protects the data from loss, damage and unauthorised access, for example by encrypting customer files. Computer-system security protects the hardware, software and network so that they keep working and cannot be misused, for example by using a firewall or applying updates.",
    explanation: "Data against equipment and programs, with an example of each." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Think about collection, use, accuracy and keeping."],
    stem: "A school keeps personal data about learners. State three principles it should follow when handling that data. [3]",
    points: ["Collect the data lawfully and fairly and for a stated purpose", "Use the data only for that purpose and keep only what is needed", "Keep the data accurate, protect it with safeguards and delete it when it is no longer needed"],
    modelAnswer: "Collect it lawfully and fairly for a stated purpose, use it only for that purpose and keep only what is needed, and keep it accurate, protect it with safeguards and delete it when it is no longer needed.",
    explanation: "Any three of the data protection principles." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Add the received values of the example: do they give the same total?"],
    stem: `The bytes ${bytesF.join(", ")} are sent with the checksum ${csF}. The receiver gets ${recvF.join(", ")}. Explain why the receiver does not notice the error. [3]`,
    points: [`The received values add up to ${sum(recvF)}, the same total as the values that were sent`, `So the checksum calculated by the receiver is ${csF} and matches the one sent`, "Two errors (one value too high by 1, another too low by 1) cancelled out, so a checksum cannot detect every error"],
    modelAnswer: `The received values still add up to ${sum(recvF)}, so the receiver's checksum is ${csF} and matches. One value is 1 too high and another 1 too low, so the errors cancel out and the checksum cannot detect them.`,
    explanation: "The first value is 1 higher and the second 1 lower, so the total does not change." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Decide whether the data was read, changed or lost."],
    explanation: "Incident 1 is a privacy breach, incident 2 an integrity failure and incident 3 a security failure through loss.",
    stem: "A clinic in Mutare records three incidents in one month. Incident 1: a visitor reads patients' names on an unlocked screen. Incident 2: a nurse types 9.1 instead of 19.1 for a patient's haemoglobin reading. Incident 3: a power surge destroys the disk of the only computer that holds the appointment records, and there is no backup.",
    parts: [
      pm("(a)", "Which property of the data was breached in incident 1?", ["Privacy", "Correct: people saw data they were not entitled to see."], [["Integrity", "The data was not changed."], ["Validation", "Validation is a check on input."], ["Compression", "Nothing was compressed."]], "A visitor saw the names, which breaches privacy."),
      pm("(b)", "Which property of the data was damaged in incident 2?", ["Integrity", "Correct: the stored value is not accurate."], [["Privacy", "Nobody saw data they should not have seen."], ["Security of the building", "The building was not attacked."], ["Encryption", "Encryption is a method, not a property of the data."]], "A wrong reading is a loss of integrity."),
      P.manual({ label: "(c)", marks: 2, stem: "State two measures that would have reduced the harm done in incident 3.", points: ["Regular backups kept on a different disk or at a different place", "A surge protector or uninterruptible power supply on the computer"], modelAnswer: "Regular backups kept on a separate disk or at another site, and a surge protector or uninterruptible power supply.", explanation: "Backups and power protection." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Add the values for the sender, then for the receiver.", "A checksum is the remainder after dividing by 256."],
    explanation: `The sender's checksum is ${csD}; the receiver's is ${csRecvD}; the mismatch shows the data changed in transit.`,
    stem: `A teacher in Bulawayo sends six marks as bytes: ${bytesD.join(", ")}. A checksum, the sum modulo 256, is sent with them. The receiver gets the values ${recvD.join(", ")}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the checksum that the sender sends.", value: csD, wrong: [sum(bytesD), 667 - 512], workedSolution: `1. ${bytesD.join(" + ")} = ${sum(bytesD)}.\n2. ${sum(bytesD)} = 2 × 256 + ${csD}.`, explanation: `The checksum is ${csD}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the checksum that the receiver finds.", value: csRecvD, wrong: [csD], workedSolution: `1. ${recvD.join(" + ")} = ${sum(recvD)}.\n2. ${sum(recvD)} = 2 × 256 + ${csRecvD}.`, explanation: `The checksum is ${csRecvD}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State what the receiver should do and explain why.", points: ["Reject the data and ask for it to be sent again", "The two checksums differ, so the data has been changed or damaged and cannot be trusted"], modelAnswer: "Reject the data and ask for it to be sent again, because the checksums differ so the data was damaged.", explanation: "Mismatch means resend." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Which data protection principle does each action break?"],
    explanation: "Keeping data too long, using it for a different purpose and not securing it are all breaches of data protection principles.",
    stem: "A sports club in Masvingo keeps the names, phone numbers and medical details of its players. The club (1) keeps the details of players who left five years ago, (2) gives all the phone numbers to a company that sells sports clothing, and (3) stores the details in a file that any club member can open.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the principle of data protection that is broken in (1) and in (2).", points: ["(1) Data should be kept no longer than necessary", "(2) Data should be used only for the purpose for which it was collected"], modelAnswer: "(1) Data must not be kept longer than necessary. (2) Data must be used only for the purpose for which it was collected.", explanation: "Retention and purpose." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe two measures that would protect the data in (3).", points: ["Set access rights so that only the officials who need the data can open it", "Encrypt the file or protect it with a password so that others cannot read it"], modelAnswer: "Set access rights so that only the officials who need the data can open the file, and encrypt it or protect it with a password.", explanation: "Access rights and encryption." }),
    ] });
  b.card("DEFINITION", "Data security", "The protection of data from loss, damage, destruction and unauthorised access.");
  b.card("DEFINITION", "Data privacy", "The right to control who can see and use personal data.");
  b.card("DEFINITION", "Data integrity", "The accuracy, completeness and consistency of data; it is not wrongly changed by error or by an unauthorised person.");
  b.card("CONCEPT", "Data security against system security", "Data security protects the data itself; computer-system security protects the hardware, software and network.");
  b.card("CONCEPT", "Data protection principles", "Lawful and fair collection, stated purpose, only what is needed, accuracy, limited retention, safeguards.");
  b.card("CONCEPT", "Breach, error or loss", "Read without permission: privacy. Changed wrongly: integrity. Lost or destroyed: security (availability).");
  b.card("FORMULA", "Checksum", "The sum of the byte values modulo 256, calculated by sender and receiver and compared.");
  b.card("FACT", "Limit of a checksum", "Two errors can cancel out, so a matching checksum does not prove that the data is correct.");
});
