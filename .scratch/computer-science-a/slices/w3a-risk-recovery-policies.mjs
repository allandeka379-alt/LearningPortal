// Slice w3a: acs.security.risk-recovery-policies (ZIMSEC only, Form 5). Calculators are allowed.
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";
import { band } from "../tables/w3a-risk-recovery-policies.mjs";

// Risk register for the questions (not the lesson's)
const reg = [
  ["Ransomware attack", 3, 5],
  ["Lightning strike on the school", 2, 4],
  ["Learner unplugging cables", 5, 1],
  ["Theft of a tablet", 4, 3],
  ["Failure of the hard disk", 3, 4],
].map(([name, l, i]) => ({ name, l, i, score: l * i, band: band(l * i) }));
same(reg.map((r) => r.score), [15, 8, 5, 12, 12]);
same(reg.map((r) => r.band), ["High", "Medium", "Low", "Medium", "Medium"]);
const regMd = mdTable(["Risk", "Likelihood (1-5)", "Impact (1-5)"], reg.map((r) => [r.name, r.l, r.i]));
// Backup numbers: full 30 GB on Sunday, incremental 3 GB on each other day, kept for 3 weeks
const planStorage = 3 * 30 + 3 * 6 * 3;
chk(planStorage, 144);
const allFull = 3 * 7 * 30;
chk(allFull, 630);
// Restore after a failure on Wednesday morning: Sunday full + Monday and Tuesday incrementals
const restoreGB = 30 + 2 * 3;
chk(restoreGB, 36);
const restoreSecs = (restoreGB * 1024) / 150; // 150 MB per second
chk(restoreSecs, 245.76, 1e-6);
// Downtime loss
const perHour = 80;
const hours = 5;
const perYear = 3;
const lossYear = perHour * hours * perYear;
chk(lossYear, 1200);
// Insurance premium comparison: premium US$90 a year covers a loss of US$450 once every 3 years on average
const expectedLossYear = 450 / 3;
chk(expectedLossYear, 150);

