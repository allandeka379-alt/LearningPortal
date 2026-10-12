// W3a exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on security, ethics and enterprising.
import { concept, P, EXAM, checkExam, CAM, ZIM, chk, same, mod11CheckDigit, checksum8, mdTable } from "../lib.mjs";
import { pm } from "../tables/w3a-q.mjs";
import { filter } from "../tables/w3a-protection-methods.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;
const D = "US\\$";

concept(C("security.threats-vulnerabilities"), { file: "exam/w3a-theory", keyPrefix: "exam.w3a-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Threats and protection (both)
  {
    const rules = [
      { n: 1, action: "ALLOW", port: 443, from: "any" },
      { n: 2, action: "ALLOW", port: 25, from: "10.2.0." },
      { n: 3, action: "BLOCK", port: "any", from: "any" },
    ];
    const r1 = filter(rules, "10.2.0.5", 25);
    const r2 = filter(rules, "77.1.1.1", 25);
    same([r1.action, r1.rule, r2.action, r2.rule], ["ALLOW", 2, "BLOCK", 3]);
    chk(10 ** 5, 100000);
    const rulesMd = mdTable(["Rule", "Action", "Destination port", "Source address"], rules.map((r) => [r.n, r.action, r.port === "any" ? "any" : r.port, r.from === "any" ? "any" : `starts with ${r.from}`]));
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("security.threats-vulnerabilities"), C("security.protection-methods")],
      stem: `A clinic in Hwange has five computers on one network that hold patient records. A nurse receives an email that looks as if it comes from the Ministry of Health and asks her to type her password on a web page. The clinic's firewall checks each packet against these rules, in order, and the first rule that matches decides.\n\n${rulesMd}`,
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "What is the attack in the email called?", ["Phishing", "Correct: a fake message that tricks the user into giving away details."], [["Pharming", "Pharming redirects a user who types a correct address."], ["A denial of service", "A denial of service floods a server with requests."], ["A worm", "A worm copies itself across a network."]], "A fake message asking for a password is phishing."),
        P.num({ label: "(b)", marks: 2, stem: "The door to the records room opens with a 5-digit code (each digit 0 to 9). Calculate the number of different codes that are possible.", value: 100000, wrong: [50, 99999], workedSolution: "1. 10 choices for each of 5 digits.\n2. 10^5 = 100,000.", explanation: "10^5 = 100,000 codes." }),
        P.fib({ label: "(c)", marks: 2, stem: "Use the firewall rules to state the action on each packet.",
          template: "A packet from 10.2.0.5 to port 25: {{blank:a}}.\n\nA packet from 77.1.1.1 to port 25: {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["ALLOW"], choices: ["ALLOW", "BLOCK"] },
            { id: "b", accepted: ["BLOCK"], choices: ["BLOCK", "ALLOW"] },
          ], explanation: "The first packet matches rule 2 (ALLOW); the second matches no rule except rule 3 (BLOCK)." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain how two-factor authentication would protect the nurse's account if her password were stolen.", points: ["It needs a second, different kind of evidence, such as a code sent to her phone", "The thief has the password but not the phone, so cannot log in"], modelAnswer: "It needs a second kind of evidence, such as a code sent to her phone, and the thief has the password but not the phone, so cannot log in.", explanation: "Two different factors." }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe three measures that would reduce the risk of malware on the clinic's computers.", points: ["Install anti-virus software and keep it up to date", "Apply software updates (patches) that close known weaknesses", "Train staff not to open unknown attachments or links, and keep backups of the records"], modelAnswer: "Install anti-virus software and keep it up to date, apply updates that close known weaknesses, and train staff not to open unknown attachments, with backups of the records.", explanation: "Any three measures." }),
      ]),
      hints: ["The first rule that matches decides.", "Combinations = 10^5."],
      explanation: "Phishing; 100,000 codes; ALLOW then BLOCK; two-factor; malware measures.",
    });
  }
  // ------------------------------------------------------------------ 2. Validation and verification with test data (CAM)
  {
    const cd = mod11CheckDigit("2914", [6, 5, 4, 3]);
    same(cd, { sum: 73, remainder: 7, check: "4" });
    const tot = (s) => s.split("").reduce((a, d, i) => a + Number(d) * [6, 5, 4, 3, 1][i], 0);
    chk(tot("29144"), 77);
    chk(tot("29414"), 80);
    chk(tot("29414") % 11, 3);
    b.struct({
      ...TH10, d: 3, paper: "Cambridge Paper 1", applies: CAM,
      concepts: [C("security.validation-verification")],
      stem: "A school in Mutare gives every learner a five-digit number. The first four digits identify the learner and the fifth is a modulus 11 check digit. The weights from the left for the first four digits are 6, 5, 4 and 3, and the check digit has weight 1. The school also enters learners' marks, which must be whole numbers from 0 to 100.",
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which validation check ensures that the learner number field is not left empty?", ["Presence check", "Correct."], [["Range check", "A range check tests that a value lies between limits."], ["Check digit", "A check digit is calculated from the other digits."], ["Parity check", "A parity check is used on binary data."]], "A presence check tests that a required field has a value."),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the check digit for the learner number 2914.", value: Number(cd.check), wrong: [cd.remainder, 73], workedSolution: `1. 2×6 + 9×5 + 1×4 + 4×3 = 12 + 45 + 4 + 12 = ${cd.sum}.\n2. ${cd.sum} ÷ 11 = 6 remainder ${cd.remainder}.\n3. Check digit = 11 − ${cd.remainder} = ${cd.check}.`, explanation: `The weighted sum is ${cd.sum}, so the check digit is 11 − ${cd.remainder} = ${cd.check}.` }),
        P.num({ label: "(c)", marks: 2, stem: "A clerk types the number 29414. Calculate its weighted total using the weights 6, 5, 4, 3 and 1. The number is valid only if the total is a multiple of 11.", value: tot("29414"), wrong: [77, 29414], workedSolution: `1. 2×6 + 9×5 + 4×4 + 1×3 + 4×1 = 12 + 45 + 16 + 3 + 4 = ${tot("29414")}.\n2. ${tot("29414")} ÷ 11 leaves remainder 3, so the number is rejected.`, explanation: `The total is ${tot("29414")}, not a multiple of 11, so the number is rejected.` }),
        P.fib({ label: "(d)", marks: 3, stem: "State the type of test data for each mark that is used to test the mark validation.",
          template: "A mark of 56: {{blank:a}} data.\n\nA mark of 0: {{blank:b}} data.\n\nA mark of 101: {{blank:c}} data.",
          blanks: [
            { id: "a", accepted: ["normal"], choices: ["normal", "extreme", "abnormal"] },
            { id: "b", accepted: ["extreme"], choices: ["extreme", "normal", "abnormal"] },
            { id: "c", accepted: ["abnormal"], choices: ["abnormal", "normal", "extreme"] },
          ], explanation: "56 is normal, 0 is on the boundary (extreme), 101 is invalid (abnormal)." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why validation alone cannot make sure that a mark of 56 typed for a learner who scored 65 is found.", points: ["56 is a valid mark within the range, so it passes every validation check", "Only verification, such as double entry or a visual check against the source, can detect that it is not the true mark"], modelAnswer: "56 is a valid mark within the range, so it passes every validation check. Only verification, such as double entry or a visual check against the source, can show it is not the true mark.", explanation: "Validation checks reasonableness only." }),
      ]),
      hints: ["Weights 6, 5, 4, 3 for the four digits.", "Check digit = 11 minus the remainder."],
      explanation: "Presence check; check digit 4; weighted total 80 (rejected); normal, extreme, abnormal; validation versus verification.",
    });
  }
  // ------------------------------------------------------------------ 3. Risk, recovery and legislation (ZIM)
  {
    chk(3 * 5, 15);
    const storage = 2 * 25 + 2 * 6 * 2;
    chk(storage, 74);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC Paper 1", applies: ZIM,
      concepts: [C("security.risk-recovery-policies"), C("security.legislation-crime")],
      stem: "A technical college in Gweru keeps student records and staff payroll on one server. A risk analysis scores each risk as likelihood × impact, each on a scale of 1 to 5. The college makes a full backup of 25 GB every Sunday and an incremental backup of 2 GB on each of the other six days, and keeps two weeks of backups. Last month a technician used the password of a former colleague to read the payroll file.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, stem: "The risk of theft of the server has a likelihood of 3 and an impact of 5. Calculate its risk score.", value: 15, wrong: [8, 5], workedSolution: "1. Score = 3 × 5 = 15.", explanation: "3 × 5 = 15." }),
        P.short({ label: "(b)", marks: 1, stem: "The college buys insurance to cover the cost of replacing a stolen server. Name this risk management technique.", accepted: ["transfer", "risk transfer", "transferring the risk"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["avoid"], explanation: "Insurance transfers the financial loss to the insurer." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the total storage in GB needed for the two weeks of backups.", value: storage, wrong: [50, 62], workedSolution: `1. Full backups: 2 × 25 = 50 GB.\n2. Incremental backups: 2 weeks × 6 days × 2 GB = 24 GB.\n3. Total = 50 + 24 = ${storage} GB.`, explanation: `50 + 24 = ${storage} GB.` }),
        pm("(d)", "What computer crime did the technician commit by using the password of a former colleague?", ["Unauthorised access", "Correct: he used an account without permission."], [["Software piracy", "No software was copied."], ["Cyberbullying", "Nobody was harassed."], ["Identity theft for money only", "The main offence was access without permission, not stealing an identity to gain money."]], "Using an account without permission is unauthorised access."),
        P.manual({ label: "(e)", marks: 2, stem: "Describe two parts of a disaster recovery plan for the college.", points: ["A backup schedule with copies kept off-site or in the cloud", "A tested restore procedure, with an alternative site or equipment and named people responsible"], modelAnswer: "A backup schedule with copies kept off-site or in the cloud, and a tested restore procedure with an alternative site or equipment and named people responsible.", explanation: "Any two parts." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain two reasons why a country has laws about computer crime.", points: ["To define which acts are offences and set penalties that deter criminals", "To protect individuals and organisations, for example their personal data, and give victims a way to seek action"], modelAnswer: "To define which acts are offences and set penalties that deter criminals, and to protect individuals and organisations and give victims a way to seek action.", explanation: "Definition and deterrence; protection." }),
      ]),
      hints: ["Score = likelihood × impact.", "Two full backups and twelve incremental backups."],
      explanation: "15; transfer; 74 GB; unauthorised access; disaster recovery parts; reasons for laws.",
    });
  }
  // ------------------------------------------------------------------ 4. Enterprising case (ZIM)
  {
    const price = 5;
    const vc = 2;
    const fixed = 360;
    const contrib = price - vc;
    const be = fixed / contrib;
    chk(be, 120);
    const profit150 = 150 * contrib - fixed;
    chk(profit150, 90);
    const startup = 1620;
    const payback = startup / profit150;
    chk(payback, 18);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC Paper 1", applies: ZIM,
      concepts: [C("enterprise.e-business"), C("enterprise.business-proposal")],
      stem: `Chipo plans an online shop in Bulawayo that sells school stationery to schools by delivery. Each item sells for ${D}${price} and costs her ${D}${vc} to buy and deliver. Her fixed costs are ${D}${fixed} a month. She needs ${D}${startup} to start the business.`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the number of items she must sell each month to break even.", value: be, wrong: [fixed / price, fixed / vc], workedSolution: `1. Contribution = ${price} − ${vc} = ${D}${contrib}.\n2. Break-even = ${fixed} ÷ ${contrib} = ${be} items.`, explanation: `${fixed} ÷ ${contrib} = ${be}.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate her monthly profit if she sells 150 items.", unit: "US$", value: profit150, wrong: [150 * price - fixed, 450], workedSolution: `1. Contribution from 150 items = 150 × ${contrib} = ${D}${150 * contrib}.\n2. Profit = ${150 * contrib} − ${fixed} = ${D}${profit150}.`, explanation: `${150 * contrib} − ${fixed} = ${profit150}.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the payback period in months, using the profit in (b).", value: payback, wrong: [startup, 12], workedSolution: `1. Payback = ${startup} ÷ ${profit150} = ${payback} months.`, explanation: `${startup} ÷ ${profit150} = ${payback}.` }),
        pm("(d)", "Which e-commerce model describes her selling to schools?", ["B2B", "Correct: a business sells to other organisations."], [["B2C", "B2C sells to individual consumers."], ["C2C", "C2C is between two individuals."], ["G2C", "Chipo is a business, not a government department."]], "Selling to organisations is B2B."),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether the shop is viable, using your answers.", points: ["It breaks even at 120 items and makes a profit of US\\$90 a month at 150 items", "The payback period of 18 months is long, so the start-up money is at risk for a year and a half", "A judgement, such as viable only if enough school orders are secured, with a suggestion such as testing a lower number of sales or reducing fixed costs"], modelAnswer: "The shop breaks even at 120 items and makes US\\$90 a month at 150 items, but payback of 18 months is long, so the money is at risk for a year and a half. It is viable only if enough school orders are secured; she should test a lower number of sales and try to reduce fixed costs.", explanation: "Figures, risk and judgement." }),
      ]),
      hints: ["Break-even = fixed costs ÷ contribution per item.", "Payback = start-up cost ÷ monthly profit."],
      explanation: "Break-even 120 items; profit US\\$90; payback 18 months; B2B; evaluation.",
    });
  }
  // ------------------------------------------------------------------ THEORY5: privacy and integrity (both)
  {
    const bytes = [101, 52, 230, 19];
    const cs = checksum8(bytes);
    chk(bytes.reduce((a, x) => a + x, 0), 402);
    chk(cs, 146);
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("security.privacy-integrity")],
      stem: `A clerk at a bank in Mutare sends four values as bytes: ${bytes.join(", ")}. The checksum is the sum of the values modulo 256.`,
      parts: checkExam(EXAM.THEORY5, [
        pm("(a)", "A hacker copies the bank's customer list but changes nothing. Which property of the data is breached?", ["Privacy", "Correct: people saw data they were not allowed to see."], [["Integrity", "The data was not changed."], ["Compression", "Nothing was compressed."], ["Validation", "Validation is a check on input."]], "Copying data without permission breaches privacy."),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the checksum.", value: cs, wrong: [402, 402 - 512], workedSolution: `1. ${bytes.join(" + ")} = 402.\n2. 402 = 1 × 256 + ${cs}.`, explanation: `The checksum is ${cs}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why a matching checksum does not prove that the data arrived correctly.", points: ["Two errors can cancel out, for example one value too high by 1 and another too low by 1", "Different data can give the same sum, so the checksum is the same"], modelAnswer: "Two errors can cancel out, for example one value too high by 1 and another too low by 1, so different data can give the same checksum.", explanation: "A checksum is a sum." }),
      ]),
      hints: ["Add the four values, then take the remainder after dividing by 256."],
      explanation: "Privacy; checksum 146; errors can cancel out.",
    });
  }
  // ------------------------------------------------------------------ THEORY5: ethics and licensing (both)
  {
    const ind = 20;
    const site = 320;
    chk(25 * ind, 500);
    chk(site / ind, 16);
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("ethics.copyright-licensing")],
      stem: `A school in Masvingo has 25 computers and needs a drawing program. An individual licence costs ${D}${ind} for each computer. A site licence costs ${D}${site} for any number of computers at the school.`,
      parts: checkExam(EXAM.THEORY5, [
        pm("(a)", "Which type of software lets users study, change and share the source code?", ["Open-source software", "Correct."], [["Commercial software", "Its source code is not provided."], ["Shareware", "Shareware is a try-before-you-buy model."], ["Freeware without source code", "It cannot be changed."]], "Open-source software makes its source code available."),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the cost of individual licences for all 25 computers.", unit: "US$", value: 25 * ind, wrong: [site, 25 + ind], workedSolution: `1. 25 × ${ind} = ${D}${25 * ind}.`, explanation: `25 × ${ind} = ${25 * ind}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Justify the choice of the site licence for this school.", points: ["The site licence costs US\\$320, which is less than US\\$500 for individual licences", "It covers any number of computers at the school, so new computers can be added without buying more licences"], modelAnswer: "The site licence costs US\\$320, which is less than US\\$500 for individual licences, and it covers any number of computers at the school, so new computers can be added without more licences.", explanation: "Cost and flexibility." }),
      ]),
      hints: ["Individual cost = number of computers × price."],
      explanation: "Open source; US\\$500; site licence is cheaper and flexible.",
    });
  }
  // ------------------------------------------------------------------ THEORY5: social media and e-waste (ZIM)
  {
    const kwh = 15 * 0.08 * 10;
    chk(kwh, 12, 1e-9);
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC Paper 1", applies: ZIM,
      concepts: [C("ethics.social-environment")],
      stem: "A computer laboratory at a school in Mutare has 15 computers. Each uses 0.08 kW and they are left on for 10 hours each night. The school also plans to dispose of its old computers.",
      parts: checkExam(EXAM.THEORY5, [
        pm("(a)", "The school repairs five old computers and gives them to a rural primary school. Which of the 3Rs is this?", ["Reuse", "Correct."], [["Recycle", "The computers are not broken down for their materials."], ["Reduce", "The school has not simply bought or used less."], ["Replace", "This is not one of the 3Rs."]], "Repairing and donating working equipment is reuse."),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy in kWh wasted each night by the 15 computers (energy = power × time).", value: 12, wrong: [0.8, 1.2], workedSolution: "1. Power of 15 computers = 15 × 0.08 = 1.2 kW.\n2. Energy = 1.2 × 10 = 12 kWh.", explanation: "1.2 kW × 10 h = 12 kWh." }),
        P.manual({ label: "(c)", marks: 2, stem: "State two dangers of social media for learners.", points: ["Cyberbullying or harassment", "Misinformation, loss of privacy or addiction that reduces study time"], modelAnswer: "Cyberbullying or harassment, and misinformation or loss of privacy.", explanation: "Any two dangers." }),
      ]),
      hints: ["Energy = power in kW × time in hours."],
      explanation: "Reuse; 12 kWh; two dangers of social media.",
    });
  }
});
