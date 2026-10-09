// Slice w1b: Cambridge 0478 exam-format items (Paper 1 STRUCTURED 15 / ANALYSIS; Paper 2 STRUCTURED 12 / APPLICATION).
import { concept, P, L, CAM, truthRows, truthTableMd, fromBase } from "../lib.mjs";

const ABC = ["A", "B", "C"];
const col = (f) => truthRows(ABC, f).map((r) => r.out).join("");
const ones = (s) => [...s].filter((c) => c === "1").length;
const C = (k) => `comp.${k}`;

// ---- Paper 1, question 1: packets and error detection ------------------------------------------------------------
const data7 = "1001011";
const evenByte = `${ones(data7) % 2}${data7}`;
const block = ["1100100", "0111010", "1010111", "0001101"].map((r) => `${ones(r) % 2}${r}`);
const pbyte = Array.from({ length: 8 }, (_, i) => String(block.reduce((s, r) => s + Number(r[i]), 0) % 2)).join("");
const fr = 3; // byte 4 (index 3)
const fc = 2; // column "2"
const recv = block.map((r, i) => (i === fr ? r.slice(0, fc) + (r[fc] === "1" ? "0" : "1") + r.slice(fc + 1) : r));
const rowsBad = recv.map((r, i) => (ones(r) % 2 ? i + 1 : null)).filter(Boolean);
const colsBad = Array.from({ length: 8 }, (_, i) => ([...recv, pbyte].reduce((s, r) => s + Number(r[i]), 0) % 2 ? i : null)).filter((x) => x !== null);
if (rowsBad.length !== 1 || rowsBad[0] !== fr + 1 || colsBad.length !== 1 || colsBad[0] !== fc) throw new Error("block");
const blockMd = ["| Byte | P | 1 | 2 | 3 | 4 | 5 | 6 | 7 |", "|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|", ...[...recv, pbyte].map((r, i) => `| ${i < 4 ? i + 1 : "Parity byte"} | ${r.split("").join(" | ")} |`)].join("\n");
const isbn = "978065104412";
const isum = [...isbn].reduce((s, c, i) => s + Number(c) * (i % 2 === 0 ? 1 : 3), 0);
const icheck = (10 - (isum % 10)) % 10;

// ---- Paper 2 logic functions --------------------------------------------------------------------------------------
const kiln = (a, b, c) => L.or(L.and(a, L.not(b)), L.and(b, c)); // (A AND NOT B) OR (B AND C)
const circ2 = (a, b, c) => L.nor(L.xor(a, b), L.and(b, c)); // (A XOR B) NOR (B AND C)
const tab3 = (a, b, c) => ((a === 0 && b === 1 && c === 1) || (a === 1 && b === 0 && c === 0) || (a === 1 && b === 1 && c === 1) ? 1 : 0);

