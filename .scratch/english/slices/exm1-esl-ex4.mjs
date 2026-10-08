// Slice EXM1: Cambridge 0510 Exercise 4 (multiple-choice reading, 6 marks). Original texts.
import { concept, P, ESL } from "../lib.mjs";

const C = ["eng.reading.inference", "eng.reading.explicit-meaning", "eng.reading.tone-attitude"];
const MCQ_HINTS = ["Find the part of the text the question refers to and read it again carefully before looking at the options.", "Rule out options that are true in the text but do not answer this question."];

const RANGER = `Read the interview with a wildlife ranger, and then answer the questions.

**Eyes and ears of the park**

*Thandiwe Moyo has worked as a ranger in Hwange National Park for eleven years. Our reporter spent a morning on patrol with her.*

**[1] What made you want to become a ranger?**
I grew up in a village on the edge of the park, near Dete. As a child I was terrified of elephants, because they came at night and destroyed the maize my family had planted. My father taught me that elephants were not our enemies. "They are hungry," he said, "and our fields are on paths their grandmothers walked." When I was in Form 2, a ranger visited our school and talked about protecting both animals and people. I decided that day.

**[2] What does a typical day look like?**
Honestly, there is no typical day. Patrols start before sunrise, on foot, in teams of four. We look for snares, check the waterholes and record the animals we see. Some days are quiet. On others we find an animal caught in a wire snare, and we have to call the vet and guard it until help arrives. In the dry season we also check that the pumps at the waterholes are working, because without that water many animals would not survive. Each evening we write a report of everything we have seen, even when nothing happened, because a quiet day is also information.

**[3] Is the work dangerous?**
It can be, but most danger comes from carelessness rather than from the animals. If you respect an animal's space, it usually respects yours. The most frightening moment of my career was not a lion. It was a buffalo that charged after a tourist got out of his car to take photographs. Nobody was hurt, but I still think about how close it was. Visitors sometimes forget that a park is not a zoo.

**[4] How has the job changed since you started?**
When I began, I was one of very few women rangers, and some of my male colleagues openly doubted that I could manage the long patrols. Today there are many of us, and nobody questions it. The tools have changed too: we record sightings on phones with GPS, and the information goes straight to the researchers. Some older rangers distrusted the phones at first, but even they now admit that the system saves time. But the basic skills of reading tracks, listening and waiting have not changed at all.

**[5] What is the hardest part?**
Being away from my children. I work twenty days and then go home for ten, and they are growing up so fast. The other difficulty is the conflict between wildlife and the families who live near the park. When elephants flatten a family's crops, it is hard to ask that family to love conservation, and I do not blame them. So we work with communities on solutions, such as fences painted with chilli grease, which elephants dislike.

**[6] What advice would you give a young person who wants to do this work?**
Get fit, study hard, especially Biology and Geography, and spend time outdoors watching animals quietly. Above all, be patient. You may sit at a waterhole for three hours and see nothing. Then, just as you are packing up to leave, a leopard walks down to drink, and you remember exactly why you chose this life.`;

