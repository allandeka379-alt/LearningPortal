// Slice w2b: operating systems (comp.software.operating-systems).
import { concept, P, ZIM } from "../lib.mjs";

concept("comp.software.operating-systems", { file: "software/operating-systems", keyPrefix: "software.operating-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement describes the role of an operating system?",
    options: [
      ["It manages the hardware and provides a platform on which applications run", "Correct: it manages resources, provides an interface and runs applications."],
      ["It carries out one task for the user, such as typing a letter", "That describes application software."],
      ["It converts high-level code into machine code", "That is the job of a translator."],
      ["It is the chip that fetches and executes instructions", "That is the CPU, which is hardware."],
    ],
    answer: "A",
    explanation: "The OS manages hardware and software resources, provides a user interface and provides a platform for applications.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rudo plugs a new webcam into a laptop and it works a few seconds later. Which function of the operating system made this possible?",
    options: [
      ["Managing peripherals and drivers", "Correct: the OS detected the device and loaded its driver."],
      ["Managing user accounts", "User accounts control who logs in, not new devices."],
      ["Managing files", "File management organises stored files."],
      ["Managing multitasking", "Multitasking shares processor time between programs."],
    ],
    answer: "A",
    explanation: "The OS detects a newly connected device and loads the right device driver so that it can be used.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which operating system function stops one running program from overwriting the data of another program in RAM?",
    options: [
      ["Managing memory", "Correct: the OS allocates separate areas of memory and protects them."],
      ["Providing an interface", "The interface is how the user communicates with the computer."],
      ["Managing peripherals", "This concerns devices such as printers."],
      ["Managing files", "File management works with files on storage, not areas of RAM."],
    ],
    answer: "A",
    explanation: "Memory management allocates RAM to each process and keeps each process inside its own area.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the operating system do when it **multitasks** on a single processor core?",
    options: [
      ["It switches the processor rapidly between programs, so they appear to run at once", "Correct: processor time is shared in very small slices."],
      ["It runs every program at exactly the same instant on the one core", "One core runs one instruction stream at a time; programs only appear simultaneous."],
      ["It closes every program except the one being used", "That would prevent multitasking."],
      ["It copies each program onto a separate hard disk so they do not clash", "Multitasking concerns processor time and memory, not separate disks."],
    ],
    answer: "A",
    explanation: "Multitasking shares the processor's time between processes, switching so fast that they appear to run together.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Two OS functions are involved; choose the one that controls what each person may open."],
    stem: "In a school office in Gweru, the bursar can open the fees files but the receptionist cannot, although both log in to the same computer. Which OS function controls this?",
    options: [
      ["Managing user accounts and access rights", "Correct: each account is given different access rights."],
      ["Managing memory", "Memory allocation does not decide who may open a file."],
      ["Handling interrupts", "Interrupts are signals needing the processor's attention."],
      ["Providing a platform for applications", "This lets programs run, but does not decide who may open which files."],
    ],
    answer: "A",
    explanation: "The OS manages user accounts and gives each account access rights to particular files and folders.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about what costs memory and processing power."],
    stem: "Which is a **disadvantage** of a graphical user interface compared with a command line interface?",
    options: [
      ["It uses more memory and processing power", "Correct: windows, icons and graphics need more resources."],
      ["Commands must be typed exactly from memory", "That is a drawback of a command line interface."],
      ["It is harder for beginners to learn", "GUIs are easier for beginners."],
      ["It cannot be used with a mouse", "GUIs are designed for pointing devices and touch."],
    ],
    answer: "A",
    explanation: "A GUI is easy to use but needs more memory and processing; a CLI is efficient but its commands must be learned.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["Which device runs on a battery and has a touch screen?"],
    stem: "Which feature is typical of a **mobile** operating system rather than a personal computer operating system?",
    options: [
      ["Strict power management that pauses apps running in the background", "Correct: mobile OSs save battery by limiting background apps."],
      ["Many large program windows open side by side on the screen", "That is typical of a PC OS."],
      ["Control mainly by a mouse and keyboard", "That is typical of a PC OS."],
      ["No support for wireless connections such as Wi-Fi or Bluetooth", "Mobile OSs support Wi-Fi, mobile data and Bluetooth."],
    ],
    answer: "A",
    explanation: "Mobile OSs are touch-based, use app stores and manage battery and memory strictly.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["An application asks the OS for a service instead of driving the hardware itself."],
    stem: "Why can the same word processor print to many different makes of printer without containing instructions for each one?",
    options: [
      ["It asks the operating system to print, and the OS uses the printer's driver", "Correct: the OS provides a platform and talks to devices through drivers."],
      ["Every make of printer understands exactly the same set of signals", "Printers differ, which is why drivers are needed."],
      ["The word processor is system software", "A word processor is application software."],
      ["The printer translates the whole document into machine code itself", "Translation into machine code is not how printing works."],
    ],
    answer: "A",
    explanation: "Applications request services from the OS; the OS controls each peripheral through its device driver.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Managing files means that the operating system keeps track of where each file is stored and lets users organise files into folders.",
    answer: true,
    explanation: "True. File management covers folders, saving, copying, moving, renaming, deleting and keeping track of storage locations.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Typing a letter is one of the functions of an operating system.",
    answer: false,
    explanation: "False. Typing a letter is a task done with application software (a word processor); the OS provides the platform on which it runs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event to the operating system function that deals with it.",
    pairs: [
      ["A user enters a username and password", "Managing user accounts and security"],
      ["A user saves a report in a folder called Reports", "Managing files"],
      ["A browser and a spreadsheet are open together", "Managing multitasking"],
      ["A scanner is plugged in and detected", "Managing peripherals and drivers"],
      ["A key is pressed while a program is busy", "Handling interrupts"],
    ],
    explanation: "Link each event to the resource being managed: users, files, processor time, devices, interrupts.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about operating systems.",
    template: "An interface with windows, icons, menus and a pointer is a {{blank:a}}. An interface in which the user types commands is a {{blank:b}}. When RAM is full, the OS can use part of secondary storage as {{blank:c}} memory.",
    blanks: [
      { id: "a", accepted: ["graphical user interface"], choices: ["graphical user interface", "command line interface", "device driver", "utility"] },
      { id: "b", accepted: ["command line interface"], choices: ["command line interface", "graphical user interface", "touch screen", "menu"] },
      { id: "c", accepted: ["virtual"], choices: ["virtual", "cache", "read-only", "flash"] },
    ],
    explanation: "GUI; CLI; virtual memory.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the abbreviation for an interface that uses windows, icons, menus and a pointer.",
    accepted: ["GUI", "graphical user interface", "WIMP"],
    wrong: ["CLI"],
    explanation: "A graphical user interface (GUI), sometimes called a WIMP interface.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Say what the OS gives to each program and what it protects."],
    stem: "Describe how an operating system manages memory. [2]",
    points: [
      "Allocates (and de-allocates) areas of RAM to each program / process when it starts (and frees them when it closes)",
      "Prevents programs from accessing / overwriting each other's memory / uses virtual memory when RAM is full",
    ],
    modelAnswer: "It gives each running program its own area of RAM, freeing it when the program closes, and stops programs from overwriting each other's memory; when RAM is full it uses virtual memory.",
    explanation: "Allocation plus protection (or virtual memory) earn the two marks.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3, applies: ZIM,
    hints: ["Choose three features (interface, apps, power, connectivity) and compare each."],
    stem: "Compare a personal computer operating system with a mobile operating system. Give **three** differences. [3]",
    points: [
      "Interface: PC mainly mouse and keyboard with windows, whereas mobile is touch / gestures / voice",
      "Power / memory: mobile manages battery and memory strictly (pauses background apps), whereas a PC is less strict",
      "Apps / hardware: mobile installs apps mainly from an app store and has built-in GPS, camera, mobile data, whereas a PC runs larger programs from many sources with many peripherals",
    ],
    modelAnswer: "A PC OS is used with a mouse and keyboard and many windows, while a mobile OS uses touch and gestures. A mobile OS manages battery and memory strictly, pausing background apps, while a PC OS is less strict. Mobile apps come mainly from an app store and use built-in GPS and mobile data, while PCs run large programs from many sources and many peripherals.",
    explanation: "Each difference must state both sides.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Give the function's name and what it involves.", "Interrupts are signals needing attention."],
    stem: "Tatenda's laptop runs an operating system with a graphical user interface.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe **three** functions of the operating system, other than providing an interface.", points: ["A named function with a description (e.g. managing files: organises, saves, copies, deletes and tracks files)", "A second named function with a description (e.g. managing memory: allocates RAM to programs)", "A third named function with a description (e.g. managing peripherals: uses drivers to communicate with devices; security; user accounts; multitasking; interrupts)"], modelAnswer: "It manages files, organising them in folders and keeping track of where they are stored; it manages memory, allocating RAM to each program; and it manages peripherals, communicating with devices through their drivers." }),
      P.mcq({ label: "(b)", stem: "Tatenda types while a large file is downloading, and his typing still appears. Which OS function makes this possible?", options: [["Handling interrupts", "Correct: each key press generates an interrupt that the OS services."], ["Managing user accounts", "Not related to key presses."], ["Managing files", "Not related to key presses."], ["Providing system security", "Not related to key presses."]], answer: "A", explanation: "Key presses are hardware interrupts handled by the OS." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** advantage and **one** disadvantage of a graphical user interface compared with a command line interface.", points: ["Advantage: easy to learn / no commands to remember / intuitive for beginners", "Disadvantage: uses more memory / processing power / storage"], modelAnswer: "It is easy to use without learning commands, but it needs more memory and processing power." }),
    ],
    explanation: "Functions: files, memory, peripherals, multitasking, interrupts, security, accounts, interface, platform.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Applications ask the OS for services.", "Security: authentication, access rights, updates, firewall."],
    stem: "A clinic in Chinhoyi uses one shared computer for patient appointments, which is used by three nurses.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the appointments program needs an operating system in order to run.", points: ["The OS provides a platform: the application requests services (files, memory, printing) from the OS", "So the application does not need to control the hardware directly / the OS manages the hardware for it"], modelAnswer: "The appointments program runs on the OS as its platform: it asks the OS to save files, use memory and print, and the OS controls the hardware, so the program does not need to." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how the operating system can keep patient records secure.", points: ["Separate user accounts with passwords / authentication for each nurse", "Access rights so only authorised users can open the records / security updates / firewall"], modelAnswer: "Each nurse has a user account protected by a password, and access rights let only authorised accounts open the patient records." }),
      P.mcq({ label: "(c)", stem: "Which OS function lets each nurse keep her own desktop and settings on the shared computer?", options: [["Managing user accounts", "Correct."], ["Managing memory", "Memory concerns RAM allocation."], ["Handling interrupts", "Interrupts are signals for attention."], ["Managing peripherals", "This concerns devices."]], answer: "A", explanation: "User accounts store each user's settings and files." }),
      P.fib({ label: "(d)", stem: "Complete the sentence.", template: "The OS shares the processor's time between programs so that they appear to run at once; this is called {{blank:a}}.", blanks: [{ id: "a", accepted: ["multitasking"], choices: ["multitasking", "multiprinting", "buffering", "defragmenting"] }], explanation: "Multitasking." }),
    ],
    explanation: "Platform, security through accounts and access rights, user accounts, multitasking.",
  });

  b.card("DEFINITION", "Operating system", "System software that manages hardware and software resources, provides an interface and provides a platform for applications.");
  b.card("CONCEPT", "Functions of an operating system", "Managing files, memory, peripherals and drivers, multitasking, interrupts, user accounts and security; providing an interface and a platform for applications.");
  b.card("CONCEPT", "Managing memory", "Allocating RAM to each program, freeing it when the program closes, preventing programs overwriting each other, using virtual memory when RAM is full.");
  b.card("DEFINITION", "Multitasking", "Running several programs apparently at once by sharing processor time (rapid switching) and memory between them.");
  b.card("CONCEPT", "Managing peripherals", "The OS communicates with devices through device drivers, detects new devices (plug and play) and queues jobs such as printing.");
  b.card("CONCEPT", "GUI vs CLI", "GUI: windows, icons, menus, pointer; easy to learn, more resources. CLI: typed commands; efficient and powerful, but commands must be learned.");
  b.card("CONCEPT", "PC OS vs mobile OS", "Mobile: touch, app store, strict battery and memory management, built-in GPS and mobile data. PC: mouse and keyboard, many windows, large programs, many peripherals.", "ZIMSEC Form 3.", { applies: ZIM });
  b.card("FACT", "Why do applications need an OS?", "They request services (files, memory, printing) from the OS instead of controlling the hardware themselves; the OS is their platform.");
});
