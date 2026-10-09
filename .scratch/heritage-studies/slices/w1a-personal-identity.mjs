// W1a: personal identity and national identification documents (her.identity.personal-identity).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.personal-identity", { file: "identity/personal-identity", keyPrefix: "identity.personal-identity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which government department issues birth certificates, national identity cards and passports in Zimbabwe?",
    options: [
      ["The Registrar General", "Correct: the Registrar General registers births and deaths and issues these documents."],
      ["The Zimbabwe Electoral Commission", "ZEC runs elections and voter registration, not identity documents."],
      ["The Master of the High Court", "The Master deals with deceased estates."],
      ["The Ministry of Primary and Secondary Education", "The Ministry runs schools; it does not issue identity documents."],
    ],
    answer: "A",
    explanation: "The Registrar General (Ministry of Home Affairs) issues birth certificates, national IDs and passports.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the **first** official identity document a Zimbabwean receives?",
    options: [
      ["The birth certificate", "Correct: it is issued when a birth is registered."],
      ["The national identity card", "The ID card is issued from age 16."],
      ["The passport", "A passport is obtained only when needed for travel."],
      ["The driver's licence", "A driver's licence is not a national identification document and comes much later."],
    ],
    answer: "A",
    explanation: "The birth certificate comes first, then the national ID card (from 16) and, when needed, the passport.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "From what age can a person apply for a national identity card in Zimbabwe?",
    options: [
      ["16", "Correct: national ID cards are issued from the age of 16."],
      ["18", "18 is the age of majority and voting age, but IDs are issued from 16."],
      ["12", "12 is too young; IDs are issued from 16."],
      ["21", "21 was the old age of majority; IDs are issued from 16."],
    ],
    answer: "A",
    explanation: "Zimbabweans apply for a national ID card from age 16.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which document is needed to cross most international borders?",
    options: [
      ["A passport", "Correct: a passport proves identity and nationality abroad."],
      ["A birth certificate", "A birth certificate is used inside the country; travel needs a passport."],
      ["A school report", "A school report is not an identity document."],
      ["A voter registration slip", "Voter registration is for elections, not travel."],
    ],
    answer: "A",
    explanation: "The passport is the travel document that proves identity and nationality outside Zimbabwe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which detail is shown on a national identity card but **not** on a birth certificate?",
    options: [
      ["A photograph of the holder", "Correct: the ID card carries a photograph; a birth certificate does not."],
      ["The person's date of birth", "Both documents show the date of birth."],
      ["The person's full name", "Both documents show the full name."],
      ["The person's place of birth", "Both documents show the place of birth."],
    ],
    answer: "A",
    explanation: "The birth certificate records birth details and parents; the ID card adds a photograph and a unique ID number.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha, aged 18, wants to register as a voter but has never obtained an ID card. What should she do **first**?",
    options: [
      ["Use her birth certificate to apply for a national ID card", "Correct: she needs an ID to register as a voter, and the birth certificate is needed for the ID."],
      ["Apply for a passport so that she can vote in another country", "She needs a national ID to vote in Zimbabwe, not a passport."],
      ["Ask a friend to lend her their ID card for the registration", "Using someone else's ID is a crime."],
      ["Wait until she is 21, when an ID is issued automatically", "IDs are not issued automatically; she must apply from 16."],
    ],
    answer: "A",
    hints: ["Which document does she need to register, and what does she need to get it?"],
    explanation: "Voter registration requires proof of identity; the birth certificate is used to apply for the ID card.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does birth registration help to **protect children**?",
    options: [
      ["It proves a child's age, guarding against child marriage and child labour", "Correct: proof of age helps enforce laws that protect under-18s."],
      ["It gives every child the right to vote in local elections", "Voting is for citizens aged 18 and over."],
      ["It allows young children to travel abroad without their parents' consent", "Children need consent and a passport to travel."],
      ["It makes every child the legal head of their household", "Birth registration does not change who heads a household."],
    ],
    answer: "A",
    hints: ["What can a birth certificate prove that matters for laws on marriage and work?"],
    explanation: "Proof of age helps authorities enforce the minimum marriage age of 18 and laws against child labour.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure would **most** reduce the number of children without birth certificates in a rural district?",
    options: [
      ["Mobile registration teams visiting villages, clinics and schools", "Correct: bringing the service closer removes the cost and distance barriers."],
      ["Charging a higher fee for late registration of births", "Higher fees would discourage poor families from registering."],
      ["Refusing school places to every child without a certificate", "This would harm children's right to education without solving the problem."],
      ["Requiring all parents to travel to Harare to register their children's births", "Longer journeys would make registration harder, not easier."],
    ],
    answer: "A",
    hints: ["What stops rural families from registering births?"],
    explanation: "Distance and cost are major barriers; mobile registration and awareness campaigns bring the service to families.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A passport shows an expiry date.",
    answer: true,
    explanation: "True. A passport shows the dates of issue and expiry, and it must be renewed when it expires.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Personal identity is made up only of the official documents a person holds.",
    answer: false,
    explanation: "False. Personal identity also includes name, family, totem, language, religion and nationality. Documents are official proof of identity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the document **mainly** needed.",
    pairs: [
      ["Registering a Form 4 learner for public examinations", "Birth certificate"],
      ["Registering as a voter at age 18", "National identity card"],
      ["Travelling to a neighbouring country by bus", "Passport"],
    ],
    explanation: "Birth certificate: school and examinations. National ID: voting, work, banking. Passport: international travel.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "If an ID card is stolen, the owner should report it to the {{blank:a}} and apply for a replacement from the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["police"], choices: ["police", "village head", "school", "bank"] },
      { id: "b", accepted: ["Registrar General"], choices: ["Registrar General", "Electoral Commission", "Master of the High Court", "town council"] },
    ],
    hints: ["Theft is a crime; documents are issued by one department."],
    explanation: "Report a lost or stolen document to the police, then apply to the Registrar General for a replacement.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the document issued when a child's birth is registered.",
    accepted: ["birth certificate", "a birth certificate"],
    wrong: ["passport", "ID card"],
    explanation: "Registering a birth with the Registrar General leads to the issue of a **birth certificate**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** forms of personal identity.",
    points: ["Name / surname", "Totem / clan / family", "Language or religion", "Nationality or identity documents"],
    modelAnswer: "Name, totem, language and nationality.",
    explanation: "One mark each. Accept name, family, totem, language, religion, nationality, physical features, documents.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the contents of a national identity card.",
    points: ["Unique ID number", "Full name of the holder", "Date and place of birth / village or district of origin", "Photograph of the holder / date of issue"],
    modelAnswer: "A national ID card shows a unique ID number, the holder's full name, date and place of birth, village or district of origin, the date of issue and a photograph of the holder.",
    hints: ["Think of what proves exactly who the holder is."],
    explanation: "One mark per correct item, up to four.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** problems a young adult without a national identity card may face.",
    points: [
      "Identifies e.g. cannot register to vote",
      "Develops: loses a say in choosing leaders",
      "Identifies e.g. cannot get formal work / open a bank account / register a phone line",
      "Develops: e.g. limited income and access to services",
    ],
    modelAnswer: "Without an ID card, a young adult cannot register as a voter, so they cannot help choose their leaders. They also struggle to get formal employment or open a bank account, which limits their income and access to services.",
    hints: ["Think of voting, work and services."],
    explanation: "Two marks per problem: identify and develop.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a notice of the kind displayed at a district office, written for this question", "MOBILE REGISTRATION TEAM. From 7 to 11 December 2026 a registration team will visit the fictional Ward 9 school hall. Services: birth registration, birth certificates and applications for national identity cards (age 16 and above). Bring: clinic birth records, parents' identity documents, and any school or church records. Late registrations: bring a witness who knows the child's family.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Who may apply for a national identity card at this visit?",
        options: [
          ["People aged 16 and above", "Correct: the notice says ID applications are for age 16 and above."],
          ["Children of any age", "Children receive birth certificates; IDs are for 16 and above."],
          ["Only people aged 18 and above", "The notice says 16 and above."],
          ["Only people travelling abroad", "ID cards are for all citizens from 16, not only travellers."],
        ],
        answer: "A",
        explanation: "National ID cards are issued from age 16.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** documents a parent should bring to register a child's birth.",
        points: ["The clinic or hospital birth record", "The parents' identity documents (or school/church records for late registration)"],
        modelAnswer: "The clinic birth record and the parents' identity documents.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **why** the government sends mobile registration teams to rural wards.",
        points: ["Many rural families live far from district offices / transport is costly", "Bringing the service closer means more births are registered and more people get IDs", "Registered citizens can access school, examinations, voting, work and services, and the government can plan"],
        modelAnswer: "Many rural families live far from the district office and cannot afford the journey. A mobile team brings the service close to them, so more births are registered and more young people get IDs. This lets them go to school, sit examinations, vote and work, and helps the government plan services.",
      }),
    ],
    hints: ["In (c), think about distance, cost and what documents make possible."],
    explanation: "An invented notice used to apply knowledge of identity documents.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on national identification documents.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "List the **three** national identification documents.",
        points: ["Birth certificate", "National identity card", "Passport"],
        modelAnswer: "The birth certificate, the national identity card and the passport.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Describe the contents of a passport.",
        points: ["Holder's name, nationality, sex, date and place of birth", "Photograph and signature of the holder", "Passport number and dates of issue and expiry"],
        modelAnswer: "A passport shows the holder's name, nationality, sex and date and place of birth, a photograph and signature of the holder, and the passport number with its dates of issue and expiry.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The birth certificate is the most important identity document a Zimbabwean will ever hold.\" Discuss.",
        points: [
          ["For: the first document; proves age, parents and birth; needed for school, examinations and to obtain the ID and passport", 2],
          ["For: protects children (proof of age against child marriage and labour); helps planning", 2],
          ["Against: the ID card is needed daily as an adult (voting, work, banking); the passport is essential for travel", 2],
          ["Supported judgement, e.g. foundation document though others are used more in adult life", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is a strong case for the birth certificate. It is the first official document and proves a person's age, parents and place of birth. It is needed to enrol at school and register for examinations, and without it a person cannot obtain a national ID card or a passport. It also protects children, because proof of age helps enforce the laws on marriage and child labour.\n\nHowever, the national ID card is used far more in adult life. It is needed to register as a voter, find formal work, open a bank account and register a phone line. The passport is essential for anyone who travels abroad.\n\nOverall, the birth certificate is the most important in the sense that it is the foundation for every other document, even though adults use the ID card more often in daily life.",
      }),
    ],
    hints: ["In (c), consider which document the others depend on."],
    explanation: "List (a), describe (b) and discuss (c) the national identification documents.",
  });

  b.card("DEFINITION", "Personal identity", "The features that make a person unique and show where they belong: name, family, totem, language, religion, nationality, documents.");
  b.card("DEFINITION", "Registrar General", "The government department (Ministry of Home Affairs) that registers births and deaths and issues birth certificates, IDs and passports.");
  b.card("DEFINITION", "Birth registration", "Officially recording a child's birth with the State, after which a birth certificate is issued.");
  b.card("FACT", "From what age is a national ID card issued?", "16.");
  b.card("FACT", "Name the three national identification documents.", "Birth certificate, national identity card, passport.");
  b.card("CONCEPT", "Contents of a birth certificate (outline)?", "Child's full name, sex, date and place of birth, parents' names and particulars, registration number.");
  b.card("CONCEPT", "Contents of a passport (outline)?", "Name, nationality, sex, date and place of birth, photograph, signature, passport number, issue and expiry dates.");
  b.card("CONCEPT", "Give five uses of identity documents.", "School and examinations, work, voting, travel, banking, phone registration, marriage, inheritance, social services.");
  b.card("CONCEPT", "What should you do if your ID is lost?", "Report it to the police and apply to the Registrar General for a replacement.");
});
