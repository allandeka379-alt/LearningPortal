// W3a: ahist.mussolini.society (ZIMSEC Mussolini's domestic policies; Cambridge Paper 4, key question 1.4).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.mussolini.society", { file: "mussolini/society", keyPrefix: "mussolini.society" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What was the main aim of the Battle for Births launched in 1927?",
    ok: ["To raise the population by encouraging marriage and large families", "Correct: Mussolini linked population to strength."],
    no: [
      ["To reduce the population so that food would be cheaper for workers", "The aim was to increase the population."],
      ["To send young families to settle in the new colonies of Africa", "Settlement was not the main aim of the campaign."],
      ["To train all women as nurses for the future wars of the regime", "The aim concerned births and the family."],
    ],
    explanation: "The campaign aimed to raise Italy's population towards 60 million through a bachelor tax, loans, allowances and prizes.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What did the Opera Nazionale Balilla (ONB) do?",
    ok: ["Organised young people by age group for sport, drill and Fascist teaching", "Correct: it was the Fascist youth movement."],
    no: [
      ["Organised leisure clubs and cheap holidays for adult industrial workers", "That was the work of the OND."],
      ["Ran the secret police and the network of informers in the cities", "That was OVRA."],
      ["Taught priests how to teach religion in the Catholic parish schools", "It was a Fascist, not a Church, body."],
    ],
    explanation: "The ONB, founded in 1926, enrolled children and teenagers for physical, military and political training.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What problem did the Lateran Treaties of 1929 settle?",
    ok: ["The quarrel between the Italian state and the papacy since 1870", "Correct: the Roman Question was settled."],
    no: [
      ["The dispute over the border between Italy and Yugoslavia at Fiume", "Fiume was settled earlier, in 1924."],
      ["The conflict between the King and Mussolini over the army command", "This was not the subject of the treaties."],
      ["The question of the status of Italian Jews in the schools of the state", "The racial laws came in 1938."],
    ],
    explanation: "The treaties created the Vatican City State, recognised Italy with Rome as its capital and gave the Church privileges, ending the Roman Question.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which term of the Concordat of 1929 favoured the Church?",
    ok: ["Religious instruction in schools and the legal effect of church marriage", "Correct: the Church gained influence in education and family law."],
    no: [
      ["The right of the Pope to appoint the Italian prime minister", "The Pope had no such right."],
      ["The ban on Fascist youth groups in all of the Catholic schools", "Fascist youth groups were not banned."],
      ["The return to the Church of the whole city of Rome as its territory", "The Church received only the small Vatican City."],
    ],
    hints: ["Think of schools and marriage."],
    explanation: "The Concordat made Catholicism the state religion, introduced religious teaching in schools and gave civil effect to church marriage.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What caused the dispute between the regime and the Church in 1931?",
    ok: ["The attempt to restrict Catholic Action and its youth groups", "Correct: Pius XI protested in an encyclical."],
    no: [
      ["The decision to close all churches in the cities of the north", "No such closure occurred."],
      ["The regime's wish to give votes to women in church elections", "This was not the issue."],
      ["The refusal of the Pope to recognise the kingdom of Italy at all", "The Pope had recognised it in 1929."],
    ],
    hints: ["Think of the Church's own lay organisations."],
    explanation: "The regime tried to limit Catholic Action; Pius XI protested, and a compromise left it in place with restrictions.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why can membership of the ONB and OND not be taken as proof of belief in Fascism?",
    ok: ["Many joined because membership helped to get schooling, jobs and benefits", "Correct: motives were often practical."],
    no: [
      ["The organisations were secret and no figures were ever published", "Membership figures were published widely."],
      ["Only a few hundred people were ever enrolled in either of them", "Millions were enrolled."],
      ["Membership was forbidden by the Church to all of the Catholics", "The Church did not forbid it generally."],
    ],
    hints: ["Think of why people joined."],
    explanation: "Large numbers joined because membership brought advantages or was expected, so numbers alone do not show conviction.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that the Battle for Births failed?",
    ok: ["The birth rate continued to fall during the Fascist years", "Correct: the main aim was not met."],
    no: [
      ["A tax on bachelors was introduced in 1927 to push men to marry", "This shows the policy, not its result."],
      ["Mothers of many children were given prizes at national ceremonies", "This also shows the policy, not its result."],
      ["Contraception and abortion were banned in the penal code of 1930", "This shows an attempt to enforce the policy."],
    ],
    hints: ["Which fact shows the result rather than the method?"],
    explanation: "The aim was a rising population through more births; the continued fall in the birth rate shows that the policy did not achieve it.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment best summarises historians' views of Fascist control of Italian society?",
    ok: ["Outward conformity was widespread, but belief and daily life changed less", "Correct: this reflects much recent work."],
    no: [
      ["Every Italian was a convinced Fascist and no one resisted at all", "Some resisted, and many conformed without conviction."],
      ["Italian society was unchanged and no organisation reached ordinary people", "The OND and ONB reached millions."],
      ["The Church was destroyed and replaced by the Fascist Party's cult", "The Church kept its influence."],
    ],
    hints: ["Think of conformity and conviction."],
    explanation: "Many historians stress that participation and conformity were widespread, but that the Church, families and regional differences limited the change of attitudes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Lateran Treaties were signed in February 1929.",
    answer: true,
    explanation: "True. They were signed on 11 February 1929 by Mussolini's government and the Pope's representative.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Gentile reforms of 1923 made religious teaching compulsory in primary schools.",
    answer: true,
    explanation: "True. Gentile made religion a part of the primary curriculum and made the classical lycée the route to university.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Fascist rule ended all opposition inside Italy and abroad.",
    answer: false,
    hints: ["Think of exiles and of Giustizia e Libertà."],
    explanation: "False. Opponents were silenced inside Italy, but exiles such as Salvemini and the Rossellis organised abroad, and a partisan resistance arose after 1943.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["OND", "Fascist leisure organisation for workers"],
      ["ONB", "Fascist youth organisation founded in 1926"],
      ["Catholic Action", "Lay organisation of the Church, in dispute with the regime in 1931"],
      ["Giustizia e Libertà", "Anti-Fascist movement founded abroad by the Rosselli brothers"],
    ],
    explanation: "These organisations are central to questions on society and opposition.",
  });
  {
    const events = [
      "The Gentile reforms in education",
      "The ONB is founded",
      "The Lateran Treaties are signed",
      "The youth organisations are merged",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1923 to 1937."],
      explanation: "1923; 1926; February 1929; 1937.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The independent state created for the Pope by the Lateran Treaties is called the {{blank:a}} City State, and the minister who reformed schools in 1923 was Giovanni {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Vatican"], choices: ["Vatican", "Papal", "Roman", "Lateran"] },
      { id: "b", accepted: ["Gentile"], choices: ["Gentile", "Croce", "Balbo", "Starace"] },
    ],
    explanation: "Vatican City State; Gentile.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Pope who protested in 1931 against the regime's treatment of Catholic Action.",
    accepted: ["Pius XI", "Pope Pius XI", "Pius 11", "Pius the Eleventh"],
    wrong: ["Pius XII"],
    explanation: "**Pius XI**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Fascist policies towards women.",
    points: ["The Battle for Births encouraged marriage and large families", "A tax on bachelors, loans and prizes for mothers were introduced", "Contraception and abortion were banned", "Women's work and pay were restricted and they were excluded from some posts"],
    modelAnswer: "The Battle for Births encouraged marriage and large families, with a tax on bachelors, loans and prizes for mothers. Contraception and abortion were banned. Women's work and pay were restricted and they were excluded from some posts.",
    explanation: "One mark for each policy described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Mussolini made the Lateran Treaties with the Pope.",
    points: [["He wished to win the support of Catholic Italians and give the regime legitimacy", 2], ["He wished to end the quarrel of 1870 and gain prestige, while keeping the Church from becoming a rival", 2]],
    hints: ["Think of Catholic opinion and prestige."],
    modelAnswer: "Mussolini wished to win the support of Catholic Italians and give the regime legitimacy. He also wanted to end the quarrel since 1870 and gain prestige, while tying the Church to the state so it would not become a rival.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the youth organisations had only limited success.",
    points: [["Many young people joined for convenience, to get on at school or work, rather than from belief", 2], ["Families and the Church kept their influence, and by the war many young people were disillusioned", 2]],
    hints: ["Think of motives and of rival influences."],
    modelAnswer: "Many young people joined for convenience, to get on at school or work, rather than from belief. Families and the Church kept their influence, and by the war many young people were disillusioned.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a school exercise book entry by a fictional boy aged ten, Bologna, 1934",
        "On Saturday we put on our uniforms and drilled in the yard. The teacher said we must believe, obey and fight. I like the marching and the camp in the summer, though my mother says I must still go to church on Sunday."),
      "",
      source("Source B", "a letter from a fictional parish priest to his bishop, 1931",
        "The young people are taken from our groups and told to join the Party's organisations. We have protested, but it is hard for parents to refuse when their children need the school certificate. The Holy Father has spoken, but I fear for the faith of the young."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the activities of the youth organisation?", points: ["Drill and marching in uniform", "Teaching of the slogan believe, obey, fight / summer camp"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the influence of the regime on young people.", points: [["Agree: both show that the regime organised young people and that the Church or family continued to matter", 2], ["Differ: A shows a boy who enjoys the activities, while B shows a priest worried by pressure on parents and the loss of Church groups", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian studying the impact of Fascism on Italian youth?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a child's own account and shows what the activities were like and why they appealed, but a child may repeat what the teacher says and it is only one boy in Bologna", 2], ["B is a private letter by a priest who is hostile to the regime's youth policy, so it is frank about pressure but partial", 2], ["Own knowledge: the ONB, the dispute over Catholic Action and the importance of school certificates are well documented; together the sources show both appeal and pressure", 2]], modelAnswer: "Source A is useful because it shows what the youth activities were like from a child's view, including the appeal of marching and camp, and it also shows that the Church still mattered; but a child may repeat what the teacher says and it is one boy in one city. Source B is a private letter from a priest to his bishop, so it is likely to be frank about the pressure on parents and the dispute over Catholic Action in 1931, but he was opposed to the regime and so is partial. Together they show both the appeal of the organisations and the pressure behind them, which is useful for judging the regime's impact." }),
    ],
    hints: ["For (c), consider who wrote each source and why."],
    explanation: "Both sources are invented: a boy's exercise book and a priest's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far did Mussolini transform Italian society?",
    levels: levels(8),
    points: [
      ["Transformation: the youth movements, the OND, propaganda, the Lateran Treaties and control of education", 2],
      ["Limits: the Battle for Births failed, the Church and families kept influence, the south hardly changed, membership was often for convenience", 2],
      ["Opposition and consent: small opposition, widespread conformity, and the disillusion that came with war", 2],
      ["A supported judgement on the extent of change", 2],
    ],
    hints: ["Separate outward organisation from changes in belief and behaviour."],
    modelAnswer: "Mussolini changed the outward forms of Italian public life more than he changed Italians themselves. Millions of children passed through the youth organisations, workers used the OND, schools and the press taught Fascist ideas, and the Lateran Treaties gave the regime the support of the Church. But the Battle for Births failed, women's lives changed little, the Church and families kept their influence, the south was hardly touched, and many joined organisations for convenience. When the war brought defeat the regime collapsed quickly. I conclude that the transformation was limited: conformity was achieved but not deep conviction.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Battle for Births?", "The campaign launched in 1927 to raise the population through a bachelor tax, loans, allowances and prizes; it failed.");
  b.card("DEFINITION", "What were the Lateran Treaties?", "The agreements of 11 February 1929 creating the Vatican City State and settling relations between Italy and the papacy.");
  b.card("FACT", "What did the ONB do?", "It organised children and youths by age for sport, drill and Fascist teaching; founded in 1926.");
  b.card("FACT", "What was the OND?", "The Opera Nazionale Dopolavoro (1925), the Fascist leisure organisation for workers.");
  b.card("FACT", "What did the Concordat of 1929 give the Church?", "Catholicism as the state religion, religious teaching in schools and civil effect for church marriage.");
  b.card("FACT", "Who founded Giustizia e Libertà?", "The Rosselli brothers, in exile in 1929.");
  b.card("CONCEPT", "Why did Mussolini seek agreement with the Church?", "To gain the support of Catholics and legitimacy for the regime and to end the quarrel since 1870.");
  b.card("CONCEPT", "Why was the transformation of Italian society limited?", "The birth rate fell, the Church and families kept influence, and many joined organisations only for convenience.");
  b.card("CONCEPT", "How far did Italians consent to Fascism?", "Historians disagree: some stress real consent in the early 1930s, others coercion and conformity.");
});
