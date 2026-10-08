// Slice EXM1: Cambridge 0510 Exercise 3 (note completion, 7 marks). Original texts.
import { concept, P, ESL } from "../lib.mjs";

const C = ["eng.reading.note-making", "eng.reading.explicit-meaning"];
const NOTE_HINTS = ["Each gap needs only one to three words from the text.", "Make sure your answer fits the grammar of the note it completes."];

const BAOBAB = `Read the article about the baobab tree. Then complete the notes that follow.

**The upside-down tree**

**[1]** Anyone who has driven through the Zambezi valley or the Lowveld in the dry season will know the baobab. With its huge grey trunk and bare, twisted branches, it looks as if someone has pulled it out of the ground and planted it upside down, with its roots in the air. In many parts of Zimbabwe it is called *muuyu*, and it is one of the most useful trees in the country.

**[2]** The baobab is built for dry places. Its trunk is soft and spongy inside and stores large amounts of water, which helps the tree to survive months without rain. To save that water, the tree drops its leaves early in the dry season and stays bare for much of the year. In a long drought, the trunk visibly shrinks, then swells again when the rains return.

**[3]** Baobab flowers are large and white, and they hang down on long stalks. Unusually, they open at night and last for less than a day. Their strong smell attracts fruit bats, which feed on the nectar and carry pollen from one tree to the next. By morning the flowers have already begun to turn brown.

**[4]** Almost every part of the tree can be used. The fruit has a hard, velvety shell, and inside it a dry, chalky pulp surrounds the seeds. The pulp tastes sour and is rich in vitamin C. Families mix it into porridge or stir it into water to make a refreshing drink. The young leaves are cooked as a vegetable, much like other green relishes, and the seeds can be roasted and eaten. The inner bark contains strong fibres that people twist into rope and weave into mats. Remarkably, the tree can grow new bark after strips have been taken.

**[5]** Some baobabs are very old. Their age is hard to measure because the wood does not form clear yearly rings, but scientists believe the largest trees have lived for many centuries. Old trunks are sometimes hollow, and over the years they have been used as stores, shelters and even meeting places.

**[6]** Yet the baobab faces threats. In dry years, elephants tear at the trunks to reach the moisture inside, and some trees collapse. Land is cleared for fields and roads. The greatest worry, however, is that few young trees are growing up to replace the old ones, because goats eat the seedlings before they can become established. In some villages, schools have begun to grow baobab seedlings in protected nurseries and to plant them out when they are strong enough.`;

const RADIO = `Read the article about a school radio station. Then complete the notes that follow.

**On air at lunchtime**

**[1]** Every weekday at ten past one, the loudspeakers in the corridors of Sakubva High School in Mutare crackle into life, and a cheerful voice announces: "This is Sakubva Sound, the voice of the students!" For the next forty minutes, the school's own radio station fills the lunch break with music, news and conversation.

**[2]** The station began two years ago, after a group of Form 4 students went on a school visit to a community radio station in Harare. "We watched the presenters work and thought: why can't we do that?" remembers Tatenda Mapfumo, now in Form 6 and the station manager. The head teacher agreed, on one condition: the students had to raise the money for the equipment themselves.

**[3]** They organised a sponsored walk from the school to Christmas Pass and back, and parents, teachers and local businesses supported them. With the money they bought a second-hand microphone, a small mixing desk and an old laptop. An electrician whose son attends the school connected the equipment to the loudspeakers for free.

**[4]** The station has a weekly timetable. On Mondays there is a sports programme with results from school teams. Wednesday is request day, when students send in songs and messages on slips of paper posted in a box outside the library. On Fridays a guest, usually a teacher or a former student, is interviewed about their work or their life. Every day begins with five minutes of school news and announcements.

**[5]** There are strict rules. Every script must be checked by the teacher in charge, Mrs Chirwa, the day before it is broadcast, and no one may play a song with offensive lyrics. Presenters must speak in English on most days, but on Thursdays the programme is in Shona or Ndebele. "Using our home languages is popular with everybody," says Tatenda, "especially the younger students."

**[6]** Running the station is not easy. Power cuts sometimes silence it in the middle of a programme, and the old laptop has crashed more than once during a live interview. Some teachers also complained at first that the noise disturbed staff working in the staffroom, so the speaker nearest to it was turned down.

**[7]** For the thirty students involved, the rewards are clear. Many say they have become more confident speakers, and two former presenters are now studying journalism. The station is now training Form 2 students so that it continues after the current team leaves school.`;

