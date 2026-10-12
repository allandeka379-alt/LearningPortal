---
{
  "key": "security.encryption",
  "title": "Encryption: symmetric and asymmetric keys",
  "summary": "Plain text, cipher text, keys, symmetric and asymmetric encryption with public and private keys, how the Caesar and transposition ciphers work and why they are weak, encryption of stored data and data in transit, and the purpose of quantum cryptography.",
  "concepts": ["acs.security.encryption"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

When Nyasha pays a school fee with her phone, the details travel across several networks and pass through many devices that belong to other people. Anyone who could read the data on the way would see her account and the amount. **Encryption** makes the data unreadable to anyone except the intended receiver, even if it is intercepted.

This lesson explains the vocabulary of encryption, the difference between **symmetric** and **asymmetric** encryption, two simple ciphers that you can work by hand (and by code), why they are easy to break, and how encryption protects data that is stored and data that is sent. SSL/TLS and certificates build on this and are in the next lesson. You should already know that data is stored as binary and sent over networks that others may be able to read.

## Key definitions

:::definition{term="Encryption"}
The process of converting plain text into cipher text using an algorithm and a key, so that the data cannot be understood by anyone who does not have the key to reverse the process.
:::

:::definition{term="Plain text and cipher text"}
Plain text is the original, readable data before encryption. Cipher text is the unreadable data produced by encryption.
:::

:::definition{term="Key"}
A value used by the encryption algorithm to encrypt and decrypt data. The security of a good system depends on keeping the key secret, not the algorithm.
:::

:::definition{term="Symmetric encryption"}
Encryption in which the same secret key is used to encrypt and to decrypt the data.
:::

:::definition{term="Asymmetric encryption"}
Encryption that uses a pair of keys: a public key, which is shared with anyone, and a private key, which is kept secret by its owner. Data encrypted with one key can be decrypted only with the other.
:::

## Symmetric encryption

Both the sender and receiver have the same secret key. The sender encrypts with it, the receiver decrypts with it.

- It is **fast**, so it is used to encrypt large amounts of data such as files, disks and the data of a session.
- The **key distribution problem**: before they can communicate, the two sides must share the key without anyone else obtaining it. If the key is sent over the network, an eavesdropper could copy it.
- The number of keys grows quickly. If every pair of people in a group needs its own secret key, n people need n(n − 1) ÷ 2 keys.

| People | Secret keys needed (symmetric, one per pair) | Key pairs needed (asymmetric, one per person) |
|:-:|:-:|:-:|
| 10 | 45 | 10 |
| 30 | 435 | 30 |

## Asymmetric encryption

Each person has a **key pair**. The public key can be published, and only the private key can undo what the public key does (and the reverse).

- **Confidentiality.** To send a secret message to Farai, encrypt it with **Farai's public key**. Only Farai's private key can decrypt it, so nobody else can read it. No secret key had to be shared first, which solves the key distribution problem.
- **Authenticity.** To prove that a message came from Farai, he encrypts it (or a digest of it) with **his private key**. Anyone can decrypt it with Farai's public key. If it works, it must have come from the owner of that private key. This is the basis of digital signatures.

Asymmetric encryption is much **slower** than symmetric encryption. So in practice the two are combined: asymmetric encryption is used to share a secret key safely, and then the faster symmetric encryption is used for the data (this is what SSL/TLS does).

| | Symmetric | Asymmetric |
|---|---|---|
| Keys | One shared secret key | A public and a private key |
| Speed | Fast | Slow |
| Key distribution | A problem: the key must be shared secretly | Solved: the public key can be shared openly |
| Typical use | Encrypting large amounts of data | Sharing keys, signatures |

## Simple ciphers

**The Caesar cipher** is a substitution cipher. Every letter is replaced by the letter a fixed number of places further along the alphabet (the key). With key 3, A becomes D, B becomes E and so on, wrapping round after Z.

:::worked-solution{title="Encrypting with a Caesar cipher"}
Encrypt `MEET AT THE GATE` with key 3.

1. Shift each letter 3 places on: M → P, E → H, E → H, T → W.
2. Continue for each word. Spaces are kept.
3. Cipher text: `PHHW DW WKH JDWH`.
4. To decrypt, shift each letter 3 places back.
:::

**Why it is weak.** There are only 25 possible keys, so an attacker can try them all (a **brute-force** attack):

| Key | Decrypted attempt |
|:-:|:-:|
| 0 | PHHW DW WKH JDWH |
| 1 | OGGV CV VJG ICVG |
| 2 | NFFU BU UIF HBUF |
| 3 | MEET AT THE GATE |
| 4 | LDDS ZS SGD FZSD |

Only key 3 gives readable text. Also, a letter that is common in the plain text is always replaced by the same letter in the cipher text, so counting the most frequent letters (**frequency analysis**) shows the key, even for long texts.

**A transposition cipher** keeps the same letters but changes their order. In a simple **columnar transposition**, the text is written in rows of a fixed width, then read down the columns.

:::worked-solution{title="Columnar transposition"}
Encrypt `MEET AT THE GATE` using 4 columns and reading the columns in order 1, 2, 3, 4. Pad with X.

1. Remove the spaces and write the letters in rows of 4: `MEET`, `ATTH`, `EGAT`, `EXXX` (the last row is padded with three Xs).
2. Read down column 1: M, A, E, E. Column 2: E, T, G, X. Column 3: E, T, A, X. Column 4: T, H, T, X.
3. Cipher text: `MAEEETGXETAXTHTX`.
4. To decrypt, write the cipher text down the columns of 4 rows and read across the rows.
:::

**Why it is weak.** The letters are unchanged, so the frequency of letters is the same as in normal text, and the attacker can try rearranging the columns until words appear. Using the order of the columns as a key makes it harder but not secure. Combining substitution and transposition several times is the idea behind modern ciphers, which use much longer keys.

## Encrypting stored data and data in transit

- **Data at rest** (stored on a disk, phone or memory stick) can be encrypted so that a stolen laptop or drive is of no use to the thief without the key. Examples are full-disk encryption and encrypted files and databases.
- **Data in transit** (travelling over a network) is encrypted so that anyone intercepting it, for example on public WiFi, cannot read it. Examples are HTTPS (TLS), secure email connections and virtual private networks (VPNs).

Encryption does not stop data from being deleted or copied. It makes the copy unreadable, which is why it is used together with passwords, backups and access control. The key must be protected: if the key is lost, the data cannot be recovered, and if the key is stolen, the encryption protects nothing.

## Quantum cryptography

Quantum cryptography (more exactly **quantum key distribution**) sends the bits of a secret key as quantum states of single particles of light (photons) along a fibre. According to quantum physics, observing a photon changes its state. So if an eavesdropper tries to read the photons, the changes show up as errors, and the two sides know that the key has been intercepted and discard it. A key that was not intercepted is then used to encrypt data with symmetric encryption.

- **Purpose and benefit:** it allows the sender and receiver to detect any eavesdropping on the key exchange, and its security depends on the laws of physics.
- **Drawbacks:** it needs special, costly equipment, a dedicated fibre or a clear line of sight, it works only over limited distances without extra equipment, and it is still being developed. It protects the key exchange, but the rest of the system must be secure too.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine plain text, cipher text, keys, symmetric and asymmetric encryption, and the ideas of public and private keys. The Caesar and transposition ciphers are simple examples that can be worked by code. Quantum cryptography is Cambridge detail (A Level, Paper 3). Paper 3 and ZIMSEC Paper 1 usually ask you to describe or compare; Paper 2 or 4 may ask you to write a program for a simple cipher.
:::

## Common mistakes

:::mistake{title="Saying that the public key decrypts the message sent to its owner"}
A message encrypted with the recipient's public key is decrypted with the recipient's private key. The public key encrypts, the private key decrypts, for confidentiality.
:::

:::mistake{title="Confusing encryption with hashing or compression"}
Encryption can be reversed with the key. A hash cannot be reversed. Compression makes data smaller but gives no security.
:::

:::mistake{title="Saying that encryption stops hackers from getting the data"}
Encryption does not stop the data from being copied. It makes it unreadable without the key.
:::

:::mistake{title="Saying that a longer message is harder to crack with a Caesar cipher"}
A longer message makes frequency analysis easier, and a Caesar cipher always has only 25 possible keys.
:::

## Exam tips

:::exam-tip
"**Explain** how asymmetric encryption keeps a message confidential": the sender encrypts with the receiver's public key; only the receiver's private key can decrypt it. Name which key is used at each step.
:::

:::exam-tip
"**Compare** symmetric and asymmetric": one key against a key pair, fast against slow, key distribution problem against solved. Add that they are often used together.
:::

:::exam-tip
For a code question on a cipher, state the algorithm in steps: loop through each character, test whether it is a letter, shift it using MOD to wrap round, keep other characters unchanged, and output the result. Show a trace for a short word.
:::

## Summary

:::summary
- Encryption turns plain text into cipher text using an algorithm and a key; only someone with the correct key can decrypt it.
- Symmetric encryption uses one shared secret key: it is fast but the key has to be distributed secretly. Asymmetric encryption uses a public and a private key: it solves key distribution but is slow.
- Encrypt with the receiver's public key for confidentiality; encrypt with the sender's private key to show authenticity.
- Caesar (25 keys, brute force and frequency analysis) and simple transposition (same letters, new order) are easy to break.
- Stored data and data in transit are encrypted; quantum cryptography shares a key using photons and shows if it is intercepted, but needs costly equipment.
:::
