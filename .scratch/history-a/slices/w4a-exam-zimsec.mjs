// W4a exam-format item: ZIMSEC Paper 2 25-mark essay (EXAM.ZIM_ESSAY) on the Second World War. Part structure and levels
// are our convention (a reviewer must check against the syllabus and ZIMSEC mark schemes).
import { concept, levels, EXAM } from "../lib.mjs";

const Z = EXAM.ZIM_ESSAY;
const base = { d: 5, skill: Z.skill, applies: Z.applies, secs: Z.secs, examStyle: true, marks: 25 };

concept("ahist.ww2.causes", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec" }, (b) => {
  b.essay({
    ...base, paper: "Paper 2",
    concepts: ["ahist.ww2.causes", "ahist.nazi.governance"],
    stem: "Assess the view that the failure of the League of Nations was the main reason for the outbreak of the Second World War.",
    points: [
      ["The League's weaknesses: no United States, no army of its own, slow procedures and dependence on Britain and France", 3],
      ["Manchuria (1931-33): condemnation without action; Japan left the League and the example encouraged others", 3],
      ["Abyssinia (1935-36): weak sanctions without oil, the Hoare-Laval plan, Italy's conquest and its move towards Germany", 3],
      ["Collective security collapsing: the Disarmament Conference, Germany leaving in 1933, the Rhineland in 1936", 3],
      ["Appeasement as a rival cause: the Anschluss, Munich and Prague; reasons for it and its effects", 3],
      ["Other causes: the Treaty of Versailles, the Depression, the rise of the dictators and their aims", 3],
      ["Hitler's decisions in 1939: the Nazi-Soviet Pact and the invasion of Poland", 2],
      ["Evaluation: ranks the League's failure against the other causes and reaches a supported judgement", 5],
    ],
    levels: levels(25),
    wordLimit: { min: 500, max: 1100 },
    hints: ["Explain how the League's failure encouraged aggression, then weigh it against appeasement, the dictators' aims and the other causes."],
    modelAnswer: `The failure of the League of Nations was an important reason for the outbreak of the Second World War, because it removed the main barrier to aggression in the 1930s. It was not, however, the main reason. The war was caused chiefly by the aims of Hitler's Germany, and the League's failure is best seen as a result of the weakness and the choices of the great powers rather than as a separate cause.

The League had serious weaknesses from the beginning. The United States, the strongest power, never joined. It had no army, so it had to rely on its members to apply sanctions or to send forces, and its procedures were slow. Its most powerful members, Britain and France, were reluctant to risk war to defend distant states. These weaknesses were exposed in 1931, when Japan invaded Manchuria. The League sent the Lytton Commission, which blamed Japan, but no state was willing to use force or even to impose strong economic sanctions. Japan simply left the League in 1933 and kept Manchuria. Aggressors elsewhere learned that condemnation had no cost.

The invasion of Abyssinia in 1935 was a further blow. Italy attacked a fellow member of the League, and the League condemned it and imposed sanctions. But the sanctions did not include oil, coal or steel, and Britain and France, anxious to keep Mussolini as a friend against Germany, even proposed in the Hoare-Laval plan to give Italy much of the country. Italy completed the conquest in May 1936, and Emperor Haile Selassie appealed to the League in vain. The result was that the League lost its credibility, and Mussolini, isolated by the sanctions, moved towards Hitler in the Rome-Berlin Axis. In this way the failure helped to create the alliance that later fought the war.

Collective security also broke down in Europe. When the Disarmament Conference failed to give Germany equality, Hitler left it and the League in October 1933, without punishment. In 1935 he announced conscription, in March 1936 he sent troops into the Rhineland in breach of both Versailles and Locarno, and Britain and France, whose public did not want war, took no action. Each step was made easier by the knowledge that the League would not act.

Yet these failures were not the whole story. Appeasement, the policy of making concessions to Germany, was a separate cause. At Munich in September 1938 Chamberlain and Daladier allowed Hitler to take the Sudetenland, and in March 1939 Hitler occupied the rest of Czechoslovakia, showing that his aims went beyond uniting Germans. Britain and France then guaranteed Poland. Appeasement was itself partly the result of the League's failure, since the powers had no confidence in collective action, but it also reflected the fear of another war, weak armies and a belief that Versailles had been unjust.

Other causes were at least as important. The Treaty of Versailles left Germany bitter at territorial losses, disarmament and reparations, and Hitler used this resentment. The Depression after 1929 brought mass unemployment, helped the Nazis and Japanese militarists to power, and weakened the democracies. The aims of the dictators were the deepest cause. Hitler wanted to destroy the settlement of 1919, unite Germans and win Lebensraum in the east. These aims, set out in Mein Kampf, meant that war with Poland, and later with the Soviet Union, was probable. Mussolini wanted a new Roman empire, and the Japanese army sought resources in Asia.

The last steps were the decisions of 1939. The Nazi-Soviet Pact of 23 August 1939 protected Hitler from a war on two fronts, and his invasion of Poland on 1 September was the immediate cause of war, when Britain and France honoured their guarantee. Historians such as A.J.P. Taylor have argued that Hitler was an opportunist who took advantage of the mistakes of others, while most historians stress that his aims were consistent.

I conclude that the failure of the League was a necessary background, because without it Japan, Italy and Germany would have faced greater risks. But the League failed because its members would not act, and the war itself needed a leader determined to expand. The main reason for the outbreak of war was therefore Hitler's aims, helped by the weakness of the League, appeasement and the grievances left by Versailles and the Depression.`,
    explanation: "A top-level answer explains how the League's failure encouraged aggression, with named examples, weighs it against other causes and reaches a supported judgement. Level descriptors are our own wording; a reviewer should compare them with ZIMSEC mark schemes.",
  });
});
