// W1a: the community and religious beliefs in socialisation (her.socialisation.community-religion).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.socialisation.community-religion", { file: "socialisation/community-religion", keyPrefix: "socialisation.community-religion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **nhimbe** (ilima in Ndebele)?",
    options: [
      ["A work party where neighbours help one family with a task", "Correct: neighbours weed, harvest or build together and are thanked with food and drink."],
      ["A ceremony held to ask the ancestors for rain", "That is mukwerera (Shona) or ukucela izulu (Ndebele)."],
      ["A court held by a chief to settle disputes", "A chief's court is a traditional court, not a work party."],
      ["A sacred rest day on which no work is done in the family fields", "That is chisi, a sacred rest day."],
    ],
    answer: "A",
    explanation: "Nhimbe/ilima is a cooperative work party. It teaches cooperation, hard work and generosity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the Ndebele name for a ceremony to ask for rain, called **mukwerera** in Shona?",
    options: [
      ["ukucela izulu", "Correct: ukucela izulu means asking for rain."],
      ["ilima", "Ilima is a work party (nhimbe in Shona)."],
      ["umbuyiso", "Umbuyiso is the ceremony of bringing back the spirit of the dead (kurova guva in Shona)."],
      ["isibongo", "Isibongo is a totem or clan name (mutupo in Shona)."],
    ],
    answer: "A",
    explanation: "Rain-making ceremony: mukwerera (Shona) / ukucela izulu (Ndebele).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which value do young people **mainly** learn by taking part in a nhimbe?",
    options: [
      ["Cooperation", "Correct: everyone works together on one family's task."],
      ["Competition", "A nhimbe is shared work, not a contest."],
      ["Independence", "The point is to rely on and help one another."],
      ["Punctuality", "Punctuality is mainly taught through school routines."],
    ],
    explanation: "Work parties teach cooperation, hard work and the idea that helping others means others will help you.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of a **negative sanction** used by a community?",
    options: [
      ["A fine imposed by a village court on a youth who damaged a neighbour's crops", "Correct: a fine punishes behaviour the community rejects."],
      ["Elders praising a girl at a village meeting for caring for her sick grandmother", "Praise is a positive sanction."],
      ["A church choosing a responsible young man to lead the youth fellowship", "Giving responsibility rewards good conduct: a positive sanction."],
      ["Neighbours teaching children songs before a wedding ceremony", "This is teaching, not a sanction."],
    ],
    answer: "A",
    explanation: "Negative sanctions (warnings, fines, ridicule, exclusion) discourage bad behaviour; positive sanctions (praise, rewards, responsibility) encourage good behaviour.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In Islam, where do Muslim children commonly receive religious instruction?",
    options: [
      ["In madrasa classes", "Correct: madrasa classes teach the Qur'an, prayer and conduct."],
      ["In Sunday school", "Sunday school is a Christian youth class."],
      ["At a nhimbe", "A nhimbe is a work party."],
      ["At a bira", "A bira is an indigenous ceremony for the ancestral spirits."],
    ],
    answer: "A",
    explanation: "Faiths have their own youth classes: Sunday schools and youth fellowships (Christianity), madrasa classes (Islam).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A village head calls the youths of the village to a meeting to explain why cutting trees near the river is forbidden. Which role of the community is shown?",
    options: [
      ["Traditional leaders teaching respect for community rules", "Correct: the village head explains and upholds a rule."],
      ["A religious group marking a rite of passage", "No rite of passage (such as baptism or marriage) is involved."],
      ["Peers putting pressure on one another", "The village head is not a peer of the youths."],
      ["The media passing on news and information to a very wide audience", "A meeting in a village is not the media."],
    ],
    answer: "A",
    hints: ["Who is speaking, and what is he teaching?"],
    explanation: "Traditional leaders socialise young people by explaining and enforcing customs and community rules.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about religion and socialisation is **most** accurate?",
    options: [
      ["Different faiths socialise differently but share values such as honesty and respect", "Correct: faiths differ in belief and worship but share many moral teachings."],
      ["Only indigenous religion teaches young people to respect their parents and their elders", "Christianity, Islam and other faiths also teach respect for parents."],
      ["Religious groups affect only adults, because children cannot understand belief", "Children learn through Sunday school, madrasa classes and ceremonies."],
      ["Religion plays no part in socialisation in modern towns and cities", "Religious groups remain active and influential in towns."],
    ],
    answer: "A",
    hints: ["Look for the statement that treats all faiths fairly."],
    explanation: "Each faith has its own beliefs and practices, but they share values such as honesty, respect, kindness and care for the poor.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is the community's role in socialisation often **weaker** in large towns than in villages?",
    options: [
      ["Neighbours may not know each other well, so fewer adults guide other people's children", "Correct: weaker ties in towns reduce shared supervision and guidance."],
      ["Towns have no religious groups, so young people receive no moral teaching", "Towns have many churches, mosques and other religious groups."],
      ["The law forbids adults living in towns from speaking to any children they are not related to", "There is no such law."],
      ["Traditional leaders in towns have more power than village heads in rural areas", "Traditional leaders are mainly in rural areas; this would not weaken community influence."],
    ],
    answer: "A",
    hints: ["Think about how well neighbours know each other in a busy suburb."],
    explanation: "In towns people move often and may not know their neighbours, so the shared watching and correcting of children is weaker; residents' associations, schools and religious groups partly fill the gap.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Constitution of Zimbabwe protects freedom of conscience and religion.",
    answer: true,
    explanation: "True. The Declaration of Rights protects freedom of conscience, which includes freedom of thought, belief and religion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A rain-making ceremony is an example of a work party.",
    answer: false,
    explanation: "False. Mukwerera/ukucela izulu is a religious and cultural ceremony; a work party (nhimbe/ilima) is a gathering for a practical task.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each faith with a place or setting where its young people are commonly taught.",
    pairs: [
      ["Christianity", "Sunday school or youth fellowship"],
      ["Islam", "Madrasa classes at a mosque"],
      ["Indigenous religion", "Family ceremonies and teaching by elders"],
    ],
    explanation: "Each faith has its own ways of teaching young people its beliefs and conduct.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Praise from elders for good behaviour is a {{blank:a}} sanction. Ancestral spirits are called midzimu in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative", "formal", "secondary"] },
      { id: "b", accepted: ["amadlozi"], choices: ["amadlozi", "izibongo", "izinduna", "amabutho"] },
    ],
    hints: ["Does praise encourage or discourage behaviour?"],
    explanation: "Praise is a positive sanction. Ancestral spirits: midzimu (Shona) / amadlozi (Ndebele).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the sacred rest day on which, in many Shona communities, no work is done in the fields.",
    accepted: ["chisi"],
    wrong: ["nhimbe", "bira"],
    explanation: "**Chisi** is a rest day observed in honour of the ancestors and the land.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which religion socialises its members.",
    points: ["Teaches moral values / rules of conduct", "Gives identity and belonging to a faith community", "Any one of: marks rites of passage, worship and prayer, youth organisations, care for the needy"],
    modelAnswer: "It teaches moral values, it gives people a sense of belonging, and it marks rites of passage such as marriage.",
    explanation: "One mark per correct way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which ceremonies socialise young people.",
    points: [
      "Identifies: ceremonies teach customs, songs and dances",
      "Develops: young people learn their heritage and keep it alive",
      "Identifies: ceremonies give young people roles and duties (serving, helping)",
      "Develops: they learn responsibility and how to support others, e.g. at a funeral",
    ],
    modelAnswer: "At ceremonies young people learn the songs, dances and customs of their community, so their heritage is passed on. They are also given duties such as serving food or fetching water, which teaches responsibility and how the community supports a family, for example at a funeral.",
    hints: ["What do young people see and do at a wedding or funeral?"],
    explanation: "Two marks per way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which a community in a large town could strengthen its role in socialising young people.",
    points: [
      "Suggests e.g. residents' associations organising clean-ups, sport or youth days",
      "Explains: brings adults and young people together so adults act as role models",
      "Suggests e.g. mentoring by elders or religious leaders, or community libraries/clubs",
      "Explains: young people get guidance and safe activities, reducing negative influences",
    ],
    modelAnswer: "A residents' association could organise monthly clean-ups and sports days for young people, so adults and youths meet and adults act as role models. Elders and religious leaders could also run a mentoring programme, so young people get guidance and safe activities instead of spending time with harmful influences.",
    hints: ["What brings neighbours together in a suburb?"],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "a report in a fictional community newsletter, Chinhoyi, 2026", "Twenty young people joined last Saturday's work party at the home of a widow whose maize needed harvesting. Elders showed them how to cut and stack the stalks. By midday the field was cleared, and the family served sadza and vegetables to everyone. The ward's village head thanked the youths and said that a community which works together never goes hungry.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What kind of community activity does Source A describe?",
        options: [
          ["A work party (nhimbe / ilima)", "Correct: neighbours help one family with a task and are thanked with food."],
          ["A rain-making ceremony", "Nothing in the source asks for rain."],
          ["A traditional court", "No dispute is being settled."],
          ["A church youth fellowship", "The gathering is a community work party, not a church meeting."],
        ],
        answer: "A",
        explanation: "Working together on one family's harvest and sharing a meal is a nhimbe/ilima.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** values the young people learned at this event.",
        points: ["Cooperation / working together", "Any one of: hard work, generosity, care for the vulnerable (the widow), respect for elders"],
        modelAnswer: "Cooperation and care for a vulnerable member of the community.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the elders and the village head socialised the young people in this event.",
        points: ["The elders taught a practical skill (cutting and stacking) by example", "The village head praised the youths (a positive sanction)", "His words passed on the value that cooperation protects the community"],
        modelAnswer: "The elders showed the youths how to cut and stack the stalks, teaching a practical skill by example. The village head praised them, a positive sanction that encourages them to help again, and his words taught them that cooperation keeps the community from hunger.",
      }),
    ],
    hints: ["In (c), look at what the elders did and what the village head said."],
    explanation: "Reading a source for the ways a community socialises its members.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on religion as an agent of socialisation.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Name **two** religions practised in Zimbabwe other than Christianity.",
        points: ["Indigenous religion (traditional religion)", "Islam (accept also Hinduism, Judaism, Bahá'í)"],
        modelAnswer: "Indigenous religion and Islam.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe how **one** named religion teaches young people moral values.",
        points: ["Names the religion and a source of teaching (e.g. the Bible, the Qur'an, elders and ancestors)", "Gives a specific teaching, e.g. a commandment, a pillar or a taboo", "Describes a setting where young people learn it, e.g. Sunday school, madrasa, ceremonies", "Links the teaching to behaviour, e.g. honesty, respect for parents, charity"],
        modelAnswer: "In Islam, young people learn from the Qur'an at madrasa classes held at the mosque. They are taught the Five Pillars, including giving to the needy, and the duty to respect their parents. This teaches them honesty, generosity and respect in daily life.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "How far is religion still an important agent of socialisation for young people in Zimbabwe?",
        points: [
          ["Important: most families belong to a faith; worship, youth groups and rites of passage shape values and identity", 2],
          ["Important: religious teachings on honesty, respect and care for others guide behaviour; faith schools and groups", 2],
          ["Limits: media, peers and ICT compete for young people's time; some young people attend rarely; religion can also be used to justify harmful practices", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Religion remains an important agent of socialisation. Most Zimbabwean families belong to a faith, whether Christianity, indigenous religion, Islam or another, and young people learn values and identity through worship, Sunday schools, madrasa classes, youth fellowships and ceremonies. Rites of passage such as baptism, naming and marriage also teach the duties of each stage of life.\n\nHowever, religion now competes with other agents. Young people spend much time with peers and on phones and social media, and some attend worship only occasionally. In a few cases religious claims have been used to justify harmful practices such as child marriage, which is illegal.\n\nOverall, religion is still a strong influence on values for many young people, but its influence depends on the family's involvement and is shared with the media and peers.",
      }),
    ],
    hints: ["In (c), consider both the strengths of religion and what competes with it."],
    explanation: "Recall (a), describe (b) and evaluate (c) the role of religion, treating every faith with respect.",
  });

  b.card("DEFINITION", "Community", "A group of people living in the same area or sharing interests or beliefs, who interact and support one another.");
  b.card("DEFINITION", "Sanction", "A reaction that rewards (positive: praise) or punishes (negative: warning, fine, ridicule) behaviour.");
  b.card("FACT", "Work party in Shona and Ndebele?", "Nhimbe (Shona); ilima (Ndebele).");
  b.card("FACT", "Rain-making ceremony in Shona and Ndebele?", "Mukwerera (Shona); ukucela izulu (Ndebele).");
  b.card("FACT", "Ancestral spirits in Shona and Ndebele?", "Midzimu (Shona); amadlozi (Ndebele).");
  b.card("CONCEPT", "How do traditional leaders socialise young people?", "They uphold customs, explain community rules and settle disputes, teaching respect for authority and fairness.");
  b.card("CONCEPT", "Name four ways religion socialises people.", "Moral values; rules of conduct; identity and belonging; rites of passage (plus youth groups and worship).");
  b.card("CONCEPT", "Why is the community's influence weaker in towns?", "Neighbours may not know each other, people move often and fewer adults share in guiding children.");
  b.card("CONCEPT", "What do nhimbe/ilima teach young people?", "Cooperation, hard work, generosity and responsibility to others.");
});
