// Slice w3b: backups and disaster recovery (comp.security.backup-recovery, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Restore plan: full backup on fullDay, incrementals every other day; failure on failDay before that day's backup.
function restoreSets(fullDay, failDay) {
  const sets = [DAYS[fullDay]];
  for (let d = (fullDay + 1) % 7; d !== failDay; d = (d + 1) % 7) sets.push(DAYS[d]);
  return sets;
}
const q1 = restoreSets(0, 5); // full Sunday, fail Friday before Friday's backup
if (q1.join() !== "Sunday,Monday,Tuesday,Wednesday,Thursday") throw new Error("q1");
const s1 = restoreSets(6, 3); // full Saturday, fail Wednesday
if (s1.length !== 4) throw new Error("s1");

// Storage: a full backup copies every file; incrementals copy changes.
const fullGiB = 40;
const dailyChangeGiB = 3;
const weekStorage = fullGiB + 6 * dailyChangeGiB; // one full + six incrementals
const weekAllFull = 7 * fullGiB;

concept("comp.security.backup-recovery", { file: "security/backup-recovery", keyPrefix: "security.backup-recovery" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **incremental** backup?",
    options: [
      ["A copy of only the files changed since the last backup", "Correct: incrementals copy just the changes."],
      ["A copy of every selected file each time it runs", "That is a full backup."],
      ["A copy kept in a different building from the original", "That describes off-site storage, not a backup method."],
      ["A copy of old files moved off the main system for storage", "That is archiving."],
    ],
    answer: "A",
    explanation: "An incremental backup copies only the files that have changed since the previous backup.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should at least one backup be kept **off-site**?",
    options: [
      ["So it survives a fire, flood or theft at the main site", "Correct: an on-site copy can be lost in the same disaster."],
      ["So that backups run faster than they would on-site", "Off-site copies are usually slower to make and fetch."],
      ["So that no password is needed to restore the data", "Off-site backups should still be protected."],
      ["So that the original files never need to be saved", "Originals are still saved; backups are extra copies."],
    ],
    answer: "A",
    explanation: "A disaster that destroys the original is likely to destroy any backup in the same building too.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of a **full** backup compared with an incremental backup?",
    options: [
      ["Data can be restored from a single backup set", "Correct: no chain of incrementals is needed."],
      ["It takes less time to make each backup", "Full backups take the longest to make."],
      ["It uses less storage space on the backup media", "Full backups use the most storage."],
      ["It copies only the files that have just changed", "That describes an incremental backup."],
    ],
    answer: "A",
    explanation: "A full backup contains everything, so restoring needs only that one set.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which item belongs in a **disaster recovery plan**?",
    options: [
      ["The steps and people responsible for restoring systems", "Correct: recovery procedures and roles are central to the plan."],
      ["The company's advertising budget for next year", "Marketing plans are not part of disaster recovery."],
      ["The colour scheme of the company website", "This has nothing to do with recovering from a disaster."],
      ["A list of the staff's favourite websites at work", "Not relevant to recovery."],
    ],
    answer: "A",
    explanation: "A disaster recovery plan includes risks, backup policy, recovery procedures, responsibilities, alternative arrangements and testing.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What happens to the free space after a file is deleted?"],
    stem: "Tatenda accidentally deletes a folder and empties the recycle bin. Why should he stop using the disk before running file recovery software?",
    options: [
      ["New data could overwrite the space where the deleted files still are", "Correct: deleted data stays until its space is reused."],
      ["Recovery software only works on a disk that is completely full", "Recovery works on any disk; fullness is not required."],
      ["Using the disk will automatically restore the files from a backup", "No backup is restored without being asked."],
      ["The operating system wipes deleted files after ten minutes", "Files are not wiped on a timer."],
    ],
    answer: "A",
    explanation: "Deleting usually only marks the space as free. Recovery software can rebuild the files unless new data has overwritten them.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Ransomware may encrypt any drive connected to the computer."],
    stem: "A company's computers are hit by ransomware that encrypts every connected drive. Which backup is **most likely** to be usable?",
    options: [
      ["A cloud or off-site copy not connected at the time", "Correct: a disconnected copy cannot be encrypted by the ransomware."],
      ["An external disk left permanently plugged into the server", "A connected disk is likely to be encrypted too."],
      ["A second folder on the same hard disk", "This is encrypted along with the original."],
      ["The recycle bin on the infected computer", "The recycle bin is on the infected disk."],
    ],
    answer: "A",
    explanation: "Backups kept off-site or disconnected cannot be reached by malware on the network, so they survive.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Balance backup time, storage and safety."],
    stem: "A small clinic changes about 2% of its data each day. Which backup strategy is **most** suitable?",
    options: [
      ["Weekly full and daily incremental backups, with a copy in the cloud", "Correct: fast daily backups, little storage, and an off-site copy."],
      ["A full backup once a year to a disk kept in the reception desk", "Too infrequent, and stored on-site where it can be lost."],
      ["Daily full backups to a second folder on the same computer", "Slow, wasteful and lost if the disk fails."],
      ["No backups, because the data changes so little each day", "Even small daily changes would be lost after a failure."],
    ],
    answer: "A",
    explanation: "With little daily change, incrementals are quick and small; a weekly full backup keeps restores manageable; the cloud copy is off-site.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "To restore data from incremental backups you need the last full backup and every incremental backup made after it.",
    answer: true,
    explanation: "True. Each incremental holds only the changes since the previous backup, so the whole chain is needed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Once backups are scheduled, there is no need to test them.",
    answer: false,
    explanation: "False. Backups should be tested by restoring sample files; a backup that cannot be restored is useless.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each backup location to a disadvantage.",
    pairs: [
      ["External disk on the same desk", "Lost in the same fire or theft as the computer"],
      ["Cloud backup service", "Needs a reliable internet connection"],
      ["Disks kept at another branch", "Takes time to fetch when a restore is needed"],
    ],
    explanation: "On-site copies share the same risks; cloud needs internet; off-site disks are slow to fetch.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Which tool fits each situation?"],
    stem: "Match each problem to the most suitable recovery tool.",
    pairs: [
      ["A file was deleted an hour ago and the bin has not been emptied", "Restore it from the recycle bin"],
      ["A new driver has made the computer unstable", "Roll back to a system restore point"],
      ["The server's disk has failed completely", "Restore the backup onto a new disk"],
      ["A deleted photo is needed and there is no backup", "Run file recovery software"],
    ],
    explanation: "Recycle bin for recent deletions; restore point for system changes; backup for failed disks; recovery software when no backup exists.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Start from the last full backup."],
    stem: `A full backup is made every Sunday night and an incremental backup every other night. The server fails on Friday afternoon, before Friday's backup. Complete the restore plan.`,
    template: `First restore the full backup from {{blank:a}}, then the incremental backups from Monday to {{blank:b}}. In total, {{blank:c}} backup sets are restored.`,
    blanks: [
      { id: "a", accepted: [q1[0]], choices: ["Sunday", "Thursday", "Friday", "Monday"] },
      { id: "b", accepted: [q1[q1.length - 1]], choices: ["Wednesday", "Thursday", "Friday", "Saturday"] },
      { id: "c", accepted: [String(q1.length)], input: "number" },
    ],
    explanation: `Restore ${q1.join(", ")}: ${q1.length} sets (1 full + ${q1.length - 1} incremental).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["One full backup plus six incrementals."],
    stem: `A business's files total ${fullGiB} GB. About ${dailyChangeGiB} GB changes each day. It makes one full backup each week and an incremental backup on each of the other six days. How many GB of backup storage does one week need?`,
    value: weekStorage, unit: "GB",
    wrong: [weekAllFull],
    explanation: `${fullGiB} + 6 × ${dailyChangeGiB} = ${weekStorage} GB (seven full backups would need ${weekAllFull} GB).`,
    workedSolution: `1. Full backup: ${fullGiB} GB.\n2. Six incrementals: 6 × ${dailyChangeGiB} = ${6 * dailyChangeGiB} GB.\n3. Total: ${fullGiB} + ${6 * dailyChangeGiB} = ${weekStorage} GB.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of hardware, people, malware and nature."],
    stem: "State **four** different causes of data loss.",
    points: [
      "Hardware failure (e.g. hard disk crash)",
      "Malware (e.g. ransomware, viruses)",
      "Human error (accidental deletion or overwriting)",
      "Theft / fire / flood / power surge or cut",
    ],
    explanation: "Data can be lost through hardware failure, malware, human error, theft and natural or electrical disasters.",
    modelAnswer: "A hard disk crash; ransomware encrypting the files; a user deleting the wrong folder; a fire destroying the office.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["What, when, where, and how it is checked."],
    stem: "Recommend a backup strategy for a secondary school's administration office and justify each part.",
    points: [
      "Method: e.g. weekly full plus daily incremental, so backups are quick but restores manageable",
      "Frequency / timing: automatic, every night when the office is closed",
      "Location: a copy off-site or in the cloud (encrypted), so a fire or theft does not destroy it",
      "Testing: restore sample files regularly to prove the backups work",
    ],
    explanation: "A strong answer covers method, frequency, location and testing, each with a reason.",
    modelAnswer: "Run a full backup every Friday night and an incremental backup every other night, automatically, so little work is lost. Keep an encrypted copy in a cloud backup service so it survives a fire or burglary. Each month, restore a sample folder to prove the backups work.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Count the full backup and each incremental after it.", "Off-site copies survive local disasters."],
    stem: `Masvingo Motor Spares (fictional) makes a full backup every ${DAYS[6]} night and an incremental backup on the other nights, to an external disk kept beside the server.`,
    parts: [
      P.num({
        label: "(a)", stem: `The server fails on ${DAYS[3]} morning. How many backup sets must be restored?`,
        value: s1.length, wrong: [1],
        explanation: `${s1.join(", ")}: ${s1.length} sets.`,
        workedSolution: `1. Last full backup: ${s1[0]}.\n2. Incrementals after it: ${s1.slice(1).join(", ")}.\n3. Total: ${s1.length}.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which incremental backup is restored **last**?",
        options: [[s1[s1.length - 1], "Correct: the most recent incremental is restored last."], [s1[0], "That is the full backup, restored first."], [DAYS[3], "No backup had been made on the day of failure."], [s1[1], "This is the first incremental, not the last."]],
        answer: "A", explanation: `Incrementals are restored oldest first, ending with ${s1[s1.length - 1]}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why keeping the backup disk beside the server is a weakness, and suggest an improvement.",
        points: ["Fire, flood or theft would destroy / remove the backup together with the server", "Keep a copy off-site or in the cloud (encrypted)"],
        modelAnswer: "A fire or burglary in the server room would destroy both the server and the backup. A second, encrypted copy should be kept in the cloud or taken off-site.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "State **two** items, other than the backup schedule, that the shop's disaster recovery plan should contain.",
        points: ["One item (e.g. risk assessment / recovery procedures / roles and contacts)", "A second item (e.g. alternative equipment or site / testing and review / critical systems list)"],
        modelAnswer: "Step-by-step recovery procedures, and the names and phone numbers of the people responsible for each task.",
      }),
    ],
    explanation: `(a) ${s1.length}. (b) ${s1[s1.length - 1]}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 6,
    hints: ["Weigh internet access and cost against safety.", "A plan must be tested."],
    stem: "Thandeka runs a small accounting practice in Bulawayo with five computers. Power cuts are frequent and the internet connection is sometimes slow.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Compare an on-site external disk with a cloud backup service for the practice, giving **two** advantages of each.",
        points: ["External disk: fast to back up and restore", "External disk: works without internet / no subscription", "Cloud: off-site, survives fire or theft", "Cloud: automatic / accessible from anywhere / storage can grow"],
        modelAnswer: "An external disk is quick to back up to and restore from, and it works even when the internet is down. A cloud service keeps the data away from the office, so it survives a fire or theft, and it runs automatically and can be reached from anywhere.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why the disaster recovery plan must be tested and reviewed regularly.",
        points: ["Testing shows whether backups can actually be restored / staff know what to do", "Reviewing keeps it up to date with new systems, staff, risks and contacts"],
        modelAnswer: "Testing proves that the backups really restore and that staff can follow the steps quickly. Reviewing updates the plan when systems, staff or risks change.",
      }),
    ],
    explanation: "A combination of an on-site disk and an encrypted cloud copy gives speed and safety.",
  });

  b.card("DEFINITION", "Backup", "A copy of data kept separately from the original so it can be restored after loss or damage.");
  b.card("DEFINITION", "Full backup", "Copies all selected files every time; slowest to make and largest, but quickest to restore.");
  b.card("DEFINITION", "Incremental backup", "Copies only files changed since the last backup; quick and small, but restoring needs the last full backup plus every incremental since.");
  b.card("CONCEPT", "On-site vs off-site vs cloud", "On-site: fast, but lost in the same disaster. Off-site: survives disasters, slow to fetch. Cloud: automatic and off-site, needs internet and a subscription.");
  b.card("FACT", "3-2-1 rule", "Keep three copies of important data, on two types of media, with one copy off-site.");
  b.card("CONCEPT", "File recovery software", "Rebuilds deleted files whose space has not yet been overwritten; stop using the disk until recovery is attempted.");
  b.card("DEFINITION", "Disaster recovery plan", "A written, tested plan for protecting data and systems and restoring them after a disaster.");
  b.card("CONCEPT", "Contents of a disaster recovery plan", "Risk assessment; critical systems; backup policy; recovery procedures; roles and contacts; alternative arrangements; testing and review.");
  b.card("CONCEPT", "Causes of data loss", "Hardware failure, malware (ransomware), human error, theft, fire, flood, power surges.");
});
