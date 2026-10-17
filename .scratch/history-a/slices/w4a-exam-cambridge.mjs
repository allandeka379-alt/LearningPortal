// W4a: Cambridge exam-format items. CAM_P4 x3 (Hitler's Germany: 3.1, 3.2, 3.3/3.4), CAM_P3 x4 (the Holocaust x2, the Cold War x2;
// different extracts, all invented). Levels and indicative content are our own wording; a reviewer should compare them with
// Cambridge mark schemes.
import { concept, extract, levels, EXAM, CAM } from "../lib.mjs";

const P3 = EXAM.CAM_P3;
const P4 = EXAM.CAM_P4;
const p4 = { d: 5, skill: P4.skill, applies: P4.applies, secs: P4.secs, examStyle: true, marks: 30, paper: "Paper 4", wordLimit: { min: 600, max: 1100 } };
const p3 = { d: 5, skill: P3.skill, applies: P3.applies, secs: P3.secs, examStyle: true, marks: 40, paper: "Paper 3", wordLimit: { min: 600, max: 1300 } };
const ASK = "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of";

concept("ahist.nazi.rise-dictatorship", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge" }, (b) => {
  // ---------------------------------------------------------------- Paper 4 (x3)
  b.essay({
    ...p4,
    concepts: ["ahist.nazi.rise-dictatorship"],
    stem: "Evaluate the view that the Depression was the main reason why Hitler gained control of Germany between 1929 and 1934. [30]",
    levels: levels(30),
    points: [
      ["The Depression: mass unemployment, the collapse of the Müller coalition and Brüning's decree government; the rise of the Nazi vote from 2.6 per cent (1928) to 37.3 per cent (July 1932)", 4],
      ["Weimar's political weakness: Article 48, the Reichstag's divisions, the role of Hindenburg and the loss of faith in democracy", 4],
      ["Nazi methods: Hitler's appeal, Goebbels's propaganda, the SA, the party organisation and the tailoring of the message to different groups", 4],
      ["Elite miscalculation: Papen, Schleicher and Hindenburg's circle and the deal of January 1933 despite the fall in the Nazi vote in November 1932", 4],
      ["Fear of communism and the support of sections of the middle classes, farmers and Protestants", 3],
      ["Consolidation of control: the Reichstag Fire decree, the Enabling Act, Gleichschaltung, the Night of the Long Knives and Hindenburg's death", 4],
      ["Evaluation: ranks the Depression against the other factors, separates conditions from decisions and reaches a supported judgement", 7],
    ],
    hints: ["Separate how Hitler came to power from how he consolidated control, and weigh the Depression against politics and decisions."],
    modelAnswer: `The Depression was the most important condition for Hitler's rise, but it was not the main reason why he gained control of Germany. It created the opportunity, while the political weakness of Weimar, Nazi methods and the decisions of conservative leaders turned it into power, and Hitler's own actions in 1933-34 created the dictatorship.

The importance of the Depression is shown by the figures. In May 1928 the Nazis won only 2.6 per cent of the vote. After the Wall Street Crash of October 1929 ended American loans, German unemployment rose to about six million by 1932, and farmers and small businessmen faced ruin. The Nazi share rose to 18.3 per cent in September 1930 and 37.3 per cent in July 1932, when they became the largest party. The party offered work and national recovery to people who had lost faith in the moderate parties. Without the slump, it is difficult to see the Nazis moving from the fringe to the centre of politics.

But the Depression does not explain everything. Other countries suffered it without producing a Hitler. In Germany, democracy was already fragile. The coalition of Hermann Müller collapsed in March 1930, and Brüning governed by emergency decree under Article 48 without a Reichstag majority. This accustomed people to rule without parliament and made the Nazis' attack on democracy seem less shocking. The parties of the centre and left were divided, and the Communists, who attacked the Social Democrats, helped to prevent a united defence.

The Nazis themselves also mattered. Hitler was a powerful speaker who offered simple answers and scapegoats. Goebbels organised propaganda, from mass meetings to Hitler's aeroplane tours, and local branches tailored their message to farmers, workers and shopkeepers. The SA, numbering several hundred thousand, gave an impression of strength and frightened opponents, and fear of communism led many property owners to see the Nazis as a barrier. These methods explain why discontent went to the Nazis rather than to other parties.

The final step, however, was not an election victory. The Nazi vote fell to 33.1 per cent in November 1932, and Schleicher, who replaced Papen as Chancellor, failed to build a majority. Papen then negotiated with Hitler. He and the President's advisers, including Oskar von Hindenburg and Otto Meissner, believed that a cabinet with only three Nazis could be controlled. Hindenburg, who disliked Hitler, gave way, and Hitler was appointed Chancellor on 30 January 1933. This decision was political and might have been different. Some historians therefore place the greatest weight on the miscalculation of the conservative elite.

Even then, Hitler had to turn the chancellorship into a dictatorship. After the Reichstag Fire of 27 February 1933 he persuaded Hindenburg to sign the decree suspending civil liberties, and the Enabling Act of 23 March, passed by 444 votes to 94 after the Communist deputies had been arrested or kept out, allowed him to legislate without the Reichstag. Trade unions were abolished in May, other parties were banned by July, and the Night of the Long Knives (30 June to 2 July 1934) removed the SA leadership and won the army's support. When Hindenburg died on 2 August 1934, Hitler became Führer and the army swore an oath to him. These steps depended on Hitler's cunning and on the lack of resistance, not on the Depression.

I conclude that the Depression was a necessary condition, because without it the Nazis would not have become a mass party. But it was not sufficient. The weakness of Weimar democracy made Nazi success possible, Nazi methods made the most of it, and the decision of the conservatives in January 1933 and Hitler's own actions in 1933-34 completed it. The Depression was therefore the most important background factor, but the decisive reasons were political.`,
    explanation: "A top-level answer separates conditions from decisions, uses precise evidence (figures, dates, laws) and ranks the Depression against other factors. The indicative content is our own wording.",
  });

  b.essay({
    ...p4,
    concepts: ["ahist.nazi.governance"],
    stem: "'Nazi rule depended more on terror than on consent.' Evaluate this view with reference to Germany between 1933 and 1939. [30]",
    levels: levels(30),
    points: [
      ["Terror: the SS and Gestapo, concentration camps from 1933, the People's Court and the coordination of judges; arrests of the left and later of Jews and other minorities", 4],
      ["The limits of terror: the small size of the Gestapo and its dependence on denunciations by ordinary Germans", 4],
      ["Consent through propaganda: Goebbels, the Ministry of Propaganda, radio, film, Nuremberg rallies, the Olympics and the Hitler myth", 4],
      ["Consent through achievement: reduced unemployment, order, rearmament, foreign policy successes (Rhineland, Anschluss), Strength through Joy", 4],
      ["Opposition and its weakness: the left, churches, youth (Edelweiss Pirates), White Rose, the army and Elser; why it stayed ineffective", 4],
      ["Limits on consent: continuing coercion of groups, discontent about wages and shortages, the unpopularity of some policies such as attacks on the churches", 3],
      ["Evaluation: judges the balance of terror and consent, noting that they varied by group and over time, and reaches a supported conclusion", 7],
    ],
    hints: ["Treat terror and consent as working together, and ask who experienced each."],
    modelAnswer: `Nazi rule depended on both terror and consent, but for most Germans consent was the more important foundation, while terror was decisive against particular groups. The best explanation is that the two worked together: terror removed the organised opposition and made dissent dangerous, while propaganda and achievement won the approval of the majority.

The terror state was real. The SS under Himmler grew into a state within the state, and in 1936 Himmler became chief of the German police. The Gestapo, created by Göring in Prussia in 1933, could arrest without trial. Dachau opened in March 1933, at first for communists and socialists, and the camps later held Jews, Roma, Jehovah's Witnesses, homosexual men and others. The courts were brought into line, and in 1934 the People's Court was created to try treason cases. These measures destroyed the organised left within months, and for communists, Social Democrats and trade unionists the regime was above all one of fear.

Yet terror alone does not explain why the regime lasted. The Gestapo was surprisingly small, and historians such as Robert Gellately have shown that it relied on information from ordinary Germans, who denounced neighbours, sometimes for personal reasons. This suggests that many people cooperated and not only obeyed. The terror was also targeted: for Germans who kept to the rules, the experience of the regime was not constant fear.

Consent was built through propaganda. Goebbels's Ministry of Propaganda controlled the press, radio, film and the arts, and the Reich Chamber of Culture made it impossible for unapproved writers and artists to work. The Nuremberg rallies, the cheap People's Receiver radio, films such as Triumph of the Will and the Berlin Olympics of 1936 presented a united people behind a great leader. The cult of the Führer was probably the regime's most effective asset, since the Hitler myth allowed people to blame local officials for faults and to credit Hitler for successes.

The regime also won consent through achievement. Unemployment fell from about six million to under half a million by 1938, though the figures left out some groups, and the autobahns, rearmament and the Labour Service gave work. Strength through Joy offered cheap holidays and leisure. Foreign policy success was popular: the Saar vote in 1935, the Rhineland in 1936 and the Anschluss in 1938 appeared to reverse the humiliation of Versailles without war. Many Germans disliked parts of the regime, such as the treatment of the churches, but approved of its results.

Opposition was weak because terror and consent worked together. The left was destroyed in 1933-34, the churches protested only on issues that affected themselves (as with Bishop von Galen's sermon in 1941 against the killing of disabled people, or the encyclical of 1937), youth groups such as the Edelweiss Pirates were small, and the White Rose was suppressed in 1943. The army's oath and the unpopularity of acting against a successful leader meant that the July plot of 1944 came late and failed. Opponents were divided, isolated and watched.

There were limits to consent. Real wages did not rise much, workers had lost their unions, shortages grew after 1936, and not everyone shared the regime's racism. Consent was often passive: acceptance rather than enthusiasm.

I conclude that the view is only partly right. Terror was essential in destroying opposition and in the treatment of the persecuted, and it was always in the background. But the stability of the regime for most Germans rested on consent, won through propaganda, jobs and national success, and the two forces reinforced each other.`,
    explanation: "A top-level answer treats terror and consent as interacting, supports each with accurate evidence, and distinguishes groups and periods. The indicative content is our own wording.",
  });

  b.essay({
    ...p4,
    concepts: ["ahist.nazi.economy", "ahist.nazi.society"],
    stem: "Evaluate the view that Nazi economic and social policies won the support of the German people between 1933 and 1939. [30]",
    levels: levels(30),
    points: [
      ["Economic achievement: falling unemployment through public works, the RAD, rearmament and conscription; the figures and what they hid", 4],
      ["Economic limits: wages, the loss of trade unions, shortages, the failure of autarky and the pressure of guns or butter", 4],
      ["Social benefits: Strength through Joy, Beauty of Labour, the Volkswagen scheme, and the sense of community (Volksgemeinschaft)", 4],
      ["Young people and women: the Hitler Youth and BDM, education, marriage loans; appeal for some and resentment or resistance for others", 4],
      ["Religion and the churches: the Concordat, the Reich Church and conflict; effects on support", 3],
      ["The persecuted: Jews and other minorities, for whom policies brought exclusion, and the willingness of many Germans to accept or benefit from it", 4],
      ["Evaluation: judges whose support was won, how far it was active or passive, and reaches a supported conclusion", 7],
    ],
    hints: ["Consider different groups: workers, farmers, young people, women, churches and the persecuted."],
    modelAnswer: `Nazi economic and social policies won the support of many Germans, particularly by reducing unemployment and offering a sense of belonging, but the support was uneven and often passive, and policies brought persecution to those excluded from the people's community. The view is therefore largely correct for the majority, and wrong for the groups that suffered.

The strongest source of support was the fall in unemployment. In 1932 about 5.6 million were registered unemployed on average; by 1938 the number was about 0.4 million. Public works such as the autobahns, the Reich Labour Service, rearmament and conscription all created work. The regime presented this as proof that it could deliver what Weimar had not. The figures overstated the recovery, since they left out Jews who had been dismissed, women encouraged to leave work, men in the Labour Service and the army, and prisoners, and the recovery began in 1932. But to a worker or farmer who had feared ruin, a job was real.

The economic record had limits that reduced support. Trade unions were abolished in May 1933 and replaced by the Labour Front, which could not bargain, and wage rates were frozen. Take-home pay rose mainly because of longer hours. After the Four Year Plan of 1936 shortages of consumer goods grew as arms took priority, and autarky was not achieved. Schacht's resignation in 1937 showed disagreement about the pace. Workers may have accepted the regime for work while resenting these conditions.

Social policies added to support. Strength through Joy provided cheap holidays, cruises and entertainment for workers who had never had them, and Beauty of Labour improved factories. The Volkswagen scheme promised a car, though the savers never received one. Above all the idea of the people's community offered a sense of belonging and national pride. The rallies, uniforms and festivals gave a feeling of unity after the divisions of the Weimar years.

Policies towards women and the young were more mixed. Marriage loans and the Mother's Cross encouraged large families, and many women welcomed recognition of their role, but the ideal conflicted with the labour shortage after 1936. The Hitler Youth and the BDM attracted many young people with camps, sports and comradeship, and by 1939 membership was compulsory. Others were bored or resentful, and the Edelweiss Pirates and Swing youth show that indoctrination was incomplete. Relations with the churches caused friction. The Concordat of 1933 was soon broken, the Reich Church was resisted by the Confessing Church, and Catholic protest, as in the encyclical of 1937, shows limits to enthusiasm.

For Jews, Roma, disabled people and other minorities, the policies of the people's community meant exclusion, the Nuremberg Laws, Kristallnacht and sterilisation. Most Germans did not oppose this, and some profited from the seizure of Jewish businesses and jobs. This does not mean that all approved, but it shows that support for the regime's social policies was bound up with acceptance of persecution.

Overall, support was won among the majority through jobs, order and national pride, but it was often passive, conditional on economic gains and strengthened by propaganda and fear. I conclude that the view is broadly correct for the majority but must be qualified by the limits on wages, the incomplete control of youth and the churches, and the fate of the persecuted.`,
    explanation: "A top-level answer distinguishes groups, uses precise evidence, and judges the strength and nature of the support. The indicative content is our own wording.",
  });

  // ---------------------------------------------------------------- Paper 3 (x4)
  // Holocaust, extract 1: long-term German antisemitism (continuity).
  b.essay({
    ...p3,
    concepts: ["ahist.holocaust.debate-origins", "ahist.holocaust.nazi-policy-1933-45"],
    stem: [
      extract(`The Holocaust did not fall from a clear sky. For many centuries, the Jews of Germany had lived among neighbours who taught their children to distrust them, and when new ideas of race arrived in the nineteenth century they found the ground prepared. Preachers, professors, journalists and politicians repeated the same picture of the Jew as an alien who threatened the nation. By the time Hitler spoke, millions of Germans had grown up with these ideas as part of ordinary life. That is why the persecution of the 1930s met so little resistance and why so many ordinary people were ready to take part in the killing when the war began. It is not enough to study the leaders or the machinery of the state. We must look at the culture that made the crime possible, and at the beliefs of the Germans who carried it out.`),
      "",
      `${ASK} the origins of the Holocaust to explain your answer.`,
    ].join("\n"),
    points: [
      ["Interpretation: the Holocaust grew from long-standing and widespread antisemitism in German culture, which made persecution and participation acceptable", 5],
      ["Approach: a cultural history that studies beliefs and attitudes over a long period and the ordinary people who took part, rather than leaders or institutions", 5],
      ["Knowledge supporting: religious prejudice, nineteenth-century racial antisemitism and race theory, the stab-in-the-back myth, the lack of mass protest in 1933-38 and the participation of ordinary men in the killing (Reserve Police Battalion 101)", 5],
      ["Knowledge supporting: Friedländer on redemptive antisemitism and Goldhagen's thesis, as examples of this approach", 5],
      ["Knowledge testing: antisemitism was strong in other countries without genocide (Poland, Russia, France at the time of Dreyfus); German Jews were integrated; antisemitic parties performed poorly before 1914 and the Nazis played down antisemitism in elections", 5],
      ["Knowledge testing: the roles of Hitler, the Nazi state and war in 1941 (the Einsatzgruppen, Wannsee) and the evidence of varied motives among the perpetrators (Browning)", 5],
      ["Testing the approach: what it leaves out, such as the structure of the Nazi state, contingency, and the role of collaborators across Europe", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing", 5],
    ],
    levels: levels(40, "interpretation"),
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the Holocaust grew out of a long tradition of antisemitism in German culture, which made persecution acceptable and made ordinary Germans willing to take part. The historian's approach is cultural: it studies beliefs and attitudes over centuries and the behaviour of ordinary people, rather than the decisions of leaders or the workings of the state, and it makes the culture and its carriers the main subject of explanation.

The extract's claims are supported by some of what we know. Religious prejudice against Jews was old in Europe, and in the nineteenth century race theory and social Darwinism gave it a pseudo-scientific form. After 1918 the myth that Jews and socialists had stabbed Germany in the back spread widely. The Nazi measures of 1933-38 (the boycott, the Nuremberg Laws, Kristallnacht) met little organised protest, and when war came ordinary men, such as the policemen of Reserve Police Battalion 101 studied by Christopher Browning, shot Jewish civilians. Saul Friedländer's idea of a "redemptive antisemitism" and Daniel Goldhagen's argument that an eliminationist antisemitism was widespread are examples of work that stresses ideas and culture, as the extract does.

However, the argument can be tested. Antisemitism was at least as strong in other countries, such as Poland, Russia and Romania, and in France at the time of the Dreyfus Affair, but did not produce genocide there. German Jews were well integrated before 1933, and antisemitic parties did poorly before 1914. The Nazis played down antisemitism in many election campaigns in 1930-32, which suggests that it was not the main reason for their support. Goldhagen's critics pointed out that the extract's claim that "millions" shared the same ideas ignores the variety of attitudes, and Browning showed that the policemen acted from conformity and obedience as well as from belief, and that some refused.

The approach also leaves things out. The extract says little about the part of the Nazi state, Hitler and the war. Historians such as Broszat and Mommsen stressed the competition of agencies and local initiatives, and the policy of 1939-41 changed direction several times, from emigration to ghettos to the Madagascar plan, and then to the Einsatzgruppen in June 1941 and Wannsee in January 1942. These developments depended on dictatorship and conquest, which turned prejudice into genocide. The extract also treats the Holocaust as German, whereas collaborators in France, Romania, Hungary, the Baltic states and elsewhere took part.

Overall, the extract is convincing in stressing that prejudice made persecution possible and that ordinary people took part. It is less convincing in suggesting that culture alone explains the Holocaust. Most historians would say that old antisemitism was a necessary condition but not a sufficient cause, which needed the Nazi regime and the war. The extract is a valuable part of the explanation but not the whole.`,
    explanation: "The extract is invented. A top-level answer identifies the argument and approach, supports and tests them with accurate knowledge, and judges the whole. Levels and content are our own wording.",
  });

  // Holocaust, extract 2: Allied and bystander responses.
  b.essay({
    ...p3,
    concepts: ["ahist.holocaust.debate-perpetrators-victims-bystanders", "ahist.holocaust.nazi-policy-1933-45"],
    stem: [
      extract(`When the first reliable reports of the killings reached London and Washington in 1942, the Allied governments had choices. They could have admitted far more refugees, pressed neutral states to open their borders, threatened reprisals against the killers, and bombed the railway lines to the camps. They did almost none of these things on any scale. Officials worried about the cost of feeding refugees, about the reaction of voters, and about being accused of fighting a war for the Jews. The war, they said, had to be won first. But these were not excuses of necessity; they were decisions, and decisions have authors. A historian who forgets this will be telling a story in which nobody is responsible and everybody is merely unlucky. The record shows that opportunities existed and that they were allowed to pass.`),
      "",
      `${ASK} the responses of the Allies to the Holocaust to explain your answer.`,
    ].join("\n"),
    points: [
      ["Interpretation: the Allied governments could have done more to rescue Jews and chose not to, so they bear responsibility for missed opportunities", 5],
      ["Approach: a moral and political approach that studies decisions and their authors, criticising governments for choices rather than treating them as victims of circumstance", 5],
      ["Knowledge supporting: restrictive immigration (the Evian Conference, the St Louis, quotas, the 1939 White Paper), delay in creating the War Refugee Board until January 1944, the Bermuda Conference, the refusal to bomb Auschwitz or the railways", 5],
      ["Knowledge supporting: the Allied declaration of 17 December 1942 condemned the killings but led to little action; the historian David Wyman argued the US could have done more", 5],
      ["Knowledge testing: wartime priorities and military limits, the difficulty of reaching Auschwitz, disbelief at first, and the argument of William Rubinstein that few opportunities existed; the Kindertransport and the War Refugee Board did save lives", 5],
      ["Knowledge testing: the primary responsibility of the perpetrators and collaborators, and the roles of neutral states, the Vatican and local populations", 5],
      ["Testing the approach: what it leaves out, such as the information available at the time, Jewish agency and the conditions of German-occupied Europe", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing", 5],
    ],
    levels: levels(40, "interpretation"),
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the Allied governments could have done much more to rescue Jews after the killings became known in 1942, that they chose not to, and that they should be held responsible for missed opportunities. The historian's approach is moral and political: it examines decisions and the officials who took them, and it rejects the idea that the Allies were simply prevented by circumstances, treating the history of rescue as a history of choices.

Much of what we know supports this reading. Before the war, the Evian Conference of 1938 produced sympathy but few offers of refuge. In 1939 the St Louis, carrying over 900 Jewish refugees, was refused entry by Cuba and the United States, and Britain restricted entry to Palestine by the White Paper. After the Allied declaration of 17 December 1942 condemned the extermination, little followed. The Bermuda Conference of April 1943 achieved almost nothing, the American War Refugee Board was not created until January 1944, and requests in 1944 to bomb the railways to Auschwitz or the camp itself were not accepted. The historian David Wyman, in The Abandonment of the Jews, argued that American officials and politicians were influenced by indifference and bureaucratic obstacles, which is similar to the extract's argument.

However, the argument can be tested. Allied leaders gave priority to defeating Germany, which they believed was the surest way to end the killing, and they faced real military limits. Auschwitz was at the limit of the range of bombers for most of the war, and historians still dispute whether bombing was practicable or would have saved many lives. At first the reports were thought exaggerated, and by 1942 the Germans controlled most of Europe, making rescue difficult. William Rubinstein argued that the chances of rescue were limited. The Allies also took some action: Britain took in about 10,000 children through the Kindertransport, and the War Refugee Board helped in Hungary in 1944 and supported the work of Raoul Wallenberg in Budapest. The extract's claim that almost nothing was done on any scale simplifies this record.

The approach has other limits. By concentrating on the Allied decisions it risks shifting attention from those who carried out the genocide. The responsibility for the Holocaust lay primarily with Nazi Germany and its collaborators in France, Romania, Hungary, the Baltic states and elsewhere. Neutral states such as Switzerland, which closed its border to many refugees in 1942, the Vatican, and local populations that watched or profited, also shaped the outcome. Jewish leaders and communities were not simply passive: they tried to seek help, and the conditions of occupied Europe limited what any outsider could do.

Overall, the extract is convincing in showing that policy was a matter of choice and that restrictive attitudes limited rescue. It is less convincing in minimising wartime constraints and the place of other actors. It is best seen as an important critique of Allied policy that must be balanced by attention to the primary responsibility of the perpetrators and the real difficulty of rescue.`,
    explanation: "The extract is invented. A top-level answer identifies the argument and approach, supports and tests them with accurate knowledge, and judges the whole. Levels and content are our own wording.",
  });

  // Cold War, extract 1: leaders and personalities.
  b.essay({
    ...p3,
    concepts: ["ahist.coldwar.debate-schools", "ahist.coldwar.origins-1941-49"],
    stem: [
      extract(`Historians have often searched for impersonal forces behind the Cold War: ideology, economics, the shape of the postwar balance of power. Yet the decisive moments were shaped by individuals. Roosevelt believed that he could win Stalin's trust by personal charm; when he died in April 1945, his successor, new to foreign affairs and quick to take offence, lacked both Roosevelt's confidence and his flexibility. Stalin, formed by years of conspiracy and terror, saw enemies in every compromise and could not believe in the good faith of men who had not shared his experience. Churchill, with his flair for the dramatic phrase, gave the division of Europe a name before it had hardened into fact. A different cast of leaders might have found a way to live together. The Cold War was not inevitable; it was made by the temperaments of men who held great power in an uncertain time.`),
      "",
      `${ASK} the origins of the Cold War to explain your answer.`,
    ].join("\n"),
    points: [
      ["Interpretation: the Cold War was caused mainly by the personalities and temperaments of the leaders, was not inevitable, and different leaders might have avoided it", 5],
      ["Approach: a biographical and political approach that emphasises individuals and contingency over structures, ideology and economics", 5],
      ["Knowledge supporting: Roosevelt's personal diplomacy, Truman's inexperience and the hardening after April 1945, Stalin's suspicion and terror, Churchill's Iron Curtain speech of March 1946", 5],
      ["Knowledge supporting: Truman's tougher line at Potsdam and the Truman Doctrine; Stalin's refusal to accept the Marshall Plan; Yalta and Potsdam as stages of trust declining", 5],
      ["Knowledge testing: structural causes - the bipolar balance of power, opposed ideologies, security fears (the buffer zone and the atomic monopoly), the economic interests highlighted by revisionists", 5],
      ["Knowledge testing: continuity in American and Soviet aims under different leaders; Roosevelt's own wartime caution about Stalin; Soviet policy in Eastern Europe that went beyond personality; the post-revisionist stress on mutual misperception", 5],
      ["Testing the approach: what it leaves out, such as institutions, domestic politics and the global context, and the problem of showing that a different leader would have changed the outcome", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing", 5],
    ],
    levels: levels(40, "interpretation"),
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the Cold War was the product of the personalities of the leaders, and that it was not inevitable. Its approach is biographical and political: it looks at individuals, their temperaments and their decisions, and it assigns less weight to the impersonal forces of ideology, economics and the balance of power, which it says historians have often overstressed.

Some knowledge supports this approach. Roosevelt hoped to win Stalin's trust through personal diplomacy, and at Yalta in February 1945 the Allies reached agreements on Germany, Poland and the United Nations. After his death on 12 April 1945, Truman, who was inexperienced in foreign affairs, took a firmer line, and relations cooled at Potsdam in July. Stalin, shaped by years of terror and suspicion, distrusted the West and ruled with little room for criticism, and Churchill's Iron Curtain speech at Fulton in March 1946 gave public form to the division. The Truman Doctrine and the Soviet refusal of the Marshall Plan show how leaders' choices shaped the hardening of the blocs.

However, the interpretation can be tested against structural explanations. The war left two superpowers with opposed ideologies and no other power to balance them, so rivalry was likely whoever led them. Security fears were deep: the Soviet Union had been invaded twice in thirty years and wanted a buffer in Eastern Europe, while the United States held the atomic bomb and feared Soviet expansion. Revisionist historians such as William Appleman Williams stressed American economic interests in open markets, and traditionalists stressed Soviet ideology. These factors would have operated under different leaders. Roosevelt himself had been cautious about Stalin, and Soviet policy in Poland and Eastern Europe, with its rigged elections and the Czech coup of 1948, followed aims set before 1945. Post-revisionist historians stressed mutual misperception and the security dilemma, which depended less on individual character.

The approach also has limits. It is difficult to show that a different leader would have produced a different outcome, because leaders acted under pressure from advisers, Congress, the Politburo and public opinion. It also pays little attention to the economic, institutional and global context. The extract's claim that the Cold War "was not inevitable" is reasonable, since the form and timing depended on decisions such as those of 1947-48, but it does not follow that personalities were the main cause.

Overall, the extract is convincing in stressing the part that individuals played in the timing and character of the confrontation, and in reminding us that outcomes were open. It is less convincing in minimising the structural conditions. Most historians would give personality a significant but secondary place, below the combination of ideology, security and the postwar balance of power.`,
    explanation: "The extract is invented. A top-level answer identifies the argument and approach, supports and tests them with accurate knowledge, and judges the whole. Levels and content are our own wording.",
  });

  // Cold War, extract 2: a post-Soviet perspective and the limits of archives.
  b.essay({
    ...p3,
    concepts: ["ahist.coldwar.debate-new-history", "ahist.coldwar.origins-1941-49"],
    stem: [
      extract(`For forty years Western writers described the postwar confrontation as the story of Soviet expansion and Western resolve. The archives opened after 1991 were expected to confirm the account. They have done so only in part. What the documents show is a Soviet leadership frightened of encirclement, which had just survived an invasion that killed some twenty-five million of its people, and which saw American bases and the atomic monopoly as a permanent danger. Its actions in Eastern Europe were harsh, but they were consistent with a search for security that any great power in its position might have pursued. At the same time, the sources are far from complete. The most sensitive files remain closed, and documents record what officials said to one another, not always what they believed. A responsible historian will therefore refuse the confident verdicts of the victors, and will recognise that the blame for the Cold War cannot be assigned from the evidence we have.`),
      "",
      `${ASK} the origins of the Cold War and the use of archives to explain your answer.`,
    ].join("\n"),
    points: [
      ["Interpretation: Soviet policy was mainly driven by security fears and the memory of invasion, and the new archives do not allow confident blame of one side", 5],
      ["Approach: a cautious, source-critical approach, informed by Russian experience and by the limits of archives, sceptical of triumphalist Western accounts", 5],
      ["Knowledge supporting: Soviet losses (an estimated 24-27 million dead), the wish for a buffer zone, American bases and the atomic bomb, the opening of Soviet archives after 1991 and the limits on later access", 5],
      ["Knowledge supporting: the Soviet records showing caution as well as ambition; the post-revisionist stress on mutual misperception and the security dilemma", 5],
      ["Knowledge testing: the evidence that Stalin's ideology and ambition mattered (Gaddis, We Now Know), the imposition of communist governments in Poland, Czechoslovakia and elsewhere, rigged elections and the Czech coup", 5],
      ["Knowledge testing: evidence from Zubok and Pleshakov and others on Stalin's mixture of ideology, imperial ambition and fear; Katyn, Venona and the revelations of espionage", 5],
      ["Testing the approach: what it leaves out, such as the voices of Eastern Europeans, the global Cold War (Westad), and the risk that appeals to security excuse repression", 5],
      ["Evaluation of the extract as a whole: how far the interpretation is convincing, in particular its claim that blame cannot be assigned", 5],
    ],
    levels: levels(40, "interpretation"),
    hints: ["State the argument and approach, support them from the extract, then test them with specific knowledge."],
    modelAnswer: `The extract argues that the opening of the Soviet archives only partly confirmed the traditional Western account. It maintains that Soviet policy was driven chiefly by fear and a search for security after a devastating invasion, and that because the sources are incomplete and hard to read, confident verdicts of blame are unjustified. The historian's approach is cautious and source-critical, sympathetic to the Soviet experience, and sceptical of the triumphalism of historians writing after the Western victory.

Some knowledge supports this. The Soviet Union lost an estimated 24 to 27 million people in the war, and Stalin wanted a buffer in Eastern Europe against another invasion. The United States held the atomic bomb until 1949 and built up its presence in Europe through the Marshall Plan and later NATO, which the Soviet leaders could read as a threat. After 1991 historians gained access to Soviet records, and some, like the post-revisionists, found evidence of caution and mutual misperception, or what is called a security dilemma. It is also true that access to some archives has since been limited, and that documents of a dictatorship record discussions but may not reveal real intentions.

However, the argument can be challenged. Gaddis in We Now Know (1997) used the new evidence to argue that Stalin's ideology and suspicion were central, and Zubok and Pleshakov described a mixture of Marxist-Leninist belief, imperial ambition and fear, not only security. In Eastern Europe the Soviet Union imposed communist governments: elections were rigged in Poland in 1947, and the Czech coup of 1948 destroyed a democratic government. Katyn, long denied and admitted only in 1990-92, and the Venona decrypts' evidence of extensive Soviet espionage suggest that Soviet policy was not only defensive. The extract's claim that any great power would have behaved in the same way does not explain why the methods were so repressive, or why the people of Eastern Europe did not choose them.

The approach also leaves out important considerations. It gives little attention to the voices of those who lived under Soviet control, or to the global dimension of the Cold War emphasised by Odd Arne Westad, including the interventions in Africa and Asia. Appeals to security can also be used to excuse repression, and the argument that blame cannot be assigned may itself be a judgement that the evidence does not require, since historians can weigh responsibility even when sources are incomplete.

Overall, the extract is convincing in warning against confident verdicts based on partial archives and in reminding us of the scale of Soviet fear. It is less convincing in minimising ideology and the imposed character of Soviet control, which the documents do reveal. A fair reading would say that both security and ambition shaped Soviet policy, that American actions also contributed, and that the new evidence has refined, but not ended, the debate.`,
    explanation: "The extract is invented. A top-level answer identifies the argument and approach, supports and tests them with accurate knowledge, and judges the whole. Levels and content are our own wording.",
  });
});
