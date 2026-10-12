// Slice w1b: virtual machines (acs.cpu.virtual-machines, Cambridge A Level).
import { concept, P, chk, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.cpu.virtual-machines", { file: "cpu/virtual-machines", keyPrefix: "cpu.virtual-machines", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "What is a virtual machine?",
    ["Software that behaves like a separate computer", "Correct: it imitates a whole computer system."],
    [["A computer that has no physical components of any kind", "A VM runs on real hardware belonging to the host."], ["A very small and cheap physical computer in a school", "A VM is software, not a small physical computer."], ["A program that translates source code into object code", "That is a compiler."]],
    "A virtual machine is software that emulates a computer, so programs run as if on separate hardware.");
  mc(b, 2, "UNDERSTANDING", "In virtualisation, what is the host?",
    ["The real computer that runs the virtual machines", "Correct: the guests run on the host's hardware."],
    [["The operating system installed inside the virtual machine itself", "That is the guest operating system."], ["The file that stores the virtual disk of a single VM", "That is part of the guest's virtual hardware."], ["The user who is logged in to the guest machine", "A user is neither the host nor the guest."]],
    "The host is the physical machine, with its operating system, that supports the guests.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the role of a hypervisor?",
    ["It creates VMs and shares out the host's resources", "Correct: it also keeps the guests separate from each other."],
    [["It translates Java source code into bytecode for the JVM", "That is a Java compiler."], ["It stores backup copies of all of the host's files", "That is the job of backup software."], ["It increases the clock speed of the host processor", "A hypervisor does not change the clock speed."]],
    "A hypervisor creates guests, allocates processor, memory and storage to them and isolates them.");
  mc(b, 2, "RECALL", "What does a Java virtual machine run?",
    ["Bytecode", "Correct: compiled Java programs are in bytecode."],
    [["Machine code for only one type of processor", "That would stop the program being portable."], ["Source code written by the programmer", "The source is first compiled to bytecode."], ["The BIOS of the host", "The JVM does not run the BIOS."]],
    "Java is compiled to bytecode, which any JVM can run.", { daily: true });
  mc(b, 3, "APPLICATION", "A teacher wants to test a program from an unknown source without risking the school's computer. Which is the best benefit of using a virtual machine?",
    ["Any damage stays inside the VM and can be undone", "Correct: isolation protects the host and snapshots allow recovery."],
    [["The program will run faster than on the real computer itself", "Programs normally run a little slower in a VM."], ["The program does not need an operating system", "The guest still has an operating system."], ["The VM uses none of the host's memory", "Each VM uses some of the host's memory."]],
    "A VM is isolated from the host, so a fault or malware stays inside the VM.", { hints: ["Which feature stops a fault from spreading?"] });
  mc(b, 3, "ANALYSIS", "Why does a guest operating system usually run a little more slowly than the same system on real hardware?",
    ["The hypervisor adds a layer above the hardware", "Correct: requests go through the hypervisor."],
    [["The guest has no processor to use at all on the host", "It uses a share of the host's processor."], ["The guest's programs are always much larger than normal", "Program size is not the reason."], ["The guest cannot use any of the host's memory", "The hypervisor gives it memory from the host."]],
    "Virtualisation overhead: every hardware request passes through the hypervisor.", { hints: ["Think about what sits between the guest and the hardware."] });
  mc(b, 3, "UNDERSTANDING", "Why can the same Java program run on a phone and on a server without being recompiled?",
    ["Each device has a JVM that runs the same bytecode", "Correct: the bytecode is the same, the JVM differs by platform."],
    [["The program is converted to the machine code of every processor in advance", "Only one bytecode file is produced."], ["Java programs do not need any processor", "Every program is ultimately run by a processor."], ["The phone and server have the same hardware", "They usually have different processors."]],
    "The JVM is written for each platform and translates the common bytecode for the local processor.", { hints: ["Think about what differs between devices and what stays the same."] });
  mc(b, 4, "EVALUATION", "A company moves ten servers onto one physical host as virtual machines. Which is a significant risk?",
    ["If the host fails, all ten VMs stop", "Correct: the host is a single point of failure."],
    [["Each VM must have its own physical processor", "VMs share the host's processors."], ["The ten VMs can no longer be backed up", "VM images can be copied for backup."], ["The VMs cannot be isolated from each other", "Isolation is one of the main benefits."]],
    "Consolidation saves hardware but puts all the services on a single host, so its failure affects them all.", { hints: ["What do all ten servers now depend on?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Java bytecode is the machine code of the processor in the device.", answer: false,
    explanation: "False. Bytecode is the code of an imaginary computer. The JVM turns it into the machine code of the real processor." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A fault in one guest virtual machine does not normally affect the other guests or the host.", answer: true,
    explanation: "True. The hypervisor keeps the guests isolated from each other and from the host." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Host", "The real computer that runs the virtual machines"], ["Guest", "A virtual machine with its own operating system"], ["Hypervisor", "Software that creates and manages virtual machines"], ["Bytecode", "Code for the Java virtual machine"], ["Snapshot", "A saved state of a VM that can be restored"]],
    explanation: "These five terms describe virtualisation." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about virtual machines.",
    template: "A {{blank:a}} creates and manages virtual machines. Each virtual machine is called a {{blank:b}} and runs on the real {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hypervisor"], choices: ["hypervisor", "compiler", "buffer", "bootstrap"] },
      { id: "b", accepted: ["guest"], choices: ["guest", "host", "server", "register"] },
      { id: "c", accepted: ["host"], choices: ["host", "guest", "bytecode", "snapshot"] },
    ],
    explanation: "Hypervisor, guest and host." });
  const load = 16 * 0.1;
  const hosts = Math.ceil(load / 0.6);
  chk(hosts, 3);
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Total load = servers × utilisation; divide by the load allowed per host and round up."],
    stem: "A district office has 16 servers, each using 10% of the capacity of its machine. They are moved to hosts, each of which is to run at no more than 60% of its capacity. What is the smallest number of hosts needed?",
    value: 3, wrong: [2, 16], workedSolution: "1. Total load = 16 × 0.1 = 1.6 machines.\n2. 1.6 ÷ 0.6 = 2.67 hosts.\n3. Round up: 3 hosts.", explanation: "1.6 ÷ 0.6 = 2.67, so 3 hosts are needed." });
  const avail = 96 - 12;
  const vms = Math.floor(avail / 8);
  chk(vms, 10);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Subtract what the host keeps, divide, round down."],
    stem: "A host has 96 GiB of memory. 12 GiB are kept for the host operating system and hypervisor, and each virtual machine is given 8 GiB. What is the greatest number of virtual machines that can run at the same time?",
    value: 10, wrong: [12, 11], workedSolution: "1. Memory for guests = 96 − 12 = 84 GiB.\n2. 84 ÷ 8 = 10.5.\n3. Round down: 10 virtual machines.", explanation: "84 ÷ 8 = 10.5, so 10 VMs fit." });
  chk(vms * 25, 250);
  b.num({ d: 2, skill: "APPLICATION", calculator: false, unit: "GiB", stem: "Each of 10 virtual machines has a virtual disk of 25 GiB, stored as files on the host. How much disk space on the host is needed in total?",
    value: 250, wrong: [35, 25], workedSolution: "1. Total = 10 × 25 = 250 GiB.", explanation: "10 × 25 = 250 GiB." });
  chk(84 - 80, 4);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "GiB", hints: ["Memory left for guests minus the memory used by the VMs."],
    stem: "On the same host 84 GiB of memory is available to guests and 10 VMs of 8 GiB each are running. How much memory is left unused?",
    value: 4, wrong: [8, 80], workedSolution: "1. Used = 10 × 8 = 80 GiB.\n2. Spare = 84 − 80 = 4 GiB.", explanation: "84 − 80 = 4 GiB." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Virtual hardware, guest operating system, resources, requests."],
    stem: "Describe how a hypervisor allows a guest operating system to run on a host computer. [4]",
    points: ["The hypervisor creates virtual hardware (processor, memory, disk) for the guest", "The guest operating system is installed on the virtual hardware and does not know it is virtual", "The hypervisor allocates part of the host's real resources to the guest", "Hardware requests from the guest are passed through the hypervisor to the real hardware"],
    modelAnswer: "The hypervisor creates virtual hardware for the guest and allocates part of the host's memory, storage and processor time to it. The guest operating system runs on this virtual hardware, and its hardware requests are passed through the hypervisor to the real hardware.",
    explanation: "Virtual hardware, allocation, guest, requests." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Isolation, consolidation, testing, portability."],
    stem: "State three benefits to a company of running its servers as virtual machines. [3]",
    points: ["Fewer physical servers are needed, which reduces cost and power", "A fault in one VM does not affect the others (isolation)", "VMs can be copied or moved to another host and restored from a snapshot"],
    modelAnswer: "Fewer physical servers are needed, so cost and power fall. A fault in one VM does not affect the others. VMs can be copied, moved and restored from a snapshot.",
    explanation: "Any three valid benefits." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compile once, run anywhere: what is common and what is local?"],
    stem: "Explain how the Java virtual machine makes it possible for one compiled program to run on different types of device. [3]",
    points: ["The Java compiler produces bytecode, not machine code for a particular processor", "Each type of device has its own JVM", "The JVM translates the bytecode for the local processor as the program runs"],
    modelAnswer: "The compiler produces bytecode that is the same for every device. Each device has its own JVM, which translates the bytecode for its own processor while the program runs.",
    explanation: "Common bytecode, local JVM, translation." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 2, hints: ["Think about speed and resources."],
    stem: "State two limitations of using virtual machines. [2]",
    points: ["A guest runs more slowly than on real hardware because of the hypervisor layer", "Each VM uses part of the host's memory, storage and processor, which limits how many can run"],
    modelAnswer: "A guest runs more slowly than on real hardware, and each VM uses some of the host's memory and processor time, which limits the number.",
    explanation: "Any two valid limitations." });
  chk(Math.floor((64 - 8) / 12), 4);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Memory for guests = total − reserved.", "Round down for VMs."],
    explanation: "56 GiB ÷ 12 GiB = 4.67, so 4 VMs fit; isolation and snapshots make the lab safe.",
    stem: "A technical college in Gweru runs a computer science laboratory on one server with 64 GiB of memory. 8 GiB are reserved for the host operating system and hypervisor, and each student virtual machine needs 12 GiB.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the greatest number of student virtual machines that can run at the same time.", value: 4, wrong: [5, 6], workedSolution: "1. Memory for guests = 64 − 8 = 56 GiB.\n2. 56 ÷ 12 = 4.67.\n3. Round down: 4.", explanation: "56 ÷ 12 = 4.67, so 4 VMs." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What name is given to the software that creates the student virtual machines?", options: [["A hypervisor", "Correct."], ["A bytecode compiler", "A bytecode compiler produces Java bytecode."], ["A snapshot", "A snapshot is a saved state of a VM."], ["A host", "The host is the physical machine."]], answer: "A", explanation: "A hypervisor creates and manages virtual machines." }),
      P.manual({ label: "(c)", marks: 3, stem: "A student installs a faulty driver that makes their virtual machine crash. Explain why this does not affect the other students.", points: ["Each virtual machine is isolated from the others by the hypervisor", "The fault is inside the guest operating system of that VM only", "The VM can be restored from a snapshot or rebuilt without affecting the others"], modelAnswer: "The hypervisor keeps each VM isolated, so the crash is confined to that student's guest operating system. The VM can be restored from a snapshot while the others keep running.", explanation: "Isolation and recovery." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two disadvantages of this arrangement compared with each student using a separate computer.", points: ["If the server fails all the virtual machines stop", "The VMs share the server's resources so each is slower / the server needs plenty of memory"], modelAnswer: "If the server fails, every VM stops, and the VMs share the server's resources so each may run more slowly.", explanation: "Single point of failure and shared resources." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Think about what the compiler produces."],
    explanation: "Bytecode is the same on every device; each device's JVM translates it, giving portability but some loss of speed.",
    stem: "A company in Harare writes a mobile banking application in Java. It must run on several different makes of phone.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What does the Java compiler produce?", options: [["Bytecode", "Correct."], ["Machine code for one processor only", "That would not be portable."], ["A hypervisor", "A hypervisor is not produced by compiling."], ["A snapshot", "A snapshot is a saved VM state."]], answer: "A", explanation: "The Java compiler produces bytecode." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the same bytecode can be used on all of the phones.", points: ["Each phone has a Java virtual machine suited to its own processor", "The JVM translates the same bytecode for the local hardware"], modelAnswer: "Each phone has its own JVM, which translates the same bytecode for its own processor.", explanation: "Local JVM, common bytecode." }),
      P.manual({ label: "(c)", marks: 3, stem: "State two disadvantages of running the application on a virtual machine rather than as machine code compiled for the phone.", points: ["The application may run more slowly because the bytecode must be translated as it runs", "The JVM uses extra memory and processor time", "Each phone must have a suitable JVM installed"], modelAnswer: "The bytecode is translated while the program runs, so it can be slower; the JVM uses extra memory; and each phone needs a JVM installed.", explanation: "Slower and uses more resources." }),
    ] });
  b.card("DEFINITION", "Virtual machine", "Software that behaves like a computer, so that programs run on it as on separate hardware.");
  b.card("DEFINITION", "Host and guest", "Host: the real computer and operating system. Guest: a virtual machine running on the host.");
  b.card("DEFINITION", "Hypervisor", "Software that creates virtual machines, shares the host's resources between them and keeps them isolated.");
  b.card("CONCEPT", "Java virtual machine", "Runs Java bytecode on any device with a JVM, giving portability.");
  b.card("FACT", "Benefits of virtual machines", "Isolation, safe testing and snapshots, different systems on one machine, server consolidation, portability.");
  b.card("FACT", "Limitations of virtual machines", "Slower than native, use host resources, limited hardware access, licensing, single point of failure.");
  b.card("CONCEPT", "Sizing", "Number of VMs = (host memory − reserved) ÷ memory per VM, rounded down; hosts needed rounded up.");
  b.card("DEFINITION", "Emulation", "Using software to make one system behave like another.");
});