concept("acs.security.risk-recovery-policies", { file: "security/risk-recovery-policies", keyPrefix: "security.risk-recovery-policies" }, (b) => {
  mc(b, 1, "RECALL", "What two things decide how serious a risk is?",
    ["How likely it is to happen and how large its impact would be", "Correct."],
    [["How much the equipment cost and how old it is", "Cost and age may matter but they do not define the risk."], ["Who wrote the security policy and when", "The author of a policy does not decide the seriousness."], ["How fast the computer is and how big its disk is", "Speed and capacity do not measure risk."]],
    "Risk depends on likelihood and impact.");
  mc(b, 2, "APPLICATION", "A school buys insurance to pay for replacement computers if they are stolen. Which risk management technique is this?",
    ["Transfer", "Correct: the financial loss is passed to the insurer."],
    [["Avoid", "The school still keeps the computers, so the activity is not avoided."], ["Accept the risk", "The school has taken a step to cover the loss."], ["Reduce", "Insurance does not make theft less likely."]],
    "Insurance transfers the financial effect of a risk.", { daily: true });
  mc(b, 2, "APPLICATION", "A clinic decides not to put its server in a basement room that has flooded before, and places it on an upper floor. Which technique is this?",
    ["Avoid", "Correct: the risky location is not used."],
    [["Transfer", "Nobody else is taking over the loss."], ["Accept the risk", "The clinic is acting against the risk."], ["Insure", "Insurance is a form of transfer and is not in this scenario."]],
    "Avoiding a risk removes the cause of the risk.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does an incremental backup copy?",
    ["Only the data that has changed since the last backup", "Correct."],
    [["Everything on the disk every time", "That is a full backup."], ["Only the operating system", "An incremental backup is not limited to the operating system."], ["Only the files that are larger than one gigabyte in size", "File size is not the rule."]],
    "Incremental backups save time and storage.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Which alternative site recovers fastest after a disaster, at the highest cost?",
    ["A hot site", "Correct: it is fully equipped and has up-to-date data."],
    [["A warm site", "A warm site has equipment but needs data restored."], ["A cold site", "A cold site has only space and power."], ["An off-site tape cabinet", "A store of copies is not a site where work can start."]],
    "Hot sites are the fastest and the most expensive.", { hints: ["Which site is already running with current data?"] });
  mc(b, 3, "ANALYSIS", "Why should a disaster recovery plan include regular tests of restoring from the backups?",
    ["A backup that has never been restored may be damaged or incomplete, and staff must know the procedure", "Correct."],
    [["Restoring tests make the backup files smaller", "Testing does not change the size of files."], ["A restore test stops malware from entering", "Tests do not protect against malware."], ["Test restores are required by the warranty of every computer that the school buys", "Warranties do not require this."]],
    "A tested restore proves that the backup is usable.", { hints: ["How does the school know the backup works?"] });
  mc(b, 3, "UNDERSTANDING", "Which item belongs in an organisation's security policy rather than in the details of its backup schedule?",
    ["Rules on what staff may do on the internet (acceptable use)", "Correct."],
    [["The time of day when each night's backup starts and finishes", "That is a detail of the backup schedule."], ["The size of each incremental backup", "That is a detail of the backup schedule."], ["The make of the backup disks", "That is a detail of the backup equipment."]],
    "Acceptable use is a policy item.", { hints: ["Which one is about the behaviour of people?"] });
  mc(b, 4, "EVALUATION", "Which organisation is most likely to pay for a hot site?",
    ["A bank whose customers cannot be served when its systems are down", "Correct: the cost of lost service is very high."],
    [["A small school that uses its computers only for typing notes and printing", "The school can wait several days at little cost."], ["A person who keeps holiday photographs on one laptop", "The cost of a hot site is far greater than the loss."], ["A club that updates a web page once a month", "A short outage would cost almost nothing."]],
    "A hot site is worth its cost only when downtime is very expensive.", { hints: ["Compare the cost of a hot site with the cost of downtime."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Accepting a risk means ignoring it without any analysis or plan.", answer: false, explanation: "False. Accepting a risk is a decision made after analysis, when the risk is small or the cost of reducing it is too high; the organisation still keeps a plan." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each risk management technique to an example.",
    pairs: [["Avoid", "Not storing patient records on a laptop that leaves the clinic"], ["Reduce", "Installing anti-malware software and training staff"], ["Transfer", "Taking out insurance on the computers"], ["Accept the risk", "Deciding that the very small risk of a flood needs no extra spending"]],
    explanation: "Each technique deals with the risk in a different way." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about recovery.", hints: ["Think about speed and cost."],
    template: "A {{blank:a}} backup copies everything, and an {{blank:b}} backup copies only changes. A {{blank:c}} site is the slowest and cheapest alternative site to start work in.",
    blanks: [
      { id: "a", accepted: ["full"], choices: ["full", "partial", "random", "daily only"] },
      { id: "b", accepted: ["incremental"], choices: ["incremental", "complete", "mirror only", "hot"] },
      { id: "c", accepted: ["cold"], choices: ["cold", "hot", "warm", "mirror"] },
    ], explanation: "Full, incremental, cold." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of alternative site that offers only space, power and network connections, with all the equipment to be brought in.",
    accepted: ["cold site", "a cold site", "cold"], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: ["hot site"], explanation: "A cold site." });
  b.num({ d: 2, skill: "APPLICATION", hints: ["Score = likelihood × impact."],
    stem: "A risk has a likelihood of 4 and an impact of 5, each on a scale of 1 to 5. Calculate the risk score using likelihood × impact.",
    value: 20, wrong: [9, 25], workedSolution: "1. Score = 4 × 5 = 20.", explanation: "4 × 5 = 20, which is in the High band (15 to 25)." });
  b.num({ d: 3, skill: "APPLICATION", unit: "GB", hints: ["Three full backups plus 18 incremental backups."],
    stem: "A school makes a full backup of 30 GB every Sunday and an incremental backup of 3 GB on each of the other six days. It keeps three weeks of backups. Calculate the total storage needed.",
    value: planStorage, wrong: [30 + 3, 3 * 30 + 3 * 7 * 3], workedSolution: `1. Full backups: 3 × 30 = 90 GB.\n2. Incremental backups: 3 weeks × 6 days × 3 GB = 54 GB.\n3. Total = 90 + 54 = ${planStorage} GB.`, explanation: `90 + 54 = ${planStorage} GB.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Loss per outage = hourly loss × hours, then multiply by the number of outages."],
    stem: `A shop loses US\\$${perHour} of sales for each hour its system is down. A fault stops work for ${hours} hours and this happens ${perYear} times a year. Calculate the loss in a year.`,
    value: lossYear, wrong: [perHour * hours, perHour * perYear], workedSolution: `1. Loss per fault = ${perHour} × ${hours} = US\\$${perHour * hours}.\n2. Loss per year = ${perHour * hours} × ${perYear} = US\\$${lossYear}.`, explanation: `US\\$${perHour * hours} × ${perYear} = US\\$${lossYear}.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each technique and give a school example."],
    stem: "A school wants to protect its computers against power surges. State two risk management techniques it could use, with an example of each. [4]",
    points: ["Reduce: fit surge protectors or an uninterruptible power supply", "Explanation of how this reduces the damage or downtime", "Transfer: insure the equipment so that the insurer pays for damage", "Explanation: the financial loss is passed to the insurance company"],
    modelAnswer: "Reduce the risk by fitting surge protectors or an uninterruptible power supply so that equipment is not damaged and work continues. Transfer the risk by insuring the equipment, so that the insurance company pays for any damage.",
    explanation: "Any two techniques with examples." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about what is copied, where it is kept and how it is tested."],
    stem: "Describe four parts of a disaster recovery plan for a school's computer system. [4]",
    points: ["A backup schedule saying what is copied and how often", "Copies kept off-site or in the cloud", "A procedure for restoring the system, which is tested regularly", "An alternative site or equipment and named people with roles"],
    modelAnswer: "A backup schedule saying what is copied and how often; copies kept off-site or in the cloud; a restore procedure that is tested regularly; and an alternative site or equipment with named people responsible.",
    explanation: "Any four parts of a plan." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 3, hints: ["Think of rules for people."],
    stem: "State three items that a security policy of a school should contain. [3]",
    points: ["Acceptable use of computers and the internet", "Access control, such as passwords and who may use which system", "Incident response or staff training, or data handling"],
    modelAnswer: "Rules on acceptable use of computers and the internet, rules on access control and passwords, and how to report and respond to an incident.",
    explanation: "Any three policy items." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Give two advantages and two disadvantages."],
    stem: "A school considers keeping its backups with a cloud service. Evaluate this choice. [4]",
    points: ["Advantage: the copy is off-site and survives fire, flood or theft at the school", "Advantage: backups can be automatic and restored from anywhere with a connection", "Disadvantage: it needs a reliable and affordable internet connection, which may be slow or costly", "Disadvantage: the data is held by another company, so privacy and security must be agreed"],
    modelAnswer: "The copy is off-site, so it survives fire or theft, and backups can be automatic and restored from anywhere. However, it needs a reliable and affordable internet connection and the data is held by another company, so privacy and security have to be agreed.",
    explanation: "Two advantages and two disadvantages." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Score = likelihood × impact. Use the bands in the lesson: Low 1 to 5, Medium 6 to 12, High 15 to 25."],
    explanation: `The scores are ${reg.map((r) => `${r.name}: ${r.score}`).join(", ")}.`,
    stem: `A school in Mutare scores five risks. Each likelihood and impact is on a scale of 1 to 5.\n\n${regMd}\n\nThe score is likelihood × impact. A score of 1 to 5 is Low, 6 to 12 is Medium and 15 to 25 is High.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the score for the ransomware attack.", value: 15, wrong: [8, 5], workedSolution: "1. 3 × 5 = 15.", explanation: "3 × 5 = 15." }),
      P.short({ label: "(b)", marks: 1, stem: "State the level (Low, Medium or High) of the risk of a lightning strike.", accepted: ["medium"], normalise: ["trim", "lowercase"], wrong: ["low"], explanation: "2 × 4 = 8, which is Medium." }),
      P.short({ label: "(c)", marks: 1, stem: "Which risk has the lowest score?", accepted: ["learner unplugging cables", "learners unplugging cables", "unplugging cables"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["theft of a tablet"], explanation: "5 × 1 = 5." }),
      P.manual({ label: "(d)", marks: 3, stem: "The school decides to insure the tablets and to install anti-malware software. Name the technique used in each case.", points: ["Insuring the tablets: transfer", "Installing anti-malware software: reduce", "The technique is chosen by what it does to the risk (passes the loss on, or lowers the likelihood or impact)"], modelAnswer: "Insuring the tablets is transfer. Installing anti-malware software is reduce, because it makes a malware attack less likely.", explanation: "Transfer and reduce." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Add three full backups and eighteen incrementals.", "Restore needs the last full backup and the incrementals since it."],
    explanation: `Storage is ${planStorage} GB. A restore on Wednesday needs ${restoreGB} GB and takes ${restoreSecs} seconds at 150 MB per second.`,
    stem: "A college in Gweru makes a full backup of 30 GB every Sunday and an incremental backup of 3 GB on each of the other six days. It keeps three weeks of backups. Use 1 GB = 1024 MB.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the storage needed for the three weeks of backups.", unit: "GB", value: planStorage, wrong: [90, 630], workedSolution: `1. 3 × 30 = 90 GB.\n2. 3 × 6 × 3 = 54 GB.\n3. 90 + 54 = ${planStorage} GB.`, explanation: `${planStorage} GB.` }),
      P.num({ label: "(b)", marks: 2, stem: "The disk fails on Wednesday morning. Calculate how much data must be restored: the last full backup and the incrementals taken since.", unit: "GB", value: restoreGB, wrong: [30, 33], workedSolution: `1. Sunday full backup = 30 GB.\n2. Monday and Tuesday incrementals = 2 × 3 = 6 GB.\n3. Total = ${restoreGB} GB.`, explanation: `30 + 6 = ${restoreGB} GB.` }),
      P.num({ label: "(c)", marks: 2, stem: "Restoring runs at 150 MB per second. Calculate the time in seconds to restore the data in (b). Give your answer to the nearest second.", unit: "s", value: Math.round(restoreSecs), tol: 1, wrong: [restoreGB, 36864], workedSolution: `1. ${restoreGB} × 1024 = ${restoreGB * 1024} MB.\n2. ${restoreGB * 1024} ÷ 150 = ${restoreSecs} seconds, or ${Math.round(restoreSecs)} to the nearest second.`, explanation: `${restoreGB * 1024} MB ÷ 150 = ${restoreSecs} s.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one reason for using incremental backups on six days and a full backup only once a week.", points: ["An incremental backup copies only changed data, so it is quicker", "It uses much less storage than copying everything every day"], modelAnswer: "An incremental backup copies only changed data, so it is quicker and uses much less storage than a full backup every day.", explanation: "Time and storage." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Compare the yearly loss with the yearly cost."],
    explanation: `The expected yearly loss is US\\$${expectedLossYear}, more than the premium of US\\$90, so insurance is worth it.`,
    stem: "A clinic in Hwange is offered insurance for its laptops. The premium is US\\$90 a year. A theft that would cost US\\$450 to put right happens on average once every 3 years.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the average loss per year from theft.", unit: "US$", value: expectedLossYear, wrong: [450, 90], workedSolution: `1. 450 ÷ 3 = US\\$${expectedLossYear} per year.`, explanation: `450 ÷ 3 = ${expectedLossYear}.` }),
      P.manual({ label: "(b)", marks: 2, stem: "State the risk management technique that insurance is, and say whether it is worth buying.", points: ["Transfer", "It is worth buying because the average yearly loss (US\\$150) is more than the premium (US\\$90)"], modelAnswer: "Transfer. It is worth buying because the average loss of US\\$150 a year is more than the premium of US\\$90.", explanation: "Transfer and a comparison." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest a second measure that reduces the likelihood of theft.", points: ["A physical measure such as a lockable cabinet, cable lock or a locked room", "Explanation of how it makes theft harder"], modelAnswer: "A cable lock or lockable cabinet makes the laptops harder to remove.", explanation: "Physical security." }),
    ] });
  b.card("DEFINITION", "Risk", "The chance that a threat exploits a vulnerability, together with the harm that would result: judged by likelihood and impact.");
  b.card("CONCEPT", "Risk management techniques", "Avoid (remove the cause), reduce (lower likelihood or impact), transfer (pass the financial loss on, e.g. insurance), accept (live with a small risk).");
  b.card("FORMULA", "Risk score", "Score = likelihood × impact (each 1 to 5). Low 1-5, Medium 6-12, High 15-25 in this course.");
  b.card("DEFINITION", "Disaster recovery plan", "A documented plan to restore systems and data after a failure: backups, off-site copies, alternative site, tested restore and named roles.");
  b.card("CONCEPT", "Full and incremental backup", "Full copies everything; incremental copies only what changed since the last backup, using less time and storage. Restore needs the last full plus the incrementals.");
  b.card("CONCEPT", "Hot, warm and cold sites", "Hot: equipped and up to date, fastest and dearest. Warm: equipment but data to restore. Cold: space and power only, slowest and cheapest.");
  b.card("CONCEPT", "Contents of a security policy", "Acceptable use, access control, data handling, backup and recovery, incident response, training and discipline.");
  b.card("FACT", "Test the restore", "A backup that has never been restored may not work; plans are tested regularly.");
});
