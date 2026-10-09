// Slice w1b: encryption (comp.transmission.encryption).
import { concept, P } from "../lib.mjs";

const caesar = (s, k) => s.replace(/[A-Z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) - 65 + k + 26) % 26) + 65));

concept("comp.transmission.encryption", { file: "transmission/encryption", keyPrefix: "transmission.encryption" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **ciphertext**?",
    options: [["The scrambled data produced by encryption", "Correct."], ["The original readable data", "That is plaintext."], ["The value used with the algorithm to encrypt data", "That is the key."], ["A list of trusted websites", "That has nothing to do with ciphertext."]],
    answer: "A",
    explanation: "Plaintext + key + algorithm → ciphertext. Ciphertext is what travels across the network.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In **symmetric** encryption, which key is used to decrypt the data?",
    options: [["The key used to encrypt it", "Correct: one shared key does both jobs."], ["The receiver's private key", "Private keys belong to asymmetric encryption."], ["The sender's public key", "Public keys belong to asymmetric encryption."], ["No key is needed to decrypt it", "Without the key the ciphertext cannot be decrypted."]],
    answer: "A",
    explanation: "Symmetric encryption uses one shared secret key for encryption and decryption.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of encrypting data before it is transmitted?",
    options: [["To make intercepted data meaningless without the key", "Correct: encryption protects the content if it is intercepted."], ["To stop the data from being intercepted", "Encryption cannot stop interception."], ["To make the data smaller so it sends faster", "That is compression, not encryption."], ["To detect errors that occur during transmission", "That is the job of parity checks and checksums."]],
    answer: "A",
    explanation: "Data on a network can be intercepted. Encryption does not prevent this, but without the key the ciphertext cannot be understood.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tatenda wants to send Rudo a confidential file using asymmetric encryption. Which key should he use to encrypt it?",
    options: [["Rudo's public key", "Correct: only Rudo's matching private key can then decrypt it."], ["Rudo's private key", "Rudo's private key is secret; Tatenda does not have it."], ["Tatenda's public key", "Then only Tatenda's private key could decrypt it, not Rudo's."], ["Tatenda's private key", "Anyone with Tatenda's public key could decrypt it, so it would not be confidential."]],
    answer: "A",
    explanation: "Encrypt with the receiver's public key; the receiver decrypts with their own private key.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is asymmetric encryption said to solve the **key distribution** problem of symmetric encryption?",
    options: [["The key needed to decrypt is never sent across the network", "Correct: only the public key is shared; the private key stays with its owner."], ["The public key is too long for attackers to intercept", "Public keys can be intercepted; it does not matter if they are."], ["Asymmetric encryption does not use any keys", "It uses a key pair."], ["Both keys are sent separately by different routes", "The private key is never sent at all."]],
    answer: "A",
    hints: ["Which key must be kept secret, and does it ever travel?"],
    explanation: "In symmetric encryption the secret key itself must be shared, and could be intercepted. In asymmetric encryption only the public key is shared; the private key, which decrypts, never leaves its owner.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does a **digital certificate** do?",
    options: [["It links a public key to its verified owner", "Correct: it is issued by a certificate authority."], ["It encrypts every web page on a server", "Certificates do not do the encrypting themselves."], ["It stores the owner's private key for safekeeping", "Private keys are never placed in certificates."], ["It checks transmitted data for parity errors", "That is a parity check."]],
    answer: "A",
    hints: ["Think about how a browser knows a public key really belongs to a bank's website."],
    explanation: "A digital certificate, issued by a trusted certificate authority, contains the owner's details and public key, so others can trust that the key belongs to that owner.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which key does a sender use to create a **digital signature**?",
    options: [["The sender's private key", "Correct: anyone can check it with the sender's public key."], ["The sender's public key", "Anyone has the public key, so a signature made with it would prove nothing."], ["The receiver's public key", "That key is for encrypting confidential data to the receiver."], ["The receiver's private key", "The sender never has the receiver's private key."]],
    answer: "A",
    hints: ["Only the real sender should be able to make the signature."],
    explanation: "Only the sender holds their private key, so a signature made with it proves who sent the message; others verify it with the sender's public key.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In asymmetric encryption, the public key may be shared with anyone.",
    answer: true,
    explanation: "True. The public key is meant to be shared; only the private key is kept secret.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Encrypting data stops a hacker from intercepting it.",
    answer: false,
    explanation: "False. Encrypted data can still be intercepted, but it is meaningless without the key.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [["Plaintext", "Readable data before encryption"], ["Ciphertext", "Scrambled data after encryption"], ["Public key", "Shared openly and used to encrypt data for its owner"], ["Private key", "Kept secret and used by its owner to decrypt"]],
    explanation: "Plaintext → (key) → ciphertext. Public key: shared, encrypts. Private key: secret, decrypts.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: `A simple cipher replaces each letter with the letter a fixed number of places later in the alphabet (after Z it wraps round to A). With a key of 4, encrypt the word **CODE**.`,
    accepted: [caesar("CODE", 4)],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: [caesar("CODE", 3)],
    explanation: `Move each letter 4 places on: C→G, O→S, D→H, E→I, giving ${caesar("CODE", 4)}.`,
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: `The same kind of cipher (each letter moved a fixed number of places along the alphabet, wrapping from Z to A) was used with a key of 2 to produce the ciphertext **${caesar("YES", 2)}**. Decrypt it.`,
    accepted: ["YES"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: [caesar(caesar("YES", 2), 2)],
    hints: ["Decrypting with a symmetric key reverses the encryption: move each letter back.", "Moving back from A wraps round to Z."],
    explanation: `Move each letter 2 places back: ${caesar("YES", 2)} → YES (A goes back to Y, wrapping round).`,
  });
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A cipher moves each letter of the 26-letter alphabet a fixed number of places (wrapping from Z to A). A key of 0 or 26 leaves the text unchanged. How many different keys actually change the text?",
    value: 25,
    wrong: [26],
    hints: ["Keys 1 to 25 each give a different result.", "Key 26 is the same as key 0."],
    explanation: "Keys 1 to 25 each produce different ciphertext; 0 (and 26) change nothing. With only 25 keys, an attacker can try them all, which is why such ciphers are weak.",
    workedSolution: "1. Shifts of 1, 2, …, 25 each move letters to a different place.\n2. A shift of 26 brings every letter back to itself, like 0.\n3. So 25 useful keys.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about asymmetric encryption.",
    template: "Data is encrypted with the receiver's {{blank:a}} key and decrypted with the receiver's {{blank:b}} key. This method is slower than {{blank:c}} encryption.",
    blanks: [
      { id: "a", accepted: ["public"], choices: ["public", "private"] },
      { id: "b", accepted: ["private"], choices: ["public", "private"] },
      { id: "c", accepted: ["symmetric"], choices: ["symmetric", "asymmetric"] },
    ],
    explanation: "Encrypt with the public key, decrypt with the private key; asymmetric is slower than symmetric.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    hints: ["How many keys? Who has them? What is the risk?"],
    stem: "Describe how symmetric encryption is used to send data securely, and state its main weakness. [3]",
    points: ["The same (secret) key is used to encrypt the plaintext and to decrypt the ciphertext", "The sender and receiver must both have the key before data is sent", "Weakness: the key must be shared / distributed; if it is intercepted the data can be decrypted"],
    modelAnswer: "The sender encrypts the plaintext with a secret key and sends the ciphertext; the receiver decrypts it with the same key. The weakness is that the key must be shared with the receiver, and if it is intercepted the attacker can decrypt the data.",
    explanation: "One shared key; the risk is in sharing it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Say whose key is used at each step.", "Think about what an interceptor would see."],
    stem: "A hospital in Mutare sends patients' test results to doctors over the internet. The hospital uses asymmetric encryption.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the test results should be encrypted before they are sent.", points: ["The data could be intercepted while it travels over the internet", "Encryption makes it meaningless to anyone without the key, so confidential medical data stays private"], modelAnswer: "The results could be intercepted on the internet; encrypted, they cannot be understood without the key, so patients' confidential data is protected." }),
      P.mcq({ label: "(b)", stem: "Which key does the hospital use to encrypt results sent to Dr Moyo?", options: [["Dr Moyo's public key", "Correct."], ["Dr Moyo's private key", "The hospital does not have it."], ["The hospital's private key", "Anyone with the hospital's public key could then decrypt it."], ["The hospital's public key", "Only the hospital could then decrypt it."]], answer: "A", explanation: "Encrypt with the receiver's public key." }),
      P.mcq({ label: "(c)", stem: "Which key does Dr Moyo use to decrypt the results?", options: [["His own private key", "Correct."], ["His own public key", "The public key cannot decrypt what it encrypted."], ["The hospital's public key", "That key belongs to the hospital's pair."], ["The hospital's private key", "Dr Moyo never has it."]], answer: "A", explanation: "The matching private key decrypts." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why an attacker who intercepts both the ciphertext and Dr Moyo's public key still cannot read the results.", points: ["Data encrypted with the public key can only be decrypted with the matching private key", "The private key is kept secret by Dr Moyo and is never transmitted"], modelAnswer: "Only the matching private key can decrypt the data, and Dr Moyo keeps it secret; it never crosses the network." }),
    ],
    explanation: "Receiver's public key encrypts; receiver's private key decrypts.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, applies: ["zimsec"],
    hints: ["Signature: made with the sender's private key.", "Certificate: issued by a certificate authority."],
    stem: "An online shop in Harare accepts mobile-money payments through its website.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** items found in the shop's digital certificate.", points: ["The owner's (shop's) name / organisation details", "The owner's public key (or the issuing certificate authority / expiry date / serial number)"], modelAnswer: "The shop's name and its public key (also the certificate authority that issued it and an expiry date)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how a digital signature on the shop's emails shows that an email really came from the shop.", points: ["The shop signs the email with its private key, which only the shop has", "The customer's software checks the signature with the shop's public key; if the check succeeds the email came from the shop and was not altered"], modelAnswer: "The shop creates the signature with its private key. The customer's software verifies it with the shop's public key; a valid signature proves the sender and that the message is unchanged." }),
      P.mcq({ label: "(c)", stem: "Which statement about symmetric encryption is correct?", options: [["It uses one key to encrypt and decrypt", "Correct."], ["It uses a public and a private key", "That is asymmetric."], ["It never needs the key to be shared", "The key must be shared with the receiver."], ["It is slower than asymmetric encryption", "Symmetric is faster."]], answer: "A", explanation: "One shared key." }),
    ],
    explanation: "Certificates link public keys to owners; signatures use the sender's private key.",
  });

  b.card("DEFINITION", "**Encryption**", "Scrambling data with an algorithm and a key so that only someone with the key can read it.");
  b.card("DEFINITION", "**Plaintext** and **ciphertext**", "Plaintext: readable data before encryption. Ciphertext: the scrambled result that is transmitted.");
  b.card("CONCEPT", "Does encryption stop interception?", "No. It makes intercepted data meaningless without the key.");
  b.card("DEFINITION", "**Symmetric encryption**", "One shared secret key encrypts and decrypts the data.");
  b.card("CONCEPT", "Main weakness of symmetric encryption", "Key distribution: the key must be shared, and an intercepted key lets an attacker decrypt everything.");
  b.card("DEFINITION", "**Asymmetric encryption**", "A key pair: data encrypted with the public key can only be decrypted with the matching private key.");
  b.card("FACT", "Sending confidential data asymmetrically", "Encrypt with the receiver's public key; the receiver decrypts with their private key.");
  b.card("DEFINITION", "**Digital signature**", "Made with the sender's private key and checked with their public key; proves who sent it and that it is unchanged.");
  b.card("DEFINITION", "**Digital certificate**", "Issued by a certificate authority; links a public key to its owner (name, public key, issuer, expiry date).");
});