concept(C("transmission.packets"), { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("transmission.packets"), C("transmission.error-detection")],
    hints: ["Name all three parts of a packet.", "In the parity block, find the row and the column with an odd number of 1s."],
    stem: "A company in Gweru sends sales data from its shops to its head office over the internet.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the structure of a data packet.", points: ["Header containing the destination address, the originator's address and the packet number", "Payload containing the actual data", "Trailer marking the end of the packet / containing error-checking data"], modelAnswer: "A packet has a header (destination address, originator's address, packet number), a payload holding the data, and a trailer that marks the end and holds an error check." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the packets reach head office using packet switching.", points: ["Each packet is sent separately; routers read the destination address and choose the route", "Packets may take different routes and arrive out of order", "When the last packet arrives, they are reordered using the packet numbers"], modelAnswer: "Each packet travels independently; routers forward it by the best available route, so packets may arrive out of order. When all have arrived, head office reorders them by packet number." }),
      P.bits({ label: "(c)", stem: `The 7-bit data ${data7} is sent with **even** parity, the parity bit being the left-most bit. Write the 8-bit byte sent.`, value: fromBase(evenByte, 2), width: 8, wrong: [`${1 - (ones(data7) % 2)}${data7}`], explanation: `${data7} has ${ones(data7)} ones, so the parity bit is ${ones(data7) % 2}: ${evenByte}.` }),
      P.num({ label: "(d)", stem: `A block of four bytes and a parity byte arrives using even parity:\n\n${blockMd}\n\nState the number of the byte that contains an error.`, value: rowsBad[0], explanation: `Byte ${rowsBad[0]} has an odd number of 1s.`, workedSolution: `1. 1s per byte: ${recv.map((r) => ones(r)).join(", ")}.\n2. Byte ${rowsBad[0]} is odd.` }),
      P.short({ label: "(e)", stem: "State the column (P or 1 to 7) that contains the error.", accepted: [String(fc)], wrong: [String(fc + 1)], explanation: `Column ${fc} has an odd number of 1s.` }),
      P.bits({ label: "(f)", stem: "Write the corrected byte.", value: fromBase(block[fr], 2), width: 8, wrong: [recv[fr]], explanation: `Flip the bit in column ${fc}: ${recv[fr]} → ${block[fr]}.` }),
      P.num({ label: "(g)", marks: 2, type: "CALCULATION", stem: `Books ordered by the shops have ISBN-13 numbers. The first 12 digits of one are ${isbn}. Multiply the digits alternately by 1 and 3, add the products, find the remainder after dividing by 10 and subtract it from 10 (a remainder of 0 gives 0). Calculate the check digit.`, value: icheck, explanation: `Sum ${isum}; remainder ${isum % 10}; check digit ${icheck}.`, workedSolution: `1. Products: ${[...isbn].map((c, i) => Number(c) * (i % 2 === 0 ? 1 : 3)).join(", ")}.\n2. Sum: ${isum}.\n3. Remainder: ${isum % 10}.\n4. Check digit: ${icheck}.` }),
      P.manual({ label: "(h)", marks: 3, stem: "Describe how an automatic repeat query (ARQ) makes sure the data arrives without error.", points: ["The receiver checks the data and sends a positive acknowledgement if it is correct (negative if not)", "The sender starts a timer (timeout) when it sends the data", "If a negative acknowledgement is received, or no acknowledgement before the timeout, the data is resent"], modelAnswer: "After checking the data, the receiver sends a positive or negative acknowledgement. The sender waits for a set time; if it receives a negative acknowledgement or nothing before the timeout, it resends the data, repeating until a positive acknowledgement arrives." }),
    ],
    explanation: `(c) ${evenByte}. (d) byte ${rowsBad[0]}, column ${fc}, corrected ${block[fr]}. (e) ${icheck}.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350,
    concepts: [C("hardware.ports-usb"), C("transmission.encryption"), C("internet.web-browsing"), C("internet.cookies")],
    hints: ["USB: detection, driver, serial.", "Asymmetric: the receiver's public key encrypts, its private key decrypts."],
    stem: "Rudo runs a small online clothing business from Bulawayo. She uses a laptop with a USB card reader, and customers buy through her website.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which method of data transmission does USB use?", options: [["Serial", "Correct."], ["Parallel", "USB is a serial bus."], ["Simplex only", "USB carries data both ways."], ["Analogue", "USB is digital."]], answer: "A", explanation: "Universal serial bus." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** benefits of using a USB connection for the card reader.", points: ["Industry standard / the device is detected and its driver installed automatically", "The cable supplies power to the device / backward compatible"], modelAnswer: "It is detected and set up automatically, and it is powered through the USB cable." }),
      P.mcq({ label: "(c)", stem: "Customers' details are sent to Rudo using asymmetric encryption. Which key encrypts the details?", options: [["Rudo's public key", "Correct."], ["Rudo's private key", "Customers do not have it."], ["The customer's private key", "Then anyone with the customer's public key could decrypt it."], ["A key shared in advance", "That describes symmetric encryption."]], answer: "A", explanation: "Receiver's public key encrypts." }),
      P.mcq({ label: "(d)", stem: "Which key decrypts the details?", options: [["Rudo's private key", "Correct."], ["Rudo's public key", "It cannot decrypt what it encrypted."], ["The customer's public key", "That belongs to another key pair."], ["No key is needed", "Ciphertext needs the key."]], answer: "A", explanation: "Receiver's private key decrypts." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the customers' details are encrypted before they are transmitted.", points: ["Data can be intercepted during transmission", "Encrypted data is meaningless without the key, so the details stay confidential"], modelAnswer: "The data could be intercepted on the internet; encryption makes it unreadable to anyone without the key." }),
      P.match({ label: "(f)", stem: "Rudo's site is at `https://www.rudostyle.co.zw/shop/dresses.html` (fictional). Match each part to its name.", pairs: [["`https`", "Protocol"], ["`www.rudostyle.co.zw`", "Domain name"], ["`dresses.html`", "File name"]], explanation: "Protocol, domain name, then path and file name." }),
      P.manual({ label: "(g)", marks: 4, stem: "Describe how a customer's browser locates, retrieves and displays the page.", points: ["The browser sends the domain name to a DNS", "The DNS returns the matching IP address", "The browser sends an HTTPS request to the web server at that IP address", "The web server returns the HTML, which the browser renders"], modelAnswer: "The browser asks a DNS for the IP address of www.rudostyle.co.zw; the DNS returns it; the browser sends an HTTPS request to the web server, which returns the HTML file; the browser renders the page." }),
      P.mcq({ label: "(h)", stem: "The site remembers each customer's chosen size between visits. Which type of cookie does this?", options: [["Persistent cookie", "Correct."], ["Session cookie", "Deleted when the browser closes."], ["Third-party cookie", "Set by another domain, such as an advertiser."], ["Encryption cookie", "No such type."]], answer: "A", explanation: "Kept between visits: persistent." }),
    ],
    explanation: "USB is serial; receiver's public key encrypts, private key decrypts; DNS → IP → web server → HTML; persistent cookies remember preferences.",
  });

  // ---- Paper 2: Boolean logic ------------------------------------------------------------------------------------
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, concepts: [C("logic.circuits-expressions"), C("logic.truth-tables"), C("logic.gates")],
    hints: ["Two conditions are joined by OR; each is an AND.", "Count one gate per operator."],
    stem: "A pottery kiln in Mutare has three sensors:\n\n| Input | 1 means | 0 means |\n|:-:|:--|:--|\n| A | temperature above the limit | temperature within the limit |\n| B | door closed | door open |\n| C | cooling fan running | cooling fan off |\n\nAn alarm X sounds if the temperature is above the limit and the door is open, or if the door is closed and the cooling fan is running.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Write the logic expression for X.", points: ["`A AND (NOT B)` for temperature high and door open", "`B AND C` for door closed and fan running", "Both terms joined by OR: `X = (A AND NOT B) OR (B AND C)`"], modelAnswer: "X = (A AND NOT B) OR (B AND C)" }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ABC, fn: kiln, explanation: `X = ${col(kiln)}.` }),
      P.num({ label: "(c)", stem: "How many logic gates (NOT counts as a gate) are needed to build the circuit exactly as written?", value: 4, explanation: "NOT, two ANDs and one OR.", workedSolution: "1. NOT B: 1 gate.\n2. A AND NOT B, B AND C: 2 gates.\n3. OR: 1 gate.\n4. Total 4." }),
      P.fib({ label: "(d)", marks: 3, stem: "Complete the description of the circuit.", template: "Input B goes into a {{blank:g1}} gate. Its output and input A go into an {{blank:g2}} gate. Inputs B and C go into a second AND gate. The outputs of the two AND gates go into an {{blank:g3}} gate, whose output is X.", blanks: [{ id: "g1", accepted: ["NOT"], choices: ["NOT", "NOR", "NAND", "XOR"] }, { id: "g2", accepted: ["AND"], choices: ["AND", "OR", "XOR", "NOR"] }, { id: "g3", accepted: ["OR"], choices: ["OR", "AND", "NAND", "XOR"] }], explanation: "NOT, AND, AND, OR." }),
      P.short({ label: "(e)", stem: "State the value of X when the temperature is above the limit, the door is closed and the fan is off.", accepted: [String(kiln(1, 1, 0))], wrong: [String(1 - kiln(1, 1, 0))], explanation: `A = 1, B = 1, C = 0: A AND NOT B = 0; B AND C = 0; X = ${kiln(1, 1, 0)}.` }),
    ],
    explanation: `X = (A AND NOT B) OR (B AND C); output ${col(kiln)}.`,
  });

  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, concepts: [C("logic.truth-tables"), C("logic.circuits-expressions"), C("logic.gates")],
    hints: ["Work out P = A XOR B and Q = B AND C first.", "NOR is 1 only when both of its inputs are 0."],
    stem: "A logic circuit is described as follows. Inputs A and B go into an XOR gate (output P). Inputs B and C go into an AND gate (output Q). P and Q go into a NOR gate, whose output is X.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Write the logic expression for the circuit.", points: ["`A XOR B`", "`B AND C`", "Joined by NOR with correct brackets: `X = (A XOR B) NOR (B AND C)`"], modelAnswer: "X = (A XOR B) NOR (B AND C)" }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ABC, fn: circ2, explanation: `P = ${col((a, bb) => L.xor(a, bb))}; Q = ${col((a, bb, c) => L.and(bb, c))}; X = ${col(circ2)}.` }),
      P.num({ label: "(c)", stem: "State how many of the eight input combinations give X = 1.", value: truthRows(ABC, circ2).filter((r) => r.out).length, explanation: `X = ${col(circ2)}.`, workedSolution: `1. X column: ${col(circ2)}.\n2. Count the 1s: ${truthRows(ABC, circ2).filter((r) => r.out).length}.` }),
      P.tf({ label: "(d)", stem: "True or false: the circuit gives the same outputs as `X = NOT ((A XOR B) OR (B AND C))`.", answer: true, explanation: "NOR is NOT OR, so the two expressions are identical." }),
      P.manual({ label: "(e)", marks: 3, stem: "The NOR gate is replaced by an OR gate followed by a NOT gate. Explain whether the circuit's output changes, and why.", points: ["The output does not change", "NOR gives the inverse of OR for every input combination", "so OR followed by NOT produces exactly the same values (the circuit just uses one more gate)"], modelAnswer: "The output stays the same: a NOR gate is equivalent to an OR gate followed by a NOT gate, because NOR inverts every OR output. The new circuit simply uses an extra gate." }),
    ],
    explanation: `X = (A XOR B) NOR (B AND C): ${col(circ2)}.`,
  });

  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, paper: "Paper 2", secs: 1080, concepts: [C("logic.circuits-expressions"), C("logic.truth-tables"), C("logic.gates")],
    hints: ["Use only the rows where X = 1; each gives one AND term.", "An input that is 0 in a row appears with NOT."],
    stem: "An engineer is given this truth table for a circuit with three inputs:\n\n" + truthTableMd(ABC, [["X", tab3]]),
    parts: [
      P.num({ label: "(a)", stem: "State how many AND terms are needed to write the expression from the rows where X = 1.", value: truthRows(ABC, tab3).filter((r) => r.out).length, explanation: "One term per row with X = 1.", workedSolution: `1. X = 1 in rows 011, 100 and 111.\n2. ${truthRows(ABC, tab3).filter((r) => r.out).length} terms.` }),
      P.manual({ label: "(b)", marks: 4, stem: "Write a logic expression for X.", points: ["Term for row 011: `(NOT A) AND B AND C`", "Term for row 100: `A AND (NOT B) AND (NOT C)`", "Term for row 111: `A AND B AND C`", "All three terms joined by OR with correct brackets"], modelAnswer: "X = ((NOT A) AND B AND C) OR (A AND (NOT B) AND (NOT C)) OR (A AND B AND C)" }),
      P.mcq({ label: "(c)", stem: "Which expression produces the same truth table?", options: [["`X = (B AND C) OR (A AND NOT (B OR C))`", `Correct: B AND C gives rows 011 and 111; A AND NOT (B OR C) gives row 100 (output ${col((a, bb, c) => L.or(L.and(bb, c), L.and(a, L.not(L.or(bb, c)))))}).`], ["`X = (B AND C) OR A`", `This gives ${col((a, bb, c) => L.or(L.and(bb, c), a))}: rows 101 and 110 would also be 1.`], ["`X = (B XOR C) OR (A AND B)`", `This gives ${col((a, bb, c) => L.or(L.xor(bb, c), L.and(a, bb)))}.`], ["`X = A XOR (B AND C)`", `This gives ${col((a, bb, c) => L.xor(a, L.and(bb, c)))}: row 111 would be 0.`]], answer: "A", explanation: "Check each option against all eight rows." }),
      P.manual({ label: "(d)", marks: 4, stem: "Describe the circuit for the expression `X = (B AND C) OR (A AND NOT (B OR C))`, naming each gate and its inputs.", points: ["B and C go into an AND gate", "B and C also go into an OR gate, whose output goes into a NOT gate", "The NOT gate's output and A go into a second AND gate", "The outputs of the two AND gates go into an OR gate whose output is X"], modelAnswer: "B and C go into an AND gate. B and C also go into an OR gate, whose output goes into a NOT gate. The NOT gate's output and A go into a second AND gate. The outputs of the two AND gates go into an OR gate, whose output is X." }),
      P.short({ label: "(e)", stem: "State the output X when A = 1, B = 0 and C = 1.", accepted: [String(tab3(1, 0, 1))], wrong: [String(1 - tab3(1, 0, 1))], explanation: `Row 101 of the table: X = ${tab3(1, 0, 1)}.` }),
      P.short({ label: "(f)", stem: "State the output X when A = 0, B = 1 and C = 1.", accepted: [String(tab3(0, 1, 1))], wrong: [String(1 - tab3(0, 1, 1))], explanation: `Row 011 of the table: X = ${tab3(0, 1, 1)}.` }),
    ],
    explanation: "X = 1 in rows 011, 100 and 111.",
  });
});

// Guard: the correct MCQ option in the last question must equal the table.
if (col((a, bb, c) => L.or(L.and(bb, c), L.and(a, L.not(L.or(bb, c))))) !== col(tab3)) throw new Error("tab3 option");
