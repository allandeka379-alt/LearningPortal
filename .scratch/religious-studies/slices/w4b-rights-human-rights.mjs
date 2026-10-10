// W4b: Religion and human rights (Topic 14.1).
// Reviewer notes: UDHR adopted 10 December 1948; Constitution of Zimbabwe 2013 sections 48, 51, 56, 60, 75, 78, 80, 81, 83, 86
// are cited in outline (check numbering against the text); Mark 12:31, Qur'an 2:256 and 17:70 and Genesis 1:27 are paraphrased;
// the "prayer only" case is presented with the family's view, the law and the advice to seek a trained health worker.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.rights.human-rights", { file: "rights/human-rights", keyPrefix: "rights.human-rights" }, (b) => {
  mc(b, 1, "RECALL", "On which date did the United Nations adopt the Universal Declaration of Human Rights?",
    ["10 December 1948", "Correct: the UDHR was adopted on 10 December 1948."],
    [["20 November 1989", "That is the date of the UN Convention on the Rights of the Child."],
     ["18 April 1980", "That is the date of Zimbabwe's independence."],
     ["14 May 1948", "That is the date the State of Israel was proclaimed."]],
    "The **UDHR** was adopted on 10 December 1948.");
  mc(b, 1, "RECALL", "Which section of the Constitution of Zimbabwe protects freedom of conscience, including religion?",
    ["Section 60", "Correct: section 60."],
    [["Section 48", "Section 48 protects the right to life."],
     ["Section 56", "Section 56 concerns equality and non-discrimination."],
     ["Section 81", "Section 81 concerns the rights of children."]],
    "**Section 60** protects freedom of conscience, including religion.");
  mc(b, 2, "UNDERSTANDING", "Which characteristic of human rights means that they belong to everyone, everywhere?",
    ["They are universal", "Correct: universal means for all people."],
    [["They are conditional on a person's wealth or background", "Rights do not depend on wealth."],
     ["They are limited to the citizens of one country only", "Human rights are not limited to one country."],
     ["They are granted by religious leaders to their followers", "Rights belong to all and are not granted by leaders."]],
    "Human rights are **universal**: they belong to every person.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which scripture reference do Jews and Christians use to support the equal worth of every person?",
    ["Genesis 1:27", "Correct: humans are made in the image of God."],
    [["Exodus 20:8", "This concerns the Sabbath."],
     ["Acts 2:1", "This concerns the day of Pentecost."],
     ["Deuteronomy 6:4", "This is the opening of the Shema, about one God."]],
    "**Genesis 1:27** teaches that humans are made in the image of God.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the teaching of unhu/ubuntu say about a person?",
    ["A person becomes fully human through other people", "Correct: dignity is lived in community."],
    [["A person's worth depends on the wealth they have gathered", "Unhu does not measure worth by wealth."],
     ["Only chiefs and elders possess rights in a community", "Unhu values every person."],
     ["A person is fully human only after leaving the community", "Unhu teaches belonging, not leaving."]],
    "**Unhu/ubuntu** teaches that a person is a person through other people.");
  mc(b, 3, "APPLICATION", "Thandeka's neighbour believes in prayer only and does not take his sick child to the clinic. Which response best respects both the family's faith and the child's rights?",
    ["Dialogue in which prayer and clinic treatment are both encouraged", "Correct: this protects the child's health without denying the family's faith."],
    [["Remove the child by force without speaking to the family or elders", "This ignores dialogue and may harm the family's trust."],
     ["Tell the family that their faith is worthless and must be given up", "This disrespects freedom of religion."],
     ["Leave the child untreated because religion must never be questioned", "The child has a right to health care."]],
    "The best response is **dialogue** that protects the child's right to health care while respecting the family's faith.",
    { hints: ["Look for the answer that respects both the family and the child."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a letter in a fictional community newsletter, Bindura, 2026",
    "A sixteen-year-old girl in our area has been promised in marriage. Her family says this is what our custom and our faith require. Her teacher says the girl wishes to finish school, and that the law says a person must be eighteen to marry. Many in the village are unsure what to think.") + "\n\nWhich statement is best supported by Source A?",
    ["A custom defended on religious grounds conflicts with the law", "Correct: the family cites custom and faith, while the law sets 18 as the minimum age."],
    [["The family and the law fully agree about the girl's marriage", "The source shows disagreement."],
     ["The girl has no wish to continue her education at school", "The teacher says she wishes to finish school."],
     ["The whole village has accepted the marriage without question", "Many in the village are unsure."]],
    "The source shows a conflict between a **practice defended on religious grounds** and the legal minimum age of 18 (section 78).",
    { hints: ["Look at what the family says and what the law says."] });
  mc(b, 4, "EVALUATION", "Why may freedom of religion be limited by a fair law?",
    ["The rights of other people, such as a child's right to health, must also be protected", "Correct: section 86 allows fair, reasonable limits to protect others."],
    [["Because the state may restrict any religion that it does not like", "Limits must be fair, reasonable and necessary, not arbitrary."],
     ["Because rights belong only to people who follow the majority religion", "Rights belong to everyone."],
     ["Because freedom of religion is not mentioned in the Constitution", "It is protected by section 60."]],
    "Under section 86, rights may be limited by a **fair law to protect the rights of others**.",
    { hints: ["Think about whose rights may be affected."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Universal Declaration of Human Rights is Chapter 4 of the Constitution of Zimbabwe.",
    answer: false,
    explanation: "False. The UDHR is an international declaration of 1948. Chapter 4 of the Constitution is the Declaration of Rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Freedom of religion includes the right to change one's religion.",
    answer: true,
    explanation: "True. Freedom of religion includes the right to hold, change and practise a religion or belief, or none.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source with what it teaches or protects.",
    pairs: [
      ["Genesis 1:27", "Humans are made in the image of God"],
      ["Qur'an 17:70", "God has honoured the children of Adam"],
      ["Unhu/ubuntu", "A person is a person through other people"],
      ["Section 60 of the Constitution", "Freedom of conscience, including religion"],
    ],
    explanation: "Each source supports human dignity or freedom in its own way.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The UDHR was adopted in {{blank:a}}, and the Declaration of Rights is Chapter {{blank:b}} of the Constitution of Zimbabwe.",
    blanks: [
      { id: "a", accepted: ["1948"], choices: ["1948", "1989", "1965", "2013"] },
      { id: "b", accepted: ["4"], choices: ["4", "3", "9", "15"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "The UDHR was adopted in **1948**; the Declaration of Rights is Chapter **4**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the Shona and Ndebele teaching that a person is a person through other people.",
    accepted: ["unhu", "ubuntu", "hunhu", "unhu ubuntu", "unhu/ubuntu"],
    wrong: ["tzedakah"],
    explanation: "It is **unhu** (Shona) or **ubuntu** (Ndebele).",
  });

  ms(b, 1, "RECALL", 3, "State **three** characteristics of human rights.",
    ["They are universal", "They are inalienable (cannot be taken away)", "They are equal, interdependent, or come with responsibilities"],
    "Human rights are universal, inalienable, and equal, interdependent and come with responsibilities.",
    "One mark for each characteristic.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe how **two** religions teach that every person has dignity.",
    ["Judaism and Christianity: Genesis 1:27 teaches that humans are made in the image of God", "So every person has equal worth, and murder or cruelty is wrong", "Islam: Qur'an 17:70 teaches that God has honoured the children of Adam", "Indigenous Religion: unhu teaches that a person is a person through others, with respect, hospitality and care"],
    "Judaism and Christianity teach from Genesis 1:27 that humans are made in the image of God, so every person has equal worth. Islam teaches from Qur'an 17:70 that God has honoured the children of Adam. Indigenous Religion teaches unhu, that a person is a person through others, with respect, hospitality and care.",
    "One mark for each point; credit any two religions.",
    ["Give the teaching and the source for each religion."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why freedom of religion may be limited by law.",
    [["Religious practice may harm another person", 1], ["Developed: for example, child marriage harms a girl's education and health, so the law protects her", 2],
     ["Other people have rights too", 1], ["Developed: a child's right to health care or a person's right to equality must be balanced with the freedom of the believer (section 86)", 2]],
    "Religious practice may harm another person, for example child marriage harms a girl's education and health, so the law protects her. Other people have rights too, and a child's right to health care or a person's right to equality must be balanced with the freedom of the believer, under section 86.",
    "Two reasons, each stated and developed.",
    ["Think of harm to others and of the balance of rights."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report, Marondera, 2026",
      "A town council meeting heard a request from a religious group for an annual all-night prayer meeting in the park. Some residents said the freedom to worship is protected by the Constitution. Others said that neighbours also have a right to quiet and to sleep. The council asked the group and the residents to agree on hours and noise limits.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which right does the religious group in Source A rely on?",
        ["Freedom of conscience, including religion", "Correct: section 60 protects the freedom to worship."],
        [["The right to vote in an election held in the town", "The group is asking to worship, not to vote."],
         ["The right to own land in the middle of the town", "The group is asking to hold a meeting in the park."],
         ["The right to a pension after a long working life", "The group is asking about worship."]],
        "The group relies on freedom of religion (section 60)."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** points made by the people involved.",
        points: ["A religious group asks for an annual all-night prayer meeting in the park", "Some residents say freedom to worship is protected by the Constitution", "Others say neighbours have a right to quiet and sleep, and the council asks for agreed hours and noise limits"],
        modelAnswer: "A religious group asks for an annual all-night prayer meeting in the park. Some residents say freedom to worship is protected by the Constitution. Others say neighbours have a right to quiet and sleep, and the council asks for agreed hours and noise limits.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the council asked for hours and noise limits.",
        points: [["Freedom of religion is protected, but it must be exercised with respect for the rights of other people", 2], ["Agreed limits balance the group's right to worship with neighbours' right to quiet, so both rights are respected", 2]],
        modelAnswer: "Freedom of religion is protected, but it must be exercised with respect for the rights of other people. Agreed limits balance the group's right to worship with the neighbours' right to quiet, so both rights are respected.",
      }),
    ],
    hints: ["In (c) think of two rights that need to be balanced."],
    explanation: "The source is an example of balancing freedom of religion with the rights of others.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Tafadzwa says: \"Freedom of religion should never be limited, because belief is private.\" Chipo says: \"Freedom of religion must be limited when a practice harms other people.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** rights protected by the Constitution of Zimbabwe.",
        points: [["Freedom of conscience, including religion (section 60)", 2], ["Any other right, such as life (48), dignity (51), equality (56), education (75) or the rights of children (81)", 2]],
        modelAnswer: "Freedom of conscience, including religion, is protected by section 60. The right to human dignity is protected by section 51.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which a religion supports human rights.",
        points: [["Genesis 1:27 teaches that humans are made in God's image, or Qur'an 17:70 that God honoured human beings, or unhu that a person is a person through others", 1], ["Developed: so every person deserves respect and equal treatment", 1], ["Religions teach justice and care for the weak", 1], ["Developed: believers are encouraged to protect the poor, the sick and children", 1]],
        modelAnswer: "Genesis 1:27 teaches that humans are made in God's image, so every person deserves respect and equal treatment. Religions also teach justice and care for the weak, so believers are encouraged to protect the poor, the sick and children.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far freedom of religion should be limited.",
        points: [["For freedom: belief and worship are basic rights, protected by section 60, and also shape identity", 2], ["For limits: practices such as child marriage or denial of medical care harm others, and section 86 allows fair limits", 2], ["Dialogue, education and reform within religions can address conflicts before the law is used", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Freedom of religion is a basic right protected by section 60, and belief and worship are central to identity, so it should be limited only with great care. However, practices such as child marriage or denial of medical care to children harm other people, and section 86 allows fair and reasonable limits to protect their rights. Dialogue, education and reform within religions often solve conflicts before the law is needed. I conclude that freedom of religion should be strongly protected but limited when a practice seriously harms the rights of others, especially children.",
      }),
    ],
    hints: ["Give the case for freedom, the case for limits and a judgement."],
    explanation: "A strong answer balances the right to believe with the rights of others and refers to the law.",
  });

  b.card("DEFINITION", "What are **human rights**?", "The basic freedoms and protections to which every person is entitled because they are human.");
  b.card("DEFINITION", "What is **freedom of religion**?", "The right to hold, change and practise a religion or belief, or none; protected by section 60 of the Constitution.");
  b.card("FACT", "When was the UDHR adopted?", "10 December 1948.");
  b.card("FACT", "Which chapter of the Constitution of Zimbabwe is the Declaration of Rights?", "Chapter 4.");
  b.card("FACT", "Which scripture teaches that humans are made in God's image?", "Genesis 1:27.");
  b.card("FACT", "Which Qur'an verse teaches that God has honoured the children of Adam?", "Qur'an 17:70.");
  b.card("CONCEPT", "What does unhu/ubuntu teach?", "That a person is a person through other people; dignity is lived in community.");
  b.card("CONCEPT", "Why may freedom of religion be limited?", "A fair law (section 86) may limit it to protect the rights of other people, especially children.");
  b.card("CONCEPT", "How can conflicts between religion and rights be addressed?", "By dialogue, education, reform within the religion and, where needed, the courts.");
});
