// W2a: Indigenous marriage practices and marriage counselling (her.culture.marriage-practices).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.marriage-practices", { file: "culture/marriage-practices", keyPrefix: "culture.marriage-practices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who leads marriage negotiations on behalf of the groom's family in an indigenous marriage?",
    options: [
      ["the go-between (munyai/umkhongi)", "Correct: the go-between speaks for the groom's family."],
      ["the bride's paternal aunt (vatete/ubabakazi)", "The aunt is the bride's counsellor; she does not negotiate for the groom."],
      ["the village head of the bride's village", "The village head is not part of the negotiations between the two families."],
      ["the groom himself, speaking directly", "The groom does not negotiate his own marriage face to face."],
    ],
    answer: "A",
    explanation: "The munyai (Shona) or umkhongi (Ndebele) is a respected speaker chosen by the groom's family to lead the talks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of roora/lobola?",
    options: [
      ["To show respect and bind the two families together", "Correct: bride wealth honours the bride's family and creates a lasting bond."],
      ["To purchase the bride as the husband's property", "Bride wealth is not a purchase; a wife is not property."],
      ["To pay the go-between for his services", "The go-between is not paid from the bride wealth."],
      ["To pay the chief for permission for the marriage", "Bride wealth goes to the bride's family, not to the chief."],
    ],
    answer: "A",
    explanation: "Roora/lobola shows the groom's respect and commitment, thanks the bride's family for raising her and links the two families as in-laws.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The small payment made at the start of negotiations so that talks can begin is called …",
    options: [
      ["vhuramuromo / isivulamlomo", "Correct: the 'mouth-opener' allows talks to start."],
      ["mombe yeumai / inkomo yohlanga", "This is the mother's cow, part of the bride wealth agreed later."],
      ["kuperekwa / umthimba", "This is handing over the bride, at the end of the process."],
      ["nhimbe / ilima", "This is a communal work party, not part of marriage talks."],
    ],
    answer: "A",
    explanation: "Vhuramuromo (Shona) and isivulamlomo (Ndebele) both mean 'opening the mouth': a token that allows the bride's family to begin talking.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which person usually escorts the bride to her husband's family during kuperekwa/umthimba?",
    options: [
      ["her paternal aunt (vatete/ubabakazi)", "Correct: the aunt leads the bride and her party."],
      ["the groom's go-between (munyai/umkhongi)", "The go-between represents the groom's side in negotiations."],
      ["the groom's maternal uncle (sekuru/umalume)", "The groom's uncle counsels the groom; he does not escort the bride."],
      ["her younger brother, acting on his own", "A brother may join the party, but the aunt leads it."],
    ],
    answer: "A",
    explanation: "The aunt leads the bride's party, hands her over and continues to counsel her in her new home.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A young wife in Hwange is unhappy because her in-laws criticise her in public. According to indigenous practice, whom should she approach **first**?",
    options: [
      ["her aunt (vatete/ubabakazi)", "Correct: the aunt is the bride's first marriage counsellor."],
      ["a magistrates court", "Courts are a last resort, after family counselling fails."],
      ["the go-between who negotiated the marriage", "The go-between's main role ended with the negotiations."],
      ["a newspaper's advice column", "Indigenous practice keeps marriage problems within the family counsellors."],
    ],
    answer: "A",
    hints: ["Who counsels the bride before and after the marriage?"],
    explanation: "Marriage problems go first to the counsellors, the aunt for the wife and the uncle for the husband, who know both families and try to reconcile the couple.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which form of marriage is **illegal** in Zimbabwe today?",
    options: [
      ["kuzvarira, pledging a girl in marriage", "Correct: pledging a child is child marriage and forced marriage, both illegal."],
      ["kutizira, elopement by two consenting adults", "Elopement between consenting adults is lawful; the families then negotiate."],
      ["a customary marriage with roora/lobola", "Customary marriage between consenting adults is lawful."],
      ["a church wedding registered as a civil marriage", "A registered religious or civil marriage is lawful."],
    ],
    answer: "A",
    hints: ["Think about age and consent."],
    explanation: "Kuzvarira involves pledging a girl, often a child, without her free consent. The Constitution sets 18 as the minimum age of marriage and requires free consent.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is the go-between system useful in marriage negotiations?",
    options: [
      ["It keeps the talks polite and protects the dignity of both families", "Correct: a third party prevents direct bargaining and quarrels."],
      ["It lets the groom avoid paying any bride wealth at all", "The go-between negotiates bride wealth; he does not cancel it."],
      ["It ensures the bride's family decides everything alone", "Both families take part through the go-between."],
      ["It removes any need for the bride herself to consent to the marriage being arranged", "Consent is required by law and custom; the go-between does not replace it."],
    ],
    answer: "A",
    hints: ["What could go wrong if the two families bargained face to face?"],
    explanation: "Because a respected third party carries the messages, nobody bargains in anger, misunderstandings are smoothed over and both families keep their dignity.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The groom's maternal uncle (sekuru/umalume) is usually his marriage counsellor.",
    answer: true,
    explanation: "True. The maternal uncle advises the groom, just as the paternal aunt advises the bride.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A widow is required by law to accept being inherited by a relative of her late husband (kugara nhaka).",
    answer: false,
    explanation: "False. Kugara nhaka can only take place with the widow's free consent; she may refuse and keep her rights.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of indigenous marriage with its description.",
    pairs: [
      ["kutizira", "a young woman elopes to the man's home before negotiations"],
      ["kutema ugariri", "a young man works for his in-laws instead of paying bride wealth"],
      ["chimutsamapfihwa", "a relative of a late wife marries the widower to care for the children"],
      ["musengabere", "a woman is seized by force to be married (illegal)"],
    ],
    explanation: "Kutizira is elopement; kutema ugariri is working for bride wealth; chimutsamapfihwa replaces a deceased wife; musengabere is forced abduction, now illegal.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The bride's marriage counsellor is her {{blank:a}}. The ceremony of handing the bride over to her husband's family is called {{blank:b}} in Shona.",
    blanks: [
      { id: "a", accepted: ["paternal aunt"], choices: ["paternal aunt", "maternal grandmother", "go-between", "elder sister"] },
      { id: "b", accepted: ["kuperekwa"], choices: ["kuperekwa", "kurova guva", "kutizira", "kupfimba"] },
    ],
    explanation: "The paternal aunt (vatete) counsels the bride; kuperekwa (umthimba in Ndebele) is the handing over. Kurova guva is a death ceremony; kutizira is elopement; kupfimba is proposing love.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the statement about the law.",
    template: "No person under the age of {{blank:a}} may marry in Zimbabwe, and every marriage needs the free and full {{blank:b}} of both people.",
    blanks: [
      { id: "a", accepted: ["18"], choices: ["16", "18", "21", "14"] },
      { id: "b", accepted: ["consent"], choices: ["consent", "payment", "registration", "approval of the chief"] },
    ],
    hints: ["The same age is the age of majority."],
    explanation: "Section 78 of the Constitution sets 18 as the minimum age of marriage and requires free and full consent.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona **or** Ndebele term for bride wealth.",
    accepted: ["roora", "lobola", "lobolo", "rovora"],
    wrong: ["rutsambo only", "danga"],
    explanation: "**Roora** (Shona) and **lobola** (Ndebele) are the terms for bride wealth.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** duties of the aunt (vatete/ubabakazi) as a marriage counsellor.",
    points: [
      "Any one of: advising the girl during courtship; meeting/checking the suitor; attending negotiations; escorting the bride (kuperekwa/umthimba); teaching respect for in-laws; teaching household duties; settling marriage disputes",
      "A second duty from the list",
      "A third different duty",
    ],
    modelAnswer: "She advises the girl about the suitor, escorts the bride to her husband's home and helps settle quarrels in the marriage.",
    explanation: "One mark per correct duty.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** values of marriage to a community.",
    points: [
      "Identifies cooperation between families / in-laws",
      "Explains that the two families support each other at funerals, ceremonies and in hard times",
      "Identifies a stable home for children / continuity of the family",
      "Explains that children are raised and socialised, so the family name and heritage continue",
    ],
    modelAnswer: "Marriage joins two families as in-laws, so they cooperate and support each other at funerals, ceremonies and in hard times. It also provides a stable home where children are raised and taught the community's values, so the family name and heritage continue.",
    hints: ["Each value needs an effect on the community."],
    explanation: "One mark for each value and one for its developed explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A community in Lupane learns that a 14-year-old girl has been pledged in marriage to settle a family debt. Suggest **two** actions the community should take, and explain each.",
    points: [
      "Suggests reporting the case to the police (e.g. the Victim Friendly Unit), a teacher or social services",
      "Explains that pledging a child is illegal, so the authorities can protect her and stop the marriage",
      "Suggests keeping the girl in school / educating families about the law and children's rights",
      "Explains that this protects her future and prevents other families from doing the same",
    ],
    modelAnswer: "They should report the case to the police, for example the Victim Friendly Unit, or to her school and social services, because pledging a child is illegal and the authorities can protect her and stop the marriage. They should also make sure she stays in school and hold meetings to teach families about the law and children's rights, which protects her future and helps prevent other girls from being pledged.",
    hints: ["Who can protect her, and how can it be prevented next time?"],
    explanation: "Credit sensible actions (1 each) with explanations linked to the law or the girl's welfare (1 each).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description of a family event in a fictional school essay, Marondera, 2026",
      "Last month my sister Rudo's marriage was arranged. Tafadzwa's family sent Mr Moyo, who paid a small amount before my father would speak. The talks lasted all day. My aunt sat with Rudo throughout. Two weeks later, my aunt and other women of our family sang as they led Rudo to Tafadzwa's home, where his family welcomed her with food and gifts.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What was Mr Moyo's role in the source?",
        options: [
          ["the go-between (munyai/umkhongi)", "Correct: he was sent by the groom's family to negotiate."],
          ["the bride's marriage counsellor", "The bride's counsellor is her aunt, who sat with Rudo."],
          ["the village head of the area", "Nothing suggests he was a traditional leader."],
          ["the groom's younger brother", "He is described as someone sent by the family, not as a brother."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** steps of indigenous marriage described in the source.",
        points: ["Paying the mouth-opener (vhuramuromo/isivulamlomo) / negotiations", "Handing over the bride (kuperekwa/umthimba)"],
        modelAnswer: "The payment to open talks (vhuramuromo) and the handing over of the bride (kuperekwa).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain the importance of the aunt's role shown in the source.",
        points: [
          "She supported and advised Rudo during negotiations",
          "She led the bride's party, representing the bride's family with dignity",
          "She remains Rudo's counsellor and link to her family, helping to settle future problems",
        ],
        modelAnswer: "The aunt supported and advised Rudo throughout the negotiations. She led the bride's party to the husband's home, representing the family with dignity. She also remains Rudo's counsellor and her link to her own family, so she can help settle problems in the marriage later.",
      }),
    ],
    hints: ["In (b), find what happened at the start of the talks and at the end."],
    explanation: "A source-based practice item on the go-between, the steps of marriage and the aunt's role.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about roora/lobola today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which roora/lobola has changed over time.",
        points: [
          ["Payment in money rather than mainly cattle / payment in instalments", 2],
          ["Wide variation in amounts, with some families asking for very large sums / combined with church weddings and civil registration", 2],
        ],
        modelAnswer: "In the past bride wealth was paid mainly in cattle; today much of it is paid in money, often in instalments. Amounts now vary widely, with some families asking for very large sums, and many couples combine roora/lobola with a church wedding and civil registration.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Roora/lobola has lost its original meaning.\" How far do you agree?",
        points: [
          ["For: some families make very high demands, treating it as income; it can burden young couples with debt", 2],
          ["For: some men use payment to claim control over a wife, which is a misuse of the custom", 2],
          ["Against: it still shows respect, thanks the bride's family and binds families; many families agree modest amounts and instalments", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. Some families ask for very large sums of money, which makes roora/lobola look like a source of income rather than a token of respect, and young couples may start married life in debt. A few men also misuse the payment to claim control over their wives, which was never its purpose.\n\nHowever, for most families the original meaning remains. Roora/lobola still shows the groom's respect and commitment, thanks the bride's family, and joins two families who support each other for life. Many families agree modest amounts and allow payment in instalments, and the negotiations, the go-between and the aunt's role are still carried out with care.\n\nI agree only to a limited extent. The custom has changed in form, from cattle to money, and it is sometimes misused, but its main meaning of respect and family unity survives in most marriages.",
      }),
    ],
    hints: ["In (b), separate changes in form from changes in meaning."],
    explanation: "A practice evaluative item: describe changes in bride wealth, then judge whether its meaning has been lost.",
  });

  b.card("DEFINITION", "Go-between (munyai / umkhongi)", "A respected person chosen by the groom's family to lead marriage negotiations with the bride's family.");
  b.card("DEFINITION", "Roora / lobola", "Bride wealth given by the groom's family to the bride's family: a token of respect that binds the two families.");
  b.card("FACT", "What is vhuramuromo (isivulamlomo)?", "A small payment that 'opens the mouth' so that marriage negotiations can begin.");
  b.card("FACT", "What is kuperekwa (umthimba)?", "The handing over of the bride, escorted by her aunt and relatives, to her husband's family.");
  b.card("FACT", "Who are the marriage counsellors of the bride and the groom?", "The bride: her paternal aunt (vatete/ubabakazi). The groom: usually his maternal uncle (sekuru/umalume).");
  b.card("CONCEPT", "Why are kuzvarira and musengabere illegal?", "They involve children or a lack of free consent: child marriage and forced marriage are against the law.");
  b.card("FACT", "What is the minimum age of marriage in Zimbabwe?", "18 (section 78 of the Constitution); both people must consent freely.");
  b.card("CONCEPT", "Name four values of marriage.", "Dignity and respect, cooperation between families, a stable home for children, continuity of the family name and heritage.");
  b.card("DEFINITION", "Kutema ugariri", "A form of indigenous marriage in which a young man works for his in-laws instead of paying bride wealth.");
});
