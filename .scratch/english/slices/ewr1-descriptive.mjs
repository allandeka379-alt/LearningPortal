// Slice EWR1: descriptive writing.
import { concept } from "../lib.mjs";

concept("eng.composition.descriptive", { file: "composition/descriptive", keyPrefix: "composition.descriptive" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which sense does this sentence mainly appeal to?\n\n*The sharp smell of paraffin drifted from the kitchen hut.*",
    options: [
      ["Smell", "Correct: the sentence focuses on the smell of paraffin."],
      ["Sight", "Nothing in the sentence describes what is seen."],
      ["Touch", "No texture or feeling on the skin is described."],
      ["Taste", "Nothing is eaten or tasted."],
    ],
    answer: "A",
    explanation: "Good description uses **sensory detail**: sight, sound, smell, touch and taste. Smell is often forgotten, yet it brings a scene to life quickly.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS", daily: true,
    stem: "Identify the device used in this sentence.\n\n*The old bus groaned up the hill, complaining at every bend.*",
    options: [
      ["Personification", "Correct: the bus is given human actions (groaning and complaining)."],
      ["Simile", "There is no comparison using like or as."],
      ["Alliteration", "There is no repeated initial consonant sound here."],
      ["Hyperbole", "The sentence does not exaggerate for effect; it gives the bus human qualities."],
    ],
    answer: "A",
    explanation: "**Personification** gives human qualities to non-human things. Here it suggests the bus is old, overloaded and struggling.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION", daily: true,
    stem: "Which sentence is the **most vivid** description of rain arriving?",
    options: [
      ["Fat drops slapped the tin roof, then the sky emptied all at once.", "Correct: precise verbs (slapped, emptied) and sound make the moment vivid."],
      ["It started to rain very heavily and it was very wet outside.", "Vague words (very heavily, very wet) do not help the reader see or hear the rain."],
      ["The rain was nice and very good for the crops in the fields nearby.", "This gives an opinion about the rain, not a description of it arriving."],
      ["There was a lot of rain falling from the sky onto everything.", "A lot of and everything are vague; there is no precise detail."],
    ],
    answer: "A",
    explanation: "Precise nouns and strong verbs beat vague adverbs. *Slapped* gives sound and force; *the sky emptied* is a vivid metaphor for a sudden downpour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A learner describes a stadium by starting with the whole crowd, moving to one group of fans, and then focusing on a single child's face. What structure is this?",
    options: [
      ["Zoom", "Correct: like a camera, it moves from a wide view to a close-up."],
      ["Chronological", "It moves through space and focus, not through time."],
      ["Contrast", "It does not compare two different states or times."],
      ["Argumentative", "This is not a structure for description; it is a type of writing."],
    ],
    answer: "A",
    explanation: "A **zoom structure** moves from wide view → group → one detail (and may pull back at the end). Other structures: spatial, chronological, contrast.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "True or false? A descriptive composition should be built around an exciting plot with a climax.",
    answer: false,
    feedbackFalse: "Right: description keeps events small; the scene, not a plot, is central.",
    explanation: "Some movement or small events can help, but if a descriptive composition turns into a story with a plot and climax, it is no longer answering the task.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which simile is **freshest and best suited** to a description of a village at dawn?",
    options: [
      ["Smoke rose from the cooking fires as straight as grain stalks.", "Correct: an original comparison drawn from the village world itself."],
      ["The morning was as white as snow and as cold as ice.", "These are tired clichés, and snow does not fit most Zimbabwean villages."],
      ["The roosters were as busy as bees in the early hours.", "A worn-out cliché that adds little to the picture."],
      ["The little huts stood like tall skyscrapers in a great modern city.", "The comparison clashes with the rural scene and is inaccurate."],
    ],
    answer: "A",
    hints: ["Avoid comparisons you have heard many times.", "Which comparison comes from the world of the scene?"],
    explanation: "A good simile is **fresh** and **fits the setting**. Grain stalks belong to the village, and the image of straight smoke also suggests a still, windless dawn.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this description.\n\n*Cobwebs sagged from the rafters. Somewhere in the dark, water dripped with the patience of a clock. The door, when I pushed it, did not creak; it sighed.*\n\nWhat **atmosphere** does the writer create?",
    options: [
      ["Eerie and abandoned", "Correct: cobwebs, darkness, dripping water and the sighing door suggest a long-empty, unsettling place."],
      ["Cheerful and welcoming", "Nothing suggests warmth or welcome; the details are dark and still."],
      ["Busy and chaotic", "The scene is quiet and still, the opposite of busy."],
      ["Calm and luxurious", "Cobwebs and dripping water suggest neglect, not luxury."],
    ],
    answer: "A",
    hints: ["Look at each detail: cobwebs, dark, dripping, sighing.", "What kind of place has these?"],
    explanation: "**Atmosphere** comes from the choice of details. Neglect (cobwebs), darkness, slow sounds and a personified door combine to create an eerie, abandoned mood.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the most precise verb for each gap.",
    template: "Behind the stall, the vendor {{blank:a}} prices at passers-by while oil {{blank:b}} in a blackened pan.",
    blanks: [
      { id: "a", accepted: ["bellowed"], choices: ["bellowed", "said", "did", "went"] },
      { id: "b", accepted: ["spat"], choices: ["was", "spat", "stayed", "had"] },
    ],
    explanation: "Strong verbs carry sound and movement: *bellowed* shows a loud voice; *spat* gives the sound and sight of hot oil. Vague verbs (*said*, *was*) leave the reader with nothing to picture.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A learner writing *\"Describe the moments before an important match\"* includes this paragraph:\n\n*Then a thief grabbed my bag and I chased him through three streets until a policeman caught him and took him to the station, where I gave a statement.*\n\nWhat is the **main problem**?",
    options: [
      ["It turns the description into an unrelated story.", "Correct: the chase moves away from the match and the moments before it."],
      ["It uses too many senses in just one short paragraph.", "It uses almost no sensory detail at all."],
      ["It is written in the past tense.", "Past tense is acceptable if used consistently."],
      ["It contains too much precise vocabulary.", "The vocabulary is plain; precision is not the problem."],
    ],
    answer: "A",
    hints: ["What does the title ask you to describe?"],
    explanation: "In a descriptive composition, any event should reveal the scene. A chase through the streets abandons the scene (the build-up to the match) and becomes a different story.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Rewrite this weak description as a vivid paragraph of 80-110 words. Use at least three senses, precise verbs and one fresh simile or metaphor.\n\n*The classroom was hot. There were many learners. The teacher was writing. It was noisy outside.*",
    wordLimit: { min: 80, max: 110 },
    points: [
      ["At least three senses used", 3],
      ["Precise nouns and strong verbs replace vague words", 3],
      ["One fresh, fitting simile or metaphor", 2],
      ["Details linked smoothly into a single paragraph with a clear atmosphere", 2],
    ],
    modelAnswer: "By the last lesson, the heat had settled over Form 3B like a heavy blanket. Forty learners slumped at their desks, shirts clinging to their backs, while the ceiling fan stirred the warm air without cooling it. The squeak of Mr Banda's chalk was the only sound in the room as equations crawled across the board. Through the open window drifted the smell of cut grass and the shrieks of a netball practice, so close and so free that every head turned towards it. Someone's pen rolled off a desk and clattered to the floor, and nobody moved to pick it up.",
    explanation: "The model uses touch (heat, clinging shirts), sound (squeak of chalk, shrieks, clatter), smell (cut grass) and a fitting simile (*like a heavy blanket*) to build a drowsy, restless atmosphere.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Describe a **person** you admire (a fictional character based on someone you might know, such as a grandparent, coach or market vendor) in 120-160 words. Reveal character through appearance, actions and speech, not just labels.",
    wordLimit: { min: 120, max: 160 },
    points: [
      ["Physical details are specific and help to suggest character", 3],
      ["Character is shown through typical actions or habits", 3],
      ["A short piece of speech or a typical saying reveals personality", 2],
      ["Precise vocabulary and at least one fresh image", 2],
      ["Organised and accurate", 2],
    ],
    hints: ["Choose two or three details that capture the whole person.", "What does this person always do or say?"],
    modelAnswer: "Sekuru Mapfumo's hands tell you more about him than his face does. They are broad and cracked like dry riverbeds, the hands of a man who has fixed every bicycle in our ward for forty years. He sits outside his workshop on an upturned paint tin, a tube of glue behind one ear, and greets every customer as if they were the first visitor in weeks. Children bring him punctured footballs and he mends them for nothing. \"A ball that cannot bounce,\" he says, \"is a sad thing.\" When he concentrates, his tongue pokes out of the corner of his mouth like a schoolboy's. He is slow to speak, slower to anger, and quickest of all to laugh, a deep rumble that starts somewhere near his belt and ends with him wiping his eyes.",
    explanation: "The model reveals generosity, patience and humour through specific details (the cracked hands, the glue behind the ear), actions (mending balls for free) and speech, with fresh imagery (*cracked like dry riverbeds*).",
  });
  b.essay({
    d: 4, skill: "CREATION", marks: 25, secs: 2700,
    stem: "Write a descriptive composition (300-350 words) titled **\"A village at the end of a long dry season\"**.",
    wordLimit: { min: 300, max: 350 },
    points: [
      ["Relevance: the whole piece describes the village scene at the end of the dry season", 4],
      ["A clear structure (spatial, chronological, zoom or contrast)", 4],
      ["Rich sensory detail (at least three senses)", 5],
      ["Precise vocabulary and fresh imagery; a consistent atmosphere", 5],
      ["Accurate, varied sentences; consistent tense", 5],
      ["A closing image rather than a summary", 2],
    ],
    hints: ["What do the land, animals and people look, sound and smell like when rain has not fallen for months?", "Could you end with the first clouds?"],
    modelAnswer: "**Plan (chronological, one day):** (1) Dawn: cracked earth, a brown haze, a dry wind lifting dust around the huts. (2) Morning: women queue at the borehole with yellow containers; the slow squeak of the pump handle. (3) Midday: cattle with jutting ribs nose at bare ground; the river bed of white sand; heat shimmering over the fields. (4) Afternoon: an old man studies the horizon; children play in the dust; smell of smoke and dry grass. (5) Evening: heavy, purple clouds gather in the east; the first cool breath of wind; everyone looks up. (6) Closing image: a single drop darkens the dust beside a child's foot.\n\n**Opening paragraph:** The dust wakes before the people do. As the sun lifts over the hills above the village, a dry wind moves between the huts, lifting thin brown veils from the yard and laying them down again on the doorsteps, the water drums and the sleeping dogs. The earth around the granary has split into a pattern of cracks so wide that a child could lose a marble in them.",
    explanation: "A chronological structure (dawn to evening) gives shape, and the closing image of the first raindrop changes the atmosphere at the very end.",
  });

  b.card("DEFINITION", "Sensory detail", "Detail appealing to sight, sound, smell, touch or taste.");
  b.card("DEFINITION", "Imagery", "Language that creates pictures in the reader's mind: similes, metaphors, personification.");
  b.card("DEFINITION", "Atmosphere", "The mood of a place or scene (eerie, joyful, tense), built through the choice of details.");
  b.card("DEFINITION", "Personification", "Giving human qualities or actions to non-human things.", "The wind tugged at the washing.");
  b.card("DEFINITION", "Simile and metaphor", "A simile compares using like or as; a metaphor says one thing is another.", "Simile: the rank was like a tide. Metaphor: the rank was a tide.");
  b.card("CONCEPT", "Four structures for description", "Spatial (through space), chronological (through a short time), zoom (wide → close → wide), contrast (before/after).");
  b.card("CONCEPT", "Precise words", "Prefer one exact noun and one strong verb to a pile of adjectives and adverbs.", "Not: the very big tree. Better: the msasa loomed.");
  b.card("CONCEPT", "Description vs narrative", "Description keeps events small and the scene central; a narrative is built around a plot with a climax.");
  b.card("CONCEPT", "How to end a description", "With a closing image, not a summary sentence such as 'In conclusion, it was busy.'");
});
