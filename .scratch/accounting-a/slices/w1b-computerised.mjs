// W1b: systems.computerised (Cambridge only, AS Level)
import { concept, P, money, fmt, check, chk, r2, sum, rd, table } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.systems.computerised", { file: "systems/computerised", keyPrefix: "systems.computerised" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an advantage of a computerised accounting system compared with a manual system?",
    right: ["A trial balance can be produced almost instantly", "Correct: the software posts and totals automatically."],
    wrong: [["It removes the need to check any of the source documents", "Source documents are still needed to verify what is keyed in."], ["It costs nothing to set up and maintain", "Hardware, software and training have costs."], ["It continues to work during a power cut", "A computer depends on electricity unless a backup supply is installed."]],
    explanation: "Speed of producing reports is a main advantage; cost, dependence and training are disadvantages.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which control best protects accounting data against loss caused by hardware failure or fire?",
    right: ["Regular backups kept at a different location", "Correct: a copy can be restored."],
    wrong: [["Passwords that are changed for every user each month", "Passwords restrict access but do not restore lost data."], ["An up-to-date firewall on the office network", "A firewall protects against external attack, not loss through failure."], ["Access levels set for each member of staff", "Access levels control who may do what; they do not restore data."]],
    explanation: "A backup stored away from the original can be used to restore the data.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of giving staff different access levels in a computerised system?",
    right: ["To limit each user to the tasks that match their job", "Correct: it reduces the risk of error and fraud."],
    wrong: [["To make the system run faster", "Access levels do not affect speed."], ["To make backups unnecessary", "Backups are still needed."], ["To record the old and new values of every change made", "That is the purpose of an audit trail."]],
    explanation: "Access levels support segregation of duties and prevent unauthorised actions.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What does an audit trail record?",
    right: ["Who entered or changed an item, when, and what the old and new values were", "Correct."],
    wrong: [["Only the control total of all the transactions entered in a month", "That is a control total, not an audit trail."], ["The passwords chosen by each user so that they can be recovered", "Passwords should never be recorded in the clear."], ["A second copy of the data kept for use after a system failure", "That is a backup."]],
    explanation: "An audit trail makes it possible to trace changes and investigate suspected fraud.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A bookkeeper keys in a supplier invoice for US\\$4,500 instead of US\\$450 and the system posts it. Which statement is correct?",
    right: ["The system posts the wrong amount, as it cannot tell that it is wrong", "Correct: garbage in, garbage out."],
    wrong: [["The system will always detect the error because debits equal credits on both sides", "Both sides of the entry are posted with the same wrong amount."], ["The trial balance will disagree", "An error of original entry leaves the trial balance in agreement."], ["The audit trail will correct the figure automatically", "An audit trail records changes; it does not correct them."]],
    hints: ["What can the software check, and what can it not check?"],
    explanation: "Validation checks can reject impossible data, but a plausible wrong amount is posted as entered.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business sends accounting data to its bank over the internet. Which measure best protects the data from being read by an outsider?",
    right: ["Encryption of the data", "Correct: encrypted data is unreadable without the key."],
    wrong: [["A backup of the data on a USB drive", "A backup helps recovery but does not stop interception."], ["A larger hard disk", "Storage size has no effect on security."], ["Physical locks on the office door", "These do not protect data in transit."]],
    hints: ["Which measure makes intercepted data useless?"],
    explanation: "Encryption scrambles data so that interception does not reveal it.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which set of access rights is most suitable for a bookkeeper in a computerised accounting system?",
    right: ["Enter transactions, but not approve payments or change supplier bank details", "Correct: recording is separated from approval."],
    wrong: [["Enter transactions, approve payments and change supplier bank details", "One person could create and pay a false invoice."], ["Approve payments only, with no right to enter transactions", "The bookkeeper's job is to enter transactions."], ["Change supplier bank details and approve payments, but not enter transactions", "That combination allows payments to be redirected."]],
    hints: ["Think of segregation of duties."],
    explanation: "Separating entering, approving and master data changes reduces the risk of fraud.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A small shop in a town with frequent power cuts is considering a computerised system. Which action would most reduce the main risk?",
    right: ["Back up data regularly and keep manual records until power returns", "Correct: it protects against both loss of data and downtime."],
    wrong: [["Adding a password to every report produced by the system", "Passwords do not protect against power cuts."], ["Allowing all of the staff to change any of the accounts without approval", "This increases the risk of error and fraud."], ["Buying a second copy of the same accounting software", "A second copy of software does not help if there is no power."]],
    hints: ["What is the risk the stem highlights?"],
    explanation: "Power cuts risk both lost data and stopped work, so backups and a fallback procedure are needed.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A computerised accounting system removes the need to keep source documents such as invoices and receipts.",
    answer: false,
    hints: ["How can an entry be checked after it is keyed in?"],
    explanation: "False. Source documents are still needed to check the data and to provide evidence.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Backup copies of accounting data should be kept in a different place from the original.",
    answer: true,
    explanation: "True. A fire or theft could otherwise destroy both the original and the backup.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each security measure to the main risk it addresses.",
    pairs: [["Passwords and access levels", "Unauthorised access to the system"], ["Backups kept off-site", "Loss of data through failure, fire or theft"], ["Encryption", "Interception of data during transmission"], ["Anti-virus software", "Damage from malicious software"], ["Audit trail", "Unauthorised or undetected changes to records"]],
    explanation: "Each control is aimed at a particular risk.",
  });

  // --- Fill in the blank
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the definitions.",
    template: "A {{blank:a}} is a copy of data stored separately so that it can be restored. An {{blank:b}} records who made each change and when.",
    blanks: [
      { id: "a", accepted: ["backup"], choices: ["backup", "firewall", "password"] },
      { id: "b", accepted: ["audit trail"], choices: ["audit trail", "access level", "encryption key"] },
    ],
    explanation: "Backups allow recovery; the audit trail allows investigation.",
  });

  // --- Numerical
  const n1 = { man: 3 * 280 * 12, comp: 280 * 12 + 3000 / 5 + 420 + 150 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.man - n1.comp, 5550), wrong: [n1.man, r2(n1.man - 280 * 12)],
    stem: `Sipho's pharmacy in Chinhoyi employs three clerks at ${money(280)} a month each on a manual system. A computerised system would need one clerk at ${money(280)} a month, and would cost ${money(3000)} for hardware and software (depreciated over 5 years), ${money(420)} a year for licences and ${money(150)} a year for backup storage. Calculate the annual saving from changing to the computerised system.`,
    hints: ["Work out the annual cost of each system first."],
    explanation: "Manual: 3 × 280 × 12 = 10,080. Computerised: 3,360 + 600 + 420 + 150 = 4,530. Saving = 5,550.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", dp: 1,
    value: ((360 - 45) / 360) * 100, wrong: [45 / 360 * 100, (360 - 45) / 45 * 100],
    stem: "Rudo's shop took 6 hours to produce its month-end reports manually. The computerised system produces them in 45 minutes. Calculate the percentage reduction in time, to one decimal place.",
    explanation: "6 hours = 360 minutes. Reduction = (360 − 45) ÷ 360 × 100 = 87.5%.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the record kept by a computerised system that shows who made each entry or change and when it was made.",
    accepted: ["audit trail", "the audit trail", "an audit trail", "audit log"],
    explanation: "The audit trail records who, when and what changed.",
  });

  // --- Self-marked
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of using a computerised accounting system instead of a manual system.",
    points: ["Speed: transactions are posted and reports produced quickly", "Explained: managers have up-to-date information for decisions", "Accuracy: the software prevents arithmetic errors and one-sided entries", "Explained: fewer errors to find and correct, so the accounts are more reliable"],
    modelAnswer: "A computerised system posts transactions and produces a trial balance and statements almost at once, so managers have up-to-date information. It also prevents arithmetic errors and one-sided entries, so there are fewer errors to find and the accounts are more reliable.",
    explanation: "State each advantage and explain its benefit.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** disadvantages for a small business of changing to a computerised accounting system.",
    points: ["Cost of hardware, software and upkeep", "Explained: a small business may find it hard to fund these costs", "Dependence on electricity and equipment (system failure)", "Explained: work and access to records stop when the system or power fails"],
    modelAnswer: "The hardware, software and licences are expensive, which may be hard for a small business to fund. The business also depends on electricity and equipment, so work and access to records stop if the system or the power fails.",
    hints: ["One about cost, one about dependence or training."],
    explanation: "State each disadvantage and explain its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A bakery in Gweru keeps its accounts on a computer. Explain **two** measures it should take to keep its accounting data secure.",
    points: ["Passwords and access levels for each user", "Explained: only authorised people can enter or change data", "Regular backups kept away from the premises", "Explained: data can be restored after loss through failure, fire or theft"],
    modelAnswer: "Each user should have a password and access levels so that only authorised staff can enter or change data. The bakery should also make regular backups and keep a copy away from the premises, so the data can be restored if the computer fails or is stolen.",
    hints: ["Link each measure to the risk it deals with."],
    explanation: "Any two valid measures, each linked to a risk.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Chipo owns a tuck shop with a single employee and about thirty transactions a day. Evaluate whether she should change from a manual system to a computerised accounting system.",
    points: ["Benefit: quicker records and reports, fewer arithmetic errors", "Benefit: easier to see inventory, receivables and sales trends", "Cost: hardware, software and training are expensive relative to the size of the business", "Risk: power cuts, system failure and data loss; backups are needed", "Judgement relevant to the size of the business (for example that the volume may not justify the cost yet)", "Recommendation with a reason, or a condition such as starting with low-cost software"],
    modelAnswer: "A computerised system would give quicker records and fewer arithmetic errors and make it easier to see sales and inventory trends. However, with one employee and about thirty transactions a day the volume is small, so the cost of hardware, software and training may not be justified, and power cuts and data loss add risk. Chipo should keep the manual system for now, or start with low-cost software and regular backups if she expects the business to grow.",
    hints: ["Weigh the benefits against the costs and risks for a business of this size."],
    explanation: "A balanced evaluation uses the size of the business to reach a recommendation.",
  });

  // --- Practice structured 1 (8 marks)
  const s1 = { clerks: 2, pay: 260, comp: 2600, life: 4, lic: 360, train: 400 };
  const s1man = s1.clerks * s1.pay * 12 + 180;
  const s1cmp = 1 * s1.pay * 12 + s1.comp / s1.life + s1.lic + s1.train / s1.life + 90;
  const s1save = r2(s1man - s1cmp);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha runs a hardware shop in Mutare that uses a manual system with two clerks paid ${money(s1.pay)} a month each and ${money(180)} a year for ledgers and stationery. She is considering a computerised system with one clerk. Hardware and software cost ${money(s1.comp)} and will last ${s1.life} years. Licences cost ${money(s1.lic)} a year, training costs ${money(s1.train)} (spread over ${s1.life} years) and backup storage costs ${money(90)} a year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1save, wrong: [s1man, r2(s1man - s1cmp + s1.pay * 12)], stem: "Calculate the estimated annual saving from the computerised system.", explanation: `Manual: 2 × 260 × 12 + 180 = ${fmt(s1man)}. Computerised: 3,120 + 650 + 360 + 100 + 90 = ${fmt(s1cmp)}. Saving ${fmt(s1save)}.` }),
      P.manual({ label: "(b)", marks: 3, stem: "State and explain **two** controls Nyasha should use to protect the accounting data.", points: ["First control (for example passwords and access levels)", "Second control (for example backups kept elsewhere)", "Each linked to the risk it deals with"], modelAnswer: "Passwords and access levels so that only authorised staff can enter or change data, and regular backups kept off the premises so the data can be restored after loss.", explanation: "Any valid pair of controls, each with the risk." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **two** non-financial factors Nyasha should consider before deciding.", points: ["Reliability of power and equipment (system failure)", "Staff skills and the training needed", "Security risks such as hacking or unauthorised access"], modelAnswer: "She should consider whether electricity is reliable enough, since a power cut would stop work, and whether her clerk can be trained to use the system.", explanation: "Any two valid non-financial factors." }),
    ],
    hints: ["Annual cost of the computer = clerk + depreciation + licence + training share + backup."],
    explanation: "This item practises a cost comparison and the controls over a computerised system.",
  });

  // --- Practice structured 2 (10 marks)
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: `A wholesale business in Bulawayo uses a computerised system. Part of the audit trail for Friday night and Saturday morning shows:\n\n${table(["Time", "User", "Action", "Detail"], [["Fri 21:40", "User K", "Changed the delivery address of a customer", "New address in another town"], ["Fri 21:42", "User K", "Raised a credit note", `US\\$3,200 to the same customer`], ["Sat 07:05", "Supervisor", "Approved credit notes of the week", "Included the credit note above"], ["Sat 07:30", "User M", "Entered purchases", "Normal range"]], ["l", "l", "l", "l"])}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which entry in the audit trail is most suspicious?", options: [["A change of customer address, then a large credit note by the same user, late at night", "Correct: the combination suggests an attempt to hide or benefit from a false credit."], ["User M entering purchases within the normal range of amounts", "Normal activity."], ["The supervisor approving all of the week's credit notes together in one batch on Saturday morning", "Approval is a normal control, though the checks may be inadequate."], ["The system recording the time of each action it performs", "Recording time is the purpose of the audit trail."]], answer: "A", explanation: "A change of customer details and a large credit note by the same user late at night is a red flag." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain what the audit trail shows about the control weaknesses in this business.", points: ["User K could change customer details and raise a credit note, so duties were not separated", "The credit note was approved in a weekly batch, so approval may not have been checked in detail", "The audit trail allows the business to trace who made each change and when"], modelAnswer: "User K could both change customer details and raise a credit note, so duties were not separated. The supervisor approved the credit notes in a batch, so the large credit note may not have been checked. The audit trail does show who did what and when, which allows the business to investigate.", explanation: "Link the entries to access levels and approval." }),
      P.manual({ label: "(c)", marks: 4, stem: "Recommend **two** changes to the system or procedures to reduce the risk of fraud. Justify each.", points: ["Restrict access so that one person cannot change customer details and raise credit notes", "Justification: separating the duties makes it harder to hide a false credit", "Require approval of each credit note above a limit, with supporting documents", "Justification: a manager checks the reason before the credit is applied"], modelAnswer: "Access levels should stop one user changing customer details and raising credit notes, so that duties are separated and a false credit is harder to hide. Each credit note above a set amount should be approved with supporting documents, so a manager checks the reason before the credit is applied.", explanation: "Two controls, each justified." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain one limitation of relying on the audit trail to prevent fraud.", points: ["The audit trail records what happened after the event; it does not prevent it", "It needs someone to review it regularly, or the suspicious entries may not be noticed"], modelAnswer: "The audit trail shows what happened after the event and does not prevent it. It is useful only if someone reviews it regularly.", explanation: "An audit trail detects; it does not prevent." }),
    ],
    hints: ["Think about who can do what in the system.", "A control that detects is different from a control that prevents."],
    explanation: "This item practises interpreting an audit trail and recommending controls.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Computerised accounting system", "Software that records transactions, posts them to the ledgers automatically and produces reports.");
  b.card("FACT", "Advantages of a computerised system", "Speed, accuracy of arithmetic, reports on demand, easy storage and retrieval, fewer staff for routine tasks.");
  b.card("FACT", "Disadvantages of a computerised system", "Cost, training, dependence on power and equipment, hacking and viruses, system failure.");
  b.card("DEFINITION", "Access levels", "Different rights given to different users so that each can do only the tasks needed for their job.");
  b.card("DEFINITION", "Backup", "A copy of data stored separately (ideally off-site) so it can be restored.");
  b.card("DEFINITION", "Audit trail", "A record of who entered or changed each item, when, and the old and new values.");
  b.card("FACT", "Standard data security controls", "Passwords and access levels, backups, encryption, firewalls, anti-virus software, audit trails, physical security.");
  b.card("CONCEPT", "Garbage in, garbage out", "The system posts incorrect data accurately; validation checks reduce but do not remove keying errors.");
  b.card("CONCEPT", "Why use access levels?", "To separate duties (entering, approving, changing master data) and reduce the risk of fraud.");
});
