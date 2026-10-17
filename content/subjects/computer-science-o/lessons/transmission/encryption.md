---
{
  "key": "transmission.encryption",
  "title": "Encryption: symmetric and asymmetric keys",
  "summary": "Why data is encrypted before it is transmitted; plaintext, ciphertext and keys; how symmetric encryption uses one shared key and asymmetric encryption uses a public and a private key; and digital signatures and certificates in outline.",
  "concepts": ["comp.transmission.encryption"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

When Chipo pays for groceries with mobile money in Gweru, or logs in to her school's learning portal, her data travels through cables, masts and routers that belong to many different organisations. Anyone with the right equipment could **intercept** the data on its way. Encryption cannot stop interception, but it makes intercepted data useless: without the key, it looks like random characters.

Both ZIMSEC and Cambridge examine encryption: why it is needed, the difference between symmetric and asymmetric encryption, and (for ZIMSEC system security) the purpose of digital signatures and certificates.

## Key definitions

:::definition{term="Encryption"}
Scrambling data using an algorithm and a key so that it cannot be understood by anyone who does not have the key to decrypt it.
:::

:::definition{term="Plaintext"}
The original, readable data before it is encrypted.
:::

:::definition{term="Ciphertext"}
The scrambled data produced by encryption. It is what travels across the network.
:::

:::definition{term="Encryption key"}
A value used with the encryption algorithm to turn plaintext into ciphertext (or back again). Without the correct key the ciphertext cannot be decrypted.
:::

:::definition{term="Symmetric encryption"}
Encryption in which the same key is used to encrypt and to decrypt the data.
:::

:::definition{term="Asymmetric encryption"}
Encryption that uses a matching pair of keys: a public key, which anyone may have, to encrypt, and a private key, kept secret by its owner, to decrypt.
:::

## Why encrypt data before transmitting it?

- Data crossing a network can be **intercepted**, for example by someone monitoring a public Wi-Fi network.
- Encryption does **not** prevent interception, but intercepted ciphertext is meaningless without the key.
- It protects **confidential** data: passwords, bank details, medical records, examination entries and personal messages.
- Organisations that hold personal data have a legal duty to protect it; in Zimbabwe the Cyber and Data Protection Act requires personal data to be kept secure, and encryption is one of the main ways of doing this.

## Symmetric encryption

1. The sender and receiver agree on one secret key.
2. The sender encrypts the plaintext with the key, producing ciphertext.
3. The ciphertext is transmitted.
4. The receiver decrypts it with the **same** key.

:::worked-solution[A simple symmetric cipher]
An ancient, very weak cipher shows the idea of a key. Each letter is moved a fixed number of places along the alphabet; the number of places is the key. With the key 3:

| Plaintext | M | E | E | T |
|:-:|:-:|:-:|:-:|:-:|
| Ciphertext (key 3) | P | H | H | W |

1. "MEET AT NOON" becomes "PHHW DW QRRQ".
2. The receiver, who knows the same key, moves each letter back 3 places to recover "MEET AT NOON".
3. The same key encrypts and decrypts, so this is symmetric.
4. It is weak because there are only 25 useful keys: an attacker could try them all in seconds. Real symmetric methods use keys of 128 bits or more, giving far too many keys to try.
:::

The main problem with symmetric encryption is **key distribution**: the key itself must be shared with the receiver. If it is sent across the same network and intercepted, the attacker can decrypt everything.

## Asymmetric encryption

Each user has a **key pair**, created together by software:

- the **public key** is shared openly, with anyone;
- the **private key** is kept secret and never sent.

Data encrypted with someone's public key can only be decrypted with their **matching private key**.

:::example
**Sending a confidential report.** Sipho in Bulawayo wants to send an encrypted report to the head office in Harare.

1. Head office sends its **public key** to Sipho. It does not matter if someone intercepts it.
2. Sipho encrypts the report using head office's public key.
3. The ciphertext is transmitted.
4. Head office decrypts it with its **private key**, which has never left its computer.
5. An attacker who intercepts the ciphertext and even the public key still cannot decrypt the report, because only the private key can do so.
:::

Asymmetric encryption solves the key-distribution problem, but it is slower than symmetric encryption. In practice, secure websites often use asymmetric encryption to exchange a symmetric key safely, then use that symmetric key for the rest of the session.

![Symmetric encryption uses one shared key (MEET AT NOON becomes PHHW DW QRRQ with key 3, and the same key decrypts it); asymmetric encryption uses the receiver's public key to encrypt and the matching private key, which never leaves the receiver, to decrypt](media:diagrams/encryption-symmetric-asymmetric.png "Figure: symmetric encryption with one shared key and asymmetric encryption with a public and private key")

| | Symmetric | Asymmetric |
|:--|:--|:--|
| Keys | One shared secret key | Public key and private key (a matching pair) |
| Encrypt with | The shared key | The receiver's public key |
| Decrypt with | The same shared key | The receiver's private key |
| Main weakness | The key must be shared safely | Slower to process |

## Digital signatures and certificates (outline)

A **digital signature** shows who sent a message and that it has not been changed. The sender creates the signature using their **private key**; anyone can check it using the sender's **public key**. If the message is altered, the check fails.

A **digital certificate** links a public key to its owner. It is issued by a trusted **certificate authority** and contains details such as the owner's name, the owner's public key, the issuer and an expiry date. When you visit a secure website, your browser checks the site's certificate before trusting its public key.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 asks why data is encrypted when transmitted and how symmetric and asymmetric encryption work, including public and private keys. ZIMSEC places encryption under system security, alongside digital signatures and certificates; know their purposes in outline.
:::

## Common mistakes

:::mistake{title="Saying encryption stops hackers intercepting data"}
Encryption does not prevent interception; it makes intercepted data unreadable without the key.
:::

:::mistake{title="Encrypting with the private key in asymmetric encryption"}
To send confidential data, encrypt with the **receiver's public key**; only the receiver's private key decrypts it. (A digital signature is the case that uses the sender's private key.)
:::

:::mistake{title="Saying the public key must be kept secret"}
The public key is meant to be shared. Only the private key is secret.
:::

## Exam tips

:::exam-tip
For "**explain** why data is encrypted", include both ideas: data may be intercepted, and encryption makes it meaningless to anyone without the key.
:::

:::exam-tip
For asymmetric encryption, name **whose** key is used at each step: "the sender encrypts with the receiver's public key; the receiver decrypts with its own private key".
:::

## Summary

:::summary
- Encryption turns plaintext into ciphertext using an algorithm and a key; intercepted ciphertext is useless without the key.
- Symmetric encryption uses one shared secret key to encrypt and decrypt; the key must be distributed safely.
- Asymmetric encryption uses a public key to encrypt and the matching private key to decrypt.
- Asymmetric encryption solves key distribution but is slower; it is often used to share a symmetric key.
- Digital signatures (made with a private key) prove the sender and integrity; certificates link a public key to its owner.
:::
