// Slice w2b: SSL/TLS, certificates and digital signatures (acs.security.ssl-tls-certificates, Cambridge only).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { digest, certCheck } from "../tables/w2b-ssl-tls-certificates.mjs";

const d1 = digest("Send the exam papers to Gweru");
const d2 = digest("Send the exam papers to Mutare");
same([d1, d2], ["c7d31d58", "f00d16e9"]);
const m1 = "Transfer 500 dollars to account 4471";
const m2 = "Transfer 500 dollars to account 4417";
const e1 = digest(m1), e2 = digest(m2);
if (e1 === e2) throw new Error("digests equal");
const trusted = ["Midlands Trust CA"];
const today = "2026-10-10";
const certs = [
  { n: 1, domain: "www.mutarefees.example", issuer: "Midlands Trust CA", notBefore: "2026-03-01", notAfter: "2027-03-01" },
  { n: 2, domain: "www.mutarefees.example", issuer: "Midlands Trust CA", notBefore: "2025-03-01", notAfter: "2026-03-01" },
  { n: 3, domain: "www.mutare-fees.example", issuer: "Midlands Trust CA", notBefore: "2026-03-01", notAfter: "2027-03-01" },
  { n: 4, domain: "www.mutarefees.example", issuer: "Unknown Issuer", notBefore: "2026-03-01", notAfter: "2027-03-01" },
];
const visited = "www.mutarefees.example";
const results = certs.map((c) => certCheck(c, visited, today, trusted));
same(results, [[], ["expired"], ["domain name does not match"], ["issuer not trusted"]]);
const certTable = mdTable(["Certificate", "Domain in the certificate", "Issuer", "Valid from", "Valid to"], certs.map((c) => [c.n, c.domain, c.issuer, c.notBefore, c.notAfter]));

