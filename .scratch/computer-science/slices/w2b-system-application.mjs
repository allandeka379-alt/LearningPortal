// Slice w2b: system software, application software and utilities (comp.software.system-application).
import { concept, P, ZIM } from "../lib.mjs";

concept("comp.software.system-application", { file: "software/system-application", keyPrefix: "software.system-application" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **system software**?",
    options: [
      ["A device driver for a printer", "Correct: a driver lets the operating system control a device, so it looks after the computer."],
      ["A spreadsheet used to work out a budget", "A spreadsheet does a task for the user, so it is application software."],
      ["A word processor used to type a letter", "Typing a letter is the user's task: application software."],
      ["A media player used to watch a film", "Playing media is a user task: application software."],
    ],
    answer: "A",
    explanation: "System software (operating system, utilities, drivers, translators) runs and manages the computer. The other three carry out tasks for the user.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of **application software**?",
    options: [
      ["To carry out a task that the user wants to do", "Correct: applications provide the services the user needs."],
      ["To manage the hardware and memory of the computer", "That is the job of the operating system, which is system software."],
      ["To translate program code into machine code", "That is done by translators, which are system software."],
      ["To keep the computer free of viruses and errors", "Anti-virus and other maintenance tools are utilities (system software)."],
    ],
    answer: "A",
    explanation: "Application software provides the services the user requires, such as writing, calculating, drawing or browsing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A computer's magnetic hard disk takes a long time to open files because each file is split into parts stored all over the disk. Which utility should be used?",
    options: [
      ["Disk defragmenter", "Correct: it moves the parts of each file so they are stored together, so files are read faster."],
      ["Disk clean-up", "Clean-up deletes unwanted files to free space; it does not reorganise the parts of files."],
      ["Compression software", "Compression makes files smaller but does not put scattered parts back together."],
      ["Backup software", "Backup copies files elsewhere; the files on the disk stay scattered."],
    ],
    answer: "A",
    explanation: "Fragmented files slow down a magnetic disk because the read-write heads must move to many places. Defragmenting stores each file in one continuous area.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which utility removes temporary files and empties the recycle bin to free storage space?",
    options: [
      ["Disk clean-up", "Correct: it finds and removes files that are no longer needed."],
      ["Disk defragmenter", "A defragmenter rearranges files; it does not delete them."],
      ["File manager", "A file manager lets the user delete files one by one, but does not search for temporary files automatically."],
      ["Device driver", "A driver controls a hardware device; it is not a maintenance tool."],
    ],
    answer: "A",
    explanation: "Disk clean-up searches for unnecessary files (temporary files, old downloads, recycle bin contents) and deletes them to free space.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Chipo wants to send 40 photographs by email, but together they are larger than the attachment limit. Which utility would help most?",
    options: [
      ["Compression software", "Correct: compressing the photos into an archive reduces the total size."],
      ["Disk defragmenter", "Defragmenting changes where files are stored on the disk, not their size."],
      ["Anti-virus software", "Scanning for viruses does not change the size of the files."],
      ["Backup software", "A backup makes a copy of the same size somewhere else."],
    ],
    answer: "A",
    explanation: "Compression reduces file size so the files need less space and transfer faster.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Ask whether the program's job is the user's task or the computer's needs."],
    stem: "How is a **compiler** classified, and why?",
    options: [
      ["System software, because it translates code into machine code for the computer", "Correct: translators are system software even though programmers start them deliberately."],
      ["Application software, because a programmer opens it to do a task", "Being opened by a person does not make it an application; its job is translation for the processor."],
      ["A utility, because it checks a programmer's source code for errors and reports them", "Error reporting is part of translation; a compiler is classed as a translator, not a maintenance utility."],
      ["Hardware, because it is part of the processor", "A compiler is a program, so it is software."],
    ],
    answer: "A",
    explanation: "Compilers, interpreters and assemblers are translators, a type of system software.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Think about how a solid-state drive stores data: are there any moving parts?"],
    stem: "Why should a solid-state drive (SSD) **not** be defragmented?",
    options: [
      ["It has no moving read-write heads, so fragments do not slow it, and extra writes shorten its life", "Correct: access time is the same wherever data is stored, and flash memory wears with each write."],
      ["Its files are always stored in one continuous area of the drive, so they can never become fragmented", "Files can be fragmented on an SSD too; it simply does not matter for speed."],
      ["Defragmenting would delete all the files on it", "Defragmenting moves files; it does not delete them."],
      ["An SSD is volatile, so the files it holds are lost when it is switched off", "An SSD is non-volatile secondary storage."],
    ],
    answer: "A",
    explanation: "Defragmenting helps magnetic disks because heads move less. An SSD has no heads, and the many extra writes would wear out its flash memory.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must anti-virus software be updated regularly?",
    options: [
      ["New viruses appear, and the software needs their signatures to recognise them", "Correct: the database of known threats must be kept current."],
      ["The software deletes itself automatically after a month unless it is updated", "Anti-virus software is not deleted by itself."],
      ["Updating defragments the hard disk at the same time", "Updating anti-virus software does not defragment the disk."],
      ["Old versions slow down the internet connection for every other user", "The reason for updating is detection of new threats, not internet speed."],
    ],
    explanation: "Anti-virus software compares files with signatures of known malware; without updates it cannot recognise new malware.",
    answer: "A",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Running a disk defragmenter frees up storage space on a hard disk.",
    answer: false,
    explanation: "False. A defragmenter rearranges the parts of files so they are stored together, which speeds up access. It does not delete anything, so the space used stays the same.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The operating system is an example of system software.",
    answer: true,
    explanation: "True. The operating system is the main system software: it manages the hardware and provides a platform for applications.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each utility to what it does.",
    pairs: [
      ["Anti-virus", "Scans files and quarantines or deletes malware"],
      ["Backup", "Copies files to another device so they can be restored"],
      ["Disk clean-up", "Deletes temporary and unwanted files"],
      ["File manager", "Lets the user copy, move, rename and organise files in folders"],
      ["Disk defragmenter", "Stores the parts of each file next to each other"],
    ],
    explanation: "Each utility performs one housekeeping task: protect, copy, free space, organise or reorganise.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each program as system software or application software.",
    pairs: ["Payroll program used to calculate wages", "Operating system", "Driver for a webcam", "Presentation software", "Interpreter for a programming language"],
    right: ["System software", "Application software"],
    rightIndex: [1, 0, 0, 1, 0],
    explanation: "Payroll and presentation software do the user's tasks (application). The operating system, drivers and translators look after the computer (system).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Software that provides the services the computer needs is called {{blank:a}} software. A {{blank:b}} is a program that lets the operating system communicate with a printer. A {{blank:c}} program makes a second copy of files on another device.",
    blanks: [
      { id: "a", accepted: ["system"], choices: ["system", "application", "bespoke", "open-source"] },
      { id: "b", accepted: ["device driver"], choices: ["device driver", "compiler", "spreadsheet", "browser"] },
      { id: "c", accepted: ["backup"], choices: ["backup", "defragmenter", "compression", "clean-up"] },
    ],
    explanation: "System software serves the computer; drivers control devices; backup utilities keep a second copy.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of utility that compares files with a database of known malware signatures.",
    accepted: ["anti-virus", "antivirus", "anti virus", "anti-virus software", "antivirus software", "anti-malware", "antimalware", "anti-malware software", "virus checker", "virus scanner"],
    wrong: ["firewall", "defragmenter"],
    explanation: "Anti-virus (anti-malware) software scans files and compares them with known signatures.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Say who each type of software serves, then give an example of each."],
    stem: "Describe the difference between system software and application software. [2]",
    points: [
      "System software provides the services the computer needs / runs and manages the hardware (e.g. operating system, utility)",
      "Application software provides the services the user needs / carries out a user task (e.g. word processor, spreadsheet)",
    ],
    modelAnswer: "System software, such as the operating system, provides the services the computer needs to run and manage its hardware. Application software, such as a spreadsheet, provides the services the user needs to carry out a task.",
    explanation: "Both halves are needed: who the software serves, with an example of each.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 2,
    hints: ["Describe what the utility does, then the benefit."],
    stem: "Explain why a school office should use backup software every day. [2]",
    points: [
      "Backup software copies the files to another device / location (e.g. external drive, cloud)",
      "If the original files are lost, deleted, corrupted or infected, they can be restored from the copy",
    ],
    modelAnswer: "The backup utility copies the office files to a separate device each day, so if the originals are deleted, corrupted or lost to malware or a disk failure, they can be restored with little loss.",
    explanation: "A backup is a second copy kept elsewhere; its value is that data can be restored.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Match each symptom to the utility that fixes it.", "Remember that defragmenting does not help a solid-state drive."],
    stem: "Farai's laptop has a magnetic hard disk. It is running slowly, its disk is almost full, and some files have been damaged by a virus.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of software is the anti-virus program that Farai should run?", options: [["System software (a utility)", "Correct."], ["Application software", "It looks after the computer, not a user task."], ["A device driver", "Drivers control hardware devices."], ["A translator", "Translators convert program code."]], answer: "A", explanation: "Anti-virus is a utility, part of system software." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how the anti-virus software deals with the virus.", points: ["Scans files and compares them with a database of known virus signatures / looks for suspicious behaviour", "Quarantines or deletes the infected files (and alerts the user)"], modelAnswer: "It scans every file, comparing it with signatures of known viruses, then quarantines or deletes any infected file and warns Farai." }),
      P.mcq({ label: "(c)", stem: "Which utility should Farai use to free storage space?", options: [["Disk clean-up", "Correct."], ["Disk defragmenter", "This rearranges files but frees no space."], ["Anti-virus", "This removes malware, not temporary files."], ["File manager", "It can delete files but does not find temporary files for him."]], answer: "A", explanation: "Disk clean-up removes unwanted files." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how defragmenting the disk could make the laptop faster.", points: ["The parts of each file are moved so they are stored next to each other (and free space is grouped)", "The read-write heads move less, so files are read / opened faster"], modelAnswer: "The defragmenter moves the scattered parts of each file into one continuous area, so the read-write heads move less and files open faster." }),
    ],
    explanation: "Anti-virus (utility) removes the virus; clean-up frees space; defragmenting speeds up a magnetic disk.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    hints: ["Two kinds of system software other than utilities are drivers and translators.", "Optimising a system means making it run better, not adding new tasks."],
    stem: "The computer laboratory at Mutare Hills Secondary School (fictional) is being set up for Form 1 learners.",
    parts: [
      P.match({ label: "(a)", stem: "Classify each program.", pairs: ["Spreadsheet", "Operating system", "Web browser", "Driver for the projector"], right: ["System software", "Application software"], rightIndex: [1, 0, 1, 0], explanation: "Spreadsheet and browser: application; OS and driver: system." }),
      P.manual({ label: "(b)", marks: 2, stem: "Name **two** kinds of system software other than the operating system and utilities.", points: ["Device drivers", "Translators (compilers / interpreters / assemblers)"], modelAnswer: "Device drivers and translators such as compilers." }),
      P.manual({ label: "(c)", marks: 2, stem: "The technician wants to **optimise** the computers before term starts. Describe **two** utilities she could use and what each does.", points: ["Names a suitable utility (e.g. defragmenter, disk clean-up, anti-virus)", "Correctly describes what the second named utility does (e.g. clean-up deletes temporary files to free space)"], modelAnswer: "A disk defragmenter puts the parts of each file together so files load faster; disk clean-up deletes temporary files to free space." }),
    ],
    explanation: "Spreadsheets and browsers are applications; operating systems, drivers, translators and utilities are system software.",
  });

  b.card("DEFINITION", "System software", "Software that provides the services the computer needs to run and manage its hardware: operating system, utilities, device drivers and translators.");
  b.card("DEFINITION", "Application software", "Software that provides the services the user needs to carry out a task, e.g. word processor, spreadsheet, browser, accounting package.");
  b.card("DEFINITION", "Utility program", "System software that performs one maintenance task to keep the computer secure, organised or efficient (anti-virus, backup, clean-up, defragmenter).");
  b.card("DEFINITION", "Device driver", "A program that lets the operating system communicate with a particular hardware device, such as a printer or webcam.");
  b.card("CONCEPT", "What does a disk defragmenter do?", "Moves the parts (fragments) of each file on a magnetic hard disk so they are stored in one continuous area; the heads move less, so files open faster.", "It frees no space; not needed on an SSD.");
  b.card("CONCEPT", "Disk clean-up vs compression", "Clean-up deletes unwanted files (temporary files, recycle bin) to free space; compression makes kept files smaller.");
  b.card("CONCEPT", "How does anti-virus software work?", "Scans files and compares them with a database of known malware signatures (and watches for suspicious behaviour), then quarantines or deletes infected files.", "Must be updated regularly.");
  b.card("FACT", "Is a compiler system or application software?", "System software: it is a translator that converts code into machine code.");
  b.card("CONCEPT", "Backup vs saving", "Saving stores the working copy; a backup is a second copy on a different device or location, used to restore lost or damaged data.");
});
