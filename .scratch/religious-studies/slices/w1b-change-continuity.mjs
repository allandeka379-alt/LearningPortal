// W1b: Indigenous Religion in contemporary Zimbabwe.
import { concept, P, source } from "../lib.mjs";

concept("frs.indigenous.change-continuity", { file: "indigenous/change-continuity", keyPrefix: "indigenous.change-continuity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **syncretism**?",
    options: [
      ["The blending of beliefs and practices from two or more religions", "Correct: for example combining a church service with an ancestral ceremony."],
      ["The complete disappearance of a religion from a region after the arrival of another", "That is a decline, not a blending."],
      ["The return of interest in an older religion among the young people of a community", "That is a revival, not syncretism."],
      ["The practice of holding all religious ceremonies on the same day each year in the village", "Syncretism is about blending religions, not scheduling."],
    ],
    answer: "A",
    explanation: "Syncretism is the blending of elements from different religions.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does AIC stand for?",
    options: [
      ["African Independent (or Initiated) Church", "Correct: a Christian church started by Africans."],
      ["Association of Indigenous Churches founded by foreign missionaries before 1900", "The AICs were not started by foreign missionaries."],
      ["Ancestral Initiation Council that organises rites of passage for all communities", "There is no such council; AIC refers to churches."],
      ["Anglican Institute for Christian education in the rural areas of Zimbabwe", "Not the meaning of AIC in this context."],
    ],
    answer: "A",
    explanation: "AICs are African Independent (or Initiated) Churches, such as many apostolic churches.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which example shows **adaptation** of an Indigenous Religion practice?",
    options: [
      ["Holding a family ceremony on a weekend so that relatives from town can come", "Correct: the practice continues, but its timing changes to fit modern life."],
      ["Giving up all family ceremonies after moving to a town and joining a church", "That is a decline in practice, not an adaptation."],
      ["Refusing to speak to any person who is not a member of the same religion", "That is not an adaptation."],
      ["Reading an Indigenous Religion holy book at a weekly service in a hall", "IR has no single holy book, so this is not a true example."],
    ],
    answer: "A",
    explanation: "Adaptation keeps the meaning of a practice but changes its form, such as the timing, to suit new conditions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of many African Independent Churches shows a link with African tradition?",
    options: [
      ["Drumming, dancing and communal singing in worship", "Correct: these forms are familiar from African cultural life."],
      ["A rule that members may never sing or dance during any form of worship", "Many AICs have lively singing and dancing."],
      ["A requirement that every member must give up all contact with the family", "Family ties are usually valued."],
      ["The use of a single holy book written by the founder instead of the Bible", "AICs use the Bible."],
    ],
    answer: "A",
    explanation: "Many AICs keep Christian teaching but use African forms of worship such as drumming, dancing and healing prayers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha lives in Harare. Her family holds a church service for her grandmother's funeral and, a year later, travels to the rural home for the kurova guva. What does this show?",
    options: [
      ["Some families combine Christian and Indigenous Religion practices", "Correct: both traditions are part of their lives."],
      ["All families in Zimbabwe have given up their Indigenous Religion ceremonies altogether", "The example shows a family keeping the ceremony."],
      ["Indigenous Religion is a branch of Christianity and follows the same church rules", "IR is a religion in its own right with its own beliefs and practices."],
      ["The kurova guva is no longer connected with the ancestors and has become only a party", "Nothing in the example suggests this; the family is bringing the spirit home."],
    ],
    answer: "A",
    explanation: "Many families take part in both church and ancestral ceremonies. This is sometimes called syncretism or religious blending.",
    hints: ["Look at what the family does at the church and at the rural home."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which effect of urbanisation on Indigenous Religion is best supported by the evidence in this topic?",
    options: [
      ["Families live far from sacred places and adapt their ceremonies to town life", "Correct: ceremonies continue in new forms."],
      ["Every family in a town has stopped holding any ceremony for the ancestors", "Many urban families still hold such ceremonies."],
      ["Towns have forced families to abandon the use of their mother tongue completely", "Languages continue to be used in many urban homes."],
      ["Urban life has made the ancestors unimportant to every person who moves there", "This overstates the effect; many people keep the ancestors important."],
    ],
    answer: "A",
    explanation: "Urbanisation separates people from rural homes and sacred places, so families adapt (for example by holding rites on weekends) rather than all abandoning them.",
    hints: ["Avoid statements with 'every' or 'all'."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about Indigenous Religion today is most balanced?",
    options: [
      ["It has declined for some people but continued, adapted or been revived for others", "Correct: the picture is mixed."],
      ["It has completely disappeared because modern education has replaced all older beliefs", "Many people still follow it in various forms."],
      ["It has not changed at all since the arrival of Christianity in the country", "It has met many influences and changed in many ways."],
      ["It is superior to every other religion in Zimbabwe because it is older than they are", "A balanced answer does not rank religions."],
    ],
    answer: "A",
    explanation: "A balanced view recognises decline, continuity, adaptation and revival, and does not rank religions.",
    hints: ["Choose the answer that covers different trends without ranking religions."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Constitution of Zimbabwe (2013) protects freedom of conscience, including the right to practise a religion.",
    answer: true,
    explanation: "True. Section 60 protects freedom of conscience, including religion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Zimbabweans who follow Indigenous Religion practise it in exactly the same way.",
    answer: false,
    explanation: "False. Practices vary between peoples, families and between rural and urban settings.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each response to change with an example.",
    pairs: [["Decline", "a family stops holding ceremonies after joining another religion"], ["Continuity", "a family keeps the bira and kurova guva"], ["Adaptation", "a ceremony moved to a weekend so urban relatives can attend"], ["Revival", "young people show renewed interest in traditional names and ceremonies"]],
    explanation: "The responses are decline, continuity, adaptation and revival.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The blending of beliefs from different religions is called {{blank:a}}. A church started by Africans is an {{blank:b}} church.",
    blanks: [
      { id: "a", accepted: ["syncretism"], choices: ["syncretism", "initiation", "sanction", "pilgrimage"] },
      { id: "b", accepted: ["African Independent"], choices: ["African Independent", "Roman Catholic", "Orthodox", "Anglican"] },
    ],
    explanation: "Syncretism; African Independent (or Initiated) Church.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct number.",
    template: "Section {{blank:a}} of the Constitution of Zimbabwe protects freedom of conscience, including religion.",
    blanks: [{ id: "a", accepted: ["60"], choices: ["22", "60", "78", "251"] }],
    explanation: "Section 60 protects freedom of conscience. Section 63 protects the right to take part in cultural life.",
    hints: ["Think of the section on conscience."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which mission society began work at Inyati in 1859?",
    accepted: ["London Missionary Society", "LMS", "the London Missionary Society"],
    wrong: ["Jesuits"],
    explanation: "The London Missionary Society opened the mission at Inyati in 1859.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** influences that have changed Indigenous Religion in Zimbabwe.",
    points: ["Christianity", "Colonialism or urbanisation", "Education or technology"],
    modelAnswer: "Christianity; colonialism and urbanisation; education and technology.",
    explanation: "One mark for each influence.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which families have adapted Indigenous Religion practices to modern life.",
    points: [["Holding ceremonies at weekends so that relatives from towns can attend", 2], ["Combining a church service with an ancestral ceremony, or using clinics for births while keeping naming ceremonies", 2]],
    modelAnswer: "Some families hold ceremonies at weekends so relatives who work in towns can attend. Others combine a church service with an ancestral ceremony, or give birth at a clinic while still holding a naming ceremony at home.",
    hints: ["Give a change of timing and a combination of practices."],
    explanation: "Two marks for each way described.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how colonialism and Christianity affected Indigenous Religion in Zimbabwe.",
    points: [
      ["Missions brought Christianity and many people became Christians", 1],
      ["Developed: some mission teaching criticised IR practices, so some families gave them up while others combined faiths", 1],
      ["Colonial laws restricted some practices (for example witchcraft accusations were made offences in 1899)", 1],
      ["Developed: colonial land policies separated people from sacred places and rural homes", 1],
      ["Mission schools taught different worldviews", 1],
      ["Developed: young people learned alternative ideas, though many later valued IR as heritage", 1],
    ],
    modelAnswer: "Missions brought Christianity and many people joined churches. Some mission teaching criticised IR practices, so some families gave them up while others combined the faiths. Colonial laws restricted some practices, and colonial land policies separated many people from their sacred places and rural homes. Mission schools taught different worldviews to young people, although many later valued IR as heritage.",
    hints: ["Use three influences: missions, colonial laws and land, and schools."],
    explanation: "Three developed effects.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a letter in a fictional church newsletter, 2026",
      "My grandmother is a member of our church and she also asks the family spirit medium for advice. I used to think she had to choose. Now I think she is simply living between two traditions, as many people do. At her funeral next year I expect that there will be a church service in town and a family ceremony at the rural home."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which term best describes the grandmother's practice in Source A?",
        options: [
          ["Syncretism", "Correct: she combines elements of two religions."],
          ["Initiation, the entry of a young person into adulthood", "Initiation is a rite of passage; it is not mentioned."],
          ["Pilgrimage, a journey to a distant holy place", "No journey is mentioned."],
          ["Excommunication, the removal of a member from a church", "No one is removed from the church."],
        ],
        answer: "A", explanation: "Taking part in both church and ancestral practice is a form of syncretism.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** details in Source A that show a link with Indigenous Religion or with a church.",
        points: ["She is a member of the church", "She asks the family spirit medium for advice", "A family ceremony at the rural home is expected after the funeral"],
        modelAnswer: "She is a member of the church; she asks the family spirit medium for advice; a family ceremony at the rural home is expected.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the writer says her grandmother is \"living between two traditions\".",
        points: [["She takes part in a church", 1], ["She also keeps an ancestral practice by consulting a spirit medium", 1], ["Many people combine traditions and see no conflict", 1]],
        modelAnswer: "She is a church member but also consults a spirit medium, so she takes part in both traditions, as many people do and without seeing a conflict.",
      }),
    ],
    hints: ["Say what she does in each tradition."],
    explanation: "The source shows a person combining church and Indigenous Religion practices.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Tendai says: \"Indigenous Religion is dying out because of towns, schools and churches.\" Rudo says: \"It has adapted and many people still practise it.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** changes that have affected Indigenous Religion.",
        points: [["Christianity or colonial rule changed beliefs, laws and access to sacred places", 2], ["Urbanisation, education or technology changed where and how people practise", 2]],
        modelAnswer: "Christianity and colonial rule changed beliefs and laws and separated people from sacred places. Urbanisation and education also changed where people live and what they learn, so practice has changed.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Give **two** pieces of evidence that Indigenous Religion continues today.",
        points: [["Families still hold ceremonies such as bira, kurova guva/umbuyiso and roora/lobola", 2], ["Traditional leaders and healers are recognised in law and names, languages and customs remain important", 2]],
        modelAnswer: "Many families still hold ceremonies such as the bira and kurova guva and negotiate roora. Traditional leaders and healers are recognised in law, and names, languages and customs remain important in identity.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "How far do you agree that Indigenous Religion is dying out?",
        points: [["For: some people have left for other religions or moved away from rural homes", 2], ["Against: continuity, adaptation and revival", 2], ["A supported judgement that the picture is mixed", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "There is some evidence for Tendai's view. Some people have joined other religions or moved to towns and no longer hold ancestral ceremonies. However, many families continue to hold ceremonies, others have adapted them, and some young people are showing renewed interest in names, languages and customs. The picture is therefore mixed rather than a simple decline.",
      }),
    ],
    hints: ["Weigh the evidence for decline against continuity, adaptation and revival."],
    explanation: "A balanced answer shows that the picture is mixed.",
  });

  b.card("DEFINITION", "What is **syncretism**?", "The blending of beliefs and practices from two or more religions.");
  b.card("DEFINITION", "What are **AICs**?", "African Independent (or Initiated) Churches: Christian churches started by Africans, with African forms of worship.");
  b.card("CONCEPT", "What four responses has IR shown to change?", "Decline, continuity, adaptation and revival.");
  b.card("FACT", "Which mission society reached Inyati in 1859?", "The London Missionary Society.");
  b.card("FACT", "Which section of the 2013 Constitution protects freedom of conscience and religion?", "Section 60.", "Section 63 protects cultural life.");
  b.card("CONCEPT", "How has urbanisation affected IR practice?", "Families live far from rural homes and sacred places, so ceremonies are adapted (for example on weekends) or combined with church services.");
  b.card("CONCEPT", "Why should you avoid saying IR is 'dying out'?", "The picture is mixed: some decline, but also continuity, adaptation and revival.");
  b.card("FACT", "Which body registers traditional healers in Zimbabwe?", "The Traditional Medical Practitioners Council (set up by an Act of 2000).");
});
