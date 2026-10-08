// Slice EWR2: Cambridge 0510 Exercise 5 informal email (EXTENDED_RESPONSE, 15 marks, ESL).
import { concept, compositionLevels, ESL } from "../lib.mjs";

const POINTS = [
  ["Content: all three bullet points covered and each one developed with relevant detail", 4],
  ["Content: informal register and friendly tone suit the reader and purpose throughout", 2],
  ["Language: a good range of vocabulary and sentence structures used appropriately", 3],
  ["Language: accurate grammar, spelling and punctuation", 3],
  ["Language: well organised, with clear paragraphs and natural linking", 3],
];

concept("eng.functional.informal-letter", { file: "functional/exam-0510", keyPrefix: "functional.exam-0510", applies: ESL }, (b) => {
  const ex5 = (task, bullets, modelAnswer, d = 3) =>
    b.ext({
      d, skill: "CREATION", marks: 15, secs: 1500, examStyle: true, concepts: ["eng.functional.informal-letter"],
      stem: `**Exercise 5.** ${task}\n\nIn your email you should:\n\n${bullets.map((x) => `- ${x}`).join("\n")}\n\nDevelop each bullet point and add some ideas of your own. Write about **140 words** (the word limit is shown with the answer box). You should use your own words as far as possible.`,
      wordLimit: { min: 120, max: 160 },
      points: POINTS,
      levels: compositionLevels(15),
      modelAnswer,
      hints: ["Give each bullet point its own short paragraph.", "Open warmly, close warmly, and keep to about 140 words."],
      explanation: "This task is marked for content (6 marks: all three bullets developed, suitable register) and language (9 marks: range, accuracy, organisation). Check each point honestly, then compare with the model.",
    });

  // 1. Full model.
  ex5("Your school recently held a fundraising event. Write an **email** to a friend who did not attend, telling them about it.", [
    "describe what kind of event it was",
    "explain what the money was raised for",
    "say what you personally did to help.",
  ], `**Model answer:**

Hi Tariro,

You missed a brilliant day on Saturday! Our school held a fun run around the sports fields, and almost everyone took part, even some of the teachers in fancy dress.

The money we raised is going towards a new water tank for the school garden. At the moment we carry buckets from the borehole, so a tank will save hours of work and help the vegetables grow through the dry season.

I was in charge of the drinks stall at the finish line with two friends. We sold freezits and orange juice, and by midday we had sold out completely! My arms ached from opening crates, but it was worth it.

Next year you have to come and run with me. I'll even let you beat me!

Write soon,\
Chipo`);

  // 2. Full model.
  ex5("You have just moved to a new home in a different town. Write an **email** to a friend from your old school.", [
    "describe your new home and the area around it",
    "explain what you find difficult about the move",
    "invite your friend to visit and suggest something you could do together.",
  ], `**Model answer:**

Hi Kuda,

I'm finally settled in Kadoma, and I've got so much to tell you! Our new house is on a quiet road near the river, with a big mango tree in the yard. There's a market just five minutes away where I buy fresh bread every morning.

The hardest part is starting at a new school in the middle of the year. Everyone already has their friends, and I still eat lunch on my own most days. I really miss our jokes at break time.

Why don't you come and stay in the August holidays? We could walk along the river and go fishing with my uncle, who has promised to teach me. Mum says you're very welcome.

Let me know soon!

Your friend,\
Farai`);

  // 3. Plan + opening.
  ex5("Your class went on a trip to a national park last week. Write an **email** to your cousin who lives in another country.", [
    "say where you went and how you travelled",
    "describe the most exciting thing you saw",
    "explain what you learnt from the trip.",
  ], `**Plan:**
- Greeting; one-line opening linking to the cousin (*You always ask about wildlife here, so…*).
- Bullet 1: Hwange National Park; a long bus journey from Bulawayo, singing most of the way.
- Bullet 2: a herd of elephants drinking at a waterhole at sunset; a baby elephant sliding in the mud.
- Bullet 3: what I learnt: how rangers protect animals from poachers; why waterholes are pumped in the dry season.
- Close: ask about their school; *Love, Rudo*.

**Opening paragraph:** Hi Mandla, You're always asking me about wildlife here, so you'll be jealous when you hear where our class went last week!`);

  // 4. Plan + opening.
  ex5("A friend has asked for your advice because they want to get fitter. Write an **email** to your friend.", [
    "suggest a type of exercise and say why it would suit them",
    "describe how you keep fit yourself",
    "give one piece of advice about healthy eating.",
  ], `**Plan:**
- Greeting; respond to their message warmly (*Good for you for deciding to get fit!*).
- Bullet 1: suggest joining the athletics club or jogging with a friend; it suits them because it is free and they enjoy being outdoors.
- Bullet 2: I cycle to school and play netball twice a week; it gives me more energy in lessons.
- Bullet 3: drink water instead of fizzy drinks and eat fruit rather than sweets at break.
- Close: offer to go running together at the weekend; *Take care, Nomsa*.

**Opening paragraph:** Hi Tanaka, Thanks for your message. Good for you for deciding to get fitter: I think it's one of the best decisions you can make, and I'm happy to help!`);

  // 5. Plan + opening.
  ex5("You recently helped to organise a surprise birthday party for a member of your family. Write an **email** to a friend about it.", [
    "say whose party it was and why you organised it",
    "describe what happened at the party",
    "explain how the person reacted to the surprise.",
  ], `**Plan:**
- Greeting; quick opening (*You won't believe what we managed to keep secret!*).
- Bullet 1: my grandmother's seventieth birthday; we wanted to thank her for looking after us all.
- Bullet 2: relatives arrived early and hid behind the house; my sister baked a cake; we sang and my uncle made a funny speech.
- Bullet 3: Gogo walked in, dropped her handbag and then laughed until she cried; she said it was the best day of her life.
- Close: ask about their news; *Best wishes, Tendai*.

**Opening paragraph:** Hi Rumbi, You won't believe what our family managed to keep secret for a whole month!`, 2);
});
