// W1b: ahist.contact.european-states-interests (ZIMSEC topic 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.contact.european-states-interests", { file: "contact/european-states-interests", keyPrefix: "contact.european-states-interests" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which agent of the Transvaal obtained a treaty from Lobengula in 1887?",
    options: [
      ["Pieter Grobler", "Correct: the Grobler Treaty is named after him."],
      ["John Smith Moffat, the missionary and agent of the British", "Moffat obtained the British treaty of 1888."],
      ["Charles Rudd, the partner of Cecil Rhodes", "Rudd obtained the concession of October 1888."],
      ["Sir Sidney Shippard, the administrator of Bechuanaland", "Shippard was a British official."],
    ],
    answer: "A",
    explanation: "Pieter Grobler was the Transvaal's agent. Moffat, Rudd and Shippard acted for British interests.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which year did Britain declare a protectorate over Bechuanaland?",
    options: [
      ["1885", "Correct: it secured the road to the north."],
      ["1884", "This is the year of the German claim at Angra Pequena."],
      ["1888", "This is the year of the Moffat Treaty and the Rudd Concession."],
      ["1890", "This is the year of the Pioneer Column."],
    ],
    answer: "A",
    explanation: "Bechuanaland became a British protectorate in 1885. It kept the Transvaal and Germany from closing the road to the north.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the British fear a link between Germany and the Transvaal?",
    options: [
      ["It could cut the Cape off from the interior", "Correct: the road to the north would be closed."],
      ["It would have ended British trade with India by sea, since the route to India ran across the continent", "The route to India was by sea round the Cape and later by the Suez Canal."],
      ["It would have given Germany the right to rule the Cape Colony itself", "Germany had no such claim on the Cape."],
      ["It would have meant a war between Germany and the Ndebele", "Neither state planned to fight the Ndebele."],
    ],
    answer: "A",
    explanation: "German South West Africa lay to the west, the Transvaal to the east of Bechuanaland. A link between them would have blocked the British route north.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Lobengula promise in the Moffat Treaty of February 1888?",
    options: [
      ["Not to give land or make treaties with other powers without British approval", "Correct: it gave Britain a say in his foreign relations."],
      ["To hand over all his cattle and mineral rights to Britain", "He made no such grant in this treaty."],
      ["To accept a British magistrate in every district of the Ndebele state", "The treaty did not provide for magistrates."],
      ["To allow the Transvaal to keep an agent in Bulawayo permanently", "The treaty was meant to exclude the Transvaal."],
    ],
    answer: "A",
    hints: ["The treaty was about who Lobengula could deal with."],
    explanation: "Lobengula agreed that he would not make treaties or cede land to another power without the High Commissioner's approval.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Britain regard the Grobler Treaty as a threat?",
    options: [
      ["A Transvaal presence at Bulawayo could block the road north", "Correct: Britain feared encirclement."],
      ["It granted the Transvaal exclusive mining rights over all Mashonaland, including Shona land far from Lobengula's court", "It was a treaty of friendship, not a mining grant."],
      ["It was signed by Germany and the Transvaal acting together in 1887", "Germany was not a party."],
      ["It ended Lobengula's rule over the Ndebele", "It did not touch his rule."],
    ],
    answer: "A",
    hints: ["Think of the Cape's route to the interior."],
    explanation: "The danger was strategic: a Boer presence in Lobengula's country, possibly linked with Germany, would cut the Cape off.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the Orange Free State is most accurate?",
    options: [
      ["It was less active than the Transvaal in seeking a treaty with Lobengula", "Correct: the Transvaal was the Boer state that sent an agent."],
      ["It sent Pieter Grobler to Bulawayo in 1887 to obtain a treaty from Lobengula", "Grobler acted for the Transvaal."],
      ["It occupied Matabeleland by force in 1888 and drove out the British agents", "No Boer republic occupied it."],
      ["It signed the Moffat Treaty with Lobengula", "Moffat acted for Britain."],
    ],
    answer: "A",
    hints: ["Which Boer republic had an agent at Lobengula's court?"],
    explanation: "The Free State shared the wider Boer interest in the north, but the Transvaal was the state that acted.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains Lobengula's reason for agreeing to the Moffat Treaty?",
    options: [
      ["He hoped British friendship would keep other powers away", "Correct: it was a choice among rivals."],
      ["He wanted British soldiers to be stationed in Bulawayo permanently as a garrison to defend his capital", "He did not invite soldiers."],
      ["He had been defeated in a war with Britain and was forced to sign", "There had been no such war."],
      ["He wished to join the Cape Colony as a province of the British Empire", "He did not want to give up his rule."],
    ],
    answer: "A",
    hints: ["Think of his policy of balancing visitors."],
    explanation: "Lobengula hoped to secure his independence by choosing British friendship over a Transvaal link; he did not understand that Britain would treat it as a claim.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is best supported about the treaties of 1887 and 1888?",
    options: [
      ["They narrowed Lobengula's choices without ending his rule", "Correct: he stayed king but could no longer deal freely with others."],
      ["They made Matabeleland a British colony in law", "It remained a kingdom until 1893-94."],
      ["They proved that Lobengula was a ruler who understood every term of the treaties he signed", "He disputed what he had agreed."],
      ["They had no effect on the later Rudd Concession of 1888", "The Moffat Treaty made the concession possible."],
    ],
    answer: "A",
    hints: ["He remained king in 1888. What changed?"],
    explanation: "The treaties tied Lobengula to British approval in foreign affairs, leaving his government in place but shrinking his freedom.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gold was found on the Witwatersrand in 1886.",
    answer: true,
    explanation: "True. The finds in the Transvaal raised hopes of a second goldfield north of the Limpopo.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Germany signed a treaty with Lobengula in 1887.",
    answer: false,
    explanation: "False. Germany signed no treaty with Lobengula. The fear of a German link with the Transvaal influenced British policy.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Lobengula tried to protect his independence by playing different visitors against each other.",
    answer: true,
    hints: ["Think of the grants he gave and the delay he used."],
    explanation: "True. He gave rights to several visitors and used delay, but his choices narrowed after 1888.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Pieter Grobler", "Agent of the Transvaal who obtained the treaty of 1887"],
      ["John Smith Moffat", "Missionary who obtained the British treaty of 1888"],
      ["Sir Hercules Robinson", "British High Commissioner at the Cape"],
      ["Sir Sidney Shippard", "Administrator of Bechuanaland who supported British interests"],
    ],
    explanation: "These four names recur in answers on the diplomacy of 1887-88.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each state with its interest before 1888.",
    pairs: [
      ["Britain", "To keep the road north and to secure expected minerals"],
      ["Germany", "To extend its new colonial empire; its possible link with the Boers alarmed Britain"],
      ["The Transvaal", "To gain land and wealth and avoid encirclement"],
      ["The Orange Free State", "A Boer republic with less direct activity north of the Limpopo"],
    ],
    hints: ["Remember that only some of them signed treaties."],
    explanation: "Each state had its own motive, but they were linked by rivalry.",
  });
  {
    const events = [
      "Germany claims Angra Pequena",
      "Britain declares a protectorate over Bechuanaland",
      "The Grobler Treaty",
      "The Moffat Treaty",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1884, 1885, 1887 and 1888."],
      explanation: "Angra Pequena 1884; Bechuanaland 1885; Grobler 1887; Moffat February 1888.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The treaty of {{blank:a}} 1888 between Lobengula and {{blank:b}} promised that he would not deal with other powers without British approval.",
    blanks: [
      { id: "a", accepted: ["February"], choices: ["February", "July", "October", "December"] },
      { id: "b", accepted: ["John Smith Moffat"], choices: ["John Smith Moffat", "Pieter Grobler", "Charles Rudd", "Karl Mauch"] },
    ],
    explanation: "The Moffat Treaty was agreed in February 1888, before the Rudd Concession of October.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Transvaal agent who obtained the treaty of friendship from Lobengula in 1887. Give his surname.",
    accepted: ["Grobler", "Pieter Grobler"],
    wrong: ["Moffat"],
    explanation: "**Grobler**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Moffat Treaty of 1888.",
    points: ["Signed in February 1888 at Bulawayo", "Between Lobengula and Britain, obtained by John Smith Moffat", "Lobengula promised not to make treaties or give land to other powers without the High Commissioner's approval", "It gave Britain a say in the king's foreign relations and shut out the Transvaal and Germany"],
    modelAnswer: "The treaty was made in February 1888 at Bulawayo between Lobengula and Britain, and John Smith Moffat obtained it. Lobengula promised not to make treaties or give land to other powers without the High Commissioner's approval. It gave Britain a say in his foreign relations and shut out the Transvaal and Germany.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Britain was interested in Lobengula's country before 1888.",
    points: [["Strategic: it feared that the Transvaal and Germany might link up and block the road north", 2], ["Economic: rumours of gold, boosted by the Witwatersrand finds of 1886, and the ambitions of Rhodes and other businessmen", 2]],
    hints: ["Think of strategy and of minerals."],
    modelAnswer: "Britain feared that the Transvaal and Germany might link up and block the road north from the Cape. There were also rumours of gold, made more believable by the Witwatersrand finds of 1886, and businessmen such as Rhodes wished to profit from the north.",
    explanation: "One mark for each reason and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Grobler Treaty alarmed the British.",
    points: [["A Transvaal agent at Bulawayo could extend Boer influence over the Ndebele and the route north", 2], ["It could create a Boer link with Germany, which would surround the Cape and block British expansion", 2]],
    hints: ["Think of encirclement."],
    modelAnswer: "A Transvaal agent at Bulawayo could extend Boer influence over the Ndebele and across the road to the north. This could be joined with German interests in South West Africa and so surround the Cape and block British expansion.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a private letter from a fictional British official at the Cape to a colleague in London, 1887",
        "If the Transvaal puts a man at Lobengula's court, we may find the road to the north shut. We must have the king's word that he will deal with no one but us. It will not do to let the Boers speak for him."),
      "",
      source("Source B", "a message from a fictional Ndebele counsellor reported at the court in 1888",
        "The king is the friend of all the white people who come to him. He gave his word to the missionary because he wished to be at peace. He has not given away his land, and no one has the right to say that he has."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about British aims in 1887?", points: ["To prevent the Transvaal from gaining influence at the court", "To get the king's promise to deal only with Britain"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about what Lobengula's agreement meant?", points: [["Disagree: A treats the king's word as a promise to deal only with Britain; B says it was friendship and he gave away no land", 2], ["Agree that the king gave his word and that it concerned his relations with the whites", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are Sources A and B as evidence of the purpose of the treaties of 1887-88?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is private, written at the time, and frank about British aims, but it reflects only the British view", 2], ["B gives the Ndebele view, but it is a reported message and may be shaped to defend the king", 2], ["Own knowledge shows the treaties did limit Lobengula's freedom while he remained king, so each contains part of the truth", 2]], modelAnswer: "Source A is reliable on British aims because it is a private letter, written at the time, which has no reason to hide its purpose, but it shows only the British view. Source B gives the Ndebele view, but it is a reported message and may be shaped to defend the king's actions. My own knowledge shows that the treaties did restrict Lobengula's freedom to deal with other powers while he remained king. Each source therefore contains part of the truth, and they are best used together." }),
    ],
    hints: ["For (c), consider who wrote each source, for whom and what each leaves out."],
    explanation: "Both sources are invented: a private British letter and a reported Ndebele message.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the rivalry between Britain, the Transvaal and Germany in explaining the signing of the Moffat Treaty.",
    levels: levels(8),
    points: [
      ["British fear of a Boer-German link and of the Grobler Treaty: strategy and the road north", 2],
      ["Minerals and the ambitions of Rhodes and other businessmen", 2],
      ["Lobengula's own wish to keep independence by choosing among suitors, and the part of Moffat and Shippard", 2],
      ["Judgement on the relative importance", 2],
    ],
    hints: ["Weigh rivalry against mineral interest and Lobengula's own choices."],
    modelAnswer: "Rivalry was the main reason for the Moffat Treaty. The Grobler Treaty of 1887 alarmed the British because a Transvaal presence at Bulawayo, perhaps joined with German interests, could block the road north. Minerals mattered, since the gold of the Witwatersrand raised hopes in the north and men like Rhodes wished to profit. Lobengula also played a part: he hoped British friendship would keep his rivals away, and Moffat and Shippard used his trust. I conclude that the rivalry of states was the most important cause, because it explains the speed with which Britain acted, while minerals were the long-term reason for caring.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What is a sphere of influence?", "An area in which one European state claimed the sole right to make treaties or take territory, without actually ruling it.");
  b.card("DEFINITION", "What is a protectorate?", "A territory under the protection of a stronger state, which controls its foreign relations and often its defence.");
  b.card("FACT", "When did Britain declare a protectorate over Bechuanaland?", "1885.");
  b.card("FACT", "Who obtained the 1887 treaty for the Transvaal?", "Pieter Grobler.");
  b.card("FACT", "Who obtained the 1888 treaty for Britain?", "John Smith Moffat, in February 1888.");
  b.card("FACT", "What did the Moffat Treaty promise?", "That Lobengula would not make treaties or give land to another power without British approval.");
  b.card("CONCEPT", "Why did Britain fear a link between Germany and the Transvaal?", "It could close the road from the Cape to the interior.");
  b.card("CONCEPT", "Why did the Moffat Treaty matter for Ndebele independence?", "It limited the king's foreign relations and made Matabeleland a British sphere.");
  b.card("CONCEPT", "How did Lobengula try to protect his independence?", "By receiving many visitors, playing them off against each other and delaying decisions.");
});
