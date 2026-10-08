// Slice ERD: reading skills — writers' effects (language, imagery, structure).
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the extract and answer the question.\n\n> ${text}`;

const STORM = `Read the extract from a story and answer the questions.

**[1]** All afternoon the sky over Nyanga had been sulking, grey and heavy, but nobody at the camp took any notice. The Form 3 class from Gweru were too busy arguing about whose turn it was to fetch firewood. Only Mr Dube, the geography teacher, kept glancing up at the clouds that were piling over World's View like dirty laundry.

**[2]** The first drops were fat and warm, and the pupils laughed and held out their tongues. Then the wind arrived. It came tearing down the slope, snatched the tarpaulin off the cooking shelter and flung it into the pines as if it were a sheet of newspaper. Within a minute the rain was no longer falling; it was attacking — hammering on the tents, drumming on the cooking pots, turning the path into a brown, gurgling stream.

**[3]** Mr Dube's whistle cut through the noise. "Into the hall! Now! Leave everything!" Forty pupils ran, slid and stumbled across the field. Rutendo lost a shoe in the mud and did not stop to look for it.

**[4]** In the hall they stood dripping and silent, listening to the roof roar above them. Someone began to count. One. Two. Three. Four. Lightning lit the windows white. Then the thunder came, so close that the floor seemed to shudder under their feet.

**[5]** By seven o'clock it was over. The clouds slunk away eastwards, and a washed, pale moon rose over the pines as if nothing had happened at all.`;

