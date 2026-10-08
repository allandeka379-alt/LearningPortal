// Slice EWR1: planning and paragraphing a composition.
import { concept } from "../lib.mjs";

concept("eng.composition.planning-paragraphing", { file: "composition/planning-paragraphing", keyPrefix: "composition.planning-paragraphing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **topic sentence**?",
    options: [
      ["The sentence that states the main idea of a paragraph", "Correct: the topic sentence announces what the whole paragraph is about."],
      ["The sentence that names the title of the composition", "Copying the title is not the job of a topic sentence; each paragraph has its own main idea."],
      ["The last sentence of the whole composition", "That is part of the conclusion, not a topic sentence."],
      ["Any sentence that contains a connective word", "Connectives link ideas; they do not make a sentence the topic sentence."],
    ],
    answer: "A",
    explanation: "A **topic sentence** (usually the first sentence) states the main idea of its paragraph. Every other sentence in the paragraph explains, illustrates or develops it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence **drifts** from the topic of this paragraph?\n\n*(1) The tuck shop at our school has changed the way we eat at break. (2) Instead of buying sweets, most learners now choose the boiled maize and fruit it sells. (3) The prices are low because the agriculture club supplies the produce. (4) Our agriculture teacher once worked in Mutare.*",
    options: [
      ["Sentence 4", "Correct: where the teacher once worked tells us nothing about how the tuck shop changed eating habits."],
      ["Sentence 1", "This is the topic sentence; the others should support it."],
      ["Sentence 2", "This gives the main example of the change in eating habits."],
      ["Sentence 3", "This explains why learners can afford the healthier food, so it supports the topic."],
    ],
    answer: "A",
    explanation: "A unified paragraph keeps every sentence on the idea in the topic sentence. Sentence 4 drifts to an unrelated fact about the teacher, so it breaks the paragraph's **unity** and should be cut.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the connective that best fills the gap.\n\n*The borehole pump broke in June. ___, families had to walk four kilometres to the river for water.*",
    options: [
      ["As a result", "Correct: walking to the river was a consequence of the broken pump."],
      ["For example", "Nothing here is an example of the pump breaking."],
      ["On the other hand", "This introduces a contrast; the second sentence is a consequence, not a contrast."],
      ["In addition", "This adds a similar point; the sentence shows a result instead."],
    ],
    answer: "A",
    explanation: "Choose connectives by the **relationship** between ideas. Cause → effect: *as a result, consequently, therefore*. Contrast: *however, on the other hand*. Adding: *in addition, furthermore*. Example: *for example, for instance*.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "Which is the most effective **opening sentence** for a composition titled *\"The day the river rose\"*?",
    options: [
      ["By the time Gogo shouted, the water was already lapping at the door.", "Correct: it starts close to the crisis and makes the reader want to know what happens next."],
      ["In this composition I am going to write about the day the river rose.", "Announcing what you will write wastes the opening and does not create interest."],
      ["One day I woke up, had breakfast and then it started to rain a lot.", "A flat list of ordinary actions delays the interesting part of the story."],
      ["Rivers are important bodies of water that are found in many places.", "A general fact about rivers sounds like an encyclopedia, not a gripping story."],
    ],
    answer: "A",
    explanation: "A strong opening starts near the important moment, raises a question in the reader's mind and fits the title. Avoid announcing your plan, listing routine actions or opening with general facts.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? You should start a new paragraph when a different person begins to speak in dialogue.",
    answer: true,
    explanation: "New paragraph for a new **idea**, **time**, **place** or **speaker**. Giving each speaker a new line makes dialogue easy to follow.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false? A good conclusion simply repeats the introduction in different words.",
    answer: false,
    feedbackFalse: "Right: a conclusion should add something, such as a judgement, a consequence or a reflection.",
    explanation: "A conclusion **closes** the composition. Repeating the introduction adds nothing. In a story, resolve the problem or show what changed; in an argument, restate your position firmly; in a discussion, give a reasoned judgement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A learner is planning the composition *\"Describe a busy market on a Saturday morning.\"* Which plan is **best suited** to the title?",
    options: [
      ["Arrival; the vegetable stalls; the clothes section; noisy bargaining; leaving at midday", "Correct: it is a descriptive plan organised by place and time, all focused on the market scene."],
      ["Waking up; catching a kombi; a thief steals my purse; the police arrive; I get my purse back", "This is a story about a theft, so most of it is not a description of the market."],
      ["The history of markets; why markets matter to the economy; problems with vendors; my conclusion", "This is an informative or discursive plan, not a description of one Saturday morning scene."],
      ["My favourite food; my favourite clothes; my best friend; what I want to be one day", "These topics are unrelated to the market scene the title asks for."],
    ],
    answer: "A",
    hints: ["What type of writing does the word *Describe* ask for?", "Which plan stays inside the market on a Saturday morning?"],
    explanation: "Analyse the title before planning: *Describe* means descriptive writing, and *a busy market on a Saturday morning* limits the place and time. A spatial or chronological plan through the market keeps every paragraph relevant.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each connective to the relationship it shows.",
    pairs: [
      ["nevertheless", "contrast"],
      ["consequently", "cause and effect"],
      ["for instance", "example"],
      ["meanwhile", "time"],
      ["moreover", "adding a point"],
    ],
    explanation: "*Nevertheless* (contrast), *consequently* (result), *for instance* (example), *meanwhile* (two things happening at the same time), *moreover* (adding a further point).",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **strongest topic sentence** for a paragraph about the benefits of school clubs?",
    options: [
      ["Clubs teach skills that the classroom timetable has no room for.", "Correct: it states one clear, arguable main idea that the paragraph can develop."],
      ["There are many clubs at our school and some are good and some are bad.", "It is vague and points in two directions at once, so the paragraph has no clear focus."],
      ["The chess club meets on Thursdays in Room 12 after the last lesson.", "This is a minor detail, not a main idea that a whole paragraph can develop."],
      ["In this paragraph I will now talk about clubs and other such things.", "Announcing the paragraph is not a topic sentence; it says nothing about the idea."],
    ],
    answer: "A",
    hints: ["A topic sentence should make one clear point.", "Which sentence could the rest of the paragraph explain and support with examples?"],
    explanation: "A strong topic sentence is **focused** (one idea), **clear** and **developable**. The rest of the paragraph can then give examples, such as debating building confidence or the science club teaching practical skills.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "These four sentences make a paragraph but are in the wrong order. Which order is most logical?\n\n*(1) Within a week, the queue at the clinic had halved.*\n*(2) The clinic in our ward used to open only at nine, two hours after people arrived.*\n*(3) Last term, the nurses agreed to begin seeing patients at seven.*\n*(4) A small change in opening times can transform a community service.*",
    options: [
      ["4, 2, 3, 1", "Correct: topic sentence, then the problem, the change, and the result."],
      ["2, 3, 1, 4", "This puts the main idea at the end; the example works better after the topic sentence."],
      ["4, 3, 2, 1", "The change (3) cannot come before we know the problem it solved (2)."],
      ["1, 4, 2, 3", "Starting with the result confuses the reader, who does not yet know what changed."],
    ],
    answer: "A",
    hints: ["Find the sentence that states the general idea.", "Then arrange the example in time order: problem, action, result."],
    explanation: "Sentence 4 is the **topic sentence**. The example then follows a logical order: the original problem (2), the change (3) and its result (1). The time words *used to*, *last term* and *within a week* also help you sequence.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the best linking word for each gap.",
    template: "Many learners want a longer lunch break. {{blank:a}}, the school day would then end later, which worries those who travel far. {{blank:b}}, learners from Epworth already leave home before six. {{blank:c}}, the head should consult parents before making any change.",
    blanks: [
      { id: "a", accepted: ["However"], choices: ["However", "Therefore", "For example", "Similarly"] },
      { id: "b", accepted: ["For example"], choices: ["Therefore", "For example", "In contrast", "Finally"] },
      { id: "c", accepted: ["Therefore"], choices: ["For instance", "Similarly", "Therefore", "Meanwhile"] },
    ],
    hints: ["Does the second sentence agree with the first or raise a problem?", "The third sentence gives a particular case; the last draws a conclusion."],
    explanation: "**However** introduces a problem that contrasts with the wish for a longer break; **For example** introduces a specific case (learners from Epworth); **Therefore** draws the conclusion that follows from the problem.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Read this conclusion to a composition titled *\"Should every school have a vegetable garden?\"*\n\n*In conclusion, gardens are good and bad. Some people like them and some people do not. It is up to everyone to decide.*\n\nWhat is its **main weakness**?",
    options: [
      ["It gives no reasoned judgement on the question.", "Correct: it avoids answering the question, so the composition has no clear end point."],
      ["It is far too long for a conclusion paragraph.", "It is actually very short; length is not the problem."],
      ["It uses the connective *In conclusion*.", "This connective is acceptable; the problem is what follows it."],
      ["It introduces several new arguments at the end.", "It introduces no arguments at all, new or old."],
    ],
    answer: "A",
    hints: ["What should the final paragraph of an answer to a question do?"],
    explanation: "A conclusion to a question title must **answer the question** with a reasoned judgement, for example: *On balance, every school should have a garden, provided learners share the work fairly and the harvest feeds them.* Sitting on the fence leaves the reader unsatisfied.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Write a five- or six-paragraph **plan** for the composition *\"The day I was proved wrong\"*. For each paragraph give a heading and two or three details. Mark the paragraph that contains the turning point.",
    wordLimit: { max: 150 },
    points: [
      ["The plan has five or six paragraphs in a logical order (opening, build-up, turning point, resolution, ending)", 3],
      ["Each paragraph has a clear heading plus two or three specific details", 3],
      ["The turning point (the moment the writer is proved wrong) is clearly marked and central to the plan", 2],
      ["Every paragraph stays relevant to being proved wrong; the ending shows what the writer learnt or how they changed", 2],
    ],
    modelAnswer: "1. **Opening:** form 3 science fair; I am certain my solar cooker design will win; I mock Tafadzwa's 'boring' water filter.\n2. **Build-up:** two weeks of work; I refuse help; the cooker looks impressive.\n3. **The fair:** cloudy morning in Masvingo; my cooker barely warms the water; judges move on.\n4. **Turning point (proved wrong):** Tafadzwa's filter turns muddy dam water clear; the judges and visiting nurse are excited; she wins.\n5. **Resolution:** I congratulate her; she shows me how she tested her idea many times.\n6. **Ending:** I learnt that testing beats confidence; we plan a joint project for next year.",
    explanation: "A good plan already contains the story's shape: a problem, a turning point and a change. Notice that the turning point (paragraph 4) is directly about being proved wrong, so the whole composition stays on the title.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Write **one body paragraph** (100-140 words) for an argumentative composition titled *\"Learners should be allowed to use phones in class.\"* Begin with a clear topic sentence, develop it with an explanation and an example, and end with a sentence that links to the next paragraph.",
    wordLimit: { min: 100, max: 140 },
    points: [
      ["A clear topic sentence that states one main idea relevant to the title", 3],
      ["Development: an explanation of why the point is true", 3],
      ["A specific, realistic example (a fictional school, class or person)", 2],
      ["A closing sentence that links to a following paragraph", 2],
      ["Accurate sentences with at least one suitable connective", 2],
    ],
    hints: ["Choose your side first, then one reason.", "End by hinting at what the next paragraph will discuss."],
    modelAnswer: "Used under clear rules, phones can turn every learner into a researcher. A textbook may be ten years old, but a phone opens up current information in seconds, so a lesson on climate can include this season's rainfall forecast rather than an outdated chart. At a fictional school in Bindura, for example, a geography teacher lets groups use one phone each for ten minutes to find information about a local dam; the class then compares sources and discusses which ones can be trusted. This teaches research skills that learners will need at college and at work. Of course, the same device that opens a door to information can also open a door to distraction, and that risk deserves careful attention.",
    explanation: "This paragraph has a topic sentence, explanation (*so a lesson on climate…*), a specific example (the Bindura class) and a linking sentence that prepares the reader for the counter-argument about distraction.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1600,
    stem: "The paragraph below has no clear topic sentence, contains a sentence that drifts, and has no linking words. **Rewrite it** as one unified, coherent paragraph (90-130 words). You may add details.\n\n*People throw litter at the bus stop. The bins are always full. The council collects them once a month. Plastic bags blow into the stream. My uncle sells airtime near the bus stop. Children play near the stream. Some animals eat plastic.*",
    wordLimit: { min: 90, max: 130 },
    points: [
      ["Adds a clear topic sentence stating the main idea (the litter problem at the bus stop and its effects)", 3],
      ["Removes the drifting sentence about the uncle selling airtime", 2],
      ["Orders the ideas logically (cause, then effects)", 3],
      ["Links sentences with suitable connectives (for example because, as a result, worse still)", 4],
      ["Uses accurate, varied sentences rather than a list of short statements", 4],
    ],
    hints: ["What is the one main idea all these sentences are about?", "Which sentence has nothing to do with litter?"],
    modelAnswer: "The bus stop on our road has become a source of pollution that affects the whole neighbourhood. The problem begins with the bins, which overflow within days because the council empties them only once a month. As a result, passengers who cannot find space simply drop their wrappers on the ground. Plastic bags are then carried by the wind into the stream behind the shops, where children play after school and goats drink. Worse still, animals that swallow plastic can become seriously ill. A problem that starts with one full bin, therefore, quickly spreads far beyond the bus stop.",
    explanation: "The rewrite adds a topic sentence, cuts the irrelevant sentence about the uncle, follows a cause-and-effect order and uses connectives (*as a result*, *then*, *worse still*, *therefore*) to create coherence.",
  });

  b.card("DEFINITION", "Topic sentence", "The sentence (usually first) that states the main idea of a paragraph; every other sentence supports it.");
  b.card("DEFINITION", "Unity (in a paragraph)", "Every sentence in the paragraph is about the one idea in the topic sentence; no drifting sentences.");
  b.card("DEFINITION", "Coherence", "Writing flows logically so the reader can follow how ideas connect; created by connectives, pronouns and repeated key words.");
  b.card("CONCEPT", "Four steps for every composition", "Analyse the title, plan, write, check.", "Roughly 10% of the time planning, 75% writing, 15% checking.");
  b.card("CONCEPT", "Three questions to ask about a title", "What type of writing is wanted? What exactly is the topic? Is there a limit (time, place, person, situation)?");
  b.card("CONCEPT", "When to start a new paragraph", "For a new idea, a new time, a new place or a new speaker.");
  b.card("VOCABULARY", "Contrast connectives", "however, on the other hand, nevertheless, yet, in contrast");
  b.card("VOCABULARY", "Cause-and-effect connectives", "as a result, consequently, therefore, so, because of this");
  b.card("CONCEPT", "What a conclusion should do", "Close, not repeat: resolve the story, restate the position firmly, or give a reasoned judgement.");
  b.card("CONCEPT", "Ways to vary sentence openings", "Start with a time phrase, an -ing phrase, a subordinate clause (Although…), or occasionally a single word; mix short and long sentences.");
});