const CHEF = `Read the article about a young chef, and then answer the questions.

**Grandmother's kitchen, city table**

**[1]** On a busy street in Avondale, Harare, there is a small restaurant called Hari, named after the clay cooking pots that hang on its walls. Its owner and head chef, Rumbidzai Chari, is twenty-seven. Her menu would surprise many visitors: millet sadza served with slow-cooked beef and peanut sauce, dried vegetables cooked with tomato and onion, and pumpkin mashed with peanut butter and served in a neat, warm circle on a white plate.

**[2]** Rumbi grew up with her grandmother in Murehwa. "Gogo did not measure anything," she remembers. "She cooked by smell and by sound. She could tell when the oil was ready by listening to it." Every school holiday Rumbi stood beside the fire, peeling, stirring and tasting. After school, Rumbi trained at a catering college and then worked for four years in the kitchen of a large hotel, preparing pasta, curries and steaks for international guests.

**[3]** It was there that she noticed something that troubled her. Young staff members, and even some customers, spoke about traditional dishes as if they were something to be ashamed of, food for people who could not afford anything better. "I realised that the food I grew up with was disappearing from young people's lives," she says. "Not because it was bad, but because nobody was presenting it with pride."

**[4]** She saved for three years before opening Hari. The first months were difficult. On some evenings only two or three tables were occupied, and she wondered whether she had made a terrible mistake. Slowly, however, customers began to bring their friends, and then their friends' friends. Friends had helped her paint the walls, and an uncle who is a carpenter had made the tables from old timber, so the room already felt like home. Within a year, she needed to book tables in advance at weekends.

**[5]** Most of Rumbi's ingredients come from small farmers around Murehwa, many of them women she has known since childhood. She pays them promptly and agrees prices with them before the planting season. Because she buys what they grow, her menu changes with the seasons: there is no pumpkin dish in October, for example, and in the rainy season fresh leaves replace dried ones. Some of the women say they now earn more from Hari than from selling at the town market.

**[6]** Not everyone approves. Some older people have told her that it is foolish to pay restaurant prices for "village food" that they can cook at home. Rumbi listens politely, but she does not agree. "When you eat here, you are paying for skill and for time, and you are paying farmers properly," she says. "Why should our food be worth less than someone else's?" She also points out that traditional grains such as millet and sorghum cope well with dry conditions, which matters more and more as rainfall becomes less reliable.

**[7]** Her grandmother, now in her eighties, has visited the restaurant only once. She tasted everything slowly and then, according to Rumbi, said only, "The sadza is good. The plates are too big." Rumbi laughs as she tells the story, but it is clear that this short comment meant more to her than any review.

**[8]** Next year she plans to publish a book of Gogo's recipes, written down for the first time with measurements, and to take on two young trainee cooks. "Recipes die when nobody cooks them," she says. "I want these ones to live."`;

const RUNNER = `Read the article by a teacher who took up running, and then answer the questions.

**Never too late to run**

**[1]** Four years ago, at the age of thirty-six, I could not run to the end of my street in Bulawayo without stopping. I was a Mathematics teacher who spent his days sitting, marking and eating whatever the tuck shop sold. Then, at a routine check-up, my doctor told me that my blood pressure was far too high. "You can take tablets for the rest of your life," she said, "or you can take tablets now and change the way you live." I chose both.

**[2]** I started by walking in Centenary Park before school, and after two weeks I began to jog for a minute, then walk for a minute. I hated being seen. Joggers half my age sailed past me, and I was sure that everyone was laughing at the large man in old tennis shoes, gasping for breath. Looking back, I doubt that anyone noticed me at all, but at the time it felt like running on a stage.

**[3]** What changed everything was joining a running club. A colleague persuaded me to come to its Saturday morning group, which welcomes runners of every speed. Nobody there cared how slow I was. They cared that I came back the following week. After six months I finished my first ten-kilometre race, and I cried at the finish line, which my wife still teases me about. We ran together, talked about everything except work, and finished with tea and bread at a stall near the park gate.

**[4]** Then I made the mistake that most new runners make. Excited by my progress, I tried to run further and further every week, and my left knee began to hurt. I ignored it until I could hardly walk down the stairs at school. A physiotherapist told me to rest for a month and then to increase my distance slowly. It was frustrating advice, but it was right.

**[5]** People often tell me that running is an expensive hobby. I disagree. You need comfortable shoes that fit properly, but you do not need the latest brands, special watches or expensive drinks. My first proper pair of running shoes was second-hand, and the park, the roads and the early-morning air are free. I run before the heat of the day, so I rarely need more than a bottle of water.

**[6]** The biggest changes, though, have not been physical. My blood pressure is now normal, and I have lost a great deal of weight, but what surprises me most is how running has changed my mind. An hour on the road clears away the worries of the day. I am calmer and far more patient in the classroom. When a student struggles with algebra, I remember the man who could not reach the end of his street, and I wait. My wife says I am easier to live with, too.

**[7]** Last July I completed my first full marathon in Victoria Falls. It took me almost five hours, and by the end I was walking more than running, but I finished. A group of my Form 3 students has since started a running club at school, and they have asked me to join them on Friday afternoons.

**[8]** Some of my friends still say that running is for the young. I think they are wrong. The body is more forgiving than we imagine, provided we are patient with it. Whatever your age, the hardest step is the first one out of the door.`;