const BEES = `Read the article about a young beekeeper. Then complete the notes that follow.

**Sweet success in Mutoko**

**[1]** When Tsitsi Marufu left school, she could not find work in Harare, so she returned to her family's homestead near Mutoko. Five years later she keeps forty hives and sells honey to shops in three towns. "I used to be afraid of bees," she laughs. "Now I talk to them every morning."

**[2]** Tsitsi's interest began when an agricultural extension officer held a two-week beekeeping course at the local business centre. She was one of only three women among twenty participants. The course taught her how bees live, how to build a simple hive and how to harvest honey without destroying the colony. At the end, each participant was given a hive to start with.

**[3]** She built her next hives herself from old wooden boxes, and later she learned to make traditional log hives from fallen trees. She hangs them from strong branches, well away from footpaths and cattle, because bees become aggressive if they are disturbed too often. To protect the hives from honey badgers, which can rip a hive open to reach the honey, she uses wire to hang them high above the ground.

**[4]** Tsitsi checks her hives once a week. She always works in the early evening, when most of the bees have returned and are calmer, and she wears a veil, gloves and long boots. Before opening a hive, she uses a little smoke from burning cow dung, which makes the bees less likely to sting. She harvests twice a year, taking only the combs that are full and leaving enough honey for the bees to survive the dry months.

**[5]** Honey is not her only product. She melts the wax from old combs and makes candles and a polish for wooden furniture, which she sells at the market in Mutoko. Her best customers, she says, are people who want a natural cough remedy and buy her honey mixed with lemon and ginger.

**[6]** The work has its difficulties. In years of drought there are fewer flowers, so the bees produce less honey. Some farmers nearby spray their crops with chemicals that can kill bees, and Tsitsi has spent many hours talking to them about spraying in the evening, when bees are not flying.

**[7]** Her next plan is to train other young people. "Bees do not need much land, and the hives can be made from cheap materials," she says. "Many young people could earn a living this way."`;

