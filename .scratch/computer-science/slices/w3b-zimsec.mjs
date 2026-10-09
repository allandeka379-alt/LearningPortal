// Slice w3b: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, ZIM } from "../lib.mjs";

const C = (k) => `comp.${k}`;

// Payback for the systems analysis case.
const dev = 9000, save = 5000, run = 2000;
const payback = dev / (save - run);
if (!Number.isInteger(payback)) throw new Error("payback");
// Market research for the technopreneurship question.
const asked = 200, yes = 130;
const pct = (yes / asked) * 100;

concept(C("security.data-privacy"), { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("security.cyber-wellness-ethics"), C("security.copyright-plagiarism"), C("security.data-privacy"), C("security.backup-recovery")],
    hints: ["Privacy: who sees it. Integrity: is it correct.", "Plagiarism claims authorship; piracy copies without permission."],
    stem: "This question is about ethics, copyright and data. Mkoba Heights High School (fictional) in Gweru keeps learners' records and marks on a computer system and runs a computer club.",
    parts: [
      P.mcq({
        label: "(a)", stem: "A club member installs one licensed copy of a design program on all twenty club computers. What is this?",
        options: [["Software piracy", "Correct: use beyond the licence."], ["Plagiarism", "Plagiarism is claiming authorship of others' work."], ["Hacking", "No unauthorised access to a system."], ["Fair dealing", "Fair dealing covers short extracts for study or review."]],
        answer: "A", explanation: "Installing software beyond its licence terms is piracy.",
      }),
      P.match({
        label: "(b)", stem: "Classify each incident at the school.",
        pairs: ["A clerk tells a parent another learner's marks", "A learner's mark is saved as 37 instead of 73"],
        right: ["Breach of privacy", "Loss of integrity"],
        rightIndex: [0, 1],
        explanation: "Disclosure: privacy. Wrong value: integrity.",
      }),
      P.tf({ label: "(c)", stem: "A website whose address starts with https is guaranteed to be safe to give personal details to.", answer: false, explanation: "False: https shows encryption only; scam sites can use it too." }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "A learner posts insulting messages about a teacher in a group chat. Explain **two** effects of this unethical behaviour.",
        points: ["Effect on the teacher: distress / damaged reputation", "Effect on the learner or school: disciplinary or legal action / loss of trust / harmful online culture"],
        modelAnswer: "The teacher is humiliated and her reputation with parents is damaged. The learner could be suspended or face legal action, and other learners learn that online abuse is acceptable.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Describe **two** measures the school should use to keep learners' records private.",
        points: ["A measure with its purpose (e.g. access levels so only authorised staff see records)", "A second measure (e.g. unique IDs and strong passwords / encryption / firewall / locked office)"],
        modelAnswer: "Give each member of staff a unique login with access levels so teachers see only their own classes, and encrypt the records so a stolen disk cannot be read.",
      }),
      P.manual({
        label: "(f)", marks: 2,
        stem: "The records are backed up to a disk kept beside the server. Explain why this is a weakness and suggest an improvement.",
        points: ["Fire, flood or theft would destroy both the server and the backup", "Keep a copy off-site or in the cloud (encrypted) / test restores"],
        modelAnswer: "A fire or burglary in the server room would destroy the original and the backup together. An encrypted copy should also be kept in the cloud or at another site.",
      }),
    ],
    explanation: "(a) Software piracy. (b) Privacy; integrity. (c) False.",
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("sad.sdlc-fact-finding"), C("sad.feasibility"), C("sad.analysis-tools"), C("sad.system-design"), C("sad.documentation-training"), C("sad.implementation-maintenance")],
    hints: ["Many people → questionnaire.", "Payback = development cost ÷ yearly net saving.", "Critical data → the safest changeover."],
    stem: `This question is about systems analysis and design. Kariba Pharmacy (fictional) has four branches and keeps stock records on paper cards. Medicines often run out. Farai, a systems analyst, investigates and proposes a computerised stock control system costing USD ${dev.toLocaleString("en-GB")} to develop. It will save USD ${save.toLocaleString("en-GB")} a year and cost USD ${run.toLocaleString("en-GB")} a year to run.`,
    parts: [
      P.match({
        label: "(a)", stem: "Match each part of Farai's investigation to the most suitable fact-finding method.",
        pairs: ["Finding the fields on the existing stock cards", "Getting the views of 300 regular customers"],
        right: ["Record inspection", "Questionnaire", "Interview", "Observation"],
        rightIndex: [0, 1],
        explanation: "Stock cards: record inspection. Many customers: questionnaire.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the payback period of the new system in years.", value: payback, wrong: [dev / save],
        explanation: `${dev} ÷ (${save} − ${run}) = ${payback}.`,
        workedSolution: `1. Net saving per year: ${save} − ${run} = USD ${save - run}.\n2. Payback: ${dev} ÷ ${save - run} = ${payback} years.`,
      }),
      P.mcq({
        label: "(c)", stem: "In Farai's data flow diagram, what is the *Stock file*?",
        options: [["A data store", "Correct: it holds data."], ["An external entity", "Entities are outside the system."], ["A process", "Processes act on data."], ["A data flow", "Data flows are arrows."]],
        answer: "A", explanation: "Files where data is held are data stores.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **two** features Farai should include in the design of the stock input screen.",
        points: ["A feature with a benefit (e.g. drop-down list of medicines so names are valid)", "A second feature (e.g. range check on quantity with error messages / clear labels and instructions)"],
        modelAnswer: "A drop-down list of medicine names, so pharmacists cannot misspell a product, and a range check on the quantity with a clear error message.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Recommend a changeover method for the pharmacy and justify your choice.",
        points: ["Names a suitable method (pilot in one branch, or parallel running)", "Justification linked to the scenario (four branches / medicines are critical so risk must be low)"],
        modelAnswer: "Pilot: introduce the system in one branch first, so that if problems occur only one branch is affected, then roll it out to the other three.",
      }),
      P.manual({
        label: "(f)", marks: 2,
        stem: "After six months a new law requires the batch number of every medicine to be recorded. State the type of maintenance needed and name the documentation the programmer will use.",
        points: ["Adaptive maintenance", "Technical documentation (e.g. data dictionary / program listings)"],
        modelAnswer: "Adaptive maintenance, using the technical documentation such as the data dictionary and commented program code.",
      }),
    ],
    explanation: `(a) Record inspection; questionnaire. (b) ${payback} years. (c) Data store.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("techno.capital-ethics-marketing"), C("techno.innovation-ecosystem"), C("techno.laws-ipr"), C("techno.finance-market-research")],
    hints: ["Skills belong to people; code belongs to the business.", "Percentage = part ÷ whole × 100."],
    stem: "This question is about technopreneurship. Nyasha and Sipho, graduates of a polytechnic in Bulawayo, are developing *ShopEasy* (fictional), an app that lets small grocery shops take orders by phone.",
    parts: [
      P.match({
        label: "(a)", stem: "Classify each asset of the business.",
        pairs: ["Nyasha's programming skills", "The app's documented source code", "A partnership with a mobile network"],
        right: ["Human capital", "Organisational capital", "Social capital"],
        rightIndex: [0, 1, 2],
        explanation: "Skills: human. Code: organisational. Partnership: social.",
      }),
      P.num({
        label: "(b)", stem: `In their market research, ${yes} of ${asked} shopkeepers said they would use the app. What percentage is this?`,
        value: pct, wrong: [yes],
        explanation: `${yes} ÷ ${asked} × 100 = ${pct}%.`,
        workedSolution: `1. ${yes} ÷ ${asked} = ${yes / asked}.\n2. × 100 = ${pct}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which right protects the name *ShopEasy* and its logo?",
        options: [["Trademark", "Correct."], ["Patent", "Patents protect inventions."], ["Copyright", "Copyright protects the code, not the brand."], ["Industrial design", "Protects a product's shape."]],
        answer: "A", explanation: "Brand names and logos are trademarks.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain how an incubation centre could help the two founders.",
        points: ["Provides cheap workspace / internet / shared equipment", "Mentoring, business training, help with registration, or links to investors"],
        modelAnswer: "An incubator would give them a cheap desk with internet and assign a mentor who would help them write a business plan and introduce them to investors.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Suggest **one** suitable source of finance for *ShopEasy* and give **one** advantage and one disadvantage of it.",
        points: ["A suitable source with an advantage (e.g. angel investor: money plus advice; grant: not repaid)", "A matching disadvantage (e.g. gives up a share of ownership; competitive with conditions)"],
        modelAnswer: "An angel investor: they bring money and business contacts, but the founders must give up a share of the business and its profits.",
      }),
      P.manual({
        label: "(f)", marks: 1,
        stem: "State **one** way the business can show Unhu/Ubuntu values towards the shopkeepers.",
        points: ["e.g. fair, clearly stated charges / protecting their customers' data / honest advertising / prompt support"],
        modelAnswer: "Charge a fair fee that is clearly stated, with no hidden costs.",
      }),
    ],
    explanation: `(a) Human, organisational, social. (b) ${pct}%. (c) Trademark.`,
  });
});