concept("eng.reading.writers-craft", { file: "reading/writers-craft", keyPrefix: "reading.writers-craft" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **connotation** of a word?",
    options: [
      ["The feelings and associations it carries", "Correct: e.g. home suggests warmth and belonging, beyond house."],
      ["Its dictionary definition only", "That is its denotation, its basic meaning."],
      ["The number of syllables it contains", "Syllables have nothing to do with connotation."],
      ["The language it originally came from", "That is its origin (etymology)."],
    ],
    answer: "A",
    explanation: "**Connotation** = the associations of a word beyond its literal meaning. *Stench* and *fragrance* are both smells, with opposite connotations.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "*The wind whispered through the msasa trees.* Which technique is used?",
    options: [
      ["personification", "Correct: whispering is a human action given to the wind."],
      ["simile", "There is no like or as comparison."],
      ["alliteration", "There is no repeated initial sound pattern of note here."],
      ["rhetorical question", "The sentence is a statement, not a question."],
    ],
    answer: "A",
    explanation: "**Personification** gives human qualities to non-human things. *Whispered* makes the wind seem gentle and secretive.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the technique it uses.",
    pairs: [
      ["The heat pressed down like a wet blanket.", "simile"],
      ["The market is a beehive at dawn.", "metaphor"],
      ["The old gate groaned in complaint.", "personification"],
      ["The cart clattered and clanked.", "onomatopoeia"],
    ],
    explanation: "Simile = *like/as*; metaphor = says one thing *is* another; personification = human action for a thing; onomatopoeia = words that imitate sounds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which word for walking suggests that a person is **tired and unhappy**?",
    options: [
      ["trudged", "Correct: trudged suggests heavy, slow, weary steps."],
      ["strolled", "Strolled suggests a relaxed, pleasant walk."],
      ["skipped", "Skipped suggests lightness and joy."],
      ["marched", "Marched suggests purpose and determination."],
    ],
    answer: "A",
    explanation: "Verbs of movement carry strong connotations: **trudged** = weary and reluctant; *strolled* = relaxed; *skipped* = happy; *marched* = determined.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*The floodwater **swallowed** the low bridge in a single night.*") + "\n\nWhat effect does the word **swallowed** have?",
    options: [
      ["The flood seems a greedy creature that makes the bridge vanish", "Correct: swallowing suggests a living thing consuming something completely."],
      ["It suggests the bridge was too small and narrow to be seen", "The word describes the water's action, not the size of the bridge."],
      ["It suggests that the water was clean enough to drink", "The literal sense of drinking is not intended here."],
      ["It tells the reader that the flood was slow and gentle", "In a single night and swallowed both suggest speed and power."],
    ],
    answer: "A",
    explanation: "Use the four steps: meaning (covered completely) → connotation (a hungry creature gulping food) → effect (the flood seems powerful, the bridge disappears completely, the reader senses danger).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: writing *\"Like a wet blanket\" is a simile* is enough to earn the marks for explaining the effect of the phrase.",
    answer: false,
    explanation: "False. Naming the technique earns little or nothing. You must explain what the comparison suggests (oppressive, suffocating heat) and its effect on the reader.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the word with the **negative** connotation to complete each sentence.",
    template: "The kitchen was filled with the {{blank:a}} of rotting fish. The {{blank:b}} dog searched the bins for food.",
    blanks: [
      { id: "a", accepted: ["stench"], choices: ["stench", "fragrance", "aroma", "scent"] },
      { id: "b", accepted: ["scrawny"], choices: ["scrawny", "slender", "slim", "lean"] },
    ],
    explanation: "**Stench** is an unpleasant smell (fragrance, aroma and scent are pleasant or neutral). **Scrawny** suggests unhealthy thinness (slender, slim and lean are neutral or positive).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*Tafadzwa ran past the tuck shop, through the gate and down the road towards the river, calling her brother's name over and over. Nobody answered.*") + "\n\nWhat is the effect of the short final sentence?",
    options: [
      ["It stops the reader abruptly and creates a sense of fear", "Correct: the sudden short sentence contrasts with the long breathless one."],
      ["It shows that Tafadzwa has stopped looking for her brother", "Nothing suggests she has given up; it stresses the silence."],
      ["It speeds up the action with a list of places", "The list is in the long sentence, not the short one."],
      ["It tells the reader that the brother is safe at home", "It suggests the opposite: no answer, so possible danger."],
    ],
    answer: "A",
    hints: ["Compare the length of the two sentences.", "What does the silence suggest about the brother?"],
    explanation: "Short sentences after long ones create **tension and emphasis**. The silence hits the reader suddenly, just as it hits Tafadzwa.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ext("*They waited. They waited through the night. They waited until the sun came up over the kopje.*") + "\n\nWhat is the main effect of the repetition of *They waited*?",
    options: [
      ["It emphasises how long and tiring the wait felt", "Correct: the repetition makes the reader feel the dragging time."],
      ["It shows that the writer has a limited vocabulary", "The repetition is a deliberate technique, not a weakness."],
      ["It suggests that the people waited only briefly", "Through the night and until sunrise show a long wait."],
      ["It introduces a new character to the story", "No new character is introduced."],
    ],
    answer: "A",
    hints: ["How does saying something three times change the way you feel about it?"],
    explanation: "Deliberate **repetition** with growing detail (*through the night … until the sun came up*) stretches the time and emphasises the characters' patience or anxiety.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS",
    stem: ext("*The heat pressed down on Kariba like a heavy wet blanket.*") + "\n\nExplain the effect of the simile. Use the steps: meaning, association, effect on the reader.",
    marks: 3,
    points: [
      "Meaning: it was extremely hot and humid / airless",
      "Association: a heavy wet blanket is suffocating, uncomfortable and hard to throw off",
      "Effect: the reader feels the oppressive, inescapable heat and the people's discomfort",
    ],
    modelAnswer: "It shows the heat was humid and heavy. A wet blanket is smothering and impossible to push away, so the reader feels how suffocating and inescapable the heat was.",
    hints: ["What would it feel like to have a heavy wet blanket over you?"],
    explanation: "A full effect answer moves from literal meaning to association to the reader's response, rather than only naming the technique.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which comment on the phrase *the crowd **surged** towards the gate* is the **best** analysis?",
    options: [
      ["Surged suggests a powerful wave, so the crowd seems uncontrollable and dangerous.", "Correct: it explains the connotation and the effect."],
      ["Surged is a good verb that makes the passage more interesting to read.", "This is generic: it does not say what the word suggests."],
      ["Surged is an example of a verb in the past tense.", "This identifies grammar, not effect."],
      ["Surged means that the crowd moved towards the gate.", "This gives only the literal meaning."],
    ],
    answer: "A",
    hints: ["Which comment explains both the association and the effect?"],
    explanation: "The best answer explains the **connotation** (a wave of water) and the **effect** (the crowd seems powerful and dangerous). Generic or literal comments score little.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1200,
    stem: STORM,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In paragraph 1, the sky *had been sulking*. Which technique is this?",
        options: [
          ["personification", "Correct: sulking is a human mood given to the sky."],
          ["simile", "There is no like or as."],
          ["onomatopoeia", "Sulking does not imitate a sound."],
          ["alliteration", "There is no repeated initial sound."],
        ],
        answer: "A",
        explanation: "The sky is given a human mood: **personification**.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Explain what *sulking* suggests about the sky and the weather to come.",
        points: [
          "A sulking person is gloomy and silently bad-tempered, so the sky is dark, heavy and threatening",
          "It hints that the bad mood will break out: a storm is coming / builds suspense",
        ],
        modelAnswer: "The sky is dark and gloomy like a person in a silent bad mood, which hints that its anger will soon burst out as a storm.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "In paragraph 1, the clouds pile up *like dirty laundry*. Explain the effect of this simile.",
        points: [
          "Clouds are grey / dirty-looking and heaped up untidily",
          "Effect: an ordinary, unpleasant image that suggests mess and something nobody is paying attention to (the pupils ignore it)",
        ],
        modelAnswer: "The clouds are grey, heaped and messy like a pile of unwashed clothes; the homely image suggests something unpleasant building up that people ignore.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "In paragraph 2, the wind *came tearing down the slope, snatched the tarpaulin … and flung it*. Choose **one** of the verbs *tearing*, *snatched* or *flung* and explain its effect.",
        points: [
          "Identifies the verb and its meaning in context (moved violently / grabbed suddenly / threw forcefully)",
          "Connotation: violence, aggression or carelessness, like a person or wild animal",
          "Effect on the reader: the wind seems violent and frightening; shock at how quickly it struck",
        ],
        modelAnswer: "\"Snatched\" means grabbed suddenly and roughly, as a thief would. It makes the wind seem aggressive and sudden, so the reader is shocked at how quickly the calm turned violent.",
      }),
      P.mcq({
        label: "(e)",
        stem: "In paragraph 2, the rain *was no longer falling; it was attacking*. What does this contrast suggest?",
        options: [
          ["The rain changed from ordinary to violent and hostile", "Correct: falling is ordinary; attacking is aggressive."],
          ["The rain stopped suddenly and the sky cleared", "The storm grew worse; it did not clear until paragraph 5."],
          ["The rain was falling only on the pupils' tents", "Attacking describes force, not a place."],
          ["The pupils were attacking each other in the rain", "The verb describes the rain, not the pupils."],
        ],
        answer: "A",
        explanation: "The writer contrasts a neutral verb (*falling*) with a violent one (*attacking*) to show the sudden change in force.",
      }),
      P.short({
        label: "(f)",
        stem: "Find **one** example of onomatopoeia in paragraph 2.",
        accepted: ["hammering", "drumming", "gurgling"],
        model: "drumming",
        wrong: ["tearing"],
        explanation: "*Hammering*, *drumming* and *gurgling* imitate the sounds of the rain and the water.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "In paragraph 4, *Someone began to count. One. Two. Three. Four.* Explain the effect of these very short sentences.",
        points: [
          "They slow the pace / imitate the counting between lightning and thunder",
          "They create tension and suspense as the reader waits for the thunder",
        ],
        modelAnswer: "The one-word sentences slow the story down to the pace of the counting, so the reader holds their breath with the pupils, waiting for the thunder.",
      }),
    ],
    hints: ["For each choice: identify, meaning, connotation, effect.", "Avoid generic comments such as *it makes it interesting*."],
    explanation: "The writer builds the storm through personification (sulking, slunk), violent verbs (tearing, snatched, flung, attacking), onomatopoeia (hammering, drumming, gurgling) and structure (one-word sentences while counting).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `${STORM}\n\nIn paragraph 5, the clouds *slunk away*. What does **slunk** suggest?`,
    options: [
      ["The storm creeps away quietly, as if ashamed", "Correct: slink suggests moving quietly and shamefully."],
      ["The clouds rushed off with loud rolls of thunder", "Slunk suggests quiet, not noise."],
      ["The clouds were growing larger, darker and wider", "They are leaving; slunk does not suggest growth."],
      ["The storm was proud of the damage it had done", "Slinking is the opposite of proud behaviour."],
    ],
    answer: "A",
    hints: ["Think of how a dog that has stolen food leaves the kitchen."],
    explanation: "*Slunk* continues the personification: the storm creeps away quietly as if ashamed, a contrast with its earlier violence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which phrase is a **metaphor**?",
    options: [
      ["The classroom was a furnace by noon.", "Correct: the classroom is said to be a furnace, with no like or as."],
      ["The classroom was as hot as a furnace.", "This uses as … as: a simile."],
      ["The classroom was very hot by noon.", "This is a plain description with no comparison."],
      ["The classroom felt like an oven at noon.", "This uses like: a simile."],
    ],
    answer: "A",
    explanation: "A **metaphor** says one thing *is* another; a **simile** uses *like* or *as*. Both compare, but the metaphor is more direct.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS",
    stem: ext("*The old bus groaned up the escarpment, coughing black smoke, its seats crammed with sacks, chickens and sleepy passengers.*") + "\n\nChoose **two** words or phrases and explain how each helps the reader picture the bus.",
    marks: 4,
    points: [
      "First choice identified and its meaning or connotation explained (e.g. groaned: personification suggesting strain and age)",
      "Effect of the first choice on the reader explained",
      "Second choice identified and its meaning or connotation explained (e.g. coughing / crammed)",
      "Effect of the second choice on the reader explained",
    ],
    modelAnswer: "\"Groaned\" makes the bus sound like a tired old person in pain, so the reader feels it struggling up the slope. \"Crammed\" suggests the seats are packed far beyond comfort, so the reader pictures a noisy, overcrowded journey.",
    hints: ["Look at the verbs first: groaned, coughing, crammed."],
    explanation: "Choose precise words and explain each: *groaned* and *coughing* personify the bus as old and ill; *crammed* shows overcrowding; the list of sacks, chickens and passengers adds busy detail.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which sentence uses **alliteration**?",
    options: [
      ["Big black buses blocked the busy bridge.", "Correct: the repeated b sound is alliteration."],
      ["The buses were stuck on the bridge for hours.", "There is no pattern of repeated first sounds."],
      ["The bridge was as crowded as a market.", "This is a simile, not alliteration."],
      ["Crash! The bus hit the side of the bridge.", "Crash is onomatopoeia, not alliteration."],
    ],
    answer: "A",
    explanation: "**Alliteration** repeats the first sound of nearby words. Here the heavy *b* sounds echo the blocked, crowded scene.",
  });

  b.card("DEFINITION", "What is **connotation**?", "The feelings and associations a word carries beyond its basic meaning.", "home vs house; stench vs fragrance");
  b.card("CONCEPT", "Effect method", "Identify → meaning in context → connotation/association → effect on the reader.", undefined);
  b.card("DEFINITION", "Simile vs metaphor", "A simile compares using like or as; a metaphor says one thing is another.", "as hot as a furnace / the room was a furnace");
  b.card("DEFINITION", "What is **personification**?", "Giving human qualities or actions to something that is not human.", "The sky was sulking.");
  b.card("DEFINITION", "What is **onomatopoeia**?", "A word that imitates the sound it describes.", "crack, hiss, clatter, thud, drumming");
  b.card("CONCEPT", "Effect of short sentences", "They create tension, shock or emphasis, especially after long sentences.", "Nobody answered.");
  b.card("CONCEPT", "Effect of repetition", "It emphasises an idea, builds rhythm or stretches a feeling of time.", undefined);
  b.card("CONCEPT", "Avoid generic comments", "Do not write 'it makes it interesting' or 'it is vivid'. Say what the reader sees or feels and why.", undefined);
  b.card("VOCABULARY", "Verbs for effect answers", "suggests, conveys, emphasises, highlights, creates a sense of, evokes", "Better than 'shows'.");
  b.card("VOCABULARY", "Connotation pairs", "slender / scrawny; strolled / trudged; chatted / gossiped; fragrance / stench", undefined);
});
