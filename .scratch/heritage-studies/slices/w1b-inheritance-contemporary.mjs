// W1b: inheritance and heirship in contemporary families (her.culture.inheritance-contemporary).
// Reviewer note: intestate succession is described only in outline (spouse and children main beneficiaries; customary
// estates included since the late-1990s amendments). No percentages or section numbers are given.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.inheritance-contemporary", { file: "culture/inheritance-contemporary", keyPrefix: "culture.inheritance-contemporary" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A written document stating how a person's property should be shared after death is called a …",
    options: [
      ["will", "Correct."],
      ["title deed", "A title deed proves ownership of land or a house; it does not share property after death."],
      ["death certificate", "A death certificate records a death; it does not share property."],
      ["birth certificate", "A birth certificate records a birth."],
    ],
    answer: "A",
    explanation: "A will states the testator's wishes for sharing property and often names an executor.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A person who dies without a valid will is said to have died …",
    options: [
      ["intestate", "Correct: the estate is then shared according to the law."],
      ["insolvent", "Insolvent means unable to pay one's debts."],
      ["executor", "An executor manages an estate; it does not describe how a person died."],
      ["testator", "A testator is a person who makes a will."],
    ],
    answer: "A",
    explanation: "Intestate means without a valid will; a testator is someone who makes a will.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which office supervises deceased estates and the executors who administer them?",
    options: [
      ["the Master of the High Court", "Correct: the Master registers estates and oversees executors."],
      ["the Registrar General", "The Registrar General issues birth certificates, IDs and passports."],
      ["the Zimbabwe Electoral Commission", "This commission runs elections."],
      ["the Environmental Management Agency", "EMA deals with the environment."],
    ],
    answer: "A",
    explanation: "Estates are reported to the Master of the High Court; in many districts magistrates courts handle this work for the Master.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the law today, who are the **main** beneficiaries when a married person dies without a will?",
    options: [
      ["the surviving spouse and the children", "Correct."],
      ["the deceased's brothers and sisters", "Siblings may inherit only if there is no spouse or child."],
      ["the customary heir chosen by the family", "A customary heir may carry the name but does not take ownership of the property."],
      ["the local council where the person lived", "Councils do not inherit family estates."],
    ],
    answer: "A",
    explanation: "The law protects the surviving spouse and children as the main beneficiaries, including in estates governed by customary law.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a requirement for a will to be valid?",
    options: [
      ["It is signed by the testator and by two witnesses", "Correct: signature and two witnesses are basic requirements."],
      ["It is read aloud at the funeral before burial", "Reading it aloud is not required for validity."],
      ["It is written by a lawyer and stamped by the police", "A lawyer helps but is not required, and the police do not stamp wills."],
      ["It leaves equal shares to every relative", "A testator can decide how to share; equality is not a requirement."],
    ],
    answer: "A",
    explanation: "A valid will is written, signed by a testator of sound mind and witnessed by two people who see the testator sign.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A month after Nyasha's father died, an uncle removed the furniture and the car from the family home without the family's agreement. What is this called?",
    options: [
      ["property-grabbing", "Correct: seizing a deceased person's property without lawful authority."],
      ["kugova nhaka", "Kugova nhaka is the customary sharing of an estate by the family, not seizure."],
      ["intestate succession", "That is the lawful sharing of an estate without a will."],
      ["executorship", "An executor is appointed lawfully to manage the estate."],
    ],
    hints: ["Was this done lawfully, or by force?"],
    answer: "A",
    explanation: "Property-grabbing is seizing property from a deceased estate without lawful authority, usually harming the widow and children.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the **most important** way a will protects a widow and her children?",
    options: [
      ["It gives written proof of who should receive the property", "Correct: the written will can be shown to anyone who tries to take property."],
      ["It guarantees that relatives will never visit the family", "A will does not control visits."],
      ["It removes the need to register the estate with the Master", "Estates are still reported to the Master."],
      ["It means no debts of the deceased have to be paid", "Debts are paid from the estate before sharing."],
    ],
    hints: ["What can a widow show to someone who disputes her rights?"],
    answer: "A",
    explanation: "A will makes the testator's wishes clear and written, which protects beneficiaries against disputes and property-grabbing.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which change would **most** reduce property-grabbing in a rural district?",
    options: [
      ["Running awareness campaigns on wills and widows' rights", "Correct: people who know their rights and write wills are better protected."],
      ["Closing the magistrates court to save money", "This would make it harder for victims to get help."],
      ["Leaving all inheritance decisions to the eldest male relative", "This could increase the risk of grabbing."],
      ["Telling widows to move back to their parents' homes", "This abandons widows' rights instead of protecting them."],
    ],
    hints: ["Which option strengthens the people most at risk?"],
    answer: "A",
    explanation: "Knowledge of wills and legal rights, and easy access to the Master and courts, are the main protections against property-grabbing.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A testator is the person who makes a will.",
    answer: true,
    explanation: "True. The executor manages the estate; the beneficiaries receive from it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the law, a customary heir named by the family automatically owns the deceased's house.",
    answer: false,
    explanation: "False. A customary heir may carry the name and family duties, but the surviving spouse and children are the main beneficiaries of property.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["testator", "the person who makes a will"],
      ["executor", "manages the estate, pays debts and shares the property"],
      ["beneficiary", "a person who receives property from an estate"],
      ["intestate", "dying without a valid will"],
    ],
    explanation: "These four terms are the basic vocabulary of inheritance law.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A valid will must be written, signed by the testator and signed by {{blank:a}} witnesses. Estates are supervised by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["two", "five", "ten", "no"] },
      { id: "b", accepted: ["Master of the High Court"], choices: ["Master of the High Court", "Registrar General", "village head", "Electoral Commission"] },
    ],
    explanation: "Two witnesses; the Master of the High Court.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** reasons why a person should write a will.",
    points: ["Makes wishes clear / reduces disputes", "Protects the spouse and children against property-grabbing", "Speeds up winding up of the estate / allows provision for particular people"],
    modelAnswer: "It makes the person's wishes clear and reduces quarrels; it protects the spouse and children against property-grabbing; it speeds up the winding up of the estate.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of property-grabbing on a family.",
    points: [
      "Loss of home and income",
      "so the widow and children fall into poverty",
      "Children may drop out of school",
      "because fees cannot be paid",
      "Conflict and loss of trust with in-laws",
      "so the family loses the support of the extended family",
    ],
    modelAnswer: "The widow and children may lose their home and income, so they fall into poverty. Children may drop out of school because the fees cannot be paid. The conflict damages trust between the widow and her in-laws, so the family loses the support of the extended family when it most needs it.",
    hints: ["Think about money, education and relationships."],
    explanation: "Two marks per effect: the effect and its consequence.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Rudo's husband has died without a will, and his relatives are taking property from her home in Gweru. Suggest **two** steps she should take, explaining each.",
    points: [
      "Report the death and the estate to the Master of the High Court (or the magistrates court)",
      "so that an executor is appointed and the property is protected and shared lawfully",
      "Seek help from the police, the courts or a legal aid organisation",
      "so that grabbed property can be recovered and her and the children's rights enforced",
    ],
    modelAnswer: "Rudo should report the estate to the Master of the High Court through the magistrates court, so that an executor is appointed and the property is protected and shared according to the law. She should also seek help from a legal aid organisation, the police or the courts, which can order the property returned and enforce her and her children's rights.",
    hints: ["Which office supervises estates? Who can enforce rights?"],
    explanation: "Credit lawful steps with an explanation of what each achieves.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a notice (described in words) on a community notice board in a fictional ward of Bindura, 2026",
      "The notice is headed \"Protect your family: write a will\". It shows a family outside a house and lists four points: a will must be in writing; sign it in front of two witnesses; tell someone you trust where it is kept; after a death, report the estate to the Master's office at the magistrates court. At the bottom it gives the time of a free information meeting at the ward hall.", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is the main purpose of the notice?",
        options: [
          ["to encourage residents to write valid wills", "Correct: it is headed 'write a will' and explains how."],
          ["to sell houses in the ward", "The picture of a house is about protecting the family home."],
          ["to announce a funeral", "Nothing in the notice announces a funeral."],
          ["to recruit witnesses for a court case at the ward hall", "Witnesses are mentioned only as part of making a will."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** requirements for a valid will given in the notice.",
        points: ["In writing", "Signed in front of two witnesses"],
        modelAnswer: "It must be in writing; it must be signed in front of two witnesses.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the notice advises telling someone you trust where the will is kept.",
        points: [
          "A will that cannot be found cannot be used",
          "so the estate would be treated as intestate",
          "and the testator's wishes, and protection of the family, could be lost",
        ],
        modelAnswer: "If nobody can find the will it cannot be used, so the estate would be treated as if there were no will. The testator's wishes would be lost, and the family might lose the protection the will was meant to give.",
      }),
    ],
    hints: ["In (c), think about what happens if a will cannot be found."],
    explanation: "A described-notice practice item (6 marks) on wills.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about wills in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the role of the Master of the High Court in inheritance.",
        points: [
          ["Estates are reported to the Master (often through the magistrates court), who registers them", 2],
          ["The Master oversees the executor and makes sure debts are paid and property shared lawfully", 2],
        ],
        modelAnswer: "When a person dies, the estate is reported to the Master of the High Court, often through the local magistrates court, which registers it. The Master oversees the executor, making sure that debts are paid and that the property is shared according to the will or the law.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Writing a will is the best way to protect a family after a death.\" How far do you agree?",
        points: [
          ["For: a will makes wishes clear, gives written proof and reduces property-grabbing", 2],
          ["For: allows provision for vulnerable dependants and names a trusted executor", 2],
          ["Against: a will can be lost, challenged or ignored; families also need knowledge of rights, access to the Master and courts, and the law protects spouses even without a will", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "A will is a powerful protection. It makes the deceased's wishes clear and gives the spouse and children written proof that they can show to anyone who tries to take property. It can also name a trusted executor and provide for a dependant with special needs.\n\nHowever, a will is not enough on its own. It can be lost or challenged, and relatives may still try to grab property. Families also need to know their rights and be able to reach the Master's office, the courts and legal aid. In addition, the law already protects spouses and children when there is no will.\n\nI agree to a large extent. Writing a will is the best single step a person can take, but it works best alongside awareness of rights and access to the institutions that enforce them.",
      }),
    ],
    hints: ["In (b), consider what else protects a family besides a will."],
    explanation: "A practice evaluative item on the value of wills.",
  });

  b.card("DEFINITION", "Will", "A written, signed and witnessed document stating how a person's property is to be shared after death.");
  b.card("DEFINITION", "Intestate", "Dying without a valid will; the estate is shared according to the law.");
  b.card("DEFINITION", "Executor", "The person who collects the deceased's property, pays debts and shares the rest among beneficiaries.");
  b.card("DEFINITION", "Beneficiary", "A person who receives property or benefits from an estate.");
  b.card("DEFINITION", "Property-grabbing", "Seizing a dead person's property, often from the widow or children, without lawful authority.");
  b.card("FACT", "Who supervises deceased estates in Zimbabwe?", "The Master of the High Court (often through magistrates courts in the districts).");
  b.card("FACT", "Name three requirements of a valid will.", "In writing; signed by the testator (of sound mind, acting freely); signed by two witnesses who saw the testator sign.");
  b.card("CONCEPT", "Who mainly inherits when a married person dies without a will?", "The surviving spouse and the children.");
  b.card("CONCEPT", "How does contemporary inheritance differ from indigenous practice for women?", "The law protects the rights of widows and daughters to property; in indigenous practice they were often excluded.");
});
