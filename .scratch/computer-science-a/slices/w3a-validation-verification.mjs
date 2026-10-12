// Slice w3a: acs.security.validation-verification (Cambridge only, AS Level).
import { concept, P, chk, same, mdTable, parityBit, mod11CheckDigit, checksum8, toBase, py, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const sum = (a) => a.reduce((x, y) => x + y, 0);
// Check digit scheme for questions: 4-digit code, weights 5 4 3 2, check digit weight 1, modulus 11
const W4 = [5, 4, 3, 2];
const code = "3716";
const cdq = mod11CheckDigit(code, W4);
same(cdq, { sum: 58, remainder: 3, check: "8" });
const total = (s) => s.split("").reduce((a, d, i) => a + Number(d) * [5, 4, 3, 2, 1][i], 0);
chk(total("37168"), 66);
chk(total("37618"), 71);
chk(total("37618") % 11, 5);
// A 3-digit code with weights 4 3 2
const cd3 = mod11CheckDigit("259", [4, 3, 2]);
same(cd3, { sum: 41, remainder: 8, check: "3" });
// Parity
const p1 = parityBit("1011001", "even");
same(p1, "0");
const p2 = parityBit("0110101", "odd");
same(p2, "1");
const p3 = parityBit("1100011", "even");
same(p3, "0");
const recvByte = "10110110"; // even parity expected; count of ones
const onesRecv = recvByte.replace(/0/g, "").length;
chk(onesRecv, 5);
// Checksum
const cdata = [143, 62, 205, 77];
const cs = checksum8(cdata);
chk(sum(cdata), 487);
chk(cs, 231);
const crecv = [143, 62, 206, 77];
chk(checksum8(crecv), 232);
// Block parity (even): characters S U N, one bit flipped in transit
const chars = ["S", "U", "N"];
const rows7 = chars.map((c) => toBase(c.charCodeAt(0), 2, 7));
const rowsP = rows7.map((r) => r + parityBit(r, "even"));
const colP = Array.from({ length: 8 }, (_, j) => parityBit(rowsP.map((r) => r[j]).join(""), "even")).join("");
const flipRow = 1;
const flipCol = 5; // index in the 8-bit row (0 = Bit 7 ... 6 = Bit 1, 7 = parity bit)
const recvRows = rowsP.map((r, i) => (i === flipRow ? r.slice(0, flipCol) + (r[flipCol] === "0" ? "1" : "0") + r.slice(flipCol + 1) : r));
const rowOk = recvRows.map((r) => r.replace(/0/g, "").length % 2 === 0);
const colOk = Array.from({ length: 8 }, (_, j) => (recvRows.map((r) => r[j]).join("") + colP[j]).replace(/0/g, "").length % 2 === 0);
same(rowOk, [true, false, true]);
same(colOk.findIndex((x) => !x), flipCol);
const heads = ["Character", "Bit 7", "Bit 6", "Bit 5", "Bit 4", "Bit 3", "Bit 2", "Bit 1", "Parity bit"];
const blockMd = (rows) => mdTable(heads, [...rows.map((r, i) => [chars[i], ...r.split("")]), ["Parity byte", ...colP.split("")]]);
const sentMd = blockMd(rowsP);
const recvMd = blockMd(recvRows);
const wrongBitName = "Bit 2"; // column index 5 -> Bit 2 (index 0 is Bit 7)
same(heads[flipCol + 1], wrongBitName);
// Validation routine: age of a learner 11 to 19 typed as text
const agePseudo = `FUNCTION ValidAge(Text : STRING) RETURNS BOOLEAN
    DECLARE i : INTEGER
    DECLARE Age : INTEGER
    IF LENGTH(Text) = 0 OR LENGTH(Text) > 2 THEN
        RETURN FALSE
    ENDIF
    FOR i ← 1 TO LENGTH(Text)
        IF MID(Text, i, 1) < "0" OR MID(Text, i, 1) > "9" THEN
            RETURN FALSE
        ENDIF
    NEXT i
    Age ← STR_TO_NUM(Text)
    RETURN Age >= 11 AND Age <= 19
ENDFUNCTION`;
const ageOut = py(`def valid_age(text):
    if len(text) == 0 or len(text) > 2:
        return False
    for ch in text:
        if ch < "0" or ch > "9":
            return False
    return 11 <= int(text) <= 19


for item in ["15", "11", "19", "10", "20", "", "1x", "123"]:
    print(valid_age(item))`);
same(ageOut.split("\n"), ["True", "True", "True", "False", "False", "False", "False", "False"]);
// Trace for a short validation program (struct)
const traceOut = py(`def check(text):
    if len(text) != 6:
        return "length"
    if not text.isdigit():
        return "format"
    if int(text[:2]) > 31:
        return "range"
    return "ok"


for item in ["150826", "15082", "15O826", "451026"]:
    print(item, check(item))`);
same(traceOut.split("\n"), ["150826 ok", "15082 length", "15O826 format", "451026 range"]);

concept("acs.security.validation-verification", { file: "security/validation-verification", keyPrefix: "security.validation-verification" }, (b) => {
  mc(b, 1, "RECALL", "Which statement describes data validation?",
    ["An automatic check that data is reasonable and allowed", "Correct."],
    [["A check that data has been copied exactly from the source document", "That describes verification."], ["Making a second copy of the data", "That is a backup."], ["Making the data unreadable for other people", "That is encryption."]],
    "Validation checks that data is reasonable; it does not prove that it is correct.");
  mc(b, 2, "APPLICATION", "A form for a new customer must not be saved if the surname field is left blank. Which validation check is this?",
    ["Presence check", "Correct."],
    [["Range check", "A range check tests that a value lies between limits."], ["Check digit", "A check digit is calculated from the other digits of a number."], ["Parity check on bytes", "A parity check is used on binary data during transfer."]],
    "A presence check tests that a required field is not empty.", { daily: true });
  mc(b, 2, "APPLICATION", "A shop allows an order of 1 to 50 items. An order for 500 is rejected. Which check rejected it?",
    ["Range check", "Correct: 500 lies outside 1 to 50."],
    [["Presence check", "A value was entered, so it is present."], ["Format check", "The value is a number in a correct pattern; its size is the problem."], ["Double entry", "Double entry is a verification method."]],
    "A range check tests that the value lies between a lowest and highest value.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main purpose of a check digit on a learner's identity number?",
    ["To detect mistakes made when the number is typed or copied", "Correct."],
    [["To encrypt the number so that it cannot be read", "A check digit does not hide the number."], ["To make the number shorter", "A check digit adds a digit."], ["To prove that the learner exists in the school", "That is an existence check; a check digit detects typing errors."]],
    "The check digit is recalculated when the number is entered.");
  mc(b, 3, "APPLICATION", "A field accepts ages from 11 to 19. Which value is abnormal test data?",
    ["20", "Correct: it is just outside the allowed range, so it should be rejected."],
    [["11", "11 is extreme (boundary) data and should be accepted."], ["15", "15 is normal data and should be accepted."], ["19", "19 is extreme (boundary) data and should be accepted."]],
    "Abnormal data is invalid and must be rejected.", { hints: ["Which value should the program refuse?"] });
  mc(b, 3, "UNDERSTANDING", "Why is double entry more reliable than a visual check?",
    ["The program compares two separate entries and reports any difference, so a person does not have to spot mistakes", "Correct."],
    [["It checks that the value typed lies in a sensible range for the field, such as 0 to 100", "That is validation."], ["It encrypts the data as it is typed", "Double entry has no connection with encryption."], ["It needs only one person and no source document", "It takes more effort, not less."]],
    "Double entry is automatic comparison of two copies.", { hints: ["Who finds the difference: a person or the program?"] });
  mc(b, 3, "ANALYSIS", `A byte is sent using even parity. The receiver gets ${recvByte}. What does the receiver conclude?`,
    ["The byte contains an error because the number of 1s is odd", `Correct: there are ${onesRecv} ones.`],
    [["The byte is correct because the number of 1s in the byte is even", "Count again: the number of 1s is odd."], ["The byte is correct because it starts with 1", "The first bit has no effect on parity."], ["The data must be sent again in decimal", "The number system does not matter."]],
    `${onesRecv} ones is odd, so the even-parity rule is broken.`, { hints: ["Count the 1s."] });
  mc(b, 4, "EVALUATION", "A clerk types a learner's mark as 58 when the true mark is 85. The routine accepts the value. Which statement explains why?",
    ["Both are valid marks, so validation cannot detect a wrong but possible value; verification is needed", "Correct."],
    [["Range checks cannot be used on marks", "A range check can be used on marks but both values are within range."], ["The routine was tested only with abnormal data, so it could not recognise valid marks", "Abnormal data would be rejected."], ["The mark was encrypted before entry", "Encryption plays no part."]],
    "Validation checks that data is possible, not that it is true.", { hints: ["Is 58 a possible mark?"] });
  mc(b, 4, "EVALUATION", "Two bits in the same byte change during transmission. The byte uses even parity. What is the likely result at the receiver?",
    ["The parity check does not detect the error because the number of 1s is still even", "Correct: two changes can restore the parity."],
    [["The parity check always detects the error because two changes make the byte invalid", "Two changes can cancel out in the count."], ["The parity bit corrects the two bits", "A single parity bit can only detect an odd number of errors."], ["The byte is rejected because it is longer", "The length has not changed."]],
    "A single parity bit detects an odd number of changed bits only.", { hints: ["Does the count of 1s change by an even or an odd amount?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If two checksums match, the data is certainly identical.", answer: false, explanation: "False. Different data can give the same checksum, for example when one value goes up and another goes down by the same amount." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each validation check to an example of data it would reject.",
    pairs: [["Range check", "A mark of 140 when marks are 0 to 100"], ["Length check", "A phone number with 6 digits when 10 are needed"], ["Presence check", "A blank surname"], ["Format check", "A date typed as 15-Mar"], ["Existence check", "A class code that is not in the class list"]],
    explanation: "Each check tests one property of the data." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about test data.", hints: ["Boundary values are valid."],
    template: "Test data that is valid and typical is called {{blank:a}} data. A valid value on the edge of the allowed range is {{blank:b}} data. A value that must be rejected is {{blank:c}} data.",
    blanks: [
      { id: "a", accepted: ["normal"], choices: ["normal", "abnormal", "extreme", "random"] },
      { id: "b", accepted: ["extreme"], choices: ["extreme", "abnormal", "normal", "invalid"] },
      { id: "c", accepted: ["abnormal"], choices: ["abnormal", "normal", "extreme", "boundary"] },
    ], explanation: "Normal, extreme (boundary), abnormal." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply each digit by its weight (5, 4, 3, 2) and add, then divide by 11.", "The check digit is 11 minus the remainder."],
    stem: `A four-digit product code uses a modulus 11 check digit. The weights from the left are 5, 4, 3 and 2. Calculate the check digit for the code ${code}.`,
    value: Number(cdq.check), wrong: [cdq.remainder, 7], workedSolution: `1. 3×5 + 7×4 + 1×3 + 6×2 = 15 + 28 + 3 + 12 = ${cdq.sum}.\n2. ${cdq.sum} ÷ 11 = 5 remainder ${cdq.remainder}.\n3. Check digit = 11 − ${cdq.remainder} = ${cdq.check}.`, explanation: `The weighted sum is ${cdq.sum}, the remainder is ${cdq.remainder}, so the check digit is ${cdq.check}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Weights are 5, 4, 3, 2, and 1 for the check digit.", "A valid code gives a total that is a multiple of 11."],
    stem: "A clerk types the code 37618, where the last digit is the check digit. The weights from the left are 5, 4, 3, 2 and 1. Calculate the weighted total, which is a multiple of 11 only if the code is valid.",
    value: total("37618"), wrong: [66, 58], workedSolution: `1. 3×5 + 7×4 + 6×3 + 1×2 + 8×1 = 15 + 28 + 18 + 2 + 8 = ${total("37618")}.\n2. ${total("37618")} ÷ 11 leaves remainder ${total("37618") % 11}, so the code is rejected.`, explanation: `The total is ${total("37618")}, which is not a multiple of 11, so the code is not valid.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the four values and take the remainder after dividing by 256."],
    stem: `The values ${cdata.join(", ")} are sent as bytes. A checksum is the sum of the values modulo 256. Calculate the checksum.`,
    value: cs, wrong: [sum(cdata), 487 - 512], workedSolution: `1. ${cdata.join(" + ")} = ${sum(cdata)}.\n2. ${sum(cdata)} = 1 × 256 + ${cs}.\n3. The checksum is ${cs}.`, explanation: `The sum is ${sum(cdata)}; the remainder after dividing by 256 is ${cs}.` });
  b.short({ d: 2, skill: "APPLICATION", daily: true, hints: ["Count the 1s: the total must be even."],
    stem: "The 7-bit code 1011001 is sent with an even parity bit. State the value of the parity bit (0 or 1).",
    accepted: [p1], normalise: ["trim"], wrong: ["1"], explanation: "The code has four 1s, which is already even, so the parity bit is 0." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Say what each one checks, with an example."],
    stem: "Explain the difference between validation and verification. [4]",
    points: ["Validation is an automatic check that data is reasonable and allowed", "Example: a range check rejects a mark of 150", "Verification checks that data has been entered or transferred accurately, by comparing it with the original or a second copy", "Example: double entry, where two typed copies are compared"],
    modelAnswer: "Validation is an automatic check that data is reasonable and allowed, for example a range check rejects a mark of 150. Verification checks that data was entered or transferred accurately by comparing it with the original or a second copy, for example double entry.",
    explanation: "Reasonable against accurate." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["How does it work, and what does it cost?"],
    stem: "Describe double entry and give one disadvantage. [3]",
    points: ["The same data is typed in twice, often by two different people", "The program compares the two entries and reports any differences to be corrected", "Disadvantage: it takes twice as long or costs more staff time"],
    modelAnswer: "The same data is typed in twice, often by different people, and the program compares the two entries and reports any differences. The disadvantage is that it takes twice as long.",
    explanation: "Method and cost." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think about rows and columns."],
    stem: "Explain how block parity can find which bit has changed in a block of bytes. [3]",
    points: ["Each byte has a parity bit and an extra parity byte is made from the columns", "After transmission the receiver checks every row and every column", "The row and the column that fail cross at the bit that has changed, so the receiver can correct it"],
    modelAnswer: "Each byte has a parity bit and a parity byte is made from the columns. The receiver checks every row and column; the failing row and failing column cross at the changed bit, which can then be corrected.",
    explanation: "Row and column parity." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 6, hints: ["Check that it is not empty, that it has at most 2 characters, that each is a digit, then the range 11 to 19."],
    stem: "Write a function `ValidAge(Text)` in pseudocode that takes a learner's age typed as a string and returns TRUE only if it consists of one or two digits and lies from 11 to 19 inclusive. `STR_TO_NUM(s)` converts a string of digits to an integer and `MID(s, start, n)` returns n characters from position start (the first position is 1). [6]",
    points: ["Function header with a STRING parameter and RETURNS BOOLEAN", "Presence check: returns FALSE for an empty string", "Length check: returns FALSE if there are more than 2 characters", "A loop that tests every character", "Returns FALSE if any character is not a digit", "Converts to a number and returns the result of the range test 11 to 19"],
    modelAnswer: codeBlock(agePseudo),
    explanation: "One mark per stage; the model answer is mirrored in Python and gives True for 15, 11 and 19 and False for 10, 20, an empty string, 1x and 123." });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Count the 1s in each row and column, including the parity bits.", "The wrong bit is where the failing row and column cross."],
    explanation: `The row for ${chars[flipRow]} and the ${wrongBitName} column fail, so that bit was changed.`,
    stem: `The characters S, U and N are sent as 7-bit codes with an even parity bit on each row and a parity byte below. This is the block as it was sent.\n\n${sentMd}\n\nOne bit changes in transit. The receiver gets this block.\n\n${recvMd}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State which character's row fails the parity check.", accepted: [chars[flipRow]], normalise: ["trim", "lowercase"], wrong: ["S"], explanation: `The row for ${chars[flipRow]} has an odd number of 1s.` }),
      P.short({ label: "(b)", marks: 1, stem: "State which column fails the parity check (for example Bit 5).", accepted: [wrongBitName], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Bit 5"], explanation: `The ${wrongBitName} column has an odd number of 1s.` }),
      P.short({ label: "(c)", marks: 1, stem: "State the correct value (0 or 1) of the bit that has been changed.", accepted: [rowsP[flipRow][flipCol]], normalise: ["trim"], wrong: [recvRows[flipRow][flipCol]], explanation: `The bit was sent as ${rowsP[flipRow][flipCol]} and received as ${recvRows[flipRow][flipCol]}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why a single parity bit on each byte would not have been able to find which bit was wrong.", points: ["A parity bit on each byte only shows that the number of 1s in that byte is wrong", "It does not show which bit in the byte changed", "Only the column parity byte shows in which position the error occurred"], modelAnswer: "A parity bit on a byte only shows that the count of 1s in that byte is wrong. It does not show which bit changed; only the column check gives the position.", explanation: "Row parity gives the row; column parity gives the position." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Test each value against the checks in the order of the program."],
    explanation: "The program rejects 15082 for length, 15O826 (letter O) for format and 451026 for range.",
    stem: "A Python function checks a six-character date of birth typed as DDMMYY. It returns \"length\", \"format\", \"range\" or \"ok\":\n\n```python\ndef check(text):\n    if len(text) != 6:\n        return \"length\"\n    if not text.isdigit():\n        return \"format\"\n    if int(text[:2]) > 31:\n        return \"range\"\n    return \"ok\"\n```\n\nThe function `isdigit()` is true only if every character is a digit. The program is run with four values; the letter in the third value is a capital O, not a zero.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the result for 150826.", accepted: ["ok"], normalise: ["trim", "lowercase"], wrong: ["range"], explanation: "Six digits and the day 15 is not above 31." }),
      P.short({ label: "(b)", marks: 1, stem: "State the result for 15082.", accepted: ["length"], normalise: ["trim", "lowercase"], wrong: ["ok"], explanation: "Only five characters." }),
      P.short({ label: "(c)", marks: 1, stem: "State the result for 15O826.", accepted: ["format"], normalise: ["trim", "lowercase"], wrong: ["ok"], explanation: "The capital O is not a digit." }),
      P.short({ label: "(d)", marks: 1, stem: "State the result for 451026.", accepted: ["range"], normalise: ["trim", "lowercase"], wrong: ["ok"], explanation: "The day 45 is above 31." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give one input that the function accepts as \"ok\" although it cannot be a real date, and explain why.", points: ["For example 310226 (31 February) or 000026 (day 00)", "The function checks only the length, the digits and that the day is at most 31, not the month or which days exist"], modelAnswer: "310226 is accepted although 31 February does not exist, because the function does not check the month or the number of days in it.", explanation: "Validation cannot prove correctness." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Weights 4, 3, 2 for the first three digits."],
    explanation: `The check digit for 259 is ${cd3.check}, so the full code is 259${cd3.check}.`,
    stem: "A library in Bulawayo gives each member a three-digit number followed by a modulus 11 check digit. The weights from the left for the three digits are 4, 3 and 2.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the weighted sum for the number 259.", value: cd3.sum, wrong: [259, 18], workedSolution: `1. 2×4 + 5×3 + 9×2 = 8 + 15 + 18 = ${cd3.sum}.`, explanation: `The weighted sum is ${cd3.sum}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the check digit.", value: Number(cd3.check), wrong: [cd3.remainder, 0], workedSolution: `1. ${cd3.sum} ÷ 11 = 3 remainder ${cd3.remainder}.\n2. Check digit = 11 − ${cd3.remainder} = ${cd3.check}.`, explanation: `11 − ${cd3.remainder} = ${cd3.check}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why a check digit is useful when members' numbers are typed in at the desk.", points: ["The program recalculates the check digit from the typed digits", "A typing error, such as a wrong or swapped digit, gives a different check digit, so the number is rejected before it is used"], modelAnswer: "The program recalculates the check digit from the typed digits. A wrong or swapped digit gives a different check digit, so the number is rejected before it is used.", explanation: "Detects typing errors." }),
    ] });
  b.card("DEFINITION", "Data validation", "An automatic check that data is reasonable and allowed; it does not prove the data is correct.");
  b.card("DEFINITION", "Data verification", "A check that data has been entered or transferred accurately, by comparing with the original or a second copy.");
  b.card("CONCEPT", "Validation checks", "Range, limit, length, format, presence, existence and check digit.");
  b.card("CONCEPT", "Test data", "Normal (valid, typical), extreme or boundary (valid, on the edge) and abnormal (invalid, must be rejected), each with an expected result.");
  b.card("FORMULA", "Modulus 11 check digit", "Multiply each digit by its weight, add, find the remainder after dividing by 11; check digit = 11 − remainder (0 if the remainder is 0; X if the result is 10).");
  b.card("CONCEPT", "Verification during entry", "Visual check (compare screen with source) and double entry (type twice, program compares).");
  b.card("CONCEPT", "Parity check", "Even parity: the number of 1s, including the parity bit, is even. Detects an odd number of changed bits. Block parity adds a parity byte to find the changed bit.");
  b.card("FORMULA", "Checksum", "Sum of the byte values modulo 256, sent with the data and recalculated by the receiver.");
  b.card("FACT", "Limit of validation", "A wrong but possible value, such as 58 instead of 85, passes validation.");
});
