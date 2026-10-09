// Slice w2a: secondary storage, magnetic, optical and solid-state (comp.hardware.secondary-storage).
import { concept, P, ZIM, CAM } from "../lib.mjs";

const usbGiB = 64;
const songMiB = 8;
const songs = (usbGiB * 1024) / songMiB;
const bdGB = 25;
const lessonGB = 3;
const lessonsFit = Math.floor(bdGB / lessonGB);
const ssdGB = 2; // ZIMSEC style: GB to MB
const docMB = 0.5;
const docs = (ssdGB * 1024) / docMB;

concept("comp.hardware.secondary-storage", { file: "hardware/secondary-storage", keyPrefix: "hardware.secondary-storage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why does a computer need **secondary storage**?",
    options: [
      ["To store programs and data permanently, because RAM is volatile", "Correct: secondary storage is non-volatile."],
      ["To hold the instruction that the CPU is executing right now", "That is held in a register (the CIR)."],
      ["To run the bootstrap program when the computer is switched on", "The bootstrap runs from ROM."],
      ["To speed up the CPU by storing frequently used instructions", "That describes cache."],
    ],
    answer: "A",
    explanation: "RAM loses its contents when the power is off, so files and programs are kept on non-volatile secondary storage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of storage has **no moving parts**?",
    options: [
      ["Solid-state", "Correct: flash memory stores data electronically."],
      ["Magnetic hard disk drive", "An HDD has spinning platters and a moving arm."],
      ["Blu-ray disc in a drive", "Optical discs spin in a drive and are read by a moving laser."],
      ["DVD in a drive", "DVDs spin and are read by a moving laser."],
    ],
    answer: "A",
    explanation: "SSDs, SD cards and USB flash drives use flash memory: no moving parts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a hard disk drive, how is data written to the platter?",
    options: [
      ["An electromagnet in the read/write head magnetises tiny areas of the surface", "Correct: the direction of magnetisation represents 1 or 0."],
      ["A laser in the read/write head burns tiny pits into the surface of the platter", "Pits and lands are used on optical discs."],
      ["Electrons are trapped on floating gates in transistors", "That is how flash memory works."],
      ["Ink is sprayed onto the platter in a pattern", "No ink is used in storage devices."],
    ],
    answer: "A",
    explanation: "Magnetic storage: read/write heads use electromagnets to magnetise areas of the platter.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is data read from an optical disc?",
    options: [
      ["A laser is shone on the disc and the reflections from pits and lands are detected", "Correct: changes in reflected light are converted to binary."],
      ["A read/write head detects the direction of magnetised areas on the disc", "That describes a hard disk."],
      ["The charge on each floating gate is measured by the drive", "That describes flash memory."],
      ["A camera photographs the surface of the spinning disc and software then decodes the image", "Optical drives use a laser and a light sensor, not a camera."],
    ],
    answer: "A",
    explanation: "Optical storage: a laser reads the spiral track of pits and lands.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "In flash memory, where are electrons trapped to store data?",
    options: [
      ["On the floating gate", "Correct: the insulating layer keeps them there without power."],
      ["On the control gate", "The control gate's voltage moves electrons onto the floating gate."],
      ["On the magnetic platter", "Platters are part of a hard disk."],
      ["In the pits of the disc", "Pits belong to optical discs."],
    ],
    answer: "A",
    explanation: "Each flash cell has a control gate and a floating gate; trapped charge on the floating gate represents a bit.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What is different about the laser?"],
    stem: "Why can a Blu-ray disc store much more data than a DVD of the same size?",
    options: [
      ["Its blue-violet laser has a shorter wavelength, so smaller pits can be packed closer together", "Correct: smaller pits mean more data per track."],
      ["It spins much faster than a DVD, so the drive can fit many more tracks onto the disc", "Spinning speed affects reading speed, not capacity."],
      ["It stores data magnetically instead of by using pits and lands", "Blu-ray is optical, like a DVD."],
      ["It uses flash memory chips hidden inside the disc", "A Blu-ray disc has no flash memory."],
    ],
    answer: "A",
    explanation: "Shorter wavelength → smaller focused spot → smaller, denser pits → higher capacity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which storage is cheapest for very large amounts of data?"],
    stem: "A company in Harare must back up 20 TB of records every week as cheaply as possible. Speed is not important. Which medium is most suitable?",
    options: [
      ["Magnetic hard disk drives", "Correct: very large capacity at a low cost per gigabyte."],
      ["SD cards", "Their capacity is small and the cost per gigabyte is high for 20 TB."],
      ["CDs", "Hundreds of thousands of CDs would be needed."],
      ["USB flash drives", "Higher cost per gigabyte and smaller capacity than hard disks."],
    ],
    answer: "A",
    explanation: "HDDs give large capacity at a low cost per gigabyte, which suits bulk backups.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about what happens to moving parts when a laptop is dropped or carried."],
    stem: "Why are laptops increasingly built with SSDs rather than HDDs?",
    options: [
      ["SSDs have no moving parts, so they are faster, lighter, use less power and survive knocks", "Correct: all of these matter for a portable computer."],
      ["SSDs are always cheaper per gigabyte than HDDs, so they lower the laptop's price", "SSDs usually cost more per gigabyte."],
      ["SSDs store data magnetically, so they are not affected by magnetic fields at all", "SSDs store data electronically, not magnetically."],
      ["SSDs can be rewritten an unlimited number of times without ever wearing out", "Flash cells have a limited number of write cycles."],
    ],
    answer: "A",
    explanation: "No moving parts: fast access, low weight and power, durable when carried. The trade-off is a higher cost per gigabyte.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The CPU can directly access data stored on a hard disk drive without loading it into RAM first.",
    answer: false,
    explanation: "False. Secondary storage is not directly accessed by the CPU; data is loaded into RAM first.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Each surface of a hard disk platter is divided into tracks, and each track into sectors.",
    answer: true,
    explanation: "True. Data is located by its track and sector.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each storage medium to the type of storage.",
    pairs: ["Hard disk drive", "Blu-ray disc", "SD card", "DVD", "Solid-state drive (SSD)"],
    right: ["Magnetic", "Optical", "Solid-state"],
    rightIndex: [0, 1, 2, 1, 2],
    explanation: "HDD: magnetic. CD, DVD, Blu-ray: optical. SSD, SD card, USB drive: solid-state.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Use the parts of a hard disk drive."],
    stem: "Complete the description of a hard disk drive.",
    template: "Data is stored on spinning {{blank:a}} coated with magnetic material. Each surface is divided into concentric {{blank:b}}, which are split into {{blank:c}}. A read/write head on a moving arm uses an {{blank:d}} to magnetise or detect tiny areas of the surface.",
    blanks: [
      { id: "a", accepted: ["platters"], choices: ["platters", "pits", "lands", "gates"] },
      { id: "b", accepted: ["tracks"], choices: ["tracks", "pages", "pixels", "packets"] },
      { id: "c", accepted: ["sectors"], choices: ["sectors", "cells", "frames", "layers"] },
      { id: "d", accepted: ["electromagnet"], choices: ["electromagnet", "laser", "LED", "floating gate"] },
    ],
    explanation: "Platters, tracks, sectors, electromagnet.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: CAM, calculator: false,
    hints: ["Convert GiB to MiB by multiplying by 1024."],
    stem: `A USB flash drive holds ${usbGiB} GiB. Each music file is ${songMiB} MiB. How many music files can be stored? (Ignore space used by the file system.)`,
    value: songs,
    wrong: [usbGiB * 1000 / songMiB, usbGiB / songMiB],
    explanation: `${usbGiB} × 1024 = ${usbGiB * 1024} MiB; ${usbGiB * 1024} ÷ ${songMiB} = ${songs} files.`,
    workedSolution: `1. ${usbGiB} GiB = ${usbGiB} × 1024 = ${usbGiB * 1024} MiB.\n2. ${usbGiB * 1024} ÷ ${songMiB} = ${songs} files.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: ZIM,
    hints: ["Only whole files fit: round down."],
    stem: `A Blu-ray disc holds ${bdGB} GB. A teacher wants to copy recorded lessons of ${lessonGB} GB each onto it. How many whole lessons fit on the disc?`,
    value: lessonsFit,
    wrong: [Math.ceil(bdGB / lessonGB)],
    explanation: `${bdGB} ÷ ${lessonGB} = ${(bdGB / lessonGB).toFixed(2)}…, so ${lessonsFit} whole lessons fit.`,
    workedSolution: `1. ${bdGB} ÷ ${lessonGB} = ${(bdGB / lessonGB).toFixed(2)}…\n2. Round down: ${lessonsFit} lessons.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "On an optical disc, the tiny hollows formed by the laser are called pits. What are the flat areas between them called?",
    accepted: ["lands", "land"],
    wrong: ["tracks"],
    explanation: "Optical discs store data as pits and lands on a spiral track.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Transistors, gates, electrons, non-volatile."],
    stem: "Describe how solid-state (flash) memory stores data. [4]",
    points: [
      "Uses NAND or NOR technology / made of transistors arranged in cells",
      "Each cell has a control gate and a floating gate",
      "A voltage on the control gate moves electrons onto the floating gate, where they are trapped (by an insulating layer)",
      "Whether charge is trapped or not represents 0 or 1; it stays without power, so it is non-volatile",
    ],
    modelAnswer: "Flash memory uses NAND or NOR cells built from transistors. Each cell has a control gate and a floating gate. Applying a voltage to the control gate pushes electrons onto the floating gate, where they are trapped by insulation. Trapped or not trapped charge represents a 0 or 1, and it remains when the power is removed.",
    explanation: "Transistors, control and floating gates, trapped electrons, non-volatile.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["Choose by capacity, speed, cost, durability and portability.", "Use the parts of each technology when describing how it works."],
    stem: "Sipho is a freelance video editor in Bulawayo. He films on location with a small camera, edits on a laptop and keeps an archive of all his finished projects.",
    parts: [
      P.match({ label: "(a)", stem: "Match each use to the most suitable storage.", pairs: [["Storage inside the small camera", "SD card"], ["Main drive in the editing laptop", "Solid-state drive (SSD)"], ["Cheap archive of several terabytes", "External hard disk drive"]], explanation: "SD card: tiny and robust; SSD: fast; HDD: cheap per GB." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how data is read from the hard disk drive used for the archive.", points: ["The platters spin and the arm moves the read/write head over the correct track", "The data is located by track and sector", "The head detects the direction of magnetisation of each area, which represents 1 or 0"], modelAnswer: "The platters spin while the arm moves the read/write head over the right track. When the sector passes underneath, the head detects the direction in which each tiny area is magnetised; one direction represents 1 and the other 0." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain **two** reasons why an SSD is better than an HDD for editing on the laptop.", points: ["Faster access to data (no moving parts), so large video files open and save quickly", "More durable when the laptop is carried / lighter / uses less power, so the battery lasts longer"], modelAnswer: "With no moving parts, the SSD reads and writes the large video files much faster, and it is not damaged if the laptop is knocked while it is being carried to locations." }),
    ],
    explanation: "SD card, SSD and HDD each suit a different need; HDD reading uses spinning platters, heads and magnetised areas.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    hints: ["1 GB = 1024 MB.", "Compare the media using durability and capacity."],
    stem: `A school office in Mutare stores letters and reports on a ${ssdGB} GB flash drive and keeps older records on DVDs.`,
    parts: [
      P.num({ label: "(a)", type: "CALCULATION", marks: 2, stem: `Each document is ${docMB} MB. Using 1 GB = 1024 MB, calculate how many documents fit on the flash drive.`, value: docs, wrong: [ssdGB * 1000 / docMB], explanation: `${ssdGB} × 1024 = ${ssdGB * 1024} MB; ${ssdGB * 1024} ÷ ${docMB} = ${docs}.`, workedSolution: `1. ${ssdGB} GB = ${ssdGB} × 1024 = ${ssdGB * 1024} MB.\n2. ${ssdGB * 1024} ÷ ${docMB} = ${docs} documents.` }),
      P.mcq({ label: "(b)", stem: "Which type of storage is a DVD?", options: [["Optical", "Correct."], ["Magnetic", "That is a hard disk."], ["Solid-state", "That is flash memory."], ["Primary", "A DVD is secondary storage."]], answer: "A", explanation: "DVDs are optical: read by a laser." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** reasons why the flash drive is more suitable than a DVD for documents that are changed every day.", points: ["Data can be rewritten easily many times / DVDs are often write-once or slow to rewrite", "Faster to access / more durable (no scratches) / more portable / larger capacity"], modelAnswer: "The flash drive can be rewritten quickly every day, whereas a DVD is slow to write and often can only be written once; the flash drive is also not damaged by scratches." }),
    ],
    explanation: `${docs} documents; DVD is optical; flash drives are rewritable, fast and durable.`,
  });

  b.card("DEFINITION", "**Secondary storage**", "Non-volatile storage, not directly accessed by the CPU, that keeps programs and data permanently.");
  b.card("CONCEPT", "Hard disk drive", "Spinning magnetic platters, tracks and sectors; read/write heads use electromagnets to magnetise or detect areas.");
  b.card("CONCEPT", "Optical disc", "A laser forms and reads pits and lands on a spiral track; reflection changes are read as binary.");
  b.card("FACT", "CD, DVD, Blu-ray", "Capacity rises CD < DVD < Blu-ray: Blu-ray's blue-violet laser has a shorter wavelength, so smaller pits.");
  b.card("CONCEPT", "Flash memory", "NAND or NOR cells of transistors; electrons trapped on the floating gate (moved by the control gate) represent bits.", undefined, { applies: CAM });
  b.card("FACT", "Solid-state examples", "SSD, SD card, USB flash drive.");
  b.card("CONCEPT", "SSD vs HDD", "SSD: faster, no moving parts, durable, low power, higher cost per GB. HDD: large and cheap per GB, moving parts, slower.");
  b.card("FACT", "Five ways to compare storage", "Capacity, access speed, cost per GB, durability, portability.");
  b.card("DEFINITION", "**Storage medium vs device**", "Medium: what holds the data (disc, platter). Device: the hardware that reads/writes it (drive).");
});
