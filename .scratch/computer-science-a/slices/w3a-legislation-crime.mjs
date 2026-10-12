// Slice w3a: acs.security.legislation-crime (ZIMSEC only, Form 5). Descriptive: scenarios marked against points.
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const installed = 52;
const licensed = 40;
const copies = installed - licensed;
chk(copies, 12);
const price = 18;
const cost = copies * price;
chk(cost, 216);
const inst2 = 46;
const lic2 = 38;
const price2 = 22;
const copies2 = inst2 - lic2;
const cost2 = copies2 * price2;
chk(cost2, 176);
const lab = 28;
const licencesLab = 25;
chk(lab - licencesLab, 3);

concept("acs.security.legislation-crime", { file: "security/legislation-crime", keyPrefix: "security.legislation-crime" }, (b) => {
  mc(b, 1, "RECALL", "What is computer crime?",
    ["An illegal act that uses a computer or network, or that is aimed at a computer system or its data", "Correct."],
    [["Any fault that stops a computer from working", "A fault is not necessarily illegal or deliberate."], ["Any use of a computer that a teacher or parent dislikes, even when it breaks no law", "A crime must be against the law."], ["Using a computer to write a long document", "This is a normal and lawful use."]],
    "Computer crime is illegal activity involving computers.");
  mc(b, 2, "APPLICATION", "A man uses another person's identity number and photograph to open a mobile-money account in that person's name. What is this crime?",
    ["Identity theft", "Correct: he is using the other person's details without permission."],
    [["Software piracy", "No software has been copied."], ["A denial of service", "No service has been flooded with requests."], ["Cyberbullying", "No one is being harassed through messages."]],
    "Using another person's personal details without permission is identity theft.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which control measure most directly reduces software piracy in a school?",
    ["Keeping a register of licences and checking the installed software each term", "Correct."],
    [["Making all passwords longer", "Passwords control access but do not show how many copies are installed."], ["Buying a faster printer", "A printer has no effect on piracy."], ["Switching off all the computers in the laboratory every night to save electricity", "This does not affect licensing."]],
    "Audits compare installed copies with licences.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is one purpose of legislation about computer crime?",
    ["To define which acts are offences and to set penalties that discourage them", "Correct."],
    [["To stop all computers in the country from connecting to the internet at night", "Laws do not remove the internet."], ["To make every program free to copy", "Copyright law protects owners of software."], ["To decide which computers a school must buy", "Equipment choices are not the purpose of crime law."]],
    "Laws define offences and deter criminals.", { daily: true });
  mc(b, 3, "ANALYSIS", "An employee copies a company's customer list to a memory stick and sells it to a competitor. Which pair gives the crime and a suitable control?",
    ["Data theft; restrict the use of memory sticks and keep logs of who copies files", "Correct."],
    [["Software piracy; install a larger hard disk and a faster processor in the server", "No software is being copied, and a bigger disk is not a control."], ["Cyberbullying; block social media", "No one is being harassed."], ["Pharming; change the router password", "Nobody has been redirected to a fake site."]],
    "Copying confidential data is data theft; logs and restrictions on copying are controls.", { hints: ["What was taken, and how could the copying be limited or detected?"] });
  mc(b, 3, "ANALYSIS", "Which of these is NOT a computer crime?",
    ["A learner plays a legal game on the school network during the break, as the school rules allow", "Correct: it is lawful and permitted."],
    [["A learner guesses a teacher's password to look at examination papers", "This is unauthorised access."], ["A learner sells copies of a program that the maker has not allowed to be copied", "This is software piracy."], ["A learner sends threatening messages to a classmate every night", "This is harassment, a form of cyberbullying."]],
    "A crime must break the law; playing a permitted game does not.", { hints: ["Which one breaks no law or rule?"] });
  mc(b, 3, "UNDERSTANDING", "What is the role of an ICT regulator such as POTRAZ?",
    ["To license telecommunications operators and enforce the rules they must follow", "Correct."],
    [["To write programs for schools", "A regulator does not write programs."], ["To sell mobile phones to the public", "A regulator does not trade."], ["To repair and maintain the computers of all government offices and public schools", "Repairs are not the role of a regulator."]],
    "A regulator licenses and supervises operators.", { hints: ["Is the regulator a business or a supervisor?"] });
  mc(b, 4, "EVALUATION", "A school has a cyberbullying problem. Which response is most likely to be effective?",
    ["A clear policy with consequences, a way to report and block, and support for victims", "Correct: it prevents, detects and limits the harm."],
    [["Banning every learner from using computers for a year", "This is excessive and does not deal with bullying done outside school."], ["Asking every victim to ignore the messages, say nothing and leave the group chat for good", "Silence leaves the bullying unreported."], ["Buying faster internet", "Speed has no effect on bullying."]],
    "An effective response combines policy, reporting and support.", { hints: ["Which answer combines rules, reporting and help?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Installing a program on more computers than the licence allows is software piracy, even if the school did not intend to break the law.", answer: true, explanation: "True. Using software outside its licence is piracy whether or not it was intended." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each crime to its description.",
    pairs: [["Unauthorised access", "Using a system or account without the owner's permission"], ["Software piracy", "Copying or using software without the licence the owner requires"], ["Identity theft", "Using another person's personal details without permission"], ["Cyberbullying", "Using messages or social media to threaten or humiliate someone"], ["Data theft", "Copying confidential data, for example by an insider"]],
    explanation: "Each crime has its own meaning." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about control measures.", hints: ["Some measures stop the crime, some find it and some reduce the harm."],
    template: "A strong password is a {{blank:a}} measure because it makes the crime harder. A log of who changed a record is a {{blank:b}} measure. Encrypting stolen data so that it cannot be read {{blank:c}} the harm.",
    blanks: [
      { id: "a", accepted: ["preventive"], choices: ["preventive", "detective", "corrective", "legal"] },
      { id: "b", accepted: ["detective"], choices: ["detective", "preventive", "illegal", "physical"] },
      { id: "c", accepted: ["limits"], choices: ["limits", "removes all", "increases", "creates"] },
    ], explanation: "Preventive, detective and harm-limiting measures." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the crime of copying or using software without the licence required by its owner.",
    accepted: ["software piracy", "piracy", "pirating software"], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: ["hacking"], explanation: "Software piracy." });
  b.num({ d: 2, skill: "APPLICATION", hints: ["Installed minus licensed."],
    stem: `A computer laboratory has ${licencesLab} licences for a program, but the program is installed on ${lab} computers. How many copies are unlicensed?`,
    value: lab - licencesLab, wrong: [lab, licencesLab], workedSolution: `1. ${lab} − ${licencesLab} = ${lab - licencesLab}.`, explanation: `${lab} − ${licencesLab} = ${lab - licencesLab} unlicensed copies.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["First find the unlicensed copies, then multiply by the price of a licence."],
    stem: `A school finds its software installed on ${installed} computers when it holds ${licensed} licences. Each extra licence costs US\\$${price}. Calculate the cost of buying licences for all the unlicensed copies.`,
    value: cost, wrong: [copies, installed * price], workedSolution: `1. Unlicensed copies = ${installed} − ${licensed} = ${copies}.\n2. Cost = ${copies} × ${price} = US\\$${cost}.`, explanation: `${copies} × US\\$${price} = US\\$${cost}.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Name the crime and a control for each of two crimes."],
    stem: "Describe two types of computer crime and give one control measure for each. [4]",
    points: ["Crime 1 named and described, for example unauthorised access: using a system without permission", "A matching control, for example strong passwords with lock-out or two-factor authentication", "Crime 2 named and described, for example identity theft: using someone else's details without permission", "A matching control, for example never sharing PINs and encrypting personal data"],
    modelAnswer: "Unauthorised access is using a system without permission; strong passwords with lock-out or two-factor authentication reduce it. Identity theft is using someone else's personal details without permission; not sharing PINs and encrypting personal data reduce it.",
    explanation: "Two crimes with matching controls." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give developed reasons, not just one word each."],
    stem: "Explain two reasons why a country needs laws on computer security and computer crime. [4]",
    points: ["Laws define which acts are offences and set penalties, which deters criminals", "Explanation: without a clear law it may be unclear whether an act such as guessing a password is a crime", "Laws protect individuals and businesses, for example by controlling how personal data is used", "Explanation: victims have rights and a way to seek action, and computer crime crosses borders so laws help cooperation"],
    modelAnswer: "Laws define which acts are offences and set penalties that deter criminals, because without a clear law it may be unclear whether guessing a password is a crime. Laws also protect individuals and businesses, for example by controlling how personal data is used, and give victims a way to seek action.",
    explanation: "Two developed reasons." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Name the crime first."],
    stem: "A learner copies a teacher's password from a notice board and uses it to read the examination papers. Name the crime and describe two measures to prevent it from happening again. [3]",
    points: ["Unauthorised access (hacking)", "Passwords must not be written down or must be changed and be strong, or use two-factor authentication", "Access rights so that learners cannot open the examination folder, or logs to detect misuse"],
    modelAnswer: "Unauthorised access. Passwords should never be written on a notice board, and two-factor authentication should be used; access rights should stop learners from opening the examination folder.",
    explanation: "Crime and two measures." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Think about whether technology alone is enough."],
    stem: "A school says: \"Firewalls and passwords are all we need to control computer crime.\" Evaluate this statement. [4]",
    points: ["Firewalls and passwords prevent some crimes such as unauthorised access", "They do not stop crimes by insiders who already have a password, such as data theft", "Crimes such as cyberbullying and piracy need policies, discipline, training and reporting", "Laws and regulators deter criminals and give victims a way to act, so technology alone is not enough"],
    modelAnswer: "Firewalls and passwords prevent some unauthorised access but do not stop insiders who already have a password. Crimes such as cyberbullying and piracy need policies, training and discipline, and laws deter criminals and help victims, so technology alone is not enough.",
    explanation: "Technology is only part of the answer." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Name the crime from the description."],
    explanation: "Scenario 1 is unauthorised access, 2 is software piracy and 3 is cyberbullying.",
    stem: "Three incidents are reported at a school in Gweru. (1) A learner guesses the password of the administrator account and looks at the staff pay file. (2) A learner sells copies of a paid program to other learners. (3) A learner posts insulting pictures of a classmate on a social media group.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the crime in incident 1.", accepted: ["unauthorised access", "unauthorized access", "hacking"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["piracy"], explanation: "Using an account without permission is unauthorised access." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the crime in incident 2.", accepted: ["software piracy", "piracy"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["hacking"], explanation: "Copying and selling software without permission is piracy." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the crime in incident 3.", accepted: ["cyberbullying", "cyber bullying", "harassment"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["fraud"], explanation: "Humiliating a classmate through social media is cyberbullying." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe three control measures the school could introduce, one for each incident.", points: ["Incident 1: strong, secret passwords, lock-out or two-factor authentication, and rights that stop learners opening the pay file", "Incident 2: a rule against copying software, licence checks and audits, and teaching learners about copyright", "Incident 3: an acceptable-use policy with discipline, a way to report and block, and support for the victim"], modelAnswer: "For incident 1, use strong passwords with lock-out and access rights so that learners cannot open the pay file. For incident 2, forbid copying, audit installed software and teach copyright. For incident 3, introduce a policy with discipline, a way to report and support for the victim.", explanation: "A control for each incident." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Installed minus licensed, then multiply."],
    explanation: `There are ${copies2} unlicensed copies, which cost US\\$${cost2} to license.`,
    stem: `An audit at a college in Bulawayo finds a design program installed on ${inst2} computers. The college holds ${lic2} licences, and a new licence costs US\\$${price2}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of unlicensed copies.", value: copies2, wrong: [inst2, lic2], workedSolution: `1. ${inst2} − ${lic2} = ${copies2}.`, explanation: `${copies2} copies.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the cost of buying licences for them.", unit: "US$", value: cost2, wrong: [copies2, inst2 * price2], workedSolution: `1. ${copies2} × ${price2} = US\\$${cost2}.`, explanation: `${copies2} × ${price2} = ${cost2}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two things that the college could do other than buying licences for all the computers.", points: ["Remove the program from the computers that do not need it", "Use free or open-source software that is allowed to be copied for the same job"], modelAnswer: "Remove the program from computers that do not need it, or use free or open-source software that may be copied for the same job.", explanation: "Alternatives to buying more licences." }),
    ] });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Give a prevention and a detection measure for each."],
    explanation: "Data theft is controlled by restricting copying and logging; fraud by dual authorisation and audit trails.",
    stem: "A small finance company in Harare has two problems. A clerk copied the customer file to a memory stick and sold it. Another clerk changed the amount of a payment so that part of it was paid into his own account.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Name the crime in each case.", points: ["Copying and selling the customer file: data theft", "Changing the payment to take money: fraud"], modelAnswer: "Data theft for the customer file, and fraud for the changed payment.", explanation: "Data theft and fraud." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe three measures the company could use to control these crimes.", points: ["Restrict the use of memory sticks and set access rights so that clerks can open only the files they need", "Keep a log of who opens, copies or changes records so that misuse is detected", "Require a second person to approve payments (separation of duties) and carry out regular audits"], modelAnswer: "Restrict memory sticks and set access rights so that clerks open only the files they need; keep a log of who opens, copies or changes records; and require a second person to approve payments with regular audits.", explanation: "Prevent and detect." }),
      P.manual({ label: "(c)", marks: 1, stem: "State one way in which the law helps the company.", points: ["It sets penalties for offences, which deters staff, and lets the company report the crime so that it can be punished"], modelAnswer: "It sets penalties for the offences, which deters staff and lets the company report the crime.", explanation: "Deterrence and redress." }),
    ] });
  b.card("DEFINITION", "Computer crime", "An illegal act that uses a computer or network, or that is aimed at a computer system or its data.");
  b.card("CONCEPT", "Types of computer crime", "Unauthorised access, fraud, identity theft, software piracy, cyberbullying, distribution of illegal material and data theft.");
  b.card("CONCEPT", "Controls: prevent, detect, limit", "Prevent (passwords, licences), detect (logs, audits, scans) and limit the harm (encryption, backups); laws and policies also help.");
  b.card("CONCEPT", "Purpose of computer crime laws", "Define offences, deter criminals, protect people and businesses, give victims a way to act and allow cooperation across borders.");
  b.card("FACT", "Frameworks in Zimbabwe (outline)", "Cyber and Data Protection Act, the criminal law, and the Copyright and Neighbouring Rights Act; ICT regulators such as POTRAZ license telecommunications operators.");
  b.card("DEFINITION", "Software piracy", "Copying, sharing or using software without the permission or the licence required by the copyright owner.");
  b.card("DEFINITION", "Identity theft", "Using another person's personal details without permission, usually to gain money or services.");
  b.card("CONCEPT", "Data theft by insiders", "Staff copy confidential data; controls are access rights, limits on copying, encryption and access logs.");
});
