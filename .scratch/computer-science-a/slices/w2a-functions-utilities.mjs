// Slice w2a: operating system functions, utility software and libraries (acs.os.functions-utilities, Cambridge AS).
import { concept, P, chk, same, CAM, mdTable } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { makeDisk, write, remove, pieces, defrag, mapMd } from "../tables/w2a-disk.mjs";

concept("acs.os.functions-utilities", { file: "os/functions-utilities", keyPrefix: "os.functions-utilities", applies: CAM }, (b) => {
  // disk of 10 blocks: F 2, G 3, H 2; delete G; write J 5
  const d = makeDisk(10);
  write(d, "F", 2); write(d, "G", 3); write(d, "H", 2);
  const before = mapMd(d);
  remove(d, "G");
  write(d, "J", 5);
  const afterWrite = mapMd(d);
  const jBlocks = d.map((c, i) => (c === "J" ? i + 1 : 0)).filter(Boolean);
  same(jBlocks, [3, 4, 5, 8, 9]);
  chk(pieces(d, "J"), 2);
  chk(pieces(d, "H"), 1);
  const d2 = defrag(d);
  const m2 = mapMd(d2);
  same(d2.join(""), "FFJJJJJHH.");
  const hStart = d2.indexOf("H") + 1;
  chk(hStart, 8);
  const freeAfter = d2.filter((c) => c === ".").length;
  chk(freeAfter, 1);
  // back-up and DLL
  const fullGiB = 25, incGiB = 1.5, nDays = 5;
  const bk = fullGiB + incGiB * nDays;
  chk(bk, 32.5);
  const progs = 8, lib = 4, prog = 2;
  const own = progs * (lib + prog), shared = lib + progs * prog;
  chk(own, 48); chk(shared, 20);

  // ---- multiple choice
  mc(b, 2, "UNDERSTANDING", "Which management task stops one program from writing into the memory that belongs to another program?",
    ["Memory management", "Correct: the OS gives each program its own area of memory."],
    [["Process management", "Process management decides who uses the processor."], ["File management", "File management organises files on the disk."], ["Security management", "Security management controls users and access rights."]],
    "Memory management allocates and protects the areas of main memory.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which task is part of process management?",
    ["Deciding which program uses the processor next", "Correct: scheduling is process management."],
    [["Recording where each file is stored on the disk", "That is file management."], ["Asking a user for a password at log-in", "That is security management."], ["Loading the driver for a printer", "That is hardware management."]],
    "Process management shares the processor between the running programs.", { daily: true });
  mc(b, 1, "RECALL", "What is the purpose of a device driver?",
    ["It lets the OS communicate with one particular device", "Correct."],
    [["It protects the computer from viruses, spyware and other threats", "That is a virus checker."], ["It makes copies of files in case of loss", "That is back-up software."], ["It translates a program into machine code", "That is a translator."]],
    "A driver is the software that controls one device on behalf of the OS.");
  mc(b, 2, "UNDERSTANDING", "What does defragmentation software do?",
    ["It stores the blocks of each file next to each other", "Correct: each file is then in one piece."],
    [["It deletes the files that have not been used for a long time", "Defragmentation does not delete files."], ["It reduces the size of each file", "That is compression."], ["It checks files for malicious code", "That is a virus checker."]],
    "It rearranges file blocks so that files are not split into pieces.");
  mc(b, 3, "ANALYSIS", "Why must the list of known viruses used by a virus checker be updated regularly?",
    ["New viruses appear all the time and an old list will not recognise them", "Correct."],
    [["Old virus definitions use up the free disk space", "The size of the list is not the reason."], ["The list is erased each time the computer is switched off", "The list is stored on the disk."], ["The operating system blocks any checker that is more than a week old", "No such rule exists."]],
    "A checker can only detect what it has been taught to recognise.", { hints: ["What happens when a new virus is written after the list was made?"] });
  mc(b, 3, "APPLICATION", "A teacher in Gweru wants to email a folder of photographs of 30 MiB through a connection with a 10 MiB limit. Which utility is the most suitable?",
    ["File compression software", "Correct: it reduces the size of the files."],
    [["A disk formatter", "Formatting would erase the disk."], ["Defragmentation software", "Defragmentation does not change the size of files."], ["Disk repair software", "Repair fixes errors; it does not change file size."]],
    "Compression reduces the amount of data to be sent.", { hints: ["Which utility makes files smaller?"] });
  mc(b, 3, "ANALYSIS", "Several programs on a computer use the same DLL file. One day a program is installed that replaces the DLL with a version that works differently. What is the most likely result?",
    ["The older programs may stop working correctly", "Correct: they depend on the old behaviour."],
    [["All programs run faster because there is only one copy", "Sharing saves memory but a changed version may break programs."], ["The new program is copied into every other program", "A DLL is not copied into programs."], ["The operating system deletes the older programs", "It does not."]],
    "A shared library changed incompatibly can break the programs that use it.", { hints: ["All the programs share one copy."] });
  mc(b, 2, "UNDERSTANDING", "What is the main advantage of a command line interface for an expert user?",
    ["Commands can be typed quickly and precisely, and combined", "Correct."],
    [["It needs no knowledge of commands", "A CLI must be learnt."], ["It uses windows and icons", "That describes a GUI."], ["It needs more memory than any other interface", "A CLI normally needs less."]],
    "A CLI is fast and precise but harder to learn than a GUI.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An incremental back-up copies every file on the computer each time it is run.", answer: false,
    explanation: "False. An incremental back-up copies only the files that have changed since the last back-up." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A dynamic link library can be used by several programs at the same time.", answer: true,
    explanation: "True. One copy is loaded into memory and shared, which saves memory." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each utility to its purpose.",
    pairs: [["Disk formatter", "Prepares a disk for use by setting up an empty file system"], ["Virus checker", "Scans files for malicious code"], ["Defragmentation software", "Joins the blocks of each file together"], ["File compression software", "Reduces the size of files"], ["Back-up software", "Makes copies so that files can be restored"]],
    explanation: "Each utility carries out one maintenance task." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about libraries.",
    template: "A program {{blank:a}} contains tested routines that a programmer can call. A {{blank:b}} is loaded only when a program needs it, and one copy can be {{blank:c}} by several programs.",
    blanks: [
      { id: "a", accepted: ["library"], choices: ["library", "driver", "buffer", "firewall"] },
      { id: "b", accepted: ["DLL"], choices: ["DLL", "BIOS", "CLI", "ROM"] },
      { id: "c", accepted: ["shared"], choices: ["shared", "deleted", "formatted", "compressed"] },
    ], explanation: "A program library holds tested routines; a DLL is loaded when needed and shared." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The full back-up is made once; add the incremental back-ups."],
    stem: "A shop in Bulawayo makes a full back-up of 25 GiB on Monday, and then incremental back-ups of 1.5 GiB on each of the next five days. What is the total storage used by the six back-ups?",
    value: bk, unit: "GiB", wrong: [26.5, 150], workedSolution: "1. Incremental total = 5 × 1.5 = 7.5 GiB.\n2. Total = 25 + 7.5 = 32.5 GiB.", explanation: "25 + 5 × 1.5 = 32.5 GiB." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["With separate copies, each program holds its own library."],
    stem: "Eight programs each use a 4 MiB library. Each program is 2 MiB without the library. How much memory is saved if one shared DLL is used instead of building a copy of the library into every program?",
    value: own - shared, wrong: [28.5, 4], unit: "MiB", workedSolution: `1. Separate copies: 8 × (4 + 2) = ${own} MiB.\n2. One shared DLL: 4 + 8 × 2 = ${shared} MiB.\n3. Saving = ${own} - ${shared} = ${own - shared} MiB.`, explanation: "Seven extra copies of the 4 MiB library are not needed: 7 × 4 = 28 MiB." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Find the blocks of J in the table and see where the runs break."],
    stem: "A disk has 10 blocks. File F uses blocks 1-2, G blocks 3-5 and H blocks 6-7. G is deleted and a new file J of 5 blocks is saved in the first free blocks.\n\n" + afterWrite + "\n\nIn how many separate pieces is J stored?",
    value: pieces(d, "J"), wrong: [1, 5], workedSolution: "1. The first free blocks are 3, 4, 5, 8 and 9.\n2. Blocks 3-5 form one run and blocks 8-9 another.\n3. J is in 2 pieces.", explanation: "J occupies blocks 3-5 and 8-9: two pieces." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the utility software that reduces the size of files to save storage space.", accepted: ["file compression", "compression software", "file compression software", "compression"], wrong: ["defragmentation", "virus checker"], explanation: "File compression software." });

  // ---- self-marked
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what would happen with no OS: programs, devices and users."],
    stem: "Explain why a computer needs an operating system. [3]",
    points: ["It manages and shares the hardware resources (processor, memory, devices) between programs", "It stops programs interfering with each other, for example in memory", "It provides a user interface so the user can use the computer / provides services so programmers need not control the hardware directly"],
    modelAnswer: "The OS manages and shares the processor, memory and devices between programs, stops programs from interfering with each other, and provides a user interface and services so that neither the user nor the programmer has to control the hardware directly.",
    explanation: "Resource sharing, protection, interface and services." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["One mark for each task named with an action."],
    stem: "Describe two tasks of an operating system, giving a specific action for each. [4]",
    points: ["A named management task, for example memory management", "An action: loads programs into memory and stops one program using another's area", "A second named task, for example file management or security management", "An action: records where files are stored / controls who may log in and what they may access"],
    modelAnswer: "Memory management: the OS loads programs into memory and stops one program from using the memory of another. File management: the OS keeps a record of where each file is stored and controls opening, saving and deleting.",
    explanation: "Task and action, twice." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Why does reading from several places take longer on a magnetic disk?"],
    stem: "Explain why defragmenting a magnetic hard disk can make a computer faster. [3]",
    points: ["On a fragmented disk the parts of a file are in separate places", "The read head must move to each place, which takes time", "After defragmentation the file is in one piece, so less head movement is needed"],
    modelAnswer: "Without defragmentation the parts of a file are in separate places, so the read head must move to each one, which takes time. After defragmenting, each file is in one piece and needs much less head movement.",
    explanation: "Fragments, head movement, fewer movements." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the type of user and the resources needed."],
    stem: "A farmer's cooperative in Masvingo is choosing between a command line interface and a graphical user interface for its office computer. Compare the two interfaces and recommend one. [4]",
    points: ["A GUI is easy to learn because it uses windows, icons and menus", "A CLI needs commands to be learnt but is fast and uses less memory", "The office staff are non-expert users / occasional users", "Recommend a GUI because it needs little training"],
    modelAnswer: "A GUI is easy to learn since it uses windows, icons and menus; a CLI is quick for experts and uses less memory but its commands must be learnt. Because the office staff are non-experts, a GUI is recommended as it needs little training.",
    explanation: "Compare, relate to the users, recommend." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Look for the runs of consecutive blocks of J.", "A defragmenter puts the blocks of each file together."],
    explanation: "The disk map shows J in two pieces; defragmentation joins them.",
    stem: "A disk of 10 blocks holds files F (2 blocks), G (3 blocks) and H (2 blocks) saved in that order:\n\n" + before + "\n\nG is deleted. A new file J of 5 blocks is saved in the first free blocks it finds.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the blocks used by the file J.",
        template: "J starts in block {{blank:a}} and ends in block {{blank:b}}.",
        blanks: [{ id: "a", accepted: ["3"], input: "number" }, { id: "b", accepted: ["9"], input: "number" }], wrong: [["1", "5"]], explanation: "J uses blocks 3-5 and 8-9." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What term describes the way J is stored?", options: [["Fragmented", "Correct: it is in separate pieces."], ["Compressed", "It has not been made smaller."], ["Formatted", "Formatting prepares a disk."], ["Encrypted", "Encryption scrambles data."]], answer: "A", explanation: "J is fragmented." }),
      P.num({ label: "(c)", marks: 1, stem: "The disk is defragmented, keeping the files in the order in which they first appear on the disk (F, J, H). State the number of the block in which H starts.", value: hStart, wrong: [6, 7], workedSolution: "1. F takes blocks 1-2, J takes 3-7.\n2. H takes the next two blocks, 8 and 9.", explanation: "H starts in block 8." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why a fragmented file takes longer to read.", points: ["The pieces are in different places on the disk", "The read head has to move to each place / more seeks are needed"], modelAnswer: "The pieces are in different places, so the read head has to move to each one.", explanation: "More head movement." }),
      P.manual({ label: "(e)", marks: 2, stem: "State two other utility programs that an administrator might use to look after this disk.", points: ["Virus checker or disk repair software", "Back-up or disk analysis software"], modelAnswer: "A virus checker and back-up software.", explanation: "Any two sensible utilities." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match the action to one of the five management tasks."],
    explanation: "Each action belongs to one management task.",
    stem: "An operating system carries out many tasks while a student at a rural school prints a document and listens to a recording.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "The OS lets the document and the recording share the processor, one after the other in very short turns. Which task is this?", options: [["Process management", "Correct."], ["File management", "File management organises files."], ["Security management", "Security management controls access."], ["Memory management", "Memory management allocates memory."]], answer: "A", explanation: "Sharing the processor is process management." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The OS sends the document to the printer through a driver. Which task is this?", options: [["Hardware management", "Correct."], ["Memory management", "Memory management allocates memory."], ["Security management", "Security management controls access."], ["File management", "File management organises files."]], answer: "A", explanation: "Using drivers to control devices is hardware management." }),
      P.mcq({ label: "(c)", marks: 1, stem: "The student must enter a password before using the computer. Which task is this?", options: [["Security management", "Correct."], ["Process management", "Process management shares the processor."], ["Hardware management", "Hardware management controls devices."], ["File management", "File management organises files."]], answer: "A", explanation: "Passwords belong to security management." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the OS manages the memory when the document and the recording are both open.", points: ["Each program is loaded into its own area of memory", "The OS prevents one program from writing into the area of the other", "When a program is closed its memory is freed for reuse"], modelAnswer: "Each program is loaded into its own area of memory, the OS stops one program from using the other's area, and the memory is freed when a program is closed.", explanation: "Allocation, protection, reuse." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Operating system", "System software that manages the hardware and resources and provides services and a user interface.");
  b.card("FACT", "Five OS management tasks", "Process, memory, file, security, and hardware (input-output) management.");
  b.card("DEFINITION", "Utility software", "System software that does a maintenance task, for example formatting, virus checking, defragmenting, compression or back-up.");
  b.card("CONCEPT", "Defragmentation", "Rearranging the blocks of each file so it is stored in one piece, reducing head movement on a magnetic disk.");
  b.card("CONCEPT", "Incremental back-up", "Copies only the files changed since the last back-up; to restore, the full back-up and all later increments are needed.");
  b.card("DEFINITION", "Program library", "A collection of tested routines that programs can call.");
  b.card("DEFINITION", "DLL", "Dynamic Link Library: loaded when needed and shared by several programs.");
  b.card("FACT", "CLI and GUI", "CLI: typed commands, fast for experts, little memory. GUI: windows, icons and menus, easy for beginners.");
  b.card("CONCEPT", "Why a DLL helps", "Saves memory because one copy is shared, and an update reaches all programs; but programs fail if it is missing or incompatible.");
});
