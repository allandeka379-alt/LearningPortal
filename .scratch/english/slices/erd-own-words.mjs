// Slice ERD: reading skills — answering in your own words (paraphrasing).
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the sentence from a passage and answer the question.\n\n> ${text}`;

const TRADER = `Read the article and answer the questions.

**A second life for old tyres**

**[1]** On a patch of ground behind the bus terminus in Masvingo, Mr Gift Marufu sits among towers of worn-out tyres. To most people they are rubbish: they block drains, collect stagnant water in which mosquitoes breed, and release choking black smoke when they are burned. To Mr Marufu they are raw material.

**[2]** He began cutting tyres into sandals eleven years ago, when he lost his job at a factory that closed down. At first he sold only to neighbours, but his sandals proved so durable that customers came back to buy pairs for their whole families. A pair, he claims, will outlast three pairs of shop shoes.

**[3]** His methods are simple. He chooses tyres with thick, unbroken treads, cuts the soles with a sharpened knife and stitches on straps made from inner tubes. Nothing is wasted: the scraps are sold to a man who makes flower pots and door mats.

**[4]** Mr Marufu is aware that his trade is precarious. He has no licence to occupy the land, and the council could evict him at any time. Cheap imported sandals have also become plentiful at the market. Nevertheless, he is optimistic. "People will always need shoes that last," he says, "and there will always be tyres."

