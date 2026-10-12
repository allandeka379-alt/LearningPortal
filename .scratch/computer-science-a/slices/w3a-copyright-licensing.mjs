// Slice w3a: acs.ethics.copyright-licensing (both boards; patents and trademarks are ZIMSEC detail). Free-preview lesson.
import { concept, P, ZIM, chk, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const single = 30;
const site = 420;
const be = site / single;
chk(be, 14);
const rows = [8, 14, 20].map((n) => [n, n * single, site, n * single < site ? "Individual" : n * single === site ? "Same" : "Site"]);
const costMd = mdTable(["Computers", "Individual licences (US\\$)", "Site licence (US\\$)", "Cheaper"], rows);
chk(20 * single, 600);
const words = 1250;
const matched = 300;
chk((matched / words) * 100, 24);
const w2 = 600;
const m2 = 90;
chk((m2 / w2) * 100, 15);

concept("acs.ethics.copyright-licensing", { file: "ethics/copyright-licensing", keyPrefix: "ethics.copyright-licensing" }, (b) => {
  mc(b, 1, "RECALL", "What does copyright protect?",
    ["An original work in its fixed form, such as program code, a document or a song", "Correct."],
    [["A bare idea that has not been written or recorded", "Ideas are not protected until they are expressed in a work."], ["The name of a school", "A name or logo may be a trademark."], ["Any information on a public web site, which anyone is free to copy, change and sell", "Web content is still protected by copyright."]],
    "Copyright protects original works, not bare ideas.");
  mc(b, 2, "UNDERSTANDING", "Why is copyright legislation needed for software?",
    ["Copies are perfect and cheap to make, so without a law creators could not earn a reward for their work", "Correct."],
    [["Software cannot be copied at all", "Software is easy to copy, which is why the law is needed."], ["Only large companies write software, so only they need to be protected by the law", "Individuals and small teams also create software."], ["Copyright makes software run faster", "Copyright does not affect performance."]],
    "The law lets creators control copying and earn a reward.", { daily: true });
  mc(b, 2, "RECALL", "Which type of licence lets a user try a program for a limited time and pay to keep using it?",
    ["Shareware", "Correct."],
    [["Site licence", "A site licence covers many computers at one site for a fixed fee."], ["Open source", "Open-source software makes its source code available."], ["Freeware", "Freeware has no payment at all."]],
    "Shareware is try-before-you-buy software.", { daily: true });
  mc(b, 2, "APPLICATION", "A school has 40 computers and wants the same office software on all of them for a single fee. Which licence is suitable?",
    ["A site licence", "Correct."],
    [["A single-user licence for each computer, bought separately", "This would cost more than a fixed fee for many computers."], ["A trial version of shareware", "A trial version stops working or is limited."], ["A licence that allows one copy only", "One copy would not cover 40 computers."]],
    "A site licence covers any number of computers at one site.", { daily: true });
  mc(b, 3, "ANALYSIS", "A rural clinic has no money for software and needs to be able to adapt a program for its own forms. Which kind of software is the best choice?",
    ["Open-source software", "Correct: it has no fee and the source code can be changed."],
    [["Commercial software with a restrictive licence", "It costs money and cannot be changed."], ["A pirated copy of commercial software", "Using a pirated copy is illegal."], ["Freeware whose licence does not allow changes", "It cannot be adapted."]],
    "Open source gives legal use and the freedom to adapt.", { hints: ["Which licence allows both low cost and changes?"] });
  mc(b, 3, "UNDERSTANDING", "How does similarity-checking software help to detect plagiarism?",
    ["It compares a document with a store of other documents and reports the text that matches", "Correct."],
    [["It deletes any text that has been copied", "It only reports matches."], ["It writes the missing references for the author and corrects the copied text", "It does not write references."], ["It proves that the author is guilty", "The report is a guide; a person must judge."]],
    "The checker reports matches; a person decides if they are plagiarism.", { hints: ["Does the software decide, or does it report?"] });
  mc(b, 3, "ANALYSIS", "A student includes a paragraph from a web site in a report, in quotation marks, with the source named. Which statement is correct?",
    ["It is not plagiarism because the source is acknowledged, although it may still count in a similarity report", "Correct."],
    [["It is plagiarism because the paragraph came from the internet, whatever the source is", "Acknowledged quotation is acceptable."], ["It is piracy of software", "Piracy concerns software licences, not quotations."], ["It is fine to copy a whole chapter in the same way", "Only a short extract may be quoted for study."]],
    "Acknowledged quotations are allowed; the checker may still show them as matches.", { hints: ["What makes plagiarism different from quotation?"] });
  mc(b, 4, "EVALUATION", "Which is the strongest reason to buy licensed software rather than use a pirated copy?",
    ["The licensed copy is legal, gets updates and support, and carries less risk of hidden malware", "Correct."],
    [["Pirated software always runs slower", "Speed is not the main difference."], ["Licensed software never needs updating", "All software needs updates."], ["A licence guarantees that the program has no mistakes and will never need updates", "No licence can guarantee that."]],
    "Legal use, updates and lower risk are the main advantages.", { hints: ["Think about the law, support and security."] });
  mc(b, 3, "UNDERSTANDING", "What does a patent protect?",
    ["A new invention, for a limited time", "Correct."],
    [["The name and logo of a firm, shown on its goods", "That is a trademark."], ["The text of a novel", "That is protected by copyright."], ["A password", "A patent does not protect passwords."]],
    "A patent protects how an invention works.", { applies: ZIM, hints: ["Is it an invention, a name or a written work?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In free software as defined by the Free Software Foundation, \"free\" refers to the freedom to use, study, change and share the program, not to its price.", answer: true, explanation: "True. Free software is about freedom; it may or may not be sold." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of software to its description.",
    pairs: [["Commercial software", "Paid for, with copying and sharing restricted by the licence"], ["Shareware", "Free to try for a limited time, then payment is needed"], ["Freeware", "No payment needed, but the source code is usually not provided"], ["Open-source software", "The source code is available to use, study, change and share"], ["Site licence", "One fee for use on any number of computers at one site"]],
    explanation: "Each licence has distinct conditions." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.", hints: ["One is about software, one about someone's work."],
    template: "Using software without the licence required is called software {{blank:a}}. Presenting another person's work as your own is called {{blank:b}}. The legal right of a creator to control copying of an original work is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["piracy"], choices: ["piracy", "validation", "encryption", "compression"] },
      { id: "b", accepted: ["plagiarism"], choices: ["plagiarism", "piracy", "patenting", "copyright"] },
      { id: "c", accepted: ["copyright"], choices: ["copyright", "a trademark", "plagiarism", "a firewall"] },
    ], explanation: "Piracy, plagiarism, copyright." });
  b.short({ d: 2, skill: "RECALL", applies: ZIM, stem: "Name the form of intellectual property that protects a company's name or logo.",
    accepted: ["trademark", "a trademark", "trade mark", "trademarks"], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: ["patent"], explanation: "A trademark." });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Multiply the number of computers by the price of one licence."],
    stem: `A program costs US\\$${single} for each computer. Calculate the cost of individual licences for 20 computers.`,
    value: 20 * single, wrong: [single + 20, site], workedSolution: `1. 20 × ${single} = US\\$${20 * single}.`, explanation: `20 × ${single} = ${20 * single}.` });
  b.num({ d: 3, skill: "APPLICATION", hints: ["The break-even number is the site fee divided by the price of one licence."],
    stem: `A site licence costs US\\$${site}. Individual licences cost US\\$${single} each. Calculate the number of computers at which the two options cost the same.`,
    value: be, wrong: [site - single, site * single], workedSolution: `1. Break-even = ${site} ÷ ${single} = ${be} computers.`, explanation: `${site} ÷ ${single} = ${be}.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "%", hints: ["Matched words ÷ total words × 100."],
    stem: `A similarity checker finds that ${m2} words of a ${w2}-word essay match other sources. Calculate the percentage of the essay that matches.`,
    value: 15, wrong: [m2, 85], workedSolution: `1. ${m2} ÷ ${w2} = 0.15.\n2. As a percentage = 15%.`, explanation: `${m2} ÷ ${w2} × 100 = 15%.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Think about creators, copying and rewards."],
    stem: "Explain why copyright legislation is needed. [3]",
    points: ["Digital work can be copied perfectly, cheaply and quickly, so without a law creators could lose their income", "The law makes unauthorised copying and selling an offence, which deters people", "It encourages creators to produce new software and other work because they can be rewarded"],
    modelAnswer: "Digital work can be copied perfectly, cheaply and quickly, so creators could lose their income. The law makes unauthorised copying an offence, which deters people, and it encourages new work because creators can be rewarded.",
    explanation: "Easy copying, deterrence, reward." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Name the licence and give two reasons that fit the scenario."],
    stem: "A software company in Harare writes an accounting program and wants to earn money from every business that uses it. State the type of licence it should use and justify your choice. [4]",
    points: ["A commercial (proprietary) licence", "Customers pay a fee, so the company earns money from every user", "The source code is not provided, so others cannot copy or sell the program", "The licence restricts copying and sharing, and can include support and updates for paying customers"],
    modelAnswer: "A commercial licence. Customers must pay a fee, so the company earns from every user. The source code is not provided and copying is restricted, so others cannot copy or sell the program, and support and updates can be offered to paying customers.",
    explanation: "Licence and justification." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare cost, source code and freedom to share."],
    stem: "Compare open-source software with commercial software. [4]",
    points: ["Open-source software has its source code available; commercial software does not provide it", "Open-source users may change and share the software; commercial users are restricted by the licence", "Open-source software is often free of cost, while commercial software must be paid for", "Commercial software normally includes support and updates from the company, which open-source software may lack"],
    modelAnswer: "Open-source software has its source code available and users may change and share it; commercial software does not provide source code and restricts copying. Open-source software is often free of cost, while commercial software must be paid for but usually includes support and updates.",
    explanation: "Source code, freedom, cost and support." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Describe how each is found, then what is done."],
    stem: "Describe how software piracy and plagiarism can each be detected. [4]",
    points: ["Piracy: product activation or licence keys checked online show that a copy is not licensed", "Piracy: audits compare the software installed with the licences held", "Plagiarism: similarity-checking software compares the work with a store of documents and reports matching text", "A person then examines the matches to decide if the text is copied, because the percentage is only a guide"],
    modelAnswer: "Piracy is detected by activation and licence keys checked online and by audits comparing installed software with licences held. Plagiarism is detected by similarity-checking software that reports matching text, which a person then examines because the percentage is only a guide.",
    explanation: "Detection methods for each." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Individual cost = number × price; compare with the site fee."],
    explanation: `For 8 computers individual licences are cheaper, at 14 they cost the same and at 20 the site licence is cheaper.`,
    stem: `A school in Masvingo is choosing how to license a program. Individual licences cost US\\$${single} each. A site licence costs US\\$${site} for any number of computers.\n\n${costMd}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many computers cost the same under both options?", value: be, wrong: [8, 20], workedSolution: `${site} ÷ ${single} = ${be}.`, explanation: `${be} computers.` }),
      P.short({ label: "(b)", marks: 1, stem: "The school has 20 computers. State which option is cheaper (individual or site).", accepted: ["site", "site licence"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["individual"], explanation: "20 × 30 = US$600 for individual licences, which is more than US$420." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate how much the school saves by buying a site licence for 20 computers instead of individual licences.", unit: "US$", value: 20 * single - site, wrong: [site, 20 * single], workedSolution: `1. Individual cost = 20 × ${single} = ${20 * single}.\n2. Saving = ${20 * single} − ${site} = US\\$${20 * single - site}.`, explanation: `${20 * single} − ${site} = ${20 * single - site}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons other than cost why the school might choose open-source software instead.", points: ["The source code can be changed to fit the school's needs", "There is no risk of breaking licence conditions when the software is copied to more computers"], modelAnswer: "The source code can be changed to fit the school's needs, and the software can be copied to more computers without breaking licence conditions.", explanation: "Freedom to adapt and share." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Percentage = matched words ÷ total words × 100."],
    explanation: `${matched} ÷ ${words} × 100 = 24%.`,
    stem: `A teacher at a school in Mutare receives a project report of ${words} words. A similarity checker reports that ${matched} words match other sources. The teacher finds that 50 of these words are a quotation with the source acknowledged.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the report that the checker reports as matching.", unit: "%", value: 24, wrong: [matched, 76], workedSolution: `1. ${matched} ÷ ${words} = 0.24.\n2. = 24%.`, explanation: "24%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage that remains after the acknowledged quotation is excluded.", unit: "%", value: 20, wrong: [4, 24], workedSolution: `1. ${matched} − 50 = 250 words.\n2. 250 ÷ ${words} = 0.2 = 20%.`, explanation: "250 ÷ 1250 × 100 = 20%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the teacher should not decide from the percentage alone that the learner has plagiarised.", points: ["The matches may be common phrases, references or acknowledged quotations, which are not plagiarism", "A person must read the matched passages and judge whether the work was passed off as the learner's own"], modelAnswer: "The matches may be common phrases, references or quotations that are acknowledged, which are not plagiarism, so a person must read the passages and judge.", explanation: "The percentage is a guide." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, applies: ZIM, hints: ["Patents protect inventions; trademarks protect names and logos."],
    explanation: "A is a patent, B is a trademark and C is copyright.",
    stem: "Three owners want to protect their work. A: an engineer in Bulawayo has invented a new type of water-level sensor. B: a firm in Harare has a logo and a name for its internet service. C: a student in Gweru has written a program.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the form of protection most suitable for A.", accepted: ["patent", "a patent"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["trademark"], explanation: "A patent protects a new invention." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the form of protection most suitable for B.", accepted: ["trademark", "a trademark", "trade mark"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["patent"], explanation: "A trademark protects names and logos." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the form of protection that automatically applies to the program in C.", accepted: ["copyright"], normalise: ["trim", "lowercase"], wrong: ["patent"], explanation: "Copyright arises automatically when a work is created." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the owner of B is protected by the law against a rival firm that copies the logo.", points: ["The trademark gives the owner the exclusive right to use the logo for its services", "The owner can take legal action against the rival firm", "Customers are protected because they are not misled into thinking the rival's services come from firm B"], modelAnswer: "The trademark gives the owner the exclusive right to use the logo for its services, so the owner can take legal action against the rival, and customers are protected from being misled.", explanation: "Exclusive right, action, no misleading." }),
    ] });
  b.card("DEFINITION", "Copyright", "The legal right of the creator of an original work to control copying, changing, distribution and performance of it; arises automatically.");
  b.card("CONCEPT", "Why copyright law is needed", "Digital copies are perfect, cheap and fast; the law deters copying and lets creators earn a reward.");
  b.card("CONCEPT", "Software licence types", "Commercial, site licence, shareware, freeware, free software and open source: they differ in cost, source code and freedom to change and share.");
  b.card("CONCEPT", "Free software", "Freedom to run, study, change and share the program; 'free' refers to freedom, not price.");
  b.card("DEFINITION", "Plagiarism", "Presenting another person's work or ideas as your own without acknowledging the source.");
  b.card("CONCEPT", "Detecting piracy and plagiarism", "Piracy: activation, licence keys and audits. Plagiarism: similarity-checking software, whose percentage is a guide for a person to judge.");
  b.card("FORMULA", "Break-even number of licences", "Site fee ÷ price of one licence; above this number the site licence is cheaper.");
  b.card("DEFINITION", "Patent and trademark (ZIMSEC)", "A patent protects a new invention for a limited time; a trademark protects a name or logo that identifies a maker.", undefined, { applies: ZIM });
});