concept("acs.security.ssl-tls-certificates", { file: "security/ssl-tls-certificates", keyPrefix: "security.ssl-tls-certificates" }, (b) => {
  mc(b, 1, "RECALL", "What is the main purpose of SSL/TLS?",
    ["To give an encrypted, authenticated connection between a client and a server", "Correct."],
    [["To make web pages load faster", "SSL/TLS adds work; speed is not its purpose."], ["To translate domain names into the IP addresses of the web servers it visits", "That is the purpose of DNS."], ["To block all incoming connections", "That is the role of a firewall."]],
    "SSL/TLS protects data in transit and authenticates the server.");
  mc(b, 2, "UNDERSTANDING", "Which key does the client use to encrypt the session key sent to the server?",
    ["The server's public key, taken from its certificate", "Correct: only the server's private key can decrypt it."],
    [["The server's private key, which the server keeps secret", "The client does not have the server's private key."], ["The client's private key", "The client's private key is not used to send a secret to the server."], ["The certificate authority's private key", "This key is used to sign certificates."]],
    "The session key is sent encrypted with the server's public key.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which item is NOT normally contained in a digital certificate?",
    ["The private key of the owner", "Correct: the private key must stay secret."],
    [["The owner's public key", "The public key is included."], ["The validity dates", "The dates are included."], ["The digital signature of the CA", "The signature is included."]],
    "A certificate holds the public key, never the private key.", { daily: true });
  mc(b, 2, "RECALL", "Which organisation issues a digital certificate?",
    ["A certificate authority", "Correct."],
    [["An internet service provider", "An ISP provides a connection, not certificates."], ["A web browser maker", "A browser holds the list of trusted CAs; it does not issue certificates."], ["A domain registrar only", "A registrar registers names; certificates are issued by CAs."]],
    "A CA checks the applicant and signs the certificate.");
  mc(b, 3, "APPLICATION", "A browser shows a warning that the certificate of a bank's web site has expired. What does this mean?",
    ["The current date is after the end of the certificate's validity period", "Correct."],
    [["The private key of the bank has been stolen", "An expired certificate does not mean the key was stolen."], ["The user typed the wrong password when logging in to the web site of the bank", "A password is not checked at this stage."], ["The bank's web server has been switched off", "The server answered by sending its certificate."]],
    "Certificates are valid only between two dates.", { hints: ["What is checked against today's date?"] });
  mc(b, 3, "UNDERSTANDING", "Why is the digest of a message encrypted with the sender's private key to make a digital signature?",
    ["Only the key's owner can produce it, but anyone can check it with the public key", "Correct."],
    [["So that the message cannot be read by anyone else", "Keeping the message secret is done with the receiver's public key."], ["So that the digest becomes longer", "The digest stays short."], ["So that the receiver does not need to know the sender's public key to check the signature", "The receiver needs the sender's public key to check the signature."]],
    "A signature proves the origin because only the owner has the private key.", { hints: ["Who holds the private key?"] });
  mc(b, 4, "EVALUATION", "A student argues: \"A web site with a padlock and a valid certificate must be honest.\" Which response is best?",
    ["It shows an encrypted connection with the named owner, not that the owner is honest", "Correct."],
    [["The student is right, because a CA only gives certificates to honest organisations", "A CA checks identity, not honesty."], ["The student is wrong, because a certificate never encrypts anything", "TLS does encrypt the connection."], ["The student is right, because the padlock shows that the web site contains no malware", "The padlock says nothing about the content of the pages."]],
    "A certificate proves identity and encryption, not good intentions.", { hints: ["What does a CA check?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "After the handshake, the data of the session is encrypted with a symmetric session key.", answer: true, explanation: "True. Asymmetric encryption is used only to share the key, since symmetric encryption is faster." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A digital signature is made by encrypting the message with the receiver's public key.", answer: false, explanation: "False. A signature is a digest of the message encrypted with the sender's private key." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Certificate authority", "A trusted organisation that issues and signs certificates"], ["Session key", "A symmetric key used to encrypt the data of one session"], ["Digest", "A short fixed-size value produced from a message by a hash function"], ["Digital signature", "A digest encrypted with the sender's private key"], ["Certificate signing request", "A request to a CA containing the applicant's public key and identity"]],
    explanation: "Vocabulary of secure sessions and certificates." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the steps of checking a digital signature.",
    template: "The receiver decrypts the signature with the sender's {{blank:a}} key to recover the digest. The receiver then applies the same {{blank:b}} function to the message received. If the two digests are {{blank:c}}, the message is unchanged.",
    blanks: [
      { id: "a", accepted: ["public"], choices: ["public", "private", "session", "secret"] },
      { id: "b", accepted: ["hash"], choices: ["hash", "sorting", "routing", "compression"] },
      { id: "c", accepted: ["equal"], choices: ["equal", "different", "longer", "encrypted"] },
    ], hints: ["Which key can anyone use to check a signature?"], explanation: "Public key, hash function, equal digests." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Compare the date, the domain, the issuer and the dates in each row."],
    stem: `A browser trusts only Midlands Trust CA. It visits ${visited} on 10 October 2026 and receives these certificates.\n\n${certTable}\n\nChoose the result for each certificate.`,
    template: "Certificate 1: {{blank:c1}}\n\nCertificate 2: {{blank:c2}}\n\nCertificate 3: {{blank:c3}}\n\nCertificate 4: {{blank:c4}}",
    blanks: [
      { id: "c1", accepted: ["accepted"], choices: ["accepted", "expired", "domain does not match", "issuer not trusted"] },
      { id: "c2", accepted: ["expired"], choices: ["accepted", "expired", "domain does not match", "issuer not trusted"] },
      { id: "c3", accepted: ["domain does not match"], choices: ["accepted", "expired", "domain does not match", "issuer not trusted"] },
      { id: "c4", accepted: ["issuer not trusted"], choices: ["accepted", "expired", "domain does not match", "issuer not trusted"] },
    ], wrong: [["expired", "accepted", "issuer not trusted", "domain does not match"]],
    explanation: "Certificate 1 passes all checks; 2 ended on 1 March 2026; 3 names a different domain; 4 was issued by an authority that is not trusted." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Which key can only the server use?"], normalise: ["trim", "lowercase", "collapse_whitespace"],
    stem: "In the SSL/TLS handshake, which key does the server use to decrypt the session key that the client has sent?",
    accepted: ["its private key", "private key", "the server's private key", "server's private key", "the private key", "servers private key"], wrong: ["public key"],
    explanation: "The client encrypted the session key with the server's public key, so only the server's private key can decrypt it." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Compare the digests."], normalise: ["trim", "lowercase", "collapse_whitespace"],
    stem: `A bank clerk signs the message "${m1}". The first 8 hex digits of its digest are ${e1}. The message that arrives reads "${m2}", and its digest is ${e2}. Has the message been changed? Answer yes or no.`,
    accepted: ["yes"], wrong: ["no"], explanation: `The digest of the received message (${e2}) is different from the signed digest (${e1}), so the message was changed.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 5, hints: ["Five steps in order."],
    stem: "Describe how a client and a server set up a secure session using SSL/TLS. [5]",
    points: ["The client asks for a secure connection and the server replies, sending its digital certificate", "The client checks the certificate (trusted CA, valid dates, matching domain name)", "The client creates a session key and encrypts it with the server's public key", "The server decrypts the session key using its private key", "Both then encrypt the data of the session with the session key (symmetric encryption)"],
    modelAnswer: "The client asks for a secure connection and the server sends its digital certificate. The client checks the certificate: a trusted CA, valid dates and a matching domain name. It then creates a session key and encrypts it with the server's public key. The server decrypts it with its private key. Both then encrypt the data with the session key.",
    explanation: "Request and certificate, check, session key, decrypt, symmetric encryption." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four items."],
    stem: "State four items of information contained in a digital certificate. [4]",
    points: ["The name (domain name) of the owner", "The owner's public key", "The name of the certificate authority that issued it", "The validity dates / serial number / the digital signature of the CA"],
    modelAnswer: "The domain name of the owner, the owner's public key, the name of the certificate authority, and the dates between which it is valid.",
    explanation: "Any four of: owner, public key, issuer, dates, serial number, signature." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Sender steps and receiver steps."],
    stem: "Describe how a digital signature is produced and checked. [4]",
    points: ["The sender applies a hash function to the message to make a digest", "The sender encrypts the digest with their private key; this is the signature, sent with the message", "The receiver decrypts the signature with the sender's public key to get the digest", "The receiver hashes the message received and compares: if the digests match the message is unchanged and from the sender"],
    modelAnswer: "The sender hashes the message to make a digest and encrypts the digest with their private key; this is the signature, sent with the message. The receiver decrypts the signature with the sender's public key and hashes the message received. If the two digests match, the message is unchanged and came from the sender.",
    explanation: "Hash, sign, decrypt, compare." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Think of the checks made by the browser."],
    stem: "Give three reasons why a browser might warn a user about a certificate. [3]",
    points: ["The certificate has expired (or is not yet valid)", "The domain name in the certificate does not match the address visited", "The certificate was not issued by a trusted certificate authority (or it has been revoked)"],
    modelAnswer: "The certificate may have expired, the domain name in it may not match the site visited, or it may not have been issued by a trusted certificate authority.",
    explanation: "Dates, domain, issuer." });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Use the browser's checks: issuer, dates and domain."],
    explanation: "The browser checks the issuer, the dates and the domain, then sends a session key encrypted with the server's public key.",
    stem: `A parent in Mutare opens the school fees page at ${visited} on 10 October 2026. The browser trusts only Midlands Trust CA. The server presents the certificate below.\n\n${certTable.split("\n").slice(0, 3).join("\n")}`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "State three checks that the browser makes on the certificate before using it.", points: ["That it was signed by a trusted certificate authority", "That the current date is within its validity dates", "That the domain name in the certificate matches the address of the site"], modelAnswer: "That it was signed by a trusted CA, that the date is within its validity period, and that the domain name matches the address.", explanation: "Issuer, dates, domain." }),
      pm("(b)", "The browser accepts the certificate. What does it do next?", ["It creates a session key and encrypts it with the server's public key", "Correct."], [["It sends the user's password to the server", "No password is sent at this stage."], ["It decrypts the certificate with the server's private key before sending it", "The client does not have the server's private key."], ["It asks the CA to create a new certificate", "The CA is not contacted at each visit."]], "The client sends a session key encrypted with the server's public key."),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the data of the session is encrypted with a session key and not with the server's public key.", points: ["Symmetric encryption with a session key is much faster than asymmetric encryption", "Asymmetric encryption is slow for large amounts of data, so it is used only to share the key"], modelAnswer: "Symmetric encryption with a session key is much faster than asymmetric encryption, which is too slow for large amounts of data and so is used only to share the key.", explanation: "Speed." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Which key signs and which key checks?"],
    explanation: "The message is signed with the sender's private key and checked with the sender's public key; unequal digests mean it was changed.",
    stem: `The education office in Harare sends a digitally signed message to a school: "Send the exam papers to Gweru". The first 8 hex digits of the digest of this message are ${d1}. A criminal changes the word Gweru to Mutare before the school receives it.`,
    parts: [
      pm("(a)", "Which key does the education office use to make the signature?", ["Its private key", "Correct."], [["Its public key", "Anyone has the public key, so it would prove nothing."], ["The school's public key", "That would give confidentiality, not a signature."], ["The school's private key", "The education office does not have this key."]], "Signed with the sender's private key."),
      P.short({ label: "(b)", marks: 1, stem: `The school computes the digest of the message it received and gets ${d2}. Are the two digests equal? Answer yes or no.`, accepted: ["no"], normalise: ["trim", "lowercase"], wrong: ["yes"], explanation: `${d2} is not the same as ${d1}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State what the school should conclude and give a reason.", points: ["The message has been changed (it should not be trusted)", "The digest of the received message is different from the digest in the signature"], modelAnswer: "The message has been changed on the way, because the digest of the received message is different from the one in the signature.", explanation: "Unequal digests." }),
    ] });
  b.card("DEFINITION", "SSL/TLS", "Protocols that give an encrypted, authenticated connection between client and server; used by HTTPS.");
  b.card("CONCEPT", "TLS handshake", "Client asks; server sends certificate; client checks it; client sends session key encrypted with the server's public key; server decrypts with its private key; session uses symmetric encryption.");
  b.card("DEFINITION", "Digital certificate", "Links a public key to its owner's identity; issued and signed by a certificate authority.");
  b.card("FACT", "Contents of a certificate", "Owner's name or domain, public key, issuing CA, serial number, validity dates, CA's digital signature.");
  b.card("DEFINITION", "Certificate authority", "A trusted organisation that checks identity and issues signed certificates.");
  b.card("CONCEPT", "Digital signature", "A digest of the message encrypted with the sender's private key; checked with the sender's public key by comparing digests.");
  b.card("CONCEPT", "Browser certificate warnings", "Expired or not yet valid; domain name does not match; issuer not trusted (including self-signed); revoked.");
  b.card("CONCEPT", "Why a session key", "Symmetric encryption is much faster than asymmetric, so the public key only protects the session key.");
});
