---
{
  "key": "hardware.data-capture-systems",
  "title": "Data capture systems, POS terminals and ATMs",
  "summary": "How hardware is combined in point-of-sale terminals, automated teller machines and data-capture systems that use barcodes, OMR, OCR, MICR, magnetic stripe and chip cards and RFID, with their advantages and drawbacks in shops, banks and schools.",
  "concepts": ["comp.hardware.data-capture-systems"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A Saturday morning in Harare: a supermarket cashier scans a basket of groceries and the customer pays by card; across the road a man withdraws cash from an automated teller machine; at a nearby school the multiple-choice answer sheets from a test are fed into a reader and marked in minutes; at the edge of town, a car passes through a toll gate with a tag on its windscreen.

All of these are **data capture systems**: ways of getting data into a computer quickly and accurately, often with little or no typing. ZIMSEC Form 3 asks how hardware devices are applied in **point-of-sale (POS) terminals**, **ATMs** and data-capturing systems, with their advantages and drawbacks. You should already know how barcode scanners and touch screens work.

## Key definitions

:::definition{term="Data capture"}
Collecting data and entering it into a computer system, ideally automatically, so that it is fast and accurate.
:::

:::definition{term="Point-of-sale (POS) terminal"}
A computerised till where goods are sold and paid for; it captures product and payment data and updates the shop's records.
:::

:::definition{term="Automated teller machine (ATM)"}
A machine that lets a bank's customers withdraw cash, check balances and carry out other transactions using a bank card and PIN, without a bank teller.
:::

:::definition{term="Optical mark recognition (OMR)"}
Reading marks made in set positions on a specially designed form by detecting the light reflected from the paper.
:::

:::definition{term="Optical character recognition (OCR)"}
Software that converts a scanned image of printed or written characters into text that the computer can edit and process.
:::

:::definition{term="Magnetic ink character recognition (MICR)"}
Reading characters printed in special magnetic ink, such as the numbers along the bottom of a cheque.
:::

:::definition{term="Radio frequency identification (RFID)"}
Identifying objects using tags that contain a microchip and an antenna; a reader sends radio waves and the tag replies with its stored data.
:::

## Point-of-sale terminals

### The hardware

| Device | Input or output | Purpose |
|:--|:--|:--|
| Barcode scanner | Input | Reads the product code |
| Keyboard or keypad | Input | Enters codes that will not scan, quantities, discounts |
| Electronic scale | Input | Weighs loose goods such as fruit |
| Card reader (chip, magnetic stripe or contactless) | Input | Reads payment card details |
| PIN pad | Input | Customer enters their PIN |
| Touch screen or monitor | Input / output | Cashier's display and menu |
| Customer display | Output | Shows each item and the total |
| Receipt printer | Output | Prints the receipt |
| Cash drawer | Output (actuator) | Opens for cash payments |

### What happens when an item is scanned

1. The barcode is read and the **product code** is sent to the shop's computer.
2. The computer searches the **stock file** (database) for that code.
3. The **description and price** are sent back to the POS terminal, displayed and added to the bill.
4. The **stock level** for the item is reduced by the quantity sold.
5. If the stock level falls to or below the **reorder level**, the item is flagged so that more can be ordered (sometimes automatically).
6. When the customer pays by card, the card details and amount are sent to the bank, which checks the PIN and the funds and **authorises** or declines the payment (electronic funds transfer at point of sale, EFTPOS).

:::worked-solution[Stock control after a sale]
A shop in Masvingo has 40 bags of rice in stock and a reorder level of 10. On Saturday, 35 bags are sold through the POS terminals.

1. Each sale reduces the stock level: 40 − 35 = 5 bags.
2. Compare with the reorder level: 5 is less than or equal to 10.
3. The item is flagged for reordering, and the manager sees it on the reorder report.
:::

**Advantages:** fast, accurate checkout with no typing of prices; prices changed once in the database apply at every till; stock levels always up to date; sales data shows which goods sell well. **Drawbacks:** expensive equipment; if the network or power fails, sales may stop (backup power is needed during load-shedding); damaged barcodes must be typed in.

## Automated teller machines

**Hardware:** card reader (chip or stripe), keypad or touch screen, screen, cash dispenser, receipt printer, speaker for audio guidance, and a camera for security.

**A cash withdrawal:**

1. The customer inserts the card; the **chip** (or stripe) is read to identify the account.
2. The customer enters the **PIN** on the keypad; it is checked. After a set number of wrong attempts the card is kept.
3. The customer chooses "withdraw" and enters the amount.
4. The bank's computer checks the **balance** and the daily limit.
5. If the withdrawal is allowed, the **cash is dispensed**, the account is updated and a receipt may be printed.

**Advantages:** cash and balances available at any time, outside banking hours; shorter queues inside banks; fewer staff needed. **Drawbacks:** criminals may fit card skimmers or watch PINs being typed; machines may run out of cash or go offline; some elderly customers find them hard to use; withdrawal fees.

## Other data-capture methods

| Method | How it works | Typical uses | Advantages | Drawbacks |
|:--|:--|:--|:--|:--|
| OMR | Light is shone on a form; pencil or pen marks in set positions reflect less light and are detected | Multiple-choice answer sheets, registers, questionnaires | Very fast and accurate for large numbers of forms | Forms must be specially designed; faint or extra marks cause errors |
| OCR | Scanned image of text is analysed and turned into characters | Passports, number-plate recognition, digitising documents | Saves retyping; text becomes searchable | Handwriting and poor-quality print are often misread |
| MICR | Characters printed in magnetic ink are magnetised and read | Cheque numbers, bank branch codes and account numbers | Very accurate; works even if the characters are written over; hard to forge | Expensive readers; only a limited set of characters |
| Magnetic stripe card | A stripe on the back stores the account data | Older bank cards, hotel keys, loyalty cards | Cheap and quick to read | Easily copied (skimmed); damaged by magnets |
| Chip card (chip and PIN) | A microchip stores encrypted data; used with a PIN or contactless | Bank cards, SIM cards, ID cards | Much harder to clone; PIN adds security | Cards cost more; PIN can be observed |
| RFID | A reader's radio waves power the tag, which sends back its ID | Toll tags, livestock ear tags, library books, school access cards | No line of sight needed; many tags read at once; works through dirt or packaging | Tags can be read without the owner knowing; costlier than barcodes |

:::example
**Marking a test at a school in Gweru.** Three hundred Form 2 pupils answer a 40-question multiple-choice test by shading boxes on OMR answer sheets. The teacher feeds the sheets into an OMR reader, which shines light on each sheet and detects which box in each row is shaded. The computer compares the answers with the key and prints each pupil's score. Marking takes minutes instead of hours, and there are no adding-up errors. However, a pupil who shades two boxes, or shades too lightly, may be marked wrongly, so the system should flag doubtful sheets for a teacher to check.
:::

:::example
**Tracking cattle in Matabeleland.** A farmer fits each animal with an **RFID ear tag**. When the herd passes through a race, a reader picks up every tag's number by radio, without anyone needing to see the tag, and the computer records which animals were present, their dip and vaccination dates and their movements. Barcodes would not work well: they must be cleanly visible to a scanner and would quickly get dirty.
:::

## Common mistakes

:::mistake{title="Mixing up OMR and OCR"}
OMR detects **marks** in fixed positions (shaded boxes). OCR recognises **characters** (letters and digits) in scanned text.
:::

:::mistake{title="Saying the barcode stores the price"}
The barcode holds only the **product code**. The price is looked up in the database, so it can be changed without reprinting barcodes.
:::

:::mistake{title="Saying RFID needs line of sight"}
RFID uses radio waves, so tags can be read through packaging or dirt, and several at once.
:::

## Exam tips

:::exam-tip
When asked to "**describe** how a POS terminal updates stock", give the sequence: barcode read → code searched in the stock file → price and description returned → stock level reduced → compared with reorder level.
:::

:::exam-tip
For advantages and drawbacks, link each one to the user in the scenario: the customer, the shop owner, the bank or the school.
:::

## Summary

:::summary
- Data capture systems enter data quickly and accurately with little typing.
- POS terminals combine barcode scanners, scales, card readers, displays and printers, and update stock levels automatically.
- ATMs use a card reader and PIN to identify the customer, check the balance, dispense cash and update the account.
- OMR reads marks in set positions; OCR converts text images to characters; MICR reads magnetic ink on cheques.
- Chip cards are more secure than magnetic stripes; RFID reads tags by radio without line of sight.
:::
