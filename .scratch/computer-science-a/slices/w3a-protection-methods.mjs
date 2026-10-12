// Slice w3a: acs.security.protection-methods (both boards).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";
import { filter } from "../tables/w3a-protection-methods.mjs";

// Firewall rule set used in the questions (different from the lesson's)
const rulesQ = [
  { n: 1, action: "BLOCK", port: "any", from: "203.0.113." },
  { n: 2, action: "ALLOW", port: 443, from: "any" },
  { n: 3, action: "ALLOW", port: 25, from: "10.1.0." },
  { n: 4, action: "BLOCK", port: "any", from: "any" },
];
const pk = [["203.0.113.9", 443], ["52.1.1.1", 443], ["10.1.0.7", 25], ["52.1.1.1", 25], ["10.1.0.7", 443]];
const res = pk.map(([s, p]) => ({ s, p, ...filter(rulesQ, s, p) }));
same(res.map((r) => r.rule), [1, 2, 3, 4, 2]);
same(res.map((r) => r.action), ["BLOCK", "ALLOW", "ALLOW", "BLOCK", "ALLOW"]);
const rulesMdQ = mdTable(["Rule", "Action", "Destination port", "Source address"], rulesQ.map((r) => [r.n, r.action, r.port === "any" ? "any" : r.port, r.from === "any" ? "any" : `starts with ${r.from}`]));
const pktMd = mdTable(["Packet", "Source address", "Destination port"], pk.map(([s, p], i) => [i + 1, s, p]));
// Lock-out: 6-digit PIN, 5 attempts
const pLock = (5 / 10 ** 6) * 100;
chk(pLock, 0.0005, 1e-12);
// Lock-out: 4-digit PIN, 2 attempts allowed
const pLock2 = (2 / 10 ** 4) * 100;
chk(pLock2, 0.02, 1e-12);

