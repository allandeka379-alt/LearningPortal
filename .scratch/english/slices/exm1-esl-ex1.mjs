// Slice EXM1: Cambridge 0510 Exercise 1 (reading: short answers, 8 marks). Original texts.
import { concept, P, ESL } from "../lib.mjs";

const C = ["eng.reading.explicit-meaning", "eng.reading.inference", "eng.reading.vocabulary-in-context"];

const GARDEN = `Read the blog post by Nyasha, a student in Gweru, and then answer the questions.

**More than vegetables**

**[1]** When our Agriculture teacher, Mr Dube, suggested that the Environment Club should turn the empty plot behind the science block into a vegetable garden, most of us laughed. The ground was as hard as a road and covered in broken bricks and the remains of an old netball post. That was in February. By the end of the second term we were selling rape, tomatoes and green beans to the school kitchen, and nobody was laughing any more.

**[2]** The first job was the worst. Twelve of us spent three Saturday mornings digging out rubble and wheeling it to the skip by the gate. Mr Dube would not let us plant anything until we had dug compost into every bed. He showed us how to build a heap from grass cuttings, kitchen peelings and cattle manure given to us by a farmer whose daughter is in Form 2. "Feed the soil first," he kept saying, "and the soil will feed you."

**[3]** Water was our biggest problem. The only tap was forty metres away, and carrying buckets in the October heat soon made people drop out of the club. Then Tendai, a Form 4 student who loves physics, designed a drip system from old plastic bottles and a hosepipe the school had thrown away. It uses about a third of the water we used before, and the plants get it at the roots, where they need it.

**[4]** Not everything went well. Caterpillars destroyed our first cabbages in a single week, and we lost a whole bed of tomato seedlings when a goat got in through a gap in the fence. We learned to check the leaves every morning before lessons and to plant marigolds between the rows, because their smell seems to keep some insects away. We also mended the fence, properly this time, with wire that a parent brought from his workshop.

**[5]** The kitchen now buys most of its green vegetables from us at a price agreed with the bursar. We have spent the money on seeds, gloves and a second watering can, and we are saving for a shade-net tunnel so that we can raise seedlings in the hot season.

**[6]** For me, though, the garden has grown more than vegetables. Students who hardly spoke in class now confidently explain our methods to visitors. I have discovered that I enjoy keeping the club's accounts, and I am even thinking about Accounting at A Level. And every time I eat rape at lunch, I know exactly where it came from, and how much work it took to grow.`;

const BOOKBIKE = `Read the magazine article about a mobile library in Chitungwiza, and then answer the questions.

**The library that comes to you**

**[1]** At four o'clock every Wednesday afternoon, a bell rings at the corner of a dusty street in Chitungwiza and children come running from every direction. They are not chasing an ice-cream seller. They are chasing books. The bell belongs to Mrs Rumbidzai Moyo, a retired primary school teacher who rides a tricycle with a large wooden box fixed behind the seat. Inside the box are about two hundred books, wrapped in plastic to keep out the dust.

**[2]** Mrs Moyo started the Book Bike three years ago, after she noticed that many children in her neighbourhood had never held a story book that was not a school textbook. "The nearest public library is two bus rides away," she explains. "For a family counting every dollar, that might as well be the moon." She began with forty books from her own shelves. Friends, former pupils and a church group in Harare have donated the rest, and every month or so a parcel arrives from someone she has never met.

**[3]** The system is simple. Each child has a small card with their name on it. They may borrow two books at a time and must bring them back the following week. Mrs Moyo keeps a record in an old exercise book, and she says that fewer than ten books have ever gone missing. "Children look after things when they are trusted," she says. "The ones who lose a book usually come and tell me themselves."

**[4]** The Book Bike is not only for borrowing. Each visit ends with twenty minutes of reading aloud. Older children take turns to read to the younger ones, and Mrs Moyo listens and helps with difficult words. Parents have noticed the difference. Mr Farai Chikore, whose son Tanaka is nine, says the boy now reads the newspaper to his grandmother, whose eyesight is poor.

**[5]** Running the project is not always easy. The tricycle's chain has broken twice, and during the rainy season the roads turn to mud, so Mrs Moyo moves her stop under the roof of a nearby tuck shop. Her greatest worry, though, is the condition of the books. Many are old and torn, and she spends her evenings repairing covers with tape and glue.

**[6]** She has plans. She hopes to train two of her teenage readers to run a second route, and she would like more books in Shona and Ndebele, which are the most popular with the youngest children. "Every child deserves stories in the language they dream in," she says.`;

