// Slice ERD: reading skills — reference words and linking devices.
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the text and answer the question.\n\n> ${text}`;

const BEES = `Read the article and answer the questions.

**Sweet rewards from the forest**

**[1]** In the miombo woodland near Binga, a group of women have turned an old tradition into a small business. Their grandmothers collected wild honey by smoking out bees from hollow trees, which often killed the colony and damaged the trees. The women now keep bees in wooden hives hung from branches instead. This allows them to harvest honey year after year without destroying anything.

**[2]** The group, which calls itself Uchi Bwangu, began with six hives donated by a church project. Today it manages more than eighty. Each member looks after her own hives; however, the honey is processed together in a small room behind the clinic, where it is strained, bottled and labelled.

**[3]** Selling the honey was at first the hardest part. Local shops already stocked cheaper syrups, and few customers had heard of the group. The women therefore began offering free tastings at the weekly market. Within a year, two lodges on Lake Kariba had become regular buyers; the former orders every month, and the latter buys in bulk before the tourist season.

**[4]** Beekeeping has also changed how the community sees the forest. Because the bees need flowering trees, people who once cut trees for firewood now protect them. Meanwhile, the women have begun training a second group of beekeepers in a neighbouring village.`;

concept("eng.reading.text-cohesion", { file: "reading/text-cohesion", keyPrefix: "reading.text-cohesion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which linking word signals a **contrast**?",
    options: [
      ["however", "Correct: however introduces a contrasting idea."],
      ["moreover", "Moreover adds a further point."],
      ["therefore", "Therefore introduces a result."],
      ["meanwhile", "Meanwhile signals time: at the same time."],
    ],
    answer: "A",
    explanation: "Contrast: *but, however, although, yet, whereas, nevertheless*. Addition: *moreover, furthermore*. Result: *therefore, consequently*. Time: *meanwhile, then*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: ext("*The farmers asked the council for a new dip tank. It promised to build one before the rains.*") + "\n\nWhat does **It** refer to?",
    options: [
      ["the council", "Correct: only the council could promise to build something."],
      ["the dip tank", "A dip tank cannot make a promise."],
      ["the farmers", "Farmers is plural; it is singular."],
      ["the rains", "Rains is plural and cannot promise."],
    ],
    answer: "A",
    explanation: "Match **number** (singular *it*) and **sense** (something that can promise). The nearest noun (*dip tank*) is not always the answer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*Chipo was offered places at a boarding school in Masvingo and a day school near home. She chose the latter because she could help her mother in the evenings.*") + "\n\nWhat does **the latter** refer to?",
    options: [
      ["the day school near home", "Correct: the latter means the second of two things mentioned."],
      ["the boarding school in Masvingo", "That is the former, the first of the two."],
      ["her mother's home", "Home is mentioned, but the choice is between two schools."],
      ["the evenings", "The evenings are not one of the two choices."],
    ],
    answer: "A",
    explanation: "**The former** = the first of two; **the latter** = the second of two. Here the two are the boarding school and the day school.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING",
    stem: ext("*Many pupils walk more than ten kilometres to school each day. This means that they arrive tired and often late.*") + "\n\nWhat does **This** refer to? Answer fully.",
    marks: 1,
    points: ["The fact that many pupils walk more than ten kilometres to school every day (the whole idea, not just one noun)"],
    modelAnswer: "The fact that many pupils walk more than ten kilometres to school every day.",
    hints: ["*This* can refer to a whole idea, not just a single word."],
    explanation: "*This* refers to the **whole situation** in the previous sentence. Answering only *pupils* or *school* is incomplete.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each linking word with its function.",
    pairs: [["furthermore", "addition"], ["nevertheless", "contrast"], ["consequently", "result"], ["for instance", "example"], ["afterwards", "time"]],
    explanation: "Learn linking words by function: addition, contrast, cause, result, time, example, summing up.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the linking word that fits the meaning.",
    template: "The rains were good this year. {{blank:a}}, many families went hungry because their crops were eaten by armyworms.",
    blanks: [{ id: "a", accepted: ["Nevertheless"], choices: ["Nevertheless", "Therefore", "Furthermore", "For example"] }],
    explanation: "Good rains would normally mean plenty of food, so hunger is unexpected: a **contrast** (*Nevertheless*).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the linking word that fits each gap.",
    template: "The bridge was washed away; {{blank:a}}, pupils from across the river could not reach school. The council {{blank:b}} sent a boat, {{blank:c}} it could carry only six children at a time.",
    blanks: [
      { id: "a", accepted: ["as a result"], choices: ["as a result", "however", "for example", "meanwhile"] },
      { id: "b", accepted: ["eventually"], choices: ["eventually", "although", "because", "such as"] },
      { id: "c", accepted: ["but"], choices: ["but", "so", "therefore", "and so"] },
    ],
    hints: ["What is the relationship between the bridge and pupils missing school?", "Is the last idea good news or a limitation?"],
    explanation: "*As a result* (effect of the washed-away bridge); *eventually* (time: after a delay); *but* (contrast: a boat came, yet it was too small).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: *because* introduces the **result** of an action, and *so* introduces its **cause**.",
    answer: false,
    explanation: "False — it is the other way round. *Because* introduces the **cause** (*She was late because the kombi broke down*); *so* introduces the **result** (*The kombi broke down, so she was late*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*Tendai wanted to join the drama club, but Rudo didn't.*") + "\n\nWhat words have been left out after **didn't**?",
    options: [
      ["want to join the drama club", "Correct: ellipsis avoids repeating the verb phrase."],
      ["like Tendai very much", "This adds a new idea that is not implied."],
      ["join the football team", "Football is not mentioned."],
      ["go to school that day", "This changes the meaning completely."],
    ],
    answer: "A",
    hints: ["What did Tendai want?"],
    explanation: "**Ellipsis** leaves out words the reader can supply from earlier: *Rudo didn't [want to join the drama club]*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*Some pupils read for pleasure every evening; others, however, read only before tests. The former usually write more fluent compositions.*") + "\n\nWho are **the former**?",
    options: [
      ["pupils who read for pleasure every evening", "Correct: the first of the two groups mentioned."],
      ["pupils who read only before tests", "That group is the latter."],
      ["teachers who mark the pupils' compositions", "Teachers are not mentioned."],
      ["all the pupils in the class", "The former refers to one of two groups."],
    ],
    answer: "A",
    hints: ["Former = first."],
    explanation: "Two groups are mentioned: evening readers (first → **the former**) and test-only readers (second → the latter).",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 900,
    stem: BEES,
    parts: [
      P.manual({
        label: "(a)",
        marks: 1,
        stem: "In paragraph 1, what does **This** (in *This allows them…*) refer to?",
        points: ["Keeping bees in wooden hives hung from branches (instead of smoking bees out of trees)"],
        modelAnswer: "Keeping the bees in wooden hives hung from branches.",
      }),
      P.mcq({
        label: "(b)",
        stem: "In paragraph 1, what does **which** (in *which often killed the colony*) refer to?",
        options: [
          ["smoking out bees from hollow trees", "Correct: the old method killed the colony."],
          ["the miombo woodland near Binga", "The woodland did not kill the bees."],
          ["the women's small business", "The business uses hives that do not kill bees."],
          ["the hollow trees themselves", "The trees were damaged; they did not kill the colony."],
        ],
        answer: "A",
        explanation: "*which* refers back to the whole practice of **smoking out bees from hollow trees**.",
      }),
      P.short({
        label: "(c)",
        stem: "In paragraph 2, which linking word shows a contrast between how the hives are looked after and how the honey is processed?",
        accepted: ["however"],
        wrong: ["together"],
        explanation: "*Each member looks after her own hives; **however**, the honey is processed together.*",
      }),
      P.mcq({
        label: "(d)",
        stem: "In paragraph 3, what does **therefore** tell you about the free tastings?",
        options: [
          ["They were a response to the problem of selling the honey", "Correct: therefore introduces a result of the difficulties described."],
          ["They explain why the honey was cheaper than the syrup in shops", "The honey's price is not linked to the tastings."],
          ["They happened before the group was formed", "Therefore signals result, not earlier time."],
          ["They were an example of the syrups sold in shops", "Therefore does not introduce an example."],
        ],
        answer: "A",
        explanation: "*Therefore* introduces a **result**: because few people knew the group and syrups were cheaper, the women began free tastings.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "In paragraph 3, what do **the former** and **the latter** refer to?",
        points: [
          "The former: the first of the two lodges (the lodge that orders every month)",
          "The latter: the second lodge (the one that buys in bulk before the tourist season)",
        ],
        modelAnswer: "The former is the first of the two lodges on Lake Kariba, which orders monthly; the latter is the second lodge, which buys in bulk before the tourist season.",
      }),
      P.short({
        label: "(f)",
        stem: "In paragraph 4, which word introduces the **cause** of people protecting trees?",
        accepted: ["because"],
        wrong: ["meanwhile"],
        explanation: "***Because** the bees need flowering trees, people … now protect them.*",
      }),
      P.mcq({
        label: "(g)",
        stem: "In paragraph 4, what does **Meanwhile** signal?",
        options: [
          ["Something happening at the same time", "Correct: meanwhile is a time connective."],
          ["A result of protecting the trees", "Meanwhile does not show cause and effect."],
          ["An example of a flowering tree", "Meanwhile does not introduce an example."],
          ["A contrast with the honey sales", "Meanwhile shows time, not contrast."],
        ],
        answer: "A",
        explanation: "*Meanwhile* = at the same time: while the community protects trees, the women are also training others.",
      }),
      P.manual({
        label: "(h)",
        marks: 1,
        stem: "In paragraph 2, what does **it** (in *Today it manages more than eighty*) refer to?",
        points: ["The group Uchi Bwangu"],
        modelAnswer: "The group, Uchi Bwangu.",
      }),
    ],
    hints: ["Look back from each reference word and substitute your answer.", "Name the function of each linking word: contrast, result, cause, time."],
    explanation: "Reference words point back (*This* = keeping bees in hives; *which* = smoking out bees; *it* = the group; *the former/the latter* = the two lodges). Linking words show contrast (*however*), result (*therefore*), cause (*because*) and time (*Meanwhile*).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `${BEES}\n\nIn paragraph 3, what does **the hardest part** most likely tell you about the rest of the group's work?`,
    options: [
      ["The other parts, such as keeping bees, were easier by comparison", "Correct: the superlative compares selling with the other tasks."],
      ["Selling the honey in the shops later became impossible for the women", "The paragraph shows that selling improved with tastings."],
      ["Keeping the hives was the most difficult task of all", "The writer says selling was the hardest part."],
      ["The lodges found it hard to buy the honey in bulk", "The difficulty belonged to the women, not to the lodges."],
    ],
    answer: "A",
    hints: ["*Hardest* compares one task with others."],
    explanation: "*The hardest part* links back to the earlier tasks (keeping hives, processing) and implies they were less difficult, while setting up the problem the paragraph then solves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which linking word introduces an **example**?",
    options: [
      ["for instance", "Correct: it introduces an example of the point just made."],
      ["on the other hand", "This introduces a contrasting point."],
      ["as a result", "This introduces a result."],
      ["in conclusion", "This introduces a final summing up."],
    ],
    answer: "A",
    explanation: "*For example*, *for instance*, *such as* and *including* introduce examples. In a summary, examples are usually left out.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS",
    stem: ext("*The headmaster praised the netball team and the debating club. The latter had won the provincial final, and he hoped such success would inspire the younger pupils.*") + "\n\nExplain what **The latter** and **such success** refer to.",
    marks: 2,
    points: [
      "The latter = the debating club (the second of the two groups)",
      "Such success = winning the provincial final",
    ],
    modelAnswer: "The latter is the debating club; such success means winning the provincial final.",
    hints: ["Which group was mentioned second?", "*Such* points back to a kind of thing already described."],
    explanation: "*The latter* picks the second item in a pair; *such success* refers back to the achievement just described (winning the provincial final).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*Mrs Dube asked her daughters to fetch water. They grumbled, but they went.*") + "\n\nWhat does **They** refer to?",
    options: [
      ["Mrs Dube's daughters", "Correct: they is plural and the daughters were asked to fetch water."],
      ["Mrs Dube and her husband", "No husband is mentioned."],
      ["the buckets of water", "Buckets cannot grumble."],
      ["Mrs Dube's neighbours", "No neighbours are mentioned."],
    ],
    answer: "A",
    hints: ["Who was asked to do the task?"],
    explanation: "*They* is plural and must be able to grumble and go: **Mrs Dube's daughters**.",
  });

  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*The drought lasted for most of the year. The long dry spell forced many families to sell their cattle.*") + "\n\nWhich phrase in the second sentence refers back to *The drought*?",
    accepted: ["the long dry spell", "long dry spell"],
    model: "long dry spell",
    wrong: ["many families"],
    explanation: "Writers use **synonyms** to avoid repetition while keeping the topic clear: *the drought* → *the long dry spell*.",
  });

  b.card("DEFINITION", "Cohesion","The way sentences and paragraphs are connected so a text reads as a whole.", undefined);
  b.card("DEFINITION", "Antecedent (referent)", "The word or idea that a reference word stands for.", "The council promised… It = the council.");
  b.card("CONCEPT", "Finding what a reference word refers to", "Look back → match number and sense → substitute → write the referent in full.", undefined);
  b.card("FACT", "The former / the latter", "The former = the first of two things mentioned; the latter = the second.", undefined);
  b.card("CONCEPT", "This, that and such", "Often refer to a whole idea or situation, not one noun: explain the whole idea.", undefined);
  b.card("FACT", "Contrast linking words", "but, however, although, yet, whereas, nevertheless, on the other hand", undefined);
  b.card("FACT", "Cause and result linking words", "Cause: because, since, as, owing to. Result: so, therefore, consequently, as a result.", undefined);
  b.card("FACT", "Addition, example and time links", "Addition: moreover, furthermore. Example: for instance, such as. Time: meanwhile, afterwards, eventually.", undefined);
  b.card("DEFINITION", "Ellipsis (in cohesion)", "Leaving out words that the reader can supply from earlier in the text.", "Tendai wanted to go, but Rudo didn't [want to go].");
});
