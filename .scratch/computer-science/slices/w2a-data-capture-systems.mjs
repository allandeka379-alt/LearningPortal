// Slice w2a: data capture systems, POS terminals and ATMs (comp.hardware.data-capture-systems, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const stock = 120;
const sold = [18, 27, 33, 22];
const reorder = 30;
const left = stock - sold.reduce((s, x) => s + x, 0);
const needReorder = left <= reorder;

concept("comp.hardware.data-capture-systems", { file: "hardware/data-capture-systems", keyPrefix: "hardware.data-capture-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which data-capture method reads shaded boxes on multiple-choice answer sheets?",
    options: [
      ["Optical mark recognition (OMR)", "Correct: it detects marks in set positions."],
      ["Optical character recognition (OCR)", "OCR recognises letters and digits, not shaded boxes."],
      ["Magnetic ink character recognition (MICR)", "MICR reads magnetic ink on cheques."],
      ["Radio frequency identification (RFID)", "RFID reads tags by radio."],
    ],
    answer: "A",
    explanation: "OMR: marks in fixed positions. OCR: characters. MICR: magnetic ink. RFID: radio tags.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is MICR used?",
    options: [
      ["Reading the numbers printed along the bottom of cheques", "Correct: they are printed in magnetic ink."],
      ["Reading product codes at a supermarket till", "That uses barcodes."],
      ["Reading tags on cattle ear tags", "That uses RFID."],
      ["Reading shaded boxes on examination answer sheets", "That uses OMR."],
    ],
    answer: "A",
    explanation: "MICR reads the cheque number, branch code and account number printed in magnetic ink.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What data is stored in the barcode on a tin of beans?",
    options: [
      ["The product code only", "Correct: the price and description are looked up in the stock file."],
      ["The price of the tin", "Prices are kept in the database so they can be changed easily."],
      ["The number of tins left in stock", "Stock levels are kept in the database."],
      ["The name of the customer who buys it", "The barcode identifies the product, not the customer."],
    ],
    answer: "A",
    explanation: "Barcodes hold a product code. The POS system uses it to look up the description and price.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are chip-and-PIN cards more secure than cards with only a magnetic stripe?",
    options: [
      ["The chip stores encrypted data that is much harder to copy", "Correct: magnetic stripes are easily skimmed."],
      ["The chip holds the customer's cash inside the card", "The money is held in the bank account, not the card."],
      ["Chip cards never need a PIN to be entered", "Chip and PIN cards require a PIN (except small contactless payments)."],
      ["The chip can be read without the card being near the reader", "Readers must be close to the card."],
    ],
    explanation: "Encrypted data in the chip is hard to clone, and the PIN adds a second check.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which ATM device is an **output** device?",
    options: [
      ["Cash dispenser", "Correct: it delivers the cash to the customer."],
      ["Card reader", "It reads the card: input."],
      ["Keypad", "The customer types the PIN and amount: input."],
      ["Security camera", "It captures images: input."],
    ],
    answer: "A",
    explanation: "ATM outputs: screen, cash dispenser, receipt printer, speaker. Inputs: card reader, keypad or touch screen, camera.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which method works without line of sight and through dirt?"],
    stem: "A cattle farmer near Gwanda wants to record each animal as the herd walks through a race, without anyone having to see a label. Which method is most suitable?",
    options: [
      ["RFID ear tags", "Correct: tags are read by radio, without line of sight, even when dirty."],
      ["Barcodes painted on each animal", "Barcodes need a clean, visible label and line of sight."],
      ["OMR forms filled in for each animal", "Someone would have to fill in forms by hand."],
      ["MICR numbers on each animal", "MICR is for cheques printed in magnetic ink."],
    ],
    answer: "A",
    explanation: "RFID tags are read by radio waves; many can be read quickly as animals pass a reader.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Think about what the computer does after the barcode is read."],
    stem: "A shop raises the price of bread. Why does it not need to reprint the barcodes on the loaves?",
    options: [
      ["The price is stored in the stock file and is looked up from the product code", "Correct: only the database record is changed."],
      ["The barcode scanner calculates the new price itself", "The scanner only reads the code."],
      ["The printed barcodes automatically update themselves when the price changes", "Printed barcodes cannot change."],
      ["The cashier types every price in by hand", "Prices are looked up automatically."],
    ],
    answer: "A",
    explanation: "Prices are kept in the database; changing one record updates every till.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What sort of mistake can an OMR reader not interpret?"],
    stem: "An OMR reader marks a pupil's question as wrong although the pupil knew the answer. Which is the most likely reason?",
    options: [
      ["The pupil shaded two boxes in that row, or shaded too lightly", "Correct: OMR only detects whether marks are present in set positions."],
      ["The OMR reader could not read the pupil's handwriting", "OMR reads marks, not handwriting."],
      ["The answer sheet had no barcode printed on it", "Barcodes are not needed to read the answers."],
      ["The reader used radio waves that were blocked", "OMR uses reflected light, not radio."],
    ],
    answer: "A",
    explanation: "OMR detects marks by the light they reflect; double or faint marks cause errors, so doubtful sheets should be checked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "RFID tags must be in direct line of sight of the reader to be read.",
    answer: false,
    explanation: "False. RFID uses radio waves, so tags can be read through packaging or dirt, and several at once.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When an item is sold at a POS terminal, the stock level for that item in the database is reduced.",
    answer: true,
    explanation: "True. This keeps stock levels up to date and allows automatic reordering.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each use to the most suitable data-capture method.",
    pairs: [
      ["Reading cheque numbers at a bank", "MICR"],
      ["Marking multiple-choice answer sheets", "OMR"],
      ["Reading car number plates at a car park", "OCR"],
      ["Charging vehicles at a toll gate without stopping", "RFID"],
    ],
    explanation: "MICR for cheques; OMR for shaded boxes; OCR for characters such as number plates; RFID for tags read by radio.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Card, PIN, balance, cash."],
    stem: "Complete the description of a cash withdrawal at an ATM.",
    template: "The customer inserts the card, and the {{blank:a}} is read to identify the account. The customer enters the {{blank:b}}, which is checked. The bank's computer checks the {{blank:c}} before the cash is dispensed and the account is updated.",
    blanks: [
      { id: "a", accepted: ["chip"], choices: ["chip", "barcode", "receipt", "screen"] },
      { id: "b", accepted: ["PIN"], choices: ["PIN", "barcode", "receipt number", "card number"] },
      { id: "c", accepted: ["balance"], choices: ["balance", "price", "stock level", "barcode"] },
    ],
    explanation: "Card read → PIN checked → amount chosen → balance checked → cash dispensed → account updated.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Subtract every day's sales from the starting stock."],
    stem: `A hardware shop in Mutare starts the week with ${stock} tins of paint. The POS terminals record sales of ${sold.join(", ")} tins on four days. What is the stock level at the end of the four days?`,
    value: left,
    wrong: [stock - sold[0]],
    explanation: `Total sold ${sold.join(" + ")} = ${stock - left}; ${stock} − ${stock - left} = ${left} tins.`,
    workedSolution: `1. Total sold: ${sold.join(" + ")} = ${stock - left}.\n2. Stock left: ${stock} − ${stock - left} = ${left}.`,
  });
  b.tf({
    d: 3, skill: "APPLICATION",
    hints: ["Compare the stock level with the reorder level."],
    stem: `In the same shop, the reorder level for the paint is ${reorder} tins. True or false: the stock-control system should now flag the paint for reordering (stock left: ${left} tins).`,
    answer: needReorder,
    explanation: `${left} is ${needReorder ? "at or below" : "above"} the reorder level of ${reorder}, so the paint ${needReorder ? "is" : "is not"} flagged.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the abbreviation for the technology that reads tags containing a microchip and an antenna using radio waves.",
    accepted: ["RFID"],
    wrong: ["OMR"],
    explanation: "RFID: radio frequency identification.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Follow the product code from the scanner to the database and back."],
    stem: "Describe how a POS terminal uses a barcode to find the price of an item and keep the stock records up to date. [4]",
    points: [
      "The barcode scanner reads the product code (number)",
      "The code is searched for in the stock file / database",
      "The description and price are returned and displayed / added to the bill",
      "The stock level is reduced and compared with the reorder level (item flagged for reorder if low)",
    ],
    modelAnswer: "The scanner reads the product code, which is looked up in the stock database. The description and price are sent back, shown on the display and added to the bill. The stock level is reduced by one and compared with the reorder level, so the item is reordered when it runs low.",
    explanation: "Read, search, return price, update stock.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["Think about convenience for the customer and risks of crime or failure."],
    stem: "A bank in Bulawayo is installing more ATMs outside its branches.",
    parts: [
      P.match({ label: "(a)", stem: "Match each ATM device to its purpose.", pairs: [["Card reader", "Reads the account details from the card"], ["Keypad", "Lets the customer enter the PIN and amount"], ["Receipt printer", "Gives a printed record of the transaction"]], explanation: "Card reader and keypad are inputs; the receipt printer is an output." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** advantages of ATMs for the bank's customers.", points: ["Cash/balances available 24 hours / outside banking hours", "No need to queue inside the bank / available in many locations"], modelAnswer: "Customers can withdraw cash at any time, even when the bank is closed, and they avoid long queues inside the branch." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe **two** security risks of using ATMs and how each can be reduced.", points: ["Card skimming / copying of card data, reduced by chip cards / anti-skimming devices", "PIN watched by someone (shoulder surfing), reduced by shielding the keypad / cameras / limiting wrong attempts"], modelAnswer: "Criminals may fit skimmers to copy cards, which chip cards and anti-skimming devices make harder. Someone may watch the PIN being typed, so customers should cover the keypad, and cameras deter criminals." }),
      P.mcq({ label: "(d)", stem: "After the customer enters the amount, what does the bank's computer check before the cash is dispensed?", options: [["That the account has enough money and the daily limit is not exceeded", "Correct: the balance and limit are checked."], ["That the card has a readable barcode printed on the back", "Bank cards are read by chip or stripe, not barcode."], ["That the ATM's receipt printer has enough paper loaded", "A receipt is optional; this does not authorise the withdrawal."], ["That the customer has used the same ATM before", "Any of the bank's ATMs can be used."]], answer: "A", explanation: "The balance and daily limit are checked before cash is dispensed." }),
    ],
    explanation: "ATM inputs and outputs; 24-hour access; skimming and shoulder surfing as risks.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Each method suits a different kind of data: marks, characters or tags."],
    stem: "A secondary school in Masvingo wants to capture data more efficiently. It is considering OMR for test answer sheets, OCR to digitise old typed reports, and RFID cards for pupils to enter the school gate.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which method detects marks in set positions by the light they reflect?", options: [["OMR", "Correct."], ["OCR", "OCR recognises characters."], ["RFID", "RFID uses radio."], ["MICR", "MICR reads magnetic ink."]], answer: "A", explanation: "OMR." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **one** advantage and **one** drawback of using OCR on the old typed reports.", points: ["Advantage: no retyping needed / text becomes editable and searchable", "Drawback: faded or poor print may be misread, so the text must be checked"], modelAnswer: "OCR saves retyping and makes the reports searchable, but faded print may be misread, so staff must proofread the results." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how RFID cards could record the time each pupil arrives at school, and give **one** concern about them.", points: ["Each card contains a tag (chip and antenna) with the pupil's ID", "A reader at the gate sends radio waves and reads the ID; the computer records the ID with the time (no need to swipe or show the card)", "Concern: cards can be lent to others / read without the pupil knowing (privacy) / lost cards / cost"], modelAnswer: "Each card has an RFID tag storing the pupil's ID. As the pupil passes the gate, the reader's radio waves activate the tag, which sends back the ID; the computer stores it with the arrival time. A concern is that a pupil could hand their card to a friend, so the register could be wrong." }),
    ],
    explanation: "OMR for marks; OCR saves retyping but misreads; RFID records IDs by radio but cards can be shared.",
  });

  b.card("DEFINITION", "**Point-of-sale (POS) terminal**", "A computerised till that captures product and payment data and updates stock records.");
  b.card("CONCEPT", "POS stock update", "Barcode read → code found in stock file → price and description returned → stock level reduced → compared with reorder level.");
  b.card("CONCEPT", "ATM withdrawal", "Card read → PIN checked → amount chosen → balance checked → cash dispensed → account updated.");
  b.card("DEFINITION", "**OMR**", "Optical mark recognition: detects marks in set positions on a form (answer sheets, registers).");
  b.card("DEFINITION", "**OCR**", "Optical character recognition: converts scanned text images into editable characters.");
  b.card("DEFINITION", "**MICR**", "Magnetic ink character recognition: reads magnetic-ink numbers on cheques; accurate and hard to forge.");
  b.card("DEFINITION", "**RFID**", "Radio frequency identification: tags with a chip and antenna are read by radio, without line of sight.");
  b.card("FACT", "Chip vs magnetic stripe", "Chip: encrypted data, hard to clone, used with a PIN. Stripe: cheap but easily skimmed.");
  b.card("FACT", "Why barcodes do not store prices", "Only the product code is stored; prices are looked up in the database so they can change without reprinting.");
});
