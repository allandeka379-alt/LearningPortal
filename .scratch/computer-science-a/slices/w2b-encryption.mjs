// Slice w2b: encryption (acs.security.encryption, both boards; quantum cryptography is Cambridge detail).
import { concept, P, chk, same, CAM, caesar, mdTable, pyBlock, py, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { transpose, untranspose, sharedKeys, freq } from "../tables/w2b-encryption.mjs";

// JS mirror of the pseudocode Encrypt function used in the manual items
const encryptMirror = (text, key) => [...text].map((ch) => (ch >= "A" && ch <= "Z" ? String.fromCharCode(((ch.charCodeAt(0) - 65 + key) % 26) + 65) : ch)).join("");
for (const [s, k] of [["KARIBA DAM", 4], ["XYZ", 5], ["HELLO", 13]]) same(encryptMirror(s, k), caesar(s, k));
const c1 = caesar("SEND HELP", 5);
same(c1, "XJSI MJQU");
const d1 = caesar("LIPPS ASVPH", -4);
same(d1, "HELLO WORLD");
const tr = transpose("SEND MORE HELP NOW", 5);
same(tr.cipher, "SOLERPNENDHOMEW");
const tr2 = transpose("PAYMENT RECEIVED", 4, [2, 4, 1, 3]);
same(tr2.cipher, "ANCEMRIXPEEVYTED");
same(untranspose(tr2.cipher, 4, [2, 4, 1, 3]), "PAYMENTRECEIVEDX");
chk(sharedKeys(12), 66);
const progCode = `def encrypt(text, key):
    result = ""
    for ch in text:
        if "A" <= ch <= "Z":
            result = result + chr((ord(ch) - 65 + key) % 26 + 65)
        else:
            result = result + ch
    return result


print(encrypt("KARIBA DAM", 4))
print(encrypt("XYZ", 5))`;
const run = pyBlock(progCode);
same(py(progCode).trim().split("\n"), ["OEVMFE HEQ", "CDE"]);

const pseudo = `FUNCTION Encrypt(Text : STRING, Key : INTEGER) RETURNS STRING
    DECLARE Result : STRING
    DECLARE Ch : CHAR
    DECLARE i : INTEGER
    Result ← ""
    FOR i ← 1 TO LENGTH(Text)
        Ch ← MID(Text, i, 1)
        IF Ch >= "A" AND Ch <= "Z" THEN
            Result ← Result & CHR(MOD(ASC(Ch) - 65 + Key, 26) + 65)
        ELSE
            Result ← Result & Ch
        ENDIF
    NEXT i
    RETURN Result
ENDFUNCTION`;

concept("acs.security.encryption", { file: "security/encryption", keyPrefix: "security.encryption" }, (b) => {
  mc(b, 1, "RECALL", "What is cipher text?",
    ["Data that has been made unreadable by encryption", "Correct."],
    [["The original readable message before it was encrypted", "That is plain text."], ["The key used to encrypt a message", "The key is a separate value."], ["A message that has been compressed", "Compression makes data smaller; it does not make it unreadable."]],
    "Cipher text is the output of encryption.");
  mc(b, 2, "UNDERSTANDING", "Which key does a sender use to encrypt a message so that only the receiver can read it?",
    ["The receiver's public key", "Correct: only the receiver's private key can decrypt it."],
    [["The receiver's private key", "The private key is kept secret by the receiver."], ["The sender's public key", "Only the sender's private key could decrypt that, so the receiver could not read the message."], ["A key chosen by the receiver's ISP", "The ISP has no part in choosing keys."]],
    "For confidentiality, encrypt with the receiver's public key.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main problem with symmetric encryption?",
    ["The secret key has to be shared safely between the two sides", "Correct: this is the key distribution problem."],
    [["It cannot encrypt large files", "Symmetric encryption is used for large amounts of data."], ["It is slower than asymmetric encryption", "It is faster."], ["It needs a different public key for every message that is sent", "Symmetric encryption uses a shared secret key, not public keys."]],
    "Anyone who obtains the shared key can read the data.", { daily: true });
  mc(b, 2, "RECALL", "Which type of cipher keeps the letters of the plain text but changes their order?",
    ["Transposition", "Correct."],
    [["Caesar (substitution)", "A Caesar cipher replaces letters with other letters."], ["Hashing", "Hashing is not a cipher; it cannot be reversed."], ["Run-length encoding", "This is a compression method."]],
    "A transposition cipher rearranges the letters.");
  mc(b, 3, "ANALYSIS", "Why is a Caesar cipher easy to break?",
    ["There are only 25 possible keys and letter frequencies are kept", "Correct: both brute force and frequency analysis work."],
    [["The key is always sent with the cipher text", "The key is not sent with the message."], ["It changes the order of the letters but not the letters themselves", "That describes a transposition cipher."], ["It needs a public and a private key", "A Caesar cipher uses one key."]],
    "A computer can try all 25 keys at once.", { hints: ["How many different shifts are there?"] });
  mc(b, 3, "APPLICATION", "A hospital needs to store patient records on laptops that doctors take to rural clinics. Which measure best protects the records if a laptop is stolen?",
    ["Encrypt the data stored on the laptop's disk", "Correct: the thief cannot read the data without the key."],
    [["Compress the data on the laptop's disk", "Compression does not protect the content."], ["Rename the files so that nobody can find them", "Hiding names gives no protection."], ["Use a faster processor in the laptop", "Speed has no effect on security."]],
    "Encrypting data at rest makes it unreadable to a thief.", { hints: ["What stops a thief reading the disk?"] });
  mc(b, 3, "UNDERSTANDING", "How does quantum cryptography help to protect a key?",
    ["Any eavesdropping on the photons changes them, so it can be detected", "Correct."],
    [["It makes the key shorter so that it is easier to hide from an attacker", "Quantum cryptography does not shorten the key."], ["It stores the key in the cloud", "It exchanges the key using photons."], ["It stops the key from being used again", "Its purpose is to detect interception."]],
    "Observing a quantum state changes it.", { applies: CAM, hints: ["What happens to a photon when it is measured?"] });
  mc(b, 4, "EVALUATION", "A school wants to send exam papers from the education office to 30 schools. Each school must be able to read only its own papers. Which approach is best?",
    ["Give each school a key pair and encrypt its papers with that school's public key", "Correct: only that school's private key can decrypt them."],
    [["Use one shared secret key that is sent to all the schools in advance by post or email", "Any school could then read all the papers."], ["Send all papers unencrypted in a zip file", "A zip file is not encryption."], ["Use a Caesar cipher with key 3 for every paper", "A Caesar cipher is easy to break and the same for all."]],
    "Asymmetric encryption gives each school separate access without a shared secret.", { hints: ["Who must be able to decrypt each paper?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In asymmetric encryption, the private key must be kept secret by its owner.", answer: true, explanation: "True. If it were shared, anyone could decrypt messages meant for the owner or forge the owner's signature." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["Plain text", "The readable message before encryption"], ["Cipher text", "The unreadable message after encryption"], ["Symmetric encryption", "The same secret key is used to encrypt and decrypt"], ["Public key", "A key that may be shared with anyone"], ["Private key", "A key kept secret by its owner"]],
    explanation: "Basic vocabulary of encryption." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about asymmetric encryption.",
    template: "To keep a message secret, the sender encrypts with the receiver's {{blank:a}} key. The receiver decrypts with their {{blank:b}} key. Asymmetric encryption is {{blank:c}} than symmetric encryption.",
    blanks: [
      { id: "a", accepted: ["public"], choices: ["public", "private", "shared", "secret"] },
      { id: "b", accepted: ["private"], choices: ["private", "public", "shared", "master"] },
      { id: "c", accepted: ["slower"], choices: ["slower", "faster", "equally fast", "cheaper"] },
    ], hints: ["Which key can be shared with anyone?"], explanation: "Receiver's public key; receiver's private key; slower." });
  b.short({ d: 3, skill: "APPLICATION", daily: true, hints: ["Move each letter 5 places on; wrap round after Z."],
    stem: "Encrypt SEND HELP using a Caesar cipher with key 5. Keep the space.", accepted: [c1], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["WJRI MJQU"],
    explanation: "S → X, E → J, N → S, D → I; H → M, E → J, L → Q, P → U. Cipher text: XJSI MJQU." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Decrypt by moving each letter 4 places back."],
    stem: "The cipher text LIPPS ASVPH was made with a Caesar cipher using key 4. Write the plain text.", accepted: [d1], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["PMTTW EWZTL"],
    explanation: "L → H, I → E, P → L, P → L, S → O; A → W, S → O, V → R, P → L, H → D: HELLO WORLD." });
  b.short({ d: 4, skill: "APPLICATION", hints: ["Write the letters in rows of 5, then read down each column."],
    stem: "Encrypt SENDMOREHELPNOW using a columnar transposition with 5 columns. Write the text in rows of 5 and read the columns in the order 1, 2, 3, 4, 5. There are no spare letters, so no padding is needed.",
    accepted: [tr.cipher], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["SENDMOREHELPNOW"],
    explanation: `The rows are ${tr.rows.join(", ")}. Reading down the columns gives ${tr.cipher}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Keys = n(n − 1) ÷ 2."],
    stem: "12 officials in a district office each need a separate secret key to communicate with each of the others, using symmetric encryption. How many secret keys are needed in total?",
    value: 66, wrong: [12, 132], workedSolution: "1. Pairs = 12 × 11 ÷ 2.\n2. = 132 ÷ 2 = 66 keys.", explanation: "12 × 11 ÷ 2 = 66 keys." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points on keys and two on speed or distribution."],
    stem: "Compare symmetric and asymmetric encryption. [4]",
    points: ["Symmetric encryption uses one shared secret key; asymmetric uses a public and a private key pair", "Symmetric encryption is faster, so it suits large amounts of data", "Symmetric encryption has a key distribution problem as the key must be shared secretly", "Asymmetric encryption avoids this because the public key can be shared openly, but it is slower"],
    modelAnswer: "Symmetric encryption uses one shared secret key and asymmetric uses a public and a private key. Symmetric is faster so it suits large data, but the key must be shared secretly. Asymmetric avoids that problem because the public key can be shared openly, but it is slower.",
    explanation: "Keys, speed, key distribution." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name which key is used at each step."],
    stem: "Tendai wants to send a confidential message to Rudo using asymmetric encryption. Describe how it is done. [3]",
    points: ["Tendai obtains Rudo's public key", "Tendai encrypts the message with Rudo's public key and sends the cipher text", "Rudo decrypts it with her private key, which only she holds"],
    modelAnswer: "Tendai obtains Rudo's public key and encrypts the message with it. Rudo decrypts the cipher text with her private key, which only she holds.",
    explanation: "Public key encrypts, private key decrypts." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about the number of keys and the pattern of letters."],
    stem: "Explain two reasons why a Caesar cipher is not secure. [3]",
    points: ["There are only 25 possible keys, so all can be tried quickly (brute force)", "Each letter is always replaced by the same letter, so the frequency of letters in the cipher text reveals the key", "A computer can break it in a fraction of a second"],
    modelAnswer: "There are only 25 possible keys, so all of them can be tried quickly. Each letter is always replaced by the same letter, so counting the frequency of letters in the cipher text reveals the key.",
    explanation: "Few keys and frequency analysis." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 6, hints: ["Loop through the string, test for a letter, shift with MOD, build the result."],
    stem: "Write a function `Encrypt(Text, Key)` in pseudocode that returns the text encrypted with a Caesar cipher. The text contains only upper-case letters and spaces, spaces stay unchanged. `ASC(Ch)` returns the character code of `Ch` (A is 65) and `CHR(n)` returns the character with code `n`. [6]",
    points: ["Function header with two parameters and RETURNS STRING", "Initialises the result to an empty string", "A loop over every character of Text (using LENGTH and MID or equivalent)", "Tests whether the character is a letter, and leaves spaces unchanged", "Calculates the shifted code with ASC(Ch) − 65 + Key, a MOD 26 and + 65", "Joins the new character to the result and returns the result at the end"],
    modelAnswer: `${codeBlock(pseudo)}`,
    explanation: "One mark for each stage of the algorithm. The model answer is mirrored in code and gives KARIBA DAM → OEVMFE HEQ for key 4." });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Trace the loop letter by letter.", "Characters other than capital letters are copied unchanged."],
    explanation: "The program shifts capital letters by the key with wrap-round and copies other characters.",
    stem: `A student writes this Python function to encrypt text with a Caesar cipher and runs it.\n\n${run.code}\n\nThe function \`ord\` gives the character code of a letter (A is 65) and \`chr\` converts a code back to a character.`,
    parts: [
      P.short({ label: "(a)", marks: 2, stem: "State the first line of output.", accepted: ["OEVMFE HEQ"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["OEVMFE DAM"], explanation: "K+4=O, A+4=E, R+4=V, I+4=M, B+4=F, A+4=E; D+4=H, A+4=E, M+4=Q. The space is unchanged." }),
      P.short({ label: "(b)", marks: 2, stem: "State the second line of output.", accepted: ["CDE"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["YZA"], explanation: "X+5 wraps round to C, Y+5 to D and Z+5 to E because of % 26." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the purpose of `% 26` in the function.", points: ["There are 26 letters, so the remainder makes the shifted position wrap round to the start of the alphabet", "This stops letters near the end of the alphabet, such as X, Y and Z, going beyond Z"], modelAnswer: "There are 26 letters, so the remainder makes positions near the end wrap round to the start of the alphabet, so X, Y and Z do not go beyond Z.", explanation: "Wrap round." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two reasons why this encryption method is not suitable for protecting exam results.", points: ["There are only 25 possible keys, so a brute-force attack finds the plain text quickly", "Letter frequencies are unchanged, so frequency analysis reveals the key"], modelAnswer: "There are only 25 keys, so all can be tried quickly, and letter frequencies are unchanged, so frequency analysis reveals the key.", explanation: "Weaknesses of the Caesar cipher." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Write the text in rows of 4.", "Read the columns in the key order 2, 4, 1, 3."],
    explanation: `Rows: ${tr2.rows.join(", ")}. Reading columns 2, 4, 1, 3 gives ${tr2.cipher}.`,
    stem: "A clerk at a bank in Masvingo uses a columnar transposition cipher. The plain text PAYMENTRECEIVED is written in rows of 4 letters, padded with X, and the columns are read in the order 2, 4, 1, 3.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many rows are needed?", value: tr2.rows.length, wrong: [3, 5], workedSolution: "1. 14 letters need 4 columns: 14 ÷ 4 = 3.5, so 4 rows.\n2. The last row is padded with X.", explanation: "4 rows, the last padded with 2 Xs... one X is added." }),
      P.short({ label: "(b)", marks: 2, stem: "Write the cipher text.", accepted: [tr2.cipher], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["PAYMENTRECEIVEDX"], explanation: `The rows are ${tr2.rows.join(", ")}. Column 2 is ${tr2.rows.map((r) => r[1]).join("")}, column 4 is ${tr2.rows.map((r) => r[3]).join("")}, column 1 is ${tr2.rows.map((r) => r[0]).join("")} and column 3 is ${tr2.rows.map((r) => r[2]).join("")}.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why this cipher is easier to break than a modern cipher.", points: ["The letters are only rearranged, so the letter frequencies are the same as in the plain text", "There are few possible column orders, so an attacker can try them all and look for words", "A modern cipher uses a much longer key and many rounds of substitution and transposition"], modelAnswer: "The letters are only rearranged, so the letter frequencies are unchanged, and there are few possible column orders to try. A modern cipher uses a much longer key and many rounds of substitution and transposition.", explanation: "Weak ciphers." }),
    ] });
  b.card("DEFINITION", "Encryption", "Converting plain text into cipher text with an algorithm and a key so only the holder of the key can read it.");
  b.card("CONCEPT", "Symmetric encryption", "One shared secret key to encrypt and decrypt; fast; key distribution problem.");
  b.card("CONCEPT", "Asymmetric encryption", "Public and private key pair; slower; the public key can be shared openly.");
  b.card("CONCEPT", "Confidentiality and authenticity", "Confidentiality: encrypt with the receiver's public key. Authenticity: encrypt with the sender's private key.");
  b.card("CONCEPT", "Caesar cipher", "Shifts each letter by a fixed key; only 25 keys, so it falls to brute force and frequency analysis.");
  b.card("CONCEPT", "Transposition cipher", "Rearranges the letters of the plain text without changing them; letter frequencies stay the same.");
  b.card("FORMULA", "Symmetric keys for n people", "n(n − 1) ÷ 2 secret keys, against n key pairs for asymmetric encryption.");
  b.card("CONCEPT", "Quantum cryptography", "Shares a key using photons; any eavesdropping changes them and is detected; costly equipment and limited distance.", undefined, { applies: CAM });
});
