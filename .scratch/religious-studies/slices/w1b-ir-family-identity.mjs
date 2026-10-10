// W1b: Indigenous Religion and family identity.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.family.ir-family-identity", { file: "family/ir-family-identity", keyPrefix: "family.ir-family-identity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Shona word for the homestead?",
    options: [
      ["Musha", "Correct: the Ndebele word is umuzi."],
      ["Mutupo", "A mutupo is a totem."],
      ["Mukwerera", "Mukwerera is a rain-making ceremony."],
      ["Munyai", "A munyai is a go-between in marriage negotiations."],
    ],
    answer: "A",
    explanation: "The homestead is **musha** in Shona and **umuzi** in Ndebele.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion, how are the ancestors related to the family?",
    options: [
      ["They remain members of the family and watch over it", "Correct: they guide and protect their descendants."],
      ["They are strangers who have left the family completely after the funeral rites", "The ancestors remain part of the family."],
      ["They are rulers who have no interest in the daily lives of the living family members", "They are believed to take an interest in the family."],
      ["They are other gods who compete with Mwari for the loyalty of the family", "The ancestors are honoured as family, not as rival gods."],
    ],
    answer: "A",
    explanation: "In IR the ancestors are part of the family, informed of events and asked for protection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many families still describe the rural homestead as \"home\"?",
    options: [
      ["It holds the family graves and is where ceremonies are held", "Correct: it is the centre of the family's identity."],
      ["The law requires every adult to live at the rural homestead for part of the year", "No such law exists."],
      ["It is the only place where a family may earn money to pay for school fees", "Families earn money in many places."],
      ["It is the place where all family members must go to find a marriage partner", "This is not a requirement."],
    ],
    answer: "A",
    explanation: "The rural homestead (kumusha / ekhaya) is the place of graves, ceremonies and ancestors, so it remains a source of identity even for families in towns.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which relative is most associated with advising a young woman about marriage?",
    options: [
      ["The paternal aunt (vatete/ubabakazi)", "Correct: aunts counsel brides."],
      ["The younger brother of the groom who carries messages between the two families", "The messenger is the go-between; he is not the adviser to the bride."],
      ["The village headman who must give permission for each marriage in the area", "A headman is a community leader, not the family adviser to the bride."],
      ["The spirit medium who must approve the wedding date for each of the families", "A spirit medium is not the usual adviser to a bride."],
    ],
    answer: "A",
    explanation: "The paternal aunt (vatete/ubabakazi) has a special role in advising young women, especially before marriage.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tendai's grandmother tells the children every evening how the family settled in their area and names the grandfathers who lived there. What is she doing?",
    options: [
      ["Passing on the family's history and identity", "Correct: stories teach who the family is and where it comes from."],
      ["Preparing the children for an initiation school that will start in the morning", "Nothing suggests initiation."],
      ["Settling a dispute between two families about the boundary of their fields", "There is no dispute in the example."],
      ["Performing a funeral rite for a relative who has died in the previous week", "No death is mentioned."],
    ],
    answer: "A",
    explanation: "Oral storytelling is a main way in which elders pass on identity, values and memory.",
    hints: ["What is the content of the stories?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why family ceremonies matter to identity?",
    options: [
      ["They show who belongs, who leads and what duties members have", "Correct: taking part in rituals expresses belonging."],
      ["They allow the family to avoid contact with the ancestors for several years", "Ceremonies are meant to connect with the ancestors."],
      ["They are required by law before any person can be registered as a citizen", "Citizenship is not based on family ceremonies."],
      ["They replace the need for children to learn the family's history from elders", "Ceremonies and storytelling work together."],
    ],
    answer: "A",
    explanation: "Rituals make belonging visible. Those who attend show membership; those who lead show authority.",
    hints: ["Think about what is shown by taking part."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the most balanced judgement about family identity in a town like Harare today?",
    options: [
      ["Many families keep links with their rural home and ceremonies, but town life changes how they do so", "Correct: continuity and change exist together."],
      ["Town families have lost all connection with the ancestors and the rural homestead", "Many urban families keep strong links."],
      ["Town families keep all customs exactly as they were a hundred years ago", "Customs have been adapted."],
      ["Family identity in towns depends entirely on the amount of money a family earns", "Identity includes names, rituals, history and values, not only money."],
    ],
    answer: "A",
    explanation: "A balanced answer shows both continuity (kumusha, ceremonies) and adaptation (weekend ceremonies, phones).",
    hints: ["Avoid statements with 'all' or 'entirely'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Indigenous Religion the ancestors are regarded as members of the family.",
    answer: true,
    explanation: "True. They remain part of the family and are informed of its events.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Belonging to a family in Indigenous Religion brings rights only and no duties.",
    answer: false,
    explanation: "False. Belonging brings duties of respect, sharing, caring and honouring the ancestors.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each family role with its description.",
    pairs: [["Grandparents", "keep the family's memory and tell its stories"], ["Paternal aunt (vatete/ubabakazi)", "advises girls and takes part in marriage negotiations"], ["Maternal uncle (sekuru/umalume)", "a friend and protector of his sister's children"], ["Heir", "takes responsibility for the family's property and care of its members"]],
    explanation: "Each relative has a role in passing on identity and care.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The homestead is called {{blank:a}} in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["musha"], choices: ["musha", "dare", "bira", "chisi"] },
      { id: "b", accepted: ["umuzi"], choices: ["umuzi", "inkundla", "umbuyiso", "umlayo"] },
    ],
    explanation: "Musha and umuzi.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.",
    template: "A line of descent through which a family traces its ancestors is called a {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["lineage"], choices: ["lineage", "sanction", "taboo", "pilgrimage"] }],
    explanation: "A lineage links the living with the ancestors.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for the rural home that families in towns still call \"home\"?",
    accepted: ["kumusha", "musha"],
    wrong: ["kumaruzevha"],
    explanation: "**Kumusha** (at the rural home) expresses a family's link with its homestead.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** duties of a member of a family in Indigenous Religion.",
    points: ["Respect for parents and elders", "Sharing with and caring for relatives in need", "Honouring the ancestors by attending ceremonies and keeping taboos"],
    modelAnswer: "Respect for elders; sharing with and caring for relatives in need; honouring the ancestors by attending family ceremonies.",
    explanation: "One mark for each duty.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how elders pass on family identity to young people.",
    points: [["By telling stories about the family's history", 1], ["By naming the ancestors and explaining the family's relationships", 1], ["By teaching rules and values such as respect and sharing", 1], ["By including young people in family ceremonies so they learn their roles", 1]],
    modelAnswer: "Elders tell stories about the family's history and name the ancestors and relatives so the young know where they come from. They teach rules and values such as respect and sharing, and they include young people in family ceremonies so they learn their roles.",
    hints: ["Think of stories, naming, teaching and taking part."],
    explanation: "One mark for each accurate way.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how family rituals help to keep a family's identity.",
    points: [
      ["They bring the family together", 1],
      ["Developed: relatives who live far apart meet at births, weddings and funerals, so bonds are renewed", 1],
      ["They link the living with the ancestors", 1],
      ["Developed: informing and consulting the ancestors reminds the family that it has a past and a line of descent", 1],
      ["They teach roles and values to the young", 1],
      ["Developed: children see who leads, who advises and what is expected of them, and so learn their place in the family", 1],
    ],
    modelAnswer: "Family rituals bring relatives together. People who live far apart meet at births, weddings and funerals, and their bonds are renewed. The rituals also link the living with the ancestors, because informing and consulting them reminds the family that it has a past and a line of descent. Finally, rituals teach roles and values: children see who leads and who advises, and learn their own place in the family.",
    hints: ["Use three ideas: bringing together, linking with the ancestors, teaching."],
    explanation: "Three developed reasons.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school essay, Mutare, 2026",
      "My family lives in Mutare, but every December we travel to our grandparents' homestead in Buhera. We hold a family ceremony there. My grandfather speaks to the ancestors and tells them the names of the children born that year. My aunt reminds the girls to behave as members of the family. I feel I belong to something bigger than my own house."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What does the writer mean by \"something bigger than my own house\"?",
        options: [
          ["The extended family, including the ancestors and the rural homestead", "Correct: belonging reaches beyond the household."],
          ["A larger house that the family has built in the town of Mutare", "No building is mentioned."],
          ["A school or church where the writer receives lessons on family history", "The source mentions a family ceremony, not a school."],
          ["A government department that records the names of children born that year", "The names are told to the ancestors, not recorded by a department."],
        ],
        answer: "A", explanation: "The writer feels part of the extended family and its ancestors.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Identify **three** actions that take place at the December ceremony.",
        points: ["The family travels to the grandparents' homestead", "The grandfather speaks to the ancestors", "The grandfather tells the ancestors the names of the children born that year (or the aunt advises the girls)"],
        modelAnswer: "The family travels to the homestead; the grandfather speaks to the ancestors; he tells them the names of the children born that year.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** ways in which the ceremony shapes the writer's family identity.",
        points: [["It links the living with the ancestors: the children's names are told to the ancestors", 2], ["It teaches roles and values: the aunt reminds the girls how to behave as family members", 2]],
        modelAnswer: "The ceremony links the living with the ancestors, because the grandfather tells them the names of the children born that year, so the new members become part of the family line. It also teaches roles and values, because the aunt reminds the girls how to behave as members of the family.",
      }),
    ],
    hints: ["Use two different details from the source and explain what each shows."],
    explanation: "The source shows a ceremony that links ancestors, elders and the young.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai says: \"Family identity depends on keeping in touch with the rural homestead and the ancestors.\" Chipo says: \"Identity depends on how a family treats one another, wherever it lives.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** ways in which a family in town can keep in touch with the rural homestead.",
        points: [["Travelling to the homestead for funerals, weddings and ceremonies", 2], ["Using phones and messaging groups to share news and plan family gatherings", 2]],
        modelAnswer: "Family members travel to the homestead for funerals, weddings and ceremonies. They also use phones and messaging groups to share news and plan family gatherings.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** duties that belonging to a family brings.",
        points: [["Respect for elders: so that the family's values are passed on and elders feel valued", 2], ["Sharing and caring for relatives in need: so that no member is left without support", 2]],
        modelAnswer: "Members must respect elders, so that the family's values are passed on and elders feel valued. They must also share with and care for relatives in need, so that nobody is left without support.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "To what extent does a family's identity depend on its links with the ancestors?",
        points: [["For: ancestors give continuity, rituals and a sense of history", 2], ["Against: identity also depends on how members treat one another, shared values, and other religious or cultural traditions", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "In Indigenous Religion the ancestors are central: they give the family continuity, ceremonies and a sense of history, and they are believed to protect it. However, identity also depends on how members treat one another, on shared values of respect and care, and for some families on other faiths such as Christianity or Islam. For many families, links with the ancestors are a major part of identity, but they work together with values and relationships.",
      }),
    ],
    hints: ["Give reasons for Farai's view and for Chipo's before your own conclusion."],
    explanation: "A balanced answer weighs ancestors, relationships and values.",
  });

  b.card("DEFINITION", "What is a **lineage**?", "A line of descent through which a family traces its ancestors.");
  b.card("DEFINITION", "What is the **homestead**?", "The family home and its surroundings; **musha** (Shona), **umuzi** (Ndebele).");
  b.card("CONCEPT", "How do ancestors help to define a family's identity?", "They are members of the family who link the living with the past and are believed to protect it.");
  b.card("FACT", "What does **kumusha** mean?", "At the rural home; a term showing a family's link with its homestead.");
  b.card("CONCEPT", "Name three duties of a family member in IR.", "Respect elders, share and care for relatives, honour the ancestors.");
  b.card("FACT", "What role does the paternal aunt (vatete/ubabakazi) play?", "She advises girls and takes part in marriage negotiations.");
  b.card("CONCEPT", "How do family rituals keep identity alive?", "They bring relatives together, link the living with the ancestors and teach roles and values.");
  b.card("CONCEPT", "Why is it wrong to say a family 'worships' its ancestors in an answer?", "In IR the ancestors are honoured and consulted; God is the supreme being.");
});
