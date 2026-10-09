// W3b: Zimbabwean citizenship (her.constitution.citizenship).
// Reviewer notes: sections 35-43 (Chapter 3): 36 birth, 37 descent, 38 registration (married to a citizen for at least
// five years; lawful continuous residence for at least ten years; adopted children), 39 revocation of citizenship by
// registration (fraud etc.). Duties of citizens paraphrased from Chapter 3 (loyalty, observing the Constitution,
// respecting the flag and anthem, defending the country). Scenarios for "descent" specify a parent settled abroad and
// not working for the state, to avoid the section 36(2) exception. Dual citizenship deliberately left out.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.constitution.citizenship", { file: "constitution/citizenship", keyPrefix: "constitution.citizenship" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which chapter of the Constitution deals with citizenship?",
    options: [
      ["Chapter 3", "Correct: Chapter 3 (sections 35-43) deals with citizenship."],
      ["Chapter 4", "Chapter 4 is the Declaration of Rights."],
      ["Chapter 7", "Chapter 7 deals with elections."],
      ["Chapter 15", "Chapter 15 deals with traditional leaders."],
    ],
    answer: "A",
    explanation: "Chapter 3 sets out citizenship by birth, descent and registration.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which office issues birth certificates, national identity cards and passports?",
    options: [
      ["the Registrar General", "Correct: the Registrar General's office issues these documents."],
      ["the Master of the High Court", "The Master deals with deceased estates."],
      ["the Zimbabwe Electoral Commission", "ZEC registers voters but does not issue IDs or passports."],
      ["the Environmental Management Agency", "EMA deals with the environment."],
    ],
    answer: "A",
    explanation: "The Registrar General issues birth certificates, national identity cards and passports.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tatenda was born in Gweru to Zimbabwean parents. How is he a Zimbabwean citizen?",
    options: [
      ["by birth", "Correct: born in Zimbabwe to Zimbabwean parents."],
      ["by descent", "Descent applies to people born outside Zimbabwe."],
      ["by registration", "Registration is for people who apply and qualify, not those born to citizens in Zimbabwe."],
      ["by marriage alone", "Marriage alone does not make a person a citizen; it can lead to registration after a period."],
    ],
    answer: "A",
    explanation: "A person born in Zimbabwe when a parent was a Zimbabwean citizen is a citizen by birth (section 36).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Thandeka was born in Botswana to a Zimbabwean mother who had settled and worked there for many years. How is Thandeka a Zimbabwean citizen?",
    options: [
      ["by descent", "Correct: born outside Zimbabwe to a Zimbabwean parent."],
      ["by birth", "She was not born in Zimbabwe, and her mother had settled abroad."],
      ["by registration", "She does not need to apply on grounds of marriage or residence."],
      ["she cannot be a citizen", "A child of a Zimbabwean citizen born abroad can be a citizen by descent."],
    ],
    answer: "A",
    explanation: "A person born outside Zimbabwe when a parent was a Zimbabwean citizen by birth or descent is a citizen by descent (section 37).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "From what age can a Zimbabwean citizen apply for a national identity card?",
    options: [
      ["16", "Correct: national identity cards are issued from age 16."],
      ["18", "18 is the voting age."],
      ["12", "Twelve-year-olds use a birth certificate as their main document."],
      ["21", "21 is not the age for an identity card."],
    ],
    answer: "A",
    explanation: "Citizens apply for a national identity card from age 16; they may vote from 18.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is a privilege of citizens rather than a right of every person in Zimbabwe?",
    options: [
      ["voting in national elections", "Correct: voting is for citizens aged 18 and over."],
      ["freedom from torture", "This belongs to every person in Zimbabwe."],
      ["the right to life", "This belongs to every person."],
      ["freedom from torture and from slavery", "These belong to every person."],
    ],
    answer: "A",
    hints: ["Which of these could a visitor from another country not do?"],
    explanation: "Rights such as life and freedom from torture belong to everyone; voting belongs to citizens (and is regulated by the electoral law).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mr Phiri, born in Malawi, has lived lawfully and continuously in Zimbabwe for twelve years and wants to become a citizen. Which way of acquiring citizenship should he use?",
    options: [
      ["registration", "Correct: long lawful residence can qualify a person for registration."],
      ["birth", "He was not born in Zimbabwe to a Zimbabwean parent."],
      ["descent", "Descent depends on a Zimbabwean parent or grandparent."],
      ["adoption by a citizen", "Adoption applies to children adopted by citizens; he is an adult."],
    ],
    answer: "A",
    hints: ["He must apply and meet conditions."],
    explanation: "Citizenship by registration is for people who apply and qualify, for example after at least ten years of lawful, continuous residence.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains why lacking a birth certificate can affect a young person's citizenship in practice?",
    options: [
      ["Without it, proving citizenship and getting an ID or exam entry is very hard", "Correct: documents unlock the practical benefits of citizenship."],
      ["A person without a birth certificate automatically loses citizenship at 16", "Citizenship is not automatically lost; proving it is the problem."],
      ["Birth certificates are needed only for travelling abroad", "They are needed for school, exams and IDs too."],
      ["The Constitution says only people with passports are citizens", "There is no such rule."],
    ],
    answer: "A",
    hints: ["What does a birth certificate lead to?"],
    explanation: "A birth certificate is needed for exams, an identity card, voter registration and more; without it, a person struggles to use the rights of citizenship.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "There are three ways of becoming a Zimbabwean citizen: by birth, by descent and by registration.",
    answer: true,
    explanation: "True. Sections 36, 37 and 38 set out citizenship by birth, descent and registration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Only citizens are protected by the Declaration of Rights.",
    answer: false,
    explanation: "False. Many rights, such as the right to life and freedom from torture, belong to every person in Zimbabwe. Some, such as voting, are for citizens.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each identity document with its main use.",
    pairs: [
      ["birth certificate", "enrolling in school and sitting public examinations"],
      ["national identity card", "registering as a voter and opening a bank account"],
      ["passport", "travelling to other countries"],
    ],
    extraRight: ["settling a deceased estate"],
    explanation: "Birth certificate: school and exams (and later an ID); national ID: voter registration and banking; passport: international travel.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Citizenship by birth is set out in section {{blank:a}}. Citizenship by registration is set out in section {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["36"], choices: ["36", "38", "81", "56"] },
      { id: "b", accepted: ["38"], choices: ["38", "36", "75", "4"] },
    ],
    explanation: "Section 36: by birth; section 37: by descent; section 38: by registration.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **two** rights or privileges and **two** duties of Zimbabwean citizens.",
    points: [
      "Right or privilege: any one of voting from 18; standing for office; a passport and ID; living in and entering Zimbabwe freely; protection by the state abroad",
      "A second different right or privilege",
      "Duty: any one of loyalty to Zimbabwe; observing the Constitution and respecting its institutions; respecting the flag and anthem; defending the country; obeying the law; paying taxes",
      "A second different duty",
    ],
    modelAnswer: "Rights and privileges: voting from age 18 and obtaining a passport. Duties: being loyal to Zimbabwe and respecting the national flag and anthem.",
    explanation: "One mark per correct right or duty, correctly labelled.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the **three** ways of becoming a Zimbabwean citizen.",
    points: [
      "By birth: born in Zimbabwe",
      "when a parent was a Zimbabwean citizen (or a grandparent a citizen by birth or descent)",
      "By descent: born outside Zimbabwe",
      "when a parent or grandparent was a Zimbabwean citizen by birth or descent",
      "By registration: a person applies and meets conditions",
      "e.g. married to a citizen for at least five years, or ten years' lawful continuous residence, or adopted by a citizen",
    ],
    modelAnswer: "A person is a citizen by birth if born in Zimbabwe when a parent was a Zimbabwean citizen. A person is a citizen by descent if born outside Zimbabwe when a parent or grandparent was a Zimbabwean citizen by birth or descent. A person becomes a citizen by registration by applying and meeting the conditions, for example having been married to a Zimbabwean citizen for at least five years or having lived lawfully in Zimbabwe for at least ten years.",
    hints: ["For each way, say where the person was born or what they must do."],
    explanation: "Two marks per way: identification and explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "In a fictional ward near Binga, many adults have no national identity cards. Explain **two** problems this causes and suggest **one** solution.",
    points: [
      "Problem: cannot register to vote, so they cannot take part in choosing leaders",
      "Problem: cannot open bank accounts, get formal jobs, claim inheritances or obtain passports",
      "Solution: mobile registration teams from the Registrar General visit the ward",
      "Explains: bringing the service closer removes the cost and distance of travel",
    ],
    modelAnswer: "Without identity cards, the adults cannot register to vote, so they cannot help choose their leaders. They also cannot open bank accounts, get formal jobs or claim inheritances. The Registrar General could send mobile registration teams to the ward, which would remove the cost and distance of travelling to a district office.",
    hints: ["Think of voting, money and work."],
    explanation: "One mark for each problem, one for a sensible solution and one for explaining it.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a case study written for a fictional school guidance lesson, Mutare, 2026",
      "Farai, aged 17, was born in Mutare to Zimbabwean parents but never had a birth certificate because his mother died soon after his birth. He now wants to sit his O-Level examinations and to obtain a national identity card. His aunt has his clinic card, and two elders who were present at his birth are willing to give statements.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "By which way is Farai a Zimbabwean citizen?",
        options: [
          ["by birth", "Correct: born in Mutare to Zimbabwean parents."],
          ["by descent", "Descent applies to people born outside Zimbabwe."],
          ["by registration", "He does not need to apply for registration; his citizenship comes from his birth."],
          ["he is not a citizen", "He is a citizen; he lacks only the documents to prove it."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** things Farai cannot easily do without a birth certificate.",
        points: ["Sit public examinations (O-Level)", "Obtain a national identity card"],
        modelAnswer: "He cannot easily sit his O-Level examinations or obtain a national identity card.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Farai could obtain a birth certificate.",
        points: [
          "Go with a relative (his aunt) to the Registrar General's office to register the birth late",
          "Take supporting evidence such as the clinic card",
          "Bring witnesses (the elders) to confirm the facts of his birth",
        ],
        modelAnswer: "Farai should go with his aunt to the Registrar General's office to register his birth late. He should take his clinic card as evidence and bring the two elders, who can confirm when and where he was born and who his parents were.",
      }),
    ],
    hints: ["In (c), use the evidence and people mentioned in the source."],
    explanation: "A source-based practice item on citizenship and identity documents.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about citizenship.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the duties of Zimbabwean citizens.",
        points: [
          "To be loyal to Zimbabwe",
          "To observe the Constitution and respect its ideals and institutions",
          "To respect the national flag and the national anthem",
          "To defend Zimbabwe and its sovereignty / to obey the law and pay taxes",
        ],
        modelAnswer: "Citizens must be loyal to Zimbabwe and observe the Constitution, respecting its ideals and institutions. They must respect the national flag and the national anthem. They should defend Zimbabwe and its sovereignty to the best of their ability, and they must obey the law and pay their taxes.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Citizenship brings more rights than responsibilities.\" Discuss.",
        points: [
          ["Rights and privileges: voting, standing for office, passport, protection, services, freedom to live and work", 2],
          ["Responsibilities: loyalty, observing the Constitution, respecting symbols, defending the country, obeying laws, paying taxes", 2],
          ["Rights and responsibilities depend on each other: rights last only when citizens carry out duties", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Citizenship brings many rights and privileges. Citizens can vote from 18 and stand for office, obtain passports and identity documents, live in and return to Zimbabwe freely, and receive the protection of the state at home and abroad.\n\nBut citizenship also brings important responsibilities. Citizens must be loyal to Zimbabwe, observe the Constitution and respect its institutions, respect the flag and anthem, defend the country and obey the law and pay taxes.\n\nThe two cannot really be separated. Elections work only if citizens vote responsibly; public services exist only if citizens pay taxes; rights are protected only if citizens respect the Constitution and the rights of others.\n\nI disagree that citizenship brings more rights than responsibilities. They are balanced, and each depends on the other.",
      }),
    ],
    hints: ["In (b), show how rights depend on responsibilities."],
    explanation: "A practice evaluative item on the rights and responsibilities of citizenship.",
  });

  b.card("DEFINITION", "Citizenship", "The legal status of being a member of a country, which gives rights and privileges and places duties on the person.");
  b.card("FACT", "What are the three ways of becoming a Zimbabwean citizen?", "By birth (section 36), by descent (section 37) and by registration (section 38).");
  b.card("CONCEPT", "What is the difference between citizenship by birth and by descent?", "By birth: born in Zimbabwe to a citizen parent (or a grandparent who is a citizen by birth or descent). By descent: born outside Zimbabwe to a citizen parent or grandparent.");
  b.card("FACT", "Give two ways a person can qualify for citizenship by registration.", "Marriage to a citizen for at least five years; lawful continuous residence for at least ten years (also adoption by a citizen).");
  b.card("FACT", "From what age can a citizen obtain a national identity card?", "16.");
  b.card("FACT", "Which office issues birth certificates, IDs and passports?", "The Registrar General.");
  b.card("FACT", "Name four duties of citizens.", "Loyalty to Zimbabwe; observing the Constitution; respecting the flag and anthem; defending the country (also obeying laws and paying taxes).");
  b.card("CONCEPT", "Why is a birth certificate important?", "It proves name, birth and parents and is needed for school, public examinations and an identity card.");
  b.card("FACT", "When can citizenship by registration be revoked?", "In limited cases set out in the Constitution, for example if it was obtained by fraud or false information.");
});
