// Slice w1b: secondary storage devices (acs.hardware.secondary-storage, Cambridge AS).
import { concept, P, chk, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.hardware.secondary-storage", { file: "hardware/secondary-storage", keyPrefix: "hardware.secondary-storage", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "How does a magnetic hard disk record a binary digit?",
    ["As a magnetised area of the platter surface", "Correct: the head magnetises a tiny area in one of two directions."],
    [["As a pit or a land in a spiral track", "That describes an optical disc."], ["As charge trapped on a floating gate in a cell", "That describes flash memory in an SSD."], ["As a voltage held by a capacitor that is refreshed", "That describes DRAM, which is primary memory."]],
    "A hard disk stores bits as the direction of magnetism in tiny areas of a coated platter.");
  mc(b, 2, "UNDERSTANDING", "Which feature of a solid-state drive makes it better than a hard disk when it is carried around on a bumpy road?",
    ["It has no moving parts that can be damaged", "Correct: there are no platters or heads to be knocked."],
    [["It has a larger capacity for the same price", "Capacity per price is usually in favour of the hard disk."], ["It uses a laser to read the data quickly", "Lasers are used in optical drives, not SSDs."], ["It stores data in magnetised tracks that cannot move", "SSDs do not use magnetism."]],
    "An SSD has no spinning platters or moving heads, so a knock is much less likely to damage it.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A drive shines a laser at a disc and a sensor measures how much light is reflected. What is being read?",
    ["The pits and lands on the track", "Correct: lands reflect strongly and pits scatter the light."],
    [["The direction of magnetism on the platter", "A magnetic head senses magnetism; a laser does not."], ["The charge on a floating gate", "Flash cells are read electrically, not with light."], ["The sector number under a read-write head", "Sector addressing is part of a hard disk, which uses no laser."]],
    "Optical storage reads the difference in reflection between pits and lands.", { daily: true });
  mc(b, 3, "APPLICATION", "A surveyor in Hwange must keep a copy of a large map database in the office safe, away from the laptop she uses in the field. Which is the most suitable backup device?",
    ["An external hard disk", "Correct: large capacity, low cost per GiB and easily stored elsewhere."],
    [["A second partition on the laptop's own drive", "A copy on the same drive is lost if that drive fails or is stolen."], ["The laptop's RAM", "RAM loses its data when the power is off and is not a backup."], ["A small memory card in the laptop's slot", "The card stays with the laptop and may be too small for a large database."]],
    "A backup should be on a different device and in a different place, with enough capacity for the data.", { hints: ["A backup must survive the loss of the laptop."] });
  mc(b, 3, "ANALYSIS", "What does the term rotational latency mean for a hard disk?",
    ["The wait for the required sector to turn under the head", "Correct: it is the delay caused by the spinning of the platter."],
    [["The time taken for the arm to move to the correct track on the platter", "That is the seek time."], ["The time taken to copy the data to main memory", "That is the transfer time."], ["The number of times the platter is rewritten each year", "Rewrite limits concern flash memory, not latency."]],
    "Access time is seek time (moving the arm) plus rotational latency (waiting for the sector) plus transfer time.", { hints: ["The latency is caused by the platter spinning, not by the arm."] });
  mc(b, 3, "UNDERSTANDING", "Why do the controllers of solid-state drives use wear levelling?",
    ["To spread writes so that no block is erased too often", "Correct: each flash block survives a limited number of erase cycles."],
    [["To keep the platters spinning at an even speed", "SSDs have no platters."], ["To make the laser focus on the correct track", "SSDs have no laser."], ["To refresh the capacitors in each cell every few milliseconds", "Refreshing is needed for DRAM, not for flash."]],
    "Because flash cells wear out after many erase cycles, the controller spreads the writes evenly across all blocks.", { hints: ["What limits the life of a flash cell?"] });
  mc(b, 4, "EVALUATION", "A school wants to store 4 TiB of old exam papers that will rarely be read, as cheaply as possible, and does not need fast access. Which statement gives the best justification for a hard disk rather than an SSD?",
    ["It gives more storage for a lower cost per GiB", "Correct: capacity and cost matter more than speed here."],
    [["It has no moving parts, so it is the most durable option", "Moving parts are a weakness of a hard disk."], ["It uses less power than any SSD in all situations", "SSDs usually use less power."], ["It reads data faster because it needs no seek", "Hard disks must seek, so they are generally slower."]],
    "For large, rarely used archives, low cost per GiB is the deciding factor, and the slower access does not matter.", { hints: ["Which two features matter most in this scenario?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "On an optical disc, the pits reflect more light back to the sensor than the lands do.", answer: false,
    explanation: "False. Lands are flat and reflect the light strongly; pits scatter it, so less light reaches the sensor." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "A solid-state drive has no read-write head.", answer: true,
    explanation: "True. An SSD reads and writes through electronic circuits connected to its flash cells; heads belong to hard disks." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each storage device to the way in which it holds a bit.",
    pairs: [["Hard disk", "Magnetised area on a platter"], ["Solid-state drive", "Charge trapped on a floating gate"], ["DVD", "Pit or land on a spiral track"], ["Blu-ray disc", "Pit read by a blue-violet laser"]],
    explanation: "Magnetism, trapped charge and physical pits are the three methods; Blu-ray uses a shorter wavelength laser than a DVD." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of a hard disk.",
    template: "Data is stored on spinning {{blank:a}} divided into tracks and {{blank:b}}. A {{blank:c}} on a moving arm magnetises and senses the surface.",
    blanks: [
      { id: "a", accepted: ["platters"], choices: ["platters", "cells", "lasers", "pits"] },
      { id: "b", accepted: ["sectors"], choices: ["sectors", "diodes", "pages", "lands"] },
      { id: "c", accepted: ["read-write head"], choices: ["read-write head", "laser", "floating gate", "diaphragm"] },
    ],
    explanation: "A hard disk has platters divided into tracks and sectors, and a read-write head on an arm." });
  const rpm = 6000;
  const latency = (60 / rpm) * 1000 / 2;
  chk(latency, 5);
  b.num({ d: 2, skill: "APPLICATION", calculator: false, unit: "ms", stem: "A hard disk spins at 6000 revolutions per minute. Calculate the average rotational latency in milliseconds, assuming the sector is on average half a turn away.",
    value: latency, wrong: [10, 0.005],
    workedSolution: "1. One revolution = 60 ÷ 6000 = 0.01 s = 10 ms.\n2. Average latency = half a revolution = 5 ms.",
    explanation: "One revolution takes 10 ms, so the average wait is 5 ms." });
  const access = 10 + latency;
  chk(access, 15);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "ms", hints: ["Access time = seek time + rotational latency."],
    stem: "The disk in the previous question has an average seek time of 10 ms. Calculate its average access time, ignoring the transfer time.",
    value: access, wrong: [10, 5],
    workedSolution: "1. Average latency = 5 ms (half of 10 ms).\n2. Access time = seek + latency = 10 + 5 = 15 ms.",
    explanation: "Access time = 10 ms + 5 ms = 15 ms." });
  const secs = (2 * 1024) / 128;
  chk(secs, 16);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "s", hints: ["Convert 2 GiB to MiB first (1 GiB = 1024 MiB)."],
    stem: "A backup copies 2 GiB of files to an external drive at a steady 128 MiB per second. How many seconds does the copy take?",
    value: secs, wrong: [0.0625, 256],
    workedSolution: "1. 2 GiB = 2 × 1024 = 2048 MiB.\n2. Time = 2048 ÷ 128 = 16 seconds.",
    explanation: "2048 MiB ÷ 128 MiB per second = 16 s." });
  const cells = 2 ** 30 * 8 / 2;
  chk(cells, 2 ** 32);
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Bits = bytes × 8; each cell holds 2 bits."],
    stem: "A flash memory chip stores 1 GiB. Each cell holds 2 bits. How many cells does the chip contain?",
    value: cells, wrong: [2 ** 33, 2 ** 30],
    workedSolution: "1. 1 GiB = 2^30 bytes = 2^30 × 8 = 2^33 bits.\n2. Two bits per cell: 2^33 ÷ 2 = 2^32 cells = 4 294 967 296.",
    explanation: "2^33 bits at 2 bits per cell gives 2^32 = 4 294 967 296 cells." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four points: spiral track, laser, reflection, interpretation."],
    stem: "Describe how data is read from an optical disc. [4]",
    points: ["Data is stored on a spiral track of pits and lands", "A laser shines onto the track as the disc spins", "Lands reflect the light strongly and pits scatter it", "A sensor detects the reflected light and the changes are interpreted as the binary data"],
    modelAnswer: "The disc has a spiral track of pits and lands. As it spins, a laser is shone onto the track. Lands reflect the light and pits scatter it, and a sensor reads the changes in reflected light as binary data.",
    explanation: "One mark for each stage." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Link each reason to a handheld device, such as a rugged tablet."],
    stem: "Explain why a solid-state drive is more suitable than a hard disk for a rugged handheld tablet used on farms. [3]",
    points: ["No moving parts, so it survives knocks and vibration", "Uses less power, so the battery lasts longer", "Faster access, so programs and files open quickly"],
    modelAnswer: "An SSD has no moving parts so knocks do not damage it, it uses less power so the battery lasts longer, and it gives faster access to data.",
    explanation: "Durability, power use and speed are the expected advantages." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Where is the copy kept, on what, how often?"],
    stem: "A secondary school in Kariba keeps the term's examination marks on one office computer. Design a backup plan. [4]",
    points: ["Copy the data to a different device, such as an external hard disk or memory card", "Keep the copy in a different place (for example a locked cabinet in another building)", "Back up regularly (for example every evening or after each marks entry session)", "Check occasionally that the backup can be restored"],
    modelAnswer: "Copy the marks every evening to an external hard disk. Keep the disk in a locked cabinet in a different building so that fire or theft in the office cannot destroy both copies. Test that the files can be restored once a term.",
    explanation: "Credit a different device, a different place, regularity and testing." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Latency is half a revolution.", "Compare the two drives using the stated feature."],
    explanation: "Latency is half of 8.33 ms; access time adds the seek time; an SSD has neither delay; a hard disk is cheaper per GiB for an archive.",
    stem: "A hospital in Mutare compares two drives for storing scanned patient records. Drive X is a hard disk spinning at 7200 rpm with an average seek time of 8 ms. Drive Y is a solid-state drive.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the time for one revolution of drive X, in milliseconds, to 2 decimal places.", value: 8.33, answer: "8.33", tol: 0.01, unit: "ms", wrong: [16.67, 0.00833],
        workedSolution: "1. 7200 rpm = 7200 revolutions in 60 s.\n2. One revolution = 60 ÷ 7200 s = 0.008333 s = 8.33 ms.", explanation: "60 ÷ 7200 = 0.00833 s = 8.33 ms." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the average access time of drive X, in milliseconds, to 2 decimal places. Ignore the transfer time.", value: 12.17, answer: "12.17", tol: 0.01, unit: "ms", wrong: [16.33, 8],
        workedSolution: "1. Average latency = 8.33 ÷ 2 = 4.17 ms.\n2. Access time = 8 + 4.17 = 12.17 ms.", explanation: "Seek 8 ms plus average latency 4.17 ms gives 12.17 ms." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why drive Y has a shorter access time than drive X.", points: ["It has no seek time because there is no arm to move", "It has no rotational latency because nothing has to spin to the data"], modelAnswer: "There is no arm to move and no platter to wait for, so data is found almost immediately.", explanation: "Both seek time and rotational latency are removed." }),
      P.manual({ label: "(d)", marks: 2, stem: "The hospital stores 30 TiB of scans that are seldom opened. State which drive type it should buy and justify the choice.", points: ["Hard disk", "Lower cost per GiB / larger capacity for the money, and speed is not critical"], modelAnswer: "A hard disk, because it stores very large amounts at a lower cost per GiB and fast access is not needed for rarely opened files.", explanation: "Cost and capacity decide for an archive." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Think about what is trapped in the floating gate."],
    explanation: "Flash holds trapped electrons on floating gates, wears out after many erases, and gives speed, silence and durability.",
    stem: "A school computer laboratory is fitted with solid-state drives that use flash memory.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What is held on the floating gate of a flash cell?", options: [["Trapped electrons", "Correct: the trapped charge represents the stored bit."], ["A magnetic pole", "Magnetism is used in hard disks."], ["A pit or land", "These are on optical discs."], ["A capacitor charge that is refreshed", "DRAM needs refreshing; flash does not."]], answer: "A", explanation: "Electrons trapped on the floating gate keep their charge when the power is off." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why each block of flash memory can only be erased a limited number of times and what the controller does about it.", points: ["Each erase cycle gradually damages the insulating layer so the cell wears out", "The controller uses wear levelling to spread writes evenly over all blocks"], modelAnswer: "Every erase damages the insulating layer a little, so cells eventually fail. Wear levelling spreads writes across all blocks.", explanation: "Cause and remedy for one mark each." }),
      P.manual({ label: "(c)", marks: 3, stem: "State three advantages of SSDs over hard disks for the laboratory.", points: ["Faster access to files", "Silent / no moving parts so more robust", "Lower power consumption"], modelAnswer: "They are faster, silent and robust with no moving parts, and they use less power.", explanation: "Any three valid advantages." }),
    ] });
  b.card("DEFINITION", "Secondary storage", "Non-volatile storage for programs and data, not directly accessed by the processor.");
  b.card("CONCEPT", "Hard disk storage", "Magnetised areas on spinning platters, read and written by heads on an arm, arranged in tracks and sectors.");
  b.card("FORMULA", "Hard disk access time", "Access time = seek time + rotational latency (+ transfer time).", "Average latency is half a revolution.");
  b.card("CONCEPT", "SSD storage", "Floating-gate flash cells trap charge; no moving parts; fast, silent, durable; limited erase cycles.");
  b.card("DEFINITION", "Wear levelling", "The SSD controller spreads writes evenly over all blocks so that none wears out early.");
  b.card("CONCEPT", "Optical disc", "A spiral track of pits and lands read by a laser; a shorter wavelength allows a higher capacity.");
  b.card("FACT", "Laser colours", "CD: infrared. DVD: red. Blu-ray: blue-violet.");
  b.card("CONCEPT", "Good backup", "A copy on a different device in a different place, made regularly and tested.");
  b.card("FORMULA", "Transfer time", "Time = size ÷ transfer rate (convert units first).");
});
