// W1b: The concept and structure of the family.
import { concept, P, source, ref } from "../lib.mjs";

concept("frs.family.concept-structure", { file: "family/concept-structure", keyPrefix: "family.concept-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **nuclear family**?",
    options: [
      ["Two parents and their children", "Correct: it is the smallest family unit."],
      ["Parents, children and other relatives such as grandparents, aunts and uncles", "That describes an extended family."],
      ["One parent living with one or more children after a divorce or a death", "That describes a single-parent family."],
      ["Children living without adults, with an older sibling as the head of the household", "That describes a child-headed family."],
    ],
    answer: "A",
    explanation: "A nuclear family is two parents and their children. Extended families include other relatives.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who is the **vatete** (ubabakazi) in a family?",
    options: [
      ["The father's sister", "Correct: the paternal aunt, who often advises young women."],
      ["The mother's brother, who often supports his sister's children in many families", "That is the sekuru or umalume (maternal uncle)."],
      ["The father's elder brother, who has authority in the paternal family", "That is the babamukuru."],
      ["The mother's mother, who cares for grandchildren and shares family history", "That is a grandmother."],
    ],
    answer: "A",
    explanation: "Vatete (Shona) and ubabakazi (Ndebele) mean the father's sister.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which family is an example of a child-headed family?",
    options: [
      ["Three siblings living alone, with the eldest aged sixteen looking after the others", "Correct: no adult lives with them."],
      ["A mother and father with two children living in a flat in Harare", "That is a nuclear family."],
      ["A widow living with her children, her mother and her brother in a rural homestead", "That is an extended family."],
      ["A man and woman joined by remarriage, with children from their earlier relationships", "That is a blended family."],
    ],
    answer: "A",
    explanation: "A child-headed family is one in which children, usually led by the eldest, live without an adult.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best explains why belonging to a family is important?",
    options: [
      ["It gives a person identity, security, education and religious life", "Correct: the family is the first community."],
      ["It guarantees that a person will never face any difficulty or sorrow in life", "No family can guarantee this."],
      ["It allows a person to avoid all duties to relatives and to the community", "Belonging brings duties as well as support."],
      ["It ensures that every member will always agree with the decisions of the elders", "Family life involves respect, but members do not always agree."],
    ],
    answer: "A",
    explanation: "A family gives identity (name, totem), security (care in need), education (values) and religious life (ceremonies).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Indigenous Religion, who is regarded as part of the family?",
    options: [
      ["The living members and the ancestors", "Correct: the ancestors remain members of the family."],
      ["Only the people who share the same house today and eat from one pot", "The family includes relatives who do not live in the home."],
      ["Only the people who share the same church or place of worship", "Family is based on kinship, not on a place of worship."],
      ["Only the first-born son and the people whom he has chosen to live with", "The family includes many members, not only the eldest son."],
    ],
    answer: "A",
    explanation: "In IR the family includes the living and the ancestors, who guide and protect it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka's father has died. Her umalume pays part of her school fees, her ubabakazi advises her about the future and her grandmother cares for her little brother. What does this show?",
    options: [
      ["Responsibility is shared among members of an extended family", "Correct: relatives each take a role in caring for the children."],
      ["The mother has no role in the family because other relatives have taken over", "The scenario does not say that the mother has no role."],
      ["A nuclear family can meet every need of its members without help from outside", "The example shows that other relatives are needed."],
      ["Only the paternal relatives are expected to help when a family loses its father", "Both maternal and paternal relatives help in the example."],
    ],
    answer: "A",
    explanation: "In an extended family different relatives share responsibilities for support, guidance and care.",
    hints: ["Look at who helps, and how many different relatives are involved."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which pair correctly matches a religion with a family teaching mentioned in this topic?",
    options: [
      ["Islam: kindness to parents (Qur'an 17:23)", "Correct: the Qur'an teaches kindness to parents."],
      ["Judaism: kindness to parents (Ephesians 6:1-3)", "Ephesians is a book of the Christian New Testament, not a Jewish text."],
      ["Christianity: kindness to parents (Qur'an 17:23)", "The Qur'an is the Muslim scripture."],
      ["Indigenous Religion: kindness to parents (Exodus 20:12)", "Exodus is part of the Torah and the Bible, not an IR source."],
    ],
    answer: "A",
    explanation: "Judaism and Christianity both cite Exodus 20:12 on honouring parents; Christians also cite Ephesians 6:1-3; Muslims cite Qur'an 17:23.",
    hints: ["Check which scripture belongs to each religion."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the fairest comparison of nuclear and extended families?",
    options: [
      ["Each has strengths and difficulties, and neither is the only correct form", "Correct: families vary, and a balanced answer does not rank them."],
      ["Nuclear families are always happier than extended families because they are smaller", "Size does not decide happiness."],
      ["Extended families always give better care because there are more people in them", "More people do not always mean better care; conflicts can arise."],
      ["Only extended families can pass on values to children and take part in religious life", "Nuclear families also pass on values."],
    ],
    answer: "A",
    explanation: "Extended families share work and care but can face conflict; nuclear families have privacy but fewer helpers. A balanced answer does not rank them.",
    hints: ["Avoid 'always' and 'only' statements."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An extended family includes relatives such as grandparents, aunts, uncles and cousins.",
    answer: true,
    explanation: "True. An extended family includes relatives beyond the parents and children.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A single-parent family is one in which both parents live with their children.",
    answer: false,
    explanation: "False. A single-parent family has one parent living with the children.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each kinship term with its meaning.",
    pairs: [["Vatete / ubabakazi", "the father's sister"], ["Sekuru / umalume", "the mother's brother"], ["Babamukuru", "the father's elder brother"], ["Nuclear family", "two parents and their children"]],
    explanation: "Vatete/ubabakazi: paternal aunt. Sekuru/umalume: maternal uncle. Babamukuru: father's elder brother.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A family that includes grandparents, aunts and uncles is called an {{blank:a}} family. Two parents and their children make a {{blank:b}} family.",
    blanks: [
      { id: "a", accepted: ["extended"], choices: ["extended", "nuclear", "blended", "single-parent"] },
      { id: "b", accepted: ["nuclear"], choices: ["extended", "nuclear", "blended", "child-headed"] },
    ],
    explanation: "Extended family; nuclear family.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct reference.",
    template: `The Qur'an teaches kindness to parents in {{blank:a}}.`,
    blanks: [{ id: "a", accepted: [ref("Qur'an", 17, 23)], choices: [ref("Qur'an", 17, 23), ref("Exodus", 20, 12), ref("Ephesians", 6, "1-3"), ref("Genesis", 2, 24)] }],
    explanation: "Qur'an 17:23 (surah Al-Isra). Exodus 20:12 and Ephesians 6:1-3 are Jewish and Christian references on honouring parents.",
    hints: ["Only one reference is from the Qur'an."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What type of family is formed when two partners with children from earlier relationships join as one household?",
    accepted: ["blended", "blended family", "a blended family", "reconstituted", "step family", "stepfamily"],
    wrong: ["nuclear"],
    explanation: "A **blended family** joins two families after remarriage.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** types of family.",
    points: ["Nuclear", "Extended or single-parent", "Child-headed, blended or polygamous"],
    modelAnswer: "Nuclear; extended; child-headed.",
    explanation: "One mark for each type named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the roles of grandparents and of aunts and uncles in an extended family.",
    points: [["Grandparents share wisdom and stories and care for grandchildren", 1], ["Grandparents are respected as a link with the past and the ancestors", 1], ["Aunts and uncles advise and guide young people", 1], ["Aunts and uncles help in key events such as marriage and give support when parents cannot", 1]],
    modelAnswer: "Grandparents share wisdom and stories, care for grandchildren and are respected as a link with the past. Aunts and uncles advise and guide young people, take part in events such as marriage and give support when parents cannot.",
    hints: ["Give two points for each group of relatives."],
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the extended family is important in Zimbabwean society.",
    points: [
      ["Shared responsibility for care of children and old people", 1],
      ["Developed: when parents are sick or have died, relatives can step in so that children do not go without care", 1],
      ["Passing on values and identity", 1],
      ["Developed: grandparents, aunts and uncles teach respect, names, totems and history to the young", 1],
      ["Economic and emotional support", 1],
      ["Developed: relatives share money, food or school fees in hard times and support one another at funerals and weddings", 1],
    ],
    modelAnswer: "The extended family shares responsibility for care. When parents are sick or have died, relatives step in, so children do not go without care. It also passes on values and identity, because grandparents, aunts and uncles teach respect, names, totems and family history. It gives economic and emotional support too, because relatives share money, food or school fees in hard times and stand together at funerals and weddings.",
    hints: ["Give three reasons: care, values and identity, and support."],
    explanation: "Three developed reasons.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school magazine article, Gweru, 2026",
      "After our parents died, my older sister Rudo, who is seventeen, took charge of the house. She cooks, makes sure we go to school and signs our school forms. Our aunt visits every month to bring food and talk to us, and a neighbour helps us to plant our field. Rudo says: 'We are still a family, even without grown-ups in the house.'"
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of family is described in Source A?",
        options: [
          ["Child-headed", "Correct: children live without an adult, led by Rudo."],
          ["Nuclear, with both parents living in the house with the children", "The parents have died."],
          ["Blended, with children from earlier relationships living together", "No remarriage is mentioned."],
          ["Polygamous, with a husband and more than one wife in the household", "No husband or wives are mentioned."],
        ],
        answer: "A", explanation: "The children live without adults and the eldest is in charge.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** things Rudo does for her brothers and sisters.",
        points: ["Cooks for them", "Makes sure they go to school", "Signs their school forms"],
        modelAnswer: "She cooks, makes sure they go to school and signs their school forms.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** ways in which the wider community and relatives help the family in Source A.",
        points: [["The aunt visits monthly with food and gives advice and support", 2], ["A neighbour helps plant the field, so the family can grow food", 2]],
        modelAnswer: "The aunt brings food every month and talks to the children, which supports and guides them. A neighbour helps to plant their field, which helps the family to grow food.",
      }),
    ],
    hints: ["In (c), say what the help is and what it achieves."],
    explanation: "The source shows a child-headed family supported by an aunt and a neighbour.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Nokuthula says: \"The extended family is the best kind of family because it shares responsibility.\" Themba says: \"Smaller families can give children more attention.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** advantages of extended families.",
        points: [["Shared care for children, the sick and the elderly", 2], ["Support in hard times, such as money for fees or help with funerals", 2]],
        modelAnswer: "Care for children, the sick and the elderly is shared among relatives. Relatives also give support in hard times, such as help with school fees and funerals.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Give **two** difficulties that extended families can face.",
        points: [["Disagreements over money, land or decisions", 2], ["Limited space and resources in the home, or less privacy", 2]],
        modelAnswer: "There can be disagreements over money, land or decisions. There can also be limited space and resources, with less privacy in a crowded home.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess whether the extended family is better for children than the nuclear family.",
        points: [["For extended: shared care, more role models, identity and values", 2], ["For nuclear: more attention and privacy, fewer conflicts over resources", 2], ["A supported judgement, such as that both can succeed depending on the care and love in them", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "An extended family offers shared care, many role models and a strong sense of identity and values. However, a nuclear family may give children more individual attention and privacy and avoid conflicts over resources. Both can succeed or fail, depending on the love, discipline and support children receive, so neither is better in every case.",
      }),
    ],
    hints: ["Give the strengths of each type before your own judgement."],
    explanation: "A balanced answer weighs both family types and avoids ranking.",
  });

  b.card("DEFINITION", "What is a **family**?", "A group of people related by birth, marriage or adoption who care for one another and share responsibilities.");
  b.card("DEFINITION", "What is a **nuclear family**?", "Two parents and their children.");
  b.card("DEFINITION", "What is an **extended family**?", "A family that includes other relatives, such as grandparents, aunts, uncles and cousins.");
  b.card("FACT", "Who is the **vatete / ubabakazi**?", "The father's sister (paternal aunt).");
  b.card("FACT", "Who is the **sekuru / umalume**?", "The mother's brother (maternal uncle).");
  b.card("DEFINITION", "What is a **child-headed family**?", "A family in which children, led by an older sibling, live without an adult.");
  b.card("CONCEPT", "Why does belonging to a family matter?", "It gives identity, security, education in values and religious life.");
  b.card("FACT", "Which Qur'an reference teaches kindness to parents?", "Qur'an 17:23.", "Exodus 20:12 and Ephesians 6:1-3 are Jewish and Christian references on honouring parents.");
  b.card("CONCEPT", "Who belongs to the family in Indigenous Religion?", "The living members and the ancestors.");
});
