// W1b: types of marriage, indigenous and contemporary (her.identity.marriage-types).
// Reviewer note: the Marriages Act of 2022 is described in outline only (one law for civil and customary marriages;
// minimum age 18; offence to marry or pledge a child). Polygamy is contested: no MCQ hinges on whether it is good or bad.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.marriage-types", { file: "identity/marriage-types", keyPrefix: "identity.marriage-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A marriage in which a person has only one spouse at a time is called …",
    options: [
      ["monogamy", "Correct."],
      ["polygamy", "Polygamy is having more than one spouse at the same time."],
      ["polygyny", "Polygyny is a man having more than one wife."],
      ["cohabitation", "Cohabitation is living together without marriage."],
    ],
    answer: "A",
    explanation: "Monogamy: one spouse at a time. Polygamy: more than one; its form in Zimbabwe is polygyny (one husband, several wives).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which type of marriage is solemnised by a marriage officer such as a magistrate and is **monogamous**?",
    options: [
      ["civil marriage", "Correct."],
      ["unregistered customary union", "This is concluded by custom, not by a marriage officer, and is not registered."],
      ["polygamous customary marriage", "A civil marriage is monogamous."],
      ["traditional engagement", "An engagement is not yet a marriage."],
    ],
    answer: "A",
    explanation: "A civil marriage is solemnised and registered by a marriage officer (a magistrate or an authorised minister) and is monogamous.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of registering a marriage?",
    options: [
      ["It gives legal proof that protects spouses and children, e.g. in inheritance", "Correct."],
      ["It removes the need for the two families to be involved in the marriage at all", "Registration does not remove family involvement."],
      ["It allows a person under 18 to marry", "No one under 18 may marry."],
      ["It ends the duty to support children", "Parents keep their duties to children."],
    ],
    answer: "A",
    explanation: "A marriage certificate proves the marriage, which protects a spouse's rights to property, inheritance and maintenance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In indigenous society, marriage was seen mainly as a union between …",
    options: [
      ["two families", "Correct: relatives arranged and sealed the marriage, which linked the families."],
      ["two individuals only, without family involvement", "Families were closely involved."],
      ["a man and the chief", "The chief did not marry people; families did."],
      ["two villages, decided by the headman", "Marriage was a family matter."],
    ],
    answer: "A",
    explanation: "Go-betweens (munyai/umkhongi), relatives and roora/lobola made marriage a link between two families.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason helps to explain why polygamy was found in indigenous **farming** societies?",
    options: [
      ["A large family provided labour to farm more land", "Correct: this is one reason often given."],
      ["Polygamy was required by the Constitution of the time", "There was no such requirement."],
      ["Farmers were not allowed to marry only one wife", "Monogamy was in fact the most common form."],
      ["Cattle could be kept only by polygamous households", "Monogamous households kept cattle too."],
    ],
    hints: ["Think about the work a farming household needed."],
    answer: "A",
    explanation: "In a farming economy, more wives and children meant more labour and more food, which is one reason given for polygamy.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo and Farai had a customary marriage with roora but never registered it. Why might this cause problems for Chipo if Farai dies?",
    options: [
      ["She may find it harder to prove the marriage when claiming inheritance", "Correct: without a certificate she must prove the marriage in other ways."],
      ["Customary marriages are illegal in Zimbabwe", "Customary marriages are recognised by law."],
      ["Roora must be returned when a husband dies", "This is not a rule of law."],
      ["Their children will lose the right to attend school in their home district", "Children's schooling does not depend on registration."],
    ],
    hints: ["What does a marriage certificate prove?"],
    answer: "A",
    explanation: "Registration gives easy legal proof. Without it a spouse may have to find witnesses to prove the marriage.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about polygamy is the **most balanced**?",
    options: [
      ["It had some benefits in farming societies but can cause rivalry and strain resources", "Correct: this weighs both sides."],
      ["It has no disadvantages for any family member", "Rivalry, inheritance disputes and health risks are recognised disadvantages."],
      ["It was never practised in Zimbabwe", "It was and is practised under customary law."],
      ["It is required by every religion practised in Zimbabwe and is accepted by all churches", "Many faiths reject it; others accept it."],
    ],
    hints: ["A balanced statement mentions both sides."],
    answer: "A",
    explanation: "Polygamy is contested: answers should give advantages and disadvantages fairly and reach a reasoned judgement.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which law reformed marriage in Zimbabwe, bringing civil and customary marriages under one law?",
    options: [
      ["the Marriages Act of 2022", "Correct."],
      ["the Land Apportionment Act of 1930", "This colonial law divided land by race."],
      ["the Legal Age of Majority Act of 1982", "This made 18 the age of adulthood."],
      ["the Domestic Violence Act of 2007", "This deals with domestic violence."],
    ],
    answer: "A",
    explanation: "The Marriages Act of 2022 reformed marriage law; the minimum marriage age is 18.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Constitution, no person under 18 may marry.",
    answer: true,
    explanation: "True. Section 78 sets 18; both parties must also consent freely.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A civil marriage may be polygamous.",
    answer: false,
    explanation: "False. A civil marriage is monogamous. Customary marriages may be polygamous under customary law.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of marriage with its feature.",
    pairs: [
      ["civil marriage", "solemnised by a marriage officer; monogamous"],
      ["customary marriage", "concluded by custom with roora/lobola; may be polygamous"],
      ["religious marriage", "conducted according to the teachings of a faith"],
      ["polygyny", "one husband with more than one wife"],
    ],
    explanation: "Many couples combine types, e.g. a customary marriage followed by a church wedding that is also registered.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The form of polygamy practised in Zimbabwe, in which a man has more than one wife, is called {{blank:a}}. The go-between in Ndebele marriage negotiations is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["polygyny"], choices: ["polygyny", "monogamy", "polyandry", "cohabitation"] },
      { id: "b", accepted: ["umkhongi"], choices: ["umkhongi", "indlalifa", "ubabakazi", "umalume"] },
    ],
    explanation: "Polygyny: one husband, several wives. The go-between is munyai in Shona and umkhongi in Ndebele.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of monogamy.",
    points: [
      "Closer partnership between two spouses",
      "so decisions and resources are shared more easily",
      "Fewer conflicts / lower health risk if both are faithful",
      "so the home is more peaceful / less risk of sexually transmitted infections",
    ],
    modelAnswer: "Monogamy allows a close partnership between two spouses, so decisions and resources are shared more easily. It also tends to cause fewer conflicts, and where both partners are faithful the risk of sexually transmitted infections is lower.",
    hints: ["Think of relationships, resources and health."],
    explanation: "Two marks per advantage: point and development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of polygamy.",
    points: [
      "Jealousy and rivalry between wives or between children",
      "which can cause conflict in the family",
      "Resources spread thin / inheritance disputes",
      "so children may lack school fees or property may be fought over",
    ],
    modelAnswer: "Polygamy can cause jealousy and rivalry between wives and between their children, leading to conflict in the family. Resources such as land, money and the husband's attention are spread thin, so some children may lack school fees, and the estate may be fought over when the husband dies.",
    hints: ["Think of relationships and resources."],
    explanation: "Two marks per disadvantage. Health risks and unequal power are also creditworthy.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** types of contemporary marriage in Zimbabwe.",
    points: ["Civil marriage", "Customary marriage (registered)", "Religious marriage (e.g. church wedding)"],
    modelAnswer: "Civil marriage; customary marriage; religious marriage.",
    explanation: "One mark per type.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "results of a survey of 60 married couples in a fictional ward of Mutare, 2026; figures invented for this question",
      "| How the marriage was made | Number of couples |\n| --- | --- |\n| Customary only, not registered | 21 |\n| Customary, then registered | 15 |\n| Customary, then church wedding and registration | 18 |\n| Civil (magistrate) only | 6 |\n| **Total** | **60** |") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "How many couples had **no** registered marriage?",
        accepted: ["21", "twenty-one", "twenty one"],
        wrong: ["15"],
      }),
      P.mcq({
        label: "(b)",
        stem: "Which conclusion is supported by the survey?",
        options: [
          ["Most couples began with a customary marriage", "Correct: 21 + 15 + 18 = 54 of 60 began with custom."],
          ["Most couples married only at the magistrates court", "Only 6 did."],
          ["No couple combined custom with a church wedding", "18 did."],
          ["All the marriages in Zimbabwe are customary", "The survey covers one ward only."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** reasons why a ward councillor might encourage the 21 couples to register their marriages.",
        points: [
          "Registration gives legal proof of the marriage",
          "which protects a spouse's inheritance and property rights if the other dies",
          "It makes claims for maintenance or documents easier",
          "so spouses and children are better protected",
        ],
        modelAnswer: "Registration gives legal proof of the marriage, which protects a spouse's right to inherit property if the other dies. It also makes it easier to claim maintenance and to obtain documents for the family, so spouses and children are better protected.",
      }),
    ],
    hints: ["In (b), add up all the rows that begin with custom."],
    explanation: "A data-based practice item (6 marks) on registration of marriages.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about contemporary marriages.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the main features of civil and customary marriages.",
        points: [
          ["Civil: solemnised and registered by a marriage officer (magistrate or authorised minister); monogamous; certificate issued", 2],
          ["Customary: concluded by custom with roora/lobola and family involvement; may be registered; may be polygamous under customary law", 2],
        ],
        modelAnswer: "A civil marriage is solemnised and registered by a marriage officer such as a magistrate or an authorised minister of religion; it is monogamous and a marriage certificate is issued. A customary marriage is concluded according to custom, with the involvement of both families and the payment of roora/lobola; it can be registered and, under customary law, may be polygamous.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Couples today should combine customary and civil marriage.\" How far do you agree?",
        points: [
          ["For: custom respects culture and involves both families; civil registration gives legal protection", 2],
          ["For: combination protects spouses and children in inheritance and maintenance", 2],
          ["Against/limits: cost of two ceremonies; some couples' faith or circumstances favour one form; registration of a customary marriage alone also gives legal proof", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There are strong reasons to combine them. A customary marriage respects culture and brings both families together through roora/lobola, while civil registration gives legal proof and clear rights. Together they protect spouses and children, for example when a spouse dies and the estate must be shared.\n\nHowever, combining them is not always necessary or possible. Two ceremonies can be expensive, and some couples' faith or circumstances lead them to choose one form. A customary marriage that is properly registered already gives legal proof, so the key need is registration rather than two separate marriages.\n\nI agree to a large extent. Couples benefit most when culture and legal protection go together, but this can be achieved either by combining the two or by registering a customary marriage. What matters most is that the marriage is registered and entered into freely by adults.",
      }),
    ],
    hints: ["In (b), separate respect for culture from legal protection."],
    explanation: "A practice evaluative item on contemporary marriages.",
  });

  b.card("DEFINITION", "Monogamy", "Marriage to only one spouse at a time.");
  b.card("DEFINITION", "Polygamy", "Marriage to more than one spouse at the same time; in Zimbabwe, polygyny (one husband, several wives).");
  b.card("DEFINITION", "Civil marriage", "A monogamous marriage solemnised and registered by a marriage officer such as a magistrate or authorised minister.");
  b.card("DEFINITION", "Customary marriage", "A marriage concluded by custom, usually with roora/lobola; may be registered; may be polygamous under customary law.");
  b.card("FACT", "What is the minimum marriage age in Zimbabwe?", "18 (section 78 of the Constitution); both parties must consent.");
  b.card("FACT", "Which law reformed marriage in Zimbabwe in 2022?", "The Marriages Act of 2022.");
  b.card("CONCEPT", "Give two possible advantages of polygamy in indigenous farming society.", "More family labour for farming; care within a household for widows or for a wife unable to have children.");
  b.card("CONCEPT", "Give two disadvantages of polygamy.", "Rivalry and jealousy; resources spread thin and inheritance disputes (also health risks, unequal power).");
  b.card("CONCEPT", "Why should a customary marriage be registered?", "Registration gives legal proof, protecting spouses' rights to property, inheritance and maintenance.");
});
