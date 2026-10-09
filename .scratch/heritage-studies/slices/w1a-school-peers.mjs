// W1a: the school and peers in socialisation (her.socialisation.school-peers).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.socialisation.school-peers", { file: "socialisation/school-peers", keyPrefix: "socialisation.school-peers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **peer group**?",
    options: [
      ["People of about the same age and status who interact closely", "Correct: classmates, friends and teammates are peer groups."],
      ["The relatives who live together in an extended family homestead", "That is an extended family, not a peer group."],
      ["The teachers and prefects who enforce the rules of a school", "These are figures of authority at school, not peers."],
      ["Members of a village who meet to choose a traditional leader", "That describes a community gathering."],
    ],
    answer: "A",
    explanation: "A peer group is made up of people of similar age and status, such as classmates or friends.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which value does a school **mainly** teach by ringing a bell and marking a register every morning?",
    options: [
      ["Punctuality", "Correct: bells and registers train learners to be on time."],
      ["Generosity", "Generosity is learned through sharing, not through bells and registers."],
      ["Patriotism", "Patriotism is taught through national symbols and events."],
      ["Creativity", "Creativity is developed through art, music and projects."],
    ],
    answer: "A",
    explanation: "Routines such as bells, timetables and registers teach punctuality and time management.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many schools require every learner to wear the same **uniform**?",
    options: [
      ["To teach neatness and equality, whatever a family's wealth", "Correct: uniform reduces differences between rich and poor and teaches neatness and belonging."],
      ["To make sure that learners buy their clothes from the school shop only", "Uniform is about values such as equality, not about where clothes are bought."],
      ["To show which learners have passed their examinations", "Uniform is worn by all learners, regardless of results."],
      ["To replace the need for school rules and teachers", "Uniform is one tool among many; it does not replace rules or teachers."],
    ],
    answer: "A",
    explanation: "Uniform is part of the hidden curriculum: it teaches neatness, equality and a sense of belonging to the school.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which situation is an example of **positive** peer pressure?",
    options: [
      ["Friends persuade Sipho to join them in a study group before examinations", "Correct: the friends push Sipho towards a good choice."],
      ["Friends dare Sipho to leave school early to watch a match in town", "Bunking lessons is a harmful choice: negative pressure."],
      ["Friends tell Sipho he must stop greeting his old friends to stay in the group", "Excluding others to fit in is negative pressure."],
      ["Friends tease Sipho until he agrees to try a cigarette at a party", "Pressure to smoke is negative peer pressure."],
    ],
    answer: "A",
    explanation: "Positive peer pressure pushes friends towards good behaviour: studying, sport, volunteering, healthy choices.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by the **hidden curriculum** of a school?",
    options: [
      ["Values and habits taught without being timetabled, such as punctuality", "Correct: the hidden curriculum is learned through rules, routines and school life."],
      ["Secret examination questions that are known only to teachers before a test", "That is not a curriculum; examination papers are confidential for fairness."],
      ["Subjects that are taught only to learners in the higher forms", "These are still on the timetable: part of the formal curriculum."],
      ["Lessons given at home by parents during the school holidays", "Lessons at home are part of family socialisation."],
    ],
    answer: "A",
    explanation: "The hidden curriculum is what learners learn from the way the school is run: discipline, punctuality, obedience, teamwork, respect for authority.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula is elected class monitor and must keep the register and report problems to the teacher. Which skill is the school **mainly** developing?",
    options: [
      ["Leadership and responsibility", "Correct: positions such as monitor and prefect develop leadership."],
      ["Knowledge of a curriculum subject", "Keeping a register is not a subject such as Geography or Science."],
      ["Loyalty to a particular peer clique", "A monitor serves the whole class, not a clique."],
      ["Independence from the school's rules", "A monitor helps enforce rules rather than ignore them."],
    ],
    answer: "A",
    hints: ["What does a monitor do for the class and the teacher?"],
    explanation: "Monitors, prefects and club officials learn leadership and responsibility, which prepares them for adult roles.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement **best** explains why peers become very influential in the teenage years?",
    options: [
      ["Teenagers want to belong and be accepted, and spend much time with friends", "Correct: the need for acceptance and time together give peers strong influence."],
      ["Parents are no longer legally responsible for their children once they reach Form 1", "Parents remain responsible for their children until adulthood."],
      ["Schools require learners to obey their friends rather than their teachers", "Schools expect learners to follow rules and teachers, not friends."],
      ["Peers are the only agent that teaches language to young people", "Language is first learned at home."],
    ],
    answer: "A",
    hints: ["Think about what teenagers want from a group and how they spend their time."],
    explanation: "In adolescence young people seek acceptance and identity outside the home and spend long hours with friends, so peers' influence grows.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Tatenda's friends push him to skip a Saturday sports practice to go to the shops. Which response shows the **most** responsible decision-making?",
    options: [
      ["Saying no clearly, explaining his commitment and suggesting a later meeting", "Correct: he resists the pressure, keeps his commitment and keeps the friendship."],
      ["Going to the shops but telling the coach later that he had been unwell", "This adds dishonesty to giving in to pressure."],
      ["Ending all of his friendships at once so that nobody can ever pressure him again", "Cutting off every friend is extreme; good friends can be kept."],
      ["Agreeing to go, because refusing friends is always disrespectful to them", "Saying no politely is not disrespectful; it is assertive."],
    ],
    answer: "A",
    hints: ["Look for the answer that keeps both his commitment and his honesty."],
    explanation: "Assertiveness (saying no clearly), honesty and offering an alternative are the key skills for handling peer pressure.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Peer pressure is always harmful.",
    answer: false,
    explanation: "False. Peer pressure can be positive, such as encouraging friends to study, play sport or volunteer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The school is a formal agent of socialisation because it has official rules, a timetable and trained staff.",
    answer: true,
    explanation: "True. The school is formal (official rules, curriculum, trained teachers); peers are an informal agent.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of school life with the value or skill it mainly teaches.",
    pairs: [
      ["Timetable and bells", "Punctuality"],
      ["Sports team", "Teamwork and fair play"],
      ["Prefect system", "Leadership"],
      ["Uniform", "Neatness and equality"],
    ],
    explanation: "Each part of school life carries a lesson in the hidden curriculum.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A small, closed group of friends that keeps others out is a {{blank:a}}. Influence that pushes a friend towards studying or sport is {{blank:b}} peer pressure.",
    blanks: [
      { id: "a", accepted: ["clique"], choices: ["clique", "clan", "council", "committee"] },
      { id: "b", accepted: ["positive"], choices: ["positive", "negative", "formal", "primary"] },
    ],
    explanation: "A clique is a small closed group; peer pressure towards good behaviour is positive.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the term for the influence friends of a similar age have on one another to behave or dress in a certain way.",
    accepted: ["peer pressure", "peer influence"],
    wrong: ["socialisation", "clique"],
    explanation: "This is **peer pressure** (or peer influence), which may be positive or negative.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which the school socialises learners.",
    points: ["School rules / code of conduct (discipline)", "Timetable, routines or registers (punctuality)", "Any one of: uniform, teachers as role models, prefects, sport and clubs, assemblies"],
    modelAnswer: "Through school rules, through the timetable and registers, and through sport and clubs.",
    explanation: "One mark for each correct way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** negative effects that peers can have on a young person.",
    points: [
      "Identifies an effect, e.g. drug, alcohol or substance abuse",
      "Develops: harms health and studies, and may break the law",
      "Identifies a second effect, e.g. bunking lessons, bullying or early sexual activity",
      "Develops: e.g. falling behind in school work, hurting others, or risk of pregnancy and infection",
    ],
    modelAnswer: "Peers may pressure a young person into drinking or taking drugs, which damages their health and studies and can get them into trouble with the law. Friends may also persuade them to bunk lessons, so they fall behind and may fail their examinations.",
    hints: ["Name the behaviour, then say what harm it does."],
    explanation: "Two marks per effect: identify, then develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which a school could reduce negative peer pressure among its learners.",
    points: [
      "Suggests a way, e.g. peer educators or counselling services",
      "Explains: learners get support and accurate information from trusted people",
      "Suggests a second way, e.g. more clubs, sport and mentoring",
      "Explains: learners spend free time in supervised, positive groups",
    ],
    modelAnswer: "The school could train peer educators and offer counselling, so learners have trusted people to talk to and accurate information about risks. It could also widen its clubs and sports and set up mentoring, so learners spend their free time in supervised, positive groups.",
    hints: ["Think of who learners listen to, and how their free time is spent."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "A fictional school counsellor in Bindura asked 80 Form 3 learners how their friends had influenced them in the past term. The results below are invented for this question.\n\n" +
      table(["Influence reported", "Number of learners"], [["Encouraged me to study", 34], ["Got me to join a club or team", 22], ["Pressured me to bunk a lesson", 15], ["Pressured me to try alcohol or drugs", 9]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "According to the table, which influence was reported most often?",
        options: [
          ["Encouraged me to study", "Correct: 34 learners, the largest number."],
          ["Got me to join a club or team", "22 learners: the second largest."],
          ["Pressured me to bunk a lesson", "15 learners."],
          ["Pressured me to try alcohol or drugs", "9 learners: the smallest number."],
        ],
        answer: "A",
        explanation: "34 is the largest figure in the table.",
      }),
      P.fib({
        label: "(b)",
        stem: "Use the table.",
        template: "The number of learners reporting positive influences was {{blank:a}}, and the number reporting negative influences was {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["56"], wrong: "34" },
          { id: "b", accepted: ["24"], wrong: "15" },
        ],
        explanation: "Positive: 34 + 22 = 56. Negative: 15 + 9 = 24.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "What does the table suggest about peer influence? Give **one** reason why the counsellor should still be concerned.",
        points: ["Most reported influence was positive (56 against 24)", "Peer influence can therefore support learning", "Concern: 24 learners still faced harmful pressure, which can damage health or studies"],
        modelAnswer: "The table suggests that most peer influence was positive, because 56 learners reported positive influences compared with 24 negative. Peers can therefore support learning. The counsellor should still be concerned because 24 learners faced harmful pressure such as alcohol or bunking, which can damage their health and studies.",
      }),
    ],
    hints: ["Add the two positive rows and the two negative rows first."],
    explanation: "Reading invented survey data: identify, calculate and interpret both sides of peer influence.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the school and peers as agents of socialisation.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **peer pressure**.",
        points: ["Influence from people of similar age / friends", "to behave, dress or think in a certain way (positive or negative)"],
        modelAnswer: "The influence of friends of a similar age to behave, dress or think in a certain way.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** ways in which teachers act as agents of socialisation.",
        points: ["Teachers are role models of conduct, dress and speech", "so learners copy their punctuality, fairness or honesty", "Teachers enforce rules and give rewards and sanctions", "so learners learn discipline and accept consequences"],
        modelAnswer: "Teachers act as role models: learners copy the way they dress, speak and treat others, so a punctual, fair teacher teaches those values. Teachers also enforce school rules with praise and sanctions, which teaches learners discipline and that actions have consequences.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Peers have a greater influence than the school on teenagers today.\" Discuss.",
        points: [
          ["For: teenagers seek acceptance; friends shape dress, language, interests and choices (e.g. phones, music)", 2],
          ["For: negative pressure (substance abuse, bunking) can override school rules", 2],
          ["Against: the school has rules, sanctions, teachers and the timetable for most of the day, and shapes values and careers", 2],
          ["Supported judgement, e.g. the agents overlap; the school channels peer influence through clubs, sport and peer educators", 2],
        ],
        levels: levels(8),
        modelAnswer: "Peers have a strong influence on teenagers. Young people want to be accepted, so their friends shape how they dress, speak and spend their time, and friends share music, fashion and social media. Negative pressure can even persuade learners to bunk lessons or try alcohol despite school rules.\n\nHowever, the school also has great influence. Learners spend most of the day there, under rules, routines and sanctions, and teachers act as role models and guide them towards careers. Much of what peers do together happens in school clubs and teams.\n\nOverall, peers probably influence teenagers' daily choices and identity more, but the school sets the framework within which peer groups form and tries to channel their influence into positive activities, so the two work together.",
      }),
    ],
    hints: ["In (c), give at least two points on each side before your conclusion."],
    explanation: "Define (a), describe (b) and weigh peers against the school (c).",
  });

  b.card("DEFINITION", "Peer group", "People of about the same age and status who interact closely, such as classmates, friends or teammates.");
  b.card("DEFINITION", "Peer pressure", "The influence of peers on one another to behave, dress or think in a certain way; it can be positive or negative.");
  b.card("DEFINITION", "Hidden curriculum", "Values and habits a school teaches without timetabling them: punctuality, discipline, obedience, teamwork, respect for authority.");
  b.card("DEFINITION", "Clique", "A small, closed group of friends that keeps others out and expects members to follow its ways.");
  b.card("CONCEPT", "What does school uniform teach?", "Neatness, equality (rich and poor look alike) and a sense of belonging to the school.");
  b.card("CONCEPT", "Give two examples of positive peer pressure.", "Encouraging friends to study; joining a sports team, club or volunteer project together.");
  b.card("CONCEPT", "Give two examples of negative peer pressure.", "Pressure to use alcohol or drugs; pressure to bunk lessons, bully others or take sexual risks.");
  b.card("CONCEPT", "How can a young person resist negative peer pressure?", "Think of the consequences, say no clearly, suggest an alternative, choose supportive friends and talk to a trusted adult.");
  b.card("CONCEPT", "Formal or informal agent: the school? peers?", "The school is formal (rules, curriculum, trained staff); peers are informal (unwritten group norms).");
});