const HIKE = `Read the blog post by Kudzai, a student who went on a school trip to the Chimanimani mountains, and then answer the questions.

**Three days above the clouds**

**[1]** I am not an outdoor person. Before last term, the longest walk I had ever done was from our house to the shops in Mabvuku. So when our Geography teacher, Mrs Ncube, announced a three-day hiking trip to the Chimanimani mountains for the Form 3 classes, I put my name down mainly because my best friend Ruvimbo did.

**[2]** Preparation started a month before. Mrs Ncube made us walk around the school sports field with loaded rucksacks every Tuesday afternoon, and she gave each of us a list of what to pack. It included a warm jacket, which seemed silly for October, a torch, a water bottle and a plastic bag to keep our clothes dry. "The mountains make their own weather," she warned us. She was right.

**[3]** On the first morning we climbed for almost four hours to reach the mountain hut where we would sleep. The path was steep and rocky, and halfway up I wanted to turn back. Ruvimbo, who had trained harder than I had, carried my water bottle for an hour and told terrible jokes until I forgot about my legs. By the time we reached the hut, a thick mist had rolled in and it was so cold that I wore my "silly" jacket all evening.

**[4]** The second day was the best day of my life so far. The mist had gone and we could see for kilometres: grey peaks, deep green valleys and, far below us, a river shining like a silver thread. Our guide, Mr Sithole, showed us how to read a map and a compass, and he pointed out plants that grow nowhere else in Zimbabwe. We swam in a freezing pool, screaming as we jumped in, and ate our lunch on a flat rock warmed by the sun.

**[5]** Not everything was perfect. A boy in our group twisted his ankle on the way down, and two teachers had to help him for the last hour. We also had to carry all our rubbish back with us, because there are no bins on the mountain, and the bags became heavy and smelly by the third day.

**[6]** I came home with sore feet and a sunburnt nose, but also with something unexpected: confidence. I had done something I believed I could not do. Next year I want to join the school's hiking club, and this time I will be the one carrying somebody else's water bottle.`;

