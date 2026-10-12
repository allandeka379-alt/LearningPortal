---
{
  "key": "security.ssl-tls-certificates",
  "title": "SSL/TLS, digital certificates and digital signatures",
  "summary": "The purpose of SSL/TLS, how a client and server set up a secure session with a handshake, certificate check and session key, when it is used, how a certificate is obtained from a certificate authority and what it contains, how digital signatures work, and why a browser warns about an invalid certificate.",
  "concepts": ["acs.security.ssl-tls-certificates"],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

When Chipo opens her bank's web site, her browser shows a padlock and the address begins with `https`. Two questions matter. First, how does her browser know that it is talking to the real bank and not to a copy made by a criminal? Second, how do the browser and the bank agree on a key for encrypting the session without sending the key where an eavesdropper could copy it? The answers are **digital certificates** and the **SSL/TLS** protocol.

This lesson explains the purpose of SSL/TLS, the steps in setting up a secure session, what a certificate contains and where it comes from, how a digital signature works, and why browsers warn about invalid certificates. You should already know about symmetric and asymmetric encryption and public and private keys (the previous lesson).

## Key definitions

:::definition{term="SSL/TLS"}
Secure Socket Layer and its successor Transport Layer Security: protocols that provide an encrypted and authenticated connection between a client and a server, so that data cannot be read or changed in transit. The name SSL is still widely used for both.
:::

:::definition{term="Digital certificate"}
An electronic document, issued and signed by a certificate authority, that links a public key to the identity of its owner, such as a web site's domain name.
:::

:::definition{term="Certificate authority (CA)"}
A trusted organisation that checks the identity of an applicant and issues a digital certificate, signed with the CA's own private key.
:::

:::definition{term="Digital signature"}
A value made by encrypting a digest (hash) of a message with the sender's private key. It allows the receiver to check who sent the message and that it has not been changed.
:::

## The purpose of SSL/TLS

SSL/TLS gives a web connection (and other connections such as email) three protections:

- **Confidentiality**: the data is encrypted, so anyone who intercepts it sees only cipher text.
- **Integrity**: any change to the data on the way is detected.
- **Authentication**: the client can check that the server is genuine.

It is used by HTTPS (HTTP over SSL/TLS), which is the secure form of the web protocol. It is appropriate whenever sensitive data is sent: **online banking**, **mobile-money and other payment web sites**, **online shopping**, logging in to any account, and **email** accessed or sent over the internet.

## Setting up a secure session

The steps are an outline. The client is the browser and the server is the web site.

| Step | What happens |
|:-:|---|
| 1 | The client contacts the server and asks for a secure connection, saying which versions and encryption methods it supports. |
| 2 | The server replies, choosing the methods, and sends its **digital certificate**, which holds its public key. |
| 3 | The client **checks the certificate** (see below). If it fails, the client warns the user or stops. |
| 4 | The client creates a random **session key**, encrypts it with the server's public key from the certificate and sends it. |
| 5 | The server decrypts the session key with its **private key**. Only the server can do this. |
| 6 | Both now hold the same session key. They send a message to confirm and the **secure session** begins. All data is encrypted with the session key using fast symmetric encryption. |
| 7 | When the session ends, the session key is discarded. |

Asymmetric encryption is used only to agree the key, since it is slow. The data is encrypted with symmetric encryption, which is fast.

## Digital certificates

A certificate normally contains:

- the **owner's name**, typically the domain name of the web site and the organisation;
- the owner's **public key**;
- the name of the **certificate authority** that issued it;
- the **serial number** of the certificate;
- the **dates** between which it is valid;
- the CA's **digital signature**, which proves that the certificate is genuine and unchanged.

**How a certificate is obtained.**
1. The organisation generates a key pair (a public and a private key). The private key stays secret on its server.
2. It sends the public key and its identity details to a certificate authority in a **certificate signing request**.
3. The CA checks that the applicant really is who it says it is, and has control of the domain.
4. The CA creates the certificate and signs it with the CA's own private key.
5. The organisation installs the certificate on its web server.

**How the client checks it.** The browser holds a list of trusted CAs and their public keys. It checks that: the certificate was signed by a trusted CA (it uses the CA's public key to verify the signature); the dates are current; the domain name in the certificate matches the address that the user typed; and the certificate has not been revoked.

:::worked-solution{title="Checking certificates"}
A browser (trusted CA: Zimbabwe Test CA) visits `www.safepay.example` on 10 October 2026 and receives these certificates.

| Certificate | Domain in the certificate | Issuer | Valid from | Valid to | Problem found |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | www.safepay.example | Zimbabwe Test CA | 10 Jan 2026 | 10 Jan 2027 | none, accepted |
| 2 | www.safepay.example | Zimbabwe Test CA | 10 Jan 2025 | 10 Jan 2026 | expired |
| 3 | www.safepay-login.example | Zimbabwe Test CA | 10 Jan 2026 | 10 Jan 2027 | domain name does not match |
| 4 | www.safepay.example | Self-made | 10 Jan 2026 | 10 Jan 2027 | issuer not trusted |

1. Certificate 1: signed by a trusted CA, valid on 10 October 2026, and the domain matches. It is accepted.
2. Certificate 2 ended on 10 January 2026, so it has **expired**.
3. Certificate 3 belongs to a different site, so the browser warns that the domain name does not match. This is what happens if a criminal presents a genuine certificate for their own site.
4. Certificate 4 was not issued by a trusted CA (a self-signed certificate), so the browser cannot trust it.
:::

## Digital signatures

A digital signature shows who sent a message and that it was not changed.

1. The sender applies a **hash function** to the message to produce a short, fixed-size **digest**. Changing even one character gives a completely different digest.
2. The sender **encrypts the digest with their private key**. This is the digital signature, and it is sent with the message.
3. The receiver **decrypts the signature with the sender's public key** to recover the digest.
4. The receiver applies the same hash function to the message received and compares the two digests. If they are **equal**, the message is unchanged and was signed by the owner of that private key. If they differ, the message was changed or the signature is not genuine.

A CA signs a certificate in the same way, which is how the browser can verify it.

:::worked-solution{title="A digest changes when the message changes"}
Rudo sends the message `Pay 20 dollars to Rudo`. The first 8 hexadecimal digits of the SHA-256 digest are shown for two messages.

| Message | Digest (first 8 hex digits) |
|---|:-:|
| Pay 20 dollars to Rudo | 616578d3 |
| Pay 200 dollars to Rudo | 557b2115 |

1. The receiver gets `Pay 200 dollars to Rudo` but the signature decrypts to the digest `616578d3`.
2. The receiver computes the digest of the message received: `557b2115`.
3. The two digests are different, so the message was changed on the way. The receiver rejects it.
4. A change of one character gave a completely different digest, which is why the comparison is a reliable check.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (A Level, Paper 3). Learn the steps of the handshake in order, the contents of a certificate, the steps in obtaining one and in making and checking a digital signature. Questions are usually about description and reasons, not calculations.
:::

## Common mistakes

:::mistake{title="Saying that the whole session is encrypted with the public key"}
The public key is used only to send the session key safely. The data is encrypted with the faster symmetric session key.
:::

:::mistake{title="Encrypting the digest with the receiver's key"}
A signature uses the sender's private key. The receiver checks it with the sender's public key. Encrypting with the receiver's public key gives confidentiality, not a signature.
:::

:::mistake{title="Believing that a padlock means the site is safe"}
A certificate shows that the connection is encrypted and that the site belongs to the named owner. It does not prove that the owner is honest, so a criminal can also obtain a certificate for their own domain.
:::

:::mistake{title="Forgetting the check of the domain name"}
The browser must check that the name in the certificate matches the address of the site. Otherwise a valid certificate belonging to another site could be used.
:::

## Exam tips

:::exam-tip
"**Describe** how a secure session is set up using SSL/TLS": client request, server sends certificate, client checks certificate, client sends session key encrypted with the server's public key, server decrypts with its private key, symmetric encryption is used for the session. Give the steps in order.
:::

:::exam-tip
"**State** what a digital certificate contains": the owner's name or domain, the owner's public key, the issuing CA, the validity dates, a serial number and the CA's digital signature. Any four earn four marks.
:::

:::exam-tip
"**Explain** a browser warning": give one cause, such as an expired certificate, a domain that does not match, or a certificate from a CA that is not trusted, and say what it means for the user.
:::

## Summary

:::summary
- SSL/TLS gives an encrypted connection with confidentiality, integrity and authentication of the server; it is used for HTTPS in banking, mobile money, shopping, email and logins.
- The handshake: the client asks for a secure session, the server sends its certificate, the client checks it, the client sends a session key encrypted with the server's public key, the server decrypts it, and the session is encrypted with that key.
- A certificate holds the owner's name, public key, issuer, serial number, validity dates and the CA's signature; it is obtained by sending a signing request to a certificate authority, which checks identity and signs it.
- A digital signature is a digest of the message encrypted with the sender's private key; the receiver decrypts it with the public key and compares it with the digest of the message.
- A browser warns about an expired certificate, a domain name that does not match, a certificate from an untrusted authority or a revoked certificate.
:::
