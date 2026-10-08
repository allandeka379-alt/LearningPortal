// Slice EVO: idioms, proverbs and collocations.
import { concept } from "../lib.mjs";

concept("eng.vocabulary.idioms", { file: "vocabulary/idioms", keyPrefix: "vocabulary.idioms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the idiom in bold mean?\n\n*The first question in the test was **a piece of cake**.*",
    options: [
      ["very easy", "Correct: a piece of cake means something very easy to do."],
      ["very short", "The idiom is about difficulty, not length."],
      ["very enjoyable", "The idiom does not mean that the question was fun."],
      ["about food", "Idioms are not meant literally: no food is involved."],
    ],
    answer: "A",
    explanation: "An idiom's meaning cannot be worked out from its words. **a piece of cake** = very easy.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct collocation.\n\n*Please ___ a decision before Friday.*",
    options: [
      ["make", "Correct: we make a decision."],
      ["do", "Do is used with tasks (do homework), not with decision."],
      ["take up", "Take up means start a hobby or accept an offer."],
      ["give", "We do not give a decision in everyday English."],
    ],
    answer: "A",
    explanation: "**make** collocates with *decision, mistake, effort, progress, noise, plan*. **do** collocates with *homework, the dishes, business, your best, damage*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the idiom in bold mean?\n\n*Chido was **over the moon** when she heard she had won the scholarship.*",
    options: [
      ["extremely happy", "Correct: over the moon means delighted."],
      ["very surprised", "Surprise may be part of it, but the idiom means very happy."],
      ["completely confused", "Over the moon does not suggest confusion."],
      ["a little nervous", "The idiom expresses joy, not nerves."],
    ],
    answer: "A",
    explanation: "**over the moon** = extremely happy, delighted.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the idiom in bold mean?\n\n*Tapiwa **let the cat out of the bag** about the surprise party for his sister.*",
    options: [
      ["revealed a secret by mistake", "Correct: to let the cat out of the bag is to give away a secret accidentally."],
      ["planned an event carefully", "The idiom is about revealing, not planning."],
      ["cancelled a plan suddenly", "Nothing was cancelled."],
      ["released an animal by accident", "The idiom is not literal."],
    ],
    answer: "A",
    explanation: "**let the cat out of the bag** = reveal a secret, usually without meaning to.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which proverb means *think carefully before you act*?",
    options: [
      ["Look before you leap.", "Correct: check the situation before you jump into action."],
      ["Many hands make light work.", "This means that a job is easier when many people help."],
      ["Actions speak louder than words.", "This means what you do matters more than what you say."],
      ["Every cloud has a silver lining.", "This means good can come from bad situations."],
    ],
    answer: "A",
    explanation: "**Look before you leap** advises caution: consider the risks before acting.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct collocation.\n\n*We could not see the road because of the ___ rain.*",
    options: [
      ["heavy", "Correct: rain is heavy (or light) in English."],
      ["strong", "Strong goes with wind, not rain."],
      ["big", "Big rain is not natural English."],
      ["thick", "Thick goes with fog or smoke, not rain."],
    ],
    answer: "A",
    explanation: "Collocations: **heavy** rain, *strong* wind, *thick* fog, *heavy* traffic.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Read the situation and choose the proverb that fits it best.\n\n*A small crack appeared in the dam wall at the farm. The farmer repaired it at once, and the dam survived the floods that destroyed his neighbour's dam.*",
    options: [
      ["A stitch in time saves nine.", "Correct: an early small repair prevented a much bigger problem."],
      ["Too many cooks spoil the broth.", "Nothing in the situation involves too many people."],
      ["Don't count your chickens before they are hatched.", "This warns against relying on good luck too early."],
      ["Where there's a will, there's a way.", "This is about determination finding a solution, not early repairs."],
    ],
    answer: "A",
    hints: ["What did the farmer do that his neighbour did not?"],
    explanation: "**A stitch in time saves nine**: fixing a small problem early prevents a bigger one.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In which sentence is the idiom used **correctly**?",
    options: [
      ["The guard turned a blind eye when we arrived a few minutes late.", "Correct: turn a blind eye means pretend not to notice."],
      ["The guard turned a blind eye and caught everyone who was late.", "Turning a blind eye means not noticing, so he could not catch anyone."],
      ["The guard turned a blind eye because he could see us clearly.", "The idiom means deliberately ignoring something, not seeing clearly."],
      ["The guard turned a blind eye and wrote down all our names.", "Writing down names is the opposite of pretending not to notice."],
    ],
    answer: "A",
    hints: ["What does a person who turns a blind eye do about a problem?"],
    explanation: "**turn a blind eye (to)** = deliberately ignore something wrong.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence would be **most appropriate** in a formal letter to the District Education Officer?",
    options: [
      ["The new classrooms will cost a great deal of money.", "Correct: plain, formal wording suits an official letter."],
      ["The new classrooms will cost an arm and a leg.", "This idiom is too informal for an official letter."],
      ["The new classrooms will cost loads and loads of cash.", "Loads of cash is informal and imprecise."],
      ["The new classrooms will cost a bomb, to be honest.", "Cost a bomb is slang; to be honest is conversational."],
    ],
    answer: "A",
    hints: ["Think about register: who will read the letter?"],
    explanation: "Idioms and slang suit informal writing. In formal letters and reports, use plain, precise words: *a great deal of money*, *a considerable sum*.",
  });
  b.fib({
    d: 2,
    stem: "Complete each collocation with make or do.",
    template: "Please {{blank:a}} your homework before supper, and try not to {{blank:b}} a noise while your father is resting.",
    blanks: [
      { id: "a", accepted: ["do"], choices: ["do", "make"] },
      { id: "b", accepted: ["make"], choices: ["make", "do"] },
    ],
    explanation: "We **do** homework (a task) and **make** a noise (produce something).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the word that completes each collocation in this extract from a report.",
    template: "The road to the clinic was damaged by {{blank:a}} rains last season. Villagers have made every {{blank:b}} to repair it, but {{blank:c}} traffic continues to cause problems. We are {{blank:d}} grateful to the council for its support.",
    blanks: [
      { id: "a", accepted: ["heavy"], choices: ["heavy", "strong", "powerful", "big"] },
      { id: "b", accepted: ["effort"], choices: ["effort", "work", "try", "attempting"] },
      { id: "c", accepted: ["heavy"], choices: ["heavy", "strong", "thick", "large"] },
      { id: "d", accepted: ["deeply"], choices: ["deeply", "strongly", "heavily", "highly"] },
    ],
    hints: ["Which adjective goes with both rain and traffic?", "We make every ___ to do something."],
    explanation: "**heavy** rains, made every **effort**, **heavy** traffic, **deeply** grateful. These are fixed partnerships (collocations).",
  });
  b.short({
    d: 2,
    stem: "Complete the idiom with **one word**.\n\n*I'm feeling a bit under the ___ today, so I won't come to practice.* (= slightly unwell)",
    accepted: ["weather"],
    wrong: ["whether", "sun"],
    explanation: "**under the weather** = slightly ill. Note the spelling: *weather* (rain and sun), not *whether* (if).",
  });
  b.short({
    d: 3,
    stem: "Complete the proverb with **one word**.\n\n*Too many cooks spoil the ___.*",
    accepted: ["broth"],
    wrong: ["food", "soup"],
    hints: ["The missing word is an old word for a thin soup."],
    explanation: "**Too many cooks spoil the broth**: if too many people try to manage one task, they ruin it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*Once in a blue moon* means *very often*.",
    answer: false,
    explanation: "False. **once in a blue moon** means *very rarely*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each idiom with its meaning.",
    pairs: [["break the ice", "make people relax at a first meeting"], ["burn the midnight oil", "study or work late at night"], ["get cold feet", "become nervous and change your mind"], ["hit the nail on the head", "say exactly the right thing"], ["a blessing in disguise", "something that seems bad but turns out good"]],
    explanation: "These idioms are fixed expressions: learn their meanings as whole units.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    stem: "Write **one** sentence for each of these idioms that shows clearly what it means: *keep an eye on*, *on the same page*, *cost an arm and a leg*.",
    points: [
      "Uses keep an eye on to mean watch carefully.",
      "Uses on the same page to mean in agreement.",
      "Uses cost an arm and a leg to mean be very expensive.",
    ],
    modelAnswer: "Please keep an eye on my bag while I buy the tickets. Before the debate, the team met to make sure we were all on the same page. The new laptop cost an arm and a leg, so Dad saved for months.",
    hints: ["The rest of each sentence should make the meaning clear."],
    explanation: "A good example sentence gives context that shows the meaning, not just the idiom on its own.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 2, examStyle: true,
    stem: "Read the sentence from a story.\n\n*When the bus broke down near Masvingo, Nyasha thought the trip was ruined, but it turned out to be **a blessing in disguise**: a farmer who stopped to help later offered her a holiday job.*\n\nExplain **in your own words** what the phrase in bold means and how the rest of the sentence shows this meaning.",
    points: [
      "Meaning: something that seems unfortunate at first but has a good result.",
      "Link: the breakdown (bad) led to the farmer offering her a job (good).",
    ],
    modelAnswer: "It means something that seems bad at first but brings a good result. The breakdown seemed to ruin the trip, but because of it she met the farmer who gave her a job.",
    hints: ["What seemed bad, and what good thing came from it?"],
    explanation: "In context questions, give the meaning in plain words and point to the evidence in the sentence.",
  });

  b.card("DEFINITION", "What is an **idiom**?", "A fixed phrase whose meaning differs from the meanings of its individual words: over the moon = very happy.", undefined);
  b.card("DEFINITION", "What is a **proverb**?", "A short traditional saying that gives advice or states a truth: Look before you leap.", undefined);
  b.card("DEFINITION", "What is a **collocation**?", "Words that naturally go together: make a decision, heavy rain, strong tea, deeply grateful.", undefined);
  b.card("FACT", "make or do?", "make: a decision, a mistake, an effort, progress, a noise, a plan. do: homework, the dishes, business, your best, damage.", undefined);
  b.card("VOCABULARY", "under the weather / once in a blue moon", "under the weather = slightly unwell; once in a blue moon = very rarely.", undefined);
  b.card("VOCABULARY", "let the cat out of the bag / turn a blind eye", "reveal a secret by mistake / pretend not to notice.", undefined);
  b.card("VOCABULARY", "A stitch in time saves nine", "Fixing a small problem early prevents a bigger one.", undefined);
  b.card("VOCABULARY", "Don't count your chickens before they are hatched", "Don't rely on something good before it has actually happened.", undefined);
  b.card("CONCEPT", "Idioms and register", "Idioms suit narratives, dialogue and informal letters. Avoid them, and all slang, in formal letters, reports and official speeches.", undefined);
});