concept("eng.reading.explicit-meaning", { file: "exam/esl-ex1", keyPrefix: "exam.esl-ex1", applies: ESL }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 960, concepts: C,
    stem: GARDEN,
    hints: ["Find the paragraph each question points to, then copy only the words that answer it.", "Short answers are fine: a word or a phrase is enough."],
    explanation: "Exercise 1 tests careful reading for detail. Each answer is in one place in the text; give only the detail asked for, and for the last question give three separate points.",
    parts: [
      P.short({
        label: "(a)",
        stem: "Which sport had once been played on the plot behind the science block?",
        accepted: ["netball", "netball was played there"],
        keywords: { all: ["netball"] },
        model: "netball",
        wrong: ["football"],
        explanation: "Paragraph 1 mentions *the remains of an old netball post*.",
      }),
      P.short({
        label: "(b)",
        stem: "How many students cleared the rubble from the plot?",
        accepted: ["twelve", "12", "twelve students", "12 students", "twelve of them", "twelve people", "12 people"],
        model: "twelve",
        wrong: ["three"],
        explanation: "*Twelve of us spent three Saturday mornings digging out rubble.* Three is the number of Saturdays.",
      }),
      P.short({
        label: "(c)",
        stem: "Who gave the club the cattle manure?",
        accepted: ["a farmer", "farmer", "a farmer whose daughter is in form 2", "the farmer", "a local farmer"],
        keywords: { all: ["farmer"] },
        model: "a farmer whose daughter is in Form 2",
        wrong: ["Mr Dube"],
        explanation: "The manure was *given to us by a farmer whose daughter is in Form 2*.",
      }),
      P.short({
        label: "(d)",
        stem: "According to the writer, why is Tendai's drip system good for the plants?",
        accepted: ["they get water at the roots", "the water goes to the roots", "water reaches the roots", "it waters the roots", "plants get water at the roots"],
        keywords: { all: ["roots"] },
        model: "The plants get the water at the roots, where they need it.",
        wrong: ["it uses less water"],
        explanation: "Saving water helps the club; what helps the **plants** is that *the plants get it at the roots, where they need it*.",
      }),
      P.short({
        label: "(e)",
        stem: "What is the club saving money to buy?",
        accepted: ["a shade-net tunnel", "shade-net tunnel", "a shade net tunnel", "shade net tunnel", "a tunnel", "a shade-net", "shade net"],
        keywords: { any: ["tunnel", "shadenet"] },
        model: "a shade-net tunnel",
        wrong: ["seeds and gloves"],
        explanation: "*We are saving for a shade-net tunnel.* Seeds, gloves and the watering can have already been bought.",
      }),
      P.manual({
        label: "(f)",
        marks: 3,
        stem: "Give **three** problems the club had to overcome while setting up and running the garden.",
        points: [
          "One problem: hard ground covered in rubble / broken bricks; OR the tap was far away (forty metres), so carrying water made members leave; OR caterpillars ate the cabbages; OR a goat got in through the fence and ate the seedlings",
          "A second, different problem from the list",
          "A third, different problem from the list",
        ],
        modelAnswer: "The ground was hard and full of rubble; the only tap was forty metres away; caterpillars destroyed the first cabbages.",
        explanation: "Each problem must be different. The goat and the gap in the fence count as one problem.",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 960, concepts: C,
    stem: BOOKBIKE,
    hints: ["Scan for names and numbers first: they usually lead you to the right paragraph.", "Check whether the question asks about the past or the future."],
    explanation: "Read each question for its key word (who, how many, where, why) and find the sentence that answers it. In the final question each of the three points must be a separate idea.",
    parts: [
      P.short({
        label: "(a)",
        stem: "What job did Mrs Moyo do before she retired?",
        accepted: ["primary school teacher", "a primary school teacher", "teacher", "a teacher", "she was a teacher", "she was a primary school teacher"],
        keywords: { all: ["teacher"] },
        model: "a primary school teacher",
        wrong: ["librarian"],
        explanation: "Paragraph 1: *a retired primary school teacher*.",
      }),
      P.short({
        label: "(b)",
        stem: "How many books did Mrs Moyo start the Book Bike with?",
        accepted: ["forty", "40", "forty books", "40 books"],
        model: "forty",
        wrong: ["two hundred"],
        explanation: "*She began with forty books from her own shelves.* About two hundred is how many the box holds now.",
      }),
      P.short({
        label: "(c)",
        stem: "How many books may each child borrow at a time?",
        accepted: ["two", "2", "two books", "2 books"],
        model: "two",
        wrong: ["ten"],
        explanation: "*They may borrow two books at a time.* Fewer than ten is the number of books that have gone missing.",
      }),
      P.short({
        label: "(d)",
        stem: "Where does Mrs Moyo hold her stop during the rainy season?",
        accepted: ["under the roof of a tuck shop", "under the roof of a nearby tuck shop", "at a tuck shop", "at the tuck shop", "under a tuck shop roof", "a nearby tuck shop", "the tuck shop"],
        keywords: { any: ["tuck", "tuckshop"] },
        model: "under the roof of a nearby tuck shop",
        wrong: ["in her house"],
        explanation: "Paragraph 5: *Mrs Moyo moves her stop under the roof of a nearby tuck shop.*",
      }),
      P.short({
        label: "(e)",
        stem: "What does Mrs Moyo use to repair the covers of old books?",
        accepted: ["tape and glue", "glue and tape", "with tape and glue", "tape", "glue"],
        keywords: { any: ["tape", "glue"] },
        model: "tape and glue",
        wrong: ["a needle"],
        explanation: "*She spends her evenings repairing covers with tape and glue.*",
      }),
      P.manual({
        label: "(f)",
        marks: 3,
        stem: "Give **three** difficulties that Mrs Moyo faces in running the Book Bike.",
        points: [
          "One difficulty: the tricycle's chain breaks / has broken twice; OR the roads turn to mud in the rainy season; OR many books are old and torn (in poor condition); OR she does not have enough books in Shona and Ndebele",
          "A second, different difficulty from the list",
          "A third, different difficulty from the list",
        ],
        modelAnswer: "The tricycle's chain has broken twice; the roads turn to mud in the rainy season; many of the books are old and torn.",
        explanation: "Paragraph 5 gives three difficulties; the wish for more Shona and Ndebele books in paragraph 6 is an acceptable fourth. Lost books are not a difficulty: fewer than ten have gone missing.",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 960, concepts: C,
    stem: HIKE,
    hints: ["Each question follows the order of the text.", "For the last question, look for things that went wrong, not for good things."],
    explanation: "Answers in Exercise 1 are short and exact. Avoid copying long sentences: lift only the words that answer the question, and make each of the three final points different.",
    parts: [
      P.short({
        label: "(a)",
        stem: "What was the main reason Kudzai signed up for the trip?",
        accepted: ["because ruvimbo did", "her best friend ruvimbo did", "her best friend signed up", "because her best friend did", "ruvimbo signed up", "her friend was going"],
        keywords: { any: ["ruvimbo", "friend"] },
        model: "because her best friend Ruvimbo did",
        wrong: ["she loves hiking"],
        explanation: "*I put my name down mainly because my best friend Ruvimbo did.*",
      }),
      P.short({
        label: "(b)",
        stem: "On which day of the week did the students train with loaded rucksacks?",
        accepted: ["tuesday", "tuesdays", "on tuesday", "on tuesdays", "every tuesday", "tuesday afternoon", "tuesday afternoons"],
        model: "Tuesday",
        wrong: ["Saturday"],
        explanation: "*every Tuesday afternoon*.",
      }),
      P.short({
        label: "(c)",
        stem: "Which item on the packing list did Kudzai think was unnecessary?",
        accepted: ["a warm jacket", "warm jacket", "the jacket", "jacket", "the warm jacket"],
        keywords: { all: ["jacket"] },
        model: "a warm jacket",
        wrong: ["a torch"],
        explanation: "The jacket *seemed silly for October*; later the writer calls it the *silly* jacket.",
      }),
      P.short({
        label: "(d)",
        stem: "How long did the climb to the mountain hut take?",
        accepted: ["almost four hours", "nearly four hours", "four hours", "4 hours", "almost 4 hours", "nearly 4 hours", "about four hours", "just under four hours"],
        keywords: { any: ["four", "4"] },
        model: "almost four hours",
        wrong: ["an hour"],
        explanation: "*We climbed for almost four hours.* The one hour is how long Ruvimbo carried the water bottle.",
      }),
      P.short({
        label: "(e)",
        stem: "What did Mr Sithole teach the students to use?",
        accepted: ["a map and a compass", "map and compass", "a map and compass", "maps and compasses", "a compass and a map", "compass and map"],
        keywords: { all: ["map", "compass"] },
        model: "a map and a compass",
        wrong: ["a torch"],
        explanation: "*Mr Sithole showed us how to read a map and a compass.* Both are needed for the mark.",
      }),
      P.manual({
        label: "(f)",
        marks: 3,
        stem: "Give **three** things that were difficult or unpleasant about the trip.",
        points: [
          "One thing: the steep, rocky path (Kudzai wanted to turn back); OR the cold mist / it was very cold at the hut; OR a boy twisted his ankle; OR the rubbish bags were heavy and smelly; OR sore feet / sunburnt nose",
          "A second, different thing from the list",
          "A third, different thing from the list",
        ],
        modelAnswer: "The path to the hut was steep and rocky; a boy twisted his ankle on the way down; they had to carry heavy, smelly rubbish bags.",
        explanation: "Any three separate difficulties earn the marks. Sore feet and a sunburnt nose together count as one point about the after-effects.",
      }),
    ],
  });
});
