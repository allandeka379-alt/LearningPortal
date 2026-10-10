// W1a: worship, rituals and sacred days in Indigenous Religion (frs.indigenous.worship-rituals).
// Reviewer note: the day on which chisi is observed varies by chiefdom; no single day is examined.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.worship-rituals", { file: "indigenous/worship-rituals", keyPrefix: "indigenous.worship-rituals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the purpose of the **mukwerera** (ukucela izulu) ceremony?",
    options: [
      ["To ask God and the ancestors for rain and a good harvest", "Correct: it is the rain-making ceremony."],
      ["To bring the spirit of a dead person home to the family", "That is kurova guva (umbuyiso)."],
      ["To help a neighbour with a large task in the fields", "That is a work party, nhimbe (ilima)."],
      ["To mark the arrival of a baby into the family", "That is a naming or birth rite."],
    ],
    answer: "A",
    explanation: "**Mukwerera** (Shona) or **ukucela izulu** (Ndebele) is the ceremony in which a community asks God and the ancestors for rain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **libation**?",
    options: [
      ["An offering made by pouring out a drink such as beer", "Correct: libations are often poured on the ground with words to the ancestors."],
      ["A song sung by a spirit medium during possession at night", "That is a song, not an offering of a drink."],
      ["A rule that forbids work in the fields on a certain day", "That is chisi, a day of rest."],
      ["A cloth worn by an elder when speaking to the ancestors", "That is attire, not a libation."],
    ],
    answer: "A",
    explanation: "A **libation** is the pouring of a drink as an offering. In Indigenous Religion, doro (Shona) or umqombothi (Ndebele) may be poured as thanks and honour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **bira** (ukuthetha in Ndebele)?",
    options: [
      ["A ceremony with mbira music in which a family consults its ancestors", "Correct: it is a religious meeting of the living and the ancestors."],
      ["A meeting of the district council to decide the use of a new borehole", "That is a civic meeting, not a bira."],
      ["A formal examination taken at the end of the school year", "That is an examination."],
      ["A feast that is held only to celebrate a new job or a promotion", "A bira has a religious purpose."],
    ],
    answer: "A",
    explanation: "A **bira** is a religious ceremony. It is often held at night, with mbira music, and it honours and consults the ancestors.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is **chisi** in many Shona chiefdoms?",
    options: [
      ["A day of rest on which fields are not worked, in many chiefdoms", "Correct: the day differs between chiefdoms."],
      ["A drum played at night to call people to a ceremony of the village", "A drum is an object; chisi is a day."],
      ["A beer made from grain and offered to the ancestors at a bira", "That is traditional beer, doro."],
      ["A cloth worn by a medium to show that a spirit is present", "That is attire."],
    ],
    answer: "A",
    explanation: "**Chisi** is a day of rest in many chiefdoms. Which day it falls on differs from place to place.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The rains are late. The chief and elders ask each household for a little grain, beer is brewed and the community gathers with the medium to pray, sing and make offerings. Which ceremony is this?",
    options: [
      ["Mukwerera / ukucela izulu", "Correct: the community is asking for rain."],
      ["Kurova guva / umbuyiso", "That ceremony brings the spirit of a dead person home."],
      ["A bira for one family", "A bira is usually for one family, but this is the whole community asking for rain."],
      ["An initiation rite for young people", "No initiation is described."],
    ],
    answer: "A",
    hints: ["Why are the people gathering?"],
    explanation: "A community-wide gathering to ask for rain is **mukwerera/ukucela izulu**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are music, dance and clapping important in Indigenous Religion rituals?",
    options: [
      ["They express feeling, mark the event as sacred and call the ancestors", "Correct: they are part of the worship, not an addition to it."],
      ["They are added only to attract tourists to the ceremony", "Their purpose is religious and communal."],
      ["They replace any need for prayers or offerings during a ceremony", "They accompany prayers and offerings."],
      ["They are performed by visitors only and not by the family", "Family and community members take part."],
    ],
    answer: "A",
    hints: ["Think of what the mbira and the singing do at a bira."],
    explanation: "Music and dance are **part of worship**: they express feeling and thanks, set the occasion apart and, for believers, help to call the ancestors.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the **best** reason why the whole community follows chisi?",
    options: [
      ["It is a shared custom that respects the land and gives a common day of rest", "Correct: it is religious, social and fair."],
      ["It allows one family to use the land for as long as it wishes", "It applies to everyone alike."],
      ["It is a rule made by missionaries to stop people from farming", "It is a custom of Indigenous Religion."],
      ["It is only a rule for visitors who come from outside the area", "The rule applies to the community itself."],
    ],
    answer: "A",
    hints: ["Think of religious, social and practical reasons."],
    explanation: "Chisi has **religious** (respect for land and ancestors), **social** (a shared day of rest) and **practical** (rest for people and land) purposes.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **fairest** description of rituals in Indigenous Religion?",
    options: [
      ["They are religious acts that express thanks and strengthen unity", "Correct: it explains the purposes as believers understand them."],
      ["They are meaningless customs that have no effect on the people who take part", "Rituals clearly matter to participants."],
      ["They are performed only by priests and are closed to families", "Families and communities take part."],
      ["They are forced on people and give them no choice about taking part", "This is a one-sided claim and does not describe the purpose of the rituals."],
    ],
    answer: "A",
    hints: ["Which statement describes the rituals as their followers understand them?"],
    explanation: "A fair description reports the purposes that followers give: thanksgiving, requests, guidance and unity.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Traditional beer is commonly used as an offering in Indigenous Religion ceremonies.",
    answer: true,
    explanation: "True. Beer (doro in Shona, umqombothi in Ndebele) is poured as a libation and shared at ceremonies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bira is only an entertainment event and has no religious purpose.",
    answer: false,
    explanation: "False. A bira includes music and dance, but it is a religious ceremony in which the family honours and consults the ancestors.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ritual with its main purpose.",
    pairs: [
      ["Mukwerera / ukucela izulu", "Asking God and the ancestors for rain"],
      ["Bira / ukuthetha", "Honouring and consulting the ancestors with music and dance"],
      ["First-fruits ceremony", "Giving thanks for the new harvest"],
      ["Chisi", "A day of rest from fieldwork in respect of the land"],
    ],
    explanation: "Mukwerera asks for rain; the bira honours and consults the ancestors; first-fruits ceremonies thank for the harvest; chisi is a day of rest.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Ndebele name for the rain ceremony is {{blank:a}}, and traditional beer in Ndebele is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["ukucela izulu"], choices: ["ukucela izulu", "umbuyiso", "ukuthetha", "ilima"] },
      { id: "b", accepted: ["umqombothi"], choices: ["umqombothi", "doro", "isigubhu", "isibongo"] },
    ],
    explanation: "The Ndebele rain ceremony is **ukucela izulu**, and traditional beer is **umqombothi** (doro in Shona).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What Shona word describes a day of rest on which fields are not worked, in respect of the land and the ancestors?",
    accepted: ["chisi", "Chisi"],
    wrong: ["bira", "nhimbe"],
    explanation: "**Chisi** is the day of rest observed in many Shona chiefdoms.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** things that are offered or used in worship in Indigenous Religion.",
    points: ["Traditional beer (doro, umqombothi)", "Snuff", "Any one of: food, grain, the mbira and drums, songs and prayers"],
    modelAnswer: "Traditional beer, snuff and food.",
    explanation: "One mark for each item correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a bira is held.",
    points: [
      "Identifies: to thank the ancestors (e.g. for health or a good harvest)",
      "Develops: believers hold that the ancestors protect the family, so thanks keeps the relationship strong",
      "Identifies: to ask for guidance or help (e.g. in a time of illness or trouble)",
      "Develops: the ancestors speak through a medium or in other ways, and the family acts on the guidance",
    ],
    modelAnswer: "A bira is held to thank the ancestors, for example for health or a good harvest, because believers hold that the ancestors protect the family and thanks keeps the relationship strong. It is also held to ask for guidance in a time of trouble, when the ancestors are believed to speak through a medium and the family acts on the guidance.",
    hints: ["Think of thanks and of asking for help."],
    explanation: "Two marks for each reason: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the mukwerera ceremony helps to unite a community.",
    points: [
      "The whole community gathers for a shared purpose that affects everyone (rain)",
      "Households contribute grain and work together to prepare the ceremony",
      "Families who have quarrelled are encouraged to make peace before taking part",
      "Shared singing, prayer and a meal strengthen a sense of belonging",
    ],
    modelAnswer: "The whole community gathers for a purpose that affects everyone, the rain. Households contribute grain and work together to prepare the beer, and families who have quarrelled are encouraged to make peace before taking part. Singing, prayer and a shared meal strengthen the sense of belonging.",
    hints: ["Who takes part, and what do they do together?"],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "an account written by a fictional Form 4 learner in Gweru, 2026",
      "The night before the ceremony, my aunts brewed beer in large clay pots. In the morning, relatives from Harare and Bulawayo arrived. After the elders spoke to our grandfather's spirit and poured beer on the ground, the mbira began and the singing went on until sunrise. My grandmother said that we do this to thank our ancestors and to ask them to guide the family. Everyone was reminded to settle any quarrels before the ceremony ended.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which ritual act is shown by the elders pouring beer on the ground?",
        options: [
          ["A libation", "Correct: pouring a drink as an offering is a libation."],
          ["An initiation rite", "No initiation is described."],
          ["A first-fruits ceremony", "Nothing in the source concerns the harvest."],
          ["A work party", "A work party is a practical gathering."],
        ],
        answer: "A",
        explanation: "Pouring beer on the ground with words to the ancestors is a **libation**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** reasons for the ceremony given in Source A.",
        points: ["To thank the ancestors", "To ask the ancestors to guide the family"],
        modelAnswer: "To thank the ancestors and to ask them to guide the family.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the ceremony in Source A strengthens family unity.",
        points: [
          "Relatives travel from different towns to take part, which brings the family together",
          "Aunts and others share tasks such as brewing beer, so the family works together",
          "The family is reminded to settle quarrels before the ceremony ends, which restores peace",
        ],
        modelAnswer: "Relatives travel from other towns to take part, which brings the family together. The aunts share tasks such as brewing beer, and everyone is reminded to settle quarrels before the ceremony ends, which restores peace in the family.",
      }),
    ],
    hints: ["In (c), look at who comes, what they do, and what they are reminded to do."],
    explanation: "A source on a family ceremony with offerings, prayers and music.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on worship and rituals in Indigenous Religion.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which music and dance are used in Indigenous Religion rituals.",
        points: [
          "The mbira, drums and rattles accompany the bira and other ceremonies",
          "Developed (e.g. the music sets the ceremony apart and, for believers, helps to call the ancestors)",
          "Singing, clapping and dancing express thanks and feeling and unite those present",
          "Developed (e.g. at mukwerera the community sings and claps together as it asks for rain)",
        ],
        modelAnswer: "The mbira, drums and rattles accompany the bira, setting the ceremony apart and, for believers, helping to call the ancestors. Singing, clapping and dancing also express thanks and bring people together, as when a community sings and claps together at mukwerera while asking for rain.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Rituals such as mukwerera and the bira are still important to Zimbabweans today.\" To what extent do you agree?",
        points: [
          ["For: they keep the link with the ancestors, give thanks and ask for help; communities and families still hold them; they unite families and pass on songs, praises and customs to the young", 2],
          ["For: they respond to real needs such as drought, illness and family tension", 2],
          ["Against / limits: some people no longer take part because of other religions, town life or cost; some Christians and Muslims do not take part in some rituals; practices change", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I agree to a large extent. Rituals such as mukwerera and the bira are still held by many families and communities. They keep the link with the ancestors, give thanks and ask for help, and they respond to real needs such as drought, illness and family tension. They also bring relatives together and pass on songs, praises and customs to the young.\n\nHowever, not everyone takes part. Some people follow other religions that do not include these rituals, some town dwellers find it hard to return home, and costs can be a burden. The practices also change over time.\n\nOverall, these rituals remain important to many Zimbabweans, even though they are not important to everyone, and they continue to adapt.",
      }),
    ],
    hints: ["In (b), give reasons they still matter, then reasons for a different view."],
    explanation: "Describe music and dance in ritual (a) and assess the continuing importance of rituals (b).",
  });

  b.card("DEFINITION", "Libation", "The pouring out of a drink, such as traditional beer, as an offering to the ancestors.");
  b.card("DEFINITION", "Bira (ukuthetha)", "A ceremony, often at night, with mbira music, singing and dancing, at which a family honours and consults its ancestors.");
  b.card("DEFINITION", "Mukwerera (ukucela izulu)", "The rain-making ceremony in which a community, led by elders and a medium, asks God and the ancestors for rain.");
  b.card("DEFINITION", "Chisi", "A day of rest observed in many Shona chiefdoms, when fields are not worked, in respect of the land and the ancestors.");
  b.card("FACT", "What are the Shona and Ndebele names for traditional beer?", "Doro (Shona) and umqombothi (Ndebele).");
  b.card("FACT", "What was the inxwala?", "The national first-fruits ceremony of the Ndebele state, held at the king's capital.");
  b.card("FACT", "What instruments are used at a bira?", "The mbira, drums (ngoma) and rattles (hosho), with singing and clapping.");
  b.card("CONCEPT", "Why is a bira a religious event and not just a party?", "Its purpose is to honour and consult the ancestors, to give thanks and to seek guidance; the music and food are part of the worship.");
  b.card("CONCEPT", "What are the reasons for observing chisi?", "Religious (respect for the land and ancestors), social (a shared day of rest) and practical (rest for people and land).");
});
