// W2a: Indigenous and contemporary courtship (her.culture.courtship).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.courtship", { file: "culture/courtship", keyPrefix: "culture.courtship" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **courtship**?",
    options: [
      ["The period in which two people get to know each other before deciding to marry", "Correct: courtship comes before the decision to marry."],
      ["The payment of bride wealth in cattle and money by the groom's family to the bride's family", "This is roora/lobola, part of the marriage process, not courtship."],
      ["The ceremony at which a bride is handed over to her husband's family", "This is kuperekwa/umthimba, which happens after marriage negotiations."],
      ["The advice that aunts give a newly married woman about her home", "This is marriage counselling, which follows the marriage agreement."],
    ],
    answer: "A",
    explanation: "Courtship is the getting-to-know-you stage. Bride wealth, handing over the bride and marriage counselling all belong to the marriage process that may follow.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In indigenous courtship, a young woman usually reported a new suitor first to her …",
    options: [
      ["aunt (vatete/ubabakazi)", "Correct: the paternal aunt advised girls and checked the suitor's background."],
      ["grandfather", "Grandfathers advised the family, but a girl's first confidante in courtship was her aunt."],
      ["chief", "The chief dealt with land and disputes, not with a girl's courtship."],
      ["go-between (munyai/umkhongi)", "The go-between is sent later, by the man's family, to open marriage talks."],
    ],
    answer: "A",
    explanation: "Aunts (vatete/ubabakazi) were a girl's main advisers in courtship: they listened, checked the young man's family and totem, and taught behaviour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was a common meeting place for young people courting in indigenous society?",
    options: [
      ["the river or well where water was fetched", "Correct: daily tasks such as fetching water brought young people together in public."],
      ["the dare/inkundla where elders tried cases", "The court of elders was for men's affairs and disputes, not a courting place."],
      ["the sacred shrine used for rain-making", "Shrines were places of worship and respect, not of courtship."],
      ["the hut of the bride's mother at night", "Courtship took place in public settings; secret meetings at night were discouraged."],
    ],
    answer: "A",
    explanation: "Rivers, wells, fields, work parties and village dances were public places where young people met while elders could see them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In many Shona communities, what did a young woman's gift of beads (chuma) to a suitor show?",
    options: [
      ["that she accepted his proposal", "Correct: a token such as beads showed acceptance."],
      ["that bride wealth had been paid in full", "Bride wealth is paid by the man's family later, not shown by a girl's beads."],
      ["that the couple were already married", "The token marked acceptance during courtship, not marriage."],
      ["that she rejected him and wanted no further visits", "Giving a token was a sign of agreement, not rejection."],
    ],
    answer: "A",
    explanation: "Tokens of love such as beads, a bracelet or a small cloth showed that the young woman had accepted the young man's proposal.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha meets a young man online who says he works in South Africa. Before agreeing to meet him, which step **best** follows the safeguard used in indigenous courtship?",
    options: [
      ["Telling her aunt and letting her family meet him first", "Correct: involving a trusted elder was the key indigenous safeguard."],
      ["Sending him money so that he can travel to visit her", "Sending money to someone she has never met is risky and is a common online fraud."],
      ["Keeping the relationship secret from her family members", "Secrecy removes the protection that family involvement gives."],
      ["Meeting him alone at a lodge he chooses in another town", "Meeting alone in a place chosen by a stranger is unsafe."],
    ],
    answer: "A",
    hints: ["Who checked a suitor's background in indigenous courtship?"],
    explanation: "Indigenous courtship protected young people by involving aunts and uncles, who checked a suitor's background. Telling a trusted elder and letting the family meet him keeps that protection.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did elders check a suitor's **totem** during indigenous courtship?",
    options: [
      ["To make sure the couple were not close relatives of the same clan", "Correct: marriage within the clan was forbidden."],
      ["To decide how many cattle the bride's family would ask for as roora/lobola", "The amount of roora/lobola was negotiated later and did not depend on the totem."],
      ["To decide which church the couple would attend", "Totems are about clan identity, not religious membership."],
      ["To find out how much land the young man owned", "Land came from the chief; the totem shows clan, not wealth."],
    ],
    answer: "A",
    hints: ["Totems show which clan a person belongs to."],
    explanation: "A shared totem usually meant a shared clan, and marriage within the clan was taboo. Checking totems prevented marriage between close relatives.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **best** evaluation of contemporary courtship?",
    options: [
      ["It gives couples free choice, but it often has fewer checks on a partner's background", "Correct: it weighs a strength against a weakness."],
      ["It is always better because elders are no longer involved in it", "One-sided: the loss of elders' guidance is also a weakness."],
      ["It is always worse because it began in other parts of the world", "One-sided, and 'foreign' does not mean 'bad'."],
      ["It is exactly the same as indigenous courtship, except that couples now use phones to keep in touch", "It also differs in who guides the couple, where they meet and how fast it moves."],
    ],
    answer: "A",
    hints: ["An evaluation weighs strengths against weaknesses."],
    explanation: "A good evaluation gives both sides: contemporary courtship respects free choice, but it can lack the family checks and guidance of indigenous courtship.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In indigenous courtship, a young man often sought advice from his uncle (sekuru/umalume) or older brothers.",
    answer: true,
    explanation: "True. Boys were advised by uncles and older brothers, just as girls were advised by their aunts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In indigenous courtship, a young woman was expected to accept a proposal at once.",
    answer: false,
    explanation: "False. A young woman was expected to take her time, and the young man had to show patience and good character before she accepted.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of contemporary courtship with an example of it.",
    pairs: [
      ["religious courtship", "a couple meeting at a church youth fellowship"],
      ["online courtship", "a couple meeting through a messaging app"],
      ["social courtship", "a couple meeting through friends at a wedding"],
      ["western-influenced courtship", "a couple choosing each other on a date with no family involvement"],
    ],
    explanation: "Faith groups shape religious courtship; technology shapes online courtship; ordinary social life shapes social courtship; films and media shape western-style dating.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In Shona, a young man who proposes love is said to {{blank:a}}. In Ndebele, a young woman who chooses and accepts a suitor is said to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["pfimba"], choices: ["pfimba", "pereka", "tizira", "zvarira"] },
      { id: "b", accepted: ["qoma"], choices: ["qoma", "lobola", "khonga", "dlozi"] },
    ],
    explanation: "Kupfimba is the Shona term for proposing love; ukuqoma is the Ndebele term for a girl choosing a suitor. Kuperekwa is handing over a bride; kutizira is elopement; kuzvarira is the illegal pledging of a girl.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the comparison.",
    template: "Indigenous courtship was mainly guided by the {{blank:a}}, while contemporary courtship is mainly managed by the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["extended family"], choices: ["extended family", "government", "school", "media"] },
      { id: "b", accepted: ["couple"], choices: ["couple", "chief", "go-between", "government"] },
    ],
    hints: ["Who had the most say in each period?"],
    explanation: "Aunts, uncles and other relatives guided indigenous courtship; today the couple usually choose and manage the relationship themselves.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name **one** token of love that a young woman might give a suitor in indigenous courtship.",
    accepted: ["beads", "chuma", "a bracelet", "bracelet", "bangle", "a cloth", "cloth", "handkerchief", "a handkerchief"],
    wrong: ["cattle", "money"],
    explanation: "Beads (chuma), a bracelet or a small cloth were common tokens. Cattle belong to roora/lobola, paid later by the man's family.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** places where young people met during indigenous courtship.",
    points: [
      "Any one of: river, well, fields, work party (nhimbe/ilima), village dance, beer party, grinding place, path to the fields",
      "A second place from the list",
      "A third different place",
    ],
    modelAnswer: "At the river, in the fields and at village dances.",
    explanation: "One mark per correct place; *state* needs no explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of indigenous courtship.",
    points: [
      "Identifies family checks on the partner (background, character, totem)",
      "Explains that this protected young people from marrying close relatives or people of bad character",
      "Identifies guidance from aunts and uncles",
      "Explains that young people learned respect and were prepared for married life",
    ],
    modelAnswer: "Elders checked the suitor's family, character and totem, which protected young people from marrying a close relative or someone with a bad reputation. Aunts and uncles also advised the couple, so they learned respect and self-control and were prepared for the duties of married life.",
    hints: ["Each advantage needs a feature and what it achieved."],
    explanation: "One mark for each advantage and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which young people can court safely online, and explain how each protects them.",
    points: [
      "Suggests involving a trusted adult or family member before meeting",
      "Explains that the adult can check the person's background and give advice, as aunts and uncles did",
      "Suggests meeting only in public places with friends present / not sending money or private photos",
      "Explains that this reduces the risk of deception, fraud or exploitation",
    ],
    modelAnswer: "They should tell a trusted adult, such as an aunt, before meeting anyone they met online; the adult can help check the person's background and give advice, as aunts and uncles did in indigenous courtship. They should meet only in public places with friends present and never send money or private photos, which reduces the risk of fraud, deception and exploitation.",
    hints: ["Think about who can help and where and how to meet."],
    explanation: "Credit any sensible safeguard (1) with an explanation of how it protects (1).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a letter to the advice column of a fictional youth magazine, 2026",
      "Dear Sisi Chipo, I am 19 and at college in Gweru. A young man I met in my church choir wants to marry me. My parents say he must first meet my aunt, and my aunt wants to know his family and totem. My friends say this is old-fashioned and that we should just decide ourselves. Who is right? — Thandeka") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which form of contemporary courtship does Thandeka's story show?",
        options: [
          ["religious courtship", "Correct: they met in a church choir."],
          ["online courtship", "They met in person at church, not online."],
          ["arranged marriage by pledging", "Pledging a girl (kuzvarira) is illegal and is not what the letter describes."],
          ["courtship at a village work party", "They met in a church choir, not at a nhimbe/ilima."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** indigenous practices that Thandeka's family wants to keep.",
        points: ["The suitor meeting the aunt / involving the aunt", "Checking the young man's family background and totem"],
        modelAnswer: "The young man must meet her aunt; the aunt wants to check his family and totem.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the family's request could benefit Thandeka.",
        points: [
          "The aunt can check the young man's family and character, protecting her from a bad match",
          "The totem check ensures they are not close relatives",
          "Both families are involved early, which supports the marriage later / she receives advice",
        ],
        modelAnswer: "Her aunt can find out about the young man's family and character, which protects Thandeka from a bad match. Checking his totem makes sure they are not close relatives. Involving both families early also means she gets advice and the families will support the marriage later.",
      }),
    ],
    hints: ["In (c), think about protection, kinship and family support."],
    explanation: "A source-based practice item: identify the form of courtship and the indigenous practices kept, then explain their benefits.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about courtship in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** disadvantages of contemporary courtship.",
        points: [
          ["Fewer family checks: a partner's background, character or health may be unknown; deception is easier, especially online", 2],
          ["Peer and media pressure towards early sexual relationships, with risks of unplanned pregnancy or infection / relationships that begin and end quickly", 2],
        ],
        modelAnswer: "With less family involvement, a young person may know little about a partner's family, character or health, and online it is easy for someone to give false information. Peer pressure and the media can also push young people into early sexual relationships, with risks of unplanned pregnancy and sexually transmitted infections.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous courtship was better than contemporary courtship.\" How far do you agree?",
        points: [
          ["For: elders' checks on background and totem; guidance on respect; public, slow courtship discouraged deception", 2],
          ["Against: family pressure limited free choice; girls often had less say; harmful practices such as pledging existed", 2],
          ["Contemporary strengths: free choice, shared interests, faith-based counselling, contact across distance", 2],
          ["Supported judgement, e.g. the best practice today combines free choice with family guidance", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is a case for the statement. In indigenous courtship elders checked a suitor's family, character and totem, which protected young people from bad matches and from marrying close relatives. Aunts and uncles taught respect and self-control, and courtship in public places discouraged deception.\n\nHowever, indigenous courtship also had weaknesses. Family pressure could limit free choice, girls often had less say than boys, and harmful practices such as pledging girls existed in some communities. Contemporary courtship respects the free choice of both partners, allows couples to find partners with similar education and faith, and many religious groups offer counselling.\n\nI agree only partly. Indigenous courtship was better at protecting young people, but contemporary courtship is better at respecting their rights. The best practice today combines the two: the couple choose freely, but they involve aunts, uncles and parents, who can still give advice and check a partner's background.",
      }),
    ],
    hints: ["In (b), give strengths and weaknesses of both forms before you judge."],
    explanation: "A practice evaluative item: describe weaknesses of modern courtship, then weigh the two forms and reach a supported judgement.",
  });

  b.card("DEFINITION", "Courtship", "The period and practices by which two unmarried people get to know each other, with a view to marriage.");
  b.card("FACT", "Name three meeting places of indigenous courtship.", "Any three of: the river or well, the fields, work parties (nhimbe/ilima), village dances, the path to the fields.");
  b.card("FACT", "Who advised a girl about a suitor in indigenous courtship?", "Her aunt (vatete/ubabakazi).");
  b.card("FACT", "Who advised a young man during indigenous courtship?", "His uncle (sekuru/umalume) and older brothers.");
  b.card("CONCEPT", "What did a token such as beads (chuma) show in indigenous courtship?", "That the young woman had accepted the young man's proposal.");
  b.card("FACT", "Name four forms of contemporary courtship.", "Social, religious, western-influenced and online courtship.");
  b.card("CONCEPT", "Why were totems checked in indigenous courtship?", "To make sure the couple were not of the same clan, because marriage between close relatives was forbidden.");
  b.card("CONCEPT", "Give one advantage and one disadvantage of contemporary courtship.", "Advantage: free choice by the couple. Disadvantage: fewer family checks, so deception (especially online) is easier.");
  b.card("CONCEPT", "How can a young person combine modern courtship with indigenous safeguards?", "Choose freely, but tell a trusted aunt, uncle or parent and let the family meet the partner before the relationship becomes serious.");
});
