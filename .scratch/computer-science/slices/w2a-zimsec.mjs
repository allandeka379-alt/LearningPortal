// Slice w2a: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, ZIM } from "../lib.mjs";

const C = (k) => `comp.${k}`;
const ramGB = 6;
const ramMB = ramGB * 1024;

concept(C("hardware.cpu"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("hardware.cpu"), C("hardware.primary-storage"), C("hardware.secondary-storage")],
    hints: ["The ALU calculates and compares; the control unit decodes and co-ordinates.", "1 GB = 1024 MB."],
    stem: "A college in Masvingo is buying new laptops for its accounts department.",
    parts: [
      P.mcq({ label: "(a)", stem: "The laptops' spreadsheets check whether each fee payment is greater than the amount owed. Which part of the CPU carries out this check?", options: [["Arithmetic logic unit", "Correct: comparisons are logical operations."], ["Control unit", "The CU decodes and co-ordinates; it does not compare."], ["Main memory", "Memory holds the values."], ["Hard disk drive", "Secondary storage only keeps the files."]], answer: "A", explanation: "Comparisons are done by the ALU." }),
      P.match({ label: "(b)", stem: "Match each item to its function.", pairs: [["Control unit", "Decodes instructions and sends control signals"], ["RAM", "Holds the programs and data currently in use"], ["ROM", "Holds the start-up (bootstrap) instructions"]], explanation: "CU: decode and control; RAM: data in use; ROM: bootstrap." }),
      P.num({ label: "(c)", stem: `Each laptop has ${ramGB} GB of RAM. Using 1 GB = 1024 MB, state this amount in MB.`, value: ramMB, unit: "MB", wrong: [ramGB * 1000], explanation: `${ramGB} × 1024 = ${ramMB} MB.`, workedSolution: `1. 1 GB = 1024 MB.\n2. ${ramGB} × 1024 = ${ramMB} MB.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why each laptop needs both RAM and ROM.", points: ["ROM is non-volatile, so the start-up instructions are kept when the laptop is off and can load the operating system", "RAM is read-write (volatile), so it can hold the programs and data being used, which change all the time"], modelAnswer: "ROM keeps the bootstrap when the power is off, so the laptop can start and load the operating system. RAM can be written to, so it holds the spreadsheets and data being worked on, which change constantly." }),
      P.manual({ label: "(e)", marks: 3, stem: "The supplier offers each laptop with either a 1 TB hard disk drive or a 512 GB solid-state drive. Recommend one for the accounts staff and justify your choice.", points: ["Recommends the SSD (or the HDD with a valid justification)", "SSD: faster access / quicker start-up and file opening, because there are no moving parts", "SSD: more durable if the laptop is knocked / lighter / uses less power; 512 GB is enough for documents and spreadsheets (HDD advantage: larger capacity, cheaper per GB)"], modelAnswer: "The SSD. It has no moving parts, so the laptops start and open files faster and are less likely to be damaged if knocked. Accounts files are small, so 512 GB is plenty, even though the HDD has more space for the price." }),
    ],
    explanation: `(a) ALU (b) CU decodes and controls, RAM holds data in use, ROM holds the bootstrap (c) ${ramMB} MB.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("hardware.input-devices"), C("hardware.output-devices"), C("hardware.data-capture-systems")],
    hints: ["Barcodes hold codes; prices are in the database.", "Chip cards store encrypted data."],
    stem: "A supermarket in Gweru uses point-of-sale (POS) terminals, and its bank has an ATM at the entrance.",
    parts: [
      P.match({ label: "(a)", stem: "Classify each POS device as an input device or an output device.", pairs: ["Barcode scanner", "Receipt printer", "Electronic scale"], right: ["Input device", "Output device"], rightIndex: [0, 1, 0], explanation: "The scanner and scale capture data (input); the receipt printer presents results (output)." }),
      P.mcq({ label: "(b)", stem: "What is stored in the barcode on each product?", options: [["The product code", "Correct: the price is looked up in the database."], ["The price", "Prices are held in the stock file."], ["The stock level", "Stock levels are held in the database."], ["The expiry date and price", "The barcode holds only the product code."]], answer: "A", explanation: "Barcode = product code." }),
      P.short({ label: "(c)", stem: "The bank also processes cheques. Name the data-capture method used to read the numbers printed in magnetic ink along the bottom of a cheque.", accepted: ["MICR", "magnetic ink character recognition", "magnetic ink character reader"], wrong: ["OCR"], explanation: "MICR reads magnetic-ink characters." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the POS system finds an item's price and keeps the stock level up to date when the item is scanned.", points: ["The barcode is read and the product code is searched for in the stock file/database", "The description and price are returned, displayed and added to the bill", "The stock level is reduced and compared with the reorder level (flagged for reorder if low)"], modelAnswer: "The scanner reads the product code, which is looked up in the stock database. The description and price are returned and added to the bill. The stock level is reduced and checked against the reorder level, so low stock is reordered." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain **two** reasons why the bank issues chip-and-PIN cards for its ATM instead of cards with only a magnetic stripe.", points: ["The chip stores encrypted data, so the card is much harder to copy/clone (skimming)", "A PIN must be entered, so a stolen card cannot easily be used"], modelAnswer: "The chip stores encrypted data, so criminals cannot easily copy the card with a skimmer, and the PIN means a stolen card is useless without the number." }),
    ],
    explanation: "(a) input, output, input (b) product code (c) MICR.",
  });
});
