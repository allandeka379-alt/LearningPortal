// W1a: hist.origins.humankind (ZIMSEC topic 2).
import { concept, P, source, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.origins.humankind", { file: "origins/humankind", keyPrefix: "origins.humankind" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who wrote *On the Origin of Species*, which explained evolution by natural selection?",
    options: [
      ["Charles Darwin", "Correct: Darwin published it in 1859."],
      ["Louis Leakey", "Louis Leakey was a twentieth-century fossil hunter at Olduvai Gorge."],
      ["Raymond Dart", "Dart described the Taung child skull in 1925."],
      ["David Livingstone", "Livingstone was a missionary and explorer in central Africa, not a theorist of evolution."],
    ],
    answer: "A",
    explanation: "Charles Darwin's *On the Origin of Species* appeared in 1859. *The Descent of Man* (1871) applied his ideas to humans.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which country is **Olduvai Gorge**, where Louis and Mary Leakey found many early hominin fossils and stone tools?",
    options: [
      ["Tanzania", "Correct: Olduvai Gorge, like Laetoli, is in northern Tanzania."],
      ["Ethiopia", "Ethiopia has Hadar, where Lucy was found."],
      ["South Africa", "South Africa has Taung and Sterkfontein."],
      ["Zimbabwe", "Olduvai is in East Africa, far to the north of Zimbabwe."],
    ],
    answer: "A",
    explanation: "Olduvai Gorge and Laetoli: Tanzania. Hadar: Ethiopia. Taung and Sterkfontein: South Africa.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which early human species is known as **'handy man'** because it made simple stone tools?",
    options: [
      ["Homo habilis", "Correct: habilis means handy; it is linked with the earliest simple stone tools."],
      ["Homo erectus", "Homo erectus means 'upright man'; it made hand axes and used fire."],
      ["Homo sapiens", "Homo sapiens means 'wise man': modern humans."],
      ["Australopithecus", "Australopithecus means 'southern ape'."],
    ],
    answer: "A",
    explanation: "Australopithecus = southern ape; Homo habilis = handy man; Homo erectus = upright man; Homo sapiens = wise man.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which stage of human development was the first to spread **out of Africa** into Asia?",
    options: [
      ["Homo erectus", "Correct: Homo erectus fossils are found in Asia as well as Africa."],
      ["Australopithecus", "Australopithecus fossils are found only in Africa."],
      ["Homo habilis", "Homo habilis is known from African sites."],
      ["None: no early human left Africa before Homo sapiens", "Homo erectus spread into Asia long before Homo sapiens existed."],
    ],
    answer: "A",
    explanation: "Homo erectus was the first hominin to spread beyond Africa. Homo sapiens later spread from Africa across the whole world.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The fossil skeleton known as **'Lucy'** was found at Hadar. Which species does it belong to?",
    options: [
      ["Australopithecus afarensis", "Correct: Lucy is a partial skeleton of Australopithecus afarensis, about 3.2 million years old."],
      ["Homo sapiens", "Lucy is far older than modern humans."],
      ["Homo erectus", "Homo erectus appeared over a million years after Lucy lived."],
      ["Australopithecus africanus", "That species was named from the Taung child in South Africa."],
    ],
    answer: "A",
    explanation: "Lucy (Hadar, Ethiopia, found in the 1970s) is *Australopithecus afarensis*. The Taung child is *Australopithecus africanus*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What do the fossil footprints at **Laetoli** show about early hominins?",
    options: [
      ["They walked upright long before large brains developed", "Correct: the prints are about 3.6 million years old and show upright walking."],
      ["They used fire to cook their food", "Footprints cannot show the use of fire."],
      ["They buried their dead with ceremonies and many grave goods", "Nothing about burial can be read from footprints."],
      ["They were the first people to make iron tools", "Iron working began only a few thousand years ago."],
    ],
    answer: "A",
    hints: ["What can a footprint tell you about how its maker moved?", "How old are the prints compared with the first large-brained species?"],
    explanation: "The Laetoli prints show a human-like walking pattern about 3.6 million years ago, so bipedalism came before big brains and stone tools.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence **most strongly** supports the view that Africa is the cradle of humankind, independently of the fossil record?",
    options: [
      ["Genetic studies of the ancestry of living humans", "Correct: genetics is a separate line of evidence and it points to Africa."],
      ["The warm climate of Africa today", "Climate may help explain why hominins lived there, but it is not evidence that they evolved there."],
      ["The large number of museums in South Africa", "Museums store evidence; they are not evidence of origins."],
      ["Darwin's suggestion in 1871 that humans began in Africa", "Darwin's suggestion was a hypothesis; it needed evidence to support it."],
    ],
    answer: "A",
    hints: ["The question asks for evidence that does NOT come from fossils.", "Which option is a different kind of scientific evidence?"],
    explanation: "Fossils and genetics are independent kinds of evidence; when both point to Africa the conclusion is strong. A hypothesis or a modern climate is not evidence of origins.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **correctly** describes the relationship between humans and chimpanzees according to the theory of evolution?",
    options: [
      ["Humans and chimpanzees share a common ancestor", "Correct: both lines evolved separately from a shared ancestor."],
      ["Humans evolved directly from the chimpanzees living today", "A common misunderstanding: modern chimpanzees are our cousins, not our ancestors."],
      ["Chimpanzees evolved from early humans", "Neither evolved from the other; they share an ancestor."],
      ["Humans and chimpanzees are unrelated species", "Evolution shows they are closely related."],
    ],
    answer: "A",
    hints: ["Think of a family tree: are your cousins your ancestors?"],
    explanation: "Evolution shows a branching tree: humans and chimpanzees are related through a common ancestor; neither descends from the other.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Taung child skull was found in South Africa.",
    answer: true,
    explanation: "True. The Taung child, a young Australopithecus, was found at a lime quarry at Taung in South Africa in 1924 and described by Raymond Dart.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Religious creation accounts and the scientific theory of evolution are tested in the same way, by excavating fossils.",
    answer: false,
    explanation: "False. Creation accounts are matters of faith that explain why humans exist; the scientific theory is tested with evidence such as fossils, dating and genetics.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each fossil site with its country. A country may be used more than once.",
    pairs: ["Olduvai Gorge", "Hadar", "Sterkfontein", "Laetoli", "Taung"],
    right: ["Tanzania", "Ethiopia", "South Africa"],
    rightIndex: [0, 1, 2, 0, 2],
    explanation: "Olduvai and Laetoli are both in Tanzania; Hadar (Lucy) is in Ethiopia; Sterkfontein (Mrs Ples) and Taung are in South Africa.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of human development with its main feature.",
    pairs: [
      ["Australopithecus", "Walked upright with a small brain"],
      ["Homo habilis", "Made simple stone choppers and flakes"],
      ["Homo erectus", "Made hand axes, used fire and spread into Asia"],
      ["Homo sapiens", "Modern humans with language and art"],
    ],
    explanation: "The stages show increasing brain size and tool-making skill: upright walking first, then tools, then fire and migration, then modern humans.",
  });
  {
    const t = timeline([
      ["1859", "Darwin publishes On the Origin of Species"],
      ["1924", "The Taung child skull is found"],
      ["1947", "The skull known as Mrs Ples is found at Sterkfontein"],
      ["1974", "Lucy is found at Hadar"],
    ]);
    const order = [3, 0, 2, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["Darwin's theory came before the African fossil finds that supported it.", "Lucy is the most recent of these discoveries."],
      explanation: "Darwin (1859) came first; then the Taung child (1924), Mrs Ples (1947) and Lucy (1974).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Darwin explained evolution through {{blank:a}}: individuals with useful features survive and have more {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["natural selection"], choices: ["natural selection", "creation", "migration", "radiocarbon dating"] },
      { id: "b", accepted: ["offspring"], choices: ["offspring", "tools", "fossils", "enemies"] },
    ],
    explanation: "Natural selection: useful features help survival and reproduction, so they become more common over many generations.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the scientific name (genus) of the species whose name means **'southern ape'**.",
    accepted: ["Australopithecus", "Australopithecine", "Australopithecus africanus", "Australopithecus afarensis"],
    wrong: ["Homo habilis", "Homo erectus"],
    explanation: "**Australopithecus** means 'southern ape'; the name was given by Raymond Dart to the Taung child in 1925.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** theories on the origins of humankind.",
    points: [
      "Religious creation accounts: a creator (God, Mwari) made the first people",
      "Developed: e.g. Adam and Eve in Genesis / these explain why humans exist and are matters of faith",
      "Scientific theory of evolution: humans developed gradually from earlier species",
      "Developed: by natural selection (Darwin), supported by fossil evidence",
    ],
    modelAnswer: "Religious creation accounts teach that a creator made the first people; in the Bible God creates Adam and Eve, and in Shona belief Mwari is the creator. The scientific theory of evolution explains that humans developed gradually over millions of years from earlier hominins through natural selection, as Darwin argued, and it is supported by fossils such as those found at Olduvai and Hadar.",
    explanation: "Two marks for each theory: identify it and describe it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Africa is regarded as the cradle of humankind.",
    points: [
      ["The oldest hominin fossils have been found in Africa (e.g. Lucy at Hadar, the Laetoli footprints)", 2],
      ["Fossils of every main stage of human development, and the oldest stone tools, come from Africa (e.g. Olduvai)", 2],
      ["Genetic evidence shows all living people descend from African populations / suitable environment that also preserved fossils", 2],
    ],
    hints: ["Use named sites as evidence.", "Is there any evidence that does not come from fossils?"],
    modelAnswer: "Africa is called the cradle of humankind because the oldest hominin fossils have been found there, such as Lucy at Hadar in Ethiopia and the footprints at Laetoli in Tanzania, which are more than three million years old. Fossils of every main stage, from Australopithecus to the earliest Homo sapiens, and the oldest stone tools, such as those at Olduvai Gorge, also come from Africa. Finally, genetic studies show that all people alive today descend from populations that lived in Africa, which supports the fossil evidence.",
    explanation: "Each reason must be explained and, ideally, supported by a named site.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Darwin's theory of natural selection.",
    points: [
      "Living things produce more offspring than can survive",
      "Offspring vary (differ slightly from one another)",
      "Those with useful features survive and reproduce more ('survival of the fittest')",
      "Over long periods, small changes build up and new species develop",
    ],
    hints: ["Think in steps: too many offspring, variation, survival, change."],
    modelAnswer: "Darwin argued that living things produce more young than can survive. The young differ slightly from one another. Those with features that suit their environment survive and have more offspring, so the useful features become more common. Over very long periods these small changes produce new species.",
    explanation: "One mark per stage of the argument.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "a description written by a fictional student after a school visit to a fossil museum",
        "We saw a cast of footprints left in volcanic ash. The guide told us the ash had been dated to millions of years ago. The prints had a heel and a big toe pointing forward like mine. Next to them were stone choppers from another site, made far later."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** pieces of evidence described in Source A.", points: ["Fossil footprints in volcanic ash", "Stone choppers (stone tools)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "What can be inferred from Source A about how early hominins moved and when tools appeared?", points: [["The heel and forward-pointing big toe show upright walking on two legs (bipedalism)", 2], ["The tools were made far later than the footprints, so upright walking came before tool-making", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence about human origins? Explain your answer.", type: "EXTENDED_RESPONSE", points: [["It is a secondary account by a student repeating what a guide said, so details may be simplified or misremembered", 2], ["Its content fits own knowledge (e.g. Laetoli footprints about 3.6 mya, later stone tools at Olduvai), so it can be cross-checked", 2], ["Supported judgement: reliable on the general point but not precise (no dates, sites or species named)", 2]], levels: levels(6), modelAnswer: "Source A is a secondary account: a student writing down what a museum guide said about casts of fossils, so details may be simplified or misremembered, and it gives no names, sites or exact dates. However, what it says fits my own knowledge: the Laetoli footprints in Tanzania, about 3.6 million years old, show upright walking, and the earliest stone tools, such as those at Olduvai, are younger. So the source is reliable on the general point that upright walking came before tool-making, but it is not precise enough to use alone." }),
    ],
    hints: ["What does a forward-pointing big toe tell you?", "Who wrote the source and how did they know?"],
    explanation: "Even a simple secondary account can be tested against own knowledge. Here the content matches the Laetoli evidence and the later appearance of stone tools.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the stages of human development.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Name the **four** main stages of human development in order, from the earliest.", points: ["Australopithecus", "Homo habilis", "Homo erectus", "Homo sapiens (all four in the correct order)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe **two** ways in which Homo erectus was more advanced than Homo habilis.", points: [["Made more advanced tools such as hand axes", 2], ["Used fire / was taller with a larger brain / spread out of Africa into Asia", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Fossils are the only reliable evidence about human origins.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: fossils are direct physical evidence and can be dated (e.g. Lucy, the Taung child)", 2], ["Against: stone tools, footprints, dating methods and genetics are also evidence; fossils are rare, incomplete and dates are estimates", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Fossils are vital because they are direct physical remains that can be dated, such as Lucy at Hadar or the Taung child. However, they are rare, often incomplete, and their dates are estimates. Other evidence is also reliable: stone tools show skills, the Laetoli footprints show upright walking, and genetic studies show that all living people have African ancestors. So fossils are not the only reliable evidence; the strongest conclusions come from several kinds of evidence that agree." }),
    ],
    hints: ["In (c) name at least two other kinds of evidence besides fossils."],
    explanation: "Scientists combine fossils, tools, footprints, dating and genetics; each has limits, and agreement between them gives confidence.",
  });

  b.card("DEFINITION", "What is **evolution**?", "Gradual change in living things over many generations, by which new species develop from earlier ones.");
  b.card("DEFINITION", "What is **natural selection**?", "Individuals with features that help them survive have more offspring, so those features become more common over time.");
  b.card("FACT", "When did Darwin publish *On the Origin of Species*?", "1859.");
  b.card("FACT", "The four main stages of human development, in order?", "Australopithecus → Homo habilis → Homo erectus → Homo sapiens.");
  b.card("FACT", "Where was 'Lucy' found, and what is she?", "Hadar, Ethiopia (1974); a partial skeleton of Australopithecus afarensis, about 3.2 million years old.");
  b.card("FACT", "What was found at Laetoli, Tanzania?", "Footprints in volcanic ash, about 3.6 million years old, showing upright walking.");
  b.card("FACT", "What was found at Taung, South Africa?", "The Taung child: the skull of a young Australopithecus (found 1924, described by Raymond Dart in 1925).");
  b.card("FACT", "Which hominin first spread out of Africa?", "Homo erectus.");
  b.card("CONCEPT", "Why is Africa called the cradle of humankind?", "The oldest fossils of every stage and the oldest stone tools are African, and genetics shows all people have African ancestors.");
  b.card("DEFINITION", "What is **bipedalism**?", "Walking upright on two legs.");
});