concept("eng.reading.inference", { file: "exam/esl-ex4", keyPrefix: "exam.esl-ex4", applies: ESL }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 720, concepts: C,
    stem: RANGER,
    hints: MCQ_HINTS,
    explanation: "Exercise 4 tests understanding of details, opinions and attitudes. The correct option usually says what the text says in different words; distractors often reuse words from the text but change the meaning.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Why was Thandiwe afraid of elephants when she was a child?",
        options: [
          ["They damaged the crops her family grew.", "Correct: they *destroyed the maize my family had planted*."],
          ["An elephant had once attacked her father.", "Her father taught her about elephants; no attack is mentioned."],
          ["They often wandered into her school grounds.", "The school is mentioned only for the ranger's visit."],
          ["Rangers had warned her village about them.", "The ranger who visited talked about protecting animals and people, not warnings."],
        ],
        answer: "A",
        explanation: "Paragraph 1: elephants *came at night and destroyed the maize my family had planted*.",
      }),
      P.mcq({
        label: "(b)",
        stem: "What did Thandiwe's father mean when he spoke about the elephants' grandmothers?",
        options: [
          ["The fields were on routes elephants had long used.", "Correct: the fields had been planted *on paths their grandmothers walked*, so the elephants were following old routes."],
          ["Old elephants are more dangerous than young ones.", "He was not comparing the danger of old and young elephants."],
          ["Elephant families should be moved deeper into the park.", "He did not suggest moving the elephants."],
          ["Elephants remember people who have harmed them.", "Memory of harm is not part of what he said."],
        ],
        answer: "A",
        explanation: "He meant that the elephants were not enemies: they were simply hungry and were following paths that elephants had walked for generations, before the fields were there.",
      }),
      P.mcq({
        label: "(c)",
        stem: "According to Thandiwe, where does most of the danger in her work come from?",
        options: [
          ["People who do not behave sensibly", "Correct: *most danger comes from carelessness rather than from the animals*, as the tourist and the buffalo show."],
          ["Lions that hunt near the waterholes", "She says her most frightening moment was *not a lion*."],
          ["Animals that are injured in snares", "Snared animals need guarding, but she does not call them the main danger."],
          ["Patrols that start before the sunrise", "Early patrols are part of her routine, not a source of danger."],
        ],
        answer: "A",
        explanation: "Paragraph 3: danger comes mostly from carelessness, such as the tourist who left his car near a buffalo.",
      }),
      P.mcq({
        label: "(d)",
        stem: "What does Thandiwe say about women rangers when she started the job?",
        options: [
          ["Some male colleagues questioned their stamina.", "Correct: some colleagues *openly doubted that I could manage the long patrols*."],
          ["They were not allowed to go out on foot patrols.", "She did go on patrol; her colleagues only doubted her."],
          ["They were paid less than the men doing the same work.", "Pay is not mentioned."],
          ["They mostly worked with the researchers in offices.", "Researchers receive data from phones; this is about modern tools, not women."],
        ],
        answer: "A",
        explanation: "In paragraph 4 she says male colleagues doubted that she could manage the long patrols; today *nobody questions it*.",
      }),
      P.mcq({
        label: "(e)",
        stem: "How does Thandiwe feel about families near the park who do not support conservation?",
        options: [
          ["She understands why they feel that way.", "Correct: *it is hard to ask that family to love conservation, and I do not blame them*."],
          ["She thinks they should move away from the park.", "She works with them on solutions; she does not suggest moving them."],
          ["She believes they exaggerate the elephant damage.", "She describes the damage as real: elephants *flatten* crops."],
          ["She is angry that they ignore the rangers' advice.", "She shows sympathy, not anger."],
        ],
        answer: "A",
        explanation: "Her words *I do not blame them* show sympathy and understanding, which is why rangers work with communities on solutions such as chilli fences.",
      }),
      P.mcq({
        label: "(f)",
        stem: "What is the main point of Thandiwe's final answer?",
        options: [
          ["Patience can bring unforgettable rewards.", "Correct: she stresses being patient, and the leopard is the reward that makes the waiting worthwhile."],
          ["Leopards are most easily seen at waterholes.", "The leopard is an example, not a general claim about where to see leopards."],
          ["Fitness matters more than school subjects.", "She advises fitness *and* study; she does not rank them."],
          ["Rangers must study Biology at university.", "She recommends Biology and Geography at school; university is not mentioned."],
        ],
        answer: "A",
        explanation: "*Above all, be patient.* The story of waiting three hours and then seeing a leopard illustrates why patience matters.",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 720, concepts: C,
    stem: CHEF,
    hints: MCQ_HINTS,
    explanation: "Read the whole option before choosing: many distractors are half true, mixing a detail from the text with an idea the writer never states.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What does Rumbi say about the way her grandmother cooked?",
        options: [
          ["She relied on her senses rather than on measurements.", "Correct: *She cooked by smell and by sound* and *did not measure anything*."],
          ["She followed recipes that had been written down.", "The recipes have never been written down; Rumbi plans to do this for the first time."],
          ["She cooked only with ingredients from her own garden.", "The source of her ingredients is not mentioned."],
          ["She learned new dishes from a catering college.", "Rumbi, not her grandmother, went to catering college."],
        ],
        answer: "A",
        explanation: "Paragraph 2: Gogo cooked *by smell and by sound* and could hear when the oil was ready.",
      }),
      P.mcq({
        label: "(b)",
        stem: "What troubled Rumbi while she was working at the hotel?",
        options: [
          ["Traditional food was seen as something to be ashamed of.", "Correct: people spoke of traditional dishes *as if they were something to be ashamed of*."],
          ["International guests did not enjoy the hotel's food.", "Nothing suggests the guests disliked the food."],
          ["The hotel paid its kitchen staff far too little money.", "Pay is not mentioned."],
          ["She was given no chance to cook international dishes.", "She did prepare pasta, curries and steaks."],
        ],
        answer: "A",
        explanation: "Paragraph 3: young staff and some customers treated traditional food as food for the poor, and she felt it was disappearing from young people's lives.",
      }),
      P.mcq({
        label: "(c)",
        stem: "How did Hari become successful?",
        options: [
          ["Customers recommended it to the people they knew.", "Correct: *customers began to bring their friends, and then their friends' friends*."],
          ["A newspaper review attracted many new customers.", "No newspaper review is mentioned in the article."],
          ["Rumbi lowered her prices during the first year.", "Prices are discussed only in paragraph 6, and she defends them."],
          ["The hotel where she had worked sent its guests.", "The hotel is not connected with the restaurant's success."],
        ],
        answer: "A",
        explanation: "Paragraph 4 describes slow growth by word of mouth until tables had to be booked at weekends.",
      }),
      P.mcq({
        label: "(d)",
        stem: "Why does the menu at Hari change during the year?",
        options: [
          ["It depends on what the farmers are able to supply.", "Correct: *Because she buys what they grow, her menu changes with the seasons.*"],
          ["Customers become bored with the same dishes.", "Customers' boredom is not given as a reason."],
          ["Rumbi tests a new recipe from Gogo every month.", "The recipes are for a future book, not monthly menu changes."],
          ["Some ingredients become too expensive to buy.", "She agrees prices before planting; cost is not the reason."],
        ],
        answer: "A",
        explanation: "Paragraph 5: she buys from small farmers, so the menu follows the harvest; for example, there is no pumpkin dish in October.",
      }),
      P.mcq({
        label: "(e)",
        stem: "How does Rumbi respond to people who say her prices are too high?",
        options: [
          ["She argues that skill and fair pay for farmers cost money.", "Correct: *you are paying for skill and for time, and you are paying farmers properly*."],
          ["She agrees and has decided to make her dishes cheaper.", "She listens politely *but she does not agree*."],
          ["She refuses to discuss the matter with older people.", "She listens politely and explains her view."],
          ["She says that village food is better than city food.", "She argues that traditional food is worth as much as other food, not that it is better."],
        ],
        answer: "A",
        explanation: "Paragraph 6: she defends her prices by pointing to skill, time and fair payment to farmers.",
      }),
      P.mcq({
        label: "(f)",
        stem: "What does paragraph 7 suggest about Rumbi's feelings towards her grandmother?",
        options: [
          ["Her grandmother's opinion matters to her a great deal.", "Correct: the short comment *meant more to her than any review*."],
          ["She is hurt that her grandmother criticised the plates.", "She laughs as she tells the story; she is not hurt."],
          ["She wishes her grandmother would visit the restaurant more.", "The text says Gogo visited once, but not that Rumbi wishes for more visits."],
          ["She thinks her grandmother does not understand modern food.", "Nothing suggests Rumbi dismisses her grandmother's view."],
        ],
        answer: "A",
        explanation: "The writer says the brief comment *meant more to her than any review*, which shows how much Rumbi values her grandmother's judgement.",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 720, concepts: C,
    stem: RUNNER,
    hints: MCQ_HINTS,
    explanation: "Questions on attitude and opinion ask what the writer thinks or feels: look for evaluative words (*I disagree*, *I think they are wrong*, *it was right*) rather than for facts.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Why did the writer start running?",
        options: [
          ["A doctor told him his blood pressure was too high.", "Correct: his doctor said his blood pressure was *far too high*."],
          ["A colleague persuaded him to join a running club.", "That happened later, after he had started walking and jogging."],
          ["His students asked him to start a running club.", "The students' club started after his marathon."],
          ["He wanted to enter a marathon in Victoria Falls.", "The marathon came four years later."],
        ],
        answer: "A",
        explanation: "Paragraph 1: a check-up showed high blood pressure, and the doctor advised him to change the way he lived.",
      }),
      P.mcq({
        label: "(b)",
        stem: "How did the writer feel during his early runs in the park?",
        options: [
          ["Embarrassed, because he thought people were watching him", "Correct: *I hated being seen* and *it felt like running on a stage*."],
          ["Proud, because he could already run without stopping", "He could only jog for a minute at a time."],
          ["Angry, because younger runners laughed at him openly", "He only imagined that people were laughing; he now doubts anyone noticed."],
          ["Bored, because walking in the same park was repetitive", "Boredom is not mentioned."],
        ],
        answer: "A",
        explanation: "Paragraph 2: he felt self-conscious, although he now thinks nobody noticed him.",
      }),
      P.mcq({
        label: "(c)",
        stem: "What caused the writer's knee injury?",
        options: [
          ["He increased his running distance too quickly.", "Correct: *I tried to run further and further every week*."],
          ["He wore cheap tennis shoes that did not fit well.", "His old tennis shoes are mentioned only in his first weeks; they are not blamed."],
          ["He fell on the stairs at school while he was running.", "He found the stairs hard *because* of the injury; he did not fall."],
          ["He ran the marathon without having trained for it.", "The injury came long before the marathon."],
        ],
        answer: "A",
        explanation: "Paragraph 4: excitement made him add distance too fast, *the mistake that most new runners make*.",
      }),
      P.mcq({
        label: "(d)",
        stem: "What is the writer's opinion about the cost of running?",
        options: [
          ["It need not cost much, apart from suitable shoes.", "Correct: he says you need comfortable shoes that fit, but the rest is free."],
          ["It is expensive because good shoes cost a lot.", "He disagrees that running is expensive; his first pair was second-hand."],
          ["Runners should buy special watches and drinks.", "He says you do *not* need special watches or expensive drinks."],
          ["Joining a club is the most expensive part of it.", "Club fees are not mentioned."],
        ],
        answer: "A",
        explanation: "Paragraph 5 begins *People often tell me that running is an expensive hobby. I disagree.*",
      }),
      P.mcq({
        label: "(e)",
        stem: "According to the writer, how has running changed his teaching?",
        options: [
          ["He is more patient with students who find work hard.", "Correct: *I am calmer and far more patient in the classroom* and he *waits* for students who struggle."],
          ["He now teaches Physical Education as well as Maths.", "He remains a Mathematics teacher; PE is not mentioned."],
          ["He uses running examples to explain algebra problems.", "He remembers his own struggle; he does not use running examples in lessons."],
          ["He spends less time marking and more time training.", "Marking time is mentioned only in describing his old life."],
        ],
        answer: "A",
        explanation: "Paragraph 6: running clears his mind, and remembering his own struggle makes him wait patiently for students.",
      }),
      P.mcq({
        label: "(f)",
        stem: "Which statement best sums up the writer's message in the final paragraph?",
        options: [
          ["Age need not stop anyone from starting to run.", "Correct: *Whatever your age, the hardest step is the first one out of the door.*"],
          ["Young people are naturally better at running.", "He says friends who believe this are *wrong*."],
          ["Running should be done only with a doctor's help.", "He mentions a doctor in paragraph 1, but this is not his final message."],
          ["Marathons are the best goal for a new runner.", "He does not recommend marathons as a goal for beginners."],
        ],
        answer: "A",
        explanation: "He rejects the idea that running is for the young and encourages readers of any age to begin.",
      }),
    ],
  });
});
