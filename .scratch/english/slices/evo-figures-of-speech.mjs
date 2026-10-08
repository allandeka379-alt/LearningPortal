// Slice EVO: figures of speech and their effects.
import { concept } from "../lib.mjs";

concept("eng.vocabulary.figures-of-speech", { file: "vocabulary/figures-of-speech", keyPrefix: "vocabulary.figures-of-speech" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which figure of speech is used here?\n\n*Her smile was as bright as the morning sun.*",
    options: [
      ["simile", "Correct: the smile is compared to the sun using as … as."],
      ["metaphor", "A metaphor makes the comparison without like or as."],
      ["personification", "Nothing non-human is given human qualities."],
      ["onomatopoeia", "No word imitates a sound."],
    ],
    answer: "A",
    explanation: "A **simile** compares two different things using *like* or *as*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is an example of **onomatopoeia**?",
    options: [
      ["sizzle", "Correct: sizzle imitates the sound of food frying."],
      ["quiet", "Quiet describes the absence of sound but does not imitate one."],
      ["loudly", "Loudly describes volume but does not imitate a sound."],
      ["music", "Music names a kind of sound but does not imitate it."],
    ],
    answer: "A",
    explanation: "**Onomatopoeia** = a word that sounds like the noise it names: sizzle, buzz, crash, hiss, thud.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which figure of speech is used here?\n\n*The classroom was a zoo when the teacher left the room.*",
    options: [
      ["metaphor", "Correct: the classroom is said to be a zoo, without like or as."],
      ["simile", "There is no like or as, so it is not a simile."],
      ["hyperbole", "It may exaggerate, but the device is a direct comparison: a metaphor."],
      ["alliteration", "There is no repeated initial consonant sound."],
    ],
    answer: "A",
    explanation: "A **metaphor** says one thing *is* another: the noisy, wild classroom *was* a zoo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sentence contains **personification**?",
    options: [
      ["The old house groaned in the storm.", "Correct: groaning is a human action given to a house."],
      ["The old house was as cold as ice.", "This is a simile."],
      ["The old house had a broken door.", "This is literal description."],
      ["The old house was a crumbling ruin.", "This is a literal description of its condition."],
    ],
    answer: "A",
    explanation: "**Personification** gives human qualities or actions to non-human things: a house cannot *groan*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which figure of speech is used here?\n\n*I have told you a million times to lock the gate!*",
    options: [
      ["hyperbole", "Correct: a million times is a deliberate exaggeration."],
      ["euphemism", "A euphemism softens an unpleasant idea."],
      ["oxymoron", "There are no opposite words side by side."],
      ["simile", "There is no comparison with like or as."],
    ],
    answer: "A",
    explanation: "**Hyperbole** is exaggeration for emphasis. Here it shows the speaker's frustration.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which phrase is an **oxymoron**?",
    options: [
      ["deafening silence", "Correct: deafening and silence are opposites placed together."],
      ["loud thunder", "Loud and thunder go together naturally; they are not opposites."],
      ["silent night", "Silent and night do not contradict each other."],
      ["noisy crowd", "Noisy and crowd do not contradict each other."],
    ],
    answer: "A",
    explanation: "An **oxymoron** places two contradictory words together: *deafening silence*, *open secret*, *cruel kindness*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "*The manager said that twenty workers had been \"let go\" because of the drought.*\n\nWhat is the effect of the phrase *let go*?",
    options: [
      ["It softens the news that the workers lost their jobs.", "Correct: let go is a euphemism for dismissed."],
      ["It exaggerates how many workers lost their jobs.", "The number is given plainly; there is no exaggeration."],
      ["It suggests the workers were happy to leave.", "Let go hides the dismissal; it does not say the workers were pleased."],
      ["It compares the workers to animals set free.", "There is no comparison here."],
    ],
    answer: "A",
    hints: ["What does the manager really mean by let go?"],
    explanation: "A **euphemism** is a mild expression for something unpleasant. *Let go* = dismissed; it makes the news sound less harsh.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "*The fire station burnt down on the night of the fire-safety awareness evening.*\n\nWhich figure of speech does this situation illustrate?",
    options: [
      ["irony", "Correct: the outcome is the opposite of what we would expect from a fire station on that night."],
      ["hyperbole", "Nothing is exaggerated."],
      ["personification", "Nothing is given human qualities."],
      ["metaphor", "There is no comparison."],
    ],
    answer: "A",
    hints: ["What would you expect a fire station to do with fires?"],
    explanation: "**Situational irony**: events turn out the opposite of what is expected.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "*The angry river swallowed the bridge in a single night.*\n\nWhich explanation of the effect is the **best**?",
    options: [
      ["It makes the river seem violent and deliberate, building a sense of danger.", "Correct: it names the effect of angry and swallowed on the reader."],
      ["It tells us that the river was wide and that the bridge was old.", "Neither detail is in the sentence; this does not discuss effect."],
      ["It is personification because a river cannot really feel angry.", "This identifies the device but does not explain its effect."],
      ["It uses a simile to compare the river to a hungry animal.", "There is no like or as, so it is not a simile."],
    ],
    answer: "A",
    hints: ["A good answer explains what the reader feels or pictures, not just the device's name."],
    explanation: "Strong answers explain **effect**: *angry* and *swallowed* make the river sound like a fierce creature acting on purpose, which creates a sense of danger.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sentence is a **rhetorical question**?",
    options: [
      ["Can we really accept rivers full of plastic?", "Correct: it is asked for effect; the answer (no) is obvious."],
      ["What time does the bus to Gweru leave?", "This is a genuine request for information."],
      ["Have you finished your homework yet?", "This is a genuine question expecting an answer."],
      ["Where did you put the key to the gate at the back of the house?", "This is a genuine question expecting an answer."],
    ],
    answer: "A",
    explanation: "A **rhetorical question** is asked for effect, not for an answer. It pushes the audience to agree with the speaker.",
  });
  b.fib({
    d: 2,
    stem: "Choose the figure of speech used in each sentence.",
    template: "*Peter Piper picked a pack of pumpkins* uses {{blank:a}}. *The thunder crashed* uses {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["alliteration"], choices: ["alliteration", "onomatopoeia", "irony", "euphemism"] },
      { id: "b", accepted: ["onomatopoeia"], choices: ["onomatopoeia", "alliteration", "irony", "euphemism"] },
    ],
    explanation: "Repeated initial *p* sounds = **alliteration**. *Crashed* imitates the sound = **onomatopoeia**.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the figure of speech used in each sentence from a story.",
    template: "*The lorry crawled up the escarpment like a wounded beetle* is a {{blank:a}}. *The sun glared down at the workers* is an example of {{blank:b}}. *What a wonderful day for a picnic,* she said, as the hail fell, which is {{blank:c}}. *We will fight for our school, work for our school and stand up for our school* uses {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["simile"], choices: ["simile", "metaphor", "euphemism", "oxymoron"] },
      { id: "b", accepted: ["personification"], choices: ["personification", "hyperbole", "simile", "alliteration"] },
      { id: "c", accepted: ["irony"], choices: ["irony", "oxymoron", "euphemism", "simile"] },
      { id: "d", accepted: ["repetition"], choices: ["repetition", "onomatopoeia", "euphemism", "oxymoron"] },
    ],
    hints: ["Look for like or as; for human actions; for words meaning the opposite of the situation; and for repeated phrases."],
    explanation: "*like a wounded beetle* = **simile**; the sun *glared* (a human action) = **personification**; praising the weather during hail = verbal **irony**; *for our school* repeated = **repetition**.",
  });
  b.short({
    d: 2,
    stem: "Name the figure of speech in one word.\n\n*The leaves danced in the breeze.*",
    accepted: ["personification"],
    wrong: ["metaphor", "simile"],
    explanation: "Leaves cannot really dance: a human action given to a non-human thing is **personification**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every sentence that contains the word *like* is a simile.",
    answer: false,
    explanation: "False. *I like rice* and *She looks like her mother* are literal. A simile compares two **different** things using *like* or *as*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the figure of speech it shows.",
    pairs: [["He passed away last year.", "euphemism"], ["The hall was a furnace.", "metaphor"], ["an open secret", "oxymoron"], ["My bag weighs a tonne!", "hyperbole"], ["Buzz went the bee.", "onomatopoeia"]],
    explanation: "*passed away* softens *died* (euphemism); *was a furnace* (metaphor); *open* and *secret* contradict (oxymoron); *weighs a tonne* exaggerates (hyperbole); *buzz* imitates a sound (onomatopoeia).",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    stem: "Write **three** sentences describing a busy market day in your town: one with a simile, one with a metaphor and one with personification. Label each one.",
    points: [
      "A correct simile (a comparison with like or as between different things).",
      "A correct metaphor (says one thing is another, without like or as).",
      "A correct personification (gives a human action or quality to something non-human).",
    ],
    modelAnswer: "Simile: Shoppers poured through the gates like water through a broken dam. Metaphor: The market was a beehive of voices and colour. Personification: The old scales groaned under sacks of maize.",
    hints: ["Check that each sentence uses the device it is labelled with."],
    explanation: "Each device must be used accurately; labelling helps you check.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, examStyle: true,
    stem: "Read the extract.\n\n*The drought had sucked the life out of the valley. Cattle stood like skeletons draped in leather, and the riverbed lay cracked and silent, an open wound in the earth.*\n\nChoose **two** phrases. For each, name the figure of speech and explain the effect it has on the reader.",
    points: [
      "Identifies a first device correctly (e.g. sucked the life out = personification/metaphor; like skeletons draped in leather = simile; an open wound = metaphor).",
      "Explains the effect of the first phrase in context (e.g. the drought seems like a cruel living force that drained the valley).",
      "Identifies a second device correctly.",
      "Explains the effect of the second phrase in context (e.g. the cattle are so thin they look dead; the cracked riverbed suggests pain and damage to the land).",
    ],
    modelAnswer: "\"Like skeletons draped in leather\" is a simile: the cattle are so thin that their skin hangs over their bones, which makes the reader feel the suffering the drought has caused. \"An open wound in the earth\" is a metaphor: it makes the dry riverbed seem like an injury to the land, suggesting pain and damage that need healing.",
    hints: ["Use quote, name, explain for each phrase."],
    explanation: "A full answer quotes the words, names the device and explains what the reader sees or feels.",
  });

  b.card("DEFINITION", "Simile", "A comparison between two different things using like or as.", "The bus groaned up the hill like a tired ox.");
  b.card("DEFINITION", "Metaphor", "A comparison that says one thing is another, without like or as.", "The classroom was a zoo.");
  b.card("DEFINITION", "Personification", "Giving human actions or qualities to something non-human.", "The wind whispered through the trees.");
  b.card("DEFINITION", "Hyperbole", "Deliberate exaggeration for emphasis or humour.", "I've told you a million times.");
  b.card("DEFINITION", "Euphemism", "A mild or polite expression for something unpleasant.", "passed away (died), let go (dismissed).");
  b.card("DEFINITION", "Oxymoron", "Two opposite words placed together.", "deafening silence, open secret.");
  b.card("DEFINITION", "Irony", "Saying the opposite of what you mean, or events turning out opposite to what is expected.", "'Lovely weather!' in a storm.");
  b.card("CONCEPT", "Alliteration vs onomatopoeia", "Alliteration repeats the first consonant sound of nearby words (silent, shimmering sands); onomatopoeia imitates a sound (buzz, crash).", undefined);
  b.card("CONCEPT", "Explaining effect", "Quote the words, name the device, explain what it makes the reader see or feel in context.", "Words to use: suggests, conveys, emphasises, creates a sense of.");
});
