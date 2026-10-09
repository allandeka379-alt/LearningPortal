// Slice EWR1: narrative writing.
import { concept } from "../lib.mjs";

concept("eng.composition.narrative", { file: "composition/narrative", keyPrefix: "composition.narrative" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a story, what is the **climax**?",
    options: [
      ["The turning point where the tension is highest", "Correct: the climax is the moment the conflict comes to a head."],
      ["The first paragraph that introduces the setting", "That is the exposition or opening."],
      ["The list of characters who appear in the story", "Characters are part of the story, not its climax."],
      ["The moral lesson written at the very end", "A reflection may come in the ending, but the climax is the high point of tension."],
    ],
    answer: "A",
    explanation: "Plot shape: **exposition** (setting, characters) → **rising action** (complications) → **climax** (turning point) → **falling action** → **resolution**.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which is the **best opening** for a story titled *\"The night the lights went out\"*?",
    options: [
      ["The power died in the middle of Mufaro's maths test, and someone in the dark began to laugh.", "Correct: it begins at the key moment and adds a mysterious detail that creates suspense."],
      ["I am going to tell you about the night the lights went out in our town.", "Announcing the story wastes the opening and creates no tension."],
      ["My name is Mufaro, I am sixteen years old and I live in Kwekwe with my parents and my sister.", "A self-introduction delays the story and has nothing to do with the lights going out."],
      ["Electricity is produced at power stations and sent along cables to homes.", "A general fact sounds like a science textbook, not the start of a story."],
    ],
    answer: "A",
    explanation: "Begin **close to the problem**, and give the reader a question to want answered (who is laughing?). Avoid announcing the story, introducing yourself or opening with general facts.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence is **punctuated correctly**?",
    options: [
      ["\"Where are the keys?\" asked Tendai.", "Correct: the question mark goes inside the closing inverted commas and the reporting clause follows in lower case."],
      ["\"Where are the keys\"? Tendai asked.", "The question mark belongs inside the inverted commas, with the spoken words."],
      ["\"Where are the keys?\" Asked Tendai loudly.", "The reporting clause continues the sentence, so asked takes a small letter."],
      ["Tendai asked \"where are the keys?\"", "Speech begins with a capital letter, and a comma is needed after asked."],
    ],
    answer: "A",
    explanation: "Punctuation that belongs to the spoken words goes **inside** the inverted commas. After a question mark or comma closing speech, the reporting clause (*asked Tendai*) continues in lower case.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? In dialogue, you should start a new paragraph each time a different character speaks.",
    answer: true,
    explanation: "A new line for each new speaker lets the reader follow who is talking without needing *he said* after every line.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence **shows** that a character is nervous rather than **telling** us?",
    options: [
      ["Nyasha rubbed her palms on her skirt for the third time.", "Correct: the repeated action lets the reader work out the feeling."],
      ["Nyasha was very nervous before the interview began.", "This tells us the feeling directly."],
      ["Nyasha felt extremely nervous and also rather afraid.", "Adding adjectives still tells rather than shows."],
      ["Nyasha was a nervous person in most situations.", "This is a label, not a moment the reader can see."],
    ],
    answer: "A",
    explanation: "**Show, don't tell:** reveal feelings through actions, speech and physical details. Readers are more involved when they infer the feeling themselves.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this extract.\n\n*The footsteps stopped. Silence. Then the door handle turned, slowly, slowly.*\n\nWhat is the main effect of the **short sentences**?",
    options: [
      ["They slow the moment down and build suspense.", "Correct: short sentences and fragments make the reader pause on each detail, increasing tension."],
      ["They show that the writer has a limited vocabulary.", "Short sentences here are a deliberate choice for effect, not a weakness."],
      ["They speed past an unimportant part of the story.", "This is a key moment; the writer is lingering on it, not rushing past it."],
      ["They explain the character's past through flashback.", "Nothing here refers to an earlier time."],
    ],
    answer: "A",
    hints: ["Think about how you read a sequence of very short sentences.", "Is this a dull moment or a tense one?"],
    explanation: "At a climax, short sentences and fragments force the reader to pause, giving each sound or movement weight. This **slows pace** and builds **suspense**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which literary device is used in this extract?\n\n*As Tatenda stood at the bus stop in Harare, he remembered the morning, ten years earlier, when his father had first put him on a bus to boarding school.*",
    options: [
      ["Flashback", "Correct: the story moves back in time to an earlier event to explain the present moment."],
      ["Foreshadowing", "Foreshadowing hints at something that will happen later, not something in the past."],
      ["Personification", "Nothing non-human is given human qualities here."],
      ["Onomatopoeia", "There are no words that imitate sounds."],
    ],
    answer: "A",
    hints: ["Does the extract look forward or backward in time?"],
    explanation: "A **flashback** inserts an earlier event into the main story, often to explain a character's feelings. Introduce it with a clear trigger (*he remembered*) and return clearly to the present.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **weakest ending** for a story about a girl who finds a lost wallet full of money?",
    options: [
      ["Then I woke up and realised that it had all been a dream.", "Correct (weakest): the dream ending cancels the whole story and the choice the character made."],
      ["When the owner hugged me, I knew the reward was not the money.", "This resolves the dilemma and shows what the narrator learnt."],
      ["I still pass that bench every day, and I always check under it.", "This echoes the setting with a light, memorable touch."],
      ["My mother said nothing, but she cooked my favourite meal that night.", "This shows approval through action and closes the story quietly."],
    ],
    answer: "A",
    hints: ["Which ending makes the events of the story not matter?"],
    explanation: "Avoid endings that **cancel** the story (*it was all a dream*) or simply fade out. Strong endings resolve the conflict, show change or echo the opening.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A story is told like this: *\"I opened the gate and I see a dog lying across the path. It growled and I step back.\"* What is the **main error**?",
    options: [
      ["It shifts between past and present tense.", "Correct: opened and growled are past; see and step are present."],
      ["It changes from first to third person.", "It stays in the first person (I) throughout."],
      ["It uses too many adjectives in a row.", "There are very few adjectives here."],
      ["It begins right in the middle of the action.", "Starting in the action is a strength, not an error."],
    ],
    answer: "A",
    hints: ["Look at the verbs one by one."],
    explanation: "Keep the **tense consistent**. In past-tense narration: *I opened the gate and saw a dog… It growled and I stepped back.*",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the word or phrase that best controls the **pace** in this story plan.",
    template: "{{blank:a}}, the rest of the week passed quietly. But on Saturday, at exactly four minutes past midnight, the dogs began to bark.",
    blanks: [{ id: "a", accepted: ["After that"], choices: ["After that", "Slowly, second by second", "Suddenly and violently", "Without warning"] }],
    explanation: "Use a **summary phrase** (*After that*, *The next three days passed…*) to move quickly through unimportant time, and save detail for the important moment that follows.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Write a short passage of **dialogue** (8-12 lines, 80-120 words) between two fictional characters, in which one tries to persuade the other to keep a secret. The dialogue should reveal something about each character. Punctuate it correctly.",
    wordLimit: { min: 80, max: 120 },
    points: [
      ["Correct punctuation of speech (inverted commas, punctuation inside them, reporting clauses)", 3],
      ["A new line or paragraph for each new speaker", 2],
      ["The dialogue moves a situation forward (the request, the hesitation, a decision)", 3],
      ["At least one detail of action or manner reveals character", 2],
    ],
    modelAnswer: "\"You can't tell Mai Moyo,\" whispered Kuda, glancing at the staffroom door.\n\n\"She'll find out anyway,\" said Rumbi. \"The window is in pieces.\"\n\n\"Not if we fix it before Monday.\" He was already counting the coins in his palm. \"My uncle cuts glass in Mbare.\"\n\n\"And if he can't?\"\n\n\"He can.\" Kuda smiled the smile that had got them into trouble since grade one. \"Please, Rumbi. Just until Monday.\"\n\nShe sighed and folded her arms. \"Until Monday. After that, I'm telling her myself.\"",
    explanation: "Each line pushes the situation forward. Actions (*glancing at the door*, *counting the coins*, *folded her arms*) reveal Kuda's anxiety and charm and Rumbi's firmness.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Write the **climax** of a story titled *\"Caught in the storm\"* in one or two paragraphs (120-160 words). Slow the pace, use at least three senses and vary your sentence lengths for suspense.",
    wordLimit: { min: 120, max: 160 },
    points: [
      ["The passage is clearly a climax (the moment of greatest danger or tension)", 2],
      ["Pace is slowed: the moment is described in close detail", 3],
      ["At least three senses are used (for example sound, touch, sight, smell)", 3],
      ["Sentence lengths vary, with short sentences used for emphasis", 2],
      ["Consistent tense and accurate punctuation", 2],
    ],
    hints: ["Decide exactly what danger your character faces.", "Describe seconds, not hours."],
    modelAnswer: "The rain came sideways now, stinging my face like thrown gravel. Ahead, the low-water bridge outside Mvurwi had vanished beneath a brown, churning skin of water, and the roar of it filled my chest. I gripped the bicycle handles until my knuckles ached. Somewhere behind me a branch cracked. I turned. Nothing but grey. The smell of wet earth and torn leaves was everywhere, thick enough to taste. I took one step into the current, then another. Cold seized my ankles, my shins, my knees. The bicycle bucked against my hands as if it wanted to escape. Halfway. Thunder rolled across the hills behind me. My foot slid on the slimy concrete and, for one long second, there was nothing beneath me at all.",
    explanation: "The passage slows time to individual steps, uses touch (cold, stinging), sound (roar, crack), smell and taste, and alternates long sentences with short ones (*I turned. Nothing but grey. Halfway.*) to build suspense.",
  });
  b.essay({
    d: 4, skill: "CREATION", marks: 25, secs: 2700,
    stem: "Write a short story (300-350 words) titled **\"The promise\"**. Your story must make clear what the promise was, why it was hard to keep, and what happened in the end.",
    wordLimit: { min: 300, max: 350 },
    points: [
      ["Relevance: the promise is made clear early and is central to the plot", 4],
      ["Plot: a clear shape with conflict, a climax and a resolution", 5],
      ["Characters revealed through action and dialogue rather than labels", 4],
      ["Pace and suspense controlled; sensory detail at key moments", 4],
      ["An effective ending (resolution, change or echo of the opening)", 3],
      ["Accurate grammar, spelling and punctuation, including dialogue", 5],
    ],
    hints: ["Make the promise in the first paragraph.", "What makes keeping it difficult? That is your conflict."],
    modelAnswer: "**Plan:** (1) My brother Tino leaves for a job in Gweru; I promise to look after his goats. (2) The first weeks go well; I enjoy the responsibility. (3) The school soccer team picks me for the provincial trials on the same Saturday the goats must go to the dip. (4) Climax: I must choose; I take the goats, arriving late and muddy at the dip tank as the trials bus leaves. (5) Resolution: Tino phones; the vet officer says our goats are the healthiest in the ward; the coach offers me a place at the next trials. (6) Ending: the goat bell that I hear every morning reminds me what a promise costs.\n\n**Opening paragraph:** The last thing Tino said before the bus pulled away from the rank was, \"Look after them, Farai. All seven.\" I said I would. I was fourteen and had never owned anything that could die if I forgot it.",
    explanation: "This task rewards a tight plot: the promise must create the conflict, and the climax should be a choice. Compare your story with the mark scheme points.",
  });

  b.card("DEFINITION", "Plot (five stages)", "Exposition, rising action, climax, falling action, resolution.");
  b.card("DEFINITION", "Conflict", "The problem at the heart of a story: person against person, nature, society or themselves.");
  b.card("DEFINITION", "Flashback", "A scene from an earlier time inserted into the main story, usually to explain a character's feelings.");
  b.card("DEFINITION", "Pace", "How fast the story moves: short sentences and action speed it up; detail and reflection slow it down.");
  b.card("CONCEPT", "Show, don't tell", "Reveal feelings and character through actions, speech and details instead of naming them.", "Tell: She was angry. Show: She slammed the exercise book shut.");
  b.card("CONCEPT", "Dialogue rules", "New speaker, new line; punctuation inside the inverted commas; reporting clause after speech continues in lower case.");
  b.card("CONCEPT", "Endings to avoid", "\"It was all a dream\" (cancels the story) and \"We went home and slept\" (fades out).");
  b.card("CONCEPT", "Three strong ways to end a story", "Resolve the conflict; show how the narrator changed; echo the opening with a new meaning.");
  b.card("CONCEPT", "How long a story should cover in an exam", "One main event, often minutes to a few days, told in depth rather than many events listed.");
  b.card("DEFINITION", "Foreshadowing", "A hint early in a story of something that will happen later, which builds suspense.");
});
