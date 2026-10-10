// W1a: religious practitioners in Indigenous Religion (frs.indigenous.practitioners).
// Reviewer note: the Constitution of Zimbabwe 2013 Chapter 15 (Traditional Leaders) is cited for chiefs; ZINATHA is described
// in outline only (no founding date or statute).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.practitioners", { file: "indigenous/practitioners", keyPrefix: "indigenous.practitioners" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **svikiro** (plural masvikiro)?",
    options: [
      ["A spirit medium who is believed to speak for a spirit", "Correct: the svikiro hosts a spirit during possession."],
      ["A herbalist who prepares medicines from roots and leaves", "A herbalist is an n'anga or inyanga."],
      ["A chief who allocates land and hears cases in a customary court", "A chief is a traditional leader, not a medium."],
      ["A paternal aunt who helps to arrange a marriage between families", "That is the vatete, an important relative in the family."],
    ],
    answer: "A",
    explanation: "A **svikiro** is a spirit medium: a person believed to be chosen by a spirit to speak and act for it during possession.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Ndebele usage, what is the difference between an **inyanga** and an **isangoma**?",
    options: [
      ["An inyanga is a herbalist, and an isangoma is a diviner", "Correct: one is mainly a herbalist and the other a diviner."],
      ["An inyanga is a diviner, and an isangoma is a herbalist", "The two roles are the other way round."],
      ["An inyanga is a chief, and an isangoma is a headman of a village", "Neither word describes a chief or a headman."],
      ["An inyanga is a spirit that guards a region, and an isangoma is a family ancestor", "Both words describe people, not spirits."],
    ],
    answer: "A",
    explanation: "In Ndebele usage the **inyanga** is a herbalist and the **isangoma** a diviner. The Shona word n'anga covers both.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practitioner is the custodian of land and custom and hears disputes in a customary court?",
    options: [
      ["A chief or headman of the community", "Correct: chiefs and headmen look after land and settle disputes."],
      ["A diviner who throws the hakata", "A diviner looks for causes and the wishes of spirits."],
      ["A herbalist who gathers roots and leaves", "A herbalist treats and advises."],
      ["A spirit medium during a bira", "A medium speaks for a spirit; the chief hears the dispute."],
    ],
    answer: "A",
    explanation: "Chiefs and headmen are **custodians** of land, custom and sacred places, and they settle disputes. The Constitution of Zimbabwe recognises traditional leaders in Chapter 15.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does ZINATHA stand for?",
    options: [
      ["Zimbabwe National Traditional Healers Association", "Correct: it represents traditional healers."],
      ["Zimbabwe National Teachers and Heads Association", "ZINATHA represents healers, not teachers."],
      ["Zimbabwe Native Tribal Authorities Headquarters", "ZINATHA is not a body of tribal authorities."],
      ["Zimbabwe National Trade and Harvest Marketing Agency", "ZINATHA is not a trade agency."],
    ],
    answer: "A",
    explanation: "**ZINATHA** is the Zimbabwe National Traditional Healers Association.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A man with a long cough and weight loss visits a traditional healer, who listens with care and then urges him to go to the clinic for tests. Which statement best describes the healer's conduct?",
    options: [
      ["It is responsible: the healer offers care but refers serious illness", "Correct: the healer recognises the limits of the role."],
      ["It is irresponsible, as a healer should never talk about clinics with a patient", "Referral is a good practice, not a fault."],
      ["It shows that traditional healers have no part to play in the care of families", "Healers still offer counsel and support."],
      ["It proves that healers can cure any disease with herbs, so the clinic is unnecessary", "No herbal remedy is shown to cure serious diseases."],
    ],
    answer: "A",
    hints: ["What should a healer do when the signs of illness are serious?"],
    explanation: "A responsible healer offers care and counsel but sends serious illness to a trained health worker, in line with Ministry of Health and WHO advice.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two families dispute a field boundary. The elders ask the territorial spirit medium for guidance, and the chief records the agreed boundary. How does this show the role of practitioners?",
    options: [
      ["They work together to settle disputes peacefully and keep custom", "Correct: the medium, elders and chief each contribute."],
      ["They work against each other, so the dispute can never be settled", "In the example they cooperate."],
      ["They replace the need for any family to take part in the decision", "The families still agree to the settlement."],
      ["They treat the families unfairly by favouring the wealthier family", "Nothing suggests unfairness."],
    ],
    answer: "A",
    hints: ["What does each person in the example do?"],
    explanation: "Mediums, chiefs and elders often cooperate. The medium offers guidance, the elders discuss, and the chief records and enforces the decision.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do many people expect traditional healers and mediums to be truthful and fair?",
    options: [
      ["Their roles depend on community trust, and misuse harms people", "Correct: trust is central, and abuse such as false claims or accusations does harm."],
      ["They are paid by the government according to the number of people they accuse", "Accusing people is condemned and may be a crime."],
      ["They are expected to keep the details of every case secret from the family", "Fairness does not mean hiding everything from families."],
      ["They are obliged to follow only the personal wishes of the wealthiest people", "Fairness means treating people impartially."],
    ],
    answer: "A",
    hints: ["What happens to a healer who makes false claims or demands large payments?"],
    explanation: "Practitioners hold trusted roles. Abuse, such as exploiting patients or accusing people of witchcraft, is condemned and may be a crime.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about traditional healers is **best supported**?",
    options: [
      ["They offer valued care, but serious illness needs a health worker", "Correct: both roles are recognised."],
      ["They can replace clinics and hospitals for all illnesses, including HIV", "No herbal remedy has been shown to cure HIV."],
      ["They are all witches and should be avoided by every person", "Healers are respected practitioners, not witches."],
      ["They have no connection with the beliefs or practice of Indigenous Religion", "Their work is closely linked to belief in the spirit world."],
    ],
    answer: "A",
    hints: ["Which statement respects healers and also protects health?"],
    explanation: "Healers are respected practitioners who offer care and counsel. For serious illness, people should see a trained health worker, as Ministry of Health and WHO advice states.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Shona word n'anga is used for both a herbalist and a diviner.",
    answer: true,
    explanation: "True. In Ndebele usage the two roles have separate words: inyanga (herbalist) and isangoma (diviner).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A responsible traditional healer tells a patient with a serious illness to avoid the clinic.",
    answer: false,
    explanation: "False. A responsible healer refers serious illness to a trained health worker and does not claim cures.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each practitioner with the role they perform.",
    pairs: [
      ["Svikiro (spirit medium)", "Speaks for a spirit during possession"],
      ["Inyanga", "Herbalist who prepares remedies and gives counsel"],
      ["Chief", "Custodian of land and custom who settles disputes"],
      ["Vatete", "Paternal aunt with a special role in marriage and family ceremonies"],
    ],
    explanation: "The medium speaks for a spirit; the inyanga is a herbalist; the chief is a custodian of land and custom; the vatete is the paternal aunt.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A person believed to be chosen by a spirit to speak for it is a {{blank:a}}. A set of carved pieces thrown by a diviner is called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["svikiro"], choices: ["svikiro", "chief", "herbalist", "headman"] },
      { id: "b", accepted: ["hakata"], choices: ["hakata", "mbira", "hosho", "ngoma"] },
    ],
    explanation: "A spirit medium is a **svikiro**. Diviners often use the **hakata**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Ndebele word for a traditional diviner.",
    accepted: ["isangoma", "Isangoma"],
    wrong: ["inyanga", "n'anga"],
    explanation: "The Ndebele word for a diviner is **isangoma**. The herbalist is the inyanga.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** practitioners or leaders in Indigenous Religion.",
    points: ["Spirit medium (svikiro)", "Traditional healer or diviner (n'anga, inyanga, isangoma)", "Any one of: chief or headman, rain-maker, family elder, vatete, sekuru"],
    modelAnswer: "A spirit medium, a traditional healer and a chief.",
    explanation: "One mark for each practitioner correctly named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which spirit mediums serve their communities.",
    points: [
      "Identifies: they give guidance on family and community matters (e.g. disputes, land)",
      "Develops: they are believed to speak for a spirit, and the community listens and settles matters peacefully",
      "Identifies: they help to lead ceremonies such as mukwerera",
      "Develops: they link the community with the spirits and the ancestors, which strengthens unity",
    ],
    modelAnswer: "Mediums give guidance on family and community matters such as disputes over land; they are believed to speak for a spirit, so the community listens and settles matters peacefully. They also help to lead ceremonies like mukwerera, linking the community with the spirits and strengthening unity.",
    hints: ["Think of disputes, rain and ceremonies."],
    explanation: "Two marks for each way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why traditional healers should refer people with serious illnesses to a trained health worker.",
    points: [
      "Serious illnesses such as HIV and TB need tests and treatment that have been proved to work",
      "Delay or refusal of treatment can lead to worse illness or death, and can spread infection",
      "No herbal remedy has been shown to cure HIV, so a healer should not make such claims",
      "Healers and clinics each have a role and can work together; referral builds trust",
    ],
    modelAnswer: "Serious illnesses such as HIV and TB need tests and treatment that have been proved to work, and delay can lead to worse illness or death and can spread infection. No herbal remedy has been shown to cure HIV, so a healer should not claim to, but healers and clinics can work together, with the healer offering counsel and support.",
    hints: ["Think of what happens when treatment is delayed."],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description by a fictional Form 3 learner from Gwanda, 2026",
      "In our village the headman and the elders ask the medium for guidance when the rains are late. My aunt, a healer, treats coughs and stomach problems with herbs and always tells people with a high fever to go to the clinic. My father's sister helps to arrange the marriages of our cousins and teaches the girls the customs of our family.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Who is described as helping to arrange the marriages of the cousins?",
        options: [
          ["The vatete, the paternal aunt", "Correct: the paternal aunt has a role in marriage arrangements."],
          ["The sekuru, the maternal uncle", "The source names the father's sister, not the maternal uncle."],
          ["The headman", "The headman is mentioned in connection with the rains."],
          ["The spirit medium", "The medium is mentioned in connection with the rains."],
        ],
        answer: "A",
        explanation: "The father's sister, the **vatete**, has a special role in marriage arrangements and in teaching girls.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** practitioners or leaders named in Source A.",
        points: ["The headman (or the elders)", "The medium (or the healer, or the paternal aunt)"],
        modelAnswer: "The headman and the spirit medium.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why it is good practice for the healer in Source A to tell people with a high fever to go to the clinic.",
        points: [
          "A high fever can be a sign of a serious illness that needs tests and proven treatment",
          "Referral protects the patient and prevents delay in getting care",
          "It shows respect for the limits of her role and builds trust between healers and clinics",
        ],
        modelAnswer: "A high fever can be a sign of a serious illness that needs tests and proven treatment, so referral protects the patient from delay. It also shows that the healer respects the limits of her role, which builds trust between healers and clinics.",
      }),
    ],
    hints: ["In (c), think about what a fever might mean."],
    explanation: "A source on several practitioners and on responsible practice.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on practitioners in Indigenous Religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** roles of chiefs and headmen in Indigenous Religion.",
        points: [
          "Custodians of land and sacred places",
          "Developed (e.g. they protect shrines and groves, and allocate land)",
          "Lead the community in ceremonies and settle disputes",
          "Developed (e.g. they preside over mukwerera or hear cases in a customary court)",
        ],
        modelAnswer: "Chiefs and headmen are custodians of land and sacred places, so they protect shrines and groves and allocate land. They also lead the community in ceremonies such as mukwerera and settle disputes in customary courts.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Traditional healers and modern health workers should work together.\" To what extent do you agree?",
        points: [
          ["For: healers are trusted, close to the community and offer counsel and comfort; they can refer patients and encourage them to complete treatment", 2],
          ["For: cooperation reaches more people and reduces delay; an example such as a healer sending a patient to a clinic", 2],
          ["Against / limits: healers must not claim cures for diseases such as HIV; some practices can harm; trained health workers are needed for diagnosis and tested treatment", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I largely agree. Traditional healers are trusted by many people, live close to the community and offer counsel and comfort. They can encourage patients to go to the clinic and to complete treatment, so cooperation reaches more people and reduces delay.\n\nHowever, there are limits. A healer must not claim to cure diseases such as HIV, because no herbal remedy has been shown to do so, and only trained health workers can diagnose and give tested treatment.\n\nTherefore cooperation is best where each respects the other's role: the healer offers counsel and support and refers serious illness, and the clinic provides tested treatment.",
      }),
    ],
    hints: ["In (b), say what healers offer, what the limits are, and how they can cooperate."],
    explanation: "Describe the role of chiefs (a) and assess cooperation between healers and health workers (b).",
  });

  b.card("DEFINITION", "Spirit medium (svikiro, plural masvikiro)", "A person believed to be chosen by a spirit, such as an ancestral or territorial spirit, to speak and act for it during possession.");
  b.card("DEFINITION", "N'anga, inyanga and isangoma", "N'anga (Shona): a traditional healer, herbalist or diviner. Inyanga (Ndebele): herbalist. Isangoma (Ndebele): diviner.");
  b.card("DEFINITION", "Divination", "Seeking to learn the cause of a problem or the wishes of the spirits by traditional means, for example by throwing the hakata.");
  b.card("DEFINITION", "ZINATHA", "The Zimbabwe National Traditional Healers Association, a body that represents traditional healers.");
  b.card("FACT", "Name four practitioners or leaders in Indigenous Religion.", "Spirit mediums, traditional healers and diviners, chiefs and headmen, and family elders such as the vatete and sekuru.");
  b.card("FACT", "Who is the vatete, and who is the sekuru?", "The vatete is the paternal aunt (father's sister); the sekuru is the maternal uncle or grandfather. Both have special roles in family ceremonies.");
  b.card("CONCEPT", "Why should a healer refer serious illness to a clinic?", "Serious illness such as HIV and TB needs tests and proven treatment; no herbal remedy has been shown to cure HIV, and delay can be dangerous.");
  b.card("CONCEPT", "How do chiefs, mediums and elders work together?", "A medium gives guidance in the name of a spirit, elders discuss, and the chief records and enforces decisions, as in a land dispute.");
  b.card("CONCEPT", "What responsibilities should practitioners have?", "Be truthful, fair and respectful of taboos; not exploit patients, make false claims or accuse people of witchcraft.");
});
