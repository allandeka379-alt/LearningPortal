// W3b: The National Schools Pledge (her.heritage.schools-pledge).
// Reviewer note: the pledge and anthem are paraphrased only; the 2016 debate is described neutrally (no claims about
// court cases). No MCQ hinges on the debate.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.heritage.schools-pledge", { file: "heritage/schools-pledge", keyPrefix: "heritage.schools-pledge" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the National Schools Pledge introduced in Zimbabwe's schools?",
    options: [
      ["2016", "Correct: the pledge was introduced in 2016."],
      ["1980", "1980 is the year of independence."],
      ["2013", "2013 is the year of the new Constitution."],
      ["1987", "1987 is the year of the Unity Accord."],
    ],
    answer: "A",
    explanation: "The Ministry of Primary and Secondary Education introduced the pledge in 2016.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a pledge?",
    options: [
      ["a solemn promise", "Correct: a pledge is a serious commitment."],
      ["a national song", "A national song is an anthem."],
      ["a law passed by Parliament", "A pledge is not a law."],
      ["a coloured emblem on a flag", "That describes a symbol on a flag."],
    ],
    answer: "A",
    explanation: "A pledge is a solemn promise, often made publicly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which value is promoted by the pledge's commitment to the dignity of hard work?",
    options: [
      ["a strong work ethic", "Correct: learners commit to working hard and valuing work."],
      ["respect for the dead", "Respect for the dead is linked to honouring heroes."],
      ["care for animals", "This is linked to natural resources, not hard work."],
      ["religious tolerance", "This is not the meaning of the dignity of hard work."],
    ],
    answer: "A",
    explanation: "Committing to the dignity of hard work promotes a strong work ethic and self-reliance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The pledge says Zimbabweans are united in their diversity. What does **unity in diversity** mean?",
    options: [
      ["People of different backgrounds form one nation yet keep their differences", "Correct: difference and unity go together."],
      ["Everyone must speak the same language and follow the same customs and religion", "This is uniformity, not unity in diversity."],
      ["Each language group should govern its own separate territory", "This would divide the nation."],
      ["Only people born in the same province can be united", "Unity in diversity includes everyone."],
    ],
    answer: "A",
    explanation: "Unity in diversity means accepting differences in language, culture and faith while sharing one national identity.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which part of the national flag shares the message of the pledge's pride in the country's natural resources?",
    options: [
      ["the green and yellow stripes", "Correct: green stands for land and agriculture, yellow for minerals."],
      ["the white triangle", "The white triangle stands for peace."],
      ["the red star", "The red star stands for hopes and aspirations."],
      ["the black stripe and the white triangle", "Black stands for the majority; white for peace."],
    ],
    answer: "A",
    hints: ["Which colours stand for land and minerals?"],
    explanation: "Green (land, agriculture) and yellow (minerals) match the pledge's pride in natural resources.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which idea in the pledge is most closely linked to the **red** stripe of the national flag?",
    options: [
      ["honouring those who died in the liberation struggles", "Correct: red stands for the blood shed in the struggle."],
      ["being proud of and taking part in the country's traditions and cultures", "This links to identity rather than the red stripe."],
      ["commitment to honesty and hard work", "This is a personal value, not the meaning of red."],
      ["acknowledging Almighty God", "This is not linked to the red stripe."],
    ],
    answer: "A",
    hints: ["What does red stand for on the flag?"],
    explanation: "Red recalls the blood shed in the liberation struggle; the pledge honours those who died in it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo sees classmates copying answers during a test and refuses to join them. Which value of the pledge is she showing?",
    options: [
      ["honesty", "Correct: refusing to cheat shows honesty."],
      ["patriotism", "Patriotism is love of country, not the issue here."],
      ["remembrance of heroes", "This is not about heroes."],
      ["care for natural resources", "This is not about resources."],
    ],
    answer: "A",
    hints: ["Cheating is a form of dishonesty."],
    explanation: "The pledge commits learners to honesty; refusing to cheat is honesty in action.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A debate club argues about the pledge. Which statement is the **most balanced** conclusion?",
    options: [
      ["It can build shared values, though views on it differ and values must be lived", "Correct: this weighs both sides and adds a judgement."],
      ["It is perfect and nobody has ever raised any concern about it", "This ignores the debate when it was introduced."],
      ["It is useless because reciting words never changes anyone's behaviour at all", "This ignores its possible value and overstates the case."],
      ["It should be recited only by pupils who were born in Harare", "This makes no sense; it is for all learners."],
    ],
    answer: "A",
    hints: ["A balanced conclusion considers more than one view."],
    explanation: "A balanced judgement recognises the pledge's value and the concerns raised, and notes that values must be practised.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The National Schools Pledge is sung, like the national anthem.",
    answer: false,
    explanation: "False. The anthem is sung; the pledge is recited as a spoken promise.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The pledge expresses pride in the traditions and cultures of Zimbabwe.",
    answer: true,
    explanation: "True. One of its ideas is that Zimbabweans are proud of and take part in their traditions and cultures.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each idea of the pledge (paraphrased) with the value it promotes.",
    pairs: [
      ["saluting the national flag", "respect for national symbols"],
      ["honouring those who died in the struggles", "remembrance of heroes"],
      ["pride in inheriting natural resources", "care for natural heritage"],
      ["commitment to honesty", "integrity"],
    ],
    explanation: "Each idea in the pledge promotes a value: respect for symbols, remembrance, care for heritage and integrity.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "The pledge is {{blank:a}}, while the national anthem is {{blank:b}}. Both are used at school {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["recited"], choices: ["recited", "sung", "painted", "written"] },
      { id: "b", accepted: ["sung"], choices: ["sung", "recited", "painted", "written"] },
      { id: "c", accepted: ["assemblies"], choices: ["assemblies", "examinations", "sports fields", "libraries"] },
    ],
    explanation: "Learners recite the pledge and sing the anthem, usually at assemblies with the raising of the flag.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** main ideas of the National Schools Pledge, in your own words.",
    points: [
      "Any one of: acknowledging God; saluting the flag; unity in diversity (freedom, justice, equality); honouring those who died in the liberation struggles; pride in natural resources; pride in traditions and cultures; honesty and hard work",
      "A second different idea",
      "A third different idea",
      "A fourth different idea",
    ],
    modelAnswer: "It salutes the national flag; it honours those who died in the liberation struggles; it expresses pride in the country's natural resources; and it commits learners to honesty and hard work.",
    explanation: "One mark per correct idea, paraphrased.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which the National Schools Pledge could help learners become good citizens.",
    points: [
      "Identifies values (honesty, hard work)",
      "Develops: learners reminded of these values regularly are more likely to practise them at school and later at work",
      "Identifies unity / patriotism / care for heritage",
      "Develops: e.g. learners of different backgrounds share one promise, so they respect each other and the nation, or they learn to protect resources",
    ],
    modelAnswer: "The pledge reminds learners of honesty and hard work every week, so they are more likely to practise these values at school and later at work. Because all learners say the same promise, whatever their background, it encourages them to respect each other and to see themselves as one nation.",
    hints: ["Think of values and of unity."],
    explanation: "One mark for each way and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Relate **three** ideas of the National Schools Pledge to the national flag or the national anthem.",
    points: [
      "Pledge idea 1 named (e.g. honouring those who died in the struggles)",
      "Linked to flag or anthem with explanation (red stripe: blood shed / anthem praises the heroes)",
      "Pledge idea 2 named (e.g. pride in natural resources)",
      "Linked with explanation (green and yellow stripes: land and minerals / anthem praises the land)",
      "Pledge idea 3 named (e.g. unity, freedom, justice and equality)",
      "Linked with explanation (white triangle: peace / anthem calls the nation to stand together)",
    ],
    modelAnswer: "The pledge honours those who died in the liberation struggles; the red stripe of the flag stands for the blood they shed, and the anthem praises the heroes. The pledge expresses pride in natural resources; the green and yellow stripes stand for the land and minerals. The pledge speaks of unity, freedom and justice; the white triangle stands for peace, and the anthem calls on the nation to stand together.",
    hints: ["Work through the flag's colours one by one."],
    explanation: "Two marks per idea: one for the pledge idea, one for the explained link.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: source("Source A", "letters to a fictional community newspaper, 2016, written by two anonymous parents",
      "Letter 1: \"My children now say the pledge every day. They have started asking me about the heroes and about the minerals in our district. I think it is good that they learn to love their country.\"\nLetter 2: \"I am proud to be Zimbabwean, but I would have liked parents and churches to be asked first. A promise means more when people have been consulted about it.\"") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which statement about the source is supported by the evidence?",
        options: [
          ["The second writer supports patriotism but is concerned about consultation", "Correct: the writer is proud of the country but wanted consultation."],
          ["Both writers want the pledge to be removed immediately", "Neither letter asks for removal."],
          ["The first writer's children refuse to say the pledge", "The first writer says the children say it every day."],
          ["The second writer says the pledge has harmed the children's interest in schoolwork", "The letter says nothing about schoolwork."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** effects or benefits of the pledge that supporters might mention, using the source and your own knowledge.",
        points: [
          "Learners become curious about history and heroes (source)",
          "Learners learn to love their country (patriotism)",
          "Any other: values of honesty and hard work; unity in diversity; pride in resources and culture",
        ],
        modelAnswer: "The children ask about the heroes, so they learn history; they learn to love their country; and the pledge teaches values such as honesty and hard work.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain why people may hold different views about the pledge.",
        points: [
          "Some value its effect on patriotism and learning (Letter 1)",
          "Some are concerned about how it was introduced, e.g. consultation (Letter 2)",
          "People hold different religious beliefs, so some parts may matter differently to them",
          "In a democracy people may disagree respectfully about such matters",
        ],
        modelAnswer: "The first parent values the pledge because it has made her children interested in history and proud of their country. The second parent is also patriotic but is concerned that parents and churches were not consulted. People also hold different religious beliefs, so some parts of the pledge may matter to them in different ways. In a democracy, people can disagree about such matters while respecting one another.",
      }),
    ],
    hints: ["Notice that the second writer is also proud of the country."],
    explanation: "A source-based practice item on different views of the National Schools Pledge.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the National Schools Pledge.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the main ideas of the National Schools Pledge.",
        points: [
          "Acknowledging God and saluting the national flag",
          "Unity in diversity; a shared desire for freedom, justice and equality",
          "Honouring those who died in the liberation struggles",
          "Pride in natural resources and cultures; commitment to honesty and hard work",
        ],
        modelAnswer: "The pledge acknowledges God and salutes the national flag. It says Zimbabweans are united in their diversity by a desire for freedom, justice and equality. It honours those who died in the liberation struggles. It expresses pride in the country's natural resources and cultures, and commits learners to honesty and the dignity of hard work.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Reciting the National Schools Pledge makes learners better citizens.\" Discuss.",
        points: [
          ["For: regular reminders of honesty, hard work, unity and respect for heroes and resources", 2],
          ["For: shared identity and patriotism among all learners; links to history lessons", 2],
          ["Against or limits: reciting is not the same as practising; some families had concerns about parts of it; example of adults and the wider society matters more", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The pledge can help learners become better citizens. It reminds them every week of values such as honesty, hard work, justice and equality, and of respect for the heroes of the liberation struggles and for natural resources. Because all learners say the same promise, it builds a shared identity and patriotism.\n\nHowever, saying words is not the same as living by them. A learner can recite the pledge and still cheat or litter. Behaviour depends greatly on the example set by parents, teachers and leaders. When the pledge was introduced, some families also had concerns about parts of it, and a promise that some people feel uneasy about may have less effect on them.\n\nIn my view, the pledge can make learners better citizens only when its values are explained, discussed and practised at home and at school. On its own, recitation has a limited effect.",
      }),
    ],
    hints: ["In (b), separate saying the pledge from acting on it."],
    explanation: "A practice evaluative item on the significance of the National Schools Pledge.",
  });

  b.card("DEFINITION", "Pledge", "A solemn promise or commitment, often made publicly.");
  b.card("FACT", "When was the National Schools Pledge introduced?", "In 2016.");
  b.card("FACT", "Name four main ideas of the National Schools Pledge.", "Any four of: acknowledging God; saluting the flag; unity in diversity (freedom, justice, equality); honouring those who died in the liberation struggles; pride in natural resources and cultures; honesty and hard work.");
  b.card("DEFINITION", "Unity in diversity", "People of different languages, cultures and faiths living together as one nation while keeping their differences.");
  b.card("CONCEPT", "How does the pledge relate to the red stripe of the flag?", "Both honour those who died in the liberation struggle: red stands for the blood shed, and the pledge honours the fallen.");
  b.card("CONCEPT", "How does the pledge relate to the green and yellow stripes?", "Both express the value of natural resources: green for land and agriculture, yellow for minerals; the pledge expresses pride in inheriting them.");
  b.card("FACT", "How is the pledge different from the national anthem?", "The pledge is a spoken promise recited by learners; the anthem is a song.");
  b.card("CONCEPT", "Give two reasons supporters value the pledge.", "It builds patriotism and shared identity, and reminds learners of values such as honesty and hard work.");
  b.card("CONCEPT", "What concerns were raised when the pledge was introduced?", "Some parents and religious groups felt parts conflicted with their beliefs; some said there was too little consultation; some doubted that reciting changes behaviour.");
});
