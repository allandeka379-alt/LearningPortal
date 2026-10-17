// W4a: ahist.nazi.society (ZIMSEC topic 17; Cambridge Paper 4 Hitler 3.4).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.nazi.society", { file: "nazi/society", keyPrefix: "nazi.society" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which Nazi organisation trained girls for motherhood and homemaking?",
    ok: ["The League of German Girls", "Correct: the BDM was the girls' section of the Hitler Youth."],
    no: [
      ["The Reich Labour Service", "That organisation was for young men."],
      ["The German Labour Front for workers", "That replaced the trade unions."],
      ["The Confessing Church of the Protestants", "That was a church movement opposed to state control."],
    ],
    explanation: "The League of German Girls (Bund Deutscher Mädel, BDM) taught fitness, homemaking and loyalty, preparing girls to be mothers of the next generation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Nazi slogan 'Kinder, Küche, Kirche' say about the role of women?",
    ok: ["Their place was in the home, caring for the children", "Correct: women were encouraged to be wives and mothers."],
    no: [
      ["Their place was in the army, defending the nation", "Women did not serve in combat roles in the army."],
      ["Their place was in the Reichstag, helping to make the laws", "The Nazis excluded women from the leadership."],
      ["Their place was in the factories, working for the arms plan", "The ideology wanted women at home, though the labour shortage later changed this."],
    ],
    explanation: "The slogan means 'children, kitchen, church'. Marriage loans and the Mother's Cross were meant to encourage large families, though rearmament later drew women into work.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What did the Nuremberg Laws of 1935 do?",
    ok: ["They removed Jewish citizenship and banned marriage with 'Germans'", "Correct: they put racial discrimination into law."],
    no: [
      ["They banned every political party except the Nazi party itself", "That was the law of July 1933."],
      ["They allowed the government to make laws without the Reichstag", "That was the Enabling Act of March 1933."],
      ["They ordered the destruction of Jewish shops and synagogues", "That was the violence of Kristallnacht in 1938, not a law."],
    ],
    explanation: "The Reich Citizenship Law and the Law for the Protection of German Blood and Honour of 15 September 1935 made Jews second-class subjects and forbade marriage and relations between Jews and 'Germans'.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What event was used as the excuse for the violence of Kristallnacht in November 1938?",
    ok: ["The shooting of a German diplomat in Paris by a Jewish youth", "Correct: the regime claimed the attack justified a reprisal."],
    no: [
      ["The burning of the Reichstag building by a Dutch communist", "That was in February 1933."],
      ["The signing of the Munich Agreement by the Western powers", "Munich did not provoke the violence."],
      ["The Anschluss with Austria and the arrival of German troops there", "That was in March 1938."],
    ],
    hints: ["The victim was an official at the German embassy in France."],
    explanation: "Herschel Grynszpan shot Ernst vom Rath on 7 November 1938; vom Rath died on 9 November. Goebbels and the party leadership then encouraged attacks, which were presented as the people's anger.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the Concordat of July 1933 between Hitler and the Vatican?",
    ok: ["It protected Catholic worship if the Church stayed out of politics", "Correct: but the Nazis soon broke its terms."],
    no: [
      ["It created a single Reich Church for all Protestants and Catholics alike", "The Reich Church was a Protestant project."],
      ["It banned the Catholic Church from holding any services in Germany", "Services were permitted."],
      ["It made the Pope the head of the German state on religious matters", "Nothing of the kind was agreed."],
    ],
    hints: ["Think of what each side wanted in return."],
    explanation: "The Vatican agreed that Catholic clergy would stay out of politics; Hitler guaranteed the Church's schools and worship. He soon harassed Catholic groups, which led to the encyclical of 1937.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which group was made to suffer sterilisation under the law of July 1933?",
    ok: ["People judged to have hereditary illnesses or disabilities", "Correct: about 400,000 people were sterilised by 1945."],
    no: [
      ["Members of the Confessing Church who criticised the state", "Members were arrested, not sterilised under this law."],
      ["Leaders of the banned trade unions who had been arrested", "Union leaders were arrested or dismissed."],
      ["Soldiers who had refused to take the oath to Hitler in 1934", "The law concerned heredity, not obedience."],
    ],
    hints: ["The law was called the Law for the Prevention of Hereditarily Diseased Offspring."],
    explanation: "Eugenic ideas led to the forced sterilisation of about 400,000 people, and from 1939 the T4 programme killed thousands of disabled patients.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which evidence best supports the view that Nazi policy towards women was inconsistent?",
    ok: ["Women were urged to stay at home but drawn into work after 1936", "Correct: labour shortages after 1936 changed policy."],
    no: [
      ["Marriage loans were offered to couples who wished to start a family", "This fits the aim of motherhood and does not show inconsistency."],
      ["The Mother's Cross rewarded women who had large families", "This also fits the ideology."],
      ["Women were removed from posts in the civil service and the law", "This supports the policy of exclusion."],
    ],
    hints: ["Think of what happened to the demand for labour from 1936."],
    explanation: "The ideology of home and family conflicted with the need for workers in an economy preparing for war, so the number of women in work rose after 1936.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Hitler Youth became the only legal youth organisation in Germany.",
    answer: true,
    explanation: "True. Other youth groups were banned or absorbed, the Hitler Youth became the state organisation in 1936, and membership was made compulsory in 1939.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Persecution of the Jews in Germany began only after the outbreak of war in 1939.",
    answer: false,
    explanation: "False. It began in 1933 with the boycott and the Civil Service Law, continued with the Nuremberg Laws in 1935, and reached a violent peak at Kristallnacht in 1938.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Nazis succeeded in removing class differences and creating a society of equals in the people's community.",
    answer: false,
    hints: ["Consider what happened to the old business and military elites."],
    explanation: "False. The Volksgemeinschaft was a slogan; the old elites kept much of their wealth and influence, and inequalities persisted, while those labelled outsiders were persecuted.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Volksgemeinschaft", "The Nazi ideal of a united racial community"],
      ["Concordat", "An agreement between Hitler and the Vatican of July 1933"],
      ["Confessing Church", "Protestant movement opposed to Nazi control of the Church"],
      ["Napolas", "Elite schools that prepared future Nazi leaders"],
    ],
    explanation: "Volksgemeinschaft (people's community), Concordat (1933 treaty), the Confessing Church (Niemöller and others) and the Napolas (elite schools).",
  });
  chrono(b, [
    "The boycott of Jewish businesses",
    "The Nuremberg Laws",
    "The Hitler Youth becomes the state youth organisation",
    "Kristallnacht",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["Use the years 1933, 1935, 1936 and 1938."],
    explanation: "April 1933; September 1935; December 1936 (compulsory 1939); November 1938. The Hitler Youth became the state organisation in 1936.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The night of violence on 9-10 November 1938 is called {{blank:a}}, and the laws of 1935 that took citizenship from Jews are named after the city of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Kristallnacht"], choices: ["Kristallnacht", "Anschluss", "Gleichschaltung", "Putsch"] },
      { id: "b", accepted: ["Nuremberg"], choices: ["Nuremberg", "Munich", "Berlin", "Weimar"] },
    ],
    explanation: "Kristallnacht (the 'Night of Broken Glass') followed the Nuremberg Laws by three years.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Protestant pastor who helped to found the Confessing Church.",
    accepted: ["Martin Niemöller", "Martin Niemoller", "Niemöller", "Niemoller"],
    wrong: ["Ludwig Müller"],
    explanation: "**Martin Niemöller** opposed state control of the Protestant Church and was later held in concentration camps. Ludwig Müller was the Nazi-backed Reich Bishop.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main ways in which the Nazis tried to control young people.",
    points: ["The Hitler Youth and League of German Girls taught obedience, sport and loyalty to the Führer", "Other youth groups were banned and the Hitler Youth became the state organisation", "Teachers had to join the Nazi Teachers' League and Jewish teachers were dismissed", "Textbooks and subjects were changed to teach race science, Nazi history and physical education"],
    modelAnswer: "The Hitler Youth and the League of German Girls taught obedience, sport and loyalty to the Führer. Other youth groups were banned and the Hitler Youth became the state organisation. Teachers had to join the Nazi Teachers' League and Jewish teachers were dismissed. Textbooks and subjects were changed to teach race science, Nazi history and physical education.",
    explanation: "One mark for each method described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Nazi policy towards women changed after 1936.",
    points: [["Rearmament and the expansion of industry created a shortage of workers, so the regime needed women in factories and offices", 2], ["This conflicted with the ideal of women as mothers, so policy became inconsistent; the number of women in work rose though the ideal remained", 2]],
    hints: ["Think of the effect of the Four Year Plan on the supply of labour."],
    modelAnswer: "Rearmament and the expansion of industry caused a shortage of workers, so the regime needed women in factories and offices. This conflicted with the ideal of women as mothers, so policy became inconsistent; the number of women in work rose although the ideal of the home remained.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Nazis did not try to destroy the churches in the 1930s.",
    points: [["Most Germans were Protestant or Catholic, so a direct attack would have lost support and caused conflict with millions of believers", 2], ["The regime used other methods, such as the Concordat, the Reich Church and arrests of a few clergy, to limit the churches' influence while keeping order", 2]],
    hints: ["Think of the number of church members and how else the regime acted."],
    modelAnswer: "Nearly all Germans belonged to a church, so a direct attack would have lost support and caused conflict with millions of believers. The regime instead used the Concordat, the Reich Church and the arrest of a few clergy to limit the churches' influence while keeping order.",
    explanation: "Credit explained reasons that include the regime's alternative methods.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an account written by a fictional former member of the League of German Girls, remembering the late 1930s",
        "On Wednesday evenings we sang, did gymnastics and learned how to cook. I loved the camps, the uniform and the feeling of belonging to something large. We were told that we were the mothers of the future. Only later did I ask why my best friend, whose family was Jewish, had stopped coming to school."),
      "",
      source("Source B", "a private letter from a fictional Protestant pastor to a colleague, 1937",
        "The authorities tolerate our sermons so long as we keep to the Gospel, but they watch the pulpit and our young people are taken from us on Sundays by the youth movement. Some of our brothers have been arrested. I cannot speak for the Jews as I should, and I am ashamed of it."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say that the girl enjoyed about the League of German Girls?", points: ["The singing, gymnastics and cooking / the camps and uniform", "The feeling of belonging"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the Nazi regime's control of young people.", points: [["Agree: both show that the youth movement took up the time of young people (Wednesday evenings and Sundays) and had a strong influence over them", 2], ["Differ: A is positive about the activities and sense of belonging, whereas B sees the youth movement as taking young people from the Church and is critical of the regime", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying how far the Nazis controlled German society?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a memory written years later, so it may be shaped by hindsight, and it shows only one girl's view, but it is useful for how appealing the movement could be and for the silence about Jewish classmates", 2], ["B is a private letter written at the time, so is likely to be honest, and it shows pressure on the Church and the pastor's shame, but it is the view of one Protestant pastor", 2], ["Own knowledge: the Hitler Youth became compulsory in 1939, church pressure and the Concordat, and persecution of Jews fit both sources; together they show both attraction and limits", 2]], modelAnswer: "Source A is useful because it shows how attractive the League of German Girls could be, and how Jewish classmates disappeared without comment. As a memory of events years earlier it may be affected by hindsight, and it is one person's view. Source B is a private letter at the time, so it is likely to be honest about pressure on the Church, but it too is one pastor's view. Both fit what is known: the Hitler Youth demanded the time of the young, the churches faced pressure but were not destroyed, and few spoke out for the Jews. Together they show a regime that won much of the young by attraction but met limits with the churches." }),
    ],
    hints: ["For (c), consider when each source was written and by whom."],
    explanation: "Both sources are invented: a recollection written later and a private letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far did the Nazis transform German society between 1933 and 1939?",
    levels: levels(12),
    points: [
      ["Change: the Hitler Youth, the BDM and the schools shaped young people; unions and independent groups were destroyed; Jews and other minorities were excluded and persecuted", 3],
      ["Limits: women were drawn back to work after 1936; the churches were not brought to heel; the old elites kept their positions; opposition groups survived", 3],
      ["Differences between groups: transformation was greatest for the persecuted minorities and for the young, least for the churches, elites and class structure", 3],
      ["Judgement on how far change was transformation of beliefs and the structure of society", 3],
    ],
    hints: ["Separate the changes in treatment of groups from changes in the structure of society."],
    modelAnswer: "The Nazis transformed some aspects of German life but not the structure of society as a whole. The most far-reaching changes were in the treatment of groups: Jews lost their rights step by step, other minorities were sterilised or persecuted, and independent organisations such as the trade unions were destroyed. Young people were drawn into the Hitler Youth and a rewritten education system. Yet the limits were clear. Women were encouraged to be mothers but drawn back into work as rearmament created a labour shortage. The churches were pressured but never brought fully under control, and the old business and military elites kept much of their power, so class differences remained despite the slogan of the people's community. I conclude that the Nazis changed the treatment of minorities and the organisation of public life more than they changed the beliefs and structure of society as a whole.",
    explanation: "Credit explained change and limits and a judgement.",
  });

  b.card("DEFINITION", "What was the Volksgemeinschaft?", "The Nazi ideal of a 'people's community' united by race and loyalty to the Führer, from which outsiders were excluded.");
  b.card("DEFINITION", "What was eugenics?", "The belief in 'improving' a population by controlling reproduction; the Nazis used it for forced sterilisation and later to kill disabled people.");
  b.card("FACT", "What did the Nuremberg Laws of 15 September 1935 do?", "Took citizenship from Jews and forbade marriage and relations between Jews and 'Germans'.");
  b.card("FACT", "What was Kristallnacht?", "The organised attacks on Jewish shops, homes and synagogues across Germany and Austria on 9-10 November 1938; about 30,000 Jewish men were arrested.");
  b.card("FACT", "What was the Concordat of 1933?", "A treaty with the Vatican that protected Catholic worship and schools in return for the Church leaving politics.");
  b.card("FACT", "What was Mit brennender Sorge?", "The papal letter of 1937, read in Catholic churches, which condemned Nazi racial ideas and the breaking of the Concordat.");
  b.card("CONCEPT", "Why was Nazi policy towards women inconsistent?", "The ideal was women in the home, but rearmament created a labour shortage, so more women worked after 1936.");
  b.card("CONCEPT", "Which minorities other than Jews were persecuted before 1939?", "Disabled people (sterilisation), Roma and Sinti, Jehovah's Witnesses, homosexual men, 'asocials' and Black Germans.");
  b.card("CONCEPT", "How far did the Nazis control young people?", "Greatly, through the Hitler Youth and schools, but not completely: some groups like the Edelweiss Pirates resisted.");
  b.card("CONCEPT", "Why did the Nazis not destroy the churches?", "Most Germans were church members; they used the Concordat, the Reich Church and arrests of a few clergy instead.");
});