concept("acs.security.protection-methods", { file: "security/protection-methods", keyPrefix: "security.protection-methods" }, (b) => {
  mc(b, 1, "RECALL", "What is authentication?",
    ["Proving that a user is who they claim to be before access is given", "Correct."],
    [["Making data unreadable to people who do not have a key", "That is encryption."], ["Making a second copy of the data", "That is a backup."], ["Checking that a typed value is sensible", "That is validation."]],
    "Authentication establishes identity.");
  mc(b, 2, "APPLICATION", "Which arrangement best follows the principle of least privilege in a school?",
    ["Learners can read the shared notes folder but cannot change it, and only teachers can edit the marks file", "Correct: each group has only the access it needs."],
    [["All staff and learners can edit every file on the network so that nobody is ever blocked from doing their work", "Everyone has more rights than they need."], ["Every teacher shares one administrator account", "A shared administrator account gives everyone full control and hides who did what."], ["Learners can edit the marks file but only on weekdays", "The rights are still more than learners need."]],
    "Give each user the minimum rights needed for their work.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which login uses two-factor authentication?",
    ["A password followed by a one-time code sent to the user's phone", "Correct: one thing known and one thing held."],
    [["A password followed by a second, different password", "Both are something the user knows."], ["A password followed by the name of the user's primary school and class", "Both are something the user knows."], ["A four-digit PIN only", "A single factor."]],
    "Two-factor authentication uses two different kinds of evidence.", { daily: true });
  mc(b, 2, "RECALL", "What is the main job of a firewall?",
    ["To check network traffic against rules and allow or block it", "Correct."],
    [["To find and delete viruses and spyware that are already on the hard disk", "That is the job of anti-virus software."], ["To make a copy of the data in case of loss", "That is a backup."], ["To stop the computer from overheating", "That is cooling, not security."]],
    "A firewall filters traffic between networks.");
  mc(b, 3, "UNDERSTANDING", "A teacher finds that a virus is already on a computer. Which software finds and removes it?",
    ["Anti-virus software", "Correct."],
    [["A firewall", "A firewall filters traffic and does not scan the files on the disk."], ["A backup program", "A backup copies data; it does not remove malware."], ["A password manager program", "A password manager stores passwords."]],
    "Anti-virus software scans for and removes malware.", { hints: ["Which tool looks inside files, not at network traffic?"] });
  mc(b, 3, "ANALYSIS", "What is a weakness of using a fingerprint as the only way to log in?",
    ["If the stored fingerprint data is copied, the user cannot change their fingerprint as they could change a password", "Correct."],
    [["Fingerprints can be forgotten", "A user cannot forget their fingerprint."], ["Fingerprints can be shared with a friend simply by telling the friend which finger to use", "A fingerprint cannot be told to someone."], ["Fingerprints are the same for all people", "Fingerprints are different for each person."]],
    "Biometric data cannot be reset.", { hints: ["What can you do about a stolen password that you cannot do about a stolen fingerprint?"] });
  mc(b, 3, "APPLICATION", "A firm keeps a weekly backup in a fireproof safe in a different town. What does the different location protect against?",
    ["A fire, flood or theft that destroys the office and the copy kept there", "Correct."],
    [["Malware that spreads across the network and infects every computer in the building", "A backup in another place does not stop malware spreading."], ["Employees forgetting their passwords", "A backup does not recover passwords."], ["Slow processing speed", "A backup has no effect on speed."]],
    "An off-site backup survives a disaster at the main site.", { hints: ["What can destroy both the computer and a copy kept next to it?"] });
  mc(b, 4, "EVALUATION", "A school locks every account for one hour after 3 wrong password attempts. Which is a drawback of this rule?",
    ["Someone can lock a genuine user out on purpose by typing wrong passwords for that account", "Correct: this can itself be used to disturb the service."],
    [["It makes brute-force guessing easier", "It makes guessing harder."], ["It stops the genuine user from changing the password after a lock has been applied to the account", "A lock-out has no effect on a later change of password by the administrator."], ["It lets the attacker see the password", "The password is not shown."]],
    "Lock-out slows guessing but can be abused to lock out genuine users.", { hints: ["Could someone else cause the lock?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A digital signature lets the receiver check who sent a message and that it was not changed on the way.", answer: true, explanation: "True. The sender signs with a private key and the receiver checks the signature with the public key." });
  b.match({ d: 3, skill: "UNDERSTANDING", stem: "Match each threat to the measure that mainly restricts it.", hints: ["Think about what each measure does."],
    pairs: [["Interception of data sent over a wireless network", "Encrypting the data"], ["Malware already installed on a laptop", "Anti-virus software"], ["Lost or stolen data", "A backup kept off-site"], ["Guessing of passwords", "Lock-out after wrong attempts and strong passwords"], ["Unwanted traffic from the internet", "A firewall"]],
    explanation: "Each measure restricts the threat it is matched with." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about a firewall.", hints: ["The first match decides."],
    template: "A firewall checks its rules in {{blank:a}} and the {{blank:b}} rule that matches decides the action. A final rule that blocks everything not listed is called a {{blank:c}} rule.",
    blanks: [
      { id: "a", accepted: ["order"], choices: ["order", "random order", "reverse only", "pairs"] },
      { id: "b", accepted: ["first"], choices: ["first", "last", "longest", "newest"] },
      { id: "c", accepted: ["deny all"], choices: ["deny all", "allow all", "backup", "encrypt"] },
    ], explanation: "Rules are applied in order; the first match decides; a final deny-all rule blocks what is not listed." });
  b.short({ d: 2, skill: "RECALL", stem: "Give the name of the principle that says each user should have only the access rights needed for their job.",
    accepted: ["least privilege", "principle of least privilege", "the principle of least privilege"], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: ["most privilege"],
    explanation: "The principle of least privilege." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "%", hints: ["Chance = attempts ÷ combinations.", "A 6-digit PIN has 10^6 combinations; convert the fraction to a percentage."],
    stem: "A 6-digit PIN is guessed at random. The account locks after 5 wrong attempts. Calculate the probability, as a percentage, that the attacker finds the PIN before the lock.",
    value: pLock, tol: 0.00001, wrong: [5, 0.5], workedSolution: "1. Combinations = 10^6 = 1,000,000.\n2. Probability = 5 ÷ 1,000,000 = 0.000005.\n3. As a percentage = 0.0005%.", explanation: "5 ÷ 1,000,000 × 100 = 0.0005%." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "%", hints: ["Two guesses out of 10,000 possible PINs."],
    stem: "A 4-digit PIN is guessed at random and the account locks after 2 wrong attempts. Calculate the probability, as a percentage, that the attacker finds the PIN.",
    value: pLock2, tol: 0.001, wrong: [2, 0.2], workedSolution: "1. Combinations = 10^4 = 10,000.\n2. Probability = 2 ÷ 10,000 = 0.0002.\n3. As a percentage = 0.02%.", explanation: "2 ÷ 10,000 × 100 = 0.02%." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Think of length, characters and what a user should avoid."],
    stem: "State three rules that a good password policy should contain. [3]",
    points: ["A minimum length for passwords", "A mix of upper-case and lower-case letters, digits and symbols, and no personal words", "A different password for each account, and lock-out after repeated wrong attempts"],
    modelAnswer: "A minimum length, a mix of upper-case and lower-case letters, digits and symbols with no personal words, and a different password for each account with lock-out after repeated wrong attempts.",
    explanation: "Any three sensible rules." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the two factors in your example."],
    stem: "Explain why two-factor authentication is more secure than a password alone. [3]",
    points: ["It needs two different kinds of evidence, for example a password and a code sent to a phone", "A person who steals or guesses the password still does not have the second factor", "The attacker would have to obtain both, which is much harder"],
    modelAnswer: "It needs two different kinds of evidence, such as a password and a code sent to the user's phone. Someone who steals or guesses the password still lacks the phone, so the attacker has to obtain both, which is much harder.",
    explanation: "Two kinds of evidence." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say where it sits and what it checks."],
    stem: "Describe how a firewall protects a school network. [3]",
    points: ["It sits between the school network and the internet", "It examines each incoming and outgoing packet against a set of rules (for example on ports and addresses)", "It blocks packets that do not match an allow rule, so unauthorised access and unwanted traffic are stopped"],
    modelAnswer: "It sits between the school network and the internet and examines each packet against a set of rules, such as the port and the address. It blocks packets that do not match an allow rule, which stops unauthorised access and unwanted traffic.",
    explanation: "Position, rules, blocking." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Give a strength and a weakness of each method."],
    stem: "A company is deciding between passwords and fingerprint scanners for logging in. Compare the two methods. [4]",
    points: ["Passwords are cheap and need no extra equipment", "Passwords can be guessed, shared or stolen, but can be changed if stolen", "A fingerprint cannot be forgotten, lost or shared easily", "A fingerprint scanner costs more, may reject a genuine user and cannot be changed if the data is copied"],
    modelAnswer: "Passwords are cheap and can be changed if stolen, but they can be guessed, shared or stolen. A fingerprint cannot be forgotten or easily shared, but the scanners cost more, may reject a genuine user and the fingerprint cannot be changed if its data is copied.",
    explanation: "Strengths and weaknesses of both." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Check the rules in order from rule 1; the first match decides."],
    explanation: `The results are ${res.map((r) => `${r.action} (rule ${r.rule})`).join(", ")}.`,
    stem: `A firewall at a company in Harare checks each packet against these rules. The first rule that matches decides the action.\n\n${rulesMdQ}\n\nFive packets arrive.\n\n${pktMd}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the number of the rule that decides what happens to packet 1.", accepted: ["1", "rule 1"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["2"], explanation: "Packet 1 comes from an address starting 203.0.113., so rule 1 matches first." }),
      P.short({ label: "(b)", marks: 1, stem: "State the action taken on packet 3 (ALLOW or BLOCK).", accepted: ["allow"], normalise: ["trim", "lowercase"], wrong: ["block"], explanation: "Packet 3 is from 10.1.0.7 to port 25, so rule 3 allows it." }),
      P.short({ label: "(c)", marks: 1, stem: "State the number of the rule that decides what happens to packet 4.", accepted: ["4", "rule 4"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["3"], explanation: "Packet 4 is from outside to port 25, so rules 1 to 3 do not match and rule 4 applies." }),
      P.num({ label: "(d)", marks: 2, stem: "How many of the five packets are allowed through?", value: res.filter((r) => r.action === "ALLOW").length, wrong: [2, 5], workedSolution: "1. Packet 1: BLOCK. 2: ALLOW. 3: ALLOW. 4: BLOCK. 5: ALLOW.\n2. Three are allowed.", explanation: "Packets 2, 3 and 5 are allowed." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain the purpose of rule 4 and what would happen to packet 4 if it were removed.", points: ["Rule 4 blocks every packet that no earlier rule allows (deny everything else)", "Without rule 4 no rule would match packet 4", "It would depend on the firewall's default, which may let unwanted traffic through, so the rule makes the safe choice explicit"], modelAnswer: "Rule 4 blocks every packet that no earlier rule allows. Without it no rule would match packet 4, so the result would depend on the firewall's default, which may let unwanted traffic through.", explanation: "Deny-all rule." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match each task to the vulnerability it removes."],
    explanation: "Each administration task removes a vulnerability: default password, over-wide rights, unpatched software.",
    stem: "A new administrator at a clinic in Hwange is asked to improve security. The router still uses the password supplied with it, all staff can edit the patient records, and the computers have not been updated for a year.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State what the administrator should do about the router.", points: ["Change the default password to a strong one", "Switch off any services on the router that are not needed"], modelAnswer: "Change the default password to a strong one and switch off any router services that are not needed.", explanation: "Secure configuration." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how access rights should be set for the patient records.", points: ["Create groups, for example nurses and receptionists, and give each group only the access its work needs", "Let only authorised staff edit the records, with the others able to read or have no access"], modelAnswer: "Create groups such as nurses and receptionists and give each only the access its work needs. Only authorised staff can edit the records; the others can read or have no access.", explanation: "Least privilege." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why updating the computers reduces the risk of malware.", points: ["Updates contain patches that fix known weaknesses in the software", "Malware often exploits those known weaknesses, so a patched computer cannot be attacked in the same way"], modelAnswer: "Updates contain patches that fix known weaknesses. Malware often exploits those weaknesses, so a patched computer cannot be attacked in the same way.", explanation: "Patches close vulnerabilities." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Probability = attempts ÷ combinations."],
    explanation: `With 2 attempts on 10,000 PINs the chance is 0.02%.`,
    stem: "A bank in Gweru allows only 2 wrong PIN attempts before a 4-digit PIN card is blocked.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many different 4-digit PINs are possible (0000 to 9999)?", value: 10000, wrong: [9999, 1000], workedSolution: "1. 10^4 = 10,000.", explanation: "10 choices for each of 4 digits." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the probability, as a percentage, that a thief who guesses at random finds the PIN in 2 attempts.", unit: "%", value: pLock2, tol: 0.001, wrong: [2, 0.2], workedSolution: "1. 2 ÷ 10,000 = 0.0002.\n2. = 0.02%.", explanation: "2 ÷ 10,000 × 100 = 0.02%." }),
      P.manual({ label: "(c)", marks: 1, stem: "State one other measure that the bank uses to protect a card holder at an ATM.", points: ["A card (something held) is needed as well as the PIN, which is two-factor authentication, or the card is blocked after wrong attempts, or the data is encrypted"], modelAnswer: "The card must also be present, so two kinds of evidence are needed.", explanation: "Any sensible measure." }),
    ] });
  b.card("DEFINITION", "Authentication", "Proving that a user, device or message is who or what it claims to be before access is given.");
  b.card("CONCEPT", "Least privilege", "Give each user only the access rights needed for their work, usually through groups.");
  b.card("CONCEPT", "Authentication factors", "Something you know (password), have (token or phone) and are (biometrics). Two-factor needs two different kinds.");
  b.card("CONCEPT", "Firewall", "Checks packets against rules, in order, and allows or blocks them; the first matching rule decides. A final rule can deny all else.");
  b.card("CONCEPT", "Anti-virus and anti-spyware", "Scan files and programs for known malware and suspicious behaviour, then remove or quarantine it; keep the definitions up to date.");
  b.card("CONCEPT", "Digital signature", "Signed with the sender's private key and checked with the public key; shows who sent it and that it was not altered.");
  b.card("CONCEPT", "Backup", "A separate copy of data, ideally off-site, used to restore data after loss, damage or an attack.");
  b.card("FORMULA", "Lock-out probability", "Chance of guessing = number of attempts allowed ÷ number of possible combinations.");
  b.card("FACT", "Secure configuration", "Change default passwords, switch off unused services, remove unused accounts and apply updates.");
});