concept("eng.reading.note-making", { file: "exam/esl-ex3", keyPrefix: "exam.esl-ex3", applies: ESL }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 840, concepts: C,
    stem: BAOBAB + "\n\nYou are preparing a talk for your school's Environment Club about the baobab. Complete the notes. Write **one to three words** for each gap.",
    hints: NOTE_HINTS,
    explanation: "Note completion rewards precise, short answers that fit each heading. Find the paragraph that matches the heading, then lift the exact detail.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Features of the baobab**\n\n- water stored in the ______",
        accepted: ["trunk", "the trunk", "its trunk", "tree trunk"],
        keywords: { all: ["trunk"] },
        model: "trunk",
        wrong: ["roots"],
        explanation: "Paragraph 2: *Its trunk is soft and spongy inside and stores large amounts of water.* The roots only appear in the *upside-down* description.",
      }),
      P.short({
        label: "(b)",
        stem: "- flowers open ______",
        accepted: ["at night", "night", "in the night", "during the night", "at night time", "at nighttime"],
        keywords: { all: ["night"] },
        model: "at night",
        wrong: ["in the morning"],
        explanation: "Paragraph 3: *they open at night and last for less than a day*.",
      }),
      P.short({
        label: "(c)",
        stem: "- flowers pollinated by ______",
        accepted: ["fruit bats", "bats", "fruit bat", "bat"],
        keywords: { any: ["bats", "bat"] },
        model: "fruit bats",
        wrong: ["bees"],
        explanation: "*Their strong smell attracts fruit bats, which … carry pollen from one tree to the next.*",
      }),
      P.short({
        label: "(d)",
        stem: "**Uses of the baobab**\n\n- fruit pulp: rich in ______",
        accepted: ["vitamin c", "vit c"],
        keywords: { all: ["vitamin"] },
        model: "vitamin C",
        wrong: ["water"],
        explanation: "*The pulp tastes sour and is rich in vitamin C.*",
      }),
      P.short({
        label: "(e)",
        stem: "- bark fibres: used to make ______",
        accepted: ["rope", "ropes", "mats", "rope and mats", "ropes and mats", "rope mats", "mats and rope"],
        keywords: { any: ["rope", "ropes", "mats", "mat"] },
        model: "rope and mats",
        wrong: ["porridge"],
        explanation: "*The inner bark contains strong fibres that people twist into rope and weave into mats.* Either product earns the mark.",
      }),
      P.short({
        label: "(f)",
        stem: "**Threats to the baobab**\n\n- trunks damaged by ______",
        accepted: ["elephants", "elephant"],
        model: "elephants",
        wrong: ["goats"],
        explanation: "Paragraph 6: *elephants tear at the trunks to reach the moisture inside*. Goats damage seedlings, not trunks.",
      }),
      P.short({
        label: "(g)",
        stem: "- few young trees survive because seedlings are ______",
        accepted: ["eaten by goats", "eaten by goat", "eaten", "goats eat them", "destroyed by goats", "eaten by the goats", "goats"],
        keywords: { all: ["goats"] },
        model: "eaten by goats",
        wrong: ["cut down"],
        explanation: "*Goats eat the seedlings before they can become established.*",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 840, concepts: C,
    stem: RADIO + "\n\nYour school is thinking of starting its own radio station. Complete the notes about Sakubva Sound. Write **one to three words** for each gap.",
    hints: NOTE_HINTS,
    explanation: "The notes follow the order of the article. Under each heading, give only the detail asked for, keeping to the word limit.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**How the station started**\n\n- idea came from a visit to a ______",
        accepted: ["community radio station", "radio station", "a community radio station", "a radio station", "community radio"],
        keywords: { all: ["radio"] },
        model: "community radio station",
        wrong: ["library"],
        explanation: "Paragraph 2: *a school visit to a community radio station in Harare*.",
      }),
      P.short({
        label: "(b)",
        stem: "- money for equipment raised through a ______",
        accepted: ["sponsored walk", "a sponsored walk", "walk"],
        keywords: { all: ["walk"] },
        model: "sponsored walk",
        wrong: ["concert"],
        explanation: "*They organised a sponsored walk from the school to Christmas Pass and back.*",
      }),
      P.short({
        label: "(c)",
        stem: "**Weekly programmes**\n\n- Wednesday: ______",
        accepted: ["request day", "requests", "song requests", "requests and messages", "songs and messages", "request programme", "requests day"],
        keywords: { any: ["request", "requests", "requested"] },
        model: "request day",
        wrong: ["sports results"],
        explanation: "*Wednesday is request day, when students send in songs and messages.*",
      }),
      P.short({
        label: "(d)",
        stem: "- Thursday: programme in ______",
        accepted: ["shona or ndebele", "shona and ndebele", "home languages", "shona", "ndebele", "local languages", "ndebele or shona"],
        keywords: { any: ["shona", "ndebele", "home", "local"] },
        model: "Shona or Ndebele",
        wrong: ["English"],
        explanation: "*On Thursdays the programme is in Shona or Ndebele.* English is used on most other days.",
      }),
      P.short({
        label: "(e)",
        stem: "**Rules**\n\n- every script checked by ______",
        accepted: ["mrs chirwa", "the teacher in charge", "teacher in charge", "the teacher", "chirwa", "a teacher"],
        keywords: { any: ["chirwa", "teacher"] },
        model: "Mrs Chirwa",
        wrong: ["Tatenda"],
        explanation: "*Every script must be checked by the teacher in charge, Mrs Chirwa, the day before it is broadcast.* Tatenda is the station manager.",
      }),
      P.short({
        label: "(f)",
        stem: "**Problems**\n\n- ______ stop programmes",
        accepted: ["power cuts", "power cut", "power outages", "electricity cuts"],
        keywords: { any: ["power", "electricity"] },
        model: "power cuts",
        wrong: ["teachers"],
        explanation: "*Power cuts sometimes silence it in the middle of a programme.*",
      }),
      P.short({
        label: "(g)",
        stem: "- complaints about noise near the ______",
        accepted: ["staffroom", "staff room", "the staffroom", "the staff room"],
        keywords: { any: ["staffroom", "staff"] },
        model: "staffroom",
        wrong: ["library"],
        explanation: "*Some teachers also complained … that the noise disturbed staff working in the staffroom.*",
      }),
    ],
  });

  // ---------------------------------------------------------------------------------------------------------------
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 840, concepts: C,
    stem: BEES + "\n\nYou are going to give a short talk to your class about Tsitsi's business. Complete the notes. Write **one to three words** for each gap.",
    hints: NOTE_HINTS,
    explanation: "Match each heading to the paragraph that covers it. The answer is usually a noun phrase lifted directly from the text.",
    parts: [
      P.short({
        label: "(a)",
        stem: "**Starting out**\n\n- learned beekeeping on a ______ course",
        accepted: ["two-week", "two week", "2-week", "2 week", "two-week beekeeping", "beekeeping", "two weeks"],
        keywords: { any: ["two", "2", "beekeeping", "twoweek", "2week"] },
        model: "two-week",
        wrong: ["university"],
        explanation: "*An agricultural extension officer held a two-week beekeeping course.* Either detail completes the note.",
      }),
      P.short({
        label: "(b)",
        stem: "- first home-made hives built from ______",
        accepted: ["old wooden boxes", "wooden boxes", "boxes", "old boxes"],
        keywords: { all: ["boxes"] },
        model: "old wooden boxes",
        wrong: ["fallen trees"],
        explanation: "*She built her next hives herself from old wooden boxes.* Log hives came later.",
      }),
      P.short({
        label: "(c)",
        stem: "**Looking after the hives**\n\n- hives hung high to protect them from ______",
        accepted: ["honey badgers", "honey badger", "badgers"],
        keywords: { any: ["badgers", "badger"] },
        model: "honey badgers",
        wrong: ["cattle"],
        explanation: "*To protect the hives from honey badgers … she uses wire to hang them high above the ground.* Cattle and footpaths explain where the hives are placed, not why they are high.",
      }),
      P.short({
        label: "(d)",
        stem: "- hives checked in the ______",
        accepted: ["early evening", "evening", "the early evening", "the evening", "evenings"],
        keywords: { any: ["evening", "evenings"] },
        model: "early evening",
        wrong: ["morning"],
        explanation: "*She always works in the early evening, when most of the bees have returned.*",
      }),
      P.short({
        label: "(e)",
        stem: "- smoke made by burning ______",
        accepted: ["cow dung", "dung", "cattle dung"],
        keywords: { all: ["dung"] },
        model: "cow dung",
        wrong: ["wood"],
        explanation: "*She uses a little smoke from burning cow dung.*",
      }),
      P.short({
        label: "(f)",
        stem: "**Products**\n\n- beeswax made into candles and ______",
        accepted: ["polish", "furniture polish", "a polish", "polish for furniture", "polish for wooden furniture", "wood polish"],
        keywords: { all: ["polish"] },
        model: "furniture polish",
        wrong: ["soap"],
        explanation: "*She … makes candles and a polish for wooden furniture.*",
      }),
      P.short({
        label: "(g)",
        stem: "- best customers buy honey mixed with ______",
        accepted: ["lemon and ginger", "ginger and lemon", "lemon", "ginger"],
        keywords: { any: ["lemon", "ginger"] },
        model: "lemon and ginger",
        wrong: ["sugar"],
        explanation: "*Her best customers … buy her honey mixed with lemon and ginger.*",
      }),
    ],
  });
});