**[5]** He now trains two young men from the neighbourhood, hoping that the skill will not disappear when he retires.`;

concept("eng.reading.own-words", { file: "reading/own-words", keyPrefix: "reading.own-words" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **lifting** in a comprehension answer?",
    options: [
      ["Copying words directly from the passage", "Correct: lifted key words earn no marks in an own-words answer."],
      ["Changing the key words into synonyms", "That is paraphrasing, the opposite of lifting."],
      ["Writing more than the word limit", "That is exceeding the word limit."],
      ["Leaving out a point the question asks for", "That is an omission, not lifting."],
    ],
    answer: "A",
    explanation: "**Lifting** = copying from the passage. When a question says *in your own words*, the key words must be changed so the examiner can see you understood.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an own-words answer, which words **must** you change?",
    options: [
      ["The key words that carry the meaning being tested", "Correct: these show whether you understood."],
      ["Every single word, including the and and", "Small common words can stay."],
      ["Only the names of people and places in the passage", "Names cannot usually be changed and do not show understanding."],
      ["Only the first word of each sentence", "The position of a word does not matter; its importance does."],
    ],
    answer: "A",
    explanation: "Change the **key words** (the nouns, verbs, adjectives and adverbs that carry the idea). Small words and words with no equivalent (maize, borehole, Harare) may stay.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: ext("*The farmers were anxious because the rains had been erratic.*") + "\n\nWhich answer explains why the farmers were worried **in your own words**?",
    options: [
      ["The rain had fallen unpredictably.", "Correct: erratic is replaced with an accurate equivalent."],
      ["The rains had been very erratic.", "This lifts the key word erratic."],
      ["The rain had stopped completely.", "Erratic means irregular, not stopped: the meaning has changed."],
      ["The farmers had planted too late.", "This adds an idea that is not in the sentence."],
    ],
    answer: "A",
    explanation: "*Erratic* means irregular or unpredictable. *Fallen unpredictably* keeps the meaning without lifting.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: ext("*The pupils were **furious** about the cancelled trip.*") + "\n\nWhich paraphrase keeps the **same strength** of feeling?",
    options: [
      ["The learners were extremely angry.", "Correct: furious means very angry."],
      ["The learners were slightly annoyed.", "Too weak: the strength of the feeling has changed."],
      ["The learners were rather surprised.", "Surprise is a different feeling."],
      ["The learners were violent and wild.", "This adds behaviour the sentence does not mention."],
    ],
    answer: "A",
    explanation: "A good synonym keeps both the **meaning** and the **strength** of the original: furious = extremely angry.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*Some residents may lose their homes if the river continues to rise.*") + "\n\nWhich paraphrase changes the **meaning**?",
    options: [
      ["All residents will lose their homes because the river is rising.", "Correct: some → all and may → will change the meaning, and the condition is lost."],
      ["If the river keeps rising, a few people could lose their houses.", "This keeps the meaning: some, may and the condition are all there."],
      ["A number of people might be left homeless should the water rise further.", "This keeps the meaning in different words and structure."],
      ["Certain residents could lose their homes if the water level goes on rising.", "This keeps the meaning accurately."],
    ],
    answer: "A",
    hints: ["Compare small words such as *some*, *may* and *if* in each version."],
    explanation: "Limiting words matter: *some* is not *all*, *may* is not *will*, and *if* introduces a condition. Changing them changes the meaning.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the plain own-words equivalent for each word in bold.",
    template: "The supply of clean water was **scarce** = {{blank:a}}. The road continued to **deteriorate** = {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["in short supply"], choices: ["in short supply", "very dirty", "far away", "expensive"] },
      { id: "b", accepted: ["get worse"], choices: ["get worse", "get busier", "get longer", "get repaired"] },
    ],
    explanation: "**Scarce** = in short supply, hard to find. **Deteriorate** = get worse.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each passage word with a plain own-words equivalent.",
    pairs: [["abundant", "more than enough"], ["reluctant", "unwilling"], ["commence", "begin"], ["vital", "essential"], ["obtain", "get"]],
    explanation: "Building a bank of plain equivalents for common passage words makes own-words answers faster and more accurate.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: in an own-words answer, you must find a synonym for the word *maize*.",
    answer: false,
    explanation: "False. Words with no simple equivalent (maize, borehole, names of places) may stay. Change the words that carry the idea being tested.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false: adding your own opinion to a paraphrase can make it inaccurate.",
    answer: true,
    explanation: "True. A paraphrase keeps only the writer's meaning. Adding opinions or extra ideas changes what the passage says.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: ext("*Despite the heavy rain, the spectators remained in their seats until the final whistle.*") + "\n\nRewrite the sentence in your own words without changing its meaning.",
    marks: 2,
    points: [
      "Replaces despite / heavy rain with own words (e.g. although it was pouring, in spite of the downpour)",
      "Replaces spectators remained in their seats until the final whistle (e.g. the crowd did not leave before the match ended)",
    ],
    modelAnswer: "Although it was pouring, the crowd did not leave before the match ended.",
    hints: ["Find a different way to say *despite*, *spectators*, *remained in their seats* and *final whistle*."],
    explanation: "A strong paraphrase changes the key words **and** the structure while keeping every part of the meaning: the rain, the crowd staying and the end of the match.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION",
    stem: ext("*News of the closure spread through the township like wildfire.*") + "\n\nExplain in your own words what this sentence means.",
    marks: 2,
    points: [
      "Very quickly (explains *like wildfire*)",
      "Almost everyone in the township heard / found out that the place was closing",
    ],
    modelAnswer: "Within a very short time, nearly everybody in the township knew that the place was shutting down.",
    hints: ["What does fire do in dry grass?"],
    explanation: "Explain the image plainly: wildfire spreads fast and widely, so the news reached nearly everyone **very quickly**.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: ext("*The clinic was inadequately equipped to cope with the outbreak.*") + "\n\nWhich is the **best** own-words version?",
    options: [
      ["The clinic did not have enough equipment to deal with the sudden spread of illness.", "Correct: all key ideas are kept and every key word is changed."],
      ["The clinic was inadequately equipped to deal with the outbreak of illness.", "This lifts inadequately equipped and outbreak."],
      ["The clinic had poor staff who did not know how to treat the disease well.", "Staff are not mentioned: the meaning has changed."],
      ["The clinic was closed because of an illness that spread quickly through the whole area.", "The clinic was not closed: this changes the meaning."],
    ],
    answer: "A",
    hints: ["Check two things: are the key words changed, and is the meaning exactly the same?"],
    explanation: "The best paraphrase changes *inadequately equipped* (did not have enough equipment), *cope with* (deal with) and *outbreak* (sudden spread of illness) while adding nothing.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 1080,
    stem: TRADER,
    parts: [
      P.manual({
        label: "(a)",
        marks: 3,
        stem: "Using your own words, explain why most people think of old tyres as rubbish (paragraph 1).",
        points: [
          "They stop drains working / clog drains (not *block drains*)",
          "Water gathers in them where mosquitoes multiply (not *stagnant water … breed*)",
          "Burning them gives off thick, dark, harmful smoke (not *choking black smoke*)",
        ],
        modelAnswer: "They clog drains, they hold still water where mosquitoes multiply, and they give off thick dark fumes that make people cough when set alight.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Using your own words, explain why customers came back to buy more sandals (paragraph 2).",
        points: [
          "The sandals last a long time / are hard-wearing (not *durable*)",
          "So customers bought them for everyone in their family",
        ],
        modelAnswer: "The sandals were so hard-wearing that people returned to get pairs for all their relatives at home.",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 4, *his trade is precarious*. Which own-words version is most accurate?",
        options: [
          ["His business could easily be lost.", "Correct: precarious means insecure, likely to fail or be taken away."],
          ["His business is very dangerous to his health.", "Precarious here refers to insecurity, not physical danger."],
          ["His business is growing very quickly.", "The paragraph describes threats, not growth."],
          ["His business is against the law.", "He lacks a licence for the land, but precarious does not mean illegal."],
        ],
        answer: "A",
        explanation: "**Precarious** = not secure, in danger of being lost. The paragraph explains why: no licence, possible eviction, cheap imports.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "Using your own words, give **two** threats to Mr Marufu's business (paragraph 4).",
        points: [
          "He could be forced off the land by the council at any moment (not *evict*)",
          "Inexpensive sandals from other countries are now easy to find (not *cheap imported … plentiful*)",
        ],
        modelAnswer: "The council could make him leave the land whenever it wants, and low-priced sandals from abroad are now everywhere in the market.",
      }),
      P.short({
        label: "(e)",
        stem: "Which **one word** in paragraph 4 shows that Mr Marufu expects the future to be good?",
        accepted: ["optimistic"],
        wrong: ["precarious"],
        explanation: "*Nevertheless, he is optimistic*: hopeful about the future despite the threats.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "Using your own words, explain why Mr Marufu trains two young men (paragraph 5).",
        points: [
          "He wants the craft / knowledge to survive / be passed on (not *skill will not disappear*)",
          "After he stops working / when he is too old to work (not *retires*)",
        ],
        modelAnswer: "He wants the craft to be passed on so that it continues after he has stopped working.",
      }),
    ],
    hints: ["Underline the answer in the paragraph, circle the key words, then replace each one.", "Count the points in the passage: your answer needs all of them."],
    explanation: "In own-words parts the examiner looks for each idea expressed without the passage's key words, e.g. *durable* → hard-wearing; *evict* → force him to leave; *retires* → stops working.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: ext("*Water was abundant in the valley, so the villagers rarely went thirsty.*") + "\n\nWhich paraphrase is accurate?",
    options: [
      ["There was plenty of water in the valley, so people were seldom without a drink.", "Correct: abundant = plentiful; rarely = seldom."],
      ["There was some water in the valley, so people were never without a drink.", "Some is weaker than abundant, and never is stronger than rarely."],
      ["There was clean water in the valley, so people were always healthy and strong.", "Clean and healthy add ideas not in the sentence."],
      ["There was little water in the valley, so people were usually without a drink.", "This reverses the meaning."],
    ],
    answer: "A",
    hints: ["Check *abundant* and *rarely* carefully."],
    explanation: "Keep both key ideas at the same strength: **abundant** → plentiful; **rarely** → seldom (not never).",
  });
  b.manualShort({
    d: 4, skill: "CREATION", examStyle: true,
    stem: ext("*The committee was reluctant to commence construction until adequate funds had been obtained.*") + "\n\nRewrite the sentence in your own words. Change all the key words and, if you can, the structure.",
    marks: 3,
    points: [
      "Reluctant is replaced (e.g. unwilling, did not want)",
      "Commence construction is replaced (e.g. start building)",
      "Until adequate funds had been obtained is replaced (e.g. before they had raised enough money)",
    ],
    modelAnswer: "The committee did not want to start building before they had raised enough money.",
    hints: ["There are four key words: reluctant, commence, adequate, obtained (plus construction)."],
    explanation: "Each key idea is replaced with a plain equivalent: *reluctant* → unwilling, *commence construction* → start building, *adequate funds obtained* → enough money raised.",
  });

  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: ext("*The vendors in Harare were jubilant when the market was reopened.*") + "\n\nIn an own-words answer about how the vendors felt, which word **must** be changed?",
    options: [
      ["jubilant", "Correct: it carries the feeling being tested (very happy, overjoyed)."],
      ["Harare", "A place name cannot and need not be changed."],
      ["the", "Small common words can stay."],
      ["when", "This joining word does not carry the meaning being tested."],
    ],
    answer: "A",
    explanation: "The key word for a question about feelings is **jubilant**: write *overjoyed* or *extremely happy* instead.",
  });

  b.card("DEFINITION", "What is a **paraphrase**?", "A re-expression of an idea in different words that keeps exactly the same meaning.", undefined);
  b.card("DEFINITION", "What is **lifting**?", "Copying words from the passage; lifted key words earn no credit in an own-words answer.", undefined);
  b.card("CONCEPT", "Which words must change?", "The key words that carry the meaning being tested. Small common words and words with no equivalent (maize, borehole) may stay.", undefined);
  b.card("CONCEPT", "Own-words method", "Underline the answer → circle key words → replace each accurately → rebuild and check the meaning.", undefined);
  b.card("CONCEPT", "Keep the strength of meaning", "Furious = extremely angry (not slightly annoyed). Keep limits: some ≠ all, may ≠ will, rarely ≠ never.", undefined);
  b.card("VOCABULARY", "Own-words bank (1)", "deteriorate = get worse; abundant = plentiful; reluctant = unwilling; obtain = get", undefined);
  b.card("VOCABULARY", "Own-words bank (2)", "scarce = in short supply; vital = essential; commence = begin; inadequate = not enough", undefined);
  b.card("CONCEPT", "Paraphrasing an image", "Explain the plain idea: 'spread like wildfire' = became known very quickly by almost everyone.", undefined);
  b.card("FACT", "When are own words required?", "When the question says 'in your own words' or 'using your own words', and in every summary.", undefined);
});
